/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Tt = globalThis, oi = Tt.ShadowRoot && (Tt.ShadyCSS === void 0 || Tt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, ri = Symbol(), _i = /* @__PURE__ */ new WeakMap();
let Sn = class {
  constructor(e, t, s) {
    if (this._$cssResult$ = !0, s !== ri) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (oi && e === void 0) {
      const s = t !== void 0 && t.length === 1;
      s && (e = _i.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), s && _i.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Qn = (r) => new Sn(typeof r == "string" ? r : r + "", void 0, ri), oe = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new Sn(t, r, ri);
}, eo = (r, e) => {
  if (oi) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const s = document.createElement("style"), i = Tt.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = t.cssText, r.appendChild(s);
  }
}, bi = oi ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const s of e.cssRules) t += s.cssText;
  return Qn(t);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: to, defineProperty: so, getOwnPropertyDescriptor: io, getOwnPropertyNames: no, getOwnPropertySymbols: oo, getPrototypeOf: ro } = Object, ls = globalThis, wi = ls.trustedTypes, ao = wi ? wi.emptyScript : "", lo = ls.reactiveElementPolyfillSupport, mt = (r, e) => r, As = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? ao : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, Mn = (r, e) => !to(r, e), vi = { attribute: !0, type: String, converter: As, reflect: !1, useDefault: !1, hasChanged: Mn };
Symbol.metadata ??= Symbol("metadata"), ls.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Qe = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = vi) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(e, s, t);
      i !== void 0 && so(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, s) {
    const { get: i, set: n } = io(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const a = i?.call(this);
      n?.call(this, o), this.requestUpdate(e, a, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? vi;
  }
  static _$Ei() {
    if (this.hasOwnProperty(mt("elementProperties"))) return;
    const e = ro(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(mt("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(mt("properties"))) {
      const t = this.properties, s = [...no(t), ...oo(t)];
      for (const i of s) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [s, i] of t) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, s] of this.elementProperties) {
      const i = this._$Eu(t, s);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const s = new Set(e.flat(1 / 0).reverse());
      for (const i of s) t.unshift(bi(i));
    } else e !== void 0 && t.push(bi(e));
    return t;
  }
  static _$Eu(e, t) {
    const s = t.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const s of t.keys()) this.hasOwnProperty(s) && (e.set(s, this[s]), delete this[s]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return eo(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, s) {
    this._$AK(e, s);
  }
  _$ET(e, t) {
    const s = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : As).toAttribute(t, s.type);
      this._$Em = e, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const s = this.constructor, i = s._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : As;
      this._$Em = i;
      const a = o.fromAttribute(t, n.type);
      this[i] = a ?? this._$Ej?.get(i) ?? a, this._$Em = null;
    }
  }
  requestUpdate(e, t, s, i = !1, n) {
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[e]), s ??= o.getPropertyOptions(e), !((s.hasChanged ?? Mn)(n, t) || s.useDefault && s.reflect && n === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, s)))) return;
      this.C(e, t, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), n !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || s || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
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
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (s) {
      throw e = !1, this._$EM(), s;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
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
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Qe.elementStyles = [], Qe.shadowRootOptions = { mode: "open" }, Qe[mt("elementProperties")] = /* @__PURE__ */ new Map(), Qe[mt("finalized")] = /* @__PURE__ */ new Map(), lo?.({ ReactiveElement: Qe }), (ls.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ai = globalThis, yi = (r) => r, Ht = ai.trustedTypes, xi = Ht ? Ht.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, zn = "$lit$", De = `lit$${Math.random().toFixed(9).slice(2)}$`, An = "?" + De, co = `<${An}>`, Ge = document, _t = () => Ge.createComment(""), bt = (r) => r === null || typeof r != "object" && typeof r != "function", li = Array.isArray, po = (r) => li(r) || typeof r?.[Symbol.iterator] == "function", hs = `[ 	
\f\r]`, lt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, $i = /-->/g, ki = />/g, Be = RegExp(`>|${hs}(?:([^\\s"'>=/]+)(${hs}*=${hs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Si = /'/g, Mi = /"/g, En = /^(?:script|style|textarea|title)$/i, Cn = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), f = Cn(1), S = Cn(2), it = Symbol.for("lit-noChange"), y = Symbol.for("lit-nothing"), zi = /* @__PURE__ */ new WeakMap(), je = Ge.createTreeWalker(Ge, 129);
function Dn(r, e) {
  if (!li(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return xi !== void 0 ? xi.createHTML(e) : e;
}
const ho = (r, e) => {
  const t = r.length - 1, s = [];
  let i, n = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = lt;
  for (let a = 0; a < t; a++) {
    const c = r[a];
    let p, d, h = -1, m = 0;
    for (; m < c.length && (o.lastIndex = m, d = o.exec(c), d !== null); ) m = o.lastIndex, o === lt ? d[1] === "!--" ? o = $i : d[1] !== void 0 ? o = ki : d[2] !== void 0 ? (En.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = Be) : d[3] !== void 0 && (o = Be) : o === Be ? d[0] === ">" ? (o = i ?? lt, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, p = d[1], o = d[3] === void 0 ? Be : d[3] === '"' ? Mi : Si) : o === Mi || o === Si ? o = Be : o === $i || o === ki ? o = lt : (o = Be, i = void 0);
    const u = o === Be && r[a + 1].startsWith("/>") ? " " : "";
    n += o === lt ? c + co : h >= 0 ? (s.push(p), c.slice(0, h) + zn + c.slice(h) + De + u) : c + De + (h === -2 ? a : u);
  }
  return [Dn(r, n + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), s];
};
class wt {
  constructor({ strings: e, _$litType$: t }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const a = e.length - 1, c = this.parts, [p, d] = ho(e, t);
    if (this.el = wt.createElement(p, s), je.currentNode = this.el.content, t === 2 || t === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = je.nextNode()) !== null && c.length < a; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(zn)) {
          const m = d[o++], u = i.getAttribute(h).split(De), g = /([.?@])?(.*)/.exec(m);
          c.push({ type: 1, index: n, name: g[2], strings: u, ctor: g[1] === "." ? mo : g[1] === "?" ? fo : g[1] === "@" ? go : cs }), i.removeAttribute(h);
        } else h.startsWith(De) && (c.push({ type: 6, index: n }), i.removeAttribute(h));
        if (En.test(i.tagName)) {
          const h = i.textContent.split(De), m = h.length - 1;
          if (m > 0) {
            i.textContent = Ht ? Ht.emptyScript : "";
            for (let u = 0; u < m; u++) i.append(h[u], _t()), je.nextNode(), c.push({ type: 2, index: ++n });
            i.append(h[m], _t());
          }
        }
      } else if (i.nodeType === 8) if (i.data === An) c.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(De, h + 1)) !== -1; ) c.push({ type: 7, index: n }), h += De.length - 1;
      }
      n++;
    }
  }
  static createElement(e, t) {
    const s = Ge.createElement("template");
    return s.innerHTML = e, s;
  }
}
function nt(r, e, t = r, s) {
  if (e === it) return e;
  let i = s !== void 0 ? t._$Co?.[s] : t._$Cl;
  const n = bt(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, t, s)), s !== void 0 ? (t._$Co ??= [])[s] = i : t._$Cl = i), i !== void 0 && (e = nt(r, i._$AS(r, e.values), i, s)), e;
}
class uo {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: s } = this._$AD, i = (e?.creationScope ?? Ge).importNode(t, !0);
    je.currentNode = i;
    let n = je.nextNode(), o = 0, a = 0, c = s[0];
    for (; c !== void 0; ) {
      if (o === c.index) {
        let p;
        c.type === 2 ? p = new yt(n, n.nextSibling, this, e) : c.type === 1 ? p = new c.ctor(n, c.name, c.strings, this, e) : c.type === 6 && (p = new _o(n, this, e)), this._$AV.push(p), c = s[++a];
      }
      o !== c?.index && (n = je.nextNode(), o++);
    }
    return je.currentNode = Ge, i;
  }
  p(e) {
    let t = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(e, s, t), t += s.strings.length - 2) : s._$AI(e[t])), t++;
  }
}
class yt {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, s, i) {
    this.type = 2, this._$AH = y, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = nt(this, e, t), bt(e) ? e === y || e == null || e === "" ? (this._$AH !== y && this._$AR(), this._$AH = y) : e !== this._$AH && e !== it && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : po(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== y && bt(this._$AH) ? this._$AA.nextSibling.data = e : this.T(Ge.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: s } = e, i = typeof s == "number" ? this._$AC(e) : (s.el === void 0 && (s.el = wt.createElement(Dn(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const n = new uo(i, this), o = n.u(this.options);
      n.p(t), this.T(o), this._$AH = n;
    }
  }
  _$AC(e) {
    let t = zi.get(e.strings);
    return t === void 0 && zi.set(e.strings, t = new wt(e)), t;
  }
  k(e) {
    li(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let s, i = 0;
    for (const n of e) i === t.length ? t.push(s = new yt(this.O(_t()), this.O(_t()), this, this.options)) : s = t[i], s._$AI(n), i++;
    i < t.length && (this._$AR(s && s._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const s = yi(e).nextSibling;
      yi(e).remove(), e = s;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
let cs = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, s, i, n) {
    this.type = 1, this._$AH = y, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = y;
  }
  _$AI(e, t = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) e = nt(this, e, t, 0), o = !bt(e) || e !== this._$AH && e !== it, o && (this._$AH = e);
    else {
      const a = e;
      let c, p;
      for (e = n[0], c = 0; c < n.length - 1; c++) p = nt(this, a[s + c], t, c), p === it && (p = this._$AH[c]), o ||= !bt(p) || p !== this._$AH[c], p === y ? e = y : e !== y && (e += (p ?? "") + n[c + 1]), this._$AH[c] = p;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === y ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
class mo extends cs {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === y ? void 0 : e;
  }
}
class fo extends cs {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== y);
  }
}
class go extends cs {
  constructor(e, t, s, i, n) {
    super(e, t, s, i, n), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = nt(this, e, t, 0) ?? y) === it) return;
    const s = this._$AH, i = e === y && s !== y || e.capture !== s.capture || e.once !== s.once || e.passive !== s.passive, n = e !== y && (s === y || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class _o {
  constructor(e, t, s) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    nt(this, e);
  }
}
const bo = ai.litHtmlPolyfillSupport;
bo?.(wt, yt), (ai.litHtmlVersions ??= []).push("3.3.3");
const wo = (r, e, t) => {
  const s = t?.renderBefore ?? e;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = t?.renderBefore ?? null;
    s._$litPart$ = i = new yt(e.insertBefore(_t(), n), n, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ci = globalThis;
class se extends Qe {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = wo(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return it;
  }
}
se._$litElement$ = !0, se.finalized = !0, ci.litElementHydrateSupport?.({ LitElement: se });
const vo = ci.litElementPolyfillSupport;
vo?.({ LitElement: se });
(ci.litElementVersions ??= []).push("4.2.2");
const Ai = "copilot.standalone.plant", ct = "copilot.standalone.icons";
function $t(r, e) {
  try {
    const t = localStorage.getItem(r);
    return t ? JSON.parse(t) : e;
  } catch {
    return e;
  }
}
function us(r, e) {
  try {
    localStorage.setItem(r, JSON.stringify(e));
  } catch {
  }
}
function Es(r) {
  return r?.code === "conflict";
}
class yo {
  constructor(e) {
    this.hass = e;
  }
  get standalone() {
    return !!this.hass.__standalone;
  }
  setHass(e) {
    this.hass = e;
  }
  async getConfig() {
    return this.standalone ? { version: "demo", plant: $t(Ai, null), options: {}, is_admin: !0 } : this.hass.callWS({ type: "copilot/config/get" });
  }
  /**
   * Save the plant. With `rev` the backend refuses (error code `conflict`) when the plant was
   * changed elsewhere since that revision. Resolves to the new revision.
   */
  async saveConfig(e, t) {
    if (this.standalone) {
      us(Ai, e);
      return;
    }
    const s = { type: "copilot/config/save", plant: e };
    return t !== void 0 && (s.rev = t), (await this.hass.callWS(s)).rev;
  }
  /** Follow saves from every window; the current state is delivered right away (and after reconnects). */
  async subscribeConfig(e) {
    return this.standalone || !this.hass.connection ? () => {
    } : this.hass.connection.subscribeMessage((t) => e(t.plant, t.rev), {
      type: "copilot/config/subscribe"
    });
  }
  async write(e, t, s) {
    return this.hass.callWS({ type: "copilot/write", component_id: e, slot: t, value: s });
  }
  async listBackups() {
    return this.standalone ? [] : (await this.hass.callWS({ type: "copilot/backups/list" })).backups;
  }
  async restoreBackup(e) {
    return this.hass.callWS({ type: "copilot/backups/restore", ts: e });
  }
  async scan(e) {
    return this.standalone ? { source: "ems_esp", entity_count: 0, entities: [], suggestions: [] } : this.hass.callWS({ type: "copilot/mapping/scan", source: "ems_esp", plant: e });
  }
  async listIcons() {
    return this.standalone ? $t(ct, []) : (await this.hass.callWS({ type: "copilot/icons/list" })).icons;
  }
  async uploadIcon(e, t, s, i) {
    if (this.standalone) {
      const n = $t(ct, []), o = { id: Math.random().toString(16).slice(2, 14), name: e, mime: t, iso: i, size: s.length, data_url: `data:${t};base64,${s}` };
      return n.push(o), us(ct, n), o;
    }
    return (await this.hass.callWS({ type: "copilot/icons/upload", name: e, mime: t, data: s, iso: i })).icon;
  }
  async deleteIcon(e) {
    if (this.standalone) return us(ct, $t(ct, []).filter((t) => t.id !== e));
    await this.hass.callWS({ type: "copilot/icons/delete", icon_id: e });
  }
  async listMessages() {
    return this.standalone ? [] : (await this.hass.callWS({ type: "copilot/messages/list" })).messages;
  }
  async subscribeMessages(e) {
    return this.standalone || !this.hass.connection ? () => {
    } : this.hass.connection.subscribeMessage((t) => e(t.message), {
      type: "copilot/messages/subscribe"
    });
  }
  async clearMessages() {
    this.standalone || await this.hass.callWS({ type: "copilot/messages/clear" });
  }
}
const xo = {
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
  "cv.tip_mean": "Stundenmittel",
  "cv.tip_room": "Raum {room}",
  "cv.tip_disturbed": "gestört (Ofen/Fenster) – zählt nicht",
  "cv.see_coach": "Empfehlungen gibt der Heizkurven-Assistent unten.",
  "cc.title": "Heizkurven-Assistent",
  "cc.intro": "Der Assistent führt dich in kleinen Schritten zur passenden Heizkurve: Sie ist so niedrig wie möglich und hält den Referenzraum trotzdem auf deiner Wunschtemperatur. Das dauert einige Tage bis Wochen, weil das Haus nach jeder Änderung Zeit braucht.",
  "cc.how1": "Vorbereiten: Ventile auf, Absenkung aus, Wunschtemperatur festlegen.",
  "cc.how2": "Einschwingen: nach jeder Änderung {h} Stunden abwarten.",
  "cc.how3": "Messen: mindestens {h} Heizstunden an {d} Tagen sammeln – COPilot meldet sich, wenn es so weit ist.",
  "cc.how4": "Anpassen: genau eine kleine Änderung übernehmen, dann wieder von vorn – bis die Raumtemperatur bei milder und kalter Witterung passt.",
  "cc.start": "Assistent starten",
  "cc.admin_only": "Den Assistenten kann ein Administrator starten.",
  "cc.step.prep": "Vorbereitung",
  "cc.step.settle": "Einschwingen",
  "cc.step.collect": "Messen",
  "cc.step.adjust": "Anpassen",
  "cc.step.fits": "Passt",
  "cc.meta": "Ziel {target} °C · gestartet {since} · Runde {round}",
  "cc.meta_disturb": "Störungen aus {entity}",
  "cc.demo": "Demo: Wartezeiten werden übersprungen",
  "cc.loading": "Messwerte werden geladen …",
  "cc.settle_t": "Das Haus stellt sich auf die neue Kurve ein",
  "cc.settle": "Heizkörper, Wände und Möbel brauchen etwa {h} Stunden, bis sich die neue Einstellung voll auswirkt. Gemessen wird ab {until}. Bitte bis dahin nichts an der Kurve ändern.",
  "cc.collect_t": "Messwerte werden gesammelt",
  "cc.snoozed_t": "Beobachtung verlängert",
  "cc.collect": "{h} von {need} Heizstunden an {d} von {needd} Tagen. Voraussichtlich bereit: {eta}.",
  "cc.collect_hint": "Du bekommst eine Meldung, sobald die nächste Auswertung bereit ist. Stunden mit Ofen, offenem Fenster oder plötzlichen Temperatursprüngen zählen nicht.",
  "cc.fits_t": "Die Heizkurve passt",
  "cc.fits": "Die Raumtemperatur liegt im Mittel höchstens {tol} K neben dem Ziel. Der Assistent prüft weiter mit und meldet sich, wenn sich das ändert.",
  "cc.fits_cold": "Kalte Tage unter {t} °C gab es noch nicht genug – ob die Kurve auch dann passt, zeigt sich beim ersten Frost. Der Assistent meldet sich dann.",
  "cc.band_cold": "kalt (unter {t} °C)",
  "cc.band_mild": "mild (ab {t} °C)",
  "cc.band_all": "alle Heizstunden",
  "cc.band_idle": "über Heizgrenze ({t} °C)",
  "cc.band_h": "{h} Std.",
  "cc.band_need": "noch {h} Std. nötig",
  "cc.band_note": "Abweichung der Raumtemperatur vom Ziel. Rot = zu warm, blau = zu kalt, grün = passt.",
  "cc.why.lower": "Es wird zu warm – Kurve parallel absenken",
  "cc.why.raise": "Es wird nicht warm genug – Kurve parallel anheben",
  "cc.why.flatter": "Bei Kälte zu warm, bei milder Witterung passend – Kurve flacher",
  "cc.why.steeper": "Bei Kälte zu kalt, bei milder Witterung passend – Kurve steiler",
  "cc.why.limit_up": "Über der Heizgrenze kühlt es aus – Heizgrenze anheben",
  "cc.why.user": "Von Hand geändert",
  "cc.whyx.lower": "Der Raum war bei milder und kalter Witterung gleichermaßen zu warm. Die Parallelverschiebung senkt den Vorlauf überall gleich – das spart Strom.",
  "cc.whyx.raise": "Der Raum war insgesamt etwas zu kühl. Die Parallelverschiebung hebt den Vorlauf überall gleich an.",
  "cc.whyx.flatter": "Bei Kälte war es wärmer als bei milder Witterung. Eine niedrigere Auslegungstemperatur senkt vor allem den Vorlauf an kalten Tagen.",
  "cc.whyx.steeper": "Bei Kälte war es kühler als bei milder Witterung. Eine höhere Auslegungstemperatur hebt vor allem den Vorlauf an kalten Tagen an.",
  "cc.whyx.limit_up": "Oberhalb der Heizgrenze heizt die Wärmepumpe nicht – der Raum lag dann deutlich unter dem Ziel.",
  "cc.effect": "Vorlauf danach:",
  "cc.effect_at": "{x} °C außen {a} → {b} °C",
  "cc.apply": "Übernehmen",
  "cc.manual": "Am Gerät eingestellt",
  "cc.manual_hint": "Die Parameter sind nicht beschreibbar zugeordnet: bitte am Bedienteil einstellen und dann „Am Gerät eingestellt“ wählen.",
  "cc.snooze": "Noch 2 Tage beobachten",
  "cc.applied": "Gespeichert – neue Runde beginnt.",
  "cc.log": "Logbuch",
  "cc.log_empty": "Noch keine Änderungen.",
  "cc.log_when": "Wann",
  "cc.log_change": "Änderung",
  "cc.log_why": "Grund",
  "cc.log_dev": "Raum vorher",
  "cc.log_manual": "am Gerät",
  "cc.settings": "Einstellungen",
  "cc.settings_t": "Assistent – Einstellungen",
  "cc.stop": "Beenden",
  "cc.stop_q": "Heizkurven-Assistent beenden? Das Logbuch wird gelöscht, die Heizkurve bleibt, wie sie ist.",
  "cc.start_t": "Heizkurven-Assistent starten",
  "cc.prep": "Damit die Messung aussagekräftig ist, bitte vorher prüfen:",
  "cc.chk.valves": "Die Thermostatventile im Referenzraum (wo der Raumfühler sitzt) sind ganz geöffnet.",
  "cc.chk.setback": "Nacht- und Urlaubsabsenkung sind aus (oder bleiben während des Trainings unverändert).",
  "cc.chk.room": "Am Heizkreis ist eine Raumtemperatur zugeordnet, die nicht in der Sonne oder am Ofen hängt.",
  "cc.chk.doors": "Ich ändere die Heizkurve während des Trainings nur über den Assistenten.",
  "cc.target": "Wunschtemperatur im Referenzraum (°C)",
  "cc.target_hint": "Die Temperatur, die der Raum mit voll geöffneten Ventilen erreichen soll.",
  "cc.disturb": "Störquelle (optional)",
  "cc.disturb_hint": "Eine Entität, die an ist, wenn Kaminofen, offenes Fenster o. Ä. die Messung verfälschen. Diese Stunden zählen dann nicht. Plötzliche Temperatursprünge erkennt COPilot auch ohne.",
  "msgk.curve_eval_due": "Heizkurven-Assistent: neue Auswertung für {circuit} bereit",
  "card.views": "Menüpunkte der Karte",
  "card.views_hint": "Mit mehr als einem Menüpunkt zeigt die Karte oben ein Menü. Die Konfiguration gibt es nur im Panel.",
  "card.back_after": "Nach so vielen Sekunden ohne Bedienung zurück zum ersten Menüpunkt (0 = nie)",
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
}, $o = {
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
  "cv.tip_mean": "hourly mean",
  "cv.tip_room": "room {room}",
  "cv.tip_disturbed": "disturbed (stove/window) – not counted",
  "cv.see_coach": "Recommendations come from the heating curve coach below.",
  "cc.title": "Heating curve coach",
  "cc.intro": "The coach guides you to the right heating curve in small steps: as low as possible while the reference room still reaches your desired temperature. This takes days to weeks because the house needs time after every change.",
  "cc.how1": "Prepare: valves open, setback off, choose the desired temperature.",
  "cc.how2": "Settle: wait {h} hours after every change.",
  "cc.how3": "Measure: collect at least {h} heating hours on {d} days – COPilot tells you when it is ready.",
  "cc.how4": "Adjust: apply exactly one small change, then start over – until the room temperature fits in mild and cold weather.",
  "cc.start": "Start coach",
  "cc.admin_only": "An administrator can start the coach.",
  "cc.step.prep": "Prepare",
  "cc.step.settle": "Settle",
  "cc.step.collect": "Measure",
  "cc.step.adjust": "Adjust",
  "cc.step.fits": "Fits",
  "cc.meta": "target {target} °C · started {since} · round {round}",
  "cc.meta_disturb": "disturbances from {entity}",
  "cc.demo": "Demo: waiting times are skipped",
  "cc.loading": "Loading measurements …",
  "cc.settle_t": "The house is adapting to the new curve",
  "cc.settle": "Radiators, walls and furniture need about {h} hours until the new setting takes full effect. Measuring starts at {until}. Please do not change the curve until then.",
  "cc.collect_t": "Collecting measurements",
  "cc.snoozed_t": "Observation extended",
  "cc.collect": "{h} of {need} heating hours on {d} of {needd} days. Expected to be ready: {eta}.",
  "cc.collect_hint": "You get a message as soon as the next evaluation is ready. Hours with a stove, open window or sudden temperature jumps do not count.",
  "cc.fits_t": "The heating curve fits",
  "cc.fits": "The mean room temperature is within {tol} K of the target. The coach keeps watching and tells you when that changes.",
  "cc.fits_cold": "There were not enough cold days below {t} °C yet – whether the curve fits then shows with the first frost. The coach will tell you.",
  "cc.band_cold": "cold (below {t} °C)",
  "cc.band_mild": "mild (from {t} °C)",
  "cc.band_all": "all heating hours",
  "cc.band_idle": "above heating limit ({t} °C)",
  "cc.band_h": "{h} h",
  "cc.band_need": "{h} h more needed",
  "cc.band_note": "Deviation of the room temperature from the target. Red = too warm, blue = too cold, green = fits.",
  "cc.why.lower": "Too warm – lower the curve in parallel",
  "cc.why.raise": "Not warm enough – raise the curve in parallel",
  "cc.why.flatter": "Too warm when cold, fine when mild – flatter curve",
  "cc.why.steeper": "Too cold when cold, fine when mild – steeper curve",
  "cc.why.limit_up": "Cools down above the heating limit – raise the heating limit",
  "cc.why.user": "Changed by hand",
  "cc.whyx.lower": "The room was equally too warm in mild and cold weather. The parallel shift lowers the flow everywhere by the same amount – saving electricity.",
  "cc.whyx.raise": "The room was slightly too cool overall. The parallel shift raises the flow everywhere by the same amount.",
  "cc.whyx.flatter": "It was warmer in cold weather than in mild weather. A lower design temperature mainly lowers the flow on cold days.",
  "cc.whyx.steeper": "It was cooler in cold weather than in mild weather. A higher design temperature mainly raises the flow on cold days.",
  "cc.whyx.limit_up": "Above the heating limit the heat pump does not heat – the room was then clearly below the target.",
  "cc.effect": "Flow afterwards:",
  "cc.effect_at": "{x} °C outside {a} → {b} °C",
  "cc.apply": "Apply",
  "cc.manual": "Set at the controller",
  "cc.manual_hint": "The parameters are not mapped to writable entities: please set it at the controller and then choose “Set at the controller”.",
  "cc.snooze": "Observe 2 more days",
  "cc.applied": "Saved – a new round begins.",
  "cc.log": "Log",
  "cc.log_empty": "No changes yet.",
  "cc.log_when": "When",
  "cc.log_change": "Change",
  "cc.log_why": "Reason",
  "cc.log_dev": "Room before",
  "cc.log_manual": "at the controller",
  "cc.settings": "Settings",
  "cc.settings_t": "Coach – settings",
  "cc.stop": "Stop",
  "cc.stop_q": "Stop the heating curve coach? The log is deleted, the heating curve stays as it is.",
  "cc.start_t": "Start the heating curve coach",
  "cc.prep": "For meaningful measurements, please check first:",
  "cc.chk.valves": "The thermostatic valves in the reference room (where the room sensor is) are fully open.",
  "cc.chk.setback": "Night and holiday setback are off (or stay unchanged during the training).",
  "cc.chk.room": "A room temperature is mapped on the heating circuit that is not in the sun or next to a stove.",
  "cc.chk.doors": "During the training I change the heating curve only through the coach.",
  "cc.target": "Desired temperature in the reference room (°C)",
  "cc.target_hint": "The temperature the room should reach with fully open valves.",
  "cc.disturb": "Disturbance source (optional)",
  "cc.disturb_hint": "An entity that is on while a stove, open window or similar distorts the measurement. Those hours do not count. COPilot also detects sudden temperature jumps without it.",
  "msgk.curve_eval_due": "Heating curve coach: new evaluation for {circuit} ready",
  "card.views": "Menu entries of the card",
  "card.views_hint": "With more than one entry the card shows a menu at the top. The configuration is only available in the panel.",
  "card.back_after": "Seconds without interaction before returning to the first entry (0 = never)",
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
}, Ei = { de: xo, en: $o };
let Ze = "de";
function Ci(r) {
  Ze = r;
}
function Di() {
  return Ze;
}
function Ti(r, e) {
  return r === "de" || r === "en" ? r : (e || "de").toLowerCase().startsWith("de") ? "de" : "en";
}
function l(r, e) {
  let t = Ei[Ze][r] ?? Ei.de[r] ?? r;
  return e && (t = t.replace(/\{(\w+)\}/g, (s, i) => {
    const n = e[i];
    return typeof n == "number" ? j(n, Number.isInteger(n) ? 0 : 1) : n == null ? "" : String(n);
  })), t;
}
function j(r, e = 1) {
  return r.toLocaleString(Ze === "de" ? "de-DE" : "en-GB", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  });
}
function Tn(r) {
  return new Date(r * 1e3).toLocaleTimeString(Ze === "de" ? "de-DE" : "en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function ko(r) {
  const e = new Date(r * 1e3), t = /* @__PURE__ */ new Date();
  return e.toDateString() === t.toDateString() ? Tn(r) : e.toLocaleString(Ze === "de" ? "de-DE" : "en-GB", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function So(r) {
  const e = Math.round(r / 60);
  return e < 60 ? `${e} min` : `${Math.floor(e / 60)} h ${e % 60} min`;
}
const Mo = {
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
}, Wi = { supply_temp: "F", return_temp: "R", flow_temp: "F", target_flow_temp: "Set", room_temp: "Room", dhw_temp: "DHW", dhw_setpoint: "Set" };
function Pi(r, e) {
  return Ze === "en" && e in Wi ? Wi[e] : Mo[e] ?? "";
}
function Te(r, e) {
  const t = `slot.${r}.${e}`, s = l(t);
  return s === t ? l(`slot.${e}`) : s;
}
const $ = 20, Q = (r, e = !1) => ({ key: r, kind: "temp", show: e }), ne = {
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
ne.floor_heating.slots = ne.radiators.slots;
function Ae(r) {
  return r.type === "value_tile" ? (r.props.entries || []).map((e) => ({
    key: e.slot,
    kind: e.kind || "text",
    show: !0
  })) : ne[r.type].slots;
}
function Le(r) {
  const e = ne[r.type];
  if (!e.variants) return;
  const t = r.props?.variant || ot(r.model)?.variant || "wall_e";
  return e.variants[t] || Object.values(e.variants)[0];
}
function Fe(r) {
  const e = Le(r);
  return e ? { w: e.w, h: e.h } : { w: ne[r.type].w, h: ne[r.type].h };
}
function Re(r) {
  return Le(r)?.ports ?? ne[r.type].ports;
}
function Li(r) {
  return Le(r)?.badges ?? ne[r.type].badges;
}
function ms(r, e = !1) {
  const t = Le(r), s = e && t?.atDhw || t?.at;
  return Ae(r).map((i) => t ? { ...i, pos: t.pos?.[i.key] ?? i.pos, at: s?.[i.key] ?? t.at?.[i.key] ?? i.at } : i);
}
function ve(r) {
  const e = { ...ne[r.type], ...Fe(r) };
  if (r.type === "value_tile") {
    const s = (r.props.entries || []).length;
    return { w: e.w, h: 2 + Math.ceil(s * 1.3) };
  }
  const t = r.rot || 0;
  return t === 90 || t === 270 ? { w: e.h, h: e.w } : { w: e.w, h: e.h };
}
const Hi = ["r", "b", "l", "t"];
function zo(r, e) {
  const t = e / 90 % 4;
  return Hi[(Hi.indexOf(r) + t) % 4];
}
function ye(r, e) {
  const t = Re(r).find((p) => p.id === e);
  if (!t) return null;
  const s = r.rot || 0, { w: i, h: n } = Fe(r);
  let { x: o, y: a } = t, c = t.dir;
  return r.flip && ne[r.type].mirrorable && (o = i - o, c = c === "l" ? "r" : c === "r" ? "l" : c), s === 90 ? [o, a] = [n - a, o] : s === 180 ? [o, a] = [i - o, n - a] : s === 270 && ([o, a] = [a, i - o]), { x: r.x + o, y: r.y + a, dir: zo(c, s), def: t };
}
const Ot = [
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
], Ao = { "buderus-wsw": "buderus-wsw186i" }, di = [
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
], Eo = {
  "buderus-wlw186i-t": "buderus-wlw186i-t180",
  "buderus-wlw186i-b": "buderus-wlw186i-e",
  "bosch-aw-b": "bosch-aw-e"
};
function ot(r) {
  const e = r && Eo[r] || r;
  return di.find((t) => t.id === e);
}
function He(r) {
  const e = r && Ao[r] || r;
  return Ot.find((t) => t.id === e) || Ot.find((t) => t.id === "generic-air");
}
const Wn = /* @__PURE__ */ new Set(["on", "true", "1", "yes", "ja", "ein", "an", "active", "aktiv", "open", "offen"]);
function ee(r) {
  return !r || !r.available || r.raw === null ? !1 : typeof r.raw == "boolean" ? r.raw : r.num !== null ? r.num > 0 : Wn.has(String(r.raw).trim().toLowerCase());
}
const Co = {
  off: ["off", "aus", "uit", "av", "arrêt", "standby", "bereit"],
  heating: ["heating", "heizen", "verwarmen", "uppvärmning", "chauffage", "ogrzewanie", "riscaldamento"],
  cooling: ["cooling", "kühlen", "koelen", "kyler", "refroidissement", "chłodzenie", "raffreddamento"],
  hot_water: ["hot water", "hot_water", "warmwasser", "warm water", "varmvatten", "eau chaude", "c.w.u.", "acqua calda"],
  pool_heating: ["pool heating", "pool beheizen", "zwembadverwarming", "chauffage piscine"],
  pool: ["pool", "zwembad", "piscine", "basen", "piscina"],
  defrost: ["defrost", "abtauen", "ontdooien", "avfrostning", "dégivrage", "odladzanie", "scongelamento"],
  compressor_alarm: ["compressor alarm", "compressor_alarm", "kompressor alarm", "kompressoralarm"]
};
function rt(r) {
  if (!r || !r.available || r.raw === null) return;
  const e = String(r.raw).trim().toLowerCase();
  for (const [t, s] of Object.entries(Co)) if (s.includes(e)) return t;
  return e.includes("abtau") || e.includes("defrost") ? "defrost" : e;
}
function pi(r, e, t) {
  if (r === void 0 || r === "unavailable" || r === "unknown" || r === "")
    return { raw: null, num: null, unit: e, entity: t, available: !1 };
  const s = Number(r);
  return { raw: r, num: Number.isFinite(s) ? s : null, unit: e, entity: t, available: !0 };
}
class Pn {
  constructor(e) {
    this.hass = e;
  }
  entityOf(e, t) {
    return e.type === "value_tile" ? (e.props.entries || []).find((i) => i.slot === t)?.entity : e.bindings[t];
  }
  get(e, t) {
    const s = this.entityOf(e, t);
    return s ? this.getEntity(s) : void 0;
  }
  getEntity(e) {
    const t = this.hass.states[e];
    return pi(t?.state, t?.attributes?.unit_of_measurement, e);
  }
  async history(e, t, s) {
    const i = this.entityOf(e, t);
    return i ? Do(this.hass, i, s) : [];
  }
}
async function Do(r, e, t) {
  const s = /* @__PURE__ */ new Date(), i = new Date(s.getTime() - t * 36e5);
  return ((await r.callWS({
    type: "history/history_during_period",
    start_time: i.toISOString(),
    end_time: s.toISOString(),
    entity_ids: [e],
    minimal_response: !0,
    no_attributes: !0,
    significant_changes_only: !1
  }))[e] || []).map((a) => {
    const c = String(a.s).toLowerCase();
    let p = Number(a.s);
    return Number.isFinite(p) || (p = Wn.has(c) ? 1 : c === "off" || c === "false" ? 0 : null), { t: a.lu, v: p, raw: String(a.s) };
  });
}
function ke(r, e) {
  const t = /* @__PURE__ */ new Set(), s = (i) => e.get(r, i);
  switch (r.type) {
    case "pump":
    case "mixer":
      (ee(s("running")) || ee(s("speed")) || ee(s("flow"))) && t.add("running"), r.type === "mixer" && ee(s("position")) && t.add("running");
      break;
    case "valve_3way": {
      const i = s("position");
      t.add(ee(i) ? "b" : "a");
      break;
    }
    case "outdoor_unit": {
      const i = rt(s("activity"));
      (ee(s("compressor_on")) || ee(s("compressor_speed")) || ee(s("heat_power"))) && t.add("running"), i === "defrost" && t.add("defrost"), i === "compressor_alarm" && t.add("alarm"), i && i !== "off" && i !== "compressor_alarm" && t.add("running"), i && t.add(`mode_${i}`);
      break;
    }
    case "indoor_unit": {
      (ee(s("aux_level")) || ee(s("aux_step1")) || ee(s("aux_step2")) || ee(s("aux_step3"))) && t.add("aux"), (ee(s("pc0_running")) || ee(s("pc0_speed")) || ee(s("flow"))) && t.add("running"), t.add(ee(s("vw1_position")) || !r.bindings.vw1_position && ee(s("dhw_active")) && !ee(s("heating_active")) ? "b" : "a"), (ee(s("pc1_running")) || ee(s("pc1_speed"))) && t.add("pc1"), ee(s("dhw_charging")) && t.add("charging");
      const i = ee(s("dhw_active")) || t.has("running") && t.has("b") ? "hot_water" : ee(s("heating_active")) || t.has("running") ? "heating" : "off";
      t.add(`mode_${i}`);
      break;
    }
    case "dhw_tank":
      ee(s("charging")) && t.add("charging"), ee(s("disinfecting")) && t.add("disinfecting");
      break;
    case "tap":
      ee(s("flow")) && t.add("flowing");
      break;
    case "radiators":
    case "floor_heating":
      t.add("on");
      break;
  }
  return t;
}
function Oi(r, e) {
  const t = e.get(r.c);
  return t ? r.s.startsWith("!") ? !t.has(r.s.slice(1)) : t.has(r.s) : !1;
}
function To(r, e) {
  const t = r.flow || [], s = r.flowAny || [];
  return t.length === 0 && s.length === 0 ? !1 : t.every((i) => Oi(i, e)) && (s.length === 0 || s.some((i) => Oi(i, e)));
}
function Wo(r, e) {
  const t = new Map(r.components.map((n) => [n.id, n])), s = /* @__PURE__ */ new Map(), i = (n) => {
    const o = t.get(n.c);
    if (!o) return;
    const a = ye(o, n.p);
    if (a) {
      if (a.def.fixedTemp !== void 0) return a.def.fixedTemp;
      if (!(a.def.vw1 && !ke(o, e).has(a.def.vw1)) && a.def.tempSlot) {
        const c = e.get(o, a.def.tempSlot);
        if (c?.available && c.num !== null) return c.num;
      }
    }
  };
  for (const n of r.pipes) {
    if (n.bindings?.temp) {
      const a = e.getEntity(n.bindings.temp);
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
      const c = t.get(a.from.c);
      if (c && ne[c.type].passive) {
        const p = r.pipes.find((d) => d.to.c === c.id && s.has(d.id));
        if (p) {
          s.set(a.id, s.get(p.id)), o = !0;
          continue;
        }
      }
      if (n === 5 || !c || !ne[c.type].passive) {
        const p = i(a.to);
        p !== void 0 && (s.set(a.id, p), o = !0);
      }
    }
    if (!o && n > 0) break;
  }
  return s;
}
const Po = {
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
function ut(r, e) {
  return Ae(r).find((t) => t.key === e)?.kind || "text";
}
function Ne(r, e) {
  if (!r) return { text: l("none"), unit: "" };
  if (!r.available) return { text: l("none"), unit: "" };
  if (e === "bool") return { text: ee(r) ? l("on") : l("off"), unit: "" };
  if (e === "enum" && r.num === null) {
    const o = `mode.${rt(r)}`, a = l(o);
    return { text: a === o ? String(r.raw) : a, unit: "" };
  }
  let t = r.unit ?? Po[e] ?? "";
  if (r.num === null) return { text: String(r.raw), unit: "" };
  let s = r.num;
  if (e === "flow" && s < 0) return { text: l("none"), unit: "" };
  e === "power_w" && t === "W" && Math.abs(s) >= 1e3 && (s = s / 1e3, t = "kW");
  const i = e === "count" || e === "percent" || e === "flow" || e === "duration" || e === "power_w" && t === "W" || e === "energy" && s >= 100 ? 0 : 1;
  return { text: j(s, i), unit: t };
}
function _e(r, e) {
  if (r === void 0 || Number.isNaN(r)) return e;
  const t = [
    [5, [43, 108, 255]],
    [20, [34, 195, 230]],
    [28, [61, 220, 151]],
    [36, [245, 197, 66]],
    [44, [255, 138, 61]],
    [54, [255, 77, 77]],
    [65, [224, 33, 122]]
  ];
  if (r <= t[0][0]) return Wt(t[0][1]);
  for (let s = 1; s < t.length; s++) {
    const [i, n] = t[s], [o, a] = t[s - 1];
    if (r <= i) {
      const c = (r - o) / (i - o);
      return Wt([0, 1, 2].map((p) => a[p] + (n[p] - a[p]) * c));
    }
  }
  return Wt(t[t.length - 1][1]);
}
function Wt(r) {
  return `rgb(${r.map((e) => Math.round(e)).join(",")})`;
}
function Lo(r, e) {
  const t = (i, n, o) => Wt([0, 1, 2].map((a) => i[a] + (n[a] - i[a]) * Math.max(0, Math.min(1, o)))), s = (i, n) => e === void 0 ? 0.5 : (e - i) / (n - i);
  switch (r) {
    case "supply":
      return t([245, 176, 66], [255, 64, 64], s(25, 55));
    case "return":
      return t([46, 110, 255], [77, 208, 255], s(20, 45));
    case "dhw_hot":
      return t([255, 128, 170], [255, 46, 120], s(35, 60));
    case "dhw_cold":
      return "rgb(110, 205, 255)";
    case "circulation":
      return t([150, 120, 255], [196, 120, 255], s(35, 55));
    default:
      return _e(e, "#8a97a6");
  }
}
function Ln(r) {
  const e = r?.split(".")[0];
  return e === "number" || e === "input_number" ? "number" : e === "select" || e === "input_select" ? "select" : e === "switch" || e === "input_boolean" ? "switch" : e === "button" || e === "input_button" ? "button" : null;
}
function Cs(r, e = -12) {
  return {
    design: r ? 35 : 50,
    minExt: e,
    offset: 0,
    roomSet: 21,
    minFlow: r ? 22 : 25,
    maxFlow: r ? 40 : 55,
    limit: 16,
    exponent: r ? 1.1 : 1.3
  };
}
function Ie(r, e) {
  if (e >= r.limit) return null;
  const t = Math.max(1, r.roomSet - r.minExt), s = Math.max(0, (r.roomSet - e) / t), i = r.roomSet + (r.design - r.roomSet) * Math.pow(s, 1 / r.exponent);
  return Math.max(r.minFlow, Math.min(r.maxFlow, i + r.offset));
}
function Ho(r, e) {
  const t = r.exponent > 1.2 ? 2.5 : 1.5, s = (r.roomSet - e) * t;
  return Math.round(s * 2) / 2;
}
const Oo = {
  nominal: 7.1,
  source: "air",
  bufferL: 120,
  dhwL: 274,
  auxKw: 6,
  heatLoad: 6.2,
  designTemp: -12,
  floor: !1
}, qe = 4.186 / 3600, Vi = 10, fs = 21, Vo = 10, Bo = [
  // hour of day, minutes, litres per minute (mixed at 40 °C)
  [6.5, 7, 9],
  [6.85, 6, 9],
  [7.2, 5, 8],
  [12.25, 2, 4],
  [18.6, 3, 5],
  [20.4, 8, 9],
  [21.1, 6, 9]
], Ro = [
  [6, 7.5],
  [11.5, 12.5],
  [17.5, 19]
];
class No {
  constructor(e = {}, t = Date.now() / 1e3, s) {
    this.speed = 60, this.outdoorMean = 2, this.dailySwing = 2.5, this.tOut = 2, this.tRoom = 20.8, this.bufTop = 38, this.bufBot = 33, this.dhwTop = 49, this.dhwBot = 43, this.tVl = 30, this.tRl = 28, this.tVlHc = 38, this.tRlHc = 32, this.mode = "off", this.pTh = 0, this.pEl = 0, this.cop = 0, this.running = !1, this.lastStart = -1e9, this.lastStop = -1e9, this.pc0Overrun = 0, this.ice = 0.3, this.defrostLeft = 0, this.aux = 0, this.auxTimer = 0, this.heatDemand = !1, this.dhwDemand = !1, this.tapFlow = 0, this.tapLeft = 0, this.qEmit = 0, this.starts = 0, this.e = { el: 0, heat: 0, elHeat: 0, elDhw: 0, heatHeat: 0, heatDhw: 0, aux: 0 }, this.dim14a = !1, this.pv = !1, this.soc = 55, this.cloud = 0.8, this.en = { pv: 0, house: 0.4, wallbox: 0, battery: 0, grid: 0, hp: 0 }, this.disinfect = !1, this.fault = !1, this.lastDrawDay = /* @__PURE__ */ new Map(), this.days = /* @__PURE__ */ new Map(), this.sampleAcc = 0, this.hist = /* @__PURE__ */ new Map(), this.active = /* @__PURE__ */ new Map(), this.messages = [], this.labels = { dhw: "WW" }, this.listeners = [], this.p = { ...Oo, ...e }, this.curve = Cs(this.p.floor, this.p.designTemp), s && (this.labels = { ...this.labels, ...s }), this.time = t - 24 * 3600, this.prefill(t);
  }
  prefill(e) {
    const t = this.listeners;
    for (this.listeners = []; this.time < e; ) this.step(Vi);
    this.messages = this.messages.slice(-40), this.listeners = t;
  }
  onMessage(e) {
    return this.listeners.push(e), () => {
      this.listeners = this.listeners.filter((t) => t !== e);
    };
  }
  /** Advance by real seconds × speed. */
  advance(e) {
    let t = Math.min(e, 1) * this.speed, s = 0;
    for (; t > 0 && s++ < 400; ) {
      const i = Math.min(Vi, t);
      this.step(i), t -= i;
    }
  }
  hour() {
    const e = new Date(this.time * 1e3);
    return e.getHours() + e.getMinutes() / 60 + e.getSeconds() / 3600;
  }
  // ----------------------------------------------------------- physics
  pMax() {
    const e = this.p.nominal, t = this.p.source === "air" ? 1 + 0.015 * (this.tOut - 2) : 1;
    return Math.max(e * 0.55, Math.min(e * 1.2, e * t));
  }
  pMin() {
    const e = this.p.nominal * 0.18, t = this.p.source === "air" ? 1 + 0.04 * Math.max(0, this.tOut - 2) : 1;
    return Math.max(1, e * t);
  }
  curveSetpoint() {
    const e = this.pv ? 5 : 0;
    return (Ie(this.curve, this.tOut) ?? this.curve.minFlow) + e;
  }
  dhwSetpoint() {
    return this.disinfect ? 60 : this.pv ? 55 : 50;
  }
  step(e) {
    this.time += e;
    const t = this.hour(), s = e / 3600, i = this.p, n = this.outdoorMean + this.dailySwing * Math.cos((t - 15) / 24 * 2 * Math.PI);
    this.tOut += (n - this.tOut) * Math.min(1, e / 1800);
    const o = this.tOut < this.curve.limit, a = this.curveSetpoint(), c = o ? 650 * qe * 3600 / 3600 : 0, p = i.heatLoad * (i.floor, 1), d = i.floor ? 30 - fs : 45 - fs, h = i.floor ? 1.1 : 1.3;
    let m = 0;
    if (this.tVlHc = this.bufTop, c > 0) {
      let M = this.tVlHc - 3;
      for (let z = 0; z < 4; z++)
        m = p * Math.pow(Math.max(0, (M - this.tRoom) / d), h), M = this.tVlHc - m / (2 * c);
      m *= Math.max(0.1, Math.min(1, 1 - (this.tRoom - this.curve.roomSet - 0.2) * 1.5)), this.tRlHc = this.tVlHc - m / c;
    } else
      this.tRlHc = this.bufBot;
    this.qEmit = m;
    const u = i.heatLoad / (fs - i.designTemp);
    this.tRoom += (m - u * (this.tRoom - this.tOut) + 0.35) * s / 9;
    const g = Math.floor(this.time / 86400);
    Bo.forEach(([M, z, R], N) => {
      t >= M && t < M + 0.1 && this.lastDrawDay.get(N) !== g && (this.lastDrawDay.set(N, g), this.startDraw(z, R));
    }), this.tapLeft > 0 && (this.tapLeft -= e, this.tapLeft <= 0 && (this.tapFlow = 0));
    const b = Ro.some(([M, z]) => t >= M && t < z), v = i.dhwL / 2 * qe, w = this.tapFlow * 60 * qe * (40 - Vo), x = 1.38 / 24 / 2 + (b ? 0.12 : 0) / 2;
    this.dhwTop -= (w * 0.35 + x) * s / v, this.dhwBot -= (w * 0.65 + x) * s / v;
    const k = this.dhwSetpoint();
    (this.dhwTop < k - 5 || this.dhwBot < k - 14 || this.disinfect && this.dhwBot < 59) && (this.dhwDemand = !0), this.dhwBot >= k - 0.5 && this.dhwTop >= k - 0.5 && (this.dhwDemand = !1, this.disinfect && (this.disinfect = !1, this.condition("dis", !1, "info", "dhw_disinfection", {}, "dhw"))), o && this.bufTop < a - 2 && (this.heatDemand = !0);
    const C = this.time - this.lastStart > 600;
    (!o || this.bufTop > a + 2.5 && C) && (this.heatDemand = !1);
    let D = this.fault ? "compressor_alarm" : this.dhwDemand ? "hot_water" : this.heatDemand ? "heating" : "off";
    this.defrostLeft > 0 && !this.fault && (D = "defrost");
    const E = D === "heating" || D === "hot_water" || D === "defrost";
    E && !this.running ? this.time - this.lastStop >= 480 || D === "defrost" ? (this.running = !0, this.lastStart = this.time, this.starts++, this.pTh = this.pMin()) : D = "off" : !E && this.running && (this.time - this.lastStart > 600 || this.fault ? (this.running = !1, this.lastStop = this.time, this.pc0Overrun = 180) : D = this.mode === "hot_water" ? "hot_water" : "heating"), this.mode = this.running ? D : this.fault ? "compressor_alarm" : "off";
    const W = this.pMax(), Y = this.pMin();
    let U = 0;
    if (this.running && this.mode === "heating" ? U = this.qEmit + 2.2 * (a + 1 - this.bufTop) : this.running && this.mode === "hot_water" && (U = Math.min(W * 0.9, Math.max(Y, (60 - this.dhwBot - 3) * 0.9))), this.running && this.mode !== "defrost") {
      U = Math.max(Y, Math.min(W, U)), this.pTh < Y && (this.pTh = Y);
      const M = 0.5 * (e / 60);
      this.pTh += Math.max(-M * 2, Math.min(M, U - this.pTh));
    } else this.mode === "defrost" ? this.pTh = -3 : this.pTh = 0;
    let re = 0;
    this.dim14a || (this.fault && o ? re = i.auxKw : this.mode === "heating" && this.bufTop < a - 5 && this.pTh >= W * 0.95 ? (this.auxTimer += e, this.auxTimer > 1200 && (re = Math.min(i.auxKw, 3))) : this.auxTimer = 0, this.tOut < i.designTemp + 2 && this.mode === "heating" && (re = Math.max(re, Math.min(i.auxKw, 3))), this.disinfect && this.mode === "hot_water" && this.dhwBot > 52 && (re = Math.min(i.auxKw, 3))), this.fault && o && re > 0 && (this.heatDemand = !0), this.aux = re;
    const Z = this.running || this.pc0Overrun > 0 || this.fault && this.aux > 0;
    !this.running && this.pc0Overrun > 0 && (this.pc0Overrun -= e);
    const ae = Z ? 1100 * qe : 0, ie = this.mode === "hot_water", O = (this.running ? this.pTh : 0) + this.aux;
    ie ? this.tRl = this.dhwBot + 2 : this.tRl = Z ? this.bufBot : this.tRl + (22 - this.tRl) * Math.min(1, e / 3600), this.tVl = ae > 0 ? this.tRl + O / ae : this.tVl + (this.tRl - this.tVl) * Math.min(1, e / 600);
    const P = (i.bufferL + 60) / 2 * qe, F = ie ? 0 : ae, K = 0.05 / 2, X = F * (this.tVl - this.bufTop) + (c > F ? (c - F) * (this.bufBot - this.bufTop) : 0) - K, ce = c * (this.tRlHc - this.bufBot) + (F > c ? (F - c) * (this.bufTop - this.bufBot) : 0) - K;
    if (this.bufTop += X * s / P, this.bufBot += ce * s / P, this.bufBot > this.bufTop) {
      const M = (this.bufBot + this.bufTop) / 2;
      this.bufBot = this.bufTop = M;
    }
    if (ie && (this.dhwBot += O * s / v, this.dhwBot > this.dhwTop)) {
      const M = (this.dhwBot + this.dhwTop) / 2;
      this.dhwBot = this.dhwTop = M;
    }
    if (this.running && this.mode !== "defrost") {
      const M = this.tVl + 273.15 + 3, z = (this.p.source === "air" ? this.tOut - 6 : 0) + 273.15;
      this.cop = Math.max(1.4, Math.min(7.5, 0.57 * M / Math.max(5, M - z))), this.pEl = this.pTh / this.cop + 0.06;
    } else this.mode === "defrost" ? (this.cop = 0, this.pEl = 1.1) : (this.cop = 0, this.pEl = 0.012 + (Z ? 0.03 : 0));
    const I = Math.max(0, this.running ? this.pTh : 0);
    this.e.el += (this.pEl + this.aux) * s, this.e.aux += this.aux * s, this.e.heat += (I + this.aux) * s;
    const le = new Date(this.time * 1e3), pe = new Date(le.getFullYear(), le.getMonth(), le.getDate()).getTime();
    let be = this.days.get(pe);
    if (!be) {
      this.days.set(pe, be = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 });
      for (const M of [...this.days.keys()]) M < pe - 3 * 864e5 && this.days.delete(M);
    }
    if (be.heat += (I + this.aux) * s, be.el += (this.pEl + this.aux) * s, be.aux += this.aux * s, ie && (be.heatDhw += I * s, be.elDhw += this.pEl * s), ie ? (this.e.elDhw += this.pEl * s, this.e.heatDhw += I * s) : (this.e.elHeat += this.pEl * s, this.e.heatHeat += I * s), this.defrostLeft > 0)
      this.defrostLeft -= e, this.defrostLeft <= 0 && (this.ice = 0, this.defrostLeft = 0);
    else if (this.p.source === "air" && this.running && this.tOut < 7 && this.tOut > -15) {
      const M = this.tOut > -2 ? 1.3 - Math.abs(this.tOut - 1) * 0.12 : 0.9 + this.tOut * 0.04;
      this.ice += Math.max(0.05, M) * (this.pTh / W) * s, this.ice >= 1 && (this.defrostLeft = 240 + Math.random() * 120);
    }
    this.emitConditions(), this.energyStep(e, t), this.values = this.buildValues(a, k, b, Z, ae), this.sampleAcc += e, this.sampleAcc >= 60 && (this.sampleAcc = 0, this.sample());
  }
  /** Household power balance around the heat pump (PV, battery, house, wallbox, grid). */
  energyStep(e, t) {
    const s = e / 3600;
    this.cloud += (Math.random() - 0.5) * 0.08 * Math.sqrt(e / 10), this.cloud = Math.max(0.35, Math.min(1, this.cloud));
    const i = Math.max(0.25, Math.min(1, 0.45 + (this.outdoorMean - 2) / 25)), n = t > 7 && t < 19 ? Math.sin((t - 7) / 12 * Math.PI) : 0;
    let o = 9.9 * 0.8 * i * n * this.cloud;
    this.pv && (o = Math.max(o, 6.5));
    const a = (b, v, w) => t >= b && t < v ? w : 0, c = 0.35 + a(6.5, 8, 0.6) + a(11.5, 13, 0.9) + a(18, 21, 0.8) + 0.05 * Math.sin(this.time / 97);
    let d = Math.floor(this.time / 86400) % 2 === 0 && t >= 18 && t < 21.5 ? 7.4 : 0;
    this.dim14a && d && (d = 4.2);
    const h = this.pEl + this.aux, m = o - c - d - h;
    let u = 0;
    m > 0 && this.soc < 100 ? u = -Math.min(m, 5) : m < 0 && this.soc > 10 && !d && (u = Math.min(-m, 5)), this.soc = Math.max(0, Math.min(100, this.soc - u * s * 100 / 10));
    const g = c + d + h - o - u;
    this.en = { pv: o, house: c, wallbox: d, battery: u, grid: g, hp: h };
  }
  startDraw(e, t) {
    this.tapFlow = t, this.tapLeft = e * 60;
  }
  buildValues(e, t, s, i, n) {
    const o = (p) => Math.round(p * 10) / 10, a = this.pMax(), c = this.running;
    return {
      outdoor: {
        outdoor_temp: o(this.tOut),
        air_in_temp: o(this.tOut + 0.4),
        activity: this.mode,
        compressor_on: c && this.mode !== "defrost" ? !0 : c,
        compressor_speed: c ? Math.round(Math.abs(this.pTh) / (a * 1.15) * 100) : 0,
        fan_speed: c && this.mode !== "defrost" ? Math.round(35 + this.pTh / a * 55) : 0,
        heat_power: o(Math.max(0, c ? this.pTh : 0)),
        el_power: Math.round(this.pEl * 1e3),
        compressor_starts: this.starts,
        evap_in_temp: o(this.tOut - (c ? 6 : 0)),
        comp_in_temp: o(this.tOut - (c ? 2 : 0)),
        comp_out_temp: o(c ? this.tVl + 28 : this.tOut + 5),
        hp_temp: o(c ? this.tVl + 3 : this.tOut),
        lp_temp: o(c ? this.tOut - 7 : this.tOut),
        drain_pan_temp: o(this.mode === "defrost" ? 4 : Math.max(this.tOut, 1)),
        silent_mode: "auto"
      },
      indoor: {
        supply_temp: o(this.tVl),
        return_temp: o(this.tRl),
        condenser_temp: o(this.tVl + (c ? 1 : 0)),
        target_flow_temp: o(this.mode === "hot_water" ? Math.min(62, t + 8) : e),
        pressure: o(1.45 + ((this.bufTop + this.bufBot) / 2 - 30) * 8e-3),
        flow: i ? Math.round(n / qe) : 0,
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
        setpoint: t,
        charging: this.mode === "hot_water",
        onetime: !1,
        disinfecting: this.disinfect
      },
      hc: {
        flow_temp: o(this.tVlHc),
        return_temp: o(this.tRlHc),
        target_flow_temp: o(e),
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
  condition(e, t, s, i, n, o) {
    const a = this.active.get(e);
    if (t && !a) {
      const c = {
        id: Math.random().toString(16).slice(2, 14),
        ts: this.time,
        level: s,
        key: i,
        params: n,
        component_id: o,
        active: !0,
        end_ts: null
      };
      this.active.set(e, c.id), this.messages.push(c), this.messages.length > 200 && this.messages.shift(), this.listeners.forEach((p) => p(c));
    } else if (!t && a) {
      this.active.delete(e);
      const c = this.messages.find((p) => p.id === a);
      c && (c.active = !1, c.end_ts = this.time, this.listeners.forEach((p) => p(c)));
    }
  }
  emitConditions() {
    this.condition("defrost", this.mode === "defrost", "info", "defrost", {}, "outdoor"), this.condition("dhw", this.mode === "hot_water", "info", "dhw_charging", { component: this.labels.dhw }, "dhw"), this.condition("aux", this.aux > 0, "notice", "aux_heater", {}, "indoor"), this.condition("in1", this.dim14a, "warning", "input_active", { input: 1, label: "§14a" }, "indoor"), this.condition("in4", this.pv, "notice", "input_active", { input: 4, label: "PV-Überschuss" }, "indoor"), this.condition("dis", this.disinfect, "info", "dhw_disinfection", { component: this.labels.dhw }, "dhw"), this.condition("fault", this.fault, "error", "sim_fault", {}, "outdoor");
  }
  scenarioMessage(e) {
    const t = {
      id: Math.random().toString(16).slice(2, 14),
      ts: this.time,
      level: "info",
      key: "sim_scenario",
      params: { name: e },
      component_id: null,
      active: !1,
      end_ts: null
    };
    this.messages.push(t), this.listeners.forEach((s) => s(t));
  }
  // ----------------------------------------------------------- history
  sample() {
    const e = this.time;
    for (const [t, s] of Object.entries(this.values))
      for (const [i, n] of Object.entries(s)) {
        const o = typeof n == "number" ? n : typeof n == "boolean" ? n ? 1 : 0 : null;
        if (o === null && i !== "activity") continue;
        const a = `${t}.${i}`;
        let c = this.hist.get(a);
        c || this.hist.set(a, c = []), c.push(o === null ? { t: e, v: null, raw: String(n) } : { t: e, v: o }), c.length > 1500 && c.splice(0, c.length - 1440);
      }
  }
  dailyEnergy() {
    return [...this.days.entries()].sort((e, t) => e[0] - t[0]).map(([e, t]) => ({ day: e, ...t }));
  }
  history(e, t, s) {
    const i = this.hist.get(`${e}.${t}`) || [], n = this.time - s * 3600;
    return i.filter((o) => o.t >= n);
  }
}
function Bi(r) {
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
      const e = r.props.role;
      return e === "primary" ? "pc0" : e === "circulation" ? "circ" : "pc1";
    }
    default:
      return null;
  }
}
function gs(r) {
  if (!r) return {};
  const e = r.components.find((c) => c.type === "outdoor_unit"), t = r.components.find((c) => c.type === "indoor_unit"), s = r.components.find((c) => c.type === "buffer"), i = r.components.find((c) => c.type === "dhw_tank"), n = ot(t?.model), o = He(e?.model), a = r.components.filter((c) => c.type === "radiators" || c.type === "floor_heating");
  return {
    nominal: Number(e?.props.nominal_kw) || o.nominal,
    source: o.source,
    bufferL: Number(s?.props.volume) || n?.buffer || (s ? 120 : 30),
    dhwL: Number(i?.props.volume) || n?.dhw || 274,
    auxKw: Number(t?.props.aux_kw) || 6,
    heatLoad: Number(r.settings?.heat_load) || 6.2,
    floor: a.length > 0 && a.every((c) => c.type === "floor_heating")
  };
}
const Io = {}, Ri = {
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
class Hn {
  /** hass is used for raw entity lookups (e.g. real PV/grid values in the energy layer) */
  constructor(e, t) {
    this.sim = e, this.hass = t;
  }
  entityOf() {
  }
  getEntity() {
  }
  /** Real entity value despite demo mode (energy layer: household PV, grid, battery …). */
  realEntity(e) {
    const t = this.hass?.states?.[e];
    return t ? pi(t.state, t.attributes?.unit_of_measurement, e) : void 0;
  }
  get(e, t) {
    if (e.type === "value_tile") {
      const n = (e.props.entries || []).find((c) => c.slot === t);
      if (!n?.sim) return;
      const [o, a] = n.sim.split(".");
      return this.wrap(this.sim.values[o]?.[a]);
    }
    if (e.type === "indoor_unit") {
      const n = Ri[t];
      if (n) {
        const o = Le(e)?.id;
        return t.startsWith("dhw_") && o !== "t180" || t === "buffer_temp" && o !== "tp70" || t.startsWith("pc1") && o === "wall_e" ? void 0 : this.wrap(this.sim.values[n[0]]?.[n[1]]);
      }
    }
    const s = Bi(e);
    if (!s) return;
    let i = this.sim.values[s]?.[t];
    if (i !== void 0)
      return s === "hc" && typeof i == "number" && Number(e.props.circuit) > 1 && ["flow_temp", "return_temp", "target_flow_temp"].includes(t) && (i = Math.round((i - (e.type === "floor_heating" ? 12 : 2)) * 10) / 10), this.wrap(i, Io[t]);
  }
  wrap(e, t) {
    if (e !== void 0)
      return {
        raw: e,
        num: typeof e == "number" ? e : typeof e == "boolean" ? e ? 1 : 0 : null,
        unit: t,
        available: !0
      };
  }
  async history(e, t, s) {
    const i = e.type === "indoor_unit" ? Ri[t] : void 0;
    if (i) return this.sim.history(i[0], i[1], s);
    const n = Bi(e);
    return n ? this.sim.history(n, t, s) : [];
  }
}
function Ds() {
  return {
    name: l("wz.example_name") === "wz.example_name" ? "Meine Anlage" : l("wz.example_name"),
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
class jo {
  constructor() {
    this.components = [], this.pipes = [], this.n = 0;
  }
  add(e, t, s, i, n, o = {}) {
    return this.components.push({ id: e, type: t, label: s, x: i, y: n, bindings: {}, props: {}, ...o }), e;
  }
  pipe(e, t, s, i = [], n = {}) {
    this.pipes.push({ id: `p${++this.n}`, from: e, to: t, kind: s, flow: i, ...n });
  }
}
const _ = (r, e) => ({ c: r, p: e });
function ds(r, e) {
  const t = new jo(), s = ot(r.indoorModel), i = s?.variant || "wall_e", n = !!s?.dhw, o = !!s?.buffer, a = r.dhw === "tank" && !n, c = r.dhw === "tank" || n, p = r.buffer !== "none" && !o, d = { c: "iu", s: "running" }, h = c ? [{ c: "iu", s: "a" }] : [], m = { c: "iu", s: "b" }, u = { c: "pc1", s: "running" }, g = {
    aux_kw: r.aux ? r.auxKw : 0,
    input_labels: { input1: "§14a / EVU", input4: "PV" },
    input_levels: { input1: "warning" },
    pressure_min: 1,
    pressure_max: 2.7,
    buffer_l: s?.buffer
  }, b = i !== "wall_e", v = r.circuits.length === 1 && !r.circuits[0]?.mixed && r.circuits[0]?.emitter === "radiators", w = b && v && (i === "tp70" || i === "brine" || i === "t180"), x = !w && i === "tp70" && r.circuits.length <= 1 && !r.circuits[0]?.mixed, k = r.circuits[0], C = i === "wall_e" && r.buffer === "parallel" && !o && r.circuits.length === 1 && !k?.mixed && k?.emitter === "radiators", D = 50, E = 16, W = E + 3, Y = 2, U = w && i === "t180", re = i === "t180" ? p ? 42 : 26 : i === "tp70" ? 34 : 32, Z = U ? re + 18 : C || w ? 19 : 16, ae = w && He(r.outdoorModel).source === "brine", ie = U ? Z + 5 : C || w ? 4 : 1, O = w ? ae ? E + 3 : E - 7 : C ? E - 7 : x ? 5 : 12;
  t.add("ou", "outdoor_unit", r.outdoorLabel || l("type.outdoor_unit"), ie, O, {
    model: r.outdoorModel,
    props: { nominal_kw: r.nominalKw }
  });
  const P = w ? re : C ? 44 : x ? 22 : b ? 14 : 16, F = w ? D - (i === "t180" ? 22 : i === "tp70" ? 16 : 14) : C ? D - 32 : x ? 27 : b ? 12 : 2;
  t.add("iu", "indoor_unit", r.indoorLabel || l("type.indoor_unit"), P, F, { model: r.indoorModel, props: g });
  const K = t.components.find((M) => M.id === "iu"), X = (M) => ye(K, M), ce = { y: O + 5 }, I = (M, z, R, N, H, B, T = !0, V = {}) => {
    const de = T ? 1 : -1, G = R + 2 * de, q = V.supSrcX ?? R + de, te = V.jogY ?? N - 2, xe = T ? R - 8 : R + 1, ge = E - 8, we = r.circuits[0];
    t.add("hc1", we.emitter, we.label || l("wz.circuit", { n: 1 }), xe, ge, { flip: T, props: { circuit: 1 } });
    let Oe = H;
    const fi = q === G ? [] : [[q, te], [G, te]];
    B ? (Oe = [{ c: "pc1", s: "running" }], t.add("pc1", "pump", "PC1", G - 1, V.pumpY ?? N - 10, { rot: 270, props: { role: "secondary", circuit: 1 } }), t.pipe(z, _("pc1", "in"), "supply", Oe, { via: fi }), t.pipe(_("pc1", "out"), _("hc1", "sup"), "supply", Oe, { via: [[G, ge + 1]] })) : t.pipe(z, _("hc1", "sup"), "supply", Oe, { via: [...fi, [G, ge + 1]] });
    let at = _("hc1", "ret"), Ve = [[R, ge + 5]];
    if (V.chainY !== void 0) {
      let xt = V.chainY;
      const gi = [];
      r.separator && gi.push(["sep", l("wz.separator_short"), {}], ["sc1", "SC1", { filter: !0 }]);
      for (const [ps, Xn, Jn] of gi)
        t.add(ps, "separator", Xn, R - 1, xt, { rot: 90, props: Jn }), t.pipe(at, _(ps, "in"), "return", Oe, { via: Ve }), at = _(ps, "out"), Ve = [], xt += 3;
      r.expansion && V.mag !== !1 && (t.add("jmag", "junction", "", R, xt + 1), t.add("mag", "expansion_vessel", "MAG", T ? R - 4 : R + 1, xt, { rot: T ? 270 : 90 }), t.pipe(_("mag", "conn"), _("jmag", T ? "l" : "r"), "return", []), t.pipe(at, _("jmag", "t"), "return", Oe, { via: Ve }), at = _("jmag", "b"), Ve = []);
    }
    V.retSrcX !== void 0 && V.retSrcX !== R && (Ve = [...Ve, [R, V.retJogY ?? N - 1], [V.retSrcX, V.retJogY ?? N - 1]]), t.pipe(at, M, "return", Oe, { via: Ve });
  }, le = (M, z, R, N, H) => {
    const B = { c: "tap", s: "flowing" }, T = { c: "circ", s: "running" }, V = N + R;
    if (t.add("tap", "tap", l("wz.shower"), N - 6, E - 9, { props: { variant: "shower" } }), t.add("inlet", "water_inlet", l("type.water_inlet"), H, z + 9, { flip: !0 }), t.pipe(_("inlet", "out"), _("dhw", "cold"), "dhw_cold", [B]), !r.circulation) {
      t.pipe(_("dhw", "hot"), _("tap", "hot"), "dhw_hot", [B], { via: [[N, z + 1], [N, E - 8]] });
      return;
    }
    t.add("jww", "junction", "", N, E - 7), t.pipe(_("dhw", "hot"), _("jww", "b"), "dhw_hot", [], { via: [[N, z + 1]], flowAny: [B, T] }), t.pipe(_("jww", "t"), _("tap", "hot"), "dhw_hot", [B], { via: [[N, E - 8]] }), t.add("circ", "pump", "PW2", V - 1, z + 2, { rot: 90, props: { role: "circulation" } }), t.pipe(_("jww", "r"), _("circ", "in"), "circulation", [T], { via: [[V, E - 7]] }), t.pipe(_("circ", "out"), _("dhw", "circ"), "circulation", [T], { via: [[V, z + 6]] });
  };
  if (w) {
    const M = F, z = (N) => X(N).x;
    U ? (t.pipe(_("ou", "out"), _("iu", "src_in"), "supply", [d], { via: [[ie + 10, O + 6], [ie + 10, W], [z("src_in"), W]] }), t.pipe(_("iu", "src_out"), _("ou", "in"), "return", [d], { via: [[z("src_out"), W + 1], [ie + 11, W + 1], [ie + 11, O + 5]] })) : ae ? (t.pipe(_("iu", "src_out"), _("ou", "in"), "return", [d], { via: [[z("src_out"), W], [Z - 3, W], [Z - 3, O + 5]] }), t.pipe(_("ou", "out"), _("iu", "src_in"), "supply", [d], { via: [[Z - 2, O + 6], [Z - 2, W + 1], [z("src_in"), W + 1]] })) : (t.pipe(_("iu", "src_out"), _("ou", "in"), "return", [d], { via: [[z("src_out"), W], [Z - 2, W], [Z - 2, O + 5]] }), t.pipe(_("ou", "out"), _("iu", "src_in"), "supply", [d], { via: [[Z - 3, O + 6], [Z - 3, W + 1], [z("src_in"), W + 1]] }));
    const R = E + 6;
    if (i === "tp70") {
      const N = { c: "iu", s: "pc1" };
      I(_("iu", "ret"), _("iu", "sup"), z("ret"), M, [N], !1, !1, { supSrcX: z("sup"), chainY: R, mag: !1 });
      const H = P + 20, B = D - 11;
      t.add("dhw", "dhw_tank", r.dhwLabel || l("type.dhw_tank"), H, B, { flip: !0, props: { volume: r.dhwVolume } }), t.pipe(_("iu", "dhw_sup"), _("dhw", "coil_in"), "supply", [d, m], { via: [[z("dhw_sup"), M - 2], [H - 1, M - 2], [H - 1, B + 4]] }), t.pipe(_("dhw", "coil_out"), _("iu", "dhw_ret"), "return", [d, m], { via: [[H - 2, B + 9], [H - 2, M - 1], [z("dhw_ret"), M - 1]] }), le(H, B, 1, H + 8, H + 10);
    } else if (i === "t180") {
      const N = { c: "tap", s: "flowing" }, H = { c: "circ", s: "running" }, B = { c: "iu", s: "pc1" };
      if (p) {
        const V = P - 20, de = D - 9, G = M - 6, q = M - 4, te = [d, ...h];
        t.add("buf", "buffer", r.bufferLabel || l("type.buffer"), V, de, { flip: !0, props: { volume: r.bufferVolume } }), t.pipe(_("iu", "sup"), _("buf", "in_sup"), "supply", te, { via: [[z("sup"), G], [V + 4, G]] });
        let xe = _("buf", "in_ret"), ge = [[V + 3, q]], we = V + 5;
        r.separator && (t.add("sep", "separator", l("wz.separator_short"), we, q - 1), t.add("sc1", "separator", "SC1", we + 3, q - 1, { props: { filter: !0 } }), t.pipe(xe, _("sep", "in"), "return", te, { via: ge }), t.pipe(_("sep", "out"), _("sc1", "in"), "return", te), xe = _("sc1", "out"), ge = [], we += 7), r.expansion && (t.add("jmag", "junction", "", we + 1, q), t.add("mag", "expansion_vessel", "MAG", we, q, { rot: 180 }), t.pipe(_("mag", "conn"), _("jmag", "b"), "return", []), t.pipe(xe, _("jmag", "l"), "return", te, { via: ge }), xe = _("jmag", "r"), ge = []), t.pipe(xe, _("iu", "ret"), "return", te, { via: [...ge, [z("ret"), q]] }), I(_("buf", "out_ret"), _("buf", "out_sup"), V + 2, de, [u], !0, !1, { supSrcX: V + 1 });
      } else
        I(_("iu", "ret"), _("iu", "sup"), z("ret") - 3, M, [B], !1, !0, {
          supSrcX: z("sup"),
          jogY: M - 2,
          retSrcX: z("ret"),
          retJogY: M - 1
        });
      const T = z("dhw_hot");
      t.add("tap", "tap", l("wz.shower"), T + 2, E - 9, { flip: !0, props: { variant: "shower" } }), r.circulation ? (t.add("jww", "junction", "", T, E - 5), t.pipe(_("iu", "dhw_hot"), _("jww", "b"), "dhw_hot", [], { flowAny: [N, H] }), t.pipe(_("jww", "t"), _("tap", "hot"), "dhw_hot", [N], { via: [[T, E - 8]] }), t.add("circ", "pump", "PW2", z("circ") - 1, p ? E + 1 : M - 8, { rot: 90, props: { role: "circulation" } }), t.pipe(_("jww", "l"), _("circ", "in"), "circulation", [H], { via: [[z("circ"), E - 5]] }), t.pipe(_("circ", "out"), _("iu", "circ"), "circulation", [H])) : t.pipe(_("iu", "dhw_hot"), _("tap", "hot"), "dhw_hot", [N], { via: [[T, E - 8]] }), t.add("inlet", "water_inlet", l("type.water_inlet"), Z - 4, M - 5, { flip: !0 }), t.pipe(_("inlet", "out"), _("iu", "dhw_cold"), "dhw_cold", [N], { via: [[z("dhw_cold"), M - 4]] });
    } else {
      const N = [d, ...h];
      let H = P + 14;
      if (p) {
        const B = P + 17, T = D - 9;
        t.add("buf", "buffer", r.bufferLabel || l("type.buffer"), B, T, { props: { volume: r.bufferVolume } }), t.pipe(_("iu", "sup"), _("buf", "in_sup"), "supply", N, { via: [[z("sup"), M - 1], [B + 1, M - 1]] }), t.pipe(_("buf", "in_ret"), _("iu", "ret"), "return", N, { via: [[B + 2, M - 2], [z("ret"), M - 2]] }), I(_("buf", "out_ret"), _("buf", "out_sup"), B + 3, T, [u], !0, !0, { chainY: R, pumpY: E + 2 }), H = B + 16;
      } else
        I(_("iu", "ret"), _("iu", "sup"), z("ret"), M + 1, N, !1, !0, { supSrcX: z("sup"), chainY: R, mag: !1 }), H = P + 20;
      if (a) {
        const B = H, T = D - 11;
        t.add("dhw", "dhw_tank", r.dhwLabel || l("type.dhw_tank"), B, T, { flip: !0, props: { volume: r.dhwVolume } }), t.pipe(_("iu", "dhw_sup"), _("dhw", "coil_in"), "supply", [d, m], { via: [[z("dhw_sup"), M - 4], [B - 1, M - 4], [B - 1, T + 4]] }), t.pipe(_("dhw", "coil_out"), _("iu", "dhw_ret"), "return", [d, m], { via: [[B - 2, T + 9], [B - 2, M - 3], [z("dhw_ret"), M - 3]] }), le(B, T, 1, B + 8, B + 10);
      }
    }
  } else if (C) {
    const M = F + 14, z = (V) => X(V).x;
    if (t.pipe(_("iu", "src_out"), _("ou", "in"), "return", [d], {
      via: [[z("src_out"), M + 4], [P - 2, M + 4], [P - 2, W], [Z - 2, W], [Z - 2, O + 5]]
    }), t.pipe(_("ou", "out"), _("iu", "src_in"), "supply", [d], {
      via: [[Z - 3, O + 6], [Z - 3, W + 1], [P - 3, W + 1], [P - 3, M + 5], [z("src_in"), M + 5]]
    }), a) {
      const V = P - 14, de = D - 11;
      t.add("dhw", "dhw_tank", r.dhwLabel || l("type.dhw_tank"), V, de, { props: { volume: r.dhwVolume } }), t.pipe(_("iu", "dhw_sup"), _("dhw", "coil_in"), "supply", [d, m], { via: [[z("dhw_sup"), de + 4]] }), t.pipe(_("dhw", "coil_out"), _("iu", "dhw_ret"), "return", [d, m], { via: [[z("dhw_ret"), de + 9]] });
      const G = { c: "tap", s: "flowing" }, q = { c: "circ", s: "running" }, te = V - 2;
      t.add("tap", "tap", l("wz.shower"), te - 6, E - 9, { props: { variant: "shower" } }), t.add("inlet", "water_inlet", l("type.water_inlet"), Z + 1, de + 9), t.pipe(_("inlet", "out"), _("dhw", "cold"), "dhw_cold", [G]), r.circulation ? (t.add("jww", "junction", "", te, E - 7), t.pipe(_("dhw", "hot"), _("jww", "b"), "dhw_hot", [], { via: [[te, de + 1]], flowAny: [G, q] }), t.pipe(_("jww", "t"), _("tap", "hot"), "dhw_hot", [G], { via: [[te, E - 8]] }), t.add("circ", "pump", "PW2", te - 2, de + 2, { rot: 90, props: { role: "circulation" } }), t.pipe(_("jww", "l"), _("circ", "in"), "circulation", [q], { via: [[te - 1, E - 7]] }), t.pipe(_("circ", "out"), _("dhw", "circ"), "circulation", [q], { via: [[te - 1, de + 6]] })) : t.pipe(_("dhw", "hot"), _("tap", "hot"), "dhw_hot", [G], { via: [[te, de + 1], [te, E - 8]] });
    }
    const R = P + 27, N = D - 9, H = M + 5, B = [d, ...h];
    t.add("buf", "buffer", r.bufferLabel || l("type.buffer"), R, N, { props: { volume: r.bufferVolume } }), t.pipe(_("iu", "sup"), _("buf", "in_sup"), "supply", B, { via: [[z("sup"), M + 3], [R + 1, M + 3]] });
    const T = [];
    r.separator && (t.add("sep", "separator", l("wz.separator_short"), z("sup") + 10, H - 1, { rot: 180 }), T.push({ inP: _("sep", "in"), outP: _("sep", "out") })), r.expansion && (t.add("jmag", "junction", "", z("sup") + 6, H), t.add("mag", "expansion_vessel", "MAG", z("sup") + 5, H + 1, { rot: 180 }), t.pipe(_("mag", "conn"), _("jmag", "b"), "return", []), T.push({ inP: _("jmag", "r"), outP: _("jmag", "l") })), r.separator && (t.add("sc1", "separator", "SC1", z("sup") + 2, H - 1, { rot: 180, props: { filter: !0 } }), T.push({ inP: _("sc1", "in"), outP: _("sc1", "out") }));
    for (let V = 0; V < T.length - 1; V++) t.pipe(T[V].outP, T[V + 1].inP, "return", B);
    T.length ? (t.pipe(T[T.length - 1].outP, _("iu", "ret"), "return", B, { via: [[z("ret"), H]] }), t.pipe(_("buf", "in_ret"), T[0].inP, "return", B, { via: [[R + 2, H]] })) : t.pipe(_("buf", "in_ret"), _("iu", "ret"), "return", B, { via: [[R + 2, H], [z("ret"), H]] }), I(_("buf", "out_ret"), _("buf", "out_sup"), R + 3, N, [u], !0);
  } else if (x) {
    const M = F, z = (q) => X(q).x, R = { c: "iu", s: "pc1" };
    t.pipe(_("iu", "src_out"), _("ou", "in"), "return", [d], { via: [[z("src_out"), O + 5]] }), t.pipe(_("ou", "out"), _("iu", "src_in"), "supply", [d], { via: [[z("src_in"), O + 6]] });
    const N = r.circuits[0] ?? { emitter: "radiators", label: "" }, H = 2, B = M - 8, T = M - 4;
    t.add("hc1", N.emitter, N.label || l("wz.circuit", { n: 1 }), H, B - 1, { flip: !0, props: { circuit: 1 } }), t.pipe(_("iu", "sup"), _("hc1", "sup"), "supply", [R], { via: [[z("sup"), B]] });
    let V = _("hc1", "ret"), de = [], G = H + 9;
    if (r.separator && (t.add("sep", "separator", l("wz.separator_short"), G, T - 1), t.add("sc1", "separator", "SC1", G + 3, T - 1, { props: { filter: !0 } }), t.pipe(V, _("sep", "in"), "return", [R]), t.pipe(_("sep", "out"), _("sc1", "in"), "return", [R]), V = _("sc1", "out"), G += 7), r.expansion && (t.add("jmag", "junction", "", G + 1, T), t.add("mag", "expansion_vessel", "MAG", G, T, { rot: 180 }), t.pipe(_("mag", "conn"), _("jmag", "b"), "return", []), t.pipe(V, _("jmag", "l"), "return", [R]), V = _("jmag", "r")), t.pipe(V, _("iu", "ret"), "return", [R], { via: [...de, [z("ret"), T]] }), a) {
      const q = P + 22, te = M + 2;
      t.add("dhw", "dhw_tank", r.dhwLabel || l("type.dhw_tank"), q, te, { props: { volume: r.dhwVolume } }), t.pipe(_("iu", "dhw_sup"), _("dhw", "coil_in"), "supply", [d, m], { via: [[z("dhw_sup"), M - 3], [q + 9, M - 3], [q + 9, te + 4]] }), t.pipe(_("dhw", "coil_out"), _("iu", "dhw_ret"), "return", [d, m], { via: [[q + 8, te + 9], [q + 8, M - 2], [z("dhw_ret"), M - 2]] }), kt(t, r, _("dhw", "hot"), _("dhw", "circ"), _("dhw", "cold"), q, te);
    }
  } else if (b) {
    const M = F, z = (G) => X(G).x, R = Math.max(...["src_in", "src_out", "sup", "ret", "dhw_sup", "dhw_ret", "dhw_hot", "dhw_cold", "circ"].filter((G) => ye(K, G)).map(z));
    t.pipe(_("ou", "out"), _("iu", "src_in"), "supply", [d], { via: [[12, ce.y], [12, M - 9], [z("src_in"), M - 9]] }), t.pipe(_("iu", "src_out"), _("ou", "in"), "return", [d], { via: [[z("src_out"), M - 10], [11, M - 10]] });
    let N = _("iu", "sup"), H = _("iu", "ret"), B = o ? [u] : [d, ...h], T = [[z("sup"), M - 2]];
    const V = M - 4;
    let de = R + 14;
    if (p) {
      const G = R + 2, q = G + 10, te = M + 4;
      t.add("buf", "buffer", r.bufferLabel || l("type.buffer"), q, te, { props: { volume: r.bufferVolume } }), t.pipe(_("iu", "sup"), _("buf", "in_sup"), "supply", [d, ...h], { via: [[z("sup"), M - 2], [q + 1, M - 2]] });
      const xe = [d, ...h];
      let ge = _("buf", "in_ret"), we = [[q + 2, V]];
      r.separator && (t.add("sep", "separator", l("wz.separator_short"), G + 6, V - 1, { rot: 180 }), t.add("sc1", "separator", "SC1", G + 3, V - 1, { rot: 180, props: { filter: !0 } }), t.pipe(ge, _("sep", "in"), "return", xe, { via: we }), t.pipe(_("sep", "out"), _("sc1", "in"), "return", xe), ge = _("sc1", "out"), we = []), r.expansion && (t.add("jmag", "junction", "", G, V), t.add("mag", "expansion_vessel", "MAG", G - 1, V - 5), t.pipe(_("mag", "conn"), _("jmag", "t"), "return", []), t.pipe(ge, _("jmag", "r"), "return", xe, { via: we }), ge = _("jmag", "l"), we = []), t.pipe(ge, _("iu", "ret"), "return", xe, { via: [...we, [z("ret"), V]] }), N = _("buf", "out_sup"), H = _("buf", "out_ret"), B = [u], T = [], de = q + 7;
    }
    if (_s(t, r, N, H, B, T, p || o, de, M + 4), n)
      kt(t, r, _("iu", "dhw_hot"), _("iu", "circ"), _("iu", "dhw_cold"), P - 1, M + 18);
    else if (a) {
      const G = P - 9, q = M + 8;
      t.add("dhw", "dhw_tank", r.dhwLabel || l("type.dhw_tank"), G, q, { props: { volume: r.dhwVolume } }), t.pipe(_("iu", "dhw_sup"), _("dhw", "coil_in"), "supply", [d, m], { via: [[z("dhw_sup"), M - 1], [G + 8, M - 1], [G + 8, q + 4]] }), t.pipe(_("dhw", "coil_out"), _("iu", "dhw_ret"), "return", [d, m], { via: [[G + 7, q + 9], [G + 7, M - 3], [z("dhw_ret"), M - 3]] }), kt(t, r, _("dhw", "hot"), _("dhw", "circ"), _("dhw", "cold"), G, q);
    }
  } else {
    const M = F + 14, z = (T) => X(T).x;
    t.pipe(_("iu", "src_out"), _("ou", "in"), "return", [d], { via: [[z("src_out"), M + 1]] }), t.pipe(_("ou", "out"), _("iu", "src_in"), "supply", [d], { via: [[z("src_in"), M + 2]] });
    const R = M + 6, N = [d, ...h], H = [];
    r.separator && (t.add("sep", "separator", l("wz.separator_short"), z("sup") + 9, R - 1, { rot: 180 }), H.push({ inP: _("sep", "in"), outP: _("sep", "out") })), r.expansion && (t.add("jmag", "junction", "", z("sup") + 6, R), t.add("mag", "expansion_vessel", "MAG", z("sup") + 5, R + 1, { rot: 180 }), t.pipe(_("mag", "conn"), _("jmag", "b"), "return", []), H.push({ inP: _("jmag", "r"), outP: _("jmag", "l") })), r.separator && (t.add("sc1", "separator", "SC1", z("sup") + 1, R - 1, { rot: 180, props: { filter: !0 } }), H.push({ inP: _("sc1", "in"), outP: _("sc1", "out") }));
    for (let T = 0; T < H.length - 1; T++) t.pipe(H[T].outP, H[T + 1].inP, "return", N);
    let B = _("iu", "ret");
    if (H.length && (t.pipe(H[H.length - 1].outP, _("iu", "ret"), "return", N, { via: [[z("ret"), R]] }), B = H[0].inP), p) {
      const T = P + 22, V = M + 8;
      t.add("buf", "buffer", r.bufferLabel || l("type.buffer"), T, V, { props: { volume: r.bufferVolume } }), t.pipe(_("iu", "sup"), _("buf", "in_sup"), "supply", [d, ...h], { via: [[z("sup"), M + 2], [T + 1, M + 2]] }), t.pipe(_("buf", "in_ret"), B, "return", [d, ...h], { via: [[T + 2, R]] }), _s(t, r, _("buf", "out_sup"), _("buf", "out_ret"), [u], [], !0, T + 8, V + 1);
    } else {
      const T = P + 25;
      _s(t, r, _("iu", "sup"), B, [d, ...h], [[z("sup"), M + 2], [T - 2, M + 2]], !1, T, M + 8, R);
    }
    if (a) {
      const T = z("dhw_sup") - 8, V = M + 6;
      t.add("dhw", "dhw_tank", r.dhwLabel || l("type.dhw_tank"), T, V, { props: { volume: r.dhwVolume } }), t.pipe(_("iu", "dhw_sup"), _("dhw", "coil_in"), "supply", [d, m], { via: [[z("dhw_sup"), V + 4]] }), t.pipe(_("dhw", "coil_out"), _("iu", "dhw_ret"), "return", [d, m], { via: [[z("dhw_ret"), V + 9]] }), kt(t, r, _("dhw", "hot"), _("dhw", "circ"), _("dhw", "cold"), T, V);
    }
  }
  const pe = Math.max(1, r.circuits.length), be = {
    version: 5,
    name: r.name,
    grid: w ? { w: U ? ie + 15 : i === "tp70" ? 70 : p ? 82 : 68, h: D + Y + 2 } : C ? { w: 80, h: D + Y + 2 } : x ? { w: 58, h: 49 } : { w: pe > 1 ? 76 : 66, h: Math.max(38, (b ? 46 : 38) + (pe - 1) * 10) },
    components: t.components,
    pipes: t.pipes,
    settings: e?.settings ?? { style: "flat", demo: !0 }
  };
  if (be.settings = { ...be.settings, wizard: r, layout_edited: !1, building: C || w ? { show: !0, floor: D + Y, wall: Z, slab: E, ground: E + 2, outside: U ? "right" : "left" } : void 0 }, e) {
    const M = new Map(e.components.map((H) => [H.id, H]));
    for (const H of be.components) {
      const B = M.get(H.id);
      B && B.type === H.type && (H.bindings = { ...B.bindings }, B.icon && (H.icon = B.icon), B.show && (H.show = B.show));
    }
    const z = be.components.find((H) => H.id === "iu"), R = M.get("pc0"), N = M.get("vw1");
    z && R?.bindings.running && (z.bindings.pc0_running ??= R.bindings.running), z && R?.bindings.speed && (z.bindings.pc0_speed ??= R.bindings.speed), z && N?.bindings.position && (z.bindings.vw1_position ??= N.bindings.position);
  }
  return be;
}
function _s(r, e, t, s, i, n, o, a, c, p) {
  Math.max(1, e.circuits.length);
  const d = [], h = { ...t };
  e.circuits.slice(0, 4).forEach((m, u) => {
    const g = u + 1, b = c - 9 + u * 10, v = g === 1 ? "pc1" : `hc${g}_pump`, w = `hc${g}_mix`, x = `hc${g}`;
    let k = a, C = null, D = null, E = i;
    (o || m.mixed) && (r.add(v, "pump", g === 1 ? "PC1" : `PC${g}`, k, b, { props: { role: m.mixed ? "hc" : "secondary", circuit: g } }), C = _(v, "in"), D = _(v, "out"), E = [{ c: v, s: "running" }], d.push(E[0]), k += 4), m.mixed && (r.add(w, "mixer", `VC${g}`, k, b, { props: { circuit: g } }), D ? r.pipe(D, _(w, "in"), "supply", E) : C = _(w, "in"), D = _(w, "out"), k += 3);
    const W = k + 3;
    r.add(x, m.emitter, m.label || l("wz.circuit", { n: g }), W, b - 2, { props: { circuit: g } }), D ? r.pipe(D, _(x, "sup"), "supply", E, { via: [[W - 2, b + 1], [W - 2, b - 1]] }) : C = _(x, "sup"), r.pipe(h, C, "supply", E, u === 0 ? { via: [...n, [a - 1 - u, b + 1]] } : { via: [[a - 1 - u, b + 1]] }), m.mixed ? (r.add(`hc${g}_jm`, "junction", "", k - 2, b + 3), r.pipe(_(x, "ret"), _(`hc${g}_jm`, "r"), "return", E, { via: [[k - 2, b + 3]] }), r.pipe(_(`hc${g}_jm`, "t"), _(w, "ret"), "return", E), r.pipe(_(`hc${g}_jm`, "l"), s, "return", E, { via: [[a - 2 - u, b + 3], ...p ? [[a - 2 - u, p]] : []] })) : r.pipe(_(x, "ret"), s, "return", E, { via: [[a - 2 - u, b + 3], ...p ? [[a - 2 - u, p]] : []] });
  });
}
function kt(r, e, t, s, i, n, o) {
  const a = { c: "tap", s: "flowing" }, c = { c: "circ", s: "running" };
  if (r.add("tap", "tap", l("type.tap"), n - 9, o), r.add("inlet", "water_inlet", l("type.water_inlet"), n - 9, o + 9), r.pipe(_("inlet", "out"), i, "dhw_cold", [a]), !e.circulation) {
    r.pipe(t, _("tap", "hot"), "dhw_hot", [a]);
    return;
  }
  r.add("jww", "junction", "", n - 3, o + 1), r.pipe(t, _("jww", "r"), "dhw_hot", [], { flowAny: [a, c] }), r.pipe(_("jww", "l"), _("tap", "hot"), "dhw_hot", [a]), r.add("circ", "pump", "PW2", n - 4, o + 3, { rot: 90, props: { role: "circulation" } }), r.pipe(_("jww", "b"), _("circ", "in"), "circulation", [c]), r.pipe(_("circ", "out"), s, "circulation", [c]);
}
function Ts() {
  const r = typeof location < "u" ? new URLSearchParams(location.search).get("indoor") : null, e = Ds();
  r && ot(r) && (e.indoorModel = r, e.indoorLabel = ot(r).label.replace(/^Logatherm /, "").split(" – ")[0]);
  const t = typeof location < "u" ? new URLSearchParams(location.search) : null;
  t?.get("buffer") === "none" && (e.buffer = "none"), t?.get("outdoor") && (e.outdoorModel = t.get("outdoor"));
  const s = ds(e);
  return typeof location < "u" && new URLSearchParams(location.search).get("style") === "iso" && (s.settings.style = "iso"), s;
}
const Ko = 4;
class On {
  /**
   * @param saveExample store the example plant when none exists yet (panel only;
   *   a card must never write configuration on its own)
   */
  constructor(e, t = !0) {
    this.host = e, this.saveExample = t, this.plant = null, this.icons = /* @__PURE__ */ new Map(), this.backendMessages = [], this.simMessages = [], this.sim = null, this.version = 0, this.error = "", this.admin = !0, this.backendVersion = "", this.rev = void 0, this._raf = 0, this._lastFrame = 0, this._accum = 0, this._boundIds = [], this._lastStates = [], this._loading = !1, this._connected = !1, e.addController(this);
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
  setHass(e) {
    this.hass = e;
    const t = e.themes?.darkMode ?? !0;
    this.host.toggleAttribute("light", !t), Ci(Ti(this.plant?.settings.language, e.language)), this.api ? this.api.setHass(e) : this._connected && this._init(), this.plant && !this.plant.settings.demo && this._checkStates();
  }
  _init() {
    this.api = new yo(this.hass), this._load();
  }
  // ----------------------------------------------------------------- data
  get messages() {
    return this.sim ? this.simMessages : this.backendMessages;
  }
  get src() {
    return this.sim ? new Hn(this.sim, this.hass) : new Pn(this.hass);
  }
  /** Re-render on hass updates only when a bound entity actually changed. */
  _checkStates() {
    if (!this.hass) return;
    const e = this._boundIds.map((t) => this.hass.states[t]);
    (e.length !== this._lastStates.length || e.some((t, s) => t !== this._lastStates[s])) && (this._lastStates = e, this.version++, this._changed());
  }
  _collectBound() {
    const e = /* @__PURE__ */ new Set();
    for (const s of this.plant?.components || [])
      Object.values(s.bindings || {}).forEach((i) => i && e.add(i)), (s.props.entries || []).forEach((i) => i.entity && e.add(i.entity));
    for (const s of this.plant?.pipes || []) s.bindings?.temp && e.add(s.bindings.temp);
    const t = this.plant?.settings.energy;
    if (t?.enabled)
      for (const s of ["pv", "grid", "battery", "battery_soc", "house", "wallbox"]) t[s] && e.add(t[s]);
    this._boundIds = [...e], this._lastStates = [];
  }
  async _load() {
    if (!(this._loading || !this.api)) {
      this._loading = !0;
      try {
        const e = await this.api.getConfig();
        this.admin = e.is_admin, this.backendVersion = e.version, this.rev = e.rev;
        let t = e.plant, s = !1;
        if (t ? (t.version ?? 1) < 5 && t.settings?.wizard && !t.settings.layout_edited && (t = ds(t.settings.wizard, t), s = !0) : (t = Ts(), s = !0), s && e.is_admin && this.saveExample)
          try {
            await this.save(t);
          } catch (i) {
            if (!Es(i)) throw i;
          }
        else
          this.setPlant(t, e.rev);
        await this.loadIcons(), this.api.standalone || (this._unsubCfg = await this.api.subscribeConfig((i, n) => this._onRemote(i, n)), this.backendMessages = await this.api.listMessages(), this._unsubMsg = await this.api.subscribeMessages((i) => this._mergeMessage(i)));
      } catch (e) {
        this.error = e?.message || String(e);
      } finally {
        this._loading = !1, this._changed();
      }
    }
  }
  async loadIcons() {
    const e = await this.api.listIcons();
    this.icons = new Map(e.map((t) => [t.id, t])), this._changed();
  }
  _mergeMessage(e) {
    const t = this.backendMessages.findIndex((i) => i.id === e.id), s = [...this.backendMessages];
    t >= 0 ? s[t] = e : s.push(e), this.backendMessages = s, this._changed();
  }
  /** A save from any window (or the current state after (re)subscribing). */
  _onRemote(e, t) {
    !e || this.rev !== void 0 && t <= this.rev || this._pending !== void 0 && JSON.stringify(e) === this._pending || this.setPlant(e, t);
  }
  setPlant(e, t) {
    t !== void 0 && (this.rev = t);
    const s = JSON.stringify(gs(this.plant));
    this.plant = e, Ci(Ti(e.settings.language, this.hass?.language)), this._collectBound(), e.settings.demo ? (!this.sim || JSON.stringify(gs(e)) !== s) && this._startSim() : (this._stopSim(), this._checkStates()), this.version++, this._changed();
  }
  /**
   * Save the plant. `rev` is the revision the change is based on (default: the one shown). When
   * another window saved in between, the newest plant is loaded and the conflict error rethrown.
   */
  async save(e, t = this.rev) {
    const s = this.api;
    this._pending = JSON.stringify(e);
    try {
      this.setPlant(e, await s.saveConfig(e, t));
    } catch (i) {
      throw Es(i) && await this.reload(), i;
    } finally {
      this._pending = void 0;
    }
  }
  /** Fetch the stored plant again (after a conflict). */
  async reload() {
    const e = await this.api.getConfig();
    e.plant && this.setPlant(e.plant, e.rev);
  }
  async clearMessages() {
    await this.api.clearMessages(), this.backendMessages = await this.api.listMessages(), this._changed();
  }
  // ------------------------------------------------------------------ sim
  _startSim() {
    this._stopSim();
    const e = this.plant?.components.find((i) => i.type === "dhw_tank"), t = new No(gs(this.plant), void 0, { dhw: e?.label || l("type.dhw_tank") });
    this.sim = t, this._unsubSim = t.onMessage(() => {
      this.simMessages = [...t.messages], this._changed();
    }), this.simMessages = [...t.messages], this._lastFrame = performance.now();
    const s = (i) => {
      const n = (i - this._lastFrame) / 1e3;
      this._lastFrame = i, document.hidden || (t.advance(n), this._accum += n, this._accum >= 1 / Ko && (this._accum = 0, this.version++, this._changed())), this._raf = requestAnimationFrame(s);
    };
    this._raf = requestAnimationFrame(s);
  }
  _stopSim() {
    this._raf && cancelAnimationFrame(this._raf), this._raf = 0, this._unsubSim?.(), this._unsubSim = void 0, this.sim && (this.sim = null, this.simMessages = [], this.api && !this.api.standalone && this.api.listMessages().then(
      (e) => {
        this.backendMessages = e, this._changed();
      },
      () => {
      }
    ));
  }
  scenario(e) {
    const t = this.sim;
    if (t) {
      switch (e) {
        case "winter":
          t.outdoorMean = -10, t.tOut = -10;
          break;
        case "transition":
          t.outdoorMean = 12, t.tOut = 12;
          break;
        case "shower":
          t.startDraw(8, 9);
          break;
        case "defrost":
          t.ice = 1.01, t.heatDemand = !0;
          break;
        case "dim14a":
          t.dim14a = !t.dim14a;
          break;
        case "pv":
          t.pv = !t.pv;
          break;
        case "disinfect":
          t.disinfect = !0;
          break;
        case "fault":
          t.fault = !t.fault;
          break;
        case "reset":
          this._startSim();
          return;
      }
      t.scenarioMessage(l(`scn.${e}`)), this.version++, this._changed();
    }
  }
}
const Vn = oe`
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
`, fe = oe`
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
`, Fo = {
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
function L(r) {
  return S`<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d=${Fo[r] || ""} /></svg>`;
}
const Ws = S`<svg viewBox="0 0 32 32" class="logo" aria-hidden="true">
  <defs><linearGradient id="cp-logo" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#38d0ff" /><stop offset="0.55" stop-color="#3ddc97" /><stop offset="1" stop-color="#ffb35c" />
  </linearGradient></defs>
  <rect x="2" y="6.2" width="28" height="19.6" rx="3.6" fill="none" stroke="url(#cp-logo)" stroke-width="2.4" />
  <path d="M16.6 11.2A6.4 6.4 0 1 0 16.6 20.8" fill="none" stroke="url(#cp-logo)" stroke-width="2.4" stroke-linecap="round" />
  <g transform="translate(12 16) scale(0.8)" fill="url(#cp-logo)">
    <path d="M0 0C-0.55-2.2 0.35-5.1 2.9-5.6C4.2-3.8 2.7-1.3 0 0Z" /><path d="M0 0C-0.55-2.2 0.35-5.1 2.9-5.6C4.2-3.8 2.7-1.3 0 0Z" transform="rotate(120)" /><path d="M0 0C-0.55-2.2 0.35-5.1 2.9-5.6C4.2-3.8 2.7-1.3 0 0Z" transform="rotate(240)" /><circle r="1.3" />
  </g>
  <path d="M21.6 11.6H26.4M21.6 14.5H26.4M21.6 17.5H26.4M21.6 20.4H26.4" stroke="url(#cp-logo)" stroke-width="1.7" stroke-linecap="round" />
</svg>`, Go = "M4.2 4.4H19.8A3.2 3.2 0 0 1 23 7.6V16.4A3.2 3.2 0 0 1 19.8 19.6H4.2A3.2 3.2 0 0 1 1 16.4V7.6A3.2 3.2 0 0 1 4.2 4.4ZM4.4 6.2A1.6 1.6 0 0 0 2.8 7.8V16.2A1.6 1.6 0 0 0 4.4 17.8H19.6A1.6 1.6 0 0 0 21.2 16.2V7.8A1.6 1.6 0 0 0 19.6 6.2ZM12.78 7.8A5.65 5.65 0 1 0 12.78 16.2A0.9 0.9 0 0 0 11.58 14.86A3.85 3.85 0 1 1 11.58 9.14A0.9 0.9 0 0 0 12.78 7.8ZM9 12C8.67 10.68 9.21 8.94 10.74 8.64C11.52 9.72 10.62 11.22 9 12ZM9 12C10.31 12.37 11.55 13.71 11.04 15.19C9.71 15.32 8.87 13.79 9 12ZM9 12C8.02 12.95 6.24 13.35 5.22 12.17C5.77 10.96 7.51 10.99 9 12ZM16.75 8.05H19.25A0.65 0.65 0 0 1 19.9 8.7V8.7A0.65 0.65 0 0 1 19.25 9.35H16.75A0.65 0.65 0 0 1 16.1 8.7V8.7A0.65 0.65 0 0 1 16.75 8.05ZM16.75 10.25H19.25A0.65 0.65 0 0 1 19.9 10.9V10.9A0.65 0.65 0 0 1 19.25 11.55H16.75A0.65 0.65 0 0 1 16.1 10.9V10.9A0.65 0.65 0 0 1 16.75 10.25ZM16.75 12.45H19.25A0.65 0.65 0 0 1 19.9 13.1V13.1A0.65 0.65 0 0 1 19.25 13.75H16.75A0.65 0.65 0 0 1 16.1 13.1V13.1A0.65 0.65 0 0 1 16.75 12.45ZM16.75 14.65H19.25A0.65 0.65 0 0 1 19.9 15.3V15.3A0.65 0.65 0 0 1 19.25 15.95H16.75A0.65 0.65 0 0 1 16.1 15.3V15.3A0.65 0.65 0 0 1 16.75 14.65Z", Ps = window;
Ps.customIcons = Ps.customIcons || {};
Ps.customIcons.copilot = {
  getIcon: async (r) => r === "logo" ? { path: Go, viewBox: "0 0 24 24" } : void 0,
  getIconList: async () => [{ name: "logo", keywords: ["copilot", "heat pump", "wärmepumpe"] }]
};
window.dispatchEvent(new Event("custom-icons-changed"));
const Ni = {
  heating: "#ff8a3d",
  hot_water: "#ff4f8b",
  defrost: "#6cc4ff",
  compressor_alarm: "#ff4d4d",
  cooling: "#38d0ff",
  off: "#8b949e"
};
function hi(r, e, t = 10, s = "casing") {
  return S`<rect class=${s} x="0" y="0" width=${r} height=${e} rx=${t} />
    <rect class="sheen" x="2" y="2" width=${r - 4} height=${Math.min(e * 0.35, 40)} rx=${t - 2} />`;
}
function Uo(r) {
  const { w: e, h: t, flags: s, c: i } = r, n = He(i.model);
  if (n.source === "brine") return Zo(r);
  const o = s.has("running") && !s.has("defrost"), a = s.has("defrost"), c = s.has("alarm"), p = e * 0.36, d = t * 0.5, h = Math.min(t * 0.38, e * 0.3), m = r.num("fan_speed") ?? (o ? 60 : 0), u = m <= 0 ? 0 : m < 45 ? 2.8 : m < 70 ? 2 : 1.5, g = c ? "#ff4d4d" : a ? "#6cc4ff" : o ? "#3ddc97" : "#5b6573", b = [0, 120, 240].map(
    (v) => S`<path transform="rotate(${v})" d="M0 0 C ${h * 0.18} ${-h * 0.25}, ${h * 0.55} ${-h * 0.35}, ${h * 0.82} ${-h * 0.12} C ${h * 0.6} ${h * 0.05}, ${h * 0.25} ${h * 0.08}, 0 0 Z" />`
  );
  return S`
    <rect class="foot" x=${e * 0.12} y=${t - 2} width=${e * 0.16} height="6" rx="2" />
    <rect class="foot" x=${e * 0.72} y=${t - 2} width=${e * 0.16} height="6" rx="2" />
    ${hi(e, t, 12)}
    <circle class="grille-bg" cx=${p} cy=${d} r=${h + 4} />
    <g transform="translate(${p} ${d})">
      <g class=${u ? "spin fan" : "fan"} style=${u ? `--dur:${u}s` : ""}>${b}<circle r=${h * 0.12} class="hub" /></g>
    </g>
    ${[0.45, 0.72, 1].map((v) => S`<circle class="grille" cx=${p} cy=${d} r=${h * v} />`)}
    <line class="grille" x1=${p - h} y1=${d} x2=${p + h} y2=${d} />
    <line class="grille" x1=${p} y1=${d - h} x2=${p} y2=${d + h} />
    ${[0, 1, 2, 3, 4, 5].map((v) => S`<rect class="vent" x=${e * 0.73} y=${t * 0.22 + v * t * 0.1} width=${e * 0.19} height="3" rx="1.5" />`)}
    <circle cx=${e * 0.9} cy=${t * 0.12} r="4" fill=${g} class=${o || a ? "pulse" : ""} />
    ${n.refrigerant ? S`<text class="tag" x=${e * 0.825} y=${t * 0.9} text-anchor="middle">${n.refrigerant}</text>` : ""}
    ${a ? S`<rect x="2" y="2" width=${e - 4} height=${t - 4} rx="10" class="frost" />
        <g class="pulse" transform="translate(${p} ${d})">${qo(h * 0.55)}</g>` : ""}
    ${c ? S`<rect x="1" y="1" width=${e - 2} height=${t - 2} rx="11" class="alarm-ring" />` : ""}
  `;
}
function Zo(r) {
  const { w: e, h: t, flags: s } = r, i = s.has("running");
  return S`
    ${hi(e, t * 0.55, 10)}
    <text class="tag" x=${e / 2} y=${t * 0.32} text-anchor="middle">SOLE</text>
    <rect class="ground" x="0" y=${t * 0.62} width=${e} height=${t * 0.38} rx="6" />
    ${[0.2, 0.4, 0.6, 0.8].map(
    (n) => S`<path class=${i ? "probe active" : "probe"} d="M${e * n - 6} ${t * 0.55} V ${t * 0.95} M${e * n + 6} ${t * 0.55} V ${t * 0.95} M${e * n - 6} ${t * 0.95} Q ${e * n} ${t} ${e * n + 6} ${t * 0.95}" />`
  )}
  `;
}
function qo(r) {
  const e = [0, 60, 120].map(
    (t) => S`<g transform="rotate(${t})"><line x1=${-r} y1="0" x2=${r} y2="0" />
      <path d="M${r * 0.6} 0 l ${r * 0.2} ${-r * 0.2} M${r * 0.6} 0 l ${r * 0.2} ${r * 0.2} M${-r * 0.6} 0 l ${-r * 0.2} ${-r * 0.2} M${-r * 0.6} 0 l ${-r * 0.2} ${r * 0.2}" /></g>`
  );
  return S`<g class="snow">${e}</g>`;
}
const A = 20;
function J(r, e, t) {
  const s = r.map(([i, n], o) => `${o ? "L" : "M"} ${i * A} ${n * A}`).join(" ");
  return S`<path class="ipipe" d=${s} style="stroke:${e}" />
    ${t ? S`<path class="ipipe-flow" d=${s} />` : y}`;
}
function dt([r, e], t, s = "l", i = "PC0") {
  const n = 0.55 * A, o = { r: 0, d: 90, l: 180, u: 270 }[s];
  return S`<g transform="translate(${r * A} ${e * A})">
    ${t ? S`<circle class="pump-glow pulse" r=${n + 4} />` : y}
    <circle class=${t ? "pump-body on" : "pump-body"} r=${n} />
    <path class=${t ? "pump-tri on" : "pump-tri"} transform="rotate(${o})" d="M ${-n * 0.5} ${-n * 0.8} L ${n} 0 L ${-n * 0.5} ${n * 0.8} Z" />
    <circle class=${t ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.36} />
    <text class="itag halo" y=${n + 9} text-anchor="middle">${i}</text>
  </g>`;
}
function St([r, e], t, s, i = "VW1", n = !1) {
  const o = 0.5 * A, a = (h) => {
    const [m, u] = { l: [-1, 0], r: [1, 0], u: [0, -1], d: [0, 1] }[h], g = m * o - u * o * 0.6, b = u * o + m * o * 0.6, v = m * o + u * o * 0.6, w = u * o - m * o * 0.6;
    return `M ${g} ${b} L 0 0 L ${v} ${w} Z`;
  }, [c, p, d] = s;
  return S`<g transform="translate(${r * A} ${e * A})">
    <path class="valve-tri on" d=${a(c)} />
    <path class=${t ? "valve-tri" : "valve-tri on"} d=${a(p)} />
    <path class=${t ? "valve-tri on" : "valve-tri"} d=${a(d)} />
    ${n ? S`<text class="itag" x=${-o - 3} y=${-o * 0.4} text-anchor="end">${i} ${t ? "B" : "A"}</text>` : S`<text class="itag" x=${o + 3} y=${-o} >${i} ${t ? "B" : "A"}</text>`}
  </g>`;
}
function Mt([r, e], t, s) {
  return S`<g transform="translate(${r * A} ${e * A})">
    ${s ? S`<rect class="aux-glow pulse" x=${-0.55 * A} y="-6" width=${1.1 * A} height=${t * A + 12} rx="10" />` : y}
    <rect class=${s ? "rod hot" : "rod"} x=${-0.35 * A} y="0" width=${0.7 * A} height=${t * A} rx="6" />
    <path class=${s ? "coil hot" : "coil"} d=${Yo(0, 6, t * A - 12, 4, 8)} />
  </g>`;
}
function Yo(r, e, t, s, i) {
  const n = t / i;
  let o = `M${r} ${e}`;
  for (let a = 1; a <= i; a++) o += ` L${r + (a % 2 ? -s : s)} ${e + a * n}`;
  return o;
}
function zt(r, e, t, s) {
  const i = [...r.flags].find((o) => o.startsWith("mode_"))?.slice(5), n = Ni[i || "off"] || Ni.off;
  return S`<rect class="screen" x=${e} y=${t} width=${s} height="18" rx="4" />
    <rect x=${e + 4} y=${t + 4} width="14" height="10" rx="2" fill=${n} class=${i && i !== "off" ? "pulse" : ""} />
    <text class="screen-text" x=${e + 24} y=${t + 13}>${i ? l(`mode.${i}`) : ""}</text>`;
}
function Xo(r, e) {
  const { w: t, h: s, flags: i, c: n } = r, o = i.has("running"), a = i.has("b"), c = i.has("aux"), p = i.has("pc1"), d = _e(r.num("supply_temp"), "#ff7a45"), h = _e(r.num("return_temp"), "#4d9fff"), m = (n.model || "").match(/w[ls]w\d{3}i/i)?.[0]?.toUpperCase().replace("I", "i") || "";
  let u;
  if (e === "t180") {
    const g = _e(r.num("dhw_temp"), "#ff4f8b");
    u = S`
      <rect class="tank-in" x=${0.6 * A} y=${10 * A} width=${6.8 * A} height=${11.2 * A} rx=${A} style="fill:${g}" />
      <path class=${o && a ? "tank-coil hot" : "tank-coil"} d=${Jo(2.4, 14, 5.6, 19.6)} />
      ${zt(r, 1.6 * A, 0.8 * A, 4.6 * A)}
      ${J([[6, 0], [6, 6.2], [4.6, 6.2]], d, o)}
      ${J([[4.6, 6.2], [3, 6.2], [3, 0]], d, o && !a)}
      ${J([[4.6, 6.2], [4.6, 14]], d, o && a)}
      ${J([[2.4, 19.6], [1.6, 19.6], [1.6, 7.6]], h, o && a)}
      ${J([[1, 0], [1, 7.6]], h, o && !a)}
      ${J([[1, 7.6], [7, 7.6], [7, 0]], h, o)}
      ${J([[4, 10.2], [4, 0]], g, i.has("flowing"))}
      ${J([[5, 0], [5, 3], [5.6, 3], [5.6, 20.6]], "#38d0ff", i.has("flowing"))}
      ${Mt([6, 1.4], 4, c)}
      ${St([4.6, 6.2], a, ["r", "l", "d"])}
      ${dt([4.2, 7.6], o, "r")}
      ${S`<g transform="translate(${3 * A} ${3.4 * A})"><circle class=${p ? "pump-body on" : "pump-body"} r="8" /><text class="itag" x="12" y="4">PC1</text></g>`}`;
  } else if (e === "tp70") {
    const g = _e(r.num("buffer_temp"), "#ff9f45");
    u = S`
      <rect class="tank-in" x=${0.6 * A} y=${9.4 * A} width=${7.8 * A} height=${4.2 * A} rx=${A} style="fill:${g}" />
      <text class="tank-label" x=${4.5 * A} y=${13 * A} text-anchor="middle">${n.props.buffer_l || 70} l</text>
      ${zt(r, 0.6 * A, 14.2 * A, 4.4 * A)}
      ${J([[3, 0], [3, 1.2]], g, !1)}
      ${J([[4, 0], [4, 1.2]], h, !1)}
      ${J([[2, 0], [2, 12.6]], h, p)}
      ${J([[1, 9.4], [1, 0]], g, p)}
      ${J([[6, 9.4], [6, 8]], h, o && !a)}
      ${J([[8, 0], [8, 8], [6, 8]], h, o && a)}
      ${J([[6, 8], [6, 0]], h, o)}
      ${J([[5, 0], [5, 6.4]], d, o)}
      ${J([[5, 6.4], [5, 9.4]], d, o && !a)}
      ${J([[5, 6.4], [7, 6.4], [7, 0]], d, o && a)}
      ${Mt([5, 1.6], 2.8, c)}
      ${St([5, 6.4], a, ["u", "d", "r"], "VW1", !0)}
      ${dt([6, 3.4], o, "u")}
      ${dt([1, 5], p, "u", "PC1")}`;
  } else e === "brine" ? u = S`
      ${zt(r, 1.6 * A, 0.8 * A, 4.6 * A)}
      <circle class="compressor" cx=${2.2 * A} cy=${8.5 * A} r=${1.2 * A} />
      <text class="itag" x=${2.2 * A} y=${10.4 * A} text-anchor="middle">Verdichter</text>
      ${J([[1, 0], [1, 6], [2.2, 6], [2.2, 7.3]], "#38d0ff", o)}
      ${J([[2.2, 9.7], [2.2, 11.5], [2, 11.5], [2, 0]], "#2b6cff", o)}
      ${J([[4, 9], [4, 4], [5.5, 4], [5.5, 9]], d, o)}
      ${J([[5.5, 9], [7, 9], [7, 0]], d, o && !a)}
      ${J([[5.5, 9], [5.5, 10.4], [4, 10.4], [4, 0]], d, o && a)}
      ${J([[6, 0], [6, 11.6], [4, 11.6], [4, 9]], h, o && !a)}
      ${J([[5, 0], [5, 3.4]], h, o && a)}
      ${Mt([4, 3], 3, c)}
      ${St([5.5, 9], a, ["u", "r", "d"])}
      ${dt([5.5, 11.6], o, "l")}` : u = S`
      ${zt(r, 2 * A, 0.8 * A, 6 * A)}
      ${J([[3, 14], [3, 9.6], [4.3, 9.6], [4.3, 2.8], [7.6, 2.8], [7.6, 10.6]], d, o)}
      ${J([[7.6, 10.6], [9, 10.6], [9, 14]], d, o && !a)}
      ${J([[7.6, 10.6], [7.6, 11.6], [5, 11.6], [5, 14]], d, o && a)}
      ${J([[8, 14], [8, 12.8], [6, 12.8]], h, o && !a)}
      ${J([[6, 14], [6, 12.8]], h, o && a)}
      ${J([[6, 12.8], [2, 12.8], [2, 14]], h, o)}
      ${Mt([4.3, 3.4], 5.4, c)}
      ${St([7.6, 10.6], a, ["u", "r", "d"])}
      ${dt([4.3, 12.8], o, "l")}`;
  return S`
    ${hi(t, s, 10, "casing light")}
    ${u}
    ${e === "wall_e" || e === "tp70" ? y : S`<text class="tag" x=${t / 2} y=${2.4 * A} text-anchor="middle">${m}</text>`}
  `;
}
function Jo(r, e, t, s) {
  const n = (s - e) / 5;
  let o = `M ${t * A} ${e * A - 2 * A}`;
  o += ` L ${t * A} ${e * A}`;
  for (let a = 0; a < 5; a++) {
    const c = (e + a * n) * A;
    o += ` C ${(r - 0.3) * A} ${c}, ${(r - 0.3) * A} ${c + n / 2 * A}, ${t * A} ${c + n / 2 * A}`, o += ` C ${(t + 0.3) * A} ${c + n / 2 * A}, ${(t + 0.3) * A} ${c + n * A}, ${r * A} ${c + n * A}`;
  }
  return o;
}
function Ii(r, e) {
  const { w: t, h: s, c: i, flags: n } = r, o = r.num("temp_top"), a = r.num("temp_bottom") ?? (o !== void 0 ? o - 6 : void 0), c = r.num("temp_mid") ?? (o !== void 0 && a !== void 0 ? (o + a) / 2 : void 0), p = `tg-${i.id}`, d = e === "dhw" ? "#ff4f8b" : "#ff7a45", h = n.has("charging"), m = i.props.volume ? `${i.props.volume} l` : "", u = Math.min(t / 2, 2 * A);
  return S`
    <defs>
      <linearGradient id=${p} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0.05" stop-color=${_e(o, d)} />
        <stop offset="0.5" stop-color=${_e(c, "#c084fc")} />
        <stop offset="0.95" stop-color=${_e(a, "#4d9fff")} />
      </linearGradient>
    </defs>
    <rect class="insulation" x="-3" y="-3" width=${t + 6} height=${s + 6} rx=${u + 3} />
    <rect x="0" y="0" width=${t} height=${s} rx=${u} fill="url(#${p})" class="tank-fill" />
    <rect class="tank-glass" x=${t * 0.1} y=${s * 0.06} width=${t * 0.12} height=${s * 0.88} rx=${t * 0.06} />
    ${e === "dhw" ? S`<path class=${h ? "tank-coil hot" : "tank-coil"} d=${Qo(t)} />
        <path class="dip" d="M 0 ${10 * A} H ${0.8 * A} V ${s - 0.4 * A}" />` : S`
        <path class="dip" d="M ${2 * A} 0 V ${s - 0.5 * A}" />
        <path class="dip" d="M ${3 * A} 0 V ${s - 0.5 * A}" />
        ${[0.3, 0.55, 0.8].map((g) => S`<line class="strat" x1=${t * 0.62} x2=${t * 0.9} y1=${s * g} y2=${s * g} />`)}`}
    <text class="tank-label" x=${t / 2} y=${s * (e === "dhw" ? 0.3 : 0.5)} text-anchor="middle">${m}</text>
    ${n.has("disinfecting") ? S`<text class="tank-badge" x=${t / 2} y=${s * 0.18} text-anchor="middle">60°</text>` : ""}
  `;
}
function Qo(r) {
  const e = r, t = r * 0.78, s = r * 0.3, i = 4 * A, n = 9 * A, o = 5, a = (n - i) / o;
  let c = `M ${e} ${i} H ${t}`;
  for (let p = 0; p < o; p++) {
    const d = i + p * a;
    c += ` C ${s - 6} ${d}, ${s - 6} ${d + a / 2}, ${t} ${d + a / 2} C ${t + 6} ${d + a / 2}, ${t + 6} ${d + a}, ${t} ${d + a}`;
  }
  return `${c} H ${e}`;
}
function er(r) {
  const { w: e, h: t, flags: s } = r, i = s.has("running"), n = Math.min(e, t) / 2 - 2, o = e / 2, a = t / 2;
  return S`
    ${i ? S`<circle class="pump-glow pulse" cx=${o} cy=${a} r=${n + 5} />` : ""}
    <circle class=${i ? "pump-body on" : "pump-body"} cx=${o} cy=${a} r=${n} />
    <path class=${i ? "pump-tri on" : "pump-tri"} d="M ${o - n * 0.5} ${a - n * 0.82} L ${o + n} ${a} L ${o - n * 0.5} ${a + n * 0.82} Z" />
    <g transform="translate(${o} ${a})">
      <circle class=${i ? "impeller spin" : "impeller"} style="--dur:0.9s" r=${n * 0.38} />
    </g>
  `;
}
function ji(r, e = !1) {
  const { w: t, h: s, flags: i } = r, n = t / 2, o = s / 2, a = Math.min(t, s) / 2 - 2, c = i.has("b"), p = (d) => e || d ? "valve-tri on" : "valve-tri";
  return S`
    <rect class="actuator" x=${n - a * 0.35} y=${o - a * 1.25} width=${a * 0.7} height=${a * 0.45} rx="2" />
    <line class="stem" x1=${n} y1=${o - a * 0.8} x2=${n} y2=${o} />
    <path class=${p(!0)} d="M ${n - a} ${o - a * 0.6} L ${n} ${o} L ${n - a} ${o + a * 0.6} Z" />
    <path class=${p(!c)} d="M ${n + a} ${o - a * 0.6} L ${n} ${o} L ${n + a} ${o + a * 0.6} Z" />
    <path class=${p(c)} d="M ${n - a * 0.6} ${o + a} L ${n} ${o} L ${n + a * 0.6} ${o + a} Z" />
    ${e ? "" : S`<text class="valve-tag" x=${n + a * 0.5} y=${o - a * 0.75}>${c ? "B" : "A"}</text>`}
  `;
}
function tr(r) {
  const { w: e, h: t } = r, s = r.num("flow_temp"), i = r.num("return_temp"), n = r.num("room_temp"), o = s !== void 0 && n !== void 0 ? s - n > 6 : !1, a = 9, c = 0.45 * A, p = t - 0.45 * A, d = (e - 20) / a, h = `rg-${r.c.id}`;
  return S`
    <defs><linearGradient id=${h} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color=${_e(s, "#8b949e")} stop-opacity=${o ? 0.85 : 0.25} />
      <stop offset="1" stop-color=${_e(i, "#8b949e")} stop-opacity=${o ? 0.6 : 0.2} />
    </linearGradient></defs>
    ${o ? [0.3, 0.55, 0.8].map(
    (m, u) => S`<path class="heat-wave" style="animation-delay:${u * 0.6}s" d="M ${e * m} ${c - 4} q 5 -6 0 -12 q -5 -6 0 -12" />`
  ) : ""}
    ${r.c.props?.variant === "bottom" ? S`<line class="rad-stub" x1=${4 * A} x2=${4 * A} y1=${p - 2} y2=${t} /><line class="rad-stub" x1=${6 * A} x2=${6 * A} y1=${p - 2} y2=${t} />` : ""}
    <rect class="rad-frame" x="0" y=${c} width=${e - 4} height=${p - c} rx="6" />
    <rect class="rad-header" x="0" y=${A - 4} width=${e - 4} height="8" rx="4" />
    <rect class="rad-header" x="0" y=${5 * A - 4} width=${e - 4} height="8" rx="4" />
    ${Array.from({ length: a }, (m, u) => S`<rect x=${12 + u * d} y=${c + 6} width=${d - 3} height=${p - c - 12} rx=${(d - 3) / 2} fill="url(#${h})" class="fin" />`)}
  `;
}
function sr(r) {
  const { w: e, h: t } = r, s = r.num("flow_temp"), i = _e(s, "#8b949e");
  let n = `M 10 ${t * 0.25}`;
  const o = 5;
  for (let a = 0; a < o; a++)
    n += a % 2 === 0 ? ` H ${e - 12} q 6 0 6 ${t * 0.3 / o} q 0 ${t * 0.3 / o} -6 ${t * 0.3 / o}` : ` H 16 q -6 0 -6 ${t * 0.3 / o} q 0 ${t * 0.3 / o} 6 ${t * 0.3 / o}`;
  return S`
    <rect class="floor-slab" x="2" y=${t * 0.15} width=${e - 4} height=${t * 0.75} rx="6" />
    <path d=${n} fill="none" stroke=${i} stroke-width="3" stroke-linecap="round" opacity="0.9" />
  `;
}
function ir(r) {
  const { w: e, flags: t } = r, s = t.has("flowing"), i = 1.3 * A, n = 1.6 * A;
  return S`
    <path class="tap-body" d="M ${e} ${A - 3} H ${i + 6} v 6 H ${e} Z" />
    <path class="tap-body" d="M ${i + 4} ${A - 3} v ${n - A - 3} h -4 v ${-9} Z" />
    <path class="tap-handle" d="M ${i - 16} ${n + 4} L ${i - 10} ${n - 5} H ${i + 14} L ${i + 20} ${n + 4} Z" />
    ${[0, 1, 2, 3, 4].map((o) => {
    const a = i - 12 + o * 7;
    return s ? S`<line class="shower-jet" style="animation-delay:${o % 3 * 0.18}s" x1=${a} y1=${n + 8} x2=${a + (o - 2) * 3} y2=${n + 2.8 * A} />` : S`<circle class="shower-hole" cx=${a} cy=${n + 6} r="1.4" />`;
  })}
  `;
}
function nr(r) {
  if (r.c.props?.variant === "shower") return ir(r);
  const { w: e, h: t, flags: s } = r, i = s.has("flowing");
  return S`
    <path class="tap-body" d="M ${e} ${t * 0.25} H ${e * 0.45} a ${e * 0.25} ${e * 0.25} 0 0 0 ${-e * 0.25} ${e * 0.25} V ${t * 0.62} h ${e * 0.16} V ${t * 0.52} a ${e * 0.1} ${e * 0.1} 0 0 1 ${e * 0.1} ${-e * 0.1} H ${e} Z" />
    <rect class="tap-handle" x=${e * 0.46} y=${t * 0.06} width=${e * 0.26} height=${t * 0.12} rx="3" />
    ${i ? [0, 1, 2].map((n) => S`<circle class="drop" style="animation-delay:${n * 0.25}s" cx=${e * 0.28} cy=${t * 0.7} r="2.5" />`) : ""}
  `;
}
function or(r) {
  const { w: e, h: t } = r;
  return S`
    <rect class="casing" x="0" y=${t * 0.2} width=${e} height=${t * 0.6} rx="5" />
    <text class="tag" x=${e * 0.45} y=${t * 0.62} text-anchor="middle">KW</text>
  `;
}
function rr(r) {
  const { w: e, h: t, c: s } = r;
  return s.props.filter ? S`
      <rect class="casing" x=${e * 0.15} y=${t * 0.1} width=${e * 0.7} height=${t * 0.8} rx="5" />
      ${[0.3, 0.45, 0.6, 0.75].map((i) => S`<line class="sieve" x1=${e * 0.25} x2=${e * 0.75} y1=${t * i} y2=${t * i} />`)}
      ${[0.35, 0.5, 0.65].map((i) => S`<line class="sieve" x1=${e * i} x2=${e * i} y1=${t * 0.22} y2=${t * 0.8} />`)}` : S`
    <rect class="casing" x=${e * 0.2} y="0" width=${e * 0.6} height=${t} rx=${e * 0.3} />
    <path class="magnet" d="M ${e * 0.38} ${t * 0.3} v ${t * 0.25} a ${e * 0.12} ${e * 0.12} 0 0 0 ${e * 0.24} 0 v ${-t * 0.25}" />
  `;
}
function ar(r) {
  const { w: e, h: t } = r;
  return S`
    <line class="stem" x1=${e / 2} y1=${t * 0.8} x2=${e / 2} y2=${t} />
    <rect class="vessel" x="0" y="0" width=${e} height=${t * 0.82} rx=${e / 2} />
    <rect class="sheen" x=${e * 0.18} y=${t * 0.08} width=${e * 0.2} height=${t * 0.6} rx=${e * 0.1} />
  `;
}
function lr(r) {
  switch (r.c.type) {
    case "outdoor_unit":
      return Uo(r);
    case "indoor_unit":
      return Xo(r, Le(r.c)?.id || "wall_e");
    case "buffer":
      return Ii(r, "buffer");
    case "dhw_tank":
      return Ii(r, "dhw");
    case "pump":
      return er(r);
    case "valve_3way":
      return ji(r);
    case "mixer":
      return ji(r, !0);
    case "radiators":
      return tr(r);
    case "floor_heating":
      return sr(r);
    case "tap":
      return nr(r);
    case "water_inlet":
      return or(r);
    case "separator":
      return rr(r);
    case "expansion_vessel":
      return ar(r);
    case "junction":
      return S`<circle class="junction" r="4" />`;
    default:
      return S``;
  }
}
const Ki = 1, At = { l: { x: -1, y: 0 }, r: { x: 1, y: 0 }, t: { x: 0, y: -1 }, b: { x: 0, y: 1 } };
function bs(r) {
  return r === "l" || r === "r";
}
function Bn(r, e) {
  const t = e.get(r.from.c), s = e.get(r.to.c);
  if (!t || !s) return null;
  const i = ye(t, r.from.p), n = ye(s, r.to.p);
  if (!i || !n) return null;
  const o = t.type === "junction" ? 0 : Ki, a = s.type === "junction" ? 0 : Ki, c = { x: i.x, y: i.y }, p = { x: n.x, y: n.y }, d = { x: c.x + At[i.dir].x * o, y: c.y + At[i.dir].y * o }, h = { x: p.x + At[n.dir].x * a, y: p.y + At[n.dir].y * a }, m = bs(i.dir), u = [c, d];
  if (r.via?.length) {
    let g = !m;
    for (const [b, v] of [...r.via, [h.x, h.y]]) {
      const w = u[u.length - 1];
      if (w.x !== b && w.y !== v) {
        const k = g ? { x: w.x, y: v } : { x: b, y: w.y };
        u.push(k);
      }
      g = u[u.length - 1].x === b, u.push({ x: b, y: v });
    }
    return u.push(p), { pts: Fi(u), horizontalStart: m };
  }
  if (m)
    if (d.y === h.y && r.bend === void 0)
      u.push(h);
    else {
      const g = r.bend ?? (d.x + h.x) / 2;
      bs(n.dir) ? u.push({ x: g, y: d.y }, { x: g, y: h.y }) : r.bend === void 0 ? u.push({ x: h.x, y: d.y }) : u.push({ x: g, y: d.y }, { x: g, y: h.y }), u.push(h);
    }
  else if (d.x === h.x && r.bend === void 0)
    u.push(h);
  else {
    const g = r.bend ?? (d.y + h.y) / 2;
    bs(n.dir) ? r.bend === void 0 ? u.push({ x: d.x, y: h.y }) : u.push({ x: d.x, y: g }, { x: h.x, y: g }) : u.push({ x: d.x, y: g }, { x: h.x, y: g }), u.push(h);
  }
  return u.push(p), { pts: Fi(u), horizontalStart: m };
}
function Fi(r) {
  const e = [];
  for (const t of r) {
    const s = e[e.length - 1];
    if (!(s && s.x === t.x && s.y === t.y)) {
      if (e.length >= 2) {
        const i = e[e.length - 2];
        if (i.x === s.x && s.x === t.x || i.y === s.y && s.y === t.y) {
          e[e.length - 1] = t;
          continue;
        }
      }
      e.push(t);
    }
  }
  return e;
}
function cr(r, e = 8) {
  if (r.length === 0) return "";
  const t = r.map((n) => ({ x: n.x * $, y: n.y * $ }));
  let s = `M ${t[0].x} ${t[0].y}`;
  for (let n = 1; n < t.length - 1; n++) {
    const o = t[n - 1], a = t[n], c = t[n + 1], p = Math.hypot(a.x - o.x, a.y - o.y), d = Math.hypot(c.x - a.x, c.y - a.y), h = Math.min(e, p / 2, d / 2), m = a.x - (a.x - o.x) / p * h, u = a.y - (a.y - o.y) / p * h, g = a.x + (c.x - a.x) / d * h, b = a.y + (c.y - a.y) / d * h;
    s += ` L ${m} ${u} Q ${a.x} ${a.y} ${g} ${b}`;
  }
  const i = t[t.length - 1];
  return `${s} L ${i.x} ${i.y}`;
}
const Se = 18, dr = 16, pr = 10, ws = 8;
function hr(r, e, t) {
  if (r.icon) return null;
  switch (r.type) {
    case "outdoor_unit":
      return He(r.model).source === "brine" ? { x: 0, y: 0, w: e, h: t * 0.55, r: 10 } : { x: 0, y: 0, w: e, h: t, r: 12 };
    case "indoor_unit":
      return { x: 0, y: 0, w: e, h: t, r: 10 };
    case "buffer":
    case "dhw_tank": {
      const s = Math.min(e / 2, 2 * $);
      return { x: -3, y: -3, w: e + 6, h: t + 6, r: s + 3 };
    }
    case "pump": {
      const s = Math.min(e, t) / 2 - 2;
      return { x: e / 2 - s, y: t / 2 - s, w: 2 * s, h: 2 * s, r: s };
    }
    case "radiators":
      return { x: 0, y: 0.45 * $, w: e - 4, h: t - 0.9 * $, r: 6 };
    case "floor_heating":
      return { x: 2, y: t * 0.15, w: e - 4, h: t * 0.75, r: 6 };
    case "water_inlet":
      return { x: 0, y: t * 0.2, w: e, h: t * 0.6, r: 5 };
    case "separator":
      return r.props.filter ? { x: e * 0.15, y: t * 0.1, w: e * 0.7, h: t * 0.8, r: 5 } : { x: e * 0.2, y: 0, w: e * 0.6, h: t, r: e * 0.3 };
    case "expansion_vessel":
      return { x: 0, y: 0, w: e, h: t * 0.82, r: e / 2 };
    case "value_tile":
      return { x: 0, y: 0, w: e, h: t, r: 10 };
    default:
      return null;
  }
}
const ue = 88, me = 34, he = 6;
function vs(r, e = 17) {
  return r.length > e ? `${r.slice(0, e - 1)}…` : r;
}
const It = class It extends se {
  constructor() {
    super(...arguments), this.gridStep = 1, this.showGrid = !1, this.snapGrid = !0, this.snapObjects = !0, this._guides = {}, this.icons = /* @__PURE__ */ new Map(), this.edit = !1, this.autoHeight = !1, this.selected = null, this.version = 0, this._view = null, this._drag = null, this._valueDrag = null, this._connect = null, this._pointers = /* @__PURE__ */ new Map(), this._gesture = null, this._segments = [], this._pills = [], this._lastMoved = !1, this._structureKey = "", this._onKey = (e) => {
      e.key === "Escape" && this._connect && (this._connect = null);
    };
  }
  /** Does any pipe pass through the given pixel rectangle (with a small margin)? */
  _hitsPipe(e, t, s, i) {
    return this._segments.some((o) => o.x1 <= s + 5 && o.x2 >= e - 5 && o.y1 <= i + 5 && o.y2 >= t - 5);
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObs = new ResizeObserver(() => this.requestUpdate()), this._resizeObs.observe(this), window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObs?.disconnect(), window.removeEventListener("keydown", this._onKey);
  }
  willUpdate(e) {
    if (e.has("plant") && this.plant) {
      const t = `${this.plant.components.length}:${this.plant.grid.w}x${this.plant.grid.h}`;
      (t !== this._structureKey || !this._view) && (this._structureKey = t, (!this.edit || !this._view) && (this._view = null));
    }
  }
  updated() {
    if (!this.autoHeight) {
      this.style.height && (this.style.height = "");
      return;
    }
    if (!this.plant) return;
    const e = this._contentBox(), t = this.getBoundingClientRect().width;
    if (t <= 0) return;
    const s = Math.round(Math.max(240, Math.min(window.innerHeight * 0.75, t * e.h / e.w)));
    this.style.height !== `${s}px` && (this.style.height = `${s}px`);
  }
  /** Fit view to content. */
  fit() {
    this._view = null, this.requestUpdate();
  }
  zoom(e) {
    const t = this._view || this._contentBox(), s = t.x + t.w / 2, i = t.y + t.h / 2;
    this._view = { x: s - t.w * e / 2, y: i - t.h * e / 2, w: t.w * e, h: t.h * e };
  }
  // ------------------------------------------------------------- layout
  _comp(e) {
    return this._drag && this._drag.id === e.id ? { ...e, x: this._drag.dx, y: this._drag.dy } : e;
  }
  _shownSlots(e) {
    return (e.show ?? Ae(e).filter((s) => s.show).map((s) => s.key)).filter((s) => this.src.get(e, s) !== void 0 || this.edit && !!e.bindings?.[s]);
  }
  /** Slots shown in the component's value list (not anchored to a pipe or a measuring point). */
  _listSlots(e) {
    const t = new Set(ms(e).filter((s) => s.at || s.pos).map((s) => s.key));
    return this._shownSlots(e).filter((s) => !t.has(s));
  }
  /** Position of a value field: dragged, moved in the editor, or the automatic one. */
  _valueAt(e, t, s, i) {
    const n = this._valueDrag;
    if (n && n.id === e.id && n.slot === t) return { x: n.x, y: n.y };
    const o = e.valuePos?.[t];
    return o ? { x: (e.x + o[0]) * $, y: (e.y + o[1]) * $ } : { x: s, y: i };
  }
  _badgeLayout(e) {
    return this._autoBadges(e).map((t) => ({ ...t, ...this._valueAt(e, t.slot, t.x, t.y) }));
  }
  _autoBadges(e) {
    const t = Li(e);
    if (t === "none" || t === "inside") return [];
    const s = this._listSlots(e);
    if (!s.length) return [];
    const { w: i, h: n } = ve(e), o = e.x * $, a = e.y * $, c = i * $, p = n * $, d = [];
    if (t === "tank") {
      const h = { temp_top: 0.16, temp_mid: 0.48, temp_bottom: 0.8 }, m = [];
      for (const w of s)
        w in h ? d.push({ slot: w, x: o + 5, y: a + p * h[w] - 11, w: c - 10 }) : m.push(w);
      const g = m.length * (me + he), b = [
        { x: o + c / 2 - ue / 2, y: a + p + 26, dy: me + he },
        { x: o + c + 12, y: a + p * 0.35, dy: me + he },
        { x: o - 12 - ue, y: a + p * 0.35, dy: me + he }
      ], v = b.find((w) => !this._hitsPipe(w.x, w.y, w.x + ue, w.y + g)) || b[0];
      return m.forEach((w, x) => d.push({ slot: w, x: v.x, y: v.y + x * v.dy })), d;
    }
    if (t === "right")
      s.forEach((h, m) => d.push({ slot: h, x: o + c + 12, y: a + 4 + m * (me + he) }));
    else if (t === "left")
      s.forEach((h, m) => d.push({ slot: h, x: o - 12 - ue, y: a + 4 + m * (me + he) }));
    else if (t === "above" && (e.rot === 90 || e.rot === 270) && s.length <= 2) {
      const h = s.length * (me + he) - he, m = a + p - 6 - h, u = o + c + 10, g = o - 10 - ue, b = !this._hitsPipe(u, m, u + ue, m + h) || this._hitsPipe(g, m, g + ue, m + h) ? u : g;
      s.forEach((v, w) => d.push({ slot: v, x: b, y: m + w * (me + he) }));
    } else if (t === "above") {
      const h = Ae(e).map((g) => g.key);
      s.sort((g, b) => h.indexOf(g) - h.indexOf(b));
      const m = Math.min(3, s.length) * (ue + he) - he, u = o + c / 2 - m / 2;
      s.forEach(
        (g, b) => d.push({ slot: g, x: u + b % 3 * (ue + he), y: a - me - 10 - Math.floor(b / 3) * (me + he) })
      );
    } else {
      const h = Math.max(2, Math.floor((c + 40) / (ue + he))), m = Math.ceil(s.length / h);
      s.forEach((u, g) => {
        const b = Math.floor(g / h), w = (b === m - 1 ? s.length - b * h : h) * (ue + he) - he;
        d.push({
          slot: u,
          x: o + c / 2 - w / 2 + g % h * (ue + he),
          y: a + p + 26 + b * (me + he)
        });
      });
    }
    return d;
  }
  _contentBox() {
    let e = 1 / 0, t = 1 / 0, s = -1 / 0, i = -1 / 0;
    const n = (a, c) => {
      e = Math.min(e, a), t = Math.min(t, c), s = Math.max(s, a), i = Math.max(i, c);
    };
    for (const a of this.plant.components) {
      const { w: c, h: p } = ve(a);
      n(a.x * $ - 6, a.y * $ - 6), n((a.x + c) * $ + 6, (a.y + p) * $ + 22), a.label && Re(a).some((d) => ye(a, d.id)?.dir === "b") && n((a.x + c) * $ + 12 + Math.min(28, a.label.length) * 7.5, (a.y + p) * $);
      for (const d of this._badgeLayout(a))
        n(d.x, d.y), n(d.x + ue, d.y + me);
    }
    for (const a of this._pills)
      n(a.x, a.y), n(a.x + a.w, a.y + Se);
    (this.edit || !Number.isFinite(e)) && (n(0, 0), n(this.plant.grid.w * $, this.plant.grid.h * $));
    const o = 24;
    return { x: e - o, y: t - o, w: s - e + 2 * o, h: i - t + 2 * o };
  }
  // -------------------------------------------------------------- render
  render() {
    if (!this.plant) return y;
    const e = this._view || this._contentBox(), t = new Map(this.plant.components.map((o) => [o.id, this._comp(o)])), s = new Map(this.plant.components.map((o) => [o.id, ke(o, this.src)])), i = Wo(this.plant, this.src), n = this.plant.pipes.map((o) => ({ pipe: o, route: Bn(o, t) }));
    return this._segments = n.flatMap(
      ({ route: o }) => (o?.pts || []).slice(1).map((a, c) => {
        const p = o.pts[c];
        return { x1: Math.min(p.x, a.x) * $, x2: Math.max(p.x, a.x) * $, y1: Math.min(p.y, a.y) * $, y2: Math.max(p.y, a.y) * $ };
      })
    ), this._pills = this._placePills(t, n), f`
      <svg
        class=${this.edit ? "edit" : ""}
        viewBox="${e.x} ${e.y} ${e.w} ${e.h}"
        preserveAspectRatio="xMidYMid meet"
        @pointerdown=${this._onBgDown}
        @pointermove=${this._onMove}
        @pointerup=${this._onUp}
        @pointercancel=${this._onUp}
        @wheel=${this._onWheel}
      >
        ${this._building(e)}
        ${this._iso && !this.edit ? this._isoFloor(e) : y}
        ${this.edit ? this._grid() : y}
        ${this._iso ? this._isoLayer() : y}
        <g class="pipes ${this._iso ? "iso" : ""}">
          ${n.map(({ pipe: o, route: a }) => {
      if (!a) return y;
      const c = cr(a.pts), p = To(o, s), d = Lo(o.kind, i.get(o.id)), h = this.selected?.kind === "p" && this.selected.id === o.id;
      return S`<g class="pipe ${p ? "active" : ""} ${h ? "selected" : ""}" data-pipe=${o.id}
                @pointerdown=${(m) => this._onPipeDown(m, o.id)}>
              <path class="pipe-hit" d=${c} />
              ${h ? S`<path class="pipe-sel" d=${c} />` : y}
              <path class="pipe-outline" d=${c} />
              ${this._iso ? S`<path class="pipe-depth" d=${c} style="stroke:${d}" />` : y}
              ${p ? S`<path class="pipe-halo" d=${c} style="stroke:${d}" />` : y}
              <path class="pipe-base" d=${c} style="stroke:${d}" />
              ${this._iso ? S`<path class="pipe-gloss" d=${c} />` : y}
              ${p ? S`<path class="pipe-flow" d=${c} />` : y}
            </g>`;
    })}
        </g>
        <g class="components">
          ${this.plant.components.map((o) => this._component(t.get(o.id), s.get(o.id)))}
        </g>
        <g class="pills">${this._pills.map((o) => this._anchorPill(o))}</g>
        ${this.edit ? this._editOverlays(t, n) : y}
        ${this.edit ? this._guideLines() : y}
      </svg>
    `;
  }
  _grid() {
    const { w: e, h: t } = this.plant.grid;
    if (!this.showGrid)
      return S`
        <defs><pattern id="cp-grid" width=${$} height=${$} patternUnits="userSpaceOnUse">
          <circle cx="0" cy="0" r="1" class="grid-dot" />
        </pattern></defs>
        <rect class="grid-bg" x="0" y="0" width=${e * $} height=${t * $} fill="url(#cp-grid)" />`;
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
      <rect class="grid-bg" x="0" y="0" width=${e * $} height=${t * $} fill="url(#cp-grid-major)" />`;
  }
  /** Alignment guides of the object snap while dragging. */
  _guideLines() {
    const { x: e, y: t } = this._guides;
    if (e === void 0 && t === void 0) return y;
    const { w: s, h: i } = this.plant.grid;
    return S`<g class="guides">
      ${e !== void 0 ? S`<line x1=${e * $} x2=${e * $} y1="0" y2=${i * $} />` : y}
      ${t !== void 0 ? S`<line x1="0" x2=${s * $} y1=${t * $} y2=${t * $} />` : y}
    </g>`;
  }
  get _iso() {
    return this.plant?.settings?.style === "iso";
  }
  /** Body outline of a component in schematic px, honouring rotation and mirroring. */
  _isoBox(e) {
    const t = { ...ne[e.type], ...Fe(e) }, { w: s, h: i } = ve(e), n = (e.type === "value_tile" ? s : t.w) * $, o = (e.type === "value_tile" ? i : t.h) * $, a = hr(e, n, o);
    if (!a) return null;
    let { x: c, y: p, w: d, h } = a;
    e.flip && t.mirrorable && (c = n - (c + d));
    const m = t.rotatable && e.rot || 0;
    return m === 90 ? [c, p, d, h] = [o - (p + h), c, h, d] : m === 180 ? [c, p] = [n - (c + d), o - (p + h)] : m === 270 && ([c, p, d, h] = [p, n - (c + d), h, d]), { x: e.x * $ + c, y: e.y * $ + p, w: d, h, r: Math.min(a.r, d / 2, h / 2) };
  }
  /** 2.5D: soft shadows and extruded bodies, drawn behind pipes and components. */
  _isoLayer() {
    const e = this.plant.components.map((s) => this._isoBox(s)).filter((s) => !!s), t = Array.from({ length: ws }, (s, i) => (ws - i) / ws);
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
        ${e.map((s) => S`<rect x=${s.x + 6} y=${s.y + 10} width=${s.w} height=${s.h} rx=${s.r} />`)}
      </g>
      <g class="iso-bodies">
        ${e.map((s) => t.map((i) => S`<rect x=${s.x + dr * i} y=${s.y - pr * i} width=${s.w} height=${s.h} rx=${s.r} fill="url(#cp-iso-grad)" />`))}
      </g>`;
  }
  /** Building section: ground, outer wall, ceiling and room names (settings.building). */
  _building(e) {
    const t = this.plant.settings?.building;
    if (!t || t.show === !1) return S``;
    const { w: s } = this.plant.grid, i = t.floor * $, n = (t.ground ?? t.floor) * $, o = t.slab !== void 0 ? t.slab * $ : void 0, a = Math.min(0, e.x) - $ * 4, c = Math.max(s * $, e.x + e.w) + $ * 4, p = Math.min(0, e.y) - $ * 4, d = Math.max(i, n) + $ * 30, h = t.wall !== void 0, m = h ? t.wall * $ : a, u = t.outside === "right", [g, b] = h ? u ? [a, m] : [m, c] : [a, c], [v, w] = u ? [m, c] : [a, m];
    return S`<g class="building">
      ${h ? S`<rect class="outside" x=${v} y=${p} width=${w - v} height=${n - p} />
            <rect class="ground" x=${v} y=${n} width=${w - v} height=${d - n} />
            <line class="floor-line" x1=${v} x2=${w} y1=${n} y2=${n} />
            <text class="room" x=${u ? s * $ - 14 : m - 14} y=${n - $ * 13} text-anchor="end">${l("bld.outside")}</text>` : y}
      <rect class="ground" x=${g} y=${i} width=${b - g} height=${d - i} />
      <line class="floor-line" x1=${g} x2=${b} y1=${i} y2=${i} />
      ${h ? S`<rect class="wall" x=${m - 7} y=${p} width="14" height=${i + $ - p} />` : y}
      ${o !== void 0 ? S`<rect class="slab" x=${g} y=${o} width=${b - g} height="10" />
            <text class="room" x=${u ? m - 14 : m + 14} y=${o - 8} text-anchor=${u ? "end" : "start"}>${l("bld.living")}</text>
            <text class="room" x=${u ? m - 14 : m + 14} y=${o + $ * 5.6} text-anchor=${u ? "end" : "start"}>${l(n < i ? "bld.basement" : "bld.plant_room")}</text>` : y}
    </g>`;
  }
  /** Isometric floor: two families of lines at ±30°. */
  _isoFloor(e) {
    const t = $ * 2 * Math.sqrt(3), s = $ * 2;
    return S`
      <defs><pattern id="cp-iso-floor" width=${t} height=${s} patternUnits="userSpaceOnUse">
        <path d="M 0 ${s} L ${t} 0 M 0 0 L ${t} ${s}" class="iso-floor-line" />
      </pattern></defs>
      <rect x=${e.x - e.w} y=${e.y - e.h} width=${e.w * 3} height=${e.h * 3} fill="url(#cp-iso-floor)" class="iso-floor" />`;
  }
  _transform(e) {
    const t = { ...ne[e.type], ...Fe(e) }, s = e.rot || 0;
    let i = `translate(${e.x * $} ${e.y * $})`;
    return e.flip && t.mirrorable && (i += ` translate(${t.w * $} 0) scale(-1 1)`), !t.rotatable || s === 0 ? i : s === 90 ? `${i} translate(${t.h * $} 0) rotate(90)` : s === 180 ? `${i} translate(${t.w * $} ${t.h * $}) rotate(180)` : `${i} translate(0 ${t.w * $}) rotate(270)`;
  }
  _component(e, t) {
    const s = { ...ne[e.type], ...Fe(e), ports: Re(e), badges: Li(e) }, { w: i, h: n } = ve(e), o = (e.type === "value_tile" ? i : s.w) * $, a = (e.type === "value_tile" ? n : s.h) * $, c = (k) => {
      const C = this.src.get(e, k);
      return C?.available && C.num !== null ? C.num : void 0;
    }, p = (k) => {
      const C = this.src.get(e, k);
      return C?.available ? String(C.raw) : void 0;
    }, d = e.icon || this.plant.settings.typeIcons?.[e.type], h = d ? this.icons.get(d) : void 0, m = this.selected?.kind === "c" && this.selected.id === e.id;
    let u;
    e.type === "value_tile" ? u = this._tile(e, o, a) : e.type === "label" ? u = S`<text class="free-label" x="0" y=${$} style="font-size:${e.props.size || 18}px">${e.props.text || e.label}</text>` : h ? u = S`${t.has("running") ? S`<rect class="user-glow pulse" x="-4" y="-4" width=${o + 8} height=${a + 8} rx="10" />` : y}
        <image href=${h.data_url} x="0" y="0" width=${o} height=${a} preserveAspectRatio="xMidYMid meet" />` : u = lr({ c: e, w: o, h: a, flags: t, num: c, text: p });
    const g = !["junction", "label", "value_tile"].includes(e.type), b = s.ports.some((k) => {
      const C = ye(e, k.id);
      return C?.dir === "b" && Math.abs(C.x - (e.x + i / 2)) < Math.max(0.6, i * 0.35);
    });
    let v = (e.x + i / 2) * $, w = (e.y + n) * $ + (s.badges === "above" ? 16 : 18), x = "middle";
    if (b) {
      const k = Math.min(28, e.label.length) * 7.5;
      w = (e.y + n) * $ + 4;
      const C = (e.x + i) * $ + 6, D = e.x * $ - 6, E = this._hitsPipe(C, w - 12, C + k, w + 3), W = this._hitsPipe(D - k, w - 12, D, w + 3);
      E && !W ? (v = D, x = "end") : (v = C, x = "start");
    }
    return S`
      <g class="comp ${m ? "selected" : ""}" data-id=${e.id}
         @pointerdown=${(k) => this._onCompDown(k, e)}>
        <g class=${e.flip && ne[e.type].mirrorable ? "flipped" : ""} transform=${this._transform(e)}>
          ${u}
        </g>
        <rect class="comp-hit" x=${e.x * $ - (e.type === "junction" ? 8 : 0)} y=${e.y * $ - (e.type === "junction" ? 8 : 0)}
          width=${Math.max(16, i * $)} height=${Math.max(16, n * $)} rx="8" />
        ${m ? S`<rect class="sel-outline" x=${e.x * $ - 6} y=${e.y * $ - 6} width=${i * $ + 12} height=${n * $ + 12} rx="10" />` : y}
        ${g ? S`<text class="comp-label" x=${v} y=${w} text-anchor=${x}>${vs(e.label, 28)}</text>` : y}
      </g>
      ${this._badgeLayout(e).map((k) => k.w ? this._pill(e, k.slot, k.x, k.y, k.w) : this._chip(e, k.slot, k.x, k.y))}
    `;
  }
  _chip(e, t, s, i) {
    const n = this.src.get(e, t), o = ut(e, t), { text: a, unit: c } = Ne(n, o), p = e.type === "value_tile" ? t : Te(e.type, t), h = o === "temp" && n?.num !== null && n?.available ? _e(n.num, "#8b949e") : "var(--cp-accent)";
    return S`
      <g class="chip ${n?.available === !1 ? "na" : ""}" @click=${(m) => this._slotClick(m, e, t)}
        @pointerdown=${(m) => this._onValueDown(m, e, t, s, i, ue, me)}>
        <rect x=${s} y=${i} width=${ue} height=${me} rx="8" />
        <rect class="chip-accent" x=${s} y=${i + 7} width="3" height=${me - 14} rx="1.5" style="fill:${h}" />
        <text class="chip-label" x=${s + 10} y=${i + 13}>${vs(p)}</text>
        <text class="chip-value" x=${s + 10} y=${i + 28}>${a}<tspan class="chip-unit" dx="2">${c}</tspan></text>
      </g>`;
  }
  /**
   * Values anchored to a pipe ("at") sit on that pipe; values with a measuring point ("pos")
   * sit at that point. Positions avoid overlapping each other.
   */
  _placePills(e, t) {
    const s = [], i = [...e.values()].filter((o) => !["junction", "label"].includes(o.type)).map((o) => {
      const { w: a, h: c } = ve(o);
      return { x: o.x * $ - 4, y: o.y * $ - 4, w: a * $ + 8, h: c * $ + 26 };
    });
    for (const o of e.values())
      for (const a of this._badgeLayout(o)) a.w || i.push({ x: a.x - 4, y: a.y - 4, w: ue + 8, h: me + 8 });
    const n = (o, a, c, p = !0) => s.every((d) => o + c + 4 <= d.x || o >= d.x + d.w + 4 || a + Se + 3 <= d.y || a >= d.y + Se + 3) && (!p || i.every((d) => o + c <= d.x || o >= d.x + d.w || a + Se <= d.y || a >= d.y + d.h));
    for (const o of e.values()) {
      const a = new Set(this._shownSlots(o)), c = o.type === "indoor_unit" && ke(o, this.src).has("b"), p = new Map(ms(o).map((d) => [d.key, d.at]));
      for (const d of ms(o, c)) {
        if (!a.has(d.key) || !d.at && !d.pos) continue;
        const h = this._pillWidth(o, d.key), m = d.at !== p.get(d.key);
        if (o.valuePos?.[d.key] && !m || this._valueDrag?.id === o.id && this._valueDrag.slot === d.key) {
          s.push({ c: o, slot: d.key, ...this._valueAt(o, d.key, 0, 0), w: h });
          continue;
        }
        if (d.pos) {
          s.push({ c: o, slot: d.key, x: (o.x + d.pos[0]) * $ - h / 2, y: (o.y + d.pos[1]) * $ - Se / 2, w: h });
          continue;
        }
        let u = null, g = { c: o.id, p: d.at };
        const b = /* @__PURE__ */ new Set();
        for (let v = 0; v < 4 && g && !u; v++) {
          const w = g, x = t.find(
            ({ pipe: W }) => !b.has(W.id) && (W.from.c === w.c && W.from.p === w.p || W.to.c === w.c && W.to.p === w.p)
          );
          if (g = null, !x?.route) break;
          b.add(x.pipe.id);
          const k = x.pipe.from.c === w.c && x.pipe.from.p === w.p, C = k ? x.route.pts : [...x.route.pts].reverse();
          for (let W = 1; W < C.length && !u; W++) {
            const Y = C[W - 1], U = C[W], re = Math.abs(Y.x - U.x) + Math.abs(Y.y - U.y);
            if (!(re < 1 || Y.x === U.x && re < 3))
              for (const Z of [0.5, 0.35, 0.65, 0.2, 0.8]) {
                const ae = (Y.x + (U.x - Y.x) * Z) * $, ie = (Y.y + (U.y - Y.y) * Z) * $;
                if (Y.y === U.y && re * $ < h + 8) break;
                const P = ae - h / 2, F = ie - Se / 2;
                if (n(P, F, h)) {
                  u = { x: P, y: F };
                  break;
                }
              }
          }
          const D = k ? x.pipe.to : x.pipe.from, E = e.get(D.c);
          if (!u && E && ne[E.type].passive && E.type !== "pump") {
            const W = Re(E).find((Y) => Y.id !== D.p && t.some(({ pipe: U }) => !b.has(U.id) && (U.from.c === E.id && U.from.p === Y.id || U.to.c === E.id && U.to.p === Y.id)));
            W && (g = { c: E.id, p: W.id });
          }
        }
        if (!u) {
          const v = ye(o, d.at);
          if (!v) continue;
          u = { x: v.x * $ + 6, y: v.y * $ + 6 };
        }
        s.push({ c: o, slot: d.key, ...u, w: h });
      }
    }
    return s;
  }
  _pillWidth(e, t) {
    const { text: s, unit: i } = Ne(this.src.get(e, t), ut(e, t));
    return Math.round((Pi(e.type, t).length + s.length + i.length) * 6.4 + 22);
  }
  _anchorPill(e) {
    const t = this.src.get(e.c, e.slot), s = ut(e.c, e.slot), { text: i, unit: n } = Ne(t, s), o = s === "temp" && t?.available && t.num !== null ? _e(t.num, "#8b949e") : "var(--cp-accent)";
    return S`
      <g class="apill" @click=${(a) => this._slotClick(a, e.c, e.slot)}
        @pointerdown=${(a) => this._onValueDown(a, e.c, e.slot, e.x, e.y, e.w, Se)}>
        <title>${Te(e.c.type, e.slot)}</title>
        <rect x=${e.x} y=${e.y} width=${e.w} height=${Se} rx=${Se / 2} style="stroke:${o}" />
        <text x=${e.x + 8} y=${e.y + 13}><tspan class="apill-label">${Pi(e.c.type, e.slot)}</tspan> ${i}<tspan class="chip-unit" dx="1">${n}</tspan></text>
      </g>`;
  }
  /** Compact value-only pill drawn inside a tank at the sensor height. */
  _pill(e, t, s, i, n) {
    const o = this.src.get(e, t), { text: a, unit: c } = Ne(o, ut(e, t));
    return S`
      <g class="pill" @click=${(p) => this._slotClick(p, e, t)}
        @pointerdown=${(p) => this._onValueDown(p, e, t, s, i, n, 22)}>
        <title>${Te(e.type, t)}</title>
        <rect x=${s} y=${i} width=${n} height="22" rx="11" />
        <text x=${s + n / 2} y=${i + 15.5} text-anchor="middle">${a}<tspan class="chip-unit" dx="1">${c}</tspan></text>
      </g>`;
  }
  _tile(e, t, s) {
    const i = e.props.entries || [];
    return S`
      <rect class="tile" x="0" y="0" width=${t} height=${s} rx="12" />
      <text class="tile-title" x="14" y="22">${e.label}</text>
      ${i.map((n, o) => {
      const a = this.src.get(e, n.slot), { text: c, unit: p } = Ne(a, n.kind || "text"), d = 46 + o * 26;
      return S`<g class="tile-row" @click=${(h) => this._slotClick(h, e, n.slot)}>
          <text class="tile-label" x="14" y=${d}>${vs(n.label || n.slot, 22)}</text>
          <text class="tile-value" x=${t - 14} y=${d} text-anchor="end">${c} <tspan class="chip-unit">${p}</tspan></text></g>`;
    })}`;
  }
  _editOverlays(e, t) {
    const s = [];
    for (const n of e.values())
      if (!(n.type === "junction" && !this._connect && !(this.selected?.kind === "c" && this.selected.id === n.id)))
        for (const o of Re(n)) {
          const a = ye(n, o.id);
          if (!a) continue;
          const c = this._connect?.c === n.id && this._connect.p === o.id, p = n.type === "junction" ? { l: -7, r: 7, t: 0, b: 0 }[a.dir] ?? 0 : 0, d = n.type === "junction" ? { t: -7, b: 7, l: 0, r: 0 }[a.dir] ?? 0 : 0;
          s.push(S`<circle class="port ${c ? "src" : ""} ${this._connect ? "target" : ""}" cx=${a.x * $ + p} cy=${a.y * $ + d} r=${n.type === "junction" ? 4 : 6}
          @pointerdown=${(h) => this._onPortDown(h, { c: n.id, p: o.id })}><title>${o.id}</title></circle>`);
        }
    const i = [];
    if (this.selected?.kind === "p") {
      const n = this.selected.id, o = t.find((a) => a.pipe.id === n)?.route;
      if (o) {
        const a = o.pts.length;
        for (let c = 0; c < a - 1; c++) {
          const p = o.pts[c], d = o.pts[c + 1], h = Math.abs(p.x - d.x) + Math.abs(p.y - d.y);
          if ((c === 0 || c === a - 2) && h <= 1 && a > 2) continue;
          const m = p.x === d.x;
          i.push(S`<rect class="bend-handle ${m ? "ew" : "ns"}" x=${(p.x + d.x) / 2 * $ - 7} y=${(p.y + d.y) / 2 * $ - 7} width="14" height="14" rx="4"
            @pointerdown=${(u) => this._onSegmentDown(u, n, o.pts, c)} />`);
        }
      }
    }
    return S`<g class="ports">${s}</g>${i}`;
  }
  // ---------------------------------------------------------- interaction
  _svgPoint(e) {
    const t = this.renderRoot.querySelector("svg"), s = t.createSVGPoint();
    s.x = e.clientX, s.y = e.clientY;
    const i = t.getScreenCTM();
    if (!i) return { x: 0, y: 0 };
    const n = s.matrixTransform(i.inverse());
    return { x: n.x, y: n.y };
  }
  _emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  _slotClick(e, t, s) {
    this.edit || this._lastMoved || (e.stopPropagation(), this._emit("cp-slot-click", { component: t, slot: s, x: e.clientX, y: e.clientY }));
  }
  _capture(e) {
    const t = this.renderRoot.querySelector("svg");
    t.hasPointerCapture(e.pointerId) || t.setPointerCapture(e.pointerId);
  }
  _onCompDown(e, t) {
    if (e.button !== 0) return;
    e.stopPropagation(), this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const s = this._svgPoint(e);
    this._gesture = {
      type: this.edit ? "move" : "tap",
      id: t.id,
      start: s,
      ox: t.x,
      oy: t.y,
      cx: e.clientX,
      cy: e.clientY,
      moved: !1,
      comp: t,
      view: { ...this._view || this._contentBox() }
    }, this.edit && this._capture(e);
  }
  _onPipeDown(e, t) {
    !this.edit || e.button !== 0 || (e.stopPropagation(), this._emit("cp-select", { kind: "p", id: t }));
  }
  _onPortDown(e, t) {
    if (e.stopPropagation(), !this._connect) {
      this._connect = t, this._emit("cp-hint", l("ed.connecting"));
      return;
    }
    this._connect.c !== t.c && this._emit("cp-connect", { from: this._connect, to: t }), this._connect = null, this._emit("cp-hint", "");
  }
  /**
   * Object snap: align a dragged part with the ports and edges of the other parts (within ¾ cell, so a part can still be nudged by one cell).
   * Ports first – aligned ports give straight pipes. Returns snapped positions and guide coordinates.
   */
  _objectSnap(e, t, s) {
    const { w: n, h: o } = ve(e), a = Re(e).map((u) => ye({ ...e, x: 0, y: 0 }, u.id)).filter((u) => !!u), c = [], p = [];
    for (const u of this.plant.components) {
      if (u.id === e.id || u.type === "label") continue;
      for (const b of Re(u)) {
        const v = ye(u, b.id);
        if (v)
          for (const w of a)
            c.push({ v: v.x, off: w.x }), p.push({ v: v.y, off: w.y });
      }
      const g = ve(u);
      c.push({ v: u.x, off: 0 }, { v: u.x + g.w, off: n }, { v: u.x + g.w / 2, off: n / 2 }), p.push({ v: u.y, off: 0 }, { v: u.y + g.h, off: o }, { v: u.y + g.h / 2, off: o / 2 });
    }
    const d = (u, g) => {
      let b = null;
      for (const v of u) {
        const w = v.v - v.off;
        if (!Number.isInteger(w)) continue;
        const x = Math.abs(w - g);
        x <= 0.75 && (!b || x < b.d) && (b = { pos: w, guide: v.v, d: x });
      }
      return b;
    }, h = d(c, t), m = d(p, s);
    return !h && !m ? null : { x: h?.pos, y: m?.pos, gx: h?.guide, gy: m?.guide };
  }
  /**
   * Object snap for a value field (pixels): edges and centres of other value fields and parts,
   * and the pipes (field centred on a run).
   */
  _valueSnap(e, t, s, i, n, o) {
    const a = $ * 0.75, c = [], p = [], d = (g, b, v, w) => {
      c.push({ v: g, off: 0 }, { v: g + v, off: n }, { v: g + v / 2, off: n / 2 }), p.push({ v: b, off: 0 }, { v: b + w, off: o }, { v: b + w / 2, off: o / 2 });
    };
    for (const g of this.plant.components) {
      const b = this._comp(g);
      if (b.type !== "label") {
        const v = ve(b);
        d(b.x * $, b.y * $, v.w * $, v.h * $);
      }
      for (const v of this._badgeLayout(b))
        b.id === e && v.slot === t || d(v.x, v.y, v.w ?? ue, v.w ? 22 : me);
    }
    for (const g of this._pills) g.c.id === e && g.slot === t || d(g.x, g.y, g.w, Se);
    for (const g of this._segments)
      g.x1 === g.x2 && c.push({ v: g.x1, off: n / 2 }), g.y1 === g.y2 && p.push({ v: g.y1, off: o / 2 });
    const h = (g, b) => {
      let v = null;
      for (const w of g) {
        const x = Math.abs(w.v - w.off - b);
        x <= a && (!v || x < v.d) && (v = { pos: w.v - w.off, guide: w.v, d: x });
      }
      return v;
    }, m = h(c, s), u = h(p, i);
    return !m && !u ? null : { x: m?.pos, y: u?.pos, gx: m ? m.guide / $ : void 0, gy: u ? u.guide / $ : void 0 };
  }
  /** Editor: value fields can be dragged anywhere (half-cell steps, Alt = free). */
  _onValueDown(e, t, s, i, n, o, a) {
    this.edit && (e.stopPropagation(), this._gesture = { type: "value", id: t.id, slot: s, ox: i, oy: n, w: o, h: a, start: this._svgPoint(e), cx: e.clientX, cy: e.clientY, moved: !1 }, this._capture(e));
  }
  _onSegmentDown(e, t, s, i) {
    e.stopPropagation(), this._gesture = { type: "segment", id: t, pts: s.map((n) => ({ ...n })), index: i, moved: !1, start: this._svgPoint(e) }, this._capture(e);
  }
  /** Move segment `index` of a route perpendicular by `delta` cells; returns the new waypoints. */
  _shiftSegment(e, t, s) {
    const i = e.map((h) => ({ ...h })), n = i[t].x === i[t + 1].x, o = (h) => n ? h.x += s : h.y += s, a = (h, m) => ({ x: h.x + Math.sign(m.x - h.x), y: h.y + Math.sign(m.y - h.y) });
    let c = t, p = t + 1;
    if (c === 0) {
      const h = a(i[0], i[1]);
      i.splice(1, 0, h, { ...h }), c = 2, p = 3;
    } else c === 1 && (i.splice(2, 0, { ...i[1] }), c = 2, p = 3);
    const d = i.length - 1;
    if (p === d) {
      const h = a(i[d], i[d - 1]);
      i.splice(d, 0, { ...h }, h);
    } else p === d - 1 && i.splice(p, 0, { ...i[p] });
    return o(i[c]), o(i[p]), i.slice(2, -2).map((h) => [h.x, h.y]);
  }
  _onBgDown(e) {
    if (this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY }), this._pointers.size === 2) {
      const [t, s] = [...this._pointers.values()];
      this._gesture = { type: "pinch", dist: Math.hypot(t.x - s.x, t.y - s.y), view: { ...this._view || this._contentBox() }, moved: !0 }, this._capture(e);
      return;
    }
    this.edit && e.target === e.currentTarget && this._emit("cp-select", null), this.edit && this._connect && (this._connect = null, this._emit("cp-hint", "")), this._gesture = { type: "pan", cx: e.clientX, cy: e.clientY, view: { ...this._view || this._contentBox() }, moved: !1 };
  }
  _onMove(e) {
    this._pointers.has(e.pointerId) && this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const t = this._gesture;
    if (t) {
      if (t.type === "pinch" && this._pointers.size === 2) {
        const [s, i] = [...this._pointers.values()], n = t.dist / Math.max(10, Math.hypot(s.x - i.x, s.y - i.y)), o = t.view, a = o.x + o.w / 2, c = o.y + o.h / 2;
        this._view = { x: a - o.w * n / 2, y: c - o.h * n / 2, w: o.w * n, h: o.h * n };
        return;
      }
      if (t.type === "pan") {
        const i = this.renderRoot.querySelector("svg").getBoundingClientRect(), n = Math.max(t.view.w / i.width, t.view.h / i.height), o = (e.clientX - t.cx) * n, a = (e.clientY - t.cy) * n;
        !t.moved && Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 4 && (t.moved = !0, this._capture(e)), t.moved && (this._view = { ...t.view, x: t.view.x - o, y: t.view.y - a });
        return;
      }
      if (t.type === "move") {
        const s = this._svgPoint(e);
        if (Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 3 && (t.moved = !0), !t.moved) return;
        const n = !this.snapGrid || e.altKey ? 1 : Math.max(1, this.gridStep);
        let o = Math.max(0, Math.round((t.ox + (s.x - t.start.x) / $) / n) * n), a = Math.max(0, Math.round((t.oy + (s.y - t.start.y) / $) / n) * n);
        const c = this.snapObjects && !e.altKey ? this._objectSnap(t.comp, t.ox + (s.x - t.start.x) / $, t.oy + (s.y - t.start.y) / $) : null;
        c?.x !== void 0 && (o = c.x), c?.y !== void 0 && (a = c.y), this._guides = { x: c?.gx, y: c?.gy }, this._drag = { id: t.id, dx: Math.max(0, o), dy: Math.max(0, a) };
        return;
      }
      if (t.type === "tap") {
        Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 6 && (this._gesture = { type: "pan", cx: t.cx, cy: t.cy, view: t.view, moved: !0 }, this._capture(e), this._onMove(e));
        return;
      }
      if (t.type === "value") {
        const s = this._svgPoint(e);
        if (Math.abs(e.clientX - t.cx) + Math.abs(e.clientY - t.cy) > 3 && (t.moved = !0), !t.moved) return;
        const i = e.altKey || !this.snapGrid ? 1 : $ / 2, n = t.ox + s.x - t.start.x, o = t.oy + s.y - t.start.y;
        let a = Math.round(n / i) * i, c = Math.round(o / i) * i;
        const p = this.snapObjects && !e.altKey ? this._valueSnap(t.id, t.slot, n, o, t.w, t.h) : null;
        p?.x !== void 0 && (a = p.x), p?.y !== void 0 && (c = p.y), this._guides = { x: p?.gx, y: p?.gy }, this._valueDrag = { id: t.id, slot: t.slot, x: a, y: c };
        return;
      }
      if (t.type === "segment") {
        const s = this._svgPoint(e), i = t.pts[t.index], n = i.x === t.pts[t.index + 1].x, o = (n ? s.x - t.start.x : s.y - t.start.y) / $, a = this.snapGrid && !e.altKey ? Math.max(1, this.gridStep) : 1, p = Math.round(((n ? i.x : i.y) + o) / a) * a - (n ? i.x : i.y);
        if (p === t.delta) return;
        t.delta = p, t.moved = !0, this._emit("cp-segment", { id: t.id, via: this._shiftSegment(t.pts, t.index, p), live: !0 });
        return;
      }
      if (t.type === "bend") {
        const s = this._svgPoint(e);
        t.moved = !0;
        const i = Math.round((t.horizontalStart ? s.x : s.y) / $);
        this._emit("cp-bend", { id: t.id, bend: i, live: !0 });
      }
    }
  }
  _onUp(e) {
    this._pointers.delete(e.pointerId);
    const t = this._gesture;
    if (!(this._pointers.size > 0 && t?.type === "pinch") && (this._gesture = null, this._lastMoved = !!t?.moved, setTimeout(() => this._lastMoved = !1, 0), !!t))
      if (t.type === "move")
        this._guides = {}, t.moved && this._drag ? this._emit("cp-move", { id: t.id, x: this._drag.dx, y: this._drag.dy }) : this._emit("cp-select", { kind: "c", id: t.id }), this._drag = null;
      else if (t.type === "value") {
        this._guides = {};
        const s = this._valueDrag, i = this.plant.components.find((n) => n.id === t.id);
        if (t.moved && s && i) {
          const n = (o) => Math.round(o * 100) / 100;
          this._emit("cp-value-move", { id: t.id, slot: t.slot, pos: [n(s.x / $ - i.x), n(s.y / $ - i.y)] });
        } else
          this._emit("cp-select", { kind: "c", id: t.id });
        this._valueDrag = null;
      } else t.type === "tap" && !t.moved ? this._emit("cp-component-click", { component: t.comp, x: e.clientX, y: e.clientY }) : t.type === "bend" && t.moved ? this._emit("cp-bend", { id: t.id, live: !1 }) : t.type === "segment" && t.moved && this._emit("cp-segment", { id: t.id, live: !1 });
  }
  _onWheel(e) {
    e.preventDefault();
    const t = this._view || this._contentBox(), s = this._svgPoint(e), i = Math.exp(e.deltaY * 15e-4);
    this._view = { x: s.x - (s.x - t.x) * i, y: s.y - (s.y - t.y) * i, w: t.w * i, h: t.h * i };
  }
};
It.properties = {
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
}, It.styles = oe`
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
let Ls = It;
customElements.get("cp-schematic") || customElements.define("cp-schematic", Ls);
function vt(r) {
  return JSON.parse(JSON.stringify(r));
}
function Pt(r) {
  const { w: e, h: t } = ve(r);
  return { x0: r.x, y0: r.y, x1: r.x + e, y1: r.y + t };
}
function Vt(r) {
  const e = new Map(r.components.map((h) => [h.id, h])), t = [];
  let s = 0;
  for (const h of r.pipes) {
    const m = Bn(h, e);
    if (m)
      for (let u = 1; u < m.pts.length; u++)
        t.push({ pipe: h.id, a: m.pts[u - 1], b: m.pts[u] }), s += Math.abs(m.pts[u].x - m.pts[u - 1].x) + Math.abs(m.pts[u].y - m.pts[u - 1].y);
  }
  let i = 0, n = 0;
  for (let h = 0; h < t.length; h++)
    for (let m = h + 1; m < t.length; m++) {
      const u = t[h], g = t[m];
      if (u.pipe === g.pipe) continue;
      const b = u.a.y === u.b.y, v = g.a.y === g.b.y;
      if (b !== v) {
        const w = b ? u : g, x = b ? g : u, k = Math.min(w.a.x, w.b.x), C = Math.max(w.a.x, w.b.x), D = Math.min(x.a.y, x.b.y), E = Math.max(x.a.y, x.b.y);
        x.a.x > k && x.a.x < C && w.a.y > D && w.a.y < E && i++;
      } else b && u.a.y === g.a.y ? Math.min(Math.max(u.a.x, u.b.x), Math.max(g.a.x, g.b.x)) - Math.max(Math.min(u.a.x, u.b.x), Math.min(g.a.x, g.b.x)) > 0 && n++ : !b && u.a.x === g.a.x && Math.min(Math.max(u.a.y, u.b.y), Math.max(g.a.y, g.b.y)) - Math.max(Math.min(u.a.y, u.b.y), Math.min(g.a.y, g.b.y)) > 0 && n++;
    }
  let o = 0;
  const a = new Map(r.pipes.map((h) => [h.id, /* @__PURE__ */ new Set([h.from.c, h.to.c])])), c = r.components.filter((h) => !["junction", "label"].includes(h.type));
  for (const h of t)
    for (const m of c) {
      if (a.get(h.pipe)?.has(m.id)) continue;
      const u = Pt(m), g = Math.min(h.a.x, h.b.x), b = Math.max(h.a.x, h.b.x), v = Math.min(h.a.y, h.b.y), w = Math.max(h.a.y, h.b.y);
      b > u.x0 && g < u.x1 && w > u.y0 && v < u.y1 && o++;
    }
  let p = 0;
  for (let h = 0; h < c.length; h++)
    for (let m = h + 1; m < c.length; m++) {
      const u = Pt(c[h]), g = Pt(c[m]);
      u.x1 + 1 > g.x0 && g.x1 + 1 > u.x0 && u.y1 + 1 > g.y0 && g.y1 + 1 > u.y0 && p++;
    }
  const d = i * 10 + n * 15 + o * 12 + p * 40 + s * 0.05;
  return { crossings: i + n, overlaps: p, through: o, length: s, total: d };
}
const Gi = {
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
function ur(r, e, t, s) {
  const i = vt(r), n = i.components.filter((b) => !["label", "value_tile"].includes(b.type)), o = new Map(n.map((b) => [b.id, /* @__PURE__ */ new Set()]));
  for (const b of i.pipes)
    o.get(b.from.c)?.add(b.to.c), o.get(b.to.c)?.add(b.from.c);
  const a = n.find((b) => b.type === "outdoor_unit") || n.find((b) => b.type === "indoor_unit") || n[0], c = /* @__PURE__ */ new Map();
  if (a) {
    c.set(a.id, 0);
    const b = [a.id];
    for (; b.length; ) {
      const v = b.shift();
      for (const w of o.get(v) || [])
        if (!c.has(w)) {
          const x = n.find((C) => C.id === w), k = x.type === "junction" || ne[x.type].passive && x.type !== "tap";
          c.set(w, c.get(v) + (k ? 0.5 : 1)), b.push(w);
        }
    }
  }
  for (const b of n) c.has(b.id) || c.set(b.id, 0);
  const d = [...new Set([...c.values()].map((b) => Math.round(b * 2)))].sort((b, v) => b - v).map((b) => n.filter((v) => Math.round(c.get(v.id) * 2) === b)), h = s ? -1 : 1;
  for (const b of d) b.sort((v, w) => h * ((Gi[v.type] ?? 5) - (Gi[w.type] ?? 5)));
  const m = /* @__PURE__ */ new Map(), u = () => d.forEach((b) => b.forEach((v, w) => m.set(v.id, w / Math.max(1, b.length - 1))));
  u();
  for (let b = 0; b < t; b++)
    for (const v of d) {
      const w = new Map(
        v.map((x) => {
          const k = [...o.get(x.id) || []].filter((C) => m.has(C));
          return [x.id, k.length ? k.reduce((C, D) => C + m.get(D), 0) / k.length : m.get(x.id)];
        })
      );
      v.sort((x, k) => w.get(x.id) - w.get(k.id)), u();
    }
  let g = 1;
  for (const b of d) {
    const v = Math.max(1, ...b.map((x) => ve(x).w));
    let w = 2;
    for (const x of b) {
      const { w: k, h: C } = ve(x);
      x.x = Math.round(g + (v - k) / 2), x.y = w, w += C + e + (ne[x.type].badges === "below" ? 3 : 0);
    }
    g += v + e + 2;
  }
  for (const b of i.pipes)
    delete b.via, delete b.bend;
  return i.grid = { w: Math.max(i.grid.w, g + 4), h: Math.max(i.grid.h, ...n.map((b) => b.y + ve(b).h + 6)) }, i;
}
const mr = /^(ou|iu|dhw|buf|tap|inlet|jww|circ|sep|sc1|jmag|mag|pc1|vw1|pc0|hc\d+(_[a-z]+)?)$/;
function fr(r) {
  const e = r.settings?.wizard;
  if (!e) return null;
  const t = r.components.find((m) => m.type === "indoor_unit"), s = (m) => r.components.some((u) => u.type === m), i = {
    ...e,
    indoorModel: t?.model || e.indoorModel,
    dhw: s("dhw_tank") ? "tank" : e.dhw,
    // a unit with a built-in buffer (TP70) has no external one: keep the wish for when the unit changes back
    buffer: s("buffer") ? e.buffer === "none" ? "parallel" : e.buffer : ot(e.indoorModel)?.buffer ? e.buffer : "none",
    circulation: s("tap") ? r.components.some((m) => m.id === "circ") : e.circulation
  }, n = ds(i, r), o = new Map(n.components.map((m) => [m.id, m]));
  if (t?.model && e.indoorModel && t.model !== e.indoorModel) {
    const m = r.components.filter((v) => !o.has(v.id) && !mr.test(v.id)), u = /* @__PURE__ */ new Set([...n.components.map((v) => v.id), ...m.map((v) => v.id)]), g = new Map(r.pipes.map((v) => [[v.from.c, v.to.c].sort().join("|"), v])), b = [
      ...n.pipes.map((v) => {
        const w = g.get([v.from.c, v.to.c].sort().join("|"));
        return w?.bindings ? { ...v, bindings: w.bindings } : v;
      }),
      ...r.pipes.filter((v) => m.some((w) => w.id === v.from.c || w.id === v.to.c) && u.has(v.from.c) && u.has(v.to.c))
    ];
    return { ...n, components: [...n.components, ...vt(m)], pipes: b, settings: { ...r.settings, ...n.settings } };
  }
  const a = vt(r), c = [], p = [];
  for (const m of a.components) {
    const u = o.get(m.id);
    u && u.type === m.type ? (m.x = u.x, m.y = u.y, u.rot !== void 0 ? m.rot = u.rot : delete m.rot, u.flip ? m.flip = !0 : delete m.flip, (m.type === "radiators" || m.type === "tap") && (m.props = { ...m.props }, u.props?.variant ? m.props.variant = u.props.variant : delete m.props.variant), c.push(m)) : p.push(m);
  }
  if (!p.length && n.components.every((m) => a.components.some((u) => u.id === m.id))) {
    const m = new Map(a.pipes.map((u) => [[u.from.c, u.to.c].sort().join("|"), u]));
    return a.pipes = n.pipes.map((u) => {
      const g = m.get([u.from.c, u.to.c].sort().join("|"));
      return g?.bindings ? { ...u, bindings: g.bindings } : u;
    }), a.grid = { w: Math.max(a.grid.w, n.grid.w), h: Math.max(a.grid.h, n.grid.h) }, a.settings = { ...a.settings, building: n.settings.building }, a;
  }
  const d = (m) => `${m.from.c}.${m.from.p}>${m.to.c}.${m.to.p}`, h = new Map(n.pipes.map((m) => [d(m), m]));
  for (const m of a.pipes) {
    const u = h.get(d(m));
    delete m.bend, u?.via ? m.via = u.via : delete m.via;
  }
  a.grid = { w: Math.max(a.grid.w, n.grid.w), h: Math.max(a.grid.h, n.grid.h) }, a.settings = { ...a.settings, building: n.settings.building };
  for (const m of p) {
    const { w: u, h: g } = ve(m), b = (w, x) => [...c].every((k) => {
      const C = Pt(k);
      return w + u + 2 <= C.x0 || w >= C.x1 + 2 || x + g + 3 <= C.y0 || x >= C.y1 + 3;
    });
    let v = !1;
    for (let w = 2; w + g < a.grid.h + 20 && !v; w += 2)
      for (let x = 1; x + u < a.grid.w + 20 && !v; x += 2)
        b(x, w) && (m.x = x, m.y = w, v = !0);
    c.push(m);
  }
  return a;
}
function gr(r, e = 400) {
  let t = vt(r), s = Vt(t).total, i = 12345;
  const n = () => (i = (i * 1103515245 + 12345) % 2147483648) / 2147483648, o = t.components.filter((a) => !["label", "value_tile"].includes(a.type)).map((a) => a.id);
  for (let a = 0; a < e; a++) {
    const c = vt(t), d = new Map(c.components.map((u) => [u.id, u])).get(o[Math.floor(n() * o.length)]), h = n();
    if (h < 0.35) {
      const u = c.components.filter((b) => b.id !== d.id && Math.abs(b.x - d.x) <= 3 && o.includes(b.id));
      if (!u.length) continue;
      const g = u[Math.floor(n() * u.length)];
      [d.y, g.y] = [g.y, d.y];
    } else {
      const u = [-4, -2, 2, 4][Math.floor(n() * 4)];
      h < 0.7 ? d.y = Math.max(1, d.y + u) : d.x = Math.max(1, d.x + u);
    }
    const m = Vt(c).total;
    m < s && (t = c, s = m);
  }
  return t;
}
function _r(r) {
  const e = fr(r), t = [];
  if (e) t.push({ plant: e, kind: "template" });
  else
    for (const i of [3, 5])
      for (const n of [0, 3])
        for (const o of [!1, !0]) t.push({ plant: ur(r, i, n, o), kind: "layered" });
  let s = null;
  for (const i of t) {
    const n = Vt(i.plant);
    (!s || n.total < s.score.total) && (s = { plant: i.plant, kind: i.kind, score: n });
  }
  if (s.kind === "layered" || s.score.crossings > 2 && !s.plant.settings.building) {
    const i = gr(s.plant), n = Vt(i);
    n.total < s.score.total && (s = { plant: i, kind: s.kind, score: n });
  }
  return s;
}
const br = [
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
], wr = ["supply", "return", "dhw_hot", "dhw_cold", "circulation"], ys = {
  pump: ["running", "!running"],
  mixer: ["running"],
  valve_3way: ["a", "b"],
  outdoor_unit: ["running", "defrost", "!defrost"],
  indoor_unit: ["running", "a", "b", "aux", "pc1"],
  tap: ["flowing"],
  dhw_tank: ["charging"]
};
function Ye(r) {
  return JSON.parse(JSON.stringify(r));
}
const et = class et extends se {
  constructor() {
    super(...arguments), this.value = "", this.placeholder = "", this._listId = `cp-ents-${et._uid++}`;
  }
  _change(e) {
    const t = e.target.value.trim();
    this.value = t, this.dispatchEvent(new CustomEvent("value-changed", { detail: t }));
  }
  render() {
    const e = this.hass ? Object.keys(this.hass.states).sort() : [];
    return f`<input
        list=${this._listId}
        .value=${this.value || ""}
        placeholder=${this.placeholder || l("ed.entity_search")}
        @change=${this._change}
      />
      <datalist id=${this._listId}>
        ${e.map((t) => f`<option value=${t}>${this.hass.states[t].attributes.friendly_name || ""}</option>`)}
      </datalist>`;
  }
};
et.properties = { hass: { attribute: !1 }, value: {}, placeholder: {} }, et._uid = 0, et.styles = [fe, oe`:host { display: block; min-width: 0; } input { font-size: 12px; padding: 6px 8px; }`];
let Hs = et;
customElements.get("cp-entity-picker") || customElements.define("cp-entity-picker", Hs);
const jt = class jt extends se {
  constructor() {
    super(...arguments), this._gridCfg = (() => {
      const e = { show: !1, step: 1, snap: !0, osnap: !0 };
      try {
        return { ...e, ...JSON.parse(localStorage.getItem("copilot.editor.grid") || "{}") };
      } catch {
        return e;
      }
    })(), this.icons = /* @__PURE__ */ new Map(), this.version = 0, this._sel = null, this._hint = "", this._dirty = !1, this._undo = [], this._redo = [], this._stale = !1, this._onKey = (e) => {
      const t = e.composedPath()[0]?.tagName;
      t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || ((e.key === "Delete" || e.key === "Backspace") && this._sel ? (e.preventDefault(), this._delete()) : (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" ? (e.preventDefault(), e.shiftKey ? this._doRedo() : this._doUndo()) : e.key.toLowerCase() === "r" && this._sel?.kind === "c" && this._rotate());
    };
  }
  _setGrid(e) {
    this._gridCfg = { ...this._gridCfg, ...e };
    try {
      localStorage.setItem("copilot.editor.grid", JSON.stringify(this._gridCfg));
    } catch {
    }
  }
  /** A straight run of a pipe was dragged: store its route as waypoints (undoable as one step). */
  _onSegment(e) {
    const { id: t, via: s, live: i } = e.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = Ye(this._draft), o = n.pipes.find((a) => a.id === t);
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
    const e = this._sel;
    this._draft = Ye(this.plant), this._baseRev = this.rev, this._undo = [], this._redo = [], this._dirty = !1, this._stale = !1, this._sent = void 0, this._sel = e && (e.kind === "c" ? this._comp(e.id) : this._pipe(e.id)) ? e : null;
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
  _commit(e, t = !0) {
    t && (this._undo.push(JSON.stringify(this._draft)), this._undo.length > 80 && this._undo.shift(), this._redo = []);
    const s = Ye(this._draft);
    e(s), this._draft = s, this._dirty = !0;
  }
  _doUndo() {
    const e = this._undo.pop();
    e && (this._redo.push(JSON.stringify(this._draft)), this._draft = JSON.parse(e), this._dirty = !0);
  }
  _doRedo() {
    const e = this._redo.pop();
    e && (this._undo.push(JSON.stringify(this._draft)), this._draft = JSON.parse(e), this._dirty = !0);
  }
  _comp(e) {
    return this._draft.components.find((t) => t.id === (e ?? this._sel?.id));
  }
  _pipe(e) {
    return this._draft.pipes.find((t) => t.id === (e ?? this._sel?.id));
  }
  _newId(e) {
    const t = /* @__PURE__ */ new Set([...this._draft.components.map((i) => i.id), ...this._draft.pipes.map((i) => i.id)]);
    let s = 1;
    for (; t.has(`${e}${s}`); ) s++;
    return `${e}${s}`;
  }
  _add(e) {
    const t = ne[e], s = this._newId(`${e}_`), i = {
      id: s,
      type: e,
      label: e === "junction" ? "" : l(`type.${e}`),
      ...this._freeSpot(t.variants ? Fe({ type: e, props: {} }).w : t.w, t.variants ? Fe({ type: e, props: {} }).h : t.h),
      bindings: {},
      props: e === "value_tile" ? { entries: [] } : e === "label" ? { text: l("type.label"), size: 18 } : {}
    };
    e === "pump" && (i.props.role = "other"), this._commit((n) => n.components.push(i)), this._sel = { kind: "c", id: s };
  }
  /** First grid position where a w×h box (plus margin) does not overlap anything. */
  _freeSpot(e, t) {
    const s = this._draft.components.map((n) => ({ c: n, ...ve(n) })), i = (n, o) => s.every(({ c: a, w: c, h: p }) => n + e + 1 <= a.x || n >= a.x + c + 1 || o + t + 2 <= a.y || o >= a.y + p + 3);
    for (let n = 1; n + t < this._draft.grid.h; n += 2)
      for (let o = 1; o + e < this._draft.grid.w; o += 2) if (i(o, n)) return { x: o, y: n };
    return { x: 1, y: 1 };
  }
  _delete() {
    const e = this._sel;
    e && (this._commit((t) => {
      e.kind === "c" ? (t.components = t.components.filter((s) => s.id !== e.id), t.pipes = t.pipes.filter((s) => s.from.c !== e.id && s.to.c !== e.id), t.pipes.forEach((s) => {
        s.flow = s.flow?.filter((i) => i.c !== e.id), s.flowAny = s.flowAny?.filter((i) => i.c !== e.id);
      })) : t.pipes = t.pipes.filter((s) => s.id !== e.id);
    }), this._sel = null);
  }
  _rotate() {
    const e = this._comp();
    !e || !ne[e.type].rotatable || this._commit((t) => {
      const s = t.components.find((i) => i.id === e.id);
      s.rot = ((s.rot || 0) + 90) % 360;
    });
  }
  _duplicate() {
    const e = this._comp();
    if (!e) return;
    const t = this._newId(`${e.type}_`);
    this._commit((s) => s.components.push({ ...Ye(e), id: t, x: e.x + 2, y: e.y + 2 })), this._sel = { kind: "c", id: t };
  }
  _connect(e, t) {
    const s = this._comp(e.c), i = this._comp(t.c), n = ye(s, e.p), o = ye(i, t.p), a = n?.def.kind || o?.def.kind || "supply", c = [], p = [s, i].find((h) => h.type === "pump");
    p && c.push({ c: p.id, s: "running" });
    for (const [h, m] of [
      [s, e],
      [i, t]
    ])
      h.type === "valve_3way" && (m.p === "a" || m.p === "b") && c.push({ c: h.id, s: m.p });
    const d = this._newId("p");
    this._commit((h) => h.pipes.push({ id: d, from: e, to: t, kind: a, flow: c })), this._sel = { kind: "p", id: d };
  }
  _set(e, t = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.components.find((o) => o.id === s);
      n && e(n);
    }, t);
  }
  _setPipe(e, t = !0) {
    const s = this._sel?.id;
    this._commit((i) => {
      const n = i.pipes.find((o) => o.id === s);
      n && e(n);
    }, t);
  }
  _autoArrange() {
    const e = _r(this._draft);
    this._commit((t) => {
      t.components = e.plant.components, t.pipes = e.plant.pipes, t.grid = e.plant.grid, t.settings = { ...t.settings, building: e.plant.settings.building, wizard: e.plant.settings.wizard };
    }), this._sel = null, this._hint = l(e.kind === "template" ? "ed.auto_done_tpl" : "ed.auto_done", { crossings: e.score.crossings }), window.setTimeout(() => this._hint = "", 6e3);
  }
  _save() {
    const e = Ye(this._draft);
    e.settings = { ...e.settings, layout_edited: !0 }, this._sent = JSON.stringify(e), this.dispatchEvent(new CustomEvent("save", { detail: { plant: e, rev: this._baseRev }, bubbles: !0, composed: !0 }));
  }
  _discard() {
    this._sel = null, this._take();
  }
  // ------------------------------------------------------------ events
  _onBend(e) {
    const { id: t, bend: s, live: i } = e.detail;
    if (i) {
      this._bendStart || (this._bendStart = JSON.stringify(this._draft));
      const n = Ye(this._draft), o = n.pipes.find((a) => a.id === t);
      o && (o.bend = s, delete o.via), this._draft = n;
    } else this._bendStart && (this._undo.push(this._bendStart), this._bendStart = void 0, this._dirty = !0);
  }
  // ------------------------------------------------------------ render
  render() {
    if (!this._draft) return y;
    const e = this._sel;
    return f`
      <div class="toolbar">
        <button class="icon" title=${l("undo")} ?disabled=${!this._undo.length} @click=${this._doUndo}>${L("undo")}</button>
        <button class="icon" title=${l("redo")} ?disabled=${!this._redo.length} @click=${this._doRedo}>${L("redo")}</button>
        <button class="icon" title=${l("ed.rotation")} ?disabled=${!(e?.kind === "c" && ne[this._comp()?.type || "label"].rotatable)} @click=${this._rotate}>${L("rotate")}</button>
        <button class="icon" title=${l("ed.duplicate")} ?disabled=${e?.kind !== "c"} @click=${this._duplicate}>${L("copy")}</button>
        <button class="icon danger" title=${l("delete")} ?disabled=${!e} @click=${this._delete}>${L("trash")}</button>
        <button title=${l("ed.auto_title")} @click=${this._autoArrange}>${L("wand")} ${l("ed.auto")}</button>
        <span class="hint">${this._hint}</span>
        <span class="spacer"></span>
        ${this._dirty ? f`<span class="dirty">${l("unsaved")}</span>
          <button @click=${this._discard}>${l("discard")}</button>` : y}
        <button class="primary" ?disabled=${!this._dirty} @click=${this._save}>${L("save")} ${l("save")}</button>
      </div>
      ${this._stale ? f`<div class="stale">
            <span>${L("warn")} ${l("sync.stale")}</span>
            <button @click=${this._discard}>${l("sync.take")}</button>
            <button @click=${this._keepMine}>${l("sync.keep")}</button>
          </div>` : y}
      <div class="layout">
        <aside class="palette card">
          <div class="cap">${l("ed.palette")}</div>
          ${br.map((t) => f`<button class="pal" @click=${() => this._add(t)}>${L("plus")} ${l(`type.${t}`)}</button>`)}
          <div class="cap">${l("ed.grid")}</div>
          <div class="row grid-size">
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.w)} @change=${(t) => this._commit((s) => s.grid.w = Number(t.target.value) || s.grid.w)} />
            ×
            <input type="number" min="20" max="200" .value=${String(this._draft.grid.h)} @change=${(t) => this._commit((s) => s.grid.h = Number(t.target.value) || s.grid.h)} />
          </div>
          <label class="bld"><input type="checkbox" .checked=${!!this._draft.settings.building && this._draft.settings.building.show !== !1}
            @change=${(t) => this._commit((s) => {
      const i = t.target.checked;
      s.settings = { ...s.settings, building: { ...s.settings.building || { floor: s.grid.h - 2 }, show: i } };
    })} /> ${l("ed.building")}</label>
          <div class="cap">${l("ed.raster")}</div>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.show} @change=${(t) => this._setGrid({ show: t.target.checked })} /> ${l("ed.grid_show")}</label>
          <label class="field">${l("ed.grid_step")}
            <select @change=${(t) => this._setGrid({ step: Number(t.target.value) })}>
              ${[1, 2, 5].map((t) => f`<option value=${t} ?selected=${this._gridCfg.step === t}>${l("ed.grid_cells", { n: t })}</option>`)}
            </select></label>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.snap} @change=${(t) => this._setGrid({ snap: t.target.checked })} /> ${l("ed.grid_snap")}</label>
          <label class="bld"><input type="checkbox" .checked=${this._gridCfg.osnap} @change=${(t) => this._setGrid({ osnap: t.target.checked })} /> ${l("ed.object_snap")}</label>
          <p class="muted tiny">${l("ed.snap_hint")}</p>
        </aside>
        <div class="canvas card">
          <cp-schematic
            edit
            .plant=${this._draft}
            .src=${this.src}
            .icons=${this.icons}
            .selected=${e}
            .version=${this.version}
            @cp-select=${(t) => this._sel = t.detail}
            @cp-move=${(t) => this._commit((s) => {
      const i = s.components.find((n) => n.id === t.detail.id);
      i && (i.x = t.detail.x, i.y = t.detail.y);
    })}
            @cp-connect=${(t) => this._connect(t.detail.from, t.detail.to)}
            @cp-bend=${this._onBend}
            @cp-segment=${this._onSegment}
            @cp-value-move=${(t) => this._commit((s) => {
      const i = s.components.find((n) => n.id === t.detail.id);
      i && (i.valuePos = { ...i.valuePos || {}, [t.detail.slot]: t.detail.pos });
    })}
            .gridStep=${this._gridCfg.step}
            ?showGrid=${this._gridCfg.show}
            ?snapGrid=${this._gridCfg.snap}
            ?snapObjects=${this._gridCfg.osnap}
            @cp-hint=${(t) => this._hint = t.detail}
          ></cp-schematic>
        </div>
        <aside class="props card">${e?.kind === "c" ? this._compProps() : e?.kind === "p" ? this._pipeProps() : f`<p class="muted">${l("ed.nothing")}</p>`}</aside>
      </div>
    `;
  }
  _num(e, t, s, i = 1) {
    return f`<label class="field">${e}<input type="number" step=${i} .value=${t ?? ""} @change=${(n) => s(Number(n.target.value))} /></label>`;
  }
  _compProps() {
    const e = this._comp();
    if (!e) return y;
    const t = ne[e.type], s = new Set(e.show ?? Ae(e).filter((n) => n.show).map((n) => n.key)), i = [...this.icons.values()];
    return f`
      <div class="ptitle">${l(`type.${e.type}`)} <code>${e.id}</code></div>
      ${e.type !== "junction" ? f`<label class="field">${l("ed.label")}<input .value=${e.label} @change=${(n) => this._set((o) => o.label = n.target.value)} /></label>` : y}
      ${e.type === "outdoor_unit" ? f`<label class="field">${l("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${Ot.map((n) => f`<option value=${n.id} ?selected=${n.id === e.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(l("ed.nominal"), e.props.nominal_kw, (n) => this._set((o) => o.props.nominal_kw = n), 0.1)}
            ${this._num(l("ed.cop_ref"), e.props.cop_ref ?? 4.9, (n) => this._set((o) => o.props.cop_ref = n), 0.1)}` : y}
      ${e.type === "indoor_unit" ? f`<label class="field">${l("ed.model")}<select @change=${(n) => this._set((o) => o.model = n.target.value)}>
              ${di.map((n) => f`<option value=${n.id} ?selected=${n.id === e.model}>${n.label}</option>`)}
            </select></label>
            ${this._num(l("wz.aux_kw"), e.props.aux_kw, (n) => this._set((o) => o.props.aux_kw = n), 1)}
            <div class="cap">${l("ed.input_labels")}</div>
            ${[1, 2, 3, 4].map(
      (n) => f`<label class="field">${l(`slot.input${n}`)}<input .value=${e.props.input_labels?.[`input${n}`] || ""}
                @change=${(o) => this._set((a) => a.props.input_labels = { ...a.props.input_labels || {}, [`input${n}`]: o.target.value })} /></label>`
    )}
            <div class="cap">${l("ed.pressure_limits")}</div>
            <div class="two">
              ${this._num("min", e.props.pressure_min ?? 1, (n) => this._set((o) => o.props.pressure_min = n), 0.1)}
              ${this._num("max", e.props.pressure_max ?? 2.7, (n) => this._set((o) => o.props.pressure_max = n), 0.1)}
            </div>` : y}
      ${e.type === "buffer" || e.type === "dhw_tank" ? this._num(l("ed.volume"), e.props.volume, (n) => this._set((o) => o.props.volume = n)) : y}
      ${t.roles ? f`<label class="field">${l("ed.role")}<select @change=${(n) => this._set((o) => o.props.role = n.target.value)}>
            ${t.roles.map((n) => f`<option value=${n} ?selected=${e.props.role === n}>${l(`role.${n}`)}</option>`)}
          </select></label>` : y}
      ${["radiators", "floor_heating", "mixer", "pump"].includes(e.type) ? this._num(l("ed.circuit"), e.props.circuit ?? 1, (n) => this._set((o) => o.props.circuit = n)) : y}
      ${e.type === "dhw_tank" ? this._num(l("ed.dhw_circuit"), e.props.dhw_circuit ?? 1, (n) => this._set((o) => o.props.dhw_circuit = n)) : y}
      ${e.type === "label" ? f`<label class="field">${l("ed.text")}<input .value=${e.props.text || ""} @change=${(n) => this._set((o) => o.props.text = n.target.value)} /></label>
            ${this._num("px", e.props.size || 18, (n) => this._set((o) => o.props.size = n))}` : y}
      ${t.rotatable ? f`<label class="field">${l("ed.rotation")}<select @change=${(n) => this._set((o) => o.rot = Number(n.target.value))}>
            ${[0, 90, 180, 270].map((n) => f`<option value=${n} ?selected=${(e.rot || 0) === n}>${n}°</option>`)}
          </select></label>` : y}
      ${e.type === "radiators" || e.type === "tap" ? f`<label class="field">${l(e.type === "tap" ? "ed.tap_kind" : "ed.connection")}<select @change=${(n) => this._set((o) => o.props.variant = n.target.value)}>
            ${(e.type === "tap" ? ["tap", "shower"] : ["side", "bottom"]).map(
      (n) => f`<option value=${n} ?selected=${(e.props.variant || (e.type === "tap" ? "tap" : "side")) === n}>${l(e.type === "tap" ? `ed.tap.${n}` : `ed.conn.${n}`)}</option>`
    )}
          </select></label>` : y}
      ${t.mirrorable ? f`<label class="field check"><input type="checkbox" .checked=${!!e.flip} @change=${(n) => this._set((o) => {
      n.target.checked ? o.flip = !0 : delete o.flip;
    })} />${l("ed.flip")}</label>` : y}
      ${e.valuePos && Object.keys(e.valuePos).length ? f`<button class="ghost" @click=${() => this._set((n) => delete n.valuePos)}>${l("ed.values_reset")}</button>` : y}
      ${["junction", "label", "value_tile"].includes(e.type) ? y : f`<label class="field">${l("ed.icon")}<select @change=${(n) => this._set((o) => {
      const a = n.target.value;
      a ? o.icon = a : delete o.icon;
    })}>
            <option value="">${l("ed.icon_default")}</option>
            ${i.map((n) => f`<option value=${n.id} ?selected=${n.id === e.icon}>${n.name}</option>`)}
          </select></label>`}
      ${e.type === "value_tile" ? this._tileEntries(e) : this._bindings(e, s)}
    `;
  }
  _bindings(e, t) {
    const s = Ae(e);
    return s.length ? f`<div class="cap">${l("ed.bindings")}</div>
      <div class="bindings">
        ${s.map((i) => {
      const n = this.src.get(e, i.key), { text: o, unit: a } = Ne(n, i.kind);
      return f`<div class="bind">
            <div class="bhead">
              <label class="show" title=${l("ed.show")}><input type="checkbox" .checked=${t.has(i.key)}
                @change=${(c) => this._set((p) => {
        const d = new Set(p.show ?? Ae(p).filter((h) => h.show).map((h) => h.key));
        c.target.checked ? d.add(i.key) : d.delete(i.key), p.show = Ae(p).map((h) => h.key).filter((h) => d.has(h));
      })} /></label>
              <span class="bname">${Te(e.type, i.key)}</span>
              <span class="bval">${n ? `${o} ${a}` : ""}</span>
              ${Ln(e.bindings[i.key]) ? f`<label class="wr" title=${l("wr.release")}><input type="checkbox" .checked=${(e.writable || []).includes(i.key)}
                    @change=${(c) => this._set((p) => {
        const d = new Set(p.writable || []);
        c.target.checked ? d.add(i.key) : d.delete(i.key), d.size ? p.writable = [...d] : delete p.writable;
      })} />✎</label>` : y}
            </div>
            <cp-entity-picker .hass=${this.hass} .value=${e.bindings[i.key] || ""}
              @value-changed=${(c) => this._set((p) => {
        c.detail ? p.bindings[i.key] = c.detail : delete p.bindings[i.key];
      })}></cp-entity-picker>
          </div>`;
    })}
      </div>` : y;
  }
  _tileEntries(e) {
    const t = e.props.entries || [], s = ["temp", "power_kw", "power_w", "energy", "percent", "pressure", "flow", "count", "bool", "text"];
    return f`<div class="cap">${l("ed.entries")}</div>
      ${t.map(
      (i, n) => f`<div class="bind">
          <div class="two">
            <input .value=${i.label || ""} placeholder=${l("ed.label")} @change=${(o) => this._set((a) => a.props.entries[n].label = o.target.value)} />
            <select @change=${(o) => this._set((a) => a.props.entries[n].kind = o.target.value)}>
              ${s.map((o) => f`<option value=${o} ?selected=${i.kind === o}>${o}</option>`)}
            </select>
          </div>
          <div class="row nowrap">
            <cp-entity-picker .hass=${this.hass} .value=${i.entity || ""}
              @value-changed=${(o) => this._set((a) => a.props.entries[n].entity = o.detail)}></cp-entity-picker>
            <button class="icon danger" @click=${() => this._set((o) => o.props.entries.splice(n, 1))}>${L("trash")}</button>
          </div>
        </div>`
    )}
      <button @click=${() => this._set((i) => {
      i.props.entries = [...i.props.entries || [], { slot: `v${Date.now().toString(36)}`, label: "", entity: "", kind: "text" }];
    })}>${L("plus")} ${l("ed.add_entry")}</button>`;
  }
  _conds(e, t) {
    const s = this._draft.components.filter((i) => ys[i.type]);
    return f`${(e || []).map(
      (i, n) => f`<div class="row nowrap cond">
          <select @change=${(o) => this._setPipe((a) => a[t][n].c = o.target.value)}>
            ${s.map((o) => f`<option value=${o.id} ?selected=${o.id === i.c}>${o.label || o.id}</option>`)}
          </select>
          <select @change=${(o) => this._setPipe((a) => a[t][n].s = o.target.value)}>
            ${(ys[this._comp(i.c)?.type || "pump"] || []).map(
        (o) => f`<option value=${o} ?selected=${o === i.s}>${o.startsWith("!") ? `${l("ed.not")} ${l(`state.${o.slice(1)}`)}` : l(`state.${o}`)}</option>`
      )}
          </select>
          <button class="icon danger" @click=${() => this._setPipe((o) => o[t].splice(n, 1))}>${L("close")}</button>
        </div>`
    )}
      <button ?disabled=${!s.length} @click=${() => this._setPipe((i) => {
      const n = s[0];
      i[t] = [...i[t] || [], { c: n.id, s: ys[n.type][0] }];
    })}>${L("plus")} ${l("ed.add_cond")}</button>`;
  }
  _pipeProps() {
    const e = this._pipe();
    if (!e) return y;
    const t = (s) => this._comp(s)?.label || s;
    return f`
      <div class="ptitle">${l("ed.pipe")} <code>${e.id}</code></div>
      <p class="muted small">${t(e.from.c)} · ${e.from.p} → ${t(e.to.c)} · ${e.to.p}</p>
      <label class="field">${l("ed.kind")}<select @change=${(s) => this._setPipe((i) => i.kind = s.target.value)}>
        ${wr.map((s) => f`<option value=${s} ?selected=${s === e.kind}>${l(`kind.${s}`)}</option>`)}
      </select></label>
      <div class="cap">${l("ed.flow_when")}</div>
      ${this._conds(e.flow, "flow")}
      <div class="cap">${l("ed.or")}</div>
      ${this._conds(e.flowAny, "flowAny")}
      <div class="cap">${l("ed.bindings")}</div>
      <label class="field">${l("ed.temp_entity")}
        <cp-entity-picker .hass=${this.hass} .value=${e.bindings?.temp || ""}
          @value-changed=${(s) => this._setPipe((i) => i.bindings = { ...i.bindings || {}, temp: s.detail || void 0 })}></cp-entity-picker></label>
      <div class="row" style="margin-top:12px">
        <button ?disabled=${e.bend === void 0 && !e.via} @click=${() => this._setPipe((s) => {
      delete s.bend, delete s.via;
    })}>${l("ed.reset_bend")}</button>
      </div>
    `;
  }
};
jt.properties = {
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
}, jt.styles = [
  fe,
  oe`
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
let Os = jt;
customElements.get("cp-editor") || customElements.define("cp-editor", Os);
function Ui(r) {
  if (!r?.available || r.num === null || !Number.isFinite(r.num)) return;
  const e = (r.unit || "").toLowerCase();
  return e === "kw" ? r.num : e === "mw" ? r.num * 1e3 : r.num / 1e3;
}
const Zi = (r, e) => r.components.find((t) => t.type === e);
function vr(r, e) {
  const t = r?.props.input_labels || {};
  let s = !1, i = !1;
  for (const n of [1, 2, 3, 4]) {
    if (!r || !ee(e.get(r, `input${n}`))) continue;
    const o = t[`input${n}`] || "";
    /14a|evu|sperr/i.test(o) ? s = !0 : /pv|solar|überschuss|surplus/i.test(o) && (i = !0);
  }
  return { dim14a: s, pv: i };
}
function yr(r, e) {
  const t = r.settings.energy;
  return !!e || !!(t?.enabled && (t.pv || t.grid || t.battery || t.house || t.wallbox));
}
function xr(r, e, t) {
  const s = r.settings.energy || {}, i = Zi(r, "outdoor_unit"), n = Zi(r, "indoor_unit"), o = vr(n, e), a = s.limit_14a ?? 4.2, c = !!(s.enabled && (s.pv || s.grid || s.battery || s.house || s.wallbox));
  if (t && !c) {
    const k = t.values.energy;
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
  const p = (k) => e instanceof Hn ? e.realEntity(k) : e.getEntity(k), d = (k) => k ? Ui(p(k)) : void 0, h = d(s.pv);
  let m = d(s.grid);
  m !== void 0 && s.grid_invert && (m = -m);
  let u = d(s.battery);
  u !== void 0 && s.battery_invert && (u = -u);
  const g = s.battery_soc ? p(s.battery_soc) : void 0, b = g?.available && g.num !== null ? g.num : void 0, v = d(s.wallbox), w = i ? Ui(e.get(i, "el_power")) : void 0;
  let x = d(s.house);
  return x !== void 0 ? !t && s.house_includes_hp !== !1 && w !== void 0 && (x -= w) : m !== void 0 && !t && (x = m + (h ?? 0) + (u ?? 0) - (w ?? 0) - (v ?? 0)), x !== void 0 && (x = Math.max(0, x)), { pv: h, grid: m, battery: u, soc: b, house: x, wallbox: v, hp: w, dim14a: o.dim14a, pvSignal: o.pv, limit14a: a };
}
function $r(r) {
  const e = Object.keys(r.states), t = (n) => r.states[n] ? n : void 0, s = (n) => e.find((o) => n.test(o));
  if (t("sensor.evcc_grid_power") || t("sensor.evcc_pv_power"))
    return {
      enabled: !0,
      pv: t("sensor.evcc_pv_power"),
      grid: t("sensor.evcc_grid_power"),
      battery: t("sensor.evcc_battery_power"),
      battery_soc: t("sensor.evcc_battery_soc"),
      house: t("sensor.evcc_home_power"),
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
const kr = 7, Sr = 35, Rn = 4.9;
function Bt(r, e, t = "air") {
  const s = e + 273.15 + 3, i = (t === "air" ? r - 6 : 0) + 273.15;
  return Math.max(1.2, Math.min(8, 0.57 * s / Math.max(5, s - i)));
}
function Mr(r, e, t = Rn, s = "air") {
  return t * Bt(r, e, s) / Bt(kr, Sr, s);
}
function zr(r) {
  return r >= 0.9 ? "green" : r >= 0.75 ? "yellow" : "red";
}
const We = { green: "#3ddc97", yellow: "#f5c542", red: "#ff5a5f" };
function Nn(r, e) {
  const t = r.components.find((g) => g.type === "outdoor_unit"), s = r.components.find((g) => g.type === "indoor_unit");
  if (!t || !s) return;
  const i = (g, b) => {
    const v = e.get(g, b);
    return v?.available && v.num !== null ? v.num : void 0;
  }, n = i(t, "heat_power");
  let o = i(t, "el_power");
  o !== void 0 && e.get(t, "el_power")?.unit === "kW" && (o *= 1e3);
  const a = i(t, "outdoor_temp"), c = i(s, "supply_temp"), p = String(e.get(t, "activity")?.raw ?? "").toLowerCase();
  if (n === void 0 || o === void 0 || a === void 0 || c === void 0 || n < 0.5 || o < 80 || p.includes("defrost") || p.includes("abtau")) return;
  const d = n / (o / 1e3), h = He(t.model).source, m = Mr(a, c, Number(t.props.cop_ref) || Rn, h), u = d / m;
  return { cop: d, expected: m, ratio: u, ampel: zr(u), tOut: a, tFlow: c };
}
function qi(r) {
  return r && r.el > 0.05 ? r.heat / r.el : void 0;
}
const Lt = { heat: 0, el: 0, heatDhw: 0, elDhw: 0, aux: 0 };
function ft(r, e) {
  return {
    heat: r.heat + (e.heat || 0),
    el: r.el + (e.el || 0),
    heatDhw: r.heatDhw + (e.heatDhw || 0),
    elDhw: r.elDhw + (e.elDhw || 0),
    aux: r.aux + (e.aux || 0)
  };
}
function Ke(r) {
  return new Date(r.getFullYear(), r.getMonth(), r.getDate()).getTime();
}
const Ar = {
  heat: ["heat_energy_total"],
  el: ["el_energy_total"],
  heatDhw: ["heat_energy_dhw"],
  elDhw: ["el_energy_dhw"],
  aux: ["aux_energy_total"]
};
async function Er(r, e) {
  const t = e.components.find((v) => v.type === "indoor_unit"), s = {};
  for (const [v, w] of Object.entries(Ar)) {
    const x = w.map((k) => t?.bindings[k]).find(Boolean);
    x && (s[v] = x);
  }
  const i = { today: null, yesterday: null, month: null, year: null, daily: [], estimated: { month: !1, year: !1 } };
  if (!s.heat || !s.el) return { ...i, missing: "no_counters" };
  const n = /* @__PURE__ */ new Date(), o = Object.values(s), a = (v, w) => r.callWS({
    type: "recorder/statistics_during_period",
    start_time: v.toISOString(),
    end_time: n.toISOString(),
    statistic_ids: o,
    period: w,
    types: ["change"],
    units: { energy: "kWh" }
  }), [c, p] = await Promise.all([
    a(new Date(Ke(n) - 30 * 864e5), "day"),
    a(new Date(n.getFullYear(), 0, 1), "month")
  ]), d = /* @__PURE__ */ new Map();
  for (const [v, w] of Object.entries(s))
    for (const x of c[w] || []) {
      const k = Ke(new Date(x.start));
      d.set(k, ft(d.get(k) || Lt, { [v]: x.change || 0 }));
    }
  if (!d.size) return { ...i, missing: "no_statistics" };
  const h = [...d.entries()].sort((v, w) => v[0] - w[0]).map(([v, w]) => ({ day: v, ...w })), m = d.get(Ke(n)) || null, u = d.get(Ke(n) - 864e5) || null;
  let g = Lt, b = null;
  for (const [v, w] of Object.entries(s))
    for (const x of p[w] || [])
      g = ft(g, { [v]: x.change || 0 }), new Date(x.start).getMonth() === n.getMonth() && (b = ft(b || Lt, { [v]: x.change || 0 }));
  return { today: m, yesterday: u, month: b, year: g, daily: h, estimated: { month: !1, year: !1 } };
}
const In = [2, 3, 6.5, 10.5, 14.5, 18, 20, 19.5, 15.5, 10.5, 6, 3], Yi = 0.8;
function xs(r, e, t, s) {
  const i = s ?? In[e], n = r.p, o = n.heatLoad / (21 - n.designTemp);
  let a = 0, c = 0;
  for (const h of [-4, -2, 0, 2, 4]) {
    const m = i + h;
    if (m >= 16) continue;
    const u = o * (21 - m) * 24 * t * 0.2 * 0.85, g = 21 + (21 - m) * ((n.floor ? 35 : 50) - 21) / (21 - n.designTemp);
    a += u, c += u / (Bt(m, g, n.source) * Yi);
  }
  const p = 8.4 * t * (n.dhwL > 0 ? 1 : 0), d = p / (Bt(i, 53, n.source) * Yi);
  return { heat: a + p, el: c + d, heatDhw: p, elDhw: d, aux: 0 };
}
function Cr(r) {
  const e = new Date(r.time * 1e3), t = Ke(e), s = r.dailyEnergy(), i = s.find((p) => p.day === t) || null, n = s.find((p) => p.day === t - 864e5) || null, o = xs(r, e.getMonth(), e.getDate() - 1 + e.getHours() / 24, r.outdoorMean);
  let a = Lt;
  for (let p = 0; p < e.getMonth(); p++) a = ft(a, xs(r, p, new Date(e.getFullYear(), p + 1, 0).getDate()));
  a = ft(a, o);
  const c = [];
  for (let p = 29; p >= 2; p--) {
    const d = t - p * 864e5, h = new Date(d), m = p <= 14 ? (14 - p) / 14 : 0, u = In[h.getMonth()] * (1 - m) + r.outdoorMean * m + Math.sin(p * 1.3) * 2, g = xs(r, h.getMonth(), 1, u), b = 1 + Math.sin(p * 1.7) * 0.18;
    c.push({ day: d, ...g, heat: g.heat * b, el: g.el * b * (1 + Math.cos(p) * 0.04) });
  }
  return {
    today: i,
    yesterday: n,
    month: o,
    year: a,
    daily: [...c, ...s.filter((p) => p.day >= t - 864e5)],
    estimated: { month: !0, year: !0 }
  };
}
const Dr = {
  mode: "fixed",
  price: 0.32,
  feed_in: 0.08,
  gas_price: 0.12,
  gas_eff: 90
};
function ui(r) {
  return { ...Dr, ...r.settings.tariff || {} };
}
function Tr(r) {
  const e = (r || "").toLowerCase();
  return e === "kw" ? 1 : e === "mw" ? 1e3 : 1e-3;
}
function jn(r, e, t, s, i) {
  if (r <= 0) return 0;
  const n = Math.max(0, e), o = t !== void 0 ? t + s + (i ? 0 : r) : r + s;
  return o <= 0.01 ? r : r * Math.min(1, n / o);
}
async function Wr(r, e, t) {
  const i = e.components.find((x) => x.type === "outdoor_unit")?.bindings.el_power, n = e.settings.energy, o = ui(e), a = /* @__PURE__ */ new Map();
  if (!i) return { hours: a, share: !1 };
  const c = [i, n?.grid, n?.house, n?.wallbox, o.mode === "entity" ? o.price_entity : void 0].filter((x) => !!x), p = await r.callWS({
    type: "recorder/statistics_during_period",
    start_time: new Date(Ke(/* @__PURE__ */ new Date()) - t * 864e5).toISOString(),
    end_time: (/* @__PURE__ */ new Date()).toISOString(),
    statistic_ids: c,
    period: "hour",
    types: ["mean"]
  }), d = (x) => {
    const k = /* @__PURE__ */ new Map();
    if (!x) return k;
    const C = Tr(r.states[x]?.attributes?.unit_of_measurement);
    for (const D of p[x] || []) D.mean !== null && D.mean !== void 0 && k.set(D.start, D.mean * C);
    return k;
  }, h = d(i), m = (x, k) => k ? -x : x, u = d(n?.enabled ? n.grid : void 0), g = d(n?.enabled ? n.house : void 0), b = d(n?.enabled ? n.wallbox : void 0), v = /* @__PURE__ */ new Map();
  if (o.mode === "entity" && o.price_entity)
    for (const x of p[o.price_entity] || []) x.mean != null && v.set(x.start, x.mean);
  const w = u.size > 0;
  for (const [x, k] of h) {
    const C = u.get(x), D = C === void 0 ? k : jn(k, m(C, n?.grid_invert), g.get(x), b.get(x) ?? 0, n?.house_includes_hp !== !1);
    a.set(x, { hp: k, grid: D, price: v.get(x) });
  }
  return { hours: a, share: w };
}
function Pr(r) {
  const e = (a) => r.history("energy", a, 24), t = e("hp_power"), s = e("grid_power"), i = e("house_power"), n = e("wallbox_power"), o = /* @__PURE__ */ new Map();
  return t.forEach((a, c) => {
    const p = Math.floor(a.t * 1e3 / 36e5) * 36e5, d = (a.v ?? 0) / 1e3, h = jn(d, (s[c]?.v ?? 0) / 1e3, (i[c]?.v ?? 0) / 1e3, (n[c]?.v ?? 0) / 1e3, !1), m = o.get(p) || { hp: 0, grid: 0 };
    m.hp += d / 60, m.grid += h / 60, o.set(p, m);
  }), o;
}
function $s(r, e, t, s, i) {
  const n = ui(s), o = /* @__PURE__ */ new Map();
  for (const [a, c] of e) {
    const p = Ke(new Date(a)), d = o.get(p) || { hp: 0, grid: 0, priced: 0, gridForPrice: 0 };
    d.hp += c.hp, d.grid += c.grid, c.price !== void 0 && (d.priced += c.grid * c.price, d.gridForPrice += c.grid), o.set(p, d);
  }
  return r.map((a) => {
    const c = o.get(a.day);
    let p, d = !1;
    c && c.hp > 0.05 && (t || i) ? p = Math.min(1, c.grid / c.hp) : i ? (p = Math.max(0.45, Math.min(0.92, 0.6 + a.el / 60)), d = !0) : p = 1;
    const h = c && c.gridForPrice > 0.01 ? c.priced / c.gridForPrice : n.price, m = a.el * p, u = a.el - m;
    return {
      day: a.day,
      el: a.el,
      grid: m,
      self: u,
      heat: a.heat,
      cost: m * h,
      feedLoss: u * n.feed_in,
      gas: a.heat / Math.max(0.5, n.gas_eff / 100) * n.gas_price,
      estimated: d,
      noShare: !t && !i
    };
  });
}
async function Lr(r, e, t, s) {
  if (!r.length) return [];
  if (t) return $s(r, Pr(t), !0, e, !0);
  if (!s) return $s(r, /* @__PURE__ */ new Map(), !1, e, !1);
  const { hours: i, share: n } = await Wr(s, e, 31);
  return $s(r, i, n, e, !1);
}
function ks(r) {
  if (!r.length) return null;
  const e = { el: 0, grid: 0, self: 0, heat: 0, cost: 0, feedLoss: 0, gas: 0, estimated: !1, noShare: !1 };
  for (const t of r)
    e.el += t.el, e.grid += t.grid, e.self += t.self, e.heat += t.heat, e.cost += t.cost, e.feedLoss += t.feedLoss, e.gas += t.gas, e.estimated ||= t.estimated, e.noShare ||= t.noShare;
  return e;
}
function ze(r, e, t) {
  r.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
}
const Kt = class Kt extends se {
  constructor() {
    super(...arguments), this.plant = null;
  }
  connectedCallback() {
    super.connectedCallback(), this._cfg = structuredClone(this.plant?.settings?.wizard || Ds());
  }
  _upd(e) {
    this._cfg = { ...this._cfg, ...e };
  }
  _generate() {
    this.plant && !confirm(l("wz.replace_confirm")) || ze(this, "plant-generated", ds(this._cfg, this.plant));
  }
  render() {
    const e = this._cfg, t = (s, i = "text") => f`<input type=${i} .value=${String(e[s] ?? "")}
      @change=${(n) => {
      const o = n.target.value;
      this._upd({ [s]: i === "number" ? Number(o) : o });
    }} />`;
    return f`
      <div class="card wrap">
        <h2>${l("wz.title")}</h2>
        <p class="muted">${l("wz.intro")}</p>
        <label class="field">${l("wz.name")} ${t("name")}</label>

        <h3>${l("wz.hp")}</h3>
        <div class="grid">
          <label class="field">${l("wz.outdoor")}
            <select @change=${(s) => this._upd({ outdoorModel: s.target.value })}>
              ${Ot.map((s) => f`<option value=${s.id} ?selected=${s.id === e.outdoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${l("ed.label")} ${t("outdoorLabel")}</label>
          <label class="field">${l("ed.nominal")} ${t("nominalKw", "number")}</label>
          <label class="field">${l("wz.indoor")}
            <select @change=${(s) => this._upd({ indoorModel: s.target.value })}>
              ${di.map((s) => f`<option value=${s.id} ?selected=${s.id === e.indoorModel}>${s.label}</option>`)}
            </select></label>
          <label class="field">${l("ed.label")} ${t("indoorLabel")}</label>
          <div class="field check">
            <label><input type="checkbox" .checked=${e.aux} @change=${(s) => this._upd({ aux: s.target.checked })} /> ${l("wz.aux")}</label>
            ${e.aux ? f`<label class="field">${l("wz.aux_kw")} ${t("auxKw", "number")}</label>` : y}
          </div>
        </div>

        <h3>${l("wz.buffer")}</h3>
        <div class="grid">
          <div class="radios">
            ${["parallel", "serial", "none"].map(
      (s) => f`<label><input type="radio" name="buf" .checked=${e.buffer === s} @change=${() => this._upd({ buffer: s })} /> ${l(`wz.buffer.${s}`)}</label>`
    )}
          </div>
          ${e.buffer !== "none" ? f`<label class="field">${l("wz.buffer_volume")} ${t("bufferVolume", "number")}</label>
                <label class="field">${l("ed.label")} ${t("bufferLabel")}</label>` : y}
        </div>

        <h3>${l("wz.dhw")}</h3>
        <div class="grid">
          <div class="radios">
            ${["tank", "none"].map(
      (s) => f`<label><input type="radio" name="dhw" .checked=${e.dhw === s} @change=${() => this._upd({ dhw: s })} /> ${l(`wz.dhw.${s}`)}</label>`
    )}
          </div>
          ${e.dhw === "tank" ? f`<label class="field">${l("wz.dhw_volume")} ${t("dhwVolume", "number")}</label>
                <label class="field">${l("ed.label")} ${t("dhwLabel")}</label>
                <label class="check"><input type="checkbox" .checked=${e.circulation} @change=${(s) => this._upd({ circulation: s.target.checked })} /> ${l("wz.circulation")}</label>` : y}
        </div>

        <h3>${l("wz.circuits")}</h3>
        ${e.circuits.map(
      (s, i) => f`<div class="circuit">
            <b>${l("wz.circuit", { n: i + 1 })}</b>
            <input .value=${s.label} @change=${(n) => this._circ(i, { label: n.target.value })} />
            <select @change=${(n) => this._circ(i, { emitter: n.target.value })}>
              <option value="radiators" ?selected=${s.emitter === "radiators"}>${l("type.radiators")}</option>
              <option value="floor_heating" ?selected=${s.emitter === "floor_heating"}>${l("type.floor_heating")}</option>
            </select>
            <label class="check"><input type="checkbox" .checked=${s.mixed} @change=${(n) => this._circ(i, { mixed: n.target.checked })} /> ${l("wz.mixed")}</label>
            <button class="ghost danger" ?disabled=${e.circuits.length < 2} @click=${() => this._upd({ circuits: e.circuits.filter((n, o) => o !== i) })}>${l("wz.remove")}</button>
          </div>`
    )}
        <button ?disabled=${e.circuits.length >= 4} @click=${() => this._upd({ circuits: [...e.circuits, { emitter: "floor_heating", mixed: !0, label: l("wz.circuit", { n: e.circuits.length + 1 }) }] })}>
          ${L("plus")} ${l("wz.add_circuit")}</button>

        <h3>${l("wz.extras")}</h3>
        <div class="radios">
          <label><input type="checkbox" .checked=${e.separator} @change=${(s) => this._upd({ separator: s.target.checked })} /> ${l("wz.separator")}</label>
          <label><input type="checkbox" .checked=${e.expansion} @change=${(s) => this._upd({ expansion: s.target.checked })} /> ${l("wz.expansion")}</label>
        </div>

        <div class="row actions">
          <button @click=${() => this._cfg = Ds()}>${l("wz.example")}</button>
          <span class="spacer"></span>
          <button class="primary" @click=${this._generate}>${L("wand")} ${l("wz.generate")}</button>
        </div>
      </div>
    `;
  }
  _circ(e, t) {
    const s = this._cfg.circuits.map((i, n) => n === e ? { ...i, ...t } : i);
    this._upd({ circuits: s });
  }
};
Kt.properties = { plant: { attribute: !1 }, _cfg: { state: !0 } }, Kt.styles = [
  fe,
  oe`
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
let Vs = Kt;
const Ft = class Ft extends se {
  constructor() {
    super(...arguments), this._res = null, this._sel = /* @__PURE__ */ new Set(), this._busy = !1, this._msg = "";
  }
  async _scan() {
    this._busy = !0;
    try {
      this._res = await this.api.scan(this.plant), this._sel = new Set(
        this._res.suggestions.filter((e) => !this._comp(e.component_id)?.bindings[e.slot]).map((e) => `${e.component_id}|${e.slot}`)
      );
    } finally {
      this._busy = !1;
    }
  }
  _comp(e) {
    return this.plant.components.find((t) => t.id === e);
  }
  _apply() {
    if (!this._res) return;
    const e = structuredClone(this.plant);
    let t = 0;
    for (const s of this._res.suggestions) {
      if (!this._sel.has(`${s.component_id}|${s.slot}`)) continue;
      const i = e.components.find((n) => n.id === s.component_id);
      i && (i.bindings[s.slot] = s.entity_id, t++);
    }
    ze(this, "save", e), this._msg = l("map.applied", { count: t });
  }
  render() {
    const e = !!this.hass?.__standalone, t = this._res, s = this.plant.components.flatMap(
      (i) => Ae(i).filter((n) => !i.bindings[n.key] && !t?.suggestions.some((o) => o.component_id === i.id && o.slot === n.key)).map((n) => ({ c: i, s: n }))
    );
    return f`<div class="card">
      <h2>${l("map.title")}</h2>
      <p class="muted">${l("map.intro")}</p>
      ${e ? f`<p class="muted">${l("map.standalone")}</p>` : y}
      <div class="row">
        <button class="primary" ?disabled=${this._busy || e} @click=${this._scan}>${L("search")} ${l("map.scan")}</button>
        ${t ? f`<span class="muted">${l("map.found", { count: t.entity_count })}</span>` : y}
        <span class="spacer"></span>
        ${this._msg ? f`<span class="ok">${L("check")} ${this._msg}</span>` : y}
      </div>
      ${t && t.entity_count === 0 ? f`<div class="help"><b>${l("map.none")}</b><p>${l("map.none_help")}</p></div>` : y}
      ${t && t.suggestions.length ? f`<div class="tbl">
            <table>
              <thead><tr>
                <th><input type="checkbox" .checked=${this._sel.size === t.suggestions.length}
                  @change=${(i) => this._sel = i.target.checked ? new Set(t.suggestions.map((n) => `${n.component_id}|${n.slot}`)) : /* @__PURE__ */ new Set()} /></th>
                <th>${l("map.component")}</th><th>${l("map.slot")}</th><th>${l("map.entity")}</th><th>${l("map.value")}</th><th>${l("map.confidence")}</th>
              </tr></thead>
              <tbody>
                ${t.suggestions.map((i) => {
      const n = `${i.component_id}|${i.slot}`, o = this._comp(i.component_id), a = o?.bindings[i.slot], c = this.hass?.states[i.entity_id];
      return f`<tr>
                    <td><input type="checkbox" .checked=${this._sel.has(n)} @change=${(p) => {
        const d = new Set(this._sel);
        p.target.checked ? d.add(n) : d.delete(n), this._sel = d;
      }} /></td>
                    <td>${o?.label || i.component_id}</td>
                    <td>${Te(o?.type || "", i.slot)}</td>
                    <td><code>${i.entity_id}</code>${a && a !== i.entity_id ? f`<div class="muted small">${l("map.current")}: ${a}</div>` : y}</td>
                    <td>${c ? `${c.state} ${c.attributes.unit_of_measurement || ""}` : "–"}</td>
                    <td><span class="conf ${i.confidence}">${l(`map.conf.${i.confidence}`)}</span></td>
                  </tr>`;
    })}
              </tbody>
            </table>
          </div>
          <div class="row"><span class="spacer"></span><button class="primary" ?disabled=${!this._sel.size} @click=${this._apply}>${l("map.apply")} (${this._sel.size})</button></div>` : y}
      <h3>${l("map.unbound")}</h3>
      <p class="muted small">${l("map.unbound_hint")}</p>
      <div class="chips">${s.slice(0, 80).map(({ c: i, s: n }) => f`<span class="chip">${i.label || i.id}: ${Te(i.type, n.key)}</span>`)}</div>
    </div>`;
  }
};
Ft.properties = {
  plant: { attribute: !1 },
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _res: { state: !0 },
  _sel: { state: !0 },
  _busy: { state: !0 },
  _msg: { state: !0 }
}, Ft.styles = [
  fe,
  oe`
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
let Bs = Ft;
const Hr = ["outdoor_unit", "indoor_unit", "buffer", "dhw_tank", "pump", "valve_3way", "mixer", "radiators", "floor_heating", "tap", "separator", "expansion_vessel"], Gt = class Gt extends se {
  constructor() {
    super(...arguments), this.icons = /* @__PURE__ */ new Map(), this._err = "", this._iso = !1;
  }
  async _upload(e) {
    const t = e.target, s = t.files?.[0];
    if (t.value = "", !s) return;
    if (this._err = "", s.size > 256 * 1024) {
      this._err = l("ic.err.too_large");
      return;
    }
    const i = await new Promise((n, o) => {
      const a = new FileReader();
      a.onload = () => n(String(a.result).split(",")[1] || ""), a.onerror = () => o(a.error), a.readAsDataURL(s);
    });
    try {
      await this.api.uploadIcon(s.name.replace(/\.[^.]+$/, ""), s.type || "image/svg+xml", i, this._iso), ze(this, "icons-changed");
    } catch (n) {
      const o = n?.code || n?.error?.code || "invalid_data";
      this._err = l(`ic.err.${o}`);
    }
  }
  async _delete(e) {
    await this.api.deleteIcon(e), ze(this, "icons-changed");
  }
  _typeDefault(e, t) {
    const s = structuredClone(this.plant);
    s.settings.typeIcons = { ...s.settings.typeIcons || {} }, t ? s.settings.typeIcons[e] = t : delete s.settings.typeIcons[e], ze(this, "save", s);
  }
  /** Where an icon is in use: components with it as their own icon, types with it as default. */
  _usage(e) {
    const t = this.plant.components.filter((i) => i.icon === e).map((i) => i.label || l(`type.${i.type}`)), s = Object.entries(this.plant.settings.typeIcons || {}).filter(([, i]) => i === e).map(([i]) => l(`type.${i}`));
    return !t.length && !s.length ? f`<div class="use muted">${l("ic.unused")}</div>` : f`<div class="use">
      ${t.length ? f`<div>${l("ic.used_by", { list: t.join(", ") })}</div>` : y}
      ${s.length ? f`<div>${l("ic.default_for", { list: s.join(", ") })}</div>` : y}
    </div>`;
  }
  /** Components of this type that use an own icon (they override the type default). */
  _ownHint(e) {
    const t = this.plant.components.filter((n) => n.type === e), s = t.filter((n) => n.icon && this.icons.has(n.icon));
    if (!s.length) return y;
    const i = s.length === 1 && t.length === 1 ? l("ic.own_one", { name: this.icons.get(s[0].icon).name }) : l("ic.own_some", { n: s.length, m: t.length });
    return f`<span class="hint">${i}</span>`;
  }
  render() {
    const e = [...this.icons.values()];
    return f`<div class="card">
      <h2>${l("ic.title")}</h2>
      <p class="muted">${l("ic.intro")}</p>
      <div class="row">
        <label class="btn primary up">${L("upload")} ${l("ic.upload")}
          <input type="file" accept=".svg,.png,.webp,.jpg,.jpeg,image/svg+xml,image/png,image/webp,image/jpeg" @change=${this._upload} hidden /></label>
        <label class="row small"><input type="checkbox" .checked=${this._iso} @change=${(t) => this._iso = t.target.checked} /> ${l("ic.iso")}</label>
        ${this._err ? f`<span class="err">${this._err}</span>` : y}
      </div>
      ${e.length ? f`<div class="gallery">${e.map(
      (t) => f`<div class="ic">
              <div class="prev"><img src=${t.data_url} alt=${t.name} /></div>
              <div class="name">${t.name}${t.iso ? f` <span class="muted">· iso</span>` : y}</div>
              ${this._usage(t.id)}
              <button class="ghost danger icon" @click=${() => this._delete(t.id)}>${L("trash")}</button>
            </div>`
    )}</div>` : f`<p class="muted">${l("ic.empty")}</p>`}
      <h3>${l("ic.type_default")}</h3>
      <div class="defaults">
        ${Hr.map(
      (t) => f`<label class="field">${l(`type.${t}`)}
            <select @change=${(s) => this._typeDefault(t, s.target.value)}>
              <option value="">${l("ed.icon_default")}</option>
              ${e.map((s) => f`<option value=${s.id} ?selected=${this.plant.settings.typeIcons?.[t] === s.id}>${s.name}</option>`)}
            </select>${this._ownHint(t)}</label>`
    )}
      </div>
    </div>`;
  }
};
Gt.properties = { plant: { attribute: !1 }, api: { attribute: !1 }, icons: { attribute: !1 }, _err: { state: !0 }, _iso: { state: !0 } }, Gt.styles = [
  fe,
  oe`
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
let Rs = Gt;
const Ut = class Ut extends se {
  constructor() {
    super(...arguments), this.version = "", this._backups = null, this._tariff = null, this._bmsg = "", this._energy = null, this._note = "";
  }
  _tariffSection() {
    const e = { ...ui(this.plant), ...this._tariff || {} }, t = (i) => this._tariff = { ...this._tariff || {}, ...i }, s = (i, n, o) => f`<label class="field">${n}<input type="number" step=${o} min="0" .value=${String(e[i])}
        @change=${(a) => t({ [i]: Number(a.target.value) })} /></label>`;
    return f`<div class="card wrap">
      <h2>${l("st.tariff")}</h2>
      <p class="muted">${l("st.tariff_hint")}</p>
      <div class="grid2">
        <label class="field">${l("st.t_mode")}
          <select @change=${(i) => t({ mode: i.target.value })}>
            <option value="fixed" ?selected=${e.mode === "fixed"}>${l("st.t_fixed")}</option>
            <option value="entity" ?selected=${e.mode === "entity"}>${l("st.t_entity")}</option>
          </select></label>
        ${e.mode === "entity" ? f`<label class="field">${l("st.t_entity_pick")}
              <cp-entity-picker .hass=${this.hass} .value=${e.price_entity || ""} @value-changed=${(i) => t({ price_entity: i.detail || void 0 })}></cp-entity-picker></label>` : s("price", l("st.t_price"), "0.01")}
        ${s("feed_in", l("st.t_feed_in"), "0.001")}
        ${s("gas_price", l("st.t_gas"), "0.01")}
        ${s("gas_eff", l("st.t_gas_eff"), "1")}
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._tariff} @click=${() => {
      this._patch({ tariff: { ...this.plant.settings.tariff || {}, ...this._tariff } }), this._tariff = null;
    }}>${L("save")} ${l("st.save")}</button></div>
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
  async _restore(e) {
    if (!(!this.api || !confirm(l("bk.restore_confirm", { date: new Date(e.ts * 1e3).toLocaleString() }))))
      try {
        ze(this, "plant-restored", await this.api.restoreBackup(e.ts)), this._bmsg = l("bk.restored"), await this._loadBackups();
      } catch (t) {
        this._bmsg = t?.message || String(t);
      }
  }
  _export() {
    const e = new Blob([JSON.stringify(this.plant, null, 2)], { type: "application/json" }), t = document.createElement("a"), s = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10), i = (this.plant.name || "plant").replace(/[^\w-]+/g, "_");
    t.href = URL.createObjectURL(e), t.download = `copilot-${i}-${s}.json`, t.click(), setTimeout(() => URL.revokeObjectURL(t.href), 1e3);
  }
  async _import(e) {
    const t = e.target, s = t.files?.[0];
    if (t.value = "", !!s)
      try {
        const i = JSON.parse(await s.text());
        if (!Array.isArray(i.components) || !Array.isArray(i.pipes) || !i.grid) throw new Error(l("bk.invalid"));
        if (!confirm(l("bk.import_confirm", { name: i.name || s.name, n: i.components.length }))) return;
        i.settings = { ...this.plant.settings, ...i.settings || {} }, ze(this, "save", i), this._bmsg = l("bk.imported"), setTimeout(() => this._loadBackups(), 800);
      } catch (i) {
        this._bmsg = `${l("bk.invalid")} (${i?.message || i})`;
      }
  }
  _backupSection() {
    const e = (t) => l(`bk.reason.${t}`);
    return f`<div class="card wrap">
      <h2>${l("bk.title")}</h2>
      <p class="muted">${l("bk.hint")}</p>
      <div class="row">
        <button @click=${this._export}>${L("download")} ${l("bk.export")}</button>
        <label class="filebtn">${L("upload")} ${l("bk.import")}
          <input type="file" accept="application/json,.json" @change=${this._import} /></label>
        ${this._bmsg ? f`<span class="muted">${this._bmsg}</span>` : y}
      </div>
      ${this._backups === null ? y : this._backups.length ? f`<ul class="backups">
              ${this._backups.map(
      (t) => f`<li>
                  <div><b>${new Date(t.ts * 1e3).toLocaleString()}</b>
                    <span class="muted"> · ${e(t.reason)}${t.version ? ` · v${t.version}` : ""} · ${l("bk.components", { n: t.components })}</span></div>
                  <button @click=${() => this._restore(t)}>${L("undo")} ${l("bk.restore")}</button>
                </li>`
    )}
            </ul>` : f`<p class="muted">${l(this.api?.standalone ? "bk.demo" : "bk.none")}</p>`}
    </div>`;
  }
  _en() {
    return this._energy ?? this.plant.settings.energy ?? {};
  }
  _setEn(e) {
    this._energy = { ...this._en(), ...e };
  }
  _detect() {
    if (!this.hass) return;
    const e = $r(this.hass), t = Object.entries(e).some(([s, i]) => typeof i == "string" && s !== "enabled");
    this._energy = { ...this._en(), ...e }, this._note = l(t ? "st.energy_detected" : "st.energy_none");
  }
  _saveEnergy() {
    this._patch({ energy: this._en() }), this._energy = null, this._note = "";
  }
  _energySection() {
    const e = this._en(), t = (i, n) => f`<label class="field">${n}
        <cp-entity-picker .hass=${this.hass} .value=${e[i] || ""}
          @value-changed=${(o) => this._setEn({ [i]: o.detail || void 0 })}></cp-entity-picker></label>`, s = (i, n, o = !1) => f`<label class="check"><input type="checkbox" .checked=${e[i] ?? o}
        @change=${(a) => this._setEn({ [i]: a.target.checked })} />${n}</label>`;
    return f`<div class="card wrap">
      <h2>${l("st.energy")}</h2>
      <p class="muted">${l("st.energy_hint")}</p>
      ${s("enabled", l("st.energy_enabled"))}
      ${this.hass && !this.hass.__standalone ? f`<div class="row"><button @click=${this._detect}>${L("search")} ${l("st.energy_detect")}</button>
            ${this._note ? f`<span class="muted">${this._note}</span>` : y}</div>` : y}
      <div class="grid2">
        ${t("pv", l("st.e_pv"))}
        <div>${t("grid", l("st.e_grid"))}${s("grid_invert", l("st.e_grid_invert"))}</div>
        <div>${t("battery", l("st.e_battery"))}${s("battery_invert", l("st.e_battery_invert"))}</div>
        ${t("battery_soc", l("st.e_soc"))}
        <div>${t("house", l("st.e_house"))}${s("house_includes_hp", l("st.e_house_hp"), !0)}</div>
        ${t("wallbox", l("st.e_wallbox"))}
        <label class="field">${l("st.e_limit")}
          <input type="number" step="0.1" min="0" .value=${String(e.limit_14a ?? 4.2)}
            @change=${(i) => this._setEn({ limit_14a: Number(i.target.value) })} /></label>
      </div>
      <div class="row"><span class="spacer"></span>
        <button class="primary" ?disabled=${!this._energy} @click=${this._saveEnergy}>${L("save")} ${l("st.save")}</button></div>
    </div>`;
  }
  _patch(e) {
    const t = structuredClone(this.plant);
    t.settings = { ...t.settings, ...e }, ze(this, "save", t);
  }
  render() {
    const e = this.plant.settings;
    return f`<div class="card wrap">
      <h2>${l("st.title")}</h2>
      <label class="field">${l("st.style")}
        <select @change=${(t) => this._patch({ style: t.target.value })}>
          <option value="flat" ?selected=${e.style === "flat"}>${l("st.style.flat")}</option>
          <option value="iso" ?selected=${e.style === "iso"}>${l("st.style.iso")}</option>
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${e.demo} @change=${(t) => this._patch({ demo: t.target.checked })} />
        <span><b>${l("st.demo")}</b><br /><span class="muted">${l("st.demo_hint")}</span></span></label>
      <label class="field">${l("st.language")}
        <select @change=${(t) => this._patch({ language: t.target.value })}>
          ${["auto", "de", "en"].map((t) => f`<option value=${t} ?selected=${(e.language || "auto") === t}>${t === "auto" ? l("st.lang.auto") : t === "de" ? "Deutsch" : "English"}</option>`)}
        </select></label>
      <label class="toggle"><input type="checkbox" .checked=${!!e.write_non_admin} @change=${(t) => this._patch({ write_non_admin: t.target.checked })} />
        <span><b>${l("st.write_non_admin")}</b><br /><span class="muted">${l("st.write_hint")}</span></span></label>
      <label class="field">${l("st.heat_load")}
        <input type="number" step="0.1" .value=${String(e.heat_load ?? 6.2)} @change=${(t) => this._patch({ heat_load: Number(t.target.value) })} /></label>
      <div class="row foot">
        <span class="muted">${l("st.version")} ${this.version}</span>
        <button class="ghost" @click=${() => ze(this, "show-credits")}>${L("info")} ${l("st.about")}</button>
        <span class="spacer"></span>
        <button class="danger" @click=${() => confirm(l("st.reset_confirm")) && ze(this, "reset-plant")}>${l("st.reset")}</button>
      </div>
    </div>
    ${this._energySection()}
    ${this._tariffSection()}
    ${this._backupSection()}`;
  }
};
Ut.properties = {
  plant: { attribute: !1 },
  version: {},
  hass: { attribute: !1 },
  api: { attribute: !1 },
  _energy: { state: !0 },
  _note: { state: !0 },
  _backups: { state: !0 },
  _tariff: { state: !0 },
  _bmsg: { state: !0 }
}, Ut.styles = [
  fe,
  oe`
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
let Ns = Ut;
for (const [r, e] of [
  ["cp-wizard", Vs],
  ["cp-mapping", Bs],
  ["cp-icons", Rs],
  ["cp-settings", Ns]
])
  customElements.get(r) || customElements.define(r, e);
const Zt = class Zt extends se {
  constructor() {
    super(...arguments), this.points = [], this.color = "var(--cp-accent)", this.step = !1;
  }
  render() {
    const e = this.points.filter((u) => u.v !== null);
    if (e.length < 2) return f`<div class="empty">${l("ov.no_history")}</div>`;
    const t = 300, s = 90, i = e[0].t, n = e[e.length - 1].t;
    let o = Math.min(...e.map((u) => u.v)), a = Math.max(...e.map((u) => u.v));
    a - o < 1e-6 && (a += 1, o -= 1);
    const c = (a - o) * 0.1;
    o -= c, a += c;
    const p = (u) => (u - i) / Math.max(1, n - i) * t, d = (u) => s - (u - o) / (a - o) * s;
    let h = `M ${p(e[0].t)} ${d(e[0].v)}`;
    for (let u = 1; u < e.length; u++)
      this.step ? h += ` H ${p(e[u].t)} V ${d(e[u].v)}` : h += ` L ${p(e[u].t)} ${d(e[u].v)}`;
    const m = `${h} L ${t} ${s} L 0 ${s} Z`;
    return f`<svg viewBox="0 0 ${t} ${s}" preserveAspectRatio="none">
      <defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color=${this.color} stop-opacity="0.35" /><stop offset="1" stop-color=${this.color} stop-opacity="0" />
      </linearGradient></defs>
      ${S`<path d=${m} fill="url(#sg)" /><path d=${h} fill="none" stroke=${this.color} stroke-width="2" vector-effect="non-scaling-stroke" />`}
    </svg>`;
  }
};
Zt.properties = { points: { attribute: !1 }, color: {}, step: { type: Boolean } }, Zt.styles = oe`
    :host { display: block; height: 90px; }
    svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .empty { height: 100%; display: grid; place-items: center; color: var(--cp-muted); font-size: 12px; }
  `;
let Is = Zt;
const qt = class qt extends se {
  constructor() {
    super(...arguments), this.canWrite = !1, this.demo = !1, this._draft = null, this._confirm = !1, this._wmsg = "", this._busy = !1, this.slotKey = "", this.x = 0, this.y = 0, this.version = 0, this._hist = null, this._loadedFor = "";
  }
  updated() {
    const e = `${this.component?.id}:${this.slotKey}`;
    e !== this._loadedFor && this.component && (this._loadedFor = e, this._hist = null, this._draft = null, this._confirm = !1, this._wmsg = "", this.src.history(this.component, this.slotKey, 24).then(
      (t) => this._hist = t,
      () => this._hist = []
    ));
  }
  _close() {
    this.dispatchEvent(new CustomEvent("close", { bubbles: !0, composed: !0 }));
  }
  _more(e) {
    this.dispatchEvent(new CustomEvent("hass-more-info", { detail: { entityId: e }, bubbles: !0, composed: !0 })), this._close();
  }
  /** Change control for values released as writable. */
  _writer() {
    const e = this.component, t = e.bindings?.[this.slotKey], s = Ln(t);
    if (!t || !s || !(e.writable || []).includes(this.slotKey)) return y;
    if (this.demo) return f`<div class="w muted small">${l("wr.demo")}</div>`;
    if (!this.canWrite) return f`<div class="w muted small">${l("wr.no_permission")}</div>`;
    const i = this.hass?.states[t], n = i?.attributes || {}, o = i?.state, a = this._draft ?? (s === "number" ? Number(o) : s === "switch" ? o === "on" : o ?? null), c = (m) => typeof m == "boolean" ? l(m ? "wr.on" : "wr.off") : s === "number" ? `${j(Number(m), 1)} ${n.unit_of_measurement || ""}` : String(m), p = s === "button" || String(a) !== String(s === "switch" ? o === "on" : s === "number" ? Number(o) : o), d = async () => {
      this._busy = !0;
      try {
        await this.writer(e.id, this.slotKey, s === "button" ? null : a), this._wmsg = l("wr.done"), this._draft = null;
      } catch (m) {
        this._wmsg = `${l("wr.failed")}: ${m?.message || m}`;
      } finally {
        this._busy = !1, this._confirm = !1;
      }
    };
    let h;
    if (s === "number") {
      const m = Number(n.min ?? 0), u = Number(n.max ?? 100), g = Number(n.step ?? 1);
      h = f`<div class="wrow">
        <input type="range" min=${m} max=${u} step=${g} .value=${String(a)} @input=${(b) => this._draft = Number(b.target.value)} />
        <input class="wnum" type="number" min=${m} max=${u} step=${g} .value=${String(a)} @change=${(b) => this._draft = Number(b.target.value)} />
        <span class="muted">${n.unit_of_measurement || ""}</span></div>`;
    } else s === "select" ? h = f`<select @change=${(m) => this._draft = m.target.value}>
        ${(n.options || []).map((m) => f`<option value=${m} ?selected=${m === a}>${m}</option>`)}</select>` : s === "switch" ? h = f`<label class="wsw"><input type="checkbox" .checked=${!!a} @change=${(m) => this._draft = m.target.checked} /> ${l(a ? "wr.on" : "wr.off")}</label>` : h = y;
    return f`<div class="w">
      <div class="cap">${l("wr.title")}</div>
      ${h}
      ${this._confirm ? f`<div class="wconfirm">
            <div>${s === "button" ? l("wr.press_confirm") : l("wr.confirm", { old: c(s === "switch" ? o === "on" : o), new: c(a) })}</div>
            <div class="row"><button @click=${() => this._confirm = !1}>${l("cancel")}</button><span class="spacer"></span>
              <button class="primary" ?disabled=${this._busy} @click=${d}>${L("check")} ${l("wr.apply")}</button></div>
          </div>` : f`<div class="row"><span class="spacer"></span>
            <button class="primary" ?disabled=${!p} @click=${() => this._confirm = !0}>${l(s === "button" ? "wr.press" : "wr.change")}</button></div>`}
      ${this._wmsg ? f`<div class="muted small">${this._wmsg}</div>` : y}
    </div>`;
  }
  render() {
    if (!this.component) return y;
    const e = this.component, t = ut(e, this.slotKey), s = this.src.get(e, this.slotKey), { text: i, unit: n } = Ne(s, t), o = this.src.entityOf(e, this.slotKey), a = this._hist || [], c = a.map((g) => g.v).filter((g) => g !== null), p = t === "temp" && s?.num !== null && s?.num !== void 0 ? _e(s.num, "#3ddc97") : "var(--cp-accent)", d = 320, h = Math.max(12, Math.min(window.innerWidth - d - 12, this.x - d / 2)), m = Math.max(12, Math.min(window.innerHeight - 260, this.y + 14)), u = e.type === "value_tile" ? this.slotKey : Te(e.type, this.slotKey);
    return f`
      <div class="backdrop" @pointerdown=${this._close}></div>
      <div class="pop card" style="left:${h}px; top:${m}px; width:${d}px">
        <div class="row head">
          <div>
            <div class="title">${u}</div>
            <div class="muted sub">${e.label}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${this._close} aria-label=${l("close")}>${L("close")}</button>
        </div>
        <div class="now"><span class="val">${i}</span><span class="unit">${n}</span></div>
        <div class="muted cap">${l("ov.history24")}</div>
        ${this._hist === null ? f`<div class="loading"></div>` : f`<cp-sparkline .points=${a} .color=${p} .step=${t === "bool"}></cp-sparkline>`}
        ${c.length && t !== "bool" && t !== "enum" ? f`<div class="row stats">
              <span>${l("ov.min")} <b>${j(Math.min(...c))}</b></span>
              <span>${l("ov.max")} <b>${j(Math.max(...c))}</b></span>
            </div>` : y}
        ${this._writer()}
        ${o ? f`<div class="row foot"><code>${o}</code><span class="spacer"></span>
              <button @click=${() => this._more(o)}>${l("ov.open_entity")}</button></div>` : y}
      </div>
    `;
  }
};
qt.properties = {
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
}, qt.styles = [
  fe,
  oe`
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
let js = qt;
const Or = { info: "info", notice: "notice", warning: "warn", error: "error" };
function Vr(r) {
  const e = { ...r.params };
  return e.label_sfx = e.label ? ` (${e.label})` : "", r.key === "value_changed" && (e.slot_label = e.type ? Te(e.type, e.slot) : e.slot), r.key === "maintenance_due" && (e.task = e.task_key ? l(`mt.${e.task_key}`) : e.title), l(`msgk.${r.key}`, e);
}
const Yt = class Yt extends se {
  constructor() {
    super(...arguments), this.messages = [], this.compact = !1, this.canClear = !1, this._filter = "all";
  }
  _row(e) {
    const t = e.end_ts ? e.end_ts - e.ts : null;
    return f`<li class="msg ${e.level} ${e.active ? "active" : ""}">
      <span class="lv">${L(Or[e.level] || "info")}</span>
      <div class="body">
        <div class="text">${Vr(e)}</div>
        <div class="meta">
          ${ko(e.ts)}
          ${e.active ? f` · <b>${l("msg.active")}</b>` : t !== null ? f` · ${l("msg.duration", { duration: So(t) })}` : y}
        </div>
      </div>
    </li>`;
  }
  render() {
    const e = [...this.messages].sort((n, o) => o.ts - n.ts), t = this._filter === "all" ? e : e.filter((n) => n.level === this._filter), s = t.filter((n) => n.active), i = t.filter((n) => !n.active).slice(0, this.compact ? 12 : 300);
    return f`
      ${this.compact ? y : f`<div class="row filters">
            ${["all", "error", "warning", "notice", "info"].map(
      (n) => f`<button class=${this._filter === n ? "primary" : ""} @click=${() => this._filter = n}>
                ${l(n === "all" ? "msg.filter_all" : `msg.level.${n}`)}</button>`
    )}
            <span class="spacer"></span>
            ${this.canClear ? f`<button @click=${() => this.dispatchEvent(new CustomEvent("clear"))}>${L("trash")} ${l("msg.clear")}</button>` : y}
          </div>`}
      ${s.length ? f`<h4>${l("msg.active")}</h4><ul>${s.map((n) => this._row(n))}</ul>` : y}
      <h4>${l("msg.history")}</h4>
      ${i.length ? f`<ul>${i.map((n) => this._row(n))}</ul>` : f`<div class="empty muted">${l("msg.empty")}</div>`}
    `;
  }
};
Yt.properties = {
  messages: { attribute: !1 },
  compact: { type: Boolean },
  canClear: { type: Boolean },
  _filter: { state: !0 }
}, Yt.styles = [
  fe,
  oe`
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
let Ks = Yt;
customElements.get("cp-sparkline") || customElements.define("cp-sparkline", Is);
customElements.get("cp-slot-popover") || customElements.define("cp-slot-popover", js);
customElements.get("cp-messages") || customElements.define("cp-messages", Ks);
const Br = "data:font/woff2;base64,d09GMgABAAAAABwYAA4AAAAAxZgAABu/AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGlQbh0AchXIGYACFABEICoLgRIKUPguDWAABNgIkA4ccBCAFgzAHhVgbyZyjoqSyzkUUpYM1aWQg2DgAKO9N2X85nsjwY6uClRPVtPC4KO8z4wnW1FKCyHhgGBGv+MjCZB/9i3/4m1uhnFb7yppX+eQYHHeXIk9Uv7f17Dti0CEKFS2FTElICiMRwkP5JE8j7z+Dcq7ZJFXEiniQEyup4F6smBXxQnoQTkQ5EdeX8fz/35v73Ok2qcsj2IqNfk7VT2kCQ2naFcLhAGet5/9X93lD9zm/J6hANVAFegN1zqz+C9TbVOgONFA6dAXierAK5I7015r+K8tE5QrkgHZLuNeJLNwVV5XwlckBXS1vCgCusv+z/O6iv9rMRN8kwd/SGges/p+Va8683P1IW6EqmYwFI2v1JXniK/ifY+qfTL8qYpqCpBSAB8RGA57fTQoACowfl/7sveavNYX7sBVK4n9f2ndtGsKa49KUcbDdVDgkwu0t95BYtl4OizBIJAihwf/aq1/0V3tTgDQSsojt+Mk+43g3WW+jtck16APet8/tlnS735Osn2X/2ZQIW4CRNMhiM2x956fy5Hb7skxwljmEUY1RdaNrfPxlXsPpPUlnlt88VSjyaEzWa0xrSLuav5kJX676FysgdgQEhDX6f1MCjgCLiDvkKFAoiOkU8uuVYAxADDQYZYihiH1uI+64g3bPfbRHnqIRME+rBHWaoMuBW18htMASA/T/CkEnaVDe5zwE3j6uqTnKZQio3y8IaI6aREpcQEgRRlqEnjkL3tzm5d7cara4HuyjrhHSqGEWN4mFO2a//0cee+KFV15746133hND/dGehLhkqDj66Z05ATuTIq7uGvHNG6I89RKBekYQTzHk7WpCqVFlWLF3seVSirKMYCml2yCVIo8hL3/IbyKDdL9d8jU3OO/zCATCJNN4Y4hIroPadfKyFHkcn8chl22nEyzJlyHtbn573YB8jemKXIfrwT/w5311N6+oh1qOWqTJw5Yf62+i4P00JBej56tBrsvgNNbgOkdDEgWISZYZD2tYfDrE2S07O/IrxXEJMKgpaswhzg5M4ioBmwF4Zgh8/n7uVmBNT+aUknSVokCsIvX0GhlVaDFANQnCN4yErffmQGjQjlvyjpZPP7vZW7MwevZhBxEfFcWzaDmJznHphhP9SvpFdBGLuK7VP6BLRrHo+olec0TCiiN3NBez5MCtuYgFe67NGeYUXJrTzNhxbkyRs+W0bEPI2HxrQPsczbLmcV3VbMLrpfNoMfoQnvZVfXUVuF95lRE32WV2lh1nBxvvBsEwmlFMxAgTMymTrAvzkeKkrfMlBXEcEFEaRYHfzKsOka3IUCvK3o7hK5xeIYMZ3z+DeMdymoLllx6MUmIQit5AlAwEkSG9mZ4oDuQIRgfaMqNQLIlNTcQUEiP6Mna4kabQg+hGCT0xKL7kaIQCoXTlMIcIlgWXkAIEMcO7S8pnQYT1e9OegKcS/VO2Psy39yiCGpHzM+lIBxHUsgoAV/HkOYPaV4CpGWa9z7ivL4v8dByFvQ2a7cBo7iuLvAB5LA7soEEBKjfRyJvKlBFwjsVwAkv8BBviP0lMNnWwTtf9etgIzdAy2mdHwbqwHqw325kNYePYjV573rbe9v8HS1icEEujir6oHPSAllbasU6sW5fBTyAtcA90bxg6D56D1T/Lv/cm92FyCL7fAN83eusrmbV7szkvP4qAOIZ1d/e8ehiWZTDgf1wz12LzHXDOBUustc40R8y20QLLzLLUKSectNB5DHMWrNhw4MiJMw+eWF68+epJyQ9HRS1QkGAhwqw23Ro3LfdGuHgJkqTIkCmLXqFiJUqVMajXqIlRC56gXR99DbDSdaucsdc8+xyy32E3XPLaZUNsdtYmV7x1zWkTTfLCbRfN8NIEQ20x1RQdFpESEZOTkDFjyZ4tOwruXLhyY81HV5101l0Xx3QTQEPLX6hemkWLEClWlBhxEqVLpZOmQI5ceZKVq1ahUq0qx9VoY9Jbq34a9NdDnTue2GC9HXbajiBtK4AxkB/IA3CxCVzuAumBzAEAhf4uDjR4Eyz3/RfsXHsazg0pECpNQBN5iKHRGFSLbZvQdRBOfTKTQZDwmqrV5aCM1vInuHYzLG/TDRbFiixCPaJInoNKHTb1UVBQoSI+KtTqJ6qK7ynJbEmiGaWxDzdbVOoJUZMAeR9naiglY23J40KSBHBseHrpZ3p2J3g2ik2juMDsippWa5yHWVzdFgOsHVqiJQCPuHKes6GBZJKSAJ4uBYTtSEt/B2of6GYQkB0tPhvicLvJDbAFIpGJsIu/LOrXkl8LsNOntUgoMVVVTyb821E3p2YQAE+kutO3QAvAAkGxNb7uAYQS4Byy3B40hyCsqThjVgHu94f4BA95FX0YIHAV38fiLAg4wS5vrIAIbFt9C9frxSKiYKMA/1WM5e5N9WnnGOsr0pjAGAMD0mmBsiqthRY7bEOzm06QUgCtiG3GqrCyvNEY6otS1iPSakFnU4AU7wd44JQ8HYuTdY6S3hF+pfBYIAUn2blTAk0dbuDwWQGHkdNCHN/7xqB6L+Dy+xP3FjIroRhFJ3fXk9NQcVpMDMGdSUlCXlYsmntX1N3nRemYyVllABAPNEqpdOhUBIq6CjTds/gvSSzS6dC210iiY85K+URgDh6l87dAQAlFtLOubqGNdkFnAiV10461usC9Jd0peTYqd/faKDRoEzY7S3qAPH2wcm6kKPQDbfW8Ba1uq21aHhWvouGCbwQaoS1oju45+sDaA2Ttqr1zA5prpQLhtoIvclA7bAfSokDDJHNQmsfHTcGQgfzR7mCSzc8wr19NPzqGCj4V2McOvvo6uJg+Lu8zwNBeQbLt1WD422leDR6hdtHOiRXidxK4zHGOrBpzE6HF1WPe8gtXpeZdzxiJp2AVVpExXGNl0vGta8UaY7TDTYfOCUWTZnLfT1I5+H3qig7ZFzbYPq2hciP7FWwfoBNr4RnLLMzXLwdmyeO631+A/j0C9DmGHDidfVnAqcDog8XfodiA2M6nneRgGwdipDMCgIx/JVeKGLrt4zczCLXs+STn/W5Xqci8AbGmcPqNR6XuqtK2j2+jlgFLNM9qv1UttZ0gGVd7JxDVDXNHG9/z5OZOkpFRJpm8juSBHhKe8LxMmUbRVJRSc9iqBAwQVShzzvJ5Um1WFcm185IVzOBSQN3SBL52dbmPW8eQO4T5pYQT2AbJGd8WxUfMPBGXkzkhmc6VA3k0QaFbPRHer7TD8nm+ShMUD1802fRs3FXWeq2BSROKpsQzF6+ijLhAva7gILdJ35ZmjobNFgBCdPzvbGBMJstCQoGzzVGps19NfNDLFUU259DlrttklFHB4Zw/bkqT7CbXPM3OZ8ZcY/MxsWPktdTsHKIja6eQanejNUE1dqG9vEPlWXYUBo/xWQMUWjqk81VVqMg45otXdqeqMAPNqDzYY5PpuU+LjvZI1jRO+2fQ+wBKl4jfrrUvSNI2KOBoAOklDZaa95Gm6vnGtNvrA7ybrLNQxfVUI0q6/3YWcTdhN1GrBmiKww6r0AAMr4Z1gCUf289UjPrJbotYW4cWnttgpFqaMp8J7ddLdHWv0KJ23+dNELhJAHU4KM2NSm6syWRbzPhwpVd+fgeBKwu1I1t5yppePuQjcg6XemaRY6sgN28tTUzue35I9KQNjuYhw4qJgj5GnwPfWJ8av0HIGnGkoVirkKk+bzEnn2BTe+M+I4CcPTt9xAHSNTx6VZpWJIpQrgs5XIcBsccGeFcJhLM1nD2cnNdjKq3it+TKOjQyJ4Kz1Uo0S4Bbahvri3Mna9MTAly9z57sWVaiHXLcHHN4V5emKbGCFJGG1rwcL2WZ+XAXrLKtxy0A3qiutc6xSHftdsmWv93LrBmJXFVALtXHQhXqR/7r+k82RvHZyLkvJVSNipB4/7XNmJi0CmV5YX6FvQ5KrQkW3MwJPPLcyRsolllI0kRZAgy+U4lN180Z4TKTbW1RSzc+2yVO8e2XXeZf8jlW2fX2zm7814wFdVa6alhVuGAG01ADBHBDpE5atmt6lRfF6aXRBxDxZ74Q3ihq/X/PuLQD1fKXwpGzDVq6ftI6SclebYgrvolKIvUg2ufRq0yjcdNFySHLq7rEkfIq572PaJMCKijG0bgt+cF+9A6+VOdu6VJSOWu1V1CLJ/LMTz6tbCKDPWo5w8dmGbJCyBbo2Bp0z7ZY2esIWFowjN1im/eQImMbn9/2tn1rVo2bH7K3QeAjswjbPWidvxmRupAqeETpUn+TvQ7GhqNCVuexIM5FgpNlA5SIdVPWPS5P7kV5v8L7VIo3+b0RjatV4HKb1BrX0staf8FOWEYZQtQuNRrV225uMwaqrJfmzphrUjIvTdNy+DrcJmUI4Jlms7iYDXn+imi+rpsVqVhbucvQLMAp0eAKFocBfzcv32YsmHsI9LT1BmCJ7VnqqzOruN3iVIfsg/IYCzuXTQ6O5m5DZId+AnD+TLAjIpwHLss4WVSpYfttsJ06M1FNW2k4JF5SoJ5Si0YAkkjxSp8lBo/a8eSxIbanGP5tQrmC2lVPGVYNy235o1PW/X/wmDJE/VnbhXeiaK0IsdeebCakUX/nqfHERPurhaZGwTZU8OlDitO5THZqYmWlZP8TOthEU+xQAtOQnVKcm5LeuRZfwRKxOfcEzi0UwU5K02nLHF+k32kQCzvnEs8ZziV8NmZHUwdtYlb4+0Ci2Tcn/orU/tmo6Ic7BMock69ro3WZDYIKGVCqyp2w6Y44DhCdFr8E6iFOEF9ic7Ni0b7bOMgRj1sTsPkXts/QKcSltG2JVKh3nNK0i/eknQveLZDsApsDu48CwL1+m+QgUjnyNgkipUkpz9jnOVUDl/zYC5nCAmEtG1FDT36DYUMh7579VgHAUuoNfW6Fj6285yS70Fji/Kiud67ddmcF+lMf8O9Jm62FvAiMPH1whqSwJ1WSFXoIpApji3qDveIV9sdbLanfqjSrl7CZvCOQIUOTeoOLFux8AffshXbHpKWZ72bo1E6L2LsCp5LFOVvEowgPRGGgVwMO8YFpMbC0sWroLNAzHxLuW6fLhC06tNCgC1caBB50jouiBC8kljYNOJI8ftEYIiL9jqFGArBPDJ8v5gxHUC+laL7QRy0ruIPSXLCs5PYLLCu6gxKgGmPabDQKAC30ia79c/HOt3Harv+k7Wm48eONTYfQBzsMbZeZiqw+BwURCYESX9/T8djxGO6Cehvoml1p57OvQK8H0ahZexGiGjzxQOXIJ6dVvfb94sJbct0JLu3OInGBVe5yU9JTB/hLxg8NwaHLlJtsyK59RX/mA7qnue8QfME0l66BhUNGXf9eAj2JLzSfILEfpoL0KOJcwdmt3QhbRtbDubfA8rRHYHk6IB/gSQTWrI4YrM8LTqgncyLIyJAhFzJTo13oygtZhLjtsj3qqra06NGBOeWIEymPfbmQ1N6wrCZXRMcdG3+Ahq7tSCD/jl0+bOmIT3bT3Dp3Laq/SFK6nMbYLoRBhNJLW3MPzFPTj2Oc6f4Gv3Lyv+SDEG7fVy7UBi09uswfXjhBxoyVS/g9PlA9PUZTfvQNDFp4qpzsxpcncqaP9GHx8zBmjGW+vTOLxHtfrRsTQLseSNChu59jmfdsA83yAYeo1jnzoCNhVXfb5m5SbyfoMH5B5cHHx4xnNnTCk4o4nzsoOc1dEzr9y8uN4PzaKUlFTk6ay5z6XsDp/Co272eN1psOcpB5MAeepeqNjTCLq7ZK0+pCqLomRW/sTCrq2VKpwwBRomfTm2LyoN/ZGBDjtumsvA+v3L2h5CGYYUZPXDhk8tKfljI4Oe75GkTfTfsJV+aLDDAvLV8fGzhZUqLRS9Pjqnu0ZTwYVHTYUejxW742VWmMYUrK5wGGb/5JBiLiM0aAl/gpxqOhgotD5slhLqq6o42tRFrrqn4w5x3+i0qxxznS+ZTmFFK1D/Sggnskfzqk/8mUqX+cw+zfMvSS+AC38Jmx9sWTk1B3NrhATyqVhcUi2i1kcY6e1jzS3SD+WSRKFez4ZRJBA7HCSFRRvw44krUM14wEZfjzS13o8IemtMhW64aYmnIKyDnxFgZ5tlpRFlyvLBpiXUuqyutyELOa49Mwd9DlSmm8EEzfwosRQ8Syi0OWdFjzBwHe9CPcl5OOe8Qm3F86WXu6HK2VO/7gkwU24gLF7eYObQELexoGSsIFp22k/4DtJqrl0hxmeIUr7264zmPQbp/SAfPUuJp7qrsQ13ef0mp/0GtEHS5qZ3jogsV2jnBQI8M/bQT3dEy9apCnoqqisW7lmtqL2pE2wisbmfnN1v0xJLFM44eySd9i4PcH3RCEyRVI34c7eJnOWAKaUOh5aSUNU3ZjuxNrF5GqIzaY55uLq3mL5PlzSYBqpW44M4NXmHYI3kbe/EwLl7sINq2Md+Qn3Xm9ZAq81ezIpLdwvwgRbMlykGMI6GXm04smeGd9pTp2OnRiDBOS6eGw+YxxA64t4WbdzRlfXX5AZq9GCDfy0zMeVITCmgubGUNo1wYy1nVuJzilAipeIwJHfhsnCWcO17sDdYcTo3mY5+N1zs0zIwh3fANe1BewSbL1e2862Dnpr3o5uqIbhMrmf47MgPNZb140scDLlFHU1wt2G0+81sKfa78CPfekpxjMOEIY/B7KhwOb2ZBnPcPRKxC/oIOOP3boL6zqVPv+6KHgnST90ZUcYDXAIdFmd///M5/go/E/Zh7uyP7bAiVFB4nAQddy2nMGZem75KQSB9NMHzQDYwd9r9Tx+D5YJHVQl5d6K6sz3gCWSFPrxm/B8rzGXmGKGq/vNR21oB0LeXoh7t6MzoWBC+ubh/Ah6Y8xoOueemzppiHkgJdEu+hWXRNTXKL+p7RG+paF1lLfrGPsDGiToGwMucpFt7AwtiH7P0VEdNGsmdwOa2mabdIO7e6DNYEcETDacQ0TVnat9PU94b1imwCIRY5NwgiR5hewBTplkEXolelLUcUL7RJ6d2M/e0f/FYJlaOCvcBcycnoLfomUaV0b0Vnhb1lbnz0fVHBlmXlJT8NQW3E80EDb+Lj4y39kNrxRUbtQ2IXg/QHV4Tl2ysCfANQh9aNUkDJ7D3U6toYmCCwNRJzgh+CE6zWvME7R81DHqkdox2RdxLcyTOixCImJAZVmOgodnyM2lSqbbZoYsnsbIuwiiXDtqhEsZxGJYcv5FhcDb70au7ER2SIG6pA6IPndFo2phxmQCIF+75NS5KTHu/sLzARWG8dXOKLEsqK24Fl+yc352h4Vp+3wGiI1a2qqDlTj1cw3iIWvHcomCqfQM/HeuDXG+KsfN04H67dbldS6RP3A0gtiaP3/X3D7ydWrW57sXoPFExoe+bTQOUx816JocH1u37UxWtz1gjDsCch90t2o5kAlbqK4FRVl4HuNN3amVkGKS8lxs9RUjXVta1RLR9W+v6QZQqzjdc3IYLVKhEPekWasMb701Qu2vARdIX8fO8cUKrrvgf/kTHGCtQUAS0LiCaKd0kngCy4qgT4vlZuLvGmh/BU4FIOiEgf02Am7WzgJ0PFRALa1PtoSR1T3rTEJdiRksRW7Lg5mfNx4vzn13sG5hVI9SLUW/Ej1X1EMqlwzI8ZgVehjRX44H0ePQ0FKA9dC3TE944ODruyV4XrJUsMuLZa34ujQllgi5roZde3V2VUns7QgJZakxPZmLfajUMIoy4ZLYv2903ad/YXdokFseMH+7rTNdGGP+0sBfH5xQQcP9cDztTWGL60n/3mNQK7KlLlLIONfOICNC8FvIHBaERBLTWLHUxSB48WH1HSwtnSie3UdLx11LGqEX0DDjMaj3I5VlTR0fAO+3i+87J6D5zi9BiwvQ39dqwRHKYoXZU/08nNEpFLTZxu3KgAwLixcmURbxVe/yGgppL5vlD0hTdJkdalBjqsGvN8VfzEzkD8h+F93i/WMFkASof8LJoOSrWVqVesFkfE0AYz36Q0by7badB50hhrzS+1aBOd2ko1Nf1uRF9xy4LcbNmd0wKcvBV6/q/D6BpBheQB5BM2eBCsS0m5ZI9+yAt7dGft028jG+LEGkMFs7UZT1iNhz7F259+STC9JWgle1yC+eQi7MW12gxF1qf/6EGpjgCQuqeoDKtSqgqQLkfopQLvhXt1kQmDBsEWOlUCDe+cUb9FuKI1xXUK7II3eiztBWCJDsCShxBea9S3OZLlEL7GHATMepMPSkUmXD6MfgUV68wzgtnl0O8PtDeXLExG6VEO4aIhFlw+jH7kTbMiUErZSZVdwuOi77jIog4iI+I58ZtkI90mTmjHNnRh9z3pMtqneQ6sra2tbVkpUsyLiLQpgBLD9CziA9DRLm5jSuGY+xdHB6bw8yLZkfSiZGqauEtYaRjqANSkqjosIRzb4SrhEYWGexg0rTm+GSAGvKYTYOmANW6De/eS5tKt8kV4cAQVv/6O7cquwfylNvwU+v/s3AF9ba4//GbfO2pE1mEEBAodFMyCPGestkjYTfyOeBgo927c7dOSkATKPUwYiyd/hdnAQmW1vk45I8mdbJygXZyiReZAxdkJBoDKpiTJmC0Ok4KDYYx/ODkyXgpPTIRY6yuljpRa2SUYE46SguQX+fUQk+dAxpuP0rcf4GF4fmUWRjrF5HKmPnI7Q/8BwELp5jH4pTwc1k+cQ1PdL+ULT5X1bAp08vggYu0fsNOnnVrT0QrNq0chQBvhwfltNyB2tpljaXk3jjKhmuKgHUXQ6iKO1v1dLWvBOIDAJ4cdPmyqtGpgI2ii1aWCkxGtVx0+GBDp5cmioafSiV6NOO6MKrfLUaNWmAa8FS02Jw+HkXWGd+Y81VK5U+dKF1tcTp2TRWDyT/taDdX1C7fYcFZWe2IPr1WBNBDKxKK9RjSrpqtHaCerxPViV1ZVJDaFHo5TqFVc1isJr0LT8AZWq8Jp1QwH0UdQgZq97DClQaL7OOaPSJlU269BJZ9W6eKerGmedd0E33fXQ00WXXHZFr4Myel611K66ps4N02yxlcYnWv4CBApy0y31bgsWIlSYD8LFabj5x9KoRbOl4iXgJXoviUmrNr0lS5FK5w5BH31Do11aGKTLkClLP3r9DTTIAMsMtk22z3LkyjNevgJDDDPcUIWKFCvx0X6lEeGoYxZZzI6CPQeOnDhz4cotYiIhUhz0E7/wGxYinTCWOysbMFYQs+FtORE5D7ZiIkMZgwhRzJjbYTvryLHOeocdccpOu+y2x8mYYZRDJDHHaLNZ+uIr9mJ58TRDhZWkfMiMM8ZEE0wyUrm3omNBLIkVsY5NbGMXRezjEMc4xTkuJnvsrili3ffIvWF6rk4na1Aa+Spjjj5V0t7SwKk1gXRtee12DBcTHKPVgzUOByEnq/Y+D5+WGRudM4aLjsNAjjlBBu9jsVqt8ufI1nBBuwbKzgePu+bS5MySVVS1C2sfL9V0iGiZ0GCs9qtrLep5vqmiki+aZF7NC3s+57gfrA7sxMCYWA==", Kn = "github.com/junky84", Xi = "https://github.com/junky84", Rr = "CP-VT323", Nr = [
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
], Ir = Nr.flatMap((r, e) => {
  const t = [];
  let s = 0;
  for (; s < r.length; ) {
    if (r[s] !== "#") {
      s++;
      continue;
    }
    const i = s;
    for (; r[s] === "#"; ) s++;
    t.push(S`<rect x=${i} y=${e} width=${s - i} height="1" />`);
  }
  return t;
}), Ji = (r) => f`<svg class=${r} viewBox="0 0 24 26" shape-rendering="crispEdges" aria-hidden="true"><g fill="currentColor">${Ir}</g></svg>`;
let Et = null;
function jr() {
  if (!Et)
    try {
      Et = new FontFace(Rr, `url(${Br}) format("woff2")`).load().then((e) => document.fonts.add(e)).catch(() => {
      });
    } catch {
      Et = Promise.resolve();
    }
  return Et;
}
const Qi = (r) => r.replace(/[&<>"]/g, (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[e]);
function en(r, e, t) {
  if (!e) return;
  const s = r.get(e, t);
  return s?.available && s.num !== null && s.num !== void 0 ? s.num : void 0;
}
function Kr(r, e) {
  if (r.settings.demo) return ["y", "simulated"];
  let t = 0, s = 0;
  for (const i of r.components)
    if (!(i.type !== "outdoor_unit" && i.type !== "indoor_unit"))
      for (const [n, o] of Object.entries(i.bindings || {}))
        o && (t++, e.get(i, n)?.available && s++);
  return t ? s ? ["g", "online"] : ["r", "offline"] : ["y", "not configured"];
}
function Fr(r, e, t, s = /* @__PURE__ */ new Date()) {
  const i = r.components, n = (E) => i.filter((W) => W.type === E), o = n("outdoor_unit")[0], a = n("indoor_unit")[0], c = o ? He(o.model).refrigerant : void 0, p = (E) => Number(E.props?.volume) > 0 ? ` (${Math.round(Number(E.props.volume))} l)` : "", d = (E) => E.length > 42 ? E.slice(0, 41) + "…" : E, h = [];
  o && h.push(["Outdoor Unit", o.label + (c ? ` (${c})` : "")]), a && h.push(["Indoor Unit", a.label]), n("buffer").forEach((E) => h.push(["Buffer", E.label + p(E)])), n("dhw_tank").forEach((E) => h.push(["DHW Cylinder", E.label + p(E)])), i.filter((E) => E.type === "radiators" || E.type === "floor_heating").slice(0, 4).forEach((E) => h.push(["Heating Circuit", E.label])), h.push(["Source Code", Kn]);
  const m = Math.max(...h.map(([E]) => E.length)), u = t ? /^\d/.test(t) ? ` v${t}` : ` ${t}` : "", [g, b] = Kr(r, e), v = [
    ["w", "junky84 Modular BIOS v4.51PG, A Heat Pump Ally"],
    ["", `Copyright (C) 1984-${s.getFullYear()}, junky84`],
    ["", ""],
    ["y", `COPILOT${u.toUpperCase().replace(" V", " v")} OPEN-SOURCE RELEASE`],
    ["", ""],
    ["", "Main Processor : COP-Core 1984 @ 84MHz"],
    ["mem", ""],
    ["", ""],
    ["gw", `<span class="${g}">${b}</span>`],
    ["", "Initialize Plant Components..."],
    ["", ""],
    ...h.map(([E, W]) => ["", `Detecting ${E.padEnd(m)} ... ${d(W)}`])
  ];
  let w = en(e, o, "el_power");
  w !== void 0 && o && e.get(o, "el_power")?.unit === "kW" && (w *= 1e3);
  const x = en(e, o, "heat_power"), k = x !== void 0 && w !== void 0 && w > 50 && x > 0.2 ? (x / (w / 1e3)).toFixed(1) : "--", D = `${`${String(s.getMonth() + 1).padStart(2, "0")}/${String(s.getDate()).padStart(2, "0")}/${s.getFullYear()}`}-${c || "HP"}-J84-COP${k}-00`;
  return { lines: v, code: D };
}
const Fn = (r, e) => `Memory Test    :  ${r}K${e ? " OK" : ""}`;
function tn([r, e]) {
  return r === "mem" ? Fn(65536, !0) : r === "gw" ? `EMS-ESP Plug and Play Gateway ..... ${e}` : r ? `<span class="${r}">${Qi(e)}</span>` : Qi(e);
}
const Xt = class Xt extends se {
  constructor() {
    super(...arguments), this.plant = null, this.src = null, this.version = "", this._token = 0, this._running = !1, this._finish = null;
  }
  get _dlg() {
    return this.renderRoot.querySelector("dialog");
  }
  async open() {
    const e = this._dlg;
    if (!e || !this.plant || !this.src) return;
    e.open || e.showModal(), e.focus();
    const t = ++this._token;
    if (await jr(), t !== this._token) return;
    const { lines: s, code: i } = Fr(this.plant, this.src, this.version), n = this.renderRoot.querySelector("pre"), o = this.renderRoot.querySelector(".foot"), a = () => {
      o.innerHTML = `Press <a href="${Xi}" target="_blank" rel="noopener">DEL</a> to visit ${Kn}, ESC to exit<br>${i}`;
    };
    if (o.innerHTML = "", this._finish = () => {
      this._token++, this._running = !1, n.innerHTML = s.map(tn).join(`
`), a();
    }, matchMedia("(prefers-reduced-motion: reduce)").matches) return this._finish();
    this._running = !0;
    const c = [];
    let p = 0;
    const d = (u, g) => window.setTimeout(() => t === this._token && g(), u), h = () => n.innerHTML = c.join(`
`), m = () => {
      if (p >= s.length) {
        this._running = !1, a();
        return;
      }
      const u = s[p++];
      if (u[0] === "mem") {
        const g = c.push("") - 1;
        let b = 0;
        const v = () => {
          b = Math.min(65536, b + 2048), c[g] = Fn(b, b >= 65536), h(), d(b < 65536 ? 28 : 260, b < 65536 ? v : m);
        };
        return v();
      }
      c.push(tn(u)), h(), d(u[0] === "gw" || u[1].startsWith("Detecting") ? 480 : u[1] === "" ? 90 : 160, m);
    };
    m();
  }
  _onClick(e) {
    e.target.closest("a") || (this._running && this._finish ? this._finish() : this._dlg?.close());
  }
  _onKey(e) {
    e.stopPropagation(), e.key === "Delete" || e.key === "Backspace" ? (e.preventDefault(), window.open(Xi, "_blank", "noopener")) : (e.key === "Enter" || e.key === " ") && this._running && this._finish && (e.preventDefault(), this._finish());
  }
  render() {
    return f`<dialog tabindex="-1" aria-label="About COPilot" @click=${this._onClick} @keydown=${this._onKey}
      @close=${() => {
      this._dlg?.open || (this._token++, this._running = !1);
    }}>
      <div class="bios">
        <div class="head">${Ji("mark")}<pre></pre><div class="ally">${Ji("big")}<b>junky84</b></div></div>
        <div class="foot"></div>
      </div>
    </dialog>`;
  }
};
Xt.properties = { plant: { attribute: !1 }, src: { attribute: !1 }, version: {} }, Xt.styles = oe`
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
let Fs = Xt;
customElements.get("cp-credits") || customElements.define("cp-credits", Fs);
function sn(r, e) {
  let t = 0, s = r.length - 1;
  if (!(s < 0 || r[0].t > e)) {
    for (; t < s; ) {
      const i = t + s + 1 >> 1;
      r[i].t <= e ? t = i : s = i - 1;
    }
    return r[t];
  }
}
function nn(r, e, t) {
  if (r)
    return r.raw !== void 0 && (r.v === null || !Number.isFinite(r.v)) ? pi(r.raw, e, t) : r.v === null ? { raw: null, num: null, unit: e, entity: t, available: !1 } : { raw: r.raw ?? r.v, num: r.v, unit: e, entity: t, available: !0 };
}
class mi {
  constructor(e, t, s) {
    this.live = e, this.byEntity = /* @__PURE__ */ new Map(), this.bySlot = /* @__PURE__ */ new Map(), this.from = t, this.to = s, this.t = s;
  }
  /** Load the recorded values of the last `hours` hours. */
  static async load(e, t, s, i, n = []) {
    const o = Date.now() / 1e3, a = new mi(t, o - s * 3600, o);
    if (t instanceof Pn && i) {
      const c = new Set(n);
      for (const p of e.components) Object.values(p.bindings || {}).forEach((d) => d && c.add(d));
      for (const p of e.pipes) p.bindings?.temp && c.add(p.bindings.temp);
      if (c.size) {
        const p = await i.callWS({
          type: "history/history_during_period",
          start_time: new Date(a.from * 1e3).toISOString(),
          end_time: new Date(o * 1e3).toISOString(),
          entity_ids: [...c],
          minimal_response: !0,
          no_attributes: !0,
          significant_changes_only: !1
        });
        for (const [d, h] of Object.entries(p)) {
          const m = i.states[d]?.attributes?.unit_of_measurement;
          a.byEntity.set(d, { unit: m, pts: h.map((u) => ({ t: u.lu, v: Number.isFinite(Number(u.s)) ? Number(u.s) : null, raw: String(u.s) })) });
        }
      }
      return a;
    }
    return await Promise.all(
      e.components.flatMap(
        (c) => Ae(c).map(async (p) => {
          const d = t.get(c, p.key);
          if (d === void 0) return;
          const h = await t.history(c, p.key, s);
          h.length && a.bySlot.set(`${c.id}.${p.key}`, { pts: h, unit: d.unit });
        })
      )
    ), a;
  }
  /** Earliest recorded time (to limit the slider). */
  get start() {
    let e = this.to;
    for (const t of [this.byEntity, this.bySlot]) for (const s of t.values()) s.pts.length && (e = Math.min(e, s.pts[0].t));
    return Math.max(this.from, e);
  }
  get empty() {
    return this.byEntity.size === 0 && this.bySlot.size === 0;
  }
  entityOf(e, t) {
    return this.live.entityOf(e, t);
  }
  get(e, t) {
    const s = this.live.entityOf(e, t);
    if (s) return this.getEntity(s);
    const i = this.bySlot.get(`${e.id}.${t}`);
    return i ? nn(sn(i.pts, this.t), i.unit) : void 0;
  }
  getEntity(e) {
    const t = this.byEntity.get(e);
    return t ? nn(sn(t.pts, this.t), t.unit, e) : void 0;
  }
  history(e, t, s) {
    return this.live.history(e, t, s);
  }
}
const Xe = (r, ...e) => r.components.find((t) => e.includes(t.type));
function Gn(r) {
  const e = (s, i) => {
    if (!s) return;
    const n = r.get(s, i);
    return n?.available && n.num !== null && Number.isFinite(n.num) ? n.num : void 0;
  };
  return { num: e, on: (s, i) => {
    const n = e(s, i);
    if (n !== void 0) return n > 0;
    if (!s) return !1;
    const o = String(r.get(s, i)?.raw ?? "").toLowerCase();
    return ["on", "true", "an", "ein", "1", "yes"].includes(o);
  } };
}
const pt = (r) => Math.round(r * 10) / 10;
function Gr(r, e) {
  const { num: t, on: s } = Gn(e), i = Xe(r, "outdoor_unit"), n = Xe(r, "indoor_unit"), o = Xe(r, "buffer"), a = Xe(r, "dhw_tank"), c = Xe(r, "radiators", "floor_heating"), p = Xe(r, "tap"), d = r.components.find((I) => I.type === "pump" && I.props.role === "circulation"), h = i ? ke(i, e) : /* @__PURE__ */ new Set(), m = n ? ke(n, e) : /* @__PURE__ */ new Set(), u = [];
  if (!i && !n) return u;
  const g = He(i?.model).source === "brine", b = t(i, "outdoor_temp"), v = t(i, "heat_power");
  let w = t(i, "el_power");
  w !== void 0 && i && e.get(i, "el_power")?.unit !== "kW" && (w /= 1e3);
  const x = v !== void 0 && w !== void 0 && w > 0.05 && v > 0.2 ? v / w : void 0, k = t(i, "compressor_speed"), C = t(n, "supply_temp"), D = t(n, "return_temp"), E = t(n, "target_flow_temp") ?? t(c, "target_flow_temp"), W = t(o, "temp_top") ?? t(n, "buffer_temp"), Y = t(a, "temp_top") ?? t(n, "dhw_temp"), U = t(a, "setpoint") ?? t(n, "dhw_setpoint"), re = t(n, "aux_level"), Z = t(c, "heating_limit") ?? 16, ae = i ? rt(e.get(i, "activity")) : void 0, ie = h.has("running"), O = ae === "hot_water" || ie && m.has("b"), P = O || s(a, "charging") || m.has("charging"), F = g ? "ground" : "air", K = h.has("defrost");
  if (h.has("alarm") ? u.push({ id: "alarm", tone: "error", key: "ex.alarm", params: {}, comp: i?.id }) : h.has("defrost") ? u.push({ id: "defrost", tone: "cold", key: "ex.defrost", params: { out: b }, hint: "ex.defrost_hint", comp: i?.id }) : ie && O ? u.push({
    id: "dhw",
    tone: "dhw",
    key: Y !== void 0 && U !== void 0 ? "ex.dhw_charge" : "ex.dhw_charge_short",
    params: { dhw: Y, set: U },
    hint: "ex.dhw_charge_hint",
    comp: a?.id ?? n?.id
  }) : ie ? u.push({
    id: "heating",
    tone: "heat",
    key: v !== void 0 && w !== void 0 ? `ex.heating_${F}` : `ex.heating_${F}_short`,
    params: { out: b, heat: v !== void 0 ? pt(v) : void 0, el: w !== void 0 ? pt(w) : void 0 },
    comp: i?.id
  }) : b !== void 0 && b >= Z ? u.push({ id: "off", tone: "info", key: "ex.off_limit", params: { out: b, limit: Z }, comp: i?.id }) : W !== void 0 && E !== void 0 && W >= E - 1 ? u.push({ id: "off", tone: "info", key: "ex.off_buffer", params: { buf: W, target: E }, hint: "ex.off_buffer_hint", comp: o?.id ?? n?.id }) : u.push({ id: "off", tone: "info", key: "ex.off", params: {}, comp: i?.id }), ie && !h.has("defrost") && x !== void 0 && u.push({
    id: "cop",
    tone: x >= 3.5 ? "eco" : x >= 2.5 ? "info" : "warn",
    key: "ex.cop",
    params: { cop: pt(x), speed: k },
    hint: k !== void 0 ? "ex.cop_modulating" : void 0,
    comp: i?.id
  }), !O && !K && E !== void 0 && b !== void 0 && b < Z && u.push({
    id: "curve",
    tone: "heat",
    key: C !== void 0 ? "ex.curve" : "ex.curve_short",
    params: { out: b, target: E, sup: C },
    hint: "ex.curve_hint",
    comp: n?.id
  }), ie && !O && !K && C !== void 0 && D !== void 0) {
    const I = C - D;
    u.push({
      id: "spread",
      tone: I >= 3 && I <= 8 ? "eco" : I >= 2 && I <= 10 ? "info" : "warn",
      key: I < 2 ? "ex.spread_low" : I > 10 ? "ex.spread_high" : "ex.spread_ok",
      params: { spread: pt(I), sup: C, ret: D },
      comp: n?.id
    });
  }
  if (W !== void 0 && (o || Le(n)?.id === "tp70")) {
    const I = m.has("pc1") || r.components.some((pe) => pe.type === "pump" && pe.props.circuit === 1 && ke(pe, e).has("running")), le = ie && !O && !K && C !== void 0 && C - W > 2;
    u.push({
      id: "buffer",
      tone: le ? "warn" : "info",
      key: le ? "ex.buffer_mixing" : I ? "ex.buffer_pc1" : "ex.buffer",
      params: { buf: W, loss: C !== void 0 ? pt(C - W) : void 0 },
      comp: o?.id ?? n?.id
    });
  }
  const X = t(c, "room_temp");
  if (c && X !== void 0) {
    const I = t(c, "room_setpoint");
    u.push({
      id: "room",
      tone: I !== void 0 && X < I - 1 ? "warn" : "info",
      key: I !== void 0 ? "ex.room" : "ex.room_short",
      params: { room: X, set: I, name: c.label },
      comp: c.id
    });
  }
  s(a, "disinfecting") ? u.push({ id: "disinfect", tone: "dhw", key: "ex.disinfect", params: {}, comp: a?.id }) : Y !== void 0 && !P && u.push({ id: "dhw_idle", tone: "info", key: U !== void 0 ? "ex.dhw_idle" : "ex.dhw_idle_short", params: { dhw: Y, set: U }, comp: a?.id ?? n?.id }), p && s(p, "flow") && u.push({ id: "tap", tone: "dhw", key: "ex.tap", params: { flow: t(p, "flow") }, comp: p.id }), d && ke(d, e).has("running") && u.push({ id: "circ", tone: "info", key: "ex.circ", params: {}, hint: "ex.circ_hint", comp: d.id }), m.has("aux") && u.push({ id: "aux", tone: "warn", key: re !== void 0 ? "ex.aux" : "ex.aux_short", params: { aux: re }, hint: "ex.aux_hint", comp: n?.id });
  const ce = n?.props.input_labels || {};
  for (const I of [1, 2, 3, 4]) {
    if (!s(n, `input${I}`)) continue;
    const le = ce[`input${I}`] || "", pe = /14a|evu|sperr/i.test(le) ? "14a" : /pv|solar|überschuss|surplus/i.test(le) ? "pv" : "other";
    u.push({
      id: `input${I}`,
      tone: pe === "pv" ? "eco" : "warn",
      key: `ex.input_${pe}`,
      params: { n: I, label: le },
      comp: n?.id
    });
  }
  return u;
}
function Ur(r, e) {
  const t = ke(r, e), { num: s } = Gn(e);
  switch (r.type) {
    case "outdoor_unit":
      return {
        role: He(r.model).source === "brine" ? "exc.outdoor_brine" : "exc.outdoor",
        state: t.has("defrost") ? "exs.defrost" : t.has("running") ? "exs.compressor_on" : "exs.compressor_off",
        params: { speed: s(r, "compressor_speed") }
      };
    case "indoor_unit":
      return {
        role: `exc.indoor_${Le(r)?.id || "wall_e"}`,
        state: t.has("b") && t.has("running") ? "exs.vw1_b" : t.has("running") ? "exs.vw1_a" : void 0,
        params: {}
      };
    case "pump":
      return { role: `exc.pump_${r.props.role === "circulation" ? "circ" : r.props.role === "primary" ? "primary" : "hc"}`, state: t.has("running") ? "exs.running" : "exs.stopped", params: {} };
    case "valve_3way":
      return { role: "exc.valve_3way", state: t.has("b") ? "exs.valve_b" : "exs.valve_a", params: {} };
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
const Zr = {
  w: 640,
  h: 232,
  bus: 105,
  busX: [40, 540],
  pos: { pv: [80, 42], grid: [290, 42], battery: [500, 42], hp: [80, 168], house: [290, 168], wallbox: [500, 168] }
}, qr = {
  w: 1240,
  h: 118,
  bus: 98,
  busX: [40, 1180],
  pos: { pv: [70, 34], grid: [265, 34], battery: [460, 34], hp: [705, 34], house: [900, 34], wallbox: [1095, 34] }
}, on = {
  pv: "#ffc93c",
  grid: "#9aa7b4",
  battery: "#3ddc97",
  hp: "#ff8a3d",
  house: "#6cc4ff",
  wallbox: "#b48cff"
}, Yr = {
  pv: "M3 18h18l-3-9H6zM9 9l-1 9M15 9l1 9M4.5 13.5h15M12 2v3M5 4l1.5 2M19 4l-1.5 2",
  grid: "M12 2l-6 20M12 2l6 20M8 9h8M7 14h10M5 20h14M12 2v4",
  battery: "M6 6h12v15H6zM10 3h4v3M9 13h6M12 10v6",
  hp: "M4 5h16v14H4zM10 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0M10 12l2-3M10 12l-3 1M10 12l1 3M16 8h2M16 11h2M16 14h2",
  house: "M3 11l9-7l9 7M5 10v10h14V10M10 20v-6h4v6",
  wallbox: "M7 3h10v18H7zM10 8h4M12 12l-2 3h4l-2 3M17 14h2v4a2 2 0 0 0 2 2"
};
function Xr(r) {
  const e = Math.abs(r);
  return e > 5 ? 0.6 : e > 2 ? 0.9 : e > 0.5 ? 1.3 : 1.9;
}
const Jt = class Jt extends se {
  constructor() {
    super(...arguments), this._wide = !1;
  }
  _node(e, t, s, i) {
    const [n, o] = e.pos[t], a = o < e.bus, c = s === void 0, p = s ?? 0, d = !c && Math.abs(p) >= 0.05, h = on[t], m = d ? 2.5 + Math.min(6, Math.abs(p) * 0.9) : 2, u = a ? o + 26 : o - 26, g = a === p > 0, b = l(t === "grid" && d ? p > 0 ? "en.grid_import" : "en.grid_export" : t === "battery" && d ? p > 0 ? "en.bat_discharge" : "en.bat_charge" : `en.${t}`);
    return S`
      <line x1=${n} y1=${u} x2=${n} y2=${e.bus} class="link" style="stroke:${d ? h : "var(--cp-border)"}; stroke-width:${m}" />
      ${d ? S`<line x1=${n} y1=${u} x2=${n} y2=${e.bus} class="dots ${g ? "down" : "up"}" style="animation-duration:${Xr(p)}s" />` : y}
      <g class="node ${c ? "missing" : ""}" transform="translate(${n} ${o})">
        <circle r="25" class="ring" style="stroke:${d ? h : "var(--cp-border)"}" />
        <path d=${Yr[t]} transform="translate(-12 -12)" class="glyph" style="stroke:${d ? h : "var(--cp-muted)"}" />
      </g>
      <text x=${n + 36} y=${o - 4} class="lbl">${b}</text>
      <text x=${n + 36} y=${o + 15} class="val">${c ? "–" : j(Math.abs(p), Math.abs(p) < 10 ? 2 : 1)}<tspan class="unit"> kW</tspan></text>
      ${i ? S`<g transform="translate(${n + 36} ${o + 23})">${i}</g>` : y}
    `;
  }
  _badge(e, t) {
    const s = e.length * 6.2 + 18;
    return S`<rect width=${s} height="18" rx="9" class="badge ${t}" /><text x=${s / 2} y="12.5" text-anchor="middle" class="badge-t">${e}</text>`;
  }
  connectedCallback() {
    super.connectedCallback(), this._ro = new ResizeObserver(([e]) => {
      const t = e.contentRect.width > 820;
      t !== this._wide && (this._wide = t, this.requestUpdate());
    }), this._ro.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._ro?.disconnect();
  }
  render() {
    const e = this.flow;
    if (!e) return y;
    const t = this._wide ? qr : Zr, s = (e.pv ?? 0) + Math.max(0, e.battery ?? 0), i = (e.house ?? 0) + (e.wallbox ?? 0) + (e.hp ?? 0), n = i > 0.05 && (e.pv !== void 0 || e.battery !== void 0) ? Math.min(1, s / i) : void 0, o = e.soc, a = o !== void 0 ? S`<rect width="44" height="6" rx="3" class="soc-bg" />
            <rect width=${44 * Math.max(0, Math.min(100, o)) / 100} height="6" rx="3" style="fill:${on.battery}" />
            <text x="50" y="7" class="soc">${Math.round(o)} %</text>` : void 0, c = (p) => p === void 0 ? void 0 : -p;
    return f`<div class="head">
        <b>${l("en.title")}</b>
        ${n !== void 0 ? f`<span class="share">${l("en.share", { pct: Math.round(n * 100) })}</span>` : y}
      </div>
      <svg viewBox="0 0 ${t.w} ${t.h}" class=${this._wide ? "wide" : ""} role="img" aria-label=${l("en.title")}>
        <line x1=${t.busX[0]} y1=${t.bus} x2=${t.busX[1]} y2=${t.bus} class="bus" />
        ${this._node(t, "pv", e.pv, e.pvSignal ? this._badge(l("en.pv_signal"), "eco") : void 0)}
        ${this._node(t, "grid", e.grid)}
        ${this._node(t, "battery", e.battery, a)}
        ${this._node(t, "hp", c(e.hp), e.dim14a ? this._badge(l("en.dimmed", { kw: e.limit14a }), "warn") : void 0)}
        ${this._node(t, "house", c(e.house))}
        ${this._node(t, "wallbox", c(e.wallbox))}
      </svg>`;
  }
};
Jt.properties = { flow: { attribute: !1 } }, Jt.styles = oe`
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
let Gs = Jt;
customElements.get("cp-energy") || customElements.define("cp-energy", Gs);
const Jr = [1, 10, 60, 300, 900], rn = "copilot.explain", an = "copilot.energy", Qr = {
  heat: "#ff8a3d",
  dhw: "#ff4f8b",
  cold: "#6cc4ff",
  warn: "var(--cp-warn)",
  error: "var(--cp-error)",
  eco: "#3ddc97",
  info: "var(--cp-muted)"
};
function ln(r) {
  try {
    return localStorage.getItem(r);
  } catch {
    return null;
  }
}
function cn(r, e) {
  try {
    localStorage.setItem(r, e);
  } catch {
  }
}
const Qt = class Qt extends se {
  constructor() {
    super(...arguments), this.admin = !0, this.icons = /* @__PURE__ */ new Map(), this.messages = [], this.sim = null, this.version = 0, this.narrow = !1, this.showDemo = !0, this.showKpis = !0, this.showSide = !0, this._pop = null, this._side = !0, this._explain = ln(rn) === "1", this._energy = ln(an) !== "0", this._comp = null, this._tm = null, this._tmBusy = !1, this._tick = 0, this._raf = 0, this._last = 0, this._drawn = 0;
  }
  _toggleExplain() {
    this._explain = !this._explain, cn(rn, this._explain ? "1" : "0");
  }
  /** values shown right now: live, or the recorded state at the replay time */
  get _src() {
    return this._tm?.src ?? this.src;
  }
  async _openTm(e = 24) {
    if (!this._tmBusy) {
      this._tmBusy = !0;
      try {
        const t = this.sim ? Math.min(e, 24) : e, s = await mi.load(this.plant, this.src, t, this.hass);
        s.t = s.start, this._tm = { src: s, playing: !1, speed: this._tm?.speed ?? 900, hours: t, strip: this._modeStrip(s) };
      } catch (t) {
        console.error("COPilot: history could not be loaded", t);
      } finally {
        this._tmBusy = !1;
      }
    }
  }
  _closeTm() {
    cancelAnimationFrame(this._raf), this._tm = null;
  }
  /** Operating mode along the replay range, for the strip under the slider. */
  _modeStrip(e) {
    const t = this._first("outdoor_unit");
    if (!t) return [];
    const s = 240, i = e.start, n = Math.max(1, e.to - i), o = e.t, a = [];
    for (let c = 0; c < s; c++) {
      e.t = i + n * (c + 0.5) / s;
      const p = ke(t, e), d = rt(e.get(t, "activity")), h = p.has("defrost") ? "defrost" : d === "hot_water" ? "hot_water" : p.has("running") ? d && d !== "off" ? d : "heating" : "off", m = a[a.length - 1];
      m && m.mode === h ? m.w += 1 / s : a.push({ x: c / s, w: 1 / s, mode: h });
    }
    return e.t = o, a;
  }
  _play() {
    const e = this._tm;
    if (e && (e.src.t >= e.src.to - 1 && (e.src.t = e.src.start), e.playing = !e.playing, this._tm = { ...e }, e.playing)) {
      this._last = performance.now();
      const t = (s) => {
        const i = this._tm;
        if (!i?.playing) return;
        const n = Math.min(0.25, (s - this._last) / 1e3);
        this._last = s, i.src.t = Math.min(i.src.to, i.src.t + n * i.speed), i.src.t >= i.src.to && (this._tm = { ...i, playing: !1 }), s - this._drawn > 100 && (this._drawn = s, this._tick++), this._raf = requestAnimationFrame(t);
      };
      this._raf = requestAnimationFrame(t);
    }
  }
  _seek(e) {
    this._tm && (this._tm.src.t = e, this._tick++);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), cancelAnimationFrame(this._raf);
  }
  _tmBar() {
    const e = this._tm;
    if (!e) return y;
    const t = e.src, s = t.start, n = new Date(t.t * 1e3).toLocaleString(void 0, { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }), o = { heating: "#ff8a3d", hot_water: "#ff4f8b", defrost: "#6cc4ff", compressor_alarm: "#ff5a5f", off: "transparent" };
    return f`<div class="tm">
      <button class="icon" title=${e.playing ? l("tm.pause") : l("tm.play")} @click=${this._play}>${L(e.playing ? "pause" : "play")}</button>
      <div class="tm-track">
        <input type="range" min=${s} max=${t.to} step="60" .value=${String(t.t)}
          @input=${(a) => this._seek(Number(a.target.value))} aria-label=${l("tm.title")} />
        <svg class="strip" viewBox="0 0 1 1" preserveAspectRatio="none">
          ${e.strip.map((a) => S`<rect x=${a.x} y="0" width=${a.w + 1e-3} height="1" fill=${o[a.mode] ?? "#8b949e"} />`)}
        </svg>
      </div>
      <span class="tm-time">${n}</span>
      <select title=${l("tm.speed")} @change=${(a) => this._tm = { ...e, speed: Number(a.target.value) }}>
        ${[300, 900, 1800, 3600].map((a) => f`<option value=${a} ?selected=${e.speed === a}>${l("tm.speed_v", { min: a / 60 })}</option>`)}
      </select>
      ${this.sim ? y : f`<select title=${l("tm.range")} @change=${(a) => this._openTm(Number(a.target.value))}>
            ${[6, 24, 72].map((a) => f`<option value=${a} ?selected=${e.hours === a}>${l("tm.hours", { h: a })}</option>`)}
          </select>`}
      <button class="live" @click=${this._closeTm}>${l("tm.live")}</button>
    </div>`;
  }
  _toggleEnergy() {
    this._energy = !this._energy, cn(an, this._energy ? "1" : "0");
  }
  _onComponent(e) {
    this._explain && (this._comp = e.detail);
  }
  _explainPanel() {
    const e = Gr(this.plant, this._src);
    return f`<div class="side-head"><b>${l("ex.title")}</b></div>
      ${e.length ? f`<ul class="explain">
            ${e.map(
      (t) => f`<li style="--tone:${Qr[t.tone]}">
                <span class="dot"></span>
                <div>
                  <div>${l(t.key, t.params)}</div>
                  ${t.hint ? f`<div class="ex-hint">${l(t.hint, t.params)}</div>` : y}
                </div>
              </li>`
    )}
          </ul>` : f`<p class="muted">${l("ex.empty")}</p>`}
      <p class="ex-tip">${L("info")} ${l("ex.tap_hint")}</p>`;
  }
  _compPop() {
    const e = this._comp;
    if (!e) return y;
    const t = Ur(e.component, this._src), s = 300, i = Math.max(12, Math.min(window.innerWidth - s - 12, e.x - s / 2)), n = Math.max(12, Math.min(window.innerHeight - 200, e.y + 14));
    return f`<div class="backdrop" @pointerdown=${() => this._comp = null}></div>
      <div class="cpop card" style="left:${i}px; top:${n}px; width:${s}px">
        <div class="row cpop-head">
          <div>
            <div class="cpop-title">${e.component.label || l(`type.${e.component.type}`)}</div>
            <div class="muted cpop-sub">${l(`type.${e.component.type}`)}</div>
          </div>
          <span class="spacer"></span>
          <button class="ghost icon" @click=${() => this._comp = null} aria-label=${l("close")}>${L("close")}</button>
        </div>
        ${t.role ? f`<p>${l(t.role, t.params)}</p>` : y}
        ${t.state ? f`<p class="cpop-state">${l(t.state, t.params)}</p>` : y}
      </div>`;
  }
  _first(e) {
    return this.plant.components.find((t) => t.type === e);
  }
  _num(e, t) {
    if (!e) return;
    const s = this._src.get(e, t);
    return s?.available && s.num !== null ? s.num : void 0;
  }
  _kpis() {
    const e = this._first("outdoor_unit"), t = this._first("indoor_unit"), s = this._first("dhw_tank"), i = this.plant.components.find((b) => b.type === "radiators" || b.type === "floor_heating"), n = this.plant.components.find((b) => b.type === "valve_3way" && b.props.role === "dhw_switch");
    let o = e ? rt(this._src.get(e, "activity")) : void 0;
    if (!o && e) {
      const b = ke(e, this._src), v = n ? ke(n, this._src) : /* @__PURE__ */ new Set();
      o = b.has("running") ? v.has("b") ? "hot_water" : "heating" : "off";
    }
    const a = {
      heating: "#ff8a3d",
      hot_water: "#ff4f8b",
      defrost: "#6cc4ff",
      compressor_alarm: "#ff5a5f",
      off: "#8a97a6"
    }, c = this._num(e, "heat_power");
    let p = this._num(e, "el_power");
    const d = e ? this._src.get(e, "el_power")?.unit : void 0;
    p !== void 0 && d === "kW" && (p *= 1e3);
    const h = c !== void 0 && p !== void 0 && p > 50 && c > 0.2 ? c / (p / 1e3) : void 0, m = (b, v = 1) => b === void 0 ? "–" : j(b, v), u = Nn(this.plant, this._src), g = [
      { key: "mode", label: l("kpi.mode"), value: o ? l(`mode.${o}`) : "–", unit: "", color: a[o || "off"] },
      { key: "out", label: l("kpi.outdoor"), value: m(this._num(e, "outdoor_temp")), unit: "°C", comp: e, slot: "outdoor_temp" },
      { key: "heat", label: l("kpi.heat"), value: m(c), unit: "kW", comp: e, slot: "heat_power" },
      { key: "power", label: l("kpi.power"), value: p === void 0 ? "–" : p >= 1e3 ? j(p / 1e3, 2) : j(p, 0), unit: p !== void 0 && p >= 1e3 ? "kW" : "W", comp: e, slot: "el_power" },
      {
        key: "cop",
        label: l("kpi.cop"),
        value: m(h),
        unit: "",
        color: u ? We[u.ampel] : void 0,
        sub: u ? `${l("kpi.target")} ${m(u.expected)}` : void 0
      },
      {
        key: "supply",
        label: l("kpi.supply"),
        value: m(this._num(t, "supply_temp")),
        unit: "°C",
        color: _e(this._num(t, "supply_temp"), ""),
        sub: this._num(t, "target_flow_temp") !== void 0 ? `${l("kpi.target")} ${m(this._num(t, "target_flow_temp"))}` : void 0,
        comp: t,
        slot: "supply_temp"
      }
    ];
    return s && g.push({ key: "dhw", label: l("kpi.dhw"), value: m(this._num(s, "temp_top")), unit: "°C", color: _e(this._num(s, "temp_top"), ""), comp: s, slot: "temp_top" }), i && this._num(i, "room_temp") !== void 0 && g.push({ key: "room", label: l("kpi.room"), value: m(this._num(i, "room_temp")), unit: "°C", comp: i, slot: "room_temp" }), g;
  }
  _openPop(e) {
    this._pop = e.detail;
  }
  _scenario(e) {
    this.dispatchEvent(new CustomEvent("scenario", { detail: e, bubbles: !0, composed: !0 }));
  }
  _demoBar() {
    const e = this.sim;
    if (!e || !this.showDemo) return y;
    const t = ["winter", "transition", "shower", "defrost", "dim14a", "pv", "disinfect", "fault", "reset"], s = { dim14a: e.dim14a, pv: e.pv, fault: e.fault, disinfect: e.disinfect };
    return f`<div class="demo">
      <span class="demo-tag">${L("flask")} ${l("demo.active")}</span>
      <span class="clock" title=${l("demo.time")}>${Tn(e.time)}</span>
      <label class="ctl">${l("demo.speed")}
        <select @change=${(i) => e.speed = Number(i.target.value)}>
          ${Jr.map((i) => f`<option value=${i} ?selected=${e.speed === i}>${i}×</option>`)}
        </select>
      </label>
      <label class="ctl slider">${l("demo.outdoor")} <b>${j(e.outdoorMean, 0)} °C</b>
        <input type="range" min="-15" max="20" step="1" .value=${String(e.outdoorMean)}
          @input=${(i) => e.outdoorMean = Number(i.target.value)} />
      </label>
      ${this.narrow ? f`<select class="scn-select" @change=${(i) => {
      const n = i.target;
      n.value && this._scenario(n.value), n.value = "";
    }}>
            <option value="">${l("demo.scenarios")} …</option>
            ${t.map((i) => f`<option value=${i}>${s[i] ? "✓ " : ""}${l(`scn.${i}`)}</option>`)}
          </select>` : f`<div class="scn">
            ${t.map(
      (i) => f`<button class=${s[i] ? "primary" : ""} @click=${() => this._scenario(i)}>${l(`scn.${i}`)}</button>`
    )}
          </div>`}
    </div>`;
  }
  render() {
    if (!this.plant) return y;
    const e = this._kpis(), t = yr(this.plant, this._tm ? null : this.sim), s = this.messages.filter((i) => i.active && (i.level === "warning" || i.level === "error")).length;
    return f`
      ${this._tm ? y : this._demoBar()}
      ${this.showKpis ? f`<div class="kpis">
        ${e.map(
      (i) => f`<button class="kpi" ?disabled=${!i.comp} @click=${(n) => i.comp && (this._pop = { component: i.comp, slot: i.slot, x: n.clientX, y: n.clientY })}>
            <span class="k-label">${i.label}</span>
            <span class="k-value" style=${i.color ? `color:${i.color}` : ""}>${i.value}<small>${i.unit}</small></span>
            ${i.sub ? f`<span class="k-sub">${i.sub}</span>` : y}
          </button>`
    )}
      </div>` : y}
      ${t && this._energy ? f`<div class="energy card"><cp-energy .flow=${xr(this.plant, this._src, this._tm ? null : this.sim)}></cp-energy></div>` : y}
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
            ${t ? f`<button class="icon ${this._energy ? "on" : ""}" title=${l("en.toggle")} aria-pressed=${this._energy ? "true" : "false"} @click=${this._toggleEnergy}>${L("bolt")}</button>` : y}
            <button class="icon ${this._tm ? "on" : ""} ${this._tmBusy ? "busy" : ""}" title=${l("tm.title")} aria-pressed=${this._tm ? "true" : "false"}
              @click=${() => this._tm ? this._closeTm() : this._openTm()}>${L("history")}</button>
            <button class="icon ${this._explain ? "on" : ""}" title=${l("ex.toggle")} aria-pressed=${this._explain ? "true" : "false"} @click=${this._toggleExplain}>${L("info")}</button>
            <button class="icon" title=${l("zoom_in")} @click=${() => this._sch()?.zoom(0.8)}>${L("plus")}</button>
            <button class="icon" title=${l("zoom_out")} @click=${() => this._sch()?.zoom(1.25)}>${L("minus")}</button>
            <button class="icon" title=${l("fit")} @click=${() => this._sch()?.fit()}>${L("fit")}</button>
            ${this.narrow || !this.showSide ? y : f`<button class="icon" title=${l("msg.title")} @click=${() => this._side = !this._side}>
                  ${L("bell")}${s ? f`<span class="badge">${s}</span>` : y}</button>`}
          </div>
        </div>
        ${this._explain ? f`<aside class="side card">${this._explainPanel()}</aside>` : this.showSide && (this._side || this.narrow) ? f`<aside class="side card">
                <div class="side-head"><b>${l("msg.title")}</b></div>
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
Qt.properties = {
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
}, Qt.styles = [
  fe,
  oe`
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
let Us = Qt;
customElements.get("cp-overview") || customElements.define("cp-overview", Us);
const ea = 10 * 6e4, ta = 5e3;
function dn(r) {
  return r === void 0 ? "#8b949e" : r >= 3.5 ? We.green : r >= 3 ? We.yellow : We.red;
}
let pn = null;
const es = class es extends se {
  constructor() {
    super(...arguments), this._chartKey = "", this._costs = [], this._costKey = "", this.sim = null, this.version = 0, this._data = null, this._error = "", this._loadedAt = 0, this._loadedFor = null;
  }
  connectedCallback() {
    super.connectedCallback(), pn ??= import("./echart-B_4jTAey.js").catch((e) => {
      pn = null, console.error("COPilot: chart module failed to load", e);
    });
  }
  willUpdate() {
    const e = this.sim || this.plant, t = Date.now() - this._loadedAt;
    (e !== this._loadedFor || t > (this.sim ? ta : ea)) && (this._loadedFor = e, this._loadedAt = Date.now(), this._load());
  }
  async _load() {
    try {
      this._error = "", this.sim ? this._data = Cr(this.sim) : this.hass && !this.hass.__standalone && (this._data = await Er(this.hass, this.plant));
      const e = (this._data?.daily || []).slice(-30);
      this._costs = await Lr(e, this.plant, this.sim, this.hass && !this.hass.__standalone ? this.hass : void 0);
    } catch (e) {
      this._error = e?.message || String(e);
    }
  }
  _live() {
    const e = Nn(this.plant, this.src), t = 62, s = 2 * Math.PI * t, i = e ? Math.min(1, e.cop / 7) : 0, n = e ? We[e.ampel] : "var(--cp-muted)";
    return f`<div class="card live">
      <div class="cap">${l("eff.live")}</div>
      <div class="gauge">
        <svg viewBox="0 0 160 160">
          <circle cx="80" cy="80" r=${t} class="track" />
          ${S`<circle cx="80" cy="80" r=${t} class="bar" style="stroke:${n};stroke-dasharray:${s * i} ${s}" />`}
        </svg>
        <div class="gv">
          <span class="big" style="color:${n}">${e ? j(e.cop, 1) : "–"}</span>
          <span class="muted">COP</span>
        </div>
      </div>
      ${e ? f`<div class="lv-row"><span>${l("eff.expected", { out: j(e.tOut, 0), flow: j(e.tFlow, 0) })}</span><b>${j(e.expected, 1)}</b></div>
            <div class="lv-row"><span>${l("eff.ratio")}</span><b style="color:${n}">${j(e.ratio * 100, 0)} %</b></div>
            <div class="verdict" style="border-color:${n}">${l(`eff.ampel.${e.ampel}`)}</div>` : f`<p class="muted small">${l("eff.no_live")}</p>`}
    </div>`;
  }
  _tile(e, t, s) {
    const i = qi(t), n = t && t.heat > 0 ? t.heatDhw / t.heat : void 0, o = t && t.el > 0 ? t.aux / t.el : void 0;
    return f`<div class="card tile">
      <div class="cap">${l(`eff.${e}`)} ${s ? f`<span class="est">${l("eff.estimate")}</span>` : y}</div>
      <div class="spf" style="color:${dn(i)}">${i !== void 0 ? j(i, 2) : "–"}<small>${e === "today" || e === "yesterday" ? "AZ" : "JAZ"}</small></div>
      <div class="kv"><span>${l("eff.heat")}</span><b>${t ? j(t.heat, t.heat >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${l("eff.el")}</span><b>${t ? j(t.el, t.el >= 100 ? 0 : 1) : "–"} kWh</b></div>
      <div class="kv"><span>${l("eff.dhw_share")}</span><b>${n !== void 0 ? j(n * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${l("eff.aux_share")}</span><b>${o !== void 0 ? j(o * 100, 1) + " %" : "–"}</b></div>
    </div>`;
  }
  _chart(e) {
    const t = e.daily.slice(-30);
    if (!t.length) return y;
    const s = Di() === "de" ? "de-DE" : "en-GB", i = (a) => new Date(a).toLocaleDateString(s, { day: "2-digit", month: "2-digit" }), n = (a) => new Date(a).toLocaleDateString(s, { weekday: "short", day: "2-digit", month: "2-digit" }), o = JSON.stringify(t);
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
        data: [l("eff.heat"), l("eff.el"), { name: l("eff.spf_short"), icon: "circle" }]
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow", shadowStyle: { color: "rgba(127,127,127,0.12)" } },
        backgroundColor: a.surface,
        borderColor: a.border,
        textStyle: { color: a.text, fontSize: 12 },
        formatter: (c) => {
          const p = Array.isArray(c) ? c : [c], d = p[0]?.dataIndex ?? 0, h = p.map((m) => {
            const u = m.value;
            if (u == null || u === "-") return "";
            const g = m.seriesIndex === 2 ? "" : " kWh";
            return `<div style="display:flex;gap:10px;justify-content:space-between"><span>${m.marker}${m.seriesName}</span><b>${j(u, m.seriesIndex === 2 ? 2 : 1)}${g}</b></div>`;
          }).join("");
          return `<div style="margin-bottom:4px;font-weight:700">${n(t[d].day)}</div>${h}`;
        }
      },
      dataZoom: [{ type: "inside", minValueSpan: 5 }],
      xAxis: {
        type: "category",
        data: t.map((c) => i(c.day)),
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
          name: l("eff.spf_short"),
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
          name: l("eff.heat"),
          type: "bar",
          data: t.map((c) => Math.round(c.heat * 10) / 10),
          itemStyle: { color: "#ff8a3d", borderRadius: [3, 3, 0, 0] },
          barGap: "10%",
          barCategoryGap: "35%"
        },
        {
          name: l("eff.el"),
          type: "bar",
          data: t.map((c) => Math.round(c.el * 10) / 10),
          itemStyle: { color: "#4d9fff", borderRadius: [3, 3, 0, 0] }
        },
        {
          name: l("eff.spf_short"),
          type: "line",
          yAxisIndex: 1,
          smooth: 0.3,
          symbol: "circle",
          symbolSize: 7,
          connectNulls: !0,
          lineStyle: { color: a.text, width: 1.5, type: "dashed", opacity: 0.7 },
          data: t.map((c) => {
            const p = qi(c);
            return p === void 0 ? null : { value: Math.round(p * 100) / 100, itemStyle: { color: dn(p) } };
          }),
          markLine: {
            silent: !0,
            symbol: "none",
            label: { show: !1 },
            lineStyle: { color: We.yellow, type: "dotted", opacity: 0.6 },
            data: [{ yAxis: 3 }]
          }
        }
      ]
    })), f`<div class="card chart">
      <div class="cap">${l("eff.daily")}</div>
      <cp-echart .option=${this._chartOption}></cp-echart>
      ${e.estimated.month ? f`<p class="muted small">${l("eff.demo_note")}</p>` : y}
    </div>`;
  }
  // ------------------------------------------------------------ costs
  _costTile(e, t) {
    const s = (a) => `${j(a, a >= 100 ? 0 : 2)} €`, i = t && t.el > 0.05 && !t.noShare ? t.self / t.el : void 0, n = t && t.heat > 0.1 ? (t.cost + t.feedLoss) / t.heat : void 0, o = t && t.gas > 0.01 ? 1 - (t.cost + t.feedLoss) / t.gas : void 0;
    return f`<div class="card tile">
      <div class="cap">${l(`cost.${e}`)}${t?.estimated ? f` <span class="est">${l("eff.estimate")}</span>` : y}</div>
      <div class="spf">${t ? s(t.cost) : "–"}<small>${l("cost.grid_cost")}</small></div>
      <div class="kv"><span>${l("cost.pv_share")}</span><b>${i !== void 0 ? j(i * 100, 0) + " %" : "–"}</b></div>
      <div class="kv"><span>${l("cost.feed_loss")}</span><b>${t && !t.noShare ? s(t.feedLoss) : "–"}</b></div>
      <div class="kv"><span>${l("cost.per_kwh")}</span><b>${n !== void 0 ? j(n * 100, 1) + " ct" : "–"}</b></div>
      <div class="kv"><span>${l("cost.vs_gas")}</span><b class=${o !== void 0 && o >= 0 ? "good" : ""}>${t ? s(t.gas) : "–"}${o !== void 0 ? f` <small>(${o >= 0 ? "−" : "+"}${j(Math.abs(o) * 100, 0)} %)</small>` : y}</b></div>
    </div>`;
  }
  _costSection() {
    const e = this._costs;
    if (!e.length) return y;
    const t = e[e.length - 1], s = e.length > 1 ? e[e.length - 2] : null, i = JSON.stringify(e.map((n) => [n.day, n.grid, n.self, n.cost]));
    if (i !== this._costKey) {
      this._costKey = i;
      const n = Di() === "de" ? "de-DE" : "en-GB", o = (a) => new Date(a).toLocaleDateString(n, { day: "2-digit", month: "2-digit" });
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
          valueFormatter: (c) => typeof c == "number" ? j(c, 2) : String(c)
        },
        dataZoom: [{ type: "inside", minValueSpan: 5 }],
        xAxis: { type: "category", data: e.map((c) => o(c.day)), axisLine: { lineStyle: { color: a.border } }, axisTick: { show: !1 }, axisLabel: { color: a.muted, hideOverlap: !0 } },
        yAxis: [
          { type: "value", name: "kWh", nameTextStyle: { color: a.muted, align: "left" }, axisLabel: { color: a.muted }, splitLine: { lineStyle: { color: a.border, type: "dashed" } } },
          { type: "value", name: "€", nameTextStyle: { color: a.muted, align: "right" }, axisLabel: { color: a.muted }, splitLine: { show: !1 } }
        ],
        series: [
          { name: l("cost.grid_kwh"), type: "bar", stack: "el", data: e.map((c) => Math.round(c.grid * 10) / 10), itemStyle: { color: "#4d9fff" }, barCategoryGap: "35%" },
          { name: l("cost.self_kwh"), type: "bar", stack: "el", data: e.map((c) => Math.round(c.self * 10) / 10), itemStyle: { color: "#ffc93c", borderRadius: [3, 3, 0, 0] } },
          { name: l("cost.cost_eur"), type: "line", yAxisIndex: 1, smooth: 0.3, symbol: "circle", symbolSize: 6, data: e.map((c) => Math.round(c.cost * 100) / 100), lineStyle: { color: "#3ddc97", width: 2 }, itemStyle: { color: "#3ddc97" } }
        ]
      });
    }
    return f`
      <h3 class="sec">${l("cost.title")}</h3>
      <div class="tiles">
        ${this._costTile("today", ks([t]))}
        ${this._costTile("yesterday", s ? ks([s]) : null)}
        ${this._costTile("days30", ks(e))}
      </div>
      <div class="card chart">
        <div class="cap">${l("cost.daily")}</div>
        <cp-echart .option=${this._costOption}></cp-echart>
        <p class="muted small">${e.some((n) => n.noShare) ? l("cost.no_share") : ""} ${l("cost.hint")}</p>
      </div>`;
  }
  render() {
    const e = this._data;
    return f`
      <div class="grid">
        ${this._live()}
        <div class="tiles">
          ${this._tile("today", e?.today ?? null, !1)}
          ${this._tile("yesterday", e?.yesterday ?? null, !1)}
          ${this._tile("month", e?.month ?? null, !!e?.estimated.month)}
          ${this._tile("year", e?.year ?? null, !!e?.estimated.year)}
        </div>
      </div>
      ${this._error ? f`<div class="card err">${this._error}</div>` : y}
      ${e?.missing ? f`<div class="card hint">${l(`eff.missing.${e.missing}`)}</div>` : y}
      ${e ? this._chart(e) : y}
      ${this._costSection()}
    `;
  }
};
es.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  hass: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _data: { state: !0 },
  _error: { state: !0 },
  _costs: { state: !0 }
}, es.styles = [
  fe,
  oe`
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
let Zs = es;
customElements.get("cp-efficiency") || customElements.define("cp-efficiency", Zs);
const qs = 60;
function Ee(r, e, t, s) {
  const i = new Array(t).fill(null), n = [...r].sort((c, p) => c.t - p.t);
  let o = 0, a = null;
  for (let c = 0; c < t; c++) {
    const p = e + c * qs;
    for (; o < n.length && n[o].t <= p; ) a = s(n[o++]);
    i[c] = a;
  }
  return i;
}
const Ce = (r) => r.v === null || Number.isNaN(r.v) ? null : r.v;
function hn(r) {
  const e = [];
  let t = -1;
  return r.forEach((s, i) => {
    s && t < 0 && (t = i), !s && t >= 0 && (e.push([t, i]), t = -1);
  }), t >= 0 && e.push([t, r.length]), e;
}
function un(r) {
  const e = r.filter((t) => t !== null);
  return e.length ? e.reduce((t, s) => t + s, 0) / e.length : void 0;
}
const Ss = (r, ...e) => r.components.find((t) => e.includes(t.type));
async function $e(r, e, t, s) {
  if (!e || r.get(e, t) === void 0) return [];
  try {
    return await r.history(e, t, s);
  } catch {
    return [];
  }
}
async function sa(r, e, t = 24, s = Date.now() / 1e3) {
  const i = Ss(r, "outdoor_unit"), n = Ss(r, "indoor_unit"), o = Ss(r, "buffer"), a = Math.floor(t * 3600 / qs), c = s - a * qs, [p, d, h, m, u, g, b, v, w, x, k] = await Promise.all([
    $e(e, i, "compressor_on", t),
    $e(e, i, "compressor_speed", t),
    $e(e, i, "heat_power", t),
    $e(e, i, "activity", t),
    $e(e, n, "supply_temp", t),
    $e(e, n, "return_temp", t),
    $e(e, o, "temp_top", t),
    $e(e, n, "buffer_temp", t),
    $e(e, n, "aux_level", t),
    $e(e, n, "vw1_position", t),
    $e(e, n, "pressure", t)
  ]), C = p.length ? p : d.length ? d : h, D = Ee(C, c, a, Ce).map((O) => O !== null && O > (C === h ? 0.2 : 0)), E = Ee(m, c, a, (O) => rt({ raw: O.raw ?? null, available: O.raw !== void 0 }) ?? null), W = E.map((O) => O === "defrost"), Y = Ee(x, c, a, Ce).map((O, P) => O !== null ? O > 0 : E[P] === "hot_water"), U = D.map((O, P) => O && !W[P] && !Y[P]), re = U.map((O, P) => O && U.slice(Math.max(0, P - 5), P).every(Boolean) && P >= 5), Z = C.length > 0, ae = [], ie = b.length ? b : v;
  if (o || v.length) {
    const O = Ee(u, c, a, Ce), P = Ee(ie, c, a, Ce), F = O.map((X, ce) => re[ce] && X !== null && P[ce] !== null ? X - P[ce] : null), K = un(F);
    ae.push(
      K === void 0 ? { id: "mixing", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "mixing",
        ampel: K <= 2 ? "green" : K <= 4 ? "yellow" : "red",
        value: `${j(K, 1)} K`,
        detail: "chk.mixing.detail",
        params: { value: K, minutes: F.filter((X) => X !== null).length },
        hint: "chk.mixing.hint"
      }
    );
  }
  if (Z) {
    const P = hn(D).filter(([le]) => le > 0), F = P.length, K = P.length ? P.reduce((le, [pe, be]) => le + (be - pe), 0) / P.length : void 0;
    let X = 0;
    for (let le = 0; le + 60 <= a; le += 10) X = Math.max(X, P.filter(([pe]) => pe >= le && pe < le + 60).length);
    const ce = F / t, I = ce <= 1 && X <= 3 && (K ?? 99) >= 20 ? "green" : X > 4 || (K ?? 99) < 10 ? "red" : "yellow";
    ae.push({
      id: "cycling",
      ampel: F === 0 ? "green" : I,
      value: `${F}×`,
      detail: "chk.cycling.detail",
      params: { starts: F, perHour: ce, maxPerHour: X, avgRun: K ?? 0, hours: t },
      hint: "chk.cycling.hint"
    });
  } else
    ae.push({ id: "cycling", ampel: "none", detail: "chk.nodata", params: {} });
  {
    const O = Ee(u, c, a, Ce), P = Ee(g, c, a, Ce), F = O.map((X, ce) => re[ce] && X !== null && P[ce] !== null ? X - P[ce] : null), K = un(F);
    ae.push(
      K === void 0 ? { id: "spread", ampel: "none", detail: "chk.nodata", params: {} } : {
        id: "spread",
        ampel: K >= 3 && K <= 8 ? "green" : K >= 2 && K <= 10 ? "yellow" : "red",
        value: `${j(K, 1)} K`,
        detail: "chk.spread.detail",
        params: { value: K },
        hint: K < 3 ? "chk.spread.hint_low" : "chk.spread.hint_high"
      }
    );
  }
  if (m.length) {
    const O = hn(W), P = O.reduce((X, [ce, I]) => X + (I - ce), 0), F = D.filter(Boolean).length || 1, K = P / F;
    ae.push({
      id: "defrost",
      ampel: K <= 0.08 ? "green" : K <= 0.15 ? "yellow" : "red",
      value: `${O.length}×`,
      detail: "chk.defrost.detail",
      params: { count: O.length, minutes: P, share: K * 100 },
      hint: "chk.defrost.hint"
    });
  }
  if (w.length) {
    const P = Ee(w, c, a, Ce).map((F) => F !== null && F > 0).filter(Boolean).length;
    ae.push({
      id: "aux",
      ampel: P === 0 ? "green" : P <= 60 ? "yellow" : "red",
      value: P ? `${Math.round(P)} min` : "0",
      detail: "chk.aux.detail",
      params: { minutes: P },
      hint: "chk.aux.hint"
    });
  }
  if (k.length && n) {
    const O = k.map(Ce).filter((I) => I !== null), P = Number(n.props.pressure_min ?? 1), F = Number(n.props.pressure_max ?? 2.7), K = Math.min(...O), X = Math.max(...O), ce = O.length ? O[0] - O[O.length - 1] : 0;
    ae.push({
      id: "pressure",
      ampel: K < P || X > F ? "red" : K < P + 0.2 || ce > 0.2 ? "yellow" : "green",
      value: `${j(K, 1)}–${j(X, 1)} bar`,
      detail: "chk.pressure.detail",
      params: { min: K, max: X, lo: P, hi: F },
      hint: "chk.pressure.hint"
    });
  }
  return ae;
}
const ia = 2e4, na = 5 * 6e4;
function mn(r) {
  const e = {};
  for (const [t, s] of Object.entries(r)) e[t] = typeof s == "number" ? j(s, Number.isInteger(s) ? 0 : 1) : s;
  return e;
}
const ts = class ts extends se {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this._results = null, this._busy = !1, this._at = 0, this._for = null;
  }
  willUpdate() {
    const e = this.sim || this.plant;
    (e !== this._for || Date.now() - this._at > (this.sim ? ia : na)) && (this._for = e, this._at = Date.now(), this._run());
  }
  async _run() {
    if (!this._busy) {
      this._busy = !0;
      try {
        this._results = await sa(this.plant, this.src, 24, this.sim ? this.sim.time : Date.now() / 1e3);
      } finally {
        this._busy = !1;
      }
    }
  }
  render() {
    const e = this._results, t = (s) => (e || []).filter((i) => i.ampel === s).length;
    return f`
      <div class="card head">
        <div>
          <h2>${l("chk.title")}</h2>
          <p class="muted">${l("chk.subtitle")}${this.sim ? ` ${l("chk.demo")}` : ""}</p>
        </div>
        <span class="spacer"></span>
        ${e ? f`<div class="sum">
              ${["green", "yellow", "red"].map((s) => f`<span class="dot" style="background:${We[s]}"></span><b>${t(s)}</b>`)}
            </div>` : y}
        <button @click=${() => this._run()} ?disabled=${this._busy}>${l("chk.refresh")}</button>
      </div>
      ${e ? f`<div class="list">
            ${e.map(
      (s) => f`<div class="card item ${s.ampel}">
                <span class="lamp" style="background:${s.ampel === "none" ? "var(--cp-muted)" : We[s.ampel]}"></span>
                <div class="body">
                  <div class="row nowrap">
                    <b class="title">${l(`chk.${s.id}.title`)}</b>
                    <span class="spacer"></span>
                    ${s.value ? f`<span class="val">${s.value}</span>` : y}
                  </div>
                  <div class="detail">${l(s.detail, mn(s.params))}</div>
                  ${s.hint && (s.ampel === "yellow" || s.ampel === "red") ? f`<div class="hint">${l(s.hint, mn(s.params))}</div>` : y}
                  ${s.ampel === "green" ? f`<div class="ok">${l("chk.ok")}</div>` : y}
                </div>
              </div>`
    )}
          </div>` : f`<div class="card muted">${l("chk.running")}</div>`}
    `;
  }
};
ts.properties = {
  plant: { attribute: !1 },
  src: { attribute: !1 },
  sim: { attribute: !1 },
  version: { type: Number },
  _results: { state: !0 },
  _busy: { state: !0 }
}, ts.styles = [
  fe,
  oe`
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
let Ys = ts;
customElements.get("cp-check") || customElements.define("cp-check", Ys);
const Ue = 24, gt = 36, Pe = 2, Un = 5, Xs = 1, tt = 10, Js = 0.3, st = 36e5, oa = (r) => r.length ? r.reduce((e, t) => e + t, 0) / r.length : void 0, Zn = (r) => Math.round(r * 10) / 10, Ct = (r, e, t) => Math.max(e, Math.min(t, r)), fn = (r, e) => Math.round(r / e) * e;
function ra(r) {
  const e = /* @__PURE__ */ new Set(), t = r.filter((s) => s.room !== void 0).sort((s, i) => s.ts - i.ts);
  for (let s = 1; s < t.length; s++) {
    const i = t[s - 1], n = t[s];
    if (n.ts - i.ts <= st && n.room - i.room > 0.6) for (let o = 0; o < 4; o++) e.add(n.ts + o * st);
  }
  return e;
}
function aa(r, e, t) {
  const s = new Date(e.step_since).getTime() + Ue * st;
  return r.filter((i) => i.ts >= s && i.room !== void 0 && !t.has(i.ts));
}
function la(r, e) {
  const t = r.filter((a) => a.heating), s = r.filter((a) => !a.heating), i = (a) => {
    const c = oa(a.map((p) => p.room - e));
    return c === void 0 ? void 0 : Zn(c);
  }, n = t.filter((a) => a.tOut >= Un), o = t.filter((a) => a.tOut < Xs);
  return {
    all: i(t),
    mild: n.length >= tt ? i(n) : void 0,
    cold: o.length >= tt ? i(o) : void 0,
    mildH: n.length,
    coldH: o.length,
    idle: s.length >= tt ? i(s) : void 0,
    idleH: s.length
  };
}
function ca(r) {
  return r.exponent > 1.2 ? 2.5 : 1.5;
}
function da(r, e) {
  const t = ca(r);
  if (e.mild !== void 0 && e.cold !== void 0 && Math.abs(e.cold - e.mild) >= 0.4) {
    const i = e.cold - e.mild, n = Ct(fn(-i * t * 1.5, 1), -3, 3) || -Math.sign(i);
    return { change: { design: Ct(r.design + n, 28, 65) }, why: i > 0 ? "flatter" : "steeper" };
  }
  const s = e.all;
  if (s !== void 0 && Math.abs(s) > Js) {
    const i = Ct(fn(-s * t, 0.5), -1.5, 1.5) || -Math.sign(s) * 0.5;
    return { change: { offset: Ct(r.offset + i, -10, 10) }, why: s > 0 ? "lower" : "raise" };
  }
  return e.idle !== void 0 && e.idle < -0.7 && r.limit < 20 ? { change: { limit: r.limit + 1 }, why: "limit_up" } : null;
}
function pa(r, e, t, s, i = Date.now()) {
  const n = new Date(e.step_since).getTime() + Ue * st;
  if (i < n) return { kind: "settle", until: n };
  const o = aa(t, e, s), a = o.filter((m) => m.heating).length, c = new Set(o.map((m) => new Date(m.ts).toDateString())).size, p = !!e.snooze_until && i < new Date(e.snooze_until).getTime();
  if (a < gt || c < Pe || p) {
    const m = Math.max(1, (i - n) / st), u = m >= 12 && a > 0 ? Math.min(1, a / m) : 0.75, g = Math.max(0, gt - a) / u, b = Math.max(0, Pe - c) * 24;
    let v = i + Math.max(g, b) * st;
    p && (v = Math.max(v, new Date(e.snooze_until).getTime()));
    const w = Math.min(1, Math.min(a / gt, c / Pe));
    return { kind: "collect", hours: a, days: c, progress: w, eta: v, snoozed: p };
  }
  const d = la(o, e.target), h = da(r, d);
  return h ? { kind: "suggest", ...h, dev: d, hours: a } : { kind: "fits", dev: d, hours: a, coldSeen: d.coldH >= tt };
}
function gn(r, e) {
  const t = Ie(r, e);
  return t === null ? null : Zn(t);
}
function ha(r, e = /* @__PURE__ */ new Date()) {
  const t = e.toISOString();
  return { started: t, target: r, step_since: t, log: [], due_at: Math.round(e.getTime() / 1e3 + (Ue + Pe * 24) * 3600) };
}
function _n(r, e) {
  const t = new Date(e.ts);
  return {
    ...r,
    step_since: e.ts,
    snooze_until: void 0,
    due_at: Math.round(t.getTime() / 1e3 + (Ue + Pe * 24) * 3600),
    log: [...r.log, e]
  };
}
const ua = ["prep", "settle", "collect", "adjust", "fits"];
function Dt(r, e = !0) {
  return new Date(r).toLocaleString(void 0, e ? { weekday: "short", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" } : { hour: "2-digit", minute: "2-digit" });
}
const bn = (r) => `${r > 0 ? "+" : r < 0 ? "−" : "±"}${j(Math.abs(r), 1)}`, ss = class ss extends se {
  constructor() {
    super(...arguments), this.admin = !1, this.demo = !1, this.canWrite = !1, this.circuit = "", this._start = !1, this._checks = /* @__PURE__ */ new Set(), this._target = 21, this._disturb = "", this._showLog = !1;
  }
  _emit(e, t) {
    this.dispatchEvent(new CustomEvent(e, { detail: t, bubbles: !0, composed: !0 }));
  }
  _openStart() {
    this._target = this.state?.target ?? this.params.roomSet, this._disturb = this.state?.disturb ?? "", this._checks = /* @__PURE__ */ new Set(), this._start = !0;
  }
  get _stepIdx() {
    const e = this.status;
    return !this.state || !e ? 0 : e.kind === "settle" ? 1 : e.kind === "collect" ? 2 : e.kind === "suggest" ? 3 : 4;
  }
  render() {
    return f`<div class="card coach">
      <div class="row head">
        <span class="cap">${L("wand")} ${l("cc.title")}</span>
        <span class="spacer"></span>
        ${this.state && this.admin ? f`<button class="small-btn" @click=${() => this._showLog = !this._showLog}>${L("history")} ${l("cc.log")} (${this.state.log.length})</button>
              <button class="small-btn" @click=${this._openStart}>${L("gear")} ${l("cc.settings")}</button>
              <button class="small-btn" @click=${() => confirm(l("cc.stop_q")) && this._emit("coach-stop")}>${l("cc.stop")}</button>` : y}
      </div>
      ${this.state ? this._running(this.state) : this._intro()}
      ${this._start ? this._startDialog() : y}
    </div>`;
  }
  _intro() {
    return f`<div class="intro">
      <p class="small">${l("cc.intro")}</p>
      <ol class="small how">
        <li>${l("cc.how1")}</li>
        <li>${l("cc.how2", { h: Ue })}</li>
        <li>${l("cc.how3", { h: gt, d: Pe })}</li>
        <li>${l("cc.how4")}</li>
      </ol>
      ${this.admin ? f`<button class="primary" @click=${this._openStart}>${L("play")} ${l("cc.start")}</button>` : f`<p class="muted small">${l("cc.admin_only")}</p>`}
    </div>`;
  }
  _stepper() {
    const e = this._stepIdx;
    return f`<ol class="stepper">
      ${ua.map(
      (t, s) => f`<li class=${s < e ? "done" : s === e ? "on" : ""}>
          <span class="dot">${s < e ? L("check") : s + 1}</span><span class="sl">${l(`cc.step.${t}`)}</span>
        </li>`
    )}
    </ol>`;
  }
  _running(e) {
    const t = this.status;
    return f`
      ${this._stepper()}
      <div class="meta small muted">
        ${l("cc.meta", { target: e.target, since: Dt(e.started), round: e.log.length + 1 })}
        ${e.disturb ? f` · ${l("cc.meta_disturb", { entity: e.disturb })}` : y}
        ${this.demo ? f` · <b>${l("cc.demo")}</b>` : y}
      </div>
      ${t ? y : f`<p class="muted small">${l("cc.loading")}</p>`}
      ${t?.kind === "settle" ? f`<div class="box info">
            <b>${l("cc.settle_t")}</b>
            <p class="small">${l("cc.settle", { until: Dt(t.until), h: Ue })}</p>
          </div>` : y}
      ${t?.kind === "collect" ? f`<div class="box info">
            <b>${l(t.snoozed ? "cc.snoozed_t" : "cc.collect_t")}</b>
            <div class="bar"><i style="width:${Math.round(t.progress * 100)}%"></i></div>
            <p class="small">${l("cc.collect", { h: t.hours, need: gt, d: t.days, needd: Pe, eta: Dt(t.eta) })}</p>
            <p class="small muted">${l("cc.collect_hint")}</p>
          </div>` : y}
      ${t?.kind === "suggest" ? this._suggest(t) : y}
      ${t?.kind === "fits" ? f`<div class="box ok">
            <b>${l("cc.fits_t")}</b>
            <p class="small">${l("cc.fits", { tol: Js })}</p>
            ${t.coldSeen ? y : f`<p class="small">${l("cc.fits_cold", { t: Xs })}</p>`}
          </div>` : y}
      ${t && t.kind !== "settle" && t.kind !== "collect" ? this._bands(t.dev) : y}
      ${this._showLog ? this._log(e) : y}
    `;
  }
  _bands(e) {
    const t = (s, i, n) => f`<div class="band ${i === void 0 ? "na" : Math.abs(i) <= Js ? "good" : i > 0 ? "warm" : "cold"}">
      <span class="bl">${s}</span>
      <b>${i === void 0 ? "–" : `${bn(i)} K`}</b>
      <span class="bh">${i === void 0 ? l("cc.band_need", { h: tt - Math.min(n, tt) }) : l("cc.band_h", { h: n })}</span>
    </div>`;
    return f`<div class="bands">
      ${t(l("cc.band_cold", { t: Xs }), e.cold, e.coldH)}
      ${t(l("cc.band_all"), e.all, e.mildH + e.coldH)}
      ${t(l("cc.band_mild", { t: Un }), e.mild, e.mildH)}
      ${e.idleH ? t(l("cc.band_idle", { t: this.params.limit }), e.idle, e.idleH) : y}
    </div>
    <p class="muted small">${l("cc.band_note")}</p>`;
  }
  _suggest(e) {
    const t = this.params, s = { ...t, ...e.change }, i = Object.entries(e.change), n = [-10, 0, 10].map((o) => ({ x: o, a: gn(t, o), b: gn(s, o) })).filter((o) => o.a !== null && o.b !== null);
    return f`<div class="box warn">
      <b>${l(`cc.why.${e.why}`)}</b>
      <p class="small">${l(`cc.whyx.${e.why}`)}</p>
      <ul class="small">
        ${i.map(([o, a]) => f`<li>${l(`cv.p.${o}`)}: ${j(t[o], 1)} → <b>${j(a, 1)}</b> ${o === "offset" ? "K" : "°C"}</li>`)}
      </ul>
      ${n.length ? f`<p class="small muted">${l("cc.effect")} ${n.map((o, a) => f`${a ? " · " : ""}${l("cc.effect_at", { x: o.x, a: o.a, b: o.b })}`)}</p>` : y}
      ${this.admin ? f`<div class="row btns">
            <button @click=${() => this._emit("coach-preview", e.change)}>${l("cv.try")}</button>
            ${this.canWrite ? f`<button class="primary" @click=${() => this._emit("coach-apply", { change: e.change, why: e.why, dev: e.dev, manual: !1 })}>${L("check")} ${l("cc.apply")}</button>` : y}
            <button class=${this.canWrite ? "" : "primary"} @click=${() => this._emit("coach-apply", { change: e.change, why: e.why, dev: e.dev, manual: !0 })}>${l("cc.manual")}</button>
            <button class="ghost" @click=${() => this._emit("coach-snooze")}>${l("cc.snooze")}</button>
          </div>
          ${this.canWrite ? y : f`<p class="muted small">${l("cc.manual_hint")}</p>`}` : y}
    </div>`;
  }
  _log(e) {
    return e.log.length ? f`<table class="log small">
      <thead><tr><th>${l("cc.log_when")}</th><th>${l("cc.log_change")}</th><th>${l("cc.log_why")}</th><th>${l("cc.log_dev")}</th></tr></thead>
      <tbody>
        ${[...e.log].reverse().map(
      (t) => f`<tr>
            <td>${Dt(t.ts)}</td>
            <td>${Object.entries(t.changes).map(
        ([s, [i, n]]) => f`<div>${l(`cv.p.${s}`)} ${j(i, 1)} → <b>${j(n, 1)}</b></div>`
      )}${t.manual ? f`<span class="muted"> (${l("cc.log_manual")})</span>` : y}</td>
            <td>${l(`cc.why.${t.why}`)}</td>
            <td>${t.dev?.all !== void 0 ? `${bn(t.dev.all)} K` : "–"}</td>
          </tr>`
    )}
      </tbody>
    </table>` : f`<p class="muted small">${l("cc.log_empty")}</p>`;
  }
  _startDialog() {
    const e = ["valves", "setback", "room", "doors"], t = this.hass ? Object.keys(this.hass.states).filter((n) => /^(binary_sensor|input_boolean|switch|climate|fan)\./.test(n)).sort() : [], s = e.every((n) => this._checks.has(n)), i = !!this.state;
    return f`<div class="backdrop" @click=${() => this._start = !1}></div>
      <div class="dialog card">
        <h3>${l(i ? "cc.settings_t" : "cc.start_t")}</h3>
        ${i ? y : f`<p class="small">${l("cc.prep")}</p>
              ${e.map(
      (n) => f`<label class="chk small"><input type="checkbox" .checked=${this._checks.has(n)}
                  @change=${(o) => {
        const a = new Set(this._checks);
        o.target.checked ? a.add(n) : a.delete(n), this._checks = a;
      }} /> ${l(`cc.chk.${n}`)}</label>`
    )}`}
        <label class="small field">${l("cc.target")}
          <input type="number" step="0.5" min="16" max="26" .value=${String(this._target)}
            @input=${(n) => this._target = Number(n.target.value)} /></label>
        <p class="muted small">${l("cc.target_hint")}</p>
        <label class="small field">${l("cc.disturb")}
          <input list="cc-ents" .value=${this._disturb} placeholder="binary_sensor.kaminofen"
            @input=${(n) => this._disturb = n.target.value.trim()} /></label>
        <datalist id="cc-ents">${t.map((n) => f`<option value=${n}></option>`)}</datalist>
        <p class="muted small">${l("cc.disturb_hint")}</p>
        <div class="row"><span class="spacer"></span>
          <button @click=${() => this._start = !1}>${l("cancel")}</button>
          <button class="primary" ?disabled=${!i && !s || !(this._target >= 16 && this._target <= 26)}
            @click=${() => {
      this._start = !1, this._emit(i ? "coach-settings" : "coach-start", { target: this._target, disturb: this._disturb || void 0 });
    }}>${i ? l("apply") : f`${L("play")} ${l("cc.start")}`}</button>
        </div>
      </div>`;
  }
};
ss.properties = {
  hass: { attribute: !1 },
  state: { attribute: !1 },
  status: { attribute: !1 },
  params: { attribute: !1 },
  admin: { type: Boolean },
  demo: { type: Boolean },
  canWrite: { type: Boolean },
  circuit: { type: String },
  _start: { state: !0 },
  _checks: { state: !0 },
  _target: { state: !0 },
  _disturb: { state: !0 },
  _showLog: { state: !0 }
}, ss.styles = [
  fe,
  oe`
      :host { display: block; }
      .coach { display: grid; gap: 10px; }
      .head { gap: 6px; flex-wrap: wrap; }
      .cap { display: inline-flex; gap: 6px; align-items: center; font-size: 11px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--cp-muted); font-weight: 700; }
      .small { font-size: 13px; line-height: 1.45; margin: 4px 0; }
      .small-btn { padding: 4px 10px; font-size: 12px; }
      .how { padding-left: 20px; margin: 4px 0 10px; }
      .intro button.primary { justify-self: start; }
      .stepper { display: flex; list-style: none; padding: 0; margin: 0; gap: 4px; }
      .stepper li { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; position: relative; font-size: 12px; color: var(--cp-muted); text-align: center; }
      .stepper li::before { content: ""; position: absolute; top: 13px; left: -50%; right: 50%; height: 2px; background: var(--cp-border); z-index: 0; }
      .stepper li:first-child::before { display: none; }
      .stepper li.done::before, .stepper li.on::before { background: var(--cp-accent); }
      .dot { width: 26px; height: 26px; border-radius: 50%; display: grid; place-items: center; background: var(--cp-surface-2); border: 2px solid var(--cp-border); font-weight: 700; z-index: 1; }
      .dot .ico { width: 14px; height: 14px; }
      li.done .dot { background: var(--cp-accent); border-color: var(--cp-accent); color: var(--cp-bg); }
      li.on .dot { border-color: var(--cp-accent); color: var(--cp-text); box-shadow: 0 0 0 4px color-mix(in srgb, var(--cp-accent) 20%, transparent); }
      li.on { color: var(--cp-text); font-weight: 700; }
      .box { padding: 10px 12px; border-radius: 10px; background: var(--cp-surface-2); border-left: 3px solid var(--cp-info); }
      .box.ok { border-left-color: var(--cp-accent); }
      .box.warn { border-left-color: var(--cp-warn); background: color-mix(in srgb, var(--cp-warn) 10%, var(--cp-surface-2)); }
      .box ul { margin: 4px 0; padding-left: 18px; }
      .bar { height: 8px; border-radius: 4px; background: var(--cp-border); overflow: hidden; margin: 8px 0 4px; }
      .bar i { display: block; height: 100%; background: var(--cp-accent); border-radius: 4px; transition: width 0.4s; }
      .btns { gap: 6px; flex-wrap: wrap; margin-top: 6px; }
      .bands { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 6px; }
      .band { display: grid; gap: 2px; padding: 8px 10px; border-radius: 10px; background: var(--cp-surface-2); border-top: 3px solid var(--cp-border); }
      .band.good { border-top-color: var(--cp-accent); }
      .band.warm { border-top-color: #ff7a45; }
      .band.cold { border-top-color: var(--cp-info); }
      .band b { font-size: 18px; }
      .bl, .bh { font-size: 12px; color: var(--cp-muted); }
      .log { width: 100%; border-collapse: collapse; }
      .log th { text-align: left; color: var(--cp-muted); font-weight: 600; border-bottom: 1px solid var(--cp-border); padding: 4px 6px; }
      .log td { padding: 5px 6px; border-bottom: 1px solid var(--cp-border); vertical-align: top; }
      .chk { display: flex; gap: 8px; align-items: flex-start; }
      .chk input { margin-top: 3px; }
      .field { display: grid; gap: 4px; margin-top: 8px; }
      .backdrop { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); z-index: 40; }
      .dialog { position: fixed; z-index: 41; left: 50%; top: 50%; transform: translate(-50%, -50%); width: min(480px, 92vw); max-height: 90vh; overflow: auto; }
      .dialog h3 { margin-top: 0; color: var(--cp-text); font-size: 16px; text-transform: none; letter-spacing: 0; }
      @media (max-width: 600px) { .sl { display: none; } li.on .sl { display: block; } }
    `
];
let Qs = ss;
customElements.get("cp-coach") || customElements.define("cp-coach", Qs);
const Me = 36e5, Je = [
  { key: "design", slot: "design_temp", min: 28, max: 65, step: 1 },
  { key: "offset", slot: "offset_temp", min: -10, max: 10, step: 0.5 },
  { key: "limit", slot: "heating_limit", min: 10, max: 22, step: 0.5 },
  { key: "minFlow", slot: "min_flow_temp", min: 15, max: 40, step: 1 },
  { key: "maxFlow", slot: "max_flow_temp", min: 30, max: 75, step: 1 },
  { key: "minExt", slot: "min_ext_temp", min: -25, max: 0, step: 1 },
  { key: "roomSet", slot: "room_setpoint", min: 15, max: 25, step: 0.5 }
], ht = 14, ma = 90, wn = 864e5, vn = -20, Ms = 22, fa = 20, ga = 70;
let yn = null;
const is = class is extends se {
  constructor() {
    super(...arguments), this.sim = null, this.version = 0, this.admin = !1, this._edit = {}, this._points = null, this._hc = "", this._msg = "", this._confirm = !1, this._restart = null, this._loadedFor = null, this._disturbed = /* @__PURE__ */ new Set(), this._dueFixedFor = "";
  }
  get _circuits() {
    return this.plant.components.filter((e) => e.type === "radiators" || e.type === "floor_heating");
  }
  get _circuit() {
    return this._circuits.find((e) => e.id === this._hc) || this._circuits[0];
  }
  /** Current parameters from the plant (or the simulator in demo mode). */
  _current() {
    const e = this._circuit;
    if (this.sim) return { ...this.sim.curve };
    const t = Cs(e?.type === "floor_heating");
    if (!e) return t;
    for (const s of Je) {
      const i = this.src.get(e, s.slot);
      i?.available && i.num !== null && (t[s.key] = i.num);
    }
    return t;
  }
  _writable(e) {
    if (this.sim) return !0;
    const t = this._circuit, s = Je.find((n) => n.key === e), i = t?.bindings[s.slot];
    return !!i && /^(number|input_number)\./.test(i) && this.admin;
  }
  /** Start of the measurement range set by the user (null = last DAYS days). */
  get _since() {
    const e = this._circuit && this.plant.settings.curve_since?.[this._circuit.id], t = e ? new Date(e) : null;
    return t && !isNaN(t.getTime()) && !this.sim ? t : null;
  }
  /** Measurement range: [start, now]. */
  _range(e) {
    const t = this._since, s = t ? new Date(Math.max(t.getTime(), e.getTime() - ma * wn)) : new Date(e.getTime() - ht * wn);
    return { start: s, span: Math.max(e.getTime() - s.getTime(), 36e5) };
  }
  _saveSince(e) {
    const t = this._circuit;
    if (!t) return;
    const s = structuredClone(this.plant), i = { ...s.settings.curve_since || {} };
    e ? i[t.id] = e : delete i[t.id], s.settings = { ...s.settings, curve_since: i }, this._restart = null, this.dispatchEvent(new CustomEvent("save", { detail: s, bubbles: !0, composed: !0 }));
  }
  willUpdate() {
    const e = `${this.sim ? `sim:${JSON.stringify(this.sim.curve)}` : "ha"}:${this._circuit?.id}:${this._since?.getTime() ?? ""}:${this._coach?.disturb ?? ""}`;
    e !== this._loadedFor && (this._loadedFor = e, this._load());
  }
  // ------------------------------------------------------------ history
  async _load() {
    this._points = null, this._disturbed = /* @__PURE__ */ new Set();
    const e = this._circuit, t = this.plant.components.find((n) => n.type === "outdoor_unit"), s = this.plant.components.find((n) => n.type === "indoor_unit");
    if (!e || !t) {
      this._points = [];
      return;
    }
    try {
      this._points = this.sim ? this._simPoints() : await this._hassPoints(e, t, s);
    } catch {
      this._points = [];
    }
    const i = ra(this._points);
    try {
      if (!this.sim) for (const n of await this._disturbHours()) i.add(n);
    } catch {
    }
    this._disturbed = i;
  }
  /**
   * Demo: last 24 h from the simulation plus earlier days from the climate model. The room
   * temperature of the modelled days follows a hidden "true" curve of the demo house, so the
   * coach has something to find.
   */
  _simPoints() {
    const e = this.sim, t = [], s = Math.floor(Date.now() / Me) * Me, i = { ...e.curve, design: Cs(e.curve.exponent < 1.2).design - 4, offset: 0.5 }, n = (p, d) => {
      const h = Ie(i, p) ?? d;
      return e.curve.roomSet + (d - h) / (e.curve.exponent > 1.2 ? 2.5 : 1.5);
    }, o = e.history("outdoor", "outdoor_temp", 24), a = e.history("hc", "flow_temp", 24), c = e.history("hc", "room_temp", 24);
    for (let p = 0; p < 24; p++) {
      const d = e.time - (24 - p) * 3600, h = (v) => v.filter((w) => w.t >= d && w.t < d + 3600 && w.v !== null).map((w) => w.v), m = h(o), u = h(a), g = h(c);
      if (!m.length || !u.length) continue;
      const b = (v) => v.reduce((w, x) => w + x, 0) / v.length;
      b(m) >= e.curve.limit || t.push({ ts: s - (24 - p) * Me, tOut: b(m), flow: b(u), room: g.length ? b(g) : void 0, age: 0, heating: !0 });
    }
    for (let p = 1; p < ht; p++)
      for (let d = 0; d < 24; d += 1) {
        const h = e.outdoorMean + 2.5 * Math.cos((d - 15) / 24 * 2 * Math.PI) + Math.sin(p * 1.7 + d) * 3 + Math.sin(p * 0.45) * 4, m = Ie(e.curve, h);
        if (m === null) continue;
        const u = m + Math.sin(p * 3.1 + d * 0.7) * 1.4 - 0.6;
        t.push({ ts: s - (p * 24 + 24 - d) * Me, tOut: h, flow: u, room: n(h, u) + Math.sin(p + d) * 0.15, age: p / ht, heating: !0 });
      }
    return t;
  }
  /** Hourly means from the recorder's long-term statistics. */
  async _hassPoints(e, t, s) {
    const i = {
      out: t.bindings.outdoor_temp,
      flow: e.bindings.flow_temp || s?.bindings.supply_temp,
      room: e.bindings.room_temp,
      heat: t.bindings.heat_power
    };
    if (!i.out || !i.flow || !this.hass) return [];
    const n = /* @__PURE__ */ new Date(), { start: o, span: a } = this._range(n), c = await this.hass.callWS({
      type: "recorder/statistics_during_period",
      start_time: o.toISOString(),
      end_time: n.toISOString(),
      statistic_ids: Object.values(i).filter(Boolean),
      period: "hour",
      types: ["mean"]
    }), p = (v) => new Map((v ? c[v] || [] : []).map((w) => [w.start, w.mean])), d = p(i.out), h = p(i.flow), m = p(i.room), u = p(i.heat), g = this._current().limit, b = [];
    for (const [v, w] of d) {
      const x = h.get(v);
      if (w == null || x == null) continue;
      const k = Math.min(1, (n.getTime() - v) / a), C = m.get(v) ?? void 0;
      if (w >= g) {
        b.push({ ts: v, tOut: w, flow: x, room: C, age: k, heating: !1 });
        continue;
      }
      const D = u.get(v);
      u.size && (D == null || D < 0.3) || b.push({ ts: v, tOut: w, flow: x, room: C, age: k, heating: !0 });
    }
    return b;
  }
  /** Hours (epoch ms) in which the coach's disturbance entity was on. */
  async _disturbHours() {
    const e = this._coach?.disturb;
    if (!e || !this.hass) return [];
    const t = /* @__PURE__ */ new Date(), { start: s } = this._range(t), n = (await this.hass.callWS({
      type: "history/history_during_period",
      start_time: s.toISOString(),
      end_time: t.toISOString(),
      entity_ids: [e],
      minimal_response: !0,
      no_attributes: !0
    }))[e] || [], o = (c) => ["on", "heat", "heating", "open", "true", "home"].includes(c.toLowerCase()), a = [];
    for (let c = 0; c < n.length; c++) {
      if (!o(n[c].s)) continue;
      const p = Math.floor(n[c].lu * 1e3 / Me) * Me, d = c + 1 < n.length ? n[c + 1].lu * 1e3 : t.getTime();
      for (let h = p; h <= d + Me; h += Me) a.push(h);
    }
    return a;
  }
  // ------------------------------------------------------------ actions
  _set(e, t) {
    this._edit = { ...this._edit, [e]: t }, this._msg = "";
  }
  async _write(e) {
    if (this.sim) {
      this.sim.curve = { ...this.sim.curve, ...e };
      return;
    }
    const t = this._circuit;
    for (const [s, i] of Object.entries(e)) {
      const n = Je.find((a) => a.key === s), o = t.bindings[n.slot];
      o && await this.hass.callWS({
        type: "call_service",
        domain: o.split(".")[0],
        service: "set_value",
        service_data: { entity_id: o, value: i }
      });
    }
  }
  async _apply() {
    this._confirm = !1;
    const e = this._edit;
    try {
      await this._write(e);
    } catch (s) {
      this._msg = s?.message || String(s);
      return;
    }
    const t = this._coach;
    if (t) {
      const s = this._current(), i = {};
      for (const [n, o] of Object.entries(e)) i[n] = [s[n], o];
      this._saveCoach(_n(t, { ts: this._stepTs(), changes: i, why: "user" }));
    }
    this._edit = {}, this._msg = l("cv.applied");
  }
  // ------------------------------------------------------------ coach
  get _coach() {
    const e = this._circuit;
    return e ? this.plant.settings.curve_coach?.[e.id] : void 0;
  }
  /**
   * Time of a coach step. In the demo the waiting time is skipped: the step is dated back so
   * that the modelled days count right away.
   */
  _stepTs() {
    const e = this.sim ? (Ue + Pe * 24 + 12) * Me : 0;
    return new Date(Date.now() - e).toISOString();
  }
  /** Save the coach state; every step also restarts the measurements shown in the chart. */
  _saveCoach(e) {
    const t = this._circuit;
    if (!t) return;
    const s = structuredClone(this.plant), i = { ...s.settings.curve_coach || {} }, n = { ...s.settings.curve_since || {} };
    e ? (i[t.id] = e, this.sim || (n[t.id] = e.step_since)) : delete i[t.id], s.settings = { ...s.settings, curve_coach: i, curve_since: n }, this.dispatchEvent(new CustomEvent("save", { detail: s, bubbles: !0, composed: !0 }));
  }
  _coachStart(e) {
    const t = ha(e.target, new Date(this._stepTs()));
    this._saveCoach({ ...t, disturb: e.disturb });
  }
  async _coachApply(e) {
    const t = this._coach;
    if (!t) return;
    const s = this._current(), i = {};
    for (const [o, a] of Object.entries(e.change)) i[o] = [s[o], a];
    if (!e.manual || this.sim)
      try {
        await this._write(e.change);
      } catch (o) {
        this._msg = o?.message || String(o);
        return;
      }
    this._edit = {};
    const n = e.dev ? { mild: e.dev.mild, cold: e.dev.cold, all: e.dev.all } : void 0;
    this._saveCoach(_n(t, { ts: this._stepTs(), changes: i, why: e.why, dev: n, manual: e.manual && !this.sim })), this._msg = l("cc.applied");
  }
  /**
   * Keep the backend's "evaluation due" message honest: while data is still missing, move
   * the due time to the estimate; when the curve fits, check again in a week.
   */
  _fixDue(e, t) {
    if (!e || !t || !this.admin || this.sim) return;
    const s = Date.now() / 1e3;
    let i;
    if (t.kind === "collect" && (e.due_at ?? 0) <= s ? i = Math.round(t.eta / 1e3) : t.kind === "fits" && (e.due_at ?? 0) <= s && (i = Math.round(s + 7 * 86400)), i === void 0) return;
    const n = `${this._circuit?.id}:${e.step_since}:${t.kind}`;
    this._dueFixedFor !== n && (this._dueFixedFor = n, queueMicrotask(() => this._saveCoach({ ...e, due_at: i })));
  }
  // ------------------------------------------------------------ render
  _chart(e, t, s) {
    const i = (w) => {
      const x = [];
      for (let k = vn; k <= Math.min(Ms, w.limit); k += 0.5) {
        const C = Ie(w, k);
        if (C === null) break;
        x.push([k, Math.round(C * 10) / 10]);
      }
      return x;
    }, n = this._circuit, o = this.plant.components.find((w) => w.type === "outdoor_unit"), a = this.plant.components.find((w) => w.type === "indoor_unit"), c = o ? this.src.get(o, "outdoor_temp") : void 0, p = n && this.src.get(n, "flow_temp") || a && this.src.get(a, "supply_temp"), d = c?.available ? c.num : null, h = p?.available ? p.num : null, m = d !== null ? Ie(e, d) : null, u = i(e), g = t ? i(t) : [], b = (w) => `${j(w, Number.isInteger(w) ? 0 : 1)} °C`;
    return f`<cp-echart class="curve-chart" .option=${(w) => ({
      animation: !1,
      textStyle: { fontFamily: "inherit" },
      grid: { left: 8, right: 16, top: 30, bottom: 8, containLabel: !0 },
      tooltip: {
        trigger: "item",
        backgroundColor: w.surface,
        borderColor: w.border,
        textStyle: { color: w.text, fontSize: 12 },
        formatter: (x) => {
          const [k, C] = x.value, D = x.data?.pt;
          let E = `<b>${x.seriesName}</b>`;
          if (D) {
            const Y = new Date(D.ts), U = new Date(D.ts + Me), re = Y.toLocaleDateString(void 0, { weekday: "short", day: "2-digit", month: "2-digit", year: "numeric" }), Z = (ae) => ae.toLocaleTimeString(void 0, { hour: "2-digit", minute: "2-digit" });
            E = `<b>${re}, ${Z(Y)}–${Z(U)}</b><br><span style="opacity:.7">${l("cv.tip_mean")}</span>`;
          }
          let W = l("cv.tip", { out: b(k), flow: b(C) });
          return D?.room !== void 0 && (W += `<br>${l("cv.tip_room", { room: b(Math.round(D.room * 10) / 10) })}`), D && this._disturbed.has(D.ts) && (W += `<br><i>${l("cv.tip_disturbed")}</i>`), `${E}<br>${W}`;
        }
      },
      xAxis: {
        type: "value",
        min: vn,
        max: Ms,
        interval: 10,
        axisLabel: { color: w.muted, formatter: (x) => `${x} °C` },
        axisLine: { lineStyle: { color: w.border } },
        splitLine: { lineStyle: { color: w.border, type: "dashed" } }
      },
      yAxis: {
        type: "value",
        min: fa,
        max: ga,
        interval: 10,
        name: l("cv.axis_flow"),
        nameTextStyle: { color: w.muted, align: "left" },
        axisLine: { show: !1, onZero: !1 },
        axisLabel: { color: w.muted },
        splitLine: { lineStyle: { color: w.border, type: "dashed" } }
      },
      series: [
        {
          name: this._pointsLabel(),
          type: "scatter",
          symbolSize: 6,
          z: 1,
          data: s.filter((x) => x.heating).map((x) => ({
            value: [x.tOut, Math.round(x.flow * 10) / 10],
            pt: x,
            itemStyle: this._disturbed.has(x.ts) ? { color: "transparent", borderColor: "#f5c542", borderWidth: 1, opacity: 0.6 } : { color: "#f5c542", opacity: 0.85 - x.age * 0.6 }
          })),
          markArea: {
            silent: !0,
            itemStyle: { color: "rgba(77,159,255,0.08)" },
            label: { color: w.muted, position: "insideTop" },
            data: [[{ name: l("cv.no_heating"), xAxis: e.limit }, { xAxis: Ms }]]
          }
        },
        {
          name: l("cv.curve"),
          type: "line",
          showSymbol: !1,
          z: 3,
          data: u,
          lineStyle: { color: "#3ddc97", width: 3 },
          itemStyle: { color: "#3ddc97" }
        },
        {
          name: l("cv.preview"),
          type: "line",
          showSymbol: !1,
          z: 4,
          data: g,
          lineStyle: { color: "#4d9fff", width: 2.5, type: "dashed" },
          itemStyle: { color: "#4d9fff" }
        },
        {
          name: l("cv.target"),
          type: "scatter",
          z: 5,
          symbolSize: 13,
          data: d !== null && m !== null ? [[d, Math.round(m * 10) / 10]] : [],
          itemStyle: { color: "transparent", borderColor: "#3ddc97", borderWidth: 2 }
        },
        {
          name: l("cv.now"),
          type: "scatter",
          z: 6,
          symbolSize: 11,
          data: d !== null && h !== null ? [[d, h]] : [],
          itemStyle: { color: "#ff7a45", shadowBlur: 10, shadowColor: "#ff7a45" }
        }
      ]
    })}></cp-echart>`;
  }
  connectedCallback() {
    super.connectedCallback(), yn ??= import("./echart-B_4jTAey.js").catch((e) => {
      yn = null, console.error("COPilot: chart module failed to load", e);
    });
  }
  _pointsLabel() {
    const e = this._since;
    if (!e) return l("cv.points", { days: ht });
    const t = e.toLocaleString(void 0, { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
    return l("cv.points_since", { date: t });
  }
  /** now as value for <input type="datetime-local"> */
  _localNow() {
    const e = /* @__PURE__ */ new Date();
    return e.setMinutes(e.getMinutes() - e.getTimezoneOffset()), e.toISOString().slice(0, 16);
  }
  render() {
    const e = this._current(), t = Object.keys(this._edit).length > 0, s = t ? { ...e, ...this._edit } : null, i = s || e, n = this._points || [], o = n.filter((g) => g.heating), a = this._coach, c = a && this._points ? pa(e, a, n, this._disturbed) : null;
    this._fixDue(a, c);
    const p = o.filter((g) => g.age < 0.5 && g.room !== void 0).map((g) => g.room), d = p.length ? p.reduce((g, b) => g + b, 0) / p.length : void 0, h = o.length ? o.reduce((g, b) => g + (b.flow - (Ie(e, b.tOut) ?? b.flow)), 0) / o.length : void 0, m = d !== void 0 ? Ho(e, d) : 0, u = this._circuits;
    return f`
      <div class="grid">
        <div class="card chart-card">
          <div class="row head">
            <h2>${l("cv.title")}</h2>
            ${u.length > 1 ? f`<select @change=${(g) => this._hc = g.target.value}>
                  ${u.map((g) => f`<option value=${g.id} ?selected=${g.id === this._circuit?.id}>${g.label}</option>`)}
                </select>` : f`<span class="muted">${this._circuit?.label || ""}</span>`}
            <span class="spacer"></span>
            <span class="lg"><i class="l-curve"></i>${l("cv.curve")}</span>
            ${s ? f`<span class="lg"><i class="l-next"></i>${l("cv.preview")}</span>` : y}
            <span class="lg"><i class="l-pt"></i>${this._pointsLabel()}</span>
            <span class="lg"><i class="l-live"></i>${l("cv.now")}</span>
          </div>
          ${this._chart(e, s, o)}
          ${this.sim ? f`<p class="muted small">${l("cv.demo_note")}</p>` : y}
          ${!this.sim && this.admin ? f`<div class="row since">
                <button class="small-btn" @click=${() => this._restart = this._localNow()}>${L("rotate")} ${l("cv.restart")}</button>
                ${this._since ? f`<button class="small-btn" @click=${() => this._saveSince(null)}>${l("cv.show_all", { days: ht })}</button>` : y}
              </div>` : y}
          ${!this.sim && this._points && !o.length ? f`<p class="muted small">${l("cv.no_points")}</p>` : y}
        </div>
        <div class="side">
          <div class="card">
            <div class="cap">${l("cv.params")}</div>
            ${Je.map((g) => {
      const b = i[g.key], v = g.key in this._edit, w = this._writable(g.key);
      return f`<label class="param ${v ? "changed" : ""}">
                <span class="pname">${l(`cv.p.${g.key}`)}</span>
                <b>${j(b, g.step < 1 ? 1 : 0)} ${g.key === "offset" ? "K" : "°C"}</b>
                <input type="range" min=${g.min} max=${g.max} step=${g.step} .value=${String(b)} ?disabled=${!w}
                  @input=${(x) => this._set(g.key, Number(x.target.value))} />
              </label>`;
    })}
            ${!this.sim && !Je.some((g) => this._writable(g.key)) ? f`<p class="muted small">${l("cv.readonly")}</p>` : y}
            <div class="row actions">
              <button ?disabled=${!t} @click=${() => this._edit = {}}>${l("discard")}</button>
              <span class="spacer"></span>
              <button class="primary" ?disabled=${!t} @click=${() => this._confirm = !0}>${L("check")} ${l("apply")}</button>
            </div>
            ${this._msg ? f`<p class="ok">${this._msg}</p>` : y}
          </div>
          <div class="card">
            <div class="cap">${l("cv.analysis")}</div>
            ${h !== void 0 ? f`<p class="small">${l(h >= 0 ? "cv.deviation_above" : "cv.deviation_below", { value: Math.abs(h) })}</p>` : y}
            ${d !== void 0 ? f`<p class="small">${l("cv.room", { room: d, set: e.roomSet })}</p>
                  ${a ? f`<p class="muted small">${l("cv.see_coach")}</p>` : Math.abs(m) >= 0.5 ? f`<div class="hint">${l(m < 0 ? "cv.suggest_down" : "cv.suggest_up", { value: Math.abs(m), target: e.offset + m })}
                        <button class="small-btn" @click=${() => this._set("offset", e.offset + m)}>${l("cv.try")}</button></div>` : f`<p class="ok small">${l("cv.fits")}</p>`}` : f`<p class="muted small">${l("cv.no_room")}</p>`}
          </div>
        </div>
      </div>
      ${this._circuit ? f`<cp-coach
            .hass=${this.hass}
            .state=${a}
            .status=${c}
            .params=${e}
            ?admin=${this.admin || !!this.sim}
            ?demo=${!!this.sim}
            ?canWrite=${!!this.sim || Je.some((g) => this._writable(g.key))}
            @coach-start=${(g) => this._coachStart(g.detail)}
            @coach-settings=${(g) => a && this._saveCoach({ ...a, ...g.detail })}
            @coach-stop=${() => this._saveCoach(null)}
            @coach-preview=${(g) => {
      this._edit = { ...g.detail }, this._msg = "";
    }}
            @coach-snooze=${() => a && this._saveCoach({ ...a, snooze_until: new Date(Date.now() + 2 * 864e5).toISOString(), due_at: Math.round(Date.now() / 1e3) + 2 * 86400 })}
            @coach-apply=${(g) => this._coachApply(g.detail)}
          ></cp-coach>` : y}
      ${this._restart !== null ? f`<div class="backdrop" @click=${() => this._restart = null}></div>
            <div class="dialog card">
              <h3>${l("cv.restart_title")}</h3>
              <p class="small">${l("cv.restart_text")}</p>
              <label class="small">${l("cv.restart_from")}
                <input type="datetime-local" .value=${this._restart}
                  @input=${(g) => this._restart = g.target.value} /></label>
              <div class="row"><span class="spacer"></span>
                <button @click=${() => this._restart = null}>${l("cancel")}</button>
                <button class="primary" ?disabled=${!this._restart}
                  @click=${() => this._saveSince(new Date(this._restart).toISOString())}>${l("apply")}</button></div>
            </div>` : y}
      ${this._confirm ? f`<div class="backdrop" @click=${() => this._confirm = !1}></div>
            <div class="dialog card">
              <h3>${l("cv.confirm_title")}</h3>
              <ul>${Object.entries(this._edit).map(
      ([g, b]) => f`<li>${l(`cv.p.${g}`)}: ${j(e[g], 1)} → <b>${j(b, 1)}</b></li>`
    )}</ul>
              <p class="muted small">${this.sim ? l("cv.confirm_demo") : l("cv.confirm_live")}</p>
              <div class="row"><span class="spacer"></span>
                <button @click=${() => this._confirm = !1}>${l("cancel")}</button>
                <button class="primary" @click=${this._apply}>${l("apply")}</button></div>
            </div>` : y}
    `;
  }
};
is.properties = {
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
  _restart: { state: !0 },
  _disturbed: { state: !0 }
}, is.styles = [
  fe,
  oe`
      :host { display: block; }
      .grid { display: grid; grid-template-columns: 1fr 320px; gap: 12px; align-items: start; }
      cp-coach { margin-top: 12px; }
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
let ei = is;
customElements.get("cp-curve") || customElements.define("cp-curve", ei);
const xn = 86400, zs = 30.44;
function _a(r) {
  const e = (p, d = () => !0) => r.components.find((h) => h.type === p && d(h.props || {})), t = [], s = (p, d, h) => t.push({ id: p, key: p, interval_days: d, component: h });
  s("pressure", 91, e("indoor_unit")?.id);
  const i = e("separator", (p) => !!p.filter);
  i && s("filter", 365, i.id);
  const n = e("separator", (p) => !p.filter);
  n && s("separator", 182, n.id);
  const o = e("expansion_vessel");
  o && s("expansion", 365, o.id);
  const a = e("outdoor_unit");
  a && s("outdoor", 182, a.id);
  const c = e("dhw_tank");
  return c && s("anode", 730, c.id), s("service", 365, a?.id), t;
}
function ba(r, e) {
  if (!r.last_done) return { status: "unknown" };
  const t = r.last_done + r.interval_days * xn, s = Math.round((t - e) / xn);
  return { status: s < 0 ? "due" : s <= 30 ? "soon" : "ok", next: t, days: s };
}
const wa = (r) => new Date(r * 1e3).toLocaleDateString(void 0, { day: "2-digit", month: "2-digit", year: "numeric" }), va = (r) => {
  const e = new Date(r * 1e3);
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, "0")}-${String(e.getDate()).padStart(2, "0")}`;
}, ns = class ns extends se {
  constructor() {
    super(...arguments), this.admin = !0, this._newTitle = "", this._newMonths = 12;
  }
  get _tasks() {
    return this.plant.settings.maintenance?.tasks ?? _a(this.plant);
  }
  _save(e) {
    const t = structuredClone(this.plant);
    t.settings = { ...t.settings, maintenance: { tasks: e } }, this.dispatchEvent(new CustomEvent("save", { detail: t, bubbles: !0, composed: !0 }));
  }
  _update(e, t) {
    this._save(this._tasks.map((s) => s.id === e ? { ...s, ...t } : s));
  }
  _title(e) {
    return e.title || l(`mt.${e.key}`);
  }
  _done(e) {
    confirm(l("mt.done_confirm", { task: this._title(e) })) && this._update(e.id, { last_done: Math.round(Date.now() / 1e3) });
  }
  _add() {
    const e = this._newTitle.trim();
    if (!e) return;
    const t = `custom_${Date.now().toString(36)}`;
    this._save([...this._tasks, { id: t, title: e, interval_days: Math.round(this._newMonths * zs) }]), this._newTitle = "";
  }
  _remove(e) {
    confirm(l("mt.remove_confirm", { task: this._title(e) })) && this._save(this._tasks.filter((t) => t.id !== e.id));
  }
  render() {
    const e = Date.now() / 1e3, t = { due: 0, soon: 1, unknown: 2, ok: 3 }, s = [...this._tasks].map((o) => ({ task: o, ...ba(o, e) })).sort((o, a) => t[o.status] - t[a.status] || (o.next ?? 0) - (a.next ?? 0)), i = s.filter((o) => o.status === "due").length, n = s.filter((o) => o.status === "unknown").length;
    return f`<div class="card wrap">
      <div class="row head">
        <h2>${l("mt.title")}</h2>
        ${i ? f`<span class="chip due">${l("mt.n_due", { n: i })}</span>` : y}
        ${n ? f`<span class="chip unknown">${l("mt.n_unknown", { n })}</span>` : y}
        ${!i && !n ? f`<span class="chip ok">${l("mt.all_ok")}</span>` : y}
      </div>
      <p class="muted hint">${l("mt.hint")}</p>
      <ul class="tasks">
        ${s.map(
      ({ task: o, status: a, next: c, days: p }) => f`<li class=${a}>
            <div class="main">
              <div class="t">${this._title(o)}</div>
              ${o.key ? f`<div class="muted small">${l(`mt.${o.key}_how`)}</div>` : y}
              <div class="meta">
                <span class="st ${a}">${a === "unknown" ? l("mt.enter_date") : a === "due" ? l("mt.overdue", { n: -p }) : l("mt.next", { date: wa(c), n: p })}</span>
              </div>
            </div>
            <label class="f">${l("mt.last")}
              <input type="date" .value=${o.last_done ? va(o.last_done) : ""} ?disabled=${!this.admin}
                @change=${(d) => {
        const h = d.target.value;
        this._update(o.id, { last_done: h ? Math.round((/* @__PURE__ */ new Date(`${h}T12:00:00`)).getTime() / 1e3) : void 0 });
      }} /></label>
            <label class="f">${l("mt.every")}
              <span class="iv"><input type="number" min="1" max="120" .value=${j(o.interval_days / zs, 0)} ?disabled=${!this.admin}
                @change=${(d) => this._update(o.id, { interval_days: Math.max(1, Math.round(Number(d.target.value) * zs)) })} />
                ${l("mt.months")}</span></label>
            <div class="acts">
              <button class="primary" ?disabled=${!this.admin} @click=${() => this._done(o)}>${L("check")} ${l("mt.done")}</button>
              <button class="ghost icon" title=${l("mt.remove")} ?disabled=${!this.admin} @click=${() => this._remove(o)}>${L("trash")}</button>
            </div>
          </li>`
    )}
      </ul>
      ${this.admin ? f`<div class="row add">
            <input placeholder=${l("mt.new")} .value=${this._newTitle} @input=${(o) => this._newTitle = o.target.value}
              @keydown=${(o) => o.key === "Enter" && this._add()} />
            <span class="iv"><input type="number" min="1" max="120" .value=${String(this._newMonths)}
              @change=${(o) => this._newMonths = Number(o.target.value) || 12} /> ${l("mt.months")}</span>
            <button @click=${this._add} ?disabled=${!this._newTitle.trim()}>${L("plus")} ${l("mt.add")}</button>
          </div>` : y}
    </div>`;
  }
};
ns.properties = { plant: { attribute: !1 }, admin: { type: Boolean }, _newTitle: { state: !0 }, _newMonths: { state: !0 } }, ns.styles = [
  fe,
  oe`
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
let ti = ns;
customElements.get("cp-maintenance") || customElements.define("cp-maintenance", ti);
const Rt = ["overview", "efficiency", "check", "curve", "maintenance", "messages"], $n = [...Rt, "config"], qn = {
  overview: "grid",
  efficiency: "chart",
  check: "check",
  curve: "curve",
  maintenance: "wrench",
  messages: "bell",
  config: "gear"
};
function Yn(r, e, t) {
  const s = t.ctl, i = s.src, n = (o) => t.save(o.detail);
  switch (r) {
    case "overview": {
      const o = t.overview;
      return f`<cp-overview
        .plant=${e}
        .src=${i}
        .icons=${s.icons}
        .messages=${s.messages}
        .sim=${s.sim}
        .hass=${t.hass}
        .api=${s.api}
        ?admin=${s.admin}
        .version=${s.version}
        .showKpis=${o ? o.showKpis !== !1 : !0}
        .showSide=${o ? !!o.showSide : !0}
        .showDemo=${o ? !!o.showDemo : !0}
        ?narrow=${t.narrow}
        @scenario=${(a) => s.scenario(a.detail)}
      ></cp-overview>`;
    }
    case "efficiency":
      return f`<cp-efficiency .plant=${e} .src=${i} .hass=${t.hass} .sim=${s.sim} .version=${s.version}></cp-efficiency>`;
    case "check":
      return f`<cp-check .plant=${e} .src=${i} .sim=${s.sim} .version=${s.version}></cp-check>`;
    case "curve":
      return f`<cp-curve .plant=${e} .src=${i} .hass=${t.hass} .sim=${s.sim} .version=${s.version} ?admin=${s.admin} @save=${n}></cp-curve>`;
    case "maintenance":
      return f`<cp-maintenance .plant=${e} ?admin=${s.admin} @save=${n}></cp-maintenance>`;
    case "messages":
      return f`<div class="card pad"><cp-messages
        .messages=${s.messages}
        ?canClear=${s.admin && !s.sim}
        @clear=${() => s.clearMessages()}
      ></cp-messages></div>`;
    default:
      return y;
  }
}
const os = class os extends se {
  constructor() {
    super(...arguments), this.isPanel = !1, this._config = { type: "custom:copilot-card" }, this._ctl = new On(this, !1), this._narrow = !1, this._view = null, this._err = "", this._touch = () => {
      window.clearTimeout(this._backTimer);
      const e = Number(this._config.back_after) || 0;
      e > 0 && this._current !== this._views[0] && (this._backTimer = window.setTimeout(() => this._view = null, e * 1e3));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resizeObs = new ResizeObserver((e) => {
      const t = e[0]?.contentRect.width ?? 0;
      t > 0 && (this._narrow = t < 700);
    }), this._resizeObs.observe(this);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._resizeObs?.disconnect(), window.clearTimeout(this._backTimer);
  }
  get _views() {
    const e = (this._config.views || []).filter((t) => Rt.includes(t));
    return e.length ? e : ["overview"];
  }
  get _current() {
    const e = this._views;
    return this._view && e.includes(this._view) ? this._view : e[0];
  }
  _go(e) {
    this._view = e, this._err = "", this.updateComplete.then(this._touch);
  }
  async _save(e) {
    try {
      await this._ctl.save(e), this._err = "";
    } catch (t) {
      this._err = t?.message || String(t);
    }
  }
  setConfig(e) {
    if (!e) throw new Error("Invalid configuration");
    this._config = { show_kpis: !0, show_messages: !1, show_demo_controls: !1, ...e };
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
  willUpdate(e) {
    e.has("hass") && this.hass && this._ctl.setHass(this.hass);
    const t = this.clientWidth;
    t > 0 && (this._narrow = t < 700);
  }
  render() {
    const e = this._config, t = this._ctl.plant, s = e.height || (this.isPanel ? "calc(100vh - var(--header-height, 56px) - 16px)" : "560px"), i = this._views, n = this._current;
    return f`<ha-card style="height:${s}" @pointerdown=${this._touch} @keydown=${this._touch}>
      ${i.length > 1 ? f`<nav>
            ${i.map(
      (o) => f`<button class="tab ${n === o ? "on" : ""}" title=${l(`nav.${o}`)} @click=${() => this._go(o)}>
                ${L(qn[o])}<span class="tl">${l(`nav.${o}`)}</span>
              </button>`
    )}
          </nav>` : y}
      ${this._ctl.error || this._err ? f`<div class="err">${this._ctl.error || this._err}</div>` : y}
      ${t ? f`<div class="body ${n === "overview" ? "fill" : ""}">
            ${Yn(n, t, {
      ctl: this._ctl,
      hass: this.hass,
      narrow: this._narrow,
      save: (o) => this._save(o),
      overview: { showKpis: e.show_kpis !== !1, showSide: !!e.show_messages, showDemo: !!e.show_demo_controls }
    })}
          </div>` : f`<div class="loading">${Ws}</div>`}
    </ha-card>`;
  }
};
os.properties = {
  hass: { attribute: !1 },
  isPanel: { type: Boolean },
  _config: { state: !0 },
  _narrow: { state: !0 },
  _view: { state: !0 },
  _err: { state: !0 }
}, os.styles = [
  Vn,
  fe,
  oe`
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
      nav { display: flex; gap: 4px; margin-bottom: 8px; flex-wrap: wrap; }
      .tab { background: transparent; border-color: transparent; color: var(--cp-muted); }
      .tab.on { background: var(--cp-surface-2); color: var(--cp-text); border-color: var(--cp-border); }
      .body { flex: 1; min-height: 0; overflow: auto; display: flex; flex-direction: column; gap: 10px; }
      .body.fill { overflow: hidden; }
      .body > cp-overview { flex: 1; min-height: 0; }
      .pad { overflow: auto; }
      @media (max-width: 800px) { .tab:not(.on) .tl { display: none; } }
      .loading { flex: 1; display: grid; place-items: center; }
      .loading svg { width: 48px; height: 48px; opacity: 0.7; }
      .err { color: var(--cp-error); font-size: 13px; }
    `
];
let si = os;
const rs = class rs extends se {
  constructor() {
    super(...arguments), this._config = { type: "custom:copilot-card" };
  }
  setConfig(e) {
    this._config = e;
  }
  _set(e, t) {
    const s = { ...this._config, [e]: t };
    (t === "" || t === void 0) && delete s[e], this._config = s, this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: s }, bubbles: !0, composed: !0 }));
  }
  render() {
    const e = this._config, t = (n, o, a) => f`<label class="row">
      <input type="checkbox" .checked=${e[n] ?? a} @change=${(c) => this._set(n, c.target.checked)} />
      ${o}</label>`, s = e.views?.length ? e.views : ["overview"], i = (n, o) => {
      const a = Rt.filter((c) => c === n ? o : s.includes(c));
      this._set("views", (a.length > 1 || a[0] !== "overview") && a.length ? a : void 0);
    };
    return f`<div class="ed">
      <div class="field">${l("card.views")}</div>
      <div class="views">
        ${Rt.map(
      (n) => f`<label class="row"><input type="checkbox" .checked=${s.includes(n)} ?disabled=${s.length === 1 && s[0] === n}
            @change=${(o) => i(n, o.target.checked)} /> ${l(`nav.${n}`)}</label>`
    )}
      </div>
      <p class="hint">${l("card.views_hint")}</p>
      <label class="field">${l("card.back_after")}
        <input type="number" min="0" step="10" .value=${String(e.back_after ?? "")} placeholder="0"
          @change=${(n) => {
      const o = Number(n.target.value);
      this._set("back_after", o > 0 ? o : void 0);
    }} /></label>
      ${t("show_kpis", l("card.show_kpis"), !0)}
      ${t("show_messages", l("card.show_messages"), !1)}
      ${t("show_demo_controls", l("card.show_demo"), !1)}
      <label class="field">${l("card.height")}
        <input .value=${e.height || ""} placeholder="560px" @change=${(n) => this._set("height", n.target.value.trim())} /></label>
      <p class="hint">${l("card.hint")}</p>
    </div>`;
  }
};
rs.properties = { hass: { attribute: !1 }, _config: { state: !0 } }, rs.styles = [
  fe,
  oe`
      .ed { display: grid; gap: 10px; color: var(--primary-text-color); }
      .row { display: flex; gap: 8px; align-items: center; font-size: 14px; }
      .field { color: var(--secondary-text-color); }
      .views { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 6px; }
      input:not([type]), input[type="number"] { background: transparent; color: var(--primary-text-color); border-color: var(--divider-color); }
      .hint { font-size: 12px; color: var(--secondary-text-color); margin: 0; }
    `
];
let ii = rs;
customElements.get("copilot-card") || customElements.define("copilot-card", si);
customElements.get("copilot-card-editor") || customElements.define("copilot-card-editor", ii);
const Nt = window;
Nt.customCards = Nt.customCards || [];
Nt.customCards.some((r) => r.type === "copilot-card") || Nt.customCards.push({
  type: "copilot-card",
  name: "COPilot",
  description: "Animated heat pump schematic with live values",
  preview: !1,
  documentationURL: "https://github.com/junky84/copilot"
});
const kn = "copilot.view";
function ya(r) {
  try {
    return localStorage.getItem(r);
  } catch {
    return null;
  }
}
function xa(r, e) {
  try {
    localStorage.setItem(r, e);
  } catch {
  }
}
const as = class as extends se {
  constructor() {
    super(), this.narrow = !1, this._ctl = new On(this), this._view = "overview", this._sub = "editor", this._toast = "";
    const e = ya(kn);
    if (e) {
      const [t, s] = e.split(":");
      $n.includes(t) && (this._view = t), s && (this._sub = s);
    }
  }
  willUpdate(e) {
    e.has("hass") && this.hass && this._ctl.setHass(this.hass);
  }
  /** @param rev revision the change is based on (default: the plant currently shown) */
  async _save(e, t) {
    try {
      return await this._ctl.save(e, t), this._showToast(l("saved")), !0;
    } catch (s) {
      return this._showToast(Es(s) ? l("sync.conflict") : s?.message || String(s)), !1;
    }
  }
  _showToast(e) {
    this._toast = e, window.setTimeout(() => this._toast = "", 2600);
  }
  _go(e, t) {
    this._view = e, t && (this._sub = t), xa(kn, `${this._view}:${this._sub}`);
  }
  _openCredits() {
    this.renderRoot.querySelector("cp-credits")?.open();
  }
  _fullscreen() {
    document.fullscreenElement ? document.exitFullscreen() : this.requestFullscreen?.().catch(() => {
    });
  }
  render() {
    const e = this._ctl.plant, t = this._ctl.messages.filter((s) => s.active && (s.level === "warning" || s.level === "error")).length;
    return f`<div class="shell">
      <header>
        ${this.narrow ? f`<button class="ghost icon" title=${l("menu")} @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: !0, composed: !0 }))}>${L("menu")}</button>` : y}
        <div class="brand" @click=${(s) => s.detail === 3 && this._openCredits()}>${Ws}<span>COP<b>ilot</b></span></div>
        <nav>
          ${$n.map(
      (s) => f`<button class="tab ${this._view === s ? "on" : ""}" title=${l(`nav.${s}`)} @click=${() => this._go(s)}>
              ${L(qn[s])}
              <span class="tl">${l(`nav.${s}`)}</span>
              ${s === "messages" && t ? f`<span class="badge">${t}</span>` : y}
            </button>`
    )}
        </nav>
        <span class="spacer"></span>
        ${e?.settings.demo ? f`<span class="demo-pill">${L("flask")}<span class="tl">${l("demo")}</span></span>` : y}
        <button class="ghost icon" title=${l("fullscreen")} @click=${this._fullscreen}>${L("expand")}</button>
      </header>
      <main>
        ${this._ctl.error ? f`<div class="card err">${this._ctl.error}</div>` : y}
        ${this._ctl.api?.standalone ? f`<div class="note muted">${l("standalone_hint")}</div>` : y}
        ${e ? this._content(e) : f`<div class="loading">${Ws}</div>`}
      </main>
      ${this._toast ? f`<div class="toast">${this._toast}</div>` : y}
      <cp-credits .plant=${e} .src=${this._ctl.src} .version=${this._ctl.backendVersion}></cp-credits>
    </div>`;
  }
  _content(e) {
    const t = this._ctl.src;
    if (this._view !== "config")
      return Yn(this._view, e, {
        ctl: this._ctl,
        hass: this.hass,
        narrow: this.narrow || window.innerWidth < 900,
        save: (n) => this._save(n)
      });
    if (!this._ctl.admin) return f`<div class="card">${l("readonly_hint")}</div>`;
    const s = ["wizard", "editor", "mapping", "icons", "settings"], i = (n) => this._save(n.detail);
    return f`
      <div class="subnav">
        ${s.map((n) => f`<button class="sub ${this._sub === n ? "on" : ""}" @click=${() => this._go("config", n)}>${l(`cfg.${n}`)}</button>`)}
      </div>
      <div class="cfg ${this._sub === "editor" ? "fill" : ""}">
        ${this._sub === "wizard" ? f`<cp-wizard .plant=${e} @plant-generated=${async (n) => {
      await this._save(n.detail) && (this._showToast(l("wz.done")), this._go("config", "editor"));
    }}></cp-wizard>` : y}
        ${this._sub === "editor" ? f`<cp-editor .plant=${e} .rev=${this._ctl.rev} .hass=${this.hass} .src=${t} .icons=${this._ctl.icons} .version=${this._ctl.version}
              @save=${(n) => this._save(n.detail.plant, n.detail.rev)}></cp-editor>` : y}
        ${this._sub === "mapping" ? f`<cp-mapping .plant=${e} .hass=${this.hass} .api=${this._ctl.api} @save=${i}></cp-mapping>` : y}
        ${this._sub === "icons" ? f`<cp-icons .plant=${e} .api=${this._ctl.api} .icons=${this._ctl.icons} @save=${i} @icons-changed=${() => this._ctl.loadIcons()}></cp-icons>` : y}
        ${this._sub === "settings" ? f`<cp-settings .plant=${e} .hass=${this.hass} .api=${this._ctl.api} .version=${this._ctl.backendVersion} @save=${i}
              @show-credits=${() => this._openCredits()}
              @plant-restored=${(n) => {
      this._ctl.setPlant(n.detail.plant, n.detail.rev), this._showToast(l("bk.restored"));
    }}
              @reset-plant=${() => this._save({ ...Ts(), settings: { ...Ts().settings, demo: !0 } })}></cp-settings>` : y}
      </div>
    `;
  }
};
as.properties = {
  hass: { attribute: !1 },
  narrow: { type: Boolean },
  route: { attribute: !1 },
  panel: { attribute: !1 },
  _view: { state: !0 },
  _sub: { state: !0 },
  _toast: { state: !0 }
}, as.styles = [
  Vn,
  fe,
  oe`
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
let ni = as;
customElements.get("copilot-panel") || customElements.define("copilot-panel", ni);
export {
  ni as C,
  oe as a,
  f as b,
  se as i
};
