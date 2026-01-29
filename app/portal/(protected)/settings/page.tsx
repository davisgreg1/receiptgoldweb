'use client';

import { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase-client';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/app/theme/theme';

interface NotificationSettings {
    notificationsEnabled: boolean;
    receiptProcessing: boolean;
    taxReminders: boolean;
    subscriptionUpdates: boolean;
    tipsFeatures: boolean;
    securityAlerts: boolean;
    quietHours: {
        enabled: boolean;
        startTime: string;
        endTime: string;
    };
    frequency: 'all' | 'important' | 'minimal';
}

interface UserSettings {
    showInsightBubbles: boolean;
}

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [userSettings, setUserSettings] = useState<UserSettings>({ showInsightBubbles: true });
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        notificationsEnabled: true,
        receiptProcessing: true,
        taxReminders: true,
        subscriptionUpdates: false,
        tipsFeatures: false,
        securityAlerts: true,
        quietHours: {
            enabled: false,
            startTime: '22:00',
            endTime: '08:00',
        },
        frequency: 'important',
    });
    const { toast } = useToast();
    const { themeMode, toggleTheme } = useTheme();

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;

        if (auth && auth.currentUser && db) {
            const userRef = doc(db, 'users', auth.currentUser.uid);

            unsubscribe = onSnapshot(userRef, (docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    if (data.settings) {
                        setUserSettings(prev => ({ ...prev, ...data.settings }));
                    }
                    if (data.notificationSettings) {
                        setNotificationSettings(prev => ({ ...prev, ...data.notificationSettings }));
                    }
                }
                setLoading(false);
            }, (error) => {
                console.error("Error subscribing to settings:", error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Failed to load settings. Checking connection...",
                });
                setLoading(false);
            });
        } else {
            // If auth not ready, wait or check back. 
            // Ideally this effect re-runs when auth changes if we put it in dependency, 
            // but auth object itself is stable-ish. 
            // Better to rely on a parent auth provider or a retry mechanism inside.
            // For now, we set loading false to avoid infinite spinner if auth fails.
            const timer = setTimeout(() => setLoading(false), 2000);
            return () => clearTimeout(timer);
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, [toast]);

    const updateSetting = async (field: string, value: any) => {
        if (!auth || !auth.currentUser || !db) return;

        try {
            await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                [field]: value
            });
        } catch (error) {
            console.error(`Error updating settings ${field}:`, error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to save setting.",
            });
        }
    };

    const updateNotificationSetting = async (key: keyof NotificationSettings, value: any) => {
        // Optimistic update
        setNotificationSettings(prev => ({ ...prev, [key]: value }));
        await updateSetting(`notificationSettings.${key}`, value);
    };

    const updateQuietHours = async (key: keyof NotificationSettings['quietHours'], value: any) => {
        // Optimistic update
        setNotificationSettings(prev => ({
            ...prev,
            quietHours: { ...prev.quietHours, [key]: value }
        }));
        await updateSetting(`notificationSettings.quietHours.${key}`, value);
    };

    const updateGeneralSetting = async (key: keyof UserSettings, value: any) => {
        // Optimistic update
        setUserSettings(prev => ({ ...prev, [key]: value }));
        await updateSetting(`settings.${key}`, value);
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
                    <p className="text-muted-foreground">Manage your application preferences and notifications.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {/* General Preferences */}
                <Card>
                    <CardHeader>
                        <CardTitle>General Preferences</CardTitle>
                        <CardDescription>Customize your app experience.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="insight-bubbles" className="flex flex-col space-y-1">
                                <span>Show Insight Bubbles</span>
                                <span className="font-normal text-xs text-muted-foreground">
                                    Display helpful insights and tips bubbles throughout the app.
                                </span>
                            </Label>
                            <Switch
                                id="insight-bubbles"
                                checked={userSettings.showInsightBubbles}
                                onCheckedChange={(checked) => updateGeneralSetting('showInsightBubbles', checked)}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card>
                    <CardHeader>
                        <CardTitle>Appearance</CardTitle>
                        <CardDescription>Customize how the app looks on your device.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                                <span>Dark Mode</span>
                                <span className="font-normal text-xs text-muted-foreground">
                                    Switch between light and dark themes.
                                </span>
                            </Label>
                            <Switch
                                id="dark-mode"
                                checked={themeMode === 'dark'}
                                onCheckedChange={toggleTheme}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Control what notifications you receive.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between space-x-2">
                            <Label htmlFor="notifications-master" className="flex flex-col space-y-1">
                                <span className="font-medium">Enable Notifications</span>
                                <span className="font-normal text-xs text-muted-foreground">Master toggle for all app notifications.</span>
                            </Label>
                            <Switch
                                id="notifications-master"
                                checked={notificationSettings.notificationsEnabled}
                                onCheckedChange={(checked) => updateNotificationSetting('notificationsEnabled', checked)}
                            />
                        </div>

                        {notificationSettings.notificationsEnabled && (
                            <>
                                <Separator />
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Notification Types</h3>

                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="receipt-processing">Receipt Processing</Label>
                                        <Switch
                                            id="receipt-processing"
                                            checked={notificationSettings.receiptProcessing}
                                            onCheckedChange={(checked) => updateNotificationSetting('receiptProcessing', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="tax-reminders">Tax Reminders</Label>
                                        <Switch
                                            id="tax-reminders"
                                            checked={notificationSettings.taxReminders}
                                            onCheckedChange={(checked) => updateNotificationSetting('taxReminders', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="subscription-updates">Subscription Updates</Label>
                                        <Switch
                                            id="subscription-updates"
                                            checked={notificationSettings.subscriptionUpdates}
                                            onCheckedChange={(checked) => updateNotificationSetting('subscriptionUpdates', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="tips-features">Tips & Features</Label>
                                        <Switch
                                            id="tips-features"
                                            checked={notificationSettings.tipsFeatures}
                                            onCheckedChange={(checked) => updateNotificationSetting('tipsFeatures', checked)}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between space-x-2">
                                        <Label htmlFor="security-alerts">Security Alerts</Label>
                                        <Switch
                                            id="security-alerts"
                                            checked={notificationSettings.securityAlerts}
                                            onCheckedChange={(checked) => updateNotificationSetting('securityAlerts', checked)}
                                        />
                                    </div>
                                </div>

                                <Separator />
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label className="text-base">Quiet Hours</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Mute notifications during specific times.
                                            </p>
                                        </div>
                                        <Switch
                                            checked={notificationSettings.quietHours.enabled}
                                            onCheckedChange={(checked) => updateQuietHours('enabled', checked)}
                                        />
                                    </div>
                                    {notificationSettings.quietHours.enabled && (
                                        <div className="flex gap-4 items-center">
                                            <div className="grid gap-2">
                                                <Label htmlFor="start-time">Start Time</Label>
                                                <Input
                                                    id="start-time"
                                                    type="time"
                                                    value={notificationSettings.quietHours.startTime}
                                                    onChange={(e) => updateQuietHours('startTime', e.target.value)}
                                                    className="w-[120px]"
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="end-time">End Time</Label>
                                                <Input
                                                    id="end-time"
                                                    type="time"
                                                    value={notificationSettings.quietHours.endTime}
                                                    onChange={(e) => updateQuietHours('endTime', e.target.value)}
                                                    className="w-[120px]"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
