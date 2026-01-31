"use client";

import { useCart } from "@/context/cart";
import { calculatePricing } from "@/lib/pricing";
import Image from "next/image";

interface OrderSummaryProps {
  className?: string;
}

export default function OrderSummary({ className = "" }: OrderSummaryProps) {
  const { items, value: cartValue } = useCart();
  const { subtotal, tax, delivery, total, TAX } = calculatePricing({ 
    items: items.map(({item, quantity}) => ({ price: item.price, quantity })) 
  });
  const {length: totalItems} = cartValue();

  return (
    <div className={`bg-muted p-6 rounded-lg ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-foreground">Order Summary</h2>
      <div className="space-y-4">
        {items.map(({item,quantity}) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="relative w-16 h-16">
              <Image
                src={item.image}
                alt={item.name}
                className="object-cover rounded"
                width={64}
                height={64}
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                Qty: {quantity} × ₹{item.price.toFixed(2)}
              </p>
            </div>
            <div className="font-medium text-foreground">
              ₹{(item.price * quantity).toFixed(2)}
            </div>
          </div>
        ))}

        <div className="border-y border-border pt-4 mt-4">
          <div className="flex justify-between mb-2 text-foreground">
            <span>Subtotal ({totalItems}): </span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2 text-foreground">
            <span>Delivery: </span>
            <span>{delivery > 0 ? `₹${delivery}` : "Free"}</span>
          </div>
          <div className="flex justify-between mb-2 text-foreground">
            <span>Tax ({TAX * 100}%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between font-bold text-lg text-foreground">
          <span>Total:</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
