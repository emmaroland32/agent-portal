"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const AGENT_PROFILE = {
    name: 'Robert Wilson',
    email: 'robert.wilson@partners.zgate.com',
    phone: '+1 (555) 123-4567',
    address: '123 Finance Way, Suite 400',
    city: 'New York',
    state: 'NY',
    zip: '10005',
    licenses: [
        { type: 'Series 7', number: 'S7-987654321', expiry: '2025-12-31', status: 'Active' },
        { type: 'Series 66', number: 'S66-123456789', expiry: '2025-06-30', status: 'Active' },
        { type: 'Life & Health', number: 'LH-456789123', expiry: '2024-11-15', status: 'Expiring Soon' },
    ],
    bank: {
        bankName: 'Chase Bank',
        accountLast4: '8892',
        routing: '********'
    }
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
        <p className="text-muted-foreground">Manage your personal information and settings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
          <div className="col-span-2 space-y-6">
              <Card>
                  <CardContent className="pt-6 text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                          <AvatarImage src="/avatars/01.png" />
                          <AvatarFallback className="text-xl">RW</AvatarFallback>
                      </Avatar>
                      <h3 className="text-xl font-bold">{AGENT_PROFILE.name}</h3>
                      <p className="text-sm text-muted-foreground">Premier Agent</p>
                      <div className="mt-4 flex justify-center">
                          <Badge className="bg-emerald-600">Active</Badge>
                      </div>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader>
                      <CardTitle className="text-sm">Banking Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                              <span className="text-muted-foreground">Bank:</span>
                              <span className="font-medium">{AGENT_PROFILE.bank.bankName}</span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-muted-foreground">Account:</span>
                              <span className="font-medium">**** {AGENT_PROFILE.bank.accountLast4}</span>
                          </div>
                          <div className="mt-4">
                              <Button variant="outline" size="sm" className="w-full">Update Bank Info</Button>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>

          <div className="col-span-5 space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Contact details and address.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label className="text-sm font-medium">Full Name</label>
                              <Input defaultValue={AGENT_PROFILE.name} />
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-medium">Email</label>
                              <Input defaultValue={AGENT_PROFILE.email} readOnly />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                              <label className="text-sm font-medium">Phone</label>
                              <Input defaultValue={AGENT_PROFILE.phone} />
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-medium">Address</label>
                              <Input defaultValue={AGENT_PROFILE.address} />
                          </div>
                      </div>
                      <div className="flex justify-end">
                          <Button>Save Changes</Button>
                      </div>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>Licenses & Credentials</CardTitle>
                      <CardDescription>State and federal licenses on file.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="space-y-4">
                          {AGENT_PROFILE.licenses.map((license) => (
                              <div key={license.number} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                  <div>
                                      <p className="font-medium text-sm">{license.type}</p>
                                      <p className="text-xs text-muted-foreground">License #: {license.number}</p>
                                  </div>
                                  <div className="text-right">
                                      {license.status === 'Active' ? (
                                           <Badge variant="outline" className="border-emerald-500 text-emerald-600">Active</Badge>
                                      ) : (
                                            <Badge variant="outline" className="border-amber-500 text-amber-600">Expiring Soon</Badge>
                                      )}
                                      <p className="text-xs text-muted-foreground mt-1">Expires: {license.expiry}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  )
}
