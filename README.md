# Artistly.com

A professional, accessible, and mobile-responsive demo for a fictional Performing Artist Booking Platform. Built with Next.js 13+ (App Router), TypeScript, Tailwind CSS, and ShadCN UI Kit, this project demonstrates best practices in modular React architecture, UI consistency, and modern data fetching.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Folder Structure](#folder-structure)
- [Data Fetching: App Router vs. Pages Router](#data-fetching-app-router-vs-pages-router)
- [Theming & Accessibility](#theming--accessibility)
- [Key Features](#key-features)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Possible Improvements](#possible-improvements)
- [Code Comments & Documentation](#code-comments--documentation)
- [Authentication Guard Behavior](#authentication-guard-behavior)

---

## Project Overview
Artistly.com is a demo platform for discovering, shortlisting, and booking performing artists. It showcases:
- Modern Next.js 13+ App Router usage (React Server Components, fetch-based data loading)
- A demo of legacy Pages Router with `getStaticProps` for educational comparison
- Consistent, accessible UI with dark/light mode and responsive layouts
- Modular, maintainable code with clear separation of concerns
- Robust error handling and user feedback for failed actions (e.g., image upload, invalid form)

## Tech Stack
- **Next.js 13+** (App Router, TypeScript)
- **Tailwind CSS** (utility-first styling)
- **ShadCN UI Kit** (accessible, customizable UI components)
- **React Hook Form / Formik + Yup** (form management & validation)
- **Local JSON** for artist data (no backend)

## Architecture
- **App Router** (`src/app/...`): Main application, uses React Server Components and fetch for data loading. All new features/pages are built here.
- **Pages Router** (`pages/artists-shortlist.tsx`): Demo page using `getStaticProps` to illustrate static generation and legacy data fetching.
- **Context Providers**: Auth, Submission, and Toast contexts for state management and notifications, shared across all pages.
- **Theming**: Dark/light mode toggle, system preference detection, and consistent font usage.

## Folder Structure
```
artistly/
├── src/
│   ├── app/                # App Router pages & layouts
│   ├── components/         # Reusable UI and feature components
│   ├── context/            # React context providers (auth, submission, etc.)
│   ├── data/               # Local JSON data
│   ├── lib/                # Utility functions
│   └── ...
├── pages/                  # Pages Router (legacy/demo)
├── public/                 # Static assets & JSON data
├── styles/                 # Global styles (if any)
├── README.md
└── ...
```

## Data Fetching: App Router vs. Pages Router
- **App Router**: Uses `fetch` and async server components for data loading. `getStaticProps`/`getServerSideProps` are not available. See comments in `src/app/page.tsx` and other app pages.
- **Pages Router**: `/artists-shortlist` uses `getStaticProps` to statically generate the page at build time from local JSON. See comments in `pages/artists-shortlist.tsx`.

## Theming & Accessibility
- **Dark/Light Mode**: Toggle in the UI, system preference detection, and consistent color usage across all pages (including demo page).
- **Accessibility**: Semantic HTML, keyboard navigation, ARIA labels, and color contrast are prioritized throughout.

## Key Features
- Homepage with artist categories and navigation
- Artist listing with advanced filtering
- Artist onboarding form with validation, local image preview, and robust error handling for failed uploads/invalid input
- Manager dashboard for artist submissions (local state only)
- Authentication for onboarding and dashboard
- Responsive, accessible, and modular UI
- Toast notifications for user feedback and error states
- Demo page for static generation (`/artists-shortlist`)

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Deployment
- Deployed on Vercel. Share the live preview link and temporary credentials for code review if needed.

## Contributing
- Fork the repo and create a feature branch.
- Follow the established folder structure and code style.
- Add comments to all new files and functions explaining their purpose and usage.
- Ensure all UI is accessible and responsive.
- Submit a pull request with a clear description of your changes.

## Possible Improvements
- **More Robust Error Handling**: While the UI is robust, you could add more user feedback for failed actions (e.g., failed image upload, invalid form, etc.).

## Code Comments & Documentation
- All main files and functions are thoroughly commented to explain their purpose, logic, and usage.
- Comments clarify architectural choices, data fetching methods, and UI/UX decisions.
- This ensures the project is easy to understand, maintain, and extend for any developer.

## Authentication Guard Behavior

- The `/login` page uses an authentication guard: if a user is already logged in (determined by the `isAuthenticated` value from `AuthContext`), they are immediately redirected to `/dashboard` and cannot access the login form.
- This is implemented using a `useEffect` in `src/app/login/page.tsx`:
  ```tsx
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);
  ```
- This ensures a secure and user-friendly experience, preventing logged-in users from seeing or using the login form.
- See code comments in `src/app/login/page.tsx` for further details.

---

> This project is for demo/assignment purposes only. No backend or persistent storage is used. For questions, contact the maintainer.
