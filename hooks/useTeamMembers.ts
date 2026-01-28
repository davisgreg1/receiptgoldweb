'use client';

import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/firebase-client';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { useUserPermissions } from './useUserPermissions';
import { TeamMember } from '@/types/team';

export function useTeamMembers(userId?: string) {
    const { isTeamMember, teamMemberData, loading: permissionsLoading } = useUserPermissions(userId);

    const { data: teamMembers = [], isLoading: queryLoading, error } = useQuery({
        queryKey: ['team-members', userId, isTeamMember, teamMemberData?.accountHolderId],
        queryFn: async () => {
            if (!db) throw new Error("Firestore not initialized");

            let targetUserId = userId;
            if (isTeamMember && teamMemberData?.accountHolderId) {
                targetUserId = teamMemberData.accountHolderId;
            }

            if (!targetUserId) return [];

            const teamMembersRef = collection(db, 'teamMembers');
            const q = query(teamMembersRef, where('accountHolderId', '==', targetUserId));

            const snapshot = await getDocs(q);

            const members: TeamMember[] = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Convert Firestore Timestamps to Dates if needed
                    joinedAt: data.joinedAt instanceof Timestamp ? data.joinedAt.toDate() : new Date(data.joinedAt),
                    lastActive: data.lastActive instanceof Timestamp ? data.lastActive.toDate() : data.lastActive ? new Date(data.lastActive) : undefined,
                } as unknown as TeamMember;
            });

            return members;
        },
        enabled: !!userId && !permissionsLoading,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });

    const isLoading = queryLoading || permissionsLoading || !userId;

    return { teamMembers, isLoading, error };
}
