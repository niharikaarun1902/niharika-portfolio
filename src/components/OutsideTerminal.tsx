import { getInterests } from "@/lib/content";
import InterestCard from "./InterestCard";

export default function OutsideTerminal() {
  const interests = getInterests();

  return (
    <section id="outside-terminal" className="bg-surface py-10 md:py-14">
      <div className="mx-auto max-w-[1100px] px-6">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-text md:text-4xl">
          Off the Clock
        </h2>
        <p className="mt-3 max-w-lg text-muted">
          The interests that keep me curious and balanced.
        </p>

        <div className="mx-auto mt-12 grid max-w-[680px] gap-8 sm:grid-cols-2">
          {interests.map((item, i) => (
            <InterestCard key={item.id} interest={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
