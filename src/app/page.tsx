import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProgressMap from "@/components/ProgressMap";
import ProofOfWork from "@/components/ProofOfWork";
import ProblemSolvingStories from "@/components/ProblemSolvingStories";
import CoreToolkit from "@/components/CoreToolkit";
import OutsideTerminal from "@/components/OutsideTerminal";
import ReachOut from "@/components/ReachOut";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProgressMap />
        <ProofOfWork />
        <ProblemSolvingStories />
        <CoreToolkit />
        <OutsideTerminal />
        <ReachOut />
      </main>
      <Footer />
    </>
  );
}
