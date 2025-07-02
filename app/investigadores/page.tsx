"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MapPin, Building, FileText, Award } from "lucide-react"
import Link from "next/link"

// Datos de ejemplo para investigadores
const investigadores = [
  {
    id: 1,
    name: "Dra. María Rodríguez",
    avatar: "/placeholder.svg?height=100&width=100",
    title: "Investigadora Principal en Neurociencia",
    institution: "Universidad Autónoma de Chihuahua",
    location: "Chihuahua, México",
    field: "Neurociencia",
    projects: 12,
    publications: 45,
    slug: "prb1",
    expertise: ["Neurociencia", "Trastornos del sueño", "Neuroimagen"],
    yearsExperience: 15,
  },
]

export default function InvestigadoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedField, setSelectedField] = useState("all")
  const [selectedInstitution, setSelectedInstitution] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  // Filtrar investigadores
  const filteredInvestigadores = investigadores.filter((investigador) => {
    const matchesSearch =
      investigador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investigador.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investigador.expertise.some((exp) => exp.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesField = selectedField === "all" || investigador.field === selectedField
    const matchesInstitution = selectedInstitution === "all" || investigador.institution === selectedInstitution
    const matchesLocation = selectedLocation === "all" || investigador.location.includes(selectedLocation)

    return matchesSearch && matchesField && matchesInstitution && matchesLocation
  })

  // Obtener opciones únicas para filtros
  const fields = [...new Set(investigadores.map((inv) => inv.field))]
  const institutions = [...new Set(investigadores.map((inv) => inv.institution))]
  const locations = [...new Set(investigadores.map((inv) => inv.location.split(",")[0].trim()))]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-blue-900">Investigadores de Chihuahua</h1>
          <p className="text-blue-600">
            Conoce a los investigadores que están impulsando la ciencia y tecnología en el estado
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
                    placeholder="Buscar por nombre, título o especialidad..."
                    className="pl-10 bg-white border-blue-200 text-blue-900 placeholder:text-blue-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <Select value={selectedField} onValueChange={setSelectedField}>
                <SelectTrigger className="bg-white border-blue-200 text-blue-900">
                  <SelectValue placeholder="Campo" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-100">
                  <SelectItem value="all">Todos los campos</SelectItem>
                  {fields.map((field) => (
                    <SelectItem key={field} value={field}>
                      {field}
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
                  {institutions.map((institution) => (
                    <SelectItem key={institution} value={institution}>
                      {institution}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-white border-blue-200 text-blue-900">
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent className="bg-white border-blue-100">
                  <SelectItem value="all">Todas las ubicaciones</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
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
              {filteredInvestigadores.length} investigador{filteredInvestigadores.length !== 1 ? "es" : ""} encontrado
              {filteredInvestigadores.length !== 1 ? "s" : ""}
            </p>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Filter className="mr-2 h-4 w-4" />
              Filtros avanzados
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInvestigadores.map((investigador) => (
              <Link href={`/investigadores/${investigador.slug}`} key={investigador.id}>
                <Card className="h-full hover:shadow-md transition-shadow bg-white border-blue-100 cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={investigador.avatar || "/placeholder.svg"} alt={investigador.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {investigador.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-blue-900 mb-1">{investigador.name}</h3>
                      <p className="text-blue-600 text-sm mb-2">{investigador.title}</p>
                      <Badge variant="secondary" className="mb-3 bg-blue-50 text-blue-700">
                        {investigador.field}
                      </Badge>

                      <div className="w-full space-y-2 text-sm">
                        <div className="flex items-center justify-center gap-1 text-blue-600">
                          <Building className="h-3 w-3" />
                          <span className="text-xs">{investigador.institution}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 text-blue-600">
                          <MapPin className="h-3 w-3" />
                          <span className="text-xs">{investigador.location}</span>
                        </div>
                      </div>

                      <div className="w-full mt-4">
                        <div className="flex flex-wrap gap-1 justify-center">
                          {investigador.expertise.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-blue-200 text-blue-700">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t border-blue-100 flex justify-around py-3">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <FileText className="h-3 w-3 text-blue-500" />
                        <span className="font-bold text-blue-900 text-sm">{investigador.projects}</span>
                      </div>
                      <p className="text-xs text-blue-600">Proyectos</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Award className="h-3 w-3 text-blue-500" />
                        <span className="font-bold text-blue-900 text-sm">{investigador.publications}</span>
                      </div>
                      <p className="text-xs text-blue-600">Publicaciones</p>
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>

          {filteredInvestigadores.length === 0 && (
            <Card className="bg-white border-blue-100">
              <CardContent className="pt-6 text-center py-12">
                <Search className="h-12 w-12 mx-auto text-blue-300 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-blue-900">No se encontraron investigadores</h3>
                <p className="text-sm text-blue-600 mb-6">
                  Intenta ajustar los filtros de búsqueda para encontrar más resultados.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedField("all")
                    setSelectedInstitution("all")
                    setSelectedLocation("all")
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
