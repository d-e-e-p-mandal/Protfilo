"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const content = `I am a motivated MCA student and full-stack developer with a strong foundation in data structures, algorithms, and modern web development. I specialize in building scalable, clean, and user-centric applications using the MERN stack. I enjoy solving real-world problems, writing maintainable code, and continuously improving my technical skills while building performant, thoughtful digital experiences.`;

export default function About() {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Scroll Reveal (Staggered Fade In)
      gsap.from(wordsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.01, // Very fast stagger for a "typewriter" feel
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleHover = (index) => {
    // Animate the specific word being hovered
    gsap.to(wordsRef.current[index], {
      color: "#a78bfa", // Violet-400
      y: -5,
      scale: 1.2,
      textShadow: "0 0 15px rgba(167,139,250, 0.5)",
      duration: 0.3,
      ease: "back.out(2)",
    });

    // Optional: Animate neighbors for a "liquid" feel
    if (index > 0) gsap.to(wordsRef.current[index - 1], { color: "#fff", y: -2, duration: 0.3 });
    if (index < wordsRef.current.length - 1) gsap.to(wordsRef.current[index + 1], { color: "#fff", y: -2, duration: 0.3 });
  };

  const handleLeave = (index) => {
    // Reset word to original state
    gsap.to(wordsRef.current[index], {
      color: "#9ca3af", // Gray-400
      y: 0,
      scale: 1,
      textShadow: "none",
      duration: 0.3,
      ease: "power2.out",
    });

    // Reset neighbors
    if (index > 0) gsap.to(wordsRef.current[index - 1], { color: "#9ca3af", y: 0, duration: 0.3 });
    if (index < wordsRef.current.length - 1) gsap.to(wordsRef.current[index + 1], { color: "#9ca3af", y: 0, duration: 0.3 });
  };

  return (
    <section ref={containerRef} id="about" className="py-32 px-6 md:px-20 bg-[#030712]">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-violet-400 mb-12 tracking-tight">
          About Me
        </h2>

        {/* The Text Container */}
        <p className="text-xl md:text-2xl leading-relaxed font-medium">
          {content.split(" ").map((word, i) => (
            <span
              key={i}
              ref={(el) => (wordsRef.current[i] = el)}
              className="inline-block cursor-default mr-2 text-gray-400 transition-colors"
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => handleLeave(i)}
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}