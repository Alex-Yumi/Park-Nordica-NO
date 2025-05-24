/**
 * Ein benutzerdefinierter Bildlader für Next.js, der Bilder aus dem öffentlichen GitHub-Repository lädt.
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Konvertiert lokale Bildpfade in GitHub Media URLs für LFS-Dateien
 */
export function githubImageLoader({ src, width, quality = 90 }: ImageLoaderProps) {
  // Prüfen, ob wir uns in einer Produktion oder lokalen Entwicklung befinden
  if (process.env.NODE_ENV === 'development') {
    // In der lokalen Entwicklungsumgebung verwenden wir die normalen Pfade
    return src;
  }

  // Entferne führende Slashes
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // WINDOWS CORS FIX: Verwende GitHub Raw statt Media für bessere CORS-Unterstützung
  // GitHub Raw hat weniger CORS-Probleme als media.githubusercontent.com
  const url = `https://raw.githubusercontent.com/Alex-Yumi/Park-Nordica-NO/main/pierres-park/public/${cleanSrc}`;
  
  return url;
}

export default githubImageLoader; 