import { Sidebar } from "@/components/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <Sidebar />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <div className="w-full flex-1">
             {/* Search or Breadcrumb could go here */}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <Bell className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium leading-none">Robert Wilson</p>
                    <p className="text-xs text-muted-foreground">Premier Agent</p>
                </div>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@robert" />
                    <AvatarFallback>RW</AvatarFallback>
                </Avatar>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
