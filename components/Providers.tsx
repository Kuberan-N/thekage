"use client";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ToastProvider } from "@/components/Toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </WishlistProvider>
    </CartProvider>
  );
}
