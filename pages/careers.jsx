import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Clock3,
  Compass,
  MapPin,
  Rocket,
  Sparkles,
  Target,
} from "lucide-react";

import SectionWrapper from "../components/SectionWrapper";
import AnimatedCard from "../components/AnimatedCard";
import Button from "../components/Button";
import Heading from "../components/Heading";
import FormInput from "../components/FormInput";
import CareersApplicationModal from "../src/components/CareersApplicationModal";

const benefits = [
  {
    title: "Ownership",
    description:
      "You ship meaningful features and creative work with end-to-end responsibility.",
    icon: Target,
  },
  {
    title: "Growth",
    description:
      "Mentorship, rapid feedback loops, and exposure to real productions at scale.",
    icon: Rocket,
  },
  {
    title: "Flexibility",
    description:
      "Autonomy-first culture with modern workflows built for deep focus and flow.",
    icon: Compass,
  },
  {
    title: "Real-World Impact",
    description:
      "Your work reaches artists, audiences, and partners through high-visibility releases.",
    icon: Sparkles,
  },
];

const openRoles = [
  {
    title: "Senior Video Editor",
    location: "Mohali, India",
    type: "Full-time",
    description:
      "Lead storytelling in edit suites, from first cut to final delivery for films and music projects.",
  },
  {
    title: "Creative Producer",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Drive production planning, talent coordination, and execution quality across concurrent projects.",
  },
  {
    title: "Motion Graphics Designer",
    location: "Remote (India)",
    type: "Contract",
    description:
      "Design cinematic title systems, visual treatments, and social-first motion assets.",
  },
  {
    title: "Client Partnerships Manager",
    location: "Mumbai, India",
    type: "Full-time",
    description:
      "Build long-term client relationships and align studio capabilities with business outcomes.",
  },
];

const processSteps = [
  {
    title: "Apply",
    description: "Submit your profile with portfolio links and relevant project experience.",
  },
  {
    title: "Review",
    description: "Our team reviews fit, craft quality, and alignment with current roles.",
  },
  {
    title: "Interview",
    description: "A focused conversation on work style, thinking process, and collaboration.",
  },
  {
    title: "Offer",
    description: "You receive a clear offer, role charter, and onboarding roadmap.",
  },
];

const teamValues = [
  "Craft with intention",
  "Communicate clearly",
  "Stay curious and resourceful",
  "Own outcomes, not just tasks",
];

