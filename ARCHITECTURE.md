# Vync Architecture Documentation (Staff-Level)

## System Overview

Vync is a modern social platform built with a **Feature-First** architecture, emphasizing **Contract-Driven Development** and **Explicit State Ownership**.

### Core Technology Stack
- **Frontend**: React 19 (React Compiler), Next.js 15 (App Router), Tailwind CSS 4.
- **State Management**: TanStack Query v5 (Server State), Zustand (Global UI State).
- **Communication**: Specialized Axios clients with automated token refresh and local Next.js proxies.
- **Validation**: Zod (all service boundaries).

## 1. System Boundaries & Ownership

### Client vs. Server
- **Next.js API Routes**: Act as a secure, authenticated boundary. They handle token rotation (HttpOnly cookies) and session management.
- **Shared Utilities**: Centralized in `src/shared/lib/server` and `src/shared/lib/client`.

## 2. API Design Strategy

### Proxy Pattern
All client-side requests route through `/api/[feature]/...` proxies. This allows:
1.  **Authenticated Requests**: Automatically appending `Authorization` headers on the server.
2.  **Error Translation**: Mapping complex backend errors to user-friendly messages via `mapError`.
3.  **Resilience**: Server-side retries and fallback logic (e.g., User Profile fallback).

## 3. State Ownership Policy

Vync follows the rule: **"If it comes from a database, it lives in React Query."**
- **Server State**: Managed via hooks in `features/[feature]/hooks`.
- **UI State**: Minimized to `useState` or scoped Zustand stores.
- **Optimistic Updates**: Implemented for high-frequency actions (Liking, Sending Messages).

## 4. Performance & Scalability

### React Compiler
Vync relies on the **React 19 Compiler** (`babel-plugin-react-compiler`) for automated memoization. This eliminates the need for manual `useMemo` and `useCallback` boilerplate while ensuring optimal re-render cycles.

### Infinite Scroll
Infinite scrolling is standardized using `useInfiniteQuery` and a custom `useIntersectionObserver` hook, ensuring scalable feed delivery.

## 5. Security Model

- **Tokens**: `access_token` and `refresh_token` are stored in `HttpOnly`, `Secure`, `SameSite=Lax` cookies.
- **Client Access**: The frontend CANNOT access these tokens directly, preventing XSS-based token theft.
- **Backend Communication**: Standardized via `backendClient` with automated refresh interceptors.
