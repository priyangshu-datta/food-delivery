import { Customer, OrderItem, OrderStatus, OrderStore } from "./types";

export const orderStore: OrderStore = {
    orders: new Map(),
    create(items: OrderItem[], customer: Customer) {
        const id = crypto.randomUUID()
        const status = OrderStatus.RECEIVED
        const createdAt = new Date().toISOString()
        this.orders.set(id, { id, status, createdAt, items, customer })
        return Promise.resolve({ id, status, createdAt, items, customer })
    },
    findById(id) {
        return Promise.resolve(this.orders.get(id) || null)
    },
    update(order) {
        this.orders.set(order.id, order)
        return Promise.resolve()
    },
    reset() {
        this.orders.clear()
    }
}
