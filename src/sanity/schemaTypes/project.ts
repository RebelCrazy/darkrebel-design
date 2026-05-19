import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Proyecto / Portafolio',
  type: 'document',
  icon: () => '🎨',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del proyecto',
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
      name: 'client',
      title: 'Cliente / Marca',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline del proyecto',
      type: 'string',
      description: 'Una línea que resume el reto o resultado',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen principal',
      type: 'image',
      options: {hotspot: true},
      fields: [
        {name: 'alt', title: 'Alt', type: 'string'},
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de imágenes',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', title: 'Alt', type: 'string'},
            {name: 'caption', title: 'Leyenda', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'services',
      title: 'Servicios aplicados',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          'Identidad de Marca',
          'Diseño Web',
          'UI/UX',
          'Redes Sociales',
          'Real Estate Tech',
          'Motion Design',
          'Copywriting',
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Industria',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Ej: Real Estate, Fitness, Restaurante, Tech',
    }),
    defineField({
      name: 'url',
      title: 'URL del proyecto (si aplica)',
      type: 'url',
    }),
    defineField({
      name: 'results',
      title: 'Resultados / Métricas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'metric', title: 'Métrica', type: 'string', description: 'Ej: "+180% engagement"'},
            {name: 'label', title: 'Descripción', type: 'string', description: 'Ej: "en Instagram"'},
          ],
          preview: {
            select: {title: 'metric', subtitle: 'label'},
          },
        },
      ],
    }),
    defineField({
      name: 'completedAt',
      title: 'Fecha de entrega',
      type: 'date',
    }),
    defineField({
      name: 'featured',
      title: '¿Proyecto destacado?',
      type: 'boolean',
      initialValue: false,
      description: 'Aparece en la sección hero del portafolio',
    }),
    defineField({
      name: 'published',
      title: '¿Publicado?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Orden en portafolio',
      type: 'number',
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study (contenido largo)',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare({title, subtitle, media, featured}) {
      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle,
        media,
      }
    },
  },
})
