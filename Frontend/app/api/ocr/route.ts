import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      )
    }

    // Verificar que sea un PDF
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'El archivo debe ser un PDF' },
        { status: 400 }
      )
    }

    // Verificar tamaño del archivo (2MB máximo)
    const maxSize = 2 * 1024 * 1024 // 2MB en bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. El tamaño máximo permitido es 2MB.' },
        { status: 400 }
      )
    }

    // Crear FormData para enviar al backend
    const backendFormData = new FormData()
    backendFormData.append('file', file)

    // URL del backend (ajustar según tu configuración)
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    
    const response = await fetch(`${backendUrl}/procesar-pdf`, {
      method: 'POST',
      body: backendFormData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { error: errorData.detail || 'Error al procesar el PDF' },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Error en el endpoint OCR:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
