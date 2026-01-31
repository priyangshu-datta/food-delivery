"use client"

import { OrderSnapshot, OrderStatus as OrderStatusEnum } from "@/orders/types"
import { Check } from "lucide-react"

interface OrderStatusProps {
    order: OrderSnapshot
}

export function OrderStatus({ order }: OrderStatusProps) {
    const getStatusStep = (status: OrderStatusEnum) => {
        switch (status) {
            case OrderStatusEnum.RECEIVED:
                return 1
            case OrderStatusEnum.PREPARING:
                return 2
            case OrderStatusEnum.OUT_FOR_DELIVERY:
                return 3
            case OrderStatusEnum.DELIVERED:
                return 4
            default:
                return 1
        }
    }

    const formatTime = (dateString: string) => {
        return new Intl.DateTimeFormat("en-IN", {
            dateStyle: "short",
            timeStyle: "short"
        }).format(new Date(dateString))
    }

    const currentStep = getStatusStep(order.status)

    return (
        <div className="bg-white dark:bg-gray-300 rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">ORDER STATUS</h2>

            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${currentStep >= 1 ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}>
                        {currentStep >= 1 && (
                           <Check size={14} /> 
                        )}
                    </div>
                    <span className={`font-medium ${currentStep >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                        Order Received
                    </span>
                </div>

                {currentStep > 1 && <div className="ml-3 w-0.5 h-6 bg-gray-300 dark:bg-gray-500"></div>}

                <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${currentStep >= 2 ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}>
                        {currentStep === 2 ? (
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        ) : currentStep >= 2 && (
                            <Check size={14} /> 
                        )}
                    </div>
                    <span className={`font-medium ${currentStep >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>
                        Preparing
                    </span>
                </div>

                {currentStep > 2 && <div className="ml-3 w-0.5 h-6 bg-gray-300 dark:bg-gray-500"></div>}

                <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${currentStep >= 3 ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}>
                        {currentStep === 3 ? (
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        ) : currentStep >= 3 && (
                            <Check size={14} /> 
                        )}
                    </div>
                    <span className={`font-medium ${currentStep >= 3 ? 'text-gray-900' : 'text-gray-400'}`}>
                        Out for Delivery
                    </span>
                </div>

                {currentStep > 3 && <div className="ml-3 w-0.5 h-6 bg-gray-300 dark:bg-gray-500"></div>}

                <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${currentStep >= 4 ? 'bg-green-600 border-green-600' : 'border-gray-300'
                        }`}>
                        {currentStep >= 4 && (
                            <Check size={14} /> 
                        )}
                    </div>
                    <span className={`font-medium ${currentStep >= 4 ? 'text-gray-900' : 'text-gray-400'}`}>
                        Delivered
                    </span>
                </div>
            </div>

            <p className="text-sm text-gray-500 mt-6">Last updated: {formatTime(order.updatedAt)}</p>
        </div>
    )
}
