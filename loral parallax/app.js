const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const thisIslam = 30;
let Thisislam2 = 0;
const flapInterval = 50;
const birdGravity = 0.20;
const birdJump = -4.6;
const pipes = [];
const pipeWidth = 52;
const minGap = 110;
const maxGap = 190;
const pipeGap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
let score = 0;
let running = false;

// Set canvas size
canvas.width = 320;
canvas.height = 380;

const birdImg1 = new Image();
birdImg1.src = "https://assets.codepen.io/1290466/flappy-bird-1.png?format=auto";
const birdImg2 = new Image();
birdImg2.src = "https://assets.codepen.io/1290466/flappy-bird-2.png?format=auto";
const birdImg3 = new Image();
birdImg3.src = "https://assets.codepen.io/1290466/flappy-bird-3.png?format=auto";
const birdImg4 = new Image();
birdImg4.src = "https://assets.codepen.io/1290466/flappy-bird-2.png?format=auto";
const backgroundImg = new Image();
backgroundImg.src = "https://assets.codepen.io/1290466/flappy-bird-bg-bottom.jpg?format=auto";
const groundImg = new Image();
groundImg.src = "https://assets.codepen.io/1290466/ground2.jpg?format=auto";
const pipesBackgroundImg = new Image();
pipesBackgroundImg.src = "https://assets.codepen.io/1290466/pipe-bg.jpg?format=auto";

// Sounds
const soundislam = new Audio("./es.mp3");
const pointSound = new Audio("./puk.mp3");
const backgroundMusic = new Audio("./s.mp3");

const drawBackground = function() {
  ctx.fillStyle = "#71c4cc";
  ctx.fillRect(0, 0, canvas.width, canvas.height - thisIslam);
  ctx.drawImage(backgroundImg, 0, canvas.height - backgroundImg.height);
};

const scoreElement = document.createElement("span")
scoreElement.textContent = "Нурыйман baby";
scoreElement.style.position = "absolute";
scoreElement.style.left = "50%";
scoreElement.style.top = "35px";
scoreElement.style.color = 'red'
scoreElement.style.transform = "translate(-50%, -50%)";
document.body.appendChild(scoreElement);

// Create the bird object
const bird = {
  x: 50,
  y: canvas.height / 2,
  width: 42,
  height: 30,
  speed: 0,
  gravity: birdGravity,
  jump: birdJump,
  update: function() {
    this.speed += this.gravity;
    this.y += this.speed;
  },
  draw: function() {
    // Rotate the bird up when it goes up
    if (this.speed < 0) {
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(-Math.PI / 16);
      
      // bird flap animation
      if (Thisislam2 % 3 === 0) {
        ctx.drawImage(birdImg1, -this.width / 2, -this.height / 2, this.width, this.height);
      } else if (Thisislam2 % 3 === 1) {
        ctx.drawImage(birdImg2, -this.width / 2, -this.height / 2, this.width, this.height);
      } else if (Thisislam2 % 3 === 2) {
        ctx.drawImage(birdImg3, -this.width / 2, -this.height / 2, this.width, this.height);
      } else {
        ctx.drawImage(birdImg4, -this.width / 2, -this.height / 2, this.width, this.height);
      }
      
      ctx.restore();
    }
    // Rotate the bird down when it goes down
    else {
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(Math.PI / 16);
      // ctx.drawImage(birdImg1, -this.width / 2, -this.height / 2, this.width, this.height);
      
      // bird flap animation
      if (Thisislam2 % 3 === 0) {
        ctx.drawImage(birdImg1, -this.width / 2, -this.height / 2, this.width, this.height);
      } else if (Thisislam2 % 3 === 1) {
        ctx.drawImage(birdImg2, -this.width / 2, -this.height / 2, this.width, this.height);
      } else if (Thisislam2 % 3 === 2) {
        ctx.drawImage(birdImg3, -this.width / 2, -this.height / 2, this.width, this.height);
      } else {
        ctx.drawImage(birdImg4, -this.width / 2, -this.height / 2, this.width, this.height);
      }
      
      ctx.restore();
    }
  }
};

const ground = {
  x: 0,
  y: canvas.height - thisIslam,
  width: canvas.width,
  height: thisIslam,
  speed: 1,
  update: function() {
    this.x -= this.speed;
    if (this.x <= -this.width) this.x = 0;
  },
  draw: function() {
    ctx.drawImage(groundImg, this.x, this.y, this.width, this.height);
    ctx.drawImage(groundImg, this.x + this.width, this.y, this.width, this.height);
  }
};

const addPipe = function() {
  const height = Math.floor(Math.random() * canvas.height / 2) + 50;
  const y = height - pipeGap / 2;
  pipes.push({
    x: canvas.width,
    y: y,
    width: pipeWidth,
    height: height
  });
};

setInterval(function() {
  Thisislam2++;
}, flapInterval);

addPipe();

