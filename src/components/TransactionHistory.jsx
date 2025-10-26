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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-mono">
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
                    {/* Primera línea: Monto + Ver ↗ */}
                    <div className="flex items-start justify-between mb-2">
                      {/* Monto a la izquierda */}
                      {tx.amountSTX > 0 && (
                        <span className={`text-base sm:text-lg font-bold ${style.color}`}>
                          {style.sign}{tx.amount} STX
                        </span>
                      )}
                      {/* Para deploy sin monto, mostrar el tipo */}
                      {tx.amountSTX === 0 && (
                        <span className={`font-semibold text-sm sm:text-base ${style.color}`}>
                          {style.label}
                        </span>
                      )}
                      {/* Ver ↗ a la derecha */}
                      <a
                        href={tx.explorerUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-giants-orange hover:text-sandy-brown text-xs sm:text-sm font-semibold whitespace-nowrap ml-2"
                      >
                        Ver ↗
                      </a>
                    </div>

                    {/* Segunda línea: Fee + Tipo (si hay monto) */}
                    <div className="flex items-center justify-between mb-3">
                      {tx.fee && parseFloat(tx.fee) > 0 && (
                        <p className="text-jet-700 text-[10px] sm:text-xs">
                          Fee: {tx.fee} STX
                        </p>
                      )}
                      {tx.amountSTX > 0 && (
                        <span className={`text-xs sm:text-sm font-semibold ${style.color}`}>
                          {style.label}
                        </span>
                      )}
                    </div>

                    {/* Estado pendiente */}
                    {tx.status === 'pending' && (
                      <div className="mb-3">
                        <span className="text-xs font-semibold bg-yellow-600 bg-opacity-20 text-yellow-400 px-2 py-1 rounded">
                          ⏳ Pendiente
                        </span>
                      </div>
                    )}

                    {/* Dirección/Contrato */}
                    {tx.type !== 'deploy' && (
                      <div className="mb-2">
                        <p className="text-seasalt font-mono text-[10px] sm:text-xs break-all">
                          <span className="text-sandy-brown font-semibold">
                            {tx.type === 'sent' ? 'Para: ' : tx.type === 'received' ? 'De: ' : 'Contrato: '}
                          </span>
                          {tx.type === 'sent' ? tx.recipient : tx.type === 'received' ? tx.sender : tx.recipient}
                        </p>
                      </div>
                    )}

                    {/* Memo si existe */}
                    {tx.memo && (
                      <div className="mt-2 bg-licorice bg-opacity-40 rounded-lg p-2">
                        <p className="text-sandy-brown text-xs font-semibold">💬 Memo:</p>
                        <p className="text-seasalt text-xs mt-1">{tx.memo}</p>
                      </div>
                    )}
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
