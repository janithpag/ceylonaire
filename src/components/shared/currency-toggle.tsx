"use client"

import { useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar" },
  { code: "EUR", symbol: "€", label: "Euro" },
  { code: "GBP", symbol: "£", label: "British Pound" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar" },
  { code: "INR", symbol: "₹", label: "Indian Rupee" },
  { code: "LKR", symbol: "Rs", label: "Sri Lankan Rupee" },
]

interface CurrencyToggleProps {
  className?: string
  variant?: "light" | "dark"
}

export function CurrencyToggle({ className, variant = "dark" }: CurrencyToggleProps) {
  const [selected, setSelected] = useState("USD")
  const [open, setOpen] = useState(false)

  const current = CURRENCIES.find((c) => c.code === selected) ?? CURRENCIES[0]

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-1 rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors",
          variant === "dark"
            ? "text-white/80 hover:text-white hover:bg-white/10"
            : "text-brand-primary/60 hover:text-brand-primary hover:bg-brand-surface/60"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{current.symbol}</span>
        <span>{current.code}</span>
        <ChevronDownIcon
          className={cn(
            "size-3.5 transition-transform duration-150",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <ul
            role="listbox"
            className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-border bg-popover py-1 shadow-lg"
          >
            {CURRENCIES.map((currency) => (
              <li key={currency.code} role="option" aria-selected={currency.code === selected}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors hover:bg-muted",
                    currency.code === selected
                      ? "text-brand-primary font-medium"
                      : "text-foreground"
                  )}
                  onClick={() => {
                    setSelected(currency.code)
                    setOpen(false)
                  }}
                >
                  <span className="w-6 text-muted-foreground">{currency.symbol}</span>
                  <span>{currency.code}</span>
                  <span className="ml-auto text-xs text-muted-foreground">{currency.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
