/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { UserSubscription } from '@/hooks/useSubscription';
import { adminDb } from '@/lib/firebase-admin';

function serializeFirestoreData(data: Record<string, any>): Record<string, any> {
    const serialized: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
        if (value === null || value === undefined) {
            serialized[key] = value;
        } else if (value?.toDate && typeof value.toDate === 'function') {
            // Firestore Timestamp
            serialized[key] = value.toDate().toISOString();
        } else if (Array.isArray(value)) {
            // Handle arrays (might contain timestamps or nested objects)
            serialized[key] = value.map(item =>
                item && typeof item === 'object'
                    ? item?.toDate ? item.toDate().toISOString() : serializeFirestoreData(item)
                    : item
            );
        } else if (typeof value === 'object') {
            // Recursively handle nested objects
            serialized[key] = serializeFirestoreData(value);
        } else {
            serialized[key] = value;
        }
    }

    return serialized;
}

export async function getUserSubscription(userId: string): Promise<UserSubscription | null> {
    const subscriptionRef = adminDb.collection('subscriptions').where('userId', '==', userId);
    const subscriptionSnapshot = await subscriptionRef.get();

    if (subscriptionSnapshot.empty) {
        return null;
    }

    const data = subscriptionSnapshot.docs[0].data();

    return {
        id: subscriptionSnapshot.docs[0].id,
        ...serializeFirestoreData(data),
    } as UserSubscription;
}