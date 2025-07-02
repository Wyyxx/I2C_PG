"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, ExternalLink, CalendarDays, Users, Building, Eye } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para proyectos
const proyectos = [
  {
    id: 1,
    titulo: "Impacto del cambio climático en ecosistemas del desierto de Chihuahua",
    descripcion:
      "Estudio sobre los efectos del cambio climático en la biodiversidad del desierto chihuahuense y estrategias de adaptación para la conservación de especies endémicas.",
    investigadorPrincipal: {
      nombre: "Dra. Ana Martínez",
      avatar: "/placeholder.svg?height=100&width=100",
      slug: "ana-martinez",
    },
    colaboradores: [
      { nombre: "Dr. Javier López", avatar: "/placeholder.svg" },
      { nombre: "M.C. Elena García", avatar: "/placeholder.svg" },
      { nombre: "Dr. Roberto Silva", avatar: "/placeholder.svg" },
    ],
    institucion: "Centro de Investigación en Materiales Avanzados",
    fechaInicio: "2020-01-15",
    fechaFin: "2023-12-31",
    estado: "En curso",
    categoria: "Ciencias Ambientales",
    financiamiento: "CONACYT",
    presupuesto: "$450,000 MXN",
    palabrasClave: ["Cambio Climático", "Ecosistemas Áridos", "Biodiversidad", "Conservación"],
    slug: "prb1",
  }
]

export default function ProyectosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedInstitution, setSelectedInstitution] = useState("all")

  // Filtrar proyectos
  const filteredProyectos = proyectos.filter((proyecto) => {
    const matchesSearch =
      proyecto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.investigadorPrincipal.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.palabrasClave.some((palabra) => palabra.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || proyecto.categoria === selectedCategory
    const matchesStatus = selectedStatus === "all" || proyecto.estado === selectedStatus
    const matchesInstitution = selectedInstitution === "all" || proyecto.institucion === selectedInstitution

    return matchesSearch && matchesCategory && matchesStatus && matchesInstitution
  })

  // Obtener opciones únicas para filtros
  const categorias = [...new Set(proyectos.map((proyecto) => proyecto.categoria))]
  const estados = [...new Set(proyectos.map((proyecto) => proyecto.estado))]
  const instituciones = [...new Set(proyectos.map((proyecto) => proyecto.institucion))]

  // Función para formatear fechas
  const formatearFecha = (fechaStr: string) => {
    const fecha = new Date(fechaStr)
    return fecha.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Función para determinar el color del estado
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "En curso":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "Finalizado":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "Pausado":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-blue-900">Proyectos de Investigación</h1>
          <p className="text-blue-600">
            Explora los proyectos de investigación activos y finalizados de investigadores en Chihuahua
          </p>
        </div>

        {/* Filtros y búsqueda */}
        <Card className="bg-white border-blue-100">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar por título, investigador o palabras clave..."
                    className="pl-10 bg-white border-blue-200 text-blue-900 placeholder:text-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white border-blue-200 text-blue-900">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-100">
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categorias.map((categoria) => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="bg-white border-blue-200 text-blue-900">
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-100">
                  <SelectItem value="all">Todos los estados</SelectItem>
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedInstitution} onValueChange={setSelectedInstitution}>
                <SelectTrigger className="bg-white border-blue-200 text-blue-900">
                  <SelectValue placeholder="Institución" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-100">
                  <SelectItem value="all">Todas las instituciones</SelectItem>
                  {instituciones.map((institucion) => (
                    <SelectItem key={institucion} value={institucion}>
                      {institucion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-blue-600">
              {filteredProyectos.length} proyecto{filteredProyectos.length !== 1 ? "s" : ""} encontrado
              {filteredProyectos.length !== 1 ? "s" : ""}
            </p>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Filter className="mr-2 h-4 w-4" />
              Filtros avanzados
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProyectos.map((proyecto) => (
              <Card key={proyecto.id} className="bg-white border-blue-100">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-700 text-white">{proyecto.categoria}</Badge>
                        <Badge className={getEstadoColor(proyecto.estado)}>{proyecto.estado}</Badge>
                      </div>
                      <CardTitle className="text-xl text-blue-900 mb-2">{proyecto.titulo}</CardTitle>
                      <CardDescription className="text-blue-600">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4" />
                            <span>{proyecto.institucion}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarDays className="h-4 w-4" />
                            <span>
                              {formatearFecha(proyecto.fechaInicio)} - {formatearFecha(proyecto.fechaFin)}
                            </span>
                          </div>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-600 mb-4 line-clamp-3">{proyecto.descripcion}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Investigador Principal:</h4>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={proyecto.investigadorPrincipal.avatar || "/placeholder.svg"}
                            alt={proyecto.investigadorPrincipal.nombre}
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-700">
                            {proyecto.investigadorPrincipal.nombre
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <Link
                          href={`/investigadores/${proyecto.investigadorPrincipal.slug}`}
                          className="text-blue-700 hover:underline font-medium"
                        >
                          {proyecto.investigadorPrincipal.nombre}
                        </Link>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-blue-900 mb-2">Colaboradores:</h4>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-sm text-blue-600">{proyecto.colaboradores.length} colaboradores</span>
                        <div className="flex -space-x-1 ml-2">
                          {proyecto.colaboradores.slice(0, 3).map((colaborador, index) => (
                            <Avatar key={index} className="h-6 w-6 border-2 border-white">
                              <AvatarImage src={colaborador.avatar || "/placeholder.svg"} alt={colaborador.nombre} />
                              <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                                {colaborador.nombre
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {proyecto.colaboradores.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center">
                              <span className="text-xs text-blue-700">+{proyecto.colaboradores.length - 3}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {proyecto.palabrasClave.slice(0, 4).map((palabra, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                          {palabra}
                        </Badge>
                      ))}
                      {proyecto.palabrasClave.length > 4 && (
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                          +{proyecto.palabrasClave.length - 4} más
                        </Badge>
                      )}
                    </div>

                    <div className="text-sm text-blue-600">
                      <div className="flex justify-between">
                        <span>
                          <strong>Financiamiento:</strong> {proyecto.financiamiento}
                        </span>
                        <span>
                          <strong>Presupuesto:</strong> {proyecto.presupuesto}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t border-blue-100 flex justify-between">
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50" asChild>
                    <Link href={`/proyectos/${proyecto.slug}`}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver detalles
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Contactar equipo
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredProyectos.length === 0 && (
            <Card className="bg-white border-blue-100">
              <CardContent className="pt-6 text-center py-12">
                <Search className="h-12 w-12 mx-auto text-blue-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-blue-900">No se encontraron proyectos</h3>
                <p className="text-sm text-blue-600 mb-6">
                  Intenta ajustar los filtros de búsqueda para encontrar más resultados.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSelectedStatus("all")
                    setSelectedInstitution("all")
                  }}
                  className="bg-blue-700 text-white hover:bg-blue-800"
                >
                  Limpiar filtros
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
