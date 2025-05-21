'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Head from 'next/head';

export default function DisclaimerPage() {
  const { t } = useLanguage();

  return (
    <>
      <Head>
        <title>{t('disclaimer.title')} - Park Nordica</title>
        <meta name="description" content={`${t('disclaimer.title')} des Park Nordica - Informationen zu unseren Haftungsausschlüssen.`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-stone-700/95 to-stone-800/95">
        <Header />
        
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-stone-700/90 via-stone-750/95 to-stone-800/90 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.1),0_10px_25px_rgba(0,0,0,0.2)] border border-white/10">
            {/* Header */}
            <div className="border-b border-white/10 p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{t('disclaimer.title')}</h1>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-white/90">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('disclaimer.sections.general.title')}</h2>
                <p className="whitespace-pre-line">{t('disclaimer.sections.general.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('disclaimer.sections.website.title')}</h2>
                <p className="whitespace-pre-line">{t('disclaimer.sections.website.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('disclaimer.sections.stay.title')}</h2>
                <p className="whitespace-pre-line">{t('disclaimer.sections.stay.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('disclaimer.sections.animals.title')}</h2>
                <p className="whitespace-pre-line">{t('disclaimer.sections.animals.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('disclaimer.sections.activities.title')}</h2>
                <p className="whitespace-pre-line">{t('disclaimer.sections.activities.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('disclaimer.sections.events.title')}</h2>
                <p className="whitespace-pre-line">{t('disclaimer.sections.events.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('disclaimer.sections.theft.title')}</h2>
                <p className="whitespace-pre-line">{t('disclaimer.sections.theft.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('disclaimer.sections.force.title')}</h2>
                <p className="whitespace-pre-line">{t('disclaimer.sections.force.content')}</p>
              </section>

              <p className="mt-8 text-sm text-white/70">{t('disclaimer.lastUpdated', { date: '19.05.2024' })}</p>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
} 