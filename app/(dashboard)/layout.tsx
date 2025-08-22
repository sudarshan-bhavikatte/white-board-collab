import Navbar from "./_components/navbar";
import OrgSidebar from "./_components/org-sidebar";
import Sidebar from "./_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <div className="pl-[60px] flex-1 flex">
        <div className="flex gap-x-3 flex-1">
          <OrgSidebar />
          <div className="flex-1 flex flex-col">
            <Navbar />
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </div>
    </main>
  )
}

