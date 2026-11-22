<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# 📚 MentorLagbe — Project Knowledge Base & AI Developer Specification

> **Project Name:** MentorLagbe (Smart Tuition & Mentorship Platform)  
> **Assignment:** Category 001 | Assignment 9  
> **Reference Video:** `b-14-a-9-cat-001.mp4` *(Always prioritize this specification document over video discrepancies)*  
> **Theme:** EdTech / Online & Home Tuition Finder and Booking Platform  
> **Last Updated:** November 2026 (Live Audit & Sprint Plan)

---

## 🎯 Project Overview & Vision

**MentorLagbe** is a full-stack, role-based tuition management and mentorship platform designed to connect qualified tutors offering subject-wise tuition batches or 1-on-1 mentorship with students seeking personalized academic guidance. It includes an administrative governance layer for moderating listings, managing user roles, and monitoring revenue generated through Stripe subscriptions.

### Target Problem & Solution
- **Problem:** Students and parents worldwide (especially in Bangladesh) struggle to find verified, subject-specific tutors with transparent class levels, modes (Online/Offline), and pricing. Skilled tutors also lack a streamlined portal to advertise their batches and manage student applications.
- **Solution:** A unified ecosystem with role-specific dashboards, secure authentication, admin moderation, direct application pipelines, and tiered Pro subscriptions.

---

## 👥 Stakeholders & Role Matrix

| Stakeholder | Role Key | Primary Capabilities |
| :--- | :--- | :--- |
| **Student** | `'student'` | Search & filter tuitions, view details, apply for sessions, track application statuses, bookmark tuitions, submit ratings/reviews, upgrade to Pro ($10). |
| **Tutor** | `'tutor'` | Create tuition listings (with ImgBB image upload), manage active/closed status, edit/delete tuitions, review incoming student applications (accept/reject), upgrade to Pro ($15). |
| **Admin** | `'admin'` | Moderate tuition listings (approve/reject), manage all users and roles, inspect Stripe revenue transactions, view system-wide analytics. |

---

## 🛠️ Technology Stack & Architecture

### Frontend (Client)
- **Framework:** Next.js (App Router, React 19, TypeScript)
- **Styling & UI:** Tailwind CSS v4, Shadcn UI, Lucide React icons (*DaisyUI is strictly avoided*)
- **Theming:** `next-themes` (Dark/Light mode support)
- **Notifications:** `sonner` for rich toast notifications
- **Image Hosting:** Direct multipart image upload to **ImgBB API** (`NEXT_PUBLIC_IMGBB_API_KEY`)
- **Payments UI:** Stripe Checkout client redirect & status callbacks

### Backend (Server)
- **Runtime & Framework:** Node.js, Express.js (ES Modules)
- **Database:** MongoDB Native Driver (`mentorlagbe-db`)
- **Authentication:** **BetterAuth** with MongoDB Adapter + Client-side JWT integration
- **Authorization:** Custom Express middlewares (`verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`)
- **Payment Processing:** **Stripe** Checkout Sessions & Webhooks

---

## 🗄️ Database Architecture (Strictly 4 Collections)

The database schema is strictly structured around **four (4) core collections**:

### 1. `user` / `users` Collection
Stores all registered accounts, role configurations, profile details, and subscription tiers.
```typescript
interface User {
  _id: ObjectId | string;
  name: string;
  email: string;
  image?: string;                     // ImgBB uploaded URL or external image URL
  role: 'student' | 'tutor' | 'admin';
  phone?: string;
  bio?: string;
  plan: 'free' | 'pro';               // Default is 'free'
  createdAt: Date | string;
}
```

### 2. `tuitions` Collection
Stores all tuition posts and mentorship offerings created by tutors.
```typescript
interface Tuition {
  _id: ObjectId | string;
  title: string;
  subject: string;
  classLevel: string;                 // e.g., 'Class 9-10', 'HSC', 'O-Levels', 'Undergraduate'
  mode: 'Online' | 'Offline';
  location: string;                   // Physical location or 'Online' / platform link
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;                // Hosted image URL via ImgBB
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus: 'pending' | 'approved' | 'rejected'; // Default: 'pending'
  isActive: boolean;                  // Default: true (Tutor can toggle Active/Closed)
  createdAt: Date | string;
}
```

