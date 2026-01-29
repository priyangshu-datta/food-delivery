import { POST } from "@/app/api/orders/route"
import { createOrder, getOrderById } from "@/orders/service"
import { orderStore } from "@/orders/repository"
import { OrderStatus } from "@/orders/types"
import { NextRequest } from "next/server"
import { beforeEach } from "node:test"
import { describe, expect, it } from "vitest"

const customer = {
    name: "John Doe",
    address: "123 Main St",
    phone: "1234567890"
}

beforeEach(()=>{
    orderStore.reset()
})

describe("createOrder", () => {
    it("should create an order", async () => {
        const items = [{ id: "1", quantity: 1 }]
        const order = await createOrder({ items, customer })

        expect(order.id).toBeDefined()
        expect(order.status).toBe(OrderStatus.RECEIVED)
        
        expect(order.items).toHaveLength(items.length)
        expect(order.items[0].id).toBe("1")
        expect(order.items[0].quantity).toBe(1)

        expect(order.customer).toEqual(customer)
    })

    it("should error: quantity is <= 0", async () => {
        const invalidItems = [
            [{ id: "1", quantity: 0 }],
            [{ id: "1", quantity: -1 }],
            [{ id: "1", quantity: 1 }, { id: "2", quantity: -1 }]
        ]
        for (const item of invalidItems) {
            await expect(createOrder({
                items: item, customer
            })).rejects.toThrow("Quantity must be greater than zero")
        }
    })

    it("should error: customer details malformed", async () => {
        const invalidCustomers = [
            { name: "", address: "", phone: "" },
            { name: "", address: "123", phone: "123" },
            { name: "John", address: "", phone: "123" },
            { name: "John", address: "123", phone: "" }
        ]
        const items = [{ id: "1", quantity: 1 }]
        for (const customer of invalidCustomers) {
            await expect(createOrder({
                items, customer
            })).rejects.toThrow("Customer details malformed or missing")
        }
    })
})

describe("getOrderById", () => {
    it("returns an existing order by id", async () => {
        const order = await createOrder({ items: [{ id: "1", quantity: 1 }], customer })
        const fetchedOrder = await getOrderById(order.id)
        expect(fetchedOrder).toBeDefined()
        expect(fetchedOrder?.id).toBe(order.id)
        expect(fetchedOrder?.status).toBe(order.status)

        expect(fetchedOrder?.items).toEqual(order.items)
        expect(fetchedOrder?.customer).toEqual(order.customer)
    })

    it("returns null for unknown order id", async () => {
        const fetchedOrder = await getOrderById("unknown")
        expect(fetchedOrder).toBeNull()
    })
})

describe("POST /api/orders", () => {
    it("creates an order and returns an order id", async () => {
        const payload = {
            items: [{ id: "1", quantity: 1 }],
            customer
        }
        const req = new NextRequest("http://localhost/api/orders", {
            method: "POST",
            body: JSON.stringify(payload),
        })
        const response = await POST(req)
        expect(response.status).toBe(201)
        const order = await response.json()
        expect(order.id).toBeDefined()
    })

    it("returns 400 for invalid customer data", async () => {
        const payload = {
            items: [{ id: "1", quantity: 1 }],
            customer: {
                name: "",
                address: "",
                phone: ""
            }
        }
        const req = new NextRequest("localhost:3000/api/orders", {
            method: "POST",
            body: JSON.stringify(payload)
        })
        const response = await POST(req)
        expect(response.status).toBe(400)
        const error = await response.json()
        expect(error.code).toBe("INVALID_CUSTOMER")
    })

    it("returns 400 for invalid quantity", async () => {
        const payload = {
            items: [{ id: "1", quantity: -1 }],
            customer
        }
        const req = new NextRequest("localhost:3000/api/orders", {
            method: "POST",
            body: JSON.stringify(payload)
        })
        const response = await POST(req)
        expect(response.status).toBe(400)
        const error = await response.json()
        expect(error.code).toBe("INVALID_QUANTITY")
    })
})