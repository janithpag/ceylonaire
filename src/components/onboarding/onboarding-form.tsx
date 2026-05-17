"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  INITIAL_FORM_STATE,
  TOTAL_STEPS,
  isStepValid,
  type BudgetTierId,
  type GroupTypeId,
  type OnboardingFormState,
  type UserType,
} from "@/lib/types/preferences"
import { ProgressBar } from "./progress-bar"
import { StepUserType } from "./step-user-type"
import { StepDuration } from "./step-duration"
import { StepBudget } from "./step-budget"
import { StepInterests } from "./step-interests"
import { StepGroup } from "./step-group"
import { StepDetails } from "./step-details"
import { StepSummary } from "./step-summary"
import { ArrowLeftIcon, ArrowRightIcon, SparklesIcon } from "lucide-react"

const STORAGE_KEY = "ceylonaire_onboarding"

function loadState(): OnboardingFormState {
  if (typeof window === "undefined") return INITIAL_FORM_STATE
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return INITIAL_FORM_STATE
    return JSON.parse(raw) as OnboardingFormState
  } catch {
    return INITIAL_FORM_STATE
  }
}

export function OnboardingForm() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [state, setState] = useState<OnboardingFormState>(INITIAL_FORM_STATE)
  const [hydrated, setHydrated] = useState(false)
  const [direction, setDirection] = useState<"forward" | "back">("forward")
  const containerRef = useRef<HTMLDivElement>(null)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = loadState()
    setState(saved)
    setHydrated(true)
  }, [])

  // Persist to localStorage on every change
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state, hydrated])

  const updateState = useCallback(
    (patch: Partial<OnboardingFormState>) =>
      setState((prev) => ({ ...prev, ...patch })),
    []
  )

  const goNext = () => {
    if (step < TOTAL_STEPS - 1) {
      setDirection("forward")
      setStep((s) => s + 1)
      containerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const goBack = () => {
    if (step > 0) {
      setDirection("back")
      setStep((s) => s - 1)
    }
  }

  const goToStep = (target: number) => {
    setDirection(target > step ? "forward" : "back")
    setStep(target)
  }

  const handleGenerate = () => {
    // Save final state and navigate to generation
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    router.push("/trip/generate")
  }

  const valid = isStepValid(step, state)
  const isLastStep = step === TOTAL_STEPS - 1

  if (!hydrated) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-brand-primary/20 border-t-brand-amber" />
      </div>
    )
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-3xl flex-col px-5 pt-28 pb-8 sm:px-8 sm:pt-32">
      {/* Progress bar */}
      <div className="mb-12">
        <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
      </div>

      {/* Step content */}
      <div
        ref={containerRef}
        className={cn(
          "flex-1",
          direction === "forward" ? "animate-fade-up" : "animate-fade-in"
        )}
        key={step}
      >
        {step === 0 && (
          <StepUserType
            value={state.userType}
            onChange={(v) => {
              updateState({ userType: v })
              // Auto-advance after selection
              setTimeout(() => {
                setDirection("forward")
                setStep(1)
              }, 300)
            }}
          />
        )}
        {step === 1 && state.userType && (
          <StepDuration
            value={state.duration}
            onChange={(v) => updateState({ duration: v })}
            userType={state.userType}
          />
        )}
        {step === 2 && state.userType && (
          <StepBudget
            value={state.budget}
            onChange={(v) => updateState({ budget: v })}
            userType={state.userType}
          />
        )}
        {step === 3 && state.userType && (
          <StepInterests
            value={state.interests}
            onChange={(v) => updateState({ interests: v })}
            userType={state.userType}
          />
        )}
        {step === 4 && (
          <StepGroup
            groupType={state.groupType}
            groupSize={state.groupSize}
            onGroupTypeChange={(v) => updateState({ groupType: v })}
            onGroupSizeChange={(v) => updateState({ groupSize: v })}
          />
        )}
        {step === 5 && state.userType && (
          <StepDetails
            value={state.details}
            onChange={(v) => updateState({ details: v })}
            userType={state.userType}
          />
        )}
        {step === 6 && (
          <StepSummary state={state} onEditStep={goToStep} />
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-4 border-t border-brand-primary/5 pt-6">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className={cn(
            "inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-medium transition-all",
            step === 0
              ? "invisible"
              : "text-brand-primary/60 hover:text-brand-primary hover:bg-brand-primary/5"
          )}
        >
          <ArrowLeftIcon className="size-4" />
          Back
        </button>

        {isLastStep ? (
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-brand-amber px-8 text-sm font-semibold text-brand-primary shadow-lg shadow-brand-amber/20 transition-all hover:bg-brand-amber-light hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand-amber/25"
          >
            <SparklesIcon className="size-4" />
            Generate My Itinerary
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={!valid}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold transition-all",
              valid
                ? "bg-brand-primary text-white hover:bg-brand-primary-light hover:-translate-y-0.5 shadow-md"
                : "cursor-not-allowed bg-brand-primary/10 text-brand-primary/30"
            )}
          >
            Continue
            <ArrowRightIcon className="size-4" />
          </button>
        )}
      </div>
    </div>
  )
}
