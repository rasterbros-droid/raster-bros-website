"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ThankYouPage() {
  const router = useRouter();

  // Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative min-h-screen bg-[#0b0f16] overflow-hidden flex items-center justify-center text-white px-6">
      <Head>
        <title>Thank You | RasterBros</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      {/* Background Glow Effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[140px] -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative text-center max-w-xl"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold uppercase tracking-[0.3em] text-orange-500">
          THANK YOU
        </h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "80px" }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="h-[2px] bg-orange-600 mx-auto mt-6"
        />

        <p className="mt-8 text-neutral-400 text-sm sm:text-base leading-relaxed tracking-wide">
          Your application has been successfully submitted.
          <br />
          Our production team will carefully review your profile.
          <br />
          If shortlisted, you will hear from us soon.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-orange-600/40 
            bg-gradient-to-r from-orange-700 to-orange-600 
            hover:from-orange-600 hover:to-orange-500
            text-white text-sm uppercase tracking-wider 
            rounded-lg transition-all duration-300 
            shadow-lg hover:shadow-orange-600/40
            hover:scale-[1.03] active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}