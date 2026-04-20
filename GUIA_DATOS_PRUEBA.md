# Agregando Datos de Prueba al Panel Admin

He creado dos formas de agregar datos de prueba. Elige la que prefieras:

## Opción 1: Usar Cloudflare D1 Console (Recomendado)

1. **Ir a Cloudflare Dashboard**
   - Accede a tu proyecto `darkrebel-design`
   - Workers & Pages → D1 → `dark-rebel-db`

2. **Ejecutar el SQL**
   - Abre la pestaña "Console"
   - Copia y pega el contenido de `seed-test-data.sql`
   - Ejecuta los comandos

3. **Verificar que funcionó**
   - El resultado mostrará los registros creados
   - Si ves las 4 tablas (CLIENTES, PROYECTOS, COLABORADORES, TAREAS) ✅

## Opción 2: Ejecutar Script Node Local

Si tu app corre en `http://localhost:3000`:

```bash
# Primero asegúrate que el servidor está corriendo
npm run dev

# En otra terminal:
node create-test-data.js
```

## ¿Qué se va a crear?

### 📋 Cliente
- **Nombre**: TechStartup México S.A.
- **Email**: contacto@techstartup.mx
- **Status**: Cliente Activo
- **Área**: Tecnología / SaaS

### 📊 Proyecto
- **Nombre**: Rediseño Web - TechStartup
- **Estado**: En Desarrollo
- **Progreso**: 75%
- **Stack**: React 18, Next.js 14, TailwindCSS

### 👥 Colaboradores (3)
- Carlos Mendez (carlos@darkrebel.com)
- Sofia Gutierrez (sofia@darkrebel.com)
- Miguel Torres (miguel@darkrebel.com)

### ✅ Tareas (4)
1. Diseño de wireframes - **Completada** (Carlos)
2. Implementación Frontend - **En Progreso** (Sofia)
3. Testing y QA - **Pendiente** (Miguel)
4. Optimización SEO - **Pendiente** (Sin asignar)

## 🎯 Acceder al Panel

Una vez agregados los datos:

1. Ve a: `https://tudominio.com/admin/login`
2. Usuario: `darkrebel-admin`
3. Contraseña: `I6FWy6IQjNwXdIo6e2k4Gw==`

Deberías ver:
- ✅ Cliente "TechStartup México S.A." en CRM
- ✅ Proyecto "Rediseño Web - TechStartup" con 75% progreso
- ✅ 4 Tareas en diferentes estados
- ✅ 3 Colaboradores asignados

## 🐛 Si algo falla

**Error en Cloudflare D1:**
- Asegúrate de que las tablas existan (ejecutar migraciones primero)
- Copia el comando SQL línea por línea si hay errores

**Script Node falla:**
- Verifica que `npm run dev` esté corriendo
- Revisa que los endpoints existan: `curl http://localhost:3000/api/crm`
- Ve los logs en la consola

¿Necesitas ayuda?
