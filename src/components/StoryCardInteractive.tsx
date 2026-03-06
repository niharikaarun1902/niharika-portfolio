"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Story, StoryPanel } from "@/types/content";
import type { ReactNode } from "react";

/* ── Panel background colors ── */
const PANEL_BG = ["#FFF9E0", "#E8D5F5", "#D4EDDA", "#FDEBD0"];
const PANEL_BORDER = ["#D4A017", "#9B59B6", "#27AE60", "#E67E22"];

/* ── Captions below each panel — unique per story ── */
const STORY_CAPTIONS = [
  // Story 1: Missing Outages
  [
    "The data looked clean… too clean.",
    "A hidden filter was quietly erasing the truth.",
    "One tweak to the logic changed everything.",
    "Accurate reports, real-time speed. Case closed.",
  ],
  // Story 2: Messy Images
  [
    "Hundreds of images, zero consistency.",
    "If the output isn\u2019t standard, the analysis can\u2019t scale.",
    "Web scraping + scoring rules = repeatable quality checks.",
    "Structured JSON, consistent insights. Finally.",
  ],
  // Story 3: Demand Forecasting
  [
    "Shortages at peak, idle vehicles off-peak. Something\u2019s off.",
    "Raw logs weren\u2019t enough. Patterns needed segmenting.",
    "A model is only useful if it drives real decisions.",
    "Forecasts now power fleet planning, not just dashboards.",
  ],
];

/* ── SVG figures per story ── */

function OutageFigures({ pi }: { pi: number }): ReactNode {
  const figs: ReactNode[] = [
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <rect x="2" y="6" width="32" height="24" rx="3" fill="#fff" stroke="#333" strokeWidth="2" />
      <line x1="8" y1="14" x2="28" y2="14" stroke="#ccc" strokeWidth="1.5" />
      <line x1="8" y1="19" x2="22" y2="19" stroke="#ccc" strokeWidth="1.5" />
      <line x1="8" y1="24" x2="18" y2="24" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
      <rect x="12" y="30" width="12" height="4" rx="1.5" fill="#ddd" stroke="#333" strokeWidth="1" />
      <circle cx="56" cy="22" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="52" cy="20" r="1.5" fill="#333" />
      <circle cx="60" cy="20" r="1.5" fill="#333" />
      <path d="M52 26 Q56 23 60 26" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="56" y1="32" x2="56" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="42" y2="50" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="70" y2="50" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="46" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="66" y2="76" stroke="#333" strokeWidth="2.5" />
      <text x="68" y="16" fontSize="16" fontWeight="bold" fill="#EF4444">?</text>
    </svg>,
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <defs>
        <clipPath id="monitor2">
          <rect x="2" y="8" width="34" height="28" rx="3" />
        </clipPath>
      </defs>
      <rect x="2" y="8" width="34" height="28" rx="3" fill="#1a1a2e" stroke="#333" strokeWidth="2" />
      <g clipPath="url(#monitor2)">
        <text x="5" y="20" fontSize="7" fontFamily="monospace" fill="#22C55E">SELECT *</text>
        <text x="5" y="28" fontSize="6" fontFamily="monospace" fill="#60A5FA">WHERE dur&gt;5</text>
        <line x1="4" y1="30" x2="34" y2="30" stroke="#EF4444" strokeWidth="1.5" />
      </g>
      <rect x="12" y="36" width="14" height="4" rx="1.5" fill="#ddd" stroke="#333" strokeWidth="1" />
      <circle cx="56" cy="24" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="52" cy="22" r="1.5" fill="#333" />
      <circle cx="60" cy="22" r="1.5" fill="#333" />
      <path d="M52 28 Q56 30 60 28" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="56" y1="34" x2="56" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="40" y2="38" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="68" y2="50" stroke="#333" strokeWidth="2.5" />
      <circle cx="72" cy="52" r="5" fill="none" stroke="#333" strokeWidth="2" />
      <line x1="75" y1="56" x2="78" y2="59" stroke="#333" strokeWidth="2" />
      <line x1="56" y1="58" x2="46" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="66" y2="76" stroke="#333" strokeWidth="2.5" />
    </svg>,
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <circle cx="44" cy="24" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="40" cy="22" r="1.5" fill="#333" />
      <circle cx="48" cy="22" r="1.5" fill="#333" />
      <path d="M40 28 Q44 32 48 28" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="44" y1="34" x2="44" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="44" y1="42" x2="28" y2="34" stroke="#333" strokeWidth="2.5" />
      <line x1="44" y1="42" x2="60" y2="34" stroke="#333" strokeWidth="2.5" />
      <line x1="44" y1="58" x2="34" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="44" y1="58" x2="54" y2="76" stroke="#333" strokeWidth="2.5" />
      <ellipse cx="62" cy="8" rx="7" ry="9" fill="#FFD700" stroke="#333" strokeWidth="2" />
      <line x1="62" y1="-3" x2="62" y2="0" stroke="#F59E0B" strokeWidth="2" />
      <line x1="52" y1="0" x2="55" y2="3" stroke="#F59E0B" strokeWidth="2" />
      <line x1="72" y1="0" x2="69" y2="3" stroke="#F59E0B" strokeWidth="2" />
      <line x1="54" y1="10" x2="56" y2="10" stroke="#F59E0B" strokeWidth="2" />
      <line x1="68" y1="10" x2="70" y2="10" stroke="#F59E0B" strokeWidth="2" />
      <text x="4" y="20" fontSize="18" fontWeight="bold" fill="#D4A017">💡</text>
    </svg>,
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <rect x="2" y="6" width="32" height="24" rx="3" fill="#fff" stroke="#333" strokeWidth="2" />
      <rect x="6" y="10" width="10" height="8" rx="1" fill="#22C55E" opacity="0.3" />
      <rect x="18" y="10" width="10" height="14" rx="1" fill="#22C55E" opacity="0.3" />
      <rect x="6" y="20" width="10" height="6" rx="1" fill="#22C55E" opacity="0.3" />
      <polyline points="8,16 12,20 26,10" fill="none" stroke="#22C55E" strokeWidth="2" />
      <rect x="12" y="30" width="12" height="4" rx="1.5" fill="#ddd" stroke="#333" strokeWidth="1" />
      <circle cx="56" cy="22" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="52" cy="20" r="1.5" fill="#333" />
      <circle cx="60" cy="20" r="1.5" fill="#333" />
      <path d="M52 26 Q56 30 60 26" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="56" y1="32" x2="56" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="40" x2="40" y2="28" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="40" x2="72" y2="28" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="46" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="66" y2="76" stroke="#333" strokeWidth="2.5" />
      <text x="66" y="14" fontSize="12" fill="#22C55E">✦</text>
      <text x="42" y="14" fontSize="12" fill="#22C55E">✦</text>
    </svg>,
  ];
  return figs[pi];
}

