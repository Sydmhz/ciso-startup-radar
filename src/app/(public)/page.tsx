import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/shared/json-ld";
import { Quote, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "CISOStartupRadar - The Intelligence Layer for CISOs",
  description:
    "Verified CISO directory. Curated startup intelligence. Real deal flow. The intelligence layer for CISOs navigating the cybersecurity startup ecosystem.",
};

const metrics = [
  { value: "551", label: "Startups Tracked", delta: "+12%", period: "QoQ" },
  { value: "290+", label: "Verified CISOs", delta: "+8%", period: "QoQ" },
  { value: "$4.2B", label: "Total Funding Mapped", delta: "+22%", period: "YoY" },
  { value: "16", label: "Training Programs", delta: "Curated", period: "" },
];

const testimonials = [
  {
    quote:
      "CISOStartupRadar has transformed how I discover emerging cybersecurity vendors. The curated intelligence saves me hours of research every week.",
    name: "Sarah Chen",
    title: "CISO",
    company: "Meridian Financial Group",
  },
  {
    quote:
      "As a founder, getting visibility with enterprise CISOs is everything. This platform connected us with three Fortune 500 security leaders in our first month.",
    name: "Marcus Rivera",
    title: "CEO & Co-Founder",
    company: "VaultShield Security",
  },
  {
    quote:
      "The venture network feature alone is worth it. I sourced two board advisory positions and connected with pre-Series A startups aligned with our security roadmap.",
    name: "David Park",
    title: "VP of Information Security",
    company: "Atlas Healthcare Systems",
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
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-tight max-w-4xl mx-auto">
            The Intelligence Layer for CISOs Navigating the Cybersecurity
            Startup Ecosystem
          </h1>
          <p className="mt-6 text-lg md:text-xl text-[#0A0A0A]/70 max-w-3xl mx-auto">
            Discover verified cybersecurity startups, connect with founders, explore CISO training programs, and access curated market intelligence built for security leaders.
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

      {/* Testimonials */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl text-navy text-center mb-12">
            Trusted by Security Leaders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="bg-white border-0 shadow-sm">
                <CardContent className="pt-2">
                  <Quote className="h-8 w-8 text-navy/20 mb-4" />
                  <p className="text-[#0A0A0A]/80 leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div>
                    <p className="font-medium text-[#0A0A0A]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#0A0A0A]/60">
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
