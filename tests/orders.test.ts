import { GET as getOrder } from "@/app/api/orders/[id]/route";
import { POST as postOrder } from "@/app/api/orders/route";
import menu from "@/menu/data.json";
import { orderStore } from "@/orders/repository";
import { createOrder, getOrderById } from "@/orders/service";
import { OrderStatus } from "@/orders/types";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const customer = {
  name: "John Doe",
  address: "123 Main St",
  phone: "1234567890",
};

beforeEach(() => {
  orderStore.reset();
});

describe("createOrder", () => {
  it("should create an order", async () => {
    const items = [{ item: menu.at(0)!, quantity: 1 }];
    const order = await createOrder({ items, customer });

    expect(order.id).toBeDefined();
    expect(order.status).toBe(OrderStatus.RECEIVED);

    expect(order.items).toHaveLength(items.length);
    expect(order.items[0].item.id).toBe(menu.at(0)?.id);
    expect(order.items[0].quantity).toBe(1);

    expect(order.customer).toEqual(customer);
  });

  it("should error: quantity is <= 0", async () => {
    const invalidItems = [
      [{ item: menu.at(0)!, quantity: -1 }],
      [{ item: menu.at(1)!, quantity: 0 }],
      [
        { item: menu.at(2)!, quantity: 1 },
        { item: menu.at(3)!, quantity: -1 },
      ],
    ];
    for (const item of invalidItems) {
      await expect(
        createOrder({
          items: item,
          customer,
        }),
      ).rejects.toThrow("Quantity must be greater than zero");
    }
  });

  it("should error: customer details malformed", async () => {
    const invalidCustomers = [
      { name: "", address: "", phone: "" },
      { name: "", address: "123", phone: "123" },
      { name: "John", address: "", phone: "123" },
      { name: "John", address: "123", phone: "" },
    ];
    const items = [{ item: menu.at(0)!, quantity: 1 }];
    for (const customer of invalidCustomers) {
      await expect(
        createOrder({
          items,
          customer,
        }),
      ).rejects.toThrow("Customer details malformed or missing");
    }
  });
});

describe("getOrderById", () => {
  it("returns an existing order by id", async () => {
    const order = await createOrder({
      items: [{ item: menu.at(0)!, quantity: 1 }],
      customer,
    });
    const fetchedOrder = await getOrderById(order.id);
    expect(fetchedOrder).toBeDefined();
    expect(fetchedOrder?.id).toBe(order.id);
    expect(fetchedOrder?.status).toBe(order.status);

    expect(fetchedOrder?.items).toEqual(order.items);
    expect(fetchedOrder?.customer).toEqual(order.customer);
  });

  it("returns null for unknown order id", async () => {
    expect(getOrderById("unknown")).rejects.toThrow();
  });
});

describe("POST /api/orders", () => {
  it("creates an order and returns an order id", async () => {
    const payload = {
      items: [{ item: menu.at(0), quantity: 1 }],
      customer,
    };
    const req = new NextRequest("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const response = await postOrder(req);
    expect(response.status).toBe(201);
    const order = await response.json();
    expect(order.id).toBeDefined();
  });

  it("returns 400 for invalid customer data", async () => {
    const payload = {
      items: [{ item: menu.at(0), quantity: 1 }],
      customer: {
        name: "",
        address: "",
        phone: "",
      },
    };
    const req = new NextRequest("localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const response = await postOrder(req);
    expect(response.status).toBe(400);
    const error = await response.json();
    expect(error.code).toBe("INVALID_CUSTOMER");
  });

  it("returns 400 for invalid quantity", async () => {
    const payload = {
      items: [{ item: menu.at(0), quantity: -1 }],
      customer,
    };
    const req = new NextRequest("localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const response = await postOrder(req);
    expect(response.status).toBe(400);
    const error = await response.json();
    expect(error.code).toBe("INVALID_QUANTITY");
  });
});

describe("order status timeline", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  let orderId: string;

  beforeEach(async () => {
    const payload = {
      items: [{ item: menu.at(0), quantity: 1 }],
      customer,
    };

    const req = new NextRequest("http://localhost:3000/api/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const res = await postOrder(req);
    const order = await res.json();
    orderId = order.id;
  });

  async function fetchOrder() {
    const req = new NextRequest(`http://localhost:3000/api/orders/${orderId}`);

    const res = await getOrder(req, {
      params: Promise.resolve({ id: orderId }),
    });

    return res.json();
  }

  it("moves through order states over time", async () => {
    let order = await fetchOrder();
    expect(order.status).toBe(OrderStatus.RECEIVED);

    vi.advanceTimersByTime(6_000);
    order = await fetchOrder();
    expect(order.status).toBe(OrderStatus.PREPARING);

    vi.advanceTimersByTime(15_000);
    order = await fetchOrder();
    expect(order.status).toBe(OrderStatus.OUT_FOR_DELIVERY);

    vi.advanceTimersByTime(5_000);
    order = await fetchOrder();
    expect(order.status).toBe(OrderStatus.DELIVERED);
  });
});
