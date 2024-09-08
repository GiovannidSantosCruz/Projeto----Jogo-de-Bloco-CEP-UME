const gameCanvas = document.getElementById('gameCanvas');
const player = document.getElementById('player');
let gameWidth = gameCanvas.clientWidth;
let playerWidth = player.offsetWidth;
let playerHeight = player.offsetHeight;
let playerPosition = gameWidth / 2 - playerWidth / 2;
let blockSpeed = 10; // Velocidade inicial de queda dos blocos

player.style.left = playerPosition + 'px';
player.style.bottom = '10px'; // posição inicial do jogador na parte inferior do canvas

document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowLeft":
            if (playerPosition > 0) {
                playerPosition -= 20;
                player.style.left = playerPosition + 'px';
            }
            break;
        case "ArrowRight":
            if (playerPosition < gameWidth - playerWidth) {
                playerPosition += 20;
                player.style.left = playerPosition + 'px';
            }
            break;
        case "ArrowUp":
            blockSpeed += 2; // Aumenta a velocidade dos blocos caindo
            break;
        case "ArrowDown":
            if (blockSpeed > 2) { // Impede que a velocidade se torne zero ou negativa
                blockSpeed -= 2;  // Diminui a velocidade dos blocos caindo
            }
            break;
    }
}

function spawnBlock() {
    let block = document.createElement('div');
    block.className = 'block';
    let blockPosition = Math.floor(Math.random() * (gameWidth - 30));
    block.style.left = blockPosition + 'px';
    block.style.top = '0px'; // Inicia no topo do canvas
    gameCanvas.appendChild(block);

    let blockInterval = setInterval(() => {
        let blockTop = parseInt(block.style.top.replace('px', '')) || 0;
        block.style.top = blockTop + blockSpeed + 'px'; // Usa a velocidade atualizada dos blocos

        // Verifica colisão
        if (blockTop + 30 >= gameCanvas.clientHeight - 40 && blockTop < gameCanvas.clientHeight) {
            let blockLeft = parseInt(block.style.left.replace('px', ''));
            if (blockLeft < playerPosition + playerWidth && blockLeft + 30 > playerPosition) {
                alert("Game Over!");
                clearInterval(blockInterval);
                window.location.reload(); // Reinicia o jogo
            }
        }

        if (blockTop > gameCanvas.clientHeight) {
            gameCanvas.removeChild(block);
            clearInterval(blockInterval);
        }
    }, 100);
}

