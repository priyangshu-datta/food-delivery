"use client";

import { useCustomer } from "@/context/customer";
import { useCheckoutOrder } from "@/hooks/use-checkout-order";
import CheckoutHeader from "@/components/checkout/checkout-header";
import OrderSummary from "@/components/checkout/order-summary";
import CustomerInfo from "@/components/checkout/customer-info";
import CustomerForm from "@/components/checkout/customer-form";

export default function CheckoutPage() {
    const { customer, setCustomer } = useCustomer();
    const { handlePlaceOrder, isLoading, shouldRedirect } = useCheckoutOrder();

    if (shouldRedirect) {
        return null; // Will redirect to cart
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <CheckoutHeader />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <OrderSummary />
                
                <div>
                    {customer ? (
                        <CustomerInfo 
                            onEdit={() => setCustomer(null)}
                            onPlaceOrder={handlePlaceOrder}
                            isLoading={isLoading}
                        />
                    ) : (
                        <CustomerForm />
                    )}
                </div>
            </div>
        </div>
    );
}
