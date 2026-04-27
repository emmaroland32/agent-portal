"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Clock, CheckCircle2, MessageSquare, Plus } from "lucide-react"

type Status = "Open" | "In Review" | "Awaiting Customer" | "Resolved" | "Escalated"
type Priority = "Low" | "Medium" | "High" | "Critical"

interface Complaint {
  id: string
  customer: string
  category: string
  priority: Priority
  status: Status
  raisedAt: string
  ageDays: number
  summary: string
}

const COMPLAINTS: Complaint[] = [
  { id: "DIS-2024-0142", customer: "Akinyi Otieno", category: "Mis-selling", priority: "High", status: "Escalated", raisedAt: "2024-04-12", ageDays: 14, summary: "Claims fund risk profile not communicated at sale." },
  { id: "DIS-2024-0141", customer: "Brian Karanja", category: "Statement Discrepancy", priority: "Medium", status: "In Review", raisedAt: "2024-04-18", ageDays: 8, summary: "March statement missing dividend credit of $1,250." },
  { id: "DIS-2024-0140", customer: "Diana Achieng", category: "Service Delay", priority: "Low", status: "Awaiting Customer", raisedAt: "2024-04-19", ageDays: 7, summary: "Account opening took 11 business days." },
  { id: "DIS-2024-0138", customer: "Susan Wairimu", category: "Statement Discrepancy", priority: "Medium", status: "Resolved", raisedAt: "2024-04-02", ageDays: 24, summary: "Reconciled — broker fee was reversed." },
  { id: "DIS-2024-0136", customer: "Eric Njoroge", category: "Mis-selling", priority: "Critical", status: "Open", raisedAt: "2024-04-23", ageDays: 3, summary: "Unauthorised switch into structured product." },
]

const statusColor: Record<Status, string> = {
  "Open": "bg-rose-100 text-rose-800",
  "In Review": "bg-amber-100 text-amber-800",
  "Awaiting Customer": "bg-blue-100 text-blue-800",
  "Resolved": "bg-emerald-100 text-emerald-800",
  "Escalated": "bg-purple-100 text-purple-800",
}

const priorityColor: Record<Priority, string> = {
  Low: "bg-slate-200 text-slate-700",
  Medium: "bg-amber-100 text-amber-800",
  High: "bg-rose-100 text-rose-800",
  Critical: "bg-red-600 text-white",
}

export default function ComplaintsPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<Status | "ALL">("ALL")

  const filtered = COMPLAINTS.filter((c) => {
    const matchSearch =
      !search ||
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.customer.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === "ALL" || c.status === statusFilter
    return matchSearch && matchStatus
  })

  const open = COMPLAINTS.filter(c => c.status === "Open" || c.status === "In Review").length
  const escalated = COMPLAINTS.filter(c => c.status === "Escalated").length
  const resolved = COMPLAINTS.filter(c => c.status === "Resolved").length
  const breach = COMPLAINTS.filter(c => c.status !== "Resolved" && c.ageDays > 10).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Complaints & Disputes</h2>
          <p className="text-muted-foreground">
            Customer complaints assigned to you. SLA breaches age past 10 days.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Log Complaint
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Clock className="h-3 w-3" /> Open
            </CardDescription>
            <CardTitle className="text-2xl">{open}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" /> Escalated
            </CardDescription>
            <CardTitle className="text-2xl text-purple-600">{escalated}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" /> SLA Breach
            </CardDescription>
            <CardTitle className="text-2xl text-rose-600">{breach}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" /> Resolved
            </CardDescription>
            <CardTitle className="text-2xl text-emerald-600">{resolved}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Complaint Queue</CardTitle>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search complaints..."
                className="w-64"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search complaints"
              />
              <select
                className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Status | "ALL")}
                aria-label="Filter by status"
              >
                <option value="ALL">All statuses</option>
                {(Object.keys(statusColor) as Status[]).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Raised</TableHead>
                <TableHead className="text-right">Age (d)</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-12">
                    No complaints match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono text-xs">{c.id}</TableCell>
                    <TableCell>{c.customer}</TableCell>
                    <TableCell>{c.category}</TableCell>
                    <TableCell>
                      <Badge className={priorityColor[c.priority]} variant="secondary">{c.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusColor[c.status]} variant="secondary">{c.status}</Badge>
                    </TableCell>
                    <TableCell>{c.raisedAt}</TableCell>
                    <TableCell className={`text-right ${c.ageDays > 10 && c.status !== "Resolved" ? "text-rose-600 font-semibold" : ""}`}>
                      {c.ageDays}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" aria-label={`Reply to ${c.id}`}>
                        <MessageSquare className="mr-1 h-3 w-3" />
                        Reply
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
