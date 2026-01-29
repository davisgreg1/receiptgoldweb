'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/lib/firebase-client';
import { useSubscription } from '@/hooks/useSubscription';
import { useReceiptsCount } from '@/hooks/useReceiptsCount';
import { useMonthlySpend } from '@/hooks/useMonthlySpend';
import { cn } from '@/lib/utils';
import { useTeamMembersCount } from '@/hooks/useTeamMembersCount';
import { RecentReceipts } from '@/components/dashboard/recent-receipts';
import { ExpenseCategories } from '@/components/dashboard/expense-categories';
import { SpendingOverviewChart } from '@/components/dashboard/spending-overview-chart';

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
    const user = auth?.currentUser;
    // console.log("🚀 ~ DashboardPage ~ user:", user)
    const { data: subscription, isLoading: isSubscriptionLoading } = useSubscription(user?.uid);
    const { count: receiptsCount, isLoading: isReceiptsLoading } = useReceiptsCount(user?.uid);
    const { spend: monthlySpend, isLoading: isSpendLoading } = useMonthlySpend(user?.uid);
    const { count: teamMembersCount, isLoading: isTeamLoading } = useTeamMembersCount(user?.uid);
    const tier = subscription?.tier;
    const status = subscription?.wasDeleted ? 'Cancelled' : 'Active';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
                <div className="flex items-center gap-2">
                    {/* Placeholder for actions */}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Receipts
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isReceiptsLoading ? <Skeleton className="h-8 w-20" /> : receiptsCount ?? 0}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Monthly Spend
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <rect width="20" height="14" x="2" y="5" rx="2" />
                            <path d="M2 10h20" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isSpendLoading ? <Skeleton className="h-8 w-24" /> : monthlySpend !== null
                                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(monthlySpend)
                                : '$0.00'
                            }
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Subscription</CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        {isSubscriptionLoading ? (
                            <div className="space-y-1">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-3 w-12" />
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold capitalize">{tier}</div>
                                <p className={cn("text-xs text-muted-foreground", status === 'Cancelled' && "text-red-500")}>
                                    {status}
                                </p>
                            </>
                        )}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Team Members
                        </CardTitle>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            className="h-4 w-4 text-muted-foreground"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {isTeamLoading ? <Skeleton className="h-8 w-12" /> : teamMembersCount ?? 0}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <SpendingOverviewChart />
                <ExpenseCategories />
            </div>

            <div className="grid gap-4 md:grid-cols-1">
                <RecentReceipts />
            </div>
        </div>
    );
}
