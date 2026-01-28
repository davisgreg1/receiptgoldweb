'use client';

import { useState } from 'react';
import { Receipt } from '@/types/receipt';
import { Timestamp } from 'firebase/firestore';
import { cn, formatCategoryName } from '@/lib/utils';

interface DigitalReceiptProps {
    receipt: Receipt;
    className?: string;
}

export function DigitalReceipt({ receipt, className }: DigitalReceiptProps) {
    const [imageError, setImageError] = useState(false);

    // Attempt to guess domain or fall back to clearbit standard lookup logic
    // Ideally we'd store this, but for now we try a simple heuristic
    const vendorDomain = receipt.vendor.toLowerCase().replace(/\s+/g, '') + '.com';
    const logoUrl = `https://img.logo.dev/${vendorDomain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_PUBLISHABLE_KEY}`;

    const dateObj = receipt.date instanceof Timestamp
        ? receipt.date.toDate()
        : new Date(receipt.date);

    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={cn("bg-white text-black font-mono p-6 pt-10 shadow-sm border border-gray-200 w-full max-w-[350px] mx-auto relative mt-8 shrink-0 sm:shrink", className)}>
            <div className="text-center mb-6">
                <div className="h-16 w-16 bg-white rounded-full mx-auto mb-2 flex items-center justify-center shadow-sm border overflow-hidden relative -mt-14 z-10">
                    {!imageError ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={logoUrl}
                            alt={receipt.vendor}
                            className="h-full w-full object-contain p-1"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="h-full w-full bg-pink-600 text-white flex items-center justify-center text-xl font-bold">
                            {receipt.vendor.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <h2 className="text-xl font-bold uppercase tracking-wider">{receipt.vendor}</h2>
                <div className="text-xs text-gray-400 mt-1">{formatCategoryName(receipt.category || 'Uncategorized')}</div>
            </div>

            <div className="border-b border-dashed border-gray-300 mb-4" />

            <div className="text-xs space-y-1 mb-4">
                <div className="flex justify-between">
                    <span>Receipt #: {receipt.receiptId?.substring(0, 8) || 'N/A'}</span>
                    <span>Trans ID: {receipt.receiptId?.substring(receipt.receiptId.length - 8) || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                    <span>Date: {formattedDate}</span>
                    <span>Time: {formattedTime}</span>
                </div>
            </div>

            <div className="border-b border-gray-300 mb-4" />

            <div className="mb-4">
                <div className="flex justify-between font-bold text-sm mb-2">
                    <span className="uppercase">{receipt.vendor} Purchase</span>
                    <span>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: receipt.currency || 'USD' }).format(receipt.amount)}
                    </span>
                </div>
            </div>

            {receipt.description && (
                <div className="mb-4">
                    <h3 className="font-bold text-xs uppercase mb-1">Description:</h3>
                    <p className="text-xs">{receipt.description}</p>
                </div>
            )}

            {receipt.tax && receipt.tax.amount && (
                <div className="flex justify-between text-xs mb-2">
                    <span>Tax</span>
                    <span>
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: receipt.currency || 'USD' }).format(receipt.tax.amount)}
                    </span>
                </div>
            )}

            <div className="border-b border-black mb-2" />

            <div className="flex justify-between items-center font-bold text-lg mb-4">
                <span className="uppercase">Total:</span>
                <span>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: receipt.currency || 'USD' }).format(receipt.amount)}
                </span>
            </div>

            <div className="border-b border-gray-300 mb-4" />

            <div className="text-center text-xs text-gray-500 mt-6">
                <p className="mb-1">Payment: {receipt.status === 'processed' ? 'Processed' : 'Pending'}</p>
                <p>Thank you for your business!</p>
                <p className="mt-2 text-[10px]">Powered by ReceiptGold</p>
            </div>
        </div>
    );
}
