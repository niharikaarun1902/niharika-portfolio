import { getProfile } from "@/lib/content";

export default function Footer() {
  const profile = getProfile();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-3 px-6 text-center">
        <p className="text-sm text-muted">
          &copy; {year} {profile.name}. Built with Next.js &amp; Tailwind CSS.
        </p>
        <div className="flex gap-4">
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted underline-offset-2 hover:text-link hover:underline"
            >
              LinkedIn
            </a>
          )}
          <a
            href="/resume"
            className="text-xs text-muted underline-offset-2 hover:text-link hover:underline"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}
