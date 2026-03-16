"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinksLeft = [
  { href: "/directory", label: "Startup Directory" },
  { href: "/cisos", label: "CISO Directory" },
];

const navLinksRight = [
  { href: "/venture-network", label: "Venture Network" },
];

const allNavLinks = [...navLinksLeft, ...navLinksRight];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 border-b border-white/10"
      style={{
        background:
          "linear-gradient(135deg, #0A0F1C 0%, #111827 50%, #0A0F1C 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Left nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {navLinksLeft.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo-nav.png"
              alt="CISO StartUp Radar"
              width={676}
              height={486}
              className="h-[56px] w-auto object-contain"
              priority
            />
          </Link>

          {/* Right nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-end">
            {navLinksRight.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white/70"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/10">
            <div className="flex flex-col pt-3">
              {allNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
