import estilos from './contador-cantidad.css?inline';

export class ContadorCantidad extends HTMLElement {
  static observedAttributes = ['valor', 'min', 'max'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  private get valor(): number {
    return Number(this.getAttribute('valor') ?? '1');
  }

  private get min(): number {
    return Number(this.getAttribute('min') ?? '1');
  }

  private get max(): number {
    return Number(this.getAttribute('max') ?? '99');
  }

  private cambiarValor(nuevoValor: number) {
    if (nuevoValor < this.min || nuevoValor > this.max) return;

    this.setAttribute('valor', String(nuevoValor));

  
    this.dispatchEvent(
      new CustomEvent('cambioCantidad', {
        detail: { valor: nuevoValor },
        bubbles: true,
        composed: true,
      })
    );
  }

  private render() {
    if (!this.shadowRoot) return;

    const val = this.valor;
    const esMin = val <= this.min;
    const esMax = val >= this.max;

    this.shadowRoot.innerHTML = `
      <style>${estilos}</style>
      <div class="contador">
        <button id="restar" ${esMin ? 'disabled' : ''}>-</button>
        <span>${val}</span>
        <button id="sumar" ${esMax ? 'disabled' : ''}>+</button>
      </div>
    `;

    this.shadowRoot.querySelector('#restar')?.addEventListener('click', () => {
      this.cambiarValor(this.valor - 1);
    });

    this.shadowRoot.querySelector('#sumar')?.addEventListener('click', () => {
      this.cambiarValor(this.valor + 1);
    });
  }
}

customElements.define('contador-cantidad', ContadorCantidad);