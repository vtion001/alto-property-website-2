'use client';

import { useCurrentYear } from '@/lib/hydration-safe';

interface FooterProps {
  companyName?: string;
  className?: string;
}

export default function Footer({ 
  companyName = "Alto Property Group",
  className = "text-brown-200"
}: FooterProps) {
  const year = useCurrentYear();

  return (
    <footer className="bg-brown-900 text-cream py-16">
      <div className="container">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/alto-logo.png" alt="Alto Property Group" width={40} height={40} className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-wider">ALTO</span>
                <span className="text-xs text-brown-200 tracking-widest">PROPERTY GROUP</span>
              </div>
            </div>
            <p className="text-brown-200 leading-relaxed">
              South East Queensland's premier all-in-one real estate agency, consistently building lifelong 
              relationships through delivering outstanding results and service.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-medium text-lg">Services</h3>
            <ul className="space-y-3 text-brown-200">
              <li>
                <a href="/selling" className="hover:text-cream transition-colors">
                  Property Sales
                </a>
              </li>
              <li>
                <a href="/buying" className="hover:text-cream transition-colors">
                  Buyer Services
                </a>
              </li>
              <li>
                <a href="/renting" className="hover:text-cream transition-colors">
                  Rental Properties
                </a>
              </li>
              <li>
                <a href="/finance" className="hover:text-cream transition-colors">
                  Finance Solutions
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-medium text-lg">Company</h3>
            <ul className="space-y-3 text-brown-200">
              <li>
                <a href="/contact/about-alto" className="hover:text-cream transition-colors">
                  About ALTO
                </a>
              </li>
              <li>
                <a href="/team" className="hover:text-cream transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/contact/join-team" className="hover:text-cream transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-cream transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-medium text-lg">Contact Info</h3>
            <ul className="space-y-3 text-brown-200">
              <li>(+61) 467 048 837</li>
              <li>sales@altoproperty.com.au</li>
              <li>Office address coming soon</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brown-800 mt-16 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-brown-200">© {year} {companyName}. All rights reserved.</p>
          <div className="flex space-x-8 mt-4 sm:mt-0">
            <a href="#" className="text-brown-200 hover:text-cream transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-brown-200 hover:text-cream transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
