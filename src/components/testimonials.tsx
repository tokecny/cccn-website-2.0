"use client";

import * as Headless from "@headlessui/react";
// import { ArrowLongRightIcon } from '@heroicons/react/20/solid'
import { clsx } from "clsx";
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import useMeasure from "react-use-measure";
import { Container } from "./container";
import { Link } from "./link";
// import { Heading, Subheading } from './text'

const testimonials = [
  {
    img: "/testimonials/Gig.jpg",
    name: "Chaipat Chunharas",
    title: "Clinician-Scientist",
    quote: `"HAIL SCIENCE"`,
  },
  {
    img: "/testimonials/Pete.jpg",
    name: "Sedthapong Chunamchai",
    title: "Clinician-Scientist",
    quote: `"I'm the right one."`,
  },
  {
    img: "/testimonials/Pim.png",
    name: "Anthipa Choksuwattanasakul",
    title: "Clinician-Scientist",
    quote: `"I’m the only sane one in the lab."`,
  },
  {
    img: "/testimonials/Joe.jpg",
    name: "Setthanan Jarukasemkit",
    title: "Clinician-Scientist",
    quote: `"Wherever I go, I pose."`,
  },
  {
    img: "/testimonials/Arp.jpg",
    name: "Arp-Arpa Kasemsantitham",
    title: "Clinician-Scientist",
    quote: `"Post-rock for peace, \njazz for the madness."`,
  },
  {
    img: "/testimonials/Pun.jpg",
    name: "Chattarin Poungtubtim",
    title: "Clinician-Scientist",
    quote: `"My brain erased everything, \nexcept your face."`,
  },
  {
    img: "/testimonials/Bank.jpg",
    name: "Nithit Singtokum",
    title: "Clinician-Scientist",
    quote: `"I've always been bullied."`,
  },
  {
    img: "/testimonials/Tan.jpg",
    name: "Kanathip Jongmekwamsuk",
    title: "Clinician-Scientist",
    quote: `"Be happy, not sappy"`,
  },
  {
    img: "/testimonials/Prin.jpg",
    name: "Naphapa Panyanirun",
    title: "Clinician-Scientist",
    quote: `"Don't forget to place your teeth \nbeneath the pillow tight."`,
  },
  {
    img: "/testimonials/James.png",
    name: "Sasin Treeratana",
    title: "Clinician-Scientist",
    quote: `"I'm Bond, James Bond."`,
  },
  {
    img: "/testimonials/Mos.jpg",
    name: "Waragon Phusuwan",
    title: "Graduate Student",
    quote: `"Let's imagine that \nI'm a spherical person."`,
  },
  {
    img: "/testimonials/Vicky.png",
    name: "Payachana Victoria Chareunsouk",
    title: "Graduate Student",
    quote: `"Skip the coaster thrills, \nride with Vicky on wheels!"`,
  },
  {
    img: "/testimonials/Ben.png",
    name: "Benjamin Conan",
    title: "Graduate Student",
    quote: `"Mind if I chime in?"`,
  },
  {
    img: "/testimonials/Oat.jpg",
    name: "Kitnipat Boonyadhammaku",
    title: "Researcher",
    quote: `"Born to blaze in a blazer."`,
  },
  {
    img: "/testimonials/Nan.jpg",
    name: "Kanokwanwijit Wongsook",
    title: "Researcher",
    quote: `"Took me a lifetime \nto learn how to drive."`,
  },
  {
    img: "/testimonials/Phu.jpg",
    name: "Phutanik Setasartit",
    title: "Research Assistant",
    quote: `"I'm a zebra on Jeep"`,
  },
  {
    img: "/testimonials/Nat.jpg",
    name: "Neeranuch Kittikiatkumjorn",
    title: "Research Assistant",
    quote: `"Read hard before you ask."`,
  },
  {
    img: "/testimonials/Tae.jpg",
    name: "Kittkorn Rattanakorn",
    title: "Undergraduate Researcher",
    quote: `"You're the sun \nI’d blind myself for."`,
  },
  {
    img: "/testimonials/Punt.jpg",
    name: "Punyawish Patumhirunruksa",
    title: "Undergraduate Researcher",
    quote: `"The Sun never \nbothers me anyway."`,
  },
  {
    img: "/testimonials/Phare.jpg",
    name: "Pharewa Kaewmanee",
    title: "Psychologist",
    quote:
      `"Official full-time \nbabysitter of Punyawish."`,
  },
  {
    img: "/testimonials/Tok.png",
    name: "Thiti Chainiyom",
    title: "Chaipat's Sidekick",
    quote:
      `"Cactus needs a drop,” they said. tested the theory - now it’s dead."`,
  },
];

