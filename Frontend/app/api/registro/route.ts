import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // URL del backend (ajustar según tu configuración)
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    
    const response = await fetch(`${backendUrl}/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const responseData = await response.json()

    if (!response.ok) {
      // Si es un duplicado, devolver el mensaje específico
      if (responseData.duplicado) {
        return NextResponse.json(
          {
            success: false,
            duplicado: true,
            message: responseData.message,
            id: responseData.id
          },
          { status: 409 }
        )
      }
      
      return NextResponse.json(
        { 
          success: false,
          error: responseData.detail || 'Error al registrar el investigador' 
        },
        { status: response.status }
      )
    }

    return NextResponse.json({
      success: true,
      message: responseData.message,
      id: responseData.id
    })

  } catch (error) {
    console.error('Error en el endpoint de registro:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Error interno del servidor' 
      },
      { status: 500 }
    )
  }
}
