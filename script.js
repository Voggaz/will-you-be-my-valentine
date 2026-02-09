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
let noClickCount = 0;
const YES_GROWTH_FACTOR = 1.25;
const TAKEOVER_CLICKS = 10;

document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");

  if (!yesBtn || !noBtn) {
    console.error("Buttons not found. Check index.html ids.");
    return;
  }

  const activateTakeover = () => {
    if (yesBtn.classList.contains("takeover")) {
      return;
    }
    yesBtn.style.fontSize = "";
    yesBtn.classList.add("takeover");
  };

  yesBtn.addEventListener("click", () => {
    window.location.href = "yes_page.html";
  });

  noBtn.addEventListener("click", () => {
    // 1) Text ändern
    noBtn.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    noClickCount += 1;

    // 2) Yes größer machen
    const currentSize = parseFloat(getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = `${currentSize * YES_GROWTH_FACTOR}px`;

    // 3) Nach einigen No-Klicks übernimmt Yes den ganzen Screen
    if (noClickCount >= TAKEOVER_CLICKS) {
      activateTakeover();
    }
  });
});
