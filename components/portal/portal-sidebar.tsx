'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    LayoutDashboard,
    Receipt,
    Users,
    LogOut,
    ShieldAlert,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { isSuperAdmin } from '@/lib/auth-helpers';

interface PortalSidebarProps {
    user: User;
}

export function PortalSidebar({ user }: PortalSidebarProps) {
    const pathname = usePathname();

    const handleSignOut = async () => {
        if (auth) {
            await signOut(auth);
        }
    };

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
        },
        // {
        //   title: 'Settings',
        //   href: '/portal/settings',
        //   icon: Settings,
        // },
    ];

    return (
        <div className="hidden border-r bg-card md:block md:w-64 lg:w-72">
            <div className="flex h-full flex-col gap-2">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <span className="text-xl font-bold text-primary">ReceiptGold</span>
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            Admin
                        </span>
                    </Link>
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
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.title}
                                </Link>
                            );
                        })}

                        {/* Super Admin Section */}
                        {isSuperAdmin(user.email) && (
                            <div className="mt-6">
                                <h4 className="mb-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                                    Super Admin
                                </h4>
                                <Link
                                    href="/portal/admin"
                                    className={cn(
                                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                                        pathname.startsWith('/portal/admin')
                                            ? "bg-muted text-primary"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    <ShieldAlert className="h-4 w-4" />
                                    Users & System
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
                <div className="mt-auto border-t p-4">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <Avatar className="h-9 w-9 border">
                            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col overflow-hidden">
                            <span className="truncate text-sm font-medium leading-none">
                                {user.displayName || 'User'}
                            </span>
                            <span className="truncate text-xs text-muted-foreground mt-1">
                                {user.email}
                            </span>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full justify-start gap-2" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4" />
                        Sign out
                    </Button>
                </div>
            </div>
        </div>
    );
}
