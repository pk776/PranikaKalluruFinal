
// BEFORE/AFTER SLIDER LOGIC
const slider = document.getElementById("sliderHandle");
const afterImg = document.getElementById("afterImg");

if (slider && afterImg) {
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
}
