import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SmoothScroll from "./components/SmoothScroll";

export default function App() {
  return (
    <SmoothScroll>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="bg-gradient-to-b from-[#0b0f1a] to-[#0f172a] text-gray-200">
              <Home />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </div>
          }
        />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SmoothScroll>
  );
}