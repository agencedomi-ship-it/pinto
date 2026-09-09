import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyCallBar } from "./StickyCallBar";
import { PhoneProvider } from "@/lib/phone";
import type { Phone } from "@/data/zones";

export function PageLayout({ children, phone }: { children: ReactNode; phone?: Phone }) {
  return (
    <PhoneProvider phone={phone}>
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24">{children}</main>
      <Footer />
      <StickyCallBar />
    </div>
    </PhoneProvider>
  );
}
