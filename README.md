# Dani Bolsas

Catálogo digital de bolsas de mano — negocio de Dani (Bacalar, México).

**Owner:** Dani (via Sofia)
**Stack:** Astro + Tailwind CSS
**Deploy:** Vercel — [dani-bolsas.vercel.app](https://dani-bolsas.vercel.app) (production) / preview URLs auto-generated per PR
**Repo:** htekdev/dani-bolsas
**Vercel project:** `htekdevs-projects/dani-bolsas`

## Estructura

- **Catálogo público** (`/`, `/bolsas`) — vitrina de productos con fotos, descripción y precio de venta.
- **Costeo interno** (`/admin/costeo`) — calculadora de costo total puesto en tienda (compra + viaje prorrateado + impuestos + otros) y precio sugerido de venta según margen deseado.
- **Datos** (`src/data/`) — `bolsas.json` (productos), `viajes.json` (viajes de compra), `config.json` (impuestos, margen objetivo).

## Modelo de costeo (por bolsa)

```
costo_total = precio_compra
            + (costo_viaje_total / bolsas_del_viaje)   ← prorrateo del viaje
            + impuestos_aplicables
            + otros_costos                              ← empaque, transporte local, etc.

precio_sugerido = costo_total / (1 - margen_objetivo)
utilidad        = precio_venta - costo_total
margen_real     = utilidad / precio_venta
```

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor local
npm run build     # build producción
npm test          # correr tests (Vitest)
```

## Flujo de trabajo

1. Rama de feature → PR → preview de Vercel → aprobación de Sofia/Dani → merge.
2. PRs técnicos (tests, refactors, CI) → Hector.
3. PRs de contenido/UI que Sofia pidió → Sofia aprueba.
