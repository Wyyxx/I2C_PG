"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, User, BookOpen, Building, X, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Datos de ejemplo para investigadores
const investigadores = [
  {
    id: 1,
    nombre: "Dra. Ana Martínez",
    avatar: "/placeholder.svg?height=100&width=100",
    institucion: "Centro de Investigación en Materiales Avanzados",
    area: "Ciencias Ambientales",
    keywords: ["Cambio Climático", "Ecosistemas Áridos", "Biodiversidad"],
    slug: "ana-martinez",
  },
  {
    id: 2,
    nombre: "Dr. Carlos Méndez",
    avatar: "/placeholder.svg?height=100&width=100",
    institucion: "Instituto Tecnológico de Chihuahua",
    area: "Inteligencia Artificial",
    keywords: ["Machine Learning", "Deep Learning", "Industria 4.0"],
    slug: "carlos-mendez",
  },
  {
    id: 3,
    nombre: "Dr. Javier López",
    avatar: "/placeholder.svg?height=100&width=100",
    institucion: "Universidad Tecnológica de Ciudad Juárez",
    area: "Agricultura",
    keywords: ["Agricultura", "IoT", "Riego Inteligente"],
    slug: "javier-lopez",
  },
  {
    id: 4,
    nombre: "Dra. María Rodríguez",
    avatar: "/placeholder.svg?height=100&width=100",
    institucion: "Universidad Autónoma de Chihuahua",
    area: "Neurociencia",
    keywords: ["Neurociencia", "Sueño", "Neuroimagen"],
    slug: "maria-rodriguez",
  },
  {
    id: 5,
    nombre: "Dr. Miguel Torres",
    avatar: "/placeholder.svg?height=100&width=100",
    institucion: "Centro de Investigación en Materiales Avanzados",
    area: "Nanotecnología",
    keywords: ["Nanotecnología", "Energía Solar", "Materiales"],
    slug: "miguel-torres",
  },
]

