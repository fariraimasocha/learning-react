import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/Components/ui/sonner';
import QueryProvider from '@/Components/providers/query-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'learning-react',
  description: 'The Wondabox AI APP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <QueryProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>{children}</main>
          <Toaster />
        </body>
      </QueryProvider>
    </html>
  );
}
