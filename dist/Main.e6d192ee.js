var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};

// src/internal/form.ts
var formCollections = /* @__PURE__ */ new WeakMap();
var userInteractedControls = /* @__PURE__ */ new WeakMap();
var reportValidityOverloads = /* @__PURE__ */ new WeakMap();
var FormSubmitController = class {
  constructor(host, options) {
    (this.host = host).addController(this);
    this.options = __spreadValues({
      form: (input) => input.closest("form"),
      name: (input) => input.name,
      value: (input) => input.value,
      defaultValue: (input) => input.defaultValue,
      disabled: (input) => {
        var _a;
        return (_a = input.disabled) != null ? _a : false;
      },
      reportValidity: (input) => typeof input.reportValidity === "function" ? input.reportValidity() : true,
      setValue: (input, value) => input.value = value
    }, options);
    this.handleFormData = this.handleFormData.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormReset = this.handleFormReset.bind(this);
    this.reportFormValidity = this.reportFormValidity.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }
  hostConnected() {
    this.form = this.options.form(this.host);
    if (this.form) {
      if (formCollections.has(this.form)) {
        formCollections.get(this.form).add(this.host);
      } else {
        formCollections.set(this.form, /* @__PURE__ */ new Set([this.host]));
      }
      this.form.addEventListener("formdata", this.handleFormData);
      this.form.addEventListener("submit", this.handleFormSubmit);
      this.form.addEventListener("reset", this.handleFormReset);
      if (!reportValidityOverloads.has(this.form)) {
        reportValidityOverloads.set(this.form, this.form.reportValidity);
        this.form.reportValidity = () => this.reportFormValidity();
      }
    }
    this.host.addEventListener("sl-input", this.handleUserInput);
  }
  hostDisconnected() {
    var _a;
    if (this.form) {
      (_a = formCollections.get(this.form)) == null ? void 0 : _a.delete(this.host);
      this.form.removeEventListener("formdata", this.handleFormData);
      this.form.removeEventListener("submit", this.handleFormSubmit);
      this.form.removeEventListener("reset", this.handleFormReset);
      if (reportValidityOverloads.has(this.form)) {
        this.form.reportValidity = reportValidityOverloads.get(this.form);
        reportValidityOverloads.delete(this.form);
      }
      this.form = void 0;
    }
    this.host.removeEventListener("sl-input", this.handleUserInput);
  }
  hostUpdated() {
    var _a;
    const host = this.host;
    const hasInteracted = Boolean(userInteractedControls.get(host));
    const invalid = Boolean(host.invalid);
    const required = Boolean(host.required);
    if ((_a = this.form) == null ? void 0 : _a.noValidate) {
      host.removeAttribute("data-required");
      host.removeAttribute("data-optional");
      host.removeAttribute("data-invalid");
      host.removeAttribute("data-valid");
      host.removeAttribute("data-user-invalid");
      host.removeAttribute("data-user-valid");
    } else {
      host.toggleAttribute("data-required", required);
      host.toggleAttribute("data-optional", !required);
      host.toggleAttribute("data-invalid", invalid);
      host.toggleAttribute("data-valid", !invalid);
      host.toggleAttribute("data-user-invalid", invalid && hasInteracted);
      host.toggleAttribute("data-user-valid", !invalid && hasInteracted);
    }
  }
  handleFormData(event) {
    const disabled = this.options.disabled(this.host);
    const name = this.options.name(this.host);
    const value = this.options.value(this.host);
    const isButton = this.host.tagName.toLowerCase() === "sl-button";
    if (!disabled && !isButton && typeof name === "string" && name.length > 0 && typeof value !== "undefined") {
      if (Array.isArray(value)) {
        value.forEach((val) => {
          event.formData.append(name, val.toString());
        });
      } else {
        event.formData.append(name, value.toString());
      }
    }
  }
  handleFormSubmit(event) {
    var _a;
    const disabled = this.options.disabled(this.host);
    const reportValidity = this.options.reportValidity;
    if (this.form && !this.form.noValidate) {
      (_a = formCollections.get(this.form)) == null ? void 0 : _a.forEach((control) => {
        this.setUserInteracted(control, true);
      });
    }
    if (this.form && !this.form.noValidate && !disabled && !reportValidity(this.host)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
  handleFormReset() {
    this.options.setValue(this.host, this.options.defaultValue(this.host));
    this.setUserInteracted(this.host, false);
  }
  async handleUserInput() {
    await this.host.updateComplete;
    this.setUserInteracted(this.host, true);
  }
  reportFormValidity() {
    if (this.form && !this.form.noValidate) {
      const elements = this.form.querySelectorAll("*");
      for (const element of elements) {
        if (typeof element.reportValidity === "function") {
          if (!element.reportValidity()) {
            return false;
          }
        }
      }
    }
    return true;
  }
  setUserInteracted(el, hasInteracted) {
    userInteractedControls.set(el, hasInteracted);
    el.requestUpdate();
  }
  doAction(type, invoker) {
    if (this.form) {
      const button = document.createElement("button");
      button.type = type;
      button.style.position = "absolute";
      button.style.width = "0";
      button.style.height = "0";
      button.style.clipPath = "inset(50%)";
      button.style.overflow = "hidden";
      button.style.whiteSpace = "nowrap";
      if (invoker) {
        button.name = invoker.name;
        button.value = invoker.value;
        ["formaction", "formenctype", "formmethod", "formnovalidate", "formtarget"].forEach((attr) => {
          if (invoker.hasAttribute(attr)) {
            button.setAttribute(attr, invoker.getAttribute(attr));
          }
        });
      }
      this.form.append(button);
      button.click();
      button.remove();
    }
  }
  reset(invoker) {
    this.doAction("reset", invoker);
  }
  submit(invoker) {
    this.doAction("submit", invoker);
  }
};

// node_modules/@lit/reactive-element/css-tag.js
var t$7 = window;
var e$c = t$7.ShadowRoot && (void 0 === t$7.ShadyCSS || t$7.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s$a = Symbol();
var n$b = /* @__PURE__ */ new WeakMap();
var o$a = class o {
  constructor(t3, e4, n5) {
    if (this._$cssResult$ = true, n5 !== s$a)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3, this.t = e4;
  }
  get styleSheet() {
    let t3 = this.o;
    const s5 = this.t;
    if (e$c && void 0 === t3) {
      const e4 = void 0 !== s5 && 1 === s5.length;
      e4 && (t3 = n$b.get(s5)), void 0 === t3 && ((this.o = t3 = new CSSStyleSheet()).replaceSync(this.cssText), e4 && n$b.set(s5, t3));
    }
    return t3;
  }
  toString() {
    return this.cssText;
  }
};
var r$5 = (t3) => new o$a("string" == typeof t3 ? t3 : t3 + "", void 0, s$a);
var i$8 = (t3, ...e4) => {
  const n5 = 1 === t3.length ? t3[0] : e4.reduce((e5, s5, n6) => e5 + ((t4) => {
    if (true === t4._$cssResult$)
      return t4.cssText;
    if ("number" == typeof t4)
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s5) + t3[n6 + 1], t3[0]);
  return new o$a(n5, t3, s$a);
};
var S$2 = (s5, n5) => {
  e$c ? s5.adoptedStyleSheets = n5.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n5.forEach((e4) => {
    const n6 = document.createElement("style"), o5 = t$7.litNonce;
    void 0 !== o5 && n6.setAttribute("nonce", o5), n6.textContent = e4.cssText, s5.appendChild(n6);
  });
};
var c$4 = e$c ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e4 = "";
  for (const s5 of t4.cssRules)
    e4 += s5.cssText;
  return r$5(e4);
})(t3) : t3;

// node_modules/@lit/reactive-element/reactive-element.js
var s2$1;
var e2$2 = window;
var r2$1 = e2$2.trustedTypes;
var h$5 = r2$1 ? r2$1.emptyScript : "";
var o2$2 = e2$2.reactiveElementPolyfillSupport;
var n2$1 = { toAttribute(t3, i3) {
  switch (i3) {
    case Boolean:
      t3 = t3 ? h$5 : null;
      break;
    case Object:
    case Array:
      t3 = null == t3 ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i3) {
  let s5 = t3;
  switch (i3) {
    case Boolean:
      s5 = null !== t3;
      break;
    case Number:
      s5 = null === t3 ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s5 = JSON.parse(t3);
      } catch (t4) {
        s5 = null;
      }
  }
  return s5;
} };
var a$5 = (t3, i3) => i3 !== t3 && (i3 == i3 || t3 == t3);
var l$a = { attribute: true, type: String, converter: n2$1, reflect: false, hasChanged: a$5 };
var d$3 = class d extends HTMLElement {
  constructor() {
    super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
  }
  static addInitializer(t3) {
    var i3;
    this.finalize(), (null !== (i3 = this.h) && void 0 !== i3 ? i3 : this.h = []).push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i3, s5) => {
      const e4 = this._$Ep(s5, i3);
      void 0 !== e4 && (this._$Ev.set(e4, s5), t3.push(e4));
    }), t3;
  }
  static createProperty(t3, i3 = l$a) {
    if (i3.state && (i3.attribute = false), this.finalize(), this.elementProperties.set(t3, i3), !i3.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s5 = "symbol" == typeof t3 ? Symbol() : "__" + t3, e4 = this.getPropertyDescriptor(t3, s5, i3);
      void 0 !== e4 && Object.defineProperty(this.prototype, t3, e4);
    }
  }
  static getPropertyDescriptor(t3, i3, s5) {
    return { get() {
      return this[i3];
    }, set(e4) {
      const r4 = this[t3];
      this[i3] = e4, this.requestUpdate(t3, r4, s5);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l$a;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), void 0 !== t3.h && (this.h = [...t3.h]), this.elementProperties = new Map(t3.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i3 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s5 of i3)
        this.createProperty(s5, t4[s5]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i3) {
    const s5 = [];
    if (Array.isArray(i3)) {
      const e4 = new Set(i3.flat(1 / 0).reverse());
      for (const i4 of e4)
        s5.unshift(c$4(i4));
    } else
      void 0 !== i3 && s5.push(c$4(i3));
    return s5;
  }
  static _$Ep(t3, i3) {
    const s5 = i3.attribute;
    return false === s5 ? void 0 : "string" == typeof s5 ? s5 : "string" == typeof t3 ? t3.toLowerCase() : void 0;
  }
  u() {
    var t3;
    this._$E_ = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t3 = this.constructor.h) || void 0 === t3 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i3, s5;
    (null !== (i3 = this._$ES) && void 0 !== i3 ? i3 : this._$ES = []).push(t3), void 0 !== this.renderRoot && this.isConnected && (null === (s5 = t3.hostConnected) || void 0 === s5 || s5.call(t3));
  }
  removeController(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.splice(this._$ES.indexOf(t3) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t3, i3) => {
      this.hasOwnProperty(i3) && (this._$Ei.set(i3, this[i3]), delete this[i3]);
    });
  }
  createRenderRoot() {
    var t3;
    const s5 = null !== (t3 = this.shadowRoot) && void 0 !== t3 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return S$2(s5, this.constructor.elementStyles), s5;
  }
  connectedCallback() {
    var t3;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostConnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
      var i3;
      return null === (i3 = t4.hostDisconnected) || void 0 === i3 ? void 0 : i3.call(t4);
    });
  }
  attributeChangedCallback(t3, i3, s5) {
    this._$AK(t3, s5);
  }
  _$EO(t3, i3, s5 = l$a) {
    var e4;
    const r4 = this.constructor._$Ep(t3, s5);
    if (void 0 !== r4 && true === s5.reflect) {
      const h3 = (void 0 !== (null === (e4 = s5.converter) || void 0 === e4 ? void 0 : e4.toAttribute) ? s5.converter : n2$1).toAttribute(i3, s5.type);
      this._$El = t3, null == h3 ? this.removeAttribute(r4) : this.setAttribute(r4, h3), this._$El = null;
    }
  }
  _$AK(t3, i3) {
    var s5;
    const e4 = this.constructor, r4 = e4._$Ev.get(t3);
    if (void 0 !== r4 && this._$El !== r4) {
      const t4 = e4.getPropertyOptions(r4), h3 = "function" == typeof t4.converter ? { fromAttribute: t4.converter } : void 0 !== (null === (s5 = t4.converter) || void 0 === s5 ? void 0 : s5.fromAttribute) ? t4.converter : n2$1;
      this._$El = r4, this[r4] = h3.fromAttribute(i3, t4.type), this._$El = null;
    }
  }
  requestUpdate(t3, i3, s5) {
    let e4 = true;
    void 0 !== t3 && (((s5 = s5 || this.constructor.getPropertyOptions(t3)).hasChanged || a$5)(this[t3], i3) ? (this._$AL.has(t3) || this._$AL.set(t3, i3), true === s5.reflect && this._$El !== t3 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s5))) : e4 = false), !this.isUpdatePending && e4 && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = true;
    try {
      await this._$E_;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return null != t3 && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t4, i4) => this[i4] = t4), this._$Ei = void 0);
    let i3 = false;
    const s5 = this._$AL;
    try {
      i3 = this.shouldUpdate(s5), i3 ? (this.willUpdate(s5), null === (t3 = this._$ES) || void 0 === t3 || t3.forEach((t4) => {
        var i4;
        return null === (i4 = t4.hostUpdate) || void 0 === i4 ? void 0 : i4.call(t4);
      }), this.update(s5)) : this._$Ek();
    } catch (t4) {
      throw i3 = false, this._$Ek(), t4;
    }
    i3 && this._$AE(s5);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i3;
    null === (i3 = this._$ES) || void 0 === i3 || i3.forEach((t4) => {
      var i4;
      return null === (i4 = t4.hostUpdated) || void 0 === i4 ? void 0 : i4.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$Ek() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    void 0 !== this._$EC && (this._$EC.forEach((t4, i3) => this._$EO(i3, this[i3], t4)), this._$EC = void 0), this._$Ek();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
};
d$3.finalized = true, d$3.elementProperties = /* @__PURE__ */ new Map(), d$3.elementStyles = [], d$3.shadowRootOptions = { mode: "open" }, null == o2$2 || o2$2({ ReactiveElement: d$3 }), (null !== (s2$1 = e2$2.reactiveElementVersions) && void 0 !== s2$1 ? s2$1 : e2$2.reactiveElementVersions = []).push("1.4.2");

// node_modules/lit-html/lit-html.js
var t2;
var i2$3 = window;
var s3 = i2$3.trustedTypes;
var e3$1 = s3 ? s3.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0;
var o3$1 = `lit$${(Math.random() + "").slice(9)}$`;
var n3 = "?" + o3$1;
var l2$2 = `<${n3}>`;
var h2$1 = document;
var r3 = (t3 = "") => h2$1.createComment(t3);
var d2$1 = (t3) => null === t3 || "object" != typeof t3 && "function" != typeof t3;
var u$2 = Array.isArray;
var c2$1 = (t3) => u$2(t3) || "function" == typeof (null == t3 ? void 0 : t3[Symbol.iterator]);
var v$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var a2$1 = /-->/g;
var f$4 = />/g;
var _$1 = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var m$2 = /'/g;
var p$2 = /"/g;
var $$2 = /^(?:script|style|textarea|title)$/i;
var g$2 = (t3) => (i3, ...s5) => ({ _$litType$: t3, strings: i3, values: s5 });
var y$1 = g$2(1);
var x$2 = Symbol.for("lit-noChange");
var b$2 = Symbol.for("lit-nothing");
var T$2 = /* @__PURE__ */ new WeakMap();
var A$2 = h2$1.createTreeWalker(h2$1, 129, null, false);
var E$1 = (t3, i3) => {
  const s5 = t3.length - 1, n5 = [];
  let h3, r4 = 2 === i3 ? "<svg>" : "", d3 = v$1;
  for (let i4 = 0; i4 < s5; i4++) {
    const s6 = t3[i4];
    let e4, u3, c3 = -1, g2 = 0;
    for (; g2 < s6.length && (d3.lastIndex = g2, u3 = d3.exec(s6), null !== u3); )
      g2 = d3.lastIndex, d3 === v$1 ? "!--" === u3[1] ? d3 = a2$1 : void 0 !== u3[1] ? d3 = f$4 : void 0 !== u3[2] ? ($$2.test(u3[2]) && (h3 = RegExp("</" + u3[2], "g")), d3 = _$1) : void 0 !== u3[3] && (d3 = _$1) : d3 === _$1 ? ">" === u3[0] ? (d3 = null != h3 ? h3 : v$1, c3 = -1) : void 0 === u3[1] ? c3 = -2 : (c3 = d3.lastIndex - u3[2].length, e4 = u3[1], d3 = void 0 === u3[3] ? _$1 : '"' === u3[3] ? p$2 : m$2) : d3 === p$2 || d3 === m$2 ? d3 = _$1 : d3 === a2$1 || d3 === f$4 ? d3 = v$1 : (d3 = _$1, h3 = void 0);
    const y2 = d3 === _$1 && t3[i4 + 1].startsWith("/>") ? " " : "";
    r4 += d3 === v$1 ? s6 + l2$2 : c3 >= 0 ? (n5.push(e4), s6.slice(0, c3) + "$lit$" + s6.slice(c3) + o3$1 + y2) : s6 + o3$1 + (-2 === c3 ? (n5.push(void 0), i4) : y2);
  }
  const u2 = r4 + (t3[s5] || "<?>") + (2 === i3 ? "</svg>" : "");
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [void 0 !== e3$1 ? e3$1.createHTML(u2) : u2, n5];
};
var C$2 = class C {
  constructor({ strings: t3, _$litType$: i3 }, e4) {
    let l4;
    this.parts = [];
    let h3 = 0, d3 = 0;
    const u2 = t3.length - 1, c3 = this.parts, [v2, a3] = E$1(t3, i3);
    if (this.el = C$2.createElement(v2, e4), A$2.currentNode = this.el.content, 2 === i3) {
      const t4 = this.el.content, i4 = t4.firstChild;
      i4.remove(), t4.append(...i4.childNodes);
    }
    for (; null !== (l4 = A$2.nextNode()) && c3.length < u2; ) {
      if (1 === l4.nodeType) {
        if (l4.hasAttributes()) {
          const t4 = [];
          for (const i4 of l4.getAttributeNames())
            if (i4.endsWith("$lit$") || i4.startsWith(o3$1)) {
              const s5 = a3[d3++];
              if (t4.push(i4), void 0 !== s5) {
                const t5 = l4.getAttribute(s5.toLowerCase() + "$lit$").split(o3$1), i5 = /([.?@])?(.*)/.exec(s5);
                c3.push({ type: 1, index: h3, name: i5[2], strings: t5, ctor: "." === i5[1] ? M$1 : "?" === i5[1] ? k$2 : "@" === i5[1] ? H$2 : S2 });
              } else
                c3.push({ type: 6, index: h3 });
            }
          for (const i4 of t4)
            l4.removeAttribute(i4);
        }
        if ($$2.test(l4.tagName)) {
          const t4 = l4.textContent.split(o3$1), i4 = t4.length - 1;
          if (i4 > 0) {
            l4.textContent = s3 ? s3.emptyScript : "";
            for (let s5 = 0; s5 < i4; s5++)
              l4.append(t4[s5], r3()), A$2.nextNode(), c3.push({ type: 2, index: ++h3 });
            l4.append(t4[i4], r3());
          }
        }
      } else if (8 === l4.nodeType)
        if (l4.data === n3)
          c3.push({ type: 2, index: h3 });
        else {
          let t4 = -1;
          for (; -1 !== (t4 = l4.data.indexOf(o3$1, t4 + 1)); )
            c3.push({ type: 7, index: h3 }), t4 += o3$1.length - 1;
        }
      h3++;
    }
  }
  static createElement(t3, i3) {
    const s5 = h2$1.createElement("template");
    return s5.innerHTML = t3, s5;
  }
};
function P$1(t3, i3, s5 = t3, e4) {
  var o5, n5, l4, h3;
  if (i3 === x$2)
    return i3;
  let r4 = void 0 !== e4 ? null === (o5 = s5._$Co) || void 0 === o5 ? void 0 : o5[e4] : s5._$Cl;
  const u2 = d2$1(i3) ? void 0 : i3._$litDirective$;
  return (null == r4 ? void 0 : r4.constructor) !== u2 && (null === (n5 = null == r4 ? void 0 : r4._$AO) || void 0 === n5 || n5.call(r4, false), void 0 === u2 ? r4 = void 0 : (r4 = new u2(t3), r4._$AT(t3, s5, e4)), void 0 !== e4 ? (null !== (l4 = (h3 = s5)._$Co) && void 0 !== l4 ? l4 : h3._$Co = [])[e4] = r4 : s5._$Cl = r4), void 0 !== r4 && (i3 = P$1(t3, r4._$AS(t3, i3.values), r4, e4)), i3;
}
var V$1 = class V {
  constructor(t3, i3) {
    this.u = [], this._$AN = void 0, this._$AD = t3, this._$AM = i3;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  v(t3) {
    var i3;
    const { el: { content: s5 }, parts: e4 } = this._$AD, o5 = (null !== (i3 = null == t3 ? void 0 : t3.creationScope) && void 0 !== i3 ? i3 : h2$1).importNode(s5, true);
    A$2.currentNode = o5;
    let n5 = A$2.nextNode(), l4 = 0, r4 = 0, d3 = e4[0];
    for (; void 0 !== d3; ) {
      if (l4 === d3.index) {
        let i4;
        2 === d3.type ? i4 = new N$1(n5, n5.nextSibling, this, t3) : 1 === d3.type ? i4 = new d3.ctor(n5, d3.name, d3.strings, this, t3) : 6 === d3.type && (i4 = new I$1(n5, this, t3)), this.u.push(i4), d3 = e4[++r4];
      }
      l4 !== (null == d3 ? void 0 : d3.index) && (n5 = A$2.nextNode(), l4++);
    }
    return o5;
  }
  p(t3) {
    let i3 = 0;
    for (const s5 of this.u)
      void 0 !== s5 && (void 0 !== s5.strings ? (s5._$AI(t3, s5, i3), i3 += s5.strings.length - 2) : s5._$AI(t3[i3])), i3++;
  }
};
var N$1 = class N {
  constructor(t3, i3, s5, e4) {
    var o5;
    this.type = 2, this._$AH = b$2, this._$AN = void 0, this._$AA = t3, this._$AB = i3, this._$AM = s5, this.options = e4, this._$Cm = null === (o5 = null == e4 ? void 0 : e4.isConnected) || void 0 === o5 || o5;
  }
  get _$AU() {
    var t3, i3;
    return null !== (i3 = null === (t3 = this._$AM) || void 0 === t3 ? void 0 : t3._$AU) && void 0 !== i3 ? i3 : this._$Cm;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i3 = this._$AM;
    return void 0 !== i3 && 11 === t3.nodeType && (t3 = i3.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i3 = this) {
    t3 = P$1(this, t3, i3), d2$1(t3) ? t3 === b$2 || null == t3 || "" === t3 ? (this._$AH !== b$2 && this._$AR(), this._$AH = b$2) : t3 !== this._$AH && t3 !== x$2 && this.g(t3) : void 0 !== t3._$litType$ ? this.$(t3) : void 0 !== t3.nodeType ? this.T(t3) : c2$1(t3) ? this.k(t3) : this.g(t3);
  }
  O(t3, i3 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i3);
  }
  T(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.O(t3));
  }
  g(t3) {
    this._$AH !== b$2 && d2$1(this._$AH) ? this._$AA.nextSibling.data = t3 : this.T(h2$1.createTextNode(t3)), this._$AH = t3;
  }
  $(t3) {
    var i3;
    const { values: s5, _$litType$: e4 } = t3, o5 = "number" == typeof e4 ? this._$AC(t3) : (void 0 === e4.el && (e4.el = C$2.createElement(e4.h, this.options)), e4);
    if ((null === (i3 = this._$AH) || void 0 === i3 ? void 0 : i3._$AD) === o5)
      this._$AH.p(s5);
    else {
      const t4 = new V$1(o5, this), i4 = t4.v(this.options);
      t4.p(s5), this.T(i4), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i3 = T$2.get(t3.strings);
    return void 0 === i3 && T$2.set(t3.strings, i3 = new C$2(t3)), i3;
  }
  k(t3) {
    u$2(this._$AH) || (this._$AH = [], this._$AR());
    const i3 = this._$AH;
    let s5, e4 = 0;
    for (const o5 of t3)
      e4 === i3.length ? i3.push(s5 = new N$1(this.O(r3()), this.O(r3()), this, this.options)) : s5 = i3[e4], s5._$AI(o5), e4++;
    e4 < i3.length && (this._$AR(s5 && s5._$AB.nextSibling, e4), i3.length = e4);
  }
  _$AR(t3 = this._$AA.nextSibling, i3) {
    var s5;
    for (null === (s5 = this._$AP) || void 0 === s5 || s5.call(this, false, true, i3); t3 && t3 !== this._$AB; ) {
      const i4 = t3.nextSibling;
      t3.remove(), t3 = i4;
    }
  }
  setConnected(t3) {
    var i3;
    void 0 === this._$AM && (this._$Cm = t3, null === (i3 = this._$AP) || void 0 === i3 || i3.call(this, t3));
  }
};
var S2 = class {
  constructor(t3, i3, s5, e4, o5) {
    this.type = 1, this._$AH = b$2, this._$AN = void 0, this.element = t3, this.name = i3, this._$AM = e4, this.options = o5, s5.length > 2 || "" !== s5[0] || "" !== s5[1] ? (this._$AH = Array(s5.length - 1).fill(new String()), this.strings = s5) : this._$AH = b$2;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i3 = this, s5, e4) {
    const o5 = this.strings;
    let n5 = false;
    if (void 0 === o5)
      t3 = P$1(this, t3, i3, 0), n5 = !d2$1(t3) || t3 !== this._$AH && t3 !== x$2, n5 && (this._$AH = t3);
    else {
      const e5 = t3;
      let l4, h3;
      for (t3 = o5[0], l4 = 0; l4 < o5.length - 1; l4++)
        h3 = P$1(this, e5[s5 + l4], i3, l4), h3 === x$2 && (h3 = this._$AH[l4]), n5 || (n5 = !d2$1(h3) || h3 !== this._$AH[l4]), h3 === b$2 ? t3 = b$2 : t3 !== b$2 && (t3 += (null != h3 ? h3 : "") + o5[l4 + 1]), this._$AH[l4] = h3;
    }
    n5 && !e4 && this.j(t3);
  }
  j(t3) {
    t3 === b$2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t3 ? t3 : "");
  }
};
var M$1 = class M extends S2 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t3) {
    this.element[this.name] = t3 === b$2 ? void 0 : t3;
  }
};
var R$2 = s3 ? s3.emptyScript : "";
var k$2 = class k extends S2 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t3) {
    t3 && t3 !== b$2 ? this.element.setAttribute(this.name, R$2) : this.element.removeAttribute(this.name);
  }
};
var H$2 = class H extends S2 {
  constructor(t3, i3, s5, e4, o5) {
    super(t3, i3, s5, e4, o5), this.type = 5;
  }
  _$AI(t3, i3 = this) {
    var s5;
    if ((t3 = null !== (s5 = P$1(this, t3, i3, 0)) && void 0 !== s5 ? s5 : b$2) === x$2)
      return;
    const e4 = this._$AH, o5 = t3 === b$2 && e4 !== b$2 || t3.capture !== e4.capture || t3.once !== e4.once || t3.passive !== e4.passive, n5 = t3 !== b$2 && (e4 === b$2 || o5);
    o5 && this.element.removeEventListener(this.name, this, e4), n5 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i3, s5;
    "function" == typeof this._$AH ? this._$AH.call(null !== (s5 = null === (i3 = this.options) || void 0 === i3 ? void 0 : i3.host) && void 0 !== s5 ? s5 : this.element, t3) : this._$AH.handleEvent(t3);
  }
};
var I$1 = class I {
  constructor(t3, i3, s5) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i3, this.options = s5;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    P$1(this, t3);
  }
};
var z$1 = i2$3.litHtmlPolyfillSupport;
null == z$1 || z$1(C$2, N$1), (null !== (t2 = i2$3.litHtmlVersions) && void 0 !== t2 ? t2 : i2$3.litHtmlVersions = []).push("2.4.0");
var Z$1 = (t3, i3, s5) => {
  var e4, o5;
  const n5 = null !== (e4 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== e4 ? e4 : i3;
  let l4 = n5._$litPart$;
  if (void 0 === l4) {
    const t4 = null !== (o5 = null == s5 ? void 0 : s5.renderBefore) && void 0 !== o5 ? o5 : null;
    n5._$litPart$ = l4 = new N$1(i3.insertBefore(r3(), t4), t4, void 0, null != s5 ? s5 : {});
  }
  return l4._$AI(t3), l4;
};

// node_modules/lit-element/lit-element.js
var l3;
var o4;
var s4 = class extends d$3 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e4;
    const i3 = super.createRenderRoot();
    return null !== (t3 = (e4 = this.renderOptions).renderBefore) && void 0 !== t3 || (e4.renderBefore = i3.firstChild), i3;
  }
  update(t3) {
    const i3 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = Z$1(i3, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), null === (t3 = this._$Dt) || void 0 === t3 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), null === (t3 = this._$Dt) || void 0 === t3 || t3.setConnected(false);
  }
  render() {
    return x$2;
  }
};
s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
var n4 = globalThis.litElementPolyfillSupport;
null == n4 || n4({ LitElement: s4 });
(null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/styles/component.styles.ts
var component_styles_default = i$8`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;

// src/components/button/button.styles.ts
var button_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    font-size: var(--sl-button-font-size-small);
    height: var(--sl-input-height-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    font-size: var(--sl-button-font-size-medium);
    height: var(--sl-input-height-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    font-size: var(--sl-button-font-size-large);
    height: var(--sl-input-height-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--first, .sl-button-group__button--radio, [variant='default']):not(:hover))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`;

// node_modules/lit-html/static.js
var e$b = Symbol.for("");
var l$9 = (t) => {
  if ((null == t ? void 0 : t.r) === e$b)
    return null == t ? void 0 : t._$litStatic$;
};
var i$7 = (t, ...r) => ({ _$litStatic$: r.reduce((r2, e2, l2) => r2 + ((t2) => {
  if (void 0 !== t2._$litStatic$)
    return t2._$litStatic$;
  throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t2}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`);
})(e2) + t[l2 + 1], t[0]), r: e$b });
var s$9 = /* @__PURE__ */ new Map();
var a$4 = (t) => (r, ...e2) => {
  const o = e2.length;
  let i2, a2;
  const n2 = [], u2 = [];
  let c, $ = 0, f = false;
  for (; $ < o; ) {
    for (c = r[$]; $ < o && void 0 !== (a2 = e2[$], i2 = l$9(a2)); )
      c += i2 + r[++$], f = true;
    u2.push(a2), n2.push(c), $++;
  }
  if ($ === o && n2.push(r[o]), f) {
    const t2 = n2.join("$$lit$$");
    void 0 === (r = s$9.get(t2)) && (n2.raw = n2, s$9.set(t2, r = n2)), e2 = u2;
  }
  return t(r, ...e2);
};
var n$a = a$4(y$1);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/@shoelace-style/localize/dist/index.js
var connectedElements = /* @__PURE__ */ new Set();
var documentElementObserver = new MutationObserver(update);
var translations = /* @__PURE__ */ new Map();
var documentDirection = document.documentElement.dir || "ltr";
var documentLanguage = document.documentElement.lang || navigator.language;
var fallback;
documentElementObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["dir", "lang"]
});
function registerTranslation(...translation2) {
  translation2.map((t) => {
    const code = t.$code.toLowerCase();
    if (translations.has(code)) {
      translations.set(code, Object.assign(Object.assign({}, translations.get(code)), t));
    } else {
      translations.set(code, t);
    }
    if (!fallback) {
      fallback = t;
    }
  });
  update();
}
function update() {
  documentDirection = document.documentElement.dir || "ltr";
  documentLanguage = document.documentElement.lang || navigator.language;
  [...connectedElements.keys()].map((el) => {
    if (typeof el.requestUpdate === "function") {
      el.requestUpdate();
    }
  });
}
var LocalizeController = class {
  constructor(host) {
    this.host = host;
    this.host.addController(this);
  }
  hostConnected() {
    connectedElements.add(this.host);
  }
  hostDisconnected() {
    connectedElements.delete(this.host);
  }
  dir() {
    return `${this.host.dir || documentDirection}`.toLowerCase();
  }
  lang() {
    return `${this.host.lang || documentLanguage}`.toLowerCase();
  }
  term(key, ...args) {
    var _a, _b;
    const locale = new Intl.Locale(this.lang());
    const language = locale === null || locale === void 0 ? void 0 : locale.language.toLowerCase();
    const region = (_b = (_a = locale === null || locale === void 0 ? void 0 : locale.region) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== null && _b !== void 0 ? _b : "";
    const primary = translations.get(`${language}-${region}`);
    const secondary = translations.get(language);
    let term;
    if (primary && primary[key]) {
      term = primary[key];
    } else if (secondary && secondary[key]) {
      term = secondary[key];
    } else if (fallback && fallback[key]) {
      term = fallback[key];
    } else {
      console.error(`No translation found for: ${String(key)}`);
      return String(key);
    }
    if (typeof term === "function") {
      return term(...args);
    }
    return term;
  }
  date(dateToFormat, options) {
    dateToFormat = new Date(dateToFormat);
    return new Intl.DateTimeFormat(this.lang(), options).format(dateToFormat);
  }
  number(numberToFormat, options) {
    numberToFormat = Number(numberToFormat);
    return isNaN(numberToFormat) ? "" : new Intl.NumberFormat(this.lang(), options).format(numberToFormat);
  }
  relativeTime(value, unit, options) {
    return new Intl.RelativeTimeFormat(this.lang(), options).format(value, unit);
  }
};

// src/utilities/localize.ts
var LocalizeController2 = class extends LocalizeController {
};

// src/translations/en.ts
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  clearEntry: "Clear entry",
  close: "Close",
  copy: "Copy",
  numOptionsSelected: (num) => {
    if (num === 0)
      return "No options selected";
    if (num === 1)
      return "1 option selected";
    return `${num} options selected`;
  },
  currentValue: "Current value",
  hidePassword: "Hide password",
  loading: "Loading",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  toggleColorFormat: "Toggle color format"
};
registerTranslation(translation);

// src/internal/slot.ts
var HasSlotController$1 = class HasSlotController {
  constructor(host, ...slotNames) {
    this.slotNames = [];
    (this.host = host).addController(this);
    this.slotNames = slotNames;
    this.handleSlotChange = this.handleSlotChange.bind(this);
  }
  hasDefaultSlot() {
    return [...this.host.childNodes].some((node) => {
      if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== "") {
        return true;
      }
      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node;
        const tagName = el.tagName.toLowerCase();
        if (tagName === "sl-visually-hidden") {
          return false;
        }
        if (!el.hasAttribute("slot")) {
          return true;
        }
      }
      return false;
    });
  }
  hasNamedSlot(name) {
    return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
  }
  test(slotName) {
    return slotName === "[default]" ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
  }
  hostConnected() {
    this.host.shadowRoot.addEventListener("slotchange", this.handleSlotChange);
  }
  hostDisconnected() {
    this.host.shadowRoot.removeEventListener("slotchange", this.handleSlotChange);
  }
  handleSlotChange(event) {
    const slot = event.target;
    if (this.slotNames.includes("[default]") && !slot.name || slot.name && this.slotNames.includes(slot.name)) {
      this.host.requestUpdate();
    }
  }
};
function getTextContent(slot) {
  if (!slot) {
    return "";
  }
  const nodes = slot.assignedNodes({ flatten: true });
  let text = "";
  [...nodes].forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent;
    }
  });
  return text;
}

// node_modules/lit-html/directives/if-defined.js
var l$8 = (l2) => null != l2 ? l2 : b$2;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/lit-html/directive.js
var t$6 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e$a = (t2) => (...e2) => ({ _$litDirective$: t2, values: e2 });
var i$6 = class i {
  constructor(t2) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t2, e2, i2) {
    this._$Ct = t2, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t2, e2) {
    return this.update(t2, e2);
  }
  update(t2, e2) {
    return this.render(...e2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/lit-html/directives/class-map.js
var o$9 = e$a(class extends i$6 {
  constructor(t2) {
    var i2;
    if (super(t2), t2.type !== t$6.ATTRIBUTE || "class" !== t2.name || (null === (i2 = t2.strings) || void 0 === i2 ? void 0 : i2.length) > 2)
      throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return " " + Object.keys(t2).filter((i2) => t2[i2]).join(" ") + " ";
  }
  update(i2, [s]) {
    var r, o2;
    if (void 0 === this.nt) {
      this.nt = /* @__PURE__ */ new Set(), void 0 !== i2.strings && (this.st = new Set(i2.strings.join(" ").split(/\s/).filter((t2) => "" !== t2)));
      for (const t2 in s)
        s[t2] && !(null === (r = this.st) || void 0 === r ? void 0 : r.has(t2)) && this.nt.add(t2);
      return this.render(s);
    }
    const e2 = i2.element.classList;
    this.nt.forEach((t2) => {
      t2 in s || (e2.remove(t2), this.nt.delete(t2));
    });
    for (const t2 in s) {
      const i3 = !!s[t2];
      i3 === this.nt.has(t2) || (null === (o2 = this.st) || void 0 === o2 ? void 0 : o2.has(t2)) || (i3 ? (e2.add(t2), this.nt.add(t2)) : (e2.remove(t2), this.nt.delete(t2)));
    }
    return x$2;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/internal/watch.ts
function watch$1(propName, options) {
  const resolvedOptions = __spreadValues({
    waitUntilFirstUpdate: false
  }, options);
  return (proto, decoratedFnName) => {
    const { update } = proto;
    if (propName in proto) {
      const propNameKey = propName;
      proto.update = function(changedProps) {
        if (changedProps.has(propNameKey)) {
          const oldValue = changedProps.get(propNameKey);
          const newValue = this[propNameKey];
          if (oldValue !== newValue) {
            if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
              this[decoratedFnName](oldValue, newValue);
            }
          }
        }
        update.call(this, changedProps);
      };
    }
  };
}

// node_modules/@lit/reactive-element/decorators/custom-element.js
var e$9 = (e5) => (n2) => "function" == typeof n2 ? ((e6, n3) => (customElements.define(e6, n3), n3))(e5, n2) : ((e6, n3) => {
  const { kind: t2, elements: s2 } = n3;
  return { kind: t2, elements: s2, finisher(n4) {
    customElements.define(e6, n4);
  } };
})(e5, n2);

// node_modules/@lit/reactive-element/decorators/property.js
var i$5 = (i3, e5) => "method" === e5.kind && e5.descriptor && !("value" in e5.descriptor) ? __spreadProps(__spreadValues({}, e5), { finisher(n2) {
  n2.createProperty(e5.key, i3);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e5.key, initializer() {
  "function" == typeof e5.initializer && (this[e5.key] = e5.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e5.key, i3);
} };
function e2$1(e5) {
  return (n2, t2) => void 0 !== t2 ? ((i3, e6, n3) => {
    e6.constructor.createProperty(n3, i3);
  })(e5, n2, t2) : i$5(e5, n2);
}

// node_modules/@lit/reactive-element/decorators/state.js
function t$5(t2) {
  return e2$1(__spreadProps(__spreadValues({}, t2), { state: true }));
}

// node_modules/@lit/reactive-element/decorators/base.js
var o$8 = ({ finisher: e5, descriptor: t2 }) => (o2, n2) => {
  var r;
  if (void 0 === n2) {
    const n3 = null !== (r = o2.originalKey) && void 0 !== r ? r : o2.key, i3 = null != t2 ? { kind: "method", placement: "prototype", key: n3, descriptor: t2(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n3 });
    return null != e5 && (i3.finisher = function(t3) {
      e5(t3, n3);
    }), i3;
  }
  {
    const r2 = o2.constructor;
    void 0 !== t2 && Object.defineProperty(o2, n2, t2(n2)), null == e5 || e5(r2, n2);
  }
};

// node_modules/@lit/reactive-element/decorators/query.js
function i2$2(i3, n2) {
  return o$8({ descriptor: (o2) => {
    const t2 = { get() {
      var o3, n3;
      return null !== (n3 = null === (o3 = this.renderRoot) || void 0 === o3 ? void 0 : o3.querySelector(i3)) && void 0 !== n3 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = "symbol" == typeof o2 ? Symbol() : "__" + o2;
      t2.get = function() {
        var o3, t3;
        return void 0 === this[n3] && (this[n3] = null !== (t3 = null === (o3 = this.renderRoot) || void 0 === o3 ? void 0 : o3.querySelector(i3)) && void 0 !== t3 ? t3 : null), this[n3];
      };
    }
    return t2;
  } });
}

// node_modules/@lit/reactive-element/decorators/query-assigned-elements.js
var n$9;
null != (null === (n$9 = window.HTMLSlotElement) || void 0 === n$9 ? void 0 : n$9.prototype.assignedElements) ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);

// src/internal/shoelace-element.ts
var ShoelaceElement$1 = class ShoelaceElement extends s4 {
  emit(name, options) {
    const event = new CustomEvent(name, __spreadValues({
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {}
    }, options));
    this.dispatchEvent(event);
    return event;
  }
};
__decorateClass([
  e2$1()
], ShoelaceElement$1.prototype, "dir", 2);
__decorateClass([
  e2$1()
], ShoelaceElement$1.prototype, "lang", 2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/components/button/button.ts
var SlButton = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      form: (input) => {
        if (input.hasAttribute("form")) {
          const doc = input.getRootNode();
          const formId = input.getAttribute("form");
          return doc.getElementById(formId);
        }
        return input.closest("form");
      }
    });
    this.hasSlotController = new HasSlotController$1(this, "[default]", "prefix", "suffix");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.variant = "default";
    this.size = "medium";
    this.caret = false;
    this.disabled = false;
    this.loading = false;
    this.outline = false;
    this.pill = false;
    this.circle = false;
    this.type = "button";
    this.name = "";
    this.value = "";
    this.href = "";
  }
  firstUpdated() {
    if (this.isButton()) {
      this.invalid = !this.button.checkValidity();
    }
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick(event) {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.type === "submit") {
      this.formSubmitController.submit(this);
    }
    if (this.type === "reset") {
      this.formSubmitController.reset(this);
    }
  }
  isButton() {
    return this.href ? false : true;
  }
  isLink() {
    return this.href ? true : false;
  }
  handleDisabledChange() {
    if (this.isButton()) {
      this.button.disabled = this.disabled;
      this.invalid = !this.button.checkValidity();
    }
  }
  click() {
    this.button.click();
  }
  focus(options) {
    this.button.focus(options);
  }
  blur() {
    this.button.blur();
  }
  checkValidity() {
    if (this.isButton()) {
      return this.button.checkValidity();
    }
    return true;
  }
  reportValidity() {
    if (this.isButton()) {
      return this.button.reportValidity();
    }
    return true;
  }
  setCustomValidity(message) {
    if (this.isButton()) {
      this.button.setCustomValidity(message);
      this.invalid = !this.button.checkValidity();
    }
  }
  render() {
    const isLink = this.isLink();
    const tag = isLink ? i$7`a` : i$7`button`;
    return n$a`
      <${tag}
        part="base"
        class=${o$9({
      button: true,
      "button--default": this.variant === "default",
      "button--primary": this.variant === "primary",
      "button--success": this.variant === "success",
      "button--neutral": this.variant === "neutral",
      "button--warning": this.variant === "warning",
      "button--danger": this.variant === "danger",
      "button--text": this.variant === "text",
      "button--small": this.size === "small",
      "button--medium": this.size === "medium",
      "button--large": this.size === "large",
      "button--caret": this.caret,
      "button--circle": this.circle,
      "button--disabled": this.disabled,
      "button--focused": this.hasFocus,
      "button--loading": this.loading,
      "button--standard": !this.outline,
      "button--outline": this.outline,
      "button--pill": this.pill,
      "button--rtl": this.localize.dir() === "rtl",
      "button--has-label": this.hasSlotController.test("[default]"),
      "button--has-prefix": this.hasSlotController.test("prefix"),
      "button--has-suffix": this.hasSlotController.test("suffix")
    })}
        ?disabled=${l$8(isLink ? void 0 : this.disabled)}
        type=${l$8(isLink ? void 0 : this.type)}
        title=${this.title}
        name=${l$8(isLink ? void 0 : this.name)}
        value=${l$8(isLink ? void 0 : this.value)}
        href=${l$8(isLink ? this.href : void 0)}
        target=${l$8(isLink ? this.target : void 0)}
        download=${l$8(isLink ? this.download : void 0)}
        rel=${l$8(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${l$8(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret ? n$a` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> ` : ""}
        ${this.loading ? n$a`<sl-spinner></sl-spinner>` : ""}
      </${tag}>
    `;
  }
};
SlButton.styles = button_styles_default;
__decorateClass([
  i2$2(".button")
], SlButton.prototype, "button", 2);
__decorateClass([
  t$5()
], SlButton.prototype, "hasFocus", 2);
__decorateClass([
  t$5()
], SlButton.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "title", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlButton.prototype, "variant", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlButton.prototype, "size", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "caret", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "loading", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "outline", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "pill", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlButton.prototype, "circle", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "type", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "value", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "href", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "target", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "download", 2);
__decorateClass([
  e2$1()
], SlButton.prototype, "form", 2);
__decorateClass([
  e2$1({ attribute: "formaction" })
], SlButton.prototype, "formAction", 2);
__decorateClass([
  e2$1({ attribute: "formenctype" })
], SlButton.prototype, "formEnctype", 2);
__decorateClass([
  e2$1({ attribute: "formmethod" })
], SlButton.prototype, "formMethod", 2);
__decorateClass([
  e2$1({ attribute: "formnovalidate", type: Boolean })
], SlButton.prototype, "formNoValidate", 2);
__decorateClass([
  e2$1({ attribute: "formtarget" })
], SlButton.prototype, "formTarget", 2);
__decorateClass([
  watch$1("disabled", { waitUntilFirstUpdate: true })
], SlButton.prototype, "handleDisabledChange", 1);
SlButton = __decorateClass([
  e$9("sl-button")
], SlButton);

// src/components/spinner/spinner.styles.ts
var spinner_styles_default = i$8`
  ${component_styles_default}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      rotate: 0deg;
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      rotate: 450deg;
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      rotate: 1080deg;
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`;

// src/components/spinner/spinner.ts
var SlSpinner = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
  }
  render() {
    return y$1`
      <svg part="base" class="spinner" role="progressbar" aria-valuetext=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
SlSpinner.styles = spinner_styles_default;
SlSpinner = __decorateClass([
  e$9("sl-spinner")
], SlSpinner);

// src/utilities/base-path.ts
var basePath = "";
function setBasePath(path) {
  basePath = path;
}
function getBasePath() {
  if (!basePath) {
    const scripts = [...document.getElementsByTagName("script")];
    const configScript = scripts.find((script) => script.hasAttribute("data-shoelace"));
    if (configScript) {
      setBasePath(configScript.getAttribute("data-shoelace"));
    } else {
      const fallbackScript = scripts.find((s) => /shoelace(\.min)?\.js($|\?)/.test(s.src));
      let path = "";
      if (fallbackScript) {
        path = fallbackScript.getAttribute("src");
      }
      setBasePath(path.split("/").slice(0, -1).join("/"));
    }
  }
  return basePath.replace(/\/$/, "");
}

// src/components/icon/library.default.ts
var library = {
  name: "default",
  resolver: (name) => `${getBasePath()}/assets/icons/${name}.svg`
};
var library_default_default = library;

// src/components/icon/library.system.ts
var icons = {
  caret: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,
  check: `
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,
  "eye-slash": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,
  eyedropper: `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,
  "grip-vertical": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,
  indeterminate: `
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,
  "person-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,
  "play-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,
  "pause-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,
  radio: `
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,
  "star-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,
  "x-lg": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,
  "x-circle-fill": `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `
};
var systemLibrary = {
  name: "system",
  resolver: (name) => {
    if (name in icons) {
      return `data:image/svg+xml,${encodeURIComponent(icons[name])}`;
    }
    return "";
  }
};
var library_system_default = systemLibrary;

// src/components/icon/library.ts
var registry = [library_default_default, library_system_default];
var watchedIcons = [];
function watchIcon(icon) {
  watchedIcons.push(icon);
}
function unwatchIcon(icon) {
  watchedIcons = watchedIcons.filter((el) => el !== icon);
}
function getIconLibrary(name) {
  return registry.find((lib) => lib.name === name);
}
function registerIconLibrary(name, options) {
  unregisterIconLibrary(name);
  registry.push({
    name,
    resolver: options.resolver,
    mutator: options.mutator
  });
  watchedIcons.forEach((icon) => {
    if (icon.library === name) {
      icon.setIcon();
    }
  });
}
function unregisterIconLibrary(name) {
  registry = registry.filter((lib) => lib.name !== name);
}

// src/components/include/request.ts
var includeFiles = /* @__PURE__ */ new Map();
function requestInclude(src, mode = "cors") {
  if (includeFiles.has(src)) {
    return includeFiles.get(src);
  }
  const fileDataPromise = fetch(src, { mode }).then(async (response) => {
    return {
      ok: response.ok,
      status: response.status,
      html: await response.text()
    };
  });
  includeFiles.set(src, fileDataPromise);
  return fileDataPromise;
}

// src/components/icon/request.ts
var iconFiles = /* @__PURE__ */ new Map();
async function requestIcon(url) {
  if (iconFiles.has(url)) {
    return iconFiles.get(url);
  }
  const fileData = await requestInclude(url);
  const iconFileData = {
    ok: fileData.ok,
    status: fileData.status,
    svg: null
  };
  if (fileData.ok) {
    const div = document.createElement("div");
    div.innerHTML = fileData.html;
    const svg = div.firstElementChild;
    iconFileData.svg = (svg == null ? void 0 : svg.tagName.toLowerCase()) === "svg" ? svg.outerHTML : "";
  }
  iconFiles.set(url, iconFileData);
  return iconFileData;
}

// src/components/icon/icon.styles.ts
var icon_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;

// node_modules/lit-html/directives/unsafe-html.js
var e4 = class extends i$6 {
  constructor(i2) {
    if (super(i2), this.it = b$2, i2.type !== t$6.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(r) {
    if (r === b$2 || null == r)
      return this._t = void 0, this.it = r;
    if (r === x$2)
      return r;
    if ("string" != typeof r)
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (r === this.it)
      return this._t;
    this.it = r;
    const s = [r];
    return s.raw = s, this._t = { _$litType$: this.constructor.resultType, strings: s, values: [] };
  }
};
e4.directiveName = "unsafeHTML", e4.resultType = 1;

// node_modules/lit-html/directives/unsafe-svg.js
var t3 = class extends e4 {
};
t3.directiveName = "unsafeSVG", t3.resultType = 2;
var o2$1 = e$a(t3);

// src/components/icon/icon.ts
var parser;
var SlIcon = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.svg = "";
    this.label = "";
    this.library = "default";
  }
  connectedCallback() {
    super.connectedCallback();
    watchIcon(this);
  }
  firstUpdated() {
    this.setIcon();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    unwatchIcon(this);
  }
  getUrl() {
    const library = getIconLibrary(this.library);
    if (this.name && library) {
      return library.resolver(this.name);
    }
    return this.src;
  }
  handleLabelChange() {
    const hasLabel = typeof this.label === "string" && this.label.length > 0;
    if (hasLabel) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
      this.removeAttribute("aria-hidden");
    } else {
      this.removeAttribute("role");
      this.removeAttribute("aria-label");
      this.setAttribute("aria-hidden", "true");
    }
  }
  async setIcon() {
    var _a;
    const library = getIconLibrary(this.library);
    const url = this.getUrl();
    if (!parser) {
      parser = new DOMParser();
    }
    if (url) {
      try {
        const file = await requestIcon(url);
        if (url !== this.getUrl()) {
          return;
        } else if (file.ok) {
          const doc = parser.parseFromString(file.svg, "text/html");
          const svgEl = doc.body.querySelector("svg");
          if (svgEl !== null) {
            (_a = library == null ? void 0 : library.mutator) == null ? void 0 : _a.call(library, svgEl);
            this.svg = svgEl.outerHTML;
            this.emit("sl-load");
          } else {
            this.svg = "";
            this.emit("sl-error");
          }
        } else {
          this.svg = "";
          this.emit("sl-error");
        }
      } catch (e5) {
        this.emit("sl-error");
      }
    } else if (this.svg.length > 0) {
      this.svg = "";
    }
  }
  render() {
    return y$1` ${o2$1(this.svg)} `;
  }
};
SlIcon.styles = icon_styles_default;
__decorateClass([
  t$5()
], SlIcon.prototype, "svg", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlIcon.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlIcon.prototype, "src", 2);
__decorateClass([
  e2$1()
], SlIcon.prototype, "label", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlIcon.prototype, "library", 2);
__decorateClass([
  watch$1("label")
], SlIcon.prototype, "handleLabelChange", 1);
__decorateClass([
  watch$1("name"),
  watch$1("src"),
  watch$1("library")
], SlIcon.prototype, "setIcon", 1);
SlIcon = __decorateClass([
  e$9("sl-icon")
], SlIcon);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/components/button-group/button-group.styles.ts
var button_group_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`;

// src/components/button-group/button-group.ts
var SlButtonGroup = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.disableRole = false;
    this.label = "";
  }
  handleFocus(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--focus");
  }
  handleBlur(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--focus");
  }
  handleMouseOver(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.add("sl-button-group__button--hover");
  }
  handleMouseOut(event) {
    const button = findButton(event.target);
    button == null ? void 0 : button.classList.remove("sl-button-group__button--hover");
  }
  handleSlotChange() {
    const slottedElements = [...this.defaultSlot.assignedElements({ flatten: true })];
    slottedElements.forEach((el) => {
      const index = slottedElements.indexOf(el);
      const button = findButton(el);
      if (button !== null) {
        button.classList.add("sl-button-group__button");
        button.classList.toggle("sl-button-group__button--first", index === 0);
        button.classList.toggle("sl-button-group__button--inner", index > 0 && index < slottedElements.length - 1);
        button.classList.toggle("sl-button-group__button--last", index === slottedElements.length - 1);
        button.classList.toggle("sl-button-group__button--radio", button.tagName.toLowerCase() === "sl-radio-button");
      }
    });
  }
  render() {
    return y$1`
      <slot
        part="base"
        class="button-group"
        role="${this.disableRole ? "presentation" : "group"}"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
        @slotchange=${this.handleSlotChange}
      ></slot>
    `;
  }
};
SlButtonGroup.styles = button_group_styles_default;
__decorateClass([
  i2$2("slot")
], SlButtonGroup.prototype, "defaultSlot", 2);
__decorateClass([
  t$5()
], SlButtonGroup.prototype, "disableRole", 2);
__decorateClass([
  e2$1()
], SlButtonGroup.prototype, "label", 2);
SlButtonGroup = __decorateClass([
  e$9("sl-button-group")
], SlButtonGroup);
function findButton(el) {
  var _a;
  const selector = "sl-button, sl-radio-button";
  return (_a = el.closest(selector)) != null ? _a : el.querySelector(selector);
}

// src/internal/drag.ts
function drag(container, options) {
  function move(pointerEvent) {
    const dims = container.getBoundingClientRect();
    const defaultView = container.ownerDocument.defaultView;
    const offsetX = dims.left + defaultView.pageXOffset;
    const offsetY = dims.top + defaultView.pageYOffset;
    const x = pointerEvent.pageX - offsetX;
    const y = pointerEvent.pageY - offsetY;
    if (options == null ? void 0 : options.onMove) {
      options.onMove(x, y);
    }
  }
  function stop() {
    document.removeEventListener("pointermove", move);
    document.removeEventListener("pointerup", stop);
    if (options == null ? void 0 : options.onStop) {
      options.onStop();
    }
  }
  document.addEventListener("pointermove", move, { passive: true });
  document.addEventListener("pointerup", stop);
  if ((options == null ? void 0 : options.initialEvent) instanceof PointerEvent) {
    move(options.initialEvent);
  }
}

// src/internal/math.ts
function clamp$1(value, min, max) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

// node_modules/lit-html/directives/style-map.js
var i2$1 = e$a(class extends i$6 {
  constructor(t2) {
    var e2;
    if (super(t2), t2.type !== t$6.ATTRIBUTE || "style" !== t2.name || (null === (e2 = t2.strings) || void 0 === e2 ? void 0 : e2.length) > 2)
      throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t2) {
    return Object.keys(t2).reduce((e2, r) => {
      const s = t2[r];
      return null == s ? e2 : e2 + `${r = r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }
  update(e2, [r]) {
    const { style: s } = e2.element;
    if (void 0 === this.vt) {
      this.vt = /* @__PURE__ */ new Set();
      for (const t2 in r)
        this.vt.add(t2);
      return this.render(r);
    }
    this.vt.forEach((t2) => {
      null == r[t2] && (this.vt.delete(t2), t2.includes("-") ? s.removeProperty(t2) : s[t2] = "");
    });
    for (const t2 in r) {
      const e3 = r[t2];
      null != e3 && (this.vt.add(t2), t2.includes("-") ? s.setProperty(t2, e3) : s[t2] = e3);
    }
    return x$2;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/components/color-picker/color-picker.styles.ts
var color_picker_styles_default = i$8`
  ${component_styles_default}

  :host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;

    display: inline-block;
  }

  .color-picker {
    width: var(--grid-width);
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    user-select: none;
  }

  .color-picker--inline {
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
  }

  .color-picker--inline:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%),
      linear-gradient(to right, #fff 0%, rgba(255, 255, 255, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
    forced-color-adjust: none;
  }

  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
    transition: var(--sl-transition-fast) scale;
  }

  .color-picker__grid-handle--dragging {
    cursor: none;
    scale: 1.5;
  }

  .color-picker__grid-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__controls {
    padding: var(--sl-spacing-small);
    display: flex;
    align-items: center;
  }

  .color-picker__sliders {
    flex: 1 1 auto;
  }

  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: var(--sl-border-radius-pill);
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    forced-color-adjust: none;
  }

  .color-picker__slider:not(:last-of-type) {
    margin-bottom: var(--sl-spacing-small);
  }

  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }

  .color-picker__slider-handle:focus-visible {
    outline: var(--sl-focus-ring);
  }

  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }

  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }

  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 2.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-border-radius-circle);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
    forced-color-adjust: none;
  }

  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);

    /* We use a custom property in lieu of currentColor because of https://bugs.webkit.org/show_bug.cgi?id=216780 */
    background-color: var(--preview-color);
  }

  .color-picker__preview:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }

  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 var(--sl-color-primary-500);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }

  .color-picker__user-input {
    display: flex;
    padding: 0 var(--sl-spacing-small) var(--sl-spacing-small) var(--sl-spacing-small);
  }

  .color-picker__user-input sl-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }

  .color-picker__user-input sl-button-group {
    margin-left: var(--sl-spacing-small);
  }

  .color-picker__user-input sl-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }

  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px var(--sl-color-neutral-200);
    padding: var(--sl-spacing-small);
    forced-color-adjust: none;
  }

  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: var(--sl-border-radius-small);
  }

  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }

  .color-picker__swatch:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, transparent 75%, var(--sl-color-neutral-300) 75%),
      linear-gradient(45deg, var(--sl-color-neutral-300) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position: 0 0, 0 0, -5px -5px, 5px 5px;
  }

  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }

  /*
   * Color dropdown
   */

  .color-dropdown::part(panel) {
    max-height: none;
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    forced-color-adjust: none;
  }

  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: var(--sl-input-height-small);
    height: var(--sl-input-height-small);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: var(--sl-input-height-medium);
    height: var(--sl-input-height-medium);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: var(--sl-input-height-large);
    height: var(--sl-input-height-large);
    border-radius: var(--sl-border-radius-circle);
  }

  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow: inset 0 0 0 2px var(--sl-input-border-color), inset 0 0 0 4px var(--sl-color-neutral-0);
  }

  .color-dropdown__trigger--empty:before {
    background-color: transparent;
  }

  .color-dropdown__trigger:focus-visible {
    outline: none;
  }

  .color-dropdown__trigger:focus-visible:not(.color-dropdown__trigger--disabled) {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// src/internal/default-value.ts
var defaultValue = (propertyName = "value") => (proto, key) => {
  const ctor = proto.constructor;
  const attributeChangedCallback = ctor.prototype.attributeChangedCallback;
  ctor.prototype.attributeChangedCallback = function(name, old, value) {
    var _a;
    const options = ctor.getPropertyOptions(propertyName);
    const attributeName = typeof options.attribute === "string" ? options.attribute : propertyName;
    if (name === attributeName) {
      const converter = options.converter || n2$1;
      const fromAttribute = typeof converter === "function" ? converter : (_a = converter == null ? void 0 : converter.fromAttribute) != null ? _a : n2$1.fromAttribute;
      const newValue = fromAttribute(value, options.type);
      if (this[propertyName] !== newValue) {
        this[key] = newValue;
      }
    }
    attributeChangedCallback.call(this, name, old, value);
  };
};

// node_modules/@ctrl/tinycolor/dist/module/util.js
function bound01(n, max) {
  if (isOnePointZero(n)) {
    n = "100%";
  }
  var isPercent = isPercentage(n);
  n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
  if (isPercent) {
    n = parseInt(String(n * max), 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  if (max === 360) {
    n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
  } else {
    n = n % max / parseFloat(String(max));
  }
  return n;
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function isOnePointZero(n) {
  return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") !== -1;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function convertToPercentage(n) {
  if (n <= 1) {
    return "".concat(Number(n) * 100, "%");
  }
  return n;
}
function pad2(c) {
  return c.length === 1 ? "0" + c : String(c);
}

// node_modules/@ctrl/tinycolor/dist/module/conversion.js
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0;
  var s = 0;
  var l2 = (max + min) / 2;
  if (max === min) {
    s = 0;
    h = 0;
  } else {
    var d = max - min;
    s = l2 > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, l: l2 };
}
function hue2rgb(p, q, t2) {
  if (t2 < 0) {
    t2 += 1;
  }
  if (t2 > 1) {
    t2 -= 1;
  }
  if (t2 < 1 / 6) {
    return p + (q - p) * (6 * t2);
  }
  if (t2 < 1 / 2) {
    return q;
  }
  if (t2 < 2 / 3) {
    return p + (q - p) * (2 / 3 - t2) * 6;
  }
  return p;
}
function hslToRgb(h, s, l2) {
  var r;
  var g;
  var b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l2 = bound01(l2, 100);
  if (s === 0) {
    g = l2;
    b = l2;
    r = l2;
  } else {
    var q = l2 < 0.5 ? l2 * (1 + s) : l2 + s - l2 * s;
    var p = 2 * l2 - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h = 0;
  var v = max;
  var d = max - min;
  var s = max === 0 ? 0 : d / max;
  if (max === min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h, s, v };
}
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i3 = Math.floor(h);
  var f = h - i3;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t2 = v * (1 - (1 - f) * s);
  var mod = i3 % 6;
  var r = [v, q, p, p, t2, v][mod];
  var g = [t2, v, v, q, p, p][mod];
  var b = [p, p, t2, v, v, q][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
    pad2(convertDecimalToHex(a))
  ];
  if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 65280) >> 8,
    b: color & 255
  };
}

// node_modules/@ctrl/tinycolor/dist/module/css-color-names.js
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};

// node_modules/@ctrl/tinycolor/dist/module/format-input.js
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a = 1;
  var s = null;
  var v = null;
  var l2 = null;
  var ok = false;
  var format = false;
  if (typeof color === "string") {
    color = stringInputToObject(color);
  }
  if (typeof color === "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l2 = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l2);
      ok = true;
      format = "hsl";
    }
    if (Object.prototype.hasOwnProperty.call(color, "a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  if (color.length === 0) {
    return false;
  }
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match = matchers.rgb.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  match = matchers.rgba.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] };
  }
  match = matchers.hsl.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3] };
  }
  match = matchers.hsla.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] };
  }
  match = matchers.hsv.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3] };
  }
  match = matchers.hsva.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3], a: match[4] };
  }
  match = matchers.hex8.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex6.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  match = matchers.hex4.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex3.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

// node_modules/@ctrl/tinycolor/dist/module/index.js
var TinyColor = function() {
  function TinyColor2(color, opts) {
    if (color === void 0) {
      color = "";
    }
    if (opts === void 0) {
      opts = {};
    }
    var _a;
    if (color instanceof TinyColor2) {
      return color;
    }
    if (typeof color === "number") {
      color = numberInputToObject(color);
    }
    this.originalInput = color;
    var rgb = inputToRGB(color);
    this.originalInput = color;
    this.r = rgb.r;
    this.g = rgb.g;
    this.b = rgb.b;
    this.a = rgb.a;
    this.roundA = Math.round(100 * this.a) / 100;
    this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
    this.gradientType = opts.gradientType;
    if (this.r < 1) {
      this.r = Math.round(this.r);
    }
    if (this.g < 1) {
      this.g = Math.round(this.g);
    }
    if (this.b < 1) {
      this.b = Math.round(this.b);
    }
    this.isValid = rgb.ok;
  }
  TinyColor2.prototype.isDark = function() {
    return this.getBrightness() < 128;
  };
  TinyColor2.prototype.isLight = function() {
    return !this.isDark();
  };
  TinyColor2.prototype.getBrightness = function() {
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
  };
  TinyColor2.prototype.getLuminance = function() {
    var rgb = this.toRgb();
    var R;
    var G;
    var B;
    var RsRGB = rgb.r / 255;
    var GsRGB = rgb.g / 255;
    var BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) {
      R = RsRGB / 12.92;
    } else {
      R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    }
    if (GsRGB <= 0.03928) {
      G = GsRGB / 12.92;
    } else {
      G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    }
    if (BsRGB <= 0.03928) {
      B = BsRGB / 12.92;
    } else {
      B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  };
  TinyColor2.prototype.getAlpha = function() {
    return this.a;
  };
  TinyColor2.prototype.setAlpha = function(alpha) {
    this.a = boundAlpha(alpha);
    this.roundA = Math.round(100 * this.a) / 100;
    return this;
  };
  TinyColor2.prototype.isMonochrome = function() {
    var s = this.toHsl().s;
    return s === 0;
  };
  TinyColor2.prototype.toHsv = function() {
    var hsv = rgbToHsv(this.r, this.g, this.b);
    return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
  };
  TinyColor2.prototype.toHsvString = function() {
    var hsv = rgbToHsv(this.r, this.g, this.b);
    var h = Math.round(hsv.h * 360);
    var s = Math.round(hsv.s * 100);
    var v = Math.round(hsv.v * 100);
    return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toHsl = function() {
    var hsl = rgbToHsl(this.r, this.g, this.b);
    return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
  };
  TinyColor2.prototype.toHslString = function() {
    var hsl = rgbToHsl(this.r, this.g, this.b);
    var h = Math.round(hsl.h * 360);
    var s = Math.round(hsl.s * 100);
    var l2 = Math.round(hsl.l * 100);
    return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l2, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l2, "%, ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toHex = function(allow3Char) {
    if (allow3Char === void 0) {
      allow3Char = false;
    }
    return rgbToHex(this.r, this.g, this.b, allow3Char);
  };
  TinyColor2.prototype.toHexString = function(allow3Char) {
    if (allow3Char === void 0) {
      allow3Char = false;
    }
    return "#" + this.toHex(allow3Char);
  };
  TinyColor2.prototype.toHex8 = function(allow4Char) {
    if (allow4Char === void 0) {
      allow4Char = false;
    }
    return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
  };
  TinyColor2.prototype.toHex8String = function(allow4Char) {
    if (allow4Char === void 0) {
      allow4Char = false;
    }
    return "#" + this.toHex8(allow4Char);
  };
  TinyColor2.prototype.toRgb = function() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a
    };
  };
  TinyColor2.prototype.toRgbString = function() {
    var r = Math.round(this.r);
    var g = Math.round(this.g);
    var b = Math.round(this.b);
    return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toPercentageRgb = function() {
    var fmt = function(x) {
      return "".concat(Math.round(bound01(x, 255) * 100), "%");
    };
    return {
      r: fmt(this.r),
      g: fmt(this.g),
      b: fmt(this.b),
      a: this.a
    };
  };
  TinyColor2.prototype.toPercentageRgbString = function() {
    var rnd = function(x) {
      return Math.round(bound01(x, 255) * 100);
    };
    return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
  };
  TinyColor2.prototype.toName = function() {
    if (this.a === 0) {
      return "transparent";
    }
    if (this.a < 1) {
      return false;
    }
    var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
    for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
      var _b = _a[_i], key = _b[0], value = _b[1];
      if (hex === value) {
        return key;
      }
    }
    return false;
  };
  TinyColor2.prototype.toString = function(format) {
    var formatSet = Boolean(format);
    format = format !== null && format !== void 0 ? format : this.format;
    var formattedString = false;
    var hasAlpha = this.a < 1 && this.a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
    if (needsAlphaFormat) {
      if (format === "name" && this.a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  };
  TinyColor2.prototype.toNumber = function() {
    return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
  };
  TinyColor2.prototype.clone = function() {
    return new TinyColor2(this.toString());
  };
  TinyColor2.prototype.lighten = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.brighten = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var rgb = this.toRgb();
    rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
    rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
    rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
    return new TinyColor2(rgb);
  };
  TinyColor2.prototype.darken = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.tint = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    return this.mix("white", amount);
  };
  TinyColor2.prototype.shade = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    return this.mix("black", amount);
  };
  TinyColor2.prototype.desaturate = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.saturate = function(amount) {
    if (amount === void 0) {
      amount = 10;
    }
    var hsl = this.toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.greyscale = function() {
    return this.desaturate(100);
  };
  TinyColor2.prototype.spin = function(amount) {
    var hsl = this.toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.mix = function(color, amount) {
    if (amount === void 0) {
      amount = 50;
    }
    var rgb1 = this.toRgb();
    var rgb2 = new TinyColor2(color).toRgb();
    var p = amount / 100;
    var rgba = {
      r: (rgb2.r - rgb1.r) * p + rgb1.r,
      g: (rgb2.g - rgb1.g) * p + rgb1.g,
      b: (rgb2.b - rgb1.b) * p + rgb1.b,
      a: (rgb2.a - rgb1.a) * p + rgb1.a
    };
    return new TinyColor2(rgba);
  };
  TinyColor2.prototype.analogous = function(results, slices) {
    if (results === void 0) {
      results = 6;
    }
    if (slices === void 0) {
      slices = 30;
    }
    var hsl = this.toHsl();
    var part = 360 / slices;
    var ret = [this];
    for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
      hsl.h = (hsl.h + part) % 360;
      ret.push(new TinyColor2(hsl));
    }
    return ret;
  };
  TinyColor2.prototype.complement = function() {
    var hsl = this.toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return new TinyColor2(hsl);
  };
  TinyColor2.prototype.monochromatic = function(results) {
    if (results === void 0) {
      results = 6;
    }
    var hsv = this.toHsv();
    var h = hsv.h;
    var s = hsv.s;
    var v = hsv.v;
    var res = [];
    var modification = 1 / results;
    while (results--) {
      res.push(new TinyColor2({ h, s, v }));
      v = (v + modification) % 1;
    }
    return res;
  };
  TinyColor2.prototype.splitcomplement = function() {
    var hsl = this.toHsl();
    var h = hsl.h;
    return [
      this,
      new TinyColor2({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
      new TinyColor2({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })
    ];
  };
  TinyColor2.prototype.onBackground = function(background) {
    var fg = this.toRgb();
    var bg = new TinyColor2(background).toRgb();
    return new TinyColor2({
      r: bg.r + (fg.r - bg.r) * fg.a,
      g: bg.g + (fg.g - bg.g) * fg.a,
      b: bg.b + (fg.b - bg.b) * fg.a
    });
  };
  TinyColor2.prototype.triad = function() {
    return this.polyad(3);
  };
  TinyColor2.prototype.tetrad = function() {
    return this.polyad(4);
  };
  TinyColor2.prototype.polyad = function(n) {
    var hsl = this.toHsl();
    var h = hsl.h;
    var result = [this];
    var increment = 360 / n;
    for (var i3 = 1; i3 < n; i3++) {
      result.push(new TinyColor2({ h: (h + i3 * increment) % 360, s: hsl.s, l: hsl.l }));
    }
    return result;
  };
  TinyColor2.prototype.equals = function(color) {
    return this.toRgbString() === new TinyColor2(color).toRgbString();
  };
  return TinyColor2;
}();

// src/components/color-picker/color-picker.ts
var hasEyeDropper = "EyeDropper" in window;
var SlColorPicker = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this);
    this.isSafeValue = false;
    this.localize = new LocalizeController2(this);
    this.isDraggingGridHandle = false;
    this.isEmpty = false;
    this.inputValue = "";
    this.hue = 0;
    this.saturation = 100;
    this.lightness = 100;
    this.brightness = 100;
    this.alpha = 100;
    this.invalid = false;
    this.value = "";
    this.defaultValue = "";
    this.label = "";
    this.format = "hex";
    this.inline = false;
    this.size = "medium";
    this.noFormatToggle = false;
    this.name = "";
    this.disabled = false;
    this.hoist = false;
    this.opacity = false;
    this.uppercase = false;
    this.swatches = "";
  }
  connectedCallback() {
    super.connectedCallback();
    if (this.value) {
      this.setColor(this.value);
      this.inputValue = this.value;
      this.lastValueEmitted = this.value;
      this.syncValues();
    } else {
      this.isEmpty = true;
      this.inputValue = "";
      this.lastValueEmitted = "";
    }
  }
  getBrightness(lightness) {
    return clamp$1(-1 * (200 * lightness / (this.saturation - 200)), 0, 100);
  }
  handleCopy() {
    this.input.select();
    document.execCommand("copy");
    this.previewButton.focus();
    this.previewButton.classList.add("color-picker__preview-color--copied");
    this.previewButton.addEventListener("animationend", () => {
      this.previewButton.classList.remove("color-picker__preview-color--copied");
    });
  }
  handleFormatToggle() {
    const formats = ["hex", "rgb", "hsl", "hsv"];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex];
    this.setColor(this.value);
    this.emit("sl-change");
    this.emit("sl-input");
  }
  handleAlphaDrag(event) {
    const container = this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha");
    const handle = container.querySelector(".color-picker__slider-handle");
    const { width } = container.getBoundingClientRect();
    let oldValue = this.value;
    handle.focus();
    event.preventDefault();
    drag(container, {
      onMove: (x) => {
        this.alpha = clamp$1(x / width * 100, 0, 100);
        this.syncValues();
        if (this.value !== oldValue) {
          oldValue = this.value;
          this.emit("sl-change");
          this.emit("sl-input");
        }
      },
      initialEvent: event
    });
  }
  handleHueDrag(event) {
    const container = this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue");
    const handle = container.querySelector(".color-picker__slider-handle");
    const { width } = container.getBoundingClientRect();
    let oldValue = this.value;
    handle.focus();
    event.preventDefault();
    drag(container, {
      onMove: (x) => {
        this.hue = clamp$1(x / width * 360, 0, 360);
        this.syncValues();
        if (this.value !== oldValue) {
          oldValue = this.value;
          this.emit("sl-change");
          this.emit("sl-input");
        }
      },
      initialEvent: event
    });
  }
  handleGridDrag(event) {
    const grid = this.shadowRoot.querySelector(".color-picker__grid");
    const handle = grid.querySelector(".color-picker__grid-handle");
    const { width, height } = grid.getBoundingClientRect();
    let oldValue = this.value;
    handle.focus();
    event.preventDefault();
    this.isDraggingGridHandle = true;
    drag(grid, {
      onMove: (x, y2) => {
        this.saturation = clamp$1(x / width * 100, 0, 100);
        this.brightness = clamp$1(100 - y2 / height * 100, 0, 100);
        this.lightness = this.getLightness(this.brightness);
        this.syncValues();
        if (this.value !== oldValue) {
          oldValue = this.value;
          this.emit("sl-change");
          this.emit("sl-input");
        }
      },
      onStop: () => this.isDraggingGridHandle = false,
      initialEvent: event
    });
  }
  handleAlphaKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.alpha = clamp$1(this.alpha - increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.alpha = clamp$1(this.alpha + increment, 0, 100);
      this.syncValues();
    }
    if (event.key === "Home") {
      event.preventDefault();
      this.alpha = 0;
      this.syncValues();
    }
    if (event.key === "End") {
      event.preventDefault();
      this.alpha = 100;
      this.syncValues();
    }
    if (this.value !== oldValue) {
      this.emit("sl-change");
      this.emit("sl-input");
    }
  }
  handleHueKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.hue = clamp$1(this.hue - increment, 0, 360);
      this.syncValues();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.hue = clamp$1(this.hue + increment, 0, 360);
      this.syncValues();
    }
    if (event.key === "Home") {
      event.preventDefault();
      this.hue = 0;
      this.syncValues();
    }
    if (event.key === "End") {
      event.preventDefault();
      this.hue = 360;
      this.syncValues();
    }
    if (this.value !== oldValue) {
      this.emit("sl-change");
      this.emit("sl-input");
    }
  }
  handleGridKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;
    const oldValue = this.value;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.saturation = clamp$1(this.saturation - increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.saturation = clamp$1(this.saturation + increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      this.brightness = clamp$1(this.brightness + increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      this.brightness = clamp$1(this.brightness - increment, 0, 100);
      this.lightness = this.getLightness(this.brightness);
      this.syncValues();
    }
    if (this.value !== oldValue) {
      this.emit("sl-change");
      this.emit("sl-input");
    }
  }
  handleInputChange(event) {
    const target = event.target;
    const oldValue = this.value;
    event.stopPropagation();
    if (this.input.value) {
      this.setColor(target.value);
      target.value = this.value;
    } else {
      this.value = "";
    }
    if (this.value !== oldValue) {
      this.emit("sl-change");
      this.emit("sl-input");
    }
  }
  handleInputInput(event) {
    event.stopPropagation();
  }
  handleInputKeyDown(event) {
    if (event.key === "Enter") {
      const oldValue = this.value;
      if (this.input.value) {
        this.setColor(this.input.value);
        this.input.value = this.value;
        if (this.value !== oldValue) {
          this.emit("sl-change");
          this.emit("sl-input");
        }
        setTimeout(() => this.input.select());
      } else {
        this.hue = 0;
      }
    }
  }
  handleTouchMove(event) {
    event.preventDefault();
  }
  parseColor(colorString) {
    const color = new TinyColor(colorString);
    if (!color.isValid) {
      return null;
    }
    const hslColor = color.toHsl();
    const hsl = {
      h: hslColor.h,
      s: hslColor.s * 100,
      l: hslColor.l * 100,
      a: hslColor.a
    };
    const rgb = color.toRgb();
    const hex = color.toHexString();
    const hexa = color.toHex8String();
    const hsvColor = color.toHsv();
    const hsv = {
      h: hsvColor.h,
      s: hsvColor.s * 100,
      v: hsvColor.v * 100,
      a: hsvColor.a
    };
    return {
      hsl: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        string: this.setLetterCase(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`)
      },
      hsla: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        string: this.setLetterCase(
          `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${hsl.a.toFixed(2).toString()})`
        )
      },
      hsv: {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
        string: this.setLetterCase(`hsv(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%)`)
      },
      hsva: {
        h: hsv.h,
        s: hsv.s,
        v: hsv.v,
        a: hsv.a,
        string: this.setLetterCase(
          `hsva(${Math.round(hsv.h)}, ${Math.round(hsv.s)}%, ${Math.round(hsv.v)}%, ${hsv.a.toFixed(2).toString()})`
        )
      },
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        string: this.setLetterCase(`rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`)
      },
      rgba: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: rgb.a,
        string: this.setLetterCase(
          `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${rgb.a.toFixed(2).toString()})`
        )
      },
      hex: this.setLetterCase(hex),
      hexa: this.setLetterCase(hexa)
    };
  }
  setColor(colorString) {
    const newColor = this.parseColor(colorString);
    if (newColor === null) {
      return false;
    }
    this.hue = newColor.hsla.h;
    this.saturation = newColor.hsla.s;
    this.lightness = newColor.hsla.l;
    this.brightness = this.getBrightness(newColor.hsla.l);
    this.alpha = this.opacity ? newColor.hsla.a * 100 : 100;
    this.syncValues();
    return true;
  }
  setLetterCase(string) {
    if (typeof string !== "string") {
      return "";
    }
    return this.uppercase ? string.toUpperCase() : string.toLowerCase();
  }
  async syncValues() {
    const currentColor = this.parseColor(
      `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    );
    if (currentColor === null) {
      return;
    }
    if (this.format === "hsl") {
      this.inputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === "rgb") {
      this.inputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else if (this.format === "hsv") {
      this.inputValue = this.opacity ? currentColor.hsva.string : currentColor.hsv.string;
    } else {
      this.inputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }
    this.isSafeValue = true;
    this.value = this.inputValue;
    await this.updateComplete;
    this.isSafeValue = false;
  }
  handleAfterHide() {
    this.previewButton.classList.remove("color-picker__preview-color--copied");
  }
  handleEyeDropper() {
    if (!hasEyeDropper) {
      return;
    }
    const eyeDropper = new EyeDropper();
    eyeDropper.open().then((colorSelectionResult) => this.setColor(colorSelectionResult.sRGBHex)).catch(() => {
    });
  }
  selectSwatch(color) {
    const oldValue = this.value;
    if (!this.disabled) {
      this.setColor(color);
      if (this.value !== oldValue) {
        this.emit("sl-change");
        this.emit("sl-input");
      }
    }
  }
  getLightness(brightness) {
    return clamp$1((200 - this.saturation) * brightness / 100 * 5 / 10, 0, 100);
  }
  handleFormatChange() {
    this.syncValues();
  }
  handleOpacityChange() {
    this.alpha = 100;
  }
  handleValueChange(oldValue, newValue) {
    this.isEmpty = !newValue;
    if (!newValue) {
      this.hue = 0;
      this.saturation = 100;
      this.brightness = 100;
      this.lightness = this.getLightness(this.brightness);
      this.alpha = 100;
    }
    if (!this.isSafeValue && oldValue !== void 0) {
      const newColor = this.parseColor(newValue);
      if (newColor !== null) {
        this.inputValue = this.value;
        this.hue = newColor.hsla.h;
        this.saturation = newColor.hsla.s;
        this.lightness = newColor.hsla.l;
        this.brightness = this.getBrightness(newColor.hsla.l);
        this.alpha = newColor.hsla.a * 100;
      } else {
        this.inputValue = oldValue;
      }
    }
    if (this.value !== this.lastValueEmitted) {
      this.lastValueEmitted = this.value;
    }
  }
  getFormattedValue(format = "hex") {
    const currentColor = this.parseColor(
      `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    );
    if (currentColor === null) {
      return "";
    }
    switch (format) {
      case "hex":
        return currentColor.hex;
      case "hexa":
        return currentColor.hexa;
      case "rgb":
        return currentColor.rgb.string;
      case "rgba":
        return currentColor.rgba.string;
      case "hsl":
        return currentColor.hsl.string;
      case "hsla":
        return currentColor.hsla.string;
      case "hsv":
        return currentColor.hsv.string;
      case "hsva":
        return currentColor.hsva.string;
      default:
        return "";
    }
  }
  checkValidity() {
    return this.input.checkValidity();
  }
  reportValidity() {
    if (!this.inline && this.input.invalid) {
      this.dropdown.show();
      this.addEventListener("sl-after-show", () => this.input.reportValidity(), { once: true });
      return this.checkValidity();
    }
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = this.input.invalid;
  }
  render() {
    const gridHandleX = this.saturation;
    const gridHandleY = 100 - this.brightness;
    const swatches = Array.isArray(this.swatches) ? this.swatches : this.swatches.split(";").filter((color) => color !== "");
    const colorPicker = y$1`
      <div
        part="base"
        class=${o$9({
      "color-picker": true,
      "color-picker--inline": this.inline,
      "color-picker--disabled": this.disabled
    })}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-labelledby="label"
        tabindex=${this.inline ? "0" : "-1"}
      >
        ${this.inline ? y$1`
              <sl-visually-hidden id="label">
                <slot name="label">${this.label}</slot>
              </sl-visually-hidden>
            ` : null}

        <div
          part="grid"
          class="color-picker__grid"
          style=${i2$1({ backgroundColor: `hsl(${this.hue}deg, 100%, 50%)` })}
          @pointerdown=${this.handleGridDrag}
          @touchmove=${this.handleTouchMove}
        >
          <span
            part="grid-handle"
            class=${o$9({
      "color-picker__grid-handle": true,
      "color-picker__grid-handle--dragging": this.isDraggingGridHandle
    })}
            style=${i2$1({
      top: `${gridHandleY}%`,
      left: `${gridHandleX}%`,
      backgroundColor: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`
    })}
            role="application"
            aria-label="HSL"
            tabindex=${l$8(this.disabled ? void 0 : "0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @pointerdown=${this.handleHueDrag}
              @touchmove=${this.handleTouchMove}
            >
              <span
                part="slider-handle"
                class="color-picker__slider-handle"
                style=${i2$1({
      left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
    })}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${`${Math.round(this.hue)}`}
                tabindex=${l$8(this.disabled ? void 0 : "0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity ? y$1`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @pointerdown="${this.handleAlphaDrag}"
                    @touchmove=${this.handleTouchMove}
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${i2$1({
      backgroundImage: `linear-gradient(
                          to right,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                        )`
    })}
                    ></div>
                    <span
                      part="slider-handle"
                      class="color-picker__slider-handle"
                      style=${i2$1({
      left: `${this.alpha}%`
    })}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${l$8(this.disabled ? void 0 : "0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                ` : ""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${i2$1({
      "--preview-color": `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    })}
            @click=${this.handleCopy}
          ></button>
        </div>

        <div class="color-picker__user-input" aria-live="polite">
          <sl-input
            part="input"
            type="text"
            name=${this.name}
            autocomplete="off"
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            value=${this.isEmpty ? "" : this.inputValue}
            ?disabled=${this.disabled}
            aria-label=${this.localize.term("currentValue")}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
            @sl-input=${this.handleInputInput}
          ></sl-input>

          <sl-button-group>
            ${!this.noFormatToggle ? y$1`
                  <sl-button
                    part="format-button"
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="
                      base:format-button__base,
                      prefix:format-button__prefix,
                      label:format-button__label,
                      suffix:format-button__suffix,
                      caret:format-button__caret
                    "
                    @click=${this.handleFormatToggle}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                ` : ""}
            ${hasEyeDropper ? y$1`
                  <sl-button
                    part="eye-dropper-button"
                    exportparts="
                      base:eye-dropper-button__base,
                      prefix:eye-dropper-button__prefix,
                      label:eye-dropper-button__label,
                      suffix:eye-dropper-button__suffix,
                      caret:eye-dropper-button__caret
                    "
                    @click=${this.handleEyeDropper}
                  >
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                ` : ""}
          </sl-button-group>
        </div>

        ${swatches.length > 0 ? y$1`
              <div part="swatches" class="color-picker__swatches">
                ${swatches.map((swatch) => {
      const parsedColor = this.parseColor(swatch);
      if (!parsedColor) {
        console.error(`Unable to parse swatch color: "${swatch}"`, this);
        return "";
      }
      return y$1`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${l$8(this.disabled ? void 0 : "0")}
                      role="button"
                      aria-label=${swatch}
                      @click=${() => this.selectSwatch(swatch)}
                      @keydown=${(event) => !this.disabled && event.key === "Enter" && this.setColor(parsedColor.hexa)}
                    >
                      <div
                        class="color-picker__swatch-color"
                        style=${i2$1({ backgroundColor: parsedColor.hexa })}
                      ></div>
                    </div>
                  `;
    })}
              </div>
            ` : ""}
      </div>
    `;
    if (this.inline) {
      return colorPicker;
    }
    return y$1`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled ? "true" : "false"}
        .containing-element=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${o$9({
      "color-dropdown__trigger": true,
      "color-dropdown__trigger--disabled": this.disabled,
      "color-dropdown__trigger--small": this.size === "small",
      "color-dropdown__trigger--medium": this.size === "medium",
      "color-dropdown__trigger--large": this.size === "large",
      "color-dropdown__trigger--empty": this.isEmpty,
      "color-picker__transparent-bg": true
    })}
          style=${i2$1({
      color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    })}
          type="button"
        >
          <sl-visually-hidden>
            <slot name="label">${this.label}</slot>
          </sl-visually-hidden>
        </button>
        ${colorPicker}
      </sl-dropdown>
    `;
  }
};
SlColorPicker.styles = color_picker_styles_default;
__decorateClass([
  i2$2('[part~="input"]')
], SlColorPicker.prototype, "input", 2);
__decorateClass([
  i2$2('[part~="preview"]')
], SlColorPicker.prototype, "previewButton", 2);
__decorateClass([
  i2$2(".color-dropdown")
], SlColorPicker.prototype, "dropdown", 2);
__decorateClass([
  t$5()
], SlColorPicker.prototype, "isDraggingGridHandle", 2);
__decorateClass([
  t$5()
], SlColorPicker.prototype, "isEmpty", 2);
__decorateClass([
  t$5()
], SlColorPicker.prototype, "inputValue", 2);
__decorateClass([
  t$5()
], SlColorPicker.prototype, "hue", 2);
__decorateClass([
  t$5()
], SlColorPicker.prototype, "saturation", 2);
__decorateClass([
  t$5()
], SlColorPicker.prototype, "lightness", 2);
__decorateClass([
  t$5()
], SlColorPicker.prototype, "brightness", 2);
__decorateClass([
  t$5()
], SlColorPicker.prototype, "alpha", 2);
__decorateClass([
  t$5()
], SlColorPicker.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlColorPicker.prototype, "value", 2);
__decorateClass([
  defaultValue()
], SlColorPicker.prototype, "defaultValue", 2);
__decorateClass([
  e2$1()
], SlColorPicker.prototype, "label", 2);
__decorateClass([
  e2$1()
], SlColorPicker.prototype, "format", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlColorPicker.prototype, "inline", 2);
__decorateClass([
  e2$1()
], SlColorPicker.prototype, "size", 2);
__decorateClass([
  e2$1({ attribute: "no-format-toggle", type: Boolean })
], SlColorPicker.prototype, "noFormatToggle", 2);
__decorateClass([
  e2$1()
], SlColorPicker.prototype, "name", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlColorPicker.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlColorPicker.prototype, "hoist", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlColorPicker.prototype, "opacity", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlColorPicker.prototype, "uppercase", 2);
__decorateClass([
  e2$1()
], SlColorPicker.prototype, "swatches", 2);
__decorateClass([
  watch$1("format", { waitUntilFirstUpdate: true })
], SlColorPicker.prototype, "handleFormatChange", 1);
__decorateClass([
  watch$1("opacity", { waitUntilFirstUpdate: true })
], SlColorPicker.prototype, "handleOpacityChange", 1);
__decorateClass([
  watch$1("value")
], SlColorPicker.prototype, "handleValueChange", 1);
SlColorPicker = __decorateClass([
  e$9("sl-color-picker")
], SlColorPicker);

// src/components/visually-hidden/visually-hidden.styles.ts
var visually_hidden_styles_default = i$8`
  ${component_styles_default}

  :host(:not(:focus-within)) {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    clip: rect(0 0 0 0) !important;
    clip-path: inset(50%) !important;
    border: none !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    padding: 0 !important;
  }
`;

// src/components/visually-hidden/visually-hidden.ts
var SlVisuallyHidden = class extends ShoelaceElement$1 {
  render() {
    return y$1` <slot></slot> `;
  }
};
SlVisuallyHidden.styles = visually_hidden_styles_default;
SlVisuallyHidden = __decorateClass([
  e$9("sl-visually-hidden")
], SlVisuallyHidden);

// src/styles/form-control.styles.ts
var form_control_styles_default = i$8`
  .form-control .form-control__label {
    display: none;
  }

  .form-control .form-control__help-text {
    display: none;
  }

  /* Label */
  .form-control--has-label .form-control__label {
    display: inline-block;
    color: var(--sl-input-label-color);
    margin-bottom: var(--sl-spacing-3x-small);
  }

  .form-control--has-label.form-control--small .form-control__label {
    font-size: var(--sl-input-label-font-size-small);
  }

  .form-control--has-label.form-control--medium .form-control__label {
    font-size: var(--sl-input-label-font-size-medium);
  }

  .form-control--has-label.form-control--large .form-control_label {
    font-size: var(--sl-input-label-font-size-large);
  }

  :host([required]) .form-control--has-label .form-control__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
    color: var(--sl-input-required-content-color);
  }

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
    margin-top: var(--sl-spacing-3x-small);
  }

  .form-control--has-help-text.form-control--small .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-small);
  }

  .form-control--has-help-text.form-control--medium .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-medium);
  }

  .form-control--has-help-text.form-control--large .form-control__help-text {
    font-size: var(--sl-input-help-text-font-size-large);
  }

  .form-control--has-help-text.form-control--radio-group .form-control__help-text {
    margin-top: var(--sl-spacing-2x-small);
  }
`;

// src/components/input/input.styles.ts
var input_styles_default = i$8`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-input-font-weight);
    letter-spacing: var(--sl-input-letter-spacing);
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
    transition: var(--sl-transition-fast) color, var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow,
      var(--sl-transition-fast) background-color;
  }

  /* Standard inputs */
  .input--standard {
    background-color: var(--sl-input-background-color);
    border: solid var(--sl-input-border-width) var(--sl-input-border-color);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: var(--sl-input-background-color-hover);
    border-color: var(--sl-input-border-color-hover);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-background-color-focus);
    border-color: var(--sl-input-border-color-focus);
    box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: var(--sl-input-color-focus);
  }

  .input--standard.input--disabled {
    background-color: var(--sl-input-background-color-disabled);
    border-color: var(--sl-input-border-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: var(--sl-input-color-disabled);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: var(--sl-input-placeholder-color-disabled);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: var(--sl-input-filled-background-color);
    color: var(--sl-input-color);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-hover);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: var(--sl-input-filled-background-color-focus);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .input--filled.input--disabled {
    background-color: var(--sl-input-filled-background-color-disabled);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
    -webkit-appearance: none;
  }

  .input__control::-webkit-search-decoration,
  .input__control::-webkit-search-cancel-button,
  .input__control::-webkit-search-results-button,
  .input__control::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }

  .input__control:-webkit-autofill,
  .input__control:-webkit-autofill:hover,
  .input__control:-webkit-autofill:focus,
  .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-background-color-hover) inset !important;
    -webkit-text-fill-color: var(--sl-color-primary-500);
    caret-color: var(--sl-input-color);
  }

  .input--filled .input__control:-webkit-autofill,
  .input--filled .input__control:-webkit-autofill:hover,
  .input--filled .input__control:-webkit-autofill:focus,
  .input--filled .input__control:-webkit-autofill:active {
    box-shadow: 0 0 0 var(--sl-input-height-large) var(--sl-input-filled-background-color) inset !important;
  }

  .input__control::placeholder {
    color: var(--sl-input-placeholder-color);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: var(--sl-input-color-hover);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix::slotted(sl-icon),
  .input__suffix::slotted(sl-icon) {
    color: var(--sl-input-icon-color);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: var(--sl-input-border-radius-small);
    font-size: var(--sl-input-font-size-small);
    height: var(--sl-input-height-small);
  }

  .input--small .input__control {
    height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-small);
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-small) * 2);
  }

  .input--small .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-small);
  }

  .input--medium {
    border-radius: var(--sl-input-border-radius-medium);
    font-size: var(--sl-input-font-size-medium);
    height: var(--sl-input-height-medium);
  }

  .input--medium .input__control {
    height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-medium);
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-medium) * 2);
  }

  .input--medium .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-medium);
  }

  .input--large {
    border-radius: var(--sl-input-border-radius-large);
    font-size: var(--sl-input-font-size-large);
    height: var(--sl-input-height-large);
  }

  .input--large .input__control {
    height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    padding: 0 var(--sl-input-spacing-large);
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    width: calc(1em + var(--sl-input-spacing-large) * 2);
  }

  .input--large .input__prefix::slotted(*) {
    margin-inline-start: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix::slotted(*) {
    margin-inline-end: var(--sl-input-spacing-large);
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: var(--sl-input-height-small);
  }

  .input--pill.input--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .input--pill.input--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: inherit;
    color: var(--sl-input-icon-color);
    border: none;
    background: none;
    padding: 0;
    transition: var(--sl-transition-fast) color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: var(--sl-input-icon-color-hover);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  /* Don't show the browser's password toggle in Edge */
  ::-ms-reveal {
    display: none;
  }

  /* Hide Firefox's clear button on date and time inputs */
  .input--is-firefox input[type='date'],
  .input--is-firefox input[type='time'] {
    clip-path: inset(0 2em 0 0);
  }

  /* Hide the built-in number spinner */
  .input--no-spin-buttons input[type='number']::-webkit-outer-spin-button,
  .input--no-spin-buttons input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
  }

  .input--no-spin-buttons input[type='number'] {
    -moz-appearance: textfield;
  }
`;

var e2 = (o) => void 0 === o.strings;
var f$3 = {};
var s$8 = (o, l3 = f$3) => o._$AH = l3;

// node_modules/lit-html/directives/live.js
var l2$1 = e$a(class extends i$6 {
  constructor(r) {
    if (super(r), r.type !== t$6.PROPERTY && r.type !== t$6.ATTRIBUTE && r.type !== t$6.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!e2(r))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r) {
    return r;
  }
  update(i2, [t2]) {
    if (t2 === x$2 || t2 === b$2)
      return t2;
    const o = i2.element, l3 = i2.name;
    if (i2.type === t$6.PROPERTY) {
      if (t2 === o[l3])
        return x$2;
    } else if (i2.type === t$6.BOOLEAN_ATTRIBUTE) {
      if (!!t2 === o.hasAttribute(l3))
        return x$2;
    } else if (i2.type === t$6.ATTRIBUTE && o.getAttribute(l3) === t2 + "")
      return x$2;
    return s$8(i2), t2;
  }
});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// src/components/input/input.ts
var _a;
var isChromium = (_a = navigator.userAgentData) == null ? void 0 : _a.brands.some((b) => b.brand.includes("Chromium"));
var isFirefox = isChromium ? false : navigator.userAgent.includes("Firefox");
var SlInput = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this);
    this.hasSlotController = new HasSlotController$1(this, "help-text", "label");
    this.localize = new LocalizeController2(this);
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.type = "text";
    this.name = "";
    this.value = "";
    this.defaultValue = "";
    this.size = "medium";
    this.filled = false;
    this.pill = false;
    this.label = "";
    this.helpText = "";
    this.clearable = false;
    this.disabled = false;
    this.placeholder = "";
    this.readonly = false;
    this.passwordToggle = false;
    this.passwordVisible = false;
    this.noSpinButtons = false;
    this.required = false;
    this.spellcheck = true;
  }
  get valueAsDate() {
    var _a2, _b;
    return (_b = (_a2 = this.input) == null ? void 0 : _a2.valueAsDate) != null ? _b : null;
  }
  set valueAsDate(newValue) {
    const input = document.createElement("input");
    input.type = "date";
    input.valueAsDate = newValue;
    this.value = input.value;
  }
  get valueAsNumber() {
    var _a2, _b;
    return (_b = (_a2 = this.input) == null ? void 0 : _a2.valueAsNumber) != null ? _b : parseFloat(this.value);
  }
  set valueAsNumber(newValue) {
    const input = document.createElement("input");
    input.type = "number";
    input.valueAsNumber = newValue;
    this.value = input.value;
  }
  firstUpdated() {
    this.invalid = !this.checkValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleChange() {
    this.value = this.input.value;
    this.emit("sl-change");
  }
  handleClearClick(event) {
    this.value = "";
    this.emit("sl-clear");
    this.emit("sl-input");
    this.emit("sl-change");
    this.input.focus();
    event.stopPropagation();
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleInput() {
    this.value = this.input.value;
    this.invalid = !this.checkValidity();
    this.emit("sl-input");
  }
  handleInvalid() {
    this.invalid = true;
  }
  handleKeyDown(event) {
    const hasModifier = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
    if (event.key === "Enter" && !hasModifier) {
      setTimeout(() => {
        if (!event.defaultPrevented && !event.isComposing) {
          this.formSubmitController.submit();
        }
      });
    }
  }
  handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.checkValidity();
  }
  handleStepChange() {
    this.input.step = String(this.step);
    this.invalid = !this.checkValidity();
  }
  async handleValueChange() {
    await this.updateComplete;
    this.invalid = !this.checkValidity();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  select() {
    this.input.select();
  }
  setSelectionRange(selectionStart, selectionEnd, selectionDirection = "none") {
    this.input.setSelectionRange(selectionStart, selectionEnd, selectionDirection);
  }
  setRangeText(replacement, start, end, selectMode) {
    this.input.setRangeText(replacement, start, end, selectMode);
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  showPicker() {
    if ("showPicker" in HTMLInputElement.prototype) {
      this.input.showPicker();
    }
  }
  stepUp() {
    this.input.stepUp();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  stepDown() {
    this.input.stepDown();
    if (this.value !== this.input.value) {
      this.value = this.input.value;
    }
  }
  checkValidity() {
    return this.input.checkValidity();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.checkValidity();
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const hasClearIcon = this.clearable && !this.disabled && !this.readonly && (typeof this.value === "number" || this.value.length > 0);
    return y$1`
      <div
        part="form-control"
        class=${o$9({
      "form-control": true,
      "form-control--small": this.size === "small",
      "form-control--medium": this.size === "medium",
      "form-control--large": this.size === "large",
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
      >
        <label
          part="form-control-label"
          class="form-control__label"
          for="input"
          aria-hidden=${hasLabel ? "false" : "true"}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div
            part="base"
            class=${o$9({
      input: true,
      "input--small": this.size === "small",
      "input--medium": this.size === "medium",
      "input--large": this.size === "large",
      "input--pill": this.pill,
      "input--standard": !this.filled,
      "input--filled": this.filled,
      "input--disabled": this.disabled,
      "input--focused": this.hasFocus,
      "input--empty": !this.value,
      "input--invalid": this.invalid,
      "input--no-spin-buttons": this.noSpinButtons,
      "input--is-firefox": isFirefox
    })}
          >
            <slot name="prefix" part="prefix" class="input__prefix"></slot>
            <input
              part="input"
              id="input"
              class="input__control"
              type=${this.type === "password" && this.passwordVisible ? "text" : this.type}
              title=${this.title}
              name=${l$8(this.name)}
              ?disabled=${this.disabled}
              ?readonly=${this.readonly}
              ?required=${this.required}
              placeholder=${l$8(this.placeholder)}
              minlength=${l$8(this.minlength)}
              maxlength=${l$8(this.maxlength)}
              min=${l$8(this.min)}
              max=${l$8(this.max)}
              step=${l$8(this.step)}
              .value=${l2$1(this.value)}
              autocapitalize=${l$8(this.type === "password" ? "off" : this.autocapitalize)}
              autocomplete=${l$8(this.type === "password" ? "off" : this.autocomplete)}
              autocorrect=${l$8(this.type === "password" ? "off" : this.autocorrect)}
              ?autofocus=${this.autofocus}
              spellcheck=${this.spellcheck}
              pattern=${l$8(this.pattern)}
              enterkeyhint=${l$8(this.enterkeyhint)}
              inputmode=${l$8(this.inputmode)}
              aria-describedby="help-text"
              aria-invalid=${this.invalid ? "true" : "false"}
              @change=${this.handleChange}
              @input=${this.handleInput}
              @invalid=${this.handleInvalid}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @blur=${this.handleBlur}
            />

            ${hasClearIcon ? y$1`
                    <button
                      part="clear-button"
                      class="input__clear"
                      type="button"
                      aria-label=${this.localize.term("clearEntry")}
                      @click=${this.handleClearClick}
                      tabindex="-1"
                    >
                      <slot name="clear-icon">
                        <sl-icon name="x-circle-fill" library="system"></sl-icon>
                      </slot>
                    </button>
                  ` : ""}
            ${this.passwordToggle && !this.disabled ? y$1`
                    <button
                      part="password-toggle-button"
                      class="input__password-toggle"
                      type="button"
                      aria-label=${this.localize.term(this.passwordVisible ? "hidePassword" : "showPassword")}
                      @click=${this.handlePasswordToggle}
                      tabindex="-1"
                    >
                      ${this.passwordVisible ? y$1`
                            <slot name="show-password-icon">
                              <sl-icon name="eye-slash" library="system"></sl-icon>
                            </slot>
                          ` : y$1`
                            <slot name="hide-password-icon">
                              <sl-icon name="eye" library="system"></sl-icon>
                            </slot>
                          `}
                    </button>
                  ` : ""}

            <slot name="suffix" part="suffix" class="input__suffix"></slot>
          </div>
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          ${this.helpText}
        </slot>
        </div>
      </div>
    `;
  }
};
SlInput.styles = input_styles_default;
__decorateClass([
  i2$2(".input__control")
], SlInput.prototype, "input", 2);
__decorateClass([
  t$5()
], SlInput.prototype, "hasFocus", 2);
__decorateClass([
  t$5()
], SlInput.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "title", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlInput.prototype, "type", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "value", 2);
__decorateClass([
  defaultValue()
], SlInput.prototype, "defaultValue", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlInput.prototype, "size", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "filled", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "pill", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "label", 2);
__decorateClass([
  e2$1({ attribute: "help-text" })
], SlInput.prototype, "helpText", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlInput.prototype, "clearable", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "disabled", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "placeholder", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "readonly", 2);
__decorateClass([
  e2$1({ attribute: "password-toggle", type: Boolean })
], SlInput.prototype, "passwordToggle", 2);
__decorateClass([
  e2$1({ attribute: "password-visible", type: Boolean })
], SlInput.prototype, "passwordVisible", 2);
__decorateClass([
  e2$1({ attribute: "no-spin-buttons", type: Boolean })
], SlInput.prototype, "noSpinButtons", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlInput.prototype, "required", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "pattern", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "minlength", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "maxlength", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "min", 2);
__decorateClass([
  e2$1({ type: Number })
], SlInput.prototype, "max", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "step", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "autocapitalize", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "autocorrect", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "autocomplete", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlInput.prototype, "autofocus", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "enterkeyhint", 2);
__decorateClass([
  e2$1({
    type: Boolean,
    converter: {
      fromAttribute: (value) => !value || value === "false" ? false : true,
      toAttribute: (value) => value ? "true" : "false"
    }
  })
], SlInput.prototype, "spellcheck", 2);
__decorateClass([
  e2$1()
], SlInput.prototype, "inputmode", 2);
__decorateClass([
  watch$1("disabled", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch$1("step", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleStepChange", 1);
__decorateClass([
  watch$1("value", { waitUntilFirstUpdate: true })
], SlInput.prototype, "handleValueChange", 1);
SlInput = __decorateClass([
  e$9("sl-input")
], SlInput);

// src/components/dropdown/dropdown.styles.ts
var dropdown_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .dropdown::part(popup) {
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown[data-current-placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .dropdown[data-current-placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .dropdown[data-current-placement^='left']::part(popup) {
    transform-origin: right;
  }

  .dropdown[data-current-placement^='right']::part(popup) {
    transform-origin: left;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__panel {
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    box-shadow: var(--sl-shadow-large);
    border-radius: var(--sl-border-radius-medium);
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    display: block;
    pointer-events: all;
  }

  /* When users slot a menu, make sure it conforms to the popup's auto-size */
  ::slotted(sl-menu) {
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;
  }
`;

// src/internal/tabbable.ts
function isTabbable(el) {
  const tag = el.tagName.toLowerCase();
  if (el.getAttribute("tabindex") === "-1") {
    return false;
  }
  if (el.hasAttribute("disabled")) {
    return false;
  }
  if (el.hasAttribute("aria-disabled") && el.getAttribute("aria-disabled") !== "false") {
    return false;
  }
  if (tag === "input" && el.getAttribute("type") === "radio" && !el.hasAttribute("checked")) {
    return false;
  }
  if (el.offsetParent === null) {
    return false;
  }
  if (window.getComputedStyle(el).visibility === "hidden") {
    return false;
  }
  if ((tag === "audio" || tag === "video") && el.hasAttribute("controls")) {
    return true;
  }
  if (el.hasAttribute("tabindex")) {
    return true;
  }
  if (el.hasAttribute("contenteditable") && el.getAttribute("contenteditable") !== "false") {
    return true;
  }
  return ["button", "input", "select", "textarea", "a", "audio", "video", "summary"].includes(tag);
}
function getTabbableBoundary(root) {
  var _a, _b;
  const allElements = [];
  function walk(el) {
    if (el instanceof HTMLElement) {
      allElements.push(el);
      if (el.shadowRoot !== null && el.shadowRoot.mode === "open") {
        walk(el.shadowRoot);
      }
    }
    [...el.children].forEach((e) => walk(e));
  }
  walk(root);
  const start = (_a = allElements.find((el) => isTabbable(el))) != null ? _a : null;
  const end = (_b = allElements.reverse().find((el) => isTabbable(el))) != null ? _b : null;
  return { start, end };
}

// src/internal/offset.ts
function getOffset(element, parent) {
  return {
    top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
    left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
  };
}
function scrollIntoView(element, container, direction = "vertical", behavior = "smooth") {
  const offset = getOffset(element, container);
  const offsetTop = offset.top + container.scrollTop;
  const offsetLeft = offset.left + container.scrollLeft;
  const minX = container.scrollLeft;
  const maxX = container.scrollLeft + container.offsetWidth;
  const minY = container.scrollTop;
  const maxY = container.scrollTop + container.offsetHeight;
  if (direction === "horizontal" || direction === "both") {
    if (offsetLeft < minX) {
      container.scrollTo({ left: offsetLeft, behavior });
    } else if (offsetLeft + element.clientWidth > maxX) {
      container.scrollTo({ left: offsetLeft - container.offsetWidth + element.clientWidth, behavior });
    }
  }
  if (direction === "vertical" || direction === "both") {
    if (offsetTop < minY) {
      container.scrollTo({ top: offsetTop, behavior });
    } else if (offsetTop + element.clientHeight > maxY) {
      container.scrollTo({ top: offsetTop - container.offsetHeight + element.clientHeight, behavior });
    }
  }
}

// src/internal/event.ts
function waitForEvent(el, eventName) {
  return new Promise((resolve) => {
    function done(event) {
      if (event.target === el) {
        el.removeEventListener(eventName, done);
        resolve();
      }
    }
    el.addEventListener(eventName, done);
  });
}

// src/internal/animate.ts
function animateTo(el, keyframes, options) {
  return new Promise((resolve) => {
    if ((options == null ? void 0 : options.duration) === Infinity) {
      throw new Error("Promise-based animations must be finite.");
    }
    const animation = el.animate(keyframes, __spreadProps(__spreadValues({}, options), {
      duration: prefersReducedMotion() ? 0 : options.duration
    }));
    animation.addEventListener("cancel", resolve, { once: true });
    animation.addEventListener("finish", resolve, { once: true });
  });
}
function parseDuration(delay) {
  delay = delay.toString().toLowerCase();
  if (delay.indexOf("ms") > -1) {
    return parseFloat(delay);
  }
  if (delay.indexOf("s") > -1) {
    return parseFloat(delay) * 1e3;
  }
  return parseFloat(delay);
}
function prefersReducedMotion() {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  return query.matches;
}
function stopAnimations(el) {
  return Promise.all(
    el.getAnimations().map((animation) => {
      return new Promise((resolve) => {
        const handleAnimationEvent = requestAnimationFrame(resolve);
        animation.addEventListener("cancel", () => handleAnimationEvent, { once: true });
        animation.addEventListener("finish", () => handleAnimationEvent, { once: true });
        animation.cancel();
      });
    })
  );
}

// src/utilities/animation-registry.ts
var defaultAnimationRegistry = /* @__PURE__ */ new Map();
var customAnimationRegistry = /* @__PURE__ */ new WeakMap();
function ensureAnimation(animation) {
  return animation != null ? animation : { keyframes: [], options: { duration: 0 } };
}
function getLogicalAnimation(animation, dir) {
  if (dir.toLowerCase() === "rtl") {
    return {
      keyframes: animation.rtlKeyframes || animation.keyframes,
      options: animation.options
    };
  }
  return animation;
}
function setDefaultAnimation(animationName, animation) {
  defaultAnimationRegistry.set(animationName, ensureAnimation(animation));
}
function getAnimation(el, animationName, options) {
  const customAnimation = customAnimationRegistry.get(el);
  if (customAnimation == null ? void 0 : customAnimation[animationName]) {
    return getLogicalAnimation(customAnimation[animationName], options.dir);
  }
  const defaultAnimation = defaultAnimationRegistry.get(animationName);
  if (defaultAnimation) {
    return getLogicalAnimation(defaultAnimation, options.dir);
  }
  return {
    keyframes: [],
    options: { duration: 0 }
  };
}

// src/components/dropdown/dropdown.ts
var SlDropdown = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.open = false;
    this.placement = "bottom-start";
    this.disabled = false;
    this.stayOpenOnSelect = false;
    this.distance = 0;
    this.skidding = 0;
    this.hoist = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleMenuItemActivate = this.handleMenuItemActivate.bind(this);
    this.handlePanelSelect = this.handlePanelSelect.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);
    if (!this.containingElement) {
      this.containingElement = this;
    }
  }
  firstUpdated() {
    this.panel.hidden = !this.open;
    if (this.open) {
      this.addOpenListeners();
      this.popup.active = true;
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeOpenListeners();
    this.hide();
  }
  focusOnTrigger() {
    const trigger = this.trigger.assignedElements({ flatten: true })[0];
    if (typeof (trigger == null ? void 0 : trigger.focus) === "function") {
      trigger.focus();
    }
  }
  getMenu() {
    return this.panel.assignedElements({ flatten: true }).find((el) => el.tagName.toLowerCase() === "sl-menu");
  }
  handleKeyDown(event) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.hide();
      this.focusOnTrigger();
    }
  }
  handleDocumentKeyDown(event) {
    var _a;
    if (event.key === "Tab") {
      if (this.open && ((_a = document.activeElement) == null ? void 0 : _a.tagName.toLowerCase()) === "sl-menu-item") {
        event.preventDefault();
        this.hide();
        this.focusOnTrigger();
        return;
      }
      setTimeout(() => {
        var _a2, _b, _c;
        const activeElement = ((_a2 = this.containingElement) == null ? void 0 : _a2.getRootNode()) instanceof ShadowRoot ? (_c = (_b = document.activeElement) == null ? void 0 : _b.shadowRoot) == null ? void 0 : _c.activeElement : document.activeElement;
        if (!this.containingElement || (activeElement == null ? void 0 : activeElement.closest(this.containingElement.tagName.toLowerCase())) !== this.containingElement) {
          this.hide();
        }
      });
    }
  }
  handleDocumentMouseDown(event) {
    const path = event.composedPath();
    if (this.containingElement && !path.includes(this.containingElement)) {
      this.hide();
    }
  }
  handleMenuItemActivate(event) {
    const item = event.target;
    scrollIntoView(item, this.panel);
  }
  handlePanelSelect(event) {
    const target = event.target;
    if (!this.stayOpenOnSelect && target.tagName.toLowerCase() === "sl-menu") {
      this.hide();
      this.focusOnTrigger();
    }
  }
  handleTriggerClick() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }
  handleTriggerKeyDown(event) {
    if (event.key === "Escape" && this.open) {
      event.stopPropagation();
      this.focusOnTrigger();
      this.hide();
      return;
    }
    if ([" ", "Enter"].includes(event.key)) {
      event.preventDefault();
      this.handleTriggerClick();
      return;
    }
    const menu = this.getMenu();
    if (menu) {
      const menuItems = menu.defaultSlot.assignedElements({ flatten: true });
      const firstMenuItem = menuItems[0];
      const lastMenuItem = menuItems[menuItems.length - 1];
      if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        if (!this.open) {
          this.show();
        }
        if (menuItems.length > 0) {
          requestAnimationFrame(() => {
            if (event.key === "ArrowDown" || event.key === "Home") {
              menu.setCurrentItem(firstMenuItem);
              firstMenuItem.focus();
            }
            if (event.key === "ArrowUp" || event.key === "End") {
              menu.setCurrentItem(lastMenuItem);
              lastMenuItem.focus();
            }
          });
        }
      }
    }
  }
  handleTriggerKeyUp(event) {
    if (event.key === " ") {
      event.preventDefault();
    }
  }
  handleTriggerSlotChange() {
    this.updateAccessibleTrigger();
  }
  updateAccessibleTrigger() {
    const assignedElements = this.trigger.assignedElements({ flatten: true });
    const accessibleTrigger = assignedElements.find((el) => getTabbableBoundary(el).start);
    let target;
    if (accessibleTrigger) {
      switch (accessibleTrigger.tagName.toLowerCase()) {
        case "sl-button":
        case "sl-icon-button":
          target = accessibleTrigger.button;
          break;
        default:
          target = accessibleTrigger;
      }
      target.setAttribute("aria-haspopup", "true");
      target.setAttribute("aria-expanded", this.open ? "true" : "false");
    }
  }
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  reposition() {
    this.popup.reposition();
  }
  addOpenListeners() {
    this.panel.addEventListener("sl-activate", this.handleMenuItemActivate);
    this.panel.addEventListener("sl-select", this.handlePanelSelect);
    this.panel.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keydown", this.handleDocumentKeyDown);
    document.addEventListener("mousedown", this.handleDocumentMouseDown);
  }
  removeOpenListeners() {
    if (this.panel) {
      this.panel.removeEventListener("sl-activate", this.handleMenuItemActivate);
      this.panel.removeEventListener("sl-select", this.handlePanelSelect);
      this.panel.removeEventListener("keydown", this.handleKeyDown);
    }
    document.removeEventListener("keydown", this.handleDocumentKeyDown);
    document.removeEventListener("mousedown", this.handleDocumentMouseDown);
  }
  async handleOpenChange() {
    if (this.disabled) {
      this.open = false;
      return;
    }
    this.updateAccessibleTrigger();
    if (this.open) {
      this.emit("sl-show");
      this.addOpenListeners();
      await stopAnimations(this);
      this.panel.hidden = false;
      this.popup.active = true;
      const { keyframes, options } = getAnimation(this, "dropdown.show", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      this.removeOpenListeners();
      await stopAnimations(this);
      const { keyframes, options } = getAnimation(this, "dropdown.hide", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.panel.hidden = true;
      this.popup.active = false;
      this.emit("sl-after-hide");
    }
  }
  render() {
    return y$1`
      <sl-popup
        part="base"
        id="dropdown"
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? "fixed" : "absolute"}
        flip
        shift
        auto-size="vertical"
        auto-size-padding="10"
        class=${o$9({
      dropdown: true,
      "dropdown--open": this.open
    })}
      >
        <slot
          name="trigger"
          slot="anchor"
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
          @slotchange=${this.handleTriggerSlotChange}
        ></slot>

        <slot
          part="panel"
          class="dropdown__panel"
          aria-hidden=${this.open ? "false" : "true"}
          aria-labelledby="dropdown"
        ></slot>
      </sl-popup>
    `;
  }
};
SlDropdown.styles = dropdown_styles_default;
__decorateClass([
  i2$2(".dropdown")
], SlDropdown.prototype, "popup", 2);
__decorateClass([
  i2$2(".dropdown__trigger")
], SlDropdown.prototype, "trigger", 2);
__decorateClass([
  i2$2(".dropdown__panel")
], SlDropdown.prototype, "panel", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlDropdown.prototype, "open", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlDropdown.prototype, "placement", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlDropdown.prototype, "disabled", 2);
__decorateClass([
  e2$1({ attribute: "stay-open-on-select", type: Boolean, reflect: true })
], SlDropdown.prototype, "stayOpenOnSelect", 2);
__decorateClass([
  e2$1({ attribute: false })
], SlDropdown.prototype, "containingElement", 2);
__decorateClass([
  e2$1({ type: Number })
], SlDropdown.prototype, "distance", 2);
__decorateClass([
  e2$1({ type: Number })
], SlDropdown.prototype, "skidding", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlDropdown.prototype, "hoist", 2);
__decorateClass([
  watch$1("open", { waitUntilFirstUpdate: true })
], SlDropdown.prototype, "handleOpenChange", 1);
SlDropdown = __decorateClass([
  e$9("sl-dropdown")
], SlDropdown);
setDefaultAnimation("dropdown.show", {
  keyframes: [
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 100, easing: "ease" }
});
setDefaultAnimation("dropdown.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.9 }
  ],
  options: { duration: 100, easing: "ease" }
});

// src/components/popup/popup.styles.ts
var popup_styles_default = i$8`
  ${component_styles_default}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }
`;

// node_modules/@floating-ui/core/dist/floating-ui.core.browser.min.mjs
function t$4(t2) {
  return t2.split("-")[0];
}
function e3(t2) {
  return t2.split("-")[1];
}
function n$8(e4) {
  return ["top", "bottom"].includes(t$4(e4)) ? "x" : "y";
}
function r$4(t2) {
  return "y" === t2 ? "height" : "width";
}
function i2(i4, o4, a3) {
  let { reference: l3, floating: s3 } = i4;
  const c3 = l3.x + l3.width / 2 - s3.width / 2, f3 = l3.y + l3.height / 2 - s3.height / 2, u3 = n$8(o4), m3 = r$4(u3), g3 = l3[m3] / 2 - s3[m3] / 2, d3 = "x" === u3;
  let p3;
  switch (t$4(o4)) {
    case "top":
      p3 = { x: c3, y: l3.y - s3.height };
      break;
    case "bottom":
      p3 = { x: c3, y: l3.y + l3.height };
      break;
    case "right":
      p3 = { x: l3.x + l3.width, y: f3 };
      break;
    case "left":
      p3 = { x: l3.x - s3.width, y: f3 };
      break;
    default:
      p3 = { x: l3.x, y: l3.y };
  }
  switch (e3(o4)) {
    case "start":
      p3[u3] -= g3 * (a3 && d3 ? -1 : 1);
      break;
    case "end":
      p3[u3] += g3 * (a3 && d3 ? -1 : 1);
  }
  return p3;
}
var o2 = async (t2, e4, n3) => {
  const { placement: r3 = "bottom", strategy: o4 = "absolute", middleware: a3 = [], platform: l3 } = n3, s3 = a3.filter(Boolean), c3 = await (null == l3.isRTL ? void 0 : l3.isRTL(e4));
  let f3 = await l3.getElementRects({ reference: t2, floating: e4, strategy: o4 }), { x: u3, y: m3 } = i2(f3, r3, c3), g3 = r3, d3 = {}, p3 = 0;
  for (let n4 = 0; n4 < s3.length; n4++) {
    const { name: a4, fn: h3 } = s3[n4], { x: y4, y: x3, data: w3, reset: v3 } = await h3({ x: u3, y: m3, initialPlacement: r3, placement: g3, strategy: o4, middlewareData: d3, rects: f3, platform: l3, elements: { reference: t2, floating: e4 } });
    u3 = null != y4 ? y4 : u3, m3 = null != x3 ? x3 : m3, d3 = __spreadProps(__spreadValues({}, d3), { [a4]: __spreadValues(__spreadValues({}, d3[a4]), w3) }), v3 && p3 <= 50 && (p3++, "object" == typeof v3 && (v3.placement && (g3 = v3.placement), v3.rects && (f3 = true === v3.rects ? await l3.getElementRects({ reference: t2, floating: e4, strategy: o4 }) : v3.rects), { x: u3, y: m3 } = i2(f3, g3, c3)), n4 = -1);
  }
  return { x: u3, y: m3, placement: g3, strategy: o4, middlewareData: d3 };
};
function a$3(t2) {
  return "number" != typeof t2 ? function(t3) {
    return __spreadValues({ top: 0, right: 0, bottom: 0, left: 0 }, t3);
  }(t2) : { top: t2, right: t2, bottom: t2, left: t2 };
}
function l$7(t2) {
  return __spreadProps(__spreadValues({}, t2), { top: t2.y, left: t2.x, right: t2.x + t2.width, bottom: t2.y + t2.height });
}
async function s$7(t2, e4) {
  var n3;
  void 0 === e4 && (e4 = {});
  const { x: r3, y: i4, platform: o4, rects: s3, elements: c3, strategy: f3 } = t2, { boundary: u3 = "clippingAncestors", rootBoundary: m3 = "viewport", elementContext: g3 = "floating", altBoundary: d3 = false, padding: p3 = 0 } = e4, h3 = a$3(p3), y4 = c3[d3 ? "floating" === g3 ? "reference" : "floating" : g3], x3 = l$7(await o4.getClippingRect({ element: null == (n3 = await (null == o4.isElement ? void 0 : o4.isElement(y4))) || n3 ? y4 : y4.contextElement || await (null == o4.getDocumentElement ? void 0 : o4.getDocumentElement(c3.floating)), boundary: u3, rootBoundary: m3, strategy: f3 })), w3 = l$7(o4.convertOffsetParentRelativeRectToViewportRelativeRect ? await o4.convertOffsetParentRelativeRectToViewportRelativeRect({ rect: "floating" === g3 ? __spreadProps(__spreadValues({}, s3.floating), { x: r3, y: i4 }) : s3.reference, offsetParent: await (null == o4.getOffsetParent ? void 0 : o4.getOffsetParent(c3.floating)), strategy: f3 }) : s3[g3]);
  return { top: x3.top - w3.top + h3.top, bottom: w3.bottom - x3.bottom + h3.bottom, left: x3.left - w3.left + h3.left, right: w3.right - x3.right + h3.right };
}
var c$3 = Math.min;
var f$2 = Math.max;
function u$1(t2, e4, n3) {
  return f$2(t2, c$3(e4, n3));
}
var m$1 = (t2) => ({ name: "arrow", options: t2, async fn(i4) {
  const { element: o4, padding: l3 = 0 } = null != t2 ? t2 : {}, { x: s3, y: c3, placement: f3, rects: m3, platform: g3 } = i4;
  if (null == o4)
    return {};
  const d3 = a$3(l3), p3 = { x: s3, y: c3 }, h3 = n$8(f3), y4 = e3(f3), x3 = r$4(h3), w3 = await g3.getDimensions(o4), v3 = "y" === h3 ? "top" : "left", b3 = "y" === h3 ? "bottom" : "right", R2 = m3.reference[x3] + m3.reference[h3] - p3[h3] - m3.floating[x3], A2 = p3[h3] - m3.reference[h3], P2 = await (null == g3.getOffsetParent ? void 0 : g3.getOffsetParent(o4));
  let T3 = P2 ? "y" === h3 ? P2.clientHeight || 0 : P2.clientWidth || 0 : 0;
  0 === T3 && (T3 = m3.floating[x3]);
  const O3 = R2 / 2 - A2 / 2, L3 = d3[v3], D3 = T3 - w3[x3] - d3[b3], k2 = T3 / 2 - w3[x3] / 2 + O3, E3 = u$1(L3, k2, D3), B = ("start" === y4 ? d3[v3] : d3[b3]) > 0 && k2 !== E3 && m3.reference[x3] <= m3.floating[x3];
  return { [h3]: p3[h3] - (B ? k2 < L3 ? L3 - k2 : D3 - k2 : 0), data: { [h3]: E3, centerOffset: k2 - E3 } };
} });
var g$1 = { left: "right", right: "left", bottom: "top", top: "bottom" };
function d$2(t2) {
  return t2.replace(/left|right|bottom|top/g, (t3) => g$1[t3]);
}
function p$1(t2, i4, o4) {
  void 0 === o4 && (o4 = false);
  const a3 = e3(t2), l3 = n$8(t2), s3 = r$4(l3);
  let c3 = "x" === l3 ? a3 === (o4 ? "end" : "start") ? "right" : "left" : "start" === a3 ? "bottom" : "top";
  return i4.reference[s3] > i4.floating[s3] && (c3 = d$2(c3)), { main: c3, cross: d$2(c3) };
}
var h$4 = { start: "end", end: "start" };
function y2(t2) {
  return t2.replace(/start|end/g, (t3) => h$4[t3]);
}
var x$1 = ["top", "right", "bottom", "left"];
x$1.reduce((t2, e4) => t2.concat(e4, e4 + "-start", e4 + "-end"), []);
var b$1 = function(e4) {
  return void 0 === e4 && (e4 = {}), { name: "flip", options: e4, async fn(n3) {
    var r3;
    const { placement: i4, middlewareData: o4, rects: a3, initialPlacement: l3, platform: c3, elements: f3 } = n3, _a = e4, { mainAxis: u3 = true, crossAxis: m3 = true, fallbackPlacements: g3, fallbackStrategy: h3 = "bestFit", flipAlignment: x3 = true } = _a, w3 = __objRest(_a, ["mainAxis", "crossAxis", "fallbackPlacements", "fallbackStrategy", "flipAlignment"]), v3 = t$4(i4), b3 = g3 || (v3 === l3 || !x3 ? [d$2(l3)] : function(t2) {
      const e5 = d$2(t2);
      return [y2(t2), e5, y2(e5)];
    }(l3)), R2 = [l3, ...b3], A2 = await s$7(n3, w3), P2 = [];
    let T3 = (null == (r3 = o4.flip) ? void 0 : r3.overflows) || [];
    if (u3 && P2.push(A2[v3]), m3) {
      const { main: t2, cross: e5 } = p$1(i4, a3, await (null == c3.isRTL ? void 0 : c3.isRTL(f3.floating)));
      P2.push(A2[t2], A2[e5]);
    }
    if (T3 = [...T3, { placement: i4, overflows: P2 }], !P2.every((t2) => t2 <= 0)) {
      var O3, L3;
      const t2 = (null != (O3 = null == (L3 = o4.flip) ? void 0 : L3.index) ? O3 : 0) + 1, e5 = R2[t2];
      if (e5)
        return { data: { index: t2, overflows: T3 }, reset: { placement: e5 } };
      let n4 = "bottom";
      switch (h3) {
        case "bestFit": {
          var D3;
          const t3 = null == (D3 = T3.map((t4) => [t4, t4.overflows.filter((t5) => t5 > 0).reduce((t5, e6) => t5 + e6, 0)]).sort((t4, e6) => t4[1] - e6[1])[0]) ? void 0 : D3[0].placement;
          t3 && (n4 = t3);
          break;
        }
        case "initialPlacement":
          n4 = l3;
      }
      if (i4 !== n4)
        return { reset: { placement: n4 } };
    }
    return {};
  } };
};
var T$1 = function(r3) {
  return void 0 === r3 && (r3 = 0), { name: "offset", options: r3, async fn(i4) {
    const { x: o4, y: a3 } = i4, l3 = await async function(r4, i5) {
      const { placement: o5, platform: a4, elements: l4 } = r4, s3 = await (null == a4.isRTL ? void 0 : a4.isRTL(l4.floating)), c3 = t$4(o5), f3 = e3(o5), u3 = "x" === n$8(o5), m3 = ["left", "top"].includes(c3) ? -1 : 1, g3 = s3 && u3 ? -1 : 1, d3 = "function" == typeof i5 ? i5(r4) : i5;
      let { mainAxis: p3, crossAxis: h3, alignmentAxis: y4 } = "number" == typeof d3 ? { mainAxis: d3, crossAxis: 0, alignmentAxis: null } : __spreadValues({ mainAxis: 0, crossAxis: 0, alignmentAxis: null }, d3);
      return f3 && "number" == typeof y4 && (h3 = "end" === f3 ? -1 * y4 : y4), u3 ? { x: h3 * g3, y: p3 * m3 } : { x: p3 * m3, y: h3 * g3 };
    }(i4, r3);
    return { x: o4 + l3.x, y: a3 + l3.y, data: l3 };
  } };
};
function O(t2) {
  return "x" === t2 ? "y" : "x";
}
var L = function(e4) {
  return void 0 === e4 && (e4 = {}), { name: "shift", options: e4, async fn(r3) {
    const { x: i4, y: o4, placement: a3 } = r3, _a = e4, { mainAxis: l3 = true, crossAxis: c3 = false, limiter: f3 = { fn: (t2) => {
      let { x: e5, y: n3 } = t2;
      return { x: e5, y: n3 };
    } } } = _a, m3 = __objRest(_a, ["mainAxis", "crossAxis", "limiter"]), g3 = { x: i4, y: o4 }, d3 = await s$7(r3, m3), p3 = n$8(t$4(a3)), h3 = O(p3);
    let y4 = g3[p3], x3 = g3[h3];
    if (l3) {
      const t2 = "y" === p3 ? "bottom" : "right";
      y4 = u$1(y4 + d3["y" === p3 ? "top" : "left"], y4, y4 - d3[t2]);
    }
    if (c3) {
      const t2 = "y" === h3 ? "bottom" : "right";
      x3 = u$1(x3 + d3["y" === h3 ? "top" : "left"], x3, x3 - d3[t2]);
    }
    const w3 = f3.fn(__spreadProps(__spreadValues({}, r3), { [p3]: y4, [h3]: x3 }));
    return __spreadProps(__spreadValues({}, w3), { data: { x: w3.x - i4, y: w3.y - o4 } });
  } };
};
var k$1 = function(n3) {
  return void 0 === n3 && (n3 = {}), { name: "size", options: n3, async fn(r3) {
    const { placement: i4, rects: o4, platform: a3, elements: l3 } = r3, _a = n3, { apply: c3 = () => {
    } } = _a, u3 = __objRest(_a, ["apply"]), m3 = await s$7(r3, u3), g3 = t$4(i4), d3 = e3(i4);
    let p3, h3;
    "top" === g3 || "bottom" === g3 ? (p3 = g3, h3 = d3 === (await (null == a3.isRTL ? void 0 : a3.isRTL(l3.floating)) ? "start" : "end") ? "left" : "right") : (h3 = g3, p3 = "end" === d3 ? "top" : "bottom");
    const y4 = f$2(m3.left, 0), x3 = f$2(m3.right, 0), w3 = f$2(m3.top, 0), v3 = f$2(m3.bottom, 0), b3 = { availableHeight: o4.floating.height - (["left", "right"].includes(i4) ? 2 * (0 !== w3 || 0 !== v3 ? w3 + v3 : f$2(m3.top, m3.bottom)) : m3[p3]), availableWidth: o4.floating.width - (["top", "bottom"].includes(i4) ? 2 * (0 !== y4 || 0 !== x3 ? y4 + x3 : f$2(m3.left, m3.right)) : m3[h3]) };
    await c3(__spreadValues(__spreadValues({}, r3), b3));
    const R2 = await a3.getDimensions(l3.floating);
    return o4.floating.width !== R2.width || o4.floating.height !== R2.height ? { reset: { rects: true } } : {};
  } };
};

// node_modules/@floating-ui/dom/dist/floating-ui.dom.browser.min.mjs
function n2(t2) {
  return t2 && t2.document && t2.location && t2.alert && t2.setInterval;
}
function o3(t2) {
  if (null == t2)
    return window;
  if (!n2(t2)) {
    const e4 = t2.ownerDocument;
    return e4 && e4.defaultView || window;
  }
  return t2;
}
function i3(t2) {
  return o3(t2).getComputedStyle(t2);
}
function r2(t2) {
  return n2(t2) ? "" : t2 ? (t2.nodeName || "").toLowerCase() : "";
}
function l2() {
  const t2 = navigator.userAgentData;
  return t2 && Array.isArray(t2.brands) ? t2.brands.map((t3) => t3.brand + "/" + t3.version).join(" ") : navigator.userAgent;
}
function c2(t2) {
  return t2 instanceof o3(t2).HTMLElement;
}
function s2(t2) {
  return t2 instanceof o3(t2).Element;
}
function f2(t2) {
  if ("undefined" == typeof ShadowRoot)
    return false;
  return t2 instanceof o3(t2).ShadowRoot || t2 instanceof ShadowRoot;
}
function u2(t2) {
  const { overflow: e4, overflowX: n3, overflowY: o4, display: r3 } = i3(t2);
  return /auto|scroll|overlay|hidden/.test(e4 + o4 + n3) && !["inline", "contents"].includes(r3);
}
function a2(t2) {
  return ["table", "td", "th"].includes(r2(t2));
}
function d2(t2) {
  const e4 = /firefox/i.test(l2()), n3 = i3(t2), o4 = n3.backdropFilter || n3.WebkitBackdropFilter;
  return "none" !== n3.transform || "none" !== n3.perspective || !!o4 && "none" !== o4 || e4 && "filter" === n3.willChange || e4 && !!n3.filter && "none" !== n3.filter || ["transform", "perspective"].some((t3) => n3.willChange.includes(t3)) || ["paint", "layout", "strict", "content"].some((t3) => {
    const e5 = n3.contain;
    return null != e5 && e5.includes(t3);
  });
}
function h2() {
  return !/^((?!chrome|android).)*safari/i.test(l2());
}
function g2(t2) {
  return ["html", "body", "#document"].includes(r2(t2));
}
var m2 = Math.min;
var p2 = Math.max;
var w2 = Math.round;
function v2(t2, e4, n3) {
  var i4, r3, l3, f3;
  void 0 === e4 && (e4 = false), void 0 === n3 && (n3 = false);
  const u3 = t2.getBoundingClientRect();
  let a3 = 1, d3 = 1;
  e4 && c2(t2) && (a3 = t2.offsetWidth > 0 && w2(u3.width) / t2.offsetWidth || 1, d3 = t2.offsetHeight > 0 && w2(u3.height) / t2.offsetHeight || 1);
  const g3 = s2(t2) ? o3(t2) : window, m3 = !h2() && n3, p3 = (u3.left + (m3 && null != (i4 = null == (r3 = g3.visualViewport) ? void 0 : r3.offsetLeft) ? i4 : 0)) / a3, v3 = (u3.top + (m3 && null != (l3 = null == (f3 = g3.visualViewport) ? void 0 : f3.offsetTop) ? l3 : 0)) / d3, y4 = u3.width / a3, x3 = u3.height / d3;
  return { width: y4, height: x3, top: v3, right: p3 + y4, bottom: v3 + x3, left: p3, x: p3, y: v3 };
}
function y3(t2) {
  return (e4 = t2, (e4 instanceof o3(e4).Node ? t2.ownerDocument : t2.document) || window.document).documentElement;
  var e4;
}
function x2(t2) {
  return s2(t2) ? { scrollLeft: t2.scrollLeft, scrollTop: t2.scrollTop } : { scrollLeft: t2.pageXOffset, scrollTop: t2.pageYOffset };
}
function b2(t2) {
  return v2(y3(t2)).left + x2(t2).scrollLeft;
}
function L2(t2, e4, n3) {
  const o4 = c2(e4), i4 = y3(e4), l3 = v2(t2, o4 && function(t3) {
    const e5 = v2(t3);
    return w2(e5.width) !== t3.offsetWidth || w2(e5.height) !== t3.offsetHeight;
  }(e4), "fixed" === n3);
  let s3 = { scrollLeft: 0, scrollTop: 0 };
  const f3 = { x: 0, y: 0 };
  if (o4 || !o4 && "fixed" !== n3)
    if (("body" !== r2(e4) || u2(i4)) && (s3 = x2(e4)), c2(e4)) {
      const t3 = v2(e4, true);
      f3.x = t3.x + e4.clientLeft, f3.y = t3.y + e4.clientTop;
    } else
      i4 && (f3.x = b2(i4));
  return { x: l3.left + s3.scrollLeft - f3.x, y: l3.top + s3.scrollTop - f3.y, width: l3.width, height: l3.height };
}
function E2(t2) {
  if ("html" === r2(t2))
    return t2;
  const e4 = t2.assignedSlot || t2.parentNode || (f2(t2) ? t2.host : null) || y3(t2);
  return f2(e4) ? e4.host : e4;
}
function R$1(t2) {
  return c2(t2) && "fixed" !== i3(t2).position ? t2.offsetParent : null;
}
function T2(t2) {
  const e4 = o3(t2);
  let n3 = R$1(t2);
  for (; n3 && a2(n3) && "static" === i3(n3).position; )
    n3 = R$1(n3);
  return n3 && ("html" === r2(n3) || "body" === r2(n3) && "static" === i3(n3).position && !d2(n3)) ? e4 : n3 || function(t3) {
    let e5 = E2(t3);
    for (; c2(e5) && !g2(e5); ) {
      if (d2(e5))
        return e5;
      e5 = E2(e5);
    }
    return null;
  }(t2) || e4;
}
function W(t2) {
  const e4 = E2(t2);
  return g2(e4) ? t2.ownerDocument.body : c2(e4) && u2(e4) ? e4 : W(e4);
}
function H$1(t2, e4) {
  var n3;
  void 0 === e4 && (e4 = []);
  const i4 = W(t2), r3 = i4 === (null == (n3 = t2.ownerDocument) ? void 0 : n3.body), l3 = o3(i4), c3 = r3 ? [l3].concat(l3.visualViewport || [], u2(i4) ? i4 : []) : i4, s3 = e4.concat(c3);
  return r3 ? s3 : s3.concat(H$1(c3));
}
function D2(e4, n3, r3) {
  return "viewport" === n3 ? l$7(function(t2, e5) {
    const n4 = o3(t2), i4 = y3(t2), r4 = n4.visualViewport;
    let l3 = i4.clientWidth, c3 = i4.clientHeight, s3 = 0, f3 = 0;
    if (r4) {
      l3 = r4.width, c3 = r4.height;
      const t3 = h2();
      (t3 || !t3 && "fixed" === e5) && (s3 = r4.offsetLeft, f3 = r4.offsetTop);
    }
    return { width: l3, height: c3, x: s3, y: f3 };
  }(e4, r3)) : s2(n3) ? function(t2, e5) {
    const n4 = v2(t2, false, "fixed" === e5), o4 = n4.top + t2.clientTop, i4 = n4.left + t2.clientLeft;
    return { top: o4, left: i4, x: i4, y: o4, right: i4 + t2.clientWidth, bottom: o4 + t2.clientHeight, width: t2.clientWidth, height: t2.clientHeight };
  }(n3, r3) : l$7(function(t2) {
    var e5;
    const n4 = y3(t2), o4 = x2(t2), r4 = null == (e5 = t2.ownerDocument) ? void 0 : e5.body, l3 = p2(n4.scrollWidth, n4.clientWidth, r4 ? r4.scrollWidth : 0, r4 ? r4.clientWidth : 0), c3 = p2(n4.scrollHeight, n4.clientHeight, r4 ? r4.scrollHeight : 0, r4 ? r4.clientHeight : 0);
    let s3 = -o4.scrollLeft + b2(t2);
    const f3 = -o4.scrollTop;
    return "rtl" === i3(r4 || n4).direction && (s3 += p2(n4.clientWidth, r4 ? r4.clientWidth : 0) - l3), { width: l3, height: c3, x: s3, y: f3 };
  }(y3(e4)));
}
var A$1 = { getClippingRect: function(t2) {
  let { element: e4, boundary: n3, rootBoundary: o4, strategy: l3 } = t2;
  const c3 = "clippingAncestors" === n3 ? function(t3) {
    let e5 = H$1(t3).filter((t4) => s2(t4) && "body" !== r2(t4)), n4 = null;
    const o5 = "fixed" === i3(t3).position;
    let l4 = o5 ? E2(t3) : t3;
    for (; s2(l4) && !g2(l4); ) {
      const t4 = i3(l4), r3 = d2(l4);
      (o5 ? r3 || n4 : r3 || "static" !== t4.position || !n4 || !["absolute", "fixed"].includes(n4.position)) ? n4 = t4 : e5 = e5.filter((t5) => t5 !== l4), l4 = E2(l4);
    }
    return e5;
  }(e4) : [].concat(n3), f3 = [...c3, o4], u3 = f3[0], a3 = f3.reduce((t3, n4) => {
    const o5 = D2(e4, n4, l3);
    return t3.top = p2(o5.top, t3.top), t3.right = m2(o5.right, t3.right), t3.bottom = m2(o5.bottom, t3.bottom), t3.left = p2(o5.left, t3.left), t3;
  }, D2(e4, u3, l3));
  return { width: a3.right - a3.left, height: a3.bottom - a3.top, x: a3.left, y: a3.top };
}, convertOffsetParentRelativeRectToViewportRelativeRect: function(t2) {
  let { rect: e4, offsetParent: n3, strategy: o4 } = t2;
  const i4 = c2(n3), l3 = y3(n3);
  if (n3 === l3)
    return e4;
  let s3 = { scrollLeft: 0, scrollTop: 0 };
  const f3 = { x: 0, y: 0 };
  if ((i4 || !i4 && "fixed" !== o4) && (("body" !== r2(n3) || u2(l3)) && (s3 = x2(n3)), c2(n3))) {
    const t3 = v2(n3, true);
    f3.x = t3.x + n3.clientLeft, f3.y = t3.y + n3.clientTop;
  }
  return __spreadProps(__spreadValues({}, e4), { x: e4.x - s3.scrollLeft + f3.x, y: e4.y - s3.scrollTop + f3.y });
}, isElement: s2, getDimensions: function(t2) {
  if (c2(t2))
    return { width: t2.offsetWidth, height: t2.offsetHeight };
  const e4 = v2(t2);
  return { width: e4.width, height: e4.height };
}, getOffsetParent: T2, getDocumentElement: y3, async getElementRects(t2) {
  let { reference: e4, floating: n3, strategy: o4 } = t2;
  const i4 = this.getOffsetParent || T2, r3 = this.getDimensions;
  return { reference: L2(e4, await i4(n3), o4), floating: __spreadValues({ x: 0, y: 0 }, await r3(n3)) };
}, getClientRects: (t2) => Array.from(t2.getClientRects()), isRTL: (t2) => "rtl" === i3(t2).direction };
function C$1(t2, e4, n3, o4) {
  void 0 === o4 && (o4 = {});
  const { ancestorScroll: i4 = true, ancestorResize: r3 = true, elementResize: l3 = true, animationFrame: c3 = false } = o4, f3 = i4 && !c3, u3 = f3 || r3 ? [...s2(t2) ? H$1(t2) : t2.contextElement ? H$1(t2.contextElement) : [], ...H$1(e4)] : [];
  u3.forEach((t3) => {
    f3 && t3.addEventListener("scroll", n3, { passive: true }), r3 && t3.addEventListener("resize", n3);
  });
  let a3, d3 = null;
  if (l3) {
    let o5 = true;
    d3 = new ResizeObserver(() => {
      o5 || n3(), o5 = false;
    }), s2(t2) && !c3 && d3.observe(t2), s2(t2) || !t2.contextElement || c3 || d3.observe(t2.contextElement), d3.observe(e4);
  }
  let h3 = c3 ? v2(t2) : null;
  return c3 && function e5() {
    const o5 = v2(t2);
    !h3 || o5.x === h3.x && o5.y === h3.y && o5.width === h3.width && o5.height === h3.height || n3();
    h3 = o5, a3 = requestAnimationFrame(e5);
  }(), n3(), () => {
    var t3;
    u3.forEach((t4) => {
      f3 && t4.removeEventListener("scroll", n3), r3 && t4.removeEventListener("resize", n3);
    }), null == (t3 = d3) || t3.disconnect(), d3 = null, c3 && cancelAnimationFrame(a3);
  };
}
var O2 = (t2, n3, o4) => o2(t2, n3, __spreadValues({ platform: A$1 }, o4));

// src/components/popup/popup.ts
var SlPopup = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.active = false;
    this.placement = "top";
    this.strategy = "absolute";
    this.distance = 0;
    this.skidding = 0;
    this.arrow = false;
    this.arrowPlacement = "anchor";
    this.arrowPadding = 10;
    this.flip = false;
    this.flipFallbackPlacements = "";
    this.flipFallbackStrategy = "best-fit";
    this.flipPadding = 0;
    this.shift = false;
    this.shiftPadding = 0;
    this.autoSizePadding = 0;
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.updateComplete;
    this.start();
  }
  disconnectedCallback() {
    this.stop();
  }
  async updated(changedProps) {
    super.updated(changedProps);
    if (changedProps.has("active")) {
      if (this.active) {
        this.start();
      } else {
        this.stop();
      }
    }
    if (changedProps.has("anchor")) {
      this.handleAnchorChange();
    }
    if (this.active) {
      await this.updateComplete;
      this.reposition();
    }
  }
  async handleAnchorChange() {
    await this.stop();
    if (this.anchor && typeof this.anchor === "string") {
      const root = this.getRootNode();
      this.anchorEl = root.getElementById(this.anchor);
    } else if (this.anchor instanceof HTMLElement) {
      this.anchorEl = this.anchor;
    } else {
      this.anchorEl = this.querySelector('[slot="anchor"]');
    }
    if (this.anchorEl instanceof HTMLSlotElement) {
      this.anchorEl = this.anchorEl.assignedElements({ flatten: true })[0];
    }
    if (!this.anchorEl) {
      throw new Error(
        "Invalid anchor element: no anchor could be found using the anchor slot or the anchor attribute."
      );
    }
    this.start();
  }
  start() {
    if (!this.anchorEl) {
      return;
    }
    this.cleanup = C$1(this.anchorEl, this.popup, () => {
      this.reposition();
    });
  }
  async stop() {
    return new Promise((resolve) => {
      if (this.cleanup) {
        this.cleanup();
        this.cleanup = void 0;
        this.removeAttribute("data-current-placement");
        this.style.removeProperty("--auto-size-available-width");
        this.style.removeProperty("--auto-size-available-height");
        requestAnimationFrame(() => resolve());
      } else {
        resolve();
      }
    });
  }
  reposition() {
    if (!this.active || !this.anchorEl) {
      return;
    }
    const middleware = [
      T$1({ mainAxis: this.distance, crossAxis: this.skidding })
    ];
    if (this.sync) {
      middleware.push(
        k$1({
          apply: ({ rects }) => {
            const syncWidth = this.sync === "width" || this.sync === "both";
            const syncHeight = this.sync === "height" || this.sync === "both";
            this.popup.style.width = syncWidth ? `${rects.reference.width}px` : "";
            this.popup.style.height = syncHeight ? `${rects.reference.height}px` : "";
          }
        })
      );
    } else {
      this.popup.style.width = "";
      this.popup.style.height = "";
    }
    if (this.flip) {
      middleware.push(
        b$1({
          boundary: this.flipBoundary,
          fallbackPlacements: this.flipFallbackPlacements,
          fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
          padding: this.flipPadding
        })
      );
    }
    if (this.shift) {
      middleware.push(
        L({
          boundary: this.shiftBoundary,
          padding: this.shiftPadding
        })
      );
    }
    if (this.autoSize) {
      middleware.push(
        k$1({
          boundary: this.autoSizeBoundary,
          padding: this.autoSizePadding,
          apply: ({ availableWidth, availableHeight }) => {
            if (this.autoSize === "vertical" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-height", `${availableHeight}px`);
            } else {
              this.style.removeProperty("--auto-size-available-height");
            }
            if (this.autoSize === "horizontal" || this.autoSize === "both") {
              this.style.setProperty("--auto-size-available-width", `${availableWidth}px`);
            } else {
              this.style.removeProperty("--auto-size-available-width");
            }
          }
        })
      );
    } else {
      this.style.removeProperty("--auto-size-available-width");
      this.style.removeProperty("--auto-size-available-height");
    }
    if (this.arrow) {
      middleware.push(
        m$1({
          element: this.arrowEl,
          padding: this.arrowPadding
        })
      );
    }
    O2(this.anchorEl, this.popup, {
      placement: this.placement,
      middleware,
      strategy: this.strategy
    }).then(({ x: x3, y: y4, middlewareData, placement }) => {
      const isRtl = getComputedStyle(this).direction === "rtl";
      const staticSide = { top: "bottom", right: "left", bottom: "top", left: "right" }[placement.split("-")[0]];
      this.setAttribute("data-current-placement", placement);
      Object.assign(this.popup.style, {
        left: `${x3}px`,
        top: `${y4}px`
      });
      if (this.arrow) {
        const arrowX = middlewareData.arrow.x;
        const arrowY = middlewareData.arrow.y;
        let top = "";
        let right = "";
        let bottom = "";
        let left = "";
        if (this.arrowPlacement === "start") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          top = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? value : "";
          left = isRtl ? "" : value;
        } else if (this.arrowPlacement === "end") {
          const value = typeof arrowX === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
          right = isRtl ? "" : value;
          left = isRtl ? value : "";
          bottom = typeof arrowY === "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
        } else if (this.arrowPlacement === "center") {
          left = typeof arrowX === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
          top = typeof arrowY === "number" ? `calc(50% - var(--arrow-size-diagonal))` : "";
        } else {
          left = typeof arrowX === "number" ? `${arrowX}px` : "";
          top = typeof arrowY === "number" ? `${arrowY}px` : "";
        }
        Object.assign(this.arrowEl.style, {
          top,
          right,
          bottom,
          left,
          [staticSide]: "calc(var(--arrow-size-diagonal) * -1)"
        });
      }
    });
    this.emit("sl-reposition");
  }
  render() {
    return y$1`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <div
        part="popup"
        class=${o$9({
      popup: true,
      "popup--active": this.active,
      "popup--fixed": this.strategy === "fixed",
      "popup--has-arrow": this.arrow
    })}
      >
        <slot></slot>
        ${this.arrow ? y$1`<div part="arrow" class="popup__arrow" role="presentation"></div>` : ""}
      </div>
    `;
  }
};
SlPopup.styles = popup_styles_default;
__decorateClass([
  i2$2(".popup")
], SlPopup.prototype, "popup", 2);
__decorateClass([
  i2$2(".popup__arrow")
], SlPopup.prototype, "arrowEl", 2);
__decorateClass([
  e2$1()
], SlPopup.prototype, "anchor", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlPopup.prototype, "active", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlPopup.prototype, "placement", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlPopup.prototype, "strategy", 2);
__decorateClass([
  e2$1({ type: Number })
], SlPopup.prototype, "distance", 2);
__decorateClass([
  e2$1({ type: Number })
], SlPopup.prototype, "skidding", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlPopup.prototype, "arrow", 2);
__decorateClass([
  e2$1({ attribute: "arrow-placement" })
], SlPopup.prototype, "arrowPlacement", 2);
__decorateClass([
  e2$1({ attribute: "arrow-padding", type: Number })
], SlPopup.prototype, "arrowPadding", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlPopup.prototype, "flip", 2);
__decorateClass([
  e2$1({
    attribute: "flip-fallback-placements",
    converter: {
      fromAttribute: (value) => {
        return value.split(" ").map((p3) => p3.trim()).filter((p3) => p3 !== "");
      },
      toAttribute: (value) => {
        return value.join(" ");
      }
    }
  })
], SlPopup.prototype, "flipFallbackPlacements", 2);
__decorateClass([
  e2$1({ attribute: "flip-fallback-strategy" })
], SlPopup.prototype, "flipFallbackStrategy", 2);
__decorateClass([
  e2$1({ type: Object })
], SlPopup.prototype, "flipBoundary", 2);
__decorateClass([
  e2$1({ attribute: "flip-padding", type: Number })
], SlPopup.prototype, "flipPadding", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlPopup.prototype, "shift", 2);
__decorateClass([
  e2$1({ type: Object })
], SlPopup.prototype, "shiftBoundary", 2);
__decorateClass([
  e2$1({ attribute: "shift-padding", type: Number })
], SlPopup.prototype, "shiftPadding", 2);
__decorateClass([
  e2$1({ attribute: "auto-size" })
], SlPopup.prototype, "autoSize", 2);
__decorateClass([
  e2$1()
], SlPopup.prototype, "sync", 2);
__decorateClass([
  e2$1({ type: Object })
], SlPopup.prototype, "autoSizeBoundary", 2);
__decorateClass([
  e2$1({ attribute: "auto-size-padding", type: Number })
], SlPopup.prototype, "autoSizePadding", 2);
SlPopup = __decorateClass([
  e$9("sl-popup")
], SlPopup);

// src/components/menu/menu.styles.ts
var menu_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: block;
    position: relative;
    background: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    padding: var(--sl-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`;

// src/components/menu/menu.ts
var SlMenu = class extends ShoelaceElement$1 {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "menu");
  }
  getAllItems() {
    return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el) => {
      if (!this.isMenuItem(el)) {
        return false;
      }
      return true;
    });
  }
  handleClick(event) {
    const target = event.target;
    const item = target.closest("sl-menu-item");
    if ((item == null ? void 0 : item.disabled) === false) {
      if (item.type === "checkbox") {
        item.checked = !item.checked;
      }
      this.emit("sl-select", { detail: { item } });
    }
  }
  handleKeyDown(event) {
    if (event.key === "Enter") {
      const item = this.getCurrentItem();
      event.preventDefault();
      item == null ? void 0 : item.click();
    }
    if (event.key === " ") {
      event.preventDefault();
    }
    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      const items = this.getAllItems();
      const activeItem = this.getCurrentItem();
      let index = activeItem ? items.indexOf(activeItem) : 0;
      if (items.length > 0) {
        event.preventDefault();
        if (event.key === "ArrowDown") {
          index++;
        } else if (event.key === "ArrowUp") {
          index--;
        } else if (event.key === "Home") {
          index = 0;
        } else if (event.key === "End") {
          index = items.length - 1;
        }
        if (index < 0) {
          index = items.length - 1;
        }
        if (index > items.length - 1) {
          index = 0;
        }
        this.setCurrentItem(items[index]);
        items[index].focus();
      }
    }
  }
  handleMouseDown(event) {
    const target = event.target;
    if (this.isMenuItem(target)) {
      this.setCurrentItem(target);
    }
  }
  handleSlotChange() {
    const items = this.getAllItems();
    if (items.length > 0) {
      this.setCurrentItem(items[0]);
    }
  }
  isMenuItem(item) {
    var _a;
    return item.tagName.toLowerCase() === "sl-menu-item" || ["menuitem", "menuitemcheckbox", "menuitemradio"].includes((_a = item.getAttribute("role")) != null ? _a : "");
  }
  getCurrentItem() {
    return this.getAllItems().find((i2) => i2.getAttribute("tabindex") === "0");
  }
  setCurrentItem(item) {
    const items = this.getAllItems();
    items.forEach((i2) => {
      i2.setAttribute("tabindex", i2 === item ? "0" : "-1");
    });
  }
  render() {
    return y$1`
      <slot
        @slotchange=${this.handleSlotChange}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mousedown=${this.handleMouseDown}
      ></slot>
    `;
  }
};
SlMenu.styles = menu_styles_default;
__decorateClass([
  i2$2("slot")
], SlMenu.prototype, "defaultSlot", 2);
SlMenu = __decorateClass([
  e$9("sl-menu")
], SlMenu);

// src/components/menu-item/menu-item.styles.ts
var menu_item_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-2x-small);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
    display: inline-block;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix::slotted(*) {
    margin-inline-end: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix::slotted(*) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item {
    background-color: var(--sl-color-neutral-100);
    color: var(--sl-color-neutral-1000);
  }

  :host(:focus-visible) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
    opacity: 1;
  }

  .menu-item .menu-item__check,
  .menu-item .menu-item__chevron {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5em;
    visibility: hidden;
  }

  .menu-item--checked .menu-item__check,
  .menu-item--has-submenu .menu-item__chevron {
    visibility: visible;
  }

  @media (forced-colors: active) {
    :host(:hover:not([aria-disabled='true'])) .menu-item,
    :host(:focus-visible) .menu-item {
      outline: dashed 1px SelectedItem;
      outline-offset: -1px;
    }
  }
`;

// src/components/menu-item/menu-item.ts
var SlMenuItem = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.type = "normal";
    this.checked = false;
    this.value = "";
    this.disabled = false;
  }
  handleDefaultSlotChange() {
    const textLabel = this.getTextLabel();
    if (typeof this.cachedTextLabel === "undefined") {
      this.cachedTextLabel = textLabel;
      return;
    }
    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      this.emit("slotchange", { bubbles: true, composed: false, cancelable: false });
    }
  }
  handleCheckedChange() {
    if (this.checked && this.type !== "checkbox") {
      this.checked = false;
      console.error('The checked attribute can only be used on menu items with type="checkbox"', this);
      return;
    }
    if (this.type === "checkbox") {
      this.setAttribute("aria-checked", this.checked ? "true" : "false");
    } else {
      this.removeAttribute("aria-checked");
    }
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleTypeChange() {
    if (this.type === "checkbox") {
      this.setAttribute("role", "menuitemcheckbox");
      this.setAttribute("aria-checked", this.checked ? "true" : "false");
    } else {
      this.setAttribute("role", "menuitem");
      this.removeAttribute("aria-checked");
    }
  }
  getTextLabel() {
    return getTextContent(this.defaultSlot);
  }
  render() {
    return y$1`
      <div
        part="base"
        class=${o$9({
      "menu-item": true,
      "menu-item--checked": this.checked,
      "menu-item--disabled": this.disabled,
      "menu-item--has-submenu": false
    })}
      >
        <span part="checked-icon" class="menu-item__check">
          <sl-icon name="check" library="system" aria-hidden="true"></sl-icon>
        </span>

        <slot name="prefix" part="prefix" class="menu-item__prefix"></slot>

        <slot part="label" class="menu-item__label" @slotchange=${this.handleDefaultSlotChange}></slot>

        <slot name="suffix" part="suffix" class="menu-item__suffix"></slot>

        <span class="menu-item__chevron">
          <sl-icon name="chevron-right" library="system" aria-hidden="true"></sl-icon>
        </span>
      </div>
    `;
  }
};
SlMenuItem.styles = menu_item_styles_default;
__decorateClass([
  i2$2("slot:not([name])")
], SlMenuItem.prototype, "defaultSlot", 2);
__decorateClass([
  i2$2(".menu-item")
], SlMenuItem.prototype, "menuItem", 2);
__decorateClass([
  e2$1()
], SlMenuItem.prototype, "type", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "checked", 2);
__decorateClass([
  e2$1()
], SlMenuItem.prototype, "value", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlMenuItem.prototype, "disabled", 2);
__decorateClass([
  watch$1("checked")
], SlMenuItem.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch$1("disabled")
], SlMenuItem.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch$1("type")
], SlMenuItem.prototype, "handleTypeChange", 1);
SlMenuItem = __decorateClass([
  e$9("sl-menu-item")
], SlMenuItem);

// src/components/menu-label/menu-label.styles.ts
var menu_label_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: block;
  }

  .menu-label {
    display: inline-block;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    line-height: var(--sl-line-height-normal);
    letter-spacing: var(--sl-letter-spacing-normal);
    color: var(--sl-color-neutral-500);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    user-select: none;
  }
`;

// src/components/menu-label/menu-label.ts
var SlMenuLabel = class extends ShoelaceElement$1 {
  render() {
    return y$1` <slot part="base" class="menu-label"></slot> `;
  }
};
SlMenuLabel.styles = menu_label_styles_default;
SlMenuLabel = __decorateClass([
  e$9("sl-menu-label")
], SlMenuLabel);

// src/components/radio-group/radio-group.styles.ts
var radio_group_styles_default = i$8`
  ${component_styles_default}
  ${form_control_styles_default}

  :host {
    display: block;
  }

  .form-control {
    border: none;
    padding: 0;
  }

  .form-control__label {
    padding: 0;
  }

  .radio-group--required .radio-group__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

// src/components/radio-group/radio-group.ts
var SlRadioGroup = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      defaultValue: (control) => control.defaultValue
    });
    this.hasSlotController = new HasSlotController$1(this, "help-text", "label");
    this.hasButtonGroup = false;
    this.errorMessage = "";
    this.customErrorMessage = "";
    this.defaultValue = "";
    this.invalid = false;
    this.label = "";
    this.helpText = "";
    this.name = "option";
    this.value = "";
    this.required = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.defaultValue = this.value;
  }
  firstUpdated() {
    this.invalid = !this.validity.valid;
  }
  getAllRadios() {
    return [...this.querySelectorAll("sl-radio, sl-radio-button")];
  }
  handleRadioClick(event) {
    const target = event.target;
    const radios = this.getAllRadios();
    const oldValue = this.value;
    if (target.disabled) {
      return;
    }
    this.value = target.value;
    radios.forEach((radio) => radio.checked = radio === target);
    if (this.value !== oldValue) {
      this.emit("sl-change");
      this.emit("sl-input");
    }
  }
  handleKeyDown(event) {
    var _a;
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
      return;
    }
    const radios = this.getAllRadios().filter((radio) => !radio.disabled);
    const checkedRadio = (_a = radios.find((radio) => radio.checked)) != null ? _a : radios[0];
    const incr = event.key === " " ? 0 : ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1;
    const oldValue = this.value;
    let index = radios.indexOf(checkedRadio) + incr;
    if (index < 0) {
      index = radios.length - 1;
    }
    if (index > radios.length - 1) {
      index = 0;
    }
    this.getAllRadios().forEach((radio) => {
      radio.checked = false;
      if (!this.hasButtonGroup) {
        radio.tabIndex = -1;
      }
    });
    this.value = radios[index].value;
    radios[index].checked = true;
    if (!this.hasButtonGroup) {
      radios[index].tabIndex = 0;
      radios[index].focus();
    } else {
      radios[index].shadowRoot.querySelector("button").focus();
    }
    if (this.value !== oldValue) {
      this.emit("sl-change");
      this.emit("sl-input");
    }
    event.preventDefault();
  }
  handleLabelClick() {
    const radios = this.getAllRadios();
    const checked = radios.find((radio) => radio.checked);
    const radioToFocus = checked || radios[0];
    if (radioToFocus) {
      radioToFocus.focus();
    }
  }
  handleSlotChange() {
    var _a;
    const radios = this.getAllRadios();
    radios.forEach((radio) => radio.checked = radio.value === this.value);
    this.hasButtonGroup = radios.some((radio) => radio.tagName.toLowerCase() === "sl-radio-button");
    if (!radios.some((radio) => radio.checked)) {
      if (this.hasButtonGroup) {
        const buttonRadio = radios[0].shadowRoot.querySelector("button");
        buttonRadio.tabIndex = 0;
      } else {
        radios[0].tabIndex = 0;
      }
    }
    if (this.hasButtonGroup) {
      const buttonGroup = (_a = this.shadowRoot) == null ? void 0 : _a.querySelector("sl-button-group");
      if (buttonGroup) {
        buttonGroup.disableRole = true;
      }
    }
  }
  showNativeErrorMessage() {
    this.input.hidden = false;
    this.input.reportValidity();
    setTimeout(() => this.input.hidden = true, 1e4);
  }
  updateCheckedRadio() {
    const radios = this.getAllRadios();
    radios.forEach((radio) => radio.checked = radio.value === this.value);
    this.invalid = !this.validity.valid;
  }
  handleValueChange() {
    if (this.hasUpdated) {
      this.updateCheckedRadio();
    }
  }
  checkValidity() {
    return this.validity.valid;
  }
  setCustomValidity(message = "") {
    this.customErrorMessage = message;
    this.errorMessage = message;
    if (!message) {
      this.invalid = false;
    } else {
      this.invalid = true;
      this.input.setCustomValidity(message);
    }
  }
  get validity() {
    const hasMissingData = !(this.value && this.required || !this.required);
    const hasCustomError = this.customErrorMessage !== "";
    return {
      badInput: false,
      customError: hasCustomError,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
      valid: hasMissingData || hasCustomError ? false : true,
      valueMissing: !hasMissingData
    };
  }
  reportValidity() {
    const validity = this.validity;
    this.errorMessage = this.customErrorMessage || validity.valid ? "" : this.input.validationMessage;
    this.invalid = !validity.valid;
    if (!validity.valid) {
      this.showNativeErrorMessage();
    }
    return !this.invalid;
  }
  render() {
    const hasLabelSlot = this.hasSlotController.test("label");
    const hasHelpTextSlot = this.hasSlotController.test("help-text");
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHelpText = this.helpText ? true : !!hasHelpTextSlot;
    const defaultSlot = y$1`
      <slot
        @click=${this.handleRadioClick}
        @keydown=${this.handleKeyDown}
        @slotchange=${this.handleSlotChange}
        role="presentation"
      ></slot>
    `;
    return y$1`
      <fieldset
        part="form-control"
        class=${o$9({
      "form-control": true,
      "form-control--medium": true,
      "form-control--radio-group": true,
      "form-control--has-label": hasLabel,
      "form-control--has-help-text": hasHelpText
    })}
        role="radiogroup"
        aria-labelledby="label"
        aria-describedby="help-text"
        aria-errormessage="error-message"
      >
        <label
          part="form-control-label"
          id="label"
          class="form-control__label"
          aria-hidden=${hasLabel ? "false" : "true"}
          @click=${this.handleLabelClick}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" class="form-control-input">
          <div class="visually-hidden">
            <div id="error-message" aria-live="assertive">${this.errorMessage}</div>
            <label class="radio-group__validation">
              <input
                type="text"
                class="radio-group__validation-input"
                ?required=${this.required}
                tabindex="-1"
                hidden
              />
            </label>
          </div>

          ${this.hasButtonGroup ? y$1`
                <sl-button-group part="button-group" exportparts="base:button-group__base">
                  ${defaultSlot}
                </sl-button-group>
              ` : defaultSlot}
        </div>

        <slot
          name="help-text"
          part="form-control-help-text"
          id="help-text"
          class="form-control__help-text"
          aria-hidden=${hasHelpText ? "false" : "true"}
        >
          ${this.helpText}
        </slot>
      </fieldset>
    `;
  }
};
SlRadioGroup.styles = radio_group_styles_default;
__decorateClass([
  i2$2("slot:not([name])")
], SlRadioGroup.prototype, "defaultSlot", 2);
__decorateClass([
  i2$2(".radio-group__validation-input")
], SlRadioGroup.prototype, "input", 2);
__decorateClass([
  t$5()
], SlRadioGroup.prototype, "hasButtonGroup", 2);
__decorateClass([
  t$5()
], SlRadioGroup.prototype, "errorMessage", 2);
__decorateClass([
  t$5()
], SlRadioGroup.prototype, "customErrorMessage", 2);
__decorateClass([
  t$5()
], SlRadioGroup.prototype, "defaultValue", 2);
__decorateClass([
  t$5()
], SlRadioGroup.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlRadioGroup.prototype, "label", 2);
__decorateClass([
  e2$1({ attribute: "help-text" })
], SlRadioGroup.prototype, "helpText", 2);
__decorateClass([
  e2$1()
], SlRadioGroup.prototype, "name", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlRadioGroup.prototype, "value", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlRadioGroup.prototype, "required", 2);
__decorateClass([
  watch$1("value")
], SlRadioGroup.prototype, "handleValueChange", 1);
SlRadioGroup = __decorateClass([
  e$9("sl-radio-group")
], SlRadioGroup);

// src/components/switch/switch.styles.ts
var switch_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  :host([size='small']) {
    --height: var(--sl-toggle-size-small);
    --thumb-size: calc(var(--sl-toggle-size-small) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-small);
  }

  :host([size='medium']) {
    --height: var(--sl-toggle-size-medium);
    --thumb-size: calc(var(--sl-toggle-size-medium) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-medium);
  }

  :host([size='large']) {
    --height: var(--sl-toggle-size-large);
    --thumb-size: calc(var(--sl-toggle-size-large) + 4px);
    --width: calc(var(--height) * 2);

    font-size: var(--sl-input-font-size-large);
  }

  .switch {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: inherit;
    font-weight: var(--sl-input-font-weight);
    color: var(--sl-input-color);
    vertical-align: middle;
    cursor: pointer;
  }

  .switch__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--width);
    height: var(--height);
    background-color: var(--sl-color-neutral-400);
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    border-radius: var(--height);
    transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) background-color;
  }

  .switch__control .switch__thumb {
    width: var(--thumb-size);
    height: var(--thumb-size);
    background-color: var(--sl-color-neutral-0);
    border-radius: 50%;
    border: solid var(--sl-input-border-width) var(--sl-color-neutral-400);
    translate: calc((var(--width) - var(--height)) / -2);
    transition: var(--sl-transition-fast) translate ease, var(--sl-transition-fast) background-color,
      var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
  }

  .switch__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }

  /* Hover */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-400);
  }

  /* Focus */
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    translate: calc((var(--width) - var(--height)) / 2);
  }

  /* Checked + hover */
  .switch.switch--checked:not(.switch--disabled) .switch__control:hover {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__control:hover .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
  }

  /* Checked + focus */
  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled) .switch__input:focus-visible ~ .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    display: inline-block;
    line-height: var(--height);
    margin-inline-start: 0.5em;
    user-select: none;
  }

  :host([required]) .switch__label::after {
    content: var(--sl-input-required-content);
    margin-inline-start: var(--sl-input-required-content-offset);
  }
`;

// src/components/switch/switch.ts
var SlSwitch = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.formSubmitController = new FormSubmitController(this, {
      value: (control) => control.checked ? control.value || "on" : void 0,
      defaultValue: (control) => control.defaultChecked,
      setValue: (control, checked) => control.checked = checked
    });
    this.hasFocus = false;
    this.invalid = false;
    this.title = "";
    this.name = "";
    this.size = "medium";
    this.disabled = false;
    this.required = false;
    this.checked = false;
    this.defaultChecked = false;
  }
  firstUpdated() {
    this.invalid = !this.checkValidity();
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleInput() {
    this.emit("sl-input");
  }
  handleClick() {
    this.checked = !this.checked;
    this.emit("sl-change");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      this.checked = false;
      this.emit("sl-change");
      this.emit("sl-input");
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      this.checked = true;
      this.emit("sl-change");
      this.emit("sl-input");
    }
  }
  handleCheckedChange() {
    this.input.checked = this.checked;
    this.invalid = !this.checkValidity();
  }
  handleDisabledChange() {
    this.input.disabled = this.disabled;
    this.invalid = !this.checkValidity();
  }
  click() {
    this.input.click();
  }
  focus(options) {
    this.input.focus(options);
  }
  blur() {
    this.input.blur();
  }
  checkValidity() {
    return this.input.checkValidity();
  }
  reportValidity() {
    return this.input.reportValidity();
  }
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.checkValidity();
  }
  render() {
    return y$1`
      <label
        part="base"
        class=${o$9({
      switch: true,
      "switch--checked": this.checked,
      "switch--disabled": this.disabled,
      "switch--focused": this.hasFocus,
      "switch--small": this.size === "small",
      "switch--medium": this.size === "medium",
      "switch--large": this.size === "large"
    })}
      >
        <input
          class="switch__input"
          type="checkbox"
          title=${this.title}
          name=${this.name}
          value=${l$8(this.value)}
          .checked=${l2$1(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked ? "true" : "false"}
          @click=${this.handleClick}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <slot part="label" class="switch__label"></slot>
      </label>
    `;
  }
};
SlSwitch.styles = switch_styles_default;
__decorateClass([
  i2$2('input[type="checkbox"]')
], SlSwitch.prototype, "input", 2);
__decorateClass([
  t$5()
], SlSwitch.prototype, "hasFocus", 2);
__decorateClass([
  t$5()
], SlSwitch.prototype, "invalid", 2);
__decorateClass([
  e2$1()
], SlSwitch.prototype, "title", 2);
__decorateClass([
  e2$1()
], SlSwitch.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlSwitch.prototype, "value", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlSwitch.prototype, "size", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSwitch.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSwitch.prototype, "required", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlSwitch.prototype, "checked", 2);
__decorateClass([
  defaultValue("checked")
], SlSwitch.prototype, "defaultChecked", 2);
__decorateClass([
  watch$1("checked", { waitUntilFirstUpdate: true })
], SlSwitch.prototype, "handleCheckedChange", 1);
__decorateClass([
  watch$1("disabled", { waitUntilFirstUpdate: true })
], SlSwitch.prototype, "handleDisabledChange", 1);
SlSwitch = __decorateClass([
  e$9("sl-switch")
], SlSwitch);

// src/components/tab/tab.styles.ts
var tab_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-small);
    font-weight: var(--sl-font-weight-semibold);
    border-radius: var(--sl-border-radius-medium);
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-medium) var(--sl-spacing-large);
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    transition: var(--transition-speed) box-shadow, var(--transition-speed) color;
  }

  .tab:hover:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus {
    outline: none;
  }

  .tab:focus-visible:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: calc(-1 * var(--sl-focus-ring-width) - var(--sl-focus-ring-offset));
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-inline-end: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-small);
    margin-inline-start: var(--sl-spacing-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }

  @media (forced-colors: active) {
    .tab.tab--active:not(.tab--disabled) {
      outline: solid 1px transparent;
      outline-offset: -3px;
    }
  }
`;

// src/components/tab/tab.ts
var id$1 = 0;
var SlTab = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.attrId = ++id$1;
    this.componentId = `sl-tab-${this.attrId}`;
    this.panel = "";
    this.active = false;
    this.closable = false;
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "tab");
  }
  handleCloseClick() {
    this.emit("sl-close");
  }
  handleActiveChange() {
    this.setAttribute("aria-selected", this.active ? "true" : "false");
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  focus(options) {
    this.tab.focus(options);
  }
  blur() {
    this.tab.blur();
  }
  render() {
    this.id = this.id.length > 0 ? this.id : this.componentId;
    return y$1`
      <div
        part="base"
        class=${o$9({
      tab: true,
      "tab--active": this.active,
      "tab--closable": this.closable,
      "tab--disabled": this.disabled
    })}
        tabindex=${this.disabled ? "-1" : "0"}
      >
        <slot></slot>
        ${this.closable ? y$1`
              <sl-icon-button
                part="close-button"
                exportparts="base:close-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("close")}
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </div>
    `;
  }
};
SlTab.styles = tab_styles_default;
__decorateClass([
  i2$2(".tab")
], SlTab.prototype, "tab", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlTab.prototype, "panel", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTab.prototype, "active", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlTab.prototype, "closable", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTab.prototype, "disabled", 2);
__decorateClass([
  watch$1("active")
], SlTab.prototype, "handleActiveChange", 1);
__decorateClass([
  watch$1("disabled")
], SlTab.prototype, "handleDisabledChange", 1);
SlTab = __decorateClass([
  e$9("sl-tab")
], SlTab);

// src/components/icon-button/icon-button.styles.ts
var icon_button_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`;

// src/components/icon-button/icon-button.ts
var SlIconButton = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("sl-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("sl-focus");
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  click() {
    this.button.click();
  }
  focus(options) {
    this.button.focus(options);
  }
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? i$7`a` : i$7`button`;
    return n$a`
      <${tag}
        part="base"
        class=${o$9({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${l$8(isLink ? void 0 : this.disabled)}
        type=${l$8(isLink ? void 0 : "button")}
        href=${l$8(isLink ? this.href : void 0)}
        target=${l$8(isLink ? this.target : void 0)}
        download=${l$8(isLink ? this.download : void 0)}
        rel=${l$8(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${l$8(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${l$8(this.name)}
          library=${l$8(this.library)}
          src=${l$8(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${tag}>
    `;
  }
};
SlIconButton.styles = icon_button_styles_default;
__decorateClass([
  i2$2(".icon-button")
], SlIconButton.prototype, "button", 2);
__decorateClass([
  t$5()
], SlIconButton.prototype, "hasFocus", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "name", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "library", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "src", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "href", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "target", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "download", 2);
__decorateClass([
  e2$1()
], SlIconButton.prototype, "label", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlIconButton.prototype, "disabled", 2);
SlIconButton = __decorateClass([
  e$9("sl-icon-button")
], SlIconButton);

// src/components/tab-group/tab-group.styles.ts
var tab_group_styles_default = i$8`
  ${component_styles_default}

  :host {
    --indicator-color: var(--sl-color-primary-600);
    --track-color: var(--sl-color-neutral-200);
    --track-width: 2px;

    display: block;
  }

  .tab-group {
    display: flex;
    border-radius: 0;
  }

  .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group__indicator {
    position: absolute;
    transition: var(--sl-transition-fast) translate ease, var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
  }

  .tab-group__body {
    display: block;
    overflow: auto;
  }

  .tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: var(--sl-spacing-x-large);
  }

  .tab-group__scroll-button--start {
    left: 0;
  }

  .tab-group__scroll-button--end {
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--start {
    left: auto;
    right: 0;
  }

  .tab-group--rtl .tab-group__scroll-button--end {
    left: 0;
    right: auto;
  }

  /*
   * Top
   */

  .tab-group--top {
    flex-direction: column;
  }

  .tab-group--top .tab-group__nav-container {
    order: 1;
  }

  .tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid var(--track-width) var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: calc(-1 * var(--track-width));
    border-bottom: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--top .tab-group__body {
    order: 2;
  }

  .tab-group--top ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Bottom
   */

  .tab-group--bottom {
    flex-direction: column;
  }

  .tab-group--bottom .tab-group__nav-container {
    order: 2;
  }

  .tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;

    /* Hide scrollbar in Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid var(--track-width) var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * var(--track-width));
    border-top: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--bottom .tab-group__body {
    order: 1;
  }

  .tab-group--bottom ::slotted(sl-tab-panel) {
    --padding: var(--sl-spacing-medium) 0;
  }

  /*
   * Start
   */

  .tab-group--start {
    flex-direction: row;
  }

  .tab-group--start .tab-group__nav-container {
    order: 1;
  }

  .tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-inline-end: solid var(--track-width) var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    border-right: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--start.tab-group--rtl .tab-group__indicator {
    right: auto;
    left: calc(-1 * var(--track-width));
  }

  .tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
  }

  .tab-group--start ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }

  /*
   * End
   */

  .tab-group--end {
    flex-direction: row;
  }

  .tab-group--end .tab-group__nav-container {
    order: 2;
  }

  .tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid var(--track-width) var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * var(--track-width));
    border-inline-start: solid var(--track-width) var(--indicator-color);
  }

  .tab-group--end.tab-group--rtl .tab-group__indicator {
    right: calc(-1 * var(--track-width));
    left: auto;
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`;

// src/components/tab-group/tab-group.ts
var SlTabGroup = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.tabs = [];
    this.panels = [];
    this.hasScrollControls = false;
    this.placement = "top";
    this.activation = "auto";
    this.noScrollControls = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => {
      this.repositionIndicator();
      this.updateScrollControls();
    });
    this.mutationObserver = new MutationObserver((mutations) => {
      if (mutations.some((m) => !["aria-labelledby", "aria-controls"].includes(m.attributeName))) {
        setTimeout(() => this.setAriaLabels());
      }
      if (mutations.some((m) => m.attributeName === "disabled")) {
        this.syncTabsAndPanels();
      }
    });
    this.updateComplete.then(() => {
      this.syncTabsAndPanels();
      this.mutationObserver.observe(this, { attributes: true, childList: true, subtree: true });
      this.resizeObserver.observe(this.nav);
      const intersectionObserver = new IntersectionObserver((entries, observer) => {
        var _a;
        if (entries[0].intersectionRatio > 0) {
          this.setAriaLabels();
          this.setActiveTab((_a = this.getActiveTab()) != null ? _a : this.tabs[0], { emitEvents: false });
          observer.unobserve(entries[0].target);
        }
      });
      intersectionObserver.observe(this.tabGroup);
    });
  }
  disconnectedCallback() {
    this.mutationObserver.disconnect();
    this.resizeObserver.unobserve(this.nav);
  }
  getAllTabs(options = { includeDisabled: true }) {
    const slot = this.shadowRoot.querySelector('slot[name="nav"]');
    return [...slot.assignedElements()].filter((el) => {
      return options.includeDisabled ? el.tagName.toLowerCase() === "sl-tab" : el.tagName.toLowerCase() === "sl-tab" && !el.disabled;
    });
  }
  getAllPanels() {
    return [...this.body.assignedElements()].filter((el) => el.tagName.toLowerCase() === "sl-tab-panel");
  }
  getActiveTab() {
    return this.tabs.find((el) => el.active);
  }
  handleClick(event) {
    const target = event.target;
    const tab = target.closest("sl-tab");
    const tabGroup = tab == null ? void 0 : tab.closest("sl-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (tab !== null) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  handleKeyDown(event) {
    const target = event.target;
    const tab = target.closest("sl-tab");
    const tabGroup = tab == null ? void 0 : tab.closest("sl-tab-group");
    if (tabGroup !== this) {
      return;
    }
    if (["Enter", " "].includes(event.key)) {
      if (tab !== null) {
        this.setActiveTab(tab, { scrollBehavior: "smooth" });
        event.preventDefault();
      }
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) {
      const activeEl = this.tabs.find((t2) => t2.matches(":focus"));
      const isRtl = this.localize.dir() === "rtl";
      if ((activeEl == null ? void 0 : activeEl.tagName.toLowerCase()) === "sl-tab") {
        let index = this.tabs.indexOf(activeEl);
        if (event.key === "Home") {
          index = 0;
        } else if (event.key === "End") {
          index = this.tabs.length - 1;
        } else if (["top", "bottom"].includes(this.placement) && event.key === (isRtl ? "ArrowRight" : "ArrowLeft") || ["start", "end"].includes(this.placement) && event.key === "ArrowUp") {
          index--;
        } else if (["top", "bottom"].includes(this.placement) && event.key === (isRtl ? "ArrowLeft" : "ArrowRight") || ["start", "end"].includes(this.placement) && event.key === "ArrowDown") {
          index++;
        }
        if (index < 0) {
          index = this.tabs.length - 1;
        }
        if (index > this.tabs.length - 1) {
          index = 0;
        }
        this.tabs[index].focus({ preventScroll: true });
        if (this.activation === "auto") {
          this.setActiveTab(this.tabs[index], { scrollBehavior: "smooth" });
        }
        if (["top", "bottom"].includes(this.placement)) {
          scrollIntoView(this.tabs[index], this.nav, "horizontal");
        }
        event.preventDefault();
      }
    }
  }
  handleScrollToStart() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft + this.nav.clientWidth : this.nav.scrollLeft - this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  handleScrollToEnd() {
    this.nav.scroll({
      left: this.localize.dir() === "rtl" ? this.nav.scrollLeft - this.nav.clientWidth : this.nav.scrollLeft + this.nav.clientWidth,
      behavior: "smooth"
    });
  }
  setActiveTab(tab, options) {
    options = __spreadValues({
      emitEvents: true,
      scrollBehavior: "auto"
    }, options);
    if (tab !== this.activeTab && !tab.disabled) {
      const previousTab = this.activeTab;
      this.activeTab = tab;
      this.tabs.map((el) => el.active = el === this.activeTab);
      this.panels.map((el) => {
        var _a;
        return el.active = el.name === ((_a = this.activeTab) == null ? void 0 : _a.panel);
      });
      this.syncIndicator();
      if (["top", "bottom"].includes(this.placement)) {
        scrollIntoView(this.activeTab, this.nav, "horizontal", options.scrollBehavior);
      }
      if (options.emitEvents) {
        if (previousTab) {
          this.emit("sl-tab-hide", { detail: { name: previousTab.panel } });
        }
        this.emit("sl-tab-show", { detail: { name: this.activeTab.panel } });
      }
    }
  }
  setAriaLabels() {
    this.tabs.forEach((tab) => {
      const panel = this.panels.find((el) => el.name === tab.panel);
      if (panel) {
        tab.setAttribute("aria-controls", panel.getAttribute("id"));
        panel.setAttribute("aria-labelledby", tab.getAttribute("id"));
      }
    });
  }
  repositionIndicator() {
    const currentTab = this.getActiveTab();
    if (!currentTab) {
      return;
    }
    const width = currentTab.clientWidth;
    const height = currentTab.clientHeight;
    const isRtl = this.localize.dir() === "rtl";
    const allTabs = this.getAllTabs();
    const precedingTabs = allTabs.slice(0, allTabs.indexOf(currentTab));
    const offset = precedingTabs.reduce(
      (previous, current) => ({
        left: previous.left + current.clientWidth,
        top: previous.top + current.clientHeight
      }),
      { left: 0, top: 0 }
    );
    switch (this.placement) {
      case "top":
      case "bottom":
        this.indicator.style.width = `${width}px`;
        this.indicator.style.height = "auto";
        this.indicator.style.translate = isRtl ? `${-1 * offset.left}px` : `${offset.left}px`;
        break;
      case "start":
      case "end":
        this.indicator.style.width = "auto";
        this.indicator.style.height = `${height}px`;
        this.indicator.style.translate = `0 ${offset.top}px`;
        break;
    }
  }
  syncTabsAndPanels() {
    this.tabs = this.getAllTabs({ includeDisabled: false });
    this.panels = this.getAllPanels();
    this.syncIndicator();
  }
  updateScrollControls() {
    if (this.noScrollControls) {
      this.hasScrollControls = false;
    } else {
      this.hasScrollControls = ["top", "bottom"].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth;
    }
  }
  syncIndicator() {
    const tab = this.getActiveTab();
    if (tab) {
      this.indicator.style.display = "block";
      this.repositionIndicator();
    } else {
      this.indicator.style.display = "none";
    }
  }
  show(panel) {
    const tab = this.tabs.find((el) => el.panel === panel);
    if (tab) {
      this.setActiveTab(tab, { scrollBehavior: "smooth" });
    }
  }
  render() {
    const isRtl = this.localize.dir() === "rtl";
    return y$1`
      <div
        part="base"
        class=${o$9({
      "tab-group": true,
      "tab-group--top": this.placement === "top",
      "tab-group--bottom": this.placement === "bottom",
      "tab-group--start": this.placement === "start",
      "tab-group--end": this.placement === "end",
      "tab-group--rtl": this.localize.dir() === "rtl",
      "tab-group--has-scroll-controls": this.hasScrollControls
    })}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls ? y$1`
                <sl-icon-button
                  part="scroll-button scroll-button--start"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  name=${isRtl ? "chevron-right" : "chevron-left"}
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              ` : ""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls ? y$1`
                <sl-icon-button
                  part="scroll-button scroll-button--end"
                  exportparts="base:scroll-button__base"
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  name=${isRtl ? "chevron-left" : "chevron-right"}
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              ` : ""}
        </div>

        <slot part="body" class="tab-group__body" @slotchange=${this.syncTabsAndPanels}></slot>
      </div>
    `;
  }
};
SlTabGroup.styles = tab_group_styles_default;
__decorateClass([
  i2$2(".tab-group")
], SlTabGroup.prototype, "tabGroup", 2);
__decorateClass([
  i2$2(".tab-group__body")
], SlTabGroup.prototype, "body", 2);
__decorateClass([
  i2$2(".tab-group__nav")
], SlTabGroup.prototype, "nav", 2);
__decorateClass([
  i2$2(".tab-group__indicator")
], SlTabGroup.prototype, "indicator", 2);
__decorateClass([
  t$5()
], SlTabGroup.prototype, "hasScrollControls", 2);
__decorateClass([
  e2$1()
], SlTabGroup.prototype, "placement", 2);
__decorateClass([
  e2$1()
], SlTabGroup.prototype, "activation", 2);
__decorateClass([
  e2$1({ attribute: "no-scroll-controls", type: Boolean })
], SlTabGroup.prototype, "noScrollControls", 2);
__decorateClass([
  watch$1("noScrollControls", { waitUntilFirstUpdate: true })
], SlTabGroup.prototype, "updateScrollControls", 1);
__decorateClass([
  watch$1("placement", { waitUntilFirstUpdate: true })
], SlTabGroup.prototype, "syncIndicator", 1);
SlTabGroup = __decorateClass([
  e$9("sl-tab-group")
], SlTabGroup);

// src/components/tab-panel/tab-panel.styles.ts
var tab_panel_styles_default = i$8`
  ${component_styles_default}

  :host {
    --padding: 0;

    display: block;
  }

  .tab-panel {
    display: block;
    padding: var(--padding);
  }

  .tab-panel:not(.tab-panel--active) {
    display: none;
  }
`;

// src/components/tab-panel/tab-panel.ts
var id = 0;
var SlTabPanel = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.attrId = ++id;
    this.componentId = `sl-tab-panel-${this.attrId}`;
    this.name = "";
    this.active = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.id = this.id.length > 0 ? this.id : this.componentId;
    this.setAttribute("role", "tabpanel");
  }
  handleActiveChange() {
    this.setAttribute("aria-hidden", this.active ? "false" : "true");
  }
  render() {
    return y$1`
      <slot
        part="base"
        class=${o$9({
      "tab-panel": true,
      "tab-panel--active": this.active
    })}
      ></slot>
    `;
  }
};
SlTabPanel.styles = tab_panel_styles_default;
__decorateClass([
  e2$1({ reflect: true })
], SlTabPanel.prototype, "name", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTabPanel.prototype, "active", 2);
__decorateClass([
  watch$1("active")
], SlTabPanel.prototype, "handleActiveChange", 1);
SlTabPanel = __decorateClass([
  e$9("sl-tab-panel")
], SlTabPanel);

// src/components/tag/tag.styles.ts
var tag_styles_default = i$8`
  ${component_styles_default}

  :host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
  }

  /*
   * Variant modifiers
   */

  .tag--primary {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-200);
    color: var(--sl-color-primary-800);
  }

  .tag--primary:active > sl-icon-button {
    color: var(--sl-color-primary-600);
  }

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--success:active > sl-icon-button {
    color: var(--sl-color-success-600);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--neutral:active > sl-icon-button {
    color: var(--sl-color-neutral-600);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--warning:active > sl-icon-button {
    color: var(--sl-color-warning-600);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
  }

  .tag--danger:active > sl-icon-button {
    color: var(--sl-color-danger-600);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: var(--sl-button-font-size-small);
    height: calc(var(--sl-input-height-small) * 0.8);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
    padding: 0 var(--sl-spacing-x-small);
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`;

// src/components/tag/tag.ts
var SlTag = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.variant = "neutral";
    this.size = "medium";
    this.pill = false;
    this.removable = false;
  }
  handleRemoveClick() {
    this.emit("sl-remove");
  }
  render() {
    return y$1`
      <span
        part="base"
        class=${o$9({
      tag: true,
      "tag--primary": this.variant === "primary",
      "tag--success": this.variant === "success",
      "tag--neutral": this.variant === "neutral",
      "tag--warning": this.variant === "warning",
      "tag--danger": this.variant === "danger",
      "tag--text": this.variant === "text",
      "tag--small": this.size === "small",
      "tag--medium": this.size === "medium",
      "tag--large": this.size === "large",
      "tag--pill": this.pill,
      "tag--removable": this.removable
    })}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable ? y$1`
              <sl-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></sl-icon-button>
            ` : ""}
      </span>
    `;
  }
};
SlTag.styles = tag_styles_default;
__decorateClass([
  e2$1({ reflect: true })
], SlTag.prototype, "variant", 2);
__decorateClass([
  e2$1({ reflect: true })
], SlTag.prototype, "size", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTag.prototype, "pill", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlTag.prototype, "removable", 2);
SlTag = __decorateClass([
  e$9("sl-tag")
], SlTag);

// src/components/tooltip/tooltip.styles.ts
var tooltip_styles_default = i$8`
  ${component_styles_default}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip {
    --arrow-size: var(--sl-tooltip-arrow-size);
    --arrow-color: var(--sl-tooltip-background-color);
  }

  .tooltip::part(popup) {
    pointer-events: none;
    z-index: var(--sl-z-index-tooltip);
  }

  .tooltip[placement^='top']::part(popup) {
    transform-origin: bottom;
  }

  .tooltip[placement^='bottom']::part(popup) {
    transform-origin: top;
  }

  .tooltip[placement^='left']::part(popup) {
    transform-origin: right;
  }

  .tooltip[placement^='right']::part(popup) {
    transform-origin: left;
  }

  .tooltip__body {
    display: block;
    width: max-content;
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
    pointer-events: none;
  }
`;

// src/components/tooltip/tooltip.ts
var SlTooltip = class extends ShoelaceElement$1 {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController2(this);
    this.content = "";
    this.placement = "top";
    this.disabled = false;
    this.distance = 8;
    this.open = false;
    this.skidding = 0;
    this.trigger = "hover focus";
    this.hoist = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.updateComplete.then(() => {
      this.addEventListener("blur", this.handleBlur, true);
      this.addEventListener("focus", this.handleFocus, true);
      this.addEventListener("click", this.handleClick);
      this.addEventListener("keydown", this.handleKeyDown);
      this.addEventListener("mouseover", this.handleMouseOver);
      this.addEventListener("mouseout", this.handleMouseOut);
    });
  }
  firstUpdated() {
    this.body.hidden = !this.open;
    if (this.open) {
      this.popup.active = true;
      this.popup.reposition();
    }
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("blur", this.handleBlur, true);
    this.removeEventListener("focus", this.handleFocus, true);
    this.removeEventListener("click", this.handleClick);
    this.removeEventListener("keydown", this.handleKeyDown);
    this.removeEventListener("mouseover", this.handleMouseOver);
    this.removeEventListener("mouseout", this.handleMouseOut);
  }
  handleBlur() {
    if (this.hasTrigger("focus")) {
      this.hide();
    }
  }
  handleClick() {
    if (this.hasTrigger("click")) {
      if (this.open) {
        this.hide();
      } else {
        this.show();
      }
    }
  }
  handleFocus() {
    if (this.hasTrigger("focus")) {
      this.show();
    }
  }
  handleKeyDown(event) {
    if (this.open && event.key === "Escape") {
      event.stopPropagation();
      this.hide();
    }
  }
  handleMouseOver() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue("--show-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.show(), delay);
    }
  }
  handleMouseOut() {
    if (this.hasTrigger("hover")) {
      const delay = parseDuration(getComputedStyle(this).getPropertyValue("--hide-delay"));
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = window.setTimeout(() => this.hide(), delay);
    }
  }
  hasTrigger(triggerType) {
    const triggers = this.trigger.split(" ");
    return triggers.includes(triggerType);
  }
  async handleOpenChange() {
    if (this.open) {
      if (this.disabled) {
        return;
      }
      this.emit("sl-show");
      await stopAnimations(this.body);
      this.body.hidden = false;
      this.popup.active = true;
      const { keyframes, options } = getAnimation(this, "tooltip.show", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.emit("sl-after-show");
    } else {
      this.emit("sl-hide");
      await stopAnimations(this.body);
      const { keyframes, options } = getAnimation(this, "tooltip.hide", { dir: this.localize.dir() });
      await animateTo(this.popup.popup, keyframes, options);
      this.popup.active = false;
      this.body.hidden = true;
      this.emit("sl-after-hide");
    }
  }
  async handleOptionsChange() {
    if (this.hasUpdated) {
      await this.updateComplete;
      this.popup.reposition();
    }
  }
  handleDisabledChange() {
    if (this.disabled && this.open) {
      this.hide();
    }
  }
  async show() {
    if (this.open) {
      return void 0;
    }
    this.open = true;
    return waitForEvent(this, "sl-after-show");
  }
  async hide() {
    if (!this.open) {
      return void 0;
    }
    this.open = false;
    return waitForEvent(this, "sl-after-hide");
  }
  render() {
    return y$1`
      <sl-popup
        part="base"
        exportparts="
          popup:base__popup,
          arrow:base__arrow
        "
        class=${o$9({
      tooltip: true,
      "tooltip--open": this.open
    })}
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        strategy=${this.hoist ? "fixed" : "absolute"}
        flip
        shift
        arrow
      >
        <slot slot="anchor" aria-describedby="tooltip"></slot>

        <slot
          name="content"
          part="body"
          id="tooltip"
          class="tooltip__body"
          role="tooltip"
          aria-live=${this.open ? "polite" : "off"}
        >
          ${this.content}
        </slot>
      </sl-popup>
    `;
  }
};
SlTooltip.styles = tooltip_styles_default;
__decorateClass([
  i2$2("slot:not([name])")
], SlTooltip.prototype, "defaultSlot", 2);
__decorateClass([
  i2$2(".tooltip__body")
], SlTooltip.prototype, "body", 2);
__decorateClass([
  i2$2("sl-popup")
], SlTooltip.prototype, "popup", 2);
__decorateClass([
  e2$1()
], SlTooltip.prototype, "content", 2);
__decorateClass([
  e2$1()
], SlTooltip.prototype, "placement", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTooltip.prototype, "disabled", 2);
__decorateClass([
  e2$1({ type: Number })
], SlTooltip.prototype, "distance", 2);
__decorateClass([
  e2$1({ type: Boolean, reflect: true })
], SlTooltip.prototype, "open", 2);
__decorateClass([
  e2$1({ type: Number })
], SlTooltip.prototype, "skidding", 2);
__decorateClass([
  e2$1()
], SlTooltip.prototype, "trigger", 2);
__decorateClass([
  e2$1({ type: Boolean })
], SlTooltip.prototype, "hoist", 2);
__decorateClass([
  watch$1("open", { waitUntilFirstUpdate: true })
], SlTooltip.prototype, "handleOpenChange", 1);
__decorateClass([
  watch$1("content"),
  watch$1("distance"),
  watch$1("hoist"),
  watch$1("placement"),
  watch$1("skidding")
], SlTooltip.prototype, "handleOptionsChange", 1);
__decorateClass([
  watch$1("disabled")
], SlTooltip.prototype, "handleDisabledChange", 1);
SlTooltip = __decorateClass([
  e$9("sl-tooltip")
], SlTooltip);
setDefaultAnimation("tooltip.show", {
  keyframes: [
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1 }
  ],
  options: { duration: 150, easing: "ease" }
});
setDefaultAnimation("tooltip.hide", {
  keyframes: [
    { opacity: 1, scale: 1 },
    { opacity: 0, scale: 0.8 }
  ],
  options: { duration: 150, easing: "ease" }
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3=window,e$8=t$3.ShadowRoot&&(void 0===t$3.ShadyCSS||t$3.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$6=Symbol(),n$7=new WeakMap;let o$7 = class o{constructor(t,e,n){if(this._$cssResult$=!0,n!==s$6)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$8&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=n$7.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&n$7.set(s,t));}return t}toString(){return this.cssText}};const r$3=t=>new o$7("string"==typeof t?t:t+"",void 0,s$6),i$4=(t,...e)=>{const n=1===t.length?t[0]:e.reduce(((e,s,n)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1]),t[0]);return new o$7(n,t,s$6)},S$1=(s,n)=>{e$8?s.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((e=>{const n=document.createElement("style"),o=t$3.litNonce;void 0!==o&&n.setAttribute("nonce",o),n.textContent=e.cssText,s.appendChild(n);}));},c$2=e$8?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$3(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$5;const e$7=window,r$2=e$7.trustedTypes,h$3=r$2?r$2.emptyScript:"",o$6=e$7.reactiveElementPolyfillSupport,n$6={toAttribute(t,i){switch(i){case Boolean:t=t?h$3:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},a$2=(t,i)=>i!==t&&(i==i||t==t),l$6={attribute:!0,type:String,converter:n$6,reflect:!1,hasChanged:a$2};let d$1 = class d extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u();}static addInitializer(t){var i;this.finalize(),(null!==(i=this.h)&&void 0!==i?i:this.h=[]).push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Ep(s,i);void 0!==e&&(this._$Ev.set(e,s),t.push(e));})),t}static createProperty(t,i=l$6){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||l$6}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(c$2(i));}else void 0!==i&&s.push(c$2(i));return s}static _$Ep(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$ES)&&void 0!==i?i:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$ES)||void 0===i||i.splice(this._$ES.indexOf(t)>>>0,1);}_$Eg(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Ei.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return S$1(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$EO(t,i,s=l$6){var e;const r=this.constructor._$Ep(t,s);if(void 0!==r&&!0===s.reflect){const h=(void 0!==(null===(e=s.converter)||void 0===e?void 0:e.toAttribute)?s.converter:n$6).toAttribute(i,s.type);this._$El=t,null==h?this.removeAttribute(r):this.setAttribute(r,h),this._$El=null;}}_$AK(t,i){var s;const e=this.constructor,r=e._$Ev.get(t);if(void 0!==r&&this._$El!==r){const t=e.getPropertyOptions(r),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:n$6;this._$El=r,this[r]=h.fromAttribute(i,t.type),this._$El=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||a$2)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$E_=this._$Ej());}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,i)=>this[i]=t)),this._$Ei=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$Ek();}catch(t){throw i=!1,this._$Ek(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$ES)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return !0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,i)=>this._$EO(i,this[i],t))),this._$EC=void 0),this._$Ek();}updated(t){}firstUpdated(t){}};d$1.finalized=!0,d$1.elementProperties=new Map,d$1.elementStyles=[],d$1.shadowRootOptions={mode:"open"},null==o$6||o$6({ReactiveElement:d$1}),(null!==(s$5=e$7.reactiveElementVersions)&&void 0!==s$5?s$5:e$7.reactiveElementVersions=[]).push("1.6.1");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2;const i$3=window,s$4=i$3.trustedTypes,e$6=s$4?s$4.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$5=`lit$${(Math.random()+"").slice(9)}$`,n$5="?"+o$5,l$5=`<${n$5}>`,h$2=document,r$1=(t="")=>h$2.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c$1=t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a$1=/-->/g,f$1=/>/g,_=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,p=/"/g,$$1=/^(?:script|style|textarea|title)$/i,g=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=g(1),x=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),T=new WeakMap,A=h$2.createTreeWalker(h$2,129,null,!1),E=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,g=0;for(;g<s.length&&(d.lastIndex=g,u=d.exec(s),null!==u);)g=d.lastIndex,d===v?"!--"===u[1]?d=a$1:void 0!==u[1]?d=f$1:void 0!==u[2]?($$1.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:v,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?p:m):d===p||d===m?d=_:d===a$1||d===f$1?d=v:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===v?s+l$5:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$5+y):s+o$5+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return [void 0!==e$6?e$6.createHTML(u):u,n]};class C{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=E(t,i);if(this.el=C.createElement(v,e),A.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=A.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$5)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$5),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?M:"?"===i[1]?k:"@"===i[1]?H:S});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($$1.test(l.tagName)){const t=l.textContent.split(o$5),i=t.length-1;if(i>0){l.textContent=s$4?s$4.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r$1()),A.nextNode(),c.push({type:2,index:++h});l.append(t[i],r$1());}}}else if(8===l.nodeType)if(l.data===n$5)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$5,t+1));)c.push({type:7,index:h}),t+=o$5.length-1;}h++;}}static createElement(t,i){const s=h$2.createElement("template");return s.innerHTML=t,s}}function P(t,i,s=t,e){var o,n,l,h;if(i===x)return i;let r=void 0!==e?null===(o=s._$Co)||void 0===o?void 0:o[e]:s._$Cl;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Co)&&void 0!==l?l:h._$Co=[])[e]=r:s._$Cl=r),void 0!==r&&(i=P(t,r._$AS(t,i.values),r,e)),i}class V{constructor(t,i){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h$2).importNode(s,!0);A.currentNode=o;let n=A.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new N(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new I(n,this,t)),this.u.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=A.nextNode(),l++);}return o}p(t){let i=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class N{constructor(t,i,s,e){var o;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cm=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=P(this,t,i),d(t)?t===b||null==t||""===t?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==x&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):c$1(t)?this.k(t):this.g(t);}O(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}g(t){this._$AH!==b&&d(this._$AH)?this._$AA.nextSibling.data=t:this.T(h$2.createTextNode(t)),this._$AH=t;}$(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=C.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.p(s);else {const t=new V(o,this),i=t.v(this.options);t.p(s),this.T(i),this._$AH=t;}}_$AC(t){let i=T.get(t.strings);return void 0===i&&T.set(t.strings,i=new C(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new N(this.O(r$1()),this.O(r$1()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cm=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class S{constructor(t,i,s,e,o){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=P(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=P(this,e[s+l],i,l),h===x&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===b?t=b:t!==b&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.j(t);}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class M extends S{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===b?void 0:t;}}const R=s$4?s$4.emptyScript:"";class k extends S{constructor(){super(...arguments),this.type=4;}j(t){t&&t!==b?this.element.setAttribute(this.name,R):this.element.removeAttribute(this.name);}}class H extends S{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=P(this,t,i,0))&&void 0!==s?s:b)===x)return;const e=this._$AH,o=t===b&&e!==b||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==b&&(e===b||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class I{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){P(this,t);}}const z=i$3.litHtmlPolyfillSupport;null==z||z(C,N),(null!==(t$2=i$3.litHtmlVersions)&&void 0!==t$2?t$2:i$3.litHtmlVersions=[]).push("2.6.1");const Z=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new N(i.insertBefore(r$1(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$4,o$4;let s$3 = class s extends d$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Z(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1);}render(){return x}};s$3.finalized=!0,s$3._$litElement$=!0,null===(l$4=globalThis.litElementHydrateSupport)||void 0===l$4||l$4.call(globalThis,{LitElement:s$3});const n$4=globalThis.litElementPolyfillSupport;null==n$4||n$4({LitElement:s$3});(null!==(o$4=globalThis.litElementVersions)&&void 0!==o$4?o$4:globalThis.litElementVersions=[]).push("3.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e$5=e=>n=>"function"==typeof n?((e,n)=>(customElements.define(e,n),n))(e,n):((e,n)=>{const{kind:t,elements:s}=n;return {kind:t,elements:s,finisher(n){customElements.define(e,n);}}})(e,n);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2=(i,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(n){n.createProperty(e.key,i);}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this));},finisher(n){n.createProperty(e.key,i);}};function e$4(e){return (n,t)=>void 0!==t?((i,e,n)=>{e.constructor.createProperty(n,i);})(e,n,t):i$2(e,n)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t$1(t){return e$4({...t,state:!0})}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$3=({finisher:e,descriptor:t})=>(o,n)=>{var r;if(void 0===n){const n=null!==(r=o.originalKey)&&void 0!==r?r:o.key,i=null!=t?{kind:"method",placement:"prototype",key:n,descriptor:t(o.key)}:{...o,key:n};return null!=e&&(i.finisher=function(t){e(t,n);}),i}{const r=o.constructor;void 0!==t&&Object.defineProperty(o,n,t(n)),null==e||e(r,n);}};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function i$1(i,n){return o$3({descriptor:o=>{const t={get(){var o,n;return null!==(n=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==n?n:null},enumerable:!0,configurable:!0};if(n){const n="symbol"==typeof o?Symbol():"__"+o;t.get=function(){var o,t;return void 0===this[n]&&(this[n]=null!==(t=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(i))&&void 0!==t?t:null),this[n]};}return t}})}

/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var n$3;null!=(null===(n$3=window.HTMLSlotElement)||void 0===n$3?void 0:n$3.prototype.assignedElements)?(o,n)=>o.assignedElements(n):(o,n)=>o.assignedNodes(n).filter((o=>o.nodeType===Node.ELEMENT_NODE));

const Shared = i$4 `
* { box-sizing: border-box; }

sl-dropdown sl-button sl-icon[slot="suffix"] {
	font-size: 1rem;
	transition: var(--sl-transition-medium) transform ease; }
sl-dropdown[disabled] sl-button sl-icon[slot="suffix"] {
	display: none; }
sl-dropdown[open] sl-button sl-icon[slot="suffix"] {
  transform: rotate(-180deg); }

sl-dropdown sl-menu-item::part(label) {
	width: max-content;
	max-width: 35rem;
	white-space: normal;
	font-size: 0.9rem;
}

sl-dropdown sl-menu-item::part(base) {
	--sl-color-neutral-700: var(--sl-color-neutral-900); }
sl-dropdown sl-menu-item[checked]::part(label) {
	--sl-color-neutral-700: var(--sl-color-neutral-1000);
	font-weight: bold;
}

sl-radio-group::part(form-control) { margin: unset; }

/* TODO figure out how to theme icon colors without breaking app overrides */
sl-button:not([variant="default"]) sl-icon {
	--icon-fill: currentColor;
}
`;

const style$5 = i$4 `
:host {
	height: 100vw; width: 100%;
	display: flex; flex-direction: column; gap: 1.5rem;

	--sl-transition-medium: 200ms;
	/* SVG icons TODO move to theme
	* https://shoelace.style/components/icon?id=icon-libraries
	* We set it here so we can override it later with a gradient URL as needed.
	* Only used if explicitly set by the app when registering icon libraries */
	--icon-gradient-start: var(--sl-color-primary-400);
	--icon-gradient-end: var(--sl-color-primary-800);
	--icon-fill: currentColor;
	--icon-fill: url(#global-svg-gradient);
}
.centre {
	margin-left: auto; margin-right: auto;
}
`;
const cards = i$4 `
sl-card { flex: 1 0 15rem; max-width: 25rem; }
sl-card {
	--border-radius: var(--sl-border-radius-large);
	--gradientDegree: 135deg;
	--tp-card-decorative-bg: var(--gradient-1);
}
sl-card[variant="subtle"]::part(base) {
	box-shadow: 1px 2px 4px 0 var(--hsla-start), 4px 8px 14px 2px var(--hsla-end);
}
:is(sl-card[variant="subtle"], sl-card[variant="outline"]) {
	--start: 52, 86%, 54%;
	--end: 9, 100%, 67%;
	--alpha: 20%;
	--hsl-start: hsl(var(--start));
	--hsl-end: hsl(var(--end));
	--hsla-start: hsla(var(--start), var(--alpha));
	--hsla-end: hsla(var(--end), var(--alpha));
}

h1, h2, h3, h4, p { margin: 0; margin-bottom: 0.5rem; }
p:last-child { margin-bottom: 0; }

/* TODO move this to theme customization */
:is(sl-card[variant="subtle"], sl-card[variant="outline"]) :is(h1,h2,h3,h4,strong) {
	color: transparent;
	background: linear-gradient(var(--gradientDegree),var(--hsl-start) 0,var(--hsl-end) 100%);
	background-clip: text;
	-webkit-background-clip: text;
}
`;
/*
TODO type CardOptions = {
    TextHeaderOrBold:
        | { type: "inherit" }
        | { type: "override"; Override: | 0 | 50 | 100 | 200 | 800 | 900 | 950 | 1000 }
        | { type: "transparent"; Gradient: ?? }
}
*/
let _ele$4 = class _ele extends s$3 {
    render() {
        return y `
<top-bar></top-bar>

<div class="centre" style="display: inline-flex; gap: 2rem;">
	<mode-contrast-body></mode-contrast-body>
	<mode-contrast-panel></mode-contrast-panel>
	<mode-contrast-text></mode-contrast-text>
</div>

<tab-color-editor-group class="centre"></tab-color-editor-group>

<sl-divider
	style="
	--width: 2px;
	--start: 52, 86%, 54%;
	--end: 9, 100%, 67%;
	--color: linear-gradient(135deg
		,hsla(var(--end), 0%) 0%
		,hsla(var(--end), 40%) 19%
		,hsla(var(--start), 100%) 29%
		,hsla(var(--start), 70%) 35%
		,hsla(var(--end), 50%) 45%
		,hsla(var(--end), 15%) 70%
		,hsla(var(--end), 0%) 100%
	);">
</sl-divider>

<div class="centre" style="display: flex; flex-direction: column; gap: 2rem;">
	<div style="width: 100%">
		<select-gradient></select-gradient>
		<br>Card theming not yet implemented. Coming soon!
		<br>Figuring out gradients and box shadows first.
	</div>

	<div style="display: inline-flex; gap: 2rem; flex-wrap: wrap;">
		<sl-card variant="subtle">
			<div slot="header" style="display: flex; align-items: center;">
				<h4 style="flex-grow: 1;">Subtle</h4>
				<sl-tooltip>
					<div slot="content">
						Default card type, providing a high-contrast background. May contain a stretched image.
						<br>
						<br>
						May apply a box shadow, depending on card state and theme.
					</div>
					<sl-icon name="info" library="fa"
						style="font-size: var(--sl-font-size-large);"
					></sl-icon>
				</sl-tooltip>
			</div>
			${sampleText()}
		</sl-card>

		<sl-card variant="outline">
			<div slot="header" style="display: flex; align-items: center;">
				<h4 style="flex-grow: 1;">Outline</h4>
				<sl-tooltip>
					<div slot="content">
						Pops more than box-shadows. Useful for showing states like active, dragging, or dragover.
						<br>
						<br>
						Replaces the box shadow with a border, and may apply fancier text/icon color.
					</div>
					<sl-icon name="info" library="fa"
						style="font-size: var(--sl-font-size-large);"
					></sl-icon>
				</sl-tooltip>
			</div>
			${sampleText()}
		</sl-card>

		<sl-card variant="decorative">
			<div slot="header" style="display: flex; align-items: center;">
				<h4 style="flex-grow: 1;">Decorative</h4>
				<sl-tooltip>
					<div slot="content">
						Useful for modals, specials offers, and other one-off cards.
						<br>
						<br>
						Themes should apply CSS gradients or SVG backgrounds.
					</div>
					<sl-icon name="info" library="fa"
						style="font-size: var(--sl-font-size-large);"
					></sl-icon>
				</sl-tooltip>
			</div>
			${sampleText()}
		</sl-card>
	</div>
</div>
`;
    }
};
_ele$4.styles = [Shared, style$5, cards];
_ele$4 = __decorate([
    e$5("app-root")
], _ele$4);
const sampleText = () => y `<p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>, sed do eiusmod <strong>tempor incididunt</strong> ut labore et dolore magna aliqua.</p>`;

/**
 * @license
 *
 * js - JavaScript library for color conversions
 *
 * Copyright (c) 2011-2017, Gregor Aisch
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * 3. The name Gregor Aisch may not be used to endorse or promote products
 *    derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL GREGOR AISCH OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
 * BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
 * EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
// tslint:disable:no-unnecessary-qualifier
const { abs, atan2, cos, floor, log, min, max, round, sign, sin, sqrt, cbrt, PI, hypot } = Math;
function lerp(a, b, f) {
    return a + (b - a) * f;
}
function lerpInv(a, b, f) {
    return (f - a) / (b - a);
}
function clamp(x, min = 0, max = 1) {
    return x < min ? min : x > max ? max : x;
}
function newtonIterate1d(f, xStart, max_steps, eps = 1e-8) {
    let x = xStart, fx;
    while (max_steps-- && abs((fx = f(x))) > eps) {
        const dfdx = (f(x + eps) - fx) / eps;
        console.log("fx / dfdx", fx / dfdx, "fx", fx, "x", x);
        x = x - fx / dfdx;
    }
    return x;
}
function bisect(f, a, b, steps) {
    //assert(a < b)
    let fA = f(a);
    // let fB = f(b)
    //assert(fA * fB < 0)
    while (steps--) {
        const c = (a + b) / 2;
        const fC = f(c);
        // console.log("fC", fC, "c", c)
        if (sign(fA) == sign(fC)) {
            a = c;
            fA = fC;
        }
        else {
            b = c;
            // fB = fC
        }
    }
    //assert(a <= (b + a) / 2)
    //assert(b >= (b + a) / 2)
    return (a + b) / 2;
}
const DEG2RAD = PI / 180;
const RAD2DEG = 180 / PI;
function color(...args) {
    if (args[0] instanceof Color) {
        return args[0];
    }
    if (args.length > 1 && "string" == typeof args[args.length - 1]) {
        return guess(args.slice(0, args.length - 1), args[args.length - 1]);
    }
    else if (Array.isArray(args[0])) {
        return guess(args[0]);
    }
    else {
        return guess(args);
    }
}
class Color {
    /** @internal */
    constructor(r, g, b, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    // public shade() {
    // 	const shades: [string, string, number][] = [
    // 		["ff0000", "red"],
    // 		["ffa500", "orange"],
    // 		["ffff00", "yellow"],
    // 		["008000", "green"],
    // 		["0000ff", "blue"],
    // 		["ee82ee", "violet"],
    // 		["a52a2a", "brown"],
    // 		["000000", "black"],
    // 		["808080", "grey"],
    // 		["ffffff", "white"],
    // 	] as any
    // 	function angleDiff(a: number, b: number) {
    // 		const d = (a - b) % 360
    // 		if (d > 180) return d - 360
    // 		if (d < -180) return d + 360
    // 		return d
    // 	}
    // 	shades.forEach(arr => arr.push(color(arr[0]).hsl()[0]))
    // 	const [h, s, l] = this.hsl()
    // 	if (l > 0.9) return "white"
    // 	if (l > 0.8 && s < 0.2) return "white"
    // 	if (s < 0.1) return "grey"
    // 	if (s < 0.4 && h > 0 && h < 48) return "brown"
    // 	const distanceInXYZ: { [hue: number]: number } = { 0: 0 }
    // 	for (let i = 60; i <= 360; i += 60) {
    // 		distanceInXYZ[i] =
    // 			distanceInXYZ[i - 60] + distance(hsl(i - 60, 1, 0.5), hsl(i, 1, 0.5), "xyz")
    // 	}
    // 	// console.log(distanceInXYZ)
    // 	const shadeEnds: { [hue: number]: number } = {
    // 		0: 9,
    // 		38: 48,
    // 		60: 65,
    // 		120: 165,
    // 		240: 245,
    // 		300: 338,
    // 		360: 369,
    // 	}
    // 	const getColorDistanceAlongXYZHue = (hueDegrees: number) => {
    // 		const base = hueDegrees - (hueDegrees % 60)
    // 		return (
    // 			distanceInXYZ[base] + distance(hsl(base, 1, 0.5), hsl(hueDegrees, 1, 0.5), "xyz")
    // 		)
    // 	}
    // 	const colorXYZD = getColorDistanceAlongXYZHue(this.hsl()[0])
    // 	const md = distanceInXYZ[360]
    // 	const shadeHue =
    // 		(Object.keys(shadeEnds) as any[]).find(shadeHue => shadeEnds[shadeHue | 0] >= this.hsl()[0])! % 360
    // 	return shades.find(([_hex, _name, _hue]) => (_hue | 0) === shadeHue)![1]
    // 	// process.exit()
    // 	return withMax(shades, ([_hex, _name, _hue]) => {
    // 		return -abs(angleDiff(this.hsl()[0], _hue))
    // 	})[1]
    // 	return withMax(shades, ([_hex, _name, _hue]) => {
    // 		const [thisL, thisA, thisB] = this.lab()
    // 		const [L, A, B] = color(_hex).lab()
    // 		return -hypot(thisL - L, thisA - A, thisB - B)
    // 	})[1]
    // }
    /**
     * @see [[mix]]
     */
    mix(col2, f, m = "rgb") {
        return mix(this, col2, f, m);
    }
    rgb(doRound = true, clamp_ = true) {
        const f = (t) => {
            if (doRound)
                t = round(t);
            if (clamp_)
                t = clamp(t, 0, 255);
            return t;
        };
        const { r, g, b } = this;
        return [f(r), f(g), f(b)];
    }
    rgba(doRound = true, clamp_ = true) {
        const f = (t) => {
            if (doRound)
                t = round(t);
            if (clamp_)
                t = clamp(t, 0, 255);
            return t;
        };
        const { r, g, b, a } = this;
        return [f(r), f(g), f(b), a];
    }
    /**
     * Return a hex-string representation of this color.
     *
     * @param mode
     * @see #num for a hex-number representation.
     * @example chroma.color('yellow').alpha(0.7).hex()
     * @example chroma.color('yellow').alpha(0.7).hex('rgba')
     * @example chroma.color('yellow').alpha(0.7).hex('argb')
     */
    hex(mode = "rgb") {
        const { r, g, b, a } = this;
        return rgb2hex(r, g, b, a, mode);
    }
    /**
     * Returns the [HSL] representation of this color. hue will always be in [0;360). Values are never NaN.
     *
     * @example chroma.color('purple').hsl()
     */
    hsl() {
        const { r, g, b } = this;
        return rgb2hsl(r, g, b);
    }
    /**
     * Returns the [HSL] representation of this color. hue will always be in [0;360). Values are never NaN.
     *
     * @example chroma.color('purple').hsv()
     */
    hsv() {
        const { r, g, b } = this;
        return rgb2hsv(r, g, b);
    }
    /**
     * Returns the [HSL] representation of this color. hue will always be in [0;360). Values are never NaN.
     *
     * @example chroma.color('purple').hcg()
     */
    hcg() {
        const { r, g, b } = this;
        return rgb2hcg(r, g, b);
    }
    /**
     * Returns a CSS `rgb(...)` or `hsl(...)` string representation that can be used as CSS-color definition. The alpha
     * value is not output if it 1.
     * @example chroma.color('teal').css() // == "rgb(0,128,128)"
     * @example chroma.color('teal').alpha(0.5).css() // == "rgba(0,128,128,0.5)"
     * @example chroma.color('teal').css('hsl') // == "hsl(180,100%,25.1%)"
     */
    css(mode = "rgb") {
        if ("rgb" == mode) {
            const { r, g, b, a } = this;
            return rgb2css(r, g, b, a);
        }
        else if ("hsl" == mode) {
            return hsl2css(this.hsl(), this.alpha());
        }
        else {
            throw new Error();
        }
    }
    name(closest = false) {
        const thisNum = this.num();
        const name = Object.keys(w3cx11).find((name) => w3cx11[name] == thisNum);
        if (!name && closest) {
            const [thisLStar, thisAStar, thisBStar] = this.lab();
            return withMax(Object.keys(w3cx11), (name) => {
                const [lStar, aStar, bStar] = num(w3cx11[name]).lab();
                return -hypot(thisLStar - lStar, thisAStar - aStar, thisBStar - bStar);
            });
        }
        return name;
    }
    /**
     * Get the [CMYK](#CMYK) representation of this color.
     *
     * @example chroma.color('red').cmyk()
     */
    cmyk() {
        const { r, g, b } = this;
        return rgb2cmyk(r, g, b);
    }
    /**
     * Returns the [GL] representation of this color.
     * @example chroma.color('33cc00').gl()
     */
    gl() {
        const { r, g, b, a } = this;
        return [r / 255, g / 255, b / 255, a];
    }
    luminance(lum1) {
        const { r, g, b, a } = this;
        const [, Y] = rgb2xyz(r, g, b);
        if (undefined === lum1) {
            return Y;
        }
        const inverseLerp = (a, b, val) => (val - a) / (b - a);
        if (lum1 > Y) {
            // lerp to white
            return mix(this, white, inverseLerp(Y, 1, lum1), "xyz").alpha(a);
        }
        else {
            // lerp to black
            return mix(black, this, inverseLerp(0, Y, lum1), "xyz").alpha(a);
        }
    }
    /**
     * Get color temperature of this color in Kelvin. This only makes sense for colors close to those output by
     * kelvin
     *
     * @example [c = chroma.color('#ff3300'), c.temperature()]
     * @example [c = chroma.color('#ffe3cd'), c.temperature()]
     * @example [c = chroma.color('#b3ccff'), c.temperature()]
     */
    temperature() {
        const { r, g, b } = this;
        return rgb2kelvin(r, g, b);
    }
    /**
     * Returns a new [Color] with a channel changed.
     * @example chroma.color('skyblue').set('hsl.h', 0) // change hue to 0 deg (=red)
     * @example chroma.color('hotpink').set('lch.c', 30) // set chromaticity to 30
     * @example chroma.color('orangered').set('lab.l', x => x / 2) // half Lab lightness
     * @example chroma.color('darkseagreen').set('lch.c', x => x * 2) // double Lch saturation
     */
    set(modeAndChannel, value) {
        const [mode, channel] = modeAndChannel.split(".");
        const src = this[mode]();
        const i = mode.indexOf(channel);
        if (-1 == i)
            throw new Error("invalid channel");
        src[i] = "number" == typeof value ? value : value(src[i]);
        return color(src, mode).alpha(this.a);
    }
    /**
     * Returns whether this color is outside the RGB color cube and will be clipped/clamped when calling .rgb()
     *
     * @example [c = chroma.lch( 20, 40, 50), c.clipped()]
     * @example [c = chroma.lch( 40, 40, 50), c.clipped()]
     * @example [c = chroma.lch( 60, 40, 50), c.clipped()]
     * @example [c = chroma.lch( 80, 40, 50), c.clipped()]
     * @example [c = chroma.lch(100, 40, 50), c.clipped()]
     */
    clipped() {
        const { r, g, b } = this;
        return !(0 <= r && r <= 255 && 0 <= g && g <= 255 && 0 <= b && b <= 255);
    }
    /**
     * Returns black or white, whichever has the highest contrast to `this`.
     * In the readme you should see the result of this.
     *
     * @example chroma.color('red')
     * @example chroma.color('yellow')
     */
    textColor() {
        return this.luminance() > 0.5 ? black : white;
    }
    alpha(alpha1) {
        if (undefined === alpha1) {
            return this.a;
        }
        const { r, g, b } = this;
        return rgb(r, g, b, alpha1);
    }
    darker(amount = 1) {
        const [l, a, b] = this.lab();
        return lab(l - LAB_Kn * amount, a, b, this.alpha());
    }
    /**
     *
     * @param amount
     * @example chroma.color('hotpink')
     * @example chroma.color('hotpink').brighter()
     * @example chroma.color('hotpink').brighter(2)
     * @example chroma.color('hotpink').brighter(3)
     */
    brighter(amount = 1) {
        return this.darker(-amount);
    }
    /**
     * Returns a new [Color] with increased saturation.
     * @param amount How much.
     * @example chroma.color('slategray')
     * @example chroma.color('slategray').saturate()
     * @example chroma.color('slategray').saturate(2)
     * @example chroma.color('slategray').saturate(3)
     */
    saturate(amount = 1) {
        const [l, c, h] = this.lch();
        return lch(l, max(0, c + amount * LAB_Kn), h, this.alpha());
    }
    /**
     * Equivalent to `saturate(-amount)`.
     * @see #saturate
     */
    desaturate(amount = 1) {
        return this.saturate(-amount);
    }
    premultiplied() {
        const { r, g, b, a } = this;
        return rgb(r * a, g * a, b * a, a);
    }
    /**
     * Returns the [HSI] representation of this color. hue will always be in [0; 360). Values are never NaN.
     *
     * @example chroma.color('purple').hsi()
     */
    hsi() {
        const { r, g, b } = this;
        return rgb2hsi(r, g, b);
    }
    /**
     * Returns the [LAB] representation of this color.
     *
     * @example chroma.color('purple').lab()
     */
    lab() {
        const { r, g, b } = this;
        return rgb2lab(r, g, b);
    }
    /**
     * Return a hex-num of this color.
     *
     * @param mode
     * @see #num for a hex-number representation.
     * @example chroma.color('yellow').alpha(0.7).hex()
     * @example chroma.color('yellow').alpha(0.7).hex('rgba')
     * @example chroma.color('yellow').alpha(0.7).hex('argb')
     */
    num(mode = "rgb") {
        const { r, g, b, a } = this;
        return rgb2num(r, g, b, a, mode);
    }
    /**
     * Returns the [LCH] representation of this color. hue will always be in [0; 360). Values are never NaN.
     *
     * @example chroma.color('purple').lch()
     */
    lch() {
        const { r, g, b } = this;
        return rgb2lch(r, g, b);
    }
    /**
     * Returns the [XYZ] representation of this color. hue will always be in [0; 360). Values are never NaN.
     *
     * @example chroma.color('purple').xyz()
     */
    xyz() {
        const { r, g, b } = this;
        return rgb2xyz(r, g, b);
    }
    /**
     * Whether this [Color](#Color) is identical (strict equality of r, g, b, a) to `color`.
     */
    equals(color) {
        const { r, g, b, a } = this;
        const { r: r2, g: g2, b: b2, a: a2 } = color;
        return r == r2 && g == g2 && b == b2 && a == a2;
    }
    hashCode() {
        return this.num("rgba");
    }
    /**
     * @example chroma.color('red').toSource() // == "rgb(255, 0, 0)"
     * @example chroma.rgb(-2, 100.02, 200, 0.5).toSource() // == "rgb(-2, 100.02, 200, 0.5)"
     */
    toSource() {
        const { r, g, b, a } = this;
        return "chroma.rgb(" + r + ", " + g + ", " + b + (a === 1 ? ")" : ", " + a + ")");
    }
}
Color.prototype.toString = Color.prototype.css;
Color.prototype.kelvin = Color.prototype.temperature;
/**
 * @example chroma.black
 */
const black = new Color(0, 0, 0, 1);
/**
 * @example chroma.black
 */
const white = new Color(255, 255, 255, 1);
const brewer = {
    OrRd: [0xfff7ec, 0xfee8c8, 0xfdd49e, 0xfdbb84, 0xfc8d59, 0xef6548, 0xd7301f, 0xb30000, 0x7f0000],
    PuBu: [0xfff7fb, 0xece7f2, 0xd0d1e6, 0xa6bddb, 0x74a9cf, 0x3690c0, 0x0570b0, 0x045a8d, 0x023858],
    BuPu: [0xf7fcfd, 0xe0ecf4, 0xbfd3e6, 0x9ebcda, 0x8c96c6, 0x8c6bb1, 0x88419d, 0x810f7c, 0x4d004b],
    Oranges: [0xfff5eb, 0xfee6ce, 0xfdd0a2, 0xfdae6b, 0xfd8d3c, 0xf16913, 0xd94801, 0xa63603, 0x7f2704],
    BuGn: [0xf7fcfd, 0xe5f5f9, 0xccece6, 0x99d8c9, 0x66c2a4, 0x41ae76, 0x238b45, 0x006d2c, 0x00441b],
    YlOrBr: [0xffffe5, 0xfff7bc, 0xfee391, 0xfec44f, 0xfe9929, 0xec7014, 0xcc4c02, 0x993404, 0x662506],
    YlGn: [0xffffe5, 0xf7fcb9, 0xd9f0a3, 0xaddd8e, 0x78c679, 0x41ab5d, 0x238443, 0x006837, 0x004529],
    Reds: [0xfff5f0, 0xfee0d2, 0xfcbba1, 0xfc9272, 0xfb6a4a, 0xef3b2c, 0xcb181d, 0xa50f15, 0x67000d],
    RdPu: [0xfff7f3, 0xfde0dd, 0xfcc5c0, 0xfa9fb5, 0xf768a1, 0xdd3497, 0xae017e, 0x7a0177, 0x49006a],
    Greens: [0xf7fcf5, 0xe5f5e0, 0xc7e9c0, 0xa1d99b, 0x74c476, 0x41ab5d, 0x238b45, 0x006d2c, 0x00441b],
    YlGnBu: [0xffffd9, 0xedf8b1, 0xc7e9b4, 0x7fcdbb, 0x41b6c4, 0x1d91c0, 0x225ea8, 0x253494, 0x081d58],
    Purples: [0xfcfbfd, 0xefedf5, 0xdadaeb, 0xbcbddc, 0x9e9ac8, 0x807dba, 0x6a51a3, 0x54278f, 0x3f007d],
    GnBu: [0xf7fcf0, 0xe0f3db, 0xccebc5, 0xa8ddb5, 0x7bccc4, 0x4eb3d3, 0x2b8cbe, 0x0868ac, 0x084081],
    Greys: [0xffffff, 0xf0f0f0, 0xd9d9d9, 0xbdbdbd, 0x969696, 0x737373, 0x525252, 0x252525, 0x000000],
    YlOrRd: [0xffffcc, 0xffeda0, 0xfed976, 0xfeb24c, 0xfd8d3c, 0xfc4e2a, 0xe31a1c, 0xbd0026, 0x800026],
    PuRd: [0xf7f4f9, 0xe7e1ef, 0xd4b9da, 0xc994c7, 0xdf65b0, 0xe7298a, 0xce1256, 0x980043, 0x67001f],
    Blues: [0xf7fbff, 0xdeebf7, 0xc6dbef, 0x9ecae1, 0x6baed6, 0x4292c6, 0x2171b5, 0x08519c, 0x08306b],
    PuBuGn: [0xfff7fb, 0xece2f0, 0xd0d1e6, 0xa6bddb, 0x67a9cf, 0x3690c0, 0x02818a, 0x016c59, 0x014636],
    Viridis: [0x440154, 0x482777, 0x3f4a8a, 0x31678e, 0x26838f, 0x1f9d8a, 0x6cce5a, 0xb6de2b, 0xfee825],
    Spectral: [
        0x9e0142,
        0xd53e4f,
        0xf46d43,
        0xfdae61,
        0xfee08b,
        0xffffbf,
        0xe6f598,
        0xabdda4,
        0x66c2a5,
        0x3288bd,
        0x5e4fa2,
    ],
    RdYlGn: [
        0xa50026,
        0xd73027,
        0xf46d43,
        0xfdae61,
        0xfee08b,
        0xffffbf,
        0xd9ef8b,
        0xa6d96a,
        0x66bd63,
        0x1a9850,
        0x006837,
    ],
    RdBu: [
        0x67001f,
        0xb2182b,
        0xd6604d,
        0xf4a582,
        0xfddbc7,
        0xf7f7f7,
        0xd1e5f0,
        0x92c5de,
        0x4393c3,
        0x2166ac,
        0x053061,
    ],
    PiYG: [
        0x8e0152,
        0xc51b7d,
        0xde77ae,
        0xf1b6da,
        0xfde0ef,
        0xf7f7f7,
        0xe6f5d0,
        0xb8e186,
        0x7fbc41,
        0x4d9221,
        0x276419,
    ],
    PRGn: [
        0x40004b,
        0x762a83,
        0x9970ab,
        0xc2a5cf,
        0xe7d4e8,
        0xf7f7f7,
        0xd9f0d3,
        0xa6dba0,
        0x5aae61,
        0x1b7837,
        0x00441b,
    ],
    RdYlBu: [
        0xa50026,
        0xd73027,
        0xf46d43,
        0xfdae61,
        0xfee090,
        0xffffbf,
        0xe0f3f8,
        0xabd9e9,
        0x74add1,
        0x4575b4,
        0x313695,
    ],
    BrBG: [
        0x543005,
        0x8c510a,
        0xbf812d,
        0xdfc27d,
        0xf6e8c3,
        0xf5f5f5,
        0xc7eae5,
        0x80cdc1,
        0x35978f,
        0x01665e,
        0x003c30,
    ],
    RdGy: [
        0x67001f,
        0xb2182b,
        0xd6604d,
        0xf4a582,
        0xfddbc7,
        0xffffff,
        0xe0e0e0,
        0xbababa,
        0x878787,
        0x4d4d4d,
        0x1a1a1a,
    ],
    PuOr: [
        0x7f3b08,
        0xb35806,
        0xe08214,
        0xfdb863,
        0xfee0b6,
        0xf7f7f7,
        0xd8daeb,
        0xb2abd2,
        0x8073ac,
        0x542788,
        0x2d004b,
    ],
    Set2: [0x66c2a5, 0xfc8d62, 0x8da0cb, 0xe78ac3, 0xa6d854, 0xffd92f, 0xe5c494, 0xb3b3b3],
    Accent: [0x7fc97f, 0xbeaed4, 0xfdc086, 0xffff99, 0x386cb0, 0xf0027f, 0xbf5b17, 0x666666],
    Set1: [0xe41a1c, 0x377eb8, 0x4daf4a, 0x984ea3, 0xff7f00, 0xffff33, 0xa65628, 0xf781bf, 0x999999],
    Set3: [
        0x8dd3c7,
        0xffffb3,
        0xbebada,
        0xfb8072,
        0x80b1d3,
        0xfdb462,
        0xb3de69,
        0xfccde5,
        0xd9d9d9,
        0xbc80bd,
        0xccebc5,
        0xffed6f,
    ],
    Dark2: [0x1b9e77, 0xd95f02, 0x7570b3, 0xe7298a, 0x66a61e, 0xe6ab02, 0xa6761d, 0x666666],
    Paired: [
        0xa6cee3,
        0x1f78b4,
        0xb2df8a,
        0x33a02c,
        0xfb9a99,
        0xe31a1c,
        0xfdbf6f,
        0xff7f00,
        0xcab2d6,
        0x6a3d9a,
        0xffff99,
        0xb15928,
    ],
    Pastel2: [0xb3e2cd, 0xfdcdac, 0xcbd5e8, 0xf4cae4, 0xe6f5c9, 0xfff2ae, 0xf1e2cc, 0xcccccc],
    Pastel1: [0xfbb4ae, 0xb3cde3, 0xccebc5, 0xdecbe4, 0xfed9a6, 0xffffcc, 0xe5d8bd, 0xfddaec, 0xf2f2f2],
};
/**
 * X11 color names
 * http://www.w3.org/TR/css3-color/#svg-color
 *
 * @example chroma.Object.keys(w3cx11).slice(0, 4)
 */
const w3cx11 = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflower: 0x6495ed,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    laserlemon: 0xffff54,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrod: 0xfafad2,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    maroon2: 0x7f0000,
    maroon3: 0xb03060,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    purple2: 0x7f007f,
    purple3: 0xa020f0,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32,
};
/**
 * Create a valid RGB color (`.clipped() == false`) from a random point in the CIELAB color space. This results in
 * more colors in the RGB color space where humans can perceive more differences.
 * @param randomSource A function which returns random `number`s in the interval [0; 1). Useful if you want to
 *     create a deterministic sequence of "random" colors. Defaults to `Math.random`.
 * @example chroma.random((() => { let i = 0; return () => (i = (i *Math.SQRT2) % 1); })())
 */
// export function randomLab(randomSource = Math.random) {
// 	const labAMin = -87,
// 		labAMax = 99,
// 		labBMin = -108,
// 		labBMax = 95
// 	let maxIterations = 100
// 	while (maxIterations--) {
// 		const u = randomSource(),
// 			v = randomSource(),
// 			w = randomSource()
// 		// The following matrix multiplication transform the random point (u v w) in the unit cube into the
// 		// oriented bounding box (OBB) of the projection of the RGB space into the LAB space. This is necessary to
// 		// avoid a huge number of misses.
// 		const color = lab(
// 			u * -53.903 + v * -88.755 + w * 71.7 + 99.707,
// 			u * -82.784 + v * 187.036 + w * -2.422 + -28.17,
// 			u * -75.813 + v * -141.406 + w * -48.261 + 152.469,
// 		)
// 		console.log(color.lab())
// 		console.log(color.rgba(false, false))
// 		if (!color.clipped()) return color
// 	}
// 	throw new Error("Could find a random color in 100 iterations")
// }
/**
 * Mixes two colors. The mix ratio is a value between 0 and 1.
 * The color mixing produces different results based the color space used for interpolation.
 *
 * @param col2
 * @param f
 * @param m
 * @example chroma.mix('red', 'blue')
 * @example chroma.mix('red', 'blue', 0.25)
 * @example chroma.mix('red', 'blue', 0.75)
 *
 * @example chroma.mix('red', 'blue', 0.5, 'rgb')
 * @example chroma.mix('red', 'blue', 0.5, 'hsl')
 * @example chroma.mix('red', 'blue', 0.5, 'lab')
 * @example chroma.mix('red', 'blue', 0.5, 'lch')
 * @example chroma.mix('red', 'blue', 0.5, 'lrgb')
 */
function mix(col1, col2, f = 0.5, m = "rgb") {
    const c1 = color(col1);
    const c2 = color(col2);
    const res = interpolators[m] && interpolators[m](c1, c2, f, m);
    if (!res) {
        throw new Error("color mode " + m + " is not supported");
    }
    return res.alpha(lerp(c1.alpha(), c2.alpha(), f));
}
function lch(...args) {
    return guess(args, "lch");
}
function hsl(...args) {
    return guess(args, "hsl");
}
function lab(...args) {
    return guess(args, "lab");
}
/**
 * @example chroma.num(0x663399) // rebeccapurple
 */
function num(num) {
    const [r, g, b] = num2rgb(num);
    return new Color(r, g, b);
}
function rgb(...args) {
    return guess(args, "rgb");
}
function scale(...args) {
    const f = ((t) => f._at(t));
    Object.getOwnPropertyNames(Scale.prototype).forEach((key) => (f[key] = Scale.prototype[key]));
    if (Array.isArray(args[0]))
        args = args[0];
    if (args.length == 1 && "string" == typeof args[0])
        args = brewer[args[0]];
    f._init("function" == typeof args[0] ? args[0] : args.map((a) => color(a)));
    //f.setColors(args.length > 1 ? args : args[0])
    return f;
}
class Scale {
    classes(classes) {
        if (undefined === classes) {
            return this._classes;
        }
        if (Array.isArray(classes)) {
            this._classes = classes;
            this.domain(classes[0], classes[classes.length - 1]);
        }
        else {
            if (classes % 1 != 0 || classes < 1)
                throw new Error("invalid classes param");
            // const d = analyze(this.domain())
            this._classes = limits(this.domain(), "e", classes);
        }
        return this;
    }
    domain(...domain) {
        if (undefined === domain[0]) {
            return "function" !== typeof this._colors
                ? this._pos.map((p) => lerp(this._min, this._max, p))
                : [this._min, this._max];
        }
        this._min = domain[0];
        this._max = domain[domain.length - 1];
        if (2 == domain.length) {
            if ("function" !== typeof this._colors) {
                // equidistant positions
                this._pos = this._colors.map((_, c) => c / (this._colors.length - 1));
            }
        }
        else if ("function" !== typeof this._colors && domain.length == this._colors.length) {
            this._pos = domain.map((d) => lerpInv(this._min, this._max, d));
        }
        else {
            throw new Error("invalid domain " + domain);
        }
        return this;
    }
    mode(mode) {
        if (undefined === mode) {
            return this._mode;
        }
        this._mode = mode;
        this._resetCache();
        return this;
    }
    /**
     * Set the output format return by `this(x)` and `this.colors(n)`.
     * @param outputFormat The color format to use. Pass `undefined` to return [Color] objects.
     * @return `this`
     * @example chroma.scale("red", "white").out("hex")(0) // == "#ff0000"
     * @example chroma.scale("red", "white").out("num").colors(2) // == [0xff0000, 0xffffff]
     */
    out(outputFormat) {
        this._out = outputFormat;
        return this;
    }
    /**
     * This makes sure the lightness range is spread evenly across a color scale. Especially useful when working
     * with [multi-hue color scales](https://www.vis4.net/blog/2013/09/mastering-multi-hued-color-scales/), where
     * simple gamma correction can't help you very much.
     *
     * @example chroma.scale('black','red','yellow','white')
     * @example chroma.scale('black','red','yellow','white').correctLightness()
     */
    correctLightness(enableCorrectLightness = true) {
        if (this._correctLightness != enableCorrectLightness) {
            this._resetCache();
            const colors = this._colors;
            if (enableCorrectLightness && "function" !== typeof colors) {
                // make sure that the colors have ascending or descending lightnesses
                let sign = 0;
                for (let i = 1; i < colors.length; i++) {
                    const sign2 = colors[i].lab()[0] - colors[i - 1].lab()[0];
                    if (0 == sign) {
                        sign = sign2;
                    }
                    else if (sign * sign2 < 0) {
                        throw new Error("scale color lightnesses must be monotonic");
                    }
                }
            }
        }
        this._correctLightness = enableCorrectLightness;
        return this;
    }
    padding(paddingLeft, paddingRight = paddingLeft) {
        if (!paddingLeft) {
            return [this._paddingLeft, this._paddingRight];
        }
        this._paddingLeft = paddingLeft;
        this._paddingRight = paddingRight;
        return this;
    }
    /**
     * Get a number of equidistant colors.
     * @param numColors The number of colors to return.
     * @param format Output format. Defaults to `"hex"`. Pass `"color"` to get {@link Color} objects.
     * @returns If `numColors` is `undefined`, the colors which define this [Scale]. If `numColors` is 1,
     * `[this((min + max) / 2)]`. Otherwise, an array where the first element is `this(min)`, the last one is
     * `this(max)` and the rest are equidistant samples between min and max.
     * @example chroma.scale('OrRd').colors(5)
     * @example chroma.scale(['white', 'black']).colors(12)
     */
    colors(numColors, format = "hex") {
        let result;
        if (undefined === numColors) {
            result = this._colors.slice();
        }
        else if (numColors == 1) {
            result = [this._color((this._min + this._max) / 2)];
        }
        else if (numColors > 1) {
            result = Array.from({ length: numColors }, (_, i) => this._color(lerp(this._min, this._max, i / (numColors - 1))));
        }
        else {
            // returns all colors based on the defined classes
            let samples;
            if (this._classes && this._classes.length > 2) {
                samples = Array.from({ length: this._classes.length - 1 }, (_, i) => (this._classes[i] + this._classes[i + 1]) * 0.5);
            }
            else {
                samples = this.domain(); // TODO?!
            }
            result = samples.map((s) => this._color(s));
        }
        return (format != "color" ? result.map((c) => c[format]()) : result);
    }
    cache(enableCache) {
        if (undefined === enableCache) {
            return !!this._cache;
        }
        this._cache = enableCache ? this._cache || new Map() : undefined;
        return this;
    }
    gamma(gamma) {
        if (undefined === gamma) {
            return this._gamma;
        }
        this._gamma = gamma;
        return this;
    }
    /**
     * @ignore
     */
    _at(t) {
        const c = this._color(t);
        return this._out ? c[this._out]() : c;
    }
    /**
     * @ignore
     */
    _init(colorsOrFunction) {
        this._colors = colorsOrFunction;
        if ("function" != typeof colorsOrFunction) {
            this._pos = colorsOrFunction.map((_, i) => i / (colorsOrFunction.length - 1));
        }
        this._mode = "rgb";
        this.domain(0, 1);
        this._paddingLeft = 0;
        this._paddingRight = 0;
        this._correctLightness = false;
        this._cache = new Map();
        this._gamma = 1;
    }
    _getClass(value) {
        return this._classes.findIndex((cls) => value <= cls) - 1;
    }
    _color(val, bypassMap = false) {
        let t;
        if (!bypassMap) {
            const min = this._min, max = this._max;
            if (this._classes && this._classes.length > 2) {
                const c = this._getClass(val);
                t = c / (this._classes.length - 2);
            }
            else if (max !== min) {
                t = (val - min) / (max - min);
            }
            else {
                t = 1;
            }
            if (this._correctLightness) {
                t = this._tCorrectedLightness(t);
            }
        }
        else {
            t = val;
        }
        t = t ** this._gamma;
        t = (this._paddingLeft + t) / (1 + this._paddingLeft + this._paddingRight);
        //	t = this._paddingLeft + t * (1 - this._paddingLeft - this._paddingRight)
        t = clamp(t, 0, 1);
        const tHash = t;
        const cacheResult = this._cache && this._cache.get(tHash);
        if (cacheResult) {
            return cacheResult;
        }
        else {
            let col;
            if (Array.isArray(this._colors)) {
                for (let i = 0; i < this._pos.length; i++) {
                    const p = this._pos[i];
                    if (t <= p) {
                        col = this._colors[i];
                        break;
                    }
                    if (t >= p && i == this._pos.length - 1) {
                        col = this._colors[i];
                        break;
                    }
                    if (t > p && t < this._pos[i + 1]) {
                        t = (t - p) / (this._pos[i + 1] - p);
                        col = mix(this._colors[i], this._colors[i + 1], t, this._mode);
                        break;
                    }
                }
            }
            else {
                col = this._colors(t);
            }
            if (this._cache) {
                // tslint:disable-next-line
                this._cache.set(tHash, col);
            }
            // tslint:disable-next-line
            return col;
        }
    }
    _tCorrectedLightness(t0_1) {
        const L0 = this._color(0, true).lab()[0];
        const L1 = this._color(1, true).lab()[0];
        const L_ideal = lerp(L0, L1, t0_1);
        return bisect((t) => this._color(t, true).lab()[0] - L_ideal, 0, 1, 8);
    }
    _resetCache() {
        if (this._cache)
            this._cache.clear();
    }
}
var scales;
(function (scales) {
    /**
     * @example chroma.scales.cool()
     */
    function cool() {
        return scale([hsl(180, 1, 0.9), hsl(250, 0.7, 0.4)]);
    }
    scales.cool = cool;
    /**
     * @example chroma.scales.hot()
     */
    function hot() {
        return scale(["#000", "#f00", "#ff0", "#fff"]).mode("rgb");
    }
    scales.hot = hot;
})(scales || (scales = {}));
function analyze(data) {
    const r = {
        min: Infinity,
        max: -Infinity,
        sum: 0,
        values: [],
        count: 0,
    };
    function add(val) {
        if (val != undefined && !isNaN(val)) {
            r.values.push(val);
            r.sum += val;
            if (val < r.min)
                r.min = val;
            if (val > r.max)
                r.max = val;
            r.count += 1;
        }
    }
    data.forEach((val) => add(val));
    r.domain = [r.min, r.max];
    r.limits = function (mode, num) {
        return limits(this, mode, num);
    };
    return r;
}
function limits(data, mode = "e", num = 7) {
    const info = Array.isArray(data) ? analyze(data) : data;
    const { min, max, values } = info;
    values.sort((a, b) => a - b);
    if (num == 1) {
        return [min, max];
    }
    if (mode.startsWith("c")) {
        return [min, max];
    }
    else if (mode.startsWith("e")) {
        return Array.from({ length: num + 1 }, (_, i) => lerp(min, max, i / num));
    }
    else if (mode.startsWith("l")) {
        if (min <= 0) {
            throw new Error("Logarithmic scales are only possible for values > 0");
        }
        const min_log = Math.LOG10E * log(min);
        const max_log = Math.LOG10E * log(max);
        return Array.from({ length: num + 1 }, (_, i) => 10 ** lerp(min_log, max_log, i / num));
    }
    else if (mode.startsWith("q")) {
        return Array.from({ length: num + 1 }, (_, i) => {
            const p = ((values.length - 1) * i) / num;
            const pb = floor(p);
            return pb == p ? values[pb] : lerp(values[pb], values[pb + 1], p - pb);
        });
    }
    else if (mode.startsWith("k")) {
        // implementation based on
        // http://code.google.com/p/figue/source/browse/trunk/figue.js#336
        // simplified for 1-d input values
        const n = values.length;
        const assignments = new Array(n);
        const clusterSizes = new Array(num);
        let repeat = true;
        let nb_iters = 0;
        let centroids = Array.from({ length: num + 1 }, (_, i) => lerp(min, max, i / num));
        do {
            // assignment step
            clusterSizes.fill(0);
            for (let i = 0; i < values.length; i++) {
                const value = values[i];
                const minDistIndex = indexOfMax(centroids, (c) => -abs(c - value));
                clusterSizes[minDistIndex]++;
                assignments[i] = minDistIndex;
            }
            // update centroids step
            const newCentroids = new Array(num).fill(0);
            for (let i = 0; i < assignments.length; i++) {
                const cluster = assignments[i];
                newCentroids[cluster] += values[i];
            }
            for (let j = 0; j < newCentroids.length; j++) {
                newCentroids[j] /= clusterSizes[j];
            }
            // check convergence
            repeat = newCentroids.some((nc, j) => nc != centroids[j]);
            centroids = newCentroids;
        } while (nb_iters++ < 200 && repeat);
        // finished k-means clustering
        // the next part is borrowed from gabrielflor.it
        const kClusters = Array.from({ length: num }, () => []);
        for (let i = 0; i < assignments.length; i++) {
            const cluster = assignments[i];
            kClusters[cluster].push(values[i]);
        }
        const tmpKMeansBreaks = [];
        for (const kCluster of kClusters) {
            tmpKMeansBreaks.push(kCluster[0], kCluster[kCluster.length - 1]);
        }
        tmpKMeansBreaks.sort((a, b) => a - b);
        const limits = [];
        limits.push(tmpKMeansBreaks[0]);
        for (let i = 1; i < tmpKMeansBreaks.length; i += 2) {
            const v = tmpKMeansBreaks[i];
            if (!isNaN(v) && limits.indexOf(v) == -1) {
                limits.push(v);
            }
        }
        return limits;
    }
    else {
        throw new Error("unknown mode");
    }
}
const interpolators = {};
// const _guess_formats: { p: number; test: (args: any[]) => ColorFormat | undefined }[] = []
const _input = {};
function linear_interpolator(col1, col2, f, m) {
    const xyz1 = col1[m]();
    const xyz2 = col2[m]();
    return guess([
        lerp(xyz1[0], xyz2[0], f),
        lerp(xyz1[1], xyz2[1], f),
        lerp(xyz1[2], xyz2[2], f),
        lerp(col1.alpha(), col2.alpha(), f),
    ], m);
}
interpolators.xyz = interpolators.rgb = interpolators.lab = linear_interpolator;
interpolators.num = function (col1, col2, f) {
    const n1 = col1.num();
    const n2 = col2.num();
    return num(lerp(n1, n2, f));
};
interpolators.lrgb = function (col1, col2, f) {
    const [r1, g1, b1, a1] = col1.rgba(false, false);
    const [r2, g2, b2, a2] = col2.rgba(false, false);
    return new Color(sqrt(r1 ** 2 * (1 - f) + r2 ** 2 * f), sqrt(g1 ** 2 * (1 - f) + g2 ** 2 * f), sqrt(b1 ** 2 * (1 - f) + b2 ** 2 * f), lerp(a1, a2, f));
};
function guess(args, mode) {
    if (Array.isArray(args[0]))
        args = args[0];
    if (!mode) {
        if (args.length == 1 && args[0] in w3cx11) {
            mode = "name";
        }
        else if (args.length == 1 && "string" == typeof args[0]) {
            mode = "css";
        }
        else if (args.length == 3) {
            mode = "rgb";
        }
        else if (args.length == 4 && "number" == typeof args[3] && args[3] >= 0 && args[3] <= 1) {
            mode = "rgb";
        }
        else if (args.length == 1 && "number" == typeof args[0] && args[0] >= 0 && args[0] <= 0xffffff) {
            mode = "num";
        }
        else
            throw new Error("could not guess mode. args " + JSON.stringify(args));
    }
    const channels = _input[mode](...args);
    return new Color(channels[0], channels[1], channels[2], undefined !== channels[3] ? channels[3] : 1);
}
function hex2rgb(hex) {
    let m;
    if ((m = hex.match(/^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})?$/i))) {
        return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16), m[4] ? parseInt(m[4], 16) / 255 : 1];
    }
    else if ((m = hex.match(/^#?([A-F\d])([A-F\d])([A-F\d])([A-F\d])?$/i))) {
        return [
            parseInt(m[1], 16) * 0x11,
            parseInt(m[2], 16) * 0x11,
            parseInt(m[3], 16) * 0x11,
            m[4] ? (parseInt(m[4], 16) * 0x11) / 255 : 1,
        ];
    }
    throw new Error("invalid hex color: " + hex);
}
// interface ColorModes {
// 	cmyk: CMYK
// 	gl: GL
// 	rgb: RGB
// 	rgba: RGBA
// 	lab: LAB
// 	hsl: HSL
// 	hsv: HSV
// 	hsi: HSI
// 	xyz: XYZ
// 	hcg: HCG
// 	lch: LCH
// 	hex: string
// 	num: number
// 	name: string
// 	kelvin: number
// 	css: string
// }
function rgb2hex(r255, g255, b255, a1, mode = "rgb") {
    r255 = clamp(round(r255), 0, 255);
    g255 = clamp(round(g255), 0, 255);
    b255 = clamp(round(b255), 0, 255);
    const rgb = (r255 << 16) | (g255 << 8) | b255;
    const rgbString = rgb.toString(16).padStart(6, "0");
    const alphaString = round(clamp(a1) * 255)
        .toString(16)
        .padStart(2, "0");
    return "#" + ("argb" == mode ? alphaString + rgbString : "rgba" == mode ? rgbString + alphaString : rgbString);
}
_input.lrgb = _input.rgb;
_input.hex = hex2rgb;
_input.hsl = hsl2rgb;
function norm360(degrees) {
    return ((degrees % 360) + 360) % 360;
}
_input.hsv = hsv2rgb;
function num2rgb(num) {
    if (!("number" == typeof num && num >= 0 && num <= 0xffffff)) {
        throw new Error("unknown num color: " + num);
    }
    const r = num >> 16;
    const g = (num >> 8) & 0xff;
    const b = num & 0xff;
    return [r, g, b, 1];
}
function rgb2num(r255, g255, b255, a1 = 1, mode = "rgb") {
    const rgbNum = (round(r255) << 16) | (round(g255) << 8) | round(b255);
    if ("rgb" === mode) {
        return rgbNum;
    }
    else if ("rgba" === mode) {
        return (rgbNum << 8) | (round(a1 * 255) << 24);
    }
    else {
        return (round(a1 * 255) << 24) | rgbNum;
    }
}
_input.num = num2rgb;
const WS = "\\s*";
const FLOAT = "([+-]?(?:\\d*\\.?)?\\d+(?:[eE][+-]?\\d+)?)";
const CSS_RGB_REGEX = new RegExp(["^rgba?\\(", FLOAT, ",", FLOAT, ",", FLOAT, "(?:,", FLOAT + "(%)?", ")?\\)$"].join(WS), "i");
const CSS_RGB_WS_REGEX = new RegExp(["^rgba?\\(", FLOAT, FLOAT, FLOAT, "(?:/", FLOAT + "(%)?", ")?\\)$"].join(WS), "i");
const CSS_RGB_PERCENT_REGEX = new RegExp(["^rgba?\\(", FLOAT + "%", ",", FLOAT + "%", ",", FLOAT + "%", "(?:,", FLOAT + "(%)?", ")?\\)$"].join(WS), "i");
const CSS_RGB_WS_PERCENT_REGEX = new RegExp(["^rgba?\\(", FLOAT + "%", FLOAT + "%", FLOAT + "%", "(?:/", FLOAT + "(%)?", ")?\\)$"].join(WS), "i");
const CSS_HSL_REGEX = new RegExp(["^hsla?\\(", FLOAT + "(deg|rad|turn)?", ",", FLOAT + "%", ",", FLOAT + "%", "(?:,", FLOAT + "(%)?", ")?\\)$"].join(WS), "i");
const CSS_HSL_WS_REGEX = new RegExp(["^hsla?\\(", FLOAT + "(deg|rad|turn)?\\s+" + FLOAT + "%", FLOAT + "%", "(?:/", FLOAT + "(%)?", ")?\\)$"].join(WS), "i");
function css2rgb(css) {
    if (w3cx11 && w3cx11.hasOwnProperty(css)) {
        return num2rgb(w3cx11[css.toLowerCase()]);
    }
    let m;
    if ((m = css.match(CSS_RGB_REGEX) || css.match(CSS_RGB_WS_REGEX))) {
        return [
            clamp(+m[1], 0, 255),
            clamp(+m[2], 0, 255),
            clamp(+m[3], 0, 255),
            m[4] ? clamp(m[5] ? +m[4] / 100 : +m[4]) : 1,
        ];
    }
    else if ((m = css.match(CSS_RGB_PERCENT_REGEX) || css.match(CSS_RGB_WS_PERCENT_REGEX))) {
        return [
            clamp(+m[1] / 100) * 255,
            clamp(+m[2] / 100) * 255,
            clamp(+m[3] / 100) * 255,
            m[4] ? clamp(m[5] ? +m[4] / 100 : +m[4]) : 1,
        ];
    }
    else if ((m = css.match(CSS_HSL_REGEX) || css.match(CSS_HSL_WS_REGEX))) {
        const CONVERSION = { deg: 1, rad: RAD2DEG, turn: 360 };
        const angleUnit = (m[2] ? m[2].toLowerCase() : "deg");
        return hsl2rgb((((+m[1] * CONVERSION[angleUnit]) % 360) + 360) % 360, clamp(+m[3] / 100), clamp(+m[4] / 100), m[5] ? clamp(m[6] ? +m[5] / 100 : +m[5]) : 1);
    }
    else {
        return hex2rgb(css);
    }
}
function rgb2css(r, g, b, a = 1) {
    if (a >= 1) {
        return "rgb(" + [r, g, b].map(round).join(",") + ")";
    }
    else {
        return "rgba(" + [r, g, b].map(round).join(",") + "," + a + ")";
    }
}
function rnd(a) {
    return round(a * 100) / 100;
}
function hsl2css([h, s, l], alpha) {
    const mode = alpha < 1 ? "hsla" : "hsl";
    return (mode +
        "(" +
        rnd(h) +
        "," +
        rnd(s * 100) +
        "%" +
        "," +
        rnd(l * 100) +
        "%" +
        ("hsla" == mode ? "," + rnd(alpha) : "") +
        ")");
}
_input.css = css2rgb;
_input.name = function (name) {
    return num2rgb(w3cx11[name]);
};
function lch2lab(l, c, hueDegrees) {
    /*
    Convert from a qualitative parameter h and a quantitative parameter l to a 24-bit pixel.
    These formulas were invented by David Dalrymple to obtain maximum contrast without going
    out of gamut if the parameters are in the range 0-1.

    A saturation multiplier was added by Gregor Aisch
     */
    return [l, cos(hueDegrees * DEG2RAD) * c, sin(hueDegrees * DEG2RAD) * c];
}
function lch2rgb(l, c, hDegrees, alpha1 = 1) {
    const [, a, b] = lch2lab(l, c, hDegrees);
    return cielab2rgb(l, a, b, alpha1);
}
function lab2lch(l, a, b) {
    const c = hypot(a, b);
    const h = (atan2(b, a) * RAD2DEG + 360) % 360;
    return [l, c, h];
}
function rgb2lch(r255, g255, b255) {
    const [l, a, b2] = rgb2lab(r255, g255, b255);
    return lab2lch(l, a, b2);
}
_input.lch = lch2rgb;
function rgb2cmyk(r255, g255, b255) {
    r255 /= 255;
    g255 /= 255;
    b255 /= 255;
    const k = 1 - max(r255, g255, b255);
    if (1 == k)
        return [0, 0, 0, 1];
    const c = (1 - r255 - k) / (1 - k);
    const m = (1 - g255 - k) / (1 - k);
    const y = (1 - b255 - k) / (1 - k);
    return [c, m, y, k];
}
function cmyk2rgb(c1, m1, y1, k1, alpha1 = 1) {
    if (k1 == 1) {
        return [0, 0, 0, alpha1];
    }
    const r255 = 255 * (1 - c1) * (1 - k1);
    const g255 = 255 * (1 - m1) * (1 - k1);
    const b255 = 255 * (1 - y1) * (1 - k1);
    return [r255, g255, b255, alpha1];
}
_input.cmyk = cmyk2rgb;
_input.gl = function (r, g, b, a = 1) {
    return [r * 255, g * 255, b * 255, a];
};
//function rgb2luminance(r: number, g: number, b: number) {
//	// https://en.wikipedia.org/wiki/Relative_luminance
//	const [, Y] = rgb2xyz(r, g, b)
//	return Y
//}
function rgbChannel2RgbLinear(x255) {
    const x1 = x255 / 255;
    // http://entropymine.com/imageworsener/srgbformula/
    if (x1 <= 0.04045) {
        return x1 / 12.92;
    }
    else {
        return ((x1 + 0.055) / 1.055) ** 2.4;
    }
}
function rgbLinearChannel2Rgb(xLinear1) {
    if (xLinear1 <= 0.0031308) {
        return 255 * (12.92 * xLinear1);
    }
    else {
        return 255 * ((1 + 0.055) * xLinear1 ** (1 / 2.4) - 0.055);
    }
}
function kelvin2rgb(kelvin) {
    const t = kelvin / 100;
    let r, g, b;
    if (t < 66) {
        r = 255;
        g = -155.25485562709179 - 0.44596950469579133 * (t - 2) + 104.49216199393888 * log(t - 2);
        b = t < 20 ? 0 : -254.76935184120902 + 0.8274096064007395 * (t - 10) + 115.67994401066147 * log(t - 10);
    }
    else {
        r = 351.97690566805693 + 0.114206453784165 * (t - 55) - 40.25366309332127 * log(t - 55);
        g = 325.4494125711974 + 0.07943456536662342 * (t - 50) - 28.0852963507957 * log(t - 50);
        b = 255;
    }
    return [r, g, b];
}
_input.rgb = (...args) => args;
function rgb2kelvin(r255, g255, b255) {
    console.log(b255 - r255);
    if (g255 + b255 < 158.61) {
        console.log("0 < t < 20");
        // calc from green
        return round(newtonIterate1d((t) => g255 - (-155.25485562709179 - 0.44596950469579133 * (t - 2) + 104.49216199393888 * log(t - 2)), 15, 4) * 100);
    }
    else if (b255 - r255 < 0) {
        console.log("20 < t < 66");
        return round(newtonIterate1d((t) => b255 - (-254.76935184120902 + 0.8274096064007395 * (t - 10) + 115.67994401066147 * log(t - 10)), 43, 4) * 100);
    }
    else {
        console.log("0 < t < 400, start= " + (-1.4 * (r255 + g255) + 755));
        return round(newtonIterate1d((t) => r255 - (351.97690566805693 + 0.114206453784165 * (t - 55) - 40.25366309332127 * log(t - 55)), -1.4 * (r255 + g255) + 755, 8) * 100);
    }
}
_input.temperature = _input.kelvin = _input.K = kelvin2rgb;
/**
 * r, g, b can be in any interval (0-1 or 0-255)
 * @param r
 * @param g
 * @param b
 */
function rgb2hexhue(r, g, b) {
    const m = min(r, g, b);
    const M = max(r, g, b);
    const delta = M - m;
    let hueTurnX6; // angle as value between 0 and 6
    if (0 == delta) {
        hueTurnX6 = 0;
    }
    else if (r == M) {
        // second term to make sure the value is > 0
        hueTurnX6 = (g - b) / delta + (g < b ? 6 : 0);
    }
    else if (g == M) {
        hueTurnX6 = 2 + (b - r) / delta;
    }
    else {
        hueTurnX6 = 4 + (r - g) / delta;
    }
    return [hueTurnX6 * 60, m, M];
}
function hcxm2rgb(hueDegrees, c1, x1, m1, alpha1) {
    const m255 = m1 * 255;
    const cm255 = c1 * 255 + m255;
    const xm255 = x1 * 255 + m255;
    if (hueDegrees < 60) {
        return [cm255, xm255, m255, alpha1];
    }
    else if (hueDegrees < 120) {
        return [xm255, cm255, m255, alpha1];
    }
    else if (hueDegrees < 180) {
        return [m255, cm255, xm255, alpha1];
    }
    else if (hueDegrees < 240) {
        return [m255, xm255, cm255, alpha1];
    }
    else if (hueDegrees < 300) {
        return [xm255, m255, cm255, alpha1];
    }
    else {
        return [cm255, m255, xm255, alpha1];
    }
}
/**
 * https://en.wikipedia.org/w/index.php?title=HSL_and_HSV&oldid=856714654#From_HSL
 */
function hsl2rgb(hueDegrees, s1, l1, alpha1 = 1) {
    hueDegrees = norm360(hueDegrees);
    const c1 = (1 - abs(2 * l1 - 1)) * s1;
    return hcxm2rgb(hueDegrees, c1, c1 * (1 - abs(((hueDegrees / 60) % 2) - 1)), l1 - c1 / 2, alpha1);
}
function rgb2hsl(r255, g255, b255) {
    const [hue, min1, max1] = rgb2hexhue(r255 / 255, g255 / 255, b255 / 255);
    const l1 = (max1 + min1) / 2;
    let s1;
    if (max1 == min1) {
        s1 = 0;
    }
    else {
        s1 = l1 < 0.5 ? (max1 - min1) / (max1 + min1) : (max1 - min1) / (2 - max1 - min1);
    }
    return [hue, s1, l1];
}
function hsv2rgb(hueDegrees, s1, v1, alpha1 = 1) {
    hueDegrees = norm360(hueDegrees);
    const c1 = v1 * s1;
    return hcxm2rgb(hueDegrees, c1, c1 * (1 - abs(((hueDegrees / 60) % 2) - 1)), v1 - c1, alpha1);
}
function rgb2hsv(r255, g255, b255) {
    const [hue, min255, max255] = rgb2hexhue(r255, g255, b255);
    const delta255 = max255 - min255;
    const v1 = max255 / 255.0;
    const s1 = max255 == 0 ? 0 : delta255 / max255;
    return [hue, s1, v1];
}
function hcg2rgb(hueDegrees, c1, g1, alpha1 = 1) {
    hueDegrees = norm360(hueDegrees);
    const p = g1 * (1 - c1);
    return hcxm2rgb(hueDegrees, c1, c1 * (1 - abs(((hueDegrees / 60) % 2) - 1)), p, alpha1);
}
function rgb2hcg(r255, g255, b255) {
    const [hue, min255, max255] = rgb2hexhue(r255, g255, b255);
    const c1 = (max255 - min255) / 255;
    const _g1 = c1 < 1 ? min255 / 255 / (1 - c1) : 0;
    return [hue, c1, _g1];
}
_input.hcg = hcg2rgb;
function cielab2rgb(LStar100, aStar, bStar, alpha = 1) {
    const [x, y, z] = cielab2xyz(LStar100, aStar, bStar);
    return xyz2rgb(x, y, z, alpha);
}
function cielab2xyz(LStar100, aStar, bStar) {
    function fInv(t) {
        if (t > LAB_delta) {
            return t ** 3;
        }
        else {
            return LAB_3DeltaPow2 * (t - 4 / 29);
        }
    }
    return [
        LAB_Xn * fInv((LStar100 + 16) / 116 + aStar / 500),
        LAB_Yn * fInv((LStar100 + 16) / 116),
        LAB_Zn * fInv((LStar100 + 16) / 116 - bStar / 200),
    ];
}
function xyz2cielab(x, y, z) {
    // https://en.wikipedia.org/w/index.php?title=CIELAB_color_space&oldid=849576085#Forward_transformation
    function f(t) {
        if (t > LAB_deltaPow3) {
            return cbrt(t);
        }
        else {
            return t / LAB_3DeltaPow2 + 4 / 29;
        }
    }
    return [116 * f(y / LAB_Yn) - 16, 500 * (f(x / LAB_Xn) - f(y / LAB_Yn)), 200 * (f(y / LAB_Yn) - f(z / LAB_Zn))];
}
// const LAB_CONSTANTS = {
const LAB_Kn = 18;
const LAB_Xn = 0.95047;
const LAB_Yn = 1;
const LAB_Zn = 1.08883;
const LAB_delta = 0.206896552; // delta = 6 / 29
const LAB_3DeltaPow2 = 0.12841855; // 3 * delta ** 2
const LAB_deltaPow3 = 0.008856452; // delta ** 3
// }
function rgb2lab(r255, g255, b255) {
    const [x, y, z] = rgb2xyz(r255, g255, b255);
    return xyz2cielab(x, y, z);
}
function rgb2xyz(r255, g255, b255) {
    // https://en.wikipedia.org/wiki/SRGB#The_reverse_transformation
    const r1Linear = rgbChannel2RgbLinear(r255);
    const g1Linear = rgbChannel2RgbLinear(g255);
    const b1Linear = rgbChannel2RgbLinear(b255);
    const X = 0.4124564 * r1Linear + 0.3575761 * g1Linear + 0.1804375 * b1Linear;
    const Y = 0.2126729 * r1Linear + 0.7151522 * g1Linear + 0.072175 * b1Linear;
    const Z = 0.0193339 * r1Linear + 0.119192 * g1Linear + 0.9503041 * b1Linear;
    return [X, Y, Z];
}
function xyz2rgb(X1, Y1, Z1, alpha1 = 1) {
    // https://en.wikipedia.org/wiki/SRGB#The_forward_transformation_(CIE_XYZ_to_sRGB)
    const r1Linear = 3.2404542 * X1 - 1.5371385 * Y1 - 0.4985314 * Z1;
    const g1Linear = -0.969266 * X1 + 1.8760108 * Y1 + 0.041556 * Z1;
    const b1Linear = 0.0556434 * X1 - 0.2040259 * Y1 + 1.0572252 * Z1;
    return [rgbLinearChannel2Rgb(r1Linear), rgbLinearChannel2Rgb(g1Linear), rgbLinearChannel2Rgb(b1Linear), alpha1];
}
_input.xyz = xyz2rgb;
_input.lab = cielab2rgb;
/**
 * For HSI, we use the direct angle calculation. I.e. atan2(beta, alpha). See wikipedia link. This is why we don't use
 * hcxm2rgb.
 */
function hsi2rgb(hueDegrees, s1, i1, alpha1 = 1) {
    /*
    borrowed from here:
    http://hummer.stanford.edu/museinfo/doc/examples/humdrum/keyscape2/hsi2rgb.cpp
     */
    let r, g, b;
    let hRad = hueDegrees * DEG2RAD;
    if (hRad < (2 * PI) / 3) {
        b = (1 - s1) / 3;
        r = (1 + (s1 * cos(hRad)) / cos(PI / 3 - hRad)) / 3;
        g = 1 - (b + r);
    }
    else if (hRad < (4 * PI) / 3) {
        hRad -= (2 * PI) / 3;
        r = (1 - s1) / 3;
        g = (1 + (s1 * cos(hRad)) / cos(PI / 3 - hRad)) / 3;
        b = 1 - (r + g);
    }
    else {
        hRad -= (4 * PI) / 3;
        g = (1 - s1) / 3;
        b = (1 + (s1 * cos(hRad)) / cos(PI / 3 - hRad)) / 3;
        r = 1 - (g + b);
    }
    return [3 * i1 * r * 255, 3 * i1 * g * 255, 3 * i1 * b * 255, alpha1];
}
/**
 * For HSI, we use the direct angle calculation. I.e. atan2(beta, alpha). See wikipedia link. This is why we don't use
 * rgb2hexhue.
 */
function rgb2hsi(r255, g255, b255) {
    // See https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
    // See https://en.wikipedia.org/wiki/HSL_and_HSV#Lightness
    const r1 = r255 / 255;
    const g1 = g255 / 255;
    const b1 = b255 / 255;
    const i1 = (r1 + g1 + b1) / 3;
    if (r1 == g1 && g1 == b1) {
        return [0, 0, i1];
    }
    else {
        const alpha = (1 / 2) * (2 * r1 - g1 - b1);
        const beta = (sqrt(3) / 2) * (g1 - b1);
        const hRad = atan2(beta, alpha);
        const min1 = min(r1, g1, b1);
        const s1 = 1 - min1 / i1;
        return [(hRad < 0 ? 2 * PI + hRad : hRad) * RAD2DEG, s1, i1];
    }
}
_input.hsi = hsi2rgb;
interpolators.hsv = interpolators.hsl = interpolators.hsi = interpolators.lch = interpolators.hcg = function interpolate_hsx(color1, color2, f, m) {
    const [a1, b1, c1] = color1[m]();
    const [a2, b2, c2] = color2[m]();
    function lerpHue(hue1, hue2, f) {
        const dh = norm360(hue2 - hue1 + 180) - 180;
        return hue1 + f * dh;
    }
    return color(("h" == m.charAt(0) ? lerpHue : lerp)(a1, a2, f), lerp(b1, b2, f), ("h" == m.charAt(2) ? lerpHue : lerp)(c1, c2, f), m);
};
function indexOfMax(arr, f) {
    let maxValue = -Infinity, maxValueIndex = -1;
    for (let i = 0; i < arr.length; i++) {
        const value = f(arr[i]);
        if (value > maxValue) {
            maxValue = value;
            maxValueIndex = i;
        }
    }
    return maxValueIndex;
}
function withMax(arr, f) {
    return arr[indexOfMax(arr, f)];
}

/*
 * @author Lea Verou 2020 MIT License
 * Copied to Theme Park from CSS Land.
 * Tested with a 3rd party color converter.
 */
const LCH_to_RGB_Percents = (LCH) => {
    // convert an array of CIE LCH values
    // to CIE Lab, and then to XYZ,
    // adapt from D50 to D65,
    // then convert XYZ to linear-light sRGB
    // and finally to gamma corrected sRGB
    // for in-gamut colors, components are in the 0.0 to 1.0 range
    // out of gamut colors may have negative components
    // or components greater than 1.0
    // so check for that :)
    const lab = LCH_to_Lab(LCH);
    const xyz = Lab_to_XYZ(lab);
    const x = D50_to_D65(xyz);
    const y = XYZ_to_lin_sRGB(x);
    return gam_sRGB(y);
};
// standard white points, defined by 4-figure CIE x,y chromaticities
const D50 = [0.3457 / 0.3585, 1.00000, (1.0 - 0.3457 - 0.3585) / 0.3585];
// const D65 = [0.3127 / 0.3290, 1.00000, (1.0 - 0.3127 - 0.3290) / 0.3290]
const LCH_to_Lab = (LCH) => [
    LCH[0],
    // Convert from polar form
    LCH[1] * Math.cos(LCH[2] * Math.PI / 180),
    LCH[1] * Math.sin(LCH[2] * Math.PI / 180), // b
];
const Lab_to_XYZ = (Lab) => {
    // Convert Lab to D50-adapted XYZ
    // http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
    const Îº = 24389 / 27; // 29^3/3^3
    const Îµ = 216 / 24389; // 6^3/29^3
    const f = [];
    // compute f, starting with the luminance-related term
    f[1] = (Lab[0] + 16) / 116;
    f[0] = Lab[1] / 500 + f[1];
    f[2] = f[1] - Lab[2] / 200;
    const xyz = [
        Math.pow(f[0], 3) > Îµ ? Math.pow(f[0], 3) : (116 * f[0] - 16) / Îº,
        Lab[0] > Îº * Îµ ? Math.pow((Lab[0] + 16) / 116, 3) : Lab[0] / Îº,
        Math.pow(f[2], 3) > Îµ ? Math.pow(f[2], 3) : (116 * f[2] - 16) / Îº,
    ];
    // Compute XYZ by scaling xyz by reference white
    return xyz.map((value, i) => value * D50[i]);
};
const D50_to_D65 = (XYZ) => {
    // Bradford chromatic adaptation from D50 to D65
    const M = [
        [0.9554734527042182, -0.023098536874261423, 0.0632593086610217],
        [-0.028369706963208136, 1.0099954580058226, 0.021041398966943008],
        [0.012314001688319899, -0.020507696433477912, 1.3303659366080753],
    ];
    return multiplyMatrices(M, XYZ);
};
const XYZ_to_lin_sRGB = (XYZ) => {
    // convert XYZ to linear-light sRGB
    const M = [
        [3.2409699419045226, -1.537383177570094, -0.4986107602930034],
        [-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
        [0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
    ];
    return multiplyMatrices(M, XYZ);
};
// convert an array of linear-light sRGB values in the range 0.0-1.0
// to gamma corrected form
// https://en.wikipedia.org/wiki/SRGB
// Extended transfer function:
// For negative values, linear portion extends on reflection
// of axis, then uses reflected pow below that
const gam_sRGB = (RGB) => RGB.map((val) => {
    const sign = val < 0 ? -1 : 1;
    const abs = Math.abs(val);
    return abs > 0.0031308
        ? sign * (1.055 * Math.pow(abs, 1 / 2.4) - 0.055)
        : 12.92 * val;
});
/**
 * Simple matrix (and vector) multiplication
 * Warning: No error handling for incompatible dimensions!
 */
// A is m x n. B is n x p. product is m x p.
const multiplyMatrices = (A, V) => {
    const B = V.map(x => [x]);
    const p = B[0].length;
    const B_cols = B[0].map((_, i) => B.map(x => x[i])); // transpose B
    const productMat = A.map(row => B_cols.map(col => {
        if (!Array.isArray(row)) {
            return col.reduce((a, c) => a + c * row, 0);
        }
        return row.reduce((a, c, i) => a + c * (col[i] || 0), 0);
    }));
    if (p === 1) {
        return productMat.map(x => x[0]); // Avoid [[a], [b], [c], ...]]
    }
    else
        throw new Error(`invalid matrix mult ${A} ${V}`);
};

/* Chroma works fine with LCH -> LAB,
 * but incorect LCH -> XYZ and LCH -> RGB.
 * This clamps to the perceptually-nearest sRGB value */
const ToSrgbColorSpace = (color) => {
    const alpha = color.alpha();
    const lch$1 = color.lch();
    const lchSrgb = lchToSrgbSpace(lch$1);
    return lch(lchSrgb)
        .alpha(alpha);
};
const lchToSrgbSpace = (lch) => {
    if (getIsSrgb(lch))
        return lch;
    let cHi = lch[1];
    let cLo = 0;
    const ε = .0001;
    let newLch = lch;
    // Binary Search for max sRGB chroma
    while (cHi - cLo > ε) {
        const avg = (cHi + cLo) / 2;
        newLch = [lch[0], avg, lch[2]];
        if (getIsSrgb(newLch)) {
            cLo = avg;
        }
        else {
            cHi = avg;
        }
    }
    return newLch;
};
const getIsSrgb = (lch) => {
    const ε = .000005;
    const rgb = LCH_to_RGB_Percents(lch);
    return rgb.every(v => v + ε > 0.0)
        && rgb.every(v => v - ε < 1.0);
};

// ***** Color Math *****
const grey = hsl(0, 0, 0.5);
const withMinTwoColors = (cs) => cs.length >= 2 ? cs : [cs[0] ?? grey, cs[0] ?? grey];
const Interpolate = (cs, count) => scale(withMinTwoColors(cs))
    .mode("lch")
    .colors(count, "lch")
    .map(c => lch(c))
    .map(c => ToSrgbColorSpace(c));
// ***** Color Parsers *****
const assert = (msg, isValid) => {
    if (!isValid)
        throw new Error(msg);
};
const assertA = (a) => assert(`Invalid Alpha ${a}`, a === undefined || (0.0 <= a && a <= 100.0));
const assertH = (h) => assert(`Invalid Hue ${h}`, 0 <= h && h <= 360);
const assertL = (l) => assert(`Invalid Lightness ${l}`, 0 <= l && l <= 100);
const assertS = (s) => assert(`Invalid Saturation ${s}`, 0 <= s && s <= 100);
const Hsl = (h, s, l, a) => {
    assertH(h);
    assertS(s);
    assertL(l);
    assertA(a);
    const aScaled = a === undefined ? undefined : a / 100.0;
    return hsl(h, s / 100.0, l / 100.0, aScaled);
};
// ***** Color Formatters *****
const toHsla = (color) => {
    const [h1, s1, l1] = color.hsl();
    // These value are already clamped to the perceptually closest sRGB color space values,
    // but chroma.Color.hsl() can give crazy lightness values like -400% when slightly below zero
    const clampFpError = (n) => Math.min(Math.max(0.0, n), 1.0);
    const round = (n) => Math.round(n * 10) / 10;
    const scale = (n) => round(clampFpError(n) * 100);
    return [round(h1), scale(s1), scale(l1), scale(color.alpha())];
};
const ToStringHsl = (color) => {
    const [h, s, l, a] = toHsla(color);
    return a < 100
        ? `hsl(${h.toFixed(0)} ${s.toFixed(1)}% ${l.toFixed(1)}% / ${a.toFixed(1)}%)`
        : `hsl(${h.toFixed(0)} ${s.toFixed(1)}% ${l.toFixed(1)}%)`;
};
const ToStringHslCommas = (color) => {
    const [h, s, l, a] = toHsla(color);
    return a < 100
        ? `hsla(${h}, ${s}%, ${l}%, ${a}%)`
        : `hsl(${h}, ${s}%, ${l}%)`;
};

const ThemeToCss = (spec, grad) => i$4 `
.${r$3(spec.CssName)}  {
	/* Colors */
	${r$3(colorsToCss(slTokenizeAll(spec.TokensColorTheme)))}

	/* Box Shadows, Forms, Overlays, etc. */
	${r$3(tokensToCss(spec.IsLight ? shoelaceLight : shoelaceDark))}

	/* Panels/Cards */
	--card-decorative-bg: ${r$3(grad)};
	--sl-panel-border-color: var(--sl-color-neutral-200);
	--sl-panel-background-color: var(--sl-color-neutral-${spec.ContrastPanel});

	/* Component Colors -- common to all themes,
	* but must apply after theme since they consume theme tokens */
	--sl-input-background-color: var(--sl-color-neutral-0);
	--sl-input-background-color-hover: var(--sl-input-background-color);
	--sl-input-background-color-focus: var(--sl-input-background-color);
	--sl-input-background-color-disabled: var(--sl-color-neutral-100);
	--sl-input-border-color: var(--sl-color-neutral-300);
	--sl-input-border-color-hover: var(--sl-color-neutral-400);
	--sl-input-border-color-focus: var(--sl-color-primary-500);
	--sl-input-border-color-disabled: var(--sl-color-neutral-300);

	--sl-input-color: var(--sl-color-neutral-700);
	--sl-input-color-hover: var(--sl-color-neutral-700);
	--sl-input-color-focus: var(--sl-color-neutral-700);
	--sl-input-color-disabled: var(--sl-color-neutral-900);
	--sl-input-icon-color: var(--sl-color-neutral-500);
	--sl-input-icon-color-hover: var(--sl-color-neutral-600);
	--sl-input-icon-color-focus: var(--sl-color-neutral-600);
	--sl-input-placeholder-color: var(--sl-color-neutral-500);
	--sl-input-placeholder-color-disabled: var(--sl-color-neutral-600);

	--sl-input-filled-background-color: var(--sl-color-neutral-100);
	--sl-input-filled-background-color-hover: var(--sl-color-neutral-100);
	--sl-input-filled-background-color-focus: var(--sl-color-neutral-100);
	--sl-input-filled-background-color-disabled: var(--sl-color-neutral-100);
	--sl-input-filled-color: var(--sl-color-neutral-800);
	--sl-input-filled-color-hover: var(--sl-color-neutral-800);
	--sl-input-filled-color-focus: var(--sl-color-neutral-700);
	--sl-input-filled-color-disabled: var(--sl-color-neutral-800);

	--sl-input-help-text-color: var(--sl-color-neutral-500);

	--sl-tooltip-background-color: var(--sl-color-neutral-800);
	--sl-tooltip-color: var(--sl-color-neutral-0);
}

body.${r$3(spec.CssName)} {
	background: var(--sl-color-neutral-${spec.ContrastBody});
	color: var(--sl-color-neutral-${spec.ContrastText});
}`;
const tokenToCssFactory = (toString) => (tokens) => Object.entries(tokens)
    .map(([k, v]) => `${k}: ${toString(v)};`)
    .join("\n");
const shadowToString = (s) => `${s.XYBlurSpread} ${ToStringHsl(s.Color)}`;
const getIsColor = (v) => v.alpha !== undefined;
const tokenToString = (v) => getIsColor(v)
    ? ToStringHsl(v)
    : shadowToString(v);
const colorsToCss = tokenToCssFactory(ToStringHsl);
const tokensToCss = tokenToCssFactory(tokenToString);
const shoelaceDark = {
    // Elevations (box shadows)
    "--sl-shadow-x-small": {
        XYBlurSpread: "0 1px 2px", Color: Hsl(0, 0, 0, 18)
    },
    "--sl-shadow-small": {
        XYBlurSpread: "0 1px 2px", Color: Hsl(0, 0, 0, 24)
    },
    "--sl-shadow-medium": {
        XYBlurSpread: "0 2px 4px", Color: Hsl(0, 0, 0, 24)
    },
    "--sl-shadow-large": {
        XYBlurSpread: "0 2px 8px", Color: Hsl(0, 0, 0, 24)
    },
    "--sl-shadow-x-large": {
        XYBlurSpread: "0 4px 16px", Color: Hsl(0, 0, 0, 24)
    },
    // *** Forms ***
    "--sl-focus-ring": {
        XYBlurSpread: "0 0 0 3px", Color: Hsl(198.6, 88.7, 48.4, 45)
    },
    // Overlays
    "--sl-overlay-background-color": Hsl(0, 0, 0, 43),
};
const shoelaceLight = {
    // Elevations (box shadows)
    "--sl-shadow-x-small": {
        XYBlurSpread: "0 1px 2px", Color: Hsl(240, 3.8, 46.1, 6)
    },
    "--sl-shadow-small": {
        XYBlurSpread: "0 1px 2px", Color: Hsl(240, 3.8, 46.1, 12)
    },
    "--sl-shadow-medium": {
        XYBlurSpread: "0 2px 4px", Color: Hsl(240, 3.8, 46.1, 12)
    },
    "--sl-shadow-large": {
        XYBlurSpread: "0 2px 8px", Color: Hsl(240, 3.8, 46.1, 12)
    },
    "--sl-shadow-x-large": {
        XYBlurSpread: "0 4px 16px", Color: Hsl(240, 3.8, 46.1, 12)
    },
    // *** Forms ***
    "--sl-focus-ring": {
        XYBlurSpread: "0 0 0 3px", Color: Hsl(198.6, 88.7, 48.4, 40)
    },
    // Overlays
    "--sl-overlay-background-color": Hsl(240, 3.8, 46.1, 33),
};
const RANGE_START = [50, 100, 200, 300, 400, 500];
const RANGE_END = [600, 700, 800, 900, 950];
const Tokenize = (token, colors) => {
    const r1 = token === "neutral" ? [0, ...RANGE_START] : RANGE_START;
    const r2 = token === "neutral" ? [...RANGE_END, 1000] : RANGE_END;
    return {
        ...tokenizeRange(token, r1, [colors.Min, colors.C500]),
        ...tokenizeRange(token, r2, [colors.C600, colors.Max]),
    };
};
const slTokenizeAll = (cs) => Object.entries(cs)
    .map(([key, value]) => Tokenize(key, value))
    .reduce((a, g) => ({ ...a, ...g }));
const tokenizeRange = (token, steps, colors) => {
    const tokens = steps.map(s => `--sl-color-${token}-${s}`);
    const shades = Interpolate(colors, steps.length);
    const kvs = zip2(tokens, shades);
    return Object.fromEntries(kvs);
};
const zip2 = (xs, ys) => xs.map((_, i) => [xs[i], ys[i]]);

const Halloween = () => ({
    ContrastBody: 50,
    ContrastPanel: 0,
    ContrastText: 900,
    CssName: "halloween-dark",
    IsLight: false,
    Label: "Halloween",
    TokensColorTheme: colors$4,
});
const colors$4 = {
    danger: {
        Min: Hsl(0, 56, 23.9),
        C500: Hsl(0.7, 89.6, 57.2),
        C600: Hsl(0, 98.6, 67.9),
        Max: Hsl(0, 100, 95.9),
    },
    neutral: {
        Min: Hsl(257, 40, 14),
        C500: Hsl(272, 25, 49),
        C600: Hsl(281, 25, 60),
        Max: Hsl(281, 7, 99),
    },
    primary: {
        Min: Hsl(12, 65, 22),
        C500: Hsl(24, 100, 52),
        C600: Hsl(30, 100, 60),
        Max: Hsl(36, 100, 96),
    },
    success: {
        Min: Hsl(114, 30, 16),
        C500: Hsl(96, 34, 48),
        C600: Hsl(86, 51, 58),
        Max: Hsl(80, 100, 92),
    },
    warning: {
        Min: Hsl(200, 60, 18),
        C500: Hsl(200, 70, 50),
        C600: Hsl(200, 80, 60),
        Max: Hsl(200, 100, 95),
    },
};

// https://www.nordtheme.com/
// https://github.com/arcticicestudio/nord/blob/develop/src/nord.css
const Nord = {
    // Custom
    White: Hsl(220, 27, 98),
    GreyLight: Hsl(220, 17, 60),
    GreyDark: Hsl(220, 17, 44),
    Black: Hsl(220, 16, 13),
    /* ***************************************
        *** Polar Night ***
    */
    // "Used for texts, backgrounds, carets and structuring characters like curly- and square brackets."
    // Dark mode: high contrast background
    // Light mode: main text color
    // [0]: Hsl(220, 16, 22),
    // "Used as a lighter background color for UI elements like status bars."
    // Dark mode: low contrast background
    // Light mode: low contrast text
    // [1]: Hsl(220, 16, 28),
    // "In the UI scope it may be used as selection- and highlight color."
    // Dark mode: selection highlight
    // Light mode: borders
    // [2]: Hsl(220, 17, 32),
    // "In the UI scope used as pseudoclass color for disabled elements."
    // Dark mode: Disabled content
    // Light mode: Disabled content
    // [3]: Hsl(220, 16, 36),
    /* ***************************************
        *** Snow Storm ***
    */
    // "In the UI scope used as semi-light background depending on the theme shading design."
    // Dark mode: low contrast text
    // Light mode: low contrast background
    // [4]: Hsl(219, 28, 88),
    // "Used as a lighter background color for UI elements like status bars."
    // nearly indistinguishable from Nord5
    // [5]: Hsl(218, 27, 92),
    // "In the UI scope used as background, selection- and highlight color depending on the theme shading design."
    // Dark mode: main text color
    // Light mode: high contrast background
    // [6]: Hsl(218, 27, 94),
    /* ***************************************
        *** Frost (low sat blues) ***
    */
    // "Bluish core color."
    // [7]: Hsl(179, 25, 65),
    // "Bluish core accent color."
    // "Main color for primary UI elements"
    // "Can be used for: - Markup quotes - Markup link URLs"
    Blue8Custom1: Hsl(200, 35, 21),
    // Official site uses Hsl(193, 43, 63) on hover, but it's low contrast
    Blue8Custom2: Hsl(193, 43, 55),
    Blue8: Hsl(193, 43, 67),
    Blue8Custom4: Hsl(185, 73, 92),
    // "Bluish core color."
    // Special text (grey-blue)
    // [9]: Hsl(210, 34, 63),
    // "Bluish core color"
    // Special text (pastel blue)
    // [10]: Hsl(213, 32, 52),
    /* ***************************************
        *** Aurora (pastel colors) ***
    */
    // "Used for errors"
    C11_RedCustom1: Hsl(354, 38, 10),
    C11_RedCustom2: Hsl(354, 42, 50),
    C11_Red: Hsl(354, 42, 56),
    C11_RedCustom4: Hsl(354, 100, 80),
    // "Used for annotations"
    Orange12: Hsl(14, 51, 63),
    // "In the UI scope used for warnings and git/diff renamings."
    Yellow13Custom1: Hsl(20, 50, 20),
    Yellow13Custom2: Hsl(40, 71, 52),
    Yellow13: Hsl(40, 71, 73),
    Yellow13Custom4: Hsl(60, 100, 95),
    // "In the UI scope used for git/diff additions and success visualizations."
    Green14Custom1: Hsl(98, 25, 25),
    Green14Custom2: Hsl(92, 28, 53),
    Green14: Hsl(92, 28, 65),
    Green14Custom4: Hsl(80, 80, 86),
    // "Used for numbers."
    Purple15: Hsl(311, 20, 63),
};

const NordPolarNight = () => ({
    ContrastBody: 100,
    ContrastPanel: 50,
    ContrastText: 900,
    CssName: "sl-nord-polar-night",
    IsLight: false,
    Label: "Nord - Polar Night",
    TokensColorTheme: colors$3,
});
const colors$3 = {
    danger: {
        Min: Nord.C11_RedCustom1,
        C500: Nord.C11_RedCustom2,
        C600: Nord.C11_Red,
        Max: Nord.C11_RedCustom4,
    },
    neutral: {
        Min: Nord.Black,
        C500: Nord.GreyDark,
        C600: Nord.GreyLight,
        Max: Nord.White,
    },
    primary: {
        Min: Nord.Blue8Custom1,
        C500: Nord.Blue8Custom2,
        C600: Nord.Blue8,
        Max: Nord.Blue8Custom4,
    },
    success: {
        Min: Nord.Green14Custom1,
        C500: Nord.Green14Custom2,
        C600: Nord.Green14,
        Max: Nord.Green14Custom4,
    },
    warning: {
        Min: Nord.Yellow13Custom1,
        C500: Nord.Yellow13Custom2,
        C600: Nord.Yellow13,
        Max: Nord.Yellow13Custom4,
    },
};

const NordSnowStorm = () => ({
    ContrastBody: 50,
    ContrastPanel: 0,
    ContrastText: 900,
    CssName: "sl-nord-snow-storm",
    IsLight: true,
    Label: "Nord - Snow Storm",
    TokensColorTheme: colors$2,
});
const colors$2 = {
    danger: {
        Min: Nord.C11_RedCustom4,
        C500: Nord.C11_Red,
        C600: Nord.C11_RedCustom2,
        Max: Nord.C11_RedCustom1,
    },
    neutral: {
        Min: Nord.White,
        C500: Nord.GreyLight,
        C600: Nord.GreyDark,
        Max: Nord.Black,
    },
    primary: {
        Min: Nord.Blue8Custom4,
        C500: Nord.Blue8,
        C600: Nord.Blue8Custom2,
        Max: Nord.Blue8Custom1,
    },
    success: {
        Min: Nord.Green14Custom4,
        C500: Nord.Green14,
        C600: Nord.Green14Custom2,
        Max: Nord.Green14Custom1,
    },
    warning: {
        Min: Nord.Yellow13Custom4,
        C500: Nord.Yellow13,
        C600: Nord.Yellow13Custom2,
        Max: Nord.Yellow13Custom1,
    },
};

const ShoelaceDark = () => ({
    ContrastBody: 0,
    // ContrastButtonHover: 500,
    ContrastPanel: 50,
    ContrastText: 900,
    CssName: "shoelace-dark",
    IsLight: false,
    Label: "Shoelace - Dark",
    TokensColorTheme: colors$1,
});
const colors$1 = {
    danger: {
        Min: Hsl(0, 56, 23.9),
        C500: Hsl(0.7, 89.6, 57.2),
        C600: Hsl(0, 98.6, 67.9),
        Max: Hsl(0, 100, 95.9),
    },
    neutral: {
        Min: Hsl(240, 5.9, 11),
        C500: Hsl(240, 3.7, 44),
        C600: Hsl(240, 5.3, 58),
        Max: Hsl(0, 0, 100),
    },
    primary: {
        Min: Hsl(203, 63.8, 18),
        C500: Hsl(199.7, 85.9, 47.7),
        C600: Hsl(198.7, 97.9, 57.2),
        Max: Hsl(186, 100, 95.5),
    },
    success: {
        Min: Hsl(144.3, 53.6, 16),
        C500: Hsl(141.1, 64.9, 43),
        C600: Hsl(141.6, 72.4, 55.2),
        Max: Hsl(144, 100, 95.5),
    },
    warning: {
        Min: Hsl(21.9, 66.3, 21.1),
        C500: Hsl(37, 96.6, 48.3),
        C600: Hsl(43.3, 100, 53.4),
        Max: Hsl(60, 100, 94.6),
    },
};

const ShoelaceLight = () => ({
    ContrastBody: 0,
    // ContrastButtonHover: 500,
    ContrastPanel: 0,
    ContrastText: 900,
    CssName: "shoelace-light",
    IsLight: true,
    Label: "Shoelace - Light",
    TokensColorTheme: colors,
});
const colors = {
    danger: {
        Min: Hsl(0, 85.7, 97.3),
        C500: Hsl(0, 84.2, 60.2),
        C600: Hsl(0, 72.2, 50.6),
        Max: Hsl(0, 60, 19.6),
    },
    neutral: {
        Min: Hsl(0, 0, 100),
        C500: Hsl(240, 3.8, 46.1),
        C600: Hsl(240, 5.2, 33.9),
        Max: Hsl(0, 0, 0),
    },
    primary: {
        Min: Hsl(204, 100, 93.1),
        C500: Hsl(198.6, 88.7, 48.4),
        C600: Hsl(200.4, 98, 39.4),
        Max: Hsl(202.3, 73.8, 16.5),
    },
    success: {
        Min: Hsl(138.5, 76.5, 93),
        C500: Hsl(142.1, 70.6, 45.3),
        C600: Hsl(142.1, 76.2, 36.3),
        Max: Hsl(144.3, 60.7, 12),
    },
    warning: {
        Min: Hsl(48, 100, 96.1),
        C500: Hsl(37.7, 92.1, 50.2),
        C600: Hsl(32.1, 94.6, 43.7),
        Max: Hsl(22.9, 74.1, 16.7),
    },
};

const ThrottleFactory = (foo) => {
    let isThrottled = false;
    return () => {
        if (isThrottled) {
            return;
        }
        isThrottled = true;
        setTimeout(() => {
            foo();
            isThrottled = false;
        }, 50);
    };
};

var ThemeLightness;
(function (ThemeLightness) {
    ThemeLightness[ThemeLightness["Dark"] = 1] = "Dark";
    ThemeLightness[ThemeLightness["Light"] = 2] = "Light";
})(ThemeLightness || (ThemeLightness = {}));
const MEDIA_PREF_LIGHT = window.matchMedia("(prefers-color-scheme: light)");
const THEMES_DARK = [
    ShoelaceDark(),
    NordPolarNight(),
    Halloween(),
];
const THEMES_LIGHT = [
    ShoelaceLight(),
    NordSnowStorm(),
];
const createStyle = (id, cssText) => {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = cssText;
    return style;
};
const persisted = (() => {
    const [DARK, LIGHT, LIGHTNESS] = [`theme-park-dark`, `theme-park-light`, `theme-park-lightness`];
    const GetDark = () => THEMES_DARK.find(t => t.CssName === localStorage.getItem(DARK))
        ?? THEMES_DARK[0];
    const GetLight = () => THEMES_LIGHT.find(t => t.CssName === localStorage.getItem(LIGHT))
        ?? THEMES_LIGHT[0];
    const GetLightness = () => {
        const lightness = localStorage.getItem(LIGHTNESS);
        const isLight = lightness === null
            ? MEDIA_PREF_LIGHT.matches
            : lightness === "light";
        return isLight ? ThemeLightness.Light : ThemeLightness.Dark;
    };
    return {
        GetDark, GetLight, GetLightness,
        GetTheme: () => GetLightness() === ThemeLightness.Light ? GetLight() : GetDark(),
        SetDark: (v) => localStorage.setItem(DARK, v),
        SetLight: (v) => localStorage.setItem(LIGHT, v),
        SetLightness: (v) => localStorage.setItem(LIGHTNESS, v === ThemeLightness.Light ? "light" : "dark"),
    };
})();
// TODO move state from provider variable to theme
let gradient = `url("./aurora/aurora-corners.svg")`;
const GetThemeCss = () => ThemeToCss(persisted.GetTheme(), gradient).cssText;
const appendCssColors = ThrottleFactory(() => {
    const theme = persisted.GetTheme();
    const style = createStyle(theme.CssName, GetThemeCss());
    $(document, `style#${theme.CssName}`)?.remove();
    $(document, "head").appendChild(style);
    $(document, "body").className = theme.CssName;
});
const forceRefresh = () => {
    appendCssColors();
    hosts$1.forEach(h => h.requestUpdate());
};
let hosts$1 = [];
forceRefresh();
MEDIA_PREF_LIGHT.addEventListener("change", () => {
    persisted.SetLightness(MEDIA_PREF_LIGHT.matches ? ThemeLightness.Light : ThemeLightness.Dark);
    forceRefresh();
});
class ThemeProvider {
    constructor(host) {
        this.host = host;
        this.GetLightness = () => persisted.GetLightness();
        this.SetLightness = (m) => { persisted.SetLightness(m); forceRefresh(); };
        // We only expose themes here to use their names
        // Would be safer to only return names, but that complicates changing theme
        this.GetThemeOptions = () => persisted.GetLightness() === ThemeLightness.Light ? THEMES_LIGHT : THEMES_DARK;
        this.SetTheme = (o) => {
            if (o.IsLight) {
                persisted.SetLight(o.CssName);
                persisted.SetLightness(ThemeLightness.Light);
            }
            else {
                persisted.SetDark(o.CssName);
                persisted.SetLightness(ThemeLightness.Dark);
            }
            forceRefresh();
        };
        // ********** Theme Properties **********
        this.GetColorsVariant = (variant) => persisted.GetTheme().TokensColorTheme[variant];
        this.SetColorsVariant = (() => {
            return (variant, key, color) => {
                this.GetColorsVariant(variant)[key] = color;
                appendCssColors();
            };
        })();
        this.GetContrastBody = () => persisted.GetTheme().ContrastBody;
        this.SetContrastBody = (contrast) => {
            persisted.GetTheme().ContrastBody = contrast;
            forceRefresh();
        };
        this.GetContrastPanel = () => persisted.GetTheme().ContrastPanel;
        this.SetContrastPanel = (contrast) => {
            persisted.GetTheme().ContrastPanel = contrast;
            forceRefresh();
        };
        this.GetContrastText = () => persisted.GetTheme().ContrastText;
        this.SetContrastText = (contrast) => {
            persisted.GetTheme().ContrastText = contrast;
            forceRefresh();
        };
        // TODO Create a form option when creating new theme
        // Changing light/dark on existing theme makes no sense
        this.GetIsLight = () => persisted.GetTheme().IsLight;
        /* SetIsLight = (isLight: boolean) => {
            persisted.GetTheme().IsLight = isLight
            forceRefresh()
        }*/
        this.GetLabel = () => persisted.GetTheme().Label;
        // TODO move state from provider variable to theme
        this.GetGradient = () => gradient;
        this.SetGradient = (grad) => {
            gradient = grad;
            forceRefresh();
        };
        host.addController(this);
    }
    hostConnected() { hosts$1.push(this.host); }
    hostDisconnected() { hosts$1 = hosts$1.filter(h => h !== this.host); }
}

let _body = class _body extends s$3 {
    constructor() {
        super(...arguments);
        this.theme = new ThemeProvider(this);
        this.render = () => y `
<sl-radio-group
	label="Body Contrast"
	value="${this.theme.GetContrastBody()}"
	@sl-change=${(e) => {
            const option = Number.parseInt(e.currentTarget.value);
            this.theme.SetContrastBody(option);
        }}>
	${[0, 50, 100, 200].map(r => y `<sl-radio-button value="${r}">${r}</sl-radio-button>`)}
</sl-radio-group>
`;
    }
};
_body.styles = [Shared];
_body = __decorate([
    e$5("mode-contrast-body")
], _body);
let _panel = class _panel extends s$3 {
    constructor() {
        super(...arguments);
        this.theme = new ThemeProvider(this);
    }
    render() {
        return y `
<sl-radio-group
	label="Panel Contrast"
	value="${this.theme.GetContrastPanel()}"
	@sl-change=${(e) => {
            const option = Number.parseInt(e.currentTarget.value);
            this.theme.SetContrastPanel(option);
        }}>
	${[0, 50, 100].map(r => y `<sl-radio-button value="${r}">${r}</sl-radio-button>`)}
</sl-radio-group>
`;
    }
};
_panel.styles = [Shared];
_panel = __decorate([
    e$5("mode-contrast-panel")
], _panel);
let _text = class _text extends s$3 {
    constructor() {
        super(...arguments);
        this.theme = new ThemeProvider(this);
        this.render = () => y `
<sl-radio-group
	label="Text Contrast"
	value="${this.theme.GetContrastText()}"
	@sl-change=${(e) => {
            const option = Number.parseInt(e.currentTarget.value);
            this.theme.SetContrastText(option);
        }}>
	${[800, 900, 950, 1000].map(r => y `<sl-radio-button value="${r}">${r}</sl-radio-button>`)}
</sl-radio-group>
`;
    }
};
_text.styles = [Shared];
_text = __decorate([
    e$5("mode-contrast-text")
], _text);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e$3=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$2=o=>void 0===o.strings,f={},s$2=(o,l=f)=>o._$AH=l;

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$3=e$3(class extends i{constructor(r){if(super(r),r.type!==t.PROPERTY&&r.type!==t.ATTRIBUTE&&r.type!==t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!e$2(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(i,[t$1]){if(t$1===x||t$1===b)return t$1;const o=i.element,l=i.name;if(i.type===t.PROPERTY){if(t$1===o[l])return x}else if(i.type===t.BOOLEAN_ATTRIBUTE){if(!!t$1===o.hasAttribute(l))return x}else if(i.type===t.ATTRIBUTE&&o.getAttribute(l)===t$1+"")return x;return s$2(i),t$1}});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s$1=(i,t)=>{var e,o;const r=i._$AN;if(void 0===r)return !1;for(const i of r)null===(o=(e=i)._$AO)||void 0===o||o.call(e,t,!1),s$1(i,t);return !0},o$2=i=>{let t,e;do{if(void 0===(t=i._$AM))break;e=t._$AN,e.delete(i),i=t;}while(0===(null==e?void 0:e.size))},r=i=>{for(let t;t=i._$AM;i=t){let e=t._$AN;if(void 0===e)t._$AN=e=new Set;else if(e.has(i))break;e.add(i),l$2(t);}};function n$2(i){void 0!==this._$AN?(o$2(this),this._$AM=i,r(this)):this._$AM=i;}function h$1(i,t=!1,e=0){const r=this._$AH,n=this._$AN;if(void 0!==n&&0!==n.size)if(t)if(Array.isArray(r))for(let i=e;i<r.length;i++)s$1(r[i],!1),o$2(r[i]);else null!=r&&(s$1(r,!1),o$2(r));else s$1(this,i);}const l$2=i=>{var t$1,s,o,r;i.type==t.CHILD&&(null!==(t$1=(o=i)._$AP)&&void 0!==t$1||(o._$AP=h$1),null!==(s=(r=i)._$AQ)&&void 0!==s||(r._$AQ=n$2));};class c extends i{constructor(){super(...arguments),this._$AN=void 0;}_$AT(i,t,e){super._$AT(i,t,e),r(this),this.isConnected=i._$AU;}_$AO(i,t=!0){var e,r;i!==this.isConnected&&(this.isConnected=i,i?null===(e=this.reconnected)||void 0===e||e.call(this):null===(r=this.disconnected)||void 0===r||r.call(this)),t&&(s$1(this,i),o$2(this));}setValue(t){if(e$2(this._$Ct))this._$Ct._$AI(t,this);else {const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0);}}disconnected(){}reconnected(){}}

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e$1=()=>new o$1;let o$1 = class o{};const h=new WeakMap,n$1=e$3(class extends c{render(t){return b}update(t,[s]){var e;const o=s!==this.Y;return o&&void 0!==this.Y&&this.rt(void 0),(o||this.lt!==this.ct)&&(this.Y=s,this.dt=null===(e=t.options)||void 0===e?void 0:e.host,this.rt(this.ct=t.element)),b}rt(i){var t;if("function"==typeof this.Y){const s=null!==(t=this.dt)&&void 0!==t?t:globalThis;let e=h.get(s);void 0===e&&(e=new WeakMap,h.set(s,e)),void 0!==e.get(this.Y)&&this.Y.call(this.dt,void 0),e.set(this.Y,i),void 0!==i&&this.Y.call(this.dt,i);}else this.Y.value=i;}get lt(){var i,t,s;return "function"==typeof this.Y?null===(t=h.get(null!==(i=this.dt)&&void 0!==i?i:globalThis))||void 0===t?void 0:t.get(this.Y):null===(s=this.Y)||void 0===s?void 0:s.value}disconnected(){this.lt===this.ct&&this.rt(void 0);}reconnected(){this.rt(this.ct);}});

const style$4 = i$4 `
:host {
	display: grid;
	grid-template-columns: auto 1fr auto;
	gap: 1.5rem;
}

.swatch {
	display: inline-block;
	flex-basis: 1rem; flex-grow: 1;
	min-width: 1rem;
	height: 62px;
	border-radius: 2px; }

sl-tab-group[invert-primary] {
	--sl-color-primary-600: var(--sl-color-warning-600); }
sl-tab::part(base) {
	width: 100%;
	padding: var(--sl-spacing-medium); }

sl-tag { min-width: unset; }
sl-tag::part(content) { min-width: 2em; }
sl-tag::part(base):hover { cursor: pointer; }
sl-tag::part(base) {
	background: var(--background); }
sl-tag::part(content) { color: var(--color); }

sl-color-picker {
	--grid-width: 360px; }
sl-color-picker, sl-color-picker::part(base) {
	box-shadow: none; }
sl-color-picker::part(swatches) { display: none; }`;
let _ele$3 = class _ele extends s$3 {
    constructor() {
        super(...arguments);
        this.key = "Min";
        this.themeProvider = new ThemeProvider(this);
        this.pickerRef = e$1();
        this.getSelectedColor = () => {
            const colors = this.themeProvider.GetColorsVariant(this.variant);
            const selectedColor = colors[this.key];
            const format = this.pickerRef.value?.format ?? "hsl";
            return format === "hex" ? selectedColor.hex()
                : format === "rgb" ? toStringRgb(selectedColor)
                    : ToStringHslCommas(selectedColor);
        };
        this.getColorName = (key) => {
            // TODO will soon remove this method
            // Will switch to this.themeProvider.GetMode
            const isLight = this.themeProvider.GetIsLight();
            switch (key) {
                case "Min": return isLight ? "Lightest" : "Darkest";
                case "C500": return "Button Hover";
                case "C600": return "Button";
                case "Max": return isLight ? "Darkest" : "Lightest";
            }
        };
    }
    editColor() {
        const oldValue = this.getSelectedColor();
        const newValue = this.pickerRef.value.value;
        // Setting the value of sl-color-picker triggers change without equality check
        if (newValue === oldValue) {
            return;
        }
        this.themeProvider.SetColorsVariant(this.variant, this.key, color(newValue));
        this.requestUpdate();
    }
    editKey(key) {
        this.key = key;
        this.requestUpdate();
    }
    // sl-color-picker overrides the initial value with white
    // Need to use the 'live' directive and reset the value on 2nd render
    firstUpdated(_) { this.requestUpdate(); }
    render() {
        const colors = this.themeProvider.GetColorsVariant(this.variant);
        const baseColors = Object.entries(colors).map(([k, c]) => ({ key: k, Css: ToStringHsl(c), L: c.lch()[0] }));
        const value = this.getSelectedColor();
        const tokens = Tokenize(this.variant, colors);
        return y `
<div style="grid-column: 1 / span 3; display: flex; gap: 5px; width: 100%;">
	${Object.entries(tokens).map(([k, v]) => y `
	<div class="swatch" style="background: var(${k});">
		<sl-tooltip content="${toStringLchCommas(v)}" .distance=${0}>
			<div style="width: 100%; height: 100%;"></div>
		</sl-tooltip>
	</div>`)}
</div>

<sl-tab-group placement="start" ?invert-primary=${this.variant === "primary"}>
	${baseColors.map(({ key, Css, L }) => y `
	<sl-tab slot="nav"
		@click=${() => this.editKey(key)}>
		<div style="width: 100%; font-size: 1.2em; font-weight: 600; margin-right: 1rem;"
			>${this.getColorName(key)}
		</div>
		<sl-tag
			style="--background: ${Css}; --color: ${L > 50.0 ? "black" : "white"};"
			variant="${this.variant}"
			size="medium"
			>${L.toFixed(1)}
		</sl-tag>
	</sl-tab>`)}
</sl-tab-group>

<sl-color-picker inline
	${n$1(this.pickerRef)}
	@sl-change=${() => this.editColor()}
	format="hsl" .value=${l$3(value)}
></sl-color-picker>

<div style="white-space: nowrap;">
	${Object.values(tokens).map(c => y `
	<div style="font-weight: 600;">${ToStringHsl(c)};</div>`)}
</div>
`;
    }
};
_ele$3.styles = [Shared, style$4];
__decorate([
    e$4({ reflect: true }),
    __metadata("design:type", Object)
], _ele$3.prototype, "variant", void 0);
_ele$3 = __decorate([
    e$5("tab-color-editor")
], _ele$3);
const toStringLchCommas = (color) => {
    const [l, c, h] = color.lch();
    return `lch(${l.toFixed(1)}%, ${c.toFixed(0)}, ${h.toFixed(0)}°)`;
};
const toStringRgb = (c) => {
    const [r, g, b] = c.rgb();
    return `rgb(${r}, ${g}, ${b})`;
};

let hosts = [];
const state = {
    IsOutline: false,
};
class PreviewState {
    constructor(host) {
        this.host = host;
        host.addController(this);
    }
    hostConnected() { hosts.push(this.host); }
    hostDisconnected() { hosts = hosts.filter(h => h !== this.host); }
    GetIsOutline() { return state.IsOutline; }
    SetIsOutline(s) {
        state.IsOutline = s;
        hosts.forEach(h => h.requestUpdate());
    }
}

const style$3 = i$4 `
:host { display: inline-block; }

sl-tab-group::part(nav) {
	display: flex; justify-content: center; }

sl-tab::part(base) {
	padding: var(--sl-spacing-medium);
	padding-top: 0; }
sl-tab-panel::part(base) {
	padding-bottom: 0; }

sl-card {
	margin: 0 auto; }
sl-card::part(base) {
	--padding: 1.5rem;
	box-shadow: var(--sl-shadow-large); }
sl-card::part(body) {
	display: flex; flex-direction: column; gap: 1.5rem; }
`;
const variants$1 = ["primary", "success", "neutral", "warning", "danger"];
let _ele$2 = class _ele extends s$3 {
    constructor() {
        super(...arguments);
        this.previewState = new PreviewState(this);
        this.lastVariant = variants$1[0];
        this.setLast = (e) => {
            if (variants$1.includes(e.detail.name)) {
                this.lastVariant = e.detail.name;
            }
            this.requestUpdate();
        };
    }
    render() {
        const isOutline = this.previewState.GetIsOutline();
        const isCollapsed = $(this, "#hide-colors")?.active ?? false;
        // Timeout so sl-tab events settle and update isCollapsed
        const reExpand = () => setTimeout(() => {
            if (!isCollapsed) {
                return;
            }
            $(this, "sl-tab-group").show(this.lastVariant);
        }, 0);
        return y `
<sl-tab-group style="margin: 0 auto; display: inline-block;"
	@sl-tab-hide=${(e) => this.setLast(e)}>
	${variants$1.map(t => y `
	<sl-tab slot="nav" panel="${t}">
		<sl-button variant="${t}" ?outline=${isOutline}>
			${t[0].toUpperCase() + t.slice(1)}
			<sl-icon slot="suffix" name="palette"></sl-icon>
		</sl-button>
	</sl-tab>
	<sl-tab-panel name="${t}">
		<sl-card>
			<tab-color-editor variant="${t}"></tab-color-editor>
		</sl-card>
	</sl-tab-panel>`)}
	<sl-tab slot="nav" id="hide-colors">
		<sl-button variant="default" ?outline=${isOutline}
			@click=${() => reExpand()}>
			<div style="min-width: 4em;">${isCollapsed ? "Expand" : "Collapse"}</div>
			<sl-icon slot="suffix" name=${isCollapsed ? "chevron-right" : "chevron-down"}></sl-icon>
		</sl-button>
	</sl-tab>
</sl-tab-group>
`;
    }
};
_ele$2.styles = [Shared, style$3];
_ele$2 = __decorate([
    e$5("tab-color-editor-group")
], _ele$2);

const AURORA = [
    [`Drazi Dark`, `url("./aurora/aurora-corners.svg")`],
];
const OPEN_PROPS = [
    [`Open Props 1`, `var(--gradient-1)`],
];
let _class$2 = class _class extends s$3 {
    constructor() {
        super(...arguments);
        this.themeProvider = new ThemeProvider(this);
        this.selected = AURORA[0];
    }
    handleSelect(e) {
        const option = e.detail.item.Option;
        if (option === this.selected) {
            return;
        }
        this.selected = option;
        this.themeProvider.SetGradient(option[1]);
    }
    render() {
        const toMenuItem = (o) => y `
<sl-menu-item
	type="checkbox" ?checked=${o === this.selected}
	.Option=${o}>${o[0]}
</sl-menu-item>`;
        return y `
<sl-dropdown
	@sl-select=${(e) => this.handleSelect(e)}>
	<sl-button variant="default" size="medium" slot="trigger"
		>${this.selected[0]}
		<sl-icon slot="suffix" name="caret-down-fill"></sl-icon>
	</sl-button>
	<sl-menu>
		<ui-menu-header>Aurora</ui-menu-header>
		${AURORA.map(toMenuItem)}
		<ui-menu-header>Open Props</ui-menu-header>
		${OPEN_PROPS.map(toMenuItem)}
	</sl-menu>
</sl-dropdown>`;
    }
};
_class$2.styles = [Shared];
_class$2 = __decorate([
    e$5("select-gradient")
], _class$2);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o=e$3(class extends i{constructor(t$1){var i;if(super(t$1),t$1.type!==t.ATTRIBUTE||"class"!==t$1.name||(null===(i=t$1.strings)||void 0===i?void 0:i.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return " "+Object.keys(t).filter((i=>t[i])).join(" ")+" "}update(i,[s]){var r,o;if(void 0===this.nt){this.nt=new Set,void 0!==i.strings&&(this.st=new Set(i.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(r=this.st)||void 0===r?void 0:r.has(t))&&this.nt.add(t);return this.render(s)}const e=i.element.classList;this.nt.forEach((t=>{t in s||(e.remove(t),this.nt.delete(t));}));for(const t in s){const i=!!s[t];i===this.nt.has(t)||(null===(o=this.st)||void 0===o?void 0:o.has(t))||(i?(e.add(t),this.nt.add(t)):(e.remove(t),this.nt.delete(t)));}return x}});

class HasSlotController {
    constructor(host, ...slotNames) {
        this.slotNames = [];
        (this.host = host).addController(this);
        this.slotNames = slotNames;
        this.handleSlotChange = this.handleSlotChange.bind(this);
    }
    hasDefaultSlot() {
        return [...this.host.childNodes].some(node => {
            if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== '') {
                return true;
            }
            if (node.nodeType === node.ELEMENT_NODE) {
                const el = node;
                const tagName = el.tagName.toLowerCase();
                // Ignore visually hidden elements since they aren't rendered
                if (tagName === 'sl-visually-hidden') {
                    return false;
                }
                // If it doesn't have a slot attribute, it's part of the default slot
                if (!el.hasAttribute('slot')) {
                    return true;
                }
            }
            return false;
        });
    }
    hasNamedSlot(name) {
        return this.host.querySelector(`:scope > [slot="${name}"]`) !== null;
    }
    test(slotName) {
        return slotName === '[default]' ? this.hasDefaultSlot() : this.hasNamedSlot(slotName);
    }
    hostConnected() {
        this.host.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
    }
    hostDisconnected() {
        this.host.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
    }
    handleSlotChange(event) {
        const slot = event.target;
        if ((this.slotNames.includes('[default]') && !slot.name) || (slot.name && this.slotNames.includes(slot.name))) {
            this.host.requestUpdate();
        }
    }
}

class ShoelaceElement extends s$3 {
    /** Emits a custom event with more convenient defaults. */
    emit(name, options) {
        const event = new CustomEvent(name, {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {},
            ...options
        });
        this.dispatchEvent(event);
        return event;
    }
}
__decorate([
    e$4(),
    __metadata("design:type", String)
], ShoelaceElement.prototype, "dir", void 0);
__decorate([
    e$4(),
    __metadata("design:type", String)
], ShoelaceElement.prototype, "lang", void 0);

var componentStyles = i$4 `
	:host {
		box-sizing: border-box;
	}
	:host *,
	:host *::before,
	:host *::after {
		box-sizing: inherit;
	}
	[hidden] {
		display: none !important;
	}
`;

const style$2 = i$4 `
	${componentStyles}

	:host {
		--border-color: var(--sl-color-neutral-200);
		--border-radius: var(--sl-border-radius-medium);
		--border-width: 1px;
		--padding: var(--sl-spacing-large);
		display: inline-block;
	}
	.card {
		display: flex;
		flex-direction: column;
		background-color: var(--sl-panel-background-color);
		box-shadow: var(--sl-shadow-x-small);
		border: solid var(--border-width) var(--border-color);
		border-radius: var(--border-radius);
	}
	.card__image {
		display: flex;
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
		margin: calc(-1 * var(--border-width));
		overflow: hidden;
	}
	.card__image::slotted(img) {
		display: block;
		width: 100%;
	}
	.card:not(.card--has-image) .card__image {
		display: none;
	}
	.card__header {
		display: block;
		border-bottom: solid var(--border-width) var(--border-color);
		padding: calc(var(--padding) / 2) var(--padding);
	}
	.card:not(.card--has-header) .card__header {
		display: none;
	}
	.card:not(.card--has-image) .card__header {
		border-top-left-radius: var(--border-radius);
		border-top-right-radius: var(--border-radius);
	}
	.card__body {
		display: block;
		padding: var(--padding);
	}
	.card--has-footer .card__footer {
		display: block;
		border-top: solid var(--border-width) var(--border-color);
		padding: var(--padding);
	}
	.card:not(.card--has-footer) .card__footer {
		display: none;
	}
`;
const variants = i$4 `
:host([variant="outline"]) {
	height: fit-content;
	border-radius: var(--border-radius);
	padding: var(--sl-spacing-2x-small);
	background: var(--tp-card-decorative-bg, var(--sl-color-primary-300));
}
:host([variant="outline"]) .card {
	border: none;
}

:host([variant="decorative"]) {
	--icon-fill: currentColor;
	background: var(--card-decorative-bg);
}
:host([variant="decorative"]) .card__header {
	border: none;
}
:host([variant="decorative"]) .card {
	color: var(--sl-color-neutral-1000);
	background: transparent;
	backdrop-filter: blur(5px);
	border: none;
}
`;
/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://shoelace.style/components/card
 * @status stable
 * @since 2.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot image - An optional image to render at the start of the card.
 *
 * @csspart base - The component's base wrapper.
 * @csspart image - The container that wraps the card's image.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty --border-color - The card's border color, including borders that occur inside the card.
 * @cssproperty --border-radius - The border radius for the card's edges.
 * @cssproperty --border-width - The width of the card's borders.
 * @cssproperty --padding - The padding to use for the card's sections.
 */
let SlCard = class SlCard extends ShoelaceElement {
    constructor() {
        super(...arguments);
        this.variant = 'subtle';
        this.hasSlotController = new HasSlotController(this, 'footer', 'header', 'image');
        this.render = () => {
            return y `
			<div
				part="base"
				class=${o({
                card: true,
                'card--has-footer': this.hasSlotController.test('footer'),
                'card--has-image': this.hasSlotController.test('image'),
                'card--has-header': this.hasSlotController.test('header')
            })}
			>
				<slot name="image" part="image" class="card__image"></slot>
				<slot name="header" part="header" class="card__header"></slot>
				<slot part="body" class="card__body"></slot>
				<slot name="footer" part="footer" class="card__footer"></slot>
			</div>
		`;
        };
    }
};
SlCard.styles = [style$2, variants];
__decorate([
    e$4({ reflect: true }),
    __metadata("design:type", String)
], SlCard.prototype, "variant", void 0);
SlCard = __decorate([
    e$5('sl-card')
], SlCard);

/**
 * Runs when observed properties change, e.g. @property or @state, but before the component updates. To wait for an
 * update to complete after a change occurs, use `await this.updateComplete` in the handler. To start watching after the
 * initial update/render, use `{ waitUntilFirstUpdate: true }` or `this.hasUpdated` in the handler.
 *
 * Usage:
 *
 * @watch('propName')
 * handlePropChange(oldValue, newValue) {
 *   ...
 * }
 */
function watch(propertyName, options) {
    const resolvedOptions = {
        waitUntilFirstUpdate: false,
        ...options
    };
    return (proto, decoratedFnName) => {
        // @ts-expect-error - update is a protected property
        const { update } = proto;
        const watchedProperties = Array.isArray(propertyName) ? propertyName : [propertyName];
        // @ts-expect-error - update is a protected property
        proto.update = function (changedProps) {
            watchedProperties.forEach(property => {
                const key = property;
                if (changedProps.has(key)) {
                    const oldValue = changedProps.get(key);
                    const newValue = this[key];
                    if (oldValue !== newValue) {
                        if (!resolvedOptions.waitUntilFirstUpdate || this.hasUpdated) {
                            this[decoratedFnName](oldValue, newValue);
                        }
                    }
                }
            });
            update.call(this, changedProps);
        };
    };
}

/**
 * @cssproperty --color - The color or CSS gradient of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
const style$1 = i$4 `
${componentStyles}

:host {
	--width: var(--sl-panel-border-width);
	--spacing: var(--sl-spacing-medium);
	background: var(--color, var(--sl-panel-border-color));
}
:host(:not([vertical])) {
	display: block;
	height: var(--width);
	margin: var(--spacing) 0;
}
:host([vertical]) {
	display: inline-block; height: 100%;
	width: var(--width);
	margin: 0 var(--spacing);
}
`;
let _class$1 = class _class extends s$3 {
    constructor() {
        super(...arguments);
        this.vertical = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'separator');
    }
    handleVerticalChange() {
        this.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal');
    }
};
_class$1.styles = [style$1];
__decorate([
    e$4({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], _class$1.prototype, "vertical", void 0);
__decorate([
    watch('vertical'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], _class$1.prototype, "handleVerticalChange", null);
_class$1 = __decorate([
    e$5('sl-divider')
], _class$1);

const style = i$4 `
:host {
	display: block;
	font-weight: 600;
	white-space: nowrap;
	--min-line-width: Calc(var(--sl-spacing-x-large) - 2 * var(--sl-spacing-x-small));
}
sl-menu-label::part(base) {
	display: flex; gap: var(--sl-spacing-x-small); align-items: center;
	padding-left: var(--sl-spacing-x-small);
	background: var(--sl-panel-background-color);
}
.line { height: 2px; width: var(--min-line-width); background: currentColor; }
.left { flex: 0 0 var(--min-line-width); }
.right { flex: 1 0 var(--min-line-width); }
`;
let _class = class _class extends s$3 {
    constructor() {
        super(...arguments);
        this.render = () => y `
<sl-menu-label>
	<div class="line left"></div>
	<div><slot></slot></div>
	<div class="line right"></div>
</sl-menu-label>`;
    }
};
_class.styles = [Shared, style];
_class = __decorate([
    e$5("ui-menu-header")
], _class);

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const e=Symbol.for(""),l$1=t=>{if((null==t?void 0:t.r)===e)return null==t?void 0:t._$litStatic$},s=new Map,a=t=>(r,...e)=>{const o=e.length;let i,a;const n=[],u=[];let c,$=0,f=!1;for(;$<o;){for(c=r[$];$<o&&void 0!==(a=e[$],i=l$1(a));)c+=i+r[++$],f=!0;u.push(a),n.push(c),$++;}if($===o&&n.push(r[o]),f){const t=n.join("$$lit$$");void 0===(r=s.get(t))&&(n.raw=n,s.set(t,r=n)),e=u;}return t(r,...e)},n=a(y);

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l=l=>null!=l?l:b;

const buttonStyles = i$4 `
	${componentStyles}
	:host {
		display: inline-block;
		position: relative;
		width: auto;
		cursor: pointer;
	}
	.button {
		display: inline-flex;
		align-items: stretch;
		justify-content: center;
		width: 100%;
		border-style: solid;
		border-width: var(--sl-input-border-width);
		font-family: var(--sl-input-font-family);
		font-weight: var(--sl-font-weight-semibold);
		text-decoration: none;
		user-select: none;
		white-space: nowrap;
		vertical-align: middle;
		padding: 0;
		transition: var(--sl-transition-x-fast) background-color, var(--sl-transition-x-fast) color,
			var(--sl-transition-x-fast) border, var(--sl-transition-x-fast) box-shadow;
		cursor: inherit;
	}
	.button::-moz-focus-inner {
		border: 0;
	}
	.button:focus {
		outline: none;
	}
	.button:focus-visible {
		outline: var(--sl-focus-ring);
		outline-offset: var(--sl-focus-ring-offset);
	}
	.button--disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	/* When disabled, prevent mouse events from bubbling up */
	.button--disabled * {
		pointer-events: none;
	}
	.button__prefix,
	.button__suffix {
		flex: 0 0 auto;
		display: flex;
		align-items: center;
		pointer-events: none;
	}
	.button__label {
		display: inline-block;
	}
	.button__label::slotted(sl-icon) {
		vertical-align: -2px;
	}
	/*
	 * Standard buttons
	 */
	/* Default */
	.button--default {
		background-color: var(--sl-color-neutral-0);
		border-color: var(--sl-color-neutral-300);
		color: var(--sl-color-neutral-700);
	}
	.button--default:hover:not(.button--disabled) {
		background-color: var(--sl-color-primary-50);
		border-color: var(--sl-color-primary-300);
		color: var(--sl-color-primary-700);
	}
	.button--default:active:not(.button--disabled) {
		background-color: var(--sl-color-primary-100);
		border-color: var(--sl-color-primary-400);
		color: var(--sl-color-primary-700);
	}
	.button--default.button--checked {
		border-color: var(--sl-color-primary-200);
		box-shadow: 0 0 10px 4px var(--sl-color-primary-100) inset;
	}
	.button--default.button--checked:hover {
		border-color: var(--sl-color-primary-300);
		box-shadow: 0 0 10px 6px var(--sl-color-primary-100) inset;
	}
	/*
	 * Text buttons
	 */
	.button--text {
		background-color: transparent;
		border-color: transparent;
		color: var(--sl-color-primary-600);
	}
	.button--text:hover:not(.button--disabled) {
		background-color: transparent;
		border-color: transparent;
		color: var(--sl-color-primary-500);
	}
	.button--text:focus-visible:not(.button--disabled) {
		background-color: transparent;
		border-color: transparent;
		color: var(--sl-color-primary-500);
	}
	.button--text:active:not(.button--disabled) {
		background-color: transparent;
		border-color: transparent;
		color: var(--sl-color-primary-700);
	}
	/*
	 * Size modifiers
	 */
	.button--small {
		font-size: var(--sl-button-font-size-small);
		height: var(--sl-input-height-small);
		line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
		border-radius: var(--sl-input-border-radius-small);
	}
	.button--medium {
		font-size: var(--sl-button-font-size-medium);
		height: var(--sl-input-height-medium);
		line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
		border-radius: var(--sl-input-border-radius-medium);
	}
	.button--large {
		font-size: var(--sl-button-font-size-large);
		height: var(--sl-input-height-large);
		line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
		border-radius: var(--sl-input-border-radius-large);
	}
	/*
	 * Pill modifier
	 */
	.button--pill.button--small {
		border-radius: var(--sl-input-height-small);
	}
	.button--pill.button--medium {
		border-radius: var(--sl-input-height-medium);
	}
	.button--pill.button--large {
		border-radius: var(--sl-input-height-large);
	}
	/*
	 * Circle modifier
	 */
	.button--circle {
		padding-left: 0;
		padding-right: 0;
	}
	.button--circle.button--small {
		width: var(--sl-input-height-small);
		border-radius: 50%;
	}
	.button--circle.button--medium {
		width: var(--sl-input-height-medium);
		border-radius: 50%;
	}
	.button--circle.button--large {
		width: var(--sl-input-height-large);
		border-radius: 50%;
	}
	.button--circle .button__prefix,
	.button--circle .button__suffix {
		display: none;
	}
	/*
	 * Badges
	 */
	.button ::slotted(sl-badge) {
		position: absolute;
		top: 0;
		right: 0;
		translate: 50% -50%;
		pointer-events: none;
	}
	.button--rtl ::slotted(sl-badge) {
		right: auto;
		left: 0;
		translate: -50% -50%;
	}
	/*
	 * Button spacing
	 */
	.button--has-label.button--small .button__label {
		padding: 0 var(--sl-spacing-small);
	}
	.button--has-label.button--medium .button__label {
		padding: 0 var(--sl-spacing-medium);
	}
	.button--has-label.button--large .button__label {
		padding: 0 var(--sl-spacing-large);
	}
	.button--has-prefix.button--small {
		padding-inline-start: var(--sl-spacing-x-small);
	}
	.button--has-prefix.button--small .button__label {
		padding-inline-start: var(--sl-spacing-x-small);
	}
	.button--has-prefix.button--medium {
		padding-inline-start: var(--sl-spacing-small);
	}
	.button--has-prefix.button--medium .button__label {
		padding-inline-start: var(--sl-spacing-small);
	}
	.button--has-prefix.button--large {
		padding-inline-start: var(--sl-spacing-small);
	}
	.button--has-prefix.button--large .button__label {
		padding-inline-start: var(--sl-spacing-small);
	}
	.button--has-suffix.button--small {
		padding-inline-end: var(--sl-spacing-x-small);
	}
	.button--has-suffix.button--small .button__label {
		padding-inline-end: var(--sl-spacing-x-small);
	}
	.button--has-suffix.button--medium {
		padding-inline-end: var(--sl-spacing-small);
	}
	.button--has-suffix.button--medium .button__label {
		padding-inline-end: var(--sl-spacing-small);
	}
	.button--has-suffix.button--large{
		padding-inline-end: var(--sl-spacing-small);
	}
	.button--has-suffix.button--large .button__label {
		padding-inline-end: var(--sl-spacing-small);
	}
	/*
	 * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
	 * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
	 * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
	 * buttons and we style them here instead.
	 */
	:host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
		border-start-end-radius: 0;
		border-end-end-radius: 0;
	}
	:host(.sl-button-group__button--inner) .button {
		border-radius: 0;
	}
	:host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
		border-start-start-radius: 0;
		border-end-start-radius: 0;
	}
	/* All except the first */
	:host(.sl-button-group__button:not(.sl-button-group__button--first)) {
		margin-inline-start: calc(-1 * var(--sl-input-border-width));
	}
	/* Add a visual separator between solid buttons */
	:host(
			.sl-button-group__button:not(
					.sl-button-group__button--first,
					.sl-button-group__button--radio,
					[variant='default']
				):not(:hover)
		)
		.button:after {
		content: '';
		position: absolute;
		top: 0;
		inset-inline-start: 0;
		bottom: 0;
		border-left: solid 1px rgb(128 128 128 / 33%);
		mix-blend-mode: multiply;
	}
	/* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
	:host(.sl-button-group__button--hover) {
		z-index: 1;
	}
	/* Focus and checked are always on top */
	:host(.sl-button-group__button--focus),
	:host(.sl-button-group__button[checked]) {
		z-index: 2;
	}
`;
const styles = i$4 `
	${buttonStyles}
	.button__prefix,
	.button__suffix,
	.button__label {
		display: inline-flex;
		position: relative;
		align-items: center;
	}
	/* We use a hidden input so constraint validation errors work, since they don't appear to show when used with buttons.
		We can't actually hide it, though, otherwise the messages will be suppressed by the browser. */
	.hidden-input {
		all: unset;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		outline: dotted 1px red;
		opacity: 0;
		z-index: -1;
	}
`;
/**
 * @summary Radios buttons allow the user to select a single option from a group using a button-like control.
 * @documentation https://shoelace.style/components/radio-button
 * @status stable
 * @since 2.0
 *
 * @slot - The radio button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @event sl-blur - Emitted when the button loses focus.
 * @event sl-focus - Emitted when the button gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart button - The internal `<button>` element.
 * @csspart button--checked - The internal button element when the radio button is checked.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The container that wraps the radio button's label.
 * @csspart suffix - The container that wraps the suffix.
 */
let SlRadioButton = class SlRadioButton extends ShoelaceElement {
    constructor() {
        super(...arguments);
        this.hasSlotController = new HasSlotController(this, '[default]', 'prefix', 'suffix');
        this.hasFocus = false;
        /**
         * @internal The radio button's checked state. This is exposed as an "internal" attribute so we can reflect it, making
         * it easier to style in button groups.
         */
        this.checked = false;
        /** Disables the radio button. */
        this.disabled = false;
        /** The radio button's size. */
        this.size = 'medium';
        /** Draws a pill-style radio button with rounded edges. */
        this.pill = false;
        this.render = () => {
            return n `
			<div part="base" role="presentation">
				<button
					part="${`button${this.checked ? ' button--checked' : ''}`}"
					role="radio"
					aria-checked="${this.checked}"
					class=${o({
                button: true,
                'button--default': true,
                'button--small': this.size === 'small',
                'button--medium': this.size === 'medium',
                'button--large': this.size === 'large',
                'button--checked': this.checked,
                'button--disabled': this.disabled,
                'button--focused': this.hasFocus,
                'button--pill': this.pill,
                'button--has-label': this.hasSlotController.test('[default]'),
                'button--has-prefix': this.hasSlotController.test('prefix'),
                'button--has-suffix': this.hasSlotController.test('suffix'),
            })}
					aria-disabled=${this.disabled}
					type="button"
					value=${l(this.value)}
					tabindex="${this.checked ? '0' : '-1'}"
					@blur=${this.handleBlur}
					@focus=${this.handleFocus}
					@click=${this.handleClick}
				>
					<slot name="prefix" part="prefix" class="button__prefix"></slot>
					<slot part="label" class="button__label"></slot>
					<slot name="suffix" part="suffix" class="button__suffix"></slot>
				</button>
			</div>
		`;
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'presentation');
    }
    handleBlur() {
        this.hasFocus = false;
        this.emit('sl-blur');
    }
    handleClick(e) {
        if (this.disabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }
        this.checked = true;
    }
    handleFocus() {
        this.hasFocus = true;
        this.emit('sl-focus');
    }
    handleDisabledChange() {
        this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
    }
    /** Sets focus on the radio button. */
    focus(options) {
        this.input.focus(options);
    }
    /** Removes focus from the radio button. */
    blur() {
        this.input.blur();
    }
};
SlRadioButton.styles = styles;
__decorate([
    i$1('.button'),
    __metadata("design:type", HTMLInputElement)
], SlRadioButton.prototype, "input", void 0);
__decorate([
    i$1('.hidden-input'),
    __metadata("design:type", HTMLInputElement)
], SlRadioButton.prototype, "hiddenInput", void 0);
__decorate([
    t$1(),
    __metadata("design:type", Object)
], SlRadioButton.prototype, "hasFocus", void 0);
__decorate([
    e$4({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], SlRadioButton.prototype, "checked", void 0);
__decorate([
    e$4(),
    __metadata("design:type", String)
], SlRadioButton.prototype, "value", void 0);
__decorate([
    e$4({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], SlRadioButton.prototype, "disabled", void 0);
__decorate([
    e$4({ reflect: true }),
    __metadata("design:type", String)
], SlRadioButton.prototype, "size", void 0);
__decorate([
    e$4({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], SlRadioButton.prototype, "pill", void 0);
__decorate([
    watch('disabled', { waitUntilFirstUpdate: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SlRadioButton.prototype, "handleDisabledChange", null);
SlRadioButton = __decorate([
    e$5('sl-radio-button')
], SlRadioButton);

let _ele$1 = class _ele extends s$3 {
    render() {
        return y `
<sl-button-group>
	<sl-dropdown placement="bottom-end">
		<sl-button variant="default" slot="trigger" size="medium"
			>Export Theme
			<sl-icon slot="suffix" name="caret-down-fill"></sl-icon>
		</sl-button>
		<sl-menu>
			<sl-menu-item
				@click=${() => download(GetThemeCss(), "shoelace-theme.css")}
				>Export Shoelace Theme Tokens
			</sl-menu-item>
			<sl-menu-item>
				<a href="/shoelace-tokens.css" download
					style="color: inherit; text-decoration: inherit;"
					>Export Shoelace Shared CSS
				</a>
			</sl-menu-item>
		</sl-menu>
	</sl-dropdown>
</sl-button-group>`;
    }
};
_ele$1.styles = [Shared];
__decorate([
    e$4({ reflect: true }),
    __metadata("design:type", Object)
], _ele$1.prototype, "variant", void 0);
_ele$1 = __decorate([
    e$5("theme-exporter")
], _ele$1);
const download = (payload, filename) => {
    const blob = new Blob([payload], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
};

let ThemePickerDropdown = class ThemePickerDropdown extends s$3 {
    constructor() {
        super(...arguments);
        this.theme = new ThemeProvider(this);
        this.render = () => y `
<sl-dropdown>
	<sl-button slot="trigger"
		>${this.theme.GetLabel()}
		<sl-icon slot="suffix" name="caret-down-fill"></sl-icon>
	</sl-button>
	<sl-menu
		@sl-select=${(e) => this.theme.SetTheme(e.detail.item.theme)}>
		${this.theme.GetThemeOptions().map(o => y `
		<sl-menu-item
			type="checkbox" ?checked=${o.Label === this.theme.GetLabel()}
			.theme="${o}">${o.Label}
		</sl-menu-item>`)}
	</sl-menu>
</sl-dropdown>`;
    }
};
ThemePickerDropdown.styles = [Shared];
ThemePickerDropdown = __decorate([
    e$5("theme-picker-dropdown")
], ThemePickerDropdown);
let _themeModeSwitch = class _themeModeSwitch extends s$3 {
    constructor() {
        super(...arguments);
        this.themeProvider = new ThemeProvider(this);
    }
    render() {
        const lightness = this.themeProvider.GetLightness();
        return y `
<sl-radio-group value=${lightness}
	@sl-change=${(e) => {
            const group = e.currentTarget;
            const lightness = Number.parseInt(group.value);
            this.themeProvider.SetLightness(lightness);
        }}>
	<sl-radio-button
		value=${ThemeLightness.Light}
		><sl-icon name="sun"></sl-icon>
	</sl-radio-button>
	<sl-radio-button
		value=${ThemeLightness.Dark}
		><sl-icon name="moon"></sl-icon>
	</sl-radio-button>
</sl-radio-group>`;
    }
};
// pointer-events workaround until shoelace v89 fixes icons
_themeModeSwitch.styles = [Shared, i$4 `sl-icon { pointer-events: none; }`];
_themeModeSwitch = __decorate([
    e$5("theme-picker-switch")
], _themeModeSwitch);

let _ele = class _ele extends s$3 {
    constructor() {
        super(...arguments);
        this.previewState = new PreviewState(this);
    }
    render() {
        return y `
<sl-button variant="default" href="https://shoelace.style/" target="_blank"
	>Shoelace
	<sl-icon slot="prefix" name="sl-logo" library="custom"></sl-icon>
</sl-button>
<sl-button variant="default" href="https://github.com/SabineWren/themepark.style" target="_blank"
	>Source
	<sl-icon slot="prefix" name="github"></sl-icon>
</sl-button>
<sl-tooltip placement="right"
	content="Not saved to theme. The app developer chooses when to outline buttons.">
	<sl-switch style="margin: auto; margin-left: 1rem;"
		.checked=${this.previewState.GetIsOutline()}
		@sl-change=${(e) => this.previewState
            .SetIsOutline(e.currentTarget.checked)}
		>Preview Outline
	</sl-switch>
</sl-tooltip>
<div style="flex-grow: 1;"></div>
<theme-exporter></theme-exporter>
<theme-picker-dropdown></theme-picker-dropdown>
<theme-picker-switch></theme-picker-switch>
`;
    }
};
_ele.styles = [Shared, i$4 `:host { display: flex; }`];
_ele = __decorate([
    e$5("top-bar")
], _ele);

// svg => svg.setAttribute("fill", "currentColor")
// TODO link to theme.
const applyGradientFill = (svg) => {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    defs.innerHTML = `
<linearGradient id="global-svg-gradient"
	x1="0%" y1="0%" x2="100%" y2="100%">
	<stop offset="0%" stop-color="var(--icon-gradient-start)" />
	<stop offset="100%" stop-color="var(--icon-gradient-end)" />
</linearGradient>`;
    svg.prepend(defs);
    svg.setAttribute("fill", "var(--icon-fill)");
};
const regIconLib = (libName, dirName) => registerIconLibrary(libName, {
    resolver: name => `./assets/${dirName}/${name}.svg`,
    mutator: applyGradientFill,
});
regIconLib("custom", "custom");
regIconLib("fa", "font-awesome");
regIconLib("default", "bootstrap");
