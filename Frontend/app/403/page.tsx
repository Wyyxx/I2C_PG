import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lock, Home, ArrowLeft, LogIn } from "lucide-react"

export default function Forbidden() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-orange-900/20">403</h1>
          <div className="relative -mt-20">
            <h2 className="text-4xl font-bold text-orange-900 mb-4">
              Acceso prohibido
            </h2>
          </div>
        </div>

        {/* Error Message */}
        <Card className="bg-white border-orange-100 shadow-lg mb-8">
          <CardContent className="pt-8 pb-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-600" />
              </div>
              
              <p className="text-xl text-orange-600 mb-6">
                No tienes permisos para acceder a esta página o recurso.
              </p>
              
              <div className="bg-orange-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-orange-900 mb-2">
                  ¿Por qué ocurre esto?
                </h3>
                <ul className="text-orange-700 space-y-1 text-left max-w-md mx-auto">
                  <li>• No has iniciado sesión</li>
                  <li>• Tu cuenta no tiene los permisos necesarios</li>
                  <li>• La página requiere autenticación especial</li>
                  <li>• El recurso está protegido por restricciones</li>
                </ul>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">
                  ¿Qué puedes hacer?
                </h3>
                <ul className="text-blue-700 space-y-1 text-left max-w-md mx-auto">
                  <li>• Iniciar sesión con una cuenta autorizada</li>
                  <li>• Solicitar acceso al administrador</li>
                  <li>• Navegar a otras secciones públicas</li>
                  <li>• Contactar soporte si crees que es un error</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-orange-700 text-white hover:bg-orange-800">
            <Link href="/iniciar-sesion">
              <LogIn className="w-4 h-4 mr-2" />
              Iniciar sesión
            </Link>
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

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-gray-900 mb-2">
              ¿Necesitas acceso especial?
            </h3>
            <p className="text-gray-700 text-sm mb-4">
              Si crees que deberías tener acceso a esta página, contacta con nuestro equipo de administración.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" size="sm" asChild className="border-gray-300 text-gray-700">
                <Link href="/contacto">
                  Solicitar acceso
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="border-gray-300 text-gray-700">
                <Link href="/registro">
                  Crear cuenta
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 