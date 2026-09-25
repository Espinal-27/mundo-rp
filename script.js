/* =====================================
   PRODUCTOS DE LA TIENDA
===================================== */

const productos = [
    {
        id: 1,
        nombre: "1,000 MR Coins",
        categoria: "Monedas",
        descripcion: "Monedas para personalizar vehículos, ropa y propiedades.",
        precio: 4.99,
        icono: "🪙",
        destacado: false
    },
    {
        id: 2,
        nombre: "2,500 MR Coins",
        categoria: "Monedas",
        descripcion: "Incluye 250 MR Coins adicionales completamente gratis.",
        precio: 9.99,
        icono: "💰",
        destacado: true
    },
    {
        id: 3,
        nombre: "Membresía VIP",
        categoria: "30 días",
        descripcion: "Prioridad de acceso, distintivo VIP y beneficios exclusivos.",
        precio: 14.99,
        icono: "👑",
        destacado: false
    },
    {
        id: 4,
        nombre: "Paquete Inicial",
        categoria: "Edición urbana",
        descripcion: "Vehículo, ropa exclusiva, monedas y propiedad inicial.",
        precio: 19.99,
        icono: "🚘",
        destacado: false
    }
];


/* =====================================
   INFORMACIÓN DE LOS ROLES
===================================== */

const roles = {
    policia: {
        icono: "🛡️",
        subtitulo: "PROTEGE LA CIUDAD",
        titulo: "Haz cumplir la ley",
        descripcion:
            "Patrulla las calles, responde emergencias y asciende dentro del cuerpo policial."
    },

    medico: {
        icono: "🚑",
        subtitulo: "SALVA VIDAS",
        titulo: "Responde a cada emergencia",
        descripcion:
            "Atiende accidentes, trabaja en el hospital y conviértete en un profesional respetado."
    },

    empresario: {
        icono: "🏢",
        subtitulo: "CONSTRUYE TU IMPERIO",
        titulo: "Crea y dirige tu negocio",
        descripcion:
            "Administra empleados, ofrece servicios y haz crecer tu empresa dentro de la ciudad."
    },

    urbano: {
        icono: "🌆",
        subtitulo: "VIVE A TU MANERA",
        titulo: "Escribe tus propias reglas",
        descripcion:
            "Conoce la ciudad, forma tu grupo y construye una reputación que todos reconocerán."
    }
};


/* =====================================
   ELEMENTOS DE LA PÁGINA
===================================== */

const contenedorProductos =
    document.getElementById("contenedor-productos");

const cantidadCarrito =
    document.getElementById("cantidad-carrito");

const productosCarrito =
    document.getElementById("productos-carrito");

const carritoVacio =
    document.getElementById("carrito-vacio");

const resumenCarrito =
    document.getElementById("resumen-carrito");

const totalCarrito =
    document.getElementById("total-carrito");

const totalFormulario =
    document.getElementById("total-formulario");

const carrito =
    document.getElementById("carrito");

const fondoCarrito =
    document.getElementById("fondo-carrito");

const ventanaCompra =
    document.getElementById("ventana-compra");

const formularioCompra =
    document.getElementById("formulario-compra");

const formularioContenido =
    document.getElementById("formulario-contenido");

const mensajeExito =
    document.getElementById("mensaje-exito");

const notificacion =
    document.getElementById("notificacion");


/* =====================================
   CARRITO GUARDADO
===================================== */

let carritoCompras = JSON.parse(
    localStorage.getItem("carritoMundoRP")
) || [];


/* =====================================
   FORMATO DEL PRECIO
===================================== */

function mostrarPrecio(precio) {
    return `US$${precio.toFixed(2)}`;
}


/* =====================================
   MOSTRAR PRODUCTOS DE LA TIENDA
===================================== */

function mostrarProductos() {
    contenedorProductos.innerHTML = productos
        .map(producto => {
            return `
                <article class="tarjeta-producto
                    ${producto.destacado ? "destacado" : ""}">

                    ${producto.destacado
                    ? `<span class="etiqueta-destacado">
                                   MÁS ELEGIDO
                               </span>`
                    : ""
                }

                    <div class="imagen-producto">
                        <span class="icono-producto">
                            ${producto.icono}
                        </span>
                    </div>

                    <div class="informacion-producto">
                        <small>
                            ${producto.categoria.toUpperCase()}
                        </small>

                        <h3>${producto.nombre}</h3>

                        <p>${producto.descripcion}</p>

                        <div class="precio-producto">
                            ${mostrarPrecio(producto.precio)}
                        </div>

                        <button
                            class="boton boton-dorado boton-agregar"
                            data-agregar="${producto.id}"
                        >
                            AÑADIR AL CARRITO
                        </button>
                    </div>
                </article>
            `;
        })
        .join("");
}


