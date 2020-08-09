window.setTimeout(function(){
var numSquares = 6;
var pickedColour = null;  
var colours = []
var squares = document.querySelectorAll(".square");
var colourDisplay = document.getElementById("colourDisplay");
var message = document.getElementById("message");
var resetBtn = document.getElementById("reset");
var h1 = document.querySelector("h1");
var modeButtons = document.querySelectorAll(".mode");
//reset the game when the page is loaded
reset();
setUpSquares();
setUpButtons();
//add an event listener to each coloured square to check if the player has guessed correctly
function setUpSquares(){
    for(i = 0; i < squares.length; i++){
        squares[i].addEventListener("click", function(){
            if(this.style.backgroundColor === pickedColour){
                message.textContent = "Correct";
                resetBtn.textContent = "PLAY AGAIN?"
                //give all squares the background colour of the picked colour
                changeColour();
            } else {
                //make the square dissapper if guess is incorrect
                this.style.backgroundColor = "#232323";
                message.textContent = "Try Again";
            }
        })
    }
}
//allow the player to change the difficulty
function setUpButtons(){
    for(i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "easy" ? numSquares = 3 : numSquares = 6;
            reset();
        })
    }
    //allow the player to reset the game
    resetBtn.addEventListener("click", reset);
}
//make all the squares the colour of the picked colour
function changeColour(colour){
    for(i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = pickedColour;
    }
    //change the colour of the heading to the picked colour
    h1.style.backgroundColor = pickedColour;
}
//pick one colour from the colours array
function pickColour(){
    var random = Math.floor(Math.random() * colours.length);
    return colours[random];
}
//generate an array of random colours
function generateColourArray(num){
    var colourArray = [];
    //add a new colour into the colourArray
    for(i = 0; i < num; i++){
        colourArray.push(generateRandomColour());
    }

    return colourArray;
}
//generate a random RGB colour
function generateRandomColour(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
//reset the game
function reset(){
    //generate a new array of random colours
    colours = generateColourArray(numSquares);
    //assign one of the colours as the picked colour
    pickedColour = pickColour();
    //display the RGB values of the picked colour to the player
    colourDisplay.textContent = pickedColour;
    resetBtn.textContent = "CHANGE COLOURS";
    message.textContent = "";
    h1.style.backgroundColor = "#4682b4";
    //assign each square a colour from the colours array
    for(i = 0; i < squares.length; i++){
        if (colours[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colours[i];
        } 
        //if there are more sqaures than colours, hide the extra sqaures
        else {
            squares[i].style.display = "none";
        }   
    }
}

}, 100)