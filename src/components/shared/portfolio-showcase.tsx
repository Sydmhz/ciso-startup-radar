"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const companies = [
  {
    name: "Cyera",
    founded: "2021",
    founders: "Yotam Segev, Tamar Bar-Ilan",
    funding: "$1.7B+",
    sector: "Data Security",
    gradient: "linear-gradient(135deg, #0A1628 0%, #1E3A5F 40%, #0A2540 100%)",
    accent: "#3B82F6",
  },
  {
    name: "Chainguard",
    founded: "2021",
    founders: "Dan Lorenc, Matt Moore, Kim Lewandowski",
    funding: "$892M",
    sector: "Supply Chain Security",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E293B 40%, #0C4A6E 100%)",
    accent: "#06B6D4",
  },
  {
    name: "Quantinuum",
    founded: "2021",
    founders: "Ilyas Khan, Honeywell Quantum Solutions",
    funding: "$1.4B+",
    sector: "Quantum Security",
    gradient: "linear-gradient(135deg, #1A0A2E 0%, #2D1B69 40%, #1E1B4B 100%)",
    accent: "#8B5CF6",
  },
  {
    name: "Delinea",
    founded: "2021",
    founders: "Jonathan Cogley, Tom Kemp",
    funding: "$1.4B+",
    sector: "Identity Security",
    gradient: "linear-gradient(135deg, #0A1628 0%, #164E63 40%, #0E3A5C 100%)",
    accent: "#14B8A6",
  },
  {
    name: "SandboxAQ",
    founded: "2022",
    founders: "Jack Hidary",
    funding: "$950M+",
    sector: "Quantum Security",
    gradient: "linear-gradient(135deg, #0C0A1D 0%, #1E1B4B 40%, #312E81 100%)",
    accent: "#6366F1",
  },
  {
    name: "Adaptive Security",
    founded: "2024",
    founders: "Brian Long, Andrew Jones",
    funding: "$146.5M",
    sector: "Security Awareness",
    gradient: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 40%, #0A2540 100%)",
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
      }, 300);
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
                fontFamily:
                  "'Instrument Serif', 'Georgia', serif",
              }}
            >
              The cybersecurity startups defining the next generation of
              security.
            </h2>
          </div>

          {/* Right panel — carousel */}
          <div className="md:w-[62%] relative overflow-hidden">
            {/* Card */}
            <div
              className={`relative w-full h-full min-h-[400px] md:min-h-[520px] lg:min-h-[600px] transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
              style={{ background: company.gradient }}
            >
              {/* Abstract visual pattern */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: `
                      linear-gradient(${company.accent}40 1px, transparent 1px),
                      linear-gradient(90deg, ${company.accent}40 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                  }}
                />
                {/* Large accent circle */}
                <div
                  className="absolute -right-20 -top-20 w-[400px] h-[400px] rounded-full opacity-[0.08]"
                  style={{
                    background: `radial-gradient(circle, ${company.accent} 0%, transparent 70%)`,
                  }}
                />
                {/* Second accent glow */}
                <div
                  className="absolute -left-10 bottom-[30%] w-[300px] h-[300px] rounded-full opacity-[0.06]"
                  style={{
                    background: `radial-gradient(circle, ${company.accent} 0%, transparent 70%)`,
                  }}
                />
                {/* Company initial — large watermark */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[220px] md:text-[280px] font-bold leading-none select-none pointer-events-none opacity-[0.04]"
                  style={{ color: company.accent }}
                >
                  {company.name.charAt(0)}
                </div>
                {/* Sector label */}
                <div className="absolute top-6 right-6">
                  <span
                    className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] rounded-full border"
                    style={{
                      color: `${company.accent}`,
                      borderColor: `${company.accent}40`,
                      background: `${company.accent}15`,
                    }}
                  >
                    {company.sector}
                  </span>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/40 transition-all"
                aria-label="Previous company"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/40 transition-all"
                aria-label="Next company"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Bottom overlay — company info */}
              <div className="absolute bottom-0 left-0 right-0">
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