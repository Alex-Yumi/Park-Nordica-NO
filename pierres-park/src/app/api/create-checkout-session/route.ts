import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Prüfe und protokolliere Konfigurationsvariablen für Debugging
console.log('STRIPE_SECRET_KEY gesetzt:', !!process.env.STRIPE_SECRET_KEY);

// Initialisiere Stripe mit dem Secret Key
let stripe: Stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY ist nicht in den Umgebungsvariablen definiert");
  }
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-02-24.acacia', // Korrigierte API-Version gemäß Linter
  });
} catch (error) {
  console.error('Fehler bei der Stripe-Initialisierung:', error);
  // Trotzdem fortfahren, um detailliertere Fehlermeldungen zu bekommen
}

export async function POST(req: NextRequest) {
  try {
    // Prüfe zuerst, ob Stripe korrekt initialisiert wurde
    if (!stripe) {
      console.error('Stripe wurde nicht korrekt initialisiert');
      return NextResponse.json({ 
        error: 'Server-Konfigurationsfehler: Stripe nicht initialisiert.' 
      }, { status: 500 });
    }

    // Prüfe Request-Body
    let quantity;
    try {
      const body = await req.json();
      quantity = body.quantity;
      console.log('Erhaltene Ticketanzahl:', quantity);
    } catch (error) {
      console.error('Fehler beim Parsen des Request-Body:', error);
      return NextResponse.json({ 
        error: 'Ungültiger Request-Body' 
      }, { status: 400 });
    }

    if (!quantity || typeof quantity !== 'number' || quantity < 1) {
      console.error('Ungültige Ticketanzahl:', quantity);
      return NextResponse.json({ 
        error: 'Ungültige Ticketanzahl' 
      }, { status: 400 });
    }

    console.log('Versuche, Checkout-Session zu erstellen mit dynamischem Preis von 150 NOK pro Ticket');

    // Erstelle die Checkout-Session mit dynamischem Preis ohne PRICE_ID
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'nok',
            product_data: {
              name: 'Sneak Peek Ticket',
              description: 'Exklusives Wochenend-Vorschau Ticket für Park Nordica (19. & 20. Juli 2025)',
              images: ['https://static.nationalgeographic.co.uk/files/styles/image_3200/public/wildlife-photographer-year-2020-11.jpg?w=1600&h=900'],
            },
            unit_amount: 15000, // 150 NOK in Cent
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${req.nextUrl.origin}/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/`,
      locale: 'de',
    });

    console.log('Checkout-Session erfolgreich erstellt:', session.id);

    if (session.url) {
      return NextResponse.json({ url: session.url });
    } else {
      console.error('Keine URL in der Checkout-Session vorhanden');
      return NextResponse.json({ 
        error: 'Checkout-Session konnte nicht erstellt werden.' 
      }, { status: 500 });
    }

  } catch (error) {
    // Detaillierte Fehlerprotokollierung
    console.error('Stripe Checkout Error:', error);
    
    let errorMessage = 'Interner Serverfehler';
    let errorDetails = '';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails = JSON.stringify(error, Object.getOwnPropertyNames(error));
      console.error('Detaillierte Fehlerinformationen:', errorDetails);
    }
    
    return NextResponse.json({ 
      error: `Fehler beim Erstellen der Checkout-Session: ${errorMessage}`,
      details: errorDetails
    }, { status: 500 });
  }
} 