"use client";

import React, { useEffect, useState } from "react";

import {
  BookOpen,
  CalendarDays,
  HandHeart,
  Handshake,
  Home,
  Mail,
  PackageOpen,
  User,
} from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

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
      label: "Events",
      href: "#events",
      icon: <CalendarDays size={20} />,
    },
    {
      label: "Resources",
      href: "#resources",
      icon: <PackageOpen size={20} />,
    },
    {
      label: "Culture",
      href: "#culture",
      icon: <HandHeart size={20} />,
    },
    {
      label: "Contact",
      href: "#contact",
      icon: <Mail size={20} />,
    },
  ];

  const scrollToSection = (
    href: string,
    behavior: ScrollBehavior = "smooth",
  ) => {
    const target = document.querySelector<HTMLElement>(href);

    if (!target) return;

    if (href === "#home") {
      window.scrollTo({
        top: 0,
        behavior,
      });

      setActive(href);
      return;
    }

    const navbarOffset =
      window.innerWidth >= 1024 ? 64 : 0;

    window.scrollTo({
      top:
        window.scrollY +
        target.getBoundingClientRect().top -
        navbarOffset,
      behavior,
    });

    setActive(href);
  };

  useEffect(() => {
    const handleWindowScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleWindowScroll();

    window.addEventListener("scroll", handleWindowScroll, {
      passive: true,
    });

    const sections =
      document.querySelectorAll<HTMLElement>("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              b.intersectionRatio - a.intersectionRatio,
          );

        const mostVisible = visibleEntries[0];

        if (mostVisible?.target.id) {
          setActive(`#${mostVisible.target.id}`);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.1, 0.25, 0.4, 0.6],
      },
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      window.removeEventListener(
        "scroll",
        handleWindowScroll,
      );

      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const hash = window.location.hash;

    if (!hash) return;

    const scrollToHashExactly = async () => {
      const target =
        document.querySelector<HTMLElement>(hash);

      if (!target) return;

      const images = Array.from(document.images);

      await Promise.all(
        images.map((image) => {
          if (image.complete) {
            return Promise.resolve();
          }

          return new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), {
              once: true,
            });

            image.addEventListener("error", () => resolve(), {
              once: true,
            });
          });
        }),
      );

      if (document.fonts?.ready) {
        await document.fonts.ready;
      }

      window.requestAnimationFrame(() => {
        const navbarOffset =
          window.innerWidth >= 1024 ? 64 : 0;

        const currentTop =
          target.getBoundingClientRect().top;

        window.scrollBy({
          top: currentTop - navbarOffset,
          behavior: "auto",
        });
      });
    };

    scrollToHashExactly();
  }, []);

  const handleNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    window.history.pushState(null, "", href);

    scrollToSection(href);
  };

  const linkClass = (isScrolled: boolean) =>
    `relative inline-block px-1 py-1
     after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-0.5
     after:transition-all after:duration-300 after:w-0 hover:after:w-full
     ${
       isScrolled
         ? "after:bg-white text-white"
         : "after:bg-pink-400 text-black"
     }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 hidden w-full px-4 py-4 transition-all duration-300 sm:px-6 lg:block ${
          scrolled
            ? "bg-pink-400 text-white"
            : "border-b bg-white shadow-sm"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a
            href="#home"
            onClick={(event) =>
              handleNavigation(event, "#home")
            }
            className={`font-bold transition-all duration-300 ${
              scrolled
                ? "text-2xl tracking-wide text-white"
                : "text-3xl text-pink-500"
            }`}
          >
            CCCN
          </a>

          <nav className="space-x-2 text-sm sm:space-x-4 sm:text-base">
            {navItems
              .filter((item) => item.href !== "#home")
              .map((item, index, filteredItems) => (
                <React.Fragment key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) =>
                      handleNavigation(event, item.href)
                    }
                    aria-current={
                      active === item.href
                        ? "page"
                        : undefined
                    }
                    className={linkClass(scrolled)}
                  >
                    {item.label}
                  </a>

                  {index < filteredItems.length - 1 && (
                    <span aria-hidden="true">|</span>
                  )}
                </React.Fragment>
              ))}
          </nav>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 flex h-14 items-center justify-around border-t bg-white shadow lg:hidden">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(event) =>
              handleNavigation(event, item.href)
            }
            aria-label={item.label}
            aria-current={
              active === item.href
                ? "page"
                : undefined
            }
            className="flex flex-col items-center text-xs"
          >
            {React.cloneElement(item.icon, {
              className:
                active === item.href
                  ? "text-pink-500"
                  : "text-gray-500",
            })}
          </a>
        ))}
      </nav>
    </>
  );
}