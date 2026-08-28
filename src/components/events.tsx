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
        id: "blb_2026",
        title: "Brain Longevity Bootcamp 2026",
        subtitle: "Brain and Mental Health",

        description:
            "A multi-city learning program exploring brain health, mental well-being, and practical approaches to supporting longevity throughout life.",

        images: [
            {
                src: "/events/BLB_BKK.png",
                alt: "Brain Longevity Bootcamp 2026 Bangkok",
            },
            {
                src: "/events/BLB_CNX.png",
                alt: "Brain Longevity Bootcamp 2026 Chiang Mai",
            },
            {
                src: "/events/BLB_PK.png",
                alt: "Brain Longevity Bootcamp 2026 Phuket",
            },
            {
                src: "/events/BLB_KK.png",
                alt: "Brain Longevity Bootcamp 2026 Khon Kaen",
            },
        ],

        sessions: [
            {
                date: "14–16 August 2026",
                location: "Bangkok",
                status: "completed"
            },
            {
                date: "25–27 September 2026",
                location: "Chiang Mai",
                status: "upcoming"
            },
            {
                date: "16–18 October 2026",
                location: "Phuket",
                status: "upcoming"
            },
            {
                date: "6–8 November 2026",
                location: "Khon Kaen",
                status: "upcoming"
            },
        ],

        category: "Bootcamp",
        status: "open",

        registerUrl: "https://docs.google.com/forms/d/e/1FAIpQLSfThPN3E1xYhLPqxSn5bAHlnOprpr6P6LzGKedLUYsmjshUDg/viewform",

        learnMoreUrl: "https://www.instagram.com/p/DcakJbMkws5/?igsi=MXI0ZDFvaHJ6Z2Npdw==",
        learnMoreLabel: "View on Instagram",
    },
    {
        id: "sensory-innovation-sandbox-2026",
        title: "Sensory Innovation Sandbox",
        subtitle: "From neuroscience to real-world innovation",

        description:
        "A hands-on program combining neuroscience, sensory science, and business thinking to develop products, services, and experiences that better understand users.",

        images: [
                {
                    src: "/events/SIS_2026.png",
                    alt: "Sensory Innovation Sandbox 2026",
                },
            ],

        sessions: [
        {
            date: "25 July – 5 September 2026",
            location: "Bangkok",
            status: "completed"
        },
        ],

        category: "Program",
        status: "closed",

        learnMoreUrl: "https://www.instagram.com/p/Daffj02zyYW/?igsi=MThod2syMmNuZWwwaQ==",
        learnMoreLabel: "View on Instagram",
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
            <h2
              id="events-heading"
              className="text-3xl font-semibold tracking-tight text-pink-500 mb-8 text-center"
            >
              Events
            </h2>
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