'use client'

import { useState, useEffect } from 'react'
import { MenuItem } from '@/menu/types'
import { useCart } from '@/context/cart'
import Image from 'next/image'
import { Plus } from 'lucide-react'

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cart = useCart()

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu')
        if (!response.ok) {
          throw new Error('Failed to fetch menu')
        }
        const data = await response.json()
        setMenuItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Loading Menu...</h1>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Menu</h1>
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8">Our Menu</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-border">
              <div className="">
                <Image
                  height={192}
                  width={341}
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover bg-transparent"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">₹{item.price}</span>
                  {cart.findItem(item.id) ?
                    <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                      <button 
                        className="w-8 h-8 rounded-full bg-background shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-muted-foreground hover:text-foreground font-semibold border border-border"
                        onClick={() => cart.updateQuantity(item.id, cart.findItem(item.id)!.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="min-w-8 text-center font-semibold text-foreground">
                        {cart.findItem(item.id)!.quantity}
                      </span>
                      <button 
                        className="w-8 h-8 rounded-full bg-background shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center text-muted-foreground hover:text-foreground font-semibold border border-border"
                        onClick={() => cart.updateQuantity(item.id, cart.findItem(item.id)!.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    :
                    <button 
                      className="bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-primary-foreground font-medium py-2.5 px-5 rounded-full transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
                      onClick={() => cart.addItem({item, quantity: 1})}
                    >
                      <Plus/>
                      Add to Cart
                    </button>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>

        {menuItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No menu items available at the moment.</p>
          </div>
        )}
    </div>
  )
}