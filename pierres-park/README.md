This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Park Nordica Website

## Bildintegration mit öffentlichem GitHub-Repository

Die Website verwendet Bilder aus dem öffentlichen GitHub-Repository. Diese werden automatisch geladen, ohne zusätzliche Konfiguration.

Die `GitHubImage`-Komponente lädt Bilder in der Entwicklungsumgebung lokal und in der Produktion direkt aus dem GitHub-Repository.

### Wichtige Hinweise:

- Das GitHub-Repository **muss öffentlich** sein, damit die Bilder geladen werden können
- Die Bilder werden aus dem Pfad `pierres-park/public/` im Repository geladen
- Bei Änderungen der Bilder müssen diese ins Repository gepusht werden

## Verwendung der GitHubImage Komponente

```jsx
import GitHubImage from '@/components/GitHubImage';

// Verwende es wie eine normale Image-Komponente
<GitHubImage 
  src="/banner/main-banner.jpeg"
  alt="Banner" 
  width={1200} 
  height={600} 
/>
```

## Umgebungsvariablen

Das Projekt benötigt folgende Umgebungsvariablen für die Stripe-Integration:

```
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

Erstelle eine `.env.local` Datei im Hauptverzeichnis des Projekts mit diesen Variablen.
