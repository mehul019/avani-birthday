import "./styles/globals.css";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: "Happy Birthday Avani ❤️",
  description: "A special romantic birthday site for Avani 💌",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body
        style={{
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "'Playfair Display', serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
