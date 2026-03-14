import "./globals.css";
import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Fardeen Qamar | Full Stack Developer",
  description: "Portfolio of Fardeen Qamar — Full Stack Developer & Programmer",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Animated background layers */}
        <div className="mesh-bg" />
        <div className="grain" />

        {/* Custom cursor (desktop only) */}
        <CustomCursor />

        {/* Sticky navbar */}
        <header style={{ position: "sticky", top: 0, zIndex: 50 }}>
          <NavBar />
        </header>

        {/* Page content */}
        <main style={{ position: "relative", zIndex: 2 }}>{children}</main>

        {/* Portal mount for modals */}
        <div id="overlays" />
      </body>
    </html>
  );
}
