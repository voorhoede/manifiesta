import languageTags from './language-tags'

export default {
  type: 'object',
  properties: {
    // https://www.w3.org/TR/appmanifest/#name-member
    name: {
      required: true,
      type: 'string'
    },
    // https://www.w3.org/TR/appmanifest/#short_name-member
    short_name: {
      required: true,
      type: 'string'
    },
    // https://www.w3.org/TR/appmanifest/#start_url-member
    start_url: {
      required: true,
      type: 'string'
    },
    // https://www.w3.org/TR/appmanifest/#icons-member
    icons: {
      required: true,
      type: 'array'
    },
    // https://www.w3.org/TR/appmanifest/#dir-member
    dir: {
      type: 'string',
      enum: ['auto', 'ltr', 'rtl']
    },
    // https://www.w3.org/TR/appmanifest/#lang-member
    lang: {
      type: 'string',
      enum: Object.keys(languageTags)
    },
    // https://www.w3.org/TR/appmanifest/#description-member
    description: {
      type: 'string'
    },
    // https://www.w3.org/TR/appmanifest/#scope-member
    scope: {
      type: 'string'
    },
    // https://www.w3.org/TR/appmanifest/#display-member
    display: {
      type: 'string',
      enum: ['fullscreen', 'standalone', 'minimal-ui', 'browser']
    },
    // https://www.w3.org/TR/appmanifest/#orientation-member
    orientation: {
      type: 'string',
      enum: ['any', 'natural', 'landscape', 'landscape-primary', 'landscape-secondary', 'portrait', 'portrait-primary', 'portrait-secondary']
    },
    // https://www.w3.org/TR/appmanifest/#serviceworker-member
    serviceworker: {
      type: 'object'
    },
    // https://www.w3.org/TR/appmanifest/#theme_color-member
    theme_color: {
      type: 'string'
    },
    // https://www.w3.org/TR/appmanifest/#related_applications-member
    related_applications: {
      type: 'array'
    },
    // https://www.w3.org/TR/appmanifest/#prefer_related_applications-member
    prefer_related_applications: {
      type: 'boolean'
    },
    // https://www.w3.org/TR/appmanifest/#background_color-member
    background_color: {
      type: 'string'
    },
    // https://www.w3.org/TR/appmanifest/#categories-member
    categories: {
      type: 'array'
    },
    // https://www.w3.org/TR/appmanifest/#screenshots-member
    screenshots: {
      type: 'array'
    },
    // https://www.w3.org/TR/appmanifest/#iarc_rating_id-member
    iarc_rating_id: {
      type: 'object'
    }
  }
}
