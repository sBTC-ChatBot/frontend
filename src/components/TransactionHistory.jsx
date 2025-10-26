import { useState, useEffect } from 'react';
import { getSTXTransfers } from '../services/chatService';

/**
 * Componente para mostrar el historial de transacciones de una wallet
 */
const TransactionHistory = ({ address, isOpen, onClose }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const txs = await getSTXTransfers(address, 50);
      setTransactions(txs);
    } catch (err) {
      setError('Error al cargar el historial de transacciones');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && address) {
      loadTransactions();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, address]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-licorice via-jet to-licorice rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden border-2 border-jet-600">
        {/* Header */}
        <div className="bg-gradient-to-r from-giants-orange to-sandy-brown p-4 sm:p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-seasalt flex items-center gap-2">
              📜 Historial de Transacciones
            </h2>
            <p className="text-xs sm:text-sm text-seasalt opacity-90 mt-1">
              {address?.substring(0, 10)}...{address?.substring(address.length - 6)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-seasalt hover:bg-rust rounded-lg p-2 transition-colors text-2xl sm:text-3xl"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-giants-orange"></div>
              <p className="text-seasalt mt-4">Cargando transacciones...</p>
            </div>
          ) : error ? (
            <div className="bg-rust bg-opacity-20 border border-rust rounded-lg p-4 text-center">
              <p className="text-rust text-lg">❌ {error}</p>
              <button
                onClick={loadTransactions}
                className="mt-4 bg-rust hover:bg-giants-orange text-seasalt px-6 py-2 rounded-lg transition-colors"
              >
                Reintentar
              </button>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-6xl mb-4">📭</p>
              <p className="text-jet-800 text-lg">No hay transacciones registradas</p>
              <p className="text-jet-800 text-sm mt-2">
                Las transacciones aparecerán aquí cuando realices operaciones
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx, index) => {
                // Determinar el estilo según el tipo de transacción
                // YA NO HAY FALLIDAS (se filtran en el servicio)
                const getTransactionStyle = () => {
                  switch (tx.type) {
                    case 'sent':
                      return {
                        icon: '📤',
                        label: 'Enviado',
                        color: 'text-rust',
                        sign: '-'
                      };
                    case 'received':
                      return {
                        icon: '📥',
                        label: 'Recibido',
                        color: 'text-green-400',
                        sign: '+'
                      };
                    case 'contract':
                      return {
                        icon: '📝',
                        label: tx.displayType || 'Llamada a Contrato',
                        color: 'text-blue-400',
                        sign: '-' // Los contratos que envían STX son negativos
                      };
                    case 'deploy':
                      return {
                        icon: '🚀',
                        label: 'Deploy de Contrato',
                        color: 'text-purple-400',
                        sign: ''
                      };
                    default:
                      return {
                        icon: '📋',
                        label: tx.displayType || 'Otra Transacción',
                        color: 'text-yellow-400',
                        sign: ''
                      };
                  }
                };

                const style = getTransactionStyle();

                return (
                  <div
                    key={tx.txid + index}
                    className="rounded-xl p-4 border transition-all duration-300 bg-jet bg-opacity-50 hover:bg-opacity-70 border-jet-600 hover:border-giants-orange"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      {/* Tipo y fecha */}
                      <div className="flex items-center gap-3">
                        <div className={`text-3xl sm:text-4xl ${style.color}`}>
                          {style.icon}
                        </div>
                        <div>
                          <p className={`font-semibold text-sm sm:text-base ${style.color}`}>
                            {style.label}
                          </p>
                          {/* Monto del contrato en línea separada */}
                          {tx.type === 'contract' && tx.amountSTX > 0 && (
                            <p className={`text-base sm:text-lg font-bold ${style.color} mt-1`}>
                              {style.sign}{tx.amount} STX
                            </p>
                          )}
                          <p className="text-jet-800 text-xs sm:text-sm mt-1">{tx.date}</p>
                          {tx.status === 'pending' && (
                            <span className="text-xs font-semibold text-yellow-400">
                              ⏳ Pendiente
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Monto (solo para transferencias normales, NO contratos) */}
                      {tx.type !== 'contract' && (
                        <div className="text-right">
                          <p className={`text-lg sm:text-xl font-bold ${style.color}`}>
                            {style.sign && style.sign}{tx.amountSTX > 0 ? tx.amount : ''} {tx.amountSTX > 0 ? 'STX' : ''}
                          </p>
                        </div>
                      )}

                      {/* Fee para contratos */}
                      {tx.type === 'contract' && tx.amountSTX > 0 && tx.fee && parseFloat(tx.fee) > 0 && (
                        <div className="text-right">
                          <p className="text-jet-800 text-xs">
                            Fee: {tx.fee} STX
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Dirección */}
                    <div className="mt-3 bg-licorice bg-opacity-60 rounded-lg p-3">
                      <p className="text-sandy-brown text-xs sm:text-sm font-semibold mb-1">
                        {tx.type === 'sent' ? '➜ Para:' : tx.type === 'received' ? '← De:' : '📝 Contrato:'}
                      </p>
                      <p className="text-seasalt font-mono text-xs break-all">
                        {tx.type === 'sent' ? tx.recipient : tx.type === 'received' ? tx.sender : tx.recipient}
                      </p>
                    </div>

                    {/* Memo si existe */}
                    {tx.memo && (
                      <div className="mt-2 bg-licorice bg-opacity-40 rounded-lg p-2">
                        <p className="text-sandy-brown text-xs font-semibold">💬 Memo:</p>
                        <p className="text-seasalt text-xs mt-1">{tx.memo}</p>
                      </div>
                    )}

                    {/* Footer con botón al explorer */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          tx.status === 'success'
                            ? 'bg-green-600 bg-opacity-20 text-green-400 border border-green-500'
                            : tx.status === 'pending'
                            ? 'bg-yellow-600 bg-opacity-20 text-yellow-400 border border-yellow-500'
                            : 'bg-red-600 bg-opacity-20 text-red-400 border border-red-500'
                        }`}>
                          {tx.status === 'success' ? '✅ Completada' : tx.status === 'pending' ? '⏳ Pendiente' : '❌ Fallida'}
                        </span>
                      </div>
                      <a
                        href={tx.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-giants-orange hover:text-sandy-brown text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors"
                      >
                        Ver detalles ↗
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && transactions.length > 0 && (
          <div className="bg-jet bg-opacity-50 p-4 border-t border-jet-600 flex items-center justify-between">
            <p className="text-jet-800 text-xs sm:text-sm">
              Total: {transactions.length} transacciones
            </p>
            <button
              onClick={loadTransactions}
              className="text-giants-orange hover:text-sandy-brown text-xs sm:text-sm font-semibold flex items-center gap-1 transition-colors"
            >
              🔄 Actualizar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
