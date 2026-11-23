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
> **Live Site URL:** https://mentorlagbe-client-lyart.vercel.app  
> **Client Repository:** https://github.com/dipanjandev/mentorlagbe-client  
> **Server Repository:** https://github.com/dipanjandev/mentorlagbe-server  
> **Last Updated:** November 2026 (Production Ready & Fully Tested)

---

## 🎯 Project Overview & Vision

**MentorLagbe** is a production-ready, full-stack, role-based tuition management and academic mentorship platform connecting qualified tutors offering subject-wise tuition batches or 1-on-1 mentorship with students seeking personalized academic guidance. It features complete administrative governance, tutor batch management, student applications, ImgBB media uploads, and tiered Stripe subscriptions.

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
- **Theming:** `next-themes` (Smooth Dark/Light mode support with zero layout shift)
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
| `/tuitions` | **Browse Tuitions** | ✅ Done | Server-side Search & Filter (Challenge 1) + Server-side Pagination (Optional 1). Seamless navbar background blend. |
| `/tuitions/[id]` | **Tuition Details** | ✅ Done | Full details + Student Apply Modal with duplicate protection. Dynamic metadata titles. |
| `/pricing` | **Pricing & Pro Plans** | ✅ Done | Conditional rendering based on role (Student $10, Tutor $15, Admin view-only disabled, Guest both). |
| `/sign-in` | **Authentication Sign-in** | ✅ Done | Form validation, BetterAuth integration, interactive Eye password toggle, elevated UI. |
| `/sign-up` | **Authentication Sign-up** | ✅ Done | Public sign-up strictly allows Student/Tutor (Admin option completely removed), Password & Confirm Password dual eye toggles. |
| `/payment/success` | **Stripe Success Callback** | ✅ Done | Verifies session & updates state. |
| `/payment/cancel` | **Stripe Cancel Callback** | ✅ Done | Safe return with alert. |

### Global Layout & Fallbacks
| Component / File | Purpose | Status | Notes |
| :--- | :--- | :---: | :--- |
| `components/NavBar.tsx` | Header navigation | ✅ Done | Seamless floating island design (`sticky top-0 z-50 pointer-events-none` with `pointer-events-auto` inner pill), Theme Toggle, UserMenu, and mobile drawer. |
| `components/Footer.tsx` | Footer navigation & brand | ✅ Done | Logo, tagline, links, contact info, copyright, & **new 𝕏 logo**. |
| `app/loading.tsx` | Global loading skeleton / spinner | ✅ Done | Modern pulsing spinner with brand accent & shimmer bar. |
| `app/not-found.tsx` | Custom 404 page | ✅ Done | Modern 404 page with 'Back to Home' & 'Browse Tuitions' buttons. |
| `app/error.tsx` | Custom error boundary | ✅ Done | Error boundary with 'Try Again' & 'Back to Home' buttons. |

### Student Dashboard (`/dashboard/student`)
| Route | Feature | Status | Notes |
| :--- | :--- | :---: | :--- |
| `/dashboard/student` | **Overview** | ✅ Done | 4 stat cards (Total Applied, Accepted, Pending, Plan) + Recent Applications preview. |
| `/dashboard/student/my-applications` | **My Applications** | ✅ Done | Table view with status badges and horizontal swipe on mobile. |

### Tutor Dashboard (`/dashboard/tutor`)
| Route | Feature | Status | Notes |
| :--- | :--- | :---: | :--- |
| `/dashboard/tutor` | **Overview** | ✅ Done | 4 stat cards (Total Posted, Active/Approved, Applicants, Plan) + Recent Applicants preview. |
| `/dashboard/tutor/post-tuition` | **Post Tuition** | ✅ Done | Validated form, ImgBB direct upload, free tier limit check (max 2), fully responsive grid. |
| `/dashboard/tutor/my-tuitions` | **My Created Tuitions** | ✅ Done | Full CRUD: edit, delete, toggle active/closed. Shows only tutor's own posts. |
| `/dashboard/tutor/applicants` | **Manage Applicants** | ✅ Done | Accept/Reject student applications. |

### Admin Dashboard (`/dashboard/admin`)
| Route | Feature | Status | Notes |
| :--- | :--- | :---: | :--- |
| `/dashboard/admin` | **Overview** | ✅ Done | 4 platform stat cards (Users, Tutors, Pending/Approved Tuitions, Stripe Revenue) + Action Hub. |
| `/dashboard/admin/users` | **User Management** | ✅ Done | Pure Shadcn UI, stat cards, role changer, delete, search/filters. |
| `/dashboard/admin/tuitions` | **Tuition Approval Flow** | ✅ Done | Pure Shadcn UI, stat cards, approve/reject actions, filters. |
| `/dashboard/admin/transactions` | **Transactions** | ✅ Done | Table of Stripe payments from `/payments` endpoint. Semantic dark mode tokens applied. |

### Shared Route (All Roles)
| Route | Feature | Status | Notes |
| :--- | :--- | :---: | :--- |
| `/dashboard/profile` | **Update Profile** | ✅ Done | Name, Phone, Bio, and direct ImgBB profile photo upload. |

---

## 📈 Git Commit Tracking
- **Client Commits:** **37+** *(Target: Minimum 20. Satisfied!)* ✅
- **Server Commits:** **20+** *(Target: Minimum 12. Satisfied!)* ✅

---

## 🏆 Mandatory & Optional Challenges Checklist

- [x] **Challenge 1: Server-Side Search & Filter on `/tuitions`** (Implemented in `index.js` and `app/tuitions/page.tsx`).
- [x] **Challenge 2: JWT / Session Token Verification & Role-Based Middlewares** (Implemented across `mentorlagbe-server` and `mentorlagbe-client` with `verifyToken`, `verifyStudent`, `verifyTutor`, `verifyAdmin`, and `authFetch`).
- [x] **Challenge 3: Image Uploading via ImgBB API** (Implemented in both `post-tuition` and `/dashboard/profile`).
- [x] **Optional 1: Server-Side Pagination** (Implemented on `/tuitions`).
- [x] **Optional 4: Smooth Dark/Light Theme Switcher** (Integrated ThemeToggle in Navbar with smooth Sun/Moon transitions).

---

## 📋 Evaluator Checklist & Credentials

- **Admin Account:** `admin@mentorlagbe.com` | `TestPassword123!`
- **Tutor Account:** `tutor@mentorlagbe.com` | `TestPassword123!`
- **Student Account:** `student@mentorlagbe.com` | `TestPassword123!`
- **Live Site URL:** https://mentorlagbe-client-lyart.vercel.app
- **Server GitHub Repository:** https://github.com/dipanjandev/mentorlagbe-server
- **Client GitHub Repository:** https://github.com/dipanjandev/mentorlagbe-client
