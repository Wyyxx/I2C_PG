import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para la base de datos
export interface Investigador {
  id?: number
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
  fecha_registro?: string
  origen?: string
  archivo_procesado?: string
  documentacion_completa?: boolean
}

// Funciones para interactuar con la base de datos
export async function obtenerInvestigadores() {
  const { data, error } = await supabase
    .from('investigadores')
    .select('*')
    .order('fecha_registro', { ascending: false })

  if (error) {
    console.error('Error obteniendo investigadores:', error)
    return []
  }

  return data || []
}

export async function obtenerInvestigadorPorId(id: number) {
  const { data, error } = await supabase
    .from('investigadores')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error obteniendo investigador:', error)
    return null
  }

  return data
}

export async function obtenerInvestigadoresIncompletos() {
  const { data, error } = await supabase
    .from('investigadores')
    .select('*')
    .eq('documentacion_completa', false)
    .order('fecha_registro', { ascending: false })

  if (error) {
    console.error('Error obteniendo investigadores incompletos:', error)
    return []
  }

  return data || []
}

export async function guardarInvestigador(datos: Investigador) {
  try {
    // Verificar duplicados
    const { data: existentes } = await supabase
      .from('investigadores')
      .select('id, curp, correo, nombre_completo')
      .or(`curp.eq.${datos.curp},correo.eq.${datos.correo}`)

    if (existentes && existentes.length > 0) {
      const duplicado = existentes[0]
      if (duplicado.curp === datos.curp) {
        return {
          success: false,
          message: `❌ El CURP ${datos.curp} ya está registrado.`,
          id: duplicado.id,
        }
      }
      if (duplicado.correo === datos.correo) {
        return {
          success: false,
          message: `❌ El correo electrónico ${datos.correo} ya está registrado.`,
          id: duplicado.id,
        }
      }
    }

    // Insertar nuevo investigador
    const { data, error } = await supabase
      .from('investigadores')
      .insert([datos])
      .select()
      .single()

    if (error) {
      console.error('Error guardando investigador:', error)
      return {
        success: false,
        message: `❌ Error al guardar: ${error.message}`,
        error,
      }
    }

    return {
      success: true,
      message: `✅ Registro exitoso para ${datos.nombre_completo}`,
      id: data.id,
    }
  } catch (error) {
    console.error('Error inesperado:', error)
    return {
      success: false,
      message: `❌ Error inesperado: ${error instanceof Error ? error.message : 'Error desconocido'}`,
      error,
    }
  }
}

// Función para crear la tabla si no existe
export async function inicializarBaseDeDatos() {
  // Esta función se ejecutará automáticamente en Supabase
  // La tabla se crea desde el dashboard de Supabase
  console.log('Base de datos Supabase inicializada')
} 