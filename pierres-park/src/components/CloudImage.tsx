'use client';

import { CldImage } from 'next-cloudinary';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type CloudImageProps = Omit<ImageProps, 'src'> & {
  src: string;
  fallbackToLocal?: boolean;
};

/**
 * Eine Komponente, die Bilder bevorzugt von Cloudinary lädt oder auf lokale Bilder zurückfällt.
 * Cloudinary muss zuerst eingerichtet werden, indem Bilder hochgeladen werden.
 */
export default function CloudImage({ src, fallbackToLocal = true, alt, ...props }: CloudImageProps) {
  const [error, setError] = useState(false);
  
  // Extrahiere den Dateinamen ohne Pfad und füge .jpg an, falls es kein Dateiformat gibt
  const getCloudinaryId = (path: string) => {
    // Entferne führenden Slash und "public/" falls vorhanden
    const cleanPath = path.replace(/^\//, '').replace(/^public\//, '');
    // Extrahiere den Dateinamen ohne Pfad
    const fileName = cleanPath.split('/').pop() || '';
    // Überprüfe, ob der Dateiname bereits eine Erweiterung hat
    return fileName.includes('.') ? fileName : `${fileName}.jpg`;
  };

  // Entscheide, ob Cloudinary oder lokales Bild verwendet werden soll
  const useCloudinary = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && !error;

  // Wenn wir in der Entwicklungsumgebung sind oder ein Fallback erwünscht ist, zeige das lokale Bild
  if ((process.env.NODE_ENV === 'development' || fallbackToLocal) && (!useCloudinary || error)) {
    return <Image src={src} alt={alt || 'Image'} {...props} onError={() => setError(true)} />;
  }

  // Versuche, das Bild von Cloudinary zu laden
  try {
    const cloudinaryId = getCloudinaryId(src);
    
    // Entferne problematische Props für CldImage
    const { onError, ...cloudinaryProps } = props;
    
    return (
      <CldImage
        src={cloudinaryId}
        alt={alt || 'Image'}
        {...(cloudinaryProps as any)}
        onError={() => setError(true)}
      />
    );
  } catch (e) {
    console.error('Fehler beim Laden des Cloudinary-Bildes:', e);
    // Fallback zum lokalen Bild bei Fehler
    return <Image src={src} alt={alt || 'Image'} {...props} />;
  }
} 