(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Meta = factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var _extends = Object.assign || function (target) {
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

  // import OpenGraph from 'set-open-graph'

  var Meta = function () {
    function Meta() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          titleTemplate = _ref.titleTemplate,
          image = _ref.image;

      classCallCheck(this, Meta);

      this.titleTemplate = titleTemplate;

      if (image) {
        this.image = image;
        this.imageURL = image instanceof Array ? image[0].url : image;
      }

      // this.openGraph = new OpenGraph()
    }

    Meta.prototype.set = function set$$1(meta, openGraph) {
      meta = Object.assign({}, meta);
      openGraph = Object.assign({}, openGraph);
      openGraph.og = Object.assign({}, openGraph.og);
      if (openGraph.article) openGraph.article = Object.assign({}, openGraph.article);

      if (meta.title && !openGraph.og.title) {
        openGraph.og.title = meta.title;
      } else if (!meta.title && openGraph.og.title) {
        meta.title = openGraph.og.title;
      }

      if (meta.title && (meta.titleTemplate || this.titleTemplate)) {
        meta.title = (meta.titleTemplate || this.titleTemplate).replace('%s', meta.title);
      }

      if (meta.lastModified && openGraph.article && !openGraph.article.modified_time) {
        openGraph.article.modified_time = meta.lastModified;
      } else if (!meta.lastModified && openGraph.article && openGraph.article.modified_time) {
        meta.lastModified = openGraph.article.modified_time;
      }

      if (meta.description && !openGraph.og.description) {
        openGraph.og.description = meta.description;
      } else if (!meta.description && openGraph.og.description) {
        meta.description = openGraph.og.description;
      }

      if (!openGraph.og.image && (meta.image || this.image)) {
        openGraph.og.image = meta.image ? [{ url: meta.image }] : this.image;
      }

      if (meta.keywords) {
        if (meta.keywords.constructor === String) meta.keywords = meta.keywords.split(/\s*,\s*/);
        if (openGraph.article && !openGraph.article.tag) openGraph.article.tag = meta.keywords;else if (openGraph.video && !openGraph.video.tag) openGraph.video.tag = meta.keywords;else if (openGraph.book && !openGraph.book.tag) openGraph.book.tag = meta.keywords;
      } else {
        var tag = openGraph.article && openGraph.article.tag || openGraph.video && openGraph.video.tag || openGraph.book && openGraph.book.tag;

        if (tag) meta.keywords = tag;
      }

      if (meta.canonicalURL && !openGraph.og.url) {
        openGraph.og.url = meta.canonicalURL;
      } else if (!meta.canonicalURL && openGraph.og.url) {
        meta.canonicalURL = openGraph.og.url;
      }

      // this.openGraph.set(openGraph)
      this._clear();
      this._set(meta);
    };

    Meta.prototype._set = function _set(meta) {
      document.title = meta.title || '';

      if (meta.lastModified) {
        var date = new Date(meta.lastModified);
        if (!isNaN(date.getTime())) {
          insertElem('meta', { 'http-equiv': 'Last-Modified', content: date.toGMTString() });
        }
      }

      if (meta.author) insertElem('meta', { name: 'author', content: meta.author });
      if (meta.description) insertElem('meta', { name: 'description', content: meta.description });
      if (meta.keywords) insertElem('meta', { name: 'keywords', content: meta.keywords.join() });
      if (meta.canonicalURL) insertElem('link', { rel: 'canonical', href: meta.canonicalURL });

      var _arr = [].concat(meta.locales || [], meta.media || []);

      for (var _i = 0; _i < _arr.length; _i++) {
        var attrs = _arr[_i];
        insertElem('link', _extends({ rel: 'alternate' }, attrs));
      }
    };

    Meta.prototype.clear = function clear() {
      // this.openGraph.clear()
      this._clear();
    };

    Meta.prototype._clear = function _clear() {
      document.title = '';

      var els = document.querySelectorAll('meta[data-set-meta]');
      for (var _iterator = els, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
          if (_i2 >= _iterator.length) break;
          _ref2 = _iterator[_i2++];
        } else {
          _i2 = _iterator.next();
          if (_i2.done) break;
          _ref2 = _i2.value;
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

  return Meta;

})));
