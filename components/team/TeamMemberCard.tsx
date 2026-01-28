'use client';

import { useState } from 'react';
import { TeamMember, TeamMemberRole } from '@/types/team';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Shield, Users, Crown, Calendar, Mail, MoreVertical, Ban, Trash2, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { manageTeamMember } from '@/actions/team';
import { auth } from '@/lib/firebase-client';

interface TeamMemberCardProps {
    member: TeamMember;
}

import { useQueryClient } from '@tanstack/react-query';

export function TeamMemberCard({ member }: TeamMemberCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const getRoleIcon = (role: TeamMemberRole) => {
        switch (role) {
            case 'admin':
                return <Crown className="w-3 h-3 mr-1" />;
            case 'teammate':
                return <Users className="w-3 h-3 mr-1" />;
            default:
                return <Shield className="w-3 h-3 mr-1" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-700 hover:bg-green-100/80';
            case 'suspended':
                return 'bg-red-100 text-red-700 hover:bg-red-100/80';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100/80';
            default:
                return 'bg-gray-100 text-gray-700 hover:bg-gray-100/80';
        }
    };

    const handleAction = async (action: 'suspend' | 'activate' | 'remove') => {
        if (!auth?.currentUser) return;

        setIsLoading(true);
        try {
            await manageTeamMember(auth.currentUser.uid, member.id!, action);
            await queryClient.invalidateQueries({ queryKey: ['team-members'] });
            // Ideally notify user of success via toast
        } catch (error) {
            console.error('Action failed:', error);
            // Notify user of error
        } finally {
            setIsLoading(false);
        }
    };

    const isOwnCard = auth?.currentUser?.uid === member.userId;

    // Determine if we should show the menu. 
    // Logic: Current user should be the account holder to manage others. 
    // And you typically can't remove yourself via this card view (usually separate "Leave Team" flow).
    // For now, we'll allow the menu if it's NOT their own card, assuming the parent page checks permissions or the server action will fail safely.
    // Ideally, we'd pass `isAccountHolder` prop to this card.

    // Simplification: We check if the auth user ID matches the accountHolderId of the member record.
    const canManage = auth?.currentUser?.uid === member.accountHolderId && !isOwnCard;

    return (
        <Card className={`overflow-hidden transition-all hover:shadow-md ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
            <CardHeader className="p-6 pb-2 grid grid-cols-[1fr_auto] items-start gap-4 space-y-0">
                <div className="flex items-center space-x-4 min-w-0">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-sm shrink-0">
                        <AvatarImage src="" alt={member.displayName || member.email} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg">
                            {(member.displayName || member.email).charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 min-w-0">
                        <h3 className="font-semibold text-lg leading-none tracking-tight truncate">
                            {member.displayName || 'Team Member'}
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center truncate">
                            <Mail className="w-3 h-3 mr-1.5 opacity-70 shrink-0" />
                            <span className="truncate">{member.email}</span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 justify-end shrink-0">
                    <Badge
                        className={`${getStatusColor(member.status)} border-0 shadow-none font-medium capitalize`}
                    >
                        {member.status}
                    </Badge>

                    {canManage && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(member.email)}>
                                    Copy Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {member.status === 'active' ? (
                                    <DropdownMenuItem onClick={() => handleAction('suspend')} className="text-yellow-600 focus:text-yellow-600">
                                        <Ban className="mr-2 h-4 w-4" />
                                        Suspend User
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => handleAction('activate')} className="text-green-600 focus:text-green-600">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Activate User
                                    </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={() => handleAction('remove')} className="text-red-600 focus:text-red-600 bg-red-50 focus:bg-red-100">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove from Team
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </CardHeader>

            <CardContent className="p-6 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Role</span>
                        <div className="flex items-center font-medium">
                            {getRoleIcon(member.role)}
                            <span className="capitalize">{member.role === 'teammate' ? 'Member' : member.role}</span>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Joined</span>
                        <div className="flex items-center text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1.5" />
                            {member.joinedAt ? format(member.joinedAt, 'MMM d, yyyy') : 'N/A'}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
