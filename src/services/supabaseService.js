/**
 * Servicio para comunicarse con Supabase
 * Maneja operaciones CRUD para usuarios y contactos
 */

import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

// Cliente de Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// OPERACIONES DE USUARIOS
// ============================================

/**
 * Obtiene o crea un usuario basado en su wallet address
 * @param {string} walletAddress - Dirección de la wallet de Stacks
 * @param {string} username - Nombre de usuario (opcional)
 * @returns {Promise<Object>} Usuario creado o encontrado
 */
export const getOrCreateUser = async (walletAddress, username = null) => {
  try {
    // Primero intentar obtener el usuario existente
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();

    if (existingUser) {
      return { data: existingUser, error: null };
    }

    // Si no existe, crear nuevo usuario
    const { data: newUser, error: createError } = await supabase
      .from('users')
      .insert([
        {
          username: username || `user_${walletAddress.slice(0, 8)}`,
          wallet_address: walletAddress
        }
      ])
      .select()
      .single();

    if (createError) {
      console.error('Error al crear usuario:', createError);
      return { data: null, error: createError };
    }

    return { data: newUser, error: null };
  } catch (error) {
    console.error('Error en getOrCreateUser:', error);
    return { data: null, error };
  }
};

/**
 * Actualiza la información de un usuario
 * @param {string} userId - ID del usuario
 * @param {Object} updates - Datos a actualizar
 * @returns {Promise<Object>} Usuario actualizado
 */
export const updateUser = async (userId, updates) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar usuario:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error en updateUser:', error);
    return { data: null, error };
  }
};

// ============================================
// OPERACIONES DE CONTACTOS - CRUD COMPLETO
// ============================================

/**
 * Obtiene todos los contactos de un usuario
 * @param {string} userId - ID del usuario
 * @returns {Promise<Array>} Lista de contactos
 */
export const getContacts = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', userId)
      .order('nombre', { ascending: true });

    if (error) {
      console.error('Error al obtener contactos:', error);
      return { data: [], error };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error en getContacts:', error);
    return { data: [], error };
  }
};

/**
 * Obtiene todos los contactos de un usuario por wallet address
 * @param {string} walletAddress - Dirección de la wallet
 * @returns {Promise<Array>} Lista de contactos
 */
export const getContactsByWalletAddress = async (walletAddress) => {
  try {
    // Primero obtener el user_id
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single();

    if (userError || !user) {
      console.error('Usuario no encontrado:', userError);
      return { data: [], error: userError };
    }

    // Luego obtener los contactos
    return await getContacts(user.id);
  } catch (error) {
    console.error('Error en getContactsByWalletAddress:', error);
    return { data: [], error };
  }
};

/**
 * Crea un nuevo contacto
 * @param {string} userId - ID del usuario
 * @param {string} nombre - Nombre del contacto
 * @param {string} walletAddress - Dirección de wallet del contacto
 * @returns {Promise<Object>} Contacto creado
 */
export const createContact = async (userId, nombre, walletAddress) => {
  try {
    console.log('🔍 Verificando si el contacto ya existe...');
    // Validar que no exista ya el contacto
    const { data: existing } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', userId)
      .eq('wallet_address', walletAddress)
      .single();

    if (existing) {
      console.log('⚠️ El contacto ya existe');
      return { 
        data: null, 
        error: { message: 'Este contacto ya existe' } 
      };
    }

    console.log('📝 Insertando nuevo contacto:', {
      user_id: userId,
      nombre: nombre.trim(),
      wallet_address: walletAddress.trim()
    });

    // Crear el contacto
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          user_id: userId,
          nombre: nombre.trim(),
          wallet_address: walletAddress.trim()
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Error de Supabase al crear contacto:', error);
      return { data: null, error };
    }

    console.log('✅ Contacto creado exitosamente:', data);
    return { data, error: null };
  } catch (error) {
    console.error('❌ Error en createContact:', error);
    return { data: null, error: { message: error.message || 'Error desconocido' } };
  }
};

