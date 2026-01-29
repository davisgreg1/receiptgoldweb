'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
    LayoutDashboard,
    Receipt,
    Users,
    LogOut,
    ShieldAlert,
    ChevronLeft,
    ChevronRight,
    Settings,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { isSuperAdmin } from '@/lib/auth-helpers';
import { useTeamMembersCount } from '@/hooks/useTeamMembersCount';
import { useTheme } from '@/app/theme/theme';
import { FaMoon, FaSun } from 'react-icons/fa';

interface PortalSidebarProps {
    user: User;
}

export function PortalSidebar({ user }: PortalSidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { themeMode, toggleTheme } = useTheme();

    const handleSignOut = async () => {
        if (auth) {
            await signOut(auth);
        }
    };

    const { count: teamCount } = useTeamMembersCount(user?.uid);

    const navItems = [
        {
            title: 'Dashboard',
            href: '/portal/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Receipts',
            href: '/portal/receipts',
            icon: Receipt,
        },
        {
            title: 'Team',
            href: '/portal/team',
            icon: Users,
            hidden: !teamCount || teamCount <= 1,
        },
        {
            title: 'Settings',
            href: '/portal/settings',
            icon: Settings,
        },
    ].filter(item => !item.hidden);

    return (
        <div className={cn(
            "hidden border-r bg-card md:block h-screen sticky top-0 transition-all duration-300",
            isCollapsed ? "md:w-[70px]" : "md:w-64 lg:w-72"
        )}>
            <div className="flex h-full flex-col gap-2">
                <div className={cn(
                    "flex h-16 items-center border-b px-6 transition-all",
                    isCollapsed ? "justify-center px-2" : "justify-between"
                )}>
                    {!isCollapsed && (
                        <Link href="/" className="flex items-center gap-2 font-semibold overflow-hidden">
                            <span className="text-xl font-bold text-primary truncate">ReceiptGold</span>
                            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                Admin
                            </span>
                        </Link>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-6 w-6 ml-auto text-muted-foreground transition-all hover:text-primary", isCollapsed && "ml-0 p-0")}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-3 text-sm font-medium">
                        {navItems.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                        pathname === item.href
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground",
                                        isCollapsed && "justify-center px-2"
                                    )}
                                    title={isCollapsed ? item.title : undefined}
                                >
                                    <Icon className="h-4 w-4" />
                                    {!isCollapsed && <span>{item.title}</span>}
                                </Link>
                            );
                        })}

                        {/* Super Admin Section */}
                        {isSuperAdmin(user.email) && (
                            <div className="mt-6">
                                {!isCollapsed && (
                                    <h4 className="mb-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase px-3">
                                        Super Admin
                                    </h4>
                                )}
                                <Link
                                    href="/portal/admin"
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                        pathname.startsWith('/portal/admin')
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground",
                                        isCollapsed && "justify-center px-2"
                                    )}
                                    title={isCollapsed ? "Users & System" : undefined}
                                >
                                    <ShieldAlert className="h-4 w-4" />
                                    {!isCollapsed && <span>Users & System</span>}
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
                <div className="mt-auto border-t p-4">
                    {!isCollapsed ? (
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <Avatar className="h-9 w-9 border">
                                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col overflow-hidden">
                                <span className="truncate text-sm font-medium leading-none text-foreground">
                                    {user.displayName || 'User'}
                                </span>
                                <span className="truncate text-xs text-muted-foreground mt-1">
                                    {user.email}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-center mb-4">
                            <Avatar className="h-8 w-8 border">
                                <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                                <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>
                    )}

                    <Button
                        variant="outline"
                        className={cn(
                            "text-muted-foreground transition-all hover:text-primary w-full gap-2",
                            isCollapsed ? "justify-center px-2" : "justify-start"
                        )}
                        onClick={handleSignOut}
                        title={isCollapsed ? "Sign out" : undefined}
                    >
                        <LogOut className="h-4 w-4" />
                        {!isCollapsed && <span>Sign out</span>}
                    </Button>

                    <Button
                        variant="ghost"
                        className={cn(
                            "text-muted-foreground transition-all hover:text-primary w-full gap-2 mt-2",
                            isCollapsed ? "justify-center px-2" : "justify-start"
                        )}
                        onClick={toggleTheme}
                        title={isCollapsed ? "Toggle theme" : undefined}
                    >
                        {themeMode === 'dark' ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
                        {!isCollapsed && <span>{themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
                    </Button>
                </div>
            </div>
        </div>
    );
}
