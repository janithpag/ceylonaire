import type { Metadata } from "next"
import { Hero } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { FeaturedItineraries } from "@/components/landing/featured-itineraries"
import { Stats } from "@/components/landing/stats"
import { Testimonials } from "@/components/landing/testimonials"
import { FinalCTA } from "@/components/landing/final-cta"
import { Footer } from "@/components/shared/footer"

export const metadata: Metadata = {
  title: "Ceylonaire — AI-Powered Sri Lanka Travel Itineraries",
  description:
    "Plan your perfect Sri Lanka trip with Ceyla, your AI travel companion. Get a personalised day-by-day itinerary for beaches, wildlife, culture, and more — in seconds.",
  openGraph: {
    title: "Ceylonaire — AI-Powered Sri Lanka Travel Itineraries",
    description:
      "Plan your perfect Sri Lanka trip with Ceyla, your AI travel companion. Personalised itineraries in seconds.",
    url: "https://ceylonaire.com",
    images: [{ url: "/og/og-default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ceylonaire — AI-Powered Sri Lanka Travel Itineraries",
    description:
      "Plan your perfect Sri Lanka trip with Ceyla, your AI travel companion.",
  },
}

export default function HomePage() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <FeaturedItineraries />
      <Stats />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  )
}
