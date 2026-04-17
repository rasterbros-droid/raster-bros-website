import React, { useState, useEffect, useRef, useCallback } from "react";
import { useProjects } from "@/hooks/use-projects";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import ImageMarquee from "@/components/Marquee";
import LatestReleaseCarousel from "@/components/LatestReleaseCarousel";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  const servicesSectionRef = useRef<HTMLElement | null>(null);
  const [showCameraOverlay, setShowCameraOverlay] = useState(false);
  const [showFlash, setShowFlash] = useState(false);

  useEffect(() => {
    const section = servicesSectionRef.current;
    if (!section) return;

    let hasTriggered = false;
    const timers: number[] = [];

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || hasTriggered) return;

        hasTriggered = true;

        timers.push(
          window.setTimeout(() => {
            setShowCameraOverlay(true);
            setShowFlash(true);

            timers.push(
              window.setTimeout(() => {
                setShowFlash(false);
              }, 220),
            );

            timers.push(
              window.setTimeout(() => {
                setShowCameraOverlay(false);
              }, 1200),
            );
          }, 2000),
        );
      },
      { threshold: 0.45 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className="cursor-focus bg-background min-h-screen text-foreground selection:bg-white selection:text-black overflow-x-hidden">
      <Navigation />

      <Hero />

      {/* About Section */}
      <section
        id="studio"
        className="container mx-auto px-6 pt-20 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.03] to-transparent p-7 md:p-12">
          <div className="pointer-events-none absolute -top-24 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <span className="inline-flex rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm uppercase tracking-widest text-white/60">
                About Raster Bros
              </span>
            </div>
            <div className="md:col-span-8">
              <motion.p
                className="text-2xl md:text-4xl font-display font-light leading-tight mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                RasterBros is a creative film studio built by filmmakers with over
                a decade of real industry experience. <br />
                We create cinematic work across films, music videos,
                documentaries, and commercials — balancing emotion, precision, and
                modern workflows to deliver stories that last.
              </motion.p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <div className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm p-5">
                  <p className="text-white/70 leading-relaxed">
                    Every project begins with understanding the story — its purpose,
                    tone, and audience. Craft comes first. Technology supports the
                    process, never replaces it.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-black/40 backdrop-blur-sm p-5">
                  <p className="text-white/70 leading-relaxed">
                    Our journey spans feature films, web series, OTT content, music
                    videos, documentaries, and commercial productions — created in
                    collaboration with artists and production teams across India and
                    internationally.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-8 border-t border-white/10">
                {[
                  "If you value intention, collaboration, and long-term creative thinking, we’d love to hear from you.",
                ].map((service) => (
                  <motion.div
                    key={service}
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-sm uppercase tracking-wider text-white/65"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    {service}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Section */}
      {/*  {/* <section id="work" className="px-6 py-20">
        <div className="container mx-auto mb-16 flex justify-between items-end">
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Selected Work
          </h2>
          <span className="hidden md:inline-block text-white/40">
            {/* (2023 — 2024) */}
      {/* </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 container mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-white/5 rounded-sm mb-4" />
                <div className="h-6 w-2/3 bg-white/5 rounded mb-2" />
                <div className="h-4 w-1/3 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 container mx-auto">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </section> */}

      {/* Latest Releases - Carousel (below Selected Work) */}
      <section id="work" className="px-6 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto mb-8 md:mb-10 lg:mb-12">
          <h2 className="text-4xl md:text-6xl font-display font-bold">
            Latest Releases
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 container mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[3/4] bg-white/5 rounded-sm mb-4" />
                <div className="h-6 w-2/3 bg-white/5 rounded mb-2" />
                <div className="h-4 w-1/3 bg-white/5 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="container mx-auto px-0 md:px-6">
            {/* <ProjectsCarousel projects={projects || []} /> */}
            <LatestReleaseCarousel projects={projects || []} />
          </div>
        )}
      </section>

      {/* <Marquee /> */}
      <ImageMarquee />

      {/* Capabilities Section */}
      {/* <section className="container mx-auto px-6 py-32 border-t border-white/10" id="services">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h3 className="text-2xl font-display mb-8">Our Services</h3>
            <ul className="space-y-4">
              {[
                "Feature Movies",
                "Music Videos",
                "OTT Films",
                "Branded Commercials",
                "Web Series Production"
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between border-b border-white/10 pb-4 group cursor-default"
                >
                  <span className="text-xl text-white/60 group-hover:text-white transition-colors">
                    {item}
                  </span>
                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-square md:aspect-auto bg-white/5 overflow-hidden hidden sm:block ">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-purple-900/40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-9xl text-white/5 font-bold rotate-90 md:rotate-0">
                SERVICES
              </span>
            </div>
          </div>
        </div>
      </section> */}

      {/* Capabilities Section */}
      <section
        className="mx-auto max-w-5xl px-6 py-12 md:py-16 lg:py-20 border-t border-white/10"
        id="services"
        ref={servicesSectionRef}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h3 className="text-2xl font-display mb-8">Our Services</h3>

            <ul className="space-y-4">
              {[
                "Feature Movies",
                "Music Videos",
                "OTT Films",
                "Branded Commercials",
                "Web Series Production",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between border-b border-white/10 pb-4 group cursor-default"
                >
                  <span className="text-xl text-white/60 group-hover:text-white transition-colors">
                    {item}
                  </span>

                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT VISUAL (HIDDEN ON MOBILE) */}
          <div className="relative hidden md:flex items-center justify-end h-full">
            <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/10 bg-white/10">
              <img
                // src="https://images.unsplash.com/photo-1553166272-e69910ab5ae1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                src="/service_image/service_image.jpg"
                alt="Film Production"
                className="w-full h-full object-fill"
              />

              {showCameraOverlay && (
                <div className="absolute inset-0 z-20 grid place-items-center bg-black/70">
                  <img
                    src="/camera.svg"
                    alt="Camera click"
                    className="h-24 w-24 animate-pulse"
                  />
                </div>
              )}

              {showFlash && (
                <div className="absolute inset-0 z-30 bg-white animate-ping" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer id="contact" className="bg-white text-black py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-bold leading-none mb-8 tracking-tighter">
                LET'S WORK
                <br />
                TOGETHER
              </h2>
              <a
                href="mailto:hello@rasterbros.com"
                className="inline-block text-xl border-b border-black/20 pb-1 hover:border-black transition-colors"
              >
                rasterbros@gmail.com
              </a>
            </div>
            <div className="flex flex-col justify-end items-start md:items-end">
              <div className="space-y-2 text-right">
                <p>Raster Bros Creative Studio</p>
                <p>Available Worldwide</p>
                <p>+91 9149613372</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/10 text-sm opacity-60">
            <p>&copy; 2026 Raster Bros. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://www.instagram.com/rasterbros?igsh=ZHFxNWoxYWRuMXln" target="blank" className="hover:text-black transition-colors cursor-pointer">
                Instagram
              </a>
              <a href="#" className="hover:text-black transition-colors cursor-pointer">
                Twitter
              </a>
              <a href="#" className="hover:text-black transition-colors cursor-pointer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer> */}

      <footer
        id="contact"
        className="bg-white text-black py-12 md:py-16 lg:py-20 px-6"
      >
        <div className="container mx-auto max-w-7xl">
          {/* TOP GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 border-b border-black/10 pb-10 md:pb-16">
            {/* LEFT — Brand */}
            <div className="min-w-0">
              <h2 className="text-4xl sm:text-5xl md:text-4xl lg:text-6xl font-display font-bold leading-tight   tracking-tight break-words">
                RasterBros
              </h2>

              <p className="text-black/60 leading-relaxed max-w-md mt-6">
                A creative film studio crafting cinematic stories through
                intent, craft, and evolving workflows.
              </p>

              <p className="italic text-lg md:text-xl text-black/80 mt-6">
                Turning Vision Into Pixels.
              </p>
            </div>

            {/* CENTER — Navigation */}
            <div className="lg:pl-12 lg:border-l border-black/10">
              <ul className="space-y-3 text-black/70 text-sm md:text-base">
                {[
                  { label: "Home", target: "#" },
                  { label: "About", target: "#studio" },
                  { label: "Work", target: "#work" },
                  { label: "Process", target: "#services" },
                  { label: "Services", target: "#services" },
                  { label: "Contact", target: "#contact" },
                ].map((item, i) => (
                  <li key={i}>
                    <a
                      href={item.target}
                      className="hover:text-black transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        const el = document.querySelector(item.target);
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — CTA + Social */}
            <div className="lg:pl-12 lg:border-l border-black/10">
              <h4 className="text-lg md:text-xl italic mb-6 text-black/90">
                Let's Work Together
              </h4>

              <a
                href="mailto:rasterbros@gmail.com"
                className="inline-block px-6 py-3 rounded-lg bg-black/10 hover:bg-black/20 transition mb-8 text-sm md:text-base"
              >
                Start a Conversation
              </a>

              <div className="space-y-2 text-black/70 text-sm md:text-base">
                <a
                  href="https://www.instagram.com/rasterbros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-black"
                >
                  Instagram
                </a>
                <a
                  href="https://www.youtube.com/@RasterBros"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-black"
                >
                  YouTube
                </a>
                <a
                  href="https://www.linkedin.com/company/rasterbros/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-black"
                >
                  LinkedIn
                </a>
              </div>

              <p className="mt-6 text-black/40 text-sm">Available worldwide</p>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 text-xs md:text-sm opacity-60">
            <p>
              &copy; RasterBros Private Limited, 2026 — All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* <footer id="contact" className="bg-[#0b0f1a] text-white py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-16 border-b border-white/10 pb-16">
            <div>
              <h3 className="text-3xl font-semibold mb-6">RasterBros</h3>

              <p className="text-white/60 leading-relaxed max-w-md mb-6">
                A creative film studio crafting cinematic stories through intent,
                craft, and evolving workflows.
              </p>

              <p className="italic text-xl text-white/80">
                Turning Vision Into Pixels.
              </p>
            </div>

            <div className="md:pl-12 border-l border-white/10">
              <ul className="space-y-3 text-white/70">
                <li><a href="/" className="hover:text-white transition">Home</a></li>
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Work</a></li>
                <li><a href="#" className="hover:text-white transition">Process</a></li>
                <li><a href="#" className="hover:text-white transition">Services</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>


            <div className="md:pl-12 border-l border-white/10">

              <h4 className="text-xl italic mb-6 text-white/90">
                Let's Work Together
              </h4>

              <a
                href="mailto:rasterbros@gmail.com"
                className="
            inline-block
            px-6 py-3
            rounded-lg
            bg-white/10
            hover:bg-white/20
            transition
            mb-8
          "
              >
                Start a Conversation
              </a>

              <div className="space-y-2 text-white/70">
                <a href="https://www.instagram.com/rasterbros" target="_blank" className="block hover:text-white">Instagram</a>
                <a href="https://www.youtube.com/@RasterBros" target="_blank" className="block hover:text-white">YouTube</a>
                <a href="#" className="block hover:text-white">Vimeo</a>
                <a href="#" className="block hover:text-white">LinkedIn</a>
              </div>

              <p className="mt-6 text-white/40 text-sm">
                Available worldwide
              </p>

            </div>
          </div>
          <div className="pt-8 text-white/40 text-sm">
            © RasterBros Private Limited, 2026 — All rights reserved.
          </div>

        </div>
      </footer> */}
    </div>
  );
}
