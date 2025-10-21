import { DashboardLayout } from "@/components/dashboard-layout"
import { MessagesView } from "@/components/messages-view"
import { getMessages } from "@/lib/supabase/queries"

export default async function MessagesPage() {
  const messagesData = await getMessages()

  return (
    <DashboardLayout>
      <MessagesView data={messagesData} />
    </DashboardLayout>
  )
}
