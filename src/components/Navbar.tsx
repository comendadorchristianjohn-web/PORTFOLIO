"use client";

import { useState, useEffect } from "react";
import { Menu, X, Home, Cpu, Briefcase, FolderOpen, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import GooeyNav from "./GooeyNav";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    {
      id: "home",
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      href: "#",
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" })
    },
    {
      id: "skills",
      icon: <Cpu className="w-5 h-5" />,
      label: "Skills",
      href: "#skills",
      onClick: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
    },
    {
      id: "experience",
      icon: <Briefcase className="w-5 h-5" />,
      label: "Experience",
      href: "#experience",
      onClick: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
    },
    {
      id: "projects",
      icon: <FolderOpen className="w-5 h-5" />,
      label: "Projects",
      href: "#projects",
      onClick: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
    },
    {
      id: "contact",
      icon: <Mail className="w-5 h-5" />,
      label: "Contact",
      href: "#contact",
      onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Handle transparent/solid navbar background
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Handle active navigation item based on scroll position
      const sections = navItems.map(item => item.id);
      let currentActiveIndex = 0;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        if (sectionId === "home") {
          // If we are at the top, home is active
          if (window.scrollY < 100) {
            currentActiveIndex = 0;
            break;
          }
          continue;
        }

        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Adjust the offset value (e.g., 200) based on your layout and preference
          if (rect.top <= 200) {
            currentActiveIndex = i;
            break;
          }
        }
      }

      setActiveIndex(currentActiveIndex);
    };

    window.addEventListener("scroll", handleScroll);
    // Call once initially to set the correct active index
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 glass border-b border-black/5 shadow-lg shadow-black/20"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-end">
        
        {/* Desktop Navigation & Socials on the Right */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          <GooeyNav items={navItems} activeIndex={activeIndex} />
          
          <div className="h-6 w-px bg-white/10" />

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/comendadorchristianjohn-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-black transition-colors duration-200"
              title="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/christian-john-comendador-a12b2534b/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-black transition-colors duration-200"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-600 hover:text-black focus:outline-none animate-pulse"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-xs glass border-l border-black/10 shadow-2xl p-8 flex flex-col justify-between transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-black">Navigation</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-zinc-600 hover:text-black"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation Icons */}
          <ul className="grid grid-cols-5 gap-2.5 py-3 px-2 bg-white/5 border border-black/10 rounded-2xl">
            {navItems.map((item, index) => (
              <li key={index} className="flex justify-center">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick();
                  }}
                  className={`p-3 bg-white/5 border rounded-xl hover:border-primary transition-all flex items-center justify-center w-full ${
                    activeIndex === index 
                      ? 'border-primary text-black' 
                      : 'border-black/5 text-zinc-700 hover:text-black'
                  }`}
                  title={item.label}
                >
                  {item.icon}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Social Icons */}
        <div className="flex flex-col gap-4">
          <div className="h-px bg-white/10 mb-2" />
          <div className="flex items-center justify-around">
            <a
              href="https://github.com/comendadorchristianjohn-web"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-black/10 rounded-full text-zinc-700 hover:text-black hover:border-primary transition-all"
              title="GitHub"
            >
              <GithubIcon className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/christian-john-comendador-a12b2534b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 border border-black/10 rounded-full text-zinc-700 hover:text-black hover:border-primary transition-all"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
