# Datos que Dani necesita enviar

Este documento se llenara con la informacion real de Dani. Mientras tanto,
la estructura muestra que necesitamos:

## 1. Configuracion global (`src/data/config.json`)

- **`margen_objetivo`** — Que porcentaje de utilidad quieres sobre cada bolsa. Ejemplo: `0.40` = 40%.
- **`tasa_impuestos`** — Que porcentaje de impuestos aplica a cada bolsa. Ejemplo: `0.16` = 16% (IVA).
- **`metodo_prorrateo_viaje`** — `"igual"` (partes iguales) o `"proporcional"` (segun precio de compra).

## 2. Viajes de compra (`src/data/viajes.json`)

Cada viaje que Dani hace para comprar bolsas. Ejemplo:

```json
{
  "id": "viaje-2026-08-bacalar",
  "fecha": "2026-08-15",
  "destino": "Bacalar",
  "costo_total": 3500,
  "desglose": {
    "transporte": 2000,
    "hospedaje": 1000,
    "comidas": 500
  },
  "metodo_prorrateo": "igual",
  "bolsas": ["bolsa-001", "bolsa-002", "bolsa-003"]
}
```

**Que necesitamos por viaje:**
- Fecha
- Costo total (transporte + hospedaje + comidas + cualquier otro)
- Lista de IDs de las bolsas compradas en ese viaje

## 3. Bolsas (`src/data/bolsas.json`)

Cada bolsa individual. Ejemplo:

```json
{
  "id": "bolsa-001",
  "nombre": "Bolsa Beige Piel",
  "descripcion": "Piel genuina, cierre dorado, un solo compartimento.",
  "foto": "/fotos/bolsa-001.jpg",
  "precio_compra": 350,
  "otros_costos": 20,
  "precio_venta": 850,
  "estado": "disponible"
}
```

**Que necesitamos por bolsa:**
- ID unico (ej. `bolsa-001`)
- Nombre
- Descripcion corta
- Foto (subir al folder `public/fotos/`)
- Precio de compra al proveedor
- Otros costos (empaque, comisiones, transporte local) — opcional
- Precio de venta (si ya lo tiene decidido) — opcional, si no lo pone la calculadora sugiere uno
- Estado: `"disponible"` o `"vendida"`

## 4. Fotos

Subir todas las fotos a `public/fotos/` con el mismo nombre que el ID de la bolsa:
`public/fotos/bolsa-001.jpg`

Recomendado: fotos cuadradas (1:1), buena luz natural, fondo neutro.
