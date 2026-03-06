"use client";

import { useState, useEffect, useCallback } from "react";

const LINKS = [
  { id: "progress-map", label: "Journey" },
  { id: "proof-of-work", label: "Projects" },
  { id: "problem-solving", label: "Stories" },
  { id: "core-toolkit", label: "Skills" },
  { id: "outside-terminal", label: "Off the Clock" },
  { id: "reach-out", label: "Contact" },
] as const;

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const offsets = LINKS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return { id, top: Infinity };
      return { id, top: el.getBoundingClientRect().top };
    });
    const current = offsets
      .filter((o) => o.top <= 120)
      .sort((a, b) => b.top - a.top)[0];
    setActive(current?.id ?? "");
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function scrollTo(id: string) {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-md"
      role="navigation"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-3">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("hero");
          }}
          className="font-heading text-xl font-semibold tracking-tight text-text"
        >
          NA<span className="text-primary">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active === id
                    ? "bg-pastel-orange/60 text-text"
                    : "text-muted hover:text-text"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-border/50 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </>
            ) : (
              <>
                <line x1="3" y1="5" x2="17" y2="5" />
                <line x1="3" y1="10" x2="17" y2="10" />
                <line x1="3" y1="15" x2="17" y2="15" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-border bg-surface px-6 pb-4 pt-2 md:hidden">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`w-full rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors ${
                  active === id
                    ? "bg-pastel-orange/60 text-text"
                    : "text-muted hover:text-text"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
