import { MenuItem } from "@/menu/types";

export type Customer = {
  name: string;
  address: string;
  phone: string;
};

export type OrderItem = { item: MenuItem; quantity: number };

export type Pricing = {
  subtotal: number;
  tax: number;
  delivery: number;
  total: number;
};

export type OrderSnapshot = {
  id: string;
  items: OrderItem[];
  customer: Customer;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  pricing: Pricing;
};

export enum OrderStatus {
  RECEIVED = "RECEIVED",
  PREPARING = "PREPARING",
  OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY",
  DELIVERED = "DELIVERED",
}

export interface OrderStore {
  orders: Map<string, OrderSnapshot>;
  create(items: OrderItem[], customer: Customer, pricing: Pricing): Promise<OrderSnapshot>;
  findById(id: string): Promise<OrderSnapshot | null>;
  updateStatus(orderId: string): Promise<OrderSnapshot | null>;
  reset(): void;
}
