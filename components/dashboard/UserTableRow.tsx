"use client"

import React from "react"
import Image from "next/image"
import {
  Shield,
  GraduationCap,
  BookOpen,
  Sparkles,
  Trash2,
} from "lucide-react"
import { IUser } from "@/lib/actions/users"

interface UserTableRowProps {
  user: IUser
  isCurrentAdmin: boolean
  onRoleChange: (userId: string, newRole: "student" | "tutor" | "admin") => void
  onDelete: (userId: string, userName: string) => void
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  user,
  isCurrentAdmin,
  onRoleChange,
  onDelete,
}) => {
  return (
    <tr className="border-b border-border/60 transition-colors hover:bg-muted/30">
      {/* ১. ইউজারের নাম, ইমেইল ও অবতার */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted/50">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                fill
                sizes="40px"
                className="object-cover"
              />
            ) : (
              <span className="text-xs font-bold uppercase text-primary">
                {user.name ? user.name.slice(0, 2) : "ML"}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">
              {user.name || "Unnamed User"}
            </p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </td>

      {/* ২. বর্তমান রোল */}
      <td className="px-6 py-4">
        {user.role === "admin" && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-2.5 py-0.5 text-xs font-medium text-rose-600 dark:text-rose-400">
            <Shield className="size-3" />
            <span className="capitalize">Admin</span>
          </span>
        )}
        {user.role === "tutor" && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            <BookOpen className="size-3" />
            <span className="capitalize">Tutor</span>
          </span>
        )}
        {(!user.role || user.role === "student") && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">
            <GraduationCap className="size-3" />
            <span className="capitalize">Student</span>
          </span>
        )}
      </td>

      {/* ৩. সাবস্ক্রিপশন প্ল্যান */}
      <td className="px-6 py-4">
        {user.plan === "pro" ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            <Sparkles className="size-3" />
            <span>PRO</span>
          </span>
        ) : (
          <span className="inline-flex items-center rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            FREE
          </span>
        )}
      </td>

      {/* ৪. রোল পরিবর্তন */}
      <td className="px-6 py-4">
        <select
          value={user.role || "student"}
          disabled={isCurrentAdmin}
          onChange={(e) =>
            onRoleChange(
              user._id,
              e.target.value as "student" | "tutor" | "admin"
            )
          }
          className="rounded-lg border border-input bg-background px-2.5 py-1 text-xs font-medium text-foreground transition focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="student">Student</option>
          <option value="tutor">Tutor</option>
          <option value="admin">Admin</option>
        </select>
      </td>

      {/* ৫. ডিলিট অ্যাকশন */}
      <td className="px-6 py-4 text-right">
        {isCurrentAdmin ? (
          <span className="inline-flex items-center rounded-md border border-border/80 bg-muted/60 px-2 py-1 text-[11px] font-medium text-muted-foreground">
            Current Admin (You)
          </span>
        ) : (
          <button
            type="button"
            onClick={() => onDelete(user._id, user.name)}
            className="inline-flex items-center gap-1 rounded-lg border border-transparent p-1.5 text-xs font-medium text-muted-foreground transition hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive focus:outline-none"
            title="Delete user"
          >
            <Trash2 className="size-4" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        )}
      </td>
    </tr>
  )
}

export default UserTableRow
