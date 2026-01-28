'use client';

import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase-client';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { useUserPermissions } from './useUserPermissions';

export interface CategoryExpense {
    category: string;
    amount: number;
    percentage: number;
}

export function useExpenseCategories(userId?: string) {
    const { isTeamMember, teamMemberData, loading: permissionsLoading } = useUserPermissions(userId);

    const { data: categories = [], isLoading, error } = useQuery({
        queryKey: ['expense-categories', userId, isTeamMember, teamMemberData?.accountHolderId],
        queryFn: async () => {
            if (!db) throw new Error("Firestore not initialized");

            let targetUserId = userId;
            if (isTeamMember && teamMemberData?.accountHolderId) {
                targetUserId = teamMemberData.accountHolderId;
            }

            // Calculate start and end of current month
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

            const receiptsRef = collection(db, 'receipts');
            const q = query(
                receiptsRef,
                where('userId', '==', targetUserId),
                where('date', '>=', Timestamp.fromDate(startOfMonth)),
                where('date', '<=', Timestamp.fromDate(endOfMonth))
            );

            const snapshot = await getDocs(q);

            const categoryTotals: Record<string, number> = {};
            let totalSpend = 0;

            snapshot.forEach(doc => {
                const data = doc.data();
                const amount = typeof data.amount === 'number' ? data.amount : 0;
                // Normalized category name
                const category = (data.category || 'Uncategorized').trim();

                if (!categoryTotals[category]) {
                    categoryTotals[category] = 0;
                }
                categoryTotals[category] += amount;
                totalSpend += amount;
            });

            // Convert to array and calculate percentages
            return Object.entries(categoryTotals)
                .map(([category, amount]) => ({
                    category,
                    amount,
                    percentage: totalSpend > 0 ? (amount / totalSpend) * 100 : 0
                }))
                .sort((a, b) => b.amount - a.amount);
        },
        enabled: !!userId && !permissionsLoading,
        staleTime: 10 * 60 * 1000,
    });

    return { categories, isLoading, error };
}
