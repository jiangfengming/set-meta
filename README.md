# set-meta

Setting html meta.

## Usage

```js
import Meta from 'set-meta'

const meta = new Meta({
  lang: 'en',
  titleTemplate: '%s - Company Name',
  openGraph: {
    og: {
      site_name: 'Company Name'
    }
  }
})

meta.set({
  // <html lang="...">
  lang: 'en',

  // <title>
  title: 'Separate URLs',

  // <meta name="author" content="...">
  author: 'The Author Name',
  description: 'In this configuration, each desktop URL has an equivalent different URL serving mobile-optimized content.',

  // shortcut of openGraph.og.image
  image: 'https://developers.google.com/_static/14b311b77e/images/share/devsite-google-blue.png',

  // <meta name="keywords" content="...">
  keywords: ['seo', 'mobile'],

  // <link rel="canonical" content="...">
  canonicalURL: 'https://developers.google.com/search/mobile-sites/mobile-seo/separate-urls',

  // <link rel="alternate" hreflang="..." href="...">
  locales: [
    {
      hreflang: 'en',
      href: 'https://developers.google.com/search/mobile-sites/mobile-seo/separate-urls'
    },
    {
      hreflang: 'ar',
      href: 'https://developers.google.com/search/mobile-sites/mobile-seo/separate-urls?hl=ar'
    },
    {
      hreflang: 'x-default',
      href: 'https://developers.google.com/search/mobile-sites/mobile-seo/separate-urls'
    }
  ],

  // <link rel="alternate" media="..." href="...">
  media: [
    {
      media: 'only screen and (max-width: 640px)',
      href: 'http://m.example.com/page-1'
    }
  ],

  // extra <meta> tags
  extraMeta: [
    { 'http-equiv': 'Status', content: '200' },
    { 'http-equiv': 'Last-Modified', content: 'Sun, 23 Jul 2017 13:30:37 GMT' }
  ]
},

// Open Graph
// See https://github.com/kasha-io/set-open-graph
{
  og: {
    type: 'video.movie',
    locale: {
      current: 'en_US',
      alternate: [
        'zh_CN',
        'ja_JP'
      ]
    },
  },

  video: {
    director: [
      'http://examples.opengraphprotocol.us/profile.html',
      'http://examples.opengraphprotocol.us/profile2.html'
    ],
    actor: [
      {
        url: 'http://examples.opengraphprotocol.us/profile.html',
        role: 'Role in Move'
      }
    ],
    writer: [
      'http://examples.opengraphprotocol.us/profile.html'
    ],
    series: 'http://www.imdb.com/title/tt1520211/',
    release_date: '1895-12-28',
    duration: '50',
    tag: [
      'La Ciotat',
      'train'
    ]
  }
})
```

## APIs

### new Meta({ lang, titleTemplate, openGraph, customNS })

Creating an instance.

Params:  
`lang`: Default `lang` attribute of `<html>`.  
`titleTemplate`: Template of document title. e.g., `'%s - Company Name'`, if you set the title to `'About'`, the document title would be `'About - Company Name'`.  
`openGraph`: Default open graph properties. See [set-open-graph](https://github.com/kasha-io/set-open-graph)  
`customNS`: Default custom namespace of open graph.

You can later change default options through properties:
* this.lang
* this.titleTamplate
* this.openGraph (OpenGraph object, see [set-open-graph](https://github.com/kasha-io/set-open-graph))

### meta.set(meta, openGraph, customNS)

Setting the document `<meta>` and `<link>`.

Params:  
`meta`: Meta properties. See usage example for supported meta.  
`openGraph` and `customNS`: See [set-open-graph](https://github.com/kasha-io/set-open-graph)

### meta.clear()

Removing the meta tags from document head.

## License
[MIT](LICENSE)
