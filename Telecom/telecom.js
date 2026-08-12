//tarjetas
const tarjetas = document.querySelectorAll('.tarjeta');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const index = [...tarjetas].indexOf(entry.target);

        if (entry.isIntersecting) {

            entry.target.style.transitionDelay = `${index * 0.2}s`;
            entry.target.classList.add('show');
        } else {

            entry.target.style.transitionDelay = `${index * 0.2}s`;
            entry.target.classList.remove('show');
        }
    });
}, {
    threshold: 0.2
});
const cardsPromo = document.querySelectorAll(".promo-card");

let promoActual = 0;

function moverCarruselPromos() {
    const total = cardsPromo.length;

    const izquierda = (promoActual - 1 + total) % total;
    const centro = promoActual;
    const derecha = (promoActual + 1) % total;

    cardsPromo.forEach((card, index) => {
        card.classList.remove("is-left", "is-center", "is-right", "is-hidden");

        if (index === izquierda) {
            card.classList.add("is-left");
        } else if (index === centro) {
            card.classList.add("is-center");
        } else if (index === derecha) {
            card.classList.add("is-right");
        } else {
            card.classList.add("is-hidden");
        }
    });
}

moverCarruselPromos();

function avanzarPromos() {
    promoActual++;

    if (promoActual >= cardsPromo.length) {
        promoActual = 0;
    }

    moverCarruselPromos();
}

let intervaloPromos = setInterval(avanzarPromos, 3000);

const stagePromos = document.querySelector(".carousel-stage");

if (stagePromos) {
    stagePromos.addEventListener("mouseenter", () => {
        clearInterval(intervaloPromos);
    });

    stagePromos.addEventListener("mouseleave", () => {
        intervaloPromos = setInterval(avanzarPromos, 3000);
    });

    stagePromos.addEventListener("click", () => {
        avanzarPromos();
    });
}


//carrusel de servicios

