import { AppError } from "@/lib/errors";
import { getOrderById } from "@/orders/service";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const orderId = (await params).id;
  if (!orderId) {
    return NextResponse.json(
      { error: "Order ID is required" },
      { status: 400 },
    );
  }
  try {
    const order = await getOrderById(orderId);
    return NextResponse.json(order);
  } catch (error) {
    if (error instanceof AppError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status },
      );
    }
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
