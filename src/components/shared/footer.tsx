import Link from "next/link";
import Image from "next/image";
import { Mail, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="border-t border-white/10"
      style={{
        background:
          "linear-gradient(135deg, #0A0F1C 0%, #111827 50%, #0A0F1C 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="inline-block">
              <Image
                src="/logo-nav.png"
                alt="CISO StartUp Radar"
                width={240}
                height={174}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-[13px] text-white/40 max-w-xs leading-relaxed">
              The CISO Directory to Explore, Invest and Partner with the Right
              Cybersecurity Startups.
            </p>
          </div>

          {/* Right side: Legal + Contact */}
          <div className="flex gap-16">
            {/* Legal */}
            <div>
              <h3 className="text-[13px] font-semibold text-white/80 mb-3 tracking-wide uppercase">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-[13px] text-white/50 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[13px] text-white/50 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-[13px] font-semibold text-white/80 mb-3 tracking-wide uppercase">
                Contact Us
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:contact@cisostartupradar.com"
                    className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-colors"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    Email Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/cisostartupradar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[13px] text-white/50 hover:text-white transition-colors"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-center text-[12px] text-white/30">
            &copy; {new Date().getFullYear()} CISO StartUp Radar. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
