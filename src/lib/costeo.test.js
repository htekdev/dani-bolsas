import { describe, it, expect } from 'vitest';
import {
  calcularCostoTotal,
  prorratearViaje,
  precioSugerido,
  utilidadReal,
  mxn,
} from './costeo.js';

describe('calcularCostoTotal', () => {
  it('suma todos los componentes', () => {
    const t = calcularCostoTotal({
      precio_compra: 300,
      costo_viaje: 50,
      impuestos: 48,
      otros_costos: 12,
    });
    expect(t).toBe(410);
  });

  it('otros_costos default 0', () => {
    const t = calcularCostoTotal({ precio_compra: 100, costo_viaje: 20, impuestos: 16 });
    expect(t).toBe(136);
  });

  it('rechaza numeros negativos', () => {
    expect(() =>
      calcularCostoTotal({ precio_compra: -1, costo_viaje: 0, impuestos: 0 })
    ).toThrow();
  });

  it('rechaza valores no numericos', () => {
    expect(() =>
      calcularCostoTotal({ precio_compra: 'x', costo_viaje: 0, impuestos: 0 })
    ).toThrow();
  });
});

describe('prorratearViaje', () => {
  it('prorratea en partes iguales por defecto', () => {
    const partes = prorratearViaje({
      costo_viaje_total: 3000,
      bolsas: [{ precio_compra: 200 }, { precio_compra: 300 }, { precio_compra: 500 }],
    });
    expect(partes).toEqual([1000, 1000, 1000]);
  });

  it('prorratea proporcional al precio de compra', () => {
    const partes = prorratearViaje({
      costo_viaje_total: 1000,
      bolsas: [{ precio_compra: 200 }, { precio_compra: 300 }, { precio_compra: 500 }],
      metodo: 'proporcional',
    });
    expect(partes[0]).toBeCloseTo(200);
    expect(partes[1]).toBeCloseTo(300);
    expect(partes[2]).toBeCloseTo(500);
  });

  it('la suma de las partes prorrateadas iguala el costo total del viaje', () => {
    const bolsas = [
      { precio_compra: 250 },
      { precio_compra: 400 },
      { precio_compra: 175 },
      { precio_compra: 600 },
    ];
    const partes = prorratearViaje({ costo_viaje_total: 4500, bolsas, metodo: 'proporcional' });
    const suma = partes.reduce((a, b) => a + b, 0);
    expect(suma).toBeCloseTo(4500);
  });

  it('rechaza array de bolsas vacio', () => {
    expect(() => prorratearViaje({ costo_viaje_total: 100, bolsas: [] })).toThrow();
  });

  it('rechaza metodo desconocido', () => {
    expect(() =>
      prorratearViaje({ costo_viaje_total: 100, bolsas: [{ precio_compra: 1 }], metodo: 'x' })
    ).toThrow();
  });
});

describe('precioSugerido', () => {
  it('40% de margen sobre costo 600 = 1000', () => {
    expect(precioSugerido(600, 0.4)).toBeCloseTo(1000);
  });

  it('0% de margen = costo', () => {
    expect(precioSugerido(500, 0)).toBe(500);
  });

  it('rechaza margen >= 1', () => {
    expect(() => precioSugerido(500, 1)).toThrow();
  });

  it('rechaza margen negativo', () => {
    expect(() => precioSugerido(500, -0.1)).toThrow();
  });
});

describe('utilidadReal', () => {
  it('calcula utilidad y margen', () => {
    const { utilidad, margen_real } = utilidadReal(1000, 600);
    expect(utilidad).toBe(400);
    expect(margen_real).toBeCloseTo(0.4);
  });

  it('utilidad puede ser negativa (venta bajo costo)', () => {
    const { utilidad, margen_real } = utilidadReal(400, 600);
    expect(utilidad).toBe(-200);
    expect(margen_real).toBeCloseTo(-0.5);
  });

  it('rechaza precio_venta <= 0', () => {
    expect(() => utilidadReal(0, 100)).toThrow();
  });
});

describe('mxn', () => {
  it('formatea con signo de peso y 2 decimales', () => {
    const s = mxn(1234.5);
    expect(s).toMatch(/1,234\.50/);
    expect(s).toMatch(/\$/);
  });
});
