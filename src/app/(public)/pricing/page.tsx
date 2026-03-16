import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Zap, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple, transparent pricing for founders and enterprise teams on CISOStartupRadar.",
};

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
            Transparent plans for founders and enterprise teams.
          </p>
        </div>
      </section>

      {/* Two pricing paths */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Founders */}
            <Link
              href="/pricing/founders"
              className="group relative flex flex-col rounded-2xl border border-[#E5E7EB] p-8 hover:shadow-xl hover:border-[#E5E7EB]/60 transition-all duration-300"
              style={{
                background:
                  "linear-gradient(145deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)",
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/5 flex items-center justify-center mb-5">
                <Zap className="h-6 w-6 text-[#1E3A5F]" />
              </div>
              <h3 className="font-bold text-xl text-[#0A0A0A] mb-2">
                Founders
              </h3>
              <p className="text-sm text-[#0A0A0A]/60 leading-relaxed mb-4 flex-1">
                Launch your cybersecurity startup on CISOStartupRadar. Get listed, connect with CISOs, and accelerate your go-to-market.
              </p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-[#0A0A0A]">
                  From $500
                </span>
                <span className="text-sm text-[#0A0A0A]/40 ml-1">/month</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0057FF] group-hover:gap-3 transition-all">
                View Founders Plans
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>

            {/* Enterprise */}
            <Link
              href="/pricing/enterprise"
              className="group relative flex flex-col rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300"
              style={{
                background:
                  "linear-gradient(145deg, #0A0F1C 0%, #1a2332 50%, #0A0F1C 100%)",
              }}
            >
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                <Building2 className="h-6 w-6 text-white/80" />
              </div>
              <h3 className="font-bold text-xl text-white mb-2">Enterprise</h3>
              <p className="text-sm text-white/50 leading-relaxed mb-4 flex-1">
                Custom solutions for organizations engaging the cybersecurity ecosystem at scale. API access, executive introductions, and dedicated support.
              </p>
              <div className="mb-6">
                <span className="text-3xl font-bold text-white">
                  From $2,500
                </span>
                <span className="text-sm text-white/40 ml-1">/month</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#0057FF] group-hover:gap-3 transition-all">
                View Enterprise Plans
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
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
