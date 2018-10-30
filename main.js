
/* 
############ DOM VARIABLES
*/

const input = document.getElementById('input');
const button = document.getElementById('submitInput');

/* 
############ READ THE INPUT
*/

let nArrows = 3;

input.addEventListener('input', () => {
    let val = parseInt(input.value);
    if(val < 3 || val > 99){
        button.classList.add('button__disabled');
    } else if(val >= 3 || val <= 99){
        button.classList.remove('button__disabled');
        nArrows = val;        
    }
})

/* 
############ DRAW CANVAS
*/

const c = document.getElementById('canvas');
//Define number of arrows


//Get canvas size
var x = window.getComputedStyle(c).width;
var y = window.getComputedStyle(c).height;
//Turn variables from string to int
x = Number(x.substring(0,x.length-2));
y = Number(y.substring(0,y.length-2));

function getRandomPoint(x,y){
    //Generate random point within the canvas
    return [
        Math.floor(Math.random()*x),
        Math.floor(Math.random()*y)
    ];
}

function createArrow(fromx, fromy, tox, toy, i){
    //variables to be used when creating the arrow
    var ctx = c.getContext("2d");
    var text = c.getContext("2d");
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();
    //add number of the arrow
    text.font = '26px Arial';
    text.fillStyle = "black";
    text.fillText(i,tox+10,toy+10);

    //starting a new path from the head of the arrow to one of the sides of the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //draws the paths created above
    ctx.stroke();
    ctx.fill();
}

//generate n lines
function drawArrows(n){
    r = Math.floor(Math.random())+n;
    for(i = 1; i <= r; i++){
        var cord = getRandomPoint(x,y);
        createArrow(x/2,y/2,cord[0],cord[1],i);
    }
}

//clear canvas
function clear(){
    ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
}

//new canvas with n arrows
function newCanvas(){
    clear();
    drawArrows(nArrows);
}

button.addEventListener('click', () => {
    if(!button.classList.contains('button__disabled')){
        newCanvas();
    }
})