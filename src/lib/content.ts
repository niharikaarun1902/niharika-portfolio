import { readFileSync } from "fs";
import path from "path";
import type {
  Profile,
  Experience,
  Project,
  SkillCategory,
  Education,
  Certification,
  Interest,
  HeroCallout,
  TimelineEntry,
  Story,
} from "@/types/content";

function read<T>(file: string): T {
  const raw = readFileSync(
    path.join(process.cwd(), "content", file),
    "utf-8",
  );
  return JSON.parse(raw) as T;
}

export function getProfile(): Profile {
  return read<Profile>("profile.json");
}

export function getExperience(): Experience[] {
  return read<Experience[]>("experience.json");
}

export function getProjects(): Project[] {
  return read<Project[]>("projects.json");
}

export function getSkills(): SkillCategory[] {
  return read<SkillCategory[]>("skills.json");
}

export function getEducation(): Education[] {
  return read<Education[]>("education.json");
}

export function getCertifications(): Certification[] {
  return read<Certification[]>("certifications.json");
}

export function getInterests(): Interest[] {
  return read<Interest[]>("interests.json");
}

export function getHeroCallouts(): HeroCallout[] {
  return read<HeroCallout[]>("hero_callouts.json");
}

export function getStories(): Story[] {
  return read<Story[]>("stories.json");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

const MONTH_MAP: Record<string, number> = {
  Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6,
  Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12,
};

function parseDateToSortKey(dateStr: string): number {
  if (dateStr === "Present") return 999999;
  const parts = dateStr.split(" ");
  if (parts.length === 2) {
    const month = MONTH_MAP[parts[0]] ?? 1;
    const year = parseInt(parts[1], 10);
    return year * 100 + month;
  }
  return 0;
}

export function getTimeline(): TimelineEntry[] {
  const entries: TimelineEntry[] = [];

  for (const exp of getExperience()) {
    entries.push({
      date: `${exp.startDate} – ${exp.endDate}`,
      sortKey: parseDateToSortKey(exp.startDate),
      type: "work",
      title: exp.title,
      subtitle: exp.company,
      description: exp.bullets[0],
      skills: exp.skills,
    });
  }

  for (const edu of getEducation()) {
    entries.push({
      date: `${edu.startDate} – ${edu.endDate}`,
      sortKey: parseDateToSortKey(edu.startDate),
      type: "education",
      title: `${edu.degree}, ${edu.field}`,
      subtitle: edu.institution,
    });
  }

  for (const cert of getCertifications()) {
    entries.push({
      date: cert.issuedDate,
      sortKey: parseDateToSortKey(cert.issuedDate),
      type: "certification",
      title: cert.title,
      subtitle: cert.issuer,
    });
  }

  entries.sort((a, b) => b.sortKey - a.sortKey);
  return entries;
}
