class Meta {
  constructor({ title, titleTemplate, image } = {}) {
    this.title = title
    this.titleTemplate = titleTemplate
    if (image) {
      this.image = image
      this.imageUrl = image instanceof Array ? image[0].url : image
    }
  }

  set(meta, openGraph) {
    meta = Object.assign({}, meta)
    openGraph = Object.assign({}, openGraph)
    openGraph.og = Object.assign({}, openGraph.og)

    if (!meta.title && openGraph.og.title) {
      meta.title = openGraph.og.title
    } else if (meta.title && !openGraph.og.title) {
      openGraph.og.title = meta.title
    }

    if (!meta.title && this.title) {
      meta.title = this.title
    } else if (meta.title && this.titleTemplate) {
      meta.title = meta.title.replace('%s', meta.title)
    }

    if (!meta.image && this.imageUrl) {
      meta.image = this.imageUrl
    }

    if (!openGraph.og.title && meta.title) openGraph.title = meta.title

    if ((!openGraph.og.image || !openGraph.og.image.length) && meta.image) {
      openGraph.og.image = [{ url: meta.image }]
    }

    if (!openGraph.og.description) openGraph.og.description = meta.description

    if (!openGraph.og.url && meta.canonical) openGraph.og.url = meta.canonical
  }

  clear() {
    const els = document.querySelectorAll('meta[data-set-meta]')
    for (const el of els) {
      el.parentNode.removeChild(el)
    }
  }
}

export default Meta
