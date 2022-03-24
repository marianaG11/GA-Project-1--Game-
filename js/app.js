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
let matchedSoFar = 0; // array use correct match using push
const beginBtn = document.querySelector('#begin');
const startOverBtn = document.querySelector('#start-over');
// const startOverBtn = document.querySelector.addEventListener('click', )('#start-over'); //what to add inside addeventlistener
// beginBtn.addEventListener('click', begin); //for begin and start over buttons
// const cardsBack = Array.from(document.querySelector('.back')); need for start over?

// const startingTime = 1;
// let time = startingTime * 60;
// const countdownEl=document.getElementById('countdown');

// const startTimer = function(){
//     const minutes = Math.floor(time / 60);
//     let seconds = time % 60;

//     seconds = seconds < 10 ? '0' + seconds : seconds
//     countdownEl.innerHTMl = `${minutes}: ${seconds}`;
//     time--;
//     console.log('timer started');
//     setInterval(startTimer, 1000); //same as 1 second
// } 

// const noTime = function(){
//     console.log('no timer');
// }

const begin = function() { 
    mixCards();
    console.log('game has begun');
    cards.forEach((card)=> {
        card.style.pointerEvents = 'auto';
    });
    // startTimer();
    }
beginBtn.addEventListener('click', begin);
const flip = function(e){
    let currentCard = e.target;
    currentCard.classList.toggle('flip');
    if (previousCard){
     doCardsMatch(currentCard, previousCard);  
    } else {
        previousCard = currentCard;
        
    }
 }

 
const doCardsMatch = function(firstImage, secondImage){
    let firstCardAttribute = firstImage.getAttribute('data-id'); //create elements to compare the 2 current cards
    let secondCardAttribute = secondImage.getAttribute('data-id');
        if (firstCardAttribute === secondCardAttribute) {
            console.log('matched');
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
            }, 1000);
            
        }
    };



function init(e){
    console.log('im working');
}
init(); 
const startOver = function() {
     console.log('game will start over');
     cards.forEach(function(card){
        card.classList.remove('flip');
     });
    }
    startOverBtn.addEventListener('click', startOver);


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




