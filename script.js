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

/* Mouse-follow and drag effects intentionally removed. */
