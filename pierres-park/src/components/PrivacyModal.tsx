'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Backdrop mit Blur-Effekt */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto bg-gradient-to-br from-stone-700/90 via-stone-750/95 to-stone-800/90 rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.1),0_10px_25px_rgba(0,0,0,0.2)] border border-white/10 transform-gpu transition-all duration-300"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-br from-stone-700/95 to-stone-800/95 backdrop-blur-md border-b border-white/10 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Datenschutzerklärung</h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-white/90">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">1. Einführung</h3>
            <p>Diese Datenschutzerklärung erklärt, wie wir Ihre personenbezogenen Daten erheben und nutzen.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">2. Verantwortliche Stelle</h3>
            <p className="whitespace-pre-line">
              Nordisk Opplevelse AS
              Finnvolldalsveien 1244
              7896 Brekkvasselv
              Norway
              Info@ParkNordica.no
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">3. Welche Daten wir erheben</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Name, Kontaktdaten</li>
              <li>Kaufdetails</li>
              <li>IP-Adresse und Cookies</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">4. Zweck der Verarbeitung</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Abwicklung von Käufen</li>
              <li>Kundenservice</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">5. Rechtsgrundlage</h3>
            <p>Einwilligung, Vertrag und gesetzliche Verpflichtungen.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">6. Speicherung</h3>
            <p>Daten werden gelöscht, wenn sie nicht mehr benötigt werden.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">7. Weitergabe</h3>
            <p>Nur mit Einwilligung oder gesetzlicher Verpflichtung.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">8. Ihre Rechte</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Auskunft</li>
              <li>Berichtigung</li>
              <li>Löschung</li>
              <li>Beschwerde</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">9. Cookies</h3>
            <p>Verwendung für Analyse und Funktionalität.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">10. Sicherheit</h3>
            <p>Wir schützen Ihre Daten mit geeigneten Maßnahmen.</p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-white">11. Änderungen</h3>
            <p>Änderungen werden auf der Website veröffentlicht.</p>
            <p className="mt-2 text-sm text-white/70">Zuletzt aktualisiert: 05.05.2025</p>
          </section>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-white/80 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
} 