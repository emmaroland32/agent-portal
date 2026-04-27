"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wallet, Clock, CheckCircle2, AlertCircle, Download } from "lucide-react"

type Status = "Scheduled" | "Processing" | "Paid" | "Failed" | "Withheld"

interface Payout {
  id: string
  scheduledFor: string
  paidAt: string | null
  amount: number
  withholdingTax: number
  net: number
  reference: string
  rail: "EFT" | "Mobile Money" | "Cheque"
  status: Status
}

const PAYOUTS: Payout[] = [
  { id: "PAY-2024-1109", scheduledFor: "2024-12-15", paidAt: null, amount: 5240.00, withholdingTax: 786.00, net: 4454.00, reference: "—", rail: "EFT", status: "Scheduled" },
  { id: "PAY-2024-1108", scheduledFor: "2024-11-15", paidAt: "2024-11-15", amount: 4250.00, withholdingTax: 637.50, net: 3612.50, reference: "EFT-441-872", rail: "EFT", status: "Paid" },
  { id: "PAY-2024-1107", scheduledFor: "2024-10-15", paidAt: "2024-10-15", amount: 3890.00, withholdingTax: 583.50, net: 3306.50, reference: "EFT-441-219", rail: "EFT", status: "Paid" },
  { id: "PAY-2024-1106", scheduledFor: "2024-09-15", paidAt: "2024-09-16", amount: 4120.50, withholdingTax: 618.08, net: 3502.42, reference: "EFT-440-844", rail: "EFT", status: "Paid" },
  { id: "PAY-2024-1105", scheduledFor: "2024-08-15", paidAt: "2024-08-15", amount: 3500.00, withholdingTax: 525.00, net: 2975.00, reference: "EFT-440-510", rail: "EFT", status: "Paid" },
  { id: "PAY-2024-1104", scheduledFor: "2024-07-15", paidAt: null, amount: 5600.25, withholdingTax: 840.04, net: 4760.21, reference: "—", rail: "EFT", status: "Failed" },
  { id: "PAY-2024-1103", scheduledFor: "2024-06-15", paidAt: null, amount: 4800.00, withholdingTax: 720.00, net: 4080.00, reference: "—", rail: "EFT", status: "Withheld" },
]

const statusColor: Record<Status, string> = {
  Scheduled: "bg-blue-100 text-blue-800",
  Processing: "bg-amber-100 text-amber-800",
  Paid: "bg-emerald-100 text-emerald-800",
  Failed: "bg-rose-100 text-rose-800",
  Withheld: "bg-purple-100 text-purple-800",
}

const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n)

export default function PayoutsPage() {
  const [search, setSearch] = useState("")

  const filtered = PAYOUTS.filter((p) =>
    !search ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.reference.toLowerCase().includes(search.toLowerCase()),
  )

  const totalPaidYtd = PAYOUTS.filter(p => p.status === "Paid").reduce((s, p) => s + p.net, 0)
  const totalScheduled = PAYOUTS.filter(p => p.status === "Scheduled").reduce((s, p) => s + p.net, 0)
  const totalFailed = PAYOUTS.filter(p => p.status === "Failed" || p.status === "Withheld").reduce((s, p) => s + p.amount, 0)
  const totalTax = PAYOUTS.filter(p => p.status === "Paid").reduce((s, p) => s + p.withholdingTax, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Payouts</h2>
          <p className="text-muted-foreground">
            Scheduled and historical commission payouts. Net of withholding tax.
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Tax Statement
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" /> Paid YTD (Net)
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totalPaidYtd)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-3 w-3" /> Scheduled
            </CardDescription>
            <CardTitle className="text-2xl text-blue-600">{formatCurrency(totalScheduled)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <AlertCircle className="h-3 w-3" /> Failed / Withheld
            </CardDescription>
            <CardTitle className="text-2xl text-rose-600">{formatCurrency(totalFailed)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Wallet className="h-3 w-3" /> Tax Withheld YTD
            </CardDescription>
            <CardTitle className="text-2xl">{formatCurrency(totalTax)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payout History</CardTitle>
              <CardDescription>Net pay = gross − withholding tax</CardDescription>
            </div>
            <Input
              placeholder="Search reference, ID..."
              className="w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search payouts"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Scheduled</TableHead>
                <TableHead>Paid</TableHead>
                <TableHead className="text-right">Gross</TableHead>
                <TableHead className="text-right">WHT</TableHead>
                <TableHead className="text-right">Net</TableHead>
                <TableHead>Rail</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell>{p.scheduledFor}</TableCell>
                  <TableCell>{p.paidAt ?? "—"}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(p.amount)}</TableCell>
                  <TableCell className="text-right font-mono text-muted-foreground">
                    −{formatCurrency(p.withholdingTax)}
                  </TableCell>
                  <TableCell className="text-right font-mono font-semibold">{formatCurrency(p.net)}</TableCell>
                  <TableCell>{p.rail}</TableCell>
                  <TableCell className="font-mono text-xs">{p.reference}</TableCell>
                  <TableCell>
                    <Badge className={statusColor[p.status]} variant="secondary">{p.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
