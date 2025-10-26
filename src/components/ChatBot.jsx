/**
 * Componente de chat que permite interactuar con el contrato usando lenguaje natural
 */
import { useState, useRef, useEffect } from 'react';
import { useStacksContract } from '../hooks/useStacksContract';
import { getSTXTransfers } from '../services/chatService';
import TransactionHistory from './TransactionHistory';
import logoStack from '../assets/logo_stack.png';
import logoChatBot from '../assets/logoChatBot.png';

const ChatBot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: `¡Hola amigo! 👋 Soy tu asistente de Stacks.

Puedo ayudarte con:

 **Consultar tu balance** de STX
 **Realizar transferencias** seguras
 **Ver inversiones** 

¿En qué puedo ayudarte hoy?`,
      sender: 'bot'
    }
  ]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showContactsMenu, setShowContactsMenu] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Función para formatear mensajes del bot
  const formatBotMessage = (text) => {
    // Detectar si es una transacción completada
    if (text.includes('Transacción completada') || text.includes('transacción:')) {
      return renderTransactionMessage(text);
    }
    
    // Formatear texto normal con negritas, cursivas, etc.
    return renderFormattedText(text);
  };

  // Renderizar mensaje de transacción especial
  const renderTransactionMessage = (text) => {
    const txIdMatch = text.match(/ID de transacción:\s*([a-f0-9]+)/i);
    const explorerMatch = text.match(/(https:\/\/explorer\.hiro\.so\/txid\/[^\s]+)/i);
    
    if (txIdMatch && explorerMatch) {
      const txId = txIdMatch[1];
      const explorerUrl = explorerMatch[1];
      
      return (
        <div className="space-y-3 sm:space-y-4">
          {/* Header de éxito */}
          <div className="flex items-center gap-2 sm:gap-3 bg-green-600 bg-opacity-20 border border-green-500 rounded-lg p-2 sm:p-3">
            <span className="text-2xl sm:text-3xl md:text-4xl">✅</span>
            <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">
              Transacción Completada
            </span>
          </div>
          
          {/* ID de transacción */}
          <div className="bg-licorice bg-opacity-60 rounded-lg p-3 sm:p-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg md:text-xl">📋</span>
              <span className="text-xs sm:text-sm md:text-base font-semibold text-sandy-brown">
                ID de Transacción:
              </span>
            </div>
            <div className="bg-jet bg-opacity-70 rounded p-2 sm:p-3 border border-jet-600">
              <code className="text-[10px] sm:text-xs md:text-sm text-seasalt font-mono break-all leading-relaxed">
                {txId}
              </code>
            </div>
          </div>
          
          {/* Botón para ver en explorer */}
          <a
            href={explorerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-giants-orange to-sandy-brown hover:from-rust hover:to-giants-orange text-seasalt font-bold py-2 sm:py-3 md:py-4 px-4 sm:px-5 md:px-6 rounded-lg sm:rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-xs sm:text-sm md:text-base"
          >
            <span className="text-lg sm:text-xl md:text-2xl">🔗</span>
            <span>Ver Transacción en Explorer</span>
            <span className="text-xs sm:text-sm">↗</span>
          </a>
          
          {/* Info adicional */}
          <div className="flex items-center justify-center gap-2 text-[10px] sm:text-xs text-jet-800 italic">
            <span>💡</span>
            <span>Haz clic para ver los detalles completos</span>
          </div>
        </div>
      );
    }
    
    return renderFormattedText(text);
  };

  // Renderizar texto con formato
  const renderFormattedText = (text) => {
    // Detectar enlaces
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return (
      <div className="space-y-2">
        {parts.map((part, index) => {
          // Si es URL
          if (part.match(urlRegex)) {
            return (
              <a
                key={index}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sandy-brown hover:text-giants-orange underline font-semibold transition-colors"
              >
                <span className="text-xs sm:text-sm">🔗</span>
                <span className="text-xs sm:text-sm md:text-base">Ver enlace</span>
              </a>
            );
          }
          
          // Formatear texto normal
          return (
            <span key={index} className="block">
              {part.split('\n').map((line, lineIndex) => {
                // Detectar líneas con emojis al inicio (como listas)
                const emojiMatch = line.match(/^([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]+)\s*(.+)/u);
                
                if (emojiMatch) {
                  const emoji = emojiMatch[1];
                  const content = emojiMatch[2];
                  
                  // Detectar negritas (**texto**)
                  const boldRegex = /\*\*(.+?)\*\*/g;
                  const formattedContent = content.split(boldRegex).map((segment, i) => {
                    if (i % 2 === 1) {
                      return <strong key={i} className="font-bold text-sandy-brown">{segment}</strong>;
                    }
                    return segment;
                  });
                  
                  return (
                    <div key={lineIndex} className="flex items-start gap-2 mb-2">
                      <span className="text-base sm:text-lg md:text-xl flex-shrink-0">{emoji}</span>
                      <span className="flex-1 text-xs sm:text-sm md:text-base leading-relaxed">
                        {formattedContent}
                      </span>
                    </div>
                  );
                }
                
                // Línea normal con soporte para negritas
                const boldRegex = /\*\*(.+?)\*\*/g;
                const formattedLine = line.split(boldRegex).map((segment, i) => {
                  if (i % 2 === 1) {
                    return <strong key={i} className="font-bold text-sandy-brown">{segment}</strong>;
                  }
                  return segment;
                });
                
                return (
                  <p key={lineIndex} className="mb-1 text-xs sm:text-sm md:text-base leading-relaxed">
                    {formattedLine}
                  </p>
                );
              })}
            </span>
          );
        })}
      </div>
    );
  };
  
  const {
    userAddress,
    isConnected,
    userBalance,
    chatResponse,
    isChatLoading,
    isTransactionPending,
    pendingTransfer,
    connectWallet,
    disconnectWallet,
    sendMessage,
    confirmTransfer,
    cancelTransfer
  } = useStacksContract();

  // Mock data para contactos
  const contacts = [
    { id: 1, name: 'Alice', address: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM' },
    { id: 2, name: 'Bob', address: 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG' },
    { id: 3, name: 'Charlie', address: 'ST2JHG361ZXG51QTKY2NQCVBPPRRE2KZB1HR05NNC' }
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cargar historial de transacciones cuando el usuario se conecta
  useEffect(() => {
    const loadRecentTransactions = async () => {
      if (isConnected && userAddress) {
        setLoadingHistory(true);
        try {
          const txs = await getSTXTransfers(userAddress, 10); // Solo las últimas 10
          setRecentTransactions(txs);
        } catch (error) {
          console.error('Error cargando transacciones:', error);
          setRecentTransactions([]);
        } finally {
          setLoadingHistory(false);
        }
      } else {
        setRecentTransactions([]);
      }
    };

    loadRecentTransactions();
  }, [isConnected, userAddress]);

  useEffect(() => {
    if (chatResponse !== null) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: chatResponse,
        sender: 'bot'
      }]);
    }
  }, [chatResponse]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, {
      id: Date.now(),
      text: input,
      sender: 'user'
    }]);

    sendMessage(input);
    setInput('');
  };

  const handleShortcut = (text) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  // Función para consultar el balance usando Hiro API
  const handleBalanceCheck = async () => {
    if (!isConnected || !userAddress) {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: '🔒 Por favor conecta tu wallet primero para consultar el balance.',
        sender: 'bot'
      }]);
      return;
    }

    // Mostrar mensaje de carga
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: '💰 Consultando tu balance...',
      sender: 'bot'
    }]);

    try {
      // Consultar balance desde Hiro API
      const HIRO_API = "https://api.testnet.hiro.so"; // Cambiar a mainnet si es necesario
      const response = await fetch(`${HIRO_API}/extended/v1/address/${userAddress}/balances`);
      
      if (!response.ok) {
        throw new Error('Error al consultar el balance');
      }

      const data = await response.json();
      const balanceInMicroSTX = data.stx.balance;
      const balanceInSTX = (balanceInMicroSTX / 1_000_000).toFixed(6);

      // Mostrar el balance en el chat
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: `💰 **Tu saldo es ${balanceInSTX} STX**\n\n📊 Detalles:\n• Balance disponible: ${balanceInSTX} STX\n• Dirección: ${userAddress.substring(0, 10)}...${userAddress.substring(userAddress.length - 6)}`,
        sender: 'bot'
      }]);
    } catch (error) {
      console.error('Error al consultar balance:', error);
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: '❌ Error al consultar el balance. Por favor intenta nuevamente.',
        sender: 'bot'
      }]);
    }
  };

  const handleContactSelect = (contact) => {
    setInput(`Enviar a ${contact.name} (${contact.address})`);
    setShowContactsMenu(false);
    textareaRef.current?.focus();
  };

  return (
    <div className="flex h-screen bg-kikk-black overflow-hidden font-mono">
      {/* Sidebar - Panel lateral */}
      <div className={`sidebar-scroll ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-30 w-64 lg:w-72 h-full bg-kikk-gray-dark border-r border-kikk-gray transition-transform duration-300 overflow-y-auto`}>
        <div className="p-4">
          {/* Logo y título del sidebar */}
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-kikk-gray">
            <img src={logoStack} alt="Logo" className="w-10 h-10 rounded-full border-2 border-kikk-orange shadow-lg shadow-kikk-orange/30" />
            <div>
              <h3 className="text-kikk-white font-bold text-lg tracking-wider">sBTC ChatBot</h3>
              <p className="text-kikk-gray text-xs">Agente Blockchain en STX</p>
            </div>
          </div>

          {/* Contactos */}
          <div className="mb-6">
            <h4 className="text-kikk-white text-sm font-semibold mb-3 flex items-center gap-2 bg-kikk-orange px-3 py-2 rounded-sm uppercase tracking-widest">
              <span className="text-lg">👥</span> 
              <span>Contactos</span>
            </h4>
            <div className="space-y-2">
              {contacts.map(contact => (
                <button
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className="w-full text-left p-3 rounded-sm bg-kikk-black hover:bg-kikk-gray-dark transition-all duration-200 border border-kikk-gray hover:border-kikk-orange group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm group-hover:scale-110 transition-transform">👤</span>
                    <p className="text-kikk-white font-medium text-sm">{contact.name}</p>
                  </div>
                  <p className="text-kikk-gray text-xs font-mono truncate ml-6">{contact.address.substring(0, 20)}...</p>
                </button>
              ))}
            </div>
          </div>

          {/* Historial de Transacciones */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-kikk-white text-sm font-semibold flex items-center gap-2 bg-kikk-orange px-3 py-2 rounded-sm uppercase tracking-widest">
                <span className="text-lg">📜</span> 
                <span>Historial</span>
              </h4>
              {isConnected && userAddress && recentTransactions.length > 0 && (
                <button
                  onClick={() => setShowHistoryModal(true)}
                  className="text-kikk-orange hover:text-kikk-orange-light text-xs font-semibold transition-colors uppercase tracking-wider"
                  title="Ver historial completo"
                >
                  Ver todo →
                </button>
              )}
            </div>
            <div className="space-y-2">
              {!isConnected || !userAddress ? (
                <div className="p-4 rounded-sm bg-kikk-black border border-kikk-gray text-center">
                  <p className="text-kikk-gray text-xs uppercase tracking-wider">
                    🔒 Conecta tu wallet para ver el historial
                  </p>
                </div>
              ) : loadingHistory ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-giants-orange"></div>
                  <p className="text-jet-800 text-xs mt-2">Cargando...</p>
                </div>
              ) : recentTransactions.length === 0 ? (
                <div className="p-4 rounded-lg bg-licorice-300 border border-jet-600 text-center">
                  <p className="text-4xl mb-2">📭</p>
                  <p className="text-jet-800 text-xs">
                    No hay transacciones aún
                  </p>
                </div>
              ) : (
                recentTransactions.map((tx, index) => {
                  // Determinar el icono y color según el tipo de transacción
                  // YA NO MOSTRAMOS FALLIDAS (se filtran en el servicio)
                  const getTransactionStyle = () => {
                    switch (tx.type) {
                      case 'sent':
                        return {
                          icon: '📤',
                          label: 'Enviado',
                          color: 'text-red-400',
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
                          label: tx.displayType,
                          color: 'text-blue-400',
                          sign: '-' // Los contratos que envían STX son negativos
                        };
                      case 'deploy':
                        return {
                          icon: '🚀',
                          label: 'Deploy',
                          color: 'text-purple-400',
                          sign: ''
                        };
                      default:
                        return {
                          icon: '📋',
                          label: tx.displayType || 'Otro',
                          color: 'text-yellow-400',
                          sign: ''
                        };
                    }
                  };

                  const style = getTransactionStyle();

                  return (
                    <div
                      key={tx.txid + index}
                      className="p-3 rounded-sm border transition-colors bg-kikk-black border-kikk-gray hover:border-kikk-orange"
                    >
                      {/* Primera línea: Monto + Tipo/Ver */}
                      <div className="flex items-start justify-between mb-1">
                        {/* Monto a la izquierda */}
                        {tx.amountSTX > 0 && (
                          <span className={`text-base font-bold ${style.color}`}>
                            {style.sign}{tx.amount} STX
                          </span>
                        )}
                        {/* Para deploy sin monto, mostrar el tipo */}
                        {tx.amountSTX === 0 && (
                          <span className={`text-sm font-semibold ${style.color}`}>
                            {style.label}
                          </span>
                        )}
                        {/* Ver ↗ a la derecha */}
                        <a
                          href={tx.explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-kikk-orange hover:text-kikk-orange-light text-[10px] font-semibold whitespace-nowrap ml-2 uppercase tracking-wider"
                        >
                          Ver ↗
                        </a>
                      </div>

                      {/* Segunda línea: Fee + Tipo (si hay monto) */}
                      <div className="flex items-center justify-between mb-2">
                        {tx.fee && parseFloat(tx.fee) > 0 && (
                          <p className="text-kikk-gray text-[10px]">
                            Fee: {tx.fee} STX
                          </p>
                        )}
                        {tx.amountSTX > 0 && (
                          <span className={`text-[10px] font-semibold ${style.color}`}>
                            {style.label}
                          </span>
                        )}
                      </div>
                      
                      {/* Mostrar estado si es pendiente */}
                      {tx.status === 'pending' && (
                        <div className="mb-2 px-2 py-1 rounded text-[10px] font-semibold bg-yellow-600 bg-opacity-20 text-yellow-400">
                          ⏳ Pendiente
                        </div>
                      )}
                      
                      {/* Dirección/Contrato */}
                      {tx.type !== 'deploy' && (
                        <div className="mb-1">
                          <p className="text-kikk-gray text-[10px] font-mono truncate">
                            <span className="text-kikk-white font-semibold">
                              {tx.type === 'sent' ? 'Para: ' : tx.type === 'received' ? 'De: ' : 'Contrato: '}
                            </span>
                            {tx.type === 'sent' ? tx.recipient : tx.type === 'received' ? tx.sender : tx.recipient}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar sidebar en móvil */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-kikk-gray-dark border-b border-kikk-gray p-3 sm:p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Botón hamburguesa para móvil */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-sm hover:bg-kikk-black transition-all duration-200 border border-transparent hover:border-kikk-orange"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6 text-kikk-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <img src={logoStack} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-kikk-orange shadow-md" />
            <div>
              <h2 className="text-kikk-white font-bold text-sm sm:text-base flex items-center gap-2 uppercase tracking-wider">
                <span>sBTC ChatBot</span>
                {isConnected && <span className="text-kikk-orange text-xs">●</span>}
              </h2>
              {isConnected && (
                <p className="text-kikk-gray text-xs font-mono flex items-center gap-1">
                  <span className="text-[10px]">📬</span>
                  {userAddress ? `${userAddress.substring(0, 8)}...` : ''}
                </p>
              )}
            </div>
          </div>

          {/* Wallet Info */}
          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right bg-kikk-black px-3 py-2 rounded-sm border border-kikk-gray">
                <p className="text-kikk-orange font-bold text-sm flex items-center justify-end gap-1 uppercase tracking-wider">
                  <span className="text-xs">💰</span>
                  {userBalance} STX
                </p>
                <button 
                  onClick={disconnectWallet}
                  className="text-kikk-gray hover:text-kikk-white text-xs transition-colors uppercase tracking-wider"
                >
                  Desconectar ⚡
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={connectWallet}
              className="bg-kikk-orange hover:bg-kikk-orange-light text-kikk-black font-bold px-4 py-2 rounded-sm text-xs sm:text-sm transition-all duration-200 uppercase tracking-wider flex items-center gap-2"
            >
              <span className="hidden sm:inline">🔗</span>
              <span>Conectar Wallet</span>
            </button>
          )}
        </div>

        {/* Messages Area - Estilo KIKK */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-b from-kikk-black via-kikk-dark to-kikk-black">
          <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-2 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6 space-y-3 sm:space-y-4 md:space-y-6">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`flex gap-2 sm:gap-3 md:gap-4 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-sm flex items-center justify-center text-xs sm:text-sm md:text-base ${
                  message.sender === 'user' 
                    ? 'bg-kikk-orange text-kikk-black border-2 border-kikk-orange' 
                    : 'bg-transparent'
                }`}>
                  {message.sender === 'user' ? '👤' : <img src={logoChatBot} alt="Bot" className="w-full h-full rounded-sm object-cover" />}
                </div>
                
                {/* Message Content */}
                <div className={`flex-1 max-w-[85%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-sm ${
                    message.sender === 'user'
                      ? 'bg-kikk-gray-dark text-kikk-white font-medium border border-kikk-gray'
                      : 'bg-transparent text-kikk-white'
                  }`}>
                    {message.sender === 'bot' ? (
                      // Renderizar mensaje del bot con formato especial
                      <div className="text-left">
                        {formatBotMessage(message.text)}
                      </div>
                    ) : (
                      // Mensaje del usuario sin formato especial
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg whitespace-pre-wrap break-words leading-relaxed">
                        {message.text}
                      </p>
                    )}
                  </div>
                  {/* Timestamp opcional */}
                  <p className={`text-[10px] sm:text-xs text-kikk-gray mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isChatLoading && (
              <div className="flex gap-2 sm:gap-3 md:gap-4">
                <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-transparent flex items-center justify-center shadow-lg overflow-hidden">
                  <img src={logoChatBot} alt="Bot" className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="bg-jet px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-xl sm:rounded-2xl border border-jet-600 shadow-md">
                  <div className="flex gap-1 sm:gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-giants-orange rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-sandy-brown rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 bg-rust rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}
            
            {pendingTransfer && (
              <div className="flex justify-center px-2 sm:px-4">
                <div className="bg-gradient-to-br from-rust to-licorice border-2 border-giants-orange p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl max-w-full sm:max-w-md w-full shadow-2xl shadow-giants-orange/30">
                  <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-seasalt mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="text-xl sm:text-2xl md:text-3xl">🔔</span> 
                    <span>Confirmar Transferencia</span>
                  </h3>
                  <div className="bg-licorice bg-opacity-60 backdrop-blur-sm p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 space-y-2 sm:space-y-3 border border-rust">
                    <p className="text-xs sm:text-sm md:text-base text-seasalt font-semibold">
                      <strong>📤 Destinatario:</strong>
                    </p>
                    <p className="font-mono text-[10px] sm:text-xs md:text-sm bg-licorice bg-opacity-70 p-2 sm:p-3 rounded text-sandy-brown break-all border border-jet-600">
                      {pendingTransfer.recipient}
                    </p>
                    <p className="text-sm sm:text-base md:text-lg text-seasalt mt-2 sm:mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2">
                      <strong className="flex items-center gap-1 sm:gap-2">
                        <span className="text-base sm:text-lg">💰</span>
                        <span className="text-xs sm:text-sm md:text-base">Cantidad:</span>
                      </strong> 
                      <span className="text-sandy-brown font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                        {pendingTransfer.amount} STX
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button 
                      onClick={confirmTransfer}
                      disabled={isTransactionPending}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-jet-600 disabled:cursor-not-allowed text-seasalt font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm md:text-base transition-all shadow-lg hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center gap-1 sm:gap-2">
                        <span className="text-base sm:text-lg">✅</span>
                        <span>Confirmar</span>
                      </span>
                    </button>
                    <button 
                      onClick={cancelTransfer}
                      disabled={isTransactionPending}
                      className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-jet-600 disabled:cursor-not-allowed text-seasalt font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm md:text-base transition-all shadow-lg hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center gap-1 sm:gap-2">
                        <span className="text-base sm:text-lg">❌</span>
                        <span>Cancelar</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {isTransactionPending && (
              <div className="flex justify-center px-2 sm:px-4">
                <div className="bg-gradient-to-r from-sandy-brown to-rust border-2 border-sandy-brown text-seasalt px-3 sm:px-4 md:px-5 py-2 sm:py-3 rounded-lg shadow-lg shadow-sandy-brown/30 flex items-center gap-2 sm:gap-3 font-semibold text-xs sm:text-sm md:text-base">
                  <span className="text-base sm:text-lg md:text-xl animate-spin">⏳</span>
                  <span>Procesando transacción...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Estilo KIKK */}
        <div className="bg-kikk-gray-dark border-t border-kikk-gray p-3 sm:p-4">
          {/* Atajos rápidos */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
            <button
              onClick={handleBalanceCheck}
              className="px-4 py-2 bg-kikk-black hover:bg-kikk-gray-dark text-kikk-white rounded-sm text-xs sm:text-sm whitespace-nowrap border border-kikk-gray hover:border-kikk-orange transition-colors uppercase tracking-wider"
            >
              💰 Balance
            </button>
            
            <button
              onClick={() => handleShortcut('¿Cómo puedo hacer una transferencia?')}
              className="px-4 py-2 bg-kikk-black hover:bg-kikk-gray-dark text-kikk-white rounded-sm text-xs sm:text-sm whitespace-nowrap border border-kikk-gray hover:border-kikk-orange transition-colors uppercase tracking-wider"
            >
              💸 Enviar STX
            </button>
          </div>

          {/* Input principal */}
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            {/* Botón de contactos */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowContactsMenu(!showContactsMenu)}
                disabled={!isConnected}
                className="p-3 bg-kikk-black hover:bg-kikk-gray-dark disabled:bg-kikk-gray rounded-sm transition-colors border border-kikk-gray"
                title="Contactos"
              >
                <svg className="w-5 h-5 text-kikk-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>

              {/* Menú de contactos desplegable */}
              {showContactsMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-kikk-gray-dark rounded-sm shadow-xl border border-kikk-gray max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <p className="text-kikk-gray text-xs font-semibold mb-2 px-2 uppercase tracking-wider">Seleccionar contacto</p>
                    {contacts.map(contact => (
                      <button
                        key={contact.id}
                        type="button"
                        onClick={() => handleContactSelect(contact)}
                        className="w-full text-left p-2 rounded-sm hover:bg-kikk-black transition-colors border border-transparent hover:border-kikk-orange"
                      >
                        <p className="text-kikk-white text-sm font-medium">{contact.name}</p>
                        <p className="text-kikk-gray text-xs font-mono truncate">{contact.address}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Textarea expandible */}
            <div className="flex-1 bg-kikk-black rounded-sm border border-kikk-gray focus-within:border-kikk-orange transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                placeholder={isConnected ? "Escribe un mensaje..." : "Conecta tu wallet para comenzar"}
                disabled={!isConnected || isChatLoading}
                rows={1}
                className="w-full px-4 py-3 bg-transparent text-kikk-white placeholder-kikk-gray resize-none focus:outline-none disabled:opacity-50 text-sm sm:text-base"
                style={{ maxHeight: '120px' }}
              />
            </div>

            {/* Botón de micrófono */}
            <button
              type="button"
              disabled={!isConnected || isChatLoading}
              className="p-3 bg-kikk-black hover:bg-kikk-gray-dark disabled:bg-kikk-gray border border-kikk-gray hover:border-kikk-orange rounded-sm transition-all duration-200 disabled:opacity-50"
              title="Mensaje de voz"
            >
              <svg className="w-5 h-5 text-kikk-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            {/* Botón de enviar */}
            <button
              type="submit"
              disabled={!isConnected || isChatLoading || !input.trim()}
              className="p-3 bg-kikk-orange hover:bg-kikk-orange-light disabled:bg-kikk-gray disabled:border disabled:border-kikk-gray rounded-sm transition-all duration-200 disabled:opacity-50"
              title="Enviar mensaje"
            >
              <svg className="w-5 h-5 text-kikk-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Modal de Historial de Transacciones */}
      <TransactionHistory
        address={userAddress}
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </div>
  );
};

export default ChatBot;
