/**
 * Configuración del contrato inteligente de Stacks
 */

// Red de Stacks (Testnet)
export const NETWORK = {
  coreApiUrl: 'https://api.testnet.hiro.so',
  chainId: 2147483648 // Testnet chain ID
};

// Configuración del contrato contador
export const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
export const CONTRACT_NAME = 'counter';

// Funciones del contrato
export const CONTRACT_FUNCTIONS = {
  INCREMENT: 'increment',
  GET_COUNTER: 'get-counter'
};
