"use client";

import React, { useState } from "react";
import Head from "next/head";
import { Search, FileText, CheckCircle, Users, LogIn, Eye, Award, ArrowRight, ArrowDown } from "lucide-react";
import ApplicationFormModal from "../src/components/ApplicationFormModal"; // Adjust path if needed
import { Navigation } from "../src/components/Navigation";

const PAGE_TITLE = "Internships | RasterBros";
const PAGE_DESCRIPTION =
  "Hands-on internships inside a professional film & entertainment studio. Small batches, real exposure, clear ethics.";

export default function JoinInternship() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#0b0f16] text-white font-sans">
      <Head>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href="https://www.rasterbros.com/join-internship" />
      </Head>
      <Navigation />

      {/* HERO */}
      <header
        className="relative min-h-[65vh] md:min-h-[75vh] flex items-center justify-center bg-cover bg-center bg-no-repeat px-5 sm:px-8"
        style={{
          backgroundImage:
            "url('https://pub-7b63f90a5dc84c2eb2eb99e09a79f1bf.r2.dev/RasterBros%20Website/Internship-System/Background%20Images/Webp/1.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 text-center max-w-4xl mx-auto py-10 md:py-14">
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold uppercase tracking-wide leading-tight drop-shadow-xl">
            NOT A CLASSROOM. <br />
            A WORKING STUDIO.
          </h1>

          <p className="mt-4 sm:mt-5 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white/85 font-light">
            Hands-on internships inside a professional film & entertainment studio.
            Small batches. Real exposure. Clear ethics.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5">
            <a
              href="/pdf/RasterBros_Internship_Manifesto.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 border border-white/50 text-sm sm:text-base uppercase tracking-wider font-medium hover:bg-white/20 hover:shadow-lg transition-all duration-300 rounded-md transform hover:scale-105"
            >
              Read the Manifesto
            </a>

            {/* Apply Button → opens modal */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-7 py-3 bg-orange-600 hover:bg-orange-500 text-black font-semibold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl rounded-md transform hover:scale-105"
            >
              Apply for Internship
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-5 sm:px-8 lg:px-12 py-12 lg:py-16 max-w-6xl">
        {/* WHAT THIS IS */}
        <section className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-widest">
            WHAT THIS IS
          </h2>
          <p className="mt-5 text-base sm:text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Understand how real studio work happens—on set and in post-production.
            <br className="hidden sm:block" />
            Presence, discipline, and responsibility inside a working environment.
          </p>
        </section>

        <div className="my-10 lg:my-14 border-t border-white/10" />

        {/* HOW IT WORKS */}
        <section className="py-10 lg:py-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-[0.08em] text-center mb-10 lg:mb-16 text-white">
            HOW IT WORKS
          </h2>

          <div className="relative max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
            {/* Desktop horizontal connecting line – now precisely aligned with icon centers */}
            <div className="hidden md:block absolute inset-x-0 top-[45px] h-px bg-gradient-to-r from-transparent via-neutral-600/70 to-transparent pointer-events-none z-0" />
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-7 gap-x-4 gap-y-12 md:gap-y-0 relative z-10">
              {[
                { icon: Search, label: "DISCOVER" },
                { icon: FileText, label: "APPLY" },
                { icon: CheckCircle, label: "SELECTED" },
                { icon: Users, label: "2–4 INTERNS" },
                { icon: LogIn, label: "ONBOARDING" },
                { icon: Eye, label: "STUDIO EXPOSURE" },
                { icon: Award, label: "CERTIFICATE" },
              ].map((step, idx) => (
                <div
                  key={step.label}
                  className="flex flex-col items-center relative group"
                >
                  {/* Mobile vertical dashed connecting line */}
                  {idx < 6 && (
                    <div className="
              md:hidden absolute inset-x-4 top-14 bottom-[-3rem]
              border-l border-dashed border-neutral-700/50
              pointer-events-none -z-10
            " />
                  )}

                  {/* Icon circle */}
                  <div className={`
            relative z-10
            w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
            rounded-full
            bg-gradient-to-b from-neutral-900 to-black
            border border-neutral-700/70
            flex items-center justify-center
            shadow-[0_4px_16px_rgba(0,0,0,0.6)]
            transition-all duration-300
            group-hover:scale-110 group-hover:shadow-[0_12px_32px_rgba(249,115,22,0.18)]
            group-hover:border-orange-500/50
          `}>
                    <step.icon
                      className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-neutral-300 group-hover:text-orange-400 transition-colors duration-300"
                      strokeWidth={1.6}
                    />
                  </div>

                  {/* Label */}
                  <p className="
            mt-3 text-[10px] sm:text-xs md:text-sm
            font-medium uppercase tracking-wider
            text-neutral-400 group-hover:text-neutral-200
            transition-colors duration-300 text-center leading-snug
          ">
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <div className="my-10 lg:my-14 border-t border-white/10" />

        {/* THIS IS FOR / NOT FOR */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm p-7 lg:p-9 rounded-xl border border-white/10 transition-all duration-300 hover:shadow-lg hover:border-white/20">
            <h4 className="text-xl lg:text-2xl font-semibold uppercase tracking-wide mb-5">
              This internship is for:
            </h4>
            <ul className="space-y-3 text-white/80 text-base lg:text-lg">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 text-xl mt-0.5">•</span>
                Film & media students
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 text-xl mt-0.5">•</span>
                Curious self-taught filmmakers
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 text-xl mt-0.5">•</span>
                Students serious about discipline.
              </li>
            </ul>
          </div>

          <div className="bg-white/5 backdrop-blur-sm p-7 lg:p-9 rounded-xl border border-white/10 transition-all duration-300 hover:shadow-lg hover:border-white/20">
            <h4 className="text-xl lg:text-2xl font-semibold uppercase tracking-wide mb-5">
              This is not for:
            </h4>
            <ul className="space-y-3 text-white/80 text-base lg:text-lg">
              <li className="flex items-start gap-3">
                <span className="text-orange-500 text-xl mt-0.5">•</span>
                Guaranteed job seekers
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 text-xl mt-0.5">•</span>
                Certificate collectors
              </li>
              <li className="flex items-start gap-3">
                <span className="text-orange-500 text-xl mt-0.5">•</span>
                Casual hobby interest
              </li>
            </ul>
          </div>
        </section>

        <div className="my-10 lg:my-14 border-t border-white/10" />

        {/* STRUCTURE */}
        <section className="text-center max-w-4xl mx-auto">
          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-widest mb-6">
            STRUCTURE
          </h4>

          <p className="text-base sm:text-lg md:text-xl text-white/70 mb-8 font-bold">
            Duration: 2–6 weeks &nbsp;|&nbsp; Batch Size: 2–4 interns per cycle
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-5 text-base sm:text-lg md:text-xl text-white/80">
            <p>Direction & Production</p>
            <p>Cinematography</p>
            <p>Editing & Post</p>
            <p>Design & Motion</p>
            <p>Sound</p>
          </div>
        </section>

        <div className="my-10 lg:my-14 border-t border-white/10" />

        {/* PAY & ETHICS */}
        <section className="text-center max-w-3xl mx-auto">
          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-widest mb-6">
            PAY & ETHICS
          </h4>

          <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">
            Learning-focused internships may be unpaid.
            <br />
            Billable work is paid.
            <br />
            Credits provided where applicable.
          </p>
        </section>

        <div className="my-10 lg:my-14 border-t border-white/10" />

        {/* FOR PARENTS & COLLEGES */}
        <section className="text-center">
          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-widest mb-6">
            FOR PARENTS & COLLEGES
          </h4>

          <a
            href="/pdf/RasterBros_Internship_Parent_Guide.pdf"
            download
            className="inline-block px-7 py-3 bg-orange-600 hover:bg-orange-500 text-black font-semibold text-sm sm:text-base uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl rounded-md transform hover:scale-105"
          >
            DOWNLOAD PARENT GUIDE (PDF)
          </a>
        </section>

        <div className="h-16 lg:h-24" />
      </main>
      {/* Modal - shown when isModalOpen is true */}
      <ApplicationFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}