"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  Plus,
  Mail,
  Phone,
  Filter,
} from "lucide-react"

type Stage = "Prospect" | "Qualified" | "Proposal" | "Won" | "Lost"

interface Customer {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  segment: "Retail" | "Premier" | "Private"
  stage: Stage
  aum: number
  nextAction: string
  daysIdle: number
}

const CUSTOMERS: Customer[] = [
  { id: "C-001", name: "Akinyi Otieno", initials: "AO", email: "akinyi@example.com", phone: "+254 712 332 991", segment: "Premier", stage: "Won", aum: 248000, nextAction: "Quarterly review", daysIdle: 4 },
  { id: "C-002", name: "James Mutua", initials: "JM", email: "j.mutua@example.com", phone: "+254 720 884 211", segment: "Retail", stage: "Proposal", aum: 0, nextAction: "Send fund factsheet", daysIdle: 2 },
  { id: "C-003", name: "Diana Achieng", initials: "DA", email: "d.achieng@example.com", phone: "+254 733 559 010", segment: "Retail", stage: "Qualified", aum: 0, nextAction: "Discovery call", daysIdle: 6 },
  { id: "C-004", name: "Brian Karanja", initials: "BK", email: "brian.k@example.com", phone: "+254 715 670 012", segment: "Private", stage: "Won", aum: 1240000, nextAction: "Tax-loss harvest review", daysIdle: 12 },
  { id: "C-005", name: "Nasra Ali", initials: "NA", email: "nasra.ali@example.com", phone: "+254 707 998 211", segment: "Premier", stage: "Prospect", aum: 0, nextAction: "Initial outreach", daysIdle: 1 },
  { id: "C-006", name: "Peter Mwangi", initials: "PM", email: "p.mwangi@example.com", phone: "+254 711 226 014", segment: "Retail", stage: "Lost", aum: 0, nextAction: "Mark closed", daysIdle: 21 },
  { id: "C-007", name: "Susan Wairimu", initials: "SW", email: "s.wairimu@example.com", phone: "+254 729 312 488", segment: "Premier", stage: "Won", aum: 412500, nextAction: "Annual review", daysIdle: 30 },
  { id: "C-008", name: "Eric Njoroge", initials: "EN", email: "e.njoroge@example.com", phone: "+254 700 901 220", segment: "Retail", stage: "Proposal", aum: 0, nextAction: "Awaiting decision", daysIdle: 8 },
]

const STAGES: Stage[] = ["Prospect", "Qualified", "Proposal", "Won", "Lost"]

const stageColor: Record<Stage, string> = {
  Prospect: "bg-slate-200 text-slate-800",
  Qualified: "bg-blue-100 text-blue-800",
  Proposal: "bg-amber-100 text-amber-800",
  Won: "bg-emerald-100 text-emerald-800",
  Lost: "bg-rose-100 text-rose-800",
}

const formatCurrency = (n: number) =>
  n === 0 ? "—" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)

export default function CustomersPage() {
  const [search, setSearch] = useState("")
  const [stageFilter, setStageFilter] = useState<Stage | "ALL">("ALL")

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
    const matchStage = stageFilter === "ALL" || c.stage === stageFilter
    return matchSearch && matchStage
  })

  const stageCounts = STAGES.reduce<Record<Stage, number>>((acc, s) => {
    acc[s] = CUSTOMERS.filter((c) => c.stage === s).length
    return acc
  }, { Prospect: 0, Qualified: 0, Proposal: 0, Won: 0, Lost: 0 })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Customers</h2>
          <p className="text-muted-foreground">
            Pipeline view of every prospect and customer assigned to you.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        {STAGES.map((s) => (
          <Card
            key={s}
            className={`cursor-pointer transition-colors ${
              stageFilter === s ? "border-emerald-500 ring-1 ring-emerald-500" : ""
            }`}
            onClick={() => setStageFilter(stageFilter === s ? "ALL" : s)}
          >
            <CardHeader className="pb-2">
              <CardDescription>{s}</CardDescription>
              <CardTitle className="text-2xl">{stageCounts[s]}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer List</CardTitle>
              <CardDescription>
                {filtered.length} of {CUSTOMERS.length} record(s)
                {stageFilter !== "ALL" && ` · filtered by ${stageFilter}`}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, ID..."
                  className="pl-8"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search customers"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStageFilter("ALL")}
                aria-label="Clear filter"
              >
                <Filter className="mr-2 h-4 w-4" /> Clear
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead className="text-right">AUM</TableHead>
                <TableHead>Next Action</TableHead>
                <TableHead className="text-right">Idle (days)</TableHead>
                <TableHead className="text-right">Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground py-12">
                    No customers match your filters.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{c.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{c.name}</div>
                          <div className="text-xs text-muted-foreground">{c.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{c.segment}</TableCell>
                    <TableCell>
                      <Badge className={stageColor[c.stage]} variant="secondary">{c.stage}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono">{formatCurrency(c.aum)}</TableCell>
                    <TableCell>{c.nextAction}</TableCell>
                    <TableCell className={`text-right ${c.daysIdle > 14 ? "text-rose-600" : ""}`}>
                      {c.daysIdle}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" aria-label={`Email ${c.name}`} className="h-7 w-7">
                          <Mail className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" aria-label={`Call ${c.name}`} className="h-7 w-7">
                          <Phone className="h-3.5 w-3.5" />
                        </Button>
                      </div>
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
