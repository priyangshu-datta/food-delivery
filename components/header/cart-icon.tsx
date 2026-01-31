'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

interface CartIconProps {
  subtotal: number
  totalItems: number
}

export default function CartIcon({ subtotal, totalItems }: CartIconProps) {
  return (
    <Link
      href="/cart"
      className="relative p-2 text-muted-foreground hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 cursor-pointer hover:bg-accent rounded-lg bg-muted"
    >
      {totalItems > 0 && <span className="ml-2 text-muted-foreground">₹{subtotal}</span>}

      <ShoppingCart color="#616161" />

      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </Link>
  )
}
