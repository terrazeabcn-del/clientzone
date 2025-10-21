"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Download,
  Search,
  Filter,
  ChevronRight,
  File,
  ImageIcon,
  FileSpreadsheet,
  Calendar,
  Eye,
} from "lucide-react"

const documents = [
  {
    id: 1,
    name: "Licencia de obra municipal",
    category: "Legal",
    type: "PDF",
    size: "2.4 MB",
    date: "10 Ene 2024",
    status: "Aprobado",
  },
  {
    id: 2,
    name: "Plano arquitectónico - Terraza",
    category: "Planos",
    type: "PDF",
    size: "8.1 MB",
    date: "12 Ene 2024",
    status: "Vigente",
  },
  {
    id: 3,
    name: "Especificaciones técnicas pérgola",
    category: "Técnico",
    type: "PDF",
    size: "1.2 MB",
    date: "15 Ene 2024",
    status: "Vigente",
  },
  {
    id: 4,
    name: "Certificado materiales - Piedra",
    category: "Certificados",
    type: "PDF",
    size: "890 KB",
    date: "20 Ene 2024",
    status: "Vigente",
  },
  {
    id: 5,
    name: "Presupuesto detallado",
    category: "Financiero",
    type: "XLSX",
    size: "456 KB",
    date: "8 Ene 2024",
    status: "Aprobado",
  },
  {
    id: 6,
    name: "Cronograma de obra",
    category: "Planificación",
    type: "PDF",
    size: "1.8 MB",
    date: "10 Ene 2024",
    status: "Actualizado",
  },
  {
    id: 7,
    name: "Informe de inspección estructural",
    category: "Certificados",
    type: "PDF",
    size: "3.2 MB",
    date: "25 Ene 2024",
    status: "Aprobado",
  },
  {
    id: 8,
    name: "Garantía sistema de riego",
    category: "Garantías",
    type: "PDF",
    size: "720 KB",
    date: "1 Mar 2024",
    status: "Vigente",
  },
]

export function DocumentsView() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = documents.filter((doc) => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-[#6b7280]">
          <span>Dashboard</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-[#2f4f4f]">Documentos</span>
        </div>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#2f4f4f] sm:text-4xl">Documentos del Proyecto</h1>
            <p className="mt-2 text-lg text-[#6b7280]">Accede a toda la documentación técnica y legal</p>
          </div>
          <Button className="bg-[#2f4f4f] text-white hover:bg-[#1f3535]">
            <Download className="mr-2 h-4 w-4" />
            Descargar Todo
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Total Documentos</CardTitle>
            <FileText className="h-4 w-4 text-[#c6b89e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2f4f4f]">24</div>
            <p className="mt-1 text-xs text-[#6b7280]">3 añadidos esta semana</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Planos</CardTitle>
            <ImageIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2f4f4f]">8</div>
            <p className="mt-1 text-xs text-[#6b7280]">Arquitectónicos y técnicos</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Certificados</CardTitle>
            <File className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2f4f4f]">6</div>
            <p className="mt-1 text-xs text-[#6b7280]">Todos vigentes</p>
          </CardContent>
        </Card>

        <Card className="border-[#e8e6e0]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#6b7280]">Garantías</CardTitle>
            <FileSpreadsheet className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#2f4f4f]">4</div>
            <p className="mt-1 text-xs text-[#6b7280]">Materiales y trabajos</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-[#e8e6e0]">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6b7280]" />
              <Input
                placeholder="Buscar documentos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#e8e6e0] focus-visible:ring-[#2f4f4f]"
              />
            </div>
            <Button variant="outline" className="border-[#e8e6e0] text-[#2f4f4f] hover:bg-[#f4f1ea] bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-white border border-[#e8e6e0]">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="plans">Planos</TabsTrigger>
          <TabsTrigger value="certificates">Certificados</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card className="border-[#e8e6e0]">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-[#2f4f4f]">Todos los Documentos</CardTitle>
              <CardDescription>Lista completa de documentación del proyecto</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredDocuments.map((doc) => (
                  <DocumentItem key={doc.id} document={doc} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <Card className="border-[#e8e6e0]">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-[#2f4f4f]">Planos y Diseños</CardTitle>
              <CardDescription>Documentación técnica y arquitectónica</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredDocuments
                  .filter((doc) => doc.category === "Planos")
                  .map((doc) => (
                    <DocumentItem key={doc.id} document={doc} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates" className="space-y-4">
          <Card className="border-[#e8e6e0]">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-[#2f4f4f]">Certificados</CardTitle>
              <CardDescription>Certificaciones técnicas y de materiales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredDocuments
                  .filter((doc) => doc.category === "Certificados")
                  .map((doc) => (
                    <DocumentItem key={doc.id} document={doc} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal" className="space-y-4">
          <Card className="border-[#e8e6e0]">
            <CardHeader>
              <CardTitle className="font-serif text-xl text-[#2f4f4f]">Documentación Legal</CardTitle>
              <CardDescription>Permisos, licencias y documentos legales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredDocuments
                  .filter((doc) => doc.category === "Legal")
                  .map((doc) => (
                    <DocumentItem key={doc.id} document={doc} />
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function DocumentItem({ document }: { document: any }) {
  const getFileIcon = (type: string) => {
    switch (type) {
      case "PDF":
        return <FileText className="h-5 w-5 text-red-600" />
      case "XLSX":
        return <FileSpreadsheet className="h-5 w-5 text-green-600" />
      case "IMG":
        return <ImageIcon className="h-5 w-5 text-blue-600" />
      default:
        return <File className="h-5 w-5 text-[#6b7280]" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Aprobado":
        return "bg-green-500/10 text-green-700"
      case "Vigente":
        return "bg-blue-500/10 text-blue-700"
      case "Actualizado":
        return "bg-orange-500/10 text-orange-700"
      default:
        return "bg-gray-500/10 text-gray-700"
    }
  }

  return (
    <div className="flex items-center gap-4 rounded-lg border border-[#e8e6e0] p-4 transition-colors hover:bg-[#f4f1ea]">
      <div className="flex-shrink-0">{getFileIcon(document.type)}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[#2f4f4f] truncate">{document.name}</p>
        <div className="mt-1 flex items-center gap-3 text-xs text-[#6b7280]">
          <span>{document.category}</span>
          <span>•</span>
          <span>{document.size}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{document.date}</span>
          </div>
        </div>
      </div>
      <Badge className={getStatusColor(document.status)}>{document.status}</Badge>
      <div className="flex gap-2">
        <Button variant="ghost" size="sm" className="text-[#2f4f4f]">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" className="text-[#2f4f4f]">
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
