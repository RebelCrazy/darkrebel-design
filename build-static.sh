#!/bin/bash
# Script de build para el sitio estático HTML en Cloudflare Pages
set -e

mkdir -p .vercel/output/static
mkdir -p .vercel/output/static/admin

# Copiar archivos HTML desde la raíz y desde public/
cp -r ./*.html .vercel/output/static/ 2>/dev/null || true
cp -r ./public/*.html .vercel/output/static/ 2>/dev/null || true

# Copiar SVGs
cp ./*.svg .vercel/output/static/ 2>/dev/null || true
cp ./public/*.svg .vercel/output/static/ 2>/dev/null || true

# Copiar admin.html como admin/index.html
if [ -f "admin.html" ]; then
  cp admin.html .vercel/output/static/admin/index.html
fi

# Copiar carpetas de assets (css, js, fonts)
for d in css js fonts; do
  [ -d "$d" ] && cp -r "$d" .vercel/output/static/
  [ -d "public/$d" ] && cp -r "public/$d" .vercel/output/static/
done

echo "✅ Build estático completado."
