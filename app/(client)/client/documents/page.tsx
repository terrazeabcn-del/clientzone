import { requireSession } from "@/lib/auth/actions"
import { getClientProjects } from "@/lib/supabase/client-data"
import { getDocuments } from "@/lib/supabase/queries"
import { DocumentsView } from "@/components/documents-view"
import { Card, CardContent } from "@/components/ui/card"

interface DocumentsPageProps {
  searchParams: {
    project?: string
  }
}

export default async function DocumentsPage({ searchParams }: DocumentsPageProps) {
  const session = await requireSession()
  if (!session.clientId) {
    return null
  }

  const projects = await getClientProjects(session.clientId)
  const activeProjectSlug = searchParams.project ?? projects[0]?.slug ?? null

  if (!activeProjectSlug) {
    return (
      <Card className="border-[#E8E6E0] bg-white/90 shadow-apple-lg">
        <CardContent className="p-8 text-center text-sm text-[#6B7280]">
          Aún no tienes documentos disponibles. Cuando tu proyecto avance se irán publicando aquí.
        </CardContent>
      </Card>
    )
  }

  const data = await getDocuments(activeProjectSlug)

  return (
    <div className="space-y-6">
      <DocumentsView data={data} />
    </div>
  )
}
