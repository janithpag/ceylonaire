"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRightIcon } from "lucide-react"

const TRIP_CHIPS = [
  "7-day cultural tour",
  "South coast beaches",
  "Hill country escape",
  "Wildlife safari",
  "Luxury honeymoon",
]

export function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-brand-primary">
      {/* Background photograph */}
      <Image
        src="https://images.unsplash.com/photo-1751247026229-518bfec9b5e6?w=1920&q=80"
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Gradient overlay — dark on left for text, fading right to reveal image */}
      <div className="hero-gradient-overlay absolute inset-0" aria-hidden />

      {/* Subtle noise texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")" }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-24 pb-20 sm:px-8 lg:px-10">
        {/* Eyebrow badge */}
        <div
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <span className="size-1.5 animate-pulse rounded-full bg-brand-amber" />
          <span className="text-xs font-medium tracking-wide text-white/80">
            AI-Powered Travel Planning
          </span>
        </div>

        {/* Heading */}
        <h1
          className="mt-6 max-w-2xl font-heading text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          Discover{" "}
          <span className="text-brand-lavender">Sri Lanka</span>
          <br />
          Your Way
        </h1>

        {/* Subtitle */}
        <p
          className="mt-6 max-w-lg text-base leading-relaxed text-white/65 sm:text-lg"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
          }}
        >
          Tell Ceyla your travel style, budget, and interests — she&apos;ll craft
          a personalised day-by-day itinerary for your Sri Lanka adventure.
        </p>

        {/* CTAs */}
        <div
          className="mt-8 flex flex-wrap gap-3 sm:gap-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
          }}
        >
          <Link
            href="/plan"
            className="group inline-flex items-center gap-2.5 rounded-xl bg-brand-amber px-7 py-3.5 text-sm font-semibold text-brand-primary transition-all hover:bg-brand-amber-light hover:shadow-lg hover:shadow-brand-amber/20 sm:px-8 sm:py-4 sm:text-base"
          >
            Plan My Trip
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10 sm:px-8 sm:py-4 sm:text-base"
          >
            Explore Itineraries
          </Link>
        </div>

        {/* Trip chips */}
        <div
          className="mt-10"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.8s ease 0.5s",
          }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/35">
            Popular trips
          </p>
          <div className="flex flex-wrap gap-2">
            {TRIP_CHIPS.map((chip) => (
              <Link
                key={chip}
                href="/plan"
                className="rounded-full border border-white/12 bg-white/8 px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/15 hover:text-white/90"
              >
                {chip}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{
          opacity: visible ? 0.5 : 0,
          transition: "opacity 1s ease 1s",
        }}
        aria-hidden
      >
        <div className="flex size-6 items-start justify-center rounded-full border-2 border-white/30 pt-1.5">
          <div className="size-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  )
}
