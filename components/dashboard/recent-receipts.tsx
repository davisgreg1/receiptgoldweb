'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useRecentReceipts } from '@/hooks/useRecentReceipts';
import { auth } from '@/lib/firebase-client';
import { Timestamp } from 'firebase/firestore';
import { Receipt } from '@/types/receipt';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from "@/components/ui/skeleton";

export function RecentReceipts() {
    const user = auth?.currentUser;
    const { receipts, isLoading } = useRecentReceipts(user?.uid);
    const router = useRouter();

    const handleReceiptClick = (receipt: Receipt) => {
        router.push(`/portal/receipts/${receipt.receiptId}`);
    };



    if (isLoading) {
        return (
            <Card className="col-span-full md:col-span-1 lg:col-span-4">
                <CardHeader>
                    <CardTitle>Recent Receipts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-8">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center">
                                <Skeleton className="h-9 w-9 rounded-full" />
                                <div className="ml-4 space-y-1">
                                    <Skeleton className="h-4 w-[120px]" />
                                    <Skeleton className="h-3 w-[80px]" />
                                </div>
                                <Skeleton className="ml-auto h-4 w-[60px]" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-full md:col-span-1 lg:col-span-4">
            <CardHeader>
                <CardTitle>Recent Receipts</CardTitle>
            </CardHeader>
            <CardContent>
                {receipts.length === 0 ? (
                    <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                        No recent transactions
                    </div>
                ) : (
                    <div className="space-y-8">
                        {receipts.map((receipt) => {
                            const date = receipt.date instanceof Timestamp
                                ? receipt.date.toDate()
                                : new Date(receipt.date);

                            const hasImage = receipt.images && receipt.images.length > 0;

                            // Logo logic
                            const vendorDomain = receipt.vendor.toLowerCase().replace(/\s+/g, '') + '.com';
                            const logoUrl = `https://img.logo.dev/${vendorDomain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}`;

                            return (
                                <div
                                    key={receipt.receiptId || Math.random()}
                                    className="flex items-center cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors"
                                    onClick={() => handleReceiptClick(receipt)}
                                >
                                    <Avatar className="h-9 w-9 hidden sm:flex">
                                        <AvatarImage src={logoUrl} alt={receipt.vendor} className="p-1 object-contain bg-white" />
                                        <AvatarFallback className="font-medium bg-primary/10 text-primary">
                                            {receipt.vendor.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{receipt.vendor}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {date.toLocaleDateString()}
                                            {hasImage && " • Scanned"}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: receipt.currency || 'USD',
                                        }).format(receipt.amount)}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
