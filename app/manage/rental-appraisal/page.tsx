"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Calculator, TrendingUp, Clock, CheckCircle, DollarSign, FileText } from "lucide-react"
import Image from "next/image"

export default function RentalAppraisalPage() {
  const [formData, setFormData] = useState({
    address: '',
    phone: '',
    terms: false
  });
  const [errors, setErrors] = useState({
    address: '',
    phone: '',
    terms: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {
      address: '',
      phone: '',
      terms: ''
    };

    if (!formData.address.trim()) {
      newErrors.address = 'Property address is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.terms) {
      newErrors.terms = 'You must agree to receive communications';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({
        address: 'Submission failed. Please try again.',
        phone: '',
        terms: ''
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.address.trim() && formData.phone.trim() && formData.terms;

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center space-y-8 p-8">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-4xl font-light text-brown-800">Thank You!</h1>
              <p className="text-xl text-brown-700 leading-relaxed">
                Your rental appraisal request has been submitted successfully. Our team will contact you within 24 hours with your comprehensive rental market analysis.
              </p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-brown-800 hover:bg-brown-900 text-cream font-light px-8 py-3"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </main>
        <footer className="bg-brown-900 text-cream py-16">
          <div className="container">
            <div className="text-center">
              <p className="text-brown-200">© {new Date().getFullYear()} Alto Property Group. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-cream via-white to-brown-50">
          <div className="container relative">
            <div className="grid gap-20 lg:grid-cols-2 items-center">
              <div className="space-y-12">
                <div className="space-y-8">
                  <div className="inline-block">
                    <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Rental Appraisal</div>
                    <div className="w-16 h-px bg-brown-300"></div>
                  </div>
                  <h1 className="text-6xl font-extralight tracking-tight sm:text-7xl lg:text-8xl text-brown-800 leading-none">
                    Professional
                    <span className="block font-light text-brown-700 mt-2">Rental</span>
                    <span className="block font-extralight text-brown-600 mt-2">Appraisal</span>
                  </h1>
                  <p className="text-xl font-light text-brown-700 max-w-xl leading-relaxed">
                    Get an accurate rental assessment with comprehensive market analysis, comparable property data, and
                    strategic recommendations to maximize your rental income potential.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6">
                  <Button
                    size="lg"
                    className="bg-brown-800 hover:bg-brown-900 text-cream font-light tracking-wide px-12 py-6 h-auto text-base"
                    onClick={() => {
                      document.getElementById('appraisal-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Get Free Rental Appraisal
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-light tracking-wide px-12 py-6 h-auto text-base border-brown-300 text-brown-800 hover:bg-brown-50 bg-transparent"
                  >
                    View Sample Report
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://res.cloudinary.com/dbviya1rj/image/upload/v1758098419/wwffwu6cjckz0btcqni0.jpg?height=500&width=400"
                    alt="Professional rental appraisal and market analysis"
                    width={400}
                    height={500}
                    className="object-cover w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appraisal Form */}
        <section id="appraisal-form" className="py-32 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-8 mb-16">
                <h2 className="text-5xl font-extralight sm:text-6xl text-brown-800">Request Your Rental Appraisal</h2>
                <p className="text-xl font-light text-brown-700">
                  Complete this comprehensive form to receive a detailed rental market analysis within 24 hours,
                  including comparable rental data and income optimization strategies.
                </p>
              </div>

              <Card className="border border-brown-100 shadow-xl">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl text-brown-900 font-light">Rental Appraisal Request</CardTitle>
                  <CardDescription className="text-brown-700 font-light text-lg">
                    Provide detailed property information for accurate rental assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <form onSubmit={handleSubmit} noValidate className="space-y-8">
                    {/* Property Information */}
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="address">Property Address *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="Enter the complete property address"
                          className={`border-brown-200 focus:border-brown-400 ${errors.address ? 'border-red-500' : ''}`}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="Enter your phone number"
                          className={`border-brown-200 focus:border-brown-400 ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* Terms and Submit */}
                    <div className="space-y-6">
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={formData.terms}
                          onCheckedChange={(checked) => handleInputChange('terms', checked)}
                        />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to receive my rental appraisal report and marketing communications from Alto Property
                          Group *
                        </Label>
                      </div>
                      {errors.terms && (
                        <p className="text-red-500 text-sm">{errors.terms}</p>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        disabled={!isFormValid || isSubmitting}
                        className={`w-full font-light tracking-wide py-6 h-auto text-base ${
                          !isFormValid || isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed text-gray-600'
                            : 'bg-brown-800 hover:bg-brown-900 text-cream'
                        }`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Get My Free Rental Appraisal'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-24 bg-brown-50">
          <div className="container">
            <div className="text-center space-y-8 mb-16">
              <h2 className="text-4xl font-light sm:text-5xl text-brown-800">Your Comprehensive Rental Report</h2>
              <p className="text-xl font-light text-brown-700 max-w-3xl mx-auto">
                Our detailed rental appraisal provides strategic insights to maximize your property's rental potential
                and investment returns.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calculator className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Rental Market Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Comprehensive analysis of comparable rental properties, current market rates, and demand trends in
                    your area.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingUp className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Income Optimization</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Strategic recommendations to maximize rental income including pricing strategies and property
                    improvements.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Market Timing</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Optimal timing recommendations based on seasonal rental patterns and market demand cycles.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <DollarSign className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">ROI Analysis</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Detailed return on investment calculations including rental yield, cash flow projections, and growth
                    potential.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Marketing Strategy</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Customized marketing approach to attract quality tenants and minimize vacancy periods.
                  </p>
                </CardContent>
              </Card>

              <Card className="border border-brown-100 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="bg-brown-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-brown-700" />
                  </div>
                  <h3 className="text-xl font-light text-brown-900 mb-4">Expert Consultation</h3>
                  <p className="text-brown-700 font-light leading-relaxed">
                    Follow-up consultation with our rental specialists to discuss your report and answer any questions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-brown-900 text-cream">
          <div className="container text-center">
            <div className="space-y-10 max-w-4xl mx-auto">
              <h2 className="text-4xl font-light sm:text-5xl">Maximize Your Rental Investment</h2>
              <p className="text-xl text-brown-100 leading-relaxed">
                Get professional rental market analysis and strategic recommendations to optimize your property's income
                potential. Your detailed report will be ready within 24 hours.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 py-4 h-auto bg-cream text-brown-900 hover:bg-brown-50"
                onClick={() => {
                  document.getElementById('appraisal-form')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Get Free Rental Appraisal
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brown-900 text-cream py-16">
        <div className="container">
          <div className="text-center">
            <p className="text-brown-200">© {new Date().getFullYear()} Alto Property Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
