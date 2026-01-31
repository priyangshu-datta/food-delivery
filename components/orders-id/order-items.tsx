"use client"

import Image from "next/image"
import { OrderSnapshot } from "@/orders/types"

interface OrderItemsProps {
    order: OrderSnapshot
}

export function OrderItems({ order }: OrderItemsProps) {
    return (
        <div className="bg-white dark:bg-gray-300 rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">ITEMS</h2>

            <div className="space-y-4">
                {order.items.map(({ item, quantity }) => (
                    <div key={item.id} className="flex gap-4 items-center">
                        <Image
                            width={64}
                            height={64}
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                            <div className="flex items-center gap-4 text-sm md:hidden">
                                <span className="text-gray-900">
                                    ₹{item.price.toFixed(2)}
                                </span>
                                <span className="text-gray-600">x{quantity}</span>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <span className="text-gray-900">
                                ₹{item.price.toFixed(2)}
                            </span>
                            <span className="text-gray-600 w-20">x{quantity}</span>
                        </div>
                        <span className="font-medium text-gray-900 text-right">
                            ₹{(item.price * quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
