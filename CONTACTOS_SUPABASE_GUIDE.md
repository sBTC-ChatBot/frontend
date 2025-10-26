# 📚 Guía de Implementación de Contactos con Supabase

## 🚀 Instalación de Dependencias

Primero, instala el cliente de Supabase:

```bash
npm install @supabase/supabase-js
```

## 🔧 Configuración de Supabase

### 1. Crear el Proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Guarda la **URL del proyecto** y la **API Key (anon/public)**

### 2. Configurar las Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto frontend:

```bash
# .env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
VITE_API_BASE_URL=http://127.0.0.1:5000
```

**⚠️ IMPORTANTE:** Agrega `.env` a tu `.gitignore` para no subir las credenciales al repositorio.

### 3. Ejecutar el Schema SQL en Supabase

1. Ve a tu proyecto en Supabase Dashboard
2. Navega a **SQL Editor** en el menú lateral
3. Copia el contenido del archivo `supabase_schema.sql` (o usa el schema simplificado abajo)
4. Pégalo en el editor y ejecuta

#### Schema Simplificado (el que mencionaste):

```sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  wallet_address TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de contactos
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, wallet_address)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_contacts_user_id ON contacts(user_id);
CREATE INDEX idx_users_wallet_address ON users(wallet_address);

-- Habilitar Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Políticas básicas de seguridad
CREATE POLICY "Public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contacts FOR SELECT USING (true);
CREATE POLICY "Users can insert their own data" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can insert contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update contacts" ON contacts FOR UPDATE USING (true);
CREATE POLICY "Users can delete contacts" ON contacts FOR DELETE USING (true);
```

### 4. Verificar las Tablas

1. Ve a **Table Editor** en el dashboard de Supabase
2. Deberías ver las tablas `users` y `contacts`
3. Puedes agregar datos de prueba si lo deseas

## 🎯 Uso de la Aplicación

### Funcionalidades del CRUD de Contactos

#### 1. **Ver Contactos**
- Los contactos se cargan automáticamente cuando te conectas con tu wallet
- Se muestran en el sidebar izquierdo bajo la sección "Contactos"
- También aparecen en el menú desplegable del botón de contactos (👥) en el área de chat

#### 2. **Agregar Contacto**
- Click en el botón **+** en la sección de contactos del sidebar
- O click en el botón **+** del menú desplegable de contactos
- Completa el formulario:
  - **Nombre del Contacto**: Ej. "Alice", "Bob", "Charlie"
  - **Dirección de Wallet**: Dirección de Stacks que comienza con SP o ST
- Click en **Agregar**

#### 3. **Editar Contacto**
- Pasa el mouse sobre un contacto en el sidebar
- Aparecerán botones de editar (✏️) y eliminar (🗑️)
- Click en el botón de editar
- Modifica el nombre (la dirección no se puede cambiar)
- Click en **Guardar**

#### 4. **Eliminar Contacto**
- Pasa el mouse sobre un contacto en el sidebar
- Click en el botón de eliminar (🗑️)
- Confirma la eliminación

#### 5. **Seleccionar Contacto para Transferencia**
- Click en cualquier contacto
- Se auto-completa el campo de mensaje con la información del contacto
- Puedes modificar el mensaje y enviar la transferencia

## 🔄 Flujo de Datos

```
Usuario conecta wallet
    ↓
Se crea/obtiene usuario en Supabase (tabla users)
    ↓
Se cargan contactos asociados (tabla contacts)
    ↓
Usuario puede: Ver | Agregar | Editar | Eliminar
    ↓
Todos los cambios se sincronizan con Supabase en tiempo real
```

## 📁 Archivos Creados/Modificados

### Nuevos Archivos
1. **`src/services/supabaseService.js`**: Servicio completo de Supabase con todas las funciones CRUD
2. **`src/components/ContactModal.jsx`**: Modal para agregar/editar contactos
3. **`.env.example`**: Ejemplo de variables de entorno
4. **`supabase_schema.sql`**: Schema completo de la base de datos

