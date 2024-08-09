const productos = [
    {
        nombre: 'Producto 1',
        precio: 19.99,
        imagen: 'https://bocashop.vteximg.com.br/arquivos/ids/170354-360-360/IT9629_1_APPAREL_Photography_Front-View_transparent.png?v=638537401155470000'
    },
    {
        nombre: 'Producto 2',
        precio: 29.99,
        imagen: 'https://bocashop.vteximg.com.br/arquivos/ids/170216-360-360/HY0393_FR_Torso_eCom.jpg?v=638459496378830000'
    },
    {
        nombre: 'Producto 3',
        precio: 39.99,
        imagen: 'https://bocashop.vteximg.com.br/arquivos/ids/170180-360-360/HY0376_01.png?v=638449164958630000'
    },
    {
        nombre: 'Producto 4',
        precio: 49.99,
        imagen: 'https://bocashop.vteximg.com.br/arquivos/ids/170254-360-360/IP6071_01.jpg?v=638470645708230000'
    },
    {
        nombre: 'Producto 5',
        precio: 59.99,
        imagen: 'https://bocashop.vteximg.com.br/arquivos/ids/170283-360-360/IP9642_01.png?v=638495885928300000'
    }
];

let carrito = [];

// Función para crear una tarjeta de producto
function crearCardProducto(producto) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-content">
            <h2>${producto.nombre}</h2>
            <p>$${producto.precio.toFixed(2)}</p>
            <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
        </div>
    `;

    return card;
}

// Agregar tarjetas de productos al contenedor
const contenedorProductos = document.getElementById('productos');
productos.forEach(producto => {
    const card = crearCardProducto(producto);
    contenedorProductos.appendChild(card);
});

// Función para agregar un producto al carrito
function agregarAlCarrito(nombre, precio) {
    const producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    actualizarCarrito();
}

// Función para actualizar el carrito en la interfaz
function actualizarCarrito() {
    const listaCarrito = document.getElementById('carrito-lista');
    listaCarrito.innerHTML = '';

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(producto => {
        const item = document.createElement('li');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        item.innerHTML = `
            ${producto.nombre} (${producto.cantidad})
            <span>$${(producto.precio * producto.cantidad).toFixed(2)}</span>
            <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito('${producto.nombre}')">Eliminar</button>
        `;
        listaCarrito.appendChild(item);

        total += producto.precio * producto.cantidad;
        cantidadTotal += producto.cantidad;
    });

    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;

    const carritoCount = document.getElementById('carrito-count');
    carritoCount.textContent = cantidadTotal;
    carritoCount.classList.toggle('oculto', cantidadTotal === 0);
}