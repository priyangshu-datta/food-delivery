import { AppError } from "@/lib/errors"
import { createOrder } from "@/orders/service"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const body = await request.json()
    if (!body) {
        return NextResponse.json({ error: "Order body is required" }, { status: 400 })
    }
    if (!body.items || !body.customer) {
        return NextResponse.json({ error: "Order body is required" }, { status: 400 })
    }
    try {
        const order = await createOrder({
            items: body.items,
            customer: body.customer
        })
        return NextResponse.json(order, { status: 201 })
    } catch (error) {
        if (error instanceof AppError) {
            return NextResponse.json({ error: error.message, code: error.code }, { status: error.status })
        }
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }
}