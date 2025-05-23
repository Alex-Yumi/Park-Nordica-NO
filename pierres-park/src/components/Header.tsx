'use client';

import { useLanguage } from '@/context/LanguageContext';
import LanguageFlag from './LanguageFlag';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import GitHubImage from './GitHubImage';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Aktiver Abschnitt basierend auf Scroll-Position
      const scrollPosition = window.scrollY + 150; // Offset für die Berechnung
      
      // IDs aller Abschnitte
      const sections = ['attractions', 'tickets', 'contact'];
      
      // Ermitteln, welcher Abschnitt gerade im Viewport ist
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hamburger-Menü schließen, wenn auf einen Link geklickt wird oder gescrollt wird
  useEffect(() => {
    const closeMenuOnScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', closeMenuOnScroll);
    return () => window.removeEventListener('scroll', closeMenuOnScroll);
  }, [mobileMenuOpen]);

  // Body scrolling verhindern wenn das Menü offen ist
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-w-[100vw] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Haupt-Header-Container mit neuer Höhe und Hintergrundfarbe */}
      <div className="relative w-full h-32 md:h-24 bg-gradient-to-br from-stone-700/95 to-stone-800/95 shadow-lg backdrop-blur-sm transition-all duration-300">
        {/* Mobile Layout: 2-Zeilen-Struktur */}
        <div className="md:hidden container mx-auto h-full px-4">
          {/* Obere Zeile: Ticket-Button und Hamburger */}
          <div className="flex justify-between items-center h-12 pt-3">
            {/* Ticket-Button */}
            <a 
              href="/#tickets"
              className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-md whitespace-nowrap"
            >
              {t('bookTickets')}
            </a>
            
            {/* Hamburger Menu Icon */}
            <button 
              className="relative z-50 p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-5">
                <span 
                  className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    mobileMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
                  }`}
                />
                <span 
                  className={`absolute h-0.5 w-6 bg-white transform transition-opacity duration-300 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0 translate-x-3' : 'opacity-100'
                  }`}
                  style={{ top: '50%', marginTop: '-1px' }}
                />
                <span 
                  className={`absolute h-0.5 w-6 bg-white transform transition duration-300 ease-in-out ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : 'translate-y-5'
                  }`}
                />
              </div>
            </button>
          </div>
          
          {/* Untere Zeile: Nur Logo, ohne Schrift */}
          <div className="flex justify-center items-center h-20">
            <Link 
              href="/" 
              className="transition-transform hover:scale-105"
            >
              <div className="relative h-24 w-24">
                <GitHubImage
                  src="/logo/Nordica_Logo_V4_Grey.png"
                  alt="Park Nordica Logo"
                  fill
                  className="object-contain filter-brightness-110"
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Layout: 3-Spalten-Layout (bleibt unverändert) */}
        <nav className="hidden md:block container relative mx-auto px-4 h-full z-10">
          {/* Original 3-Spalten Layout */}
          <div className="flex items-center h-full">
            {/* Linker Bereich: Sneak Peek Button */}
            <div className="flex flex-1 justify-start">
                <a 
                href="/#tickets"
                className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors shadow-md whitespace-nowrap"
                >
                {t('bookTickets')}
                </a>
              </div>
              
            {/* Mittlerer Bereich: Park Logo Nordica */}
            <Link 
              href="/" 
              className="flex justify-center items-center space-x-3 transition-transform hover:scale-105"
            >
              <span className="text-xl font-bold text-white">Park</span>
              <div className="relative h-24 w-24">
                <GitHubImage
                  src="/logo/Nordica_Logo_V4_Grey.png"
                  alt="Park Nordica Logo"
                  fill
                  className="object-contain filter-brightness-110"
                />
              </div>
              <span className="text-xl font-bold text-white">Nordica</span>
            </Link>

            {/* Rechter Bereich: Desktop Nav, Flaggen, Hamburger */}
            <div className="flex items-center space-x-6 flex-1 justify-end">
              {/* Desktop Language Flags - jetzt vor dem Kontakt-Link */}
              <div className="flex space-x-3">
                <LanguageFlag 
                  language="de" 
                  isActive={language === 'de'} 
                  onClick={() => setLanguage('de')} 
                />
                <LanguageFlag 
                  language="no" 
                  isActive={language === 'no'} 
                  onClick={() => setLanguage('no')} 
                />
                <LanguageFlag 
                  language="en" 
                  isActive={language === 'en'} 
                  onClick={() => setLanguage('en')} 
                />
                <LanguageFlag 
                  language="es" 
                  isActive={language === 'es'} 
                  onClick={() => setLanguage('es')} 
                />
              </div>

              {/* Desktop Navigation - jetzt nach den Flaggen */}
              <div className="flex"> {/* space-x hier nicht mehr nötig, da nur ein Element */}
                <a 
                  href="/#contact" 
                  className={`text-white font-semibold hover:text-white transition-all duration-300 hover:scale-105 text-base ${
                    activeSection === 'contact' ? 'text-[#4A90E2] scale-105' : ''
                  }`}
                >
                  {t('contact')}
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-gradient-to-br from-[#1E2A3B]/95 to-[#2C3E50]/95 backdrop-blur-md z-40 md:hidden flex flex-col items-center justify-start pt-20 overflow-y-auto transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* X-Button zum Schließen des Menüs */}
        <button 
          className="absolute top-5 right-5 text-white p-2"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Menü schließen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Park Nordica Logo und Slogan */}
        <div className="flex flex-col items-center mb-8">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#4A90E2] to-[#63B3ED] bg-clip-text text-transparent">
            Park Nordica
          </h3>
          <p className="text-white/80 mb-4 text-center px-8">{t('parkSlogan')}</p>
          <div className="relative h-24 w-24">
            <GitHubImage
              src="/logo/Nordica_Logo_V4_Grey.png"
              alt="Park Nordica Logo"
              fill
              className="object-contain filter-brightness-110"
            />
          </div>
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col items-center w-full px-8">
          <a 
            href="/#contact" 
            className={`text-2xl font-bold text-white hover:text-[#4A90E2] transition-colors mb-6 ${
              activeSection === 'contact' ? 'text-[#4A90E2]' : ''
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('contact')}
          </a>
          
          {/* Footer Legal Links */}
          <div className="w-full pt-6 border-t border-white/10 mb-6">
            <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-[#4A90E2] to-[#63B3ED] bg-clip-text text-transparent">
              {t('legal')}
            </h3>
            <ul className="space-y-4 flex flex-col items-center">
              <li>
                <a 
                  href="/datenschutz"
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {t('privacy.title')}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="/impressum" 
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {t('terms.title')}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="/agb" 
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {t('terms.title')}
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="/haftungsausschluss" 
                  className="text-white/80 hover:text-white transition-colors flex items-center space-x-2 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="transform group-hover:translate-x-1 transition-transform">
                    {t('disclaimer.title')}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Copyright */}
          <div className="w-full pt-4 border-t border-white/10 text-center mb-8">
            <p className="text-white/60 hover:text-white/80 transition-colors text-sm">
              &copy; {new Date().getFullYear()} Park Nordica. {t('copyright')}
            </p>
          </div>
        </div>
        
        {/* Mobile Language Selector */}
        <div className="w-full pt-6 border-t border-white/10 mb-8">
          <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-[#4A90E2] to-[#63B3ED] bg-clip-text text-transparent">
            {t('language')}
          </h3>
          <div className="flex justify-center flex-wrap gap-8 px-4 mb-10">
            <div className="w-14 h-14 transform hover:scale-110 transition-transform">
          <LanguageFlag 
            language="de" 
            isActive={language === 'de'} 
            onClick={() => {
              setLanguage('de');
              setMobileMenuOpen(false);
            }} 
            size="large"
          />
            </div>
            <div className="w-14 h-14 transform hover:scale-110 transition-transform">
          <LanguageFlag 
            language="no" 
            isActive={language === 'no'} 
            onClick={() => {
              setLanguage('no');
              setMobileMenuOpen(false);
            }} 
            size="large"
          />
            </div>
            <div className="w-14 h-14 transform hover:scale-110 transition-transform">
          <LanguageFlag 
            language="en" 
            isActive={language === 'en'} 
            onClick={() => {
              setLanguage('en');
              setMobileMenuOpen(false);
            }} 
            size="large"
          />
            </div>
            <div className="w-14 h-14 transform hover:scale-110 transition-transform">
          <LanguageFlag 
            language="es" 
            isActive={language === 'es'} 
            onClick={() => {
              setLanguage('es');
              setMobileMenuOpen(false);
            }} 
            size="large"
          />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}