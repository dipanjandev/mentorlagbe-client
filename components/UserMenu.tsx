"use client"

import React from "react"
import Link from "next/link"
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface UserMenuProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
    role?: string | null
  }
}

// রিকোয়ারমেন্ট অনুযায়ী Navbar State for Authenticated Users:
// User Profile Image (Avatar), User Name & Role Badge (Student / Tutor / Admin),
// 'Dashboard' link, 'Update Profile' link, and a 'Sign Out' button.
const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Signed out successfully!")
            router.push("/")
            router.refresh()
          },
        },
      })
    } catch (error) {
      console.error("Sign out error:", error)
      toast.error("Failed to sign out")
    }
  }

  const role = user?.role || "student"
  const dashboardUrl = `/dashboard/${role}`

  return (
    <div className="flex items-center gap-3">
      {/* ইউজার নেম ও রোল ব্যাজ (ডেস্কটপে দৃশ্যমান) */}
      <div className="hidden flex-col items-end sm:flex">
        <span className="text-xs font-semibold text-foreground">
          {user?.name || "User"}
        </span>
        <span className="mt-0.5 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-2 py-0.2 text-[10px] font-bold text-primary uppercase">
          {role}
        </span>
      </div>

      <DropdownMenu>
        {/* প্রোফাইল অবতার ট্রিগার */}
        <DropdownMenuTrigger className="group relative flex cursor-pointer items-center gap-2 rounded-full ring-2 ring-primary/20 transition outline-none hover:ring-primary">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user?.image || ""}
              alt={user?.name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 font-bold text-primary">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        {/* ড্রপডাউন মেনু */}
        <DropdownMenuContent align="end" className="w-56 p-1.5 shadow-lg">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal p-2">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-foreground">
                  {user?.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {user?.email}
                </p>
                <div className="pt-1">
                  <Badge variant="outline" className="text-[10px] font-bold uppercase py-0 px-2">
                    {role}
                  </Badge>
                </div>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* ১. Dashboard Link */}
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href={dashboardUrl}
              className="flex w-full items-center gap-2.5 text-xs font-medium"
            >
              <LayoutDashboard className="size-4 text-muted-foreground" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          {/* ২. Update Profile Link (Requirement matching) */}
          <DropdownMenuItem className="cursor-pointer">
            <Link
              href="/dashboard/profile"
              className="flex w-full items-center gap-2.5 text-xs font-medium"
            >
              <UserIcon className="size-4 text-muted-foreground" />
              <span>Update Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* ৩. Sign Out Button */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive text-xs font-semibold"
          >
            <LogOut className="mr-2 size-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserMenu
