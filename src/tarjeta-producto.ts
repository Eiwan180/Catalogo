import estilos from './tarjeta-producto.css?inline';

export class TarjetaProducto extends HTMLElement {

    static observedAttributes = ['producto-id', 'nombre', 'precio', 'imagen', 'existencia'];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.pintar();
    }

    private pintar() {
        const id = this.getAttribute('producto-id') ?? '';
        const nombre = this.getAttribute('nombre') ?? '';
        const precio = this.getAttribute('precio') ?? '';
        const imagen = this.getAttribute('imagen') ?? '';
        const existencia = Number(this.getAttribute('existencia') ?? '');

        const agotado = existencia === 0;

        this.shadowRoot!.innerHTML = `
            <style>${estilos}</style>
            <article class="tarjeta">
            <img src="${imagen}" alt="${nombre}">
            <div class="cuerpo">
                <h3>${nombre}</h3>
                <p class="precio">$${precio}</p>
                <p class="existencia">${existencia} disponibles</p>
                <boton-app>Agregar al carrito</boton-app>
            </div>
            </article>
        `;

    }
}

customElements.define('tarjeta-producto', TarjetaProducto);