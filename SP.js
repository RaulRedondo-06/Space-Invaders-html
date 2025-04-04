
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 40;
const BULLET_WIDTH = 5;
const BULLET_HEIGHT = 10;
const BULLET_SPEED = 7;
var POINTS_FRISTPLAYER = 0;
var POINTS_SECONDPLAYER = 0;
var LIVE_FRISTPLAYER = 5;
var LIVE_SECONDPLAYER = 5;

const KEY_CODE_LEFT = 65;
const KEY_CODE_RIGHT = 68;
const KEY_CODE_SPACE = 32;

const KEY_CODE_LEFT2 = 37;
const KEY_CODE_RIGHT2 = 39;
const KEY_CODE_ZERO = 96;

const GAME_STATE = {
    playerX: GAME_WIDTH / 2 - 100,
    playerY: GAME_HEIGHT - 50,
    playerX2: GAME_WIDTH / 2 + 100,
    playerY2: GAME_HEIGHT - 50,
    speed: 5,
    velocityX: 0,
    velocityX2: 0,
    enemies: [],
    bullets: [],
    bullets2: [],
    enemySpeed: 2,
    enemyDirection: 1,
    gameOver: false,
};

function createPlayer($container) {
    const $player = document.createElement("img");
    const $player2 = document.createElement("img");
    $player.src = "img/player1.png";
    $player2.src = "img/player2.png";
    $player.className = "player";
    $player2.className = "player2";
    $container.appendChild($player);
    $container.appendChild($player2);
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    setPosition($player2, GAME_STATE.playerX2, GAME_STATE.playerY2);
}

function Win(puntuacion)
{
    console.log(puntuacion);
    const win = document.querySelector(".congratulations");
    win.style.display = "block";
}

function vidajugador1()
{
    corazonun=document.getElementById("heart1_1");
    corazondo=document.getElementById("heart1_2");
    corazontre=document.getElementById("heart1_3");
    corazoncua=document.getElementById("heart1_4");
    corazoncin=document.getElementById("heart1_5");
    
    
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
        document.getElementById("cong").innerHTML = "El jugador 2 gano el juego";
        Win(POINTS_SECONDPLAYER)
    }
}

function vidajugador2()
{
    corazonun=document.getElementById("heart2_1");
    corazondo=document.getElementById("heart2_2");
    corazontre=document.getElementById("heart2_3");
    corazoncua=document.getElementById("heart2_4");
    corazoncin=document.getElementById("heart2_5");
    
    
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
        document.getElementById("cong").innerHTML = "El jugador 1 gano el juego";
        Win(POINTS_FRISTPLAYER)
    }
}



function setPosition($el, x, y) {
    $el.style.transform = `translate(${x}px, ${y}px)`;
}

