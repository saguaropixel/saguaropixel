import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const nunito = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
  weight: '400'
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito-sans',
  weight: '600'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${nunitoSans.variable} antialiased font-nunito font-medium text-zinc-800`}
      >
       <main>
        <Header />
       {children}
       </main>
      </body>
    </html>
  );
}