// =============================
// CARRUSEL DE SUCURSALES + FILTROS
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const sucursales = [
        { img: "img/sucursales/akropolis mérida.jpeg", nombre: "Akropolis", ciudad: "Mérida, Yucatán", estado: "Yucatán" },
        { img: "img/sucursales/Andares gdl.jpg", nombre: "Andares", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/barranca.jpeg", nombre: "Barranca", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/Belenes.jpeg", nombre: "Belenes", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/La Perla zapopan.jpg", nombre: "La Perla", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/PDV ALEGRA zapopan.jpeg", nombre: "PDV Alegra", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/PDV ALEIRA zapopan.jpeg", nombre: "PDV ALEIRA", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/PDV AMERICAS MERIDA.jpeg", nombre: "PDV Americas", ciudad: "Mérida, Yucatán", estado: "Yucatán" },
        { img: "img/sucursales/PDV DORADA merida.jpeg", nombre: "Sucursal Dorada", ciudad: "Mérida, Yucatán", estado: "Yucatán" },
        { img: "img/sucursales/PDV PROVIDENCIA gdl.jpeg", nombre: "Sucursal Plaza Patria", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/plaza san luis gdl.jpeg", nombre: "Plaza San Luis", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/punto sur gdl.jpg", nombre: "Punto Sur", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/real center zapopan.jpg", nombre: "Real Center", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/sebastian Bach zapopan.jpeg", nombre: "Sebastian Bach", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/TLAJOMULCO.jpeg", nombre: "Tlajomulco", ciudad: "Tlajomulco, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/valle real zapopan.jpg", nombre: "Valle Real", ciudad: "Zapopan, Jalisco", estado: "Jalisco" }

        // Cuando tengas sucursales de otros estados, agrégalas así:
        // { img: "ruta.jpg", nombre: "Sucursal Monterrey", ciudad: "Monterrey, Nuevo León", estado: "Nuevo León" },
        // { img: "ruta.jpg", nombre: "Sucursal León", ciudad: "León, Guanajuato", estado: "Guanajuato" },
        // { img: "ruta.jpg", nombre: "Sucursal Cancún", ciudad: "Cancún, Quintana Roo", estado: "Quintana Roo" },
    ];

    const estadosPrincipales = ["Jalisco", "Yucatán", "Nuevo León", "Guanajuato"];

    let sucursalesActuales = [...sucursales];
    let slots = Array.from(document.querySelectorAll("#galeria .item1"));
    const galeria = document.querySelector("#galeria");
    const botonesFiltro = document.querySelectorAll(".filtros-sucursales button");

    let indiceInicialSucursal = 0;
    let animandoSucursal = false;
    let intervaloSucursales = null;
    let filtroActual = "todas";

    const posicionesSucursal = [
        {
            transform: "translateX(-470px) scale(0.78)",
            zIndex: "3",
            opacity: "1"
        },
        {
            transform: "translateX(-270px) scale(1)",
            zIndex: "4",
            opacity: "1"
        },
        {
            transform: "translateX(0) scale(1.12)",
            zIndex: "5",
            opacity: "1"
        },
        {
            transform: "translateX(270px) scale(1)",
            zIndex: "4",
            opacity: "1"
        },
        {
            transform: "translateX(470px) scale(0.78)",
            zIndex: "3",
            opacity: "1"
        }
    ];

    const salidaIzquierda = {
        transform: "translateX(-680px) scale(0.65)",
        zIndex: "1",
        opacity: "0"
    };

    const entradaDerecha = {
        transform: "translateX(680px) scale(0.65)",
        zIndex: "1",
        opacity: "0"
    };

    if (!galeria || slots.length === 0) return;

    function obtenerSucursalesPorFiltro(filtro) {
        if (filtro === "todas") {
            return [...sucursales];
        }

        if (filtro === "otros") {
            return sucursales.filter(sucursal => {
                return !estadosPrincipales.includes(sucursal.estado);
            });
        }

        return sucursales.filter(sucursal => sucursal.estado === filtro);
    }

    function ponerContenidoSucursal(slot, sucursal) {
        const img = slot.querySelector("img");
        const h4 = slot.querySelector("h4");
        const p = slot.querySelector("p");

        if (!sucursal) {
            slot.style.display = "none";
            return;
        }

        slot.style.display = "block";

        img.src = sucursal.img;
        img.alt = sucursal.nombre;
        h4.textContent = sucursal.nombre;
        p.textContent = sucursal.ciudad;
    }

    function aplicarPosicionSucursal(slot, posicion, conAnimacion = true) {
        slot.style.transition = conAnimacion
            ? "transform 1s cubic-bezier(0.25, 1, 0.35, 1), opacity 0.8s ease"
            : "none";

        slot.style.transform = posicion.transform;
        slot.style.zIndex = posicion.zIndex;
        slot.style.opacity = posicion.opacity;
    }

    function pintarSucursales(conAnimacion = false) {
        slots = Array.from(document.querySelectorAll("#galeria .item1"));

        slots.forEach((slot, i) => {
            const sucursal = sucursalesActuales[(indiceInicialSucursal + i) % sucursalesActuales.length];

            if (sucursalesActuales.length === 0) {
                slot.style.display = "none";
                return;
            }

            if (i >= sucursalesActuales.length && filtroActual !== "todas") {
                slot.style.display = "none";
                return;
            }

            ponerContenidoSucursal(slot, sucursal);
            aplicarPosicionSucursal(slot, posicionesSucursal[i], conAnimacion);
        });
    }

    function iniciarIntervalo() {
        detenerIntervalo();

        intervaloSucursales = setInterval(() => {
            siguienteSucursal();
        }, 3800);
    }

    function detenerIntervalo() {
        if (intervaloSucursales) {
            clearInterval(intervaloSucursales);
            intervaloSucursales = null;
        }
    }

    function crearNuevaSucursalDerecha() {
        const nuevoSlot = slots[0].cloneNode(true);
        const nuevaSucursal = sucursalesActuales[(indiceInicialSucursal + 5) % sucursalesActuales.length];

        ponerContenidoSucursal(nuevoSlot, nuevaSucursal);
        aplicarPosicionSucursal(nuevoSlot, entradaDerecha, false);

        galeria.appendChild(nuevoSlot);

        return nuevoSlot;
    }

    function siguienteSucursal() {
        if (animandoSucursal) return;
        if (filtroActual !== "todas") return;
        if (sucursalesActuales.length <= 5) return;

        animandoSucursal = true;

        slots = Array.from(document.querySelectorAll("#galeria .item1"));

        const slotQueSale = slots[0];
        const nuevoSlot = crearNuevaSucursalDerecha();

        nuevoSlot.offsetHeight;

        aplicarPosicionSucursal(slotQueSale, salidaIzquierda, true);

        aplicarPosicionSucursal(slots[1], posicionesSucursal[0], true);
        aplicarPosicionSucursal(slots[2], posicionesSucursal[1], true);
        aplicarPosicionSucursal(slots[3], posicionesSucursal[2], true);
        aplicarPosicionSucursal(slots[4], posicionesSucursal[3], true);

        aplicarPosicionSucursal(nuevoSlot, posicionesSucursal[4], true);

        setTimeout(() => {
            slotQueSale.remove();

            slots = [
                slots[1],
                slots[2],
                slots[3],
                slots[4],
                nuevoSlot
            ];

            indiceInicialSucursal = (indiceInicialSucursal + 1) % sucursalesActuales.length;
            animandoSucursal = false;

        }, 1000);
    }

    function limpiarSlotsExtra() {
        const todosLosSlots = Array.from(document.querySelectorAll("#galeria .item1"));

        todosLosSlots.forEach((slot, index) => {
            if (index > 4) {
                slot.remove();
            }
        });

        slots = Array.from(document.querySelectorAll("#galeria .item1"));
    }

    function aplicarFiltro(filtro) {
        filtroActual = filtro;
        indiceInicialSucursal = 0;
        animandoSucursal = false;

        limpiarSlotsExtra();

        sucursalesActuales = obtenerSucursalesPorFiltro(filtro);

        botonesFiltro.forEach(btn => {
            btn.classList.toggle("filtro-activo", btn.dataset.filtro === filtro);
        });

        pintarSucursales(true);

        if (filtro === "todas") {
            iniciarIntervalo();
        } else {
            detenerIntervalo();
        }
    }

    botonesFiltro.forEach(boton => {
        boton.addEventListener("click", function () {
            const filtro = this.dataset.filtro;
            aplicarFiltro(filtro);
        });
    });

    aplicarFiltro("todas");
});

