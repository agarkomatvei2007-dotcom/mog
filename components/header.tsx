"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { BookOpen, ImageIcon, Video, MessageSquare, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const pathname = usePathname()
  const { isAuthenticated, isAdmin, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Лекции", href: "/lectures", icon: BookOpen },
    { name: "Фотогалерея", href: "/photos", icon: ImageIcon },
    { name: "Видеолекции", href: "/videos", icon: Video },
    { name: "Обмен опытом", href: "/experience", icon: MessageSquare },
  ]

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Логотип */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Методическая копилка</span>
          </Link>

          {/* Десктоп: Навигация */}
          <nav className="hidden md:flex items-center gap-6">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Кнопки входа/выхода */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="hidden sm:block">
                    <Button variant="outline" size="sm">
                      Админ-панель
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout} className="hidden xs:block">
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link href="/login" className="hidden xs:block">
                <Button size="sm">Вход</Button>
              </Link>
            )}

            {/* Бургер-кнопка (только на мобилке) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-accent"
              aria-label="Открыть меню"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* МОБИЛЬНОЕ МЕНЮ */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-border py-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-3">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent ${
                      pathname === item.href ? "text-primary bg-accent/50" : "text-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}

              {/* Админка и выход — в мобильном меню */}
              {isAuthenticated && (
                <>
                  {isAdmin && (
                    <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Админ-панель
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      logout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Выйти
                  </Button>
                </>
              )}

              {!isAuthenticated && (
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="px-3">
                  <Button size="sm" className="w-full">
                    Вход
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}