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
    
    // Versuche es maximal 2x mit einem kurzen Delay
    if (retryCount < 2) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        // Force re-render durch Key-Change
      }, 1000 * (retryCount + 1)); // 1s, dann 2s delay
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
        className={`${props.className} bg-gradient-to-br from-[#0a4725] to-[#166534] flex items-center justify-center`}
        style={{ 
          width: typeof props.width === 'number' ? props.width : '100%',
          height: typeof props.height === 'number' ? props.height : '100%'
        }}
      >
        <div className="text-white/60 text-center p-4">
          <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
          <p className="text-xs">Image loading...</p>
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