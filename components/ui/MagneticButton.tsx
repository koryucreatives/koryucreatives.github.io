"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

type MagneticButtonProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  type?: "button" | "submit";
};

export default function MagneticButton({
  children,
  className,
  href,
  onClick,
  variant = "solid",
  type = "button",
}: MagneticButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    if (shouldReduceMotion || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setPos({ x: relX * 0.3, y: relY * 0.4 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const classes = clsx(
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors duration-300",
    variant === "solid"
      ? "bg-ink-50 text-ink-950 hover:bg-ink-200"
      : "border border-ink-50/25 text-ink-50 hover:border-ink-50/70",
    className
  );

  const inner = (
    <motion.span
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 14, mass: 0.25 }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {href ? (
        <a href={href} data-cursor="link" className={classes}>
          {inner}
        </a>
      ) : (
        <button type={type} data-cursor="link" onClick={onClick} className={classes}>
          {inner}
        </button>
      )}
    </div>
  );
}
