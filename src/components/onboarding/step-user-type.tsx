"use client"

import { cn } from "@/lib/utils"
import type { UserType } from "@/lib/types/preferences"
import { GlobeIcon, MapPinIcon } from "lucide-react"

interface StepUserTypeProps {
  value: UserType | null
  onChange: (value: UserType) => void
}

const OPTIONS: { id: UserType; title: string; subtitle: string; Icon: typeof GlobeIcon }[] = [
  {
    id: "foreign",
    title: "I'm visiting Sri Lanka",
    subtitle: "Plan the perfect trip to the Pearl of the Indian Ocean",
    Icon: GlobeIcon,
  },
  {
    id: "local",
    title: "I'm a local traveler",
    subtitle: "Discover hidden gems and weekend getaways across the island",
    Icon: MapPinIcon,
  },
]

export function StepUserType({ value, onChange }: StepUserTypeProps) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-semibold text-brand-primary sm:text-3xl">
        How are you exploring Sri Lanka?
      </h2>
      <p className="mt-2 text-sm text-brand-primary/50">
        We'll tailor your experience based on your answer
      </p>

      <div className="mt-10 grid w-full max-w-lg gap-4 sm:grid-cols-2">
        {OPTIONS.map(({ id, title, subtitle, Icon }) => {
          const selected = value === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={cn(
                "group relative flex flex-col items-center gap-4 rounded-2xl border-2 p-8 text-center transition-all duration-300",
                "hover:shadow-lg hover:-translate-y-0.5",
                selected
                  ? "border-brand-amber bg-brand-amber/5 shadow-md shadow-brand-amber/10"
                  : "border-brand-primary/8 bg-white hover:border-brand-lavender/40"
              )}
            >
              <div
                className={cn(
                  "flex size-14 items-center justify-center rounded-xl transition-colors duration-300",
                  selected
                    ? "bg-brand-amber/15 text-brand-amber"
                    : "bg-brand-primary/5 text-brand-primary/40 group-hover:bg-brand-lavender/15 group-hover:text-brand-lavender"
                )}
              >
                <Icon className="size-7" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-base font-semibold text-brand-primary">{title}</p>
                <p className="mt-1 text-xs leading-relaxed text-brand-primary/45">{subtitle}</p>
              </div>

              {/* Selection indicator */}
              {selected && (
                <div className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-brand-amber text-white">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
