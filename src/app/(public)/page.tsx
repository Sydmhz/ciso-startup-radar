import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/shared/json-ld";
import { ArrowUpRight, ShieldAlert, Lightbulb, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "CISOStartupRadar - The Intelligence Layer for CISOs",
  description:
    "Verified CISO directory. Curated startup intelligence. Real deal flow. The intelligence layer for CISOs navigating the cybersecurity startup ecosystem.",
};

const metrics = [
  { value: "500+", label: "Cybersecurity Startups Tracked", delta: "+12%", period: "QoQ" },
  { value: "290+", label: "Verified CISOs in Network", delta: "+8%", period: "QoQ" },
  { value: "150+", label: "CISOs Exploring New Startups", delta: "+18%", period: "MoM" },
  { value: "$4.2B", label: "Cybersecurity Venture Funding Tracked", delta: "+22%", period: "YoY" },
];

const pillars = [
  {
    icon: ShieldAlert,
    label: "The Challenge",
    body: "The cybersecurity market is expanding rapidly, with thousands of startups across dozens of security categories. For CISOs, identifying meaningful innovation has become increasingly difficult.",
    gradient: "linear-gradient(145deg, #0A0F1C 0%, #1E3A5F 100%)",
    iconBg: "bg-white/10",
    iconColor: "text-[#60A5FA]",
    titleColor: "text-white",
    bodyColor: "text-white/60",
    border: "border-white/10",
  },
  {
    icon: Lightbulb,
    label: "The Opportunity",
    body: "Security leaders who understand emerging vendors early gain strategic advantage \u2014 in partnerships, technology adoption, and investment.",
    gradient: "linear-gradient(145deg, #1E3A5F 0%, #264B73 50%, #1E3A5F 100%)",
    iconBg: "bg-white/10",
    iconColor: "text-[#93C5FD]",
    titleColor: "text-white",
    bodyColor: "text-white/60",
    border: "border-white/10",
  },
  {
    icon: Layers,
    label: "The Platform",
    body: "CISOStartupRadar provides a curated intelligence platform for CISOs to track emerging cybersecurity startups and explore the evolving security ecosystem.",
    gradient: "linear-gradient(145deg, #0057FF 0%, #1E3A5F 100%)",
    iconBg: "bg-white/15",
    iconColor: "text-white",
    titleColor: "text-white",
    bodyColor: "text-white/60",
    border: "border-white/10",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "CISOStartupRadar",
          url: "https://cisostartupradar.com",
          description:
            "The intelligence layer for CISOs navigating the cybersecurity startup ecosystem.",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://cisostartupradar.com/directory?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />

      {/* Hero Section */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #F8FAFC 0%, #EFF4F9 40%, #FFFFFF 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-tight max-w-4xl mx-auto">
            The Intelligence Layer for CISOs Navigating the Cybersecurity
            Startup Ecosystem
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#0A0A0A]/70 max-w-3xl mx-auto">
            A curated, private network where CISOs discover emerging cybersecurity startups and engage directly with founders through partnerships, advisory roles, and investment opportunities.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <Button
              asChild
              size="lg"
              className="bg-navy hover:bg-navy/90 text-white px-8 py-3 text-base h-12"
            >
              <Link href="/apply">Apply for CISO Access</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Market Overview — Bloomberg Style */}
      <section className="bg-white border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 border-b border-[#E5E7EB]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1 h-5 bg-[#0057FF] rounded-full" />
                <span className="text-xs font-semibold tracking-widest uppercase text-[#0A0A0A]/50">Market Overview</span>
              </div>
              <span className="text-xs text-[#0A0A0A]/40">Updated Mar 2026</span>
            </div>
          </div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className={`px-4 sm:px-6 lg:px-8 py-8 ${
                  i < metrics.length - 1 ? "border-r border-[#E5E7EB]" : ""
                } ${i < 2 ? "border-b md:border-b-0 border-[#E5E7EB]" : ""}`}
              >
                <p className="text-xs font-medium tracking-wide uppercase text-[#0A0A0A]/40 mb-3">
                  {metric.label}
                </p>
                <p className="text-3xl md:text-4xl font-semibold text-[#0A0A0A] tracking-tight leading-none">
                  {metric.value}
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  {metric.period && (
                    <>
                      <ArrowUpRight className="h-3 w-3 text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-600">{metric.delta}</span>
                      <span className="text-xs text-[#0A0A0A]/30">{metric.period}</span>
                    </>
                  )}
                  {!metric.period && (
                    <span className="text-xs font-medium text-[#0057FF]">{metric.delta}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section className="py-20 md:py-28" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-16">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A]/30 mb-3">
              Why CISOStartupRadar
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#0A0A0A] leading-tight">
              Navigating the Cybersecurity
              <br className="hidden sm:block" />
              Startup Ecosystem
            </h2>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={i}
                  className={`relative rounded-2xl p-8 border ${pillar.border} hover:shadow-xl transition-all duration-300`}
                  style={{ background: pillar.gradient }}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${pillar.iconBg} mb-5`}>
                    <Icon className={`h-5 w-5 ${pillar.iconColor}`} />
                  </div>
                  <h3 className={`text-base font-bold ${pillar.titleColor} mb-3`}>
                    {pillar.label}
                  </h3>
                  <p className={`text-sm ${pillar.bodyColor} leading-relaxed`}>
                    {pillar.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
