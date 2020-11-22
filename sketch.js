var database;
var position;
var ballImage;
var ball;
var backgroundImage;
function preload(){
    ballImage=loadImage("football_PNG52775.png");
    backgroundImage=loadImage("background.png");
}
function setup(){
    createCanvas(500,500);
    
    database=firebase.database();
    console.log(database);
    var ballPositionRef=database.ref("/position");
    ballPositionRef.on("value",readPosition,showError);

    ball = createSprite(250,250,50,50);
    ball.shapeColor = "red";
    ball.addImage(ballImage);
    ball.scale=0.06;
}

function draw(){
    background("skyblue");
    background(backgroundImage);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
       writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}
function readPosition(data){
    position=data.val();
    console.log(position);
    ball.x=position.x;
    ball.y=position.y;

}
function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}
function showError(){
    console.log("error");
}
function writePosition(x,y){
  database.ref("/position").set({x:position.x+x,y:position.y+y}); 
}
