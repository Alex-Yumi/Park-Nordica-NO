'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import PrivacyModal from '@/components/PrivacyModal';

export default function Footer() {
  const { t } = useLanguage();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPrivacyModalOpen(true);
  };

  return (
    <footer className="bg-gradient-to-br from-stone-700/95 to-stone-800/95 text-white py-12 backdrop-blur-sm shadow-lg">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4A90E2] to-[#63B3ED] bg-clip-text text-transparent">
              Park Nordica
            </h3>
            <p className="text-white/80 mb-6">{t('parkSlogan')}</p>
            <img
              src="/logo/Nordica_Logo_V4_Grey.png"
              alt="Park Nordica Logo"
              className="h-24 w-auto filter-brightness-110"
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4A90E2] to-[#63B3ED] bg-clip-text text-transparent">
              {t('legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="/datenschutz"
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {t('privacy')}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="/impressum" 
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {t('imprint')}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="/agb" 
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {t('terms')}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div id="contact" className="transform hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4A90E2] to-[#63B3ED] bg-clip-text text-transparent">
              {t('contact')}
            </h3>
            <ul className="space-y-3 text-white/80">
              <li className="whitespace-pre-line">
                {t('addressValue')}
              </li>
              <li className="flex items-center space-x-2">
                <span>{t('phoneValue')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span>{t('email')}: Info@ParkNordica.no</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-white/60 hover:text-white/80 transition-colors text-sm">
            &copy; {new Date().getFullYear()} Park Nordica. {t('copyright')}
          </p>
        </div>
      </div>

      <PrivacyModal 
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </footer>
  );
} 