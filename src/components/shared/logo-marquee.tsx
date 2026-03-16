"use client";

import Image from "next/image";

const companies = [
  { name: "Cyera", domain: "cyera.com" },
  { name: "Chainguard", domain: "chainguard.dev" },
  { name: "Quantinuum", domain: "quantinuum.com" },
  { name: "Delinea", domain: "delinea.com" },
  { name: "SandboxAQ", domain: "sandboxaq.com" },
  { name: "XBOW", domain: "xbow.com" },
  { name: "Noma Security", domain: "noma.security" },
  { name: "Adaptive Security", domain: "adaptivesecurity.com" },
  { name: "Upwind", domain: "upwind.io" },
  { name: "Protect AI", domain: "protectai.com" },
  { name: "Qevlar", domain: "qevlar.com" },
  { name: "Promptfoo", domain: "promptfoo.dev" },
  { name: "Halcyon", domain: "halcyon.ai" },
  { name: "Endor Labs", domain: "endorlabs.com" },
  { name: "Prompt Security", domain: "prompt.security" },
  { name: "Sentra", domain: "sentra.io" },
  { name: "Pangea", domain: "pangea.cloud" },
  { name: "Socket", domain: "socket.dev" },
  { name: "Filigran", domain: "filigran.io" },
  { name: "Dazz", domain: "dazz.io" },
  { name: "BlinkOps", domain: "blinkops.com" },
  { name: "Talon Cyber Security", domain: "talon-sec.com" },
  { name: "Aurascape", domain: "aurascape.ai" },
];

function LogoItem({ name, domain }: { name: string; domain: string }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 mx-10">
      <Image
        src={`https://www.google.com/s2/favicons?domain=${domain}&sz=128`}
        alt={name}
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
        style={{ filter: "grayscale(100%) contrast(1.1)" }}
        unoptimized
      />
      <span className="text-black font-bold text-sm tracking-tight whitespace-nowrap">
        {name}
      </span>
    </div>
  );
}

export function LogoMarquee() {
  return (
    <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden mt-14 py-4">
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(239,244,249,1) 0%, rgba(239,244,249,0) 100%)",
        }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-40 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(239,244,249,1) 0%, rgba(239,244,249,0) 100%)",
        }}
      />

      <div className="flex animate-marquee">
        {[0, 1].map((setIdx) => (
          <div key={setIdx} className="flex items-center shrink-0">
            {companies.map((c) => (
              <LogoItem
                key={`${setIdx}-${c.domain}`}
                name={c.name}
                domain={c.domain}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