### 3. `applications` Collection
Stores student enrollment/booking applications submitted for specific tuitions.
```typescript
interface Application {
  _id: ObjectId | string;
  tuitionId: ObjectId | string;
  tuitionTitle: string;
  subject: string;
  monthlyFee: number;
  tutorEmail: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  preferredSchedule: string;          // Preferred time slots or days
  studentNote: string;
  status: 'pending' | 'accepted' | 'rejected'; // Default: 'pending'
  appliedAt: Date | string;
}
```

### 4. `payments` Collection
Stores transaction records for Pro plan subscription upgrades through Stripe.
```typescript
interface Payment {
  _id: ObjectId | string;
  userEmail: string;
  userName: string;
  userRole: 'student' | 'tutor';
  planName: string;                   // 'Pro Tutor' ($15) or 'Pro Student' ($10)
  amount: number;                     // 15 or 10 (USD)
  currency: string;                   // 'usd'
  transactionId: string;              // Stripe payment_intent or balance_transaction
  stripeSessionId: string;
  paymentStatus: 'paid';
  paidAt: Date | string;
}
```

---

## 📊 Live Implementation Status Matrix

### Public Pages
| Route | Feature / Requirement | Status | Notes |
| :--- | :--- | :---: | :--- |
| `/` | **Home Landing Page** | ✅ Done | Modular sections: Hero, Featured Tuitions (from API), How It Works, Top Subjects, Pricing Teaser, & Platform Stats with Footer. |
| `/tuitions` | **Browse Tuitions** | ✅ Done | Server-side Search & Filter (Challenge 1) + Server-side Pagination (Optional 1). |
| `/tuitions/[id]` | **Tuition Details** | ✅ Done | Full details + Student Apply Modal with duplicate protection. |
| `/pricing` | **Pricing & Pro Plans** | ✅ Done | Conditional rendering based on role (Student $10, Tutor $15, Admin view-only disabled, Guest both). |
| `/sign-in` | **Authentication Sign-in** | ✅ Done | Form validation & BetterAuth integration. |
| `/sign-up` | **Authentication Sign-up** | ✅ Done | Role selector (Student/Tutor), defaults plan to 'free'. |
| `/payment/success` | **Stripe Success Callback** | ✅ Done | Verifies session & updates state. |
| `/payment/cancel` | **Stripe Cancel Callback** | ✅ Done | Safe return with alert. |

### Global Layout & Fallbacks
| Component / File | Purpose | Status | Notes |
| :--- | :--- | :---: | :--- |
| `components/NavBar.tsx` | Header navigation | ✅ Done | Responsive navbar, authenticated state via `UserMenu` (`/dashboard/profile` & Sign Out), and theme support. |
| `components/Footer.tsx` | Footer navigation & brand | ✅ Done | Logo, tagline, links, contact info, copyright, & **new 𝕏 logo**. |
| `app/loading.tsx` | Global loading skeleton / spinner | ✅ Done | Modern pulsing spinner with brand accent & shimmer bar. |
| `app/not-found.tsx` | Custom 404 page | ✅ Done | Modern 404 page with 'Back to Home' & 'Browse Tuitions' buttons. |
| `app/error.tsx` | Custom error boundary | ✅ Done | Error boundary with 'Try Again' & 'Back to Home' buttons. |

### Student Dashboard (`/dashboard/student`)
| Route | Feature | Status | Notes |
| :--- | :--- | :---: | :--- |
| `/dashboard/student` | **Overview** | ✅ Done | 4 stat cards (Total Applied, Accepted, Pending, Plan) + Recent Applications preview. |
| `/dashboard/student/my-applications` | **My Applications** | ✅ Done | Table view with status badges and cancel action. |

### Tutor Dashboard (`/dashboard/tutor`)
| Route | Feature | Status | Notes |
| :--- | :--- | :---: | :--- |
| `/dashboard/tutor` | **Overview** | ✅ Done | 4 stat cards (Total Posted, Active/Approved, Applicants, Plan) + Recent Applicants preview. |
| `/dashboard/tutor/post-tuition` | **Post Tuition** | ✅ Done | Validated form, ImgBB direct upload, free tier limit check (max 2). |
| `/dashboard/tutor/my-tuitions` | **My Created Tuitions** | ✅ Done | Full CRUD: edit, delete, toggle active/closed. |
| `/dashboard/tutor/applicants` | **Manage Applicants** | ✅ Done | Accept/Reject student applications. |

