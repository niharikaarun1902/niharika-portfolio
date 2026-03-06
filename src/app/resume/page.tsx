import { existsSync } from "fs";
import path from "path";
import Link from "next/link";
import { getProfile, getExperience, getEducation, getCertifications } from "@/lib/content";
import { assetUrl } from "@/lib/assets";

export const metadata = {
  title: "Resume – Niharika Arun",
  description: "Download or view Niharika Arun's resume.",
};

export default function ResumePage() {
  const profile = getProfile();
  const experience = getExperience();
  const education = getEducation();
  const certifications = getCertifications();
  const pdfExists = existsSync(path.join(process.cwd(), "public", "assets", "Niharika-Arun-Resume.pdf"));

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-border bg-surface py-4">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6">
          <Link
            href="/"
            className="font-heading text-xl font-semibold tracking-tight text-text"
          >
            NA<span className="text-primary">.</span>
          </Link>
          {pdfExists ? (
            <a
              href={assetUrl("/assets/Niharika-Arun-Resume.pdf")}
              download
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-text transition-transform hover:scale-[1.03]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-primary/40 px-5 py-2 text-sm text-muted">
              TODO: Add resume.pdf to public/
            </span>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 py-16">
        {/* Name + Summary */}
        <div className="mb-12">
          <h1 className="font-heading text-3xl font-bold text-text md:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-sm text-muted">{profile.headline}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted">
            {profile.summary}
          </p>
        </div>

        <div className="grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-14">
            {/* Experience */}
            <section>
              <h2 className="mb-6 font-heading text-xl font-bold text-text">
                Experience
              </h2>
              <div className="space-y-8">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-semibold text-text">{exp.title}</h3>
                      <span className="text-sm text-muted">{exp.company}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted">
                      {exp.startDate} – {exp.endDate} · {exp.location}
                    </p>
                    <ul className="mt-2 space-y-1">
                      {exp.bullets.map((b, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <section>
              <h2 className="mb-4 font-heading text-xl font-bold text-text">
                Education
              </h2>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="text-sm font-semibold text-text">
                      {edu.degree}, {edu.field}
                    </h3>
                    <p className="text-sm text-muted">{edu.institution}</p>
                    <p className="text-xs text-muted/70">
                      {edu.startDate} – {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 font-heading text-xl font-bold text-text">
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <h3 className="text-sm font-semibold text-text">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-muted">
                      {cert.issuer} · {cert.issuedDate}
                      {cert.expiryDate ? ` – ${cert.expiryDate}` : ""}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
