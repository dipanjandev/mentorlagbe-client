import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import DashboardSidebar from "@/components/DashboardSidebar"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="w-full flex-1">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default layout
