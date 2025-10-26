-- ============================================================
-- FIX: Row Level Security Policies para Contactos
-- ============================================================
-- Ejecuta este SQL en Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Pega esto > Run
-- ============================================================

-- 1. ELIMINAR políticas antiguas si existen (para evitar conflictos)
DROP POLICY IF EXISTS "Public read access" ON users;
DROP POLICY IF EXISTS "Public read access" ON contacts;
DROP POLICY IF EXISTS "Users can insert their own data" ON users;
DROP POLICY IF EXISTS "Users can insert contacts" ON contacts;
DROP POLICY IF EXISTS "Users can update contacts" ON contacts;
DROP POLICY IF EXISTS "Users can delete contacts" ON contacts;

-- 2. DESHABILITAR RLS temporalmente (solo para desarrollo)
-- IMPORTANTE: En producción querrás políticas más restrictivas
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE contacts DISABLE ROW LEVEL SECURITY;

-- ============================================================
-- ALTERNATIVA: Si quieres mantener RLS activo (más seguro)
-- Descomenta las líneas siguientes y comenta las de arriba
-- ============================================================

-- -- Mantener RLS habilitado
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
-- 
-- -- Políticas permisivas para desarrollo
-- -- Permitir todo en users
-- CREATE POLICY "Allow all operations on users" ON users
-- FOR ALL USING (true) WITH CHECK (true);
-- 
-- -- Permitir todo en contacts
-- CREATE POLICY "Allow all operations on contacts" ON contacts
-- FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- Verificar que las políticas se aplicaron correctamente
-- ============================================================
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename IN ('users', 'contacts');
