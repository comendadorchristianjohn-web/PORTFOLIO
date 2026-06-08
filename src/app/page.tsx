import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Chatbot from "@/components/Chatbot";


export default function Home() {
  return (
    <>
      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-grow flex flex-col">
        {/* Hero Landing */}
        <Hero />

        {/* Technical Skills */}
        <section id="about">
          <Skills />
        </section>

        {/* Work & Education Timeline */}
        <Experience />

        {/* Project Showcase */}
        <Projects />

        {/* Contact Form */}
        <Contact />
      </main>

      {/* AI Chatbot */}
      <Chatbot />
    </>
  );
}

