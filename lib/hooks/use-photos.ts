"use client"

import { useState, useEffect } from "react"
import { type Photo, initialPhotos } from "@/lib/data/photos"

export function usePhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    // Load photos from localStorage or use initial data
    const stored = localStorage.getItem("photos")
    if (stored) {
      setPhotos(JSON.parse(stored))
    } else {
      setPhotos(initialPhotos)
      localStorage.setItem("photos", JSON.stringify(initialPhotos))
    }
  }, [])

  const addPhoto = (photo: Omit<Photo, "id">) => {
    const newPhoto = {
      ...photo,
      id: Date.now().toString(),
    }
    const updated = [...photos, newPhoto]
    setPhotos(updated)
    localStorage.setItem("photos", JSON.stringify(updated))
  }

  const updatePhoto = (id: string, photo: Partial<Photo>) => {
    const updated = photos.map((p) => (p.id === id ? { ...p, ...photo } : p))
    setPhotos(updated)
    localStorage.setItem("photos", JSON.stringify(updated))
  }

  const deletePhoto = (id: string) => {
    const updated = photos.filter((p) => p.id !== id)
    setPhotos(updated)
    localStorage.setItem("photos", JSON.stringify(updated))
  }

  return {
    photos,
    addPhoto,
    updatePhoto,
    deletePhoto,
  }
}
