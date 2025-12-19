// main.js
// Handles: scroll progress, filters, GSAP motion, collapsibles, lightbox, etc.

// -----------------------------
// Scroll progress bar
// -----------------------------
const progressBar = document.querySelector(".scroll-progress-bar");
if (progressBar) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + "%";
  });
}

// -----------------------------
// Project filtering
// -----------------------------
const filterButtons = document.querySelectorAll(".filter-button");
const portfolioCards = document.querySelectorAll(".portfolio-card");

if (filterButtons.length && portfolioCards.length) {
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-filter");

      // Update active state
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Filter cards
      portfolioCards.forEach(card => {
        const cardCategories = card.getAttribute("data-category") || "";
        if (category === "all" || cardCategories.includes(category)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// -----------------------------
// Collapsibles (Design Style)
// -----------------------------
const collapsibles = document.querySelectorAll(".collapsible");

collapsibles.forEach(c => {
  const header = c.querySelector(".collapsible-header");
  const body = c.querySelector(".collapsible-body");

  if (!header || !body) return;

  header.addEventListener("click", () => {
    const isOpen = c.classList.contains("open");
    const bodyContent = body.scrollHeight;

    if (isOpen) {
      body.style.maxHeight = "0";
      c.classList.remove("open");
    } else {
      body.style.maxHeight = bodyContent + "px";
      c.classList.add("open");
    }
  });
});

// -----------------------------
// GSAP scroll-based motion
// -----------------------------
if (window.gsap) {
  gsap.registerPlugin(ScrollTrigger);

  // Generic reveal on scroll
  const revealEls = document.querySelectorAll(".reveal-on-scroll");
  revealEls.forEach(el => {
    gsap.fromTo(
      el,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        }
      }
    );
  });

  // Slight parallax on thumbnails
  const thumbs = document.querySelectorAll(".portfolio-thumb img");
  thumbs.forEach(img => {
    gsap.to(img, {
      y: -12,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top 90%",
        end: "bottom 10%",
        scrub: 0.6
      }
    });
  });

  // Featured project subtle entrance
  const featured = document.querySelector(".featured-project");
  if (featured) {
    gsap.fromTo(
      featured,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featured,
          start: "top 85%",
        }
      }
    );
  }
}

// -----------------------------
// Lightbox (MicroModal)
// -----------------------------
if (window.MicroModal) {
  MicroModal.init();
}

// ----------------------------------------------------
// NEW: Horizontal Section Navigation + Mini Header
// ----------------------------------------------------
const sectionNavLinks = document.querySelectorAll(".section-nav a");
const miniHeader = document.getElementById("miniSectionHeader");

const trackedSections = [
  "overview",
  "services",
  "palette",
  "beforeafter",
  "mockups",
  "process",
  "testimonial",
  "cta"
].map(id => document.getElementById(id));

function updateSectionNav() {
  let current = null;

  trackedSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 140 && rect.bottom >= 140) {
      current = section.id;
    }
  });

  // Highlight active nav link
  sectionNavLinks.forEach(link => {
    const target = link.getAttribute("href").substring(1);
    link.classList.toggle("active", target === current);
  });

  updateMiniHeader(current);
}

function updateMiniHeader(currentId) {
  if (!miniHeader) return;

  if (!currentId) {
    miniHeader.classList.remove("visible");
    return;
  }

  const section = document.getElementById(currentId);
  const title = section.querySelector("h2")?.textContent || "Section";

  miniHeader.textContent = "Current section: " + title;
  miniHeader.classList.add("visible");
}

window.addEventListener("scroll", updateSectionNav);
window.addEventListener("load", updateSectionNav);
// ----------------------------------------------------
// Smooth Scrolling for Section Navigation
// ----------------------------------------------------
const sectionNav = document.querySelector(".section-nav");
if (sectionNav) {
  sectionNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();
      window.scrollTo({
        top: targetEl.offsetTop - 80,
        behavior: "smooth"
      });
    });
  });
}

// ----------------------------------------------------
// Throttled Scroll Spy + Mini Header Sync
// ----------------------------------------------------
let scrollTimeout = null;

function throttledScrollSpy() {
  if (scrollTimeout) return;

  scrollTimeout = setTimeout(() => {
    updateSectionNav();
    scrollTimeout = null;
  }, 120);
}

window.addEventListener("scroll", throttledScrollSpy);
window.addEventListener("load", updateSectionNav);

// ----------------------------------------------------
// Animated Underline for Active Nav Link
// ----------------------------------------------------
sectionNavLinks.forEach(link => {
  link.addEventListener("mouseenter", () => link.classList.add("hover"));
  link.addEventListener("mouseleave", () => link.classList.remove("hover"));
});
// Staggered fade-up
const staggerEls = document.querySelectorAll(".fade-up-stagger");

staggerEls.forEach((section) => {
  const children = section.querySelectorAll("*");
  children.forEach((child, i) => {
    child.style.opacity = 0;
    child.style.transform = "translateY(20px)";
    child.style.transition = `0.6s ease ${i * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        children.forEach((child) => {
          child.style.opacity = 1;
          child.style.transform = "translateY(0)";
        });
        observer.unobserve(section);
      }
    });
  });

  observer.observe(section);
});


