'use client';
import React from 'react';

interface LanguageFlagProps {
  language: string;
  isActive: boolean;
  onClick: () => void;
  size?: 'normal' | 'large';
}

export default function LanguageFlag({ language, isActive, onClick, size = 'normal' }: LanguageFlagProps) {
  // Explizit Unicode-Werte für Flaggen verwenden und als Fallback den Ländercode
  const getFlagEmoji = (lang: string) => {
    switch (lang) {
      case 'de':
        return { emoji: '🇩🇪', code: 'DE' }; // Germany Flag: U+1F1E9 U+1F1EA
      case 'no':
        return { emoji: '🇳🇴', code: 'NO' }; // Norway Flag: U+1F1F3 U+1F1F4
      case 'en':
        return { emoji: '🇬🇧', code: 'EN' }; // UK Flag: U+1F1EC U+1F1E7
      case 'es':
        return { emoji: '🇪🇸', code: 'ES' }; // Spain Flag: U+1F1EA U+1F1F8
      default:
        return { emoji: '', code: lang.toUpperCase() };
    }
  };

  const { emoji, code } = getFlagEmoji(language);
  const sizeClasses = size === 'large' ? 'w-20 h-20 text-4xl' : 'w-14 h-14 text-3xl';

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
      title={language.toUpperCase()}
    >
      {emoji || <span className="text-xl font-bold">{code}</span>}
    </button>
  );
} 