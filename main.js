/* 
############ DOM VARIABLES
*/

const input = document.getElementById('input');
const button = document.getElementById('submitInput');
const dataOutput = document.getElementById('data');
const answerInput = document.getElementById('answer')

/* 
############ DEFAULT SETTINGS
*/

//Default arrows number
let nArrows = 4;
input.setAttribute('value', nArrows)
//Set input restrictions
const min = 4;
const max = 10;
input.setAttribute('min', min);
input.setAttribute('max', max);

var lastArrow = 0;

/* 
############ INPUT
*/

//Disable/enable submit button depending on value
input.addEventListener('input', () => {
    let val = parseInt(input.value);
    if(val < min || val > max){
        button.classList.add('button__disabled');
    } else if(val >= min || val <= max){
        button.classList.remove('button__disabled');
        nArrows = val;        
    }
})

/* 
############ DRAW CANVAS
*/

const c = document.getElementById('canvas');

//Get canvas size
var x = window.getComputedStyle(c).width;
var y = window.getComputedStyle(c).height;
//Turn variables from string to int
x = Number(x.substring(0,x.length-2));
y = Number(y.substring(0,y.length-2));

//Generate random point within the canvas
function getRandomPoint(x,y){
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
    var angle_rev = Math.atan2(fromy-toy,fromx-tox);
    length = Math.floor(Math.sqrt(Math.pow((tox-fromx),2)+Math.pow((toy-fromy),2)));

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.stroke();

    //add number of the arrow
    text.font = '26px Arial';
    text.fillStyle = "black";
    text.fillText(i,tox+10,toy+10);

    //change the direction of an arrow if odd/even && decide value of last arrow
    if(i%2 != 0){   
        //starting a new path from the head of the arrow to one of the sides of the point
        ctx.beginPath();
        ctx.moveTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/12),toy-headlen*Math.sin(angle-Math.PI/12));
        //path from the side point of the arrow, to the other side point
        ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/12),toy-headlen*Math.sin(angle+Math.PI/12));
        //path from the side point back to the tip of the arrow, and then again to the opposite side point
        ctx.lineTo(tox, toy);
        ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/12),toy-headlen*Math.sin(angle-Math.PI/12));  
        lastArrow += length;
    }else{
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(fromx-headlen*Math.cos(angle_rev-Math.PI/12),fromy-headlen*Math.sin(angle_rev-Math.PI/12));
        ctx.lineTo(fromx-headlen*Math.cos(angle_rev+Math.PI/12),fromy-headlen*Math.sin(angle_rev+Math.PI/12));
        ctx.lineTo(fromx, fromy);
        ctx.lineTo(fromx-headlen*Math.cos(angle_rev-Math.PI/12),fromy-headlen*Math.sin(angle_rev-Math.PI/12)); 
        lastArrow -= length;
    }
    

    //draws the paths created above
    ctx.stroke();
    ctx.fill();

    //Append field with arrows length
    while(dataOutput.childNodes.length >= nArrows){
        dataOutput.removeChild(dataOutput.firstChild)
    }
    var node = document.createElement('div');
    node.setAttribute('class', 'outputNode');
    if(i <= nArrows){
        var textnode = document.createTextNode(i + " = " + length);
    }else{
        var textnode = document.createTextNode(i + " = ?");
    }
    node.appendChild(textnode);
    dataOutput.appendChild(node);
}

function drawLast(fromx, fromy, tox, toy, i){
        //variables to be used when creating the arrow
        var ctx = c.getContext("2d");
        var text = c.getContext("2d");
        length = Math.floor(Math.sqrt(Math.pow((tox-fromx),2)+Math.pow((toy-fromy),2)));
    
        //starting path of the arrow from the start square to the end square and drawing the stroke
        ctx.beginPath();
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
    
        //add number of the arrow
        text.font = '26px Arial';
        text.fillStyle = "black";
        text.fillText(i,tox+10,toy+10);
}

//generate n lines
function drawArrows(){
    r = Math.floor(Math.random())+nArrows;
    for(i = 1; i <= r; i++){
        var cord = getRandomPoint(x,y);
        createArrow(x/2,y/2,cord[0],cord[1],i);
    }
}

//get answer

//clear canvas
function clear(){
    ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
}

//new canvas with n arrows
function newCanvas(){
    var cord = getRandomPoint(x,y);
    clear();
    drawArrows();
    drawLast(x/2,y/2,cord[0],cord[1],'?');
    lastArrow = 0;
}

//Draw new canvas on submit button click
button.addEventListener('click', () => {
    if(!button.classList.contains('button__disabled')){
        newCanvas();
    }
})