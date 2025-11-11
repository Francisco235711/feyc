from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from sabio_lector import buscar_respuesta

app = FastAPI()

# Habilitar conexión desde el frontend (React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # o poné tu dominio cuando publiques
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Pregunta(BaseModel):
    texto: str

@app.get("/")
def inicio():
    return {"mensaje": "🧙‍♂️ Sabio Lector en funcionamiento."}

@app.post("/preguntar")
def preguntar(p: Pregunta):
    respuesta = buscar_respuesta(p.texto)
    return {"respuesta": respuesta}