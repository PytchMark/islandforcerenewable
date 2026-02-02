const ASSETS = {
  logo: "assets/img/logo.png",
  heroVideo: "assets/video/hero.mp4",
  heroPoster: "assets/img/hero-poster.jpg",
  financingImage: "assets/img/financing.jpg",
  whyGoSolar: "assets/img/why-go-solar.png",
  solarExplainerVideo: "assets/video/solar-explainer.mp4",
  solarExplainerPoster: "assets/img/solar-explainer-poster.jpg",
  projectsStripVideo: "assets/video/projects.mp4",
  projectsStripPoster: "assets/img/projects-strip-poster.jpg"
};

function bindAssets() {
  document.querySelectorAll("[data-asset]").forEach((el) => {
    const key = el.dataset.asset;
    const value = ASSETS[key];
    if (!value) return;
    const tag = el.tagName.toLowerCase();
    if (tag === "video") {
      if (key.toLowerCase().includes("poster")) {
        el.setAttribute("poster", value);
      } else {
        el.setAttribute("src", value);
      }
      return;
    }
    if (tag === "source" || tag === "img") {
      el.setAttribute("src", value);
      return;
    }
    el.style.backgroundImage = `url('${value}')`;
  });
}

bindAssets();

const WHATSAPP_NUMBER = "1876XXXXXXX";

function waLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

const waMessages = {
  hero_primary: "Hi Island Force Renewables — I’m ready to take control of my power. Can we talk about going solar?",
  hero_secondary: "Hi — I want to talk through a solar plan. What’s the best first step?",
  mobile_chat: "Hi — I’d like to chat on WhatsApp about solar for my home.",
  mobile_recommendation: "Hi — I’m ready for a recommendation. What should I share to get started?",
  see_difference: "Hi — I clicked ‘See the Difference’. Can you explain the monthly payment comparison for my home?",
  modal_complete: "Hi — I reviewed the utility vs solar breakdown. Okay, show me what’s possible for my home.",
  financing_qualify: "Hi — I’d like to check financing options I may qualify for. I prefer: (lower monthly payment / deposit / both).",
  final_reco: "Hi — I’d like a solar recommendation. Parish: ____. Residential/Commercial: ____. Monthly bill range: ____. Financing interest: ____.",
  nav_consult: "Hi — I’d like a quick solar consult. When can we chat?"
};

const waElements = document.querySelectorAll("[data-wa]");
waElements.forEach((el) => {
  const key = el.getAttribute("data-wa");
  const message = waMessages[key];
  if (!message) return;
  if (el.tagName.toLowerCase() === "a") {
    el.setAttribute("href", waLink(message));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  } else {
    el.addEventListener("click", () => {
      window.open(waLink(message), "_blank", "noopener,noreferrer");
    });
  }
});

const modal = document.getElementById("education-modal");
const modalOpeners = document.querySelectorAll("[data-modal-open]");
const modalClosers = document.querySelectorAll("[data-modal-close]");
let lastFocusedElement = null;

const openModal = (event) => {
  if (!modal) return;
  event.preventDefault();
  lastFocusedElement = event.currentTarget;
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  const focusable = modal.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
  if (focusable) focusable.focus();
};

const closeModal = () => {
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lastFocusedElement) lastFocusedElement.focus();
};

modalOpeners.forEach((btn) => btn.addEventListener("click", openModal));
modalClosers.forEach((btn) => btn.addEventListener("click", closeModal));

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
}

const toggleCards = document.querySelectorAll(".toggle-card");
toggleCards.forEach((card) => {
  card.addEventListener("click", () => {
    const expanded = card.getAttribute("aria-expanded") === "true";
    card.setAttribute("aria-expanded", String(!expanded));
  });
});

const selectorButtons = document.querySelectorAll(".selector-btn");
const selectorOutput = document.querySelector(".selector-output");
const selectorCopy = {
  lower: "We can prioritize the lowest monthly payment while keeping performance strong.",
  deposit: "A stronger deposit can reduce financing pressure and shorten the payoff horizon.",
  both: "We can model both paths and compare total lifetime savings."
};

selectorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    selectorButtons.forEach((el) => el.classList.remove("active"));
    btn.classList.add("active");
    const key = btn.getAttribute("data-selector");
    if (selectorOutput) selectorOutput.textContent = selectorCopy[key] || "";
  });
});

const revealElements = document.querySelectorAll(".reveal");
let revealObserver = null;

if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}

