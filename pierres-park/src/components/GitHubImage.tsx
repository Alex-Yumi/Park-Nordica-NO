'use client';

import Image, { ImageProps } from 'next/image';
import { githubImageLoader } from '@/utils/imageLoader';
import { useState } from 'react';

type GitHubImageProps = Omit<ImageProps, 'loader'> & {
  fallbackSrc?: string;
};

/**
 * Eine Komponente, die Bilder von GitHub Raw lädt, 
 * um das Problem mit Git LFS bei Vercel zu umgehen.
 * Mit Fallback-Mechanismus für Windows CORS-Probleme.
 */
export default function GitHubImage({ fallbackSrc, ...props }: GitHubImageProps) {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const handleError = () => {
    console.warn('GitHub image failed to load:', props.src);
    
    // Für Windows: erweiterte Retry-Logik
    const isWindows = typeof window !== 'undefined' && window.navigator.userAgent.includes('Windows');
    const maxRetries = isWindows ? 3 : 2; // Windows bekommt einen extra Versuch
    const baseDelay = isWindows ? 2000 : 1000; // Windows bekommt längere Delays
    
    // Versuche es mehrmals mit progressiv längeren Delays
    if (retryCount < maxRetries) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Force re-render durch Key-Change
      }, baseDelay * (retryCount + 1)); // 2s, 4s, 6s für Windows; 1s, 2s für andere
    } else {
      setHasError(true);
      // Rufe die ursprüngliche onError-Funktion auf, falls vorhanden
      if (props.onError) {
        props.onError({} as any);
      }
    }
  };

  // Bei kritischen Fehlern zeige einen Fallback-Hintergrund
  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={`${props.className} bg-gradient-to-br from-[#0a4725] to-[#166534] flex items-center justify-center relative`}
        style={{ 
          width: typeof props.width === 'number' ? props.width : '100%',
          height: typeof props.height === 'number' ? props.height : '100%'
        }}
      >
        {/* Waldmuster als Hintergrund */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30l15-15v30l-15-15zM15 0l15 15L15 30V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        <div className="text-white/70 text-center p-4 relative z-10">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-60" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-sm font-medium">🌲 Park Nordica 🌲</p>
          <p className="text-xs opacity-75 mt-1">Banner wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <Image 
      {...props} 
      key={`${props.src}-${retryCount}`} // Force re-render bei retry
      loader={githubImageLoader}
      onError={handleError}
      src={hasError && fallbackSrc ? fallbackSrc : props.src}
    />
  );
} 