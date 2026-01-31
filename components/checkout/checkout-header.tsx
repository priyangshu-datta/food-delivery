"use client";

import Link from "next/link";

interface CheckoutHeaderProps {
  className?: string;
}

export default function CheckoutHeader({ className = "" }: CheckoutHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <Link
        href="/cart"
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2"
      >
        ← Back to Cart
      </Link>
      <h1 className="text-3xl font-bold text-foreground mb-8 mt-4">Checkout</h1>
    </div>
  );
}
