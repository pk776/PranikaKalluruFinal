console.log("✅ JS loaded");

// Reveal elements on scroll
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
  for (let el of reveals) {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add('visible');
    }
  }
}

// ✅ Run once on page load
revealOnScroll();

// ✅ Run again on scroll
window.addEventListener('scroll', revealOnScroll);
