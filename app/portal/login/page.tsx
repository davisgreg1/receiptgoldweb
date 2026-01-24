'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Loader2, ArrowLeft } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

export default function PortalLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!auth) {
            setError('Firebase is not initialized');
            setLoading(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Redirect to dashboard on success
            router.push('/portal/dashboard');
        } catch (err) {
            console.error('Login error:', err);
            const error = err as { code?: string };
            if (error.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
            } else if (error.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else {
                setError('Failed to log in. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (providerName: 'google' | 'apple') => {
        if (!auth) return;
        setLoading(true);
        setError(null);

        try {
            let provider;
            if (providerName === 'google') {
                provider = new GoogleAuthProvider();
            } else {
                provider = new OAuthProvider('apple.com');
                provider.addScope('email');
                provider.addScope('name');
            }

            await signInWithPopup(auth, provider);
            router.push('/portal/dashboard');
        } catch (err) {
            console.error(`${providerName} login error:`, err);
            setError(`Failed to sign in with ${providerName}.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background/95 to-muted p-4 relative">
            <div className="absolute top-4 left-4 z-50">
                <Button variant="ghost" asChild className="gap-2 text-primary font-medium hover:bg-background/20 hover:text-primary/80">
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Home
                    </Link>
                </Button>
            </div>
            <Card className="w-full max-w-sm border-border/40 shadow-xl bg-card/50 backdrop-blur-sm">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Admin Portal</CardTitle>
                    <CardDescription>
                        Sign in to access your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            disabled={loading}
                            onClick={() => handleSocialLogin('google')}
                        >
                            <FcGoogle className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            disabled={loading}
                            onClick={() => handleSocialLogin('apple')}
                        >
                            <FaApple className="mr-2 h-4 w-4" />
                            Apple
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                            />
                        </div>
                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In with Email
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
