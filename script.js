const cardsArray = 
['🍎', '🍇', '🍓', '🍍', '🥝', '🍒', '🍉'];

let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());
const board = document.querySelector('.game-board');
let firstCard = '', secondCard = '';
let lockBoard = false;
let matches = 0;
gameGrid.forEach(fruit => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.fruit = fruit;
    card.textContent = '';
    board.appendChild(card);
});
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.textContent = this.dataset.fruit;
    this.classList.add('flipped');
    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        checkForMatch();
    }
}
function checkForMatch() {
    let isMatch = firstCard.dataset.fruit === secondCard.dataset.fruit;
    isMatch ? disableCards() : unflipCards();
}
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
    matches++;
    if (matches === cardsArray.length) {
        document.getElementById('message').textContent = "You Win! 🎉";
    }
}
function unflipCards() {
    setTimeout(() => {
        firstCard.textContent = '';
        secondCard.textContent = '';
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}
function resetBoard() {
    [firstCard, secondCard, lockBoard] = ['', '', false];
}
document.querySelectorAll('.card').forEach(card => card.addEventListener('click', flipCard));
