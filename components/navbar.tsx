"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/app/client-layout"

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-primary-foreground font-bold text-lg">Z</span>
            </div>
            <span className="font-bold text-xl text-primary hidden sm:inline">ZAWAR</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors text-sm sm:text-base font-medium"
            >
              Beranda
            </Link>
            <Link
              href="/zakat"
              className="text-foreground hover:text-primary transition-colors text-sm sm:text-base font-medium"
            >
              Zakat
            </Link>
            <Link
              href="/waris"
              className="text-foreground hover:text-primary transition-colors text-sm sm:text-base font-medium"
            >
              Warisan
            </Link>

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2" aria-label="Toggle theme">
              {isDark ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1m-16 0H1m15.364 1.636l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
