/**
 * Script para crear datos de prueba en la base de datos
 * Simula: Cliente → Proyecto → Tareas → Colaboradores
 */

const crypto = require('crypto');

// Función para hacer requests a la API local
async function apiRequest(endpoint, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`http://localhost:3000${endpoint}`, options);
    if (!response.ok) {
      console.error(`❌ Error ${response.status}: ${response.statusText}`);
      const text = await response.text();
      console.error(text);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error(`Error en request a ${endpoint}:`, error.message);
    return null;
  }
}

async function crearDatoPrueba() {
  console.log('\n🚀 Creando datos de prueba completos...\n');

  // 1. Crear Cliente
  console.log('📋 Creando cliente...');
  const clienteData = {
    nombre: 'TechStartup México S.A.',
    email: 'contacto@techstartup.mx',
    estatus: 'Cliente Activo',
    telefono: '+52 (33) 1234-5678',
    area_negocio: 'Tecnología / SaaS',
    ubicacion: 'Guadalajara, Jalisco',
    web: 'https://www.techstartup.mx',
    instagram: '@techstartup.mx',
    linkedin: 'company/techstartup-mexico'
  };
  const clienteResponse = await apiRequest('/api/crm', 'POST', clienteData);
  
  if (!clienteResponse || !clienteResponse.id) {
    console.error('❌ No se pudo crear el cliente');
    return;
  }
  
  const clienteId = clienteResponse.id;
  console.log(`✅ Cliente creado: ${clienteId}`);

  // 2. Crear Colaboradores
  console.log('\n👥 Creando colaboradores...');
  const colaboradores = [
    { nombre: 'Carlos Mendez', email: 'carlos@darkrebel.com' },
    { nombre: 'Sofia Gutierrez', email: 'sofia@darkrebel.com' },
    { nombre: 'Miguel Torres', email: 'miguel@darkrebel.com' }
  ];

  const colaboradorIds = [];
  for (const colab of colaboradores) {
    const response = await apiRequest('/api/colaboradores', 'POST', colab);
    if (response?.id) {
      colaboradorIds.push(response.id);
      console.log(`✅ Colaborador: ${colab.nombre}`);
    }
  }

  // 3. Crear Proyecto
  console.log('\n📊 Creando proyecto...');
  const proyectoData = {
    nombre: 'Rediseño Web - TechStartup',
    cliente_id: clienteId,
    progreso: 75,
    estado: 'En Desarrollo',
    link_figma: 'https://www.figma.com/file/tech-startup-2026',
    descripcion: 'Rediseño completo de sitio web y optimización UX'
  };
  
  const proyectoResponse = await apiRequest('/api/proyectos', 'POST', proyectoData);
  if (!proyectoResponse || !proyectoResponse.id) {
    console.error('❌ No se pudo crear el proyecto');
    return;
  }

  const proyectoId = proyectoResponse.id;
  console.log(`✅ Proyecto creado: ${proyectoId}`);

  // 4. Crear Tareas
  console.log('\n✅ Creando tareas...');
  const tareas = [
    {
      proyecto_id: proyectoId,
      titulo: 'Diseño de wireframes',
      descripcion: 'Crear wireframes de todas las páginas principales',
      estado: 'Completada',
      fecha_entrega: '2026-03-15',
      colaborador_id: colaboradorIds[0] || null
    },
    {
      proyecto_id: proyectoId,
      titulo: 'Implementación Frontend',
      descripcion: 'Maquetar todos los componentes en React',
      estado: 'En Progreso',
      fecha_entrega: '2026-04-15',
      colaborador_id: colaboradorIds[1] || null
    },
    {
      proyecto_id: proyectoId,
      titulo: 'Testing y QA',
      descripcion: 'Pruebas de funcionalidad y compatibilidad',
      estado: 'Pendiente',
      fecha_entrega: '2026-04-25',
      colaborador_id: colaboradorIds[2] || null
    },
    {
      proyecto_id: proyectoId,
      titulo: 'Optimización SEO',
      descripcion: 'Implementar meta tags y optimizaciones SEO',
      estado: 'Pendiente',
      fecha_entrega: '2026-04-30',
      colaborador_id: null
    }
  ];

  for (const tarea of tareas) {
    const response = await apiRequest('/api/tareas', 'POST', tarea);
    if (response?.id) {
      console.log(`  ✓ ${tarea.titulo} (${tarea.estado})`);
    }
  }

  // Resumen
  console.log('\n' + '='.repeat(50));
  console.log('✨ DATOS DE PRUEBA CREADOS EXITOSAMENTE');
  console.log('='.repeat(50));
  console.log(`
📋 Cliente:
   Nombre: ${clienteData.nombre}
   Email: ${clienteData.email}

📊 Proyecto:
   Nombre: ${proyectoData.nombre}
   Estado: ${proyectoData.estado}
   Progreso: ${proyectoData.progreso}%

👥 Colaboradores: ${colaboradores.length}
✅ Tareas: ${tareas.length}

🔗 Accede al panel en: http://localhost:3000/admin/login
   Usuario: darkrebel-admin
   Contraseña: I6FWy6IQjNwXdIo6e2k4Gw==
  `);
}

crearDatoPrueba().catch(console.error);
