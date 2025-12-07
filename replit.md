<<<<<<< .mine
# AspireLink - Mentorship Platform

## Overview
AspireLink is a full-stack web application facilitating a 4-month mentorship program between students and experienced professionals. The platform's core purpose is to connect ambition with experience, offering a structured program that is entirely volunteer-based. Key capabilities include comprehensive student and mentor registration, an admin dashboard for managing the mentorship program, and robust user management. The vision is to empower the next generation by providing accessible, high-quality mentorship.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### UI/UX Decisions
- **Framework**: React 18 with TypeScript.
- **UI Components**: shadcn/ui library built on Radix UI primitives.
- **Styling**: Tailwind CSS with custom design tokens, responsive and mobile-first.
- **Theming**: Dark mode support via CSS variables, custom color palette with distinct gradients for hero sections across pages (e.g., About, Contact, FAQ) for visual consistency and branding.
- **Iconography**: Use of Lucide React icons (e.g., FileText, UserCheck, Calendar, Award) with solid colored backgrounds for process steps and features, replacing previous emoji or numbered circles for better consistency and readability.
- **Branding**: Custom AspireLink logo and favicon, consistent professional imagery, and accurate program messaging across the site.
- **Accessibility**: Focus on high-contrast text (charcoal color for all text), WCAG 2.1 Level AA compliance, semantic HTML, and keyboard navigation support.
- **Animations**: Global hover animations (hover-lift, hover-scale, hover-glow, card-hover) and keyframe animations (fadeInUp, fadeIn, slideInLeft, pulse-soft) for smooth, polished interactions throughout the app.
- **Data Visualization**: Professional charts using recharts library (AreaChart, PieChart, BarChart, RadialBarChart) with simple stat cards for dashboard experiences.
- **Color Theme**: Blue-based accent color scheme (hsl 202) for better contrast and theme consistency across light/dark modes.
- **Dashboard Design**: Consistent minimal layouts for both student and mentor dashboards with simple stat cards, sessions overview bar chart, two-column grids, and "Edit Application" buttons for profile updates.
- **Session Management**: Mentors can schedule, reschedule, and mark sessions as completed. When scheduling sessions with students in multiple cohorts, mentors can select which cohort to assign the session to. Completed sessions are tracked across admin and student dashboards.

### Technical Implementations
- **Frontend**: Vite for fast development and optimized builds, Wouter for client-side routing, TanStack React Query for server state management.
- **Backend**: Node.js with Express.js, TypeScript with ESM modules, RESTful API design with JSON responses.
- **Database**: Firebase Firestore for all data storage (migrated from PostgreSQL). No SQL database required.
- **Validation**: Zod for type-safe data handling and robust form validation (e.g., email format, mandatory fields for registration).
- **Storage**: FirestoreStorage implementation with auto-increment counters for numeric IDs.
- **Authentication**: Firebase Authentication for user management, Admin login with hardcoded credentials for program management.
- **Session Management**: Memory-based session store (sessions expire on server restart).
- **Registration-First Flow**: 
    - Users fill out student or mentor registration forms WITHOUT needing to create an account first.
    - Registration data is stored in separate Firestore collections: `studentRegistration` and `mentorRegistration`.
    - After form submission, success page shows "Sign Up Now" and "Login" buttons (NOT "Go to Dashboard").
    - On signup/signin, the system checks for existing registrations matching the user's email.
    - If a matching registration is found, it's automatically linked to the new account and the user is assigned the appropriate role.
    - Users who sign up without a prior registration are redirected to `/complete-profile` to choose their role and fill out the appropriate form.
    - A global RoleGuard ensures users without roles cannot access protected areas of the app.
    - **Google Sign-In**: Both SignUp and SignIn pages support Google authentication with the same auto-linking logic.
    - **Email Pre-fill**: Registration success pages pass the email to signup page for convenience.

## App Flow Summary

### User Journeys

**Student Journey:**
1. Visit `/students` page to learn about the program
2. Click "Apply as Student" to go to `/register-student`
3. Fill out the 3-step registration form (Personal Info, Academic Details, Preferences)
4. After submission, prompted to create account at `/signup`
5. After signup, automatically assigned "student" role and redirected to `/dashboard/student`

**Mentor Journey:**
1. Visit `/mentors` page to learn about becoming a mentor
2. Click "Become a Mentor" to go to `/register-mentor`
3. Fill out the 2-step registration form (Professional Info, Mentorship Preferences)
4. After submission, prompted to create account at `/signup`
5. After signup, automatically assigned "mentor" role and redirected to `/dashboard/mentor`