### Admin Dashboard (`/dashboard/admin`)
| Route | Feature | Status | Notes |
| :--- | :--- | :---: | :--- |
| `/dashboard/admin` | **Overview** | ✅ Done | 4 platform stat cards (Users, Tutors, Pending/Approved Tuitions, Stripe Revenue) + Action Hub. |
| `/dashboard/admin/users` | **User Management** | ✅ Done | Pure Shadcn UI, stat cards, role changer, delete, search/filters. |
| `/dashboard/admin/tuitions` | **Tuition Approval Flow** | ✅ Done | Pure Shadcn UI, stat cards, approve/reject actions, filters. |
| `/dashboard/admin/transactions` | **Transactions** | ✅ Done | Table of Stripe payments from `/payments` endpoint. |

### Shared Route (All Roles)
| Route | Feature | Status | Notes |
| :--- | :--- | :---: | :--- |
| `/dashboard/profile` | **Update Profile** | ✅ Done | Name, Phone, Bio, and direct ImgBB profile photo upload. |

### Backend API (`mentorlagbe-server`)
| Endpoint | Method | Status | Notes |
| :--- | :---: | :---: | :--- |
| `/users` | `GET` | ✅ Done | Fetch all users. |
| `/users/:id/role` | `PATCH` | ✅ Done | Update user role. |
| `/users/:id` | `DELETE` | ✅ Done | Delete user. |
| `/tuitions` | `POST`, `GET` | ✅ Done | Create, search, filter, paginate tuitions. |
| `/tuitions/count` | `GET` | ✅ Done | Count tuitions for limit checks. |
| `/tuitions/:id` | `GET`, `PATCH`, `DELETE` | ✅ Done | Single tuition CRUD. |
| `/applications` | `POST`, `GET` | ✅ Done | Submit with duplicate guard, fetch by tutor/student. Client sends `Authorization: Bearer <token>` via `authFetch`. |
| `/applications/:id` | `PATCH` | ✅ Done | Accept/Reject application. |
| `/payments` | `GET` | ✅ Done | Fetch all Stripe transaction logs. |
| **Client Auth Helper** | `getToken`, `authFetch` | ✅ Done | Dual token resolution: reads `better-auth.session_token` cookie + `auth.api.getSession`, attaches `Authorization: Bearer <token>` header with `cache: "no-store"`. |
| **Backend Middlewares** | `verifyToken`, `verifyRole` | ✅ Done | **Challenge 2**: Express middlewares (`verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`) verifying `session` collection token and attaching `req.user`. |
| **Seed Data** | Script / Endpoint | ❌ Pending | 10-12 realistic tuition listings for rich display. |

---

## 📈 Git Commit Tracking
- **Client Commits:** **19** (Target: Minimum 20. Needs 1+ more commit).
- **Server Commits:** **14** (Target: Minimum 12. Already satisfied!).

---

## 🏆 Mandatory & Optional Challenges Checklist

- [x] **Challenge 1: Server-Side Search & Filter on `/tuitions`** (Implemented in `index.js` and `app/tuitions/page.tsx`).
- [x] **Challenge 2: JWT / Session Token Verification & Role-Based Middlewares** (Implemented across `mentorlagbe-server` and `mentorlagbe-client` with `verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`, and `authFetch`).
- [x] **Challenge 3: Image Uploading via ImgBB API** (Implemented in both `post-tuition` and `/dashboard/profile`).
- [x] **Optional 1: Server-Side Pagination** (Implemented on `/tuitions`).
- [ ] **Optional 2: Realistic Seed Script** (To populate 10-12 sample tuitions across subjects).
- [ ] **Optional 4: Smooth Dark/Light Theme Switcher** (Theme provider exists; add toggle to Navbar).

---

## 📋 Final Submission Checklist

- [ ] **Admin Email:** `admin@mentorlagbe.com` (or current admin account)
- [ ] **Admin Password:** `...`
- [ ] **Tutor Email & Password:** `tutor@mentorlagbe.com`
- [ ] **Live Site URL:** Vercel deployment link
- [ ] **Server GitHub Repository:** `...`
- [ ] **Client GitHub Repository:** `...`
- [ ] **README.md:** Containing project name, purpose, live URL, credentials, core features, and list of npm packages.
