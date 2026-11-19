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
  UserCog,
  Home,
  LogOut,
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

const menuItemByRole: Record<TUserRole, ISidebarMenuItem[]> = {
  student: [
    { title: "Overview", url: "/dashboard/student", icon: LayoutDashboard },
    {
      title: "My Applications",
      url: "/dashboard/student/my-applications",
      icon: FileText,
    },
    { title: "Update Profile", url: "/dashboard/profile", icon: UserCog },
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
    { title: "Update Profile", url: "/dashboard/profile", icon: UserCog },
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
    { title: "Update Profile", url: "/dashboard/profile", icon: UserCog },
  ],
}

const DashboardSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()
  const role: TUserRole = (session?.user?.role as TUserRole) || "student"
  const menuItems = menuItemByRole[role] || menuItemByRole.student

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">
            MentorLagbe
          </span>
        </Link>
        {session?.user && (
          <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
            <span className="truncate font-medium text-foreground">
              {session.user.name}
            </span>
            <span className="w-fit rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] capitalize">
              {role}
            </span>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wider capitalize">
            {role} Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((menuItem) => {
                const Icon = menuItem.icon
                const isActive = pathname === menuItem.url

                return (
                  <SidebarMenuItem key={menuItem.title}>
                    <SidebarMenuButton
                      render={<Link href={menuItem.url} />}
                      isActive={isActive}
                      tooltip={menuItem.title}
                    >
                      <Icon className="size-4" />
                      <span>{menuItem.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/" />}
              tooltip="Back to Home"
            >
              <Home className="size-4" />
              <span>Back to Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {session?.user && (
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={async () => {
                  await signOut()
                  router.push("/")
                  router.refresh()
                }}
                tooltip="Sign Out"
              >
                <LogOut className="size-4" />
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
