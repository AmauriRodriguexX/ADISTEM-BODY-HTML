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
        let isTransitioning = false;

        // Inicializar slides y dots
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add("active-slide");
            } else {
                slide.classList.remove("active-slide");
            }
        });

        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add("active-indicator");
            } else {
                dot.classList.remove("active-indicator");
            }

            dot.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!isTransitioning && currentSlide !== index) {
                    changeSlide(index);
                }
            });
        });

        let slideInterval = setInterval(nextSlide, 6000);

        function nextSlide() {
            changeSlide((currentSlide + 1) % slides.length);
        }

        function changeSlide(newIndex) {
            if (isTransitioning || currentSlide === newIndex) return; 

            isTransitioning = true;

            // Remover clase activa del slide y dot actuales
            slides[currentSlide].classList.remove("active-slide");
            dots[currentSlide].classList.remove("active-indicator");

            // Actualizar índice de slide actual
            currentSlide = newIndex;

            // Añadir clase activa al nuevo slide y dot
            slides[currentSlide].classList.add("active-slide");
            dots[currentSlide].classList.add("active-indicator");

            // Manejar transición
            setTimeout(() => {
                isTransitioning = false;
            }, 800); // Duración de la transición en ms

            resetInterval();
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 6000);
        }
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
    function initSliders() {
        // Selecciona todos los sliders por una clase común
        const sliders = document.querySelectorAll(".carousel.slide.vehicle-section-mobile");

        sliders.forEach((slider, sliderIndex) => {
            // Desactivar cualquier control de Bootstrap sobre este slider
            if (typeof bootstrap !== 'undefined') {
                const bsCarouselInstance = bootstrap.Carousel.getInstance(slider);
                if (bsCarouselInstance) {
                    bsCarouselInstance.dispose(); // Desactivar la instancia de Bootstrap
                }
            }

            // Selecciona los slides y dots dentro de este slider
            const slides = slider.querySelectorAll(".carousel-item");
            const dots = slider.querySelectorAll(".vehicle-custom-dot");

            if (slides.length === 0 || dots.length === 0) {
                console.error(`No se encontraron slides o dots en el slider ${sliderIndex + 1}. Verifica tu HTML.`);
                return;
            }

            let currentSlide = 0;
            let isTransitioning = false;
            let isDragging = false;
            let startX = 0;
            const dragThreshold = 50;
            const transitionDuration = 300;

            // Aseguramos que solo un slide y dot estén activos
            slides.forEach((slide, index) => {
                if (index !== currentSlide) {
                    slide.style.display = "none";
                    slide.style.opacity = "0";
                    slide.style.visibility = "hidden";
                    slide.classList.remove("active");
                } else {
                    slide.style.display = "block";
                    slide.style.opacity = "1";
                    slide.style.visibility = "visible";
                    slide.classList.add("active");
                }
            });

            dots.forEach((dot, index) => {
                if (index !== currentSlide) {
                    dot.classList.remove("active-dot");
                } else {
                    dot.classList.add("active-dot");
                }

                // Añadir event listener para cada dot
                dot.addEventListener("click", function () {
                    goToSlide(index);
                });
            });

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

            // Añadir event listeners para arrastrar
            slider.addEventListener("mousedown", startDrag);
            slider.addEventListener("mouseup", endDrag);
            slider.addEventListener("mouseleave", endDrag);
            slider.addEventListener("touchstart", startDrag);
            slider.addEventListener("touchend", endDrag);

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
        });
    }

    initSliders();
});


// tabs js
// Función para activar los tabs de forma independiente
function activateTabs(containerSelector) {
    const container = document.querySelector(containerSelector);
    
    if (container) {
        const tabs = container.querySelectorAll('.tabs-rounded-ram-tab');
        const contents = container.querySelectorAll('.tabs-rounded-ram-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Eliminar la clase active de todos los botones dentro del contenedor
                tabs.forEach(btn => btn.classList.remove('active-tab'));
                
                // Agregar la clase active al botón seleccionado
                this.classList.add('active-tab');
                
                // Ocultar todos los contenidos dentro del contenedor
                contents.forEach(content => content.classList.remove('active-content'));
                
                // Mostrar el contenido correspondiente al tab seleccionado
                const tabContent = container.querySelector(`#${this.getAttribute('data-tab')}`);
                if (tabContent) {
                    tabContent.classList.add('active-content');
                }
            });
        });
    }
}

// Activar los tabs para el contenedor de escritorio y móvil respectivamente
activateTabs('.container-tabs.d-none.d-md-block'); // Tabs de escritorio
activateTabs('.container-tabs.d-block.d-md-none'); // Tabs de móvil





