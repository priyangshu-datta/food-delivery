import { menu } from "@/menu/repository";
import { AppError } from "@/lib/errors";
import { orderStore } from "./repository";
import { Customer, OrderItem } from "./types";

interface CreateOrderParams {
    items: OrderItem[]
    customer: Customer
}

export async function createOrder({ items, customer }: CreateOrderParams) {
    await Promise.all(
        items.map(async item => {
            const menuItem = await menu.findById(item.id)
            if (!menuItem) {
                throw new AppError(`Food item with id ${item.id} not found`, "FOOD_ITEM_NOT_FOUND", 404)
            }
        })
    )
    if (items.some(item => item.quantity <= 0)) {
        throw new AppError("Quantity must be greater than zero", "INVALID_QUANTITY", 400)
    }
    if (!customer.name || !customer.address || !customer.phone) {
        throw new AppError("Customer details malformed or missing", "INVALID_CUSTOMER", 400)
    }

    const newOrder = await orderStore.create(items, customer)
    return newOrder
}

export async function getOrderById(id: string) {
    return orderStore.findById(id)
}