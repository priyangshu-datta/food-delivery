"use client"

import { type ReactNode, createContext, useContext, useEffect, useState } from "react";

type CustomerState = {
    name: string;
    address: string;
    phone: string;
}

type CustomerContextValue = {
    customer: CustomerState | null;
    setCustomer: (customer: CustomerState | null) => void;
}

export const CustomerContext = createContext<CustomerContextValue | null>(null);

const STORAGE_KEY = "customer";

export function CustomerProvider({children}: {children: ReactNode}) {
    const [customer, setCustomer] = useState<CustomerState | null>(null);

    useEffect(()=>{
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                setCustomer(JSON.parse(raw));
            }
        } catch {
            // no customer.
        }
    }, [])

    useEffect(()=>{
        if (customer) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(customer));
        }
    }, [customer])

    const value = {
        customer,
        setCustomer
    }

    return (
        <CustomerContext.Provider value={value}>
            {children}
        </CustomerContext.Provider>
    )
}

export function useCustomer() {
    const ctx = useContext(CustomerContext);
    if (!ctx) {
        throw new Error("useCustomer must be used inside CustomerProvider");
    }
    return ctx;
}