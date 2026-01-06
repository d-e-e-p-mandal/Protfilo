"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import cLogo from "../assets/c.svg";
import cppLogo from "../assets/cpp.svg";
import javaLogo from "../assets/java.svg";
import jsLogo from "../assets/javascript.svg";

import htmlLogo from "../assets/html.svg";
import cssLogo from "../assets/css.svg";
import reactLogo from "../assets/react.svg";
import tailwindLogo from "../assets/tailwind.svg";

import nodeLogo from "../assets/nodejs.svg";
import expressLogo from "../assets/express.svg";

import mongoLogo from "../assets/mongodb.svg";
import sqlLogo from "../assets/sql.svg";

import gitLogo from "../assets/git.svg";
import githubLogo from "../assets/github.svg";
import vscodeLogo from "../assets/vscode.svg";
import postmanLogo from "../assets/postman.svg";

gsap.registerPlugin(ScrollTrigger);

/* =========================
   SKILLS (CATEGORIZED)
========================= */
const skillSets = {
  languages: [
    { name: "C", logo: cLogo },
    { name: "C++", logo: cppLogo },
    { name: "Java", logo: javaLogo },
    { name: "JavaScript", logo: jsLogo },
  ],
  frontend: [
    { name: "HTML", logo: htmlLogo },
    { name: "CSS", logo: cssLogo },
    { name: "React", logo: reactLogo },
    { name: "Tailwind", logo: tailwindLogo },
  ],
  backend: [
    { name: "Node.js", logo: nodeLogo },
    { name: "Express", logo: expressLogo },
  ],
  databases: [
    { name: "MongoDB", logo: mongoLogo },
    { name: "SQL", logo: sqlLogo },
  ],
  tools: [
    { name: "Git", logo: gitLogo },
    { name: "GitHub", logo: githubLogo },
    { name: "VS Code", logo: vscodeLogo },
    { name: "Postman", logo: postmanLogo },
  ],
};

const skills = Object.values(skillSets).flat();

export default function Skills() {
  const sectionRef = useRef(null);
  const globeRef = useRef(null);
  const q = gsap.utils.selector(sectionRef);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* 1. LEFT SIDE ENTRANCE (UNCHANGED) */
      gsap.from(q(".tech-ecosystem"), {
        opacity: 0,
        y: 40,
        letterSpacing: "0.3em",
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      gsap.from(q(".skill-item-left"), {
        opacity: 0,
        x: -50,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      /* 2. RIGHT SIDE CONTINUOUS ORBIT (NO ENTRANCE ANIMATION) */
      // The globe is visible immediately. We just start the spinning loop.
      
      gsap.to(q(".orbit-container"), {
        rotate: 360,
        duration: 50, // Slow continuous rotation
        repeat: -1,
        ease: "linear",
      });

      gsap.to(q(".orbit-item-wrapper"), {
        rotate: -360, // Counter-rotate to keep icons upright
        duration: 50,
        repeat: -1,
        ease: "linear",
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 px-6 md:px-20 bg-[#030712] overflow-hidden relative"
    >
      {/* Shimmer CSS */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background: linear-gradient(to right, #a78bfa 20%, #ffffff 50%, #a78bfa 80%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">

        {/* LEFT SIDE (Unchanged) */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="tech-ecosystem text-4xl md:text-5xl font-bold text-white tracking-tight">
              Tech <span className="text-violet-500 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">Ecosystem</span>
            </h2>
            <p className="text-gray-400 max-w-md">
              Specialized in the MERN stack and high-performance algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-item-left group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl blur opacity-0 group-hover:opacity-25 transition duration-500" />
                <div className="relative flex items-center gap-4 p-4 rounded-xl bg-[#0a1128]/60 border border-white/5 backdrop-blur-sm group-hover:border-violet-500/50 transition-all">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/10">
                    <img src={skill.logo} alt={skill.name} className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 font-semibold text-sm">{skill.name}</p>
                    <div className="h-[1px] w-full bg-white/5 mt-2 overflow-hidden">
                      <div className="h-full w-full bg-violet-500 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE (Visible Immediately, Continuous Orbit) */}
        <div className="relative flex justify-center items-center h-[500px]">
          {/* Background Pulsing Glow */}
          <div className="absolute w-[300px] h-[300px] bg-violet-600/15 blur-[100px] rounded-full animate-pulse" />

          {/* Center Globe */}
          <div
            ref={globeRef}
            className="relative w-44 h-44 md:w-56 md:h-56 rounded-full border border-violet-500/20 bg-violet-950/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(139,92,246,0.1)] transition-all duration-500 hover:shadow-[0_0_80px_rgba(139,92,246,0.3)] hover:scale-105"
          >
            <span className="animate-shimmer text-3xl md:text-4xl font-black tracking-[0.2em] pointer-events-none">
              DSA
            </span>

            {/* Orbit Container (Already Visible) */}
            <div className="orbit-container absolute inset-0 w-full h-full">
              {skills.map((skill, i) => {
                const angle = (360 / skills.length) * i;
                const radius = 180;
                return (
                  <div
                    key={skill.name}
                    style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` }}
                    className="orbit-item-wrapper absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    {/* Icon Container (Hover effects maintained) */}
                    <div 
                      className="
                        w-14 h-14 p-3 rounded-2xl bg-[#0a1128] border border-white/10 
                        flex items-center justify-center cursor-pointer 
                        transition-all duration-300 ease-out
                        hover:scale-150 hover:border-violet-500 hover:bg-violet-950/50 hover:z-50 hover:shadow-[0_0_20px_rgba(139,92,246,0.6)]
                      "
                      title={skill.name}
                    >
                      <img src={skill.logo} alt={skill.name} className="w-full h-full object-contain" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}