import { getProjects } from "@/lib/content";
import ProjectCard from "./ProjectCard";

export default function ProofOfWork() {
  const projects = getProjects();

  return (
    <section id="proof-of-work" className="bg-surface py-10 md:py-14">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text md:text-4xl">
          Projects
        </h2>
        <p className="mt-3 max-w-lg text-muted">
          Academic, analytical, and applied AI projects spanning SQL pipelines,
          visualization, predictive modeling, product analytics, and agent workflows.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
