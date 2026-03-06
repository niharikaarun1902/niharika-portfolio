import { getExperience, getEducation } from "@/lib/content";

function BriefcaseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <path d="M2 12h20" />
    </svg>
  );
}

function GradCapIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10l-10-5L2 10l10 5 10-5z" />
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
      <path d="M22 10v6" />
    </svg>
  );
}

function computeDuration(start: string, end: string): string {
  const months: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const parse = (s: string) => {
    if (s === "Present") return new Date();
    const [m, y] = s.split(" ");
    return new Date(parseInt(y), months[m] ?? 0);
  };
  const s = parse(start);
  const e = parse(end);
  const totalMonths = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (totalMonths >= 12) {
    const years = Math.floor(totalMonths / 12);
    const rem = totalMonths % 12;
    return rem > 0 ? `${years} yr${years > 1 ? "s" : ""} ${rem} mo` : `${years} yr${years > 1 ? "s" : ""}`;
  }
  return `${totalMonths} mo${totalMonths !== 1 ? "s" : ""}`;
}

export default function ProgressMap() {
  const experience = getExperience();
  const education = getEducation();

  return (
    <section id="progress-map" className="bg-bg py-10 md:py-14">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text md:text-4xl">
          The Path So Far
        </h2>
        <p className="mt-3 max-w-lg text-muted">
          My journey through academia and industry.
        </p>

        {/* ── Education ── */}
        <div className="mt-8">
          <h3 className="mb-8 flex items-center gap-2 font-heading text-xl font-bold text-text">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-lavender text-link">
              <GradCapIcon />
            </span>
            Education
          </h3>

          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-pastel-lavender/80 md:block" aria-hidden="true" />

            <div className="space-y-6">
              {education.map((edu) => (
                <div key={edu.id} className="relative flex items-start gap-5 md:ml-6">
                  <div className="absolute -left-6 top-5 hidden h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-pastel-lavender bg-surface md:block" aria-hidden="true" />

                  <div className="flex w-full overflow-hidden rounded-card bg-pastel-lavender/30 shadow-card transition-shadow hover:shadow-lg md:ml-6">
                    <div className="hidden w-1.5 shrink-0 bg-pastel-lavender md:block" />

                    <div className="flex flex-1 items-start gap-4 p-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pastel-lavender/60 text-link">
                        <GradCapIcon />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-heading text-lg font-bold leading-snug text-text">
                          {edu.degree}, {edu.field}
                        </h4>
                        <p className="mt-0.5 text-sm text-muted">
                          {edu.institution}
                        </p>
                        <p className="mt-0.5 text-xs text-muted/70">
                          {edu.startDate} – {edu.endDate} &middot; {edu.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Work Experience ── */}
        <div className="mt-20">
          <h3 className="mb-8 flex items-center gap-2 font-heading text-xl font-bold text-text">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pastel-blue text-link">
              <BriefcaseIcon />
            </span>
            Work Experience
          </h3>

          <div className="relative">
            <div className="absolute left-6 top-0 hidden h-full w-0.5 bg-pastel-blue/80 md:block" aria-hidden="true" />

            <div className="space-y-6">
              {experience.map((exp) => {
                return (
                  <div key={exp.id} className="relative flex items-start gap-5 md:ml-6">
                    <div className="absolute -left-6 top-5 hidden h-4 w-4 -translate-x-1/2 rounded-full border-[3px] border-pastel-blue bg-surface md:block" aria-hidden="true" />

                    <div className="flex w-full overflow-hidden rounded-card bg-pastel-blue/30 shadow-card transition-shadow hover:shadow-lg md:ml-6">
                      <div className="hidden w-1.5 shrink-0 bg-pastel-blue md:block" />

                      <div className="flex w-full flex-col p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pastel-blue/60 text-link">
                            <BriefcaseIcon />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-heading text-lg font-bold leading-snug text-text">
                              {exp.title}
                            </h4>
                            <p className="mt-0.5 text-sm text-muted">
                              {exp.company}
                            </p>
                            <p className="text-xs text-muted/70">
                              {exp.startDate} – {exp.endDate} &middot; {exp.location}
                            </p>
                          </div>
                        </div>

                        {exp.bullets.length > 0 && (
                          <ul className="mt-4 space-y-2 pl-16">
                            {exp.bullets.map((b, i) => (
                              <li
                                key={i}
                                className="border-l-2 border-primary/50 pl-3 text-sm leading-relaxed text-muted"
                              >
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}

                        {exp.skills.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-1.5 pl-16">
                            {exp.skills.map((s) => (
                              <span
                                key={s}
                                className="rounded-full bg-pastel-orange/50 px-2.5 py-0.5 text-[11px] font-medium text-text/80"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
