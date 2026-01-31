"use client";

import { useCustomer } from "@/context/customer";
import { useState, FormEvent, ChangeEvent } from "react";

interface CustomerFormProps {
  className?: string;
}

export default function CustomerForm({ className = "" }: CustomerFormProps) {
  const { customer, setCustomer } = useCustomer();
  const [formData, setFormData] = useState({
    name: customer?.name || "",
    address: customer?.address || "",
    phone: customer?.phone || "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCustomer(formData);
  };

  return (
    <div className={`bg-card p-6 rounded-lg border border-border ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-foreground">
        Customer Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-background text-foreground"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Delivery Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-background text-foreground"
            placeholder="Enter your delivery address"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-background text-foreground"
            placeholder="Enter your phone number"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-primary-foreground py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save Customer Details
        </button>
      </form>
    </div>
  );
}
