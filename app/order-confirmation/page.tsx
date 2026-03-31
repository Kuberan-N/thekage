"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6 animate-slide-up">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2 animate-slide-up" style={{ animationDelay: "0.1s" }}>
        Order Confirmed!
      </h1>

      <p className="text-sm text-gray-500 max-w-md mb-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
        Thank you for shopping with THE KAGE. Your order has been placed successfully.
      </p>

      {orderId && (
        <p className="text-[12px] text-gray-400 mb-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          Order ID: <span className="font-mono font-medium text-gray-600">{orderId}</span>
        </p>
      )}

      <div className="space-y-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
        <div className="bg-gray-50 rounded-xl p-5 max-w-sm text-left space-y-2">
          <div className="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" className="shrink-0 mt-0.5">
              <rect x="1" y="3" width="15" height="13" rx="2" />
              <path d="M16 8h4l3 3v5h-7V8z" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <div>
              <p className="text-[13px] font-semibold text-black">Estimated Delivery</p>
              <p className="text-[12px] text-gray-500">2–5 business days across India</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1.8" className="shrink-0 mt-0.5">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            <div>
              <p className="text-[13px] font-semibold text-black">Tracking Updates</p>
              <p className="text-[12px] text-gray-500">You&apos;ll receive tracking info via email/SMS</p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-black text-white text-[13px] font-bold tracking-[0.1em] uppercase rounded-full hover:bg-gray-900 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
