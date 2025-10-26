// ================================================================
// EJEMPLOS DE USO DEL SERVICIO DE SUPABASE
// ================================================================

import { 
  getContactsByWalletAddress,
  createContactByWalletAddress,
  updateContact,
  deleteContact,
  searchContacts,
  getOrCreateUser,
  isValidStacksAddress,
  formatAddress
} from './services/supabaseService';

// ================================================================
// EJEMPLO 1: Crear o obtener un usuario
// ================================================================
const handleUserLogin = async (walletAddress) => {
  const { data: user, error } = await getOrCreateUser(
    walletAddress,
    'Mi Usuario' // opcional
  );

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Usuario:', user);
  // { id: 'uuid', username: 'Mi Usuario', wallet_address: 'SP...', created_at: '...' }
};

// ================================================================
// EJEMPLO 2: Obtener todos los contactos de un usuario
// ================================================================
const handleLoadContacts = async (userWalletAddress) => {
  const { data: contacts, error } = await getContactsByWalletAddress(userWalletAddress);

  if (error) {
    console.error('Error cargando contactos:', error);
    return;
  }

  console.log('Contactos:', contacts);
  // [
  //   { id: 'uuid', user_id: 'uuid', nombre: 'Alice', wallet_address: 'SP...', created_at: '...' },
  //   { id: 'uuid', user_id: 'uuid', nombre: 'Bob', wallet_address: 'ST...', created_at: '...' }
  // ]
};

// ================================================================
// EJEMPLO 3: Crear un nuevo contacto
// ================================================================
const handleCreateContact = async (userWalletAddress) => {
  const { data: newContact, error } = await createContactByWalletAddress(
    userWalletAddress,
    'Alice',
    'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
  );

  if (error) {
    if (error.message === 'Este contacto ya existe') {
      alert('Este contacto ya está en tu lista');
    } else {
      console.error('Error creando contacto:', error);
    }
    return;
  }

  console.log('Contacto creado:', newContact);
  // { id: 'uuid', user_id: 'uuid', nombre: 'Alice', wallet_address: 'ST...', created_at: '...' }
};

// ================================================================
// EJEMPLO 4: Actualizar un contacto
// ================================================================
const handleUpdateContact = async (contactId) => {
  const { data: updatedContact, error } = await updateContact(contactId, {
    nombre: 'Alice Cooper'
  });

  if (error) {
    console.error('Error actualizando contacto:', error);
    return;
  }

  console.log('Contacto actualizado:', updatedContact);
};

// ================================================================
// EJEMPLO 5: Eliminar un contacto
// ================================================================
const handleDeleteContact = async (contactId) => {
  if (!confirm('¿Eliminar este contacto?')) return;

  const { data, error } = await deleteContact(contactId);

  if (error) {
    console.error('Error eliminando contacto:', error);
    return;
  }

  console.log('Contacto eliminado:', data);
};

// ================================================================
// EJEMPLO 6: Buscar contactos
// ================================================================
const handleSearchContacts = async (userId, searchTerm) => {
  const { data: results, error } = await searchContacts(userId, searchTerm);

  if (error) {
    console.error('Error buscando contactos:', error);
    return;
  }

  console.log('Resultados de búsqueda:', results);
  // Busca en nombre y wallet_address
};

// ================================================================
// EJEMPLO 7: Validar dirección de Stacks
// ================================================================
const handleValidateAddress = (address) => {
  const isValid = isValidStacksAddress(address);
  
  if (isValid) {
    console.log('✅ Dirección válida:', address);
  } else {
    console.log('❌ Dirección inválida:', address);
  }
};

// Ejemplos:
handleValidateAddress('ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'); // ✅ true
handleValidateAddress('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7'); // ✅ true
handleValidateAddress('invalid-address'); // ❌ false
handleValidateAddress('BTC1234567890'); // ❌ false

// ================================================================
// EJEMPLO 8: Formatear dirección para mostrar
// ================================================================
const handleFormatAddress = (address) => {
  const formatted = formatAddress(address, 6, 4);
  console.log('Dirección formateada:', formatted);
  // ST1PQH...ZGGM
};

// Ejemplos:
const fullAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
console.log(formatAddress(fullAddress)); // ST1PQH...ZGGM
console.log(formatAddress(fullAddress, 8, 6)); // ST1PQHQK...PGZGM
console.log(formatAddress(fullAddress, 10, 10)); // ST1PQHQKV0...TPGZGM

