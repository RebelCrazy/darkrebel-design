import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del sitio',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripción (SEO)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'marqueeItems',
      title: 'Items del Marquee (Hero)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Textos que aparecen rotando en la página principal',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Información de Contacto',
      type: 'object',
      fields: [
        {name: 'phone', title: 'Teléfono', type: 'string'},
        {name: 'email', title: 'Email', type: 'string'},
        {name: 'address', title: 'Dirección', type: 'text', rows: 2},
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes Sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'platform', title: 'Plataforma', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),
  ],
})
