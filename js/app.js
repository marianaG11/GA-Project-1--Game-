
//constants
const cards = Array.from(document.querySelectorAll('.cards'));
cards.forEach((card)=> {
    card.style.pointerEvents = 'none'; //to avoid user clicking on card before mixing 
});

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
let winOrLoseEl = document.querySelector('#win-lose');

//add event listeners
document.querySelector('#begin').addEventListener('click', begin); 
document.querySelector('#start-over').addEventListener('click', startOver);
startOverBtn.addEventListener('click', startOver);
beginBtn.addEventListener('click', begin);
cards.forEach(function(card) {     //to flip cards
    card.addEventListener('click', flip);
});

//begin function starts the timer and shuffles the cards
function begin() { 
    mixCards();
    cards.forEach((card)=> {
        card.style.pointerEvents = 'auto';
    });
    startTimer(seconds);
}

//flip function flips each card when they are clicked
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

//doCardsMatch checks if the cards match correctly
function doCardsMatch(firstImage, secondImage){
    let firstCardAttribute = firstImage.getAttribute('data-id'); //create elements to compare the 2 current cards
    let secondCardAttribute = secondImage.getAttribute('data-id');
    if (firstCardAttribute === secondCardAttribute) {
        matchedSoFar.push(firstCardAttribute);
        matchedSoFar.push(secondCardAttribute); //pushes cards into matched so far array
        previousCard = null;  // null is a falsey data type
        matchedCards++;
    }else if (firstCardAttribute !== secondCardAttribute){
        setTimeout(() => {
            firstImage.classList.remove('flip');   //flip back around to show question mark
            secondImage.classList.remove('flip');
            previousCard= null;
            }, 800);
        }
};
    
//startTimer begins the countdown
function startTimer(total){
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

//resetTimer resets the seconds to 30 again
function resetTimer() {
    seconds = 30;
    countdownEl.innerText = '30';
    clearInterval(interval);
}

//startOver calls mixCards function to shuffle the cards again and it also resets the timer
function startOver() {
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

//shuffles cards 
function mixCards(){
    matchedCards = 0;
    currentCard = previousCard = "";
    for (let i=0; i < cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[i].style.order = randomIndex; 
    }
}







