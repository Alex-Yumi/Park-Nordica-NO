/**
 * Ein benutzerdefinierter Bildlader für Next.js, der Bilder von GitHub LFS statt von lokalen Pfaden lädt.
 * Dies ist eine Lösung für das Problem mit Git LFS bei Vercel-Deployments.
 */

interface ImageLoaderProps {
  src: string;
  width: number;
  quality?: number;
}

/**
 * Konvertiert lokale Bildpfade in GitHub LFS URLs
 */
export function githubImageLoader({ src, width, quality = 90 }: ImageLoaderProps) {
  // Prüfen, ob wir uns in einer Produktion oder lokalen Entwicklung befinden
  if (process.env.NODE_ENV === 'development') {
    // In der lokalen Entwicklungsumgebung verwenden wir die normalen Pfade
    return src;
  }

  // Entferne führende Slashes
  const cleanSrc = src.startsWith('/') ? src.slice(1) : src;
  
  // GitHub LFS URL für die Bilder
  // Beachte: Der public-Ordner muss im Pfad hinzugefügt werden, da der client-seitige Pfad kein "public" enthält
  const url = `https://media.githubusercontent.com/media/Alex-Yumi/Park-Nordica-NO/refs/heads/main/pierres-park/public/${cleanSrc}`;
  
  return url;
}

export default githubImageLoader; 