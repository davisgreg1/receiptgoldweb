'use client';

import { useState } from 'react';
import { auth } from '@/lib/firebase-client';
import { useAllReceipts } from '@/hooks/useAllReceipts';
import { Receipt } from '@/types/receipt';
import { Card, CardContent } from '@/components/ui/card';
import { ReceiptCard } from '@/components/receipts/receipt-card';
import { ReceiptImageModal } from '@/components/dashboard/receipt-image-modal';

export default function ReceiptsPage() {
    const user = auth?.currentUser;
    const { receipts, isLoading } = useAllReceipts(user?.uid);
    const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleReceiptClick = (receipt: Receipt) => {
        setSelectedReceipt(receipt);
    };

    const filteredReceipts = receipts.filter(receipt =>
        receipt.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (receipt.amount && receipt.amount.toString().includes(searchQuery))
    );

    if (isLoading) {
        return <div className="p-8">Loading receipts...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Receipts</h1>
                    <p className="text-muted-foreground">Manage and view your receipts.</p>
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="p-4 border-b bg-muted/40 flex justify-between items-center">
                        <div className="relative w-full max-w-sm">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <input
                                type="search"
                                className="flex h-9 w-full rounded-md border border-input bg-background pl-8 px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Search receipts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredReceipts.map((receipt) => (
                    <ReceiptCard
                        key={receipt.receiptId || Math.random()}
                        receipt={receipt}
                        onClick={handleReceiptClick}
                    />
                ))}
            </div>

            {filteredReceipts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    {searchQuery ? 'No receipts match your search.' : 'No receipts found.'}
                </div>
            )}

            <ReceiptImageModal
                isOpen={!!selectedReceipt}
                onClose={() => setSelectedReceipt(null)}
                receipt={selectedReceipt}
            />
        </div>
    );
}
