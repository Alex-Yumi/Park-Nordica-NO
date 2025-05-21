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
  
  // Für Git LFS-Dateien müssen wir media.githubusercontent.com verwenden, auch bei öffentlichen Repos
  // Beachte: Der public-Ordner muss im Pfad hinzugefügt werden, da der client-seitige Pfad kein "public" enthält
  const url = `https://media.githubusercontent.com/media/Alex-Yumi/Park-Nordica-NO/main/pierres-park/public/${cleanSrc}`;
  
  return url;
}

export default githubImageLoader; 