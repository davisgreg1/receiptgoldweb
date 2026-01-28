'use client';

import { useParams, useRouter } from 'next/navigation';
import { useReceipt } from '@/hooks/useReceipt';
import { auth } from '@/lib/firebase-client';
import { DigitalReceipt } from '@/components/receipts/digital-receipt';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Edit, Expand, Share2, Check } from 'lucide-react';
import { EditReceiptDialog } from "@/components/receipts/edit-receipt-dialog";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { db } from '@/lib/firebase-client';
import { deleteDoc, doc, Timestamp } from 'firebase/firestore';
import { formatCategoryName } from '@/lib/utils';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReceiptDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const receiptId = params.receiptId as string;
    const user = auth?.currentUser;
    const { receipt, isLoading, error } = useReceipt(receiptId, user?.uid);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const queryClient = useQueryClient();

    const handleDelete = async () => {
        // ... existing handleDelete logic
        if (!db || !receiptId) return;
        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, 'receipts', receiptId));
            queryClient.invalidateQueries({ queryKey: ['receipts'] });
            queryClient.invalidateQueries({ queryKey: ['recent-receipts'] });
            router.push('/portal/dashboard');
        } catch (err) {
            console.error("Error deleting receipt:", err);
            setIsDeleting(false);
        }
    };

    const handleShare = async () => {
        const url = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Receipt from ${receipt?.vendor}`,
                    text: `Check out this receipt from ${receipt?.vendor}`,
                    url: url,
                });
            } catch (err) {
                console.log('Error sharing:', err);
                // Fallback to clipboard if share fails or is cancelled
            }
            return;
        }

        try {
            await navigator.clipboard.writeText(url);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // ... existing loading/error checks

    if (isLoading) {
        // ... existing skeleton return
        return (
            <div className="container max-w-5xl py-8 space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-20" />
                    <div className="flex gap-2">
                        <Skeleton className="h-10 w-20" />
                        <Skeleton className="h-10 w-20" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Visual Representation Skeleton */}
                    <div className="flex justify-center bg-muted/10 p-8 rounded-lg border border-dashed border-muted-foreground/20 h-[500px]">
                        <Skeleton className="h-full w-full max-w-[350px]" />
                    </div>

                    {/* Details Skeleton */}
                    <div className="space-y-6">
                        <div>
                            <Skeleton className="h-10 w-3/4 mb-2" />
                            <Skeleton className="h-6 w-1/4" />
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i}>
                                        <Skeleton className="h-4 w-16 mb-1" />
                                        <Skeleton className="h-5 w-32" />
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 border-t pt-4">
                                <Skeleton className="h-6 w-32 mb-2" />
                                <Skeleton className="h-40 w-full rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !receipt) {
        // ... existing error return
        return (
            <div className="p-8">
                <div className="text-red-500 mb-4">Error loading receipt or receipt not found.</div>
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                </Button>
            </div>
        );
    }

    const hasImage = receipt.images && receipt.images.length > 0;
    const imageUrl = hasImage ? receipt.images[0].url : null;


    const dateObj = receipt.date instanceof Timestamp
        ? receipt.date.toDate()
        : new Date(receipt.date);

    return (
        <div className="container max-w-5xl py-8 space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleShare} className="transition-all hover:text-primary text-muted-foreground">
                        {isCopied ? <Check className="mr-2 h-4 w-4 text-green-600" /> : <Share2 className="mr-2 h-4 w-4" />}
                        {isCopied ? "Copied" : "Share"}
                    </Button>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="transition-all hover:text-primary text-muted-foreground">
                                <Expand className="mr-2 h-4 w-4" /> Zoom
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden bg-transparent border-0 shadow-none flex items-center justify-center [&>button:last-child]:hidden">
                            <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                                <div className="pointer-events-auto relative max-h-full max-w-full overflow-auto rounded-lg bg-background p-4 shadow-lg">
                                    <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/80 p-2 hover:bg-white transition-colors">
                                        <span className="sr-only">Close</span>
                                        <div className="h-4 w-4">✕</div> {/* Simple close icon or verify visual */}
                                    </DialogClose>
                                    {hasImage ? (
                                        /* eslint-disable-next-line @next/next/no-img-element */
                                        <img
                                            src={imageUrl!}
                                            alt={receipt.vendor}
                                            className="max-h-[85vh] w-auto object-contain"
                                        />
                                    ) : (
                                        <div className="h-[80vh] flex items-center justify-center bg-white p-8">
                                            <DigitalReceipt receipt={receipt} className="shadow-none border-0 scale-125 origin-center" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Button
                        variant="outline"
                        className="transition-all hover:text-primary text-muted-foreground"
                        onClick={() => setIsEditing(true)}
                    >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>

                    <EditReceiptDialog
                        receipt={receipt}
                        open={isEditing}
                        onOpenChange={setIsEditing}
                    />

                    <AlertDialog>
                        {/* ... existing alert dialog trigger/content */}
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={isDeleting}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the receipt from {receipt.vendor}.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="transition-all hover:text-primary text-muted-foreground">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Visual Representation */}
                <div className="flex justify-center bg-muted/10 p-8 rounded-lg border border-dashed border-muted-foreground/20">
                    {hasImage ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            src={imageUrl!}
                            alt={receipt.vendor}
                            className="max-w-full max-h-[70vh] object-contain shadow-md"
                        />
                    ) : (
                        <DigitalReceipt receipt={receipt} className="shadow-md" />
                    )}
                </div>

                {/* Details */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{receipt.vendor}</h1>
                        <p className="text-muted-foreground">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: receipt.currency || 'USD' }).format(receipt.amount)}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 border-t pt-4">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Date</p>
                                <p>{dateObj.toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Time</p>
                                <p>{dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Category</p>
                                <p className="capitalize">{formatCategoryName(receipt.category || 'Uncategorized')}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Status</p>
                                <p className="capitalize">{receipt.status}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Description</p>
                                <p>{receipt.description || '-'}</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
