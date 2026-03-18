'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/landing' },
  { label: '1 zu 1 Coachings', href: '/coachings' },
  { label: 'Trading Schulungen', href: '/schulungen' },
  {
    label: 'Beratung',
    href: '#',
    dropdown: [
      { label: 'Tradingberatung', href: '/tradingberatung' },
      { label: 'Brokerberatung', href: '/brokerberatung' },
      { label: 'Hilfe bei Brokerbetrug', href: '/brokerbetrug' },
    ],
  },
  { label: 'Trading Signale', href: '/signale' },
  { label: 'Trading Software', href: '/software' },
  { label: 'Affiliate Programm', href: '/affiliate' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'FAQ', href: '/faq' },
]

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [beratungOpen, setBeratungOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[#334155] bg-[#0F172A]/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/landing" className="flex-shrink-0 group">
            <div className="leading-tight">
              <div className="text-lg font-extrabold tracking-wide text-white group-hover:text-blue-400 transition-colors">
                ROBOTRADING.NET
              </div>
              <div className="text-[10px] font-medium tracking-widest text-blue-400 uppercase">
                Ihr Sprung in die Gewinnzone!
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label} className="relative group">
                  <button
                    className="flex items-center gap-1 rounded px-2.5 py-2 text-sm text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors whitespace-nowrap"
                    onClick={() => setBeratungOpen(!beratungOpen)}
                    onMouseEnter={() => setBeratungOpen(true)}
                    onMouseLeave={() => setBeratungOpen(false)}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  {beratungOpen && (
                    <div
                      className="absolute left-0 top-full mt-0 w-52 rounded-lg border border-[#334155] bg-[#1E293B] py-1 shadow-xl"
                      onMouseEnter={() => setBeratungOpen(true)}
                      onMouseLeave={() => setBeratungOpen(false)}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm text-[#94A3B8] hover:bg-[#0F172A] hover:text-white transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded px-2.5 py-2 text-sm text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors whitespace-nowrap"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden xl:flex items-center gap-2 flex-shrink-0">
            <Link
              href="/sign-in"
              className="rounded px-3 py-1.5 text-sm font-medium text-[#94A3B8] hover:text-white transition-colors"
            >
              Anmelden
            </Link>
            <Link
              href="/sign-up"
              className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Kostenlos starten
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="xl:hidden rounded p-2 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Navigation öffnen"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="xl:hidden border-t border-[#334155] bg-[#0F172A] px-4 pb-4">
          <nav className="flex flex-col pt-2">
            {navItems.map((item) =>
              item.dropdown ? (
                <div key={item.label}>
                  <button
                    className="flex w-full items-center justify-between px-3 py-2.5 text-sm text-[#94A3B8] hover:text-white"
                    onClick={() => setBeratungOpen(!beratungOpen)}
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${beratungOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {beratungOpen && (
                    <div className="ml-4 border-l border-[#334155] pl-3">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block py-2 text-sm text-[#94A3B8] hover:text-white"
                          onClick={() => setMobileOpen(false)}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded px-3 py-2.5 text-sm text-[#94A3B8] hover:text-white hover:bg-[#1E293B] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-3 flex flex-col gap-2 border-t border-[#334155] pt-3">
              <Link
                href="/sign-in"
                className="rounded px-3 py-2 text-center text-sm font-medium text-[#94A3B8] hover:text-white border border-[#334155] hover:border-[#475569] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Anmelden
              </Link>
              <Link
                href="/sign-up"
                className="rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Kostenlos starten
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
