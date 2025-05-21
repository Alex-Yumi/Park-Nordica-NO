'use client';
import React from 'react';

interface LanguageFlagProps {
  language: string;
  isActive: boolean;
  onClick: () => void;
  size?: 'normal' | 'large';
}

export default function LanguageFlag({ language, isActive, onClick, size = 'normal' }: LanguageFlagProps) {
  // Explizite Unicode-Code-Points für Flaggen
  const getFlagInfo = (lang: string) => {
    switch (lang) {
      case 'de':
        return { 
          emoji: String.fromCodePoint(0x1F1E9, 0x1F1EA),  // 🇩🇪
          code: 'DE'
        };
      case 'no':
        return { 
          emoji: String.fromCodePoint(0x1F1F3, 0x1F1F4),  // 🇳🇴
          code: 'NO'
        };
      case 'en':
        return { 
          emoji: String.fromCodePoint(0x1F1EC, 0x1F1E7),  // 🇬🇧
          code: 'EN'
        };
      case 'es':
        return { 
          emoji: String.fromCodePoint(0x1F1EA, 0x1F1F8),  // 🇪🇸
          code: 'ES'
        };
      default:
        return { emoji: '', code: lang.toUpperCase() };
    }
  };

  const { emoji, code } = getFlagInfo(language);
  const sizeClasses = size === 'large' ? 'w-20 h-20' : 'w-14 h-14';
  const textSizeClass = size === 'large' ? 'text-4xl' : 'text-3xl';

  // Prüfen, ob das Browser-Rendering Emoji-Unterstützung hat
  const [fallbackActive, setFallbackActive] = React.useState(false);

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
      {emoji && !fallbackActive ? (
        <span 
          className={`${textSizeClass} emoji-fix`}
          style={{
            fontFamily: 'Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, Segoe UI Symbol, Android Emoji, EmojiSymbols',
            fontStyle: 'normal',
            lineHeight: 1,
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
          }}
          onError={() => setFallbackActive(true)}
        >
          {emoji}
        </span>
      ) : (
        <span className="text-xl font-bold text-white">{code}</span>
      )}
    </button>
  );
} 