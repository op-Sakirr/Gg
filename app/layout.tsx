import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'EstateShare',
  description: 'A tool for sharing real estate property details via Base64 encoded URLs and WhatsApp.',
  openGraph: {
    title: 'EstateShare',
    description: 'A tool for sharing real estate property details via Base64 encoded URLs and WhatsApp.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EstateShare',
    description: 'A tool for sharing real estate property details via Base64 encoded URLs and WhatsApp.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
