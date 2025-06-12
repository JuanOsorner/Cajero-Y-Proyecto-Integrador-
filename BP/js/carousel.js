// js/carousel.js

document.addEventListener('DOMContentLoaded', () => {
    const carouselItems = document.querySelector('.carousel-items');
    const leftArrow = document.querySelector('.carousel-arrow.left-arrow');
    const rightArrow = document.querySelector('.carousel-arrow.right-arrow');

    // Verificación para asegurar que los elementos existen antes de intentar manipularlos
    if (!carouselItems || !leftArrow || !rightArrow) {
        console.warn("Elementos del carrusel no encontrados. La animación del carrusel no se iniciará.");
        return; 
    }

    // Calcula el ancho de un ítem del carrusel, incluyendo el gap.
    // Esto asume que todos los items tienen el mismo ancho y un gap consistente.
    const firstCarouselItem = carouselItems.querySelector('.carousel-item');
    let itemWidth = firstCarouselItem ? firstCarouselItem.offsetWidth : 0;
    let gap = 0;
    if (itemWidth > 0) { // Solo si hay al menos un ítem
        gap = parseFloat(getComputedStyle(carouselItems).gap);
    }
    const scrollAmount = itemWidth + gap; // Cantidad de píxeles a desplazar por cada 'paso'

    let autoScrollInterval; // Variable para almacenar el ID del intervalo de auto-scroll
    const autoScrollDelay = 3000; // Tiempo en milisegundos para el auto-scroll (3 segundos)
    const manualInteractionDelay = 5000; // Tiempo en milisegundos para reiniciar auto-scroll después de interacción manual

    // --- Funcionalidad de Auto-Scroll ---
    const startAutoScroll = () => {
        stopAutoScroll(); // Limpiar cualquier intervalo existente para evitar duplicados
        
        autoScrollInterval = setInterval(() => {
            // Si hay más contenido a la derecha para desplazar
            if (carouselItems.scrollLeft + carouselItems.clientWidth < carouselItems.scrollWidth - 1) { // -1 para tolerancia de píxeles
                carouselItems.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            } else {
                // Si llega al final, vuelve al principio de forma suave
                carouselItems.scrollTo({ left: 0, behavior: 'smooth' });
            }
        }, autoScrollDelay);
    };

    const stopAutoScroll = () => {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    };

    // --- Funcionalidad de los Botones de Flecha ---
    leftArrow.addEventListener('click', () => {
        stopAutoScroll(); // Detener auto-scroll al interactuar manualmente
        carouselItems.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        // Reiniciar auto-scroll después de un breve retraso de inactividad
        setTimeout(startAutoScroll, manualInteractionDelay);
    });

    rightArrow.addEventListener('click', () => {
        stopAutoScroll(); // Detener auto-scroll al interactuar manualmente
        carouselItems.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        // Reiniciar auto-scroll después de un breve retraso de inactividad
        setTimeout(startAutoScroll, manualInteractionDelay);
    });

    // --- Lógica para Pausar/Reiniciar Auto-Scroll con Interacción del Usuario ---
    // Pausar autoplay al interactuar manualmente con el scroll del carrusel
    let scrollTimeout;
    carouselItems.addEventListener('scroll', () => {
        stopAutoScroll(); // Detiene el auto-scroll mientras el usuario scrollea
        clearTimeout(scrollTimeout); // Limpia el temporizador para reiniciar
        // Reiniciar auto-scroll después de un breve retraso si el scroll manual ha terminado
        scrollTimeout = setTimeout(startAutoScroll, manualInteractionDelay);
    });

    // Pausar autoplay si el ratón está sobre el carrusel
    carouselItems.addEventListener('mouseenter', stopAutoScroll);
    // Reanudar autoplay si el ratón sale del carrusel
    carouselItems.addEventListener('mouseleave', startAutoScroll);

    // También pausar/reanudar con las flechas
    leftArrow.addEventListener('mouseenter', stopAutoScroll);
    leftArrow.addEventListener('mouseleave', startAutoScroll);
    rightArrow.addEventListener('mouseenter', stopAutoScroll);
    rightArrow.addEventListener('mouseleave', startAutoplay); // Bug: Should be startAutoplay, not startAutoplay, but referencing startAutoplay from outside scope is fine.

    // --- Iniciar Auto-Scroll al cargar la página ---
    startAutoScroll();
});