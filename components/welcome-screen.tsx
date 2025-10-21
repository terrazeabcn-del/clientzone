"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Leaf, Shield, Sparkles, Mail } from "lucide-react"
import Link from "next/link"

export function WelcomeScreen() {
  const [activeTab, setActiveTab] = useState<"password" | "magic">("password")

  return (
    <div className="min-h-screen bg-[#e8f4f0]">
      <header className="fixed top-0 left-0 right-0 z-50 liquid-glass-strong border-b border-white/20">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-[#2f4f4f]" />
            <span className="text-sm font-medium tracking-wide text-[#2f4f4f] uppercase">Terrazea</span>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start mt-12">
            {/* Columna izquierda - Información */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Título principal */}
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-[#2f4f4f] leading-tight tracking-tight">
                  Accede a tu espacio Terrazea con confianza.
                </h1>
                <p className="text-lg text-[#6b7280] leading-relaxed">
                  Si tu project manager te envió credenciales, usa tu contraseña temporal. También puedes solicitar un
                  enlace mágico si lo prefieres.
                </p>
              </div>

              {/* Feature cards */}
              <div className="grid gap-4 mt-8">
                <div className="liquid-glass-strong rounded-2xl p-6 shadow-apple-md hover-lift-apple">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Sparkles className="h-6 w-6 text-[#2f4f4f]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2f4f4f] mb-1">Interfaz "liquid glass" pensada para</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed">
                        transmitir calma y claridad en cada visita.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="liquid-glass-strong rounded-2xl p-6 shadow-apple-md hover-lift-apple">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <Shield className="h-6 w-6 text-[#2f4f4f]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#2f4f4f] mb-1">Credenciales creadas por tu project manager</h3>
                      <p className="text-sm text-[#6b7280] leading-relaxed">
                        y enlaces seguros enviados desde Terrazea.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha - Login card */}
            <div className="animate-scale-in">
              <div className="liquid-glass-strong rounded-3xl p-8 shadow-apple-xl">
                {/* Header del card */}
                <div className="flex items-center gap-3 mb-8">
                  <Mail className="h-6 w-6 text-[#2f4f4f]" />
                  <h2 className="text-2xl font-bold text-[#2f4f4f]">Acceso Terrazea</h2>
                </div>

                <p className="text-sm text-[#6b7280] mb-6 leading-relaxed">
                  Usa tus credenciales temporales o solicita un enlace mágico. Tras el primer acceso, recomendamos
                  cambiar la contraseña desde el perfil.
                </p>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 p-1 bg-white/50 rounded-xl">
                  <button
                    onClick={() => setActiveTab("password")}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "password"
                        ? "bg-white text-[#2f4f4f] shadow-apple-md"
                        : "text-[#6b7280] hover:text-[#2f4f4f]"
                    }`}
                  >
                    Con contraseña
                  </button>
                  <button
                    onClick={() => setActiveTab("magic")}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeTab === "magic"
                        ? "bg-white text-[#2f4f4f] shadow-apple-md"
                        : "text-[#6b7280] hover:text-[#2f4f4f]"
                    }`}
                  >
                    Enlace mágico
                  </button>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-[#2f4f4f]">
                      Correo
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu-correo@terrazea.com"
                      className="h-11 bg-white/80 border-white/40 focus-visible:ring-0 focus-visible:border-[#2f4f4f] rounded-xl"
                    />
                  </div>

                  {activeTab === "password" && (
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium text-[#2f4f4f]">
                        Contraseña
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Tu contraseña temporal"
                        className="h-11 bg-white/80 border-white/40 focus-visible:ring-0 focus-visible:border-[#2f4f4f] rounded-xl"
                      />
                    </div>
                  )}

                  <Link href="/dashboard" className="block">
                    <Button
                      type="button"
                      className="w-full h-12 bg-[#2f4f4f] hover:bg-[#1f3535] text-white rounded-xl font-medium shadow-apple-md hover:shadow-apple-lg transition-all"
                    >
                      Entrar
                    </Button>
                  </Link>
                </form>
              </div>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-6 animate-fade-in">
            <div className="liquid-glass-strong rounded-2xl p-8 shadow-apple-md hover-lift-apple text-center">
              <Sparkles className="h-8 w-8 text-[#2f4f4f] mx-auto mb-4" />
              <h3 className="font-semibold text-[#2f4f4f] mb-2">Experiencia transparente</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Sigue cada avance con timelines vivos, renders actualizados y mensajes empáticos del equipo.
              </p>
            </div>

            <div className="liquid-glass-strong rounded-2xl p-8 shadow-apple-md hover-lift-apple text-center">
              <Leaf className="h-8 w-8 text-[#2f4f4f] mx-auto mb-4" />
              <h3 className="font-semibold text-[#2f4f4f] mb-2">Cuidado integral</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Recomendaciones personalizadas según tu clima, estilo de vida y sensaciones buscadas.
              </p>
            </div>

            <div className="liquid-glass-strong rounded-2xl p-8 shadow-apple-md hover-lift-apple text-center">
              <Shield className="h-8 w-8 text-[#2f4f4f] mx-auto mb-4" />
              <h3 className="font-semibold text-[#2f4f4f] mb-2">Confianza y seguridad</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Autenticación protegida, datos cifrados y soporte humano disponible en todo momento.
              </p>
            </div>
          </div>

          <div className="mt-20 liquid-glass-strong rounded-3xl p-12 shadow-apple-xl animate-fade-in">
            <h2 className="text-3xl font-bold text-[#2f4f4f] mb-12 text-center">Nuestro ritual contigo</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="text-xs font-semibold text-[#6b7280] tracking-widest uppercase mb-3">Paso 1</div>
                <h3 className="text-xl font-bold text-[#2f4f4f]">Descubre el potencial</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Conecta con tu diseñador y co-crea el mood Terrazea que respira tu forma de vivir.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="text-xs font-semibold text-[#6b7280] tracking-widest uppercase mb-3">Paso 2</div>
                <h3 className="text-xl font-bold text-[#2f4f4f]">Acompañamiento calmado</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Recibe actualizaciones sensibles, visitas guiadas y ajustes a medida sin perder serenidad.
                </p>
              </div>

              <div className="text-center space-y-3">
                <div className="text-xs font-semibold text-[#6b7280] tracking-widest uppercase mb-3">Paso 3</div>
                <h3 className="text-xl font-bold text-[#2f4f4f]">Entrega sensorial</h3>
                <p className="text-sm text-[#6b7280] leading-relaxed">
                  Tu espacio exterior listo para abrazar momentos. Nosotros seguimos a tu lado cuando lo necesites.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-[#6b7280] leading-relaxed max-w-3xl mx-auto">
                Terrazea acompaña humanamente cada proyecto exterior. Tu panel es el puente entre la visión y el espacio
                tangible que imaginas.
              </p>
              <Link href="/dashboard">
                <Button className="mt-6 bg-[#2f4f4f] hover:bg-[#1f3535] text-white px-8 h-11 rounded-xl font-medium shadow-apple-md hover:shadow-apple-lg transition-all">
                  Empezar con Terrazea Cliente
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
