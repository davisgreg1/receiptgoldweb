'use server';

import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { isSuperAdmin } from '@/lib/auth-helpers';

interface GetUsersParams {
    idToken: string;
    page: number;
    pageSize: number;
    search?: string;
    status?: 'all' | 'active' | 'inactive';
    provider?: 'all' | 'google' | 'apple' | 'email';
}

export interface AdminUser {
    uid: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    disabled: boolean;
    metadata: {
        creationTime: string;
        lastSignInTime: string;
    };
    providerData: {
        providerId: string;
    }[];
}

export async function getUsers({ idToken, page, pageSize, search, status, provider }: GetUsersParams) {
    try {
        // 1. Verify Authentication & Authorization
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        if (!isSuperAdmin(decodedToken.email)) {
            throw new Error('Unauthorized: Super Admin access required');
        }

        // 2. Fetch Users (Max 1000 for this implementation to allow in-memory filtering)
        const listUsersResult = await adminAuth.listUsers(1000);
        let users = listUsersResult.users;

        // 3. Filter by Search Query
        if (search) {
            const lowerSearch = search.toLowerCase();
            users = users.filter(user =>
                user.email?.toLowerCase().includes(lowerSearch) ||
                user.displayName?.toLowerCase().includes(lowerSearch) ||
                user.uid.toLowerCase().includes(lowerSearch)
            );
        }

        // 4. Filter by Status
        if (status && status !== 'all') {
            const shouldBeDisabled = status === 'inactive';
            users = users.filter(user => user.disabled === shouldBeDisabled);
        }

        // 5. Filter by Provider
        if (provider && provider !== 'all') {
            if (provider === 'google') {
                users = users.filter(user => user.providerData.some(p => p.providerId === 'google.com'));
            } else if (provider === 'apple') {
                users = users.filter(user => user.providerData.some(p => p.providerId === 'apple.com'));
            } else if (provider === 'email') {
                // Firebase uses 'password' for email/password sign-in
                users = users.filter(user => user.providerData.some(p => p.providerId === 'password'));
            }
        }

        // 6. Pagination
        const total = users.length;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedUsers = users.slice(start, end);

        // 6. Serialize for Next.js (Server Actions must return serializable data)
        const serializedUsers: AdminUser[] = paginatedUsers.map(user => ({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            disabled: user.disabled,
            metadata: {
                creationTime: user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime,
            },
            providerData: user.providerData.map(p => ({ providerId: p.providerId })),
        }));

        return {
            users: serializedUsers,
            total,
            page,
            pageSize
        };

    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
}

export async function getUserSubscription(userId: string) {
    const subscriptionRef = adminDb.collection('subscriptions').where('userId', '==', userId);
    const subscriptionSnapshot = await subscriptionRef.get();
    console.log("🚀 ~ getUserSubscription ~ subscriptionSnapshot:", subscriptionSnapshot)
    if (subscriptionSnapshot.empty) {
        return null;
    }
    return subscriptionSnapshot.docs[0].data();
}
