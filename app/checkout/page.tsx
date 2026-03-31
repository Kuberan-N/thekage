"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/Toast";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, handler: () => void) => void;
    };
  }
}

type PaymentMethod = "online" | "cod";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu & Kashmir", "Ladakh",
  "Chandigarh", "Puducherry", "Andaman & Nicobar", "Lakshadweep",
  "Dadra & Nagar Haveli and Daman & Diu",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 0 }).format(n);

  const updateField = (field: keyof FormData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const isFormValid =
    formData.name.trim() &&
    formData.phone.trim().length >= 10 &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.state &&
    formData.pincode.trim().length === 6;

  const orderDetails = {
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    address: formData.address,
    city: formData.city,
    state: formData.state,
    pincode: formData.pincode,
    items: items.map((i) => ({
      productId: i.productId,
      name: i.name,
      size: i.size,
      quantity: i.quantity,
      price: i.price,
    })),
    totalAmount: cartTotal,
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOnlinePayment = async () => {
    if (!isFormValid) {
      showToast("Please fill all fields correctly", "error");
      return;
    }
    setIsProcessing(true);

    try {
      // 0. Ensure Razorpay script is loaded
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        showToast("Payment gateway failed to load. Please refresh and try again.", "error");
        setIsProcessing(false);
        return;
      }

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!razorpayKey) {
        showToast("Payment configuration error. Please contact support.", "error");
        setIsProcessing(false);
        return;
      }

      // 1. Create Razorpay order on server
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: cartTotal,
          receipt: `kage_${Date.now()}`,
          notes: { customer_name: formData.name },
        }),
      });

      const order = await res.json();
      if (!res.ok) throw new Error(order.error || "Failed to create order");

      // 2. Open Razorpay checkout
      const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: "THE KAGE",
        description: `Order — ${items.length} item${items.length !== 1 ? "s" : ""}`,
        order_id: order.id,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // 3. Verify payment on server
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...response,
                orderDetails,
              }),
            });

            const result = await verifyRes.json();
            if (result.success) {
              clearCart();
              router.push(`/order-confirmation?id=${result.orderId}`);
            } else {
              showToast("Payment verification failed", "error");
            }
          } catch {
            showToast("Something went wrong", "error");
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: `+91${formData.phone}`,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          confirm_close: true,
          ondismiss: () => setIsProcessing(false),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        showToast("Payment failed. Please try again.", "error");
        setIsProcessing(false);
      });
      rzp.open();
    } catch (error) {
      console.error("Checkout error:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to initiate payment";
      showToast(errorMessage, "error");
      setIsProcessing(false);
    }
  };

  const handleCOD = async () => {
    if (!isFormValid) {
      showToast("Please fill all fields correctly", "error");
      return;
    }
    setIsProcessing(true);

    try {
      const res = await fetch("/api/orders/cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderDetails }),
      });

      const result = await res.json();
      if (result.success) {
        clearCart();
        router.push(`/order-confirmation?id=${result.orderId}`);
      } else {
        showToast("Failed to place order", "error");
      }
    } catch {
      showToast("Something went wrong", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">No items to checkout</h1>
        <p className="text-sm text-gray-500 mb-6">Add some products to your bag first.</p>
        <Link href="/" className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-32 md:pb-16">
      <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase mb-8">
        Checkout
      </h1>

      <div className="md:grid md:grid-cols-[1fr_380px] md:gap-10">
        {/* Form */}
        <div className="space-y-6">
          {/* Contact */}
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-wide mb-4">Contact</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Name *"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-black transition-colors"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-black transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-wide mb-4">Shipping Address</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Full Address (House No, Street, Locality) *"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-black transition-colors"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="City *"
                  value={formData.city}
                  onChange={(e) => updateField("city", e.target.value)}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-black transition-colors"
                />
                <input
                  type="text"
                  placeholder="Pincode *"
                  value={formData.pincode}
                  onChange={(e) => updateField("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-black transition-colors"
                />
              </div>
              <select
                value={formData.state}
                onChange={(e) => updateField("state", e.target.value)}
                className={`w-full h-12 px-4 border border-gray-200 rounded-xl text-[14px] outline-none focus:border-black transition-colors bg-white ${!formData.state ? "text-gray-400" : ""}`}
              >
                <option value="">Select State *</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h2 className="text-[13px] font-bold uppercase tracking-wide mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label
                className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                  paymentMethod === "online" ? "border-black bg-gray-50" : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                  className="accent-black w-4 h-4"
                />
                <div>
                  <p className="text-[13px] font-semibold">Pay Online</p>
                  <p className="text-[11px] text-gray-400">UPI, Cards, Wallets, Net Banking</p>
                </div>
              </label>
              <label
                className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                  paymentMethod === "cod" ? "border-black bg-gray-50" : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                  className="accent-black w-4 h-4"
                />
                <div>
                  <p className="text-[13px] font-semibold">Cash on Delivery</p>
                  <p className="text-[11px] text-gray-400">Pay when your order arrives</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="mt-8 md:mt-0">
          <div className="bg-gray-50 rounded-2xl p-6 md:sticky md:top-28">
            <h2 className="text-[13px] font-bold uppercase tracking-wide mb-4">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex gap-3">
                  <div className="shrink-0 w-14 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-medium text-gray-900 line-clamp-1">{item.name}</p>
                    <p className="text-[11px] text-gray-400">Size: {item.size} · Qty: {item.quantity}</p>
                    <p className="text-[12px] font-semibold mt-0.5">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-3 space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-bold text-black">Total</span>
                <span className="font-bold text-black text-lg">{formatPrice(cartTotal)}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={paymentMethod === "online" ? handleOnlinePayment : handleCOD}
              disabled={isProcessing || !isFormValid}
              className={`mt-6 w-full h-[52px] text-[13px] font-bold tracking-[0.1em] uppercase rounded-full transition-all active:scale-[0.98] flex items-center justify-center gap-2 ${
                isProcessing || !isFormValid
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </>
              ) : paymentMethod === "online" ? (
                `Pay ${formatPrice(cartTotal)}`
              ) : (
                "Place COD Order"
              )}
            </button>

            {/* Trust Badge */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[11px] font-semibold text-green-700">100% Secure Payment</span>
              </div>
              <div className="flex items-center justify-center gap-3 mb-2">
                {/* UPI */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md">
                  <span className="text-[10px] font-bold text-gray-700">UPI</span>
                </div>
                {/* GPay */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md">
                  <span className="text-[10px] font-bold text-gray-700">GPay</span>
                </div>
                {/* PhonePe */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md">
                  <span className="text-[10px] font-bold text-gray-700">PhonePe</span>
                </div>
                {/* Visa */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md">
                  <span className="text-[10px] font-bold text-blue-700">VISA</span>
                </div>
                {/* Mastercard */}
                <div className="flex items-center gap-1 px-2 py-1 bg-white border border-gray-200 rounded-md">
                  <span className="text-[10px] font-bold text-orange-600">MC</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span className="text-[9px] text-gray-400">Secured by <span className="font-bold text-gray-600">Razorpay</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
