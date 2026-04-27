// Quitar el preloader al cargar la página (con un ligero retraso extra para apreciar el logo)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => { 
                preloader.style.visibility = 'hidden'; 
                document.body.classList.remove('no-scroll');
            }, 800);
        }, 2500); // 2.5 segundos extra de visualización
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a todos los elementos con clase 'parallax-element'
    const parallaxElements = document.querySelectorAll('.parallax-element');
    
    // Punto de quiebre para móvil (en píxeles) coincidiendo con Bootstrap md (768px)
    const mobileBreakpoint = 768;

    // Función que maneja el efecto Parallax
    const handleScroll = () => {
        // Verificar si la pantalla es de escritorio/tablet grande
        if (window.innerWidth >= mobileBreakpoint) {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                // Obtener la velocidad definida en el atributo data-speed, por defecto 0.5
                const speed = parseFloat(el.getAttribute('data-speed')) || 0.5;
                // Calcular el desplazamiento en Y
                const yPos = scrollY * speed;
                
                // Aplicar la transformación usando requestAnimationFrame implícito del navegador
                el.style.transform = `translateY(${yPos}px)`;
            });
        } else {
            // Si es móvil, nos aseguramos de que los elementos estén en su posición original
            parallaxElements.forEach(el => {
                if (el.style.transform !== 'translateY(0px)') {
                    el.style.transform = 'translateY(0px)';
                }
            });
        }
    };

    // Escuchar el evento de scroll
    window.addEventListener('scroll', () => {
        // Usar requestAnimationFrame para optimizar el rendimiento del evento scroll
        window.requestAnimationFrame(handleScroll);
    });

    // Escuchar el evento resize para restablecer el parallax si el usuario cambia el tamaño de la ventana a móvil
    window.addEventListener('resize', handleScroll);

    // Inicializar el estado llamando a la función una vez
    handleScroll();

    // Smooth scrolling para los enlaces del nav
    document.querySelectorAll('a.nav-link, a.custom-btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    // Ajuste por el navbar fijo
                    const offset = 80;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = target.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
