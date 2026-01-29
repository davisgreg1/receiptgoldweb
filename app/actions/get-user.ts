'use server';

import { adminAuth } from '@/lib/firebase-admin';
import { isSuperAdmin } from '@/lib/auth-helpers';
import { AdminUser } from './get-users';

export async function getUser(idToken: string, uid: string): Promise<AdminUser | null> {
    try {
        // 1. Verify Authentication & Authorization
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        if (!isSuperAdmin(decodedToken.email)) {
            throw new Error('Unauthorized: Super Admin access required');
        }

        // 2. Fetch User
        const user = await adminAuth.getUser(uid);

        // 3. Serialize
        return {
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
        };

    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}
