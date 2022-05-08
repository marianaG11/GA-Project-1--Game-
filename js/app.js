
//constants
const cards = Array.from(document.querySelectorAll('.cards')); //create an array of all elements containing the class of ".cards"
cards.forEach((card)=> {
    card.style.pointerEvents = 'none'; //to avoid user clicking on card before mixing 
});

//state variables, define variables here
let previousCard; 
let matchedCards = 0;
let matchedSoFar = []; //assign matchedSoFar to an empty array
let total = 0;
let seconds = 30; //define the time limit the user has

//cached, define the JS variables using querySelector
const beginBtn = document.querySelector('#begin');
const startOverBtn = document.querySelector('#start-over');
const countdownEl = document.querySelector('#countdown');
let winOrLoseEl = document.querySelector('#win-lose');

//add event listeners, addEventListener function takes two parameters, the name of the event ('click') and the callback function that gets called when the button is clicked
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
    startTimer(seconds); //the startTimer function gets called
}

//flip function flips each card when they are clicked
function flip(e){
    let currentCard = e.target; //e.target represents which element triggered the event
        currentCard.classList.toggle('flip'); //toggle, to switch between flip or un-flip
    if (previousCard){ //if previous card is true
         doCardsMatch(currentCard, previousCard); //run doCardsMatch function to see if currentCard and previousCard match
    } else {
        previousCard = currentCard; 
    }
    showMessage(); //once all cards are matched, run showMessage() function to say 'you won!'
}

//doCardsMatch checks if the cards match correctly
function doCardsMatch(firstImage, secondImage){
    let firstCardAttribute = firstImage.getAttribute('data-id'); //create elements to compare the 2 current cards
    let secondCardAttribute = secondImage.getAttribute('data-id');
    if (firstCardAttribute === secondCardAttribute) {
        matchedSoFar.push(firstCardAttribute);
        matchedSoFar.push(secondCardAttribute); //pushes cards into matched so far array
        previousCard = null;  // null is a falsey data type
        matchedCards++; //matchedCards goes up by 1
    }else if (firstCardAttribute !== secondCardAttribute){
        setTimeout(() => { //setTimeout calls a function after a specified number of milliseconds; in this case after 800 ms
            firstImage.classList.remove('flip');   //flip back around to show question mark
            secondImage.classList.remove('flip');
            previousCard= null;
            }, 800);
        }
};
    
//startTimer begins the countdown
function startTimer(total){
    beginBtn.style.display = 'none'; //remove the beginBtn to avoid time glitches
    interval = setInterval(() => {
     total--; //total-- counts down by 1
     update(total);
     if (total <= 0) {
        interval = clearInterval(interval); //clears the timer; avoids timer going to negatives
        winOrLoseEl.innerText = "YOU LOST!" //show the 'you lost' message
    }
  }, 1000) //displays the time once every second 1000ms = 1s
}

//update the time which shows on the left side of the game, the user can see the countdown
function update(total) {
    const seconds = total % 60;
    countdownEl.innerText = seconds; //innerText updates the time on the screen
}

//resetTimer resets the seconds to 30 again
function resetTimer() {
    seconds = 30;
    countdownEl.innerText = '30'; //show the text of '30' again on the screen
    clearInterval(interval); 
}

//startOver calls mixCards function to shuffle the cards again and it also resets the timer
function startOver() {
    beginBtn.style.display = ''; //begin button shows up again when the user clicks the start over button
    cards.forEach(function(card){
       card.classList.remove('flip'); //flip cards back to show the question mark and hide the image
    });
    matchedCards =0;
    matchedSoFar= []; //the matchedSoFar array is empty again because the user reset the game
    mixCards(); //mix the cards again
    resetTimer(); //start the timer again
    winOrLoseEl.innerText=' '; //clear lose or win message
 }

//shows the 'you won' message once all cards are matched 
function showMessage() {
    if (matchedSoFar.length === cards.length){ //if the number of cards in the matchedSoFar array matches the amount of cards
        clearInterval(interval); //stop the timer
        winOrLoseEl.innerText = "YOU WON!" //display the 'you won' message to the user
    }
}
showMessage();

//shuffles cards 
function mixCards(){
    matchedCards = 0;
    currentCard = previousCard = "";
    for (let i=0; i < cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length); //creates a random order of the cards
        cards[i].style.order = randomIndex; 
    }
}







