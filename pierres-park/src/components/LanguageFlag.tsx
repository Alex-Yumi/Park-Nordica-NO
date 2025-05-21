'use client';
import React from 'react';
import Image from 'next/image';

interface LanguageFlagProps {
  language: string;
  isActive: boolean;
  onClick: () => void;
  size?: 'normal' | 'large';
}

export default function LanguageFlag({ language, isActive, onClick, size = 'normal' }: LanguageFlagProps) {
  const getFlagInfo = (lang: string) => {
    switch (lang) {
      case 'de':
        return { path: '/flags/de.svg', code: 'DE' };
      case 'no':
        return { path: '/flags/no.svg', code: 'NO' };
      case 'en':
        return { path: '/flags/en.svg', code: 'EN' };
      case 'es':
        return { path: '/flags/es.svg', code: 'ES' };
      default:
        return { path: '', code: lang.toUpperCase() };
    }
  };

  const { path, code } = getFlagInfo(language);
  const sizeClasses = size === 'large' ? 'w-20 h-20' : 'w-14 h-14';
  const imgSize = size === 'large' ? 60 : 42;

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
      {path ? (
        <div className="relative w-full h-full">
          <Image 
            src={path} 
            alt={`${code} Flag`} 
            width={imgSize} 
            height={imgSize}
            className="object-cover"
          />
        </div>
      ) : (
        <span className="text-xl font-bold text-white">{code}</span>
      )}
    </button>
  );
} 