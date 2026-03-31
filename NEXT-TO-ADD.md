# Next Features to Add

## High Priority
- [ ] Command palette (Cmd+K) -- `cmdk` library is already installed, shadcn `command.tsx` component exists. Restyle with terminal theme and wire up navigation/action commands.
- [ ] Keyboard navigation (j/k) -- scroll between sections with keyboard shortcuts for power-user feel.
- [ ] Update Supabase profile data -- the `/apply` route pulls from Supabase; update the `profiles` table with correct bio/tagline to match new site content.
- [ ] OG image -- create a terminal-themed OpenGraph image for social sharing (replace current `/og-image.png`).

## Medium Priority
- [ ] More LinkedIn recommendations -- add any additional recommendations as they come in.
- [ ] Resume/CV download -- add a `[download resume]` terminal command and button.
- [ ] Blog/writing links -- add actual URLs to the "All-In ML" book, RLHF course, and Attention course when published.
- [ ] GitHub stars live count -- fetch real star counts from GitHub API instead of hardcoded numbers.
- [ ] Analytics dashboard -- the Supabase `view_analytics` table exists; build a private dashboard to see who's viewing the site.

## Low Priority / Nice-to-Have
- [ ] PWA support -- offline functionality, installable as app.
- [ ] ASCII art name in Hero -- large Figlet-style ASCII art for "SHUBHANKAR" above the terminal.
- [ ] Scanline/CRT effect -- subtle CSS scanline animation for extra terminal flair (toggle-able).
- [ ] Easter eggs -- more interactive terminal commands (`matrix`, `fortune`, `cowsay`).
- [ ] Dark/light toggle -- currently dark-only by design, but could add a light "paper terminal" mode.
- [ ] Page transition animations -- smooth transitions between routes using Framer Motion `AnimatePresence`.
- [ ] Lighthouse optimization -- code-split the bundle (currently 608KB), lazy-load below-fold sections.

## Content Updates Needed
- [ ] Paloa Labs description -- add more detail about what Paloa Labs does once public.
- [ ] Zigsaw demo link -- add link to Zigsaw demo/product when available.
- [ ] Featured LinkedIn posts -- incorporate content from LinkedIn featured section.
- [ ] NeurIPS 2025 details -- add more about the poker night event and discussions.
