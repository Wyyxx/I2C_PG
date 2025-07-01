"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, ExternalLink, FileText, Calendar, User, Building } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para publicaciones
const publicaciones = [
  {
    id: 1,
    titulo: "Alteraciones en la arquitectura del sueño en pacientes con trastornos neurodegenerativos",
    autores: ["Dra. María Rodríguez", "Dr. Carlos Méndez", "Dra. Ana Martínez"],
    revista: "Revista de Neurociencia Clínica",
    año: 2023,
    volumen: "45",
    numero: "3",
    paginas: "123-145",
    doi: "10.1234/rnc.2023.001",
    resumen:
      "Este estudio examina las alteraciones específicas en los patrones de sueño de pacientes con enfermedades neurodegenerativas, proporcionando nuevos insights sobre la relación entre el sueño y la progresión de estas condiciones.",
    palabrasClave: ["Neurociencia", "Sueño", "Neurodegeneración", "EEG"],
    categoria: "Neurociencia",
    institucion: "Universidad Autónoma de Chihuahua",
    tipo: "Artículo de investigación",
    acceso: "Abierto",
  }
]

export default function PublicacionesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedAccess, setSelectedAccess] = useState("all")

  // Filtrar publicaciones
  const filteredPublicaciones = publicaciones.filter((pub) => {
    const matchesSearch =
      pub.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.autores.some((autor) => autor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.revista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.palabrasClave.some((palabra) => palabra.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "all" || pub.categoria === selectedCategory
    const matchesYear = selectedYear === "all" || pub.año.toString() === selectedYear
    const matchesAccess = selectedAccess === "all" || pub.acceso === selectedAccess

    return matchesSearch && matchesCategory && matchesYear && matchesAccess
  })

  // Obtener categorías únicas
  const categorias = [...new Set(publicaciones.map((pub) => pub.categoria))]
  const años = [...new Set(publicaciones.map((pub) => pub.año))].sort((a, b) => b - a)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-blue-900">Publicaciones Científicas</h1>
          <p className="text-blue-600">
            Explora las publicaciones científicas de investigadores de Chihuahua en revistas nacionales e
            internacionales
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
                    placeholder="Buscar por título, autor, revista o palabras clave..."
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
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="bg-white border-blue-200 text-blue-900">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-100">
                  <SelectItem value="all">Todos los años</SelectItem>
                  {años.map((año) => (
                    <SelectItem key={año} value={año.toString()}>
                      {año}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedAccess} onValueChange={setSelectedAccess}>
                <SelectTrigger className="bg-white border-blue-200 text-blue-900">
                  <SelectValue placeholder="Acceso" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-100">
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="Abierto">Acceso abierto</SelectItem>
                  <SelectItem value="Restringido">Acceso restringido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Resultados */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-blue-600">
              {filteredPublicaciones.length} publicación{filteredPublicaciones.length !== 1 ? "es" : ""} encontrada
              {filteredPublicaciones.length !== 1 ? "s" : ""}
            </p>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Filter className="mr-2 h-4 w-4" />
              Filtros avanzados
            </Button>
          </div>

          {filteredPublicaciones.map((publicacion) => (
            <Card key={publicacion.id} className="bg-white border-blue-100">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-700 text-white">{publicacion.categoria}</Badge>
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        {publicacion.tipo}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`${
                          publicacion.acceso === "Abierto"
                            ? "border-green-200 text-green-700 bg-green-50"
                            : "border-amber-200 text-amber-700 bg-amber-50"
                        }`}
                      >
                        {publicacion.acceso === "Abierto" ? "Acceso abierto" : "Acceso restringido"}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-blue-900 mb-2">{publicacion.titulo}</CardTitle>
                    <CardDescription className="text-blue-600">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{publicacion.autores.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          <span>{publicacion.revista}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {publicacion.año}, Vol. {publicacion.volumen}({publicacion.numero}), pp.{" "}
                            {publicacion.paginas}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          <span>{publicacion.institucion}</span>
                        </div>
                      </div>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-600 mb-4">{publicacion.resumen}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {publicacion.palabrasClave.map((palabra, index) => (
                    <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                      {palabra}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-blue-600">
                  <strong>DOI:</strong> {publicacion.doi}
                </div>
              </CardContent>
              <CardFooter className="border-t border-blue-100 flex justify-between">
                <div className="flex gap-2">
                  {publicacion.autores.slice(0, 3).map((autor, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src="/placeholder.svg" alt={autor} />
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          {autor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Link
                        href={`/investigadores/${autor.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                        className="text-sm text-blue-700 hover:underline"
                      >
                        {autor}
                      </Link>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={() => window.open(`https://doi.org/${publicacion.doi}`, "_blank")}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Ver publicación
                  </Button>
                  <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                    Citar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}

          {filteredPublicaciones.length === 0 && (
            <Card className="bg-white border-blue-100">
              <CardContent className="pt-6 text-center py-12">
                <FileText className="h-12 w-12 mx-auto text-blue-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-blue-900">No se encontraron publicaciones</h3>
                <p className="text-sm text-blue-600 mb-6">
                  Intenta ajustar los filtros de búsqueda para encontrar más resultados.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSelectedYear("all")
                    setSelectedAccess("all")
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
