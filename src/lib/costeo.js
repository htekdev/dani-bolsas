// Modelo de costeo para bolsas de Dani.
// Todo el dinero se maneja en MXN, redondeado a 2 decimales solo al mostrar.

/**
 * Calcula el costo total puesto en tienda de una bolsa individual.
 */
export function calcularCostoTotal({ precio_compra, costo_viaje, impuestos, otros_costos = 0 }) {
  const inputs = [precio_compra, costo_viaje, impuestos, otros_costos];
  for (const v of inputs) {
    if (typeof v !== 'number' || Number.isNaN(v) || v < 0) {
      throw new Error('Todos los costos deben ser numeros >= 0');
    }
  }
  return precio_compra + costo_viaje + impuestos + otros_costos;
}

/**
 * Prorratea el costo total de un viaje entre las bolsas compradas en ese viaje.
 * Metodo por defecto: partes iguales por bolsa. Alternativa: proporcional al precio de compra.
 */
export function prorratearViaje({ costo_viaje_total, bolsas, metodo = 'igual' }) {
  if (typeof costo_viaje_total !== 'number' || costo_viaje_total < 0) {
    throw new Error('costo_viaje_total debe ser numero >= 0');
  }
  if (!Array.isArray(bolsas) || bolsas.length === 0) {
    throw new Error('bolsas debe ser array no vacio');
  }

  if (metodo === 'igual') {
    const parte = costo_viaje_total / bolsas.length;
    return bolsas.map(() => parte);
  }

  if (metodo === 'proporcional') {
    const total = bolsas.reduce((s, b) => s + b.precio_compra, 0);
    if (total === 0) {
      const parte = costo_viaje_total / bolsas.length;
      return bolsas.map(() => parte);
    }
    return bolsas.map((b) => (b.precio_compra / total) * costo_viaje_total);
  }

  throw new Error(`metodo desconocido: ${metodo}`);
}

/**
 * Calcula el precio de venta sugerido para alcanzar un margen objetivo.
 * margen = utilidad / precio_venta  =>  precio_venta = costo_total / (1 - margen)
 */
export function precioSugerido(costo_total, margen_objetivo) {
  if (typeof costo_total !== 'number' || costo_total < 0) {
    throw new Error('costo_total debe ser >= 0');
  }
  if (typeof margen_objetivo !== 'number' || margen_objetivo < 0 || margen_objetivo >= 1) {
    throw new Error('margen_objetivo debe estar en [0, 1)');
  }
  return costo_total / (1 - margen_objetivo);
}

/**
 * Calcula utilidad y margen real dado un precio de venta.
 */
export function utilidadReal(precio_venta, costo_total) {
  if (typeof precio_venta !== 'number' || precio_venta <= 0) {
    throw new Error('precio_venta debe ser > 0');
  }
  if (typeof costo_total !== 'number' || costo_total < 0) {
    throw new Error('costo_total debe ser >= 0');
  }
  const utilidad = precio_venta - costo_total;
  const margen_real = utilidad / precio_venta;
  return { utilidad, margen_real };
}

/**
 * Formatea un numero como moneda MXN.
 */
export function mxn(n) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}
