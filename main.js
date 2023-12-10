import './style.css';

const alto = 10;
const largo = 10;

const tablero = [];
const snake = [
  { x: 2, y: 2 }, // Cabeza de la serpiente
  { x: 2, y: 1 }, // Cuerpo
  { x: 2, y: 0 }  // Cola
];

let direccion = 'derecha'; // Dirección inicial

for (let i = 0; i < alto; i++) {
  const fila = [];
  for (let y = 0; y < largo; y++) {
    fila.push(0)
  }
  tablero.push(fila)
}


function esCabeza(i, j) {
  return snake[0].x === i && snake[0].y === j;
}

function renderizarTablero() {
  document.querySelector('#app').innerHTML = `
    <div>
      <h1>Snake</h1>
      <table>
        ${tablero.map((fila, i) => `
          <tr>
            ${fila.map((celda, j) => `<td class="${esCabeza(i, j) ? 'cabeza' : ''}">${celda}</td>`).join('')}
          </tr>
        `).join('')}
      </table>
    </div>
  `;
}

function moverSerpiente() {
  // Mueve cada segmento de la serpiente hacia adelante
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { ...snake[i - 1] };
  }

  // Mueve la cabeza en la dirección actual
  switch (direccion) {
    case 'arriba':
      snake[0].x--;
      break;
    case 'abajo':
      snake[0].x++;
      break;
    case 'izquierda':
      snake[0].y--;
      break;
    case 'derecha':
      snake[0].y++;
      break;
  }
}

// Maneja eventos de teclado para cambiar la dirección de la serpiente
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
      direccion = 'arriba';
      break;
    case 'ArrowDown':
      direccion = 'abajo';
      break;
    case 'ArrowLeft':
      direccion = 'izquierda';
      break;
    case 'ArrowRight':
      direccion = 'derecha';
      break;
  }
});

// Inicialmente renderizamos el tablero y la serpiente
renderizarTablero();

// Ejecutamos el movimiento de la serpiente cada 500 milisegundos
setInterval(() => {
  moverSerpiente();
  renderizarTablero();
}, 500);
