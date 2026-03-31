import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us — THE KAGE",
  description: "Get in touch with THE KAGE support team for order inquiries, returns, or general questions.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-8 py-8 md:py-14 pb-28 md:pb-16">
      <nav className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-6">
        <Link href="/" className="hover:text-black transition-colors">Home</Link>
        <span>/</span>
        <span className="text-gray-900">Contact</span>
      </nav>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight uppercase mb-4">
        Contact Us
      </h1>
      <p className="text-[14px] text-gray-500 mb-10">
        We&apos;re here to help. Reach out to us for any order inquiries, returns, or general questions.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <path d="M22 6l-10 7L2 6" />
              </svg>
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-black uppercase tracking-wide">Email</h3>
              <a href="mailto:support@thekage.com" className="text-[14px] text-gray-600 hover:text-black transition-colors underline underline-offset-2">
                support@thekage.com
              </a>
              <p className="text-[12px] text-gray-400 mt-1">We reply within 24–48 hours</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-black uppercase tracking-wide">Business Hours</h3>
              <p className="text-[14px] text-gray-600">Monday – Saturday</p>
              <p className="text-[14px] text-gray-600">10:00 AM – 7:00 PM IST</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.8">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h3 className="text-[13px] font-bold text-black uppercase tracking-wide">Address</h3>
              <p className="text-[14px] text-gray-600">India (Online Only)</p>
              <p className="text-[12px] text-gray-400 mt-1">We&apos;re an online-only streetwear brand</p>
            </div>
          </div>

          {/* Social */}
          <div className="pt-4 border-t border-gray-100">
            <h3 className="text-[13px] font-bold text-black uppercase tracking-wide mb-3">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl text-[13px] font-medium hover:bg-gray-200 transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl text-[13px] font-medium hover:bg-gray-200 transition-colors"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gray-50 rounded-2xl p-6">
          <h3 className="text-[13px] font-bold text-black uppercase tracking-wide mb-4">Quick Help</h3>
          <div className="space-y-3">
            <Link
              href="/shipping-policy"
              className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-sm transition-shadow"
            >
              <span className="text-[13px] font-medium">Shipping Info</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
            <Link
              href="/refund-policy"
              className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-sm transition-shadow"
            >
              <span className="text-[13px] font-medium">Returns &amp; Refunds</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
            <Link
              href="/terms"
              className="flex items-center justify-between p-3 bg-white rounded-xl hover:shadow-sm transition-shadow"
            >
              <span className="text-[13px] font-medium">Terms &amp; Conditions</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          </div>

          <div className="mt-6 p-4 bg-black text-white rounded-xl">
            <p className="text-[13px] font-bold mb-1">Order Issue?</p>
            <p className="text-[12px] text-gray-300 mb-3">
              Email us with your Order ID and we&apos;ll resolve it within 24 hours.
            </p>
            <a
              href="mailto:support@thekage.com?subject=Order%20Issue"
              className="inline-block px-4 py-2 bg-white text-black text-[12px] font-bold rounded-full hover:bg-gray-100 transition-colors"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
