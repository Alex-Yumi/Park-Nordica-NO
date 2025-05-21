'use client';
import React from 'react';

interface LanguageFlagProps {
  language: string;
  isActive: boolean;
  onClick: () => void;
  size?: 'normal' | 'large';
}

export default function LanguageFlag({ language, isActive, onClick, size = 'normal' }: LanguageFlagProps) {
  const getFlagEmoji = (lang: string) => {
    switch (lang) {
      case 'de':
        return '🇩🇪';
      case 'no':
        return '🇳🇴';
      case 'en':
        return '🇬🇧';
      case 'es':
        return '🇪🇸';
      default:
        return '';
    }
  };

  const sizeClasses = size === 'large' ? 'w-20 h-20 text-5xl' : 'w-14 h-14 text-3xl';

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses} rounded-full overflow-hidden flex items-center justify-center 
        ${isActive 
          ? 'ring-4 ring-[#4A90E2] ring-offset-4 ring-offset-stone-700 shadow-xl scale-110 animate-pulse' 
          : 'opacity-100 hover:opacity-100 hover:scale-110 shadow-lg hover:shadow-xl'
        } 
        transition-all duration-300 bg-gradient-to-br from-stone-500/80 to-stone-600/80 backdrop-blur-md
        hover:from-stone-400/90 hover:to-stone-500/90 transform hover:-translate-y-1`}
      title={language.toUpperCase()}
    >
      {getFlagEmoji(language)}
    </button>
  );
} 