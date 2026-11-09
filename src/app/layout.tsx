import type { Metadata } from 'next';
import './globals.css';
import { CustomCursor } from '../components/CustomCursor';

export const metadata: Metadata = {
  title: 'Sunil Kumar Reddy — Immersive 3D Creative Portfolio Gallery',
  description:
    'A dense, animated creative project gallery showcasing multidisciplinary design, 3D art, brand identities, and high-performance digital products.',
  openGraph: {
    title: 'Sunil Kumar Reddy — Creative Portfolio Gallery',
    description:
      'Floating, dimensional, animated creative project gallery inspired by modern studio aesthetics.',
    url: 'https://sunil.studio',
    siteName: 'Sunil Kumar Reddy Studio',
    locale: 'en_US',
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
      <body className="antialiased bg-[#F7F7F5] text-zinc-950 min-h-screen selection:bg-zinc-900 selection:text-white">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
