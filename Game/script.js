let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameInterval;
let isGameOver = false;

document.getElementById('high-score').innerText = "High Score: " + highScore; 

document.getElementById('play-button').addEventListener('click', function() {
    const buttonClickSound = document.getElementById('button-click-sound');
    buttonClickSound.play(); // Play button click sound
    startGame();
});

function startGame() {
    document.querySelector('.box').style.display = 'none';
    document.getElementById('game-area').style.display = 'block';

    let character = document.getElementById('character');
    let gameArea = document.getElementById('game-area');
    let characterPositionX = gameArea.clientWidth / 2; 
    character.style.left = characterPositionX + 'px';
    
    document.addEventListener('keydown', function(event) {
        const step = 10; 
        if (event.key === 'ArrowRight') {
            characterPositionX += step; 
            if (characterPositionX + character.clientWidth > gameArea.clientWidth) {
                characterPositionX = gameArea.clientWidth - character.clientWidth; 
            }
        } else if (event.key === 'ArrowLeft') {
            characterPositionX -= step; 
            if (characterPositionX < 0) {
                characterPositionX = 0; 
            }
        }
        character.style.left = characterPositionX + 'px'; 
    });

    score = 0; 
    document.getElementById('score').innerText = "Score: 0"; 
    isGameOver = false; 
    gameInterval = setInterval(createObstacle, 1000); 
}

function createObstacle() {
    if (isGameOver) return;

    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = Math.random() * (document.getElementById('game-area').clientWidth - 50) + 'px';
    obstacle.style.top = '0px';
    document.getElementById('game-area').appendChild(obstacle);

    let obstacleFallInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleFallInterval);
            obstacle.remove();
            return;
        }
        
        let currentTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
        obstacle.style.top = (currentTop + 5) + 'px';

        if (currentTop > document.getElementById('game-area').clientHeight) {
            clearInterval(obstacleFallInterval);
            obstacle.remove();
            score++;
            document.getElementById('score').innerText = 'Score: ' + score;

            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
                document.getElementById('high-score').innerText = "High Score: " + highScore;
            }
        } else if (isCollision(character, obstacle)) {
            clearInterval(obstacleFallInterval);
            endGame();
        }
    }, 20);
}


function isCollision(character, obstacle) {
    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    
    if (
        !(characterRect.top > obstacleRect.bottom ||
        characterRect.bottom < obstacleRect.top ||
        characterRect.right < obstacleRect.left ||
        characterRect.left > obstacleRect.right)
    ) {
        const collisionSound = document.getElementById('collision-sound');
        collisionSound.play(); 
        return true;
    }
    return false;
}


function endGame() {
    isGameOver = true;
    
    document.getElementById('final-score').innerText = score;

    document.getElementById('game-over-modal').style.display = 'block';

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('high-score').innerText = "High Score: " + highScore;
    }
    
    isGameOver = true;
    playCollisionSound();
    clearInterval(gameInterval);
    score = 0; 
    document.getElementById('score').innerText = "Score: 0";
    document.querySelectorAll('.obstacle').forEach(obstacle => obstacle.remove());
}

document.getElementById('close-button').onclick = () => {
    document.getElementById('game-over-modal').style.display = 'none'; 
    document.querySelector('.box').style.display = 'block'; 
    document.getElementById('game-area').style.display = 'none'; 
    score = 0; 
};


document.getElementById('restart-button').onclick = function() {
    document.getElementById('game-over-modal').style.display = 'none';
    startGame();
};

var howToPlayModal = document.getElementById("howToPlayModal");
var quitModal = document.getElementById("quitModal");

var howToPlayBtn = document.getElementById("how-to-play-button");
var quitBtn = document.getElementById("quit-button");

var closeHowToPlay = document.getElementById("closeHowToPlay");
var closeQuit = document.getElementById("closeQuit");

howToPlayBtn.onclick = function() {
    howToPlayModal.style.display = "block";
}

closeHowToPlay.onclick = function() {
    howToPlayModal.style.display = "none";
}


quitBtn.onclick = function() {
    quitModal.style.display = "block";
}


closeQuit.onclick = function() {
    quitModal.style.display = "none";
}


document.getElementById('confirmQuit').addEventListener('click', function() {
    window.close(); 
});

document.getElementById('cancelQuit').addEventListener('click', function() {
    quitModal.style.display = "none"; 
});
window.onclick = function(event) {
    if (event.target == howToPlayModal) {
        howToPlayModal.style.display = "none";
    }
    if (event.target == quitModal) {
        quitModal.style.display = "none";
    }
}
function playButtonClickSound() {
    document.getElementById('button-click-sound').play();
}

function playCollisionSound() {
    document.getElementById('collision-sound').play();
}

document.getElementById('play-button').addEventListener('click', function() {
    playButtonClickSound();
    startGame();
});