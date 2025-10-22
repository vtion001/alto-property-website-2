
"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminSignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"success" | "error" | "">("")
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "admin" as "admin" | "super_admin"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    if (!formData.username || !formData.password || !formData.confirmPassword) {
      setMessage("All fields are required")
      setMessageType("error")
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match")
      setMessageType("error")
      return false
    }

    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long")
      setMessageType("error")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch('/api/admin/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: formData.role
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Account created successfully! Redirecting to login...")
        setMessageType("success")
        setTimeout(() => {
          router.push('/admin/auth/login')
        }, 2000)
      } else {
        setMessage(data.error || "Failed to create account")
        setMessageType("error")
      }
    } catch (_error) {
      setMessage("An error occurred. Please try again.")
      setMessageType("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1 flex items-center justify-center py-12 bg-gradient-to-br from-cream via-white to-brown-50">
        <div className="container max-w-lg">
          <Card className="border border-brown-100 shadow-xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl text-brown-900 font-light">Create Admin Account</CardTitle>
              <CardDescription className="text-brown-700 font-light text-lg">
                Register for admin access to the ALTO Property dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {message && (
                  <div className={`flex items-center gap-2 p-4 rounded-lg ${
                    messageType === "success" 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}>
                    {messageType === "success" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span className="text-sm">{message}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    placeholder="Choose a username"
                    autoComplete="username"
                    className="border-brown-200 focus:border-brown-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value: "admin" | "super_admin") => handleInputChange("role", value)}>
                    <SelectTrigger className="border-brown-200 focus:border-brown-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      className="border-brown-200 focus:border-brown-400 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-brown-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-brown-600" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      className="border-brown-200 focus:border-brown-400 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-brown-600" />
                      ) : (
                        <Eye className="h-4 w-4 text-brown-600" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide py-6 h-auto text-base"
                >
                  {isLoading ? "Creating Account..." : "Create Admin Account"}
                </Button>

                <div className="text-center pt-4 border-t border-brown-100">
                  <p className="text-brown-600 mb-2">Already have an admin account?</p>
                  <Link href="/admin/auth/login">
                    <Button variant="outline" className="border-brown-300 text-brown-800 hover:bg-brown-50">
                      Login to Admin Dashboard
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-brown-900 text-cream py-8">
        <div className="container text-center">
          <p className="text-brown-200">© {new Date().getFullYear()} ALTO REAL ESTATE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
