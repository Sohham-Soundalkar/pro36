//Create variables here
var dog, dogImage, happyDog, dogHappy, database, foodS, foodStock;
var database, position;
var Milkbottle, MilkbottleImage;

function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  dogHappy = loadImage("dogImg1.png");
  MilkbottleImage = loadImage("Milk.png");
}
  
function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  dog = createSprite(250,300,20,20);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  var dogPosition = database.ref("Food/position");
  dogPosition.on("value", readPosition, showError);

}


function draw() {  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogHappy);
  }

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  stroke("black");
  text("Food Remaining: "+ foodS, 100,100);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  })
}

function readPosition(data){
  position = data.val();
  ball.x = position.x;
  ball.y = position.y;
}

function showError(){
  console.log("Error in reading database");
}


