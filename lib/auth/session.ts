import { cookies, type RequestCookies } from "next/headers"
import { NextResponse } from "next/server"

const SESSION_COOKIE_NAME = "terrazea_session"
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

const SESSION_SECRET = process.env.SESSION_SECRET ?? "terrazea-development-secret"

export interface SessionData {
  userId: string
  email: string
  name: string
  clientId: string | null
}

interface ParsedSession {
  session: SessionData | null
  isValid: boolean
}

async function signPayload(payload: string) {
  const encoder = new TextEncoder()
  const keyData = encoder.encode(SESSION_SECRET)
  const payloadData = encoder.encode(payload)
  const key = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  const signature = await crypto.subtle.sign("HMAC", key, payloadData)
  return Buffer.from(signature).toString("base64url")
}

async function verifySignature(payload: string, signature: string) {
  const expected = await signPayload(payload)
  return safeEqual(expected, signature)
}

function encodeSession(session: SessionData) {
  return Buffer.from(JSON.stringify(session)).toString("base64url")
}

function decodeSession(encoded: string) {
  try {
    const json = Buffer.from(encoded, "base64url").toString("utf-8")
    return JSON.parse(json) as SessionData
  } catch {
    return null
  }
}

async function parseSessionCookie(rawValue: string | undefined): Promise<ParsedSession> {
  if (!rawValue) {
    return { session: null, isValid: false }
  }

  const [payload, signature] = rawValue.split(".")
  if (!payload || !signature) {
    return { session: null, isValid: false }
  }

  const isValid = await verifySignature(payload, signature)
  if (!isValid) {
    return { session: null, isValid: false }
  }

  const session = decodeSession(payload)
  if (!session) {
    return { session: null, isValid: false }
  }

  return { session, isValid: true }
}

export async function getSession(): Promise<SessionData | null> {
  const store = await cookies()
  const raw = store.get(SESSION_COOKIE_NAME)?.value
  const { session, isValid } = await parseSessionCookie(raw)

  if (!isValid && raw) {
    store.delete(SESSION_COOKIE_NAME)
  }

  return session
}

export async function getSessionFromCookies(store: RequestCookies): Promise<SessionData | null> {
  const raw = store.get(SESSION_COOKIE_NAME)?.value
  const { session, isValid } = await parseSessionCookie(raw)

  if (!isValid && raw) {
    store.delete(SESSION_COOKIE_NAME)
  }

  return session
}

export async function createSessionCookie(session: SessionData) {
  const store = await cookies()
  const payload = encodeSession(session)
  const signature = await signPayload(payload)
  const value = `${payload}.${signature}`

  store.set(SESSION_COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  })
}

export async function destroySessionCookie() {
  const store = await cookies()
  store.delete(SESSION_COOKIE_NAME)
}

export function redirectToLogin(requestUrl: URL, reason?: "unauthenticated" | "forbidden") {
  const loginUrl = new URL("/login", requestUrl.origin)
  loginUrl.searchParams.set("redirect", requestUrl.pathname + requestUrl.search)
  if (reason) {
    loginUrl.searchParams.set("reason", reason)
  }
  return NextResponse.redirect(loginUrl)
}

export function sessionCookieName() {
  return SESSION_COOKIE_NAME
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}
