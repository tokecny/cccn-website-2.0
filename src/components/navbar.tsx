"use client";

import { useEffect, useState } from "react";
import {
  User,
  BookOpen,
  Mail,
  Home,
  Handshake,
  CalendarDays,
  PackageOpen,
  HandHeart
} from "lucide-react"; // ไอคอนจาก lucide-react
import React from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home"); 

   const navItems = [
  { label: "Home", href: "#home", icon: <Home size={20} /> },
  { label: "People", href: "#people", icon: <User size={20} /> },
  { label: "Publications", href: "#publications", icon: <BookOpen size={20} /> },
  { label: "Collaborators", href: "#collaborators", icon: <Handshake size={20} /> },
  { label: "Activities", href: "#activities", icon: <CalendarDays size={20} /> },
  { label: "Resources", href: "#resources", icon: <PackageOpen size={20} /> },
  { label: "Culture", href: "#culture", icon: <HandHeart size={20} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (scrolled: boolean) =>
    `relative inline-block px-1 py-1
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5
     after:transition-all after:duration-300 after:w-0 hover:after:w-full
     ${scrolled ? "after:bg-white text-white" : "after:bg-pink-400 text-black"}`;

  return (
    <>
      {/* Top Navbar (desktop only) */}
      <header
        className={`hidden lg:block sticky top-0 z-50 w-full px-4 sm:px-6 transition-all duration-300 py-4 ${
          scrolled ? "bg-pink-400 text-white" : "bg-white shadow-sm border-b"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className={`font-bold transition-all duration-300 ${
              scrolled ? "text-2xl tracking-wide text-white" : "text-3xl text-pink-500"
            }`}
          >
            CCCN
          </a>

          {/* Desktop nav */}
          <nav className="space-x-2 sm:space-x-4 text-sm sm:text-base">
            <a href="#people" className={linkClass(scrolled)}>People</a>
            <span>|</span>
            <a href="#publications" className={linkClass(scrolled)}>Publications</a>
            <span>|</span>
            <a href="#collaborators" className={linkClass(scrolled)}>Collaborators</a>
            <span>|</span>
            <a href="#activities" className={linkClass(scrolled)}>Activities</a>
            <span>|</span>
            <a href="#resources" className={linkClass(scrolled)}>Resources</a>
            <span>|</span>
            <a href="#culture" className={linkClass(scrolled)}>Culture</a>
            <span>|</span>
            <a href="#contact" className={linkClass(scrolled)}>Contact</a>
          </nav>
        </div>
      </header>

      {/* Bottom Navbar (mobile only) */}
       <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white border-t shadow lg:hidden h-14">
      {navItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          onClick={() => setActive(item.href)}
          className="flex flex-col items-center text-xs"
        >
          {React.cloneElement(item.icon, {
            className: active === item.href ? "text-pink-500" : "text-gray-600",
          })}
        </a>
      ))}
    </nav>
    </>
  );
}


