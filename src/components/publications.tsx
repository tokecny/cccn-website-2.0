"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";
import YearFilterDropdown from "./ui/dropdown";

export type Publication = {
  url: string | undefined;
  title: string;
  authors: string;
  year: string;
  link: string;
  categories: string[];
  badge: string;
};

const filters = [
  { key: "all", label: "All" },
  { key: "cogn", label: "Cognitive" },
  { key: "clin", label: "Clinical" },
  { key: "comp", label: "Computational" },
  { key: "neuro", label: "Neuroscience" },
];

const authorsInLab = [
  "Chunharas C",
  "Chokesuwattanaskul A",
  "Chunamchai S.",
  "Phusuwan W.",
  "Jarukasemkit S.",
  "Poungtubtim C.",
  "SINGTOKUM N.",
  "Jongmekwamsuk K.",
  "Panyanirun N.",
];
const boldPattern = new RegExp(`(${authorsInLab.join("|")})`, "g");

export default function Publications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    fetch("/publications.json")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort(
          (a: Publication, b: Publication) =>
            parseInt(b.year) - parseInt(a.year),
        );
        setPublications(sorted);
      });
  }, []);

  const allYears = [
    "all",
    ...Array.from(new Set(publications.map((p) => p.year))).sort(
      (a, b) => parseInt(b) - parseInt(a),
    ),
  ];

  const filtered = publications.filter((pub) => {
    const matchesFilter = filter === "all" || pub.categories.includes(filter);
    const matchesYear = selectedYear === "all" || pub.year === selectedYear;
    return matchesFilter && matchesYear;
  });

  const paginated = filtered.slice(0, page * perPage);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-semibold tracking-tight text-pink-500 mb-8">
          Publications
        </h2>
        <div className="flex flex-wrap justify-center gap-2 mb-4 px-4">
          {filters.map(({ key, label }) => (
            <Button
              key={key}
              variant={filter === key ? "pinkClicked" : "pink"}
              onClick={() => {
                setFilter(key);
                setPage(1);
              }}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center text-center mb-6">
          <YearFilterDropdown
            allYears={allYears}
            selectedYear={selectedYear}
            setSelectedYear={(value) => {
              setSelectedYear(value);
              setPage(1);
            }}
          />
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {paginated.map((pub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="relative rounded-2xl shadow-md hover:shadow-lg transition-all h-full flex flex-col justify-between border border-pink-100">
              {pub.badge && (
                <Badge className="absolute top-3 right-3 bg-pink-500 text-pink-100 text-xs font-semibold">
                  {pub.badge}
                </Badge>
              )}
              <CardContent className="p-6 flex flex-col gap-2">
                <p className="text-xl font-semibold text-pink-500">
                  {pub.year}
                </p>
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-base font-semibold text-pink-500 hover:underline leading-snug"
                >
                  {pub.title}
                </a>
                <p
                  className="text-sm text-gray-700 leading-snug"
                  dangerouslySetInnerHTML={{
                    __html: pub.authors.replace(
                      boldPattern,
                      "<strong>$1</strong>",
                    ),
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {paginated.length < filtered.length && (
        <div className="mt-8 text-center">
          <Button onClick={() => setPage(page + 1)} variant="pink">
            Show more
          </Button>
        </div>
      )}
    </>
  );
}
