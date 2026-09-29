import type { Metadata } from 'next';
import './globals.css';
import LenisProvider from '@/components/LenisProvider';

export const metadata: Metadata = {
  title: 'NAVEEN GARAGE | Precision Automotive Care, Maintenance & Performance',
  description:
    'Naveen Garage delivers racing-grade precision automotive service, mechanical diagnostics, periodic maintenance, AC service, brake engineering, and performance tuning.',
  keywords: [
    'Naveen Garage',
    'Automotive Service',
    'Car Maintenance',
    'Engine Diagnostics',
    'Precision Engineering',
    'Performance Tuning',
    'Brake Service',
    'Car Detailing',
  ],
  openGraph: {
    title: 'NAVEEN GARAGE | Precision Automotive Care',
    description: 'Precision automotive care, maintenance and performance tuning delivered with obsessive attention to detail.',
    url: 'https://naveengarage.com',
    siteName: 'Naveen Garage',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white text-[#111111] antialiased selection:bg-[#CC0000] selection:text-white min-h-screen">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
