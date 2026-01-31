'use client'

import Link from 'next/link'

interface OrderSummaryProps {
  subtotal: number
  tax: number
  delivery: number
  total: number
  totalItems: number
  amountToFreeDelivery: number
  taxRate: number
  onPlaceOrder: () => void
}

export function OrderSummary({
  subtotal,
  tax,
  delivery,
  total,
  totalItems,
  amountToFreeDelivery,
  taxRate,
  onPlaceOrder
}: OrderSummaryProps) {
  return (
    <div className="bg-card rounded-lg shadow-sm border border-border sticky top-8">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal ({totalItems} items)</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <div className='flex flex-col'>
              <span>Delivery Fee</span>
              <span
                className={`text-sm transition-opacity duration-300 ${delivery > 0 ? "text-green-500 opacity-100" : "text-green-600 opacity-50"}`}
              >
                {delivery > 0
                  ? `Add items worth ₹${amountToFreeDelivery} more to get free delivery`
                  : "You got free delivery 🎉"}
              </span>
            </div>
            <span>₹{delivery.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Tax ({taxRate * 100}%)</span>
            <span>₹{tax.toFixed(2)}</span>
          </div>
          <div className="pt-3 border-t border-border">
            <div className="flex justify-between text-lg font-semibold text-foreground">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onPlaceOrder}
          className="w-full bg-blue-600 text-primary-foreground font-medium py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Next
        </button>

        <div className="mt-4 text-center">
          <Link
            href="/menu"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
          >
            ← Back to Menu
          </Link>
        </div>
      </div>
    </div>
  )
}
