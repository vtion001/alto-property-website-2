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
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  // Memoize the popup trigger function to prevent unnecessary re-renders
  const triggerPopup = useCallback(() => {
    if (!hasShown) {
      setShowPopup(true)
      setHasShown(true)
      sessionStorage.setItem("popupShown", "true")
    }
  }, [hasShown])

  useEffect(() => {
    // Check if popup has already been shown in this session
    const popupShown = sessionStorage.getItem("popupShown")
    if (popupShown) {
      setHasShown(true)
      return
    }

    let timer: NodeJS.Timeout
    let scrollHandler: (() => void) | null = null
    let hashHandler: (() => void) | null = null
    let openEventHandler: (() => void) | null = null

    // Set up timer for 3 seconds
    timer = setTimeout(() => {
      triggerPopup()
    }, 3000)

    // Set up scroll handler
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop

      // Calculate scroll percentage more reliably
      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100

      if (scrollPercent > 10) {
        triggerPopup()
        if (timer) clearTimeout(timer)
        if (scrollHandler) {
          window.removeEventListener("scroll", scrollHandler)
          scrollHandler = null
        }
      }
    }

    scrollHandler = handleScroll
    window.addEventListener("scroll", scrollHandler, { passive: true })

    // Hash trigger: #claim-offer opens popup immediately
    const checkHash = () => {
      if (window.location.hash === "#claim-offer") {
        triggerPopup()
        if (timer) clearTimeout(timer)
      }
    }
    checkHash()
    hashHandler = () => checkHash()
    window.addEventListener("hashchange", hashHandler)

    // Custom event trigger so buttons can open popup without hash
    const handleOpenEvent = () => triggerPopup()
    openEventHandler = handleOpenEvent
    window.addEventListener("open-lead-popup", openEventHandler as EventListener)

    // Cleanup function
    return () => {
      if (timer) clearTimeout(timer)
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler)
      }
      if (hashHandler) {
        window.removeEventListener("hashchange", hashHandler)
      }
      if (openEventHandler) {
        window.removeEventListener("open-lead-popup", openEventHandler as EventListener)
      }
    }
  }, [triggerPopup])

  const handleClosePopup = useCallback(() => {
    setShowPopup(false)
  }, [])

  if (!showPopup || hasShown && !showPopup) return null

  return <LeadCapturePopup onClose={handleClosePopup} />
}