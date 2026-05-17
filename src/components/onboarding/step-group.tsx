"use client"

import { cn } from "@/lib/utils"
import { GROUP_TYPES, type GroupTypeId } from "@/lib/types/preferences"

interface StepGroupProps {
  groupType: GroupTypeId | null
  groupSize: number
  onGroupTypeChange: (value: GroupTypeId) => void
  onGroupSizeChange: (value: number) => void
}

export function StepGroup({
  groupType,
  groupSize,
  onGroupTypeChange,
  onGroupSizeChange,
}: StepGroupProps) {
  const showSizeInput = groupType === "family" || groupType === "friends"

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-semibold text-brand-primary sm:text-3xl">
        Who's coming along?
      </h2>
      <p className="mt-2 text-sm text-brand-primary/50">
        This shapes the activities, pace, and accommodation Ceyla suggests
      </p>

      <div className="mt-10 grid w-full max-w-md grid-cols-2 gap-4">
        {GROUP_TYPES.map(({ id, label, icon }) => {
          const selected = groupType === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => {
                onGroupTypeChange(id)
                if (id === "solo") onGroupSizeChange(1)
                else if (id === "couple") onGroupSizeChange(2)
              }}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-6 transition-all duration-300",
                "hover:shadow-lg hover:-translate-y-0.5",
                selected
                  ? "border-brand-amber bg-brand-amber/5 shadow-md shadow-brand-amber/10"
                  : "border-brand-primary/8 bg-white hover:border-brand-lavender/40"
              )}
            >
              <span className="text-3xl">{icon}</span>
              <span className="text-sm font-semibold text-brand-primary">{label}</span>

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

      {/* Group size input */}
      {showSizeInput && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <label
            htmlFor="group-size"
            className="text-sm font-medium text-brand-primary/70"
          >
            How many travelers?
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onGroupSizeChange(Math.max(2, groupSize - 1))}
              className="flex size-10 items-center justify-center rounded-xl border-2 border-brand-primary/10 bg-white text-lg font-medium text-brand-primary transition-colors hover:border-brand-lavender/40"
            >
              -
            </button>
            <span className="w-10 text-center text-2xl font-bold tabular-nums text-brand-primary">
              {groupSize}
            </span>
            <button
              type="button"
              onClick={() => onGroupSizeChange(Math.min(20, groupSize + 1))}
              className="flex size-10 items-center justify-center rounded-xl border-2 border-brand-primary/10 bg-white text-lg font-medium text-brand-primary transition-colors hover:border-brand-lavender/40"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
