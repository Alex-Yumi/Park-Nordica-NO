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

## Bildintegration mit Cloudinary

Um Probleme mit Git LFS und GitHub-Authentifizierungstokens zu umgehen, nutzen wir Cloudinary für die Bildhosting-Lösung. So richtest du es ein:

1. Registriere dich kostenlos bei [Cloudinary](https://cloudinary.com/users/register/free)
2. Nach der Anmeldung findest du deinen Cloud-Namen im Dashboard
3. Erstelle eine `.env.local` Datei im Projektordner und füge folgende Zeile hinzu:
   ```
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dein_cloud_name
   ```
4. Lade alle Bilder des Projekts in dein Cloudinary-Konto hoch. Achte darauf, dass die Dateinamen beibehalten werden.

Die `CloudImage` Komponente wird automatisch zwischen lokalen Bildern in der Entwicklung und Cloudinary-Bildern in der Produktion wechseln.

## Verwendung der Cloudinary Integration

Ersetze alle `<Image>` oder `<GitHubImage>` Tags durch `<CloudImage>`:

```jsx
import CloudImage from '@/components/CloudImage';

// Verwende es wie eine normale Image-Komponente
<CloudImage 
  src="/banner/main-banner.jpeg"
  alt="Banner" 
  width={1200} 
  height={600} 
/>
```

## Umgebungsvariablen

Das Projekt benötigt folgende Umgebungsvariablen:

```
# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dein_cloud_name
```

Erstelle eine `.env.local` Datei im Hauptverzeichnis des Projekts mit diesen Variablen.
