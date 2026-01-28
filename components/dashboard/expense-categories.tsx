'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useExpenseCategories } from '@/hooks/useExpenseCategories';
import { auth } from '@/lib/firebase-client';
import { formatCategoryName } from '@/lib/utils';

export function ExpenseCategories() {
    const user = auth?.currentUser;
    const { categories, isLoading } = useExpenseCategories(user?.uid);

    if (isLoading) {
        return (
            <Card className="col-span-full md:col-span-1 lg:col-span-3">
                <CardHeader>
                    <CardTitle>Expense Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                        Loading...
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="col-span-full md:col-span-1 lg:col-span-3">
            <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
                {categories.length === 0 ? (
                    <div className="flex h-[350px] items-center justify-center text-muted-foreground">
                        No expenses this month
                    </div>
                ) : (
                    <div className="space-y-4">
                        {categories.map((item) => (
                            <div key={item.category} className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="font-medium">{formatCategoryName(item.category)}</span>
                                    <span className="text-muted-foreground">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD',
                                        }).format(item.amount)}
                                        {" "}
                                        ({item.percentage.toFixed(0)}%)
                                    </span>
                                </div>
                                <Progress value={item.percentage} />
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
