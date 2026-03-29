// Función base para subir archivos a Zoho WorkDrive
// Puedes expandir este archivo para agregar editar, eliminar y compartir

// Subir archivo
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

// Listar carpetas y archivos en una carpeta (útil para obtener folder_id)
export async function listZohoFolders(access_token: string, parent_id?: string | null) {
  let url: string;
  if (typeof parent_id === 'string' && parent_id.length > 0) {
    url = `https://www.zohoapis.com/workdrive/api/v1/folders/${parent_id}/records`;
  } else {
    url = 'https://www.zohoapis.com/workdrive/api/v1/root';
  }
  const res = await fetch(url, {
    headers: { Authorization: `Zoho-oauthtoken ${access_token}` },
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// Editar (renombrar) archivo
export async function renameZohoFile(file_id: string, newName: string, access_token: string) {
  const res = await fetch(`https://www.zohoapis.com/workdrive/api/v1/files/${file_id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: newName }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

// Eliminar archivo
export async function deleteZohoFile(file_id: string, access_token: string) {
  const res = await fetch(`https://www.zohoapis.com/workdrive/api/v1/files/${file_id}`, {
    method: 'DELETE',
    headers: { Authorization: `Zoho-oauthtoken ${access_token}` },
  });
  if (!res.ok) throw await res.json();
  return { success: true };
}

// Compartir archivo (obtener link público)
export async function shareZohoFile(file_id: string, access_token: string) {
  const res = await fetch(`https://www.zohoapis.com/workdrive/api/v1/files/${file_id}/share`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      permission: { type: 'view', allowDownload: true },
      link: { type: 'external' },
    }),
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
