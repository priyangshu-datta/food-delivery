import { Menu } from "./types";

export const menu: Menu = {
    items: [
        {
            id: "1",
            name: "Burger",
            image: "https://example.com/burger.jpg",
            price: 10,
            description: "A delicious burger"
        },
        {
            id: "2",
            name: "Pizza",
            image: "https://example.com/pizza.jpg",
            price: 20,
            description: "A delicious pizza"
        },
        {
            id: "3",
            name: "Pasta",
            image: "https://example.com/pasta.jpg",
            price: 15,
            description: "A delicious pasta"
        },
        {
            id: "4",
            name: "Salad",
            image: "https://example.com/salad.jpg",
            price: 10,
            description: "A delicious salad"
        }
    ],
    findById(id) {
        return Promise.resolve(this.items.find(item => item.id === id) || null)
    },
    getMenu() {
        return Promise.resolve(this.items)
    }
}