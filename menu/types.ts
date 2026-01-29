export type MenuItem = {
    id: string
    name: string
    description: string
    price: number
    image: string
}

export interface Menu {
    items: MenuItem[]
    findById(id: string): Promise<MenuItem | null>
    getMenu(): Promise<MenuItem[]>
}