"use client"

import { StarIcon } from "lucide-react"
import { useInView } from "@/lib/hooks/use-in-view"

const REVIEWS = [
  {
    quote:
      "Ceyla planned a 10-day trip that hit every spot we wanted — temples, beaches, and the hill country train. We just followed the itinerary and had the best holiday of our lives.",
    name: "Sarah M.",
    trip: "10-Day Cultural & Coastal Tour",
    stars: 5,
  },
  {
    quote:
      "As a Sri Lankan, I was skeptical an AI could plan a good local trip. But the weekend itinerary it built for Ella was genuinely better than what I would have found on my own.",
    name: "Dinesh K.",
    trip: "3-Day Hill Country Escape",
    stars: 5,
  },
  {
    quote:
      "The budget breakdown was incredibly helpful. We knew exactly what to expect for accommodation, transport, and food. No surprises — just a perfectly planned adventure.",
    name: "Emma & Jack T.",
    trip: "7-Day Honeymoon Itinerary",
    stars: 5,
  },
]

const DELAY_CLASSES = ["", "animation-delay-200", "animation-delay-400"]

export function Testimonials() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-white py-20 lg:py-28">
      <div ref={ref} className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <div
          className={`text-center ${inView ? "animate-fade-up" : "opacity-0"}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lavender">
            Traveler stories
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-brand-primary lg:text-[2.75rem] lg:leading-tight">
            What travelers are saying
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <div
              key={review.name}
              className={`relative flex flex-col rounded-2xl border border-brand-surface bg-brand-surface/30 p-6 transition-all duration-200 hover:shadow-md hover:border-brand-lavender/20 ${
                inView ? `animate-fade-up ${DELAY_CLASSES[i]}` : "opacity-0"
              }`}
            >
              {/* Decorative quote mark */}
              <span
                className="pointer-events-none font-heading text-6xl leading-none text-brand-lavender/30 select-none"
                aria-hidden
              >
                &ldquo;
              </span>

              <p className="-mt-4 flex-1 text-sm leading-relaxed text-brand-primary/65 italic">
                {review.quote}
              </p>

              {/* Stars */}
              <div className="mt-5 flex gap-0.5">
                {Array.from({ length: review.stars }).map((_, j) => (
                  <StarIcon
                    key={j}
                    className="size-3.5 fill-brand-amber text-brand-amber"
                  />
                ))}
              </div>

              {/* Reviewer */}
              <div className="mt-3 border-t border-brand-surface pt-3">
                <p className="text-sm font-semibold text-brand-primary">
                  {review.name}
                </p>
                <p className="text-xs text-brand-primary/40">{review.trip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
