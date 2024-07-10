var error=0;
var cardList= [
    "dog",
    "goku",
    "luffy",
    "mario",
    "monkey",
    "mrbean",
    "Naruto",
    "penguin",
    "pikachu",
    "statue",
    "trump",
    "zoro"
]
var cardSet;
var board= [];
var rows=4;
var column=6;

window.onload= function(){
    suffleCards();
    startGame();
}
function suffleCards(){
    // adds the cards which makes pair
    cardSet= cardList.concat(cardList);
    console.log(cardSet)
    // suffling cards
    for(let i=0;i<cardSet.length;i++){
        let j= Math.floor(Math.random()*cardSet.length);//get random index
        // swap
        let temp=cardSet[i];
        cardSet[i]=cardSet[j];
        cardSet[j]=temp;
    }
    console.log(cardSet);
}
function startGame(){
    for(let r=0;r<rows;r++){
        let row=[];
        for(let c=0;c<column;c++){
            let cardImg=cardSet.pop();
            row.push(cardImg);

            let card=document.createElement('img');// creates img tag in html
            card.id=r.toString()+"-"+c.toString();//creates id in image tag i.e. 0-0
            card.src="./image/"+cardImg+".png";
            card.classList.add("card");
            document.getElementById("cards").append(card);    
        }
        board.push(row); 
    }
    console.log(board); 
}
let cards=document.querySelectorAll('.card')
function flip(){
    this.classList.toggle('flip');
}
cards.forEach(card=>card.addEventListener('click',flip));