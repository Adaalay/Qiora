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
const source = document.getElementById("videoSource");

const videoHover = "../Conecta/img/Colaboradores_1.1.mp4"; // video cuando entra
const videoLeave = "../Conecta/img/Colaboradores_1.2.mp4"; // video cuando sale

const speedHover = 2.5;  // 🔹1.5x más rápido cuando entra

// Reproducir el primer video al pasar el mouse
video.addEventListener("mouseenter", () => {
    source.src = videoHover;
    video.loop = false;
    video.load();                      // recarga el video
    // video.currentTime = 0;  
    // video.playbackRate = speedHover;          
    video.play();
});

// Reproducir el segundo video al quitar el mouse
video.addEventListener("mouseleave", () => {
    source.src = videoLeave;           // cambia la fuente
    video.load();
    video.loop = false;
    video.playbackRate = speedHover;
    // video.currentTime = 0;
    video.play();
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


// imagenes
// Selecciona todos los div del documento

const images = document.querySelectorAll('.imgWifi, .imgTitulo, .btn-i1, .p-i1, .S-escaleras, .item, .h1-t1, .s-mapa, .fotofondo, .h1-c1, .btn-c1, .p-c1, .p-c2');
const observer3 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const index = [...images].indexOf(entry.target); // para cascada
        if (entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.classList.add('show');
        } else {
            entry.target.style.transitionDelay = `${index * 0.1}s`;
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.3
});
images.forEach(div => observer3.observe(div));


// Función para subir al inicio
window.addEventListener("scroll", function () {
    const btn = document.getElementById("btnScrollTop");
    if (window.scrollY > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});
document.getElementById("btnScrollTop").onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
