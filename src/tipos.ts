// Un producto, tal como aparece en la lista de main.ts.
export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  imagen: string;
  existencia: number;
}

// Lo que viaja dentro del evento 'agregar' (la SALIDA de la tarjeta).
export interface DetalleAgregar {
  id: string;
  nombre: string;
  precio: number;
  cantidad?: number;
}

// Le avisamos a TypeScript que el evento 'agregar' existe y qué trae.
// Sin esto, e.detail sería de tipo "any" en el addEventListener.
declare global {
  interface HTMLElementEventMap {
    agregar: CustomEvent<DetalleAgregar>;
  }
}

export interface ItemCarrito {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  total: number;
}

export interface ColumnaTabla {
  clave: string;
  titulo: string;
}

export interface DetalleCambioCantidad {
  valor: number;
}

declare global {
  interface HTMLElementEventMap {
    agregar: CustomEvent<DetalleAgregar>;
    cambioCantidad: CustomEvent<DetalleCambioCantidad>;
  }
}