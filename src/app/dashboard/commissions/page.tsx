"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const COMMISSIONS = [
  { id: 'COM-2024-001', period: 'October 2024', payoutDate: 'Nov 15, 2024', amount: 4250.00, status: 'Paid', items: 12 },
  { id: 'COM-2024-002', period: 'September 2024', payoutDate: 'Oct 15, 2024', amount: 3890.00, status: 'Paid', items: 10 },
  { id: 'COM-2024-003', period: 'August 2024', payoutDate: 'Sep 15, 2024', amount: 4120.50, status: 'Paid', items: 14 },
  { id: 'COM-2024-004', period: 'July 2024', payoutDate: 'Aug 15, 2024', amount: 3500.00, status: 'Paid', items: 9 },
  { id: 'COM-2024-005', period: 'June 2024', payoutDate: 'Jul 15, 2024', amount: 5600.25, status: 'Paid', items: 18 },
  { id: 'COM-2024-006', period: 'May 2024', payoutDate: 'Jun 15, 2024', amount: 4800.00, status: 'Paid', items: 15 },
]

export default function CommissionsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Commissions</h2>
          <p className="text-muted-foreground">View and download your monthly commission statements.</p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
                 <CardTitle>Commission Statements</CardTitle>
                 <CardDescription>Recent payout history</CardDescription>
            </div>
            <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search statements..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Statement ID</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Payout Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMMISSIONS.map((commission) => (
                <TableRow key={commission.id}>
                  <TableCell className="font-medium">{commission.id}</TableCell>
                  <TableCell>{commission.period}</TableCell>
                  <TableCell>{commission.payoutDate}</TableCell>
                  <TableCell>{commission.items}</TableCell>
                  <TableCell>${commission.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 hover:text-emerald-800">
                      {commission.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Download PDF</Button>
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