function ImageFigures({ pi }: { pi: number }): ReactNode {
  const figs: ReactNode[] = [
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <rect x="2" y="4" width="16" height="13" rx="2" fill="#E8D5F5" stroke="#333" strokeWidth="1.5" transform="rotate(-12 10 10)" />
      <rect x="22" y="2" width="16" height="13" rx="2" fill="#DCEBFF" stroke="#333" strokeWidth="1.5" transform="rotate(10 30 8)" />
      <rect x="4" y="58" width="16" height="13" rx="2" fill="#FFE1EC" stroke="#333" strokeWidth="1.5" transform="rotate(6 12 64)" />
      <circle cx="50" cy="26" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="46" cy="24" r="1.5" fill="#333" />
      <circle cx="54" cy="24" r="1.5" fill="#333" />
      <path d="M47 30 Q50 27 53 30" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="50" y1="36" x2="50" y2="60" stroke="#333" strokeWidth="2.5" />
      <line x1="50" y1="44" x2="36" y2="52" stroke="#333" strokeWidth="2.5" />
      <line x1="50" y1="44" x2="64" y2="52" stroke="#333" strokeWidth="2.5" />
      <line x1="50" y1="60" x2="42" y2="78" stroke="#333" strokeWidth="2.5" />
      <line x1="50" y1="60" x2="58" y2="78" stroke="#333" strokeWidth="2.5" />
      <text x="62" y="22" fontSize="14" fontWeight="bold" fill="#E67E22">?!</text>
    </svg>,
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <rect x="2" y="8" width="14" height="12" rx="2" fill="#E8D5F5" stroke="#333" strokeWidth="1.5" />
      <rect x="18" y="8" width="14" height="12" rx="2" fill="#DCEBFF" stroke="#333" strokeWidth="1.5" />
      <rect x="2" y="22" width="14" height="12" rx="2" fill="#FFE1EC" stroke="#333" strokeWidth="1.5" />
      <rect x="18" y="22" width="14" height="12" rx="2" fill="#FFE7CC" stroke="#333" strokeWidth="1.5" />
      <text x="5" y="17" fontSize="7" fontFamily="monospace" fill="#333" opacity="0.6">{"{}"}</text>
      <text x="21" y="17" fontSize="7" fontFamily="monospace" fill="#333" opacity="0.6">{"{}"}</text>
      <text x="5" y="31" fontSize="7" fontFamily="monospace" fill="#333" opacity="0.6">{"{}"}</text>
      <text x="21" y="31" fontSize="7" fontFamily="monospace" fill="#333" opacity="0.6">{"{}"}</text>
      <circle cx="56" cy="24" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="52" cy="22" r="1.5" fill="#333" />
      <circle cx="60" cy="22" r="1.5" fill="#333" />
      <path d="M53 28 Q56 30 59 28" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="56" y1="34" x2="56" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="38" y2="36" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="68" y2="50" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="48" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="64" y2="76" stroke="#333" strokeWidth="2.5" />
    </svg>,
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <circle cx="10" cy="14" r="5" fill="#E8D5F5" stroke="#333" strokeWidth="1.5" />
      <circle cx="26" cy="8" r="5" fill="#DCEBFF" stroke="#333" strokeWidth="1.5" />
      <circle cx="8" cy="28" r="5" fill="#FFE1EC" stroke="#333" strokeWidth="1.5" />
      <line x1="14" y1="11" x2="22" y2="10" stroke="#333" strokeWidth="1.5" />
      <line x1="11" y1="18" x2="9" y2="24" stroke="#333" strokeWidth="1.5" />
      <line x1="23" y1="12" x2="12" y2="26" stroke="#333" strokeWidth="1" strokeDasharray="3 2" />
      <circle cx="46" cy="24" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="42" cy="22" r="1.5" fill="#333" />
      <circle cx="50" cy="22" r="1.5" fill="#333" />
      <path d="M42 28 Q46 32 50 28" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="46" y1="34" x2="46" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="46" y1="42" x2="30" y2="34" stroke="#333" strokeWidth="2.5" />
      <line x1="46" y1="42" x2="62" y2="34" stroke="#333" strokeWidth="2.5" />
      <line x1="46" y1="58" x2="38" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="46" y1="58" x2="54" y2="76" stroke="#333" strokeWidth="2.5" />
      <ellipse cx="64" cy="8" rx="7" ry="9" fill="#FFD700" stroke="#333" strokeWidth="2" />
    </svg>,
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <rect x="2" y="8" width="26" height="30" rx="3" fill="#fff" stroke="#333" strokeWidth="2" />
      <text x="6" y="18" fontSize="7" fontFamily="monospace" fill="#333" opacity="0.5">{"{"}</text>
      <text x="8" y="26" fontSize="6" fontFamily="monospace" fill="#22C55E">&quot;✓&quot;</text>
      <text x="6" y="34" fontSize="7" fontFamily="monospace" fill="#333" opacity="0.5">{"}"}</text>
      <circle cx="56" cy="24" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="52" cy="22" r="1.5" fill="#333" />
      <circle cx="60" cy="22" r="1.5" fill="#333" />
      <path d="M52 28 Q56 32 60 28" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="56" y1="34" x2="56" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="40" y2="30" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="72" y2="30" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="48" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="64" y2="76" stroke="#333" strokeWidth="2.5" />
      <text x="66" y="18" fontSize="12" fill="#22C55E">✦</text>
      <text x="42" y="18" fontSize="12" fill="#22C55E">✦</text>
    </svg>,
  ];
  return figs[pi];
}

