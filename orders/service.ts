import { AppError } from "@/lib/errors";
import { calculatePricing } from "@/lib/pricing";
import { menu } from "@/menu/repository";
import { orderStore } from "./repository";
import { Customer, OrderItem } from "./types";

interface CreateOrderParams {
    items: OrderItem[]
    customer: Customer
}

export async function createOrder({ items, customer }: CreateOrderParams) {
    const pricingInput = await Promise.all(
        items.map(async ({item, quantity}) => {
            const menuItem = await menu.findById(item.id)
            if (!menuItem) {
                throw new AppError(`Food item with id ${item.id} not found`, "FOOD_ITEM_NOT_FOUND", 404)
            }
            return {price: menuItem.price, quantity}
        })
    )

    if (items.some(item => item.quantity <= 0)) {
        throw new AppError("Quantity must be greater than zero", "INVALID_QUANTITY", 400)
    }
    if (!customer.name || !customer.address || !customer.phone) {
        throw new AppError("Customer details malformed or missing", "INVALID_CUSTOMER", 400)
    }

    const pricing = calculatePricing({items: pricingInput})

    const newOrder = await orderStore.create(items, customer, pricing)
    return newOrder
}

export async function getOrderById(id: string) {
    const order = await orderStore.findById(id)
    if (!order) {
        throw new AppError("Order not found", "ORDER_NOT_FOUND", 404)
    }else{
        return await orderStore.updateStatus(id)
    }
}