const fruitImages = ['1.png', '2.png', '3.png', '4.png', '5.png', '61.png', '71.png'];
let attempts = 0;
let username = prompt("Введіть своє ім'я") || "Анонім";
document.getElementById("username").innerText = `Вітаємо, ${username}!`;
document.getElementById("attempt").innerText = `Раунд: 0 з 3`;

window.onload = () => {
  setTimeout(() => {
    spin();
    attempts = 1;
    document.getElementById("attempt").innerText = `Раунд: 1 з 3`;
  }, 100);
};
function spin() {
  let grid = [];
  let usedImages = new Set();

  document.querySelectorAll('.slot-cell').forEach(cell => {
    cell.classList.remove('win-effect');
  });
  for (let i = 1; i <= 9; i++) {
    let col = (i - 1) % 3;
    let availableImages = fruitImages.filter(img => !usedImages.has(`${col}-${img}`));
    let randomFruit = availableImages[Math.floor(Math.random() * availableImages.length)];
    document.getElementById(`cell${i}`).style.backgroundImage = `url(${randomFruit})`;
    grid.push(randomFruit);
    usedImages.add(`${col}-${randomFruit}`);
  }
  checkWin(grid);
}
function checkWin(grid) {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 4, 8], [2, 4, 6]             
  ];
  let isWin = false;
  winningCombos.forEach(combo => {
    if (grid[combo[0]] === grid[combo[1]] && grid[combo[1]] === grid[combo[2]]) {
      isWin = true;
      combo.forEach(index => {
        document.getElementById(`cell${index + 1}`).classList.add('win-effect');
      });
    }
  });
  if (isWin) {
    showJackpot();
    document.getElementById("attempt").innerText = `Виграно на ${attempts}-му раунді!`;
  } else if (attempts < 3) {
    attempts++;
    document.getElementById("attempt").innerText = `Раунд: ${attempts} з 3`;
  } else {
    alert("Спроби закінчились! Спробуйте ще раз.");
    attempts = 1;
    document.getElementById("attempt").innerText = `Раунд: 1 з 3`;
  }
}
function showJackpot() {
  const jackpotMessage = document.getElementById("jackpotMessage");
  jackpotMessage.style.display = "block";
  setTimeout(() => {
    jackpotMessage.style.display = "none";
  }, 3000);
  animateCoins();
}
function animateCoins() {
  for (let i = 0; i < 20; i++) {
    const coin = document.createElement("div");
    coin.textContent = "💰";
    coin.style.position = "absolute";
    coin.style.left = Math.random() * window.innerWidth + "px";
    coin.style.top = "-50px";
    coin.style.fontSize = "24px";
    coin.style.transform = `rotate(${Math.random() * 360}deg)`;
    coin.style.animation = `fall 2s linear ${Math.random() * 0.5}s`;
    document.body.appendChild(coin);
    setTimeout(() => document.body.removeChild(coin), 2000);
  }
}







