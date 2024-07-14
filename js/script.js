var error=0;
var currentPlayer = 1;
var player1Score = 0;
var player2Score = 0;
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
var card1Selected;
var card2Selected;

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
            card.addEventListener("click",selectCard);
            document.getElementById("cards").append(card);    
        }
        board.push(row); 
    }
    console.log(board); 
    setTimeout(hideCard,1000);
    updatePlayerInfo();
}
function updatePlayerInfo() {
    document.getElementById("player1Score").textContent = "Player 1: " + player1Score;
    document.getElementById("player2Score").textContent = "Player 2: " + player2Score;
    document.getElementById("currentPlayer").textContent = "Current Player: " + currentPlayer;
}
function hideCard(){
    for(let r=0;r<rows;r++){
        for(let c=0;c<column;c++){
            let card=document.getElementById(r.toString()+"-"+c.toString());
            card.src="./image/logo.png";
        }
    }
}
function selectCard(){
    if(this.src.includes("logo")){
        if(!card1Selected){
            card1Selected=this;

            let coordinate=card1Selected.id.split("-");//0-1=>["0","1"]
            let r=parseInt(coordinate[0]);
            let c=parseInt(coordinate[1]);
            console.log(board[r][c]);

            card1Selected.src="./image/"+board[r][c]+".png";
        }
        else if(!card2Selected && this !=card1Selected){
            card2Selected=this;

            let coordinate=card2Selected.id.split("-");//0-1=>["0","1"]
            let r=parseInt(coordinate[0]);
            let c=parseInt(coordinate[1]);

            card2Selected.src="./image/"+board[r][c]+".png";
            console.log(board);
            console.log(board[r][c]);
            setTimeout(function() {
                update();
                checkGameEnd();
            }, 1000);
        }
    }
}
function checkGameEnd() {
    if (player1Score + player2Score === cardList.length) {
        let winner = player1Score > player2Score ? "Player 1" : "Player 2";
        if (player1Score === player2Score) {
            winner = "It's a tie";
        }
        document.getElementById("winner").textContent="Winner is "+winner+" !!";
        window.location.replace("./page/end-page.html")
        // alert("Game Over! " + winner + " wins!");
    }
}
function update(){
    if (card1Selected.src != card2Selected.src) {
        card1Selected.src = "./image/logo.png";
        card2Selected.src = "./image/logo.png";
        error += 1;
        // Switch players
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    } else {
        // Cards match, current player scores
        if (currentPlayer === 1) {
            player1Score++;
        } else {
            player2Score++;
        }
    }
    card1Selected = null;
    card2Selected = null;
    updatePlayerInfo();
}
  