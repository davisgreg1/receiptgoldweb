'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase-client';
import { collection, query, where, orderBy, limit, getDocs, startAfter, DocumentSnapshot } from 'firebase/firestore';
import { useUserPermissions } from './useUserPermissions';
import { Receipt } from '@/types/receipt';

export function useAllReceipts(userId?: string) {
    const { isTeamMember, teamMemberData, loading: permissionsLoading } = useUserPermissions(userId);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error
    } = useInfiniteQuery({
        queryKey: ['receipts', userId, isTeamMember, teamMemberData?.accountHolderId],
        queryFn: async ({ pageParam = { receiptsCursor: null, generatedCursor: null } }: { pageParam: { receiptsCursor: DocumentSnapshot | null, generatedCursor: DocumentSnapshot | null } }) => {
            if (!db) throw new Error("Firestore not initialized");

            let targetUserId = userId;
            if (isTeamMember && teamMemberData?.accountHolderId) {
                targetUserId = teamMemberData.accountHolderId;
            }

            const BATCH_SIZE = 10;

            // --- Query 1: Standard Receipts ---
            const receiptsRef = collection(db, 'receipts');
            let receiptsQuery = query(
                receiptsRef,
                where('userId', '==', targetUserId),
                orderBy('date', 'desc'),
                limit(BATCH_SIZE)
            );

            if (pageParam.receiptsCursor) {
                receiptsQuery = query(receiptsQuery, startAfter(pageParam.receiptsCursor));
            }

            // --- Query 2: Generated Receipts ---
            const generatedReceiptsRef = collection(db, 'generatedReceipts');
            let generatedReceiptsQuery = query(
                generatedReceiptsRef,
                where('userId', '==', targetUserId),
                orderBy('createdAt', 'desc'),
                limit(BATCH_SIZE)
            );

            if (pageParam.generatedCursor) {
                generatedReceiptsQuery = query(generatedReceiptsQuery, startAfter(pageParam.generatedCursor));
            }

            // Execute queries in parallel
            const [receiptsSnapshot, generatedSnapshotResult] = await Promise.allSettled([
                getDocs(receiptsQuery),
                getDocs(generatedReceiptsQuery)
            ]);

            // Process Standard Receipts
            let standardReceipts: Receipt[] = [];
            let lastReceiptDoc: DocumentSnapshot | null = null;

            if (receiptsSnapshot.status === 'fulfilled') {
                standardReceipts = receiptsSnapshot.value.docs.map(doc => ({
                    ...doc.data(),
                    receiptId: doc.id,
                })) as Receipt[];
                lastReceiptDoc = receiptsSnapshot.value.docs[receiptsSnapshot.value.docs.length - 1] || null;
            } else {
                console.error("Error fetching standard receipts:", receiptsSnapshot.reason);
            }

            // Process Generated Receipts
            let generatedReceipts: Receipt[] = [];
            let lastGeneratedDoc: DocumentSnapshot | null = null;

            if (generatedSnapshotResult.status === 'fulfilled') {
                generatedReceipts = generatedSnapshotResult.value.docs.map(doc => {
                    const data = doc.data();
                    return {
                        receiptId: doc.id,
                        userId: data.userId,
                        vendor: data.businessName || 'Unknown Vendor',
                        amount: data.total || 0,
                        date: data.date ? new Date(data.date) : new Date(data.createdAt),
                        description: data.description || 'Generated Receipt',
                        category: 'uncategorized', // Default
                        currency: 'USD',
                        createdAt: data.createdAt,
                        updatedAt: data.createdAt,
                        status: 'active',
                        images: data.receiptPdfUrl ? [{
                            url: data.receiptPdfUrl,
                            size: 0,
                            uploadedAt: data.createdAt
                        }] : [],
                        items: data.items || [],
                        tax: {
                            category: 'unknown',
                            deductible: false,
                            deductionPercentage: 0,
                            taxYear: new Date().getFullYear(),
                            amount: data.tax || 0
                        },
                        tags: [],
                        type: data.type || 'generated'
                    } as unknown as Receipt;
                });
                lastGeneratedDoc = generatedSnapshotResult.value.docs[generatedSnapshotResult.value.docs.length - 1] || null;
            } else {
                console.error("Error fetching generated receipts:", generatedSnapshotResult.reason);
            }

            // Combine and sort
            const unifiedReceipts = [...standardReceipts, ...generatedReceipts].sort((a, b) => {
                const dateA = new Date(a.date instanceof Date ? a.date : (a.date as any).toDate ? (a.date as any).toDate() : a.date);
                const dateB = new Date(b.date instanceof Date ? b.date : (b.date as any).toDate ? (b.date as any).toDate() : b.date);
                return dateB.getTime() - dateA.getTime();
            });

            // Determine if there are more pages
            // If we got fewer results than requested from BOTH sources, we are likely done.
            // Note: This logic is slightly imperfect when merging two streams, but good enough for simple infinite scroll.
            // A perfect merging strategy would require fetching more than needed and slicing.
            const hasMore = (receiptsSnapshot.status === 'fulfilled' && receiptsSnapshot.value.docs.length === BATCH_SIZE) ||
                (generatedSnapshotResult.status === 'fulfilled' && generatedSnapshotResult.value.docs.length === BATCH_SIZE);

            return {
                receipts: unifiedReceipts,
                nextCursor: hasMore ? {
                    receiptsCursor: lastReceiptDoc || pageParam.receiptsCursor, // Keep old cursor if no new docs
                    generatedCursor: lastGeneratedDoc || pageParam.generatedCursor
                } : undefined
            };
        },
        initialPageParam: { receiptsCursor: null, generatedCursor: null },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !!userId && !permissionsLoading,
        staleTime: 5 * 60 * 1000,
    });

    // Flatten pages into a single array
    const allReceipts = data?.pages.flatMap(page => page.receipts) || [];

    const isTotalLoading = isLoading || permissionsLoading || !userId;

    return {
        receipts: allReceipts,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading: isTotalLoading,
        error
    };
}
