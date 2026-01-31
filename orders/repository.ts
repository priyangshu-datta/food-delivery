import { OrderSnapshot, OrderStatus, OrderStore, OrderItem, Customer, Pricing } from "./types";

class OrderRepository implements OrderStore {
  public orders: Map<string, OrderSnapshot> = new Map();

  private static instance: OrderRepository;

  private constructor() {}

  static getInstance(): OrderRepository {
    if (!OrderRepository.instance) {
      OrderRepository.instance = new OrderRepository();
    }
    return OrderRepository.instance;
  }

  private getOrderStatus(createdAt: Date, now = new Date()) {
    const elapsed = now.getTime() - createdAt.getTime()

    if (elapsed < 5_000) return OrderStatus.RECEIVED
    if (elapsed < 20_000) return OrderStatus.PREPARING
    if (elapsed < 25_000) return OrderStatus.OUT_FOR_DELIVERY
    return OrderStatus.DELIVERED
  }

  create(items: OrderItem[], customer: Customer, pricing: Pricing) {
    const id = crypto.randomUUID();
    const status = OrderStatus.RECEIVED;
    const createdAt = new Date().toISOString();
    const order: OrderSnapshot = { id, status, createdAt, updatedAt: createdAt, items, customer, pricing };
    this.orders.set(id, order);
    return Promise.resolve(order);
  }

  findById(id: string) {
    return Promise.resolve(this.orders.get(id) || null);
  }

  async updateStatus(orderId: string) {
    const order = await this.findById(orderId)
    if (!order) {
      return Promise.resolve(null)
    }
    const status = this.getOrderStatus(new Date(order.createdAt))
    const updatedAt = new Date().toISOString();
    this.orders.set(orderId, {...order, status, updatedAt})
    return Promise.resolve(this.orders.get(orderId)!);
  }

  reset() {
    this.orders.clear();
  }
}

export const orderStore = OrderRepository.getInstance();
