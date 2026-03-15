import { Metadata } from "next";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "CISOStartupRadar Terms of Service.",
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Terms of Service - CISOStartupRadar",
          description: "Terms of Service for CISOStartupRadar",
        }}
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl text-[#0A0A0A] mb-8">
          Terms of Service
        </h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-gray-600">Last updated: March 2026</p>

          <h2 className="font-serif text-2xl mt-8">1. Acceptance of Terms</h2>
          <p className="text-gray-600">
            By accessing or using CISOStartupRadar, you agree to be bound by
            these Terms of Service and our Privacy Policy.
          </p>

          <h2 className="font-serif text-2xl mt-8">2. Use of Services</h2>
          <p className="text-gray-600">
            Our platform provides a directory and networking service for CISOs,
            cybersecurity startup founders, and enterprise teams. You agree to use
            the platform only for lawful purposes and in accordance with these terms.
          </p>

          <h2 className="font-serif text-2xl mt-8">3. User Accounts</h2>
          <p className="text-gray-600">
            You are responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account. CISO
            accounts require verification by our team.
          </p>

          <h2 className="font-serif text-2xl mt-8">4. Subscriptions and Payments</h2>
          <p className="text-gray-600">
            Paid subscriptions are billed monthly through Stripe. You may cancel
            your subscription at any time through the billing portal. Refunds are
            handled on a case-by-case basis.
          </p>

          <h2 className="font-serif text-2xl mt-8">5. Intellectual Property</h2>
          <p className="text-gray-600">
            All content and materials on CISOStartupRadar are protected by
            intellectual property rights. You may not reproduce, distribute, or
            create derivative works without our prior written consent.
          </p>

          <h2 className="font-serif text-2xl mt-8">6. Contact</h2>
          <p className="text-gray-600">
            For questions about these Terms, contact us at
            legal@cisostartupradar.com.
          </p>
        </div>
      </div>
    </>
  );
}
