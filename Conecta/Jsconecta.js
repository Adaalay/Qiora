const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const index = [...cards].indexOf(entry.target);

        if (entry.isIntersecting) {
            // 👉 Aparecen en cascada
            entry.target.style.transitionDelay = `${index * 0.2}s`;
            entry.target.classList.add('show');
        } else {
            // 👉 Desaparecen en cascada también
            entry.target.style.transitionDelay = `${index * 0.2}s`;
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.3
});

cards.forEach(card => observer.observe(card));


//   contacto
// Observador que activa/desactiva el efecto
// Seleccionamos la sección compromiso
const compromiso = document.querySelector('.compromiso');

let active = false;
const observer1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        active = entry.isIntersecting;
    });
}, { threshold: 0.1 });

observer1.observe(compromiso);

const scaleInicial = 1.2; // 👈 valor inicial de escala (ajústalo a gusto)

window.addEventListener('scroll', () => {
    if (!active) return; // solo aplica si la sección está visible

    const scrollY = window.scrollY;
    const start = compromiso.offsetTop;

    const scaleCompromiso = scaleInicial - (scrollY - start) / 4000;
    compromiso.style.transform = `scale(${scaleCompromiso})`;
});

//iconoanimacion
const video = document.getElementById("miVideo");

    // Reproducir al pasar el mouse
    video.addEventListener("mouseenter", () => {
      video.play();
      video.currentTime = 0;
    });

    // Pausar y reiniciar al quitar el mouse
    video.addEventListener("mouseleave", () => {
      video.pause();
    });

// Cambio de icono 
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const links = document.querySelectorAll('link[rel="icon"]');

const updateIcon = () => {
    const isDark = mediaQuery.matches;
    const dataKey = isDark ? 'hrefDark' : 'hrefLight';

    Array.prototype.slice.call(links).forEach(link => {
        link.href = link.dataset[dataKey];
    });
};

mediaQuery.addEventListener('change', updateIcon);
updateIcon();


//Animacion scroll 
document.addEventListener("DOMContentLoaded", () => {
    const imagenContainer = document.querySelector(".imagen-container"); // 👈 ajusta selector
    const imagen = imagenContainer?.querySelector("#imagen1"); // o ".imagen1"

    if (!imagenContainer || !imagen) return; // seguridad

    const observer4 = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                imagen.classList.add("visible");
                observer4.unobserve(entry.target); // ahora sí usa observer4
            }
        });
    }, { threshold: 0.3 });

    observer4.observe(imagenContainer);
});


// // imagenes
// // Selecciona todos los div del documento
// const images = document.querySelectorAll('div');

// const observer3 = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         // const index = [...images].indexOf(entry.target); // Opcional para cascada
//         if (entry.isIntersecting) {
//             entry.target.style.transitionDelay = `${index * 0.1}s`; // cascada sutil
//             entry.target.classList.add('show');
//         } else {
//             entry.target.style.transitionDelay = `${index * 0.1}s`;
//             entry.target.classList.remove('show');
//         }
//     });
// }, {
//     threshold: 0.3 // Ajusta el porcentaje visible antes de animar
// });
// // Observa todas las imágenes
// images.forEach(div => observer3.observe(div));