**Admin Journey:**
1. Sign in at `/signin` with admin credentials
2. Access `/admin/dashboard` to manage the platform
3. Can create cohorts, assign mentors to students, view all registrations

### Pages Overview

**Public Pages (no login required):**
- `/` - Home page with program overview
- `/about` - About AspireLink
- `/students` - Information for prospective students
- `/mentors` - Information for prospective mentors
- `/faq` - Frequently asked questions
- `/contact` - Contact information

**Registration Pages (no login required):**
- `/register-student` - Student application form
- `/register-mentor` - Mentor application form

**Auth Pages:**
- `/signin` - Login for existing users
- `/signup` - Create new account
- `/complete-profile` - For users who signed up without registering first

**Dashboard Pages (login required):**
- `/dashboard/student` - Student dashboard
- `/dashboard/mentor` - Mentor dashboard
- `/admin/dashboard` - Admin dashboard
- `/admin/cohorts` - Cohort management
- `/admin/create-student` - Create student manually
- `/admin/create-mentor` - Create mentor manually
- `/admin/create-assignment` - Assign mentor to student

**Policy Pages:**
- `/privacy` - Privacy policy
- `/terms` - Terms of service
- `/conduct` - Code of conduct
- `/accessibility` - Accessibility statement
    
### Firestore Collections

**Active Collections (used by the app):**
- **users**: Stores user accounts with linked profile data and roles (student/mentor/admin).
- **studentRegistration**: Pending student applications with status tracking (pending/linked).
- **mentorRegistration**: Pending mentor applications with status tracking (pending/linked).
- **cohorts**: Mentorship cohort data.
- **assignments**: Mentor-student pairings within cohorts. Cohort membership is derived from assignments.
- **mentoringSessions**: Scheduled sessions between mentors and students.
- **contacts**: Contact form submissions.
- **counters**: Auto-increment ID counters for numeric IDs.

**Orphaned Collections (CAN BE DELETED from Firebase Console):**
- **adminUsers**: Not used in code - admins are stored in `users` with `role: 'admin'`
- **mentorRegistrations** (with 's'): Duplicate collection name - app uses `mentorRegistration` (no 's')
- **cohortMembers**: No longer needed - membership is now derived from assignments automatically

### Feature Specifications
- **Mentorship Program**: Structured 4-month program, 100% free, 1:1 matching, 24/7 support.
- **Registration**:
    - **Student Registration**: Multi-step form for basic information, nomination verification, mentorship matching preferences (academic disciplines, career interests, mentoring topics, goals), and consent. Includes mandatory fields (Full Name, Email, LinkedIn URL, Phone Number, University, Academic Program, Year of Study) and email format validation.
    - **Mentor Registration**: Multi-step form for professional data entry including mandatory fields (Full Name, Current Job Title, Company, Location, Phone Number, LinkedIn URL), preferred student disciplines, mentoring topics, and availability.
- **Admin Dashboard**: Comprehensive system for managing students, mentors, and assignments. Includes overview statistics, search/filter capabilities, activate/deactivate, delete records, and bulk assignment management.
- **Legal & Policy**: Dedicated pages for Privacy Policy, Terms of Service, Code of Conduct, and Accessibility, with clear guidelines and footer links.
- **Contact Management**: Contact form submission handling (for legacy system) and clear contact information for AspireLink (email, LinkedIn).

### System Design Choices
- **Development Environment**: Vite dev server for frontend with HMR, tsx for backend, in-memory storage for rapid development.
- **Production Environment**: Optimized frontend bundle, bundled backend code, single Node.js process serving API and static files.
- **Scalability**: Stateless backend design, database connection pooling, CDN-ready static assets.
- **Modularity**: Shared schema, abstract storage layer, component-based UI.

## External Dependencies

-   **React Ecosystem**: React, React DOM, React Query.
-   **UI Libraries**: Radix UI primitives, shadcn/ui, Lucide React icons.
-   **Styling**: Tailwind CSS, class-variance-authority.
-   **Backend**: Express.js, Firebase Admin SDK.
-   **Firebase**: firebase, firebase-admin (for authentication and Firestore database).
-   **Validation**: Zod.
-   **Utilities**: date-fns, clsx.
-   **Build Tools**: Vite, esbuild, tsx.
-   **Language**: TypeScript.


























=======
# AspireLink - Mentorship Platform

## Overview

AspireLink is a full-stack web application that connects students with experienced professionals through a structured 4-month mentorship program. The platform features a modern React frontend with TypeScript, Express.js backend, and is designed for easy deployment with both development and production environments.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack React Query for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API**: RESTful API design with JSON responses
- **Middleware**: Request logging, JSON parsing, and error handling
- **Storage**: Pluggable storage interface with in-memory implementation

