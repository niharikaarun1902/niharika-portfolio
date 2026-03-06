import { getProfile, getHeroCallouts } from "@/lib/content";
import HeroMedia from "./HeroMedia";

export default function Hero() {
  const profile = getProfile();
  const callouts = getHeroCallouts();

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-bg pb-10 pt-12 md:pb-14 md:pt-16"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-12 px-6 lg:flex-row lg:items-center lg:gap-16">
        {/* Text column */}
        <div className="flex max-w-xl flex-1 flex-col gap-6">
          <h1 className="font-heading text-2xl font-bold leading-snug tracking-tight text-text md:text-3xl lg:text-[2.2rem]">
            {profile.tagline}
          </h1>
          <p className="text-lg leading-relaxed text-muted">
            {profile.summary}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#proof-of-work"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-text shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              View My Work
            </a>
            <a
              href="https://www.linkedin.com/in/niharika-arun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-2.5 text-sm font-semibold text-text transition-colors hover:border-primary"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Media column */}
        <div className="relative flex shrink-0 justify-center lg:justify-end">
          <HeroMedia callouts={callouts} />
        </div>
      </div>
    </section>
  );
}
