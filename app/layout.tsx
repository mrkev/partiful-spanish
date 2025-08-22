import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type React from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GPI",
  description: "Invitaciones para que tus eventos se armen",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Qwitcher+Grypen:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className={inter.className}>
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
