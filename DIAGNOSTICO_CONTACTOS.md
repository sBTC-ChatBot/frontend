# 🔍 Diagnóstico de Problemas al Crear Contactos

## ✅ Mejoras Implementadas

He agregado logs detallados para identificar exactamente dónde está el problema. Ahora cuando intentes crear un contacto, verás mensajes en la consola del navegador que te dirán exactamente qué está pasando.

## 🐛 Posibles Causas del Error

### 1. **Problema con Supabase (Más Probable)**
Si ves en la consola errores como:
- `❌ Error de Supabase al crear contacto`
- Mensajes sobre políticas RLS (Row Level Security)
- Errores de permisos

**Solución:** Necesitas configurar las políticas de Supabase correctamente.

### 2. **Usuario no conectado**
Si ves: `Por favor conecta tu wallet primero`

**Solución:** Conecta tu wallet antes de agregar contactos.

### 3. **Credenciales incorrectas**
Si no ves ningún log de Supabase

**Solución:** Verifica el archivo `.env`

## 🔧 Pasos para Diagnosticar

### Paso 1: Abrir la Consola del Navegador
1. Abre Chrome/Edge
2. Presiona `F12` o `Ctrl+Shift+I`
3. Ve a la pestaña "Console"

### Paso 2: Intentar Crear un Contacto
1. Conecta tu wallet
2. Click en el botón ➕ para agregar contacto
3. Llena el formulario:
   - Nombre: Omar
   - Wallet: ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG
4. Click en "Agregar"

### Paso 3: Leer los Logs
Verás una secuencia de mensajes como:
```
🔍 Buscando usuario con wallet: ST1PQH...
Usuario encontrado: {...} Error: null
✅ Usuario existe, creando contacto...
🔍 Verificando si el contacto ya existe...
📝 Insertando nuevo contacto: {...}
✅ Contacto creado exitosamente: {...}
```

O si hay un error:
```
❌ Error de Supabase al crear contacto: {...}
```

## 🛠️ Soluciones según el Error

### Error: "Failed to fetch" o "Network Error"
**Problema:** No se puede conectar a Supabase

**Solución:**
1. Verifica que tengas internet
2. Verifica que las credenciales en `.env` sean correctas:
   ```
   VITE_SUPABASE_URL=https://xvdjwlieclutxzdmhdxg.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. Reinicia el servidor: Ctrl+C y luego `npm run dev`

### Error: "new row violates row-level security policy"
**Problema:** Las políticas RLS de Supabase están bloqueando la inserción

**Solución:** Ve a Supabase Dashboard y ejecuta este SQL:

```sql
-- Permitir inserción en la tabla users
CREATE POLICY "Users can insert their own data" ON users
FOR INSERT WITH CHECK (true);

-- Permitir inserción en la tabla contacts
CREATE POLICY "Users can insert contacts" ON contacts
FOR INSERT WITH CHECK (true);

-- Permitir actualización en la tabla contacts
CREATE POLICY "Users can update contacts" ON contacts
FOR UPDATE USING (true);

-- Permitir eliminación en la tabla contacts
CREATE POLICY "Users can delete contacts" ON contacts
FOR DELETE USING (true);
```

### Error: "duplicate key value violates unique constraint"
**Problema:** Ya existe un contacto con esa dirección

**Solución:**
- Usa un nombre diferente
- O usa una wallet address diferente
- O elimina el contacto duplicado desde Supabase Dashboard

### Error: "relation 'users' does not exist"
**Problema:** Las tablas no existen en Supabase

**Solución:** Ejecuta el SQL de creación de tablas:

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

## 📋 Checklist de Verificación

- [ ] El servidor de desarrollo está corriendo (http://localhost:5175/)
- [ ] La wallet está conectada
- [ ] Las credenciales de Supabase están en `.env`
- [ ] Las tablas existen en Supabase
- [ ] Las políticas RLS están configuradas
- [ ] La consola del navegador está abierta (F12)
- [ ] No hay errores de red en la consola

## 🎯 Qué Enviarme para Ayudarte

Si el problema persiste, envíame:
1. Screenshot de la consola del navegador completa
2. Copia exacta del mensaje de error
3. Los logs que empiezan con 🔍 📝 ✅ o ❌

## 📞 Próximos Pasos

1. **Abre la consola** (F12)
2. **Intenta crear un contacto**
3. **Copia los logs** que aparecen
4. **Envíame los logs** para diagnosticar el problema exacto

---

**Con estos logs detallados, podré identificar exactamente cuál es el problema y darte la solución precisa.** 🎯
