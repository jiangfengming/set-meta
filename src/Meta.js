import OpenGraph from 'set-open-graph'

class Meta {
  constructor({ titleTemplate, image } = {}) {
    this.titleTemplate = titleTemplate

    if (image) {
      this.image = image
      this.imageURL = image instanceof Array ? image[0].url : image
    }

    this.openGraph = new OpenGraph()
  }

  set(meta, openGraph) {
    meta = Object.assign({}, meta)
    openGraph = Object.assign({}, openGraph)
    openGraph.og = Object.assign({}, openGraph.og)

    if (meta.title && !openGraph.og.title) {
      openGraph.og.title = meta.title
    } else if (!meta.title && openGraph.og.title) {
      meta.title = openGraph.og.title
    }

    if (meta.title && (meta.titleTemplate || this.titleTemplate)) {
      meta.title = (meta.titleTemplate || this.titleTemplate).replace('%s', meta.title)
    }

    if (meta.description && !openGraph.og.description) {
      openGraph.og.description = meta.description
    } else if (!meta.description && openGraph.og.description) {
      meta.description = openGraph.og.description
    }

    if (meta.image && !openGraph.og.image) {
      openGraph.og.image = [{ url: meta.image }]
    } else if (!meta.image && openGraph.og.image) {
      meta.image = openGraph.og.image[0].url
    } else if (!meta.image && !openGraph.og.image && this.image) {
      meta.image = this.imageURL
      openGraph.og.image = this.image
    }

    if (meta.canonicalURL && !openGraph.og.url) {
      openGraph.og.url = meta.canonicalURL
    } else if (!meta.canonicalURL && openGraph.og.url) {
      meta.canonicalURL = openGraph.og.url
    }

    this.openGraph.set(openGraph)
    this._clear()
    this._set(meta)
  }

  _set(meta) {
    document.title = meta.title || ''
  }

  clear() {
    this.openGraph.clear()
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

export default Meta
