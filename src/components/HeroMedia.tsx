"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { HeroCallout } from "@/types/content";
import { assetUrl } from "@/lib/assets";

const BUBBLE_COLORS = [
  "bg-pastel-pink border-pastel-pink",
  "bg-pastel-blue border-pastel-blue",
  "bg-pastel-orange border-pastel-orange",
  "bg-pastel-lavender border-pastel-lavender",
];

const TAG_BORDER: {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  rotate: number;
  originX: number;
  originY: number;
}[] = [
  { top: "-18px", left: "3%", rotate: -2, originX: 0, originY: 1 },
  { top: "-18px", right: "1%", rotate: 2, originX: 1, originY: 1 },
  { bottom: "-18px", left: "2%", rotate: 1.5, originX: 0, originY: 0 },
  { bottom: "-18px", right: "-4%", rotate: -1.5, originX: 1, originY: 0 },
];

const AUTO_SHOW_MS = 3000;
const AUTO_INTERVAL_MS = 120_000;

interface Props {
  callouts: HeroCallout[];
}

export default function HeroMedia({ callouts }: Props) {
  const [active, setActive] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reduced = useReducedMotion();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const flash = useCallback(() => {
    if (hovering) return;
    setActive(true);
    timerRef.current = setTimeout(() => {
      setActive((prev) => {
        if (!hovering) return false;
        return prev;
      });
    }, AUTO_SHOW_MS);
  }, [hovering]);

  useEffect(() => {
    // Show tags on page load after a short delay
    const initialDelay = setTimeout(() => {
      flash();
    }, 800);

    // Repeat every 2 minutes
    intervalRef.current = setInterval(() => {
      flash();
    }, AUTO_INTERVAL_MS);

    return () => {
      clearTimeout(initialDelay);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [flash]);

  const handleMouseEnter = () => {
    setHovering(true);
    setActive(true);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleMouseLeave = () => {
    setHovering(false);
    setActive(false);
  };

  return (
    <div className="relative">
      {/* Photo card */}
      <div
        className="comic-card relative aspect-[4/3] w-[320px] cursor-pointer sm:w-[400px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => setActive((v) => !v)}
        role="button"
        tabIndex={0}
        aria-label="Toggle profile details"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setActive((v) => !v);
        }}
      >
        <div className="h-full w-full overflow-hidden rounded-[8px]">
          <img
            src={assetUrl("/assets/hero-photo.jpg")}
            alt="Niharika Arun"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center 30%" }}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Tags around the border (desktop) */}
        <AnimatePresence>
          {active &&
            callouts.map((c, i) => {
              const pos = TAG_BORDER[i % TAG_BORDER.length];
              const { rotate, originX, originY, ...cssPos } = pos;
              const fromY = originY === 1 ? -12 : 12;

              return (
                <motion.div
                  key={c.id}
                  style={{
                    position: "absolute",
                    ...cssPos,
                    rotate,
                    zIndex: 10,
                  }}
                  initial={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, y: fromY, scale: 0.85 }
                  }
                  animate={
                    reduced
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  exit={
                    reduced
                      ? { opacity: 0 }
                      : { opacity: 0, y: fromY, scale: 0.85 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 340,
                    damping: 20,
                    delay: reduced ? 0 : i * 0.08,
                  }}
                  className={`comic-bubble hidden whitespace-nowrap lg:block ${BUBBLE_COLORS[i % BUBBLE_COLORS.length]}`}
                >
                  <span className="comic-text">{c.label}</span>
                </motion.div>
              );
            })}
        </AnimatePresence>
      </div>

      {/* Mobile tags — below the card */}
      <div className="mt-4 flex flex-wrap justify-center gap-2 lg:hidden">
        <AnimatePresence>
          {active &&
            callouts.map((c, i) => (
              <motion.div
                key={c.id}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.25, delay: reduced ? 0 : i * 0.06 }}
                className={`comic-bubble ${BUBBLE_COLORS[i % BUBBLE_COLORS.length]}`}
              >
                <span className="comic-text">{c.label}</span>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
