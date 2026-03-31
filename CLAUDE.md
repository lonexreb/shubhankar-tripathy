# Portfolio Website - Shubhankar Tripathy

## Tech Stack
- **Framework**: React 18 + Vite + TypeScript
- **Styling**: Tailwind CSS + shadcn-ui + Radix UI
- **Animation**: Framer Motion
- **Backend**: Supabase (profiles, job_applications, portfolio_content, tailored_presentations, view_analytics)
- **Routing**: React Router
- **Deployment**: GitHub Pages at `/shubhankar-tripathy/`

## Theme
Dark terminal aesthetic (Dracula Pro-inspired). JetBrains Mono primary font. No light mode.

## Key Design Patterns
- `TerminalWindow` component (`src/components/terminal/TerminalWindow.tsx`) wraps content in terminal-chrome panels
- `InteractiveTerminal` (`src/components/terminal/InteractiveTerminal.tsx`) provides a working CLI in the Hero section
- `useTypingAnimation` hook for character-by-character text reveals
- `useActiveSection` hook for IntersectionObserver-based nav highlighting
- CSS variables for all colors defined in `src/index.css` (terminal-green, terminal-cyan, terminal-purple, etc.)
- All section headers use terminal command syntax: `$ cat about.md`, `$ ls projects/`, etc.

## Project Structure
```
src/
  components/
    terminal/          # Terminal UI components (TerminalWindow, InteractiveTerminal)
    portfolio/         # Supabase-driven tailored presentation components
    ui/                # shadcn-ui components
    Hero.tsx           # Terminal boot animation + interactive CLI
    NavBar.tsx         # Terminal-style nav with ~/section paths
    About.tsx          # Bio, photos, identity cards
    Projects.tsx       # site2cli, tentalis, MCPstudio, Zigsaw
    Experience.tsx     # Git-log style timeline
    Community.tsx      # Hackathons table + community leadership
    Recommendations.tsx # LinkedIn recommendations
    Writing.tsx        # SAIL podcast, All-In ML book, courses
    Education.tsx      # Triple degree at UMass
    Contact.tsx        # Terminal-style contact list
    Footer.tsx         # Minimal footer
  hooks/
    useTypingAnimation.ts
    useActiveSection.ts
  pages/
    Index.tsx          # Main page orchestrator
    Apply.tsx          # Supabase-driven tailored portfolio (/apply?code=)
    NotFound.tsx       # Terminal-style 404
  integrations/supabase/  # Supabase client + types
public/
  images/              # Personal photos (ACM Awards, YC, Prof Bruno)
```

## Commands
- `npm run dev` -- start dev server
- `npm run build` -- production build
- `npm run preview` -- preview production build

## Content Rules
- All project data is hardcoded in components (not from Supabase) for the main site
- The `/apply` route pulls from Supabase dynamically
- Real URLs only -- no placeholder `#` links
- No Meta Superintelligence Labs references (incorrect, was removed)
- Photos in `public/images/` served from `/images/`

## Owner Info
- **Name**: Shubhankar Tripathy
- **GitHub**: lonexreb
- **Twitter**: @shubhtrips
- **LinkedIn**: /in/shubhankar-tripathy
- **Emails**: shubh@paloa.ai, shubhankar.tripathy.usa@gmail.com
- **Current roles**: Co-Founder & CTO of Paloa Labs Inc, Co-Founder & CEO of Zigsaw
