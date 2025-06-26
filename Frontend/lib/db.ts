// Importar funciones de Supabase
import { 
  obtenerInvestigadores as obtenerInvestigadoresSupabase,
  obtenerInvestigadorPorId as obtenerInvestigadorPorIdSupabase,
  obtenerInvestigadoresIncompletos as obtenerInvestigadoresIncompletosSupabase,
  guardarInvestigador as guardarInvestigadorSupabase,
  inicializarBaseDeDatos
} from './supabase'

// Inicializar base de datos al cargar el módulo
inicializarBaseDeDatos()

// Funciones que usan Supabase
export async function obtenerInvestigadores() {
  return await obtenerInvestigadoresSupabase()
}

export async function obtenerInvestigadorPorId(id: number) {
  return await obtenerInvestigadorPorIdSupabase(id)
}

export async function obtenerInvestigadoresIncompletos() {
  return await obtenerInvestigadoresIncompletosSupabase()
}

export async function guardarInvestigador(datos: any) {
  return await guardarInvestigadorSupabase(datos)
}
