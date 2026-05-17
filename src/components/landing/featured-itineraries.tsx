"use client"

import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, UsersIcon, ArrowRightIcon } from "lucide-react"
import { useInView } from "@/lib/hooks/use-in-view"

const FEATURED = [
  {
    slug: "7-day-classic",
    title: "7-Day Classic Sri Lanka",
    description:
      "Sigiriya, Kandy, Nuwara Eliya, Galle — the iconic route covering culture, tea country, and southern beaches.",
    duration: "7 days",
    audience: "Couples & Families",
    budget: "Mid-range",
    tags: ["Cultural", "Scenic", "Beaches"],
    image:
      "https://images.unsplash.com/photo-1665849050430-5e8c16bacf7e?w=800&q=80",
  },
  {
    slug: "5-day-southern-beach-wildlife",
    title: "5-Day South Coast & Wildlife",
    description:
      "Yala National Park, Mirissa whale watching, Unawatuna beaches, and the Galle Fort in one seamless trip.",
    duration: "5 days",
    audience: "Solo & Couples",
    budget: "Budget–Mid",
    tags: ["Wildlife", "Beaches", "Adventure"],
    image:
      "https://images.unsplash.com/photo-1674556275226-47b6b393d623?w=800&q=80",
  },
  {
    slug: "3-day-hill-country",
    title: "3-Day Hill Country Escape",
    description:
      "A weekend escape from Colombo — Ella rock hike, Nine Arch Bridge, scenic train, and misty tea estates.",
    duration: "3 days",
    audience: "Weekend Getaway",
    budget: "Budget",
    tags: ["Scenic", "Hiking", "Local"],
    image:
      "https://images.unsplash.com/photo-1566766189268-ecac9118f2b7?w=800&q=80",
  },
]

const DELAY_CLASSES = ["", "animation-delay-200", "animation-delay-400"]

export function FeaturedItineraries() {
  const { ref, inView } = useInView()

  return (
    <section className="bg-brand-surface/40 py-20 lg:py-28">
      <div ref={ref} className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        {/* Section header */}
        <div
          className={`flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between ${
            inView ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-lavender">
              Sample itineraries
            </p>
            <h2 className="font-heading mt-2 text-3xl font-bold text-brand-primary lg:text-[2.75rem] lg:leading-tight">
              Popular trips to inspire you
            </h2>
          </div>
          <Link
            href="/explore"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary/50 transition-colors hover:text-brand-primary whitespace-nowrap"
          >
            View all
            <ArrowRightIcon className="size-3.5" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED.map((item, i) => (
            <Link
              key={item.slug}
              href={`/explore/${item.slug}`}
              className={`group flex flex-col overflow-hidden rounded-2xl border border-brand-surface bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-primary/5 hover:border-brand-lavender/30 ${
                inView ? `animate-fade-up ${DELAY_CLASSES[i]}` : "opacity-0"
              }`}
            >
              {/* Card image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-heading text-base font-semibold text-brand-primary leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brand-primary/50 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-brand-primary/40">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="size-3" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <UsersIcon className="size-3" />
                    {item.audience}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-brand-surface pt-4">
                  <span className="text-xs text-brand-primary/40">{item.budget}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-primary/60 transition-colors group-hover:text-brand-primary">
                    View itinerary
                    <ArrowRightIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
