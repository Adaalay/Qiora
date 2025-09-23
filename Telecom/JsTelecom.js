// const img = document.querySelector('#imgF');
// const panel = document.querySelector('.panel');
// const spacer = document.querySelector('.img-container');
// const maxFrame = 375;

// let spacerTop;
// let spacerHeight;
// let animationStart;
// let animationEnd;

// function recalcularAlturas() {
//     const spacerRect = spacer.getBoundingClientRect();
//     const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

//     spacerTop = spacerRect.top + scrollTop;
//     spacerHeight = spacer.offsetHeight;

//     animationStart = spacerTop - window.innerHeight;
//     animationEnd = spacerTop + spacerHeight;

//     animationStart = Math.max(0, animationStart);
// }

// window.addEventListener('resize', recalcularAlturas);
// window.addEventListener('load', recalcularAlturas);
// recalcularAlturas();

// window.addEventListener('scroll', () => {
//     const scrollPosition = window.scrollY;

//     if (scrollPosition < animationStart) {
//         img.src = `../Telecom/telefono/00001.png`;
//     } else if (scrollPosition >= animationStart && scrollPosition <= animationEnd) {
//         const progress = (scrollPosition - animationStart) / (animationEnd - animationStart);
//         const frame = Math.max(1, Math.min(maxFrame, Math.floor(progress * maxFrame) + 1));
//         const frameId = frame.toString().padStart(5, '0');
//         img.src = `../Telecom/telefono/${frameId}.png`;
//     } else {
//         const frameId = maxFrame.toString().padStart(5, '0');
//         img.src = `../Telecom/telefono/${frameId}.png`;
//     }
// });

//tarjetas
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

// carruselmarcas
const track = document.getElementById("track");
const carrusel = document.getElementById("carrusel");

// Duplicamos logos para hacer loop infinito
track.innerHTML += track.innerHTML;

let position = 0;
const speed = 0.4; // 👈 velocidad
let active1 = true; // control si está visible

function moveCarousel() {
    if (!active) { // solo avanza si está visible
        position -= speed;
        if (Math.abs(position) >= track.scrollWidth / 2) {
            position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(moveCarousel);
}

// Usamos Intersection Observer
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        active1 = entry.isIntersecting; // true si se ve, false si no
    });
}, {
    threshold: 0.2 // se activa cuando 20% del carrusel sea visible
});

observer2.observe(carrusel);

moveCarousel(); // inicia animación

// carrusel
const sucursales = [
    { img: "../Telecom/sucursales/akropolis mérida.jpeg", nombre: "Akropolis", ciudad: "Mérida, Yucatán" },
    { img: "../Telecom/sucursales/Andares gdl.jpg", nombre: "Andares", ciudad: "Guadalajara, Jalisco" },
    { img: "../Telecom/sucursales/Barranca.jpeg", nombre: "Barranca", ciudad: "Guadalajara, Jalisco" },
    { img: "../Telecom/sucursales/Belenes.jpeg", nombre: "Belenes", ciudad: "Zapopan, Jalisco" },
    { img: "../Telecom/sucursales/La Perla zapopan.jpg", nombre: "La Perla", ciudad: "Zapopan, Jalisco" },
    { img: "../Telecom/sucursales/PDV ALEGRA zapopan.jpeg", nombre: "PDV Alegra", ciudad: "Zapopan, Jalisco" },
    { img: "../Telecom/sucursales/PDV ALEIRA zapopan.jpeg", nombre: "PDV ALEIRA", ciudad: "Zapopan, Jalisco" },
    { img: "../Telecom/sucursales/PDV AMERICAS MERIDA.jpeg", nombre: "PDV Americas", ciudad: "Mérida, Yucatán" },
    { img: "../Telecom/sucursales/PDV DORADA merida.jpeg", nombre: "PDV Dorada", ciudad: "Mérida, Yucatán"},
    { img: "../Telecom/sucursales/PDV PROVIDENCIA gdl.jpeg", nombre: "Plaza patria", ciudad: "Zapopan, Jalisco" },
    { img: "../Telecom/sucursales/plaza san luis gdl.jpeg", nombre: "Plaza San Luis", ciudad: "Guadalajara, Jalisco" },
    { img: "../Telecom/sucursales/punto sur gdl.jpg", nombre: "Punto sur", ciudad: "Guadalajara, Jalisco" },
    { img: "../Telecom/sucursales/real center zapopan.jpg", nombre: "Real center", ciudad: "Zapopan, Jalisco" },
    { img: "../Telecom/sucursales/sebastian Bach zapopan.jpeg", nombre: "Sebastian Bach", ciudad: "Zapopan, Jalisco" },
    { img: "../Telecom/sucursales/TLAJOMULCO.jpeg", nombre: "Tlajomulco", ciudad: "Tlajomulco, Jalisco" },
    { img: "../Telecom/sucursales/valle real zapopan.jpg", nombre: "Valle real", ciudad: "Zapopan, Jalisco" },
];

const slots = document.querySelectorAll(".item1");
let index = 0;

function mostrarSucursales() {
    for (let i = 0; i < 5; i++) {
        const suc = sucursales[(index + i) % sucursales.length];
        const slot = slots[i];
        const img = slot.querySelector("img");
        const h4 = slot.querySelector("h4");
        const p = slot.querySelector("p");

        img.src = suc.img;
        img.alt = suc.nombre;
        h4.textContent = suc.nombre;
        p.textContent = suc.ciudad;

        // Posiciones del carrusel con animaciones suaves
        if (i === 2) {
            // Centro (destacado)
            slot.style.transform = "translateX(0) translateZ(100px) scale(1.1)";
            slot.style.zIndex = 5;
            slot.style.opacity = 1;
        } else if (i === 1) {
            // Izquierda inmediata
            slot.style.transform = "translateX(-300px) translateZ(0) scale(0.9) rotateY(25deg)";
            slot.style.zIndex = 4;
            slot.style.opacity = 0.8;
        } else if (i === 3) {
            // Derecha inmediata
            slot.style.transform = "translateX(300px) translateZ(0) scale(0.9) rotateY(-25deg)";
            slot.style.zIndex = 4;
            slot.style.opacity = 0.8;
        } else if (i === 0) {
            // Extremo izquierdo
            slot.style.transform = "translateX(-500px) translateZ(-100px) scale(0.7) rotateY(45deg)";
            slot.style.zIndex = 3;
            slot.style.opacity = 0.5;
        } else if (i === 4) {
            // Extremo derecho
            slot.style.transform = "translateX(500px) translateZ(-100px) scale(0.7) rotateY(-45deg)";
            slot.style.zIndex = 3;
            slot.style.opacity = 0.5;
        }
    }
}

function nextSlide() {
    index = (index + 1) % sucursales.length;
    mostrarSucursales();
}

// Inicialización automática
mostrarSucursales();
setInterval(nextSlide, 3000);


// imagenes
// Selecciona todos los div del documento

const images = document.querySelectorAll('.imgWifi, .imgTitulo, .btn-i1, .p-i1-2, .p-i1-1, .S-escaleras, .item, .h1-t1, .s-mapa, .fotofondo, .h1-c1, .p-c1, .btn-c1');
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
