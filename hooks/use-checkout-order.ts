"use client";

import { useCart } from "@/context/cart";
import { useCheckout } from "@/context/checkout";
import { useCustomer } from "@/context/customer";
import { orderHistory } from "@/lib/orders";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface UseCheckoutOrderReturn {
  handlePlaceOrder: () => void;
  isLoading: boolean;
  shouldRedirect: boolean;
}

export function useCheckoutOrder(): UseCheckoutOrderReturn {
  const { customer } = useCustomer();
  const { items, clearCart } = useCart();
  const router = useRouter();
  const { state, setState } = useCheckout();

  useEffect(() => {
    if (items.length === 0 && state.status !== "success") {
      router.push("/cart");
    }
  }, [items, router, state.status]);

  const handlePlaceOrder = () => {
    if (!customer) {
      toast.error("Please provide customer information");
      return;
    }

    setState({ status: "loading" });
    fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items, customer }),
    })
      .then(response => response.json())
      .then(order => {
        setState({ status: "success" });
        clearCart();
        orderHistory.add(order);
        toast.success("Order placed successfully!");
        router.push(`/orders/${order.id}`);
      })
      .catch(error => {
        setState({ status: "error" });
        console.error(error);
        toast.error("Failed to place order. Please try again.");
      })
      .finally(() => {
        setTimeout(() => {
          setState({ status: "idle" });
        }, 3000);
      });
  };

  return {
    handlePlaceOrder,
    isLoading: state.status === "loading",
    shouldRedirect: items.length === 0,
  };
}
