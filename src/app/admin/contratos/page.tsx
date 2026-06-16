export const runtime = "edge";
export const dynamic = "force-dynamic";

import PlantillasPanel from "@/components/admin/PlantillasPanel";

export default function ContratosPage() {
  return (
    <PlantillasPanel
      heading="Contratos"
      subheading="Textos base para contratos. Edita y duplica plantillas según cada cliente."
      tipoFilter="contrato"
      lockTipo
    />
  );
}
