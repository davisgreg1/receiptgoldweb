'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { PortalSidebar } from '@/components/portal/portal-sidebar'; // Will create this next
import { Loader2, Menu, LayoutDashboard, Receipt, Users, LogOut, ShieldAlert, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { isSuperAdmin } from '@/lib/auth-helpers';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTheme } from '@/app/theme/theme';
import { FaMoon, FaSun } from 'react-icons/fa';
import Footer from '@/app/components/layout/Footer';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    function ThemeToggle() {
        const { themeMode, toggleTheme } = useTheme();
        return (
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-primary transition-colors"
            >
                {themeMode === 'dark' ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </Button>
        );
    }

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            if (!authUser) {
                // Not logged in, redirect to login
                router.push('/portal/login');
            } else {
                setUser(authUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return null; // Will redirect
    }

    return (
        <div className="flex min-h-screen bg-muted/20 dark:bg-background">
            <PortalSidebar user={user} />
            <div className="flex-1 flex flex-col">
                {/* Mobile Header */}
                <header className="flex h-16 items-center border-b bg-card px-6 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <Menu className="h-6 w-6 text-text-primary" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] p-0">
                            {/* Reusing Sidebar Logic for Mobile */}
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
                                        <Link
                                            href="/portal/dashboard"
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                        >
                                            <LayoutDashboard className="h-4 w-4" />
                                            Dashboard
                                        </Link>
                                        <Link
                                            href="/portal/receipts"
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                        >
                                            <Receipt className="h-4 w-4" />
                                            Receipts
                                        </Link>
                                        <Link
                                            href="/portal/team"
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                        >
                                            <Users className="h-4 w-4" />
                                            Team
                                        </Link>
                                        <Link
                                            href="/portal/settings"
                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                                        >
                                            <Settings className="h-4 w-4" />
                                            Settings
                                        </Link>

                                        {isSuperAdmin(user.email) && (
                                            <div className="mt-6">
                                                <h4 className="mb-2 text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                                                    Super Admin
                                                </h4>
                                                <Link
                                                    href="/portal/admin"
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
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
                                    <Button variant="outline" className="w-full justify-start gap-2" onClick={() => auth && signOut(auth)}>
                                        <LogOut className="h-4 w-4" />
                                        Sign out
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <span className="ml-4 text-lg font-semibold">Dashboard</span>
                    <div className="ml-auto">
                        <ThemeToggle />
                    </div>
                </header>
                <main className="flex-1 p-6 md:p-8 pt-6">
                    {children}
                </main>
                <Footer variant="portal" />
            </div>
        </div>
    );
}
