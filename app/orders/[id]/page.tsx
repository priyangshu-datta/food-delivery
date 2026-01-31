"use client"

import { notFound } from "next/navigation"
import { DeliveryDetails } from "@/components/orders-id/delivery-details"
import { LoadingSkeleton } from "@/components/orders-id/loading-skeleton"
import { OrderConfirmed } from "@/components/orders-id/order-confirmed"
import { OrderHeader } from "@/components/orders-id/order-header"
import { OrderItems } from "@/components/orders-id/order-items"
import { OrderStatus as OrderStatusComponent } from "@/components/orders-id/order-status"
import { PriceDetails } from "@/components/orders-id/price-details"
import { useOrder } from "@/hooks/use-order"

export default function OrderDetailPage() {
    const { order, loading } = useOrder()

    if (loading) {
        return <LoadingSkeleton />
    }

    if (!order) {
        notFound()
    }

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-2xl mx-auto px-4">
                <OrderHeader />
                <OrderConfirmed order={order} />
                <OrderStatusComponent order={order} />
                <OrderItems order={order} />
                <PriceDetails order={order} />
                <DeliveryDetails order={order} />
            </div>
        </div>
    )
}