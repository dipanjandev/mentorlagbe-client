"use client"

import React from "react"
import { Users, GraduationCap, BookOpen, Sparkles } from "lucide-react"
import { IUser } from "@/lib/actions/users"

interface UserStatsCardsProps {
  users: IUser[]
}

const UserStatsCards: React.FC<UserStatsCardsProps> = ({ users }) => {
  const totalStudents = users.filter((u) => u.role === "student").length
  const totalTutors = users.filter((u) => u.role === "tutor").length
  const totalPro = users.filter((u) => u.plan === "pro").length

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* 1. Total Users */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs transition hover:border-primary/30 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Total Users
          </p>
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-3xl font-extrabold text-foreground">
          {users.length}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          All registered platform accounts
        </p>
      </div>

      {/* 2. Students */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs transition hover:border-blue-500/30 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Students
          </p>
          <span className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <GraduationCap className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-3xl font-extrabold text-blue-600 dark:text-blue-400">
          {totalStudents}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Active student profiles
        </p>
      </div>

      {/* 3. Tutors */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs transition hover:border-emerald-500/30 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tutors
          </p>
          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <BookOpen className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
          {totalTutors}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Educators & mentors
        </p>
      </div>

      {/* 4. Pro Members */}
      <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs transition hover:border-amber-500/30 hover:shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pro Members
          </p>
          <span className="flex size-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Sparkles className="size-4" />
          </span>
        </div>
        <p className="mt-3 text-3xl font-extrabold text-amber-600 dark:text-amber-400">
          {totalPro}
        </p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Subscribed to Pro Tier
        </p>
      </div>
    </div>
  )
}

export default UserStatsCards
