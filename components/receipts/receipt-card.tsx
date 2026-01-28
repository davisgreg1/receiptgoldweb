'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Receipt } from '@/types/receipt';
import { Timestamp } from 'firebase/firestore';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DigitalReceipt } from './digital-receipt';

interface ReceiptCardProps {
    receipt: Receipt;
    onClick: (receipt: Receipt) => void;
}

export function ReceiptCard({ receipt, onClick }: ReceiptCardProps) {
    const date = receipt.date instanceof Timestamp
        ? receipt.date.toDate()
        : new Date(receipt.date);

    const hasImage = receipt.images && receipt.images.length > 0;
    const imageUrl = hasImage ? receipt.images[0].url : null;

    return (
        <Card
            className={cn(
                "group overflow-hidden transition-all hover:shadow-lg cursor-pointer border-muted/60",
                "hover:border-primary/50"
            )}
            onClick={() => onClick(receipt)}
        >
            <div className="aspect-[3/4] w-full overflow-hidden bg-muted/20 relative">
                {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={imageUrl}
                        alt={receipt.vendor}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="h-full w-full flex items-start justify-center bg-gray-50 overflow-hidden pt-6">
                        <div className="scale-[0.60] origin-top w-[300px]">
                            <DigitalReceipt receipt={receipt} className="shadow-sm text-[10px]" />
                        </div>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            <CardContent className="p-4">
                <div className="space-y-1">
                    <h3 className="font-semibold leading-none truncate" title={receipt.vendor}>
                        {receipt.vendor}
                    </h3>
                    <div className="flex items-center text-xs text-muted-foreground">
                        <CalendarIcon className="mr-1 h-3 w-3" />
                        {date.toLocaleDateString()}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center font-bold text-lg text-primary">
                    <span className="text-sm mr-0.5">{(receipt.currency || 'USD') === 'USD' ? '$' : (receipt.currency || 'USD')}</span>
                    {receipt.amount.toFixed(2)}
                </div>
                <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full uppercase font-medium",
                    receipt.status === 'processed' ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                )}>
                    {receipt.status}
                </span>
            </CardFooter>
        </Card>
    );
}
