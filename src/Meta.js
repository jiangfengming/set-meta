import openGraphUtil from 'set-open-graph'

class Meta {
  constructor({ titleTemplate } = {}) {
    this.titleTemplate = titleTemplate
  }

  set(meta, openGraph) {
    meta = Object.assign({}, meta)
    openGraph = Object.assign({}, openGraph)
    openGraph.og = Object.assign({}, openGraph.og)
    if (openGraph.article) openGraph.article = Object.assign({}, openGraph.article)

    if (meta.title && !openGraph.og.title) {
      openGraph.og.title = meta.title
    } else if (!meta.title && openGraph.og.title) {
      meta.title = openGraph.og.title
    }

    if (meta.title && (meta.titleTemplate || this.titleTemplate)) {
      meta.title = (meta.titleTemplate || this.titleTemplate).replace('%s', meta.title)
    }

    if (meta.lastModified && openGraph.article && !openGraph.article.modified_time) {
      openGraph.article.modified_time = meta.lastModified
    } else if (!meta.lastModified && openGraph.article && openGraph.article.modified_time) {
      meta.lastModified = openGraph.article.modified_time
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
      if (meta.keywords.constructor === String) meta.keywords = meta.keywords.split(/\s*,\s*/)
      if (openGraph.article && !openGraph.article.tag) openGraph.article.tag = meta.keywords
      else if (openGraph.video && !openGraph.video.tag) openGraph.video.tag = meta.keywords
      else if (openGraph.book && !openGraph.book.tag) openGraph.book.tag = meta.keywords
    } else {
      const tag = openGraph.article && openGraph.article.tag
        || openGraph.video && openGraph.video.tag
        || openGraph.book && openGraph.book.tag

      if (tag) meta.keywords = tag
    }

    if (meta.canonicalURL && !openGraph.og.url) {
      openGraph.og.url = meta.canonicalURL
    } else if (!meta.canonicalURL && openGraph.og.url) {
      meta.canonicalURL = openGraph.og.url
    }

    openGraphUtil.set(openGraph)
    this._clear()
    this._set(meta)
  }

  _set(meta) {
    document.title = meta.title || ''

    if (meta.lastModified) {
      const date = new Date(meta.lastModified)
      if (!isNaN(date.getTime())) {
        insertElem('meta', { 'http-equiv': 'Last-Modified', content: date.toGMTString() })
      }
    }

    if (meta.author) insertElem('meta', { name: 'author', content: meta.author })
    if (meta.description) insertElem('meta', { name: 'description', content: meta.description })
    if (meta.keywords) insertElem('meta', { name: 'keywords', content: meta.keywords.join() })
    if (meta.canonicalURL) insertElem('link', { rel: 'canonical', href: meta.canonicalURL })

    for (const attrs of [...meta.locales || [], ...meta.media || []]) {
      insertElem('link', { rel: 'alternate', ...attrs })
    }
  }

  clear() {
    openGraphUtil.clear()
    this._clear()
  }

  _clear() {
    document.title = ''

    const els = document.querySelectorAll('meta[data-set-meta]')
    for (const el of els) {
      el.parentNode.removeChild(el)
    }
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
