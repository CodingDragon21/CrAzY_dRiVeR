var c1, c2, c3, c4, c5;
var car;
var carG;

var coin, movingCoin;
var coinG;
var road, movingRoad;

var drivingMotorcycle;
var motorcycle;

var edges;

var playButton , play
var crazyDriver , logo

var horn
var vroom
var coinCollect

var score = 0

var speed

var gameState = "start"

function preload() {
  movingRoad = loadImage("brownRoad2.svg");
  drivingMotorcycle = loadAnimation(
    "motorcycle1.svg",
    "motorcycle2.svg",
    "motorcycle3.svg"
  );
  c1 = loadImage("car1.svg");
  c2 = loadImage("car2.svg");
  c3 = loadImage("car3.svg");
  c4 = loadImage("car4.svg");
  c5 = loadImage("car5.svg");
  movingCoin = loadImage("coin.svg");
  
  horn = loadSound("Car Horn.mp3");
  vroom = loadSound("Car Vroom.mp3")

  play = loadImage("playagain.svg")
  
  logo = loadImage("crazydriver.svg")

  //dom library was missing , i added it and now its working fine, you cxan add rest all sounds to your game
  //also covert files to mp3, link is given below
  // https://cloudconvert.com/wav-to-mp3
  coinCollect = loadSound("CoinCollect.mp3")
  

  
}

function setup() {
  createCanvas(410, 700);
  road = createSprite(205, 200);
  road.addImage("roadSprite", movingRoad);

  motorcycle = createSprite(200, 500);
  motorcycle.addAnimation("motorbike", drivingMotorcycle);
  motorcycle.scale = 0.65;
  motorcycle.setCollider("rectangle",0,-40,60,190)
 


   playButton = createSprite(205,300)
   playButton.addImage("Start" , play)
   playButton.scale = 0.6
     
   crazyDriver = createSprite(205 , 100)
   crazyDriver.addImage("img" , logo)
   crazyDriver.scale = 0.7

  carG = createGroup();
  coinG = createGroup();
}

function draw() {
  background("white");
  edges = createEdgeSprites();
  motorcycle.collide(edges);

  if(gameState === "start"){
   playButton.visible = true
   crazyDriver.visible = true
    
   if(mousePressedOver(playButton)){
     gameState = "play"
     playButton.visible = false
      crazyDriver.visible = false
     score = 0 

   }

  }
    
  if(gameState === "play"){

  road.velocityY = 22;

  if (road.y > 570) {
    road.y = 300;
  }

  carSpawn();
  coinSpawn();

if(coinG.isTouching(carG)){
  coinG.x = coinG.x - 200
}

if(motorcycle.isTouching(coinG)){
    score = score + 1
    coinCollect.play()
   coinG.destroyEach()
  } 
 motorcycle.x = mouseX
 
if(motorcycle.isTouching(carG)){
  gameState = "end"
}
  }


  drawSprites();
if(gameState === "end"){
reset();
}
  textSize(24)
  textFont("Arial")
  fill("lime")
  text("$: "+ score, 340,25)


}

function carSpawn() {
  if (frameCount % 80 === 0) {
    car = createSprite(Math.round(random(50, 350)), 0);
    var randCar = Math.round(random(1, 5));
    var randSound = Math.round(random(1,2))
    switch (randCar) {
      case 1:
        car.addImage("movingCar", c1);
        break;
      case 2:
        car.addImage("movingCar", c2);
        break;
      case 3:
        car.addImage("movingCar", c3);
        break;
      case 4:
        car.addImage("movingCar", c4);
        break;
      case 5:
        car.addImage("movingCar", c5);
        break;
      default:
        break;
    }
    switch(randSound){
     case 1:
       horn.play()
       break
      case 2:
        vroom.play()
        break
    }
    
    
    
    car.scale = 0.61;
    car.setVelocity(0,22);
    car.lifetime = 80;
    carG.add(car);
 
 
  }

}
function coinSpawn() {
  if (frameCount % 110 === 0) {
    coin = createSprite(Math.round(random(50, 350)), 0);
    coin.addImage("collect", movingCoin);
   
    if(coinG.isTouching(carG)){
      coinG.x = coinG.x - 100
    }
    
    
    
    coin.scale = 0.45;
    coin.setVelocity(0, 22);
    coin.lifetime = 80;
    coinG.add(coin);
  }
}

function reset(){
  

coinG.destroyEach()
coinG.visibility = false

carG.destroyEach()
carG.visibility = false

road.velocityY = 0




gameState = "start"
}







