"use client";

import Image from "next/image";
import AnimatedContent from "./AnimatedContent";

export default function Resume() {
  return (
    <section className="py-24 bg-zinc-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <AnimatedContent distance={40} direction="vertical" reverse={false}>
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
              My Resume
            </h2>
            <div className="w-20 h-1 bg-primary mb-6" />
            <p className="text-zinc-600 max-w-2xl text-lg">
              A quick look at my professional experience, education, and skills.
            </p>
          </div>
        </AnimatedContent>

        {/* Resume Content */}
        <div className="flex flex-col gap-12 max-w-4xl mx-auto">
          {/* Page 1 */}
          <AnimatedContent distance={40} direction="vertical" reverse={false}>
            <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 shadow-2xl bg-white p-2">
              <div className="relative w-full aspect-[1/1.414]">
                <Image
                  src="/resume1.png"
                  alt="Resume Page 1"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            </div>
          </AnimatedContent>

          {/* Page 2 */}
          <AnimatedContent distance={40} direction="vertical" reverse={false}>
            <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 shadow-2xl bg-white p-2">
              <div className="relative w-full aspect-[1/1.414]">
                <Image
                  src="/resume2.png"
                  alt="Resume Page 2"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            </div>
          </AnimatedContent>

          {/* Download Buttons */}
          <AnimatedContent distance={40} direction="vertical" reverse={false}>
            <div className="flex justify-center mt-8">
              <a
                href="/resume1.png"
                download="Christian_John_Comendador_Resume.png"
                className="px-8 py-4 bg-black text-white rounded-full font-semibold uppercase tracking-widest text-sm hover:bg-black/80 transition-colors shadow-lg hover:shadow-xl"
              >
                Download Resume
              </a>
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
