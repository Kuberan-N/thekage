import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions — THE KAGE",
  description: "Terms and conditions governing the use of thekage.in and purchases made through our store.",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8 md:py-14 pb-28 md:pb-16">
      <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Terms &amp; Conditions</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-8">
        Terms &amp; Conditions
      </h1>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <p className="text-[13px] text-gray-500 italic">Last updated: March 2026</p>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">1. Introduction</h2>
          <p className="text-[14px]">
            Welcome to THE KAGE (<a href="https://thekage.in" className="text-black underline underline-offset-2">thekage.in</a>). By accessing or using our website, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our website or place orders.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">2. Eligibility</h2>
          <p className="text-[14px]">
            You must be at least 18 years old (or have parental/guardian consent) to purchase from our store. By placing an order, you confirm that the information you provide is accurate and complete.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">3. Products &amp; Pricing</h2>
          <ul className="list-disc pl-5 space-y-2 text-[14px]">
            <li>All products are <strong>custom-printed on demand</strong>. Product images are for illustration; minor variations in colour and print may occur.</li>
            <li>Prices are listed in <strong>Indian Rupees (₹)</strong> and are inclusive of all applicable taxes.</li>
            <li>We reserve the right to modify prices without prior notice. Price at the time of order placement is final.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">4. Orders &amp; Payment</h2>
          <ul className="list-disc pl-5 space-y-2 text-[14px]">
            <li>An order confirmation email does not guarantee acceptance. We reserve the right to cancel orders due to errors in pricing, stock, or other issues.</li>
            <li>Payments are processed via <strong>Razorpay</strong> (UPI, cards, wallets, net banking) or <strong>Cash on Delivery</strong>.</li>
            <li>All online payments are secured by Razorpay&apos;s PCI DSS compliant infrastructure.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">5. Shipping &amp; Delivery</h2>
          <p className="text-[14px]">
            Please refer to our <Link href="/shipping-policy" className="text-black font-medium underline underline-offset-2">Shipping Policy</Link> for detailed information on delivery timelines, shipping charges, and coverage.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">6. Returns &amp; Refunds</h2>
          <p className="text-[14px]">
            Please refer to our <Link href="/refund-policy" className="text-black font-medium underline underline-offset-2">Refund &amp; Return Policy</Link> for detailed information on eligible returns and the refund process.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">7. Intellectual Property</h2>
          <p className="text-[14px]">
            All content on thekage.in — including designs, logos, images, text, and graphics — is the property of THE KAGE and is protected under Indian intellectual property laws. Unauthorized reproduction, distribution, or use is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">8. Limitation of Liability</h2>
          <p className="text-[14px]">
            THE KAGE shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products. Our total liability is limited to the amount paid for the specific order in question.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">9. Governing Law</h2>
          <p className="text-[14px]">
            These terms are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">10. Contact</h2>
          <p className="text-[14px]">
            For any questions about these terms:{" "}
            <a href="mailto:support@thekage.com" className="text-black font-medium underline underline-offset-2">
              support@thekage.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
