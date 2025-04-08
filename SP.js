// Variables del tamaño de los objetos
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 40;
const BULLET_WIDTH = 5;
const BULLET_HEIGHT = 10;
const BULLET_SPEED = 7;
// Variables para los puntos de los jugadores
var POINTS_FRISTPLAYER = 0;
var POINTS_SECONDPLAYER = 0;
// Variables para la vida de los jugadores
var LIVE_FRISTPLAYER = 5;
var LIVE_SECONDPLAYER = 5;
// Teclas que usara el jugador 1
const KEY_CODE_LEFT = 65;
const KEY_CODE_RIGHT = 68;
const KEY_CODE_SPACE = 32;
// Teclas que usara el jugador 2
const KEY_CODE_LEFT2 = 37;
const KEY_CODE_RIGHT2 = 39;
const KEY_CODE_ZERO = 96;

// Variables para el estado del juego
const GAME_STATE = {
    // Ubicacion de los jugadores
    playerX: GAME_WIDTH / 2 - 100,
    playerY: GAME_HEIGHT - 50,
    playerX2: GAME_WIDTH / 2 + 100,
    playerY2: GAME_HEIGHT - 50,
    // Velocidad de los jugadores
    speed: 5,
    // Velocidad actual de movimiento de los jugadores
    velocityX: 0,
    velocityX2: 0,
    // Array de enemigos por pantalla
    enemies: [],
    // Array de las balas del jugador 1
    bullets: [],
    // Array de las balas de los enemigos
    enemyBullets: [],
    // Array de las balas del jugador 2
    bullets2: [],
    // Velocidad de movimiento de los enemigos
    enemySpeed: 2,
    // Variable para que los enemigos se muevan a la derecha o izquierda
    enemyDirection: 1,
    // Variable para saber si el juego a finalizado
    gameOver: false,
};

// Funcion para crear el jugador
function createPlayer($container) {
    // Añade los jugadores al campo de juego
    const $player = document.createElement("img");
    const $player2 = document.createElement("img");
    // Les añade la imagen y la clase
    $player.src = "img/player1.png";
    $player2.src = "img/player2.png";
    $player.className = "player";
    $player2.className = "player2";
    $container.appendChild($player);
    $container.appendChild($player2);
    // Posiciona a los jugadores en el sitio indicado
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    setPosition($player2, GAME_STATE.playerX2, GAME_STATE.playerY2);
}

// Funcion de victoria
function Win(puntuacion)
{
    console.log(puntuacion);
    // Muestra el bloque de victoria
    const win = document.querySelector(".congratulations");
    win.style.display = "block";
}

// Funcion para la vida del jugador 1
function vidajugador1()
{
    // Obtiene la referencia de los corazones del primer jugador
    corazonun=document.getElementById("heart1_1");
    corazondo=document.getElementById("heart1_2");
    corazontre=document.getElementById("heart1_3");
    corazoncua=document.getElementById("heart1_4");
    corazoncin=document.getElementById("heart1_5");
    
    // Cambia los contenedores de corazon en funcion de las vidas del jugador
    if (LIVE_FRISTPLAYER==4) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_full.png";
        corazontre.src="img/heart_full.png";
        corazondo.src="img/heart_full.png";
        corazonun.src="img/heart_full.png";
    }
    if (LIVE_FRISTPLAYER==3) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_empty.png";
        corazontre.src="img/heart_full.png";
        corazondo.src="img/heart_full.png";
        corazonun.src="img/heart_full.png";
    }
    if (LIVE_FRISTPLAYER==2) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_empty.png";
        corazontre.src="img/heart_empty.png";
        corazondo.src="img/heart_full.png";
        corazonun.src="img/heart_full.png";
    }
    if (LIVE_FRISTPLAYER==1) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_empty.png";
        corazontre.src="img/heart_empty.png";
        corazondo.src="img/heart_empty.png";
        corazonun.src="img/heart_full.png";
    }
    if (LIVE_FRISTPLAYER==0) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_empty.png";
        corazontre.src="img/heart_empty.png";
        corazondo.src="img/heart_empty.png";
        corazonun.src="img/heart_empty.png";
        // Cambia el texto de victoria del bloque de victoria
        document.getElementById("cong").innerHTML = "El jugador 2 gano el juego";
        Win(POINTS_SECONDPLAYER)
    }
}

