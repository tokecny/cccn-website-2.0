"use client";

import clsx from "clsx";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "./container";
import {
  EventSlide,
  type LabEvent,
} from "./event-slide";

const events: LabEvent[] = [
    {
        id: "blb-2026",
        title: "Brain Longevity Bootcamp 2026",
        subtitle: "Brain and Mental Health",

        description:
            "A multi-city learning program exploring brain health, mental well-being, and practical approaches to supporting longevity throughout life.",

        images: [
            {
                src: "/events/blb-2026-bangkok.jpg",
                alt: "Brain Longevity Bootcamp 2026 Bangkok",
            },
            {
                src: "/events/blb-2026-chiang-mai.jpg",
                alt: "Brain Longevity Bootcamp 2026 Chiang Mai",
            },
            {
                src: "/events/blb-2026-phuket.jpg",
                alt: "Brain Longevity Bootcamp 2026 Phuket",
            },
            {
                src: "/events/blb-2026-khon-kaen.jpg",
                alt: "Brain Longevity Bootcamp 2026 Khon Kaen",
            },
        ],

        sessions: [
            {
                date: "14–16 August 2026",
                location: "Bangkok",
            },
            {
                date: "25–27 September 2026",
                location: "Chiang Mai",
            },
            {
                date: "16–18 October 2026",
                location: "Phuket",
            },
            {
                date: "6–8 November 2026",
                location: "Khon Kaen",
            },
        ],

        category: "Bootcamp",
        status: "open",

        learnMoreUrl: "#",
    },
    {
        id: "sensory-innovation-sandbox-2026",
        title: "Sensory Innovation Sandbox",
        subtitle: "From neuroscience to real-world innovation",

        description:
        "A hands-on program combining neuroscience, sensory science, and business thinking to develop products, services, and experiences that better understand users.",

        images: [
                {
                    src: "/events/sis-2026.png",
                    alt: "Brain Longevity Bootcamp 2026 Bangkok",
                },
            ],

        sessions: [
        {
            date: "25 July – 5 September 2026",
            location: "Bangkok, Thailand",
        },
        ],

        category: "Program",
        status: "open",

        learnMoreUrl: "#",
    },
];

export function Events() {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const { scrollX } = useScroll({
    container: scrollRef,
  });

  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return;

    const slides = Array.from(
      container.children,
    ) as HTMLElement[];

    if (slides.length === 0) return;

    const containerRect =
      container.getBoundingClientRect();

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideRect = slide.getBoundingClientRect();

      const distance = Math.abs(
        slideRect.left - containerRect.left,
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  }, []);

  useMotionValueEvent(scrollX, "change", () => {
    updateActiveIndex();
  });

  useEffect(() => {
    updateActiveIndex();

    window.addEventListener(
      "resize",
      updateActiveIndex,
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateActiveIndex,
      );
    };
  }, [updateActiveIndex]);

  function scrollTo(index: number) {
    const container = scrollRef.current;

    if (!container) return;

    const safeIndex = Math.max(
      0,
      Math.min(index, events.length - 1),
    );

    const slide = container.children[
      safeIndex
    ] as HTMLElement | undefined;

    if (!slide) return;

    container.scrollTo({
      left: slide.offsetLeft,
      behavior: "smooth",
    });
  }

  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex < events.length - 1;

  return (
    <div className="overflow-hidden">
      <Container>
        {/* Heading */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2
              id="events-heading"
              className="text-3xl font-semibold tracking-tight text-pink-500 mb-8 text-center"
            >
              Events
            </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        </div>
        {/* Carousel */}
        <div
          ref={scrollRef}
          className={clsx(
            "flex w-full gap-6",
            "snap-x snap-mandatory overflow-x-auto",
            "overscroll-x-contain scroll-smooth",
            "[scrollbar-width:none]",
            "[&::-webkit-scrollbar]:hidden",
          )}
        >
          {events.map((event) => (
            <EventSlide
              key={event.id}
              event={event}
            />
          ))}
        </div>

        {/* Pagination */}
        {events.length > 1 && (
          <div className="mt-6 flex items-center justify-between sm:justify-center">
            {/* Mobile previous */}
            <button
              type="button"
              onClick={() =>
                scrollTo(activeIndex - 1)
              }
              disabled={!hasPrevious}
              aria-label="Previous event"
              className={clsx(
                "flex size-10 items-center justify-center rounded-full sm:hidden",
                "border border-gray-300 bg-white",
                "disabled:opacity-30",
              )}
            >
              <ArrowLeft className="size-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {events.map((event, index) => (
                <button
                  key={event.id}
                  type="button"
                  onClick={() => scrollTo(index)}
                  aria-label={`View ${event.title}`}
                  aria-current={
                    activeIndex === index
                      ? "true"
                      : undefined
                  }
                  className={clsx(
                    "size-2.5 rounded-full transition",
                    activeIndex === index
                      ? "bg-pink-500"
                      : "bg-gray-300 hover:bg-pink-300",
                  )}
                />
              ))}
            </div>

            {/* Mobile next */}
            <button
              type="button"
              onClick={() =>
                scrollTo(activeIndex + 1)
              }
              disabled={!hasNext}
              aria-label="Next event"
              className={clsx(
                "flex size-10 items-center justify-center rounded-full sm:hidden",
                "border border-gray-300 bg-white",
                "disabled:opacity-30",
              )}
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}