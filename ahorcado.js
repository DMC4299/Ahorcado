const palabras = ["javascript", "ahorcado", "programacion", "web", "computadora"]; // Palabras posibles
let palabraElegida = palabras[Math.floor(Math.random() * palabras.length)];
let letrasAdivinadas = [];
let letrasIncorrectas = [];
let intentosMaximos = 6;
let intentosActuales = 0;

const displayPalabra = document.getElementById("palabra");
const displayIncorrectas = document.getElementById("incorrectas");
const displayEstado = document.getElementById("estado");
const canvas = document.getElementById("canvasAhorcado");
const ctx = canvas.getContext("2d");

function actualizarPalabra() {
  const mostrar = palabraElegida
    .split("")
    .map(letra => (letrasAdivinadas.includes(letra) ? letra : "_"))
    .join(" ");
  displayPalabra.textContent = mostrar;


  if (!mostrar.includes("_")) {
    displayEstado.textContent = "¡Felicidades, ganaste! 🎉";
    deshabilitarEntrada();
  }
}


function adivinarLetra() {
  const entrada = document.getElementById("entradaLetra");
  const letra = entrada.value.toLowerCase();
  entrada.value = ""; // Limpiar el input

  if (letra.length !== 1 || !/^[a-zñ]$/.test(letra)) {
    alert("Por favor, ingresa una sola letra válida.");
    return;
  }

  if (letrasAdivinadas.includes(letra) || letrasIncorrectas.includes(letra)) {
    alert("Ya intentaste esta letra.");
    return;
  }

  if (palabraElegida.includes(letra)) {
    letrasAdivinadas.push(letra);
  } else {
    letrasIncorrectas.push(letra);
    intentosActuales++;
    dibujarAhorcado();
    displayIncorrectas.textContent = `Letras incorrectas: ${letrasIncorrectas.join(", ")}`;


    if (intentosActuales >= intentosMaximos) {
      displayEstado.textContent = `¡Perdiste! La palabra era "${palabraElegida}". 😢`;
      deshabilitarEntrada();
    }
  }

  actualizarPalabra();
}


function dibujarAhorcado() {
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#000";
  switch (intentosActuales) {
    case 1: // Base
      ctx.moveTo(10, 190);
      ctx.lineTo(100, 190);
      ctx.stroke();
      break;
    case 2: // Poste vertical
      ctx.moveTo(50, 190);
      ctx.lineTo(50, 20);
      ctx.stroke();
      break;
    case 3: // Poste horizontal
      ctx.moveTo(50, 20);
      ctx.lineTo(120, 20);
      ctx.stroke();
      break;
    case 4: // Cuerda
      ctx.moveTo(120, 20);
      ctx.lineTo(120, 50);
      ctx.stroke();
      break;
    case 5: // Cabeza
      ctx.beginPath();
      ctx.arc(120, 70, 20, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 6: // Cuerpo
      ctx.moveTo(120, 90);
      ctx.lineTo(120, 140);
      ctx.stroke();
      break;
    default:
      break;
  }
}


function deshabilitarEntrada() {
  document.getElementById("entradaLetra").disabled = true;
}


actualizarPalabra();
