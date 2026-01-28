'use client';

import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase-client';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { useUserPermissions } from './useUserPermissions';
import { Receipt } from '@/types/receipt';

export function useAllReceipts(userId?: string) {
    const { isTeamMember, teamMemberData, loading: permissionsLoading } = useUserPermissions(userId);

    const { data: receipts = [], isLoading, error } = useQuery({
        queryKey: ['receipts', userId, isTeamMember, teamMemberData?.accountHolderId],
        queryFn: async () => {
            if (!db) throw new Error("Firestore not initialized");

            let targetUserId = userId;
            if (isTeamMember && teamMemberData?.accountHolderId) {
                targetUserId = teamMemberData.accountHolderId;
            }

            const receiptsRef = collection(db, 'receipts');
            const q = query(
                receiptsRef,
                where('userId', '==', targetUserId),
                orderBy('date', 'desc'),
                limit(50)
            );

            const snapshot = await getDocs(q);

            return snapshot.docs.map(doc => ({
                ...doc.data(),
                receiptId: doc.id,
            })) as Receipt[];
        },
        enabled: !!userId && !permissionsLoading,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const isTotalLoading = isLoading || permissionsLoading || !userId;

    return { receipts, isLoading: isTotalLoading, error };
}
