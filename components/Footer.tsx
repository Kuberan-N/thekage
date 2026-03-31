"use client";

import Link from "next/link";
import Image from "next/image";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/#shop" },
    { label: "Best Sellers", href: "/?category=best-sellers" },
    { label: "Oversized Terry", href: "/category/oversized-terry" },
    { label: "Luxe Acid Wash", href: "/category/luxe-acid-wash" },
  ],
  Help: [
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping Policy", href: "/shipping-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black text-white hidden md:block">
      <div className="max-w-screen-xl mx-auto px-8 py-14">
        <div className="grid grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Image
              src="/logo.png"
              alt="THE KAGE"
              width={140}
              height={40}
              className="h-9 w-auto object-contain invert mb-3"
            />
            <p className="text-[13px] text-gray-400 leading-relaxed max-w-sm">
              Premium anime-inspired streetwear. Oversized fits, acid-wash finishes, 
              and limited drops designed for the culture.
            </p>
            <div className="flex gap-4 mt-5">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-[11px] uppercase tracking-[0.15em]"
              >
                Instagram
              </a>
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors text-[11px] uppercase tracking-[0.15em]"
              >
                WhatsApp
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-10 pt-6 flex items-center justify-between">
          <p className="text-[11px] text-gray-600">
            © {new Date().getFullYear()} THE KAGE. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/shipping-policy" className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors">
              Shipping
            </Link>
            <Link href="/refund-policy" className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors">
              Refunds
            </Link>
            <Link href="/terms" className="text-[11px] text-gray-600 hover:text-gray-400 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
