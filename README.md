# 🌿 GesSain Portfolio

A modern, high-performance portfolio website built with **Next.js 16** and **React 19**, featuring a nature-inspired design system with light/dark mode support.

![Next.js](https://img.shields.io/badge/Next.js-16.1.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css)

## ✨ Features

- **🎨 Nature-Inspired Theme** — Serene forest greens & warm terracotta accents
- **🌗 Dark Mode** — System preference detection + manual toggle
- **⚡ Optimized Images** — AVIF/WebP with responsive sizing
- **📧 Contact Form** — Server-side email via Nodemailer + Zod validation
- **🎭 Smooth Animations** — Intersection Observer-driven fade-ins
- **📱 Fully Responsive** — Mobile-first design approach

## 🏗️ Project Structure

```
portfolio2026/
├── app/
│   ├── api/contact/       # Email API route
│   ├── components/        # Page sections (Header, Hero, Features, etc.)
│   ├── contexts/          # ThemeContext for dark mode
│   ├── globals.css        # Design tokens & animations
│   └── page.tsx           # Main page composition
├── components/ui/         # Reusable UI primitives
├── lib/
│   ├── data.tsx           # Portfolio content data
│   └── utils.ts           # Utility functions (cn helper)
└── public/images/         # Project screenshots
```

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## ⚙️ Environment Variables

Create a `.env` file with:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_TO=your-email@gmail.com
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Components | Radix UI (Dialog) |
| Icons | Lucide React |
| Validation | Zod |
| Email | Nodemailer |
| Language | TypeScript 5 |

## 📦 Performance Optimizations

- ✅ AVIF/WebP image formats with responsive device sizes
- ✅ Gzip compression enabled
- ✅ React Strict Mode for best practices
- ✅ Centralized CSS animations (no duplicate styles)
- ✅ Intersection Observer for lazy animations

## 📄 License

MIT © Gemuel Sampayan
