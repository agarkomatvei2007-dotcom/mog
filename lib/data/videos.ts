export interface Video {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  category: string
  duration: string
  date: string
  lecturer: string
  views: number
}

// Mock data - in production this would come from a database
export const initialVideos: Video[] = [
  {
    id: "1",
    title: "Введение в алгоритмы: Основные концепции",
    description: "Подробный разбор основных концепций алгоритмов, их классификация и применение в реальных задачах",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?key=video1",
    category: "Алгоритмы",
    duration: "45:30",
    date: "2025-01-15",
    lecturer: "Иванов И.И.",
    views: 1250,
  },
  {
    id: "2",
    title: "ООП на практике: Создание классов",
    description: "Практическое занятие по созданию классов, работе с наследованием и полиморфизмом",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?key=video2",
    category: "Программирование",
    duration: "52:15",
    date: "2025-01-20",
    lecturer: "Петрова А.С.",
    views: 980,
  },
  {
    id: "3",
    title: "SQL запросы: От простого к сложному",
    description: "Изучение SQL запросов различной сложности, оптимизация запросов и работа с индексами",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?key=video3",
    category: "Базы данных",
    duration: "38:45",
    date: "2025-02-01",
    lecturer: "Сидоров П.В.",
    views: 1450,
  },
  {
    id: "4",
    title: "Структуры данных: Деревья и графы",
    description: "Подробное изучение древовидных структур данных и графов, алгоритмы обхода",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?key=video4",
    category: "Алгоритмы",
    duration: "55:20",
    date: "2025-02-10",
    lecturer: "Иванов И.И.",
    views: 870,
  },
  {
    id: "5",
    title: "Веб-разработка: Основы React",
    description: "Введение в React, компоненты, состояние и жизненный цикл компонентов",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?key=video5",
    category: "Веб-разработка",
    duration: "48:10",
    date: "2025-02-15",
    lecturer: "Петрова А.С.",
    views: 1620,
  },
  {
    id: "6",
    title: "Машинное обучение: Первые шаги",
    description: "Введение в машинное обучение, основные алгоритмы и библиотеки Python",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/placeholder.svg?key=video6",
    category: "Машинное обучение",
    duration: "62:30",
    date: "2025-02-20",
    lecturer: "Сидоров П.В.",
    views: 2100,
  },
]
