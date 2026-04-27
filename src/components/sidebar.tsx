"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  DollarSign,
  FileText,
  User,
  LogOut,
  TrendingUp,
  Users,
  AlertTriangle,
  Wallet,
  Network,
  GraduationCap,
} from "lucide-react"

const sidebarItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Performance", href: "/dashboard/performance", icon: TrendingUp },
  { title: "My Customers", href: "/dashboard/customers", icon: Users },
  { title: "Complaints", href: "/dashboard/complaints", icon: AlertTriangle },
  { title: "Payouts", href: "/dashboard/payouts", icon: Wallet },
  { title: "Commissions", href: "/dashboard/commissions", icon: DollarSign },
  { title: "My Network", href: "/dashboard/network", icon: Network },
  { title: "Training", href: "/dashboard/training", icon: GraduationCap },
  { title: "Documents", href: "/dashboard/documents", icon: FileText },
  { title: "My Profile", href: "/dashboard/profile", icon: User },
]

import { useBranding } from "@/context/branding-context"

// ... imports

export function Sidebar() {
  const pathname = usePathname()
  const { config } = useBranding()

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-slate-50/50 dark:bg-slate-900/50">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px]">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          {config.logoUrl ? (
             <img src={config.logoUrl} alt="Logo" className="h-6 w-6 rounded-md object-cover" />
          ) : (
            <div className="h-6 w-6 rounded-md flex items-center justify-center" style={{ backgroundColor: config.primaryColor }}>
                <span className="text-white text-xs font-bold">{config.organizationName.substring(0, 1) || 'Z'}</span>
            </div>
          )}
          <span className="">{config.organizationName || 'ZGATE Portal'}</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
                <Link
                key={item.href}
                href={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-emerald-600",
                    pathname === item.href 
                    ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-50" 
                    : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
                >
                <Icon className="h-4 w-4" />
                {item.title}
                </Link>
            )
          })}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
         <div className="flex items-center justify-between px-2 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 cursor-pointer">
             <div className="flex items-center gap-3">
                 <LogOut className="h-4 w-4" />
                 <span>Sign Out</span>
             </div>
         </div>
      </div>
    </div>
  )
}
