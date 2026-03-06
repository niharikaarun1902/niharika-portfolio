import { getStories } from "@/lib/content";
import StoryCardInteractive from "./StoryCardInteractive";

export default function ProblemSolvingStories() {
  const stories = getStories();

  return (
    <section id="problem-solving" className="bg-bg py-10 md:py-14">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text md:text-4xl">
          Problem Solving Stories
        </h2>
        <p className="mt-3 mb-12 max-w-lg text-muted">
          The problems that shaped how I build.
        </p>

        <div className="flex flex-col gap-14">
          {stories.map((story, i) => (
            <StoryCardInteractive key={story.id} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
