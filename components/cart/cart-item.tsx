'use client'

import Image from 'next/image'
import {CircleMinus, CirclePlus, Minus} from "lucide-react"
import { CartItem as CartItemType } from '@/context/cart'

interface CartItemProps {
  item: CartItemType['item']
  quantity: number
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, quantity, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex md:items-center space-x-4 py-4 border-b border-border last:border-b-0">
      <div className="shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={80}
          height={80}
          className="w-20 h-20 rounded-lg object-cover"
        />
      </div>

      <div className='flex items-center w-full flex-wrap'>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-foreground truncate">
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {item.description}
          </p>
          <p className="text-lg font-semibold text-foreground mt-2 hidden md:block">
            ₹{item.price.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onQuantityChange(item.id, quantity - 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200"
          >
            <CircleMinus />
          </button>

          <span className="w-12 text-center font-medium text-foreground">
            {quantity}
          </span>

          <button
            onClick={() => onQuantityChange(item.id, quantity + 1)}
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-muted transition-colors duration-200"
          >
            <CirclePlus />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-2">
        <p className="text-lg font-semibold text-foreground">
          ₹{(item.price * quantity).toFixed(2)}
        </p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-destructive hover:text-destructive/80 font-medium"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
