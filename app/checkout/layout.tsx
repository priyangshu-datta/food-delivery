import { CheckoutProvider } from "@/context/checkout";

export default function CheckoutLayout({children}: {children: React.ReactNode}) {
    return <CheckoutProvider>{children}</CheckoutProvider>
}