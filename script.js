const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll("nav a[href*='#']");
const revealItems = document.querySelectorAll(".reveal");
const serviceButtons = document.querySelectorAll(".service-card");
const serviceTitle = document.getElementById("service-title");
const serviceCopy = document.getElementById("service-copy");
const serviceTags = document.getElementById("service-tags");
const hero = document.querySelector(".hero");

const services = {
  website: {
    title: "Website Design",
    copy: "Best for a new online presence or a full redesign. Includes page structure, visual direction, responsive layouts, interaction details, and a polished launch-ready website.",
    tags: ["Responsive pages", "Story-led layout", "Launch polish"]
  },
  booking: {
    title: "Booking Systems",
    copy: "Best for service businesses that need the path from interest to appointment to feel smooth, premium, and easy to understand.",
    tags: ["Inquiry flows", "Service menus", "Client confidence"]
  },
  brand: {
    title: "Brand Direction",
    copy: "Best when the website needs a stronger visual language first. We shape the colors, mood, type, voice, and page rhythm before the build.",
    tags: ["Mood direction", "Visual language", "Digital presence"]
  }
};

function updateNavbar() {
  if (!navbar) return;
  navbar.classList.toggle("scrolled", window.scrollY > 30);
}

function updateActiveNav() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const current = sections
    .filter((section) => section.getBoundingClientRect().top <= 160)
    .pop();

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", current && href.endsWith(`#${current.id}`));
  });
}

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 })
  : null;

revealItems.forEach((item) => {
  if (revealObserver) {
    revealObserver.observe(item);
  } else {
    item.classList.add("visible");
  }
});

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const service = services[button.dataset.service];
    if (!service || !serviceTitle || !serviceCopy || !serviceTags) return;

    serviceButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    serviceTitle.textContent = service.title;
    serviceCopy.textContent = service.copy;
    serviceTags.innerHTML = service.tags.map((tag) => `<span>${tag}</span>`).join("");
  });
});

if (hero) {
  hero.addEventListener("mousemove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
    hero.style.setProperty("--hero-shift-x", `${x}px`);
    hero.style.setProperty("--hero-shift-y", `${y}px`);
  });

  hero.addEventListener("mouseleave", () => {
    hero.style.setProperty("--hero-shift-x", "0px");
    hero.style.setProperty("--hero-shift-y", "0px");
  });
}

document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

document.querySelectorAll(".gallery-thumbs .thumb").forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    const mainImage = document.getElementById("main-img");
    if (!image || !mainImage) return;

    mainImage.src = image.src;
    mainImage.alt = button.getAttribute("aria-label") || "Project preview";
    document.querySelectorAll(".gallery-thumbs .thumb").forEach((thumb) => thumb.classList.remove("active"));
    button.classList.add("active");
  });
});

document.querySelectorAll(".option-buttons").forEach((group) => {
  group.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    group.querySelectorAll("button").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");
  });
});

const inquiryForm = document.getElementById("inquiry-form");

if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(inquiryForm);
    const projectType = document.querySelector('[data-choice-group="projectType"] .selected')?.textContent || "Not selected";
    const timeline = document.querySelector('[data-choice-group="timeline"] .selected')?.textContent || "Not selected";
    const budget = document.querySelector('[data-choice-group="budget"] .selected')?.textContent || "Not selected";

    const subject = encodeURIComponent("New project inquiry");
    const body = encodeURIComponent(
      `Name: ${data.get("name") || ""}\n` +
      `Email: ${data.get("email") || ""}\n` +
      `Brand / Project: ${data.get("brand") || ""}\n` +
      `Instagram / Website: ${data.get("social") || ""}\n` +
      `Project Type: ${projectType}\n` +
      `Timeline: ${timeline}\n` +
      `Budget Feel: ${budget}\n` +
      `Pricing: Case by case\n\n` +
      `Project Notes:\n${data.get("message") || ""}`
    );

    window.location.href = `mailto:savannatayla.design@gmail.com?subject=${subject}&body=${body}`;
  });
}

document.querySelectorAll(".magnetic").forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.12;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.12;
    button.style.transform = `translate(${x}px, ${y}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

window.addEventListener("scroll", () => {
  updateNavbar();
  updateActiveNav();
}, { passive: true });

updateNavbar();
updateActiveNav();