// =============================
// ANIMACIONES AL HACER SCROLL
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const elementosAnimados = [
        // Inicio
        { selector: ".inicio-textos", tipo: "from-left", delay: 0 },
        { selector: ".inicio-imagen", tipo: "from-right", delay: 0.15 },

        // Promociones
        { selector: ".carousel-stage", tipo: "zoom-in", delay: 0 },

        // servicios
        { selector: ".servicios-click-carrusel", tipo: "zoom-out", delay: 0 },

        // Carrusel de marcas
        { selector: ".h1-t2", tipo: "zoom-out-right", delay: 0 },
        { selector: ".carrusel", tipo: "zoom-out-left", delay: 0.15, cascada: true  },

        // Conócenos
        { selector: ".divImagen", tipo: "from-left", delay: 0 },
        { selector: ".divContenido", tipo: "from-right", delay: 0.15 },
        { selector: ".tarjeta-valores", tipo: "zoom-in", delay: 0.25 },

        // Nuestros servicios
        { selector: ".titulo-servicios", tipo: "zoom-in", delay: 0 },
        { selector: ".servicio-card", tipo: "from-left", delay: 0.1, cascada: true },

        // Puntos de venta
        { selector: ".h1-t3", tipo: "zoom-in", delay: 0 },
        { selector: ".galeria", tipo: "zoom-in", delay: 0.15 },

        // Mapa
        { selector: ".divimagenmapa", tipo: "from-left", delay: 0 },
        { selector: ".divNumeros", tipo: "from-right", delay: 0.15 },

        // Fortaleza
        { selector: ".h1-Fortaleza", tipo: "zoom-in", delay: 0 },
        { selector: ".divFortalezaitem", tipo: "zoom-in", delay: 0.15, cascada: true },

        // Únete
        { selector: ".h2-unetenuestro", tipo: "zoom-in", delay: 0 },
        { selector: ".p-unetenuestro", tipo: "zoom-in", delay: 0.15, cascada: true  },

        // Contacto
        { selector: ".footer-section", tipo: "from-left", delay: 0.1, cascada: true }
    ];

    elementosAnimados.forEach(config => {
        const elementos = document.querySelectorAll(config.selector);

        elementos.forEach((elemento, index) => {
            elemento.classList.add("reveal");

            if (config.tipo) {
                elemento.classList.add(config.tipo);
            }

            const delayFinal = config.delay + (config.cascada ? index * 0.15 : 0);
            elemento.style.setProperty("--delay", `${delayFinal}s`);
        });
    });

    const observerReveal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");

                observerReveal.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.22,
        rootMargin: "0px 0px -70px 0px"
    });

    document.querySelectorAll(".reveal").forEach(elemento => {
        observerReveal.observe(elemento);
    });

});
// =============================
// INTERACTIVIDAD EXTRA
// =============================

