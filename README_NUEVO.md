# sBTC ChatBot 🚀

Aplicación de chatbot inteligente para interactuar con contratos Clarity en la blockchain de Stacks usando lenguaje natural.

## 🎨 Paleta de Colores

Este proyecto utiliza una paleta de colores personalizada:

- **Silver**: `#a6a9ab` - Grises sutiles
- **Outer Space**: `#46484b` - Fondo oscuro elegante  
- **Carrot Orange**: `#f1972c` - Color de acento vibrante
- **Black**: `#090808` - Negro profundo
- **Seasalt**: `#f8f7f8` - Blanco suave

## ✨ Características

- 💬 **Chat con Lenguaje Natural**: Interactúa con contratos Clarity usando conversación normal
- 💰 **Transferencias STX**: Envía Stacks tokens de forma segura con confirmación
- 🔍 **Consultas de Balance**: Verifica balances de cualquier wallet
- 📊 **Lectura de Contratos**: Consulta valores de contratos inteligentes
- 🔐 **Seguro**: Confirmación en cada transacción

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 16+
- npm o yarn
- Una wallet de Stacks (Hiro Wallet, Xverse, etc.)

### Instalación

```bash
# Clonar el repositorio
cd clarity-chatbot

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Dependencias Principales

- **React**: Framework UI
- **Vite**: Build tool
- **Tailwind CSS**: Estilos
- **@stacks/connect**: Conexión con wallet
- **@stacks/transactions**: Transacciones blockchain
- **@stacks/network**: Conexión a red Stacks

## 🏗️ Estructura del Proyecto

```
clarity-chatbot/
├── src/
│   ├── components/
│   │   └── ChatBot.jsx         # Componente principal del chat
│   ├── pages/
│   │   └── LandingPage.jsx     # Página de inicio
│   ├── hooks/
│   │   └── useStacksContract.js # Hook personalizado para Stacks
│   ├── services/
│   │   └── chatService.js      # Servicio de API backend
│   ├── config/
│   │   └── contract.js         # Configuración de contratos
│   ├── App.jsx                 # Componente raíz
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── tailwind.config.cjs        # Configuración Tailwind
├── postcss.config.cjs         # Configuración PostCSS
└── package.json
```

## 💡 Uso

1. **Conecta tu Wallet**: Haz clic en "Conectar Wallet" y selecciona tu wallet de Stacks
2. **Inicia una Conversación**: Escribe en lenguaje natural, por ejemplo:
   - "¿Cuál es el valor del contador?"
   - "Incrementa el contador"
   - "Envía 10 STX a ST1P..."
   - "¿Cuál es mi balance?"
3. **Confirma Transacciones**: Revisa y aprueba las transacciones en tu wallet

## 🔧 Configuración

### Backend API

El backend está configurado en `src/services/chatService.js`:

```javascript
const API_BASE_URL = "https://clarity-backend-duun.onrender.com";
```

### Contrato

Configura el contrato en `src/config/contract.js`:

```javascript
export const CONTRACT_ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
export const CONTRACT_NAME = 'counter';
```

## 🌐 Despliegue

### Build de Producción

```bash
npm run build
```

Los archivos optimizados estarán en `dist/`

### Deploy en Vercel/Netlify

1. Conecta tu repositorio
2. Configura el comando de build: `npm run build`
3. Directorio de publicación: `dist`

## 🛠️ Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run lint` - Linting con ESLint

## 📝 Variables de Entorno

Crea un archivo `.env` si necesitas configurar:

```env
VITE_API_URL=https://tu-backend.com
VITE_NETWORK=testnet
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

## 🙏 Agradecimientos

- Stacks Foundation
- Hiro Systems
- Comunidad de Clarity

---

Desarrollado con ❤️ para el ecosistema de Stacks
