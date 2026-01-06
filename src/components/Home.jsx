import MatterBackground from "./MatterBackground";
import Hero from "./Hero";

export default function Home() {
  return (
    <section
      id="home"
      className="
        relative
        w-full
        min-h-[750px]
        h-screen
        overflow-hidden
        flex items-center justify-center
      "
    >
      {/* Animated Background */}
      <MatterBackground />

      {/* Hero Content */}
      <Hero />
    </section>
  );
}