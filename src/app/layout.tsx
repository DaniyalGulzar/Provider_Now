'use client'; // This makes the component a Client Component
import { Open_Sans } from 'next/font/google';
import "./globals.css";
import "./myglobals.css";
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import useIdleLogout from '@/hook/useIdleLogout';

const openSans = Open_Sans({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useIdleLogout();  // Initialize the idle logout hook
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Toaster position="top-right" />
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
