'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  isMobile?: boolean
  onCloseMobileMenu?: () => void
}

export default function Navigation({ isMobile = false, onCloseMobileMenu }: NavigationProps) {
  const currentRoute = usePathname()

  const getLinkClassName = (href: string) => {
    const baseClass = "font-medium transition-colors duration-200"
    const activeClass = "text-blue-600"
    const inactiveClass = "text-muted-foreground hover:text-blue-600"
    
    return `${baseClass} ${currentRoute === href ? activeClass : inactiveClass}`
  }

  if (isMobile) {
    return (
      <nav className="flex flex-col space-y-3">
        <Link
          href="/"
          className={getLinkClassName("/")}
          onClick={onCloseMobileMenu}
        >
          Home
        </Link>
        <Link
          href="/menu"
          className={getLinkClassName("/menu")}
          onClick={onCloseMobileMenu}
        >
          Menu
        </Link>
        <Link
          href="/orders"
          className={getLinkClassName("/orders")}
          onClick={onCloseMobileMenu}
        >
          Orders
        </Link>
      </nav>
    )
  }

  return (
    <nav className="hidden md:flex items-center space-x-8 mr-auto ml-8">
      <Link
        href="/menu"
        className={getLinkClassName("/menu")}
      >
        Menu
      </Link>
      <Link
        href="/orders"
        className={getLinkClassName("/orders")}
      >
        Orders
      </Link>
    </nav>
  )
}