function ForecastFigures({ pi }: { pi: number }): ReactNode {
  const figs: ReactNode[] = [
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <polygon points="6,30 14,8 22,30" fill="#FECACA" stroke="#EF4444" strokeWidth="2" />
      <polygon points="6,42 14,64 22,42" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="2" />
      <circle cx="52" cy="24" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="48" cy="22" r="1.5" fill="#333" />
      <circle cx="56" cy="22" r="1.5" fill="#333" />
      <path d="M49 28 Q52 25 55 28" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="52" y1="34" x2="52" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="52" y1="42" x2="38" y2="50" stroke="#333" strokeWidth="2.5" />
      <line x1="52" y1="42" x2="66" y2="50" stroke="#333" strokeWidth="2.5" />
      <line x1="52" y1="58" x2="44" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="52" y1="58" x2="60" y2="76" stroke="#333" strokeWidth="2.5" />
      <text x="62" y="18" fontSize="14" fontWeight="bold" fill="#E67E22">?</text>
    </svg>,
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <line x1="4" y1="44" x2="4" y2="8" stroke="#333" strokeWidth="1.5" />
      <line x1="4" y1="44" x2="36" y2="44" stroke="#333" strokeWidth="1.5" />
      <rect x="8" y="30" width="6" height="14" rx="1" fill="#DCEBFF" stroke="#333" strokeWidth="1" />
      <rect x="16" y="18" width="6" height="26" rx="1" fill="#FFE1EC" stroke="#333" strokeWidth="1" />
      <rect x="24" y="24" width="6" height="20" rx="1" fill="#FFE7CC" stroke="#333" strokeWidth="1" />
      <circle cx="56" cy="24" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="52" cy="22" r="1.5" fill="#333" />
      <circle cx="60" cy="22" r="1.5" fill="#333" />
      <path d="M53 28 Q56 30 59 28" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="56" y1="34" x2="56" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="40" y2="36" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="70" y2="50" stroke="#333" strokeWidth="2.5" />
      <circle cx="74" cy="52" r="6" fill="none" stroke="#333" strokeWidth="2" />
      <line x1="78" y1="56" x2="82" y2="60" stroke="#333" strokeWidth="2" />
      <line x1="56" y1="58" x2="48" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="64" y2="76" stroke="#333" strokeWidth="2.5" />
    </svg>,
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <polyline points="4,32 12,20 20,26 28,14" fill="none" stroke="#3B82F6" strokeWidth="2" />
      <circle cx="28" cy="14" r="3" fill="#3B82F6" />
      <path d="M30 14 L36 8" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 2" />
      <rect x="58" y="4" width="16" height="20" rx="2" fill="#DDF6E6" stroke="#333" strokeWidth="1.5" />
      <polyline points="62,12 64,14 70,8" fill="none" stroke="#22C55E" strokeWidth="2" />
      <line x1="62" y1="18" x2="72" y2="18" stroke="#333" strokeWidth="1" opacity="0.3" />
      <circle cx="42" cy="26" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="38" cy="24" r="1.5" fill="#333" />
      <circle cx="46" cy="24" r="1.5" fill="#333" />
      <path d="M38 30 Q42 34 46 30" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="42" y1="36" x2="42" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="42" y1="44" x2="28" y2="36" stroke="#333" strokeWidth="2.5" />
      <line x1="42" y1="44" x2="56" y2="36" stroke="#333" strokeWidth="2.5" />
      <line x1="42" y1="58" x2="34" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="42" y1="58" x2="50" y2="76" stroke="#333" strokeWidth="2.5" />
      <ellipse cx="14" cy="6" rx="6" ry="8" fill="#FFD700" stroke="#333" strokeWidth="1.5" />
    </svg>,
    <svg viewBox="0 0 80 90" className="h-20 w-16" aria-hidden>
      <rect x="2" y="14" width="18" height="12" rx="4" fill="#DCEBFF" stroke="#333" strokeWidth="1.5" />
      <circle cx="6" cy="28" r="3" fill="none" stroke="#333" strokeWidth="1.5" />
      <circle cx="16" cy="28" r="3" fill="none" stroke="#333" strokeWidth="1.5" />
      <rect x="2" y="38" width="18" height="12" rx="4" fill="#DDF6E6" stroke="#333" strokeWidth="1.5" />
      <circle cx="6" cy="52" r="3" fill="none" stroke="#333" strokeWidth="1.5" />
      <circle cx="16" cy="52" r="3" fill="none" stroke="#333" strokeWidth="1.5" />
      <path d="M22 20 L28 20" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
      <path d="M22 44 L28 44" stroke="#333" strokeWidth="1.5" />
      <circle cx="56" cy="24" r="10" fill="#FFEAA7" stroke="#333" strokeWidth="2.5" />
      <circle cx="52" cy="22" r="1.5" fill="#333" />
      <circle cx="60" cy="22" r="1.5" fill="#333" />
      <path d="M52 28 Q56 32 60 28" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="56" y1="34" x2="56" y2="58" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="40" y2="30" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="42" x2="72" y2="30" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="48" y2="76" stroke="#333" strokeWidth="2.5" />
      <line x1="56" y1="58" x2="64" y2="76" stroke="#333" strokeWidth="2.5" />
      <text x="66" y="18" fontSize="12" fill="#22C55E">✦</text>
      <text x="42" y="18" fontSize="12" fill="#22C55E">✦</text>
    </svg>,
  ];
  return figs[pi];
}

