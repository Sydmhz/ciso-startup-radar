import { Metadata } from "next";
import { JsonLd } from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "CISOStartupRadar Privacy Policy - How we handle your data.",
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Privacy Policy - CISOStartupRadar",
          description: "Privacy Policy for CISOStartupRadar",
        }}
      />
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="font-serif text-4xl text-[#0A0A0A] mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <p className="text-gray-600">Last updated: March 2026</p>

          <h2 className="font-serif text-2xl mt-8">1. Information We Collect</h2>
          <p className="text-gray-600">
            We collect information you provide directly to us, including your name,
            email address, company information, and professional credentials when
            you create an account, apply as a CISO, or submit a startup listing.
          </p>

          <h2 className="font-serif text-2xl mt-8">2. How We Use Your Information</h2>
          <p className="text-gray-600">
            We use the information we collect to provide, maintain, and improve our
            services, process applications, facilitate connections between CISOs and
            startups, and communicate with you about your account.
          </p>

          <h2 className="font-serif text-2xl mt-8">3. Information Sharing</h2>
          <p className="text-gray-600">
            We do not sell your personal information. We may share your information
            with other verified members of the platform as part of our directory
            and networking services, and with service providers who assist in
            operating our platform.
          </p>

          <h2 className="font-serif text-2xl mt-8">4. Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>

          <h2 className="font-serif text-2xl mt-8">5. Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions about this Privacy Policy, please contact us
            at privacy@cisostartupradar.com.
          </p>
        </div>
      </div>
    </>
  );
}
