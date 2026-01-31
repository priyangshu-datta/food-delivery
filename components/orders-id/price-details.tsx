"use client"

import { OrderSnapshot } from "@/orders/types"

interface PriceDetailsProps {
    order: OrderSnapshot
}

export function PriceDetails({ order }: PriceDetailsProps) {
    return (
        <div className="bg-white dark:bg-gray-300 rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">PRICE DETAILS</h2>

            <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{order.pricing.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>₹{order.pricing.delivery.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>₹{order.pricing.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-bold text-lg text-gray-900">
                        <span>TOTAL</span>
                        <span>₹{order.pricing.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
