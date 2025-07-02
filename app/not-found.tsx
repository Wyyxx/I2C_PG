'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-900/20">404</h1>
          <div className="relative -mt-20">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">
              Página no encontrada
            </h2>
          </div>
        </div>

        {/* Error Message */}
        <Card className="bg-white border-blue-100 shadow-lg mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="space-y-4">
              <p className="text-xl text-blue-600 mb-6">
                Lo sentimos, la página que buscas no existe o ha sido movida.
              </p>
              
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ¿Qué puedes hacer?
                </h3>
                <ul className="text-blue-700 space-y-1 text-left max-w-md mx-auto">
                  <li>• Verificar que la URL esté escrita correctamente</li>
                  <li>• Usar el buscador para encontrar lo que necesitas</li>
                  <li>• Navegar desde la página principal</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-blue-700 text-white hover:bg-blue-800">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild className="border-blue-200 text-blue-700 hover:bg-blue-50">
            <Link href="/explorar">
              <Search className="w-4 h-4 mr-2" />
              Explorar investigadores
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="ghost" 
            className="text-blue-600 hover:bg-blue-50"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.history.back()
              }
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver atrás
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-blue-100">
          <p className="text-blue-600 mb-4">
            ¿Necesitas ayuda? Contacta con nuestro equipo de soporte
          </p>
          <Button variant="link" asChild className="text-blue-700 hover:text-blue-900">
            <Link href="/contacto">
              Contactar soporte
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 