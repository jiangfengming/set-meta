# set-meta

Setting html meta.

## Usage

```js
import Meta from 'set-meta'

const meta = new Meta({
  titleTemplate: '%s - Company Name',
  openGraph: {
    og: {
      site_name: 'Company Name'
    }
  }
})

meta.set({
  title: 'Separate URLs',
  lastModified: 'Sun, 23 Jul 2017 13:30:37 GMT',
  author: 'The Author Name',
  description: 'In this configuration, each desktop URL has an equivalent different URL serving mobile-optimized content.',
  image: 'https://developers.google.com/_static/14b311b77e/images/share/devsite-google-blue.png',
  keywords: ['seo', 'mobile'],
  canonicalURL: 'https://developers.google.com/search/mobile-sites/mobile-seo/separate-urls',
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
  media: [
    {
      media: 'only screen and (max-width: 640px)',
      href: 'http://m.example.com/page-1'
    }
  ]
}, {
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

### new Meta({ titleTemplate, openGraph, customNS })

Creating an instance.

Params:

`titleTemplate`: Template of document title. e.g., `'%s - Company Name'` if you set the title to `'About'`, the document title would be `'About - Company Name'`.  
`openGraph`: Default open graph properties. See [set-open-graph](https://github.com/fenivana/set-open-graph)  
`customNS`: Default custom namespace of open graph.

### meta.set(meta, openGraph, customNS)

Setting the document `<meta>` and `<link>`.

Params:

`meta`: Meta properties. See usage example for supported meta.  
`openGraph` and `customNS`: See [set-open-graph](https://github.com/fenivana/set-open-graph)


### meta.clear()

Removing the meta tags from document head.

## License
[MIT](LICENSE)
