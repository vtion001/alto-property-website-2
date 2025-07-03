"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, Shield, Gift, X } from "lucide-react"

interface LeadCapturePopupProps {
  onClose: () => void
}

interface FormData {
  name: string
  email: string
  phone: string
  propertyAddress: string
  currentManager: string
}

export function LeadCapturePopup({ onClose }: LeadCapturePopupProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    currentManager: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here (e.g., send data to a server)
    console.log("Form Data:", formData)
    onClose()
  }

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl border-2 border-brown-200 relative">
      <CardHeader className="text-center pb-1 bg-gradient-to-br from-brown-50 to-cream">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-brown-50 rounded-full transition-colors z-10"
        >
          <X className="h-5 w-5 text-brown-600" />
        </button>
        <div className="flex justify-center mb-1">
          <div className="bg-brown-100 p-3 rounded-full">
            <Gift className="h-6 w-6 text-brown-700" />
          </div>
        </div>
        <Badge className="bg-red-500 text-white mb-1 mx-auto text-xs">Limited Time Offer</Badge>
        <CardTitle className="text-2xl font-light text-brown-800 mb-1">Exclusive Property Management Deal</CardTitle>
        <CardDescription className="text-base text-brown-700">
          Switch to Alto Property Group and unlock exceptional value
        </CardDescription>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 mb-4">
          <div className="text-center p-2 bg-brown-50 rounded-xl">
            <div className="bg-brown-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="h-4 w-4 text-brown-700" />
            </div>
            <h3 className="font-medium text-brown-800 mb-1 text-sm">Beat Your Rate</h3>
            <p className="text-xs text-brown-600">We'll beat your current management fee by 1%*</p>
          </div>

          <div className="text-center p-2 bg-brown-50 rounded-xl">
            <div className="bg-brown-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
              <Clock className="h-4 w-4 text-brown-700" />
            </div>
            <h3 className="font-medium text-brown-800 mb-1 text-sm">First Month Free</h3>
            <p className="text-xs text-brown-600">No management fees for your first month with us</p>
          </div>

          <div className="text-center p-2 bg-brown-50 rounded-xl">
            <div className="bg-brown-100 w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2">
              <Shield className="h-4 w-4 text-brown-700" />
            </div>
            <h3 className="font-medium text-brown-800 mb-1 text-sm">Free Appraisal</h3>
            <p className="text-xs text-brown-600">Complimentary property and rental assessment</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-brown-900">Full Name *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="John Smith"
                className="border-brown-200 focus:border-brown-400 h-8 text-sm"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-brown-900">Email Address *</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                className="border-brown-200 focus:border-brown-400 h-8 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-xs font-medium text-brown-900">Phone Number *</label>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(07) 1234 5678"
                className="border-brown-200 focus:border-brown-400 h-8 text-sm"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-brown-900">Property Address</label>
              <Input
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleInputChange}
                placeholder="123 Main Street, Brisbane"
                className="border-brown-200 focus:border-brown-400 h-8 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-brown-900">Current Property Manager (Optional)</label>
            <Input
              name="currentManager"
              value={formData.currentManager}
              onChange={handleInputChange}
              placeholder="Current management company name"
              className="border-brown-200 focus:border-brown-400 h-8 text-sm"
            />
          </div>

          <div className="bg-brown-50 p-3 rounded-lg">
            <h4 className="font-medium text-brown-800 mb-1 text-sm">What You'll Get:</h4>
            <ul className="text-xs text-brown-700 space-y-0.5">
              <li>✓ Comprehensive property and rental market analysis</li>
              <li>✓ Personalized management fee comparison</li>
              <li>✓ No-obligation consultation with our property specialists</li>
              <li>✓ Detailed switching process explanation</li>
            </ul>
          </div>

          <Button
            type="submit"
            className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-2 h-auto font-medium tracking-wide text-base"
          >
            Claim Your Exclusive Offer
          </Button>

          <p className="text-xs text-brown-500 text-center leading-tight">
            * Terms and conditions apply. Offer valid for new clients only. Minimum 12-month management agreement
            required. We'll beat your current rate by 1% or provide first month free (whichever is greater value).
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
