//---------------canvas-------------\\
var canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");

//--------------används inte-----------------\\
/*
context.fillStyle = "rgba(255, 255, 0, 0.5)";
context.fillRect(100, 100, 100, 100);
context.fillStyle = "rgba(100, 100, 255, 0.5)";
context.fillRect(300, 100, 100, 100);


console.log(canvas);


//linke
context.beginPath();
context.moveTo(50, 300);
context.lineTo(300, 100);
context.lineTo(100, 300);
context.lineTo(50, 300);
context.strokeStyle = "red";
context.stroke();
*/
/*
    

for (var i = 0; i < 10; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    context.beginPath();
    context.arc(x, y, 30, 0, Math.PI * 2, false);
    context.strokeStyle = getRandomColor();
    context.stroke();
   
}

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dy = Math.random() - (0.5) * 10;
var dx = Math.random() - (0.5) * 10;

*/

//--------------Variabler-----------------------\\
//var radius = 30;
//var minRadius = 2;
//var maxRGB = 250;


//-----------------dammet--------------\\
var dustSpecks = 1300;
var mouseInteractivityColor = "rgba(227, 202, 83, 0.5)";
//var mouseInteractivityColor2 = "rgba(227, 202, 83, 0.3)";
var backgroundPelletColor = "rgba(0, 0, 0, 0)";
//var maxRadius = 50;
var mouseInteractivity = 40;
//var mouseInteractivity2 = 80;
//var mouseInteractivity3 = 120;
//-----------cursor & center obj & illumination(gradient)--------------------\\
var centerObjRadius = 50;
var cursorObjRadius = 20;
var illuminationRadius = 100;
var centerObjColor = "rgba(250, 250, 250, 1)";
var centerObjColorInteractivity = "rgba(250, 250, 250, 0.5)";
//var cursorObjColor = "rgba(227, 202, 83, 0.5)";
var cursorObjColor = gradientOne;

//------------------------------------------\\
/*var grd = context.createRadialGradient(mouse.x, mouse.y, centerObjRadius, mouse.x - 50, mouse.y - 50 ,cursorObjRadius);
        grd.addColorStop(0, "rgba(227, 202, 83, 0.5)");
        grd.addColorStop(1, "rgba(0, 0, 0, 0)");*/
//-----------------mus(x,y)+canvas update-resize-----\\

let mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

addEventListener("mousemove", function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

});


addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();

});


//---------------------utility------------\\

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));


}

/*var colorArray = [
    "#2E112D",
    "#540032",
    "#820333",
    "#C9283E",
    "#F0433A",
];*/


/*function randomColor(){
        return Math.floor(Math.random() * maxRGB);
}
function getRandomColor(){
    var color = "rgb(" + randomColor() + "," + randomColor() + "," + randomColor() + ")";
    return color;
}

*/
/*function CenterIcon (){
var imageWidth = 120;
var imageHeight = 120;
var centerIcon = new Image();

     centerIcon.onload = function() {
        context.drawImage(centerIcon, (canvas.width - this.radiusObj)/2, (canvas.height - this.radiusObj)/3, imageWidth, imageHeight);
      };
      centerIcon.src = "images/spacecat.PNG";
}
function makeSemiRandomColor(){
    return colorArray[Math.floor(Math.random()* 5)];
}
/**/


//-------------in progress------------------\\
/*
function interactivityToColor1(){
          (mouse.x - this.x < mouseInteractivity && mouse.x - this.x > -mouseInteractivity && mouse.y - this.y < mouseInteractivity && mouse.y - this.y > -mouseInteractivity)
}
function getInteractivityColor1(){           if(this.color != mouseInteractivityColor){
            return this.color = mouseInteractivityColor; }   
}
function interactivityToColor2(){
          if (mouse.x - this.x < mouseInteractivity2 && mouse.x - this.x > -mouseInteractivity2 && mouse.y - this.y < mouseInteractivity2 && mouse.y - this.y > -mouseInteractivity2) {
            if (this.color != mouseInteractivityColor2){
            this.color = mouseInteractivityColor2;    
                }
        }
    
}
*/
//--------------------illumination----------------------------\\
/*

*/
var gradientOne = context.createRadialGradient(75,50,5,90,60,100);
gradientOne.addColorStop(0,"red");
gradientOne.addColorStop(0,"white");
//--------------------Center obj o lanterna(cursor obj)------------------------\\
function CenterObj(x, y, radius, color) {
    this.xObj = x;
    this.yObj = y;
    this.radiusObj = radius;
    this.colorObj = color;


    this.updateObj = function () {
        this.drawObj();
    }

    this.drawObj = function () {
        context.beginPath();
        context.arc(this.xObj, this.yObj, this.radiusObj, 0, Math.PI * 2, false);
        context.fillStyle = this.colorObj;
        context.fill();
        context.closePath();
    }


}

