import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard-overview"
import { getDashboardData } from "@/lib/supabase/queries"

export default async function DashboardPage() {
  const dashboardData = await getDashboardData()

  return (
    <DashboardLayout>
      <DashboardOverview data={dashboardData} />
    </DashboardLayout>
  )
}
