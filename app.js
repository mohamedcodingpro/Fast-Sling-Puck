const player1Pucks = document.getElementById('player1-pucks');
const player2Pucks = document.getElementById('player2-pucks');
const player1Slot = document.getElementById('player1-slot');
const player2Slot = document.getElementById('player2-slot');
const restartBtn = document.getElementById('restart-btn');

const slingSound = new Audio("sounds/sling.mp3");
const winSound = new Audio("sounds/win.mp3");
const goalSound = new Audio("sounds/goal.mp3"); // Sound for scoring a goal

let player1Score = 0;
let player2Score = 0;
const puckCount = 5; // Each player starts with 5 pucks

// Create initial pucks for each player
function createPucks(player) {
    const puckContainer = player === 1 ? player1Pucks : player2Pucks;
    
    for (let i = 0; i < puckCount; i++) {
        const puck = document.createElement('div');
        puck.classList.add('puck');
        puck.setAttribute('data-player', player);
        puck.addEventListener('click', () => flickPuck(puck, player));
        puckContainer.appendChild(puck);
    }
}

// Flick puck towards the opponent's slot
function flickPuck(puck, player) {
    const opponentSlot = player === 1 ? player2Slot : player1Slot;
    
    slingSound.play();
    
    const moveX = opponentSlot.offsetLeft - puck.offsetLeft;
    const moveY = opponentSlot.offsetTop - puck.offsetTop;

    puck.style.transform = `translate(${moveX}px, ${moveY}px)`; 

    setTimeout(() => {
        puck.remove();
        goalSound.play(); // Play goal sound when puck is sent
        checkWinner();
        if (player === 1) setTimeout(aiMove, 1500); // AI moves after player
    }, 500);
}

// Check if any player has won
function checkWinner() {
    const player1PucksLeft = document.querySelectorAll("#player1-pucks .puck").length;
    const player2PucksLeft = document.querySelectorAll("#player2-pucks .puck").length;

    if (player1PucksLeft === 0) {
        player1Score++;
        document.getElementById("score1").innerText = player1Score;
        winSound.play();
        alert("🎉 Player 1 Wins!");
        resetGame();
    } else if (player2PucksLeft === 0) {
        player2Score++;
        document.getElementById("score2").innerText = player2Score;
        winSound.play();
        alert("🎉 Player 2 Wins!");
        resetGame();
    }
}

// AI player logic to move pucks
function aiMove() {
    if (document.querySelectorAll("#player2-pucks .puck").length === 0) return;

    setTimeout(() => {
        const aiPucks = document.querySelectorAll("#player2-pucks .puck");
        if (aiPucks.length === 0) return;

        const randomPuck = aiPucks[Math.floor(Math.random() * aiPucks.length)];
        flickPuck(randomPuck, 2);
    }, Math.random() * 2000 + 1000);
}

// Reset game function (clear pucks and scores)
function resetGame() {
    player1Pucks.innerHTML = '';
    player2Pucks.innerHTML = '';
    createPucks(1);
    createPucks(2);
    document.getElementById("score1").innerText = player1Score;
    document.getElementById("score2").innerText = player2Score;
}

// Event listener for the restart button to reset the game
restartBtn.addEventListener("click", resetGame);

// Initialize the game with pucks for both players
createPucks(1);
createPucks(2);
