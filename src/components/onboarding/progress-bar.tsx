"use client"

import { cn } from "@/lib/utils"
import { STEP_LABELS } from "@/lib/types/preferences"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="w-full">
      {/* Step label + counter */}
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-brand-primary/80">
          {STEP_LABELS[currentStep]}
        </span>
        <span className="text-xs tabular-nums text-brand-primary/40">
          {currentStep + 1} of {totalSteps}
        </span>
      </div>

      {/* Track */}
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-brand-primary/8">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-lavender to-brand-amber transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step dots */}
      <div className="mt-3 flex justify-between">
        {Array.from({ length: totalSteps }, (_, i) => (
          <button
            key={i}
            type="button"
            disabled={i > currentStep}
            className={cn(
              "size-2 rounded-full transition-all duration-300",
              i < currentStep && "bg-brand-lavender scale-100",
              i === currentStep && "bg-brand-amber scale-125 ring-2 ring-brand-amber/30",
              i > currentStep && "bg-brand-primary/10 scale-100"
            )}
            aria-label={`Step ${i + 1}: ${STEP_LABELS[i]}`}
          />
        ))}
      </div>
    </div>
  )
}
