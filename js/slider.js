document.addEventListener("DOMContentLoaded", function () {
    function initSlider(sliderId) {
        const slider = document.getElementById(sliderId);
        if (!slider) return; 

        const slides = Array.from(slider.querySelectorAll(".custom-carousel-item"));
        const dots = Array.from(slider.querySelectorAll(".custom-carousel-indicators span"));

        if (!slides.length || !dots.length) {
            console.error(`No se encontraron slides o dots en el slider ${sliderId}. Verifica tu HTML.`);
            return;
        }

        let currentSlide = 0;
        let startX = 0;
        let isDragging = false;
        let isTransitioning = false;
        const dragThreshold = 50;

        slides[currentSlide].classList.add("active-slide");
        dots[currentSlide].classList.add("active-indicator");

        let slideInterval = setInterval(nextSlide, 6000);

        function nextSlide() {
            changeSlide((currentSlide + 1) % slides.length);
        }

        function previousSlide() {
            changeSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        function changeSlide(newIndex) {
            if (isTransitioning || currentSlide === newIndex) return; 

            isTransitioning = true;
            slides[currentSlide].classList.remove("active-slide");
            dots[currentSlide].classList.remove("active-indicator");

            currentSlide = newIndex;

            slides[currentSlide].style.opacity = "0";
            slides[currentSlide].offsetWidth; // Forzar reflow
            slides[currentSlide].classList.add("active-slide");
            dots[currentSlide].classList.add("active-indicator");

            slides[currentSlide].style.transition = "opacity 0.8s ease";
            slides[currentSlide].style.opacity = "1";

            requestAnimationFrame(() => {
                setTimeout(() => {
                    isTransitioning = false;
                }, 800);
            });

            resetInterval();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener("click", (e) => {
                e.preventDefault(); // Evitar el desplazamiento automático
                e.stopPropagation(); // Detener la propagación del evento
                changeSlide(index);
            });
        });

        function handleDragStart(e) {
            if (isTransitioning) return;
            isDragging = true;
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        }

        function handleDragEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
            const distanceDragged = startX - endX;

            if (Math.abs(distanceDragged) > dragThreshold) {
                distanceDragged > 0 ? nextSlide() : previousSlide();
            }
        }

        slider.addEventListener("mousedown", handleDragStart);
        slider.addEventListener("mouseup", handleDragEnd);
        slider.addEventListener("touchstart", handleDragStart);
        slider.addEventListener("touchend", handleDragEnd);
        
        // Desactivar el enfoque de los elementos
        slider.setAttribute('tabindex', '-1');
        slides.forEach(slide => slide.setAttribute('tabindex', '-1'));
        dots.forEach(dot => dot.setAttribute('tabindex', '-1'));
    }

    function initSlidersBasedOnViewport() {
        const desktopSlider = document.getElementById('desktopSlider');
        const mobileSlider = document.getElementById('mobileSlider');
        const isMobile = window.innerWidth <= 768;

        if (isMobile && mobileSlider) {
            desktopSlider && (desktopSlider.style.display = 'none');
            mobileSlider.style.display = 'block';
            initSlider('mobileSlider');
        } else if (desktopSlider) {
            desktopSlider.style.display = 'block';
            mobileSlider && (mobileSlider.style.display = 'none');
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




