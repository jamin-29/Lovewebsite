// PERSONALIZE THIS DATE: use YYYY-MM-DDTHH:MM:SS in your local time.
// Example: "2025-04-14T00:00:00"
const RELATIONSHIP_START = "2026-02-27T20:45:00";

const $ = (selector) => document.querySelector(selector);
const counterEls = {
  days: $("#days"), hours: $("#hours"), minutes: $("#minutes"), seconds: $("#seconds")
};

function updateCounter() {
  const start = new Date(RELATIONSHIP_START).getTime();
  const now = Date.now();

  if (Number.isNaN(start) || start > now) {
    Object.values(counterEls).forEach((el) => { if (el) el.textContent = "--"; });
    return;
  }

  let totalSeconds = Math.floor((now - start) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  counterEls.days.textContent = String(days).padStart(3, "0");
  counterEls.hours.textContent = String(hours).padStart(2, "0");
  counterEls.minutes.textContent = String(minutes).padStart(2, "0");
  counterEls.seconds.textContent = String(seconds).padStart(2, "0");
}
updateCounter();
setInterval(updateCounter, 1000);

// Surprise message modal
const messageModal = $("#messageModal");
const modalTitle = $("#modalTitle");
const modalMessage = $("#modalMessage");

function openMessage(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  messageModal.hidden = false;
  document.body.style.overflow = "hidden";
  popHearts(9);
  $("[data-close-modal]").focus?.();
}
function closeMessage() {
  messageModal.hidden = true;
  document.body.style.overflow = "";
}
document.querySelectorAll(".surprise-card").forEach((card) => {
  card.addEventListener("click", () => {
    openMessage(card.querySelector(".surprise-title").textContent, card.dataset.message);
    card.classList.add("opened");
    card.querySelector(".surprise-hint").textContent = "A little love, just for you ♥";
  });
});
document.querySelectorAll("[data-close-modal]").forEach((el) => el.addEventListener("click", closeMessage));
$("#finalSurprise").addEventListener("click", () => {
  openMessage("You are my favorite forever. ♡", "If life is a book, you are the chapter I will reread a thousand times. Thank you for being you, for being here, and for letting me love you. Happy monthsary, my beautiful girl.");
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMessage();
    closeLetterEditor();
  }
});

// Gentle floating hearts
function popHearts(count = 5) {
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = Math.random() > .25 ? "♥" : "♡";
    heart.style.left = `${10 + Math.random() * 80}vw`;
    heart.style.top = `${60 + Math.random() * 25}vh`;
    heart.style.fontSize = `${12 + Math.random() * 20}px`;
    heart.style.animationDelay = `${Math.random() * .45}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3400);
  }
}
document.querySelector(".primary-button[href='#letter']").addEventListener("click", () => popHearts(6));

// Photo gallery: use image files if present, otherwise retain the placeholder.
document.querySelectorAll(".photo-card").forEach((card) => {
  const path = card.dataset.photo;
  const img = new Image();
  img.onload = () => {
    const placeholder = card.querySelector(".photo-placeholder");
    if (placeholder) placeholder.remove();
    const photo = document.createElement("img");
    photo.src = path;
    photo.alt = card.querySelector(".photo-caption").textContent;
    card.insertBefore(photo, card.querySelector(".photo-caption"));
  };
  img.onerror = () => {};
  img.src = path;

  card.addEventListener("click", () => {
    if (card.querySelector("img")) {
      openMessage(card.querySelector(".photo-caption").textContent, "A little memory worth keeping close. Add your own caption in index.html to make this moment even more personal.");
    } else {
      openMessage("Add your favorite memory ♡", `Place a photo in the images folder and name it ${path.split("/").pop()}. The photo will appear here automatically when you refresh the page.`);
    }
  });
});

// Personal letter editor (preview changes in this page; copy text into index.html to keep it).
const letterModal = $("#letterModal");
const letterInput = $("#letterInput");
const letterCard = document.querySelector(".letter-card");
const editLetter = $("#editLetter");
const originalLetterHTML = letterCard.innerHTML;

editLetter.addEventListener("click", () => {
  const currentText = [...letterCard.querySelectorAll("p:not(.letter-greeting):not(.letter-signoff)")].map(p => p.textContent).join("\n\n");
  letterInput.value = currentText;
  letterModal.hidden = false;
  document.body.style.overflow = "hidden";
  letterInput.focus();
});
function closeLetterEditor() {
  letterModal.hidden = true;
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-close-letter]").forEach((el) => el.addEventListener("click", closeLetterEditor));
$("#saveLetter").addEventListener("click", () => {
  const paragraphs = letterInput.value.split(/\n\s*\n/).map(text => text.trim()).filter(Boolean);
  const greeting = document.createElement("p");
  greeting.className = "letter-greeting";
  greeting.textContent = "My love,";
  const fragment = document.createDocumentFragment();
  fragment.appendChild(greeting);
  paragraphs.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    fragment.appendChild(p);
  });
  const signoff = document.createElement("p");
  signoff.className = "letter-signoff";
  signoff.append("Always yours, ");
  const em = document.createElement("em");
  em.textContent = "Your love ♡";
  signoff.appendChild(document.createElement("br"));
  signoff.appendChild(em);
  fragment.appendChild(signoff);
  fragment.appendChild(editLetter);
  letterCard.replaceChildren(fragment);
  closeLetterEditor();
  popHearts(12);
});

// Optional music hook: browser audio needs a real audio file and user interaction.
// Put a royalty-free/owned track at music/love-song.mp3 and uncomment the src below.
const audio = $("#loveAudio");
// audio.src = "music/love-song.mp3";
const musicToggle = $("#musicToggle");
musicToggle.addEventListener("click", async () => {
  if (!audio.src) {
    openMessage("A song for us ♫", "To add background music, place a song you have permission to use at music/love-song.mp3, then uncomment the audio.src line in script.js. Browsers require a tap before music can play.");
    return;
  }
  if (audio.paused) {
    try {
      await audio.play();
      $("#musicLabel").textContent = "Pause love song";
      musicToggle.setAttribute("aria-pressed", "true");
    } catch {
      openMessage("Music could not start", "Please try tapping the music button again.");
    }
  } else {
    audio.pause();
    $("#musicLabel").textContent = "Enable love song";
    musicToggle.setAttribute("aria-pressed", "false");
  }
});
