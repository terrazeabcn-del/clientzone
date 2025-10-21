"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  FolderOpen,
  MessageSquare,
  FileText,
  Settings,
  Bell,
  Search,
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  Leaf,
} from "lucide-react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    name: "Terraza Ático Barcelona",
    location: "Barcelona, España",
    progress: 65,
    status: "En construcción",
    statusColor: "gold",
    nextMilestone: "Instalación de pérgola",
    date: "15 Ene 2025",
    image: "/modern-rooftop-terrace-construction-barcelona-medi.jpg",
    budget: "45.000€",
    daysRemaining: 12,
  },
  {
    id: 2,
    name: "Jardín Villa Mediterránea",
    location: "Valencia, España",
    progress: 30,
    status: "Planificación",
    statusColor: "stone",
    nextMilestone: "Aprobación de diseño",
    date: "22 Ene 2025",
    image: "/mediterranean-villa-garden-design-with-olive-trees.jpg",
    budget: "78.000€",
    daysRemaining: 25,
  },
  {
    id: 3,
    name: "Patio Interior Sevilla",
    location: "Sevilla, España",
    progress: 90,
    status: "Finalizando",
    statusColor: "primary",
    nextMilestone: "Inspección final",
    date: "8 Ene 2025",
    image: "/andalusian-courtyard-patio-with-fountain-tiles-and.jpg",
    budget: "32.000€",
    daysRemaining: 5,
  },
]

const recentActivity = [
  {
    type: "update",
    message: "Nuevo documento subido: Plano de instalación eléctrica",
    project: "Terraza Ático Barcelona",
    time: "Hace 2 horas",
  },
  {
    type: "message",
    message: "Mensaje de tu arquitecto: Confirmación de materiales",
    project: "Jardín Villa Mediterránea",
    time: "Hace 5 horas",
  },
  {
    type: "milestone",
    message: "Hito completado: Pavimentación finalizada",
    project: "Patio Interior Sevilla",
    time: "Ayer",
  },
]

export function DashboardView() {
  const [activeTab, setActiveTab] = useState("proyectos")

  return (
    <div className="min-h-screen bg-sand">
      {/* Top Navigation */}
      <header className="bg-white border-b border-stone sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-xl text-primary font-semibold">Terrazea</span>
            </Link>

            {/* Search */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" />
                <input
                  type="text"
                  placeholder="Buscar proyectos, documentos..."
                  className="w-full pl-10 pr-4 py-2 bg-sand rounded-lg text-sm text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative text-primary hover:bg-sand">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full" />
              </Button>
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">MC</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:block w-64 bg-white border-r border-stone min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-6 space-y-2">
            {[
              { icon: Home, label: "Inicio", value: "inicio" },
              { icon: FolderOpen, label: "Mis Proyectos", value: "proyectos", active: true },
              { icon: MessageSquare, label: "Mensajes", value: "mensajes", badge: 3 },
              { icon: FileText, label: "Documentos", value: "documentos" },
              { icon: Calendar, label: "Calendario", value: "calendario" },
              { icon: Settings, label: "Configuración", value: "configuracion" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  item.active ? "bg-primary text-white" : "text-primary/70 hover:bg-sand hover:text-primary"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && <Badge className="bg-gold text-primary text-xs px-2">{item.badge}</Badge>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl text-primary font-light mb-2">Mis Proyectos</h1>
            <p className="text-primary/60 leading-relaxed">
              Gestiona y supervisa todos tus proyectos exteriores en un solo lugar
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Proyectos activos", value: "3", icon: FolderOpen },
              { label: "Tareas pendientes", value: "12", icon: Clock },
              { label: "Mensajes nuevos", value: "5", icon: MessageSquare },
              { label: "Próxima visita", value: "3 días", icon: Calendar },
            ].map((stat, i) => (
              <Card key={i} className="p-5 bg-white border-stone shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-primary/60 mb-1">{stat.label}</p>
                    <p className="text-2xl font-serif font-semibold text-primary">{stat.value}</p>
                  </div>
                  <div className="w-10 h-10 bg-sand rounded-lg flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-primary font-medium">Proyectos en curso</h2>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 bg-transparent">
                Ver todos
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link key={project.id} href={`/project/${project.id}`}>
                  <Card className="group overflow-hidden bg-white border-stone shadow-sm hover:shadow-md transition-all cursor-pointer">
                    {/* Project Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge
                          className={`${
                            project.statusColor === "gold"
                              ? "bg-gold text-primary"
                              : project.statusColor === "primary"
                                ? "bg-primary text-white"
                                : "bg-stone text-primary"
                          } shadow-sm`}
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-serif text-xl font-semibold text-primary mb-2 group-hover:text-primary-dark transition-colors">
                          {project.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-primary/60">
                          <MapPin className="w-4 h-4" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-primary/60">Progreso</span>
                          <span className="font-medium text-primary">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      {/* Next Milestone */}
                      <div className="pt-2 border-t border-stone">
                        <p className="text-xs text-primary/50 mb-1">Próximo hito</p>
                        <p className="text-sm font-medium text-primary">{project.nextMilestone}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-xs text-primary/60">{project.date}</span>
                          <ChevronRight className="w-4 h-4 text-gold group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-12">
            <h2 className="font-serif text-2xl text-primary font-medium mb-6">Actividad reciente</h2>
            <Card className="bg-white border-stone shadow-sm divide-y divide-stone">
              {recentActivity.map((activity, i) => (
                <div key={i} className="p-5 hover:bg-sand/50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === "update"
                          ? "bg-gold/20"
                          : activity.type === "message"
                            ? "bg-primary/10"
                            : "bg-stone"
                      }`}
                    >
                      {activity.type === "update" && <FileText className="w-5 h-5 text-gold-dark" />}
                      {activity.type === "message" && <MessageSquare className="w-5 h-5 text-primary" />}
                      {activity.type === "milestone" && <Calendar className="w-5 h-5 text-primary" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary mb-1">{activity.message}</p>
                      <p className="text-xs text-primary/50">
                        {activity.project} · {activity.time}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-primary/30 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-stone z-50">
        <div className="flex items-center justify-around px-4 py-3">
          {[
            { icon: Home, label: "Inicio" },
            { icon: FolderOpen, label: "Proyectos", active: true },
            { icon: MessageSquare, label: "Mensajes", badge: true },
            { icon: Settings, label: "Más" },
          ].map((item, i) => (
            <button
              key={i}
              className={`flex flex-col items-center gap-1 relative ${
                item.active ? "text-primary" : "text-primary/50"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && <span className="absolute top-0 right-2 w-2 h-2 bg-gold rounded-full" />}
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}
