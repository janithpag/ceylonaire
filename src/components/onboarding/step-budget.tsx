"use client"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { BUDGET_TIERS, type BudgetTierId, type UserType } from "@/lib/types/preferences"

interface StepBudgetProps {
  value: BudgetTierId | number | null
  onChange: (value: BudgetTierId | number) => void
  userType: UserType
}

export function StepBudget({ value, onChange, userType }: StepBudgetProps) {
  if (userType === "local") {
    return <LocalBudget value={value as number | null} onChange={onChange} />
  }
  return <ForeignBudget value={value as BudgetTierId | null} onChange={onChange} />
}

function ForeignBudget({
  value,
  onChange,
}: { value: BudgetTierId | null; onChange: (v: BudgetTierId) => void }) {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-semibold text-brand-primary sm:text-3xl">
        What's your budget style?
      </h2>
      <p className="mt-2 text-sm text-brand-primary/50">
        This helps Ceyla pick the right hotels, restaurants, and activities
      </p>

      <div className="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-3">
        {BUDGET_TIERS.map((tier) => {
          const selected = value === tier.id
          return (
            <button
              key={tier.id}
              type="button"
              onClick={() => onChange(tier.id)}
              className={cn(
                "group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all duration-300",
                "hover:shadow-lg hover:-translate-y-0.5",
                selected
                  ? "border-brand-amber bg-brand-amber/5 shadow-md shadow-brand-amber/10"
                  : "border-brand-primary/8 bg-white hover:border-brand-lavender/40"
              )}
            >
              <span className="text-3xl">{tier.icon}</span>
              <div>
                <p className="text-base font-semibold text-brand-primary">{tier.label}</p>
                <p
                  className={cn(
                    "mt-1 text-sm font-medium tabular-nums",
                    selected ? "text-brand-amber" : "text-brand-primary/60"
                  )}
                >
                  {tier.range}
                </p>
                <p className="mt-1.5 text-xs text-brand-primary/40">{tier.description}</p>
              </div>

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

function LocalBudget({
  value,
  onChange,
}: { value: number | null; onChange: (v: number) => void }) {
  const current = value ?? 15000

  const formatLKR = (n: number) =>
    `LKR ${n.toLocaleString("en-LK")}`

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-semibold text-brand-primary sm:text-3xl">
        Daily budget
      </h2>
      <p className="mt-2 text-sm text-brand-primary/50">
        How much are you looking to spend per person, per day?
      </p>

      <div className="mt-10 w-full max-w-sm">
        {/* Current value display */}
        <div className="mb-6 text-center">
          <span className="text-3xl font-bold tabular-nums text-brand-amber">
            {formatLKR(current)}
          </span>
          <span className="block mt-1 text-xs text-brand-primary/40">per person / day</span>
        </div>

        <div className="mb-3 flex items-center justify-between text-xs text-brand-primary/40">
          <span>LKR 5,000</span>
          <span>LKR 50,000</span>
        </div>
        <Slider
          min={5000}
          max={50000}
          step={1000}
          value={[current]}
          onValueChange={(v) => onChange(Array.isArray(v) ? v[0] : v)}
          className="w-full"
        />
        <div className="mt-4 flex justify-between text-[11px] text-brand-primary/30">
          <span>Budget-friendly</span>
          <span>Premium</span>
        </div>
      </div>
    </div>
  )
}
