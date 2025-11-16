const virtudes = [
  {
    id: 1,
    nombre: "Isla de la Fortaleza",
    descripcion: "La fortaleza es la virtud cardinal que nos da valor para enfrentar las adversidades. En esta isla aprenderás que la verdadera valentía no es la ausencia de miedo, sino la decisión de actuar correctamente a pesar de él.",
    colorBoton: "#e63946",
    desafio: "Enfrenta tus miedos y demuestra tu coraje interior",
    desafioCompleto: {
      titulo: "El Camino del Valiente",
      introduccion: "Para demostrar tu fortaleza, debes completar tres pruebas que pondrán a prueba tu valentía.",
      pruebas: [
        {
          id: 1,
          pregunta: "¿Cuál es el primer paso para enfrentar un miedo?",
          opciones: [
            "Ignorarlo y esperar que desaparezca",
            "Reconocerlo y aceptar que existe",
            "Evitar situaciones que lo provoquen",
            "Fingir que no existe"
          ],
          respuestaCorrecta: 1,
          explicacion: "La valentía comienza con reconocer nuestros miedos. Solo cuando aceptamos que tenemos miedo podemos decidir actuar a pesar de él."
        },
        {
          id: 2,
          pregunta: "Un compañero está siendo acosado. Nadie hace nada. ¿Qué harías?",
          opciones: [
            "Nada, no es mi problema",
            "Defenderlo, aunque sea impopular",
            "Esperar a que otros actúen primero",
            "Solo observar desde lejos"
          ],
          respuestaCorrecta: 1,
          explicacion: "La verdadera fortaleza se demuestra defendiendo lo correcto, incluso cuando nadie más lo hace. El valiente actúa según sus principios."
        },
        {
          id: 3,
          pregunta: "¿Qué significa ser valiente?",
          opciones: [
            "No tener miedo nunca",
            "Actuar correctamente a pesar del miedo",
            "Ser temerario y arriesgarse sin pensar",
            "Aparentar seguridad siempre"
          ],
          respuestaCorrecta: 1,
          explicacion: "La valentía no es ausencia de miedo, sino la decisión de hacer lo correcto incluso cuando temblamos. El héroe tembloroso que da un paso adelante es más valiente que el temerario."
        }
      ]
    }
  },
  {
    id: 2,
    nombre: "Isla de la Justicia",
    descripcion: "La justicia es dar a cada uno lo que le corresponde. Aquí descubrirás que ser justo no es solo seguir las leyes, sino actuar con equidad y reconocer la dignidad de todos los seres humanos.",
    colorBoton: "#91afacff",
    desafio: "Practica la equidad y la imparcialidad",
    desafioCompleto: {
      titulo: "El Juicio Equitativo",
      introduccion: "La justicia requiere discernimiento y compasión. Demuestra que puedes ser justo en estas situaciones.",
      pruebas: [
        {
          id: 1,
          pregunta: "¿Qué es más importante en la justicia?",
          opciones: [
            "Seguir las reglas sin excepción",
            "La equidad y reconocer la dignidad humana",
            "Castigar severamente",
            "Favorecer a los conocidos"
          ],
          respuestaCorrecta: 1,
          explicacion: "La justicia verdadera va más allá de las reglas. Es dar a cada quien lo que merece, reconociendo siempre su dignidad como persona."
        },
        {
          id: 2,
          pregunta: "Tu mejor amigo hizo trampa en un examen. ¿Qué haces?",
          opciones: [
            "Lo encubro, es mi amigo",
            "Hablo con él sobre lo que hizo",
            "Lo ignoro, no es mi problema",
            "Lo denuncio inmediatamente sin hablar"
          ],
          respuestaCorrecta: 1,
          explicacion: "La justicia comienza con la honestidad. Hablar con tu amigo es ser justo tanto con él (dándole oportunidad de corregir) como con los demás."
        },
        {
          id: 3,
          pregunta: "¿Qué significa ser justo?",
          opciones: [
            "Tratar a todos exactamente igual",
            "Dar a cada uno lo que necesita y merece",
            "Aplicar castigos sin compasión",
            "Favorecer a quien más me agrada"
          ],
          respuestaCorrecta: 1,
          explicacion: "La justicia es dar a cada quien según sus circunstancias y necesidades, reconociendo que somos diferentes pero igualmente dignos."
        }
      ]
    }
  },
  {
    id: 3,
    nombre: "Isla de la Prudencia",
    descripcion: "La prudencia es la sabiduría práctica que nos permite discernir lo correcto en cada situación. En esta isla aprenderás a reflexionar antes de actuar y a tomar decisiones sabias.",
    colorBoton: "#61def4ff",
    desafio: "Reflexiona y actúa con sabiduría",
    desafioCompleto: {
      titulo: "La Senda del Sabio",
      introduccion: "La prudencia te permite ver más allá de lo evidente. Demuestra tu sabiduría práctica.",
      pruebas: [
        {
          id: 1,
          pregunta: "¿Qué debes hacer antes de tomar una decisión importante?",
          opciones: [
            "Actuar rápido sin pensar",
            "Reflexionar sobre las consecuencias",
            "Hacer lo que todos hacen",
            "Decidir según mis emociones del momento"
          ],
          respuestaCorrecta: 1,
          explicacion: "La prudencia es pensar antes de actuar. El sabio reflexiona sobre las consecuencias de sus acciones antes de decidir."
        },
        {
          id: 2,
          pregunta: "Te ofrecen una 'solución fácil' a un problema. ¿Qué haces?",
          opciones: [
            "La acepto sin dudar",
            "Analizo si realmente es buena a largo plazo",
            "La rechazo por desconfianza",
            "Pregunto a otros sin reflexionar yo"
          ],
          respuestaCorrecta: 1,
          explicacion: "La prudencia nos enseña a no dejarnos llevar por lo fácil. Debemos discernir si algo que parece bueno realmente lo es."
        },
        {
          id: 3,
          pregunta: "¿Qué caracteriza a una persona prudente?",
          opciones: [
            "Nunca comete errores",
            "Reflexiona y aprende de sus experiencias",
            "Siempre toma la opción más segura",
            "Evita tomar decisiones"
          ],
          respuestaCorrecta: 1,
          explicacion: "La prudencia no es perfección, es aprender de cada experiencia y usar ese conocimiento para tomar mejores decisiones."
        }
      ]
    }
  },
  {
    id: 4,
    nombre: "Isla de la Templanza",
    descripcion: "La templanza es el autocontrol y la moderación. Aquí descubrirás que dominar tus impulsos y pasiones te hace verdaderamente libre. No es represión, sino libertad consciente.",
    colorBoton: "#cab576ff",
    desafio: "Domina tus impulsos y encuentra el equilibrio",
    desafioCompleto: {
      titulo: "El Dominio Interior",
      introduccion: "La templanza es libertad. Quien se domina a sí mismo gobierna un reino más vasto que cualquier imperio.",
      pruebas: [
        {
          id: 1,
          pregunta: "¿Qué es la templanza?",
          opciones: [
            "Reprimir todas las emociones",
            "Autocontrol consciente y moderación",
            "Nunca disfrutar de nada",
            "Ser indiferente a todo"
          ],
          respuestaCorrecta: 1,
          explicacion: "La templanza no es represión, es libertad consciente. Es elegir disfrutar con medida, no dejarse dominar por los impulsos."
        },
        {
          id: 2,
          pregunta: "Estás muy enojado con alguien. ¿Qué haces?",
          opciones: [
            "Explotar inmediatamente",
            "Respiro, reflexiono y respondo con calma",
            "Guardo el enojo para siempre",
            "Actúo como si nada pasara"
          ],
          respuestaCorrecta: 1,
          explicacion: "La templanza nos permite sentir la emoción sin ser controlados por ella. Podemos responder en lugar de reaccionar."
        },
        {
          id: 3,
          pregunta: "¿Por qué es importante la templanza?",
          opciones: [
            "Para no sentir emociones",
            "Para ser verdaderamente libres",
            "Para parecer serios siempre",
            "Para evitar disfrutar de la vida"
          ],
          respuestaCorrecta: 1,
          explicacion: "Quien se domina a sí mismo es libre. La templanza nos libera de ser esclavos de nuestros impulsos y nos permite vivir plenamente."
        }
      ]
    }
  },
];

export default virtudes;