//--------------------------------- Dammet---------------------\\

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;

    //-------no use outdated-------\\
    //this.colorStroke = getRandomColor(); 

    this.color = backgroundPelletColor;

    //-------------används inte---------\\
    //this.interactivity = interactivityToColor1();
    //this.interactivityColor = getInteractivityColor1();
    //--------------------------------------\\

    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
        //--------no use outdated----------\\
        //context.stroke();
        //context.strokeStyle = this.colorStroke;


    }
    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        //interactivity
        if (mouse.x - this.x < mouseInteractivity && mouse.x - this.x > -mouseInteractivity && mouse.y - this.y < mouseInteractivity && mouse.y - this.y > -mouseInteractivity) {
            if (this.color != mouseInteractivityColor) {
                this.color = mouseInteractivityColor;
            }
        }
        //-------------in progress---------------\\
        /*
        if (this.interactivity = true;){
            this.interactivityColor;
        }*/
        //------------------------------------\\
        else if (this.color = mouseInteractivityColor) {
            this.color = backgroundPelletColor;
        }
        //--------------------in progress------------\\
        /*if ((mouse.x - this.x > mouseInteractivity && mouse.x - this.x < mouseInteractivity2) && (mouse.x - this.x < -mouseInteractivity && mouse.x - this.x > -mouseInteractivity2) && (mouse.y - this.y < mouseInteractivity && mouse.x - this.x < mouseInteractivity2) && (mouse.y - this.y > -mouseInteractivity && mouse.x - this.x < mouseInteractivity2)) {
               if (this.color != mouseInteractivityColor2){
               this.color = mouseInteractivityColor2;    
                   }
           }
           else if (this.color = mouseInteractivityColor2){
               this.color = backgroundPelletColor;
           }
           */
        //---------används inte----------\\
        /*
        if (mouse.x - this.x < mouseInteractivity && mouse.x - this.x > -mouseInteractivity && mouse.y - this.y < mouseInteractivity && mouse.y - this.y > -mouseInteractivity) {
            if (this.radius < maxRadius){
            this.radius += 1;    
                }
        }
        else if (this.radius > this.minRadius){
            this.radius -= 1;
        }
       */
        //----------------------------------\\
        this.draw();


    }
}

//-----------------load--------------------\\

//implementera
let centerObj;
let cursorObj;

var circleArray = [];

//var centerLinkObj = document.getElementById("github"); centerLinkObj.style.position = "fixed";
//--------------------in progress-----------------------------\\
/*var htmlBackground = document.getElementsByName("html"); htmlBackground.background.color = getHtmlBackgroundColor;
var getHtmlBackgroundcolor = "rgba(200,50,200,1)";*/
//-------------------------------------------------------------\\

function init() {
    centerObj = new CenterObj((canvas.width - centerObjRadius) / 2, (canvas.height - centerObjRadius) / 3, centerObjRadius, centerObjColor);

    cursorObj = new CenterObj(undefined, undefined, cursorObjRadius, cursorObjColor);

    circleArray = [];

    for (var i = 0; i < dustSpecks; i++) {
        var radius = Math.random() * 4 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dy = Math.random() - (Math.random()) * 2;
        var dx = Math.random() - (Math.random()) * 2;
        circleArray.push(new Circle(x, y, dx, dy, radius));


    }

}

function initLink(){
     centerObj = new CenterObj((canvas.width - centerObjRadius) / 2, (canvas.height - centerObjRadius) / 3, centerObjRadius, centerObjColor);
}
//----------------anävnds inte------\\
/*var circleArrayTint = Object.assign({}, circleArray)
console.log(circleArrayTint)
*/
//----------------animera enl. första init------------\\
function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, innerWidth, innerHeight);
    centerObj.updateObj();

    cursorObj.updateObj();
    cursorObj.xObj = mouse.x;
    cursorObj.yObj = mouse.y;

    if (getDistance(centerObj.xObj, centerObj.yObj, cursorObj.xObj, cursorObj.yObj) < centerObj.radiusObj + cursorObj.radiusObj) {
        centerObj.colorObj = centerObjColorInteractivity;
        animate=null;
        context.clearRect(0, 0, canvas.width, canvas.height);
    


    }
    for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
        if(animate===null){
           context.clearRect(0, 0, canvas.width, canvas.height);
            initLink();
            animateLink();
        }

}

}

function animateLink(){
    requestAnimationFrame(animateLink);
    context.clearRect(0, 0, innerWidth, innerHeight);
    centerObj.updateObj();
    //centerObj.innerHTML = document.getElementById("#Github").innerHTML;
    
}

//----initial - initiate----\\

init();
animate();