# 🔒 Proyecto FECTI / SECCTI

<div align="center">

![Estado](https://img.shields.io/badge/Estado-Protegido-red)
![Tipo](https://img.shields.io/badge/Tipo-Oficial-blue)
![Licencia](https://img.shields.io/badge/Licencia-Privada-yellow)

</div>

---

## 📋 Descripción

Repositorio oficial del proyecto desarrollado en colaboración con:

- 🧪 **FECTI** (Fondo Estatal para la Ciencia, la Tecnología y la Innovación)  
- 🏛️ **SECCTI** (Secretaría de Educación, Ciencia, Tecnología e Innovación)

---

## 🛡️ Aviso de Protección Legal

<div align="center">

⚠️ **CONTENIDO PROTEGIDO Y RESTRINGIDO** ⚠️  
*Cualquier uso no autorizado será sancionado conforme a la ley.*

</div>

### 🚫 Restricciones

| Actividad                         | Estado         |
|----------------------------------|----------------|
| Uso sin autorización             | ❌ Prohibido   |
| Reproducción parcial o total     | ❌ Prohibido   |
| Modificación sin permiso previo  | ❌ Prohibido   |
| Distribución a terceros          | ❌ Prohibido   |
| Publicación en medios públicos   | ❌ Prohibido   |

## 🎯 Uso Autorizado

Destinado exclusivamente para:

✅ Evaluación técnica institucional  
✅ Fines académicos autorizados  
✅ Proyectos de innovación tecnológica  
✅ Personal autorizado del proyecto

## 🛠️ Tecnologías Implementadas

| Categoría | Tecnologías |
|-----------|-------------|
| Frontend | Next.js, React |
| Backend | Python, Flask |
| OCR | Tesseract, PyMuPDF |
| Base de Datos | PostgreSQL |
| Herramientas | PDF2Image, PyTesseract |

## ⚖️ Marco Legal

Este proyecto está protegido conforme a:

- 📜 Ley Federal del Derecho de Autor  
- 🔐 Normativas de Propiedad Intelectual  
- 📋 Políticas Institucionales Vigentes

## 📞 Contacto

Para solicitudes de autorización o dudas, contactar por los medios oficiales:

- 📧 **Correo:** transparencia@i2c.com.mx
- 🏢 **Dirección:** Av. Cuauhtémoc # 1800 – 3 Col. Cuauhtémoc Edificio Empresarial C.P. 31020
- 📱 **Teléfono:** +52 (614) 415 0986 
- 📱 **Teléfono:** +52 (614) 261 4322

---

<div align="center">

© 2025 **Gobierno del Estado – FECTI / SECCTI**  
*Todos los derechos reservados*

</div>

# PDF Processor

Aplicación para procesar archivos PDF y extraer información relevante.

## Requisitos Previos

1. Node.js (versión 16 o superior)
2. Python (versión 3.8 o superior)
3. PostgreSQL

## Instalación

1. Instalar las dependencias del proyecto:
```bash
npm install
```

2. Instalar todas las dependencias (frontend y backend):
```bash
npm run install:all
```

3. Configurar la base de datos:
   - Asegúrate de tener PostgreSQL instalado y corriendo
   - Actualiza la contraseña en `backend/app/config/database.py`

## Ejecución

Para ejecutar tanto el frontend como el backend simultáneamente:

```bash
npm run dev
```

Esto iniciará:
- Frontend en http://localhost:3000
- Backend en http://localhost:8000

## Estructura del Proyecto

```
pdf-processor-full/
├── backend/              # Backend FastAPI
│   ├── app/
│   │   ├── main.py
│   │   ├── utils/
│   │   └── config/
│   └── requirements.txt
├── pdf-processor/        # Frontend Next.js
│   ├── src/
│   │   ├── app/
│   │   └── components/
│   └── package.json
└── package.json         # Scripts principales
```