document.addEventListener('DOMContentLoaded', () => {
    const celdas = document.querySelectorAll('.celda');
    const estadoJuego = document.getElementById('estado-juego');
    const btnReiniciar = document.getElementById('btn-reiniciar');

    let tablero = ['', '', '', '', '', '', '', '', ''];
    let jugadorActual = 'X';
    let juegoActivo = true;

    // Todas las combinaciones posibles para ganar (índices del array)
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    function manejarClickCelda(e) {
        const celdaClickeada = e.target;
        const indice = celdaClickeada.getAttribute('data-indice');

        // Si la celda ya tiene algo o el juego terminó, no hacemos nada
        if (tablero[indice] !== '' || !juegoActivo) {
            return;
        }

        // Actualizamos estado lógico y visual
        tablero[indice] = jugadorActual;
        celdaClickeada.textContent = jugadorActual;
        celdaClickeada.classList.add(jugadorActual.toLowerCase());

        verificarResultado();
    }

    function verificarResultado() {
        let rondaGanada = false;

        for (let i = 0; i < combinacionesGanadoras.length; i++) {
            const [a, b, c] = combinacionesGanadoras[i];
            
            if (tablero[a] !== '' && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                rondaGanada = true;
                break;
            }
        }

        if (rondaGanada) {
            estadoJuego.textContent = `¡El jugador ${jugadorActual} ha ganado! 🎉`;
            juegoActivo = false;
            return;
        }

        // Verificar empate (si no hay celdas vacías y nadie ganó)
        if (!tablero.includes('')) {
            estadoJuego.textContent = '¡Empate!';
            juegoActivo = false;
            return;
        }

        // Cambiar turno
        jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
        estadoJuego.textContent = `Turno del jugador: ${jugadorActual}`;
    }

    function reiniciarJuego() {
        tablero = ['', '', '', '', '', '', '', '', ''];
        jugadorActual = 'X';
        juegoActivo = true;
        estadoJuego.textContent = `Turno del jugador: ${jugadorActual}`;

        celdas.forEach(celda => {
            celda.textContent = '';
            celda.classList.remove('x', 'o');
        });
    }

    // Asignar eventos
    celdas.forEach(celda => celda.addEventListener('click', manejarClickCelda));
    btnReiniciar.addEventListener('click', reiniciarJuego);
});