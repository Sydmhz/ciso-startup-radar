"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/directory", label: "Startup Directory" },
  { href: "/cisos", label: "CISO Directory" },
  { href: "/training", label: "CISO Trainings" },
  { href: "/venture-network", label: "Venture Network" },
  { href: "/pricing", label: "Pricing" },
];

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
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            {/* Radar icon */}
            <svg
              width="36"
              height="36"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
            >
              <circle cx="20" cy="32" r="4" fill="#3B82F6" />
              <path
                d="M12 28C12 22.477 16.477 18 22 18"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M6 24C6 15.163 13.163 8 22 8"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M0 20C0 8.954 8.954 0 20 0"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </svg>
            {/* Text mark */}
            <div className="flex flex-col leading-none">
              <span className="text-[22px] font-bold tracking-tight text-blue-400">
                CISO
              </span>
              <span className="text-[13px] font-medium tracking-wide text-white/80">
                StartUp Radar
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
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
              {navLinks.map((link) => (
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
