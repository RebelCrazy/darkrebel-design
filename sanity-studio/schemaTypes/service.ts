import {defineField, defineType} from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  icon: () => '⚡',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del servicio',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline corto',
      type: 'string',
      description: 'Una línea que describe el servicio (ej: "Identidad que dura décadas")',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Ícono (emoji)',
      type: 'string',
      description: 'Ej: 🎨 💻 📐',
    }),
    defineField({
      name: 'features',
      title: 'Incluye / Features',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Lista de lo que incluye el servicio',
    }),
    defineField({
      name: 'price',
      title: 'Precio',
      type: 'object',
      fields: [
        {name: 'from', title: 'Desde (USD)', type: 'number'},
        {name: 'label', title: 'Etiqueta de precio', type: 'string', description: 'Ej: "Desde $1,500 USD"'},
        {name: 'note', title: 'Nota adicional', type: 'string', description: 'Ej: "Cotización personalizada"'},
      ],
    }),
    defineField({
      name: 'deliverables',
      title: 'Entregables',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'timeline',
      title: 'Tiempo de entrega',
      type: 'string',
      description: 'Ej: "2-3 semanas"',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Identidad de Marca', value: 'branding'},
          {title: 'Diseño Web', value: 'web'},
          {title: 'UI/UX', value: 'uiux'},
          {title: 'Redes Sociales', value: 'social'},
          {title: 'Real Estate Tech', value: 'realestate'},
          {title: 'Retención Mensual', value: 'retencion'},
        ],
      },
    }),
    defineField({
      name: 'active',
      title: '¿Activo / Visible?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: '¿Servicio destacado?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Orden de aparición',
      type: 'number',
      description: 'Número menor = aparece primero',
    }),
    defineField({
      name: 'cta',
      title: 'CTA (botón)',
      type: 'string',
      initialValue: 'Cotizar ahora',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'price.label',
      active: 'active',
    },
    prepare({title, subtitle, active}) {
      return {
        title: `${active ? '🟢' : '🔴'} ${title}`,
        subtitle: subtitle || 'Sin precio definido',
      }
    },
  },
  orderings: [
    {
      title: 'Por orden',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
