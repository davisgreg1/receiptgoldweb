'use client';

import { useParams, useRouter } from 'next/navigation';
import { useReceipt } from '@/hooks/useReceipt';
import { auth } from '@/lib/firebase-client';
import { DigitalReceipt } from '@/components/receipts/digital-receipt';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Edit } from 'lucide-react';
import { db } from '@/lib/firebase-client';
import { deleteDoc, doc } from 'firebase/firestore';
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

export default function ReceiptDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const receiptId = params.receiptId as string;
    const user = auth?.currentUser;
    const { receipt, isLoading, error } = useReceipt(receiptId, user?.uid);
    const [isDeleting, setIsDeleting] = useState(false);
    const queryClient = useQueryClient();

    const handleDelete = async () => {
        if (!db || !receiptId) return;
        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, 'receipts', receiptId));
            // Invalidate queries to refresh lists
            queryClient.invalidateQueries({ queryKey: ['receipts'] });
            queryClient.invalidateQueries({ queryKey: ['recent-receipts'] });
            router.push('/portal/dashboard');
        } catch (err) {
            console.error("Error deleting receipt:", err);
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return <div className="p-8 flex justify-center">Loading receipt details...</div>;
    }

    if (error || !receipt) {
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

    return (
        <div className="container max-w-5xl py-8 space-y-6">
            <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <div className="flex gap-2">
                    <Button variant="outline" disabled>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                    </Button>
                    <AlertDialog>
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
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
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
                                <p>{new Date(receipt.date.seconds * 1000).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Time</p>
                                <p>{new Date(receipt.date.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Category</p>
                                <p className="capitalize">{receipt.category || 'Uncategorized'}</p>
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

                        {receipt.extractedData && (
                            <div className="mt-6 border-t pt-4">
                                <h3 className="font-semibold mb-2">Extracted Data</h3>
                                <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-40">
                                    {JSON.stringify(receipt.extractedData, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
