import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for CISOs, founders, and enterprise teams. Free for verified CISOs.",
};

const tiers = [
  {
    name: "CISO",
    price: "Free",
    priceNote: "Free after verification",
    features: [
      "Full Startup Directory access",
      "CISO peer directory",
      "Training program listings",
      "Venture Network access",
      "Board & advisory seat listings",
      "Investment deal flow",
    ],
    cta: "Apply Now",
    ctaLink: "/apply",
    ctaStyle: "bg-navy hover:bg-navy/90 text-white",
    highlighted: false,
    badge: null,
  },
  {
    name: "Founders Edition",
    price: "$500",
    priceNote: "/month",
    features: [
      "Startup Directory listing",
      "Company profile page",
      "Basic analytics dashboard",
      "CISO outreach (5/month)",
      "Community forum access",
    ],
    cta: "Get Started",
    ctaLink: "#",
    ctaStyle: "bg-blue-cta hover:bg-blue-cta/90 text-white",
    highlighted: false,
    badge: null,
  },
  {
    name: "Founders Featured",
    price: "$1,000",
    priceNote: "/month",
    features: [
      "Everything in Founders Edition",
      "Featured listing with gold badge",
      "Priority placement in directory",
      "CISO outreach (unlimited)",
      "Advanced analytics & engagement data",
      "Dedicated account manager",
      "Priority support",
    ],
    cta: "Get Started",
    ctaLink: "#",
    ctaStyle: "bg-blue-cta hover:bg-blue-cta/90 text-white",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "$2,500",
    priceNote: "/month",
    features: [
      "Everything in Founders Featured",
      "Custom integrations & API access",
      "White-glove onboarding",
      "Executive introductions",
      "Custom CISO engagement reports",
      "Multi-seat team access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    ctaLink: "#",
    ctaStyle: "border-navy text-navy hover:bg-navy/5",
    ctaVariant: "outline" as const,
    highlighted: false,
    badge: null,
  },
];

const comparisonFeatures = [
  {
    name: "Startup Directory Access",
    ciso: true,
    founders: true,
    featured: true,
    enterprise: true,
  },
  {
    name: "CISO Directory Access",
    ciso: true,
    founders: false,
    featured: false,
    enterprise: true,
  },
  {
    name: "Venture Network",
    ciso: true,
    founders: false,
    featured: true,
    enterprise: true,
  },
  {
    name: "Featured Listing",
    ciso: false,
    founders: false,
    featured: true,
    enterprise: true,
  },
  {
    name: "Priority Support",
    ciso: false,
    founders: false,
    featured: true,
    enterprise: true,
  },
  {
    name: "Custom Integrations",
    ciso: false,
    founders: false,
    featured: false,
    enterprise: true,
  },
  {
    name: "Dedicated Account Manager",
    ciso: false,
    founders: false,
    featured: true,
    enterprise: true,
  },
];

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gray-50 border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl md:text-4xl text-navy text-center">
            Simple, Transparent Pricing
          </h1>
          <p className="text-center text-[#0A0A0A]/60 mt-3 max-w-xl mx-auto">
            Free for verified CISOs. Affordable plans for founders and
            enterprise teams.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative bg-white flex flex-col ${
                  tier.highlighted
                    ? "ring-2 ring-blue-cta shadow-lg"
                    : ""
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-blue-cta text-white px-3 py-1">
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg text-[#0A0A0A]">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-3">
                    <span className="text-3xl font-bold text-navy">
                      {tier.price}
                    </span>
                    <span className="text-sm text-[#0A0A0A]/60">
                      {tier.priceNote}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-6 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-[#0A0A0A]/80"
                      >
                        <Check className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant={
                      "ctaVariant" in tier ? tier.ctaVariant : "default"
                    }
                    className={`w-full ${tier.ctaStyle}`}
                  >
                    <Link href={tier.ctaLink}>{tier.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-12 bg-gray-50 border-t border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl text-navy text-center mb-8">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-3 px-4 font-medium text-[#0A0A0A]">
                    Feature
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-[#0A0A0A]">
                    CISO
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-[#0A0A0A]">
                    Founders
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-[#0A0A0A]">
                    Featured
                  </th>
                  <th className="text-center py-3 px-4 font-medium text-[#0A0A0A]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr
                    key={feature.name}
                    className="border-b border-[#E5E7EB] last:border-0"
                  >
                    <td className="py-3 px-4 text-[#0A0A0A]/80">
                      {feature.name}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {feature.ciso ? (
                        <Check className="h-4 w-4 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-[#0A0A0A]/20 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {feature.founders ? (
                        <Check className="h-4 w-4 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-[#0A0A0A]/20 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {feature.featured ? (
                        <Check className="h-4 w-4 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-[#0A0A0A]/20 mx-auto" />
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {feature.enterprise ? (
                        <Check className="h-4 w-4 text-green-600 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-[#0A0A0A]/20 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
