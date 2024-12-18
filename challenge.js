let counter = 0;
let timerId = null;
let isPaused = false;

const counterElement = document.getElementById("counter");
const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");
const heartButton = document.getElementById("heart");
const pauseButton = document.getElementById("pause");
const likesList = document.getElementById("likes");
const commentForm = document.getElementById("comment-form");
const commentsDiv = document.getElementById("comments");

// Function to update the counter display
function updateCounterDisplay() {
  counterElement.textContent = counter;
}

// Function to start the timer
function startTimer() {
  timerId = setInterval(() => {
    counter++;
    updateCounterDisplay();
  }, 1000);
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

// Start the timer when the page loads
startTimer();

// Event listener for the minus button
minusButton.addEventListener("click", () => {
  counter--;
  updateCounterDisplay();
});

// Event listener for the plus button
plusButton.addEventListener("click", () => {
  counter++;
  updateCounterDisplay();
});

// Event listener for the heart button
heartButton.addEventListener("click", () => {
  const existingLike = document.querySelector(`[data-number="${counter}"]`);
  if (existingLike) {
    const likeCount = parseInt(existingLike.dataset.count, 10) + 1;
    existingLike.dataset.count = likeCount;
    existingLike.textContent = `${counter} has been liked ${likeCount} times`;
  } else {
    const newLike = document.createElement("li");
    newLike.dataset.number = counter;
    newLike.dataset.count = 1;
    newLike.textContent = `${counter} has been liked 1 time`;
    likesList.appendChild(newLike);
  }
});

// Event listener for the pause button
pauseButton.addEventListener("click", () => {
  if (isPaused) {
    startTimer();
    pauseButton.textContent = "Pause";
    minusButton.disabled = false;
    plusButton.disabled = false;
    heartButton.disabled = false;
    commentForm.querySelector("button").disabled = false;
  } else {
    stopTimer();
    pauseButton.textContent = "Resume";
    minusButton.disabled = true;
    plusButton.disabled = true;
    heartButton.disabled = true;
    commentForm.querySelector("button").disabled = true;
  }
  isPaused = !isPaused;
});

// Event listener for the comment form
commentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const commentInput = document.getElementById("comment-input");
  const comment = document.createElement("p");
  comment.textContent = commentInput.value;
  commentsDiv.appendChild(comment);
  commentInput.value = "";
});
