const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll("nav a[href*='#']");
const revealItems = document.querySelectorAll(".reveal");
const serviceButtons = document.querySelectorAll(".service-card");
const serviceTitle = document.getElementById("service-title");
const serviceCopy = document.getElementById("service-copy");
const serviceTags = document.getElementById("service-tags");
const hero = document.querySelector(".hero");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const feelingCopy = document.getElementById("feeling-copy");
const moodButtons = document.querySelectorAll(".mood-btn");
const heroProjectCards = document.querySelectorAll(".hero-project-card");

const moods = {
  cinematic: {
    title: "I design websites that feel like little worlds.",
    description: "Choose a feeling below and watch the direction shift. Every site starts with atmosphere, then becomes a clear path for people to explore, connect, and take action.",
    feeling: "Cinematic - layered visuals, dramatic pacing, and a first impression that feels like an opening scene.",
    preview: "luxury"
  },
  luxury: {
    title: "Soft luxury, polished details, and pages people remember.",
    description: "For brands that need elegance without feeling stiff. Think refined type, warm restraint, tactile visuals, and a journey that feels considered from first glance to inquiry.",
    feeling: "Luxury - editorial spacing, creamy contrast, quiet confidence, and a booking path that feels premium.",
    preview: "luxury"
  },
  cozy: {
    title: "Warm digital spaces with atmosphere you can almost step into.",
    description: "For cafes, creatives, lifestyle brands, and small businesses that want the site to feel inviting, emotional, and rich with little story moments.",
    feeling: "Cozy - warm light, slower scrolling, sensory details, and a site that feels like a place.",
    preview: "cozy"
  },
  bold: {
    title: "Confident websites for people with a story worth noticing.",
    description: "For portfolios and brands that need authority, clarity, movement, and a sharper first impression without losing personality.",
    feeling: "Bold - strong contrast, focused sections, energetic movement, and content that gets to the point.",
    preview: "bold"
  }
};

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

function setHeroMood(moodName) {
  const mood = moods[moodName];
  if (!mood || !hero || !heroTitle || !heroDescription || !feelingCopy) return;

  hero.dataset.mood = moodName;
  heroTitle.classList.add("hero-copy-changing");
  heroDescription.classList.add("hero-copy-changing");
  feelingCopy.classList.add("hero-copy-changing");

  window.setTimeout(() => {
    heroTitle.textContent = mood.title;
    heroDescription.textContent = mood.description;
    feelingCopy.textContent = mood.feeling;

    heroTitle.classList.remove("hero-copy-changing");
    heroDescription.classList.remove("hero-copy-changing");
    feelingCopy.classList.remove("hero-copy-changing");
  }, 180);

  moodButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mood === moodName);
  });

  heroProjectCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.preview === mood.preview);
  });
}

moodButtons.forEach((button) => {
  button.addEventListener("click", () => setHeroMood(button.dataset.mood));
});

if (hero) {
  hero.dataset.mood = "cinematic";
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
