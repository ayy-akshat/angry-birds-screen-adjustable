const
Engine = Matter.Engine,
World = Matter.World,
Bodies = Matter.Bodies,
Constraint = Matter.Constraint;
Mouse = Matter.Mouse;
MouseConstraint = Matter.MouseConstraint;

var engine, world;

var box1, box2, box3, box4, box5;
var log1, log2, log3, log4;
var ground1, ground2;

var pig1, pig2;

var bird;

var birdCon;

var mCon;

var birdReleased;

var attempts, score;

var bgImg, bgImg2;
var currentImg;
var nightMode;

var date;

function preload()
{
  bgImg = loadImage("sprites/bg.png");
  bgImg2 = loadImage("sprites/bg2.jpg");
}

function setup() {
  var canvas = createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;

  box1 = new Box(1000, 650, 100, 100);
  box2 = new Box(1300, 650, 100, 100);

  pig1 = new Pig(1150, 650);

  log1 = new Log(1150, 588, 400, PI/2);

  box3 = new Box(1000, 525, 100, 100);
  box4 = new Box(1300, 525, 100, 100);
  
  pig2 = new Pig(1150, 525);
  
  log2 = new Log(1150, 462, 400, PI/2);
  
  box5 = new Box(1150, 399, 100, 100);

  log3 = new Log(1240, 350, 200, -PI/8);
  
  log4 = new Log(1060, 350, 200, PI/8);

  bird = new Bird(200, 0);

  ground1 = new Ground(200, 600, 400, 400, [139,69,19]);

  ground2 = new Ground(800, 750, 1600, 100, [139,69,19]);

  birdCon = new Slingshot(bird.body, 50, 0, {x:0, y:0}, {x:350, y:145});

  birdReleased = false;

  attempts = 0;
  score = 0;

  nightMode = false;
  currentImg = bgImg;
}

function draw()
{
  screen.orientation.lock("portrait-primary");
  background("skyblue");
  imageMode(CENTER);
  if (currentImg)
  {
    image(currentImg, width/2, height/2, width, height);
  }
  bird.smokeTrail();
  
  Engine.update(engine);
  
  if (!birdCon.bodyReleased && attempts == 0)
  {
    box1.resetPosition();
    box2.resetPosition();
    box3.resetPosition();
    box4.resetPosition();
    box5.resetPosition();
    log1.resetPosition();
    log2.resetPosition();
    log3.resetPosition();
    log4.resetPosition();
    pig1.resetPosition();
    pig2.resetPosition();
  }
  
  ground1.display();
  ground2.display();
  
  box1.display();
  box2.display();
  box3.display();
  box4.display();
  box5.display();
  
  pig1.display();
  pig2.display();

  log1.display();
  log2.display();
  log3.display();
  log4.display();
  
  bird.display();
  
  birdCon.drawCatapult();
  birdCon.drawLine([45, 23, 11], 10);
  
  fill("white");
  textAlign(CENTER);
  textSize(50);
  text("Attempts: " + attempts + "/3 used", width/2, height/5);
  text("Score: " + score, width/2, height*2/5);
  
  // textSize(20);
  // textAlign(LEFT);
  // text("Press n to change the time of day.", 50, 50);
  
  getBgImg();
}

function mouseDragged()
{
  if (birdCon.bodyReleased)
  {
    return;
  }
  Matter.Body.setPosition(bird.body, {x:1600*mouseX/windowWidth, y:800*mouseY/windowHeight});
  Matter.Body.setAngularVelocity(bird.body, 0);
  Matter.Body.setAngle(bird.body, 0);
}

function mouseReleased()
{
  if (birdCon.bodyReleased)
  {
    return;
  }
  birdCon.shootBody();
  attempts++;
}

touchend = mouseReleased;

function touchstart()
{
  if (attempts >= 3 || score == 200)
  {
    attempts = 0;
    World.add(world, pig1.body);
    World.add(world, pig2.body);
    pig1.opacity = 255;
    pig2.opacity = 255;
    score = 0;
  }
  birdCon.resetBody(bird.body);
}

function touchmove()
{
  if (birdCon.bodyReleased)
  {
    return;
  }
  Matter.Body.setPosition(bird.body, {x:1600*touches[0]/windowWidth, y:800*touches[1]/windowHeight});
  Matter.Body.setAngularVelocity(bird.body, 0);
  Matter.Body.setAngle(bird.body, 0);
}

function keyPressed()
{
  if (keyCode == 32 && (bird.body.speed <= 1 || (bird.body.position.x > width || bird.body.position.x < 0 || bird.body.position.y > height || bird.body.position.y < 0)))
  {
    if (attempts >= 3 || score == 200)
    {
      attempts = 0;
      World.add(world, pig1.body);
      World.add(world, pig2.body);
      pig1.opacity = 255;
      pig2.opacity = 255;
      score = 0;
    }
    birdCon.resetBody(bird.body);
  }

  // if (keyCode == 78)
  // {
  //   nightMode = !nightMode;
  //   if (nightMode)
  //   {
  //     currentImg = bgImg2;
  //   }
  //   else
  //   {
  //     currentImg = bgImg;
  //   }
  // } 
}

function getBgImg()
{
  date = new Date();

  if (date.getHours() >= 6 && date.getHours() < 18)
  {
    currentImg = bgImg;
  }
  else
  {
    currentImg = bgImg2;
  }

  delete date;
}