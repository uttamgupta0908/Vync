# ADR 003: Standardized API Boundaries & Proxying

## Status
Accepted

## Context
Directly calling backend APIs from the client leads to CORS issues, leaked security patterns, and inconsistent error handling. It also makes authentication (HttpOnly cookies) difficult to manage across different environments.

## Decision
All client-side communication must flow through **Next.js Route Proxies** (`/api/[feature]/...`). These proxies use a centralized `backendClient` to communicate with the actual Vync API.

## Consequences
- **Security**: HttpOnly cookies are swapped for Bearer tokens in a secure server-side environment.
- **Maintainability**: Centralized changes in proxy logic (e.g., adding a global header) affect all features.
- **Error Handling**: Standardized error mapping (`mapError`) occurs at the boundary, ensuring consistent UI feedback.
- **Performance**: Ability to implement server-side caching or response aggregation at the proxy level.
