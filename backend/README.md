# Sistema Estatal de Investigadores - Backend

Backend de la aplicación Sistema Estatal de Investigadores, construido con FastAPI y Python.

## 🚀 Despliegue en Railway

### Configuración Automática
1. Conecta tu repositorio de GitHub a Railway
2. Railway detectará automáticamente que es un proyecto Python
3. Las configuraciones están en `railway.json` y `Procfile`

### Variables de Entorno Requeridas
Configura estas variables en Railway Dashboard:

```env
# Base de datos PostgreSQL
DB_HOST=tu-host-postgresql
DB_NAME=tu-nombre-db
DB_USER=tu-usuario
DB_PASSWORD=tu-password

# Configuración del servidor
PORT=8000
HOST=0.0.0.0

# Configuración de la aplicación
ENVIRONMENT=production
DEBUG=false

# URLs permitidas para CORS
ALLOWED_ORIGINS=https://tu-frontend.vercel.app,http://localhost:3000
```

### Base de Datos PostgreSQL
Railway ofrece PostgreSQL como servicio. Configura una nueva base de datos:
1. En Railway Dashboard, crea un nuevo servicio PostgreSQL
2. Copia las credenciales de conexión
3. Configúralas en las variables de entorno

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar en desarrollo
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Ejecutar con gunicorn (producción)
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:$PORT
```

## 📁 Estructura del Proyecto

```
backend/
├── config/
│   └── database.py      # Configuración de base de datos
├── utils/
│   └── pdf_extractor.py # Utilidades para extracción de PDFs
├── main.py              # Aplicación principal FastAPI
├── pdf_processor.py     # Procesamiento de PDFs
├── requirements.txt     # Dependencias Python
├── railway.json         # Configuración de Railway
├── Procfile            # Comando de inicio para Railway
└── runtime.txt         # Versión de Python
```

## 🔧 Endpoints Disponibles

- `GET /` - Endpoint de prueba
- `GET /health` - Health check para Railway
- `POST /procesar-pdf` - Procesar archivos PDF
- `POST /registro` - Registrar investigadores

## 📝 Notas Importantes

- El backend usa PostgreSQL como base de datos
- Las imágenes de PDF se procesan con PyMuPDF y Tesseract
- CORS está configurado para permitir conexiones desde el frontend
- El health check endpoint es requerido por Railway

## 🔗 Integración con Frontend

El frontend se conecta a este backend a través de la variable de entorno:
```env
NEXT_PUBLIC_API_URL=https://tu-backend.railway.app
```

## 🚨 Solución de Problemas

### Si el build falla:
1. Verifica que todas las dependencias estén en `requirements.txt`
2. Asegúrate de que la versión de Python sea compatible
3. Revisa los logs de Railway

### Si la base de datos no conecta:
1. Verifica las variables de entorno en Railway
2. Asegúrate de que el servicio PostgreSQL esté activo
3. Revisa la configuración de red y firewall

### Si el procesamiento de PDF falla:
1. Verifica que Tesseract esté instalado en Railway
2. Revisa los permisos de archivos
3. Verifica el tamaño máximo de archivos permitido 