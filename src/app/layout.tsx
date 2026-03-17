import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";

const ubuntu = Ubuntu({
  variable: "--font-ubuntu",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "KAFFA - Una Bebida de Bayas",
  description: "Disfruta de la auténtica bebida de bayas Kaffa Signature, café de especialidad y exquisitos desayunos en un ambiente premium.",
  keywords: ["Kaffa", "Bebida de Bayas", "Café de Especialidad", "Desayunos", "Maqui", "Chile"],
  openGraph: {
    title: "KAFFA - Una Bebida de Bayas",
    description: "Refrescante, intensa y a medida. Prueba nuestra Kaffa Signature y nuestra carta de especialidad.",
    url: "https://kaffa.cl",
    siteName: "KAFFA",
    images: [
      {
        url: "/assets/kaffa.jpeg",
        width: 1200,
        height: 630,
        alt: "KAFFA Signature Drink",
      },
    ],
    locale: "es_CL",
    type: "website",
  },
  icons: {
    icon: "/assets/kaffa logo.png",
    apple: "/assets/kaffa logo.png",
  },
};
 drum

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