### Archivos Modificados
1. **`src/components/ChatBot.jsx`**: 
   - Integración con Supabase
   - Manejo de estado de contactos
   - UI actualizada con botones de CRUD
   - Menú desplegable mejorado

## 🎨 Características de la UI

### Sidebar de Contactos
- ✅ Lista de contactos con nombre y dirección
- ✅ Botón para agregar nuevo contacto
- ✅ Botones de editar/eliminar al hacer hover
- ✅ Indicadores de carga
- ✅ Estados vacíos amigables
- ✅ Diseño consistente con el tema original

### Menú Desplegable
- ✅ Acceso rápido desde el área de chat
- ✅ Botón de agregar contacto
- ✅ Lista completa de contactos
- ✅ Búsqueda visual con hover effect
- ✅ Scroll para muchos contactos

### Modal de Contacto
- ✅ Formulario limpio y moderno
- ✅ Validación de campos
- ✅ Validación de direcciones de Stacks
- ✅ Auto-mayúsculas en direcciones
- ✅ Modo crear/editar
- ✅ Feedback visual de errores
- ✅ Loading states

## 🔒 Seguridad

- **Row Level Security (RLS)** habilitado en todas las tablas
- Las políticas permiten acceso público de lectura (ajusta según tus necesidades)
- Las direcciones de wallet se validan antes de guardar
- No se permiten contactos duplicados (constraint UNIQUE)

## 🐛 Solución de Problemas

### Error: "No se pueden cargar los contactos"
- Verifica que las variables de entorno estén configuradas correctamente
- Asegúrate de que las tablas existan en Supabase
- Revisa la consola del navegador para más detalles

### Error: "Cannot find module '@supabase/supabase-js'"
- Ejecuta: `npm install @supabase/supabase-js`

### Los contactos no aparecen
- Verifica que tu wallet esté conectada
- Verifica que el usuario se haya creado en Supabase (tabla `users`)
- Revisa las políticas RLS en Supabase

### Error de CORS
- Asegúrate de que tu dominio esté permitido en Supabase
- Ve a Project Settings > API > CORS para configurarlo

## 📊 Datos de Prueba (Opcional)

Para agregar datos de prueba directamente en Supabase SQL Editor:

```sql
-- Insertar un usuario de prueba
INSERT INTO users (username, wallet_address) 
VALUES ('test_user', 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM');

-- Obtener el ID del usuario
SELECT id FROM users WHERE wallet_address = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';

-- Insertar contactos (reemplaza 'user-id-aqui' con el ID obtenido arriba)
INSERT INTO contacts (user_id, nombre, wallet_address) VALUES
  ('user-id-aqui', 'Alice', 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'),
  ('user-id-aqui', 'Bob', 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG'),
  ('user-id-aqui', 'Charlie', 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC');
```

## 🚀 Próximos Pasos (Mejoras Opcionales)

1. **Búsqueda de Contactos**: Agregar barra de búsqueda en el sidebar
2. **Categorías**: Implementar categorías de contactos (Trabajo, Familia, etc.)
3. **Favoritos**: Marcar contactos como favoritos
4. **Avatares**: Agregar imágenes de perfil personalizadas
5. **Importar/Exportar**: Permitir importar contactos desde CSV
6. **Sincronización**: Auto-crear contactos desde transacciones recientes
7. **Notas**: Agregar campo de notas para cada contacto

## 📞 Contacto y Soporte

Si tienes alguna pregunta o problema:
1. Revisa los logs de la consola del navegador (F12)
2. Revisa los logs de Supabase en el Dashboard
3. Verifica que todas las dependencias estén instaladas
4. Asegúrate de que el backend Flask esté corriendo

---

**¡Listo! 🎉** Ahora tienes un sistema completo de gestión de contactos integrado con Supabase.
