import { Pricing } from "@/orders/types";

export type PricingInput = {
  items: { price: number; quantity: number }[];
};

export type PricingOutput = Pricing & {amountToFreeDelivery: number, TAX: number};

const TAX = 0.18
const FREE_DELIVERY = 499
const DELIVERY_FEE = 50

function roundUpToNearest(value: number, step = 10) {
  return Math.ceil(value / step) * step;
}

export function calculatePricing({ items }: PricingInput): PricingOutput {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const tax = subtotal * TAX

  const delivery = subtotal >= FREE_DELIVERY ? 0 : DELIVERY_FEE;

  const rawRemaining = Math.max(0, FREE_DELIVERY - subtotal);
  const amountToFreeDelivery =
    delivery === 0 ? 0 : roundUpToNearest(rawRemaining, 10);

  return {
    subtotal,
    tax,
    delivery,
    amountToFreeDelivery,
    total: subtotal + tax + delivery,
    TAX
  };
}
