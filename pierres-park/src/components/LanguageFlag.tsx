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
  const sizeClasses = size === 'large' ? 'w-20 h-20' : 'w-14 h-14';
  const flagSize = size === 'large' ? '3em' : '2.5em';

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses} rounded-lg border-2 flex items-center justify-center 
        ${isActive 
          ? 'border-[#4A90E2] bg-[#4A90E2]/20 shadow-[0_0_20px_rgba(74,144,226,0.3)] scale-105' 
          : 'border-transparent bg-white/10 hover:bg-white/20 hover:scale-105 shadow-lg hover:shadow-xl'
        } 
        transition-all duration-300 backdrop-blur-sm
        hover:border-white/30`}
      title={languageLabel}
      aria-label={`Sprache ändern zu ${languageLabel}`}
    >
      <ReactCountryFlag
        countryCode={countryCode}
        svg
        style={{
          fontSize: flagSize,
          lineHeight: 1,
        }}
      />
    </button>
  );
} 