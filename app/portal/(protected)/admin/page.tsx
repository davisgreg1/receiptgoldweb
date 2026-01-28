/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { isSuperAdmin } from '@/lib/auth-helpers';
import { getUsers } from '@/app/actions/get-users';
import { Loader2, Search, ChevronLeft, ChevronRight, XCircle, Mail } from 'lucide-react';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboardPage() {
    const router = useRouter();
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [user, setUser] = useState(auth?.currentUser);

    // Filters & Pagination State
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [providerFilter, setProviderFilter] = useState<'all' | 'google' | 'apple' | 'email'>('all');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Debounce Search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1); // Reset page on new search
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    // Reset page on filter change
    useEffect(() => {
        setPage(1);
    }, [statusFilter, providerFilter]);

    // Initial Auth Check
    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                if (!isSuperAdmin(currentUser.email)) {
                    router.push('/portal/dashboard');
                } else {
                    setUser(currentUser);
                    setIsAuthLoading(false);
                }
            } else {
                router.push('/portal/login');
            }
        });
        return () => unsubscribe();
    }, [router]);

    // React Query Fetcher
    const { data, isLoading: isQueryLoading, isError, error } = useQuery({
        queryKey: ['admin-users', page, pageSize, debouncedSearch, statusFilter, providerFilter],
        queryFn: async () => {
            if (!auth?.currentUser) throw new Error("Not authenticated");
            const token = await auth.currentUser.getIdToken();
            return getUsers({
                idToken: token,
                page,
                pageSize,
                search: debouncedSearch,
                status: statusFilter,
                provider: providerFilter
            });
        },
        enabled: !!user && !isAuthLoading,
        placeholderData: keepPreviousData,
    });

    // Combined Loading state
    const isLoading = isAuthLoading || (isQueryLoading && !data);
    const users = data?.users || [];
    const totalUsers = data?.total || 0;
    const totalPages = Math.ceil(totalUsers / pageSize);

    if (isLoading) {
        return (
            <div className="flex w-full h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-8 text-center text-red-500">
                Error loading users: {error?.message || 'Unknown error'}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
                <Button variant="outline" className="text-text-primary hidden sm:flex">Export Data</Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, email, or ID..."
                        className="pl-9"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {search && (
                        <button
                            onClick={() => setSearch('')}
                            className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <XCircle className="h-4 w-4" />
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <select
                        className="text-muted-foreground transition-all hover:text-primary h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as any)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <select
                        className="text-muted-foreground transition-all hover:text-primary h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        value={providerFilter}
                        onChange={(e) => setProviderFilter(e.target.value as any)}
                    >
                        <option value="all">All Sources</option>
                        <option value="google">Google</option>
                        <option value="apple">Apple</option>
                        <option value="email">Email</option>
                    </select>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>All Users</span>
                        <span className="text-sm font-normal text-muted-foreground">
                            Total: {totalUsers}
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border relative">
                        {isQueryLoading && data && (
                            <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-10 transition-opacity">
                                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                            </div>
                        )}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Photo</TableHead>
                                    <TableHead>User Details</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Provider</TableHead>
                                    <TableHead className="text-right">Created</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-24 text-center">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user) => (
                                        <TableRow key={user.uid}>
                                            <TableCell>
                                                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                                                    {user.photoURL ? (
                                                        <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" />
                                                    ) : (
                                                        <span className="text-sm font-medium">
                                                            {(user.email || user.displayName || '?').charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium">{user.displayName || 'No Name'}</span>
                                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                                    <span className="text-[10px] text-muted-foreground font-mono mt-0.5">ID: {user.uid}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${!user.disabled
                                                    ? 'bg-green-500/10 text-green-600'
                                                    : 'bg-red-500/10 text-red-600'
                                                    }`}>
                                                    {!user.disabled ? 'Active' : 'Disabled'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    {user.providerData.map(p => {
                                                        if (p.providerId === 'google.com') {
                                                            return <FaGoogle key={p.providerId} className="h-4 w-4 text-red-500" title="Google" />;
                                                        }
                                                        if (p.providerId === 'apple.com') {
                                                            return <FaApple key={p.providerId} className="h-4 w-4 text-black dark:text-white" title="Apple" />;
                                                        }
                                                        if (p.providerId === 'password') {
                                                            return <Mail key={p.providerId} className="h-4 w-4 text-gray-500" />;
                                                        }
                                                        return (
                                                            <span key={p.providerId} className="text-xs bg-muted px-1.5 py-0.5 rounded capitalize">
                                                                {p.providerId.replace('.com', '')}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right text-xs text-muted-foreground">
                                                {new Date(user.metadata.creationTime).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between space-x-2 py-4">
                        <div className="text-sm text-muted-foreground">
                            Page {page} of {totalPages || 1}
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1 || isQueryLoading}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page >= totalPages || isQueryLoading}
                            >
                                Next
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