### Database Strategy
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema**: Centralized schema definitions in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for database migrations
- **Connection**: Neon Database serverless PostgreSQL (via environment variable)

## Key Components

### Shared Schema (`/shared/schema.ts`)
- User management with username/password authentication
- Contact form submissions with timestamps
- Zod validation schemas for type-safe data handling
- Drizzle table definitions for PostgreSQL

### Storage Layer (`/server/storage.ts`)
- Abstract `IStorage` interface for data operations
- `MemStorage` implementation for development/testing
- CRUD operations for users and contacts
- Designed for easy swapping to database-backed storage

### Frontend Pages
- **Home**: Landing page with hero section and feature highlights
- **About**: Company information and mission statement
- **For Students**: Student application information and eligibility
- **For Mentors**: Mentor recruitment and benefits
- **FAQ**: Frequently asked questions with collapsible sections
- **Contact**: Contact form with validation and submission handling

### UI System
- shadcn/ui components for consistent design
- Custom color palette with primary, secondary, and accent colors
- Responsive design with mobile-first approach
- Dark mode support through CSS variables

## Data Flow

### Contact Form Submission
1. User fills out contact form on frontend
2. Form data validated using Zod schema
3. POST request to `/api/contact` endpoint
4. Server validates data and stores via storage interface
5. Success/error response sent back to client
6. Toast notification displayed to user

### Page Navigation
1. User clicks navigation links
2. Wouter handles client-side routing
3. Components render with React Query for data fetching
4. UI updates without full page reload

## External Dependencies

### Production Dependencies
- **React Ecosystem**: React, React DOM, React Query
- **UI Libraries**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **Backend**: Express.js, Drizzle ORM, Neon Database client
- **Validation**: Zod for runtime type checking
- **Utilities**: date-fns, clsx for conditional classes

### Development Dependencies
- **Build Tools**: Vite, esbuild for production builds
- **TypeScript**: Full TypeScript support across stack
- **Development**: tsx for running TypeScript directly

## Deployment Strategy

### Development Environment
- Vite dev server for frontend with HMR
- tsx for running TypeScript backend directly
- In-memory storage for rapid development
- Replit-specific plugins for enhanced development experience

### Production Build
1. Vite builds optimized frontend bundle to `/dist/public`
2. esbuild bundles backend code to `/dist/index.js`
3. Single Node.js process serves both API and static files
4. Environment variables configure database connection

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required for production)
- `NODE_ENV`: Environment mode (development/production)

### Scaling Considerations
- Stateless backend design allows horizontal scaling
- Database connection pooling through Neon serverless
- CDN-ready static asset generation
- Session storage can be moved to external store (Redis/PostgreSQL)

## Changelog

