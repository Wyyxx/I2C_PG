'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    // Aquí puedes enviar el error a un servicio de monitoreo
    // como Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Si se proporciona un fallback personalizado, úsalo
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Fallback por defecto
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
                    Ha ocurrido un error inesperado en esta sección de la aplicación.
                  </p>
                  
                  {this.state.error && (
                    <div className="bg-red-50 rounded-lg p-4 mb-6">
                      <h3 className="font-semibold text-red-900 mb-2">
                        Detalles del error:
                      </h3>
                      <p className="text-red-700 text-sm font-mono break-all">
                        {this.state.error.message}
                      </p>
                    </div>
                  )}

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">
                      ¿Qué puedes hacer?
                    </h3>
                    <ul className="text-blue-700 space-y-1 text-left max-w-md mx-auto">
                      <li>• Intentar recargar la página</li>
                      <li>• Navegar a otra sección</li>
                      <li>• Volver al inicio</li>
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
                onClick={this.handleReset}
                className="bg-red-700 text-white hover:bg-red-800"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Intentar de nuevo
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
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-gray-600 mb-4">
                Si el problema persiste, contacta con nuestro equipo de soporte
              </p>
              <Button 
                variant="link" 
                onClick={() => window.location.href = '/contacto'}
                className="text-blue-700 hover:text-blue-900"
              >
                Contactar soporte
              </Button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook personalizado para usar con componentes funcionales
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null)

  const handleError = React.useCallback((error: Error) => {
    console.error('Error handled by useErrorHandler:', error)
    setError(error)
  }, [])

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  return { error, handleError, resetError }
}

// Componente de error simple para usar en componentes funcionales
export function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error
  resetErrorBoundary: () => void 
}) {
  return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4 text-red-600" />
        <h3 className="font-semibold text-red-900">Error</h3>
      </div>
      <p className="text-red-700 text-sm mb-3">{error.message}</p>
      <Button size="sm" onClick={resetErrorBoundary} className="bg-red-700 text-white hover:bg-red-800">
        Intentar de nuevo
      </Button>
    </div>
  )
} 