// Datos de ejemplo para proyectos
const proyectos = [
  {
    id: 1,
    titulo: "Impacto del cambio climático en ecosistemas del desierto de Chihuahua",
    investigador: "Dra. Ana Martínez",
    institucion: "Centro de Investigación en Materiales Avanzados",
    area: "Ciencias Ambientales",
    keywords: ["Cambio Climático", "Ecosistemas Áridos", "Biodiversidad"],
    slug: "impacto-cambio-climatico-ecosistemas-desierto-chihuahua",
  },
  {
    id: 2,
    titulo: "Desarrollo de algoritmos de aprendizaje profundo para la industria manufacturera local",
    investigador: "Dr. Carlos Méndez",
    institucion: "Instituto Tecnológico de Chihuahua",
    area: "Inteligencia Artificial",
    keywords: ["Machine Learning", "Deep Learning", "Industria 4.0"],
    slug: "algoritmos-aprendizaje-profundo-industria-manufacturera",
  },
  {
    id: 3,
    titulo: "Innovación en sistemas de riego para agricultura en zonas áridas",
    investigador: "Dr. Javier López",
    institucion: "Universidad Tecnológica de Ciudad Juárez",
    area: "Agricultura",
    keywords: ["Agricultura", "IoT", "Riego Inteligente"],
    slug: "innovacion-sistemas-riego-agricultura-zonas-aridas",
  },
  {
    id: 4,
    titulo: "Análisis de patrones neuronales en trastornos del sueño",
    investigador: "Dra. María Rodríguez",
    institucion: "Universidad Autónoma de Chihuahua",
    area: "Neurociencia",
    keywords: ["Neurociencia", "Sueño", "Neuroimagen"],
    slug: "analisis-patrones-neuronales-trastornos-sueno",
  },
  {
    id: 5,
    titulo: "Desarrollo de materiales nanoestructurados para aplicaciones energéticas",
    investigador: "Dr. Miguel Torres",
    institucion: "Centro de Investigación en Materiales Avanzados",
    area: "Nanotecnología",
    keywords: ["Nanotecnología", "Energía Solar", "Materiales"],
    slug: "desarrollo-materiales-nanoestructurados-aplicaciones-energeticas",
  },
]

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("all")
  const [showResults, setShowResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [results, setResults] = useState<{
    investigadores: typeof investigadores
    proyectos: typeof proyectos
  }>({
    investigadores: [],
    proyectos: [],
  })
  const router = useRouter()

  // Efecto para cerrar resultados al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const searchContainer = document.getElementById("search-container")
      if (searchContainer && !searchContainer.contains(event.target as Node)) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Función para realizar la búsqueda
  const performSearch = (query: string, type: string) => {
    if (!query.trim()) {
      setResults({ investigadores: [], proyectos: [] })
      setShowResults(false)
      return
    }

    setIsSearching(true)
    setShowResults(true)

    // Simulamos un pequeño retraso para dar sensación de búsqueda real
    setTimeout(() => {
      const searchQuery = query.toLowerCase()

      // Filtrar investigadores
      const filteredInvestigadores =
        type === "projects"
          ? []
          : investigadores.filter(
              (inv) =>
                inv.nombre.toLowerCase().includes(searchQuery) ||
                inv.institucion.toLowerCase().includes(searchQuery) ||
                inv.area.toLowerCase().includes(searchQuery) ||
                inv.keywords.some((k) => k.toLowerCase().includes(searchQuery)),
            )

      // Filtrar proyectos
      const filteredProyectos =
        type === "researchers"
          ? []
          : proyectos.filter(
              (proj) =>
                proj.titulo.toLowerCase().includes(searchQuery) ||
                proj.investigador.toLowerCase().includes(searchQuery) ||
                proj.institucion.toLowerCase().includes(searchQuery) ||
                proj.area.toLowerCase().includes(searchQuery) ||
                proj.keywords.some((k) => k.toLowerCase().includes(searchQuery)),
            )

      setResults({
        investigadores: filteredInvestigadores,
        proyectos: filteredProyectos,
      })

      setIsSearching(false)
    }, 300)
  }

  // Función para manejar el submit del formulario
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(searchTerm, searchType)

    // Navegar a la página de explorar con los parámetros de búsqueda
    if (searchTerm.trim()) {
      router.push(`/explorar?q=${encodeURIComponent(searchTerm)}&type=${encodeURIComponent(searchType)}`)
    }
  }

  // Efecto para buscar cuando se escribe (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        performSearch(searchTerm, searchType)
      } else {
        setResults({ investigadores: [], proyectos: [] })
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm, searchType])

  // Función para limpiar la búsqueda
  const clearSearch = () => {
    setSearchTerm("")
    setResults({ investigadores: [], proyectos: [] })
    setShowResults(false)
  }

  return (
    <div id="search-container" className="max-w-3xl mx-auto relative">
      <form onSubmit={handleSearch} className="relative z-10">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Busca por nombre, institución, campo de investigación o palabras clave"
              className="pl-10 bg-white border-blue-200 text-blue-900 placeholder:text-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => {
                if (searchTerm.trim() && (results.investigadores.length > 0 || results.proyectos.length > 0)) {
                  setShowResults(true)
                }
              }}
            />
            {searchTerm && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-600"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Select value={searchType} onValueChange={setSearchType}>
            <SelectTrigger className="w-full md:w-[180px] bg-white border-blue-200 text-blue-900">
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent className="bg-white border-blue-100 text-blue-900">
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="researchers">Investigadores</SelectItem>
              <SelectItem value="projects">Proyectos</SelectItem>
              <SelectItem value="publications">Publicaciones</SelectItem>
              <SelectItem value="institutions">Instituciones</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit" className="bg-blue-700 text-white hover:bg-blue-800" disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Buscando...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Buscar
              </>
            )}
          </Button>
        </div>
      </form>

      {/* Resultados de búsqueda */}
      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-1 bg-white border-blue-100 shadow-lg z-20 max-h-[70vh] overflow-y-auto">
          <CardContent className="p-4">
            {isSearching ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
                <span className="ml-3 text-blue-900">Buscando resultados...</span>
              </div>
            ) : (
              <>
                {results.investigadores.length === 0 && results.proyectos.length === 0 ? (
                  <div className="text-center py-8">
                    <Search className="h-12 w-12 mx-auto text-blue-300 mb-4" />
                    <h3 className="text-lg font-semibold mb-2 text-blue-900">No se encontraron resultados</h3>
                    <p className="text-sm text-blue-600">
                      Intenta con otros términos como nombres de investigadores, instituciones o campos de investigación
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Resultados de investigadores */}
                    {results.investigadores.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-blue-900 flex items-center">
                          <User className="mr-2 h-5 w-5" />
                          Investigadores ({results.investigadores.length})
                        </h3>
                        <div className="space-y-2">
                          {results.investigadores.map((inv) => (
                            <Link
                              href={`/investigadores/${inv.slug}`}
                              key={inv.id}
                              className="flex items-center p-3 hover:bg-blue-50 rounded-md transition-colors border border-blue-100"
                              onClick={() => setShowResults(false)}
                            >
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={inv.avatar || "/placeholder.svg"} alt={inv.nombre} />
                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                  {inv.nombre
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-grow">
                                <h4 className="font-medium text-blue-900">{inv.nombre}</h4>
                                <div className="flex items-center text-sm text-blue-600">
                                  <Building className="h-3 w-3 mr-1" />
                                  {inv.institucion}
                                </div>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {inv.keywords.slice(0, 3).map((keyword, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{inv.area}</Badge>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Resultados de proyectos */}
                    {results.proyectos.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold mb-3 text-blue-900 flex items-center">
                          <BookOpen className="mr-2 h-5 w-5" />
                          Proyectos ({results.proyectos.length})
                        </h3>
                        <div className="space-y-2">
                          {results.proyectos.map((proj) => (
                            <Link
                              href={`/proyectos/${proj.slug}`}
                              key={proj.id}
                              className="flex items-start p-3 hover:bg-blue-50 rounded-md transition-colors border border-blue-100"
                              onClick={() => setShowResults(false)}
                            >
                              <div className="flex-grow">
                                <h4 className="font-medium text-blue-900 mb-1">{proj.titulo}</h4>
                                <div className="flex items-center text-sm text-blue-600 mb-1">
                                  <User className="h-3 w-3 mr-1" />
                                  {proj.investigador}
                                </div>
                                <div className="flex items-center text-sm text-blue-600 mb-2">
                                  <Building className="h-3 w-3 mr-1" />
                                  {proj.institucion}
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {proj.keywords.slice(0, 3).map((keyword, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                                      {keyword}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 ml-2">{proj.area}</Badge>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="text-center pt-2 border-t border-blue-100">
                      <Button
                        variant="link"
                        className="text-blue-700 hover:text-blue-900"
                        onClick={() => setShowResults(false)}
                      >
                        Cerrar resultados
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
