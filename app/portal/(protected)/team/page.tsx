'use client';

import { useTeamMembers } from '@/hooks/useTeamMembers';
import { auth } from '@/lib/firebase-client';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TeamPage() {
    const user = auth?.currentUser;
    const { teamMembers, isLoading } = useTeamMembers(user?.uid);

    return (
        <div className="container max-w-6xl py-8 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
                        <Users className="w-8 h-8" />
                        Team Members
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your team, view statuses, and handle permissions.
                    </p>
                </div>
                {/* Placeholder for future Invite functionality */}
                {/* <Button className="w-full md:w-auto">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Member
                </Button> */}
            </div>

            <div className="border-b" />

            {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white rounded-xl border p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="w-12 h-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-40" />
                                </div>
                            </div>
                            <div className="pt-2">
                                <Skeleton className="h-4 w-24 mb-2" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : teamMembers.length === 0 ? (
                <div className="py-20 text-center bg-muted/20 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Users className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">No team members found</h3>
                    <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                        It looks like you haven&apos;t added any team members yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {teamMembers.map((member) => (
                        <TeamMemberCard
                            key={member.id}
                            member={member}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
