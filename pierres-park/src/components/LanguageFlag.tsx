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
      className={`${sizeClasses} rounded-full overflow-hidden flex items-center justify-center 
        ${isActive 
          ? 'ring-2 ring-[#4A90E2] ring-offset-2 ring-offset-stone-700 shadow-xl scale-105' 
          : 'opacity-90 hover:opacity-100 hover:scale-105 shadow-lg hover:shadow-xl'
        } 
        transition-all duration-300 bg-gradient-to-br from-stone-500/80 to-stone-600/80 backdrop-blur-md
        hover:from-stone-400/90 hover:to-stone-500/90`}
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