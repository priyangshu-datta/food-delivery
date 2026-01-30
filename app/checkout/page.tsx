"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCustomer } from "@/context/customer"
import { useCart } from "@/context/cart"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
    const { customer, setCustomer } = useCustomer()
    const { items } = useCart()
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: customer?.name || "",
        address: customer?.address || "",
        phone: customer?.phone || ""
    })

    useEffect(() => {
        if (items.length === 0) {
            router.push("/cart")
        }
    }, [items, router])

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setCustomer(formData)
    }

    const handlePlaceOrder = () => {
        // TODO: Implement order placement logic
        alert("Order placed successfully!")
    }

    if (items.length === 0) {
        return null // Will redirect to cart
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-6">
                <Link href="/cart" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
                    ← Back to Cart
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Customer Details */}
                <div>
                    {customer ? (
                        <div className="flex flex-col gap-4">
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                                <div className="space-y-3 mb-6">
                                    <div>
                                        <span className="font-medium">Name:</span> {customer.name}
                                    </div>
                                    <div>
                                        <span className="font-medium">Address:</span> {customer.address}
                                    </div>
                                    <div>
                                        <span className="font-medium">Phone:</span> {customer.phone}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setCustomer(null)}
                                    className="text-blue-600 hover:text-blue-800 text-sm mb-4"
                                >
                                    Edit Customer Details
                                </button>
                            </div>
                            <button
                                onClick={handlePlaceOrder}
                                className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
                            >
                                Place Order • ${totalPrice.toFixed(2)}
                            </button>
                        </div>
                    ) : (
                        <div className="bg-white p-6 rounded-lg border">
                            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                                        Delivery Address
                                    </label>
                                    <textarea
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your delivery address"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter your phone number"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Save Customer Details
                                </button>
                            </form>
                        </div>
                    )}
                </div>

                {/* Cart Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 items-center">
                                <div className="relative w-16 h-16">
                                    <img
                                        src={item.image}
                                        alt={item.name}

                                        className="object-cover rounded"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-600">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                                </div>
                                <div className="font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}

                        <div className="border-t pt-4 mt-4">
                            <div className="flex justify-between mb-2">
                                <span>Items ({totalItems}):</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total:</span>
                                <span>${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}