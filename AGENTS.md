# AGENTS.md

This is a Next.js 16 App Router project with React 19. Key differences from Next.js 13-15:
- No more experimental turbopack flag; it is stable and on by default
- Server Actions use "use server" directive, not the old experimental flag
- Metadata API: use generateMetadata() or the metadata export, not next/head
- Images: next/image is required; no raw <img> tags (lint rule enforced)
- Fonts: use next/font, not Google Fonts link tags
- Client components that use hooks or browser APIs must have "use client" at the top
- Do NOT read node_modules for docs — follow CLAUDE.md conventions instead
