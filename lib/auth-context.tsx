"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "admin123"

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem("isAuthenticated")
    const adminStatus = sessionStorage.getItem("isAdmin")
    if (auth === "true") {
      setIsAuthenticated(true)
      setIsAdmin(adminStatus === "true")
    }
  }, [])

  const login = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setIsAdmin(true)
      sessionStorage.setItem("isAuthenticated", "true")
      sessionStorage.setItem("isAdmin", "true")
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setIsAdmin(false)
    sessionStorage.removeItem("isAuthenticated")
    sessionStorage.removeItem("isAdmin")
  }

  return <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
