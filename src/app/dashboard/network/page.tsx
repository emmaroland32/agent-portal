"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Network as NetIcon, ChevronRight } from "lucide-react"

interface AgentNode {
  id: string
  name: string
  initials: string
  role: string
  level: number
  ytdSales: number
  contributingPct: number
  active: boolean
}

const UPLINE: AgentNode[] = [
  { id: "U-001", name: "Stephen Mwangi", initials: "SM", role: "Regional Manager", level: 0, ytdSales: 0, contributingPct: 0, active: true },
  { id: "U-002", name: "Janet Kibira", initials: "JK", role: "Branch Manager", level: 1, ytdSales: 0, contributingPct: 0, active: true },
]

const PEERS: AgentNode[] = [
  { id: "P-002", name: "Maria Santos", initials: "MS", role: "Senior Agent", level: 2, ytdSales: 1180000, contributingPct: 0, active: true },
  { id: "P-003", name: "Elliot Park", initials: "EP", role: "Agent", level: 2, ytdSales: 870000, contributingPct: 0, active: true },
  { id: "P-004", name: "Lina Chen", initials: "LC", role: "Agent", level: 2, ytdSales: 740000, contributingPct: 0, active: true },
]

const DOWNLINE: AgentNode[] = [
  { id: "D-001", name: "Daniel Otieno", initials: "DO", role: "Junior Agent", level: 3, ytdSales: 410000, contributingPct: 12, active: true },
  { id: "D-002", name: "Faith Njeri", initials: "FN", role: "Junior Agent", level: 3, ytdSales: 358000, contributingPct: 10, active: true },
  { id: "D-003", name: "Yusuf Hassan", initials: "YH", role: "Trainee", level: 3, ytdSales: 92000, contributingPct: 3, active: true },
  { id: "D-004", name: "Brenda Adongo", initials: "BA", role: "Trainee", level: 3, ytdSales: 0, contributingPct: 0, active: false },
]

const formatCurrency = (n: number) =>
  n === 0 ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

export default function NetworkPage() {
  const downlineSales = DOWNLINE.reduce((s, d) => s + d.ytdSales, 0)
  const downlineContribution = DOWNLINE.reduce((s, d) => s + d.contributingPct, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Network</h2>
        <p className="text-muted-foreground">
          Your reporting line and the team you mentor. Override commissions are
          based on the contribution percentages below.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <NetIcon className="h-4 w-4" /> Reporting Line
          </CardTitle>
          <CardDescription>Manager → branch → you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {UPLINE.map((u) => (
              <div key={u.id} className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{u.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.role}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-md bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1">
              <Avatar className="h-8 w-8">
                <AvatarFallback>RW</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">Robert Wilson</div>
                <div className="text-xs text-emerald-700 dark:text-emerald-400">You</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Downline size</CardDescription>
            <CardTitle className="text-2xl">{DOWNLINE.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Downline YTD Sales</CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(downlineSales)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Override % to you</CardDescription>
            <CardTitle className="text-2xl">{downlineContribution}%</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Downline</CardTitle>
          <CardDescription>Junior agents you mentor</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">YTD Sales</TableHead>
                <TableHead className="text-right">Override %</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DOWNLINE.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8"><AvatarFallback>{d.initials}</AvatarFallback></Avatar>
                      <span className="font-medium">{d.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{d.role}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(d.ytdSales)}</TableCell>
                  <TableCell className="text-right">{d.contributingPct}%</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={d.active
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-700"}
                    >
                      {d.active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Peers (same branch)</CardTitle>
          <CardDescription>Reference only — leaderboard view</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">YTD Sales</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PEERS.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8"><AvatarFallback>{p.initials}</AvatarFallback></Avatar>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{p.role}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(p.ytdSales)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