/**
 * Crea un nuevo contacto usando wallet address del usuario
 * @param {string} userWalletAddress - Dirección de wallet del usuario
 * @param {string} nombre - Nombre del contacto
 * @param {string} contactWalletAddress - Dirección de wallet del contacto
 * @returns {Promise<Object>} Contacto creado
 */
export const createContactByWalletAddress = async (userWalletAddress, nombre, contactWalletAddress) => {
  try {
    console.log('🔍 Buscando usuario con wallet:', userWalletAddress);
    
    // Obtener el user_id
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', userWalletAddress)
      .single();

    console.log('Usuario encontrado:', user, 'Error:', userError);

    if (userError || !user) {
      console.log('⚠️ Usuario no existe, creando...');
      // Si no existe el usuario, crearlo
      const { data: newUser, error: createError } = await getOrCreateUser(userWalletAddress);
      
      console.log('Nuevo usuario creado:', newUser, 'Error:', createError);
      
      if (createError || !newUser) {
        console.error('❌ Error al crear usuario:', createError);
        return { 
          data: null, 
          error: createError || { message: 'No se pudo crear el usuario' } 
        };
      }
      
      console.log('✅ Usuario creado, ahora creando contacto...');
      return await createContact(newUser.id, nombre, contactWalletAddress);
    }

    console.log('✅ Usuario existe, creando contacto...');
    return await createContact(user.id, nombre, contactWalletAddress);
  } catch (error) {
    console.error('❌ Error en createContactByWalletAddress:', error);
    return { data: null, error: { message: error.message || 'Error desconocido' } };
  }
};

/**
 * Actualiza un contacto existente
 * @param {string} contactId - ID del contacto
 * @param {Object} updates - Datos a actualizar (nombre y/o wallet_address)
 * @returns {Promise<Object>} Contacto actualizado
 */
export const updateContact = async (contactId, updates) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', contactId)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar contacto:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error en updateContact:', error);
    return { data: null, error };
  }
};

/**
 * Elimina un contacto
 * @param {string} contactId - ID del contacto
 * @returns {Promise<Object>} Resultado de la eliminación
 */
export const deleteContact = async (contactId) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', contactId)
      .select()
      .single();

    if (error) {
      console.error('Error al eliminar contacto:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error en deleteContact:', error);
    return { data: null, error };
  }
};

/**
 * Busca contactos por nombre o dirección
 * @param {string} userId - ID del usuario
 * @param {string} query - Término de búsqueda
 * @returns {Promise<Array>} Lista de contactos que coinciden
 */
export const searchContacts = async (userId, query) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('user_id', userId)
      .or(`nombre.ilike.%${query}%,wallet_address.ilike.%${query}%`)
      .order('nombre', { ascending: true });

    if (error) {
      console.error('Error al buscar contactos:', error);
      return { data: [], error };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Error en searchContacts:', error);
    return { data: [], error };
  }
};

/**
 * Obtiene un contacto específico por su ID
 * @param {string} contactId - ID del contacto
 * @returns {Promise<Object>} Contacto encontrado
 */
export const getContactById = async (contactId) => {
  try {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', contactId)
      .single();

    if (error) {
      console.error('Error al obtener contacto:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Error en getContactById:', error);
    return { data: null, error };
  }
};

/**
 * Valida si una dirección de wallet es válida (formato básico)
 * @param {string} address - Dirección a validar
 * @returns {boolean} True si es válida
 */
export const isValidStacksAddress = (address) => {
  // Validación básica: debe empezar con SP o ST y tener longitud adecuada
  const stacksAddressRegex = /^(SP|ST)[0-9A-Z]{38,41}$/;
  return stacksAddressRegex.test(address);
};

// ============================================
// UTILIDADES
// ============================================

/**
 * Formatea una dirección de wallet para mostrar (acortada)
 * @param {string} address - Dirección completa
 * @param {number} startChars - Caracteres al inicio (default: 6)
 * @param {number} endChars - Caracteres al final (default: 4)
 * @returns {string} Dirección formateada
 */
export const formatAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Copia texto al portapapeles
 * @param {string} text - Texto a copiar
 * @returns {Promise<boolean>} True si se copió exitosamente
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error al copiar al portapapeles:', error);
    return false;
  }
};
