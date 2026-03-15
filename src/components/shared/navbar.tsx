"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <nav className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/logo.png"
              alt="CISO StartUp Radar"
              width={200}
              height={145}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Button key={link.href} asChild className="bg-navy hover:bg-navy/90 text-white text-sm">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
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
                <Button key={link.href} asChild className="bg-navy hover:bg-navy/90 text-white text-sm w-full justify-start">
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
