"use client"

import React from "react"
import Link from "next/link"
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

const UserMenu = ({ user }: UserMenuProps) => {
  const router = useRouter()
  // TODO: এখানে signOut() ফাংশনালিটি লিখবে
  const handleLogout = async () => {
    // console.log("Logout clicked")
    await signOut({
      // fetch অপশন যোগ করা হল কারণ আমি যেকোন পেজ থেকে লগ আউট করলে সরাসরি হোম পেজে যেন নিয়ে যায়।
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully!")
          router.push("/") // redirect to login page
        },
      },
    })
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm font-medium text-slate-700 sm:inline">
        Welcome,{" "}
        <span className="font-semibold text-slate-900">{user?.name}</span>
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer rounded-full ring-2 ring-green-600/20 transition outline-none hover:ring-green-600">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src={user?.image || ""}
              alt={user?.name || "User"}
              className="object-cover"
            />
            <AvatarFallback className="bg-green-100 font-semibold text-green-700">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm leading-none font-semibold text-slate-900">
                  {user?.name}
                </p>
                <p className="text-xs leading-none text-slate-500">
                  {user?.email}
                </p>
                {user?.role && (
                  <span className="mt-1 inline-block w-fit rounded bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700 uppercase">
                    {user.role}
                  </span>
                )}
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <Link
              href={`/dashboard/${user?.role}`}
              className="flex items-center gap-2"
            >
              <LayoutDashboard className="h-4 w-4 text-slate-500" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer">
            <Link href="/profile" className="flex items-center gap-2">
              <UserIcon className="h-4 w-4 text-slate-500" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default UserMenu
