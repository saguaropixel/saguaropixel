import Footer from '@/components/Footer';
import { Header } from '@/components/Header';
import { createClient } from '@/prismicio';
import { Jersey_25, Nunito_Sans, Tiny5 } from 'next/font/google';
import './globals.css';

const tiny5 = Tiny5({
  weight: '400', // Tiny5 is display-only, has single weight
  subsets: ['latin'],
  variable: '--font-tiny5',
});

const jersey = Jersey_25({
  weight: '400', // Tiny5 is display-only, has single weight
  subsets: ['latin'],
  variable: '--font-jersey',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createClient();
  const footer = await client.getSingle('footer', {
    fetchOptions: { next: { tags: ['footer'] } },
  });

  return (
    <html lang="en" className="h-full">
      <body
        className={`${jersey.variable} ${nunitoSans.variable} antialiased font-nunito font-medium text-zinc-800`}
      >
        <main>
          <Header />
          {/* <Providers> */}
          {children}
          <Footer data={footer} />
          {/* </Providers> */}
        </main>
      </body>
    </html>
  );
}
