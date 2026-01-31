'use client'

import { Menu, X } from "lucide-react"

interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

export default function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <button
      className="md:hidden p-2 text-muted-foreground hover:text-blue-600"
      onClick={onToggle}
    >

      {isOpen ? <X /> : <Menu />}
    </button>
  )
}
