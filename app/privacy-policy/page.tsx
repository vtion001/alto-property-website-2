import { Navigation } from "@/components/navigation"
import Footer from "@/components/ui/footer"
export const metadata = {
  title: "Privacy Policy – ALTO REAL ESTATE",
  description:
    "How ALTO REAL ESTATE handles personal information under Australia’s Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        {/* Page Header */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="text-center space-y-10">
              <div className="inline-block">
                <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Legal</div>
                <div className="w-16 h-px bg-brand-red mx-auto"></div>
              </div>
              <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                Privacy
                <span className="block font-light text-brown-700 mt-2">Policy</span>
              </h1>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto leading-relaxed">
                How we handle personal information under Australia’s Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
              </p>
              <p className="sr-only">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-24 bg-white">
          <div className="container max-w-4xl text-brown-800">
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">Privacy Policy</h1>
            <p className="text-brown-700 font-light mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <p className="text-brown-700 font-light mb-6">
              ALTO REAL ESTATE ("we", "us", "our") respects your privacy and is
              committed to protecting personal information. This Privacy Policy explains
              how we collect, use, disclose, and safeguard personal information in
              accordance with Australia’s <strong>Privacy Act 1988 (Cth)</strong> and the
              <strong> Australian Privacy Principles (APPs)</strong>.
            </p>

            <section className="space-y-4 mb-8">
              <h2 className="text-2xl font-light text-brown-800">Information We Collect</h2>
              <p className="text-brown-700 font-light">We may collect the following types of personal information:</p>
              <ul className="list-disc pl-6 text-brown-700 font-light">
                <li>Contact details (name, email, phone number, address)</li>
                <li>Property preferences, enquiry details, and communications</li>
                <li>Identification details where required (e.g., for tenancy applications)</li>
                <li>Financial information related to property transactions or tenancy</li>
                <li>Usage information from our website (pages visited, interactions)</li>
              </ul>
            </section>

            <section className="space-y-4 mb-8">
              <h2 className="text-2xl font-light text-brown-800">How We Use Personal Information</h2>
              <p className="text-brown-700 font-light">We use personal information to:</p>
              <ul className="list-disc pl-6 text-brown-700 font-light">
                <li>Respond to enquiries and provide property services</li>
                <li>Facilitate buying, selling, renting, and property management</li>
                <li>Verify identity and process applications or transactions</li>
                <li>Improve our website, services, and customer experience</li>
                <li>Send updates, marketing, and service communications (you may opt-out)</li>
              </ul>
            </section>

            <section className="space-y-4 mb-8">
              <h2 className="text-2xl font-light text-brown-800">Disclosure of Personal Information</h2>
              <p className="text-brown-700 font-light">We may disclose personal information to:</p>
              <ul className="list-disc pl-6 text-brown-700 font-light">
                <li>Service providers (IT, marketing, payment, and support services)</li>
                <li>Professional advisors (legal, accounting, financial)</li>
                <li>Regulators, government authorities, or as required by law</li>
                <li>Parties to a property transaction (with your consent where appropriate)</li>
              </ul>
              <p className="text-brown-700 font-light">
                Where we transfer personal information overseas, we take reasonable steps
                to ensure recipients comply with standards comparable to the APPs.
              </p>
            </section>

            <section className="space-y-4 mb-8">
              <h2 className="text-2xl font-light text-brown-800">Data Security and Storage</h2>
              <p className="text-brown-700 font-light">
                We take reasonable steps to protect personal information from misuse,
                interference, loss, unauthorised access, modification, or disclosure.
                Information may be stored in Australia or in secure cloud services.
              </p>
            </section>

            <section className="space-y-4 mb-8">
              <h2 className="text-2xl font-light text-brown-800">Access and Correction</h2>
              <p className="text-brown-700 font-light">
                You may request access to or correction of your personal information. To
                make a request, contact us using the details below. We will respond within
                a reasonable time in accordance with the APPs.
              </p>
            </section>

            <section className="space-y-4 mb-8">
              <h2 className="text-2xl font-light text-brown-800">Cookies and Analytics</h2>
              <p className="text-brown-700 font-light">
                We use cookies and analytics to improve site performance and user
                experience. You can control cookies through your browser settings.
              </p>
            </section>

            <section className="space-y-4 mb-8">
              <h2 className="text-2xl font-light text-brown-800">Marketing Preferences</h2>
              <p className="text-brown-700 font-light">
                We may send you property updates, market insights, or service messages.
                You can opt out of marketing communications at any time by following the
                unsubscribe instructions or contacting us directly.
              </p>
            </section>

            <section className="space-y-4 mb-8">
              <h2 className="text-2xl font-light text-brown-800">Contact Us</h2>
              <p className="text-brown-700 font-light">For privacy requests or questions, please contact:</p>
              <address className="not-italic text-brown-700 font-light">
                ALTO REAL ESTATE<br />
                Email: <a className="text-brand-red hover:underline" href="mailto:info@altoproperty.com.au">info@altoproperty.com.au</a><br />
                Phone: <a className="text-brand-red hover:underline" href="tel:+6175550123">07 5550 123</a>
              </address>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-light text-brown-800">Complaints</h2>
              <p className="text-brown-700 font-light">
                If you are dissatisfied with our handling of your personal information,
                you may contact us using the details above. You also have the right to
                lodge a complaint with the Office of the Australian Information
                Commissioner (OAIC) at <a className="text-brand-red hover:underline" href="https://www.oaic.gov.au/">oaic.gov.au</a>.
              </p>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}