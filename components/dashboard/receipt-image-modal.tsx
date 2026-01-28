'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import { Receipt } from "@/types/receipt";
import { DigitalReceipt } from "@/components/receipts/digital-receipt";
import { Timestamp } from "firebase/firestore";

interface ReceiptImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    receipt: Receipt | null;
}

export function ReceiptImageModal({
    isOpen,
    onClose,
    receipt
}: ReceiptImageModalProps) {
    if (!receipt) return null;

    const hasImage = receipt.images && receipt.images.length > 0;
    const imageUrl = hasImage ? receipt.images[0].url : null;

    // Format date for title
    const dateObj = receipt.date instanceof Timestamp
        ? receipt.date.toDate()
        : new Date(receipt.date);
    const dateStr = dateObj.toLocaleDateString();

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{receipt.vendor} - {dateStr}</DialogTitle>
                    <DialogDescription className="sr-only">
                        Digital receipt view for {receipt.vendor} transaction on {dateStr}
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center p-4 bg-muted/20 rounded-md overflow-hidden flex-1 min-h-[300px]">
                    {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={imageUrl}
                            alt={`Receipt from ${receipt.vendor}`}
                            className="max-w-full max-h-[70vh] object-contain"
                        />
                    ) : (
                        <DigitalReceipt receipt={receipt} className="shadow-none border-0 w-full" />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
