"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Send, Paperclip, Search, MoreVertical } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "María González",
    role: "Directora de Proyecto",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "El informe de progreso está listo para revisión",
    time: "10:30",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    role: "Arquitecto Principal",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "He actualizado los planos según tus comentarios",
    time: "Ayer",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Ingeniera Estructural",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "La inspección está programada para el viernes",
    time: "Ayer",
    unread: 0,
    online: false,
  },
  {
    id: 4,
    name: "Roberto Silva",
    role: "Maestro de Obra",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Fotos del progreso de hoy adjuntas",
    time: "2 días",
    unread: 1,
    online: true,
  },
]

const messages = [
  {
    id: 1,
    sender: "María González",
    content: "Hola Juan, espero que estés bien. Quería informarte que hemos completado la instalación de la pérgola.",
    time: "09:15",
    isOwn: false,
  },
  {
    id: 2,
    sender: "Juan Pérez",
    content: "Excelente noticia! ¿Cuándo podré ver el resultado?",
    time: "09:20",
    isOwn: true,
  },
  {
    id: 3,
    sender: "María González",
    content:
      "Te he enviado algunas fotos al apartado de galería. La estructura quedó perfecta y ya aplicamos el tratamiento de protección.",
    time: "09:25",
    isOwn: false,
  },
  {
    id: 4,
    sender: "Juan Pérez",
    content: "Las fotos se ven increíbles! Estoy muy contento con el resultado.",
    time: "09:30",
    isOwn: true,
  },
  {
    id: 5,
    sender: "María González",
    content:
      "Me alegra mucho que te guste. Ahora comenzaremos con el sistema de riego. El informe de progreso está listo para revisión.",
    time: "10:30",
    isOwn: false,
  },
]

export function MessagesView() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [messageInput, setMessageInput] = useState("")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#2f4f4f]">Mensajes</span>
        </div>
        <div className="mt-4">
          <h1 className="font-serif text-3xl font-bold text-[#2f4f4f] sm:text-4xl">Mensajes</h1>
          <p className="mt-2 text-lg text-[#6b7280]">Comunícate con tu equipo de construcción</p>
        </div>
      </div>

      {/* Messages Interface */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Conversations List */}
        <Card className="border-[#e8e6e0] lg:col-span-1">
          <CardHeader>
            <CardTitle className="font-serif text-xl text-[#2f4f4f]">Conversaciones</CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
              <Input placeholder="Buscar mensajes..." className="pl-10 border-[#e8e6e0] focus-visible:ring-[#2f4f4f]" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="space-y-1 p-4">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full rounded-lg p-3 text-left transition-colors ${
                      selectedConversation.id === conversation.id ? "bg-[#f4f1ea]" : "hover:bg-[#faf8f3]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative flex-shrink-0">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-[#c6b89e] text-[#2f4f4f]">
                            {conversation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[#2f4f4f] truncate">{conversation.name}</p>
                            <p className="text-xs text-[#6b7280] truncate">{conversation.role}</p>
                          </div>
                          <span className="text-xs text-[#9ca3af] whitespace-nowrap">{conversation.time}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between gap-2">
                          <p className="text-sm text-[#6b7280] truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <Badge className="h-5 min-w-[20px] bg-[#2f4f4f] px-1.5 text-xs text-white">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="border-[#e8e6e0] lg:col-span-2">
          <CardHeader className="border-b border-[#e8e6e0]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#c6b89e] text-[#2f4f4f]">
                      {selectedConversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {selectedConversation.online && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-lg text-[#2f4f4f]">{selectedConversation.name}</CardTitle>
                  <CardDescription className="text-sm">{selectedConversation.role}</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="text-[#6b7280]">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[480px] p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[80%] ${message.isOwn ? "flex-row-reverse" : "flex-row"}`}>
                      {!message.isOwn && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-[#c6b89e] text-[#2f4f4f] text-xs">
                            {selectedConversation.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div className={`space-y-1 ${message.isOwn ? "items-end" : "items-start"} flex flex-col`}>
                        <div
                          className={`rounded-2xl px-4 py-2.5 ${
                            message.isOwn
                              ? "bg-[#2f4f4f] text-white"
                              : "bg-[#f4f1ea] text-[#2f4f4f] border border-[#e8e6e0]"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        </div>
                        <span className="text-xs text-[#9ca3af] px-2">{message.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="border-t border-[#e8e6e0] p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setMessageInput("")
                }}
                className="flex gap-2"
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="flex-shrink-0 text-[#6b7280] hover:text-[#2f4f4f]"
                >
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Textarea
                  placeholder="Escribe tu mensaje..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="min-h-[44px] max-h-[120px] resize-none border-[#e8e6e0] focus-visible:ring-[#2f4f4f]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      setMessageInput("")
                    }
                  }}
                />
                <Button type="submit" size="icon" className="flex-shrink-0 bg-[#2f4f4f] text-white hover:bg-[#1f3535]">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
              <p className="mt-2 text-xs text-[#9ca3af]">Presiona Enter para enviar, Shift + Enter para nueva línea</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-[#e8e6e0]">
        <CardHeader>
          <CardTitle className="font-serif text-xl text-[#2f4f4f]">Acciones Rápidas</CardTitle>
          <CardDescription>Contacta directamente con miembros específicos del equipo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {conversations.map((person) => (
              <Button
                key={person.id}
                variant="outline"
                className="h-auto justify-start gap-3 border-[#e8e6e0] p-4 text-left hover:bg-[#f4f1ea] bg-transparent"
                onClick={() => setSelectedConversation(person)}
              >
                <div className="relative flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={person.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-[#c6b89e] text-[#2f4f4f]">{person.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {person.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#2f4f4f] truncate">{person.name}</p>
                  <p className="text-xs text-[#6b7280] truncate">{person.role}</p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
