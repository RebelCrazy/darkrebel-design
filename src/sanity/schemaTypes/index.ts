import { type SchemaTypeDefinition } from 'sanity'
import {postType} from './post'
import {projectType} from './project'
import {serviceType} from './service'
import {authorType} from './author'
import {siteSettingsType} from './siteSettings'

export const schemaTypes = [postType, projectType, serviceType, authorType, siteSettingsType]

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
