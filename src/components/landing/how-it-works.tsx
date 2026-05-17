"use client"

import { ClipboardListIcon, SparklesIcon, CompassIcon } from "lucide-react"
import { useInView } from "@/lib/hooks/use-in-view"

const STEPS = [
  {
    icon: ClipboardListIcon,
    step: "01",
    title: "Share Your Preferences",
    description:
      "Tell us your travel dates, budget, group size, and interests — beaches, culture, wildlife, or all of the above.",
  },
  {
    icon: SparklesIcon,
    step: "02",
    title: "Ceyla Plans Your Trip",
    description:
      "Our AI travel companion builds a personalised, day-by-day itinerary with hand-picked places, drive times, and insider tips.",
  },
  {
    icon: CompassIcon,
    step: "03",
    title: "You Explore Sri Lanka",
    description:
      "Refine anything with a quick chat, download your PDF guide, and head off on your perfect Sri Lanka adventure.",
  },
]

const DELAY_CLASSES = ["", "animation-delay-200", "animation-delay-400"]

export function HowItWorks() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-gradient-to-b from-white to-brand-surface/30 py-20 lg:py-28">
      <div ref={ref} className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <div
          className={`text-center ${inView ? "animate-fade-up" : "opacity-0"}`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lavender">
            How it works
          </p>
          <h2 className="font-heading mt-3 text-3xl font-bold text-brand-primary lg:text-[2.75rem] lg:leading-tight">
            Your perfect trip in three steps
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-primary/50">
            No generic templates. No endless scrolling. Just a smart itinerary
            built exactly for you.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-10 sm:grid-cols-3">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-10 left-[calc(16.6%+1rem)] right-[calc(16.6%+1rem)] hidden h-px sm:block"
            style={{ background: "linear-gradient(to right, #E8DCFF, #CDB3FF, #E8DCFF)" }}
          />

          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.step}
                className={`relative flex flex-col items-center text-center ${
                  inView ? `animate-fade-up ${DELAY_CLASSES[i]}` : "opacity-0"
                }`}
              >
                {/* Decorative large step number */}
                <span
                  className="pointer-events-none absolute -top-3 font-heading text-7xl font-bold text-brand-lavender/15 select-none"
                  aria-hidden
                >
                  {step.step}
                </span>

                {/* Icon circle */}
                <div className="relative z-10 flex size-16 items-center justify-center rounded-2xl bg-brand-lavender-light shadow-sm">
                  <Icon className="size-7 text-brand-primary-light" />
                </div>

                <span className="mt-5 text-[10px] font-bold uppercase tracking-[0.15em] text-brand-lavender">
                  Step {step.step}
                </span>
                <h3 className="font-heading mt-2 text-base font-semibold text-brand-primary lg:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-primary/50">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
