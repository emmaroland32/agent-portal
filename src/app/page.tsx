"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { ShieldCheck } from "lucide-react"

import { useBranding } from "@/context/branding-context"

export default function LoginPage() {
  const [error, setError] = useState('')
  const { config } = useBranding()

  /*
   * There is nothing to sign in to yet.
   *
   * This posted to `http://localhost:3000/api/security/login` — a route on the staff dashboard, on a
   * different origin, which forwarded to a backend endpoint (`/api/v1/auth/agent-login`) that does not
   * exist and never did. Three separate reasons it could not work: CORS blocked the cross-origin POST,
   * the dev host was hardcoded, and the backend has no agent identity at all — no such endpoint, no
   * Agent entity. That route has since been removed, because it also handed a backend token straight
   * to the browser.
   *
   * Saying so here rather than failing with "Unable to connect to authentication server", which
   * implied there was a server to connect to. The dashboard behind this screen is reachable by URL
   * anyway: this app has no middleware and no session check, and every page renders fixed demo data.
   * See README.md for what has to exist before this form can mean anything.
   */
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('Agent sign-in is not implemented yet: this portal has no backend. See README.md.')
  }


  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900">
       <div className="w-full max-w-md px-4">
           <div className="flex justify-center mb-8">
               <div className="flex items-center gap-2">
                   {config.logoUrl ? (
                       <Image src={config.logoUrl} alt="Logo" width={40} height={40} unoptimized className="h-10 w-10 rounded-md object-cover" />
                   ) : (
                       <div className="h-10 w-10 rounded-md flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: config.primaryColor }}>
                           {config.organizationName.substring(0, 1) || 'Z'}
                       </div>
                   )}
                   <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">{config.organizationName || 'ZGATE'}</h1>
               </div>
           </div>
           
           <Card className="w-full shadow-lg">
               <CardHeader className="space-y-1">
                   <CardTitle className="text-2xl font-bold text-center">Partner Portal</CardTitle>
                   <CardDescription className="text-center">
                       Enter your agent credentials to access your dashboard
                   </CardDescription>
               </CardHeader>
               <form onSubmit={handleLogin}>
                   <CardContent className="grid gap-4">
                       {error && (
                           <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-200 text-center">
                               {error}
                           </div>
                       )}
                       <div className="grid gap-2">
                           <Label htmlFor="email">Email</Label>
                           <Input id="email" type="email" placeholder="agent@example.com" required />
                       </div>
                       <div className="grid gap-2">
                           <Label htmlFor="password">Password</Label>
                           <Input id="password" type="password" required />
                       </div>
                   </CardContent>
                   <CardFooter className="flex flex-col gap-4">
                       <Button className="w-full bg-emerald-600 hover:bg-emerald-700" type="submit">
                           Sign In
                       </Button>
                       <p className="text-xs text-center text-muted-foreground">
                           <Link href="#" className="underline hover:text-primary">Forgot your password?</Link>
                       </p>
                   </CardFooter>
               </form>
           </Card>
           
           <div className="mt-8 text-center text-sm text-muted-foreground flex items-center justify-center gap-2">
               <ShieldCheck className="h-4 w-4" />
               <span>Secured by ZGATE Identity</span>
           </div>
       </div>
    </div>
  )
}
