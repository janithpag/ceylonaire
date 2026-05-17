"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  FOREIGN_STARTING_CITIES,
  LOCAL_CITIES,
  type UserType,
} from "@/lib/types/preferences"

interface DetailsState {
  startingCity: string
  specifyCity?: string
  mustVisit?: string
  specialRequirements?: string
}

interface StepDetailsProps {
  value: DetailsState
  onChange: (value: DetailsState) => void
  userType: UserType
}

export function StepDetails({ value, onChange, userType }: StepDetailsProps) {
  const [localSearch, setLocalSearch] = useState("")

  const update = (patch: Partial<DetailsState>) =>
    onChange({ ...value, ...patch })

  const filteredCities = LOCAL_CITIES.filter((c) =>
    c.toLowerCase().includes(localSearch.toLowerCase())
  )

  return (
    <div className="flex flex-col items-center">
      <h2 className="font-heading text-2xl font-semibold text-brand-primary sm:text-3xl">
        A few more details
      </h2>
      <p className="mt-2 text-sm text-brand-primary/50">
        Help Ceyla plan the perfect route
      </p>

      <div className="mt-10 w-full max-w-md space-y-6">
        {/* Starting city */}
        <fieldset>
          <legend className="mb-2.5 text-sm font-medium text-brand-primary/70">
            Where are you starting from?
          </legend>

          {userType === "foreign" ? (
            <div className="space-y-2">
              {FOREIGN_STARTING_CITIES.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => update({ startingCity: id })}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                    value.startingCity === id
                      ? "border-brand-amber bg-brand-amber/5 text-brand-primary"
                      : "border-brand-primary/8 bg-white text-brand-primary/70 hover:border-brand-lavender/40"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 items-center justify-center rounded-full border-2 transition-colors",
                      value.startingCity === id
                        ? "border-brand-amber bg-brand-amber"
                        : "border-brand-primary/20"
                    )}
                  >
                    {value.startingCity === id && (
                      <span className="block size-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  {label}
                </button>
              ))}
              {/* Specify city if "already here" */}
              {value.startingCity === "already-here" && (
                <input
                  type="text"
                  placeholder="Which city are you in?"
                  value={value.specifyCity ?? ""}
                  onChange={(e) => update({ specifyCity: e.target.value })}
                  className="mt-2 w-full rounded-xl border-2 border-brand-primary/8 bg-white px-4 py-3 text-sm text-brand-primary placeholder:text-brand-primary/30 focus:border-brand-lavender/50 focus:outline-none transition-colors"
                />
              )}
            </div>
          ) : (
            <div className="relative">
              <input
                type="text"
                placeholder="Search cities..."
                value={value.startingCity || localSearch}
                onChange={(e) => {
                  setLocalSearch(e.target.value)
                  if (!LOCAL_CITIES.includes(e.target.value as typeof LOCAL_CITIES[number])) {
                    update({ startingCity: "" })
                  }
                }}
                className="w-full rounded-xl border-2 border-brand-primary/8 bg-white px-4 py-3 text-sm text-brand-primary placeholder:text-brand-primary/30 focus:border-brand-lavender/50 focus:outline-none transition-colors"
              />
              {localSearch && !value.startingCity && (
                <div className="absolute top-full left-0 z-20 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-brand-primary/10 bg-white shadow-lg">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        update({ startingCity: city })
                        setLocalSearch("")
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-brand-primary/70 hover:bg-brand-lavender/10 transition-colors"
                    >
                      {city}
                    </button>
                  ))}
                  {filteredCities.length === 0 && (
                    <p className="px-4 py-3 text-sm text-brand-primary/40">No cities found</p>
                  )}
                </div>
              )}
            </div>
          )}
        </fieldset>

        {/* Must-visit */}
        <fieldset>
          <legend className="mb-2.5 text-sm font-medium text-brand-primary/70">
            Any must-visit places?{" "}
            <span className="font-normal text-brand-primary/35">(optional)</span>
          </legend>
          <textarea
            value={value.mustVisit ?? ""}
            onChange={(e) => update({ mustVisit: e.target.value })}
            placeholder="e.g. Sigiriya, Ella, Mirissa..."
            maxLength={500}
            rows={2}
            className="w-full resize-none rounded-xl border-2 border-brand-primary/8 bg-white px-4 py-3 text-sm text-brand-primary placeholder:text-brand-primary/30 focus:border-brand-lavender/50 focus:outline-none transition-colors"
          />
        </fieldset>

        {/* Special requirements */}
        <fieldset>
          <legend className="mb-2.5 text-sm font-medium text-brand-primary/70">
            Special requirements?{" "}
            <span className="font-normal text-brand-primary/35">(optional)</span>
          </legend>
          <textarea
            value={value.specialRequirements ?? ""}
            onChange={(e) => update({ specialRequirements: e.target.value })}
            placeholder="e.g. vegetarian, wheelchair accessible, celebrating anniversary..."
            maxLength={500}
            rows={2}
            className="w-full resize-none rounded-xl border-2 border-brand-primary/8 bg-white px-4 py-3 text-sm text-brand-primary placeholder:text-brand-primary/30 focus:border-brand-lavender/50 focus:outline-none transition-colors"
          />
        </fieldset>
      </div>
    </div>
  )
}
