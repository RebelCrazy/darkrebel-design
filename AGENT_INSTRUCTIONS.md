# INSTRUCCIONES PARA EL AGENTE Y DESARROLLADORES

## Gestión de Archivos por Cliente
- Los archivos anexos de cada cliente se almacenan en `/uploads/clientes/{id}/`.
- El endpoint de subida acepta múltiples archivos (FormData) y los guarda en la carpeta correspondiente al cliente.
- El frontend permite subir, listar y eliminar archivos por cliente.

## Compatibilidad Cloudflare Pages/Workers
- **Advertencia:** Cloudflare Pages/Workers NO soporta filesystem local en producción. El almacenamiento local solo funciona en desarrollo o entornos compatibles.
- Para producción en Cloudflare, migrar la lógica de almacenamiento a R2 (o S3 compatible).
- El código está estructurado para facilitar la migración: solo reemplazar la lógica de filesystem por llamadas a R2/S3 en los endpoints.

## Migración a R2/S3
- Reemplazar la lógica de `fs` en los endpoints por la API de R2/S3.
- Mantener la estructura `/clientes/{id}/archivo.ext` en el bucket.
- Actualizar el frontend para obtener URLs firmadas si es necesario.

## Notas para el Agente
- Mantener estos avisos y advertencias en los endpoints y componentes relacionados.
- Documentar cualquier cambio relevante en este archivo.
- Validar siempre la compatibilidad con el entorno de despliegue.

---

**Última actualización:** 28/03/2026
Responsable: GitHub Copilot
