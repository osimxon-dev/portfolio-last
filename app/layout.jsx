import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const sans = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });

export const metadata = {
  title: 'Osimxon Dadaxanov — Portfolio',
  description: 'Portfolio of Osimxon Dadaxanov, a 14-year-old web developer building with React, Next.js and Node.js.',
};

export const viewport = {
  themeColor: '#0a0a0a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
