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
// Smooth page transition on link click
document.querySelectorAll('a').forEach(link => {
  const url = link.getAttribute('href');

  // Only fade out for internal links
  if (url && !url.startsWith('http') && !url.startsWith('#')) {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = url;
      }, 300);
    });
  }
});