document.addEventListener("DOMContentLoaded", function () {

    // -----------------------------
    // 1. Botones magnéticos
    // -----------------------------
    const botonesMagneticos = document.querySelectorAll(".btn-sucursal, .btn-unete");

    botonesMagneticos.forEach(boton => {
        boton.addEventListener("mousemove", (e) => {
            const rect = boton.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            boton.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
        });

        boton.addEventListener("mouseleave", () => {
            boton.style.transform = "translate(0, 0)";
        });
    });


    // -----------------------------
    // 2. Tilt suave en tarjetas
    // -----------------------------
    function activarTilt(selector) {
        const elementos = document.querySelectorAll(selector);

        elementos.forEach(elemento => {
            elemento.classList.add("interactivo");

            elemento.addEventListener("mousemove", (e) => {
                const rect = elemento.getBoundingClientRect();

                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centroX = rect.width / 2;
                const centroY = rect.height / 2;

                const rotacionX = ((y - centroY) / centroY) * -4;
                const rotacionY = ((x - centroX) / centroX) * 4;

                elemento.style.transform = `
                    perspective(900px)
                    rotateX(${rotacionX}deg)
                    rotateY(${rotacionY}deg)
                    translateY(-6px)
                `;
            });

            elemento.addEventListener("mouseleave", () => {
                elemento.style.transform = "";
            });
        });
    }

    activarTilt(".servicio-card");
    activarTilt(".tarjeta-valores");
    activarTilt(".unete-card");
    activarTilt(".PuntosdeVentas .card");


    // -----------------------------
    // 3. Números que cuentan al aparecer
    // -----------------------------
    function animarNumero(elemento, numeroFinal, duracion = 1300) {
        let inicio = null;

        elemento.classList.add("contando");

        function animar(timestamp) {
            if (!inicio) inicio = timestamp;

            const progreso = Math.min((timestamp - inicio) / duracion, 1);
            const valorActual = Math.floor(progreso * numeroFinal);

            elemento.textContent = valorActual;

            if (progreso < 1) {
                requestAnimationFrame(animar);
            } else {
                elemento.textContent = numeroFinal;
                elemento.classList.remove("contando");
            }
        }

        requestAnimationFrame(animar);
    }

    const numeros = [
        { elemento: document.querySelector(".divEstados .h1-numero"), valor: 10 },
        { elemento: document.querySelector(".divTiendas .h1-numero"), valor: 43 },
        // { elemento: document.querySelectorAll(".p-Fortaleza span")[0], valor:  800000},
        // { elemento: document.querySelectorAll(".p-Fortaleza span")[1], valor: 43 }
    ];

    numeros.forEach(item => {
        if (item.elemento) {
            item.elemento.classList.add("numero-animado");
        }
    });

    const observerNumeros = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = numeros.find(n => n.elemento === entry.target);

                if (item) {
                    animarNumero(item.elemento, item.valor);
                    observerNumeros.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.4
    });

    numeros.forEach(item => {
        if (item.elemento) {
            observerNumeros.observe(item.elemento);
        }
    });

});

