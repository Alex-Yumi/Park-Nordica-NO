'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Head from 'next/head';

export default function AGBPage() {
  const { t } = useLanguage();

  // Debug-Ausgabe
  console.log('Current language:', t('terms.title'));
  console.log('Introduction title:', t('terms.sections.introduction.title'));
  console.log('Introduction content:', t('terms.sections.introduction.content'));

  return (
    <>
      <Head>
        <title>Allgemeine Geschäftsbedingungen - Park Nordica</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen des Park Nordica - Informationen zu unseren Nutzungsbedingungen." />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-stone-700/95 to-stone-800/95">
        <Header />
        
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-stone-700/90 via-stone-750/95 to-stone-800/90 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.1),0_10px_25px_rgba(0,0,0,0.2)] border border-white/10">
            {/* Header */}
            <div className="border-b border-white/10 p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white">{t('terms.title')}</h1>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 text-white/90">
              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('terms.sections.introduction.title')}</h2>
                <p>{t('terms.sections.introduction.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('terms.sections.contact.title')}</h2>
                <p className="whitespace-pre-line">
                  {t('terms.sections.contact.content')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('terms.sections.tickets.title')}</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('terms.sections.tickets.items.0')}</li>
                  <li>{t('terms.sections.tickets.items.1')}</li>
                  <li>{t('terms.sections.tickets.items.2')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('terms.sections.usage.title')}</h2>
                <ul className="list-disc list-inside space-y-1">
                  <li>{t('terms.sections.usage.items.0')}</li>
                  <li>{t('terms.sections.usage.items.1')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('terms.sections.privacy.title')}</h2>
                <p>{t('terms.sections.privacy.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('terms.sections.liability.title')}</h2>
                <p>{t('terms.sections.liability.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('terms.sections.security.title')}</h2>
                <p>{t('terms.sections.security.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('terms.sections.changes.title')}</h2>
                <p>{t('terms.sections.changes.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 text-white">{t('terms.sections.jurisdiction.title')}</h2>
                <p>{t('terms.sections.jurisdiction.content')}</p>
                <p className="mt-2 text-sm text-white/70">{t('terms.lastUpdated', { date: '05.05.2024' })}</p>
              </section>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
} 