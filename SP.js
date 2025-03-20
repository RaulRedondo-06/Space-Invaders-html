const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const KEY_CODE_LEFT = 65;
const KEY_CODE_RIGHT = 68;
const KEY_CODE_SPACE = 32;

const GAME_STATE = {
    playerX: 0,
    playerY: 0,
    speed: 3.5, // Controla la velocidad de movimiento
    velocityX: 0, // Velocidad en el eje X
};

function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}

function createPlayer($container) {
    GAME_STATE.playerX = GAME_WIDTH / 2;
    GAME_STATE.playerY = GAME_HEIGHT - 50;
    const $player = document.createElement("img");
    $player.src = "img/player.png";
    $player.className = "player";
    $container.appendChild($player);
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
}

function updatePlayerPosition() {
    // Actualizar la posición del jugador en base a su velocidad
    GAME_STATE.playerX += GAME_STATE.velocityX;

    // Limitar los bordes del movimiento
    if (GAME_STATE.playerX < 25) {
        GAME_STATE.playerX = 25;
    }
    if (GAME_STATE.playerX > GAME_WIDTH - 25) { // 50 es el ancho del jugador
        GAME_STATE.playerX = GAME_WIDTH - 25;
    }

    // Actualizar la posición visual del jugador
    const $player = document.querySelector(".player");
    if ($player) {
        setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    }

    // Llamar nuevamente a updatePlayerPosition en el siguiente frame
    requestAnimationFrame(updatePlayerPosition);
}

function init() {
    const $container = document.querySelector(".game");
    createPlayer($container);
    // Iniciar el bucle de actualización de posición
    requestAnimationFrame(updatePlayerPosition);
}

function onKeyDown(e) {
    if (e.keyCode === KEY_CODE_LEFT) {
        GAME_STATE.velocityX = -GAME_STATE.speed; // Mover a la izquierda
    } else if (e.keyCode === KEY_CODE_RIGHT) {
        GAME_STATE.velocityX = GAME_STATE.speed; // Mover a la derecha
    }
}

function onKeyUp(e) {
    // Detener el movimiento cuando la tecla se deja de presionar,
    // pero solo si el jugador no está presionando la tecla opuesta
    if (e.keyCode === KEY_CODE_LEFT && GAME_STATE.velocityX < 0) {
        GAME_STATE.velocityX = 0; // Detener si se suelta la tecla izquierda
    }
    if (e.keyCode === KEY_CODE_RIGHT && GAME_STATE.velocityX > 0) {
        GAME_STATE.velocityX = 0; // Detener si se suelta la tecla derecha
    }
}

// Esperar a que el DOM esté completamente cargado antes de inicializar
document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
