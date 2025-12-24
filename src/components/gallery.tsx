"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CategoryId = "all" | "conference" | "celebration" | "workshop" | "sightseeing";

type LabImage = {
  src: string;
  alt: string;
};

type LabAlbum = {
  id: string;
  title: string;
  location?: string;
  category: Exclude<CategoryId, "all">;
  year: number;
  images: LabImage[];
};

const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "conference", label: "Conferences" },
  { id: "celebration", label: "Celebrations" },
  { id: "workshop", label: "Workshops" },
  { id: "sightseeing", label: "Sightseeings"}
];

const ALBUMS: LabAlbum[] = [
  {
    id: "xmas-2025",
    title: "Xmas 2025",
    location: "CCCN lab",
    category: "celebration",
    year: 2025,
    images: [
      { src: "/gallery/xmas2025/xmas-2025-1.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-2.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-3.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-4.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-5.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-6.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-7.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-8.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-9.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-10.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-11.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-12.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-13.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-14.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-15.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-16.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-17.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-18.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-19.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-20.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-21.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-22.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-23.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-24.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-25.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
      { src: "/gallery/xmas2025/xmas-2025-26.jpg", alt: "CCCN Lab Xmas 2025 celebration" },
    ],
  },
  {
    id: "corn-2025",
    title: "CoRN 2025",
    location: "MDCU - Thailand",
    category: "conference",
    year: 2025,
    images: [
      { src: "/gallery/corn2025/corn-2025-1.jpg", alt: "CCCN Lab hosted CoRN 2025" },
      { src: "/gallery/corn2025/corn-2025-2.jpg", alt: "CCCN Lab hosted CoRN 2025" },
      { src: "/gallery/corn2025/corn-2025-3.jpg", alt: "CCCN Lab hosted CoRN 2025" },
      { src: "/gallery/corn2025/corn-2025-4.jpg", alt: "CCCN Lab hosted CoRN 2025" },
      { src: "/gallery/corn2025/corn-2025-5.jpg", alt: "CCCN Lab hosted CoRN 2025" },
      { src: "/gallery/corn2025/corn-2025-6.jpg", alt: "CCCN Lab hosted CoRN 2025" },
      { src: "/gallery/corn2025/corn-2025-7.jpg", alt: "CCCN Lab hosted CoRN 2025" },
      { src: "/gallery/corn2025/corn-2025-8.jpg", alt: "CCCN Lab hosted CoRN 2025" },
      { src: "/gallery/corn2025/corn-2025-9.jpg", alt: "CCCN Lab hosted CoRN 2025" },
    ],
  },
  {
    id: "vss-2025",
    title: "VSS 2025",
    location: "St Pete Beach - Florida",
    category: "conference",
    year: 2025,
    images: [ 
      { src: "/gallery/vss2025/vss-2025-2.jpg", alt: "CCCN Lab attended VSS 2025" },
      { src: "/gallery/vss2025/vss-2025-3.jpg", alt: "CCCN Lab attended VSS 2025" },
      { src: "/gallery/vss2025/vss-2025-4.jpg", alt: "CCCN Lab attended VSS 2025" },
      { src: "/gallery/vss2025/vss-2025-5.jpg", alt: "CCCN Lab attended VSS 2025" },
      { src: "/gallery/vss2025/vss-2025-6.jpg", alt: "CCCN Lab attended VSS 2025" },
      { src: "/gallery/vss2025/vss-2025-7.jpg", alt: "CCCN Lab attended VSS 2025" },
      { src: "/gallery/vss2025/vss-2025-8.jpg", alt: "CCCN Lab attended VSS 2025" },
    ],
  },
  {
    id: "xmas-2024",
    title: "Xmas 2024",
    location: "CCCN lab",
    category: "celebration",
    year: 2024,
    images: [
      { src: "/gallery/xmas2024/xmas-2024-1.jpg", alt: "CCCN Lab Xmas 2024 celebration" },
      { src: "/gallery/xmas2024/xmas-2024-2.jpg", alt: "CCCN Lab Xmas 2024 celebration" },
      { src: "/gallery/xmas2024/xmas-2024-3.jpg", alt: "CCCN Lab Xmas 2024 celebration" },
      { src: "/gallery/xmas2024/xmas-2024-4.jpg", alt: "CCCN Lab Xmas 2024 celebration" },
      { src: "/gallery/xmas2024/xmas-2024-5.jpg", alt: "CCCN Lab Xmas 2024 celebration" },
      { src: "/gallery/xmas2024/xmas-2024-6.jpg", alt: "CCCN Lab Xmas 2024 celebration" },
    ],
  },
  {
    id: "brainpower-2024",
    title: "Brainpower 2024",
    location: "Huahin - Thailand",
    category: "workshop",
    year: 2024,
    images: [
      { src: "/gallery/brainpower2024/brainpower-2024-1.jpg", alt: "CCCN Lab attended Brainpower 2024" },
      { src: "/gallery/brainpower2024/brainpower-2024-2.jpg", alt: "CCCN Lab attended Brainpower 2024" },
      { src: "/gallery/brainpower2024/brainpower-2024-3.jpg", alt: "CCCN Lab attended Brainpower 2024" },
      { src: "/gallery/brainpower2024/brainpower-2024-4.jpg", alt: "CCCN Lab attended Brainpower 2024" },
      { src: "/gallery/brainpower2024/brainpower-2024-5.jpg", alt: "CCCN Lab attended Brainpower 2024" },
      { src: "/gallery/brainpower2024/brainpower-2024-6.jpg", alt: "CCCN Lab attended Brainpower 2024" },
    ],
  },
  {
    id: "vss-2024",
    title: "VSS 2024",
    location: "St Pete Beach - Florida",
    category: "conference",
    year: 2024,
    images: [
      { src: "/gallery/vss2024/vss-2024-1.jpg", alt: "CCCN Lab attended VSS 2024" },  
      { src: "/gallery/vss2024/vss-2024-2.jpg", alt: "CCCN Lab attended VSS 2024" },
      { src: "/gallery/vss2024/vss-2024-3.jpg", alt: "CCCN Lab attended VSS 2024" },
      { src: "/gallery/vss2024/vss-2024-4.jpg", alt: "CCCN Lab attended VSS 2024" },
      { src: "/gallery/vss2024/vss-2024-5.jpg", alt: "CCCN Lab attended VSS 2024" },
      { src: "/gallery/vss2024/vss-2024-6.jpg", alt: "CCCN Lab attended VSS 2024" },
    ],
  },
];

/* ---------- Album card with slide transition ---------- */
type AlbumCardProps = {
  album: LabAlbum;
};

function AlbumCard({ album }: AlbumCardProps) {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // สำหรับจับ swipe บน touch screen
  const touchStartX = useRef<number | null>(null);

  // เช็กว่าเป็นจอ desktop หรือไม่ (>= 1024px)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setIsDesktop(mq.matches);
    };

    update();
    mq.addEventListener("change", update);

    return () => {
      mq.removeEventListener("change", update);
    };
  }, []);

  // auto-slide เฉพาะ desktop + ไม่ hover
  useEffect(() => {
    if (!isDesktop) return;
    if (album.images.length <= 1 || isHovered) return;

    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % album.images.length),
      3000,
    );

    return () => clearInterval(timer);
  }, [album.images.length, isHovered, isDesktop]);

  // ฟังก์ชันเปลี่ยนรูป
  const goNext = () =>
    setIndex((prev) => (prev + 1) % album.images.length);
  const goPrev = () =>
    setIndex((prev) =>
      prev === 0 ? album.images.length - 1 : prev - 1,
    );

  // touch handlers สำหรับ tablet / mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current == null) return;

    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 40; // ปัดเกิน 40px ถึงนับเป็น swipe

    if (Math.abs(diffX) > threshold) {
      if (diffX < 0) {
        // ปัดซ้าย → next
        goNext();
      } else {
        // ปัดขวา → prev
        goPrev();
      }
    }

    touchStartX.current = null;
  };

  return (
    <Card
      className="
        group flex cursor-pointer flex-col
        overflow-hidden border-none bg-white/80 shadow-sm
        transition hover:-translate-y-0.5 hover:shadow-md
        w-full rounded-2xl
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* โซนรูป: desktop = auto-slide, mobile/tablet = swipe ได้ */}
      <div
        className="relative aspect-[4/3] w-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {album.images.map((img, i) => (
          <div
            key={img.src}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out",
              i === index
                ? "opacity-100 translate-x-0"
                : "pointer-events-none opacity-0 translate-x-4",
            )}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        ))}
      </div>

      <CardHeader className="space-y-1 px-4 pb-1">
        <p className="text-sm font-bold text-pink-500">
          {album.title}
        </p>
        {album.location && (
          <p className="text-xs text-neutral-500">{album.location}</p>
        )}
      </CardHeader>

      <CardContent className="flex flex-wrap items-center gap-2 px-4 pb-3">
        <Badge
          variant="outline"
          className="border-pink-500 text-[10px] font-normal text-pink-500"
        >
          {album.year}
        </Badge>
        <span className="rounded-full bg-pink-100 px-2 py-0.5 text-[10px] capitalize text-pink-500">
          {album.category}
        </span>
      </CardContent>
    </Card>
  );
}

/* ---------------------- main Gallery ---------------------- */
export function Gallery() {
  const [category, setCategory] = useState<CategoryId>("all");

  const filtered =
    category === "all"
      ? ALBUMS
      : ALBUMS.filter((album) => album.category === category);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col h-[480px] md:h-[550px]">
      {/* Filter bar */}
      <div className="mb-4 flex w-full flex-wrap justify-center gap-2">
        {CATEGORIES.map(({ id, label }) => (
          <Button
            key={id}
            variant={category === id ? "pinkClicked" : "pink"}
            onClick={() => setCategory(id)}
            className="justify-center px-4"
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Cards (scrollable) */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}

