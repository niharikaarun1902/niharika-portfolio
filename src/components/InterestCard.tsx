"use client";

import { useState, type ReactNode } from "react";
import type { Interest } from "@/types/content";

const ICON_MAP: Record<string, ReactNode> = {
  brain: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.8-3.5 6L12 17l-3.5-2C6.3 13.8 5 11.5 5 9a7 7 0 0 1 7-7z" />
      <path d="M12 17v5" />
      <path d="M9 22h6" />
    </svg>
  ),
  rocket: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  ),
  users: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  sparkles: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3z" />
      <path d="M18 14l.7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7L18 14z" />
    </svg>
  ),
};

const CARD_ACCENTS = [
  "bg-pastel-lavender/60",
  "bg-pastel-blue/60",
  "bg-pastel-pink/60",
  "bg-pastel-orange/60",
];

function FlipCard({
  interest,
  backContent,
  accentClass,
}: {
  interest: Interest;
  backContent: ReactNode;
  accentClass: string;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="h-[260px] cursor-pointer"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.7s cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 flex flex-col gap-3 rounded-[20px] border border-border bg-surface p-6 shadow-card"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentClass} text-text/70`}>
            {ICON_MAP[interest.icon] ?? ICON_MAP.sparkles}
          </div>
          <h3 className="font-heading text-[0.95rem] font-semibold leading-snug text-text">
            {interest.title}
          </h3>
          <p className="text-[0.82rem] leading-relaxed text-muted">
            {interest.description}
          </p>
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 overflow-hidden rounded-[20px] border border-border shadow-card"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {backContent}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12">
            <span className="inline-block rounded-full border border-white/30 bg-white/20 px-3.5 py-1.5 text-[0.8rem] font-semibold text-white shadow-sm backdrop-blur-md">
              {interest.title}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterestCard({
  interest,
  index = 0,
}: {
  interest: Interest;
  index?: number;
}) {
  const hasImage = !!interest.image;
  const hasImages = !!interest.images && interest.images.length > 0;
  const accentClass = CARD_ACCENTS[index % CARD_ACCENTS.length];

  if (!hasImage && !hasImages) {
    return (
      <div
        className={`flex h-[260px] flex-col gap-3 rounded-[20px] border border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-lg ${
          interest._todo ? "border-dashed border-primary/40" : ""
        }`}
      >
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accentClass} text-text/70`}>
          {ICON_MAP[interest.icon] ?? ICON_MAP.sparkles}
        </div>
        <h3 className="font-heading text-[0.95rem] font-semibold leading-snug text-text">
          {interest.title}
        </h3>
        <p className="text-[0.82rem] leading-relaxed text-muted">
          {interest.description}
        </p>
      </div>
    );
  }

  if (hasImages) {
    const imgs = interest.images!;
    return (
      <FlipCard
        interest={interest}
        accentClass={accentClass}
        backContent={
          <div className="grid h-full w-full grid-cols-1 grid-rows-2 gap-[2px] bg-white">
            {imgs.map((src, i) => (
              <div key={i} className="relative overflow-hidden">
                <img
                  src={src}
                  alt={`${interest.title} ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        }
      />
    );
  }

  return (
    <FlipCard
      interest={interest}
      accentClass={accentClass}
      backContent={
        <img
          src={interest.image!}
          alt={interest.title}
          className="h-full w-full object-cover"
        />
      }
    />
  );
}
