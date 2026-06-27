import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyCallBar } from "./StickyCallBar";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-24">{children}</main>
      <Footer />
      <StickyCallBar />
    </div>
  );
}
