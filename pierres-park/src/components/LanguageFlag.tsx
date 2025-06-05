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
  const flagSize = size === 'large' ? '3em' : '2.5em';

  return (
    <button
      onClick={onClick}
      className={`bg-transparent border-none p-0 transition-all duration-300 hover:scale-105 ${
        isActive ? 'scale-105' : ''
      }`}
      title={languageLabel}
      aria-label={`Sprache ändern zu ${languageLabel}`}
    >
      <div className={`inline-block ${isActive ? 'border-2 border-[#4A90E2] rounded-sm shadow-[0_0_15px_rgba(74,144,226,0.4)]' : ''}`}>
        <ReactCountryFlag
          countryCode={countryCode}
          svg
          style={{
            fontSize: flagSize,
            lineHeight: 1,
            display: 'block',
            verticalAlign: 'top',
          }}
        />
      </div>
    </button>
  );
} 