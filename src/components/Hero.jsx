import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import resumePdf from "../assets/Deep_Resume.pdf";

import download from "../assets/download.svg";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import leetcode from "../assets/leetcode.svg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

/* ----------------------------------------
   Reusable Glow Orbit Button
----------------------------------------- */
function GlowOrbitButton({ label, href, download, icon }) {
  const dotRef = useRef(null);
  const pathRef = useRef(null);
  const btnRef = useRef(null);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const update = () => {
      if (!btnRef.current) return;
      const { width, height } = btnRef.current.getBoundingClientRect();
      setBox({ w: width, h: height });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!dotRef.current || !pathRef.current || box.w === 0) return;

    gsap.to(dotRef.current, {
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
      },
      duration: 4,
      repeat: -1,
      ease: "linear",
    });
  }, [box]);

  const id = label.replace(/\s+/g, "");

  return (
    <div className="relative w-fit">
      {/* SVG ORBIT */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        width={box.w}
        height={box.h}
        viewBox={`0 0 ${box.w} ${box.h}`}
      >
        <path
          ref={pathRef}
          d={`M12 2 H${box.w - 12} A12 12 0 0 1 ${box.w - 2} 12 V${box.h - 12} 
              A12 12 0 0 1 ${box.w - 12} ${box.h - 2} H12 
              A12 12 0 0 1 2 ${box.h - 12} V12 
              A12 12 0 0 1 12 2 Z`}
          fill="none"
        />

        <circle
          ref={dotRef}
          r="2.2"
          fill={`url(#grad-${id})`}
          filter={`url(#glow-${id})`}
          style={{ pointerEvents: "none" }}
        />

        <defs>
          <radialGradient id={`grad-${id}`}>
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#a78bfa" />
          </radialGradient>

          <filter id={`glow-${id}`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="8" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* BUTTON */}
      <a
        ref={btnRef}
        href={href}
        download={download}
        target={!download ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="
          flex items-center justify-center
          px-8 py-4 rounded-xl
          border border-violet-500/30
          text-white text-sm font-bold
          uppercase tracking-[0.2em]
          transition-all duration-500
          hover:border-violet-500
          hover:-translate-y-1
        "
      >
        {icon && (
          <img
            src={icon}
            alt={label}
            className="w-5 h-5 mr-3 opacity-90"
          />
        )}
        {label}
      </a>
    </div>
  );
}

/* ----------------------------------------
   Hero Component
----------------------------------------- */
export default function Hero() {
  const textRef = useRef(null);
  const nameChars = "Deep Mandal".split("");

  /* Typewriter */
  useEffect(() => {
    const roles = ["Full-Stack MERN Developer", "MCA Student", "Problem Solver"];
    let i = 0, j = 0, del = false;

    const tick = () => {
      if (!textRef.current) return;
      const word = roles[i];
      if (!del) {
        textRef.current.textContent = word.slice(0, j++);
        if (j > word.length) setTimeout(() => (del = true), 1600);
      } else {
        textRef.current.textContent = word.slice(0, j--);
        if (j < 0) {
          del = false;
          i = (i + 1) % roles.length;
        }
      }
    };

    const timer = setInterval(tick, del ? 70 : 120);
    return () => clearInterval(timer);
  }, []);

  /* GSAP Entrance */
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".intro-text",
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        ".name-char",
        { y: 40, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .fromTo(
        ".animate-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
        "-=0.4"
      );
  }, []);

  return (
    <section className="min-h-screen flex items-center px-6 overflow-hidden">
      {/* Shimmer style (TEXT ONLY) */}
      <style>{`
        @keyframes shimmerText {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .text-shimmer {
          background: linear-gradient(
            to right,
            #8b5cf6 20%,
            #ffffff 50%,
            #8b5cf6 80%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmerText 12s linear infinite;
        }
      `}</style>

      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <p className="intro-text text-violet-400 font-mono tracking-widest text-sm opacity-0">
          WELCOME TO MY PORTFOLIO
        </p>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          <span className="intro-text inline-block opacity-0 mr-4">
            Hi, I&apos;m
          </span>
          <span>
            {nameChars.map((char, i) => (
              <span
                key={i}
                className="name-char text-shimmer inline-block opacity-0"
                style={{
                  marginRight: char === " " ? "0.3em" : "0",
                  transformOrigin: "bottom center",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        <p className="animate-content text-gray-400 text-xl font-mono h-8 opacity-0">
          <span ref={textRef} className="text-white font-medium" />
          <span className="ml-1 text-violet-500 animate-pulse">|</span>
        </p>

        <div className="animate-content flex flex-wrap gap-6 mt-6 opacity-0">
  <GlowOrbitButton
    label="Download CV"
    href={resumePdf}
    download
    icon={download}
  />
  <GlowOrbitButton
    label="GitHub"
    href="https://github.com/d-e-e-p-mandal"
    icon={github}
  />
  <GlowOrbitButton
    label="LinkedIn"
    href="https://www.linkedin.com/in/d-e-e-p-mandal/"
    icon={linkedin}
  />
  <GlowOrbitButton
    label="LeetCode"
    href="https://leetcode.com/u/d_e_e_p_mandal"
    icon={leetcode}
  />
</div>
      </div>
    </section>
  );
}
