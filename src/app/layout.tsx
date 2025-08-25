import { Header } from '@/components/Header';
import { Nunito_Sans, Tiny5 } from 'next/font/google';
import './globals.css';

const tiny5 = Tiny5({
  weight: '400', // Tiny5 is display-only, has single weight
  subsets: ['latin'],
  variable: '--font-tiny5',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${tiny5.variable} ${nunitoSans.variable} antialiased font-nunito font-medium text-zinc-800`}
      >
        <main>
          <Header />
          {/* <Providers> */}
          {children}
          {/* </Providers> */}
        </main>
      </body>
    </html>
  );
}
