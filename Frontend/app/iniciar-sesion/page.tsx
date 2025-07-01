"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock, LogIn, FileText } from "lucide-react"

export default function IniciarSesionPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implementar lógica de autenticación con backend
      // - Validar credenciales contra la base de datos
      // - Manejar tokens de sesión
      // - Redirigir según el rol del usuario
      console.log("Credenciales a enviar:", { email, password })
      
      // TODO: Reemplazar con llamada real al API
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      
    } catch (error) {
      console.error("Error al iniciar sesión:", error)
      // TODO: Manejar errores de autenticación
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailCodeVerification = async () => {
    try {
      // TODO: Implementar envío de código por email
      // - Validar que el email existe en la base de datos
      // - Generar y enviar código de verificación
      // - Redirigir a página de verificación de código
      console.log("Enviando código a:", email)
      
      // TODO: Reemplazar con llamada real al API
      // const response = await fetch('/api/auth/send-code', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
    } catch (error) {
      console.error("Error al enviar código:", error)
      // TODO: Manejar errores de envío
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-4 sm:py-8 lg:py-12 px-4">
      <div className="container max-w-md mx-auto">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Header Section */}
          <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-3 sm:mb-4 lg:mb-6 shadow-lg">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-blue-900 tracking-tight">
              Iniciar sesión en SECCTI
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-blue-600 max-w-3xl mx-auto px-2 leading-relaxed">
              Accede a tu cuenta de investigador para gestionar tu perfil y proyectos
            </p>
          </div>

          {/* Login Card */}
          <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden">
            <CardHeader className="text-center pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-blue-900 flex items-center justify-center gap-2 sm:gap-3 font-bold">
                <LogIn className="h-6 w-6 sm:h-7 sm:w-7" />
                Ingresa tus credenciales
              </CardTitle>
              <CardDescription className="text-blue-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                Introduce tu correo electrónico y contraseña para acceder
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 sm:space-y-8 p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2 sm:space-y-3">
                  <label
                    htmlFor="email"
                    className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Mail className="h-4 w-4" />
                    Correo electrónico
                  </label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingresa tu correo"
                      className="h-11 sm:h-12 bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                    >
                      <Lock className="h-4 w-4" />
                      Contraseña
                    </label>
                    <Link
                      href="/recuperar-contrasena"
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium underline underline-offset-4 transition-colors duration-200"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa tu contraseña"
                      className="h-11 sm:h-12 bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 pr-12 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 rounded-xl"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-700 transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 sm:h-14 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base lg:text-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Iniciando sesión...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <LogIn className="w-5 h-5" />
                      Iniciar sesión
                    </div>
                  )}
                </Button>
              </form>

              {/* Email Code Verification Option */}
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-blue-200" />
                  </div>
                  <div className="relative flex justify-center text-xs sm:text-sm uppercase">
                    <span className="bg-white px-4 py-1 text-blue-600 font-medium rounded-full">O</span>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleEmailCodeVerification}
                  className="w-full h-11 sm:h-12 border-2 border-blue-200 bg-white text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Enviar código a mi correo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Register Link */}
          <div className="text-center text-sm sm:text-base text-blue-600 max-w-md mx-auto">
            <p>
              ¿No tienes una cuenta?{" "}
              <Link
                href="/registro"
                className="text-blue-700 underline underline-offset-4 hover:text-blue-900 font-semibold transition-colors duration-300"
              >
                Regístrate
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
