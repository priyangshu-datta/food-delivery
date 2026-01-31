"use client"

import { OrderSnapshot } from "@/orders/types"

interface DeliveryDetailsProps {
    order: OrderSnapshot
}

export function DeliveryDetails({ order }: DeliveryDetailsProps) {
    return (
        <div className="bg-white dark:bg-gray-300 rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">DELIVERY DETAILS</h2>

            <div className="space-y-3">
                <div>
                    <span className="text-gray-600">Name: </span>
                    <span className="font-medium text-gray-900">{order.customer.name}</span>
                </div>
                <div>
                    <span className="text-gray-600">Phone: </span>
                    <span className="font-medium text-gray-900">{order.customer.phone}</span>
                </div>
                <div>
                    <span className="text-gray-600">Address:</span>
                    <div className="mt-1 text-gray-900">
                        {order.customer.address.split(',').map((line, index) => (
                            <div key={index}>{line.trim()}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
