var PLAY=1
var GAMEOVER=0
var estadodojogo=PLAY 

var groundmg, ground;
var groundinv;
var trex ,trex_running;
var nuvensmg, nuvensmg2;
var pontuacao;


// preload das imagens
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundmg = loadImage("ground.png");
  nuvensmg = loadImage("cloud.png");
  nuvensmg2 = loadImage("cloud.png");

  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
}


function setup(){
  createCanvas(windowWidth, windowHeight)
  
  //crie um sprite de trex
  trex = createSprite(50,height-190,50,50);
  trex.addAnimation("running", trex_running);
  trex.scale=0.7;

  //sprite do chão
  ground = createSprite(width, height-160, 1600, 10);
  ground.addImage(groundmg);
  ground.x=ground.width/2;
  // visibilidade do chão (ground)
  groundinv = createSprite(width/4, height-140, 1600, 10);
  groundinv.visible=false;

  gruponuvens=new Group();
  grupoobstaculos=new Group();



  pontuacao=0;

}


function draw(){
  background("white");
  // pontuação 
  text("pontuação = "+ pontuacao, 900, 20);
  
// if = se
  if (estadodojogo===PLAY){
    pontuacao=pontuacao+Math.round(getFrameRate()/60);

   if (keyDown("space") && trex.y>=660){
      trex.velocityY=-12;         
      }
    
      trex.velocityY=trex.velocityY+0.9;

      ground.velocityX=-9;
      if (ground.x<1000){
      ground.x=ground.width/2;

      criar_obstaculos();                                       

      criar_nuvens();
     
  }
// else if = se não 

  else if (estadodojogo===GAMEOVER){
   ground.velocityX=0;
   grupoobstaculos.setVelocityXEach(0);
   gruponuvens.setVelocityXEach(0);
   
  }

 //console.log(trex.y);

  trex.collide(groundinv);
  
}


  drawSprites();

}

function criar_obstaculos(){
  if (frameCount%60===0){
    var obstaculos = createSprite (width, height*0.5, 50, 50);
    obstaculos.velocityX=-9;
    obstaculos.lifetime=300;
    obstaculos.scale=0.7;
    grupoobstaculos.add(obstaculos);



    // programação para adicionar as imagens aleatoriamente
    var rand=Math.round(random(1,6));
    switch(rand){
      case 1 : obstaculos.addImage(obstaculo1);
      break;
      case 2 : obstaculos.addImage(obstaculo2);
      break;
      case 3 : obstaculos.addImage(obstaculo3);
      break;
      case 4 : obstaculos.addImage(obstaculo4);
      break;
      case 5 : obstaculos.addImage(obstaculo5);
      break;
      case 6 : obstaculos.addImage(obstaculo6);
      break;
      default:break;
    
    }
  }
}

function criar_nuvens(){
  if (frameCount%60===0){
    var nuvens=createSprite(width/2, height-20, 50, 50);
    nuvens.velocityX=-5;
    nuvens.lifetime=300; 
    nuvens.addImage(nuvensmg);
    nuvens.y=Math.round(random(140,1200));
    nuvens.depth=trex.depth; 
    //console.log(trex.depth);
    trex.depth=trex.depth+1;
    gruponuvens.add(nuvens);
  }

  if (frameCount%60===0){
    var nuvens2=createSprite(width/2, height-20, 50, 50);
    nuvens2.velocityX=-5;
    nuvens2.lifetime=300;
    nuvens2.addImage(nuvensmg2);
    nuvens2.scale=0.5;
    nuvens2.y=Math.round(random(150,1200));
    nuvens2.depth=trex.depth;
    //console.log(nuvens2.depth);
    trex.depth=trex.depth+1;
    gruponuvens.add(nuvens);
  }


}


