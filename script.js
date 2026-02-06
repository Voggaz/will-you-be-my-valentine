const messages = [
  "Are you sure?",
  "Really sure??",
  "Are you positive?",
  "Pookie please...",
  "Just think about it!",
  "If you say no, I will be really sad...",
  "I will be very sad...",
  "I will be very very very sad...",
  "Ok fine, I will stop asking...",
  "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const area = document.getElementById("buttonsArea");

  if (!yesBtn || !noBtn || !area) {
    console.error("Buttons not found. Check index.html ids.");
    return;
  }

  yesBtn.addEventListener("click", () => {
    window.location.href = "yes_page.html";
  });

  noBtn.addEventListener("click", () => {
    // 1) Text ändern
    noBtn.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // 2) Yes größer machen
    const currentSize = parseFloat(getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * 1.25}px`;

    // 3) No-Button wegspringen lassen (innerhalb der Area)
    const areaRect = area.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    const maxX = areaRect.width - btnRect.width;
    const maxY = areaRect.height - btnRect.height;

    const x = Math.max(0, Math.floor(Math.random() * maxX));
    const y = Math.max(0, Math.floor(Math.random() * maxY));

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // damit "right" nicht mehr reinfunkt
    noBtn.style.right = "auto";
  });
});