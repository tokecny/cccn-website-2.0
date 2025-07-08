"use client";

import { useEffect, useState } from "react";
import {
  Home,
  User,
  BookOpen,
  Handshake,
  CalendarDays,
  PackageOpen,
  HandHeart,
  Mail,
} from "lucide-react";
import React from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  const navItems = [
    { label: "Home", href: "#home", icon: <Home size={20} /> },
    { label: "People", href: "#people", icon: <User size={20} /> },
    {
      label: "Publications",
      href: "#publications",
      icon: <BookOpen size={20} />,
    },
    {
      label: "Collaborators",
      href: "#collaborators",
      icon: <Handshake size={20} />,
    },
    {
      label: "Activities",
      href: "#activities",
      icon: <CalendarDays size={20} />,
    },
    { label: "Resources", href: "#resources", icon: <PackageOpen size={20} /> },
    { label: "Culture", href: "#culture", icon: <HandHeart size={20} /> },
    { label: "Contact", href: "#contact", icon: <Mail size={20} /> },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver part
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.isIntersecting) {
          const id = entry.target.id;
          console.log(id);
          if (id) {
            setActive("#" + id);
            break;
          }
        }
      }
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (href: string) => {
  const target = document.querySelector(href);
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const targetOffsetTop = window.scrollY + rect.top;
  const targetHeight = target.clientHeight;
  const viewportHeight = window.innerHeight;

  const scrollTo =
    // 20% ของ section จะอยู่ตรงกลางจอพอดี
    targetOffsetTop + targetHeight * 0.2 - viewportHeight * 0.5;

  window.scrollTo({
    top: scrollTo,
    behavior: "smooth",
  });

  setActive(href);
};
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
          <a
            href="#home"
            className={`font-bold transition-all duration-300 ${
              scrolled
                ? "text-2xl tracking-wide text-white"
                : "text-3xl text-pink-500"
            }`}
          >
            CCCN
          </a>

          <nav className="space-x-2 sm:space-x-4 text-sm sm:text-base">
            <a href="#people" className={linkClass(scrolled)}>
              People
            </a>
            <span>|</span>
            <a href="#publications" className={linkClass(scrolled)}>
              Publications
            </a>
            <span>|</span>
            <a href="#collaborators" className={linkClass(scrolled)}>
              Collaborators
            </a>
            <span>|</span>
            <a href="#activities" className={linkClass(scrolled)}>
              Activities
            </a>
            <span>|</span>
            <a href="#resources" className={linkClass(scrolled)}>
              Resources
            </a>
            <span>|</span>
            <a href="#culture" className={linkClass(scrolled)}>
              Culture
            </a>
            <span>|</span>
            <a href="#contact" className={linkClass(scrolled)}>
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* Bottom Navbar (mobile only) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white border-t shadow lg:hidden h-14">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              e.preventDefault(); // ป้องกัน jump ทันที
              handleClick(item.href);
            }}
            className="flex flex-col items-center text-xs"
          >
            {React.cloneElement(item.icon, {
              className:
                active === item.href ? "text-pink-500" : "text-gray-500",
            })}
          </a>
        ))}
      </nav>
    </>
  );
}
