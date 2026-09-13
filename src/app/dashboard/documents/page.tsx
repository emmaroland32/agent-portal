"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Shield } from "lucide-react"

const DOCUMENTS = [
    { category: 'Tax Documents', items: [
        { id: '1099-2023', name: '2023 Form 1099-NEC', date: 'Jan 31, 2024', size: '154 KB' },
        { id: '1099-2022', name: '2022 Form 1099-NEC', date: 'Jan 31, 2023', size: '152 KB' },
    ]},
    { category: 'Legal Agreements', items: [
        { id: 'contract-2022', name: 'Independent Contractor Agreement', date: 'Aug 15, 2022', size: '2.4 MB' },
        { id: 'w9', name: 'Form W-9', date: 'Aug 15, 2022', size: '450 KB' },
        { id: 'nda', name: 'Non-Disclosure Agreement', date: 'Aug 15, 2022', size: '890 KB' },
    ]},
    { category: 'Compliance', items: [
        { id: 'compliance-2024', name: '2024 Compliance Handbook', date: 'Jan 1, 2024', size: '1.2 MB' },
        { id: 'ethics', name: 'Code of Ethics', date: 'Jan 1, 2024', size: '850 KB' },
    ]}
]

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Tax & Documents</h2>
        <p className="text-muted-foreground">Access your tax forms, contracts, and legal documents.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
          {DOCUMENTS.map((section) => (
              <Card key={section.category}>
                  <CardHeader>
                      <CardTitle>{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                      {section.items.map((doc) => (
                          <div key={doc.id} className="flex items-center justify-between rounded-md border p-4">
                              <div className="flex items-center gap-4">
                                  <div className="rounded-full bg-slate-100 p-2 dark:bg-slate-800">
                                      {section.category === 'Compliance' ? <Shield className="h-4 w-4 text-emerald-600" /> : <FileText className="h-4 w-4 text-emerald-600" />}
                                  </div>
                                  <div>
                                      <p className="text-sm font-medium leading-none">{doc.name}</p>
                                      <p className="text-xs text-muted-foreground">{doc.date} • {doc.size}</p>
                                  </div>
                              </div>
                              <Button variant="ghost" size="icon">
                                  <Download className="h-4 w-4" />
                              </Button>
                          </div>
                      ))}
                  </CardContent>
              </Card>
          ))}
      </div>
    </div>
  )
}
