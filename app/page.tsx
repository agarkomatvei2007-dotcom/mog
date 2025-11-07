import Link from "next/link"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ImageIcon, Video, MessageSquare, GraduationCap } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      title: "Лекции",
      description: "Текстовые материалы лекций по информатике и смежным дисциплинам",
      icon: BookOpen,
      href: "/lectures",
    },
    {
      title: "Фотогалерея",
      description: "Фотографии с лекций и учебных мероприятий",
      icon: ImageIcon,
      href: "/photos",
    },
    {
      title: "Видеолекции",
      description: "Видеозаписи лекций и образовательных материалов",
      icon: Video,
      href: "/videos",
    },
    {
      title: "Обмен опытом",
      description: "Площадка для обмена педагогическим опытом между преподавателями",
      icon: MessageSquare,
      href: "/experience",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-muted/50 to-background py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="flex justify-center mb-6">
              <GraduationCap className="h-16 w-16 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-center mt-8">Методическая копилка</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Полезный ресурс для обмена педагогическим опытом, хранения материалов по разным дисциплинам
            </p>
            <div className="flex flex-col gap-4  sm:flex-row flex justify-center">
              <Link href="/lectures">
                <Button size="lg">Перейти к материалам</Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline">
                  Вход для администратора
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Разделы</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Link key={feature.href} href={feature.href}>
                    <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle>{feature.title}</CardTitle>
                        </div>
                        <CardDescription className="text-base">{feature.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
        <section className="bg-muted/30 py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">О проекте</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Методическая копилка — это не просто сборник материалов, а живое сообщество преподавателей, объединённых любовью к своему делу.
                  Здесь вы откроете для себя богатую коллекцию методических разработок, видеолекций, презентаций и фотоматериалов с занятий.
                  Каждый педагог может не только воспользоваться готовыми ресурсами, но и внести собственный вклад в общее дело, поделившись опытом, идеями и достижениями.
                </p>
                <p>
                  Наша цель — создать удобную платформу для обмена знаниями и методическими разработками, которая
                  поможет повысить качество образовательного процесса.Пусть Методическая копилка станет вашим источником вдохновения и развития!
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 px-4 mt-16">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2025 Методическая копилка. При поддержке Gym Coders.</p>
        </div>
        <div className="container mx-auto text-sm text-muted-foreground">
        <p>наши контакты:</p>
        <p>+7-(747)-737-80-92</p>
        <p>+7-(708)-939-80-60</p>
        <p>+7-(747)-934-92-38</p>
        </div>
      </footer>
    </div>
  )
}
