import MatterBackground from "./MatterBackground";
import Hero from "./Hero";

export default function Home() {
  return (
    <section
      id="home"
      className="relative h-[70vh] overflow-hidden flex items-center justify-center"
    >
      {/* Animated Background */}
      <MatterBackground />

      <Hero />

    </section>
  );
}