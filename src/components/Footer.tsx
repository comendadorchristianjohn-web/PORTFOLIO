"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5 relative z-10 bg-[#06030d]/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Branding */}
        <div>
          <span className="text-sm font-semibold text-white tracking-wide">
            Home
          </span>
        </div>

        {/* Center: Copyright */}
        <p className="text-xs text-zinc-500 text-center md:text-left order-2 md:order-none">
          &copy; {currentYear} COMENDADOR. All rights reserved. Crafted with Next.js & Tailwind CSS.
        </p>

        {/* Right: Scroll to top */}
        <button
          onClick={handleScrollTop}
          className="p-3 rounded-xl glass hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white transition-all duration-300 flex items-center justify-center cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </footer>
  );
}
