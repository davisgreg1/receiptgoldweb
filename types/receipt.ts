/* eslint-disable @typescript-eslint/no-explicit-any */
import { Timestamp } from 'firebase/firestore';

export interface Receipt {
    receiptId: string;
    userId: string;
    businessId?: string | null;
    vendor: string;
    amount: number;
    date: Timestamp | Date | any; // Allow explicit any if needed for transition, or better formatting
    description: string;
    category: string;
    currency: string;
    createdAt: any;
    updatedAt: any;
    status: string;
    teamAttribution?: {
        accountHolderId: string;
        createdByUserId: string;
        createdByEmail: string;
        createdByName?: string;
        isTeamReceipt: boolean;
    };
    images: Array<{
        url: string;
        size: number;
        uploadedAt: any;
    }>;
    extractedData?: {
        amount: number;
        tax?: number;
        confidence: number;
        date: string;
        vendor?: string;
        items: Array<any>;
        splitTender?: any;
    };
    tax: {
        category: string;
        deductible: boolean;
        deductionPercentage: number;
        taxYear: number;
        amount?: number;
    };
    insight?: string;
    tags: string[];
    processingErrors?: string[];
}
