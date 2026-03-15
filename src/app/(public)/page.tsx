import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/components/shared/json-ld";
import { Shield, Rocket, Building2, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "CISOStartupRadar - The Intelligence Layer for CISOs",
  description:
    "Verified CISO directory. Curated startup intelligence. Real deal flow. The intelligence layer for CISOs navigating the cybersecurity startup ecosystem.",
};

const features = [
  {
    icon: Shield,
    title: "For CISOs",
    description:
      "Access verified peer directory, training resources, and exclusive deal flow",
  },
  {
    icon: Rocket,
    title: "For Founders",
    description:
      "Get your cybersecurity startup in front of the right CISOs and investors",
  },
  {
    icon: Building2,
    title: "For Enterprise Teams",
    description:
      "Find vetted cybersecurity startups and access board-ready CISO talent",
  },
];

const stats = [
  { value: "250+", label: "Startups Tracked" },
  { value: "100+", label: "Verified CISOs" },
  { value: "Updated", label: "Monthly" },
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
          <p className="mt-6 text-lg md:text-xl text-[#0A0A0A]/70 max-w-2xl mx-auto">
            Verified CISO directory. Curated startup intelligence. Real deal
            flow.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-navy hover:bg-navy/90 text-white px-8 py-3 text-base h-12"
            >
              <Link href="/apply">Apply as a CISO &mdash; It&apos;s Free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-navy text-navy hover:bg-navy/5 px-8 py-3 text-base h-12"
            >
              <Link href="/directory">Explore the Startup Directory</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Blocks */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-white border-0 shadow-sm">
                <CardContent className="pt-2">
                  <div className="w-12 h-12 rounded-lg bg-navy/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-navy" />
                  </div>
                  <h3 className="font-serif text-xl text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#0A0A0A]/70 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white py-12 border-y border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="block text-3xl font-bold text-navy">
                  {stat.value}
                </span>
                <span className="text-sm text-navy/70 mt-1">
                  {stat.label}
                </span>
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
