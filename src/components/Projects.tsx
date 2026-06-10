"use client";

import { useState } from "react";
import { ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import AnimatedContent from "./AnimatedContent";

export default function Projects() {
  const allProjects = [
    {
      title: "Expense Tracker",
      description: "A web-based expense tracking application designed to help users monitor their financial transactions and manage personal budgets efficiently.",
      tech: ["React", "Web App", "Frontend"],
      github: "https://github.com/comendadorchristianjohn-web",
      demo: "https://expense-tracker-six-delta-58.vercel.app",
      imageClass: "bg-gradient-to-br from-[#0f172a] to-[#1e293b]",
      image: "/expense_tracker.png",
      featured: true,
    },
    {
      title: "IoT Automated Pet Feeding Dispenser",
      description: "Designed and developed an automated feeding dispenser system for rescued dogs and cats using ESP32 and Raspberry Pi. Streamlines animal shelter caretaking processes and ensures scheduled feeding efficiency.",
      tech: ["ESP32", "Raspberry Pi", "IoT", "C++", "Hardware Integration"],
      github: "",
      demo: "",
      imageClass: "bg-gradient-to-br from-[#1c1c1c] to-[#383838]",
      image: "/pet_feeder.png",
      featured: true,
    },
    {
      title: "AutoCAD Process Engineering layouts",
      description: "Drafted process and electrical components conversion files to AutoCAD formats for industrial systems, ensuring 2D layouts conform to Yuanshan Electronics standards.",
      tech: ["AutoCAD", "CAD Drafting", "2D Layout", "Process Documentation"],
      github: "",
      demo: "",
      image: "/autocad.png",
      featured: true,
    },
    {
      title: "PC Part Configurator & Compatibility Engine",
      description: "A program developed in C++ to recommend computer parts and hardware configurations. Automates component alignment checks based on budget and user requirements.",
      tech: ["C++", "Data Processing", "Hardware Compatibility"],
      github: "",
      demo: "",
      imageClass: "bg-gradient-to-br from-[#2e2e2e] to-[#4f4f4f]",
      image: "/pc_configurator.jpg",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-black">
      {/* Background Glow */}
      <div className="absolute left-0 bottom-1/4 w-96 h-96 rounded-full bg-primary-glow blur-[120px] pointer-events-none" />

      {/* Starry background glowing dots */}
      <div className="star-glow animate-star-blink absolute top-1/4 left-[30%] w-1.5 h-1.5" style={{ animationDelay: "0.4s" }} />
      <div className="star-glow animate-star-blink absolute bottom-1/4 right-[25%] w-1 h-1" style={{ animationDelay: "1.4s" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <AnimatedContent distance={50} direction="vertical" duration={0.8}>
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:items-start items-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
              Featured <span className="text-gradient-silver">Projects</span>
            </h2>
            <p className="text-zinc-400 max-w-lg md:text-left text-center">
              A curated selection of applications and platforms I have architected, designed, and developed from the ground up.
            </p>
          </div>
        </div>
        </AnimatedContent>

        <AnimatedContent distance={50} direction="vertical" duration={0.8} delay={0.3}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {allProjects.map((project, index) => {
            const isLastOdd = index === allProjects.length - 1 && allProjects.length % 2 !== 0;
            const CardWrapper = project.demo ? "a" : "div";
            return (
              <CardWrapper
                href={project.demo ? project.demo : undefined}
                target={project.demo ? "_blank" : undefined}
                rel={project.demo ? "noopener noreferrer" : undefined}
                key={index}
                className={`glass glass-interactive rounded-2xl overflow-hidden flex flex-col group border border-white/5 w-full ${
                  isLastOdd ? "md:col-span-2 md:mx-auto md:w-[calc(50%-16px)]" : ""
                } block ${project.demo ? "cursor-pointer" : ""}`}
              >
                {/* Project Card Image */}
                <div className={`h-52 w-full relative overflow-hidden flex items-center justify-center ${project.imageClass || ""}`}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] transition-all duration-300 group-hover:bg-black/30" />
                  
                  {/* Tech Badges floating */}
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10">
                    {project.featured && (
                      <span className="text-[10px] font-semibold tracking-wider text-black bg-white px-2 py-1 rounded-full uppercase flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-current" />
                        Featured
                      </span>
                    )}
                  </div>

                  {!project.image && (
                    <div className="z-10 text-white font-extrabold text-2xl tracking-widest uppercase opacity-75 group-hover:scale-105 transition-transform duration-500 text-center px-4">
                      {project.title}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Tech Chip List */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardWrapper>
            );
          })}
        </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
