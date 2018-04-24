(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Meta = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var openGraph = createCommonjsModule(function (module, exports) {
	(function (global, factory) {
	  if (typeof undefined === "function" && undefined.amd) {
	    undefined(['exports'], factory);
	  } else {
	    factory(exports);
	  }
	})(commonjsGlobal, function (exports) {

	  exports.__esModule = true;
	  exports.set = set;
	  exports.clear = clear;
	  var trimLastPart = ['og:image:url', 'og:video:url', 'og:audio:url', 'og:locale:current', 'music:album:url', 'music:song:url', 'video:actor:url'];

	  function parse(obj) {
	    var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

	    var result = [];

	    for (var k in obj) {
	      var v = obj[k];
	      if (!v) continue;

	      var property = prefix ? prefix + ':' + k : k;
	      if (trimLastPart.includes(property)) property = prefix;

	      if (v.constructor === Object) {
	        result = result.concat(parse(v, property));
	      } else if (v.constructor === Array) {
	        for (var _iterator = v, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	          var _ref;

	          if (_isArray) {
	            if (_i >= _iterator.length) break;
	            _ref = _iterator[_i++];
	          } else {
	            _i = _iterator.next();
	            if (_i.done) break;
	            _ref = _i.value;
	          }

	          var item = _ref;

	          if (item.constructor === Object) {
	            result = result.concat(parse(item, property));
	          } else {
	            result.push({ property: property, item: item });
	          }
	        }
	      } else {
	        result.push({ property: property, v: v });
	      }
	    }

	    return result;
	  }

	  function insertElem(attrs) {
	    var meta = document.createElement('meta');

	    for (var name in attrs) {
	      meta.setAttribute(name, attrs[name]);
	    }

	    document.head.appendChild(meta);
	  }

	  function set(openGraph, namespace) {
	    clear();

	    var ns = ['og: http://ogp.me/ns#'];
	    if (openGraph.fb) ns.push('fb: http://ogp.me/ns/fb#');

	    var type = openGraph.og && openGraph.og.type;
	    if (type && !type.includes(':')) {
	      type = type.split('.')[0];
	      ns.push(type + ': http://ogp.me/ns/' + type + '#');
	    }

	    if (namespace) ns = ns.concat(namespace);

	    document.head.setAttribute('prefix', ns.join(' '));

	    var meta = parse(openGraph);
	    for (var _iterator2 = meta, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var m = _ref2;
	      insertElem(m);
	    }
	  }

	  function clear() {
	    document.head.removeAttribute('prefix');
	    var els = document.head.querySelectorAll('meta[property]');
	    for (var _iterator3 = els, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
	      var _ref3;

	      if (_isArray3) {
	        if (_i3 >= _iterator3.length) break;
	        _ref3 = _iterator3[_i3++];
	      } else {
	        _i3 = _iterator3.next();
	        if (_i3.done) break;
	        _ref3 = _i3.value;
	      }

	      var el = _ref3;
	      document.head.removeChild(el);
	    }
	  }

	  exports.default = { set: set, clear: clear };
	});
	});

	var openGraphUtil = unwrapExports(openGraph);

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

	    openGraphUtil.set(openGraph$$1);
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
	    openGraphUtil.clear();
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
