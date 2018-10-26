const c = document.getElementById('canvas');
let line = c.getContext('2d');
let arr1 = c.getContext('2d');
let arr2 = c.getContext('2d');

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

function createLine(){
    var cord = getRandomPoint(x,y);
    line.moveTo(x/2,y/2);
    line.lineTo(cord[0],cord[1]);
    line.stroke();
}

function generateLines(){
    n = Math.floor(Math.random()*2)+3;
    for(i = 1; i <= n; i++){
        console.log('xd')
        createLine();
    }
}

generateLines();