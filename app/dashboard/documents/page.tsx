import { DashboardLayout } from "@/components/dashboard-layout"
import { DocumentsView } from "@/components/documents-view"
import { getDocuments } from "@/lib/supabase/queries"

export default async function DocumentsPage() {
  const documentsData = await getDocuments()

  return (
    <DashboardLayout>
      <DocumentsView data={documentsData} />
    </DashboardLayout>
  )
}
