'use client'

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export function EmptyCart() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
         <ShoppingCart size={50} color="#616161" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added any items to your cart yet.</p>
        <Link
          href="/menu"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-primary-foreground font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Browse Menu
        </Link>
      </div>
    </div>
  )
}
