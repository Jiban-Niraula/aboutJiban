const header = document.getElementById("siteHeader");
const mobileToggle = document.getElementById("mobileToggle");
const mobilePanel = document.getElementById("mobilePanel");
const navLinks = document.querySelectorAll(".nav-link");
const sections = [...document.querySelectorAll("main section[id]")];

const setHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 18);
};
setHeader();
window.addEventListener("scroll", setHeader, { passive: true });

mobileToggle?.addEventListener("click", () => {
  const open = mobileToggle.classList.toggle("open");
  mobilePanel.classList.toggle("open", open);
  mobileToggle.setAttribute("aria-expanded", String(open));
  mobilePanel.setAttribute("aria-hidden", String(!open));
});

mobilePanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileToggle.classList.remove("open");
    mobilePanel.classList.remove("open");
    mobileToggle.setAttribute("aria-expanded", "false");
    mobilePanel.setAttribute("aria-hidden", "true");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
);
sections.forEach((section) => activeObserver.observe(section));

const typeTarget = document.getElementById("typewriter");
const typeText = "Jiban Niraula";
let typeIndex = 0;
const type = () => {
  if (!typeTarget || typeIndex > typeText.length) return;
  typeTarget.textContent = typeText.slice(0, typeIndex);
  typeIndex += 1;
  setTimeout(type, typeIndex < 4 ? 160 : 72);
};
setTimeout(type, 350);

const tabs = document.querySelectorAll(".tab-btn");
const panels = document.querySelectorAll(".tab-panel");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    panels.forEach((panel) => panel.classList.toggle("active", panel.id === target));
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const form = document.getElementById("contactForm");
const response = document.getElementById("formResponse");
form?.addEventListener("submit", async (event) => {
  if (!form.action.includes("formspree.io")) return;
  event.preventDefault();
  response.textContent = "Sending...";
  response.classList.remove("err");

  try {
    const res = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error("Failed to send message");
    form.reset();
    response.textContent = "Message sent successfully.";
  } catch (error) {
    response.textContent = "Message could not be sent. Please email directly.";
    response.classList.add("err");
  }
});

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas?.getContext("2d");
let stars = [];

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(110, Math.floor(window.innerWidth / 12));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.25 + 0.25,
    a: Math.random() * 0.55 + 0.15,
    s: Math.random() * 0.15 + 0.03,
  }));
}

function drawStars() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = "#030712";
  ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (const star of stars) {
    star.y += star.s;
    if (star.y > window.innerHeight) {
      star.y = -4;
      star.x = Math.random() * window.innerWidth;
    }
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(148, 163, 184, ${star.a})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

if (canvas && ctx && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  resizeCanvas();
  drawStars();
  window.addEventListener("resize", resizeCanvas);
}
