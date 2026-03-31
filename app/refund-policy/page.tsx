import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund & Return Policy — THE KAGE",
  description: "Refund and return policy for THE KAGE orders. Covers defective items, wrong sizes, and exchange process.",
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8 md:py-14 pb-28 md:pb-16">
      <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Refund Policy</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-8">
        Refund &amp; Return Policy
      </h1>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <p className="text-[13px] text-gray-500 italic">Last updated: March 2026</p>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Overview</h2>
          <p className="text-[14px]">
            Since all our products are <strong>custom-printed on demand</strong>, we have a specific return and refund policy. We strive for 100% customer satisfaction and will work with you to resolve any issues.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Eligible for Return/Refund</h2>
          <ul className="list-disc pl-5 space-y-2 text-[14px]">
            <li><strong>Defective or damaged product</strong> — printing errors, fabric defects, or visible damage on arrival.</li>
            <li><strong>Wrong product delivered</strong> — you received a different design, colour, or item than what was ordered.</li>
            <li><strong>Size significantly differs from size chart</strong> — if the measurements of the received product are significantly different from those listed on our size chart (beyond normal tolerance of ±0.5 inches).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Not Eligible for Return/Refund</h2>
          <ul className="list-disc pl-5 space-y-2 text-[14px]">
            <li>Change of mind or &quot;didn&apos;t like the fit&quot; — as products are custom-made.</li>
            <li>Slight colour variations due to screen display differences.</li>
            <li>Minor acid-wash pattern differences — each acid-wash tee is unique by design.</li>
            <li>Products that have been worn, washed, or altered.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">How to Request a Return</h2>
          <ol className="list-decimal pl-5 space-y-2 text-[14px]">
            <li>Email us at <a href="mailto:support@thekage.com" className="text-black font-medium underline underline-offset-2">support@thekage.com</a> within <strong>7 days</strong> of delivery.</li>
            <li>Include your <strong>order ID</strong> and <strong>clear photos/videos</strong> of the issue.</li>
            <li>Our team will review and respond within <strong>24–48 hours</strong>.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Refund Process</h2>
          <ul className="list-disc pl-5 space-y-2 text-[14px]">
            <li>Once approved, we&apos;ll offer a <strong>full replacement</strong> or a <strong>store credit/refund</strong>.</li>
            <li>Refunds are processed to the <strong>original payment method</strong> within <strong>5–7 business days</strong>.</li>
            <li>For COD orders, refunds will be issued via <strong>bank transfer</strong> (UPI/NEFT).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Exchange</h2>
          <p className="text-[14px]">
            We offer <strong>one-time exchange</strong> for eligible returns. The replacement product is shipped free of cost. Exchanges are subject to stock availability.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Cancellations</h2>
          <p className="text-[14px]">
            Orders can be cancelled within <strong>12 hours</strong> of placing them by emailing us. Once the order goes into production, cancellations are not possible as products are custom-made.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Contact</h2>
          <p className="text-[14px]">
            For any return/refund queries:{" "}
            <a href="mailto:support@thekage.com" className="text-black font-medium underline underline-offset-2">
              support@thekage.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
