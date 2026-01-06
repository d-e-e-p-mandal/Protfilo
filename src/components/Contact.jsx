"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import whatsappLogo from "../assets/whatsapp.svg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const sectionRef = useRef(null);
  const waIconRef = useRef(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
      });

      // Header Animation
      tl.fromTo(".contact-title", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" })
        .fromTo(".contact-desc", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.6");

      // Slide-in Animations
      tl.fromTo(".contact-left", 
        { x: -50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
        "-=0.4"
      )
      .fromTo(".contact-right", 
        { x: 50, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 
        "-=0.6"
      );

      // Floating WhatsApp Logo
      gsap.to(waIconRef.current, {
        y: -15,
        rotation: 5,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // --- Handlers ---

  const handleEmailSend = (e) => {
    e.preventDefault();
    const subject = `Portfolio Message from ${formData.name}`;
    const body = `Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
    window.location.href = `mailto:deepmandal9091@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleWhatsAppSend = () => {
    const text = `Hi Deep, I'm ${formData.name}. ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/916294112120?text=${encodedText}`, "_blank");
  };

  const handleSmsSend = () => {
    const text = `Hi Deep, I'm ${formData.name}. ${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.location.href = `sms:+916294112120?body=${encodedText}`;
  };

  return (
    <section ref={sectionRef} id="contact" className="relative py-24 px-6 md:px-20 bg-[#030712] overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl md:text-6xl font-black text-white mb-6">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Connect</span>
          </h2>
          <p className="contact-desc text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
            {/* Have a project in mind or just want to say hi? <br/> */}
            Choose the way you want to reach out.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          
          {/* Left Side: Contact Cards */}
          <div className="contact-left space-y-6">
            
            {/* 1. WhatsApp Card */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-br from-green-500/20 to-transparent hover:from-green-500/40 transition-all duration-500">
              <div className="relative bg-[#0a0f1c]/80 backdrop-blur-xl p-6 rounded-[22px] border border-green-500/20 group-hover:border-green-500/40 transition-all">
                <div className="flex items-center gap-6">
                  <div className="relative w-14 h-14 flex-shrink-0">
                    <div className="absolute inset-0 bg-green-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 animate-pulse"></div>
                    <img 
                      ref={waIconRef}
                      src= {whatsappLogo}
                      alt="WhatsApp" 
                      className="relative w-full h-full drop-shadow-2xl"
                    />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold">WhatsApp</h3>
                    <p className="text-gray-400 text-sm mb-2">Instant Chat</p>
                    <a href="https://wa.me/916294112120" target="_blank" rel="noopener noreferrer" className="text-green-400 font-bold text-xs uppercase tracking-widest hover:text-green-300">
                      Chat Now →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SMS Card */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-br from-blue-500/20 to-transparent hover:from-blue-500/40 transition-all duration-500">
              <div className="relative bg-[#0a0f1c]/80 backdrop-blur-xl p-6 rounded-[22px] border border-blue-500/20 group-hover:border-blue-500/40 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    💬
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold">Text Message</h3>
                    <p className="text-gray-400 text-sm mb-2">Direct Mobile SMS</p>
                    <a href="sms:+916294112120" className="text-blue-400 font-bold text-xs uppercase tracking-widest hover:text-blue-300">
                      Send SMS →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Email Card (Now Interactive!) */}
            <div className="group relative p-1 rounded-3xl bg-gradient-to-br from-violet-500/20 to-transparent hover:from-violet-500/40 transition-all duration-500">
              <div className="relative bg-[#0a0f1c]/80 backdrop-blur-xl p-6 rounded-[22px] border border-violet-500/20 group-hover:border-violet-500/40 transition-all">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 text-2xl group-hover:bg-violet-500 group-hover:text-white transition-all duration-300">
                    ✉️
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold">Email</h3>
                    <p className="text-gray-400 text-sm mb-2">Direct Mail</p>
                    <a href="mailto:deepmandal9091@gmail.com" className="text-violet-400 font-bold text-xs uppercase tracking-widest hover:text-violet-300">
                      Send Email →
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Unified Form */}
          <div className="contact-right relative">
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-b from-white/10 to-transparent opacity-50 blur-sm pointer-events-none"></div>
            
            <div className="relative bg-[#0a0f1c] p-8 md:p-10 rounded-[30px] border border-white/10 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send Message</h3>
              
              <form onSubmit={handleEmailSend} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all"
                    placeholder="Your Name"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all"
                    placeholder="you@example.com"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message</label>
                  <textarea
                    required
                    rows="3"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all resize-none"
                    placeholder="Type your message..."
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                {/* --- Action Buttons Grid --- */}
                <div className="grid grid-cols-2 gap-3 pt-3">
                  
                  {/* Primary: Email */}
                  <button
                    type="submit"
                    className="col-span-2 w-full bg-white text-black font-bold py-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <span>Send via Email</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>

                  {/* Secondary: WhatsApp */}
                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="bg-green-600/10 border border-green-500/30 text-green-400 font-bold py-3 rounded-xl transition-all hover:bg-green-600 hover:text-white flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    WhatsApp
                  </button>

                  {/* Secondary: SMS */}
                  <button
                    type="button"
                    onClick={handleSmsSend}
                    className="bg-blue-600/10 border border-blue-500/30 text-blue-400 font-bold py-3 rounded-xl transition-all hover:bg-blue-600 hover:text-white flex items-center justify-center gap-2 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    SMS
                  </button>

                </div>
              </form>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} Deep Mandal 
          </p>
        </div>

      </div>
    </section>
  );
}