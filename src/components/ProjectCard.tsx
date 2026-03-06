import type { Project } from "@/types/content";

const BG_MAP: Record<string, string> = {
  blue: "bg-pastel-blue",
  orange: "bg-pastel-orange",
  pink: "bg-pastel-pink",
  mint: "bg-pastel-mint",
  lavender: "bg-pastel-lavender",
};

export default function ProjectCard({ project }: { project: Project }) {
  const bg = BG_MAP[project.color] ?? "bg-pastel-blue";

  return (
    <article
      className={`group flex flex-col justify-between rounded-card p-7 shadow-card transition-shadow hover:shadow-lg ${bg}`}
    >
      <div>
        <h3 className="font-heading text-xl font-bold leading-snug text-text">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
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
    </article>
  );
}
