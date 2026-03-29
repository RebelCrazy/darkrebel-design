// Función base para subir archivos a Zoho WorkDrive
// Puedes expandir este archivo para agregar editar, eliminar y compartir

export async function uploadFileToZoho(file: any, access_token: string) {
  // NOTA: Debes obtener el folder_id de destino en Zoho WorkDrive
  const folder_id = 'TU_FOLDER_ID'; // <-- Reemplaza por el folder real

  const form = new FormData();
  form.append('content', file);
  // Puedes agregar más campos según la API de Zoho

  const res = await fetch(`https://www.zohoapis.com/workdrive/api/v1/upload?parent_id=${folder_id}`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`,
    },
    body: form,
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
