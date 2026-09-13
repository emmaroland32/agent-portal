"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label"
import { ShieldCheck } from "lucide-react"

import { useBranding } from "@/context/branding-context"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const { config } = useBranding()

  const handleLogin = async (e: React.FormEvent) => {
    // ... same as before
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const email = (document.getElementById('email') as HTMLInputElement).value
    const password = (document.getElementById('password') as HTMLInputElement).value

    try {
      const res = await fetch('http://localhost:3000/api/security/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (res.status === 503) {
        setMaintenanceMode(true)
        setError(data.error)
        return
      }

      if (!res.ok) {
        setError(data.error || 'Login failed')
        return
      }

      // Successful login
      router.push("/dashboard")
    } catch (err) {
      console.error('Login error:', err)
      setError('Unable to connect to authentication server.')
    } finally {
      setLoading(false)
    }
  }

  if (maintenanceMode) {
     // ... same as before
     return (
        <div className="flex h-screen w-full items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
             <Card className="w-full max-w-md border-red-200 dark:border-red-900 shadow-xl">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-red-100 p-3 rounded-full w-fit mb-4">
                        <ShieldCheck className="h-8 w-8 text-red-600" />
                    </div>
                    <CardTitle className="text-xl text-red-700">Portal Under Maintenance</CardTitle>
                    <CardDescription>
                        {error || "The Agent Portal is currently offline for scheduled maintenance. Please try again later."}
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>Check Status</Button>
                </CardFooter>
             </Card>
        </div>
     )
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
                           <Input id="email" type="email" placeholder="agent@example.com" required disabled={loading} />
                       </div>
                       <div className="grid gap-2">
                           <Label htmlFor="password">Password</Label>
                           <Input id="password" type="password" required disabled={loading} />
                       </div>
                   </CardContent>
                   <CardFooter className="flex flex-col gap-4">
                       <Button className="w-full bg-emerald-600 hover:bg-emerald-700" type="submit" disabled={loading}>
                           {loading ? 'Verifying...' : 'Sign In'}
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