Changelog:
- June 29, 2025. Initial setup
- June 29, 2025. Fixed UI/UX issues: improved button hover states, updated hero image to professional business meeting, enhanced For Students page readability with white text on colored backgrounds, replaced testimonials with program features, improved footer text contrast using inline styles with white color, fixed "Become a Mentor" button hover text disappearing issue using JavaScript event handlers
- June 29, 2025. Comprehensive text contrast improvements: replaced all gray text with high-contrast charcoal color (#2F3E46) across all pages, fixed "Learn More" buttons on For Students and For Mentors pages with proper contrast using inline styles and event handlers, corrected "Follow Us" button on FAQ page for optimal visibility
- June 29, 2025. Enhanced FAQ page with orange gradient hero background (#F18F01 to #c47301) and white text for visual consistency with other pages
- June 29, 2025. Added gradient hero backgrounds to About page (blue #2E86AB to #1e5b7a) and Contact page (magenta #A23B72 to #7d2d5a) with white text for complete visual consistency across all pages
- June 29, 2025. Made each page hero banner unique: About page updated to purple gradient (#6366f1 to #4338ca), Contact page changed to green gradient (#10b981 to #047857) ensuring all six pages have distinct color schemes
- June 29, 2025. Added navigation functionality to application buttons: "Apply Now", "Start Application", "Become a Mentor", and "Apply to Mentor" buttons now direct users to Contact page for program inquiries
- June 29, 2025. Updated About page statistics to show accurate program features (4-month duration, 100% free, 1:1 matching, 24/7 support) instead of unverified performance metrics
- June 29, 2025. Removed contact form from Contact page, simplified to show only direct contact information (info@aspirelink.org and LinkedIn @AspireLinkOrg) with clean professional layout
- June 29, 2025. Updated Home page hero image to custom AspireLink branded graphic with handshake logo on graduation cap and "Connecting ambition with experience" tagline
- June 29, 2025. Added semi-transparent white background to 'Connect. Learn. Aspire.' hero panel for better contrast with branded image
- June 29, 2025. Restructured hero section with equal-sized panels in parent container: text panel with blue gradient background, image panel with gray gradient background, both contained within semi-transparent white parent panel
- June 29, 2025. Removed 'Mentor Impact' section from For Mentors page since no mentor impact data exists yet for founding cohort
- June 30, 2025. Added comprehensive Mentor Registration feature at /register-mentor route with manual professional data entry, database schema, API endpoints, and multi-step form ensuring data integrity by collecting authentic user information. Form validated and working with PostgreSQL storage.
- June 30, 2025. Updated all mentor application buttons to link to registration form: "Become a Mentor" buttons on Home page (both hero and CTA sections) and For Mentors page, plus "Apply to Mentor" button on For Mentors page now direct users to /register-mentor route for streamlined registration process.
- June 30, 2025. Added comprehensive Student Registration feature at /register-student route with 4-step multi-step form: Basic Information (name, email, university, academic program, year of study), Nomination Verification (professor name and email), Mentorship Matching preferences (career interests, industry preferences, topics, goals), and Consent & Confirmation. Includes database schema, API endpoints, form validation, and navigation updates linking all student application buttons.
- June 30, 2025. Enhanced student registration with confirmation screen displaying success message and next steps after form submission. Updated Home page "Apply as Student" button to link directly to registration form. Removed "Register as Mentor" button from navigation header to streamline user experience.
- June 30, 2025. Simplified student registration form validation to require only Full Name and Email address fields. All other fields (university, academic program, year of study, professor nomination) are now optional. Updated University name placeholder text to "Name of University" and removed contact support button from confirmation screen.
- June 30, 2025. Updated student registration form validation: Step 1 requires only Full Name and Email, Steps 2-3 require all fields (professor nomination, career interests, industry preferences, mentoring topics, mentorship goals). Added FAQ button to registration success screen alongside Return to Home button.
- June 30, 2025. Removed contact support button from all steps of student registration form to streamline the user experience and reduce unnecessary navigation away from the registration process.
- June 30, 2025. Added email format validation to all email address fields in student registration form. Both student email and professor email fields now validate proper email format using regex pattern before allowing form progression.
- June 30, 2025. Added optional LinkedIn URL field to mentor registration form step 1. Field includes URL input type and helpful placeholder text to assist with professional profile verification.
- June 30, 2025. Updated mentor registration form validation: Made Current Job Title field mandatory in step 1, changed location placeholder to "City, Province", and made agreement and consent checkboxes mandatory in step 2 with proper validation error messages.
- June 30, 2025. Enhanced mentor registration step 2 validation: Made "Preferred Student Disciplines" and "Mentoring Topics" fields mandatory with selection validation and updated field labels and descriptions to reflect required status.
- June 30, 2025. Made "Availability" field mandatory in mentor registration step 2 with validation requiring at least one time slot selection and updated field label and description to reflect required status.
- June 30, 2025. Updated student registration form for better mentor matching: replaced "Preferred Mentor Industry" with "Academic Disciplines" field matching mentor registration structure, converted "Mentoring Topics" from textarea to selection interface matching mentor options, updated database schema to use arrays for both fields enabling precise mentor-student matching based on shared disciplines and topics.
- June 30, 2025. Created comprehensive admin dashboard system: implemented admin login page with hardcoded credentials (program.admin@aspirelink.org / @sp1reLink), built admin dashboard with overview statistics, student/mentor management with search/filter capabilities, activate/deactivate functionality, delete records, and assignment management. Added admin routes to backend with authentication and CRUD operations for managing the mentorship program.
- June 30, 2025. Implemented full admin creation and editing functionality: added Create Student, Create Mentor, and Create Assignment forms with comprehensive field validation, built Edit Student and Edit Mentor pages with full CRUD operations, connected all admin dashboard buttons to functional routes, added backend API endpoints for individual record fetching and updating, completed storage layer with update/delete methods for both DatabaseStorage and MemStorage implementations.
- June 30, 2025. Enhanced UI/UX across platform: replaced empty colored circles with relevant icons (FileText, UserCheck, Users, Trophy, Calendar, Target) on For Students and For Mentors process steps, removed all "AI-powered" references replacing with "Smart matching" for more accurate representation, updated admin login to use generic placeholder text instead of revealing credentials.
- June 30, 2025. Created comprehensive legal and policy framework: added Privacy Policy page with data collection/usage guidelines, Terms of Service with participant responsibilities and program rules, Code of Conduct with professional standards and reporting procedures, Accessibility page with WCAG compliance and accommodation details. All pages include proper routing and footer links for easy access.
- June 30, 2025. Implemented advanced bulk assignment management: added multi-select checkboxes for individual assignments, "Select All" functionality, bulk delete operations with confirmation dialogs, bulk activate/deactivate buttons, clean bulk actions interface with selection counts, and backend API endpoint for efficient bulk operations.
- June 29, 2025. Integrated custom AspireLink logo (handshake design) into navigation header and updated favicon, added SEO meta tags with proper title and description
- June 29, 2025. Added professional student collaboration image to For Students page with accurate founding cohort messaging instead of false success statistics
- July 1, 2025. Fixed all icon display issues on Home page by replacing problematic lucide-react imports with emoji characters: process steps now show 📄 (nomination), 👥 (matching), 📅 (sessions), 🏆 (recognition), and features show 🎯 (personalized matching), 📈 (structured program), 🌟 (industry networks)
- July 1, 2025. Corrected FAQ answer about program funding to accurately reflect that AspireLink is entirely volunteer-based, not funded by university partnerships or sponsors
- July 1, 2025. Cleaned up contact information across all policy pages: removed fictional Toronto addresses from Privacy Policy, Terms of Service, and Accessibility pages; removed phone numbers from Code of Conduct and Accessibility pages; all pages now only show appropriate email contact information
- July 1, 2025. Updated Accessibility page to show accurate Web Accessibility Standards (WCAG 2.1 Level AA, semantic HTML, keyboard navigation) and realistic Supported Technologies (screen readers, browser tools, high contrast) removing unverified compliance claims
- July 1, 2025. Removed "Common Accommodations" section from Accessibility page to simplify content and focus on verified capabilities
- July 1, 2025. Removed "Sign language interpretation upon request" from Program Accommodations section as this service is not available for volunteer-based program
- July 1, 2025. Fixed button text visibility issue on student registration step 3: added proper text color classes (hover:text-gray-900 and text-gray-700) to Academic Disciplines and Mentoring Topics buttons to prevent text from disappearing on hover
- July 5, 2025. Enhanced student registration form: LinkedIn URL field already exists and is now mandatory, made all Step 1 fields mandatory (Full Name, Email, LinkedIn URL, Phone Number, University Name, Academic Program, Year of Study) with comprehensive validation at both step transition and final submission
- July 5, 2025. Enhanced mentor registration form: added mandatory phone number field to database schema and form, made company/organization and location fields mandatory with comprehensive validation for all Step 1 required fields (Full Name, Current Job Title, Company, Location, Phone Number) before progression to preferences step
- July 5, 2025. Improved icon contrast across platform: increased background opacity from 10% to 20% for circular icon backgrounds in Home page (process steps and features sections) and About page (vision section) for better visual accessibility and readability
- July 5, 2025. Updated mentor registration placeholders: changed "Senior Software Engineer" to "Senior Manager" and "University of California" to "University name" for more appropriate professional examples
- July 5, 2025. Standardized circular icons across platform: replaced emoji-based icons with numbered circles matching student/mentor registration form style (solid colored backgrounds with white numbers) for consistent visual design across Home page process steps, features section, and About page vision section
- July 5, 2025. Updated circular icons to use proper Lucide React icons instead of numbers: Home page process steps (FileText, UserCheck, Calendar, Award), features section (Target, TrendingUp, Network), About page vision (Globe, Heart, Rocket), and Contact page "Other Ways to Connect" section (Clock, MapPin, Calendar) - all with solid colored backgrounds and white icons matching For Students page style
- July 5, 2025. Streamlined Contact page by removing duplicate "Contact Information" and "Other Ways to Connect" sections, keeping only the comprehensive "How to Reach Us" section with email and LinkedIn contact details to eliminate redundancy
- July 5, 2025. Updated Privacy Policy page: removed outdated "Last Updated: December 30, 2024" date and enhanced Data Security section to specify that user data is stored in encrypted storage facilities located in the United States for security and compliance
- July 5, 2025. Fixed FAQ page navigation buttons: "Email Us" button now navigates to Contact page instead of opening email client, "Follow Us" button now correctly links to AspireLink LinkedIn company page (linkedin.com/company/aspirelinkorg)
- July 5, 2025. Updated About page hero background from purple gradient (#6366f1 to #4338ca) to navy blue gradient (#1e3a8a to #1e40af) for improved visual design

## User Preferences

Preferred communication style: Simple, everyday language.
>>>>>>> .theirs
