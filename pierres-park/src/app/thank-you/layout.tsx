import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vielen Dank für Ihren Kauf | Park Nordica',
  description: 'Bestellbestätigung für Ihren Einkauf bei Park Nordica',
};

export default function ThankYouLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#4b4d3b]">
      {children}
    </div>
  );
} 