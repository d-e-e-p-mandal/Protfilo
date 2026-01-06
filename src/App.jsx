import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SmoothScroll from "./components/SmoothScroll";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <div className="bg-gradient-to-b from-[#0b0f1a] to-[#0f172a] text-gray-200">
          <Navbar />
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </SmoothScroll>

      {/* 🔁 Redirect ALL routes to Home */}
      <Routes>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}