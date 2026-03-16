import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight, Building2, ShieldCheck, Globe, Headphones } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise Pricing",
  description:
    "Custom enterprise solutions for organizations looking to engage with the cybersecurity startup ecosystem at scale.",
};

const features = [
  {
    icon: ShieldCheck,
    title: "Custom Integrations & API",
    description:
      "Connect CISOStartupRadar data directly into your internal tools and workflows with our enterprise API.",
  },
  {
    icon: Globe,
    title: "Executive Introductions",
    description:
      "Direct introductions to CISOs and security leaders tailored to your strategic objectives.",
  },
  {
    icon: Headphones,
    title: "Dedicated Account Manager",
    description:
      "A single point of contact for onboarding, strategy, and ongoing support.",
  },
  {
    icon: Building2,
    title: "Multi-Seat Team Access",
    description:
      "Bring your entire team onto the platform with role-based permissions and shared analytics.",
  },
];

const includedFeatures = [
  "Everything in Founders Featured",
  "Custom integrations & API access",
  "White-glove onboarding",
  "Executive introductions",
  "Custom CISO engagement reports",
  "Multi-seat team access",
  "Dedicated account manager",
  "Priority support with SLA",
  "Quarterly business reviews",
  "Custom data exports",
];

export default function EnterprisePricingPage() {
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
            Enterprise Pricing
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            Custom solutions
            <br />
            built for scale
          </h1>
          <p className="text-white/50 mt-4 text-lg max-w-xl mx-auto leading-relaxed">
            Tailored plans for enterprise teams looking to engage the cybersecurity startup ecosystem at scale.
          </p>
          <div className="mt-6">
            <Link
              href="/pricing/founders"
              className="text-[13px] text-white/40 hover:text-white/70 transition-colors underline underline-offset-4"
            >
              Looking for Founders pricing?
            </Link>
          </div>
        </div>
      </section>

      {/* Enterprise Card */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl p-8 md:p-12 shadow-2xl shadow-[#0A0F1C]/10"
            style={{
              background:
                "linear-gradient(145deg, #0A0F1C 0%, #1a2332 50%, #0A0F1C 100%)",
            }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
              {/* Left */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-white/80" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-white">Enterprise</h3>
                    <p className="text-[13px] text-white/40">
                      Custom solutions at scale
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-bold tracking-tight text-white">
                    $2,500
                  </span>
                  <span className="text-sm ml-2 text-white/40">/month</span>
                  <p className="text-[13px] text-white/30 mt-1">
                    Starting price. Custom pricing available for larger teams.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="#"
                    className="group inline-flex items-center justify-center gap-2 bg-[#0057FF] hover:bg-[#0057FF]/90 text-white px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-[#0057FF]/20"
                  >
                    Contact Sales
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/70 hover:text-white hover:border-white/40 px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Schedule a Demo
                  </Link>
                </div>
              </div>

              {/* Right — features list */}
              <div className="flex-1 md:pl-8 md:border-l md:border-white/10">
                <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white/30 mb-4">
                  Everything included
                </p>
                <ul className="space-y-3">
                  {includedFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#0057FF]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check
                          className="h-2.5 w-2.5 text-[#0057FF]"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="text-sm text-white/70 leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature highlights */}
      <section
        className="py-16 md:py-20"
        style={{
          background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A]/30 mb-2">
              Enterprise Features
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-[#0A0A0A]">
              Built for security organizations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-[#E5E7EB] p-6 hover:shadow-lg transition-shadow"
                  style={{
                    background:
                      "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 100%)",
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[#1E3A5F]" />
                  </div>
                  <h3 className="font-bold text-[#0A0A0A] mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#0A0A0A]/60 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              );
            })}
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
            Ready to scale your engagement?
          </h2>
          <p className="text-white/50 mb-8 max-w-lg mx-auto">
            Our enterprise team will build a custom solution for your organization.
          </p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-[#0057FF] hover:bg-[#0057FF]/90 text-white px-8 py-3 rounded-xl text-sm font-semibold transition-colors shadow-lg shadow-[#0057FF]/20"
          >
            Talk to Sales
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
