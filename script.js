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

document.querySelectorAll(".hero-showcase").forEach((showcase) => {
  const track = showcase.querySelector(".showcase-track");
  const slides = [...showcase.querySelectorAll(".showcase-slide")];
  const dots = [...showcase.querySelectorAll(".showcase-dots span")];
  const controls = showcase.querySelectorAll("[data-showcase-direction]");
  if (!track || slides.length === 0) return;

  function getCurrentIndex() {
    return Math.round(track.scrollLeft / track.clientWidth);
  }

  function updateShowcaseState() {
    const currentIndex = Math.max(0, Math.min(slides.length - 1, getCurrentIndex()));
    dots.forEach((dot, index) => dot.classList.toggle("active", index === currentIndex));
  }

  controls.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = Number(button.dataset.showcaseDirection);
      const nextIndex = (getCurrentIndex() + direction + slides.length) % slides.length;
      track.scrollTo({
        left: nextIndex * track.clientWidth,
        behavior: "smooth"
      });
    });
  });

  track.addEventListener("scroll", updateShowcaseState, { passive: true });
  window.addEventListener("resize", updateShowcaseState);
  updateShowcaseState();
});

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
  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(inquiryForm);
    const projectType = document.querySelector('[data-choice-group="projectType"] .selected')?.textContent || "Not selected";
    const timeline = document.querySelector('[data-choice-group="timeline"] .selected')?.textContent || "Not selected";
    const budget = document.querySelector('[data-choice-group="budget"] .selected')?.textContent || "Not selected";
    const formNote = document.getElementById("form-note");
    const submitButton = inquiryForm.querySelector('[type="submit"]');

    const payload = {
      _subject: "New project inquiry from savannatayla.com",
      _template: "table",
      _captcha: "false",
      name: data.get("name") || "",
      email: data.get("email") || "",
      brand_project: data.get("brand") || "",
      instagram_website: data.get("social") || "",
      project_type: projectType,
      timeline,
      budget_feel: budget,
      pricing: "Case by case",
      project_notes: data.get("message") || "",
      inspiration_links_notes: data.get("inspo") || ""
    };

    if (formNote) {
      formNote.textContent = "Sending your inquiry...";
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "SENDING...";
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/savannatayla.design@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Inquiry failed to send");
      }

      inquiryForm.reset();
      document.querySelectorAll(".option-buttons .selected").forEach((button) => button.classList.remove("selected"));

      if (formNote) {
        formNote.textContent = "Thank you. Your inquiry has been sent and I will reply within 1-3 business days.";
      }
    } catch (error) {
      if (formNote) {
        formNote.textContent = "Something went wrong. Please email savannatayla.design@gmail.com directly.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = "SEND INQUIRY";
      }
    }
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
