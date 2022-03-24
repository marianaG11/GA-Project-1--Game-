console.log('this is working');

//constants
const cards = Array.from(document.querySelectorAll('.cards'));
cards.forEach((card)=> {
    card.style.pointerEvents = 'none'; //to avoid user clicking on card before mixing 
});
console.log(cards);

//state variables 
let  = []; 
let previousCard; 
let matchedCards = 0;
let matchedSoFar = 0; // array use correct match using push
const beginBtn = document.querySelector('#begin');
const startOverBtn = document.querySelector('#start-over');
// const startOverBtn = document.querySelector.addEventListener('click', )('#start-over'); //what to add inside addeventlistener
// beginBtn.addEventListener('click', begin); //for begin and start over buttons
// const cardsBack = Array.from(document.querySelector('.back')); need for start over?
const begin = function() { 
    mixCards();
    console.log('game has begun');
    cards.forEach((card)=> {
        card.style.pointerEvents = 'auto';
    });
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
//flip(); //doesnt work when i call the function
 
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
//timer

//matched so far //use array and .push


// 

//shuffle
// cards.forEach(function(card) {     //to flip cards
//     card.addEventListener('click', flip);



// });

// const begin = function() { ///chnage to init?    //beginBtndocument.querySelector('#begin').addEventListener('click', init)
//     console.log('game has begun');
//     } //same as init 

// const cardsBack = document.querySelector('.back');
const startOver = function() {
     console.log('game will start over');
     cards.forEach(function(card){
        card.classList.remove('flip');
     });
    }
    startOverBtn.addEventListener('click', startOver);
const startTimer = function(){
    console.log('timer started');
}//same as begin 
const noTime = function(){
    console.log('no timer');
}
let mixCards = function(){
    console.log('cards will be shuffled');
    matchedCards = 0;
    currentCard = previousCard = "";
    for (let i=0; i < cards.length; i++){
        let randomIndex = Math.floor(Math.random() * cards.length);
        cards[i].style.order = randomIndex; 
    }
    // cards.forEach(function(card) {     //to flip cards
    //     // card.classList.remove('flip');
    //     cards.addEventListener('click', flip);
    //     });
}

cards.forEach(function(card) {     //to flip cards
    card.addEventListener('click', flip);
    // card.classList.toggle('flip');


});

document.querySelector('#begin').addEventListener('click', begin); //for begin and start over buttons
document.querySelector('#start-over').addEventListener('click', startOver);


document.querySelector('#start-time').addEventListener('click', startTimer); //for tine options
document.querySelector('#no-time').addEventListener('click', noTime);

// document.querySelector('#footer').addEventListener('click', mixCards);   //to mix cards

//change these to add the element made . beginBtn.addEventListener('click' init);



