# Vync Design System & Theming

This document details the engineering principles and implementation of the Vync Design System, specifically focusing on the comprehensive **Dark Theme** implementation.

> **Design Philosophy**: We follow a "Semantic First" approach where colors are defined by their intent (e.g., `bg-background`, `text-primary`) rather than their raw values. This enables seamless theming without component-level changes.

## 🌙 Dark Theme Implementation

The "Dark Theme" is achieved by **swapping the palette values** in `globals.css` via CSS Variables and a `ThemeProvider`.

### Core Mechanism

1.  **CSS Variables**: All palette colors (e.g., `neutral-100`) are defined as CSS variables (`--neutral-100`).
2.  **Runtime Switching**: A `.dark` class on the root `<html>` element overrides these variables with dark mode values.
3.  **Tailwind Integration**: The `@theme` block maps Tailwind keys to these dynamic variables.

| Variable | Light Theme (Default) | Dark Theme (`.dark`) |
|---|---|---|
| `--neutral-100` | #FFFFFF (White) | #191015 (Black) |
| `--neutral-800` | #191015 (Black) | #FFFFFF (White) |
| `--neutral-400` | #F5F5F5 (Off-White) | #000000 (Deep Black) |

### 🌗 Theme Toggle

We use a React Context (`ThemeProvider`) to manage the theme state.

-   **Persistence**: Theme preference ('light' | 'dark' | 'system') is saved in `localStorage`.
-   **System Sync**: Defaults to 'system' to respect OS settings.
-   **Usage**: Wraps the entire app in `src/app/layout.tsx`.

#### How to use in components:

```tsx
import { useTheme } from '@/src/shared/lib/ThemeProvider';

export function MyComponent() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

### Color Palette

Our palette is divided into **Primitive Colors** (immutable) and **Semantic Colors** (themed).

#### 1. Primitive Palette (Immutable)
- **Primary**: Purple (`#8769FB`) - Brand accent.
- **Success**: Green (`#10B981`).
- **Error**: Red (`#C03403`).

#### 2. Semantic Layer (Themed)
Developers should **ALWAYS** use these semantic classes:

- `bg-neutral-100`: Main card backgrounds.
- `bg-neutral-400`: App background.
- `text-neutral-800`: Primary text.
- `border-neutral-300`: Standard borders.

## 🛠 Usage Guidelines

1.  **Think in Semantic Layers**: Use `neutral-100` for "Surface", not "White".
2.  **Avoid Hex Codes**: Hardcoded hex values like `#FFF` break dark mode.
3.  **Trust the system**: The variables handle the inversion automatically.

---

*Verified & Implemented by Antigravity Engineering*
