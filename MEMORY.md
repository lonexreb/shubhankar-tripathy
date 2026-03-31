# Project Memory

## Design Decisions
- **Dark-only theme**: Dracula Pro palette. No light mode toggle. Terminal aesthetic only works in dark.
- **No stock images**: Removed all Unsplash placeholders. Only real personal photos.
- **No skill percentage bars**: Removed Skills.tsx entirely. Founder-level profiles don't need "Python 95%".
- **Interactive terminal in Hero**: Boot animation plays first, then visitors get a real CLI with `help`, `goto`, `open`, `sudo hire shubhankar`, etc.
- **Git-log style experience**: Each job entry looks like a git commit with hash, timestamp, and bullet points.
- **Terminal command section headers**: Every section starts with `$ cat about.md` or `$ ls projects/` style headers.

## Content Sources
- **Projects**: Hardcoded from GitHub repos (lonexreb/site2cli, lonexreb/tentalis, lonexreb/MCPstudio)
- **Recommendations**: Transcribed from LinkedIn screenshots (Prof. Bruno Castro Da Silva, Tim Lee, Abhinav Kommalapati, Luis Sanchez)
- **Photos**: Personal photos in `public/images/` (ACM Awards, Y Combinator, with Prof Bruno)
- **SAIL Podcast**: YouTube link https://www.youtube.com/watch?v=WjWTxeL8-4M ("Can Multi-Agent RL Solve the Stock Market?")

## Corrections Made
- **Meta Superintelligence Labs**: Was incorrectly added based on web research. User confirmed they never worked there. All references removed (2026-03-31).
- **Blog section**: Replaced with Writing section (SAIL podcast, All-In ML book, RLHF course, Attention course).
- **Skills section**: Deleted entirely. Anti-pattern for founder profiles.

## Key People Referenced
- **Prof. Bruno Castro Da Silva**: Assistant Professor, Autonomous Learning Lab, UMass Amherst. PhD advised by Andrew Barto (RL pioneer). Shubhankar's teacher.
- **Tim Lee**: Senior Data & AI Leader at Dell. Managed Shubhankar during internship.
- **Luis Sanchez**: Founding Engineer at Cloud Cruise (YC W24). Hackathon teammate.
- **Abhinav Kommalapati**: AI & SWE Intern @ DynaPrice. Mentored by Shubhankar.
- **Joshua Starmer**: Founder of StatQuest. Co-authoring "All-In ML" book with Shubhankar.
