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

  // Attach triggers if you want dynamic behavior (optional)
  // Thumbnails already have data-micromodal-trigger in HTML
}
