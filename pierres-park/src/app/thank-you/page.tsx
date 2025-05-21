'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import GitHubImage from '@/components/GitHubImage';

export default function ThankYouPage() {
  const { t } = useLanguage();
  const [orderDetails, setOrderDetails] = useState<{
    orderId: string;
    ticketCount: number;
  }>({
    orderId: '',
    ticketCount: 0,
  });

  useEffect(() => {
    // Hole Parameter aus der URL
    const searchParams = new URLSearchParams(window.location.search);
    const sessionId = searchParams.get('session_id') || '';
    const ticketCount = parseInt(searchParams.get('quantity') || '1', 10);

    // Setze Bestelldetails
    setOrderDetails({
      orderId: sessionId,
      ticketCount: ticketCount,
    });
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-gradient-to-br from-stone-700/90 via-stone-750/95 to-stone-800/90 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.1),0_5px_15px_rgba(0,0,0,0.2)] overflow-hidden backdrop-blur-md border border-white/10 p-8">
          
          {/* Logo */}
          <div className="flex flex-col items-center justify-center text-center mb-10">
            <Link href="/" className="mb-2">
              <div className="relative h-28 w-28">
                <GitHubImage
                  src="/logo/Nordica_Logo_V4_Grey.png"
                  alt="Park Nordica Logo"
                  fill
                  className="object-contain filter-brightness-110 transition-transform hover:scale-110"
                />
              </div>
            </Link>
          </div>
          
          {/* Bestätigungsnachricht */}
          <div className="text-center mb-8">
            <div className="inline-flex justify-center items-center rounded-full bg-green-500/20 p-3 mb-4">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {t('thankYou')}
            </h1>
            <p className="text-white/80 mb-2 text-lg">
              {t('orderConfirmed')}
            </p>
            <p className="text-white/70 mb-6">
              {t('confirmationEmailSent')}
            </p>
            
            {/* Bestelldetails */}
            {orderDetails.orderId && (
              <div className="bg-stone-600/30 rounded-lg p-4 mb-6">
                <p className="text-white/70 mb-1">
                  {t('orderNumber')}: <span className="text-white font-medium">{orderDetails.orderId.substring(0, 8)}...</span>
                </p>
                <p className="text-white/70">
                  {t('ticketsPurchased')}: <span className="text-white font-medium">{orderDetails.ticketCount}</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Information */}
          <div className="bg-[#4A90E2]/10 border border-[#4A90E2]/20 rounded-lg p-4 mb-6">
            <h2 className="text-[#4A90E2] font-semibold mb-2">
              {t('whatNext')}
            </h2>
            <p className="text-white/80 text-sm mb-2">
              {t('ticketsInfo')}
            </p>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-[#4A90E2] hover:bg-[#4A90E2]/90 text-white font-semibold py-3 px-6 rounded-full transition-colors shadow-lg text-center"
            >
              {t('backToHome')}
            </Link>
            <button 
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-full transition-colors"
              onClick={() => window.print()}
            >
              {t('printReceipt')}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 