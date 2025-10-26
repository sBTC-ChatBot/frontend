/**
 * Modal para agregar o editar contactos
 */
import { useState, useEffect } from 'react';

const ContactModal = ({ isOpen, onClose, onSave, contact = null, mode = 'create' }) => {
  const [nombre, setNombre] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (contact && mode === 'edit') {
      setNombre(contact.nombre || '');
      setWalletAddress(contact.wallet_address || '');
    } else {
      setNombre('');
      setWalletAddress('');
    }
    setErrors({});
  }, [contact, mode, isOpen]);

  const validateForm = () => {
    const newErrors = {};

    if (!nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!walletAddress.trim()) {
      newErrors.walletAddress = 'La dirección de wallet es requerida';
    } else if (!/^(SP|ST)[0-9A-Z]{38,41}$/.test(walletAddress.trim())) {
      newErrors.walletAddress = 'Dirección de wallet inválida (debe comenzar con SP o ST)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSave({
        nombre: nombre.trim(),
        wallet_address: walletAddress.trim()
      });
      handleClose();
    } catch (error) {
      console.error('Error al guardar contacto:', error);
      setErrors({ submit: 'Error al guardar el contacto. Intenta de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNombre('');
    setWalletAddress('');
    setErrors({});
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm font-mono">
      <div className="bg-licorice border-2 border-jet-600 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-rust to-transparent px-6 py-4 border-b border-jet-600">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-seasalt flex items-center gap-2">
              {mode === 'create' ? (
                <>
                  <span>➕</span>
                  <span>Nuevo Contacto</span>
                </>
              ) : (
                <>
                  <span>✏️</span>
                  <span>Editar Contacto</span>
                </>
              )}
            </h2>
            <button
              onClick={handleClose}
              className="text-seasalt hover:text-giants-orange transition-colors p-1 rounded-lg hover:bg-jet-400"
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Campo Nombre */}
          <div>
            <label className="block text-sm font-semibold text-seasalt mb-2">
              Nombre del Contacto
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Alice, Bob, Charlie"
              disabled={isLoading}
              className={`w-full px-4 py-3 bg-jet border ${
                errors.nombre ? 'border-red-500' : 'border-jet-600'
              } rounded-xl text-seasalt placeholder-jet-800 focus:outline-none focus:border-giants-orange transition-colors disabled:opacity-50`}
            />
            {errors.nombre && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <span>⚠️</span>
                <span>{errors.nombre}</span>
              </p>
            )}
          </div>

          {/* Campo Wallet Address */}
          <div>
            <label className="block text-sm font-semibold text-seasalt mb-2">
              Dirección de Wallet
            </label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value.toUpperCase())}
              placeholder="SP1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
              disabled={isLoading || mode === 'edit'}
              className={`w-full px-4 py-3 bg-jet border ${
                errors.walletAddress ? 'border-red-500' : 'border-jet-600'
              } rounded-xl text-seasalt placeholder-jet-800 focus:outline-none focus:border-giants-orange transition-colors disabled:opacity-50 font-mono text-xs`}
            />
            {errors.walletAddress && (
              <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                <span>⚠️</span>
                <span>{errors.walletAddress}</span>
              </p>
            )}
            {mode === 'edit' && (
              <p className="mt-1 text-xs text-jet-800">
                ℹ️ La dirección de wallet no puede ser modificada
              </p>
            )}
          </div>

          {/* Error general */}
          {errors.submit && (
            <div className="p-3 bg-red-900 bg-opacity-20 border border-red-500 rounded-lg">
              <p className="text-sm text-red-400 flex items-center gap-2">
                <span>❌</span>
                <span>{errors.submit}</span>
              </p>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-jet hover:bg-jet-400 text-seasalt rounded-xl transition-colors disabled:opacity-50 font-semibold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-giants-orange hover:bg-rust text-seasalt rounded-xl transition-colors disabled:opacity-50 font-semibold flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Guardando...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'create' ? '➕ Agregar' : '💾 Guardar'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
