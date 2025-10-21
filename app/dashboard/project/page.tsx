import { DashboardLayout } from "@/components/dashboard-layout"
import { ProjectDetails } from "@/components/project-details"
import { getProjectDetails } from "@/lib/supabase/queries"

export default async function ProjectPage() {
  const projectData = await getProjectDetails()

  return (
    <DashboardLayout>
      <ProjectDetails data={projectData} />
    </DashboardLayout>
  )
}
