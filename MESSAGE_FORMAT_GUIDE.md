# 📝 Guía de Formato de Mensajes del Chatbot

## 🎨 Características del Sistema de Renderizado

El chatbot ahora soporta **mensajes enriquecidos** con formato especial para mejorar la experiencia del usuario.

---

## ✅ Mensajes de Transacción Completada

Cuando el backend responda con una transacción completada, use este formato:

```
✅ ✅ Transacción completada correctamente

📋 ID de transacción: da9d5f17009f59782e36f72e3105b43729a3267810b4fb756bfaf6958c728a0c

🔗 Ver en explorer: https://explorer.hiro.so/txid/da9d5f17009f59782e36f72e3105b43729a3267810b4fb756bfaf6958c728a0c?chain=testnet
```

### Resultado Visual:
- ✅ Banner verde con "Transacción Completada"
- 📋 ID de transacción en caja con código monoespaciado
- 🔗 Botón grande y atractivo con gradiente para abrir el explorer
- 💡 Texto de ayuda adicional

---

## 📝 Formato de Texto Enriquecido

### 1️⃣ **Negritas**

Use `**texto**` para resaltar información importante:

```
Tu balance actual es de **1000 STX**
```

**Resultado:** "Tu balance actual es de **1000 STX**" (en color sandy-brown)

---

### 2️⃣ **Enlaces**

Los enlaces se detectan automáticamente y se convierten en botones clicables:

```
Puedes ver más información en https://docs.stacks.co
```

**Resultado:** Link clicable con ícono 🔗

---

### 3️⃣ **Listas con Emojis**

Comience líneas con emojis para crear listas visuales:

```
💰 Balance disponible: 500 STX
📤 Transacciones enviadas: 12
📥 Transacciones recibidas: 8
🎯 Total en stake: 100 STX
```

**Resultado:** Cada línea se renderiza con emoji destacado y texto alineado

---

### 4️⃣ **Combinaciones**

Puede combinar emojis, negritas y enlaces:

```
💰 Tu balance actual es de **1000 STX**

Últimas transacciones:
📤 **Enviado** a Alice: 50 STX
📥 **Recibido** de Bob: 25 STX

🔗 Ver historial completo: https://explorer.hiro.so/address/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM?chain=testnet
```

---

## 🎯 Ejemplos Recomendados

### Balance Query
```
💰 **Balance de tu Wallet**

Balance disponible: **1,250.50 STX**
Balance bloqueado: **100 STX**
Total: **1,350.50 STX**

💡 Puedes enviar hasta 1,250.50 STX
```

### Historial de Transacciones
```
📜 **Últimas Transacciones**

📤 **Enviado** - 50 STX a Alice
   🕐 Hace 2 horas
   
📥 **Recibido** - 100 STX de Bob
   🕐 Hace 1 día
   
📤 **Enviado** - 25 STX a Charlie
   🕐 Hace 3 días

🔗 Ver historial completo: https://explorer.hiro.so
```

### Error en Transacción
```
❌ **No se pudo completar la transacción**

⚠️ **Motivo:** Balance insuficiente

Tu balance: **50 STX**
Monto solicitado: **100 STX**
Faltan: **50 STX**

💡 Por favor verifica tu balance e intenta nuevamente
```

### Confirmación de Envío
```
⏳ **Procesando tu transferencia...**

📤 Destinatario: Alice (ST1PQHQKV...)
💰 Monto: **100 STX**
⚡ Fee estimado: **0.5 STX**

🔔 Te notificaremos cuando se complete
```

---

## 🎨 Emojis Recomendados

| Categoría | Emojis Sugeridos |
|-----------|------------------|
| **Moneda/Balance** | 💰 💵 💸 🪙 |
| **Transacciones** | 📤 📥 💸 🔄 ↔️ |
| **Estados** | ✅ ❌ ⏳ ⚠️ 🔔 |
| **Información** | 📋 📜 📊 📈 📉 |
| **Enlaces/Explorar** | 🔗 🔍 👁️ 🌐 |
| **Tiempo** | 🕐 ⏰ 📅 ⏱️ |
| **Usuarios** | 👤 👥 🏦 💼 |
| **Acciones** | ⚡ 🎯 🚀 💡 |

---

## 📱 Responsividad

Todos los formatos son **completamente responsivos**:

- **Móvil (< 640px):** Texto pequeño, elementos compactos
- **Tablet (640-1024px):** Tamaño medio
- **Desktop (> 1024px):** Texto grande, espaciado amplio

---

## 🚀 Tips para el Backend

1. **Use emojis al inicio de líneas** para mejor organización visual
2. **Destaque cifras importantes** con `**negritas**`
3. **Incluya enlaces** cuando sea relevante
4. **Separe secciones** con líneas en blanco
5. **Para transacciones:** Siempre incluya "ID de transacción:" y la URL del explorer

---

## ✨ Ejemplo Completo: Respuesta de Transferencia

```
✅ ✅ Transacción completada correctamente

📋 ID de transacción: da9d5f17009f59782e36f72e3105b43729a3267810b4fb756bfaf6958c728a0c

🔗 Ver en explorer: https://explorer.hiro.so/txid/da9d5f17009f59782e36f72e3105b43729a3267810b4fb756bfaf6958c728a0c?chain=testnet
```

Este mensaje se renderizará como:
- 🎯 Banner verde de éxito
- 📦 Caja con ID de transacción (código)
- 🔘 Botón gradiente llamativo para el explorer
- 💬 Texto de ayuda

---

## 📝 Notas Finales

- El sistema **detecta automáticamente** transacciones completadas
- Los **enlaces se vuelven clicables** automáticamente
- Las **negritas** se destacan en color sandy-brown
- Los **emojis** se alinean perfectamente con el texto
- Todo es **responsive** y se adapta al tamaño de pantalla

¡Disfruta del nuevo sistema de mensajes enriquecidos! 🎉
