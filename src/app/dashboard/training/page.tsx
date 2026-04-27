"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap, BookOpen, CheckCircle2, AlertTriangle, Award } from "lucide-react"

interface Course {
  id: string
  title: string
  category: "Compliance" | "Product" | "Sales" | "System"
  durationMinutes: number
  status: "Required" | "Recommended" | "Completed" | "Overdue"
  dueBy: string | null
  completedOn: string | null
  progressPct: number
}

const COURSES: Course[] = [
  { id: "C-1011", title: "AML & KYC Fundamentals (2024 refresher)", category: "Compliance", durationMinutes: 45, status: "Overdue", dueBy: "2024-04-15", completedOn: null, progressPct: 30 },
  { id: "C-1012", title: "Suitability & Best Interest", category: "Compliance", durationMinutes: 60, status: "Required", dueBy: "2024-05-30", completedOn: null, progressPct: 0 },
  { id: "C-1020", title: "New Bond Range Q2 2024", category: "Product", durationMinutes: 25, status: "Required", dueBy: "2024-05-10", completedOn: null, progressPct: 60 },
  { id: "C-1031", title: "Consultative Selling Masterclass", category: "Sales", durationMinutes: 90, status: "Recommended", dueBy: null, completedOn: null, progressPct: 0 },
  { id: "C-1006", title: "Onboarding & Account Opening", category: "System", durationMinutes: 30, status: "Completed", dueBy: null, completedOn: "2024-02-10", progressPct: 100 },
  { id: "C-1007", title: "Privacy & Data Handling", category: "Compliance", durationMinutes: 40, status: "Completed", dueBy: null, completedOn: "2024-03-05", progressPct: 100 },
]

const CERTS = [
  { id: "CERT-Series6", name: "Series 6 — Investment Company Products", issuedOn: "2022-08-01", expiresOn: "2025-08-01", status: "Active" },
  { id: "CERT-AMLA", name: "AMLA Compliance Certificate", issuedOn: "2024-01-12", expiresOn: "2025-01-12", status: "Active" },
  { id: "CERT-Insure", name: "General Insurance License", issuedOn: "2021-06-15", expiresOn: "2024-06-15", status: "Expiring soon" },
]

const statusColor: Record<Course["status"], string> = {
  Required: "bg-amber-100 text-amber-800",
  Recommended: "bg-blue-100 text-blue-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Overdue: "bg-rose-100 text-rose-800",
}

export default function TrainingPage() {
  const required = COURSES.filter(c => c.status === "Required" || c.status === "Overdue").length
  const overdue = COURSES.filter(c => c.status === "Overdue").length
  const completed = COURSES.filter(c => c.status === "Completed").length

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Training & Certifications</h2>
        <p className="text-muted-foreground">
          Required compliance training, product knowledge, and sales programmes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <BookOpen className="h-3 w-3" /> Outstanding required
            </CardDescription>
            <CardTitle className="text-2xl">{required}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" /> Overdue
            </CardDescription>
            <CardTitle className="text-2xl text-rose-600">{overdue}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <CheckCircle2 className="h-3 w-3" /> Completed (12mo)
            </CardDescription>
            <CardTitle className="text-2xl text-emerald-600">{completed}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> Course Catalogue
          </CardTitle>
          <CardDescription>Required and recommended modules for your role</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due / Completed</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COURSES.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.title}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell className="text-muted-foreground">{c.durationMinutes} min</TableCell>
                  <TableCell>
                    <Badge className={statusColor[c.status]} variant="secondary">{c.status}</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {c.completedOn ? `Completed ${c.completedOn}` : c.dueBy ? `Due ${c.dueBy}` : "—"}
                  </TableCell>
                  <TableCell className="w-40">
                    <div className="h-1.5 w-full rounded bg-muted">
                      <div
                        className={`h-1.5 rounded ${c.status === "Completed" ? "bg-emerald-500" : "bg-blue-500"}`}
                        style={{ width: `${c.progressPct}%` }}
                      />
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{c.progressPct}%</div>
                  </TableCell>
                  <TableCell className="text-right">
                    {c.status === "Completed" ? (
                      <Button variant="ghost" size="sm">Certificate</Button>
                    ) : (
                      <Button size="sm" variant={c.status === "Overdue" ? "destructive" : "default"}>
                        {c.progressPct > 0 ? "Continue" : "Start"}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-4 w-4" /> Active Certifications
          </CardTitle>
          <CardDescription>Licences and external credentials on file</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Credential</TableHead>
                <TableHead>Issued</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {CERTS.map((c) => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.issuedOn}</TableCell>
                  <TableCell>{c.expiresOn}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={c.status === "Active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"}
                    >
                      {c.status}
                    </Badge>
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
