"use client"

import { useState, useEffect, useCallback } from "react"
import { LeadCapturePopup } from "./lead-capture-popup"

// Helper to allow other components to request opening the popup
export function openManagementOfferPopup() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-lead-popup"))
  }
}

export function PopupManager() {
  const [showPopup, setShowPopup] = useState(true)
  const [hasShown, setHasShown] = useState(false)

  // Memoize the popup trigger function to prevent unnecessary re-renders
  const triggerPopup = useCallback(() => {
    if (!hasShown) {
      setShowPopup(true)
      setHasShown(true)
    }
  }, [hasShown])

  useEffect(() => {
    // Show popup instantly on HomePage
    triggerPopup()
  }, [triggerPopup])

  const handleClosePopup = useCallback(() => {
    setShowPopup(false)
  }, [])

  if (!showPopup || hasShown && !showPopup) return null

  return <LeadCapturePopup onClose={handleClosePopup} />
}