# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

React + Vite portfolio website generated from Figma. Single-page application with section-based layout using Japanese typography (Noto Sans JP).

Original design: https://www.figma.com/design/pD3ZnHIt3PVZDpO0Wc0r3r/Portfolio-Website-Design

## Commands

```bash
npm i           # Install dependencies
npm run dev     # Start dev server with HMR
npm run build   # Build for production (outputs to dist/)
```

No test or lint scripts are configured.

## Architecture

**Entry**: `src/main.tsx` → `src/app/App.tsx`

**Page sections** (in `src/app/components/`): Hero, About, Services, Works, Skills, WhyMe, Contact, Footer - composed sequentially in App.tsx

**UI components**: `src/app/components/ui/` contains shadcn/ui components built on Radix UI primitives

**Styles**: `src/styles/` - Tailwind CSS v4, CSS variables for theming

**Path alias**: `@` → `./src` (configured in vite.config.ts)
