"use client";

import { Briefcase, GraduationCap, Award, BookOpen } from "lucide-react";
import SplitText from "./SplitText";
import AnimatedContent from "./AnimatedContent";

export default function Experience() {
  const workExp = [
    {
      role: "Process Engineer Internship",
      company: "Yuanshan Electronics Philippines Inc.",
      duration: "Mar 2026 - Apr 2026",
      tasks: [
        "Assisted in converting engineering and layout files to AutoCAD formats while ensuring accuracy, consistency, and proper layout standards.",
        "Measured transformer wires and recorded details of each production process, including step timings.",
        "Prepared detailed standard work instructions for each transformer production stage based on corporate procedures.",
      ],
    },
    {
      role: "Computer Parts Sales Associate",
      company: "Retail Services",
      duration: "Apr 2025 - Jul 2025",
      tasks: [
        "Assisted clients and provided advice on compatibility of computer parts and configurations matching their budget.",
        "Updated sales and inventory tracking records to ensure correct transaction documentation.",
        "Recommended compatible computer parts and configurations based on customer requirements.",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Computer Engineering",
      institution: "College & University Systems",
      date: "Graduated June 2026",
      details: ["Dean's lister (1st year, 2022)", "Dean's lister (2nd year, 2023)"],
    },
  ];

  const certifications = [
    {
      name: "Network Addressing and Basic Troubleshooting",
      issuer: "Cisco Networking Academy",
      badge: "/cisco_badge.png",
      link: "/certificate_cisco.jpg",
    },
    {
      name: "Understanding the Risks and Ethics of AI",
      issuer: "YOUR FEED YOUR RESPONSIBILITY Webinar",
      link: "/certificate_ai_ethics.png",
    },
    {
      name: "Mastering GMAIL: Tips and Tricks for Efficient Email Management",
      issuer: "PCU-D COI Computer Society",
      link: "/certificate_gmail.png",
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-black">
      {/* Background Glow orb */}
      <div className="absolute left-0 top-1/3 w-80 h-80 rounded-full bg-primary-glow blur-[100px] pointer-events-none" />

      {/* Starry background glowing dots */}
      <div className="star-glow animate-star-blink absolute top-1/3 left-[20%] w-1.5 h-1.5" style={{ animationDelay: "0.6s" }} />
      <div className="star-glow animate-star-blink absolute bottom-1/3 right-[15%] w-1 h-1" style={{ animationDelay: "1.6s" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <AnimatedContent distance={50} direction="vertical" reverse={false} duration={0.8} delay={0.2}>
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16 flex flex-col md:items-start items-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 flex gap-2 flex-wrap justify-center md:justify-start">
            <SplitText text="Experience &" tag="span" /> <SplitText text="Education" className="text-gradient-silver" tag="span" delay={60} />
          </h2>
          <div className="text-zinc-400 max-w-lg md:text-left text-center">
            <SplitText 
              text="My professional internships, academic history, and technical achievements." 
              tag="p" 
              splitType="words" 
              delay={30} 
              textAlign="inherit"
            />
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Work Experience Column */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 border border-primary/20 text-primary rounded-xl">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white tracking-wide">Work History</h3>
            </div>

            <div className="flex flex-col gap-6 pl-2 border-l border-white/5 relative">
              {workExp.map((exp, idx) => (
                <div key={idx} className="relative pl-6 pb-2 group">
                  {/* Timeline Dot */}
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                  
                  <div className="glass rounded-xl p-6 border border-white/5 hover:border-primary/25 transition-colors duration-300">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                      {exp.duration}
                    </span>
                    <h4 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-sm text-zinc-400 font-medium mb-4">{exp.company}</p>
                    
                    <ul className="flex flex-col gap-2 list-disc pl-4 text-xs text-zinc-400 leading-relaxed">
                      {exp.tasks.map((task, tidx) => (
                        <li key={tidx}>{task}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Credentials Column */}
          <div className="flex flex-col gap-8">
            {/* Education Card */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-secondary/10 border border-secondary/20 text-secondary rounded-xl">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">Education</h3>
              </div>

              <div className="flex flex-col gap-6 pl-2 border-l border-white/5 relative">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 pb-2 group">
                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-secondary group-hover:scale-125 transition-transform" />
                    
                    <div className="glass rounded-xl p-6 border border-white/5 hover:border-secondary/25 transition-colors duration-300">
                      <span className="text-xs font-semibold text-secondary uppercase tracking-wider block mb-1">
                        {edu.date}
                      </span>
                      <h4 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-zinc-400 font-medium mb-3">{edu.institution}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {edu.details.map((detail, didx) => (
                          <span 
                            key={didx} 
                            className="text-[10px] font-semibold tracking-wider text-black bg-white/90 px-2 py-0.5 rounded uppercase"
                          >
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Card */}
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-accent/10 border border-accent/20 text-accent rounded-xl">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-wide">Certificates</h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {certifications.map((cert, idx) => {
                  const CardContent = (
                    <>
                      {cert.badge ? (
                        <img 
                          src={cert.badge} 
                          alt={`${cert.name} Badge`} 
                          className="w-10 h-10 object-contain flex-shrink-0 rounded-md"
                        />
                      ) : (
                        <BookOpen className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <h4 className="text-sm font-bold text-white">{cert.name}</h4>
                        <p className="text-xs text-zinc-500 mt-1">{cert.issuer}</p>
                      </div>
                    </>
                  );

                  const cardClass = "glass rounded-xl p-5 border border-white/5 hover:border-accent/20 transition-all duration-300 flex gap-4 items-center text-left w-full";

                  if (cert.link) {
                    return (
                      <a
                        key={idx}
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${cardClass} hover:bg-white/5 hover:scale-[1.01] cursor-pointer`}
                      >
                        {CardContent}
                      </a>
                    );
                  }

                  return (
                    <div key={idx} className={cardClass}>
                      {CardContent}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
