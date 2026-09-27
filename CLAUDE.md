# CLAUDE.md — Project Conventions

## Stack
- Next.js 16 App Router (no Pages Router)
- React 19 with Server Components by default
- TypeScript strict mode
- Tailwind CSS v4 with tw-animate-css
- shadcn/ui (components.json present)
- Framer Motion 12 for animations
- GSAP 3 for scroll-triggered effects
- Lenis for smooth scroll
- Three.js + @react-three/fiber + @react-three/drei for 3D

## File structure
src/app/          — pages and layouts (App Router)
src/components/   — reusable components
src/components/ui/— shadcn components (do not hand-edit)
src/lib/          — utilities, constants, types
public/           — static assets

## Rules
- All 3D components must be in a Client Component ("use client")
- Wrap R3F Canvas in Suspense with a fallback
- Counter animations: use useEffect + IntersectionObserver, NOT useLayoutEffect (SSR will break)
- Contact form: route to src/app/api/contact/route.ts, POST to Resend or Nodemailer
- Never import from @base-ui/react — use shadcn primitives
- Framer Motion: use motion.div, not deprecated motion() factory
- GSAP ScrollTrigger: register in useEffect, kill on cleanup
