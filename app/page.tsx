'use client';

import Header from './components/layout/Header';
import Hero from './components/home/Hero';
import SocialProof from './components/home/SocialProof';
import Features from './components/home/Features';
import TeamCollaboration from './components/home/TeamCollaboration';
import HowItWorks from './components/home/HowItWorks';
import DownloadCTA from './components/home/DownloadCTA';
import FloatingElements from './components/home/FloatingElements';
import Footer from './components/layout/Footer';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase-client';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/portal/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-background-primary text-text-primary"
    >
      <Header />

      <main className="relative">
        <Hero />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SocialProof />
          <Features />
          <TeamCollaboration />
          <HowItWorks />
          <DownloadCTA />
        </div>

        <FloatingElements />
      </main>

      <Footer />
    </div>
  );
}
