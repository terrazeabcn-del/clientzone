# Terrazea Client Zone - Configuración Completa

## ✅ Estado Actual

La aplicación está completamente configurada y lista para usar con:

### 🔐 **Usuarios Creados**

1. **👑 Usuario Administrador**
   - **Email:** `aterrazea@gmail.com`
   - **Contraseña:** `Terraze@Gnerai123`
   - **Rol:** admin
   - **Acceso:** Admin completo a toda la aplicación

2. **👤 Usuarios Cliente de Ejemplo**
   - **Juan Pérez** (`juan@example.com`) - Contraseña: `password123`
   - **María García** (`maria.garcia@example.com`) - Contraseña: `password123`
   - **Carlos López** (`carlos.lopez@example.com`) - Contraseña: `password123`

### 🏗️ **Base de Datos Configurada**

- ✅ **Extensiones:** `uuid-ossp` y `pgcrypto` activas
- ✅ **Tabla `app_users`** con contraseñas hasheadas usando pgcrypto
- ✅ **Esquema completo** con todas las tablas y relaciones
- ✅ **Datos de ejemplo** para hacer la app funcional
- ✅ **Row Level Security (RLS)** configurado

### 📊 **Datos de Ejemplo**

- ✅ **1 Proyecto principal:** "Terraza Mediterránea Premium" (68% completado)
- ✅ **4 Miembros del equipo** asignados
- ✅ **8 Fases del proyecto** con progreso
- ✅ **4 Hitos** con fechas y estados
- ✅ **8 Documentos** categorizados
- ✅ **4 Fotos** del progreso
- ✅ **Conversaciones y mensajes** de ejemplo
- ✅ **Métricas y resúmenes** completos

## 🚀 **Instrucciones de Uso**

### 1. **Configurar Variables de Entorno**

Copia el archivo `env.example` a `.env.local` y configura:

```bash
cp env.example .env.local
```

Edita `.env.local` con tus valores:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://wpzvruwcxtgshmwcqjsa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service Role Key (OBLIGATORIO)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Configuración del proyecto por defecto
SUPABASE_DEFAULT_PROJECT_SLUG=terraza-mediterranea-premium

# Clave secreta para sesiones
SESSION_SECRET=your_secure_session_secret_here
```

**⚠️ IMPORTANTE:** Obtén tu `SUPABASE_SERVICE_ROLE_KEY` desde:
https://supabase.com/dashboard/project/wpzvruwcxtgshmwcqjsa/settings/api

### 2. **Instalar Dependencias**

```bash
pnpm install
```

### 3. **Ejecutar la Aplicación**

```bash
pnpm dev
```

### 4. **Acceder a la Aplicación**

- **Admin:** `aterrazea@gmail.com` / `Terraze@Gnerai123`
- **Cliente:** `juan@example.com` / `password123`

## 📋 **Esquema de Base de Datos**

### Tablas Principales

- `app_users` - Usuarios con autenticación (admin/client)
- `clients` - Clientes de Terrazea
- `projects` - Proyectos de construcción
- `team_members` - Miembros del equipo
- `project_team_members` - Asignación de equipo a proyectos
- `project_updates` - Actualizaciones del proyecto
- `project_milestones` - Hitos del proyecto
- `project_phases` - Fases del proyecto
- `project_activity` - Actividad del proyecto
- `project_photos` - Fotos del progreso
- `project_documents` - Documentos del proyecto
- `project_metrics` - Métricas del proyecto
- `project_conversations` - Conversaciones
- `project_messages` - Mensajes

### Seguridad

- ✅ **Row Level Security (RLS)** habilitado en todas las tablas
- ✅ **Políticas de seguridad** configuradas
- ✅ **Contraseñas hasheadas** con pgcrypto
- ✅ **Roles de usuario** (admin/client)

## 🔧 **Comandos Útiles**

```bash
# Instalar dependencias
pnpm install

# Ejecutar en desarrollo
pnpm dev

# Construir para producción
pnpm build

# Ejecutar en producción
pnpm start

# Linting
pnpm lint
```

## 📝 **Notas Importantes**

1. **Service Role Key:** Es obligatorio configurar la `SUPABASE_SERVICE_ROLE_KEY` para que la aplicación funcione correctamente.

2. **Contraseñas:** Las contraseñas están hasheadas usando pgcrypto con bcrypt.

3. **Proyecto por defecto:** El slug `terraza-mediterranea-premium` está configurado como proyecto por defecto.

4. **Seguridad:** Cada cliente solo puede ver sus propios proyectos y datos relacionados.

## 🎯 **Próximos Pasos**

1. Configurar las variables de entorno
2. Obtener la Service Role Key de Supabase
3. Ejecutar `pnpm dev`
4. Acceder con las credenciales de admin
5. ¡Disfrutar de la aplicación! 🎉

---

**Desarrollado para Terrazea** - Sistema de gestión de proyectos de construcción
