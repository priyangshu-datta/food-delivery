"use client";

import { useCustomer } from "@/context/customer";

interface CustomerInfoProps {
  onEdit: () => void;
  onPlaceOrder: () => void;
  isLoading: boolean;
  className?: string;
}

export default function CustomerInfo({ onEdit, onPlaceOrder, isLoading, className = "" }: CustomerInfoProps) {
  const { customer } = useCustomer();

  if (!customer) return null;

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Customer Information
        </h2>
        <div className="space-y-3 mb-6 text-foreground">
          <div>
            <span className="font-medium">Name:</span> {customer.name}
          </div>
          <div>
            <span className="font-medium">Address:</span>{" "}
            {customer.address}
          </div>
          <div>
            <span className="font-medium">Phone:</span> {customer.phone}
          </div>
        </div>
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm mb-4"
        >
          Edit Customer Details
        </button>
      </div>
      <button
        onClick={onPlaceOrder}
        className="w-full bg-green-600 text-primary-foreground py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
      >
        {isLoading ? "Placing Order..." : "Place Order"}
      </button>
    </div>
  );
}
