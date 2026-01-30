"use client"

import { type ReactNode, createContext, useContext, useEffect, useReducer } from "react";

export type CartItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "HYDRATE"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.payload };

    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }

    case "UPDATE_QUANTITY":
      return {
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      };

    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  findItem: (id: string) => CartItem | undefined;
};

export const CartContext = createContext<CartContextValue | null>(null);


const STORAGE_KEY = "cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "HYDRATE", payload: JSON.parse(raw) });
      }
    } catch {
      // corrupted storage → ignore
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value: CartContextValue = {
    items: state.items,
    addItem: (item) =>
      dispatch({ type: "ADD_ITEM", payload: item }),
    updateQuantity: (id, quantity) =>
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
    removeItem: (id) =>
      dispatch({ type: "REMOVE_ITEM", payload: { id } }),
    clearCart: () =>
      dispatch({ type: "CLEAR_CART" }),
    findItem: (id) => state.items.find((item) => item.id === id),
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}