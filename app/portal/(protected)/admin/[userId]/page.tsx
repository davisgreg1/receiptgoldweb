'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { isSuperAdmin } from '@/lib/auth-helpers';
import { getUser } from '@/app/actions/get-user';
import { cn } from '@/lib/utils';
import { getUserSubscription, getUserPlaidItems } from '@/app/actions/get-users';
import { Loader2, ArrowLeft, Mail, Calendar, Clock, Shield, Activity, CreditCard, Building2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { FaGoogle, FaApple } from 'react-icons/fa';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface SubscriptionData {
    billing?: {
        billingPeriod: string;
        currentPeriodEnd: null | string;
        expiresDate: null | string;
        isActive: boolean;
        latestPurchaseDate: string;
        productId: string;
        willRenew: boolean;
    };
    currentTier: string;
    features?: Record<string, boolean>;
    limits?: {
        apiCallsPerMonth: number;
        maxBusinesses: number;
        maxReceipts: number;
        maxReports: number;
    };
    createdAt?: string;
    lastRevenueCatEvent?: {
        eventData?: {
            store?: string;
        };
    };
}

interface PlaidItem {
    institutionName: string;
    accounts: any[];
    error?: {
        displayMessage: string;
        errorCode: string;
    };
    needsReauth: boolean;
    lastSyncAt: string;
    status: string;
}

export default function AdminUserDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const userId = params.userId as string;
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(auth?.currentUser);

    // Initial Auth Check
    useEffect(() => {
        if (!auth) return;
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!isSuperAdmin(user.email)) {
                    router.push('/portal/dashboard');
                } else {
                    setCurrentUser(user);
                    setIsAuthLoading(false);
                }
            } else {
                router.push('/portal/login');
            }
        });
        return () => unsubscribe();
    }, [router]);

    // Fetch User Data
    const { data: user, isLoading: isUserLoading } = useQuery({
        queryKey: ['admin-user', userId],
        queryFn: async () => {
            if (!auth?.currentUser) throw new Error("Not authenticated");
            const token = await auth.currentUser.getIdToken();
            return getUser(token, userId);
        },
        enabled: !!currentUser && !isAuthLoading,
    });

    const { data: subscription, isLoading: isSubLoading } = useQuery({
        queryKey: ['admin-user-subscription', userId],
        queryFn: async () => {
            return getUserSubscription(userId) as Promise<SubscriptionData | null>;
        },
        enabled: !!currentUser && !isAuthLoading,
    });

    // Fetch Plaid Items
    const { data: plaidItems, isLoading: isPlaidLoading } = useQuery({
        queryKey: ['admin-user-plaid-items', userId],
        queryFn: async () => {
            return getUserPlaidItems(userId) as Promise<PlaidItem[]>;
        },
        enabled: !!currentUser && !isAuthLoading,
    });

    const isLoading = isAuthLoading || isUserLoading || isSubLoading || isPlaidLoading;

    if (isLoading) {
        return (
            <div className="flex w-full h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="p-8 text-center">
                <div className="text-red-500 mb-4">User not found</div>
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6 container max-w-5xl mx-auto py-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">User Details</h1>
                    <p className="text-sm text-muted-foreground font-mono">{user.uid}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Profile Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-primary" />
                            Profile Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden text-2xl font-bold border-2 border-border">
                                {user.photoURL ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={user.photoURL} alt={user.displayName || 'User'} className="h-full w-full object-cover" />
                                ) : (
                                    <span>{(user.email || user.displayName || '?').charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div>
                                <h3 className="text-lg font-medium">{user.displayName || 'No Display Name'}</h3>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                    <Mail className="h-3.5 w-3.5 mr-1.5" />
                                    {user.email}
                                </div>
                                <div className="mt-2">
                                    <Badge variant={user.disabled ? "destructive" : "secondary"} className={!user.disabled ? "bg-green-500/10 text-green-600 hover:bg-green-500/20" : ""}>
                                        {user.disabled ? "Disabled" : "Active Account"}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                            <h4 className="text-sm font-medium text-muted-foreground">Login Providers</h4>
                            <div className="flex gap-2">
                                {user.providerData.map(p => (
                                    <Badge key={p.providerId} variant="outline" className="flex gap-1.5 items-center py-1">
                                        {p.providerId === 'google.com' && <FaGoogle className="h-3.5 w-3.5" />}
                                        {p.providerId === 'apple.com' && <FaApple className="h-3.5 w-3.5" />}
                                        {p.providerId === 'password' && <Mail className="h-3.5 w-3.5" />}
                                        {p.providerId.replace('.com', '')}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Sub & Meta Card */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-primary" />
                                Subscription
                            </CardTitle>
                            <CardDescription>Current plan details</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {subscription ? (
                                <div className="space-y-6">
                                    {/* Status Section */}
                                    <div className="grid gap-4">
                                        <div className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
                                            <span className="text-sm font-medium">Status</span>
                                            <Badge variant={subscription.billing?.isActive ? "default" : "destructive"} className={cn(subscription.billing?.isActive ? "bg-green-600 hover:bg-green-700" : "")}>
                                                {subscription.billing?.isActive ? 'Active' : 'Inactive'}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-muted/30 p-3 rounded-lg space-y-1">
                                                <span className="text-xs text-muted-foreground block">Plan</span>
                                                <span className="font-medium capitalize">{subscription.currentTier}</span>
                                            </div>
                                            <div className="bg-muted/30 p-3 rounded-lg space-y-1">
                                                <span className="text-xs text-muted-foreground block">Billing</span>
                                                <span className="font-medium capitalize">{subscription.billing?.billingPeriod || 'N/A'} ({subscription.billing?.willRenew ? 'Auto-Renew' : 'Manual'})</span>
                                            </div>
                                        </div>

                                        {subscription.lastRevenueCatEvent?.eventData?.store && (
                                            <div className="flex justify-between items-center text-sm px-1">
                                                <span className="text-muted-foreground">Source</span>
                                                <Badge variant="outline" className="capitalize">
                                                    {subscription.lastRevenueCatEvent.eventData.store.replace(/_/g, ' ').toLowerCase()}
                                                </Badge>
                                            </div>
                                        )}

                                        {subscription.billing?.latestPurchaseDate && (
                                            <div className="flex justify-between items-center text-sm px-1">
                                                <span className="text-muted-foreground">Last Purchase</span>
                                                <span>{new Date(subscription.billing.latestPurchaseDate).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>

                                    <Separator />

                                    {/* Usage & Limits */}
                                    {/* {subscription.limits && (
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium flex items-center gap-2">
                                                <Activity className="h-4 w-4 text-primary" />
                                                Usage Limits
                                            </h4>
                                            <div className="grid gap-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Businesses</span>
                                                    <span className="font-medium">{subscription.limits.maxBusinesses === -1 ? 'Unlimited' : subscription.limits.maxBusinesses}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Receipts</span>
                                                    <span className="font-medium">{subscription.limits.maxReceipts === -1 ? 'Unlimited' : subscription.limits.maxReceipts}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">API Calls</span>
                                                    <span className="font-medium">{subscription.limits.apiCallsPerMonth === -1 ? 'Unlimited' : `${subscription.limits.apiCallsPerMonth.toLocaleString()}/mo`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <Separator /> */}

                                    {/* Features */}
                                    {subscription.features && (
                                        <div className="space-y-3">
                                            <h4 className="text-sm font-medium flex items-center gap-2">
                                                <Shield className="h-4 w-4 text-primary" />
                                                Included Features
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {Object.entries(subscription.features).map(([feature, enabled]) => (
                                                    enabled && (
                                                        <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <CheckCircle2 className="h-3 w-3 text-green-600" />
                                                            <span className="capitalize">{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-muted-foreground bg-muted/10 rounded-lg border border-dashed">
                                    No active subscription found.
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Activity className="h-5 w-5 text-primary" />
                                Activity Metadata
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Joined On</p>
                                    <p className="text-sm text-muted-foreground">{new Date(user.metadata.creationTime).toLocaleString()}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-start gap-3">
                                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div>
                                    <p className="text-sm font-medium">Last Sign In</p>
                                    <p className="text-sm text-muted-foreground">{new Date(user.metadata.lastSignInTime).toLocaleString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Bank Connections Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-primary" />
                                Bank Connections
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {plaidItems && plaidItems.length > 0 ? (
                                <div className="space-y-4">
                                    {plaidItems.map((item, index) => (
                                        <div key={index} className="flex flex-col gap-2 bg-muted/30 p-3 rounded-lg border">
                                            <div className="flex justify-between items-start">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium">{item.institutionName}</span>
                                                    {item.needsReauth || item.error ? (
                                                        <Badge variant="destructive" className="flex gap-1 items-center h-5 px-1.5 text-[10px]">
                                                            <AlertTriangle className="h-3 w-3" />
                                                            Attention Needed
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="outline" className="flex gap-1 items-center h-5 px-1.5 text-[10px] bg-green-500/10 text-green-600 border-green-200">
                                                            <CheckCircle2 className="h-3 w-3" />
                                                            Active
                                                        </Badge>
                                                    )}
                                                </div>
                                                <span className="text-xs text-muted-foreground">{item.accounts?.length || 0} Accounts</span>
                                            </div>

                                            {item.error && (
                                                <div className="text-xs text-red-500 bg-red-500/5 p-2 rounded border border-red-100">
                                                    {item.error.displayMessage || item.error.errorCode}
                                                </div>
                                            )}

                                            <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-1">
                                                <div className="flex items-center gap-1">
                                                    <RefreshCw className="h-3 w-3" />
                                                    Synced: {item.lastSyncAt ? new Date(item.lastSyncAt).toLocaleString() : 'Never'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-6 text-muted-foreground bg-muted/10 rounded-lg border border-dashed">
                                    No bank connections found.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
