"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, Users, FileText, MapPin, ExternalLink, Award, GraduationCap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Datos de ejemplo para instituciones
const instituciones = [
  {
    id: 1,
    nombre: "Universidad Autónoma de Chihuahua",
    siglas: "UACH",
    tipo: "Universidad Pública",
    ubicacion: "Chihuahua, Chihuahua",
    descripcion:
      "La Universidad Autónoma de Chihuahua es una institución de educación superior pública que se destaca por su excelencia académica y su contribución a la investigación científica en el estado.",
    imagen: "/placeholder.svg?height=200&width=400",
    investigadores: 45,
    proyectos: 32,
    publicaciones: 156,
    areas: ["Neurociencia", "Biotecnología", "Ciencias Sociales", "Ingeniería", "Medicina"],
    fundacion: 1954,
    sitioWeb: "https://www.uach.mx",
    slug: "universidad-autonoma-chihuahua",
    investigadoresDestacados: [
      { nombre: "Dra. María Rodríguez", area: "Neurociencia", avatar: "/placeholder.svg" },
      { nombre: "Dr. Pedro Sánchez", area: "Biotecnología", avatar: "/placeholder.svg" },
      { nombre: "Dra. Laura García", area: "Ciencias Sociales", avatar: "/placeholder.svg" },
    ],
  },
  {
    id: 2,
    nombre: "Instituto Tecnológico de Chihuahua",
    siglas: "ITCH",
    tipo: "Instituto Tecnológico",
    ubicacion: "Chihuahua, Chihuahua",
    descripcion:
      "Instituto especializado en tecnología e ingeniería, reconocido por su innovación en inteligencia artificial y desarrollo tecnológico para la industria.",
    imagen: "/placeholder.svg?height=200&width=400",
    investigadores: 28,
    proyectos: 18,
    publicaciones: 89,
    areas: ["Inteligencia Artificial", "Robótica", "Ingeniería Industrial", "Sistemas Computacionales"],
    fundacion: 1948,
    sitioWeb: "https://www.itchihuahua.edu.mx",
    slug: "instituto-tecnologico-chihuahua",
    investigadoresDestacados: [
      { nombre: "Dr. Carlos Méndez", area: "Inteligencia Artificial", avatar: "/placeholder.svg" },
      { nombre: "Ing. Roberto Silva", area: "Robótica", avatar: "/placeholder.svg" },
    ],
  },
  {
    id: 3,
    nombre: "Centro de Investigación en Materiales Avanzados",
    siglas: "CIMAV",
    tipo: "Centro de Investigación",
    ubicacion: "Chihuahua, Chihuahua",
    descripcion:
      "Centro de investigación especializado en el desarrollo de materiales avanzados y nanotecnología, con aplicaciones en energía y medio ambiente.",
    imagen: "/placeholder.svg?height=200&width=400",
    investigadores: 22,
    proyectos: 15,
    publicaciones: 78,
    areas: ["Materiales Avanzados", "Nanotecnología", "Energía", "Ciencias Ambientales"],
    fundacion: 1994,
    sitioWeb: "https://www.cimav.edu.mx",
    slug: "centro-investigacion-materiales-avanzados",
    investigadoresDestacados: [
      { nombre: "Dra. Ana Martínez", area: "Ciencias Ambientales", avatar: "/placeholder.svg" },
      { nombre: "Dr. Miguel Torres", area: "Nanotecnología", avatar: "/placeholder.svg" },
    ],
  },
  {
    id: 4,
    nombre: "Universidad Tecnológica de Ciudad Juárez",
    siglas: "UTCJ",
    tipo: "Universidad Tecnológica",
    ubicacion: "Ciudad Juárez, Chihuahua",
    descripcion:
      "Universidad enfocada en la formación tecnológica y la investigación aplicada, especialmente en áreas relacionadas con la industria manufacturera y la agricultura sostenible.",
    imagen: "/placeholder.svg?height=200&width=400",
    investigadores: 19,
    proyectos: 12,
    publicaciones: 45,
    areas: ["Agricultura Sostenible", "IoT", "Manufactura", "Automatización"],
    fundacion: 1996,
    sitioWeb: "https://www.utcj.edu.mx",
    slug: "universidad-tecnologica-ciudad-juarez",
    investigadoresDestacados: [
      { nombre: "Dr. Javier López", area: "Robótica", avatar: "/placeholder.svg" },
      { nombre: "Ing. María Fernández", area: "Agricultura", avatar: "/placeholder.svg" },
    ],
  },
  {
    id: 5,
    nombre: "Universidad Autónoma de Ciudad Juárez",
    siglas: "UACJ",
    tipo: "Universidad Pública",
    ubicacion: "Ciudad Juárez, Chihuahua",
    descripcion:
      "Universidad pública comprometida con la investigación en ciencias sociales, políticas públicas y desarrollo regional fronterizo.",
    imagen: "/placeholder.svg?height=200&width=400",
    investigadores: 16,
    proyectos: 10,
    publicaciones: 52,
    areas: ["Ciencias Sociales", "Políticas Públicas", "Desarrollo Regional", "Estudios Fronterizos"],
    fundacion: 1973,
    sitioWeb: "https://www.uacj.mx",
    slug: "universidad-autonoma-ciudad-juarez",
    investigadoresDestacados: [
      { nombre: "Dr. Luis Hernández", area: "Políticas Públicas", avatar: "/placeholder.svg" },
      { nombre: "Dra. Carmen Morales", area: "Desarrollo Social", avatar: "/placeholder.svg" },
    ],
  },
  {
    id: 6,
    nombre: "Centro de Investigación en Alimentación y Desarrollo",
    siglas: "CIAD",
    tipo: "Centro de Investigación",
    ubicacion: "Chihuahua, Chihuahua",
    descripcion:
      "Centro especializado en investigación sobre alimentación, nutrición y desarrollo de tecnologías para la industria alimentaria.",
    imagen: "/placeholder.svg?height=200&width=400",
    investigadores: 14,
    proyectos: 8,
    publicaciones: 38,
    areas: ["Biotecnología Alimentaria", "Nutrición", "Microbiología", "Seguridad Alimentaria"],
    fundacion: 1980,
    sitioWeb: "https://www.ciad.mx",
    slug: "centro-investigacion-alimentacion-desarrollo",
    investigadoresDestacados: [
      { nombre: "Dra. Carmen Morales", area: "Biotecnología", avatar: "/placeholder.svg" },
      { nombre: "Dr. Fernando Ruiz", area: "Microbiología", avatar: "/placeholder.svg" },
    ],
  },
]

