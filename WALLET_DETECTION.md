# 🔐 Detección Automática de Wallets - sBTC ChatBot

## Implementación Actualizada

He mejorado la función de conexión de wallet para que **detecte automáticamente** qué wallet tiene instalada el usuario.

## 🎯 Cómo Funciona

### Función `showConnect` de @stacks/connect

La función `showConnect` automáticamente:

1. **Detecta wallets instaladas**: Busca Hiro Wallet, Xverse, y otras wallets compatibles con Stacks
2. **Muestra un modal**: Si hay múltiples wallets, muestra un diálogo de selección
3. **Conexión directa**: Si solo hay una wallet, se conecta directamente
4. **Manejo de errores**: Si no hay wallets, muestra un mensaje de error claro

### Wallets Soportadas

- ✅ **Hiro Wallet** (Extensión de navegador)
- ✅ **Xverse** (Extensión y móvil)
- ✅ **Leather** (Antes Hiro Web Wallet)
- ✅ Cualquier wallet compatible con Stacks Connect

## 📋 Flujo de Conexión

```
Usuario click "Conectar Wallet"
    ↓
showConnect() detecta wallets disponibles
    ↓
┌─────────────────────────────┐
│ ¿Qué wallets hay instaladas?│
└─────────────────────────────┘
    ↓
┌──────────────┬──────────────┬──────────────┐
│  Ninguna     │   Una sola   │   Múltiples  │
└──────────────┴──────────────┴──────────────┘
       ↓              ↓              ↓
   Mensaje      Conexión       Modal de
   de error     automática     selección
       ↓              ↓              ↓
   Usuario      Wallet          Usuario
   instala      conectada       elige
   wallet           ↓              ↓
                Extrae         Wallet
                dirección      conectada
                    ↓              ↓
                Balance        Balance
                obtenido       obtenido
```

## 💡 Características Implementadas

### 1. Detección Automática
```javascript
showConnect({
  appDetails: {
    name: 'sBTC ChatBot',
    icon: window.location.origin + '/vite.svg',
  },
  // ... detecta wallets automáticamente
})
```

### 2. Soporte Multi-Red
```javascript
const address = userData.profile.stxAddress.testnet || 
                userData.profile.stxAddress.mainnet;
```
- Prioriza **testnet** (para desarrollo)
- Fallback a **mainnet** si es necesario

### 3. Feedback al Usuario
- ✅ **Conexión exitosa**: Mensaje de confirmación
- ❌ **Cancelación**: Mensaje cuando el usuario cancela
- ⚠️ **Sin wallet**: Error claro si no hay wallets instaladas

### 4. Obtención Automática de Balance
```javascript
if (address) {
  setUserAddress(address);
  setIsConnected(true);
  fetchUserBalance(address); // ← Balance automático
}
```

## 🔧 Mejoras Implementadas

### Antes ❌
```javascript
const connectWallet = async () => {
  const result = await connect();
  // Lógica compleja y propensa a errores
}
```

### Ahora ✅
```javascript
const connectWallet = () => {
  showConnect({
    // Detección automática
    // Modal integrado
    // Manejo de errores
  });
}
```

## 📱 Experiencia de Usuario

### Si tiene Hiro Wallet instalado:
1. Click "Conectar Wallet"
2. Se abre Hiro Wallet automáticamente
3. Usuario aprueba la conexión
4. Wallet conectada ✅

### Si tiene múltiples wallets:
1. Click "Conectar Wallet"
2. Modal muestra opciones disponibles
3. Usuario selecciona su preferida
4. Wallet conectada ✅

### Si NO tiene wallets:
1. Click "Conectar Wallet"
2. Error: "No wallet detected"
3. Mensaje guía al usuario a instalar una

## 🎨 Integración con la UI

El componente `ChatBot.jsx` muestra:

```jsx
{isConnected ? (
  <div>
    <span>📬 {userAddress.substring(0, 6)}...</span>
    <span>💰 {userBalance} STX</span>
    <button onClick={disconnectWallet}>Desconectar</button>
  </div>
) : (
  <button onClick={connectWallet}>Conectar Wallet</button>
)}
```

## 🔒 Seguridad

- ✅ No se almacenan claves privadas
- ✅ Usuario mantiene control total
- ✅ Conexión a través de extensiones verificadas
- ✅ Cada transacción requiere aprobación explícita

## 📚 Referencias

- [Stacks Connect Docs](https://docs.stacks.co/build-apps/guides/transaction-signing)
- [Hiro Wallet](https://wallet.hiro.so/)
- [Xverse Wallet](https://www.xverse.app/)

---

**Actualizado**: Octubre 24, 2025
**Estado**: ✅ Implementado y Funcional
