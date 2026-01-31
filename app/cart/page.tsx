'use client'

import { useCart } from '@/context/cart'
import { calculatePricing } from '@/lib/pricing'
import { useRouter } from 'next/navigation'
import { EmptyCart } from '@/components/cart/empty-cart'
import { CartItemsList } from '@/components/cart/cart-items-list'
import { OrderSummary } from '@/components/cart/order-summary'

export default function CartPage() {
  const { items, updateQuantity, removeItem, clearCart } = useCart()

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const router = useRouter()

  const handlePlaceOrder = () => {
    router.push("/checkout")
  }

  const { subtotal, tax, delivery, total, amountToFreeDelivery, TAX } = calculatePricing({ items: items.map(({ item, quantity }) => ({ price: item.price, quantity })) })

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">
          <CartItemsList
            items={items}
            onQuantityChange={updateQuantity}
            onRemove={removeItem}
            onClearCart={clearCart}
          />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary
            subtotal={subtotal}
            tax={tax}
            delivery={delivery}
            total={total}
            totalItems={totalItems}
            amountToFreeDelivery={amountToFreeDelivery}
            taxRate={TAX}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  )
}