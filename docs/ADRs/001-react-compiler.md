# ADR 001: Automated Memoization via React 19 Compiler

## Status
Accepted

## Context
Traditional React optimization relies on manual memoization using `useMemo` and `useCallback`. This is error-prone, leads to "memoization hell," and increases maintenance overhead.

## Decision
We leverage the **React 19 Compiler** (`babel-plugin-react-compiler`) enabled in `next.config.ts`. 

## Consequences
- **Developer Experience**: We no longer need to manually wrap functions or values in `useMemo`/`useCallback`.
- **Performance**: The compiler automatically optimizes re-renders by analyzing the dependency graph during build time.
- **Code Cleanliness**: Reduced boilerplate in hooks and components.
- **Constraint**: Components must adhere to React's "Rules of Hooks" strictly for the compiler to work correctly.
