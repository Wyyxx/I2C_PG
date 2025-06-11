"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Info,
  AlertCircle,
  Upload,
  FileText,
  CheckCircle,
  User,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Flag,
  Hash,
  CreditCard,
  Briefcase,
  Eye,
  EyeOff,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre_completo: "",
    curp: "",
    rfc: "",
    no_cvu: "",
    correo: "",
    telefono: "",
    ultimo_grado_estudios: "",
    empleo_actual: "",
    linea_investigacion: "",
    nacionalidad: "Mexicana",
    fecha_nacimiento: "",
    password: "",
    confirm_password: "",
  })
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tipo de archivo
      if (file.type !== "application/pdf") {
        setError("Por favor selecciona un archivo PDF válido")
        setSelectedFile(null)
        // Reset the input value
        e.target.value = ""
        return
      }

      // Validar tamaño de archivo (2MB = 2 * 1024 * 1024 bytes)
      const maxSize = 2 * 1024 * 1024 // 2MB en bytes
      const fileSizeMB = (file.size / 1024 / 1024).toFixed(2)

      if (file.size > maxSize) {
        setError(`El archivo es demasiado grande. El tamaño máximo permitido es 2MB. Tu archivo pesa ${fileSizeMB}MB`)
        setSelectedFile(null)
        // Reset the input value
        e.target.value = ""
        return
      }

      // Si el archivo es válido, mostrar mensaje de éxito con el peso
      setSelectedFile(file)
      setError(null)
    } else {
      setSelectedFile(null)
      setError(null)
    }
  }

  // Validar fortaleza de contraseña
  const validatePassword = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const score = Object.values(requirements).filter(Boolean).length
    return { requirements, score, isValid: score >= 4 }
  }

  // Validar que todos los campos requeridos estén completos
  const validateForm = () => {
    const requiredFields = [
      { field: "nombre_completo", label: "Nombre Completo" },
      { field: "correo", label: "Correo Electrónico" },
      { field: "telefono", label: "Teléfono" },
      { field: "ultimo_grado_estudios", label: "Último Grado de Estudios" },
      { field: "empleo_actual", label: "Empleo Actual" },
      { field: "linea_investigacion", label: "Línea de Investigación" },
      { field: "nacionalidad", label: "Nacionalidad" },
      { field: "fecha_nacimiento", label: "Fecha de Nacimiento" },
      { field: "no_cvu", label: "CVU/PU" },
      { field: "curp", label: "CURP" },
      { field: "rfc", label: "RFC" },
      { field: "password", label: "Contraseña" },
      { field: "confirm_password", label: "Confirmar Contraseña" },
    ]

    const emptyFields = requiredFields.filter((field) => !formData[field.field as keyof typeof formData]?.trim())
    return emptyFields
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      setError("Debes subir tu Perfil Único en PDF antes de continuar")
      return
    }

    const emptyFields = validateForm()
    if (emptyFields.length > 0) {
      setError(`Por favor completa los siguientes campos: ${emptyFields.map((field) => field.label).join(", ")}`)
      return
    }

    if (formData.password !== formData.confirm_password) {
      setError("Las contraseñas no coinciden")
      return
    }

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      setError("La contraseña no cumple con los requisitos mínimos de seguridad")
      return
    }

    // Aquí se implementará la lógica de envío al backend
    router.push("/registro/exito")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-blue-900">Regístrate en SECCTI</h1>
            <p className="text-lg text-blue-600 max-w-2xl mx-auto">
              Sube tu Perfil Único (PU) en PDF para crear tu cuenta de investigador
            </p>
          </div>

          {/* Info Alert */}
          <div className="max-w-3xl mx-auto">
            <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm">
              <Info className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-900 font-semibold">Registro con Perfil Único</AlertTitle>
              <AlertDescription className="text-blue-700">
                Para garantizar la precisión de los datos, es necesario que subas tu Perfil Único en formato PDF.
              </AlertDescription>
            </Alert>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Paso 1: Subir PDF */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <span className="text-blue-600 font-bold text-lg">1</span>
                </div>
                <CardTitle className="text-2xl text-blue-900 flex items-center justify-center gap-2">
                  <Upload className="h-6 w-6" />
                  Subir Perfil Único
                </CardTitle>
                <CardDescription className="text-blue-600">
                  Selecciona tu Perfil Único (PU) en formato PDF
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="pdf-upload" className="text-blue-900 font-medium">
                    Archivo PDF del Perfil Único * (Máximo 2MB)
                  </Label>
                  <div className="relative">
                    <Input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="bg-white border-blue-200 text-blue-900 file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 hover:file:bg-blue-100 transition-colors"
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error de archivo</AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  {selectedFile && (
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div className="flex-1">
                        <span className="text-sm text-green-700 font-medium block">{selectedFile.name}</span>
                        <span className="text-xs text-green-600">
                          Archivo válido - Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                  <h3 className="font-semibold mb-3 text-blue-900 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Requisitos del archivo
                  </h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>
                        <strong>Formato:</strong> Solo archivos PDF
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>
                        <strong>Tamaño máximo:</strong> 2MB
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span>
                        <strong>Contenido:</strong> Perfil Único (PU) actualizado
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Paso 2: Formulario */}
            <Card className="bg-white/80 backdrop-blur-sm border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="text-center pb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <span className="text-blue-600 font-bold text-lg">2</span>
                </div>
                <CardTitle className="text-2xl text-blue-900">Completar Datos</CardTitle>
                <CardDescription className="text-blue-600">
                  Completa la información adicional necesaria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre_completo">
                        <User className="w-4 h-4 inline mr-2" />
                        Nombre Completo
                      </Label>
                      <Input
                        id="nombre_completo"
                        name="nombre_completo"
                        value={formData.nombre_completo}
                        onChange={handleChange}
                        placeholder="Dr. Juan Pérez García"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="correo">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Correo Electrónico
                      </Label>
                      <Input
                        id="correo"
                        name="correo"
                        type="email"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="juan.perez@universidad.edu"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Teléfono
                      </Label>
                      <Input
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="614-123-4567"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ultimo_grado_estudios">
                        <GraduationCap className="w-4 h-4 inline mr-2" />
                        Último Grado de Estudios
                      </Label>
                      <Input
                        id="ultimo_grado_estudios"
                        name="ultimo_grado_estudios"
                        value={formData.ultimo_grado_estudios}
                        onChange={handleChange}
                        placeholder="Doctorado en Ciencias"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="empleo_actual">
                        <Briefcase className="w-4 h-4 inline mr-2" />
                        Empleo Actual
                      </Label>
                      <Input
                        id="empleo_actual"
                        name="empleo_actual"
                        value={formData.empleo_actual}
                        onChange={handleChange}
                        placeholder="Profesor-Investigador"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="linea_investigacion">Línea de Investigación</Label>
                      <Textarea
                        id="linea_investigacion"
                        name="linea_investigacion"
                        value={formData.linea_investigacion}
                        onChange={handleChange}
                        placeholder="Describa su línea de investigación principal"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nacionalidad">
                        <Flag className="w-4 h-4 inline mr-2" />
                        Nacionalidad
                      </Label>
                      <Input
                        id="nacionalidad"
                        name="nacionalidad"
                        value={formData.nacionalidad}
                        onChange={handleChange}
                        placeholder="Mexicana"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fecha_nacimiento">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Fecha de Nacimiento
                      </Label>
                      <Input
                        id="fecha_nacimiento"
                        name="fecha_nacimiento"
                        type="date"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="no_cvu">
                        <Hash className="w-4 h-4 inline mr-2" />
                        CVU/PU
                      </Label>
                      <Input
                        id="no_cvu"
                        name="no_cvu"
                        value={formData.no_cvu}
                        onChange={handleChange}
                        placeholder="123456"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="curp">
                        <CreditCard className="w-4 h-4 inline mr-2" />
                        CURP
                      </Label>
                      <Input
                        id="curp"
                        name="curp"
                        value={formData.curp}
                        onChange={handleChange}
                        placeholder="PEGJ800101HCHRNN09"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rfc">RFC</Label>
                      <Input
                        id="rfc"
                        name="rfc"
                        value={formData.rfc}
                        onChange={handleChange}
                        placeholder="PEGJ800101ABC"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2.5"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm_password">Confirmar Contraseña</Label>
                      <div className="relative">
                        <Input
                          id="confirm_password"
                          name="confirm_password"
                          type={showConfirmPassword ? "text" : "password"}
                          value={formData.confirm_password}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="absolute right-2 top-2.5"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
                      Cancelar
                    </Link>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800"
                    >
                      Registrarse
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
