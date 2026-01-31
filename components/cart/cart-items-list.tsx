'use client'

import { CartItem } from '@/context/cart'
import { CartItem as CartItemComponent } from './cart-item'

interface CartItemsListProps {
  items: CartItem[]
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onClearCart: () => void
}

export function CartItemsList({ items, onQuantityChange, onRemove, onClearCart }: CartItemsListProps) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Cart Items ({totalItems})
          </h2>
          <button
            onClick={onClearCart}
            className="text-sm text-destructive hover:text-destructive/80 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="space-y-4">
          {items.map(({ item, quantity }) => (
            <CartItemComponent
              key={item.id}
              item={item}
              quantity={quantity}
              onQuantityChange={onQuantityChange}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
