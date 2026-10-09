import estilos from './tarjeta-producto.css?inline';
import './contador-cantidad';
import type { DetalleAgregar } from './tipos';

export class TarjetaProducto extends HTMLElement {

    static observedAttributes = ['producto-id', 'nombre', 'precio', 'imagen', 'existencia'];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.pintar();
    }

    attributeChangedCallback() {
        this.pintar();
    }

    private pintar() {
        const id = this.getAttribute('producto-id') ?? '';
        const nombre = this.getAttribute('nombre') ?? '';
        const precio = Number(this.getAttribute('precio') ?? '0');
        const imagen = this.getAttribute('imagen') ?? '';
        const existencia = Number(this.getAttribute('existencia') ?? '0');

        const agotado = existencia === 0;

        this.shadowRoot!.innerHTML = `
            <style>${estilos}</style>
            <article class="tarjeta">
                <img src="${imagen}" alt="${nombre}">
                <div class="cuerpo">
                    <h3>${nombre}</h3>
                    <p class="precio">$${precio}</p>
                    <p class="existencia ${agotado ? 'agotado' : ''}">
                        ${agotado ? 'Agotado' : `${existencia} disponibles`}
                    </p>
                    ${!agotado ? `<contador-cantidad valor="1" min="1" max="${existencia}"></contador-cantidad>` : ''}
                    <boton-app ${agotado ? 'deshabilitado' : ''}>
                        Agregar al carrito
                    </boton-app>
                </div>
            </article>
        `;

        const boton = this.shadowRoot!.querySelector('boton-app');
        const contador = this.shadowRoot!.querySelector('contador-cantidad');

        if (boton && !agotado) {
            boton.addEventListener('click', () => {
                const cantidadSeleccionada = Number(contador?.getAttribute('valor') ?? '1');

                const detalle: DetalleAgregar = {
                    id,
                    nombre,
                    precio,
                    cantidad: cantidadSeleccionada
                };

                this.dispatchEvent(
                    new CustomEvent<DetalleAgregar>('agregar', {
                        detail: detalle,
                        bubbles: true,
                        composed: true,
                    })
                );
            });
        }
    }
}

customElements.define('tarjeta-producto', TarjetaProducto);