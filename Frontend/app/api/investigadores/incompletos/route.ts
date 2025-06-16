import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { obtenerInvestigadoresIncompletos } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get incomplete investigators from mock data
    const investigadores = await obtenerInvestigadoresIncompletos()

    return NextResponse.json(investigadores)
  } catch (error) {
    console.error("Error al obtener investigadores incompletos:", error)
    return NextResponse.json({ error: "Error al obtener los investigadores incompletos" }, { status: 500 })
  }
}
