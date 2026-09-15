"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { scrollToId } from "@/lib/smoothScroll";
import MagneticButton from "@/components/ui/MagneticButton";

const NAV_LINKS = [
  { label: "Story", id: "story" },
  { label: "Services", id: "services" },
  { label: "Work", id: "work" },
  { label: "Process", id: "process" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleNavClick(id: string) {
    setMenuOpen(false);
    scrollToId(id);
  }

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "border-b border-ink-50/10 bg-ink-950/80 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 sm:px-10">
          <a
            href="#top"
            data-cursor="link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("top");
            }}
            className="flex items-center gap-3"
            aria-label="KORYU Creatives, back to top"
          >
            <Image
              src="/images/logo/koryu-mark.png"
              alt=""
              width={36}
              height={36}
              className="h-8 w-8 sm:h-9 sm:w-9"
              priority
            />
            <span className="flex flex-col leading-none">
              <span className="font-display text-base font-semibold tracking-[0.3em] text-ink-50 sm:text-lg">
                KORYU
              </span>
              <span className="hidden text-[0.55rem] font-medium tracking-[0.4em] text-ink-400 sm:block">
                CREATIVES
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                data-cursor="link"
                onClick={() => handleNavClick(link.id)}
                className="group relative text-sm tracking-wide text-ink-200 transition-colors hover:text-ink-50"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink-50 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton
              onClick={() => handleNavClick("contact")}
              className="!px-6 !py-3 !text-xs"
            >
              Start Your Transformation
            </MagneticButton>
          </div>

          <button
            type="button"
            data-cursor="link"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-ink-50"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="h-px w-6 bg-ink-50"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="h-px w-6 bg-ink-50"
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink-950 px-8 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="text-left font-display text-4xl font-medium tracking-wide text-ink-50"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12"
            >
              <MagneticButton onClick={() => handleNavClick("contact")}>
                Start Your Transformation
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
