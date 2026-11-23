import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/DashboardSidebar"

// Next.js-কে নির্দেশ দেওয়া হলো যেন ড্যাশবোর্ডের সব রাউট ডাইনামিকলি সার্ভারে রেন্ডার হয়
export const dynamic = "force-dynamic"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile / Tablet Top Header with Sidebar Trigger */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border/70 bg-background/90 px-4 backdrop-blur-md md:hidden">
          <SidebarTrigger />
          <span className="text-sm font-semibold tracking-tight text-foreground">
            MentorLagbe Workspace
          </span>
        </header>

        <main className="w-full min-w-0 flex-1">{children}</main>
      </div>
    </SidebarProvider>
  )
}

export default layout
