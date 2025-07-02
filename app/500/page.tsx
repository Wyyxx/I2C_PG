import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Server, RefreshCw, Home, ArrowLeft } from "lucide-react"

export default function ServerError() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-900/20">500</h1>
          <div className="relative -mt-20">
            <h2 className="text-4xl font-bold text-red-900 mb-4">
              Error del servidor
            </h2>
          </div>
        </div>

        {/* Error Message */}
        <Card className="bg-white border-red-100 shadow-lg mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="w-8 h-8 text-red-600" />
              </div>
              
              <p className="text-xl text-red-600 mb-6">
                Ha ocurrido un error interno en nuestro servidor. Estamos trabajando para solucionarlo.
              </p>
              
              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-red-900 mb-2">
                  ¿Qué está pasando?
                </h3>
                <p className="text-red-700 text-sm">
                  Nuestro servidor está experimentando dificultades técnicas. 
                  Este error es temporal y será resuelto pronto.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  Mientras tanto, puedes:
                </h3>
                <ul className="text-blue-700 space-y-1 text-left max-w-md mx-auto">
                  <li>• Intentar recargar la página en unos minutos</li>
                  <li>• Navegar a otras secciones del sitio</li>
                  <li>• Volver más tarde cuando el problema esté resuelto</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => window.location.reload()}
            className="bg-red-700 text-white hover:bg-red-800"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Recargar página
          </Button>
          
          <Button size="lg" asChild className="bg-blue-700 text-white hover:bg-blue-800">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Ir al inicio
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild className="border-gray-200 text-gray-700 hover:bg-gray-50">
            <Link href="javascript:history.back()">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver atrás
            </Link>
          </Button>
        </div>

        {/* Status Information */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="bg-yellow-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-yellow-900 mb-2">
              Estado del servicio
            </h3>
            <p className="text-yellow-700 text-sm">
              Nuestro equipo técnico ha sido notificado y está trabajando para resolver este problema.
              Te pedimos paciencia mientras restauramos el servicio.
            </p>
          </div>
          
          <p className="text-gray-600 mb-4">
            Para reportes urgentes, contacta con nuestro equipo de soporte
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