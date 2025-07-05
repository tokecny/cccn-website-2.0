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
import { Badge } from "./ui/badge";
// import { Heading, Subheading } from './text'

const testimonials = [
  {
    img: "/testimonials/Gig.jpg",
    name: "Chaipat Chunharas",
    title: "Clinician-Scientist",
    quote: `"HAIL SCIENCE"`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Pete.jpg",
    name: "Sedthapong Chunamchai",
    title: "Clinician-Scientist",
    quote: `"I'm the right one."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Pim.png",
    name: "Anthipa Choksuwattanasakul",
    title: "Clinician-Scientist",
    quote: `"I’m the only sane one in the lab."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Joe.jpg",
    name: "Setthanan Jarukasemkit",
    title: "Clinician-Scientist",
    quote: `"Wherever I go, I pose."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Arp.jpg",
    name: "Arp-Arpa Kasemsantitham",
    title: "Clinician-Scientist",
    quote: `"Post-rock for peace, \njazz for the madness."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Pun.jpg",
    name: "Chattarin Poungtubtim",
    title: "Clinician-Scientist",
    quote: `"My brain erased everything, \nexcept your face."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Bank.jpg",
    name: "Nithit Singtokum",
    title: "Clinician-Scientist",
    quote: `"I've always been bullied."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Tan.jpg",
    name: "Kanathip Jongmekwamsuk",
    title: "Clinician-Scientist",
    quote: `"Be happy, not sappy"`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Prin.jpg",
    name: "Naphapa Panyanirun",
    title: "Clinician-Scientist",
    quote: `"Don't forget to place your teeth \nbeneath the pillow tight."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/James.png",
    name: "Sasin Treeratana",
    title: "Clinician-Scientist",
    quote: `"I'm Bond, James Bond."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Mos.jpg",
    name: "Waragon Phusuwan",
    title: "Graduate Student",
    quote: `"Let's imagine that \nI'm a spherical person."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Vicky.png",
    name: "Payachana Victoria Chareunsouk",
    title: "Graduate Student",
    quote: `"Skip the coaster thrills, \nride with Vicky on wheels!"`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Ben.png",
    name: "Benjamin Conan",
    title: "Graduate Student",
    quote: `"Mind if I chime in?"`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Oat.jpg",
    name: "Kitnipat Boonyadhammaku",
    title: "Researcher",
    quote: `"Born to blaze in a blazer."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Nan.jpg",
    name: "Kanokwanwijit Wongsook",
    title: "Researcher",
    quote: `"Took me a lifetime \nto learn how to drive."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Phu.jpg",
    name: "Phutanik Setasartit",
    title: "Research Assistant",
    quote: `"I'm a zebra on Jeep"`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Nat.jpg",
    name: "Neeranuch Kittikiatkumjorn",
    title: "Research Assistant",
    quote: `"Read hard before you ask."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Tae.jpg",
    name: "Kittkorn Rattanakorn",
    title: "Undergraduate Researcher",
    quote: `"You're the sun \nI’d blind myself for."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Punt.jpg",
    name: "Punyawish Patumhirunruksa",
    title: "Undergraduate Researcher",
    quote: `"The Sun never \nbothers me anyway."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Phare.jpg",
    name: "Pharewa Kaewmanee",
    title: "Psychologist",
    quote: `"Official full-time \nbabysitter of Punyawish."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Tok.png",
    name: "Thiti Chainiyom",
    title: "Chaipat's Sidekick",
    quote:`"Cactus needs a drop, they said. tested the theory - now it’s dead."`,
    isAlumni: false, 
  },
  {
    img: "/testimonials/Preaw.jpg",
    name: "Anantaporn Sena",
    title: "Researcher (2020 - 2025)",
    quote: `"Two cones are better than one."`,
    isAlumni: true, 
  },
  {
    img: "/testimonials/Gann.jpg",
    name: "Gann Boonyaprapatsara",
    title: "Clinical Psychologist (2020 - 2024)",
    quote: `"Drip coffee by morning, \npour wine by night."`,
    isAlumni: true, 
  },
  {
    img: "/testimonials/Kate.jpg",
    name: "Thitisa Sudayuworn",
    title: "Psychologist (2020 - 2023)",
    quote: `"Carving patterns on ice, \nlounging lazy in bed."`,
    isAlumni: true, 
  },
  {
    img: "/testimonials/Guy.jpg",
    name: "Pattarathorn Jongjarearnsuntikul",
    title: "Psychologist (2020 - 2023)",
    quote: `"Behind every bright smile, \na silent flame."`,
    isAlumni: true, 
  },
  {
    img: "/testimonials/Kratai.jpg",
    name: "Natrada Rattanapong",
    title: "Psychologist (2022 - 2024)",
    quote: `"I wish I could drink cocktails instead of water."`,
    isAlumni: true, 
  },
  {
    img: "/testimonials/Fah.jpg",
    name: "Pornnapat Chernprateep",
    title: "Psychologist (2022 - 2023)",
    quote: `"Looks like honey, \ntastes like lime."`,
    isAlumni: true, 
  },
  {
    img: "/testimonials/Ning.jpeg",
    name: "Pinvasa Sae-chiew",
    title: "UX/UI Designer (2022 - 2023)",
    quote: `"I think I misplaced\nmy brain today..."`,
    isAlumni: true, 
  },
  {
    img: "/testimonials/Tung.png",
    name: "Tanupat Boonchalermvichien",
    title: "Researcher (2020 - 2022)",
    quote: `"Mouth like a sailor, \nface like a model."`,
    isAlumni: true, 
  },
  {
    img: "/testimonials/Yuki.jpeg",
    name: "Kanokphorn Boonlert",
    title: "Research Assistant (2020 - 2022)",
    quote: `"Yoko, move aside. \nIt’s my turn now."`,
    isAlumni: true, 
  },
  {
    img: "/testimonials/Ik.jpeg",
    name: "Kanyarat Benjasupawan",
    title: "Research Assistant (2021 - 2023)",
    quote: `"People disappoint. \nDogs don’t."`,
    isAlumni: true, 
  },
];

function TestimonialCard({
  name,
  title,
  img,
  children,
  bounds,
  scrollX,
  isAlumni, 
  ...props
}: {
  img: string;
  name: string;
  title: string;
  children: React.ReactNode;
  bounds: DOMRectReadOnly;
  scrollX: MotionValue<number>
  isAlumni?: boolean; 
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
      className={clsx(
        "relative flex aspect-9/16 w-72 shrink-0 snap-start scroll-ml-(--scroll-padding) flex-col justify-end overflow-hidden rounded-3xl sm:aspect-3/4 sm:w-96",
        isAlumni && "opacity-80 grayscale-[30%]"
      )}
    >
      {/* Alumni Badge */}
      {isAlumni && (
        <Badge className="absolute top-3 right-3 z-10 bg-pink-500 text-pink-100 text-xs font-semibold">
          Alumni
        </Badge>
      )}
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
            <span className="bg-gradient-to-r from-gray-200 via-gray-400 via-pink-300 to-pink-500 bg-clip-text text-transparent">
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
        <h2 className="text-3xl font-semibold tracking-tight text-pink-500 mb-8">
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
          "max-w-6xl mx-auto",
          "flex gap-8 px-(--scroll-padding)",
          "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth",
          "[--scroll-padding:max(--spacing(6),calc((100vw-(var(--container-2xl)))/2))] lg:[--scroll-padding:max(--spacing(8),calc((100vw-(var(--container-7xl)))/2))]",
        ])}
      >
        {testimonials.map(({ img, name, title, quote, isAlumni}, testimonialIndex) => (
          <TestimonialCard
            key={testimonialIndex}
            name={name}
            title={title}
            img={img}
            bounds={bounds as unknown as DOMRectReadOnly}
            scrollX={scrollX}
            isAlumni={isAlumni} 
            onClick={() => scrollTo(testimonialIndex)}
          >
            {quote}
          </TestimonialCard>
        ))}
        <div className="w-2xl shrink-0 sm:w-216" />
      </div>
      <Container className="mt-4 sm:mt-16">
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
                  "data-active:bg-pink-400 data-hover:bg-pink-400",
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
