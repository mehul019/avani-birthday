import "./styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Happy Birthday Avani 💝",
  description: "A special romantic birthday site for my Avani from Mehul 💕.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
