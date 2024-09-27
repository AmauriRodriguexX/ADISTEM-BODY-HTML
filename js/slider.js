document.addEventListener("DOMContentLoaded", function () {
     function initSlider(sliderId) {
         const slider = document.getElementById(sliderId);
         const slides = slider.querySelectorAll(".custom-carousel-item");
         const dots = slider.querySelectorAll(".custom-carousel-indicators span");
 
         if (slides.length === 0 || dots.length === 0) {
             console.error(`No se encontraron slides o dots en el slider ${sliderId}. Verifica tu HTML.`);
             return;
         }
 
         let currentSlide = 0;
         let startX = 0; // Variable para almacenar la posición inicial del toque/clic
         let isDragging = false; // Estado para saber si se está arrastrando o deslizando
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
 
                 // Ajustar el índice para mantenerse dentro del rango
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
 
         // Eventos para el arrastre en escritorio
         slider.addEventListener("mousedown", startDrag);
         slider.addEventListener("mouseup", endDrag);
 
         // Eventos para el deslizamiento en dispositivos móviles
         slider.addEventListener("touchstart", startDrag);
         slider.addEventListener("touchend", endDrag);
 
         // Función para iniciar el arrastre o deslizamiento
         function startDrag(e) {
             isDragging = true;
             startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
         }
 
         // Función para finalizar el arrastre o deslizamiento
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
 
         // Aplicar los mismos eventos a las imágenes dentro del slider
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
 
     // Inicializa los sliders según el dispositivo
     function initSlidersBasedOnViewport() {
         if (window.innerWidth <= 768) {
             document.getElementById('desktopSlider').style.display = 'none';
             document.getElementById('mobileSlider').style.display = 'block';
             initSlider('mobileSlider');
         } else {
             document.getElementById('desktopSlider').style.display = 'block';
             document.getElementById('mobileSlider').style.display = 'none';
             initSlider('desktopSlider');
         }
     }
 
     // Llama a la función en la carga de la página y en redimensionamiento
     initSlidersBasedOnViewport();
     window.addEventListener('resize', initSlidersBasedOnViewport);
 });
 