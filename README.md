# 🔥 El Viaje Ardiente (FEYC)

**Proyecto interactivo sobre el camino hacia la felicidad a través de las virtudes.**

---

## 📖 Sobre el Proyecto

El Viaje Ardiente es una experiencia web interactiva que combina:

- 🗺️ **Mapa Interactivo de Virtudes**: Explora territorios que representan virtudes
- ⚔️ **Galería de Héroes Ardientes**: Descubre personas inspiradoras con tarjetas 3D
- 🧙‍♂️ **Chatbot Filosófico**: Conversa con "El Sabio del Camino" impulsado por Google Gemini AI

---

## 🚀 Tecnologías

### Frontend (React)
- React 18 con Vite
- Recharts para visualizaciones
- CSS3 con animaciones 3D
- Diseño responsive

### Backend (Python)
- FastAPI
- Google Gemini AI (gemini-2.0-flash)
- RAG con textos personalizados
- Uvicorn

---

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ y npm
- Python 3.10+
- API Key de Google Gemini ([obtener aquí](https://aistudio.google.com/app/apikey))

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/FEYC.git
cd FEYC
```

### 2. Backend (Python)
```bash
cd backend

# Crear entorno virtual
python -m venv .venv

# Activar entorno virtual
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Edita .env y agrega tu GEMINI_API_KEY
```

### 3. Frontend (React)
```bash
# Desde la raíz del proyecto
npm install
```

---

## ▶️ Ejecución

### Iniciar Backend
```bash
cd backend
# Activar entorno virtual primero
.venv\Scripts\activate  # Windows
# o
source .venv/bin/activate  # Linux/Mac

# Ejecutar servidor
uvicorn main:app --reload
```

Backend disponible en: `http://127.0.0.1:8000`  
Documentación API: `http://127.0.0.1:8000/docs`

### Iniciar Frontend

En otra terminal (desde la raíz):
```bash
npm run dev
```

Frontend disponible en: `http://localhost:5173`

---

## 🔑 Configurar API Key de Gemini

1. Ve a [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Genera una API Key
3. Crea `backend/.env`:
```env
   GEMINI_API_KEY=tu_api_key_aqui
```

---

## 📂 Estructura del Proyecto
FEYC/
├── backend/                    # API con FastAPI
│   ├── data/                   # Textos sobre virtudes (.txt)
│   ├── modelo/                 # Modelos de embeddings (generados)
│   ├── main.py                 # API principal
│   ├── sabio_lector.py         # Lógica del chatbot + RAG
│   ├── requirements.txt        # Dependencias Python
│   ├── .env.example            # Template de configuración
│   └── .env                    # Tu API Key (NO subir a Git)
├── src/                        # Frontend React
│   ├── components/             # Componentes React
│   │   ├── HeroesArdientes.jsx
│   │   ├── ChatbotSabio.jsx
│   │   └── ...
│   ├── data/                   # Datos estáticos
│   │   └── heroes.js
│   └── App.jsx                 # Componente principal
├── public/                     # Archivos públicos
├── .gitignore                  # Archivos ignorados por Git
├── index.html                  # HTML principal
├── package.json                # Dependencias Node
├── vite.config.js              # Configuración Vite
└── README.md                   # Este archivo
```

---

## 🎨 Características Destacadas

- ✨ **Scroll horizontal** en galería de héroes con tarjetas que rotan en 3D
- 🎯 **Sistema de foco** automático en la tarjeta central
- 🔄 **Hover effects** que amplían las tarjetas al pasar el cursor
- 💬 **Chatbot inteligente** que combina IA con textos personalizados sobre virtudes
- 🗺️ **Mapa clickeable** con seguimiento de progreso de virtudes visitadas
- 📊 **Visualizaciones** matemáticas interactivas con Recharts
- 🎭 **Animaciones suaves** y transiciones fluidas

---

## 🧪 Pruebas

### Probar el Backend

Con el servidor corriendo, abre otra terminal:

**Usando curl (Linux/Mac):**
```bash
curl -X POST "http://127.0.0.1:8000/preguntar" \
  -H "Content-Type: application/json" \
  -d '{"texto":"¿Qué es la valentía?"}'
```

**Usando PowerShell (Windows):**
```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:8000/preguntar" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"texto":"¿Qué es la valentía?"}'
```

**O visita la documentación interactiva:**  
`http://127.0.0.1:8000/docs`

---

## 🌐 Deploy en Producción

### Backend → Render

1. Crea una cuenta en [Render](https://render.com)
2. New → Web Service
3. Conecta tu repositorio de GitHub
4. Configuración:
   - **Name**: `feyc-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Variables de entorno:
   - Agrega `GEMINI_API_KEY` con tu key
6. Deploy

Tu backend estará en: `https://feyc-backend.onrender.com`

### Frontend → Vercel

1. Crea una cuenta en [Vercel](https://vercel.com)
2. Import Project → Conecta tu repo
3. Configuración:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (raíz)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy

Tu frontend estará en: `https://feyc.vercel.app`

### Actualizar URL del backend en el frontend

En tus archivos React (ej: `ChatbotSabio.jsx`), cambia:
```javascript
// Desarrollo
const API_URL = "http://127.0.0.1:8000";

// Producción
const API_URL = "https://feyc-backend.onrender.com";
```

O mejor, usa variables de entorno en Vite:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
```

Y crea `.env` en la raíz:
```env
VITE_API_URL=http://127.0.0.1:8000
```

---

## 🛠️ Scripts Disponibles
```bash
# Frontend
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build

# Backend
cd backend
uvicorn main:app --reload         # Servidor con auto-reload
uvicorn main:app --host 0.0.0.0   # Servidor accesible en red local
```

---

## 🐛 Solución de Problemas

### El backend no inicia
```bash
# Verifica que el entorno virtual esté activo
# Deberías ver (.venv) al inicio de tu terminal

# Reinstala dependencias
pip install -r requirements.txt
```

### Error de API Key
```bash
# Verifica que backend/.env existe
# Verifica que GEMINI_API_KEY está configurada
# Verifica que la key es válida en Google AI Studio
```

### Frontend no se conecta al backend
```bash
# Verifica que el backend esté corriendo en http://127.0.0.1:8000
# Verifica la URL en tu código React
# Revisa la consola del navegador (F12) para errores CORS
```

---

## 🤝 Contribuciones

¿Quieres contribuir? ¡Genial!

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/NuevaCaracteristica`)
3. Commit tus cambios (`git commit -m '✨ Agregar NuevaCaracteristica'`)
4. Push a la rama (`git push origin feature/NuevaCaracteristica`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 👤 Autor

**Tu Nombre**
- GitHub: [@TU-USUARIO](https://github.com/TU-USUARIO)
- Email: tu-email@ejemplo.com

---

## 🙏 Agradecimientos

- 🤖 Google Gemini por la API de IA generativa
- ⚛️ Comunidad de React y FastAPI
- 📚 Filosofía clásica sobre virtudes y ética
- 🎨 Inspiración en diseños modernos de UI/UX

---

## 📊 Estado del Proyecto

![En Desarrollo](https://img.shields.io/badge/estado-en%20desarrollo-yellow)
![Python](https://img.shields.io/badge/python-3.10+-blue)
![React](https://img.shields.io/badge/react-18.x-61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-0.1-009688)
![Gemini](https://img.shields.io/badge/Gemini-2.0-orange)

---

## 🔮 Roadmap Futuro

- [ ] Sistema de usuarios y progreso guardado
- [ ] Más virtudes y contenido
- [ ] Versión mobile mejorada
- [ ] Integración con redes sociales
- [ ] Modo oscuro
- [ ] Soporte multiidioma
- [ ] Tests automatizados

---

⭐ **Si te gustó este proyecto, dale una estrella en GitHub!**

💬 **¿Preguntas o sugerencias?** Abre un [Issue](https://github.com/TU-USUARIO/FEYC/issues)