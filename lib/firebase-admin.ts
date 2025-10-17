import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Determine environment - defaults to production
// Set NEXT_PUBLIC_ENVIRONMENT=staging or VERCEL_ENV=preview to use staging
const environment = process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging' ||
                   process.env.VERCEL_ENV === 'preview'
                   ? 'staging'
                   : 'production';

// Select environment-specific credentials
const projectId = environment === 'staging'
  ? (process.env.FIREBASE_STAGING_PROJECT_ID || process.env.FIREBASE_PROJECT_ID)
  : process.env.FIREBASE_PROJECT_ID;

const privateKey = environment === 'staging'
  ? (process.env.FIREBASE_STAGING_PRIVATE_KEY || process.env.FIREBASE_PRIVATE_KEY)
  : process.env.FIREBASE_PRIVATE_KEY;

const clientEmail = environment === 'staging'
  ? (process.env.FIREBASE_STAGING_CLIENT_EMAIL || process.env.FIREBASE_CLIENT_EMAIL)
  : process.env.FIREBASE_CLIENT_EMAIL;

console.log(`🔥 Firebase Admin initialized for: ${environment.toUpperCase()}`);
console.log(`📦 Project ID: ${projectId}`);
console.log(`📧 Client Email: ${clientEmail}`);
console.log(`🔑 Private Key exists: ${!!privateKey}`);

// Validate required credentials
if (!projectId) {
  throw new Error(`Missing Firebase project ID for ${environment} environment. Please set ${environment === 'staging' ? 'FIREBASE_STAGING_PROJECT_ID' : 'FIREBASE_PROJECT_ID'} in environment variables.`);
}

if (!privateKey) {
  throw new Error(`Missing Firebase private key for ${environment} environment. Please set ${environment === 'staging' ? 'FIREBASE_STAGING_PRIVATE_KEY' : 'FIREBASE_PRIVATE_KEY'} in environment variables.`);
}

if (!clientEmail) {
  throw new Error(`Missing Firebase client email for ${environment} environment. Please set ${environment === 'staging' ? 'FIREBASE_STAGING_CLIENT_EMAIL' : 'FIREBASE_CLIENT_EMAIL'} in environment variables.`);
}

// Initialize Firebase Admin SDK (server-side only)
if (!getApps().length) {
  try {
    initializeApp({
      credential: cert({
        projectId: projectId,
        privateKey: privateKey.replace(/\\n/g, '\n'),
        clientEmail: clientEmail,
      }),
      databaseURL: `https://${projectId}-default-rtdb.firebaseio.com`
    });
    console.log('✅ Firebase Admin initialized successfully');
  } catch (error) {
    console.error('❌ Firebase Admin initialization error:', error);
    throw error;
  }
}

export const adminDb = getFirestore();