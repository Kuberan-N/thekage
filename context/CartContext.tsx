"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";

/* ─── Types ─── */
export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  size: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: string } }
  | { type: "UPDATE_QTY"; payload: { productId: string; size: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

interface CartContextValue {
  items: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQty: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
}

/* ─── Reducer ─── */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.findIndex(
        (i) => i.productId === action.payload.productId && i.size === action.payload.size
      );
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + action.payload.quantity,
        };
        return { items: updated };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => !(i.productId === action.payload.productId && i.size === action.payload.size)
        ),
      };
    case "UPDATE_QTY": {
      if (action.payload.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.productId === action.payload.productId && i.size === action.payload.size)
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.productId === action.payload.productId && i.size === action.payload.size
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case "CLEAR_CART":
      return { items: [] };
    case "HYDRATE":
      return { items: action.payload };
    default:
      return state;
  }
}

/* ─── Context ─── */
const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "kage_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: "HYDRATE", payload: parsed });
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore
    }
  }, [state.items]);

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const addToCart = (item: CartItem) => dispatch({ type: "ADD_ITEM", payload: item });
  const removeFromCart = (productId: string, size: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: { productId, size } });
  const updateQty = (productId: string, size: string, quantity: number) =>
    dispatch({ type: "UPDATE_QTY", payload: { productId, size, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ items: state.items, cartCount, cartTotal, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
