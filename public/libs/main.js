if (function(e, t) {
    "use strict";
    function n(e) {
        var t = e.length,
        n = at.type(e);
        return at.isWindow(e) ? !1: 1 === e.nodeType && t ? !0: "array" === n || "function" !== n && (0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    function r(e) {
        var t = wt[e] = {};
        return at.each(e.match(ut) || [], 
        function(e, n) {
            t[n] = !0
        }),
        t
    }
    function i(e, n, r, i) {
        if (at.acceptData(e)) {
            var o,
            s,
            a = at.expando,
            l = "string" == typeof n,
            u = e.nodeType,
            c = u ? at.cache: e,
            f = u ? e[a] : e[a] && a;
            if (f && c[f] && (i || c[f].data) || !l || r !== t) return f || (u ? e[a] = f = K.pop() || at.guid++:f = a),
            c[f] || (c[f] = {},
            u || (c[f].toJSON = at.noop)),
            ("object" == typeof n || "function" == typeof n) && (i ? c[f] = at.extend(c[f], n) : c[f].data = at.extend(c[f].data, n)),
            o = c[f],
            i || (o.data || (o.data = {}), o = o.data),
            r !== t && (o[at.camelCase(n)] = r),
            l ? (s = o[n], null == s && (s = o[at.camelCase(n)])) : s = o,
            s
        }
    }
    function o(e, t, n) {
        if (at.acceptData(e)) {
            var r,
            i,
            o,
            s = e.nodeType,
            l = s ? at.cache: e,
            u = s ? e[at.expando] : at.expando;
            if (l[u]) {
                if (t && (r = n ? l[u] : l[u].data)) {
                    at.isArray(t) ? t = t.concat(at.map(t, at.camelCase)) : t in r ? t = [t] : (t = at.camelCase(t), t = t in r ? [t] : t.split(" "));
                    for (i = 0, o = t.length; o > i; i++) delete r[t[i]];
                    if (! (n ? a: at.isEmptyObject)(r)) return
                } (n || (delete l[u].data, a(l[u]))) && (s ? at.cleanData([e], !0) : at.support.deleteExpando || l != l.window ? delete l[u] : l[u] = null)
            }
        }
    }
    function s(e, n, r) {
        if (r === t && 1 === e.nodeType) {
            var i = "data-" + n.replace(Ct, "-$1").toLowerCase();
            if (r = e.getAttribute(i), "string" == typeof r) {
                try {
                    r = "true" === r ? !0: "false" === r ? !1: "null" === r ? null: +r + "" === r ? +r: Tt.test(r) ? at.parseJSON(r) : r
                } catch(o) {}
                at.data(e, n, r)
            } else r = t
        }
        return r
    }
    function a(e) {
        var t;
        for (t in e) if (("data" !== t || !at.isEmptyObject(e[t])) && "toJSON" !== t) return ! 1;
        return ! 0
    }
    function l() {
        return ! 0
    }
    function u() {
        return ! 1
    }
    function c(e, t) {
        do e = e[t];
        while (e && 1 !== e.nodeType);
        return e
    }
    function f(e, t, n) {
        if (t = t || 0, at.isFunction(t)) return at.grep(e, 
        function(e, r) {
            var i = !!t.call(e, r, e);
            return i === n
        });
        if (t.nodeType) return at.grep(e, 
        function(e) {
            return e === t === n
        });
        if ("string" == typeof t) {
            var r = at.grep(e, 
            function(e) {
                return 1 === e.nodeType
            });
            if (Rt.test(t)) return at.filter(t, r, !n);
            t = at.filter(t, r)
        }
        return at.grep(e, 
        function(e) {
            return at.inArray(e, t) >= 0 === n
        })
    }
    function p(e) {
        var t = zt.split("|"),
        n = e.createDocumentFragment();
        if (n.createElement) for (; t.length;) n.createElement(t.pop());
        return n
    }
    function d(e, t) {
        return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t))
    }
    function h(e) {
        var t = e.getAttributeNode("type");
        return e.type = (t && t.specified) + "/" + e.type,
        e
    }
    function m(e) {
        var t = nn.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
        e
    }
    function g(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++) at._data(n, "globalEval", !t || at._data(t[r], "globalEval"))
    }
    function y(e, t) {
        if (1 === t.nodeType && at.hasData(e)) {
            var n,
            r,
            i,
            o = at._data(e),
            s = at._data(t, o),
            a = o.events;
            if (a) {
                delete s.handle,
                s.events = {};
                for (n in a) for (r = 0, i = a[n].length; i > r; r++) at.event.add(t, n, a[n][r])
            }
            s.data && (s.data = at.extend({},
            s.data))
        }
    }
    function v(e, t) {
        var n,
        r,
        i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(), !at.support.noCloneEvent && t[at.expando]) {
                r = at._data(t);
                for (i in r.events) at.removeEvent(t, i, r.handle);
                t.removeAttribute(at.expando)
            }
            "script" === n && t.text !== e.text ? (h(t).text = e.text, m(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML), at.support.html5Clone && e.innerHTML && !at.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && Zt.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected: ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue)
        }
    }
    function b(e, n) {
        var r,
        i,
        o = 0,
        s = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(n || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(n || "*") : t;
        if (!s) for (s = [], r = e.childNodes || e; null != (i = r[o]); o++) ! n || at.nodeName(i, n) ? s.push(i) : at.merge(s, b(i, n));
        return n === t || n && at.nodeName(e, n) ? at.merge([e], s) : s
    }
    function x(e) {
        Zt.test(e.type) && (e.defaultChecked = e.checked)
    }
    function w(e, t) {
        if (t in e) return t;
        for (var n = t.charAt(0).toUpperCase() + t.slice(1), r = t, i = Cn.length; i--;) if (t = Cn[i] + n, t in e) return t;
        return r
    }
    function T(e, t) {
        return e = t || e,
        "none" === at.css(e, "display") || !at.contains(e.ownerDocument, e)
    }
    function C(e, t) {
        for (var n, r = [], i = 0, o = e.length; o > i; i++) n = e[i],
        n.style && (r[i] = at._data(n, "olddisplay"), t ? (r[i] || "none" !== n.style.display || (n.style.display = ""), "" === n.style.display && T(n) && (r[i] = at._data(n, "olddisplay", S(n.nodeName)))) : r[i] || T(n) || at._data(n, "olddisplay", at.css(n, "display")));
        for (i = 0; o > i; i++) n = e[i],
        n.style && (t && "none" !== n.style.display && "" !== n.style.display || (n.style.display = t ? r[i] || "": "none"));
        return e
    }
    function N(e, t, n) {
        var r = gn.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function E(e, t, n, r, i) {
        for (var o = n === (r ? "border": "content") ? 4: "width" === t ? 1: 0, s = 0; 4 > o; o += 2)"margin" === n && (s += at.css(e, n + Tn[o], !0, i)),
        r ? ("content" === n && (s -= at.css(e, "padding" + Tn[o], !0, i)), "margin" !== n && (s -= at.css(e, "border" + Tn[o] + "Width", !0, i))) : (s += at.css(e, "padding" + Tn[o], !0, i), "padding" !== n && (s += at.css(e, "border" + Tn[o] + "Width", !0, i)));
        return s
    }
    function k(e, t, n) {
        var r = !0,
        i = "width" === t ? e.offsetWidth: e.offsetHeight,
        o = un(e),
        s = at.support.boxSizing && "border-box" === at.css(e, "boxSizing", !1, o);
        if (0 >= i || null == i) {
            if (i = ln(e, t, o), (0 > i || null == i) && (i = e.style[t]), yn.test(i)) return i;
            r = s && (at.support.boxSizingReliable || i === e.style[t]),
            i = parseFloat(i) || 0
        }
        return i + E(e, t, n || (s ? "border": "content"), r, o) + "px"
    }
    function S(e) {
        var t = V,
        n = bn[e];
        return n || (n = A(e, t), "none" !== n && n || (cn = (cn || at("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(t.documentElement), t = (cn[0].contentWindow || cn[0].contentDocument).document, t.write("<!doctype html><html><body>"), t.close(), n = A(e, t), cn.detach()), bn[e] = n),
        n
    }
    function A(e, t) {
        var n = at(t.createElement(e)).appendTo(t.body),
        r = at.css(n[0], "display");
        return n.remove(),
        r
    }
    function j(e, t, n, r) {
        var i;
        if (at.isArray(t)) at.each(t, 
        function(t, i) {
            n || En.test(e) ? r(e, i) : j(e + "[" + ("object" == typeof i ? t: "") + "]", i, n, r)
        });
        else if (n || "object" !== at.type(t)) r(e, t);
        else for (i in t) j(e + "[" + i + "]", t[i], n, r)
    }
    function D(e) {
        return function(t, n) {
            "string" != typeof t && (n = t, t = "*");
            var r,
            i = 0,
            o = t.toLowerCase().match(ut) || [];
            if (at.isFunction(n)) for (; r = o[i++];)"+" === r[0] ? (r = r.slice(1) || "*", (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function $(e, t, n, r) {
        function i(a) {
            var l;
            return o[a] = !0,
            at.each(e[a] || [], 
            function(e, a) {
                var u = a(t, n, r);
                return "string" != typeof u || s || o[u] ? s ? !(l = u) : void 0: (t.dataTypes.unshift(u), i(u), !1)
            }),
            l
        }
        var o = {},
        s = e === Wn;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }
    function L(e, n) {
        var r,
        i,
        o = at.ajaxSettings.flatOptions || {};
        for (r in n) n[r] !== t && ((o[r] ? e: i || (i = {}))[r] = n[r]);
        return i && at.extend(!0, e, i),
        e
    }
    function H(e, n, r) {
        var i,
        o,
        s,
        a,
        l = e.contents,
        u = e.dataTypes,
        c = e.responseFields;
        for (o in c) o in r && (n[c[o]] = r[o]);
        for (;
        "*" === u[0];) u.shift(),
        i === t && (i = e.mimeType || n.getResponseHeader("Content-Type"));
        if (i) for (o in l) if (l[o] && l[o].test(i)) {
            u.unshift(o);
            break
        }
        if (u[0] in r) s = u[0];
        else {
            for (o in r) {
                if (!u[0] || e.converters[o + " " + u[0]]) {
                    s = o;
                    break
                }
                a || (a = o)
            }
            s = s || a
        }
        return s ? (s !== u[0] && u.unshift(s), r[s]) : void 0
    }
    function M(e, t) {
        var n,
        r,
        i,
        o,
        s = {},
        a = 0,
        l = e.dataTypes.slice(),
        u = l[0];
        if (e.dataFilter && (t = e.dataFilter(t, e.dataType)), l[1]) for (n in e.converters) s[n.toLowerCase()] = e.converters[n];
        for (; i = l[++a];) if ("*" !== i) {
            if ("*" !== u && u !== i) {
                if (n = s[u + " " + i] || s["* " + i], !n) for (r in s) if (o = r.split(" "), o[1] === i && (n = s[u + " " + o[0]] || s["* " + o[0]])) {
                    n === !0 ? n = s[r] : s[r] !== !0 && (i = o[0], l.splice(a--, 0, i));
                    break
                }
                if (n !== !0) if (n && e["throws"]) t = n(t);
                else try {
                    t = n(t)
                } catch(c) {
                    return {
                        state: "parsererror",
                        error: n ? c: "No conversion from " + u + " to " + i
                    }
                }
            }
            u = i
        }
        return {
            state: "success",
            data: t
        }
    }
    function q() {
        try {
            return new e.XMLHttpRequest
        } catch(t) {}
    }
    function F() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch(t) {}
    }
    function O() {
        return setTimeout(function() {
            Gn = t
        }),
        Gn = at.now()
    }
    function _(e, t) {
        at.each(t, 
        function(t, n) {
            for (var r = (rr[t] || []).concat(rr["*"]), i = 0, o = r.length; o > i; i++) if (r[i].call(e, t, n)) return
        })
    }
    function B(e, t, n) {
        var r,
        i,
        o = 0,
        s = nr.length,
        a = at.Deferred().always(function() {
            delete l.elem
        }),
        l = function() {
            if (i) return ! 1;
            for (var t = Gn || O(), n = Math.max(0, u.startTime + u.duration - t), r = n / u.duration || 0, o = 1 - r, s = 0, l = u.tweens.length; l > s; s++) u.tweens[s].run(o);
            return a.notifyWith(e, [u, o, n]),
            1 > o && l ? n: (a.resolveWith(e, [u]), !1)
        },
        u = a.promise({
            elem: e,
            props: at.extend({},
            t),
            opts: at.extend(!0, {
                specialEasing: {}
            },
            n),
            originalProperties: t,
            originalOptions: n,
            startTime: Gn || O(),
            duration: n.duration,
            tweens: [],
            createTween: function(t, n) {
                var r = at.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(r),
                r
            },
            stop: function(t) {
                var n = 0,
                r = t ? u.tweens.length: 0;
                if (i) return this;
                for (i = !0; r > n; n++) u.tweens[n].run(1);
                return t ? a.resolveWith(e, [u, t]) : a.rejectWith(e, [u, t]),
                this
            }
        }),
        c = u.props;
        for (P(c, u.opts.specialEasing); s > o; o++) if (r = nr[o].call(u, e, c, u.opts)) return r;
        return _(u, c),
        at.isFunction(u.opts.start) && u.opts.start.call(e, u),
        at.fx.timer(at.extend(l, {
            elem: e,
            anim: u,
            queue: u.opts.queue
        })),
        u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }
    function P(e, t) {
        var n,
        r,
        i,
        o,
        s;
        for (n in e) if (r = at.camelCase(n), i = t[r], o = e[n], at.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), s = at.cssHooks[r], s && "expand" in s) {
            o = s.expand(o),
            delete e[r];
            for (n in o) n in e || (e[n] = o[n], t[n] = i)
        } else t[r] = i
    }
    function R(e, t, n) {
        var r,
        i,
        o,
        s,
        a,
        l,
        u,
        c,
        f,
        p = this,
        d = e.style,
        h = {},
        m = [],
        g = e.nodeType && T(e);
        n.queue || (c = at._queueHooks(e, "fx"), null == c.unqueued && (c.unqueued = 0, f = c.empty.fire, c.empty.fire = function() {
            c.unqueued || f()
        }), c.unqueued++, p.always(function() {
            p.always(function() {
                c.unqueued--,
                at.queue(e, "fx").length || c.empty.fire()
            })
        })),
        1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY], "inline" === at.css(e, "display") && "none" === at.css(e, "float") && (at.support.inlineBlockNeedsLayout && "inline" !== S(e.nodeName) ? d.zoom = 1: d.display = "inline-block")),
        n.overflow && (d.overflow = "hidden", at.support.shrinkWrapBlocks || p.done(function() {
            d.overflow = n.overflow[0],
            d.overflowX = n.overflow[1],
            d.overflowY = n.overflow[2]
        }));
        for (r in t) if (o = t[r], Zn.exec(o)) {
            if (delete t[r], l = l || "toggle" === o, o === (g ? "hide": "show")) continue;
            m.push(r)
        }
        if (s = m.length) {
            a = at._data(e, "fxshow") || at._data(e, "fxshow", {}),
            "hidden" in a && (g = a.hidden),
            l && (a.hidden = !g),
            g ? at(e).show() : p.done(function() {
                at(e).hide()
            }),
            p.done(function() {
                var t;
                at._removeData(e, "fxshow");
                for (t in h) at.style(e, t, h[t])
            });
            for (r = 0; s > r; r++) i = m[r],
            u = p.createTween(i, g ? a[i] : 0),
            h[i] = a[i] || at.style(e, i),
            i in a || (a[i] = u.start, g && (u.end = u.start, u.start = "width" === i || "height" === i ? 1: 0))
        }
    }
    function W(e, t, n, r, i) {
        return new W.prototype.init(e, t, n, r, i)
    }
    function I(e, t) {
        var n,
        r = {
            height: e
        },
        i = 0;
        for (t = t ? 1: 0; 4 > i; i += 2 - t) n = Tn[i],
        r["margin" + n] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
        r
    }
    function z(e) {
        return at.isWindow(e) ? e: 9 === e.nodeType ? e.defaultView || e.parentWindow: !1
    }
    var X,
    U,
    V = e.document,
    Q = e.location,
    Y = e.jQuery,
    J = e.$,
    G = {},
    K = [],
    Z = "1.9.0",
    et = K.concat,
    tt = K.push,
    nt = K.slice,
    rt = K.indexOf,
    it = G.toString,
    ot = G.hasOwnProperty,
    st = Z.trim,
    at = function(e, t) {
        return new at.fn.init(e, t, X)
    },
    lt = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    ut = /\S+/g,
    ct = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    ft = /^(?:(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    pt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    dt = /^[\],:{}\s]*$/,
    ht = /(?:^|:|,)(?:\s*\[)+/g,
    mt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
    gt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
    yt = /^-ms-/,
    vt = /-([\da-z])/gi,
    bt = function(e, t) {
        return t.toUpperCase()
    },
    xt = function() {
        V.addEventListener ? (V.removeEventListener("DOMContentLoaded", xt, !1), at.ready()) : "complete" === V.readyState && (V.detachEvent("onreadystatechange", xt), at.ready())
    };
    at.fn = at.prototype = {
        jquery: Z,
        constructor: at,
        init: function(e, n, r) {
            var i,
            o;
            if (!e) return this;
            if ("string" == typeof e) {
                if (i = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : ft.exec(e), !i || !i[1] && n) return ! n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
                if (i[1]) {
                    if (n = n instanceof at ? n[0] : n, at.merge(this, at.parseHTML(i[1], n && n.nodeType ? n.ownerDocument || n: V, !0)), pt.test(i[1]) && at.isPlainObject(n)) for (i in n) at.isFunction(this[i]) ? this[i](n[i]) : this.attr(i, n[i]);
                    return this
                }
                if (o = V.getElementById(i[2]), o && o.parentNode) {
                    if (o.id !== i[2]) return r.find(e);
                    this.length = 1,
                    this[0] = o
                }
                return this.context = V,
                this.selector = e,
                this
            }
            return e.nodeType ? (this.context = this[0] = e, this.length = 1, this) : at.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), at.makeArray(e, this))
        },
        selector: "",
        length: 0,
        size: function() {
            return this.length
        },
        toArray: function() {
            return nt.call(this)
        },
        get: function(e) {
            return null == e ? this.toArray() : 0 > e ? this[this.length + e] : this[e]
        },
        pushStack: function(e) {
            var t = at.merge(this.constructor(), e);
            return t.prevObject = this,
            t.context = this.context,
            t
        },
        each: function(e, t) {
            return at.each(this, e, t)
        },
        ready: function(e) {
            return at.ready.promise().done(e),
            this
        },
        slice: function() {
            return this.pushStack(nt.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq( - 1)
        },
        eq: function(e) {
            var t = this.length,
            n = +e + (0 > e ? t: 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : [])
        },
        map: function(e) {
            return this.pushStack(at.map(this, 
            function(t, n) {
                return e.call(t, n, t)
            }))
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: tt,
        sort: [].sort,
        splice: [].splice
    },
    at.fn.init.prototype = at.fn,
    at.extend = at.fn.extend = function() {
        var e,
        n,
        r,
        i,
        o,
        s,
        a = arguments[0] || {},
        l = 1,
        u = arguments.length,
        c = !1;
        for ("boolean" == typeof a && (c = a, a = arguments[1] || {},
        l = 2), "object" == typeof a || at.isFunction(a) || (a = {}), u === l && (a = this, --l); u > l; l++) if (null != (e = arguments[l])) for (n in e) r = a[n],
        i = e[n],
        a !== i && (c && i && (at.isPlainObject(i) || (o = at.isArray(i))) ? (o ? (o = !1, s = r && at.isArray(r) ? r: []) : s = r && at.isPlainObject(r) ? r: {},
        a[n] = at.extend(c, s, i)) : i !== t && (a[n] = i));
        return a
    },
    at.extend({
        noConflict: function(t) {
            return e.$ === at && (e.$ = J),
            t && e.jQuery === at && (e.jQuery = Y),
            at
        },
        isReady: !1,
        readyWait: 1,
        holdReady: function(e) {
            e ? at.readyWait++:at.ready(!0)
        },
        ready: function(e) {
            if (e === !0 ? !--at.readyWait: !at.isReady) {
                if (!V.body) return setTimeout(at.ready);
                at.isReady = !0,
                e !== !0 && --at.readyWait > 0 || (U.resolveWith(V, [at]), at.fn.trigger && at(V).trigger("ready").off("ready"))
            }
        },
        isFunction: function(e) {
            return "function" === at.type(e)
        },
        isArray: Array.isArray || 
        function(e) {
            return "array" === at.type(e)
        },
        isWindow: function(e) {
            return null != e && e == e.window
        },
        isNumeric: function(e) {
            return ! isNaN(parseFloat(e)) && isFinite(e)
        },
        type: function(e) {
            return null == e ? String(e) : "object" == typeof e || "function" == typeof e ? G[it.call(e)] || "object": typeof e
        },
        isPlainObject: function(e) {
            if (!e || "object" !== at.type(e) || e.nodeType || at.isWindow(e)) return ! 1;
            try {
                if (e.constructor && !ot.call(e, "constructor") && !ot.call(e.constructor.prototype, "isPrototypeOf")) return ! 1
            } catch(n) {
                return ! 1
            }
            var r;
            for (r in e);
            return r === t || ot.call(e, r)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e) return ! 1;
            return ! 0
        },
        error: function(e) {
            throw new Error(e)
        },
        parseHTML: function(e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && (n = t, t = !1),
            t = t || V;
            var r = pt.exec(e),
            i = !n && [];
            return r ? [t.createElement(r[1])] : (r = at.buildFragment([e], t, i), i && at(i).remove(), at.merge([], r.childNodes))
        },
        parseJSON: function(t) {
            return e.JSON && e.JSON.parse ? e.JSON.parse(t) : null === t ? t: "string" == typeof t && (t = at.trim(t), t && dt.test(t.replace(mt, "@").replace(gt, "]").replace(ht, ""))) ? new Function("return " + t)() : void at.error("Invalid JSON: " + t)
        },
        parseXML: function(n) {
            var r,
            i;
            if (!n || "string" != typeof n) return null;
            try {
                e.DOMParser ? (i = new DOMParser, r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n))
            } catch(o) {
                r = t
            }
            return r && r.documentElement && !r.getElementsByTagName("parsererror").length || at.error("Invalid XML: " + n),
            r
        },
        noop: function() {},
        globalEval: function(t) {
            t && at.trim(t) && (e.execScript || 
            function(t) {
                e.eval.call(e, t)
            })(t)
        },
        camelCase: function(e) {
            return e.replace(yt, "ms-").replace(vt, bt)
        },
        nodeName: function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        },
        each: function(e, t, r) {
            var i,
            o = 0,
            s = e.length,
            a = n(e);
            if (r) {
                if (a) for (; s > o && (i = t.apply(e[o], r), i !== !1); o++);
                else for (o in e) if (i = t.apply(e[o], r), i === !1) break
            } else if (a) for (; s > o && (i = t.call(e[o], o, e[o]), i !== !1); o++);
            else for (o in e) if (i = t.call(e[o], o, e[o]), i === !1) break;
            return e
        },
        trim: st && !st.call("﻿ ") ? 
        function(e) {
            return null == e ? "": st.call(e)
        }: function(e) {
            return null == e ? "": (e + "").replace(ct, "")
        },
        makeArray: function(e, t) {
            var r = t || [];
            return null != e && (n(Object(e)) ? at.merge(r, "string" == typeof e ? [e] : e) : tt.call(r, e)),
            r
        },
        inArray: function(e, t, n) {
            var r;
            if (t) {
                if (rt) return rt.call(t, e, n);
                for (r = t.length, n = n ? 0 > n ? Math.max(0, r + n) : n: 0; r > n; n++) if (n in t && t[n] === e) return n
            }
            return - 1
        },
        merge: function(e, n) {
            var r = n.length,
            i = e.length,
            o = 0;
            if ("number" == typeof r) for (; r > o; o++) e[i++] = n[o];
            else for (; n[o] !== t;) e[i++] = n[o++];
            return e.length = i,
            e
        },
        grep: function(e, t, n) {
            var r,
            i = [],
            o = 0,
            s = e.length;
            for (n = !!n; s > o; o++) r = !!t(e[o], o),
            n !== r && i.push(e[o]);
            return i
        },
        map: function(e, t, r) {
            var i,
            o = 0,
            s = e.length,
            a = n(e),
            l = [];
            if (a) for (; s > o; o++) i = t(e[o], o, r),
            null != i && (l[l.length] = i);
            else for (o in e) i = t(e[o], o, r),
            null != i && (l[l.length] = i);
            return et.apply([], l)
        },
        guid: 1,
        proxy: function(e, n) {
            var r,
            i,
            o;
            return "string" == typeof n && (r = e[n], n = e, e = r),
            at.isFunction(e) ? (i = nt.call(arguments, 2), o = function() {
                return e.apply(n || this, i.concat(nt.call(arguments)))
            },
            o.guid = e.guid = e.guid || at.guid++, o) : t
        },
        access: function(e, n, r, i, o, s, a) {
            var l = 0,
            u = e.length,
            c = null == r;
            if ("object" === at.type(r)) {
                o = !0;
                for (l in r) at.access(e, n, l, r[l], !0, s, a)
            } else if (i !== t && (o = !0, at.isFunction(i) || (a = !0), c && (a ? (n.call(e, i), n = null) : (c = n, n = function(e, t, n) {
                return c.call(at(e), n)
            })), n)) for (; u > l; l++) n(e[l], r, a ? i: i.call(e[l], l, n(e[l], r)));
            return o ? e: c ? n.call(e) : u ? n(e[0], r) : s
        },
        now: function() {
            return (new Date).getTime()
        }
    }),
    at.ready.promise = function(t) {
        if (!U) if (U = at.Deferred(), "complete" === V.readyState) setTimeout(at.ready);
        else if (V.addEventListener) V.addEventListener("DOMContentLoaded", xt, !1),
        e.addEventListener("load", at.ready, !1);
        else {
            V.attachEvent("onreadystatechange", xt),
            e.attachEvent("onload", at.ready);
            var n = !1;
            try {
                n = null == e.frameElement && V.documentElement
            } catch(r) {}
            n && n.doScroll && !
            function i() {
                if (!at.isReady) {
                    try {
                        n.doScroll("left")
                    } catch(e) {
                        return setTimeout(i, 50)
                    }
                    at.ready()
                }
            } ()
        }
        return U.promise(t)
    },
    at.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), 
    function(e, t) {
        G["[object " + t + "]"] = t.toLowerCase()
    }),
    X = at(V);
    var wt = {};
    at.Callbacks = function(e) {
        e = "string" == typeof e ? wt[e] || r(e) : at.extend({},
        e);
        var n,
        i,
        o,
        s,
        a,
        l,
        u = [],
        c = !e.once && [],
        f = function(t) {
            for (n = e.memory && t, i = !0, l = s || 0, s = 0, a = u.length, o = !0; u && a > l; l++) if (u[l].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
                n = !1;
                break
            }
            o = !1,
            u && (c ? c.length && f(c.shift()) : n ? u = [] : p.disable())
        },
        p = {
            add: function() {
                if (u) {
                    var t = u.length; ! 
                    function r(t) {
                        at.each(t, 
                        function(t, n) {
                            var i = at.type(n);
                            "function" === i ? e.unique && p.has(n) || u.push(n) : n && n.length && "string" !== i && r(n)
                        })
                    } (arguments),
                    o ? a = u.length: n && (s = t, f(n))
                }
                return this
            },
            remove: function() {
                return u && at.each(arguments, 
                function(e, t) {
                    for (var n; (n = at.inArray(t, u, n)) > -1;) u.splice(n, 1),
                    o && (a >= n && a--, l >= n && l--)
                }),
                this
            },
            has: function(e) {
                return at.inArray(e, u) > -1
            },
            empty: function() {
                return u = [],
                this
            },
            disable: function() {
                return u = c = n = t,
                this
            },
            disabled: function() {
                return ! u
            },
            lock: function() {
                return c = t,
                n || p.disable(),
                this
            },
            locked: function() {
                return ! c
            },
            fireWith: function(e, t) {
                return t = t || [],
                t = [e, t.slice ? t.slice() : t],
                !u || i && !c || (o ? c.push(t) : f(t)),
                this
            },
            fire: function() {
                return p.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !! i
            }
        };
        return p
    },
    at.extend({
        Deferred: function(e) {
            var t = [["resolve", "done", at.Callbacks("once memory"), "resolved"], ["reject", "fail", at.Callbacks("once memory"), "rejected"], ["notify", "progress", at.Callbacks("memory")]],
            n = "pending",
            r = {
                state: function() {
                    return n
                },
                always: function() {
                    return i.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var e = arguments;
                    return at.Deferred(function(n) {
                        at.each(t, 
                        function(t, o) {
                            var s = o[0],
                            a = at.isFunction(e[t]) && e[t];
                            i[o[1]](function() {
                                var e = a && a.apply(this, arguments);
                                e && at.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                            })
                        }),
                        e = null
                    }).promise()
                },
                promise: function(e) {
                    return null != e ? at.extend(e, r) : r
                }
            },
            i = {};
            return r.pipe = r.then,
            at.each(t, 
            function(e, o) {
                var s = o[2],
                a = o[3];
                r[o[1]] = s.add,
                a && s.add(function() {
                    n = a
                },
                t[1 ^ e][2].disable, t[2][2].lock),
                i[o[0]] = function() {
                    return i[o[0] + "With"](this === i ? r: this, arguments),
                    this
                },
                i[o[0] + "With"] = s.fireWith
            }),
            r.promise(i),
            e && e.call(i, i),
            i
        },
        when: function(e) {
            var t,
            n,
            r,
            i = 0,
            o = nt.call(arguments),
            s = o.length,
            a = 1 !== s || e && at.isFunction(e.promise) ? s: 0,
            l = 1 === a ? e: at.Deferred(),
            u = function(e, n, r) {
                return function(i) {
                    n[e] = this,
                    r[e] = arguments.length > 1 ? nt.call(arguments) : i,
                    r === t ? l.notifyWith(n, r) : --a || l.resolveWith(n, r)
                }
            };
            if (s > 1) for (t = new Array(s), n = new Array(s), r = new Array(s); s > i; i++) o[i] && at.isFunction(o[i].promise) ? o[i].promise().done(u(i, r, o)).fail(l.reject).progress(u(i, n, t)) : --a;
            return a || l.resolveWith(r, o),
            l.promise()
        }
    }),
    at.support = function() {
        var t,
        n,
        r,
        i,
        o,
        s,
        a,
        l,
        u,
        c,
        f = V.createElement("div");
        if (f.setAttribute("className", "t"), f.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = f.getElementsByTagName("*"), r = f.getElementsByTagName("a")[0], !n || !r || !n.length) return {};
        i = V.createElement("select"),
        o = i.appendChild(V.createElement("option")),
        s = f.getElementsByTagName("input")[0],
        r.style.cssText = "top:1px;float:left;opacity:.5",
        t = {
            getSetAttribute: "t" !== f.className,
            leadingWhitespace: 3 === f.firstChild.nodeType,
            tbody: !f.getElementsByTagName("tbody").length,
            htmlSerialize: !!f.getElementsByTagName("link").length,
            style: /top/.test(r.getAttribute("style")),
            hrefNormalized: "/a" === r.getAttribute("href"),
            opacity: /^0.5/.test(r.style.opacity),
            cssFloat: !!r.style.cssFloat,
            checkOn: !!s.value,
            optSelected: o.selected,
            enctype: !!V.createElement("form").enctype,
            html5Clone: "<:nav></:nav>" !== V.createElement("nav").cloneNode(!0).outerHTML,
            boxModel: "CSS1Compat" === V.compatMode,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0,
            boxSizingReliable: !0,
            pixelPosition: !1
        },
        s.checked = !0,
        t.noCloneChecked = s.cloneNode(!0).checked,
        i.disabled = !0,
        t.optDisabled = !o.disabled;
        try {
            delete f.test
        } catch(p) {
            t.deleteExpando = !1
        }
        s = V.createElement("input"),
        s.setAttribute("value", ""),
        t.input = "" === s.getAttribute("value"),
        s.value = "t",
        s.setAttribute("type", "radio"),
        t.radioValue = "t" === s.value,
        s.setAttribute("checked", "t"),
        s.setAttribute("name", "t"),
        a = V.createDocumentFragment(),
        a.appendChild(s),
        t.appendChecked = s.checked,
        t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked,
        f.attachEvent && (f.attachEvent("onclick", 
        function() {
            t.noCloneEvent = !1
        }), f.cloneNode(!0).click());
        for (c in {
            submit: !0,
            change: !0,
            focusin: !0
        }) f.setAttribute(l = "on" + c, "t"),
        t[c + "Bubbles"] = l in e || f.attributes[l].expando === !1;
        return f.style.backgroundClip = "content-box",
        f.cloneNode(!0).style.backgroundClip = "",
        t.clearCloneStyle = "content-box" === f.style.backgroundClip,
        at(function() {
            var n,
            r,
            i,
            o = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
            s = V.getElementsByTagName("body")[0];
            s && (n = V.createElement("div"), n.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", s.appendChild(n).appendChild(f), f.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = f.getElementsByTagName("td"), i[0].style.cssText = "padding:0;margin:0;border:0;display:none", u = 0 === i[0].offsetHeight, i[0].style.display = "", i[1].style.display = "none", t.reliableHiddenOffsets = u && 0 === i[0].offsetHeight, f.innerHTML = "", f.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = 4 === f.offsetWidth, t.doesNotIncludeMarginInBodyOffset = 1 !== s.offsetTop, e.getComputedStyle && (t.pixelPosition = "1%" !== (e.getComputedStyle(f, null) || {}).top, t.boxSizingReliable = "4px" === (e.getComputedStyle(f, null) || {
                width: "4px"
            }).width, r = f.appendChild(V.createElement("div")), r.style.cssText = f.style.cssText = o, r.style.marginRight = r.style.width = "0", f.style.width = "1px", t.reliableMarginRight = !parseFloat((e.getComputedStyle(r, null) || {}).marginRight)), "undefined" != typeof f.style.zoom && (f.innerHTML = "", f.style.cssText = o + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = 3 === f.offsetWidth, f.style.display = "block", f.innerHTML = "<div></div>", f.firstChild.style.width = "5px", t.shrinkWrapBlocks = 3 !== f.offsetWidth, s.style.zoom = 1), s.removeChild(n), n = f = i = r = null)
        }),
        n = i = a = o = r = s = null,
        t
    } ();
    var Tt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
    Ct = /([A-Z])/g;
    at.extend({
        cache: {},
        expando: "jQuery" + (Z + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(e) {
            return e = e.nodeType ? at.cache[e[at.expando]] : e[at.expando],
            !!e && !a(e)
        },
        data: function(e, t, n) {
            return i(e, t, n, !1)
        },
        removeData: function(e, t) {
            return o(e, t, !1)
        },
        _data: function(e, t, n) {
            return i(e, t, n, !0)
        },
        _removeData: function(e, t) {
            return o(e, t, !0)
        },
        acceptData: function(e) {
            var t = e.nodeName && at.noData[e.nodeName.toLowerCase()];
            return ! t || t !== !0 && e.getAttribute("classid") === t
        }
    }),
    at.fn.extend({
        data: function(e, n) {
            var r,
            i,
            o = this[0],
            a = 0,
            l = null;
            if (e === t) {
                if (this.length && (l = at.data(o), 1 === o.nodeType && !at._data(o, "parsedAttrs"))) {
                    for (r = o.attributes; a < r.length; a++) i = r[a].name,
                    i.indexOf("data-") || (i = at.camelCase(i.substring(5)), s(o, i, l[i]));
                    at._data(o, "parsedAttrs", !0)
                }
                return l
            }
            return "object" == typeof e ? this.each(function() {
                at.data(this, e)
            }) : at.access(this, 
            function(n) {
                return n === t ? o ? s(o, e, at.data(o, e)) : null: void this.each(function() {
                    at.data(this, e, n)
                })
            },
            null, n, arguments.length > 1, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                at.removeData(this, e)
            })
        }
    }),
    at.extend({
        queue: function(e, t, n) {
            var r;
            return e ? (t = (t || "fx") + "queue", r = at._data(e, t), n && (!r || at.isArray(n) ? r = at._data(e, t, at.makeArray(n)) : r.push(n)), r || []) : void 0
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = at.queue(e, t),
            r = n.length,
            i = n.shift(),
            o = at._queueHooks(e, t),
            s = function() {
                at.dequeue(e, t)
            };
            "inprogress" === i && (i = n.shift(), r--),
            o.cur = i,
            i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, s, o)),
            !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return at._data(e, n) || at._data(e, n, {
                empty: at.Callbacks("once memory").add(function() {
                    at._removeData(e, t + "queue"),
                    at._removeData(e, n)
                })
            })
        }
    }),
    at.fn.extend({
        queue: function(e, n) {
            var r = 2;
            return "string" != typeof e && (n = e, e = "fx", r--),
            arguments.length < r ? at.queue(this[0], e) : n === t ? this: this.each(function() {
                var t = at.queue(this, e, n);
                at._queueHooks(this, e),
                "fx" === e && "inprogress" !== t[0] && at.dequeue(this, e)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                at.dequeue(this, e)
            })
        },
        delay: function(e, t) {
            return e = at.fx ? at.fx.speeds[e] || e: e,
            t = t || "fx",
            this.queue(t, 
            function(t, n) {
                var r = setTimeout(t, e);
                n.stop = function() {
                    clearTimeout(r)
                }
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, n) {
            var r,
            i = 1,
            o = at.Deferred(),
            s = this,
            a = this.length,
            l = function() {--i || o.resolveWith(s, [s])
            };
            for ("string" != typeof e && (n = e, e = t), e = e || "fx"; a--;) r = at._data(s[a], e + "queueHooks"),
            r && r.empty && (i++, r.empty.add(l));
            return l(),
            o.promise(n)
        }
    });
    var Nt,
    Et,
    kt = /[\t\r\n]/g,
    St = /\r/g,
    At = /^(?:input|select|textarea|button|object)$/i,
    jt = /^(?:a|area)$/i,
    Dt = /^(?:checked|selected|autofocus|autoplay|async|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped)$/i,
    $t = /^(?:checked|selected)$/i,
    Lt = at.support.getSetAttribute,
    Ht = at.support.input;
    at.fn.extend({
        attr: function(e, t) {
            return at.access(this, at.attr, e, t, arguments.length > 1)
        },
        removeAttr: function(e) {
            return this.each(function() {
                at.removeAttr(this, e)
            })
        },
        prop: function(e, t) {
            return at.access(this, at.prop, e, t, arguments.length > 1)
        },
        removeProp: function(e) {
            return e = at.propFix[e] || e,
            this.each(function() {
                try {
                    this[e] = t,
                    delete this[e]
                } catch(n) {}
            })
        },
        addClass: function(e) {
            var t,
            n,
            r,
            i,
            o,
            s = 0,
            a = this.length,
            l = "string" == typeof e && e;
            if (at.isFunction(e)) return this.each(function(t) {
                at(this).addClass(e.call(this, t, this.className))
            });
            if (l) for (t = (e || "").match(ut) || []; a > s; s++) if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(kt, " ") : " ")) {
                for (o = 0; i = t[o++];) r.indexOf(" " + i + " ") < 0 && (r += i + " ");
                n.className = at.trim(r)
            }
            return this
        },
        removeClass: function(e) {
            var t,
            n,
            r,
            i,
            o,
            s = 0,
            a = this.length,
            l = 0 === arguments.length || "string" == typeof e && e;
            if (at.isFunction(e)) return this.each(function(t) {
                at(this).removeClass(e.call(this, t, this.className))
            });
            if (l) for (t = (e || "").match(ut) || []; a > s; s++) if (n = this[s], r = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(kt, " ") : "")) {
                for (o = 0; i = t[o++];) for (; r.indexOf(" " + i + " ") >= 0;) r = r.replace(" " + i + " ", " ");
                n.className = e ? at.trim(r) : ""
            }
            return this
        },
        toggleClass: function(e, t) {
            var n = typeof e,
            r = "boolean" == typeof t;
            return this.each(at.isFunction(e) ? 
            function(n) {
                at(this).toggleClass(e.call(this, n, this.className, t), t)
            }: function() {
                if ("string" === n) for (var i, o = 0, s = at(this), a = t, l = e.match(ut) || []; i = l[o++];) a = r ? a: !s.hasClass(i),
                s[a ? "addClass": "removeClass"](i);
                else("undefined" === n || "boolean" === n) && (this.className && at._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "": at._data(this, "__className__") || "")
            })
        },
        hasClass: function(e) {
            for (var t = " " + e + " ", n = 0, r = this.length; r > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(kt, " ").indexOf(t) >= 0) return ! 0;
            return ! 1
        },
        val: function(e) {
            var n,
            r,
            i,
            o = this[0]; {
                if (arguments.length) return i = at.isFunction(e),
                this.each(function(r) {
                    var o,
                    s = at(this);
                    1 === this.nodeType && (o = i ? e.call(this, r, s.val()) : e, null == o ? o = "": "number" == typeof o ? o += "": at.isArray(o) && (o = at.map(o, 
                    function(e) {
                        return null == e ? "": e + ""
                    })), n = at.valHooks[this.type] || at.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, o, "value") !== t || (this.value = o))
                });
                if (o) return n = at.valHooks[o.type] || at.valHooks[o.nodeName.toLowerCase()],
                n && "get" in n && (r = n.get(o, "value")) !== t ? r: (r = o.value, "string" == typeof r ? r.replace(St, "") : null == r ? "": r)
            }
        }
    }),
    at.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = e.attributes.value;
                    return ! t || t.specified ? e.value: e.text
                }
            },
            select: {
                get: function(e) {
                    for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || 0 > i, s = o ? null: [], a = o ? i + 1: r.length, l = 0 > i ? a: o ? i: 0; a > l; l++) if (n = r[l], !(!n.selected && l !== i || (at.support.optDisabled ? n.disabled: null !== n.getAttribute("disabled")) || n.parentNode.disabled && at.nodeName(n.parentNode, "optgroup"))) {
                        if (t = at(n).val(), o) return t;
                        s.push(t)
                    }
                    return s
                },
                set: function(e, t) {
                    var n = at.makeArray(t);
                    return at(e).find("option").each(function() {
                        this.selected = at.inArray(at(this).val(), n) >= 0
                    }),
                    n.length || (e.selectedIndex = -1),
                    n
                }
            }
        },
        attr: function(e, n, r) {
            var i,
            o,
            s,
            a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return "undefined" == typeof e.getAttribute ? at.prop(e, n, r) : (s = 1 !== a || !at.isXMLDoc(e), s && (n = n.toLowerCase(), o = at.attrHooks[n] || (Dt.test(n) ? Et: Nt)), r === t ? o && s && "get" in o && null !== (i = o.get(e, n)) ? i: ("undefined" != typeof e.getAttribute && (i = e.getAttribute(n)), null == i ? t: i) : null !== r ? o && s && "set" in o && (i = o.set(e, r, n)) !== t ? i: (e.setAttribute(n, r + ""), r) : void at.removeAttr(e, n))
        },
        removeAttr: function(e, t) {
            var n,
            r,
            i = 0,
            o = t && t.match(ut);
            if (o && 1 === e.nodeType) for (; n = o[i++];) r = at.propFix[n] || n,
            Dt.test(n) ? !Lt && $t.test(n) ? e[at.camelCase("default-" + n)] = e[r] = !1: e[r] = !1: at.attr(e, n, ""),
            e.removeAttribute(Lt ? n: r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!at.support.radioValue && "radio" === t && at.nodeName(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t),
                        n && (e.value = n),
                        t
                    }
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(e, n, r) {
            var i,
            o,
            s,
            a = e.nodeType;
            if (e && 3 !== a && 8 !== a && 2 !== a) return s = 1 !== a || !at.isXMLDoc(e),
            s && (n = at.propFix[n] || n, o = at.propHooks[n]),
            r !== t ? o && "set" in o && (i = o.set(e, r, n)) !== t ? i: e[n] = r: o && "get" in o && null !== (i = o.get(e, n)) ? i: e[n]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var n = e.getAttributeNode("tabindex");
                    return n && n.specified ? parseInt(n.value, 10) : At.test(e.nodeName) || jt.test(e.nodeName) && e.href ? 0: t
                }
            }
        }
    }),
    Et = {
        get: function(e, n) {
            var r = at.prop(e, n),
            i = "boolean" == typeof r && e.getAttribute(n),
            o = "boolean" == typeof r ? Ht && Lt ? null != i: $t.test(n) ? e[at.camelCase("default-" + n)] : !!i: e.getAttributeNode(n);
            return o && o.value !== !1 ? n.toLowerCase() : t
        },
        set: function(e, t, n) {
            return t === !1 ? at.removeAttr(e, n) : Ht && Lt || !$t.test(n) ? e.setAttribute(!Lt && at.propFix[n] || n, n) : e[at.camelCase("default-" + n)] = e[n] = !0,
            n

        }
    },
    Ht && Lt || (at.attrHooks.value = {
        get: function(e, n) {
            var r = e.getAttributeNode(n);
            return at.nodeName(e, "input") ? e.defaultValue: r && r.specified ? r.value: t
        },
        set: function(e, t, n) {
            return at.nodeName(e, "input") ? void(e.defaultValue = t) : Nt && Nt.set(e, t, n)
        }
    }),
    Lt || (Nt = at.valHooks.button = {
        get: function(e, n) {
            var r = e.getAttributeNode(n);
            return r && ("id" === n || "name" === n || "coords" === n ? "" !== r.value: r.specified) ? r.value: t
        },
        set: function(e, n, r) {
            var i = e.getAttributeNode(r);
            return i || e.setAttributeNode(i = e.ownerDocument.createAttribute(r)),
            i.value = n += "",
            "value" === r || n === e.getAttribute(r) ? n: t
        }
    },
    at.attrHooks.contenteditable = {
        get: Nt.get,
        set: function(e, t, n) {
            Nt.set(e, "" === t ? !1: t, n)
        }
    },
    at.each(["width", "height"], 
    function(e, t) {
        at.attrHooks[t] = at.extend(at.attrHooks[t], {
            set: function(e, n) {
                return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
            }
        })
    })),
    at.support.hrefNormalized || (at.each(["href", "src", "width", "height"], 
    function(e, n) {
        at.attrHooks[n] = at.extend(at.attrHooks[n], {
            get: function(e) {
                var r = e.getAttribute(n, 2);
                return null == r ? t: r
            }
        })
    }), at.each(["href", "src"], 
    function(e, t) {
        at.propHooks[t] = {
            get: function(e) {
                return e.getAttribute(t, 4)
            }
        }
    })),
    at.support.style || (at.attrHooks.style = {
        get: function(e) {
            return e.style.cssText || t
        },
        set: function(e, t) {
            return e.style.cssText = t + ""
        }
    }),
    at.support.optSelected || (at.propHooks.selected = at.extend(at.propHooks.selected, {
        get: function(e) {
            var t = e.parentNode;
            return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
            null
        }
    })),
    at.support.enctype || (at.propFix.enctype = "encoding"),
    at.support.checkOn || at.each(["radio", "checkbox"], 
    function() {
        at.valHooks[this] = {
            get: function(e) {
                return null === e.getAttribute("value") ? "on": e.value
            }
        }
    }),
    at.each(["radio", "checkbox"], 
    function() {
        at.valHooks[this] = at.extend(at.valHooks[this], {
            set: function(e, t) {
                return at.isArray(t) ? e.checked = at.inArray(at(e).val(), t) >= 0: void 0
            }
        })
    });
    var Mt = /^(?:input|select|textarea)$/i,
    qt = /^key/,
    Ft = /^(?:mouse|contextmenu)|click/,
    Ot = /^(?:focusinfocus|focusoutblur)$/,
    _t = /^([^.]*)(?:\.(.+)|)$/;
    at.event = {
        global: {},
        add: function(e, n, r, i, o) {
            var s,
            a,
            l,
            u,
            c,
            f,
            p,
            d,
            h,
            m,
            g,
            y = 3 !== e.nodeType && 8 !== e.nodeType && at._data(e);
            if (y) {
                for (r.handler && (s = r, r = s.handler, o = s.selector), r.guid || (r.guid = at.guid++), (u = y.events) || (u = y.events = {}), (a = y.handle) || (a = y.handle = function(e) {
                    return "undefined" == typeof at || e && at.event.triggered === e.type ? t: at.event.dispatch.apply(a.elem, arguments)
                },
                a.elem = e), n = (n || "").match(ut) || [""], c = n.length; c--;) l = _t.exec(n[c]) || [],
                h = g = l[1],
                m = (l[2] || "").split(".").sort(),
                p = at.event.special[h] || {},
                h = (o ? p.delegateType: p.bindType) || h,
                p = at.event.special[h] || {},
                f = at.extend({
                    type: h,
                    origType: g,
                    data: i,
                    handler: r,
                    guid: r.guid,
                    selector: o,
                    needsContext: o && at.expr.match.needsContext.test(o),
                    namespace: m.join(".")
                },
                s),
                (d = u[h]) || (d = u[h] = [], d.delegateCount = 0, p.setup && p.setup.call(e, i, m, a) !== !1 || (e.addEventListener ? e.addEventListener(h, a, !1) : e.attachEvent && e.attachEvent("on" + h, a))),
                p.add && (p.add.call(e, f), f.handler.guid || (f.handler.guid = r.guid)),
                o ? d.splice(d.delegateCount++, 0, f) : d.push(f),
                at.event.global[h] = !0;
                e = null
            }
        },
        remove: function(e, t, n, r, i) {
            var o,
            s,
            a,
            l,
            u,
            c,
            f,
            p,
            d,
            h,
            m,
            g = at.hasData(e) && at._data(e);
            if (g && (l = g.events)) {
                for (t = (t || "").match(ut) || [""], u = t.length; u--;) if (a = _t.exec(t[u]) || [], d = m = a[1], h = (a[2] || "").split(".").sort(), d) {
                    for (f = at.event.special[d] || {},
                    d = (r ? f.delegateType: f.bindType) || d, p = l[d] || [], a = a[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), s = o = p.length; o--;) c = p[o],
                    !i && m !== c.origType || n && n.guid !== c.guid || a && !a.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1), c.selector && p.delegateCount--, f.remove && f.remove.call(e, c));
                    s && !p.length && (f.teardown && f.teardown.call(e, h, g.handle) !== !1 || at.removeEvent(e, d, g.handle), delete l[d])
                } else for (d in l) at.event.remove(e, d + t[u], n, r, !0);
                at.isEmptyObject(l) && (delete g.handle, at._removeData(e, "events"))
            }
        },
        trigger: function(n, r, i, o) {
            var s,
            a,
            l,
            u,
            c,
            f,
            p,
            d = [i || V],
            h = n.type || n,
            m = n.namespace ? n.namespace.split(".") : [];
            if (a = l = i = i || V, 3 !== i.nodeType && 8 !== i.nodeType && !Ot.test(h + at.event.triggered) && (h.indexOf(".") >= 0 && (m = h.split("."), h = m.shift(), m.sort()), c = h.indexOf(":") < 0 && "on" + h, n = n[at.expando] ? n: new at.Event(h, "object" == typeof n && n), n.isTrigger = !0, n.namespace = m.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, n.result = t, n.target || (n.target = i), r = null == r ? [n] : at.makeArray(r, [n]), p = at.event.special[h] || {},
            o || !p.trigger || p.trigger.apply(i, r) !== !1)) {
                if (!o && !p.noBubble && !at.isWindow(i)) {
                    for (u = p.delegateType || h, Ot.test(u + h) || (a = a.parentNode); a; a = a.parentNode) d.push(a),
                    l = a;
                    l === (i.ownerDocument || V) && d.push(l.defaultView || l.parentWindow || e)
                }
                for (s = 0; (a = d[s++]) && !n.isPropagationStopped();) n.type = s > 1 ? u: p.bindType || h,
                f = (at._data(a, "events") || {})[n.type] && at._data(a, "handle"),
                f && f.apply(a, r),
                f = c && a[c],
                f && at.acceptData(a) && f.apply && f.apply(a, r) === !1 && n.preventDefault();
                if (n.type = h, !(o || n.isDefaultPrevented() || p._default && p._default.apply(i.ownerDocument, r) !== !1 || "click" === h && at.nodeName(i, "a") || !at.acceptData(i) || !c || !i[h] || at.isWindow(i))) {
                    l = i[c],
                    l && (i[c] = null),
                    at.event.triggered = h;
                    try {
                        i[h]()
                    } catch(g) {}
                    at.event.triggered = t,
                    l && (i[c] = l)
                }
                return n.result
            }
        },
        dispatch: function(e) {
            e = at.event.fix(e);
            var n,
            r,
            i,
            o,
            s,
            a = [],
            l = nt.call(arguments),
            u = (at._data(this, "events") || {})[e.type] || [],
            c = at.event.special[e.type] || {};
            if (l[0] = e, e.delegateTarget = this, !c.preDispatch || c.preDispatch.call(this, e) !== !1) {
                for (a = at.event.handlers.call(this, e, u), n = 0; (o = a[n++]) && !e.isPropagationStopped();) for (e.currentTarget = o.elem, r = 0; (s = o.handlers[r++]) && !e.isImmediatePropagationStopped();)(!e.namespace_re || e.namespace_re.test(s.namespace)) && (e.handleObj = s, e.data = s.data, i = ((at.event.special[s.origType] || {}).handle || s.handler).apply(o.elem, l), i !== t && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e),
                e.result
            }
        },
        handlers: function(e, n) {
            var r,
            i,
            o,
            s,
            a = [],
            l = n.delegateCount,
            u = e.target;
            if (l && u.nodeType && (!e.button || "click" !== e.type)) for (; u != this; u = u.parentNode || this) if (u.disabled !== !0 || "click" !== e.type) {
                for (i = [], r = 0; l > r; r++) s = n[r],
                o = s.selector + " ",
                i[o] === t && (i[o] = s.needsContext ? at(o, this).index(u) >= 0: at.find(o, this, null, [u]).length),
                i[o] && i.push(s);
                i.length && a.push({
                    elem: u,
                    handlers: i
                })
            }
            return l < n.length && a.push({
                elem: this,
                handlers: n.slice(l)
            }),
            a
        },
        fix: function(e) {
            if (e[at.expando]) return e;
            var t,
            n,
            r = e,
            i = at.event.fixHooks[e.type] || {},
            o = i.props ? this.props.concat(i.props) : this.props;
            for (e = new at.Event(r), t = o.length; t--;) n = o[t],
            e[n] = r[n];
            return e.target || (e.target = r.srcElement || V),
            3 === e.target.nodeType && (e.target = e.target.parentNode),
            e.metaKey = !!e.metaKey,
            i.filter ? i.filter(e, r) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode: t.keyCode),
                e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(e, n) {
                var r,
                i,
                o,
                s = n.button,
                a = n.fromElement;
                return null == e.pageX && null != n.clientX && (r = e.target.ownerDocument || V, i = r.documentElement, o = r.body, e.pageX = n.clientX + (i && i.scrollLeft || o && o.scrollLeft || 0) - (i && i.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (i && i.scrollTop || o && o.scrollTop || 0) - (i && i.clientTop || o && o.clientTop || 0)),
                !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement: a),
                e.which || s === t || (e.which = 1 & s ? 1: 2 & s ? 3: 4 & s ? 2: 0),
                e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            click: {
                trigger: function() {
                    return at.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                }
            },
            focus: {
                trigger: function() {
                    if (this !== V.activeElement && this.focus) try {
                        return this.focus(),
                        !1
                    } catch(e) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === V.activeElement && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== t && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function(e, t, n, r) {
            var i = at.extend(new at.Event, n, {
                type: e,
                isSimulated: !0,
                originalEvent: {}
            });
            r ? at.event.trigger(i, null, t) : at.event.dispatch.call(t, i),
            i.isDefaultPrevented() && n.preventDefault()
        }
    },
    at.removeEvent = V.removeEventListener ? 
    function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n, !1)
    }: function(e, t, n) {
        var r = "on" + t;
        e.detachEvent && ("undefined" == typeof e[r] && (e[r] = null), e.detachEvent(r, n))
    },
    at.Event = function(e, t) {
        return this instanceof at.Event ? (e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? l: u) : this.type = e, t && at.extend(this, t), this.timeStamp = e && e.timeStamp || at.now(), void(this[at.expando] = !0)) : new at.Event(e, t)
    },
    at.Event.prototype = {
        isDefaultPrevented: u,
        isPropagationStopped: u,
        isImmediatePropagationStopped: u,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = l,
            e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = l,
            e && (e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = l,
            this.stopPropagation()
        }
    },
    at.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    },
    function(e, t) {
        at.event.special[e] = {
            delegateType: t,
            bindType: t,
            handle: function(e) {
                var n,
                r = this,
                i = e.relatedTarget,
                o = e.handleObj;
                return (!i || i !== r && !at.contains(r, i)) && (e.type = o.origType, n = o.handler.apply(this, arguments), e.type = t),
                n
            }
        }
    }),
    at.support.submitBubbles || (at.event.special.submit = {
        setup: function() {
            return at.nodeName(this, "form") ? !1: void at.event.add(this, "click._submit keypress._submit", 
            function(e) {
                var n = e.target,
                r = at.nodeName(n, "input") || at.nodeName(n, "button") ? n.form: t;
                r && !at._data(r, "submitBubbles") && (at.event.add(r, "submit._submit", 
                function(e) {
                    e._submit_bubble = !0
                }), at._data(r, "submitBubbles", !0))
            })
        },
        postDispatch: function(e) {
            e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && at.event.simulate("submit", this.parentNode, e, !0))
        },
        teardown: function() {
            return at.nodeName(this, "form") ? !1: void at.event.remove(this, "._submit")
        }
    }),
    at.support.changeBubbles || (at.event.special.change = {
        setup: function() {
            return Mt.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (at.event.add(this, "propertychange._change", 
            function(e) {
                "checked" === e.originalEvent.propertyName && (this._just_changed = !0)
            }), at.event.add(this, "click._change", 
            function(e) {
                this._just_changed && !e.isTrigger && (this._just_changed = !1),
                at.event.simulate("change", this, e, !0)
            })), !1) : void at.event.add(this, "beforeactivate._change", 
            function(e) {
                var t = e.target;
                Mt.test(t.nodeName) && !at._data(t, "changeBubbles") && (at.event.add(t, "change._change", 
                function(e) { ! this.parentNode || e.isSimulated || e.isTrigger || at.event.simulate("change", this.parentNode, e, !0)
                }), at._data(t, "changeBubbles", !0))
            })
        },
        handle: function(e) {
            var t = e.target;
            return this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type ? e.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return at.event.remove(this, "._change"),
            !Mt.test(this.nodeName)
        }
    }),
    at.support.focusinBubbles || at.each({
        focus: "focusin",
        blur: "focusout"
    },
    function(e, t) {
        var n = 0,
        r = function(e) {
            at.event.simulate(t, e.target, at.event.fix(e), !0)
        };
        at.event.special[t] = {
            setup: function() {
                0 === n++&&V.addEventListener(e, r, !0)
            },
            teardown: function() {
                0 === --n && V.removeEventListener(e, r, !0)
            }
        }
    }),
    at.fn.extend({
        on: function(e, n, r, i, o) {
            var s,
            a;
            if ("object" == typeof e) {
                "string" != typeof n && (r = r || n, n = t);
                for (a in e) this.on(a, n, r, e[a], o);
                return this
            }
            if (null == r && null == i ? (i = n, r = n = t) : null == i && ("string" == typeof n ? (i = r, r = t) : (i = r, r = n, n = t)), i === !1) i = u;
            else if (!i) return this;
            return 1 === o && (s = i, i = function(e) {
                return at().off(e),
                s.apply(this, arguments)
            },
            i.guid = s.guid || (s.guid = at.guid++)),
            this.each(function() {
                at.event.add(this, e, i, r, n)
            })
        },
        one: function(e, t, n, r) {
            return this.on(e, t, n, r, 1)
        },
        off: function(e, n, r) {
            var i,
            o;
            if (e && e.preventDefault && e.handleObj) return i = e.handleObj,
            at(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace: i.origType, i.selector, i.handler),
            this;
            if ("object" == typeof e) {
                for (o in e) this.off(o, n, e[o]);
                return this
            }
            return (n === !1 || "function" == typeof n) && (r = n, n = t),
            r === !1 && (r = u),
            this.each(function() {
                at.event.remove(this, e, r, n)
            })
        },
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        },
        trigger: function(e, t) {
            return this.each(function() {
                at.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            return n ? at.event.trigger(e, t, n, !0) : void 0
        },
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }),
    at.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), 
    function(e, t) {
        at.fn[t] = function(e, n) {
            return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
        },
        qt.test(t) && (at.event.fixHooks[t] = at.event.keyHooks),
        Ft.test(t) && (at.event.fixHooks[t] = at.event.mouseHooks)
    }),
    function(e, t) {
        function n(e) {
            return ht.test(e + "")
        }
        function r() {
            var e,
            t = [];
            return e = function(n, r) {
                return t.push(n += " ") > N.cacheLength && delete e[t.shift()],
                e[n] = r
            }
        }
        function i(e) {
            return e[B] = !0,
            e
        }
        function o(e) {
            var t = $.createElement("div");
            try {
                return e(t)
            } catch(n) {
                return ! 1
            } finally {
                t = null
            }
        }
        function s(e, t, n, r) {
            var i,
            o,
            s,
            a,
            l,
            u,
            c,
            d,
            h,
            m;
            if ((t ? t.ownerDocument || t: P) !== $ && D(t), t = t || $, n = n || [], !e || "string" != typeof e) return n;
            if (1 !== (a = t.nodeType) && 9 !== a) return [];
            if (!H && !r) {
                if (i = mt.exec(e)) if (s = i[1]) {
                    if (9 === a) {
                        if (o = t.getElementById(s), !o || !o.parentNode) return n;
                        if (o.id === s) return n.push(o),
                        n
                    } else if (t.ownerDocument && (o = t.ownerDocument.getElementById(s)) && O(t, o) && o.id === s) return n.push(o),
                    n
                } else {
                    if (i[2]) return G.apply(n, K.call(t.getElementsByTagName(e), 0)),
                    n;
                    if ((s = i[3]) && R.getByClassName && t.getElementsByClassName) return G.apply(n, K.call(t.getElementsByClassName(s), 0)),
                    n
                }
                if (R.qsa && !M.test(e)) {
                    if (c = !0, d = B, h = t, m = 9 === a && e, 1 === a && "object" !== t.nodeName.toLowerCase()) {
                        for (u = f(e), (c = t.getAttribute("id")) ? d = c.replace(vt, "\\$&") : t.setAttribute("id", d), d = "[id='" + d + "'] ", l = u.length; l--;) u[l] = d + p(u[l]);
                        h = dt.test(e) && t.parentNode || t,
                        m = u.join(",")
                    }
                    if (m) try {
                        return G.apply(n, K.call(h.querySelectorAll(m), 0)),
                        n
                    } catch(g) {} finally {
                        c || t.removeAttribute("id")
                    }
                }
            }
            return x(e.replace(st, "$1"), t, n, r)
        }
        function a(e, t) {
            for (var n = e && t && e.nextSibling; n; n = n.nextSibling) if (n === t) return - 1;
            return e ? 1: -1
        }
        function l(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e
            }
        }
        function u(e) {
            return function(t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function c(e) {
            return i(function(t) {
                return t = +t,
                i(function(n, r) {
                    for (var i, o = e([], n.length, t), s = o.length; s--;) n[i = o[s]] && (n[i] = !(r[i] = n[i]))
                })
            })
        }
        function f(e, t) {
            var n,
            r,
            i,
            o,
            a,
            l,
            u,
            c = X[e + " "];
            if (c) return t ? 0: c.slice(0);
            for (a = e, l = [], u = N.preFilter; a;) { (!n || (r = lt.exec(a))) && (r && (a = a.slice(r[0].length) || a), l.push(i = [])),
                n = !1,
                (r = ut.exec(a)) && (n = r.shift(), i.push({
                    value: n,
                    type: r[0].replace(st, " ")
                }), a = a.slice(n.length));
                for (o in N.filter) ! (r = pt[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
                    value: n,
                    type: o,
                    matches: r
                }), a = a.slice(n.length));
                if (!n) break
            }
            return t ? a.length: a ? s.error(e) : X(e, l).slice(0)
        }
        function p(e) {
            for (var t = 0, n = e.length, r = ""; n > t; t++) r += e[t].value;
            return r
        }
        function d(e, t, n) {
            var r = t.dir,
            i = n && "parentNode" === t.dir,
            o = I++;
            return t.first ? 
            function(t, n, o) {
                for (; t = t[r];) if (1 === t.nodeType || i) return e(t, n, o)
            }: function(t, n, s) {
                var a,
                l,
                u,
                c = W + " " + o;
                if (s) {
                    for (; t = t[r];) if ((1 === t.nodeType || i) && e(t, n, s)) return ! 0
                } else for (; t = t[r];) if (1 === t.nodeType || i) if (u = t[B] || (t[B] = {}), (l = u[r]) && l[0] === c) {
                    if ((a = l[1]) === !0 || a === C) return a === !0
                } else if (l = u[r] = [c], l[1] = e(t, n, s) || C, l[1] === !0) return ! 0
            }
        }
        function h(e) {
            return e.length > 1 ? 
            function(t, n, r) {
                for (var i = e.length; i--;) if (!e[i](t, n, r)) return ! 1;
                return ! 0
            }: e[0]
        }
        function m(e, t, n, r, i) {
            for (var o, s = [], a = 0, l = e.length, u = null != t; l > a; a++)(o = e[a]) && (!n || n(o, r, i)) && (s.push(o), u && t.push(a));
            return s
        }
        function g(e, t, n, r, o, s) {
            return r && !r[B] && (r = g(r)),
            o && !o[B] && (o = g(o, s)),
            i(function(i, s, a, l) {
                var u,
                c,
                f,
                p = [],
                d = [],
                h = s.length,
                g = i || b(t || "*", a.nodeType ? [a] : a, []),
                y = !e || !i && t ? g: m(g, p, e, a, l),
                v = n ? o || (i ? e: h || r) ? [] : s: y;
                if (n && n(y, v, a, l), r) for (u = m(v, d), r(u, [], a, l), c = u.length; c--;)(f = u[c]) && (v[d[c]] = !(y[d[c]] = f));
                if (i) {
                    if (o || e) {
                        if (o) {
                            for (u = [], c = v.length; c--;)(f = v[c]) && u.push(y[c] = f);
                            o(null, v = [], u, l)
                        }
                        for (c = v.length; c--;)(f = v[c]) && (u = o ? Z.call(i, f) : p[c]) > -1 && (i[u] = !(s[u] = f))
                    }
                } else v = m(v === s ? v.splice(h, v.length) : v),
                o ? o(null, s, v, l) : G.apply(s, v)
            })
        }
        function y(e) {
            for (var t, n, r, i = e.length, o = N.relative[e[0].type], s = o || N.relative[" "], a = o ? 1: 0, l = d(function(e) {
                return e === t
            },
            s, !0), u = d(function(e) {
                return Z.call(t, e) > -1
            },
            s, !0), c = [function(e, n, r) {
                return ! o && (r || n !== j) || ((t = n).nodeType ? l(e, n, r) : u(e, n, r))
            }]; i > a; a++) if (n = N.relative[e[a].type]) c = [d(h(c), n)];
            else {
                if (n = N.filter[e[a].type].apply(null, e[a].matches), n[B]) {
                    for (r = ++a; i > r && !N.relative[e[r].type]; r++);
                    return g(a > 1 && h(c), a > 1 && p(e.slice(0, a - 1)).replace(st, "$1"), n, r > a && y(e.slice(a, r)), i > r && y(e = e.slice(r)), i > r && p(e))
                }
                c.push(n)
            }
            return h(c)
        }
        function v(e, t) {
            var n = 0,
            r = t.length > 0,
            o = e.length > 0,
            a = function(i, a, l, u, c) {
                var f,
                p,
                d,
                h = [],
                g = 0,
                y = "0",
                v = i && [],
                b = null != c,
                x = j,
                w = i || o && N.find.TAG("*", c && a.parentNode || a),
                T = W += null == x ? 1: Math.E;
                for (b && (j = a !== $ && a, C = n); null != (f = w[y]); y++) {
                    if (o && f) {
                        for (p = 0; d = e[p]; p++) if (d(f, a, l)) {
                            u.push(f);
                            break
                        }
                        b && (W = T, C = ++n)
                    }
                    r && ((f = !d && f) && g--, i && v.push(f))
                }
                if (g += y, r && y !== g) {
                    for (p = 0; d = t[p]; p++) d(v, h, a, l);
                    if (i) {
                        if (g > 0) for (; y--;) v[y] || h[y] || (h[y] = J.call(u));
                        h = m(h)
                    }
                    G.apply(u, h),
                    b && !i && h.length > 0 && g + t.length > 1 && s.uniqueSort(u)
                }
                return b && (W = T, j = x),
                v
            };
            return r ? i(a) : a
        }
        function b(e, t, n) {
            for (var r = 0, i = t.length; i > r; r++) s(e, t[r], n);
            return n
        }
        function x(e, t, n, r) {
            var i,
            o,
            s,
            a,
            l,
            u = f(e);
            if (!r && 1 === u.length) {
                if (o = u[0] = u[0].slice(0), o.length > 2 && "ID" === (s = o[0]).type && 9 === t.nodeType && !H && N.relative[o[1].type]) {
                    if (t = N.find.ID(s.matches[0].replace(xt, wt), t)[0], !t) return n;
                    e = e.slice(o.shift().value.length)
                }
                for (i = pt.needsContext.test(e) ? -1: o.length - 1; i >= 0 && (s = o[i], !N.relative[a = s.type]); i--) if ((l = N.find[a]) && (r = l(s.matches[0].replace(xt, wt), dt.test(o[0].type) && t.parentNode || t))) {
                    if (o.splice(i, 1), e = r.length && p(o), !e) return G.apply(n, K.call(r, 0)),
                    n;
                    break
                }
            }
            return S(e, u)(r, t, H, n, dt.test(e)),
            n
        }
        function w() {}
        var T,
        C,
        N,
        E,
        k,
        S,
        A,
        j,
        D,
        $,
        L,
        H,
        M,
        q,
        F,
        O,
        _,
        B = "sizzle" + -new Date,
        P = e.document,
        R = {},
        W = 0,
        I = 0,
        z = r(),
        X = r(),
        U = r(),
        V = typeof t,
        Q = 1 << 31,
        Y = [],
        J = Y.pop,
        G = Y.push,
        K = Y.slice,
        Z = Y.indexOf || 
        function(e) {
            for (var t = 0, n = this.length; n > t; t++) if (this[t] === e) return t;
            return - 1
        },
        et = "[\\x20\\t\\r\\n\\f]",
        tt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
        nt = tt.replace("w", "w#"),
        rt = "([*^$|!~]?=)",
        it = "\\[" + et + "*(" + tt + ")" + et + "*(?:" + rt + et + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + nt + ")|)|)" + et + "*\\]",
        ot = ":(" + tt + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + it.replace(3, 8) + ")*)|.*)\\)|)",
        st = new RegExp("^" + et + "+|((?:^|[^\\\\])(?:\\\\.)*)" + et + "+$", "g"),
        lt = new RegExp("^" + et + "*," + et + "*"),
        ut = new RegExp("^" + et + "*([\\x20\\t\\r\\n\\f>+~])" + et + "*"),
        ct = new RegExp(ot),
        ft = new RegExp("^" + nt + "$"),
        pt = {
            ID: new RegExp("^#(" + tt + ")"),
            CLASS: new RegExp("^\\.(" + tt + ")"),
            NAME: new RegExp("^\\[name=['\"]?(" + tt + ")['\"]?\\]"),
            TAG: new RegExp("^(" + tt.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + it),
            PSEUDO: new RegExp("^" + ot),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + et + "*(even|odd|(([+-]|)(\\d*)n|)" + et + "*(?:([+-]|)" + et + "*(\\d+)|))" + et + "*\\)|)", "i"),
            needsContext: new RegExp("^" + et + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + et + "*((?:-\\d)?\\d*)" + et + "*\\)|)(?=[^-]|$)", "i")
        },
        dt = /[\x20\t\r\n\f]*[+~]/,
        ht = /\{\s*\[native code\]\s*\}/,
        mt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        gt = /^(?:input|select|textarea|button)$/i,
        yt = /^h\d$/i,
        vt = /'|\\/g,
        bt = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
        xt = /\\([\da-fA-F]{1,6}[\x20\t\r\n\f]?|.)/g,
        wt = function(e, t) {
            var n = "0x" + t - 65536;
            return n !== n ? t: 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320)
        };
        try {
            K.call(L.childNodes, 0)[0].nodeType
        } catch(Tt) {
            K = function(e) {
                for (var t, n = []; t = this[e]; e++) n.push(t);
                return n
            }
        }
        k = s.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return t ? "HTML" !== t.nodeName: !1
        },
        D = s.setDocument = function(e) {
            var r = e ? e.ownerDocument || e: P;
            return r !== $ && 9 === r.nodeType && r.documentElement ? ($ = r, L = r.documentElement, H = k(r), R.tagNameNoComments = o(function(e) {
                return e.appendChild(r.createComment("")),
                !e.getElementsByTagName("*").length
            }), R.attributes = o(function(e) {
                e.innerHTML = "<select></select>";
                var t = typeof e.lastChild.getAttribute("multiple");
                return "boolean" !== t && "string" !== t
            }), R.getByClassName = o(function(e) {
                return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>",
                e.getElementsByClassName && e.getElementsByClassName("e").length ? (e.lastChild.className = "e", 2 === e.getElementsByClassName("e").length) : !1
            }), R.getByName = o(function(e) {
                e.id = B + 0,
                e.innerHTML = "<a name='" + B + "'></a><div name='" + B + "'></div>",
                L.insertBefore(e, L.firstChild);
                var t = r.getElementsByName && r.getElementsByName(B).length === 2 + r.getElementsByName(B + 0).length;
                return R.getIdNotName = !r.getElementById(B),
                L.removeChild(e),
                t
            }), N.attrHandle = o(function(e) {
                return e.innerHTML = "<a href='#'></a>",
                e.firstChild && typeof e.firstChild.getAttribute !== V && "#" === e.firstChild.getAttribute("href")
            }) ? {}: {
                href: function(e) {
                    return e.getAttribute("href", 2)
                },
                type: function(e) {
                    return e.getAttribute("type")
                }
            },
            R.getIdNotName ? (N.find.ID = function(e, t) {
                if (typeof t.getElementById !== V && !H) {
                    var n = t.getElementById(e);
                    return n && n.parentNode ? [n] : []
                }
            },
            N.filter.ID = function(e) {
                var t = e.replace(xt, wt);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }) : (N.find.ID = function(e, n) {
                if (typeof n.getElementById !== V && !H) {
                    var r = n.getElementById(e);
                    return r ? r.id === e || typeof r.getAttributeNode !== V && r.getAttributeNode("id").value === e ? [r] : t: []
                }
            },
            N.filter.ID = function(e) {
                var t = e.replace(xt, wt);
                return function(e) {
                    var n = typeof e.getAttributeNode !== V && e.getAttributeNode("id");
                    return n && n.value === t
                }
            }), N.find.TAG = R.tagNameNoComments ? 
            function(e, t) {
                return typeof t.getElementsByTagName !== V ? t.getElementsByTagName(e) : void 0
            }: function(e, t) {
                var n,
                r = [],
                i = 0,
                o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i]; i++) 1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            },
            N.find.NAME = R.getByName && 
            function(e, t) {
                return typeof t.getElementsByName !== V ? t.getElementsByName(name) : void 0
            },
            N.find.CLASS = R.getByClassName && 
            function(e, t) {
                return typeof t.getElementsByClassName === V || H ? void 0: t.getElementsByClassName(e)
            },
            q = [], M = [":focus"], (R.qsa = n(r.querySelectorAll)) && (o(function(e) {
                e.innerHTML = "<select><option selected=''></option></select>",
                e.querySelectorAll("[selected]").length || M.push("\\[" + et + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),
                e.querySelectorAll(":checked").length || M.push(":checked")
            }), o(function(e) {
                e.innerHTML = "<input type='hidden' i=''/>",
                e.querySelectorAll("[i^='']").length && M.push("[*^$]=" + et + "*(?:\"\"|'')"),
                e.querySelectorAll(":enabled").length || M.push(":enabled", ":disabled"),
                e.querySelectorAll("*,:x"),
                M.push(",.*:")
            })), (R.matchesSelector = n(F = L.matchesSelector || L.mozMatchesSelector || L.webkitMatchesSelector || L.oMatchesSelector || L.msMatchesSelector)) && o(function(e) {
                R.disconnectedMatch = F.call(e, "div"),
                F.call(e, "[s!='']:x"),
                q.push("!=", ot)
            }), M = new RegExp(M.join("|")), q = new RegExp(q.join("|")), O = n(L.contains) || L.compareDocumentPosition ? 
            function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement: e,
                r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            }: function(e, t) {
                if (t) for (; t = t.parentNode;) if (t === e) return ! 0;
                return ! 1
            },
            _ = L.compareDocumentPosition ? 
            function(e, t) {
                var n;
                return e === t ? (A = !0, 0) : (n = t.compareDocumentPosition && e.compareDocumentPosition && e.compareDocumentPosition(t)) ? 1 & n || e.parentNode && 11 === e.parentNode.nodeType ? e === r || O(P, e) ? -1: t === r || O(P, t) ? 1: 0: 4 & n ? -1: 1: e.compareDocumentPosition ? -1: 1
            }: function(e, t) {
                var n,
                i = 0,
                o = e.parentNode,
                s = t.parentNode,
                l = [e],
                u = [t];
                if (e === t) return A = !0,
                0;
                if (e.sourceIndex && t.sourceIndex) return (~t.sourceIndex || Q) - (O(P, e) && ~e.sourceIndex || Q);
                if (!o || !s) return e === r ? -1: t === r ? 1: o ? -1: s ? 1: 0;
                if (o === s) return a(e, t);
                for (n = e; n = n.parentNode;) l.unshift(n);
                for (n = t; n = n.parentNode;) u.unshift(n);
                for (; l[i] === u[i];) i++;
                return i ? a(l[i], u[i]) : l[i] === P ? -1: u[i] === P ? 1: 0
            },
            A = !1, [0, 0].sort(_), R.detectDuplicates = A, $) : $
        },
        s.matches = function(e, t) {
            return s(e, null, null, t)
        },
        s.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== $ && D(e), t = t.replace(bt, "='$1']"), !(!R.matchesSelector || H || q && q.test(t) || M.test(t))) try {
                var n = F.call(e, t);
                if (n || R.disconnectedMatch || e.document && 11 !== e.document.nodeType) return n
            } catch(r) {}
            return s(t, $, null, [e]).length > 0
        },
        s.contains = function(e, t) {
            return (e.ownerDocument || e) !== $ && D(e),
            O(e, t)
        },
        s.attr = function(e, t) {
            var n;
            return (e.ownerDocument || e) !== $ && D(e),
            H || (t = t.toLowerCase()),
            (n = N.attrHandle[t]) ? n(e) : H || R.attributes ? e.getAttribute(t) : ((n = e.getAttributeNode(t)) || e.getAttribute(t)) && e[t] === !0 ? t: n && n.specified ? n.value: null
        },
        s.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        },
        s.uniqueSort = function(e) {
            var t,
            n = [],
            r = 1,
            i = 0;
            if (A = !R.detectDuplicates, e.sort(_), A) {
                for (; t = e[r]; r++) t === e[r - 1] && (i = n.push(r));
                for (; i--;) e.splice(n[i], 1)
            }
            return e
        },
        E = s.getText = function(e) {
            var t,
            n = "",
            r = 0,
            i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent) return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling) n += E(e)
                } else if (3 === i || 4 === i) return e.nodeValue
            } else for (; t = e[r]; r++) n += E(t);
            return n
        },
        N = s.selectors = {
            cacheLength: 50,
            createPseudo: i,
            match: pt,
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(xt, wt),
                    e[3] = (e[4] || e[5] || "").replace(xt, wt),
                    "~=" === e[2] && (e[3] = " " + e[3] + " "),
                    e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(),
                    "nth" === e[1].slice(0, 3) ? (e[3] || s.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && s.error(e[0]),
                    e
                },
                PSEUDO: function(e) {
                    var t,
                    n = !e[5] && e[2];
                    return pt.CHILD.test(e[0]) ? null: (e[4] ? e[2] = e[4] : n && ct.test(n) && (t = f(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    return "*" === e ? 
                    function() {
                        return ! 0
                    }: (e = e.replace(xt, wt).toLowerCase(), 
                    function(t) {
                        return t.nodeName && t.nodeName.toLowerCase() === e
                    })
                },
                CLASS: function(e) {
                    var t = z[e + " "];
                    return t || (t = new RegExp("(^|" + et + ")" + e + "(" + et + "|$)")) && z(e, 
                    function(e) {
                        return t.test(e.className || typeof e.getAttribute !== V && e.getAttribute("class") || "")
                    })
                },
                ATTR: function(e, t, n) {
                    return function(r) {
                        var i = s.attr(r, e);
                        return null == i ? "!=" === t: t ? (i += "", "=" === t ? i === n: "!=" === t ? i !== n: "^=" === t ? n && 0 === i.indexOf(n) : "*=" === t ? n && i.indexOf(n) > -1: "$=" === t ? n && i.substr(i.length - n.length) === n: "~=" === t ? (" " + i + " ").indexOf(n) > -1: "|=" === t ? i === n || i.substr(0, n.length + 1) === n + "-": !1) : !0
                    }
                },
                CHILD: function(e, t, n, r, i) {
                    var o = "nth" !== e.slice(0, 3),
                    s = "last" !== e.slice( - 4),
                    a = "of-type" === t;
                    return 1 === r && 0 === i ? 
                    function(e) {
                        return !! e.parentNode
                    }: function(t, n, l) {
                        var u,
                        c,
                        f,
                        p,
                        d,
                        h,
                        m = o !== s ? "nextSibling": "previousSibling",
                        g = t.parentNode,
                        y = a && t.nodeName.toLowerCase(),
                        v = !l && !a;
                        if (g) {
                            if (o) {
                                for (; m;) {
                                    for (f = t; f = f[m];) if (a ? f.nodeName.toLowerCase() === y: 1 === f.nodeType) return ! 1;
                                    h = m = "only" === e && !h && "nextSibling"
                                }
                                return ! 0
                            }
                            if (h = [s ? g.firstChild: g.lastChild], s && v) {
                                for (c = g[B] || (g[B] = {}), u = c[e] || [], d = u[0] === W && u[1], p = u[0] === W && u[2], f = d && g.childNodes[d]; f = ++d && f && f[m] || (p = d = 0) || h.pop();) if (1 === f.nodeType && ++p && f === t) {
                                    c[e] = [W, d, p];
                                    break
                                }
                            } else if (v && (u = (t[B] || (t[B] = {}))[e]) && u[0] === W) p = u[1];
                            else for (; (f = ++d && f && f[m] || (p = d = 0) || h.pop()) && ((a ? f.nodeName.toLowerCase() !== y: 1 !== f.nodeType) || !++p || (v && ((f[B] || (f[B] = {}))[e] = [W, p]), f !== t)););
                            return p -= i,
                            p === r || p % r === 0 && p / r >= 0
                        }
                    }
                },
                PSEUDO: function(e, t) {
                    var n,
                    r = N.pseudos[e] || N.setFilters[e.toLowerCase()] || s.error("unsupported pseudo: " + e);
                    return r[B] ? r(t) : r.length > 1 ? (n = [e, e, "", t], N.setFilters.hasOwnProperty(e.toLowerCase()) ? i(function(e, n) {
                        for (var i, o = r(e, t), s = o.length; s--;) i = Z.call(e, o[s]),
                        e[i] = !(n[i] = o[s])
                    }) : function(e) {
                        return r(e, 0, n)
                    }) : r
                }
            },
            pseudos: {
                not: i(function(e) {
                    var t = [],
                    n = [],
                    r = S(e.replace(st, "$1"));
                    return r[B] ? i(function(e, t, n, i) {
                        for (var o, s = r(e, null, i, []), a = e.length; a--;)(o = s[a]) && (e[a] = !(t[a] = o))
                    }) : function(e, i, o) {
                        return t[0] = e,
                        r(t, null, o, n),
                        !n.pop()
                    }
                }),
                has: i(function(e) {
                    return function(t) {
                        return s(e, t).length > 0
                    }
                }),
                contains: i(function(e) {
                    return function(t) {
                        return (t.textContent || t.innerText || E(t)).indexOf(e) > -1
                    }
                }),
                lang: i(function(e) {
                    return ft.test(e || "") || s.error("unsupported lang: " + e),
                    e = e.replace(xt, wt).toLowerCase(),
                    function(t) {
                        var n;
                        do
                        if (n = H ? t.getAttribute("xml:lang") || t.getAttribute("lang") : t.lang) return n = n.toLowerCase(),
                        n === e || 0 === n.indexOf(e + "-");
                        while ((t = t.parentNode) && 1 === t.nodeType);
                        return ! 1
                    }
                }),
                target: function(t) {
                    var n = e.location && e.location.hash;
                    return n && n.slice(1) === t.id
                },
                root: function(e) {
                    return e === L
                },
                focus: function(e) {
                    return e === $.activeElement && (!$.hasFocus || $.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: function(e) {
                    return e.disabled === !1
                },
                disabled: function(e) {
                    return e.disabled === !0
                },
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex,
                    e.selected === !0
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeName > "@" || 3 === e.nodeType || 4 === e.nodeType) return ! 1;
                    return ! 0
                },
                parent: function(e) {
                    return ! N.pseudos.empty(e)
                },
                header: function(e) {
                    return yt.test(e.nodeName)
                },
                input: function(e) {
                    return gt.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || t.toLowerCase() === e.type)
                },
                first: c(function() {
                    return [0]
                }),
                last: c(function(e, t) {
                    return [t - 1]
                }),
                eq: c(function(e, t, n) {
                    return [0 > n ? n + t: n]
                }),
                even: c(function(e, t) {
                    for (var n = 0; t > n; n += 2) e.push(n);
                    return e
                }),
                odd: c(function(e, t) {
                    for (var n = 1; t > n; n += 2) e.push(n);
                    return e
                }),
                lt: c(function(e, t, n) {
                    for (var r = 0 > n ? n + t: n; --r >= 0;) e.push(r);
                    return e
                }),
                gt: c(function(e, t, n) {
                    for (var r = 0 > n ? n + t: n; ++r < t;) e.push(r);
                    return e
                })
            }
        };
        for (T in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) N.pseudos[T] = l(T);
        for (T in {
            submit: !0,
            reset: !0
        }) N.pseudos[T] = u(T);
        S = s.compile = function(e, t) {
            var n,
            r = [],
            i = [],
            o = U[e + " "];
            if (!o) {
                for (t || (t = f(e)), n = t.length; n--;) o = y(t[n]),
                o[B] ? r.push(o) : i.push(o);
                o = U(e, v(i, r))
            }
            return o
        },
        N.pseudos.nth = N.pseudos.eq,
        N.filters = w.prototype = N.pseudos,
        N.setFilters = new w,
        D(),
        s.attr = at.attr,
        at.find = s,
        at.expr = s.selectors,
        at.expr[":"] = at.expr.pseudos,
        at.unique = s.uniqueSort,
        at.text = s.getText,
        at.isXMLDoc = s.isXML,
        at.contains = s.contains
    } (e);
    var Bt = /Until$/,
    Pt = /^(?:parents|prev(?:Until|All))/,
    Rt = /^.[^:#\[\.,]*$/,
    Wt = at.expr.match.needsContext,
    It = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    at.fn.extend({
        find: function(e) {
            var t,
            n,
            r;
            if ("string" != typeof e) return r = this,
            this.pushStack(at(e).filter(function() {
                for (t = 0; t < r.length; t++) if (at.contains(r[t], this)) return ! 0
            }));
            for (n = [], t = 0; t < this.length; t++) at.find(e, this[t], n);
            return n = this.pushStack(at.unique(n)),
            n.selector = (this.selector ? this.selector + " ": "") + e,
            n
        },
        has: function(e) {
            var t,
            n = at(e, this),
            r = n.length;
            return this.filter(function() {
                for (t = 0; r > t; t++) if (at.contains(this, n[t])) return ! 0
            })
        },
        not: function(e) {
            return this.pushStack(f(this, e, !1))
        },
        filter: function(e) {
            return this.pushStack(f(this, e, !0))
        },
        is: function(e) {
            return !! e && ("string" == typeof e ? Wt.test(e) ? at(e, this.context).index(this[0]) >= 0: at.filter(e, this).length > 0: this.filter(e).length > 0)
        },
        closest: function(e, t) {
            for (var n, r = 0, i = this.length, o = [], s = Wt.test(e) || "string" != typeof e ? at(e, t || this.context) : 0; i > r; r++) for (n = this[r]; n && n.ownerDocument && n !== t && 11 !== n.nodeType;) {
                if (s ? s.index(n) > -1: at.find.matchesSelector(n, e)) {
                    o.push(n);
                    break
                }
                n = n.parentNode
            }
            return this.pushStack(o.length > 1 ? at.unique(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? at.inArray(this[0], at(e)) : at.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length: -1
        },
        add: function(e, t) {
            var n = "string" == typeof e ? at(e, t) : at.makeArray(e && e.nodeType ? [e] : e),
            r = at.merge(this.get(), n);
            return this.pushStack(at.unique(r))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject: this.prevObject.filter(e))

        }
    }),
    at.fn.andSelf = at.fn.addBack,
    at.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t: null
        },
        parents: function(e) {
            return at.dir(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return at.dir(e, "parentNode", n)
        },
        next: function(e) {
            return c(e, "nextSibling")
        },
        prev: function(e) {
            return c(e, "previousSibling")
        },
        nextAll: function(e) {
            return at.dir(e, "nextSibling")
        },
        prevAll: function(e) {
            return at.dir(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return at.dir(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return at.dir(e, "previousSibling", n)
        },
        siblings: function(e) {
            return at.sibling((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return at.sibling(e.firstChild)
        },
        contents: function(e) {
            return at.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document: at.merge([], e.childNodes)
        }
    },
    function(e, t) {
        at.fn[e] = function(n, r) {
            var i = at.map(this, t, n);
            return Bt.test(e) || (r = n),
            r && "string" == typeof r && (i = at.filter(r, i)),
            i = this.length > 1 && !It[e] ? at.unique(i) : i,
            this.length > 1 && Pt.test(e) && (i = i.reverse()),
            this.pushStack(i)
        }
    }),
    at.extend({
        filter: function(e, t, n) {
            return n && (e = ":not(" + e + ")"),
            1 === t.length ? at.find.matchesSelector(t[0], e) ? [t[0]] : [] : at.find.matches(e, t)
        },
        dir: function(e, n, r) {
            for (var i = [], o = e[n]; o && 9 !== o.nodeType && (r === t || 1 !== o.nodeType || !at(o).is(r));) 1 === o.nodeType && i.push(o),
            o = o[n];
            return i
        },
        sibling: function(e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n
        }
    });
    var zt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Xt = / jQuery\d+="(?:null|\d+)"/g,
    Ut = new RegExp("<(?:" + zt + ")[\\s/>]", "i"),
    Vt = /^\s+/,
    Qt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Yt = /<([\w:]+)/,
    Jt = /<tbody/i,
    Gt = /<|&#?\w+;/,
    Kt = /<(?:script|style|link)/i,
    Zt = /^(?:checkbox|radio)$/i,
    en = /checked\s*(?:[^=]|=\s*.checked.)/i,
    tn = /^$|\/(?:java|ecma)script/i,
    nn = /^true\/(.*)/,
    rn = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    on = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: at.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    sn = p(V),
    an = sn.appendChild(V.createElement("div"));
    on.optgroup = on.option,
    on.tbody = on.tfoot = on.colgroup = on.caption = on.thead,
    on.th = on.td,
    at.fn.extend({
        text: function(e) {
            return at.access(this, 
            function(e) {
                return e === t ? at.text(this) : this.empty().append((this[0] && this[0].ownerDocument || V).createTextNode(e))
            },
            null, e, arguments.length)
        },
        wrapAll: function(e) {
            if (at.isFunction(e)) return this.each(function(t) {
                at(this).wrapAll(e.call(this, t))
            });
            if (this[0]) {
                var t = at(e, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;) e = e.firstChild;
                    return e
                }).append(this)
            }
            return this
        },
        wrapInner: function(e) {
            return this.each(at.isFunction(e) ? 
            function(t) {
                at(this).wrapInner(e.call(this, t))
            }: function() {
                var t = at(this),
                n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e)
            })
        },
        wrap: function(e) {
            var t = at.isFunction(e);
            return this.each(function(n) {
                at(this).wrapAll(t ? e.call(this, n) : e)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                at.nodeName(this, "body") || at(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, 
            function(e) { (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.appendChild(e)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, 
            function(e) { (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && this.insertBefore(e, this.firstChild)
            })
        },
        before: function() {
            return this.domManip(arguments, !1, 
            function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return this.domManip(arguments, !1, 
            function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        remove: function(e, t) {
            for (var n, r = 0; null != (n = this[r]); r++)(!e || at.filter(e, [n]).length > 0) && (t || 1 !== n.nodeType || at.cleanData(b(n)), n.parentNode && (t && at.contains(n.ownerDocument, n) && g(b(n, "script")), n.parentNode.removeChild(n)));
            return this
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++) {
                for (1 === e.nodeType && at.cleanData(b(e, !1)); e.firstChild;) e.removeChild(e.firstChild);
                e.options && at.nodeName(e, "select") && (e.options.length = 0)
            }
            return this
        },
        clone: function(e, t) {
            return e = null == e ? !1: e,
            t = null == t ? e: t,
            this.map(function() {
                return at.clone(this, e, t)
            })
        },
        html: function(e) {
            return at.access(this, 
            function(e) {
                var n = this[0] || {},
                r = 0,
                i = this.length;
                if (e === t) return 1 === n.nodeType ? n.innerHTML.replace(Xt, "") : t;
                if (! ("string" != typeof e || Kt.test(e) || !at.support.htmlSerialize && Ut.test(e) || !at.support.leadingWhitespace && Vt.test(e) || on[(Yt.exec(e) || ["", ""])[1].toLowerCase()])) {
                    e = e.replace(Qt, "<$1></$2>");
                    try {
                        for (; i > r; r++) n = this[r] || {},
                        1 === n.nodeType && (at.cleanData(b(n, !1)), n.innerHTML = e);
                        n = 0
                    } catch(o) {}
                }
                n && this.empty().append(e)
            },
            null, e, arguments.length)
        },
        replaceWith: function(e) {
            var t = at.isFunction(e);
            return t || "string" == typeof e || (e = at(e).not(this).detach()),
            this.domManip([e], !0, 
            function(e) {
                var t = this.nextSibling,
                n = this.parentNode; (n && 1 === this.nodeType || 11 === this.nodeType) && (at(this).remove(), t ? t.parentNode.insertBefore(e, t) : n.appendChild(e))
            })
        },
        detach: function(e) {
            return this.remove(e, !0)
        },
        domManip: function(e, n, r) {
            e = et.apply([], e);
            var i,
            o,
            s,
            a,
            l,
            u,
            c = 0,
            f = this.length,
            p = this,
            g = f - 1,
            y = e[0],
            v = at.isFunction(y);
            if (v || !(1 >= f || "string" != typeof y || at.support.checkClone) && en.test(y)) return this.each(function(i) {
                var o = p.eq(i);
                v && (e[0] = y.call(this, i, n ? o.html() : t)),
                o.domManip(e, n, r)
            });
            if (f && (i = at.buildFragment(e, this[0].ownerDocument, !1, this), o = i.firstChild, 1 === i.childNodes.length && (i = o), o)) {
                for (n = n && at.nodeName(o, "tr"), s = at.map(b(i, "script"), h), a = s.length; f > c; c++) l = i,
                c !== g && (l = at.clone(l, !0, !0), a && at.merge(s, b(l, "script"))),
                r.call(n && at.nodeName(this[c], "table") ? d(this[c], "tbody") : this[c], l, c);
                if (a) for (u = s[s.length - 1].ownerDocument, at.map(s, m), c = 0; a > c; c++) l = s[c],
                tn.test(l.type || "") && !at._data(l, "globalEval") && at.contains(u, l) && (l.src ? at.ajax({
                    url: l.src,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                }) : at.globalEval((l.text || l.textContent || l.innerHTML || "").replace(rn, "")));
                i = o = null
            }
            return this
        }
    }),
    at.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    },
    function(e, t) {
        at.fn[e] = function(e) {
            for (var n, r = 0, i = [], o = at(e), s = o.length - 1; s >= r; r++) n = r === s ? this: this.clone(!0),
            at(o[r])[t](n),
            tt.apply(i, n.get());
            return this.pushStack(i)
        }
    }),
    at.extend({
        clone: function(e, t, n) {
            var r,
            i,
            o,
            s,
            a,
            l = at.contains(e.ownerDocument, e);
            if (at.support.html5Clone || at.isXMLDoc(e) || !Ut.test("<" + e.nodeName + ">") ? a = e.cloneNode(!0) : (an.innerHTML = e.outerHTML, an.removeChild(a = an.firstChild)), !(at.support.noCloneEvent && at.support.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || at.isXMLDoc(e))) for (r = b(a), i = b(e), s = 0; null != (o = i[s]); ++s) r[s] && v(o, r[s]);
            if (t) if (n) for (i = i || b(e), r = r || b(a), s = 0; null != (o = i[s]); s++) y(o, r[s]);
            else y(e, a);
            return r = b(a, "script"),
            r.length > 0 && g(r, !l && b(e, "script")),
            r = i = o = null,
            a
        },
        buildFragment: function(e, t, n, r) {
            for (var i, o, s, a, l, u, c, f = e.length, d = p(t), h = [], m = 0; f > m; m++) if (o = e[m], o || 0 === o) if ("object" === at.type(o)) at.merge(h, o.nodeType ? [o] : o);
            else if (Gt.test(o)) {
                for (a = a || d.appendChild(t.createElement("div")), s = (Yt.exec(o) || ["", ""])[1].toLowerCase(), l = on[s] || on._default, a.innerHTML = l[1] + o.replace(Qt, "<$1></$2>") + l[2], c = l[0]; c--;) a = a.lastChild;
                if (!at.support.leadingWhitespace && Vt.test(o) && h.push(t.createTextNode(Vt.exec(o)[0])), !at.support.tbody) for (o = "table" !== s || Jt.test(o) ? "<table>" !== l[1] || Jt.test(o) ? 0: a: a.firstChild, c = o && o.childNodes.length; c--;) at.nodeName(u = o.childNodes[c], "tbody") && !u.childNodes.length && o.removeChild(u);
                for (at.merge(h, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                a = d.lastChild
            } else h.push(t.createTextNode(o));
            for (a && d.removeChild(a), at.support.appendChecked || at.grep(b(h, "input"), x), m = 0; o = h[m++];) if ((!r || -1 === at.inArray(o, r)) && (i = at.contains(o.ownerDocument, o), a = b(d.appendChild(o), "script"), i && g(a), n)) for (c = 0; o = a[c++];) tn.test(o.type || "") && n.push(o);
            return a = null,
            d
        },
        cleanData: function(e, t) {
            for (var n, r, i, o, s = 0, a = at.expando, l = at.cache, u = at.support.deleteExpando, c = at.event.special; null != (i = e[s]); s++) if ((t || at.acceptData(i)) && (r = i[a], n = r && l[r])) {
                if (n.events) for (o in n.events) c[o] ? at.event.remove(i, o) : at.removeEvent(i, o, n.handle);
                l[r] && (delete l[r], u ? delete i[a] : "undefined" != typeof i.removeAttribute ? i.removeAttribute(a) : i[a] = null, K.push(r))
            }
        }
    });
    var ln,
    un,
    cn,
    fn = /alpha\([^)]*\)/i,
    pn = /opacity\s*=\s*([^)]*)/,
    dn = /^(top|right|bottom|left)$/,
    hn = /^(none|table(?!-c[ea]).+)/,
    mn = /^margin/,
    gn = new RegExp("^(" + lt + ")(.*)$", "i"),
    yn = new RegExp("^(" + lt + ")(?!px)[a-z%]+$", "i"),
    vn = new RegExp("^([+-])=(" + lt + ")", "i"),
    bn = {
        BODY: "block"
    },
    xn = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    },
    wn = {
        letterSpacing: 0,
        fontWeight: 400
    },
    Tn = ["Top", "Right", "Bottom", "Left"],
    Cn = ["Webkit", "O", "Moz", "ms"];
    at.fn.extend({
        css: function(e, n) {
            return at.access(this, 
            function(e, n, r) {
                var i,
                o,
                s = {},
                a = 0;
                if (at.isArray(n)) {
                    for (i = un(e), o = n.length; o > a; a++) s[n[a]] = at.css(e, n[a], !1, i);
                    return s
                }
                return r !== t ? at.style(e, n, r) : at.css(e, n)
            },
            e, n, arguments.length > 1)
        },
        show: function() {
            return C(this, !0)
        },
        hide: function() {
            return C(this)
        },
        toggle: function(e) {
            var t = "boolean" == typeof e;
            return this.each(function() { (t ? e: T(this)) ? at(this).show() : at(this).hide()
            })
        }
    }),
    at.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = ln(e, "opacity");
                        return "" === n ? "1": n
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": at.support.cssFloat ? "cssFloat": "styleFloat"
        },
        style: function(e, n, r, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o,
                s,
                a,
                l = at.camelCase(n),
                u = e.style;
                if (n = at.cssProps[l] || (at.cssProps[l] = w(u, l)), a = at.cssHooks[n] || at.cssHooks[l], r === t) return a && "get" in a && (o = a.get(e, !1, i)) !== t ? o: u[n];
                if (s = typeof r, "string" === s && (o = vn.exec(r)) && (r = (o[1] + 1) * o[2] + parseFloat(at.css(e, n)), s = "number"), !(null == r || "number" === s && isNaN(r) || ("number" !== s || at.cssNumber[l] || (r += "px"), at.support.clearCloneStyle || "" !== r || 0 !== n.indexOf("background") || (u[n] = "inherit"), a && "set" in a && (r = a.set(e, r, i)) === t))) try {
                    u[n] = r
                } catch(c) {}
            }
        },
        css: function(e, n, r, i) {
            var o,
            s,
            a,
            l = at.camelCase(n);
            return n = at.cssProps[l] || (at.cssProps[l] = w(e.style, l)),
            a = at.cssHooks[n] || at.cssHooks[l],
            a && "get" in a && (o = a.get(e, !0, r)),
            o === t && (o = ln(e, n, i)),
            "normal" === o && n in wn && (o = wn[n]),
            r ? (s = parseFloat(o), r === !0 || at.isNumeric(s) ? s || 0: o) : o
        },
        swap: function(e, t, n, r) {
            var i,
            o,
            s = {};
            for (o in t) s[o] = e.style[o],
            e.style[o] = t[o];
            i = n.apply(e, r || []);
            for (o in t) e.style[o] = s[o];
            return i
        }
    }),
    e.getComputedStyle ? (un = function(t) {
        return e.getComputedStyle(t, null)
    },
    ln = function(e, n, r) {
        var i,
        o,
        s,
        a = r || un(e),
        l = a ? a.getPropertyValue(n) || a[n] : t,
        u = e.style;
        return a && ("" !== l || at.contains(e.ownerDocument, e) || (l = at.style(e, n)), yn.test(l) && mn.test(n) && (i = u.width, o = u.minWidth, s = u.maxWidth, u.minWidth = u.maxWidth = u.width = l, l = a.width, u.width = i, u.minWidth = o, u.maxWidth = s)),
        l
    }) : V.documentElement.currentStyle && (un = function(e) {
        return e.currentStyle
    },
    ln = function(e, n, r) {
        var i,
        o,
        s,
        a = r || un(e),
        l = a ? a[n] : t,
        u = e.style;
        return null == l && u && u[n] && (l = u[n]),
        yn.test(l) && !dn.test(n) && (i = u.left, o = e.runtimeStyle, s = o && o.left, s && (o.left = e.currentStyle.left), u.left = "fontSize" === n ? "1em": l, l = u.pixelLeft + "px", u.left = i, s && (o.left = s)),
        "" === l ? "auto": l
    }),
    at.each(["height", "width"], 
    function(e, t) {
        at.cssHooks[t] = {
            get: function(e, n, r) {
                return n ? 0 === e.offsetWidth && hn.test(at.css(e, "display")) ? at.swap(e, xn, 
                function() {
                    return k(e, t, r)
                }) : k(e, t, r) : void 0
            },
            set: function(e, n, r) {
                var i = r && un(e);
                return N(e, n, r ? E(e, t, r, at.support.boxSizing && "border-box" === at.css(e, "boxSizing", !1, i), i) : 0)
            }
        }
    }),
    at.support.opacity || (at.cssHooks.opacity = {
        get: function(e, t) {
            return pn.test((t && e.currentStyle ? e.currentStyle.filter: e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "": t ? "1": ""
        },
        set: function(e, t) {
            var n = e.style,
            r = e.currentStyle,
            i = at.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")": "",
            o = r && r.filter || n.filter || "";
            n.zoom = 1,
            (t >= 1 || "" === t) && "" === at.trim(o.replace(fn, "")) && n.removeAttribute && (n.removeAttribute("filter"), "" === t || r && !r.filter) || (n.filter = fn.test(o) ? o.replace(fn, i) : o + " " + i)
        }
    }),
    at(function() {
        at.support.reliableMarginRight || (at.cssHooks.marginRight = {
            get: function(e, t) {
                return t ? at.swap(e, {
                    display: "inline-block"
                },
                ln, [e, "marginRight"]) : void 0
            }
        }),
        !at.support.pixelPosition && at.fn.position && at.each(["top", "left"], 
        function(e, t) {
            at.cssHooks[t] = {
                get: function(e, n) {
                    return n ? (n = ln(e, t), yn.test(n) ? at(e).position()[t] + "px": n) : void 0
                }
            }
        })
    }),
    at.expr && at.expr.filters && (at.expr.filters.hidden = function(e) {
        return 0 === e.offsetWidth && 0 === e.offsetHeight || !at.support.reliableHiddenOffsets && "none" === (e.style && e.style.display || at.css(e, "display"))
    },
    at.expr.filters.visible = function(e) {
        return ! at.expr.filters.hidden(e)
    }),
    at.each({
        margin: "",
        padding: "",
        border: "Width"
    },
    function(e, t) {
        at.cssHooks[e + t] = {
            expand: function(n) {
                for (var r = 0, i = {},
                o = "string" == typeof n ? n.split(" ") : [n]; 4 > r; r++) i[e + Tn[r] + t] = o[r] || o[r - 2] || o[0];
                return i
            }
        },
        mn.test(e) || (at.cssHooks[e + t].set = N)
    });
    var Nn = /%20/g,
    En = /\[\]$/,
    kn = /\r?\n/g,
    Sn = /^(?:submit|button|image|reset)$/i,
    An = /^(?:input|select|textarea|keygen)/i;
    at.fn.extend({
        serialize: function() {
            return at.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = at.prop(this, "elements");
                return e ? at.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !at(this).is(":disabled") && An.test(this.nodeName) && !Sn.test(e) && (this.checked || !Zt.test(e))
            }).map(function(e, t) {
                var n = at(this).val();
                return null == n ? null: at.isArray(n) ? at.map(n, 
                function(e) {
                    return {
                        name: t.name,
                        value: e.replace(kn, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(kn, "\r\n")
                }
            }).get()
        }
    }),
    at.param = function(e, n) {
        var r,
        i = [],
        o = function(e, t) {
            t = at.isFunction(t) ? t() : null == t ? "": t,
            i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (n === t && (n = at.ajaxSettings && at.ajaxSettings.traditional), at.isArray(e) || e.jquery && !at.isPlainObject(e)) at.each(e, 
        function() {
            o(this.name, this.value)
        });
        else for (r in e) j(r, e[r], n, o);
        return i.join("&").replace(Nn, "+")
    };
    var jn,
    Dn,
    $n = at.now(),
    Ln = /\?/,
    Hn = /#.*$/,
    Mn = /([?&])_=[^&]*/,
    qn = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Fn = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    On = /^(?:GET|HEAD)$/,
    _n = /^\/\//,
    Bn = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
    Pn = at.fn.load,
    Rn = {},
    Wn = {},
    In = "*/".concat("*");
    try {
        Dn = Q.href
    } catch(zn) {
        Dn = V.createElement("a"),
        Dn.href = "",
        Dn = Dn.href
    }
    jn = Bn.exec(Dn.toLowerCase()) || [],
    at.fn.load = function(e, n, r) {
        if ("string" != typeof e && Pn) return Pn.apply(this, arguments);
        var i,
        o,
        s,
        a = this,
        l = e.indexOf(" ");
        return l >= 0 && (i = e.slice(l, e.length), e = e.slice(0, l)),
        at.isFunction(n) ? (r = n, n = t) : n && "object" == typeof n && (o = "POST"),
        a.length > 0 && at.ajax({
            url: e,
            type: o,
            dataType: "html",
            data: n
        }).done(function(e) {
            s = arguments,
            a.html(i ? at("<div>").append(at.parseHTML(e)).find(i) : e)
        }).complete(r && 
        function(e, t) {
            a.each(r, s || [e.responseText, t, e])
        }),
        this
    },
    at.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], 
    function(e, t) {
        at.fn[t] = function(e) {
            return this.on(t, e)
        }
    }),
    at.each(["get", "post"], 
    function(e, n) {
        at[n] = function(e, r, i, o) {
            return at.isFunction(r) && (o = o || i, i = r, r = t),
            at.ajax({
                url: e,
                type: n,
                dataType: o,
                data: r,
                success: i
            })
        }
    }),
    at.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Dn,
            type: "GET",
            isLocal: Fn.test(jn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": In,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": e.String,
                "text html": !0,
                "text json": at.parseJSON,
                "text xml": at.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? L(L(e, at.ajaxSettings), t) : L(at.ajaxSettings, e)
        },
        ajaxPrefilter: D(Rn),
        ajaxTransport: D(Wn),
        ajax: function(e, n) {
            function r(e, n, r, a) {
                var u,
                f,
                v,
                b,
                w,
                C = n;
                2 !== x && (x = 2, l && clearTimeout(l), i = t, s = a || "", T.readyState = e > 0 ? 4: 0, r && (b = H(p, T, r)), e >= 200 && 300 > e || 304 === e ? (p.ifModified && (w = T.getResponseHeader("Last-Modified"), w && (at.lastModified[o] = w), w = T.getResponseHeader("etag"), w && (at.etag[o] = w)), 304 === e ? (u = !0, C = "notmodified") : (u = M(p, b), C = u.state, f = u.data, v = u.error, u = !v)) : (v = C, (e || !C) && (C = "error", 0 > e && (e = 0))), T.status = e, T.statusText = (n || C) + "", u ? m.resolveWith(d, [f, C, T]) : m.rejectWith(d, [T, C, v]), T.statusCode(y), y = t, c && h.trigger(u ? "ajaxSuccess": "ajaxError", [T, p, u ? f: v]), g.fireWith(d, [T, C]), c && (h.trigger("ajaxComplete", [T, p]), --at.active || at.event.trigger("ajaxStop")))
            }
            "object" == typeof e && (n = e, e = t),
            n = n || {};
            var i,
            o,
            s,
            a,
            l,
            u,
            c,
            f,
            p = at.ajaxSetup({},
            n),
            d = p.context || p,
            h = p.context && (d.nodeType || d.jquery) ? at(d) : at.event,
            m = at.Deferred(),
            g = at.Callbacks("once memory"),
            y = p.statusCode || {},
            v = {},
            b = {},
            x = 0,
            w = "canceled",
            T = {
                readyState: 0,
                getResponseHeader: function(e) {
                    var t;
                    if (2 === x) {
                        if (!a) for (a = {}; t = qn.exec(s);) a[t[1].toLowerCase()] = t[2];
                        t = a[e.toLowerCase()]
                    }
                    return null == t ? null: t
                },
                getAllResponseHeaders: function() {
                    return 2 === x ? s: null
                },
                setRequestHeader: function(e, t) {
                    var n = e.toLowerCase();
                    return x || (e = b[n] = b[n] || e, v[e] = t),
                    this
                },
                overrideMimeType: function(e) {
                    return x || (p.mimeType = e),
                    this
                },
                statusCode: function(e) {
                    var t;
                    if (e) if (2 > x) for (t in e) y[t] = [y[t], e[t]];
                    else T.always(e[T.status]);
                    return this
                },
                abort: function(e) {
                    var t = e || w;
                    return i && i.abort(t),
                    r(0, t),
                    this
                }
            };
            if (m.promise(T).complete = g.add, T.success = T.done, T.error = T.fail, p.url = ((e || p.url || Dn) + "").replace(Hn, "").replace(_n, jn[1] + "//"), p.type = n.method || n.type || p.method || p.type, p.dataTypes = at.trim(p.dataType || "*").toLowerCase().match(ut) || [""], null == p.crossDomain && (u = Bn.exec(p.url.toLowerCase()), p.crossDomain = !(!u || u[1] === jn[1] && u[2] === jn[2] && (u[3] || ("http:" === u[1] ? 80: 443)) == (jn[3] || ("http:" === jn[1] ? 80: 443)))), p.data && p.processData && "string" != typeof p.data && (p.data = at.param(p.data, p.traditional)), $(Rn, p, n, T), 2 === x) return T;
            c = p.global,
            c && 0 === at.active++&&at.event.trigger("ajaxStart"),
            p.type = p.type.toUpperCase(),
            p.hasContent = !On.test(p.type),
            o = p.url,
            p.hasContent || (p.data && (o = p.url += (Ln.test(o) ? "&": "?") + p.data, delete p.data), p.cache === !1 && (p.url = Mn.test(o) ? o.replace(Mn, "$1_=" + $n++) : o + (Ln.test(o) ? "&": "?") + "_=" + $n++)),
            p.ifModified && (at.lastModified[o] && T.setRequestHeader("If-Modified-Since", at.lastModified[o]), at.etag[o] && T.setRequestHeader("If-None-Match", at.etag[o])),
            (p.data && p.hasContent && p.contentType !== !1 || n.contentType) && T.setRequestHeader("Content-Type", p.contentType),
            T.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + In + "; q=0.01": "") : p.accepts["*"]);
            for (f in p.headers) T.setRequestHeader(f, p.headers[f]);
            if (p.beforeSend && (p.beforeSend.call(d, T, p) === !1 || 2 === x)) return T.abort();
            w = "abort";
            for (f in {
                success: 1,
                error: 1,
                complete: 1
            }) T[f](p[f]);
            if (i = $(Wn, p, n, T)) {
                T.readyState = 1,
                c && h.trigger("ajaxSend", [T, p]),
                p.async && p.timeout > 0 && (l = setTimeout(function() {
                    T.abort("timeout")
                },
                p.timeout));
                try {
                    x = 1,
                    i.send(v, r)
                } catch(C) {
                    if (! (2 > x)) throw C;
                    r( - 1, C)
                }
            } else r( - 1, "No Transport");
            return T
        },
        getScript: function(e, n) {
            return at.get(e, t, n, "script")
        },
        getJSON: function(e, t, n) {
            return at.get(e, t, n, "json")
        }
    }),
    at.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(e) {
                return at.globalEval(e),
                e
            }
        }
    }),
    at.ajaxPrefilter("script", 
    function(e) {
        e.cache === t && (e.cache = !1),
        e.crossDomain && (e.type = "GET", e.global = !1)
    }),
    at.ajaxTransport("script", 
    function(e) {
        if (e.crossDomain) {
            var n,
            r = V.head || at("head")[0] || V.documentElement;
            return {
                send: function(t, i) {
                    n = V.createElement("script"),
                    n.async = !0,
                    e.scriptCharset && (n.charset = e.scriptCharset),
                    n.src = e.url,
                    n.onload = n.onreadystatechange = function(e, t) { (t || !n.readyState || /loaded|complete/.test(n.readyState)) && (n.onload = n.onreadystatechange = null, n.parentNode && n.parentNode.removeChild(n), n = null, t || i(200, "success"))
                    },
                    r.insertBefore(n, r.firstChild)
                },
                abort: function() {
                    n && n.onload(t, !0)
                }
            }
        }
    });
    var Xn = [],
    Un = /(=)\?(?=&|$)|\?\?/;
    at.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Xn.pop() || at.expando + "_" + $n++;
            return this[e] = !0,
            e
        }
    }),
    at.ajaxPrefilter("json jsonp", 
    function(n, r, i) {
        var o,
        s,
        a,
        l = n.jsonp !== !1 && (Un.test(n.url) ? "url": "string" == typeof n.data && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Un.test(n.data) && "data");
        return l || "jsonp" === n.dataTypes[0] ? (o = n.jsonpCallback = at.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, l ? n[l] = n[l].replace(Un, "$1" + o) : n.jsonp !== !1 && (n.url += (Ln.test(n.url) ? "&": "?") + n.jsonp + "=" + o), n.converters["script json"] = function() {
            return a || at.error(o + " was not called"),
            a[0]
        },
        n.dataTypes[0] = "json", s = e[o], e[o] = function() {
            a = arguments
        },
        i.always(function() {
            e[o] = s,
            n[o] && (n.jsonpCallback = r.jsonpCallback, Xn.push(o)),
            a && at.isFunction(s) && s(a[0]),
            a = s = t
        }), "script") : void 0
    });
    var Vn,
    Qn,
    Yn = 0,
    Jn = e.ActiveXObject && 
    function() {
        var e;
        for (e in Vn) Vn[e](t, !0)
    };
    at.ajaxSettings.xhr = e.ActiveXObject ? 
    function() {
        return ! this.isLocal && q() || F()
    }: q,
    Qn = at.ajaxSettings.xhr(),
    at.support.cors = !!Qn && "withCredentials" in Qn,
    Qn = at.support.ajax = !!Qn,
    Qn && at.ajaxTransport(function(n) {
        if (!n.crossDomain || at.support.cors) {
            var r;
            return {
                send: function(i, o) {
                    var s,
                    a,
                    l = n.xhr();
                    if (n.username ? l.open(n.type, n.url, n.async, n.username, n.password) : l.open(n.type, n.url, n.async), n.xhrFields) for (a in n.xhrFields) l[a] = n.xhrFields[a];
                    n.mimeType && l.overrideMimeType && l.overrideMimeType(n.mimeType),
                    n.crossDomain || i["X-Requested-With"] || (i["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (a in i) l.setRequestHeader(a, i[a])
                    } catch(u) {}
                    l.send(n.hasContent && n.data || null),
                    r = function(e, i) {
                        var a,
                        u,
                        c,
                        f,
                        p;
                        try {
                            if (r && (i || 4 === l.readyState)) if (r = t, s && (l.onreadystatechange = at.noop, Jn && delete Vn[s]), i) 4 !== l.readyState && l.abort();
                            else {
                                f = {},
                                a = l.status,
                                p = l.responseXML,
                                c = l.getAllResponseHeaders(),
                                p && p.documentElement && (f.xml = p),
                                "string" == typeof l.responseText && (f.text = l.responseText);
                                try {
                                    u = l.statusText
                                } catch(d) {
                                    u = ""
                                }
                                a || !n.isLocal || n.crossDomain ? 1223 === a && (a = 204) : a = f.text ? 200: 404
                            }
                        } catch(h) {
                            i || o( - 1, h)
                        }
                        f && o(a, u, f, c)
                    },
                    n.async ? 4 === l.readyState ? setTimeout(r) : (s = ++Yn, Jn && (Vn || (Vn = {},
                    at(e).unload(Jn)), Vn[s] = r), l.onreadystatechange = r) : r()
                },
                abort: function() {
                    r && r(t, !0)
                }
            }
        }
    });
    var Gn,
    Kn,
    Zn = /^(?:toggle|show|hide)$/,
    er = new RegExp("^(?:([+-])=|)(" + lt + ")([a-z%]*)$", "i"),
    tr = /queueHooks$/,
    nr = [R],
    rr = {
        "*": [function(e, t) {
            var n,
            r,
            i = this.createTween(e, t),
            o = er.exec(t),
            s = i.cur(),
            a = +s || 0,
            l = 1,
            u = 20;
            if (o) {
                if (n = +o[2], r = o[3] || (at.cssNumber[e] ? "": "px"), "px" !== r && a) {
                    a = at.css(i.elem, e, !0) || n || 1;
                    do l = l || ".5",
                    a /= l,
                    at.style(i.elem, e, a + r);
                    while (l !== (l = i.cur() / s) && 1 !== l && --u)
                }
                i.unit = r,
                i.start = a,
                i.end = o[1] ? a + (o[1] + 1) * n: n
            }
            return i
        }]
    };
    at.Animation = at.extend(B, {
        tweener: function(e, t) {
            at.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");
            for (var n, r = 0, i = e.length; i > r; r++) n = e[r],
            rr[n] = rr[n] || [],
            rr[n].unshift(t)
        },
        prefilter: function(e, t) {
            t ? nr.unshift(e) : nr.push(e)
        }
    }),
    at.Tween = W,
    W.prototype = {
        constructor: W,
        init: function(e, t, n, r, i, o) {
            this.elem = e,
            this.prop = n,
            this.easing = i || "swing",
            this.options = t,
            this.start = this.now = this.cur(),
            this.end = r,
            this.unit = o || (at.cssNumber[n] ? "": "px")
        },
        cur: function() {
            var e = W.propHooks[this.prop];
            return e && e.get ? e.get(this) : W.propHooks._default.get(this)
        },
        run: function(e) {
            var t,
            n = W.propHooks[this.prop];
            return this.pos = t = this.options.duration ? at.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : e,
            this.now = (this.end - this.start) * t + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            n && n.set ? n.set(this) : W.propHooks._default.set(this),
            this
        }
    },
    W.prototype.init.prototype = W.prototype,
    W.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return null == e.elem[e.prop] || e.elem.style && null != e.elem.style[e.prop] ? (t = at.css(e.elem, e.prop, "auto"), t && "auto" !== t ? t: 0) : e.elem[e.prop]
            },
            set: function(e) {
                at.fx.step[e.prop] ? at.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[at.cssProps[e.prop]] || at.cssHooks[e.prop]) ? at.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now
            }
        }
    },
    W.propHooks.scrollTop = W.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    },
    at.each(["toggle", "show", "hide"], 
    function(e, t) {
        var n = at.fn[t];
        at.fn[t] = function(e, r, i) {
            return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(I(t, !0), e, r, i)
        }
    }),
    at.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(T).css("opacity", 0).show().end().animate({
                opacity: t
            },
            e, n, r)
        },
        animate: function(e, t, n, r) {
            var i = at.isEmptyObject(e),
            o = at.speed(t, n, r),
            s = function() {
                var t = B(this, at.extend({},
                e), o);
                s.finish = function() {
                    t.stop(!0)
                },
                (i || at._data(this, "finish")) && t.stop(!0)
            };
            return s.finish = s,
            i || o.queue === !1 ? this.each(s) : this.queue(o.queue, s)
        },
        stop: function(e, n, r) {
            var i = function(e) {
                var t = e.stop;
                delete e.stop,
                t(r)
            };
            return "string" != typeof e && (r = n, n = e, e = t),
            n && e !== !1 && this.queue(e || "fx", []),
            this.each(function() {
                var t = !0,
                n = null != e && e + "queueHooks",
                o = at.timers,
                s = at._data(this);
                if (n) s[n] && s[n].stop && i(s[n]);
                else for (n in s) s[n] && s[n].stop && tr.test(n) && i(s[n]);
                for (n = o.length; n--;) o[n].elem !== this || null != e && o[n].queue !== e || (o[n].anim.stop(r), t = !1, o.splice(n, 1)); (t || !r) && at.dequeue(this, e)
            })
        },
        finish: function(e) {
            return e !== !1 && (e = e || "fx"),
            this.each(function() {
                var t,
                n = at._data(this),
                r = n[e + "queue"],
                i = n[e + "queueHooks"],
                o = at.timers,
                s = r ? r.length: 0;
                for (n.finish = !0, at.queue(this, e, []), i && i.cur && i.cur.finish && i.cur.finish.call(this), t = o.length; t--;) o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0), o.splice(t, 1));
                for (t = 0; s > t; t++) r[t] && r[t].finish && r[t].finish.call(this);
                delete n.finish
            })
        }
    }),
    at.each({
        slideDown: I("show"),
        slideUp: I("hide"),
        slideToggle: I("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    },
    function(e, t) {
        at.fn[e] = function(e, n, r) {
            return this.animate(t, e, n, r)
        }
    }),
    at.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? at.extend({},
        e) : {
            complete: n || !n && t || at.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !at.isFunction(t) && t
        };
        return r.duration = at.fx.off ? 0: "number" == typeof r.duration ? r.duration: r.duration in at.fx.speeds ? at.fx.speeds[r.duration] : at.fx.speeds._default,
        (null == r.queue || r.queue === !0) && (r.queue = "fx"),
        r.old = r.complete,
        r.complete = function() {
            at.isFunction(r.old) && r.old.call(this),
            r.queue && at.dequeue(this, r.queue)
        },
        r
    },
    at.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return.5 - Math.cos(e * Math.PI) / 2
        }
    },
    at.timers = [],
    at.fx = W.prototype.init,
    at.fx.tick = function() {
        var e,
        n = at.timers,
        r = 0;
        for (Gn = at.now(); r < n.length; r++) e = n[r],
        e() || n[r] !== e || n.splice(r--, 1);
        n.length || at.fx.stop(),
        Gn = t
    },
    at.fx.timer = function(e) {
        e() && at.timers.push(e) && at.fx.start()
    },
    at.fx.interval = 13,
    at.fx.start = function() {
        Kn || (Kn = setInterval(at.fx.tick, at.fx.interval))
    },
    at.fx.stop = function() {
        clearInterval(Kn),
        Kn = null
    },
    at.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    at.fx.step = {},
    at.expr && at.expr.filters && (at.expr.filters.animated = function(e) {
        return at.grep(at.timers, 
        function(t) {
            return e === t.elem
        }).length
    }),
    at.fn.offset = function(e) {
        if (arguments.length) return e === t ? this: this.each(function(t) {
            at.offset.setOffset(this, e, t)
        });
        var n,
        r,
        i = {
            top: 0,
            left: 0
        },
        o = this[0],
        s = o && o.ownerDocument;
        if (s) return n = s.documentElement,
        at.contains(n, o) ? ("undefined" != typeof o.getBoundingClientRect && (i = o.getBoundingClientRect()), r = z(s), {
            top: i.top + (r.pageYOffset || n.scrollTop) - (n.clientTop || 0),
            left: i.left + (r.pageXOffset || n.scrollLeft) - (n.clientLeft || 0)
        }) : i
    },
    at.offset = {
        setOffset: function(e, t, n) {
            var r = at.css(e, "position");
            "static" === r && (e.style.position = "relative");
            var i,
            o,
            s = at(e),
            a = s.offset(),
            l = at.css(e, "top"),
            u = at.css(e, "left"),
            c = ("absolute" === r || "fixed" === r) && at.inArray("auto", [l, u]) > -1,
            f = {},
            p = {};
            c ? (p = s.position(), i = p.top, o = p.left) : (i = parseFloat(l) || 0, o = parseFloat(u) || 0),
            at.isFunction(t) && (t = t.call(e, n, a)),
            null != t.top && (f.top = t.top - a.top + i),
            null != t.left && (f.left = t.left - a.left + o),
            "using" in t ? t.using.call(e, f) : s.css(f)
        }
    },
    at.fn.extend({
        position: function() {
            if (this[0]) {
                var e,
                t,
                n = {
                    top: 0,
                    left: 0
                },
                r = this[0];
                return "fixed" === at.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), at.nodeName(e[0], "html") || (n = e.offset()), n.top += at.css(e[0], "borderTopWidth", !0), n.left += at.css(e[0], "borderLeftWidth", !0)),
                {
                    top: t.top - n.top - at.css(r, "marginTop", !0),
                    left: t.left - n.left - at.css(r, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent || V.documentElement; e && !at.nodeName(e, "html") && "static" === at.css(e, "position");) e = e.offsetParent;
                return e || V.documentElement
            })
        }
    }),
    at.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    },
    function(e, n) {
        var r = /Y/.test(n);
        at.fn[e] = function(i) {
            return at.access(this, 
            function(e, i, o) {
                var s = z(e);
                return o === t ? s ? n in s ? s[n] : s.document.documentElement[i] : e[i] : void(s ? s.scrollTo(r ? at(s).scrollLeft() : o, r ? o: at(s).scrollTop()) : e[i] = o)
            },
            e, i, arguments.length, null)
        }
    }),
    at.each({
        Height: "height",
        Width: "width"
    },
    function(e, n) {
        at.each({
            padding: "inner" + e,
            content: n,
            "": "outer" + e
        },
        function(r, i) {
            at.fn[i] = function(i, o) {
                var s = arguments.length && (r || "boolean" != typeof i),
                a = r || (i === !0 || o === !0 ? "margin": "border");
                return at.access(this, 
                function(n, r, i) {
                    var o;
                    return at.isWindow(n) ? n.document.documentElement["client" + e] : 9 === n.nodeType ? (o = n.documentElement, Math.max(n.body["scroll" + e], o["scroll" + e], n.body["offset" + e], o["offset" + e], o["client" + e])) : i === t ? at.css(n, r, a) : at.style(n, r, i, a)
                },
                n, s ? i: t, s, null)
            }
        })
    }),
    e.jQuery = e.$ = at,
    "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], 
    function() {
        return at
    })
} (window), +
function(e) {
    "use strict";
    var t = function(n, r) {
        this.options = e.extend({},
        t.DEFAULTS, r),
        this.$window = e(window).on("scroll.bs.affix.data-api", e.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", e.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = e(n),
        this.affixed = this.unpin = this.pinnedOffset = null,
        this.checkPosition()
    };
    t.RESET = "affix affix-top affix-bottom",
    t.DEFAULTS = {
        offset: 0
    },
    t.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(t.RESET).addClass("affix");
        var e = this.$window.scrollTop(),
        n = this.$element.offset();
        return this.pinnedOffset = n.top - e
    },
    t.prototype.checkPositionWithEventLoop = function() {
        setTimeout(e.proxy(this.checkPosition, this), 1)
    },
    t.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var n = e(document).height(),
            r = this.$window.scrollTop(),
            i = this.$element.offset(),
            o = this.options.offset,
            s = o.top,
            a = o.bottom;
            "top" == this.affixed && (i.top += r),
            "object" != typeof o && (a = s = o),
            "function" == typeof s && (s = o.top(this.$element)),
            "function" == typeof a && (a = o.bottom(this.$element));
            var l = null != this.unpin && r + this.unpin <= i.top ? !1: null != a && i.top + this.$element.height() >= n - a ? "bottom": null != s && s >= r ? "top": !1;
            if (this.affixed !== l) {
                this.unpin && this.$element.css("top", "");
                var u = "affix" + (l ? "-" + l: ""),
                c = e.Event(u + ".bs.affix");
                this.$element.trigger(c),
                c.isDefaultPrevented() || (this.affixed = l, this.unpin = "bottom" == l ? this.getPinnedOffset() : null, this.$element.removeClass(t.RESET).addClass(u).trigger(e.Event(u.replace("affix", "affixed"))), "bottom" == l && this.$element.offset({
                    top: n - a - this.$element.height()
                }))
            }
        }
    };
    var n = e.fn.affix;
    e.fn.affix = function(n) {
        return this.each(function() {
            var r = e(this),
            i = r.data("bs.affix"),
            o = "object" == typeof n && n;
            i || r.data("bs.affix", i = new t(this, o)),
            "string" == typeof n && i[n]()
        })
    },
    e.fn.affix.Constructor = t,
    e.fn.affix.noConflict = function() {
        return e.fn.affix = n,
        this
    },
    e(window).on("load", 
    function() {
        e('[data-spy="affix"]').each(function() {
            var t = e(this),
            n = t.data();
            n.offset = n.offset || {},
            n.offsetBottom && (n.offset.bottom = n.offsetBottom),
            n.offsetTop && (n.offset.top = n.offsetTop),
            t.affix(n)
        })
    })
} (jQuery), +
function(e) {
    "use strict";
    var t = function(t, n) {
        this.$element = e(t),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = n,
        this.paused = this.sliding = this.interval = this.$active = this.$items = null,
        "hover" == this.options.pause && this.$element.on("mouseenter", e.proxy(this.pause, this)).on("mouseleave", e.proxy(this.cycle, this))
    };
    t.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    },
    t.prototype.cycle = function(t) {
        return t || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(e.proxy(this.next, this), this.options.interval)),
        this
    },
    t.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"),
        this.$items = this.$active.parent().children(),
        this.$items.index(this.$active)

    },
    t.prototype.to = function(t) {
        var n = this,
        r = this.getActiveIndex();
        return t > this.$items.length - 1 || 0 > t ? void 0: this.sliding ? this.$element.one("slid.bs.carousel", 
        function() {
            n.to(t)
        }) : r == t ? this.pause().cycle() : this.slide(t > r ? "next": "prev", e(this.$items[t]))
    },
    t.prototype.pause = function(t) {
        return t || (this.paused = !0),
        this.$element.find(".next, .prev").length && e.support.transition && (this.$element.trigger(e.support.transition.end), this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    },
    t.prototype.next = function() {
        return this.sliding ? void 0: this.slide("next")
    },
    t.prototype.prev = function() {
        return this.sliding ? void 0: this.slide("prev")
    },
    t.prototype.slide = function(t, n) {
        var r = this.$element.find(".item.active"),
        i = n || r[t](),
        o = this.interval,
        s = "next" == t ? "left": "right",
        a = "next" == t ? "first": "last",
        l = this;
        if (!i.length) {
            if (!this.options.wrap) return;
            i = this.$element.find(".item")[a]()
        }
        if (i.hasClass("active")) return this.sliding = !1;
        var u = e.Event("slide.bs.carousel", {
            relatedTarget: i[0],
            direction: s
        });
        return this.$element.trigger(u),
        u.isDefaultPrevented() ? void 0: (this.sliding = !0, o && this.pause(), this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid.bs.carousel", 
        function() {
            var t = e(l.$indicators.children()[l.getActiveIndex()]);
            t && t.addClass("active")
        })), e.support.transition && this.$element.hasClass("slide") ? (i.addClass(t), i[0].offsetWidth, r.addClass(s), i.addClass(s), r.one(e.support.transition.end, 
        function() {
            i.removeClass([t, s].join(" ")).addClass("active"),
            r.removeClass(["active", s].join(" ")),
            l.sliding = !1,
            setTimeout(function() {
                l.$element.trigger("slid.bs.carousel")
            },
            0)
        }).emulateTransitionEnd(1e3 * r.css("transition-duration").slice(0, -1))) : (r.removeClass("active"), i.addClass("active"), this.sliding = !1, this.$element.trigger("slid.bs.carousel")), o && this.cycle(), this)
    };
    var n = e.fn.carousel;
    e.fn.carousel = function(n) {
        return this.each(function() {
            var r = e(this),
            i = r.data("bs.carousel"),
            o = e.extend({},
            t.DEFAULTS, r.data(), "object" == typeof n && n),
            s = "string" == typeof n ? n: o.slide;
            i || r.data("bs.carousel", i = new t(this, o)),
            "number" == typeof n ? i.to(n) : s ? i[s]() : o.interval && i.pause().cycle()
        })
    },
    e.fn.carousel.Constructor = t,
    e.fn.carousel.noConflict = function() {
        return e.fn.carousel = n,
        this
    },
    e(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", 
    function(t) {
        var n,
        r = e(this),
        i = e(r.attr("data-target") || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, "")),
        o = e.extend({},
        i.data(), r.data()),
        s = r.attr("data-slide-to");
        s && (o.interval = !1),
        i.carousel(o),
        (s = r.attr("data-slide-to")) && i.data("bs.carousel").to(s),
        t.preventDefault()
    }),
    e(window).on("load", 
    function() {
        e('[data-ride="carousel"]').each(function() {
            var t = e(this);
            t.carousel(t.data())
        })
    })
} (jQuery), +
function(e) {
    "use strict";
    function t() {
        var e = document.createElement("bootstrap"),
        t = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var n in t) if (void 0 !== e.style[n]) return {
            end: t[n]
        };
        return ! 1
    }
    e.fn.emulateTransitionEnd = function(t) {
        var n = !1,
        r = this;
        e(this).one(e.support.transition.end, 
        function() {
            n = !0
        });
        var i = function() {
            n || e(r).trigger(e.support.transition.end)
        };
        return setTimeout(i, t),
        this
    },
    e(function() {
        e.support.transition = t()
    })
} (jQuery), +
function(e) {
    "use strict";
    var t = function(n, r) {
        this.$element = e(n),
        this.options = e.extend({},
        t.DEFAULTS, r),
        this.transitioning = null,
        this.options.parent && (this.$parent = e(this.options.parent)),
        this.options.toggle && this.toggle()
    };
    t.DEFAULTS = {
        toggle: !0
    },
    t.prototype.dimension = function() {
        var e = this.$element.hasClass("width");
        return e ? "width": "height"
    },
    t.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t = e.Event("show.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var n = this.$parent && this.$parent.find("> .panel > .in");
                if (n && n.length) {
                    var r = n.data("bs.collapse");
                    if (r && r.transitioning) return;
                    n.collapse("hide"),
                    r || n.data("bs.collapse", null)
                }
                var i = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[i](0),
                this.transitioning = 1;
                var o = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[i]("auto"),
                    this.transitioning = 0,
                    this.$element.trigger("shown.bs.collapse")
                };
                if (!e.support.transition) return o.call(this);
                var s = e.camelCase(["scroll", i].join("-"));
                this.$element.one(e.support.transition.end, e.proxy(o, this)).emulateTransitionEnd(350)[i](this.$element[0][s])
            }
        }
    },
    t.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = e.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var n = this.dimension();
                this.$element[n](this.$element[n]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),
                this.transitioning = 1;
                var r = function() {
                    this.transitioning = 0,
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return e.support.transition ? void this.$element[n](0).one(e.support.transition.end, e.proxy(r, this)).emulateTransitionEnd(350) : r.call(this)
            }
        }
    },
    t.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide": "show"]()
    };
    var n = e.fn.collapse;
    e.fn.collapse = function(n) {
        return this.each(function() {
            var r = e(this),
            i = r.data("bs.collapse"),
            o = e.extend({},
            t.DEFAULTS, r.data(), "object" == typeof n && n); ! i && o.toggle && "show" == n && (n = !n),
            i || r.data("bs.collapse", i = new t(this, o)),
            "string" == typeof n && i[n]()
        })
    },
    e.fn.collapse.Constructor = t,
    e.fn.collapse.noConflict = function() {
        return e.fn.collapse = n,
        this
    },
    e(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", 
    function(t) {
        var n,
        r = e(this),
        i = r.attr("data-target") || t.preventDefault() || (n = r.attr("href")) && n.replace(/.*(?=#[^\s]+$)/, ""),
        o = e(i),
        s = o.data("bs.collapse"),
        a = s ? "toggle": r.data(),
        l = r.attr("data-parent"),
        u = l && e(l);
        s && s.transitioning || (u && u.find('[data-toggle=collapse][data-parent="' + l + '"]').not(r).addClass("collapsed"), r[o.hasClass("in") ? "addClass": "removeClass"]("collapsed")),
        o.collapse(a)
    })
} (jQuery), $(document).ready(function() {
    function e() {
        var e = document.getElementById("loading");
        e.parentNode.removeChild(e)
    }
    if ($("#forum").length) {
        document.getElementById("loading-forum-txt").appendChild(document.createTextNode("Loading Forum ...")),
        document.getElementById("forum_embed").onload = e,
        document.getElementById("forum_embed").src = "https://groups.google.com/forum/embed/?place=forum/mobile-angular-ui-forum&showsearch=true&showpopout=true&showtabs=false&hideforumtitle=true&hidesubject=true&parenturl=" + encodeURIComponent(window.location.href)
    }
}), $(document).ready(function() {
    var e = $(".github-count"),
    t = $(".twitter-count"),
    n = $(".google-plus-count"); (e.length || t.length || n.length) && $.get("http://mobile-angular-ui-social.herokuapp.com/", 
    function(r) {
        e.text("" + r.github + " stars"),
        t.text("" + r.twitter + " followers"),
        n.text("" + r.google + " followers")
    });
    var r = $("#toc");
    if (r.length) {
        {
            var i = r.parent();
            $(".navbar")
        }
        $footer = $(".footer"),
        $(window).resize(function() {
            r.width(i.width())
        }).trigger("resize"),
        r.affix({
            offset: {
                top: 0,
                bottom: function() {
                    return $footer.outerHeight(!0)
                }
            }
        });
        var o = function(e) {
            var t = $(window).scrollTop(),
            n = e.offset().top;
            return t + 400 > n ? !0: !1
        },
        s = function() {
            var e = [];
            r.find("a").each(function() {
                e.push({
                    tocItem: $(this),
                    header: $(this.hash)
                })
            }),
            found = null;
            for (var t = e.length - 1; t >= 0; t--) {
                var n = e[t];
                if (o(n.header)) {
                    found = n.tocItem;
                    break
                }
            }
            r.find("li").removeClass("active"),
            found && found.parentsUntil("#toc", "li").addClass("active")
        };
        $(window).scroll(s),
        $(window).resize(s),
        $(window).trigger("scroll")
    }
    $("a[href*=#]:not([href=#]):not([data-slide])").click(function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
            var e = $(this.hash);
            if (e = e.length ? e: $("[name=" + this.hash.slice(1) + "]"), e.length) return $("html,body").animate({
                scrollTop: e.offset().top - 70
            },
            500),
            !1
        }
    })
}), navigator.userAgent.match(/IEMobile\/10\.0/)) {
    var msViewportStyle = document.createElement("style");
    msViewportStyle.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}")),
    document.querySelector("head").appendChild(msViewportStyle)
}