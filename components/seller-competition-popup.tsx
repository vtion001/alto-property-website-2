"use client";

import type React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trophy, Percent, Users, X } from "lucide-react";

interface SellerCompetitionPopupProps {
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertySuburb: string;
}

export function SellerCompetitionPopup({ onClose }: SellerCompetitionPopupProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertySuburb: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const webhookUrl =
        "https://primary-production-5c45.up.railway.app/webhook-test/efcb576a-2730-45bc-bc98-c80b36206eee";

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        propertySuburb: formData.propertySuburb.trim(),
        formType: "seller-competition-2-percent-commission",
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
        referrer: typeof document !== "undefined" ? document.referrer : "",
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", propertySuburb: "" });
      } else {
        setSubmitError(`Submission failed. Please try again. (Error: ${response.status})`);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setSubmitError("Request timed out. Please try again.");
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="w-full h-full sm:h-auto flex items-start sm:items-center justify-center py-4 sm:py-0">
        <Card className="w-full max-w-sm sm:max-w-lg mx-auto shadow-2xl border-2 border-brown-200 relative animate-in fade-in-0 zoom-in-95 duration-200 my-auto">
          <CardHeader className="text-center pb-1 bg-gradient-to-br from-brown-50 to-cream px-4 sm:px-6 pt-4 sm:pt-6">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 hover:bg-brown-50 rounded-full transition-colors z-10"
            >
              <X className="h-5 w-5 text-brown-600" />
            </button>
            <div className="flex justify-center mb-1">
              <div className="bg-brown-100 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-brown-700" />
              </div>
            </div>
            <Badge className="bg-red-500 text-white mb-1 mx-auto text-xs">Competition</Badge>
            <CardTitle className="text-lg sm:text-2xl font-light text-brown-800 mb-1">
              Win 2% Commission On Your Sale
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-brown-700">
              Limited to the first 5 eligible sellers. Enter the draw now.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="grid gap-2 grid-cols-3 sm:grid-cols-3 mb-4">
              <div className="text-center p-1.5 sm:p-2 bg-brown-50 rounded-lg sm:rounded-xl">
                <div className="bg-brown-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <Percent className="h-3 w-3 sm:h-4 sm:w-4 text-brown-700" />
                </div>
                <h3 className="font-medium text-brown-800 mb-0.5 sm:mb-1 text-xs sm:text-sm">2% Commission</h3>
                <p className="text-xs text-brown-600 hidden sm:block">On a successful sale</p>
              </div>
              <div className="text-center p-1.5 sm:p-2 bg-brown-50 rounded-lg sm:rounded-xl">
                <div className="bg-brown-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4 text-brown-700" />
                </div>
                <h3 className="font-medium text-brown-800 mb-0.5 sm:mb-1 text-xs sm:text-sm">First 5 Customers</h3>
                <p className="text-xs text-brown-600 hidden sm:block">Limited availability</p>
              </div>
              <div className="text-center p-1.5 sm:p-2 bg-brown-50 rounded-lg sm:rounded-xl">
                <div className="bg-brown-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                  <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-brown-700" />
                </div>
                <h3 className="font-medium text-brown-800 mb-0.5 sm:mb-1 text-xs sm:text-sm">Enter The Draw</h3>
                <p className="text-xs text-brown-600 hidden sm:block">Winners contacted directly</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-brown-900">First Name *</label>
                  <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-brown-900">Last Name *</label>
                  <Input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Smith" className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm" required />
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-brown-900">Email Address *</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john@example.com" className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-brown-900">Phone Number *</label>
                  <Input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="(07) 1234 5678" className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm" required />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-brown-900">Property Suburb</label>
                <Input name="propertySuburb" value={formData.propertySuburb} onChange={handleInputChange} placeholder="e.g., New Farm" className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm" />
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                  <p className="text-sm text-red-600">{submitError}</p>
                </div>
              )}

              {submitSuccess ? (
                <Button type="button" onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-2 h-auto font-medium tracking-wide text-sm sm:text-base">
                  Close Window
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting} className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 sm:py-2 h-auto font-medium tracking-wide text-sm sm:text-base disabled:opacity-50">
                  {isSubmitting ? "Submitting..." : "Enter Competition"}
                </Button>
              )}

              <p className="text-xs text-brown-500 text-center leading-tight">
                By entering, you agree to be contacted by Alto Property about your sale. 2% commission offer available to the first 5 eligible sellers who list and sell with us within the promotional period. Standard marketing costs may apply.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


