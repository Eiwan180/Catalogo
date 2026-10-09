import estilos from './tabla-generica.css?inline';
import type { ColumnaTabla } from './tipos';

export class TablaGenerica extends HTMLElement {
  private _columnas: ColumnaTabla[] = [];
  private _filas: Record<string, any>[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }


  set columnas(val: ColumnaTabla[]) {
    this._columnas = val;
    this.render();
  }

  get columnas(): ColumnaTabla[] {
    return this._columnas;
  }

  set filas(val: Record<string, any>[]) {
    this._filas = val;
    this.render();
  }

  get filas(): Record<string, any>[] {
    return this._filas;
  }

  private render() {
    if (!this.shadowRoot) return;

    if (this._filas.length === 0) {
      this.shadowRoot.innerHTML = `
        <style>${estilos}</style>
        <div class="contenedor-tabla">
          <p class="sin-datos">Sin datos</p>
        </div>
      `;
      return;
    }

    const encabezadosHTML = this._columnas
      .map(col => `<th>${col.titulo}</th>`)
      .join('');

    const filasHTML = this._filas
      .map(fila => {
        const celdas = this._columnas
          .map(col => `<td>${fila[col.clave] ?? ''}</td>`)
          .join('');
        return `<tr>${celdas}</tr>`;
      })
      .join('');

    this.shadowRoot.innerHTML = `
      <style>${estilos}</style>
      <div class="contenedor-tabla">
        <table>
          <thead>
            <tr>${encabezadosHTML}</tr>
          </thead>
          <tbody>
            ${filasHTML}
          </tbody>
        </table>
      </div>
    `;
  }
}

customElements.define('tabla-generica', TablaGenerica);