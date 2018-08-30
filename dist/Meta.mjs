function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var trimLastPart = ['og:image:url', 'og:video:url', 'og:audio:url', 'og:locale:current', 'music:album:url', 'music:song:url', 'video:actor:url'];

var OpenGraph =
/*#__PURE__*/
function () {
  function OpenGraph(properties, customNS) {
    this.properties = properties;
    this.customNS = customNS;
  }

  var _proto = OpenGraph.prototype;

  _proto.set = function set(properties, customNS) {
    this.clear();
    var ns = ['og: http://ogp.me/ns#'];
    if (properties.fb) ns.push('fb: http://ogp.me/ns/fb#');
    var type = properties.og && properties.og.type;

    if (type && !type.includes(':')) {
      type = type.split('.')[0];
      ns.push(type + ": http://ogp.me/ns/" + type + "#");
    }

    if (customNS) ns = ns.concat(customNS);else if (this.customNS) ns = ns.concat(this.customNS);
    document.head.setAttribute('prefix', ns.join(' '));
    var meta = this.parse(properties);

    if (this.properties) {
      var exists = meta.map(function (m) {
        return m.property;
      });
      var defaultMeta = this.parse(this.properties).filter(function (m) {
        return !exists.includes(m.property);
      });
      if (defaultMeta.length) meta = meta.concat(defaultMeta);
    }

    for (var _iterator = meta, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var m = _ref;
      this.insertElem(m);
    }
  };

  _proto.clear = function clear() {
    document.head.removeAttribute('prefix');
    var els = document.head.querySelectorAll('meta[property]');

    for (var _iterator2 = els, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var el = _ref2;
      document.head.removeChild(el);
    }
  };

  _proto.parse = function parse(obj, prefix) {
    if (prefix === void 0) {
      prefix = '';
    }

    var result = [];

    for (var k in obj) {
      var v = obj[k];
      if (!v) continue;
      var property = prefix ? prefix + ':' + k : k;
      if (trimLastPart.includes(property)) property = prefix;

      if (v.constructor === Object) {
        result = result.concat(this.parse(v, property));
      } else if (v.constructor === Array) {
        for (var _iterator3 = v, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var item = _ref3;

          if (item.constructor === Object) {
            result = result.concat(this.parse(item, property));
          } else {
            result.push({
              property: property,
              content: item
            });
          }
        }
      } else {
        result.push({
          property: property,
          content: v
        });
      }
    }

    return result;
  };

  _proto.insertElem = function insertElem(attrs) {
    var meta = document.createElement('meta');

    for (var name in attrs) {
      meta.setAttribute(name, attrs[name]);
    }

    document.head.appendChild(meta);
  };

  return OpenGraph;
}();

var Meta =
/*#__PURE__*/
function () {
  function Meta(defaults) {
    if (defaults === void 0) {
      defaults = {};
    }

    this.titleTemplate = defaults.titleTemplate;
    this.openGraph = new OpenGraph(defaults.openGraph, defaults.customNS);
  }

  var _proto = Meta.prototype;

  _proto.set = function set(meta, openGraph, customNS) {
    meta = Object.assign({}, meta);
    openGraph = Object.assign({}, openGraph);
    openGraph.og = Object.assign({}, openGraph.og);
    if (openGraph.article) openGraph.article = Object.assign({}, openGraph.article);

    if (meta.title && !openGraph.og.title) {
      openGraph.og.title = meta.title;
    } else if (!meta.title && openGraph.og.title) {
      meta.title = openGraph.og.title;
    }

    if (meta.title && meta.titleTemplate !== null && (meta.titleTemplate || this.titleTemplate)) {
      meta.title = (meta.titleTemplate || this.titleTemplate).replace('%s', meta.title);
    }

    if (meta.description && !openGraph.og.description) {
      openGraph.og.description = meta.description;
    } else if (!meta.description && openGraph.og.description) {
      meta.description = openGraph.og.description;
    }

    if (!openGraph.og.image && meta.image) {
      openGraph.og.image = meta.image;
    }

    if (meta.keywords) {
      if (meta.keywords.constructor === String) {
        meta.keywords = meta.keywords.split(/\s*,\s*/);
      }

      if (['article', 'video', 'book'].includes(openGraph.og.type) && !openGraph[openGraph.og.type]) {
        openGraph[openGraph.og.type] = {
          tag: meta.keywords
        };
      } else if (openGraph.article && !openGraph.article.tag) {
        openGraph.article.tag = meta.keywords;
      } else if (openGraph.video && !openGraph.video.tag) {
        openGraph.video.tag = meta.keywords;
      } else if (openGraph.book && !openGraph.book.tag) {
        openGraph.book.tag = meta.keywords;
      }
    } else {
      var tag = openGraph.article && openGraph.article.tag || openGraph.video && openGraph.video.tag || openGraph.book && openGraph.book.tag;
      if (tag) meta.keywords = tag;
    }

    if (meta.canonicalURL && !openGraph.og.url) {
      openGraph.og.url = meta.canonicalURL;
    } else if (!meta.canonicalURL && openGraph.og.url) {
      meta.canonicalURL = openGraph.og.url;
    }

    this.openGraph.set(openGraph, customNS);

    this._clear();

    this._set(meta);
  };

  _proto._set = function _set$$1(meta) {
    if (meta.title != null) document.title = meta.title;
    if (meta.author) insertElem('meta', {
      name: 'author',
      content: meta.author
    });
    if (meta.description) insertElem('meta', {
      name: 'description',
      content: meta.description
    });
    if (meta.keywords) insertElem('meta', {
      name: 'keywords',
      content: meta.keywords.join()
    });
    if (meta.canonicalURL) insertElem('link', {
      rel: 'canonical',
      href: meta.canonicalURL
    });

    if (meta.extraMeta) {
      for (var _iterator = meta.extraMeta, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var attrs = _ref;
        insertElem('meta', attrs);
      }
    }

    var _arr = (meta.locales || []).concat(meta.media || []);

    for (var _i2 = 0; _i2 < _arr.length; _i2++) {
      var _attrs = _arr[_i2];
      insertElem('link', _extends({
        rel: 'alternate'
      }, _attrs));
    }
  };

  _proto.clear = function clear() {
    this.openGraph.clear();

    this._clear();
  };

  _proto._clear = function _clear() {
    document.title = '';
    var els = document.querySelectorAll('meta[data-set-meta]');

    for (var _iterator2 = els, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i3 >= _iterator2.length) break;
        _ref2 = _iterator2[_i3++];
      } else {
        _i3 = _iterator2.next();
        if (_i3.done) break;
        _ref2 = _i3.value;
      }

      var el = _ref2;
      el.parentNode.removeChild(el);
    }
  };

  return Meta;
}();

function insertElem(tag, attrs) {
  var el = document.createElement(tag);
  el.setAttribute('data-set-meta', '');

  for (var name in attrs) {
    el.setAttribute(name, attrs[name]);
  }

  document.querySelector('head').appendChild(el);
}

export default Meta;
