# AuraCare Health System — Home Page

Premium hospital homepage built with React + Vite + Tailwind CSS + Framer Motion,
based on the provided reference design.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Project structure

```
src/
├── components/       # Navbar, Button, SectionTitle, DoctorCard, SpecialityCard, StatCard
├── pages/
│   └── Home.jsx      # The entire homepage, organized in clearly commented sections
├── App.jsx           # Router shell — add future routes here
├── main.jsx
└── index.css          # CSS variable theme (colors) — edit these to reskin the whole site
```

## Theming

All colors live as CSS variables in `src/index.css` under `:root`, and are mapped to
Tailwind utility classes (`bg-primary`, `text-secondary`, etc.) in `tailwind.config.js`.
Change the hex values in one place to reskin the entire site.

## Notes

- Only the Home page (`/`) is implemented. `App.jsx` is already wired with React Router so
  additional pages (About, Doctors, Specialties, Appointment, Contact, etc.) can be added
  as new routes without touching `Home.jsx`.
- Doctor photos currently point to royalty-free Unsplash placeholder URLs — swap these for
  real photography before launch.
- This is a frontend-only build; no backend/API calls are wired up yet.
