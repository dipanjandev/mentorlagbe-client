"use client"

import React, { useEffect, useState } from "react"
import { useSession } from "@/lib/auth-client"
import { toast } from "sonner"
import { Users, Loader2, UserX } from "lucide-react"
import {
  IUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "@/lib/actions/users"
import UserStatsCards from "@/components/dashboard/UserStatsCards"
import UserFilterBar from "@/components/dashboard/UserFilterBar"
import UserTableRow from "@/components/dashboard/UserTableRow"

const UserManagementPage = () => {
  const { data: session } = useSession()
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  // ১. সব ইউজার লোড করা
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const data = await getAllUsers()
        setUsers(data)
      } catch {
        toast.error("Failed to load users")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // ২. রোল পরিবর্তন হ্যান্ডলার
  const handleRoleChange = async (
    userId: string,
    newRole: "student" | "tutor" | "admin"
  ) => {
    try {
      const res = await updateUserRole(userId, newRole)
      if (res.modifiedCount > 0) {
        toast.success(`User role updated to ${newRole}`)
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        )
      }
    } catch {
      toast.error("Failed to update role")
    }
  }

  // ৩. ইউজার ডিলিট হ্যান্ডলার
  const handleDeleteUser = async (userId: string, userName: string) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${userName}?`
    )
    if (!isConfirmed) return

    try {
      const res = await deleteUser(userId)
      if (res.deletedCount > 0) {
        toast.success("User deleted successfully")
        setUsers((prev) => prev.filter((u) => u._id !== userId))
      }
    } catch {
      toast.error("Failed to delete user")
    }
  }

  // ৪. সার্চ এবং রোল ফিল্টারিং
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || u.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="size-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            User Management
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage user accounts, assign roles, inspect subscription tiers, and
          control permissions.
        </p>
      </div>

      {/* ১. পরিসংখ্যান কার্ড */}
      <UserStatsCards users={users} />

      {/* ২. সার্চ ও ফিল্টার বার */}
      <UserFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        totalCount={users.length}
        filteredCount={filteredUsers.length}
      />

      {/* ৩. ইউজার টেবিল */}
      <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xs">
        {loading ? (
          <div className="flex min-h-75 flex-col items-center justify-center gap-3">
            <Loader2 className="size-8 animate-spin text-primary" />
            <p className="text-xs font-medium text-muted-foreground">
              Loading user records...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border/80 bg-muted/40 text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    User
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Current Role
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Plan
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Change Role
                  </th>
                  <th scope="col" className="px-6 py-4 text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <UserTableRow
                      key={user._id}
                      user={user}
                      isCurrentAdmin={session?.user?.email === user.email}
                      onRoleChange={handleRoleChange}
                      onDelete={handleDeleteUser}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <UserX className="size-8 text-muted-foreground/60" />
                        <p className="text-sm font-semibold text-foreground">
                          No users found
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Try adjusting your search query or role filter.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserManagementPage
