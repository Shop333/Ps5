import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import Provider supaya keranjang belanja berfungsi
import { CartProvider } from "@/context/CartContext"; 

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap', // Mempercepat rendering font
});

export const metadata: Metadata = {
  title: "PS STORE JEMBRANA | Premium Catalog",
  description: "Katalog Digital PlayStation & Gear Terlengkap di Jembrana, Bali",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1", // Optimasi mobile
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-mesh min-h-screen relative overflow-x-hidden antialiased selection:bg-blue-500/30">
        
        {/* Dekorasi Aura PlayStation (High-End Glow) */}
        <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/15 blur-[140px] pointer-events-none z-0 animate-pulse" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-ps-blue/20 blur-[140px] pointer-events-none z-0" />
        
        {/* Container Utama dengan CartProvider */}
        <CartProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
        </CartProvider>

        {/* Efek Grain/Noise halus untuk kesan tekstur mahal (Opsional) */}
        <div className="fixed inset-0 opacity-[0.02] pointer-events-none z-[99] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        
      </body>
    </html>
  );
}