function observeNewReveals(scope) {
  if (!revealObserver) return;
  scope.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const typingContainer = document.querySelector("[data-typing]");
if (typingContainer) {
  const finalText = typingContainer.getAttribute("data-final");
  const typingTextEl = typingContainer.querySelector(".typing-text");
  const lines = [
    "You already pay monthly for electricity…",
    "What if your light bill built something?",
    "Most people rent power without realizing it.",
    "Stop renting power."
  ];

  if (prefersReducedMotion) {
    typingTextEl.textContent = finalText;
  } else {
    let lineIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const typeSpeed = 55;
    const deleteSpeed = 40;
    const pause = 1200;

    const typeLoop = () => {
      const currentLine = lines[lineIndex];
      if (!deleting) {
        typingTextEl.textContent = currentLine.slice(0, charIndex + 1);
        charIndex += 1;
        if (charIndex === currentLine.length) {
          deleting = true;
          setTimeout(typeLoop, pause);
          return;
        }
        setTimeout(typeLoop, typeSpeed);
      } else {
        typingTextEl.textContent = currentLine.slice(0, charIndex - 1);
        charIndex -= 1;
        if (charIndex === 0) {
          deleting = false;
          lineIndex += 1;
          if (lineIndex >= lines.length) {
            typingTextEl.textContent = finalText;
            return;
          }
        }
        setTimeout(typeLoop, deleteSpeed);
      }
    };

    typeLoop();
  }
}

const inlineVideo = document.querySelector(".inline-video");
const videoToggle = document.querySelector("[data-video-toggle]");
if (inlineVideo && videoToggle) {
  videoToggle.addEventListener("click", () => {
    inlineVideo.muted = !inlineVideo.muted;
    const isMuted = inlineVideo.muted;
    videoToggle.setAttribute("aria-pressed", String(!isMuted));
    videoToggle.textContent = isMuted ? "Unmute video" : "Mute video";
  });
}

const galleryState = {
  items: [],
  activeIndex: 0
};

function shuffleArray(items) {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function buildGalleryCard(item, index, isFeatured = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = isFeatured ? "featured-card" : "gallery-card";
  button.dataset.index = String(index);
  button.innerHTML = `
    <figure>
      <img src="${item.image}" alt="${item.alt}" loading="lazy" />
      <figcaption>
        <strong>${item.title}</strong>
        <div>${item.location}</div>
      </figcaption>
    </figure>
  `;
  return button;
}

function renderGallery(items) {
  const featuredContainer = document.getElementById("featured-gallery");
  const recentStrip = document.getElementById("recent-strip");
  const grid = document.getElementById("gallery-grid");
  if (!featuredContainer || !recentStrip || !grid) return;

  featuredContainer.innerHTML = "";
  recentStrip.innerHTML = "";
  grid.innerHTML = "";

  const shuffled = shuffleArray(items);
  const featured = shuffled[0];
  const recent = shuffled.slice(0, 6);

  const featuredCard = buildGalleryCard(featured, items.indexOf(featured), true);
  featuredCard.classList.add("reveal", "surface-card");
  featuredContainer.appendChild(featuredCard);

  recent.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "gallery-card";
    button.dataset.index = String(items.indexOf(item));
    button.innerHTML = `
      <img src="${item.image}" alt="${item.alt}" loading="lazy" />
    `;
    recentStrip.appendChild(button);
  });

  items.forEach((item, index) => {
    const card = buildGalleryCard(item, index);
    grid.appendChild(card);
  });

  observeNewReveals(document);
}

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxClosers = document.querySelectorAll("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
let lightboxLastFocus = null;

function updateLightbox(index) {
  const item = galleryState.items[index];
  if (!item) return;
  galleryState.activeIndex = index;
  lightboxImage.src = item.image;
  lightboxImage.alt = item.alt;
  lightboxTitle.textContent = item.title;
  lightboxCaption.textContent = item.location;
}

function openLightbox(index) {
  if (!lightbox) return;
  lightboxLastFocus = document.activeElement;
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  updateLightbox(index);
  const focusable = lightbox.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
  if (focusable) focusable.focus();
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lightboxLastFocus) lightboxLastFocus.focus();
}

function nextLightbox() {
  const nextIndex = (galleryState.activeIndex + 1) % galleryState.items.length;
  updateLightbox(nextIndex);
}

function prevLightbox() {
  const prevIndex = (galleryState.activeIndex - 1 + galleryState.items.length) % galleryState.items.length;
  updateLightbox(prevIndex);
}

if (lightboxPrev) lightboxPrev.addEventListener("click", prevLightbox);
if (lightboxNext) lightboxNext.addEventListener("click", nextLightbox);
lightboxClosers.forEach((btn) => btn.addEventListener("click", closeLightbox));

function handleLightboxTrigger(event) {
  const button = event.target.closest("button[data-index]");
  if (!button) return;
  const index = Number(button.dataset.index);
  if (Number.isNaN(index)) return;
  openLightbox(index);
}

const gallerySection = document.getElementById("gallery");
if (gallerySection) {
  gallerySection.addEventListener("click", handleLightboxTrigger);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    if (modal && modal.getAttribute("aria-hidden") === "false") closeModal();
    if (lightbox && lightbox.getAttribute("aria-hidden") === "false") closeLightbox();
  }

  if (event.key === "Tab" && modal && modal.getAttribute("aria-hidden") === "false") {
    const focusable = modal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
    const focusableArray = Array.from(focusable);
    if (focusableArray.length === 0) return;
    const first = focusableArray[0];
    const last = focusableArray[focusableArray.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (lightbox && lightbox.getAttribute("aria-hidden") === "false") {
    if (event.key === "ArrowRight") nextLightbox();
    if (event.key === "ArrowLeft") prevLightbox();
    if (event.key === "Tab") {
      const focusable = lightbox.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
      const focusableArray = Array.from(focusable);
      if (focusableArray.length === 0) return;
      const first = focusableArray[0];
      const last = focusableArray[focusableArray.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }
});

async function loadGallery() {
  try {
    const response = await fetch("data/gallery.json");
    if (!response.ok) throw new Error("Gallery not available");
    const items = await response.json();
    galleryState.items = items;
    renderGallery(items);
  } catch (error) {
    console.warn("Gallery failed to load", error);
  }
}

loadGallery();
