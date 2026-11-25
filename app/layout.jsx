import { Geist, Geist_Mono, Fraunces, Bebas_Neue, Space_Grotesk } from 'next/font/google';
import './globals.css';

// The site's own faces
const sans = Geist({ subsets: ['latin'], variable: '--font-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });

// Faces used only inside the generator's sample websites
const serif = Fraunces({ subsets: ['latin'], variable: '--font-serif' });
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' });

export const metadata = {
  title: 'Osimxon Dadaxanov — websites for small businesses, from $40',
  description:
    'Type your business name and see your website appear. Landing pages, business websites and web apps by a 14-year-old web developer.',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#0a0a0b',
};

// Sets the saved theme before the first paint, so a light-theme visitor never sees a dark flash.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  const fonts = [sans, mono, serif, bebas, grotesk].map((f) => f.variable).join(' ');
  return (
    <html lang="en" data-theme="dark" className={fonts} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
