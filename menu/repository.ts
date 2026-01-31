import { Menu } from "./types";
import data from "./data.json"

export const menu: Menu = {
    items: data,
    findById(id) {
        return Promise.resolve(this.items.find(item => item.id === id) || null)
    },
    getMenu() {
        return Promise.resolve(this.items)
    }
}