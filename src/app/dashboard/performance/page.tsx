"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Trophy,
  ArrowUpRight,
  Users,
} from "lucide-react"

const KPIS = [
  { label: "Sales YTD", value: "$1.24M", change: "+18.4%", trend: "up", target: "$1.5M", progress: 82 },
  { label: "New Clients", value: "47", change: "+12", trend: "up", target: "60", progress: 78 },
  { label: "AUM Managed", value: "$24.8M", change: "+4.1%", trend: "up", target: "$30M", progress: 83 },
  { label: "Retention Rate", value: "94.2%", change: "-1.3%", trend: "down", target: "95%", progress: 99 },
]

const PRODUCT_MIX = [
  { product: "Mutual Funds", revenue: 412000, share: 33.2 },
  { product: "Insurance", revenue: 298000, share: 24.0 },
  { product: "Term Deposits", revenue: 215000, share: 17.3 },
  { product: "Bonds", revenue: 178000, share: 14.4 },
  { product: "Structured Products", revenue: 137000, share: 11.1 },
]

const QUARTERS = [
  { period: "Q1 2024", sales: 286000, target: 300000, clients: 11 },
  { period: "Q2 2024", sales: 312000, target: 325000, clients: 13 },
  { period: "Q3 2024", sales: 348000, target: 350000, clients: 12 },
  { period: "Q4 2024 (in progress)", sales: 294000, target: 375000, clients: 11 },
]

const RANKINGS = [
  { rank: 1, name: "Robert Wilson (you)", territory: "North Region", score: 9420, isMe: true },
  { rank: 2, name: "Maria Santos", territory: "Central Region", score: 9280 },
  { rank: 3, name: "Elliot Park", territory: "North Region", score: 8910 },
  { rank: 4, name: "Lina Chen", territory: "South Region", score: 8740 },
  { rank: 5, name: "Daniel Otieno", territory: "East Region", score: 8480 },
]

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Performance</h2>
        <p className="text-muted-foreground">
          Track your KPIs, product mix, and standing against your peer group.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {KPIS.map((kpi) => {
          const Trend = kpi.trend === "up" ? TrendingUp : TrendingDown
          const trendColor = kpi.trend === "up" ? "text-emerald-600" : "text-rose-600"
          return (
            <Card key={kpi.label}>
              <CardHeader className="pb-2">
                <CardDescription>{kpi.label}</CardDescription>
                <CardTitle className="text-2xl">{kpi.value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`flex items-center text-xs ${trendColor}`}>
                  <Trend className="mr-1 h-3 w-3" />
                  {kpi.change} vs last period
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Progress to {kpi.target}</span>
                    <span>{kpi.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-muted">
                    <div
                      className="h-1.5 rounded bg-emerald-500"
                      style={{ width: `${Math.min(kpi.progress, 100)}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-4 w-4" /> Quarterly Sales vs Target
            </CardTitle>
            <CardDescription>Annualised revenue tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quarter</TableHead>
                  <TableHead className="text-right">Sales</TableHead>
                  <TableHead className="text-right">Target</TableHead>
                  <TableHead className="text-right">New Clients</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {QUARTERS.map((q) => {
                  const variance = q.sales - q.target
                  return (
                    <TableRow key={q.period}>
                      <TableCell className="font-medium">{q.period}</TableCell>
                      <TableCell className="text-right">{formatCurrency(q.sales)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(q.target)}</TableCell>
                      <TableCell className="text-right">{q.clients}</TableCell>
                      <TableCell className={`text-right ${variance >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                        {variance >= 0 ? "+" : ""}{formatCurrency(variance)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpRight className="h-4 w-4" /> Product Mix
            </CardTitle>
            <CardDescription>Revenue breakdown by product line</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {PRODUCT_MIX.map((p) => (
                <div key={p.product}>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{p.product}</span>
                    <span className="text-muted-foreground">
                      {formatCurrency(p.revenue)} · {p.share}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded bg-muted mt-1">
                    <div
                      className="h-1.5 rounded bg-emerald-500"
                      style={{ width: `${p.share}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-4 w-4" /> Peer Leaderboard
          </CardTitle>
          <CardDescription>Top performers across your tier this quarter</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Agent</TableHead>
                <TableHead>Territory</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RANKINGS.map((r) => (
                <TableRow key={r.rank} className={r.isMe ? "bg-emerald-50 dark:bg-emerald-950/20" : ""}>
                  <TableCell className="font-medium">#{r.rank}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    {r.name}
                    {r.isMe && <Badge variant="secondary">You</Badge>}
                  </TableCell>
                  <TableCell>{r.territory}</TableCell>
                  <TableCell className="text-right font-mono">{r.score.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
