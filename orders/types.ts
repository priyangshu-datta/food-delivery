import { MenuItem } from "@/menu/types"

export type Customer = {
    name: string
    address: string
    phone: string
}

export type OrderItem = {id: MenuItem["id"], quantity: number}

export type Order = {
    id: string
    items: OrderItem[]
    customer: Customer
    status: OrderStatus
    createdAt: string
}

export enum OrderStatus {
    RECEIVED = "RECEIVED",
    PREPARING = "PREPARING",
    DELIVERING = "DELIVERING",
    DELIVERED = "DELIVERED",
}

export interface OrderStore {
    orders: Map<string, Order>
    create(items: OrderItem[], customer: Customer): Promise<Order>
    findById(id: string): Promise<Order | null>
    update(order: Order): Promise<void>
    reset(): void
}