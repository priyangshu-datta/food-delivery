import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart";
import { CustomerProvider } from "@/context/customer";
import { Toaster } from "react-hot-toast";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'FoodDelivery - Order Delicious Food Online',
  description: 'Delicious food delivered right to your doorstep. Browse our menu and order your favorite meals with just a few clicks.',
  icons: {
    icon: "/icon"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="food-delivery-theme"
        >
          <CartProvider>
            <CustomerProvider>
              <Header />
              <main
                className="
                min-h-screen
                bg-linear-to-br
                from-blue-100 via-white to-purple-100
                dark:from-slate-950
                dark:via-slate-900
                dark:to-indigo-950
              "
              >
                {children}
              </main>

              <Toaster />
            </CustomerProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
