from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from tempfile import NamedTemporaryFile
from pdf_processor import procesar_pdf, guardar_en_db
from config.database import init_db
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title="API de Procesamiento de PDFs y Registro de Investigadores")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, cambiar esto por la URL específica del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo para el registro
class RegistroData(BaseModel):
    nombre_completo: str
    curp: str
    rfc: str
    no_cvu: str
    correo: str
    telefono: str
    ultimo_grado_estudios: str
    empleo_actual: str
    linea_investigacion: str
    nacionalidad: str
    fecha_nacimiento: str
    password: str
    fecha_registro: Optional[str] = None
    origen: Optional[str] = None
    archivo_procesado: Optional[str] = None

# Inicializar la base de datos al iniciar la aplicación
@app.on_event("startup")
async def startup_event():
    init_db()

@app.post("/procesar-pdf")
async def procesar_pdf_endpoint(file: UploadFile = File(...)):
    """
    Endpoint para procesar un archivo PDF y extraer datos (sin guardar en BD)
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")
    
    try:
        # Guardar el archivo temporalmente
        with NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_path = temp_file.name
        
        # Procesar el PDF (solo extraer datos, no guardar)
        resultado = procesar_pdf(temp_path, guardar_db=False)
        
        # Eliminar el archivo temporal
        os.unlink(temp_path)
        
        if not resultado["success"]:
            raise HTTPException(status_code=400, detail=resultado["message"])
            
        return resultado
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/registro")
async def registro_endpoint(data: RegistroData):
    """
    Endpoint para registrar un investigador en la base de datos
    """
    try:
        # Convertir el modelo a diccionario
        datos_dict = data.dict()
        
        # Guardar en la base de datos
        resultado = guardar_en_db(datos_dict)
        
        if not resultado["success"]:
            if resultado.get("duplicado"):
                return {
                    "success": False,
                    "duplicado": True,
                    "message": resultado["message"],
                    "id": resultado.get("id")
                }
            else:
                raise HTTPException(status_code=500, detail=resultado["message"])
        
        return {
            "success": True,
            "message": resultado["message"],
            "id": resultado.get("id")
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    """
    Endpoint de prueba
    """
    return {"message": "API de Procesamiento de PDFs funcionando correctamente"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 