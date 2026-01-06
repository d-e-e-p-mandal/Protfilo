import { createBrowserRouter, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import SmoothScroll from "./components/SmoothScroll";

const Layout = () => (
  <SmoothScroll>
    <Navbar />
    <div className="bg-gradient-to-b from-[#0b0f1a] to-[#0f172a] text-gray-200">
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  </SmoothScroll>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);