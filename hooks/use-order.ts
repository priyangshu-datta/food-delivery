"use client"

import { orderHistory } from "@/lib/orders"
import { OrderSnapshot, OrderStatus } from "@/orders/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export function useOrder() {
    const params = useParams()
    const [order, setOrder] = useState<OrderSnapshot | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const orders = orderHistory.get()
        const foundOrder = orders.find(o => o.id === params.id)

        if (foundOrder) {
            setOrder(foundOrder)
        }
        setLoading(false)
    }, [params.id])

    useEffect(() => {
        if (order?.status === OrderStatus.DELIVERED) return

        let isActive = true
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${params.id}`)
                if (!res.ok) throw new Error("Failed to fetch order")

                const data = await res.json()

                if (isActive) {
                    setOrder(data)
                    orderHistory.updateStatus(data.id, data.status)
                }
            } catch (err) {
                toast("Could not fetch Order details")
                console.error(err)
            }
        }
        const interval = setInterval(fetchOrder, 5000)
        
        return () => {
            isActive = true
            clearInterval(interval)
        }
    }, [order?.status, params.id])

    return { order, loading }
}
