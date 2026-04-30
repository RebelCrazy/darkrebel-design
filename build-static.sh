#!/bin/bash
# Script de build para el sitio estático HTML en Cloudflare Pages
set -e

mkdir -p .vercel/output/static
mkdir -p .vercel/output/static/admin

# 1. Copiar todo el contenido de landing-page
cp -r ./landing-page/* .vercel/output/static/ 2>/dev/null || true

# 2. Copiar imágenes y assets compartidos desde public
cp -r ./public/* .vercel/output/static/ 2>/dev/null || true

# 3. Mover admin.html a su propia carpeta (si existe en static)
if [ -f ".vercel/output/static/admin.html" ]; then
  mv .vercel/output/static/admin.html .vercel/output/static/admin/index.html
fi

echo "✅ Build estático completado."