// Funcion para la vida del jugador 2
function vidajugador2()
{
    // Obtiene la referencia de los corazones del segundo jugador
    corazonun=document.getElementById("heart2_1");
    corazondo=document.getElementById("heart2_2");
    corazontre=document.getElementById("heart2_3");
    corazoncua=document.getElementById("heart2_4");
    corazoncin=document.getElementById("heart2_5");
    
    // Cambia los contenedores de corazon en funcion de las vidas del jugador
    if (LIVE_SECONDPLAYER==4) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_full.png";
        corazontre.src="img/heart_full.png";
        corazondo.src="img/heart_full.png";
        corazonun.src="img/heart_full.png";
    }
    if (LIVE_SECONDPLAYER==3) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_empty.png";
        corazontre.src="img/heart_full.png";
        corazondo.src="img/heart_full.png";
        corazonun.src="img/heart_full.png";
    }
    if (LIVE_SECONDPLAYER==2) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_empty.png";
        corazontre.src="img/heart_empty.png";
        corazondo.src="img/heart_full.png";
        corazonun.src="img/heart_full.png";
    }
    if (LIVE_SECONDPLAYER==1) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_empty.png";
        corazontre.src="img/heart_empty.png";
        corazondo.src="img/heart_empty.png";
        corazonun.src="img/heart_full.png";
    }
    if (LIVE_SECONDPLAYER==0) {
        corazoncin.src="img/heart_empty.png";
        corazoncua.src="img/heart_empty.png";
        corazontre.src="img/heart_empty.png";
        corazondo.src="img/heart_empty.png";
        corazonun.src="img/heart_empty.png";
        // Cambia el texto de victoria del bloque de victoria
        document.getElementById("cong").innerHTML = "El jugador 1 gano el juego";
        Win(POINTS_FRISTPLAYER)
    }
}

// Funcion que pasandole un elemento, un eje x y un eje y, posiciona eso en pantalla
function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}

