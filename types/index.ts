export type TUserRole = "student" | "tutor" | "admin"
export type TSubscriptionPlan = "free" | "pro"
export type TTuitionMode = "Online" | "Offline"
export type TApprovalStatus = "pending" | "approved" | "rejected"
export type TApplicationStatus = "pending" | "accepted" | "rejected"

export interface IUser {
  _id: string
  name: string
  email: string
  image?: string
  role: TUserRole
  phone?: string
  bio?: string
  plan: TSubscriptionPlan
  createdAt?: string
}

export interface ITuition {
  _id: string
  title: string
  subject: string
  classLevel: string
  mode: TTuitionMode
  location: string
  monthlyFee: number
  daysPerWeek: number
  bannerImage: string
  description: string
  tutorName?: string
  tutorEmail?: string
  approvalStatus?: TApprovalStatus
  isActive?: boolean
  createdAt?: string
}

export interface IApplication {
  _id: string
  tuitionId: string
  tuitionTitle: string
  subject: string
  monthlyFee: number
  tutorEmail: string
  studentName: string
  studentEmail: string
  studentPhone: string
  preferredSchedule: string
  studentNote?: string
  status: TApplicationStatus
  appliedAt?: string
}

export interface IPayment {
  _id: string
  userEmail: string
  userName: string
  userRole: TUserRole
  planName: string
  amount: number
  currency: string
  transactionId: string
  stripeSessionId: string
  paymentStatus: "paid"
  paidAt?: string
}

export interface ISidebarMenuItem {
  title: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}
