"use client"

import { useState, useEffect } from "react"
import { LeadCapturePopup } from "./lead-capture-popup"

export function PopupManager() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup has already been shown in this session
    const popupShown = sessionStorage.getItem("popupShown")
    if (popupShown) {
      setHasShown(true)
      return
    }

    // Show popup after 30 seconds or when user scrolls 50% down the page
    const timer = setTimeout(() => {
      if (!hasShown) {
        setShowPopup(true)
        setHasShown(true)
        sessionStorage.setItem("popupShown", "true")
      }
    }, 30000) // 30 seconds

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      if (scrollPercent > 50 && !hasShown) {
        setShowPopup(true)
        setHasShown(true)
        sessionStorage.setItem("popupShown", "true")
        clearTimeout(timer)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasShown])

  const handleClosePopup = () => {
    setShowPopup(false)
  }

  if (!showPopup) return null

  return <LeadCapturePopup onClose={handleClosePopup} />
}
