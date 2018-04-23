(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('set-open-graph')) :
  typeof define === 'function' && define.amd ? define(['set-open-graph'], factory) :
  (global.Meta = factory(global.openGraph));
}(this, (function (openGraph) { 'use strict';

  openGraph = openGraph && openGraph.hasOwnProperty('default') ? openGraph['default'] : openGraph;

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

  var Meta = function () {
    function Meta() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          titleTemplate = _ref.titleTemplate;

      classCallCheck(this, Meta);

      this.titleTemplate = titleTemplate;
    }

    Meta.prototype.set = function set$$1(meta, openGraph$$1) {
      meta = Object.assign({}, meta);
      openGraph$$1 = Object.assign({}, openGraph$$1);
      openGraph$$1.og = Object.assign({}, openGraph$$1.og);
      if (openGraph$$1.article) openGraph$$1.article = Object.assign({}, openGraph$$1.article);

      if (meta.title && !openGraph$$1.og.title) {
        openGraph$$1.og.title = meta.title;
      } else if (!meta.title && openGraph$$1.og.title) {
        meta.title = openGraph$$1.og.title;
      }

      if (meta.title && (meta.titleTemplate || this.titleTemplate)) {
        meta.title = (meta.titleTemplate || this.titleTemplate).replace('%s', meta.title);
      }

      if (meta.lastModified && openGraph$$1.article && !openGraph$$1.article.modified_time) {
        openGraph$$1.article.modified_time = meta.lastModified;
      } else if (!meta.lastModified && openGraph$$1.article && openGraph$$1.article.modified_time) {
        meta.lastModified = openGraph$$1.article.modified_time;
      }

      if (meta.description && !openGraph$$1.og.description) {
        openGraph$$1.og.description = meta.description;
      } else if (!meta.description && openGraph$$1.og.description) {
        meta.description = openGraph$$1.og.description;
      }

      if (!openGraph$$1.og.image && meta.image) {
        openGraph$$1.og.image = meta.image;
      }

      if (meta.keywords) {
        if (meta.keywords.constructor === String) meta.keywords = meta.keywords.split(/\s*,\s*/);
        if (openGraph$$1.article && !openGraph$$1.article.tag) openGraph$$1.article.tag = meta.keywords;else if (openGraph$$1.video && !openGraph$$1.video.tag) openGraph$$1.video.tag = meta.keywords;else if (openGraph$$1.book && !openGraph$$1.book.tag) openGraph$$1.book.tag = meta.keywords;
      } else {
        var tag = openGraph$$1.article && openGraph$$1.article.tag || openGraph$$1.video && openGraph$$1.video.tag || openGraph$$1.book && openGraph$$1.book.tag;

        if (tag) meta.keywords = tag;
      }

      if (meta.canonicalURL && !openGraph$$1.og.url) {
        openGraph$$1.og.url = meta.canonicalURL;
      } else if (!meta.canonicalURL && openGraph$$1.og.url) {
        meta.canonicalURL = openGraph$$1.og.url;
      }

      openGraph$$1.set(openGraph$$1);
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
      openGraph.clear();
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
