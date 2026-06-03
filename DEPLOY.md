# 🚀 Guía de Deploy — Dark Rebel Design (Cloudflare Pages + D1 + R2)

## Prerequisitos
- Cuenta en Cloudflare
- Repositorio en GitHub
- Node.js 18+

---

## PASO 1 — Variables de entorno (local)

1. Copia el ejemplo:

```bash
cp .env.example .env.local
```

2. Edita `.env.local` con tus valores.

### Generar `ADMIN_PASSWORD_HASH`
```bash
node -e "console.log(require('crypto').createHash('sha256').update('TU_PASSWORD').digest('hex'))"
```

### Generar `ADMIN_SESSION_SECRET`
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Web3Forms (formulario de contacto)
- Variable: `NEXT_PUBLIC_WEB3FORMS_KEY`
- Se usa en el formulario de `/contacto`.

---

## PASO 2 — Subir a GitHub

```bash
git add .
git commit -m "chore: deploy config"
git push origin main
```

---

## PASO 3 — Crear base de datos D1 (solo una vez)

```bash
npm install -g wrangler
wrangler login
wrangler d1 create dark-rebel-db
```

Copia el `database_id` que te devuelve y actualiza `wrangler.toml` si aplica.

### Ejecutar migraciones (producción)
```bash
wrangler d1 execute dark-rebel-db --remote --file=migrations/0001_create_proyectos.sql
wrangler d1 execute dark-rebel-db --remote --file=migrations/0002_expand_darkrebel_schema.sql
wrangler d1 execute dark-rebel-db --remote --file=migrations/0003_seed_darkrebel_data.sql
wrangler d1 execute dark-rebel-db --remote --file=migrations/0004_tareas_visible_cliente.sql
wrangler d1 execute dark-rebel-db --remote --file=migrations/0005_plantillas_nombre.sql
wrangler d1 execute dark-rebel-db --remote --file=migrations/0006_web_freelance.sql
wrangler d1 execute dark-rebel-db --remote --file=migrations/0007_clientes_crm_fields.sql
wrangler d1 execute dark-rebel-db --remote --file=migrations/0008_create_zoho_tokens.sql
```

---

## PASO 4 — Deploy en Cloudflare Pages

1. Cloudflare Dashboard → **Pages → Create a project → Connect to Git**
2. Selecciona el repo
3. Build settings:
   - **Framework preset:** Next.js
   - **Build command:** `npm run pages:build`
   - **Build output directory:** `.vercel/output/static`

### Variables de entorno (Cloudflare Pages)
Pages → tu proyecto → **Settings → Environment variables**

Mínimas (portal admin):
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- `ADMIN_SESSION_SECRET`

Contacto:
- `NEXT_PUBLIC_WEB3FORMS_KEY`

Zoho (si usas integración):
- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_REDIRECT_URI` (ej: `https://proyectos.darkrebel.store/api/zoho/callback`)

Sanity (si usas blog):
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION` (default recomendado: `2026-05-15`)

### Bindings (Functions)
Pages → tu proyecto → **Settings → Functions**

**D1 database bindings:**
- Variable name: `DB`
- Database: `dark-rebel-db`

**R2 bucket bindings (para /api/files/*):**
- Variable name: `MY_BUCKET`
- Bucket: `darkrebel-files` (o el que uses)

4. **Save and Deploy**

---

## PASO 5 — Dominio personalizado (opcional)
Pages → tu proyecto → **Custom domains**

---

## Desarrollo local

```bash
npm install
npm run dev
```

Para probar con bindings de Cloudflare local (D1):
```bash
npx wrangler pages dev --d1=DB -- npm run dev
```

---

## Checklist rápido
- [ ] Env vars configuradas en Cloudflare Pages (Production)
- [ ] D1 migraciones ejecutadas en producción
- [ ] Binding D1 configurado (DB)
- [ ] Binding R2 configurado (MY_BUCKET)
- [ ] Formulario de contacto probado
- [ ] Login admin funciona (/admin/login)
