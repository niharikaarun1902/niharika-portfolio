import { getSkills } from "@/lib/content";

const CARD_STYLES = [
  { bg: "bg-pastel-blue/40", accent: "bg-pastel-blue", icon: "📊" },
  { bg: "bg-pastel-pink/40", accent: "bg-pastel-pink", icon: "🤖" },
  { bg: "bg-pastel-orange/40", accent: "bg-pastel-orange", icon: "🔧" },
];

export default function CoreToolkit() {
  const categories = getSkills();

  return (
    <section id="core-toolkit" className="bg-bg py-10 md:py-14">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text md:text-4xl">
          Core Toolkit
        </h2>
        <p className="mt-3 max-w-lg text-muted">
          Technologies and competencies I work with daily.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((cat, i) => {
            const style = CARD_STYLES[i % CARD_STYLES.length];
            return (
              <div
                key={cat.id}
                className={`relative flex flex-col rounded-[20px] border border-border/50 ${style.bg} p-6 shadow-card transition-shadow hover:shadow-lg`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${style.accent} text-base`}
                  >
                    {style.icon}
                  </span>
                  <h3 className="font-heading text-[0.95rem] font-bold leading-snug text-text">
                    {cat.title}
                  </h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/40 bg-surface/80 px-3 py-1 text-[0.78rem] font-medium text-text/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
