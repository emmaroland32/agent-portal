"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Users, Briefcase, TrendingUp, ArrowUpRight, CreditCard, Activity } from "lucide-react"

// Mock Data
const CURRENT_AGENT = {
  id: 'agent-001',
  name: 'Robert Wilson',
  ytdEarnings: 158450,
  pendingCommissions: 12400,
  aum: 45000000,
  clientCount: 22,
  recentActivity: [
    { id: 1, type: 'Commission', description: 'Commission payout for October 2024 processed', amount: '+ $4,250.00', date: '2 days ago', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { id: 2, type: 'Client', description: 'New client onboarding: Sarah Jenkins', amount: '', date: '5 days ago', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { id: 3, type: 'System', description: 'License renewal reminder: Series 7 expires in 30 days', amount: '', date: '1 week ago', icon: Briefcase, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
    { id: 4, type: 'Commission', description: 'Commission payout for September 2024 processed', amount: '+ $3,890.00', date: '1 month ago', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  ]
}

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {CURRENT_AGENT.name}. Here&apos;s your business at a glance.</p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$158,450.00</div>
            <p className="text-xs text-muted-foreground pt-1 flex items-center text-emerald-600">
               <ArrowUpRight className="h-3 w-3 mr-1" />
               +20.1% from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payout</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,400.00</div>
            <p className="text-xs text-muted-foreground pt-1">
               Scheduled for Dec 15
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">22</div>
            <p className="text-xs text-muted-foreground pt-1 flex items-center text-emerald-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +2 this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.0M</div>
            <p className="text-xs text-muted-foreground pt-1 flex items-center text-emerald-600">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest transactions and notifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
                {CURRENT_AGENT.recentActivity.map((item) => (
                    <div key={item.id} className="flex items-center">
                        <div className={`h-9 w-9 rounded-full flex items-center justify-center border ${item.bg}`}>
                            <item.icon className={`h-5 w-5 ${item.color}`} />
                        </div>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{item.description}</p>
                            <p className="text-xs text-muted-foreground">{item.type} • {item.date}</p>
                        </div>
                        <div className="ml-auto font-medium text-sm">
                            {item.amount}
                        </div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks used daily.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <Activity className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                      <p className="text-sm font-medium leading-none">View Performance Report</p>
                      <p className="text-xs text-muted-foreground">Analyze your sales metrics</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                      <p className="text-sm font-medium leading-none">Access Marketing Library</p>
                      <p className="text-xs text-muted-foreground">Download sales brochures</p>
                  </div>
              </div>
              <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted/50 cursor-pointer transition-colors">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                      <p className="text-sm font-medium leading-none">Refer a New Agent</p>
                      <p className="text-xs text-muted-foreground">Grow your network</p>
                  </div>
              </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
