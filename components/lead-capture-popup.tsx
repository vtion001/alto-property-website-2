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
import { TrendingUp, Clock, Shield, Gift, X } from "lucide-react";

interface LeadCapturePopupProps {
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  propertyAddress: string;
  currentManager: string;
}

export function LeadCapturePopup({ onClose }: LeadCapturePopupProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyAddress: "",
    currentManager: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setSubmitError("Please fill in all required fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const webhookUrl =
        "https://primary-production-5c45.up.railway.app/webhook-test/9b43d882-17bd-407d-880d-729575502a23";
      console.log("Attempting to submit to webhook:", webhookUrl);

      const payload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        propertyAddress: formData.propertyAddress.trim(),
        currentPropertyManager: formData.currentManager.trim(),
        formType: "exclusive-property-management-deal",
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
      };

      console.log("Payload being sent:", payload);

      // Add timeout to fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        console.log("Response status:", response.status);
        console.log(
          "Response headers:",
          Object.fromEntries(response.headers.entries()),
        );

        if (response.ok) {
          console.log("Form submitted successfully to n8n webhook");
          setSubmitSuccess(true);
          // Reset form data on successful submission
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            propertyAddress: "",
            currentManager: "",
          });
        } else {
          const errorText = await response.text().catch(() => "Unknown error");
          console.error(
            "Failed to submit form to webhook:",
            response.status,
            errorText,
          );

          if (response.status === 404) {
            setSubmitError(
              `Webhook endpoint not found. Please check if the webhook service is running. (Error: ${response.status})`,
            );
          } else if (response.status >= 500) {
            setSubmitError(
              `Server error occurred. Please try again in a few moments. (Error: ${response.status})`,
            );
          } else {
            setSubmitError(
              `Failed to submit form. Please try again. (Error: ${response.status})`,
            );
          }
        }
      } catch (fetchError) {
        clearTimeout(timeoutId);
        throw fetchError;
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error instanceof DOMException && error.name === "AbortError") {
        setSubmitError(
          "Request timed out. Please check your connection and try again.",
        );
      } else if (
        error instanceof TypeError &&
        error.message.includes("fetch")
      ) {
        setSubmitError(
          "Unable to connect to the service. Please check your internet connection and try again.",
        );
      } else {
        setSubmitError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
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
              <Gift className="h-6 w-6 text-brown-700" />
            </div>
          </div>
          <Badge className="bg-red-500 text-white mb-1 mx-auto text-xs">
            Limited Time Offer
          </Badge>
          <CardTitle className="text-lg sm:text-2xl font-light text-brown-800 mb-1">
            Exclusive Property Management Deal
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-brown-700">
            Switch to Alto Property Group and unlock exceptional value
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="grid gap-2 grid-cols-3 sm:grid-cols-3 mb-4">
            <div className="text-center p-1.5 sm:p-2 bg-brown-50 rounded-lg sm:rounded-xl">
              <div className="bg-brown-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-brown-700" />
              </div>
              <h3 className="font-medium text-brown-800 mb-0.5 sm:mb-1 text-xs sm:text-sm">
                Beat Your Rate
              </h3>
              <p className="text-xs text-brown-600 hidden sm:block">
                We'll beat your current management fee by 1%*
              </p>
            </div>

            <div className="text-center p-1.5 sm:p-2 bg-brown-50 rounded-lg sm:rounded-xl">
              <div className="bg-brown-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-brown-700" />
              </div>
              <h3 className="font-medium text-brown-800 mb-0.5 sm:mb-1 text-xs sm:text-sm">
                First Month Free
              </h3>
              <p className="text-xs text-brown-600 hidden sm:block">
                No management fees for your first month with us
              </p>
            </div>

            <div className="text-center p-1.5 sm:p-2 bg-brown-50 rounded-lg sm:rounded-xl">
              <div className="bg-brown-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-brown-700" />
              </div>
              <h3 className="font-medium text-brown-800 mb-0.5 sm:mb-1 text-xs sm:text-sm">
                Free Appraisal
              </h3>
              <p className="text-xs text-brown-600 hidden sm:block">
                Complimentary property and rental assessment
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-brown-900">
                  First Name *
                </label>
                <Input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                  className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-brown-900">
                  Last Name *
                </label>
                <Input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Smith"
                  className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm"
                  required
                />
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-brown-900">
                  Email Address *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-brown-900">
                  Phone Number *
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(07) 1234 5678"
                  className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-brown-900">
                Property Address
              </label>
              <Input
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleInputChange}
                placeholder="123 Main Street, Brisbane"
                className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-brown-900">
                Current Property Manager (Optional)
              </label>
              <Input
                name="currentManager"
                value={formData.currentManager}
                onChange={handleInputChange}
                placeholder="Current management company name"
                className="border-brown-200 focus:border-brown-400 h-10 sm:h-8 text-sm"
              />
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
                <p className="text-sm text-red-600">{submitError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 rounded-full p-1 flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-green-800 mb-1">
                      Request Submitted Successfully!
                    </h4>
                    <p className="text-sm text-green-700">
                      Thank you for your interest in our exclusive property
                      management offer. Our team has received your information
                      and will contact you within 24 hours to discuss your
                      personalized proposal.
                    </p>
                    <p className="text-xs text-green-600 mt-2">
                      You can close this window now.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-brown-50 p-3 rounded-lg">
              <h4 className="font-medium text-brown-800 mb-1 text-sm">
                What You'll Get:
              </h4>
              <ul className="text-xs text-brown-700 space-y-0.5">
                <li>✓ Comprehensive property and rental market analysis</li>
                <li>✓ Personalized management fee comparison</li>
                <li>
                  ✓ No-obligation consultation with our property specialists
                </li>
                <li>✓ Detailed switching process explanation</li>
              </ul>
            </div>

            {!submitSuccess ? (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brown-900 hover:bg-brown-800 text-cream py-3 sm:py-2 h-auto font-medium tracking-wide text-sm sm:text-base disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Claim Your Exclusive Offer"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={onClose}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-2 h-auto font-medium tracking-wide text-sm sm:text-base"
              >
                Close Window
              </Button>
            )}

            <p className="text-xs text-brown-500 text-center leading-tight px-2 sm:px-0">
              * Terms and conditions apply. Offer valid for new clients only.
              Minimum 12-month management agreement required. We'll beat your
              current rate by 1% or provide first month free (whichever is
              greater value).
            </p>
          </form>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}
