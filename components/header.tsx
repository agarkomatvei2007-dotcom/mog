"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { BookOpen, ImageIcon, Video, MessageSquare, LogOut } from "lucide-react"

export function Header() {
  const pathname = usePathname()
  const { isAuthenticated, isAdmin, logout } = useAuth()

  const navigation = [
    { name: "Лекции", href: "/lectures", icon: BookOpen },
    { name: "Фотогалерея", href: "/photos", icon: ImageIcon },
    { name: "Видеолекции", href: "/videos", icon: Video },
    { name: "Обмен опытом", href: "/experience", icon: MessageSquare },
  ]

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Методическая копилка</span>
          </Link>

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

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Админ-панель
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={logout}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm">Вход</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
