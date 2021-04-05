var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var revan, ahsoka, anakin, kenobi, rex, droid, grievous;
var revan_image, ahsoka_image, anakin_image, kenobi_image, rex_image, droid_image, grievous_image;
var bgimg;
var saber, saber_image;
var explosion_image, explosion;
var gun, gun_image;
var hp = 20000;
var good, bad, goodimg ,badimg;
var gudsound, budsound;

function preload(){
  revan_image = loadImage("revan.png");
  ahsoka_image = loadImage("ahsoka.png");
  anakin_image = loadImage("anakin.png");
  kenobi_image = loadImage("kenobi.png");
  rex_image = loadImage("rex.png");
  droid_image = loadImage("droid.png");
  grievous_image = loadImage("grievous.png");
  bgimg = loadImage("coruscant.jpg");
  saber_image = loadImage("saber.png");
  explosion_image = loadImage("explosion.png");
  gun_image = loadImage("gunship.png");
  goodimg = loadImage("wow.png");
  badimg = loadImage("bad.png");
  gudsound = loadSound("goodsound.m4a");
  budsound = loadSound("badsound.m4a");
}

function setup() {

  createCanvas(800,800);

  ground1 = createSprite(400, 790, 800, 20);
  ground2 = createSprite(400, 390, 800, 20);
  ground2.shapeColor = "black";

  revan = createSprite(50, 770, 30, 15);
  revan.addImage(revan_image);
  revan.scale = 0.4;

  anakin = createSprite(50, 370, 30, 15);
  anakin.addImage(anakin_image);
  anakin.scale = 0.4;

  kenobi = createSprite(150, 370, 30, 15);
  kenobi.addImage(kenobi_image);
  kenobi.scale = 0.7;

  ahsoka = createSprite(250, 370, 30, 15);
  ahsoka.addImage(ahsoka_image);
  ahsoka.scale = 0.35;

  saberGroup = new Group();
  droidGroup = new Group();
  gunGroup = new Group();
  cloneGroup = new Group();
  griGroup = new Group();

}

function draw() {

  background(bgimg);  

  revan.collide(ground1);
  anakin.collide(ground2);
  kenobi.collide(ground2);
  ahsoka.collide(ground2);

  if(gameState === PLAY){

  spawnDroid();

  spawnGrievous();
 
  if(keyDown("UP_ARROW")){
    revan.velocityY = -10;
  }

  revan.velocityY = revan.velocityY + 0.8;

  if(keyDown("LEFT_ARROW")){
    revan.x = revan.x - 5;
  }

  if(keyDown("RIGHT_ARROW")){
    revan.x = revan.x + 5;
  }

  if(keyWentDown("SPACE")){
    saber = createSprite(revan.x, revan.y, 30, 10);
    saber.addImage(saber_image);
    saber.scale = 0.3;
    saber.velocityX = 20;
    saberGroup.add(saber);
  }

  if(saberGroup.isTouching(droidGroup) || gunGroup.isTouching(droidGroup) || cloneGroup.isTouching(droidGroup)){
    gudsound.play();
    
    droidGroup.destroyEach();
    explosion = createSprite(droid.x, droid.y, 40, 40);
    explosion.addImage(explosion_image);
    explosion.lifetime = 20;
    hp += 50;

    good = createSprite(400, 400, 50, 50);
    good.addImage(goodimg);
    good.lifetime = 100;
    good.depth = revan.depth - 1;
  }

  if(keyWentDown(71)){
    gun = createSprite(50, 50, 50, 50);
    gun.addImage(gun_image);
    gun.velocityX = 5;
    gun.velocityY = 5;
    gun.scale = 0.3;
    gun.lifetime = 160;
    gunGroup.add(gun);
  }

  if(keyWentDown(67)){
    rex = createSprite(revan.x, revan.y, 15, 30);
    rex.addImage(rex_image);
    rex.velocityX = 5;
    rex.collide(ground1);
    rex.scale = 0.5;
    rex.lifetime = 160;
    rex.velocityY = rex.velocityY + 1.2;
    cloneGroup.add(rex);
  }

  if(revan.isTouching(droidGroup)){
    budsound.play();

    hp = hp - 50;

    bad = createSprite(400, 400, 50, 50);
    bad.addImage(badimg);
    bad.lifetime = 10;
    bad.scale = 0.1;
    bad.depth = revan.depth - 1;
  }

  if(revan.isTouching(griGroup)){
    hp = hp - 500;
  }

  if(hp === 0){
    console.log("Game Over!");
  }

  if(gunGroup.isTouching(griGroup)){
    gameState = WIN;
  }

  if(griGroup.isTouching(revan)){
    gameState = END;
  }


  }else if(gameState === END){
    revan.lifetime = 1;
    griGroup.lifetime = -1;
    droidGroup.lifetime = -1;
    grievous.velocityX = 0;
    droid.velocityX = 0;
  }else if(gameState === WIN){
    revan.lifetime = -1;
    griGroup.lifetime = 1;
    droidGroup.lifetime = 1;
  }



  drawSprites();

  textSize(30);
  stroke("white");
  fill("black");
  text("HP: " + hp, revan.x - 50, revan.y - 100);

  if(gameState === END){
    text("Game Over, The Separatist Forces Won!", 20, 400);
  }

  if(gameState === WIN){
    text("Victory! With the help of clones you won!!", 20, 400);
  }

}

function spawnDroid(){

  if(frameCount%120 === 0){
    droid = createSprite(790, 775, 15, 30);
    droid.addImage(droid_image);
    droid.velocityX = -2;
    droid.scale = 0.4;
    droid.collide(ground1);
    droidGroup.add(droid);
    droid.lifetime = 400;
  }

}

function spawnGrievous(){

  if(frameCount%2000 === 0){
    grievous = createSprite(790, 775, 25, 40);
    grievous.scale = 1.5;
    grievous.addImage(grievous_image);
    grievous.velocityX = -2;
    grievous.lifetime = 400;
    grievous.collide(ground1);
    griGroup.add(grievous);
  }

}