'use client';
import React, { useEffect, useState } from 'react';

interface LanguageFlagProps {
  language: string;
  isActive: boolean;
  onClick: () => void;
  size?: 'normal' | 'large';
}

export default function LanguageFlag({ language, isActive, onClick, size = 'normal' }: LanguageFlagProps) {
  const [useEmoji, setUseEmoji] = useState(true);

  // Windows-Erkennung und Emoji-Support-Check
  useEffect(() => {
    const isWindows = typeof navigator !== 'undefined' && 
      (navigator.platform.indexOf('Win') > -1 || navigator.userAgent.indexOf('Windows') > -1);
    
    // Test ob Emoji richtig gerendert werden
    const testEmojiSupport = () => {
      if (typeof document === 'undefined') return false;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return false;
      
      canvas.width = 32;
      canvas.height = 32;
      
      // Teste mit einer einfachen Flagge
      ctx.fillStyle = '#000';
      ctx.font = '24px Arial, "Segoe UI Emoji", "Noto Color Emoji"';
      ctx.fillText('🇩🇪', 4, 24);
      
      // Prüfe ob Pixel gezeichnet wurden (sehr einfacher Test)
      const imageData = ctx.getImageData(0, 0, 32, 32);
      const hasPixels = Array.from(imageData.data).some(pixel => pixel !== 0);
      
      return hasPixels;
    };

    // Für Windows oder bei schlechter Emoji-Unterstützung Fallback verwenden
    if (isWindows || !testEmojiSupport()) {
      setUseEmoji(false);
    }
  }, []);

  // Explizite Unicode-Code-Points für Flaggen
  const getFlagInfo = (lang: string) => {
    switch (lang) {
      case 'de':
        return { 
          emoji: String.fromCodePoint(0x1F1E9, 0x1F1EA),  // 🇩🇪
          code: 'DE',
          colors: 'from-red-500 via-yellow-400 to-gray-800'
        };
      case 'no':
        return { 
          emoji: String.fromCodePoint(0x1F1F3, 0x1F1F4),  // 🇳🇴
          code: 'NO',
          colors: 'from-red-600 via-white to-blue-600'
        };
      case 'en':
        return { 
          emoji: String.fromCodePoint(0x1F1EC, 0x1F1E7),  // 🇬🇧
          code: 'EN',
          colors: 'from-blue-600 via-white to-red-600'
        };
      case 'es':
        return { 
          emoji: String.fromCodePoint(0x1F1EA, 0x1F1F8),  // 🇪🇸
          code: 'ES',
          colors: 'from-red-600 via-yellow-400 to-red-600'
        };
      default:
        return { emoji: '', code: lang.toUpperCase(), colors: 'from-gray-500 to-gray-600' };
    }
  };

  const { emoji, code, colors } = getFlagInfo(language);
  const sizeClasses = size === 'large' ? 'w-20 h-20' : 'w-14 h-14';
  const textSizeClass = size === 'large' ? 'text-4xl' : 'text-3xl';
  const codeSizeClass = size === 'large' ? 'text-lg' : 'text-sm';

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses} rounded-full overflow-hidden flex items-center justify-center 
        ${isActive 
          ? 'ring-2 ring-[#4A90E2] ring-offset-2 ring-offset-stone-700 shadow-xl scale-105' 
          : 'opacity-90 hover:opacity-100 hover:scale-105 shadow-lg hover:shadow-xl'
        } 
        transition-all duration-300 bg-gradient-to-br ${useEmoji ? 'from-stone-500/80 to-stone-600/80' : colors} backdrop-blur-md
        hover:from-stone-400/90 hover:to-stone-500/90`}
      title={language.toUpperCase()}
    >
      {useEmoji ? (
        <span 
          className={`${textSizeClass} emoji-fix`}
          style={{
            fontFamily: '"Segoe UI Emoji", "Noto Color Emoji", "Apple Color Emoji", "Segoe UI Symbol", "Android Emoji", "EmojiSymbols", sans-serif',
            fontStyle: 'normal',
            lineHeight: 1,
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
          }}
        >
          {emoji}
        </span>
      ) : (
        <span className={`${codeSizeClass} font-bold text-white drop-shadow-sm`}>{code}</span>
      )}
    </button>
  );
} 