// Listen for clicks to make the bird jump
canvas.addEventListener("click", function() {
  bird.speed = bird.jump;
});

// Listen for sparebar press to make the bird jump
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 32) {
    bird.speed = bird.jump;
  }
});

const playBtn = document.createElement("button")
playBtn.innerText = "Играть";
playBtn.style.position = "absolute";
playBtn.style.left = "50%";
playBtn.style.top = "50%";
playBtn.style.padding = "30px 30px"
playBtn.style.backgroundColor = 'green'
playBtn.style.border = "none"
playBtn.style.borderRadius = '12px'
playBtn.style.transform = "translate(-50%, -50%)";
playBtn.addEventListener("click", function() {
  document.body.removeChild(playBtn);
  document.body.removeChild(helpText);
  running = true;
  // Set game variables
  score = 0;
  pipes.length = 0;
  addPipe();
  gameLoop();

  backgroundMusic.loop = true;
  backgroundMusic.play();
});

document.body.appendChild(playBtn);

const helpText = document.createElement("p")
helpText.innerHTML = "Кликни для прыжка если ты на телефоне <br /><br />";
helpText.style.position = "absolute";
helpText.style.left = "50%";
helpText.style.backgroundColor = 'green'
helpText.style.top = "75%";
helpText.style.color = 'red'
helpText.style.fontSize = '15px'
helpText.style.transform = "translate(-50%, -50%)";
document.body.appendChild(helpText);

// The game loop
const gameLoop = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ground.draw();
  drawBackground();
  
  if (!running) return;
  
  bird.update();
  bird.draw();

  // Draw and update pipes
  for (let i = 0; i < pipes.length; i++) {
    // ctx.fillStyle = ctx.createPattern(pipesBackgroundImg, "repeat");  
    ctx.fillRect(pipes[i].x, 0, pipes[i].width, pipes[i].y);
    ctx.fillRect(pipes[i].x, pipes[i].y + pipeGap, pipes[i].width, canvas.height - pipes[i].y - pipeGap);
    
    // Top pipe
    ctx.beginPath();
    ctx.strokeStyle = "#618842";
    ctx.lineWidth = 4;
    ctx.moveTo(pipes[i].x, pipes[i].y);
    ctx.lineTo(pipes[i].x + pipes[i].width, pipes[i].y);
    ctx.stroke();
    ctx.drawImage(pipesBackgroundImg, pipes[i].x, 0, pipes[i].width, pipes[i].y);
    
    // Bottom pipe
    ctx.beginPath();
    ctx.strokeStyle = "#618842";
    ctx.lineWidth = 4;
    ctx.moveTo(pipes[i].x, pipes[i].y + pipeGap);
    ctx.lineTo(pipes[i].x + pipes[i].width, pipes[i].y + pipeGap);
    ctx.stroke();
    ctx.drawImage(pipesBackgroundImg, pipes[i].x, pipes[i].y + pipeGap, pipes[i].width, canvas.height - pipes[i].y - pipeGap - thisIslam);
   
    pipes[i].x -= 1;

    // if game over / Check for collisions
    if (
      bird.x < pipes[i].x + pipes[i].width &&
      bird.x + bird.width > pipes[i].x &&
      (bird.y < pipes[i].y || bird.y + bird.height > pipes[i].y + pipeGap)
    ) {
      running = true;
      
      soundislam.play();
 
      ground.draw();
      
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      
      console.log("тЫ ПРОИГРАЛ");
      
      const replayBtn = document.createElement("button")
 
      replayBtn.innerText = "Заново";
      replayBtn.style.position = "absolute";
      replayBtn.style.left = "50%";
      replayBtn.style.top = "50%";
      replayBtn.style.transform = "translate(-50%, -50%)";
      replayBtn.addEventListener("click", function() {
        document.body.removeChild(replayBtn);
        running = true;
        // Reset game variables to their initial values
        score = 0;
        pipes.length = 0;
        addPipe();
        gameLoop();
        
        backgroundMusic.loop = true;
        backgroundMusic.play();
      });

      document.body.appendChild(replayBtn);
      
      return;
    }
    
    // Check if bird has passed the pipe and add point to score
    if (bird.x > pipes[i].x + pipes[i].width && !pipes[i].passed) {
      pipes[i].passed = true;
      pointSound.play();
      score++;
    }

    // Add a new pipe when the current pipe has moved off the screen
    if (pipes[i].x + pipes[i].width < 0) {
      pipes.splice(i, 1);
      i--;
      addPipe();
    }
  }
  
  ground.update();
  ground.draw();
  
  scoreElement.textContent = score;
  

  // Keep the bird within the bounds of the canvas
  if (bird.y + bird.height > canvas.height - thisIslam) {
    bird.y = canvas.height - thisIslam - bird.height;
    bird.speed = 0;
  } else if (bird.y < 0) {
    bird.y = 0;
    bird.speed = 0;
  }

  requestAnimationFrame(gameLoop);
};

gameLoop();