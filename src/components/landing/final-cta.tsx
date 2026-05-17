"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import { useInView } from "@/lib/hooks/use-in-view"

export function FinalCTA() {
  const { ref, inView } = useInView()

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1581420455310-e069c4d4529e?w=1920&q=80"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-primary/75" aria-hidden />

      {/* Content */}
      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-2xl px-5 text-center sm:px-8 ${
          inView ? "animate-fade-up" : "opacity-0"
        }`}
      >
        <h2 className="font-heading text-3xl font-bold text-white leading-tight sm:text-4xl lg:text-5xl">
          Ready to explore Sri Lanka?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/65">
          Let Ceyla craft your perfect itinerary in under a minute. No sign-up
          required to get started.
        </p>
        <Link
          href="/plan"
          className="group mt-8 inline-flex items-center gap-2.5 rounded-xl bg-brand-amber px-8 py-4 text-base font-semibold text-brand-primary transition-all hover:bg-brand-amber-light hover:shadow-lg hover:shadow-brand-amber/20"
        >
          Start Planning
          <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  )
}