export default function InstitucionesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-blue-900">Instituciones de Investigación</h1>
          <p className="text-blue-600">
            Conoce las principales instituciones de educación superior y centros de investigación en Chihuahua
          </p>
        </div>

        {/* Estadísticas generales */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-blue-100 text-center">
            <CardContent className="pt-6">
              <Building className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-900">{instituciones.length}</div>
              <p className="text-sm text-blue-600">Instituciones</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-100 text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-900">
                {instituciones.reduce((sum, inst) => sum + inst.investigadores, 0)}
              </div>
              <p className="text-sm text-blue-600">Investigadores</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-100 text-center">
            <CardContent className="pt-6">
              <FileText className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-900">
                {instituciones.reduce((sum, inst) => sum + inst.proyectos, 0)}
              </div>
              <p className="text-sm text-blue-600">Proyectos</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-blue-100 text-center">
            <CardContent className="pt-6">
              <Award className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-900">
                {instituciones.reduce((sum, inst) => sum + inst.publicaciones, 0)}
              </div>
              <p className="text-sm text-blue-600">Publicaciones</p>
            </CardContent>
          </Card>
        </div>

        {/* Lista de instituciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {instituciones.map((institucion) => (
            <Card key={institucion.id} className="bg-white border-blue-100">
              <div className="relative h-48 w-full">
                <Image
                  src={institucion.imagen || "/placeholder.svg"}
                  alt={institucion.nombre}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge className="mb-2 bg-blue-700 text-white">{institucion.tipo}</Badge>
                    <CardTitle className="text-xl text-blue-900">{institucion.nombre}</CardTitle>
                    <CardDescription className="text-blue-600">
                      {institucion.siglas} • Fundada en {institucion.fundacion}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{institucion.ubicacion}</span>
                  </div>

                  <p className="text-blue-600 text-sm">{institucion.descripcion}</p>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="font-bold text-blue-900">{institucion.investigadores}</div>
                      <div className="text-xs text-blue-600">Investigadores</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-900">{institucion.proyectos}</div>
                      <div className="text-xs text-blue-600">Proyectos</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-900">{institucion.publicaciones}</div>
                      <div className="text-xs text-blue-600">Publicaciones</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Áreas de investigación:</h4>
                    <div className="flex flex-wrap gap-1">
                      {institucion.areas.slice(0, 4).map((area, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                          {area}
                        </Badge>
                      ))}
                      {institucion.areas.length > 4 && (
                        <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                          +{institucion.areas.length - 4} más
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">Investigadores destacados:</h4>
                    <div className="flex gap-2">
                      {institucion.investigadoresDestacados.slice(0, 3).map((investigador, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={investigador.avatar || "/placeholder.svg"} alt={investigador.nombre} />
                            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                              {investigador.nombre
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-blue-600">
                            {investigador.nombre.split(" ")[0]} {investigador.nombre.split(" ")[1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-blue-100 flex justify-between">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50" asChild>
                  <Link href={`/instituciones/${institucion.slug}`}>
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Ver detalles
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => window.open(institucion.sitioWeb, "_blank")}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Sitio web
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
