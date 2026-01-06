"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "AI-Based Tour Planner",
    description: "MERN app using Mapbox and Gemini AI for intelligent, personalized travel planning.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    tech: [
      { name: "React", symbol: "✦" },
      { name: "Gemini AI", symbol: "⬢" },
      { name: "Mapbox", symbol: "◈" },
      { name: "Node.js", symbol: "▣" },
      { name: "MongoDB", symbol: "⬢" },
    ],
  },
  {
    title: "Learning Management System",
    description: "Role-based LMS with secure authentication, course creation, payments, and enrollment.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tech: [
      { name: "React", symbol: "◈" },
      { name: "Express", symbol: "✦" },
      { name: "MongoDB", symbol: "⬢" },
      { name: "Redux", symbol: "▣" },
      { name: "Toastify", symbol: "▣" },
    ],
  },
];

export default function Projects() {
  const timelinePathRef = useRef(null);
  const headingRef = useRef(null); 

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // --- ANIMATE "PROJECTS" HEADING ---
    const headingChars = headingRef.current.querySelectorAll(".heading-char");
    gsap.fromTo(
      headingChars,
      { 
        y: 80, 
        opacity: 0,
        rotateX: -90 
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.05,
        duration: 1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // 1. TIMELINE DRAWING ANIMATION
    const path = timelinePathRef.current;
    const pathLength = path.getTotalLength();
    
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: "#projects-container",
        start: "top 80%",
        end: "bottom 80%",
        scrub: 1,
      },
    });

    // 2. PROJECT CARDS ENTRANCE
    const rows = document.querySelectorAll(".project-row-container");
    rows.forEach((row, i) => {
      const card = row.querySelector(".macbook-card");
      const info = row.querySelector(".info-box");
      const techItems = row.querySelectorAll(".tech-badge");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(card, 
        { opacity: 0, scale: 0.9, rotateX: -20, y: 50 }, 
        { opacity: 1, scale: 1, rotateX: 0, y: 0, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(info, 
        { opacity: 0, filter: "blur(10px)", y: 30 }, 
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.8 }, 
        "-=0.8"
      )
      .fromTo(techItems, 
        { scale: 0, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" },
        "-=0.4"
      );
    });

    return () => lenis.destroy();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 md:px-10 lg:px-20 overflow-hidden bg-[#030712]">
      {/* Animated Heading Structure */}
      <h2 ref={headingRef} className="text-3xl md:text-4xl font-semibold text-violet-400 mb-8 text-center tracking-tight overflow-hidden">
        {"Projects".split("").map((char, index) => (
          <span key={index} className="heading-char inline-block origin-bottom">
            {char}
          </span>
        ))}
      </h2>

      <div className="max-w-4xl mx-auto">
        <hr className="border-white/10" />
      </div>

      <div id="projects-container" className="relative max-w-7xl mx-auto pt-20">
        
        {/* CENTER TIMELINE */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 h-full z-0 pointer-events-none">
          <svg width="40" height="100%" viewBox="0 0 40 1200" preserveAspectRatio="none">
            <path 
              ref={timelinePathRef}
              d="M20 0 C 60 300, -20 700, 20 1200" 
              stroke="rgba(139,92,246,0.6)" 
              strokeWidth="2" 
              fill="none" 
            />
            {[0, 4, 8].map((delay) => (
              <circle key={delay} r="3" fill="rgb(167, 139, 250)">
                <animateMotion 
                  dur="10s" 
                  repeatCount="indefinite" 
                  path="M20 0 C 60 300, -20 700, 20 1200" 
                  begin={`${delay}s`} 
                />
              </circle>
            ))}
          </svg>
        </div>

        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, index) => (
            <div key={index} className="project-row-container perspective-1000">
              <ProjectRow project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }) {
  const isLeft = index % 2 === 0;

  return (
    <div className="flex flex-col md:grid md:grid-cols-2 items-center w-full relative group">
      <div 
        className={`w-full z-10 flex justify-center 
          ${isLeft 
            ? "md:justify-start lg:-ml-12" 
            : "md:justify-end lg:-mr-12 md:col-start-2"
          }`}
      >
        <ProjectCard project={project} index={index} />
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <div className="relative w-full max-w-lg">
      {/* MACBOOK CARD */}
      <div 
        tabIndex={0}
        /* ADDED: group, focus:outline-none, focus:border-violet... */
        className="macbook-card group bg-[#0f172a]/95 backdrop-blur-md rounded-xl border border-white/20 shadow-2xl overflow-hidden z-20 relative transition-all duration-500 hover:border-violet-500/40 focus:outline-none focus:border-violet-500/40 transform-gpu">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
          <div className="flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">
            Project.0{index + 1}
          </span>
          <div className="w-8" />
        </div>

        <div className="relative overflow-hidden group/img">
          {/* ADDED: group-focus:grayscale-0 group-focus:scale-110 */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-48 md:h-64 object-cover grayscale-[0.2] group-hover/img:grayscale-0 group-focus:grayscale-0 transition-all duration-1000 group-hover/img:scale-110 group-focus:scale-110"
          />
          {/* ADDED: group-focus:bg-black/10 */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center p-6 transition-all duration-500 group-hover/img:bg-black/10 group-focus:bg-black/10">
            <h3 className="text-xl md:text-2xl font-bold text-white text-center tracking-tight leading-tight">
              {project.title}
            </h3>
          </div>
        </div>
      </div>

      {/* INFO BOX */}
      <div className="info-box mt-4 md:mt-6 bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-xl px-6 py-7 md:px-8 md:py-8 shadow-2xl relative z-10 transition-all duration-500 hover:bg-white/[0.05] hover:border-white/20">
        
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
          {project.tech.map((item, i) => (
            <div 
              key={i} 
              tabIndex={0}
              /* ADDED: focus:outline-none focus:border... focus:bg... */
              className="tech-badge group/skill flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/5 bg-white/5 whitespace-nowrap transition-all hover:border-violet-500/50 hover:bg-violet-500/5 focus:outline-none focus:border-violet-500/50 focus:bg-violet-500/5"
            >
              {/* ADDED: group-focus/skill:animate-pulse */}
              <span className="text-violet-400 text-[10px] group-hover/skill:animate-pulse group-focus/skill:animate-pulse">
                {item.symbol}
              </span>
              {/* ADDED: group-focus/skill:text-white */}
              <span className="text-gray-400 text-[10px] md:text-[11px] font-semibold tracking-wide group-hover/skill:text-white group-focus/skill:text-white transition-colors">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        <p className="text-sm md:text-[15px] text-gray-400 leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          {/* ADDED: focus:outline-none focus:text-violet-400 and group-focus translation */}
          <a href="#" className="group/link flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-gray-500 hover:text-violet-400 focus:outline-none focus:text-violet-400 transition-all">
            Source Code <span className="text-violet-500 transition-transform group-hover/link:translate-x-1.5 group-focus/link:translate-x-1.5">→</span>
          </a>
          <a href="#" className="group/link flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-gray-500 hover:text-violet-400 focus:outline-none focus:text-violet-400 transition-all">
            View Project <span className="text-violet-500 transition-transform group-hover/link:translate-x-1.5 group-focus/link:translate-x-1.5">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}