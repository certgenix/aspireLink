# AspireLink - Mentorship Platform

## Overview
AspireLink is a full-stack web application designed to facilitate a 4-month mentorship program connecting students with experienced professionals. The platform's primary goal is to link ambition with experience through a structured, volunteer-based program. Key functionalities include comprehensive registration for students and mentors, an administrative dashboard for program management, and robust user management. The project aims to empower the next generation by offering accessible, high-quality mentorship opportunities.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
- **Framework & Libraries**: React 18 with TypeScript, utilizing shadcn/ui built on Radix UI for components.
- **Styling**: Tailwind CSS with custom design tokens for responsive, mobile-first design.
- **Theming**: Dark mode support via CSS variables, custom color palette with distinct gradients for hero sections across various pages (e.g., About, Contact, FAQ) for consistent branding.
- **Iconography**: Lucide React icons (e.g., FileText, UserCheck, Calendar, Award) with solid colored backgrounds for process steps and features.
- **Branding**: Custom AspireLink logo and favicon, professional imagery, and accurate program messaging.
- **Accessibility**: Focus on high-contrast text (charcoal color), WCAG 2.1 Level AA compliance, semantic HTML, and keyboard navigation.
- **Animations**: Global hover animations (hover-lift, hover-scale, hover-glow, card-hover) and keyframe animations (fadeInUp, fadeIn, slideInLeft, pulse-soft) for smooth interactions.
- **Data Visualization**: Professional charts using recharts (AreaChart, PieChart, BarChart, RadialBarChart) with simple stat cards for dashboard experiences.
- **Dashboard Design**: Minimal layouts for student and mentor dashboards, including stat cards, session overviews, and profile update buttons.
- **Session Management**: Mentors can schedule, reschedule, and mark sessions as completed, with cohort selection for multi-cohort students.

### Technical Implementations
- **Frontend**: Vite for development, Wouter for client-side routing, TanStack React Query for server state management.
- **Backend**: Node.js with Express.js, TypeScript with ESM modules, RESTful API design.
- **Database**: Firebase Firestore for all data storage.
- **Validation**: Zod for type-safe data handling and form validation.
- **Storage**: FirestoreStorage with auto-increment counters for numeric IDs.
- **Authentication**: Firebase Authentication for users, hardcoded credentials for Admin login.
- **Session Management**: Memory-based session store.
- **Registration-First Flow**: Users register without prior account creation; registration data stored in `studentRegistration` or `mentorRegistration` collections. Upon signup/signin, existing registrations are linked to accounts, assigning appropriate roles. Users without prior registration are redirected to complete their profile. Global `RoleGuard` protects access. Supports Google Sign-In with auto-linking and email pre-fill.

### System Design Choices
- **Development Environment**: Vite dev server (frontend), tsx (backend), in-memory storage.
- **Production Environment**: Optimized frontend bundle, bundled backend code, single Node.js process.
- **Scalability**: Stateless backend, database connection pooling, CDN-ready assets.
- **Modularity**: Shared schema, abstract storage layer, component-based UI.

### App Flow Summary
- **User Journeys**: Structured paths for Students (register, sign up, dashboard), Mentors (register, sign up, dashboard), and Admins (sign in, dashboard management).
- **Pages Overview**:
    - **Public**: Home, About, Students, Mentors, FAQ, Contact.
    - **Registration**: Student & Mentor application forms.
    - **Auth**: Sign In, Sign Up, Complete Profile.
    - **Dashboard**: Student, Mentor, Admin dashboards; Admin Cohorts, Create Student/Mentor/Assignment.
    - **Policy**: Privacy, Terms, Conduct, Accessibility.
- **Firestore Collections**:
    - **Active**: `users`, `studentRegistration`, `mentorRegistration`, `cohorts`, `assignments`, `mentoringSessions`, `contacts`, `counters`.
    - **Orphaned (can be deleted)**: `adminUsers`, `mentorRegistrations` (plural), `cohortMembers`.

### Feature Specifications
- **Mentorship Program**: 4-month, free, 1:1 matching, 24/7 support.
- **Registration**: Multi-step forms for students (personal, academic, preferences, consent) and mentors (professional, preferences, availability), with comprehensive validation.
- **Admin Dashboard**: Overview stats, search/filter, activate/deactivate, delete records, bulk assignment management.
- **Legal & Policy**: Dedicated pages for Privacy Policy, Terms of Service, Code of Conduct, and Accessibility.
- **Contact Management**: Contact form submission handling and clear contact information.

## External Dependencies

-   **React Ecosystem**: React, React DOM, React Query.
-   **UI Libraries**: Radix UI primitives, shadcn/ui, Lucide React icons.
-   **Styling**: Tailwind CSS, class-variance-authority.
-   **Backend**: Express.js, Firebase Admin SDK.
-   **Firebase**: firebase, firebase-admin (authentication and Firestore).
-   **Validation**: Zod.
-   **Utilities**: date-fns, clsx.
-   **Build Tools**: Vite, esbuild, tsx.
-   **Language**: TypeScript.