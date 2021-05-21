var bg,bgImg;
var ground,groundImg;
var player;
var hImg,helicopter;
var log,logImg;
var logGroup;
var helicopterGroup;
var logCollection=[]
var gameState="play";

function preload(){
  bgImg=loadImage("Background.png");
  groundImg=loadImage("Ground.png");
  hImg=loadAnimation("helicopter1.png","helicopter2.png","helicopter3.png","helicopter4.png");
  logImg=loadImage("Log.png");
}
function setup() {
  createCanvas(1200,550);
  bg=createSprite(600,120,1200,550);
  bg.addImage(bgImg);
  bg.scale=1.3;
  bg.velocityX=-10;

  ground=createSprite(600,750,1200,550);
  ground.addImage(groundImg);
  ground.scale=1;
  ground.velocityX=-10;

  invisibleGround=createSprite(600,520,1200,10);
  invisibleGround.visible=false;

  player=createSprite(100,500,10,40);

  logGroup=new Group();
  helicopterGroup=new Group();
}
function draw() {
  background(255,255,255);
  if(gameState==="play"){
  if(bg.x<0){
    bg.x=bg.width/2;
  }

  if(ground.x<0){
    ground.x=ground.width/2;
  }
  
  if(keyDown("up")){
    player.velocityY=-10;
  }
  player.velocityY=player.velocityY+1;
  player.collide(invisibleGround);
  
  for(var i=0;i<logCollection.length;i++){

    if(logCollection[i].isTouching(invisibleGround)){
      logCollection[i].velocityX=-10;
      logCollection[i].velocityY=0;
      
    }
  }
  if(player.isTouching(logGroup)){
    gameState="end";
  }
  
  spawnHelicopter();
}
drawSprites();
if(gameState==="end"){
  bg.velocityX=0;
  helicopterGroup.setVelocityXEach(0);
  logGroup.setVelocityXEach(0);
  ground.velocityX=0;
  player.velocityY=0;
  fill("red");
  textSize(100);
  text("GAME OVER",300,200);
}
  
}
function spawnHelicopter(){
  if(frameCount%150===0){
    helicopter=createSprite(1200,random(50,250));
    helicopter.addAnimation("h1",hImg);
    helicopter.velocityX=-9;
    helicopter.lifetime=300;
    helicopter.scale=0.7;

    log=createSprite(1200,helicopter.y);
    log.addImage(logImg);
    log.velocityX=-(random(2,5));
    log.velocityY=5;
    log.lifetime=300;
    log.scale=0.2;
    log.depth=helicopter.depth;
    helicopter.depth=helicopter.depth+1;

    logGroup.add(log);
    helicopterGroup.add(helicopter);
    logCollection.push(log);

  }
}