import { z } from "zod"

// ── Interest categories ──

export const FOREIGN_INTERESTS = [
  { id: "beach", label: "Beach", emoji: "\u{1F3D6}\uFE0F" },
  { id: "culture", label: "Culture & Heritage", emoji: "\u{1F3DB}\uFE0F" },
  { id: "wildlife", label: "Wildlife & Safari", emoji: "\u{1F418}" },
  { id: "adventure", label: "Adventure & Hiking", emoji: "\u26F0\uFE0F" },
  { id: "food", label: "Food & Culinary", emoji: "\u{1F35C}" },
  { id: "wellness", label: "Wellness & Ayurveda", emoji: "\u{1F9D8}" },
  { id: "photography", label: "Photography", emoji: "\u{1F4F7}" },
  { id: "nature", label: "Nature & Eco", emoji: "\u{1F33F}" },
  { id: "surfing", label: "Surfing", emoji: "\u{1F3C4}" },
  { id: "trains", label: "Scenic Trains", emoji: "\u{1F682}" },
  { id: "nightlife", label: "Nightlife", emoji: "\u{1F378}" },
  { id: "shopping", label: "Shopping", emoji: "\u{1F6CD}\uFE0F" },
] as const

export const LOCAL_EXTRA_INTERESTS = [
  { id: "kid-friendly", label: "Kid-friendly", emoji: "\u{1F476}" },
  { id: "romantic", label: "Romantic", emoji: "\u2764\uFE0F" },
] as const

export const ALL_INTERESTS = [...FOREIGN_INTERESTS, ...LOCAL_EXTRA_INTERESTS] as const

export type InterestId = (typeof ALL_INTERESTS)[number]["id"]

// ── Budget tiers (foreign) ──

export const BUDGET_TIERS = [
  {
    id: "budget",
    label: "Budget",
    range: "$30 - $65 / day",
    description: "Hostels, local food, public transport",
    icon: "\u{1F392}",
  },
  {
    id: "mid-range",
    label: "Mid-range",
    range: "$85 - $195 / day",
    description: "Boutique hotels, nice restaurants, private transport",
    icon: "\u{1F3E8}",
  },
  {
    id: "luxury",
    label: "Luxury",
    range: "$280 - $700+ / day",
    description: "5-star villas, fine dining, private experiences",
    icon: "\u2728",
  },
] as const

export type BudgetTierId = (typeof BUDGET_TIERS)[number]["id"]

// ── Group types ──

export const GROUP_TYPES = [
  { id: "solo", label: "Solo", icon: "\u{1F9D1}" },
  { id: "couple", label: "Couple", icon: "\u{1F491}" },
  { id: "family", label: "Family", icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}" },
  { id: "friends", label: "Friends", icon: "\u{1F46B}" },
] as const

export type GroupTypeId = (typeof GROUP_TYPES)[number]["id"]

// ── Starting cities ──

export const FOREIGN_STARTING_CITIES = [
  { id: "colombo-bia", label: "Colombo (BIA Airport)" },
  { id: "mattala", label: "Mattala Airport" },
  { id: "already-here", label: "Already in Sri Lanka" },
] as const

export const LOCAL_CITIES = [
  "Colombo",
  "Kandy",
  "Galle",
  "Jaffna",
  "Negombo",
  "Matara",
  "Anuradhapura",
  "Trincomalee",
  "Batticaloa",
  "Kurunegala",
  "Ratnapura",
  "Badulla",
  "Nuwara Eliya",
  "Dambulla",
  "Matale",
  "Hambantota",
  "Polonnaruwa",
  "Chilaw",
  "Kalutara",
  "Panadura",
] as const

// ── Duration quick selects ──

export const FOREIGN_DURATION_PRESETS = [3, 5, 7, 10, 14] as const
export const LOCAL_DURATION_PRESETS = [1, 2, 3, 5, 7] as const

// ── Zod schemas ──

export const userTypeSchema = z.enum(["foreign", "local"])

export const durationSchema = z.number().int().min(1).max(21)

export const foreignBudgetSchema = z.enum(["budget", "mid-range", "luxury"])

export const localBudgetSchema = z.number().int().min(5000).max(50000)

export const interestsSchema = z
  .array(z.string())
  .min(1, "Select at least one interest")
  .max(6, "Select up to 6 interests")

export const groupTypeSchema = z.enum(["solo", "couple", "family", "friends"])

export const groupSizeSchema = z.number().int().min(1).max(20)

export const foreignDetailsSchema = z.object({
  startingCity: z.enum(["colombo-bia", "mattala", "already-here"]),
  specifyCity: z.string().optional(),
  mustVisit: z.string().max(500).optional(),
  specialRequirements: z.string().max(500).optional(),
})

export const localDetailsSchema = z.object({
  startingCity: z.string().min(1, "Select a starting city"),
  mustVisit: z.string().max(500).optional(),
  specialRequirements: z.string().max(500).optional(),
})

// ── Combined preferences schema ──

export const foreignPreferencesSchema = z.object({
  userType: z.literal("foreign"),
  duration: durationSchema,
  budget: foreignBudgetSchema,
  interests: interestsSchema,
  groupType: groupTypeSchema,
  groupSize: groupSizeSchema,
  details: foreignDetailsSchema,
})

export const localPreferencesSchema = z.object({
  userType: z.literal("local"),
  duration: durationSchema,
  budget: localBudgetSchema,
  interests: interestsSchema,
  groupType: groupTypeSchema,
  groupSize: groupSizeSchema,
  details: localDetailsSchema,
})

export const preferencesSchema = z.discriminatedUnion("userType", [
  foreignPreferencesSchema,
  localPreferencesSchema,
])

export type UserType = z.infer<typeof userTypeSchema>
export type ForeignPreferences = z.infer<typeof foreignPreferencesSchema>
export type LocalPreferences = z.infer<typeof localPreferencesSchema>
export type Preferences = z.infer<typeof preferencesSchema>

// ── Form state (partial, for in-progress form) ──

export interface OnboardingFormState {
  userType: UserType | null
  duration: number | null
  budget: BudgetTierId | number | null
  interests: string[]
  groupType: GroupTypeId | null
  groupSize: number
  details: {
    startingCity: string
    specifyCity?: string
    mustVisit?: string
    specialRequirements?: string
  }
}

export const INITIAL_FORM_STATE: OnboardingFormState = {
  userType: null,
  duration: null,
  budget: null,
  interests: [],
  groupType: null,
  groupSize: 1,
  details: {
    startingCity: "",
    specifyCity: "",
    mustVisit: "",
    specialRequirements: "",
  },
}

// ── Step validation ──

export function isStepValid(step: number, state: OnboardingFormState): boolean {
  switch (step) {
    case 0:
      return state.userType !== null
    case 1:
      return state.duration !== null && state.duration >= 1 && state.duration <= 21
    case 2:
      return state.budget !== null
    case 3:
      return state.interests.length >= 1 && state.interests.length <= 6
    case 4:
      return state.groupType !== null && state.groupSize >= 1
    case 5:
      return state.details.startingCity !== ""
    case 6:
      return true // summary is always valid
    default:
      return false
  }
}

export const STEP_LABELS = [
  "Traveler Type",
  "Duration",
  "Budget",
  "Interests",
  "Group",
  "Details",
  "Summary",
] as const

export const TOTAL_STEPS = STEP_LABELS.length
