"use client";

import Link from "next/link";
import { useState } from "react";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "help">("orders");

  return (
    <div className="max-w-screen-md mx-auto px-4 md:px-8 py-8 md:py-14 pb-28 md:pb-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#999"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase">
          My Account
        </h1>
        <p className="text-[13px] text-gray-400 mt-1">
          Track orders & manage your account
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-100 mb-8">
        {(
          [
            { id: "orders" as const, label: "My Orders" },
            { id: "help" as const, label: "Help" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-[13px] font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? "text-black border-b-2 border-black -mb-[1px]"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-5">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ccc"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h2 className="text-[15px] font-semibold text-gray-900 mb-1">
            No orders yet
          </h2>
          <p className="text-[13px] text-gray-400 mb-6 max-w-xs mx-auto">
            When you place an order, it will appear here. Start shopping to find
            something you love!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-black text-white text-[13px] font-bold tracking-[0.08em] uppercase rounded-full hover:bg-gray-900 transition-colors active:scale-[0.98]"
          >
            Start Shopping
          </Link>
        </div>
      )}

      {/* Help Tab */}
      {activeTab === "help" && (
        <div className="space-y-4">
          {[
            {
              icon: (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              ),
              label: "Contact Us",
              desc: "Get help with your order or products",
              href: "/contact",
            },
            {
              icon: (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              ),
              label: "Shipping Policy",
              desc: "Delivery timelines & tracking",
              href: "/shipping-policy",
            },
            {
              icon: (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
                </svg>
              ),
              label: "Returns & Refunds",
              desc: "Our refund & exchange policy",
              href: "/refund-policy",
            },
            {
              icon: (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              ),
              label: "Terms & Conditions",
              desc: "Legal terms of use",
              href: "/terms",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-300 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-black transition-colors shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-gray-900">
                  {item.label}
                </p>
                <p className="text-[11px] text-gray-400">{item.desc}</p>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ccc"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ))}

          {/* WhatsApp Support */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 rounded-xl bg-green-50 border border-green-100 hover:border-green-300 transition-all group mt-6"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-green-800">
                WhatsApp Support
              </p>
              <p className="text-[11px] text-green-600">
                Chat with us for quick help
              </p>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#25D366"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
