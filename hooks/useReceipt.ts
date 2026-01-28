'use client';

import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase-client';
import { doc, getDoc } from 'firebase/firestore';
import { useUserPermissions } from './useUserPermissions';
import { Receipt } from '@/types/receipt';

export function useReceipt(receiptId: string, userId?: string) {
    const { isTeamMember, teamMemberData, loading: permissionsLoading } = useUserPermissions(userId);

    const { data: receipt, isLoading, error } = useQuery({
        queryKey: ['receipt', receiptId, userId, isTeamMember, teamMemberData?.accountHolderId],
        queryFn: async () => {
            if (!db) throw new Error("Firestore not initialized");
            if (!receiptId) throw new Error("Receipt ID required");

            const receiptRef = doc(db, 'receipts', receiptId);
            const snapshot = await getDoc(receiptRef);

            if (!snapshot.exists()) {
                throw new Error("Receipt not found");
            }

            // Optional: Verify permission/ownership here if security rules don't cover it fully
            // or if we want to fail fast on frontend.

            return {
                ...snapshot.data(),
                receiptId: snapshot.id,
            } as Receipt;
        },
        enabled: !!receiptId && !!userId && !permissionsLoading,
        retry: false,
    });

    // Combine loading states: if permissions are loading or we don't have a user yet (waiting for auth),
    // or the query itself is loading, we are "loading".
    // Since this is a protected route, !userId implies auth is initializing.
    const isTotalLoading = isLoading || permissionsLoading || !userId;

    return { receipt, isLoading: isTotalLoading, error };
}
