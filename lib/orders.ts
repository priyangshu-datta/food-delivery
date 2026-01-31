"use client";

import type { OrderSnapshot, OrderStatus } from "../orders/types";

const STORAGE_KEY = "orderHistory";

export const orderHistory = {
  get() {
    const orders = localStorage.getItem(STORAGE_KEY);
    if (orders) {
      return JSON.parse(orders) as OrderSnapshot[];
    }
    return [];
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY);
  },
  add(order: OrderSnapshot) {
    const orders = this.get();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...orders, order]));
  },
  updateStatus(id: string, status: OrderStatus) {
    const orders = this.get();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        orders.map((order) => {
          if (order.id === id) {
            order.status = status;
          }
          return order;
        }),
      ),
    );
  },
};
