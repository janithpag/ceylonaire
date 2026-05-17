"use client"

import { useInView } from "@/lib/hooks/use-in-view"

const STATS = [
  { value: "2,500+", label: "Itineraries generated" },
  { value: "98%", label: "Satisfaction rate" },
  { value: "150+", label: "Destinations covered" },
  { value: "30s", label: "Average planning time" },
]

export function Stats() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-brand-primary py-16 lg:py-20">
      <div
        ref={ref}
        className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/10 lg:px-10"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center text-center ${
              inView ? "animate-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <span className="font-heading text-3xl font-bold text-white lg:text-4xl">
              {stat.value}
            </span>
            <span className="mt-2 text-sm text-white/50">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
