"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full px-4 sm:px-6 transition-all duration-300 py-4 ${
        scrolled
          ? "bg-pink-400 text-white"
          : "bg-white shadow-sm border-b" 
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <a
          href="#home"
          className={`font-bold transition-all duration-300 ${
            scrolled ? "text-2xl tracking-wide" : "text-3xl text-pink-500"
          }`}
        >
          CCCN
        </a>
        <nav className="space-x-2 sm:space-x-4 text-sm sm:text-base">
          <a
            href="#people"
            className={`relative inline-block px-1 py-1
              after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5
              after:transition-all after:duration-300
              after:w-0 hover:after:w-full
              ${scrolled ? "after:bg-white" : "after:bg-pink-400"}`}
          >
            People
          </a>
          <span className="">|</span>
          <a
            href="#publications"
            className={`relative inline-block px-1 py-1
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5
                after:transition-all after:duration-300
                after:w-0 hover:after:w-full
                ${scrolled ? "after:bg-white" : "after:bg-pink-400"}`}
          >
            Publications
          </a>
          <span className="">|</span>
          <a
            href="#collaborators"
            className={`relative inline-block px-1 py-1
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5
                after:transition-all after:duration-300
                after:w-0 hover:after:w-full
                ${scrolled ? "after:bg-white" : "after:bg-pink-400"}`}
          >
            Collaborators
          </a>
          <span className="">|</span>
          <a
            href="#activities"
            className={`relative inline-block px-1 py-1
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5
                after:transition-all after:duration-300
                after:w-0 hover:after:w-full
                ${scrolled ? "after:bg-white" : "after:bg-pink-400"}`}
          >
            Activities
          </a>
          <span className="">|</span>
          <a
            href="#resources"
            className={`relative inline-block px-1 py-1
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5
                after:transition-all after:duration-300
                after:w-0 hover:after:w-full
                ${scrolled ? "after:bg-white" : "after:bg-pink-400"}`}
          >
            Resources
          </a>
          <span className="">|</span>
          <a
            href="#contact"
            className={`relative inline-block px-1 py-1
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5
                after:transition-all after:duration-300
                after:w-0 hover:after:w-full
                ${scrolled ? "after:bg-white" : "after:bg-pink-400"}`}
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
