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

function toggleTheme() {
  document.body.classList.toggle("dark");
}
const slider = document.getElementById("sliderHandle");
const afterImg = document.getElementById("afterImg");

slider.addEventListener("mousedown", startSlide);

function startSlide() {
  document.addEventListener("mousemove", moveSlider);
  document.addEventListener("mouseup", stopSlide);
}

function moveSlider(e) {
  const container = slider.parentElement;
  const rect = container.getBoundingClientRect();
  let x = e.clientX - rect.left;

  x = Math.max(0, Math.min(x, rect.width));

  slider.style.left = x + "px";
  afterImg.style.width = x + "px";
}

function stopSlide() {
  document.removeEventListener("mousemove", moveSlider);
  document.removeEventListener("mouseup", stopSlide);
}
