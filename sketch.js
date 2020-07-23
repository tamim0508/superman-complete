var Superman, SupermanIMG
var background1, backgroundIMG
var enemy, enemyIMG
var planet, planetIMG
var asteroid, asteroidIMG
var boulder, boulderIMG
var score = 0;
var obstacleGroup
var PLAY;
var END;
var gameState 
var restart,restartIMG;
var CrashSound, RoarSound
function preload(){
SupermanIMG = loadImage("superman.png");
backgroundIMG = loadImage("coding superman files/pngs/space1.jpg");
enemyIMG = loadImage("enemy.png");
boulderIMG = loadImage("coding superman files/boulder1.png");
asteroidIMG = loadImage("asteroid.png");
planetIMG = loadImage("coding superman files/planet1.png");
restartIMG = loadImage("restart.png");
CrashSound = loadSound("crash.mp3");
RoarSound = loadSound("roar.mp3");
}
function setup() {
  createCanvas(1200,400);
  //Background
background1 = createSprite(600,200,1200,400);
background1.addImage("thebackground", backgroundIMG);
 //Superman 
Superman = createSprite(350, 200, 50, 50);
Superman.addImage("superguy", SupermanIMG)
Superman.scale = 0.1;
Superman.setCollider("rectangle", 0,0,Superman.width - 20, Superman.height - 600);
//Enemy
enemy = createSprite(50,200,50,50);
enemy.addImage("enemies", enemyIMG);
enemy.scale = 0.1
PLAY = 1;
END = 0;
gameState = PLAY;
obstacleGroup = new Group();
//Superman.debug = true;
restart = createSprite(1150,50,20,20);
restart.addImage("restart", restartIMG);
restart.scale = 0.1;
restart.visible = false;
}

function draw() {
  
  background("blue");
  textSize(18);
  fill(255);
  
    background.velocityX = -(10+5*score/100);
  
  
  if(gameState === PLAY){
    if(frameCount % 3 === 0){
      score = score+1;
    }
   
    enemy.y = Superman.y;
      background1.velocityX = -5
      if(background1.x <0){
        background1.x = background1.width/2
      }
    if(keyDown(UP_ARROW)){
      Superman.velocityY = -3
    }
    if(keyDown(DOWN_ARROW)){
      Superman.velocityY = 3
    }
      
      spawnObstacles();
      
      if(Superman.isTouching(obstacleGroup)){
        enemy.velocityX = 6;
        gameState = END;
        CrashSound.play();
        
      }
      
  }
  if(gameState === END){
background1.velocityX = 0;
obstacleGroup.setVelocityXEach(0);
Superman.velocityY = 0;
obstacleGroup.setLifetimeEach(-1);
restart.visible = true;
//if(CrashSound.isPlaying()){
  //CrashSound.stop();
//}  

if(mousePressedOver(restart)){
  gameState = PLAY;
  obstacleGroup.destroyEach();
  Superman.x = 350;
  Superman.y = 200;
  Superman.visible = true;
  enemy.x = 50;
  enemy.y = 200;
  enemy.velocityX =0;
  restart.visible = false;
  score = 0;
}



  }
  
  if(enemy.x === 350){
    enemy.velocityX = 0;
    Superman.visible = false;
    RoarSound.play();
    noLoop();
  }
  drawSprites();
  text("Score:" + score, 1050,20);
}





function spawnObstacles(){
  if(frameCount % 60 === 0){
    planet = createSprite(1200,random(1,400),50,50);
    planet.velocityX = -(10+5*score/100);
    var rand = Math.round(random(1,3));
    planet.scale = 0.2;
    planet.lifetime = 120;
   
    switch(rand){
      case 1 : planet.addImage("planet", planetIMG);
      break;
      case 2 : planet.addImage("planet1", asteroidIMG);
      break;
      case 3 : planet.addImage("planet3", boulderIMG);
      break;
      default:break
      
    }
    
      
    
    obstacleGroup.add(planet);
    planet.debug = false;
    planet.setCollider("circle",0,0,230 )
  }
}