// =============================
// SERVICIOS - CARRUSEL POR CLIC
// =============================

document.addEventListener("DOMContentLoaded", function () {
    const contenedorServicios = document.querySelector(".servicios-click-carrusel");
    const slidesServicios = Array.from(document.querySelectorAll(".servicio-slide"));
    const btnRegresarSoluciones = document.querySelector(".btn-regresar-soluciones");

    if (!contenedorServicios || slidesServicios.length === 0) return;

    function abrirServicio(slideActivo) {
        const servicio = slideActivo.dataset.servicio;

        slidesServicios.forEach(slide => {
            slide.classList.remove("activo", "animando-activo");
        });

        contenedorServicios.classList.remove("soluciones-abierto");
        contenedorServicios.classList.add("modo-abierto");

        slideActivo.classList.add("activo");

        if (servicio === "soluciones") {
            contenedorServicios.classList.add("soluciones-abierto");
        }

        setTimeout(() => {
            slideActivo.classList.add("animando-activo");
        }, 10);

        slideActivo.addEventListener("animationend", () => {
            slideActivo.classList.remove("animando-activo");
        }, { once: true });
    }

    function cerrarServicios() {
        contenedorServicios.classList.remove("modo-abierto", "soluciones-abierto");

        slidesServicios.forEach(slide => {
            slide.classList.remove("activo", "animando-activo");
        });
    }

    slidesServicios.forEach(slide => {
        slide.addEventListener("click", function () {
            abrirServicio(slide);
        });
    });

    if (btnRegresarSoluciones) {
        btnRegresarSoluciones.addEventListener("click", function () {
            cerrarServicios();
        });
    }
});

document.querySelectorAll(".servicio-info a").forEach(link => {
    link.addEventListener("click", function (e) {
        if (this.getAttribute("href") === "#") {
            e.preventDefault();
        }

        e.stopPropagation();
    });
});

document.querySelectorAll(".link-whatsapp").forEach(link => {
    link.addEventListener("click", function (e) {
        e.stopPropagation();
    });
});


// =============================
// CARRUSEL DE MARCAS
// =============================

document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("track");
    const carrusel = document.getElementById("carrusel");

    if (!track || !carrusel) return;

    if (!track.dataset.duplicado) {
        track.innerHTML += track.innerHTML;
        track.dataset.duplicado = "true";
    }

    let position = 0;
    const speed = 0.4;
    let carruselVisible = false;

    function moveCarousel() {
        if (carruselVisible) {
            position -= speed;

            if (Math.abs(position) >= track.scrollWidth / 2) {
                position = 0;
            }

            track.style.transform = `translateX(${position}px)`;
        }

        requestAnimationFrame(moveCarousel);
    }

    const observerMarcas = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            carruselVisible = entry.isIntersecting;
        });
    }, {
        threshold: 0.2
    });

    observerMarcas.observe(carrusel);

    moveCarousel();
});

// // Función para subir al inicio
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

// // Función para subir whatsapp
window.addEventListener("scroll", function () {
    const ref = document.getElementById("whatsappButton");
    if (window.scrollY > 200) {
        ref.style.display = "block";
    } else {
        ref.style.display = "none";
    }
});
document.getElementById("whatsappButton").onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};