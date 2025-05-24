'use client';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

function LanguageHandler() {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    // Prüfe URL-Parameter für Sprache (z.B. von Stripe-Cancel)
    const searchParams = new URLSearchParams(window.location.search);
    const lang = searchParams.get('lang');

    if (lang && ['de', 'en', 'no', 'es'].includes(lang)) {
      setLanguage(lang as any);
      // URL-Parameter entfernen, um saubere URL zu haben
      const newUrl = window.location.href.split('?')[0];
      window.history.replaceState({}, '', newUrl);
    }
  }, [setLanguage]);

  return null;
}

export default function Home() {
  return (
    <main className="pt-10 md:pt-12">
      <LanguageHandler />
      <Header />
      <Hero />
      <Footer />
    </main>
  );
}
