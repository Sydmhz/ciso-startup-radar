import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#E5E7EB] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-xl text-navy">
              CISOStartupRadar
            </Link>
            <p className="mt-2 text-sm text-gray-500">
              The CISO Directory to Explore, Invest and Partner with the Right
              Cybersecurity Startups.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A0A0A] mb-3">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/directory" className="text-sm text-gray-500 hover:text-navy">
                  Startup Directory
                </Link>
              </li>
              <li>
                <Link href="/cisos" className="text-sm text-gray-500 hover:text-navy">
                  CISO Directory
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-sm text-gray-500 hover:text-navy">
                  Training
                </Link>
              </li>
              <li>
                <Link href="/venture-network" className="text-sm text-gray-500 hover:text-navy">
                  Venture Network
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A0A0A] mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/pricing" className="text-sm text-gray-500 hover:text-navy">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/apply" className="text-sm text-gray-500 hover:text-navy">
                  Apply as CISO
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-gray-500 hover:text-navy">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-[#0A0A0A] mb-3">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-gray-500 hover:text-navy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-500 hover:text-navy">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="https://www.perplexity.ai/computer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-500 hover:text-navy"
                >
                  Created with Perplexity Computer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#E5E7EB]">
          <p className="text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} CISOStartupRadar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
