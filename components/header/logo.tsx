'use client'

import Link from 'next/link'

interface LogoProps {
  subtotal: number
}

export default function Logo({ subtotal }: LogoProps) {
  return (
    <Link href="/" className="flex items-center space-x-2 mr-auto md:m-0">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">F</span>
      </div>
      <span className={"text-xl font-bold text-foreground " + (subtotal > 0 ? "hidden md:block" : "")}>FoodDelivery</span>
    </Link>
  )
}
