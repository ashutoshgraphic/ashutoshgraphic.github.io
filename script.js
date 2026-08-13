const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const preloader = document.getElementById("preloader");

/* PRELOADER */
window.addEventListener("load", () => {
  setTimeout(() => preloader.classList.add("hide"), 1300);
});

/* THEME */
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") body.classList.add("light-mode");

function updateThemeIcon() {
  themeBtn.innerHTML = body.classList.contains("light-mode") ? "<span>☀</span>" : "<span>◐</span>";
}
updateThemeIcon();

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  localStorage.setItem(
    "portfolio-theme",
    body.classList.contains("light-mode") ? "light" : "dark"
  );
  updateThemeIcon();
});

/* MOBILE NAV */
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

/* ACTIVE LINK */
const sections = [...document.querySelectorAll("section[id]")];
const links = [...document.querySelectorAll(".nav a")];

function setActive() {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
}
window.addEventListener("scroll", setActive);
setActive();

/* REVEAL */
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

/* FILTERS */
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".work-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(f => f.classList.remove("active"));
    filter.classList.add("active");
    const value = filter.dataset.filter;

    cards.forEach(card => {
      const show = value === "all" || card.dataset.category === value;
      card.classList.toggle("hidden", !show);
    });
  });
});

/* POINTER GLOW + CUSTOM CURSOR */
const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX;
let ringY = mouseY;

window.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = `${mouseX}px`;
  dot.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.14;
  ringY += (mouseY - ringY) * 0.14;
  ring.style.left = `${ringX}px`;
  ring.style.top = `${ringY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll("a,button,.work-card,.skill-card,.service-card").forEach(el => {
  el.addEventListener("mouseenter", () => {
    ring.style.width = "58px";
    ring.style.height = "58px";
  });
  el.addEventListener("mouseleave", () => {
    ring.style.width = "38px";
    ring.style.height = "38px";
  });
});

/* MAGNETIC BUTTONS */
document.querySelectorAll(".magnetic").forEach(el => {
  el.addEventListener("mousemove", e => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
});

/* HERO ART PARALLAX */
const heroCard = document.getElementById("heroCard");
const heroArt = document.querySelector(".hero-art");

window.addEventListener("mousemove", e => {
  if (window.innerWidth <= 800) return;
  const x = (e.clientX / window.innerWidth - 0.5);
  const y = (e.clientY / window.innerHeight - 0.5);
  heroArt.style.transform = `translate(${x * 12}px, ${y * 12}px)`;
  heroCard.style.transform =
    `translate(calc(-50% + ${x * 12}px), calc(-50% + ${y * 12}px))
     rotate(${x * 5 - 7}deg)`;
});

/* CARD TILT */
document.querySelectorAll(".tilt-item").forEach(card => {
  card.addEventListener("mousemove", e => {
    if (window.innerWidth <= 800) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 5}deg) translateY(-8px)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

/* REDUCE MOTION SUPPORT */
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (reduceMotion.matches) {
  document.documentElement.style.scrollBehavior = "auto";
}
