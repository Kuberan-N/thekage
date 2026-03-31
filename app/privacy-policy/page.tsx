import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — THE KAGE",
  description: "Privacy Policy for THE KAGE — how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-screen-md mx-auto px-4 md:px-8 py-10 md:py-16 pb-28 md:pb-16">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-8">
        Privacy Policy
      </h1>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <p className="text-[13px] text-gray-400">
          Last updated: {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">1. Information We Collect</h2>
          <p className="text-[13px] leading-relaxed mb-2">When you visit our website or place an order, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[13px]">
            <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, billing address</li>
            <li><strong>Payment Information:</strong> Processed securely through Razorpay — we do not store your card details</li>
            <li><strong>Device Information:</strong> Browser type, IP address, device type (for analytics and improving your experience)</li>
            <li><strong>Usage Data:</strong> Pages visited, time spent, products viewed (via cookies and analytics tools)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">2. How We Use Your Information</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-[13px]">
            <li>To process and fulfill your orders</li>
            <li>To send order confirmations, shipping updates, and delivery notifications</li>
            <li>To respond to customer service requests</li>
            <li>To improve our website, products, and services</li>
            <li>To send promotional offers and new drop alerts (only if you opt in)</li>
            <li>To prevent fraud and ensure platform security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">3. Payment Security</h2>
          <p className="text-[13px] leading-relaxed">
            All payments are processed through <strong>Razorpay</strong>, a PCI DSS Level 1 compliant payment gateway.
            We never store, collect, or have access to your credit/debit card numbers or UPI PINs.
            All transactions are encrypted with industry-standard SSL/TLS encryption.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">4. Data Sharing</h2>
          <p className="text-[13px] leading-relaxed mb-2">We do not sell, trade, or rent your personal information. We may share data with:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[13px]">
            <li><strong>Shipping Partners:</strong> To deliver your orders (name, address, phone number)</li>
            <li><strong>Payment Processors:</strong> Razorpay, for processing payments</li>
            <li><strong>Analytics Providers:</strong> To understand usage patterns (anonymised data)</li>
            <li><strong>Legal Authorities:</strong> If required by law or to protect our rights</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">5. Cookies</h2>
          <p className="text-[13px] leading-relaxed">
            We use cookies and similar technologies to enhance your browsing experience, remember your preferences,
            and analyse website traffic. You can manage cookie preferences through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">6. Data Retention</h2>
          <p className="text-[13px] leading-relaxed">
            We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy,
            comply with legal obligations, resolve disputes, and enforce agreements. Order data is retained for
            a minimum of <strong>8 years</strong> as required under Indian tax and commercial law.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">7. Your Rights</h2>
          <p className="text-[13px] leading-relaxed mb-2">You have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-[13px]">
            <li>Access, correct, or delete your personal data</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Request a copy of your data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
          <p className="text-[13px] leading-relaxed mt-2">
            To exercise any of these rights, contact us at the details below.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">8. Third-Party Links</h2>
          <p className="text-[13px] leading-relaxed">
            Our website may contain links to third-party sites. We are not responsible for the privacy practices
            of these external sites. We encourage you to review their privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">9. Children&apos;s Privacy</h2>
          <p className="text-[13px] leading-relaxed">
            Our services are not directed to individuals under the age of 18. We do not knowingly collect
            personal information from minors.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">10. Changes to This Policy</h2>
          <p className="text-[13px] leading-relaxed">
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an
            updated revision date. We encourage you to review this policy periodically.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">11. Contact Us</h2>
          <p className="text-[13px] leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-none space-y-1 text-[13px] mt-2">
            <li>📧 Email: <strong>support@thekage.in</strong></li>
            <li>📱 WhatsApp: Available on our <a href="/contact" className="underline text-black">Contact page</a></li>
          </ul>
        </section>
      </div>
    </div>
  );
}
