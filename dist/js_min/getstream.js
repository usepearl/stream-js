!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.stream = t())
    : (e.stream = t());
})(self, function () {
  return (() => {
    var e = {
        7757: (e, t, n) => {
          e.exports = n(5666);
        },
        9272: (e, t, n) => {
          'use strict';
          var r = n(723),
            i = [],
            s = [],
            o = r.makeRequestCallFromTimer(function () {
              if (s.length) throw s.shift();
            });
          function a(e) {
            var t;
            ((t = i.length ? i.pop() : new c()).task = e), r(t);
          }
          function c() {
            this.task = null;
          }
          (e.exports = a),
            (c.prototype.call = function () {
              try {
                this.task.call();
              } catch (e) {
                a.onerror ? a.onerror(e) : (s.push(e), o());
              } finally {
                (this.task = null), (i[i.length] = this);
              }
            });
        },
        723: (e, t, n) => {
          'use strict';
          function r(e) {
            s.length || i(), (s[s.length] = e);
          }
          e.exports = r;
          var i,
            s = [],
            o = 0;
          function a() {
            for (; o < s.length; ) {
              var e = o;
              if (((o += 1), s[e].call(), o > 1024)) {
                for (var t = 0, n = s.length - o; t < n; t++) s[t] = s[t + o];
                (s.length -= o), (o = 0);
              }
            }
            (s.length = 0), (o = 0);
          }
          var c,
            u,
            l,
            h = void 0 !== n.g ? n.g : self,
            f = h.MutationObserver || h.WebKitMutationObserver;
          function d(e) {
            return function () {
              var t = setTimeout(r, 0),
                n = setInterval(r, 50);
              function r() {
                clearTimeout(t), clearInterval(n), e();
              }
            };
          }
          'function' == typeof f
            ? ((c = 1),
              (u = new f(a)),
              (l = document.createTextNode('')),
              u.observe(l, { characterData: !0 }),
              (i = function () {
                (c = -c), (l.data = c);
              }))
            : (i = d(a)),
            (r.requestFlush = i),
            (r.makeRequestCallFromTimer = d);
        },
        9669: (e, t, n) => {
          e.exports = n(1609);
        },
        5448: (e, t, n) => {
          'use strict';
          var r = n(4867),
            i = n(6026),
            s = n(4372),
            o = n(5327),
            a = n(4097),
            c = n(4109),
            u = n(7985),
            l = n(5061),
            h = n(5655),
            f = n(5263);
          e.exports = function (e) {
            return new Promise(function (t, n) {
              var d,
                p = e.data,
                v = e.headers,
                y = e.responseType;
              function g() {
                e.cancelToken && e.cancelToken.unsubscribe(d), e.signal && e.signal.removeEventListener('abort', d);
              }
              r.isFormData(p) && delete v['Content-Type'];
              var m = new XMLHttpRequest();
              if (e.auth) {
                var _ = e.auth.username || '',
                  b = e.auth.password ? unescape(encodeURIComponent(e.auth.password)) : '';
                v.Authorization = 'Basic ' + btoa(_ + ':' + b);
              }
              var w = a(e.baseURL, e.url);
              function k() {
                if (m) {
                  var r = 'getAllResponseHeaders' in m ? c(m.getAllResponseHeaders()) : null,
                    s = {
                      data: y && 'text' !== y && 'json' !== y ? m.response : m.responseText,
                      status: m.status,
                      statusText: m.statusText,
                      headers: r,
                      config: e,
                      request: m,
                    };
                  i(
                    function (e) {
                      t(e), g();
                    },
                    function (e) {
                      n(e), g();
                    },
                    s,
                  ),
                    (m = null);
                }
              }
              if (
                (m.open(e.method.toUpperCase(), o(w, e.params, e.paramsSerializer), !0),
                (m.timeout = e.timeout),
                'onloadend' in m
                  ? (m.onloadend = k)
                  : (m.onreadystatechange = function () {
                      m &&
                        4 === m.readyState &&
                        (0 !== m.status || (m.responseURL && 0 === m.responseURL.indexOf('file:'))) &&
                        setTimeout(k);
                    }),
                (m.onabort = function () {
                  m && (n(l('Request aborted', e, 'ECONNABORTED', m)), (m = null));
                }),
                (m.onerror = function () {
                  n(l('Network Error', e, null, m)), (m = null);
                }),
                (m.ontimeout = function () {
                  var t = 'timeout of ' + e.timeout + 'ms exceeded',
                    r = e.transitional || h.transitional;
                  e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                    n(l(t, e, r.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED', m)),
                    (m = null);
                }),
                r.isStandardBrowserEnv())
              ) {
                var E = (e.withCredentials || u(w)) && e.xsrfCookieName ? s.read(e.xsrfCookieName) : void 0;
                E && (v[e.xsrfHeaderName] = E);
              }
              'setRequestHeader' in m &&
                r.forEach(v, function (e, t) {
                  void 0 === p && 'content-type' === t.toLowerCase() ? delete v[t] : m.setRequestHeader(t, e);
                }),
                r.isUndefined(e.withCredentials) || (m.withCredentials = !!e.withCredentials),
                y && 'json' !== y && (m.responseType = e.responseType),
                'function' == typeof e.onDownloadProgress && m.addEventListener('progress', e.onDownloadProgress),
                'function' == typeof e.onUploadProgress &&
                  m.upload &&
                  m.upload.addEventListener('progress', e.onUploadProgress),
                (e.cancelToken || e.signal) &&
                  ((d = function (e) {
                    m && (n(!e || (e && e.type) ? new f('canceled') : e), m.abort(), (m = null));
                  }),
                  e.cancelToken && e.cancelToken.subscribe(d),
                  e.signal && (e.signal.aborted ? d() : e.signal.addEventListener('abort', d))),
                p || (p = null),
                m.send(p);
            });
          };
        },
        1609: (e, t, n) => {
          'use strict';
          var r = n(4867),
            i = n(1849),
            s = n(321),
            o = n(7185),
            a = (function e(t) {
              var n = new s(t),
                a = i(s.prototype.request, n);
              return (
                r.extend(a, s.prototype, n),
                r.extend(a, n),
                (a.create = function (n) {
                  return e(o(t, n));
                }),
                a
              );
            })(n(5655));
          (a.Axios = s),
            (a.Cancel = n(5263)),
            (a.CancelToken = n(4972)),
            (a.isCancel = n(6502)),
            (a.VERSION = n(7288).version),
            (a.all = function (e) {
              return Promise.all(e);
            }),
            (a.spread = n(8713)),
            (a.isAxiosError = n(6268)),
            (e.exports = a),
            (e.exports.default = a);
        },
        5263: (e) => {
          'use strict';
          function t(e) {
            this.message = e;
          }
          (t.prototype.toString = function () {
            return 'Cancel' + (this.message ? ': ' + this.message : '');
          }),
            (t.prototype.__CANCEL__ = !0),
            (e.exports = t);
        },
        4972: (e, t, n) => {
          'use strict';
          var r = n(5263);
          function i(e) {
            if ('function' != typeof e) throw new TypeError('executor must be a function.');
            var t;
            this.promise = new Promise(function (e) {
              t = e;
            });
            var n = this;
            this.promise.then(function (e) {
              if (n._listeners) {
                var t,
                  r = n._listeners.length;
                for (t = 0; t < r; t++) n._listeners[t](e);
                n._listeners = null;
              }
            }),
              (this.promise.then = function (e) {
                var t,
                  r = new Promise(function (e) {
                    n.subscribe(e), (t = e);
                  }).then(e);
                return (
                  (r.cancel = function () {
                    n.unsubscribe(t);
                  }),
                  r
                );
              }),
              e(function (e) {
                n.reason || ((n.reason = new r(e)), t(n.reason));
              });
          }
          (i.prototype.throwIfRequested = function () {
            if (this.reason) throw this.reason;
          }),
            (i.prototype.subscribe = function (e) {
              this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : (this._listeners = [e]);
            }),
            (i.prototype.unsubscribe = function (e) {
              if (this._listeners) {
                var t = this._listeners.indexOf(e);
                -1 !== t && this._listeners.splice(t, 1);
              }
            }),
            (i.source = function () {
              var e;
              return {
                token: new i(function (t) {
                  e = t;
                }),
                cancel: e,
              };
            }),
            (e.exports = i);
        },
        6502: (e) => {
          'use strict';
          e.exports = function (e) {
            return !(!e || !e.__CANCEL__);
          };
        },
        321: (e, t, n) => {
          'use strict';
          var r = n(4867),
            i = n(5327),
            s = n(782),
            o = n(3572),
            a = n(7185),
            c = n(4875),
            u = c.validators;
          function l(e) {
            (this.defaults = e), (this.interceptors = { request: new s(), response: new s() });
          }
          (l.prototype.request = function (e) {
            'string' == typeof e ? ((e = arguments[1] || {}).url = arguments[0]) : (e = e || {}),
              (e = a(this.defaults, e)).method
                ? (e.method = e.method.toLowerCase())
                : this.defaults.method
                ? (e.method = this.defaults.method.toLowerCase())
                : (e.method = 'get');
            var t = e.transitional;
            void 0 !== t &&
              c.assertOptions(
                t,
                {
                  silentJSONParsing: u.transitional(u.boolean),
                  forcedJSONParsing: u.transitional(u.boolean),
                  clarifyTimeoutError: u.transitional(u.boolean),
                },
                !1,
              );
            var n = [],
              r = !0;
            this.interceptors.request.forEach(function (t) {
              ('function' == typeof t.runWhen && !1 === t.runWhen(e)) ||
                ((r = r && t.synchronous), n.unshift(t.fulfilled, t.rejected));
            });
            var i,
              s = [];
            if (
              (this.interceptors.response.forEach(function (e) {
                s.push(e.fulfilled, e.rejected);
              }),
              !r)
            ) {
              var l = [o, void 0];
              for (Array.prototype.unshift.apply(l, n), l = l.concat(s), i = Promise.resolve(e); l.length; )
                i = i.then(l.shift(), l.shift());
              return i;
            }
            for (var h = e; n.length; ) {
              var f = n.shift(),
                d = n.shift();
              try {
                h = f(h);
              } catch (e) {
                d(e);
                break;
              }
            }
            try {
              i = o(h);
            } catch (e) {
              return Promise.reject(e);
            }
            for (; s.length; ) i = i.then(s.shift(), s.shift());
            return i;
          }),
            (l.prototype.getUri = function (e) {
              return (e = a(this.defaults, e)), i(e.url, e.params, e.paramsSerializer).replace(/^\?/, '');
            }),
            r.forEach(['delete', 'get', 'head', 'options'], function (e) {
              l.prototype[e] = function (t, n) {
                return this.request(a(n || {}, { method: e, url: t, data: (n || {}).data }));
              };
            }),
            r.forEach(['post', 'put', 'patch'], function (e) {
              l.prototype[e] = function (t, n, r) {
                return this.request(a(r || {}, { method: e, url: t, data: n }));
              };
            }),
            (e.exports = l);
        },
        782: (e, t, n) => {
          'use strict';
          var r = n(4867);
          function i() {
            this.handlers = [];
          }
          (i.prototype.use = function (e, t, n) {
            return (
              this.handlers.push({
                fulfilled: e,
                rejected: t,
                synchronous: !!n && n.synchronous,
                runWhen: n ? n.runWhen : null,
              }),
              this.handlers.length - 1
            );
          }),
            (i.prototype.eject = function (e) {
              this.handlers[e] && (this.handlers[e] = null);
            }),
            (i.prototype.forEach = function (e) {
              r.forEach(this.handlers, function (t) {
                null !== t && e(t);
              });
            }),
            (e.exports = i);
        },
        4097: (e, t, n) => {
          'use strict';
          var r = n(1793),
            i = n(7303);
          e.exports = function (e, t) {
            return e && !r(t) ? i(e, t) : t;
          };
        },
        5061: (e, t, n) => {
          'use strict';
          var r = n(481);
          e.exports = function (e, t, n, i, s) {
            var o = new Error(e);
            return r(o, t, n, i, s);
          };
        },
        3572: (e, t, n) => {
          'use strict';
          var r = n(4867),
            i = n(8527),
            s = n(6502),
            o = n(5655),
            a = n(5263);
          function c(e) {
            if ((e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted))
              throw new a('canceled');
          }
          e.exports = function (e) {
            return (
              c(e),
              (e.headers = e.headers || {}),
              (e.data = i.call(e, e.data, e.headers, e.transformRequest)),
              (e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers)),
              r.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function (t) {
                delete e.headers[t];
              }),
              (e.adapter || o.adapter)(e).then(
                function (t) {
                  return c(e), (t.data = i.call(e, t.data, t.headers, e.transformResponse)), t;
                },
                function (t) {
                  return (
                    s(t) ||
                      (c(e),
                      t &&
                        t.response &&
                        (t.response.data = i.call(e, t.response.data, t.response.headers, e.transformResponse))),
                    Promise.reject(t)
                  );
                },
              )
            );
          };
        },
        481: (e) => {
          'use strict';
          e.exports = function (e, t, n, r, i) {
            return (
              (e.config = t),
              n && (e.code = n),
              (e.request = r),
              (e.response = i),
              (e.isAxiosError = !0),
              (e.toJSON = function () {
                return {
                  message: this.message,
                  name: this.name,
                  description: this.description,
                  number: this.number,
                  fileName: this.fileName,
                  lineNumber: this.lineNumber,
                  columnNumber: this.columnNumber,
                  stack: this.stack,
                  config: this.config,
                  code: this.code,
                  status: this.response && this.response.status ? this.response.status : null,
                };
              }),
              e
            );
          };
        },
        7185: (e, t, n) => {
          'use strict';
          var r = n(4867);
          e.exports = function (e, t) {
            t = t || {};
            var n = {};
            function i(e, t) {
              return r.isPlainObject(e) && r.isPlainObject(t)
                ? r.merge(e, t)
                : r.isPlainObject(t)
                ? r.merge({}, t)
                : r.isArray(t)
                ? t.slice()
                : t;
            }
            function s(n) {
              return r.isUndefined(t[n]) ? (r.isUndefined(e[n]) ? void 0 : i(void 0, e[n])) : i(e[n], t[n]);
            }
            function o(e) {
              if (!r.isUndefined(t[e])) return i(void 0, t[e]);
            }
            function a(n) {
              return r.isUndefined(t[n]) ? (r.isUndefined(e[n]) ? void 0 : i(void 0, e[n])) : i(void 0, t[n]);
            }
            function c(n) {
              return n in t ? i(e[n], t[n]) : n in e ? i(void 0, e[n]) : void 0;
            }
            var u = {
              url: o,
              method: o,
              data: o,
              baseURL: a,
              transformRequest: a,
              transformResponse: a,
              paramsSerializer: a,
              timeout: a,
              timeoutMessage: a,
              withCredentials: a,
              adapter: a,
              responseType: a,
              xsrfCookieName: a,
              xsrfHeaderName: a,
              onUploadProgress: a,
              onDownloadProgress: a,
              decompress: a,
              maxContentLength: a,
              maxBodyLength: a,
              transport: a,
              httpAgent: a,
              httpsAgent: a,
              cancelToken: a,
              socketPath: a,
              responseEncoding: a,
              validateStatus: c,
            };
            return (
              r.forEach(Object.keys(e).concat(Object.keys(t)), function (e) {
                var t = u[e] || s,
                  i = t(e);
                (r.isUndefined(i) && t !== c) || (n[e] = i);
              }),
              n
            );
          };
        },
        6026: (e, t, n) => {
          'use strict';
          var r = n(5061);
          e.exports = function (e, t, n) {
            var i = n.config.validateStatus;
            n.status && i && !i(n.status)
              ? t(r('Request failed with status code ' + n.status, n.config, null, n.request, n))
              : e(n);
          };
        },
        8527: (e, t, n) => {
          'use strict';
          var r = n(4867),
            i = n(5655);
          e.exports = function (e, t, n) {
            var s = this || i;
            return (
              r.forEach(n, function (n) {
                e = n.call(s, e, t);
              }),
              e
            );
          };
        },
        5655: (e, t, n) => {
          'use strict';
          var r = n(4867),
            i = n(6016),
            s = n(481),
            o = { 'Content-Type': 'application/x-www-form-urlencoded' };
          function a(e, t) {
            !r.isUndefined(e) && r.isUndefined(e['Content-Type']) && (e['Content-Type'] = t);
          }
          var c,
            u = {
              transitional: { silentJSONParsing: !0, forcedJSONParsing: !0, clarifyTimeoutError: !1 },
              adapter:
                (('undefined' != typeof XMLHttpRequest ||
                  ('undefined' != typeof process && '[object process]' === Object.prototype.toString.call(process))) &&
                  (c = n(5448)),
                c),
              transformRequest: [
                function (e, t) {
                  return (
                    i(t, 'Accept'),
                    i(t, 'Content-Type'),
                    r.isFormData(e) ||
                    r.isArrayBuffer(e) ||
                    r.isBuffer(e) ||
                    r.isStream(e) ||
                    r.isFile(e) ||
                    r.isBlob(e)
                      ? e
                      : r.isArrayBufferView(e)
                      ? e.buffer
                      : r.isURLSearchParams(e)
                      ? (a(t, 'application/x-www-form-urlencoded;charset=utf-8'), e.toString())
                      : r.isObject(e) || (t && 'application/json' === t['Content-Type'])
                      ? (a(t, 'application/json'),
                        (function (e, t, n) {
                          if (r.isString(e))
                            try {
                              return (0, JSON.parse)(e), r.trim(e);
                            } catch (e) {
                              if ('SyntaxError' !== e.name) throw e;
                            }
                          return (0, JSON.stringify)(e);
                        })(e))
                      : e
                  );
                },
              ],
              transformResponse: [
                function (e) {
                  var t = this.transitional || u.transitional,
                    n = t && t.silentJSONParsing,
                    i = t && t.forcedJSONParsing,
                    o = !n && 'json' === this.responseType;
                  if (o || (i && r.isString(e) && e.length))
                    try {
                      return JSON.parse(e);
                    } catch (e) {
                      if (o) {
                        if ('SyntaxError' === e.name) throw s(e, this, 'E_JSON_PARSE');
                        throw e;
                      }
                    }
                  return e;
                },
              ],
              timeout: 0,
              xsrfCookieName: 'XSRF-TOKEN',
              xsrfHeaderName: 'X-XSRF-TOKEN',
              maxContentLength: -1,
              maxBodyLength: -1,
              validateStatus: function (e) {
                return e >= 200 && e < 300;
              },
              headers: { common: { Accept: 'application/json, text/plain, */*' } },
            };
          r.forEach(['delete', 'get', 'head'], function (e) {
            u.headers[e] = {};
          }),
            r.forEach(['post', 'put', 'patch'], function (e) {
              u.headers[e] = r.merge(o);
            }),
            (e.exports = u);
        },
        7288: (e) => {
          e.exports = { version: '0.22.0' };
        },
        1849: (e) => {
          'use strict';
          e.exports = function (e, t) {
            return function () {
              for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
              return e.apply(t, n);
            };
          };
        },
        5327: (e, t, n) => {
          'use strict';
          var r = n(4867);
          function i(e) {
            return encodeURIComponent(e)
              .replace(/%3A/gi, ':')
              .replace(/%24/g, '$')
              .replace(/%2C/gi, ',')
              .replace(/%20/g, '+')
              .replace(/%5B/gi, '[')
              .replace(/%5D/gi, ']');
          }
          e.exports = function (e, t, n) {
            if (!t) return e;
            var s;
            if (n) s = n(t);
            else if (r.isURLSearchParams(t)) s = t.toString();
            else {
              var o = [];
              r.forEach(t, function (e, t) {
                null != e &&
                  (r.isArray(e) ? (t += '[]') : (e = [e]),
                  r.forEach(e, function (e) {
                    r.isDate(e) ? (e = e.toISOString()) : r.isObject(e) && (e = JSON.stringify(e)),
                      o.push(i(t) + '=' + i(e));
                  }));
              }),
                (s = o.join('&'));
            }
            if (s) {
              var a = e.indexOf('#');
              -1 !== a && (e = e.slice(0, a)), (e += (-1 === e.indexOf('?') ? '?' : '&') + s);
            }
            return e;
          };
        },
        7303: (e) => {
          'use strict';
          e.exports = function (e, t) {
            return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
          };
        },
        4372: (e, t, n) => {
          'use strict';
          var r = n(4867);
          e.exports = r.isStandardBrowserEnv()
            ? {
                write: function (e, t, n, i, s, o) {
                  var a = [];
                  a.push(e + '=' + encodeURIComponent(t)),
                    r.isNumber(n) && a.push('expires=' + new Date(n).toGMTString()),
                    r.isString(i) && a.push('path=' + i),
                    r.isString(s) && a.push('domain=' + s),
                    !0 === o && a.push('secure'),
                    (document.cookie = a.join('; '));
                },
                read: function (e) {
                  var t = document.cookie.match(new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'));
                  return t ? decodeURIComponent(t[3]) : null;
                },
                remove: function (e) {
                  this.write(e, '', Date.now() - 864e5);
                },
              }
            : {
                write: function () {},
                read: function () {
                  return null;
                },
                remove: function () {},
              };
        },
        1793: (e) => {
          'use strict';
          e.exports = function (e) {
            return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
          };
        },
        6268: (e) => {
          'use strict';
          e.exports = function (e) {
            return 'object' == typeof e && !0 === e.isAxiosError;
          };
        },
        7985: (e, t, n) => {
          'use strict';
          var r = n(4867);
          e.exports = r.isStandardBrowserEnv()
            ? (function () {
                var e,
                  t = /(msie|trident)/i.test(navigator.userAgent),
                  n = document.createElement('a');
                function i(e) {
                  var r = e;
                  return (
                    t && (n.setAttribute('href', r), (r = n.href)),
                    n.setAttribute('href', r),
                    {
                      href: n.href,
                      protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                      host: n.host,
                      search: n.search ? n.search.replace(/^\?/, '') : '',
                      hash: n.hash ? n.hash.replace(/^#/, '') : '',
                      hostname: n.hostname,
                      port: n.port,
                      pathname: '/' === n.pathname.charAt(0) ? n.pathname : '/' + n.pathname,
                    }
                  );
                }
                return (
                  (e = i(window.location.href)),
                  function (t) {
                    var n = r.isString(t) ? i(t) : t;
                    return n.protocol === e.protocol && n.host === e.host;
                  }
                );
              })()
            : function () {
                return !0;
              };
        },
        6016: (e, t, n) => {
          'use strict';
          var r = n(4867);
          e.exports = function (e, t) {
            r.forEach(e, function (n, r) {
              r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = n), delete e[r]);
            });
          };
        },
        4109: (e, t, n) => {
          'use strict';
          var r = n(4867),
            i = [
              'age',
              'authorization',
              'content-length',
              'content-type',
              'etag',
              'expires',
              'from',
              'host',
              'if-modified-since',
              'if-unmodified-since',
              'last-modified',
              'location',
              'max-forwards',
              'proxy-authorization',
              'referer',
              'retry-after',
              'user-agent',
            ];
          e.exports = function (e) {
            var t,
              n,
              s,
              o = {};
            return e
              ? (r.forEach(e.split('\n'), function (e) {
                  if (
                    ((s = e.indexOf(':')), (t = r.trim(e.substr(0, s)).toLowerCase()), (n = r.trim(e.substr(s + 1))), t)
                  ) {
                    if (o[t] && i.indexOf(t) >= 0) return;
                    o[t] = 'set-cookie' === t ? (o[t] ? o[t] : []).concat([n]) : o[t] ? o[t] + ', ' + n : n;
                  }
                }),
                o)
              : o;
          };
        },
        8713: (e) => {
          'use strict';
          e.exports = function (e) {
            return function (t) {
              return e.apply(null, t);
            };
          };
        },
        4875: (e, t, n) => {
          'use strict';
          var r = n(7288).version,
            i = {};
          ['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (e, t) {
            i[e] = function (n) {
              return typeof n === e || 'a' + (t < 1 ? 'n ' : ' ') + e;
            };
          });
          var s = {};
          (i.transitional = function (e, t, n) {
            function i(e, t) {
              return '[Axios v' + r + "] Transitional option '" + e + "'" + t + (n ? '. ' + n : '');
            }
            return function (n, r, o) {
              if (!1 === e) throw new Error(i(r, ' has been removed' + (t ? ' in ' + t : '')));
              return (
                t &&
                  !s[r] &&
                  ((s[r] = !0),
                  console.warn(i(r, ' has been deprecated since v' + t + ' and will be removed in the near future'))),
                !e || e(n, r, o)
              );
            };
          }),
            (e.exports = {
              assertOptions: function (e, t, n) {
                if ('object' != typeof e) throw new TypeError('options must be an object');
                for (var r = Object.keys(e), i = r.length; i-- > 0; ) {
                  var s = r[i],
                    o = t[s];
                  if (o) {
                    var a = e[s],
                      c = void 0 === a || o(a, s, e);
                    if (!0 !== c) throw new TypeError('option ' + s + ' must be ' + c);
                  } else if (!0 !== n) throw Error('Unknown option ' + s);
                }
              },
              validators: i,
            });
        },
        4867: (e, t, n) => {
          'use strict';
          var r = n(1849),
            i = Object.prototype.toString;
          function s(e) {
            return '[object Array]' === i.call(e);
          }
          function o(e) {
            return void 0 === e;
          }
          function a(e) {
            return null !== e && 'object' == typeof e;
          }
          function c(e) {
            if ('[object Object]' !== i.call(e)) return !1;
            var t = Object.getPrototypeOf(e);
            return null === t || t === Object.prototype;
          }
          function u(e) {
            return '[object Function]' === i.call(e);
          }
          function l(e, t) {
            if (null != e)
              if (('object' != typeof e && (e = [e]), s(e)))
                for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
              else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e);
          }
          e.exports = {
            isArray: s,
            isArrayBuffer: function (e) {
              return '[object ArrayBuffer]' === i.call(e);
            },
            isBuffer: function (e) {
              return (
                null !== e &&
                !o(e) &&
                null !== e.constructor &&
                !o(e.constructor) &&
                'function' == typeof e.constructor.isBuffer &&
                e.constructor.isBuffer(e)
              );
            },
            isFormData: function (e) {
              return 'undefined' != typeof FormData && e instanceof FormData;
            },
            isArrayBufferView: function (e) {
              return 'undefined' != typeof ArrayBuffer && ArrayBuffer.isView
                ? ArrayBuffer.isView(e)
                : e && e.buffer && e.buffer instanceof ArrayBuffer;
            },
            isString: function (e) {
              return 'string' == typeof e;
            },
            isNumber: function (e) {
              return 'number' == typeof e;
            },
            isObject: a,
            isPlainObject: c,
            isUndefined: o,
            isDate: function (e) {
              return '[object Date]' === i.call(e);
            },
            isFile: function (e) {
              return '[object File]' === i.call(e);
            },
            isBlob: function (e) {
              return '[object Blob]' === i.call(e);
            },
            isFunction: u,
            isStream: function (e) {
              return a(e) && u(e.pipe);
            },
            isURLSearchParams: function (e) {
              return 'undefined' != typeof URLSearchParams && e instanceof URLSearchParams;
            },
            isStandardBrowserEnv: function () {
              return (
                ('undefined' == typeof navigator ||
                  ('ReactNative' !== navigator.product &&
                    'NativeScript' !== navigator.product &&
                    'NS' !== navigator.product)) &&
                'undefined' != typeof window &&
                'undefined' != typeof document
              );
            },
            forEach: l,
            merge: function e() {
              var t = {};
              function n(n, r) {
                c(t[r]) && c(n)
                  ? (t[r] = e(t[r], n))
                  : c(n)
                  ? (t[r] = e({}, n))
                  : s(n)
                  ? (t[r] = n.slice())
                  : (t[r] = n);
              }
              for (var r = 0, i = arguments.length; r < i; r++) l(arguments[r], n);
              return t;
            },
            extend: function (e, t, n) {
              return (
                l(t, function (t, i) {
                  e[i] = n && 'function' == typeof t ? r(t, n) : t;
                }),
                e
              );
            },
            trim: function (e) {
              return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, '');
            },
            stripBOM: function (e) {
              return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
            },
          };
        },
        6663: (e, t, n) => {
          'use strict';
          n.d(t, { n: () => F });
          var r = n(8152),
            i = n(4925),
            s = n(5861),
            o = n(5671),
            a = n(3144),
            c = n(4942),
            u = n(7757),
            l = n.n(u),
            h = n(9669),
            f = n.n(h),
            d = n(2965),
            p = n(8058),
            v = n(5697);
          function y(e) {
            this.message = e;
          }
          (y.prototype = new Error()), (y.prototype.name = 'InvalidCharacterError');
          var g =
            ('undefined' != typeof window && window.atob && window.atob.bind(window)) ||
            function (e) {
              var t = String(e).replace(/=+$/, '');
              if (t.length % 4 == 1) throw new y("'atob' failed: The string to be decoded is not correctly encoded.");
              for (
                var n, r, i = 0, s = 0, o = '';
                (r = t.charAt(s++));
                ~r && ((n = i % 4 ? 64 * n + r : r), i++ % 4)
                  ? (o += String.fromCharCode(255 & (n >> ((-2 * i) & 6))))
                  : 0
              )
                r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(r);
              return o;
            };
          function m(e) {
            var t = e.replace(/-/g, '+').replace(/_/g, '/');
            switch (t.length % 4) {
              case 0:
                break;
              case 2:
                t += '==';
                break;
              case 3:
                t += '=';
                break;
              default:
                throw 'Illegal base64url string!';
            }
            try {
              return (function (e) {
                return decodeURIComponent(
                  g(e).replace(/(.)/g, function (e, t) {
                    var n = t.charCodeAt(0).toString(16).toUpperCase();
                    return n.length < 2 && (n = '0' + n), '%' + n;
                  }),
                );
              })(t);
            } catch (e) {
              return g(t);
            }
          }
          function _(e) {
            this.message = e;
          }
          (_.prototype = new Error()), (_.prototype.name = 'InvalidTokenError');
          const b = function (e, t) {
            if ('string' != typeof e) throw new _('Invalid token specified');
            var n = !0 === (t = t || {}).header ? 0 : 1;
            try {
              return JSON.parse(m(e.split('.')[n]));
            } catch (e) {
              throw new _('Invalid token specified: ' + e.message);
            }
          };
          var w = n(8039),
            k = n(3709),
            E = n(448),
            x = n(9082),
            O = n(8824),
            T = n(7878),
            S = n(6685),
            C = n(2589),
            A = n(2637),
            j = n(6793),
            N = n.n(j),
            I = n(7496),
            R = n.n(I),
            U = n(7248),
            Z = ['method', 'token'],
            P = ['ids', 'foreignIDTimes'],
            D = ['activities'];
          function L(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(e);
              t &&
                (r = r.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                n.push.apply(n, r);
            }
            return n;
          }
          function q(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? L(Object(n), !0).forEach(function (t) {
                    (0, c.Z)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : L(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
            }
            return e;
          }
          var M = n(4147),
            F = (function () {
              function e(t, n, r) {
                var i,
                  a,
                  u = this,
                  h = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
                if (
                  ((0, o.Z)(this, e),
                  (0, c.Z)(this, 'baseUrl', void 0),
                  (0, c.Z)(this, 'baseAnalyticsUrl', void 0),
                  (0, c.Z)(this, 'apiKey', void 0),
                  (0, c.Z)(this, 'appId', void 0),
                  (0, c.Z)(this, 'usingApiSecret', void 0),
                  (0, c.Z)(this, 'apiSecret', void 0),
                  (0, c.Z)(this, 'userToken', void 0),
                  (0, c.Z)(this, 'enrichByDefault', void 0),
                  (0, c.Z)(this, 'options', void 0),
                  (0, c.Z)(this, 'userId', void 0),
                  (0, c.Z)(this, 'authPayload', void 0),
                  (0, c.Z)(this, 'version', void 0),
                  (0, c.Z)(this, 'fayeUrl', void 0),
                  (0, c.Z)(this, 'group', void 0),
                  (0, c.Z)(this, 'expireTokens', void 0),
                  (0, c.Z)(this, 'location', void 0),
                  (0, c.Z)(this, 'fayeClient', void 0),
                  (0, c.Z)(this, 'browser', void 0),
                  (0, c.Z)(this, 'node', void 0),
                  (0, c.Z)(this, 'nodeOptions', void 0),
                  (0, c.Z)(this, 'request', void 0),
                  (0, c.Z)(this, 'subscriptions', void 0),
                  (0, c.Z)(this, 'handlers', void 0),
                  (0, c.Z)(this, 'currentUser', void 0),
                  (0, c.Z)(this, 'personalization', void 0),
                  (0, c.Z)(this, 'collections', void 0),
                  (0, c.Z)(this, 'files', void 0),
                  (0, c.Z)(this, 'images', void 0),
                  (0, c.Z)(this, 'reactions', void 0),
                  (0, c.Z)(this, '_personalizationToken', void 0),
                  (0, c.Z)(this, '_collectionsToken', void 0),
                  (0, c.Z)(this, '_getOrCreateToken', void 0),
                  (0, c.Z)(this, 'addToMany', void 0),
                  (0, c.Z)(this, 'followMany', void 0),
                  (0, c.Z)(this, 'unfollowMany', void 0),
                  (0, c.Z)(this, 'createRedirectUrl', void 0),
                  (0, c.Z)(this, 'replaceReactionOptions', function (e) {
                    null != e &&
                      e.reactions &&
                      (null != e.reactions.own && (e.withOwnReactions = e.reactions.own),
                      null != e.reactions.recent && (e.withRecentReactions = e.reactions.recent),
                      null != e.reactions.counts && (e.withReactionCounts = e.reactions.counts),
                      null != e.reactions.own_children && (e.withOwnChildren = e.reactions.own_children),
                      delete e.reactions);
                  }),
                  (0, c.Z)(this, 'handleResponse', function (e) {
                    if (/^2/.test(''.concat(e.status))) return u.send('response', null, e, e.data), e.data;
                    throw new C.eY(
                      ''.concat(JSON.stringify(e.data), ' with HTTP status code ').concat(e.status),
                      e.data,
                      e,
                    );
                  }),
                  (0, c.Z)(
                    this,
                    'doAxiosRequest',
                    (function () {
                      var e = (0, s.Z)(
                        l().mark(function e(t, n) {
                          var r, i;
                          return l().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      u.send('request', t, n),
                                      (e.prev = 1),
                                      (e.next = 4),
                                      u.request(u.enrichKwargs(q({ method: t }, n)))
                                    );
                                  case 4:
                                    return (r = e.sent), e.abrupt('return', u.handleResponse(r));
                                  case 8:
                                    if (((e.prev = 8), (e.t0 = e.catch(1)), !(i = e.t0).response)) {
                                      e.next = 13;
                                      break;
                                    }
                                    return e.abrupt('return', u.handleResponse(i.response));
                                  case 13:
                                    throw new C.z4(i.message);
                                  case 14:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            null,
                            [[1, 8]],
                          );
                        }),
                      );
                      return function (t, n) {
                        return e.apply(this, arguments);
                      };
                    })(),
                  ),
                  (this.baseUrl = 'https://api.stream-io-api.com/api/'),
                  (this.baseAnalyticsUrl = 'https://analytics.stream-io-api.com/analytics/'),
                  (this.apiKey = t),
                  (this.usingApiSecret = null != n && !n.includes('.')),
                  (this.apiSecret = this.usingApiSecret ? n : null),
                  (this.userToken = this.usingApiSecret ? null : n),
                  (this.enrichByDefault = !this.usingApiSecret),
                  null != this.userToken)
                ) {
                  var d = b(this.userToken);
                  if (!d.user_id) throw new TypeError('user_id is missing in user token');
                  (this.userId = d.user_id), (this.currentUser = this.user(this.userId));
                }
                if (
                  ((this.appId = r),
                  (this.options = h),
                  (this.version = this.options.version || 'v1.0'),
                  (this.fayeUrl = this.options.fayeUrl || 'https://faye-us-east.stream-io-api.com/faye'),
                  (this.fayeClient = null),
                  (this.group = this.options.group || 'unspecified'),
                  (this.subscriptions = {}),
                  (this.expireTokens = !!this.options.expireTokens && this.options.expireTokens),
                  (this.location = this.options.location),
                  (this.baseUrl = this.getBaseUrl()),
                  'undefined' != typeof process &&
                    null !== (i = process.env) &&
                    void 0 !== i &&
                    i.LOCAL_FAYE &&
                    (this.fayeUrl = 'http://localhost:9999/faye/'),
                  'undefined' != typeof process &&
                    null !== (a = process.env) &&
                    void 0 !== a &&
                    a.STREAM_ANALYTICS_BASE_URL &&
                    (this.baseAnalyticsUrl = process.env.STREAM_ANALYTICS_BASE_URL),
                  (this.handlers = {}),
                  (this.browser =
                    void 0 !== this.options.browser ? this.options.browser : 'undefined' != typeof window),
                  (this.node = !this.browser),
                  this.node)
                ) {
                  var y = void 0 === this.options.keepAlive || this.options.keepAlive;
                  this.nodeOptions = {
                    httpAgent: new p.Agent({ keepAlive: y, keepAliveMsecs: 3e3 }),
                    httpsAgent: new v.Agent({ keepAlive: y, keepAliveMsecs: 3e3 }),
                  };
                }
                if (
                  ((this.request = f().create(
                    q({ timeout: this.options.timeout || 1e4, withCredentials: !1 }, this.nodeOptions || {}),
                  )),
                  (this.personalization = new w.S(this)),
                  this.browser && this.usingApiSecret)
                )
                  throw new C.IY(
                    'You are publicly sharing your App Secret. Do not expose the App Secret in browsers, "native" mobile apps, or other non-trusted environments.',
                  );
                (this.collections = new k.n(this, this.getOrCreateToken())),
                  (this.files = new E.h(this, this.getOrCreateToken())),
                  (this.images = new x.$(this, this.getOrCreateToken())),
                  (this.reactions = new O.R(this, this.getOrCreateToken())),
                  N() &&
                    R() &&
                    ((this.addToMany = N().addToMany),
                    (this.followMany = N().followMany),
                    (this.unfollowMany = N().unfollowMany),
                    (this.createRedirectUrl = R()));
              }
              var t, n;
              return (
                (0, a.Z)(e, [
                  {
                    key: '_throwMissingApiSecret',
                    value: function () {
                      if (!this.usingApiSecret)
                        throw new C.z4(
                          'This method can only be used server-side using your API Secret, use client = stream.connect(key, secret);',
                        );
                    },
                  },
                  {
                    key: 'getPersonalizationToken',
                    value: function () {
                      return (
                        this._personalizationToken ||
                          (this._throwMissingApiSecret(),
                          (this._personalizationToken = (0, S.v)(this.apiSecret, 'personalization', '*', {
                            userId: '*',
                            feedId: '*',
                            expireTokens: this.expireTokens,
                          }))),
                        this._personalizationToken
                      );
                    },
                  },
                  {
                    key: 'getCollectionsToken',
                    value: function () {
                      return (
                        this._collectionsToken ||
                          (this._throwMissingApiSecret(),
                          (this._collectionsToken = (0, S.v)(this.apiSecret, 'collections', '*', {
                            feedId: '*',
                            expireTokens: this.expireTokens,
                          }))),
                        this._collectionsToken
                      );
                    },
                  },
                  {
                    key: 'getAnalyticsToken',
                    value: function () {
                      return (
                        this._throwMissingApiSecret(),
                        (0, S.v)(this.apiSecret, 'analytics', '*', { userId: '*', expireTokens: this.expireTokens })
                      );
                    },
                  },
                  {
                    key: 'getBaseUrl',
                    value: function (e) {
                      var t, n;
                      if ((e || (e = 'api'), this.options.urlOverride && this.options.urlOverride[e]))
                        return this.options.urlOverride[e];
                      var r = 'api' === e ? 'STREAM_BASE_URL' : 'STREAM_'.concat(e.toUpperCase(), '_URL');
                      if ('undefined' != typeof process && null !== (t = process.env) && void 0 !== t && t[r])
                        return process.env[r];
                      if (
                        ('undefined' != typeof process && null !== (n = process.env) && void 0 !== n && n.LOCAL) ||
                        this.options.local
                      )
                        return 'http://localhost:8000/'.concat(e, '/');
                      if (this.location) {
                        var i = this.options.protocol || 'https';
                        return ''
                          .concat(i, '://')
                          .concat(this.location, '-')
                          .concat(e, '.stream-io-api.com/')
                          .concat(e, '/');
                      }
                      return 'api' !== e ? 'https://'.concat(e, '.stream-io-api.com/').concat(e, '/') : this.baseUrl;
                    },
                  },
                  {
                    key: 'on',
                    value: function (e, t) {
                      this.handlers[e] = t;
                    },
                  },
                  {
                    key: 'off',
                    value: function (e) {
                      void 0 === e ? (this.handlers = {}) : delete this.handlers[e];
                    },
                  },
                  {
                    key: 'send',
                    value: function (e) {
                      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
                        n[r - 1] = arguments[r];
                      this.handlers[e] && this.handlers[e].apply(this, n);
                    },
                  },
                  {
                    key: 'userAgent',
                    value: function () {
                      return 'stream-javascript-client-'.concat(this.node ? 'node' : 'browser', '-').concat(M.version);
                    },
                  },
                  {
                    key: 'getReadOnlyToken',
                    value: function (e, t) {
                      return (
                        A.Z.validateFeedSlug(e),
                        A.Z.validateUserId(t),
                        (0, S.v)(this.apiSecret, '*', 'read', {
                          feedId: ''.concat(e).concat(t),
                          expireTokens: this.expireTokens,
                        })
                      );
                    },
                  },
                  {
                    key: 'getReadWriteToken',
                    value: function (e, t) {
                      return (
                        A.Z.validateFeedSlug(e),
                        A.Z.validateUserId(t),
                        (0, S.v)(this.apiSecret, '*', '*', {
                          feedId: ''.concat(e).concat(t),
                          expireTokens: this.expireTokens,
                        })
                      );
                    },
                  },
                  {
                    key: 'feed',
                    value: function (e, t, n) {
                      return (
                        t instanceof T.h && (t = t.id),
                        void 0 === n &&
                          (n = this.usingApiSecret
                            ? (0, S.v)(this.apiSecret, '*', '*', { feedId: ''.concat(e).concat(t) })
                            : this.userToken),
                        new U.r(this, e, t || this.userId, n)
                      );
                    },
                  },
                  {
                    key: 'enrichUrl',
                    value: function (e, t) {
                      return ''.concat(this.getBaseUrl(t)).concat(this.version, '/').concat(e);
                    },
                  },
                  {
                    key: 'shouldUseEnrichEndpoint',
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                      if (void 0 !== e.enrich) {
                        var t = e.enrich;
                        return delete e.enrich, t;
                      }
                      return (
                        this.enrichByDefault ||
                        null != e.ownReactions ||
                        null != e.withRecentReactions ||
                        null != e.withReactionCounts ||
                        null != e.withOwnChildren
                      );
                    },
                  },
                  {
                    key: 'enrichKwargs',
                    value: function (e) {
                      var t = e.method,
                        n = e.token,
                        r = (0, i.Z)(e, Z);
                      return q(
                        {
                          method: t,
                          url: this.enrichUrl(r.url, r.serviceName),
                          data: r.body,
                          params: q({ api_key: this.apiKey, location: this.group }, r.qs || {}),
                          headers: q(
                            { 'X-Stream-Client': this.userAgent(), 'stream-auth-type': 'jwt', Authorization: n },
                            r.headers || {},
                          ),
                        },
                        r.axiosOptions || {},
                      );
                    },
                  },
                  {
                    key: 'getFayeAuthorization',
                    value: function () {
                      var e = this;
                      return {
                        incoming: function (e, t) {
                          return t(e);
                        },
                        outgoing: function (t, n) {
                          if (t.subscription && e.subscriptions[t.subscription]) {
                            var r = e.subscriptions[t.subscription];
                            t.ext = { user_id: r.userId, api_key: e.apiKey, signature: r.token };
                          }
                          n(t);
                        },
                      };
                    },
                  },
                  {
                    key: 'getFayeClient',
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 10;
                      if (null === this.fayeClient) {
                        this.fayeClient = new d.Client(this.fayeUrl, { timeout: e });
                        var t = this.getFayeAuthorization();
                        this.fayeClient.addExtension(t);
                      }
                      return this.fayeClient;
                    },
                  },
                  {
                    key: 'upload',
                    value: function (e, t, n, r, i) {
                      var s = A.Z.addFileToFormData(t, n, r);
                      return this.doAxiosRequest('POST', {
                        url: e,
                        body: s,
                        headers: s.getHeaders ? s.getHeaders() : {},
                        token: this.getOrCreateToken(),
                        axiosOptions: {
                          timeout: 0,
                          maxContentLength: 1 / 0,
                          maxBodyLength: 1 / 0,
                          onUploadProgress: i,
                        },
                      });
                    },
                  },
                  {
                    key: 'get',
                    value: function (e) {
                      return this.doAxiosRequest('GET', e);
                    },
                  },
                  {
                    key: 'post',
                    value: function (e) {
                      return this.doAxiosRequest('POST', e);
                    },
                  },
                  {
                    key: 'delete',
                    value: function (e) {
                      return this.doAxiosRequest('DELETE', e);
                    },
                  },
                  {
                    key: 'put',
                    value: function (e) {
                      return this.doAxiosRequest('PUT', e);
                    },
                  },
                  {
                    key: 'createUserToken',
                    value: function (e) {
                      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                      return (
                        this._throwMissingApiSecret(),
                        (0, S.c)(this.apiSecret, e, t, { noTimestamp: !this.expireTokens })
                      );
                    },
                  },
                  {
                    key: 'updateActivities',
                    value: function (e) {
                      if ((this._throwMissingApiSecret(), !(e instanceof Array)))
                        throw new TypeError('The activities argument should be an Array');
                      var t = (0, S.v)(this.apiSecret, 'activities', '*', {
                        feedId: '*',
                        expireTokens: this.expireTokens,
                      });
                      return this.post({ url: 'activities/', body: { activities: e }, token: t });
                    },
                  },
                  {
                    key: 'updateActivity',
                    value: function (e) {
                      return this._throwMissingApiSecret(), this.updateActivities([e]);
                    },
                  },
                  {
                    key: 'getActivities',
                    value: function (e) {
                      var t = e.ids,
                        n = e.foreignIDTimes,
                        r = (0, i.Z)(e, P),
                        s = {};
                      if (t) {
                        if (!(t instanceof Array)) throw new TypeError('The ids argument should be an Array');
                        s.ids = t.join(',');
                      } else {
                        if (!n) throw new TypeError('Missing ids or foreignIDTimes params');
                        if (!(n instanceof Array))
                          throw new TypeError('The foreignIDTimes argument should be an Array');
                        var o = [],
                          a = [];
                        n.forEach(function (e) {
                          if (!(e instanceof Object)) throw new TypeError('foreignIDTimes elements should be Objects');
                          o.push(e.foreign_id || e.foreignID), a.push(e.time);
                        }),
                          (s.foreign_ids = o.join(',')),
                          (s.timestamps = a.join(','));
                      }
                      var c = this.userToken;
                      this.usingApiSecret &&
                        (c = (0, S.v)(this.apiSecret, 'activities', '*', {
                          feedId: '*',
                          expireTokens: this.expireTokens,
                        })),
                        this.replaceReactionOptions(r);
                      var u = this.shouldUseEnrichEndpoint(r) ? 'enrich/activities/' : 'activities/';
                      return this.get({ url: u, qs: q(q({}, r), s), token: c });
                    },
                  },
                  {
                    key: 'getOrCreateToken',
                    value: function () {
                      return (
                        this._getOrCreateToken ||
                          (this._getOrCreateToken = this.usingApiSecret
                            ? (0, S.v)(this.apiSecret, '*', '*', { feedId: '*' })
                            : this.userToken),
                        this._getOrCreateToken
                      );
                    },
                  },
                  {
                    key: 'user',
                    value: function (e) {
                      return new T.h(this, e, this.getOrCreateToken());
                    },
                  },
                  {
                    key: 'setUser',
                    value:
                      ((n = (0, s.Z)(
                        l().mark(function e(t) {
                          var n, r;
                          return l().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    if (!this.usingApiSecret) {
                                      e.next = 2;
                                      break;
                                    }
                                    throw new C.z4('This method can only be used client-side using a user token');
                                  case 2:
                                    return delete (n = q({}, t)).id, (e.next = 6), this.currentUser.getOrCreate(n);
                                  case 6:
                                    return (r = e.sent), (this.currentUser = r), e.abrupt('return', r);
                                  case 9:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                          );
                        }),
                      )),
                      function (e) {
                        return n.apply(this, arguments);
                      }),
                  },
                  {
                    key: 'og',
                    value: function (e) {
                      return this.get({ url: 'og/', qs: { url: e }, token: this.getOrCreateToken() });
                    },
                  },
                  {
                    key: 'personalizedFeed',
                    value: function () {
                      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                      return this.get({ url: 'enrich/personalization/feed/', qs: e, token: this.getOrCreateToken() });
                    },
                  },
                  {
                    key: 'activityPartialUpdate',
                    value:
                      ((t = (0, s.Z)(
                        l().mark(function e(t) {
                          var n, s, o, a, c;
                          return l().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (e.next = 2), this.activitiesPartialUpdate([t]);
                                  case 2:
                                    return (
                                      (n = e.sent),
                                      (s = n.activities),
                                      (o = (0, i.Z)(n, D)),
                                      (a = (0, r.Z)(s, 1)),
                                      (c = a[0]),
                                      e.abrupt('return', q(q({}, c), o))
                                    );
                                  case 7:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                          );
                        }),
                      )),
                      function (e) {
                        return t.apply(this, arguments);
                      }),
                  },
                  {
                    key: 'activitiesPartialUpdate',
                    value: function (e) {
                      if (!(e instanceof Array)) throw new TypeError('changes should be an Array');
                      e.forEach(function (e) {
                        if (!(e instanceof Object)) throw new TypeError('changeset should be and Object');
                        if (
                          (e.foreignID && (e.foreign_id = e.foreignID),
                          void 0 === e.id && (void 0 === e.foreign_id || void 0 === e.time))
                        )
                          throw new TypeError('missing id or foreign_id and time');
                        if (e.set && !(e.set instanceof Object)) throw new TypeError('set field should be an Object');
                        if (e.unset && !(e.unset instanceof Array))
                          throw new TypeError('unset field should be an Array');
                      });
                      var t = this.userToken;
                      return (
                        this.usingApiSecret &&
                          (t = (0, S.v)(this.apiSecret, 'activities', '*', {
                            feedId: '*',
                            expireTokens: this.expireTokens,
                          })),
                        this.post({ url: 'activity/', body: { changes: e }, token: t })
                      );
                    },
                  },
                ]),
                e
              );
            })();
        },
        3709: (e, t, n) => {
          'use strict';
          n.d(t, { R: () => l, n: () => h });
          var r = n(5861),
            i = n(5671),
            s = n(3144),
            o = n(4942),
            a = n(7757),
            c = n.n(a),
            u = n(2589),
            l = (function () {
              function e(t, n, r, s) {
                (0, i.Z)(this, e),
                  (0, o.Z)(this, 'id', void 0),
                  (0, o.Z)(this, 'collection', void 0),
                  (0, o.Z)(this, 'store', void 0),
                  (0, o.Z)(this, 'data', void 0),
                  (0, o.Z)(this, 'full', void 0),
                  (this.collection = n),
                  (this.store = t),
                  (this.id = r),
                  (this.data = s);
              }
              var t, n, a, u;
              return (
                (0, s.Z)(e, [
                  {
                    key: 'ref',
                    value: function () {
                      return 'SO:'.concat(this.collection, ':').concat(this.id);
                    },
                  },
                  {
                    key: 'get',
                    value:
                      ((u = (0, r.Z)(
                        c().mark(function e() {
                          var t;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (e.next = 2), this.store.get(this.collection, this.id);
                                  case 2:
                                    return (t = e.sent), (this.data = t.data), (this.full = t), e.abrupt('return', t);
                                  case 6:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                          );
                        }),
                      )),
                      function () {
                        return u.apply(this, arguments);
                      }),
                  },
                  {
                    key: 'add',
                    value:
                      ((a = (0, r.Z)(
                        c().mark(function e() {
                          var t;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (e.next = 2), this.store.add(this.collection, this.id, this.data);
                                  case 2:
                                    return (t = e.sent), (this.data = t.data), (this.full = t), e.abrupt('return', t);
                                  case 6:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                          );
                        }),
                      )),
                      function () {
                        return a.apply(this, arguments);
                      }),
                  },
                  {
                    key: 'update',
                    value:
                      ((n = (0, r.Z)(
                        c().mark(function e() {
                          var t;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (e.next = 2), this.store.update(this.collection, this.id, this.data);
                                  case 2:
                                    return (t = e.sent), (this.data = t.data), (this.full = t), e.abrupt('return', t);
                                  case 6:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                          );
                        }),
                      )),
                      function () {
                        return n.apply(this, arguments);
                      }),
                  },
                  {
                    key: 'delete',
                    value:
                      ((t = (0, r.Z)(
                        c().mark(function e() {
                          var t;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (e.next = 2), this.store.delete(this.collection, this.id);
                                  case 2:
                                    return (t = e.sent), (this.data = null), (this.full = null), e.abrupt('return', t);
                                  case 6:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                          );
                        }),
                      )),
                      function () {
                        return t.apply(this, arguments);
                      }),
                  },
                ]),
                e
              );
            })(),
            h = (function () {
              function e(t, n) {
                (0, i.Z)(this, e),
                  (0, o.Z)(this, 'client', void 0),
                  (0, o.Z)(this, 'token', void 0),
                  (0, o.Z)(this, 'buildURL', function (e, t) {
                    var n = 'collections/'.concat(e, '/');
                    return void 0 === t ? n : ''.concat(n).concat(t, '/');
                  }),
                  (this.client = t),
                  (this.token = n);
              }
              var t, n, a;
              return (
                (0, s.Z)(e, [
                  {
                    key: 'entry',
                    value: function (e, t, n) {
                      return new l(this, e, t, n);
                    },
                  },
                  {
                    key: 'get',
                    value:
                      ((a = (0, r.Z)(
                        c().mark(function e(t, n) {
                          var r, i;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2), this.client.get({ url: this.buildURL(t, n), token: this.token })
                                    );
                                  case 2:
                                    return (
                                      (r = e.sent),
                                      ((i = this.entry(r.collection, r.id, r.data)).full = r),
                                      e.abrupt('return', i)
                                    );
                                  case 6:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                          );
                        }),
                      )),
                      function (e, t) {
                        return a.apply(this, arguments);
                      }),
                  },
                  {
                    key: 'add',
                    value:
                      ((n = (0, r.Z)(
                        c().mark(function e(t, n, r) {
                          var i, s;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.client.post({
                                        url: this.buildURL(t),
                                        body: { id: null === n ? void 0 : n, data: r },
                                        token: this.token,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (i = e.sent),
                                      ((s = this.entry(i.collection, i.id, i.data)).full = i),
                                      e.abrupt('return', s)
                                    );
                                  case 6:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                          );
                        }),
                      )),
                      function (e, t, r) {
                        return n.apply(this, arguments);
                      }),
                  },
                  {
                    key: 'update',
                    value:
                      ((t = (0, r.Z)(
                        c().mark(function e(t, n, r) {
                          var i, s;
                          return c().wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      (e.next = 2),
                                      this.client.put({
                                        url: this.buildURL(t, n),
                                        body: { data: r },
                                        token: this.token,
                                      })
                                    );
                                  case 2:
                                    return (
                                      (i = e.sent),
                                      ((s = this.entry(i.collection, i.id, i.data)).full = i),
                                      e.abrupt('return', s)
                                    );
                                  case 6:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            this,
                          );
                        }),
                      )),
                      function (e, n, r) {
                        return t.apply(this, arguments);
                      }),
                  },
                  {
                    key: 'delete',
                    value: function (e, t) {
                      return this.client.delete({ url: this.buildURL(e, t), token: this.token });
                    },
                  },
                  {
                    key: 'upsert',
                    value: function (e, t) {
                      if (!this.client.usingApiSecret)
                        throw new u.z4('This method can only be used server-side using your API Secret');
                      return (
                        Array.isArray(t) || (t = [t]),
                        this.client.post({
                          url: 'collections/',
                          serviceName: 'api',
                          body: { data: (0, o.Z)({}, e, t) },
                          token: this.client.getCollectionsToken(),
                        })
                      );
                    },
                  },
                  {
                    key: 'upsertMany',
                    value: function (e) {
                      if (!this.client.usingApiSecret)
                        throw new u.z4('This method can only be used server-side using your API Secret');
                      return this.client.post({
                        url: 'collections/',
                        serviceName: 'api',
                        body: { data: e },
                        token: this.client.getCollectionsToken(),
                      });
                    },
                  },
                  {
                    key: 'select',
                    value: function (e, t) {
                      if (!this.client.usingApiSecret)
                        throw new u.z4('This method can only be used server-side using your API Secret');
                      return (
                        Array.isArray(t) || (t = [t]),
                        this.client.get({
                          url: 'collections/',
                          serviceName: 'api',
                          qs: {
                            foreign_ids: t
                              .map(function (t) {
                                return ''.concat(e, ':').concat(t);
                              })
                              .join(','),
                          },
                          token: this.client.getCollectionsToken(),
                        })
                      );
                    },
                  },
                  {
                    key: 'deleteMany',
                    value: function (e, t) {
                      if (!this.client.usingApiSecret)
                        throw new u.z4('This method can only be used server-side using your API Secret');
                      Array.isArray(t) || (t = [t]);
                      var n = {
                        collection_name: e,
                        ids: t
                          .map(function (e) {
                            return e.toString();
                          })
                          .join(','),
                      };
                      return this.client.delete({
                        url: 'collections/',
                        serviceName: 'api',
                        qs: n,
                        token: this.client.getCollectionsToken(),
                      });
                    },
                  },
                ]),
                e
              );
            })();
        },
        2631: (e, t, n) => {
          'use strict';
          n.d(t, { $: () => i });
          var r = n(6663);
          function i(e, t, n, i) {
            var s;
            if ('undefined' != typeof process && null !== (s = process.env) && void 0 !== s && s.STREAM_URL && !e) {
              var o = /https:\/\/(\w+):(\w+)@([\w-]*).*\?app_id=(\d+)/.exec(process.env.STREAM_URL) || [];
              (e = o[1]), (t = o[2]);
              var a = o[3];
              (n = o[4]), void 0 === i && (i = {}), 'getstream' !== a && 'stream-io-api' !== a && (i.location = a);
            }
            return new r.n(e, t, n, i);
          }
        },
        2589: (e, t, n) => {
          'use strict';
          n.d(t, { IY: () => _, uA: () => w, z4: () => b, eY: () => k });
          var r = n(3144),
            i = n(5671);
          function s(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
          }
          function o(e, t) {
            return (
              (o =
                Object.setPrototypeOf ||
                function (e, t) {
                  return (e.__proto__ = t), e;
                }),
              o(e, t)
            );
          }
          function a(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError('Super expression must either be null or a function');
            (e.prototype = Object.create(t && t.prototype, {
              constructor: { value: e, writable: !0, configurable: !0 },
            })),
              Object.defineProperty(e, 'prototype', { writable: !1 }),
              t && o(e, t);
          }
          var c = n(1002);
          function u(e, t) {
            if (t && ('object' === (0, c.Z)(t) || 'function' == typeof t)) return t;
            if (void 0 !== t) throw new TypeError('Derived constructors may only return object or undefined');
            return s(e);
          }
          function l(e) {
            return (
              (l = Object.setPrototypeOf
                ? Object.getPrototypeOf
                : function (e) {
                    return e.__proto__ || Object.getPrototypeOf(e);
                  }),
              l(e)
            );
          }
          function h() {
            if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ('function' == typeof Proxy) return !0;
            try {
              return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
            } catch (e) {
              return !1;
            }
          }
          function f(e, t, n) {
            return (
              (f = h()
                ? Reflect.construct
                : function (e, t, n) {
                    var r = [null];
                    r.push.apply(r, t);
                    var i = new (Function.bind.apply(e, r))();
                    return n && o(i, n.prototype), i;
                  }),
              f.apply(null, arguments)
            );
          }
          function d(e) {
            var t = 'function' == typeof Map ? new Map() : void 0;
            return (
              (d = function (e) {
                if (null === e || ((n = e), -1 === Function.toString.call(n).indexOf('[native code]'))) return e;
                var n;
                if ('function' != typeof e) throw new TypeError('Super expression must either be null or a function');
                if (void 0 !== t) {
                  if (t.has(e)) return t.get(e);
                  t.set(e, r);
                }
                function r() {
                  return f(e, arguments, l(this).constructor);
                }
                return (
                  (r.prototype = Object.create(e.prototype, {
                    constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 },
                  })),
                  o(r, e)
                );
              }),
              d(e)
            );
          }
          var p = n(4942);
          function v(e) {
            var t = (function () {
              if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
              if (Reflect.construct.sham) return !1;
              if ('function' == typeof Proxy) return !0;
              try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})), !0;
              } catch (e) {
                return !1;
              }
            })();
            return function () {
              var n,
                r = l(e);
              if (t) {
                var i = l(this).constructor;
                n = Reflect.construct(r, arguments, i);
              } else n = r.apply(this, arguments);
              return u(this, n);
            };
          }
          var y = 'function' == typeof Error.captureStackTrace,
            g = !!new Error().stack,
            m = (function (e) {
              a(n, e);
              var t = v(n);
              function n(e) {
                var r;
                return (
                  (0, i.Z)(this, n),
                  (r = t.call(this, e)),
                  (0, p.Z)(s(r), 'message', void 0),
                  (r.message = e),
                  y ? Error.captureStackTrace(s(r), n.constructor) : (r.stack = g ? new Error().stack : ''),
                  r
                );
              }
              return (0, r.Z)(n);
            })(d(Error)),
            _ = (function (e) {
              a(n, e);
              var t = v(n);
              function n() {
                return (0, i.Z)(this, n), t.apply(this, arguments);
              }
              return (0, r.Z)(n);
            })(m),
            b = (function (e) {
              a(n, e);
              var t = v(n);
              function n() {
                return (0, i.Z)(this, n), t.apply(this, arguments);
              }
              return (0, r.Z)(n);
            })(m),
            w = (function (e) {
              a(n, e);
              var t = v(n);
              function n() {
                return (0, i.Z)(this, n), t.apply(this, arguments);
              }
              return (0, r.Z)(n);
            })(m),
            k = (function (e) {
              a(n, e);
              var t = v(n);
              function n(e, r, o) {
                var a;
                return (
                  (0, i.Z)(this, n),
                  (a = t.call(this, e)),
                  (0, p.Z)(s(a), 'error', void 0),
                  (0, p.Z)(s(a), 'response', void 0),
                  (a.error = r),
                  (a.response = o),
                  a
                );
              }
              return (0, r.Z)(n);
            })(m);
        },
        7248: (e, t, n) => {
          'use strict';
          n.d(t, { r: () => h });
          var r = n(5671),
            i = n(3144),
            s = n(4942),
            o = n(7878),
            a = n(2589),
            c = n(2637);
          function u(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(e);
              t &&
                (r = r.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                n.push.apply(n, r);
            }
            return n;
          }
          function l(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? u(Object(n), !0).forEach(function (t) {
                    (0, s.Z)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : u(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
            }
            return e;
          }
          var h = (function () {
            function e(t, n, i, o) {
              if (
                ((0, r.Z)(this, e),
                (0, s.Z)(this, 'client', void 0),
                (0, s.Z)(this, 'token', void 0),
                (0, s.Z)(this, 'id', void 0),
                (0, s.Z)(this, 'slug', void 0),
                (0, s.Z)(this, 'userId', void 0),
                (0, s.Z)(this, 'feedUrl', void 0),
                (0, s.Z)(this, 'feedTogether', void 0),
                (0, s.Z)(this, 'notificationChannel', void 0),
                !n || !i)
              )
                throw new a.IY('Please provide a feed slug and user id, ie client.feed("user", "1")');
              if (-1 !== n.indexOf(':'))
                throw new a.IY('Please initialize the feed using client.feed("user", "1") not client.feed("user:1")');
              if ((c.Z.validateFeedSlug(n), c.Z.validateUserId(i), !o))
                throw new a.IY('Missing token, in client side mode please provide a feed secret');
              (this.client = t),
                (this.slug = n),
                (this.userId = i),
                (this.id = ''.concat(this.slug, ':').concat(this.userId)),
                (this.token = o),
                (this.feedUrl = this.id.replace(':', '/')),
                (this.feedTogether = this.id.replace(':', '')),
                (this.notificationChannel = 'site-'.concat(this.client.appId, '-feed-').concat(this.feedTogether));
            }
            return (
              (0, i.Z)(e, [
                {
                  key: 'addActivity',
                  value: function (e) {
                    return (
                      !(e = c.Z.replaceStreamObjects(e)).actor &&
                        this.client.currentUser &&
                        (e.actor = this.client.currentUser.ref()),
                      this.client.post({ url: 'feed/'.concat(this.feedUrl, '/'), body: e, token: this.token })
                    );
                  },
                },
                {
                  key: 'removeActivity',
                  value: function (e) {
                    var t = e.foreignId || e.foreign_id;
                    return this.client.delete({
                      url: 'feed/'.concat(this.feedUrl, '/').concat(t || e, '/'),
                      qs: t ? { foreign_id: '1' } : {},
                      token: this.token,
                    });
                  },
                },
                {
                  key: 'addActivities',
                  value: function (e) {
                    return this.client.post({
                      url: 'feed/'.concat(this.feedUrl, '/'),
                      body: { activities: c.Z.replaceStreamObjects(e) },
                      token: this.token,
                    });
                  },
                },
                {
                  key: 'follow',
                  value: function (e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                    t instanceof o.h && (t = t.id), c.Z.validateFeedSlug(e), c.Z.validateUserId(t);
                    var r = { target: ''.concat(e, ':').concat(t) };
                    return (
                      'number' == typeof n.limit && (r.activity_copy_limit = n.limit),
                      this.client.post({ url: 'feed/'.concat(this.feedUrl, '/following/'), body: r, token: this.token })
                    );
                  },
                },
                {
                  key: 'unfollow',
                  value: function (e, t) {
                    var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                      r = {};
                    'boolean' == typeof n.keepHistory && n.keepHistory && (r.keep_history = '1'),
                      c.Z.validateFeedSlug(e),
                      c.Z.validateUserId(t);
                    var i = ''.concat(e, ':').concat(t);
                    return this.client.delete({
                      url: 'feed/'.concat(this.feedUrl, '/following/').concat(i, '/'),
                      qs: r,
                      token: this.token,
                    });
                  },
                },
                {
                  key: 'following',
                  value: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      t = {};
                    return (
                      e.filter && (t.filter = e.filter.join(',')),
                      this.client.get({
                        url: 'feed/'.concat(this.feedUrl, '/following/'),
                        qs: l(l({}, e), t),
                        token: this.token,
                      })
                    );
                  },
                },
                {
                  key: 'followers',
                  value: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      t = {};
                    return (
                      e.filter && (t.filter = e.filter.join(',')),
                      this.client.get({
                        url: 'feed/'.concat(this.feedUrl, '/followers/'),
                        qs: l(l({}, e), t),
                        token: this.token,
                      })
                    );
                  },
                },
                {
                  key: 'followStats',
                  value: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      t = { followers: this.id, following: this.id };
                    return (
                      e.followerSlugs && e.followerSlugs.length && (t.followers_slugs = e.followerSlugs.join(',')),
                      e.followingSlugs && e.followingSlugs.length && (t.following_slugs = e.followingSlugs.join(',')),
                      this.client.get({
                        url: 'stats/follow/',
                        qs: t,
                        token: this.client.getOrCreateToken() || this.token,
                      })
                    );
                  },
                },
                {
                  key: 'get',
                  value: function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                      t = {};
                    e.mark_read && e.mark_read.join && (t.mark_read = e.mark_read.join(',')),
                      e.mark_seen && e.mark_seen.join && (t.mark_seen = e.mark_seen.join(',')),
                      this.client.replaceReactionOptions(e);
                    var n = this.client.shouldUseEnrichEndpoint(e) ? 'enrich/feed/' : 'feed/';
                    return this.client.get({
                      url: ''.concat(n).concat(this.feedUrl, '/'),
                      qs: l(l({}, e), t),
                      token: this.token,
                    });
                  },
                },
                {
                  key: 'getActivityDetail',
                  value: function (e, t) {
                    return this.get(l({ id_lte: e, id_gte: e, limit: 1 }, t || {}));
                  },
                },
                {
                  key: 'getFayeClient',
                  value: function () {
                    return this.client.getFayeClient();
                  },
                },
                {
                  key: 'subscribe',
                  value: function (e) {
                    if (!this.client.appId)
                      throw new a.z4(
                        'Missing app id, which is needed to subscribe, use var client = stream.connect(key, secret, appId);',
                      );
                    var t = this.getFayeClient().subscribe('/'.concat(this.notificationChannel), e);
                    return (
                      (this.client.subscriptions['/'.concat(this.notificationChannel)] = {
                        token: this.token,
                        userId: this.notificationChannel,
                        fayeSubscription: t,
                      }),
                      t
                    );
                  },
                },
                {
                  key: 'unsubscribe',
                  value: function () {
                    var e = this.client.subscriptions['/'.concat(this.notificationChannel)];
                    e &&
                      (delete this.client.subscriptions['/'.concat(this.notificationChannel)],
                      e.fayeSubscription.cancel());
                  },
                },
                {
                  key: 'updateActivityToTargets',
                  value: function (e, t, n, r, i) {
                    if (!e) throw new Error('Missing `foreign_id` parameter!');
                    if (!t) throw new Error('Missing `time` parameter!');
                    if (!n && !r && !i)
                      throw new Error(
                        'Requires you to provide at least one parameter for `newTargets`, `addedTargets`, or `removedTargets` - example: `updateActivityToTargets("foreignID:1234", new Date(), [newTargets...], [addedTargets...], [removedTargets...])`',
                      );
                    if (n && (r || i))
                      throw new Error(
                        "Can't include add_targets or removedTargets if you're also including newTargets",
                      );
                    r &&
                      i &&
                      r.forEach(function (e) {
                        if (i.includes(e))
                          throw new Error("Can't have the same feed ID in addedTargets and removedTargets.");
                      });
                    var s = { foreign_id: e, time: t };
                    return (
                      n && (s.new_targets = n),
                      r && (s.added_targets = r),
                      i && (s.removed_targets = i),
                      this.client.post({
                        url: 'feed_targets/'.concat(this.feedUrl, '/activity_to_targets/'),
                        token: this.token,
                        body: s,
                      })
                    );
                  },
                },
              ]),
              e
            );
          })();
        },
        448: (e, t, n) => {
          'use strict';
          n.d(t, { h: () => o });
          var r = n(5671),
            i = n(3144),
            s = n(4942),
            o = (function () {
              function e(t, n) {
                (0, r.Z)(this, e),
                  (0, s.Z)(this, 'client', void 0),
                  (0, s.Z)(this, 'token', void 0),
                  (this.client = t),
                  (this.token = n);
              }
              return (
                (0, i.Z)(e, [
                  {
                    key: 'upload',
                    value: function (e, t, n, r) {
                      return this.client.upload('files/', e, t, n, r);
                    },
                  },
                  {
                    key: 'delete',
                    value: function (e) {
                      return this.client.delete({ url: 'files/', qs: { url: e }, token: this.token });
                    },
                  },
                ]),
                e
              );
            })();
        },
        9082: (e, t, n) => {
          'use strict';
          function r() {
            return (
              (r =
                Object.assign ||
                function (e) {
                  for (var t = 1; t < arguments.length; t++) {
                    var n = arguments[t];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
                  }
                  return e;
                }),
              r.apply(this, arguments)
            );
          }
          n.d(t, { $: () => a });
          var i = n(5671),
            s = n(3144),
            o = n(4942),
            a = (function () {
              function e(t, n) {
                (0, i.Z)(this, e),
                  (0, o.Z)(this, 'client', void 0),
                  (0, o.Z)(this, 'token', void 0),
                  (this.client = t),
                  (this.token = n);
              }
              return (
                (0, s.Z)(e, [
                  {
                    key: 'upload',
                    value: function (e, t, n, r) {
                      return this.client.upload('images/', e, t, n, r);
                    },
                  },
                  {
                    key: 'delete',
                    value: function (e) {
                      return this.client.delete({ url: 'images/', qs: { url: e }, token: this.token });
                    },
                  },
                  {
                    key: 'process',
                    value: function (e, t) {
                      var n = r(t, { url: e });
                      return (
                        Array.isArray(n.crop) && (n.crop = n.crop.join(',')),
                        this.client.get({ url: 'images/', qs: n, token: this.token })
                      );
                    },
                  },
                  {
                    key: 'thumbnail',
                    value: function (e, t, n) {
                      var r =
                          arguments.length > 3 && void 0 !== arguments[3]
                            ? arguments[3]
                            : { crop: 'center', resize: 'clip' },
                        i = r.crop,
                        s = r.resize;
                      return this.process(e, { w: t, h: n, crop: i, resize: s });
                    },
                  },
                ]),
                e
              );
            })();
        },
        8039: (e, t, n) => {
          'use strict';
          n.d(t, { S: () => o });
          var r = n(5671),
            i = n(3144),
            s = n(4942),
            o = (function () {
              function e(t) {
                (0, r.Z)(this, e), (0, s.Z)(this, 'client', void 0), (this.client = t);
              }
              return (
                (0, i.Z)(e, [
                  {
                    key: 'get',
                    value: function (e) {
                      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                      return this.client.get({
                        url: ''.concat(e, '/'),
                        serviceName: 'personalization',
                        qs: t,
                        token: t.token || this.client.getPersonalizationToken(),
                      });
                    },
                  },
                  {
                    key: 'post',
                    value: function (e) {
                      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                      return this.client.post({
                        url: ''.concat(e, '/'),
                        serviceName: 'personalization',
                        qs: t,
                        body: n,
                        token: this.client.getPersonalizationToken(),
                      });
                    },
                  },
                  {
                    key: 'delete',
                    value: function (e) {
                      var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                      return this.client.delete({
                        url: ''.concat(e, '/'),
                        serviceName: 'personalization',
                        qs: t,
                        token: this.client.getPersonalizationToken(),
                      });
                    },
                  },
                ]),
                e
              );
            })();
        },
        8824: (e, t, n) => {
          'use strict';
          n.d(t, { R: () => u });
          var r = n(4925),
            i = n(5671),
            s = n(3144),
            o = n(4942),
            a = n(2589),
            c = ['user_id', 'activity_id', 'reaction_id'],
            u = (function () {
              function e(t, n) {
                (0, i.Z)(this, e),
                  (0, o.Z)(this, 'client', void 0),
                  (0, o.Z)(this, 'token', void 0),
                  (0, o.Z)(this, 'buildURL', function () {
                    for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                    return ''.concat(['reaction'].concat(t).join('/'), '/');
                  }),
                  (0, o.Z)(this, '_convertTargetFeeds', function () {
                    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                    return e.map(function (e) {
                      return 'string' == typeof e ? e : e.id;
                    });
                  }),
                  (this.client = t),
                  (this.token = n);
              }
              return (
                (0, s.Z)(e, [
                  {
                    key: 'add',
                    value: function (e, t, n) {
                      var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        i = r.id,
                        s = r.targetFeeds,
                        o = void 0 === s ? [] : s,
                        a = r.userId,
                        c = r.targetFeedsExtraData,
                        u = {
                          id: i,
                          activity_id: t instanceof Object ? t.id : t,
                          kind: e,
                          data: n || {},
                          target_feeds: this._convertTargetFeeds(o),
                          user_id: a,
                        };
                      return (
                        null != c && (u.target_feeds_extra_data = c),
                        this.client.post({ url: this.buildURL(), body: u, token: this.token })
                      );
                    },
                  },
                  {
                    key: 'addChild',
                    value: function (e, t, n) {
                      var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
                        i = r.targetFeeds,
                        s = void 0 === i ? [] : i,
                        o = r.userId,
                        a = r.targetFeedsExtraData,
                        c = {
                          parent: t instanceof Object ? t.id : t,
                          kind: e,
                          data: n || {},
                          target_feeds: this._convertTargetFeeds(s),
                          user_id: o,
                        };
                      return (
                        null != a && (c.target_feeds_extra_data = a),
                        this.client.post({ url: this.buildURL(), body: c, token: this.token })
                      );
                    },
                  },
                  {
                    key: 'get',
                    value: function (e) {
                      return this.client.get({ url: this.buildURL(e), token: this.token });
                    },
                  },
                  {
                    key: 'filter',
                    value: function (e) {
                      var t = e.user_id,
                        n = e.activity_id,
                        i = e.reaction_id,
                        s = (0, r.Z)(e, c);
                      if ((s.limit || (s.limit = 10), (t ? 1 : 0) + (n ? 1 : 0) + (i ? 1 : 0) != 1))
                        throw new a.z4(
                          'Must provide exactly one value for one of these params: user_id, activity_id, reaction_id',
                        );
                      var o = (t ? 'user_id' : n && 'activity_id') || (i && 'reaction_id'),
                        u = t || n || i,
                        l = e.kind ? this.buildURL(o, u, e.kind) : this.buildURL(o, u);
                      return this.client.get({ url: l, qs: s, token: this.token });
                    },
                  },
                  {
                    key: 'update',
                    value: function (e, t) {
                      var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                        r = n.targetFeeds,
                        i = void 0 === r ? [] : r,
                        s = n.targetFeedsExtraData,
                        o = { data: t, target_feeds: this._convertTargetFeeds(i) };
                      return (
                        null != s && (o.target_feeds_extra_data = s),
                        this.client.put({ url: this.buildURL(e), body: o, token: this.token })
                      );
                    },
                  },
                  {
                    key: 'delete',
                    value: function (e) {
                      return this.client.delete({ url: this.buildURL(e), token: this.token });
                    },
                  },
                ]),
                e
              );
            })();
        },
        6685: (e, t, n) => {
          'use strict';
          n.d(t, { v: () => u, c: () => l });
          var r = n(4942),
            i = n(1726),
            s = n.n(i);
          function o(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(e);
              t &&
                (r = r.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                n.push.apply(n, r);
            }
            return n;
          }
          function a(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? o(Object(n), !0).forEach(function (t) {
                    (0, r.Z)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : o(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
            }
            return e;
          }
          function c(e) {
            for (var t = Array.isArray(e) ? e : [e], n = [], r = 0; r < t.length; r += 1) {
              var i = t[r].trim();
              if ('*' === i) return i;
              n.push(i);
            }
            return n.join(',');
          }
          function u(e, t, n) {
            var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
              i = !r.expireTokens || !r.expireTokens,
              o = { resource: c(t), action: c(n) };
            return (
              r.feedId && (o.feed_id = c(r.feedId)),
              r.userId && (o.user_id = r.userId),
              s().sign(o, e, { algorithm: 'HS256', noTimestamp: i })
            );
          }
          function l(e, t) {
            var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
              r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
            if ('string' != typeof t) throw new TypeError('userId should be a string');
            var i = a({ user_id: t }, n),
              o = a({ algorithm: 'HS256', noTimestamp: !0 }, r);
            return s().sign(i, e, o);
          }
        },
        7878: (e, t, n) => {
          'use strict';
          n.d(t, { h: () => h });
          var r = n(5861),
            i = n(5671),
            s = n(3144),
            o = n(4942),
            a = n(7757),
            c = n.n(a);
          function u(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(e);
              t &&
                (r = r.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                n.push.apply(n, r);
            }
            return n;
          }
          function l(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? u(Object(n), !0).forEach(function (t) {
                    (0, o.Z)(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : u(Object(n)).forEach(function (t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
            }
            return e;
          }
          var h = (function () {
            function e(t, n, r) {
              (0, i.Z)(this, e),
                (0, o.Z)(this, 'client', void 0),
                (0, o.Z)(this, 'token', void 0),
                (0, o.Z)(this, 'id', void 0),
                (0, o.Z)(this, 'data', void 0),
                (0, o.Z)(this, 'full', void 0),
                (0, o.Z)(this, 'url', void 0),
                (this.client = t),
                (this.id = n),
                (this.data = void 0),
                (this.full = void 0),
                (this.token = r),
                (this.url = 'user/'.concat(this.id, '/'));
            }
            var t, n, a;
            return (
              (0, s.Z)(e, [
                {
                  key: 'ref',
                  value: function () {
                    return 'SU:'.concat(this.id);
                  },
                },
                {
                  key: 'delete',
                  value: function () {
                    return this.client.delete({ url: this.url, token: this.token });
                  },
                },
                {
                  key: 'get',
                  value:
                    ((a = (0, r.Z)(
                      c().mark(function e(t) {
                        var n;
                        return c().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (e.next = 2), this.client.get({ url: this.url, token: this.token, qs: t });
                                case 2:
                                  return (
                                    (n = e.sent),
                                    (this.full = l({}, n)),
                                    delete this.full.duration,
                                    (this.data = this.full.data),
                                    e.abrupt('return', this)
                                  );
                                case 7:
                                case 'end':
                                  return e.stop();
                              }
                          },
                          e,
                          this,
                        );
                      }),
                    )),
                    function (e) {
                      return a.apply(this, arguments);
                    }),
                },
                {
                  key: 'create',
                  value:
                    ((n = (0, r.Z)(
                      c().mark(function e(t, n) {
                        var r;
                        return c().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (e.next = 2),
                                    this.client.post({
                                      url: 'user/',
                                      body: { id: this.id, data: t || this.data || {} },
                                      qs: n,
                                      token: this.token,
                                    })
                                  );
                                case 2:
                                  return (
                                    (r = e.sent),
                                    (this.full = l({}, r)),
                                    delete this.full.duration,
                                    (this.data = this.full.data),
                                    e.abrupt('return', this)
                                  );
                                case 7:
                                case 'end':
                                  return e.stop();
                              }
                          },
                          e,
                          this,
                        );
                      }),
                    )),
                    function (e, t) {
                      return n.apply(this, arguments);
                    }),
                },
                {
                  key: 'update',
                  value:
                    ((t = (0, r.Z)(
                      c().mark(function e(t) {
                        var n;
                        return c().wrap(
                          function (e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (e.next = 2),
                                    this.client.put({
                                      url: this.url,
                                      body: { data: t || this.data || {} },
                                      token: this.token,
                                    })
                                  );
                                case 2:
                                  return (
                                    (n = e.sent),
                                    (this.full = l({}, n)),
                                    delete this.full.duration,
                                    (this.data = this.full.data),
                                    e.abrupt('return', this)
                                  );
                                case 7:
                                case 'end':
                                  return e.stop();
                              }
                          },
                          e,
                          this,
                        );
                      }),
                    )),
                    function (e) {
                      return t.apply(this, arguments);
                    }),
                },
                {
                  key: 'getOrCreate',
                  value: function (e) {
                    return this.create(e, { get_or_create: !0 });
                  },
                },
                {
                  key: 'profile',
                  value: function () {
                    return this.get({ with_follow_counts: !0 });
                  },
                },
              ]),
              e
            );
          })();
        },
        2637: (e, t, n) => {
          'use strict';
          n.d(t, { Z: () => d });
          var r = n(8152),
            i = n(1002),
            s = n(6230),
            o = n.n(s),
            a = n(2589),
            c = /^[\w]+$/,
            u = /^[\w-]+$/;
          function l(e) {
            if (!c.test(e)) throw new a.IY('Invalid feedSlug, please use letters, numbers or _: '.concat(e));
            return e;
          }
          function h(e) {
            if (!u.test(e)) throw new a.IY('Invalid userId, please use letters, numbers, - or _: '.concat(e));
            return e;
          }
          function f(e) {
            return null !== e && 'object' === (0, i.Z)(e) && (e.readable || 'function' == typeof e._read);
          }
          const d = {
            validateFeedId: function (e) {
              var t = e.split(':');
              if (2 !== t.length) throw new a.IY('Invalid feedId, expected something like user:1 got '.concat(e));
              var n = (0, r.Z)(t, 2),
                i = n[0],
                s = n[1];
              return l(i), h(s), e;
            },
            validateFeedSlug: l,
            validateUserId: h,
            rfc3986: function (e) {
              return e.replace(/[!'()*]/g, function (e) {
                return '%'.concat(e.charCodeAt(0).toString(16).toUpperCase());
              });
            },
            isReadableStream: f,
            addFileToFormData: function (e, t, n) {
              var r,
                i = new (o())();
              return (
                f(e) ||
                (null != (r = e) &&
                  null != r.constructor &&
                  'function' == typeof r.constructor.isBuffer &&
                  r.constructor.isBuffer(r)) ||
                (function (e) {
                  return 'undefined' != typeof window && 'File' in window && e instanceof File;
                })(e)
                  ? t
                    ? i.append('file', e, t)
                    : i.append('file', e)
                  : i.append('file', {
                      uri: e,
                      name: t || e.split('/').reverse()[0],
                      type: n || void 0,
                      contentType: n || void 0,
                    }),
                i
              );
            },
            replaceStreamObjects: function e(t) {
              if (Array.isArray(t))
                return t.map(function (t) {
                  return e(t);
                });
              if ('[object Object]' !== Object.prototype.toString.call(t)) return t;
              if ('function' == typeof t.ref) return t.ref();
              var n = {};
              return (
                Object.keys(t).forEach(function (r) {
                  n[r] = e(t[r]);
                }),
                n
              );
            },
          };
        },
        2965: (e, t, n) => {
          'use strict';
          var r = n(8742),
            i = n(8782),
            s = { VERSION: r.VERSION, Client: n(1955), Scheduler: n(6148) };
          (i.wrapper = s), (e.exports = s);
        },
        5890: (e, t, n) => {
          'use strict';
          var r = n(4857);
          e.exports = {
            then: function (e, t) {
              var n = this;
              return (
                this._promise ||
                  (this._promise = new r(function (e, t) {
                    (n._resolve = e), (n._reject = t);
                  })),
                0 === arguments.length ? this._promise : this._promise.then(e, t)
              );
            },
            callback: function (e, t) {
              return this.then(function (n) {
                e.call(t, n);
              });
            },
            errback: function (e, t) {
              return this.then(null, function (n) {
                e.call(t, n);
              });
            },
            timeout: function (e, t) {
              this.then();
              var r = this;
              this._timer = n.g.setTimeout(function () {
                r._reject(t);
              }, 1e3 * e);
            },
            setDeferredStatus: function (e, t) {
              this._timer && n.g.clearTimeout(this._timer),
                this.then(),
                'succeeded' === e ? this._resolve(t) : 'failed' === e ? this._reject(t) : delete this._promise;
            },
          };
        },
        8782: (e, t, n) => {
          'use strict';
          var r = n(9457),
            i = {
              LOG_LEVELS: { fatal: 4, error: 3, warn: 2, info: 1, debug: 0 },
              writeLog: function (e, t) {
                var n = i.logger || (i.wrapper || i).logger;
                if (n) {
                  var s = Array.prototype.slice.apply(e),
                    o = '[Faye',
                    a = this.className,
                    c = s.shift().replace(/\?/g, function () {
                      try {
                        return r(s.shift());
                      } catch (e) {
                        return '[Object]';
                      }
                    });
                  a && (o += '.' + a),
                    (o += '] '),
                    'function' == typeof n[t] ? n[t](o + c) : 'function' == typeof n && n(o + c);
                }
              },
            };
          for (var s in i.LOG_LEVELS)
            !(function (e) {
              i[e] = function () {
                this.writeLog(arguments, e);
              };
            })(s);
          e.exports = i;
        },
        4909: (e, t, n) => {
          'use strict';
          var r = {
            countListeners: function (e) {
              return this.listeners(e).length;
            },
            bind: function (e, t, n) {
              var r = Array.prototype.slice,
                i = function () {
                  t.apply(n, r.call(arguments));
                };
              return (this._listeners = this._listeners || []), this._listeners.push([e, t, n, i]), this.on(e, i);
            },
            unbind: function (e, t, n) {
              this._listeners = this._listeners || [];
              for (var r, i = this._listeners.length; i--; )
                (r = this._listeners[i])[0] === e &&
                  (!t || (r[1] === t && r[2] === n)) &&
                  (this._listeners.splice(i, 1), this.removeListener(e, r[3]));
            },
          };
          n(7088)(r, n(2356).prototype), (r.trigger = r.emit), (e.exports = r);
        },
        2840: (e, t, n) => {
          'use strict';
          e.exports = {
            addTimeout: function (e, t, r, i) {
              if (((this._timeouts = this._timeouts || {}), !this._timeouts.hasOwnProperty(e))) {
                var s = this;
                this._timeouts[e] = n.g.setTimeout(function () {
                  delete s._timeouts[e], r.call(i);
                }, 1e3 * t);
              }
            },
            removeTimeout: function (e) {
              this._timeouts = this._timeouts || {};
              var t = this._timeouts[e];
              t && (n.g.clearTimeout(t), delete this._timeouts[e]);
            },
            removeAllTimeouts: function () {
              for (var e in ((this._timeouts = this._timeouts || {}), this._timeouts)) this.removeTimeout(e);
            },
          };
        },
        1762: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(7088),
            s = n(4909),
            o = n(4710),
            a = r({
              initialize: function (e) {
                this.id = this.name = e;
              },
              push: function (e) {
                this.trigger('message', e);
              },
              isUnused: function () {
                return 0 === this.countListeners('message');
              },
            });
          i(a.prototype, s),
            i(a, {
              HANDSHAKE: '/meta/handshake',
              CONNECT: '/meta/connect',
              SUBSCRIBE: '/meta/subscribe',
              UNSUBSCRIBE: '/meta/unsubscribe',
              DISCONNECT: '/meta/disconnect',
              META: 'meta',
              SERVICE: 'service',
              expand: function (e) {
                var t = this.parse(e),
                  n = ['/**', e],
                  r = t.slice();
                (r[r.length - 1] = '*'), n.push(this.unparse(r));
                for (var i = 1, s = t.length; i < s; i++) (r = t.slice(0, i)).push('**'), n.push(this.unparse(r));
                return n;
              },
              isValid: function (e) {
                return o.CHANNEL_NAME.test(e) || o.CHANNEL_PATTERN.test(e);
              },
              parse: function (e) {
                return this.isValid(e) ? e.split('/').slice(1) : null;
              },
              unparse: function (e) {
                return '/' + e.join('/');
              },
              isMeta: function (e) {
                var t = this.parse(e);
                return t ? t[0] === this.META : null;
              },
              isService: function (e) {
                var t = this.parse(e);
                return t ? t[0] === this.SERVICE : null;
              },
              isSubscribable: function (e) {
                return this.isValid(e) ? !this.isMeta(e) && !this.isService(e) : null;
              },
              Set: r({
                initialize: function () {
                  this._channels = {};
                },
                getKeys: function () {
                  var e = [];
                  for (var t in this._channels) e.push(t);
                  return e;
                },
                remove: function (e) {
                  delete this._channels[e];
                },
                hasSubscription: function (e) {
                  return this._channels.hasOwnProperty(e);
                },
                subscribe: function (e, t) {
                  for (var n, r = 0, i = e.length; r < i; r++)
                    (n = e[r]), (this._channels[n] = this._channels[n] || new a(n)).bind('message', t);
                },
                unsubscribe: function (e, t) {
                  var n = this._channels[e];
                  return !!n && (n.unbind('message', t), !!n.isUnused() && (this.remove(e), !0));
                },
                distributeMessage: function (e) {
                  for (var t = a.expand(e.channel), n = 0, r = t.length; n < r; n++) {
                    var i = this._channels[t[n]];
                    i && i.trigger('message', e);
                  }
                },
              }),
            }),
            (e.exports = a);
        },
        1955: (e, t, n) => {
          'use strict';
          var r = n(9272),
            i = n(8702),
            s = (n(4857), n(8722)),
            o = n(8375),
            a = n(8742),
            c = n(7088),
            u = n(3978),
            l = n(5890),
            h = n(8782),
            f = n(4909),
            d = n(1762),
            p = n(8854),
            v = n(5656),
            y = n(9983),
            g = n(4347),
            m = n(5740),
            _ = i({
              className: 'Client',
              UNCONNECTED: 1,
              CONNECTING: 2,
              CONNECTED: 3,
              DISCONNECTED: 4,
              HANDSHAKE: 'handshake',
              RETRY: 'retry',
              NONE: 'none',
              CONNECTION_TIMEOUT: 60,
              DEFAULT_ENDPOINT: '/bayeux',
              INTERVAL: 0,
              initialize: function (e, t) {
                this.info('New client created for ?', e),
                  u((t = t || {}), [
                    'interval',
                    'timeout',
                    'endpoints',
                    'proxy',
                    'retry',
                    'scheduler',
                    'websocketExtensions',
                    'tls',
                    'ca',
                  ]),
                  (this._channels = new d.Set()),
                  (this._dispatcher = p.create(this, e || this.DEFAULT_ENDPOINT, t)),
                  (this._messageId = 0),
                  (this._state = this.UNCONNECTED),
                  (this._responseCallbacks = {}),
                  (this._advice = {
                    reconnect: this.RETRY,
                    interval: 1e3 * (t.interval || this.INTERVAL),
                    timeout: 1e3 * (t.timeout || this.CONNECTION_TIMEOUT),
                  }),
                  (this._dispatcher.timeout = this._advice.timeout / 1e3),
                  this._dispatcher.bind('message', this._receiveMessage, this),
                  o.Event &&
                    void 0 !== n.g.onbeforeunload &&
                    o.Event.on(
                      n.g,
                      'beforeunload',
                      function () {
                        s.indexOf(this._dispatcher._disabled, 'autodisconnect') < 0 && this.disconnect();
                      },
                      this,
                    );
              },
              addWebsocketExtension: function (e) {
                return this._dispatcher.addWebsocketExtension(e);
              },
              disable: function (e) {
                return this._dispatcher.disable(e);
              },
              setHeader: function (e, t) {
                return this._dispatcher.setHeader(e, t);
              },
              handshake: function (e, t) {
                if (this._advice.reconnect !== this.NONE && this._state === this.UNCONNECTED) {
                  this._state = this.CONNECTING;
                  var i = this;
                  this.info('Initiating handshake with ?', this._dispatcher.endpoint.href),
                    this._dispatcher.selectTransport(a.MANDATORY_CONNECTION_TYPES),
                    this._sendMessage(
                      {
                        channel: d.HANDSHAKE,
                        version: a.BAYEUX_VERSION,
                        supportedConnectionTypes: this._dispatcher.getConnectionTypes(),
                      },
                      {},
                      function (s) {
                        s.successful
                          ? ((this._state = this.CONNECTED),
                            (this._dispatcher.clientId = s.clientId),
                            this._dispatcher.selectTransport(s.supportedConnectionTypes),
                            this.info('Handshake successful: ?', this._dispatcher.clientId),
                            this.subscribe(this._channels.getKeys(), !0),
                            e &&
                              r(function () {
                                e.call(t);
                              }))
                          : (this.info('Handshake unsuccessful'),
                            n.g.setTimeout(function () {
                              i.handshake(e, t);
                            }, 1e3 * this._dispatcher.retry),
                            (this._state = this.UNCONNECTED));
                      },
                      this,
                    );
                }
              },
              connect: function (e, t) {
                if (this._advice.reconnect !== this.NONE && this._state !== this.DISCONNECTED) {
                  if (this._state === this.UNCONNECTED)
                    return this.handshake(function () {
                      this.connect(e, t);
                    }, this);
                  this.callback(e, t),
                    this._state === this.CONNECTED &&
                      (this.info('Calling deferred actions for ?', this._dispatcher.clientId),
                      this.setDeferredStatus('succeeded'),
                      this.setDeferredStatus('unknown'),
                      this._connectRequest ||
                        ((this._connectRequest = !0),
                        this.info('Initiating connection for ?', this._dispatcher.clientId),
                        this._sendMessage(
                          {
                            channel: d.CONNECT,
                            clientId: this._dispatcher.clientId,
                            connectionType: this._dispatcher.connectionType,
                          },
                          {},
                          this._cycleConnection,
                          this,
                        )));
                }
              },
              disconnect: function () {
                if (this._state === this.CONNECTED) {
                  (this._state = this.DISCONNECTED), this.info('Disconnecting ?', this._dispatcher.clientId);
                  var e = new g();
                  return (
                    this._sendMessage(
                      { channel: d.DISCONNECT, clientId: this._dispatcher.clientId },
                      {},
                      function (t) {
                        t.successful
                          ? (this._dispatcher.close(), e.setDeferredStatus('succeeded'))
                          : e.setDeferredStatus('failed', v.parse(t.error));
                      },
                      this,
                    ),
                    this.info('Clearing channel listeners for ?', this._dispatcher.clientId),
                    (this._channels = new d.Set()),
                    e
                  );
                }
              },
              subscribe: function (e, t, n) {
                if (e instanceof Array)
                  return s.map(
                    e,
                    function (e) {
                      return this.subscribe(e, t, n);
                    },
                    this,
                  );
                var r = new m(this, e, t, n),
                  i = !0 === t;
                return this._channels.hasSubscription(e) && !i
                  ? (this._channels.subscribe([e], r), r.setDeferredStatus('succeeded'), r)
                  : (this.connect(function () {
                      this.info('Client ? attempting to subscribe to ?', this._dispatcher.clientId, e),
                        i || this._channels.subscribe([e], r),
                        this._sendMessage(
                          { channel: d.SUBSCRIBE, clientId: this._dispatcher.clientId, subscription: e },
                          {},
                          function (t) {
                            if (!t.successful)
                              return r.setDeferredStatus('failed', v.parse(t.error)), this._channels.unsubscribe(e, r);
                            var n = [].concat(t.subscription);
                            this.info('Subscription acknowledged for ? to ?', this._dispatcher.clientId, n),
                              r.setDeferredStatus('succeeded');
                          },
                          this,
                        );
                    }, this),
                    r);
              },
              unsubscribe: function (e, t) {
                if (e instanceof Array)
                  return s.map(
                    e,
                    function (e) {
                      return this.unsubscribe(e, t);
                    },
                    this,
                  );
                this._channels.unsubscribe(e, t) &&
                  this.connect(function () {
                    this.info('Client ? attempting to unsubscribe from ?', this._dispatcher.clientId, e),
                      this._sendMessage(
                        { channel: d.UNSUBSCRIBE, clientId: this._dispatcher.clientId, subscription: e },
                        {},
                        function (e) {
                          if (e.successful) {
                            var t = [].concat(e.subscription);
                            this.info('Unsubscription acknowledged for ? from ?', this._dispatcher.clientId, t);
                          }
                        },
                        this,
                      );
                  }, this);
              },
              publish: function (e, t, n) {
                u(n || {}, ['attempts', 'deadline']);
                var r = new g();
                return (
                  this.connect(function () {
                    this.info('Client ? queueing published message to ?: ?', this._dispatcher.clientId, e, t),
                      this._sendMessage(
                        { channel: e, data: t, clientId: this._dispatcher.clientId },
                        n,
                        function (e) {
                          e.successful
                            ? r.setDeferredStatus('succeeded')
                            : r.setDeferredStatus('failed', v.parse(e.error));
                        },
                        this,
                      );
                  }, this),
                  r
                );
              },
              _sendMessage: function (e, t, n, r) {
                e.id = this._generateMessageId();
                var i = this._advice.timeout ? (1.2 * this._advice.timeout) / 1e3 : 1.2 * this._dispatcher.retry;
                this.pipeThroughExtensions(
                  'outgoing',
                  e,
                  null,
                  function (e) {
                    e && (n && (this._responseCallbacks[e.id] = [n, r]), this._dispatcher.sendMessage(e, i, t || {}));
                  },
                  this,
                );
              },
              _generateMessageId: function () {
                return (
                  (this._messageId += 1),
                  this._messageId >= Math.pow(2, 32) && (this._messageId = 0),
                  this._messageId.toString(36)
                );
              },
              _receiveMessage: function (e) {
                var t,
                  n = e.id;
                void 0 !== e.successful && ((t = this._responseCallbacks[n]), delete this._responseCallbacks[n]),
                  this.pipeThroughExtensions(
                    'incoming',
                    e,
                    null,
                    function (e) {
                      e && (e.advice && this._handleAdvice(e.advice), this._deliverMessage(e), t && t[0].call(t[1], e));
                    },
                    this,
                  );
              },
              _handleAdvice: function (e) {
                c(this._advice, e),
                  (this._dispatcher.timeout = this._advice.timeout / 1e3),
                  this._advice.reconnect === this.HANDSHAKE &&
                    this._state !== this.DISCONNECTED &&
                    ((this._state = this.UNCONNECTED), (this._dispatcher.clientId = null), this._cycleConnection());
              },
              _deliverMessage: function (e) {
                e.channel &&
                  void 0 !== e.data &&
                  (this.info('Client ? calling listeners for ? with ?', this._dispatcher.clientId, e.channel, e.data),
                  this._channels.distributeMessage(e));
              },
              _cycleConnection: function () {
                this._connectRequest &&
                  ((this._connectRequest = null), this.info('Closed connection for ?', this._dispatcher.clientId));
                var e = this;
                n.g.setTimeout(function () {
                  e.connect();
                }, this._advice.interval);
              },
            });
          c(_.prototype, l), c(_.prototype, f), c(_.prototype, h), c(_.prototype, y), (e.exports = _);
        },
        8854: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(280),
            s = n(3754),
            o = n(7088),
            a = n(8782),
            c = n(4909),
            u = n(4713),
            l = n(6148),
            h = r({
              className: 'Dispatcher',
              MAX_REQUEST_SIZE: 2048,
              DEFAULT_RETRY: 5,
              UP: 1,
              DOWN: 2,
              initialize: function (e, t, n) {
                (this._client = e),
                  (this.endpoint = i.parse(t)),
                  (this._alternates = n.endpoints || {}),
                  (this.cookies = s.CookieJar && new s.CookieJar()),
                  (this._disabled = []),
                  (this._envelopes = {}),
                  (this.headers = {}),
                  (this.retry = n.retry || this.DEFAULT_RETRY),
                  (this._scheduler = n.scheduler || l),
                  (this._state = 0),
                  (this.transports = {}),
                  (this.wsExtensions = []),
                  (this.proxy = n.proxy || {}),
                  'string' == typeof this._proxy && (this._proxy = { origin: this._proxy });
                var r = n.websocketExtensions;
                if (r) for (var o = 0, a = (r = [].concat(r)).length; o < a; o++) this.addWebsocketExtension(r[o]);
                for (var c in ((this.tls = n.tls || {}), (this.tls.ca = this.tls.ca || n.ca), this._alternates))
                  this._alternates[c] = i.parse(this._alternates[c]);
                this.maxRequestSize = this.MAX_REQUEST_SIZE;
              },
              endpointFor: function (e) {
                return this._alternates[e] || this.endpoint;
              },
              addWebsocketExtension: function (e) {
                this.wsExtensions.push(e);
              },
              disable: function (e) {
                this._disabled.push(e), u.disable(e);
              },
              setHeader: function (e, t) {
                this.headers[e] = t;
              },
              close: function () {
                var e = this._transport;
                delete this._transport, e && e.close();
              },
              getConnectionTypes: function () {
                return u.getConnectionTypes();
              },
              selectTransport: function (e) {
                u.get(
                  this,
                  e,
                  this._disabled,
                  function (e) {
                    this.debug('Selected ? transport for ?', e.connectionType, e.endpoint.href),
                      e !== this._transport &&
                        (this._transport && this._transport.close(),
                        (this._transport = e),
                        (this.connectionType = e.connectionType));
                  },
                  this,
                );
              },
              sendMessage: function (e, t, n) {
                n = n || {};
                var r,
                  i = e.id,
                  s = n.attempts,
                  o = n.deadline && new Date().getTime() + 1e3 * n.deadline,
                  a = this._envelopes[i];
                a ||
                  ((r = new this._scheduler(e, { timeout: t, interval: this.retry, attempts: s, deadline: o })),
                  (a = this._envelopes[i] = { message: e, scheduler: r })),
                  this._sendEnvelope(a);
              },
              _sendEnvelope: function (e) {
                if (this._transport && !e.request && !e.timer) {
                  var t = e.message,
                    r = e.scheduler,
                    i = this;
                  if (!r.isDeliverable()) return r.abort(), void delete this._envelopes[t.id];
                  (e.timer = n.g.setTimeout(function () {
                    i.handleError(t);
                  }, 1e3 * r.getTimeout())),
                    r.send(),
                    (e.request = this._transport.sendMessage(t));
                }
              },
              handleResponse: function (e) {
                var t = this._envelopes[e.id];
                void 0 !== e.successful &&
                  t &&
                  (t.scheduler.succeed(), delete this._envelopes[e.id], n.g.clearTimeout(t.timer)),
                  this.trigger('message', e),
                  this._state !== this.UP && ((this._state = this.UP), this._client.trigger('transport:up'));
              },
              handleError: function (e, t) {
                var r = this._envelopes[e.id],
                  i = r && r.request,
                  s = this;
                if (i) {
                  i.then(function (e) {
                    e && e.abort && e.abort();
                  });
                  var o = r.scheduler;
                  o.fail(),
                    n.g.clearTimeout(r.timer),
                    (r.request = r.timer = null),
                    t
                      ? this._sendEnvelope(r)
                      : (r.timer = n.g.setTimeout(function () {
                          (r.timer = null), s._sendEnvelope(r);
                        }, 1e3 * o.getInterval())),
                    this._state !== this.DOWN && ((this._state = this.DOWN), this._client.trigger('transport:down'));
                }
              },
            });
          (h.create = function (e, t, n) {
            return new h(e, t, n);
          }),
            o(h.prototype, c),
            o(h.prototype, a),
            (e.exports = h);
        },
        5656: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(4710),
            s = r({
              initialize: function (e, t, n) {
                (this.code = e), (this.params = Array.prototype.slice.call(t)), (this.message = n);
              },
              toString: function () {
                return this.code + ':' + this.params.join(',') + ':' + this.message;
              },
            });
          s.parse = function (e) {
            if (((e = e || ''), !i.ERROR.test(e))) return new s(null, [], e);
            var t = e.split(':'),
              n = parseInt(t[0]),
              r = t[1].split(',');
            return (e = t[2]), new s(n, r, e);
          };
          var o = {
            versionMismatch: [300, 'Version mismatch'],
            conntypeMismatch: [301, 'Connection types not supported'],
            extMismatch: [302, 'Extension mismatch'],
            badRequest: [400, 'Bad request'],
            clientUnknown: [401, 'Unknown client'],
            parameterMissing: [402, 'Missing required parameter'],
            channelForbidden: [403, 'Forbidden channel'],
            channelUnknown: [404, 'Unknown channel'],
            channelInvalid: [405, 'Invalid channel'],
            extUnknown: [406, 'Unknown extension'],
            publishFailed: [407, 'Failed to publish'],
            serverError: [500, 'Internal server error'],
          };
          for (var a in o)
            !(function (e) {
              s[e] = function () {
                return new s(o[e][0], arguments, o[e][1]).toString();
              };
            })(a);
          e.exports = s;
        },
        9983: (e, t, n) => {
          'use strict';
          var r = {
            addExtension: function (e) {
              (this._extensions = this._extensions || []), this._extensions.push(e), e.added && e.added(this);
            },
            removeExtension: function (e) {
              if (this._extensions)
                for (var t = this._extensions.length; t--; )
                  this._extensions[t] === e && (this._extensions.splice(t, 1), e.removed && e.removed(this));
            },
            pipeThroughExtensions: function (e, t, n, r, i) {
              if ((this.debug('Passing through ? extensions: ?', e, t), !this._extensions)) return r.call(i, t);
              var s = this._extensions.slice(),
                o = function (t) {
                  if (!t) return r.call(i, t);
                  var a = s.shift();
                  if (!a) return r.call(i, t);
                  var c = a[e];
                  if (!c) return o(t);
                  c.length >= 3 ? a[e](t, n, o) : a[e](t, o);
                };
              o(t);
            },
          };
          n(7088)(r, n(8782)), (e.exports = r);
        },
        4710: (e) => {
          'use strict';
          e.exports = {
            CHANNEL_NAME:
              /^\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*$/,
            CHANNEL_PATTERN: /^(\/(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)))+)*\/\*{1,2}$/,
            ERROR:
              /^([0-9][0-9][0-9]:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*(,(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)*:(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*|[0-9][0-9][0-9]::(((([a-z]|[A-Z])|[0-9])|(\-|\_|\!|\~|\(|\)|\$|\@)| |\/|\*|\.))*)$/,
            VERSION: /^([0-9])+(\.(([a-z]|[A-Z])|[0-9])(((([a-z]|[A-Z])|[0-9])|\-|\_))*)*$/,
          };
        },
        4347: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(5890);
          e.exports = r(i);
        },
        6148: (e, t, n) => {
          'use strict';
          var r = function (e, t) {
            (this.message = e), (this.options = t), (this.attempts = 0);
          };
          n(7088)(r.prototype, {
            getTimeout: function () {
              return this.options.timeout;
            },
            getInterval: function () {
              return this.options.interval;
            },
            isDeliverable: function () {
              var e = this.options.attempts,
                t = this.attempts,
                n = this.options.deadline,
                r = new Date().getTime();
              return !((void 0 !== e && t >= e) || (void 0 !== n && r > n));
            },
            send: function () {
              this.attempts += 1;
            },
            succeed: function () {},
            fail: function () {},
            abort: function () {},
          }),
            (e.exports = r);
        },
        5740: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(7088),
            s = n(5890),
            o = r({
              initialize: function (e, t, n, r) {
                (this._client = e),
                  (this._channels = t),
                  (this._callback = n),
                  (this._context = r),
                  (this._cancelled = !1);
              },
              withChannel: function (e, t) {
                return (this._withChannel = [e, t]), this;
              },
              apply: function (e, t) {
                var n = t[0];
                this._callback && this._callback.call(this._context, n.data),
                  this._withChannel && this._withChannel[0].call(this._withChannel[1], n.channel, n.data);
              },
              cancel: function () {
                this._cancelled || (this._client.unsubscribe(this._channels, this), (this._cancelled = !0));
              },
              unsubscribe: function () {
                this.cancel();
              },
            });
          i(o.prototype, s), (e.exports = o);
        },
        4713: (e, t, n) => {
          'use strict';
          var r = n(2195);
          r.register('websocket', n(5182)),
            r.register('eventsource', n(9591)),
            r.register('long-polling', n(3611)),
            r.register('cross-origin-long-polling', n(7045)),
            r.register('callback-polling', n(7890)),
            (e.exports = r);
        },
        7045: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(8172),
            s = n(280),
            o = n(7088),
            a = n(9457),
            c = o(
              r(n(2195), {
                encode: function (e) {
                  return 'message=' + encodeURIComponent(a(e));
                },
                request: function (e) {
                  var t,
                    r = n.g.XDomainRequest ? XDomainRequest : XMLHttpRequest,
                    i = new r(),
                    s = ++c._id,
                    o = this._dispatcher.headers,
                    a = this;
                  if ((i.open('POST', this.endpoint.href, !0), (i.withCredentials = !0), i.setRequestHeader))
                    for (t in (i.setRequestHeader('Pragma', 'no-cache'), o))
                      o.hasOwnProperty(t) && i.setRequestHeader(t, o[t]);
                  var u = function () {
                    if (!i) return !1;
                    c._pending.remove(s), (i.onload = i.onerror = i.ontimeout = i.onprogress = null), (i = null);
                  };
                  return (
                    (i.onload = function () {
                      var t;
                      try {
                        t = JSON.parse(i.responseText);
                      } catch (e) {}
                      u(), t ? a._receive(t) : a._handleError(e);
                    }),
                    (i.onerror = i.ontimeout =
                      function () {
                        u(), a._handleError(e);
                      }),
                    (i.onprogress = function () {}),
                    r === n.g.XDomainRequest && c._pending.add({ id: s, xhr: i }),
                    i.send(this.encode(e)),
                    i
                  );
                },
              }),
              {
                _id: 0,
                _pending: new i(),
                isUsable: function (e, t, r, i) {
                  if (s.isSameOrigin(t)) return r.call(i, !1);
                  if (n.g.XDomainRequest) return r.call(i, t.protocol === location.protocol);
                  if (n.g.XMLHttpRequest) {
                    var o = new XMLHttpRequest();
                    return r.call(i, void 0 !== o.withCredentials);
                  }
                  return r.call(i, !1);
                },
              },
            );
          e.exports = c;
        },
        9591: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(280),
            s = n(172),
            o = n(7088),
            a = n(5890),
            c = n(2195),
            u = n(3611),
            l = o(
              r(c, {
                initialize: function (e, t) {
                  if ((c.prototype.initialize.call(this, e, t), !n.g.EventSource))
                    return this.setDeferredStatus('failed');
                  (this._xhr = new u(e, t)), ((t = s(t)).pathname += '/' + e.clientId);
                  var r = new n.g.EventSource(i.stringify(t)),
                    o = this;
                  (r.onopen = function () {
                    (o._everConnected = !0), o.setDeferredStatus('succeeded');
                  }),
                    (r.onerror = function () {
                      o._everConnected ? o._handleError([]) : (o.setDeferredStatus('failed'), r.close());
                    }),
                    (r.onmessage = function (e) {
                      var t;
                      try {
                        t = JSON.parse(e.data);
                      } catch (e) {}
                      t ? o._receive(t) : o._handleError([]);
                    }),
                    (this._socket = r);
                },
                close: function () {
                  this._socket &&
                    ((this._socket.onopen = this._socket.onerror = this._socket.onmessage = null),
                    this._socket.close(),
                    delete this._socket);
                },
                isUsable: function (e, t) {
                  this.callback(function () {
                    e.call(t, !0);
                  }),
                    this.errback(function () {
                      e.call(t, !1);
                    });
                },
                encode: function (e) {
                  return this._xhr.encode(e);
                },
                request: function (e) {
                  return this._xhr.request(e);
                },
              }),
              {
                isUsable: function (e, t, n, r) {
                  if (!e.clientId) return n.call(r, !1);
                  u.isUsable(
                    e,
                    t,
                    function (i) {
                      if (!i) return n.call(r, !1);
                      this.create(e, t).isUsable(n, r);
                    },
                    this,
                  );
                },
                create: function (e, t) {
                  var n = (e.transports.eventsource = e.transports.eventsource || {}),
                    r = e.clientId,
                    o = s(t);
                  return (o.pathname += '/' + (r || '')), (n[(o = i.stringify(o))] = n[o] || new this(e, t)), n[o];
                },
              },
            );
          o(l.prototype, a), (e.exports = l);
        },
        7890: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(280),
            s = n(172),
            o = n(7088),
            a = n(9457),
            c = o(
              r(n(2195), {
                encode: function (e) {
                  var t = s(this.endpoint);
                  return (t.query.message = a(e)), (t.query.jsonp = '__jsonp' + c._cbCount + '__'), i.stringify(t);
                },
                request: function (e) {
                  var t = document.getElementsByTagName('head')[0],
                    r = document.createElement('script'),
                    o = c.getCallbackName(),
                    u = s(this.endpoint),
                    l = this;
                  (u.query.message = a(e)), (u.query.jsonp = o);
                  var h = function () {
                    if (!n.g[o]) return !1;
                    n.g[o] = void 0;
                    try {
                      delete n.g[o];
                    } catch (e) {}
                    r.parentNode.removeChild(r);
                  };
                  return (
                    (n.g[o] = function (e) {
                      h(), l._receive(e);
                    }),
                    (r.type = 'text/javascript'),
                    (r.src = i.stringify(u)),
                    t.appendChild(r),
                    (r.onerror = function () {
                      h(), l._handleError(e);
                    }),
                    { abort: h }
                  );
                },
              }),
              {
                _cbCount: 0,
                getCallbackName: function () {
                  return (this._cbCount += 1), '__jsonp' + this._cbCount + '__';
                },
                isUsable: function (e, t, n, r) {
                  n.call(r, !0);
                },
              },
            );
          e.exports = c;
        },
        2195: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(3754).Cookie,
            s = n(4857),
            o = n(8722),
            a = n(7088),
            c = n(8782),
            u = n(2840),
            l = n(1762),
            h = a(
              r({
                className: 'Transport',
                DEFAULT_PORTS: { 'http:': 80, 'https:': 443, 'ws:': 80, 'wss:': 443 },
                MAX_DELAY: 0,
                batching: !0,
                initialize: function (e, t) {
                  (this._dispatcher = e),
                    (this.endpoint = t),
                    (this._outbox = []),
                    (this._proxy = a({}, this._dispatcher.proxy)),
                    this._proxy.origin || (this._proxy.origin = this._findProxy());
                },
                close: function () {},
                encode: function (e) {
                  return '';
                },
                sendMessage: function (e) {
                  return (
                    this.debug('Client ? sending message to ?: ?', this._dispatcher.clientId, this.endpoint.href, e),
                    this.batching
                      ? (this._outbox.push(e),
                        this._flushLargeBatch(),
                        e.channel === l.HANDSHAKE
                          ? this._publish(0.01)
                          : (e.channel === l.CONNECT && (this._connectMessage = e), this._publish(this.MAX_DELAY)))
                      : s.resolve(this.request([e]))
                  );
                },
                _makePromise: function () {
                  var e = this;
                  this._requestPromise =
                    this._requestPromise ||
                    new s(function (t) {
                      e._resolvePromise = t;
                    });
                },
                _publish: function (e) {
                  return (
                    this._makePromise(),
                    this.addTimeout(
                      'publish',
                      e,
                      function () {
                        this._flush(), delete this._requestPromise;
                      },
                      this,
                    ),
                    this._requestPromise
                  );
                },
                _flush: function () {
                  this.removeTimeout('publish'),
                    this._outbox.length > 1 && this._connectMessage && (this._connectMessage.advice = { timeout: 0 }),
                    this._resolvePromise(this.request(this._outbox)),
                    (this._connectMessage = null),
                    (this._outbox = []);
                },
                _flushLargeBatch: function () {
                  if (!(this.encode(this._outbox).length < this._dispatcher.maxRequestSize)) {
                    var e = this._outbox.pop();
                    this._makePromise(), this._flush(), e && this._outbox.push(e);
                  }
                },
                _receive: function (e) {
                  if (e) {
                    (e = [].concat(e)),
                      this.debug(
                        'Client ? received from ? via ?: ?',
                        this._dispatcher.clientId,
                        this.endpoint.href,
                        this.connectionType,
                        e,
                      );
                    for (var t = 0, n = e.length; t < n; t++) this._dispatcher.handleResponse(e[t]);
                  }
                },
                _handleError: function (e, t) {
                  (e = [].concat(e)),
                    this.debug(
                      'Client ? failed to send to ? via ?: ?',
                      this._dispatcher.clientId,
                      this.endpoint.href,
                      this.connectionType,
                      e,
                    );
                  for (var n = 0, r = e.length; n < r; n++) this._dispatcher.handleError(e[n]);
                },
                _getCookies: function () {
                  var e = this._dispatcher.cookies,
                    t = this.endpoint.href;
                  return e
                    ? o
                        .map(e.getCookiesSync(t), function (e) {
                          return e.cookieString();
                        })
                        .join('; ')
                    : '';
                },
                _storeCookies: function (e) {
                  var t,
                    n = this._dispatcher.cookies,
                    r = this.endpoint.href;
                  if (e && n)
                    for (var s = 0, o = (e = [].concat(e)).length; s < o; s++)
                      (t = i.parse(e[s])), n.setCookieSync(t, r);
                },
                _findProxy: function () {
                  if ('undefined' != typeof process) {
                    var e = this.endpoint.protocol;
                    if (e) {
                      var t,
                        n,
                        r = e.replace(/:$/, '').toLowerCase() + '_proxy',
                        i = r.toUpperCase(),
                        s = process.env;
                      return (
                        'http_proxy' === r && s.REQUEST_METHOD
                          ? (1 ===
                            (t = Object.keys(s).filter(function (e) {
                              return /^http_proxy$/i.test(e);
                            })).length
                              ? t[0] === r && void 0 === s[i] && (n = s[r])
                              : t.length > 1 && (n = s[r]),
                            (n = n || s['CGI_' + i]))
                          : (n = s[r] || s[i]) &&
                            !s[r] &&
                            console.warn('The environment variable ' + i + ' is discouraged. Use ' + r + '.'),
                        n
                      );
                    }
                  }
                },
              }),
              {
                get: function (e, t, n, r, i) {
                  var s = e.endpoint;
                  o.asyncEach(
                    this._transports,
                    function (s, a) {
                      var c = s[0],
                        u = s[1],
                        l = e.endpointFor(c);
                      return o.indexOf(n, c) >= 0
                        ? a()
                        : o.indexOf(t, c) < 0
                        ? (u.isUsable(e, l, function () {}), a())
                        : void u.isUsable(e, l, function (t) {
                            if (!t) return a();
                            var n = u.hasOwnProperty('create') ? u.create(e, l) : new u(e, l);
                            r.call(i, n);
                          });
                    },
                    function () {
                      throw new Error('Could not find a usable connection type for ' + s.href);
                    },
                  );
                },
                register: function (e, t) {
                  this._transports.push([e, t]), (t.prototype.connectionType = e);
                },
                getConnectionTypes: function () {
                  return o.map(this._transports, function (e) {
                    return e[0];
                  });
                },
                disable: function (e) {
                  if ('autodisconnect' === e)
                    for (var t = 0; t < this._transports.length; t++) this._transports[t][1]._unloaded = !1;
                },
                _transports: [],
              },
            );
          a(h.prototype, c), a(h.prototype, u), (e.exports = h);
        },
        5182: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(4857),
            s = n(8172),
            o = n(280),
            a = n(8375),
            c = n(172),
            u = n(7088),
            l = n(9457),
            h = n(5003),
            f = n(5890),
            d = u(
              r(n(2195), {
                UNCONNECTED: 1,
                CONNECTING: 2,
                CONNECTED: 3,
                batching: !1,
                isUsable: function (e, t) {
                  this.callback(function () {
                    e.call(t, !0);
                  }),
                    this.errback(function () {
                      e.call(t, !1);
                    }),
                    this.connect();
                },
                request: function (e) {
                  this._pending = this._pending || new s();
                  for (var t = 0, n = e.length; t < n; t++) this._pending.add(e[t]);
                  var r = this,
                    o = new i(function (t, n) {
                      r.callback(function (n) {
                        n && 1 === n.readyState && (n.send(l(e)), t(n));
                      }),
                        r.connect();
                    });
                  return {
                    abort: function () {
                      o.then(function (e) {
                        e.close();
                      });
                    },
                  };
                },
                connect: function () {
                  if (
                    !d._unloaded &&
                    ((this._state = this._state || this.UNCONNECTED), this._state === this.UNCONNECTED)
                  ) {
                    this._state = this.CONNECTING;
                    var e = this._createSocket();
                    if (!e) return this.setDeferredStatus('failed');
                    var t = this;
                    e.onopen = function () {
                      e.headers && t._storeCookies(e.headers['set-cookie']),
                        (t._socket = e),
                        (t._state = t.CONNECTED),
                        (t._everConnected = !0),
                        t.setDeferredStatus('succeeded', e);
                    };
                    var n = !1;
                    (e.onclose = e.onerror =
                      function () {
                        if (!n) {
                          n = !0;
                          var r = t._state === t.CONNECTED;
                          (e.onopen = e.onclose = e.onerror = e.onmessage = null),
                            delete t._socket,
                            (t._state = t.UNCONNECTED);
                          var i = t._pending ? t._pending.toArray() : [];
                          delete t._pending,
                            r || t._everConnected
                              ? (t.setDeferredStatus('unknown'), t._handleError(i, r))
                              : t.setDeferredStatus('failed');
                        }
                      }),
                      (e.onmessage = function (e) {
                        var n;
                        try {
                          n = JSON.parse(e.data);
                        } catch (e) {}
                        if (n) {
                          for (var r = 0, i = (n = [].concat(n)).length; r < i; r++)
                            void 0 !== n[r].successful && t._pending.remove(n[r]);
                          t._receive(n);
                        }
                      });
                  }
                },
                close: function () {
                  this._socket && this._socket.close();
                },
                _createSocket: function () {
                  var e = d.getSocketUrl(this.endpoint),
                    t = this._dispatcher.headers,
                    n = this._dispatcher.wsExtensions,
                    r = this._getCookies(),
                    i = this._dispatcher.tls,
                    s = { extensions: n, headers: t, proxy: this._proxy, tls: i };
                  '' !== r && (s.headers.Cookie = r);
                  try {
                    return h.create(e, [], s);
                  } catch (e) {}
                },
              }),
              {
                PROTOCOLS: { 'http:': 'ws:', 'https:': 'wss:' },
                create: function (e, t) {
                  var n = (e.transports.websocket = e.transports.websocket || {});
                  return (n[t.href] = n[t.href] || new this(e, t)), n[t.href];
                },
                getSocketUrl: function (e) {
                  return ((e = c(e)).protocol = this.PROTOCOLS[e.protocol]), o.stringify(e);
                },
                isUsable: function (e, t, n, r) {
                  this.create(e, t).isUsable(n, r);
                },
              },
            );
          u(d.prototype, f),
            a.Event &&
              void 0 !== n.g.onbeforeunload &&
              a.Event.on(n.g, 'beforeunload', function () {
                void 0 === d._unloaded && (d._unloaded = !0);
              }),
            (e.exports = d);
        },
        3611: (e, t, n) => {
          'use strict';
          var r = n(8702),
            i = n(280),
            s = n(8375),
            o = n(7088),
            a = n(9457),
            c = o(
              r(n(2195), {
                encode: function (e) {
                  return a(e);
                },
                request: function (e) {
                  var t,
                    r = this.endpoint.href,
                    i = this;
                  if (n.g.XMLHttpRequest) t = new XMLHttpRequest();
                  else {
                    if (!n.g.ActiveXObject) return this._handleError(e);
                    t = new ActiveXObject('Microsoft.XMLHTTP');
                  }
                  t.open('POST', r, !0),
                    t.setRequestHeader('Content-Type', 'application/json'),
                    t.setRequestHeader('Pragma', 'no-cache'),
                    t.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                  var o = this._dispatcher.headers;
                  for (var a in o) o.hasOwnProperty(a) && t.setRequestHeader(a, o[a]);
                  var c = function () {
                    t.abort();
                  };
                  return (
                    void 0 !== n.g.onbeforeunload && s.Event.on(n.g, 'beforeunload', c),
                    (t.onreadystatechange = function () {
                      if (t && 4 === t.readyState) {
                        var r = null,
                          o = t.status,
                          a = t.responseText,
                          u = (o >= 200 && o < 300) || 304 === o || 1223 === o;
                        if (
                          (void 0 !== n.g.onbeforeunload && s.Event.detach(n.g, 'beforeunload', c),
                          (t.onreadystatechange = function () {}),
                          (t = null),
                          !u)
                        )
                          return i._handleError(e);
                        try {
                          r = JSON.parse(a);
                        } catch (e) {}
                        r ? i._receive(r) : i._handleError(e);
                      }
                    }),
                    t.send(this.encode(e)),
                    t
                  );
                },
              }),
              {
                isUsable: function (e, t, n, r) {
                  var s = 'ReactNative' === navigator.product || i.isSameOrigin(t);
                  n.call(r, s);
                },
              },
            );
          e.exports = c;
        },
        8722: (e) => {
          'use strict';
          e.exports = {
            commonElement: function (e, t) {
              for (var n = 0, r = e.length; n < r; n++) if (-1 !== this.indexOf(t, e[n])) return e[n];
              return null;
            },
            indexOf: function (e, t) {
              if (e.indexOf) return e.indexOf(t);
              for (var n = 0, r = e.length; n < r; n++) if (e[n] === t) return n;
              return -1;
            },
            map: function (e, t, n) {
              if (e.map) return e.map(t, n);
              var r = [];
              if (e instanceof Array) for (var i = 0, s = e.length; i < s; i++) r.push(t.call(n || null, e[i], i));
              else for (var o in e) e.hasOwnProperty(o) && r.push(t.call(n || null, o, e[o]));
              return r;
            },
            filter: function (e, t, n) {
              if (e.filter) return e.filter(t, n);
              for (var r = [], i = 0, s = e.length; i < s; i++) t.call(n || null, e[i], i) && r.push(e[i]);
              return r;
            },
            asyncEach: function (e, t, n, r) {
              var i = e.length,
                s = -1,
                o = 0,
                a = !1,
                c = function () {
                  if (((o -= 1), (s += 1) === i)) return n && n.call(r);
                  t(e[s], u);
                },
                u = function () {
                  (o += 1),
                    (function () {
                      if (!a) {
                        for (a = !0; o > 0; ) c();
                        a = !1;
                      }
                    })();
                };
              u();
            },
          };
        },
        7088: (e) => {
          'use strict';
          var t = Array.prototype.forEach,
            n = Object.prototype.hasOwnProperty;
          e.exports = function (e) {
            return (
              t.call(arguments, function (t, r) {
                if (0 !== r) for (var i in t) n.call(t, i) && (e[i] = t[i]);
              }),
              e
            );
          };
        },
        8375: (e, t, n) => {
          'use strict';
          var r = {
            _registry: [],
            on: function (e, t, n, r) {
              var i = function () {
                n.call(r);
              };
              e.addEventListener ? e.addEventListener(t, i, !1) : e.attachEvent('on' + t, i),
                this._registry.push({ _element: e, _type: t, _callback: n, _context: r, _handler: i });
            },
            detach: function (e, t, n, r) {
              for (var i, s = this._registry.length; s--; )
                (i = this._registry[s]),
                  (e && e !== i._element) ||
                    (t && t !== i._type) ||
                    (n && n !== i._callback) ||
                    (r && r !== i._context) ||
                    (i._element.removeEventListener
                      ? i._element.removeEventListener(i._type, i._handler, !1)
                      : i._element.detachEvent('on' + i._type, i._handler),
                    this._registry.splice(s, 1),
                    (i = null));
            },
          };
          void 0 !== n.g.onunload && r.on(n.g, 'unload', r.detach, r), (e.exports = { Event: r });
        },
        8702: (e, t, n) => {
          'use strict';
          var r = n(7088);
          e.exports = function (e, t) {
            'function' != typeof e && ((t = e), (e = Object));
            var n = function () {
                return (this.initialize && this.initialize.apply(this, arguments)) || this;
              },
              i = function () {};
            return (i.prototype = e.prototype), (n.prototype = new i()), r(n.prototype, t), n;
          };
        },
        8742: (e) => {
          e.exports = {
            VERSION: '1.4.0',
            BAYEUX_VERSION: '1.0',
            ID_LENGTH: 160,
            JSONP_CALLBACK: 'jsonpcallback',
            CONNECTION_TYPES: [
              'long-polling',
              'cross-origin-long-polling',
              'callback-polling',
              'websocket',
              'eventsource',
              'in-process',
            ],
            MANDATORY_CONNECTION_TYPES: ['long-polling', 'callback-polling', 'in-process'],
          };
        },
        3754: (e) => {
          'use strict';
          e.exports = {};
        },
        172: (e) => {
          'use strict';
          var t = function (e) {
            var n, r, i;
            if (e instanceof Array) {
              for (n = [], r = e.length; r--; ) n[r] = t(e[r]);
              return n;
            }
            if ('object' == typeof e) {
              for (i in ((n = null === e ? null : {}), e)) n[i] = t(e[i]);
              return n;
            }
            return e;
          };
          e.exports = t;
        },
        2356: (e) => {
          var t =
            'function' == typeof Array.isArray
              ? Array.isArray
              : function (e) {
                  return '[object Array]' === Object.prototype.toString.call(e);
                };
          function n() {}
          (e.exports = n),
            (n.prototype.emit = function (e) {
              if (
                'error' === e &&
                (!this._events || !this._events.error || (t(this._events.error) && !this._events.error.length))
              )
                throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
              if (!this._events) return !1;
              var n = this._events[e];
              if (!n) return !1;
              if ('function' == typeof n) {
                switch (arguments.length) {
                  case 1:
                    n.call(this);
                    break;
                  case 2:
                    n.call(this, arguments[1]);
                    break;
                  case 3:
                    n.call(this, arguments[1], arguments[2]);
                    break;
                  default:
                    var r = Array.prototype.slice.call(arguments, 1);
                    n.apply(this, r);
                }
                return !0;
              }
              if (t(n)) {
                r = Array.prototype.slice.call(arguments, 1);
                for (var i = n.slice(), s = 0, o = i.length; s < o; s++) i[s].apply(this, r);
                return !0;
              }
              return !1;
            }),
            (n.prototype.addListener = function (e, n) {
              if ('function' != typeof n) throw new Error('addListener only takes instances of Function');
              return (
                this._events || (this._events = {}),
                this.emit('newListener', e, n),
                this._events[e]
                  ? t(this._events[e])
                    ? this._events[e].push(n)
                    : (this._events[e] = [this._events[e], n])
                  : (this._events[e] = n),
                this
              );
            }),
            (n.prototype.on = n.prototype.addListener),
            (n.prototype.once = function (e, t) {
              var n = this;
              return (
                n.on(e, function r() {
                  n.removeListener(e, r), t.apply(this, arguments);
                }),
                this
              );
            }),
            (n.prototype.removeListener = function (e, n) {
              if ('function' != typeof n) throw new Error('removeListener only takes instances of Function');
              if (!this._events || !this._events[e]) return this;
              var r = this._events[e];
              if (t(r)) {
                var i = (function (e, t) {
                  if (e.indexOf) return e.indexOf(t);
                  for (var n = 0; n < e.length; n++) if (t === e[n]) return n;
                  return -1;
                })(r, n);
                if (i < 0) return this;
                r.splice(i, 1), 0 == r.length && delete this._events[e];
              } else this._events[e] === n && delete this._events[e];
              return this;
            }),
            (n.prototype.removeAllListeners = function (e) {
              return 0 === arguments.length
                ? ((this._events = {}), this)
                : (e && this._events && this._events[e] && (this._events[e] = null), this);
            }),
            (n.prototype.listeners = function (e) {
              return (
                this._events || (this._events = {}),
                this._events[e] || (this._events[e] = []),
                t(this._events[e]) || (this._events[e] = [this._events[e]]),
                this._events[e]
              );
            });
        },
        4857: (e, t, n) => {
          'use strict';
          var r = n(9272),
            i = function (e) {
              (this._state = -1), (this._value = null), (this._defer = []), s(this, e);
            };
          (i.prototype.then = function (e, t) {
            var n = new i(),
              r = { promise: n, onFulfilled: e, onRejected: t };
            return -1 === this._state ? this._defer.push(r) : o(this, r), n;
          }),
            (i.prototype.catch = function (e) {
              return this.then(null, e);
            });
          var s = function (e, t) {
              if ('function' == typeof t) {
                var n = 0,
                  r = function (t) {
                    0 == n++ && l(e, t);
                  };
                try {
                  t(function (t) {
                    0 == n++ && a(e, t);
                  }, r);
                } catch (e) {
                  r(e);
                }
              }
            },
            o = function (e, t) {
              var n = e._state,
                i = e._value,
                s = t.promise,
                o = [t.onFulfilled, t.onRejected][n];
              if ('function' != typeof o) return (0, [a, l][n])(s, i);
              r(function () {
                try {
                  a(s, o(i));
                } catch (e) {
                  l(s, e);
                }
              });
            },
            a = function (e, t) {
              if (e === t) return l(e, new TypeError('Recursive promise chain detected'));
              var n;
              try {
                n = c(t);
              } catch (t) {
                return l(e, t);
              }
              if (!n) return u(e, t);
              s(e, function (e, r) {
                n.call(t, e, r);
              });
            },
            c = function (e) {
              var t = typeof e,
                n = ('object' === t || 'function' === t) && e && e.then;
              return 'function' == typeof n ? n : null;
            },
            u = function (e, t) {
              h(e, 0, t);
            },
            l = function (e, t) {
              h(e, 1, t);
            },
            h = function (e, t, n) {
              var r = e._defer,
                i = 0;
              if (((e._state = t), (e._value = n), (e._defer = null), 0 !== r.length))
                for (; i < r.length; ) o(e, r[i++]);
            };
          (i.resolve = function (e) {
            try {
              if (c(e)) return e;
            } catch (e) {
              return i.reject(e);
            }
            return new i(function (t, n) {
              t(e);
            });
          }),
            (i.reject = function (e) {
              return new i(function (t, n) {
                n(e);
              });
            }),
            (i.all = function (e) {
              return new i(function (t, n) {
                var r,
                  s = [],
                  o = e.length;
                if (0 === o) return t(s);
                var a = function (e, r) {
                  i.resolve(e).then(function (e) {
                    (s[r] = e), 0 == --o && t(s);
                  }, n);
                };
                for (r = 0; r < o; r++) a(e[r], r);
              });
            }),
            (i.race = function (e) {
              return new i(function (t, n) {
                for (var r = 0, s = e.length; r < s; r++) i.resolve(e[r]).then(t, n);
              });
            }),
            (i.deferred = function () {
              var e = {};
              return (
                (e.promise = new i(function (t, n) {
                  (e.resolve = t), (e.reject = n);
                })),
                e
              );
            }),
            (e.exports = i);
        },
        8172: (e, t, n) => {
          'use strict';
          var r = n(8702);
          e.exports = r({
            initialize: function () {
              this._index = {};
            },
            add: function (e) {
              var t = void 0 !== e.id ? e.id : e;
              return !this._index.hasOwnProperty(t) && ((this._index[t] = e), !0);
            },
            forEach: function (e, t) {
              for (var n in this._index) this._index.hasOwnProperty(n) && e.call(t, this._index[n]);
            },
            isEmpty: function () {
              for (var e in this._index) if (this._index.hasOwnProperty(e)) return !1;
              return !0;
            },
            member: function (e) {
              for (var t in this._index) if (this._index[t] === e) return !0;
              return !1;
            },
            remove: function (e) {
              var t = void 0 !== e.id ? e.id : e,
                n = this._index[t];
              return delete this._index[t], n;
            },
            toArray: function () {
              var e = [];
              return (
                this.forEach(function (t) {
                  e.push(t);
                }),
                e
              );
            },
          });
        },
        9457: (e) => {
          'use strict';
          e.exports = function (e) {
            return JSON.stringify(e, function (e, t) {
              return this[e] instanceof Array ? this[e] : t;
            });
          };
        },
        280: (e) => {
          'use strict';
          e.exports = {
            isURI: function (e) {
              return e && e.protocol && e.host && e.path;
            },
            isSameOrigin: function (e) {
              return e.protocol === location.protocol && e.hostname === location.hostname && e.port === location.port;
            },
            parse: function (e) {
              if ('string' != typeof e) return e;
              var t,
                n,
                r,
                i,
                s,
                o,
                a = {},
                c = function (t, n) {
                  (e = e.replace(n, function (e) {
                    return (a[t] = e), '';
                  })),
                    (a[t] = a[t] || '');
                };
              for (
                c('protocol', /^[a-z]+\:/i),
                  c('host', /^\/\/[^\/\?#]+/),
                  /^\//.test(e) || a.host || (e = location.pathname.replace(/[^\/]*$/, '') + e),
                  c('pathname', /^[^\?#]*/),
                  c('search', /^\?[^#]*/),
                  c('hash', /^#.*/),
                  a.protocol = a.protocol || location.protocol,
                  a.host
                    ? ((a.host = a.host.substr(2)),
                      /@/.test(a.host) && ((a.auth = a.host.split('@')[0]), (a.host = a.host.split('@')[1])),
                      (t = a.host.match(/^\[([^\]]+)\]|^[^:]+/)),
                      (a.hostname = t[1] || t[0]),
                      (a.port = (a.host.match(/:(\d+)$/) || [])[1] || ''))
                    : ((a.host = location.host), (a.hostname = location.hostname), (a.port = location.port)),
                  a.pathname = a.pathname || '/',
                  a.path = a.pathname + a.search,
                  o = {},
                  i = 0,
                  s = (r = (n = a.search.replace(/^\?/, '')) ? n.split('&') : []).length;
                i < s;
                i++
              )
                (t = r[i].split('=')), (o[decodeURIComponent(t[0] || '')] = decodeURIComponent(t[1] || ''));
              return (a.query = o), (a.href = this.stringify(a)), a;
            },
            stringify: function (e) {
              var t = e.auth ? e.auth + '@' : '';
              return e.protocol + '//' + t + e.host + (e.pathname + this.queryString(e.query) + (e.hash || ''));
            },
            queryString: function (e) {
              var t = [];
              for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + '=' + encodeURIComponent(e[n]));
              return 0 === t.length ? '' : '?' + t.join('&');
            },
          };
        },
        3978: (e, t, n) => {
          'use strict';
          var r = n(8722);
          e.exports = function (e, t) {
            for (var n in e) if (r.indexOf(t, n) < 0) throw new Error('Unrecognized option: ' + n);
          };
        },
        5003: (e, t, n) => {
          'use strict';
          var r = n.g.MozWebSocket || n.g.WebSocket;
          e.exports = {
            create: function (e, t, n) {
              return 'function' != typeof r ? null : new r(e);
            },
          };
        },
        6230: (e) => {
          e.exports = 'object' == typeof self ? self.FormData : window.FormData;
        },
        6793: () => {},
        7496: () => {},
        5666: (e) => {
          var t = (function (e) {
            'use strict';
            var t,
              n = Object.prototype,
              r = n.hasOwnProperty,
              i = 'function' == typeof Symbol ? Symbol : {},
              s = i.iterator || '@@iterator',
              o = i.asyncIterator || '@@asyncIterator',
              a = i.toStringTag || '@@toStringTag';
            function c(e, t, n) {
              return Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }), e[t];
            }
            try {
              c({}, '');
            } catch (e) {
              c = function (e, t, n) {
                return (e[t] = n);
              };
            }
            function u(e, t, n, r) {
              var i = t && t.prototype instanceof y ? t : y,
                s = Object.create(i.prototype),
                o = new C(r || []);
              return (
                (s._invoke = (function (e, t, n) {
                  var r = h;
                  return function (i, s) {
                    if (r === d) throw new Error('Generator is already running');
                    if (r === p) {
                      if ('throw' === i) throw s;
                      return j();
                    }
                    for (n.method = i, n.arg = s; ; ) {
                      var o = n.delegate;
                      if (o) {
                        var a = O(o, n);
                        if (a) {
                          if (a === v) continue;
                          return a;
                        }
                      }
                      if ('next' === n.method) n.sent = n._sent = n.arg;
                      else if ('throw' === n.method) {
                        if (r === h) throw ((r = p), n.arg);
                        n.dispatchException(n.arg);
                      } else 'return' === n.method && n.abrupt('return', n.arg);
                      r = d;
                      var c = l(e, t, n);
                      if ('normal' === c.type) {
                        if (((r = n.done ? p : f), c.arg === v)) continue;
                        return { value: c.arg, done: n.done };
                      }
                      'throw' === c.type && ((r = p), (n.method = 'throw'), (n.arg = c.arg));
                    }
                  };
                })(e, n, o)),
                s
              );
            }
            function l(e, t, n) {
              try {
                return { type: 'normal', arg: e.call(t, n) };
              } catch (e) {
                return { type: 'throw', arg: e };
              }
            }
            e.wrap = u;
            var h = 'suspendedStart',
              f = 'suspendedYield',
              d = 'executing',
              p = 'completed',
              v = {};
            function y() {}
            function g() {}
            function m() {}
            var _ = {};
            _[s] = function () {
              return this;
            };
            var b = Object.getPrototypeOf,
              w = b && b(b(A([])));
            w && w !== n && r.call(w, s) && (_ = w);
            var k = (m.prototype = y.prototype = Object.create(_));
            function E(e) {
              ['next', 'throw', 'return'].forEach(function (t) {
                c(e, t, function (e) {
                  return this._invoke(t, e);
                });
              });
            }
            function x(e, t) {
              function n(i, s, o, a) {
                var c = l(e[i], e, s);
                if ('throw' !== c.type) {
                  var u = c.arg,
                    h = u.value;
                  return h && 'object' == typeof h && r.call(h, '__await')
                    ? t.resolve(h.__await).then(
                        function (e) {
                          n('next', e, o, a);
                        },
                        function (e) {
                          n('throw', e, o, a);
                        },
                      )
                    : t.resolve(h).then(
                        function (e) {
                          (u.value = e), o(u);
                        },
                        function (e) {
                          return n('throw', e, o, a);
                        },
                      );
                }
                a(c.arg);
              }
              var i;
              this._invoke = function (e, r) {
                function s() {
                  return new t(function (t, i) {
                    n(e, r, t, i);
                  });
                }
                return (i = i ? i.then(s, s) : s());
              };
            }
            function O(e, n) {
              var r = e.iterator[n.method];
              if (r === t) {
                if (((n.delegate = null), 'throw' === n.method)) {
                  if (e.iterator.return && ((n.method = 'return'), (n.arg = t), O(e, n), 'throw' === n.method))
                    return v;
                  (n.method = 'throw'), (n.arg = new TypeError("The iterator does not provide a 'throw' method"));
                }
                return v;
              }
              var i = l(r, e.iterator, n.arg);
              if ('throw' === i.type) return (n.method = 'throw'), (n.arg = i.arg), (n.delegate = null), v;
              var s = i.arg;
              return s
                ? s.done
                  ? ((n[e.resultName] = s.value),
                    (n.next = e.nextLoc),
                    'return' !== n.method && ((n.method = 'next'), (n.arg = t)),
                    (n.delegate = null),
                    v)
                  : s
                : ((n.method = 'throw'),
                  (n.arg = new TypeError('iterator result is not an object')),
                  (n.delegate = null),
                  v);
            }
            function T(e) {
              var t = { tryLoc: e[0] };
              1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t);
            }
            function S(e) {
              var t = e.completion || {};
              (t.type = 'normal'), delete t.arg, (e.completion = t);
            }
            function C(e) {
              (this.tryEntries = [{ tryLoc: 'root' }]), e.forEach(T, this), this.reset(!0);
            }
            function A(e) {
              if (e) {
                var n = e[s];
                if (n) return n.call(e);
                if ('function' == typeof e.next) return e;
                if (!isNaN(e.length)) {
                  var i = -1,
                    o = function n() {
                      for (; ++i < e.length; ) if (r.call(e, i)) return (n.value = e[i]), (n.done = !1), n;
                      return (n.value = t), (n.done = !0), n;
                    };
                  return (o.next = o);
                }
              }
              return { next: j };
            }
            function j() {
              return { value: t, done: !0 };
            }
            return (
              (g.prototype = k.constructor = m),
              (m.constructor = g),
              (g.displayName = c(m, a, 'GeneratorFunction')),
              (e.isGeneratorFunction = function (e) {
                var t = 'function' == typeof e && e.constructor;
                return !!t && (t === g || 'GeneratorFunction' === (t.displayName || t.name));
              }),
              (e.mark = function (e) {
                return (
                  Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, m)
                    : ((e.__proto__ = m), c(e, a, 'GeneratorFunction')),
                  (e.prototype = Object.create(k)),
                  e
                );
              }),
              (e.awrap = function (e) {
                return { __await: e };
              }),
              E(x.prototype),
              (x.prototype[o] = function () {
                return this;
              }),
              (e.AsyncIterator = x),
              (e.async = function (t, n, r, i, s) {
                void 0 === s && (s = Promise);
                var o = new x(u(t, n, r, i), s);
                return e.isGeneratorFunction(n)
                  ? o
                  : o.next().then(function (e) {
                      return e.done ? e.value : o.next();
                    });
              }),
              E(k),
              c(k, a, 'Generator'),
              (k[s] = function () {
                return this;
              }),
              (k.toString = function () {
                return '[object Generator]';
              }),
              (e.keys = function (e) {
                var t = [];
                for (var n in e) t.push(n);
                return (
                  t.reverse(),
                  function n() {
                    for (; t.length; ) {
                      var r = t.pop();
                      if (r in e) return (n.value = r), (n.done = !1), n;
                    }
                    return (n.done = !0), n;
                  }
                );
              }),
              (e.values = A),
              (C.prototype = {
                constructor: C,
                reset: function (e) {
                  if (
                    ((this.prev = 0),
                    (this.next = 0),
                    (this.sent = this._sent = t),
                    (this.done = !1),
                    (this.delegate = null),
                    (this.method = 'next'),
                    (this.arg = t),
                    this.tryEntries.forEach(S),
                    !e)
                  )
                    for (var n in this) 't' === n.charAt(0) && r.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = t);
                },
                stop: function () {
                  this.done = !0;
                  var e = this.tryEntries[0].completion;
                  if ('throw' === e.type) throw e.arg;
                  return this.rval;
                },
                dispatchException: function (e) {
                  if (this.done) throw e;
                  var n = this;
                  function i(r, i) {
                    return (a.type = 'throw'), (a.arg = e), (n.next = r), i && ((n.method = 'next'), (n.arg = t)), !!i;
                  }
                  for (var s = this.tryEntries.length - 1; s >= 0; --s) {
                    var o = this.tryEntries[s],
                      a = o.completion;
                    if ('root' === o.tryLoc) return i('end');
                    if (o.tryLoc <= this.prev) {
                      var c = r.call(o, 'catchLoc'),
                        u = r.call(o, 'finallyLoc');
                      if (c && u) {
                        if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                        if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                      } else if (c) {
                        if (this.prev < o.catchLoc) return i(o.catchLoc, !0);
                      } else {
                        if (!u) throw new Error('try statement without catch or finally');
                        if (this.prev < o.finallyLoc) return i(o.finallyLoc);
                      }
                    }
                  }
                },
                abrupt: function (e, t) {
                  for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var i = this.tryEntries[n];
                    if (i.tryLoc <= this.prev && r.call(i, 'finallyLoc') && this.prev < i.finallyLoc) {
                      var s = i;
                      break;
                    }
                  }
                  s && ('break' === e || 'continue' === e) && s.tryLoc <= t && t <= s.finallyLoc && (s = null);
                  var o = s ? s.completion : {};
                  return (
                    (o.type = e),
                    (o.arg = t),
                    s ? ((this.method = 'next'), (this.next = s.finallyLoc), v) : this.complete(o)
                  );
                },
                complete: function (e, t) {
                  if ('throw' === e.type) throw e.arg;
                  return (
                    'break' === e.type || 'continue' === e.type
                      ? (this.next = e.arg)
                      : 'return' === e.type
                      ? ((this.rval = this.arg = e.arg), (this.method = 'return'), (this.next = 'end'))
                      : 'normal' === e.type && t && (this.next = t),
                    v
                  );
                },
                finish: function (e) {
                  for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.finallyLoc === e) return this.complete(n.completion, n.afterLoc), S(n), v;
                  }
                },
                catch: function (e) {
                  for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var n = this.tryEntries[t];
                    if (n.tryLoc === e) {
                      var r = n.completion;
                      if ('throw' === r.type) {
                        var i = r.arg;
                        S(n);
                      }
                      return i;
                    }
                  }
                  throw new Error('illegal catch attempt');
                },
                delegateYield: function (e, n, r) {
                  return (
                    (this.delegate = { iterator: A(e), resultName: n, nextLoc: r }),
                    'next' === this.method && (this.arg = t),
                    v
                  );
                },
              }),
              e
            );
          })(e.exports);
          try {
            regeneratorRuntime = t;
          } catch (e) {
            Function('r', 'regeneratorRuntime = r')(t);
          }
        },
        8058: () => {},
        5697: () => {},
        1726: () => {},
        5861: (e, t, n) => {
          'use strict';
          function r(e, t, n, r, i, s, o) {
            try {
              var a = e[s](o),
                c = a.value;
            } catch (e) {
              return void n(e);
            }
            a.done ? t(c) : Promise.resolve(c).then(r, i);
          }
          function i(e) {
            return function () {
              var t = this,
                n = arguments;
              return new Promise(function (i, s) {
                var o = e.apply(t, n);
                function a(e) {
                  r(o, i, s, a, c, 'next', e);
                }
                function c(e) {
                  r(o, i, s, a, c, 'throw', e);
                }
                a(void 0);
              });
            };
          }
          n.d(t, { Z: () => i });
        },
        5671: (e, t, n) => {
          'use strict';
          function r(e, t) {
            if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
          }
          n.d(t, { Z: () => r });
        },
        3144: (e, t, n) => {
          'use strict';
          function r(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          function i(e, t, n) {
            return t && r(e.prototype, t), n && r(e, n), Object.defineProperty(e, 'prototype', { writable: !1 }), e;
          }
          n.d(t, { Z: () => i });
        },
        4942: (e, t, n) => {
          'use strict';
          function r(e, t, n) {
            return (
              t in e
                ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                : (e[t] = n),
              e
            );
          }
          n.d(t, { Z: () => r });
        },
        4925: (e, t, n) => {
          'use strict';
          function r(e, t) {
            if (null == e) return {};
            var n,
              r,
              i = (function (e, t) {
                if (null == e) return {};
                var n,
                  r,
                  i = {},
                  s = Object.keys(e);
                for (r = 0; r < s.length; r++) (n = s[r]), t.indexOf(n) >= 0 || (i[n] = e[n]);
                return i;
              })(e, t);
            if (Object.getOwnPropertySymbols) {
              var s = Object.getOwnPropertySymbols(e);
              for (r = 0; r < s.length; r++)
                (n = s[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (i[n] = e[n]));
            }
            return i;
          }
          n.d(t, { Z: () => r });
        },
        8152: (e, t, n) => {
          'use strict';
          function r(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
            return r;
          }
          function i(e, t) {
            return (
              (function (e) {
                if (Array.isArray(e)) return e;
              })(e) ||
              (function (e, t) {
                var n = null == e ? null : ('undefined' != typeof Symbol && e[Symbol.iterator]) || e['@@iterator'];
                if (null != n) {
                  var r,
                    i,
                    s = [],
                    o = !0,
                    a = !1;
                  try {
                    for (n = n.call(e); !(o = (r = n.next()).done) && (s.push(r.value), !t || s.length !== t); o = !0);
                  } catch (e) {
                    (a = !0), (i = e);
                  } finally {
                    try {
                      o || null == n.return || n.return();
                    } finally {
                      if (a) throw i;
                    }
                  }
                  return s;
                }
              })(e, t) ||
              (function (e, t) {
                if (e) {
                  if ('string' == typeof e) return r(e, t);
                  var n = Object.prototype.toString.call(e).slice(8, -1);
                  return (
                    'Object' === n && e.constructor && (n = e.constructor.name),
                    'Map' === n || 'Set' === n
                      ? Array.from(e)
                      : 'Arguments' === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
                      ? r(e, t)
                      : void 0
                  );
                }
              })(e, t) ||
              (function () {
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
                );
              })()
            );
          }
          n.d(t, { Z: () => i });
        },
        1002: (e, t, n) => {
          'use strict';
          function r(e) {
            return (
              (r =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                        ? 'symbol'
                        : typeof e;
                    }),
              r(e)
            );
          }
          n.d(t, { Z: () => r });
        },
        4147: (e) => {
          'use strict';
          e.exports = JSON.parse(
            '{"author":{"name":"Thierry Schellenbach","company":"Stream.io Inc"},"name":"getstream","description":"The official low-level GetStream.io client for Node.js and the browser.","main":"./lib/index.js","module":"./lib/index.js","types":"./lib/index.d.ts","homepage":"https://getstream.io/docs/?language=js","email":"support@getstream.io","license":"BSD-3-Clause","version":"7.4.1","scripts":{"transpile":"babel src --out-dir lib --extensions \'.ts\'","types":"tsc --emitDeclarationOnly","build":"rm -rf lib && yarn run transpile && yarn run types","dist":"webpack && webpack --env minify","eslint":"eslint \\"**/*.{js,ts}\\" --max-warnings 0","prettier":"prettier --list-different \\"**/*.{js,ts}\\"","lint":"yarn run prettier && yarn run eslint","lint-fix":"prettier --write \\"**/*.{js,ts}\\" && eslint --fix \\"**/*.{js,ts}\\"","test":"yarn run test-unit-node","test-types":"tsc --esModuleInterop true --noEmit true test/typescript/*.ts","test-unit-node":"mocha --require ./babel-register.js test/unit/common test/unit/node","test-integration-node":"mocha --require ./babel-register.js test/integration/common test/integration/node --exit","test-cloud":"mocha --require ./babel-register.js test/integration/cloud --timeout 40000","test-cloud-local":"LOCAL=true mocha --require ./babel-register.js test/integration/cloud --timeout 40000 --ignore \'test/integration/cloud/{personalized_feed,files,images}.js\'","test-browser":"karma start karma.config.js","prepare":"yarn run build","preversion":"yarn run test-unit-node","version":"yarn run dist && yarn run build && git add dist","postversion":"git push && git push --tags && npm publish"},"husky":{"hooks":{"pre-commit":"yarn run lint-fix"}},"browser":{"crypto":false,"jsonwebtoken":false,"./lib/batch_operations.js":false,"./lib/redirect_url.js":false,"qs":false,"url":false,"http":false,"https":false},"react-native":{"crypto":false,"jsonwebtoken":false,"./lib/batch_operations.js":false,"./lib/redirect_url.js":false,"qs":false,"url":false},"devDependencies":{"@babel/cli":"^7.16.7","@babel/core":"^7.16.7","@babel/eslint-parser":"^7.16.5","@babel/node":"^7.16.7","@babel/plugin-proposal-class-properties":"^7.16.7","@babel/plugin-proposal-object-rest-spread":"^7.16.7","@babel/plugin-transform-object-assign":"^7.16.7","@babel/plugin-transform-runtime":"^7.16.7","@babel/preset-env":"^7.16.7","@babel/preset-typescript":"^7.16.7","@babel/register":"^7.16.7","@typescript-eslint/eslint-plugin":"^5.8.1","@typescript-eslint/parser":"^5.8.1","babel-loader":"^8.2.3","chai":"^4.3.4","dotenv":"^10.0.0","eslint":"^8.6.0","eslint-config-airbnb-base":"^15.0.0","eslint-config-prettier":"^8.3.0","eslint-plugin-chai-friendly":"^0.7.2","eslint-plugin-import":"^2.25.4","eslint-plugin-prettier":"^4.0.0","eslint-plugin-sonarjs":"^0.11.0","eslint-plugin-typescript-sort-keys":"^2.1.0","expect.js":"^0.3.1","husky":"^4.3.8","json-loader":"~0.5.7","karma":"^6.3.9","karma-chrome-launcher":"^3.1.0","karma-mocha":"^2.0.1","karma-mocha-reporter":"~2.2.5","karma-sauce-launcher":"^4.3.6","karma-sourcemap-loader":"~0.3.8","karma-webpack":"^5.0.0","mocha":"^8.3.1","null-loader":"^4.0.1","nyc":"^15.1.0","prettier":"^2.5.1","request":"^2.88.2","testdouble":"^3.16.4","typescript":"^4.5.4","webpack":"^5.65.0","webpack-cli":"^4.9.1"},"dependencies":{"@babel/runtime":"^7.16.7","@types/jsonwebtoken":"^8.5.6","@types/jwt-decode":"^2.2.1","@types/qs":"^6.9.7","axios":"^0.22.0","faye":"^1.4.0","form-data":"^4.0.0","jsonwebtoken":"^8.5.1","jwt-decode":"^3.1.2","qs":"^6.10.2"},"peerDependencies":{"@types/node":">=10"},"repository":{"type":"git","url":"git://github.com/GetStream/stream-js.git"},"files":["src","dist","types","lib"],"engines":{"node":"10 || 12 || >=14"},"keywords":["stream","get","get-stream","chat","notification","feed","stream.io","getstream"]}',
          );
        },
      },
      t = {};
    function n(r) {
      var i = t[r];
      if (void 0 !== i) return i.exports;
      var s = (t[r] = { exports: {} });
      return e[r](s, s.exports, n), s.exports;
    }
    (n.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return n.d(t, { a: t }), t;
    }),
      (n.d = (e, t) => {
        for (var r in t) n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
      }),
      (n.g = (function () {
        if ('object' == typeof globalThis) return globalThis;
        try {
          return this || new Function('return this')();
        } catch (e) {
          if ('object' == typeof window) return window;
        }
      })()),
      (n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (n.r = (e) => {
        'undefined' != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
          Object.defineProperty(e, '__esModule', { value: !0 });
      });
    var r = {};
    return (
      (() => {
        'use strict';
        n.r(r),
          n.d(r, {
            connect: () => e.$,
            StreamClient: () => t.n,
            CollectionEntry: () => i.R,
            Collections: () => i.n,
            StreamFeed: () => s.r,
            StreamFileStore: () => o.h,
            StreamImageStore: () => a.$,
            Personalization: () => c.S,
            StreamReaction: () => u.R,
            StreamUser: () => l.h,
            FeedError: () => d.IY,
            MissingSchemaError: () => d.uA,
            SiteError: () => d.z4,
            StreamApiError: () => d.eY,
            JWTScopeToken: () => p.v,
            JWTUserSessionToken: () => p.c,
          });
        var e = n(2631),
          t = n(6663),
          i = n(3709),
          s = n(7248),
          o = n(448),
          a = n(9082),
          c = n(8039),
          u = n(8824),
          l = n(7878),
          h = n(6793),
          f = {};
        for (const e in h)
          [
            'default',
            'connect',
            'StreamClient',
            'CollectionEntry',
            'Collections',
            'StreamFeed',
            'StreamFileStore',
            'StreamImageStore',
            'Personalization',
            'StreamReaction',
            'StreamUser',
          ].indexOf(e) < 0 && (f[e] = () => h[e]);
        n.d(r, f);
        var d = n(2589),
          p = n(6685);
      })(),
      r
    );
  })();
});
