import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjects, getProjectBySlug } from "@/lib/content";

const BG_MAP: Record<string, string> = {
  blue: "bg-pastel-blue",
  orange: "bg-pastel-orange",
  pink: "bg-pastel-pink",
  mint: "bg-pastel-mint",
  lavender: "bg-pastel-lavender",
};

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };
    return {
      title: `${project.title} – Niharika Arun`,
      description: project.description,
    };
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const bg = BG_MAP[project.color] ?? "bg-pastel-blue";

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className={`${bg} pb-12 pt-8`}>
        <div className="mx-auto max-w-[1100px] px-6">
          <Link
            href="/#proof-of-work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-text"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 8H3M7 12l-4-4 4-4" />
            </svg>
            Back to projects
          </Link>

          <h1 className="mt-6 font-heading text-3xl font-bold leading-tight tracking-tight text-text md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-muted">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-surface/70 px-3 py-1 text-xs font-medium text-text/80 shadow-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-[1100px] px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="font-heading text-xl font-bold text-text">
                Problem
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {project.problem}
              </p>
            </section>

            <section>
              <h2 className="font-heading text-xl font-bold text-text">
                Approach
              </h2>
              <p className="mt-3 leading-relaxed text-muted">
                {project.approach}
              </p>
              {project.approachBullets && project.approachBullets.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {project.approachBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted">
                      <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-pastel-lavender" />
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {project.systemDesign && (
              <section>
                <h2 className="font-heading text-xl font-bold text-text">
                  System Design
                </h2>
                <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-card">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {project.systemDesign.split(" -> ").map((step, i, arr) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="rounded-xl bg-pastel-lavender/50 px-4 py-2.5 text-center text-sm font-medium text-text">
                          {step.split("(")[0].trim()}
                          {step.includes("(") && (
                            <span className="mt-0.5 block text-[0.7rem] font-normal text-muted">
                              {step.match(/\(([^)]+)\)/)?.[1]}
                            </span>
                          )}
                        </div>
                        {i < arr.length - 1 && (
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-muted">
                            <path d="M5 10h10M12 7l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            <section>
              <h2 className="font-heading text-xl font-bold text-text">
                {project.nextSteps ? "Evaluation" : "Results"}
              </h2>
              <ul className="mt-3 space-y-2">
                {project.results.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-muted">
                    <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.nextSteps && project.nextSteps.length > 0 && (
              <section>
                <h2 className="font-heading text-xl font-bold text-text">
                  Next Steps
                </h2>
                <ul className="mt-3 space-y-2">
                  {project.nextSteps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted">
                      <span className="mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full bg-pastel-mint" />
                      <span className="leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="rounded-card border border-border bg-surface p-6 shadow-card">
              <h3 className="font-heading text-base font-bold text-text">
                Stack
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-pastel-lavender/50 px-3 py-1 text-xs font-medium text-text/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {project.links.length > 0 && (
              <div className="rounded-card border border-border bg-surface p-6 shadow-card">
                <h3 className="font-heading text-base font-bold text-text">
                  Links
                </h3>
                <ul className="mt-4 space-y-2">
                  {project.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-link underline underline-offset-2 hover:no-underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project._todo && project._todo.length > 0 && (
              <div className="rounded-card border border-dashed border-primary/40 bg-pastel-orange/20 p-6">
                <h3 className="text-sm font-bold text-text">TODOs</h3>
                <ul className="mt-2 space-y-1">
                  {project._todo.map((t, i) => (
                    <li key={i} className="text-xs text-muted">
                      • {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </main>

      {/* Footer nav */}
      <div className="border-t border-border bg-surface py-8">
        <div className="mx-auto max-w-[1100px] px-6">
          <Link
            href="/#proof-of-work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-text"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M13 8H3M7 12l-4-4 4-4" />
            </svg>
            All projects
          </Link>
        </div>
      </div>
    </div>
  );
}
