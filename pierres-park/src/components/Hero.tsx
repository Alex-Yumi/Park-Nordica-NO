'use client';

import Image from 'next/image';
import GitHubImage from './GitHubImage';
import CloudImage from './CloudImage';
import { useLanguage } from '@/context/LanguageContext';
import { useStripe } from '@/context/StripeContext';
import { useState, useEffect, useRef } from 'react';
import { Bus, Car, Ticket, Coffee, Utensils, ShoppingCart, Minus, Plus } from 'lucide-react';

interface ParkImage {
  id: string;
  imageUrl: {
    square?: string;    // Quadratisches Bild (1:1)
    landscape?: string; // Querformat Bild (16:9 oder 4:3)
  };
}

const parkImages: ParkImage[] = [
  {
    id: 'image1',
    imageUrl: {
      square: '/animals/square/1.JPG'
    }
  },
  {
    id: 'image8',
    imageUrl: {
      landscape: '/animals/landscape/8.JPG'
    }
  },
  {
    id: 'image2',
    imageUrl: {
      square: '/animals/square/2.JPG'
    }
  },
  {
    id: 'image9',
    imageUrl: {
      landscape: '/animals/landscape/9.JPG'
    }
  },
  {
    id: 'image3',
    imageUrl: {
      square: '/animals/square/3.JPG'
    }
  },
  {
    id: 'image10',
    imageUrl: {
      landscape: '/animals/landscape/10.JPG'
    }
  },
  {
    id: 'image4',
    imageUrl: {
      square: '/animals/square/4.JPG'
    }
  },
  {
    id: 'image11',
    imageUrl: {
      landscape: '/animals/landscape/11.JPG'
    }
  },
  {
    id: 'image5',
    imageUrl: {
      square: '/animals/square/5.JPG'
    }
  },
  {
    id: 'image13',
    imageUrl: {
      landscape: '/animals/landscape/13.JPG'
    }
  },
  {
    id: 'image6',
    imageUrl: {
      square: '/animals/square/6.JPG'
    }
  },
  {
    id: 'image7',
    imageUrl: {
      square: '/animals/square/7.JPG'
    }
  }
];

