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
        let isTransitioning = false; // Para evitar múltiples desplazamientos simultáneos
        const dragThreshold = 50; // Definir umbral para arrastre
        slides[currentSlide].classList.add("active-slide");
        dots[currentSlide].classList.add("active-indicator");

        let slideInterval = setInterval(nextSlide, 6000);

        function nextSlide() {
            if (!isTransitioning) changeSlide(currentSlide + 1);
        }

        function previousSlide() {
            if (!isTransitioning) changeSlide(currentSlide - 1);
        }

        function changeSlide(newIndex) {
            if (isTransitioning) return; // Prevenir cambios mientras hay una transición activa

            isTransitioning = true;
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

                isTransitioning = false; // Permitir nuevos desplazamientos
            }, 300);

            resetInterval();
        }

        function goToSlide(index) {
            if (!isTransitioning) changeSlide(index);
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
            if (!isDragging || isTransitioning) return; // No permitir cambios mientras está en transición
            isDragging = false;
            const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
            const distanceDragged = startX - endX;

            if (distanceDragged > dragThreshold) {
                nextSlide();
            } else if (distanceDragged < -dragThreshold) {
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

// Slider 2 optimización
document.addEventListener("DOMContentLoaded", function () {
    function initSlider2() {
        const slider2 = document.getElementById("vehicleSlider");
        if (!slider2) return;

        // Desactivar cualquier control de Bootstrap sobre este slider
        if (typeof bootstrap !== 'undefined') {
            const bsCarouselInstance = bootstrap.Carousel.getInstance(slider2);
            if (bsCarouselInstance) {
                bsCarouselInstance.dispose(); // Desactivar la instancia de Bootstrap
            }
        }

        // Selecciona los slides y dots usando las clases personalizadas
        const slides = slider2.querySelectorAll(".carousel-item");
        const dots = document.querySelectorAll(".vehicle-custom-dot");

        if (slides.length === 0 || dots.length === 0) {
            console.error("No se encontraron slides o dots en el slider 2. Verifica tu HTML.");
            return;
        }

        let currentSlide = 0;
        let isTransitioning = false;
        const dragThreshold = 50;
        const transitionDuration = 300;

        // Aseguramos que solo un slide y dot estén activos
        slides.forEach((slide, index) => {
            if (index !== currentSlide) {
                slide.style.display = "none";
                slide.style.opacity = "0";
                slide.style.visibility = "hidden";
                slide.classList.remove("active");
            }
        });

        dots.forEach((dot, index) => {
            if (index !== currentSlide) {
                dot.classList.remove("active-dot");
            }
        });

        slides[currentSlide].style.display = "block";
        slides[currentSlide].style.opacity = "1";
        slides[currentSlide].style.visibility = "visible";
        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active-dot");

        let slideInterval = setInterval(nextSlide, 6000);

        function nextSlide() {
            if (!isTransitioning) changeSlide(currentSlide + 1);
        }

        function previousSlide() {
            if (!isTransitioning) changeSlide(currentSlide - 1);
        }

        function changeSlide(newIndex) {
            if (isTransitioning) return;
            isTransitioning = true;

            // Remover clases activas y ocultar el slide anterior
            slides[currentSlide].classList.remove("active");
            dots[currentSlide].classList.remove("active-dot");

            slides[currentSlide].style.transition = `opacity ${transitionDuration}ms ease`;
            slides[currentSlide].style.opacity = "0";
            slides[currentSlide].style.visibility = "hidden";
            slides[currentSlide].style.display = "none";

            // Actualizar al nuevo slide
            currentSlide = (newIndex + slides.length) % slides.length;

            slides[currentSlide].style.display = "block";
            slides[currentSlide].style.opacity = "1";
            slides[currentSlide].style.visibility = "visible";
            slides[currentSlide].classList.add("active");
            dots[currentSlide].classList.add("active-dot");

            setTimeout(() => {
                isTransitioning = false;
            }, transitionDuration);

            resetInterval();
        }

        function goToSlide(index) {
            if (!isTransitioning) changeSlide(index);
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
            if (!isDragging || isTransitioning) return;
            isDragging = false;
            const endX = e.type.includes("mouse") ? e.clientX : e.changedTouches[0].clientX;
            const distanceDragged = startX - endX;

            if (distanceDragged > dragThreshold) {
                nextSlide();
            } else if (distanceDragged < -dragThreshold) {
                previousSlide();
            }
        }
    }

    initSlider2();
});




