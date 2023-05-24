let firstCard = null;
let secondCard = null;
let disableClick = false;
let totalPairs = 3;
let matchedPairs = 0;
let moves = 0;
let score = 0;
let startTime = null;
let timerInterval = null;

const setup = () => {
  $(".card").on("click", function () {
    if ($(this).hasClass("flip") || $(this).hasClass("disabled") || disableClick) {
      return;
    }

    if (!startTime) {
      startTimer();
    }

    moves++; // Increment moves
    $("#moves").text("Moves: " + moves); // Update the moves element

    $(this).toggleClass("flip");

    if (!firstCard) {
      firstCard = $(this);
    } else {
      secondCard = $(this);
      disableClick = true; // Disable further clicks during the comparison
      checkForMatch();
    }
  });

  totalPairs = $(".card").length / 2;
};

const startTimer = () => {
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTime, 1000);
};

const updateTime = () => {
  const currentTime = new Date().getTime();
  const elapsedTime = Math.floor((currentTime - startTime) / 1000);
  $("#time").text("Time: " + elapsedTime + "s");
};

const stopTimer = () => {
  clearInterval(timerInterval);
};

const checkForMatch = () => {
  const firstCardImgSrc = firstCard.find(".front_face img").attr("src");
  const secondCardImgSrc = secondCard.find(".front_face img").attr("src");

  if (firstCardImgSrc === secondCardImgSrc) {
    cardsMatched();
  } else {
    disableClick = true; // Disable further clicks during the comparison
    setTimeout(() => {
      firstCard.toggleClass("flip");
      secondCard.toggleClass("flip");
      resetCards();
    }, 1000);
  }
};

const cardsMatched = () => {
  firstCard.off("click");
  secondCard.off("click");
  resetCards();
  matchedPairs++;
  updateScore(); // Update the score
  updateMatches(); // Update the matches
  checkForWin();
};

const resetCards = () => {
  disableClick = false; // Enable card clicks after the comparison
  firstCard = null;
  secondCard = null;
};

const checkForWin = () => {
  if (matchedPairs === totalPairs) {
    // All pairs matched, trigger win event
    $(".card").off("click");
    stopTimer();
    $("#message").text("Congratulations! You won the game!"); // Update the message element
  }
};

const updateScore = () => {
  score += 100; // Increment the score by 100
  $("#score").text("Score: " + score); // Update the score element
};

const updateMatches = () => {
  $("#matches").text("Matches: " + matchedPairs + "/" + totalPairs); // Update the matches element
};

$(document).ready(setup);
