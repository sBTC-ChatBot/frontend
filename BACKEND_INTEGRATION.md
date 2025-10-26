# 📡 Integración Backend Flask - Sistema de Contactos

## 🎯 Objetivo

El backend de Flask debe poder resolver nombres de contactos a direcciones de wallet cuando el usuario dice:
- "Enviar 10 STX a Omar"
- "Transferir 5 STX a Alice"
- "Mandar 2 STX a Bob"

En lugar de que el usuario tenga que decir la dirección completa:
- ~~"Enviar 10 STX a ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"~~ ❌

## 🔧 Endpoints Necesarios en Flask

### 1. Endpoint para Resolver Contacto a Wallet Address

```python
# Agregar en tu backend Flask (clarity-backend)
from flask import Flask, request, jsonify
from supabase import create_client, Client
import os

# Configuración de Supabase
SUPABASE_URL = "https://xvdjwlieclutxzdmhdxg.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2ZGp3bGllY2x1dHh6ZG1oZHhnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MDA2MzYsImV4cCI6MjA3NzA3NjYzNn0.CfExwBLYRJJmPhU1PNZjnPsohYcmUBLhmpRJbIVuUfc"

# Cliente de Supabase
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ============================================
# ENDPOINT: Resolver nombre de contacto
# ============================================
@app.route('/api/contacts/resolve', methods=['POST'])
def resolve_contact():
    """
    Resuelve un nombre de contacto a una dirección de wallet.
    
    Request:
    {
        "user_wallet": "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
        "contact_name": "Omar"
    }
    
    Response:
    {
        "success": true,
        "contact_name": "Omar",
        "wallet_address": "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
        "contact_id": "uuid-here"
    }
    """
    try:
        data = request.get_json()
        user_wallet = data.get('user_wallet')
        contact_name = data.get('contact_name')
        
        if not user_wallet or not contact_name:
            return jsonify({
                'success': False,
                'error': 'user_wallet y contact_name son requeridos'
            }), 400
        
        # 1. Obtener el user_id del usuario
        user_response = supabase.table('users').select('id').eq('wallet_address', user_wallet).single().execute()
        
        if not user_response.data:
            return jsonify({
                'success': False,
                'error': 'Usuario no encontrado'
            }), 404
        
        user_id = user_response.data['id']
        
        # 2. Buscar el contacto por nombre (case-insensitive)
        contact_response = supabase.table('contacts')\
            .select('*')\
            .eq('user_id', user_id)\
            .ilike('nombre', contact_name)\
            .execute()
        
        if not contact_response.data or len(contact_response.data) == 0:
            return jsonify({
                'success': False,
                'error': f'Contacto "{contact_name}" no encontrado'
            }), 404
        
        contact = contact_response.data[0]
        
        return jsonify({
            'success': True,
            'contact_name': contact['nombre'],
            'wallet_address': contact['wallet_address'],
            'contact_id': contact['id']
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================
# ENDPOINT: Obtener todos los contactos
# ============================================
@app.route('/api/contacts/list', methods=['POST'])
def list_contacts():
    """
    Obtiene la lista de contactos de un usuario.
    
    Request:
    {
        "user_wallet": "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
    }
    
    Response:
    {
        "success": true,
        "contacts": [
            {
                "id": "uuid",
                "nombre": "Omar",
                "wallet_address": "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG"
            },
            ...
        ]
    }
    """
    try:
        data = request.get_json()
        user_wallet = data.get('user_wallet')
        
        if not user_wallet:
            return jsonify({
                'success': False,
                'error': 'user_wallet es requerido'
            }), 400
        
        # Obtener el user_id
        user_response = supabase.table('users').select('id').eq('wallet_address', user_wallet).single().execute()
        
        if not user_response.data:
            return jsonify({
                'success': False,
                'error': 'Usuario no encontrado'
            }), 404
        
        user_id = user_response.data['id']
        
        # Obtener contactos
        contacts_response = supabase.table('contacts')\
            .select('id, nombre, wallet_address')\
            .eq('user_id', user_id)\
            .order('nombre')\
            .execute()
        
        return jsonify({
            'success': True,
            'contacts': contacts_response.data or []
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
```

## 🤖 Modificación del Endpoint `/chat`

Actualiza tu endpoint `/chat` para que pueda resolver nombres de contactos automáticamente:

