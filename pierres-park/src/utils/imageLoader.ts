/**
 * Ein benutzerdefinierter Bildlader für Next.js, der Bilder von GitHub Raw statt von lokalen Pfaden lädt.
 * Dies ist eine Lösung für das Problem mit Git LFS bei Vercel-Deployments.
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Konvertiert lokale Bildpfade in GitHub Raw URLs
 */
export function githubImageLoader({ src, width, quality = 90 }: ImageLoaderProps) {
  // Prüfen, ob wir uns in einer Produktion oder lokalen Entwicklung befinden
  if (process.env.NODE_ENV === 'development') {
    // In der lokalen Entwicklungsumgebung verwenden wir die normalen Pfade
    return src;
  }

  // Entferne führende Slashes
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // GitHub Raw URL für die Bilder
  const url = `https://raw.githubusercontent.com/Alex-Yumi/Park-Nordica-NO/main/pierres-park/${cleanSrc}`;
  
  return url;
}

export default githubImageLoader; 