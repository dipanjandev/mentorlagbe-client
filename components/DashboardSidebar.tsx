"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BookOpen,
  Users,
  CheckSquare,
  CreditCard,
  Home,
  LogOut,
  User as UserIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession, signOut } from "@/lib/auth-client"
import { ISidebarMenuItem, TUserRole } from "@/types"
import Logo from "./Logo"
import Image from "next/image"

const menuItemByRole: Record<TUserRole, ISidebarMenuItem[]> = {
  student: [
    { title: "Overview", url: "/dashboard/student", icon: LayoutDashboard },
    {
      title: "My Applications",
      url: "/dashboard/student/my-applications",
      icon: FileText,
    },
  ],
  tutor: [
    { title: "Overview", url: "/dashboard/tutor", icon: LayoutDashboard },
    {
      title: "Post a Tuition",
      url: "/dashboard/tutor/post-tuition",
      icon: PlusCircle,
    },
    {
      title: "My Created Tuitions",
      url: "/dashboard/tutor/my-tuitions",
      icon: BookOpen,
    },
    {
      title: "Manage Applicants",
      url: "/dashboard/tutor/applicants",
      icon: Users,
    },
  ],
  admin: [
    { title: "Overview", url: "/dashboard/admin", icon: LayoutDashboard },
    { title: "User Management", url: "/dashboard/admin/users", icon: Users },
    {
      title: "Tuition Approval",
      url: "/dashboard/admin/tuitions",
      icon: CheckSquare,
    },
    {
      title: "Transactions",
      url: "/dashboard/admin/transactions",
      icon: CreditCard,
    },
  ],
}

const roleBadgeStyles: Record<TUserRole, string> = {
  admin: "bg-rose-500/10 text-rose-600 ring-rose-500/20 dark:text-rose-400",
  tutor:
    "bg-indigo-500/10 text-indigo-600 ring-indigo-500/20 dark:text-indigo-400",
  student:
    "bg-emerald-500/10 text-emerald-600 ring-emerald-500/20 dark:text-emerald-400",
}

const DashboardSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const role: TUserRole = (session?.user?.role as TUserRole) || "student"
  const menuItems = menuItemByRole[role] || menuItemByRole.student
  // console.log(session)

  return (
    <Sidebar className="border-r border-border/60 bg-background/95 backdrop-blur-md">
      <SidebarHeader className="gap-3.5 border-b border-border/60 px-4 py-4">
        <div className="flex items-center justify-center gap-2 transition-opacity hover:opacity-90">
          <Logo />
        </div>
        {/* এখানে টার্নারি অপারেটর ব্যবহার করা হল, ছবি যদি না থাকে তাহলে এখানে নামের প্রথম অক্ষর দেখাবে। */}
        {session?.user && (
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/40 p-2.5 shadow-2xs">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
              {session.user.image ? (
                <Image
                  width={200}
                  height={200}
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="size-full object-cover"
                />
              ) : (
                session.user.name?.charAt(0).toUpperCase() || "U"
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="truncate text-sm font-semibold tracking-tight text-foreground">
                {session.user.name}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`py-0.2 inline-flex items-center rounded-md px-1.5 text-[10px] font-semibold tracking-wide capitalize ring-1 ring-inset ${roleBadgeStyles[role]}`}
                >
                  {role}
                </span>
              </div>
            </div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-1 px-2.5 text-[11px] font-semibold tracking-wider text-muted-foreground/80 uppercase">
            {role} Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((menuItem) => {
                const Icon = menuItem.icon
                const isActive = pathname === menuItem.url

                return (
                  <SidebarMenuItem key={menuItem.title}>
                    <SidebarMenuButton
                      render={<Link href={menuItem.url} />}
                      isActive={isActive}
                      tooltip={menuItem.title}
                      className="group relative h-10 rounded-lg px-3 font-medium text-muted-foreground transition-all duration-200 hover:bg-muted/80 hover:text-foreground data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary"
                    >
                      {isActive && (
                        <span className="absolute left-0 h-5 w-1 rounded-r-full bg-primary" />
                      )}
                      <Icon
                        className={`size-4 shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      />
                      <span className="truncate">{menuItem.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 bg-muted/20 p-3">
        <SidebarMenu className="gap-1">
          {/* প্রোফাইল আপডেট করার জন্য বাটন */}
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/dashboard/profile" />}
              tooltip="Update Profile"
              className="h-9 rounded-lg px-3 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <UserIcon className="size-4 shrink-0" />
              <span>Update Profile</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* হোমে ব্যাক করার জন্য বাটন রাখা হয়েছে। */}
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" />}
              tooltip="Back to Home"
              className="h-9 rounded-lg px-3 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Home className="size-4 shrink-0" />
              <span>Back to Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* এখানে সাইন আউট এর জন্য বাটন রাখা হয়েছে। */}
          {session?.user && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={async () => {
                  await signOut()
                  router.push("/")
                  router.refresh()
                }}
                tooltip="Sign Out"
                className="h-9 rounded-lg px-3 font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="size-4 shrink-0" />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebar
