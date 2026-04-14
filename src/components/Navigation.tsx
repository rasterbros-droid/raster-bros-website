"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Studio", href: "#studio" },
    { name: "Contact", href: "#contact" },
    { name: "Join Internship", href: "/join-internship" },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-white/5"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          {/* <Link href="/" className="flex items-center gap-4">
            <div className="h-16 flex items-center">
              <img
                src="/apple-touch-icon.png"
                alt="Logo"
                className="h-12 w-auto object-contain block border border-white rounded-full shadow-lg"
              />
            </div>
            <div className="flex items-center mt-3">
              <img
                src="/Rasterbros-Title.png"
                alt="Title"
                className="h-12 w-auto object-contain block"
              />
            </div>
          </Link> */}

          <Link href="/" className="flex items-center gap-4 group">
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
                  alt="Title"
                  className="sm:h-12 h-8 w-auto object-contain block"
                />
              </div>
            </Link>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              const isAnchor = link.href.startsWith("#");

              if (!isAnchor) {
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm uppercase tracking-widest font-medium text-white/70 hover:text-white transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full duration-300" />
                  </Link>
                );
              }

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.href);
                    if (target) target.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm uppercase tracking-widest font-medium text-white/70 hover:text-white transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full duration-300" />
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background flex flex-col justify-center items-center"
          >
            <button
              className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => {
                const isAnchor = link.href.startsWith("#");

                if (!isAnchor) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="font-display text-4xl font-bold hover:text-white/50 transition-colors"
                    >
                      {link.name}
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      const target = document.querySelector(link.href);
                      if (target) target.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="font-display text-4xl font-bold hover:text-white/50 transition-colors"
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
