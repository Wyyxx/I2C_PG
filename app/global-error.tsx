'use client'

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error occurred:', error)
  }, [error])

  return (
    <html lang="es">
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Error Icon */}
            <div className="mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              <h1 className="text-4xl font-bold text-red-900 mb-4">
                Error crítico
              </h1>
            </div>

            {/* Error Message */}
            <Card className="bg-white border-red-100 shadow-lg mb-8">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-4">
                  <p className="text-xl text-red-600 mb-6">
                    Ha ocurrido un error crítico en la aplicación. Por favor, recarga la página.
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
                      Soluciones recomendadas:
                    </h3>
                    <ul className="text-blue-700 space-y-1 text-left max-w-md mx-auto">
                      <li>• Recargar la página completamente</li>
                      <li>• Limpiar el caché del navegador</li>
                      <li>• Verificar tu conexión a internet</li>
                      <li>• Intentar en un navegador diferente</li>
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
                Recargar aplicación
              </Button>
              
              <Button 
                size="lg" 
                onClick={() => window.location.href = '/'}
                className="bg-blue-700 text-white hover:bg-blue-800"
              >
                <Home className="w-4 h-4 mr-2" />
                Ir al inicio
              </Button>
            </div>

            {/* Additional Help */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                Si el problema persiste, contacta con nuestro equipo de soporte técnico
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Email: soporte@sistema-investigadores.com
                </p>
                <p className="text-sm text-gray-500">
                  Teléfono: +52 (614) XXX-XXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 