const c = document.getElementById('canvas');

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

function createLine(fromx, fromy, tox, toy){
    //variables to be used when creating the arrow
    var ctx = c.getContext("2d");
    var headlen = 10;
    var angle = Math.atan2(toy-fromy,tox-fromx);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineWidth = 1;
    ctx.stroke();

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

function generateLines(){
    n = Math.floor(Math.random()*2)+5;
    for(i = 1; i <= n; i++){
        var cord = getRandomPoint(x,y);
        createLine(x/2,y/2,cord[0],cord[1]);
    }
}

//clear canvas
function clear(){
    ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
}

//new canvas
function newCanvas(){
    clear();
    generateLines();
}