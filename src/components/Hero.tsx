'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

interface Animal {
  id: string;
  nameKey: string;
  speciesKey: string;
  descriptionKey: string;
  imageUrl: string;
  age: number;
}

const animals: Animal[] = [
  {
    id: 'bear',
    nameKey: 'bearName',
    speciesKey: 'bearSpecies',
    descriptionKey: 'bearDescription',
    imageUrl: '/animals/bear.jpg',
    age: 17
  },
  {
    id: 'wolf',
    nameKey: 'wolfName',
    speciesKey: 'wolfSpecies',
    descriptionKey: 'wolfDescription',
    imageUrl: '/animals/wolf.jpg',
    age: 8
  },
  {
    id: 'fox',
    nameKey: 'foxName',
    speciesKey: 'foxSpecies',
    descriptionKey: 'foxDescription',
    imageUrl: '/animals/fox.jpg',
    age: 5
  }
];

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}

export default function Hero() {
  const { t } = useLanguage();
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [activeTextModal, setActiveTextModal] = useState<'future' | 'preview'>('future');

  const toggleCard = (id: string) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className="relative">
      {/* Norwegische Flagge Header */}
      <div className="relative h-[50vh]">
        <div className="absolute inset-0">
          <Image
            src="/landscapes/norwegian-flag.jpg"
            alt="Norwegische Flagge"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#2d5a27]/90" />
        {/* Überschrift im Banner */}
        <div className="absolute inset-0 flex flex-col items-center p-2 md:p-4 pt-6 md:pt-16 pb-6 md:pb-16">
          <div className="inline-block bg-black/40 backdrop-blur-sm px-3 py-2 md:px-8 md:py-6 rounded-xl shadow-xl mt-[35%] md:mt-[45%] mb-8 md:mb-16 border border-white/10 hover:border-white/20 transition-all duration-300 group">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>
              <h1 className="text-lg md:text-4xl lg:text-5xl font-bold mb-1 md:mb-4 text-white group-hover:text-white/90 transition-colors duration-300">
                {t('welcome')}
              </h1>
              <p className="text-xs md:text-lg lg:text-xl text-white/90 group-hover:text-white/80 transition-colors duration-300">
                {t('subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Waldlandschaft */}
      <div className="relative h-[100vh]">
        <div className="absolute inset-0">
          <Image
            src="/landscapes/forest.jpg"
            alt="Norwegische Waldlandschaft"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#2d5a27]/90 via-transparent to-[#e8f4fc]/90" />
        
        {/* Hauptinhalt */}
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {t('welcome')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t('subtitle')}
            </p>
            <a
              href="#tickets"
              className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg"
            >
              {t('bookTickets')}
            </a>
          </div>
        </div>
      </div>

      {/* Schneelandschaft */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/landscapes/snow.jpg"
            alt="Norwegische Schneelandschaft"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8f4fc]/90 via-transparent to-transparent" />

        {/* Tierkarten */}
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className="relative h-[400px] cursor-pointer perspective-[1000px]"
                onClick={() => toggleCard(animal.id)}
              >
                <div 
                  className="relative w-full h-full transition-all duration-700 rounded-3xl shadow-2xl"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: activeCard === animal.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Vorderseite - NUR das Bild */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <Image
                      src={animal.imageUrl}
                      alt={t(animal.nameKey)}
                      fill
                      className="object-cover"
                    />
                  </div>
                
                  {/* Rückseite - Bild mit Text Overlay */}
                  <div 
                    className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <Image
                      src={animal.imageUrl}
                      alt={t(animal.nameKey)}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2C3E50]/90 via-[#34495E]/90 to-[#1a252f]/90" />
                    <div className="absolute inset-0 p-8 text-white">
                      <div className="h-full flex flex-col">
                        <h3 className="text-3xl font-bold mb-6 text-center">{t(animal.nameKey)}</h3>
                        <div className="space-y-4 flex-grow">
                          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-lg mb-2"><span className="font-semibold">{t('age')}:</span> {animal.age} {t('years')}</p>
                            <p className="text-lg"><span className="font-semibold">{t('species')}:</span> {t(animal.speciesKey)}</p>
                          </div>
                          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                            <p className="text-lg leading-relaxed">{t(animal.descriptionKey)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platzhalter-Sektion für zusätzlichen Content */}
      <div className="relative min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#2C3E50]">{t('parkHighlights')}</h2>
              <ul className="space-y-4 text-lg text-gray-700">
                <li className="flex items-center">
                  <span className="mr-2">🌲</span> {t('highlight1')}
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🐾</span> {t('highlight2')}
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🎯</span> {t('highlight3')}
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🌅</span> {t('highlight4')}
                </li>
              </ul>
            </div>
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold mb-6 text-[#2C3E50]">{t('visitorInfo')}</h2>
              <div className="space-y-4 text-lg text-gray-700">
                <p>{t('visitorInfo1')}</p>
                <p>{t('visitorInfo2')}</p>
                <p>{t('visitorInfo3')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col h-full group">
        <div className="flex-grow flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-shimmer"></div>
          
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white text-center relative z-10 group-hover:scale-105 transition-transform duration-300">
            {t('openingHours')}
          </h2>
          
          {/* Logo mit verbessertem Hover-Effekt */}
          <div className="flex justify-center relative z-10">
            <img
              src="/logo/Nordica_Logo_V4_Grey.png"
              alt="Park Nordica Logo"
              className="h-36 md:h-44 w-auto filter-brightness-110 group-hover:filter-brightness-125 transform group-hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>

        {/* Social Media Icons mit verbesserten Hover-Effekten */}
        <div className="flex items-center justify-center space-x-8 mt-auto relative z-10">
          {/* Hier können die Social Media Icons eingefügt werden */}
        </div>
      </div>

      {/* Modal */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        onClick={() => setActiveTextModal(null)}
      >
        <div
          className="bg-white p-8 rounded-xl shadow-lg max-w-[80vw] max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
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
        </div>
      </div>
    </div>
  );
} 