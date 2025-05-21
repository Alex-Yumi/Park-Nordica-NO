'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import PrivacyModal from '@/components/PrivacyModal';
import GitHubImage from './GitHubImage';

export default function Footer() {
  const { t } = useLanguage();
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const openPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  return (
    <footer className="bg-gradient-to-br from-[#1E2A3B]/90 to-[#2C3E50]/90 text-white pt-12 pb-6 shadow-xl mt-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          <div className="mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <div className="relative h-24 w-24 mb-4">
              <GitHubImage
                src="/logo/Nordica_Logo_V4_Grey.png"
                alt="Park Nordica Logo"
                fill
                className="object-contain filter-brightness-110"
              />
            </div>
            <p className="text-sm text-white/60 max-w-xs text-center md:text-left">
              {t('parkSlogan')}
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4A90E2] to-[#63B3ED] bg-clip-text text-transparent">
              {t('legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/impressum" 
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span>
                    {t('imprint.title')}
                  </span>
                </Link>
              </li>
              <li>
                <a 
                  href="/datenschutz" 
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span>
                    {t('privacy.title')}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="/agb" 
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span>
                    {t('terms.title')}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="/disclaimer" 
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                >
                  <span>
                    {t('disclaimer.title')}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div id="contact">
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
          <p className="text-white/60 hover:text-white/80 transition-colors">
            &copy; {new Date().getFullYear()} Park Nordica. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
} 