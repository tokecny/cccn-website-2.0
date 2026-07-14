"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ExternalLink,
  MapPin,
} from "lucide-react";

export type EventStatus =
  | "open"
  | "coming-soon"
  | "closed"
  | "completed";

export type EventImage = {
  src: string;
  alt: string;
};

export type EventSession = {
  date: string;
  location: string;
};

export type LabEvent = {
  id: string;
  title: string;
  subtitle?: string;
  description: string;

  images: EventImage[];
  sessions: EventSession[];

  category?: string;
  status?: EventStatus;

  registerUrl?: string;
  learnMoreUrl?: string;
};

function EventStatusBadge({
  status,
}: {
  status?: EventStatus;
}) {
  if (!status) return null;

  const statusLabels: Record<EventStatus, string> = {
    open: "Registration Open",
    "coming-soon": "Coming Soon",
    closed: "Registration Closed",
    completed: "Completed",
  };

  return (
    <span
      className={clsx(
        "inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium",
        status === "open" && "bg-pink-500 text-white",
        status === "coming-soon" && "bg-blue-100 text-blue-700",
        status === "closed" && "bg-gray-200 text-gray-600",
        status === "completed" && "bg-gray-100 text-gray-500",
      )}
    >
      {statusLabels[status]}
    </span>
  );
}

export function EventSlide({
  event,
}: {
  event: LabEvent;
}) {
  const [activeSessionIndex, setActiveSessionIndex] = useState(0);

  const activeImage =
    event.images[activeSessionIndex] ?? event.images[0];

  if (!activeImage) return null;

  return (
    <article
      className={clsx(
        "grid w-full shrink-0 snap-start overflow-hidden rounded-3xl bg-white",
        "shadow-sm ring-1 ring-gray-950/10",
        "md:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]",
      )}
    >
      {/* Key visual */}
      <div className="flex items-center justify-center bg-gray-50 p-4 sm:p-6 lg:p-8">
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className="aspect-[2/3] w-full max-w-[430px] object-contain"
        />
      </div>

      {/* Event information */}
      <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-12">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <EventStatusBadge status={event.status} />

            {event.category && (
              <span className="inline-flex rounded-full border border-pink-200 px-3 py-1 text-xs font-medium text-pink-600">
                {event.category}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-gray-950 sm:text-3xl lg:text-4xl">
            {event.title}
          </h3>

          {event.subtitle && (
            <p className="mt-2 text-base font-medium text-pink-500 sm:text-lg">
              {event.subtitle}
            </p>
          )}

          <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            {event.description}
          </p>

          <div className="mt-8 space-y-4">
            {event.sessions.map((session, index) => {
              const isActive = activeSessionIndex === index;

              return (
                <button
                  key={`${session.date}-${session.location}`}
                  type="button"
                  onClick={() => setActiveSessionIndex(index)}
                  aria-pressed={isActive}
                  className={clsx(
                    "w-full rounded-2xl border p-4 text-left transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400",
                    isActive
                      ? "border-pink-400 bg-pink-50 shadow-sm"
                      : "border-gray-200 bg-gray-50 hover:border-pink-200 hover:bg-pink-50/50",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <CalendarDays
                      className={clsx(
                        "mt-0.5 size-5 shrink-0",
                        isActive
                          ? "text-pink-500"
                          : "text-gray-400",
                      )}
                    />

                    <p
                      className={clsx(
                        "text-sm font-medium sm:text-base",
                        isActive
                          ? "text-gray-950"
                          : "text-gray-800",
                      )}
                    >
                      {session.date}
                    </p>
                  </div>

                  <div className="mt-2 flex items-start gap-3">
                    <MapPin
                      className={clsx(
                        "mt-0.5 size-5 shrink-0",
                        isActive
                          ? "text-pink-500"
                          : "text-gray-400",
                      )}
                    />

                    <p className="text-sm text-gray-600 sm:text-base">
                      {session.location}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {event.registerUrl && event.status === "open" && (
            <Link
              href={event.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-pink-600"
            >
              Register
              <ExternalLink className="size-4" />
            </Link>
          )}

          {event.learnMoreUrl && (
            <Link
              href={event.learnMoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-pink-300 px-5 py-2.5 text-sm font-medium text-pink-600 transition hover:border-pink-500 hover:bg-pink-50"
            >
              Learn More
              <ArrowRight className="size-4" />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}