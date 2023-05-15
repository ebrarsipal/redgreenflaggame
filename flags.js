const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let score=0;

const playerImage = new Image();
playerImage.src = "player.png"; // Oyuncunun fotoğrafının yolu
const redFlagImage = new Image();
redFlagImage.src = "redflag.png"; // Kırmızı bayrağın fotoğrafının yolu

const greenFlagImage = new Image();
greenFlagImage.src = "greenflag.png"; // Yeşil bayrağın fotoğrafının yolu
const player = {
  x: 50,
  y: canvas.height / 2,
  width: 40, // Oyuncunun genişliği
  height: 40, // Oyuncunun yüksekliği
  speed: 5,
  score: 0,
  image: playerImage // Oyuncunun fotoğrafı
};
function drawFlags() {
  flags.forEach((flag) => {
    context.drawImage(flag.image, flag.x - flag.radius, flag.y - flag.radius, flag.radius * 2, flag.radius * 2);
  });
}



const flags = []; // bayraklarin tutuldugu dizi
// bayraklarin ozellikleri
const numFlags = 10;
const flagWidth = 30; 
const flagHeight = 30; 
const flagRadius = flagWidth/2;

const timeLimit = 3600; // oyunun suresi (salise cinsinden)
let timeLeft = timeLimit; // oyuncunun kalan suresi
const timeElement = document.createElement("div"); // sure elementini olustur
timeElement.innerText = "Time left: " + timeLeft; //baslangic degerini ayarla
document.body.appendChild(timeElement); // sayfaya ekle


for (let i = 0; i < numFlags; i++) {
  const flag = {
    x: Math.random() * (canvas.width - flagRadius * 2) + flagRadius,
    y: Math.random() * (canvas.height - flagRadius * 2) + flagRadius,
    image: Math.random() < 0.5 ? greenFlagImage : redFlagImage,
    radius: flagRadius,
    width: flagWidth,
    height: flagHeight,
    color: Math.random() < 0.5 ? "green" : "red",
  };
  flags.push(flag); // bayrak dizisine ekleme
}


function drawPlayer() {
  context.drawImage(player.image, player.x, player.y, player.width, player.height);
}



function drawFlags() {
  flags.forEach((flag) => {
    context.drawImage(flag.image, flag.x, flag.y, flag.width, flag.height);
  });
}
// bayrak carpisma durumlarini kontrol eder
function checkFlagCollision() {
  flags.forEach((flag, index) => {
    const dist = Math.hypot(player.x - flag.x, player.y - flag.y); // oyuncu bayrak arasi uzaklik
    if (dist - player.width/2 - flag.width/2 < 1) {
      if (flag.image===greenFlagImage) { // eger yesil bayraga carpilmissa
        flags.splice(index, 1); // o bayrak sahneden silinir
       // alert("yesil bayrak");
        score += 1;// skor arttirilir
        scoreDisplay.innerHTML = `Score: ${score}`;
        const newFlag = {
          x: Math.random() * (canvas.width - flagRadius * 2) + flagRadius,
          y: Math.random() * (canvas.height - flagRadius * 2) + flagRadius,
          image: greenFlagImage,
          width: flagWidth,
          height: flagHeight,
         // radius: flagRadius,
        };
        flags.push(newFlag);// ve yeni bayrak eklenir
      } else if (flag.color==="red") {
        alert("Game Over!");
        document.location.reload();// kirmizi bayraga carpinca direkt oyun biter
      }
    }
  });
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawPlayer();
  drawFlags();
  checkFlagCollision();
  timeLeft -= 1;
  timeElement.innerText = "Time left: " + timeLeft;

 // if (flags.length === 0) {
 //   alert("You win!");
 //   document.location.reload();
 // }
// klavyedeki tuslari yetkilendirme
  if (keys.ArrowUp && player.y - player.width/2 - player.speed > 0) {
    player.y -= player.speed;
  }
  if (
    keys.ArrowDown &&
    player.y + player.width/2 + player.speed < canvas.height ) {
    player.y += player.speed;
  }
  if (keys.ArrowLeft && player.x - player.width/2 - player.speed > 0) {
    player.x -= player.speed;
  }
  if (
    keys.ArrowRight &&
    player.x + player.width/2 + player.speed < canvas.width
  ) {
    player.x += player.speed;
  }

  drawPlayer();
  // Oyunu durdurma kontrolü
  if (timeLeft <= 0) {
    alert("Time's up!");
    document.location.reload();
  }

  requestAnimationFrame(update);
}

const keys = {};

document.addEventListener("keydown", (event) => {
  keys[event.code] = true;
});

document.addEventListener("keyup", (event) => {
  keys[event.code] = false;
});


const scoreDisplay = document.createElement("div");
scoreDisplay.classList.add("score");
scoreDisplay.innerHTML = `Score: ${score}`;
document.body.appendChild(scoreDisplay);
update();
