# 🧪 Cómo Probar el Nuevo Sistema de Formato

## 🎯 Prueba Rápida de Transacción

Para probar el formato especial de transacciones, puedes simular una respuesta del chatbot escribiendo en la consola del navegador:

```javascript
// Abre la consola del navegador (F12) y pega esto:

// Simular mensaje de transacción completada
const testMessage = {
  id: Date.now(),
  text: `✅ ✅ Transacción completada correctamente

📋 ID de transacción: da9d5f17009f59782e36f72e3105b43729a3267810b4fb756bfaf6958c728a0c

🔗 Ver en explorer: https://explorer.hiro.so/txid/da9d5f17009f59782e36f72e3105b43729a3267810b4fb756bfaf6958c728a0c?chain=testnet`,
  sender: 'bot'
};

// Nota: Necesitarás acceder al estado de React para agregarlo
```

## 📱 Características Implementadas

### ✅ Mensajes de Transacción
- **Banner verde** de confirmación
- **ID en código** monoespaciado con fondo oscuro
- **Botón gradiente** para abrir el explorer
- **Totalmente responsive** (móvil → desktop)

### 📝 Formato de Texto
- **Negritas:** `**texto**` → resaltado en sandy-brown
- **Enlaces:** URLs automáticamente clicables con ícono 🔗
- **Listas con emojis:** Detecta emojis al inicio de línea

### 🎨 Estilos Responsivos
- **Móvil (< 640px):**
  - Texto: 10-12px
  - Emojis: 16-20px
  - Botones: padding reducido
  
- **Tablet (640-1024px):**
  - Texto: 14-16px
  - Emojis: 20-24px
  - Botones: padding medio
  
- **Desktop (> 1024px):**
  - Texto: 16-18px
  - Emojis: 24-32px
  - Botones: padding amplio

## 🔍 Detalles de Implementación

### Detección de Transacción
El sistema detecta automáticamente si el mensaje incluye:
- "Transacción completada" O
- "ID de transacción:"
- URL de explorer: `https://explorer.hiro.so/txid/`

### Renderizado Especial
Si se detecta una transacción, se renderiza con:
1. **Header de éxito:** Banner verde con ✅
2. **ID Section:** Caja oscura con código monoespaciado
3. **Link Section:** Botón gradiente giants-orange → sandy-brown
4. **Helper text:** Información adicional con icono 💡

### Formato de Texto Normal
Para mensajes normales:
- Detecta URLs y las convierte en enlaces clicables
- Procesa `**negritas**` 
- Reconoce emojis al inicio de línea para listas
- Divide por saltos de línea para mejor legibilidad

## 📋 Ejemplos para Copiar y Probar

### Ejemplo 1: Mensaje con Negritas y Emojis
```
💰 Tu balance actual es de **1,250.50 STX**

Puedes realizar las siguientes operaciones:
📤 **Enviar STX** a otras wallets
📥 **Recibir STX** compartiendo tu dirección
🔍 **Consultar historial** de transacciones

¿En qué puedo ayudarte?
```

### Ejemplo 2: Mensaje con Enlaces
```
🔍 He encontrado información sobre tu wallet

📊 Estadísticas completas disponibles en:
https://explorer.hiro.so/address/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM?chain=testnet

💡 Puedes hacer clic en el enlace para ver más detalles
```

### Ejemplo 3: Lista de Transacciones
```
📜 **Últimas 3 transacciones:**

📤 Enviado **50 STX** a Alice
   🕐 Hace 2 horas
   
📥 Recibido **100 STX** de Bob
   🕐 Hace 1 día
   
📤 Enviado **25 STX** a Charlie
   🕐 Hace 3 días
```

### Ejemplo 4: Transacción Completada (Formato Completo)
```
✅ ✅ Transacción completada correctamente

📋 ID de transacción: abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890abcdef12

🔗 Ver en explorer: https://explorer.hiro.so/txid/abc123def456ghi789jkl012mno345pqr678stu901vwx234yz567890abcdef12?chain=testnet
```

## 🎨 Paleta de Colores Usada

- **seasalt** (#fafafa): Texto principal
- **sandy-brown** (#fca045): Negritas y destacados
- **giants-orange** (#f96230): Botones y acentos principales
- **rust** (#b94722): Hover states
- **jet** (#33302f): Fondos de mensajes
- **licorice** (#24120d): Fondos oscuros
- **green-500/600**: Banners de éxito

## 🚀 Cómo se Ve en Acción

### Vista Móvil (< 640px)
- Mensajes ocupan ~85% del ancho
- Botones en columna (stack vertical)
- Texto compacto pero legible
- Emojis proporcionalmente escalados

### Vista Desktop (> 1024px)
- Mensajes ocupan ~70% del ancho
- Botones en fila (horizontal)
- Texto amplio y espaciado
- Emojis grandes y visibles

## 💡 Recomendaciones para el Backend

Para aprovechar al máximo el sistema:

1. **Transacciones:** Siempre use el formato exacto con "ID de transacción:" y URL
2. **Destacar cifras:** Use `**negritas**` para montos y números importantes
3. **Organizar información:** Use emojis al inicio de líneas
4. **Incluir enlaces:** URLs se vuelven automáticamente clicables
5. **Separar secciones:** Use líneas en blanco para mejor estructura

## 🎯 Testing Checklist

- [ ] Mensaje de transacción se renderiza con banner verde
- [ ] ID de transacción aparece en caja con código
- [ ] Botón de explorer es clicable y abre en nueva pestaña
- [ ] Negritas (`**texto**`) se muestran en sandy-brown
- [ ] URLs se convierten en enlaces clicables
- [ ] Emojis al inicio de línea crean listas visuales
- [ ] Todo es responsive en móvil, tablet y desktop
- [ ] Mensajes del usuario siguen mostrándose normales
- [ ] Scroll automático al último mensaje

## 🔧 Solución de Problemas

### El formato no aparece
- Verifica que el mensaje sea del `sender: 'bot'`
- Confirma que el texto incluye los marcadores correctos

### El enlace no es clicable
- Asegúrate de que la URL comience con `http://` o `https://`
- Verifica que no haya espacios en la URL

### Las negritas no se ven
- Usa exactamente `**texto**` sin espacios adicionales
- Asegúrate de cerrar las negritas

¡Todo listo para mensajes hermosos y profesionales! 🎉
