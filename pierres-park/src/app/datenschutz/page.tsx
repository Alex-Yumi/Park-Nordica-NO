'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DatenschutzPage() {
  const { t } = useLanguage();

  // Sichere Implementierung für Array-Übersetzungen
  const dataItems = [
    t('privacy.sections.data.items.0'),
    t('privacy.sections.data.items.1'),
    t('privacy.sections.data.items.2')
  ];

  const purposeItems = [
    t('privacy.sections.purpose.items.0'),
    t('privacy.sections.purpose.items.1')
  ];

  const rightsItems = [
    t('privacy.sections.rights.items.0'),
    t('privacy.sections.rights.items.1'),
    t('privacy.sections.rights.items.2'),
    t('privacy.sections.rights.items.3')
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-stone-700/95 to-stone-800/95">
      <Header />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-stone-700/90 via-stone-750/95 to-stone-800/90 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.1),0_10px_25px_rgba(0,0,0,0.2)] border border-white/10">
          {/* Header */}
          <div className="border-b border-white/10 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{t('privacy.title')}</h1>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6 text-white/90">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.introduction.title')}</h2>
              <p>{t('privacy.sections.introduction.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.responsible.title')}</h2>
              <p className="whitespace-pre-line">{t('privacy.sections.responsible.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.data.title')}</h2>
              <ul className="list-disc list-inside space-y-1">
                {dataItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.purpose.title')}</h2>
              <ul className="list-disc list-inside space-y-1">
                {purposeItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.legal.title')}</h2>
              <p>{t('privacy.sections.legal.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.storage.title')}</h2>
              <p>{t('privacy.sections.storage.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.sharing.title')}</h2>
              <p>{t('privacy.sections.sharing.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.rights.title')}</h2>
              <ul className="list-disc list-inside space-y-1">
                {rightsItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.cookies.title')}</h2>
              <p>{t('privacy.sections.cookies.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.security.title')}</h2>
              <p>{t('privacy.sections.security.content')}</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-white">{t('privacy.sections.changes.title')}</h2>
              <p>{t('privacy.sections.changes.content')}</p>
              <p className="mt-2 text-sm text-white/70">{t('privacy.lastUpdated', { date: '05.05.2024' })}</p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
} 