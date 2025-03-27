const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const ENEMY_WIDTH = 50; // Ancho de cada enemigo
const ENEMY_HEIGHT = 40; // Alto de cada enemigo

const KEY_CODE_LEFT = 65; // "A" para izquierda
const KEY_CODE_RIGHT = 68; // "D" para derecha

const GAME_STATE = {
    playerX: GAME_WIDTH / 2,
    playerY: GAME_HEIGHT - 50,
    speed: 5, // Velocidad del jugador
    velocityX: 0, // Velocidad horizontal del jugador
    enemies: [],
    enemySpeed: 2, // Velocidad de los enemigos
    enemyDirection: 1, // Dirección de movimiento de los enemigos (1 para derecha, -1 para izquierda)
    gameOver: false, // Estado del juego (si ha terminado o no)
};

// Crear el jugador
function createPlayer($container) {
    const $player = document.createElement("img");
    $player.src = "img/player.png"; // Coloca aquí la imagen del jugador
    $player.className = "player";
    $container.appendChild($player);
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

// Configurar la posición de los elementos
function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}

// Crear enemigos
function createEnemies($container) {
    const enemyRows = 4;
    const enemyCols = 5;

    const horizontalSpacing = 10;  // Espacio entre enemigos horizontalmente
    const verticalSpacing = 10;    // Espacio entre enemigos verticalmente

    // Las posiciones iniciales de los enemigos
    const initialY = 50; // Fila inicial de enemigos, la primera fila estará aquí
    const initialX = 50;

    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            const $enemy = document.createElement("img");
            $enemy.src = "img/enemy.png"; // Coloca aquí la imagen del enemigo
            $enemy.className = "enemy";

            const xPos = initialX + col * (ENEMY_WIDTH + horizontalSpacing);  // Posición X
            const yPos = initialY + row * (ENEMY_HEIGHT + verticalSpacing);   // Posición Y para cada fila (se desplaza hacia abajo por fila)
            $container.appendChild($enemy);
            setPosition($enemy, xPos, yPos);

            // Añadir los enemigos al estado del juego
            GAME_STATE.enemies.push({
                element: $enemy,
                x: xPos,
                y: yPos,
                width: ENEMY_WIDTH,
                height: ENEMY_HEIGHT,
                alive: true,
            });
        }
    }
}

// Mover enemigos horizontalmente
function moveEnemies() {
    let changeDirection = false;

    GAME_STATE.enemies.forEach((enemy) => {
        if (enemy.alive) {
            // Mover enemigos horizontalmente según la dirección
            enemy.x += GAME_STATE.enemySpeed * GAME_STATE.enemyDirection;

            // Comprobar si el enemigo ha llegado al borde
            if (enemy.x >= GAME_WIDTH - ENEMY_WIDTH || enemy.x <= 30) {
                changeDirection = true; // Marcar que deben cambiar de dirección
            }

            // Aplicar movimiento y posición a cada enemigo
            setPosition(enemy.element, enemy.x, enemy.y);
        }
    });

    // Cambiar dirección de los enemigos si han llegado al borde
    if (changeDirection) {
        GAME_STATE.enemyDirection = -GAME_STATE.enemyDirection; // Invertir dirección
    }
}

// Actualizar la posición del jugador de manera suave
function updatePlayerPosition() {
    if (GAME_STATE.gameOver) return; // Detener el movimiento si el juego ha terminado

    GAME_STATE.playerX += GAME_STATE.velocityX;

    // Limitar la posición del jugador dentro de la pantalla
    if (GAME_STATE.playerX < 0) {
        GAME_STATE.playerX = 0;
    }
    if (GAME_STATE.playerX > GAME_WIDTH - 50) { // Asumiendo que el ancho del jugador es 50
        GAME_STATE.playerX = GAME_WIDTH - 50;
    }

    const $player = document.querySelector(".player");
    if ($player) {
        setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    }
}

// Bucle principal del juego
function gameLoop() {
    if (GAME_STATE.gameOver) {
        showGameOver(); // Mostrar mensaje de Game Over
        return;
    }

    updatePlayerPosition();
    moveEnemies();
    requestAnimationFrame(gameLoop); // Llamar de nuevo para el siguiente frame
}

// Mostrar el mensaje de Game Over
function showGameOver() {
    const gameOverDiv = document.querySelector(".game-over");
    gameOverDiv.style.display = "block"; // Mostrar la pantalla de "Game Over"
}

// Inicializar el juego
function init() {
    const $container = document.querySelector(".game");
    createPlayer($container);
    createEnemies($container);
    requestAnimationFrame(gameLoop); // Iniciar el loop de animación
}

// Eventos de teclado para mover al jugador
function onKeyDown(e) {
    if (e.keyCode === KEY_CODE_LEFT && GAME_STATE.velocityX >= 0) {
        GAME_STATE.velocityX = -GAME_STATE.speed; // Mover a la izquierda solo si no está moviéndose a la derecha
    } else if (e.keyCode === KEY_CODE_RIGHT && GAME_STATE.velocityX <= 0) {
        GAME_STATE.velocityX = GAME_STATE.speed; // Mover a la derecha solo si no está moviéndose a la izquierda
    }
}

function onKeyUp(e) {
    if (e.keyCode === KEY_CODE_LEFT || e.keyCode === KEY_CODE_RIGHT) {
        // De esta manera el jugador puede cambiar de dirección sin detenerse instantáneamente.
        if (e.keyCode === KEY_CODE_LEFT && GAME_STATE.velocityX < 0) {
            GAME_STATE.velocityX = 0;
        } else if (e.keyCode === KEY_CODE_RIGHT && GAME_STATE.velocityX > 0) {
            GAME_STATE.velocityX = 0;
        }
    }
}

// Esperar a que el DOM esté completamente cargado antes de inicializar
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
