document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-items');
    const items = Array.from(document.querySelectorAll('.carousel-item'));
    const leftArrow = document.querySelector('.carousel-arrow.left-arrow');
    const rightArrow = document.querySelector('.carousel-arrow.right-arrow');
    let currentIndex = 2; // El centro es el índice 2 (de 0 a 4)
    const visibleCount = 5;

    function updateCarousel() {
        // Remueve la clase active de todos
        items.forEach(item => item.classList.remove('active'));
        // Agrega la clase active al central
        items[currentIndex].classList.add('active');

        // Calcula el primer índice visible (2 a la izquierda del central)
        let firstVisible = currentIndex - Math.floor(visibleCount / 2);
        // Ajuste circular
        if (firstVisible < 0) firstVisible += items.length;

        // Oculta todas
        items.forEach(item => item.style.display = 'none');
        // Muestra solo las 5 visibles
        for (let i = 0; i < visibleCount; i++) {
            let idx = (firstVisible + i) % items.length;
            items[idx].style.display = 'flex';
        }

        // Centra la imagen activa
        const itemWidth = items[0].offsetWidth + 20; // 20px de margen
        carousel.style.transform = `translateX(0)`;
    }

    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });

    // Inicializa el carrusel
    updateCarousel();

    // Ajusta el carrusel al redimensionar
    window.addEventListener('resize', updateCarousel);

    // Duplicar las imágenes para el efecto infinito
    items.forEach(item => {
        const clone = item.cloneNode(true);
        carousel.appendChild(clone);
    });
    
    // Pausar la animación cuando el mouse sale del carrusel
    carousel.addEventListener('mouseleave', () => {
        carousel.style.animationPlayState = 'paused';
    });
    
    // Reanudar la animación cuando el mouse entra al carrusel
    carousel.addEventListener('mouseenter', () => {
        carousel.style.animationPlayState = 'running';
    });
}); 