"use client"

import Link from "next/link"

const NAV_SECTIONS = [
  {
    heading: "Product",
    links: [
      { label: "Plan a Trip", href: "/plan" },
      { label: "Explore Itineraries", href: "/explore" },
      { label: "My Trips", href: "/dashboard" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative bg-brand-primary">
      {/* Top accent line */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #CDB3FF 50%, transparent)",
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-5xl px-5 pt-14 pb-10 sm:px-8 lg:px-10">
        {/* Newsletter */}
        <div className="mb-10 flex flex-col gap-4 border-b border-white/10 pb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-lg font-semibold text-white">
              Stay inspired
            </h3>
            <p className="mt-1 text-sm text-white/50">
              Get travel tips and new itineraries in your inbox.
            </p>
          </div>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-56 rounded-lg border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-brand-lavender/50"
            />
            <button
              type="submit"
              className="rounded-lg bg-brand-lavender px-5 py-2.5 text-sm font-semibold text-brand-primary transition-colors hover:bg-brand-lavender-light"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Main grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-heading text-lg font-semibold text-white">
              Ceylonaire
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/50">
              AI-powered Sri Lanka travel itineraries, personalised for your
              adventure. Plan your perfect trip in seconds with Ceyla.
            </p>
            {/* Social */}
            <div className="mt-5 flex gap-2.5">
              {[
                {
                  label: "X / Twitter",
                  href: "https://twitter.com/ceylonaire",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.254 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "Instagram",
                  href: "https://instagram.com/ceylonaire",
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-3.5" aria-hidden>
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-lg border border-white/15 text-white/50 transition-colors hover:border-white/30 hover:text-white/80"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav sections */}
          {NAV_SECTIONS.map((section) => (
            <div key={section.heading}>
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                {section.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white/80"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-1.5 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Ceylonaire. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            A product by{" "}
            <a
              href="https://intellanext.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-lavender/60 transition-colors hover:text-brand-lavender"
            >
              IntellaNext (Pvt) Ltd
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
