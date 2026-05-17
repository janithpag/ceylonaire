import type { Metadata } from "next"
import { OnboardingForm } from "@/components/onboarding/onboarding-form"

export const metadata: Metadata = {
  title: "Plan Your Trip",
  description:
    "Tell Ceyla your travel preferences and get a personalized Sri Lanka itinerary in seconds.",
}

export default function PlanPage() {
  return (
    <main className="min-h-screen bg-brand-surface">
      <OnboardingForm />
    </main>
  )
}
