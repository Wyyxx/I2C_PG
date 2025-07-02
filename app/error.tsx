'use client'

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error occurred:', error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-4xl font-bold text-red-900 mb-4">
            Algo salió mal
          </h1>
        </div>

        {/* Error Message */}
        <Card className="bg-white border-red-100 shadow-lg mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="space-y-4">
              <p className="text-xl text-red-600 mb-6">
                Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado.
              </p>
              
              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-red-900 mb-2">
                  Detalles del error:
                </h3>
                <p className="text-red-700 text-sm font-mono break-all">
                  {error.message || 'Error desconocido'}
                </p>
                {error.digest && (
                  <p className="text-red-600 text-xs mt-2">
                    ID de error: {error.digest}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ¿Qué puedes hacer?
                </h3>
                <ul className="text-blue-700 space-y-1 text-left max-w-md mx-auto">
                  <li>• Intentar recargar la página</li>
                  <li>• Verificar tu conexión a internet</li>
                  <li>• Volver a la página anterior</li>
                  <li>• Contactar soporte si el problema persiste</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={reset}
            className="bg-red-700 text-white hover:bg-red-800"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Intentar de nuevo
          </Button>
          
          <Button size="lg" asChild className="bg-blue-700 text-white hover:bg-blue-800">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Link>
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
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
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-gray-600 mb-4">
            Si el problema persiste, contacta con nuestro equipo de soporte
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