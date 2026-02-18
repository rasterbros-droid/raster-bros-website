import React from "react";
import dynamic from "next/dynamic";

const Navigation = dynamic(
  () => import("../src/components/Navigation").then((mod) => mod.Navigation),
  { ssr: false }
);

export default function JoinInternship() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero */}
      <header
        className="pt-28 pb-16 bg-cover bg-center relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&h=1200&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative container mx-auto px-6 text-center">
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wide uppercase">
            Not a classroom.
            <br />
            A working studio.
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-sm sm:text-base text-white/80">
            Hands-on internships inside a professional film & entertainment studio.
            Small batches. Real exposure. Clear ethics.
          </p>

          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <a href="#manifesto" className="px-6 py-3 border border-white/20 text-white rounded-md hover:opacity-90 transition">
              Read the manifesto
            </a>

            <a
              href="#apply"
              className="px-6 py-3 bg-orange-500 text-black rounded-md font-semibold hover:opacity-90 transition"
            >
              Apply for internship
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <section id="what-this-is" className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-wide uppercase">
            What this is
          </h2>
          <p className="mt-4 text-white/80">
            Understand how real studio work happens—on set and in post-production.
            Presence, discipline, and responsibility inside a working environment.
          </p>
        </section>

        <hr className="my-10 border-white/10" />

        <section id="how-it-works" className="">
          <h3 className="font-display text-xl uppercase text-center font-semibold tracking-wide">
            How it works
          </h3>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/90">
                    <path d="M8 6L16 12L8 18V6Z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <p className="uppercase text-xs text-white/60">Discover →</p>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 justify-center md:justify-center">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
                <p className="uppercase text-xs text-white/60">Apply →</p>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-4 justify-center md:justify-end">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="2" fill="currentColor" />
                    <path d="M6 20c0-3.333 2.667-6 6-6s6 2.667 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="uppercase text-xs text-white/60">Selected →</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="my-10 border-white/10" />

        <section id="details" className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-display font-semibold uppercase">This internship is for:</h4>
            <ul className="mt-4 list-disc list-inside text-white/80 space-y-2">
              <li>Film & media students</li>
              <li>Curious self-taught filmmakers</li>
              <li>Students serious about discipline</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold uppercase">This is not for:</h4>
            <ul className="mt-4 list-disc list-inside text-white/80 space-y-2">
              <li>Guaranteed job seekers</li>
              <li>Certificate collectors</li>
              <li>Casual hobby interest</li>
            </ul>
          </div>
        </section>

        <hr className="my-10 border-white/10" />

        <section className="text-center max-w-2xl mx-auto">
          <h4 className="font-display text-xl font-semibold uppercase">Structure</h4>
          <p className="mt-3 text-white/80">Duration: 2–6 weeks | Batch Size: 2–4 interns per cycle</p>

          <div className="mt-6 space-y-1 text-white/80">
            <p>Direction & Production</p>
            <p>Cinematography</p>
            <p>Editing & Post</p>
            <p>Design & Motion</p>
            <p>Sound</p>
          </div>
        </section>

        <hr className="my-10 border-white/10" />

        <section className="max-w-3xl mx-auto text-center">
          <h4 className="font-display text-xl font-semibold uppercase">Pay & Ethics</h4>
          <p className="mt-3 text-white/80">Learning-focused internships may be unpaid. Billable work is paid. Credits provided where applicable.</p>
        </section>

        <hr className="my-10 border-white/10" />

        <section className="text-center">
          <h4 className="font-display text-xl font-semibold uppercase">For Parents & Colleges</h4>
          <div className="mt-6">
            <a
              href="/parent-guide.pdf"
              className="inline-block px-6 py-3 bg-orange-500 text-black rounded-md font-semibold"
            >
              Download parent guide (PDF)
            </a>
          </div>
        </section>

        <div className="h-32" />
      </main>
    </div>
  );
}