// Funcion para crear los enemigos
function createEnemies($container) {
    // Variables para saber cuantas filas y columnas generar
    const enemyRows = 4;
    const enemyCols = 5;
    // Variables para poner espacio entre ellos
    const horizontalSpacing = 10;
    const verticalSpacing = 10;
    // Variable para una posicion inicial
    const initialY = 50;
    const initialX = 50;

    // Bucle para generar los enemigos
    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            // Añade enemigo al escenario de juego con un .gif
            const $enemy = document.createElement("img");
            $enemy.src = "img/enemy.gif";
            $enemy.className = "enemy";
            // Calculamos donde se debera posicionar el enemigo
            const xPos = initialX + col * (ENEMY_WIDTH + horizontalSpacing);
            const yPos = initialY + row * (ENEMY_HEIGHT + verticalSpacing);
            $container.appendChild($enemy);
            // Posicionamos al enemigo
            setPosition($enemy, xPos, yPos);
            // Añadimos el enemigo al array de 'enemies' de 'GAME_STATE' con valores dentro de él
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

// Funcion para el movimiento de los enemigos
function moveEnemies() {
    // Boolean para saber si toca cambiar direccion
    let changeDirection = false;

    // Bucle para mover a los enemigos
    GAME_STATE.enemies.forEach((enemy) => {
        // Operacion para mover a los enemigos saber donde posicionar al enemigo
        enemy.x += GAME_STATE.enemySpeed * GAME_STATE.enemyDirection;

        // Si uno de los enemigos llega a una boundarie pone el boolean 'changeDirection' a true
        if (enemy.x >= GAME_WIDTH - ENEMY_WIDTH || enemy.x <= 30) {
            changeDirection = true;
        }

        // Posiciona al enemigo
        setPosition(enemy.element, enemy.x, enemy.y);
    });

    // Si 'changeDirection' es 'true' hace que los enemigos vayan hacia el lado contrario
    if (changeDirection) {
        GAME_STATE.enemyDirection = -GAME_STATE.enemyDirection;
    }
}

// Funcion para el disparo de los enemigos
function enemyShoot($container) {
    // Calcula cuantos enemigos estan vivos
    const aliveEnemies = GAME_STATE.enemies.filter(e => e.alive);
    // Si no hay ninguno vivo la funcion termina
    if (aliveEnemies.length === 0) return;
    // Elige que enemigo va a disparar
    const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    // Instancia el laser en el terreno de juego
    const $laser = document.createElement("div");
    $laser.className = "enemy-laser";
    $container.appendChild($laser);

    // Calcula donde debe posicionarse el laser
    const laserX = shooter.x + ENEMY_WIDTH / 2 - 2.5;
    const laserY = shooter.y + ENEMY_HEIGHT;
    // Añade el laser al Array de 'enemyBullets' dentro de 'GAME_STATE'
    GAME_STATE.enemyBullets.push({
        element: $laser,
        x: laserX,
        y: laserY,
    });
    // Posicionamos el laser
    setPosition($laser, laserX, laserY);
}

// Funcion para mover las balas de los enemigos
function moveEnemyBullets() {
    // Loop calcular donde debera posicionarse el eje Y de cada laser de los enemigos
    GAME_STATE.enemyBullets.forEach((laser, index) => {
        laser.y += BULLET_SPEED;

        if (laser.y > GAME_HEIGHT) { // Si la bala sale del area de juego se destruira y se eliminara del Array de 'enemyBullets'
            laser.element.remove();
            GAME_STATE.enemyBullets.splice(index, 1);
        } else {
            // Posicionamos el laser de los enemigos
            setPosition(laser.element, laser.x, laser.y);
        }
    });
}

// Funcion para actualizar la posicion de los jugadores
function updatePlayerPosition() {
    // Si gameOver esta activado sale de la funcion
    if (GAME_STATE.gameOver) return;
    // Calcula donde debe posicionarse las X de los jugadores
    GAME_STATE.playerX += GAME_STATE.velocityX;
    GAME_STATE.playerX2 += GAME_STATE.velocityX2;
    
    // Si la X del jugador 1 se sale del area de juego la vuelve a meter dentro del area
    if (GAME_STATE.playerX < 0) {
        GAME_STATE.playerX = 0;
    }
    if (GAME_STATE.playerX > GAME_WIDTH - 50) {
        GAME_STATE.playerX = GAME_WIDTH - 50;
    }

    // Selecciona al jugador 1 y lo posiciona
    const $player = document.querySelector(".player");
    if ($player) {
        setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    }

    // Si la X del jugador 2 se sale del area de juego la vuelve a meter dentro del area
    if (GAME_STATE.playerX2 < 0) {
        GAME_STATE.playerX2 = 0;
    }
    if (GAME_STATE.playerX2 > GAME_WIDTH - 50) {
        GAME_STATE.playerX2 = GAME_WIDTH - 50;
    }

    // Selecciona al jugador 2 y lo posiciona
    const $player2 = document.querySelector(".player2");
    if ($player2) {
        setPosition($player2, GAME_STATE.playerX2, GAME_STATE.playerY2);
    }
}

// Funcion para crear las balas del jugador 1
function createBullet($container) {
    // Creamos una bala, le ponemos una clase y la añadimos al terreno de juego
    const $bullet = document.createElement("div");
    $bullet.className = "bullet";
    $container.appendChild($bullet);

    // Averiguamos donde estara la posicion inicial de la bala
    const bulletX = GAME_STATE.playerX + 22;
    const bulletY = GAME_STATE.playerY;

    // Añade la bala generada dentro del Array de 'bullets' dentro de 'GAME_STATE'
    GAME_STATE.bullets.push({
        element: $bullet,
        x: bulletX,
        y: bulletY,
    });

    // Posicionamos la bala en el lugar indicado
    setPosition($bullet, bulletX, bulletY);
}

// Funcion para crear las balas del jugador 2
function createBullet2($container) {
    // Creamos una bala, le ponemos una clase y la añadimos al terreno de juego
    const $bullet = document.createElement("div");
    $bullet.className = "bullet2";
    $container.appendChild($bullet);

    // Averiguamos donde estara la posicion inicial de la bala
    const bulletX = GAME_STATE.playerX2 + 22;
    const bulletY = GAME_STATE.playerY2;

    // Añade la bala generada dentro del Array de 'bullets2' dentro de 'GAME_STATE'
    GAME_STATE.bullets2.push({
        element: $bullet,
        x: bulletX,
        y: bulletY,
    });

    setPosition($bullet, bulletX, bulletY);
}

// Funcion para mover las balas
function moveBullets() {
    // Loop para las balas del jugador 1
    GAME_STATE.bullets.forEach((bullet, index) => {
        bullet.y -= BULLET_SPEED;
        if (bullet.y < 0) {
            bullet.element.remove();
            GAME_STATE.bullets.splice(index, 1);
        } else {
            setPosition(bullet.element, bullet.x, bullet.y);
        }
    });

    // Loop para las balas del jugador 2
    GAME_STATE.bullets2.forEach((bullet, index) => {
        bullet.y -= BULLET_SPEED;
        if (bullet.y < 0) {
            bullet.element.remove();
            GAME_STATE.bullets2.splice(index, 1);
        } else {
            setPosition(bullet.element, bullet.x, bullet.y);
        }
    });
}

// Funcion para revisar la colision de todas las balas de todas las entidades
function checkBulletCollision() {
    // Loop para saber si la bala del jugador 1 ha colisionado con un enemigo
    GAME_STATE.bullets.forEach((bullet, bulletIndex) => {
        GAME_STATE.enemies.forEach((enemy) => {
            if (enemy.alive &&
                bullet.x < enemy.x + ENEMY_WIDTH &&
                bullet.x + BULLET_WIDTH > enemy.x &&
                bullet.y < enemy.y + ENEMY_HEIGHT &&
                bullet.y + BULLET_HEIGHT > enemy.y) {

                // Añade la clase 'dead' al enemigo
                enemy.alive = false;
                enemy.element.classList.add("dead");

                // Quita la bala del array de 'bullets' dentro de 'GAME_STATE'
                bullet.element.remove();
                GAME_STATE.bullets.splice(bulletIndex, 1);

                // Sumar 1 punto
                POINTS_FRISTPLAYER = POINTS_FRISTPLAYER + 1;
                
                // Modifica el texto de Player 1 para actualizar la puntuacion
                document.getElementById("pun1").innerHTML = "Player 1: " + POINTS_FRISTPLAYER;

                // Revivimos al enemigo pasado 2 segundos
                setTimeout(() => {
                    enemy.alive = true;
                    enemy.element.classList.remove("dead");
                }, 2000);
            }
        });
    });

    // Loop para saber si la bala del jugador 2 ha colisionado con un enemigo
    GAME_STATE.bullets2.forEach((bullet, bulletIndex) => {
        GAME_STATE.enemies.forEach((enemy) => {
            if (enemy.alive &&
                bullet.x < enemy.x + ENEMY_WIDTH &&
                bullet.x + BULLET_WIDTH > enemy.x &&
                bullet.y < enemy.y + ENEMY_HEIGHT &&
                bullet.y + BULLET_HEIGHT > enemy.y) {

                // Añade la clase 'dead' al enemigo
                enemy.alive = false;
                enemy.element.classList.add("dead");
                
                // Sumar 1 punto
                POINTS_SECONDPLAYER = POINTS_SECONDPLAYER + 1;
                // Modifica el texto de Player 1 para actualizar la puntuacion
                document.getElementById("pun2").innerHTML = "Player 2: " + POINTS_SECONDPLAYER;
                
                // Quita la bala del array de 'bullets2' dentro de 'GAME_STATE'
                bullet.element.remove();
                GAME_STATE.bullets2.splice(bulletIndex, 1);

                // Revivimos al enemigo pasado 2 segundos
                setTimeout(() => {
                    enemy.alive = true;
                    enemy.element.classList.remove("dead");
                }, 2000);
            }
        });
    });

    // Loop para saber si la bala de un enemigo ha colisionado con un jugador
    GAME_STATE.enemyBullets.forEach((bullet, bulletIndex) => {
        if (bullet.x < GAME_STATE.playerX + 42 &&
            bullet.x + BULLET_WIDTH > GAME_STATE.playerX &&
            bullet.y < GAME_STATE.playerY + 42 &&
            bullet.y + BULLET_HEIGHT > GAME_STATE.playerY) {
                
            // Quita la bala del array de 'enemyBullets' dentro de 'GAME_STATE'
            bullet.element.remove();
            GAME_STATE.enemyBullets.splice(bulletIndex, 1);
            // Resta vida al jugador 1
            LIVE_FRISTPLAYER= LIVE_FRISTPLAYER-1;
        }
        
        if (bullet.x < GAME_STATE.playerX2+ 42 &&
            bullet.x + BULLET_WIDTH > GAME_STATE.playerX2 &&
            bullet.y < GAME_STATE.playerY2 + 42 &&
            bullet.y + BULLET_HEIGHT > GAME_STATE.playerY2) {
                
            // Quita la bala del array de 'enemyBullets' dentro de 'GAME_STATE'
            bullet.element.remove();
            GAME_STATE.enemyBullets.splice(bulletIndex, 1);
            // Resta vida al jugador 2
            LIVE_SECONDPLAYER= LIVE_SECONDPLAYER-1;
        }
    });
}

// Funcion el Loop de juego (funciones que se ejecutaran cada frame)
function gameLoop() {
    // Si el jugador 1 llega a 100 puntos se muestra la pantalla de victoria con el mensaje correspondiente
    if (POINTS_FRISTPLAYER == 100) {
        document.getElementById("cong").innerHTML = "El jugador 1 gano el juego";
        Win(POINTS_FRISTPLAYER);
        return;
    }
    // Si el jugador 2 llega a 100 puntos se muestra la pantalla de victoria con el mensaje correspondiente
    if (POINTS_SECONDPLAYER == 100) {
        document.getElementById("cong").innerHTML = "El jugador 2 gano el juego";
        Win(POINTS_SECONDPLAYER);
        return;
    }
    // Funciones que se ejecutan cada frame
    updatePlayerPosition();
    moveEnemies();
    moveEnemyBullets();
    moveBullets();
    checkBulletCollision();
    vidajugador1();
    vidajugador2();

    requestAnimationFrame(gameLoop);
}

// Funcion para mostrar la pantalla de game over
function showGameOver() {
    const gameOverDiv = document.querySelector(".game-over");
    gameOverDiv.style.display = "block";
}

// Funciones que se ejecutan al iniciar la pagina
function init() {
    const $container = document.querySelector(".game");
    createPlayer($container);
    createEnemies($container);
    requestAnimationFrame(gameLoop);
    setInterval(() => {
        const $container = document.querySelector(".game");
        enemyShoot($container);
    }, 800);
}

// Funcion para cuando se presiona una tecla
function onKeyDown(e) {
    if (e.keyCode === KEY_CODE_LEFT && GAME_STATE.velocityX >= 0) {
        GAME_STATE.velocityX = -GAME_STATE.speed;
    } else if (e.keyCode === KEY_CODE_RIGHT && GAME_STATE.velocityX <= 0) {
        GAME_STATE.velocityX = GAME_STATE.speed;
    } else if (e.keyCode === KEY_CODE_SPACE) {
        const $container = document.querySelector(".game");
        createBullet($container);
    }

    if (e.keyCode === KEY_CODE_LEFT2 && GAME_STATE.velocityX2 >= 0) {
        GAME_STATE.velocityX2 = -GAME_STATE.speed;
    } else if (e.keyCode === KEY_CODE_RIGHT2 && GAME_STATE.velocityX2 <= 0) {
        GAME_STATE.velocityX2 = GAME_STATE.speed;
    } else if (e.keyCode === KEY_CODE_ZERO) {
        const $container = document.querySelector(".game");
        createBullet2($container);
    }
}

// Funcion para cuando una tecla se deja de presionar
function onKeyUp(e) {
    if (e.keyCode === KEY_CODE_LEFT || e.keyCode === KEY_CODE_RIGHT) {
        if (e.keyCode === KEY_CODE_LEFT && GAME_STATE.velocityX < 0) {
            GAME_STATE.velocityX = 0;
        } else if (e.keyCode === KEY_CODE_RIGHT && GAME_STATE.velocityX > 0) {
            GAME_STATE.velocityX = 0;
        }
    }

    if (e.keyCode === KEY_CODE_LEFT2 || e.keyCode === KEY_CODE_RIGHT2) {
        if (e.keyCode === KEY_CODE_LEFT2 && GAME_STATE.velocityX2 < 0) {
            GAME_STATE.velocityX2 = 0;
        } else if (e.keyCode === KEY_CODE_RIGHT2 && GAME_STATE.velocityX2 > 0) {
            GAME_STATE.velocityX2 = 0;
        }
    }
}

// Declaracion de listeners
document.addEventListener('DOMContentLoaded', init); // Cuando se carga la pagina inicia la funcion 'init'
document.addEventListener('keydown', onKeyDown); // Cuando se presione una tecla haz la funcion 'onKeyDown'
document.addEventListener('keyup', onKeyUp); // Cuando se deje de presionar una tecla haz la funcion 'onKeyUp'
