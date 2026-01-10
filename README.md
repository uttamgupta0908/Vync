# Vync - Modern Social Media Dashboard

A beautiful, feature-rich social media dashboard built with Next.js, featuring a clean UI, real-time interactions, and responsive design.

![Vync Dashboard](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **Modern UI/UX**: Clean, premium design with smooth animations and transitions
- **Dark Mode**: Production-ready dark theme with semantic color system
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Component Architecture**: Modular, reusable components organized by feature
- **Type-Safe**: Built with TypeScript for better developer experience
- **Optimized Performance**: Leverages Next.js 15 features including React Compiler

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Vync
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
Vync/
├── src/
│   ├── app/                 # Next.js app directory (Routes)
│   ├── features/            # Feature-based architecture
│   │   ├── auth/            # Authentication & User management
│   │   ├── feed/            # Feed, Posts, & Interactions
│   │   ├── communities/     # Community features
│   │   └── ...
│   ├── shared/              # Shared resources
│   │   ├── ui/              # Reusable atoms (Avatar, Buttons, Inputs)
│   │   ├── layout/          # Layout components (Sidebar, Header)
│   │   ├── styles/          # Global styles & Theme definitions
│   │   └── lib/             # Providers & Configuration
│   └── utils/               # Helper functions
```

## 🎨 Design System

> **[View Theming Documentation](THEMING.md)** for detailed usage guides.

### Colors
- **Primary**: Purple (`#8B5CF6`)
- **Secondary**: Indigo (`#7C3AED`)
- **Accent Colors**: Orange, Green, Pink gradients

### Components
- **Avatar**: Reusable avatar component with customizable sizes
- **IconButton**: Consistent icon buttons with hover effects
- **PostCard**: Feature-rich post display with interactions
- **Sidebars**: Contextual navigation and content discovery

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter) via next/font

## 📱 Features Breakdown

### Home Page
- User profile card with stats
- Trending communities
- Post feed with interactions
- Suggested users and live rooms

### Post Details
- Full post view with media
- Comment section
- Reply functionality
- Navigation sidebar

### Responsive Design
- Desktop: Full sidebar navigation
- Mobile: Bottom navigation bar
- Adaptive layouts for all screen sizes

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=<your-repo-url>)

### Build for Production

```bash
npm run build
npm start
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Next.js