import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Shield, Zap, Crown, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for CISOs, founders, and enterprise teams. Free for verified CISOs.",
};

const tiers = [
  {
    name: "CISO",
    description: "For verified security leaders",
    price: "Free",
    priceNote: "after verification",
    icon: Shield,
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
    highlighted: false,
    dark: false,
  },
  {
    name: "Founders Edition",
    description: "Launch your presence",
    price: "$500",
    priceNote: "/month",
    icon: Zap,
    features: [
      "Startup Directory listing",
      "Company profile page",
      "Basic analytics dashboard",
      "CISO outreach (5/month)",
      "Community forum access",
    ],
    cta: "Get Started",
    ctaLink: "#",
    highlighted: false,
    dark: false,
  },
  {
    name: "Founders Featured",
    description: "Maximum visibility & reach",
    price: "$1,000",
    priceNote: "/month",
    icon: Crown,
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
    highlighted: true,
    dark: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions at scale",
    price: "$2,500",
    priceNote: "/month",
    icon: Building2,
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
    highlighted: false,
    dark: false,
  },
];

const comparisonFeatures = [
  { name: "Startup Directory Access", ciso: true, founders: true, featured: true, enterprise: true },
  { name: "CISO Directory Access", ciso: true, founders: false, featured: false, enterprise: true },
  { name: "Venture Network", ciso: true, founders: false, featured: true, enterprise: true },
  { name: "Featured Listing", ciso: false, founders: false, featured: true, enterprise: true },
  { name: "Priority Support", ciso: false, founders: false, featured: true, enterprise: true },
  { name: "Custom Integrations", ciso: false, founders: false, featured: false, enterprise: true },
  { name: "Dedicated Account Manager", ciso: false, founders: false, featured: true, enterprise: true },
];

export default function PricingPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section
        className="py-16 md:py-24 border-b border-white/10"
        style={{
          background:
            "linear-gradient(135deg, #0A0F1C 0%, #111827 50%, #0A0F1C 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
            Pricing
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            Plans that scale with
            <br />
            your ambition
          </h1>
          <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            Free for verified CISOs. Transparent plans for founders and enterprise teams.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`relative flex flex-col rounded-2xl p-6 transition-all duration-300 ${
                    tier.dark
                      ? "text-white shadow-2xl shadow-[#0A0F1C]/20 scale-[1.02] z-10"
                      : "border border-[#E5E7EB] hover:border-[#E5E7EB]/60 hover:shadow-lg"
                  }`}
                  style={
                    tier.dark
                      ? {
                          background:
                            "linear-gradient(145deg, #0A0F1C 0%, #1a2332 50%, #0A0F1C 100%)",
                        }
                      : {
                          background:
                            "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)",
                        }
                  }
                >
                  {/* Badge */}
                  {tier.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#0057FF] text-white shadow-lg shadow-[#0057FF]/30">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tier.dark
                          ? "bg-white/10"
                          : "bg-[#1E3A5F]/5"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          tier.dark ? "text-white/80" : "text-[#1E3A5F]"
                        }`}
                      />
                    </div>
                    <div>
                      <h3
                        className={`font-bold text-base ${
                          tier.dark ? "text-white" : "text-[#0A0A0A]"
                        }`}
                      >
                        {tier.name}
                      </h3>
                      <p
                        className={`text-[12px] ${
                          tier.dark ? "text-white/40" : "text-[#0A0A0A]/40"
                        }`}
                      >
                        {tier.description}
                      </p>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-dashed" style={{ borderColor: tier.dark ? "rgba(255,255,255,0.1)" : "#E5E7EB" }}>
                    <span
                      className={`text-4xl font-bold tracking-tight ${
                        tier.dark ? "text-white" : "text-[#0A0A0A]"
                      }`}
                    >
                      {tier.price}
                    </span>
                    <span
                      className={`text-sm ml-1 ${
                        tier.dark ? "text-white/40" : "text-[#0A0A0A]/40"
                      }`}
                    >
                      {tier.priceNote}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            tier.dark
                              ? "bg-[#0057FF]/20"
                              : "bg-green-50"
                          }`}
                        >
                          <Check
                            className={`h-2.5 w-2.5 ${
                              tier.dark
                                ? "text-[#0057FF]"
                                : "text-green-600"
                            }`}
                            strokeWidth={3}
                          />
                        </div>
                        <span
                          className={`text-sm leading-snug ${
                            tier.dark ? "text-white/70" : "text-[#0A0A0A]/70"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={tier.ctaLink}
                    className={`group flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                      tier.dark
                        ? "bg-[#0057FF] hover:bg-[#0057FF]/90 text-white shadow-lg shadow-[#0057FF]/20"
                        : tier.name === "CISO"
                        ? "bg-[#1E3A5F] hover:bg-[#1E3A5F]/90 text-white"
                        : tier.name === "Enterprise"
                        ? "border border-[#1E3A5F]/20 text-[#1E3A5F] hover:bg-[#1E3A5F]/5"
                        : "bg-[#0A0A0A] hover:bg-[#0A0A0A]/90 text-white"
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A]/30 mb-2">
              Compare
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#0A0A0A]">
              Feature Comparison
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr
                  style={{
                    background:
                      "linear-gradient(135deg, #0A0F1C 0%, #111827 100%)",
                  }}
                >
                  <th className="text-left py-4 px-6 font-medium text-white/60 text-[13px]">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-medium text-white/60 text-[13px]">
                    CISO
                  </th>
                  <th className="text-center py-4 px-4 font-medium text-white/60 text-[13px]">
                    Founders
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-white text-[13px]">
                    Featured
                  </th>
                  <th className="text-center py-4 px-4 font-medium text-white/60 text-[13px]">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr
                    key={feature.name}
                    className={`border-b border-[#E5E7EB]/60 last:border-0 ${
                      idx % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]/50"
                    }`}
                  >
                    <td className="py-3.5 px-6 text-[#0A0A0A]/70 font-medium">
                      {feature.name}
                    </td>
                    {(
                      [
                        feature.ciso,
                        feature.founders,
                        feature.featured,
                        feature.enterprise,
                      ] as boolean[]
                    ).map((val, i) => (
                      <td key={i} className="py-3.5 px-4 text-center">
                        {val ? (
                          <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center mx-auto">
                            <Check className="h-3 w-3 text-green-600" strokeWidth={3} />
                          </div>
                        ) : (
                          <span className="inline-block w-4 h-[1.5px] bg-[#0A0A0A]/10 rounded-full" />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16"
        style={{
          background:
            "linear-gradient(135deg, #0A0F1C 0%, #111827 50%, #0A0F1C 100%)",
        }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-2xl md:text-3xl text-white mb-3">
            Not sure which plan is right?
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Our team will help you find the perfect fit for your organization.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-[#0057FF] hover:bg-[#0057FF]/90 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-[#0057FF]/20"
            >
              Apply as CISO
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#"
              className="inline-flex items-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Talk to Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
