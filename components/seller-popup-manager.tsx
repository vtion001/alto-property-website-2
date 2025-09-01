"use client"

import { useCallback, useEffect, useState } from "react"
import { SellerCompetitionPopup } from "./seller-competition-popup"

export function openSellerCompetitionPopup() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-seller-popup"))
  }
}

export function SellerPopupManager() {
  const [showPopup, setShowPopup] = useState(false)

  const open = useCallback(() => setShowPopup(true), [])
  const close = useCallback(() => setShowPopup(false), [])

  useEffect(() => {
    const handler = () => open()
    window.addEventListener("open-seller-popup", handler as EventListener)

    const checkHash = () => {
      if (window.location.hash === "#seller-competition") {
        open()
      }
    }
    checkHash()
    const onHashChange = () => checkHash()
    window.addEventListener("hashchange", onHashChange)

    return () => {
      window.removeEventListener("open-seller-popup", handler as EventListener)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [open])

  if (!showPopup) return null
  return <SellerCompetitionPopup onClose={close} />
}


