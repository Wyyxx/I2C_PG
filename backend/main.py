from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from tempfile import NamedTemporaryFile
from pdf_processor import procesar_pdf
from config.database import init_db

app = FastAPI(title="API de Procesamiento de PDFs")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, cambiar esto por la URL específica del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar la base de datos al iniciar la aplicación
@app.on_event("startup")
async def startup_event():
    init_db()

@app.post("/procesar-pdf")
async def procesar_pdf_endpoint(file: UploadFile = File(...)):
    """
    Endpoint para procesar un archivo PDF
    """
    if not file.filename.endswith('.pdf'):
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")
    
    try:
        # Guardar el archivo temporalmente
        with NamedTemporaryFile(delete=False, suffix='.pdf') as temp_file:
            shutil.copyfileobj(file.file, temp_file)
            temp_path = temp_file.name
        
        # Procesar el PDF
        resultado = procesar_pdf(temp_path)
        
        # Eliminar el archivo temporal
        os.unlink(temp_path)
        
        if not resultado["success"]:
            raise HTTPException(status_code=400, detail=resultado["message"])
            
        return resultado
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 