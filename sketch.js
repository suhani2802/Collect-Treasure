var sword, fruit, enemy;
var fruit1Image, fruit2Image, fruit3Image, fruit4Image, enemyImage;
var fruitGroup, enemyGroup, gameOverImage;

var score = 0;

var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {

  swordImage = loadImage("sword.png");
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  enemyImage = loadAnimation("alien1.png", "alien2.png");
  gameOverImage = loadImage("gameover.png")
}

function setup() {
  createCanvas(600, 600);
  
   sword = createSprite(200, 200, 10, 10);
  sword.addImage("image", swordImage);
  sword.addImage("gameover", gameOverImage);
  sword.scale = 0.8;


  fruitGroup = new Group();
  enemyGroup = new Group();

}

function draw() {
  background("lightgrey");

 
  fruits();
  enemy();

  if (gameState === PLAY) {
    sword.x = World.mouseX;
    sword.y = World.mouseY;
  }

  if (fruitGroup.isTouching(sword)) {
    fruitGroup.destroyEach();
    score = score + 2;
  }

  if (enemyGroup.isTouching(sword)) {
    gameState = END;
  }

  if (gameState === END) {
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.velocityX = 0;
    enemyGroup.velocityX = 0;
    sword.changeImage("gameover", gameOverImage);
    sword.x = 200;
    sword.y = 200;
  }


  fill("black");
  textSize(20);
  text("Score: " + score, 270, 30);

  drawSprites();
}

function fruits() {
  if (World.frameCount % 80 === 0) {
    var fruit = createSprite(400, 200, 20, 20);
    fruit.scale = 0.2;
    //fruit.debug=true;
    r = Math.round(random(1, 4));
    if (r == 1) {
      fruit.addImage("image", fruit1Image);
    } else if (r == 2) {
      fruit.addImage("image", fruit2Image);
    } else if (r == 3) {
      fruit.addImage("image", fruit3Image);
    } else {
      fruit.addImage("image", fruit4Image);
    }

    fruit.y = Math.round(random(50, 340));

    fruit.velocityX = -7;
    fruit.setLifetime = 100;

    fruitGroup.add(fruit);
  }

}

function enemy() {
  if (World.frameCount % 200 === 0) {
    var enemy = createSprite(400, 200, 20, 20);
    enemy.addAnimation("moving", enemyImage);
    enemy.y = Math.round(random(100, 300));
    enemy.velocityX = -8;
    enemy.setLifetime = 50;

    enemyGroup.add(enemy);
  }
}