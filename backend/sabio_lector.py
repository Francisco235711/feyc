from google import genai
import os
from dotenv import load_dotenv

# Cargar variables de entorno
load_dotenv()

# 🔑 Configurar API Key
API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise ValueError("❌ GEMINI_API_KEY no encontrada. Verifica tu archivo .env")

# Inicializar cliente
try:
    client = genai.Client(api_key=API_KEY)
    print("✅ Cliente Gemini inicializado correctamente")
except Exception as e:
    print(f"❌ Error al inicializar Gemini: {e}")
    raise

# 📁 Carpeta donde están tus textos
DATA_DIR = "data"

# 🔍 Leer todos los archivos .txt
def cargar_textos():
    """Carga todos los archivos .txt de la carpeta data/"""
    textos = {}  # Diccionario: nombre_archivo -> contenido
    
    if not os.path.exists(DATA_DIR):
        print(f"⚠️ Carpeta {DATA_DIR}/ no existe. Creándola...")
        os.makedirs(DATA_DIR)
        return textos
    
    for root, _, files in os.walk(DATA_DIR):
        for archivo in files:
            if archivo.endswith(".txt"):
                ruta = os.path.join(root, archivo)
                try:
                    with open(ruta, "r", encoding="utf-8", errors="ignore") as f:
                        contenido = f.read().strip()
                        if contenido:
                            # Guardar con el nombre del archivo como clave
                            nombre = archivo.replace(".txt", "")
                            textos[nombre] = contenido
                            print(f"✅ Cargado: {archivo}")
                except Exception as e:
                    print(f"⚠️ Error leyendo {archivo}: {e}")
    
    if not textos:
        print("⚠️ No se encontraron archivos .txt en /data")
    else:
        print(f"📚 Total de textos cargados: {len(textos)}")
    
    return textos

# 🧠 Cargar textos al iniciar
TEXTOS_BASE = cargar_textos()

# 🔎 Buscar fragmentos relevantes
def buscar_fragmentos_relevantes(pregunta, textos_dict, max_chars=3000):
    """Busca textos relevantes basándose en palabras clave"""
    if not textos_dict:
        return ""
    
    pregunta_lower = pregunta.lower()
    palabras_clave = pregunta_lower.split()
    
    # Calcular relevancia de cada texto
    textos_con_score = []
    for nombre, contenido in textos_dict.items():
        contenido_lower = contenido.lower()
        # Contar coincidencias de palabras clave
        score = sum(1 for palabra in palabras_clave if palabra in contenido_lower)
        # Bonus si el nombre del archivo coincide con alguna palabra
        if any(palabra in nombre.lower() for palabra in palabras_clave):
            score += 5
        
        if score > 0:
            textos_con_score.append((score, nombre, contenido))
    
    # Ordenar por relevancia
    textos_con_score.sort(reverse=True, key=lambda x: x[0])
    
    # Combinar los más relevantes hasta el límite de caracteres
    contexto = ""
    for _, nombre, contenido in textos_con_score:
        if len(contexto) + len(contenido) > max_chars:
            break
        contexto += f"\n--- {nombre.upper()} ---\n{contenido}\n"
    
    return contexto.strip()

# 🧙‍♂️ Contexto del Sabio
CONTEXTO_SABIO = """Actúa como un mentor filosófico sabio y reflexivo. Guía al usuario en su viaje hacia la felicidad a través de las virtudes cardinales y teologales, según la visión católica. Inspírate en el viaje del héroe de Joseph Campbell y en la doctrina católica sobre la felicidad como unión con Dios. Enseña, aconseja y acompaña con profundidad espiritual y claridad moral.

Habla de forma inspiradora, reflexiva y profunda. Usa metáforas cuando sea apropiado.
Sé conciso pero significativo (máximo 100 palabras). Haz preguntas reflexivas cuando sea relevante.

Si tienes contexto de textos adicionales sobre virtudes, úsalos para enriquecer tu respuesta, pero siempre mantén tu personalidad de sabio filosófico.
"""

def buscar_respuesta(pregunta):
    """
    Busca respuesta usando Gemini + contexto de tus textos
    """
    try:
        # 1. Buscar fragmentos relevantes en tus textos
        contexto_textos = buscar_fragmentos_relevantes(pregunta, TEXTOS_BASE)
        
        # 2. Construir prompt con contexto
        if contexto_textos:
            prompt = f"""{CONTEXTO_SABIO}

CONTEXTO ADICIONAL DE TEXTOS SOBRE VIRTUDES:
{contexto_textos}

---

Usuario pregunta: {pregunta}

Responde como el Sabio del Camino, usando el contexto proporcionado si es relevante:"""
        else:
            prompt = f"""{CONTEXTO_SABIO}

Usuario pregunta: {pregunta}

Responde como el Sabio del Camino:"""
        
        # 3. Crear chat y enviar mensaje
        chat = client.chats.create(model='gemini-2.0-flash')
        respuesta = chat.send_message(prompt)
        
        return respuesta.text
    
    except Exception as e:
        print(f"❌ Error al contactar Gemini: {e}")
        return "🤔 El sabio guarda silencio en este momento. Intenta reformular tu pregunta."

# 📝 Respuestas rápidas (sin gastar API calls)
respuestas_rapidas = {
    "hola": "🔥 Saludos, viajero del alma. ¿Qué virtud te trae por aquí hoy?",
    "gracias": "Es un honor acompañarte en tu viaje. Que las virtudes iluminen tu camino.",
    "adios": "Que tu camino esté iluminado por las virtudes que has descubierto. Hasta pronto, viajero.",
    "quien eres": "Soy el Sabio del Camino, tu guía en el viaje hacia la felicidad a través de las virtudes.",
}

def buscar_respuesta_con_cache(pregunta):
    """
    Optimizado: revisa respuestas rápidas antes de llamar a la API
    """
    pregunta_lower = pregunta.lower().strip()
    
    # Buscar en respuestas rápidas
    for key, respuesta in respuestas_rapidas.items():
        if key in pregunta_lower:
            return respuesta
    
    # Si no hay respuesta rápida, usar IA
    return buscar_respuesta(pregunta)