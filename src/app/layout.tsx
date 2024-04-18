import { ReactNode } from "react";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

const comfortaa = Comfortaa({ weight: ["400", "500"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fridgefy",
  description: "wad301-final-project-sunny-side-up",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={comfortaa.className}>
          {children}
          {modal}
          <div id="modal-root" />
        </body>
      </html>
    </ClerkProvider>
  );
}
