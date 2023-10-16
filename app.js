let playerScore = 0;
let computerScore = 0;
const gameControls = document.querySelectorAll(".js-control-btn");

gameControls.forEach(btn => {
  btn.addEventListener("click", startGame);
});

function startGame(event) {
  const playerChoice = event.target.dataset.value;
  const computerChoice = getComputerChoice();
  const roundWinner = getRoundWinner(playerChoice, computerChoice);

  
  updateUI(computerChoice, playerChoice, roundWinner);
}

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)]; 
}

function updateUI(computerChoice, playerChoice, roundWinner) {
  updateChoicesUI(playerChoice, computerChoice);
  updateAnnouncementUI(roundWinner);
  updateScoresUI(roundWinner);
}

function updateScoresUI(roundWinner) {
  const playerScoreUI = document.querySelector(".js-player-score");
  playerScoreUI.textContent = playerScore;
  const computerScoreUI = document.querySelector(".js-computer-score");
  computerScoreUI.textContent = computerScore;

  if (playerScore === 5 || computerScore === 5) {
    endGame(roundWinner);
  }
}

function endGame(winner) {
  const modalDialog = document.querySelector(".dialog");
  modalDialog.showModal();

  const dialogWinner = document.querySelector(".js-dialog-winner");

  switch (winner) {
    case "player":
      dialogWinner.textContent = `Congratulations, you win!`;
      break;
    case "computer":
      dialogWinner.textContent = `Computer wins this time...`;
      break;
    default:
      dialogWinner.textContent = "Something went wrong... please refresh the page";
  }

  modalDialog.addEventListener("close", (e) => {
    if (!modalDialog.returnValue || modalDialog.returnValue === "restart") restartGame();
  });
}

function restartGame() {
  playerScore = 0;
  computerScore = 0;

  restartUI();
}

function restartUI() {
  const playerScoreUI = document.querySelector(".js-player-score");
  playerScoreUI.textContent = playerScore;
  const computerScoreUI = document.querySelector(".js-computer-score");
  computerScoreUI.textContent = computerScore;

  updateChoicesUI("question", "question");
}

function updateChoicesUI(player, computer) {
  const playerChoiceUI = document.querySelector(".js-player-choice");
  playerChoiceUI.src = `./images/${player}.svg`;

  const computerChoiceUI = document.querySelector(".js-computer-choice");
  computerChoiceUI.src = `./images/${computer}.svg`;
}

function updateAnnouncementUI(winner) {
  const winnerAnnouncement = document.querySelector(".js-round-winner");

  switch (winner) {
    case "player":
      winnerAnnouncement.textContent = "You win!";
      break;
    case "computer":
      winnerAnnouncement.textContent = "Computer wins!";
      break;
    case "draw":
      winnerAnnouncement.textContent = "It's a draw!";
      break;
  }
}

function getRoundWinner(player, computer) {
  let winner;

  if ((player === "rock" && computer === "scissors") ||
      (player === "paper" && computer === "rock") ||
      (player === "scissors" && computer === "paper")) {
      playerScore++;
      winner = "player";
  } else if (player === computer) {
      winner = "draw";
  } else {
      computerScore++;
      winner = "computer";
  }

  return winner;
}