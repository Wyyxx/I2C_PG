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
  Loader2,
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
  AlertTriangle,
  Eye,
  Edit,
  EyeOff,
  Lock,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
    otra_nacionalidad: "",
    fecha_nacimiento: "",
    password: "",
    confirm_password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isProcessingPDF, setIsProcessingPDF] = useState(false)
  const [ocrCompleted, setOcrCompleted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tipo de archivo
      if (file.type !== "application/pdf") {
        setError("Por favor selecciona un archivo PDF válido")
        setSelectedFile(null)
        setOcrCompleted(false)
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
        setOcrCompleted(false)
        // Reset the input value
        e.target.value = ""
        return
      }

      // Si el archivo es válido, mostrar mensaje de éxito con el peso
      setSelectedFile(file)
      setError(null)
      setOcrCompleted(false)

      // Limpiar formulario cuando se selecciona nuevo archivo
      setFormData({
        nombre_completo: "",
        curp: "",
        rfc: "",
        no_cvu: "",
        correo: "",
        telefono: "",
        ultimo_grado_estudios: "",
        empleo_actual: "",
        linea_investigacion: "", // Este campo siempre se mantiene vacío para captura manual
        nacionalidad: "Mexicana",
        otra_nacionalidad: "",
        fecha_nacimiento: "",
        password: "",
        confirm_password: "",
      })
    } else {
      setSelectedFile(null)
      setOcrCompleted(false)
      setError(null)
    }
  }

  const handlePDFUpload = async () => {
    if (!selectedFile) return

    setIsProcessingPDF(true)
    setError(null)

    try {
      // Crear FormData para enviar el archivo
      const formData = new FormData()
      formData.append('file', selectedFile)

      // Llamar al endpoint de OCR
      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || 'Error al procesar el PDF')
      }

      if (!responseData.success) {
        throw new Error(responseData.message || 'Error al procesar el PDF')
      }

      // Extraer los datos del PDF
      const extractedData = responseData.data

      // Actualizar el formulario con los datos extraídos
      setFormData((prev) => ({
        ...prev,
        nombre_completo: extractedData.nombre_completo || "",
        correo: extractedData.correo || "",
        no_cvu: extractedData.no_cvu || "",
        telefono: extractedData.telefono || "",
        curp: extractedData.curp || "",
        rfc: extractedData.rfc || "",
        ultimo_grado_estudios: extractedData.ultimo_grado_estudios || "",
        empleo_actual: extractedData.empleo_actual || "",
        fecha_nacimiento: extractedData.fecha_nacimiento || "",
        linea_investigacion: "", // Siempre vacío para captura manual
        nacionalidad: extractedData.nacionalidad || "Mexicana",
        password: "", // Siempre vacío para captura manual
        confirm_password: "", // Siempre vacío para captura manual
      }))
      
      setOcrCompleted(true)
    } catch (error) {
      setError(`Error al procesar el PDF: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setIsProcessingPDF(false)
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
      { field: "fecha_nacimiento", label: "Fecha de Nacimiento" },
      { field: "no_cvu", label: "CVU/PU" },
      { field: "curp", label: "CURP" },
      { field: "rfc", label: "RFC" },
      { field: "password", label: "Contraseña" },
      { field: "confirm_password", label: "Confirmar Contraseña" },
    ]

    // Añadir validación condicional para nacionalidad
    if (formData.nacionalidad === "Otra" && !formData.otra_nacionalidad.trim()) {
      return [...requiredFields, { field: "otra_nacionalidad", label: "Especificar Nacionalidad" }]
    }

    const emptyFields = requiredFields.filter((field) => !formData[field.field as keyof typeof formData]?.trim())
    return emptyFields
  }

  // Update the handleSubmit function to work with mock data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!ocrCompleted) {
      setError("Debes procesar un Perfil Único antes de continuar con el registro")
      return
    }

    // Validate that all fields are complete
    const emptyFields = validateForm()
    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map((field) => field.label).join(", ")
      setError(`Los siguientes campos son obligatorios y no pueden estar vacíos: ${fieldNames}`)
      return
    }

    // Validate password strength
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      setError("La contraseña no cumple con los requisitos de seguridad mínimos")
      return
    }

    // Validate that passwords match
    if (formData.password !== formData.confirm_password) {
      setError("Las contraseñas no coinciden")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Additional validations
      if (!formData.correo.includes("@")) {
        throw new Error("El correo electrónico debe tener un formato válido")
      }

      // Preparar la nacionalidad final
      const nacionalidadFinal = formData.nacionalidad === "Otra" ? formData.otra_nacionalidad : formData.nacionalidad

      // Add registration date
      const dataToSend = {
        ...formData,
        nacionalidad: nacionalidadFinal,
        fecha_registro: new Date().toISOString(),
        origen: "ocr",
        archivo_procesado: selectedFile?.name || "",
      }

      // Don't send password confirmation and otra_nacionalidad
      const { confirm_password, otra_nacionalidad, ...dataToSendWithoutConfirm } = dataToSend

      console.log("Enviando datos:", dataToSendWithoutConfirm)

      const response = await fetch("/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSendWithoutConfirm),
      })

      const responseData = await response.json()
      console.log("Respuesta del servidor:", responseData)

      if (!response.ok) {
        // Handle duplicate case (code 409)
        if (response.status === 409 && responseData.duplicado) {
          setError(`${responseData.message} ID: ${responseData.id}`)
          return
        }

        throw new Error(responseData.error || "Error al guardar los datos")
      }

      // Redirect to success page
      const tipo = responseData.message && responseData.message.includes("⚠️") ? "warning" : "success"
      const urlParams = new URLSearchParams({
        mensaje: responseData.message || "Registro completado exitosamente",
        tipo: tipo,
      })

      router.push(`/registro/exito?${urlParams.toString()}`)
    } catch (error) {
      console.error("Error al registrar:", error)
      setError(`Error al registrar: ${error instanceof Error ? error.message : "Error desconocido"}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Verificar si el formulario está completo
  const isFormComplete = validateForm().length === 0
  const passwordValidation = validatePassword(formData.password)
  const passwordsMatch = formData.password === formData.confirm_password

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNacionalidadChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      nacionalidad: value,
      // Limpiar el campo de otra nacionalidad si no se selecciona "Otra"
      otra_nacionalidad: value === "Otra" ? prev.otra_nacionalidad : "",
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container max-w-7xl mx-auto py-4 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8 lg:space-y-10">
          {/* Header */}
          <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-3 sm:mb-4 lg:mb-6 shadow-lg">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8 lg:h-10 lg:w-10 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-blue-900 tracking-tight">
              Regístrate en SECCTI
            </h1>
            <p className="text-sm sm:text-base lg:text-xl text-blue-600 max-w-3xl mx-auto px-2 leading-relaxed">
              Sube tu Perfil Único (PU) en PDF para crear tu cuenta de investigador de forma automática
            </p>
          </div>

          {/* Info Alert */}
          <div className="max-w-4xl mx-auto">
            <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg rounded-xl">
              <Info className="h-5 w-5 text-blue-600" />
              <AlertTitle className="text-blue-900 font-semibold text-base sm:text-lg">
                Registro automático con OCR
              </AlertTitle>
              <AlertDescription className="text-blue-700 text-sm sm:text-base leading-relaxed">
                Para garantizar la precisión de los datos, el registro se realiza únicamente mediante la carga de tu
                Perfil Único en formato PDF. Nuestro sistema extraerá automáticamente tu información académica.
              </AlertDescription>
            </Alert>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
            {/* Paso 1: Subir PDF */}
            <Card className="bg-white/90 backdrop-blur-sm border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl overflow-hidden">
              <CardHeader className="text-center pb-6 sm:pb-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full mb-3 sm:mb-4 shadow-md">
                  <span className="text-blue-600 font-bold text-lg sm:text-xl">1</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-blue-900 flex items-center justify-center gap-2 sm:gap-3 font-bold">
                  <Upload className="h-6 w-6 sm:h-7 sm:w-7" />
                  Subir Perfil Único
                </CardTitle>
                <CardDescription className="text-blue-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                  Selecciona tu Perfil Único (PU) en formato PDF para extraer automáticamente tu información académica
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 sm:space-y-8 p-6 sm:p-8">
                <div className="space-y-3 sm:space-y-4">
                  <Label htmlFor="pdf-upload" className="text-blue-900 font-semibold text-sm sm:text-base">
                    Archivo PDF del Perfil Único * (Máximo 2MB)
                  </Label>
                  <div className="relative">
                    <Input
                      id="pdf-upload"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="bg-white border-blue-200 text-blue-900 file:bg-gradient-to-r file:from-blue-50 file:to-blue-100 file:text-blue-700 file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 hover:file:from-blue-100 hover:file:to-blue-200 transition-all duration-300 rounded-xl h-12 sm:h-14"
                      required
                    />
                  </div>
                  {error && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700 rounded-xl">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="font-semibold">Error de archivo</AlertTitle>
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  )}
                  {selectedFile && (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <span className="text-sm sm:text-base text-green-700 font-medium block truncate">
                          {selectedFile.name}
                        </span>
                        <span className="text-xs sm:text-sm text-green-600">
                          Archivo válido - Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={handlePDFUpload}
                  disabled={!selectedFile || isProcessingPDF}
                  className="w-full bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 h-12 sm:h-14 text-sm sm:text-base font-semibold rounded-xl"
                >
                  {isProcessingPDF ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Procesando PDF con OCR...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Procesar Perfil Único
                    </>
                  )}
                </Button>

                {ocrCompleted && (
                  <div className="space-y-4 sm:space-y-6">
                    <Alert className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-lg rounded-xl">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <AlertTitle className="text-green-800 font-semibold text-base sm:text-lg">
                        ¡Datos extraídos exitosamente!
                      </AlertTitle>
                      <AlertDescription className="text-green-700 text-sm sm:text-base leading-relaxed">
                        Se han extraído los datos de tu Perfil Único. Revisa cuidadosamente la información en el
                        formulario antes de continuar.
                      </AlertDescription>
                    </Alert>

                    <Alert className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-lg rounded-xl">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <AlertTitle className="text-amber-800 font-semibold text-base sm:text-lg">
                        ⚠️ Importante: Verificación requerida
                      </AlertTitle>
                      <AlertDescription className="text-amber-700 text-sm sm:text-base">
                        <div className="space-y-3">
                          <p className="leading-relaxed">
                            El OCR puede contener errores de interpretación. Es <strong>fundamental</strong> que revises
                            y corrijas:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm sm:text-base pl-2">
                            <li>Nombres y apellidos completos</li>
                            <li>Números de identificación (CURP, RFC, CVU)</li>
                            <li>Correo electrónico y teléfono</li>
                            <li>Grados académicos e institución</li>
                            <li>Empleo actual</li>
                            <li>
                              <strong>Línea de investigación (captura manual requerida)</strong>
                            </li>
                            <li>
                              <strong>Contraseña segura (captura manual requerida)</strong>
                            </li>
                          </ul>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                {/* Benefits */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-100 shadow-sm">
                  <h3 className="font-semibold mb-3 sm:mb-4 text-blue-900 flex items-center gap-2 text-base sm:text-lg">
                    <Info className="h-4 w-4 sm:h-5 sm:w-5" />
                    Requisitos del archivo
                  </h3>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-blue-700">
                    <li className="flex items-center gap-2 sm:gap-3">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                      <span>
                        <strong>Formato:</strong> Solo archivos PDF
                      </span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                      <span>
                        <strong>Tamaño máximo:</strong> 2MB
                      </span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 flex-shrink-0" />
                      <span>
                        <strong>Contenido:</strong> Perfil Único (PU) actualizado
                      </span>
                    </li>
                    <li className="flex items-center gap-2 sm:gap-3">
                      <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-600 flex-shrink-0" />
                      <span>
                        <strong>Verificación necesaria:</strong> Siempre revisa los datos extraídos
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Paso 2: Revisar y completar datos */}
            <Card
              className={`bg-white/90 backdrop-blur-sm border-blue-100 shadow-xl transition-all duration-500 rounded-2xl overflow-hidden ${
                !ocrCompleted ? "opacity-50" : "hover:shadow-2xl"
              }`}
            >
              <CardHeader className="text-center pb-6 sm:pb-8 bg-gradient-to-r from-amber-50 to-orange-50">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full mb-3 sm:mb-4 shadow-md ${
                    ocrCompleted ? "bg-gradient-to-br from-amber-100 to-amber-200" : "bg-gray-100"
                  }`}
                >
                  <span className={`font-bold text-lg sm:text-xl ${ocrCompleted ? "text-amber-600" : "text-gray-400"}`}>
                    2
                  </span>
                </div>
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl text-blue-900 flex items-center justify-center gap-2 sm:gap-3 font-bold">
                  <Eye className={`h-6 w-6 sm:h-7 sm:w-7 ${ocrCompleted ? "text-amber-600" : "text-gray-400"}`} />
                  Revisar y Completar
                </CardTitle>
                <CardDescription className="text-blue-600 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                  {ocrCompleted
                    ? "⚠️ IMPORTANTE: Revisa todos los datos y completa la información faltante"
                    : "Primero debes procesar un Perfil Único para continuar"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                {ocrCompleted && (
                  <Alert className="mb-6 sm:mb-8 bg-gradient-to-r from-red-50 to-pink-50 border-red-200 shadow-lg rounded-xl">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <AlertTitle className="text-red-800 font-semibold text-base sm:text-lg">
                      🔍 Todos los campos son obligatorios
                    </AlertTitle>
                    <AlertDescription className="text-red-700 text-sm sm:text-base leading-relaxed">
                      <strong>No puedes completar el registro si algún campo está vacío.</strong> Revisa cada campo
                      cuidadosamente y asegúrate de que toda la información esté completa y correcta.
                    </AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                  {/* Información Personal */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 border-b-2 border-blue-100 pb-3 sm:pb-4 flex items-center gap-2 sm:gap-3">
                      <User className="h-5 w-5 sm:h-6 sm:w-6" />
                      Información Personal
                      {ocrCompleted && (
                        <span className="text-xs sm:text-sm text-amber-600 font-normal">(Verificar datos)</span>
                      )}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="nombre_completo"
                          className="text-blue-900 text-sm sm:text-base font-semibold flex items-center gap-2"
                        >
                          <User className="h-4 w-4" />
                          Nombre Completo *{ocrCompleted && <span className="text-xs text-amber-600">(Verificar)</span>}
                        </Label>
                        <Input
                          id="nombre_completo"
                          name="nombre_completo"
                          value={formData.nombre_completo}
                          onChange={handleChange}
                          placeholder="Ingresa tu nombre completo"
                          className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-xl h-11 sm:h-12 ${
                            !formData.nombre_completo.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                          }`}
                          required
                          disabled={!ocrCompleted}
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="correo"
                          className="text-blue-900 text-sm sm:text-base font-semibold flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          Correo Electrónico *
                          {ocrCompleted && <span className="text-xs text-amber-600">(Verificar)</span>}
                        </Label>
                        <Input
                          id="correo"
                          name="correo"
                          type="email"
                          value={formData.correo}
                          onChange={handleChange}
                          placeholder="tu.correo@ejemplo.com"
                          className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-xl h-11 sm:h-12 ${
                            !formData.correo.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                          }`}
                          required
                          disabled={!ocrCompleted}
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="telefono"
                          className="text-blue-900 text-sm sm:text-base font-semibold flex items-center gap-2"
                        >
                          <Phone className="h-4 w-4" />
                          Teléfono *{ocrCompleted && <span className="text-xs text-amber-600">(Verificar)</span>}
                        </Label>
                        <Input
                          id="telefono"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder="Ej: 614-123-4567"
                          className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-xl h-11 sm:h-12 ${
                            !formData.telefono.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                          }`}
                          required
                          disabled={!ocrCompleted}
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="fecha_nacimiento"
                          className="text-blue-900 text-sm sm:text-base font-semibold flex items-center gap-2"
                        >
                          <Calendar className="h-4 w-4" />
                          Fecha de Nacimiento *
                          {ocrCompleted && <span className="text-xs text-amber-600">(Verificar)</span>}
                        </Label>
                        <Input
                          id="fecha_nacimiento"
                          name="fecha_nacimiento"
                          type="date"
                          value={formData.fecha_nacimiento}
                          onChange={handleChange}
                          className={`bg-white border-blue-200 text-blue-900 rounded-xl h-11 sm:h-12 ${
                            !formData.fecha_nacimiento.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                          }`}
                          required
                          disabled={!ocrCompleted}
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="nacionalidad"
                          className="text-blue-900 text-sm sm:text-base font-semibold flex items-center gap-2"
                        >
                          <Flag className="h-4 w-4" />
                          Nacionalidad *
                        </Label>
                        <Select
                          value={formData.nacionalidad}
                          onValueChange={handleNacionalidadChange}
                          disabled={!ocrCompleted}
                        >
                          <SelectTrigger
                            className={`bg-white border-blue-200 text-blue-900 rounded-xl h-11 sm:h-12 ${
                              !formData.nacionalidad && ocrCompleted ? "border-red-300 bg-red-50" : ""
                            }`}
                          >
                            <SelectValue placeholder="Selecciona tu nacionalidad" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mexicana">Mexicana</SelectItem>
                            <SelectItem value="Estadounidense">Estadounidense</SelectItem>
                            <SelectItem value="Otra">Otra</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Campo para especificar otra nacionalidad */}
                      {formData.nacionalidad === "Otra" && (
                        <div className="space-y-2 sm:space-y-3">
                          <Label
                            htmlFor="otra_nacionalidad"
                            className="text-blue-900 text-sm sm:text-base font-semibold flex items-center gap-2"
                          >
                            <Flag className="h-4 w-4" />
                            Especificar Nacionalidad *
                          </Label>
                          <Input
                            id="otra_nacionalidad"
                            name="otra_nacionalidad"
                            value={formData.otra_nacionalidad}
                            onChange={handleChange}
                            placeholder="Ingresa tu nacionalidad"
                            className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-xl h-11 sm:h-12 ${
                              formData.nacionalidad === "Otra" && !formData.otra_nacionalidad.trim() && ocrCompleted
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            required={formData.nacionalidad === "Otra"}
                            disabled={!ocrCompleted}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Información Académica y Profesional */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 border-b-2 border-blue-100 pb-3 sm:pb-4 flex items-center gap-2 sm:gap-3">
                      <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                      Información Académica y Profesional
                      {ocrCompleted && (
                        <span className="text-xs sm:text-sm text-amber-600 font-normal">(Verificar datos)</span>
                      )}
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="ultimo_grado_estudios"
                          className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                        >
                          <GraduationCap className="h-4 w-4" />
                          Último Grado de Estudios *
                          {ocrCompleted && <span className="text-xs text-amber-600">(Verificar)</span>}
                        </Label>
                        <Input
                          id="ultimo_grado_estudios"
                          name="ultimo_grado_estudios"
                          value={formData.ultimo_grado_estudios}
                          onChange={handleChange}
                          placeholder="Ej: Doctorado en [Área] - [Institución]"
                          className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-xl h-11 sm:h-12 ${
                            !formData.ultimo_grado_estudios.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                          }`}
                          required
                          disabled={!ocrCompleted}
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="empleo_actual"
                          className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                        >
                          <Briefcase className="h-4 w-4" />
                          Empleo Actual *{ocrCompleted && <span className="text-xs text-amber-600">(Verificar)</span>}
                        </Label>
                        <Input
                          id="empleo_actual"
                          name="empleo_actual"
                          value={formData.empleo_actual}
                          onChange={handleChange}
                          placeholder="Ej: Cargo - Institución donde laboras"
                          className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-xl h-11 sm:h-12 ${
                            !formData.empleo_actual.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                          }`}
                          required
                          disabled={!ocrCompleted}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Información Fiscal */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 border-b-2 border-blue-100 pb-3 sm:pb-4 flex items-center gap-2 sm:gap-3">
                      <CreditCard className="h-5 w-5 sm:h-6 sm:w-6" />
                      Información Fiscal y de Registro
                      {ocrCompleted && (
                        <span className="text-xs sm:text-sm text-amber-600 font-normal">(Verificar números)</span>
                      )}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="no_cvu"
                          className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                        >
                          <Hash className="h-4 w-4" />
                          CVU/PU *{ocrCompleted && <span className="text-xs text-amber-600">(Verificar)</span>}
                        </Label>
                        <Input
                          id="no_cvu"
                          name="no_cvu"
                          value={formData.no_cvu}
                          onChange={handleChange}
                          placeholder="Ej: 123456"
                          className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-xl h-11 sm:h-12 ${
                            !formData.no_cvu.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                          }`}
                          required
                          disabled={!ocrCompleted}
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="curp"
                          className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                        >
                          <CreditCard className="h-4 w-4" />
                          CURP *{ocrCompleted && <span className="text-xs text-amber-600">(Verificar)</span>}
                        </Label>
                        <Input
                          id="curp"
                          name="curp"
                          value={formData.curp}
                          onChange={handleChange}
                          placeholder="Ej: ABCD123456HEFGHI01"
                          className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-xl h-11 sm:h-12 ${
                            !formData.curp.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                          }`}
                          required
                          disabled={!ocrCompleted}
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="rfc"
                          className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                        >
                          <CreditCard className="h-4 w-4" />
                          RFC *{ocrCompleted && <span className="text-xs text-amber-600">(Verificar)</span>}
                        </Label>
                        <Input
                          id="rfc"
                          name="rfc"
                          value={formData.rfc}
                          onChange={handleChange}
                          placeholder="Ej: ABCD123456ABC"
                          className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 rounded-xl h-11 sm:h-12 ${
                            !formData.rfc.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                          }`}
                          required
                          disabled={!ocrCompleted}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Seguridad de la Cuenta */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 border-b-2 border-blue-100 pb-3 sm:pb-4 flex items-center gap-2 sm:gap-3">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6" />
                      Seguridad de la Cuenta
                      <span className="text-xs sm:text-sm text-blue-600 font-normal">(Captura manual requerida)</span>
                    </h3>
                    <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg rounded-xl">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800 font-semibold text-base sm:text-lg">
                        Contraseña segura requerida
                      </AlertTitle>
                      <AlertDescription className="text-blue-700 text-sm sm:text-base leading-relaxed">
                        Crea una contraseña segura para proteger tu cuenta. Debe cumplir con los requisitos de seguridad
                        establecidos.
                      </AlertDescription>
                    </Alert>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="password"
                          className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                        >
                          <Lock className="h-4 w-4" />
                          Contraseña *
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Mínimo 8 caracteres"
                            className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 pr-12 rounded-xl h-11 sm:h-12 ${
                              !formData.password.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                            }`}
                            required
                            disabled={!ocrCompleted}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={!ocrCompleted}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label
                          htmlFor="confirm_password"
                          className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                        >
                          <Lock className="h-4 w-4" />
                          Confirmar Contraseña *
                        </Label>
                        <div className="relative">
                          <Input
                            id="confirm_password"
                            name="confirm_password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirm_password}
                            onChange={handleChange}
                            placeholder="Repite la contraseña"
                            className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 pr-12 rounded-xl h-11 sm:h-12 ${
                              !formData.confirm_password.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                            } ${
                              formData.confirm_password &&
                              formData.password &&
                              formData.password !== formData.confirm_password
                                ? "border-red-300 bg-red-50"
                                : ""
                            }`}
                            required
                            disabled={!ocrCompleted}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            disabled={!ocrCompleted}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-500" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-500" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Indicador de fortaleza de contraseña */}
                    {formData.password && ocrCompleted && (
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                          <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3 sm:mb-4">
                            Requisitos de contraseña:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 text-xs sm:text-sm">
                            <div
                              className={`flex items-center gap-2 ${
                                passwordValidation.requirements.length ? "text-green-600" : "text-gray-500"
                              }`}
                            >
                              {passwordValidation.requirements.length ? (
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              ) : (
                                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              )}
                              Mínimo 8 caracteres
                            </div>
                            <div
                              className={`flex items-center gap-2 ${
                                passwordValidation.requirements.uppercase ? "text-green-600" : "text-gray-500"
                              }`}
                            >
                              {passwordValidation.requirements.uppercase ? (
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              ) : (
                                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              )}
                              Una mayúscula (A-Z)
                            </div>
                            <div
                              className={`flex items-center gap-2 ${
                                passwordValidation.requirements.lowercase ? "text-green-600" : "text-gray-500"
                              }`}
                            >
                              {passwordValidation.requirements.lowercase ? (
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              ) : (
                                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              )}
                              Una minúscula (a-z)
                            </div>
                            <div
                              className={`flex items-center gap-2 ${
                                passwordValidation.requirements.number ? "text-green-600" : "text-gray-500"
                              }`}
                            >
                              {passwordValidation.requirements.number ? (
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              ) : (
                                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              )}
                              Un número (0-9)
                            </div>
                            <div
                              className={`flex items-center gap-2 ${
                                passwordValidation.requirements.special ? "text-green-600" : "text-gray-500"
                              }`}
                            >
                              {passwordValidation.requirements.special ? (
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              ) : (
                                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                              )}
                              Un carácter especial
                            </div>
                          </div>
                          <div className="mt-4 sm:mt-6">
                            <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
                              <span className="text-gray-600 font-medium">Fortaleza:</span>
                              <span
                                className={`font-semibold ${
                                  passwordValidation.score >= 4
                                    ? "text-green-600"
                                    : passwordValidation.score >= 3
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                }`}
                              >
                                {passwordValidation.score >= 4
                                  ? "Fuerte"
                                  : passwordValidation.score >= 3
                                    ? "Media"
                                    : "Débil"}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                              <div
                                className={`h-2 sm:h-3 rounded-full transition-all duration-500 ${
                                  passwordValidation.score >= 4
                                    ? "bg-green-500"
                                    : passwordValidation.score >= 3
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${(passwordValidation.score / 5) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>

                        {/* Verificación de coincidencia de contraseñas */}
                        {formData.confirm_password && (
                          <div
                            className={`flex items-center gap-2 sm:gap-3 text-sm sm:text-base font-medium ${
                              passwordsMatch ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {passwordsMatch ? (
                              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                            ) : (
                              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                            )}
                            {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Línea de Investigación */}
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 border-b-2 border-blue-100 pb-3 sm:pb-4 flex items-center gap-2 sm:gap-3">
                      <Edit className="h-5 w-5 sm:h-6 sm:w-6" />
                      Línea de Investigación
                      <span className="text-xs sm:text-sm text-blue-600 font-normal">(Captura manual requerida)</span>
                    </h3>
                    <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg rounded-xl">
                      <Edit className="h-4 w-4 text-blue-600" />
                      <AlertTitle className="text-blue-800 font-semibold text-base sm:text-lg">
                        Captura manual requerida
                      </AlertTitle>
                      <AlertDescription className="text-blue-700 text-sm sm:text-base leading-relaxed">
                        Este campo requiere que describas manualmente tu línea de investigación principal. El OCR no
                        extrae esta información para garantizar precisión y personalización.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-2 sm:space-y-3">
                      <Label
                        htmlFor="linea_investigacion"
                        className="text-blue-900 font-semibold flex items-center gap-2 text-sm sm:text-base"
                      >
                        <Edit className="h-4 w-4" />
                        Área de Investigación Principal *
                        <span className="text-xs text-blue-600">(Escribir manualmente)</span>
                      </Label>
                      <Textarea
                        id="linea_investigacion"
                        name="linea_investigacion"
                        value={formData.linea_investigacion}
                        onChange={handleChange}
                        placeholder="Describe detalladamente tu área de investigación principal, metodologías utilizadas, y objetivos de tu trabajo académico..."
                        className={`bg-white border-blue-200 text-blue-900 placeholder:text-blue-400 min-h-[120px] sm:min-h-[140px] rounded-xl resize-none ${
                          !formData.linea_investigacion.trim() && ocrCompleted ? "border-red-300 bg-red-50" : ""
                        }`}
                        required
                        disabled={!ocrCompleted}
                      />
                      {!formData.linea_investigacion.trim() && ocrCompleted && (
                        <p className="text-sm text-red-600 font-medium">
                          Este campo es obligatorio y debe ser completado manualmente
                        </p>
                      )}
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-700 rounded-xl shadow-lg">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle className="font-semibold">Error</AlertTitle>
                      <AlertDescription className="text-sm">{error}</AlertDescription>
                    </Alert>
                  )}

                  {/* Indicador de completitud del formulario */}
                  {ocrCompleted && (
                    <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                        <span className="text-sm sm:text-base font-semibold text-gray-700">
                          Progreso del formulario: {13 - validateForm().length}/13 campos completos
                        </span>
                        <div className="flex items-center gap-2 sm:gap-3">
                          {isFormComplete && passwordValidation.isValid && passwordsMatch ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-amber-600" />
                          )}
                          <span
                            className={`text-sm sm:text-base font-semibold ${
                              isFormComplete && passwordValidation.isValid && passwordsMatch
                                ? "text-green-600"
                                : "text-amber-600"
                            }`}
                          >
                            {isFormComplete && passwordValidation.isValid && passwordsMatch
                              ? "Formulario completo"
                              : "Campos faltantes o contraseña insegura"}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={
                      isLoading || !ocrCompleted || !isFormComplete || !passwordValidation.isValid || !passwordsMatch
                    }
                    className={`w-full shadow-lg hover:shadow-xl transition-all duration-300 h-12 sm:h-14 text-sm sm:text-base lg:text-lg font-semibold rounded-xl ${
                      isFormComplete && passwordValidation.isValid && passwordsMatch
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-400 text-gray-200 cursor-not-allowed"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Registrando...
                      </>
                    ) : !isFormComplete || !passwordValidation.isValid || !passwordsMatch ? (
                      <>
                        <AlertCircle className="mr-2 h-5 w-5" />
                        Completa todos los campos y crea una contraseña segura
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Completar Registro
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="text-center text-sm sm:text-base text-blue-600 max-w-md mx-auto">
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link
                href="/iniciar-sesion"
                className="text-blue-700 underline underline-offset-4 hover:text-blue-900 font-semibold transition-colors duration-300"
              >
                Iniciar sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
