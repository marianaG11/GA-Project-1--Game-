console.log('this is working');

//constants
const cards = Array.from(document.querySelectorAll('.cards'));
console.log(cards);

//state variables 
let guessedSoFar = [];
let flippedYet; 
let previousCard; 

const beginBtn = document.querySelector('#begin');
// const startOverBtn = document.querySelector.addEventListener('click', )('#start-over'); what to add inside addeventlistener



const flip = function(e){
    let currentCard = e.target;
    currentCard.classList.toggle('flip');
    if (previousCard){
     doCardsMatch(currentCard, previousCard);  
    } else {
        previousCard = currentCard;
        
    }
 }
//flip(); //doesnt work when i call the function
 
const doCardsMatch = function(firstImage, secondImage){
    let firstCardAttribute = firstImage.getAttribute('data-id'); //create elements to compare the 2 current cards
    let secondCardAttribute = secondImage.getAttribute('data-id');
        if (firstCardAttribute === secondCardAttribute) {
            console.log('matched');
            previousCard = null;  // null is a falsey data type
        }else if (firstCardAttribute !== secondCardAttribute){
            console.log('card is not a match');
            setTimeout(() => {
                firstImage.classList.remove('flip');   //flip back around to show question mark . add unflip function
                secondImage.classList.remove('flip');
                previousCard= null;
            }, 1000);
            
        }
    };


const unflip = function(){
//unflip cards that do not match, but keep cards that are matched facing up
    currentCard.classList.remove('flip');
};

//timer

//matched so far //use array and .push


//shuffle
cards.forEach(function(card) {     //to flip cards
    card.addEventListener('click', flip);
});

const begin = function() { ///chnage to init?    //beginBtndocument.querySelector('#begin').addEventListener('click', init)
    console.log('game has begun');
    } //same as init 
const startOver = function() {
     console.log('game will start over');
    }
const startTimer = function(){
    console.log('timer started');
}//same as begin 
const noTime = function(){
    console.log('no timer');
}
let mixCards = function(){
    console.log('cards will be shuffled');
}

document.querySelector('#begin').addEventListener('click', begin); //for begin and start over buttons
document.querySelector('#start-over').addEventListener('click', startOver);


document.querySelector('#start-time').addEventListener('click', startTimer); //for tine options
document.querySelector('#no-time').addEventListener('click', noTime);

document.querySelector('#footer').addEventListener('click', mixCards);   //to mix cards

//change these to add the element made . beginBtn.addEventListener('click' init);