```python
import re

@app.route('/chat', methods=['POST'])
def chat():
    """
    Procesa mensajes del chatbot y resuelve nombres de contactos.
    """
    try:
        data = request.get_json()
        message = data.get('message', '').lower()
        user_wallet = data.get('user_wallet', '')  # Agregar wallet del usuario
        
        # Detectar transferencias con nombres
        # Patrones: "enviar X STX a [nombre]", "transferir X STX a [nombre]"
        transfer_pattern = r'(?:enviar|transferir|mandar)\s+(\d+\.?\d*)\s+stx\s+(?:a|para)\s+([a-záéíóúñ]+)'
        match = re.search(transfer_pattern, message, re.IGNORECASE)
        
        if match:
            amount = match.group(1)
            contact_name = match.group(2)
            
            # Intentar resolver el nombre a una wallet address
            try:
                # Buscar en Supabase
                user_response = supabase.table('users').select('id').eq('wallet_address', user_wallet).single().execute()
                
                if user_response.data:
                    user_id = user_response.data['id']
                    
                    # Buscar contacto
                    contact_response = supabase.table('contacts')\
                        .select('*')\
                        .eq('user_id', user_id)\
                        .ilike('nombre', contact_name)\
                        .execute()
                    
                    if contact_response.data and len(contact_response.data) > 0:
                        # Contacto encontrado - usar su wallet address
                        contact = contact_response.data[0]
                        recipient_address = contact['wallet_address']
                        
                        return jsonify({
                            'action': 'transfer',
                            'amount': float(amount),
                            'recipient': recipient_address,
                            'contact_name': contact['nombre'],
                            'message': f'💰 Transferencia de {amount} STX a {contact["nombre"]} ({recipient_address[:10]}...)'
                        })
                    else:
                        # Contacto no encontrado
                        return jsonify({
                            'action': 'none',
                            'message': f'❌ No encontré un contacto llamado "{contact_name}". ¿Quieres agregarlo primero?'
                        })
            except Exception as e:
                print(f"Error buscando contacto: {e}")
        
        # Detectar transferencias con dirección directa
        transfer_with_address = r'(?:enviar|transferir|mandar)\s+(\d+\.?\d*)\s+stx\s+(?:a|para)\s+(SP[0-9A-Z]{38,41}|ST[0-9A-Z]{38,41})'
        match_address = re.search(transfer_with_address, message, re.IGNORECASE)
        
        if match_address:
            amount = match_address.group(1)
            recipient = match_address.group(2)
            
            return jsonify({
                'action': 'transfer',
                'amount': float(amount),
                'recipient': recipient,
                'message': f'💰 Transferencia de {amount} STX a {recipient[:10]}...'
            })
        
        # Balance
        if 'balance' in message or 'saldo' in message or 'cuanto tengo' in message:
            return jsonify({
                'action': 'check_balance',
                'message': '💰 Consultando tu balance de STX...'
            })
        
        # Respuesta por defecto
        return jsonify({
            'action': 'none',
            'message': '🤔 No entendí tu mensaje. Puedes pedirme:\n- "Consultar mi balance"\n- "Enviar 10 STX a Omar"\n- "Transferir 5 STX a Alice"'
        })
        
    except Exception as e:
        return jsonify({
            'action': 'none',
            'message': f'❌ Error: {str(e)}'
        }), 500
```

## 📦 Instalación de Dependencias (Backend)

```bash
pip install supabase
```

O agrega a tu `requirements.txt`:
```
supabase==2.7.4
```

## 🔄 Flujo de Trabajo

```
1. Usuario dice: "Enviar 10 STX a Omar"
   ↓
2. Frontend envía a /chat:
   {
     "message": "Enviar 10 STX a Omar",
     "user_wallet": "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
   }
   ↓
3. Backend busca en Supabase:
   - Encuentra user_id por wallet_address
   - Busca contacto "Omar" de ese usuario
   - Obtiene wallet_address de Omar
   ↓
4. Backend responde:
   {
     "action": "transfer",
     "amount": 10,
     "recipient": "ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG",
     "contact_name": "Omar",
     "message": "Transferencia de 10 STX a Omar"
   }
   ↓
5. Frontend ejecuta la transferencia con la wallet_address de Omar
```

## 🎙️ Integración con Audio

Cuando implementes reconocimiento de voz, el flujo será:

```
Usuario habla: "Enviar diez stacks a Omar"
   ↓
Speech-to-Text convierte a: "enviar 10 STX a Omar"
   ↓
Se envía al backend para procesamiento
   ↓
Backend resuelve "Omar" → wallet_address
   ↓
Se ejecuta la transferencia
```

## ✅ Ventajas de este Enfoque

1. **UX Mejorada**: Usuario dice nombres en lugar de direcciones largas
2. **Audio-Friendly**: Fácil de pronunciar nombres vs direcciones
3. **Seguridad**: Validación de que el contacto existe antes de transferir
4. **Flexibilidad**: Soporta tanto nombres como direcciones directas
5. **Escalable**: Fácil agregar más contactos sin cambiar código

## 🧪 Testing

```bash
# Test 1: Resolver contacto
curl -X POST http://127.0.0.1:5000/api/contacts/resolve \
  -H "Content-Type: application/json" \
  -d '{
    "user_wallet": "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
    "contact_name": "Omar"
  }'

# Test 2: Chat con nombre
curl -X POST http://127.0.0.1:5000/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "enviar 10 STX a Omar",
    "user_wallet": "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
  }'
```

## 📝 Notas Importantes

1. **Case-insensitive**: Los nombres se buscan sin importar mayúsculas/minúsculas
2. **Primer match**: Si hay múltiples contactos con nombres similares, se toma el primero
3. **Validación**: Siempre validar que el contacto existe antes de transferir
4. **Error handling**: Mostrar mensajes claros cuando no se encuentra el contacto

---

**Siguiente Paso:** Implementa estos endpoints en tu backend Flask y actualiza el frontend para enviar `user_wallet` en las peticiones al `/chat`.
