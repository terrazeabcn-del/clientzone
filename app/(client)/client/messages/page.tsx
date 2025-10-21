import { requireSession } from "@/lib/auth/actions"
import { getClientProjects } from "@/lib/supabase/client-data"
import { getMessages } from "@/lib/supabase/queries"
import { MessagesView } from "@/components/messages-view"
import { Card, CardContent } from "@/components/ui/card"

interface MessagesPageProps {
  searchParams: {
    project?: string
  }
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
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
          Para comenzar una conversación, selecciona primero un proyecto Terrazea.
        </CardContent>
      </Card>
    )
  }

  const data = await getMessages(activeProjectSlug)

  return <MessagesView data={data} />
}
