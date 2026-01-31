'use client'

import { useState } from 'react'
import { useCart } from '@/context/cart'
import Logo from './logo'
import Navigation from './navigation'
import CartIcon from './cart-icon'
import MobileMenuButton from './mobile-menu-button'

export default function Header() {
  const { value } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const { subtotal, length: totalItems } = value()

  return (
    <header className="bg-linear-to-br from-blue-100/80 via-white/80 to-purple-100/80 dark:from-gray-900/80 dark:via-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm shadow-sm border-b border-border sticky top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <Logo subtotal={subtotal} />
          <Navigation />
          <CartIcon subtotal={subtotal} totalItems={totalItems} />
          <MobileMenuButton 
            isOpen={isMobileMenuOpen} 
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          />
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Navigation 
              isMobile={true} 
              onCloseMobileMenu={() => setIsMobileMenuOpen(false)} 
            />
          </div>
        )}
      </div>
    </header>
  )
}
