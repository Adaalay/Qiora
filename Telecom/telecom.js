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
// CARRUSEL DE SUCURSALES + FILTROS + DROPDOWN
// =============================

document.addEventListener("DOMContentLoaded", function () {

    const imagenFallback = "img/sucursales/PDV PROVIDENCIA gdl.jpeg";

    const sucursales = [
        // JALISCO
        { img: "", nombre: "ATT Chapultepec", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "ATT San Isidro Cañadas", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "ATT PZ Álamo", ciudad: "Tlaquepaque, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "ATT PZ Sta Anita", ciudad: "Tlaquepaque, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "ATT P. Galicia", ciudad: "Tlajomulco de Zúñiga, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "Tesistán", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/Andares gdl.jpg", nombre: "CAE Andares", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/Belenes.jpeg", nombre: "CAE Belenes", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/La Perla zapopan.jpg", nombre: "ATM La Perla", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/PDV PROVIDENCIA gdl.jpeg", nombre: "CAE Providencia", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/barranca.jpeg", nombre: "ATM Barranca", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "ATT PZ Arboledas", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "ATT PZ Bugambilias", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/plaza san luis gdl.jpeg", nombre: "Plaza San Luis", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/sebastian Bach zapopan.jpeg", nombre: "ATT Bach", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "ATT Zapopan Aleph", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "ATT CD Granja Ubika", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "CAE La Normal", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/PDV ALEGRA zapopan.jpeg", nombre: "ATT PZ Alegra", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/Plaza Patria.jpeg", nombre: "CAE Plaza Patria", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/punto sur gdl.jpg", nombre: "ATT Punto Sur", ciudad: "Tlajomulco, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/real center zapopan.jpg", nombre: "ATT Real Center", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/valle real zapopan.jpg", nombre: "ATT Country Valle Real", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/TLAJOMULCO.jpeg", nombre: "ATT Tlajomulco PZ Regina", ciudad: "Tlaquepaque, Jalisco", estado: "Jalisco" },
        { img: "img/sucursales/PDV ALEIRA zapopan.jpeg", nombre: "ATT Aleira", ciudad: "Zapopan, Jalisco", estado: "Jalisco" },
        { img: "", nombre: "Rubén Darío Nacional", ciudad: "Guadalajara, Jalisco", estado: "Jalisco" },

        // GUANAJUATO
        { img: "", nombre: "CAE G. Celaya", ciudad: "Celaya, Guanajuato", estado: "Guanajuato" },

        // QUINTANA ROO
        { img: "", nombre: "ATS Centro Maya", ciudad: "Playa del Carmen, Quintana Roo", estado: "Quintana Roo" },
        { img: "", nombre: "ATS Malecón", ciudad: "Cancún, Quintana Roo", estado: "Quintana Roo" },
        { img: "", nombre: "ATS Cancún Mall", ciudad: "Cancún, Quintana Roo", estado: "Quintana Roo" },
        { img: "", nombre: "ATS Leones Cozumel", ciudad: "Cozumel, Quintana Roo", estado: "Quintana Roo" },
        { img: "", nombre: "ATS Gran Plaza 2", ciudad: "Cancún, Quintana Roo", estado: "Quintana Roo" },
        { img: "", nombre: "ATS Chetumal", ciudad: "Chetumal, Quintana Roo", estado: "Quintana Roo" },
        { img: "", nombre: "Puerto Aventuras", ciudad: "Puerto Aventuras, Quintana Roo", estado: "Quintana Roo" },

        // YUCATÁN
        { img: "img/sucursales/PDV AMERICAS MERIDA.jpeg", nombre: "ATS Américas Mérida", ciudad: "Mérida, Yucatán", estado: "Yucatán" },
        { img: "", nombre: "ATS PZ La Isla", ciudad: "Mérida, Yucatán", estado: "Yucatán" },
        { img: "img/sucursales/PDV DORADA merida.jpeg", nombre: "ATS PZ Dorada", ciudad: "Mérida, Yucatán", estado: "Yucatán" },
        { img: "img/sucursales/akropolis m#U00e9rida.jpeg", nombre: "Akropolis", ciudad: "Mérida, Yucatán", estado: "Yucatán" },

        // CAMPECHE
        { img: "", nombre: "ATM Campeche", ciudad: "Campeche, Campeche", estado: "Campeche" },

        // POR DEFINIR
        { img: "", nombre: "Edén", ciudad: "Ubicación por definir", estado: "Por definir" },
        { img: "", nombre: "Héroes", ciudad: "Ubicación por definir", estado: "Por definir" }
    ];

    const linksMaps = {
        "ATT Chapultepec": "https://maps.app.goo.gl/buxfTm4XKvS9e2eT7?g_st=ipc",
        "ATT San Isidro Cañadas": "https://maps.app.goo.gl/RJH6vN3b8aFXcTJZA",
        "ATT PZ Álamo": "https://maps.app.goo.gl/S79bt7z1inWvKFAd7?g_st=ipc",
        "ATT PZ Sta Anita": "https://maps.app.goo.gl/X7kccWZ7zxodLVHb8?g_st=ipc",
        "ATT P. Galicia": "https://maps.app.goo.gl/DJAsWLdHk9wPe94r5?g_st=ipc",
        "Tesistán": "https://share.google/OKAYd4eAQlzMCaqoj",
        "CAE Andares": "https://maps.app.goo.gl/RGQgPbsXny9KxN3E8?g_st=ipc",
        "CAE Belenes": "https://maps.app.goo.gl/R9iCYAbMErLSdm8f6?g_st=ipc",
        "ATM La Perla": "https://maps.app.goo.gl/7pfJRcu5yGRQAAJr9?g_st=ipc",
        "CAE Providencia": "https://maps.app.goo.gl/mwnR4aRraUJaKXhXA?g_st=ic",
        "ATM Barranca": "https://maps.app.goo.gl/n2oAmeL4PVW42YASA?g_st=ipc",
        "CAE G. Celaya": "https://maps.app.goo.gl/arCWdY2NXwABKEkr5?g_st=ipc",
        "ATT PZ Arboledas": "https://maps.app.goo.gl/5yRfAN2AGhtFTYeH6?g_st=ipc",
        "ATT PZ Bugambilias": "https://maps.app.goo.gl/cQCME1VAKc4cUPNn9?g_st=ipc",
        "Plaza San Luis": "https://maps.app.goo.gl/uPvAJPk1qNkMVCk28?g_st=ipc",
        "ATT Bach": "https://maps.app.goo.gl/3tfc1n8mR8h9njZh6?g_st=ipc",
        "ATT Zapopan Aleph": "https://maps.app.goo.gl/1SMBkZRabnVXeWNA8?g_st=ipc",
        "ATT CD Granja Ubika": "https://maps.app.goo.gl/2gc5xyhMM5W2XDay6?g_st=ipc",
        "CAE La Normal": "https://maps.app.goo.gl/jP5a2wrUeoHLsTjd6?g_st=ipc",
        "ATT PZ Alegra": "https://maps.app.goo.gl/KybqG9wHyTrQhGSY7?g_st=ipc",
        "CAE Plaza Patria": "https://maps.app.goo.gl/WoJozxw92eQrT4Bh9?g_st=ipc",
        "ATT Punto Sur": "https://maps.app.goo.gl/YPmTdNHdTtyFMvkm7?g_st=ipc",
        "ATT Real Center": "https://maps.app.goo.gl/vGeJR2TjGvtL6Gdv9?g_st=ipc",
        "ATT Country Valle Real": "https://maps.app.goo.gl/aURjXNyPoGtFP1Dg7?g_st=ipc",
        "ATT Tlajomulco PZ Regina": "https://maps.app.goo.gl/FDpYvxfjfs6FTXCc9?g_st=ipc",
        "ATT Aleira": "https://maps.app.goo.gl/3zzZx5LuGf6TPEKP6?g_st=ipc",
        "Rubén Darío Nacional": "https://maps.app.goo.gl/RTaBZksevs5qEA1Q8?g_st=ipc",
        "ATS Cancún Mall": "https://maps.app.goo.gl/PkeYdkh1mgo7iXpH7?g_st=ipc",
        "ATS Leones Cozumel": "https://maps.app.goo.gl/PbLXRWfhu53QDbJC6?g_st=ipc",
        "ATS Gran Plaza 2": "https://maps.app.goo.gl/Qf8NEdVkrtHVDKyQ8?g_st=ipc",
        "ATS Chetumal": "https://maps.app.goo.gl/dNsJ7CNgN7wRkEpGA?g_st=ipc",
        "ATS Américas Mérida": "https://maps.app.goo.gl/tUyhdYjvpCnYq8Wt7?g_st=ipc",
        "ATM Campeche": "https://maps.app.goo.gl/TntYmEVQouNXYxsN9?g_st=ipc",
        "ATS PZ La Isla": "https://maps.app.goo.gl/y5thAm5M8oFUxT9Q8?g_st=ipc",
        "ATS PZ Dorada": "https://maps.app.goo.gl/6JztVLzDuRXZLSyx7?g_st=ipc",
        "Akropolis": "https://maps.app.goo.gl/ws4HrVLBD9Ea2J566?g_st=ic",
        "Puerto Aventuras": "https://maps.app.goo.gl/uK76gFuuN2cC5ZU7A?g_st=iw"
    };

    const galeria = document.querySelector("#galeria");
    const botonesPrincipales = document.querySelectorAll(".filtros-sucursales > button[data-filtro]");
    const dropdownEstados = document.querySelector(".dropdown-estados");
    const btnMasEstados = document.querySelector("#btnMasEstados");
    const textoMasEstados = document.querySelector("#textoMasEstados");
    const botonesDropdown = document.querySelectorAll("#menuEstados button[data-filtro]");

    if (!galeria) return;

    let slots = Array.from(galeria.querySelectorAll(".item1"));
    let sucursalesActuales = [...sucursales];
    let indiceActual = 0;
    let intervalo = null;
    let animando = false;
    let posiciones = [];
    let salidaIzquierda = {};
    let entradaDerecha = {};

    function calcularPosiciones() {
        const ancho = window.innerWidth;
        const lejos = Math.min(530, Math.max(370, ancho * 0.30));
        const cerca = Math.min(305, Math.max(210, ancho * 0.175));
        const salida = Math.min(780, Math.max(500, ancho * 0.45));

        posiciones = [
            { transform: `translateX(-${lejos}px) translateY(22px) scale(0.68)`, opacity: "0.48", zIndex: "1", filter: "blur(0.4px)" },
            { transform: `translateX(-${cerca}px) translateY(8px) scale(0.88)`, opacity: "0.82", zIndex: "3", filter: "blur(0)" },
            { transform: "translateX(0) translateY(0) scale(1.08)", opacity: "1", zIndex: "5", filter: "blur(0)" },
            { transform: `translateX(${cerca}px) translateY(8px) scale(0.88)`, opacity: "0.82", zIndex: "3", filter: "blur(0)" },
            { transform: `translateX(${lejos}px) translateY(22px) scale(0.68)`, opacity: "0.48", zIndex: "1", filter: "blur(0.4px)" }
        ];

        salidaIzquierda = { transform: `translateX(-${salida}px) translateY(32px) scale(0.56)`, opacity: "0", zIndex: "0", filter: "blur(2px)" };
        entradaDerecha = { transform: `translateX(${salida}px) translateY(32px) scale(0.56)`, opacity: "0", zIndex: "0", filter: "blur(2px)" };
    }

    function obtenerPorFiltro(filtro) {
        if (filtro === "todas") return [...sucursales];
        return sucursales.filter(sucursal => sucursal.estado === filtro);
    }

    function ponerContenido(slot, sucursal) {
        const img = slot.querySelector("img");
        const h4 = slot.querySelector("h4");
        const p = slot.querySelector("p");

        if (!sucursal) {
            slot.style.visibility = "hidden";
            slot.style.pointerEvents = "none";
            slot.style.opacity = "0";
            return;
        }

        const linkMaps = sucursal.maps || linksMaps[sucursal.nombre] || "";

        slot.style.visibility = "visible";
        slot.style.pointerEvents = "auto";
        slot.dataset.maps = linkMaps;
        slot.classList.toggle("tiene-maps", linkMaps !== "");
        slot.classList.toggle("sin-maps", linkMaps === "");

        img.onerror = function () {
            this.onerror = null;
            this.src = imagenFallback;
        };

        img.src = sucursal.img && sucursal.img.trim() !== "" ? sucursal.img : imagenFallback;
        img.alt = sucursal.nombre;
        h4.textContent = sucursal.nombre;
        p.textContent = sucursal.ciudad;
    }

    function aplicarPosicion(slot, posicion, conAnimacion = true) {
        slot.style.transition = conAnimacion
            ? "transform 950ms cubic-bezier(0.22, 1, 0.36, 1), opacity 750ms ease, filter 750ms ease"
            : "none";

        slot.style.transform = posicion.transform;
        slot.style.opacity = posicion.opacity;
        slot.style.zIndex = posicion.zIndex;
        slot.style.filter = posicion.filter;
    }

    function obtenerPosicionEstatica(total, i) {
        if (total === 1) return { transform: "translateX(0) translateY(0) scale(1.08)", opacity: "1", zIndex: "5", filter: "blur(0)" };
        if (total === 2) return [
            { transform: "translateX(-200px) translateY(0) scale(1)", opacity: "1", zIndex: "4", filter: "blur(0)" },
            { transform: "translateX(200px) translateY(0) scale(1)", opacity: "1", zIndex: "4", filter: "blur(0)" }
        ][i];
        if (total === 3) return [
            { transform: "translateX(-300px) translateY(8px) scale(0.88)", opacity: "0.88", zIndex: "3", filter: "blur(0)" },
            { transform: "translateX(0) translateY(0) scale(1.08)", opacity: "1", zIndex: "5", filter: "blur(0)" },
            { transform: "translateX(300px) translateY(8px) scale(0.88)", opacity: "0.88", zIndex: "3", filter: "blur(0)" }
        ][i];
        if (total === 4) return [
            { transform: "translateX(-420px) translateY(16px) scale(0.74)", opacity: "0.68", zIndex: "2", filter: "blur(0.3px)" },
            { transform: "translateX(-160px) translateY(0) scale(1)", opacity: "1", zIndex: "4", filter: "blur(0)" },
            { transform: "translateX(160px) translateY(0) scale(1)", opacity: "1", zIndex: "4", filter: "blur(0)" },
            { transform: "translateX(420px) translateY(16px) scale(0.74)", opacity: "0.68", zIndex: "2", filter: "blur(0.3px)" }
        ][i];
        return posiciones[i];
    }

    function limpiarClasesGaleria() {
        galeria.classList.remove("galeria-uno", "galeria-dos", "galeria-tres", "galeria-cuatro", "galeria-cinco", "galeria-carrusel");
    }

    function pintar(conAnimacion = true) {
        slots = Array.from(galeria.querySelectorAll(".item1"));
        const total = sucursalesActuales.length;

        limpiarClasesGaleria();
        if (total === 1) galeria.classList.add("galeria-uno");
        else if (total === 2) galeria.classList.add("galeria-dos");
        else if (total === 3) galeria.classList.add("galeria-tres");
        else if (total === 4) galeria.classList.add("galeria-cuatro");
        else if (total === 5) galeria.classList.add("galeria-cinco");
        else galeria.classList.add("galeria-carrusel");

        slots.forEach((slot, i) => {
            if (i > 4) return;

            if (total === 0 || (i >= total && total <= 5)) {
                slot.style.visibility = "hidden";
                slot.style.pointerEvents = "none";
                slot.style.opacity = "0";
                return;
            }

            const sucursal = sucursalesActuales[(indiceActual + i) % total];
            ponerContenido(slot, sucursal);

            const posicion = total <= 4 ? obtenerPosicionEstatica(total, i) : posiciones[i];
            aplicarPosicion(slot, posicion, conAnimacion);
        });
    }

    function crearSlotEntrada() {
        const nuevoSlot = slots[0].cloneNode(true);
        const sucursal = sucursalesActuales[(indiceActual + 5) % sucursalesActuales.length];

        ponerContenido(nuevoSlot, sucursal);
        aplicarPosicion(nuevoSlot, entradaDerecha, false);
        galeria.appendChild(nuevoSlot);

        return nuevoSlot;
    }

    function siguiente() {
        if (animando) return;
        if (sucursalesActuales.length <= 5) return;

        animando = true;
        slots = Array.from(galeria.querySelectorAll(".item1"));

        const slotSale = slots[0];
        const nuevoSlot = crearSlotEntrada();
        nuevoSlot.offsetHeight;

        aplicarPosicion(slotSale, salidaIzquierda, true);
        aplicarPosicion(slots[1], posiciones[0], true);
        aplicarPosicion(slots[2], posiciones[1], true);
        aplicarPosicion(slots[3], posiciones[2], true);
        aplicarPosicion(slots[4], posiciones[3], true);
        aplicarPosicion(nuevoSlot, posiciones[4], true);

        setTimeout(() => {
            slotSale.remove();
            indiceActual = (indiceActual + 1) % sucursalesActuales.length;
            slots = Array.from(galeria.querySelectorAll(".item1"));
            animando = false;
        }, 980);
    }

    function iniciarAuto() {
        detenerAuto();
        if (sucursalesActuales.length > 5) {
            intervalo = setInterval(siguiente, 3300);
        }
    }

    function detenerAuto() {
        if (intervalo) {
            clearInterval(intervalo);
            intervalo = null;
        }
    }

    function limpiarSlotsExtra() {
        Array.from(galeria.querySelectorAll(".item1")).forEach((slot, index) => {
            if (index > 4) slot.remove();
        });
        slots = Array.from(galeria.querySelectorAll(".item1"));
    }

    function limpiarActivos() {
        botonesPrincipales.forEach(btn => btn.classList.remove("filtro-activo"));
        botonesDropdown.forEach(btn => btn.classList.remove("estado-activo"));
        if (btnMasEstados) btnMasEstados.classList.remove("filtro-activo");
    }

    function resetDropdown() {
        if (textoMasEstados) textoMasEstados.textContent = "+6 estados";
        if (dropdownEstados) dropdownEstados.classList.remove("abierto");
        botonesDropdown.forEach(btn => btn.classList.remove("estado-activo"));
        if (btnMasEstados) btnMasEstados.classList.remove("filtro-activo");
    }

    function aplicarFiltro(filtro) {
        if (!filtro) return;

        const resultado = obtenerPorFiltro(filtro);
        if (resultado.length === 0) return;

        sucursalesActuales = resultado;
        indiceActual = 0;
        animando = false;
        limpiarSlotsExtra();
        pintar(true);

        if (sucursalesActuales.length > 5) iniciarAuto();
        else detenerAuto();
    }

    botonesPrincipales.forEach(boton => {
        boton.addEventListener("click", function () {
            const filtro = this.dataset.filtro;
            aplicarFiltro(filtro);
            limpiarActivos();
            this.classList.add("filtro-activo");
            resetDropdown();
        });
    });

    if (btnMasEstados && dropdownEstados) {
        btnMasEstados.addEventListener("click", function (e) {
            e.stopPropagation();
            dropdownEstados.classList.toggle("abierto");
        });
    }

    botonesDropdown.forEach(boton => {
        boton.addEventListener("click", function (e) {
            e.stopPropagation();

            const filtro = this.dataset.filtro;
            const texto = this.textContent.trim();
            aplicarFiltro(filtro);

            limpiarActivos();
            this.classList.add("estado-activo");
            if (btnMasEstados) btnMasEstados.classList.add("filtro-activo");
            if (textoMasEstados) textoMasEstados.textContent = texto;
            if (dropdownEstados) dropdownEstados.classList.remove("abierto");
        });
    });

    document.addEventListener("click", function () {
        if (dropdownEstados) dropdownEstados.classList.remove("abierto");
    });

    galeria.addEventListener("mouseenter", detenerAuto);
    galeria.addEventListener("mouseleave", function () {
        if (sucursalesActuales.length > 5) iniciarAuto();
    });

    galeria.addEventListener("click", function (e) {
        const sucursal = e.target.closest(".item1.tiene-maps");
        if (sucursal && sucursal.dataset.maps) {
            window.open(sucursal.dataset.maps, "_blank", "noopener");
            return;
        }

        if (sucursalesActuales.length > 5) siguiente();
    });

    window.addEventListener("resize", function () {
        calcularPosiciones();
        pintar(false);
    });

    calcularPosiciones();
    aplicarFiltro("todas");

    limpiarActivos();
    const botonTodas = document.querySelector('.filtros-sucursales > button[data-filtro="todas"]');
    if (botonTodas) botonTodas.classList.add("filtro-activo");
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