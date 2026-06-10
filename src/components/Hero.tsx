"use client";

import { ChevronDown } from "lucide-react";
import Lanyard from "./Lanyard";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-black">

      {/* Starry background glowing dots */}
      <div className="star-glow animate-star-blink absolute top-1/4 left-[15%] w-1.5 h-1.5" style={{ animationDelay: "0s" }} />
      <div className="star-glow animate-star-blink absolute top-1/3 left-[45%] w-1 h-1" style={{ animationDelay: "1s" }} />
      <div className="star-glow animate-star-blink absolute top-[70%] left-[8%] w-1 h-1" style={{ animationDelay: "0.5s" }} />
      <div className="star-glow animate-star-blink absolute top-[80%] left-[38%] w-1.5 h-1.5" style={{ animationDelay: "2s" }} />
      <div className="star-glow animate-star-blink absolute top-[20%] right-[35%] w-1 h-1" style={{ animationDelay: "1.5s" }} />
      <div className="star-glow animate-star-blink absolute top-[60%] right-[40%] w-1.5 h-1.5" style={{ animationDelay: "2.5s" }} />
      <div className="star-glow animate-star-blink absolute bottom-[15%] right-[10%] w-1 h-1" style={{ animationDelay: "0.8s" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Side Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Computer Engineer
          </div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-4 leading-none">
            Hi!, I'm <span className="text-gradient-silver">CJ</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base max-w-lg leading-relaxed mb-8 font-light">
            <span className="text-primary font-medium tracking-wide uppercase">Computer Engineering Graduate & Developer</span> — I specialize in intelligent hardware integrations, responsive IoT systems, and CAD layouts. Blending technical engineering skills with active troubleshooting and development.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="border border-white/40 rounded-full px-8 py-3 text-xs tracking-wider uppercase font-semibold text-white hover:border-primary hover:bg-primary/5 transition-all duration-300 text-center flex-grow sm:flex-grow-0"
            >
              Explore Work
            </a>
            <a
              href="#contact"
              className="border border-white/40 rounded-full px-8 py-3 text-xs tracking-wider uppercase font-semibold text-white hover:border-primary hover:bg-primary/5 transition-all duration-300 text-center flex-grow sm:flex-grow-0"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Side — Holographic ProfileCard */}
        <div className="lg:col-span-6 relative flex items-center justify-center h-[500px] sm:h-[620px] lg:h-[80vh] w-full">

          {/* Diagonal structural lines texture */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[90%] h-[80%] diagonal-lines rounded-2xl opacity-60 pointer-events-none" />

          <Lanyard />
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors duration-300">
        <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>

    </section>
  );
}
