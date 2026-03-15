"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/directory", label: "Directory" },
  { href: "/cisos", label: "CISOs" },
  { href: "/training", label: "Training" },
  { href: "/venture-network", label: "Venture Network" },
  { href: "/pricing", label: "Pricing" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-serif text-xl text-navy font-normal">
            CISOStartupRadar
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#0A0A0A] hover:text-navy transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild className="bg-navy hover:bg-navy/90 text-white text-sm">
              <Link href="/apply">Apply as CISO</Link>
            </Button>
            <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy/5 text-sm">
              <Link href="/directory">List Your Startup</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-[#E5E7EB]">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-[#0A0A0A] hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-2 px-3 pt-2">
                <Button asChild className="bg-navy hover:bg-navy/90 text-white text-sm w-full">
                  <Link href="/apply">Apply as CISO</Link>
                </Button>
                <Button asChild variant="outline" className="border-navy text-navy text-sm w-full">
                  <Link href="/directory">List Your Startup</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
