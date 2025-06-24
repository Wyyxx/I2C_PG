# Configuración del Sistema OCR con Tesseract

## Descripción
Este proyecto implementa un sistema de OCR (Reconocimiento Óptico de Caracteres) usando Tesseract para extraer información de archivos PDF del Perfil Único de investigadores.

## Estructura del Proyecto

### Backend (Python/FastAPI)
- `backend/main.py` - Servidor FastAPI con endpoints para OCR y registro
- `backend/pdf_processor.py` - Lógica de procesamiento de PDFs
- `backend/utils/pdf_extractor.py` - Extracción de datos usando Tesseract
- `backend/config/database.py` - Configuración de base de datos PostgreSQL

### Frontend (Next.js)
- `Frontend/app/registro/page.tsx` - Formulario de registro con OCR
- `Frontend/app/api/ocr/route.ts` - Endpoint que conecta con el backend
- `Frontend/app/api/registro/route.ts` - Endpoint de registro

## Instalación y Configuración

### 1. Instalar Tesseract OCR

#### En Windows:
```bash
# Descargar e instalar desde: https://github.com/UB-Mannheim/tesseract/wiki
# O usar chocolatey:
choco install tesseract
```

#### En macOS:
```bash
brew install tesseract
brew install tesseract-lang  # Para idiomas adicionales
```

#### En Ubuntu/Debian:
```bash
sudo apt update
sudo apt install tesseract-ocr
sudo apt install tesseract-ocr-spa  # Para español
```

### 2. Configurar el Backend

```bash
cd backend

# Instalar dependencias
pip install -r requirements.txt

# Crear archivo .env con las credenciales de la base de datos
echo "DB_HOST=localhost
DB_NAME=prb_local
DB_USER=soporte
DB_PASSWORD=soporte" > .env

# Ejecutar el servidor
python main.py
```

El backend estará disponible en: `http://localhost:8000`

### 3. Configurar el Frontend

```bash
cd Frontend

# Instalar dependencias
npm install

# Crear archivo .env.local
echo "BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local

# Ejecutar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en: `http://localhost:3000`

## Uso del Sistema

### 1. Procesamiento de PDF
1. Ve a la página de registro: `http://localhost:3000/registro`
2. Sube un archivo PDF del Perfil Único (máximo 2MB)
3. Haz clic en "Procesar Perfil Único"
4. El sistema extraerá automáticamente los datos del PDF
5. Revisa y corrige los datos extraídos
6. Completa los campos que requieren captura manual (línea de investigación, contraseña)
7. Envía el formulario

### 2. Endpoints Disponibles

#### Backend (Python):
- `POST /procesar-pdf` - Procesa un PDF y extrae datos
- `POST /registro` - Registra un investigador en la base de datos
- `GET /` - Endpoint de prueba

#### Frontend (Next.js):
- `POST /api/ocr` - Conecta con el backend para procesar PDFs
- `POST /api/registro` - Conecta con el backend para registrar investigadores

## Campos Extraídos Automáticamente

El sistema OCR extrae los siguientes campos del PDF:
- Nombre completo
- CURP
- RFC
- CVU/PU (Perfil Único)
- Correo electrónico
- Teléfono
- Último grado de estudios
- Empleo actual
- Fecha de nacimiento

## Campos de Captura Manual

Los siguientes campos requieren captura manual:
- Línea de investigación
- Contraseña
- Confirmación de contraseña
- Nacionalidad (si no es mexicana)

## Base de Datos

La tabla `investigadores` incluye los siguientes campos:
- `id` - Identificador único
- `nombre_completo` - Nombre completo del investigador
- `curp` - CURP (único)
- `rfc` - RFC
- `no_cvu` - Número de CVU/PU
- `correo` - Correo electrónico (único)
- `telefono` - Teléfono
- `ultimo_grado_estudios` - Último grado académico
- `empleo_actual` - Empleo actual
- `linea_investigacion` - Línea de investigación
- `nacionalidad` - Nacionalidad
- `fecha_nacimiento` - Fecha de nacimiento
- `password` - Contraseña (hasheada)
- `fecha_registro` - Fecha de registro
- `origen` - Origen del registro (OCR)
- `archivo_procesado` - Nombre del archivo procesado

## Solución de Problemas

### Error: "Tesseract no encontrado"
- Asegúrate de que Tesseract esté instalado y en el PATH del sistema
- En Windows, verifica que la ruta esté en las variables de entorno

### Error: "No se puede conectar al backend"
- Verifica que el backend esté ejecutándose en `http://localhost:8000`
- Revisa la variable `BACKEND_URL` en `.env.local`

### Error: "Error al procesar el PDF"
- Verifica que el archivo sea un PDF válido
- Asegúrate de que el tamaño no exceda 2MB
- Revisa que el PDF contenga texto legible

### Error de base de datos
- Verifica las credenciales en el archivo `.env` del backend
- Asegúrate de que PostgreSQL esté ejecutándose
- Verifica que la base de datos `prb_local` exista

## Despliegue en Producción

### Backend:
- Usar un servidor WSGI como Gunicorn
- Configurar variables de entorno para producción
- Usar HTTPS
- Configurar CORS apropiadamente

### Frontend:
- Desplegar en Vercel, Netlify o similar
- Configurar variables de entorno de producción
- El backend debe estar desplegado en un servidor accesible

## Notas Importantes

1. **Seguridad**: Las contraseñas se almacenan en texto plano en este ejemplo. En producción, usar bcrypt o similar.
2. **Validación**: El sistema incluye validaciones básicas, pero se recomienda agregar más validaciones según los requisitos.
3. **OCR**: La precisión del OCR depende de la calidad del PDF. Se recomienda revisar siempre los datos extraídos.
4. **Duplicados**: El sistema verifica duplicados por CURP y correo electrónico. 