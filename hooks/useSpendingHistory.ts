
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, Timestamp, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase-client';
import { startOfMonth, subMonths, format, endOfMonth } from 'date-fns';

interface MonthlySpend {
    name: string; // "Jan", "Feb", etc.
    total: number;
    fullDate: string; // for sorting/tooltip
}

export function useSpendingHistory(userId?: string) {
    const [data, setData] = useState<MonthlySpend[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchHistory() {
            if (!userId || !db) {
                setIsLoading(false);
                return;
            }

            try {
                const now = new Date();
                const sixMonthsAgo = startOfMonth(subMonths(now, 5)); // Current month + 5 previous

                const receiptsRef = collection(db, 'receipts');
                const q = query(
                    receiptsRef,
                    where('userId', '==', userId),
                    where('date', '>=', Timestamp.fromDate(sixMonthsAgo)),
                    orderBy('date', 'asc')
                );

                const querySnapshot = await getDocs(q);

                // Initialize map with last 6 months to ensure no gaps
                const monthlyMap = new Map<string, number>();
                for (let i = 0; i < 6; i++) {
                    const d = subMonths(now, 5 - i);
                    const key = format(d, 'MMM');
                    monthlyMap.set(key, 0);
                }

                querySnapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    const amount = typeof data.amount === 'number' ? data.amount : parseFloat(data.amount);

                    let date: Date;
                    if (data.date instanceof Timestamp) {
                        date = data.date.toDate();
                    } else if (data.date instanceof Date) {
                        date = data.date;
                    } else {
                        date = new Date(data.date);
                    }

                    const monthKey = format(date, 'MMM');
                    // Only add if it's within our map (should be per query, but safe check)
                    if (monthlyMap.has(monthKey)) {
                        monthlyMap.set(monthKey, (monthlyMap.get(monthKey) || 0) + amount);
                    }
                });

                const chartData: MonthlySpend[] = Array.from(monthlyMap.entries()).map(([name, total]) => ({
                    name,
                    total,
                    fullDate: name // Simplified for now
                }));

                setData(chartData);
            } catch (err) {
                console.error("Error fetching spending history:", err);
                setError(err instanceof Error ? err : new Error('Unknown error'));
            } finally {
                setIsLoading(false);
            }
        }

        fetchHistory();
    }, [userId]);

    return { data, isLoading, error };
}
