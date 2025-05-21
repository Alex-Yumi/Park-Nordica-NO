'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';

export default function ImpressumPage() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t('imprint.title')} - Park Nordica</title>
        <meta name="description" content={`${t('imprint.title')} des Park Nordica - Informationen zum Unternehmen und rechtlichen Angaben.`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-stone-700/95 to-stone-800/95">
        <Header />
        
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-stone-700/90 via-stone-750/95 to-stone-800/90 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.1),0_10px_25px_rgba(0,0,0,0.2)] border border-white/10">
            {/* Header */}
            <div className="border-b border-white/10 p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{t('imprint.title')}</h1>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-white/90">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('imprint.sections.company.title')}</h2>
                <p className="whitespace-pre-line">{t('imprint.sections.company.content')}</p>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
} 