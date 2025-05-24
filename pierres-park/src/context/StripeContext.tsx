'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLanguage } from './LanguageContext';

// Stripes Publishable Key
const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

interface StripeContextType {
  initiateCheckout: (quantity: number) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const StripeContext = createContext<StripeContextType | null>(null);

export function StripeProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { language } = useLanguage();

  const initiateCheckout = async (quantity: number) => {
    try {
      setIsLoading(true);
      setError(null);

      // Server-seitige Checkout-Session erstellen
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          quantity,
          language // Aktuelle Sprache mitsenden
        }),
      });

      if (!response.ok) {
        throw new Error('Netzwerkfehler beim Erstellen der Checkout-Session');
      }

      const data = await response.json();
      
      if (data.error) {
        setError(data.error);
        return;
      }
      
      // Direkt zur Checkout-URL weiterleiten
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      
      // Wenn keine URL zurückkommt, wird ein Fehler angezeigt
      setError('Keine Checkout-URL erhalten');
    } catch (err) {
      setError('Es gab einen Fehler beim Checkout-Prozess.');
      console.error('Checkout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StripeContext.Provider value={{ initiateCheckout, isLoading, error }}>
      {children}
    </StripeContext.Provider>
  );
}

export function useStripe() {
  const context = useContext(StripeContext);
  if (!context) {
    throw new Error('useStripe muss innerhalb eines StripeProviders verwendet werden');
  }
  return context;
} 