/* =====================================
   GUARDAR CARRITO
===================================== */

function guardarCarrito() {
    localStorage.setItem(
        "carritoMundoRP",
        JSON.stringify(carritoCompras)
    );
}


/* =====================================
   AÑADIR PRODUCTO
===================================== */

function agregarProducto(idProducto) {
    const productoExistente = carritoCompras.find(
        producto => producto.id === idProducto
    );

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carritoCompras.push({
            id: idProducto,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarCarrito();
    mostrarNotificacion("Producto añadido al carrito");
}


/* =====================================
   CAMBIAR CANTIDAD
===================================== */

function cambiarCantidad(idProducto, cambio) {
    const productoCarrito = carritoCompras.find(
        producto => producto.id === idProducto
    );

    if (!productoCarrito) {
        return;
    }

    productoCarrito.cantidad += cambio;

    if (productoCarrito.cantidad <= 0) {
        carritoCompras = carritoCompras.filter(
            producto => producto.id !== idProducto
        );
    }

    guardarCarrito();
    actualizarCarrito();
}


/* =====================================
   ELIMINAR PRODUCTO
===================================== */

function eliminarProducto(idProducto) {
    carritoCompras = carritoCompras.filter(
        producto => producto.id !== idProducto
    );

    guardarCarrito();
    actualizarCarrito();
}


/* =====================================
   CALCULAR TOTAL
===================================== */

function calcularTotal() {
    return carritoCompras.reduce(
        (total, productoCarrito) => {
            const producto = productos.find(
                producto => producto.id === productoCarrito.id
            );

            return (
                total +
                producto.precio * productoCarrito.cantidad
            );
        },
        0
    );
}


/* =====================================
   ACTUALIZAR CARRITO
===================================== */

function actualizarCarrito() {
    const cantidadTotal = carritoCompras.reduce(
        (total, producto) => total + producto.cantidad,
        0
    );

    cantidadCarrito.textContent = cantidadTotal;

    if (cantidadTotal === 0) {
        carritoVacio.style.display = "block";
        resumenCarrito.style.display = "none";
    } else {
        carritoVacio.style.display = "none";
        resumenCarrito.style.display = "block";
    }

    productosCarrito.innerHTML = carritoCompras
        .map(productoCarrito => {
            const producto = productos.find(
                producto => producto.id === productoCarrito.id
            );

            return `
                <div class="producto-carrito">

                    <div class="icono-carrito">
                        ${producto.icono}
                    </div>

                    <div>
                        <h4>${producto.nombre}</h4>

                        <small>
                            ${mostrarPrecio(producto.precio)}
                        </small>

                        <div class="controles-cantidad">

                            <button
                                data-cantidad="-1"
                                data-id="${producto.id}"
                            >
                                −
                            </button>

                            <span>
                                ${productoCarrito.cantidad}
                            </span>

                            <button
                                data-cantidad="1"
                                data-id="${producto.id}"
                            >
                                +
                            </button>

                        </div>
                    </div>

                    <button
                        class="eliminar-producto"
                        data-eliminar="${producto.id}"
                    >
                        Eliminar
                    </button>

                </div>
            `;
        })
        .join("");

    const total = calcularTotal();

    totalCarrito.textContent = mostrarPrecio(total);
    totalFormulario.textContent = mostrarPrecio(total);
}


/* =====================================
   ABRIR Y CERRAR CARRITO
===================================== */

function abrirCarrito() {
    carrito.classList.add("activo");
    fondoCarrito.classList.add("activo");
    document.body.classList.add("sin-desplazamiento");
}

function cerrarCarrito() {
    carrito.classList.remove("activo");
    fondoCarrito.classList.remove("activo");
    document.body.classList.remove("sin-desplazamiento");
}


/* =====================================
   VENTANA DE COMPRA
===================================== */

function abrirVentanaCompra() {
    if (carritoCompras.length === 0) {
        return;
    }

    cerrarCarrito();

    formularioContenido.style.display = "block";
    mensajeExito.style.display = "none";

    ventanaCompra.classList.add("activa");
    document.body.classList.add("sin-desplazamiento");
}

function cerrarVentanaCompra() {
    ventanaCompra.classList.remove("activa");
    document.body.classList.remove("sin-desplazamiento");
}


/* =====================================
   NOTIFICACIÓN
===================================== */

let tiempoNotificacion;

function mostrarNotificacion(mensaje) {
    notificacion.textContent = mensaje;
    notificacion.classList.add("activa");

    clearTimeout(tiempoNotificacion);

    tiempoNotificacion = setTimeout(() => {
        notificacion.classList.remove("activa");
    }, 2200);
}


/* =====================================
   BOTONES DE PRODUCTOS Y CARRITO
===================================== */

document.addEventListener("click", evento => {
    const botonAgregar =
        evento.target.closest("[data-agregar]");

    if (botonAgregar) {
        const idProducto = Number(
            botonAgregar.dataset.agregar
        );

        agregarProducto(idProducto);
    }

    const botonCantidad =
        evento.target.closest("[data-cantidad]");

    if (botonCantidad) {
        const idProducto = Number(
            botonCantidad.dataset.id
        );

        const cambio = Number(
            botonCantidad.dataset.cantidad
        );

        cambiarCantidad(idProducto, cambio);
    }

    const botonEliminar =
        evento.target.closest("[data-eliminar]");

    if (botonEliminar) {
        const idProducto = Number(
            botonEliminar.dataset.eliminar
        );

        eliminarProducto(idProducto);
    }
});


/* =====================================
   BOTONES PARA ABRIR Y CERRAR
===================================== */

document
    .getElementById("abrir-carrito")
    .addEventListener("click", abrirCarrito);

document
    .getElementById("cerrar-carrito")
    .addEventListener("click", cerrarCarrito);

fondoCarrito.addEventListener(
    "click",
    cerrarCarrito
);

document
    .getElementById("finalizar-compra")
    .addEventListener("click", abrirVentanaCompra);

document
    .getElementById("cerrar-compra")
    .addEventListener("click", cerrarVentanaCompra);

document
    .getElementById("terminar-compra")
    .addEventListener("click", cerrarVentanaCompra);


/* =====================================
   PROCESAR FORMULARIO
===================================== */

formularioCompra.addEventListener(
    "submit",
    evento => {
        evento.preventDefault();

        const numeroOrden =
            "MRP-" +
            Math.floor(
                100000 + Math.random() * 900000
            );

        document.getElementById(
            "numero-orden"
        ).textContent = numeroOrden;

        formularioContenido.style.display = "none";
        mensajeExito.style.display = "block";

        carritoCompras = [];

        guardarCarrito();
        actualizarCarrito();
        formularioCompra.reset();
    }
);


/* =====================================
   CAMBIAR INFORMACIÓN DE LOS ROLES
===================================== */

const botonesRoles =
    document.querySelectorAll(".boton-rol");

botonesRoles.forEach(boton => {
    boton.addEventListener("click", () => {
        botonesRoles.forEach(botonRol => {
            botonRol.classList.remove("activo");
        });

        boton.classList.add("activo");

        const rolSeleccionado =
            roles[boton.dataset.rol];

        document.getElementById(
            "icono-rol"
        ).textContent = rolSeleccionado.icono;

        document.getElementById(
            "subtitulo-rol"
        ).textContent = rolSeleccionado.subtitulo;

        document.getElementById(
            "titulo-rol"
        ).textContent = rolSeleccionado.titulo;

        document.getElementById(
            "descripcion-rol"
        ).textContent = rolSeleccionado.descripcion;
    });
});


/* =====================================
   MENÚ DE CELULAR
===================================== */

const botonMenu =
    document.getElementById("boton-menu");

const menu =
    document.getElementById("menu");

botonMenu.addEventListener("click", () => {
    menu.classList.toggle("activo");
});

document
    .querySelectorAll(".menu a")
    .forEach(enlace => {
        enlace.addEventListener("click", () => {
            menu.classList.remove("activo");
        });
    });


/* =====================================
   FONDO DEL MENÚ AL BAJAR
===================================== */

window.addEventListener("scroll", () => {
    const encabezado =
        document.querySelector(".encabezado");

    if (window.scrollY > 30) {
        encabezado.classList.add("con-fondo");
    } else {
        encabezado.classList.remove("con-fondo");
    }
});


/* =====================================
   CERRAR CON LA TECLA ESCAPE
===================================== */

document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
        cerrarCarrito();
        cerrarVentanaCompra();
        menu.classList.remove("activo");
    }
});


/* =====================================
   AÑO AUTOMÁTICO
===================================== */

document.getElementById("anio").textContent =
    new Date().getFullYear();


/* =====================================
   INICIAR PÁGINA
===================================== */

mostrarProductos();
actualizarCarrito();

/* =====================================
   MANTENER FIJO EL BOTÓN DE DONACIONES
===================================== */

const botonDonacionesFlotante =
    document.querySelector(".boton-donaciones");

if (botonDonacionesFlotante) {
    document.body.appendChild(
        botonDonacionesFlotante
    );
}