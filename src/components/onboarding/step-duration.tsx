"use client"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import {
  FOREIGN_DURATION_PRESETS,
  LOCAL_DURATION_PRESETS,
  type UserType,
} from "@/lib/types/preferences"

interface StepDurationProps {
  value: number | null
  onChange: (value: number) => void
  userType: UserType
}

export function StepDuration({ value, onChange, userType }: StepDurationProps) {
  const presets =
    userType === "local" ? LOCAL_DURATION_PRESETS : FOREIGN_DURATION_PRESETS

  const quickLabels: Record<number, string> =
    userType === "local"
      ? { 1: "Day trip", 2: "Weekend", 3: "Long weekend" }
      : {}

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-semibold text-brand-primary sm:text-3xl">
        How many days?
      </h2>
      <p className="mt-2 text-sm text-brand-primary/50">
        {userType === "local"
          ? "Quick getaway or extended exploration?"
          : "We recommend 7-10 days for the best experience"}
      </p>

      {/* Quick select buttons */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        {presets.map((days) => {
          const selected = value === days
          const subLabel = quickLabels[days]
          return (
            <button
              key={days}
              type="button"
              onClick={() => onChange(days)}
              className={cn(
                "flex flex-col items-center rounded-xl border-2 px-5 py-3.5 transition-all duration-200",
                "hover:-translate-y-0.5 hover:shadow-md",
                "min-w-[72px]",
                selected
                  ? "border-brand-amber bg-brand-amber/5 shadow-sm shadow-brand-amber/10"
                  : "border-brand-primary/8 bg-white hover:border-brand-lavender/40"
              )}
            >
              <span
                className={cn(
                  "text-xl font-semibold tabular-nums",
                  selected ? "text-brand-amber" : "text-brand-primary"
                )}
              >
                {days}
              </span>
              <span className="mt-0.5 text-[11px] text-brand-primary/40">
                {subLabel || (days === 1 ? "day" : "days")}
              </span>
            </button>
          )
        })}
      </div>

      {/* Range slider */}
      <div className="mt-10 w-full max-w-sm">
        <div className="mb-3 flex items-center justify-between text-xs text-brand-primary/40">
          <span>1 day</span>
          <span>21 days</span>
        </div>
        <Slider
          min={1}
          max={21}
          step={1}
          value={[value ?? (userType === "local" ? 2 : 7)]}
          onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
          className="w-full"
        />
        {value !== null && (
          <p className="mt-4 text-center text-lg font-semibold text-brand-primary">
            <span className="tabular-nums text-brand-amber">{value}</span>{" "}
            {value === 1 ? "day" : "days"}
          </p>
        )}
      </div>
    </div>
  )
}
