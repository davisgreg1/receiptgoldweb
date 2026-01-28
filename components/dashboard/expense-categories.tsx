'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenseCategories } from '@/hooks/useExpenseCategories';
import { auth } from '@/lib/firebase-client';
import { formatCategoryName } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

const COLORS = [
    'hsl(var(--primary))',
    'hsl(215 20.2% 65.1%)',
    'hsl(217.2 32.6% 17.5%)',
    'hsl(var(--muted-foreground))',
    '#e5e7eb'
];

export function ExpenseCategories() {
    const user = auth?.currentUser;
    const { categories, isLoading } = useExpenseCategories(user?.uid);

    if (isLoading) {
        return (
            <Card className="col-span-full lg:col-span-3">
                <CardHeader>
                    <CardTitle>Expense Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[300px] w-full rounded-full" />
                </CardContent>
            </Card>
        );
    }

    // Limit to top 5 categories + "Others" if needed for cleaner chart
    const data = categories.slice(0, 5).map(c => ({
        name: formatCategoryName(c.category),
        value: c.amount
    }));

    return (
        <Card className="col-span-full lg:col-span-3 transition-all hover:shadow-md">
            <CardHeader>
                <CardTitle>Expense Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                {data.length === 0 ? (
                    <div className="flex h-[300px] items-center justify-center text-muted-foreground">
                        No expenses this month
                    </div>
                ) : (
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number | undefined) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value ?? 0)}
                                    contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
                                />
                                <Legend layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
