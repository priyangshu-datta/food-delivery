"use client"

import type { ReactNode } from "react"
import { createContext, useContext, useState } from "react"

type CheckoutState = { status: "idle" | "loading" | "success" | "error" }

type CheckoutContextType = {
    state: CheckoutState
    setState: (state: CheckoutState) => void
}

const CheckoutContext = createContext<CheckoutContextType | null>(null)

export function CheckoutProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<CheckoutState>({
        status: "idle"
    })

    const value = {
        state,
        setState
    }

    return (
        <CheckoutContext.Provider value={value}>
            {children}
        </CheckoutContext.Provider>
    )
}

export function useCheckout() {
    const context = useContext(CheckoutContext)
    if (!context) {
        throw new Error("useCheckout must be used within a CheckoutProvider")
    }
    return context
}