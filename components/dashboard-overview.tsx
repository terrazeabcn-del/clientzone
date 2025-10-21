"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
  MessageSquare,
  ArrowRight,
  ImageIcon,
} from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-[#2f4f4f] sm:text-4xl">Bienvenido, Juan</h1>
        <p className="mt-2 text-lg text-[#6b7280]">Aquí está el estado actual de tu proyecto</p>
      </div>

      {/* Project Status Card */}
      <Card className="border-[#e8e6e0] bg-gradient-to-br from-[#2f4f4f] to-[#1f3535] text-white">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="font-serif text-2xl text-white">Terraza Mediterránea Premium</CardTitle>
              <CardDescription className="mt-2 text-white/80">Proyecto #TRZ-2024-089</CardDescription>
            </div>
            <Badge className="bg-green-500/20 text-green-300 hover:bg-green-500/30">En Progreso</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-white/90">Progreso General</span>
              <span className="font-semibold">68%</span>
            </div>
            <Progress value={68} className="h-3 bg-white/20" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Inicio</span>
              </div>
              <p className="mt-1 font-semibold">15 Ene 2024</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Entrega estimada</span>
              </div>
              <p className="mt-1 font-semibold">30 Mar 2024</p>
            </div>
            <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-white/80">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Días restantes</span>
              </div>
              <p className="mt-1 font-semibold">24 días</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Hitos Completados</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2f4f4f]">8/12</div>
            <p className="mt-1 text-xs text-[#6b7280]">67% del proyecto</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Documentos</CardTitle>
            <FileText className="h-4 w-4 text-[#c6b89e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2f4f4f]">24</div>
            <p className="mt-1 text-xs text-[#6b7280]">3 nuevos esta semana</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Mensajes</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2f4f4f]">5</div>
            <p className="mt-1 text-xs text-[#6b7280]">2 sin leer</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Fotos del Progreso</CardTitle>
            <ImageIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2f4f4f]">142</div>
            <p className="mt-1 text-xs text-[#6b7280]">Última actualización hoy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Updates */}
        <Card className="border-[#e8e6e0]">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-[#2f4f4f]">Actualizaciones Recientes</CardTitle>
            <CardDescription>Últimas novedades de tu proyecto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <UpdateItem
              icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
              title="Instalación de pérgola completada"
              description="La estructura principal de la pérgola ha sido instalada exitosamente."
              time="Hace 2 horas"
            />
            <UpdateItem
              icon={<FileText className="h-5 w-5 text-[#c6b89e]" />}
              title="Nuevo documento disponible"
              description="Certificado de materiales - Madera tratada para exteriores"
              time="Hace 5 horas"
            />
            <UpdateItem
              icon={<AlertCircle className="h-5 w-5 text-orange-500" />}
              title="Cambio en el cronograma"
              description="La instalación del sistema de riego se adelanta 2 días."
              time="Ayer"
            />
            <UpdateItem
              icon={<MessageSquare className="h-5 w-5 text-blue-600" />}
              title="Mensaje del arquitecto"
              description="Propuesta de ajuste en la iluminación perimetral"
              time="Hace 2 días"
            />

            <Button
              variant="outline"
              className="w-full border-[#e8e6e0] text-[#2f4f4f] hover:bg-[#f4f1ea] bg-transparent"
            >
              Ver todas las actualizaciones
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="border-[#e8e6e0]">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-[#2f4f4f]">Tu Equipo</CardTitle>
            <CardDescription>Profesionales trabajando en tu proyecto</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <TeamMember
              name="María González"
              role="Directora de Proyecto"
              avatar="/placeholder.svg?height=40&width=40"
              status="online"
            />
            <TeamMember
              name="Carlos Ruiz"
              role="Arquitecto Principal"
              avatar="/placeholder.svg?height=40&width=40"
              status="online"
            />
            <TeamMember
              name="Ana Martínez"
              role="Ingeniera Estructural"
              avatar="/placeholder.svg?height=40&width=40"
              status="offline"
            />
            <TeamMember
              name="Roberto Silva"
              role="Maestro de Obra"
              avatar="/placeholder.svg?height=40&width=40"
              status="online"
            />

            <Button
              variant="outline"
              className="w-full border-[#e8e6e0] text-[#2f4f4f] hover:bg-[#f4f1ea] bg-transparent"
            >
              Contactar al equipo
              <MessageSquare className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Next Milestones */}
      <Card className="border-[#e8e6e0]">
        <CardHeader>
          <CardTitle className="font-serif text-xl text-[#2f4f4f]">Próximos Hitos</CardTitle>
          <CardDescription>Fases importantes que se completarán pronto</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <MilestoneItem
              title="Instalación del sistema de riego"
              date="8-10 Marzo"
              progress={85}
              status="in-progress"
            />
            <MilestoneItem title="Colocación de pavimento" date="12-15 Marzo" progress={30} status="in-progress" />
            <MilestoneItem title="Instalación de iluminación" date="18-20 Marzo" progress={0} status="pending" />
            <MilestoneItem title="Plantación de vegetación" date="22-25 Marzo" progress={0} status="pending" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UpdateItem({
  icon,
  title,
  description,
  time,
}: {
  icon: React.ReactNode
  title: string
  description: string
  time: string
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium text-[#2f4f4f]">{title}</p>
        <p className="text-sm text-[#6b7280]">{description}</p>
        <p className="text-xs text-[#9ca3af]">{time}</p>
      </div>
    </div>
  )
}

function TeamMember({
  name,
  role,
  avatar,
  status,
}: {
  name: string
  role: string
  avatar: string
  status: "online" | "offline"
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-[#c6b89e] text-[#2f4f4f]">{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
            status === "online" ? "bg-green-500" : "bg-gray-400"
          }`}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-[#2f4f4f]">{name}</p>
        <p className="text-xs text-[#6b7280]">{role}</p>
      </div>
      <Button variant="ghost" size="sm" className="text-[#2f4f4f]">
        <MessageSquare className="h-4 w-4" />
      </Button>
    </div>
  )
}

function MilestoneItem({
  title,
  date,
  progress,
  status,
}: {
  title: string
  date: string
  progress: number
  status: "completed" | "in-progress" | "pending"
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {status === "completed" && <CheckCircle2 className="h-5 w-5 text-green-600" />}
          {status === "in-progress" && <Clock className="h-5 w-5 text-blue-600" />}
          {status === "pending" && <Calendar className="h-5 w-5 text-[#9ca3af]" />}
          <div>
            <p className="text-sm font-medium text-[#2f4f4f]">{title}</p>
            <p className="text-xs text-[#6b7280]">{date}</p>
          </div>
        </div>
        <span className="text-sm font-medium text-[#2f4f4f]">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  )
}
