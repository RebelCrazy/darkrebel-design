export const runtime = "edge";
export const dynamic = "force-dynamic";

import PlantillasPanel from "@/components/admin/PlantillasPanel";

export default function CotizacionesPage() {
  return (
    <PlantillasPanel
      heading="Cotizaciones"
      subheading="Modelos de cotización y alcance. Mismo flujo que una subpágina de base de datos en Notion."
      tipoFilter="cotizacion"
      lockTipo
    />
  );
}
