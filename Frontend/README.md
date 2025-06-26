# Sistema Estatal de Investigadores - Frontend

Este es el frontend de la aplicación Sistema Estatal de Investigadores, construido con Next.js 14 y conectado a Supabase.

## 🚀 Despliegue en Vercel (Gratuito)

### Configuración Automática
1. Conecta tu repositorio de GitHub a Vercel
2. Vercel detectará automáticamente que es un proyecto Next.js
3. Las configuraciones están en `vercel.json`

### Variables de Entorno Requeridas
Configura estas variables en Vercel Dashboard:

```env
# Supabase (Base de datos gratuita)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-de-supabase
```

### Comandos de Build
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🗄️ Configuración de Supabase (Gratuito)

### 1. Crear Proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea cuenta gratuita
3. Crea nuevo proyecto
4. Obtienes PostgreSQL gratuito con 500MB

### 2. Crear Tabla de Investigadores
En Supabase Dashboard > SQL Editor, ejecuta:

```sql
CREATE TABLE investigadores (
  id SERIAL PRIMARY KEY,
  nombre_completo VARCHAR(200) NOT NULL,
  curp VARCHAR(18) UNIQUE,
  rfc VARCHAR(13),
  no_cvu VARCHAR(50),
  correo VARCHAR(100) UNIQUE NOT NULL,
  telefono VARCHAR(20),
  ultimo_grado_estudios TEXT,
  empleo_actual TEXT,
  linea_investigacion TEXT,
  nacionalidad VARCHAR(100),
  fecha_nacimiento DATE,
  password VARCHAR(255) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  origen VARCHAR(50),
  archivo_procesado VARCHAR(255),
  documentacion_completa BOOLEAN DEFAULT false
);

-- Crear índices para mejor rendimiento
CREATE INDEX idx_investigadores_correo ON investigadores(correo);
CREATE INDEX idx_investigadores_curp ON investigadores(curp);
CREATE INDEX idx_investigadores_fecha_registro ON investigadores(fecha_registro);
```

### 3. Configurar Políticas de Seguridad
En Supabase Dashboard > Authentication > Policies:

```sql
-- Permitir lectura pública
CREATE POLICY "Permitir lectura pública" ON investigadores
FOR SELECT USING (true);

-- Permitir inserción pública
CREATE POLICY "Permitir inserción pública" ON investigadores
FOR INSERT WITH CHECK (true);
```

## 🛠️ Desarrollo Local

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Ejecutar en producción
npm start
```

## 📁 Estructura del Proyecto

```
Frontend/
├── app/                 # App Router de Next.js 14
├── components/          # Componentes reutilizables
├── lib/                # Utilidades y configuración
│   ├── db.ts          # Funciones de base de datos
│   └── supabase.ts    # Configuración de Supabase
├── public/             # Archivos estáticos
├── styles/             # Estilos globales
├── next.config.mjs     # Configuración de Next.js
├── vercel.json         # Configuración de Vercel
└── package.json        # Dependencias y scripts
```

## 🔧 Tecnologías

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS
- **Radix UI** - Componentes de UI
- **Supabase** - Base de datos PostgreSQL gratuita
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas

## 💰 Costos

- **Vercel**: Completamente gratuito
- **Supabase**: Plan gratuito con 500MB de base de datos
- **Total**: $0 USD por mes

## 📝 Notas

- La base de datos Supabase está siempre activa
- No hay límites de tiempo de inactividad
- Perfecto para proyectos open source
- Escalable si necesitas más recursos en el futuro

## 🚨 Solución de Problemas

### Si Supabase no conecta:
1. Verifica las variables de entorno en Vercel
2. Asegúrate de que la tabla `investigadores` exista
3. Revisa las políticas de seguridad en Supabase

### Si el build falla:
1. Verifica que `@supabase/supabase-js` esté instalado
2. Revisa que las variables de entorno estén configuradas
3. Los errores de TypeScript están configurados para ser ignorados 