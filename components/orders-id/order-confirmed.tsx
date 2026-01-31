"use client"

import { OrderSnapshot, OrderStatus } from "@/orders/types"
import { Check } from "lucide-react"

interface OrderConfirmedProps {
    order: OrderSnapshot
}

export function OrderConfirmed({ order }: OrderConfirmedProps) {
    const formatTime = (dateString: string) => {
        return new Intl.DateTimeFormat("en-IN", {
            dateStyle: "short",
            timeStyle: "short"
        }).format(new Date(dateString))
    }

    return (
        <div className="bg-white dark:bg-gray-300 rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                    <Check className="text-green-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Order {order.status === OrderStatus.DELIVERED ? "Delivered" : "Confirmed"}</h1>
                <div className="text-gray-600 flex flex-col gap-2">
                    <p>Track ID:</p> <p className="">#{order.id}</p>
                    <p>Placed at {formatTime(order.createdAt)}</p>
                    {order.status === OrderStatus.DELIVERED && <p>Delivered at {formatTime(order.updatedAt)}</p>}
                </div>
            </div>
        </div>
    )
}
