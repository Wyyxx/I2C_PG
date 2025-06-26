// Configuración de la API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://tu-backend.railway.app'

// Tipos para las respuestas de la API
interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
  error?: string
}

interface RegistroData {
  nombre_completo: string
  curp: string
  rfc: string
  no_cvu: string
  correo: string
  telefono: string
  ultimo_grado_estudios: string
  empleo_actual: string
  linea_investigacion: string
  nacionalidad: string
  fecha_nacimiento: string
  password: string
}

// Función para hacer llamadas a la API
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error en llamada a API:', error)
    return {
      success: false,
      message: 'Error de conexión con el servidor',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

// Funciones específicas de la API
export async function procesarPDF(file: File): Promise<ApiResponse> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await fetch(`${API_BASE_URL}/procesar-pdf`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error procesando PDF:', error)
    return {
      success: false,
      message: 'Error al procesar el PDF',
      error: error instanceof Error ? error.message : 'Error desconocido',
    }
  }
}

export async function registrarInvestigador(data: RegistroData): Promise<ApiResponse> {
  return apiCall('/registro', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function healthCheck(): Promise<ApiResponse> {
  return apiCall('/health')
}

// Función para verificar si el backend está disponible
export async function verificarBackend(): Promise<boolean> {
  try {
    const response = await healthCheck()
    return response.success
  } catch (error) {
    console.error('Backend no disponible:', error)
    return false
  }
} 