"use client"

import { orderHistory } from "@/lib/orders"
import type { OrderSnapshot } from "@/orders/types"
import Link from "next/link"
import { useMemo } from "react"

export default function OrdersPage() {
    const orders = useMemo(() => {
        if (typeof window === "undefined") return []
        
        const orders = orderHistory.get()
        return orders.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
    }, [])


    const calculateTotal = (items: OrderSnapshot["items"]) => {
        return items.reduce((total, { item }) => total + item.price, 0).toFixed(2)
    }

    if (orders.length === 0) {
        return (
            <div className="min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-3xl font-bold text-foreground mb-8">Your Orders</h1>
                    <div className="text-center py-12">
                        <p className="text-muted-foreground text-lg">No orders found</p>
                        <Link
                            href="/menu"
                            className="mt-4 inline-block bg-blue-600 text-primary-foreground px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Browse Menu
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-foreground mb-8">Your Orders</h1>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <Link
                            key={order.id}
                            href={`/orders/${order.id}`}
                            className="block rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-border bg-linear-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-foreground">
                                        Order #{order.id}
                                    </h2>
                                    <p className="text-muted-foreground mt-1">
                                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {order.customer.name}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                    <div className="mt-2">
                                        {order.items.slice(0, 3).map(({ item }, index) => (
                                            <span key={item.id} className="text-sm text-muted-foreground">
                                                {item.name}
                                                {index < Math.min(2, order.items.length - 1) && ', '}
                                            </span>
                                        ))}
                                        {order.items.length > 3 && (
                                            <span className="text-sm text-muted-foreground">...</span>
                                        )}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-foreground">
                                        ₹{calculateTotal(order.items)}
                                    </p>
                                    <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">View Details →</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}