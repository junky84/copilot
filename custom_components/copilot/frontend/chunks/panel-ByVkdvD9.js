/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ke = globalThis, Fs = ke.ShadowRoot && (ke.ShadyCSS === void 0 || ke.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Gs = Symbol(), ii = /* @__PURE__ */ new WeakMap();
let rn = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Gs) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Fs && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ii.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ii.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Pn = (r) => new rn(typeof r == "string" ? r : r + "", void 0, Gs), rt = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new rn(e, r, Gs);
}, Ln = (r, t) => {
  if (Fs) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = ke.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, ni = Fs ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Pn(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Wn, defineProperty: Dn, getOwnPropertyDescriptor: Tn, getOwnPropertyNames: On, getOwnPropertySymbols: Hn, getPrototypeOf: Vn } = Object, Je = globalThis, oi = Je.trustedTypes, Bn = oi ? oi.emptyScript : "", Nn = Je.reactiveElementPolyfillSupport, ce = (r, t) => r, ws = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Bn : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, an = (r, t) => !Wn(r, t), ri = { attribute: !0, type: String, converter: ws, reflect: !1, useDefault: !1, hasChanged: an };
Symbol.metadata ??= Symbol("metadata"), Je.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Zt = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = ri) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Dn(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Tn(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const a = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? ri;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ce("elementProperties"))) return;
    const t = Vn(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ce("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ce("properties"))) {
      const e = this.properties, s = [...On(e), ...Hn(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(ni(i));
    } else t !== void 0 && e.push(ni(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Ln(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : ws).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : ws;
      this._$Em = i;
      const a = o.fromAttribute(e, n.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? an)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, n] of s) {
        const { wrapped: o } = n, a = this[i];
        o !== !0 || this._$AL.has(i) || a === void 0 || this.C(i, void 0, n, a);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
Zt.elementStyles = [], Zt.shadowRootOptions = { mode: "open" }, Zt[ce("elementProperties")] = /* @__PURE__ */ new Map(), Zt[ce("finalized")] = /* @__PURE__ */ new Map(), Nn?.({ ReactiveElement: Zt }), (Je.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Us = globalThis, ai = (r) => r, Ae = Us.trustedTypes, li = Ae ? Ae.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ln = "$lit$", Ct = `lit$${Math.random().toFixed(9).slice(2)}$`, cn = "?" + Ct, Rn = `<${cn}>`, jt = document, de = () => jt.createComment(""), he = (r) => r === null || typeof r != "object" && typeof r != "function", Zs = Array.isArray, In = (r) => Zs(r) || typeof r?.[Symbol.iterator] == "function", ss = `[ 	
\f\r]`, ee = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ci = /-->/g, pi = />/g, Ht = RegExp(`>|${ss}(?:([^\\s"'>=/]+)(${ss}*=${ss}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), di = /'/g, hi = /"/g, pn = /^(?:script|style|textarea|title)$/i, dn = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), f = dn(1), S = dn(2), Yt = Symbol.for("lit-noChange"), y = Symbol.for("lit-nothing"), ui = /* @__PURE__ */ new WeakMap(), Nt = jt.createTreeWalker(jt, 129);
function hn(r, t) {
  if (!Zs(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return li !== void 0 ? li.createHTML(t) : t;
}
const jn = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = ee;
  for (let a = 0; a < e; a++) {
    const l = r[a];
    let d, p, h = -1, m = 0;
    for (; m < l.length && (o.lastIndex = m, p = o.exec(l), p !== null); ) m = o.lastIndex, o === ee ? p[1] === "!--" ? o = ci : p[1] !== void 0 ? o = pi : p[2] !== void 0 ? (pn.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = Ht) : p[3] !== void 0 && (o = Ht) : o === Ht ? p[0] === ">" ? (o = i ?? ee, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, d = p[1], o = p[3] === void 0 ? Ht : p[3] === '"' ? hi : di) : o === hi || o === di ? o = Ht : o === ci || o === pi ? o = ee : (o = Ht, i = void 0);
    const u = o === Ht && r[a + 1].startsWith("/>") ? " " : "";
    n += o === ee ? l + Rn : h >= 0 ? (s.push(d), l.slice(0, h) + ln + l.slice(h) + Ct + u) : l + Ct + (h === -2 ? a : u);
  }
  return [hn(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class ue {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = t.length - 1, l = this.parts, [d, p] = jn(t, e);
    if (this.el = ue.createElement(d, s), Nt.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = Nt.nextNode()) !== null && l.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ln)) {
          const m = p[o++], u = i.getAttribute(h).split(Ct), _ = /([.?@])?(.*)/.exec(m);
          l.push({ type: 1, index: n, name: _[2], strings: u, ctor: _[1] === "." ? Fn : _[1] === "?" ? Gn : _[1] === "@" ? Un : Qe }), i.removeAttribute(h);
        } else h.startsWith(Ct) && (l.push({ type: 6, index: n }), i.removeAttribute(h));
        if (pn.test(i.tagName)) {
          const h = i.textContent.split(Ct), m = h.length - 1;
          if (m > 0) {
            i.textContent = Ae ? Ae.emptyScript : "";
            for (let u = 0; u < m; u++) i.append(h[u], de()), Nt.nextNode(), l.push({ type: 2, index: ++n });
            i.append(h[m], de());
          }
        }
      } else if (i.nodeType === 8) if (i.data === cn) l.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(Ct, h + 1)) !== -1; ) l.push({ type: 7, index: n }), h += Ct.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = jt.createElement("template");
    return s.innerHTML = t, s;
  }
}
function Xt(r, t, e = r, s) {
  if (t === Yt) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = he(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = Xt(r, i._$AS(r, t.values), i, s)), t;
}
class Kn {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? jt).importNode(e, !0);
    Nt.currentNode = i;
    let n = Nt.nextNode(), o = 0, a = 0, l = s[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let d;
        l.type === 2 ? d = new fe(n, n.nextSibling, this, t) : l.type === 1 ? d = new l.ctor(n, l.name, l.strings, this, t) : l.type === 6 && (d = new Zn(n, this, t)), this._$AV.push(d), l = s[++a];
      }
      o !== l?.index && (n = Nt.nextNode(), o++);
    }
    return Nt.currentNode = jt, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class fe {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = Xt(this, t, e), he(t) ? t === y || t == null || t === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : t !== this._$AH && t !== Yt && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : In(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== y && he(this._$AH) ? this._$AA.nextSibling.data = t : this.T(jt.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = ue.createElement(hn(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new Kn(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = ui.get(t.strings);
    return e === void 0 && ui.set(t.strings, e = new ue(t)), e;
  }
  k(t) {
    Zs(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new fe(this.O(de()), this.O(de()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = ai(t).nextSibling;
      ai(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class Qe {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = y;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = Xt(this, t, e, 0), o = !he(t) || t !== this._$AH && t !== Yt, o && (this._$AH = t);
    else {
      const a = t;
      let l, d;
      for (t = n[0], l = 0; l < n.length - 1; l++) d = Xt(this, a[s + l], e, l), d === Yt && (d = this._$AH[l]), o ||= !he(d) || d !== this._$AH[l], d === y ? t = y : t !== y && (t += (d ?? "") + n[l + 1]), this._$AH[l] = d;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Fn extends Qe {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === y ? void 0 : t;
  }
}
class Gn extends Qe {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== y);
  }
}
class Un extends Qe {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = Xt(this, t, e, 0) ?? y) === Yt) return;
    const s = this._$AH, i = t === y && s !== y || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== y && (s === y || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Zn {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    Xt(this, t);
  }
}
const qn = Us.litHtmlPolyfillSupport;
qn?.(ue, fe), (Us.litHtmlVersions ??= []).push("3.3.3");
const Yn = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new fe(t.insertBefore(de(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const qs = globalThis;
class st extends Zt {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Yn(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Yt;
  }
}
st._$litElement$ = !0, st.finalized = !0, qs.litElementHydrateSupport?.({ LitElement: st });
const Xn = qs.litElementPolyfillSupport;
Xn?.({ LitElement: st });
(qs.litElementVersions ??= []).push("4.2.2");
const mi = "copilot.standalone.plant", se = "copilot.standalone.icons";
function _e(r, t) {
  try {
    const e = localStorage.getItem(r);
    return e ? JSON.parse(e) : t;
  } catch {
    return t;
  }
}
function is(r, t) {
  try {
    localStorage.setItem(r, JSON.stringify(t));
  } catch {
  }
}
function vs(r) {
  return r?.code === "conflict";
}
class Jn {
  constructor(t) {
    this.hass = t;
  }
  get standalone() {
    return !!this.hass.__standalone;
  }
  setHass(t) {
    this.hass = t;
  }
  async getConfig() {
    return this.standalone ? { version: "demo", plant: _e(mi, null), options: {}, is_admin: !0 } : this.hass.callWS({ type: "copilot/config/get" });
  }
  /**
   * Save the plant. With `rev` the backend refuses (error code `conflict`) when the plant was
   * changed elsewhere since that revision. Resolves to the new revision.
   */
  async saveConfig(t, e) {
    if (this.standalone) {
      is(mi, t);
      return;
    }
    const s = { type: "copilot/config/save", plant: t };
    return e !== void 0 && (s.rev = e), (await this.hass.callWS(s)).rev;
  }
  /** Follow saves from every window; the current state is delivered right away (and after reconnects). */
  async subscribeConfig(t) {
    return this.standalone || !this.hass.connection ? () => {
    } : this.hass.connection.subscribeMessage((e) => t(e.plant, e.rev), {
      type: "copilot/config/subscribe"
    });
  }
  async write(t, e, s) {
    return this.hass.callWS({ type: "copilot/write", component_id: t, slot: e, value: s });
  }
  async listBackups() {
    return this.standalone ? [] : (await this.hass.callWS({ type: "copilot/backups/list" })).backups;
  }
  async restoreBackup(t) {
    return this.hass.callWS({ type: "copilot/backups/restore", ts: t });
  }
  async scan(t) {
    return this.standalone ? { source: "ems_esp", entity_count: 0, entities: [], suggestions: [] } : this.hass.callWS({ type: "copilot/mapping/scan", source: "ems_esp", plant: t });
  }
  async listIcons() {
    return this.standalone ? _e(se, []) : (await this.hass.callWS({ type: "copilot/icons/list" })).icons;
  }
  async uploadIcon(t, e, s, i) {
    if (this.standalone) {
      const n = _e(se, []), o = { id: Math.random().toString(16).slice(2, 14), name: t, mime: e, iso: i, size: s.length, data_url: `data:${e};base64,${s}` };
      return n.push(o), is(se, n), o;
    }
    return (await this.hass.callWS({ type: "copilot/icons/upload", name: t, mime: e, data: s, iso: i })).icon;
  }
  async deleteIcon(t) {
    if (this.standalone) return is(se, _e(se, []).filter((e) => e.id !== t));
    await this.hass.callWS({ type: "copilot/icons/delete", icon_id: t });
  }
  async listMessages() {
    return this.standalone ? [] : (await this.hass.callWS({ type: "copilot/messages/list" })).messages;
  }
  async subscribeMessages(t) {
    return this.standalone || !this.hass.connection ? () => {
    } : this.hass.connection.subscribeMessage((e) => t(e.message), {
      type: "copilot/messages/subscribe"
    });
  }
  async clearMessages() {
    this.standalone || await this.hass.callWS({ type: "copilot/messages/clear" });
  }
}
const Qn = {
  // navigation
  "nav.overview": "Übersicht",
  "nav.messages": "Meldungen",
  "nav.curve": "Heizkurve",
  "cv.title": "Heizkurve",
  "cv.curve": "aktuelle Kurve",
  "cv.preview": "Vorschau",
  "cv.points": "Messpunkte (Stundenmittel, {days} Tage)",
  "cv.points_since": "Messpunkte (Stundenmittel) seit {date}",
  "cv.restart": "Messpunkte neu beginnen",
  "cv.show_all": "Wieder die letzten {days} Tage zeigen",
  "cv.restart_title": "Messpunkte neu beginnen?",
  "cv.restart_text": "Die Ansicht zeigt dann nur noch Messpunkte ab dem gewählten Zeitpunkt – sinnvoll, nachdem die Heizkurve oder die Anlage geändert wurde. Die Statistik in Home Assistant bleibt erhalten, du kannst jederzeit zurück.",
  "cv.restart_from": "Ab",
  "cv.now": "jetzt",
  "cv.axis_flow": "Vorlauf °C",
  "cv.no_heating": "Heizgrenze",
  "cv.params": "Parameter",
  "cv.p.design": "Auslegungstemperatur",
  "cv.p.offset": "Parallelverschiebung",
  "cv.p.limit": "Heizgrenze (Sommer ab)",
  "cv.p.minFlow": "Min. Vorlauf",
  "cv.p.maxFlow": "Max. Vorlauf",
  "cv.p.minExt": "Min. Außentemperatur",
  "cv.p.roomSet": "Raum-Soll",
  "cv.readonly": "Zum Verstellen müssen die Parameter beschreibbaren Entitäten (number) zugeordnet sein – EMS-ESP stellt sie als „number“ bereit.",
  "cv.applied": "Übernommen.",
  "cv.analysis": "Auswertung",
  "cv.deviation_above": "Die Messpunkte liegen im Mittel {value} K über der Kurve.",
  "cv.deviation_below": "Die Messpunkte liegen im Mittel {value} K unter der Kurve.",
  "cv.room": "Raumtemperatur im Mittel {room} °C bei einem Soll von {set} °C.",
  "cv.suggest_down": "Es wird wärmer als nötig. Vorschlag: Parallelverschiebung um {value} K auf {target} K senken – spart Strom.",
  "cv.suggest_up": "Es wird nicht ganz warm genug. Vorschlag: Parallelverschiebung um {value} K auf {target} K anheben.",
  "cv.try": "Als Vorschau übernehmen",
  "cv.fits": "Raumtemperatur passt – Kurve muss nicht geändert werden.",
  "cv.no_room": "Für eine Empfehlung bitte die Raumtemperatur (Referenzraum) am Heizkreis zuordnen.",
  "cv.no_points": "Noch keine Messpunkte: Außentemperatur und Vorlauf brauchen eine Langzeitstatistik (entsteht nach etwa einer Stunde).",
  "cv.demo_note": "Demo: Die letzten 24 h stammen aus der Simulation, ältere Punkte sind modelliert. Änderungen wirken sofort auf die Simulation.",
  "cv.confirm_title": "Heizkurve ändern?",
  "cv.confirm_demo": "Die Änderung gilt für die Simulation.",
  "cv.confirm_live": "Die Werte werden über EMS-ESP an die Regelung (BC400) geschrieben.",
  "nav.check": "Check",
  "chk.title": "Anlagen-Check",
  "chk.subtitle": "Auswertung der letzten 24 Stunden nach gängigen Faustregeln für Wärmepumpenanlagen.",
  "chk.demo": "Demo: Daten aus der Simulation.",
  "chk.refresh": "Neu auswerten",
  "chk.running": "Werte den Verlauf aus …",
  "chk.ok": "In Ordnung",
  "chk.nodata": "Keine passenden Daten im Verlauf – Werte zuordnen oder später erneut prüfen.",
  "chk.mixing.title": "Mischungsverlust am Puffer",
  "chk.mixing.detail": "Im Heizbetrieb ist der WP-Vorlauf (TC1) im Mittel {value} K wärmer als der Puffer oben ({minutes} min ausgewertet). Ziel: ≤ 2 K.",
  "chk.mixing.hint": "Der Wärmepumpenkreis mischt sich im Puffer mit kälterem Wasser. Meist fördert PC0 deutlich mehr als PC1 oder umgekehrt – Pumpenstufen bzw. Volumenströme angleichen und den Puffer-Fühler (T0) prüfen.",
  "chk.cycling.title": "Takten des Verdichters",
  "chk.cycling.detail": "Starts in {hours} h: {starts} (Ø {perHour} pro Stunde, höchstens {maxPerHour} in einer Stunde), mittlere Laufzeit {avgRun} min je Start. Ziel: höchstens 3 Starts pro Stunde, Laufzeit ≥ 20 min.",
  "chk.cycling.hint": "Häufiges Takten kostet Effizienz und Lebensdauer. Ursachen: Heizkurve zu hoch, zu kleine Schalthysterese, zu wenig nutzbares Volumen (Thermostatventile geschlossen) oder Leistung in der Übergangszeit zu groß.",
  "chk.spread.title": "Spreizung Vorlauf/Rücklauf",
  "chk.spread.detail": "Im Heizbetrieb liegt die Spreizung TC1−TC0 im Mittel bei {value} K. Zielbereich: 3–8 K.",
  "chk.spread.hint_low": "Sehr kleine Spreizung: Volumenstrom höher als nötig (Pumpenleistung) – kostet Strom, oft auch höherer Mischungsverlust.",
  "chk.spread.hint_high": "Große Spreizung: zu wenig Volumenstrom – Partikelfilter SC1, Abgleich und Pumpeneinstellung prüfen.",
  "chk.defrost.title": "Abtauungen",
  "chk.defrost.detail": "{count} Abtauungen, zusammen {minutes} min = {share} % der Laufzeit. Bis etwa 8 % ist bei feuchter Witterung normal.",
  "chk.defrost.hint": "Viele Abtauungen: Verdampfer verschmutzt oder zugestellt, Luftkurzschluss am Aufstellort oder Kondensatablauf/Wannenheizung prüfen.",
  "chk.aux.title": "Elektrischer Zuheizer",
  "chk.aux.detail": "Zuheizer in den letzten 24 h: {minutes} min aktiv.",
  "chk.aux.hint": "Der Zuheizer arbeitet mit COP 1. Häufiger Einsatz deutet auf zu hohe Anforderungen (Heizkurve, Warmwasser-Temperatur, Desinfektion) oder Einstellungen zur Bivalenz/Zuheizer-Verzögerung hin.",
  "chk.pressure.title": "Anlagendruck",
  "chk.pressure.detail": "Druck in 24 h zwischen {min} und {max} bar (erlaubt {lo}–{hi} bar).",
  "chk.pressure.hint": "Druck nah an der Grenze oder fallend: Vordruck des Ausdehnungsgefäßes prüfen, Anlage auf Undichtigkeiten kontrollieren, ggf. nachfüllen (VE-Wasser).",
  "nav.efficiency": "Effizienz",
  "ed.cop_ref": "COP laut Datenblatt bei A7/W35",
  "eff.live": "Live-COP",
  "eff.expected": "Soll bei A{out}/W{flow}",
  "eff.ratio": "Erreicht",
  "eff.ampel.green": "Läuft wie im Datenblatt",
  "eff.ampel.yellow": "Etwas unter Soll – beobachten",
  "eff.ampel.red": "Deutlich unter Soll – prüfen",
  "eff.no_live": "Kein Live-COP: Verdichter steht oder taut ab.",
  "eff.today": "Heute",
  "eff.yesterday": "Gestern",
  "eff.month": "Monat",
  "eff.year": "Jahr",
  "eff.estimate": "Schätzung",
  "eff.heat": "Wärme",
  "eff.el": "Strom",
  "eff.dhw_share": "Anteil Warmwasser",
  "eff.aux_share": "Anteil Zuheizer",
  "eff.daily": "Letzte 30 Tage",
  "eff.spf_short": "AZ",
  "cv.tip": "{out} außen → {flow} Vorlauf",
  "cv.target": "Soll jetzt",
  "eff.demo_note": "Demo: Heute und gestern stammen aus der Simulation, ältere Tage sowie Monat und Jahr sind eine Modellschätzung (Rhein-Main-Klima, 5 Personen).",
  "eff.missing.no_counters": "Für Monats- und Jahreswerte bitte an der Inneneinheit die Energiezähler „Wärme gesamt“ und „Strom gesamt“ zuordnen.",
  "eff.missing.no_statistics": "Die Energiezähler haben noch keine Langzeitstatistik. Sie entsteht automatisch, sobald die Entitäten eine state_class haben (bei EMS-ESP der Fall) – die ersten Werte erscheinen nach etwa einer Stunde.",
  "nav.config": "Konfiguration",
  "cfg.wizard": "Assistent",
  "cfg.editor": "Editor",
  "cfg.mapping": "Zuordnung",
  "cfg.icons": "Icons",
  "cfg.settings": "Einstellungen",
  // general
  on: "Ein",
  off: "Aus",
  save: "Speichern",
  saved: "Gespeichert",
  cancel: "Abbrechen",
  delete: "Löschen",
  apply: "Übernehmen",
  close: "Schließen",
  undo: "Rückgängig",
  redo: "Wiederholen",
  unsaved: "Ungespeicherte Änderungen",
  discard: "Verwerfen",
  "sync.conflict": "Nicht gespeichert: Die Anlage wurde zwischenzeitlich in einem anderen Fenster geändert. Der aktuelle Stand wurde geladen.",
  "sync.stale": "Die Anlage wurde in einem anderen Fenster geändert. Dein Entwurf ist noch nicht gespeichert.",
  "sync.take": "Neuen Stand übernehmen",
  "sync.keep": "Meinen Entwurf behalten",
  none: "–",
  unavailable: "nicht verfügbar",
  readonly_hint: "Nur Administratoren können die Anlage konfigurieren.",
  standalone_hint: "Eigenständige Demo – Konfiguration wird nur im Browser gespeichert.",
  fullscreen: "Vollbild",
  fit: "Einpassen",
  zoom_in: "Vergrößern",
  zoom_out: "Verkleinern",
  menu: "Menü",
  // modes
  "mode.heating": "Heizen",
  "mode.hot_water": "Warmwasser",
  "mode.defrost": "Abtauen",
  "mode.cooling": "Kühlen",
  "mode.off": "Bereit",
  "mode.compressor_alarm": "Störung",
  "mode.pool": "Pool",
  "mode.pool_heating": "Pool",
  "mode.unknown": "Unbekannt",
  // kpi
  "kpi.mode": "Betrieb",
  "kpi.outdoor": "Außen",
  "kpi.heat": "Wärme",
  "kpi.power": "Strom",
  "kpi.cop": "COP",
  "kpi.supply": "Vorlauf",
  "kpi.dhw": "Warmwasser",
  "kpi.room": "Raum",
  // demo
  demo: "Demo",
  "demo.active": "Demo-Modus",
  "demo.banner": "Demo-Modus: simulierte Werte, keine Verbindung zur Anlage",
  "demo.speed": "Tempo",
  "demo.outdoor": "Außentemperatur",
  "demo.time": "Simulationszeit",
  "demo.scenarios": "Szenarien",
  "scn.normal": "Normalbetrieb",
  "scn.winter": "Wintermorgen −10 °C",
  "scn.transition": "Übergangszeit 12 °C",
  "scn.shower": "Warmwasser zapfen",
  "scn.defrost": "Abtauung",
  "scn.dim14a": "§14a-Dimmung",
  "scn.pv": "PV-Überschuss",
  "scn.disinfect": "Therm. Desinfektion",
  "scn.fault": "Störung simulieren",
  "scn.reset": "Zurücksetzen",
  // messages
  "msg.title": "Meldungen",
  "msg.empty": "Keine Meldungen",
  "msg.active": "Aktiv",
  "msg.history": "Verlauf",
  "msg.clear": "Verlauf leeren",
  "msg.since": "seit {time}",
  "msg.duration": "Dauer {duration}",
  "msg.filter_all": "Alle",
  "msg.level.info": "Info",
  "msg.level.notice": "Hinweis",
  "msg.level.warning": "Warnung",
  "msg.level.error": "Störung",
  "msgk.dhw_charging": "Warmwasserladung ({component})",
  "msgk.dhw_disinfection": "Thermische Desinfektion läuft ({component})",
  "msgk.input_active": "Externer Eingang {input} aktiv{label_sfx}",
  "msgk.aux_heater": "Elektrischer Zuheizer aktiv",
  "msgk.defrost": "Abtauung der Außeneinheit",
  "msgk.compressor_alarm": "Verdichter-Störung gemeldet",
  "msgk.pressure_low": "Anlagendruck niedrig: {value} bar (min. {min} bar)",
  "msgk.pressure_high": "Anlagendruck hoch: {value} bar (max. {max} bar)",
  "msgk.error_code": "Fehlercode: {code}",
  "msgk.data_unavailable": "Keine Daten: {missing} von {total} Entitäten nicht verfügbar – Gateway prüfen",
  "msgk.sim_fault": "Simulierte Störung: Hochdruck-Abschaltung (Demo)",
  "msgk.sim_scenario": "Szenario gestartet: {name}",
  "ed.nominal": "Nennleistung (kW)",
  "ed.not": "nicht",
  "ed.or": "oder mindestens eine davon",
  "kpi.target": "Soll",
  "st.heat_load": "Heizlast bei Normaußentemperatur (kW, für Demo)",
  "card.show_kpis": "Kennzahlen anzeigen",
  "card.show_messages": "Meldungsspalte anzeigen",
  "card.show_demo": "Demo-Steuerung anzeigen",
  "card.height": "Höhe (z. B. 600px; leer = automatisch)",
  "card.hint": "Tipp: Als einzige Karte in einer Ansicht vom Typ „Panel“ füllt COPilot den ganzen Bildschirm.",
  "wr.title": "Wert ändern",
  "wr.change": "Ändern …",
  "wr.press": "Auslösen …",
  "wr.apply": "Übernehmen",
  "wr.confirm": "Wirklich ändern: {old} → {new}?",
  "wr.press_confirm": "Wirklich auslösen?",
  "wr.done": "Geändert – die Anlage übernimmt den Wert in Kürze.",
  "wr.failed": "Nicht geändert",
  "wr.demo": "Im Demo-Modus und in der Zeitmaschine kann nichts geändert werden.",
  "wr.no_permission": "Nur Administratoren dürfen Werte ändern.",
  "wr.on": "Ein",
  "wr.off": "Aus",
  "wr.release": "Schreibbar: darf aus COPilot geändert werden (mit Bestätigung)",
  "msgk.value_changed": "{component}: {slot_label} geändert {old} → {new} ({user})",
  "st.write_non_admin": "Auch Nicht-Admins dürfen freigegebene Werte ändern",
  "st.write_hint": "Werte werden im Editor einzeln mit ✎ freigegeben. Jede Änderung braucht eine Bestätigung und wird unter Meldungen protokolliert.",
  "nav.maintenance": "Wartung",
  "bld.outside": "Außen",
  "wz.shower": "Dusche",
  "bld.living": "Wohnraum",
  "bld.plant_room": "Technikraum",
  "bld.basement": "Keller",
  "ed.building": "Gebäude anzeigen",
  "ed.raster": "Raster & Fang",
  "ed.grid_show": "Raster einblenden",
  "ed.grid_step": "Rasterweite",
  "ed.grid_cells": "{n} × 20 px",
  "ed.grid_snap": "Am Raster fangen",
  "ed.object_snap": "Objektfang (Anschlüsse, Kanten, Mitten)",
  "ed.snap_hint": "Gelbe Punkte verschieben die Geraden einer ausgewählten Leitung. Wertefelder lassen sich frei verschieben. Alt gedrückt halten = ohne Fang.",
  "ed.values_reset": "Wertefelder zurücksetzen",
  "ed.connection": "Anschluss",
  "ed.conn.side": "seitlich",
  "ed.conn.bottom": "unten",
  "ed.tap_kind": "Ausführung",
  "ed.tap.tap": "Wasserhahn",
  "ed.tap.shower": "Dusche",
  "msgk.maintenance_due": "Wartung fällig: {task}",
  "mt.title": "Wartungskalender",
  "mt.hint": "Wiederkehrende Aufgaben rund um die Anlage. Fällige Aufgaben erscheinen auch unter Meldungen (und lösen das Event copilot_message aus, z. B. für eine Push-Nachricht). Intervalle sind Richtwerte – maßgeblich sind die Anleitungen deiner Geräte.",
  "mt.n_due": "{n} fällig",
  "mt.all_ok": "Alles erledigt",
  "mt.n_unknown": "{n} ohne Datum",
  "mt.enter_date": "Noch kein Datum – bitte „Zuletzt“ eintragen",
  "mt.overdue": "Fällig seit {n} Tagen",
  "mt.next": "Nächste am {date} (in {n} Tagen)",
  "mt.last": "Zuletzt",
  "mt.every": "Alle",
  "mt.months": "Monate",
  "mt.done": "Erledigt",
  "mt.done_confirm": "„{task}“ heute als erledigt eintragen?",
  "mt.remove": "Entfernen",
  "mt.remove_confirm": "Aufgabe „{task}“ entfernen?",
  "mt.new": "Eigene Aufgabe, z. B. Kondensatablauf prüfen",
  "mt.add": "Hinzufügen",
  "mt.pressure": "Anlagendruck prüfen",
  "mt.pressure_how": "Druck am Manometer bzw. in COPilot ablesen; bei kalter Anlage meist 1,0–1,5 bar. Bei Bedarf nachfüllen (lassen).",
  "mt.filter": "Schmutzfilter SC1 reinigen",
  "mt.filter_how": "Absperren, Sieb herausnehmen und ausspülen. Nach der Inbetriebnahme häufiger, danach etwa jährlich.",
  "mt.separator": "Schlamm-/Magnetitabscheider entleeren",
  "mt.separator_how": "Ablasshahn kurz öffnen, bis klares Wasser kommt; Magnet ggf. abnehmen. Anschließend Druck prüfen.",
  "mt.expansion": "Ausdehnungsgefäß-Vordruck prüfen",
  "mt.expansion_how": "Vordruck des MAG messen (Anlage drucklos) und mit dem Sollwert vergleichen – meist Teil der Wartung durch den Fachbetrieb.",
  "mt.outdoor": "Außeneinheit reinigen",
  "mt.outdoor_how": "Laub und Schmutz vom Verdampfer entfernen, Lamellen nicht verbiegen, Kondensatablauf und Ansaug-/Ausblasbereich freihalten.",
  "mt.anode": "Schutzanode des Warmwasserspeichers prüfen",
  "mt.anode_how": "Magnesiumanode sichtprüfen bzw. Schutzstrom messen; bei starkem Abtrag tauschen (Fachbetrieb).",
  "mt.service": "Wartung durch den Fachbetrieb",
  "mt.service_how": "Jährliche Inspektion: Kältekreis (Dichtheit, R290-Hinweise), Elektrik, Sicherheitsventile, Einstellungen.",
  "cost.title": "Kosten & PV-Anteil",
  "cost.today": "Heute",
  "cost.yesterday": "Gestern",
  "cost.days30": "Letzte 30 Tage",
  "cost.grid_cost": "Netzstrom",
  "cost.pv_share": "Anteil PV/Akku",
  "cost.feed_loss": "Entgangene Einspeisung",
  "cost.per_kwh": "Kosten je kWh Wärme",
  "cost.vs_gas": "Gleiche Wärme mit Gas",
  "cost.daily": "Wärmepumpen-Strom je Tag",
  "cost.grid_kwh": "Netz",
  "cost.self_kwh": "PV/Akku",
  "cost.cost_eur": "Kosten €",
  "cost.no_share": "PV-Anteil unbekannt – dafür die Energie-Ebene (Netzleistung) und die elektrische Leistung der Wärmepumpe einrichten.",
  "cost.hint": "Preise und Vergleich unter Konfiguration → Einstellungen. „Kosten je kWh Wärme“ enthält die entgangene Einspeisevergütung.",
  "st.tariff": "Strompreis & Vergleich",
  "st.tariff_hint": "Für die Kosten im Effizienz-Reiter. Vom Netz bezogener Wärmepumpen-Strom kostet den Strompreis; selbst erzeugter PV-Strom die entgangene Einspeisevergütung.",
  "st.t_mode": "Strompreis",
  "st.t_fixed": "Fester Preis",
  "st.t_entity": "Aus Entität (z. B. dynamischer Tarif)",
  "st.t_price": "Preis (€/kWh)",
  "st.t_entity_pick": "Preis-Entität (€/kWh)",
  "st.t_feed_in": "Einspeisevergütung (€/kWh)",
  "st.t_gas": "Vergleich: Gaspreis (€/kWh)",
  "st.t_gas_eff": "Vergleich: Kesselwirkungsgrad (%)",
  "tm.title": "Zeitmaschine",
  "tm.play": "Abspielen",
  "tm.pause": "Pause",
  "tm.speed": "Tempo",
  "tm.speed_v": "{min} min/s",
  "tm.range": "Zeitraum",
  "tm.hours": "{h} h",
  "tm.live": "Live",
  "bk.title": "Sicherungen",
  "bk.hint": "Vor jedem Speichern und bei jedem Update wird die bisherige Anlage samt Anordnung automatisch gesichert (die letzten 15). Zusätzlich kannst du die Anlage als Datei exportieren.",
  "bk.export": "Exportieren",
  "bk.import": "Importieren",
  "bk.restore": "Wiederherstellen",
  "bk.restore_confirm": "Anlage vom {date} wiederherstellen? Der aktuelle Stand wird vorher gesichert.",
  "bk.import_confirm": "„{name}“ ({n} Komponenten) importieren? Der aktuelle Stand wird vorher gesichert.",
  "bk.restored": "Anlage wiederhergestellt.",
  "bk.imported": "Anlage importiert.",
  "bk.invalid": "Keine gültige COPilot-Anlagendatei",
  "bk.none": "Noch keine Sicherungen – die erste entsteht beim nächsten Speichern oder Update.",
  "bk.demo": "In der eigenständigen Demo gibt es keine Sicherungen.",
  "bk.components": "{n} Komponenten",
  "bk.reason.save": "vor dem Speichern",
  "bk.reason.update": "vor dem Update",
  "bk.reason.restore": "vor dem Wiederherstellen",
  "bk.reason.import": "vor dem Import",
  // energy layer
  "en.title": "Energiefluss",
  "en.toggle": "Energie-Ebene",
  "en.pv": "PV",
  "en.grid": "Netz",
  "en.grid_import": "Netzbezug",
  "en.grid_export": "Einspeisung",
  "en.battery": "Akku",
  "en.bat_charge": "Akku lädt",
  "en.bat_discharge": "Akku entlädt",
  "en.hp": "Wärmepumpe",
  "en.house": "Haus",
  "en.wallbox": "Wallbox",
  "en.share": "Eigenversorgung jetzt {pct} %",
  "en.dimmed": "§14a gedimmt · max. {kw} kW",
  "en.pv_signal": "PV-Überschuss → WP",
  "st.energy": "Energie-Ebene",
  "st.energy_hint": "Zeigt PV, Netz, Akku, Haus und Wallbox rund um die Wärmepumpe (Leistung in W oder kW). Im Demo-Modus simuliert.",
  "st.energy_enabled": "Energie-Ebene anzeigen",
  "st.energy_detect": "Automatisch erkennen (evcc / SolaX)",
  "st.energy_detected": "Vorschlag übernommen – bitte prüfen und speichern.",
  "st.energy_none": "Keine bekannten Entitäten gefunden – bitte von Hand wählen.",
  "st.e_pv": "PV-Leistung",
  "st.e_grid": "Netzleistung (Bezug positiv)",
  "st.e_grid_invert": "Entität meldet Einspeisung positiv",
  "st.e_battery": "Akkuleistung (Entladen positiv)",
  "st.e_battery_invert": "Entität meldet Laden positiv",
  "st.e_soc": "Akku-Ladestand (%)",
  "st.e_house": "Hausverbrauch",
  "st.e_house_hp": "Hausverbrauch enthält die Wärmepumpe",
  "st.e_wallbox": "Wallbox-Ladeleistung",
  "st.e_limit": "§14a-Mindestleistung beim Dimmen (kW)",
  "st.save": "Speichern",
  // explain mode
  "ex.title": "Was passiert gerade?",
  "ex.toggle": "Erklär-Modus",
  "ex.tap_hint": "Tipp: Tippe auf eine Komponente, um zu erfahren, wofür sie da ist.",
  "ex.empty": "Noch keine Werte – sobald Daten da sind, erkläre ich hier die Anlage.",
  "ex.alarm": "Am Außengerät liegt eine Störung vor – der Verdichter ist gesperrt. Details stehen unter Meldungen.",
  "ex.defrost": "Das Außengerät taut ab. Bei {out} °C und feuchter Luft vereist der Verdampfer; dafür läuft der Kältekreis kurz rückwärts und holt sich Wärme aus dem Heizwasser.",
  "ex.defrost_hint": "Das dauert meist 3–8 Minuten, der Vorlauf sinkt dabei kurz ab – völlig normal.",
  "ex.dhw_charge": "Die Wärmepumpe lädt Warmwasser: VW1 steht auf B, das heiße Heizwasser strömt durch die Wendel im Speicher. Speicher {dhw} °C, Ziel {set} °C.",
  "ex.dhw_charge_short": "Die Wärmepumpe lädt Warmwasser: VW1 steht auf B, das heiße Heizwasser strömt durch die Wendel im Speicher.",
  "ex.dhw_charge_hint": "Für Warmwasser braucht es höhere Temperaturen als zum Heizen – der COP ist dabei niedriger.",
  "ex.heating_air": "Die Wärmepumpe heizt: Sie holt Wärme aus der Außenluft ({out} °C) und gibt {heat} kW an das Heizwasser ab. Dafür braucht sie {el} kW Strom.",
  "ex.heating_air_short": "Die Wärmepumpe heizt: Sie holt Wärme aus der Außenluft ({out} °C) und gibt sie an das Heizwasser ab.",
  "ex.heating_ground": "Die Wärmepumpe heizt: Sie holt Wärme aus dem Erdreich (Sole) und gibt {heat} kW an das Heizwasser ab. Dafür braucht sie {el} kW Strom.",
  "ex.heating_ground_short": "Die Wärmepumpe heizt: Sie holt Wärme aus dem Erdreich (Sole) und gibt sie an das Heizwasser ab.",
  "ex.off_limit": "Die Wärmepumpe steht: Bei {out} °C ist die Heizgrenze von {limit} °C erreicht. Geheizt wird nur noch Warmwasser bei Bedarf.",
  "ex.off_buffer": "Die Wärmepumpe pausiert: Der Puffer ist mit {buf} °C warm genug (Soll-Vorlauf {target} °C). Sie startet wieder, wenn er abkühlt.",
  "ex.off_buffer_hint": "Lange Pausen statt vieler kurzer Starts schonen den Verdichter.",
  "ex.off": "Die Wärmepumpe ist bereit und wartet auf eine Wärmeanforderung.",
  "ex.cop": "Momentaner COP {cop}: Aus 1 kWh Strom werden gerade {cop} kWh Wärme.",
  "ex.cop_modulating": "Der Verdichter läuft mit {speed} % – er passt seine Leistung dem Bedarf an, statt nur an/aus zu schalten.",
  "ex.curve": "Heizkurve: Bei {out} °C draußen verlangt die Regelung {target} °C Vorlauf, aktuell sind es {sup} °C.",
  "ex.curve_short": "Heizkurve: Bei {out} °C draußen verlangt die Regelung {target} °C Vorlauf.",
  "ex.curve_hint": "Je niedriger der Vorlauf, desto effizienter – jedes Grad weniger bringt etwa 2–3 % mehr COP.",
  "ex.spread_ok": "Vorlauf {sup} °C, Rücklauf {ret} °C – die Spreizung von {spread} K passt.",
  "ex.spread_low": "Spreizung nur {spread} K (Vorlauf {sup} °C, Rücklauf {ret} °C): Es fließt mehr Wasser als nötig – die Pumpe könnte langsamer laufen.",
  "ex.spread_high": "Spreizung {spread} K (Vorlauf {sup} °C, Rücklauf {ret} °C): Es fließt zu wenig Wasser – das kostet Effizienz.",
  "ex.buffer": "Der Pufferspeicher hat oben {buf} °C. Er trennt Wärmepumpe und Heizkreise und überbrückt Pausen.",
  "ex.buffer_pc1": "Der Pufferspeicher hat oben {buf} °C. PC0 lädt ihn, PC1 versorgt daraus die Heizkörper.",
  "ex.buffer_mixing": "Mischverlust {loss} K: Oben im Puffer ist es kälter als im Vorlauf der Wärmepumpe – der Heizkreis zieht mehr Wasser als die Wärmepumpe liefert.",
  "ex.room": "{name}: Raum {room} °C, Soll {set} °C.",
  "ex.room_short": "{name}: Raum {room} °C.",
  "ex.disinfect": "Thermische Desinfektion: Der Warmwasserspeicher wird einmalig über 60 °C geheizt (Legionellenschutz), meist mit dem Zuheizer.",
  "ex.dhw_idle": "Warmwasser {dhw} °C (Soll {set} °C) – im Moment ist keine Ladung nötig.",
  "ex.dhw_idle_short": "Warmwasser {dhw} °C – im Moment ist keine Ladung nötig.",
  "ex.tap": "Es wird Warmwasser gezapft ({flow} l/min): Oben fließt heißes Wasser ab, unten strömt kaltes nach.",
  "ex.circ": "Die Zirkulationspumpe läuft: Warmwasser kreist durch die Leitungen, damit es an der Zapfstelle sofort warm kommt.",
  "ex.circ_hint": "Das kostet Wärme – eine Zeitsteuerung auf die Zapfzeiten spart Energie.",
  "ex.aux": "Der elektrische Zuheizer läuft ({aux} %).",
  "ex.aux_short": "Der elektrische Zuheizer läuft.",
  "ex.aux_hint": "Er macht aus 1 kWh Strom nur 1 kWh Wärme (COP 1) – sinnvoll nur bei sehr tiefen Temperaturen, Desinfektion oder Störung.",
  "ex.input_14a": "§14a-Steuerung aktiv (Eingang {n}): Der Netzbetreiber hat die Leistung gedimmt, die Wärmepumpe läuft gedrosselt.",
  "ex.input_pv": "PV-Überschuss gemeldet (Eingang {n}): Die Wärmepumpe darf Temperaturen anheben und Solarstrom als Wärme speichern.",
  "ex.input_other": "Externer Eingang {n} ({label}) ist aktiv.",
  "exc.outdoor": "Holt mit Ventilator und Kältekreis Wärme aus der Außenluft – selbst bei Minusgraden – und hebt sie mit dem Verdichter auf Heiztemperatur.",
  "exc.outdoor_brine": "Holt über Erdsonden oder Kollektoren Wärme aus dem Erdreich (Sole) und hebt sie mit dem Verdichter auf Heiztemperatur.",
  "exc.indoor_wall_e": "Die Inneneinheit ist die Zentrale: Regler, Heizungspumpe PC0, Umschaltventil VW1 (Heizen/Warmwasser) und elektrischer Zuheizer.",
  "exc.indoor_t180": "Inneneinheit mit eingebautem 180-l-Warmwasserspeicher: Regler, PC0, VW1, Zuheizer und Heizkreispumpe PC1 in einem Gehäuse.",
  "exc.indoor_tp70": "Inneneinheit mit eingebautem 70-l-Puffer: Regler, PC0, VW1, Zuheizer und Heizkreispumpe PC1 in einem Gehäuse.",
  "exc.indoor_brine": "Sole-Kompaktgerät: Kältekreis mit Verdichter, Regler, Pumpen, VW1 und Zuheizer in einem Gehäuse.",
  "exc.pump_primary": "Wärmepumpenkreispumpe (PC0): fördert das Wasser durch die Wärmepumpe.",
  "exc.pump_hc": "Heizkreispumpe: fördert das warme Wasser zu den Heizflächen.",
  "exc.pump_circ": "Zirkulationspumpe (PW2): hält das Warmwasser in den Leitungen in Bewegung, damit es an der Zapfstelle sofort warm ist.",
  "exc.valve_3way": "3-Wege-Ventil: schaltet zwischen Heizen (A) und Warmwasserladung (B) um.",
  "exc.filter": "Schmutzfilter SC1: hält Partikel vom Wärmetauscher der Wärmepumpe fern.",
  "exc.separator": "Schlamm-/Magnetitabscheider: holt Schlamm und Rostpartikel aus dem Rücklauf, bevor sie die Wärmepumpe erreichen.",
  "exc.buffer": "Pufferspeicher: trennt Wärmepumpe und Heizkreise hydraulisch, sichert Mindestdurchfluss und Abtau-Energie und verhindert häufiges Takten.",
  "exc.dhw_tank": "Warmwasserspeicher: Die Wendel innen erwärmt das Trinkwasser; oben wird heißes Wasser entnommen, unten strömt kaltes nach.",
  "exc.mixer": "Mischer: mischt Rücklaufwasser bei, damit der Heizkreis genau die gewünschte Vorlauftemperatur bekommt.",
  "exc.radiators": "Heizkörper geben die Wärme an den Raum ab. Je größer die Fläche, desto niedriger kann der Vorlauf sein.",
  "exc.floor_heating": "Fußbodenheizung: große Fläche, niedrige Vorlauftemperatur – ideal für Wärmepumpen.",
  "exc.tap": "Zapfstelle: Dusche, Bad oder Küche.",
  "exc.water_inlet": "Kaltwasseranschluss vom Hausnetz.",
  "exc.expansion_vessel": "Ausdehnungsgefäß (MAG): nimmt die Volumenänderung des Heizwassers beim Erwärmen auf und hält den Druck stabil.",
  "exs.defrost": "Gerade: taut ab.",
  "exs.compressor_on": "Gerade: Verdichter läuft.",
  "exs.compressor_off": "Gerade: Verdichter aus.",
  "exs.vw1_a": "Gerade: VW1 auf A – Heizbetrieb.",
  "exs.vw1_b": "Gerade: VW1 auf B – Warmwasserladung.",
  "exs.running": "Gerade: läuft.",
  "exs.stopped": "Gerade: aus.",
  "exs.valve_a": "Gerade: Stellung A (Heizen).",
  "exs.valve_b": "Gerade: Stellung B (Warmwasser).",
  // components
  "type.outdoor_unit": "Außeneinheit",
  "type.indoor_unit": "Inneneinheit",
  "type.buffer": "Pufferspeicher",
  "type.dhw_tank": "Warmwasserspeicher",
  "type.pump": "Pumpe",
  "type.valve_3way": "3-Wege-Ventil",
  "type.mixer": "Mischer",
  "type.radiators": "Heizkörper",
  "type.floor_heating": "Fußbodenheizung",
  "type.tap": "Zapfstelle",
  "type.water_inlet": "Kaltwasser",
  "type.separator": "Schlammabscheider",
  "type.expansion_vessel": "Ausdehnungsgefäß",
  "type.junction": "Abzweig",
  "type.value_tile": "Wertekachel",
  "type.label": "Beschriftung",
  "kind.supply": "Vorlauf",
  "kind.return": "Rücklauf",
  "kind.dhw_hot": "Warmwasser",
  "kind.dhw_cold": "Kaltwasser",
  "kind.circulation": "Zirkulation",
  // slots
  "slot.outdoor_temp": "Außentemperatur",
  "slot.air_in_temp": "Lufteintritt (TL2)",
  "slot.activity": "Betriebszustand",
  "slot.compressor_on": "Verdichter",
  "slot.compressor_speed": "Verdichterdrehzahl",
  "slot.fan_speed": "Lüfter",
  "slot.heat_power": "Wärmeleistung",
  "slot.el_power": "Elektr. Leistung",
  "slot.compressor_starts": "Verdichterstarts",
  "slot.evap_in_temp": "Verdampfereintritt (TR4)",
  "slot.comp_out_temp": "Heißgas (TR6)",
  "slot.comp_in_temp": "Sauggas (TR5)",
  "slot.hp_temp": "Hochdruck (PH1)",
  "slot.lp_temp": "Niederdruck (PL1)",
  "slot.drain_pan_temp": "Kondensatwanne (TA4)",
  "slot.silent_mode": "Silentmodus",
  "slot.supply_temp": "Vorlauf",
  "slot.return_temp": "Rücklauf",
  "slot.indoor_unit.supply_temp": "Vorlauf (TC1)",
  "slot.indoor_unit.return_temp": "Rücklauf (TC0)",
  "slot.condenser_temp": "Kondensator (TC3)",
  "slot.target_flow_temp": "Vorlauf-Soll",
  "slot.pressure": "Anlagendruck",
  "slot.flow": "Durchfluss",
  "slot.aux_level": "Zuheizer",
  "slot.aux_status": "Zuheizer-Status",
  "slot.aux_step1": "Zuheizer Stufe 1",
  "slot.aux_step2": "Zuheizer Stufe 2",
  "slot.aux_step3": "Zuheizer Stufe 3",
  "slot.service_code": "Statuscode",
  "slot.service_code_number": "Statuscode-Nr.",
  "slot.last_error": "Letzter Fehler",
  "slot.input1": "Ext. Eingang 1",
  "slot.input2": "Ext. Eingang 2",
  "slot.input3": "Ext. Eingang 3",
  "slot.input4": "Ext. Eingang 4",
  "slot.el_energy_total": "Strom gesamt",
  "slot.el_energy_heating": "Strom Heizen",
  "slot.el_energy_dhw": "Strom Warmwasser",
  "slot.heat_energy_total": "Wärme gesamt",
  "slot.heat_energy_heating": "Wärme Heizen",
  "slot.heat_energy_dhw": "Wärme Warmwasser",
  "slot.aux_energy_total": "Strom Zuheizer",
  "slot.uptime_total": "Betriebszeit",
  "slot.heating_active": "Heizbetrieb",
  "slot.dhw_active": "WW-Betrieb",
  "slot.running": "Läuft",
  "slot.speed": "Drehzahl",
  "slot.power": "Leistung",
  "slot.position": "Stellung",
  "slot.temp_top": "Temperatur oben",
  "slot.temp_mid": "Temperatur Mitte",
  "slot.temp_bottom": "Temperatur unten",
  "slot.setpoint": "Solltemperatur",
  "slot.charging": "Ladung",
  "slot.onetime": "Einmalladung",
  "slot.disinfecting": "Desinfektion",
  "slot.flow_temp": "Vorlauf",
  "slot.room_temp": "Raumtemperatur",
  "slot.room_setpoint": "Raum-Soll",
  "slot.mode": "Betriebsart",
  "slot.summer_mode": "Sommerbetrieb",
  "slot.operating_state": "Betriebszustand",
  "slot.design_temp": "Auslegungstemperatur",
  "slot.offset_temp": "Parallelverschiebung",
  "slot.min_flow_temp": "Min. Vorlauf",
  "slot.max_flow_temp": "Max. Vorlauf",
  "slot.temp": "Temperatur",
  "slot.min_ext_temp": "Min. Außentemperatur (Auslegung)",
  "slot.heating_limit": "Heizgrenze",
  "slot.value": "Wert",
  // overview
  "ov.no_plant": "Noch keine Anlage konfiguriert.",
  "ov.start_wizard": "Assistent starten",
  "ov.details": "Details",
  "ov.history24": "Letzte 24 h",
  "ov.min": "Min",
  "ov.max": "Max",
  "ov.now": "Aktuell",
  "ov.no_history": "Kein Verlauf verfügbar",
  "ov.open_entity": "Entität öffnen",
  "ov.not_bound": "nicht zugeordnet",
  // wizard
  "wz.title": "Anlagen-Assistent",
  "wz.intro": "Beschreibe deine Anlage, der Assistent erzeugt daraus ein Schema. Danach kannst du es im Editor frei anpassen.",
  "wz.name": "Name der Anlage",
  "wz.hp": "Wärmepumpe",
  "wz.outdoor": "Außeneinheit / Modell",
  "wz.indoor": "Inneneinheit",
  "wz.buffer": "Pufferspeicher",
  "wz.buffer.none": "Kein Puffer",
  "wz.buffer.parallel": "Parallel (Trennspeicher, 4-Punkt, mit Sekundärpumpe)",
  "wz.buffer.serial": "In Reihe (im Rücklauf)",
  "wz.buffer_volume": "Puffervolumen (l)",
  "wz.dhw": "Warmwasser",
  "wz.dhw.none": "Kein Warmwasser",
  "wz.dhw.tank": "Externer Speicher über 3-Wege-Ventil",
  "wz.dhw_volume": "Speichervolumen (l)",
  "wz.circulation": "Zirkulationsleitung",
  "wz.circuits": "Heizkreise",
  "wz.circuit": "Heizkreis {n}",
  "wz.add_circuit": "Heizkreis hinzufügen",
  "wz.remove": "Entfernen",
  "wz.emitter": "Wärmeübergabe",
  "wz.mixed": "gemischt",
  "wz.aux": "Elektrischer Zuheizer",
  "wz.aux_kw": "Zuheizer-Leistung (kW)",
  "wz.extras": "Extras",
  "wz.separator": "Partikelfilter SC1 und Schlammabscheider im Rücklauf vor der Inneneinheit",
  "wz.separator_short": "Abscheider",
  "wz.expansion": "Ausdehnungsgefäß (im Rücklauf vor der Inneneinheit)",
  "wz.generate": "Schema erzeugen",
  "wz.replace_confirm": "Das erzeugt ein neues Schema und ersetzt die aktuelle Anlage (Zuordnungen gleicher Komponenten bleiben erhalten). Fortfahren?",
  "wz.example": "Beispielanlage laden",
  "wz.done": "Schema erzeugt – jetzt im Editor anpassen oder Werte zuordnen.",
  // editor
  "ed.palette": "Komponenten",
  "ed.props": "Eigenschaften",
  "ed.nothing": "Komponente oder Leitung auswählen. Leitungen ziehst du, indem du nacheinander zwei Anschlusspunkte anklickst.",
  "ed.label": "Bezeichnung",
  "ed.model": "Modell",
  "ed.rotation": "Drehung",
  "ed.flip": "Anschlüsse rechts (gespiegelt)",
  "ed.icon": "Icon",
  "ed.icon_default": "Standard",
  "ed.role": "Funktion",
  "ed.circuit": "Heizkreis-Nr.",
  "ed.dhw_circuit": "WW-Kreis-Nr.",
  "ed.bindings": "Werte & Entitäten",
  "ed.show": "anzeigen",
  "ed.pipe": "Leitung",
  "ed.kind": "Art",
  "ed.flow_when": "Animiert, wenn",
  "ed.add_cond": "Bedingung hinzufügen",
  "ed.temp_entity": "Temperatur-Entität",
  "ed.flow_entity": "Durchfluss-Entität",
  "ed.reset_bend": "Verlauf zurücksetzen",
  "ed.connecting": "Zielanschluss anklicken (Esc bricht ab)",
  "ed.grid": "Rastergröße",
  "ed.entries": "Einträge",
  "ed.add_entry": "Eintrag hinzufügen",
  "ed.text": "Text",
  "ed.volume": "Volumen (l)",
  "ed.input_labels": "Bezeichnung ext. Eingänge",
  "ed.pressure_limits": "Druckgrenzen (bar)",
  "ed.b_label": "Bezeichnung Stellung B",
  "ed.duplicate": "Duplizieren",
  "ed.auto": "Auto anordnen",
  "ed.auto_title": "Bewertet mehrere Anordnungen (Kreuzungen, Kollisionen, Leitungslänge) und übernimmt die beste – rückgängig machbar",
  "ed.auto_done_tpl": "Angeordnet nach Vorlage mit realen Anschlusslagen – {crossings} Kreuzungen. Rückgängig mit ⌘Z.",
  "ed.auto_done": "Automatisch angeordnet – {crossings} Kreuzungen. Rückgängig mit ⌘Z.",
  "ed.entity_search": "Entität suchen …",
  "role.primary": "Primärpumpe (PC0)",
  "role.secondary": "Heizkreispumpe / Sekundär (PC1)",
  "role.hc": "Heizkreispumpe gemischter HK",
  "role.circulation": "Zirkulationspumpe",
  "role.other": "Sonstige",
  "role.dhw_switch": "Umschaltung Heizen / Warmwasser (VW1)",
  "state.running": "läuft",
  "state.a": "Stellung A (Heizen)",
  "state.b": "Stellung B (Warmwasser)",
  "state.defrost": "taut ab",
  "state.flowing": "zapft",
  "state.charging": "lädt",
  "state.aux": "Zuheizer an",
  "state.pc1": "PC1 läuft",
  "slot.pc0_running": "PC0 läuft",
  "slot.pc0_speed": "PC0 Drehzahl",
  "slot.vw1_position": "VW1 Stellung (an = Warmwasser)",
  "slot.pc1_running": "PC1 läuft",
  "slot.pc1_speed": "PC1 Drehzahl",
  "slot.dhw_temp": "Warmwasser",
  "slot.dhw_setpoint": "WW-Soll",
  "slot.dhw_charging": "WW-Ladung",
  "slot.buffer_temp": "Puffer",
  "ed.variant": "Bauform",
  // mapping
  "map.title": "Automatische Zuordnung",
  "map.intro": "Sucht EMS-ESP-Entitäten in Home Assistant und ordnet sie den Komponenten zu. Vorhandene Zuordnungen überschreibst du nur, wenn du sie anhakst.",
  "map.scan": "Entitäten suchen",
  "map.found": "{count} EMS-ESP-Entitäten gefunden",
  "map.none": "Keine EMS-ESP-Entitäten gefunden.",
  "map.none_help": "Gateway einrichten: In EMS-ESP MQTT aktivieren, „Home Assistant MQTT Discovery“ einschalten und als Entity-ID-Format „Single instance, short names“ wählen. In Home Assistant muss die MQTT-Integration laufen.",
  "map.component": "Komponente",
  "map.slot": "Wert",
  "map.entity": "Entität",
  "map.value": "Aktuell",
  "map.current": "bisher",
  "map.confidence": "Treffer",
  "map.conf.high": "sicher",
  "map.conf.medium": "Alternative",
  "map.apply": "Ausgewählte übernehmen",
  "map.applied": "{count} Zuordnungen übernommen",
  "map.select_all": "Alle",
  "map.unbound": "Ohne Zuordnung",
  "map.unbound_hint": "Diese Werte bekommst du im Editor per Entitätssuche – z. B. Fritzbox-Steckdose der Zirkulation, Puffer-Fühler an den Tauchhülsen oder Werte aus SolaX/evcc.",
  "map.standalone": "In der eigenständigen Demo gibt es keine Home-Assistant-Entitäten.",
  // icons
  "ic.title": "Eigene Icons",
  "ic.intro": "Lade eigene Grafiken hoch (SVG, PNG, WebP, JPG, max. 256 KB). Zuweisen kannst du sie im Editor pro Komponente oder hier als Standard für einen Komponententyp. Die mitgelieferten Icons sind eigene Zeichnungen ohne Herstellergrafiken.",
  "ic.upload": "Icon hochladen",
  "ic.iso": "Für isometrische Ansicht",
  "ic.empty": "Noch keine eigenen Icons.",
  "ic.type_default": "Standard für Typ",
  "ic.used_by": "Eigenes Icon von: {list}",
  "ic.default_for": "Standard für: {list}",
  "ic.unused": "Nicht zugewiesen",
  "ic.own_one": "Komponente nutzt eigenes Icon: {name}",
  "ic.own_some": "{n} von {m} Komponenten mit eigenem Icon",
  "ic.err.unsupported_type": "Dateityp nicht unterstützt",
  "ic.err.too_large": "Datei zu groß (max. 256 KB)",
  "ic.err.unsafe_svg": "SVG enthält Skripte oder aktive Inhalte",
  "ic.err.invalid_data": "Datei ist beschädigt oder hat das falsche Format",
  "ic.err.too_many": "Zu viele Icons",
  // settings
  "st.title": "Einstellungen",
  "st.style": "Darstellung",
  "st.style.flat": "Modern SCADA (flach)",
  "st.style.iso": "2.5D (mit Tiefe)",
  "st.demo": "Demo-Modus",
  "st.demo_hint": "Zeigt simulierte Werte mit laufenden Animationen – ideal, solange die Anlage noch nicht angeschlossen ist.",
  "st.language": "Sprache",
  "st.lang.auto": "Wie Home Assistant",
  "st.version": "Version",
  "st.about": "Über COPilot",
  "st.reset": "Anlage zurücksetzen",
  "st.reset_confirm": "Komplette Anlage löschen und mit der Beispielanlage neu starten?"
}, to = {
  "nav.overview": "Overview",
  "nav.messages": "Messages",
  "nav.curve": "Heating curve",
  "cv.title": "Heating curve",
  "cv.curve": "current curve",
  "cv.preview": "preview",
  "cv.points": "measurements (hourly means, {days} days)",
  "cv.points_since": "measurements (hourly means) since {date}",
  "cv.restart": "Start measurements over",
  "cv.show_all": "Show the last {days} days again",
  "cv.restart_title": "Start measurements over?",
  "cv.restart_text": "The view then only shows measurements from the chosen time on – useful after the heating curve or the plant was changed. The statistics in Home Assistant are kept; you can go back at any time.",
  "cv.restart_from": "From",
  "cv.now": "now",
  "cv.axis_flow": "Flow °C",
  "cv.no_heating": "heating limit",
  "cv.params": "Parameters",
  "cv.p.design": "Design flow temperature",
  "cv.p.offset": "Parallel shift",
  "cv.p.limit": "Heating limit (summer from)",
  "cv.p.minFlow": "Min. flow",
  "cv.p.maxFlow": "Max. flow",
  "cv.p.minExt": "Min. outdoor temperature",
  "cv.p.roomSet": "Room setpoint",
  "cv.readonly": "To change the curve, map the parameters to writable entities (number) – EMS-ESP provides them as “number”.",
  "cv.applied": "Applied.",
  "cv.analysis": "Analysis",
  "cv.deviation_above": "Measurements are on average {value} K above the curve.",
  "cv.deviation_below": "Measurements are on average {value} K below the curve.",
  "cv.room": "Mean room temperature {room} °C at a setpoint of {set} °C.",
  "cv.suggest_down": "Warmer than needed. Suggestion: lower the parallel shift by {value} K to {target} K – saves electricity.",
  "cv.suggest_up": "Not quite warm enough. Suggestion: raise the parallel shift by {value} K to {target} K.",
  "cv.try": "Use as preview",
  "cv.fits": "Room temperature fits – no change needed.",
  "cv.no_room": "For a suggestion, map the room temperature (reference room) on the heating circuit.",
  "cv.no_points": "No measurements yet: outdoor and flow temperature need long-term statistics (available after about an hour).",
  "cv.demo_note": "Demo: the last 24 h come from the simulation, older points are modelled. Changes act on the simulation immediately.",
  "cv.confirm_title": "Change heating curve?",
  "cv.confirm_demo": "The change applies to the simulation.",
  "cv.confirm_live": "The values are written to the controller (BC400) via EMS-ESP.",
  "nav.check": "Check",
  "chk.title": "Plant check",
  "chk.subtitle": "Last 24 hours evaluated against common rules of thumb for heat pump systems.",
  "chk.demo": "Demo: data from the simulation.",
  "chk.refresh": "Evaluate again",
  "chk.running": "Evaluating history …",
  "chk.ok": "OK",
  "chk.nodata": "No suitable history – map the values or check again later.",
  "chk.mixing.title": "Mixing loss at the buffer",
  "chk.mixing.detail": "In heating mode the heat pump flow (TC1) is on average {value} K warmer than the top of the buffer ({minutes} min evaluated). Target: ≤ 2 K.",
  "chk.mixing.hint": "The heat pump circuit mixes with colder water in the buffer. Usually PC0 pumps much more than PC1 or vice versa – balance pump settings / flow rates and check the buffer sensor (T0).",
  "chk.cycling.title": "Compressor cycling",
  "chk.cycling.detail": "Starts in {hours} h: {starts} (avg {perHour} per hour, at most {maxPerHour} in one hour), average run time {avgRun} min per start. Target: at most 3 starts per hour, run time ≥ 20 min.",
  "chk.cycling.hint": "Frequent cycling costs efficiency and lifetime. Causes: heating curve too high, small switching hysteresis, too little usable volume (closed thermostatic valves) or too much output in mild weather.",
  "chk.spread.title": "Flow/return spread",
  "chk.spread.detail": "In heating mode the spread TC1−TC0 averages {value} K. Target range: 3–8 K.",
  "chk.spread.hint_low": "Very small spread: flow rate higher than needed (pump power) – costs electricity and often raises mixing loss.",
  "chk.spread.hint_high": "Large spread: too little flow – check particle filter SC1, balancing and pump setting.",
  "chk.defrost.title": "Defrosts",
  "chk.defrost.detail": "{count} defrosts, {minutes} min in total = {share} % of run time. Up to about 8 % is normal in humid weather.",
  "chk.defrost.hint": "Many defrosts: evaporator dirty or obstructed, air short-circuit at the installation site, or check condensate drain / drain pan heating.",
  "chk.aux.title": "Electric backup heater",
  "chk.aux.detail": "Backup heater active for {minutes} min in the last 24 h.",
  "chk.aux.hint": "The backup heater works at COP 1. Frequent use points to high demands (heating curve, DHW temperature, disinfection) or bivalence / backup delay settings.",
  "chk.pressure.title": "System pressure",
  "chk.pressure.detail": "Pressure in 24 h between {min} and {max} bar (allowed {lo}–{hi} bar).",
  "chk.pressure.hint": "Pressure close to the limit or dropping: check the expansion vessel pre-charge, look for leaks, refill if needed (demineralised water).",
  "nav.efficiency": "Efficiency",
  "ed.cop_ref": "Datasheet COP at A7/W35",
  "eff.live": "Live COP",
  "eff.expected": "Expected at A{out}/W{flow}",
  "eff.ratio": "Achieved",
  "eff.ampel.green": "Performing as per datasheet",
  "eff.ampel.yellow": "Slightly below target – keep an eye on it",
  "eff.ampel.red": "Clearly below target – check",
  "eff.no_live": "No live COP: compressor off or defrosting.",
  "eff.today": "Today",
  "eff.yesterday": "Yesterday",
  "eff.month": "Month",
  "eff.year": "Year",
  "eff.estimate": "estimate",
  "eff.heat": "Heat",
  "eff.el": "Electricity",
  "eff.dhw_share": "Hot water share",
  "eff.aux_share": "Backup heater share",
  "eff.daily": "Last 30 days",
  "eff.spf_short": "SPF",
  "cv.tip": "{out} outside → {flow} flow",
  "cv.target": "Target now",
  "eff.demo_note": "Demo: today and yesterday come from the simulation; older days, month and year are a model estimate (Rhine-Main climate, 5 persons).",
  "eff.missing.no_counters": "For monthly and yearly values, map the energy counters “Heat total” and “Electricity total” on the indoor unit.",
  "eff.missing.no_statistics": "The energy counters have no long-term statistics yet. They are created automatically for entities with a state_class (EMS-ESP provides it) – first values appear after about an hour.",
  "nav.config": "Configuration",
  "cfg.wizard": "Wizard",
  "cfg.editor": "Editor",
  "cfg.mapping": "Mapping",
  "cfg.icons": "Icons",
  "cfg.settings": "Settings",
  on: "On",
  off: "Off",
  save: "Save",
  saved: "Saved",
  cancel: "Cancel",
  delete: "Delete",
  apply: "Apply",
  close: "Close",
  undo: "Undo",
  redo: "Redo",
  unsaved: "Unsaved changes",
  discard: "Discard",
  "sync.conflict": "Not saved: the plant was changed in another window in the meantime. The current state has been loaded.",
  "sync.stale": "The plant was changed in another window. Your draft has not been saved yet.",
  "sync.take": "Load new state",
  "sync.keep": "Keep my draft",
  none: "–",
  unavailable: "unavailable",
  readonly_hint: "Only administrators can configure the plant.",
  standalone_hint: "Standalone demo – configuration is stored in this browser only.",
  fullscreen: "Fullscreen",
  fit: "Fit",
  zoom_in: "Zoom in",
  zoom_out: "Zoom out",
  menu: "Menu",
  "mode.heating": "Heating",
  "mode.hot_water": "Hot water",
  "mode.defrost": "Defrosting",
  "mode.cooling": "Cooling",
  "mode.off": "Standby",
  "mode.compressor_alarm": "Fault",
  "mode.pool": "Pool",
  "mode.pool_heating": "Pool",
  "mode.unknown": "Unknown",
  "kpi.mode": "Mode",
  "kpi.outdoor": "Outdoor",
  "kpi.heat": "Heat",
  "kpi.power": "Power",
  "kpi.cop": "COP",
  "kpi.supply": "Supply",
  "kpi.dhw": "Hot water",
  "kpi.room": "Room",
  demo: "Demo",
  "demo.active": "Demo mode",
  "demo.banner": "Demo mode: simulated values, not connected to the plant",
  "demo.speed": "Speed",
  "demo.outdoor": "Outdoor temperature",
  "demo.time": "Simulation time",
  "demo.scenarios": "Scenarios",
  "scn.normal": "Normal operation",
  "scn.winter": "Winter morning −10 °C",
  "scn.transition": "Mild season 12 °C",
  "scn.shower": "Draw hot water",
  "scn.defrost": "Defrost",
  "scn.dim14a": "§14a power limit",
  "scn.pv": "PV surplus",
  "scn.disinfect": "Disinfection",
  "scn.fault": "Simulate fault",
  "scn.reset": "Reset",
  "msg.title": "Messages",
  "msg.empty": "No messages",
  "msg.active": "Active",
  "msg.history": "History",
  "msg.clear": "Clear history",
  "msg.since": "since {time}",
  "msg.duration": "duration {duration}",
  "msg.filter_all": "All",
  "msg.level.info": "Info",
  "msg.level.notice": "Notice",
  "msg.level.warning": "Warning",
  "msg.level.error": "Fault",
  "msgk.dhw_charging": "Hot water charging ({component})",
  "msgk.dhw_disinfection": "Thermal disinfection running ({component})",
  "msgk.input_active": "External input {input} active{label_sfx}",
  "msgk.aux_heater": "Electric backup heater active",
  "msgk.defrost": "Outdoor unit defrosting",
  "msgk.compressor_alarm": "Compressor fault reported",
  "msgk.pressure_low": "System pressure low: {value} bar (min {min} bar)",
  "msgk.pressure_high": "System pressure high: {value} bar (max {max} bar)",
  "msgk.error_code": "Error code: {code}",
  "msgk.data_unavailable": "No data: {missing} of {total} entities unavailable – check the gateway",
  "msgk.sim_fault": "Simulated fault: high pressure cut-out (demo)",
  "msgk.sim_scenario": "Scenario started: {name}",
  "ed.nominal": "Nominal output (kW)",
  "ed.not": "not",
  "ed.or": "or at least one of",
  "kpi.target": "Target",
  "st.heat_load": "Design heat load (kW, used by the demo)",
  "card.show_kpis": "Show key figures",
  "card.show_messages": "Show messages column",
  "card.show_demo": "Show demo controls",
  "card.height": "Height (e.g. 600px; empty = automatic)",
  "card.hint": "Tip: as the only card of a view of type “Panel”, COPilot fills the whole screen.",
  "wr.title": "Change value",
  "wr.change": "Change …",
  "wr.press": "Trigger …",
  "wr.apply": "Apply",
  "wr.confirm": "Really change: {old} → {new}?",
  "wr.press_confirm": "Really trigger?",
  "wr.done": "Changed – the plant picks up the value shortly.",
  "wr.failed": "Not changed",
  "wr.demo": "Nothing can be changed in demo mode or in the time machine.",
  "wr.no_permission": "Only administrators may change values.",
  "wr.on": "On",
  "wr.off": "Off",
  "wr.release": "Writable: may be changed from COPilot (with confirmation)",
  "msgk.value_changed": "{component}: {slot_label} changed {old} → {new} ({user})",
  "st.write_non_admin": "Non-admin users may change released values too",
  "st.write_hint": "Values are released one by one with ✎ in the editor. Every change needs a confirmation and is logged under messages.",
  "nav.maintenance": "Maintenance",
  "bld.outside": "Outside",
  "wz.shower": "Shower",
  "bld.living": "Living space",
  "bld.plant_room": "Plant room",
  "bld.basement": "Basement",
  "ed.building": "Show building",
  "ed.raster": "Grid & snap",
  "ed.grid_show": "Show grid",
  "ed.grid_step": "Grid spacing",
  "ed.grid_cells": "{n} × 20 px",
  "ed.grid_snap": "Snap to grid",
  "ed.object_snap": "Object snap (ports, edges, centres)",
  "ed.snap_hint": "Yellow handles move the straight runs of a selected pipe. Value fields can be dragged anywhere. Hold Alt to move without snapping.",
  "ed.values_reset": "Reset value fields",
  "ed.connection": "Connection",
  "ed.conn.side": "side",
  "ed.conn.bottom": "bottom",
  "ed.tap_kind": "Type",
  "ed.tap.tap": "Tap",
  "ed.tap.shower": "Shower",
  "msgk.maintenance_due": "Maintenance due: {task}",
  "mt.title": "Maintenance calendar",
  "mt.hint": "Recurring tasks around the plant. Due tasks also appear under messages (and fire the copilot_message event, e.g. for a push notification). Intervals are guidelines – your devices' manuals are authoritative.",
  "mt.n_due": "{n} due",
  "mt.all_ok": "All done",
  "mt.n_unknown": "{n} without date",
  "mt.enter_date": "No date yet – please enter “Last done”",
  "mt.overdue": "Due for {n} days",
  "mt.next": "Next on {date} (in {n} days)",
  "mt.last": "Last done",
  "mt.every": "Every",
  "mt.months": "months",
  "mt.done": "Done",
  "mt.done_confirm": "Mark “{task}” as done today?",
  "mt.remove": "Remove",
  "mt.remove_confirm": "Remove task “{task}”?",
  "mt.new": "Own task, e.g. check the condensate drain",
  "mt.add": "Add",
  "mt.pressure": "Check system pressure",
  "mt.pressure_how": "Read the pressure on the gauge or in COPilot; usually 1.0–1.5 bar when cold. Top up if needed.",
  "mt.filter": "Clean particle filter SC1",
  "mt.filter_how": "Shut off, take out the strainer and rinse it. More often after commissioning, then about once a year.",
  "mt.separator": "Drain the dirt/magnetite separator",
  "mt.separator_how": "Open the drain valve briefly until the water runs clear; remove the magnet if fitted. Check the pressure afterwards.",
  "mt.expansion": "Check expansion vessel pre-pressure",
  "mt.expansion_how": "Measure the vessel's pre-pressure (system depressurised) against the setpoint – usually part of the professional service.",
  "mt.outdoor": "Clean the outdoor unit",
  "mt.outdoor_how": "Remove leaves and dirt from the evaporator without bending the fins; keep the condensate drain and air path clear.",
  "mt.anode": "Check the hot water cylinder's anode",
  "mt.anode_how": "Inspect the magnesium anode or measure the protection current; replace when heavily worn (professional).",
  "mt.service": "Professional service",
  "mt.service_how": "Annual inspection: refrigerant circuit (tightness, R290 notes), electrics, safety valves, settings.",
  "cost.title": "Costs & PV share",
  "cost.today": "Today",
  "cost.yesterday": "Yesterday",
  "cost.days30": "Last 30 days",
  "cost.grid_cost": "grid power",
  "cost.pv_share": "PV/battery share",
  "cost.feed_loss": "Feed-in revenue given up",
  "cost.per_kwh": "Cost per kWh of heat",
  "cost.vs_gas": "Same heat with gas",
  "cost.daily": "Heat pump electricity per day",
  "cost.grid_kwh": "Grid",
  "cost.self_kwh": "PV/battery",
  "cost.cost_eur": "Cost €",
  "cost.no_share": "PV share unknown – set up the energy layer (grid power) and the heat pump's electric power.",
  "cost.hint": "Prices and comparison under Configuration → Settings. “Cost per kWh of heat” includes the feed-in revenue given up.",
  "st.tariff": "Electricity price & comparison",
  "st.tariff_hint": "For the costs in the efficiency tab. Heat pump power from the grid costs the electricity price; own PV power costs the feed-in tariff you do not receive.",
  "st.t_mode": "Electricity price",
  "st.t_fixed": "Fixed price",
  "st.t_entity": "From an entity (e.g. dynamic tariff)",
  "st.t_price": "Price (€/kWh)",
  "st.t_entity_pick": "Price entity (€/kWh)",
  "st.t_feed_in": "Feed-in tariff (€/kWh)",
  "st.t_gas": "Comparison: gas price (€/kWh)",
  "st.t_gas_eff": "Comparison: boiler efficiency (%)",
  "tm.title": "Time machine",
  "tm.play": "Play",
  "tm.pause": "Pause",
  "tm.speed": "Speed",
  "tm.speed_v": "{min} min/s",
  "tm.range": "Range",
  "tm.hours": "{h} h",
  "tm.live": "Live",
  "bk.title": "Backups",
  "bk.hint": "Before every save and every update the previous plant including its layout is backed up automatically (last 15). You can also export the plant as a file.",
  "bk.export": "Export",
  "bk.import": "Import",
  "bk.restore": "Restore",
  "bk.restore_confirm": "Restore the plant from {date}? The current state is backed up first.",
  "bk.import_confirm": "Import “{name}” ({n} components)? The current state is backed up first.",
  "bk.restored": "Plant restored.",
  "bk.imported": "Plant imported.",
  "bk.invalid": "Not a valid COPilot plant file",
  "bk.none": "No backups yet – the first one is made on the next save or update.",
  "bk.demo": "The standalone demo has no backups.",
  "bk.components": "{n} components",
  "bk.reason.save": "before saving",
  "bk.reason.update": "before update",
  "bk.reason.restore": "before restore",
  "bk.reason.import": "before import",
  // energy layer
  "en.title": "Energy flow",
  "en.toggle": "Energy layer",
  "en.pv": "PV",
  "en.grid": "Grid",
  "en.grid_import": "Grid import",
  "en.grid_export": "Grid export",
  "en.battery": "Battery",
  "en.bat_charge": "Battery charging",
  "en.bat_discharge": "Battery discharging",
  "en.hp": "Heat pump",
  "en.house": "House",
  "en.wallbox": "Wallbox",
  "en.share": "Self-supply now {pct} %",
  "en.dimmed": "§14a dimmed · max. {kw} kW",
  "en.pv_signal": "PV surplus → HP",
  "st.energy": "Energy layer",
  "st.energy_hint": "Shows PV, grid, battery, house and wallbox around the heat pump (power in W or kW). Simulated in demo mode.",
  "st.energy_enabled": "Show energy layer",
  "st.energy_detect": "Detect automatically (evcc / SolaX)",
  "st.energy_detected": "Suggestion applied – please check and save.",
  "st.energy_none": "No known entities found – please choose manually.",
  "st.e_pv": "PV power",
  "st.e_grid": "Grid power (import positive)",
  "st.e_grid_invert": "Entity reports export as positive",
  "st.e_battery": "Battery power (discharge positive)",
  "st.e_battery_invert": "Entity reports charging as positive",
  "st.e_soc": "Battery state of charge (%)",
  "st.e_house": "House consumption",
  "st.e_house_hp": "House consumption includes the heat pump",
  "st.e_wallbox": "Wallbox charging power",
  "st.e_limit": "§14a minimum power while dimmed (kW)",
  "st.save": "Save",
  // explain mode
  "ex.title": "What is happening?",
  "ex.toggle": "Explain mode",
  "ex.tap_hint": "Tip: tap a component to learn what it is for.",
  "ex.empty": "No values yet – as soon as data arrives, the plant is explained here.",
  "ex.alarm": "The outdoor unit reports a fault – the compressor is locked. See messages for details.",
  "ex.defrost": "The outdoor unit is defrosting. At {out} °C with humid air the evaporator ices up; the refrigerant circuit briefly runs backwards and takes heat from the heating water.",
  "ex.defrost_hint": "This usually takes 3–8 minutes and the flow temperature drops briefly – perfectly normal.",
  "ex.dhw_charge": "The heat pump is heating hot water: VW1 is in position B and the hot heating water flows through the coil in the cylinder. Cylinder {dhw} °C, target {set} °C.",
  "ex.dhw_charge_short": "The heat pump is heating hot water: VW1 is in position B and the hot heating water flows through the coil in the cylinder.",
  "ex.dhw_charge_hint": "Hot water needs higher temperatures than space heating – so the COP is lower.",
  "ex.heating_air": "The heat pump is heating: it takes heat from the outdoor air ({out} °C) and delivers {heat} kW to the heating water, using {el} kW of electricity.",
  "ex.heating_air_short": "The heat pump is heating: it takes heat from the outdoor air ({out} °C) and delivers it to the heating water.",
  "ex.heating_ground": "The heat pump is heating: it takes heat from the ground (brine) and delivers {heat} kW to the heating water, using {el} kW of electricity.",
  "ex.heating_ground_short": "The heat pump is heating: it takes heat from the ground (brine) and delivers it to the heating water.",
  "ex.off_limit": "The heat pump is idle: at {out} °C the heating limit of {limit} °C is reached. Only hot water is heated when needed.",
  "ex.off_buffer": "The heat pump is pausing: the buffer is warm enough at {buf} °C (target flow {target} °C). It restarts when it cools down.",
  "ex.off_buffer_hint": "Long pauses instead of many short starts protect the compressor.",
  "ex.off": "The heat pump is ready and waiting for a heat demand.",
  "ex.cop": "Current COP {cop}: 1 kWh of electricity becomes {cop} kWh of heat right now.",
  "ex.cop_modulating": "The compressor runs at {speed} % – it adapts its output to the demand instead of switching on and off.",
  "ex.curve": "Heating curve: at {out} °C outside the controller asks for {target} °C flow; it is {sup} °C right now.",
  "ex.curve_short": "Heating curve: at {out} °C outside the controller asks for {target} °C flow.",
  "ex.curve_hint": "The lower the flow temperature, the more efficient – each degree less gives roughly 2–3 % more COP.",
  "ex.spread_ok": "Flow {sup} °C, return {ret} °C – the spread of {spread} K is fine.",
  "ex.spread_low": "Spread only {spread} K (flow {sup} °C, return {ret} °C): more water flows than needed – the pump could run slower.",
  "ex.spread_high": "Spread {spread} K (flow {sup} °C, return {ret} °C): too little water flows – that costs efficiency.",
  "ex.buffer": "The buffer tank is {buf} °C at the top. It separates heat pump and heating circuits and bridges pauses.",
  "ex.buffer_pc1": "The buffer tank is {buf} °C at the top. PC0 charges it, PC1 supplies the radiators from it.",
  "ex.buffer_mixing": "Mixing loss {loss} K: the top of the buffer is colder than the heat pump flow – the heating circuit draws more water than the heat pump delivers.",
  "ex.room": "{name}: room {room} °C, setpoint {set} °C.",
  "ex.room_short": "{name}: room {room} °C.",
  "ex.disinfect": "Thermal disinfection: the hot water cylinder is heated above 60 °C once (legionella protection), usually with the backup heater.",
  "ex.dhw_idle": "Hot water {dhw} °C (target {set} °C) – no charging needed right now.",
  "ex.dhw_idle_short": "Hot water {dhw} °C – no charging needed right now.",
  "ex.tap": "Hot water is being drawn ({flow} l/min): hot water leaves at the top, cold water flows in at the bottom.",
  "ex.circ": "The circulation pump runs: hot water circulates through the pipes so it is warm at the tap immediately.",
  "ex.circ_hint": "This costs heat – a schedule matching your tapping times saves energy.",
  "ex.aux": "The electric backup heater is running ({aux} %).",
  "ex.aux_short": "The electric backup heater is running.",
  "ex.aux_hint": "It turns 1 kWh of electricity into only 1 kWh of heat (COP 1) – useful only in very cold weather, for disinfection or faults.",
  "ex.input_14a": "§14a control active (input {n}): the grid operator has limited the power, the heat pump runs throttled.",
  "ex.input_pv": "PV surplus signalled (input {n}): the heat pump may raise temperatures and store solar power as heat.",
  "ex.input_other": "External input {n} ({label}) is active.",
  "exc.outdoor": "Takes heat from the outdoor air with fan and refrigerant circuit – even below freezing – and lifts it to heating temperature with the compressor.",
  "exc.outdoor_brine": "Takes heat from the ground via boreholes or collectors (brine) and lifts it to heating temperature with the compressor.",
  "exc.indoor_wall_e": "The indoor unit is the hub: controller, heat pump circuit pump PC0, diverter valve VW1 (heating/hot water) and electric backup heater.",
  "exc.indoor_t180": "Indoor unit with built-in 180 l hot water cylinder: controller, PC0, VW1, backup heater and heating circuit pump PC1 in one casing.",
  "exc.indoor_tp70": "Indoor unit with built-in 70 l buffer: controller, PC0, VW1, backup heater and heating circuit pump PC1 in one casing.",
  "exc.indoor_brine": "Brine compact unit: refrigerant circuit with compressor, controller, pumps, VW1 and backup heater in one casing.",
  "exc.pump_primary": "Heat pump circuit pump (PC0): moves the water through the heat pump.",
  "exc.pump_hc": "Heating circuit pump: moves the warm water to the emitters.",
  "exc.pump_circ": "Circulation pump (PW2): keeps hot water moving in the pipes so it is warm at the tap immediately.",
  "exc.valve_3way": "3-way valve: switches between heating (A) and hot water charging (B).",
  "exc.filter": "Particle filter SC1: keeps dirt away from the heat pump's heat exchanger.",
  "exc.separator": "Dirt/magnetite separator: removes sludge and rust particles from the return before they reach the heat pump.",
  "exc.buffer": "Buffer tank: separates heat pump and heating circuits, ensures minimum flow and defrost energy, prevents frequent cycling.",
  "exc.dhw_tank": "Hot water cylinder: the coil inside heats the drinking water; hot water is drawn at the top, cold water flows in at the bottom.",
  "exc.mixer": "Mixing valve: blends in return water so the circuit gets exactly the flow temperature it needs.",
  "exc.radiators": "Radiators release the heat into the room. The larger the surface, the lower the flow temperature can be.",
  "exc.floor_heating": "Underfloor heating: large surface, low flow temperature – ideal for heat pumps.",
  "exc.tap": "Tap: shower, bath or kitchen.",
  "exc.water_inlet": "Cold water supply from the mains.",
  "exc.expansion_vessel": "Expansion vessel: absorbs the volume change of the heating water as it heats up and keeps the pressure stable.",
  "exs.defrost": "Now: defrosting.",
  "exs.compressor_on": "Now: compressor running.",
  "exs.compressor_off": "Now: compressor off.",
  "exs.vw1_a": "Now: VW1 in A – heating.",
  "exs.vw1_b": "Now: VW1 in B – hot water charging.",
  "exs.running": "Now: running.",
  "exs.stopped": "Now: off.",
  "exs.valve_a": "Now: position A (heating).",
  "exs.valve_b": "Now: position B (hot water).",
  "type.outdoor_unit": "Outdoor unit",
  "type.indoor_unit": "Indoor unit",
  "type.buffer": "Buffer tank",
  "type.dhw_tank": "Hot water cylinder",
  "type.pump": "Pump",
  "type.valve_3way": "3-way valve",
  "type.mixer": "Mixing valve",
  "type.radiators": "Radiators",
  "type.floor_heating": "Underfloor heating",
  "type.tap": "Tap",
  "type.water_inlet": "Cold water",
  "type.separator": "Dirt separator",
  "type.expansion_vessel": "Expansion vessel",
  "type.junction": "Junction",
  "type.value_tile": "Value tile",
  "type.label": "Label",
  "kind.supply": "Supply",
  "kind.return": "Return",
  "kind.dhw_hot": "Hot water",
  "kind.dhw_cold": "Cold water",
  "kind.circulation": "Circulation",
  "slot.outdoor_temp": "Outdoor temperature",
  "slot.air_in_temp": "Air inlet (TL2)",
  "slot.activity": "Activity",
  "slot.compressor_on": "Compressor",
  "slot.compressor_speed": "Compressor speed",
  "slot.fan_speed": "Fan",
  "slot.heat_power": "Heat output",
  "slot.el_power": "Electric power",
  "slot.compressor_starts": "Compressor starts",
  "slot.evap_in_temp": "Evaporator inlet (TR4)",
  "slot.comp_out_temp": "Hot gas (TR6)",
  "slot.comp_in_temp": "Suction gas (TR5)",
  "slot.hp_temp": "High pressure (PH1)",
  "slot.lp_temp": "Low pressure (PL1)",
  "slot.drain_pan_temp": "Drain pan (TA4)",
  "slot.silent_mode": "Silent mode",
  "slot.supply_temp": "Supply",
  "slot.return_temp": "Return",
  "slot.indoor_unit.supply_temp": "Supply (TC1)",
  "slot.indoor_unit.return_temp": "Return (TC0)",
  "slot.condenser_temp": "Condenser (TC3)",
  "slot.target_flow_temp": "Supply setpoint",
  "slot.pressure": "System pressure",
  "slot.flow": "Flow",
  "slot.aux_level": "Backup heater",
  "slot.aux_status": "Backup heater status",
  "slot.aux_step1": "Backup heater stage 1",
  "slot.aux_step2": "Backup heater stage 2",
  "slot.aux_step3": "Backup heater stage 3",
  "slot.service_code": "Status code",
  "slot.service_code_number": "Status code no.",
  "slot.last_error": "Last error",
  "slot.input1": "Ext. input 1",
  "slot.input2": "Ext. input 2",
  "slot.input3": "Ext. input 3",
  "slot.input4": "Ext. input 4",
  "slot.el_energy_total": "Electricity total",
  "slot.el_energy_heating": "Electricity heating",
  "slot.el_energy_dhw": "Electricity hot water",
  "slot.heat_energy_total": "Heat total",
  "slot.heat_energy_heating": "Heat heating",
  "slot.heat_energy_dhw": "Heat hot water",
  "slot.aux_energy_total": "Electricity backup heater",
  "slot.uptime_total": "Operating time",
  "slot.heating_active": "Heating",
  "slot.dhw_active": "Hot water mode",
  "slot.running": "Running",
  "slot.speed": "Speed",
  "slot.power": "Power",
  "slot.position": "Position",
  "slot.temp_top": "Temperature top",
  "slot.temp_mid": "Temperature middle",
  "slot.temp_bottom": "Temperature bottom",
  "slot.setpoint": "Setpoint",
  "slot.charging": "Charging",
  "slot.onetime": "One-time charge",
  "slot.disinfecting": "Disinfection",
  "slot.flow_temp": "Supply",
  "slot.room_temp": "Room temperature",
  "slot.room_setpoint": "Room setpoint",
  "slot.mode": "Mode",
  "slot.summer_mode": "Summer mode",
  "slot.operating_state": "Operating state",
  "slot.design_temp": "Design temperature",
  "slot.offset_temp": "Curve offset",
  "slot.min_flow_temp": "Min. supply",
  "slot.max_flow_temp": "Max. supply",
  "slot.temp": "Temperature",
  "slot.min_ext_temp": "Min. outdoor temperature (design)",
  "slot.heating_limit": "Heating limit",
  "slot.value": "Value",
  "ov.no_plant": "No plant configured yet.",
  "ov.start_wizard": "Start wizard",
  "ov.details": "Details",
  "ov.history24": "Last 24 h",
  "ov.min": "Min",
  "ov.max": "Max",
  "ov.now": "Now",
  "ov.no_history": "No history available",
  "ov.open_entity": "Open entity",
  "ov.not_bound": "not mapped",
  "wz.title": "Plant wizard",
  "wz.intro": "Describe your plant and the wizard draws a schematic. You can fine-tune it in the editor afterwards.",
  "wz.name": "Plant name",
  "wz.hp": "Heat pump",
  "wz.outdoor": "Outdoor unit / model",
  "wz.indoor": "Indoor unit",
  "wz.buffer": "Buffer tank",
  "wz.buffer.none": "No buffer",
  "wz.buffer.parallel": "Parallel (separator tank, 4 connections, secondary pump)",
  "wz.buffer.serial": "In series (in the return)",
  "wz.buffer_volume": "Buffer volume (l)",
  "wz.dhw": "Hot water",
  "wz.dhw.none": "No hot water",
  "wz.dhw.tank": "External cylinder via 3-way valve",
  "wz.dhw_volume": "Cylinder volume (l)",
  "wz.circulation": "Circulation line",
  "wz.circuits": "Heating circuits",
  "wz.circuit": "Circuit {n}",
  "wz.add_circuit": "Add circuit",
  "wz.remove": "Remove",
  "wz.emitter": "Emitters",
  "wz.mixed": "mixed",
  "wz.aux": "Electric backup heater",
  "wz.aux_kw": "Backup heater power (kW)",
  "wz.extras": "Extras",
  "wz.separator": "Particle filter SC1 and dirt separator in the return in front of the indoor unit",
  "wz.separator_short": "Separator",
  "wz.expansion": "Expansion vessel",
  "wz.generate": "Generate schematic",
  "wz.replace_confirm": "This generates a new schematic and replaces the current plant (mappings of matching components are kept). Continue?",
  "wz.example": "Load example plant",
  "wz.done": "Schematic generated – fine-tune it in the editor or map values.",
  "ed.palette": "Components",
  "ed.props": "Properties",
  "ed.nothing": "Select a component or pipe. Draw pipes by clicking two connection points one after the other.",
  "ed.label": "Label",
  "ed.model": "Model",
  "ed.rotation": "Rotation",
  "ed.flip": "Connections on the right (mirrored)",
  "ed.icon": "Icon",
  "ed.icon_default": "Default",
  "ed.role": "Function",
  "ed.circuit": "Circuit no.",
  "ed.dhw_circuit": "DHW circuit no.",
  "ed.bindings": "Values & entities",
  "ed.show": "show",
  "ed.pipe": "Pipe",
  "ed.kind": "Kind",
  "ed.flow_when": "Animated when",
  "ed.add_cond": "Add condition",
  "ed.temp_entity": "Temperature entity",
  "ed.flow_entity": "Flow entity",
  "ed.reset_bend": "Reset routing",
  "ed.connecting": "Click the target connection (Esc cancels)",
  "ed.grid": "Grid size",
  "ed.entries": "Entries",
  "ed.add_entry": "Add entry",
  "ed.text": "Text",
  "ed.volume": "Volume (l)",
  "ed.input_labels": "External input labels",
  "ed.pressure_limits": "Pressure limits (bar)",
  "ed.b_label": "Label of position B",
  "ed.duplicate": "Duplicate",
  "ed.auto": "Auto arrange",
  "ed.auto_title": "Scores several arrangements (crossings, collisions, pipe length) and applies the best – undoable",
  "ed.auto_done_tpl": "Arranged by template with real connection positions – {crossings} crossings. Undo with ⌘Z.",
  "ed.auto_done": "Arranged automatically – {crossings} crossings. Undo with ⌘Z.",
  "ed.entity_search": "Search entity …",
  "role.primary": "Primary pump (PC0)",
  "role.secondary": "Heating / secondary pump (PC1)",
  "role.hc": "Mixed circuit pump",
  "role.circulation": "Circulation pump",
  "role.other": "Other",
  "role.dhw_switch": "Heating / hot water diverter (VW1)",
  "state.running": "running",
  "state.a": "position A (heating)",
  "state.b": "position B (hot water)",
  "state.defrost": "defrosting",
  "state.flowing": "flowing",
  "state.charging": "charging",
  "state.aux": "backup heater on",
  "state.pc1": "PC1 running",
  "slot.pc0_running": "PC0 running",
  "slot.pc0_speed": "PC0 speed",
  "slot.vw1_position": "VW1 position (on = hot water)",
  "slot.pc1_running": "PC1 running",
  "slot.pc1_speed": "PC1 speed",
  "slot.dhw_temp": "Hot water",
  "slot.dhw_setpoint": "DHW setpoint",
  "slot.dhw_charging": "DHW charging",
  "slot.buffer_temp": "Buffer",
  "ed.variant": "Housing",
  "map.title": "Automatic mapping",
  "map.intro": "Finds EMS-ESP entities in Home Assistant and maps them to components. Existing mappings are only replaced if you tick them.",
  "map.scan": "Scan entities",
  "map.found": "{count} EMS-ESP entities found",
  "map.none": "No EMS-ESP entities found.",
  "map.none_help": "Set up the gateway: enable MQTT in EMS-ESP, switch on “Home Assistant MQTT Discovery” and choose the entity ID format “Single instance, short names”. The MQTT integration must be running in Home Assistant.",
  "map.component": "Component",
  "map.slot": "Value",
  "map.entity": "Entity",
  "map.value": "Current",
  "map.current": "was",
  "map.confidence": "Match",
  "map.conf.high": "certain",
  "map.conf.medium": "fallback",
  "map.apply": "Apply selected",
  "map.applied": "{count} mappings applied",
  "map.select_all": "All",
  "map.unbound": "Not mapped",
  "map.unbound_hint": "Map these in the editor via entity search – e.g. a smart plug driving the circulation pump, buffer sensors or values from your inverter.",
  "map.standalone": "The standalone demo has no Home Assistant entities.",
  "ic.title": "Custom icons",
  "ic.intro": "Upload your own graphics (SVG, PNG, WebP, JPG, max 256 KB). Assign them per component in the editor or here as the default for a component type. The bundled icons are original drawings without manufacturer artwork.",
  "ic.upload": "Upload icon",
  "ic.iso": "For isometric view",
  "ic.empty": "No custom icons yet.",
  "ic.type_default": "Default for type",
  "ic.used_by": "Own icon of: {list}",
  "ic.default_for": "Default for: {list}",
  "ic.unused": "Not assigned",
  "ic.own_one": "Component uses its own icon: {name}",
  "ic.own_some": "{n} of {m} components with their own icon",
  "ic.err.unsupported_type": "File type not supported",
  "ic.err.too_large": "File too large (max 256 KB)",
  "ic.err.unsafe_svg": "SVG contains scripts or active content",
  "ic.err.invalid_data": "File is damaged or has the wrong format",
  "ic.err.too_many": "Too many icons",
  "st.title": "Settings",
  "st.style": "Style",
  "st.style.flat": "Modern SCADA (flat)",
  "st.style.iso": "2.5D (with depth)",
  "st.demo": "Demo mode",
  "st.demo_hint": "Shows simulated values with running animations – ideal while the plant is not connected yet.",
  "st.language": "Language",
  "st.lang.auto": "Same as Home Assistant",
  "st.version": "Version",
  "st.about": "About COPilot",
  "st.reset": "Reset plant",
  "st.reset_confirm": "Delete the whole plant and start over with the example plant?"
}, fi = { de: Qn, en: to };
let Kt = "de";
function gi(r) {
  Kt = r;
}
function _i() {
  return Kt;
}
function wi(r, t) {
  return r === "de" || r === "en" ? r : (t || "de").toLowerCase().startsWith("de") ? "de" : "en";
}
function c(r, t) {
  let e = fi[Kt][r] ?? fi.de[r] ?? r;
  return t && (e = e.replace(/\{(\w+)\}/g, (s, i) => {
    const n = t[i];
    return typeof n == "number" ? G(n, Number.isInteger(n) ? 0 : 1) : n == null ? "" : String(n);
  })), e;
}
function G(r, t = 1) {
  return r.toLocaleString(Kt === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: t,
    maximumFractionDigits: t
  });
}
function un(r) {
  return new Date(r * 1e3).toLocaleTimeString(Kt === "de" ? "de-DE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function eo(r) {
  const t = new Date(r * 1e3), e = /* @__PURE__ */ new Date();
  return t.toDateString() === e.toDateString() ? un(r) : t.toLocaleString(Kt === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function so(r) {
  const t = Math.round(r / 60);
  return t < 60 ? `${t} min` : `${Math.floor(t / 60)} h ${t % 60} min`;
}
const io = {
  supply_temp: "VL",
  return_temp: "RL",
  flow_temp: "VL",
  target_flow_temp: "Soll",
  room_temp: "Raum",
  pressure: "",
  aux_level: "",
  pc0_speed: "",
  pc1_speed: "",
  speed: "",
  fan_speed: "",
  outdoor_temp: "",
  buffer_temp: "",
  dhw_temp: "WW",
  dhw_setpoint: "Soll",
  flow: ""
}, vi = { supply_temp: "F", return_temp: "R", flow_temp: "F", target_flow_temp: "Set", room_temp: "Room", dhw_temp: "DHW", dhw_setpoint: "Set" };
function bi(r, t) {
  return Kt === "en" && t in vi ? vi[t] : io[t] ?? "";
}
function Pt(r, t) {
  const e = `slot.${r}.${t}`, s = c(e);
  return s === e ? c(`slot.${t}`) : s;
}
const $ = 20, Q = (r, t = !1) => ({ key: r, kind: "temp", show: t }), nt = {
  outdoor_unit: {
    type: "outdoor_unit",
    w: 9,
    h: 7,
    group: "generator",
    badges: "above",
    // monoblock: both water connections at the rear, 202 mm above the floor,
    // on the right when seen from the front (Logatherm WLW-… MB AR manual, fig. 4)
    ports: [
      { id: "in", x: 9, y: 5, dir: "r", kind: "return" },
      { id: "out", x: 9, y: 6, dir: "r", kind: "supply" }
    ],
    slots: [
      { key: "heat_power", kind: "power_kw", show: !0 },
      { key: "el_power", kind: "power_w", show: !0 },
      { key: "compressor_speed", kind: "percent", show: !0 },
      // fourth chip: own row above the three power values
      { key: "outdoor_temp", kind: "temp", show: !0 },
      { key: "activity", kind: "enum" },
      { key: "compressor_on", kind: "bool" },
      { key: "fan_speed", kind: "percent", pos: [3.2, 3.5] },
      Q("air_in_temp"),
      { key: "compressor_starts", kind: "count" },
      Q("evap_in_temp"),
      Q("comp_in_temp"),
      Q("comp_out_temp"),
      Q("hp_temp"),
      Q("lp_temp"),
      Q("drain_pan_temp"),
      { key: "silent_mode", kind: "enum" }
    ]
  },
  indoor_unit: {
    type: "indoor_unit",
    w: 8,
    h: 12,
    group: "generator",
    badges: "right",
    ports: [],
    variants: {
      // wall-hung E unit: all connections at the bottom (WLW186i E manual, fig. 3/6),
      // from left: to heat pump, from heat pump, DHW flow, DHW return, heating return, heating flow
      wall_e: {
        id: "wall_e",
        w: 10,
        h: 14,
        badges: "right",
        ports: [
          { id: "src_out", x: 2, y: 14, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "src_in", x: 3, y: 14, dir: "b", tempSlot: "supply_temp", kind: "supply" },
          { id: "dhw_sup", x: 5, y: 14, dir: "b", tempSlot: "supply_temp", kind: "supply", vw1: "b" },
          { id: "dhw_ret", x: 6, y: 14, dir: "b", tempSlot: "return_temp", kind: "return", vw1: "b" },
          { id: "ret", x: 8, y: 14, dir: "b", tempSlot: "return_temp", kind: "return", vw1: "a" },
          { id: "sup", x: 9, y: 14, dir: "b", tempSlot: "supply_temp", kind: "supply", vw1: "a" }
        ],
        pos: { pressure: [1.9, 7.6], aux_level: [5.9, 4.2], pc0_speed: [4.3, 11.4] },
        at: { supply_temp: "sup", return_temp: "ret" },
        atDhw: { supply_temp: "dhw_sup", return_temp: "dhw_ret" }
      },
      // floor-standing T180 with 180 l DHW cylinder: all connections on top (T180 manual, fig. 4/6),
      // from left: heating return, circulation, heating flow, DHW out, cold in, from heat pump, to heat pump
      t180: {
        id: "t180",
        w: 8,
        h: 22,
        badges: "right",
        ports: [
          { id: "ret", x: 1, y: 0, dir: "t", tempSlot: "return_temp", kind: "return", vw1: "a" },
          { id: "circ", x: 2, y: 0, dir: "t", kind: "circulation" },
          { id: "sup", x: 3, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply", vw1: "a" },
          { id: "dhw_hot", x: 4, y: 0, dir: "t", tempSlot: "dhw_temp", kind: "dhw_hot" },
          { id: "dhw_cold", x: 5, y: 0, dir: "t", kind: "dhw_cold" },
          { id: "src_in", x: 6, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "src_out", x: 7, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" }
        ],
        pos: { pressure: [3.2, 8.8], aux_level: [6.4, 3.2], pc0_speed: [4.2, 7.4], dhw_temp: [4, 12], dhw_setpoint: [4, 17] },
        at: { supply_temp: "sup", return_temp: "ret" },
        atDhw: { supply_temp: "src_in", return_temp: "src_out" }
      },
      // floor-standing TP70 with 70 l buffer: all connections on top (TP70 manual, fig. 4)
      tp70: {
        id: "tp70",
        w: 9,
        h: 16,
        badges: "right",
        ports: [
          { id: "sup", x: 1, y: 0, dir: "t", tempSlot: "buffer_temp", kind: "supply" },
          { id: "ret", x: 2, y: 0, dir: "t", kind: "return" },
          { id: "sup2", x: 3, y: 0, dir: "t", tempSlot: "buffer_temp", kind: "supply" },
          { id: "ret2", x: 4, y: 0, dir: "t", kind: "return" },
          { id: "src_in", x: 5, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply" },
          { id: "src_out", x: 6, y: 0, dir: "t", tempSlot: "return_temp", kind: "return" },
          { id: "dhw_sup", x: 7, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply", vw1: "b" },
          { id: "dhw_ret", x: 8, y: 0, dir: "t", tempSlot: "return_temp", kind: "return", vw1: "b" }
        ],
        pos: { pressure: [7, 14.65], aux_level: [3.6, 3], pc0_speed: [7.6, 8.75], pc1_speed: [3.6, 4.9], buffer_temp: [4.5, 10.9] },
        at: { supply_temp: "src_in", return_temp: "src_out" }
      },
      // brine compact unit (WSW186i): connections on top; layout approximated from the T180 family
      brine: {
        id: "brine",
        w: 8,
        h: 14,
        badges: "right",
        ports: [
          { id: "src_in", x: 1, y: 0, dir: "t", kind: "supply" },
          { id: "src_out", x: 2, y: 0, dir: "t", kind: "return" },
          { id: "dhw_sup", x: 4, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply", vw1: "b" },
          { id: "dhw_ret", x: 5, y: 0, dir: "t", tempSlot: "return_temp", kind: "return", vw1: "b" },
          { id: "ret", x: 6, y: 0, dir: "t", tempSlot: "return_temp", kind: "return", vw1: "a" },
          { id: "sup", x: 7, y: 0, dir: "t", tempSlot: "supply_temp", kind: "supply", vw1: "a" }
        ],
        pos: { pressure: [2.2, 12.8], aux_level: [4, 3], pc0_speed: [5.5, 13.2] },
        at: { supply_temp: "sup", return_temp: "ret" },
        atDhw: { supply_temp: "dhw_sup", return_temp: "dhw_ret" }
      }
    },
    slots: [
      Q("supply_temp", !0),
      Q("return_temp", !0),
      Q("target_flow_temp", !0),
      { key: "pressure", kind: "pressure", show: !0 },
      { key: "flow", kind: "flow" },
      { key: "aux_level", kind: "percent", show: !0 },
      { key: "pc0_running", kind: "bool" },
      { key: "pc0_speed", kind: "percent", show: !0 },
      { key: "vw1_position", kind: "bool" },
      { key: "pc1_running", kind: "bool" },
      { key: "pc1_speed", kind: "percent" },
      Q("dhw_temp", !0),
      Q("dhw_setpoint"),
      { key: "dhw_charging", kind: "bool" },
      Q("buffer_temp", !0),
      Q("condenser_temp"),
      { key: "aux_status", kind: "enum" },
      { key: "aux_step1", kind: "bool" },
      { key: "aux_step2", kind: "bool" },
      { key: "aux_step3", kind: "bool" },
      { key: "service_code", kind: "text" },
      { key: "service_code_number", kind: "count" },
      { key: "last_error", kind: "text" },
      { key: "input1", kind: "bool" },
      { key: "input2", kind: "bool" },
      { key: "input3", kind: "bool" },
      { key: "input4", kind: "bool" },
      { key: "heating_active", kind: "bool" },
      { key: "dhw_active", kind: "bool" },
      { key: "el_energy_total", kind: "energy" },
      { key: "el_energy_heating", kind: "energy" },
      { key: "el_energy_dhw", kind: "energy" },
      { key: "heat_energy_total", kind: "energy" },
      { key: "heat_energy_heating", kind: "energy" },
      { key: "heat_energy_dhw", kind: "energy" },
      { key: "aux_energy_total", kind: "energy" },
      { key: "uptime_total", kind: "duration" }
    ]
  },
  // P120.5: all four connections on top; the two returns reach the bottom through dip tubes
  buffer: {
    type: "buffer",
    mirrorable: !0,
    w: 5,
    h: 9,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "in_sup", x: 1, y: 0, dir: "t", kind: "supply" },
      { id: "in_ret", x: 2, y: 0, dir: "t", tempSlot: "temp_bottom", kind: "return" },
      { id: "out_ret", x: 3, y: 0, dir: "t", kind: "return" },
      { id: "out_sup", x: 4, y: 0, dir: "t", tempSlot: "temp_top", kind: "supply" }
    ],
    slots: [Q("temp_top", !0), Q("temp_mid"), Q("temp_bottom", !0)]
  },
  // SH290: connection heights from the datasheet (hot 1226, coil flow 784, circulation 544,
  // coil return 220, cold 55 of 1294 mm); heating coil on the right, drinking water on the left
  dhw_tank: {
    type: "dhw_tank",
    mirrorable: !0,
    w: 6,
    h: 11,
    group: "storage",
    badges: "tank",
    ports: [
      { id: "coil_in", x: 6, y: 4, dir: "r", kind: "supply" },
      { id: "coil_out", x: 6, y: 9, dir: "r", tempSlot: "temp_bottom", kind: "return" },
      { id: "hot", x: 0, y: 1, dir: "l", tempSlot: "temp_top", kind: "dhw_hot" },
      { id: "circ", x: 0, y: 6, dir: "l", kind: "circulation" },
      { id: "cold", x: 0, y: 10, dir: "l", kind: "dhw_cold" }
    ],
    slots: [
      Q("temp_top", !0),
      Q("temp_bottom"),
      Q("setpoint", !0),
      { key: "charging", kind: "bool" },
      { key: "onetime", kind: "bool" },
      { key: "disinfecting", kind: "bool" }
    ]
  },
  pump: {
    type: "pump",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: !0,
    passive: !0,
    badges: "above",
    roles: ["primary", "secondary", "hc", "circulation", "other"],
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "out", x: 2, y: 1, dir: "r" }
    ],
    slots: [
      { key: "running", kind: "bool" },
      { key: "speed", kind: "percent", show: !0 },
      { key: "flow", kind: "flow" },
      { key: "power", kind: "power_w" }
    ]
  },
  valve_3way: {
    type: "valve_3way",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: !0,
    passive: !0,
    badges: "above",
    roles: ["dhw_switch", "other"],
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "a", x: 2, y: 1, dir: "r" },
      { id: "b", x: 1, y: 2, dir: "b" }
    ],
    slots: [{ key: "position", kind: "bool" }]
  },
  mixer: {
    type: "mixer",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: !0,
    passive: !0,
    badges: "above",
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "out", x: 2, y: 1, dir: "r" },
      { id: "ret", x: 1, y: 2, dir: "b" }
    ],
    slots: [{ key: "position", kind: "percent", show: !0 }, { key: "flow_temp", kind: "temp", show: !0, at: "out" }]
  },
  radiators: {
    type: "radiators",
    mirrorable: !0,
    w: 7,
    h: 6,
    group: "consumer",
    badges: "below",
    ports: [
      { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
      { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" }
    ],
    variants: {
      // connections on one side (flow top, return bottom)
      side: {
        id: "side",
        w: 7,
        h: 6,
        ports: [
          { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
          { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" }
        ]
      },
      // valve radiator: both connections from below at the right end, return left of flow
      bottom: {
        id: "bottom",
        w: 7,
        h: 6,
        ports: [
          { id: "ret", x: 4, y: 6, dir: "b", tempSlot: "return_temp", kind: "return" },
          { id: "sup", x: 6, y: 6, dir: "b", kind: "supply" }
        ]
      }
    },
    slots: [
      { key: "flow_temp", kind: "temp", show: !0, at: "sup" },
      { key: "return_temp", kind: "temp", show: !0, at: "ret" },
      Q("target_flow_temp"),
      { key: "room_temp", kind: "temp", show: !0, pos: [3.5, -2.2] },
      Q("room_setpoint"),
      { key: "mode", kind: "enum" },
      { key: "summer_mode", kind: "enum" },
      { key: "operating_state", kind: "enum" },
      Q("design_temp"),
      { key: "offset_temp", kind: "temp" },
      Q("min_flow_temp"),
      Q("max_flow_temp"),
      Q("min_ext_temp"),
      Q("heating_limit")
    ]
  },
  floor_heating: {
    type: "floor_heating",
    mirrorable: !0,
    w: 7,
    h: 6,
    group: "consumer",
    badges: "below",
    ports: [
      { id: "sup", x: 0, y: 1, dir: "l", kind: "supply" },
      { id: "ret", x: 0, y: 5, dir: "l", tempSlot: "return_temp", kind: "return" }
    ],
    slots: []
  },
  tap: {
    type: "tap",
    mirrorable: !0,
    w: 3,
    h: 3,
    group: "consumer",
    passive: !0,
    badges: "left",
    ports: [{ id: "hot", x: 3, y: 1, dir: "r", kind: "dhw_hot" }],
    variants: {
      tap: { id: "tap", w: 3, h: 3, ports: [{ id: "hot", x: 3, y: 1, dir: "r", kind: "dhw_hot" }] },
      // shower head on an arm from the wall, supply from the right
      shower: { id: "shower", w: 4, h: 5, ports: [{ id: "hot", x: 4, y: 1, dir: "r", kind: "dhw_hot" }], pos: { flow: [1.4, -0.9] } }
    },
    slots: [{ key: "flow", kind: "flow_lmin", show: !0, pos: [1.5, -0.9] }, Q("temp")]
  },
  water_inlet: {
    type: "water_inlet",
    mirrorable: !0,
    w: 3,
    h: 2,
    group: "consumer",
    badges: "none",
    ports: [{ id: "out", x: 3, y: 1, dir: "r", fixedTemp: 10, kind: "dhw_cold" }],
    slots: []
  },
  separator: {
    type: "separator",
    w: 2,
    h: 2,
    group: "hydraulic",
    rotatable: !0,
    passive: !0,
    badges: "none",
    ports: [
      { id: "in", x: 0, y: 1, dir: "l" },
      { id: "out", x: 2, y: 1, dir: "r" }
    ],
    slots: []
  },
  expansion_vessel: {
    type: "expansion_vessel",
    w: 2,
    h: 3,
    group: "hydraulic",
    rotatable: !0,
    badges: "left",
    ports: [{ id: "conn", x: 1, y: 3, dir: "b" }],
    slots: [{ key: "pressure", kind: "pressure", show: !0 }]
  },
  junction: {
    type: "junction",
    w: 0,
    h: 0,
    group: "hydraulic",
    passive: !0,
    badges: "none",
    ports: [
      { id: "l", x: 0, y: 0, dir: "l" },
      { id: "r", x: 0, y: 0, dir: "r" },
      { id: "t", x: 0, y: 0, dir: "t" },
      { id: "b", x: 0, y: 0, dir: "b" }
    ],
    slots: []
  },
  value_tile: {
    type: "value_tile",
    w: 8,
    h: 2,
    group: "misc",
    badges: "inside",
    ports: [],
    slots: []
  },
  label: {
    type: "label",
    w: 8,
    h: 2,
    group: "misc",
    badges: "none",
    ports: [],
    slots: []
  }
};
nt.floor_heating.slots = nt.radiators.slots;
function zt(r) {
  return r.type === "value_tile" ? (r.props.entries || []).map((t) => ({
    key: t.slot,
    kind: t.kind || "text",
    show: !0
  })) : nt[r.type].slots;
}
function Wt(r) {
  const t = nt[r.type];
  if (!t.variants) return;
  const e = r.props?.variant || Jt(r.model)?.variant || "wall_e";
  return t.variants[e] || Object.values(t.variants)[0];
}
function It(r) {
  const t = Wt(r);
  return t ? { w: t.w, h: t.h } : { w: nt[r.type].w, h: nt[r.type].h };
}
function Vt(r) {
  return Wt(r)?.ports ?? nt[r.type].ports;
}
function yi(r) {
  return Wt(r)?.badges ?? nt[r.type].badges;
}
function ns(r, t = !1) {
  const e = Wt(r), s = t && e?.atDhw || e?.at;
  return zt(r).map((i) => e ? { ...i, pos: e.pos?.[i.key] ?? i.pos, at: s?.[i.key] ?? e.at?.[i.key] ?? i.at } : i);
}
function bt(r) {
  const t = { ...nt[r.type], ...It(r) };
  if (r.type === "value_tile") {
    const s = (r.props.entries || []).length;
    return { w: t.w, h: 2 + Math.ceil(s * 1.3) };
  }
  const e = r.rot || 0;
  return e === 90 || e === 270 ? { w: t.h, h: t.w } : { w: t.w, h: t.h };
}
const xi = ["r", "b", "l", "t"];
function no(r, t) {
  const e = t / 90 % 4;
  return xi[(xi.indexOf(r) + e) % 4];
}
function yt(r, t) {
  const e = Vt(r).find((d) => d.id === t);
  if (!e) return null;
  const s = r.rot || 0, { w: i, h: n } = It(r);
  let { x: o, y: a } = e, l = e.dir;
  return r.flip && nt[r.type].mirrorable && (o = i - o, l = l === "l" ? "r" : l === "r" ? "l" : l), s === 90 ? [o, a] = [n - a, o] : s === 180 ? [o, a] = [i - o, n - a] : s === 270 && ([o, a] = [a, i - o]), { x: r.x + o, y: r.y + a, dir: no(l, s), def: e };
}
const Ee = [
  { id: "buderus-wlw-mb-ar", label: "Buderus Logatherm WLW186i AR – Außeneinheit WLW-… MB AR (4/5/7/10/12 kW)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw-mbe-ar", label: "Buderus Logatherm WLW186i MBE+ AR – Außeneinheit (11/13/15 kW)", brand: "buderus", source: "air", nominal: 13, refrigerant: "R290" },
  { id: "buderus-wlw176i-ar", label: "Buderus Logatherm WLW176i AR – Außeneinheit (4/5/7/10/12 kW)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw166i-mbb-ar", label: "Buderus Logatherm WLW166i MBB AR – Außeneinheit (4/6/7/10/13 kW)", brand: "buderus", source: "air", nominal: 7, refrigerant: "R290" },
  { id: "buderus-wlw196i-ar", label: "Buderus Logatherm WLW196i AR – Außeneinheit (4/6/8/11/14 kW)", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wlw196i-ar-s", label: "Buderus Logatherm WLW196i AR S+ – Außeneinheit, schalloptimiert", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wlw196i-ir", label: "Buderus Logatherm WLW196i IR – Innenaufstellung (6/8/11/14 kW)", brand: "buderus", source: "air", nominal: 8 },
  { id: "buderus-wsw186i", label: "Buderus Logatherm WSW186i – Erdsonde/Kollektor (6/8/12/16 kW)", brand: "buderus", source: "brine", nominal: 8 },
  { id: "buderus-wsw196i", label: "Buderus Logatherm WSW196i(T) – Erdsonde/Kollektor (2–16 kW)", brand: "buderus", source: "brine", nominal: 8 },
  { id: "bosch-cs5800i-aw", label: "Bosch Compress 5800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs6800i-aw", label: "Bosch Compress 6800i AW", brand: "bosch", source: "air", nominal: 7 },
  { id: "bosch-cs7800i-lw", label: "Bosch Compress 7800i LW (Sole/Wasser)", brand: "bosch", source: "brine", nominal: 8 },
  { id: "generic-air", label: "Luft/Wasser (allgemein)", brand: "generic", source: "air", nominal: 8 },
  { id: "generic-brine", label: "Sole/Wasser (allgemein)", brand: "generic", source: "brine", nominal: 8 }
], oo = { "buderus-wsw": "buderus-wsw186i" }, Ys = [
  { id: "buderus-wlw186i-e", label: "Logatherm WLW186i E – wandhängend, E-Zuheizer", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw186i-t180", label: "Logatherm WLW186i T180 – Standgerät mit 180-l-WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wlw186i-tp70", label: "Logatherm WLW186i TP70 – Standgerät mit 70-l-Puffer", variant: "tp70", aux: !0, buffer: 70 },
  { id: "buderus-wlw186i-mbe-e", label: "Logatherm WLW186i MBE+ E – wandhängend", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw186i-mbe-tp70", label: "Logatherm WLW186i MBE+ TP70 – Standgerät mit 70-l-Puffer", variant: "tp70", aux: !0, buffer: 70 },
  { id: "buderus-wlw176i-e", label: "Logatherm WLW176i E – wandhängend", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw176i-t180", label: "Logatherm WLW176i T180 – mit 180-l-WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wlw176i-tp70", label: "Logatherm WLW176i TP70 – mit 70-l-Puffer", variant: "tp70", aux: !0, buffer: 70 },
  { id: "buderus-wlw166i-e", label: "Logatherm WLW166i E – wandhängend", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw166i-t180", label: "Logatherm WLW166i T180 – mit 180-l-WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wlw196i-e", label: "Logatherm WLW196i E – wandhängend", variant: "wall_e", aux: !0 },
  { id: "buderus-wlw196i-t180", label: "Logatherm WLW196i T180 – mit WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wsw186i", label: "Logatherm WSW186i – Sole-Kompaktgerät", variant: "brine", aux: !0 },
  { id: "buderus-wsw186i-t180", label: "Logatherm WSW186i T180 – Sole mit 180-l-WW-Speicher", variant: "t180", aux: !0, dhw: 180 },
  { id: "buderus-wsw186i-tp50", label: "Logatherm WSW186i TP50 – Sole mit 50-l-Puffer", variant: "tp70", aux: !0, buffer: 50 },
  { id: "buderus-wsw196i", label: "Logatherm WSW196i(T) – Sole-Kompaktgerät", variant: "brine", aux: !0 },
  { id: "bosch-aw-e", label: "Bosch Compress AW Inneneinheit (E-Zuheizer)", variant: "wall_e", aux: !0 },
  { id: "bosch-aw-m", label: "Bosch Compress AW Inneneinheit (mit Speicher)", variant: "t180", aux: !0, dhw: 180 },
  { id: "generic", label: "Andere Inneneinheit / Hydraulikmodul", variant: "wall_e" }
], ro = {
  "buderus-wlw186i-t": "buderus-wlw186i-t180",
  "buderus-wlw186i-b": "buderus-wlw186i-e",
  "bosch-aw-b": "bosch-aw-e"
};
function Jt(r) {
  const t = r && ro[r] || r;
  return Ys.find((e) => e.id === t);
}
function Dt(r) {
  const t = r && oo[r] || r;
  return Ee.find((e) => e.id === t) || Ee.find((e) => e.id === "generic-air");
}
const mn = /* @__PURE__ */ new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);
function tt(r) {
  return !r || !r.available || r.raw === null ? !1 : typeof r.raw == "boolean" ? r.raw : r.num !== null ? r.num > 0 : mn.has(String(r.raw).trim().toLowerCase());
}
const ao = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"]
};
function Qt(r) {
  if (!r || !r.available || r.raw === null) return;
  const t = String(r.raw).trim().toLowerCase();
  for (const [e, s] of Object.entries(ao)) if (s.includes(t)) return e;
  return t.includes("abtau") || t.includes("defrost") ? "defrost" : t;
}
function Xs(r, t, e) {
  if (r === void 0 || r === "unavailable" || r === "unknown" || r === "")
    return { raw: null, num: null, unit: t, entity: e, available: !1 };
  const s = Number(r);
  return { raw: r, num: Number.isFinite(s) ? s : null, unit: t, entity: e, available: !0 };
}
class fn {
  constructor(t) {
    this.hass = t;
  }
  entityOf(t, e) {
    return t.type === "value_tile" ? (t.props.entries || []).find((i) => i.slot === e)?.entity : t.bindings[e];
  }
  get(t, e) {
    const s = this.entityOf(t, e);
    return s ? this.getEntity(s) : void 0;
  }
  getEntity(t) {
    const e = this.hass.states[t];
    return Xs(e?.state, e?.attributes?.unit_of_measurement, t);
  }
  async history(t, e, s) {
    const i = this.entityOf(t, e);
    return i ? lo(this.hass, i, s) : [];
  }
}
async function lo(r, t, e) {
  const s = /* @__PURE__ */ new Date(), i = new Date(s.getTime() - e * 36e5);
  return ((await r.callWS({
    type: "history/history_during_period",
    start_time: i.toISOString(),
    end_time: s.toISOString(),
    entity_ids: [t],
    minimal_response: !0,
    no_attributes: !0,
    significant_changes_only: !1
  }))[t] || []).map((a) => {
    const l = String(a.s).toLowerCase();
    let d = Number(a.s);
    return Number.isFinite(d) || (d = mn.has(l) ? 1 : l === "off" || l === "false" ? 0 : null), { t: a.lu, v: d, raw: String(a.s) };
  });
}
function kt(r, t) {
  const e = /* @__PURE__ */ new Set(), s = (i) => t.get(r, i);
  switch (r.type) {
    case "pump":
    case "mixer":
      (tt(s("running")) || tt(s("speed")) || tt(s("flow"))) && e.add("running"), r.type === "mixer" && tt(s("position")) && e.add("running");
      break;
    case "valve_3way": {
      const i = s("position");
      e.add(tt(i) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const i = Qt(s("activity"));
      (tt(s("compressor_on")) || tt(s("compressor_speed")) || tt(s("heat_power"))) && e.add("running"), i === "defrost" && e.add("defrost"), i === "compressor_alarm" && e.add("alarm"), i && i !== "off" && i !== "compressor_alarm" && e.add("running"), i && e.add(`mode_${i}`);
      break;
    }
    case "indoor_unit": {
      (tt(s("aux_level")) || tt(s("aux_step1")) || tt(s("aux_step2")) || tt(s("aux_step3"))) && e.add("aux"), (tt(s("pc0_running")) || tt(s("pc0_speed")) || tt(s("flow"))) && e.add("running"), e.add(tt(s("vw1_position")) || !r.bindings.vw1_position && tt(s("dhw_active")) && !tt(s("heating_active")) ? "b" : "a"), (tt(s("pc1_running")) || tt(s("pc1_speed"))) && e.add("pc1"), tt(s("dhw_charging")) && e.add("charging");
      const i = tt(s("dhw_active")) || e.has("running") && e.has("b") ? "hot_water" : tt(s("heating_active")) || e.has("running") ? "heating" : "off";
      e.add(`mode_${i}`);
      break;
    }
    case "dhw_tank":
      tt(s("charging")) && e.add("charging"), tt(s("disinfecting")) && e.add("disinfecting");
      break;
    case "tap":
      tt(s("flow")) && e.add("flowing");
      break;
    case "radiators":
    case "floor_heating":
      e.add("on");
      break;
  }
  return e;
}
function $i(r, t) {
  const e = t.get(r.c);
  return e ? r.s.startsWith("!") ? !e.has(r.s.slice(1)) : e.has(r.s) : !1;
}
function co(r, t) {
  const e = r.flow || [], s = r.flowAny || [];
  return e.length === 0 && s.length === 0 ? !1 : e.every((i) => $i(i, t)) && (s.length === 0 || s.some((i) => $i(i, t)));
}
function po(r, t) {
  const e = new Map(r.components.map((n) => [n.id, n])), s = /* @__PURE__ */ new Map(), i = (n) => {
    const o = e.get(n.c);
    if (!o) return;
    const a = yt(o, n.p);
    if (a) {
      if (a.def.fixedTemp !== void 0) return a.def.fixedTemp;
      if (!(a.def.vw1 && !kt(o, t).has(a.def.vw1)) && a.def.tempSlot) {
        const l = t.get(o, a.def.tempSlot);
        if (l?.available && l.num !== null) return l.num;
      }
    }
  };
  for (const n of r.pipes) {
    if (n.bindings?.temp) {
      const a = t.getEntity(n.bindings.temp);
      if (a?.available && a.num !== null) {
        s.set(n.id, a.num);
        continue;
      }
    }
    const o = i(n.from);
    o !== void 0 && s.set(n.id, o);
  }
  for (let n = 0; n < 6; n++) {
    let o = !1;
    for (const a of r.pipes) {
      if (s.has(a.id)) continue;
      const l = e.get(a.from.c);
      if (l && nt[l.type].passive) {
        const d = r.pipes.find((p) => p.to.c === l.id && s.has(p.id));
        if (d) {
          s.set(a.id, s.get(d.id)), o = !0;
          continue;
        }
      }
      if (n === 5 || !l || !nt[l.type].passive) {
        const d = i(a.to);
        d !== void 0 && (s.set(a.id, d), o = !0);
      }
    }
    if (!o && n > 0) break;
  }
  return s;
}
const ho = {
  temp: "°C",
  power_kw: "kW",
  power_w: "W",
  percent: "%",
  pressure: "bar",
  flow: "l/h",
  flow_lmin: "l/min",
  energy: "kWh",
  duration: "min"
};
function ae(r, t) {
  return zt(r).find((e) => e.key === t)?.kind || "text";
}
function Bt(r, t) {
  if (!r) return { text: c("none"), unit: "" };
  if (!r.available) return { text: c("none"), unit: "" };
  if (t === "bool") return { text: tt(r) ? c("on") : c("off"), unit: "" };
  if (t === "enum" && r.num === null) {
    const o = `mode.${Qt(r)}`, a = c(o);
    return { text: a === o ? String(r.raw) : a, unit: "" };
  }
  let e = r.unit ?? ho[t] ?? "";
  if (r.num === null) return { text: String(r.raw), unit: "" };
  let s = r.num;
  if (t === "flow" && s < 0) return { text: c("none"), unit: "" };
  t === "power_w" && e === "W" && Math.abs(s) >= 1e3 && (s = s / 1e3, e = "kW");
  const i = t === "count" || t === "percent" || t === "flow" || t === "duration" || t === "power_w" && e === "W" || t === "energy" && s >= 100 ? 0 : 1;
  return { text: G(s, i), unit: e };
}
function gt(r, t) {
  if (r === void 0 || Number.isNaN(r)) return t;
  const e = [
    [5, [43, 108, 255]],
    [20, [34, 195, 230]],
    [28, [61, 220, 151]],
    [36, [245, 197, 66]],
    [44, [255, 138, 61]],
    [54, [255, 77, 77]],
    [65, [224, 33, 122]]
  ];
  if (r <= e[0][0]) return Se(e[0][1]);
  for (let s = 1; s < e.length; s++) {
    const [i, n] = e[s], [o, a] = e[s - 1];
    if (r <= i) {
      const l = (r - o) / (i - o);
      return Se([0, 1, 2].map((d) => a[d] + (n[d] - a[d]) * l));
    }
  }
  return Se(e[e.length - 1][1]);
}
function Se(r) {
  return `rgb(${r.map((t) => Math.round(t)).join(",")})`;
}
function uo(r, t) {
  const e = (i, n, o) => Se([0, 1, 2].map((a) => i[a] + (n[a] - i[a]) * Math.max(0, Math.min(1, o)))), s = (i, n) => t === void 0 ? 0.5 : (t - i) / (n - i);
  switch (r) {
    case "supply":
      return e([245, 176, 66], [255, 64, 64], s(25, 55));
    case "return":
      return e([46, 110, 255], [77, 208, 255], s(20, 45));
    case "dhw_hot":
      return e([255, 128, 170], [255, 46, 120], s(35, 60));
    case "dhw_cold":
      return "rgb(110, 205, 255)";
    case "circulation":
      return e([150, 120, 255], [196, 120, 255], s(35, 55));
    default:
      return gt(t, "#8a97a6");
  }
}
function gn(r) {
  const t = r?.split(".")[0];
  return t === "number" || t === "input_number" ? "number" : t === "select" || t === "input_select" ? "select" : t === "switch" || t === "input_boolean" ? "switch" : t === "button" || t === "input_button" ? "button" : null;
}
function _n(r, t = -12) {
  return {
    design: r ? 35 : 50,
    minExt: t,
    offset: 0,
    roomSet: 21,
    minFlow: r ? 22 : 25,
    maxFlow: r ? 40 : 55,
    limit: 16,
    exponent: r ? 1.1 : 1.3
  };
}
function le(r, t) {
  if (t >= r.limit) return null;
  const e = Math.max(1, r.roomSet - r.minExt), s = Math.max(0, (r.roomSet - t) / e), i = r.roomSet + (r.design - r.roomSet) * Math.pow(s, 1 / r.exponent);
  return Math.max(r.minFlow, Math.min(r.maxFlow, i + r.offset));
}
function mo(r, t) {
  const e = r.exponent > 1.2 ? 2.5 : 1.5, s = (r.roomSet - t) * e;
  return Math.round(s * 2) / 2;
}
const fo = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: !1
}, Ft = 4.186 / 3600, ki = 10, os = 21, go = 10, _o = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9]
], wo = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19]
];
class vo {
  constructor(t = {}, e = Date.now() / 1e3, s) {
    this.speed = 60, this.outdoorMean = 2, this.dailySwing = 2.5, this.tOut = 2, this.tRoom = 20.8, this.bufTop = 38, this.bufBot = 33, this.dhwTop = 49, this.dhwBot = 43, this.tVl = 30, this.tRl = 28, this.tVlHc = 38, this.tRlHc = 32, this.mode = "off", this.pTh = 0, this.pEl = 0, this.cop = 0, this.running = !1, this.lastStart = -1e9, this.lastStop = -1e9, this.pc0Overrun = 0, this.ice = 0.3, this.defrostLeft = 0, this.aux = 0, this.auxTimer = 0, this.heatDemand = !1, this.dhwDemand = !1, this.tapFlow = 0, this.tapLeft = 0, this.qEmit = 0, this.starts = 0, this.e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 }, this.dim14a = !1, this.pv = !1, this.soc = 55, this.cloud = 0.8, this.en = { pv: 0, house: 0.4, wallbox: 0, battery: 0, grid: 0, hp: 0 }, this.disinfect = !1, this.fault = !1, this.lastDrawDay = /* @__PURE__ */ new Map(), this.days = /* @__PURE__ */ new Map(), this.sampleAcc = 0, this.hist = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.messages = [], this.labels = { dhw: "WW" }, this.listeners = [], this.p = { ...fo, ...t }, this.curve = _n(this.p.floor, this.p.designTemp), s && (this.labels = { ...this.labels, ...s }), this.time = e - 24 * 3600, this.prefill(e);
  }
  prefill(t) {
    const e = this.listeners;
    for (this.listeners = []; this.time < t; ) this.step(ki);
    this.messages = this.messages.slice(-40), this.listeners = e;
  }
  onMessage(t) {
    return this.listeners.push(t), () => {
      this.listeners = this.listeners.filter((e) => e !== t);
    };
  }
  /** Advance by real seconds × speed. */
  advance(t) {
    let e = Math.min(t, 1) * this.speed, s = 0;
    for (; e > 0 && s++ < 400; ) {
      const i = Math.min(ki, e);
      this.step(i), e -= i;
    }
  }
  hour() {
    const t = new Date(this.time * 1e3);
    return t.getHours() + t.getMinutes() / 60 + t.getSeconds() / 3600;
  }
  // ----------------------------------------------------------- physics
  pMax() {
    const t = this.p.nominal, e = this.p.source === "air" ? 1 + 0.015 * (this.tOut - 2) : 1;
    return Math.max(t * 0.55, Math.min(t * 1.2, t * e));
  }
  pMin() {
    const t = this.p.nominal * 0.18, e = this.p.source === "air" ? 1 + 0.04 * Math.max(0, this.tOut - 2) : 1;
    return Math.max(1, t * e);
  }
  curveSetpoint() {
    const t = this.pv ? 5 : 0;
    return (le(this.curve, this.tOut) ?? this.curve.minFlow) + t;
  }
  dhwSetpoint() {
    return this.disinfect ? 60 : this.pv ? 55 : 50;
  }
  step(t) {
    this.time += t;
    const e = this.hour(), s = t / 3600, i = this.p, n = this.outdoorMean + this.dailySwing * Math.cos((e - 15) / 24 * 2 * Math.PI);
    this.tOut += (n - this.tOut) * Math.min(1, t / 1800);
    const o = this.tOut < this.curve.limit, a = this.curveSetpoint(), l = o ? 650 * Ft * 3600 / 3600 : 0, d = i.heatLoad * (i.floor, 1), p = i.floor ? 30 - os : 45 - os, h = i.floor ? 1.1 : 1.3;
    let m = 0;
    if (this.tVlHc = this.bufTop, l > 0) {
      let M = this.tVlHc - 3;
      for (let z = 0; z < 4; z++)
        m = d * Math.pow(Math.max(0, (M - this.tRoom) / p), h), M = this.tVlHc - m / (2 * l);
      m *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - this.curve.roomSet - 0.2) * 1.5)), this.tRlHc = this.tVlHc - m / l;
    } else
      this.tRlHc = this.bufBot;
    this.qEmit = m;
    const u = i.heatLoad / (os - i.designTemp);
    this.tRoom += (m - u * (this.tRoom - this.tOut) + 0.35) * s / 9;
    const _ = Math.floor(this.time / 86400);
    _o.forEach(([M, z, N], R) => {
      e >= M && e < M + 0.1 && this.lastDrawDay.get(R) !== _ && (this.lastDrawDay.set(R, _), this.startDraw(z, N));
    }), this.tapLeft > 0 && (this.tapLeft -= t, this.tapLeft <= 0 && (this.tapFlow = 0));
    const w = wo.some(([M, z]) => e >= M && e < z), b = i.dhwL / 2 * Ft, v = this.tapFlow * 60 * Ft * (40 - go), x = 1.38 / 24 / 2 + (w ? 0.12 : 0) / 2;
    this.dhwTop -= (v * 0.35 + x) * s / b, this.dhwBot -= (v * 0.65 + x) * s / b;
    const k = this.dhwSetpoint();
    (this.dhwTop < k - 5 || this.dhwBot < k - 14 || this.disinfect && this.dhwBot < 59) && (this.dhwDemand = !0), this.dhwBot >= k - 0.5 && this.dhwTop >= k - 0.5 && (this.dhwDemand = !1, this.disinfect && (this.disinfect = !1, this.condition("dis", !1, "info", "dhw_disinfection", {}, "dhw"))), o && this.bufTop < a - 2 && (this.heatDemand = !0);
    const C = this.time - this.lastStart > 600;
    (!o || this.bufTop > a + 2.5 && C) && (this.heatDemand = !1);
    let T = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    this.defrostLeft > 0 && !this.fault && (T = "defrost");
    const E = T === "heating" || T === "hot_water" || T === "defrost";
    E && !this.running ? this.time - this.lastStop >= 480 || T === "defrost" ? (this.running = !0, this.lastStart = this.time, this.starts++, this.pTh = this.pMin()) : T = "off" : !E && this.running && (this.time - this.lastStart > 600 || this.fault ? (this.running = !1, this.lastStop = this.time, this.pc0Overrun = 180) : T = this.mode === "hot_water" ? "hot_water" : "heating"), this.mode = this.running ? T : this.fault ? "compressor_alarm" : "off";
    const D = this.pMax(), J = this.pMin();
    let U = 0;
    if (this.running && this.mode === "heating" ? U = this.qEmit + 2.2 * (a + 1 - this.bufTop) : this.running && this.mode === "hot_water" && (U = Math.min(D * 0.9, Math.max(J, (60 - this.dhwBot - 3) * 0.9))), this.running && this.mode !== "defrost") {
      U = Math.max(J, Math.min(D, U)), this.pTh < J && (this.pTh = J);
      const M = 0.5 * (t / 60);
      this.pTh += Math.max(-M * 2, Math.min(M, U - this.pTh));
    } else this.mode === "defrost" ? this.pTh = -3 : this.pTh = 0;
    let at = 0;
    this.dim14a || (this.fault && o ? at = i.auxKw : this.mode === "heating" && this.bufTop < a - 5 && this.pTh >= D * 0.95 ? (this.auxTimer += t, this.auxTimer > 1200 && (at = Math.min(i.auxKw, 3))) : this.auxTimer = 0, this.tOut < i.designTemp + 2 && this.mode === "heating" && (at = Math.max(at, Math.min(i.auxKw, 3))), this.disinfect && this.mode === "hot_water" && this.dhwBot > 52 && (at = Math.min(i.auxKw, 3))), this.fault && o && at > 0 && (this.heatDemand = !0), this.aux = at;
    const X = this.running || this.pc0Overrun > 0 || this.fault && this.aux > 0;
    !this.running && this.pc0Overrun > 0 && (this.pc0Overrun -= t);
    const lt = X ? 1100 * Ft : 0, it = this.mode === "hot_water", O = (this.running ? this.pTh : 0) + this.aux;
    it ? this.tRl = this.dhwBot + 2 : this.tRl = X ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, t / 3600), this.tVl = lt > 0 ? this.tRl + O / lt : this.tVl + (this.tRl - this.tVl) * Math.min(1, t / 600);
    const L = (i.bufferL + 60) / 2 * Ft, K = it ? 0 : lt, j = 0.05 / 2, q = K * (this.tVl - this.bufTop) + (l > K ? (l - K) * (this.bufBot - this.bufTop) : 0) - j, ct = l * (this.tRlHc - this.bufBot) + (K > l ? (K - l) * (this.bufTop - this.bufBot) : 0) - j;
    if (this.bufTop += q * s / L, this.bufBot += ct * s / L, this.bufBot > this.bufTop) {
      const M = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = M;
    }
    if (it && (this.dhwBot += O * s / b, this.dhwBot > this.dhwTop)) {
      const M = (this.dhwBot + this.dhwTop) / 2;
      this.dhwBot = this.dhwTop = M;
    }
    if (this.running && this.mode !== "defrost") {
      const M = this.tVl + 273.15 + 3, z = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, 0.57 * M / Math.max(5, M - z))), this.pEl = this.pTh / this.cop + 0.06;
    } else this.mode === "defrost" ? (this.cop = 0, this.pEl = 1.1) : (this.cop = 0, this.pEl = 0.012 + (X ? 0.03 : 0));
    const I = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * s, this.e.aux += this.aux * s, this.e.heat += (I + this.aux) * s;
    const ot = new Date(this.time * 1e3), dt = new Date(ot.getFullYear(), ot.getMonth(), ot.getDate()).getTime();
    let wt = this.days.get(dt);
    if (!wt) {
      this.days.set(dt, wt = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 });
      for (const M of [...this.days.keys()]) M < dt - 3 * 864e5 && this.days.delete(M);
    }
    if (wt.heat += (I + this.aux) * s, wt.el += (this.pEl + this.aux) * s, wt.aux += this.aux * s, it && (wt.heatDhw += I * s, wt.elDhw += this.pEl * s), it ? (this.e.elDhw += this.pEl * s, this.e.heatDhw += I * s) : (this.e.elHeat += this.pEl * s, this.e.heatHeat += I * s), this.defrostLeft > 0)
      this.defrostLeft -= t, this.defrostLeft <= 0 && (this.ice = 0, this.defrostLeft = 0);
    else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const M = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, M) * (this.pTh / D) * s, this.ice >= 1 && (this.defrostLeft = 240 + Math.random() * 120);
    }
    this.emitConditions(), this.energyStep(t, e), this.values = this.buildValues(a, k, w, X, lt), this.sampleAcc += t, this.sampleAcc >= 60 && (this.sampleAcc = 0, this.sample());
  }
  /** Household power balance around the heat pump (PV, battery, house, wallbox, grid). */
  energyStep(t, e) {
    const s = t / 3600;
    this.cloud += (Math.random() - 0.5) * 0.08 * Math.sqrt(t / 10), this.cloud = Math.max(0.35, Math.min(1, this.cloud));
    const i = Math.max(0.25, Math.min(1, 0.45 + (this.outdoorMean - 2) / 25)), n = e > 7 && e < 19 ? Math.sin((e - 7) / 12 * Math.PI) : 0;
    let o = 9.9 * 0.8 * i * n * this.cloud;
    this.pv && (o = Math.max(o, 6.5));
    const a = (w, b, v) => e >= w && e < b ? v : 0, l = 0.35 + a(6.5, 8, 0.6) + a(11.5, 13, 0.9) + a(18, 21, 0.8) + 0.05 * Math.sin(this.time / 97);
    let p = Math.floor(this.time / 86400) % 2 === 0 && e >= 18 && e < 21.5 ? 7.4 : 0;
    this.dim14a && p && (p = 4.2);
    const h = this.pEl + this.aux, m = o - l - p - h;
    let u = 0;
    m > 0 && this.soc < 100 ? u = -Math.min(m, 5) : m < 0 && this.soc > 10 && !p && (u = Math.min(-m, 5)), this.soc = Math.max(0, Math.min(100, this.soc - u * s * 100 / 10));
    const _ = l + p + h - o - u;
    this.en = { pv: o, house: l, wallbox: p, battery: u, grid: _, hp: h };
  }
  startDraw(t, e) {
    this.tapFlow = e, this.tapLeft = t * 60;
  }
  buildValues(t, e, s, i, n) {
    const o = (d) => Math.round(d * 10) / 10, a = this.pMax(), l = this.running;
    return {
      outdoor: {
        outdoor_temp: o(this.tOut),
        air_in_temp: o(this.tOut + 0.4),
        activity: this.mode,
        compressor_on: l && this.mode !== "defrost" ? !0 : l,
        compressor_speed: l ? Math.round(Math.abs(this.pTh) / (a * 1.15) * 100) : 0,
        fan_speed: l && this.mode !== "defrost" ? Math.round(35 + this.pTh / a * 55) : 0,
        heat_power: o(Math.max(0, l ? this.pTh : 0)),
        el_power: Math.round(this.pEl * 1e3),
        compressor_starts: this.starts,
        evap_in_temp: o(this.tOut - (l ? 6 : 0)),
        comp_in_temp: o(this.tOut - (l ? 2 : 0)),
        comp_out_temp: o(l ? this.tVl + 28 : this.tOut + 5),
        hp_temp: o(l ? this.tVl + 3 : this.tOut),
        lp_temp: o(l ? this.tOut - 7 : this.tOut),
        drain_pan_temp: o(this.mode === "defrost" ? 4 : Math.max(this.tOut, 1)),
        silent_mode: "auto"
      },
      indoor: {
        supply_temp: o(this.tVl),
        return_temp: o(this.tRl),
        condenser_temp: o(this.tVl + (l ? 1 : 0)),
        target_flow_temp: o(this.mode === "hot_water" ? Math.min(62, e + 8) : t),
        pressure: o(1.45 + ((this.bufTop + this.bufBot) / 2 - 30) * 8e-3),
        flow: i ? Math.round(n / Ft) : 0,
        aux_level: Math.round(this.aux / 9 * 100),
        aux_step1: this.aux >= 3,
        aux_step2: this.aux >= 6,
        aux_step3: this.aux >= 9,
        input1: this.dim14a,
        input2: !1,
        input3: !1,
        input4: this.pv,
        heating_active: this.mode === "heating",
        dhw_active: this.mode === "hot_water",
        el_energy_total: o(this.e.el),
        el_energy_heating: o(this.e.elHeat),
        el_energy_dhw: o(this.e.elDhw),
        heat_energy_total: o(this.e.heat),
        heat_energy_heating: o(this.e.heatHeat),
        heat_energy_dhw: o(this.e.heatDhw),
        aux_energy_total: o(this.e.aux),
        service_code: this.fault ? "SIM" : ""
      },
      energy: {
        pv_power: Math.round(this.en.pv * 1e3),
        house_power: Math.round(this.en.house * 1e3),
        wallbox_power: Math.round(this.en.wallbox * 1e3),
        battery_power: Math.round(this.en.battery * 1e3),
        battery_soc: Math.round(this.soc),
        grid_power: Math.round(this.en.grid * 1e3),
        hp_power: Math.round(this.en.hp * 1e3)
      },
      pc0: { running: i, speed: i ? 72 : 0, flow: i ? 1100 : 0 },
      pc1: { running: this.tOut < 16, speed: this.tOut < 16 ? 55 : 0, flow: this.tOut < 16 ? 650 : 0 },
      circ: { running: s },
      vw1: { position: this.mode === "hot_water" },
      buffer: { temp_top: o(this.bufTop), temp_mid: o((this.bufTop + this.bufBot) / 2), temp_bottom: o(this.bufBot) },
      dhw: {
        temp_top: o(this.dhwTop),
        temp_bottom: o(this.dhwBot),
        setpoint: e,
        charging: this.mode === "hot_water",
        onetime: !1,
        disinfecting: this.disinfect
      },
      hc: {
        flow_temp: o(this.tVlHc),
        return_temp: o(this.tRlHc),
        target_flow_temp: o(t),
        room_temp: o(this.tRoom),
        room_setpoint: this.curve.roomSet,
        mode: "auto",
        summer_mode: this.tOut < 16 ? "winter" : "summer",
        operating_state: this.tOut < 16 ? "heating" : "off",
        design_temp: this.curve.design,
        offset_temp: this.curve.offset,
        min_flow_temp: this.curve.minFlow,
        max_flow_temp: this.curve.maxFlow,
        min_ext_temp: this.curve.minExt,
        heating_limit: this.curve.limit
      },
      tap: { flow: this.tapFlow, temp: o(this.dhwTop - 2) },
      mixer: { position: this.tOut < 16 ? 40 : 0, flow_temp: o(Math.min(this.tVlHc, 33)) }
    };
  }
  // ----------------------------------------------------------- messages
  condition(t, e, s, i, n, o) {
    const a = this.active.get(t);
    if (e && !a) {
      const l = {
        id: Math.random().toString(16).slice(2, 14),
        ts: this.time,
        level: s,
        key: i,
        params: n,
        component_id: o,
        active: !0,
        end_ts: null
      };
      this.active.set(t, l.id), this.messages.push(l), this.messages.length > 200 && this.messages.shift(), this.listeners.forEach((d) => d(l));
    } else if (!e && a) {
      this.active.delete(t);
      const l = this.messages.find((d) => d.id === a);
      l && (l.active = !1, l.end_ts = this.time, this.listeners.forEach((d) => d(l)));
    }
  }
  emitConditions() {
    this.condition("defrost", this.mode === "defrost", "info", "defrost", {}, "outdoor"), this.condition("dhw", this.mode === "hot_water", "info", "dhw_charging", { component: this.labels.dhw }, "dhw"), this.condition("aux", this.aux > 0, "notice", "aux_heater", {}, "indoor"), this.condition("in1", this.dim14a, "warning", "input_active", { input: 1, label: "§14a" }, "indoor"), this.condition("in4", this.pv, "notice", "input_active", { input: 4, label: "PV-Überschuss" }, "indoor"), this.condition("dis", this.disinfect, "info", "dhw_disinfection", { component: this.labels.dhw }, "dhw"), this.condition("fault", this.fault, "error", "sim_fault", {}, "outdoor");
  }
  scenarioMessage(t) {
    const e = {
      id: Math.random().toString(16).slice(2, 14),
      ts: this.time,
      level: "info",
      key: "sim_scenario",
      params: { name: t },
      component_id: null,
      active: !1,
      end_ts: null
    };
    this.messages.push(e), this.listeners.forEach((s) => s(e));
  }
  // ----------------------------------------------------------- history
  sample() {
    const t = this.time;
    for (const [e, s] of Object.entries(this.values))
      for (const [i, n] of Object.entries(s)) {
        const o = typeof n == "number" ? n : typeof n == "boolean" ? n ? 1 : 0 : null;
        if (o === null && i !== "activity") continue;
        const a = `${e}.${i}`;
        let l = this.hist.get(a);
        l || this.hist.set(a, l = []), l.push(o === null ? { t, v: null, raw: String(n) } : { t, v: o }), l.length > 1500 && l.splice(0, l.length - 1440);
      }
  }
  dailyEnergy() {
    return [...this.days.entries()].sort((t, e) => t[0] - e[0]).map(([t, e]) => ({ day: t, ...e }));
  }
  history(t, e, s) {
    const i = this.hist.get(`${t}.${e}`) || [], n = this.time - s * 3600;
    return i.filter((o) => o.t >= n);
  }
}
function Si(r) {
  switch (r.type) {
    case "outdoor_unit":
      return "outdoor";
    case "indoor_unit":
      return "indoor";
    case "buffer":
      return "buffer";
    case "dhw_tank":
      return "dhw";
    case "radiators":
    case "floor_heating":
      return "hc";
    case "tap":
      return "tap";
    case "mixer":
      return "mixer";
    case "valve_3way":
      return "vw1";
    case "pump": {
      const t = r.props.role;
      return t === "primary" ? "pc0" : t === "circulation" ? "circ" : "pc1";
    }
    default:
      return null;
  }
}
function rs(r) {
  if (!r) return {};
  const t = r.components.find((l) => l.type === "outdoor_unit"), e = r.components.find((l) => l.type === "indoor_unit"), s = r.components.find((l) => l.type === "buffer"), i = r.components.find((l) => l.type === "dhw_tank"), n = Jt(e?.model), o = Dt(t?.model), a = r.components.filter((l) => l.type === "radiators" || l.type === "floor_heating");
  return {
    nominal: Number(t?.props.nominal_kw) || o.nominal,
    source: o.source,
    bufferL: Number(s?.props.volume) || n?.buffer || (s ? 120 : 30),
    dhwL: Number(i?.props.volume) || n?.dhw || 274,
    auxKw: Number(e?.props.aux_kw) || 6,
    heatLoad: Number(r.settings?.heat_load) || 6.2,
    floor: a.length > 0 && a.every((l) => l.type === "floor_heating")
  };
}
const bo = {}, Mi = {
  pc0_running: ["pc0", "running"],
  pc0_speed: ["pc0", "speed"],
  vw1_position: ["vw1", "position"],
  pc1_running: ["pc1", "running"],
  pc1_speed: ["pc1", "speed"],
  dhw_temp: ["dhw", "temp_top"],
  dhw_setpoint: ["dhw", "setpoint"],
  dhw_charging: ["dhw", "charging"],
  buffer_temp: ["buffer", "temp_top"]
};
class wn {
  /** hass is used for raw entity lookups (e.g. real PV/grid values in the energy layer) */
  constructor(t, e) {
    this.sim = t, this.hass = e;
  }
  entityOf() {
  }
  getEntity() {
  }
  /** Real entity value despite demo mode (energy layer: household PV, grid, battery …). */
  realEntity(t) {
    const e = this.hass?.states?.[t];
    return e ? Xs(e.state, e.attributes?.unit_of_measurement, t) : void 0;
  }
  get(t, e) {
    if (t.type === "value_tile") {
      const n = (t.props.entries || []).find((l) => l.slot === e);
      if (!n?.sim) return;
      const [o, a] = n.sim.split(".");
      return this.wrap(this.sim.values[o]?.[a]);
    }
    if (t.type === "indoor_unit") {
      const n = Mi[e];
      if (n) {
        const o = Wt(t)?.id;
        return e.startsWith("dhw_") && o !== "t180" || e === "buffer_temp" && o !== "tp70" || e.startsWith("pc1") && o === "wall_e" ? void 0 : this.wrap(this.sim.values[n[0]]?.[n[1]]);
      }
    }
    const s = Si(t);
    if (!s) return;
    let i = this.sim.values[s]?.[e];
    if (i !== void 0)
      return s === "hc" && typeof i == "number" && Number(t.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(e) && (i = Math.round((i - (t.type === "floor_heating" ? 12 : 2)) * 10) / 10), this.wrap(i, bo[e]);
  }
  wrap(t, e) {
    if (t !== void 0)
      return {
        raw: t,
        num: typeof t == "number" ? t : typeof t == "boolean" ? t ? 1 : 0 : null,
        unit: e,
        available: !0
      };
  }
  async history(t, e, s) {
    const i = t.type === "indoor_unit" ? Mi[e] : void 0;
    if (i) return this.sim.history(i[0], i[1], s);
    const n = Si(t);
    return n ? this.sim.history(n, e, s) : [];
  }
}
function bs() {
  return {
    name: c("wz.example_name") === "wz.example_name" ? "Meine Anlage" : c("wz.example_name"),
    outdoorModel: "buderus-wlw-mb-ar",
    nominalKw: 7.1,
    outdoorLabel: "WLW-7 MB AR",
    indoorModel: "buderus-wlw186i-e",
    indoorLabel: "WLW186i-12 E",
    aux: !0,
    auxKw: 6,
    buffer: "parallel",
    bufferVolume: 120,
    bufferLabel: "Puffer P120.5",
    dhw: "tank",
    dhwVolume: 274,
    dhwLabel: "WW-Speicher SH290.2",
    circulation: !0,
    circuits: [{ emitter: "radiators", mixed: !1, label: "Heizkörper HK1" }],
    separator: !0,
    expansion: !0
  };
}
class yo {
  constructor() {
    this.components = [], this.pipes = [], this.n = 0;
  }
  add(t, e, s, i, n, o = {}) {
    return this.components.push({ id: t, type: e, label: s, x: i, y: n, bindings: {}, props: {}, ...o }), t;
  }
  pipe(t, e, s, i = [], n = {}) {
    this.pipes.push({ id: `p${++this.n}`, from: t, to: e, kind: s, flow: i, ...n });
  }
}
const g = (r, t) => ({ c: r, p: t });
function ts(r, t) {
  const e = new yo(), s = Jt(r.indoorModel), i = s?.variant || "wall_e", n = !!s?.dhw, o = !!s?.buffer, a = r.dhw === "tank" && !n, l = r.dhw === "tank" || n, d = r.buffer !== "none" && !o, p = { c: "iu", s: "running" }, h = l ? [{ c: "iu", s: "a" }] : [], m = { c: "iu", s: "b" }, u = { c: "pc1", s: "running" }, _ = {
    aux_kw: r.aux ? r.auxKw : 0,
    input_labels: { input1: "§14a / EVU", input4: "PV" },
    input_levels: { input1: "warning" },
    pressure_min: 1,
    pressure_max: 2.7,
    buffer_l: s?.buffer
  }, w = i !== "wall_e", b = r.circuits.length === 1 && !r.circuits[0]?.mixed && r.circuits[0]?.emitter === "radiators", v = w && b && (i === "tp70" || i === "brine" || i === "t180"), x = !v && i === "tp70" && r.circuits.length <= 1 && !r.circuits[0]?.mixed, k = r.circuits[0], C = i === "wall_e" && r.buffer === "parallel" && !o && r.circuits.length === 1 && !k?.mixed && k?.emitter === "radiators", T = 50, E = 16, D = E + 3, J = 2, U = v && i === "t180", at = i === "t180" ? d ? 42 : 26 : i === "tp70" ? 34 : 32, X = U ? at + 18 : C || v ? 19 : 16, lt = v && Dt(r.outdoorModel).source === "brine", it = U ? X + 5 : C || v ? 4 : 1, O = v ? lt ? E + 3 : E - 7 : C ? E - 7 : x ? 5 : 12;
  e.add("ou", "outdoor_unit", r.outdoorLabel || c("type.outdoor_unit"), it, O, {
    model: r.outdoorModel,
    props: { nominal_kw: r.nominalKw }
  });
  const L = v ? at : C ? 44 : x ? 22 : w ? 14 : 16, K = v ? T - (i === "t180" ? 22 : i === "tp70" ? 16 : 14) : C ? T - 32 : x ? 27 : w ? 12 : 2;
  e.add("iu", "indoor_unit", r.indoorLabel || c("type.indoor_unit"), L, K, { model: r.indoorModel, props: _ });
  const j = e.components.find((M) => M.id === "iu"), q = (M) => yt(j, M), ct = { y: O + 5 }, I = (M, z, N, R, W, V, P = !0, H = {}) => {
    const pt = P ? 1 : -1, F = N + 2 * pt, Z = H.supSrcX ?? N + pt, et = H.jogY ?? R - 2, xt = P ? N - 8 : N + 1, ft = E - 8, vt = r.circuits[0];
    e.add("hc1", vt.emitter, vt.label || c("wz.circuit", { n: 1 }), xt, ft, { flip: P, props: { circuit: 1 } });
    let Tt = W;
    const ei = Z === F ? [] : [[Z, et], [F, et]];
    V ? (Tt = [{ c: "pc1", s: "running" }], e.add("pc1", "pump", "PC1", F - 1, H.pumpY ?? R - 10, { rot: 270, props: { role: "secondary", circuit: 1 } }), e.pipe(z, g("pc1", "in"), "supply", Tt, { via: ei }), e.pipe(g("pc1", "out"), g("hc1", "sup"), "supply", Tt, { via: [[F, ft + 1]] })) : e.pipe(z, g("hc1", "sup"), "supply", Tt, { via: [...ei, [F, ft + 1]] });
    let te = g("hc1", "ret"), Ot = [[N, ft + 5]];
    if (H.chainY !== void 0) {
      let ge = H.chainY;
      const si = [];
      r.separator && si.push(["sep", c("wz.separator_short"), {}], ["sc1", "SC1", { filter: !0 }]);
      for (const [es, En, Cn] of si)
        e.add(es, "separator", En, N - 1, ge, { rot: 90, props: Cn }), e.pipe(te, g(es, "in"), "return", Tt, { via: Ot }), te = g(es, "out"), Ot = [], ge += 3;
      r.expansion && H.mag !== !1 && (e.add("jmag", "junction", "", N, ge + 1), e.add("mag", "expansion_vessel", "MAG", P ? N - 4 : N + 1, ge, { rot: P ? 270 : 90 }), e.pipe(g("mag", "conn"), g("jmag", P ? "l" : "r"), "return", []), e.pipe(te, g("jmag", "t"), "return", Tt, { via: Ot }), te = g("jmag", "b"), Ot = []);
    }
    H.retSrcX !== void 0 && H.retSrcX !== N && (Ot = [...Ot, [N, H.retJogY ?? R - 1], [H.retSrcX, H.retJogY ?? R - 1]]), e.pipe(te, M, "return", Tt, { via: Ot });
  }, ot = (M, z, N, R, W) => {
    const V = { c: "tap", s: "flowing" }, P = { c: "circ", s: "running" }, H = R + N;
    if (e.add("tap", "tap", c("wz.shower"), R - 6, E - 9, { props: { variant: "shower" } }), e.add("inlet", "water_inlet", c("type.water_inlet"), W, z + 9, { flip: !0 }), e.pipe(g("inlet", "out"), g("dhw", "cold"), "dhw_cold", [V]), !r.circulation) {
      e.pipe(g("dhw", "hot"), g("tap", "hot"), "dhw_hot", [V], { via: [[R, z + 1], [R, E - 8]] });
      return;
    }
    e.add("jww", "junction", "", R, E - 7), e.pipe(g("dhw", "hot"), g("jww", "b"), "dhw_hot", [], { via: [[R, z + 1]], flowAny: [V, P] }), e.pipe(g("jww", "t"), g("tap", "hot"), "dhw_hot", [V], { via: [[R, E - 8]] }), e.add("circ", "pump", "PW2", H - 1, z + 2, { rot: 90, props: { role: "circulation" } }), e.pipe(g("jww", "r"), g("circ", "in"), "circulation", [P], { via: [[H, E - 7]] }), e.pipe(g("circ", "out"), g("dhw", "circ"), "circulation", [P], { via: [[H, z + 6]] });
  };
  if (v) {
    const M = K, z = (R) => q(R).x;
    U ? (e.pipe(g("ou", "out"), g("iu", "src_in"), "supply", [p], { via: [[it + 10, O + 6], [it + 10, D], [z("src_in"), D]] }), e.pipe(g("iu", "src_out"), g("ou", "in"), "return", [p], { via: [[z("src_out"), D + 1], [it + 11, D + 1], [it + 11, O + 5]] })) : lt ? (e.pipe(g("iu", "src_out"), g("ou", "in"), "return", [p], { via: [[z("src_out"), D], [X - 3, D], [X - 3, O + 5]] }), e.pipe(g("ou", "out"), g("iu", "src_in"), "supply", [p], { via: [[X - 2, O + 6], [X - 2, D + 1], [z("src_in"), D + 1]] })) : (e.pipe(g("iu", "src_out"), g("ou", "in"), "return", [p], { via: [[z("src_out"), D], [X - 2, D], [X - 2, O + 5]] }), e.pipe(g("ou", "out"), g("iu", "src_in"), "supply", [p], { via: [[X - 3, O + 6], [X - 3, D + 1], [z("src_in"), D + 1]] }));
    const N = E + 6;
    if (i === "tp70") {
      const R = { c: "iu", s: "pc1" };
      I(g("iu", "ret"), g("iu", "sup"), z("ret"), M, [R], !1, !1, { supSrcX: z("sup"), chainY: N, mag: !1 });
      const W = L + 20, V = T - 11;
      e.add("dhw", "dhw_tank", r.dhwLabel || c("type.dhw_tank"), W, V, { flip: !0, props: { volume: r.dhwVolume } }), e.pipe(g("iu", "dhw_sup"), g("dhw", "coil_in"), "supply", [p, m], { via: [[z("dhw_sup"), M - 2], [W - 1, M - 2], [W - 1, V + 4]] }), e.pipe(g("dhw", "coil_out"), g("iu", "dhw_ret"), "return", [p, m], { via: [[W - 2, V + 9], [W - 2, M - 1], [z("dhw_ret"), M - 1]] }), ot(W, V, 1, W + 8, W + 10);
    } else if (i === "t180") {
      const R = { c: "tap", s: "flowing" }, W = { c: "circ", s: "running" }, V = { c: "iu", s: "pc1" };
      if (d) {
        const H = L - 20, pt = T - 9, F = M - 6, Z = M - 4, et = [p, ...h];
        e.add("buf", "buffer", r.bufferLabel || c("type.buffer"), H, pt, { flip: !0, props: { volume: r.bufferVolume } }), e.pipe(g("iu", "sup"), g("buf", "in_sup"), "supply", et, { via: [[z("sup"), F], [H + 4, F]] });
        let xt = g("buf", "in_ret"), ft = [[H + 3, Z]], vt = H + 5;
        r.separator && (e.add("sep", "separator", c("wz.separator_short"), vt, Z - 1), e.add("sc1", "separator", "SC1", vt + 3, Z - 1, { props: { filter: !0 } }), e.pipe(xt, g("sep", "in"), "return", et, { via: ft }), e.pipe(g("sep", "out"), g("sc1", "in"), "return", et), xt = g("sc1", "out"), ft = [], vt += 7), r.expansion && (e.add("jmag", "junction", "", vt + 1, Z), e.add("mag", "expansion_vessel", "MAG", vt, Z, { rot: 180 }), e.pipe(g("mag", "conn"), g("jmag", "b"), "return", []), e.pipe(xt, g("jmag", "l"), "return", et, { via: ft }), xt = g("jmag", "r"), ft = []), e.pipe(xt, g("iu", "ret"), "return", et, { via: [...ft, [z("ret"), Z]] }), I(g("buf", "out_ret"), g("buf", "out_sup"), H + 2, pt, [u], !0, !1, { supSrcX: H + 1 });
      } else
        I(g("iu", "ret"), g("iu", "sup"), z("ret") - 3, M, [V], !1, !0, {
          supSrcX: z("sup"),
          jogY: M - 2,
          retSrcX: z("ret"),
          retJogY: M - 1
        });
      const P = z("dhw_hot");
      e.add("tap", "tap", c("wz.shower"), P + 2, E - 9, { flip: !0, props: { variant: "shower" } }), r.circulation ? (e.add("jww", "junction", "", P, E - 5), e.pipe(g("iu", "dhw_hot"), g("jww", "b"), "dhw_hot", [], { flowAny: [R, W] }), e.pipe(g("jww", "t"), g("tap", "hot"), "dhw_hot", [R], { via: [[P, E - 8]] }), e.add("circ", "pump", "PW2", z("circ") - 1, d ? E + 1 : M - 8, { rot: 90, props: { role: "circulation" } }), e.pipe(g("jww", "l"), g("circ", "in"), "circulation", [W], { via: [[z("circ"), E - 5]] }), e.pipe(g("circ", "out"), g("iu", "circ"), "circulation", [W])) : e.pipe(g("iu", "dhw_hot"), g("tap", "hot"), "dhw_hot", [R], { via: [[P, E - 8]] }), e.add("inlet", "water_inlet", c("type.water_inlet"), X - 4, M - 5, { flip: !0 }), e.pipe(g("inlet", "out"), g("iu", "dhw_cold"), "dhw_cold", [R], { via: [[z("dhw_cold"), M - 4]] });
    } else {
      const R = [p, ...h];
      let W = L + 14;
      if (d) {
        const V = L + 17, P = T - 9;
        e.add("buf", "buffer", r.bufferLabel || c("type.buffer"), V, P, { props: { volume: r.bufferVolume } }), e.pipe(g("iu", "sup"), g("buf", "in_sup"), "supply", R, { via: [[z("sup"), M - 1], [V + 1, M - 1]] }), e.pipe(g("buf", "in_ret"), g("iu", "ret"), "return", R, { via: [[V + 2, M - 2], [z("ret"), M - 2]] }), I(g("buf", "out_ret"), g("buf", "out_sup"), V + 3, P, [u], !0, !0, { chainY: N, pumpY: E + 2 }), W = V + 16;
      } else
        I(g("iu", "ret"), g("iu", "sup"), z("ret"), M + 1, R, !1, !0, { supSrcX: z("sup"), chainY: N, mag: !1 }), W = L + 20;
      if (a) {
        const V = W, P = T - 11;
        e.add("dhw", "dhw_tank", r.dhwLabel || c("type.dhw_tank"), V, P, { flip: !0, props: { volume: r.dhwVolume } }), e.pipe(g("iu", "dhw_sup"), g("dhw", "coil_in"), "supply", [p, m], { via: [[z("dhw_sup"), M - 4], [V - 1, M - 4], [V - 1, P + 4]] }), e.pipe(g("dhw", "coil_out"), g("iu", "dhw_ret"), "return", [p, m], { via: [[V - 2, P + 9], [V - 2, M - 3], [z("dhw_ret"), M - 3]] }), ot(V, P, 1, V + 8, V + 10);
      }
    }
  } else if (C) {
    const M = K + 14, z = (H) => q(H).x;
    if (e.pipe(g("iu", "src_out"), g("ou", "in"), "return", [p], {
      via: [[z("src_out"), M + 4], [L - 2, M + 4], [L - 2, D], [X - 2, D], [X - 2, O + 5]]
    }), e.pipe(g("ou", "out"), g("iu", "src_in"), "supply", [p], {
      via: [[X - 3, O + 6], [X - 3, D + 1], [L - 3, D + 1], [L - 3, M + 5], [z("src_in"), M + 5]]
    }), a) {
      const H = L - 14, pt = T - 11;
      e.add("dhw", "dhw_tank", r.dhwLabel || c("type.dhw_tank"), H, pt, { props: { volume: r.dhwVolume } }), e.pipe(g("iu", "dhw_sup"), g("dhw", "coil_in"), "supply", [p, m], { via: [[z("dhw_sup"), pt + 4]] }), e.pipe(g("dhw", "coil_out"), g("iu", "dhw_ret"), "return", [p, m], { via: [[z("dhw_ret"), pt + 9]] });
      const F = { c: "tap", s: "flowing" }, Z = { c: "circ", s: "running" }, et = H - 2;
      e.add("tap", "tap", c("wz.shower"), et - 6, E - 9, { props: { variant: "shower" } }), e.add("inlet", "water_inlet", c("type.water_inlet"), X + 1, pt + 9), e.pipe(g("inlet", "out"), g("dhw", "cold"), "dhw_cold", [F]), r.circulation ? (e.add("jww", "junction", "", et, E - 7), e.pipe(g("dhw", "hot"), g("jww", "b"), "dhw_hot", [], { via: [[et, pt + 1]], flowAny: [F, Z] }), e.pipe(g("jww", "t"), g("tap", "hot"), "dhw_hot", [F], { via: [[et, E - 8]] }), e.add("circ", "pump", "PW2", et - 2, pt + 2, { rot: 90, props: { role: "circulation" } }), e.pipe(g("jww", "l"), g("circ", "in"), "circulation", [Z], { via: [[et - 1, E - 7]] }), e.pipe(g("circ", "out"), g("dhw", "circ"), "circulation", [Z], { via: [[et - 1, pt + 6]] })) : e.pipe(g("dhw", "hot"), g("tap", "hot"), "dhw_hot", [F], { via: [[et, pt + 1], [et, E - 8]] });
    }
    const N = L + 27, R = T - 9, W = M + 5, V = [p, ...h];
    e.add("buf", "buffer", r.bufferLabel || c("type.buffer"), N, R, { props: { volume: r.bufferVolume } }), e.pipe(g("iu", "sup"), g("buf", "in_sup"), "supply", V, { via: [[z("sup"), M + 3], [N + 1, M + 3]] });
    const P = [];
    r.separator && (e.add("sep", "separator", c("wz.separator_short"), z("sup") + 10, W - 1, { rot: 180 }), P.push({ inP: g("sep", "in"), outP: g("sep", "out") })), r.expansion && (e.add("jmag", "junction", "", z("sup") + 6, W), e.add("mag", "expansion_vessel", "MAG", z("sup") + 5, W + 1, { rot: 180 }), e.pipe(g("mag", "conn"), g("jmag", "b"), "return", []), P.push({ inP: g("jmag", "r"), outP: g("jmag", "l") })), r.separator && (e.add("sc1", "separator", "SC1", z("sup") + 2, W - 1, { rot: 180, props: { filter: !0 } }), P.push({ inP: g("sc1", "in"), outP: g("sc1", "out") }));
    for (let H = 0; H < P.length - 1; H++) e.pipe(P[H].outP, P[H + 1].inP, "return", V);
    P.length ? (e.pipe(P[P.length - 1].outP, g("iu", "ret"), "return", V, { via: [[z("ret"), W]] }), e.pipe(g("buf", "in_ret"), P[0].inP, "return", V, { via: [[N + 2, W]] })) : e.pipe(g("buf", "in_ret"), g("iu", "ret"), "return", V, { via: [[N + 2, W], [z("ret"), W]] }), I(g("buf", "out_ret"), g("buf", "out_sup"), N + 3, R, [u], !0);
  } else if (x) {
    const M = K, z = (Z) => q(Z).x, N = { c: "iu", s: "pc1" };
    e.pipe(g("iu", "src_out"), g("ou", "in"), "return", [p], { via: [[z("src_out"), O + 5]] }), e.pipe(g("ou", "out"), g("iu", "src_in"), "supply", [p], { via: [[z("src_in"), O + 6]] });
    const R = r.circuits[0] ?? { emitter: "radiators", label: "" }, W = 2, V = M - 8, P = M - 4;
    e.add("hc1", R.emitter, R.label || c("wz.circuit", { n: 1 }), W, V - 1, { flip: !0, props: { circuit: 1 } }), e.pipe(g("iu", "sup"), g("hc1", "sup"), "supply", [N], { via: [[z("sup"), V]] });
    let H = g("hc1", "ret"), pt = [], F = W + 9;
    if (r.separator && (e.add("sep", "separator", c("wz.separator_short"), F, P - 1), e.add("sc1", "separator", "SC1", F + 3, P - 1, { props: { filter: !0 } }), e.pipe(H, g("sep", "in"), "return", [N]), e.pipe(g("sep", "out"), g("sc1", "in"), "return", [N]), H = g("sc1", "out"), F += 7), r.expansion && (e.add("jmag", "junction", "", F + 1, P), e.add("mag", "expansion_vessel", "MAG", F, P, { rot: 180 }), e.pipe(g("mag", "conn"), g("jmag", "b"), "return", []), e.pipe(H, g("jmag", "l"), "return", [N]), H = g("jmag", "r")), e.pipe(H, g("iu", "ret"), "return", [N], { via: [...pt, [z("ret"), P]] }), a) {
      const Z = L + 22, et = M + 2;
      e.add("dhw", "dhw_tank", r.dhwLabel || c("type.dhw_tank"), Z, et, { props: { volume: r.dhwVolume } }), e.pipe(g("iu", "dhw_sup"), g("dhw", "coil_in"), "supply", [p, m], { via: [[z("dhw_sup"), M - 3], [Z + 9, M - 3], [Z + 9, et + 4]] }), e.pipe(g("dhw", "coil_out"), g("iu", "dhw_ret"), "return", [p, m], { via: [[Z + 8, et + 9], [Z + 8, M - 2], [z("dhw_ret"), M - 2]] }), we(e, r, g("dhw", "hot"), g("dhw", "circ"), g("dhw", "cold"), Z, et);
    }
  } else if (w) {
    const M = K, z = (F) => q(F).x, N = Math.max(...["src_in", "src_out", "sup", "ret", "dhw_sup", "dhw_ret", "dhw_hot", "dhw_cold", "circ"].filter((F) => yt(j, F)).map(z));
    e.pipe(g("ou", "out"), g("iu", "src_in"), "supply", [p], { via: [[12, ct.y], [12, M - 9], [z("src_in"), M - 9]] }), e.pipe(g("iu", "src_out"), g("ou", "in"), "return", [p], { via: [[z("src_out"), M - 10], [11, M - 10]] });
    let R = g("iu", "sup"), W = g("iu", "ret"), V = o ? [u] : [p, ...h], P = [[z("sup"), M - 2]];
    const H = M - 4;
    let pt = N + 14;
    if (d) {
      const F = N + 2, Z = F + 10, et = M + 4;
      e.add("buf", "buffer", r.bufferLabel || c("type.buffer"), Z, et, { props: { volume: r.bufferVolume } }), e.pipe(g("iu", "sup"), g("buf", "in_sup"), "supply", [p, ...h], { via: [[z("sup"), M - 2], [Z + 1, M - 2]] });
      const xt = [p, ...h];
      let ft = g("buf", "in_ret"), vt = [[Z + 2, H]];
      r.separator && (e.add("sep", "separator", c("wz.separator_short"), F + 6, H - 1, { rot: 180 }), e.add("sc1", "separator", "SC1", F + 3, H - 1, { rot: 180, props: { filter: !0 } }), e.pipe(ft, g("sep", "in"), "return", xt, { via: vt }), e.pipe(g("sep", "out"), g("sc1", "in"), "return", xt), ft = g("sc1", "out"), vt = []), r.expansion && (e.add("jmag", "junction", "", F, H), e.add("mag", "expansion_vessel", "MAG", F - 1, H - 5), e.pipe(g("mag", "conn"), g("jmag", "t"), "return", []), e.pipe(ft, g("jmag", "r"), "return", xt, { via: vt }), ft = g("jmag", "l"), vt = []), e.pipe(ft, g("iu", "ret"), "return", xt, { via: [...vt, [z("ret"), H]] }), R = g("buf", "out_sup"), W = g("buf", "out_ret"), V = [u], P = [], pt = Z + 7;
    }
    if (as(e, r, R, W, V, P, d || o, pt, M + 4), n)
      we(e, r, g("iu", "dhw_hot"), g("iu", "circ"), g("iu", "dhw_cold"), L - 1, M + 18);
    else if (a) {
      const F = L - 9, Z = M + 8;
      e.add("dhw", "dhw_tank", r.dhwLabel || c("type.dhw_tank"), F, Z, { props: { volume: r.dhwVolume } }), e.pipe(g("iu", "dhw_sup"), g("dhw", "coil_in"), "supply", [p, m], { via: [[z("dhw_sup"), M - 1], [F + 8, M - 1], [F + 8, Z + 4]] }), e.pipe(g("dhw", "coil_out"), g("iu", "dhw_ret"), "return", [p, m], { via: [[F + 7, Z + 9], [F + 7, M - 3], [z("dhw_ret"), M - 3]] }), we(e, r, g("dhw", "hot"), g("dhw", "circ"), g("dhw", "cold"), F, Z);
    }
  } else {
    const M = K + 14, z = (P) => q(P).x;
    e.pipe(g("iu", "src_out"), g("ou", "in"), "return", [p], { via: [[z("src_out"), M + 1]] }), e.pipe(g("ou", "out"), g("iu", "src_in"), "supply", [p], { via: [[z("src_in"), M + 2]] });
    const N = M + 6, R = [p, ...h], W = [];
    r.separator && (e.add("sep", "separator", c("wz.separator_short"), z("sup") + 9, N - 1, { rot: 180 }), W.push({ inP: g("sep", "in"), outP: g("sep", "out") })), r.expansion && (e.add("jmag", "junction", "", z("sup") + 6, N), e.add("mag", "expansion_vessel", "MAG", z("sup") + 5, N + 1, { rot: 180 }), e.pipe(g("mag", "conn"), g("jmag", "b"), "return", []), W.push({ inP: g("jmag", "r"), outP: g("jmag", "l") })), r.separator && (e.add("sc1", "separator", "SC1", z("sup") + 1, N - 1, { rot: 180, props: { filter: !0 } }), W.push({ inP: g("sc1", "in"), outP: g("sc1", "out") }));
    for (let P = 0; P < W.length - 1; P++) e.pipe(W[P].outP, W[P + 1].inP, "return", R);
    let V = g("iu", "ret");
    if (W.length && (e.pipe(W[W.length - 1].outP, g("iu", "ret"), "return", R, { via: [[z("ret"), N]] }), V = W[0].inP), d) {
      const P = L + 22, H = M + 8;
      e.add("buf", "buffer", r.bufferLabel || c("type.buffer"), P, H, { props: { volume: r.bufferVolume } }), e.pipe(g("iu", "sup"), g("buf", "in_sup"), "supply", [p, ...h], { via: [[z("sup"), M + 2], [P + 1, M + 2]] }), e.pipe(g("buf", "in_ret"), V, "return", [p, ...h], { via: [[P + 2, N]] }), as(e, r, g("buf", "out_sup"), g("buf", "out_ret"), [u], [], !0, P + 8, H + 1);
    } else {
      const P = L + 25;
      as(e, r, g("iu", "sup"), V, [p, ...h], [[z("sup"), M + 2], [P - 2, M + 2]], !1, P, M + 8, N);
    }
    if (a) {
      const P = z("dhw_sup") - 8, H = M + 6;
      e.add("dhw", "dhw_tank", r.dhwLabel || c("type.dhw_tank"), P, H, { props: { volume: r.dhwVolume } }), e.pipe(g("iu", "dhw_sup"), g("dhw", "coil_in"), "supply", [p, m], { via: [[z("dhw_sup"), H + 4]] }), e.pipe(g("dhw", "coil_out"), g("iu", "dhw_ret"), "return", [p, m], { via: [[z("dhw_ret"), H + 9]] }), we(e, r, g("dhw", "hot"), g("dhw", "circ"), g("dhw", "cold"), P, H);
    }
  }
  const dt = Math.max(1, r.circuits.length), wt = {
    version: 5,
    name: r.name,
    grid: v ? { w: U ? it + 15 : i === "tp70" ? 70 : d ? 82 : 68, h: T + J + 2 } : C ? { w: 80, h: T + J + 2 } : x ? { w: 58, h: 49 } : { w: dt > 1 ? 76 : 66, h: Math.max(38, (w ? 46 : 38) + (dt - 1) * 10) },
    components: e.components,
    pipes: e.pipes,
    settings: t?.settings ?? { style: "flat", demo: !0 }
  };
  if (wt.settings = { ...wt.settings, wizard: r, layout_edited: !1, building: C || v ? { show: !0, floor: T + J, wall: X, slab: E, ground: E + 2, outside: U ? "right" : "left" } : void 0 }, t) {
    const M = new Map(t.components.map((W) => [W.id, W]));
    for (const W of wt.components) {
      const V = M.get(W.id);
      V && V.type === W.type && (W.bindings = { ...V.bindings }, V.icon && (W.icon = V.icon), V.show && (W.show = V.show));
    }
    const z = wt.components.find((W) => W.id === "iu"), N = M.get("pc0"), R = M.get("vw1");
    z && N?.bindings.running && (z.bindings.pc0_running ??= N.bindings.running), z && N?.bindings.speed && (z.bindings.pc0_speed ??= N.bindings.speed), z && R?.bindings.position && (z.bindings.vw1_position ??= R.bindings.position);
  }
  return wt;
}
function as(r, t, e, s, i, n, o, a, l, d) {
  Math.max(1, t.circuits.length);
  const p = [], h = { ...e };
  t.circuits.slice(0, 4).forEach((m, u) => {
    const _ = u + 1, w = l - 9 + u * 10, b = _ === 1 ? "pc1" : `hc${_}_pump`, v = `hc${_}_mix`, x = `hc${_}`;
    let k = a, C = null, T = null, E = i;
    (o || m.mixed) && (r.add(b, "pump", _ === 1 ? "PC1" : `PC${_}`, k, w, { props: { role: m.mixed ? "hc" : "secondary", circuit: _ } }), C = g(b, "in"), T = g(b, "out"), E = [{ c: b, s: "running" }], p.push(E[0]), k += 4), m.mixed && (r.add(v, "mixer", `VC${_}`, k, w, { props: { circuit: _ } }), T ? r.pipe(T, g(v, "in"), "supply", E) : C = g(v, "in"), T = g(v, "out"), k += 3);
    const D = k + 3;
    r.add(x, m.emitter, m.label || c("wz.circuit", { n: _ }), D, w - 2, { props: { circuit: _ } }), T ? r.pipe(T, g(x, "sup"), "supply", E, { via: [[D - 2, w + 1], [D - 2, w - 1]] }) : C = g(x, "sup"), r.pipe(h, C, "supply", E, u === 0 ? { via: [...n, [a - 1 - u, w + 1]] } : { via: [[a - 1 - u, w + 1]] }), m.mixed ? (r.add(`hc${_}_jm`, "junction", "", k - 2, w + 3), r.pipe(g(x, "ret"), g(`hc${_}_jm`, "r"), "return", E, { via: [[k - 2, w + 3]] }), r.pipe(g(`hc${_}_jm`, "t"), g(v, "ret"), "return", E), r.pipe(g(`hc${_}_jm`, "l"), s, "return", E, { via: [[a - 2 - u, w + 3], ...d ? [[a - 2 - u, d]] : []] })) : r.pipe(g(x, "ret"), s, "return", E, { via: [[a - 2 - u, w + 3], ...d ? [[a - 2 - u, d]] : []] });
  });
}
function we(r, t, e, s, i, n, o) {
  const a = { c: "tap", s: "flowing" }, l = { c: "circ", s: "running" };
  if (r.add("tap", "tap", c("type.tap"), n - 9, o), r.add("inlet", "water_inlet", c("type.water_inlet"), n - 9, o + 9), r.pipe(g("inlet", "out"), i, "dhw_cold", [a]), !t.circulation) {
    r.pipe(e, g("tap", "hot"), "dhw_hot", [a]);
    return;
  }
  r.add("jww", "junction", "", n - 3, o + 1), r.pipe(e, g("jww", "r"), "dhw_hot", [], { flowAny: [a, l] }), r.pipe(g("jww", "l"), g("tap", "hot"), "dhw_hot", [a]), r.add("circ", "pump", "PW2", n - 4, o + 3, { rot: 90, props: { role: "circulation" } }), r.pipe(g("jww", "b"), g("circ", "in"), "circulation", [l]), r.pipe(g("circ", "out"), s, "circulation", [l]);
}
function ys() {
  const r = typeof location < "u" ? new URLSearchParams(location.search).get("indoor") : null, t = bs();
  r && Jt(r) && (t.indoorModel = r, t.indoorLabel = Jt(r).label.replace(/^Logatherm /, "").split(" – ")[0]);
  const e = typeof location < "u" ? new URLSearchParams(location.search) : null;
  e?.get("buffer") === "none" && (t.buffer = "none"), e?.get("outdoor") && (t.outdoorModel = e.get("outdoor"));
  const s = ts(t);
  return typeof location < "u" && new URLSearchParams(location.search).get("style") === "iso" && (s.settings.style = "iso"), s;
}
const xo = 4;
class vn {
  /**
   * @param saveExample store the example plant when none exists yet (panel only;
   *   a card must never write configuration on its own)
   */
  constructor(t, e = !0) {
    this.host = t, this.saveExample = e, this.plant = null, this.icons = /* @__PURE__ */ new Map(), this.backendMessages = [], this.simMessages = [], this.sim = null, this.version = 0, this.error = "", this.admin = !0, this.backendVersion = "", this.rev = void 0, this._raf = 0, this._lastFrame = 0, this._accum = 0, this._boundIds = [], this._lastStates = [], this._loading = !1, this._connected = !1, t.addController(this);
  }
  _changed() {
    this.host.requestUpdate();
  }
  // ------------------------------------------------------------ lifecycle
  hostConnected() {
    this._connected = !0, this.hass && !this.api && this._init(), this.plant?.settings.demo && !this.sim && this._startSim();
  }
  hostDisconnected() {
    this._connected = !1, this._stopSim(), this._unsubMsg?.(), this._unsubMsg = void 0, this._unsubCfg?.(), this._unsubCfg = void 0, this.api = void 0;
  }
  setHass(t) {
    this.hass = t;
    const e = t.themes?.darkMode ?? !0;
    this.host.toggleAttribute("light", !e), gi(wi(this.plant?.settings.language, t.language)), this.api ? this.api.setHass(t) : this._connected && this._init(), this.plant && !this.plant.settings.demo && this._checkStates();
  }
  _init() {
    this.api = new Jn(this.hass), this._load();
  }
  // ----------------------------------------------------------------- data
  get messages() {
    return this.sim ? this.simMessages : this.backendMessages;
  }
  get src() {
    return this.sim ? new wn(this.sim, this.hass) : new fn(this.hass);
  }
  /** Re-render on hass updates only when a bound entity actually changed. */
  _checkStates() {
    if (!this.hass) return;
    const t = this._boundIds.map((e) => this.hass.states[e]);
    (t.length !== this._lastStates.length || t.some((e, s) => e !== this._lastStates[s])) && (this._lastStates = t, this.version++, this._changed());
  }
  _collectBound() {
    const t = /* @__PURE__ */ new Set();
    for (const s of this.plant?.components || [])
      Object.values(s.bindings || {}).forEach((i) => i && t.add(i)), (s.props.entries || []).forEach((i) => i.entity && t.add(i.entity));
    for (const s of this.plant?.pipes || []) s.bindings?.temp && t.add(s.bindings.temp);
    const e = this.plant?.settings.energy;
    if (e?.enabled)
      for (const s of ["pv", "grid", "battery", "battery_soc", "house", "wallbox"]) e[s] && t.add(e[s]);
    this._boundIds = [...t], this._lastStates = [];
  }
  async _load() {
    if (!(this._loading || !this.api)) {
      this._loading = !0;
      try {
        const t = await this.api.getConfig();
        this.admin = t.is_admin, this.backendVersion = t.version, this.rev = t.rev;
        let e = t.plant, s = !1;
        if (e ? (e.version ?? 1) < 5 && e.settings?.wizard && !e.settings.layout_edited && (e = ts(e.settings.wizard, e), s = !0) : (e = ys(), s = !0), s && t.is_admin && this.saveExample)
          try {
            await this.save(e);
          } catch (i) {
            if (!vs(i)) throw i;
          }
        else
          this.setPlant(e, t.rev);
        await this.loadIcons(), this.api.standalone || (this._unsubCfg = await this.api.subscribeConfig((i, n) => this._onRemote(i, n)), this.backendMessages = await this.api.listMessages(), this._unsubMsg = await this.api.subscribeMessages((i) => this._mergeMessage(i)));
      } catch (t) {
        this.error = t?.message || String(t);
      } finally {
        this._loading = !1, this._changed();
      }
    }
  }
  async loadIcons() {
    const t = await this.api.listIcons();
    this.icons = new Map(t.map((e) => [e.id, e])), this._changed();
  }
  _mergeMessage(t) {
    const e = this.backendMessages.findIndex((i) => i.id === t.id), s = [...this.backendMessages];
    e >= 0 ? s[e] = t : s.push(t), this.backendMessages = s, this._changed();
  }
  /** A save from any window (or the current state after (re)subscribing). */
  _onRemote(t, e) {
    !t || this.rev !== void 0 && e <= this.rev || this._pending !== void 0 && JSON.stringify(t) === this._pending || this.setPlant(t, e);
  }
  setPlant(t, e) {
    e !== void 0 && (this.rev = e);
    const s = JSON.stringify(rs(this.plant));
    this.plant = t, gi(wi(t.settings.language, this.hass?.language)), this._collectBound(), t.settings.demo ? (!this.sim || JSON.stringify(rs(t)) !== s) && this._startSim() : (this._stopSim(), this._checkStates()), this.version++, this._changed();
  }
  /**
   * Save the plant. `rev` is the revision the change is based on (default: the one shown). When
   * another window saved in between, the newest plant is loaded and the conflict error rethrown.
   */
  async save(t, e = this.rev) {
    const s = this.api;
    this._pending = JSON.stringify(t);
    try {
      this.setPlant(t, await s.saveConfig(t, e));
    } catch (i) {
      throw vs(i) && await this.reload(), i;
    } finally {
      this._pending = void 0;
    }
  }
  /** Fetch the stored plant again (after a conflict). */
  async reload() {
    const t = await this.api.getConfig();
    t.plant && this.setPlant(t.plant, t.rev);
  }
  async clearMessages() {
    await this.api.clearMessages(), this.backendMessages = await this.api.listMessages(), this._changed();
  }
  // ------------------------------------------------------------------ sim
  _startSim() {
    this._stopSim();
    const t = this.plant?.components.find((i) => i.type === "dhw_tank"), e = new vo(rs(this.plant), void 0, { dhw: t?.label || c("type.dhw_tank") });
    this.sim = e, this._unsubSim = e.onMessage(() => {
      this.simMessages = [...e.messages], this._changed();
    }), this.simMessages = [...e.messages], this._lastFrame = performance.now();
    const s = (i) => {
      const n = (i - this._lastFrame) / 1e3;
      this._lastFrame = i, document.hidden || (e.advance(n), this._accum += n, this._accum >= 1 / xo && (this._accum = 0, this.version++, this._changed())), this._raf = requestAnimationFrame(s);
    };
    this._raf = requestAnimationFrame(s);
  }
  _stopSim() {
    this._raf && cancelAnimationFrame(this._raf), this._raf = 0, this._unsubSim?.(), this._unsubSim = void 0, this.sim && (this.sim = null, this.simMessages = [], this.api && !this.api.standalone && this.api.listMessages().then(
      (t) => {
        this.backendMessages = t, this._changed();
      },
      () => {
      }
    ));
  }
  scenario(t) {
    const e = this.sim;
    if (e) {
      switch (t) {
        case "winter":
          e.outdoorMean = -10, e.tOut = -10;
          break;
        case "transition":
          e.outdoorMean = 12, e.tOut = 12;
          break;
        case "shower":
          e.startDraw(8, 9);
          break;
        case "defrost":
          e.ice = 1.01, e.heatDemand = !0;
          break;
        case "dim14a":
          e.dim14a = !e.dim14a;
          break;
        case "pv":
          e.pv = !e.pv;
          break;
        case "disinfect":
          e.disinfect = !0;
          break;
        case "fault":
          e.fault = !e.fault;
          break;
        case "reset":
          this._startSim();
          return;
      }
      e.scenarioMessage(c(`scn.${t}`)), this.version++, this._changed();
    }
  }
}
const bn = rt`
  :host {
    --cp-font: "Inter", "Segoe UI", Roboto, system-ui, -apple-system, sans-serif;
    --cp-radius: 14px;
    --cp-accent: #3ddc97;
    --cp-accent-2: #38d0ff;
    --cp-warn: #f5b942;
    --cp-error: #ff5a5f;
    --cp-info: #4d9fff;
    --cp-notice: #b07cff;
    --cp-select: #ffd166;

    --cp-bg: #0b1016;
    --cp-bg-2: #111821;
    --cp-surface: #151d27;
    --cp-surface-2: #1b2531;
    --cp-border: rgba(255, 255, 255, 0.08);
    --cp-text: #e8eef5;
    --cp-muted: #8a97a6;
    --cp-grid: rgba(255, 255, 255, 0.09);
    --cp-flow: rgba(255, 255, 255, 0.92);
    --cp-pipe-outline: rgba(0, 0, 0, 0.55);
    --cp-casing: #232d3a;
    --cp-iso-top: #3a475a;
    --cp-bld-outside: rgba(108, 196, 255, 0.04);
    --cp-bld-ground: rgba(140, 110, 80, 0.12);
    --cp-bld-wall: #222c38;
    --cp-bld-line: #3b4757;
    --cp-iso-side: #141b24;
    --cp-iso-floor: rgba(255, 255, 255, 0.05);
    --cp-casing-light: #2c3747;
    --cp-casing-stroke: #3d4a5c;
    --cp-sheen: rgba(255, 255, 255, 0.04);
    --cp-grille: #4a586b;
    --cp-grille-bg: #161d26;
    --cp-fan: #6b7a8f;
    --cp-screen: #0f2a22;
    --cp-insulation: #1a222c;
    --cp-ground: #3b2f25;
    --cp-chip: rgba(21, 29, 39, 0.88);
    --cp-chip-hover: rgba(35, 47, 62, 0.95);
    --cp-chip-stroke: rgba(255, 255, 255, 0.09);
    --cp-port: #8a97a6;
    color-scheme: dark;
  }
  :host([light]) {
    --cp-bg: #eef2f6;
    --cp-bg-2: #e6ebf1;
    --cp-surface: #ffffff;
    --cp-surface-2: #f4f7fa;
    --cp-border: rgba(15, 23, 42, 0.1);
    --cp-text: #142030;
    --cp-muted: #5c6b7c;
    --cp-grid: rgba(15, 23, 42, 0.1);
    --cp-flow: rgba(255, 255, 255, 0.95);
    --cp-pipe-outline: rgba(15, 23, 42, 0.18);
    --cp-casing: #f7f9fb;
    --cp-iso-top: #ffffff;
    --cp-bld-outside: rgba(77, 159, 255, 0.06);
    --cp-bld-ground: rgba(140, 110, 80, 0.14);
    --cp-bld-wall: #dfe5ec;
    --cp-bld-line: #b6c0cc;
    --cp-iso-side: #b4bfcc;
    --cp-iso-floor: rgba(15, 23, 42, 0.07);
    --cp-casing-light: #ffffff;
    --cp-casing-stroke: #b9c4d0;
    --cp-sheen: rgba(255, 255, 255, 0.6);
    --cp-grille: #a9b5c2;
    --cp-grille-bg: #e3e9ef;
    --cp-fan: #8796a8;
    --cp-screen: #12352b;
    --cp-insulation: #dfe5ec;
    --cp-ground: #cbb59c;
    --cp-chip: rgba(255, 255, 255, 0.94);
    --cp-chip-hover: #ffffff;
    --cp-chip-stroke: rgba(15, 23, 42, 0.12);
    --cp-port: #5c6b7c;
    --cp-accent: #12b076;
    --cp-select: #e0a100;
    color-scheme: light;
  }
`, _t = rt`
  * {
    box-sizing: border-box;
  }
  :host {
    font-family: var(--cp-font);
    color: var(--cp-text);
  }
  button,
  .btn {
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    color: var(--cp-text);
    background: var(--cp-surface-2);
    border: 1px solid var(--cp-border);
    border-radius: 10px;
    padding: 7px 12px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: background 0.15s, border-color 0.15s;
    white-space: nowrap;
  }
  button:hover {
    border-color: color-mix(in srgb, var(--cp-accent) 50%, transparent);
  }
  button.primary {
    background: var(--cp-accent);
    border-color: var(--cp-accent);
    color: #04140d;
  }
  button.danger {
    color: var(--cp-error);
  }
  button.ghost {
    background: transparent;
    border-color: transparent;
  }
  button.icon {
    padding: 7px;
  }
  button:disabled {
    opacity: 0.45;
    cursor: default;
  }
  button svg,
  .ico {
    width: 18px;
    height: 18px;
    flex: none;
  }
  input,
  select,
  textarea {
    font: inherit;
    font-size: 14px;
    color: var(--cp-text);
    background: var(--cp-bg-2);
    border: 1px solid var(--cp-border);
    border-radius: 10px;
    padding: 8px 10px;
    width: 100%;
    min-width: 0;
  }
  input[type="checkbox"],
  input[type="radio"] {
    width: auto;
    accent-color: var(--cp-accent);
  }
  input[type="range"] {
    padding: 0;
    accent-color: var(--cp-accent);
  }
  label.field {
    display: grid;
    gap: 5px;
    font-size: 12px;
    color: var(--cp-muted);
    font-weight: 600;
  }
  label.field.check {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  label.field.check input {
    width: auto;
    margin: 0;
  }
  .card {
    background: var(--cp-surface);
    border: 1px solid var(--cp-border);
    border-radius: var(--cp-radius);
    padding: 16px;
  }
  .muted {
    color: var(--cp-muted);
  }
  .row {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .spacer {
    flex: 1;
  }
  h2 {
    font-size: 18px;
    margin: 0 0 6px;
  }
  h3 {
    font-size: 14px;
    margin: 18px 0 8px;
    color: var(--cp-muted);
    text-transform: uppercase;
    letter-spacing: 0.6px;
  }
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 18px;
    height: 18px;
    padding: 0 5px;
    border-radius: 9px;
    font-size: 11px;
    font-weight: 700;
    background: var(--cp-error);
    color: #fff;
  }
  .toast {
    position: fixed;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%);
    background: var(--cp-surface-2);
    border: 1px solid var(--cp-border);
    padding: 10px 16px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    z-index: 20;
    font-size: 13px;
  }
`, $o = {
  menu: "M4 7h16M4 12h16M4 17h16",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  curve: "M3 20h18M3 20V4M5 6c3 9 8 12 15 13",
  bell: "M6 16V11a6 6 0 1 1 12 0v5l2 2H4zM10 20a2 2 0 0 0 4 0",
  gear: "M12 9a3 3 0 1 0 0 6a3 3 0 1 0 0-6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1",
  play: "M8 5l11 7l-11 7z",
  pause: "M8 5v14M16 5v14",
  expand: "M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5",
  fit: "M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M9 9h6v6H9z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  trash: "M5 7h14M10 7V4h4v3M7 7l1 13h8l1-13",
  undo: "M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3",
  redo: "M15 14l5-5l-5-5M20 9H10a6 6 0 0 0 0 12h3",
  save: "M5 4h11l3 3v13H5zM8 4v5h7V4M8 20v-6h8v6",
  rotate: "M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7",
  copy: "M8 8h11v11H8zM5 16V5h11",
  wand: "M4 20L15 9M14 4v3M19 9h-3M17 5l-2 2M18 13l-1 1M10 3l1 2",
  link: "M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1",
  image: "M4 5h16v14H4zM4 16l5-5l4 4l3-3l4 4M15 9h.01",
  close: "M6 6l12 12M18 6L6 18",
  check: "M5 12l5 5l9-10",
  flask: "M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3",
  info: "M12 8h.01M11 12h1v5h1M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18",
  bolt: "M13 2L5 13h6l-1 9l8-11h-6z",
  history: "M3 12a9 9 0 1 0 3-6.7M3 4v4h4M12 7v5l3 2",
  wrench: "M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8l-3-3l8-8l-1.3-1.3a4 4 0 0 1-5-5L13 2l1.7 1.7zM4 20l3-3",
  warn: "M12 3l10 18H2zM12 10v5M12 18h.01",
  error: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM9 9l6 6M15 9l-6 6",
  notice: "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM12 7v6M12 16h.01",
  search: "M11 4a7 7 0 1 0 0 14a7 7 0 1 0 0-14zM20 20l-4-4",
  download: "M12 4v11M7 10l5 5l5-5M5 20h14",
  upload: "M12 20V9M7 14l5-5l5 5M5 4h14"
};
function B(r) {
  return S`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${$o[r] || ""} /></svg>`;
}
const xs = S`<svg viewBox="0 0 32 32" class="logo" aria-hidden="true">
  <defs><linearGradient id="cp-logo" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#38d0ff" /><stop offset="0.55" stop-color="#3ddc97" /><stop offset="1" stop-color="#ffb35c" />
  </linearGradient></defs>
  <rect x="2" y="6.2" width="28" height="19.6" rx="3.6" fill="none" stroke="url(#cp-logo)" stroke-width="2.4" />
  <path d="M16.6 11.2A6.4 6.4 0 1 0 16.6 20.8" fill="none" stroke="url(#cp-logo)" stroke-width="2.4" stroke-linecap="round" />
  <g transform="translate(12 16) scale(0.8)" fill="url(#cp-logo)">
    <path d="M0 0C-0.55-2.2 0.35-5.1 2.9-5.6C4.2-3.8 2.7-1.3 0 0Z" /><path d="M0 0C-0.55-2.2 0.35-5.1 2.9-5.6C4.2-3.8 2.7-1.3 0 0Z" transform="rotate(120)" /><path d="M0 0C-0.55-2.2 0.35-5.1 2.9-5.6C4.2-3.8 2.7-1.3 0 0Z" transform="rotate(240)" /><circle r="1.3" />
  </g>
  <path d="M21.6 11.6H26.4M21.6 14.5H26.4M21.6 17.5H26.4M21.6 20.4H26.4" stroke="url(#cp-logo)" stroke-width="1.7" stroke-linecap="round" />
</svg>`, ko = "M4.2 4.4H19.8A3.2 3.2 0 0 1 23 7.6V16.4A3.2 3.2 0 0 1 19.8 19.6H4.2A3.2 3.2 0 0 1 1 16.4V7.6A3.2 3.2 0 0 1 4.2 4.4ZM4.4 6.2A1.6 1.6 0 0 0 2.8 7.8V16.2A1.6 1.6 0 0 0 4.4 17.8H19.6A1.6 1.6 0 0 0 21.2 16.2V7.8A1.6 1.6 0 0 0 19.6 6.2ZM12.78 7.8A5.65 5.65 0 1 0 12.78 16.2A0.9 0.9 0 0 0 11.58 14.86A3.85 3.85 0 1 1 11.58 9.14A0.9 0.9 0 0 0 12.78 7.8ZM9 12C8.67 10.68 9.21 8.94 10.74 8.64C11.52 9.72 10.62 11.22 9 12ZM9 12C10.31 12.37 11.55 13.71 11.04 15.19C9.71 15.32 8.87 13.79 9 12ZM9 12C8.02 12.95 6.24 13.35 5.22 12.17C5.77 10.96 7.51 10.99 9 12ZM16.75 8.05H19.25A0.65 0.65 0 0 1 19.9 8.7V8.7A0.65 0.65 0 0 1 19.25 9.35H16.75A0.65 0.65 0 0 1 16.1 8.7V8.7A0.65 0.65 0 0 1 16.75 8.05ZM16.75 10.25H19.25A0.65 0.65 0 0 1 19.9 10.9V10.9A0.65 0.65 0 0 1 19.25 11.55H16.75A0.65 0.65 0 0 1 16.1 10.9V10.9A0.65 0.65 0 0 1 16.75 10.25ZM16.75 12.45H19.25A0.65 0.65 0 0 1 19.9 13.1V13.1A0.65 0.65 0 0 1 19.25 13.75H16.75A0.65 0.65 0 0 1 16.1 13.1V13.1A0.65 0.65 0 0 1 16.75 12.45ZM16.75 14.65H19.25A0.65 0.65 0 0 1 19.9 15.3V15.3A0.65 0.65 0 0 1 19.25 15.95H16.75A0.65 0.65 0 0 1 16.1 15.3V15.3A0.65 0.65 0 0 1 16.75 14.65Z", $s = window;
$s.customIcons = $s.customIcons || {};
$s.customIcons.copilot = {
  getIcon: async (r) => r === "logo" ? { path: ko, viewBox: "0 0 24 24" } : void 0,
  getIconList: async () => [{ name: "logo", keywords: ["copilot", "heat pump", "wärmepumpe"] }]
};
window.dispatchEvent(new Event("custom-icons-changed"));
const zi = 86400, ls = 30.44;
function So(r) {
  const t = (d, p = () => !0) => r.components.find((h) => h.type === d && p(h.props || {})), e = [], s = (d, p, h) => e.push({ id: d, key: d, interval_days: p, component: h });
  s("pressure", 91, t("indoor_unit")?.id);
  const i = t("separator", (d) => !!d.filter);
  i && s("filter", 365, i.id);
  const n = t("separator", (d) => !d.filter);
  n && s("separator", 182, n.id);
  const o = t("expansion_vessel");
  o && s("expansion", 365, o.id);
  const a = t("outdoor_unit");
  a && s("outdoor", 182, a.id);
  const l = t("dhw_tank");
  return l && s("anode", 730, l.id), s("service", 365, a?.id), e;
}
function Mo(r, t) {
  if (!r.last_done) return { status: "unknown" };
  const e = r.last_done + r.interval_days * zi, s = Math.round((e - t) / zi);
  return { status: s < 0 ? "due" : s <= 30 ? "soon" : "ok", next: e, days: s };
}
const zo = (r) => new Date(r * 1e3).toLocaleDateString(void 0, { day: "2-digit", month: "2-digit", year: "numeric" }), Ao = (r) => {
  const t = new Date(r * 1e3);
  return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")}`;
}, We = class We extends st {
  constructor() {
    super(...arguments), this.admin = !0, this._newTitle = "", this._newMonths = 12;
  }
  get _tasks() {
    return this.plant.settings.maintenance?.tasks ?? So(this.plant);
  }
  _save(t) {
    const e = structuredClone(this.plant);
    e.settings = { ...e.settings, maintenance: { tasks: t } }, this.dispatchEvent(new CustomEvent("save", { detail: e, bubbles: !0, composed: !0 }));
  }
  _update(t, e) {
    this._save(this._tasks.map((s) => s.id === t ? { ...s, ...e } : s));
  }
  _title(t) {
    return t.title || c(`mt.${t.key}`);
  }
  _done(t) {
    confirm(c("mt.done_confirm", { task: this._title(t) })) && this._update(t.id, { last_done: Math.round(Date.now() / 1e3) });
  }
  _add() {
    const t = this._newTitle.trim();
    if (!t) return;
    const e = `custom_${Date.now().toString(36)}`;
    this._save([...this._tasks, { id: e, title: t, interval_days: Math.round(this._newMonths * ls) }]), this._newTitle = "";
  }
  _remove(t) {
    confirm(c("mt.remove_confirm", { task: this._title(t) })) && this._save(this._tasks.filter((e) => e.id !== t.id));
  }
  render() {
    const t = Date.now() / 1e3, e = { due: 0, soon: 1, unknown: 2, ok: 3 }, s = [...this._tasks].map((o) => ({ task: o, ...Mo(o, t) })).sort((o, a) => e[o.status] - e[a.status] || (o.next ?? 0) - (a.next ?? 0)), i = s.filter((o) => o.status === "due").length, n = s.filter((o) => o.status === "unknown").length;
    return f`<div class="card wrap">
      <div class="row head">
        <h2>${c("mt.title")}</h2>
        ${i ? f`<span class="chip due">${c("mt.n_due", { n: i })}</span>` : y}
        ${n ? f`<span class="chip unknown">${c("mt.n_unknown", { n })}</span>` : y}
        ${!i && !n ? f`<span class="chip ok">${c("mt.all_ok")}</span>` : y}
      </div>
      <p class="muted hint">${c("mt.hint")}</p>
      <ul class="tasks">
        ${s.map(
      ({ task: o, status: a, next: l, days: d }) => f`<li class=${a}>
            <div class="main">
              <div class="t">${this._title(o)}</div>
              ${o.key ? f`<div class="muted small">${c(`mt.${o.key}_how`)}</div>` : y}
              <div class="meta">
                <span class="st ${a}">${a === "unknown" ? c("mt.enter_date") : a === "due" ? c("mt.overdue", { n: -d }) : c("mt.next", { date: zo(l), n: d })}</span>
              </div>
            </div>
            <label class="f">${c("mt.last")}
              <input type="date" .value=${o.last_done ? Ao(o.last_done) : ""} ?disabled=${!this.admin}
                @change=${(p) => {
        const h = p.target.value;
        this._update(o.id, { last_done: h ? Math.round((/* @__PURE__ */ new Date(`${h}T12:00:00`)).getTime() / 1e3) : void 0 });
      }} /></label>
            <label class="f">${c("mt.every")}
              <span class="iv"><input type="number" min="1" max="120" .value=${G(o.interval_days / ls, 0)} ?disabled=${!this.admin}
                @change=${(p) => this._update(o.id, { interval_days: Math.max(1, Math.round(Number(p.target.value) * ls)) })} />
                ${c("mt.months")}</span></label>
            <div class="acts">
              <button class="primary" ?disabled=${!this.admin} @click=${() => this._done(o)}>${B("check")} ${c("mt.done")}</button>
              <button class="ghost icon" title=${c("mt.remove")} ?disabled=${!this.admin} @click=${() => this._remove(o)}>${B("trash")}</button>
            </div>
          </li>`
    )}
      </ul>
      ${this.admin ? f`<div class="row add">
            <input placeholder=${c("mt.new")} .value=${this._newTitle} @input=${(o) => this._newTitle = o.target.value}
              @keydown=${(o) => o.key === "Enter" && this._add()} />
            <span class="iv"><input type="number" min="1" max="120" .value=${String(this._newMonths)}
              @change=${(o) => this._newMonths = Number(o.target.value) || 12} /> ${c("mt.months")}</span>
            <button @click=${this._add} ?disabled=${!this._newTitle.trim()}>${B("plus")} ${c("mt.add")}</button>
          </div>` : y}
    </div>`;
  }
};
We.properties = { plant: { attribute: !1 }, admin: { type: Boolean }, _newTitle: { state: !0 }, _newMonths: { state: !0 } }, We.styles = [
  _t,
  rt`
      .wrap { max-width: 980px; display: grid; gap: 12px; }
      h2 { margin: 0; }
      .head { gap: 12px; align-items: center; }
      .chip { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 999px; }
      .chip.due { background: color-mix(in srgb, var(--cp-warn) 22%, transparent); color: var(--cp-warn); }
      .chip.unknown { background: var(--cp-chip); color: var(--cp-muted); }
      .hint { font-size: 13px; margin: 0; }
      .chip.ok { background: color-mix(in srgb, #3ddc97 18%, transparent); color: #3ddc97; }
      .tasks { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
      .tasks li { display: grid; grid-template-columns: 1fr auto auto auto; gap: 12px; align-items: center; padding: 12px 14px;
        border: 1px solid var(--cp-border); border-left: 4px solid var(--cp-border); border-radius: 12px; }
      .tasks li.due { border-left-color: var(--cp-warn); }
      .tasks li.soon { border-left-color: #f5c542; }
      .tasks li.ok { border-left-color: #3ddc97; }
      .t { font-weight: 700; }
      .small { font-size: 12px; margin-top: 2px; }
      .meta { margin-top: 4px; font-size: 12px; }
      .st.due { color: var(--cp-warn); font-weight: 700; }
      .st.soon { color: #f5c542; font-weight: 700; }
      .st.ok { color: #3ddc97; }
      .st.unknown { color: var(--cp-muted); }
      .f { display: grid; gap: 4px; font-size: 11px; color: var(--cp-muted); font-weight: 600; }
      .f input[type="date"] { width: 150px; }
      .iv { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: var(--cp-muted); }
      .iv input { width: 64px; }
      .acts { display: flex; gap: 6px; }
      .add { gap: 8px; }
      .add > input { flex: 1; min-width: 180px; }
      @media (max-width: 760px) {
        .tasks li { grid-template-columns: 1fr 1fr; }
        .tasks li .main { grid-column: 1 / -1; }
        .acts { grid-column: 1 / -1; justify-content: flex-end; }
      }
    `
];
let ks = We;
customElements.get("cp-maintenance") || customElements.define("cp-maintenance", ks);
function Ai(r, t) {
  let e = 0, s = r.length - 1;
  if (!(s < 0 || r[0].t > t)) {
    for (; e < s; ) {
      const i = e + s + 1 >> 1;
      r[i].t <= t ? e = i : s = i - 1;
    }
    return r[e];
  }
}
function Ei(r, t, e) {
  if (r)
    return r.raw !== void 0 && (r.v === null || !Number.isFinite(r.v)) ? Xs(r.raw, t, e) : r.v === null ? { raw: null, num: null, unit: t, entity: e, available: !1 } : { raw: r.raw ?? r.v, num: r.v, unit: t, entity: e, available: !0 };
}
class Js {
  constructor(t, e, s) {
    this.live = t, this.byEntity = /* @__PURE__ */ new Map(), this.bySlot = /* @__PURE__ */ new Map(), this.from = e, this.to = s, this.t = s;
  }
  /** Load the recorded values of the last `hours` hours. */
  static async load(t, e, s, i, n = []) {
    const o = Date.now() / 1e3, a = new Js(e, o - s * 3600, o);
    if (e instanceof fn && i) {
      const l = new Set(n);
      for (const d of t.components) Object.values(d.bindings || {}).forEach((p) => p && l.add(p));
      for (const d of t.pipes) d.bindings?.temp && l.add(d.bindings.temp);
      if (l.size) {
        const d = await i.callWS({
          type: "history/history_during_period",
          start_time: new Date(a.from * 1e3).toISOString(),
          end_time: new Date(o * 1e3).toISOString(),
          entity_ids: [...l],
          minimal_response: !0,
          no_attributes: !0,
          significant_changes_only: !1
        });
        for (const [p, h] of Object.entries(d)) {
          const m = i.states[p]?.attributes?.unit_of_measurement;
          a.byEntity.set(p, { unit: m, pts: h.map((u) => ({ t: u.lu, v: Number.isFinite(Number(u.s)) ? Number(u.s) : null, raw: String(u.s) })) });
        }
      }
      return a;
    }
    return await Promise.all(
      t.components.flatMap(
        (l) => zt(l).map(async (d) => {
          const p = e.get(l, d.key);
          if (p === void 0) return;
          const h = await e.history(l, d.key, s);
          h.length && a.bySlot.set(`${l.id}.${d.key}`, { pts: h, unit: p.unit });
        })
      )
    ), a;
  }
  /** Earliest recorded time (to limit the slider). */
  get start() {
    let t = this.to;
    for (const e of [this.byEntity, this.bySlot]) for (const s of e.values()) s.pts.length && (t = Math.min(t, s.pts[0].t));
    return Math.max(this.from, t);
  }
  get empty() {
    return this.byEntity.size === 0 && this.bySlot.size === 0;
  }
  entityOf(t, e) {
    return this.live.entityOf(t, e);
  }
  get(t, e) {
    const s = this.live.entityOf(t, e);
    if (s) return this.getEntity(s);
    const i = this.bySlot.get(`${t.id}.${e}`);
    return i ? Ei(Ai(i.pts, this.t), i.unit) : void 0;
  }
  getEntity(t) {
    const e = this.byEntity.get(t);
    return e ? Ei(Ai(e.pts, this.t), e.unit, t) : void 0;
  }
  history(t, e, s) {
    return this.live.history(t, e, s);
  }
}
const Eo = 7, Co = 35, yn = 4.9;
function Ce(r, t, e = "air") {
  const s = t + 273.15 + 3, i = (e === "air" ? r - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, 0.57 * s / Math.max(5, s - i)));
}
function Po(r, t, e = yn, s = "air") {
  return e * Ce(r, t, s) / Ce(Eo, Co, s);
}
function Lo(r) {
  return r >= 0.9 ? "green" : r >= 0.75 ? "yellow" : "red";
}
const Lt = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };
function xn(r, t) {
  const e = r.components.find((_) => _.type === "outdoor_unit"), s = r.components.find((_) => _.type === "indoor_unit");
  if (!e || !s) return;
  const i = (_, w) => {
    const b = t.get(_, w);
    return b?.available && b.num !== null ? b.num : void 0;
  }, n = i(e, "heat_power");
  let o = i(e, "el_power");
  o !== void 0 && t.get(e, "el_power")?.unit === "kW" && (o *= 1e3);
  const a = i(e, "outdoor_temp"), l = i(s, "supply_temp"), d = String(t.get(e, "activity")?.raw ?? "").toLowerCase();
  if (n === void 0 || o === void 0 || a === void 0 || l === void 0 || n < 0.5 || o < 80 || d.includes("defrost") || d.includes("abtau")) return;
  const p = n / (o / 1e3), h = Dt(e.model).source, m = Po(a, l, Number(e.props.cop_ref) || yn, h), u = p / m;
  return { cop: p, expected: m, ratio: u, ampel: Lo(u), tOut: a, tFlow: l };
}
function Ci(r) {
  return r && r.el > 0.05 ? r.heat / r.el : void 0;
}
const Me = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };
function pe(r, t) {
  return {
    heat: r.heat + (t.heat || 0),
    el: r.el + (t.el || 0),
    heatDhw: r.heatDhw + (t.heatDhw || 0),
    elDhw: r.elDhw + (t.elDhw || 0),
    aux: r.aux + (t.aux || 0)
  };
}
function Rt(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate()).getTime();
}
const Wo = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"]
};
async function Do(r, t) {
  const e = t.components.find((b) => b.type === "indoor_unit"), s = {};
  for (const [b, v] of Object.entries(Wo)) {
    const x = v.map((k) => e?.bindings[k]).find(Boolean);
    x && (s[b] = x);
  }
  const i = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: !1, year: !1 } };
  if (!s.heat || !s.el) return { ...i, missing: "no_counters" };
  const n = /* @__PURE__ */ new Date(), o = Object.values(s), a = (b, v) => r.callWS({
    type: "recorder/statistics_during_period",
    start_time: b.toISOString(),
    end_time: n.toISOString(),
    statistic_ids: o,
    period: v,
    types: ["change"],
    units: { energy: "kWh" }
  }), [l, d] = await Promise.all([
    a(new Date(Rt(n) - 30 * 864e5), "day"),
    a(new Date(n.getFullYear(), 0, 1), "month")
  ]), p = /* @__PURE__ */ new Map();
  for (const [b, v] of Object.entries(s))
    for (const x of l[v] || []) {
      const k = Rt(new Date(x.start));
      p.set(k, pe(p.get(k) || Me, { [b]: x.change || 0 }));
    }
  if (!p.size) return { ...i, missing: "no_statistics" };
  const h = [...p.entries()].sort((b, v) => b[0] - v[0]).map(([b, v]) => ({ day: b, ...v })), m = p.get(Rt(n)) || null, u = p.get(Rt(n) - 864e5) || null;
  let _ = Me, w = null;
  for (const [b, v] of Object.entries(s))
    for (const x of d[v] || [])
      _ = pe(_, { [b]: x.change || 0 }), new Date(x.start).getMonth() === n.getMonth() && (w = pe(w || Me, { [b]: x.change || 0 }));
  return { today: m, yesterday: u, month: w, year: _, daily: h, estimated: { month: !1, year: !1 } };
}
const $n = [2, 3, 6.5, 10.5, 14.5, 18, 20, 19.5, 15.5, 10.5, 6, 3], Pi = 0.8;
function cs(r, t, e, s) {
  const i = s ?? $n[t], n = r.p, o = n.heatLoad / (21 - n.designTemp);
  let a = 0, l = 0;
  for (const h of [-4, -2, 0, 2, 4]) {
    const m = i + h;
    if (m >= 16) continue;
    const u = o * (21 - m) * 24 * e * 0.2 * 0.85, _ = 21 + (21 - m) * ((n.floor ? 35 : 50) - 21) / (21 - n.designTemp);
    a += u, l += u / (Ce(m, _, n.source) * Pi);
  }
  const d = 8.4 * e * (n.dhwL > 0 ? 1 : 0), p = d / (Ce(i, 53, n.source) * Pi);
  return { heat: a + d, el: l + p, heatDhw: d, elDhw: p, aux: 0 };
}
function To(r) {
  const t = new Date(r.time * 1e3), e = Rt(t), s = r.dailyEnergy(), i = s.find((d) => d.day === e) || null, n = s.find((d) => d.day === e - 864e5) || null, o = cs(r, t.getMonth(), t.getDate() - 1 + t.getHours() / 24, r.outdoorMean);
  let a = Me;
  for (let d = 0; d < t.getMonth(); d++) a = pe(a, cs(r, d, new Date(t.getFullYear(), d + 1, 0).getDate()));
  a = pe(a, o);
  const l = [];
  for (let d = 29; d >= 2; d--) {
    const p = e - d * 864e5, h = new Date(p), m = d <= 14 ? (14 - d) / 14 : 0, u = $n[h.getMonth()] * (1 - m) + r.outdoorMean * m + Math.sin(d * 1.3) * 2, _ = cs(r, h.getMonth(), 1, u), w = 1 + Math.sin(d * 1.7) * 0.18;
    l.push({ day: p, ..._, heat: _.heat * w, el: _.el * w * (1 + Math.cos(d) * 0.04) });
  }
  return {
    today: i,
    yesterday: n,
    month: o,
    year: a,
    daily: [...l, ...s.filter((d) => d.day >= e - 864e5)],
    estimated: { month: !0, year: !0 }
  };
}
const Gt = (r, ...t) => r.components.find((e) => t.includes(e.type));
function kn(r) {
  const t = (s, i) => {
    if (!s) return;
    const n = r.get(s, i);
    return n?.available && n.num !== null && Number.isFinite(n.num) ? n.num : void 0;
  };
  return { num: t, on: (s, i) => {
    const n = t(s, i);
    if (n !== void 0) return n > 0;
    if (!s) return !1;
    const o = String(r.get(s, i)?.raw ?? "").toLowerCase();
    return ["on", "true", "an", "ein", "1", "yes"].includes(o);
  } };
}
const ie = (r) => Math.round(r * 10) / 10;
function Oo(r, t) {
  const { num: e, on: s } = kn(t), i = Gt(r, "outdoor_unit"), n = Gt(r, "indoor_unit"), o = Gt(r, "buffer"), a = Gt(r, "dhw_tank"), l = Gt(r, "radiators", "floor_heating"), d = Gt(r, "tap"), p = r.components.find((I) => I.type === "pump" && I.props.role === "circulation"), h = i ? kt(i, t) : /* @__PURE__ */ new Set(), m = n ? kt(n, t) : /* @__PURE__ */ new Set(), u = [];
  if (!i && !n) return u;
  const _ = Dt(i?.model).source === "brine", w = e(i, "outdoor_temp"), b = e(i, "heat_power");
  let v = e(i, "el_power");
  v !== void 0 && i && t.get(i, "el_power")?.unit !== "kW" && (v /= 1e3);
  const x = b !== void 0 && v !== void 0 && v > 0.05 && b > 0.2 ? b / v : void 0, k = e(i, "compressor_speed"), C = e(n, "supply_temp"), T = e(n, "return_temp"), E = e(n, "target_flow_temp") ?? e(l, "target_flow_temp"), D = e(o, "temp_top") ?? e(n, "buffer_temp"), J = e(a, "temp_top") ?? e(n, "dhw_temp"), U = e(a, "setpoint") ?? e(n, "dhw_setpoint"), at = e(n, "aux_level"), X = e(l, "heating_limit") ?? 16, lt = i ? Qt(t.get(i, "activity")) : void 0, it = h.has("running"), O = lt === "hot_water" || it && m.has("b"), L = O || s(a, "charging") || m.has("charging"), K = _ ? "ground" : "air", j = h.has("defrost");
  if (h.has("alarm") ? u.push({ id: "alarm", tone: "error", key: "ex.alarm", params: {}, comp: i?.id }) : h.has("defrost") ? u.push({ id: "defrost", tone: "cold", key: "ex.defrost", params: { out: w }, hint: "ex.defrost_hint", comp: i?.id }) : it && O ? u.push({
    id: "dhw",
    tone: "dhw",
    key: J !== void 0 && U !== void 0 ? "ex.dhw_charge" : "ex.dhw_charge_short",
    params: { dhw: J, set: U },
    hint: "ex.dhw_charge_hint",
    comp: a?.id ?? n?.id
  }) : it ? u.push({
    id: "heating",
    tone: "heat",
    key: b !== void 0 && v !== void 0 ? `ex.heating_${K}` : `ex.heating_${K}_short`,
    params: { out: w, heat: b !== void 0 ? ie(b) : void 0, el: v !== void 0 ? ie(v) : void 0 },
    comp: i?.id
  }) : w !== void 0 && w >= X ? u.push({ id: "off", tone: "info", key: "ex.off_limit", params: { out: w, limit: X }, comp: i?.id }) : D !== void 0 && E !== void 0 && D >= E - 1 ? u.push({ id: "off", tone: "info", key: "ex.off_buffer", params: { buf: D, target: E }, hint: "ex.off_buffer_hint", comp: o?.id ?? n?.id }) : u.push({ id: "off", tone: "info", key: "ex.off", params: {}, comp: i?.id }), it && !h.has("defrost") && x !== void 0 && u.push({
    id: "cop",
    tone: x >= 3.5 ? "eco" : x >= 2.5 ? "info" : "warn",
    key: "ex.cop",
    params: { cop: ie(x), speed: k },
    hint: k !== void 0 ? "ex.cop_modulating" : void 0,
    comp: i?.id
  }), !O && !j && E !== void 0 && w !== void 0 && w < X && u.push({
    id: "curve",
    tone: "heat",
    key: C !== void 0 ? "ex.curve" : "ex.curve_short",
    params: { out: w, target: E, sup: C },
    hint: "ex.curve_hint",
    comp: n?.id
  }), it && !O && !j && C !== void 0 && T !== void 0) {
    const I = C - T;
    u.push({
      id: "spread",
      tone: I >= 3 && I <= 8 ? "eco" : I >= 2 && I <= 10 ? "info" : "warn",
      key: I < 2 ? "ex.spread_low" : I > 10 ? "ex.spread_high" : "ex.spread_ok",
      params: { spread: ie(I), sup: C, ret: T },
      comp: n?.id
    });
  }
  if (D !== void 0 && (o || Wt(n)?.id === "tp70")) {
    const I = m.has("pc1") || r.components.some((dt) => dt.type === "pump" && dt.props.circuit === 1 && kt(dt, t).has("running")), ot = it && !O && !j && C !== void 0 && C - D > 2;
    u.push({
      id: "buffer",
      tone: ot ? "warn" : "info",
      key: ot ? "ex.buffer_mixing" : I ? "ex.buffer_pc1" : "ex.buffer",
      params: { buf: D, loss: C !== void 0 ? ie(C - D) : void 0 },
      comp: o?.id ?? n?.id
    });
  }
  const q = e(l, "room_temp");
  if (l && q !== void 0) {
    const I = e(l, "room_setpoint");
    u.push({
      id: "room",
      tone: I !== void 0 && q < I - 1 ? "warn" : "info",
      key: I !== void 0 ? "ex.room" : "ex.room_short",
      params: { room: q, set: I, name: l.label },
      comp: l.id
    });
  }
  s(a, "disinfecting") ? u.push({ id: "disinfect", tone: "dhw", key: "ex.disinfect", params: {}, comp: a?.id }) : J !== void 0 && !L && u.push({ id: "dhw_idle", tone: "info", key: U !== void 0 ? "ex.dhw_idle" : "ex.dhw_idle_short", params: { dhw: J, set: U }, comp: a?.id ?? n?.id }), d && s(d, "flow") && u.push({ id: "tap", tone: "dhw", key: "ex.tap", params: { flow: e(d, "flow") }, comp: d.id }), p && kt(p, t).has("running") && u.push({ id: "circ", tone: "info", key: "ex.circ", params: {}, hint: "ex.circ_hint", comp: p.id }), m.has("aux") && u.push({ id: "aux", tone: "warn", key: at !== void 0 ? "ex.aux" : "ex.aux_short", params: { aux: at }, hint: "ex.aux_hint", comp: n?.id });
  const ct = n?.props.input_labels || {};
  for (const I of [1, 2, 3, 4]) {
    if (!s(n, `input${I}`)) continue;
    const ot = ct[`input${I}`] || "", dt = /14a|evu|sperr/i.test(ot) ? "14a" : /pv|solar|überschuss|surplus/i.test(ot) ? "pv" : "other";
    u.push({
      id: `input${I}`,
      tone: dt === "pv" ? "eco" : "warn",
      key: `ex.input_${dt}`,
      params: { n: I, label: ot },
      comp: n?.id
    });
  }
  return u;
}
function Ho(r, t) {
  const e = kt(r, t), { num: s } = kn(t);
  switch (r.type) {
    case "outdoor_unit":
      return {
        role: Dt(r.model).source === "brine" ? "exc.outdoor_brine" : "exc.outdoor",
        state: e.has("defrost") ? "exs.defrost" : e.has("running") ? "exs.compressor_on" : "exs.compressor_off",
        params: { speed: s(r, "compressor_speed") }
      };
    case "indoor_unit":
      return {
        role: `exc.indoor_${Wt(r)?.id || "wall_e"}`,
        state: e.has("b") && e.has("running") ? "exs.vw1_b" : e.has("running") ? "exs.vw1_a" : void 0,
        params: {}
      };
    case "pump":
      return { role: `exc.pump_${r.props.role === "circulation" ? "circ" : r.props.role === "primary" ? "primary" : "hc"}`, state: e.has("running") ? "exs.running" : "exs.stopped", params: {} };
    case "valve_3way":
      return { role: "exc.valve_3way", state: e.has("b") ? "exs.valve_b" : "exs.valve_a", params: {} };
    case "separator":
      return { role: r.props.filter ? "exc.filter" : "exc.separator", params: {} };
    case "buffer":
    case "dhw_tank":
    case "mixer":
    case "radiators":
    case "floor_heating":
    case "tap":
    case "water_inlet":
    case "expansion_vessel":
      return { role: `exc.${r.type}`, params: {} };
    default:
      return { role: "", params: {} };
  }
}
function Li(r) {
  if (!r?.available || r.num === null || !Number.isFinite(r.num)) return;
  const t = (r.unit || "").toLowerCase();
  return t === "kw" ? r.num : t === "mw" ? r.num * 1e3 : r.num / 1e3;
}
const Wi = (r, t) => r.components.find((e) => e.type === t);
function Vo(r, t) {
  const e = r?.props.input_labels || {};
  let s = !1, i = !1;
  for (const n of [1, 2, 3, 4]) {
    if (!r || !tt(t.get(r, `input${n}`))) continue;
    const o = e[`input${n}`] || "";
    /14a|evu|sperr/i.test(o) ? s = !0 : /pv|solar|überschuss|surplus/i.test(o) && (i = !0);
  }
  return { dim14a: s, pv: i };
}
function Bo(r, t) {
  const e = r.settings.energy;
  return !!t || !!(e?.enabled && (e.pv || e.grid || e.battery || e.house || e.wallbox));
}
function No(r, t, e) {
  const s = r.settings.energy || {}, i = Wi(r, "outdoor_unit"), n = Wi(r, "indoor_unit"), o = Vo(n, t), a = s.limit_14a ?? 4.2, l = !!(s.enabled && (s.pv || s.grid || s.battery || s.house || s.wallbox));
  if (e && !l) {
    const k = e.values.energy;
    return {
      pv: k.pv_power / 1e3,
      grid: k.grid_power / 1e3,
      battery: k.battery_power / 1e3,
      soc: k.battery_soc,
      house: k.house_power / 1e3,
      wallbox: k.wallbox_power / 1e3,
      hp: k.hp_power / 1e3,
      dim14a: o.dim14a,
      pvSignal: o.pv,
      limit14a: a
    };
  }
  const d = (k) => t instanceof wn ? t.realEntity(k) : t.getEntity(k), p = (k) => k ? Li(d(k)) : void 0, h = p(s.pv);
  let m = p(s.grid);
  m !== void 0 && s.grid_invert && (m = -m);
  let u = p(s.battery);
  u !== void 0 && s.battery_invert && (u = -u);
  const _ = s.battery_soc ? d(s.battery_soc) : void 0, w = _?.available && _.num !== null ? _.num : void 0, b = p(s.wallbox), v = i ? Li(t.get(i, "el_power")) : void 0;
  let x = p(s.house);
  return x !== void 0 ? !e && s.house_includes_hp !== !1 && v !== void 0 && (x -= v) : m !== void 0 && !e && (x = m + (h ?? 0) + (u ?? 0) - (v ?? 0) - (b ?? 0)), x !== void 0 && (x = Math.max(0, x)), { pv: h, grid: m, battery: u, soc: w, house: x, wallbox: b, hp: v, dim14a: o.dim14a, pvSignal: o.pv, limit14a: a };
}
function Ro(r) {
  const t = Object.keys(r.states), e = (n) => r.states[n] ? n : void 0, s = (n) => t.find((o) => n.test(o));
  if (e("sensor.evcc_grid_power") || e("sensor.evcc_pv_power"))
    return {
      enabled: !0,
      pv: e("sensor.evcc_pv_power"),
      grid: e("sensor.evcc_grid_power"),
      battery: e("sensor.evcc_battery_power"),
      battery_soc: e("sensor.evcc_battery_soc"),
      house: e("sensor.evcc_home_power"),
      house_includes_hp: !0,
      wallbox: s(/^sensor\.evcc_.+_charge_power$/)
    };
  const i = (n) => s(new RegExp(`^sensor\\.solax.*${n.source}`));
  return s(/^sensor\.solax/) ? {
    enabled: !0,
    pv: i(/pv_power_total$/),
    // SolaX reports export as positive ("measured power") and charging as positive
    grid: i(/measured_power$/),
    grid_invert: !0,
    battery: i(/battery_power_charge$/),
    battery_invert: !0,
    battery_soc: s(/^sensor\.solax_battery_capacity$/),
    house: i(/house_load$/),
    house_includes_hp: !0
  } : { enabled: !0 };
}
const Io = {
  w: 640,
  h: 232,
  bus: 105,
  busX: [40, 540],
  pos: { pv: [80, 42], grid: [290, 42], battery: [500, 42], hp: [80, 168], house: [290, 168], wallbox: [500, 168] }
}, jo = {
  w: 1240,
  h: 118,
  bus: 98,
  busX: [40, 1180],
  pos: { pv: [70, 34], grid: [265, 34], battery: [460, 34], hp: [705, 34], house: [900, 34], wallbox: [1095, 34] }
}, Di = {
  pv: "#ffc93c",
  grid: "#9aa7b4",
  battery: "#3ddc97",
  hp: "#ff8a3d",
  house: "#6cc4ff",
  wallbox: "#b48cff"
}, Ko = {
  pv: "M3 18h18l-3-9H6zM9 9l-1 9M15 9l1 9M4.5 13.5h15M12 2v3M5 4l1.5 2M19 4l-1.5 2",
  grid: "M12 2l-6 20M12 2l6 20M8 9h8M7 14h10M5 20h14M12 2v4",
  battery: "M6 6h12v15H6zM10 3h4v3M9 13h6M12 10v6",
  hp: "M4 5h16v14H4zM10 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M10 12l2-3M10 12l-3 1M10 12l1 3M16 8h2M16 11h2M16 14h2",
  house: "M3 11l9-7l9 7M5 10v10h14V10M10 20v-6h4v6",
  wallbox: "M7 3h10v18H7zM10 8h4M12 12l-2 3h4l-2 3M17 14h2v4a2 2 0 0 0 2 2"
};
function Fo(r) {
  const t = Math.abs(r);
  return t > 5 ? 0.6 : t > 2 ? 0.9 : t > 0.5 ? 1.3 : 1.9;
}
const De = class De extends st {
  constructor() {
    super(...arguments), this._wide = !1;
  }
  _node(t, e, s, i) {
    const [n, o] = t.pos[e], a = o < t.bus, l = s === void 0, d = s ?? 0, p = !l && Math.abs(d) >= 0.05, h = Di[e], m = p ? 2.5 + Math.min(6, Math.abs(d) * 0.9) : 2, u = a ? o + 26 : o - 26, _ = a === d > 0, w = c(e === "grid" && p ? d > 0 ? "en.grid_import" : "en.grid_export" : e === "battery" && p ? d > 0 ? "en.bat_discharge" : "en.bat_charge" : `en.${e}`);
    return S`
      <line x1=${n} y1=${u} x2=${n} y2=${t.bus} class="link" style="stroke:${p ? h : "var(--cp-border)"}; stroke-width:${m}" />
      ${p ? S`<line x1=${n} y1=${u} x2=${n} y2=${t.bus} class="dots ${_ ? "down" : "up"}" style="animation-duration:${Fo(d)}s" />` : y}
      <g class="node ${l ? "missing" : ""}" transform="translate(${n} ${o})">
        <circle r="25" class="ring" style="stroke:${p ? h : "var(--cp-border)"}" />
        <path d=${Ko[e]} transform="translate(-12 -12)" class="glyph" style="stroke:${p ? h : "var(--cp-muted)"}" />
      </g>
      <text x=${n + 36} y=${o - 4} class="lbl">${w}</text>
      <text x=${n + 36} y=${o + 15} class="val">${l ? "–" : G(Math.abs(d), Math.abs(d) < 10 ? 2 : 1)}<tspan class="unit"> kW</tspan></text>
      ${i ? S`<g transform="translate(${n + 36} ${o + 23})">${i}</g>` : y}
    `;
  }
  _badge(t, e) {
    const s = t.length * 6.2 + 18;
    return S`<rect width=${s} height="18" rx="9" class="badge ${e}" /><text x=${s / 2} y="12.5" text-anchor="middle" class="badge-t">${t}</text>`;
  }
  connectedCallback() {
    super.connectedCallback(), this._ro = new ResizeObserver(([t]) => {
      const e = t.contentRect.width > 820;
      e !== this._wide && (this._wide = e, this.requestUpdate());
    }), this._ro.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._ro?.disconnect();
  }
  render() {
    const t = this.flow;
    if (!t) return y;
    const e = this._wide ? jo : Io, s = (t.pv ?? 0) + Math.max(0, t.battery ?? 0), i = (t.house ?? 0) + (t.wallbox ?? 0) + (t.hp ?? 0), n = i > 0.05 && (t.pv !== void 0 || t.battery !== void 0) ? Math.min(1, s / i) : void 0, o = t.soc, a = o !== void 0 ? S`<rect width="44" height="6" rx="3" class="soc-bg" />
            <rect width=${44 * Math.max(0, Math.min(100, o)) / 100} height="6" rx="3" style="fill:${Di.battery}" />
            <text x="50" y="7" class="soc">${Math.round(o)} %</text>` : void 0, l = (d) => d === void 0 ? void 0 : -d;
    return f`<div class="head">
        <b>${c("en.title")}</b>
        ${n !== void 0 ? f`<span class="share">${c("en.share", { pct: Math.round(n * 100) })}</span>` : y}
      </div>
      <svg viewBox="0 0 ${e.w} ${e.h}" class=${this._wide ? "wide" : ""} role="img" aria-label=${c("en.title")}>
        <line x1=${e.busX[0]} y1=${e.bus} x2=${e.busX[1]} y2=${e.bus} class="bus" />
        ${this._node(e, "pv", t.pv, t.pvSignal ? this._badge(c("en.pv_signal"), "eco") : void 0)}
        ${this._node(e, "grid", t.grid)}
        ${this._node(e, "battery", t.battery, a)}
        ${this._node(e, "hp", l(t.hp), t.dim14a ? this._badge(c("en.dimmed", { kw: t.limit14a }), "warn") : void 0)}
        ${this._node(e, "house", l(t.house))}
        ${this._node(e, "wallbox", l(t.wallbox))}
      </svg>`;
  }
};
De.properties = { flow: { attribute: !1 } }, De.styles = rt`
    :host { display: block; }
    .head { display: flex; align-items: baseline; gap: 12px; font-size: 14px; padding: 0 2px 2px; }
    .share { font-size: 12px; color: #3ddc97; font-weight: 700; }
    svg { width: 100%; height: auto; display: block; overflow: visible; }
    svg.wide { max-height: 130px; }
    .bus { stroke: var(--cp-muted); stroke-width: 3; stroke-linecap: round; opacity: 0.55; }
    .link { stroke-linecap: round; opacity: 0.55; }
    .dots { stroke: var(--cp-flow, #fff); stroke-width: 3; stroke-linecap: round; stroke-dasharray: 2 13; animation: en-down 1s linear infinite; }
    .dots.up { animation-name: en-up; }
    @keyframes en-down { to { stroke-dashoffset: -15; } }
    @keyframes en-up { to { stroke-dashoffset: 15; } }
    .ring { fill: var(--cp-surface-2); stroke-width: 2.5; }
    .glyph { fill: none; stroke-width: 1.7; stroke-linecap: round; stroke-linejoin: round; }
    .missing { opacity: 0.45; }
    .lbl { fill: var(--cp-muted); font-size: 11.5px; font-weight: 600; }
    .val { fill: var(--cp-text); font-size: 17px; font-weight: 800; font-variant-numeric: tabular-nums; }
    .unit { fill: var(--cp-muted); font-size: 11px; font-weight: 600; }
    .soc-bg { fill: var(--cp-border); }
    .soc { fill: var(--cp-muted); font-size: 11px; font-weight: 700; }
    .badge { stroke-width: 1; }
    .badge.warn { fill: color-mix(in srgb, var(--cp-warn) 22%, transparent); stroke: var(--cp-warn); }
    .badge.eco { fill: color-mix(in srgb, #3ddc97 20%, transparent); stroke: #3ddc97; }
    .badge-t { fill: var(--cp-text); font-size: 11px; font-weight: 700; }
    @media (prefers-reduced-motion: reduce) { .dots { animation: none; } }
  `;
let Ss = De;
customElements.get("cp-energy") || customElements.define("cp-energy", Ss);
const Ti = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e"
};
function Qs(r, t, e = 10, s = "casing") {
  return S`<rect class=${s} x="0" y="0" width=${r} height=${t} rx=${e} />
    <rect class="sheen" x="2" y="2" width=${r - 4} height=${Math.min(t * 0.35, 40)} rx=${e - 2} />`;
}
function Go(r) {
  const { w: t, h: e, flags: s, c: i } = r, n = Dt(i.model);
  if (n.source === "brine") return Uo(r);
  const o = s.has("running") && !s.has("defrost"), a = s.has("defrost"), l = s.has("alarm"), d = t * 0.36, p = e * 0.5, h = Math.min(e * 0.38, t * 0.3), m = r.num("fan_speed") ?? (o ? 60 : 0), u = m <= 0 ? 0 : m < 45 ? 2.8 : m < 70 ? 2 : 1.5, _ = l ? "#ff4d4d" : a ? "#6cc4ff" : o ? "#3ddc97" : "#5b6573", w = [0, 120, 240].map(
    (b) => S`<path transform="rotate(${b})" d="M0 0 C ${h * 0.18} ${-h * 0.25}, ${h * 0.55} ${-h * 0.35}, ${h * 0.82} ${-h * 0.12} C ${h * 0.6} ${h * 0.05}, ${h * 0.25} ${h * 0.08}, 0 0 Z" />`
  );
  return S`
    <rect class="foot" x=${t * 0.12} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    <rect class="foot" x=${t * 0.72} y=${e - 2} width=${t * 0.16} height="6" rx="2" />
    ${Qs(t, e, 12)}
    <circle class="grille-bg" cx=${d} cy=${p} r=${h + 4} />
    <g transform="translate(${d} ${p})">
      <g class=${u ? "spin fan" : "fan"} style=${u ? `--dur:${u}s` : ""}>${w}<circle r=${h * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((b) => S`<circle class="grille" cx=${d} cy=${p} r=${h * b} />`)}
    <line class="grille" x1=${d - h} y1=${p} x2=${d + h} y2=${p} />
    <line class="grille" x1=${d} y1=${p - h} x2=${d} y2=${p + h} />
    ${[0, 1, 2, 3, 4, 5].map((b) => S`<rect class="vent" x=${t * 0.73} y=${e * 0.22 + b * e * 0.1} width=${t * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${t * 0.9} cy=${e * 0.12} r="4" fill=${_} class=${o || a ? "pulse" : ""} />
    ${n.refrigerant ? S`<text class="tag" x=${t * 0.825} y=${e * 0.9} text-anchor="middle">${n.refrigerant}</text>` : ""}
    ${a ? S`<rect x="2" y="2" width=${t - 4} height=${e - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${d} ${p})">${Zo(h * 0.55)}</g>` : ""}
    ${l ? S`<rect x="1" y="1" width=${t - 2} height=${e - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}
function Uo(r) {
  const { w: t, h: e, flags: s } = r, i = s.has("running");
  return S`
    ${Qs(t, e * 0.55, 10)}
    <text class="tag" x=${t / 2} y=${e * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${e * 0.62} width=${t} height=${e * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
    (n) => S`<path class=${i ? "probe active" : "probe"} d="M${t * n - 6} ${e * 0.55} V ${e * 0.95} M${t * n + 6} ${e * 0.55} V ${e * 0.95} M${t * n - 6} ${e * 0.95} Q ${t * n} ${e} ${t * n + 6} ${e * 0.95}" />`
  )}
  `;
}
function Zo(r) {
  const t = [0, 60, 120].map(
    (e) => S`<g transform="rotate(${e})"><line x1=${-r} y1="0" x2=${r} y2="0" />
      <path d="M${r * 0.6} 0 l ${r * 0.2} ${-r * 0.2} M${r * 0.6} 0 l ${r * 0.2} ${r * 0.2} M${-r * 0.6} 0 l ${-r * 0.2} ${-r * 0.2} M${-r * 0.6} 0 l ${-r * 0.2} ${r * 0.2}" /></g>`
  );
  return S`<g class="snow">${t}</g>`;
}
const A = 20;
function Y(r, t, e) {
  const s = r.map(([i, n], o) => `${o ? "L" : "M"} ${i * A} ${n * A}`).join(" ");
  return S`<path class="ipipe" d=${s} style="stroke:${t}" />
    ${e ? S`<path class="ipipe-flow" d=${s} />` : y}`;
}
function ne([r, t], e, s = "l", i = "PC0") {
  const n = 0.55 * A, o = { r: 0, d: 90, l: 180, u: 270 }[s];
  return S`<g transform="translate(${r * A} ${t * A})">
    ${e ? S`<circle class="pump-glow pulse" r=${n + 4} />` : y}
    <circle class=${e ? "pump-body on" : "pump-body"} r=${n} />
    <path class=${e ? "pump-tri on" : "pump-tri"} transform="rotate(${o})" d="M ${-n * 0.5} ${-n * 0.8} L ${n} 0 L ${-n * 0.5} ${n * 0.8} Z" />
    <circle class=${e ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.36} />
    <text class="itag halo" y=${n + 9} text-anchor="middle">${i}</text>
  </g>`;
}
function ve([r, t], e, s, i = "VW1", n = !1) {
  const o = 0.5 * A, a = (h) => {
    const [m, u] = { l: [-1, 0], r: [1, 0], u: [0, -1], d: [0, 1] }[h], _ = m * o - u * o * 0.6, w = u * o + m * o * 0.6, b = m * o + u * o * 0.6, v = u * o - m * o * 0.6;
    return `M ${_} ${w} L 0 0 L ${b} ${v} Z`;
  }, [l, d, p] = s;
  return S`<g transform="translate(${r * A} ${t * A})">
    <path class="valve-tri on" d=${a(l)} />
    <path class=${e ? "valve-tri" : "valve-tri on"} d=${a(d)} />
    <path class=${e ? "valve-tri on" : "valve-tri"} d=${a(p)} />
    ${n ? S`<text class="itag" x=${-o - 3} y=${-o * 0.4} text-anchor="end">${i} ${e ? "B" : "A"}</text>` : S`<text class="itag" x=${o + 3} y=${-o} >${i} ${e ? "B" : "A"}</text>`}
  </g>`;
}
function be([r, t], e, s) {
  return S`<g transform="translate(${r * A} ${t * A})">
    ${s ? S`<rect class="aux-glow pulse" x=${-0.55 * A} y="-6" width=${1.1 * A} height=${e * A + 12} rx="10" />` : y}
    <rect class=${s ? "rod hot" : "rod"} x=${-0.35 * A} y="0" width=${0.7 * A} height=${e * A} rx="6" />
    <path class=${s ? "coil hot" : "coil"} d=${qo(0, 6, e * A - 12, 4, 8)} />
  </g>`;
}
function qo(r, t, e, s, i) {
  const n = e / i;
  let o = `M${r} ${t}`;
  for (let a = 1; a <= i; a++) o += ` L${r + (a % 2 ? -s : s)} ${t + a * n}`;
  return o;
}
function ye(r, t, e, s) {
  const i = [...r.flags].find((o) => o.startsWith("mode_"))?.slice(5), n = Ti[i || "off"] || Ti.off;
  return S`<rect class="screen" x=${t} y=${e} width=${s} height="18" rx="4" />
    <rect x=${t + 4} y=${e + 4} width="14" height="10" rx="2" fill=${n} class=${i && i !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${t + 24} y=${e + 13}>${i ? c(`mode.${i}`) : ""}</text>`;
}
function Yo(r, t) {
  const { w: e, h: s, flags: i, c: n } = r, o = i.has("running"), a = i.has("b"), l = i.has("aux"), d = i.has("pc1"), p = gt(r.num("supply_temp"), "#ff7a45"), h = gt(r.num("return_temp"), "#4d9fff"), m = (n.model || "").match(/w[ls]w\d{3}i/i)?.[0]?.toUpperCase().replace("I", "i") || "";
  let u;
  if (t === "t180") {
    const _ = gt(r.num("dhw_temp"), "#ff4f8b");
    u = S`
      <rect class="tank-in" x=${0.6 * A} y=${10 * A} width=${6.8 * A} height=${11.2 * A} rx=${A} style="fill:${_}" />
      <path class=${o && a ? "tank-coil hot" : "tank-coil"} d=${Xo(2.4, 14, 5.6, 19.6)} />
      ${ye(r, 1.6 * A, 0.8 * A, 4.6 * A)}
      ${Y([[6, 0], [6, 6.2], [4.6, 6.2]], p, o)}
      ${Y([[4.6, 6.2], [3, 6.2], [3, 0]], p, o && !a)}
      ${Y([[4.6, 6.2], [4.6, 14]], p, o && a)}
      ${Y([[2.4, 19.6], [1.6, 19.6], [1.6, 7.6]], h, o && a)}
      ${Y([[1, 0], [1, 7.6]], h, o && !a)}
      ${Y([[1, 7.6], [7, 7.6], [7, 0]], h, o)}
      ${Y([[4, 10.2], [4, 0]], _, i.has("flowing"))}
      ${Y([[5, 0], [5, 3], [5.6, 3], [5.6, 20.6]], "#38d0ff", i.has("flowing"))}
      ${be([6, 1.4], 4, l)}
      ${ve([4.6, 6.2], a, ["r", "l", "d"])}
      ${ne([4.2, 7.6], o, "r")}
      ${S`<g transform="translate(${3 * A} ${3.4 * A})"><circle class=${d ? "pump-body on" : "pump-body"} r="8" /><text class="itag" x="12" y="4">PC1</text></g>`}`;
  } else if (t === "tp70") {
    const _ = gt(r.num("buffer_temp"), "#ff9f45");
    u = S`
      <rect class="tank-in" x=${0.6 * A} y=${9.4 * A} width=${7.8 * A} height=${4.2 * A} rx=${A} style="fill:${_}" />
      <text class="tank-label" x=${4.5 * A} y=${13 * A} text-anchor="middle">${n.props.buffer_l || 70} l</text>
      ${ye(r, 0.6 * A, 14.2 * A, 4.4 * A)}
      ${Y([[3, 0], [3, 1.2]], _, !1)}
      ${Y([[4, 0], [4, 1.2]], h, !1)}
      ${Y([[2, 0], [2, 12.6]], h, d)}
      ${Y([[1, 9.4], [1, 0]], _, d)}
      ${Y([[6, 9.4], [6, 8]], h, o && !a)}
      ${Y([[8, 0], [8, 8], [6, 8]], h, o && a)}
      ${Y([[6, 8], [6, 0]], h, o)}
      ${Y([[5, 0], [5, 6.4]], p, o)}
      ${Y([[5, 6.4], [5, 9.4]], p, o && !a)}
      ${Y([[5, 6.4], [7, 6.4], [7, 0]], p, o && a)}
      ${be([5, 1.6], 2.8, l)}
      ${ve([5, 6.4], a, ["u", "d", "r"], "VW1", !0)}
      ${ne([6, 3.4], o, "u")}
      ${ne([1, 5], d, "u", "PC1")}`;
  } else t === "brine" ? u = S`
      ${ye(r, 1.6 * A, 0.8 * A, 4.6 * A)}
      <circle class="compressor" cx=${2.2 * A} cy=${8.5 * A} r=${1.2 * A} />
      <text class="itag" x=${2.2 * A} y=${10.4 * A} text-anchor="middle">Verdichter</text>
      ${Y([[1, 0], [1, 6], [2.2, 6], [2.2, 7.3]], "#38d0ff", o)}
      ${Y([[2.2, 9.7], [2.2, 11.5], [2, 11.5], [2, 0]], "#2b6cff", o)}
      ${Y([[4, 9], [4, 4], [5.5, 4], [5.5, 9]], p, o)}
      ${Y([[5.5, 9], [7, 9], [7, 0]], p, o && !a)}
      ${Y([[5.5, 9], [5.5, 10.4], [4, 10.4], [4, 0]], p, o && a)}
      ${Y([[6, 0], [6, 11.6], [4, 11.6], [4, 9]], h, o && !a)}
      ${Y([[5, 0], [5, 3.4]], h, o && a)}
      ${be([4, 3], 3, l)}
      ${ve([5.5, 9], a, ["u", "r", "d"])}
      ${ne([5.5, 11.6], o, "l")}` : u = S`
      ${ye(r, 2 * A, 0.8 * A, 6 * A)}
      ${Y([[3, 14], [3, 9.6], [4.3, 9.6], [4.3, 2.8], [7.6, 2.8], [7.6, 10.6]], p, o)}
      ${Y([[7.6, 10.6], [9, 10.6], [9, 14]], p, o && !a)}
      ${Y([[7.6, 10.6], [7.6, 11.6], [5, 11.6], [5, 14]], p, o && a)}
      ${Y([[8, 14], [8, 12.8], [6, 12.8]], h, o && !a)}
      ${Y([[6, 14], [6, 12.8]], h, o && a)}
      ${Y([[6, 12.8], [2, 12.8], [2, 14]], h, o)}
      ${be([4.3, 3.4], 5.4, l)}
      ${ve([7.6, 10.6], a, ["u", "r", "d"])}
      ${ne([4.3, 12.8], o, "l")}`;
  return S`
    ${Qs(e, s, 10, "casing light")}
    ${u}
    ${t === "wall_e" || t === "tp70" ? y : S`<text class="tag" x=${e / 2} y=${2.4 * A} text-anchor="middle">${m}</text>`}
  `;
}
function Xo(r, t, e, s) {
  const n = (s - t) / 5;
  let o = `M ${e * A} ${t * A - 2 * A}`;
  o += ` L ${e * A} ${t * A}`;
  for (let a = 0; a < 5; a++) {
    const l = (t + a * n) * A;
    o += ` C ${(r - 0.3) * A} ${l}, ${(r - 0.3) * A} ${l + n / 2 * A}, ${e * A} ${l + n / 2 * A}`, o += ` C ${(e + 0.3) * A} ${l + n / 2 * A}, ${(e + 0.3) * A} ${l + n * A}, ${r * A} ${l + n * A}`;
  }
  return o;
}
function Oi(r, t) {
  const { w: e, h: s, c: i, flags: n } = r, o = r.num("temp_top"), a = r.num("temp_bottom") ?? (o !== void 0 ? o - 6 : void 0), l = r.num("temp_mid") ?? (o !== void 0 && a !== void 0 ? (o + a) / 2 : void 0), d = `tg-${i.id}`, p = t === "dhw" ? "#ff4f8b" : "#ff7a45", h = n.has("charging"), m = i.props.volume ? `${i.props.volume} l` : "", u = Math.min(e / 2, 2 * A);
  return S`
    <defs>
      <linearGradient id=${d} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${gt(o, p)} />
        <stop offset="0.5" stop-color=${gt(l, "#c084fc")} />
        <stop offset="0.95" stop-color=${gt(a, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${e + 6} height=${s + 6} rx=${u + 3} />
    <rect x="0" y="0" width=${e} height=${s} rx=${u} fill="url(#${d})" class="tank-fill" />
    <rect class="tank-glass" x=${e * 0.1} y=${s * 0.06} width=${e * 0.12} height=${s * 0.88} rx=${e * 0.06} />
    ${t === "dhw" ? S`<path class=${h ? "tank-coil hot" : "tank-coil"} d=${Jo(e)} />
        <path class="dip" d="M 0 ${10 * A} H ${0.8 * A} V ${s - 0.4 * A}" />` : S`
        <path class="dip" d="M ${2 * A} 0 V ${s - 0.5 * A}" />
        <path class="dip" d="M ${3 * A} 0 V ${s - 0.5 * A}" />
        ${[0.3, 0.55, 0.8].map((_) => S`<line class="strat" x1=${e * 0.62} x2=${e * 0.9} y1=${s * _} y2=${s * _} />`)}`}
    <text class="tank-label" x=${e / 2} y=${s * (t === "dhw" ? 0.3 : 0.5)} text-anchor="middle">${m}</text>
    ${n.has("disinfecting") ? S`<text class="tank-badge" x=${e / 2} y=${s * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}
function Jo(r) {
  const t = r, e = r * 0.78, s = r * 0.3, i = 4 * A, n = 9 * A, o = 5, a = (n - i) / o;
  let l = `M ${t} ${i} H ${e}`;
  for (let d = 0; d < o; d++) {
    const p = i + d * a;
    l += ` C ${s - 6} ${p}, ${s - 6} ${p + a / 2}, ${e} ${p + a / 2} C ${e + 6} ${p + a / 2}, ${e + 6} ${p + a}, ${e} ${p + a}`;
  }
  return `${l} H ${t}`;
}
function Qo(r) {
  const { w: t, h: e, flags: s } = r, i = s.has("running"), n = Math.min(t, e) / 2 - 2, o = t / 2, a = e / 2;
  return S`
    ${i ? S`<circle class="pump-glow pulse" cx=${o} cy=${a} r=${n + 5} />` : ""}
    <circle class=${i ? "pump-body on" : "pump-body"} cx=${o} cy=${a} r=${n} />
    <path class=${i ? "pump-tri on" : "pump-tri"} d="M ${o - n * 0.5} ${a - n * 0.82} L ${o + n} ${a} L ${o - n * 0.5} ${a + n * 0.82} Z" />
    <g transform="translate(${o} ${a})">
      <circle class=${i ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.38} />
    </g>
  `;
}
function Hi(r, t = !1) {
  const { w: e, h: s, flags: i } = r, n = e / 2, o = s / 2, a = Math.min(e, s) / 2 - 2, l = i.has("b"), d = (p) => t || p ? "valve-tri on" : "valve-tri";
  return S`
    <rect class="actuator" x=${n - a * 0.35} y=${o - a * 1.25} width=${a * 0.7} height=${a * 0.45} rx="2" />
    <line class="stem" x1=${n} y1=${o - a * 0.8} x2=${n} y2=${o} />
    <path class=${d(!0)} d="M ${n - a} ${o - a * 0.6} L ${n} ${o} L ${n - a} ${o + a * 0.6} Z" />
    <path class=${d(!l)} d="M ${n + a} ${o - a * 0.6} L ${n} ${o} L ${n + a} ${o + a * 0.6} Z" />
    <path class=${d(l)} d="M ${n - a * 0.6} ${o + a} L ${n} ${o} L ${n + a * 0.6} ${o + a} Z" />
    ${t ? "" : S`<text class="valve-tag" x=${n + a * 0.5} y=${o - a * 0.75}>${l ? "B" : "A"}</text>`}
  `;
}
function tr(r) {
  const { w: t, h: e } = r, s = r.num("flow_temp"), i = r.num("return_temp"), n = r.num("room_temp"), o = s !== void 0 && n !== void 0 ? s - n > 6 : !1, a = 9, l = 0.45 * A, d = e - 0.45 * A, p = (t - 20) / a, h = `rg-${r.c.id}`;
  return S`
    <defs><linearGradient id=${h} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${gt(s, "#8b949e")} stop-opacity=${o ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${gt(i, "#8b949e")} stop-opacity=${o ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${o ? [0.3, 0.55, 0.8].map(
    (m, u) => S`<path class="heat-wave" style="animation-delay:${u * 0.6}s" d="M ${t * m} ${l - 4} q 5 -6 0 -12 q -5 -6 0 -12" />`
  ) : ""}
    ${r.c.props?.variant === "bottom" ? S`<line class="rad-stub" x1=${4 * A} x2=${4 * A} y1=${d - 2} y2=${e} /><line class="rad-stub" x1=${6 * A} x2=${6 * A} y1=${d - 2} y2=${e} />` : ""}
    <rect class="rad-frame" x="0" y=${l} width=${t - 4} height=${d - l} rx="6" />
    <rect class="rad-header" x="0" y=${A - 4} width=${t - 4} height="8" rx="4" />
    <rect class="rad-header" x="0" y=${5 * A - 4} width=${t - 4} height="8" rx="4" />
    ${Array.from({ length: a }, (m, u) => S`<rect x=${12 + u * p} y=${l + 6} width=${p - 3} height=${d - l - 12} rx=${(p - 3) / 2} fill="url(#${h})" class="fin" />`)}
  `;
}
function er(r) {
  const { w: t, h: e } = r, s = r.num("flow_temp"), i = gt(s, "#8b949e");
  let n = `M 10 ${e * 0.25}`;
  const o = 5;
  for (let a = 0; a < o; a++)
    n += a % 2 === 0 ? ` H ${t - 12} q 6 0 6 ${e * 0.3 / o} q 0 ${e * 0.3 / o} -6 ${e * 0.3 / o}` : ` H 16 q -6 0 -6 ${e * 0.3 / o} q 0 ${e * 0.3 / o} 6 ${e * 0.3 / o}`;
  return S`
    <rect class="floor-slab" x="2" y=${e * 0.15} width=${t - 4} height=${e * 0.75} rx="6" />
    <path d=${n} fill="none" stroke=${i} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}
function sr(r) {
  const { w: t, flags: e } = r, s = e.has("flowing"), i = 1.3 * A, n = 1.6 * A;
  return S`
    <path class="tap-body" d="M ${t} ${A - 3} H ${i + 6} v 6 H ${t} Z" />
    <path class="tap-body" d="M ${i + 4} ${A - 3} v ${n - A - 3} h -4 v ${-9} Z" />
    <path class="tap-handle" d="M ${i - 16} ${n + 4} L ${i - 10} ${n - 5} H ${i + 14} L ${i + 20} ${n + 4} Z" />
    ${[0, 1, 2, 3, 4].map((o) => {
    const a = i - 12 + o * 7;
    return s ? S`<line class="shower-jet" style="animation-delay:${o % 3 * 0.18}s" x1=${a} y1=${n + 8} x2=${a + (o - 2) * 3} y2=${n + 2.8 * A} />` : S`<circle class="shower-hole" cx=${a} cy=${n + 6} r="1.4" />`;
  })}
  `;
}
function ir(r) {
  if (r.c.props?.variant === "shower") return sr(r);
  const { w: t, h: e, flags: s } = r, i = s.has("flowing");
  return S`
    <path class="tap-body" d="M ${t} ${e * 0.25} H ${t * 0.45} a ${t * 0.25} ${t * 0.25} 0 0 0 ${-t * 0.25} ${t * 0.25} V ${e * 0.62} h ${t * 0.16} V ${e * 0.52} a ${t * 0.1} ${t * 0.1} 0 0 1 ${t * 0.1} ${-t * 0.1} H ${t} Z" />
    <rect class="tap-handle" x=${t * 0.46} y=${e * 0.06} width=${t * 0.26} height=${e * 0.12} rx="3" />
    ${i ? [0, 1, 2].map((n) => S`<circle class="drop" style="animation-delay:${n * 0.25}s" cx=${t * 0.28} cy=${e * 0.7} r="2.5" />`) : ""}
  `;
}
function nr(r) {
  const { w: t, h: e } = r;
  return S`
    <rect class="casing" x="0" y=${e * 0.2} width=${t} height=${e * 0.6} rx="5" />
    <text class="tag" x=${t * 0.45} y=${e * 0.62} text-anchor="middle">KW</text>
  `;
}
function or(r) {
  const { w: t, h: e, c: s } = r;
  return s.props.filter ? S`
      <rect class="casing" x=${t * 0.15} y=${e * 0.1} width=${t * 0.7} height=${e * 0.8} rx="5" />
      ${[0.3, 0.45, 0.6, 0.75].map((i) => S`<line class="sieve" x1=${t * 0.25} x2=${t * 0.75} y1=${e * i} y2=${e * i} />`)}
      ${[0.35, 0.5, 0.65].map((i) => S`<line class="sieve" x1=${t * i} x2=${t * i} y1=${e * 0.22} y2=${e * 0.8} />`)}` : S`
    <rect class="casing" x=${t * 0.2} y="0" width=${t * 0.6} height=${e} rx=${t * 0.3} />
    <path class="magnet" d="M ${t * 0.38} ${e * 0.3} v ${e * 0.25} a ${t * 0.12} ${t * 0.12} 0 0 0 ${t * 0.24} 0 v ${-e * 0.25}" />
  `;
}
function rr(r) {
  const { w: t, h: e } = r;
  return S`
    <line class="stem" x1=${t / 2} y1=${e * 0.8} x2=${t / 2} y2=${e} />
    <rect class="vessel" x="0" y="0" width=${t} height=${e * 0.82} rx=${t / 2} />
    <rect class="sheen" x=${t * 0.18} y=${e * 0.08} width=${t * 0.2} height=${e * 0.6} rx=${t * 0.1} />
  `;
}
function ar(r) {
  switch (r.c.type) {
    case "outdoor_unit":
      return Go(r);
    case "indoor_unit":
      return Yo(r, Wt(r.c)?.id || "wall_e");
    case "buffer":
      return Oi(r, "buffer");
    case "dhw_tank":
      return Oi(r, "dhw");
    case "pump":
      return Qo(r);
    case "valve_3way":
      return Hi(r);
    case "mixer":
      return Hi(r, !0);
    case "radiators":
      return tr(r);
    case "floor_heating":
      return er(r);
    case "tap":
      return ir(r);
    case "water_inlet":
      return nr(r);
    case "separator":
      return or(r);
    case "expansion_vessel":
      return rr(r);
    case "junction":
      return S`<circle class="junction" r="4" />`;
    default:
      return S``;
  }
}
const Vi = 1, xe = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };
function ps(r) {
  return r === "l" || r === "r";
}
function Sn(r, t) {
  const e = t.get(r.from.c), s = t.get(r.to.c);
  if (!e || !s) return null;
  const i = yt(e, r.from.p), n = yt(s, r.to.p);
  if (!i || !n) return null;
  const o = e.type === "junction" ? 0 : Vi, a = s.type === "junction" ? 0 : Vi, l = { x: i.x, y: i.y }, d = { x: n.x, y: n.y }, p = { x: l.x + xe[i.dir].x * o, y: l.y + xe[i.dir].y * o }, h = { x: d.x + xe[n.dir].x * a, y: d.y + xe[n.dir].y * a }, m = ps(i.dir), u = [l, p];
  if (r.via?.length) {
    let _ = !m;
    for (const [w, b] of [...r.via, [h.x, h.y]]) {
      const v = u[u.length - 1];
      if (v.x !== w && v.y !== b) {
        const k = _ ? { x: v.x, y: b } : { x: w, y: v.y };
        u.push(k);
      }
      _ = u[u.length - 1].x === w, u.push({ x: w, y: b });
    }
    return u.push(d), { pts: Bi(u), horizontalStart: m };
  }
  if (m)
    if (p.y === h.y && r.bend === void 0)
      u.push(h);
    else {
      const _ = r.bend ?? (p.x + h.x) / 2;
      ps(n.dir) ? u.push({ x: _, y: p.y }, { x: _, y: h.y }) : r.bend === void 0 ? u.push({ x: h.x, y: p.y }) : u.push({ x: _, y: p.y }, { x: _, y: h.y }), u.push(h);
    }
  else if (p.x === h.x && r.bend === void 0)
    u.push(h);
  else {
    const _ = r.bend ?? (p.y + h.y) / 2;
    ps(n.dir) ? r.bend === void 0 ? u.push({ x: p.x, y: h.y }) : u.push({ x: p.x, y: _ }, { x: h.x, y: _ }) : u.push({ x: p.x, y: _ }, { x: h.x, y: _ }), u.push(h);
  }
  return u.push(d), { pts: Bi(u), horizontalStart: m };
}
function Bi(r) {
  const t = [];
  for (const e of r) {
    const s = t[t.length - 1];
    if (!(s && s.x === e.x && s.y === e.y)) {
      if (t.length >= 2) {
        const i = t[t.length - 2];
        if (i.x === s.x && s.x === e.x || i.y === s.y && s.y === e.y) {
          t[t.length - 1] = e;
          continue;
        }
      }
      t.push(e);
    }
  }
  return t;
}
function lr(r, t = 8) {
  if (r.length === 0) return "";
  const e = r.map((n) => ({ x: n.x * $, y: n.y * $ }));
  let s = `M ${e[0].x} ${e[0].y}`;
  for (let n = 1; n < e.length - 1; n++) {
    const o = e[n - 1], a = e[n], l = e[n + 1], d = Math.hypot(a.x - o.x, a.y - o.y), p = Math.hypot(l.x - a.x, l.y - a.y), h = Math.min(t, d / 2, p / 2), m = a.x - (a.x - o.x) / d * h, u = a.y - (a.y - o.y) / d * h, _ = a.x + (l.x - a.x) / p * h, w = a.y + (l.y - a.y) / p * h;
    s += ` L ${m} ${u} Q ${a.x} ${a.y} ${_} ${w}`;
  }
  const i = e[e.length - 1];
  return `${s} L ${i.x} ${i.y}`;
}
const St = 18, cr = 16, pr = 10, ds = 8;
function dr(r, t, e) {
  if (r.icon) return null;
  switch (r.type) {
    case "outdoor_unit":
      return Dt(r.model).source === "brine" ? { x: 0, y: 0, w: t, h: e * 0.55, r: 10 } : { x: 0, y: 0, w: t, h: e, r: 12 };
    case "indoor_unit":
      return { x: 0, y: 0, w: t, h: e, r: 10 };
    case "buffer":
    case "dhw_tank": {
      const s = Math.min(t / 2, 2 * $);
      return { x: -3, y: -3, w: t + 6, h: e + 6, r: s + 3 };
    }
    case "pump": {
      const s = Math.min(t, e) / 2 - 2;
      return { x: t / 2 - s, y: e / 2 - s, w: 2 * s, h: 2 * s, r: s };
    }
    case "radiators":
      return { x: 0, y: 0.45 * $, w: t - 4, h: e - 0.9 * $, r: 6 };
    case "floor_heating":
      return { x: 2, y: e * 0.15, w: t - 4, h: e * 0.75, r: 6 };
    case "water_inlet":
      return { x: 0, y: e * 0.2, w: t, h: e * 0.6, r: 5 };
    case "separator":
      return r.props.filter ? { x: t * 0.15, y: e * 0.1, w: t * 0.7, h: e * 0.8, r: 5 } : { x: t * 0.2, y: 0, w: t * 0.6, h: e, r: t * 0.3 };
    case "expansion_vessel":
      return { x: 0, y: 0, w: t, h: e * 0.82, r: t / 2 };
    case "value_tile":
      return { x: 0, y: 0, w: t, h: e, r: 10 };
    default:
      return null;
  }
}
const ut = 88, mt = 34, ht = 6;
function hs(r, t = 17) {
  return r.length > t ? `${r.slice(0, t - 1)}…` : r;
}
const Te = class Te extends st {
  constructor() {
    super(...arguments), this.gridStep = 1, this.showGrid = !1, this.snapGrid = !0, this.snapObjects = !0, this._guides = {}, this.icons = /* @__PURE__ */ new Map(), this.edit = !1, this.autoHeight = !1, this.selected = null, this.version = 0, this._view = null, this._drag = null, this._valueDrag = null, this._connect = null, this._pointers = /* @__PURE__ */ new Map(), this._gesture = null, this._segments = [], this._pills = [], this._lastMoved = !1, this._structureKey = "", this._onKey = (t) => {
      t.key === "Escape" && this._connect && (this._connect = null);
    };
  }
  /** Does any pipe pass through the given pixel rectangle (with a small margin)? */
  _hitsPipe(t, e, s, i) {
    return this._segments.some((o) => o.x1 <= s + 5 && o.x2 >= t - 5 && o.y1 <= i + 5 && o.y2 >= e - 5);
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObs = new ResizeObserver(() => this.requestUpdate()), this._resizeObs.observe(this), window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObs?.disconnect(), window.removeEventListener("keydown", this._onKey);
  }
  willUpdate(t) {
    if (t.has("plant") && this.plant) {
      const e = `${this.plant.components.length}:${this.plant.grid.w}x${this.plant.grid.h}`;
      (e !== this._structureKey || !this._view) && (this._structureKey = e, (!this.edit || !this._view) && (this._view = null));
    }
  }
  updated() {
    if (!this.autoHeight) {
      this.style.height && (this.style.height = "");
      return;
    }
    if (!this.plant) return;
    const t = this._contentBox(), e = this.getBoundingClientRect().width;
    if (e <= 0) return;
    const s = Math.round(Math.max(240, Math.min(window.innerHeight * 0.75, e * t.h / t.w)));
    this.style.height !== `${s}px` && (this.style.height = `${s}px`);
  }
  /** Fit view to content. */
  fit() {
    this._view = null, this.requestUpdate();
  }
  zoom(t) {
    const e = this._view || this._contentBox(), s = e.x + e.w / 2, i = e.y + e.h / 2;
    this._view = { x: s - e.w * t / 2, y: i - e.h * t / 2, w: e.w * t, h: e.h * t };
  }
  // ------------------------------------------------------------- layout
  _comp(t) {
    return this._drag && this._drag.id === t.id ? { ...t, x: this._drag.dx, y: this._drag.dy } : t;
  }
  _shownSlots(t) {
    return (t.show ?? zt(t).filter((s) => s.show).map((s) => s.key)).filter((s) => this.src.get(t, s) !== void 0 || this.edit && !!t.bindings?.[s]);
  }
  /** Slots shown in the component's value list (not anchored to a pipe or a measuring point). */
  _listSlots(t) {
    const e = new Set(ns(t).filter((s) => s.at || s.pos).map((s) => s.key));
    return this._shownSlots(t).filter((s) => !e.has(s));
  }
  /** Position of a value field: dragged, moved in the editor, or the automatic one. */
  _valueAt(t, e, s, i) {
    const n = this._valueDrag;
    if (n && n.id === t.id && n.slot === e) return { x: n.x, y: n.y };
    const o = t.valuePos?.[e];
    return o ? { x: (t.x + o[0]) * $, y: (t.y + o[1]) * $ } : { x: s, y: i };
  }
  _badgeLayout(t) {
    return this._autoBadges(t).map((e) => ({ ...e, ...this._valueAt(t, e.slot, e.x, e.y) }));
  }
  _autoBadges(t) {
    const e = yi(t);
    if (e === "none" || e === "inside") return [];
    const s = this._listSlots(t);
    if (!s.length) return [];
    const { w: i, h: n } = bt(t), o = t.x * $, a = t.y * $, l = i * $, d = n * $, p = [];
    if (e === "tank") {
      const h = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 }, m = [];
      for (const v of s)
        v in h ? p.push({ slot: v, x: o + 5, y: a + d * h[v] - 11, w: l - 10 }) : m.push(v);
      const _ = m.length * (mt + ht), w = [
        { x: o + l / 2 - ut / 2, y: a + d + 26, dy: mt + ht },
        { x: o + l + 12, y: a + d * 0.35, dy: mt + ht },
        { x: o - 12 - ut, y: a + d * 0.35, dy: mt + ht }
      ], b = w.find((v) => !this._hitsPipe(v.x, v.y, v.x + ut, v.y + _)) || w[0];
      return m.forEach((v, x) => p.push({ slot: v, x: b.x, y: b.y + x * b.dy })), p;
    }
    if (e === "right")
      s.forEach((h, m) => p.push({ slot: h, x: o + l + 12, y: a + 4 + m * (mt + ht) }));
    else if (e === "left")
      s.forEach((h, m) => p.push({ slot: h, x: o - 12 - ut, y: a + 4 + m * (mt + ht) }));
    else if (e === "above" && (t.rot === 90 || t.rot === 270) && s.length <= 2) {
      const h = s.length * (mt + ht) - ht, m = a + d - 6 - h, u = o + l + 10, _ = o - 10 - ut, w = !this._hitsPipe(u, m, u + ut, m + h) || this._hitsPipe(_, m, _ + ut, m + h) ? u : _;
      s.forEach((b, v) => p.push({ slot: b, x: w, y: m + v * (mt + ht) }));
    } else if (e === "above") {
      const h = zt(t).map((_) => _.key);
      s.sort((_, w) => h.indexOf(_) - h.indexOf(w));
      const m = Math.min(3, s.length) * (ut + ht) - ht, u = o + l / 2 - m / 2;
      s.forEach(
        (_, w) => p.push({ slot: _, x: u + w % 3 * (ut + ht), y: a - mt - 10 - Math.floor(w / 3) * (mt + ht) })
      );
    } else {
      const h = Math.max(2, Math.floor((l + 40) / (ut + ht))), m = Math.ceil(s.length / h);
      s.forEach((u, _) => {
        const w = Math.floor(_ / h), v = (w === m - 1 ? s.length - w * h : h) * (ut + ht) - ht;
        p.push({
          slot: u,
          x: o + l / 2 - v / 2 + _ % h * (ut + ht),
          y: a + d + 26 + w * (mt + ht)
        });
      });
    }
    return p;
  }
  _contentBox() {
    let t = 1 / 0, e = 1 / 0, s = -1 / 0, i = -1 / 0;
    const n = (a, l) => {
      t = Math.min(t, a), e = Math.min(e, l), s = Math.max(s, a), i = Math.max(i, l);
    };
    for (const a of this.plant.components) {
      const { w: l, h: d } = bt(a);
      n(a.x * $ - 6, a.y * $ - 6), n((a.x + l) * $ + 6, (a.y + d) * $ + 22), a.label && Vt(a).some((p) => yt(a, p.id)?.dir === "b") && n((a.x + l) * $ + 12 + Math.min(28, a.label.length) * 7.5, (a.y + d) * $);
      for (const p of this._badgeLayout(a))
        n(p.x, p.y), n(p.x + ut, p.y + mt);
    }
    for (const a of this._pills)
      n(a.x, a.y), n(a.x + a.w, a.y + St);
    (this.edit || !Number.isFinite(t)) && (n(0, 0), n(this.plant.grid.w * $, this.plant.grid.h * $));
    const o = 24;
    return { x: t - o, y: e - o, w: s - t + 2 * o, h: i - e + 2 * o };
  }
  // -------------------------------------------------------------- render
  render() {
    if (!this.plant) return y;
    const t = this._view || this._contentBox(), e = new Map(this.plant.components.map((o) => [o.id, this._comp(o)])), s = new Map(this.plant.components.map((o) => [o.id, kt(o, this.src)])), i = po(this.plant, this.src), n = this.plant.pipes.map((o) => ({ pipe: o, route: Sn(o, e) }));
    return this._segments = n.flatMap(
      ({ route: o }) => (o?.pts || []).slice(1).map((a, l) => {
        const d = o.pts[l];
        return { x1: Math.min(d.x, a.x) * $, x2: Math.max(d.x, a.x) * $, y1: Math.min(d.y, a.y) * $, y2: Math.max(d.y, a.y) * $ };
      })
    ), this._pills = this._placePills(e, n), f`
      <svg
        class=${this.edit ? "edit" : ""}
        viewBox="${t.x} ${t.y} ${t.w} ${t.h}"
        preserveAspectRatio="xMidYMid meet"
        @pointerdown=${this._onBgDown}
        @pointermove=${this._onMove}
        @pointerup=${this._onUp}
        @pointercancel=${this._onUp}
        @wheel=${this._onWheel}
      >
        ${this._building(t)}
        ${this._iso && !this.edit ? this._isoFloor(t) : y}
        ${this.edit ? this._grid() : y}
        ${this._iso ? this._isoLayer() : y}
        <g class="pipes ${this._iso ? "iso" : ""}">
          ${n.map(({ pipe: o, route: a }) => {
      if (!a) return y;
      const l = lr(a.pts), d = co(o, s), p = uo(o.kind, i.get(o.id)), h = this.selected?.kind === "p" && this.selected.id === o.id;
      return S`<g class="pipe ${d ? "active" : ""} ${h ? "selected" : ""}" data-pipe=${o.id}
                @pointerdown=${(m) => this._onPipeDown(m, o.id)}>
              <path class="pipe-hit" d=${l} />
              ${h ? S`<path class="pipe-sel" d=${l} />` : y}
              <path class="pipe-outline" d=${l} />
              ${this._iso ? S`<path class="pipe-depth" d=${l} style="stroke:${p}" />` : y}
              ${d ? S`<path class="pipe-halo" d=${l} style="stroke:${p}" />` : y}
              <path class="pipe-base" d=${l} style="stroke:${p}" />
              ${this._iso ? S`<path class="pipe-gloss" d=${l} />` : y}
              ${d ? S`<path class="pipe-flow" d=${l} />` : y}
            </g>`;
    })}
        </g>
        <g class="components">
          ${this.plant.components.map((o) => this._component(e.get(o.id), s.get(o.id)))}
        </g>
        <g class="pills">${this._pills.map((o) => this._anchorPill(o))}</g>
        ${this.edit ? this._editOverlays(e, n) : y}
        ${this.edit ? this._guideLines() : y}
      </svg>
    `;
  }
  _grid() {
    const { w: t, h: e } = this.plant.grid;
    if (!this.showGrid)
      return S`
        <defs><pattern id="cp-grid" width=${$} height=${$} patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1" class="grid-dot" />
        </pattern></defs>
        <rect class="grid-bg" x="0" y="0" width=${t * $} height=${e * $} fill="url(#cp-grid)" />`;
    const s = Math.max(1, this.gridStep) * $, i = s * 5;
    return S`
      <defs>
        <pattern id="cp-grid-minor" width=${s} height=${s} patternUnits="userSpaceOnUse">
          <path d="M ${s} 0 L 0 0 0 ${s}" class="grid-line" />
        </pattern>
        <pattern id="cp-grid-major" width=${i} height=${i} patternUnits="userSpaceOnUse">
          <rect width=${i} height=${i} fill="url(#cp-grid-minor)" />
          <path d="M ${i} 0 L 0 0 0 ${i}" class="grid-line major" />
        </pattern>
      </defs>
      <rect class="grid-bg" x="0" y="0" width=${t * $} height=${e * $} fill="url(#cp-grid-major)" />`;
  }
  /** Alignment guides of the object snap while dragging. */
  _guideLines() {
    const { x: t, y: e } = this._guides;
    if (t === void 0 && e === void 0) return y;
    const { w: s, h: i } = this.plant.grid;
    return S`<g class="guides">
      ${t !== void 0 ? S`<line x1=${t * $} x2=${t * $} y1="0" y2=${i * $} />` : y}
      ${e !== void 0 ? S`<line x1="0" x2=${s * $} y1=${e * $} y2=${e * $} />` : y}
    </g>`;
  }
  get _iso() {
    return this.plant?.settings?.style === "iso";
  }
  /** Body outline of a component in schematic px, honouring rotation and mirroring. */
  _isoBox(t) {
    const e = { ...nt[t.type], ...It(t) }, { w: s, h: i } = bt(t), n = (t.type === "value_tile" ? s : e.w) * $, o = (t.type === "value_tile" ? i : e.h) * $, a = dr(t, n, o);
    if (!a) return null;
    let { x: l, y: d, w: p, h } = a;
    t.flip && e.mirrorable && (l = n - (l + p));
    const m = e.rotatable && t.rot || 0;
    return m === 90 ? [l, d, p, h] = [o - (d + h), l, h, p] : m === 180 ? [l, d] = [n - (l + p), o - (d + h)] : m === 270 && ([l, d, p, h] = [d, n - (l + p), h, p]), { x: t.x * $ + l, y: t.y * $ + d, w: p, h, r: Math.min(a.r, p / 2, h / 2) };
  }
  /** 2.5D: soft shadows and extruded bodies, drawn behind pipes and components. */
  _isoLayer() {
    const t = this.plant.components.map((s) => this._isoBox(s)).filter((s) => !!s), e = Array.from({ length: ds }, (s, i) => (ds - i) / ds);
    return S`
      <defs>
        <linearGradient id="cp-iso-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style="stop-color: var(--cp-iso-top)" />
          <stop offset="0.22" style="stop-color: var(--cp-iso-side)" />
          <stop offset="1" style="stop-color: var(--cp-iso-side)" />
        </linearGradient>
        <filter id="cp-iso-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
      </defs>
      <g class="iso-shadows" filter="url(#cp-iso-blur)">
        ${t.map((s) => S`<rect x=${s.x + 6} y=${s.y + 10} width=${s.w} height=${s.h} rx=${s.r} />`)}
      </g>
      <g class="iso-bodies">
        ${t.map((s) => e.map((i) => S`<rect x=${s.x + cr * i} y=${s.y - pr * i} width=${s.w} height=${s.h} rx=${s.r} fill="url(#cp-iso-grad)" />`))}
      </g>`;
  }
  /** Building section: ground, outer wall, ceiling and room names (settings.building). */
  _building(t) {
    const e = this.plant.settings?.building;
    if (!e || e.show === !1) return S``;
    const { w: s } = this.plant.grid, i = e.floor * $, n = (e.ground ?? e.floor) * $, o = e.slab !== void 0 ? e.slab * $ : void 0, a = Math.min(0, t.x) - $ * 4, l = Math.max(s * $, t.x + t.w) + $ * 4, d = Math.min(0, t.y) - $ * 4, p = Math.max(i, n) + $ * 30, h = e.wall !== void 0, m = h ? e.wall * $ : a, u = e.outside === "right", [_, w] = h ? u ? [a, m] : [m, l] : [a, l], [b, v] = u ? [m, l] : [a, m];
    return S`<g class="building">
      ${h ? S`<rect class="outside" x=${b} y=${d} width=${v - b} height=${n - d} />
            <rect class="ground" x=${b} y=${n} width=${v - b} height=${p - n} />
            <line class="floor-line" x1=${b} x2=${v} y1=${n} y2=${n} />
            <text class="room" x=${u ? s * $ - 14 : m - 14} y=${n - $ * 13} text-anchor="end">${c("bld.outside")}</text>` : y}
      <rect class="ground" x=${_} y=${i} width=${w - _} height=${p - i} />
      <line class="floor-line" x1=${_} x2=${w} y1=${i} y2=${i} />
      ${h ? S`<rect class="wall" x=${m - 7} y=${d} width="14" height=${i + $ - d} />` : y}
      ${o !== void 0 ? S`<rect class="slab" x=${_} y=${o} width=${w - _} height="10" />
            <text class="room" x=${u ? m - 14 : m + 14} y=${o - 8} text-anchor=${u ? "end" : "start"}>${c("bld.living")}</text>
            <text class="room" x=${u ? m - 14 : m + 14} y=${o + $ * 5.6} text-anchor=${u ? "end" : "start"}>${c(n < i ? "bld.basement" : "bld.plant_room")}</text>` : y}
    </g>`;
  }
  /** Isometric floor: two families of lines at ±30°. */
  _isoFloor(t) {
    const e = $ * 2 * Math.sqrt(3), s = $ * 2;
    return S`
      <defs><pattern id="cp-iso-floor" width=${e} height=${s} patternUnits="userSpaceOnUse">
        <path d="M 0 ${s} L ${e} 0 M 0 0 L ${e} ${s}" class="iso-floor-line" />
      </pattern></defs>
      <rect x=${t.x - t.w} y=${t.y - t.h} width=${t.w * 3} height=${t.h * 3} fill="url(#cp-iso-floor)" class="iso-floor" />`;
  }
  _transform(t) {
    const e = { ...nt[t.type], ...It(t) }, s = t.rot || 0;
    let i = `translate(${t.x * $} ${t.y * $})`;
    return t.flip && e.mirrorable && (i += ` translate(${e.w * $} 0) scale(-1 1)`), !e.rotatable || s === 0 ? i : s === 90 ? `${i} translate(${e.h * $} 0) rotate(90)` : s === 180 ? `${i} translate(${e.w * $} ${e.h * $}) rotate(180)` : `${i} translate(0 ${e.w * $}) rotate(270)`;
  }
  _component(t, e) {
    const s = { ...nt[t.type], ...It(t), ports: Vt(t), badges: yi(t) }, { w: i, h: n } = bt(t), o = (t.type === "value_tile" ? i : s.w) * $, a = (t.type === "value_tile" ? n : s.h) * $, l = (k) => {
      const C = this.src.get(t, k);
      return C?.available && C.num !== null ? C.num : void 0;
    }, d = (k) => {
      const C = this.src.get(t, k);
      return C?.available ? String(C.raw) : void 0;
    }, p = t.icon || this.plant.settings.typeIcons?.[t.type], h = p ? this.icons.get(p) : void 0, m = this.selected?.kind === "c" && this.selected.id === t.id;
    let u;
    t.type === "value_tile" ? u = this._tile(t, o, a) : t.type === "label" ? u = S`<text class="free-label" x="0" y=${$} style="font-size:${t.props.size || 18}px">${t.props.text || t.label}</text>` : h ? u = S`${e.has("running") ? S`<rect class="user-glow pulse" x="-4" y="-4" width=${o + 8} height=${a + 8} rx="10" />` : y}
        <image href=${h.data_url} x="0" y="0" width=${o} height=${a} preserveAspectRatio="xMidYMid meet" />` : u = ar({ c: t, w: o, h: a, flags: e, num: l, text: d });
    const _ = !["junction", "label", "value_tile"].includes(t.type), w = s.ports.some((k) => {
      const C = yt(t, k.id);
      return C?.dir === "b" && Math.abs(C.x - (t.x + i / 2)) < Math.max(0.6, i * 0.35);
    });
    let b = (t.x + i / 2) * $, v = (t.y + n) * $ + (s.badges === "above" ? 16 : 18), x = "middle";
    if (w) {
      const k = Math.min(28, t.label.length) * 7.5;
      v = (t.y + n) * $ + 4;
      const C = (t.x + i) * $ + 6, T = t.x * $ - 6, E = this._hitsPipe(C, v - 12, C + k, v + 3), D = this._hitsPipe(T - k, v - 12, T, v + 3);
      E && !D ? (b = T, x = "end") : (b = C, x = "start");
    }
    return S`
      <g class="comp ${m ? "selected" : ""}" data-id=${t.id}
         @pointerdown=${(k) => this._onCompDown(k, t)}>
        <g class=${t.flip && nt[t.type].mirrorable ? "flipped" : ""} transform=${this._transform(t)}>
          ${u}
        </g>
        <rect class="comp-hit" x=${t.x * $ - (t.type === "junction" ? 8 : 0)} y=${t.y * $ - (t.type === "junction" ? 8 : 0)}
          width=${Math.max(16, i * $)} height=${Math.max(16, n * $)} rx="8" />
        ${m ? S`<rect class="sel-outline" x=${t.x * $ - 6} y=${t.y * $ - 6} width=${i * $ + 12} height=${n * $ + 12} rx="10" />` : y}
        ${_ ? S`<text class="comp-label" x=${b} y=${v} text-anchor=${x}>${hs(t.label, 28)}</text>` : y}
      </g>
      ${this._badgeLayout(t).map((k) => k.w ? this._pill(t, k.slot, k.x, k.y, k.w) : this._chip(t, k.slot, k.x, k.y))}
    `;
  }
  _chip(t, e, s, i) {
    const n = this.src.get(t, e), o = ae(t, e), { text: a, unit: l } = Bt(n, o), d = t.type === "value_tile" ? e : Pt(t.type, e), h = o === "temp" && n?.num !== null && n?.available ? gt(n.num, "#8b949e") : "var(--cp-accent)";
    return S`
      <g class="chip ${n?.available === !1 ? "na" : ""}" @click=${(m) => this._slotClick(m, t, e)}
        @pointerdown=${(m) => this._onValueDown(m, t, e, s, i, ut, mt)}>
        <rect x=${s} y=${i} width=${ut} height=${mt} rx="8" />
        <rect class="chip-accent" x=${s} y=${i + 7} width="3" height=${mt - 14} rx="1.5" style="fill:${h}" />
        <text class="chip-label" x=${s + 10} y=${i + 13}>${hs(d)}</text>
        <text class="chip-value" x=${s + 10} y=${i + 28}>${a}<tspan class="chip-unit" dx="2">${l}</tspan></text>
      </g>`;
  }
  /**
   * Values anchored to a pipe ("at") sit on that pipe; values with a measuring point ("pos")
   * sit at that point. Positions avoid overlapping each other.
   */
  _placePills(t, e) {
    const s = [], i = [...t.values()].filter((o) => !["junction", "label"].includes(o.type)).map((o) => {
      const { w: a, h: l } = bt(o);
      return { x: o.x * $ - 4, y: o.y * $ - 4, w: a * $ + 8, h: l * $ + 26 };
    });
    for (const o of t.values())
      for (const a of this._badgeLayout(o)) a.w || i.push({ x: a.x - 4, y: a.y - 4, w: ut + 8, h: mt + 8 });
    const n = (o, a, l, d = !0) => s.every((p) => o + l + 4 <= p.x || o >= p.x + p.w + 4 || a + St + 3 <= p.y || a >= p.y + St + 3) && (!d || i.every((p) => o + l <= p.x || o >= p.x + p.w || a + St <= p.y || a >= p.y + p.h));
    for (const o of t.values()) {
      const a = new Set(this._shownSlots(o)), l = o.type === "indoor_unit" && kt(o, this.src).has("b"), d = new Map(ns(o).map((p) => [p.key, p.at]));
      for (const p of ns(o, l)) {
        if (!a.has(p.key) || !p.at && !p.pos) continue;
        const h = this._pillWidth(o, p.key), m = p.at !== d.get(p.key);
        if (o.valuePos?.[p.key] && !m || this._valueDrag?.id === o.id && this._valueDrag.slot === p.key) {
          s.push({ c: o, slot: p.key, ...this._valueAt(o, p.key, 0, 0), w: h });
          continue;
        }
        if (p.pos) {
          s.push({ c: o, slot: p.key, x: (o.x + p.pos[0]) * $ - h / 2, y: (o.y + p.pos[1]) * $ - St / 2, w: h });
          continue;
        }
        let u = null, _ = { c: o.id, p: p.at };
        const w = /* @__PURE__ */ new Set();
        for (let b = 0; b < 4 && _ && !u; b++) {
          const v = _, x = e.find(
            ({ pipe: D }) => !w.has(D.id) && (D.from.c === v.c && D.from.p === v.p || D.to.c === v.c && D.to.p === v.p)
          );
          if (_ = null, !x?.route) break;
          w.add(x.pipe.id);
          const k = x.pipe.from.c === v.c && x.pipe.from.p === v.p, C = k ? x.route.pts : [...x.route.pts].reverse();
          for (let D = 1; D < C.length && !u; D++) {
            const J = C[D - 1], U = C[D], at = Math.abs(J.x - U.x) + Math.abs(J.y - U.y);
            if (!(at < 1 || J.x === U.x && at < 3))
              for (const X of [0.5, 0.35, 0.65, 0.2, 0.8]) {
                const lt = (J.x + (U.x - J.x) * X) * $, it = (J.y + (U.y - J.y) * X) * $;
                if (J.y === U.y && at * $ < h + 8) break;
                const L = lt - h / 2, K = it - St / 2;
                if (n(L, K, h)) {
                  u = { x: L, y: K };
                  break;
                }
              }
          }
          const T = k ? x.pipe.to : x.pipe.from, E = t.get(T.c);
          if (!u && E && nt[E.type].passive && E.type !== "pump") {
            const D = Vt(E).find((J) => J.id !== T.p && e.some(({ pipe: U }) => !w.has(U.id) && (U.from.c === E.id && U.from.p === J.id || U.to.c === E.id && U.to.p === J.id)));
            D && (_ = { c: E.id, p: D.id });
          }
        }
        if (!u) {
          const b = yt(o, p.at);
          if (!b) continue;
          u = { x: b.x * $ + 6, y: b.y * $ + 6 };
        }
        s.push({ c: o, slot: p.key, ...u, w: h });
      }
    }
    return s;
  }
  _pillWidth(t, e) {
    const { text: s, unit: i } = Bt(this.src.get(t, e), ae(t, e));
    return Math.round((bi(t.type, e).length + s.length + i.length) * 6.4 + 22);
  }
  _anchorPill(t) {
    const e = this.src.get(t.c, t.slot), s = ae(t.c, t.slot), { text: i, unit: n } = Bt(e, s), o = s === "temp" && e?.available && e.num !== null ? gt(e.num, "#8b949e") : "var(--cp-accent)";
    return S`
      <g class="apill" @click=${(a) => this._slotClick(a, t.c, t.slot)}
        @pointerdown=${(a) => this._onValueDown(a, t.c, t.slot, t.x, t.y, t.w, St)}>
        <title>${Pt(t.c.type, t.slot)}</title>
        <rect x=${t.x} y=${t.y} width=${t.w} height=${St} rx=${St / 2} style="stroke:${o}" />
        <text x=${t.x + 8} y=${t.y + 13}><tspan class="apill-label">${bi(t.c.type, t.slot)}</tspan> ${i}<tspan class="chip-unit" dx="1">${n}</tspan></text>
      </g>`;
  }
  /** Compact value-only pill drawn inside a tank at the sensor height. */
  _pill(t, e, s, i, n) {
    const o = this.src.get(t, e), { text: a, unit: l } = Bt(o, ae(t, e));
    return S`
      <g class="pill" @click=${(d) => this._slotClick(d, t, e)}
        @pointerdown=${(d) => this._onValueDown(d, t, e, s, i, n, 22)}>
        <title>${Pt(t.type, e)}</title>
        <rect x=${s} y=${i} width=${n} height="22" rx="11" />
        <text x=${s + n / 2} y=${i + 15.5} text-anchor="middle">${a}<tspan class="chip-unit" dx="1">${l}</tspan></text>
      </g>`;
  }
  _tile(t, e, s) {
    const i = t.props.entries || [];
    return S`
      <rect class="tile" x="0" y="0" width=${e} height=${s} rx="12" />
      <text class="tile-title" x="14" y="22">${t.label}</text>
      ${i.map((n, o) => {
      const a = this.src.get(t, n.slot), { text: l, unit: d } = Bt(a, n.kind || "text"), p = 46 + o * 26;
      return S`<g class="tile-row" @click=${(h) => this._slotClick(h, t, n.slot)}>
          <text class="tile-label" x="14" y=${p}>${hs(n.label || n.slot, 22)}</text>
          <text class="tile-value" x=${e - 14} y=${p} text-anchor="end">${l} <tspan class="chip-unit">${d}</tspan></text></g>`;
    })}`;
  }
  _editOverlays(t, e) {
    const s = [];
    for (const n of t.values())
      if (!(n.type === "junction" && !this._connect && !(this.selected?.kind === "c" && this.selected.id === n.id)))
        for (const o of Vt(n)) {
          const a = yt(n, o.id);
          if (!a) continue;
          const l = this._connect?.c === n.id && this._connect.p === o.id, d = n.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[a.dir] ?? 0 : 0, p = n.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[a.dir] ?? 0 : 0;
          s.push(S`<circle class="port ${l ? "src" : ""} ${this._connect ? "target" : ""}" cx=${a.x * $ + d} cy=${a.y * $ + p} r=${n.type === "junction" ? 4 : 6}
          @pointerdown=${(h) => this._onPortDown(h, { c: n.id, p: o.id })}><title>${o.id}</title></circle>`);
        }
    const i = [];
    if (this.selected?.kind === "p") {
      const n = this.selected.id, o = e.find((a) => a.pipe.id === n)?.route;
      if (o) {
        const a = o.pts.length;
        for (let l = 0; l < a - 1; l++) {
          const d = o.pts[l], p = o.pts[l + 1], h = Math.abs(d.x - p.x) + Math.abs(d.y - p.y);
          if ((l === 0 || l === a - 2) && h <= 1 && a > 2) continue;
          const m = d.x === p.x;
          i.push(S`<rect class="bend-handle ${m ? "ew" : "ns"}" x=${(d.x + p.x) / 2 * $ - 7} y=${(d.y + p.y) / 2 * $ - 7} width="14" height="14" rx="4"
            @pointerdown=${(u) => this._onSegmentDown(u, n, o.pts, l)} />`);
        }
      }
    }
    return S`<g class="ports">${s}</g>${i}`;
  }
  // ---------------------------------------------------------- interaction
  _svgPoint(t) {
    const e = this.renderRoot.querySelector("svg"), s = e.createSVGPoint();
    s.x = t.clientX, s.y = t.clientY;
    const i = e.getScreenCTM();
    if (!i) return { x: 0, y: 0 };
    const n = s.matrixTransform(i.inverse());
    return { x: n.x, y: n.y };
  }
  _emit(t, e) {
    this.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
  }
  _slotClick(t, e, s) {
    this.edit || this._lastMoved || (t.stopPropagation(), this._emit("cp-slot-click", { component: e, slot: s, x: t.clientX, y: t.clientY }));
  }
  _capture(t) {
    const e = this.renderRoot.querySelector("svg");
    e.hasPointerCapture(t.pointerId) || e.setPointerCapture(t.pointerId);
  }
  _onCompDown(t, e) {
    if (t.button !== 0) return;
    t.stopPropagation(), this._pointers.set(t.pointerId, { x: t.clientX, y: t.clientY });
    const s = this._svgPoint(t);
    this._gesture = {
      type: this.edit ? "move" : "tap",
      id: e.id,
      start: s,
      ox: e.x,
      oy: e.y,
      cx: t.clientX,
      cy: t.clientY,
      moved: !1,
      comp: e,
      view: { ...this._view || this._contentBox() }
    }, this.edit && this._capture(t);
  }
  _onPipeDown(t, e) {
    !this.edit || t.button !== 0 || (t.stopPropagation(), this._emit("cp-select", { kind: "p", id: e }));
  }
  _onPortDown(t, e) {
    if (t.stopPropagation(), !this._connect) {
      this._connect = e, this._emit("cp-hint", c("ed.connecting"));
      return;
    }
    this._connect.c !== e.c && this._emit("cp-connect", { from: this._connect, to: e }), this._connect = null, this._emit("cp-hint", "");
  }
  /**
   * Object snap: align a dragged part with the ports and edges of the other parts (within ¾ cell, so a part can still be nudged by one cell).
   * Ports first – aligned ports give straight pipes. Returns snapped positions and guide coordinates.
   */
  _objectSnap(t, e, s) {
    const { w: n, h: o } = bt(t), a = Vt(t).map((u) => yt({ ...t, x: 0, y: 0 }, u.id)).filter((u) => !!u), l = [], d = [];
    for (const u of this.plant.components) {
      if (u.id === t.id || u.type === "label") continue;
      for (const w of Vt(u)) {
        const b = yt(u, w.id);
        if (b)
          for (const v of a)
            l.push({ v: b.x, off: v.x }), d.push({ v: b.y, off: v.y });
      }
      const _ = bt(u);
      l.push({ v: u.x, off: 0 }, { v: u.x + _.w, off: n }, { v: u.x + _.w / 2, off: n / 2 }), d.push({ v: u.y, off: 0 }, { v: u.y + _.h, off: o }, { v: u.y + _.h / 2, off: o / 2 });
    }
    const p = (u, _) => {
      let w = null;
      for (const b of u) {
        const v = b.v - b.off;
        if (!Number.isInteger(v)) continue;
        const x = Math.abs(v - _);
        x <= 0.75 && (!w || x < w.d) && (w = { pos: v, guide: b.v, d: x });
      }
      return w;
    }, h = p(l, e), m = p(d, s);
    return !h && !m ? null : { x: h?.pos, y: m?.pos, gx: h?.guide, gy: m?.guide };
  }
  /**
   * Object snap for a value field (pixels): edges and centres of other value fields and parts,
   * and the pipes (field centred on a run).
   */
  _valueSnap(t, e, s, i, n, o) {
    const a = $ * 0.75, l = [], d = [], p = (_, w, b, v) => {
      l.push({ v: _, off: 0 }, { v: _ + b, off: n }, { v: _ + b / 2, off: n / 2 }), d.push({ v: w, off: 0 }, { v: w + v, off: o }, { v: w + v / 2, off: o / 2 });
    };
    for (const _ of this.plant.components) {
      const w = this._comp(_);
      if (w.type !== "label") {
        const b = bt(w);
        p(w.x * $, w.y * $, b.w * $, b.h * $);
      }
      for (const b of this._badgeLayout(w))
        w.id === t && b.slot === e || p(b.x, b.y, b.w ?? ut, b.w ? 22 : mt);
    }
    for (const _ of this._pills) _.c.id === t && _.slot === e || p(_.x, _.y, _.w, St);
    for (const _ of this._segments)
      _.x1 === _.x2 && l.push({ v: _.x1, off: n / 2 }), _.y1 === _.y2 && d.push({ v: _.y1, off: o / 2 });
    const h = (_, w) => {
      let b = null;
      for (const v of _) {
        const x = Math.abs(v.v - v.off - w);
        x <= a && (!b || x < b.d) && (b = { pos: v.v - v.off, guide: v.v, d: x });
      }
      return b;
    }, m = h(l, s), u = h(d, i);
    return !m && !u ? null : { x: m?.pos, y: u?.pos, gx: m ? m.guide / $ : void 0, gy: u ? u.guide / $ : void 0 };
  }
  /** Editor: value fields can be dragged anywhere (half-cell steps, Alt = free). */
  _onValueDown(t, e, s, i, n, o, a) {
    this.edit && (t.stopPropagation(), this._gesture = { type: "value", id: e.id, slot: s, ox: i, oy: n, w: o, h: a, start: this._svgPoint(t), cx: t.clientX, cy: t.clientY, moved: !1 }, this._capture(t));
  }
  _onSegmentDown(t, e, s, i) {
    t.stopPropagation(), this._gesture = { type: "segment", id: e, pts: s.map((n) => ({ ...n })), index: i, moved: !1, start: this._svgPoint(t) }, this._capture(t);
  }
  /** Move segment `index` of a route perpendicular by `delta` cells; returns the new waypoints. */
  _shiftSegment(t, e, s) {
    const i = t.map((h) => ({ ...h })), n = i[e].x === i[e + 1].x, o = (h) => n ? h.x += s : h.y += s, a = (h, m) => ({ x: h.x + Math.sign(m.x - h.x), y: h.y + Math.sign(m.y - h.y) });
    let l = e, d = e + 1;
    if (l === 0) {
      const h = a(i[0], i[1]);
      i.splice(1, 0, h, { ...h }), l = 2, d = 3;
    } else l === 1 && (i.splice(2, 0, { ...i[1] }), l = 2, d = 3);
    const p = i.length - 1;
    if (d === p) {
      const h = a(i[p], i[p - 1]);
      i.splice(p, 0, { ...h }, h);
    } else d === p - 1 && i.splice(d, 0, { ...i[d] });
    return o(i[l]), o(i[d]), i.slice(2, -2).map((h) => [h.x, h.y]);
  }
  _onBgDown(t) {
    if (this._pointers.set(t.pointerId, { x: t.clientX, y: t.clientY }), this._pointers.size === 2) {
      const [e, s] = [...this._pointers.values()];
      this._gesture = { type: "pinch", dist: Math.hypot(e.x - s.x, e.y - s.y), view: { ...this._view || this._contentBox() }, moved: !0 }, this._capture(t);
      return;
    }
    this.edit && t.target === t.currentTarget && this._emit("cp-select", null), this.edit && this._connect && (this._connect = null, this._emit("cp-hint", "")), this._gesture = { type: "pan", cx: t.clientX, cy: t.clientY, view: { ...this._view || this._contentBox() }, moved: !1 };
  }
  _onMove(t) {
    this._pointers.has(t.pointerId) && this._pointers.set(t.pointerId, { x: t.clientX, y: t.clientY });
    const e = this._gesture;
    if (e) {
      if (e.type === "pinch" && this._pointers.size === 2) {
        const [s, i] = [...this._pointers.values()], n = e.dist / Math.max(10, Math.hypot(s.x - i.x, s.y - i.y)), o = e.view, a = o.x + o.w / 2, l = o.y + o.h / 2;
        this._view = { x: a - o.w * n / 2, y: l - o.h * n / 2, w: o.w * n, h: o.h * n };
        return;
      }
      if (e.type === "pan") {
        const i = this.renderRoot.querySelector("svg").getBoundingClientRect(), n = Math.max(e.view.w / i.width, e.view.h / i.height), o = (t.clientX - e.cx) * n, a = (t.clientY - e.cy) * n;
        !e.moved && Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 4 && (e.moved = !0, this._capture(t)), e.moved && (this._view = { ...e.view, x: e.view.x - o, y: e.view.y - a });
        return;
      }
      if (e.type === "move") {
        const s = this._svgPoint(t);
        if (Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 3 && (e.moved = !0), !e.moved) return;
        const n = !this.snapGrid || t.altKey ? 1 : Math.max(1, this.gridStep);
        let o = Math.max(0, Math.round((e.ox + (s.x - e.start.x) / $) / n) * n), a = Math.max(0, Math.round((e.oy + (s.y - e.start.y) / $) / n) * n);
        const l = this.snapObjects && !t.altKey ? this._objectSnap(e.comp, e.ox + (s.x - e.start.x) / $, e.oy + (s.y - e.start.y) / $) : null;
        l?.x !== void 0 && (o = l.x), l?.y !== void 0 && (a = l.y), this._guides = { x: l?.gx, y: l?.gy }, this._drag = { id: e.id, dx: Math.max(0, o), dy: Math.max(0, a) };
        return;
      }
      if (e.type === "tap") {
        Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 6 && (this._gesture = { type: "pan", cx: e.cx, cy: e.cy, view: e.view, moved: !0 }, this._capture(t), this._onMove(t));
        return;
      }
      if (e.type === "value") {
        const s = this._svgPoint(t);
        if (Math.abs(t.clientX - e.cx) + Math.abs(t.clientY - e.cy) > 3 && (e.moved = !0), !e.moved) return;
        const i = t.altKey || !this.snapGrid ? 1 : $ / 2, n = e.ox + s.x - e.start.x, o = e.oy + s.y - e.start.y;
        let a = Math.round(n / i) * i, l = Math.round(o / i) * i;
        const d = this.snapObjects && !t.altKey ? this._valueSnap(e.id, e.slot, n, o, e.w, e.h) : null;
        d?.x !== void 0 && (a = d.x), d?.y !== void 0 && (l = d.y), this._guides = { x: d?.gx, y: d?.gy }, this._valueDrag = { id: e.id, slot: e.slot, x: a, y: l };
        return;
      }
      if (e.type === "segment") {
        const s = this._svgPoint(t), i = e.pts[e.index], n = i.x === e.pts[e.index + 1].x, o = (n ? s.x - e.start.x : s.y - e.start.y) / $, a = this.snapGrid && !t.altKey ? Math.max(1, this.gridStep) : 1, d = Math.round(((n ? i.x : i.y) + o) / a) * a - (n ? i.x : i.y);
        if (d === e.delta) return;
        e.delta = d, e.moved = !0, this._emit("cp-segment", { id: e.id, via: this._shiftSegment(e.pts, e.index, d), live: !0 });
        return;
      }
      if (e.type === "bend") {
        const s = this._svgPoint(t);
        e.moved = !0;
        const i = Math.round((e.horizontalStart ? s.x : s.y) / $);
        this._emit("cp-bend", { id: e.id, bend: i, live: !0 });
      }
    }
  }
  _onUp(t) {
    this._pointers.delete(t.pointerId);
    const e = this._gesture;
    if (!(this._pointers.size > 0 && e?.type === "pinch") && (this._gesture = null, this._lastMoved = !!e?.moved, setTimeout(() => this._lastMoved = !1, 0), !!e))
      if (e.type === "move")
        this._guides = {}, e.moved && this._drag ? this._emit("cp-move", { id: e.id, x: this._drag.dx, y: this._drag.dy }) : this._emit("cp-select", { kind: "c", id: e.id }), this._drag = null;
      else if (e.type === "value") {
        this._guides = {};
        const s = this._valueDrag, i = this.plant.components.find((n) => n.id === e.id);
        if (e.moved && s && i) {
          const n = (o) => Math.round(o * 100) / 100;
          this._emit("cp-value-move", { id: e.id, slot: e.slot, pos: [n(s.x / $ - i.x), n(s.y / $ - i.y)] });
        } else
          this._emit("cp-select", { kind: "c", id: e.id });
        this._valueDrag = null;
      } else e.type === "tap" && !e.moved ? this._emit("cp-component-click", { component: e.comp, x: t.clientX, y: t.clientY }) : e.type === "bend" && e.moved ? this._emit("cp-bend", { id: e.id, live: !1 }) : e.type === "segment" && e.moved && this._emit("cp-segment", { id: e.id, live: !1 });
  }
  _onWheel(t) {
    t.preventDefault();
    const e = this._view || this._contentBox(), s = this._svgPoint(t), i = Math.exp(t.deltaY * 15e-4);
    this._view = { x: s.x - (s.x - e.x) * i, y: s.y - (s.y - e.y) * i, w: e.w * i, h: e.h * i };
  }
};
Te.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  edit: { type: Boolean },
  autoHeight: { type: Boolean, attribute: "auto-height" },
  selected: { attribute: !1 },
  version: { type: Number },
  _view: { state: !0 },
  _drag: { state: !0 },
  _valueDrag: { state: !0 },
  _connect: { state: !0 },
  _guides: { state: !0 },
  gridStep: { type: Number },
  showGrid: { type: Boolean },
  snapGrid: { type: Boolean },
  snapObjects: { type: Boolean }
}, Te.styles = rt`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    svg {
      width: 100%;
      height: 100%;
      display: block;
      font-family: var(--cp-font);
    }
    .grid-dot { fill: var(--cp-grid); }
    .grid-bg { pointer-events: none; }

    /* pipes */
    .pipe path { fill: none; stroke-linecap: round; stroke-linejoin: round; }
    .pipe-hit { stroke: transparent; stroke-width: 18; pointer-events: stroke; }
    /* the outline in background colour cuts a gap into pipes drawn earlier: crossings read as bridges */
    .pipe-outline { stroke: var(--cp-surface); stroke-width: 12; }
    .iso-floor-line { fill: none; stroke: var(--cp-iso-floor); stroke-width: 1; }
    .iso-shadows rect { fill: #000; opacity: 0.28; }
    /* 2.5D pipes: a darker body behind, offset like the extrusion, and a highlight on top */
    .pipe-depth { stroke-width: 7; opacity: 0.35; filter: brightness(0.45); transform: translate(4px, -2.5px); }
    .pipe.active .pipe-depth { opacity: 0.8; }
    .pipe-gloss { stroke: #fff; stroke-width: 1.4; opacity: 0.22; transform: translate(-0.8px, -1.2px); }
    .pipes.iso .pipe-base { stroke-width: 6; }
    .pipe-base { stroke-width: 5; opacity: 0.4; transition: opacity 0.6s; }
    .pipe.active .pipe-base { opacity: 1; }
    .pipe-halo { stroke-width: 12; opacity: 0.12; }
    .pipe-flow {
      stroke: var(--cp-flow);
      stroke-width: 2.6;
      stroke-dasharray: 2 13;
      animation: cp-flow 0.9s linear infinite;
    }
    .pipe-sel { stroke: var(--cp-select); stroke-width: 18; opacity: 0.35; }
    @keyframes cp-flow { to { stroke-dashoffset: -15; } }
    /* internal pipes: offset = one dash period (2 + 9), otherwise the dots jump each loop */
    @keyframes cp-iflow { to { stroke-dashoffset: -11; } }

    /* component artwork */
    .comp { cursor: default; }
    svg.edit .comp { cursor: grab; }
    svg.edit .chip, svg.edit .pill, svg.edit .apill { cursor: move; }
    .comp-hit { fill: transparent; }
    .sel-outline { fill: none; stroke: var(--cp-select); stroke-width: 2; stroke-dasharray: 6 4; pointer-events: none; }
    .comp-label {
      fill: var(--cp-text); font-size: 13px; font-weight: 600; letter-spacing: 0.2px; pointer-events: none;
      paint-order: stroke; stroke: var(--cp-surface); stroke-width: 4px; stroke-linejoin: round;
    }
    .casing { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.5; }
    .casing.light { fill: var(--cp-casing-light); }
    .sheen { fill: var(--cp-sheen); pointer-events: none; }
    .foot { fill: var(--cp-casing-stroke); }
    .grille-bg { fill: var(--cp-grille-bg); }
    .grille { fill: none; stroke: var(--cp-grille); stroke-width: 1.4; }
    .fan path { fill: var(--cp-fan); }
    .hub { fill: var(--cp-casing-stroke); }
    .vent { fill: var(--cp-grille); }
    .tag { fill: var(--cp-muted); font-size: 10px; font-weight: 700; letter-spacing: 1px; }
    .frost { fill: rgba(150, 205, 255, 0.28); stroke: rgba(180, 225, 255, 0.8); stroke-width: 2; }
    .snow line, .snow path { stroke: #e8f6ff; stroke-width: 2.2; stroke-linecap: round; fill: none; }
    .alarm-ring { fill: none; stroke: #ff4d4d; stroke-width: 3; animation: cp-pulse 1s ease-in-out infinite; }
    .ground { fill: var(--cp-ground); }
    .probe { fill: none; stroke: var(--cp-muted); stroke-width: 2; }
    .probe.active { stroke: #38d0ff; }
    .screen { fill: var(--cp-screen); }
    .screen-text { fill: #d8f3e8; font-size: 10px; font-weight: 600; }
    .internal { fill: none; stroke-width: 3; opacity: 0.55; }
    .rod { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); }
    .rod.hot { fill: #4a2412; stroke: #ff8a3d; }
    .coil { fill: none; stroke: var(--cp-muted); stroke-width: 2; }
    .coil.hot { stroke: #ffb35c; }
    .aux-glow { fill: rgba(255, 138, 61, 0.22); }
    .insulation { fill: var(--cp-insulation); stroke: var(--cp-casing-stroke); stroke-width: 1; }
    .tank-fill { opacity: 0.92; }
    .tank-glass { fill: rgba(255, 255, 255, 0.18); }
    .tank-coil { fill: none; stroke: rgba(255, 255, 255, 0.55); stroke-width: 2.5; }
    /* offset = one dash period (4 + 6), at the same speed as the pipes (15 px/s) */
    .tank-coil.hot { stroke: #fff; stroke-dasharray: 4 6; animation: cp-coil 0.667s linear infinite; }
    @keyframes cp-coil { to { stroke-dashoffset: -10; } }
    .strat { stroke: rgba(255, 255, 255, 0.35); stroke-width: 1; stroke-dasharray: 3 4; }
    .tank-label { fill: rgba(255, 255, 255, 0.92); font-size: 12px; font-weight: 700; text-shadow: 0 1px 2px rgba(0,0,0,0.4); }
    .tank-badge { fill: #fff; font-size: 11px; font-weight: 800; }
    .pump-body { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.5; }
    .pump-body.on { stroke: var(--cp-accent); }
    .pump-tri { fill: var(--cp-muted); opacity: 0.5; }
    .pump-tri.on { fill: var(--cp-accent); opacity: 0.9; }
    .pump-glow { fill: var(--cp-accent); opacity: 0.18; }
    .impeller { fill: none; stroke: var(--cp-text); stroke-width: 2; stroke-dasharray: 4 3; opacity: 0.7; }
    .valve-tri { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.4; }
    .valve-tri.on { fill: var(--cp-accent); stroke: var(--cp-accent); opacity: 0.85; }
    .actuator { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); }
    .stem { stroke: var(--cp-casing-stroke); stroke-width: 2; }
    .valve-tag {
      fill: var(--cp-accent); font-size: 12px; font-weight: 800;
      paint-order: stroke; stroke: var(--cp-surface); stroke-width: 3px; stroke-linejoin: round;
    }
    .rad-frame { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); }
    .shower-jet { stroke: #6cc4ff; stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 3 5; animation: cp-jet 0.53s linear infinite; opacity: 0.85; }
    @keyframes cp-jet { to { stroke-dashoffset: -16; } }
    .shower-hole { fill: var(--cp-muted); }
    /* mirrored parts keep their texts readable */
    .flipped text { transform-box: fill-box; transform-origin: center; transform: scaleX(-1); }
    .rad-stub { stroke: var(--cp-casing-stroke); stroke-width: 4; stroke-linecap: round; }
    .building { pointer-events: none; }
    .building .outside { fill: var(--cp-bld-outside); }
    .building .ground { fill: var(--cp-bld-ground); }
    .building .floor-line { stroke: var(--cp-bld-line); stroke-width: 3; }
    .building .wall, .building .slab { fill: var(--cp-bld-wall); stroke: var(--cp-bld-line); stroke-width: 1; }
    .building .room { fill: var(--cp-muted); font-size: 12px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; opacity: 0.7; }
    .rad-header { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); stroke-width: 1; }
    .fin { stroke: rgba(255, 255, 255, 0.15); }
    .heat-wave { fill: none; stroke: #ff8a3d; stroke-width: 2; stroke-linecap: round; opacity: 0; animation: cp-rise 2.4s ease-in infinite; }
    .floor-slab { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); }
    .tap-body { fill: var(--cp-casing-light); stroke: var(--cp-casing-stroke); stroke-width: 1.4; }
    .tap-handle { fill: var(--cp-casing-stroke); }
    .drop { fill: #38d0ff; animation: cp-drop 0.75s linear infinite; }
    .magnet { fill: none; stroke: #e5484d; stroke-width: 3; }
    .sieve { stroke: var(--cp-muted); stroke-width: 1; }
    .vessel { fill: #c8343b; stroke: #8e1f25; }
    .junction { fill: var(--cp-text); }
    .user-glow { fill: var(--cp-accent); opacity: 0.12; }
    .free-label { fill: var(--cp-text); font-weight: 700; }
    .tile { fill: var(--cp-chip); stroke: var(--cp-chip-stroke); }
    .tile-title { fill: var(--cp-text); font-size: 13px; font-weight: 700; }
    .tile-label { fill: var(--cp-muted); font-size: 12px; }
    .tile-value { fill: var(--cp-text); font-size: 13px; font-weight: 700; }
    .tile-row { cursor: pointer; }

    /* chips */
    .chip { cursor: pointer; }
    .chip rect:first-child { fill: var(--cp-chip); stroke: var(--cp-chip-stroke); transition: fill 0.2s; }
    .chip:hover rect:first-child { fill: var(--cp-chip-hover); }
    .chip-label { fill: var(--cp-muted); font-size: 9.5px; }
    .chip-value { fill: var(--cp-text); font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .chip-unit { fill: var(--cp-muted); font-size: 10px; font-weight: 500; }
    .chip.na .chip-value { fill: var(--cp-muted); }
    .apill { cursor: pointer; }
    .apill rect { fill: var(--cp-chip); stroke-width: 1.4; }
    .apill text { fill: var(--cp-text); font-size: 11.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .apill-label { fill: var(--cp-muted); font-weight: 600; font-size: 10px; }
    .ipipe { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; opacity: 0.85; }
    .ipipe-flow { fill: none; stroke: var(--cp-flow); stroke-width: 1.8; stroke-dasharray: 2 9; animation: cp-iflow 0.66s linear infinite; }
    .itag { fill: var(--cp-muted); font-size: 8.5px; font-weight: 700; }
    .itag.halo { paint-order: stroke; stroke: var(--cp-surface); stroke-width: 3px; stroke-linejoin: round; }
    .tank-in { opacity: 0.55; stroke: var(--cp-casing-stroke); }
    .compressor { fill: var(--cp-casing); stroke: var(--cp-casing-stroke); stroke-width: 1.5; }
    .dip { fill: none; stroke: rgba(255, 255, 255, 0.45); stroke-width: 2.5; stroke-dasharray: 5 4; }
    .pill { cursor: pointer; }
    .pill rect { fill: rgba(10, 14, 20, 0.62); stroke: rgba(255, 255, 255, 0.25); }
    .pill text { fill: #fff; font-size: 12.5px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .pill .chip-unit { fill: rgba(255, 255, 255, 0.75); font-size: 9.5px; }

    /* edit */
    .port { fill: var(--cp-port); stroke: var(--cp-bg); stroke-width: 2; cursor: crosshair; }
    .port:hover, .port.src { fill: var(--cp-select); r: 8; }
    .port.target { fill: var(--cp-accent); }
    .bend-handle { fill: var(--cp-select); stroke: var(--cp-bg); stroke-width: 2; }
    .grid-line { fill: none; stroke: var(--cp-grid); stroke-width: 1; }
    .grid-line.major { stroke-width: 1.6; opacity: 1.6; }
    .guides line { stroke: var(--cp-accent); stroke-width: 1.5; stroke-dasharray: 6 4; pointer-events: none; }
    .bend-handle.ew { cursor: ew-resize; }
    .bend-handle.ns { cursor: ns-resize; }

    /* animation helpers */
    /* spinning parts are drawn around their local origin (0,0); rotate exactly there, not around the bbox centre */
    .spin { animation: cp-spin var(--dur, 1.2s) linear infinite; transform-box: view-box; transform-origin: 0 0; }
    .pulse { animation: cp-pulse 2.2s ease-in-out infinite; }
    @keyframes cp-spin { to { transform: rotate(360deg); } }
    @keyframes cp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
    @keyframes cp-rise { 0% { opacity: 0; transform: translateY(6px); } 40% { opacity: 0.8; } 100% { opacity: 0; transform: translateY(-10px); } }
    @keyframes cp-drop { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(18px); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .spin, .pulse, .pipe-flow, .heat-wave, .drop, .tank-coil.hot { animation: none; }
    }
  `;
let Ms = Te;
customElements.get("cp-schematic") || customElements.define("cp-schematic", Ms);
const Oe = class Oe extends st {
  constructor() {
    super(...arguments), this.points = [], this.color = "var(--cp-accent)", this.step = !1;
  }
  render() {
    const t = this.points.filter((u) => u.v !== null);
    if (t.length < 2) return f`<div class="empty">${c("ov.no_history")}</div>`;
    const e = 300, s = 90, i = t[0].t, n = t[t.length - 1].t;
    let o = Math.min(...t.map((u) => u.v)), a = Math.max(...t.map((u) => u.v));
    a - o < 1e-6 && (a += 1, o -= 1);
    const l = (a - o) * 0.1;
    o -= l, a += l;
    const d = (u) => (u - i) / Math.max(1, n - i) * e, p = (u) => s - (u - o) / (a - o) * s;
    let h = `M ${d(t[0].t)} ${p(t[0].v)}`;
    for (let u = 1; u < t.length; u++)
      this.step ? h += ` H ${d(t[u].t)} V ${p(t[u].v)}` : h += ` L ${d(t[u].t)} ${p(t[u].v)}`;
    const m = `${h} L ${e} ${s} L 0 ${s} Z`;
    return f`<svg viewBox="0 0 ${e} ${s}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${S`<path d=${m} fill="url(#sg)" /><path d=${h} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }
};
Oe.properties = { points: { attribute: !1 }, color: {}, step: { type: Boolean } }, Oe.styles = rt`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
let zs = Oe;
const He = class He extends st {
  constructor() {
    super(...arguments), this.canWrite = !1, this.demo = !1, this._draft = null, this._confirm = !1, this._wmsg = "", this._busy = !1, this.slotKey = "", this.x = 0, this.y = 0, this.version = 0, this._hist = null, this._loadedFor = "";
  }
  updated() {
    const t = `${this.component?.id}:${this.slotKey}`;
    t !== this._loadedFor && this.component && (this._loadedFor = t, this._hist = null, this._draft = null, this._confirm = !1, this._wmsg = "", this.src.history(this.component, this.slotKey, 24).then(
      (e) => this._hist = e,
      () => this._hist = []
    ));
  }
  _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  _more(t) {
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: t }, bubbles: !0, composed: !0 })), this._close();
  }
  /** Change control for values released as writable. */
  _writer() {
    const t = this.component, e = t.bindings?.[this.slotKey], s = gn(e);
    if (!e || !s || !(t.writable || []).includes(this.slotKey)) return y;
    if (this.demo) return f`<div class="w muted small">${c("wr.demo")}</div>`;
    if (!this.canWrite) return f`<div class="w muted small">${c("wr.no_permission")}</div>`;
    const i = this.hass?.states[e], n = i?.attributes || {}, o = i?.state, a = this._draft ?? (s === "number" ? Number(o) : s === "switch" ? o === "on" : o ?? null), l = (m) => typeof m == "boolean" ? c(m ? "wr.on" : "wr.off") : s === "number" ? `${G(Number(m), 1)} ${n.unit_of_measurement || ""}` : String(m), d = s === "button" || String(a) !== String(s === "switch" ? o === "on" : s === "number" ? Number(o) : o), p = async () => {
      this._busy = !0;
      try {
        await this.writer(t.id, this.slotKey, s === "button" ? null : a), this._wmsg = c("wr.done"), this._draft = null;
      } catch (m) {
        this._wmsg = `${c("wr.failed")}: ${m?.message || m}`;
      } finally {
        this._busy = !1, this._confirm = !1;
      }
    };
    let h;
    if (s === "number") {
      const m = Number(n.min ?? 0), u = Number(n.max ?? 100), _ = Number(n.step ?? 1);
      h = f`<div class="wrow">
        <input type="range" min=${m} max=${u} step=${_} .value=${String(a)} @input=${(w) => this._draft = Number(w.target.value)} />
        <input class="wnum" type="number" min=${m} max=${u} step=${_} .value=${String(a)} @change=${(w) => this._draft = Number(w.target.value)} />
        <span class="muted">${n.unit_of_measurement || ""}</span></div>`;
    } else s === "select" ? h = f`<select @change=${(m) => this._draft = m.target.value}>
        ${(n.options || []).map((m) => f`<option value=${m} ?selected=${m === a}>${m}</option>`)}</select>` : s === "switch" ? h = f`<label class="wsw"><input type="checkbox" .checked=${!!a} @change=${(m) => this._draft = m.target.checked} /> ${c(a ? "wr.on" : "wr.off")}</label>` : h = y;
    return f`<div class="w">
      <div class="cap">${c("wr.title")}</div>
      ${h}
      ${this._confirm ? f`<div class="wconfirm">
            <div>${s === "button" ? c("wr.press_confirm") : c("wr.confirm", { old: l(s === "switch" ? o === "on" : o), new: l(a) })}</div>
            <div class="row"><button @click=${() => this._confirm = !1}>${c("cancel")}</button><span class="spacer"></span>
              <button class="primary" ?disabled=${this._busy} @click=${p}>${B("check")} ${c("wr.apply")}</button></div>
          </div>` : f`<div class="row"><span class="spacer"></span>
            <button class="primary" ?disabled=${!d} @click=${() => this._confirm = !0}>${c(s === "button" ? "wr.press" : "wr.change")}</button></div>`}
      ${this._wmsg ? f`<div class="muted small">${this._wmsg}</div>` : y}
    </div>`;
  }
  render() {
    if (!this.component) return y;
    const t = this.component, e = ae(t, this.slotKey), s = this.src.get(t, this.slotKey), { text: i, unit: n } = Bt(s, e), o = this.src.entityOf(t, this.slotKey), a = this._hist || [], l = a.map((_) => _.v).filter((_) => _ !== null), d = e === "temp" && s?.num !== null && s?.num !== void 0 ? gt(s.num, "#3ddc97") : "var(--cp-accent)", p = 320, h = Math.max(12, Math.min(window.innerWidth - p - 12, this.x - p / 2)), m = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14)), u = t.type === "value_tile" ? this.slotKey : Pt(t.type, this.slotKey);
    return f`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${h}px; top:${m}px; width:${p}px">
        <div class="row head">
          <div>
            <div class="title">${u}</div>
            <div class="muted sub">${t.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${c("close")}>${B("close")}</button>
        </div>
        <div class="now"><span class="val">${i}</span><span class="unit">${n}</span></div>
        <div class="muted cap">${c("ov.history24")}</div>
        ${this._hist === null ? f`<div class="loading"></div>` : f`<cp-sparkline .points=${a} .color=${d} .step=${e === "bool"}></cp-sparkline>`}
        ${l.length && e !== "bool" && e !== "enum" ? f`<div class="row stats">
              <span>${c("ov.min")} <b>${G(Math.min(...l))}</b></span>
              <span>${c("ov.max")} <b>${G(Math.max(...l))}</b></span>
            </div>` : y}
        ${this._writer()}
        ${o ? f`<div class="row foot"><code>${o}</code><span class="spacer"></span>
              <button @click=${() => this._more(o)}>${c("ov.open_entity")}</button></div>` : y}
      </div>
    `;
  }
};
He.properties = {
  component: { attribute: !1 },
  slotKey: {},
  src: { attribute: !1 },
  x: { type: Number },
  y: { type: Number },
  version: { type: Number },
  hass: { attribute: !1 },
  writer: { attribute: !1 },
  canWrite: { type: Boolean },
  demo: { type: Boolean },
  _hist: { state: !0 },
  _draft: { state: !0 },
  _confirm: { state: !0 },
  _wmsg: { state: !0 },
  _busy: { state: !0 }
}, He.styles = [
  _t,
  rt`
      .backdrop { position: fixed; inset: 0; z-index: 30; }
      .pop { position: fixed; z-index: 31; box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45); padding: 14px; animation: pop 0.14s ease-out; }
      @keyframes pop { from { opacity: 0; transform: translateY(4px) scale(0.98); } }
      .head { flex-wrap: nowrap; align-items: flex-start; }
      .title { font-weight: 700; font-size: 15px; }
      .sub { font-size: 12px; }
      .now { margin: 8px 0 10px; }
      .val { font-size: 30px; font-weight: 800; font-variant-numeric: tabular-nums; }
      .unit { font-size: 15px; color: var(--cp-muted); margin-left: 4px; }
      .cap { font-size: 11px; margin-bottom: 4px; }
      .stats { gap: 16px; font-size: 12px; color: var(--cp-muted); margin-top: 6px; }
      .stats b { color: var(--cp-text); }
      .foot { margin-top: 10px; font-size: 11px; flex-wrap: nowrap; }
      code { color: var(--cp-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .w { margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--cp-border); display: grid; gap: 8px; }
      .wrow { display: flex; gap: 8px; align-items: center; }
      .wrow input[type="range"] { flex: 1; }
      .wnum { width: 76px; }
      .wsw { display: flex; gap: 8px; align-items: center; font-size: 13px; }
      .wsw input { width: auto; margin: 0; }
      .wconfirm { display: grid; gap: 8px; padding: 10px; border-radius: 10px; font-size: 13px;
        background: color-mix(in srgb, var(--cp-warn) 14%, transparent); border: 1px solid color-mix(in srgb, var(--cp-warn) 45%, transparent); }
      .small { font-size: 12px; }
      .loading { height: 90px; border-radius: 8px; background: linear-gradient(90deg, var(--cp-surface-2), var(--cp-surface), var(--cp-surface-2)); background-size: 200% 100%; animation: sh 1.2s infinite; }
      @keyframes sh { to { background-position: -200% 0; } }
    `
];
let As = He;
const hr = { info: "info", notice: "notice", warning: "warn", error: "error" };
function ur(r) {
  const t = { ...r.params };
  return t.label_sfx = t.label ? ` (${t.label})` : "", r.key === "value_changed" && (t.slot_label = t.type ? Pt(t.type, t.slot) : t.slot), r.key === "maintenance_due" && (t.task = t.task_key ? c(`mt.${t.task_key}`) : t.title), c(`msgk.${r.key}`, t);
}
const Ve = class Ve extends st {
  constructor() {
    super(...arguments), this.messages = [], this.compact = !1, this.canClear = !1, this._filter = "all";
  }
  _row(t) {
    const e = t.end_ts ? t.end_ts - t.ts : null;
    return f`<li class="msg ${t.level} ${t.active ? "active" : ""}">
      <span class="lv">${B(hr[t.level] || "info")}</span>
      <div class="body">
        <div class="text">${ur(t)}</div>
        <div class="meta">
          ${eo(t.ts)}
          ${t.active ? f` · <b>${c("msg.active")}</b>` : e !== null ? f` · ${c("msg.duration", { duration: so(e) })}` : y}
        </div>
      </div>
    </li>`;
  }
  render() {
    const t = [...this.messages].sort((n, o) => o.ts - n.ts), e = this._filter === "all" ? t : t.filter((n) => n.level === this._filter), s = e.filter((n) => n.active), i = e.filter((n) => !n.active).slice(0, this.compact ? 12 : 300);
    return f`
      ${this.compact ? y : f`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
      (n) => f`<button class=${this._filter === n ? "primary" : ""} @click=${() => this._filter = n}>
                ${c(n === "all" ? "msg.filter_all" : `msg.level.${n}`)}</button>`
    )}
            <span class="spacer"></span>
            ${this.canClear ? f`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${B("trash")} ${c("msg.clear")}</button>` : y}
          </div>`}
      ${s.length ? f`<h4>${c("msg.active")}</h4><ul>${s.map((n) => this._row(n))}</ul>` : y}
      <h4>${c("msg.history")}</h4>
      ${i.length ? f`<ul>${i.map((n) => this._row(n))}</ul>` : f`<div class="empty muted">${c("msg.empty")}</div>`}
    `;
  }
};
Ve.properties = {
  messages: { attribute: !1 },
  compact: { type: Boolean },
  canClear: { type: Boolean },
  _filter: { state: !0 }
}, Ve.styles = [
  _t,
  rt`
      :host { display: block; }
      .filters { margin-bottom: 8px; }
      h4 { margin: 12px 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); }
      ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
      .msg { display: flex; gap: 10px; padding: 9px 10px; border-radius: 11px; background: var(--cp-surface-2); border: 1px solid var(--cp-border); }
      .msg .lv { color: var(--cp-info); display: flex; padding-top: 1px; }
      .msg.notice .lv { color: var(--cp-notice); }
      .msg.warning .lv { color: var(--cp-warn); }
      .msg.error .lv { color: var(--cp-error); }
      .msg.active { border-color: color-mix(in srgb, currentColor 0%, var(--cp-border)); box-shadow: inset 3px 0 0 var(--cp-info); }
      .msg.active.notice { box-shadow: inset 3px 0 0 var(--cp-notice); }
      .msg.active.warning { box-shadow: inset 3px 0 0 var(--cp-warn); }
      .msg.active.error { box-shadow: inset 3px 0 0 var(--cp-error); background: color-mix(in srgb, var(--cp-error) 10%, var(--cp-surface-2)); }
      .text { font-size: 13px; font-weight: 600; line-height: 1.35; }
      .meta { font-size: 11px; color: var(--cp-muted); margin-top: 2px; }
      .empty { font-size: 13px; padding: 8px 2px; }
    `
];
let Es = Ve;
customElements.get("cp-sparkline") || customElements.define("cp-sparkline", zs);
customElements.get("cp-slot-popover") || customElements.define("cp-slot-popover", As);
customElements.get("cp-messages") || customElements.define("cp-messages", Es);
const mr = [1, 10, 60, 300, 900], Ni = "copilot.explain", Ri = "copilot.energy", fr = {
  heat: "#ff8a3d",
  dhw: "#ff4f8b",
  cold: "#6cc4ff",
  warn: "var(--cp-warn)",
  error: "var(--cp-error)",
  eco: "#3ddc97",
  info: "var(--cp-muted)"
};
function Ii(r) {
  try {
    return localStorage.getItem(r);
  } catch {
    return null;
  }
}
function ji(r, t) {
  try {
    localStorage.setItem(r, t);
  } catch {
  }
}
const Be = class Be extends st {
  constructor() {
    super(...arguments), this.admin = !0, this.icons = /* @__PURE__ */ new Map(), this.messages = [], this.sim = null, this.version = 0, this.narrow = !1, this.showDemo = !0, this.showKpis = !0, this.showSide = !0, this._pop = null, this._side = !0, this._explain = Ii(Ni) === "1", this._energy = Ii(Ri) !== "0", this._comp = null, this._tm = null, this._tmBusy = !1, this._tick = 0, this._raf = 0, this._last = 0, this._drawn = 0;
  }
  _toggleExplain() {
    this._explain = !this._explain, ji(Ni, this._explain ? "1" : "0");
  }
  /** values shown right now: live, or the recorded state at the replay time */
  get _src() {
    return this._tm?.src ?? this.src;
  }
  async _openTm(t = 24) {
    if (!this._tmBusy) {
      this._tmBusy = !0;
      try {
        const e = this.sim ? Math.min(t, 24) : t, s = await Js.load(this.plant, this.src, e, this.hass);
        s.t = s.start, this._tm = { src: s, playing: !1, speed: this._tm?.speed ?? 900, hours: e, strip: this._modeStrip(s) };
      } catch (e) {
        console.error("COPilot: history could not be loaded", e);
      } finally {
        this._tmBusy = !1;
      }
    }
  }
  _closeTm() {
    cancelAnimationFrame(this._raf), this._tm = null;
  }
  /** Operating mode along the replay range, for the strip under the slider. */
  _modeStrip(t) {
    const e = this._first("outdoor_unit");
    if (!e) return [];
    const s = 240, i = t.start, n = Math.max(1, t.to - i), o = t.t, a = [];
    for (let l = 0; l < s; l++) {
      t.t = i + n * (l + 0.5) / s;
      const d = kt(e, t), p = Qt(t.get(e, "activity")), h = d.has("defrost") ? "defrost" : p === "hot_water" ? "hot_water" : d.has("running") ? p && p !== "off" ? p : "heating" : "off", m = a[a.length - 1];
      m && m.mode === h ? m.w += 1 / s : a.push({ x: l / s, w: 1 / s, mode: h });
    }
    return t.t = o, a;
  }
  _play() {
    const t = this._tm;
    if (t && (t.src.t >= t.src.to - 1 && (t.src.t = t.src.start), t.playing = !t.playing, this._tm = { ...t }, t.playing)) {
      this._last = performance.now();
      const e = (s) => {
        const i = this._tm;
        if (!i?.playing) return;
        const n = Math.min(0.25, (s - this._last) / 1e3);
        this._last = s, i.src.t = Math.min(i.src.to, i.src.t + n * i.speed), i.src.t >= i.src.to && (this._tm = { ...i, playing: !1 }), s - this._drawn > 100 && (this._drawn = s, this._tick++), this._raf = requestAnimationFrame(e);
      };
      this._raf = requestAnimationFrame(e);
    }
  }
  _seek(t) {
    this._tm && (this._tm.src.t = t, this._tick++);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), cancelAnimationFrame(this._raf);
  }
  _tmBar() {
    const t = this._tm;
    if (!t) return y;
    const e = t.src, s = e.start, n = new Date(e.t * 1e3).toLocaleString(void 0, { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }), o = { heating: "#ff8a3d", hot_water: "#ff4f8b", defrost: "#6cc4ff", compressor_alarm: "#ff5a5f", off: "transparent" };
    return f`<div class="tm">
      <button class="icon" title=${t.playing ? c("tm.pause") : c("tm.play")} @click=${this._play}>${B(t.playing ? "pause" : "play")}</button>
      <div class="tm-track">
        <input type="range" min=${s} max=${e.to} step="60" .value=${String(e.t)}
          @input=${(a) => this._seek(Number(a.target.value))} aria-label=${c("tm.title")} />
        <svg class="strip" viewBox="0 0 1 1" preserveAspectRatio="none">
          ${t.strip.map((a) => S`<rect x=${a.x} y="0" width=${a.w + 1e-3} height="1" fill=${o[a.mode] ?? "#8b949e"} />`)}
        </svg>
      </div>
      <span class="tm-time">${n}</span>
      <select title=${c("tm.speed")} @change=${(a) => this._tm = { ...t, speed: Number(a.target.value) }}>
        ${[300, 900, 1800, 3600].map((a) => f`<option value=${a} ?selected=${t.speed === a}>${c("tm.speed_v", { min: a / 60 })}</option>`)}
      </select>
      ${this.sim ? y : f`<select title=${c("tm.range")} @change=${(a) => this._openTm(Number(a.target.value))}>
            ${[6, 24, 72].map((a) => f`<option value=${a} ?selected=${t.hours === a}>${c("tm.hours", { h: a })}</option>`)}
          </select>`}
      <button class="live" @click=${this._closeTm}>${c("tm.live")}</button>
    </div>`;
  }
  _toggleEnergy() {
    this._energy = !this._energy, ji(Ri, this._energy ? "1" : "0");
  }
  _onComponent(t) {
    this._explain && (this._comp = t.detail);
  }
  _explainPanel() {
    const t = Oo(this.plant, this._src);
    return f`<div class="side-head"><b>${c("ex.title")}</b></div>
      ${t.length ? f`<ul class="explain">
            ${t.map(
      (e) => f`<li style="--tone:${fr[e.tone]}">
                <span class="dot"></span>
                <div>
                  <div>${c(e.key, e.params)}</div>
                  ${e.hint ? f`<div class="ex-hint">${c(e.hint, e.params)}</div>` : y}
                </div>
              </li>`
    )}
          </ul>` : f`<p class="muted">${c("ex.empty")}</p>`}
      <p class="ex-tip">${B("info")} ${c("ex.tap_hint")}</p>`;
  }
  _compPop() {
    const t = this._comp;
    if (!t) return y;
    const e = Ho(t.component, this._src), s = 300, i = Math.max(12, Math.min(window.innerWidth - s - 12, t.x - s / 2)), n = Math.max(12, Math.min(window.innerHeight - 200, t.y + 14));
    return f`<div class="backdrop" @pointerdown=${() => this._comp = null}></div>
      <div class="cpop card" style="left:${i}px; top:${n}px; width:${s}px">
        <div class="row cpop-head">
          <div>
            <div class="cpop-title">${t.component.label || c(`type.${t.component.type}`)}</div>
            <div class="muted cpop-sub">${c(`type.${t.component.type}`)}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${() => this._comp = null} aria-label=${c("close")}>${B("close")}</button>
        </div>
        ${e.role ? f`<p>${c(e.role, e.params)}</p>` : y}
        ${e.state ? f`<p class="cpop-state">${c(e.state, e.params)}</p>` : y}
      </div>`;
  }
  _first(t) {
    return this.plant.components.find((e) => e.type === t);
  }
  _num(t, e) {
    if (!t) return;
    const s = this._src.get(t, e);
    return s?.available && s.num !== null ? s.num : void 0;
  }
  _kpis() {
    const t = this._first("outdoor_unit"), e = this._first("indoor_unit"), s = this._first("dhw_tank"), i = this.plant.components.find((w) => w.type === "radiators" || w.type === "floor_heating"), n = this.plant.components.find((w) => w.type === "valve_3way" && w.props.role === "dhw_switch");
    let o = t ? Qt(this._src.get(t, "activity")) : void 0;
    if (!o && t) {
      const w = kt(t, this._src), b = n ? kt(n, this._src) : /* @__PURE__ */ new Set();
      o = w.has("running") ? b.has("b") ? "hot_water" : "heating" : "off";
    }
    const a = {
      heating: "#ff8a3d",
      hot_water: "#ff4f8b",
      defrost: "#6cc4ff",
      compressor_alarm: "#ff5a5f",
      off: "#8a97a6"
    }, l = this._num(t, "heat_power");
    let d = this._num(t, "el_power");
    const p = t ? this._src.get(t, "el_power")?.unit : void 0;
    d !== void 0 && p === "kW" && (d *= 1e3);
    const h = l !== void 0 && d !== void 0 && d > 50 && l > 0.2 ? l / (d / 1e3) : void 0, m = (w, b = 1) => w === void 0 ? "–" : G(w, b), u = xn(this.plant, this._src), _ = [
      { key: "mode", label: c("kpi.mode"), value: o ? c(`mode.${o}`) : "–", unit: "", color: a[o || "off"] },
      { key: "out", label: c("kpi.outdoor"), value: m(this._num(t, "outdoor_temp")), unit: "°C", comp: t, slot: "outdoor_temp" },
      { key: "heat", label: c("kpi.heat"), value: m(l), unit: "kW", comp: t, slot: "heat_power" },
      { key: "power", label: c("kpi.power"), value: d === void 0 ? "–" : d >= 1e3 ? G(d / 1e3, 2) : G(d, 0), unit: d !== void 0 && d >= 1e3 ? "kW" : "W", comp: t, slot: "el_power" },
      {
        key: "cop",
        label: c("kpi.cop"),
        value: m(h),
        unit: "",
        color: u ? Lt[u.ampel] : void 0,
        sub: u ? `${c("kpi.target")} ${m(u.expected)}` : void 0
      },
      {
        key: "supply",
        label: c("kpi.supply"),
        value: m(this._num(e, "supply_temp")),
        unit: "°C",
        color: gt(this._num(e, "supply_temp"), ""),
        sub: this._num(e, "target_flow_temp") !== void 0 ? `${c("kpi.target")} ${m(this._num(e, "target_flow_temp"))}` : void 0,
        comp: e,
        slot: "supply_temp"
      }
    ];
    return s && _.push({ key: "dhw", label: c("kpi.dhw"), value: m(this._num(s, "temp_top")), unit: "°C", color: gt(this._num(s, "temp_top"), ""), comp: s, slot: "temp_top" }), i && this._num(i, "room_temp") !== void 0 && _.push({ key: "room", label: c("kpi.room"), value: m(this._num(i, "room_temp")), unit: "°C", comp: i, slot: "room_temp" }), _;
  }
  _openPop(t) {
    this._pop = t.detail;
  }
  _scenario(t) {
    this.dispatchEvent(new CustomEvent("scenario", { detail: t, bubbles: !0, composed: !0 }));
  }
  _demoBar() {
    const t = this.sim;
    if (!t || !this.showDemo) return y;
    const e = ["winter", "transition", "shower", "defrost", "dim14a", "pv", "disinfect", "fault", "reset"], s = { dim14a: t.dim14a, pv: t.pv, fault: t.fault, disinfect: t.disinfect };
    return f`<div class="demo">
      <span class="demo-tag">${B("flask")} ${c("demo.active")}</span>
      <span class="clock" title=${c("demo.time")}>${un(t.time)}</span>
      <label class="ctl">${c("demo.speed")}
        <select @change=${(i) => t.speed = Number(i.target.value)}>
          ${mr.map((i) => f`<option value=${i} ?selected=${t.speed === i}>${i}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${c("demo.outdoor")} <b>${G(t.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(t.outdoorMean)}
          @input=${(i) => t.outdoorMean = Number(i.target.value)} />
      </label>
      ${this.narrow ? f`<select class="scn-select" @change=${(i) => {
      const n = i.target;
      n.value && this._scenario(n.value), n.value = "";
    }}>
            <option value="">${c("demo.scenarios")} …</option>
            ${e.map((i) => f`<option value=${i}>${s[i] ? "✓ " : ""}${c(`scn.${i}`)}</option>`)}
          </select>` : f`<div class="scn">
            ${e.map(
      (i) => f`<button class=${s[i] ? "primary" : ""} @click=${() => this._scenario(i)}>${c(`scn.${i}`)}</button>`
    )}
          </div>`}
    </div>`;
  }
  render() {
    if (!this.plant) return y;
    const t = this._kpis(), e = Bo(this.plant, this._tm ? null : this.sim), s = this.messages.filter((i) => i.active && (i.level === "warning" || i.level === "error")).length;
    return f`
      ${this._tm ? y : this._demoBar()}
      ${this.showKpis ? f`<div class="kpis">
        ${t.map(
      (i) => f`<button class="kpi" ?disabled=${!i.comp} @click=${(n) => i.comp && (this._pop = { component: i.comp, slot: i.slot, x: n.clientX, y: n.clientY })}>
            <span class="k-label">${i.label}</span>
            <span class="k-value" style=${i.color ? `color:${i.color}` : ""}>${i.value}<small>${i.unit}</small></span>
            ${i.sub ? f`<span class="k-sub">${i.sub}</span>` : y}
          </button>`
    )}
      </div>` : y}
      ${e && this._energy ? f`<div class="energy card"><cp-energy .flow=${No(this.plant, this._src, this._tm ? null : this.sim)}></cp-energy></div>` : y}
      <div class="main ${this._explain || this._side && this.showSide ? "with-side" : ""}">
        <div class="stage card">
          <cp-schematic
            ?auto-height=${this.narrow}
            .plant=${this.plant}
            .src=${this._src}
            .icons=${this.icons}
            .version=${this.version * 1e5 + this._tick}
            @cp-slot-click=${this._openPop}
            @cp-component-click=${this._onComponent}
          ></cp-schematic>
          ${this._tmBar()}
          <div class="zoom">
            ${e ? f`<button class="icon ${this._energy ? "on" : ""}" title=${c("en.toggle")} aria-pressed=${this._energy ? "true" : "false"} @click=${this._toggleEnergy}>${B("bolt")}</button>` : y}
            <button class="icon ${this._tm ? "on" : ""} ${this._tmBusy ? "busy" : ""}" title=${c("tm.title")} aria-pressed=${this._tm ? "true" : "false"}
              @click=${() => this._tm ? this._closeTm() : this._openTm()}>${B("history")}</button>
            <button class="icon ${this._explain ? "on" : ""}" title=${c("ex.toggle")} aria-pressed=${this._explain ? "true" : "false"} @click=${this._toggleExplain}>${B("info")}</button>
            <button class="icon" title=${c("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${B("plus")}</button>
            <button class="icon" title=${c("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${B("minus")}</button>
            <button class="icon" title=${c("fit")} @click=${() => this._sch()?.fit()}>${B("fit")}</button>
            ${this.narrow || !this.showSide ? y : f`<button class="icon" title=${c("msg.title")} @click=${() => this._side = !this._side}>
                  ${B("bell")}${s ? f`<span class="badge">${s}</span>` : y}</button>`}
          </div>
        </div>
        ${this._explain ? f`<aside class="side card">${this._explainPanel()}</aside>` : this.showSide && (this._side || this.narrow) ? f`<aside class="side card">
                <div class="side-head"><b>${c("msg.title")}</b></div>
                <cp-messages compact .messages=${this.messages}></cp-messages>
              </aside>` : y}
      </div>
      ${this._pop ? f`<cp-slot-popover
            .component=${this._pop.component}
            .slotKey=${this._pop.slot}
            .src=${this._src}
            .x=${this._pop.x}
            .y=${this._pop.y}
            .version=${this.version}
            .hass=${this.hass}
            .writer=${(i, n, o) => this.api.write(i, n, o)}
            ?canWrite=${!!this.api && !this.api.standalone && (this.admin || !!this.plant.settings.write_non_admin)}
            ?demo=${!!this.sim || !!this._tm}
            @close=${() => this._pop = null}
          ></cp-slot-popover>` : y}
      ${this._compPop()}
    `;
  }
  _sch() {
    return this.renderRoot.querySelector("cp-schematic");
  }
};
Be.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  messages: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  narrow: { type: Boolean },
  showDemo: { type: Boolean },
  showKpis: { type: Boolean },
  showSide: { type: Boolean },
  _pop: { state: !0 },
  _side: { state: !0 },
  _explain: { state: !0 },
  _comp: { state: !0 },
  _energy: { state: !0 },
  _tm: { state: !0 },
  _tmBusy: { state: !0 },
  _tick: { state: !0 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  admin: { type: Boolean }
}, Be.styles = [
  _t,
  rt`
      :host { display: flex; flex-direction: column; gap: 12px; height: 100%; min-height: 0; }
      .demo {
        display: flex; flex-wrap: wrap; align-items: center; gap: 10px 14px;
        padding: 10px 14px; border-radius: var(--cp-radius);
        background: linear-gradient(90deg, color-mix(in srgb, var(--cp-notice) 18%, var(--cp-surface)), var(--cp-surface));
        border: 1px solid color-mix(in srgb, var(--cp-notice) 35%, var(--cp-border));
      }
      .demo-tag { display: inline-flex; gap: 6px; align-items: center; font-weight: 700; color: var(--cp-notice); font-size: 13px; }
      .clock { font-variant-numeric: tabular-nums; font-weight: 700; font-size: 15px; }
      .ctl { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; color: var(--cp-muted); }
      .ctl select { width: auto; padding: 4px 8px; }
      .ctl.slider input { width: 140px; }
      .ctl b { color: var(--cp-text); min-width: 44px; }
      .scn { display: flex; gap: 6px; flex-wrap: wrap; }
      .scn button { padding: 5px 10px; font-size: 12px; }
      .kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(118px, 1fr)); gap: 10px; }
      .kpi {
        display: grid; gap: 2px; justify-items: start; text-align: left;
        background: var(--cp-surface); border: 1px solid var(--cp-border); border-radius: var(--cp-radius);
        padding: 10px 14px; cursor: pointer;
      }
      .kpi:disabled { cursor: default; opacity: 1; }
      .k-label { font-size: 11px; color: var(--cp-muted); text-transform: uppercase; letter-spacing: 0.6px; font-weight: 600; }
      .k-value { font-size: 22px; font-weight: 800; font-variant-numeric: tabular-nums; white-space: nowrap; }
      .k-value small { font-size: 12px; color: var(--cp-muted); font-weight: 600; margin-left: 3px; }
      .k-sub { font-size: 11px; color: var(--cp-muted); }
      .main { flex: 1; min-height: 0; display: grid; grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr); gap: 12px; }
      .main.with-side { grid-template-columns: 1fr 320px; }
      .stage { position: relative; padding: 0; overflow: hidden; min-height: 360px;
        background: radial-gradient(1200px 600px at 30% 0%, color-mix(in srgb, var(--cp-accent) 6%, transparent), transparent), var(--cp-surface); }
      cp-schematic { position: absolute; inset: 0; }
      .zoom { position: absolute; right: 10px; bottom: 10px; display: flex; gap: 6px; }
      .zoom button { background: var(--cp-chip); backdrop-filter: blur(6px); position: relative; }
      .zoom .badge { position: absolute; top: -6px; right: -6px; }
      .side { overflow: auto; padding: 12px 14px; min-height: 0; }
      .side-head { font-size: 14px; margin-bottom: 4px; }
      .energy { padding: 10px 14px 6px; }
      .tm { position: absolute; left: 10px; right: 10px; top: 10px; z-index: 2; display: flex; flex-wrap: wrap; align-items: center; gap: 8px 12px;
        padding: 8px 12px; border-radius: 12px; background: color-mix(in srgb, var(--cp-surface) 88%, transparent);
        border: 1px solid color-mix(in srgb, var(--cp-accent) 45%, var(--cp-border)); backdrop-filter: blur(8px); }
      .tm-track { flex: 1; min-width: 180px; display: grid; gap: 3px; }
      .tm-track input { width: 100%; margin: 0; accent-color: var(--cp-accent); }
      .strip { width: 100%; height: 6px; border-radius: 3px; background: var(--cp-border); display: block; }
      .tm-time { font-weight: 800; font-variant-numeric: tabular-nums; min-width: 128px; }
      .tm select { width: auto; padding: 4px 8px; font-size: 12px; }
      .tm .live { padding: 5px 12px; font-size: 12px; font-weight: 700; }
      .zoom button.busy { opacity: 0.5; }
      .zoom button.on { background: var(--cp-accent); color: var(--cp-bg); }
      .explain { list-style: none; margin: 8px 0 0; padding: 0; display: grid; gap: 10px; font-size: 13px; line-height: 1.45; }
      .explain li { display: grid; grid-template-columns: 10px 1fr; gap: 10px; padding: 8px 10px; border-radius: 10px;
        background: color-mix(in srgb, var(--tone) 9%, transparent); border-left: 3px solid var(--tone); }
      .explain .dot { width: 8px; height: 8px; border-radius: 50%; background: var(--tone); margin-top: 6px; }
      .ex-hint { color: var(--cp-muted); font-size: 12px; margin-top: 3px; }
      .ex-tip { display: flex; gap: 6px; align-items: flex-start; color: var(--cp-muted); font-size: 12px; margin: 12px 0 0; }
      .ex-tip svg { flex: none; width: 15px; height: 15px; }
      .backdrop { position: fixed; inset: 0; z-index: 30; }
      .cpop { position: fixed; z-index: 31; box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45); padding: 14px; font-size: 13px; line-height: 1.45; }
      .cpop p { margin: 8px 0 0; }
      .cpop-head { flex-wrap: nowrap; align-items: flex-start; }
      .cpop-title { font-weight: 700; font-size: 15px; }
      .cpop-sub { font-size: 12px; }
      .cpop-state { color: var(--cp-accent); font-weight: 600; }
      @media (max-width: 900px) {
        :host { height: auto; }
        .main, .main.with-side { grid-template-columns: 1fr; grid-template-rows: auto; flex: none; }
        .stage { min-height: 0; }
        cp-schematic { position: relative; inset: auto; }
        .scn-select { width: auto; flex: 1; min-width: 160px; }
        .demo { gap: 8px 10px; padding: 8px 10px; }
        .side { max-height: none; }
        .kpis { grid-template-columns: repeat(auto-fit, minmax(96px, 1fr)); gap: 8px; }
        .kpi { padding: 8px 10px; }
        .k-value { font-size: 18px; }
        .ctl.slider input { width: 110px; }
      }
    `
];
let Cs = Be;
customElements.get("cp-overview") || customElements.define("cp-overview", Cs);
function me(r) {
  return JSON.parse(JSON.stringify(r));
}
function ze(r) {
  const { w: t, h: e } = bt(r);
  return { x0: r.x, y0: r.y, x1: r.x + t, y1: r.y + e };
}
function Pe(r) {
  const t = new Map(r.components.map((h) => [h.id, h])), e = [];
  let s = 0;
  for (const h of r.pipes) {
    const m = Sn(h, t);
    if (m)
      for (let u = 1; u < m.pts.length; u++)
        e.push({ pipe: h.id, a: m.pts[u - 1], b: m.pts[u] }), s += Math.abs(m.pts[u].x - m.pts[u - 1].x) + Math.abs(m.pts[u].y - m.pts[u - 1].y);
  }
  let i = 0, n = 0;
  for (let h = 0; h < e.length; h++)
    for (let m = h + 1; m < e.length; m++) {
      const u = e[h], _ = e[m];
      if (u.pipe === _.pipe) continue;
      const w = u.a.y === u.b.y, b = _.a.y === _.b.y;
      if (w !== b) {
        const v = w ? u : _, x = w ? _ : u, k = Math.min(v.a.x, v.b.x), C = Math.max(v.a.x, v.b.x), T = Math.min(x.a.y, x.b.y), E = Math.max(x.a.y, x.b.y);
        x.a.x > k && x.a.x < C && v.a.y > T && v.a.y < E && i++;
      } else w && u.a.y === _.a.y ? Math.min(Math.max(u.a.x, u.b.x), Math.max(_.a.x, _.b.x)) - Math.max(Math.min(u.a.x, u.b.x), Math.min(_.a.x, _.b.x)) > 0 && n++ : !w && u.a.x === _.a.x && Math.min(Math.max(u.a.y, u.b.y), Math.max(_.a.y, _.b.y)) - Math.max(Math.min(u.a.y, u.b.y), Math.min(_.a.y, _.b.y)) > 0 && n++;
    }
  let o = 0;
  const a = new Map(r.pipes.map((h) => [h.id, /* @__PURE__ */ new Set([h.from.c, h.to.c])])), l = r.components.filter((h) => !["junction", "label"].includes(h.type));
  for (const h of e)
    for (const m of l) {
      if (a.get(h.pipe)?.has(m.id)) continue;
      const u = ze(m), _ = Math.min(h.a.x, h.b.x), w = Math.max(h.a.x, h.b.x), b = Math.min(h.a.y, h.b.y), v = Math.max(h.a.y, h.b.y);
      w > u.x0 && _ < u.x1 && v > u.y0 && b < u.y1 && o++;
    }
  let d = 0;
  for (let h = 0; h < l.length; h++)
    for (let m = h + 1; m < l.length; m++) {
      const u = ze(l[h]), _ = ze(l[m]);
      u.x1 + 1 > _.x0 && _.x1 + 1 > u.x0 && u.y1 + 1 > _.y0 && _.y1 + 1 > u.y0 && d++;
    }
  const p = i * 10 + n * 15 + o * 12 + d * 40 + s * 0.05;
  return { crossings: i + n, overlaps: d, through: o, length: s, total: p };
}
const Ki = {
  outdoor_unit: 0,
  indoor_unit: 1,
  pump: 2,
  valve_3way: 2,
  mixer: 2,
  separator: 3,
  expansion_vessel: 4,
  buffer: 3,
  dhw_tank: 5,
  radiators: 1,
  floor_heating: 1,
  tap: 6,
  water_inlet: 7
};
function gr(r, t, e, s) {
  const i = me(r), n = i.components.filter((w) => !["label", "value_tile"].includes(w.type)), o = new Map(n.map((w) => [w.id, /* @__PURE__ */ new Set()]));
  for (const w of i.pipes)
    o.get(w.from.c)?.add(w.to.c), o.get(w.to.c)?.add(w.from.c);
  const a = n.find((w) => w.type === "outdoor_unit") || n.find((w) => w.type === "indoor_unit") || n[0], l = /* @__PURE__ */ new Map();
  if (a) {
    l.set(a.id, 0);
    const w = [a.id];
    for (; w.length; ) {
      const b = w.shift();
      for (const v of o.get(b) || [])
        if (!l.has(v)) {
          const x = n.find((C) => C.id === v), k = x.type === "junction" || nt[x.type].passive && x.type !== "tap";
          l.set(v, l.get(b) + (k ? 0.5 : 1)), w.push(v);
        }
    }
  }
  for (const w of n) l.has(w.id) || l.set(w.id, 0);
  const p = [...new Set([...l.values()].map((w) => Math.round(w * 2)))].sort((w, b) => w - b).map((w) => n.filter((b) => Math.round(l.get(b.id) * 2) === w)), h = s ? -1 : 1;
  for (const w of p) w.sort((b, v) => h * ((Ki[b.type] ?? 5) - (Ki[v.type] ?? 5)));
  const m = /* @__PURE__ */ new Map(), u = () => p.forEach((w) => w.forEach((b, v) => m.set(b.id, v / Math.max(1, w.length - 1))));
  u();
  for (let w = 0; w < e; w++)
    for (const b of p) {
      const v = new Map(
        b.map((x) => {
          const k = [...o.get(x.id) || []].filter((C) => m.has(C));
          return [x.id, k.length ? k.reduce((C, T) => C + m.get(T), 0) / k.length : m.get(x.id)];
        })
      );
      b.sort((x, k) => v.get(x.id) - v.get(k.id)), u();
    }
  let _ = 1;
  for (const w of p) {
    const b = Math.max(1, ...w.map((x) => bt(x).w));
    let v = 2;
    for (const x of w) {
      const { w: k, h: C } = bt(x);
      x.x = Math.round(_ + (b - k) / 2), x.y = v, v += C + t + (nt[x.type].badges === "below" ? 3 : 0);
    }
    _ += b + t + 2;
  }
  for (const w of i.pipes)
    delete w.via, delete w.bend;
  return i.grid = { w: Math.max(i.grid.w, _ + 4), h: Math.max(i.grid.h, ...n.map((w) => w.y + bt(w).h + 6)) }, i;
}
const _r = /^(ou|iu|dhw|buf|tap|inlet|jww|circ|sep|sc1|jmag|mag|pc1|vw1|pc0|hc\d+(_[a-z]+)?)$/;
function wr(r) {
  const t = r.settings?.wizard;
  if (!t) return null;
  const e = r.components.find((m) => m.type === "indoor_unit"), s = (m) => r.components.some((u) => u.type === m), i = {
    ...t,
    indoorModel: e?.model || t.indoorModel,
    dhw: s("dhw_tank") ? "tank" : t.dhw,
    // a unit with a built-in buffer (TP70) has no external one: keep the wish for when the unit changes back
    buffer: s("buffer") ? t.buffer === "none" ? "parallel" : t.buffer : Jt(t.indoorModel)?.buffer ? t.buffer : "none",
    circulation: s("tap") ? r.components.some((m) => m.id === "circ") : t.circulation
  }, n = ts(i, r), o = new Map(n.components.map((m) => [m.id, m]));
  if (e?.model && t.indoorModel && e.model !== t.indoorModel) {
    const m = r.components.filter((b) => !o.has(b.id) && !_r.test(b.id)), u = /* @__PURE__ */ new Set([...n.components.map((b) => b.id), ...m.map((b) => b.id)]), _ = new Map(r.pipes.map((b) => [[b.from.c, b.to.c].sort().join("|"), b])), w = [
      ...n.pipes.map((b) => {
        const v = _.get([b.from.c, b.to.c].sort().join("|"));
        return v?.bindings ? { ...b, bindings: v.bindings } : b;
      }),
      ...r.pipes.filter((b) => m.some((v) => v.id === b.from.c || v.id === b.to.c) && u.has(b.from.c) && u.has(b.to.c))
    ];
    return { ...n, components: [...n.components, ...me(m)], pipes: w, settings: { ...r.settings, ...n.settings } };
  }
  const a = me(r), l = [], d = [];
  for (const m of a.components) {
    const u = o.get(m.id);
    u && u.type === m.type ? (m.x = u.x, m.y = u.y, u.rot !== void 0 ? m.rot = u.rot : delete m.rot, u.flip ? m.flip = !0 : delete m.flip, (m.type === "radiators" || m.type === "tap") && (m.props = { ...m.props }, u.props?.variant ? m.props.variant = u.props.variant : delete m.props.variant), l.push(m)) : d.push(m);
  }
  if (!d.length && n.components.every((m) => a.components.some((u) => u.id === m.id))) {
    const m = new Map(a.pipes.map((u) => [[u.from.c, u.to.c].sort().join("|"), u]));
    return a.pipes = n.pipes.map((u) => {
      const _ = m.get([u.from.c, u.to.c].sort().join("|"));
      return _?.bindings ? { ...u, bindings: _.bindings } : u;
    }), a.grid = { w: Math.max(a.grid.w, n.grid.w), h: Math.max(a.grid.h, n.grid.h) }, a.settings = { ...a.settings, building: n.settings.building }, a;
  }
  const p = (m) => `${m.from.c}.${m.from.p}>${m.to.c}.${m.to.p}`, h = new Map(n.pipes.map((m) => [p(m), m]));
  for (const m of a.pipes) {
    const u = h.get(p(m));
    delete m.bend, u?.via ? m.via = u.via : delete m.via;
  }
  a.grid = { w: Math.max(a.grid.w, n.grid.w), h: Math.max(a.grid.h, n.grid.h) }, a.settings = { ...a.settings, building: n.settings.building };
  for (const m of d) {
    const { w: u, h: _ } = bt(m), w = (v, x) => [...l].every((k) => {
      const C = ze(k);
      return v + u + 2 <= C.x0 || v >= C.x1 + 2 || x + _ + 3 <= C.y0 || x >= C.y1 + 3;
    });
    let b = !1;
    for (let v = 2; v + _ < a.grid.h + 20 && !b; v += 2)
      for (let x = 1; x + u < a.grid.w + 20 && !b; x += 2)
        w(x, v) && (m.x = x, m.y = v, b = !0);
    l.push(m);
  }
  return a;
}
function vr(r, t = 400) {
  let e = me(r), s = Pe(e).total, i = 12345;
  const n = () => (i = (i * 1103515245 + 12345) % 2147483648) / 2147483648, o = e.components.filter((a) => !["label", "value_tile"].includes(a.type)).map((a) => a.id);
  for (let a = 0; a < t; a++) {
    const l = me(e), p = new Map(l.components.map((u) => [u.id, u])).get(o[Math.floor(n() * o.length)]), h = n();
    if (h < 0.35) {
      const u = l.components.filter((w) => w.id !== p.id && Math.abs(w.x - p.x) <= 3 && o.includes(w.id));
      if (!u.length) continue;
      const _ = u[Math.floor(n() * u.length)];
      [p.y, _.y] = [_.y, p.y];
    } else {
      const u = [-4, -2, 2, 4][Math.floor(n() * 4)];
      h < 0.7 ? p.y = Math.max(1, p.y + u) : p.x = Math.max(1, p.x + u);
    }
    const m = Pe(l).total;
    m < s && (e = l, s = m);
  }
  return e;
}
function br(r) {
  const t = wr(r), e = [];
  if (t) e.push({ plant: t, kind: "template" });
  else
    for (const i of [3, 5])
      for (const n of [0, 3])
        for (const o of [!1, !0]) e.push({ plant: gr(r, i, n, o), kind: "layered" });
  let s = null;
  for (const i of e) {
    const n = Pe(i.plant);
    (!s || n.total < s.score.total) && (s = { plant: i.plant, kind: i.kind, score: n });
  }
  if (s.kind === "layered" || s.score.crossings > 2 && !s.plant.settings.building) {
    const i = vr(s.plant), n = Pe(i);
    n.total < s.score.total && (s = { plant: i, kind: s.kind, score: n });
  }
  return s;
}
const yr = [
  "outdoor_unit",
  "indoor_unit",
  "buffer",
  "dhw_tank",
  "pump",
  "valve_3way",
  "mixer",
  "radiators",
  "floor_heating",
  "tap",
  "water_inlet",
  "separator",
  "expansion_vessel",
  "junction",
  "value_tile",
  "label"
], xr = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"], us = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "a", "b", "aux", "pc1"],
  tap: ["flowing"],
  dhw_tank: ["charging"]
};
function Ut(r) {
  return JSON.parse(JSON.stringify(r));
}
const qt = class qt extends st {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this._listId = `cp-ents-${qt._uid++}`;
  }
  _change(t) {
    const e = t.target.value.trim();
    this.value = e, this.dispatchEvent(new CustomEvent("value-changed", { detail: e }));
  }
  render() {
    const t = this.hass ? Object.keys(this.hass.states).sort() : [];
    return f`<input
        list=${this._listId}
        .value=${this.value || ""}
        placeholder=${this.placeholder || c("ed.entity_search")}
        @change=${this._change}
      />
      <datalist id=${this._listId}>
        ${t.map((e) => f`<option value=${e}>${this.hass.states[e].attributes.friendly_name || ""}</option>`)}
      </datalist>`;
  }
};
qt.properties = { hass: { attribute: !1 }, value: {}, placeholder: {} }, qt._uid = 0, qt.styles = [_t, rt`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
let Ps = qt;
customElements.get("cp-entity-picker") || customElements.define("cp-entity-picker", Ps);
const Ne = class Ne extends st {
  constructor() {
    super(...arguments), this._gridCfg = (() => {
      const t = { show: !1, step: 1, snap: !0, osnap: !0 };
      try {
        return { ...t, ...JSON.parse(localStorage.getItem("copilot.editor.grid") || "{}") };
      } catch {
        return t;
      }
    })(), this.icons = /* @__PURE__ */ new Map(), this.version = 0, this._sel = null, this._hint = "", this._dirty = !1, this._undo = [], this._redo = [], this._stale = !1, this._onKey = (t) => {
      const e = t.composedPath()[0]?.tagName;
      e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || ((t.key === "Delete" || t.key === "Backspace") && this._sel ? (t.preventDefault(), this._delete()) : (t.ctrlKey || t.metaKey) && t.key.toLowerCase() === "z" ? (t.preventDefault(), t.shiftKey ? this._doRedo() : this._doUndo()) : t.key.toLowerCase() === "r" && this._sel?.kind === "c" && this._rotate());
    };
  }
  _setGrid(t) {
    this._gridCfg = { ...this._gridCfg, ...t };
    try {
      localStorage.setItem("copilot.editor.grid", JSON.stringify(this._gridCfg));
    } catch {
    }
  }
  /** A straight run of a pipe was dragged: store its route as waypoints (undoable as one step). */
  _onSegment(t) {
    const { id: e, via: s, live: i } = t.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = Ut(this._draft), o = n.pipes.find((a) => a.id === e);
      o && (o.via = s, delete o.bend), this._draft = n;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  willUpdate() {
    if (this.plant && this.plant !== this._source) {
      if (this._source = this.plant, this._dirty && JSON.stringify(this.plant) !== this._sent) {
        this._stale = !0;
        return;
      }
      this._take();
    }
  }
  /** Start over from the stored plant (keeps the selection when the element still exists). */
  _take() {
    const t = this._sel;
    this._draft = Ut(this.plant), this._baseRev = this.rev, this._undo = [], this._redo = [], this._dirty = !1, this._stale = !1, this._sent = void 0, this._sel = t && (t.kind === "c" ? this._comp(t.id) : this._pipe(t.id)) ? t : null;
  }
  /** Keep the own draft on top of the newer plant: the next save deliberately replaces it. */
  _keepMine() {
    this._baseRev = this.rev, this._stale = !1;
  }
  connectedCallback() {
    super.connectedCallback(), window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), window.removeEventListener("keydown", this._onKey);
  }
  // ---------------------------------------------------------- mutations
  _commit(t, e = !0) {
    e && (this._undo.push(JSON.stringify(this._draft)), this._undo.length > 80 && this._undo.shift(), this._redo = []);
    const s = Ut(this._draft);
    t(s), this._draft = s, this._dirty = !0;
  }
  _doUndo() {
    const t = this._undo.pop();
    t && (this._redo.push(JSON.stringify(this._draft)), this._draft = JSON.parse(t), this._dirty = !0);
  }
  _doRedo() {
    const t = this._redo.pop();
    t && (this._undo.push(JSON.stringify(this._draft)), this._draft = JSON.parse(t), this._dirty = !0);
  }
  _comp(t) {
    return this._draft.components.find((e) => e.id === (t ?? this._sel?.id));
  }
  _pipe(t) {
    return this._draft.pipes.find((e) => e.id === (t ?? this._sel?.id));
  }
  _newId(t) {
    const e = /* @__PURE__ */ new Set([...this._draft.components.map((i) => i.id), ...this._draft.pipes.map((i) => i.id)]);
    let s = 1;
    for (; e.has(`${t}${s}`); ) s++;
    return `${t}${s}`;
  }
  _add(t) {
    const e = nt[t], s = this._newId(`${t}_`), i = {
      id: s,
      type: t,
      label: t === "junction" ? "" : c(`type.${t}`),
      ...this._freeSpot(e.variants ? It({ type: t, props: {} }).w : e.w, e.variants ? It({ type: t, props: {} }).h : e.h),
      bindings: {},
      props: t === "value_tile" ? { entries: [] } : t === "label" ? { text: c("type.label"), size: 18 } : {}
    };
    t === "pump" && (i.props.role = "other"), this._commit((n) => n.components.push(i)), this._sel = { kind: "c", id: s };
  }
  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  _freeSpot(t, e) {
    const s = this._draft.components.map((n) => ({ c: n, ...bt(n) })), i = (n, o) => s.every(({ c: a, w: l, h: d }) => n + t + 1 <= a.x || n >= a.x + l + 1 || o + e + 2 <= a.y || o >= a.y + d + 3);
    for (let n = 1; n + e < this._draft.grid.h; n += 2)
      for (let o = 1; o + t < this._draft.grid.w; o += 2) if (i(o, n)) return { x: o, y: n };
    return { x: 1, y: 1 };
  }
  _delete() {
    const t = this._sel;
    t && (this._commit((e) => {
      t.kind === "c" ? (e.components = e.components.filter((s) => s.id !== t.id), e.pipes = e.pipes.filter((s) => s.from.c !== t.id && s.to.c !== t.id), e.pipes.forEach((s) => {
        s.flow = s.flow?.filter((i) => i.c !== t.id), s.flowAny = s.flowAny?.filter((i) => i.c !== t.id);
      })) : e.pipes = e.pipes.filter((s) => s.id !== t.id);
    }), this._sel = null);
  }
  _rotate() {
    const t = this._comp();
    !t || !nt[t.type].rotatable || this._commit((e) => {
      const s = e.components.find((i) => i.id === t.id);
      s.rot = ((s.rot || 0) + 90) % 360;
    });
  }
  _duplicate() {
    const t = this._comp();
    if (!t) return;
    const e = this._newId(`${t.type}_`);
    this._commit((s) => s.components.push({ ...Ut(t), id: e, x: t.x + 2, y: t.y + 2 })), this._sel = { kind: "c", id: e };
  }
  _connect(t, e) {
    const s = this._comp(t.c), i = this._comp(e.c), n = yt(s, t.p), o = yt(i, e.p), a = n?.def.kind || o?.def.kind || "supply", l = [], d = [s, i].find((h) => h.type === "pump");
    d && l.push({ c: d.id, s: "running" });
    for (const [h, m] of [
      [s, t],
      [i, e]
    ])
      h.type === "valve_3way" && (m.p === "a" || m.p === "b") && l.push({ c: h.id, s: m.p });
    const p = this._newId("p");
    this._commit((h) => h.pipes.push({ id: p, from: t, to: e, kind: a, flow: l })), this._sel = { kind: "p", id: p };
  }
  _set(t, e = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.components.find((o) => o.id === s);
      n && t(n);
    }, e);
  }
  _setPipe(t, e = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.pipes.find((o) => o.id === s);
      n && t(n);
    }, e);
  }
  _autoArrange() {
    const t = br(this._draft);
    this._commit((e) => {
      e.components = t.plant.components, e.pipes = t.plant.pipes, e.grid = t.plant.grid, e.settings = { ...e.settings, building: t.plant.settings.building, wizard: t.plant.settings.wizard };
    }), this._sel = null, this._hint = c(t.kind === "template" ? "ed.auto_done_tpl" : "ed.auto_done", { crossings: t.score.crossings }), window.setTimeout(() => this._hint = "", 6e3);
  }
  _save() {
    const t = Ut(this._draft);
    t.settings = { ...t.settings, layout_edited: !0 }, this._sent = JSON.stringify(t), this.dispatchEvent(new CustomEvent("save", { detail: { plant: t, rev: this._baseRev }, bubbles: !0, composed: !0 }));
  }
  _discard() {
    this._sel = null, this._take();
  }
  // ------------------------------------------------------------ events
  _onBend(t) {
    const { id: e, bend: s, live: i } = t.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = Ut(this._draft), o = n.pipes.find((a) => a.id === e);
      o && (o.bend = s, delete o.via), this._draft = n;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  // ------------------------------------------------------------ render
  render() {
    if (!this._draft) return y;
    const t = this._sel;
    return f`
      <div class="toolbar">
        <button class="icon" title=${c("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${B("undo")}</button>
        <button class="icon" title=${c("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${B("redo")}</button>
        <button class="icon" title=${c("ed.rotation")} ?disabled=${!(t?.kind === "c" && nt[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${B("rotate")}</button>
        <button class="icon" title=${c("ed.duplicate")} ?disabled=${t?.kind !== "c"} @click=${this._duplicate}>${B("copy")}</button>
        <button class="icon danger" title=${c("delete")} ?disabled=${!t} @click=${this._delete}>${B("trash")}</button>
        <button title=${c("ed.auto_title")} @click=${this._autoArrange}>${B("wand")} ${c("ed.auto")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? f`<span class="dirty">${c("unsaved")}</span>
          <button @click=${this._discard}>${c("discard")}</button>` : y}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${B("save")} ${c("save")}</button>
      </div>
      ${this._stale ? f`<div class="stale">
            <span>${B("warn")} ${c("sync.stale")}</span>
            <button @click=${this._discard}>${c("sync.take")}</button>
            <button @click=${this._keepMine}>${c("sync.keep")}</button>
          </div>` : y}
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${c("ed.palette")}</div>
          ${yr.map((e) => f`<button class="pal" @click=${() => this._add(e)}>${B("plus")} ${c(`type.${e}`)}</button>`)}
          <div class="cap">${c("ed.grid")}</div>
          <div class="row grid-size">
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.w)} @change=${(e) => this._commit((s) => s.grid.w = Number(e.target.value) || s.grid.w)} />
            ×
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.h)} @change=${(e) => this._commit((s) => s.grid.h = Number(e.target.value) || s.grid.h)} />
          </div>
          <label class="bld"><input type="checkbox" .checked=${!!this._draft.settings.building && this._draft.settings.building.show !== !1}
            @change=${(e) => this._commit((s) => {
      const i = e.target.checked;
      s.settings = { ...s.settings, building: { ...s.settings.building || { floor: s.grid.h - 2 }, show: i } };
    })} /> ${c("ed.building")}</label>
          <div class="cap">${c("ed.raster")}</div>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.show} @change=${(e) => this._setGrid({ show: e.target.checked })} /> ${c("ed.grid_show")}</label>
          <label class="field">${c("ed.grid_step")}
            <select @change=${(e) => this._setGrid({ step: Number(e.target.value) })}>
              ${[1, 2, 5].map((e) => f`<option value=${e} ?selected=${this._gridCfg.step === e}>${c("ed.grid_cells", { n: e })}</option>`)}
            </select></label>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.snap} @change=${(e) => this._setGrid({ snap: e.target.checked })} /> ${c("ed.grid_snap")}</label>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.osnap} @change=${(e) => this._setGrid({ osnap: e.target.checked })} /> ${c("ed.object_snap")}</label>
          <p class="muted tiny">${c("ed.snap_hint")}</p>
        </aside>
        <div class="canvas card">
          <cp-schematic
            edit
            .plant=${this._draft}
            .src=${this.src}
            .icons=${this.icons}
            .selected=${t}
            .version=${this.version}
            @cp-select=${(e) => this._sel = e.detail}
            @cp-move=${(e) => this._commit((s) => {
      const i = s.components.find((n) => n.id === e.detail.id);
      i && (i.x = e.detail.x, i.y = e.detail.y);
    })}
            @cp-connect=${(e) => this._connect(e.detail.from, e.detail.to)}
            @cp-bend=${this._onBend}
            @cp-segment=${this._onSegment}
            @cp-value-move=${(e) => this._commit((s) => {
      const i = s.components.find((n) => n.id === e.detail.id);
      i && (i.valuePos = { ...i.valuePos || {}, [e.detail.slot]: e.detail.pos });
    })}
            .gridStep=${this._gridCfg.step}
            ?showGrid=${this._gridCfg.show}
            ?snapGrid=${this._gridCfg.snap}
            ?snapObjects=${this._gridCfg.osnap}
            @cp-hint=${(e) => this._hint = e.detail}
          ></cp-schematic>
        </div>
        <aside class="props card">${t?.kind === "c" ? this._compProps() : t?.kind === "p" ? this._pipeProps() : f`<p class="muted">${c("ed.nothing")}</p>`}</aside>
      </div>
    `;
  }
  _num(t, e, s, i = 1) {
    return f`<label class="field">${t}<input type="number" step=${i} .value=${e ?? ""} @change=${(n) => s(Number(n.target.value))} /></label>`;
  }
  _compProps() {
    const t = this._comp();
    if (!t) return y;
    const e = nt[t.type], s = new Set(t.show ?? zt(t).filter((n) => n.show).map((n) => n.key)), i = [...this.icons.values()];
    return f`
      <div class="ptitle">${c(`type.${t.type}`)} <code>${t.id}</code></div>
      ${t.type !== "junction" ? f`<label class="field">${c("ed.label")}<input .value=${t.label} @change=${(n) => this._set((o) => o.label = n.target.value)} /></label>` : y}
      ${t.type === "outdoor_unit" ? f`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${Ee.map((n) => f`<option value=${n.id} ?selected=${n.id === t.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("ed.nominal"), t.props.nominal_kw, (n) => this._set((o) => o.props.nominal_kw = n), 0.1)}
            ${this._num(c("ed.cop_ref"), t.props.cop_ref ?? 4.9, (n) => this._set((o) => o.props.cop_ref = n), 0.1)}` : y}
      ${t.type === "indoor_unit" ? f`<label class="field">${c("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${Ys.map((n) => f`<option value=${n.id} ?selected=${n.id === t.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(c("wz.aux_kw"), t.props.aux_kw, (n) => this._set((o) => o.props.aux_kw = n), 1)}
            <div class="cap">${c("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
      (n) => f`<label class="field">${c(`slot.input${n}`)}<input .value=${t.props.input_labels?.[`input${n}`] || ""}
                @change=${(o) => this._set((a) => a.props.input_labels = { ...a.props.input_labels || {}, [`input${n}`]: o.target.value })} /></label>`
    )}
            <div class="cap">${c("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", t.props.pressure_min ?? 1, (n) => this._set((o) => o.props.pressure_min = n), 0.1)}
              ${this._num("max", t.props.pressure_max ?? 2.7, (n) => this._set((o) => o.props.pressure_max = n), 0.1)}
            </div>` : y}
      ${t.type === "buffer" || t.type === "dhw_tank" ? this._num(c("ed.volume"), t.props.volume, (n) => this._set((o) => o.props.volume = n)) : y}
      ${e.roles ? f`<label class="field">${c("ed.role")}<select @change=${(n) => this._set((o) => o.props.role = n.target.value)}>
            ${e.roles.map((n) => f`<option value=${n} ?selected=${t.props.role === n}>${c(`role.${n}`)}</option>`)}
          </select></label>` : y}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(t.type) ? this._num(c("ed.circuit"), t.props.circuit ?? 1, (n) => this._set((o) => o.props.circuit = n)) : y}
      ${t.type === "dhw_tank" ? this._num(c("ed.dhw_circuit"), t.props.dhw_circuit ?? 1, (n) => this._set((o) => o.props.dhw_circuit = n)) : y}
      ${t.type === "label" ? f`<label class="field">${c("ed.text")}<input .value=${t.props.text || ""} @change=${(n) => this._set((o) => o.props.text = n.target.value)} /></label>
            ${this._num("px", t.props.size || 18, (n) => this._set((o) => o.props.size = n))}` : y}
      ${e.rotatable ? f`<label class="field">${c("ed.rotation")}<select @change=${(n) => this._set((o) => o.rot = Number(n.target.value))}>
            ${[0, 90, 180, 270].map((n) => f`<option value=${n} ?selected=${(t.rot || 0) === n}>${n}°</option>`)}
          </select></label>` : y}
      ${t.type === "radiators" || t.type === "tap" ? f`<label class="field">${c(t.type === "tap" ? "ed.tap_kind" : "ed.connection")}<select @change=${(n) => this._set((o) => o.props.variant = n.target.value)}>
            ${(t.type === "tap" ? ["tap", "shower"] : ["side", "bottom"]).map(
      (n) => f`<option value=${n} ?selected=${(t.props.variant || (t.type === "tap" ? "tap" : "side")) === n}>${c(t.type === "tap" ? `ed.tap.${n}` : `ed.conn.${n}`)}</option>`
    )}
          </select></label>` : y}
      ${e.mirrorable ? f`<label class="field check"><input type="checkbox" .checked=${!!t.flip} @change=${(n) => this._set((o) => {
      n.target.checked ? o.flip = !0 : delete o.flip;
    })} />${c("ed.flip")}</label>` : y}
      ${t.valuePos && Object.keys(t.valuePos).length ? f`<button class="ghost" @click=${() => this._set((n) => delete n.valuePos)}>${c("ed.values_reset")}</button>` : y}
      ${["junction", "label", "value_tile"].includes(t.type) ? y : f`<label class="field">${c("ed.icon")}<select @change=${(n) => this._set((o) => {
      const a = n.target.value;
      a ? o.icon = a : delete o.icon;
    })}>
            <option value="">${c("ed.icon_default")}</option>
            ${i.map((n) => f`<option value=${n.id} ?selected=${n.id === t.icon}>${n.name}</option>`)}
          </select></label>`}
      ${t.type === "value_tile" ? this._tileEntries(t) : this._bindings(t, s)}
    `;
  }
  _bindings(t, e) {
    const s = zt(t);
    return s.length ? f`<div class="cap">${c("ed.bindings")}</div>
      <div class="bindings">
        ${s.map((i) => {
      const n = this.src.get(t, i.key), { text: o, unit: a } = Bt(n, i.kind);
      return f`<div class="bind">
            <div class="bhead">
              <label class="show" title=${c("ed.show")}><input type="checkbox" .checked=${e.has(i.key)}
                @change=${(l) => this._set((d) => {
        const p = new Set(d.show ?? zt(d).filter((h) => h.show).map((h) => h.key));
        l.target.checked ? p.add(i.key) : p.delete(i.key), d.show = zt(d).map((h) => h.key).filter((h) => p.has(h));
      })} /></label>
              <span class="bname">${Pt(t.type, i.key)}</span>
              <span class="bval">${n ? `${o} ${a}` : ""}</span>
              ${gn(t.bindings[i.key]) ? f`<label class="wr" title=${c("wr.release")}><input type="checkbox" .checked=${(t.writable || []).includes(i.key)}
                    @change=${(l) => this._set((d) => {
        const p = new Set(d.writable || []);
        l.target.checked ? p.add(i.key) : p.delete(i.key), p.size ? d.writable = [...p] : delete d.writable;
      })} />✎</label>` : y}
            </div>
            <cp-entity-picker .hass=${this.hass} .value=${t.bindings[i.key] || ""}
              @value-changed=${(l) => this._set((d) => {
        l.detail ? d.bindings[i.key] = l.detail : delete d.bindings[i.key];
      })}></cp-entity-picker>
          </div>`;
    })}
      </div>` : y;
  }
  _tileEntries(t) {
    const e = t.props.entries || [], s = ["temp", "power_kw", "power_w", "energy", "percent", "pressure", "flow", "count", "bool", "text"];
    return f`<div class="cap">${c("ed.entries")}</div>
      ${e.map(
      (i, n) => f`<div class="bind">
          <div class="two">
            <input .value=${i.label || ""} placeholder=${c("ed.label")} @change=${(o) => this._set((a) => a.props.entries[n].label = o.target.value)} />
            <select @change=${(o) => this._set((a) => a.props.entries[n].kind = o.target.value)}>
              ${s.map((o) => f`<option value=${o} ?selected=${i.kind === o}>${o}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${i.entity || ""}
              @value-changed=${(o) => this._set((a) => a.props.entries[n].entity = o.detail)}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((o) => o.props.entries.splice(n, 1))}>${B("trash")}</button>
          </div>
        </div>`
    )}
      <button @click=${() => this._set((i) => {
      i.props.entries = [...i.props.entries || [], { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
    })}>${B("plus")} ${c("ed.add_entry")}</button>`;
  }
  _conds(t, e) {
    const s = this._draft.components.filter((i) => us[i.type]);
    return f`${(t || []).map(
      (i, n) => f`<div class="row nowrap cond">
          <select @change=${(o) => this._setPipe((a) => a[e][n].c = o.target.value)}>
            ${s.map((o) => f`<option value=${o.id} ?selected=${o.id === i.c}>${o.label || o.id}</option>`)}
          </select>
          <select @change=${(o) => this._setPipe((a) => a[e][n].s = o.target.value)}>
            ${(us[this._comp(i.c)?.type || "pump"] || []).map(
        (o) => f`<option value=${o} ?selected=${o === i.s}>${o.startsWith("!") ? `${c("ed.not")} ${c(`state.${o.slice(1)}`)}` : c(`state.${o}`)}</option>`
      )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((o) => o[e].splice(n, 1))}>${B("close")}</button>
        </div>`
    )}
      <button ?disabled=${!s.length} @click=${() => this._setPipe((i) => {
      const n = s[0];
      i[e] = [...i[e] || [], { c: n.id, s: us[n.type][0] }];
    })}>${B("plus")} ${c("ed.add_cond")}</button>`;
  }
  _pipeProps() {
    const t = this._pipe();
    if (!t) return y;
    const e = (s) => this._comp(s)?.label || s;
    return f`
      <div class="ptitle">${c("ed.pipe")} <code>${t.id}</code></div>
      <p class="muted small">${e(t.from.c)} · ${t.from.p} → ${e(t.to.c)} · ${t.to.p}</p>
      <label class="field">${c("ed.kind")}<select @change=${(s) => this._setPipe((i) => i.kind = s.target.value)}>
        ${xr.map((s) => f`<option value=${s} ?selected=${s === t.kind}>${c(`kind.${s}`)}</option>`)}
      </select></label>
      <div class="cap">${c("ed.flow_when")}</div>
      ${this._conds(t.flow, "flow")}
      <div class="cap">${c("ed.or")}</div>
      ${this._conds(t.flowAny, "flowAny")}
      <div class="cap">${c("ed.bindings")}</div>
      <label class="field">${c("ed.temp_entity")}
        <cp-entity-picker .hass=${this.hass} .value=${t.bindings?.temp || ""}
          @value-changed=${(s) => this._setPipe((i) => i.bindings = { ...i.bindings || {}, temp: s.detail || void 0 })}></cp-entity-picker></label>
      <div class="row" style="margin-top:12px">
        <button ?disabled=${t.bend === void 0 && !t.via} @click=${() => this._setPipe((s) => {
      delete s.bend, delete s.via;
    })}>${c("ed.reset_bend")}</button>
      </div>
    `;
  }
};
Ne.properties = {
  plant: { attribute: !1 },
  rev: { attribute: !1 },
  hass: { attribute: !1 },
  src: { attribute: !1 },
  icons: { attribute: !1 },
  version: { type: Number },
  _draft: { state: !0 },
  _sel: { state: !0 },
  _hint: { state: !0 },
  _dirty: { state: !0 },
  _stale: { state: !0 },
  _gridCfg: { state: !0 }
}, Ne.styles = [
  _t,
  rt`
      :host { display: flex; flex-direction: column; gap: 10px; height: 100%; min-height: 0; }
      .toolbar { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
      .hint { font-size: 12px; color: var(--cp-select); margin-left: 6px; }
      .dirty { font-size: 12px; color: var(--cp-warn); }
      .stale { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; padding: 6px 10px; margin-bottom: 6px; border: 1px solid var(--cp-warn); border-radius: 6px; font-size: 13px; color: var(--cp-warn); }
      .stale span { flex: 1; min-width: 200px; }
      .layout { flex: 1; min-height: 0; display: grid; grid-template-columns: 190px 1fr 330px; gap: 10px; }
      .palette, .props { overflow: auto; padding: 12px; }
      .palette { display: flex; flex-direction: column; gap: 4px; }
      .pal { justify-content: flex-start; font-size: 12px; padding: 6px 8px; background: transparent; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.6px; color: var(--cp-muted); margin: 14px 0 6px; font-weight: 700; }
      .palette .cap:first-child { margin-top: 0; }
      .grid-size { flex-wrap: nowrap; color: var(--cp-muted); }
      .grid-size input { width: 64px; }
      .canvas { position: relative; padding: 0; overflow: hidden; min-height: 420px; }
      cp-schematic { position: absolute; inset: 0; }
      .props { display: flex; flex-direction: column; gap: 10px; }
      .ptitle { font-weight: 800; font-size: 15px; }
      code { font-size: 11px; color: var(--cp-muted); font-weight: 500; }
      .small { font-size: 12px; margin: 0; }
      .two { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
      .bindings { display: grid; gap: 8px; }
      .bind { display: grid; gap: 4px; padding: 8px; border-radius: 10px; background: var(--cp-surface-2); }
      .bhead { display: flex; gap: 6px; align-items: center; font-size: 12px; }
      .bname { font-weight: 600; flex: 1; }
      .bval { color: var(--cp-muted); font-variant-numeric: tabular-nums; }
      .tiny { font-size: 11px; margin: 6px 0 0; line-height: 1.4; }
      .bld { display: flex; gap: 8px; align-items: center; font-size: 13px; margin-top: 10px; }
      .bld input { width: auto; margin: 0; }
      .wr { display: inline-flex; align-items: center; gap: 2px; font-size: 12px; color: var(--cp-warn); cursor: pointer; }
      .wr input { width: auto; margin: 0; }
      .nowrap { flex-wrap: nowrap; }
      .cond select { font-size: 12px; padding: 6px; }
      @media (max-width: 1100px) {
        .layout { grid-template-columns: 1fr; grid-template-rows: 60vh auto auto; }
        .palette { flex-direction: row; flex-wrap: wrap; order: 2; }
        .palette .cap { width: 100%; }
        .props { order: 3; }
      }
    `
];
let Ls = Ne;
customElements.get("cp-editor") || customElements.define("cp-editor", Ls);
const $r = {
  mode: "fixed",
  price: 0.32,
  feed_in: 0.08,
  gas_price: 0.12,
  gas_eff: 90
};
function ti(r) {
  return { ...$r, ...r.settings.tariff || {} };
}
function kr(r) {
  const t = (r || "").toLowerCase();
  return t === "kw" ? 1 : t === "mw" ? 1e3 : 1e-3;
}
function Mn(r, t, e, s, i) {
  if (r <= 0) return 0;
  const n = Math.max(0, t), o = e !== void 0 ? e + s + (i ? 0 : r) : r + s;
  return o <= 0.01 ? r : r * Math.min(1, n / o);
}
async function Sr(r, t, e) {
  const i = t.components.find((x) => x.type === "outdoor_unit")?.bindings.el_power, n = t.settings.energy, o = ti(t), a = /* @__PURE__ */ new Map();
  if (!i) return { hours: a, share: !1 };
  const l = [i, n?.grid, n?.house, n?.wallbox, o.mode === "entity" ? o.price_entity : void 0].filter((x) => !!x), d = await r.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(Rt(/* @__PURE__ */ new Date()) - e * 864e5).toISOString(),
    end_time: (/* @__PURE__ */ new Date()).toISOString(),
    statistic_ids: l,
    period: "hour",
    types: ["mean"]
  }), p = (x) => {
    const k = /* @__PURE__ */ new Map();
    if (!x) return k;
    const C = kr(r.states[x]?.attributes?.unit_of_measurement);
    for (const T of d[x] || []) T.mean !== null && T.mean !== void 0 && k.set(T.start, T.mean * C);
    return k;
  }, h = p(i), m = (x, k) => k ? -x : x, u = p(n?.enabled ? n.grid : void 0), _ = p(n?.enabled ? n.house : void 0), w = p(n?.enabled ? n.wallbox : void 0), b = /* @__PURE__ */ new Map();
  if (o.mode === "entity" && o.price_entity)
    for (const x of d[o.price_entity] || []) x.mean != null && b.set(x.start, x.mean);
  const v = u.size > 0;
  for (const [x, k] of h) {
    const C = u.get(x), T = C === void 0 ? k : Mn(k, m(C, n?.grid_invert), _.get(x), w.get(x) ?? 0, n?.house_includes_hp !== !1);
    a.set(x, { hp: k, grid: T, price: b.get(x) });
  }
  return { hours: a, share: v };
}
function Mr(r) {
  const t = (a) => r.history("energy", a, 24), e = t("hp_power"), s = t("grid_power"), i = t("house_power"), n = t("wallbox_power"), o = /* @__PURE__ */ new Map();
  return e.forEach((a, l) => {
    const d = Math.floor(a.t * 1e3 / 36e5) * 36e5, p = (a.v ?? 0) / 1e3, h = Mn(p, (s[l]?.v ?? 0) / 1e3, (i[l]?.v ?? 0) / 1e3, (n[l]?.v ?? 0) / 1e3, !1), m = o.get(d) || { hp: 0, grid: 0 };
    m.hp += p / 60, m.grid += h / 60, o.set(d, m);
  }), o;
}
function ms(r, t, e, s, i) {
  const n = ti(s), o = /* @__PURE__ */ new Map();
  for (const [a, l] of t) {
    const d = Rt(new Date(a)), p = o.get(d) || { hp: 0, grid: 0, priced: 0, gridForPrice: 0 };
    p.hp += l.hp, p.grid += l.grid, l.price !== void 0 && (p.priced += l.grid * l.price, p.gridForPrice += l.grid), o.set(d, p);
  }
  return r.map((a) => {
    const l = o.get(a.day);
    let d, p = !1;
    l && l.hp > 0.05 && (e || i) ? d = Math.min(1, l.grid / l.hp) : i ? (d = Math.max(0.45, Math.min(0.92, 0.6 + a.el / 60)), p = !0) : d = 1;
    const h = l && l.gridForPrice > 0.01 ? l.priced / l.gridForPrice : n.price, m = a.el * d, u = a.el - m;
    return {
      day: a.day,
      el: a.el,
      grid: m,
      self: u,
      heat: a.heat,
      cost: m * h,
      feedLoss: u * n.feed_in,
      gas: a.heat / Math.max(0.5, n.gas_eff / 100) * n.gas_price,
      estimated: p,
      noShare: !e && !i
    };
  });
}
async function zr(r, t, e, s) {
  if (!r.length) return [];
  if (e) return ms(r, Mr(e), !0, t, !0);
  if (!s) return ms(r, /* @__PURE__ */ new Map(), !1, t, !1);
  const { hours: i, share: n } = await Sr(s, t, 31);
  return ms(r, i, n, t, !1);
}
function fs(r) {
  if (!r.length) return null;
  const t = { el: 0, grid: 0, self: 0, heat: 0, cost: 0, feedLoss: 0, gas: 0, estimated: !1, noShare: !1 };
  for (const e of r)
    t.el += e.el, t.grid += e.grid, t.self += e.self, t.heat += e.heat, t.cost += e.cost, t.feedLoss += e.feedLoss, t.gas += e.gas, t.estimated ||= e.estimated, t.noShare ||= e.noShare;
  return t;
}
function Mt(r, t, e) {
  r.dispatchEvent(new CustomEvent(t, { detail: e, bubbles: !0, composed: !0 }));
}
const Re = class Re extends st {
  constructor() {
    super(...arguments), this.plant = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._cfg = structuredClone(this.plant?.settings?.wizard || bs());
  }
  _upd(t) {
    this._cfg = { ...this._cfg, ...t };
  }
  _generate() {
    this.plant && !confirm(c("wz.replace_confirm")) || Mt(this, "plant-generated", ts(this._cfg, this.plant));
  }
  render() {
    const t = this._cfg, e = (s, i = "text") => f`<input type=${i} .value=${String(t[s] ?? "")}
      @change=${(n) => {
      const o = n.target.value;
      this._upd({ [s]: i === "number" ? Number(o) : o });
    }} />`;
    return f`
      <div class="card wrap">
        <h2>${c("wz.title")}</h2>
        <p class="muted">${c("wz.intro")}</p>
        <label class="field">${c("wz.name")} ${e("name")}</label>

        <h3>${c("wz.hp")}</h3>
        <div class="grid">
          <label class="field">${c("wz.outdoor")}
            <select @change=${(s) => this._upd({ outdoorModel: s.target.value })}>
              ${Ee.map((s) => f`<option value=${s.id} ?selected=${s.id === t.outdoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${e("outdoorLabel")}</label>
          <label class="field">${c("ed.nominal")} ${e("nominalKw", "number")}</label>
          <label class="field">${c("wz.indoor")}
            <select @change=${(s) => this._upd({ indoorModel: s.target.value })}>
              ${Ys.map((s) => f`<option value=${s.id} ?selected=${s.id === t.indoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${c("ed.label")} ${e("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${t.aux} @change=${(s) => this._upd({ aux: s.target.checked })} /> ${c("wz.aux")}</label>
            ${t.aux ? f`<label class="field">${c("wz.aux_kw")} ${e("auxKw", "number")}</label>` : y}
          </div>
        </div>

        <h3>${c("wz.buffer")}</h3>
        <div class="grid">
          <div class="radios">
            ${["parallel", "serial", "none"].map(
      (s) => f`<label><input type="radio" name="buf" .checked=${t.buffer === s} @change=${() => this._upd({ buffer: s })} /> ${c(`wz.buffer.${s}`)}</label>`
    )}
          </div>
          ${t.buffer !== "none" ? f`<label class="field">${c("wz.buffer_volume")} ${e("bufferVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${e("bufferLabel")}</label>` : y}
        </div>

        <h3>${c("wz.dhw")}</h3>
        <div class="grid">
          <div class="radios">
            ${["tank", "none"].map(
      (s) => f`<label><input type="radio" name="dhw" .checked=${t.dhw === s} @change=${() => this._upd({ dhw: s })} /> ${c(`wz.dhw.${s}`)}</label>`
    )}
          </div>
          ${t.dhw === "tank" ? f`<label class="field">${c("wz.dhw_volume")} ${e("dhwVolume", "number")}</label>
                <label class="field">${c("ed.label")} ${e("dhwLabel")}</label>
                <label class="check"><input type="checkbox" .checked=${t.circulation} @change=${(s) => this._upd({ circulation: s.target.checked })} /> ${c("wz.circulation")}</label>` : y}
        </div>

        <h3>${c("wz.circuits")}</h3>
        ${t.circuits.map(
      (s, i) => f`<div class="circuit">
            <b>${c("wz.circuit", { n: i + 1 })}</b>
            <input .value=${s.label} @change=${(n) => this._circ(i, { label: n.target.value })} />
            <select @change=${(n) => this._circ(i, { emitter: n.target.value })}>
              <option value="radiators" ?selected=${s.emitter === "radiators"}>${c("type.radiators")}</option>
              <option value="floor_heating" ?selected=${s.emitter === "floor_heating"}>${c("type.floor_heating")}</option>
            </select>
            <label class="check"><input type="checkbox" .checked=${s.mixed} @change=${(n) => this._circ(i, { mixed: n.target.checked })} /> ${c("wz.mixed")}</label>
            <button class="ghost danger" ?disabled=${t.circuits.length < 2} @click=${() => this._upd({ circuits: t.circuits.filter((n, o) => o !== i) })}>${c("wz.remove")}</button>
          </div>`
    )}
        <button ?disabled=${t.circuits.length >= 4} @click=${() => this._upd({ circuits: [...t.circuits, { emitter: "floor_heating", mixed: !0, label: c("wz.circuit", { n: t.circuits.length + 1 }) }] })}>
          ${B("plus")} ${c("wz.add_circuit")}</button>

        <h3>${c("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${t.separator} @change=${(s) => this._upd({ separator: s.target.checked })} /> ${c("wz.separator")}</label>
          <label><input type="checkbox" .checked=${t.expansion} @change=${(s) => this._upd({ expansion: s.target.checked })} /> ${c("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => this._cfg = bs()}>${c("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${B("wand")} ${c("wz.generate")}</button>
        </div>
      </div>
    `;
  }
  _circ(t, e) {
    const s = this._cfg.circuits.map((i, n) => n === t ? { ...i, ...e } : i);
    this._upd({ circuits: s });
  }
};
Re.properties = { plant: { attribute: !1 }, _cfg: { state: !0 } }, Re.styles = [
  _t,
  rt`
      .wrap { max-width: 920px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; align-items: end; }
      .radios { display: grid; gap: 6px; font-size: 14px; }
      .check { display: flex; gap: 8px; align-items: center; font-size: 14px; color: var(--cp-text); }
      .field.check { display: grid; }
      .circuit { display: grid; grid-template-columns: 110px 1fr 200px auto auto; gap: 8px; align-items: center; margin-bottom: 8px; }
      .actions { margin-top: 22px; }
      @media (max-width: 700px) { .circuit { grid-template-columns: 1fr 1fr; } }
    `
];
let Ws = Re;
const Ie = class Ie extends st {
  constructor() {
    super(...arguments), this._res = null, this._sel = /* @__PURE__ */ new Set(), this._busy = !1, this._msg = "";
  }
  async _scan() {
    this._busy = !0;
    try {
      this._res = await this.api.scan(this.plant), this._sel = new Set(
        this._res.suggestions.filter((t) => !this._comp(t.component_id)?.bindings[t.slot]).map((t) => `${t.component_id}|${t.slot}`)
      );
    } finally {
      this._busy = !1;
    }
  }
  _comp(t) {
    return this.plant.components.find((e) => e.id === t);
  }
  _apply() {
    if (!this._res) return;
    const t = structuredClone(this.plant);
    let e = 0;
    for (const s of this._res.suggestions) {
      if (!this._sel.has(`${s.component_id}|${s.slot}`)) continue;
      const i = t.components.find((n) => n.id === s.component_id);
      i && (i.bindings[s.slot] = s.entity_id, e++);
    }
    Mt(this, "save", t), this._msg = c("map.applied", { count: e });
  }
  render() {
    const t = !!this.hass?.__standalone, e = this._res, s = this.plant.components.flatMap(
      (i) => zt(i).filter((n) => !i.bindings[n.key] && !e?.suggestions.some((o) => o.component_id === i.id && o.slot === n.key)).map((n) => ({ c: i, s: n }))
    );
    return f`<div class="card">
      <h2>${c("map.title")}</h2>
      <p class="muted">${c("map.intro")}</p>
      ${t ? f`<p class="muted">${c("map.standalone")}</p>` : y}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || t} @click=${this._scan}>${B("search")} ${c("map.scan")}</button>
        ${e ? f`<span class="muted">${c("map.found", { count: e.entity_count })}</span>` : y}
        <span class="spacer"></span>
        ${this._msg ? f`<span class="ok">${B("check")} ${this._msg}</span>` : y}
      </div>
      ${e && e.entity_count === 0 ? f`<div class="help"><b>${c("map.none")}</b><p>${c("map.none_help")}</p></div>` : y}
      ${e && e.suggestions.length ? f`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === e.suggestions.length}
                  @change=${(i) => this._sel = i.target.checked ? new Set(e.suggestions.map((n) => `${n.component_id}|${n.slot}`)) : /* @__PURE__ */ new Set()} /></th>
                <th>${c("map.component")}</th><th>${c("map.slot")}</th><th>${c("map.entity")}</th><th>${c("map.value")}</th><th>${c("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${e.suggestions.map((i) => {
      const n = `${i.component_id}|${i.slot}`, o = this._comp(i.component_id), a = o?.bindings[i.slot], l = this.hass?.states[i.entity_id];
      return f`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(n)} @change=${(d) => {
        const p = new Set(this._sel);
        d.target.checked ? p.add(n) : p.delete(n), this._sel = p;
      }} /></td>
                    <td>${o?.label || i.component_id}</td>
                    <td>${Pt(o?.type || "", i.slot)}</td>
                    <td><code>${i.entity_id}</code>${a && a !== i.entity_id ? f`<div class="muted small">${c("map.current")}: ${a}</div>` : y}</td>
                    <td>${l ? `${l.state} ${l.attributes.unit_of_measurement || ""}` : "–"}</td>
                    <td><span class="conf ${i.confidence}">${c(`map.conf.${i.confidence}`)}</span></td>
                  </tr>`;
    })}
              </tbody>
            </table>
          </div>
          <div class="row"><span class="spacer"></span><button class="primary" ?disabled=${!this._sel.size} @click=${this._apply}>${c("map.apply")} (${this._sel.size})</button></div>` : y}
      <h3>${c("map.unbound")}</h3>
      <p class="muted small">${c("map.unbound_hint")}</p>
      <div class="chips">${s.slice(0, 80).map(({ c: i, s: n }) => f`<span class="chip">${i.label || i.id}: ${Pt(i.type, n.key)}</span>`)}</div>
    </div>`;
  }
};
Ie.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _res: { state: !0 },
  _sel: { state: !0 },
  _busy: { state: !0 },
  _msg: { state: !0 }
}, Ie.styles = [
  _t,
  rt`
      .help { margin-top: 12px; padding: 12px; border-radius: 10px; background: color-mix(in srgb, var(--cp-warn) 12%, var(--cp-surface-2)); }
      .help p { margin: 6px 0 0; font-size: 13px; }
      .tbl { overflow: auto; margin: 12px 0; }
      table { border-collapse: collapse; width: 100%; font-size: 13px; }
      th, td { text-align: left; padding: 7px 8px; border-bottom: 1px solid var(--cp-border); vertical-align: top; }
      th { font-size: 11px; color: var(--cp-muted); text-transform: uppercase; }
      code { font-size: 12px; }
      .small { font-size: 11px; }
      .conf { font-size: 11px; padding: 2px 8px; border-radius: 8px; background: var(--cp-surface-2); }
      .conf.high { color: var(--cp-accent); }
      .conf.medium { color: var(--cp-warn); }
      .ok { color: var(--cp-accent); display: inline-flex; gap: 4px; align-items: center; font-size: 13px; }
      .chips { display: flex; flex-wrap: wrap; gap: 6px; }
      .chip { font-size: 11px; padding: 3px 8px; border-radius: 8px; background: var(--cp-surface-2); color: var(--cp-muted); }
    `
];
let Ds = Ie;
const Ar = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"], je = class je extends st {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this._err = "", this._iso = !1;
  }
  async _upload(t) {
    const e = t.target, s = e.files?.[0];
    if (e.value = "", !s) return;
    if (this._err = "", s.size > 256 * 1024) {
      this._err = c("ic.err.too_large");
      return;
    }
    const i = await new Promise((n, o) => {
      const a = new FileReader();
      a.onload = () => n(String(a.result).split(",")[1] || ""), a.onerror = () => o(a.error), a.readAsDataURL(s);
    });
    try {
      await this.api.uploadIcon(s.name.replace(/\.[^.]+$/, ""), s.type || "image/svg+xml", i, this._iso), Mt(this, "icons-changed");
    } catch (n) {
      const o = n?.code || n?.error?.code || "invalid_data";
      this._err = c(`ic.err.${o}`);
    }
  }
  async _delete(t) {
    await this.api.deleteIcon(t), Mt(this, "icons-changed");
  }
  _typeDefault(t, e) {
    const s = structuredClone(this.plant);
    s.settings.typeIcons = { ...s.settings.typeIcons || {} }, e ? s.settings.typeIcons[t] = e : delete s.settings.typeIcons[t], Mt(this, "save", s);
  }
  /** Where an icon is in use: components with it as their own icon, types with it as default. */
  _usage(t) {
    const e = this.plant.components.filter((i) => i.icon === t).map((i) => i.label || c(`type.${i.type}`)), s = Object.entries(this.plant.settings.typeIcons || {}).filter(([, i]) => i === t).map(([i]) => c(`type.${i}`));
    return !e.length && !s.length ? f`<div class="use muted">${c("ic.unused")}</div>` : f`<div class="use">
      ${e.length ? f`<div>${c("ic.used_by", { list: e.join(", ") })}</div>` : y}
      ${s.length ? f`<div>${c("ic.default_for", { list: s.join(", ") })}</div>` : y}
    </div>`;
  }
  /** Components of this type that use an own icon (they override the type default). */
  _ownHint(t) {
    const e = this.plant.components.filter((n) => n.type === t), s = e.filter((n) => n.icon && this.icons.has(n.icon));
    if (!s.length) return y;
    const i = s.length === 1 && e.length === 1 ? c("ic.own_one", { name: this.icons.get(s[0].icon).name }) : c("ic.own_some", { n: s.length, m: e.length });
    return f`<span class="hint">${i}</span>`;
  }
  render() {
    const t = [...this.icons.values()];
    return f`<div class="card">
      <h2>${c("ic.title")}</h2>
      <p class="muted">${c("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${B("upload")} ${c("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(e) => this._iso = e.target.checked} /> ${c("ic.iso")}</label>
        ${this._err ? f`<span class="err">${this._err}</span>` : y}
      </div>
      ${t.length ? f`<div class="gallery">${t.map(
      (e) => f`<div class="ic">
              <div class="prev"><img src=${e.data_url} alt=${e.name} /></div>
              <div class="name">${e.name}${e.iso ? f` <span class="muted">· iso</span>` : y}</div>
              ${this._usage(e.id)}
              <button class="ghost danger icon" @click=${() => this._delete(e.id)}>${B("trash")}</button>
            </div>`
    )}</div>` : f`<p class="muted">${c("ic.empty")}</p>`}
      <h3>${c("ic.type_default")}</h3>
      <div class="defaults">
        ${Ar.map(
      (e) => f`<label class="field">${c(`type.${e}`)}
            <select @change=${(s) => this._typeDefault(e, s.target.value)}>
              <option value="">${c("ed.icon_default")}</option>
              ${t.map((s) => f`<option value=${s.id} ?selected=${this.plant.settings.typeIcons?.[e] === s.id}>${s.name}</option>`)}
            </select>${this._ownHint(e)}</label>`
    )}
      </div>
    </div>`;
  }
};
je.properties = { plant: { attribute: !1 }, api: { attribute: !1 }, icons: { attribute: !1 }, _err: { state: !0 }, _iso: { state: !0 } }, je.styles = [
  _t,
  rt`
      .up { cursor: pointer; }
      .small { font-size: 13px; }
      .err { color: var(--cp-error); font-size: 13px; }
      .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; margin-top: 14px; }
      .ic { background: var(--cp-surface-2); border-radius: 12px; padding: 10px; display: grid; gap: 6px; position: relative; }
      .ic button { position: absolute; top: 4px; right: 4px; }
      .prev { height: 90px; display: grid; place-items: center; background: var(--cp-bg-2); border-radius: 8px; }
      .prev img { max-width: 90%; max-height: 80px; }
      .name { font-size: 12px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .use { font-size: 11px; color: var(--cp-accent); line-height: 1.35; }
      .use.muted { color: var(--cp-muted); }
      .hint { font-size: 11px; color: var(--cp-accent); font-weight: 500; }
      .defaults { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; }
    `
];
let Ts = je;
const Ke = class Ke extends st {
  constructor() {
    super(...arguments), this.version = "", this._backups = null, this._tariff = null, this._bmsg = "", this._energy = null, this._note = "";
  }
  _tariffSection() {
    const t = { ...ti(this.plant), ...this._tariff || {} }, e = (i) => this._tariff = { ...this._tariff || {}, ...i }, s = (i, n, o) => f`<label class="field">${n}<input type="number" step=${o} min="0" .value=${String(t[i])}
        @change=${(a) => e({ [i]: Number(a.target.value) })} /></label>`;
    return f`<div class="card wrap">
      <h2>${c("st.tariff")}</h2>
      <p class="muted">${c("st.tariff_hint")}</p>
      <div class="grid2">
        <label class="field">${c("st.t_mode")}
          <select @change=${(i) => e({ mode: i.target.value })}>
            <option value="fixed" ?selected=${t.mode === "fixed"}>${c("st.t_fixed")}</option>
            <option value="entity" ?selected=${t.mode === "entity"}>${c("st.t_entity")}</option>
          </select></label>
        ${t.mode === "entity" ? f`<label class="field">${c("st.t_entity_pick")}
              <cp-entity-picker .hass=${this.hass} .value=${t.price_entity || ""} @value-changed=${(i) => e({ price_entity: i.detail || void 0 })}></cp-entity-picker></label>` : s("price", c("st.t_price"), "0.01")}
        ${s("feed_in", c("st.t_feed_in"), "0.001")}
        ${s("gas_price", c("st.t_gas"), "0.01")}
        ${s("gas_eff", c("st.t_gas_eff"), "1")}
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._tariff} @click=${() => {
      this._patch({ tariff: { ...this.plant.settings.tariff || {}, ...this._tariff } }), this._tariff = null;
    }}>${B("save")} ${c("st.save")}</button></div>
    </div>`;
  }
  connectedCallback() {
    super.connectedCallback(), this._loadBackups();
  }
  async _loadBackups() {
    try {
      this._backups = this.api ? await this.api.listBackups() : [];
    } catch {
      this._backups = [];
    }
  }
  async _restore(t) {
    if (!(!this.api || !confirm(c("bk.restore_confirm", { date: new Date(t.ts * 1e3).toLocaleString() }))))
      try {
        Mt(this, "plant-restored", await this.api.restoreBackup(t.ts)), this._bmsg = c("bk.restored"), await this._loadBackups();
      } catch (e) {
        this._bmsg = e?.message || String(e);
      }
  }
  _export() {
    const t = new Blob([JSON.stringify(this.plant, null, 2)], { type: "application/json" }), e = document.createElement("a"), s = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), i = (this.plant.name || "plant").replace(/[^\w-]+/g, "_");
    e.href = URL.createObjectURL(t), e.download = `copilot-${i}-${s}.json`, e.click(), setTimeout(() => URL.revokeObjectURL(e.href), 1e3);
  }
  async _import(t) {
    const e = t.target, s = e.files?.[0];
    if (e.value = "", !!s)
      try {
        const i = JSON.parse(await s.text());
        if (!Array.isArray(i.components) || !Array.isArray(i.pipes) || !i.grid) throw new Error(c("bk.invalid"));
        if (!confirm(c("bk.import_confirm", { name: i.name || s.name, n: i.components.length }))) return;
        i.settings = { ...this.plant.settings, ...i.settings || {} }, Mt(this, "save", i), this._bmsg = c("bk.imported"), setTimeout(() => this._loadBackups(), 800);
      } catch (i) {
        this._bmsg = `${c("bk.invalid")} (${i?.message || i})`;
      }
  }
  _backupSection() {
    const t = (e) => c(`bk.reason.${e}`);
    return f`<div class="card wrap">
      <h2>${c("bk.title")}</h2>
      <p class="muted">${c("bk.hint")}</p>
      <div class="row">
        <button @click=${this._export}>${B("download")} ${c("bk.export")}</button>
        <label class="filebtn">${B("upload")} ${c("bk.import")}
          <input type="file" accept="application/json,.json" @change=${this._import} /></label>
        ${this._bmsg ? f`<span class="muted">${this._bmsg}</span>` : y}
      </div>
      ${this._backups === null ? y : this._backups.length ? f`<ul class="backups">
              ${this._backups.map(
      (e) => f`<li>
                  <div><b>${new Date(e.ts * 1e3).toLocaleString()}</b>
                    <span class="muted"> · ${t(e.reason)}${e.version ? ` · v${e.version}` : ""} · ${c("bk.components", { n: e.components })}</span></div>
                  <button @click=${() => this._restore(e)}>${B("undo")} ${c("bk.restore")}</button>
                </li>`
    )}
            </ul>` : f`<p class="muted">${c(this.api?.standalone ? "bk.demo" : "bk.none")}</p>`}
    </div>`;
  }
  _en() {
    return this._energy ?? this.plant.settings.energy ?? {};
  }
  _setEn(t) {
    this._energy = { ...this._en(), ...t };
  }
  _detect() {
    if (!this.hass) return;
    const t = Ro(this.hass), e = Object.entries(t).some(([s, i]) => typeof i == "string" && s !== "enabled");
    this._energy = { ...this._en(), ...t }, this._note = c(e ? "st.energy_detected" : "st.energy_none");
  }
  _saveEnergy() {
    this._patch({ energy: this._en() }), this._energy = null, this._note = "";
  }
  _energySection() {
    const t = this._en(), e = (i, n) => f`<label class="field">${n}
        <cp-entity-picker .hass=${this.hass} .value=${t[i] || ""}
          @value-changed=${(o) => this._setEn({ [i]: o.detail || void 0 })}></cp-entity-picker></label>`, s = (i, n, o = !1) => f`<label class="check"><input type="checkbox" .checked=${t[i] ?? o}
        @change=${(a) => this._setEn({ [i]: a.target.checked })} />${n}</label>`;
    return f`<div class="card wrap">
      <h2>${c("st.energy")}</h2>
      <p class="muted">${c("st.energy_hint")}</p>
      ${s("enabled", c("st.energy_enabled"))}
      ${this.hass && !this.hass.__standalone ? f`<div class="row"><button @click=${this._detect}>${B("search")} ${c("st.energy_detect")}</button>
            ${this._note ? f`<span class="muted">${this._note}</span>` : y}</div>` : y}
      <div class="grid2">
        ${e("pv", c("st.e_pv"))}
        <div>${e("grid", c("st.e_grid"))}${s("grid_invert", c("st.e_grid_invert"))}</div>
        <div>${e("battery", c("st.e_battery"))}${s("battery_invert", c("st.e_battery_invert"))}</div>
        ${e("battery_soc", c("st.e_soc"))}
        <div>${e("house", c("st.e_house"))}${s("house_includes_hp", c("st.e_house_hp"), !0)}</div>
        ${e("wallbox", c("st.e_wallbox"))}
        <label class="field">${c("st.e_limit")}
          <input type="number" step="0.1" min="0" .value=${String(t.limit_14a ?? 4.2)}
            @change=${(i) => this._setEn({ limit_14a: Number(i.target.value) })} /></label>
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._energy} @click=${this._saveEnergy}>${B("save")} ${c("st.save")}</button></div>
    </div>`;
  }
  _patch(t) {
    const e = structuredClone(this.plant);
    e.settings = { ...e.settings, ...t }, Mt(this, "save", e);
  }
  render() {
    const t = this.plant.settings;
    return f`<div class="card wrap">
      <h2>${c("st.title")}</h2>
      <label class="field">${c("st.style")}
        <select @change=${(e) => this._patch({ style: e.target.value })}>
          <option value="flat" ?selected=${t.style === "flat"}>${c("st.style.flat")}</option>
          <option value="iso" ?selected=${t.style === "iso"}>${c("st.style.iso")}</option>
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${t.demo} @change=${(e) => this._patch({ demo: e.target.checked })} />
        <span><b>${c("st.demo")}</b><br /><span class="muted">${c("st.demo_hint")}</span></span></label>
      <label class="field">${c("st.language")}
        <select @change=${(e) => this._patch({ language: e.target.value })}>
          ${["auto", "de", "en"].map((e) => f`<option value=${e} ?selected=${(t.language || "auto") === e}>${e === "auto" ? c("st.lang.auto") : e === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${!!t.write_non_admin} @change=${(e) => this._patch({ write_non_admin: e.target.checked })} />
        <span><b>${c("st.write_non_admin")}</b><br /><span class="muted">${c("st.write_hint")}</span></span></label>
      <label class="field">${c("st.heat_load")}
        <input type="number" step="0.1" .value=${String(t.heat_load ?? 6.2)} @change=${(e) => this._patch({ heat_load: Number(e.target.value) })} /></label>
      <div class="row foot">
        <span class="muted">${c("st.version")} ${this.version}</span>
        <button class="ghost" @click=${() => Mt(this, "show-credits")}>${B("info")} ${c("st.about")}</button>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(c("st.reset_confirm")) && Mt(this, "reset-plant")}>${c("st.reset")}</button>
      </div>
    </div>
    ${this._energySection()}
    ${this._tariffSection()}
    ${this._backupSection()}`;
  }
};
Ke.properties = {
  plant: { attribute: !1 },
  version: {},
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _energy: { state: !0 },
  _note: { state: !0 },
  _backups: { state: !0 },
  _tariff: { state: !0 },
  _bmsg: { state: !0 }
}, Ke.styles = [
  _t,
  rt`
      .wrap { max-width: 640px; display: grid; gap: 16px; }
      .toggle { display: flex; gap: 10px; align-items: flex-start; font-size: 14px; }
      .toggle input { margin-top: 4px; }
      .foot { margin-top: 8px; }
      :host { display: grid; gap: 16px; align-content: start; }
      h2 { margin: 0; }
      .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px 16px; }
      .check { display: flex; gap: 8px; align-items: center; font-size: 13px; margin-top: 6px; }
      .check input { width: auto; margin: 0; }
      .backups { list-style: none; margin: 0; padding: 0; display: grid; gap: 6px; }
      .backups li { display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 8px 10px;
        border: 1px solid var(--cp-border); border-radius: 10px; font-size: 13px; }
      .filebtn { position: relative; display: inline-flex; gap: 6px; align-items: center; cursor: pointer; padding: 7px 12px;
        border: 1px solid var(--cp-border); border-radius: 10px; font-size: 13px; font-weight: 600; }
      .filebtn input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
    `
];
let Os = Ke;
for (const [r, t] of [
  ["cp-wizard", Ws],
  ["cp-mapping", Ds],
  ["cp-icons", Ts],
  ["cp-settings", Os]
])
  customElements.get(r) || customElements.define(r, t);
const Er = 10 * 6e4, Cr = 5e3;
function Fi(r) {
  return r === void 0 ? "#8b949e" : r >= 3.5 ? Lt.green : r >= 3 ? Lt.yellow : Lt.red;
}
let Gi = null;
const Fe = class Fe extends st {
  constructor() {
    super(...arguments), this._chartKey = "", this._costs = [], this._costKey = "", this.sim = null, this.version = 0, this._data = null, this._error = "", this._loadedAt = 0, this._loadedFor = null;
  }
  connectedCallback() {
    super.connectedCallback(), Gi ??= import("./echart-ClGzWTJI.js").catch((t) => {
      Gi = null, console.error("COPilot: chart module failed to load", t);
    });
  }
  willUpdate() {
    const t = this.sim || this.plant, e = Date.now() - this._loadedAt;
    (t !== this._loadedFor || e > (this.sim ? Cr : Er)) && (this._loadedFor = t, this._loadedAt = Date.now(), this._load());
  }
  async _load() {
    try {
      this._error = "", this.sim ? this._data = To(this.sim) : this.hass && !this.hass.__standalone && (this._data = await Do(this.hass, this.plant));
      const t = (this._data?.daily || []).slice(-30);
      this._costs = await zr(t, this.plant, this.sim, this.hass && !this.hass.__standalone ? this.hass : void 0);
    } catch (t) {
      this._error = t?.message || String(t);
    }
  }
  _live() {
    const t = xn(this.plant, this.src), e = 62, s = 2 * Math.PI * e, i = t ? Math.min(1, t.cop / 7) : 0, n = t ? Lt[t.ampel] : "var(--cp-muted)";
    return f`<div class="card live">
      <div class="cap">${c("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${e} class="track" />
          ${S`<circle cx="80" cy="80" r=${e} class="bar" style="stroke:${n};stroke-dasharray:${s * i} ${s}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${n}">${t ? G(t.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${t ? f`<div class="lv-row"><span>${c("eff.expected", { out: G(t.tOut, 0), flow: G(t.tFlow, 0) })}</span><b>${G(t.expected, 1)}</b></div>
            <div class="lv-row"><span>${c("eff.ratio")}</span><b style="color:${n}">${G(t.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${n}">${c(`eff.ampel.${t.ampel}`)}</div>` : f`<p class="muted small">${c("eff.no_live")}</p>`}
    </div>`;
  }
  _tile(t, e, s) {
    const i = Ci(e), n = e && e.heat > 0 ? e.heatDhw / e.heat : void 0, o = e && e.el > 0 ? e.aux / e.el : void 0;
    return f`<div class="card tile">
      <div class="cap">${c(`eff.${t}`)} ${s ? f`<span class="est">${c("eff.estimate")}</span>` : y}</div>
      <div class="spf" style="color:${Fi(i)}">${i !== void 0 ? G(i, 2) : "–"}<small>${t === "today" || t === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${c("eff.heat")}</span><b>${e ? G(e.heat, e.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.el")}</span><b>${e ? G(e.el, e.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${c("eff.dhw_share")}</span><b>${n !== void 0 ? G(n * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("eff.aux_share")}</span><b>${o !== void 0 ? G(o * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }
  _chart(t) {
    const e = t.daily.slice(-30);
    if (!e.length) return y;
    const s = _i() === "de" ? "de-DE" : "en-GB", i = (a) => new Date(a).toLocaleDateString(s, { day: "2-digit", month: "2-digit" }), n = (a) => new Date(a).toLocaleDateString(s, { weekday: "short", day: "2-digit", month: "2-digit" }), o = JSON.stringify(e);
    return o !== this._chartKey && (this._chartKey = o, this._chartOption = (a) => ({
      animationDuration: 400,
      textStyle: { fontFamily: "inherit" },
      grid: { left: 8, right: 8, top: 46, bottom: 8, containLabel: !0 },
      legend: {
        top: 0,
        right: 0,
        itemWidth: 12,
        itemHeight: 12,
        textStyle: { color: a.muted },
        inactiveColor: a.border,
        data: [c("eff.heat"), c("eff.el"), { name: c("eff.spf_short"), icon: "circle" }]
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow", shadowStyle: { color: "rgba(127,127,127,0.12)" } },
        backgroundColor: a.surface,
        borderColor: a.border,
        textStyle: { color: a.text, fontSize: 12 },
        formatter: (l) => {
          const d = Array.isArray(l) ? l : [l], p = d[0]?.dataIndex ?? 0, h = d.map((m) => {
            const u = m.value;
            if (u == null || u === "-") return "";
            const _ = m.seriesIndex === 2 ? "" : " kWh";
            return `<div style="display:flex;gap:10px;justify-content:space-between"><span>${m.marker}${m.seriesName}</span><b>${G(u, m.seriesIndex === 2 ? 2 : 1)}${_}</b></div>`;
          }).join("");
          return `<div style="margin-bottom:4px;font-weight:700">${n(e[p].day)}</div>${h}`;
        }
      },
      dataZoom: [{ type: "inside", minValueSpan: 5 }],
      xAxis: {
        type: "category",
        data: e.map((l) => i(l.day)),
        axisLine: { lineStyle: { color: a.border } },
        axisTick: { show: !1 },
        axisLabel: { color: a.muted, hideOverlap: !0 }
      },
      yAxis: [
        {
          type: "value",
          name: "kWh",
          nameTextStyle: { color: a.muted, align: "left" },
          axisLabel: { color: a.muted },
          splitLine: { lineStyle: { color: a.border, type: "dashed" } }
        },
        {
          type: "value",
          name: c("eff.spf_short"),
          min: 0,
          max: 6,
          interval: 2,
          nameTextStyle: { color: a.muted, align: "right" },
          axisLabel: { color: a.muted },
          splitLine: { show: !1 }
        }
      ],
      series: [
        {
          name: c("eff.heat"),
          type: "bar",
          data: e.map((l) => Math.round(l.heat * 10) / 10),
          itemStyle: { color: "#ff8a3d", borderRadius: [3, 3, 0, 0] },
          barGap: "10%",
          barCategoryGap: "35%"
        },
        {
          name: c("eff.el"),
          type: "bar",
          data: e.map((l) => Math.round(l.el * 10) / 10),
          itemStyle: { color: "#4d9fff", borderRadius: [3, 3, 0, 0] }
        },
        {
          name: c("eff.spf_short"),
          type: "line",
          yAxisIndex: 1,
          smooth: 0.3,
          symbol: "circle",
          symbolSize: 7,
          connectNulls: !0,
          lineStyle: { color: a.text, width: 1.5, type: "dashed", opacity: 0.7 },
          data: e.map((l) => {
            const d = Ci(l);
            return d === void 0 ? null : { value: Math.round(d * 100) / 100, itemStyle: { color: Fi(d) } };
          }),
          markLine: {
            silent: !0,
            symbol: "none",
            label: { show: !1 },
            lineStyle: { color: Lt.yellow, type: "dotted", opacity: 0.6 },
            data: [{ yAxis: 3 }]
          }
        }
      ]
    })), f`<div class="card chart">
      <div class="cap">${c("eff.daily")}</div>
      <cp-echart .option=${this._chartOption}></cp-echart>
      ${t.estimated.month ? f`<p class="muted small">${c("eff.demo_note")}</p>` : y}
    </div>`;
  }
  // ------------------------------------------------------------ costs
  _costTile(t, e) {
    const s = (a) => `${G(a, a >= 100 ? 0 : 2)} €`, i = e && e.el > 0.05 && !e.noShare ? e.self / e.el : void 0, n = e && e.heat > 0.1 ? (e.cost + e.feedLoss) / e.heat : void 0, o = e && e.gas > 0.01 ? 1 - (e.cost + e.feedLoss) / e.gas : void 0;
    return f`<div class="card tile">
      <div class="cap">${c(`cost.${t}`)}${e?.estimated ? f` <span class="est">${c("eff.estimate")}</span>` : y}</div>
      <div class="spf">${e ? s(e.cost) : "–"}<small>${c("cost.grid_cost")}</small></div>
      <div class="kv"><span>${c("cost.pv_share")}</span><b>${i !== void 0 ? G(i * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${c("cost.feed_loss")}</span><b>${e && !e.noShare ? s(e.feedLoss) : "–"}</b></div>
      <div class="kv"><span>${c("cost.per_kwh")}</span><b>${n !== void 0 ? G(n * 100, 1) + " ct" : "–"}</b></div>
      <div class="kv"><span>${c("cost.vs_gas")}</span><b class=${o !== void 0 && o >= 0 ? "good" : ""}>${e ? s(e.gas) : "–"}${o !== void 0 ? f` <small>(${o >= 0 ? "−" : "+"}${G(Math.abs(o) * 100, 0)} %)</small>` : y}</b></div>
    </div>`;
  }
  _costSection() {
    const t = this._costs;
    if (!t.length) return y;
    const e = t[t.length - 1], s = t.length > 1 ? t[t.length - 2] : null, i = JSON.stringify(t.map((n) => [n.day, n.grid, n.self, n.cost]));
    if (i !== this._costKey) {
      this._costKey = i;
      const n = _i() === "de" ? "de-DE" : "en-GB", o = (a) => new Date(a).toLocaleDateString(n, { day: "2-digit", month: "2-digit" });
      this._costOption = (a) => ({
        animationDuration: 400,
        textStyle: { fontFamily: "inherit" },
        grid: { left: 8, right: 8, top: 46, bottom: 8, containLabel: !0 },
        legend: { top: 0, right: 0, itemWidth: 12, itemHeight: 12, textStyle: { color: a.muted }, inactiveColor: a.border },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow", shadowStyle: { color: "rgba(127,127,127,0.12)" } },
          backgroundColor: a.surface,
          borderColor: a.border,
          textStyle: { color: a.text, fontSize: 12 },
          valueFormatter: (l) => typeof l == "number" ? G(l, 2) : String(l)
        },
        dataZoom: [{ type: "inside", minValueSpan: 5 }],
        xAxis: { type: "category", data: t.map((l) => o(l.day)), axisLine: { lineStyle: { color: a.border } }, axisTick: { show: !1 }, axisLabel: { color: a.muted, hideOverlap: !0 } },
        yAxis: [
          { type: "value", name: "kWh", nameTextStyle: { color: a.muted, align: "left" }, axisLabel: { color: a.muted }, splitLine: { lineStyle: { color: a.border, type: "dashed" } } },
          { type: "value", name: "€", nameTextStyle: { color: a.muted, align: "right" }, axisLabel: { color: a.muted }, splitLine: { show: !1 } }
        ],
        series: [
          { name: c("cost.grid_kwh"), type: "bar", stack: "el", data: t.map((l) => Math.round(l.grid * 10) / 10), itemStyle: { color: "#4d9fff" }, barCategoryGap: "35%" },
          { name: c("cost.self_kwh"), type: "bar", stack: "el", data: t.map((l) => Math.round(l.self * 10) / 10), itemStyle: { color: "#ffc93c", borderRadius: [3, 3, 0, 0] } },
          { name: c("cost.cost_eur"), type: "line", yAxisIndex: 1, smooth: 0.3, symbol: "circle", symbolSize: 6, data: t.map((l) => Math.round(l.cost * 100) / 100), lineStyle: { color: "#3ddc97", width: 2 }, itemStyle: { color: "#3ddc97" } }
        ]
      });
    }
    return f`
      <h3 class="sec">${c("cost.title")}</h3>
      <div class="tiles">
        ${this._costTile("today", fs([e]))}
        ${this._costTile("yesterday", s ? fs([s]) : null)}
        ${this._costTile("days30", fs(t))}
      </div>
      <div class="card chart">
        <div class="cap">${c("cost.daily")}</div>
        <cp-echart .option=${this._costOption}></cp-echart>
        <p class="muted small">${t.some((n) => n.noShare) ? c("cost.no_share") : ""} ${c("cost.hint")}</p>
      </div>`;
  }
  render() {
    const t = this._data;
    return f`
      <div class="grid">
        ${this._live()}
        <div class="tiles">
          ${this._tile("today", t?.today ?? null, !1)}
          ${this._tile("yesterday", t?.yesterday ?? null, !1)}
          ${this._tile("month", t?.month ?? null, !!t?.estimated.month)}
          ${this._tile("year", t?.year ?? null, !!t?.estimated.year)}
        </div>
      </div>
      ${this._error ? f`<div class="card err">${this._error}</div>` : y}
      ${t?.missing ? f`<div class="card hint">${c(`eff.missing.${t.missing}`)}</div>` : y}
      ${t ? this._chart(t) : y}
      ${this._costSection()}
    `;
  }
};
Fe.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _data: { state: !0 },
  _error: { state: !0 },
  _costs: { state: !0 }
}, Fe.styles = [
  _t,
  rt`
      :host { display: grid; gap: 12px; align-content: start; }
      .grid { display: grid; grid-template-columns: 280px 1fr; gap: 12px; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); font-weight: 700; }
      .live { display: grid; gap: 8px; justify-items: center; }
      .gauge { position: relative; width: 170px; height: 170px; }
      .gauge svg { width: 100%; height: 100%; transform: rotate(-90deg); }
      .track { fill: none; stroke: var(--cp-surface-2); stroke-width: 12; }
      .bar { fill: none; stroke-width: 12; stroke-linecap: round; transition: stroke-dasharray 0.6s; }
      .gv { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
      .big { font-size: 40px; font-weight: 800; font-variant-numeric: tabular-nums; line-height: 1; }
      .lv-row { display: flex; justify-content: space-between; width: 100%; font-size: 13px; color: var(--cp-muted); gap: 8px; }
      .lv-row b { color: var(--cp-text); }
      .verdict { width: 100%; text-align: center; font-size: 13px; font-weight: 700; padding: 6px; border-radius: 10px; border: 1px solid; }
      .tile { display: grid; gap: 6px; align-content: start; }
      .spf { font-size: 34px; font-weight: 800; font-variant-numeric: tabular-nums; }
      .spf small { font-size: 12px; color: var(--cp-muted); margin-left: 6px; font-weight: 700; }
      .kv { display: flex; justify-content: space-between; font-size: 13px; color: var(--cp-muted); }
      .kv b { color: var(--cp-text); font-variant-numeric: tabular-nums; }
      .est { font-size: 10px; color: var(--cp-notice); border: 1px solid currentColor; border-radius: 6px; padding: 0 5px; margin-left: 4px; text-transform: none; letter-spacing: 0; }
      .chart .cap { margin-bottom: 4px; }
      .head { margin-bottom: 6px; }
      .lg { display: inline-flex; gap: 5px; align-items: center; font-size: 12px; color: var(--cp-muted); }
      .lg i { width: 10px; height: 10px; border-radius: 3px; display: inline-block; }
      .lg i.dot { border-radius: 50%; background: var(--cp-text); }
      .grid line.grid, line.grid { stroke: var(--cp-border); }
      .axis { fill: var(--cp-muted); font-size: 10px; }
      .small { font-size: 12px; margin: 6px 0 0; }
      .sec { margin: 18px 0 10px; font-size: 15px; }
      b.good { color: #3ddc97; }
      .tiles + .chart { margin-top: 12px; }
      .hint { font-size: 13px; color: var(--cp-warn); }
      .err { color: var(--cp-error); }
      @media (max-width: 800px) { .grid { grid-template-columns: 1fr; } }
    `
];
let Hs = Fe;
customElements.get("cp-efficiency") || customElements.define("cp-efficiency", Hs);
const Vs = 60;
function At(r, t, e, s) {
  const i = new Array(e).fill(null), n = [...r].sort((l, d) => l.t - d.t);
  let o = 0, a = null;
  for (let l = 0; l < e; l++) {
    const d = t + l * Vs;
    for (; o < n.length && n[o].t <= d; ) a = s(n[o++]);
    i[l] = a;
  }
  return i;
}
const Et = (r) => r.v === null || Number.isNaN(r.v) ? null : r.v;
function Ui(r) {
  const t = [];
  let e = -1;
  return r.forEach((s, i) => {
    s && e < 0 && (e = i), !s && e >= 0 && (t.push([e, i]), e = -1);
  }), e >= 0 && t.push([e, r.length]), t;
}
function Zi(r) {
  const t = r.filter((e) => e !== null);
  return t.length ? t.reduce((e, s) => e + s, 0) / t.length : void 0;
}
const gs = (r, ...t) => r.components.find((e) => t.includes(e.type));
async function $t(r, t, e, s) {
  if (!t || r.get(t, e) === void 0) return [];
  try {
    return await r.history(t, e, s);
  } catch {
    return [];
  }
}
async function Pr(r, t, e = 24, s = Date.now() / 1e3) {
  const i = gs(r, "outdoor_unit"), n = gs(r, "indoor_unit"), o = gs(r, "buffer"), a = Math.floor(e * 3600 / Vs), l = s - a * Vs, [d, p, h, m, u, _, w, b, v, x, k] = await Promise.all([
    $t(t, i, "compressor_on", e),
    $t(t, i, "compressor_speed", e),
    $t(t, i, "heat_power", e),
    $t(t, i, "activity", e),
    $t(t, n, "supply_temp", e),
    $t(t, n, "return_temp", e),
    $t(t, o, "temp_top", e),
    $t(t, n, "buffer_temp", e),
    $t(t, n, "aux_level", e),
    $t(t, n, "vw1_position", e),
    $t(t, n, "pressure", e)
  ]), C = d.length ? d : p.length ? p : h, T = At(C, l, a, Et).map((O) => O !== null && O > (C === h ? 0.2 : 0)), E = At(m, l, a, (O) => Qt({ raw: O.raw ?? null, available: O.raw !== void 0 }) ?? null), D = E.map((O) => O === "defrost"), J = At(x, l, a, Et).map((O, L) => O !== null ? O > 0 : E[L] === "hot_water"), U = T.map((O, L) => O && !D[L] && !J[L]), at = U.map((O, L) => O && U.slice(Math.max(0, L - 5), L).every(Boolean) && L >= 5), X = C.length > 0, lt = [], it = w.length ? w : b;
  if (o || b.length) {
    const O = At(u, l, a, Et), L = At(it, l, a, Et), K = O.map((q, ct) => at[ct] && q !== null && L[ct] !== null ? q - L[ct] : null), j = Zi(K);
    lt.push(
      j === void 0 ? { id: "mixing", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "mixing",
        ampel: j <= 2 ? "green" : j <= 4 ? "yellow" : "red",
        value: `${G(j, 1)} K`,
        detail: "chk.mixing.detail",
        params: { value: j, minutes: K.filter((q) => q !== null).length },
        hint: "chk.mixing.hint"
      }
    );
  }
  if (X) {
    const L = Ui(T).filter(([ot]) => ot > 0), K = L.length, j = L.length ? L.reduce((ot, [dt, wt]) => ot + (wt - dt), 0) / L.length : void 0;
    let q = 0;
    for (let ot = 0; ot + 60 <= a; ot += 10) q = Math.max(q, L.filter(([dt]) => dt >= ot && dt < ot + 60).length);
    const ct = K / e, I = ct <= 1 && q <= 3 && (j ?? 99) >= 20 ? "green" : q > 4 || (j ?? 99) < 10 ? "red" : "yellow";
    lt.push({
      id: "cycling",
      ampel: K === 0 ? "green" : I,
      value: `${K}×`,
      detail: "chk.cycling.detail",
      params: { starts: K, perHour: ct, maxPerHour: q, avgRun: j ?? 0, hours: e },
      hint: "chk.cycling.hint"
    });
  } else
    lt.push({ id: "cycling", ampel: "none", detail: "chk.nodata", params: {} });
  {
    const O = At(u, l, a, Et), L = At(_, l, a, Et), K = O.map((q, ct) => at[ct] && q !== null && L[ct] !== null ? q - L[ct] : null), j = Zi(K);
    lt.push(
      j === void 0 ? { id: "spread", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "spread",
        ampel: j >= 3 && j <= 8 ? "green" : j >= 2 && j <= 10 ? "yellow" : "red",
        value: `${G(j, 1)} K`,
        detail: "chk.spread.detail",
        params: { value: j },
        hint: j < 3 ? "chk.spread.hint_low" : "chk.spread.hint_high"
      }
    );
  }
  if (m.length) {
    const O = Ui(D), L = O.reduce((q, [ct, I]) => q + (I - ct), 0), K = T.filter(Boolean).length || 1, j = L / K;
    lt.push({
      id: "defrost",
      ampel: j <= 0.08 ? "green" : j <= 0.15 ? "yellow" : "red",
      value: `${O.length}×`,
      detail: "chk.defrost.detail",
      params: { count: O.length, minutes: L, share: j * 100 },
      hint: "chk.defrost.hint"
    });
  }
  if (v.length) {
    const L = At(v, l, a, Et).map((K) => K !== null && K > 0).filter(Boolean).length;
    lt.push({
      id: "aux",
      ampel: L === 0 ? "green" : L <= 60 ? "yellow" : "red",
      value: L ? `${Math.round(L)} min` : "0",
      detail: "chk.aux.detail",
      params: { minutes: L },
      hint: "chk.aux.hint"
    });
  }
  if (k.length && n) {
    const O = k.map(Et).filter((I) => I !== null), L = Number(n.props.pressure_min ?? 1), K = Number(n.props.pressure_max ?? 2.7), j = Math.min(...O), q = Math.max(...O), ct = O.length ? O[0] - O[O.length - 1] : 0;
    lt.push({
      id: "pressure",
      ampel: j < L || q > K ? "red" : j < L + 0.2 || ct > 0.2 ? "yellow" : "green",
      value: `${G(j, 1)}–${G(q, 1)} bar`,
      detail: "chk.pressure.detail",
      params: { min: j, max: q, lo: L, hi: K },
      hint: "chk.pressure.hint"
    });
  }
  return lt;
}
const Lr = 2e4, Wr = 5 * 6e4;
function qi(r) {
  const t = {};
  for (const [e, s] of Object.entries(r)) t[e] = typeof s == "number" ? G(s, Number.isInteger(s) ? 0 : 1) : s;
  return t;
}
const Ge = class Ge extends st {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._results = null, this._busy = !1, this._at = 0, this._for = null;
  }
  willUpdate() {
    const t = this.sim || this.plant;
    (t !== this._for || Date.now() - this._at > (this.sim ? Lr : Wr)) && (this._for = t, this._at = Date.now(), this._run());
  }
  async _run() {
    if (!this._busy) {
      this._busy = !0;
      try {
        this._results = await Pr(this.plant, this.src, 24, this.sim ? this.sim.time : Date.now() / 1e3);
      } finally {
        this._busy = !1;
      }
    }
  }
  render() {
    const t = this._results, e = (s) => (t || []).filter((i) => i.ampel === s).length;
    return f`
      <div class="card head">
        <div>
          <h2>${c("chk.title")}</h2>
          <p class="muted">${c("chk.subtitle")}${this.sim ? ` ${c("chk.demo")}` : ""}</p>
        </div>
        <span class="spacer"></span>
        ${t ? f`<div class="sum">
              ${["green", "yellow", "red"].map((s) => f`<span class="dot" style="background:${Lt[s]}"></span><b>${e(s)}</b>`)}
            </div>` : y}
        <button @click=${() => this._run()} ?disabled=${this._busy}>${c("chk.refresh")}</button>
      </div>
      ${t ? f`<div class="list">
            ${t.map(
      (s) => f`<div class="card item ${s.ampel}">
                <span class="lamp" style="background:${s.ampel === "none" ? "var(--cp-muted)" : Lt[s.ampel]}"></span>
                <div class="body">
                  <div class="row nowrap">
                    <b class="title">${c(`chk.${s.id}.title`)}</b>
                    <span class="spacer"></span>
                    ${s.value ? f`<span class="val">${s.value}</span>` : y}
                  </div>
                  <div class="detail">${c(s.detail, qi(s.params))}</div>
                  ${s.hint && (s.ampel === "yellow" || s.ampel === "red") ? f`<div class="hint">${c(s.hint, qi(s.params))}</div>` : y}
                  ${s.ampel === "green" ? f`<div class="ok">${c("chk.ok")}</div>` : y}
                </div>
              </div>`
    )}
          </div>` : f`<div class="card muted">${c("chk.running")}</div>`}
    `;
  }
};
Ge.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _results: { state: !0 },
  _busy: { state: !0 }
}, Ge.styles = [
  _t,
  rt`
      :host { display: grid; gap: 12px; align-content: start; }
      .head { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
      .head p { margin: 0; font-size: 13px; }
      .sum { display: flex; align-items: center; gap: 6px; font-size: 15px; }
      .sum b { margin-right: 8px; }
      .dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; }
      .list { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 12px; }
      .item { display: flex; gap: 12px; }
      .lamp { width: 14px; height: 14px; border-radius: 50%; margin-top: 3px; flex: none; box-shadow: 0 0 12px currentColor; }
      .body { flex: 1; display: grid; gap: 6px; }
      .nowrap { flex-wrap: nowrap; }
      .title { font-size: 15px; }
      .val { font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; }
      .detail { font-size: 13px; color: var(--cp-muted); line-height: 1.45; }
      .hint { font-size: 13px; line-height: 1.45; padding: 8px 10px; border-radius: 10px; background: color-mix(in srgb, var(--cp-warn) 12%, var(--cp-surface-2)); }
      .item.red .hint { background: color-mix(in srgb, var(--cp-error) 14%, var(--cp-surface-2)); }
      .ok { font-size: 12px; color: var(--cp-accent); font-weight: 600; }
    `
];
let Bs = Ge;
customElements.get("cp-check") || customElements.define("cp-check", Bs);
const oe = [
  { key: "design", slot: "design_temp", min: 28, max: 65, step: 1 },
  { key: "offset", slot: "offset_temp", min: -10, max: 10, step: 0.5 },
  { key: "limit", slot: "heating_limit", min: 10, max: 22, step: 0.5 },
  { key: "minFlow", slot: "min_flow_temp", min: 15, max: 40, step: 1 },
  { key: "maxFlow", slot: "max_flow_temp", min: 30, max: 75, step: 1 },
  { key: "minExt", slot: "min_ext_temp", min: -25, max: 0, step: 1 },
  { key: "roomSet", slot: "room_setpoint", min: 15, max: 25, step: 0.5 }
], re = 14, Dr = 90, Yi = 864e5, Xi = -20, _s = 22, Tr = 20, Or = 70;
let Ji = null;
const Ue = class Ue extends st {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this.admin = !1, this._edit = {}, this._points = null, this._hc = "", this._msg = "", this._confirm = !1, this._restart = null, this._loadedFor = null;
  }
  get _circuits() {
    return this.plant.components.filter((t) => t.type === "radiators" || t.type === "floor_heating");
  }
  get _circuit() {
    return this._circuits.find((t) => t.id === this._hc) || this._circuits[0];
  }
  /** Current parameters from the plant (or the simulator in demo mode). */
  _current() {
    const t = this._circuit;
    if (this.sim) return { ...this.sim.curve };
    const e = _n(t?.type === "floor_heating");
    if (!t) return e;
    for (const s of oe) {
      const i = this.src.get(t, s.slot);
      i?.available && i.num !== null && (e[s.key] = i.num);
    }
    return e;
  }
  _writable(t) {
    if (this.sim) return !0;
    const e = this._circuit, s = oe.find((n) => n.key === t), i = e?.bindings[s.slot];
    return !!i && /^(number|input_number)\./.test(i) && this.admin;
  }
  /** Start of the measurement range set by the user (null = last DAYS days). */
  get _since() {
    const t = this._circuit && this.plant.settings.curve_since?.[this._circuit.id], e = t ? new Date(t) : null;
    return e && !isNaN(e.getTime()) && !this.sim ? e : null;
  }
  /** Measurement range: [start, now]. */
  _range(t) {
    const e = this._since, s = e ? new Date(Math.max(e.getTime(), t.getTime() - Dr * Yi)) : new Date(t.getTime() - re * Yi);
    return { start: s, span: Math.max(t.getTime() - s.getTime(), 36e5) };
  }
  _saveSince(t) {
    const e = this._circuit;
    if (!e) return;
    const s = structuredClone(this.plant), i = { ...s.settings.curve_since || {} };
    t ? i[e.id] = t : delete i[e.id], s.settings = { ...s.settings, curve_since: i }, this._restart = null, this.dispatchEvent(new CustomEvent("save", { detail: s, bubbles: !0, composed: !0 }));
  }
  willUpdate() {
    const t = `${this.sim ? "sim" : "ha"}:${this._circuit?.id}:${this._since?.getTime() ?? ""}`;
    t !== this._loadedFor && (this._loadedFor = t, this._load());
  }
  // ------------------------------------------------------------ history
  async _load() {
    this._points = null;
    const t = this._circuit, e = this.plant.components.find((i) => i.type === "outdoor_unit"), s = this.plant.components.find((i) => i.type === "indoor_unit");
    if (!t || !e) {
      this._points = [];
      return;
    }
    try {
      this._points = this.sim ? this._simPoints() : await this._hassPoints(t, e, s);
    } catch {
      this._points = [];
    }
  }
  /** Demo: last 24 h from the simulation plus earlier days from the climate model. */
  _simPoints() {
    const t = this.sim, e = [], s = t.history("outdoor", "outdoor_temp", 24), i = t.history("hc", "flow_temp", 24), n = t.history("hc", "room_temp", 24);
    for (let o = 0; o < 24; o++) {
      const a = t.time - (24 - o) * 3600, l = (u) => u.filter((_) => _.t >= a && _.t < a + 3600 && _.v !== null).map((_) => _.v), d = l(s), p = l(i), h = l(n);
      if (!d.length || !p.length) continue;
      const m = (u) => u.reduce((_, w) => _ + w, 0) / u.length;
      m(d) >= t.curve.limit || e.push({ tOut: m(d), flow: m(p), room: h.length ? m(h) : void 0, age: 0 });
    }
    for (let o = 1; o < re; o++)
      for (let a = 0; a < 24; a += 2) {
        const l = t.outdoorMean + 2.5 * Math.cos((a - 15) / 24 * 2 * Math.PI) + Math.sin(o * 1.7 + a) * 3, d = le(t.curve, l);
        d !== null && e.push({ tOut: l, flow: d + Math.sin(o * 3.1 + a * 0.7) * 1.4 - 0.6, room: t.curve.roomSet + Math.sin(o + a) * 0.3, age: o / re });
      }
    return e;
  }
  /** Hourly means from the recorder's long-term statistics. */
  async _hassPoints(t, e, s) {
    const i = {
      out: e.bindings.outdoor_temp,
      flow: t.bindings.flow_temp || s?.bindings.supply_temp,
      room: t.bindings.room_temp,
      heat: e.bindings.heat_power
    };
    if (!i.out || !i.flow || !this.hass) return [];
    const n = /* @__PURE__ */ new Date(), { start: o, span: a } = this._range(n), l = await this.hass.callWS({
      type: "recorder/statistics_during_period",
      start_time: o.toISOString(),
      end_time: n.toISOString(),
      statistic_ids: Object.values(i).filter(Boolean),
      period: "hour",
      types: ["mean"]
    }), d = (b) => new Map((b ? l[b] || [] : []).map((v) => [v.start, v.mean])), p = d(i.out), h = d(i.flow), m = d(i.room), u = d(i.heat), _ = this._current().limit, w = [];
    for (const [b, v] of p) {
      const x = h.get(b);
      if (v == null || x == null || v >= _) continue;
      const k = u.get(b);
      u.size && (k == null || k < 0.3) || w.push({ tOut: v, flow: x, room: m.get(b) ?? void 0, age: Math.min(1, (n.getTime() - b) / a) });
    }
    return w;
  }
  // ------------------------------------------------------------ actions
  _set(t, e) {
    this._edit = { ...this._edit, [t]: e }, this._msg = "";
  }
  async _apply() {
    this._confirm = !1;
    const t = Object.entries(this._edit);
    if (this.sim)
      this.sim.curve = { ...this.sim.curve, ...this._edit };
    else {
      const e = this._circuit;
      for (const [s, i] of t) {
        const n = oe.find((a) => a.key === s), o = e.bindings[n.slot];
        o && await this.hass.callWS({
          type: "call_service",
          domain: o.split(".")[0],
          service: "set_value",
          service_data: { entity_id: o, value: i }
        });
      }
    }
    this._edit = {}, this._msg = c("cv.applied");
  }
  // ------------------------------------------------------------ render
  _chart(t, e, s) {
    const i = (v) => {
      const x = [];
      for (let k = Xi; k <= Math.min(_s, v.limit); k += 0.5) {
        const C = le(v, k);
        if (C === null) break;
        x.push([k, Math.round(C * 10) / 10]);
      }
      return x;
    }, n = this._circuit, o = this.plant.components.find((v) => v.type === "outdoor_unit"), a = this.plant.components.find((v) => v.type === "indoor_unit"), l = o ? this.src.get(o, "outdoor_temp") : void 0, d = n && this.src.get(n, "flow_temp") || a && this.src.get(a, "supply_temp"), p = l?.available ? l.num : null, h = d?.available ? d.num : null, m = p !== null ? le(t, p) : null, u = i(t), _ = e ? i(e) : [], w = (v) => `${G(v, Number.isInteger(v) ? 0 : 1)} °C`;
    return f`<cp-echart class="curve-chart" .option=${(v) => ({
      animation: !1,
      textStyle: { fontFamily: "inherit" },
      grid: { left: 8, right: 16, top: 30, bottom: 8, containLabel: !0 },
      tooltip: {
        trigger: "item",
        backgroundColor: v.surface,
        borderColor: v.border,
        textStyle: { color: v.text, fontSize: 12 },
        formatter: (x) => {
          const [k, C] = x.value;
          return `<b>${x.seriesName}</b><br>${c("cv.tip", { out: w(k), flow: w(C) })}`;
        }
      },
      xAxis: {
        type: "value",
        min: Xi,
        max: _s,
        interval: 10,
        axisLabel: { color: v.muted, formatter: (x) => `${x} °C` },
        axisLine: { lineStyle: { color: v.border } },
        splitLine: { lineStyle: { color: v.border, type: "dashed" } }
      },
      yAxis: {
        type: "value",
        min: Tr,
        max: Or,
        interval: 10,
        name: c("cv.axis_flow"),
        nameTextStyle: { color: v.muted, align: "left" },
        axisLine: { show: !1, onZero: !1 },
        axisLabel: { color: v.muted },
        splitLine: { lineStyle: { color: v.border, type: "dashed" } }
      },
      series: [
        {
          name: this._pointsLabel(),
          type: "scatter",
          symbolSize: 6,
          z: 1,
          data: s.map((x) => ({ value: [x.tOut, Math.round(x.flow * 10) / 10], itemStyle: { color: "#f5c542", opacity: 0.85 - x.age * 0.6 } })),
          markArea: {
            silent: !0,
            itemStyle: { color: "rgba(77,159,255,0.08)" },
            label: { color: v.muted, position: "insideTop" },
            data: [[{ name: c("cv.no_heating"), xAxis: t.limit }, { xAxis: _s }]]
          }
        },
        {
          name: c("cv.curve"),
          type: "line",
          showSymbol: !1,
          z: 3,
          data: u,
          lineStyle: { color: "#3ddc97", width: 3 },
          itemStyle: { color: "#3ddc97" }
        },
        {
          name: c("cv.preview"),
          type: "line",
          showSymbol: !1,
          z: 4,
          data: _,
          lineStyle: { color: "#4d9fff", width: 2.5, type: "dashed" },
          itemStyle: { color: "#4d9fff" }
        },
        {
          name: c("cv.target"),
          type: "scatter",
          z: 5,
          symbolSize: 13,
          data: p !== null && m !== null ? [[p, Math.round(m * 10) / 10]] : [],
          itemStyle: { color: "transparent", borderColor: "#3ddc97", borderWidth: 2 }
        },
        {
          name: c("cv.now"),
          type: "scatter",
          z: 6,
          symbolSize: 11,
          data: p !== null && h !== null ? [[p, h]] : [],
          itemStyle: { color: "#ff7a45", shadowBlur: 10, shadowColor: "#ff7a45" }
        }
      ]
    })}></cp-echart>`;
  }
  connectedCallback() {
    super.connectedCallback(), Ji ??= import("./echart-ClGzWTJI.js").catch((t) => {
      Ji = null, console.error("COPilot: chart module failed to load", t);
    });
  }
  _pointsLabel() {
    const t = this._since;
    if (!t) return c("cv.points", { days: re });
    const e = t.toLocaleString(void 0, { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    return c("cv.points_since", { date: e });
  }
  /** now as value for <input type="datetime-local"> */
  _localNow() {
    const t = /* @__PURE__ */ new Date();
    return t.setMinutes(t.getMinutes() - t.getTimezoneOffset()), t.toISOString().slice(0, 16);
  }
  render() {
    const t = this._current(), e = Object.keys(this._edit).length > 0, s = e ? { ...t, ...this._edit } : null, i = s || t, n = this._points || [], o = n.filter((h) => h.age < 0.5 && h.room !== void 0).map((h) => h.room), a = o.length ? o.reduce((h, m) => h + m, 0) / o.length : void 0, l = n.length ? n.reduce((h, m) => h + (m.flow - (le(t, m.tOut) ?? m.flow)), 0) / n.length : void 0, d = a !== void 0 ? mo(t, a) : 0, p = this._circuits;
    return f`
      <div class="grid">
        <div class="card chart-card">
          <div class="row head">
            <h2>${c("cv.title")}</h2>
            ${p.length > 1 ? f`<select @change=${(h) => this._hc = h.target.value}>
                  ${p.map((h) => f`<option value=${h.id} ?selected=${h.id === this._circuit?.id}>${h.label}</option>`)}
                </select>` : f`<span class="muted">${this._circuit?.label || ""}</span>`}
            <span class="spacer"></span>
            <span class="lg"><i class="l-curve"></i>${c("cv.curve")}</span>
            ${s ? f`<span class="lg"><i class="l-next"></i>${c("cv.preview")}</span>` : y}
            <span class="lg"><i class="l-pt"></i>${this._pointsLabel()}</span>
            <span class="lg"><i class="l-live"></i>${c("cv.now")}</span>
          </div>
          ${this._chart(t, s, n)}
          ${this.sim ? f`<p class="muted small">${c("cv.demo_note")}</p>` : y}
          ${!this.sim && this.admin ? f`<div class="row since">
                <button class="small-btn" @click=${() => this._restart = this._localNow()}>${B("rotate")} ${c("cv.restart")}</button>
                ${this._since ? f`<button class="small-btn" @click=${() => this._saveSince(null)}>${c("cv.show_all", { days: re })}</button>` : y}
              </div>` : y}
          ${!this.sim && this._points && !n.length ? f`<p class="muted small">${c("cv.no_points")}</p>` : y}
        </div>
        <div class="side">
          <div class="card">
            <div class="cap">${c("cv.params")}</div>
            ${oe.map((h) => {
      const m = i[h.key], u = h.key in this._edit, _ = this._writable(h.key);
      return f`<label class="param ${u ? "changed" : ""}">
                <span class="pname">${c(`cv.p.${h.key}`)}</span>
                <b>${G(m, h.step < 1 ? 1 : 0)} ${h.key === "offset" ? "K" : "°C"}</b>
                <input type="range" min=${h.min} max=${h.max} step=${h.step} .value=${String(m)} ?disabled=${!_}
                  @input=${(w) => this._set(h.key, Number(w.target.value))} />
              </label>`;
    })}
            ${!this.sim && !oe.some((h) => this._writable(h.key)) ? f`<p class="muted small">${c("cv.readonly")}</p>` : y}
            <div class="row actions">
              <button ?disabled=${!e} @click=${() => this._edit = {}}>${c("discard")}</button>
              <span class="spacer"></span>
              <button class="primary" ?disabled=${!e} @click=${() => this._confirm = !0}>${B("check")} ${c("apply")}</button>
            </div>
            ${this._msg ? f`<p class="ok">${this._msg}</p>` : y}
          </div>
          <div class="card">
            <div class="cap">${c("cv.analysis")}</div>
            ${l !== void 0 ? f`<p class="small">${c(l >= 0 ? "cv.deviation_above" : "cv.deviation_below", { value: Math.abs(l) })}</p>` : y}
            ${a !== void 0 ? f`<p class="small">${c("cv.room", { room: a, set: t.roomSet })}</p>
                  ${Math.abs(d) >= 0.5 ? f`<div class="hint">${c(d < 0 ? "cv.suggest_down" : "cv.suggest_up", { value: Math.abs(d), target: t.offset + d })}
                        <button class="small-btn" @click=${() => this._set("offset", t.offset + d)}>${c("cv.try")}</button></div>` : f`<p class="ok small">${c("cv.fits")}</p>`}` : f`<p class="muted small">${c("cv.no_room")}</p>`}
          </div>
        </div>
      </div>
      ${this._restart !== null ? f`<div class="backdrop" @click=${() => this._restart = null}></div>
            <div class="dialog card">
              <h3>${c("cv.restart_title")}</h3>
              <p class="small">${c("cv.restart_text")}</p>
              <label class="small">${c("cv.restart_from")}
                <input type="datetime-local" .value=${this._restart}
                  @input=${(h) => this._restart = h.target.value} /></label>
              <div class="row"><span class="spacer"></span>
                <button @click=${() => this._restart = null}>${c("cancel")}</button>
                <button class="primary" ?disabled=${!this._restart}
                  @click=${() => this._saveSince(new Date(this._restart).toISOString())}>${c("apply")}</button></div>
            </div>` : y}
      ${this._confirm ? f`<div class="backdrop" @click=${() => this._confirm = !1}></div>
            <div class="dialog card">
              <h3>${c("cv.confirm_title")}</h3>
              <ul>${Object.entries(this._edit).map(
      ([h, m]) => f`<li>${c(`cv.p.${h}`)}: ${G(t[h], 1)} → <b>${G(m, 1)}</b></li>`
    )}</ul>
              <p class="muted small">${this.sim ? c("cv.confirm_demo") : c("cv.confirm_live")}</p>
              <div class="row"><span class="spacer"></span>
                <button @click=${() => this._confirm = !1}>${c("cancel")}</button>
                <button class="primary" @click=${this._apply}>${c("apply")}</button></div>
            </div>` : y}
    `;
  }
};
Ue.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  admin: { type: Boolean },
  _edit: { state: !0 },
  _points: { state: !0 },
  _hc: { state: !0 },
  _msg: { state: !0 },
  _confirm: { state: !0 },
  _restart: { state: !0 }
}, Ue.styles = [
  _t,
  rt`
      :host { display: block; }
      .grid { display: grid; grid-template-columns: 1fr 320px; gap: 12px; align-items: start; }
      .head { margin-bottom: 6px; }
      .head h2 { margin: 0 10px 0 0; }
      .head select { width: auto; }
      .curve-chart { height: clamp(280px, 52vh, 520px); }
      .grid line.grid, line.grid { stroke: var(--cp-border); }
      .axis { fill: var(--cp-muted); font-size: 11px; }
      .axis.title { font-weight: 700; }
      .limit { fill: color-mix(in srgb, var(--cp-info) 7%, transparent); }
      .pt { fill: #f5c542; }
      .curve { fill: none; stroke: var(--cp-accent); stroke-width: 3; stroke-linecap: round; }
      .curve.next { stroke: var(--cp-select); stroke-dasharray: 7 6; }
      .target { fill: none; stroke: var(--cp-accent); stroke-width: 2; }
      .live circle { fill: #ff7a45; }
      .live circle.pulse { fill: rgba(255, 122, 69, 0.35); animation: cp-pulse 2s ease-in-out infinite; }
      @keyframes cp-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      .lg { display: inline-flex; gap: 5px; align-items: center; font-size: 12px; color: var(--cp-muted); }
      .lg i { display: inline-block; width: 14px; height: 3px; border-radius: 2px; }
      .l-curve { background: var(--cp-accent); }
      .l-next { background: var(--cp-select); }
      .l-pt { width: 8px !important; height: 8px !important; border-radius: 50% !important; background: #f5c542; }
      .l-live { width: 8px !important; height: 8px !important; border-radius: 50% !important; background: #ff7a45; }
      .side { display: grid; gap: 12px; }
      .cap { font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); font-weight: 700; margin-bottom: 8px; }
      .param { display: grid; grid-template-columns: 1fr auto; gap: 2px 8px; margin-bottom: 10px; font-size: 13px; }
      .param input { grid-column: 1 / -1; }
      .param.changed b { color: var(--cp-select); }
      .pname { color: var(--cp-muted); }
      .actions { margin-top: 6px; }
      .small { font-size: 13px; line-height: 1.45; margin: 6px 0; }
      .ok { color: var(--cp-accent); }
      .hint { font-size: 13px; line-height: 1.45; padding: 8px 10px; border-radius: 10px; background: color-mix(in srgb, var(--cp-warn) 12%, var(--cp-surface-2)); display: grid; gap: 8px; }
      .small-btn { justify-self: start; padding: 4px 10px; font-size: 12px; }
      .since { gap: 8px; margin-top: 6px; flex-wrap: wrap; }
      .dialog input[type="datetime-local"] { display: block; margin-top: 4px; }
      .backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); z-index: 40; }
      .dialog { position: fixed; z-index: 41; left: 50%; top: 30%; transform: translate(-50%, -30%); width: min(420px, 92vw); }
      .dialog h3 { margin-top: 0; color: var(--cp-text); text-transform: none; letter-spacing: 0; font-size: 16px; }
      .dialog ul { padding-left: 18px; font-size: 14px; }
      @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
    `
];
let Ns = Ue;
customElements.get("cp-curve") || customElements.define("cp-curve", Ns);
const Hr = "data:font/woff2;base64,d09GMgABAAAAABwYAA4AAAAAxZgAABu/AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGlQbh0AchXIGYACFABEICoLgRIKUPguDWAABNgIkA4ccBCAFgzAHhVgbyZyjoqSyzkUUpYM1aWQg2DgAKO9N2X85nsjwY6uClRPVtPC4KO8z4wnW1FKCyHhgGBGv+MjCZB/9i3/4m1uhnFb7yppX+eQYHHeXIk9Uv7f17Dti0CEKFS2FTElICiMRwkP5JE8j7z+Dcq7ZJFXEiniQEyup4F6smBXxQnoQTkQ5EdeX8fz/35v73Ok2qcsj2IqNfk7VT2kCQ2naFcLhAGet5/9X93lD9zm/J6hANVAFegN1zqz+C9TbVOgONFA6dAXierAK5I7015r+K8tE5QrkgHZLuNeJLNwVV5XwlckBXS1vCgCusv+z/O6iv9rMRN8kwd/SGges/p+Va8683P1IW6EqmYwFI2v1JXniK/ifY+qfTL8qYpqCpBSAB8RGA57fTQoACowfl/7sveavNYX7sBVK4n9f2ndtGsKa49KUcbDdVDgkwu0t95BYtl4OizBIJAihwf/aq1/0V3tTgDQSsojt+Mk+43g3WW+jtck16APet8/tlnS735Osn2X/2ZQIW4CRNMhiM2x956fy5Hb7skxwljmEUY1RdaNrfPxlXsPpPUlnlt88VSjyaEzWa0xrSLuav5kJX676FysgdgQEhDX6f1MCjgCLiDvkKFAoiOkU8uuVYAxADDQYZYihiH1uI+64g3bPfbRHnqIRME+rBHWaoMuBW18htMASA/T/CkEnaVDe5zwE3j6uqTnKZQio3y8IaI6aREpcQEgRRlqEnjkL3tzm5d7cara4HuyjrhHSqGEWN4mFO2a//0cee+KFV15746133hND/dGehLhkqDj66Z05ATuTIq7uGvHNG6I89RKBekYQTzHk7WpCqVFlWLF3seVSirKMYCml2yCVIo8hL3/IbyKDdL9d8jU3OO/zCATCJNN4Y4hIroPadfKyFHkcn8chl22nEyzJlyHtbn573YB8jemKXIfrwT/w5311N6+oh1qOWqTJw5Yf62+i4P00JBej56tBrsvgNNbgOkdDEgWISZYZD2tYfDrE2S07O/IrxXEJMKgpaswhzg5M4ioBmwF4Zgh8/n7uVmBNT+aUknSVokCsIvX0GhlVaDFANQnCN4yErffmQGjQjlvyjpZPP7vZW7MwevZhBxEfFcWzaDmJznHphhP9SvpFdBGLuK7VP6BLRrHo+olec0TCiiN3NBez5MCtuYgFe67NGeYUXJrTzNhxbkyRs+W0bEPI2HxrQPsczbLmcV3VbMLrpfNoMfoQnvZVfXUVuF95lRE32WV2lh1nBxvvBsEwmlFMxAgTMymTrAvzkeKkrfMlBXEcEFEaRYHfzKsOka3IUCvK3o7hK5xeIYMZ3z+DeMdymoLllx6MUmIQit5AlAwEkSG9mZ4oDuQIRgfaMqNQLIlNTcQUEiP6Mna4kabQg+hGCT0xKL7kaIQCoXTlMIcIlgWXkAIEMcO7S8pnQYT1e9OegKcS/VO2Psy39yiCGpHzM+lIBxHUsgoAV/HkOYPaV4CpGWa9z7ivL4v8dByFvQ2a7cBo7iuLvAB5LA7soEEBKjfRyJvKlBFwjsVwAkv8BBviP0lMNnWwTtf9etgIzdAy2mdHwbqwHqw325kNYePYjV573rbe9v8HS1icEEujir6oHPSAllbasU6sW5fBTyAtcA90bxg6D56D1T/Lv/cm92FyCL7fAN83eusrmbV7szkvP4qAOIZ1d/e8ehiWZTDgf1wz12LzHXDOBUustc40R8y20QLLzLLUKSectNB5DHMWrNhw4MiJMw+eWF68+epJyQ9HRS1QkGAhwqw23Ro3LfdGuHgJkqTIkCmLXqFiJUqVMajXqIlRC56gXR99DbDSdaucsdc8+xyy32E3XPLaZUNsdtYmV7x1zWkTTfLCbRfN8NIEQ20x1RQdFpESEZOTkDFjyZ4tOwruXLhyY81HV5101l0Xx3QTQEPLX6hemkWLEClWlBhxEqVLpZOmQI5ceZKVq1ahUq0qx9VoY9Jbq34a9NdDnTue2GC9HXbajiBtK4AxkB/IA3CxCVzuAumBzAEAhf4uDjR4Eyz3/RfsXHsazg0pECpNQBN5iKHRGFSLbZvQdRBOfTKTQZDwmqrV5aCM1vInuHYzLG/TDRbFiixCPaJInoNKHTb1UVBQoSI+KtTqJ6qK7ynJbEmiGaWxDzdbVOoJUZMAeR9naiglY23J40KSBHBseHrpZ3p2J3g2ik2juMDsippWa5yHWVzdFgOsHVqiJQCPuHKes6GBZJKSAJ4uBYTtSEt/B2of6GYQkB0tPhvicLvJDbAFIpGJsIu/LOrXkl8LsNOntUgoMVVVTyb821E3p2YQAE+kutO3QAvAAkGxNb7uAYQS4Byy3B40hyCsqThjVgHu94f4BA95FX0YIHAV38fiLAg4wS5vrIAIbFt9C9frxSKiYKMA/1WM5e5N9WnnGOsr0pjAGAMD0mmBsiqthRY7bEOzm06QUgCtiG3GqrCyvNEY6otS1iPSakFnU4AU7wd44JQ8HYuTdY6S3hF+pfBYIAUn2blTAk0dbuDwWQGHkdNCHN/7xqB6L+Dy+xP3FjIroRhFJ3fXk9NQcVpMDMGdSUlCXlYsmntX1N3nRemYyVllABAPNEqpdOhUBIq6CjTds/gvSSzS6dC210iiY85K+URgDh6l87dAQAlFtLOubqGNdkFnAiV10461usC9Jd0peTYqd/faKDRoEzY7S3qAPH2wcm6kKPQDbfW8Ba1uq21aHhWvouGCbwQaoS1oju45+sDaA2Ttqr1zA5prpQLhtoIvclA7bAfSokDDJHNQmsfHTcGQgfzR7mCSzc8wr19NPzqGCj4V2McOvvo6uJg+Lu8zwNBeQbLt1WD422leDR6hdtHOiRXidxK4zHGOrBpzE6HF1WPe8gtXpeZdzxiJp2AVVpExXGNl0vGta8UaY7TDTYfOCUWTZnLfT1I5+H3qig7ZFzbYPq2hciP7FWwfoBNr4RnLLMzXLwdmyeO631+A/j0C9DmGHDidfVnAqcDog8XfodiA2M6nneRgGwdipDMCgIx/JVeKGLrt4zczCLXs+STn/W5Xqci8AbGmcPqNR6XuqtK2j2+jlgFLNM9qv1UttZ0gGVd7JxDVDXNHG9/z5OZOkpFRJpm8juSBHhKe8LxMmUbRVJRSc9iqBAwQVShzzvJ5Um1WFcm185IVzOBSQN3SBL52dbmPW8eQO4T5pYQT2AbJGd8WxUfMPBGXkzkhmc6VA3k0QaFbPRHer7TD8nm+ShMUD1802fRs3FXWeq2BSROKpsQzF6+ijLhAva7gILdJ35ZmjobNFgBCdPzvbGBMJstCQoGzzVGps19NfNDLFUU259DlrttklFHB4Zw/bkqT7CbXPM3OZ8ZcY/MxsWPktdTsHKIja6eQanejNUE1dqG9vEPlWXYUBo/xWQMUWjqk81VVqMg45otXdqeqMAPNqDzYY5PpuU+LjvZI1jRO+2fQ+wBKl4jfrrUvSNI2KOBoAOklDZaa95Gm6vnGtNvrA7ybrLNQxfVUI0q6/3YWcTdhN1GrBmiKww6r0AAMr4Z1gCUf289UjPrJbotYW4cWnttgpFqaMp8J7ddLdHWv0KJ23+dNELhJAHU4KM2NSm6syWRbzPhwpVd+fgeBKwu1I1t5yppePuQjcg6XemaRY6sgN28tTUzue35I9KQNjuYhw4qJgj5GnwPfWJ8av0HIGnGkoVirkKk+bzEnn2BTe+M+I4CcPTt9xAHSNTx6VZpWJIpQrgs5XIcBsccGeFcJhLM1nD2cnNdjKq3it+TKOjQyJ4Kz1Uo0S4Bbahvri3Mna9MTAly9z57sWVaiHXLcHHN4V5emKbGCFJGG1rwcL2WZ+XAXrLKtxy0A3qiutc6xSHftdsmWv93LrBmJXFVALtXHQhXqR/7r+k82RvHZyLkvJVSNipB4/7XNmJi0CmV5YX6FvQ5KrQkW3MwJPPLcyRsolllI0kRZAgy+U4lN180Z4TKTbW1RSzc+2yVO8e2XXeZf8jlW2fX2zm7814wFdVa6alhVuGAG01ADBHBDpE5atmt6lRfF6aXRBxDxZ74Q3ihq/X/PuLQD1fKXwpGzDVq6ftI6SclebYgrvolKIvUg2ufRq0yjcdNFySHLq7rEkfIq572PaJMCKijG0bgt+cF+9A6+VOdu6VJSOWu1V1CLJ/LMTz6tbCKDPWo5w8dmGbJCyBbo2Bp0z7ZY2esIWFowjN1im/eQImMbn9/2tn1rVo2bH7K3QeAjswjbPWidvxmRupAqeETpUn+TvQ7GhqNCVuexIM5FgpNlA5SIdVPWPS5P7kV5v8L7VIo3+b0RjatV4HKb1BrX0staf8FOWEYZQtQuNRrV225uMwaqrJfmzphrUjIvTdNy+DrcJmUI4Jlms7iYDXn+imi+rpsVqVhbucvQLMAp0eAKFocBfzcv32YsmHsI9LT1BmCJ7VnqqzOruN3iVIfsg/IYCzuXTQ6O5m5DZId+AnD+TLAjIpwHLss4WVSpYfttsJ06M1FNW2k4JF5SoJ5Si0YAkkjxSp8lBo/a8eSxIbanGP5tQrmC2lVPGVYNy235o1PW/X/wmDJE/VnbhXeiaK0IsdeebCakUX/nqfHERPurhaZGwTZU8OlDitO5THZqYmWlZP8TOthEU+xQAtOQnVKcm5LeuRZfwRKxOfcEzi0UwU5K02nLHF+k32kQCzvnEs8ZziV8NmZHUwdtYlb4+0Ci2Tcn/orU/tmo6Ic7BMock69ro3WZDYIKGVCqyp2w6Y44DhCdFr8E6iFOEF9ic7Ni0b7bOMgRj1sTsPkXts/QKcSltG2JVKh3nNK0i/eknQveLZDsApsDu48CwL1+m+QgUjnyNgkipUkpz9jnOVUDl/zYC5nCAmEtG1FDT36DYUMh7579VgHAUuoNfW6Fj6285yS70Fji/Kiud67ddmcF+lMf8O9Jm62FvAiMPH1whqSwJ1WSFXoIpApji3qDveIV9sdbLanfqjSrl7CZvCOQIUOTeoOLFux8AffshXbHpKWZ72bo1E6L2LsCp5LFOVvEowgPRGGgVwMO8YFpMbC0sWroLNAzHxLuW6fLhC06tNCgC1caBB50jouiBC8kljYNOJI8ftEYIiL9jqFGArBPDJ8v5gxHUC+laL7QRy0ruIPSXLCs5PYLLCu6gxKgGmPabDQKAC30ia79c/HOt3Harv+k7Wm48eONTYfQBzsMbZeZiqw+BwURCYESX9/T8djxGO6Cehvoml1p57OvQK8H0ahZexGiGjzxQOXIJ6dVvfb94sJbct0JLu3OInGBVe5yU9JTB/hLxg8NwaHLlJtsyK59RX/mA7qnue8QfME0l66BhUNGXf9eAj2JLzSfILEfpoL0KOJcwdmt3QhbRtbDubfA8rRHYHk6IB/gSQTWrI4YrM8LTqgncyLIyJAhFzJTo13oygtZhLjtsj3qqra06NGBOeWIEymPfbmQ1N6wrCZXRMcdG3+Ahq7tSCD/jl0+bOmIT3bT3Dp3Laq/SFK6nMbYLoRBhNJLW3MPzFPTj2Oc6f4Gv3Lyv+SDEG7fVy7UBi09uswfXjhBxoyVS/g9PlA9PUZTfvQNDFp4qpzsxpcncqaP9GHx8zBmjGW+vTOLxHtfrRsTQLseSNChu59jmfdsA83yAYeo1jnzoCNhVXfb5m5SbyfoMH5B5cHHx4xnNnTCk4o4nzsoOc1dEzr9y8uN4PzaKUlFTk6ay5z6XsDp/Co272eN1psOcpB5MAeepeqNjTCLq7ZK0+pCqLomRW/sTCrq2VKpwwBRomfTm2LyoN/ZGBDjtumsvA+v3L2h5CGYYUZPXDhk8tKfljI4Oe75GkTfTfsJV+aLDDAvLV8fGzhZUqLRS9Pjqnu0ZTwYVHTYUejxW742VWmMYUrK5wGGb/5JBiLiM0aAl/gpxqOhgotD5slhLqq6o42tRFrrqn4w5x3+i0qxxznS+ZTmFFK1D/Sggnskfzqk/8mUqX+cw+zfMvSS+AC38Jmx9sWTk1B3NrhATyqVhcUi2i1kcY6e1jzS3SD+WSRKFez4ZRJBA7HCSFRRvw44krUM14wEZfjzS13o8IemtMhW64aYmnIKyDnxFgZ5tlpRFlyvLBpiXUuqyutyELOa49Mwd9DlSmm8EEzfwosRQ8Syi0OWdFjzBwHe9CPcl5OOe8Qm3F86WXu6HK2VO/7gkwU24gLF7eYObQELexoGSsIFp22k/4DtJqrl0hxmeIUr7264zmPQbp/SAfPUuJp7qrsQ13ef0mp/0GtEHS5qZ3jogsV2jnBQI8M/bQT3dEy9apCnoqqisW7lmtqL2pE2wisbmfnN1v0xJLFM44eySd9i4PcH3RCEyRVI34c7eJnOWAKaUOh5aSUNU3ZjuxNrF5GqIzaY55uLq3mL5PlzSYBqpW44M4NXmHYI3kbe/EwLl7sINq2Md+Qn3Xm9ZAq81ezIpLdwvwgRbMlykGMI6GXm04smeGd9pTp2OnRiDBOS6eGw+YxxA64t4WbdzRlfXX5AZq9GCDfy0zMeVITCmgubGUNo1wYy1nVuJzilAipeIwJHfhsnCWcO17sDdYcTo3mY5+N1zs0zIwh3fANe1BewSbL1e2862Dnpr3o5uqIbhMrmf47MgPNZb140scDLlFHU1wt2G0+81sKfa78CPfekpxjMOEIY/B7KhwOb2ZBnPcPRKxC/oIOOP3boL6zqVPv+6KHgnST90ZUcYDXAIdFmd///M5/go/E/Zh7uyP7bAiVFB4nAQddy2nMGZem75KQSB9NMHzQDYwd9r9Tx+D5YJHVQl5d6K6sz3gCWSFPrxm/B8rzGXmGKGq/vNR21oB0LeXoh7t6MzoWBC+ubh/Ah6Y8xoOueemzppiHkgJdEu+hWXRNTXKL+p7RG+paF1lLfrGPsDGiToGwMucpFt7AwtiH7P0VEdNGsmdwOa2mabdIO7e6DNYEcETDacQ0TVnat9PU94b1imwCIRY5NwgiR5hewBTplkEXolelLUcUL7RJ6d2M/e0f/FYJlaOCvcBcycnoLfomUaV0b0Vnhb1lbnz0fVHBlmXlJT8NQW3E80EDb+Lj4y39kNrxRUbtQ2IXg/QHV4Tl2ysCfANQh9aNUkDJ7D3U6toYmCCwNRJzgh+CE6zWvME7R81DHqkdox2RdxLcyTOixCImJAZVmOgodnyM2lSqbbZoYsnsbIuwiiXDtqhEsZxGJYcv5FhcDb70au7ER2SIG6pA6IPndFo2phxmQCIF+75NS5KTHu/sLzARWG8dXOKLEsqK24Fl+yc352h4Vp+3wGiI1a2qqDlTj1cw3iIWvHcomCqfQM/HeuDXG+KsfN04H67dbldS6RP3A0gtiaP3/X3D7ydWrW57sXoPFExoe+bTQOUx816JocH1u37UxWtz1gjDsCch90t2o5kAlbqK4FRVl4HuNN3amVkGKS8lxs9RUjXVta1RLR9W+v6QZQqzjdc3IYLVKhEPekWasMb701Qu2vARdIX8fO8cUKrrvgf/kTHGCtQUAS0LiCaKd0kngCy4qgT4vlZuLvGmh/BU4FIOiEgf02Am7WzgJ0PFRALa1PtoSR1T3rTEJdiRksRW7Lg5mfNx4vzn13sG5hVI9SLUW/Ej1X1EMqlwzI8ZgVehjRX44H0ePQ0FKA9dC3TE944ODruyV4XrJUsMuLZa34ujQllgi5roZde3V2VUns7QgJZakxPZmLfajUMIoy4ZLYv2903ad/YXdokFseMH+7rTNdGGP+0sBfH5xQQcP9cDztTWGL60n/3mNQK7KlLlLIONfOICNC8FvIHBaERBLTWLHUxSB48WH1HSwtnSie3UdLx11LGqEX0DDjMaj3I5VlTR0fAO+3i+87J6D5zi9BiwvQ39dqwRHKYoXZU/08nNEpFLTZxu3KgAwLixcmURbxVe/yGgppL5vlD0hTdJkdalBjqsGvN8VfzEzkD8h+F93i/WMFkASof8LJoOSrWVqVesFkfE0AYz36Q0by7badB50hhrzS+1aBOd2ko1Nf1uRF9xy4LcbNmd0wKcvBV6/q/D6BpBheQB5BM2eBCsS0m5ZI9+yAt7dGft028jG+LEGkMFs7UZT1iNhz7F259+STC9JWgle1yC+eQi7MW12gxF1qf/6EGpjgCQuqeoDKtSqgqQLkfopQLvhXt1kQmDBsEWOlUCDe+cUb9FuKI1xXUK7II3eiztBWCJDsCShxBea9S3OZLlEL7GHATMepMPSkUmXD6MfgUV68wzgtnl0O8PtDeXLExG6VEO4aIhFlw+jH7kTbMiUErZSZVdwuOi77jIog4iI+I58ZtkI90mTmjHNnRh9z3pMtqneQ6sra2tbVkpUsyLiLQpgBLD9CziA9DRLm5jSuGY+xdHB6bw8yLZkfSiZGqauEtYaRjqANSkqjosIRzb4SrhEYWGexg0rTm+GSAGvKYTYOmANW6De/eS5tKt8kV4cAQVv/6O7cquwfylNvwU+v/s3AF9ba4//GbfO2pE1mEEBAodFMyCPGestkjYTfyOeBgo927c7dOSkATKPUwYiyd/hdnAQmW1vk45I8mdbJygXZyiReZAxdkJBoDKpiTJmC0Ok4KDYYx/ODkyXgpPTIRY6yuljpRa2SUYE46SguQX+fUQk+dAxpuP0rcf4GF4fmUWRjrF5HKmPnI7Q/8BwELp5jH4pTwc1k+cQ1PdL+ULT5X1bAp08vggYu0fsNOnnVrT0QrNq0chQBvhwfltNyB2tpljaXk3jjKhmuKgHUXQ6iKO1v1dLWvBOIDAJ4cdPmyqtGpgI2ii1aWCkxGtVx0+GBDp5cmioafSiV6NOO6MKrfLUaNWmAa8FS02Jw+HkXWGd+Y81VK5U+dKF1tcTp2TRWDyT/taDdX1C7fYcFZWe2IPr1WBNBDKxKK9RjSrpqtHaCerxPViV1ZVJDaFHo5TqFVc1isJr0LT8AZWq8Jp1QwH0UdQgZq97DClQaL7OOaPSJlU269BJZ9W6eKerGmedd0E33fXQ00WXXHZFr4Myel611K66ps4N02yxlcYnWv4CBApy0y31bgsWIlSYD8LFabj5x9KoRbOl4iXgJXoviUmrNr0lS5FK5w5BH31Do11aGKTLkClLP3r9DTTIAMsMtk22z3LkyjNevgJDDDPcUIWKFCvx0X6lEeGoYxZZzI6CPQeOnDhz4cotYiIhUhz0E7/wGxYinTCWOysbMFYQs+FtORE5D7ZiIkMZgwhRzJjbYTvryLHOeocdccpOu+y2x8mYYZRDJDHHaLNZ+uIr9mJ58TRDhZWkfMiMM8ZEE0wyUrm3omNBLIkVsY5NbGMXRezjEMc4xTkuJnvsrili3ffIvWF6rk4na1Aa+Spjjj5V0t7SwKk1gXRtee12DBcTHKPVgzUOByEnq/Y+D5+WGRudM4aLjsNAjjlBBu9jsVqt8ufI1nBBuwbKzgePu+bS5MySVVS1C2sfL9V0iGiZ0GCs9qtrLep5vqmiki+aZF7NC3s+57gfrA7sxMCYWA==", zn = "github.com/junky84", Qi = "https://github.com/junky84", Vr = "CP-VT323", Br = [
  "................##......",
  "................##......",
  "................##......",
  "................##......",
  "................##......",
  "................##......",
  ".................#......",
  ".................#......",
  ".................#......",
  ".................#......",
  "............#....#......",
  "............#...........",
  "...........##...........",
  "...........#............",
  "..........##............",
  ".........###............",
  "........###.............",
  ".......###..........#...",
  "......####..........#...",
  ".....####............#..",
  "....####.............#..",
  "...####...............#.",
  "..####................#.",
  ".###...................#",
  "##......................",
  ".......................#"
], Nr = Br.flatMap((r, t) => {
  const e = [];
  let s = 0;
  for (; s < r.length; ) {
    if (r[s] !== "#") {
      s++;
      continue;
    }
    const i = s;
    for (; r[s] === "#"; ) s++;
    e.push(S`<rect x=${i} y=${t} width=${s - i} height="1" />`);
  }
  return e;
}), tn = (r) => f`<svg class=${r} viewBox="0 0 24 26" shape-rendering="crispEdges" aria-hidden="true"><g fill="currentColor">${Nr}</g></svg>`;
let $e = null;
function Rr() {
  if (!$e)
    try {
      $e = new FontFace(Vr, `url(${Hr}) format("woff2")`).load().then((t) => document.fonts.add(t)).catch(() => {
      });
    } catch {
      $e = Promise.resolve();
    }
  return $e;
}
const en = (r) => r.replace(/[&<>"]/g, (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[t]);
function sn(r, t, e) {
  if (!t) return;
  const s = r.get(t, e);
  return s?.available && s.num !== null && s.num !== void 0 ? s.num : void 0;
}
function Ir(r, t) {
  if (r.settings.demo) return ["y", "simulated"];
  let e = 0, s = 0;
  for (const i of r.components)
    if (!(i.type !== "outdoor_unit" && i.type !== "indoor_unit"))
      for (const [n, o] of Object.entries(i.bindings || {}))
        o && (e++, t.get(i, n)?.available && s++);
  return e ? s ? ["g", "online"] : ["r", "offline"] : ["y", "not configured"];
}
function jr(r, t, e, s = /* @__PURE__ */ new Date()) {
  const i = r.components, n = (E) => i.filter((D) => D.type === E), o = n("outdoor_unit")[0], a = n("indoor_unit")[0], l = o ? Dt(o.model).refrigerant : void 0, d = (E) => Number(E.props?.volume) > 0 ? ` (${Math.round(Number(E.props.volume))} l)` : "", p = (E) => E.length > 42 ? E.slice(0, 41) + "…" : E, h = [];
  o && h.push(["Outdoor Unit", o.label + (l ? ` (${l})` : "")]), a && h.push(["Indoor Unit", a.label]), n("buffer").forEach((E) => h.push(["Buffer", E.label + d(E)])), n("dhw_tank").forEach((E) => h.push(["DHW Cylinder", E.label + d(E)])), i.filter((E) => E.type === "radiators" || E.type === "floor_heating").slice(0, 4).forEach((E) => h.push(["Heating Circuit", E.label])), h.push(["Source Code", zn]);
  const m = Math.max(...h.map(([E]) => E.length)), u = e ? /^\d/.test(e) ? ` v${e}` : ` ${e}` : "", [_, w] = Ir(r, t), b = [
    ["w", "junky84 Modular BIOS v4.51PG, A Heat Pump Ally"],
    ["", `Copyright (C) 1984-${s.getFullYear()}, junky84`],
    ["", ""],
    ["y", `COPILOT${u.toUpperCase().replace(" V", " v")} OPEN-SOURCE RELEASE`],
    ["", ""],
    ["", "Main Processor : COP-Core 1984 @ 84MHz"],
    ["mem", ""],
    ["", ""],
    ["gw", `<span class="${_}">${w}</span>`],
    ["", "Initialize Plant Components..."],
    ["", ""],
    ...h.map(([E, D]) => ["", `Detecting ${E.padEnd(m)} ... ${p(D)}`])
  ];
  let v = sn(t, o, "el_power");
  v !== void 0 && o && t.get(o, "el_power")?.unit === "kW" && (v *= 1e3);
  const x = sn(t, o, "heat_power"), k = x !== void 0 && v !== void 0 && v > 50 && x > 0.2 ? (x / (v / 1e3)).toFixed(1) : "--", T = `${`${String(s.getMonth() + 1).padStart(2, "0")}/${String(s.getDate()).padStart(2, "0")}/${s.getFullYear()}`}-${l || "HP"}-J84-COP${k}-00`;
  return { lines: b, code: T };
}
const An = (r, t) => `Memory Test    :  ${r}K${t ? " OK" : ""}`;
function nn([r, t]) {
  return r === "mem" ? An(65536, !0) : r === "gw" ? `EMS-ESP Plug and Play Gateway ..... ${t}` : r ? `<span class="${r}">${en(t)}</span>` : en(t);
}
const Ze = class Ze extends st {
  constructor() {
    super(...arguments), this.plant = null, this.src = null, this.version = "", this._token = 0, this._running = !1, this._finish = null;
  }
  get _dlg() {
    return this.renderRoot.querySelector("dialog");
  }
  async open() {
    const t = this._dlg;
    if (!t || !this.plant || !this.src) return;
    t.open || t.showModal(), t.focus();
    const e = ++this._token;
    if (await Rr(), e !== this._token) return;
    const { lines: s, code: i } = jr(this.plant, this.src, this.version), n = this.renderRoot.querySelector("pre"), o = this.renderRoot.querySelector(".foot"), a = () => {
      o.innerHTML = `Press <a href="${Qi}" target="_blank" rel="noopener">DEL</a> to visit ${zn}, ESC to exit<br>${i}`;
    };
    if (o.innerHTML = "", this._finish = () => {
      this._token++, this._running = !1, n.innerHTML = s.map(nn).join(`
`), a();
    }, matchMedia("(prefers-reduced-motion: reduce)").matches) return this._finish();
    this._running = !0;
    const l = [];
    let d = 0;
    const p = (u, _) => window.setTimeout(() => e === this._token && _(), u), h = () => n.innerHTML = l.join(`
`), m = () => {
      if (d >= s.length) {
        this._running = !1, a();
        return;
      }
      const u = s[d++];
      if (u[0] === "mem") {
        const _ = l.push("") - 1;
        let w = 0;
        const b = () => {
          w = Math.min(65536, w + 2048), l[_] = An(w, w >= 65536), h(), p(w < 65536 ? 28 : 260, w < 65536 ? b : m);
        };
        return b();
      }
      l.push(nn(u)), h(), p(u[0] === "gw" || u[1].startsWith("Detecting") ? 480 : u[1] === "" ? 90 : 160, m);
    };
    m();
  }
  _onClick(t) {
    t.target.closest("a") || (this._running && this._finish ? this._finish() : this._dlg?.close());
  }
  _onKey(t) {
    t.stopPropagation(), t.key === "Delete" || t.key === "Backspace" ? (t.preventDefault(), window.open(Qi, "_blank", "noopener")) : (t.key === "Enter" || t.key === " ") && this._running && this._finish && (t.preventDefault(), this._finish());
  }
  render() {
    return f`<dialog tabindex="-1" aria-label="About COPilot" @click=${this._onClick} @keydown=${this._onKey}
      @close=${() => {
      this._dlg?.open || (this._token++, this._running = !1);
    }}>
      <div class="bios">
        <div class="head">${tn("mark")}<pre></pre><div class="ally">${tn("big")}<b>junky84</b></div></div>
        <div class="foot"></div>
      </div>
    </dialog>`;
  }
};
Ze.properties = { plant: { attribute: !1 }, src: { attribute: !1 }, version: {} }, Ze.styles = rt`
    dialog {
      padding: 0;
      border: 0;
      background: #000;
      color: #a8a8a8;
      width: min(880px, 94vw);
      max-width: none;
      max-height: 94vh;
      outline: none;
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
    }
    dialog::backdrop {
      background: rgba(0, 0, 0, 0.85);
    }
    .bios {
      font: 22px/1.2 "CP-VT323", ui-monospace, Menlo, Consolas, monospace;
      padding: 22px 26px 18px;
      min-height: min(560px, 90vh);
      display: flex;
      flex-direction: column;
      cursor: default;
      user-select: none;
    }
    .head {
      display: flex;
      gap: 16px;
      align-items: flex-start;
      flex: 1;
    }
    .mark {
      flex: none;
      width: 48px;
      height: 52px;
      color: #5a8cff;
    }
    pre {
      margin: 0;
      font: inherit;
      white-space: pre-wrap;
      flex: 1;
      min-width: 0;
    }
    .w {
      color: #fff;
    }
    .y {
      color: #f5d76e;
    }
    .g {
      color: #3ddc97;
    }
    .r {
      color: #ff5a5f;
    }
    .ally {
      flex: none;
      width: 108px;
      border: 2px solid #2f6fd5;
      padding: 10px 6px 6px;
      text-align: center;
      line-height: 1;
    }
    .big {
      width: 72px;
      height: 78px;
      display: block;
      margin: 0 auto;
      color: #7ab8ff;
    }
    .ally b {
      display: block;
      font-weight: normal;
      font-size: 26px;
      margin-top: 6px;
      color: #79d36a;
    }
    .foot {
      margin-top: 18px;
      min-height: 2.4em;
    }
    .foot a {
      color: #fff;
    }
    @media (max-width: 700px) {
      .bios {
        font-size: 15px;
        padding: 14px;
      }
      .mark,
      .ally {
        display: none;
      }
    }
  `;
let Rs = Ze;
customElements.get("cp-credits") || customElements.define("cp-credits", Rs);
const qe = class qe extends st {
  constructor() {
    super(...arguments), this.isPanel = !1, this._config = { type: "custom:copilot-card" }, this._ctl = new vn(this, !1), this._narrow = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObs = new ResizeObserver((t) => {
      const e = t[0]?.contentRect.width ?? 0;
      e > 0 && (this._narrow = e < 700);
    }), this._resizeObs.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObs?.disconnect();
  }
  setConfig(t) {
    if (!t) throw new Error("Invalid configuration");
    this._config = { show_kpis: !0, show_messages: !1, show_demo_controls: !1, ...t };
  }
  getCardSize() {
    return 10;
  }
  getGridOptions() {
    return { columns: 12, rows: 10, min_columns: 6, min_rows: 5 };
  }
  static getStubConfig() {
    return { show_kpis: !0, show_messages: !1, show_demo_controls: !1 };
  }
  static getConfigElement() {
    return document.createElement("copilot-card-editor");
  }
  willUpdate(t) {
    t.has("hass") && this.hass && this._ctl.setHass(this.hass);
    const e = this.clientWidth;
    e > 0 && (this._narrow = e < 700);
  }
  render() {
    const t = this._config, e = this._ctl.plant, s = t.height || (this.isPanel ? "calc(100vh - var(--header-height, 56px) - 16px)" : "560px");
    return f`<ha-card style="height:${s}">
      ${this._ctl.error ? f`<div class="err">${this._ctl.error}</div>` : y}
      ${e ? f`<cp-overview
            .plant=${e}
            .src=${this._ctl.src}
            .icons=${this._ctl.icons}
            .messages=${this._ctl.messages}
            .sim=${this._ctl.sim}
            .hass=${this.hass}
            .api=${this._ctl.api}
            ?admin=${this._ctl.admin}
            .version=${this._ctl.version}
            .showKpis=${t.show_kpis !== !1}
            .showSide=${!!t.show_messages}
            .showDemo=${!!t.show_demo_controls}
            ?narrow=${this._narrow}
            @scenario=${(i) => this._ctl.scenario(i.detail)}
          ></cp-overview>` : f`<div class="loading">${xs}</div>`}
    </ha-card>`;
  }
};
qe.properties = {
  hass: { attribute: !1 },
  isPanel: { type: Boolean },
  _config: { state: !0 },
  _narrow: { state: !0 }
}, qe.styles = [
  bn,
  _t,
  rt`
      :host { display: block; }
      ha-card {
        display: flex;
        flex-direction: column;
        padding: 12px;
        box-sizing: border-box;
        overflow: hidden;
        background: var(--cp-bg);
        color: var(--cp-text);
        font-family: var(--cp-font);
      }
      cp-overview { flex: 1; min-height: 0; }
      .loading { flex: 1; display: grid; place-items: center; }
      .loading svg { width: 48px; height: 48px; opacity: 0.7; }
      .err { color: var(--cp-error); font-size: 13px; }
    `
];
let Is = qe;
const Ye = class Ye extends st {
  constructor() {
    super(...arguments), this._config = { type: "custom:copilot-card" };
  }
  setConfig(t) {
    this._config = t;
  }
  _set(t, e) {
    const s = { ...this._config, [t]: e };
    (e === "" || e === void 0) && delete s[t], this._config = s, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: s }, bubbles: !0, composed: !0 }));
  }
  render() {
    const t = this._config, e = (s, i, n) => f`<label class="row">
      <input type="checkbox" .checked=${t[s] ?? n} @change=${(o) => this._set(s, o.target.checked)} />
      ${i}</label>`;
    return f`<div class="ed">
      ${e("show_kpis", c("card.show_kpis"), !0)}
      ${e("show_messages", c("card.show_messages"), !1)}
      ${e("show_demo_controls", c("card.show_demo"), !1)}
      <label class="field">${c("card.height")}
        <input .value=${t.height || ""} placeholder="560px" @change=${(s) => this._set("height", s.target.value.trim())} /></label>
      <p class="hint">${c("card.hint")}</p>
    </div>`;
  }
};
Ye.properties = { hass: { attribute: !1 }, _config: { state: !0 } }, Ye.styles = [
  _t,
  rt`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      input:not([type]) { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `
];
let js = Ye;
customElements.get("copilot-card") || customElements.define("copilot-card", Is);
customElements.get("copilot-card-editor") || customElements.define("copilot-card-editor", js);
const Le = window;
Le.customCards = Le.customCards || [];
Le.customCards.some((r) => r.type === "copilot-card") || Le.customCards.push({
  type: "copilot-card",
  name: "COPilot",
  description: "Animated heat pump schematic with live values",
  preview: !1,
  documentationURL: "https://github.com/junky84/copilot"
});
const on = "copilot.view";
function Kr(r) {
  try {
    return localStorage.getItem(r);
  } catch {
    return null;
  }
}
function Fr(r, t) {
  try {
    localStorage.setItem(r, t);
  } catch {
  }
}
const Xe = class Xe extends st {
  constructor() {
    super(), this.narrow = !1, this._ctl = new vn(this), this._view = "overview", this._sub = "editor", this._toast = "";
    const t = Kr(on);
    if (t) {
      const [e, s] = t.split(":");
      ["overview", "efficiency", "check", "curve", "maintenance", "messages", "config"].includes(e) && (this._view = e), s && (this._sub = s);
    }
  }
  willUpdate(t) {
    t.has("hass") && this.hass && this._ctl.setHass(this.hass);
  }
  /** @param rev revision the change is based on (default: the plant currently shown) */
  async _save(t, e) {
    try {
      return await this._ctl.save(t, e), this._showToast(c("saved")), !0;
    } catch (s) {
      return this._showToast(vs(s) ? c("sync.conflict") : s?.message || String(s)), !1;
    }
  }
  _showToast(t) {
    this._toast = t, window.setTimeout(() => this._toast = "", 2600);
  }
  _go(t, e) {
    this._view = t, e && (this._sub = e), Fr(on, `${this._view}:${this._sub}`);
  }
  _openCredits() {
    this.renderRoot.querySelector("cp-credits")?.open();
  }
  _fullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : this.requestFullscreen?.().catch(() => {
    });
  }
  render() {
    const t = this._ctl.plant, e = this._ctl.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return f`<div class="shell">
      <header>
        ${this.narrow ? f`<button class="ghost icon" title=${c("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }))}>${B("menu")}</button>` : y}
        <div class="brand" @click=${(s) => s.detail === 3 && this._openCredits()}>${xs}<span>COP<b>ilot</b></span></div>
        <nav>
          ${["overview", "efficiency", "check", "curve", "maintenance", "messages", "config"].map(
      (s) => f`<button class="tab ${this._view === s ? "on" : ""}" title=${c(`nav.${s}`)} @click=${() => this._go(s)}>
              ${B(s === "overview" ? "grid" : s === "efficiency" ? "chart" : s === "check" ? "check" : s === "curve" ? "curve" : s === "maintenance" ? "wrench" : s === "messages" ? "bell" : "gear")}
              <span class="tl">${c(`nav.${s}`)}</span>
              ${s === "messages" && e ? f`<span class="badge">${e}</span>` : y}
            </button>`
    )}
        </nav>
        <span class="spacer"></span>
        ${t?.settings.demo ? f`<span class="demo-pill">${B("flask")}<span class="tl">${c("demo")}</span></span>` : y}
        <button class="ghost icon" title=${c("fullscreen")} @click=${this._fullscreen}>${B("expand")}</button>
      </header>
      <main>
        ${this._ctl.error ? f`<div class="card err">${this._ctl.error}</div>` : y}
        ${this._ctl.api?.standalone ? f`<div class="note muted">${c("standalone_hint")}</div>` : y}
        ${t ? this._content(t) : f`<div class="loading">${xs}</div>`}
      </main>
      ${this._toast ? f`<div class="toast">${this._toast}</div>` : y}
      <cp-credits .plant=${t} .src=${this._ctl.src} .version=${this._ctl.backendVersion}></cp-credits>
    </div>`;
  }
  _content(t) {
    const e = this._ctl.src;
    if (this._view === "overview")
      return f`<cp-overview
        .plant=${t}
        .src=${e}
        .icons=${this._ctl.icons}
        .messages=${this._ctl.messages}
        .sim=${this._ctl.sim}
        .hass=${this.hass}
        .api=${this._ctl.api}
        ?admin=${this._ctl.admin}
        .version=${this._ctl.version}
        ?narrow=${this.narrow || window.innerWidth < 900}
        @scenario=${(n) => this._ctl.scenario(n.detail)}
      ></cp-overview>`;
    if (this._view === "efficiency")
      return f`<cp-efficiency
        .plant=${t}
        .src=${e}
        .hass=${this.hass}
        .sim=${this._ctl.sim}
        .version=${this._ctl.version}
      ></cp-efficiency>`;
    if (this._view === "check")
      return f`<cp-check .plant=${t} .src=${e} .sim=${this._ctl.sim} .version=${this._ctl.version}></cp-check>`;
    if (this._view === "curve")
      return f`<cp-curve .plant=${t} .src=${e} .hass=${this.hass} .sim=${this._ctl.sim} .version=${this._ctl.version} ?admin=${this._ctl.admin}
        @save=${(n) => this._save(n.detail)}></cp-curve>`;
    if (this._view === "maintenance")
      return f`<cp-maintenance .plant=${t} ?admin=${this._ctl.admin} @save=${(n) => this._save(n.detail)}></cp-maintenance>`;
    if (this._view === "messages")
      return f`<div class="card pad"><cp-messages
        .messages=${this._ctl.messages}
        ?canClear=${this._ctl.admin && !this._ctl.sim}
        @clear=${() => this._ctl.clearMessages()}
      ></cp-messages></div>`;
    if (!this._ctl.admin) return f`<div class="card">${c("readonly_hint")}</div>`;
    const s = ["wizard", "editor", "mapping", "icons", "settings"], i = (n) => this._save(n.detail);
    return f`
      <div class="subnav">
        ${s.map((n) => f`<button class="sub ${this._sub === n ? "on" : ""}" @click=${() => this._go("config", n)}>${c(`cfg.${n}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard" ? f`<cp-wizard .plant=${t} @plant-generated=${async (n) => {
      await this._save(n.detail) && (this._showToast(c("wz.done")), this._go("config", "editor"));
    }}></cp-wizard>` : y}
        ${this._sub === "editor" ? f`<cp-editor .plant=${t} .rev=${this._ctl.rev} .hass=${this.hass} .src=${e} .icons=${this._ctl.icons} .version=${this._ctl.version}
              @save=${(n) => this._save(n.detail.plant, n.detail.rev)}></cp-editor>` : y}
        ${this._sub === "mapping" ? f`<cp-mapping .plant=${t} .hass=${this.hass} .api=${this._ctl.api} @save=${i}></cp-mapping>` : y}
        ${this._sub === "icons" ? f`<cp-icons .plant=${t} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${i} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>` : y}
        ${this._sub === "settings" ? f`<cp-settings .plant=${t} .hass=${this.hass} .api=${this._ctl.api} .version=${this._ctl.backendVersion} @save=${i}
              @show-credits=${() => this._openCredits()}
              @plant-restored=${(n) => {
      this._ctl.setPlant(n.detail.plant, n.detail.rev), this._showToast(c("bk.restored"));
    }}
              @reset-plant=${() => this._save({ ...ys(), settings: { ...ys().settings, demo: !0 } })}></cp-settings>` : y}
      </div>
    `;
  }
};
Xe.properties = {
  hass: { attribute: !1 },
  narrow: { type: Boolean },
  route: { attribute: !1 },
  panel: { attribute: !1 },
  _view: { state: !0 },
  _sub: { state: !0 },
  _toast: { state: !0 }
}, Xe.styles = [
  bn,
  _t,
  rt`
      :host {
        display: block;
        height: 100%;
        background: var(--cp-bg);
        color: var(--cp-text);
        font-family: var(--cp-font);
      }
      .shell {
        display: flex;
        flex-direction: column;
        height: 100%;
        min-height: 100vh;
        max-height: 100vh;
      }
      header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        border-bottom: 1px solid var(--cp-border);
        background: color-mix(in srgb, var(--cp-surface) 85%, transparent);
        backdrop-filter: blur(8px);
        position: sticky;
        top: 0;
        z-index: 5;
      }
      .brand { display: flex; align-items: center; gap: 8px; font-size: 17px; letter-spacing: 0.2px; margin-right: 8px; user-select: none; }
      .brand b { font-weight: 800; }
      .logo { width: 26px; height: 26px; }
      nav { display: flex; gap: 4px; }
      .tab { background: transparent; border-color: transparent; color: var(--cp-muted); position: relative; }
      .tab.on { background: var(--cp-surface-2); color: var(--cp-text); border-color: var(--cp-border); }
      .tab .badge { margin-left: 2px; }
      .demo-pill { display: inline-flex; gap: 6px; align-items: center; font-size: 12px; font-weight: 700; color: var(--cp-notice);
        padding: 5px 10px; border-radius: 999px; background: color-mix(in srgb, var(--cp-notice) 15%, transparent); }
      main { flex: 1; min-height: 0; overflow: auto; padding: 14px 16px 16px; display: flex; flex-direction: column; gap: 10px; }
      main > cp-overview { flex: 1; min-height: 0; }
      .pad { overflow: auto; }
      .note { font-size: 12px; }
      .err { color: var(--cp-error); }
      .loading { flex: 1; display: grid; place-items: center; }
      .loading svg { width: 64px; height: 64px; animation: spin 1.6s linear infinite; opacity: 0.8; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .subnav { display: flex; gap: 4px; flex-wrap: wrap; }
      .sub { background: transparent; border-color: transparent; color: var(--cp-muted); }
      .sub.on { background: var(--cp-surface-2); color: var(--cp-text); border-color: var(--cp-border); }
      .cfg { min-height: 0; overflow: auto; }
      .cfg.fill { flex: 1; overflow: visible; display: flex; flex-direction: column; }
      .cfg.fill > cp-editor { flex: 1; min-height: 640px; }
      @media (max-width: 900px) {
        main > cp-overview { flex: none; }
      }
      /* six tabs: show only the active tab's label when space gets tight */
      @media (max-width: 1250px) {
        .tab:not(.on) .tl { display: none; }
        .brand span { display: none; }
      }
      @media (max-width: 700px) {
        header { padding: 8px 10px; gap: 6px; }
        .brand span { display: none; }
        .tl { display: none; }
        main { padding: 10px; }
      }
    `
];
let Ks = Xe;
customElements.get("copilot-panel") || customElements.define("copilot-panel", Ks);
export {
  Ks as C,
  rt as a,
  f as b,
  st as i
};
