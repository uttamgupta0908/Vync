# ADR 002: Server State Ownership with TanStack Query

## Status
Accepted

## Context
Managing server state (data from APIs) in global state libraries like Redux or Zustand often leads to synchronization issues, complex caching logic, and "stale data" bugs.

## Decision
We adopt **TanStack Query (React Query) v5** as the single source of truth for all server-side data.

## Consequences
- **Consistency**: All features follow the same pattern (Query Keys, Service Functions, Custom Hooks).
- **Caching**: Built-in cache management, background refetching, and window focus tracking.
- **Optimistic Updates**: Standardized approach to providing high-perceived performance during mutations.
- **Separation of Concerns**: Global UI state (Zustand) is kept strictly for client-side ephemeral state (modals, menus, etc.).
