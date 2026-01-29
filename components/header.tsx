'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/context/cart'

export default function Header() {
  const { items } = useCart()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">FoodDelivery</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8 mx-auto">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/menu" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Menu
            </Link>
            <Link 
              href="/orders" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Orders
            </Link>
          </nav>

          {/* Cart */}
          <Link 
            href="/cart" 
            className="ml-auto md:m-0 relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
              />
            </svg>
            
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/menu" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link 
                href="/orders" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Orders
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
