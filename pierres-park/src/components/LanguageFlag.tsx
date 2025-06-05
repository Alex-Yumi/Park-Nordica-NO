'use client';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';

interface LanguageFlagProps {
  language: string;
  isActive: boolean;
  onClick: () => void;
  size?: 'normal' | 'large';
}

export default function LanguageFlag({ language, isActive, onClick, size = 'normal' }: LanguageFlagProps) {
  // Mapping von Sprachen zu Ländercodes
  const getCountryCode = (lang: string): string => {
    switch (lang) {
      case 'de':
        return 'DE'; // Deutschland
      case 'no':
        return 'NO'; // Norwegen
      case 'en':
        return 'GB'; // Großbritannien für Englisch
      case 'es':
        return 'ES'; // Spanien
      default:
        return 'DE';
    }
  };

  // Mapping für Sprach-Labels
  const getLanguageLabel = (lang: string): string => {
    switch (lang) {
      case 'de':
        return 'Deutsch';
      case 'no':
        return 'Norsk';
      case 'en':
        return 'English';
      case 'es':
        return 'Español';
      default:
        return lang.toUpperCase();
    }
  };

  const countryCode = getCountryCode(language);
  const languageLabel = getLanguageLabel(language);
  
  // Exakte Flaggen-Dimensionen für perfekte Rahmen-Anpassung
  const flagDimensions = size === 'large' 
    ? { width: '48px', height: '32px' }  // Large: 48x32px (3:2 Verhältnis)
    : { width: '36px', height: '24px' }; // Normal: 36x24px (3:2 Verhältnis)

  return (
    <button
      onClick={onClick}
      className={`bg-transparent border-none p-0 transition-all duration-300 hover:scale-105 ${
        isActive ? 'scale-105' : ''
      }`}
      title={languageLabel}
      aria-label={`Sprache ändern zu ${languageLabel}`}
    >
      <div className={`${isActive ? 'border-2 border-[#4A90E2] rounded-sm shadow-[0_0_15px_rgba(74,144,226,0.4)]' : ''}`}>
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          style={{
            width: flagDimensions.width,
            height: flagDimensions.height,
            display: 'block',
          }}
        />
      </div>
    </button>
  );
} 