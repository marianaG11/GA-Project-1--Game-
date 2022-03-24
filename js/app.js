console.log('this is working');

//constants
const cards = Array.from(document.querySelectorAll('.cards'));
cards.forEach((card)=> {
    card.style.pointerEvents = 'none'; //to avoid user clicking on card before mixing 
});
console.log(cards);

//state variables 
let previousCard; 
let matchedCards = 0;
let matchedSoFar = []; // array use correct match using push //didnt use
const beginBtn = document.querySelector('#begin');
const startOverBtn = document.querySelector('#start-over');
// const startOverBtn = document.querySelector.addEventListener('click', )('#start-over'); //what to add inside addeventlistener
// beginBtn.addEventListener('click', begin); //for begin and start over buttons
// const cardsBack = Array.from(document.querySelector('.back')); need for start over?

// timer function not working - it doesnt show and it also does not stop in the console
let time = 30;
// let intervalId;
let countdownEl = document.querySelector('#countdown');
let startTimer = function(){
    console.log(time)
    countdownEl.innerText = time;
    console.log('timer started');
    if (time > 0) {
       time--;
    }else {
        clearInterval(startTimer);
    }
} 

// if (secondsLeft< 0 ) {
// clearInterval(startTimer);
// document.getElementById('#message').innerHTML = 'TIME IS OVER!'
//     }       
// }, 1000)




const startOver = function() {
    console.log('game will start over');
    cards.forEach(function(card){
       card.classList.remove('flip');
    });
   }
   startOverBtn.addEventListener('click', startOver);


const begin = function() { 
    mixCards();
    console.log('game has begun');
    cards.forEach((card)=> {
        card.style.pointerEvents = 'auto';
    });
    // startOver(); //trying to get cards to be covered again before mixing 
    setInterval(startTimer, 1000); 
    }

beginBtn.addEventListener('click', begin);
const flip = function(e){
    let currentCard = e.target;
    currentCard.classList.toggle('flip');
    if (previousCard){
     doCardsMatch(currentCard, previousCard); 
    //  showWinningMessage();
    } else {
        previousCard = currentCard;
        
    }
 }

 
const doCardsMatch = function(firstImage, secondImage){
    let firstCardAttribute = firstImage.getAttribute('data-id'); //create elements to compare the 2 current cards
    let secondCardAttribute = secondImage.getAttribute('data-id');
        if (firstCardAttribute === secondCardAttribute) {
            console.log('matched');
            matchedSoFar.push(firstCardAttribute);
            matchedSoFar.push(secondCardAttribute); //pushes cards into matched so far array
            previousCard = null;  // null is a falsey data type
            matchedCards++;
            if(matchedCards === 6){
               setTimeout(() => {
                return mixCards();
               }, 1000);
            }
        }else if (firstCardAttribute !== secondCardAttribute){
            console.log('card is not a match');
            setTimeout(() => {
                firstImage.classList.remove('flip');   //flip back around to show question mark . add unflip function
                secondImage.classList.remove('flip');
                previousCard= null;
            }, 800);
        }
    };

const messageEl = document.querySelector('#message');
const showWinningMessage = function() {
    if (matchedSoFar.length === cards.length){
        messageEl.innerText = "YOU WON!"
    }
}
showWinningMessage();
//maybe add a text element in the html, so that the message shows up //or maybe show the message at the bottom
//add instructions on the right side


function init(e){
    console.log('im working');
}
init(); 
// const startOver = function() {
//      console.log('game will start over');
//      cards.forEach(function(card){
//         card.classList.remove('flip');
//      });
//     }
//     startOverBtn.addEventListener('click', startOver);


let mixCards = function(){
    console.log('cards will be shuffled');
    matchedCards = 0;
    currentCard = previousCard = "";
    for (let i=0; i < cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[i].style.order = randomIndex; 
    }
}

cards.forEach(function(card) {     //to flip cards
    card.addEventListener('click', flip);
});

document.querySelector('#begin').addEventListener('click', begin); //for begin and start over buttons
document.querySelector('#start-over').addEventListener('click', startOver);
// document.querySelector('#start-time').addEventListener('click', startTimer); //for tine options
// document.querySelector('#no-time').addEventListener('click', noTime);




