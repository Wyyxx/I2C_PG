// Mock in-memory storage
const investigadores = [
  {
    id: 1,
    no_cvu: "123456",
    curp: "MELM800101HCHNNS09",
    nombre_completo: "Dr. Carlos Méndez López",
    rfc: "MELC800101AB9",
    correo: "carlos.mendez@universidad.edu",
    nacionalidad: "Mexicana",
    fecha_nacimiento: "1980-01-01",
    institucion: "Universidad Autónoma de Chihuahua",
    telefono: "614-123-4567",
    ultimo_grado_estudios: "Doctorado en Ciencias de la Computación",
    empleo_actual: "Profesor-Investigador Titular C",
    linea_investigacion: "Inteligencia Artificial",
    documentacion_completa: "true",
  },
  {
    id: 2,
    no_cvu: "234567",
    curp: "ROLA750212MCHDPR05",
    nombre_completo: "Dra. María Rodríguez Álvarez",
    rfc: "ROAM750212CD3",
    correo: "maria.rodriguez@universidad.edu",
    nacionalidad: "Mexicana",
    fecha_nacimiento: "1975-02-12",
    institucion: "Universidad Nacional Autónoma",
    telefono: "614-234-5678",
    ultimo_grado_estudios: "Doctorado en Neurociencia",
    empleo_actual: "Investigadora Principal",
    linea_investigacion: "Neurociencia Cognitiva",
    documentacion_completa: "false",
  },
]

// Mock function to get all investigators
export async function obtenerInvestigadores() {
  return [...investigadores]
}

// Mock function to get investigator by ID
export async function obtenerInvestigadorPorId(id: number) {
  return investigadores.find((inv) => inv.id === id) || null
}

// Mock function to get incomplete investigators
export async function obtenerInvestigadoresIncompletos() {
  return investigadores.filter((inv) => inv.documentacion_completa === "false")
}

// Mock function to save investigator
export async function guardarInvestigador(datos: any) {
  try {
    console.log("Guardando investigador (mock):", datos)

    const curp = datos.curp?.trim() || ""
    const nombre = datos.nombre_completo?.trim() || ""
    const correo = datos.correo?.trim() || ""

    // Check for duplicates
    if (curp && curp !== "") {
      const existenteCurp = investigadores.find((inv) => inv.curp === curp)
      if (existenteCurp) {
        console.log(`CURP duplicado encontrado: ${curp}`)
        return {
          success: false,
          message: `❌ El CURP ${curp} ya está registrado.`,
          id: existenteCurp.id,
        }
      }
    }

    if (correo && correo !== "") {
      const existenteCorreo = investigadores.find((inv) => inv.correo === correo)
      if (existenteCorreo) {
        console.log(`Correo duplicado encontrado: ${correo}`)
        return {
          success: false,
          message: `❌ El correo electrónico ${correo} ya está registrado.`,
          id: existenteCorreo.id,
        }
      }
    }

    if (!curp || curp === "") {
      const existenteNombre = investigadores.find((inv) => inv.nombre_completo === nombre)
      if (existenteNombre) {
        console.log(`Nombre duplicado encontrado: ${nombre}`)
        return {
          success: false,
          message: `⚠️ El nombre ${nombre} ya está registrado. Verifica si es un duplicado.`,
          id: existenteNombre.id,
        }
      }
    }

    // Create new investigator with ID
    const newId = investigadores.length > 0 ? Math.max(...investigadores.map((inv) => inv.id)) + 1 : 1
    const newInvestigador = { ...datos, id: newId }

    // Add to mock database
    investigadores.push(newInvestigador)

    return {
      success: true,
      message: `✅ Registro exitoso para ${nombre}`,
      id: newId,
    }
  } catch (error) {
    console.error("Error al guardar investigador:", error)
    return {
      success: false,
      message: `❌ Error al guardar: ${error instanceof Error ? error.message : "Error desconocido"}`,
      error,
    }
  }
}

// No need for initDB function anymore
