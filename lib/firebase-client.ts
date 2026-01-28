import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

// Determine environment - defaults to production
// Set NEXT_PUBLIC_ENVIRONMENT=staging or VERCEL_ENV=preview to use staging
const environment = (
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'staging' ||
  process.env.VERCEL_ENV === 'preview'
) ? 'staging' : 'production';

// Firebase configuration for staging
const stagingConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY_STAGING || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN_STAGING || "receiptgold-staging.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID_STAGING || "receiptgold-staging",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET_STAGING || "receiptgold-staging.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID_STAGING || "438521087669",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID_STAGING || "1:438521087669:web:e5c1b1260fa499eff060fc",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID_STAGING || "G-225H53Z97T"
};

// Firebase configuration for production
const productionConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "receiptgold.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "receiptgold",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "receiptgold.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "311583810637",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:311583810637:web:58f4afec0b264732bbe804",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-XXXXXXXXXX" // Replace with actual production measurement ID
};

// Select configuration based on environment
const firebaseConfig = environment === 'staging' ? stagingConfig : productionConfig;

console.log(`🔥 Firebase Client initialized for: ${environment.toUpperCase()}`);
console.log(`📦 Project ID: ${firebaseConfig.projectId}`);
console.log(`🔑 Auth Domain: ${firebaseConfig.authDomain}`);

// Initialize Firebase (client-side only)
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let analytics: Analytics | undefined;

if (typeof window !== 'undefined') {
  // Only initialize on client-side
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);

  // Initialize Analytics only if supported
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app!);
      console.log('✅ Firebase Analytics initialized');
    }
  }).catch((error) => {
    console.log('❌ Analytics not supported:', error);
  });

  console.log('✅ Firebase Client initialized successfully');
}

export { auth, db, storage, analytics, firebaseConfig };
export default app;
