'use client';


import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { isSuperAdmin } from '@/lib/auth-helpers';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock Data for now
const users = [
    {
        id: 'u1',
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'User',
        status: 'Active',
        joined: '2023-11-01',
    },
    {
        id: 'u2',
        name: 'Bob Smith',
        email: 'bob@example.com',
        role: 'User',
        status: 'Inactive',
        joined: '2023-10-15',
    },
    {
        id: 'u3',
        name: 'Greg Davis',
        email: 'greg@receiptgold.com',
        role: 'Admin',
        status: 'Active',
        joined: '2023-01-01',
    },
];


export default function AdminDashboardPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!isSuperAdmin(user.email)) {
                    router.push('/portal/dashboard');
                }
            } else {
                // Not logged in, handled by layout mostly, but safe to redirect
                router.push('/portal/login');
            }
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [router]);

    if (isLoading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Super Admin</h1>
                <Button variant="outline" className="text-text-primary">Export Data</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>User Management</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>A list of all registered users.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Joined</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <span className={user.status === 'Active' ? 'text-green-600' : 'text-red-600'}>
                                            {user.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">{user.joined}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
