"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { createServerSupabaseClient } from "../supabase/server"
import { createSessionCookie, destroySessionCookie, getSession } from "./session"

export interface LoginResult {
  success: boolean
  message?: string
  redirectTo?: string
}

export async function loginWithEmailAndPassword(email: string, password: string): Promise<LoginResult> {
  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { success: false, message: "Introduce un correo electrónico válido." }
  }

  if (!password.trim()) {
    return { success: false, message: "Introduce tu contraseña." }
  }

  const supabase = createServerSupabaseClient()

  // Verificar usuario y contraseña
  const { data: user, error: userError } = await supabase
    .from("app_users")
    .select("id, email, full_name, role, password_hash")
    .eq("email", normalizedEmail)
    .eq("is_active", true)
    .maybeSingle()

  if (userError) {
    console.error("Error fetching user", userError)
    return { success: false, message: "No hemos podido iniciar sesión. Inténtalo de nuevo." }
  }

  if (!user) {
    return { success: false, message: "No encontramos este correo en Terrazea. ¿Lo has escrito bien?" }
  }

  // Verificar contraseña usando pgcrypto
  const { data: passwordValid, error: passwordError } = await supabase
    .rpc('verify_password', { 
      password_input: password.trim(), 
      password_hash: user.password_hash 
    })

  if (passwordError || !passwordValid) {
    console.error("Password verification error", passwordError)
    return { success: false, message: "La contraseña no es correcta." }
  }

  // Lookup or create client record linked by email
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id, full_name, email")
    .eq("email", normalizedEmail)
    .maybeSingle()

  if (clientError) {
    console.error("Error fetching client", clientError)
    return { success: false, message: "Ha ocurrido un problema al validar tu acceso." }
  }

  let clientId = client?.id ?? null
  let displayName = client?.full_name ?? user.full_name ?? normalizedEmail.split("@")[0]

  if (!clientId) {
    const { data: insertedClient, error: insertError } = await supabase
      .from("clients")
      .insert({
        full_name: displayName,
        email: normalizedEmail,
      })
      .select("id")
      .maybeSingle()

    if (insertError || !insertedClient) {
      console.error("Error creating client record", insertError)
      return { success: false, message: "No hemos podido completar el acceso. Por favor, inténtalo más tarde." }
    }

    clientId = insertedClient.id
  }

  const sessionData = {
    userId: user.id,
    email: normalizedEmail,
    name: displayName,
    clientId,
    role: user.role,
  }

  await createSessionCookie(sessionData)
  revalidatePath("/client")

  return { 
    success: true, 
    redirectTo: "/client/dashboard?welcome=1", 
    message: "Acceso concedido. Redirigiendo a tu zona privada..." 
  }
}

export async function loginWithProjectCode(projectCode: string): Promise<LoginResult> {
  const trimmedCode = projectCode.trim()
  if (!trimmedCode) {
    return { success: false, message: "Introduce tu código de proyecto." }
  }

  const supabase = createServerSupabaseClient()

  // Buscar proyecto por código
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select(`
      id, slug, code, name, client_id,
      clients!inner(id, full_name, email)
    `)
    .eq("code", trimmedCode)
    .maybeSingle()

  if (projectError) {
    console.error("Error fetching project", projectError)
    return { success: false, message: "No hemos podido verificar el código. Inténtalo de nuevo." }
  }

  if (!project) {
    return { success: false, message: "No encontramos un proyecto con este código. ¿Lo has escrito correctamente?" }
  }

  // Buscar o crear usuario app_users para el cliente
  const clientEmail = project.clients.email
  const { data: user, error: userError } = await supabase
    .from("app_users")
    .select("id, email, full_name, role")
    .eq("email", clientEmail)
    .eq("is_active", true)
    .maybeSingle()

  if (userError) {
    console.error("Error fetching user", userError)
    return { success: false, message: "Ha ocurrido un problema al validar tu acceso." }
  }

  if (!user) {
    return { success: false, message: "No tienes acceso a este proyecto. Contacta con Terrazea." }
  }

  const sessionData = {
    userId: user.id,
    email: clientEmail,
    name: project.clients.full_name,
    clientId: project.client_id,
    role: user.role,
  }

  await createSessionCookie(sessionData)
  revalidatePath("/client")

  return { 
    success: true, 
    redirectTo: `/client/dashboard?project=${encodeURIComponent(project.slug)}&welcome=1`, 
    message: "Acceso concedido. Redirigiendo a tu proyecto..." 
  }
}

export async function loginWithEmail(email: string, projectCode?: string): Promise<LoginResult> {
  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { success: false, message: "Introduce un correo electrónico válido." }
  }

  const supabase = createServerSupabaseClient()

  const { data: user, error: userError } = await supabase
    .from("app_users")
    .select("id, email, display_name, role")
    .eq("email", normalizedEmail)
    .maybeSingle()

  if (userError) {
    console.error("Error fetching user", userError)
    return { success: false, message: "No hemos podido iniciar sesión. Inténtalo de nuevo." }
  }

  if (!user) {
    return { success: false, message: "No encontramos este correo en Terrazea. ¿Lo has escrito bien?" }
  }

  // Lookup or create client record linked by email
  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id, full_name, email")
    .eq("email", normalizedEmail)
    .maybeSingle()

  if (clientError) {
    console.error("Error fetching client", clientError)
    return { success: false, message: "Ha ocurrido un problema al validar tu acceso." }
  }

  let clientId = client?.id ?? null
  let displayName = client?.full_name ?? user.display_name ?? normalizedEmail.split("@")[0]

  if (!clientId) {
    const { data: insertedClient, error: insertError } = await supabase
      .from("clients")
      .insert({
        full_name: displayName,
        email: normalizedEmail,
      })
      .select("id")
      .maybeSingle()

    if (insertError || !insertedClient) {
      console.error("Error creating client record", insertError)
      return { success: false, message: "No hemos podido completar el acceso. Por favor, inténtalo más tarde." }
    }

    clientId = insertedClient.id
  }

  const sessionData = {
    userId: user.id,
    email: normalizedEmail,
    name: displayName,
    clientId,
  }

  await createSessionCookie(sessionData)

  revalidatePath("/client")
  let redirectTo = "/client/dashboard?welcome=1"

  if (projectCode && clientId) {
    const trimmedCode = projectCode.trim()
    const { data: projectByCode, error: projectError } = await supabase
      .from("projects")
      .select("slug, code, client_id")
      .eq("code", trimmedCode)
      .eq("client_id", clientId)
      .maybeSingle()

    if (!projectError && projectByCode?.slug) {
      redirectTo = `/client/dashboard?project=${encodeURIComponent(projectByCode.slug)}&welcome=1`
    } else {
      redirectTo = `/client/projects?project=${encodeURIComponent(trimmedCode)}`
    }
  }

  return { success: true, redirectTo, message: "Acceso concedido. Redirigiendo a tu zona privada..." }
}

export async function logout() {
  await destroySessionCookie()
  revalidatePath("/client")
  redirect("/login")
}

export async function requireSession() {
  const session = await getSession()
  if (!session) {
    redirect("/login?reason=unauthenticated")
  }
  return session
}
