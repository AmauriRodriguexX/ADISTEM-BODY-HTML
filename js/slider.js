document.addEventListener("DOMContentLoaded", function () {
     function initSlider(sliderId) {
         const slider = document.getElementById(sliderId);
         if (!slider) return; // Verifica si el slider existe
 
         const slides = slider.querySelectorAll(".custom-carousel-item");
         const dots = slider.querySelectorAll(".custom-carousel-indicators span");
 
         if (slides.length === 0 || dots.length === 0) {
             console.error(`No se encontraron slides o dots en el slider ${sliderId}. Verifica tu HTML.`);
             return;
         }
 
         let currentSlide = 0;
         let startX = 0;
         let isDragging = false;
         slides[currentSlide].classList.add("active-slide");
         dots[currentSlide].classList.add("active-indicator");
 
         let slideInterval = setInterval(nextSlide, 6000);
 
         function nextSlide() {
             changeSlide(currentSlide + 1);
         }
 
         function previousSlide() {
             changeSlide(currentSlide - 1);
         }
 
         function changeSlide(newIndex) {
             slides[currentSlide].style.transition = "opacity 0.8s ease";
             slides[currentSlide].style.opacity = "0";
 
             setTimeout(() => {
                 slides[currentSlide].classList.remove("active-slide");
                 dots[currentSlide].classList.remove("active-indicator");
 
                 currentSlide = (newIndex + slides.length) % slides.length;
 
                 slides[currentSlide].classList.add("active-slide");
                 dots[currentSlide].classList.add("active-indicator");
 
                 slides[currentSlide].style.transition = "opacity 0.8s ease";
                 slides[currentSlide].style.opacity = "1";
             }, 300);
 
             resetInterval();
         }
 
         function goToSlide(index) {
             changeSlide(index);
         }
 
         function resetInterval() {
             clearInterval(slideInterval);
             slideInterval = setInterval(nextSlide, 6000);
         }
 
         dots.forEach((dot, index) => {
             dot.addEventListener("click", function () {
                 goToSlide(index);
             });
         });
 
         slider.addEventListener("mousedown", startDrag);
         slider.addEventListener("mouseup", endDrag);
 
         slider.addEventListener("touchstart", startDrag);
         slider.addEventListener("touchend", endDrag);
 
         function startDrag(e) {
             isDragging = true;
             startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
         }
 
         function endDrag(e) {
             if (!isDragging) return;
             isDragging = false;
             const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
             if (startX > endX + 50) {
                 nextSlide();
             } else if (startX < endX - 50) {
                 previousSlide();
             }
         }
 
         slides.forEach((slide) => {
             const img = slide.querySelector('img');
             if (img) {
                 img.addEventListener("mousedown", startDrag);
                 img.addEventListener("mouseup", endDrag);
                 img.addEventListener("touchstart", startDrag);
                 img.addEventListener("touchend", endDrag);
             }
         });
     }
 
     function initSlidersBasedOnViewport() {
         const desktopSlider = document.getElementById('desktopSlider');
         const mobileSlider = document.getElementById('mobileSlider');
 
         if (window.innerWidth <= 768) {
             if (desktopSlider) desktopSlider.style.display = 'none';
             if (mobileSlider) mobileSlider.style.display = 'block';
             initSlider('mobileSlider');
         } else {
             if (desktopSlider) desktopSlider.style.display = 'block';
             if (mobileSlider) mobileSlider.style.display = 'none';
             initSlider('desktopSlider');
         }
     }
 
     initSlidersBasedOnViewport();
     window.addEventListener('resize', initSlidersBasedOnViewport);
 });


 document.addEventListener("DOMContentLoaded", function () {
     function initSlider2() {
         const slider2 = document.getElementById("vehicleSlider");
         if (!slider2) return; // Verifica si el slider existe
 
         const slides = slider2.querySelectorAll(".carousel-item");
         const dots = slider2.querySelectorAll(".vehicle-custom-dot");
 
         if (slides.length === 0 || dots.length === 0) {
             console.error("No se encontraron slides o dots en el slider 2. Verifica tu HTML.");
             return;
         }
 
         let currentSlide = 0;
         let startX = 0;
         let isDragging = false;
         slides[currentSlide].classList.add("active");
         dots[currentSlide].classList.add("active-dot");
 
         let slideInterval = setInterval(nextSlide, 6000);
 
         function nextSlide() {
             changeSlide(currentSlide + 1);
         }
 
         function previousSlide() {
             changeSlide(currentSlide - 1);
         }
 
         function changeSlide(newIndex) {
             slides[currentSlide].classList.remove("active");
             dots[currentSlide].classList.remove("active-dot");
 
             currentSlide = (newIndex + slides.length) % slides.length;
 
             slides[currentSlide].classList.add("active");
             dots[currentSlide].classList.add("active-dot");
 
             resetInterval();
         }
 
         function goToSlide(index) {
             changeSlide(index);
         }
 
         function resetInterval() {
             clearInterval(slideInterval);
             slideInterval = setInterval(nextSlide, 6000);
         }
 
         dots.forEach((dot, index) => {
             dot.addEventListener("click", function () {
                 goToSlide(index);
             });
         });
 
         slider2.addEventListener("mousedown", startDrag);
         slider2.addEventListener("mouseup", endDrag);
         slider2.addEventListener("touchstart", startDrag);
         slider2.addEventListener("touchend", endDrag);
 
         function startDrag(e) {
             isDragging = true;
             startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
         }
 
         function endDrag(e) {
             if (!isDragging) return;
             isDragging = false;
             const endX = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
             if (startX > endX + 50) {
                 nextSlide();
             } else if (startX < endX - 50) {
                 previousSlide();
             }
         }
     }
 
     // Iniciar el slider 2
     initSlider2();
 });
 