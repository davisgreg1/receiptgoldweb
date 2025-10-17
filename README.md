This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ReceiptGold Web - Team Invitation Portal

This Next.js application handles team invitation acceptance for ReceiptGold, supporting both **staging** and **production** environments.

## Environment Setup

### Prerequisites
1. Copy `.env.example` to `.env` for production credentials
2. Get Firebase Admin SDK credentials from Firebase Console > Project Settings > Service Accounts

### Production Environment (default)
```bash
# .env
FIREBASE_PROJECT_ID=receiptgold
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@receiptgold.iam.gserviceaccount.com
```

### Staging Environment
For staging environment, add staging credentials to your `.env` file:
```bash
# .env
NEXT_PUBLIC_ENVIRONMENT=staging
FIREBASE_STAGING_PROJECT_ID=receiptgold-dev
FIREBASE_STAGING_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_STAGING_CLIENT_EMAIL=firebase-adminsdk-xxxxx@receiptgold-dev.iam.gserviceaccount.com
```

## Getting Started

Run the development server:

```bash
# Production environment
npm run dev

# Staging environment
npm run dev:staging
```

Open [http://localhost:8089](http://localhost:8089) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
