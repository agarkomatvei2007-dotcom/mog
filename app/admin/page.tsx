"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/lib/auth-context"
import { useLectures } from "@/lib/hooks/use-lectures"
import { usePhotos } from "@/lib/hooks/use-photos"
import { useVideos } from "@/lib/hooks/use-videos"
import { useExperiences } from "@/lib/hooks/use-experiences"
import { LectureForm } from "@/components/admin/lecture-form"
import { PhotoForm } from "@/components/admin/photo-form"
import { VideoForm } from "@/components/admin/video-form"
import { ExperienceForm } from "@/components/admin/experience-form"
import type { Lecture } from "@/lib/data/lectures"
import type { Photo } from "@/lib/data/photos"
import type { Video } from "@/lib/data/videos"
import type { Experience } from "@/lib/data/experiences"
import { Plus, Pencil, Trash2, BookOpen, ImageIcon, VideoIcon, MessageSquare } from "lucide-react"

export default function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()
  const { lectures, addLecture, updateLecture, deleteLecture } = useLectures()
  const { photos, addPhoto, updatePhoto, deletePhoto } = usePhotos()
  const { videos, addVideo, updateVideo, deleteVideo } = useVideos()
  const { experiences, addExperience, updateExperience, deleteExperience } = useExperiences()
  const [isAddLectureDialogOpen, setIsAddLectureDialogOpen] = useState(false)
  const [isAddPhotoDialogOpen, setIsAddPhotoDialogOpen] = useState(false)
  const [isAddVideoDialogOpen, setIsAddVideoDialogOpen] = useState(false)
  const [isAddExperienceDialogOpen, setIsAddExperienceDialogOpen] = useState(false)
  const [editingLecture, setEditingLecture] = useState<Lecture | null>(null)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      router.push("/login")
    }
  }, [isAuthenticated, isAdmin, router])

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  const handleAddLecture = (data: Omit<Lecture, "id">) => {
    addLecture(data)
    setIsAddLectureDialogOpen(false)
  }

  const handleUpdateLecture = (data: Omit<Lecture, "id">) => {
    if (editingLecture) {
      updateLecture(editingLecture.id, data)
      setEditingLecture(null)
    }
  }

  const handleDeleteLecture = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту лекцию?")) {
      deleteLecture(id)
    }
  }

  const handleAddPhoto = (data: Omit<Photo, "id">) => {
    addPhoto(data)
    setIsAddPhotoDialogOpen(false)
  }

  const handleUpdatePhoto = (data: Omit<Photo, "id">) => {
    if (editingPhoto) {
      updatePhoto(editingPhoto.id, data)
      setEditingPhoto(null)
    }
  }

  const handleDeletePhoto = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить это фото?")) {
      deletePhoto(id)
    }
  }

  const handleAddVideo = (data: Omit<Video, "id" | "views">) => {
    addVideo(data)
    setIsAddVideoDialogOpen(false)
  }

  const handleUpdateVideo = (data: Omit<Video, "id" | "views">) => {
    if (editingVideo) {
      updateVideo(editingVideo.id, data)
      setEditingVideo(null)
    }
  }

  const handleDeleteVideo = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить это видео?")) {
      deleteVideo(id)
    }
  }

  const handleAddExperience = (data: Omit<Experience, "id" | "likes" | "comments">) => {
    addExperience(data)
    setIsAddExperienceDialogOpen(false)
  }

  const handleUpdateExperience = (data: Omit<Experience, "id" | "likes" | "comments">) => {
    if (editingExperience) {
      updateExperience(editingExperience.id, data)
      setEditingExperience(null)
    }
  }

  const handleDeleteExperience = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту запись?")) {
      deleteExperience(id)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Панель администратора</h1>
              <p className="text-muted-foreground">Управление содержимым методической копилки</p>
            </div>
          </div>

          {/* Lectures Management */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Управление лекциями
                  </CardTitle>
                  <CardDescription>Всего лекций: {lectures.length}</CardDescription>
                </div>
                <Button onClick={() => setIsAddLectureDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить лекцию
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lectures.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Лекции отсутствуют</p>
                ) : (
                  lectures.map((lecture) => (
                    <div
                      key={lecture.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{lecture.title}</h3>
                        <p className="text-sm text-muted-foreground">{lecture.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingLecture(lecture)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteLecture(lecture.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Photos Management */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Управление фотогалереей
                  </CardTitle>
                  <CardDescription>Всего фотографий: {photos.length}</CardDescription>
                </div>
                <Button onClick={() => setIsAddPhotoDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить фото
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {photos.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Фотографии отсутствуют</p>
                ) : (
                  photos.map((photo) => (
                    <div
                      key={photo.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{photo.title}</h3>
                        <p className="text-sm text-muted-foreground">{photo.event}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingPhoto(photo)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeletePhoto(photo.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Videos Management */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <VideoIcon className="h-5 w-5" />
                    Управление видеолекциями
                  </CardTitle>
                  <CardDescription>Всего видео: {videos.length}</CardDescription>
                </div>
                <Button onClick={() => setIsAddVideoDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить видео
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {videos.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Видеолекции отсутствуют</p>
                ) : (
                  videos.map((video) => (
                    <div
                      key={video.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {video.category} • {video.duration}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingVideo(video)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteVideo(video.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Experience Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Управление обменом опытом
                  </CardTitle>
                  <CardDescription>Всего записей: {experiences.length}</CardDescription>
                </div>
                <Button onClick={() => setIsAddExperienceDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить запись
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {experiences.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Записи отсутствуют</p>
                ) : (
                  experiences.map((experience) => (
                    <div
                      key={experience.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold">{experience.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {experience.author} • {experience.category}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingExperience(experience)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteExperience(experience.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Add Lecture Dialog */}
      <Dialog open={isAddLectureDialogOpen} onOpenChange={setIsAddLectureDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить новую лекцию</DialogTitle>
            <DialogDescription>Заполните форму для добавления новой лекции в систему</DialogDescription>
          </DialogHeader>
          <LectureForm onSubmit={handleAddLecture} onCancel={() => setIsAddLectureDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Lecture Dialog */}
      <Dialog open={!!editingLecture} onOpenChange={() => setEditingLecture(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать лекцию</DialogTitle>
            <DialogDescription>Внесите изменения в лекцию</DialogDescription>
          </DialogHeader>
          {editingLecture && (
            <LectureForm
              lecture={editingLecture}
              onSubmit={handleUpdateLecture}
              onCancel={() => setEditingLecture(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Photo Dialog */}
      <Dialog open={isAddPhotoDialogOpen} onOpenChange={setIsAddPhotoDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить новое фото</DialogTitle>
            <DialogDescription>Заполните форму для добавления фотографии в галерею</DialogDescription>
          </DialogHeader>
          <PhotoForm onSubmit={handleAddPhoto} onCancel={() => setIsAddPhotoDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Photo Dialog */}
      <Dialog open={!!editingPhoto} onOpenChange={() => setEditingPhoto(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать фото</DialogTitle>
            <DialogDescription>Внесите изменения в фотографию</DialogDescription>
          </DialogHeader>
          {editingPhoto && (
            <PhotoForm photo={editingPhoto} onSubmit={handleUpdatePhoto} onCancel={() => setEditingPhoto(null)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Video Dialog */}
      <Dialog open={isAddVideoDialogOpen} onOpenChange={setIsAddVideoDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить новое видео</DialogTitle>
            <DialogDescription>Заполните форму для добавления видеолекции</DialogDescription>
          </DialogHeader>
          <VideoForm onSubmit={handleAddVideo} onCancel={() => setIsAddVideoDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Video Dialog */}
      <Dialog open={!!editingVideo} onOpenChange={() => setEditingVideo(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать видео</DialogTitle>
            <DialogDescription>Внесите изменения в видеолекцию</DialogDescription>
          </DialogHeader>
          {editingVideo && (
            <VideoForm video={editingVideo} onSubmit={handleUpdateVideo} onCancel={() => setEditingVideo(null)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Add Experience Dialog */}
      <Dialog open={isAddExperienceDialogOpen} onOpenChange={setIsAddExperienceDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить новую запись</DialogTitle>
            <DialogDescription>Заполните форму для добавления записи об обмене опытом</DialogDescription>
          </DialogHeader>
          <ExperienceForm onSubmit={handleAddExperience} onCancel={() => setIsAddExperienceDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Experience Dialog */}
      <Dialog open={!!editingExperience} onOpenChange={() => setEditingExperience(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактировать запись</DialogTitle>
            <DialogDescription>Внесите изменения в запись</DialogDescription>
          </DialogHeader>
          {editingExperience && (
            <ExperienceForm
              experience={editingExperience}
              onSubmit={handleUpdateExperience}
              onCancel={() => setEditingExperience(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
