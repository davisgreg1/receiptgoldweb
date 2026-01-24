'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';
import Image from 'next/image';
import { useTheme } from '../../theme/theme';
import { useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, LayoutDashboard, Receipt, Users, LogOut, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { isSuperAdmin } from '@/lib/auth-helpers';

export default function Header() {
    const { themeMode, toggleTheme } = useTheme();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (authUser) => {
            setUser(authUser);
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = async () => {
        if (auth) {
            await signOut(auth);
        }
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-50 backdrop-blur-lg border-b bg-background-primary/95 border-border-primary"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                {!user ? (
                                    <>
                                        <SheetHeader>
                                            <SheetTitle className="text-text-primary">Menu</SheetTitle>
                                        </SheetHeader>
                                        <div className="flex flex-col gap-4 mt-8">
                                            <nav className="flex flex-col gap-4">
                                                <a href="#features" className="text-sm font-medium text-text-primary hover:text-primary">Features</a>
                                                <a href="#how-it-works" className="text-sm font-medium text-text-primary hover:text-primary">How It Works</a>
                                                <a href="#download" className="text-sm font-medium text-text-primary hover:text-primary">Download</a>
                                            </nav>
                                            <div className="border-t pt-4 flex flex-col gap-2">
                                                <Link href="/portal/login" className="text-sm font-medium text-text-primary hover:text-primary px-2 py-1">
                                                    Sign In
                                                </Link>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // Portal Sidebar / Mobile Menu Style
                                    <div className="flex h-full flex-col gap-2 -mt-6">
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
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-primary transition-all hover:text-primary"
                                                >
                                                    <LayoutDashboard className="h-4 w-4" />
                                                    Dashboard
                                                </Link>
                                                <Link
                                                    href="/portal/receipts"
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-primary transition-all hover:text-primary"
                                                >
                                                    <Receipt className="h-4 w-4" />
                                                    Receipts
                                                </Link>
                                                <Link
                                                    href="/portal/team"
                                                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-primary transition-all hover:text-primary"
                                                >
                                                    <Users className="h-4 w-4" />
                                                    Team
                                                </Link>

                                                {isSuperAdmin(user.email) && (
                                                    <div className="mt-6">
                                                        <h4 className="mb-2 text-xs font-semibold text-text-secondary tracking-wider uppercase">
                                                            Super Admin
                                                        </h4>
                                                        <Link
                                                            href="/portal/admin"
                                                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-text-primary transition-all hover:text-primary"
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
                                                    <AvatarFallback className="text-black">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="truncate text-sm font-medium leading-none text-text-primary">
                                                        {user.displayName || 'User'}
                                                    </span>
                                                    <span className="truncate text-xs text-text-secondary mt-1">
                                                        {user.email}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="w-full justify-start gap-2 text-text-primary" onClick={handleSignOut}>
                                                <LogOut className="h-4 w-4" />
                                                Sign out
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </SheetContent>
                        </Sheet>

                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 relative">
                                <Image
                                    src="/images/logo.jpg"
                                    alt="ReceiptGold Logo"
                                    fill
                                    className="object-contain rounded-lg"
                                />
                            </div>
                            <span className="text-lg sm:text-2xl font-heading font-bold tracking-tight text-text-primary">
                                ReceiptGold
                            </span>
                        </Link>
                    </div>

                    {!user && (
                        <nav className="hidden lg:flex items-center space-x-6">
                            <a
                                href="#features"
                                className="text-sm font-medium transition-colors hover:opacity-70 text-text-secondary"
                            >
                                Features
                            </a>
                            <a
                                href="#how-it-works"
                                className="text-sm font-medium transition-colors hover:opacity-70 text-text-secondary"
                            >
                                How It Works
                            </a>
                            <a
                                href="#download"
                                className="text-sm font-medium transition-colors hover:opacity-70 text-text-secondary"
                            >
                                Download
                            </a>
                        </nav>
                    )}

                    <div className="flex items-center space-x-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2 rounded-full transition-colors duration-300 bg-background-secondary text-text-primary"
                            aria-label="Toggle theme"
                        >
                            {themeMode === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
                        </motion.button>

                        {user ? (
                            <>
                                <Link href="/portal/dashboard">
                                    <motion.span
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="hidden sm:inline-block px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-background-secondary text-text-primary cursor-pointer border border-transparent hover:border-border-primary"
                                    >
                                        Dashboard
                                    </motion.span>
                                </Link>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleSignOut}
                                    className="hidden sm:inline-block px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-background-secondary text-text-primary cursor-pointer border border-transparent hover:border-border-primary"
                                >
                                    Sign out
                                </motion.button>
                            </>
                        ) : (
                            <Link href="/portal/login">
                                <motion.span
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="hidden sm:inline-block px-4 py-2 rounded-full text-sm font-semibold transition-all hover:bg-background-secondary text-text-primary cursor-pointer border border-transparent hover:border-border-primary"
                                >
                                    Sign In
                                </motion.span>
                            </Link>
                        )}

                        {!user && (
                            <motion.a
                                href="#download"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="hidden sm:inline-block px-4 py-2 rounded-full text-sm font-semibold transition-all bg-gold-primary text-text-inverse"
                            >
                                Get Started Free
                            </motion.a>
                        )}
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
