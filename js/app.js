console.log('this is working');

//constants
const cards = Array.from(document.querySelectorAll('.cards'));
console.log(cards);

// const memoryCards = [{imageName: 'html-logo', src: }]
//what value to add to current card?


//state variables 
let currentCard;
let guessedSoFar = [];
let secondCard;


//cached element references?



//event listeners
//for start over, timer, mix, begin buttons
const begin = function() {
    console.log('game has begun');
}
const startOver = function() {
    console.log('game will start over');
}


const flip = (function(){
    console.log('card is flipped'); 
    const cardClass = this.getAttribute()
});


cards.forEach(function(card) {
    return card.addEventListener('click', flip);
});

document.querySelector('#begin').addEventListener('click', begin); //for begin and start over buttons
document.querySelector('#start-over').addEventListener('click', startOver);

document.querySelector('#start-time').addEventListener('click', startTimer);
document.querySelector('#no-time').addEventListener('click', noTime);
//functions

//function for mixing cards/shuffle