// ================================================================
// EJEMPLO 9: Manejo completo en un componente React
// ================================================================
const ContactsComponent = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userWallet, setUserWallet] = useState('');

  // Cargar contactos al montar el componente
  useEffect(() => {
    const loadContacts = async () => {
      if (!userWallet) return;

      setLoading(true);
      try {
        // Asegurar que el usuario existe
        await getOrCreateUser(userWallet);
        
        // Cargar contactos
        const { data, error } = await getContactsByWalletAddress(userWallet);
        
        if (error) {
          console.error('Error:', error);
          setContacts([]);
        } else {
          setContacts(data || []);
        }
      } catch (error) {
        console.error('Error:', error);
        setContacts([]);
      } finally {
        setLoading(false);
      }
    };

    loadContacts();
  }, [userWallet]);

  // Agregar contacto
  const handleAdd = async (nombre, wallet_address) => {
    try {
      const { data, error } = await createContactByWalletAddress(
        userWallet,
        nombre,
        wallet_address
      );

      if (error) {
        alert(error.message || 'Error al crear contacto');
        return;
      }

      // Actualizar lista
      setContacts(prev => [...prev, data]);
      alert('✅ Contacto agregado');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar contacto');
    }
  };

  // Editar contacto
  const handleEdit = async (contactId, nuevoNombre) => {
    try {
      const { data, error } = await updateContact(contactId, {
        nombre: nuevoNombre
      });

      if (error) {
        alert('Error al actualizar contacto');
        return;
      }

      // Actualizar lista
      setContacts(prev => prev.map(c => 
        c.id === contactId ? data : c
      ));
      alert('✅ Contacto actualizado');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar contacto');
    }
  };

  // Eliminar contacto
  const handleDelete = async (contactId) => {
    if (!confirm('¿Eliminar contacto?')) return;

    try {
      const { error } = await deleteContact(contactId);

      if (error) {
        alert('Error al eliminar contacto');
        return;
      }

      // Actualizar lista
      setContacts(prev => prev.filter(c => c.id !== contactId));
      alert('✅ Contacto eliminado');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar contacto');
    }
  };

  return (
    <div>
      {loading ? (
        <p>Cargando contactos...</p>
      ) : (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              <span>{contact.nombre}</span>
              <span>{formatAddress(contact.wallet_address)}</span>
              <button onClick={() => handleEdit(contact.id, 'Nuevo Nombre')}>
                Editar
              </button>
              <button onClick={() => handleDelete(contact.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      
      <button onClick={() => handleAdd('Bob', 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG')}>
        Agregar Bob
      </button>
    </div>
  );
};

// ================================================================
// EJEMPLO 10: Uso en formulario controlado
// ================================================================
const ContactForm = ({ userWallet, onSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validar
    if (!nombre.trim()) {
      setError('El nombre es requerido');
      return;
    }

    if (!isValidStacksAddress(walletAddress.trim())) {
      setError('Dirección de wallet inválida');
      return;
    }

    // Crear contacto
    setLoading(true);
    try {
      const { data, error: createError } = await createContactByWalletAddress(
        userWallet,
        nombre.trim(),
        walletAddress.trim()
      );

      if (createError) {
        setError(createError.message || 'Error al crear contacto');
        return;
      }

      // Éxito
      setNombre('');
      setWalletAddress('');
      onSuccess?.(data);
    } catch (error) {
      console.error('Error:', error);
      setError('Error inesperado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre del contacto"
        disabled={loading}
      />
      
      <input
        type="text"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value.toUpperCase())}
        placeholder="SP o ST..."
        disabled={loading}
      />
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Guardando...' : 'Agregar Contacto'}
      </button>
    </form>
  );
};

// ================================================================
// EJEMPLO 11: Hook personalizado para contactos
// ================================================================
const useContacts = (userWallet) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar contactos
  const loadContacts = useCallback(async () => {
    if (!userWallet) return;

    setLoading(true);
    setError(null);
    
    try {
      await getOrCreateUser(userWallet);
      const { data, error: loadError } = await getContactsByWalletAddress(userWallet);
      
      if (loadError) throw loadError;
      
      setContacts(data || []);
    } catch (err) {
      setError(err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [userWallet]);

  // Agregar contacto
  const addContact = useCallback(async (nombre, wallet_address) => {
    try {
      const { data, error } = await createContactByWalletAddress(
        userWallet,
        nombre,
        wallet_address
      );
      
      if (error) throw error;
      
      setContacts(prev => [...prev, data]);
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err };
    }
  }, [userWallet]);

  // Actualizar contacto
  const updateContactById = useCallback(async (contactId, updates) => {
    try {
      const { data, error } = await updateContact(contactId, updates);
      
      if (error) throw error;
      
      setContacts(prev => prev.map(c => c.id === contactId ? data : c));
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err };
    }
  }, []);

  // Eliminar contacto
  const removeContact = useCallback(async (contactId) => {
    try {
      const { error } = await deleteContact(contactId);
      
      if (error) throw error;
      
      setContacts(prev => prev.filter(c => c.id !== contactId));
      return { success: true };
    } catch (err) {
      return { success: false, error: err };
    }
  }, []);

  // Auto-cargar al cambiar wallet
  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return {
    contacts,
    loading,
    error,
    loadContacts,
    addContact,
    updateContactById,
    removeContact
  };
};

// Uso del hook:
const MyComponent = () => {
  const userWallet = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
  const { 
    contacts, 
    loading, 
    error, 
    addContact, 
    updateContactById, 
    removeContact 
  } = useContacts(userWallet);

  const handleAdd = async () => {
    const result = await addContact('Charlie', 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC');
    
    if (result.success) {
      console.log('✅ Contacto agregado');
    } else {
      console.error('❌ Error:', result.error);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Mis Contactos ({contacts.length})</h2>
      {contacts.map(contact => (
        <div key={contact.id}>
          <p>{contact.nombre} - {formatAddress(contact.wallet_address)}</p>
        </div>
      ))}
      <button onClick={handleAdd}>Agregar Charlie</button>
    </div>
  );
};

export default MyComponent;