const FIGURE_COMPONENTS = [OutageFigures, ImageFigures, ForecastFigures];

/* ── Interactive panel ── */
function ComicPanel({
  panel,
  panelIndex,
  storyIndex,
  isActive,
  onClick,
}: {
  panel: StoryPanel;
  panelIndex: number;
  storyIndex: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const bg = PANEL_BG[panelIndex];
  const border = PANEL_BORDER[panelIndex];
  const FigureComp = FIGURE_COMPONENTS[storyIndex] ?? OutageFigures;
  const bubbleClass =
    panelIndex === 2 ? "thought-bubble" : "speech-bubble";

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03, zIndex: 2 }}
      whileTap={{ scale: 0.98 }}
      className="relative flex cursor-pointer flex-col gap-2 overflow-hidden rounded-lg p-4 transition-shadow"
      style={{
        background: bg,
        border: `3px solid ${border}`,
        boxShadow: isActive
          ? `6px 6px 0 ${border}`
          : `4px 4px 0 ${border}40`,
        minHeight: "200px",
      }}
    >
      {/* Panel label tab */}
      <span
        className="absolute left-0 top-0 rounded-br-lg px-3 py-1 text-xs font-bold text-white"
        style={{ background: border }}
      >
        {panel.heading}
      </span>

      {/* Bubble */}
      <div className={`${bubbleClass} mt-8 text-[0.8rem]`}>{panel.text}</div>

      {/* Figure */}
      <div className="mt-auto flex justify-center text-text/80">
        <FigureComp pi={panelIndex} />
      </div>

      {/* Caption */}
      <p
        className="mt-1 text-center text-[0.65rem] italic leading-tight"
        style={{ color: border }}
      >
        {(STORY_CAPTIONS[storyIndex] ?? STORY_CAPTIONS[0])[panelIndex]}
      </p>
    </motion.div>
  );
}

