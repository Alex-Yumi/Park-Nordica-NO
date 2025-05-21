'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function InfoSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-[#F5F7FA]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Öffnungszeiten */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#95A5A6]">
            <h2 className="text-2xl font-bold mb-4 text-[#2C3E50]">{t('openingHours')}</h2>
            <div className="space-y-2 text-[#2C3E50]">
              <p>{t('weekdays')}: {t('timeWeekdays')}</p>
              <p>{t('weekends')}: {t('timeWeekends')}</p>
            </div>
          </div>

          {/* Preise */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#95A5A6]">
            <h2 className="text-2xl font-bold mb-4 text-[#2C3E50]">{t('prices')}</h2>
            <div className="space-y-2 text-[#2C3E50]">
              <p>{t('adults')}: {t('priceAdults')}</p>
              <p>{t('children')}: {t('priceChildren')}</p>
              <p>{t('seniors')}: {t('priceSeniors')}</p>
              <p>{t('family')}: {t('priceFamily')}</p>
            </div>
          </div>

          {/* Kontakt */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#95A5A6]">
            <h2 className="text-2xl font-bold mb-4 text-[#2C3E50]">{t('contact')}</h2>
            <div className="space-y-2 text-[#2C3E50]">
              <p><span className="font-semibold">{t('address')}:</span> {t('addressValue')}</p>
              <p><span className="font-semibold">{t('phone')}:</span> {t('phoneValue')}</p>
              <p><span className="font-semibold">{t('email')}:</span> info@parknordica.no</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 