function createEnemies($container) {
    const enemyRows = 4;
    const enemyCols = 5;
    const horizontalSpacing = 10;
    const verticalSpacing = 10;
    const initialY = 50;
    const initialX = 50;

    for (let row = 0; row < enemyRows; row++) {
        for (let col = 0; col < enemyCols; col++) {
            const $enemy = document.createElement("img");
            $enemy.src = "img/enemy.gif";
            $enemy.className = "enemy";

            const xPos = initialX + col * (ENEMY_WIDTH + horizontalSpacing);
            const yPos = initialY + row * (ENEMY_HEIGHT + verticalSpacing);
            $container.appendChild($enemy);
            setPosition($enemy, xPos, yPos);

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

function moveEnemies() {
    let changeDirection = false;

    GAME_STATE.enemies.forEach((enemy) => {
        enemy.x += GAME_STATE.enemySpeed * GAME_STATE.enemyDirection;

        if (enemy.x >= GAME_WIDTH - ENEMY_WIDTH || enemy.x <= 30) {
            changeDirection = true;
        }

        setPosition(enemy.element, enemy.x, enemy.y);
    });

    if (changeDirection) {
        GAME_STATE.enemyDirection = -GAME_STATE.enemyDirection;
    }
}

function updatePlayerPosition() {
    if (GAME_STATE.gameOver) return;

    GAME_STATE.playerX += GAME_STATE.velocityX;
    GAME_STATE.playerX2 += GAME_STATE.velocityX2;

    if (GAME_STATE.playerX < 0) {
        GAME_STATE.playerX = 0;
    }
    if (GAME_STATE.playerX > GAME_WIDTH - 50) {
        GAME_STATE.playerX = GAME_WIDTH - 50;
    }

    const $player = document.querySelector(".player");
    if ($player) {
        setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
    }

    if (GAME_STATE.playerX2 < 0) {
        GAME_STATE.playerX2 = 0;
    }
    if (GAME_STATE.playerX2 > GAME_WIDTH - 50) {
        GAME_STATE.playerX2 = GAME_WIDTH - 50;
    }

    const $player2 = document.querySelector(".player2");
    if ($player2) {
        setPosition($player2, GAME_STATE.playerX2, GAME_STATE.playerY2);
    }
}

// --- SISTEMA DE DISPARO ---
function createBullet($container) {
    const $bullet = document.createElement("div");
    $bullet.className = "bullet";
    $container.appendChild($bullet);

    const bulletX = GAME_STATE.playerX + 22;
    const bulletY = GAME_STATE.playerY;
    GAME_STATE.bullets.push({
        element: $bullet,
        x: bulletX,
        y: bulletY,
    });

    setPosition($bullet, bulletX, bulletY);
}

function createBullet2($container) {
    const $bullet = document.createElement("div");
    $bullet.className = "bullet2";
    $container.appendChild($bullet);

    const bulletX = GAME_STATE.playerX2 + 22;
    const bulletY = GAME_STATE.playerY2;
    GAME_STATE.bullets2.push({
        element: $bullet,
        x: bulletX,
        y: bulletY,
    });

    setPosition($bullet, bulletX, bulletY);
}

function moveBullets() {
    GAME_STATE.bullets.forEach((bullet, index) => {
        bullet.y -= BULLET_SPEED;
        if (bullet.y < 0) {
            bullet.element.remove();
            GAME_STATE.bullets.splice(index, 1);
        } else {
            setPosition(bullet.element, bullet.x, bullet.y);
        }
    });

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

function checkBulletCollision() {
    GAME_STATE.bullets.forEach((bullet, bulletIndex) => {
        GAME_STATE.enemies.forEach((enemy) => {
            if (enemy.alive &&
                bullet.x < enemy.x + ENEMY_WIDTH &&
                bullet.x + BULLET_WIDTH > enemy.x &&
                bullet.y < enemy.y + ENEMY_HEIGHT &&
                bullet.y + BULLET_HEIGHT > enemy.y) {

                // Apply "dead" class to the enemy (just visual)
                enemy.alive = false;
                enemy.element.classList.add("dead");

                // Remove bullet from game state
                bullet.element.remove();
                GAME_STATE.bullets.splice(bulletIndex, 1);

                //Sumar 1 punto

                POINTS_FRISTPLAYER = POINTS_FRISTPLAYER + 1;
                
                
                document.getElementById("pun1").innerHTML = "Player 1: " + POINTS_FRISTPLAYER;

                // "Revive" the enemy after 2 seconds
                setTimeout(() => {
                    enemy.alive = true;
                    enemy.element.classList.remove("dead");
                }, 2000);
            }
        });
    });

    GAME_STATE.bullets2.forEach((bullet, bulletIndex) => {
        GAME_STATE.enemies.forEach((enemy) => {
            if (enemy.alive &&
                bullet.x < enemy.x + ENEMY_WIDTH &&
                bullet.x + BULLET_WIDTH > enemy.x &&
                bullet.y < enemy.y + ENEMY_HEIGHT &&
                bullet.y + BULLET_HEIGHT > enemy.y) {

                // Apply "dead" class to the enemy (just visual)
                enemy.alive = false;
                enemy.element.classList.add("dead");

                POINTS_SECONDPLAYER = POINTS_SECONDPLAYER + 1;
                document.getElementById("pun2").innerHTML = "Player 2: " + POINTS_SECONDPLAYER;
                
                // Remove bullet from game state
                bullet.element.remove();
                GAME_STATE.bullets2.splice(bulletIndex, 1);

                // "Revive" the enemy after 2 seconds
                setTimeout(() => {
                    enemy.alive = true;
                    enemy.element.classList.remove("dead");
                }, 2000);
            }
        });
    });
}

function gameLoop() {
    if (GAME_STATE.gameOver) {
        showGameOver();
        return;
    }
    if (POINTS_FRISTPLAYER == 100) {
        document.getElementById("cong").innerHTML = "El jugador 1 gano el juego";
        Win(POINTS_FRISTPLAYER)
    }
    if (POINTS_SECONDPLAYER == 100) {
        document.getElementById("cong").innerHTML = "El jugador 2 gano el juego";
        Win(POINTS_SECONDPLAYER)
    }
    updatePlayerPosition();
    moveEnemies();
    moveBullets();
    checkBulletCollision();
    vidajugador1();
    vidajugador2();

    requestAnimationFrame(gameLoop);
}

function showGameOver() {
    const gameOverDiv = document.querySelector(".game-over");
    gameOverDiv.style.display = "block";
}

function init() {
    const $container = document.querySelector(".game");
    createPlayer($container);
    createEnemies($container);
    requestAnimationFrame(gameLoop);
}

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

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
