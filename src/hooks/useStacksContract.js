/**
 * Custom Hook para la conexión de wallet, chatbot y contrato inteligente
 */

import { useState, useEffect } from 'react';
import { connect, showContractCall } from '@stacks/connect';
import { 
  PostConditionMode,
  principalCV,
  uintCV
} from '@stacks/transactions';
import {
  NETWORK,
  CONTRACT_ADDRESS,
  CONTRACT_NAME,
  CONTRACT_FUNCTIONS,
} from '../config/contract';
import { sendChatMessage, getCounterValue, prepareTransfer, getWalletBalance, checkTransaction } from '../services/chatService';

/**
 * Hook para conectar la wallet, chatbot y contrato inteligente
 */
export const useStacksContract = () => {
  // Estados de la wallet
  const [userAddress, setUserAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [userBalance, setUserBalance] = useState(null);
  
  // Estados del contador
  const [count, setCount] = useState(null);
  const [isLoadingCount, setIsLoadingCount] = useState(false);
  
  // Estados del chatbot
  const [chatResponse, setChatResponse] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  
  // Estados de transacciones
  const [isTransactionPending, setIsTransactionPending] = useState(false);
  const [transactionId, setTransactionId] = useState(null);
  
  // Estado de confirmación de transferencia
  const [pendingTransfer, setPendingTransfer] = useState(null);
  
  /**
   * Obtiene el balance del usuario
   */
  const fetchUserBalance = async (address) => {
    try {
      const response = await fetch(`${NETWORK.coreApiUrl}/v2/accounts/${address}?proof=0`);
      const data = await response.json();
      const balance = (parseInt(data.balance) / 1000000).toFixed(6);
      setUserBalance(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  /**
   * Conecta la wallet del usuario
   */
  const connectWallet = async () => {
    try {
      const result = await connect();
      if (result && result.addresses) {
        const stxAddress = result.addresses.find((addr) => addr.symbol === 'STX' || addr.address.startsWith('S'));
        if (stxAddress) {
          setUserAddress(stxAddress.address);
          setIsConnected(true);
          fetchUserBalance(stxAddress.address);
          setChatResponse('✅ Wallet conectada exitosamente! Ahora puedes interactuar con el chatbot.');
        }
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setChatResponse('❌ Error al conectar la wallet. Asegúrate de tener una wallet de Stacks instalada.');
    }
  };

  /**
   * Desconecta la wallet del usuario
   */
  const disconnectWallet = () => {
    setUserAddress(null);
    setIsConnected(false);
    setUserBalance(null);
  };

  /**
   * Obtiene el valor actual del contador
   */
  const getCount = async () => {
    setIsLoadingCount(true);
    try {
      const value = await getCounterValue();
      setCount(value);
      setChatResponse(`El contador actual es: ${value}`);
    } catch (error) {
      console.error('Error al obtener el contador:', error);
      setChatResponse('Error al obtener el valor del contador');
    } finally {
      setIsLoadingCount(false);
    }
  };

  /**
   * Incrementa el contador (requiere transacción)
   */
  const incrementCounter = async () => {
    if (!isConnected || !userAddress) {
      setChatResponse('Debes conectar tu wallet primero');
      return;
    }

    setIsTransactionPending(true);
    setChatResponse('Debes aprobar la transacción desde tu wallet...');

    try {
      showContractCall({
        contractAddress: CONTRACT_ADDRESS,
        contractName: CONTRACT_NAME,
        functionName: CONTRACT_FUNCTIONS.INCREMENT,
        functionArgs: [],
        network: 'testnet',
        postConditionMode: PostConditionMode.Allow,
        postConditions: [],
        onFinish: (data) => {
          console.log('Transaction submitted:', data.txId);
          setTransactionId(data.txId);
          setIsTransactionPending(false);
          setChatResponse('¡Transacción enviada! El contador se actualizará pronto.');
          
          setTimeout(() => {
            getCount();
          }, 5000);
        },
        onCancel: () => {
          console.log('Transaction cancelled');
          setIsTransactionPending(false);
          setChatResponse('Transacción cancelada por el usuario');
        },
      });
    } catch (error) {
      console.error('Error calling contract:', error);
      setChatResponse(`Error al ejecutar la transacción: ${error.message || 'Error desconocido'}`);
      setIsTransactionPending(false);
    }
  };

  /**
   * Envía un mensaje al chatbot y procesa la acción recomendada
   */
  const sendMessage = async (message) => {
    setIsChatLoading(true);
    setChatResponse(null);
    
    try {
      // ✅ Enviar el mensaje CON la wallet del usuario conectado
      const response = await sendChatMessage(message, userAddress);
      
      switch (response.action) {
        case 'read':
          await getCount();
          break;
        case 'increment':
          await incrementCounter();
          break;
        case 'transfer':
          if (response.recipient && response.amount) {
            // Mostrar información adicional si viene de un contacto
            const recipientInfo = response.recipient_name 
              ? `${response.recipient_name} (${response.recipient})` 
              : response.recipient;
            
            setPendingTransfer({
              recipient: response.recipient,
              amount: response.amount,
              message: `¿Deseas transferir ${response.amount} STX a ${recipientInfo}?`
            });
            setChatResponse(`✋ Confirma la transferencia de ${response.amount} STX a ${recipientInfo}`);
          } else {
            setChatResponse('⚠️ No pude identificar el destinatario o la cantidad. Por favor, especifica la dirección y el monto.');
          }
          break;
        case 'balance':
          if (response.address) {
            try {
              const balanceData = await getWalletBalance(response.address);
              setChatResponse(balanceData.message);
            } catch (error) {
              setChatResponse('Error al consultar el balance');
            }
          } else {
            setChatResponse('⚠️ Por favor, especifica una dirección válida para consultar el balance.');
          }
          break;
        default:
          setChatResponse(response.message);
      }
    } catch (error) {
      console.error('Error en el chatbot:', error);
      setChatResponse('Error al procesar tu mensaje');
    } finally {
      setIsChatLoading(false);
    }
  };

  /**
   * Confirma y ejecuta la transferencia pendiente
   */
  const confirmTransfer = async () => {
    if (!pendingTransfer || !userAddress || !isConnected) {
      setChatResponse('⚠️ Debes conectar tu wallet primero');
      return;
    }

    setIsTransactionPending(true);
    setChatResponse('⏳ Preparando transferencia...');

    try {
      const transferData = await prepareTransfer(
        userAddress,
        pendingTransfer.recipient,
        pendingTransfer.amount
      );

      const amountInMicroSTX = Math.floor(pendingTransfer.amount * 1000000);

      showContractCall({
        contractAddress: transferData.contract_address,
        contractName: transferData.contract_name,
        functionName: transferData.function_name,
        functionArgs: [
          principalCV(pendingTransfer.recipient),
          uintCV(amountInMicroSTX)
        ],
        network: 'testnet',
        postConditionMode: PostConditionMode.Allow,
        postConditions: [],
        onFinish: async (data) => {
          console.log('Transfer transaction submitted:', data.txId);
          setTransactionId(data.txId);
          setIsTransactionPending(false);
          setPendingTransfer(null);
          
          try {
            const txStatus = await checkTransaction(data.txId);
            setChatResponse(
              `✅ ${txStatus.message}\n\n` +
              `📋 ID de transacción: ${data.txId}\n\n` +
              `🔗 Ver en explorer: ${txStatus.explorer_url}`
            );
          } catch (error) {
            setChatResponse(
              `✅ Transferencia enviada exitosamente!\n\n` +
              `📋 ID de transacción: ${data.txId}\n\n` +
              `🔗 Ver en explorer: https://explorer.hiro.so/txid/${data.txId}?chain=testnet`
            );
          }
          
          setTimeout(() => {
            if (userAddress) {
              fetchUserBalance(userAddress);
            }
          }, 5000);
        },
        onCancel: () => {
          console.log('Transaction cancelled');
          setIsTransactionPending(false);
          setPendingTransfer(null);
          setChatResponse('❌ Transferencia cancelada por el usuario');
        },
      });
    } catch (error) {
      console.error('Error transferring STX:', error);
      setChatResponse(`❌ Error al realizar la transferencia: ${error.message || 'Error desconocido'}`);
      setIsTransactionPending(false);
      setPendingTransfer(null);
    }
  };

  /**
   * Cancela la transferencia pendiente
   */
  const cancelTransfer = () => {
    setPendingTransfer(null);
    setChatResponse('❌ Transferencia cancelada');
  };

  return {
    userAddress,
    isConnected,
    userBalance,
    count,
    isLoadingCount,
    chatResponse,
    isChatLoading,
    pendingTransfer,
    isTransactionPending,
    transactionId,
    connectWallet,
    disconnectWallet,
    incrementCounter,
    getCount,
    sendMessage,
    confirmTransfer,
    cancelTransfer,
  };
};
