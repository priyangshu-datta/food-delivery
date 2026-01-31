# Food Delivery – Order Management Feature

> **Live Demo:** [https://food-delivery-pd.vercel.app/cart](https://food-delivery-pd.vercel.app/cart)

This project implements a simplified **Order Management feature** for a food delivery application. The focus is on correctness, clarity, and explicit trade-offs rather than over-engineering.

---

## Overview

The application allows users to:

* Browse a menu of food items
* Add items to a cart and adjust quantities
* Place an order with delivery details
* Track order status through simulated stages

The system is built using **Next.js (App Router)** with a lightweight backend and predictable state transitions.

---

## Tech Stack

### Runtime & Tooling

* **Bun** (package manager and runtime)
* **TypeScript**

### Frontend

* **Next.js 16 (App Router)**
* **React 19**
* **Tailwind CSS v4**
* `lucide-react` for icons
* `react-hot-toast` for notifications
* `next-themes` for dark mode support

### Backend

* **Next.js API routes**
* In-memory storage using JavaScript `Map`

### Testing

* **Vitest**
* Focus on business logic and API behavior

---

## Project Structure (High Level)

```
app/
├── api/
│   ├── menu/
│   │   └── route.ts
│   └── orders/
│       ├── route.ts
│       └── [id]/route.ts
├── cart/
│   └── page.tsx
├── orders/
│   └── [id]/page.tsx
├── layout.tsx
├── page.tsx
```

---

## Menu Management

* Menu data is **hardcoded** on the server.
* Each item includes:

  * Name
  * Description
  * Price
  * Image reference

This keeps the scope focused on order flow and state handling rather than content management.

---

## Order Flow

1. User adds items to the cart
2. Cart state is persisted in **localStorage**
3. User enters delivery details at checkout
4. Order is submitted via REST API
5. Order is stored **in memory** on the server
6. User is redirected to an order receipt page

---

## Order Status & Updates

Order status is **derived from elapsed time** since order creation.

### Status progression

* Order Received
* Preparing
* Out for Delivery
* Delivered

### Update mechanism

* **Client-side polling**
* Each poll computes the current status based on timestamps

This approach avoids background jobs and ensures the status can be recomputed deterministically at any time.

---

## Data Persistence Strategy

| Layer  | Storage       | Rationale                            |
| ------ | ------------- | ------------------------------------ |
| Client | localStorage  | Cart persistence across refreshes    |
| Server | In-memory Map | Simple, fast, and explicit trade-off |
| Menu   | Hardcoded     | Predictability and reduced scope     |

### Known Limitation

Orders stored in memory are lost when the server restarts or the instance is recycled. This is an intentional and documented trade-off for the scope of this assignment.

---

## API Endpoints

### `GET /api/menu`

Returns the list of available menu items.

### `POST /api/orders`

Creates a new order.

Includes:

* Items and quantities
* Delivery details

### `GET /api/orders/:id`

Returns:

* Order details
* Computed order status based on elapsed time

---

## Testing Approach

* Tests are written using **Vitest**
* Primary focus areas:

  * Order status calculation logic
  * Time-based transitions
  * Input validation
  * Core API behavior

UI testing is intentionally limited to keep the emphasis on correctness of business logic.

---

## Architectural Decisions & Trade-Offs

* **No database**: avoids unnecessary setup for a scoped assignment
* **Polling instead of SSE/WebSockets**:

  * Compatible with serverless platforms
  * Simpler failure and recovery model
* **Time-derived status**:

  * No background workers
  * Stateless reads
  * Easy recovery after refresh

The system prioritizes determinism and transparency over simulated complexity.

---

## Use of AI During Development

AI tools were used to support development in the following areas:

* Understanding and validating the scope of the problem
* Test generation and refinement
* Code health checks and refactoring suggestions
* Bootstrapping reusable UI components
* Discussing UI patterns and architectural trade-offs
* Image Generation: Gemini

All decisions and final implementations were reviewed and adapted manually.

---

## Running the Project Locally

```bash
bun install
bun dev
```

The application will be available at `http://localhost:3000`.

---

## Possible Improvements

* Persist orders in a database
* Replace polling with SSE when infrastructure allows
* Add end-to-end tests
* Improve accessibility and keyboard navigation
* Add an admin view for order lifecycle management

---

## Final Notes

This project is intentionally optimized for:

* Readability
* Maintainability
* Explicit trade-offs
* Predictable behavior

Rather than solving every possible problem, it clearly defines which problems are worth solving within the given constraints.
