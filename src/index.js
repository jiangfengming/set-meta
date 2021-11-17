import OpenGraph from 'set-open-graph'

class Meta {
  constructor(defaults = {}) {
    this.lang = defaults.lang
    this.titleTemplate = defaults.titleTemplate
    this.openGraph = new OpenGraph(defaults.openGraph, defaults.customNS)
  }

  set(meta, openGraph, customNS) {
    meta = Object.assign({}, meta)
    openGraph = Object.assign({}, openGraph)
    openGraph.og = Object.assign({}, openGraph.og)

    if (openGraph.article) {
      openGraph.article = Object.assign({}, openGraph.article)
    }

    if (!meta.lang && this.lang) {
      meta.lang = this.lang
    }

    if (meta.title && !openGraph.og.title) {
      openGraph.og.title = meta.title
    } else if (!meta.title && openGraph.og.title) {
      meta.title = openGraph.og.title
    }

    if (meta.title && meta.titleTemplate !== null && (meta.titleTemplate || this.titleTemplate)) {
      meta.title = (meta.titleTemplate || this.titleTemplate).replace('%s', meta.title)
    }

    if (meta.description && !openGraph.og.description) {
      openGraph.og.description = meta.description
    } else if (!meta.description && openGraph.og.description) {
      meta.description = openGraph.og.description
    }

    if (!openGraph.og.image && meta.image) {
      openGraph.og.image = meta.image
    }

    if (meta.keywords) {
      if (meta.keywords.constructor === String) {
        meta.keywords = meta.keywords.split(/\s*,\s*/)
      }

      if (['article', 'video', 'book'].includes(openGraph.og.type) && !openGraph[openGraph.og.type]) {
        openGraph[openGraph.og.type] = {
          tag: meta.keywords
        }
      } else if (openGraph.article && !openGraph.article.tag) {
        openGraph.article.tag = meta.keywords
      } else if (openGraph.video && !openGraph.video.tag) {
        openGraph.video.tag = meta.keywords
      } else if (openGraph.book && !openGraph.book.tag) {
        openGraph.book.tag = meta.keywords
      }
    } else {
      const tag = openGraph.article && openGraph.article.tag ||
      openGraph.video && openGraph.video.tag ||
      openGraph.book && openGraph.book.tag

      if (tag) {
        meta.keywords = tag
      }
    }

    if (meta.canonicalURL && !openGraph.og.url) {
      openGraph.og.url = meta.canonicalURL
    } else if (!meta.canonicalURL && openGraph.og.url) {
      meta.canonicalURL = openGraph.og.url
    }

    this.openGraph.set(openGraph, customNS)
    this._clear()
    this._set(meta)
  }

  _set(meta) {
    if (meta.lang) {
      document.documentElement.lang = meta.lang
    }

    if (meta.title != null) {
      document.title = meta.title
      document.getElementsByTagName('title')[0].setAttribute('data-set-meta', '')
    }

    if (meta.author) {
      insertElem('meta', { name: 'author', content: meta.author })
    }

    if (meta.description) {
      insertElem('meta', { name: 'description', content: meta.description })
    }

    if (meta.keywords) {
      insertElem('meta', { name: 'keywords', content: meta.keywords.join() })
    }

    if (meta.canonicalURL) {
      insertElem('link', { rel: 'canonical', href: meta.canonicalURL })
    }

    if (meta.extraMeta) {
      meta.extraMeta.forEach(attrs => insertElem('meta', attrs))
    }

    if (meta.extraLinks) {
      meta.extraLinks.forEach(attrs => insertElem('link', attrs))
    }

    (meta.locales || []).concat(meta.media || [])
      .forEach(attrs =>
        insertElem('link', Object.assign({ rel: 'alternate' }, attrs))
      )
  }

  clear() {
    this.openGraph.clear()
    this._clear()
  }

  _clear() {
    const els = document.head.querySelectorAll('[data-set-meta]')
    els.forEach(el => el.parentNode.removeChild(el))
  }
}

function insertElem(tag, attrs) {
  const el = document.createElement(tag)
  el.setAttribute('data-set-meta', '')

  for (const name in attrs) {
    el.setAttribute(name, attrs[name])
  }

  document.querySelector('head').appendChild(el)
}

export default Meta
