'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { BookOpen, ImageIcon, Video, MessageSquare, LogIn, LogOut, Menu, X } from "lucide-react"
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
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Логотип */}
{/* ЛОГОТИП — КАК РАНЬШЕ */}
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Методическая копилка</span>
        </Link>

          {/* Навигация + Вход (десктоп) */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            {/* КНОПКА ВХОД СПРАВА */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admin">Админ</Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button asChild size="sm">
                <Link href="/login" className="flex items-center gap-1.5">
                  <LogIn className="h-4 w-4" />
                  Вход
                </Link>
              </Button>
            )}
          </div>

          {/* Бургер (мобилка) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Мобильное меню */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t py-4">
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

              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Button asChild variant="outline" size="sm" className="w-full">
                      <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
                        Админ-панель
                      </Link>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { logout(); setMobileMenuOpen(false) }}
                    className="w-full justify-start"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Выйти
                  </Button>
                </>
              ) : (
                <Button asChild size="sm" className="w-full">
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2 justify-center">
                    <LogIn className="h-4 w-4" />
                    Вход
                  </Link>
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}