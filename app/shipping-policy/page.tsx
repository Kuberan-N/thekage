import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shipping Policy — THE KAGE",
  description: "Shipping information for THE KAGE orders across India. Free delivery, COD available.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8 md:py-14 pb-28 md:pb-16">
      <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Shipping Policy</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-8">
        Shipping Policy
      </h1>

      <div className="prose prose-sm max-w-none text-gray-600 space-y-6">
        <p className="text-[13px] text-gray-500 italic">Last updated: March 2026</p>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Order Processing</h2>
          <ul className="list-disc pl-5 space-y-2 text-[14px]">
            <li>All orders are processed within <strong>2–3 business days</strong> (excluding weekends and public holidays) after receiving your order confirmation.</li>
            <li>Each product is <strong>printed and fulfilled on-demand</strong> by our production partner after your order is placed. This ensures quality and reduces waste.</li>
            <li>Once your order is dispatched, you will receive a <strong>tracking link via email/SMS</strong>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Estimated Delivery Time</h2>
          <ul className="list-disc pl-5 space-y-2 text-[14px]">
            <li><strong>Metro cities</strong> (Mumbai, Delhi, Bangalore, Chennai, Hyderabad, Pune, Kolkata) — <strong>2–5 business days</strong></li>
            <li><strong>Tier 2 &amp; Tier 3 cities</strong> — <strong>3–7 business days</strong></li>
            <li><strong>Remote/rural pin codes</strong> (delivered via India Post) — <strong>5–15 business days</strong></li>
          </ul>
          <p className="text-[14px] mt-3">
            <em>Note: Delivery timelines are estimated and may vary due to courier delays, weather conditions, public holidays, or high-demand periods (festivals, sales).</em>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Shipping Charges</h2>
          <p className="text-[14px]">
            We offer <strong>FREE shipping on all orders</strong> across India. No minimum order value required. No hidden charges at checkout.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Cash on Delivery (COD)</h2>
          <p className="text-[14px]">
            COD is <strong>available across most serviceable pin codes</strong> in India. You can pay in cash when your order is delivered. COD orders are subject to availability at the delivery location.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Order Tracking</h2>
          <p className="text-[14px]">
            Once your order is shipped, you will receive a tracking ID via email and SMS. You can use this to track your shipment on the courier partner&apos;s website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Shipping Partners</h2>
          <p className="text-[14px]">
            We work with leading Indian logistics partners including <strong>Delhivery, DTDC, Blue Dart, Xpressbees</strong>, and <strong>India Post</strong> to ensure reliable delivery across India.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">International Shipping</h2>
          <p className="text-[14px]">
            We currently ship <strong>only within India</strong>. International shipping is not available at this time.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-black mb-3">Contact Us</h2>
          <p className="text-[14px]">
            For shipping inquiries, reach out to us at{" "}
            <a href="mailto:support@thekage.com" className="text-black font-medium underline underline-offset-2">
              support@thekage.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
