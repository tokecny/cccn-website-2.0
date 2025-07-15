"use client";

import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const years = ["all", "2025", "2024", "2023"]; 

export default function YearFilterDropdown({
  allYears = years,
  selectedYear,
  setSelectedYear,
}: {
  allYears?: string[];
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}) {
  return (
    <Listbox value={selectedYear} onChange={setSelectedYear}>
      {({ open }) => (
        <div className="relative">
        <Listbox.Button
          className={cn(
            buttonVariants({ variant: "pink", size: "default" }), 
            "min-w-[120px] justify-center text-center"
          )}
        >
          {selectedYear === "all" ? "All Years" : selectedYear}
          <ChevronDown className="w-4 h-4 ml-2 opacity-60" />
        </Listbox.Button>

          <Listbox.Options
            className="absolute z-50 mt-2 w-full bg-white border border-pink-200 rounded-md shadow-lg focus:outline-none text-sm overflow-hidden"
          >
            {allYears.map((year) => (
              <Listbox.Option
                key={year}
                value={year}
                className={({ active, selected }) =>
                  cn(
                    "cursor-pointer px-3 py-2 transition-colors",
                    active ? "bg-pink-100 text-pink-500" : "text-gray-800",
                    selected && "font-semibold text-pink-500",
                  )
                }
              >
                {year === "all" ? "All Years" : year}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      )}
    </Listbox>
  );
}
