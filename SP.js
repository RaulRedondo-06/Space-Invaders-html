const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const ENEMY_WIDTH = 50;
const ENEMY_HEIGHT = 40;
const BULLET_WIDTH = 5;
const BULLET_HEIGHT = 10;
const BULLET_SPEED = 7;

const KEY_CODE_LEFT = 65;
const KEY_CODE_RIGHT = 68;
const KEY_CODE_SPACE = 32;

const GAME_STATE = {
    playerX: GAME_WIDTH / 2,
    playerY: GAME_HEIGHT - 50,
    speed: 5,
    velocityX: 0,
    enemies: [],
    bullets: [],
    enemyBullets: [],
    enemySpeed: 2,
    enemyDirection: 1,
    gameOver: false,
};

function createPlayer($container) {
    const $player = document.createElement("img");
    $player.src = "img/player1.png";
    $player.className = "player";
    $container.appendChild($player);
    setPosition($player, GAME_STATE.playerX, GAME_STATE.playerY);
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

function enemyShoot($container) {
    const aliveEnemies = GAME_STATE.enemies.filter(e => e.alive);
    if (aliveEnemies.length === 0) return;

    const shooter = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
    const $laser = document.createElement("div");
    $laser.className = "enemy-laser";
    $container.appendChild($laser);

    const laserX = shooter.x + ENEMY_WIDTH / 2 - 2.5;
    const laserY = shooter.y + ENEMY_HEIGHT;
    GAME_STATE.enemyBullets.push({
        element: $laser,
        x: laserX,
        y: laserY,
    });

    setPosition($laser, laserX, laserY);
}

function moveEnemyBullets() {
    GAME_STATE.enemyBullets.forEach((laser, index) => {
        laser.y += BULLET_SPEED;

        if (laser.y > GAME_HEIGHT) {
            laser.element.remove();
            GAME_STATE.enemyBullets.splice(index, 1);
        } else {
            setPosition(laser.element, laser.x, laser.y);
        }
    });
}

function updatePlayerPosition() {
    if (GAME_STATE.gameOver) return;

    GAME_STATE.playerX += GAME_STATE.velocityX;

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

    updatePlayerPosition();
    moveEnemies();
    moveBullets(); // 👈 añadido
    moveEnemyBullets();
    checkBulletCollision(); // 👈 añadido

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
    setInterval(() => {
        const $container = document.querySelector(".game");
        enemyShoot($container);
    }, 800);
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
}

function onKeyUp(e) {
    if (e.keyCode === KEY_CODE_LEFT || e.keyCode === KEY_CODE_RIGHT) {
        if (e.keyCode === KEY_CODE_LEFT && GAME_STATE.velocityX < 0) {
            GAME_STATE.velocityX = 0;
        } else if (e.keyCode === KEY_CODE_RIGHT && GAME_STATE.velocityX > 0) {
            GAME_STATE.velocityX = 0;
        }
    }
}

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);
