"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Share2,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

export function ProjectDetails() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0)

  const photos = [
    {
      url: "/outdoor-terrace-construction-progress.jpg",
      caption: "Vista general del proyecto - Semana 8",
      date: "5 Mar 2024",
    },
    {
      url: "/pergola-installation-outdoor.jpg",
      caption: "Instalación de pérgola principal",
      date: "4 Mar 2024",
    },
    {
      url: "/outdoor-paving-stones.jpg",
      caption: "Preparación de base para pavimento",
      date: "2 Mar 2024",
    },
    {
      url: "/irrigation-system-installation.jpg",
      caption: "Sistema de riego en proceso",
      date: "1 Mar 2024",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
          <span>Proyectos</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#2f4f4f]">Terraza Mediterránea Premium</span>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#2f4f4f] sm:text-4xl">Terraza Mediterránea Premium</h1>
            <p className="mt-2 text-lg text-[#6b7280]">Proyecto #TRZ-2024-089</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-[#e8e6e0] text-[#2f4f4f] hover:bg-[#f4f1ea] bg-transparent">
              <Share2 className="mr-2 h-4 w-4" />
              Compartir
            </Button>
            <Button className="bg-[#2f4f4f] text-white hover:bg-[#1f3535]">
              <Download className="mr-2 h-4 w-4" />
              Descargar Informe
            </Button>
          </div>
        </div>
      </div>

      {/* Project Info Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Estado</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">En Progreso</Badge>
            <p className="mt-2 text-xs text-[#6b7280]">68% completado</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Ubicación</CardTitle>
            <MapPin className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-[#2f4f4f]">Barcelona</p>
            <p className="mt-1 text-xs text-[#6b7280]">Zona residencial premium</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Duración</CardTitle>
            <Calendar className="h-4 w-4 text-[#c6b89e]" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-[#2f4f4f]">75 días</p>
            <p className="mt-1 text-xs text-[#6b7280]">24 días restantes</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Equipo</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <p className="text-sm font-medium text-[#2f4f4f]">8 profesionales</p>
            <p className="mt-1 text-xs text-[#6b7280]">4 activos hoy</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-white border border-[#e8e6e0]">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="timeline">Cronograma</TabsTrigger>
          <TabsTrigger value="photos">Fotos</TabsTrigger>
          <TabsTrigger value="specs">Especificaciones</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Progress Overview */}
          <Card className="border-[#e8e6e0]">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-[#2f4f4f]">Progreso General</CardTitle>
              <CardDescription>Estado actual de las diferentes fases del proyecto</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-[#2f4f4f]">Progreso Total</span>
                  <span className="text-sm font-semibold text-[#2f4f4f]">68%</span>
                </div>
                <Progress value={68} className="h-3" />
              </div>

              <div className="space-y-4">
                <PhaseProgress phase="Preparación del terreno" progress={100} status="completed" />
                <PhaseProgress phase="Estructura y cimentación" progress={100} status="completed" />
                <PhaseProgress phase="Instalación de pérgola" progress={100} status="completed" />
                <PhaseProgress phase="Sistema de riego" progress={85} status="in-progress" />
                <PhaseProgress phase="Pavimentación" progress={30} status="in-progress" />
                <PhaseProgress phase="Iluminación" progress={0} status="pending" />
                <PhaseProgress phase="Plantación" progress={0} status="pending" />
                <PhaseProgress phase="Acabados finales" progress={0} status="pending" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-[#e8e6e0]">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-[#2f4f4f]">Actividad Reciente</CardTitle>
              <CardDescription>Últimas actualizaciones del proyecto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ActivityItem
                  date="Hoy, 14:30"
                  title="Instalación de pérgola completada"
                  description="La estructura principal de la pérgola ha sido instalada y asegurada. Se procederá con el tratamiento de protección."
                  status="completed"
                />
                <ActivityItem
                  date="Hoy, 10:15"
                  title="Inspección de calidad realizada"
                  description="El inspector certificó la correcta instalación de la estructura metálica."
                  status="completed"
                />
                <ActivityItem
                  date="Ayer, 16:45"
                  title="Materiales recibidos"
                  description="Llegaron las baldosas de piedra natural para la pavimentación."
                  status="info"
                />
                <ActivityItem
                  date="Ayer, 09:00"
                  title="Ajuste en cronograma"
                  description="La instalación del sistema de riego se adelanta 2 días debido al buen clima."
                  status="warning"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <Card className="border-[#e8e6e0]">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-[#2f4f4f]">Cronograma del Proyecto</CardTitle>
              <CardDescription>Fases planificadas y su estado actual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <TimelineItem
                  phase="Fase 1: Preparación"
                  dateRange="15-20 Ene 2024"
                  status="completed"
                  tasks={["Limpieza del terreno", "Nivelación", "Marcado de áreas"]}
                />
                <TimelineItem
                  phase="Fase 2: Cimentación"
                  dateRange="22-28 Ene 2024"
                  status="completed"
                  tasks={["Excavación", "Instalación de bases", "Curado de hormigón"]}
                />
                <TimelineItem
                  phase="Fase 3: Estructura"
                  dateRange="1-10 Feb 2024"
                  status="completed"
                  tasks={["Montaje de estructura metálica", "Instalación de pérgola", "Tratamiento anticorrosivo"]}
                />
                <TimelineItem
                  phase="Fase 4: Instalaciones"
                  dateRange="12 Feb - 10 Mar 2024"
                  status="in-progress"
                  tasks={["Sistema de riego (85%)", "Instalación eléctrica (30%)", "Drenaje"]}
                />
                <TimelineItem
                  phase="Fase 5: Pavimentación"
                  dateRange="12-18 Mar 2024"
                  status="pending"
                  tasks={["Preparación de base", "Colocación de baldosas", "Rejuntado"]}
                />
                <TimelineItem
                  phase="Fase 6: Acabados"
                  dateRange="20-30 Mar 2024"
                  status="pending"
                  tasks={["Iluminación decorativa", "Plantación", "Mobiliario", "Limpieza final"]}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="space-y-6">
          <Card className="border-[#e8e6e0]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-serif text-xl text-[#2f4f4f]">Galería del Proyecto</CardTitle>
                  <CardDescription>Seguimiento fotográfico del progreso</CardDescription>
                </div>
                <Badge variant="secondary" className="bg-[#f4f1ea] text-[#2f4f4f]">
                  <ImageIcon className="mr-1 h-3 w-3" />
                  142 fotos
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Photo Viewer */}
              <div className="relative aspect-video overflow-hidden rounded-lg bg-[#e8e6e0]">
                <img
                  src={photos[selectedPhotoIndex].url || "/placeholder.svg"}
                  alt={photos[selectedPhotoIndex].caption}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-sm font-medium text-white">{photos[selectedPhotoIndex].caption}</p>
                  <p className="text-xs text-white/80">{photos[selectedPhotoIndex].date}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 text-[#2f4f4f] hover:bg-white"
                  onClick={() => setSelectedPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 text-[#2f4f4f] hover:bg-white"
                  onClick={() => setSelectedPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPhotoIndex(index)}
                    className={`relative aspect-video overflow-hidden rounded-lg transition-all ${
                      selectedPhotoIndex === index
                        ? "ring-2 ring-[#2f4f4f] ring-offset-2"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={photo.url || "/placeholder.svg"}
                      alt={photo.caption}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Photo Categories */}
              <div className="grid gap-4 sm:grid-cols-3">
                <Button
                  variant="outline"
                  className="justify-start border-[#e8e6e0] text-[#2f4f4f] hover:bg-[#f4f1ea] bg-transparent"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Esta semana (12)
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-[#e8e6e0] text-[#2f4f4f] hover:bg-[#f4f1ea] bg-transparent"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Hitos (24)
                </Button>
                <Button
                  variant="outline"
                  className="justify-start border-[#e8e6e0] text-[#2f4f4f] hover:bg-[#f4f1ea] bg-transparent"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar todas
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Specifications Tab */}
        <TabsContent value="specs" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="border-[#e8e6e0]">
              <CardHeader>
                <CardTitle className="font-serif text-xl text-[#2f4f4f]">Detalles Técnicos</CardTitle>
                <CardDescription>Especificaciones del proyecto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SpecItem label="Superficie total" value="85 m²" />
                <SpecItem label="Tipo de pavimento" value="Piedra natural travertino" />
                <SpecItem label="Estructura pérgola" value="Aluminio termolacado" />
                <SpecItem label="Sistema de riego" value="Goteo automatizado" />
                <SpecItem label="Iluminación" value="LED integrada, 3000K" />
                <SpecItem label="Drenaje" value="Sistema perimetral con rejillas" />
              </CardContent>
            </Card>

            <Card className="border-[#e8e6e0]">
              <CardHeader>
                <CardTitle className="font-serif text-xl text-[#2f4f4f]">Materiales Principales</CardTitle>
                <CardDescription>Componentes utilizados en la construcción</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <MaterialItem name="Baldosas travertino" quantity="85 m²" status="Recibido" />
                <MaterialItem name="Estructura aluminio" quantity="45 m lineales" status="Instalado" />
                <MaterialItem name="Sistema de riego" quantity="1 unidad" status="En instalación" />
                <MaterialItem name="Luminarias LED" quantity="12 unidades" status="Pendiente" />
                <MaterialItem name="Plantas ornamentales" quantity="Según diseño" status="Pendiente" />
              </CardContent>
            </Card>
          </div>

          <Card className="border-[#e8e6e0]">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-[#2f4f4f]">Certificaciones y Permisos</CardTitle>
              <CardDescription>Documentación legal y técnica</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <CertificationItem
                  name="Licencia de obra"
                  status="Aprobada"
                  date="10 Ene 2024"
                  icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                />
                <CertificationItem
                  name="Certificado estructural"
                  status="Aprobado"
                  date="25 Ene 2024"
                  icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
                />
                <CertificationItem
                  name="Inspección eléctrica"
                  status="Programada"
                  date="15 Mar 2024"
                  icon={<Clock className="h-5 w-5 text-blue-600" />}
                />
                <CertificationItem
                  name="Certificado final de obra"
                  status="Pendiente"
                  date="30 Mar 2024"
                  icon={<AlertCircle className="h-5 w-5 text-[#9ca3af]" />}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PhaseProgress({
  phase,
  progress,
  status,
}: {
  phase: string
  progress: number
  status: "completed" | "in-progress" | "pending"
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {status === "completed" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
          {status === "in-progress" && <Clock className="h-4 w-4 text-blue-600" />}
          {status === "pending" && <AlertCircle className="h-4 w-4 text-[#9ca3af]" />}
          <span className="text-sm font-medium text-[#2f4f4f]">{phase}</span>
        </div>
        <span className="text-sm font-medium text-[#6b7280]">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}

function ActivityItem({
  date,
  title,
  description,
  status,
}: {
  date: string
  title: string
  description: string
  status: "completed" | "info" | "warning"
}) {
  const iconMap = {
    completed: <CheckCircle2 className="h-5 w-5 text-green-600" />,
    info: <AlertCircle className="h-5 w-5 text-blue-600" />,
    warning: <AlertCircle className="h-5 w-5 text-orange-500" />,
  }

  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">{iconMap[status]}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-medium text-[#2f4f4f]">{title}</p>
          <span className="text-xs text-[#9ca3af] whitespace-nowrap">{date}</span>
        </div>
        <p className="text-sm text-[#6b7280]">{description}</p>
      </div>
    </div>
  )
}

function TimelineItem({
  phase,
  dateRange,
  status,
  tasks,
}: {
  phase: string
  dateRange: string
  status: "completed" | "in-progress" | "pending"
  tasks: string[]
}) {
  const statusColors = {
    completed: "bg-green-600",
    "in-progress": "bg-blue-600",
    pending: "bg-[#e8e6e0]",
  }

  return (
    <div className="relative flex gap-4 pb-6 last:pb-0">
      <div className="flex flex-col items-center">
        <div className={`h-3 w-3 rounded-full ${statusColors[status]}`} />
        {status !== "pending" && <div className="w-0.5 flex-1 bg-[#e8e6e0] mt-2" />}
      </div>
      <div className="flex-1 space-y-2">
        <div>
          <p className="font-medium text-[#2f4f4f]">{phase}</p>
          <p className="text-sm text-[#6b7280]">{dateRange}</p>
        </div>
        <ul className="space-y-1">
          {tasks.map((task, index) => (
            <li key={index} className="text-sm text-[#6b7280]">
              • {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SpecItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-[#e8e6e0] pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-[#6b7280]">{label}</span>
      <span className="text-sm font-medium text-[#2f4f4f]">{value}</span>
    </div>
  )
}

function MaterialItem({ name, quantity, status }: { name: string; quantity: string; status: string }) {
  const statusColors: Record<string, string> = {
    Recibido: "bg-green-500/10 text-green-700",
    Instalado: "bg-blue-500/10 text-blue-700",
    "En instalación": "bg-orange-500/10 text-orange-700",
    Pendiente: "bg-gray-500/10 text-gray-700",
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#2f4f4f]">{name}</p>
        <p className="text-xs text-[#6b7280]">{quantity}</p>
      </div>
      <Badge className={statusColors[status] || "bg-gray-500/10 text-gray-700"}>{status}</Badge>
    </div>
  )
}

function CertificationItem({
  name,
  status,
  date,
  icon,
}: {
  name: string
  status: string
  date: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-[#e8e6e0] p-4">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[#2f4f4f]">{name}</p>
        <p className="text-xs text-[#6b7280] mt-1">{status}</p>
        <p className="text-xs text-[#9ca3af] mt-1">{date}</p>
      </div>
    </div>
  )
}
