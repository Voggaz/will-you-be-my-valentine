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
const YES_GROWTH_FACTOR = 1.25;

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
    yesBtn.style.fontSize = `${currentSize * YES_GROWTH_FACTOR}px`;
  });
});
