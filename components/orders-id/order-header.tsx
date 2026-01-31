"use client"

import Link from "next/link"

export function OrderHeader() {
    return (
        <div className="mb-6">
            <Link
                href="/menu"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-2 text-sm"
            >
                ← Back to Menu
            </Link>
        </div>
    )
}
