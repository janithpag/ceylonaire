"use client"

import { cn } from "@/lib/utils"
import {
  FOREIGN_INTERESTS,
  LOCAL_EXTRA_INTERESTS,
  type UserType,
} from "@/lib/types/preferences"

interface StepInterestsProps {
  value: string[]
  onChange: (value: string[]) => void
  userType: UserType
}

export function StepInterests({ value, onChange, userType }: StepInterestsProps) {
  const interests =
    userType === "local"
      ? [...FOREIGN_INTERESTS, ...LOCAL_EXTRA_INTERESTS]
      : [...FOREIGN_INTERESTS]

  const toggle = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id))
    } else if (value.length < 6) {
      onChange([...value, id])
    }
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-semibold text-brand-primary sm:text-3xl">
        What excites you most?
      </h2>
      <p className="mt-2 text-sm text-brand-primary/50">
        Pick 1-6 interests so Ceyla knows what to prioritize
      </p>

      <div className="mt-10 flex max-w-xl flex-wrap justify-center gap-2.5">
        {interests.map(({ id, label, emoji }) => {
          const selected = value.includes(id)
          const atLimit = value.length >= 6 && !selected
          return (
            <button
              key={id}
              type="button"
              disabled={atLimit}
              onClick={() => toggle(id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border-2 px-4 py-2.5 text-sm font-medium transition-all duration-200",
                "hover:-translate-y-0.5",
                selected
                  ? "border-brand-amber bg-brand-amber/8 text-brand-primary shadow-sm"
                  : "border-brand-primary/8 bg-white text-brand-primary/70 hover:border-brand-lavender/40 hover:bg-brand-lavender/5",
                atLimit && "cursor-not-allowed opacity-40 hover:translate-y-0"
              )}
            >
              <span className="text-base">{emoji}</span>
              {label}
            </button>
          )
        })}
      </div>

      <p
        className={cn(
          "mt-6 text-xs tabular-nums transition-colors",
          value.length >= 6 ? "text-brand-amber" : "text-brand-primary/35"
        )}
      >
        {value.length} / 6 selected
      </p>
    </div>
  )
}
