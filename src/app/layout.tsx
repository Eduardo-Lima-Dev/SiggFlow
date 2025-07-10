import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiggFlow - Sistema de Gestão Acadêmica",
  description: "Sistema de cadastro e gestão de alunos",
  openGraph: {
    title: 'SiggFlow - Sistema de Gestão Acadêmica',
    description: 'Sistema moderno para cadastro, acompanhamento e gestão acadêmica de alunos e disciplinas.',
    url: 'https://siggflow.seusite.com',
    siteName: 'SiggFlow',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Logo SiggFlow',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SiggFlow - Sistema de Gestão Acadêmica',
    description: 'Sistema moderno para cadastro, acompanhamento e gestão acadêmica de alunos e disciplinas.',
    site: '@siggflow',
    images: ['/logo.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (session?.user && (session.user as any).completedOnboarding === false && typeof window !== 'undefined' && window.location.pathname !== '/progresso') {
    redirect("/progresso");
  }
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Equipe SiggFlow" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SiggFlow',
          url: 'https://siggflow.seusite.com',
          logo: 'https://siggflow.seusite.com/logo.png',
          description: 'Sistema moderno para cadastro, acompanhamento e gestão acadêmica de alunos e disciplinas.'
        }) }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <main>
          {children}
        </main>
        <footer className="text-center text-xs text-slate-300 py-4 bg-slate-900">
          © {new Date().getFullYear()} SiggFlow. Todos os direitos reservados.
        </footer>
        <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
