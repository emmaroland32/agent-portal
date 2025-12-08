"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle2, ChevronRight, Upload, FileText, CreditCard, User, Gavel } from "lucide-react"

type Step = 'personal' | 'licenses' | 'contract' | 'banking' | 'complete'

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>('personal')
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      licenseType: '',
      licenseNumber: '',
      bankName: '',
      accountNumber: '',
      routingNumber: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target
      setFormData(prev => ({ ...prev, [id]: value }))
  }

  const nextStep = (next: Step) => {
      setCurrentStep(next)
  }

  const renderStepIndicator = () => {
      const steps = [
          { id: 'personal', label: 'Personal', icon: User },
          { id: 'licenses', label: 'Licenses', icon: FileText },
          { id: 'contract', label: 'Contract', icon: Gavel },
          { id: 'banking', label: 'Banking', icon: CreditCard },
      ]

      const currentIndex = steps.findIndex(s => s.id === currentStep)
      
      if (currentStep === 'complete') return null

      return (
          <div className="flex justify-between items-center mb-8 px-4">
              {steps.map((step, index) => {
                  const isActive = step.id === currentStep
                  const isCompleted = currentIndex > index
                  const Icon = step.icon

                  return (
                      <div key={step.id} className="flex flex-col items-center relative z-10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                              isActive ? 'border-emerald-600 bg-emerald-50 text-emerald-600' :
                              isCompleted ? 'border-emerald-600 bg-emerald-600 text-white' :
                              'border-slate-200 bg-white text-slate-400'
                          }`}>
                              {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                          </div>
                          <span className={`text-xs mt-2 font-medium ${
                              isActive ? 'text-emerald-700' : 
                              isCompleted ? 'text-emerald-600' : 
                              'text-slate-400'
                          }`}>
                              {step.label}
                          </span>
                      </div>
                  )
              })}
              {/* Progress Bar Background - simplified for this demo */}
              <div className="absolute top-[4.5rem] left-0 w-full h-0.5 bg-slate-100 -z-0 hidden md:block" /> 
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
             <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">ZGATE Agent Onboarding</h1>
             <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Complete your registration to join our network.</p>
        </div>

        {renderStepIndicator()}

        <Card className="shadow-lg">
           {currentStep === 'personal' && (
               <>
                   <CardHeader>
                       <CardTitle>Personal Information</CardTitle>
                       <CardDescription>Tell us about yourself.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                       <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                               <Label htmlFor="firstName">First Name</Label>
                               <Input id="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} />
                           </div>
                           <div className="space-y-2">
                               <Label htmlFor="lastName">Last Name</Label>
                               <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} />
                           </div>
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="email">Email Address</Label>
                           <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} />
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="phone">Phone Number</Label>
                           <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange} />
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="address">Mailing Address</Label>
                           <Input id="address" placeholder="123 Main St, City, ST 12345" value={formData.address} onChange={handleInputChange} />
                       </div>
                   </CardContent>
                   <CardFooter>
                       <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => nextStep('licenses')}>
                           Next Step <ChevronRight className="ml-2 w-4 h-4" />
                       </Button>
                   </CardFooter>
               </>
           )}

           {currentStep === 'licenses' && (
               <>
                   <CardHeader>
                       <CardTitle>Licenses & Credentials</CardTitle>
                       <CardDescription>Upload your active licenses.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                       <div className="space-y-2">
                           <Label htmlFor="licenseType">License Type</Label>
                           <Input id="licenseType" placeholder="e.g. Series 7, Life & Health" value={formData.licenseType} onChange={handleInputChange} />
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="licenseNumber">License Number</Label>
                           <Input id="licenseNumber" placeholder="Enter license number" value={formData.licenseNumber} onChange={handleInputChange} />
                       </div>
                       <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-colors">
                           <Upload className="h-8 w-8 text-slate-400 mb-2" />
                           <p className="text-sm font-medium">Upload License Document</p>
                           <p className="text-xs text-slate-500">PDF or JPG up to 5MB</p>
                       </div>
                   </CardContent>
                   <CardFooter className="flex justify-between">
                       <Button variant="ghost" onClick={() => nextStep('personal')}>Back</Button>
                       <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => nextStep('contract')}>
                           Next Step <ChevronRight className="ml-2 w-4 h-4" />
                       </Button>
                   </CardFooter>
               </>
           )}

           {currentStep === 'contract' && (
               <>
                   <CardHeader>
                       <CardTitle>Contract Review</CardTitle>
                       <CardDescription>Please review and sign the Independent Contractor Agreement.</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                       <div className="h-48 bg-slate-50 rounded-md p-4 text-xs text-slate-600 overflow-y-auto border">
                           <p className="font-bold mb-2">INDEPENDENT CONTRACTOR AGREEMENT</p>
                           <p>This Agreement is made between ZGATE ("Company") and the undersigned Agent ("Contractor")...</p>
                           <br />
                           <p>1. RELATIONSHIP. Contractor serves as an independent agent and not an employee...</p>
                           <p>2. COMPENSATION. Contractor shall be paid commissions according to the current schedule...</p>
                           <p>...</p>
                       </div>
                       <div className="flex items-center space-x-2">
                           <input type="checkbox" id="terms" className="rounded border-gray-300" />
                           <Label htmlFor="terms" className="text-sm">I have read and agree to the terms above.</Label>
                       </div>
                   </CardContent>
                   <CardFooter className="flex justify-between">
                       <Button variant="ghost" onClick={() => nextStep('licenses')}>Back</Button>
                       <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => nextStep('banking')}>
                           Accept & Continue <ChevronRight className="ml-2 w-4 h-4" />
                       </Button>
                   </CardFooter>
               </>
           )}

            {currentStep === 'banking' && (
               <>
                   <CardHeader>
                       <CardTitle>Banking Information</CardTitle>
                       <CardDescription>Where should we send your commissions?</CardDescription>
                   </CardHeader>
                   <CardContent className="space-y-4">
                       <div className="space-y-2">
                           <Label htmlFor="bankName">Bank Name</Label>
                           <Input id="bankName" placeholder="e.g. Chase Bank" value={formData.bankName} onChange={handleInputChange} />
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="accountNumber">Account Number</Label>
                           <Input id="accountNumber" type="password" placeholder="Likely 8-12 digits" value={formData.accountNumber} onChange={handleInputChange} />
                       </div>
                       <div className="space-y-2">
                           <Label htmlFor="routingNumber">Routing Number</Label>
                           <Input id="routingNumber" placeholder="9 digits" value={formData.routingNumber} onChange={handleInputChange} />
                       </div>
                   </CardContent>
                   <CardFooter className="flex justify-between">
                       <Button variant="ghost" onClick={() => nextStep('contract')}>Back</Button>
                       <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => nextStep('complete')}>
                           Submit Application
                       </Button>
                   </CardFooter>
               </>
           )}

           {currentStep === 'complete' && (
               <div className="text-center py-8">
                   <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                       <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Submitted!</h2>
                   <p className="text-slate-600 max-w-xs mx-auto mb-8">
                       Your profile is under review. You can now access your dashboard to track your status.
                   </p>
                   <Button className="bg-emerald-600 hover:bg-emerald-700 w-full max-w-xs" onClick={() => router.push('/dashboard')}>
                       Go to Dashboard
                   </Button>
               </div>
           )}
        </Card>
      </div>
    </div>
  )
}
