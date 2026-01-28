'use client';

import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase-client';
import { collection, query, where, getCountFromServer } from 'firebase/firestore';
import { useUserPermissions } from './useUserPermissions';

export function useReceiptsCount(userId?: string) {
    const { isTeamMember, teamMemberData, loading: permissionsLoading } = useUserPermissions(userId);

    const { data: count, isLoading, error } = useQuery({
        queryKey: ['receipts-count', userId, isTeamMember, teamMemberData?.accountHolderId],
        queryFn: async () => {
            if (!db) throw new Error("Firestore not initialized");

            let targetUserId = userId;
            if (isTeamMember && teamMemberData?.accountHolderId) {
                targetUserId = teamMemberData.accountHolderId;
            }

            const receiptsRef = collection(db, 'receipts');
            const q = query(receiptsRef, where('userId', '==', targetUserId));
            const snapshot = await getCountFromServer(q);

            return snapshot.data().count;
        },
        enabled: !!userId && !permissionsLoading,
        staleTime: 5 * 60 * 1000,
    });

    return { count: count ?? null, isLoading, error };
}