function TestimonialCard({
  name,
  title,
  img,
  children,
  bounds,
  scrollX,
  ...props
}: {
  img: string;
  name: string;
  title: string;
  children: React.ReactNode;
  bounds: DOMRectReadOnly;
  scrollX: MotionValue<number>;
} & HTMLMotionProps<"div">) {
  let ref = useRef<HTMLDivElement | null>(null);

  let computeOpacity = useCallback(() => {
    let element = ref.current;
    if (!element || bounds.width === 0) return 1;

    let rect = element.getBoundingClientRect();

    if (rect.left < bounds.left) {
      let diff = bounds.left - rect.left;
      let percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else if (rect.right > bounds.right) {
      let diff = rect.right - bounds.right;
      let percent = diff / rect.width;
      return Math.max(0.5, 1 - percent);
    } else {
      return 1;
    }
  }, [ref, bounds.width, bounds.left, bounds.right]);

  let opacity = useSpring(computeOpacity(), {
    stiffness: 154,
    damping: 23,
  });

  useLayoutEffect(() => {
    opacity.set(computeOpacity());
  }, [computeOpacity, opacity]);

  useMotionValueEvent(scrollX, "change", () => {
    opacity.set(computeOpacity());
  });

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      {...props}
      className="relative flex aspect-9/16 w-72 shrink-0 snap-start scroll-ml-(--scroll-padding) flex-col justify-end overflow-hidden rounded-3xl sm:aspect-3/4 sm:w-96"
    >
      <img
        alt=""
        src={img}
        className="absolute inset-x-0 top-0 aspect-square w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-3xl bg-linear-to-t from-black from-[calc(7/16*100%)] ring-1 ring-gray-950/10 ring-inset sm:from-25%"
      />
      <figure className="relative p-10">
        <blockquote>
          <p className="relative text-xl/7 text-white text-center">
              {typeof children === "string"
                ? children.split("\n").map((line, idx) => (
                    <span key={idx} className="block">
                      {line}
                    </span>
                  ))
                : children}
          </p>
        </blockquote>
        <figcaption className="mt-6 border-t border-white/20 pt-6">
          <p className="text-sm/6 font-medium text-white">{name}</p>
          <p className="text-sm/6 font-medium">
            <span className="bg-gradient-to-r from-gray-200 via-gray-400 via-pink-100 to-pink-500 bg-clip-text text-transparent">
              {title}
            </span>
          </p>
        </figcaption>
      </figure>
    </motion.div>
  );
}

function CallToAction() {
  return (
    <div>
      {/* UNUSED Text */}
      <p className="max-w-sm text-sm/6 text-gray-600">
        {/* Join the best sellers in the business and start using Radiant to hit
        your targets today. */}
      </p>
      <div className="mt-2">
        <Link
          href="#"
          className="inline-flex items-center gap-2 text-sm/6 font-medium text-pink-600"
        >
          {/* Get started */}
          {/* <ArrowLongRightIcon className="size-5" /> */}
        </Link>
      </div>
    </div>
  );
}

export function Testimonials() {
  let scrollRef = useRef<HTMLDivElement | null>(null);
  let { scrollX } = useScroll({ container: scrollRef });
  let [setReferenceWindowRef, bounds] = useMeasure();
  let [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollX, "change", (x) => {
    setActiveIndex(Math.floor(x / scrollRef.current!.children[0].clientWidth));
  });

  function scrollTo(index: number) {
    let gap = 32;
    let width = (scrollRef.current!.children[0] as HTMLElement).offsetWidth;
    scrollRef.current!.scrollTo({ left: (width + gap) * index });
  }

  return (
    <div className="overflow-hidden">
      <Container>
        <h2 className="text-3xl font-semibold tracking-tight text-pink-600 mb-6">
          People
        </h2>
        <div ref={setReferenceWindowRef}>
          {/* UNUSED Heading */}
          {/* <Subheading>What everyone is saying</Subheading>
          <Heading as="h3" className="mt-2">
            Trusted by professionals.
          </Heading> */}
        </div>
      </Container>
      <div
        ref={scrollRef}
        className={clsx([
          "flex gap-8 px-(--scroll-padding)",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth",
          "[--scroll-padding:max(--spacing(6),calc((100vw-(var(--container-2xl)))/2))] lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--container-7xl)))/2))]",
        ])}
      >
        {testimonials.map(({ img, name, title, quote }, testimonialIndex) => (
          <TestimonialCard
            key={testimonialIndex}
            name={name}
            title={title}
            img={img}
            bounds={bounds as unknown as DOMRectReadOnly}
            scrollX={scrollX}
            onClick={() => scrollTo(testimonialIndex)}
          >
            {quote}
          </TestimonialCard>
        ))}
        <div className="w-2xl shrink-0 sm:w-216" />
      </div>
      <Container className="mt-16">
        <div className="flex justify-between">
          <CallToAction />
          <div className="hidden sm:flex sm:gap-2">
            {testimonials.map(({ name }, testimonialIndex) => (
              <Headless.Button
                key={testimonialIndex}
                onClick={() => scrollTo(testimonialIndex)}
                data-active={
                  activeIndex === testimonialIndex ? true : undefined
                }
                aria-label={`Scroll to testimonial from ${name}`}
                className={clsx(
                  "size-2.5 rounded-full border border-transparent bg-gray-300 transition",
                  "data-active:bg-gray-400 data-hover:bg-gray-400",
                  "forced-colors:data-active:bg-[Highlight] forced-colors:data-focus:outline-offset-4",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