export default function Hero() {
  const { t } = useLanguage();
  const { initiateCheckout, isLoading, error } = useStripe();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ParkImage | null>(null);
  const [activeTextModal, setActiveTextModal] = useState<'future' | 'preview' | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  // Refs für alle Kacheln, die animiert werden sollen
  const openingHoursRef = useRef<HTMLDivElement>(null);
  const ticketsRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<HTMLDivElement>(null);
  const parkHighlightsRef = useRef<HTMLDivElement>(null);
  const visitorInfoRef = useRef<HTMLDivElement>(null);

  // Funktion zur Animation eines Elements
  const animateElement = (element: HTMLElement) => {
    // Zuerst alle vorherigen Highlight-Klassen entfernen
    document.querySelectorAll('.highlight-target').forEach(el => {
      el.classList.remove('highlight-target');
    });
    
    // Dann die Highlight-Klasse zum Zielelement hinzufügen
    element.classList.add('highlight-target');
    
    // Und nach der Animation wieder entfernen
    setTimeout(() => {
      element.classList.remove('highlight-target');
    }, 1500); // Animation dauert 1.5 Sekunden
  };

  // Smooth scroll Funktion
  useEffect(() => {
    // Funktion zum sanften Scrollen zu Ankern mit Offset für Header-Höhe
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Nur Links mit Hash-Fragment verarbeiten
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        
        const targetId = target.getAttribute('href')?.substring(1);
        // Einfach das Ziel-Element mit der entsprechenden ID holen
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement) {
          const headerOffset = 100; // Offset für Header-Höhe
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Zum Ziel scrollen
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Highlight-Effekt auf das Zielelement anwenden
          setTimeout(() => {
            animateElement(targetElement);
          }, 500); // Warten, bis Scrollen fast abgeschlossen ist
        }
      }
    };
    
    // Event-Listener für alle Link-Klicks hinzufügen
    document.addEventListener('click', handleAnchorClick);
    
    // Event-Listener beim Unmount entfernen
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const handleImageClick = (image: ParkImage) => {
    setSelectedImage(image);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Re-enable scrolling
  };

  // Effect für Keyboard Events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div className="relative">
      {/* Waldlandschaft mit Tierkarten */}
      <div className="relative hero-height w-full max-w-[100vw] bg-[#0a4725]">
        {/* Hauptinhalt */}
        <div className="relative w-full max-w-[100vw] mx-auto px-1 md:px-4 pt-32 md:pt-24 pb-20 md:pb-24 overflow-hidden">
          
          {/* Bannerbild mit Überschrift */}
          <div className="w-full mx-auto mb-4 md:mb-10 perspective-[1000px]">
            {/* Mobile Ansicht: Text oben und unten, Bild dazwischen */}
            <div className="md:hidden flex flex-col items-center text-center mb-6">
              <h1 className="text-2xl font-bold mb-2 text-white">
                {t('welcome')}
              </h1>
            </div>
            
            <div className="relative w-full h-[240px] md:h-[600px] rounded-xl md:rounded-3xl overflow-hidden shadow-[0_0_25px_rgba(0,0,0,0.1),0_10px_25px_rgba(0,0,0,0.2)] transform-gpu transition-all duration-500 hover:shadow-[0_0_35px_rgba(0,0,0,0.15),0_10px_35px_rgba(0,0,0,0.25)]">
              <GitHubImage
                src="/banner/main-banner.jpeg?v=2024123101"
                alt="Park Nordica Banner"
                fill
                className="object-cover object-center transform-gpu transition-all duration-500 hover:scale-[1.02]"
                priority
                fallbackSrc="/banner/main-banner-fallback.jpg"
                onError={(e) => {
                  console.error('Main banner failed to load:', e);
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  
                  if (parent) {
                    // Erstelle einen besseren Fallback-Hintergrund
                    parent.style.background = 'linear-gradient(135deg, #0a4725 0%, #166534 30%, #1e7e34 70%, #0a4725 100%)';
                    parent.style.backgroundSize = 'cover';
                    parent.style.backgroundPosition = 'center';
                    
                    // Verstecke das fehlgeschlagene Bild
                    target.style.display = 'none';
                    
                    // Füge einen Text-Overlay hinzu für bessere UX
                    const overlay = document.createElement('div');
                    overlay.style.position = 'absolute';
                    overlay.style.top = '50%';
                    overlay.style.left = '50%';
                    overlay.style.transform = 'translate(-50%, -50%)';
                    overlay.style.color = 'white';
                    overlay.style.textAlign = 'center';
                    overlay.style.fontSize = '1.2rem';
                    overlay.style.fontWeight = 'bold';
                    overlay.style.background = 'rgba(0,0,0,0.6)';
                    overlay.style.padding = '1rem 2rem';
                    overlay.style.borderRadius = '0.5rem';
                    overlay.style.backdropFilter = 'blur(4px)';
                    overlay.innerHTML = '🌲 Park Nordica 🌲<br><small>Banner wird geladen...</small>';
                    
                    if (!parent.querySelector('.fallback-overlay')) {
                      overlay.className = 'fallback-overlay';
                      parent.appendChild(overlay);
                    }
                  }
                }}
              />
              {/* Desktop: Überschrift im Banner */}
              <div className="hidden md:flex absolute inset-x-0 bottom-16 items-center justify-center">
                <div className="w-[90%] max-w-4xl bg-black/60 backdrop-blur-sm px-6 py-4 md:px-10 md:py-8 rounded-xl shadow-xl">
                  <h1 className="text-lg md:text-4xl lg:text-5xl font-bold mb-3 md:mb-6 text-white text-center">
                    {t('welcome')}
                  </h1>
                  <p className="text-xs md:text-lg lg:text-2xl text-white/90 text-center">
                    {t('subtitle')}
                  </p>
                </div>
              </div>
              
              {/* Desktop: Button zentriert unter der Text-Box */}
              <div className="hidden md:flex absolute inset-x-0 bottom-4 items-center justify-center">
                <a
                  href="/#tickets"
                  className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg whitespace-nowrap"
                >
                  {t('bookTickets')}
                </a>
              </div>
              
              {/* Mobile: Button in der unteren rechten Ecke */}
              <div className="md:hidden absolute bottom-4 right-4">
                <a
                  href="/#tickets"
                  className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white font-bold py-1.5 px-4 rounded-full text-xs transition-colors shadow-lg whitespace-nowrap"
                >
                  {t('bookTickets')}
                </a>
              </div>
            </div>

            {/* Mobile Ansicht: Unterer Text */}
            <div className="md:hidden flex flex-col items-center text-center mt-4">
              <p className="text-sm text-white/90">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* Öffnungszeiten und Ticketpreise */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8 mb-4 md:mb-16">
            {/* Social Media Kachel */}
            <div 
              ref={openingHoursRef}
              className="bg-gradient-to-br from-stone-700/90 via-stone-750/95 to-stone-800/90 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.2)] overflow-hidden transform-gpu transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] backdrop-blur-md border border-white/10 cursor-pointer"
              onClick={() => openingHoursRef.current && animateElement(openingHoursRef.current)}
            >
              <div className="p-6 flex flex-col min-h-[400px]">
                {/* Container für Titel und Logo */}
                <div className="flex-grow flex flex-col items-center justify-center">
                  <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white text-center">
                    {t('followSocialMedia')}
                </h2>
                  
                  {/* Logo */}
                  <div className="flex justify-center">
                    <div className="relative h-36 md:h-44 w-36 md:w-44">
                      <GitHubImage
                      src="/logo/Nordica_Logo_V4_Grey.png"
                      alt="Park Nordica Logo"
                        fill
                        className="object-contain filter-brightness-110"
                    />
                    </div>
                  </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center justify-center space-x-8 mt-auto">
                  {/* Facebook Icon */}
                  <a 
                    href="https://facebook.com/DEINE_SEITE" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Facebook" 
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-[#1877F2]/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#1877F2] transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  {/* Instagram Icon */}
                  <a 
                    href="https://instagram.com/DEIN_PROFIL" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="Instagram" 
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#F77737]/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#E1306C] transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                  {/* TikTok Icon */}
                  <a 
                    href="https://tiktok.com/@DEIN_PROFIL" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    aria-label="TikTok" 
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-[#000000]/10 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#000000] transform group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Ticketpreise Box */}
            <div 
              id="tickets" 
              ref={ticketsRef}
              className="bg-gradient-to-br from-stone-700/95 to-stone-800/95 rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white flex items-center">
                  <Ticket className="h-6 w-6 md:h-7 md:w-7 mr-2 text-[#4A90E2]" />
                  {t('ticketPrices')}
                </h2>
                
                <div className="space-y-5 mt-6">
                  {/* Ticket mit Preis */}
                  <div className="flex items-center">
                    <Ticket className="h-7 w-7 md:h-8 md:w-8 text-[#4A90E2] mr-4 flex-shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-base md:text-lg text-white/90">{t('sneakPeekTicket')}</span>
                      <span className="font-medium text-lg md:text-xl text-white">150 NOK</span>
                    </div>
                  </div>
                  
                  {/* Getränkemarke */}
                  <div className="flex items-center">
                    <Coffee className="h-7 w-7 md:h-8 md:w-8 text-[#4A90E2] mr-4 flex-shrink-0" />
                    <span className="text-base md:text-lg text-white/90">1 {t('drinkVoucher')}</span>
                  </div>
                  
                  {/* Essensmarke */}
                  <div className="flex items-center">
                    <Utensils className="h-7 w-7 md:h-8 md:w-8 text-[#4A90E2] mr-4 flex-shrink-0" />
                    <span className="text-base md:text-lg text-white/90">1 {t('foodVoucher')}</span>
                  </div>
                </div>
                
                {/* Ticketanzahl-Auswahl */}
                <div className="flex items-center justify-center mt-6 space-x-4">
                  <span className="text-white text-sm md:text-base">Anzahl:</span>
                  <div className="flex items-center space-x-2 bg-stone-600/50 rounded-lg p-1">
                    <button 
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="p-1 text-white hover:bg-stone-500/50 rounded"
                      aria-label="Anzahl verringern"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-white w-6 text-center">{ticketQuantity}</span>
                    <button 
                      onClick={() => setTicketQuantity(ticketQuantity + 1)}
                      className="p-1 text-white hover:bg-stone-500/50 rounded"
                      aria-label="Anzahl erhöhen"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Gesamtpreis */}
                <div className="text-center mt-3 text-white/90 text-sm">
                  Gesamtpreis: <span className="font-bold">{ticketQuantity * 150} NOK</span>
                </div>
                
                {/* Fehleranzeige */}
                {error && (
                  <div className="text-red-400 text-sm text-center mt-2">
                    {error}
                  </div>
                )}
                
                <div className="flex justify-center mt-4">
                  <button
                    id="buy-tickets"
                    className={`bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-full text-xs md:text-base transition-colors shadow-lg flex items-center ${
                      isLoading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    onClick={() => initiateCheckout(ticketQuantity)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 md:w-5 md:h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                    <ShoppingCart className="h-3 w-3 md:h-5 md:w-5 mr-1 md:mr-2" />
                    )}
                    {isLoading ? 'Wird geladen...' : t('buyTickets')}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Anreise Box */}
            <div 
              ref={directionsRef}
              className="bg-gradient-to-br from-stone-700/95 to-stone-800/95 rounded-xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
              onClick={() => directionsRef.current && animateElement(directionsRef.current)}
            >
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7 mr-2 text-[#4A90E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('directions')}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Bus className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm md:text-base text-white">{t('byBus')}</span>
                      <p className="text-sm md:text-base text-white/80 leading-relaxed">{t('busDirections')}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Car className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0" />
                    <div>
                      <span className="font-medium text-sm md:text-base text-white">{t('byCar')}</span>
                      <p className="text-sm md:text-base text-white/80 leading-relaxed">{t('carDirections')}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-stone-700 rounded-lg p-3 text-center">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t('addressValue'))}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/90 hover:text-white flex items-center justify-center text-sm md:text-base transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    {t('viewOnMap')}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tierkarten */}
          <div id="attractions" className="carousel-container mt-3 md:mt-8 mb-8 md:mb-12 relative z-0 overflow-visible">
            <style jsx>{`
              .carousel-track {
                display: flex;
                animation: scroll 60s linear infinite;
              }
              
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              
              .carousel-track:hover {
                animation-play-state: paused;
              }
            `}</style>
            <div className="carousel-track">
              {/* Erste Gruppe von Karten */}
              {parkImages.map((image) => (
                <div
                  key={image.id}
                  className={`relative flex-shrink-0 rounded-lg md:rounded-3xl overflow-hidden shadow-2xl mx-2 md:mx-4 transition-transform duration-300 hover:scale-105 cursor-pointer ${
                    image.imageUrl.landscape 
                      ? 'h-[220px] md:h-[400px] w-[450px] md:w-[600px]' // Landscape Format
                      : 'h-[220px] md:h-[400px] w-[300px] md:w-[400px]' // Square Format
                  }`}
                  onClick={() => handleImageClick(image)}
                  >
                    <GitHubImage
                    src={image.imageUrl.landscape || image.imageUrl.square || ''}
                    alt={`Park Image ${image.id}`}
                      fill
                      className="object-cover"
                    />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50]/40 via-transparent to-[#1a252f]/40" />
                  </div>
              ))}
              {/* Zweite Gruppe von Karten (Kopie für nahtlosen Loop) */}
              {parkImages.map((image) => (
                <div
                  key={`${image.id}-clone`}
                  className={`relative flex-shrink-0 rounded-lg md:rounded-3xl overflow-hidden shadow-2xl mx-2 md:mx-4 transition-transform duration-300 hover:scale-105 cursor-pointer ${
                    image.imageUrl.landscape 
                      ? 'h-[220px] md:h-[400px] w-[450px] md:w-[600px]' // Landscape Format
                      : 'h-[220px] md:h-[400px] w-[300px] md:w-[400px]' // Square Format
                  }`}
                  onClick={() => handleImageClick(image)}
                  >
                    <GitHubImage
                    src={image.imageUrl.landscape || image.imageUrl.square || ''}
                    alt={`Park Image ${image.id}`}
                      fill
                      className="object-cover"
                    />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50]/40 via-transparent to-[#1a252f]/40" />
                </div>
              ))}
              </div>
          </div>
        </div>
      </div>

      {/* Schneelandschaft */}
      <div className="relative w-full max-w-[100vw] bg-[#0a4725] -mt-4 md:-mt-8 pb-16 md:pb-24 overflow-visible">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 relative z-30 mt-2">
            <div 
              ref={parkHighlightsRef}
              className="bg-gradient-to-br from-stone-700/90 via-stone-750/95 to-stone-800/90 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.2)] overflow-hidden transform-gpu transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] backdrop-blur-md border border-white/10 p-6 md:p-8 mt-2 pb-16 md:pb-8"
            >
              <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-6 text-white">{t('buildingFuture')}</h2>
              <ul className="space-y-2 md:space-y-4 text-sm md:text-lg">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white">{t('parkClosed')}</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-white">{t('constructionSafety')}</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span className="text-white">{t('modernization')}</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white">{t('reopening')}</span>
                </li>
              </ul>

              {/* Mehr erfahren Button */}
              <button
                onClick={() => setActiveTextModal('future')}
                className="absolute bottom-3 right-3 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center space-x-2"
              >
                <span>{t('readMore')}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>

            <div 
              ref={visitorInfoRef}
              className="bg-gradient-to-br from-stone-700/90 via-stone-750/95 to-stone-800/90 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.2)] overflow-hidden transform-gpu transition-all duration-300 hover:scale-[1.02] hover:translate-y-[-4px] hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] backdrop-blur-md border border-white/10 p-6 md:p-8 mt-2 pb-16 md:pb-8"
            >
              <h2 className="text-xl md:text-3xl font-bold mb-3 md:mb-6 text-white">{t('weekendPreview')}</h2>
              <ul className="space-y-2 md:space-y-4 text-sm md:text-lg">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  <span className="text-white">{t('sneakPeekDates')}</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white">{t('guidedFeeding')}</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span className="text-white">{t('firstLook')}</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2M6 7v6m6-6v6m6-6v6" />
                  </svg>
                  <span className="text-white">{t('foodIncluded')}</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 mt-1 text-[#4A90E2] flex-shrink-0 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white">{t('limitedSpots')}</span>
                </li>
              </ul>

              {/* Mehr erfahren Button */}
              <button
                onClick={() => setActiveTextModal('preview')}
                className="absolute bottom-3 right-3 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center space-x-2"
              >
                <span>{t('readMore')}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Controls */}
            <div className="absolute -top-12 right-0 flex items-center space-x-4">
              {/* Download Button */}
              <a
                href={selectedImage.imageUrl.landscape || selectedImage.imageUrl.square || ''}
                download
                className="text-white hover:text-gray-300 transition-colors flex items-center"
                onClick={e => e.stopPropagation()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Image Container */}
            <div className="relative">
              <GitHubImage
                src={selectedImage.imageUrl.landscape || selectedImage.imageUrl.square || ''}
                alt={`Park Image ${selectedImage.id}`}
                width={1920}
                height={1080}
                className="rounded-lg object-contain"
                style={{ maxHeight: '85vh', width: 'auto' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Text Modal */}
      {activeTextModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveTextModal(null)}
        >
          <div 
            className="relative bg-[#0a4725] max-w-2xl mx-4 rounded-xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="border-b border-white/20 p-6">
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {activeTextModal === 'future' ? t('buildingFuture') : t('weekendPreview')}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="prose prose-lg prose-invert">
                {activeTextModal === 'future' ? (
                  <div className="space-y-4">
                    {t('futureDetailedText').split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-white/90 leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {t('previewDetailedText').split('\n\n').map((paragraph, index) => (
                      <div key={index} className="text-white/90">
                        {paragraph.includes('•') ? (
                          <div className="space-y-2 my-4">
                            {paragraph.split('\n').map((line, lineIndex) => (
                              <div key={lineIndex} className={line.startsWith('•') ? 'flex items-start' : ''}>
                                {line.startsWith('•') && (
                                  <span className="text-[#4A90E2] mr-2 flex-shrink-0">•</span>
                                )}
                                <span className="leading-relaxed">{line.startsWith('•') ? line.substring(2) : line}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="leading-relaxed mb-4">{paragraph}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="border-t border-white/20 p-4 flex justify-end">
              <button
                onClick={() => setActiveTextModal(null)}
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-2 rounded-full text-sm transition-all duration-300 flex items-center space-x-2"
              >
                <span>{t('close')}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setActiveTextModal(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 