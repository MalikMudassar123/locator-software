import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold">LOCATOR</h3>
            <p className="text-sm text-gray-400">
              Live tracking apps and services for real-time monitoring.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-gray-400">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#about" className="hover:text-cyan-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="hover:text-cyan-400">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-cyan-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-gray-400">
              Services
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#tracking" className="hover:text-cyan-400">
                  Real-time Tracking
                </Link>
              </li>
              <li>
                <Link href="#fleet" className="hover:text-cyan-400">
                  Fleet Management
                </Link>
              </li>
              <li>
                <Link href="#analytics" className="hover:text-cyan-400">
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase text-gray-400">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: info@locator.com</li>
              <li>Phone: +971 XX XXX XXXX</li>
              <li>Dubai, UAE</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} LOCATOR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
