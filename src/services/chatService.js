/**
 * Servicio para comunicarse con el backend Flask para el chatbot y transferencias
 */

// URL base del backend
const API_BASE_URL = "https://clarity-backend-duun.onrender.com";

/**
 * Envía un mensaje al chatbot y recibe una acción recomendada
 * @param {string} message - El mensaje del usuario para el chatbot
 */
export const sendChatMessage = async (message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al enviar mensaje al chatbot:', error);
    return {
      action: 'none',
      message: 'Lo siento, ha ocurrido un error al procesar tu mensaje.'
    };
  }
};

/**
 * Obtiene el valor actual del contador desde el backend
 */
export const getCounterValue = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-count`);
    
    if (!response.ok) {
      throw new Error('Error al obtener el contador');
    }

    const data = await response.json();
    return Math.floor(Number(data.count));
  } catch (error) {
    console.error('Error al obtener el contador:', error);
    throw error;
  }
};

/**
 * Consulta el balance de una wallet de Stacks
 * @param {string} address - Dirección de la wallet
 */
export const getWalletBalance = async (address) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get-balance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ address }),
    });

    if (!response.ok) {
      throw new Error('Error al obtener el balance');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener el balance:', error);
    throw error;
  }
};

/**
 * Prepara los datos para una transferencia de STX
 * @param {string} sender - Dirección del remitente
 * @param {string} recipient - Dirección del destinatario
 * @param {number} amount - Cantidad de STX a transferir
 */
export const prepareTransfer = async (sender, recipient, amount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/prepare-transfer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sender, recipient, amount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al preparar la transferencia');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al preparar la transferencia:', error);
    throw error;
  }
};

/**
 * Verifica el estado de una transacción
 * @param {string} txid - ID de la transacción
 */
export const checkTransaction = async (txid) => {
  try {
    const response = await fetch(`${API_BASE_URL}/check-transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ txid }),
    });

    if (!response.ok) {
      throw new Error('Error al verificar la transacción');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al verificar la transacción:', error);
    throw error;
  }
};