export default function CareersPage() {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  return (
    <>
      <Head>
        <title>Careers | Raster Bros</title>
        <meta
          name="description"
          content="Build ambitious film and digital work with Raster Bros. Explore open roles and join our team."
        />
      </Head>

      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto flex h-20 items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-4">
              <div className="h-16 flex items-center perspective">
                <img
                  src="/apple-touch-icon.png"
                  alt="Logo"
                  className="sm:h-12 h-8 w-auto object-contain block border border-white rounded-full shadow-lg animate-coin-flip"
                />
              </div>
              <div className="flex items-center mt-3">
                <img
                  src="/Rasterbros-Title.png"
                  alt="Raster Bros"
                  className="sm:h-12 h-8 w-auto object-contain block"
                />
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/join-internship"
                className="hidden rounded-2xl border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors hover:text-white md:inline-flex"
              >
                Internship
              </Link>
              <Button href="#open-roles" variant="primary">
                View Open Roles
              </Button>
            </div>
          </div>
        </header>

        <section className="relative isolate overflow-hidden border-b border-white/10 px-6 pb-20 pt-28 md:pb-24 md:pt-36">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_40%)]" />
          <motion.div
            className="pointer-events-none absolute -left-20 top-28 h-64 w-64 rounded-full bg-white/10 blur-3xl"
            animate={{ y: [0, 24, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="container relative mx-auto max-w-5xl text-center">
            <p className="mb-4 text-xs uppercase tracking-[0.24em] text-white/60">Build the Future of Storytelling</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight md:text-6xl">
              Careers at Raster Bros
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Join a team where innovation, growth, and real impact shape every project. We build bold visual experiences with precision, speed, and intent.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="#open-roles">View Open Roles</Button>
              <Button href="#culture" variant="secondary">
                Explore Culture
              </Button>
            </div>
          </div>
        </section>

        <SectionWrapper id="culture" className="border-b border-white/10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <Heading
                eyebrow="Culture & Vision"
                title="A studio mindset for people who care about craft"
                description="We are a cross-functional team of creators, editors, and strategists. Our mission is to produce work that is culturally relevant, technically excellent, and commercially meaningful."
              />
              <p className="mt-6 max-w-2xl text-white/65">
                We value clarity, proactive thinking, and collaborative execution. If you are obsessed with details and open to feedback, you will thrive here.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-6 shadow-[0_18px_55px_rgba(0,0,0,0.28)]">
              <p className="mb-4 text-sm uppercase tracking-[0.2em] text-white/50">Team Principles</p>
              <div className="space-y-3">
                {teamValues.map((value) => (
                  <div key={value} className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white/80">
                    {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <Heading
            eyebrow="Why Join Us"
            title="High trust. High standards. High growth."
            description="A modern environment designed for ambitious people who want to build a lasting body of work."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <AnimatedCard key={benefit.title} delay={index * 0.05}>
                  <div className="mb-5 inline-flex rounded-xl border border-white/20 bg-white/5 p-3 text-white/90">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-2xl">{benefit.title}</h3>
                  <p className="mt-3 text-white/70">{benefit.description}</p>
                </AnimatedCard>
              );
            })}
          </div>
        </SectionWrapper>

        <SectionWrapper id="open-roles" className="border-y border-white/10 bg-gradient-to-b from-white/[0.02] to-transparent">
          <Heading
            eyebrow="Open Roles"
            title="Current opportunities"
            description="Find your place in the team and build work that reaches millions."
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {openRoles.map((role, index) => (
              <AnimatedCard key={role.title} delay={index * 0.05} className="flex h-full flex-col">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{role.title}</h3>
                    <p className="mt-3 text-white/70">{role.description}</p>
                  </div>
                  <Briefcase className="mt-1 h-5 w-5 shrink-0 text-white/60" />
                </div>

                <div className="mt-auto flex flex-wrap gap-3 text-sm text-white/70">
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5">
                    <MapPin className="h-4 w-4" /> {role.location}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5">
                    <Clock3 className="h-4 w-4" /> {role.type}
                  </span>
                </div>

                <Button
                  variant="secondary"
                  className="mt-6 w-full justify-between"
                  onClick={() => {
                    setSelectedRole(role.title);
                    setIsApplicationModalOpen(true);
                  }}
                  type="button"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </AnimatedCard>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper>
          <Heading
            eyebrow="Hiring Process"
            title="What to expect"
            description="Transparent and fast process designed to respect your time."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <AnimatedCard key={step.title} delay={index * 0.05} className="relative">
                <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/5 text-sm font-semibold text-white/90">
                  {index + 1}
                </span>
                <h3 className="font-display text-xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{step.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper className="pt-8">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.03] to-transparent p-7 shadow-[0_18px_55px_rgba(0,0,0,0.28)] md:p-10">
            <Heading
              eyebrow="Still Interested?"
              title="Didn’t find a role?"
              description="Share your profile and we will reach out when a relevant role opens."
            />

            <form className="mt-8 grid gap-4 md:grid-cols-2">
              <FormInput id="name" label="Full Name" placeholder="Enter your name" required />
              <FormInput id="email" label="Email" type="email" placeholder="you@domain.com" required />
              <FormInput id="linkedin" label="LinkedIn or Portfolio" placeholder="https://" />
              <label htmlFor="resume" className="block">
                <span className="mb-2 block text-sm font-medium text-white/80">Resume</span>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  className="w-full rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-4 py-3 text-sm text-white file:mr-4 file:rounded-xl file:border-0 file:bg-white file:px-3 file:py-2 file:text-black file:transition-colors hover:file:bg-white/90"
                />
              </label>
              <div className="md:col-span-2">
                <Button type="submit" className="w-full md:w-auto">
                  Submit Resume
                </Button>
              </div>
            </form>
          </div>
        </SectionWrapper>

        <CareersApplicationModal
          isOpen={isApplicationModalOpen}
          roleTitle={selectedRole}
          onClose={() => {
            setIsApplicationModalOpen(false);
            setSelectedRole("");
          }}
        />
      </div>
    </>
  );
}
