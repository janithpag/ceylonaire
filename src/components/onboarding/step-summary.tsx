"use client"

import { cn } from "@/lib/utils"
import {
  BUDGET_TIERS,
  GROUP_TYPES,
  ALL_INTERESTS,
  FOREIGN_STARTING_CITIES,
  type OnboardingFormState,
} from "@/lib/types/preferences"
import { PencilIcon } from "lucide-react"

interface StepSummaryProps {
  state: OnboardingFormState
  onEditStep: (step: number) => void
}

export function StepSummary({ state, onEditStep }: StepSummaryProps) {
  const isForeign = state.userType === "foreign"

  const budgetLabel = isForeign
    ? BUDGET_TIERS.find((t) => t.id === state.budget)?.label ?? "-"
    : `LKR ${(state.budget as number)?.toLocaleString("en-LK")} / day`

  const groupLabel =
    GROUP_TYPES.find((g) => g.id === state.groupType)?.label ?? "-"

  const interestLabels = state.interests
    .map((id) => ALL_INTERESTS.find((i) => i.id === id))
    .filter(Boolean)

  const startingCityLabel = isForeign
    ? FOREIGN_STARTING_CITIES.find((c) => c.id === state.details.startingCity)
        ?.label ?? state.details.startingCity
    : state.details.startingCity

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-semibold text-brand-primary sm:text-3xl">
        Ready to plan your trip?
      </h2>
      <p className="mt-2 text-sm text-brand-primary/50">
        Review your preferences, then let Ceyla work her magic
      </p>

      <div className="mt-10 w-full max-w-md space-y-1">
        <SummaryRow
          label="Traveler"
          value={isForeign ? "Visiting Sri Lanka" : "Local traveler"}
          onEdit={() => onEditStep(0)}
        />
        <SummaryRow
          label="Duration"
          value={`${state.duration} ${state.duration === 1 ? "day" : "days"}`}
          onEdit={() => onEditStep(1)}
        />
        <SummaryRow
          label="Budget"
          value={budgetLabel}
          onEdit={() => onEditStep(2)}
        />
        <SummaryRow
          label="Group"
          value={
            state.groupType === "solo"
              ? "Solo"
              : `${groupLabel} (${state.groupSize})`
          }
          onEdit={() => onEditStep(4)}
        />
        <SummaryRow
          label="Starting from"
          value={startingCityLabel || "-"}
          onEdit={() => onEditStep(5)}
        />

        {/* Interests — chips */}
        <div className="flex items-start justify-between rounded-xl bg-white p-4">
          <div className="flex-1">
            <p className="text-xs font-medium text-brand-primary/40 mb-2">Interests</p>
            <div className="flex flex-wrap gap-1.5">
              {interestLabels.map((interest) => (
                <span
                  key={interest!.id}
                  className="inline-flex items-center gap-1 rounded-full bg-brand-lavender/15 px-2.5 py-1 text-xs font-medium text-brand-primary/70"
                >
                  <span>{interest!.emoji}</span>
                  {interest!.label}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="ml-3 mt-0.5 text-brand-primary/30 hover:text-brand-amber transition-colors"
            aria-label="Edit interests"
          >
            <PencilIcon className="size-3.5" />
          </button>
        </div>

        {/* Optional details */}
        {state.details.mustVisit && (
          <div className="rounded-xl bg-white p-4">
            <p className="text-xs font-medium text-brand-primary/40 mb-1">Must-visit</p>
            <p className="text-sm text-brand-primary/70">{state.details.mustVisit}</p>
          </div>
        )}
        {state.details.specialRequirements && (
          <div className="rounded-xl bg-white p-4">
            <p className="text-xs font-medium text-brand-primary/40 mb-1">Special requirements</p>
            <p className="text-sm text-brand-primary/70">
              {state.details.specialRequirements}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  onEdit,
}: { label: string; value: string; onEdit: () => void }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3.5">
      <div>
        <p className="text-xs font-medium text-brand-primary/40">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-brand-primary">{value}</p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-brand-primary/30 hover:text-brand-amber transition-colors"
        aria-label={`Edit ${label}`}
      >
        <PencilIcon className="size-3.5" />
      </button>
    </div>
  )
}
