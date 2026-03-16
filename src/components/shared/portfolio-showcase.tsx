"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const companies = [
  {
    name: "Cyera",
    founded: "2021",
    founders: "Yotam Segev, Tamar Bar-Ilan",
    funding: "$1.7B+",
    sector: "Data Security",
    image: "/founders/cyera.jpg",
    accent: "#3B82F6",
  },
  {
    name: "Chainguard",
    founded: "2021",
    founders: "Dan Lorenc, Matt Moore, Kim Lewandowski",
    funding: "$892M",
    sector: "Supply Chain Security",
    image: "/founders/chainguard.jpg",
    accent: "#06B6D4",
  },
  {
    name: "Quantinuum",
    founded: "2021",
    founders: "Ilyas Khan, Honeywell Quantum Solutions",
    funding: "$1.4B+",
    sector: "Quantum Security",
    image: "/founders/quantinuum.jpg",
    accent: "#8B5CF6",
  },
  {
    name: "Delinea",
    founded: "2021",
    founders: "Jonathan Cogley, Tom Kemp",
    funding: "$1.4B+",
    sector: "Identity Security",
    image: "/founders/delinea.jpg",
    accent: "#14B8A6",
  },
  {
    name: "SandboxAQ",
    founded: "2022",
    founders: "Jack Hidary",
    funding: "$950M+",
    sector: "Quantum Security",
    image: "/founders/sandboxaq.jpg",
    accent: "#6366F1",
  },
  {
    name: "Adaptive Security",
    founded: "2024",
    founders: "Brian Long, Andrew Jones",
    funding: "$146.5M",
    sector: "Security Awareness",
    image: "/founders/adaptive.jpg",
    accent: "#0EA5E9",
  },
];

export function PortfolioShowcase() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setIsTransitioning(false);
      }, 400);
    },
    [isTransitioning]
  );

  const next = useCallback(() => {
    goTo((current + 1) % companies.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + companies.length) % companies.length);
  }, [current, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const company = companies[current];
  const progress = ((current + 1) / companies.length) * 100;

  return (
    <section className="bg-[#F5F2EA]">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row min-h-[520px] lg:min-h-[600px]">
          {/* Left panel — headline text */}
          <div className="md:w-[38%] flex items-center px-8 md:px-12 lg:px-16 py-12 md:py-0">
            <h2
              className="text-3xl md:text-4xl lg:text-[44px] leading-[1.15] tracking-tight"
              style={{
                color: "#3D3A2A",
                fontFamily: "'Instrument Serif', 'Georgia', serif",
              }}
            >
              The cybersecurity startups defining the next generation of
              security.
            </h2>
          </div>

          {/* Right panel — carousel */}
          <div className="md:w-[62%] relative overflow-hidden bg-black">
            {/* Image card */}
            <div
              className={`relative w-full h-full min-h-[400px] md:min-h-[520px] lg:min-h-[600px] transition-opacity duration-400 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* Founder image */}
              <Image
                src={company.image}
                alt={`${company.name} founders`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 62vw"
                priority={current === 0}
                unoptimized
              />

              {/* Dark overlay for bottom readability */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.6) 85%, rgba(0,0,0,0.85) 100%)",
                }}
              />

              {/* Navigation arrows */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/50 transition-all"
                aria-label="Previous company"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white hover:bg-black/50 transition-all"
                aria-label="Next company"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Bottom overlay — company info */}
              <div className="absolute bottom-0 left-0 right-0 z-10">
                {/* Progress bar */}
                <div className="h-[3px] bg-white/10">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                      background: company.accent,
                    }}
                  />
                </div>
                {/* Info bar */}
                <div className="backdrop-blur-xl bg-black/40 px-6 md:px-8 py-5 md:py-6">
                  <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-0">
                    {/* Left — name, founders */}
                    <div className="md:flex-1 md:pr-6 md:border-r md:border-white/20">
                      <p className="text-white font-semibold text-base md:text-lg">
                        {company.name}
                        <span className="text-white/40 font-normal">
                          , founded {company.founded}
                        </span>
                      </p>
                      <p className="text-white/50 text-sm mt-1.5">
                        {company.founders}
                      </p>
                    </div>
                    {/* Right — stats */}
                    <div className="md:pl-6 flex items-end gap-8">
                      <div>
                        <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">
                          Founded
                        </p>
                        <p className="text-white text-2xl md:text-3xl font-bold tracking-tight leading-none">
                          {company.founded}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/40 text-[11px] uppercase tracking-wider mb-1">
                          Total Funding
                        </p>
                        <p className="text-white text-2xl md:text-3xl font-bold tracking-tight leading-none">
                          {company.funding}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}