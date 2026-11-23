# 📚 MentorLagbe — Smart Tuition & Academic Mentorship Platform

> **Category:** Category 001 | Assignment 9  
> **Theme:** EdTech / Online & Home Tuition Finder and Mentorship Booking Platform  
> **Live Site URL:** [https://mentorlagbe-client-lyart.vercel.app](https://mentorlagbe-client-lyart.vercel.app)  
> **Client Repository:** [https://github.com/dipanjandev/mentorlagbe-client](https://github.com/dipanjandev/mentorlagbe-client)  
> **Server Repository:** [https://github.com/dipanjandev/mentorlagbe-server](https://github.com/dipanjandev/mentorlagbe-server)

---

## 🎯 Purpose of the Platform
**MentorLagbe** connects verified educators offering subject-specific home or online tuition batches with students seeking academic guidance. The ecosystem features:
- **Student Portal:** Discover tuitions via multi-parameter search/filters, book sessions, track application statuses, and subscribe to Pro Student.
- **Tutor Portal:** Create and manage tuition listings with direct ImgBB image uploads, toggle batch availability, manage student applicants, and upgrade to Pro Tutor for unlimited listings.
- **Admin Governance:** Moderate tuition listings (approve/reject), manage user roles, and monitor live Stripe revenue transactions.

---

## 🔑 Demo & Evaluator Credentials

| Role | Email / User ID | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Admin** | `admin@mentorlagbe.com` *(or current admin account)* | `MentorLagbe@1234` | Full admin access: User Management, Tuition Approvals, Stripe Revenue. |
| **Tutor** | `tutor@mentorlagbe.com` | `MentorLagbe@1234` | Post up to 2 tuitions on Free, upgrade to Pro Tutor ($15), applicant review. |
| **Student** | `student@mentorlagbe.com` | `MentorLagbe@1234` | Apply for tuitions, track application status, upgrade to Pro Student ($10). |

---

## ✨ Core Features & Highlights

1. **Authentication & Role-Based Access Control:**
   - Powered by **BetterAuth** with MongoDB adapter.
   - Dual-token resolution with `Authorization: Bearer <token>` attached via `authFetch`.
   - Express backend middlewares: `verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`.
   - Tamper-proof registration: public sign-up is strictly locked to **Student** and **Tutor** roles.

2. **Browse Tuitions & Batches (Server-Side Filter & Pagination):**
   - Server-side multi-parameter filtering: Search query, Class Level (Class 1-12, O/A-Levels, Admission), Mode (Online/Offline), and Days per Week.
   - Server-side pagination with seamless state handling.

3. **Tutor Dashboard & Tuition Lifecycle:**
   - Validated tuition creation with direct image hosting via **ImgBB API**.
   - Free plan limit enforcement: maximum 2 active tuition posts on Free tier.
   - Pro Tutor ($15) unlocks unlimited tuition listings and verified educator badges.
   - Full CRUD operations with instant Active/Closed availability toggling.

4. **Student Booking & Application Management:**
   - Interactive apply modal with duplicate application protection.
   - Real-time status tracking: Pending, Accepted, or Rejected.
   - Pro Student ($10) priority application perks.

5. **Admin Governance & Stripe Revenue Ledger:**
   - Real-time platform metrics: Total Users, Tutors, Students, Pending Batches, and Total Revenue.
   - Role modification and user deletion.
   - Direct Stripe Checkout integration and transaction auditing.

6. **UI/UX & Design Tokens:**
   - Built exclusively with **Tailwind CSS v4** and **Shadcn UI** (*Strictly zero DaisyUI*).
   - Seamless floating glassmorphic navbar with smooth Sun/Moon Dark/Light theme switcher (`next-themes`).
   - Interactive password visibility toggles (`Eye` / `EyeOff`) and confirm password validation.
   - Fully responsive on Mobile, Tablet, and Desktop screens.

---

## 🛠️ Technology Stack & npm Packages

### Client (`mentorlagbe-client`)
- **Core:** `next` (v16.4.5), `react` (v19.3.1), `react-dom` (v19.3.1), `typescript` (v5)
- **Styling:** `tailwindcss` (v4), `@tailwindcss/postcss`, `tw-animate-css`
- **UI Components:** `shadcn`, `@base-ui/react`, `lucide-react`, `class-variance-authority`, `cn`
- **Authentication:** `better-auth`, `@better-auth/mongo-adapter`
- **Database:** `mongodb` (v7.9.0)
- **Payment Processing:** `@stripe/stripe-js`, `stripe`
- **Theming & Alerts:** `next-themes`, `sonner`
- **Utilities:** `date-fns`, `recharts`, `embla-carousel-react`, `cmdk`, `input-otp`

### Server (`mentorlagbe-server`)
- **Runtime & Framework:** `express` (v5.3.0), Node.js (ES Modules)
- **Database:** `mongodb` (v7.9.0) Native Driver
- **Security & Middleware:** `jsonwebtoken`, `cors`, `dotenv`

---

## 🗄️ Database Architecture (Strictly 4 Collections)

1. **`user` / `users`**: Stores accounts, roles (`student`, `tutor`, `admin`), plans (`free`, `pro`), and profiles.
2. **`tuitions`**: Stores tuition posts, subjects, class levels, fees, schedules, ImgBB images, and approval status (`pending`, `approved`, `rejected`).
3. **`applications`**: Stores student tuition booking requests with contact details, schedules, notes, and statuses (`pending`, `accepted`, `rejected`).
4. **`payments`**: Stores Stripe transaction records, session IDs, amounts ($10 or $15), and timestamps.
