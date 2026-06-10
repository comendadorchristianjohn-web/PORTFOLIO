"use client";

import { 
  Terminal, 
  Layout, 
  Database, 
  Settings, 
  Cpu, 
  Globe 
} from "lucide-react";
import LogoLoop, { LogoItem } from "./LogoLoop";
import AnimatedContent from "./AnimatedContent";

export default function Skills() {
  const skillCategories = [
    {
      title: "Electronics & IoT",
      icon: <Cpu className="w-6 h-6 text-primary" />,
      skills: ["ESP32", "Raspberry Pi", "Internet of Things", "Embedded Systems", "Hardware Integration", "System Connectivity"],
    },
    {
      title: "AutoCAD & Drafting",
      icon: <Layout className="w-6 h-6 text-secondary" />,
      skills: ["AutoCAD Skills", "Computer-Aided Design", "Technical Drafting", "2D Layout", "Documentation Standards"],
    },
    {
      title: "Networking & IT",
      icon: <Globe className="w-6 h-6 text-accent" />,
      skills: ["Network Troubleshooting", "Basic Networking", "Switch Installation", "Network Cable Setup", "Hardware Integration"],
    },
    {
      title: "Programming & Tools",
      icon: <Terminal className="w-6 h-6 text-accent" />,
      skills: ["C++", "Python (Basic)", "HTML (Basic)", "CSS (Basic)", "VS Code", "Figma"],
    },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary-glow blur-[120px] pointer-events-none" />

      {/* Starry background glowing dots */}
      <div className="star-glow animate-star-blink absolute top-1/4 right-[12%] w-1 h-1" style={{ animationDelay: "0.2s" }} />
      <div className="star-glow animate-star-blink absolute bottom-1/4 left-[8%] w-1.5 h-1.5" style={{ animationDelay: "1.2s" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8}>
        {/* Section Title */}
        <div className="text-center md:text-left mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            Technical <span className="text-gradient-silver">Expertise</span>
          </h2>
          <p className="text-zinc-400 max-w-lg">
            A comprehensive set of hardware, electronics, networking, AutoCAD design, and programming capabilities.
          </p>
        </div>

        {/* Skills Animation Loops */}
        <div className="flex flex-col gap-6 w-full relative pt-4 pb-16">
          {(() => {
            const logoItems: LogoItem[] = skillCategories.flatMap((category) =>
              category.skills.map((skill) => ({
                node: (
                  <div className="text-sm font-medium px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-zinc-300 shadow-md flex items-center gap-3 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-default backdrop-blur-sm">
                    <div className="opacity-80 scale-90">{category.icon}</div>
                    {skill}
                  </div>
                ),
              }))
            );

            const half = Math.ceil(logoItems.length / 2);
            const row1 = logoItems.slice(0, half);
            const row2 = logoItems.slice(half);

            return (
              <>
                <LogoLoop 
                  logos={row1} 
                  direction="left" 
                  speed={40} 
                  logoHeight={50}
                  pauseOnHover={true}
                  gap={24}
                  fadeOut={true}
                  fadeOutColor="#000000"
                />
                <LogoLoop 
                  logos={row2} 
                  direction="right" 
                  speed={40} 
                  logoHeight={50}
                  pauseOnHover={true}
                  gap={24}
                  fadeOut={true}
                  fadeOutColor="#000000"
                />
              </>
            );
          })()}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="glass glass-interactive rounded-2xl p-6 flex flex-col gap-6"
            >
              <div className="flex items-center gap-3 border-b border-white/5 pb-4">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {category.icon}
                </div>
                <h3 className="font-bold text-white tracking-wide text-lg">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-zinc-300 hover:text-white hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extra details strip */}
        <div className="mt-12 p-6 glass rounded-2xl border border-white/5 flex items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-secondary/10 text-secondary hidden md:block">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-semibold text-white text-base">Academic Excellence</h4>
              <p className="text-sm text-zinc-400">Bachelor of Science in Computer Engineering. Multi-year Dean's Lister (2022, 2023).</p>
            </div>
          </div>
        </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
