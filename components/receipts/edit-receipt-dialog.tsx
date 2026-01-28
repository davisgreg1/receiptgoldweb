import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Receipt } from "@/types/receipt";
import { db } from "@/lib/firebase-client";
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { formatCategoryName } from "@/lib/utils";

const formSchema = z.object({
    vendor: z.string().min(1, "Vendor name is required"),
    amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
        message: "Amount must be a valid number",
    }),
    date: z.string().min(1, "Date is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
});

interface EditReceiptDialogProps {
    receipt: Receipt;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
    "office_supplies",
    "equipment_software",
    "professional_services",
    "travel",
    "transportation",
    "restaurant",
    "business_meals",
    "utilities",
    "groceries",
    "entertainment",
    "shopping",
    "healthcare",
    "other",
];

export function EditReceiptDialog({
    receipt,
    open,
    onOpenChange,
}: EditReceiptDialogProps) {
    const queryClient = useQueryClient();
    const [isSaving, setIsSaving] = useState(false);

    // Helper to format Date/Timestamp to "YYYY-MM-DDTHH:mm" for datetime-local input
    const formatDateForInput = (dateVal: any) => {
        try {
            const d = dateVal instanceof Timestamp ? dateVal.toDate() : new Date(dateVal);
            return format(d, "yyyy-MM-dd'T'HH:mm");
        } catch (e) {
            return format(new Date(), "yyyy-MM-dd'T'HH:mm");
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vendor: receipt.vendor || "",
            amount: receipt.amount.toString(),
            date: formatDateForInput(receipt.date),
            category: receipt.category || "other",
            description: receipt.description || "",
        },
    });

    // Reset form when receipt changes
    useEffect(() => {
        if (open) {
            form.reset({
                vendor: receipt.vendor || "",
                amount: receipt.amount.toString(),
                date: formatDateForInput(receipt.date),
                category: receipt.category || "other",
                description: receipt.description || "",
            });
        }
    }, [receipt, open, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!receipt.receiptId || !db) return;
        setIsSaving(true);
        try {
            const updates: Partial<Receipt> = {
                vendor: values.vendor,
                amount: parseFloat(values.amount),
                date: Timestamp.fromDate(new Date(values.date)),
                category: values.category,
                description: values.description || "",
                updatedAt: Timestamp.now(), // Update timestamp
            };

            await updateDoc(doc(db, "receipts", receipt.receiptId), updates);

            // Invalidate queries to refresh data
            queryClient.invalidateQueries({ queryKey: ["receipts"] });
            queryClient.invalidateQueries({ queryKey: ["recent-receipts"] });
            // Also invalidate the specific receipt query
            queryClient.invalidateQueries({ queryKey: ["receipt", receipt.receiptId] });

            onOpenChange(false);
        } catch (error) {
            console.error("Error updating receipt:", error);
            // Could show an error toast here
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Receipt</DialogTitle>
                    <DialogDescription>
                        Update the details of this receipt.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="vendor">Vendor</Label>
                        <Input
                            id="vendor"
                            {...form.register("vendor")}
                        />
                        {form.formState.errors.vendor && (
                            <p className="text-sm text-red-500">{form.formState.errors.vendor.message}</p>
                        )}
                    </div>

                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            {...form.register("amount")}
                        />
                        {form.formState.errors.amount && (
                            <p className="text-sm text-red-500">{form.formState.errors.amount.message}</p>
                        )}
                    </div>

                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="date">Date & Time</Label>
                        <Input
                            id="date"
                            type="datetime-local"
                            {...form.register("date")}
                        />
                        {form.formState.errors.date && (
                            <p className="text-sm text-red-500">{form.formState.errors.date.message}</p>
                        )}
                    </div>

                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            onValueChange={(val) => form.setValue("category", val)}
                            defaultValue={form.getValues("category")}
                            value={form.watch("category")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {CATEGORIES.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {formatCategoryName(cat)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {form.formState.errors.category && (
                            <p className="text-sm text-red-500">{form.formState.errors.category.message}</p>
                        )}
                    </div>

                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            {...form.register("description")}
                            className="resize-none"
                            rows={3}
                        />
                        {form.formState.errors.description && (
                            <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
