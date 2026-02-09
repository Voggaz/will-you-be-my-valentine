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
const YES_MAX_FONT_SIZE = 72;
const BUTTON_GAP = 12;

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
    const nextSize = Math.min(currentSize * YES_GROWTH_FACTOR, YES_MAX_FONT_SIZE);
    yesBtn.style.fontSize = `${nextSize}px`;

    // 3) No-Button wegspringen lassen (innerhalb der Area)
    const areaRect = area.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();

    const maxX = Math.max(0, areaRect.width - noRect.width);
    const maxY = Math.max(0, areaRect.height - noRect.height);

    const overlapsYes = (x, y) => {
      const candidate = {
        left: areaRect.left + x,
        top: areaRect.top + y,
        right: areaRect.left + x + noRect.width,
        bottom: areaRect.top + y + noRect.height
      };

      return (
        candidate.left < yesRect.right + BUTTON_GAP &&
        candidate.right > yesRect.left - BUTTON_GAP &&
        candidate.top < yesRect.bottom + BUTTON_GAP &&
        candidate.bottom > yesRect.top - BUTTON_GAP
      );
    };

    const corners = [
      { x: 0, y: 0 },
      { x: maxX, y: 0 },
      { x: 0, y: maxY },
      { x: maxX, y: maxY }
    ];

    let nextPosition = null;
    for (let i = 0; i < 120; i += 1) {
      const x = Math.floor(Math.random() * (maxX + 1));
      const y = Math.floor(Math.random() * (maxY + 1));
      if (!overlapsYes(x, y)) {
        nextPosition = { x, y };
        break;
      }
    }

    if (!nextPosition) {
      let best = corners[0];
      let bestDistance = -Infinity;

      corners.forEach((corner) => {
        const cornerCenterX = areaRect.left + corner.x + noRect.width / 2;
        const cornerCenterY = areaRect.top + corner.y + noRect.height / 2;
        const yesCenterX = yesRect.left + yesRect.width / 2;
        const yesCenterY = yesRect.top + yesRect.height / 2;
        const distance = Math.hypot(cornerCenterX - yesCenterX, cornerCenterY - yesCenterY);

        if (distance > bestDistance) {
          bestDistance = distance;
          best = corner;
        }
      });

      nextPosition = best;
    }

    noBtn.style.transform = "none";
    noBtn.style.left = `${nextPosition.x}px`;
    noBtn.style.top = `${nextPosition.y}px`;

    // damit "right" nicht mehr reinfunkt
    noBtn.style.right = "auto";
  });
});
