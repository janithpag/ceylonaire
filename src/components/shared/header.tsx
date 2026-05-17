"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CurrencyToggle } from "@/components/shared/currency-toggle"

const NAV_LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/plan", label: "Plan a Trip" },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isHome = pathname === "/"
  const isTransparent = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-brand-surface shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "font-heading text-lg font-semibold tracking-wide transition-colors duration-300",
            isTransparent ? "text-white" : "text-brand-primary"
          )}
          aria-label="Ceylonaire home"
        >
          Ceylonaire
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                isTransparent
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : "text-brand-primary/60 hover:text-brand-primary hover:bg-brand-surface/60",
                pathname === link.href && (isTransparent ? "text-white bg-white/10" : "text-brand-primary bg-brand-surface/60")
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side — desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <CurrencyToggle variant={isTransparent ? "dark" : "light"} />
          <Link
            href="/auth/sign-in"
            className={cn(
              "inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition-all",
              isTransparent
                ? "bg-brand-amber text-brand-primary hover:bg-brand-amber-light"
                : "bg-brand-primary text-white hover:bg-brand-primary-light"
            )}
          >
            Sign In
          </Link>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1.5 md:hidden">
          <CurrencyToggle variant={isTransparent ? "dark" : "light"} />
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              className={cn(
                "flex size-9 items-center justify-center rounded-lg transition-colors",
                isTransparent
                  ? "text-white hover:bg-white/10"
                  : "text-brand-primary hover:bg-brand-surface"
              )}
              aria-label="Open menu"
            >
              <MenuIcon className="size-4.5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-white border-brand-surface/60">
              <SheetHeader>
                <SheetTitle className="font-heading text-brand-primary text-base">
                  Ceylonaire
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-0.5 px-1 pt-4" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors text-brand-primary/60 hover:text-brand-primary hover:bg-brand-surface/60",
                      pathname === link.href && "text-brand-primary bg-brand-surface/60"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4">
                  <Link
                    href="/auth/sign-in"
                    className="flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium bg-brand-primary text-white hover:bg-brand-primary-light transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