/* ── Main story card ── */
export default function StoryCardInteractive({
  story,
  index,
}: {
  story: Story;
  index: number;
}) {
  const [activePanel, setActivePanel] = useState<number | null>(null);

  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border-2 border-text/10 bg-surface shadow-[var(--shadow-card)]">
      {/* Title bar */}
      <div
        className="border-b-2 px-6 py-5 sm:px-8"
        style={{ background: PANEL_BG[index % PANEL_BG.length] }}
      >
        <h3 className="font-heading text-xl font-bold text-text sm:text-2xl">
          {story.title}
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Left: Comic panels in 2x2 grid */}
        <div className="grid grid-cols-2 gap-3 border-b-2 border-text/10 p-4 lg:w-[50%] lg:shrink-0 lg:border-b-0 lg:border-r-2">
          {story.panels.map((panel, pi) => (
            <ComicPanel
              key={pi}
              panel={panel}
              panelIndex={pi}
              storyIndex={index}
              isActive={activePanel === pi}
              onClick={() =>
                setActivePanel((prev) => (prev === pi ? null : pi))
              }
            />
          ))}
        </div>

        {/* Right: Narrative + Fix + Impact */}
        <div className="flex flex-1 flex-col">
          {/* Narrative */}
          <div className="border-b border-text/10 p-6 sm:p-8">
            {story.narrative.split("\n\n").map((para, pi) => (
              <p
                key={pi}
                className="mb-3 text-[0.95rem] leading-relaxed text-muted last:mb-0"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Fix + Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <div className="border-b border-text/10 p-6 sm:border-b-0 sm:border-r sm:p-8">
              <h4
                className="mb-3 inline-block rounded-lg px-4 py-1.5 font-heading text-sm font-bold text-white"
                style={{ background: "#27AE60" }}
              >
                The Fix
              </h4>
              <ul className="mt-2 space-y-2 pl-4">
                {story.fix.map((item, fi) => (
                  <li
                    key={fi}
                    className="list-disc text-sm leading-relaxed text-muted marker:text-[#27AE60]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 sm:p-8">
              <h4
                className="mb-3 inline-block rounded-lg px-4 py-1.5 font-heading text-sm font-bold text-white"
                style={{ background: "#9B59B6" }}
              >
                The Impact
              </h4>
              <ul className="mt-2 space-y-2 pl-4">
                {story.impact.map((item, ii) => (
                  <li
                    key={ii}
                    className="list-disc text-sm leading-relaxed text-muted marker:text-[#9B59B6]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lesson learned footer */}
          <AnimatePresence>
            {activePanel === 3 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-text/10"
              >
                <div className="bg-[#FFF9E0] p-5 text-center">
                  <p className="text-sm font-medium italic text-text/70">
                    Lesson learned: Data tells a story — but only if you ask the
                    right questions.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
