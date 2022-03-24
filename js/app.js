
//constants
const cards = Array.from(document.querySelectorAll('.cards'));
cards.forEach((card)=> {
    card.style.pointerEvents = 'none'; //to avoid user clicking on card before mixing 
});
console.log(cards);

//state variables 
let previousCard; 
let matchedCards = 0;
let matchedSoFar = []; 
let total = 0;
let seconds = 30;

//chached
const beginBtn = document.querySelector('#begin');
const startOverBtn = document.querySelector('#start-over');
const countdownEl = document.querySelector('#countdown');
let messageEl = document.querySelector('#message'); //add instructions 
let winOrLoseEl = document.querySelector('#win-lose');

//add event listeners
document.querySelector('#begin').addEventListener('click', begin); //for begin and start over buttons
document.querySelector('#start-over').addEventListener('click', startOver);
startOverBtn.addEventListener('click', startOver);
beginBtn.addEventListener('click', begin);
cards.forEach(function(card) {     //to flip cards
    card.addEventListener('click', flip);
});

function begin() { 
    mixCards();
    console.log('game has begun');
    cards.forEach((card)=> {
        card.style.pointerEvents = 'auto';
    });
    startTimer(seconds);
}

function flip(e){
    let currentCard = e.target;
        currentCard.classList.toggle('flip');
    if (previousCard){
         doCardsMatch(currentCard, previousCard); 
    } else {
        previousCard = currentCard;
    }
    showMessage();
}

function doCardsMatch(firstImage, secondImage){
    let firstCardAttribute = firstImage.getAttribute('data-id'); //create elements to compare the 2 current cards
    let secondCardAttribute = secondImage.getAttribute('data-id');
    if (firstCardAttribute === secondCardAttribute) {
        console.log('matched');
        matchedSoFar.push(firstCardAttribute);
        matchedSoFar.push(secondCardAttribute); //pushes cards into matched so far array
        previousCard = null;  // null is a falsey data type
        matchedCards++;
        }else if (firstCardAttribute !== secondCardAttribute){
        console.log('card is not a match');
        setTimeout(() => {
            firstImage.classList.remove('flip');   //flip back around to show question mark . add unflip function
            secondImage.classList.remove('flip');
            previousCard= null;
            }, 800);
        }
};
    

function startTimer(total){
    console.log(total)
    interval = setInterval(() => {
     total--;
     update(total);
     if (total <= 0) {
        interval = clearInterval(interval);
        winOrLoseEl.innerText = "YOU LOST!"
    }
  }, 1000)
}

function update(total) {
    const seconds = total % 60;
    countdownEl.innerText = seconds;
}

function resetTimer() {
    seconds = 30;
    countdownEl.innerText = '30';
    clearInterval(interval);
}

function startOver() {
    console.log('game will start over');
    cards.forEach(function(card){
       card.classList.remove('flip');
    });
    matchedCards =0;
    matchedSoFar= [];
    mixCards();
    resetTimer();
    winOrLoseEl.innerText=' ';
 }

function showMessage() {
    if (matchedSoFar.length === cards.length){
        clearInterval(interval); 
        winOrLoseEl.innerText = "YOU WON!"
    }
}
showMessage();

function mixCards(){
    console.log('cards will be shuffled');
    matchedCards = 0;
    currentCard = previousCard = "";
    for (let i=0; i < cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[i].style.order = randomIndex; 
    }
}







