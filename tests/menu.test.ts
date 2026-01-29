import { menu } from "@/menu/repository"
import { describe, expect, it } from "vitest"
import { GET } from "@/app/api/menu/route"

describe("getMenu", () => {
    it("returns a non-empty menu with valid items", async () => {
        const menu = await menu.getMenu()
        expect(menu).toBeDefined()
        expect(menu.length).toBeGreaterThan(0)
        for (const item of menu) {
            expect(item.id).toBeDefined()
            expect(item.name).toBeDefined()
            expect(item.description).toBeDefined()
            expect(item.price).toBeDefined()
            expect(item.image).toBeDefined()
        }
    })
})

describe("GET /api/menu", () => {
    it("returns 200 and a JSON array", async () => {
        const response = await GET()
        expect(response.status).toBe(200)
        const menu = await response.json()
        expect(menu).toBeDefined()
        expect(Array.isArray(menu)).toBe(true)
        expect(menu.length).toBeGreaterThan(0)
    })
})