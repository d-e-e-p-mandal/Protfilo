"use client";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(null);
  const menuRef = useRef(null);

  // Logo Animation Refs
  const pathRef = useRef(null);
  const dotRef = useRef(null);

  const navComponents = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  /* Smooth scroll using Lenis (UNCHANGED) */
  const handleNavClick = (id) => {
    setOpen(false);
    const section = document.getElementById(id);
    if (!section) return;
    if (window.lenis) {
      window.lenis.scrollTo(section, { offset: -80 });
    } else {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  /* ScrollSpy (UNCHANGED) */
  useEffect(() => {
    const triggers = [];
    navComponents.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (!section) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActive(id),
          onEnterBack: () => setActive(id),
        })
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  /* --- LOGO ANIMATION (UNCHANGED) --- */
  useEffect(() => {
    if (!pathRef.current || !dotRef.current) return;

    const anim = gsap.to(dotRef.current, {
      motionPath: {
        path: pathRef.current,
        align: pathRef.current,
        alignOrigin: [0.5, 0.5],
        autoRotate: false,
        start: 0,
        end: 1,
      },
      duration: 3,       
      repeat: -1,        
      yoyo: true,
      ease: "power1.inOut", 
    });

    return () => anim.kill();
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#030712]/40 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
      
      {/* UPDATED CONTAINER:
          1. max-w-[1800px]: Significantly wider container for large screens.
          2. lg:px-16 xl:px-24: Increased padding to push content to edges on desktop.
      */}
      <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 lg:px-16 xl:px-24 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">

        {/* Top Row: Logo & Hamburger */}
        <div className="flex items-center justify-between w-full sm:w-auto relative z-20">
          
          {/* --- LUXURY EMBLEM LOGO --- */}
          <div 
            className="cursor-pointer relative group" 
            onClick={() => handleNavClick('home')}
            aria-label="Deep Mandal Logo"
          >
            <div className="relative w-[50px] h-[50px] flex items-center justify-center">
              <svg 
                width="50" 
                height="50" 
                viewBox="0 0 60 60" 
                fill="none" 
                className="overflow-visible"
              >
                <defs>
                  <linearGradient id="badgeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>

                  <linearGradient id="logoGradient" x1="0" y1="0" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>

                  <filter id="shadowBlur" x="-50%" y="-50%" width="200%" height="200%">
                     <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                  </filter>

                  <filter id="logoGlow" x="-200%" y="-200%" width="500%" height="500%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feGaussianBlur stdDeviation="4" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Badge Frame */}
                <rect 
                  x="2" y="2" width="56" height="56" rx="12" 
                  stroke="white" strokeOpacity="0.1" strokeWidth="1" 
                  fill="url(#badgeGradient)"
                />

                {/* Back "D" (Shadow) */}
                <path 
                  d="M 18 15 L 18 45 L 30 45 Q 44 45 44 30 Q 44 15 30 15 Z"
                  stroke="#111827" 
                  strokeWidth="3"   
                  fill="none"
                  opacity="0.8"     
                  filter="url(#shadowBlur)" 
                  className="transition-all duration-300 group-hover:opacity-100 group-hover:stroke-[#1f2937]"
                />

                {/* Front "D" (Main Path) */}
                <path 
                  ref={pathRef}
                  d="M 13 12 L 13 42 L 26 42 Q 40 42 40 27 Q 40 12 26 12 Z"
                  stroke="url(#logoGradient)" 
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  fill="none"
                  className="transition-opacity"
                />

                {/* Glowing Dot */}
                <circle 
                  ref={dotRef}
                  r="3"
                  fill="#ffffff"
                  filter="url(#logoGlow)"
                />
              </svg>
            </div>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden flex flex-col justify-center items-center w-8 h-8 relative focus:outline-none"
          >
            <span className={`absolute h-0.5 w-6 bg-violet-400 rounded-full transition-all duration-300 ease-in-out ${open ? "rotate-45" : "-translate-y-2"}`} />
            <span className={`absolute h-0.5 w-6 bg-violet-400 rounded-full transition-all duration-300 ease-in-out ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute h-0.5 w-6 bg-violet-400 rounded-full transition-all duration-300 ease-in-out ${open ? "-rotate-45" : "translate-y-2"}`} />
          </button>
        </div>

        {/* Navigation Links */}
        <div 
          ref={menuRef}
          className={`
            w-full sm:w-auto overflow-hidden sm:overflow-visible transition-all duration-500 ease-in-out
            ${open ? "max-h-[300px] opacity-100 mt-4" : "max-h-0 opacity-0 sm:max-h-full sm:opacity-100 sm:mt-0"}
          `}
        >
          <ul className="flex flex-col items-center sm:flex-row sm:justify-end gap-4 sm:gap-6 pb-4 sm:pb-0">
            {navComponents.map(({ id, label }) => {
              const isActive = active === id;
              const isHover = hovered === id;

              return (
                <li key={id}>
                  <button
                    onClick={() => handleNavClick(id)}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    className={`
                      px-4 py-1.5 rounded-full border text-sm font-medium tracking-wide
                      transition-all duration-300 bg-transparent
                      ${
                        isHover
                          ? "text-white border-violet-400/50 shadow-[0_0_18px_rgba(139,92,246,0.35)]"
                          : isActive
                          ? "text-violet-400 border-violet-400/20 bg-white/5"
                          : "text-gray-400 border-transparent hover:text-white"
                      }
                    `}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}

