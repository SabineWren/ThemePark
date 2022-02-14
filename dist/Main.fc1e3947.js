var t,e,r=1,o=2,i=3,s=4,n=t=>(...e)=>({_$litDirective$:t,values:e}),a=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},l=globalThis.trustedTypes,c=l?l.createPolicy("lit-html",{createHTML:t=>t}):void 0,d=`lit$${(Math.random()+"").slice(9)}$`,h="?"+d,u=`<${h}>`,p=document,g=(t="")=>p.createComment(t),b=t=>null===t||"object"!=typeof t&&"function"!=typeof t,f=Array.isArray,m=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,y=/>/g,w=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,_=/'/g,x=/"/g,k=/^(?:script|style|textarea)$/i,C=(e=1,(t,...r)=>({_$litType$:e,strings:t,values:r})),A=Symbol.for("lit-noChange"),E=Symbol.for("lit-nothing"),S=new WeakMap,M=p.createTreeWalker(p,129,null,!1),T=class{constructor({strings:t,_$litType$:e},r){let o;this.parts=[];let i=0,s=0;const n=t.length-1,a=this.parts,[p,b]=((t,e)=>{const r=t.length-1,o=[];let i,s=2===e?"<svg>":"",n=m;for(let e=0;e<r;e++){const r=t[e];let a,l,c=-1,h=0;for(;h<r.length&&(n.lastIndex=h,l=n.exec(r),null!==l);)h=n.lastIndex,n===m?"!--"===l[1]?n=v:void 0!==l[1]?n=y:void 0!==l[2]?(k.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=w):void 0!==l[3]&&(n=w):n===w?">"===l[0]?(n=null!=i?i:m,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?w:'"'===l[3]?x:_):n===x||n===_?n=w:n===v||n===y?n=m:(n=w,i=void 0);const p=n===w&&t[e+1].startsWith("/>")?" ":"";s+=n===m?r+u:c>=0?(o.push(a),r.slice(0,c)+"$lit$"+r.slice(c)+d+p):r+d+(-2===c?(o.push(void 0),e):p)}const a=s+(t[r]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==c?c.createHTML(a):a,o]})(t,e);if(this.el=T.createElement(p,r),M.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=M.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(d)){const r=b[s++];if(t.push(e),void 0!==r){const t=o.getAttribute(r.toLowerCase()+"$lit$").split(d),e=/([.?@])?(.*)/.exec(r);a.push({type:1,index:i,name:e[2],strings:t,ctor:"."===e[1]?P:"?"===e[1]?U:"@"===e[1]?B:L})}else a.push({type:6,index:i})}for(const e of t)o.removeAttribute(e)}if(k.test(o.tagName)){const t=o.textContent.split(d),e=t.length-1;if(e>0){o.textContent=l?l.emptyScript:"";for(let r=0;r<e;r++)o.append(t[r],g()),M.nextNode(),a.push({type:2,index:++i});o.append(t[e],g())}}}else if(8===o.nodeType)if(o.data===h)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=o.data.indexOf(d,t+1));)a.push({type:7,index:i}),t+=d.length-1}i++}}static createElement(t,e){const r=p.createElement("template");return r.innerHTML=t,r}};function O(t,e,r=t,o){var i,s,n,a;if(e===A)return e;let l=void 0!==o?null===(i=r._$Cl)||void 0===i?void 0:i[o]:r._$Cu;const c=b(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,r,o)),void 0!==o?(null!==(n=(a=r)._$Cl)&&void 0!==n?n:a._$Cl=[])[o]=l:r._$Cu=l),void 0!==l&&(e=O(t,l._$AS(t,e.values),l,o)),e}var z=class{constructor(t,e,r,o){var i;this.type=2,this._$AH=E,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=o,this._$Cg=null===(i=null==o?void 0:o.isConnected)||void 0===i||i}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=O(this,t,e),b(t)?t===E||null==t||""===t?(this._$AH!==E&&this._$AR(),this._$AH=E):t!==this._$AH&&t!==A&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return f(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.A(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==E&&b(this._$AH)?this._$AA.nextSibling.data=t:this.S(p.createTextNode(t)),this._$AH=t}T(t){var e;const{values:r,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=T.createElement(o.h,this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===i)this._$AH.m(r);else{const t=new class{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:r},parts:o}=this._$AD,i=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:p).importNode(r,!0);M.currentNode=i;let s=M.nextNode(),n=0,a=0,l=o[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new z(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new R(s,this,t)),this.v.push(e),l=o[++a]}n!==(null==l?void 0:l.index)&&(s=M.nextNode(),n++)}return i}m(t){let e=0;for(const r of this.v)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}(i,this),e=t.p(this.options);t.m(r),this.S(e),this._$AH=t}}_$AC(t){let e=S.get(t.strings);return void 0===e&&S.set(t.strings,e=new T(t)),e}A(t){f(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,o=0;for(const i of t)o===e.length?e.push(r=new z(this.M(g()),this.M(g()),this,this.options)):r=e[o],r._$AI(i),o++;o<e.length&&(this._$AR(r&&r._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},L=class{constructor(t,e,r,o,i){this.type=1,this._$AH=E,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=E}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,r,o){const i=this.strings;let s=!1;if(void 0===i)t=O(this,t,e,0),s=!b(t)||t!==this._$AH&&t!==A,s&&(this._$AH=t);else{const o=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=O(this,o[r+n],e,n),a===A&&(a=this._$AH[n]),s||(s=!b(a)||a!==this._$AH[n]),a===E?t=E:t!==E&&(t+=(null!=a?a:"")+i[n+1]),this._$AH[n]=a}s&&!o&&this.k(t)}k(t){t===E?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},P=class extends L{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===E?void 0:t}},D=l?l.emptyScript:"",U=class extends L{constructor(){super(...arguments),this.type=4}k(t){t&&t!==E?this.element.setAttribute(this.name,D):this.element.removeAttribute(this.name)}},B=class extends L{constructor(t,e,r,o,i){super(t,e,r,o,i),this.type=5}_$AI(t,e=this){var r;if((t=null!==(r=O(this,t,e,0))&&void 0!==r?r:E)===A)return;const o=this._$AH,i=t===E&&o!==E||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==E&&(o===E||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==r?r:this.element,t):this._$AH.handleEvent(t)}},R=class{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){O(this,t)}},I=window.litHtmlPolyfillSupport;null==I||I(T,z),(null!==(t=globalThis.litHtmlVersions)&&void 0!==t?t:globalThis.litHtmlVersions=[]).push("2.1.1");var N,j,H,F=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,V=Symbol(),q=new Map,G=class{constructor(t,e){if(this._$cssResult$=!0,e!==V)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=q.get(this.cssText);return F&&void 0===t&&(q.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}},W=t=>new G("string"==typeof t?t:t+"",V),K=(t,...e)=>{const r=1===t.length?t[0]:e.reduce(((e,r,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[o+1]),t[0]);return new G(r,V)},Y=F?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return W(e)})(t):t,X=window.trustedTypes,J=X?X.emptyScript:"",Z=window.reactiveElementPolyfillSupport,Q={toAttribute(t,e){switch(e){case Boolean:t=t?J:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},tt=(t,e)=>e!==t&&(e==e||t==t),et={attribute:!0,type:String,converter:Q,reflect:!1,hasChanged:tt},rt=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,r)=>{const o=this._$Eh(r,e);void 0!==o&&(this._$Eu.set(o,r),t.push(o))})),t}static createProperty(t,e=et){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const r="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,r,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,r){return{get(){return this[e]},set(o){const i=this[t];this[e]=o,this.requestUpdate(t,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||et}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of e)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(Y(t))}else void 0!==t&&e.push(Y(t));return e}static _$Eh(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,r;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(r=t.hostConnected)||void 0===r||r.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return r=e,o=this.constructor.elementStyles,F?r.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):o.forEach((t=>{const e=document.createElement("style"),o=window.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=t.cssText,r.appendChild(e)})),e;var r,o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ES(t,e,r=et){var o,i;const s=this.constructor._$Eh(t,r);if(void 0!==s&&!0===r.reflect){const n=(null!==(i=null===(o=r.converter)||void 0===o?void 0:o.toAttribute)&&void 0!==i?i:Q.toAttribute)(e,r.type);this._$Ei=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Ei=null}}_$AK(t,e){var r,o,i;const s=this.constructor,n=s._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=s.getPropertyOptions(n),a=t.converter,l=null!==(i=null!==(o=null===(r=a)||void 0===r?void 0:r.fromAttribute)&&void 0!==o?o:"function"==typeof a?a:null)&&void 0!==i?i:Q.fromAttribute;this._$Ei=n,this[n]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,r){let o=!0;void 0!==t&&(((r=r||this.constructor.getPropertyOptions(t)).hasChanged||tt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===r.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,r))):o=!1),!this.isUpdatePending&&o&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(r)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(r)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}};rt.finalized=!0,rt.elementProperties=new Map,rt.elementStyles=[],rt.shadowRootOptions={mode:"open"},null==Z||Z({ReactiveElement:rt}),(null!==(N=globalThis.reactiveElementVersions)&&void 0!==N?N:globalThis.reactiveElementVersions=[]).push("1.1.0");var ot=class extends rt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,r)=>{var o,i;const s=null!==(o=null==r?void 0:r.renderBefore)&&void 0!==o?o:e;let n=s._$litPart$;if(void 0===n){const t=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:null;s._$litPart$=n=new z(e.insertBefore(g(),t),t,void 0,null!=r?r:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return A}};ot.finalized=!0,ot._$litElement$=!0,null===(j=globalThis.litElementHydrateSupport)||void 0===j||j.call(globalThis,{LitElement:ot});var it=globalThis.litElementPolyfillSupport;null==it||it({LitElement:ot}),(null!==(H=globalThis.litElementVersions)&&void 0!==H?H:globalThis.litElementVersions=[]).push("3.1.0");var st,nt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,at=Symbol(),lt=new Map,ct=t=>new class{constructor(t,e){if(this._$cssResult$=!0,e!==at)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=lt.get(this.cssText);return nt&&void 0===t&&(lt.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}("string"==typeof t?t:t+"",at),dt=nt?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return ct(e)})(t):t,ht=window.trustedTypes,ut=ht?ht.emptyScript:"",pt=window.reactiveElementPolyfillSupport,gt={toAttribute(t,e){switch(e){case Boolean:t=t?ut:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},bt=(t,e)=>e!==t&&(e==e||t==t),ft={attribute:!0,type:String,converter:gt,reflect:!1,hasChanged:bt},mt=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,r)=>{const o=this._$Eh(r,e);void 0!==o&&(this._$Eu.set(o,r),t.push(o))})),t}static createProperty(t,e=ft){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const r="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,r,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,r){return{get(){return this[e]},set(o){const i=this[t];this[e]=o,this.requestUpdate(t,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||ft}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of e)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(dt(t))}else void 0!==t&&e.push(dt(t));return e}static _$Eh(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,r;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(r=t.hostConnected)||void 0===r||r.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return r=e,o=this.constructor.elementStyles,nt?r.adoptedStyleSheets=o.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):o.forEach((t=>{const e=document.createElement("style"),o=window.litNonce;void 0!==o&&e.setAttribute("nonce",o),e.textContent=t.cssText,r.appendChild(e)})),e;var r,o}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ES(t,e,r=ft){var o,i;const s=this.constructor._$Eh(t,r);if(void 0!==s&&!0===r.reflect){const n=(null!==(i=null===(o=r.converter)||void 0===o?void 0:o.toAttribute)&&void 0!==i?i:gt.toAttribute)(e,r.type);this._$Ei=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Ei=null}}_$AK(t,e){var r,o,i;const s=this.constructor,n=s._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=s.getPropertyOptions(n),a=t.converter,l=null!==(i=null!==(o=null===(r=a)||void 0===r?void 0:r.fromAttribute)&&void 0!==o?o:"function"==typeof a?a:null)&&void 0!==i?i:gt.fromAttribute;this._$Ei=n,this[n]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,r){let o=!0;void 0!==t&&(((r=r||this.constructor.getPropertyOptions(t)).hasChanged||bt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===r.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,r))):o=!1),!this.isUpdatePending&&o&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(r)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(r)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}};mt.finalized=!0,mt.elementProperties=new Map,mt.elementStyles=[],mt.shadowRootOptions={mode:"open"},null==pt||pt({ReactiveElement:mt}),(null!==(st=globalThis.reactiveElementVersions)&&void 0!==st?st:globalThis.reactiveElementVersions=[]).push("1.1.0");
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
var vt=n(class extends a{constructor(t){var e;if(super(t),t.type!==r||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){var r,o;if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.et=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!(null===(r=this.et)||void 0===r?void 0:r.has(t))&&this.st.add(t);return this.render(e)}const i=t.element.classList;this.st.forEach((t=>{t in e||(i.remove(t),this.st.delete(t))}));for(const t in e){const r=!!e[t];r===this.st.has(t)||(null===(o=this.et)||void 0===o?void 0:o.has(t))||(r?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return A}}),yt=t=>null!=t?t:E
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,wt=Object.create,_t=Object.defineProperty,$t=Object.defineProperties,xt=Object.getOwnPropertyDescriptor,kt=Object.getOwnPropertyDescriptors,Ct=Object.getOwnPropertyNames,At=Object.getOwnPropertySymbols,Et=Object.getPrototypeOf,St=Object.prototype.hasOwnProperty,Mt=Object.prototype.propertyIsEnumerable,Tt=(t,e,r)=>e in t?_t(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r,Ot=(t,e)=>{for(var r in e||(e={}))St.call(e,r)&&Tt(t,r,e[r]);if(At)for(var r of At(e))Mt.call(e,r)&&Tt(t,r,e[r]);return t},zt=(t,e)=>$t(t,kt(e)),Lt=(t,e)=>function(){return e||(0,t[Ct(t)[0]])((e={exports:{}}).exports,e),e.exports},Pt=(t,e,r,o)=>{for(var i,s=o>1?void 0:o?xt(e,r):e,n=t.length-1;n>=0;n--)(i=t[n])&&(s=(o?i(e,r,s):i(s))||s);return o&&s&&_t(e,r,s),s},Dt=class extends Event{constructor(t){super("formdata"),this.formData=t}},Ut=class extends FormData{constructor(t){super(t),this.form=t,t.dispatchEvent(new Dt(this))}append(t,e){let r=this.form.elements[t];if(r||(r=document.createElement("input"),r.type="hidden",r.name=t,this.form.appendChild(r)),this.has(t)){const o=this.getAll(t),i=o.indexOf(r.value);-1!==i&&o.splice(i,1),o.push(e),this.set(t,o)}else super.append(t,e);r.value=e}};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Bt(){window.FormData&&!function(){const t=document.createElement("form");let e=!1;return document.body.append(t),t.addEventListener("submit",(t=>{new FormData(t.target),t.preventDefault()})),t.addEventListener("formdata",(()=>e=!0)),t.dispatchEvent(new Event("submit",{cancelable:!0})),t.remove(),e}()&&(window.FormData=Ut,window.addEventListener("submit",(t=>{t.defaultPrevented||new FormData(t.target)})))}"complete"===document.readyState?Bt():window.addEventListener("DOMContentLoaded",(()=>Bt()));var Rt=class{constructor(t,e){(this.host=t).addController(this),this.options=Ot({form:t=>t.closest("form"),name:t=>t.name,value:t=>t.value,disabled:t=>t.disabled,reportValidity:t=>"function"!=typeof t.reportValidity||t.reportValidity()},e),this.handleFormData=this.handleFormData.bind(this),this.handleFormSubmit=this.handleFormSubmit.bind(this)}hostConnected(){this.form=this.options.form(this.host),this.form&&(this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit))}hostDisconnected(){this.form&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form=void 0)}handleFormData(t){const e=this.options.disabled(this.host),r=this.options.name(this.host),o=this.options.value(this.host);e||"string"!=typeof r||void 0===o||(Array.isArray(o)?o.forEach((e=>{t.formData.append(r,e.toString())})):t.formData.append(r,o.toString()))}handleFormSubmit(t){const e=this.options.disabled(this.host),r=this.options.reportValidity;!this.form||this.form.noValidate||e||r(this.host)||(t.preventDefault(),t.stopImmediatePropagation())}submit(){const t=document.createElement("button");this.form&&(t.type="submit",t.style.position="absolute",t.style.width="0",t.style.height="0",t.style.clip="rect(0 0 0 0)",t.style.clipPath="inset(50%)",t.style.overflow="hidden",t.style.whiteSpace="nowrap",this.form.append(t),t.click(),t.remove())}};var It=class{constructor(t,...e){this.slotNames=[],(this.host=t).addController(this),this.slotNames=e,this.handleSlotChange=this.handleSlotChange.bind(this)}hasDefaultSlot(){return[...this.host.childNodes].some((t=>{if(t.nodeType===t.TEXT_NODE&&""!==t.textContent.trim())return!0;if(t.nodeType===t.ELEMENT_NODE){if(!t.hasAttribute("slot"))return!0}return!1}))}hasNamedSlot(t){return null!==this.host.querySelector(`:scope > [slot="${t}"]`)}test(t){return"[default]"===t?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}handleSlotChange(t){const e=t.target;(this.slotNames.includes("[default]")&&!e.name||e.name&&this.slotNames.includes(e.name))&&this.host.requestUpdate()}};function Nt(t){if(!t)return"";const e=t.assignedNodes({flatten:!0});let r="";return[...e].forEach((t=>{t.nodeType===Node.TEXT_NODE&&(r+=t.textContent)})),r}var jt=(()=>{const t=document.createElement("style");let e;try{document.head.appendChild(t),t.sheet.insertRule(":focus-visible { color: inherit }"),e=!0}catch(t){e=!1}finally{t.remove()}return e})(),Ht=W(jt?":focus-visible":":focus"),Ft=K`
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
`,Vt=K`
  ${Ft}

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
    transition: var(--sl-transition-fast) background-color, var(--sl-transition-fast) color,
      var(--sl-transition-fast) border, var(--sl-transition-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
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

  .button__label ::slotted(sl-icon) {
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

  .button--standard.button--default${Ht}:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
    box-shadow: var(--sl-focus-ring);
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

  .button--standard.button--primary${Ht}:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
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

  .button--standard.button--success${Ht}:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
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

  .button--standard.button--neutral${Ht}:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
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

  .button--standard.button--warning${Ht}:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
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

  .button--standard.button--danger${Ht}:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
    box-shadow: var(--sl-focus-ring);
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

  .button--outline.button--default:hover:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default${Ht}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
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

  .button--outline.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary${Ht}:not(.button--disabled) {
    border-color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
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

  .button--outline.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success${Ht}:not(.button--disabled) {
    border-color: var(--sl-color-success-500);
    box-shadow: var(--sl-focus-ring);
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

  .button--outline.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral${Ht}:not(.button--disabled) {
    border-color: var(--sl-color-neutral-500);
    box-shadow: var(--sl-focus-ring);
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

  .button--outline.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning${Ht}:not(.button--disabled) {
    border-color: var(--sl-color-warning-500);
    box-shadow: var(--sl-focus-ring);
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

  .button--outline.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger${Ht}:not(.button--disabled) {
    border-color: var(--sl-color-danger-500);
    box-shadow: var(--sl-focus-ring);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
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

  .button--text${Ht}:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
    box-shadow: var(--sl-focus-ring);
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
    display: flex;
    align-items: center;
  }

  .button--caret .button__caret svg {
    width: 1em;
    height: 1em;
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
    transform: translateY(-50%) translateX(50%);
    pointer-events: none;
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
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-left: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-left: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-right: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-right: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-right: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-left: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(.sl-button-group__button:not(.sl-button-group__button--focus, .sl-button-group__button--first, [variant='default']):not(:hover, :active, :focus))
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump focused buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  :host(.sl-button-group__button--focus) {
    z-index: 2;
  }
`;function qt(t,e,r){const o=new CustomEvent(e,Ot({bubbles:!0,cancelable:!1,composed:!0,detail:{}},r));return t.dispatchEvent(o),o}function Gt(t,e){return new Promise((r=>{t.addEventListener(e,(function o(i){i.target===t&&(t.removeEventListener(e,o),r())}))}))}var Wt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:r,elements:o}=e;return{kind:r,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e),Kt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?zt(Ot({},e),{finisher(r){r.createProperty(e.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(r){r.createProperty(e.key,t)}};function Yt(t){return(e,r)=>void 0!==r?((t,e,r)=>{e.constructor.createProperty(r,t)})(t,e,r):Kt(t,e)}function Xt(t){return Yt(zt(Ot({},t),{state:!0}))}function Jt(t,e){return(({finisher:t,descriptor:e})=>(r,o)=>{var i;if(void 0===o){const o=null!==(i=r.originalKey)&&void 0!==i?i:r.key,s=null!=e?{kind:"method",placement:"prototype",key:o,descriptor:e(r.key)}:zt(Ot({},r),{key:o});return null!=t&&(s.finisher=function(e){t(e,o)}),s}{const i=r.constructor;void 0!==e&&Object.defineProperty(r,o,e(o)),null==t||t(i,o)}})({descriptor:r=>{const o={get(){var e,r;return null!==(r=null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(t))&&void 0!==r?r:null},enumerable:!0,configurable:!0};if(e){const e="symbol"==typeof r?Symbol():"__"+r;o.get=function(){var r,o;return void 0===this[e]&&(this[e]=null!==(o=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(t))&&void 0!==o?o:null),this[e]}}return o}})}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Zt=(t,...e)=>({_$litStatic$:e.reduce(((e,r,o)=>e+(t=>{if(void 0!==t._$litStatic$)return t._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${t}. Use 'unsafeStatic' to pass non-literal values, but\n            take care to ensure page security.`)})(r)+t[o+1]),t[0])}),Qt=new Map,te=(t=>(e,...r)=>{var o;const i=r.length;let s,n;const a=[],l=[];let c,d=0,h=!1;for(;d<i;){for(c=e[d];d<i&&void 0!==(n=r[d],s=null===(o=n)||void 0===o?void 0:o._$litStatic$);)c+=s+e[++d],h=!0;l.push(n),a.push(c),d++}if(d===i&&a.push(e[i]),h){const t=a.join("$$lit$$");void 0===(e=Qt.get(t))&&(a.raw=a,Qt.set(t,e=a)),r=l}return t(e,...r)})(C),ee=class extends ot{constructor(){super(...arguments),this.formSubmitController=new Rt(this),this.hasSlotController=new It(this,"[default]","prefix","suffix"),this.hasFocus=!1,this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button"}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}handleBlur(){this.hasFocus=!1,qt(this,"sl-blur")}handleFocus(){this.hasFocus=!0,qt(this,"sl-focus")}handleClick(t){if(this.disabled||this.loading)return t.preventDefault(),void t.stopPropagation();"submit"===this.type&&this.formSubmitController.submit()}render(){const t=!!this.href,e=t?Zt`a`:Zt`button`;return te`
      <${e}
        part="base"
        class=${vt({button:!0,"button--default":"default"===this.variant,"button--primary":"primary"===this.variant,"button--success":"success"===this.variant,"button--neutral":"neutral"===this.variant,"button--warning":"warning"===this.variant,"button--danger":"danger"===this.variant,"button--text":"text"===this.variant,"button--small":"small"===this.size,"button--medium":"medium"===this.size,"button--large":"large"===this.size,"button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${yt(t?void 0:this.disabled)}
        type=${this.type}
        name=${yt(t?void 0:this.name)}
        value=${yt(t?void 0:this.value)}
        href=${yt(this.href)}
        target=${yt(this.target)}
        download=${yt(this.download)}
        rel=${yt(this.target?"noreferrer noopener":void 0)}
        role="button"
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <span part="prefix" class="button__prefix">
          <slot name="prefix"></slot>
        </span>
        <span part="label" class="button__label">
          <slot></slot>
        </span>
        <span part="suffix" class="button__suffix">
          <slot name="suffix"></slot>
        </span>
        ${this.caret?te`
                <span part="caret" class="button__caret">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              `:""}
        ${this.loading?te`<sl-spinner></sl-spinner>`:""}
      </${e}>
    `}};ee.styles=Vt,Pt([Jt(".button")],ee.prototype,"button",2),Pt([Xt()],ee.prototype,"hasFocus",2),Pt([Yt({reflect:!0})],ee.prototype,"variant",2),Pt([Yt({reflect:!0})],ee.prototype,"size",2),Pt([Yt({type:Boolean,reflect:!0})],ee.prototype,"caret",2),Pt([Yt({type:Boolean,reflect:!0})],ee.prototype,"disabled",2),Pt([Yt({type:Boolean,reflect:!0})],ee.prototype,"loading",2),Pt([Yt({type:Boolean,reflect:!0})],ee.prototype,"outline",2),Pt([Yt({type:Boolean,reflect:!0})],ee.prototype,"pill",2),Pt([Yt({type:Boolean,reflect:!0})],ee.prototype,"circle",2),Pt([Yt()],ee.prototype,"type",2),Pt([Yt()],ee.prototype,"name",2),Pt([Yt()],ee.prototype,"value",2),Pt([Yt()],ee.prototype,"href",2),Pt([Yt()],ee.prototype,"target",2),Pt([Yt()],ee.prototype,"download",2),ee=Pt([Wt("sl-button")],ee);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var re=K`
  ${Ft}

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
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`,oe=class extends ot{render(){return C`
      <svg part="base" class="spinner" role="status">
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};oe.styles=re,oe=Pt([Wt("sl-spinner")],oe);var ie=K`
  ${Ft}

  :host {
    display: inline-block;
  }

  .button-group {
    display: flex;
    flex-wrap: nowrap;
  }
`,se=class extends ot{constructor(){super(...arguments),this.label=""}handleFocus(t){const e=ne(t.target);null==e||e.classList.add("sl-button-group__button--focus")}handleBlur(t){const e=ne(t.target);null==e||e.classList.remove("sl-button-group__button--focus")}handleMouseOver(t){const e=ne(t.target);null==e||e.classList.add("sl-button-group__button--hover")}handleMouseOut(t){const e=ne(t.target);null==e||e.classList.remove("sl-button-group__button--hover")}handleSlotChange(){const t=[...this.defaultSlot.assignedElements({flatten:!0})];t.forEach((e=>{const r=t.indexOf(e),o=ne(e);null!==o&&(o.classList.add("sl-button-group__button"),o.classList.toggle("sl-button-group__button--first",0===r),o.classList.toggle("sl-button-group__button--inner",r>0&&r<t.length-1),o.classList.toggle("sl-button-group__button--last",r===t.length-1))}))}render(){return C`
      <div
        part="base"
        class="button-group"
        role="group"
        aria-label=${this.label}
        @focusout=${this.handleBlur}
        @focusin=${this.handleFocus}
        @mouseover=${this.handleMouseOver}
        @mouseout=${this.handleMouseOut}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};function ne(t){return"sl-button"===t.tagName.toLowerCase()?t:t.querySelector("sl-button")}se.styles=ie,Pt([Jt("slot")],se.prototype,"defaultSlot",2),Pt([Yt()],se.prototype,"label",2),se=Pt([Wt("sl-button-group")],se);var ae=K`
  ${Ft}

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
    border-top-left-radius: var(--border-radius);
    border-top-right-radius: var(--border-radius);
    margin: calc(-1 * var(--border-width));
    overflow: hidden;
  }

  .card__image ::slotted(img) {
    display: block;
    width: 100%;
  }

  .card:not(.card--has-image) .card__image {
    display: none;
  }

  .card__header {
    border-bottom: solid var(--border-width) var(--border-color);
    padding: calc(var(--padding) / 2) var(--padding);
  }

  .card:not(.card--has-header) .card__header {
    display: none;
  }

  .card__body {
    padding: var(--padding);
  }

  .card--has-footer .card__footer {
    border-top: solid var(--border-width) var(--border-color);
    padding: var(--padding);
  }

  .card:not(.card--has-footer) .card__footer {
    display: none;
  }
`,le=class extends ot{constructor(){super(...arguments),this.hasSlotController=new It(this,"footer","header","image")}render(){return C`
      <div
        part="base"
        class=${vt({card:!0,"card--has-footer":this.hasSlotController.test("footer"),"card--has-image":this.hasSlotController.test("image"),"card--has-header":this.hasSlotController.test("header")})}
      >
        <div part="image" class="card__image">
          <slot name="image"></slot>
        </div>

        <div part="header" class="card__header">
          <slot name="header"></slot>
        </div>

        <div part="body" class="card__body">
          <slot></slot>
        </div>

        <div part="footer" class="card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `}};function ce(t,e){function r(r){const o=t.getBoundingClientRect(),i=t.ownerDocument.defaultView,s=o.left+i.pageXOffset,n=o.top+i.pageYOffset,a=r.pageX-s,l=r.pageY-n;e(a,l)}document.addEventListener("pointermove",r,{passive:!0}),document.addEventListener("pointerup",(function t(){document.removeEventListener("pointermove",r),document.removeEventListener("pointerup",t)}))}function de(t,e,r){return t<e?e:t>r?r:t}le.styles=ae,le=Pt([Wt("sl-card")],le);var he,ue=n(class extends a{constructor(t){var e;if(super(t),t.type!==r||"style"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce(((e,r)=>{const o=t[r];return null==o?e:e+`${r=r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${o};`}),"")}update(t,[e]){const{style:r}=t.element;if(void 0===this.ct){this.ct=new Set;for(const t in e)this.ct.add(t);return this.render(e)}this.ct.forEach((t=>{null==e[t]&&(this.ct.delete(t),t.includes("-")?r.removeProperty(t):r[t]="")}));for(const t in e){const o=e[t];null!=o&&(this.ct.add(t),t.includes("-")?r.setProperty(t,o):r[t]=o)}return A}}),pe=K`
  ${Ft}

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

  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(
        to bottom,
        hsl(0, 0%, 100%) 0%,
        hsla(0, 0%, 100%, 0) 50%,
        hsla(0, 0%, 0%, 0) 50%,
        hsl(0, 0%, 0%) 100%
      ),
      linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);
    border-top-left-radius: var(--sl-border-radius-medium);
    border-top-right-radius: var(--sl-border-radius-medium);
    cursor: crosshair;
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
  }

  .color-picker__grid-handle${Ht} {
    outline: none;
    box-shadow: 0 0 0 1px var(--sl-color-primary-500), var(--sl-focus-ring);
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

  .color-picker__slider-handle${Ht} {
    outline: none;
    box-shadow: 0 0 0 1px var(--sl-color-primary-500), var(--sl-focus-ring);
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
    width: 3.25rem;
    height: 2.25rem;
    border: none;
    border-radius: var(--sl-input-border-radius-medium);
    background: none;
    margin-left: var(--sl-spacing-small);
    cursor: copy;
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

  .color-picker__preview${Ht} {
    box-shadow: var(--sl-focus-ring);
    outline: none;
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

  .color-picker__swatch${Ht} {
    outline: none;
    box-shadow: var(--sl-focus-ring);
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
    overflow: visible;
  }

  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: var(--sl-transition-fast) box-shadow;
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
    transition: inherit;
  }

  .color-dropdown__trigger${Ht} {
    outline: none;
  }

  .color-dropdown__trigger${Ht}:not(.color-dropdown__trigger--disabled) {
    box-shadow: var(--sl-focus-ring);
    outline: none;
  }

  .color-dropdown__trigger${Ht}:not(.color-dropdown__trigger--disabled):before {
    box-shadow: inset 0 0 0 1px var(--sl-color-primary-500);
  }

  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`,ge=new Set,be=new MutationObserver(ve),fe=new Map,me=document.documentElement.lang||navigator.language;
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ve(){me=document.documentElement.lang||navigator.language,[...ge.keys()].map((t=>{"function"==typeof t.requestUpdate&&t.requestUpdate()}))}be.observe(document.documentElement,{attributes:!0,attributeFilter:["lang"]});var ye=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){ge.add(this.host)}hostDisconnected(){ge.delete(this.host)}term(t,...e){return function(t,e,...r){const o=t.toLowerCase().slice(0,2),i=t.length>2?t.toLowerCase():"",s=fe.get(i),n=fe.get(o);let a;if(s&&s[e])a=s[e];else if(n&&n[e])a=n[e];else{if(!he||!he[e])return console.error(`No translation found for: ${e}`),e;a=he[e]}return"function"==typeof a?a(...r):a}(this.host.lang||me,t,...e)}date(t,e){return function(t,e,r){return e=new Date(e),new Intl.DateTimeFormat(t,r).format(e)}(this.host.lang||me,t,e)}number(t,e){return function(t,e,r){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(t,r).format(e)}(this.host.lang||me,t,e)}relativeTime(t,e,r){return function(t,e,r,o){return new Intl.RelativeTimeFormat(t,o).format(e,r)}(this.host.lang||me,t,e,r)}};!function(...t){t.map((t=>{const e=t.$code.toLowerCase();fe.set(e,t),he||(he=t)})),ve()}({$code:"en",$name:"English",$dir:"ltr",close:"Close",copy:"Copy",progress:"Progress",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",toggleColorFormat:"Toggle color format"});var we={},_e=n(class extends a{constructor(t){if(super(t),t.type!==i&&t.type!==r&&t.type!==s)throw Error("The `live` directive is not allowed on child or event bindings");if(!(t=>void 0===t.strings)(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===A||e===E)return e;const o=t.element,n=t.name;if(t.type===i){if(e===o[n])return A}else if(t.type===s){if(!!e===o.hasAttribute(n))return A}else if(t.type===r&&o.getAttribute(n)===e+"")return A;return((t,e=we)=>{t._$AH=e})(t),e}});
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function $e(t,e){const r=Ot({waitUntilFirstUpdate:!1},e);return(e,o)=>{const{update:i}=e;if(t in e){const s=t;e.update=function(t){if(t.has(s)){const e=t.get(s),i=this[s];e!==i&&(r.waitUntilFirstUpdate&&!this.hasUpdated||this[o](e,i))}i.call(this,t)}}}}var xe,ke,Ce,Ae=Lt({"node_modules/color-name/index.js"(t,e){e.exports={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]}}}),Ee=Lt({"node_modules/simple-swizzle/node_modules/is-arrayish/index.js"(t,e){e.exports=function(t){return!(!t||"string"==typeof t)&&(t instanceof Array||Array.isArray(t)||t.length>=0&&(t.splice instanceof Function||Object.getOwnPropertyDescriptor(t,t.length-1)&&"String"!==t.constructor.name))}}}),Se=Lt({"node_modules/simple-swizzle/index.js"(t,e){var r=Ee(),o=Array.prototype.concat,i=Array.prototype.slice,s=e.exports=function(t){for(var e=[],s=0,n=t.length;s<n;s++){var a=t[s];r(a)?e=o.call(e,i.call(a)):e.push(a)}return e};s.wrap=function(t){return function(){return t(s(arguments))}}}}),Me=Lt({"node_modules/color-string/index.js"(t,e){var r,o=Ae(),i=Se(),s=Object.hasOwnProperty,n={};for(r in o)s.call(o,r)&&(n[o[r]]=r);var a=e.exports={to:{},get:{}};function l(t,e,r){return Math.min(Math.max(e,t),r)}function c(t){var e=Math.round(t).toString(16).toUpperCase();return e.length<2?"0"+e:e}a.get=function(t){var e,r;switch(t.substring(0,3).toLowerCase()){case"hsl":e=a.get.hsl(t),r="hsl";break;case"hwb":e=a.get.hwb(t),r="hwb";break;default:e=a.get.rgb(t),r="rgb"}return e?{model:r,value:e}:null},a.get.rgb=function(t){if(!t)return null;var e,r,i,n=[0,0,0,1];if(e=t.match(/^#([a-f0-9]{6})([a-f0-9]{2})?$/i)){for(i=e[2],e=e[1],r=0;r<3;r++){var a=2*r;n[r]=parseInt(e.slice(a,a+2),16)}i&&(n[3]=parseInt(i,16)/255)}else if(e=t.match(/^#([a-f0-9]{3,4})$/i)){for(i=(e=e[1])[3],r=0;r<3;r++)n[r]=parseInt(e[r]+e[r],16);i&&(n[3]=parseInt(i+i,16)/255)}else if(e=t.match(/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)){for(r=0;r<3;r++)n[r]=parseInt(e[r+1],0);e[4]&&(e[5]?n[3]=.01*parseFloat(e[4]):n[3]=parseFloat(e[4]))}else{if(!(e=t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/)))return(e=t.match(/^(\w+)$/))?"transparent"===e[1]?[0,0,0,0]:s.call(o,e[1])?((n=o[e[1]])[3]=1,n):null:null;for(r=0;r<3;r++)n[r]=Math.round(2.55*parseFloat(e[r+1]));e[4]&&(e[5]?n[3]=.01*parseFloat(e[4]):n[3]=parseFloat(e[4]))}for(r=0;r<3;r++)n[r]=l(n[r],0,255);return n[3]=l(n[3],0,1),n},a.get.hsl=function(t){if(!t)return null;var e=t.match(/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(e){var r=parseFloat(e[4]);return[(parseFloat(e[1])%360+360)%360,l(parseFloat(e[2]),0,100),l(parseFloat(e[3]),0,100),l(isNaN(r)?1:r,0,1)]}return null},a.get.hwb=function(t){if(!t)return null;var e=t.match(/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/);if(e){var r=parseFloat(e[4]);return[(parseFloat(e[1])%360+360)%360,l(parseFloat(e[2]),0,100),l(parseFloat(e[3]),0,100),l(isNaN(r)?1:r,0,1)]}return null},a.to.hex=function(){var t=i(arguments);return"#"+c(t[0])+c(t[1])+c(t[2])+(t[3]<1?c(Math.round(255*t[3])):"")},a.to.rgb=function(){var t=i(arguments);return t.length<4||1===t[3]?"rgb("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+")":"rgba("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+", "+t[3]+")"},a.to.rgb.percent=function(){var t=i(arguments),e=Math.round(t[0]/255*100),r=Math.round(t[1]/255*100),o=Math.round(t[2]/255*100);return t.length<4||1===t[3]?"rgb("+e+"%, "+r+"%, "+o+"%)":"rgba("+e+"%, "+r+"%, "+o+"%, "+t[3]+")"},a.to.hsl=function(){var t=i(arguments);return t.length<4||1===t[3]?"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)":"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+t[3]+")"},a.to.hwb=function(){var t=i(arguments),e="";return t.length>=4&&1!==t[3]&&(e=", "+t[3]),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+e+")"},a.to.keyword=function(t){return n[t.slice(0,3)]}}}),Te=Lt({"node_modules/color-convert/conversions.js"(t,e){var r=Ae(),o={};for(const t of Object.keys(r))o[r[t]]=t;var i={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};e.exports=i;for(const t of Object.keys(i)){if(!("channels"in i[t]))throw new Error("missing channels property: "+t);if(!("labels"in i[t]))throw new Error("missing channel labels property: "+t);if(i[t].labels.length!==i[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:r}=i[t];delete i[t].channels,delete i[t].labels,Object.defineProperty(i[t],"channels",{value:e}),Object.defineProperty(i[t],"labels",{value:r})}function s(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}i.rgb.hsl=function(t){const e=t[0]/255,r=t[1]/255,o=t[2]/255,i=Math.min(e,r,o),s=Math.max(e,r,o),n=s-i;let a,l;s===i?a=0:e===s?a=(r-o)/n:r===s?a=2+(o-e)/n:o===s&&(a=4+(e-r)/n),a=Math.min(60*a,360),a<0&&(a+=360);const c=(i+s)/2;return l=s===i?0:c<=.5?n/(s+i):n/(2-s-i),[a,100*l,100*c]},i.rgb.hsv=function(t){let e,r,o,i,s;const n=t[0]/255,a=t[1]/255,l=t[2]/255,c=Math.max(n,a,l),d=c-Math.min(n,a,l),h=function(t){return(c-t)/6/d+.5};return 0===d?(i=0,s=0):(s=d/c,e=h(n),r=h(a),o=h(l),n===c?i=o-r:a===c?i=1/3+e-o:l===c&&(i=2/3+r-e),i<0?i+=1:i>1&&(i-=1)),[360*i,100*s,100*c]},i.rgb.hwb=function(t){const e=t[0],r=t[1];let o=t[2];const s=i.rgb.hsl(t)[0],n=1/255*Math.min(e,Math.min(r,o));return o=1-1/255*Math.max(e,Math.max(r,o)),[s,100*n,100*o]},i.rgb.cmyk=function(t){const e=t[0]/255,r=t[1]/255,o=t[2]/255,i=Math.min(1-e,1-r,1-o);return[100*((1-e-i)/(1-i)||0),100*((1-r-i)/(1-i)||0),100*((1-o-i)/(1-i)||0),100*i]},i.rgb.keyword=function(t){const e=o[t];if(e)return e;let i,n=1/0;for(const e of Object.keys(r)){const o=s(t,r[e]);o<n&&(n=o,i=e)}return i},i.keyword.rgb=function(t){return r[t]},i.rgb.xyz=function(t){let e=t[0]/255,r=t[1]/255,o=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,r=r>.04045?((r+.055)/1.055)**2.4:r/12.92,o=o>.04045?((o+.055)/1.055)**2.4:o/12.92;return[100*(.4124*e+.3576*r+.1805*o),100*(.2126*e+.7152*r+.0722*o),100*(.0193*e+.1192*r+.9505*o)]},i.rgb.lab=function(t){const e=i.rgb.xyz(t);let r=e[0],o=e[1],s=e[2];r/=95.047,o/=100,s/=108.883,r=r>.008856?r**(1/3):7.787*r+16/116,o=o>.008856?o**(1/3):7.787*o+16/116,s=s>.008856?s**(1/3):7.787*s+16/116;return[116*o-16,500*(r-o),200*(o-s)]},i.hsl.rgb=function(t){const e=t[0]/360,r=t[1]/100,o=t[2]/100;let i,s,n;if(0===r)return n=255*o,[n,n,n];i=o<.5?o*(1+r):o+r-o*r;const a=2*o-i,l=[0,0,0];for(let t=0;t<3;t++)s=e+1/3*-(t-1),s<0&&s++,s>1&&s--,n=6*s<1?a+6*(i-a)*s:2*s<1?i:3*s<2?a+(i-a)*(2/3-s)*6:a,l[t]=255*n;return l},i.hsl.hsv=function(t){const e=t[0];let r=t[1]/100,o=t[2]/100,i=r;const s=Math.max(o,.01);o*=2,r*=o<=1?o:2-o,i*=s<=1?s:2-s;return[e,100*(0===o?2*i/(s+i):2*r/(o+r)),100*((o+r)/2)]},i.hsv.rgb=function(t){const e=t[0]/60,r=t[1]/100;let o=t[2]/100;const i=Math.floor(e)%6,s=e-Math.floor(e),n=255*o*(1-r),a=255*o*(1-r*s),l=255*o*(1-r*(1-s));switch(o*=255,i){case 0:return[o,l,n];case 1:return[a,o,n];case 2:return[n,o,l];case 3:return[n,a,o];case 4:return[l,n,o];case 5:return[o,n,a]}},i.hsv.hsl=function(t){const e=t[0],r=t[1]/100,o=t[2]/100,i=Math.max(o,.01);let s,n;n=(2-r)*o;const a=(2-r)*i;return s=r*i,s/=a<=1?a:2-a,s=s||0,n/=2,[e,100*s,100*n]},i.hwb.rgb=function(t){const e=t[0]/360;let r=t[1]/100,o=t[2]/100;const i=r+o;let s;i>1&&(r/=i,o/=i);const n=Math.floor(6*e),a=1-o;s=6*e-n,0!=(1&n)&&(s=1-s);const l=r+s*(a-r);let c,d,h;switch(n){default:case 6:case 0:c=a,d=l,h=r;break;case 1:c=l,d=a,h=r;break;case 2:c=r,d=a,h=l;break;case 3:c=r,d=l,h=a;break;case 4:c=l,d=r,h=a;break;case 5:c=a,d=r,h=l}return[255*c,255*d,255*h]},i.cmyk.rgb=function(t){const e=t[0]/100,r=t[1]/100,o=t[2]/100,i=t[3]/100;return[255*(1-Math.min(1,e*(1-i)+i)),255*(1-Math.min(1,r*(1-i)+i)),255*(1-Math.min(1,o*(1-i)+i))]},i.xyz.rgb=function(t){const e=t[0]/100,r=t[1]/100,o=t[2]/100;let i,s,n;return i=3.2406*e+-1.5372*r+-.4986*o,s=-.9689*e+1.8758*r+.0415*o,n=.0557*e+-.204*r+1.057*o,i=i>.0031308?1.055*i**(1/2.4)-.055:12.92*i,s=s>.0031308?1.055*s**(1/2.4)-.055:12.92*s,n=n>.0031308?1.055*n**(1/2.4)-.055:12.92*n,i=Math.min(Math.max(0,i),1),s=Math.min(Math.max(0,s),1),n=Math.min(Math.max(0,n),1),[255*i,255*s,255*n]},i.xyz.lab=function(t){let e=t[0],r=t[1],o=t[2];e/=95.047,r/=100,o/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,r=r>.008856?r**(1/3):7.787*r+16/116,o=o>.008856?o**(1/3):7.787*o+16/116;return[116*r-16,500*(e-r),200*(r-o)]},i.lab.xyz=function(t){let e,r,o;r=(t[0]+16)/116,e=t[1]/500+r,o=r-t[2]/200;const i=r**3,s=e**3,n=o**3;return r=i>.008856?i:(r-16/116)/7.787,e=s>.008856?s:(e-16/116)/7.787,o=n>.008856?n:(o-16/116)/7.787,e*=95.047,r*=100,o*=108.883,[e,r,o]},i.lab.lch=function(t){const e=t[0],r=t[1],o=t[2];let i;i=360*Math.atan2(o,r)/2/Math.PI,i<0&&(i+=360);return[e,Math.sqrt(r*r+o*o),i]},i.lch.lab=function(t){const e=t[0],r=t[1],o=t[2]/360*2*Math.PI;return[e,r*Math.cos(o),r*Math.sin(o)]},i.rgb.ansi16=function(t,e=null){const[r,o,s]=t;let n=null===e?i.rgb.hsv(t)[2]:e;if(n=Math.round(n/50),0===n)return 30;let a=30+(Math.round(s/255)<<2|Math.round(o/255)<<1|Math.round(r/255));return 2===n&&(a+=60),a},i.hsv.ansi16=function(t){return i.rgb.ansi16(i.hsv.rgb(t),t[2])},i.rgb.ansi256=function(t){const e=t[0],r=t[1],o=t[2];if(e===r&&r===o)return e<8?16:e>248?231:Math.round((e-8)/247*24)+232;return 16+36*Math.round(e/255*5)+6*Math.round(r/255*5)+Math.round(o/255*5)},i.ansi16.rgb=function(t){let e=t%10;if(0===e||7===e)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const r=.5*(1+~~(t>50));return[(1&e)*r*255,(e>>1&1)*r*255,(e>>2&1)*r*255]},i.ansi256.rgb=function(t){if(t>=232){const e=10*(t-232)+8;return[e,e,e]}let e;t-=16;return[Math.floor(t/36)/5*255,Math.floor((e=t%36)/6)/5*255,e%6/5*255]},i.rgb.hex=function(t){const e=(((255&Math.round(t[0]))<<16)+((255&Math.round(t[1]))<<8)+(255&Math.round(t[2]))).toString(16).toUpperCase();return"000000".substring(e.length)+e},i.hex.rgb=function(t){const e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let r=e[0];3===e[0].length&&(r=r.split("").map((t=>t+t)).join(""));const o=parseInt(r,16);return[o>>16&255,o>>8&255,255&o]},i.rgb.hcg=function(t){const e=t[0]/255,r=t[1]/255,o=t[2]/255,i=Math.max(Math.max(e,r),o),s=Math.min(Math.min(e,r),o),n=i-s;let a,l;return a=n<1?s/(1-n):0,l=n<=0?0:i===e?(r-o)/n%6:i===r?2+(o-e)/n:4+(e-r)/n,l/=6,l%=1,[360*l,100*n,100*a]},i.hsl.hcg=function(t){const e=t[1]/100,r=t[2]/100,o=r<.5?2*e*r:2*e*(1-r);let i=0;return o<1&&(i=(r-.5*o)/(1-o)),[t[0],100*o,100*i]},i.hsv.hcg=function(t){const e=t[1]/100,r=t[2]/100,o=e*r;let i=0;return o<1&&(i=(r-o)/(1-o)),[t[0],100*o,100*i]},i.hcg.rgb=function(t){const e=t[0]/360,r=t[1]/100,o=t[2]/100;if(0===r)return[255*o,255*o,255*o];const i=[0,0,0],s=e%1*6,n=s%1,a=1-n;let l=0;switch(Math.floor(s)){case 0:i[0]=1,i[1]=n,i[2]=0;break;case 1:i[0]=a,i[1]=1,i[2]=0;break;case 2:i[0]=0,i[1]=1,i[2]=n;break;case 3:i[0]=0,i[1]=a,i[2]=1;break;case 4:i[0]=n,i[1]=0,i[2]=1;break;default:i[0]=1,i[1]=0,i[2]=a}return l=(1-r)*o,[255*(r*i[0]+l),255*(r*i[1]+l),255*(r*i[2]+l)]},i.hcg.hsv=function(t){const e=t[1]/100,r=e+t[2]/100*(1-e);let o=0;return r>0&&(o=e/r),[t[0],100*o,100*r]},i.hcg.hsl=function(t){const e=t[1]/100,r=t[2]/100*(1-e)+.5*e;let o=0;return r>0&&r<.5?o=e/(2*r):r>=.5&&r<1&&(o=e/(2*(1-r))),[t[0],100*o,100*r]},i.hcg.hwb=function(t){const e=t[1]/100,r=e+t[2]/100*(1-e);return[t[0],100*(r-e),100*(1-r)]},i.hwb.hcg=function(t){const e=t[1]/100,r=1-t[2]/100,o=r-e;let i=0;return o<1&&(i=(r-o)/(1-o)),[t[0],100*o,100*i]},i.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},i.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},i.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},i.gray.hsl=function(t){return[0,0,t[0]]},i.gray.hsv=i.gray.hsl,i.gray.hwb=function(t){return[0,100,t[0]]},i.gray.cmyk=function(t){return[0,0,0,t[0]]},i.gray.lab=function(t){return[t[0],0,0]},i.gray.hex=function(t){const e=255&Math.round(t[0]/100*255),r=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(r.length)+r},i.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]}}}),Oe=Lt({"node_modules/color-convert/route.js"(t,e){var r=Te();function o(t){const e=function(){const t={},e=Object.keys(r);for(let r=e.length,o=0;o<r;o++)t[e[o]]={distance:-1,parent:null};return t}(),o=[t];for(e[t].distance=0;o.length;){const t=o.pop(),i=Object.keys(r[t]);for(let r=i.length,s=0;s<r;s++){const r=i[s],n=e[r];-1===n.distance&&(n.distance=e[t].distance+1,n.parent=t,o.unshift(r))}}return e}function i(t,e){return function(r){return e(t(r))}}function s(t,e){const o=[e[t].parent,t];let s=r[e[t].parent][t],n=e[t].parent;for(;e[n].parent;)o.unshift(e[n].parent),s=i(r[e[n].parent][n],s),n=e[n].parent;return s.conversion=o,s}e.exports=function(t){const e=o(t),r={},i=Object.keys(e);for(let t=i.length,o=0;o<t;o++){const t=i[o];null!==e[t].parent&&(r[t]=s(t,e))}return r}}}),ze=Lt({"node_modules/color-convert/index.js"(t,e){var r=Te(),o=Oe(),i={};Object.keys(r).forEach((t=>{i[t]={},Object.defineProperty(i[t],"channels",{value:r[t].channels}),Object.defineProperty(i[t],"labels",{value:r[t].labels});const e=o(t);Object.keys(e).forEach((r=>{const o=e[r];i[t][r]=function(t){const e=function(...e){const r=e[0];if(null==r)return r;r.length>1&&(e=r);const o=t(e);if("object"==typeof o)for(let t=o.length,e=0;e<t;e++)o[e]=Math.round(o[e]);return o};return"conversion"in t&&(e.conversion=t.conversion),e}(o),i[t][r].raw=function(t){const e=function(...e){const r=e[0];return null==r?r:(r.length>1&&(e=r),t(e))};return"conversion"in t&&(e.conversion=t.conversion),e}(o)}))})),e.exports=i}}),Le=Lt({"node_modules/color/index.js"(t,e){var r=Me(),o=ze(),i=[].slice,s=["keyword","gray","hex"],n={};for(const t of Object.keys(o))n[i.call(o[t].labels).sort().join("")]=t;var a={};function l(t,e){if(!(this instanceof l))return new l(t,e);if(e&&e in s&&(e=null),e&&!(e in o))throw new Error("Unknown model: "+e);let c,d;if(null==t)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(t instanceof l)this.model=t.model,this.color=t.color.slice(),this.valpha=t.valpha;else if("string"==typeof t){const e=r.get(t);if(null===e)throw new Error("Unable to parse color from string: "+t);this.model=e.model,d=o[this.model].channels,this.color=e.value.slice(0,d),this.valpha="number"==typeof e.value[d]?e.value[d]:1}else if(t.length>0){this.model=e||"rgb",d=o[this.model].channels;const r=i.call(t,0,d);this.color=u(r,d),this.valpha="number"==typeof t[d]?t[d]:1}else if("number"==typeof t)this.model="rgb",this.color=[t>>16&255,t>>8&255,255&t],this.valpha=1;else{this.valpha=1;const e=Object.keys(t);"alpha"in t&&(e.splice(e.indexOf("alpha"),1),this.valpha="number"==typeof t.alpha?t.alpha:0);const r=e.sort().join("");if(!(r in n))throw new Error("Unable to parse color from object: "+JSON.stringify(t));this.model=n[r];const i=o[this.model].labels,s=[];for(c=0;c<i.length;c++)s.push(t[i[c]]);this.color=u(s)}if(a[this.model])for(d=o[this.model].channels,c=0;c<d;c++){const t=a[this.model][c];t&&(this.color[c]=t(this.color[c]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}l.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(t){let e=this.model in r.to?this:this.rgb();e=e.round("number"==typeof t?t:1);const o=1===e.valpha?e.color:e.color.concat(this.valpha);return r.to[e.model](o)},percentString(t){const e=this.rgb().round("number"==typeof t?t:1),o=1===e.valpha?e.color:e.color.concat(this.valpha);return r.to.rgb.percent(o)},array(){return 1===this.valpha?this.color.slice():this.color.concat(this.valpha)},object(){const t={},e=o[this.model].channels,r=o[this.model].labels;for(let o=0;o<e;o++)t[r[o]]=this.color[o];return 1!==this.valpha&&(t.alpha=this.valpha),t},unitArray(){const t=this.rgb().color;return t[0]/=255,t[1]/=255,t[2]/=255,1!==this.valpha&&t.push(this.valpha),t},unitObject(){const t=this.rgb().object();return t.r/=255,t.g/=255,t.b/=255,1!==this.valpha&&(t.alpha=this.valpha),t},round(t){return t=Math.max(t||0,0),new l(this.color.map(function(t){return function(e){return function(t,e){return Number(t.toFixed(e))}(e,t)}}(t)).concat(this.valpha),this.model)},alpha(t){return arguments.length>0?new l(this.color.concat(Math.max(0,Math.min(1,t))),this.model):this.valpha},red:c("rgb",0,d(255)),green:c("rgb",1,d(255)),blue:c("rgb",2,d(255)),hue:c(["hsl","hsv","hsl","hwb","hcg"],0,(t=>(t%360+360)%360)),saturationl:c("hsl",1,d(100)),lightness:c("hsl",2,d(100)),saturationv:c("hsv",1,d(100)),value:c("hsv",2,d(100)),chroma:c("hcg",1,d(100)),gray:c("hcg",2,d(100)),white:c("hwb",1,d(100)),wblack:c("hwb",2,d(100)),cyan:c("cmyk",0,d(100)),magenta:c("cmyk",1,d(100)),yellow:c("cmyk",2,d(100)),black:c("cmyk",3,d(100)),x:c("xyz",0,d(100)),y:c("xyz",1,d(100)),z:c("xyz",2,d(100)),l:c("lab",0,d(100)),a:c("lab",1),b:c("lab",2),keyword(t){return arguments.length>0?new l(t):o[this.model].keyword(this.color)},hex(t){return arguments.length>0?new l(t):r.to.hex(this.rgb().round().color)},hexa(t){if(arguments.length>0)return new l(t);const e=this.rgb().round().color;let o=Math.round(255*this.valpha).toString(16).toUpperCase();return 1===o.length&&(o="0"+o),r.to.hex(e)+o},rgbNumber(){const t=this.rgb().color;return(255&t[0])<<16|(255&t[1])<<8|255&t[2]},luminosity(){const t=this.rgb().color,e=[];for(const[r,o]of t.entries()){const t=o/255;e[r]=t<=.03928?t/12.92:((t+.055)/1.055)**2.4}return.2126*e[0]+.7152*e[1]+.0722*e[2]},contrast(t){const e=this.luminosity(),r=t.luminosity();return e>r?(e+.05)/(r+.05):(r+.05)/(e+.05)},level(t){const e=this.contrast(t);return e>=7.1?"AAA":e>=4.5?"AA":""},isDark(){const t=this.rgb().color;return(299*t[0]+587*t[1]+114*t[2])/1e3<128},isLight(){return!this.isDark()},negate(){const t=this.rgb();for(let e=0;e<3;e++)t.color[e]=255-t.color[e];return t},lighten(t){const e=this.hsl();return e.color[2]+=e.color[2]*t,e},darken(t){const e=this.hsl();return e.color[2]-=e.color[2]*t,e},saturate(t){const e=this.hsl();return e.color[1]+=e.color[1]*t,e},desaturate(t){const e=this.hsl();return e.color[1]-=e.color[1]*t,e},whiten(t){const e=this.hwb();return e.color[1]+=e.color[1]*t,e},blacken(t){const e=this.hwb();return e.color[2]+=e.color[2]*t,e},grayscale(){const t=this.rgb().color,e=.3*t[0]+.59*t[1]+.11*t[2];return l.rgb(e,e,e)},fade(t){return this.alpha(this.valpha-this.valpha*t)},opaquer(t){return this.alpha(this.valpha+this.valpha*t)},rotate(t){const e=this.hsl();let r=e.color[0];return r=(r+t)%360,r=r<0?360+r:r,e.color[0]=r,e},mix(t,e){if(!t||!t.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof t);const r=t.rgb(),o=this.rgb(),i=void 0===e?.5:e,s=2*i-1,n=r.alpha()-o.alpha(),a=((s*n==-1?s:(s+n)/(1+s*n))+1)/2,c=1-a;return l.rgb(a*r.red()+c*o.red(),a*r.green()+c*o.green(),a*r.blue()+c*o.blue(),r.alpha()*i+o.alpha()*(1-i))}};for(const t of Object.keys(o)){if(s.includes(t))continue;const e=o[t].channels;l.prototype[t]=function(){if(this.model===t)return new l(this);if(arguments.length>0)return new l(arguments,t);const r="number"==typeof arguments[e]?e:this.valpha;return new l(h(o[this.model][t].raw(this.color)).concat(r),t)},l[t]=function(r){return"number"==typeof r&&(r=u(i.call(arguments),e)),new l(r,t)}}function c(t,e,r){t=Array.isArray(t)?t:[t];for(const o of t)(a[o]||(a[o]=[]))[e]=r;return t=t[0],function(o){let i;return arguments.length>0?(r&&(o=r(o)),i=this[t](),i.color[e]=o,i):(i=this[t]().color[e],r&&(i=r(i)),i)}}function d(t){return function(e){return Math.max(0,Math.min(t,e))}}function h(t){return Array.isArray(t)?t:[t]}function u(t,e){for(let r=0;r<e;r++)"number"!=typeof t[r]&&(t[r]=0);return t}e.exports=l}}),Pe=(xe=Le(),ke=1,((t,e,r,o)=>{if(e&&"object"==typeof e||"function"==typeof e)for(let i of Ct(e))St.call(t,i)||!r&&"default"===i||_t(t,i,{get:()=>e[i],enumerable:!(o=xt(e,i))||o.enumerable});return t})((Ce=_t(null!=xe?wt(Et(xe)):{},"default",!ke&&xe&&xe.__esModule?{get:()=>xe.default,enumerable:!0}:{value:xe,enumerable:!0}),_t(Ce,"__esModule",{value:!0})),xe)),De="EyeDropper"in window,Ue=class extends ot{constructor(){super(...arguments),this.formSubmitController=new Rt(this),this.isSafeValue=!1,this.localize=new ye(this),this.inputValue="",this.hue=0,this.saturation=100,this.lightness=100,this.alpha=100,this.value="#ffffff",this.format="hex",this.inline=!1,this.size="medium",this.noFormatToggle=!1,this.name="",this.disabled=!1,this.invalid=!1,this.hoist=!1,this.opacity=!1,this.uppercase=!1,this.swatches=["#d0021b","#f5a623","#f8e71c","#8b572a","#7ed321","#417505","#bd10e0","#9013fe","#4a90e2","#50e3c2","#b8e986","#000","#444","#888","#ccc","#fff"]}firstUpdated(){this.setColor(this.value)||this.setColor("#ffff"),this.inputValue=this.value,this.lastValueEmitted=this.value,this.syncValues()}getFormattedValue(t="hex"){const e=this.parseColor(`hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`);if(null===e)return"";switch(t){case"hex":return e.hex;case"hexa":return e.hexa;case"rgb":return e.rgb.string;case"rgba":return e.rgba.string;case"hsl":return e.hsl.string;case"hsla":return e.hsla.string;default:return""}}reportValidity(){return!this.inline&&this.input.invalid?new Promise((t=>{this.dropdown.addEventListener("sl-after-show",(()=>{this.input.reportValidity(),t()}),{once:!0}),this.dropdown.show()})):this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=this.input.invalid}handleCopy(){this.input.select(),document.execCommand("copy"),this.previewButton.focus(),this.previewButton.classList.add("color-picker__preview-color--copied"),this.previewButton.addEventListener("animationend",(()=>{this.previewButton.classList.remove("color-picker__preview-color--copied")}))}handleFormatToggle(){const t=["hex","rgb","hsl"],e=(t.indexOf(this.format)+1)%t.length;this.format=t[e]}handleAlphaDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__alpha"),r=e.querySelector(".color-picker__slider-handle"),{width:o}=e.getBoundingClientRect();r.focus(),t.preventDefault(),ce(e,(t=>{this.alpha=de(t/o*100,0,100),this.syncValues()}))}handleHueDrag(t){const e=this.shadowRoot.querySelector(".color-picker__slider.color-picker__hue"),r=e.querySelector(".color-picker__slider-handle"),{width:o}=e.getBoundingClientRect();r.focus(),t.preventDefault(),ce(e,(t=>{this.hue=de(t/o*360,0,360),this.syncValues()}))}handleGridDrag(t){const e=this.shadowRoot.querySelector(".color-picker__grid"),r=e.querySelector(".color-picker__grid-handle"),{width:o,height:i}=e.getBoundingClientRect();r.focus(),t.preventDefault(),ce(e,((t,e)=>{this.saturation=de(t/o*100,0,100),this.lightness=de(100-e/i*100,0,100),this.syncValues()}))}handleAlphaKeyDown(t){const e=t.shiftKey?10:1;"ArrowLeft"===t.key&&(t.preventDefault(),this.alpha=de(this.alpha-e,0,100),this.syncValues()),"ArrowRight"===t.key&&(t.preventDefault(),this.alpha=de(this.alpha+e,0,100),this.syncValues()),"Home"===t.key&&(t.preventDefault(),this.alpha=0,this.syncValues()),"End"===t.key&&(t.preventDefault(),this.alpha=100,this.syncValues())}handleHueKeyDown(t){const e=t.shiftKey?10:1;"ArrowLeft"===t.key&&(t.preventDefault(),this.hue=de(this.hue-e,0,360),this.syncValues()),"ArrowRight"===t.key&&(t.preventDefault(),this.hue=de(this.hue+e,0,360),this.syncValues()),"Home"===t.key&&(t.preventDefault(),this.hue=0,this.syncValues()),"End"===t.key&&(t.preventDefault(),this.hue=360,this.syncValues())}handleGridKeyDown(t){const e=t.shiftKey?10:1;"ArrowLeft"===t.key&&(t.preventDefault(),this.saturation=de(this.saturation-e,0,100),this.syncValues()),"ArrowRight"===t.key&&(t.preventDefault(),this.saturation=de(this.saturation+e,0,100),this.syncValues()),"ArrowUp"===t.key&&(t.preventDefault(),this.lightness=de(this.lightness+e,0,100),this.syncValues()),"ArrowDown"===t.key&&(t.preventDefault(),this.lightness=de(this.lightness-e,0,100),this.syncValues())}handleInputChange(t){const e=t.target;this.setColor(e.value),e.value=this.value,t.stopPropagation()}handleInputKeyDown(t){"Enter"===t.key&&(this.setColor(this.input.value),this.input.value=this.value,setTimeout((()=>this.input.select())))}normalizeColorString(t){if(/rgba?/i.test(t)){const e=t.replace(/[^\d.%]/g," ").split(" ").map((t=>t.trim())).filter((t=>t.length));return e.length<4&&(e[3]="1"),e[3].indexOf("%")>-1&&(e[3]=(parseFloat(e[3].replace(/%/g,""))/100).toString()),`rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}if(/hsla?/i.test(t)){const e=t.replace(/[^\d.%]/g," ").split(" ").map((t=>t.trim())).filter((t=>t.length));return e.length<4&&(e[3]="1"),e[3].indexOf("%")>-1&&(e[3]=(parseFloat(e[3].replace(/%/g,""))/100).toString()),`hsla(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`}return/^[0-9a-f]+$/i.test(t)?`#${t}`:t}parseColor(t){let e;t=this.normalizeColorString(t);try{e=(0,Pe.default)(t)}catch(t){return null}const r=e.hsl(),o={h:r.hue(),s:r.saturationl(),l:r.lightness(),a:r.alpha()},i=e.rgb(),s={r:i.red(),g:i.green(),b:i.blue(),a:i.alpha()},n=Be(s.r),a=Be(s.g),l=Be(s.b),c=Be(255*s.a);return{hsl:{h:o.h,s:o.s,l:o.l,string:this.setLetterCase(`hsl(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%)`)},hsla:{h:o.h,s:o.s,l:o.l,a:o.a,string:this.setLetterCase(`hsla(${Math.round(o.h)}, ${Math.round(o.s)}%, ${Math.round(o.l)}%, ${o.a.toFixed(2).toString()})`)},rgb:{r:s.r,g:s.g,b:s.b,string:this.setLetterCase(`rgb(${Math.round(s.r)}, ${Math.round(s.g)}, ${Math.round(s.b)})`)},rgba:{r:s.r,g:s.g,b:s.b,a:s.a,string:this.setLetterCase(`rgba(${Math.round(s.r)}, ${Math.round(s.g)}, ${Math.round(s.b)}, ${s.a.toFixed(2).toString()})`)},hex:this.setLetterCase(`#${n}${a}${l}`),hexa:this.setLetterCase(`#${n}${a}${l}${c}`)}}setColor(t){const e=this.parseColor(t);return null!==e&&(this.hue=e.hsla.h,this.saturation=e.hsla.s,this.lightness=e.hsla.l,this.alpha=this.opacity?100*e.hsla.a:100,this.syncValues(),!0)}setLetterCase(t){return"string"!=typeof t?"":this.uppercase?t.toUpperCase():t.toLowerCase()}async syncValues(){const t=this.parseColor(`hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`);null!==t&&("hsl"===this.format?this.inputValue=this.opacity?t.hsla.string:t.hsl.string:"rgb"===this.format?this.inputValue=this.opacity?t.rgba.string:t.rgb.string:this.inputValue=this.opacity?t.hexa:t.hex,this.isSafeValue=!0,this.value=this.inputValue,await this.updateComplete,this.isSafeValue=!1)}handleAfterHide(){this.previewButton.classList.remove("color-picker__preview-color--copied")}handleEyeDropper(){if(!De)return;(new EyeDropper).open().then((t=>this.setColor(t.sRGBHex))).catch((()=>{}))}handleFormatChange(){this.syncValues()}handleOpacityChange(){this.alpha=100}handleValueChange(t,e){if(!this.isSafeValue&&void 0!==t){const r=this.parseColor(e);null!==r?(this.inputValue=this.value,this.hue=r.hsla.h,this.saturation=r.hsla.s,this.lightness=r.hsla.l,this.alpha=100*r.hsla.a):this.inputValue=t}this.value!==this.lastValueEmitted&&(qt(this,"sl-change"),this.lastValueEmitted=this.value)}render(){const t=this.saturation,e=100-this.lightness,r=C`
      <div
        part="base"
        class=${vt({"color-picker":!0,"color-picker--inline":this.inline,"color-picker--disabled":this.disabled})}
        aria-disabled=${this.disabled?"true":"false"}
      >
        <div
          part="grid"
          class="color-picker__grid"
          style=${ue({backgroundColor:`hsl(${this.hue}deg, 100%, 50%)`})}
          @mousedown=${this.handleGridDrag}
          @touchstart=${this.handleGridDrag}
        >
          <span
            part="grid-handle"
            class="color-picker__grid-handle"
            style=${ue({top:`${e}%`,left:`${t}%`,backgroundColor:`hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`})}
            role="application"
            aria-label="HSL"
            tabindex=${yt(this.disabled?void 0:"0")}
            @keydown=${this.handleGridKeyDown}
          ></span>
        </div>

        <div class="color-picker__controls">
          <div class="color-picker__sliders">
            <div
              part="slider hue-slider"
              class="color-picker__hue color-picker__slider"
              @mousedown=${this.handleHueDrag}
              @touchstart=${this.handleHueDrag}
            >
              <span
                part="slider-handle"
                class="color-picker__slider-handle"
                style=${ue({left:(0===this.hue?0:100/(360/this.hue))+"%"})}
                role="slider"
                aria-label="hue"
                aria-orientation="horizontal"
                aria-valuemin="0"
                aria-valuemax="360"
                aria-valuenow=${Math.round(this.hue)}
                tabindex=${yt(this.disabled?void 0:"0")}
                @keydown=${this.handleHueKeyDown}
              ></span>
            </div>

            ${this.opacity?C`
                  <div
                    part="slider opacity-slider"
                    class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                    @mousedown="${this.handleAlphaDrag}"
                    @touchstart="${this.handleAlphaDrag}"
                  >
                    <div
                      class="color-picker__alpha-gradient"
                      style=${ue({backgroundImage:`linear-gradient(\n                          to right,\n                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,\n                          hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%\n                        )`})}
                    ></div>
                    <span
                      part="slider-handle"
                      class="color-picker__slider-handle"
                      style=${ue({left:`${this.alpha}%`})}
                      role="slider"
                      aria-label="alpha"
                      aria-orientation="horizontal"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      aria-valuenow=${Math.round(this.alpha)}
                      tabindex=${yt(this.disabled?void 0:"0")}
                      @keydown=${this.handleAlphaKeyDown}
                    ></span>
                  </div>
                `:""}
          </div>

          <button
            type="button"
            part="preview"
            class="color-picker__preview color-picker__transparent-bg"
            aria-label=${this.localize.term("copy")}
            style=${ue({"--preview-color":`hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`})}
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
            .value=${_e(this.inputValue)}
            ?disabled=${this.disabled}
            @keydown=${this.handleInputKeyDown}
            @sl-change=${this.handleInputChange}
          ></sl-input>

          <sl-button-group>
            ${this.noFormatToggle?"":C`
                  <sl-button
                    aria-label=${this.localize.term("toggleColorFormat")}
                    exportparts="base:format-button"
                    @click=${this.handleFormatToggle}
                  >
                    ${this.setLetterCase(this.format)}
                  </sl-button>
                `}
            ${De?C`
                  <sl-button exportparts="base:eye-dropper-button" @click=${this.handleEyeDropper}>
                    <sl-icon
                      library="system"
                      name="eyedropper"
                      label=${this.localize.term("selectAColorFromTheScreen")}
                    ></sl-icon>
                  </sl-button>
                `:""}
          </sl-button-group>
        </div>

        ${this.swatches.length>0?C`
              <div part="swatches" class="color-picker__swatches">
                ${this.swatches.map((t=>C`
                    <div
                      part="swatch"
                      class="color-picker__swatch color-picker__transparent-bg"
                      tabindex=${yt(this.disabled?void 0:"0")}
                      role="button"
                      aria-label=${t}
                      @click=${()=>!this.disabled&&this.setColor(t)}
                      @keydown=${e=>!this.disabled&&"Enter"===e.key&&this.setColor(t)}
                    >
                      <div class="color-picker__swatch-color" style=${ue({backgroundColor:t})}></div>
                    </div>
                  `))}
              </div>
            `:""}
      </div>
    `;return this.inline?r:C`
      <sl-dropdown
        class="color-dropdown"
        aria-disabled=${this.disabled?"true":"false"}
        .containing-element=${this}
        ?disabled=${this.disabled}
        ?hoist=${this.hoist}
        @sl-after-hide=${this.handleAfterHide}
      >
        <button
          part="trigger"
          slot="trigger"
          class=${vt({"color-dropdown__trigger":!0,"color-dropdown__trigger--disabled":this.disabled,"color-dropdown__trigger--small":"small"===this.size,"color-dropdown__trigger--medium":"medium"===this.size,"color-dropdown__trigger--large":"large"===this.size,"color-picker__transparent-bg":!0})}
          style=${ue({color:`hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha/100})`})}
          type="button"
        ></button>
        ${r}
      </sl-dropdown>
    `}};function Be(t){const e=Math.round(t).toString(16);return 1===e.length?`0${e}`:e}Ue.styles=pe,Pt([Jt('[part="input"]')],Ue.prototype,"input",2),Pt([Jt('[part="preview"]')],Ue.prototype,"previewButton",2),Pt([Jt(".color-dropdown")],Ue.prototype,"dropdown",2),Pt([Xt()],Ue.prototype,"inputValue",2),Pt([Xt()],Ue.prototype,"hue",2),Pt([Xt()],Ue.prototype,"saturation",2),Pt([Xt()],Ue.prototype,"lightness",2),Pt([Xt()],Ue.prototype,"alpha",2),Pt([Yt()],Ue.prototype,"value",2),Pt([Yt()],Ue.prototype,"format",2),Pt([Yt({type:Boolean,reflect:!0})],Ue.prototype,"inline",2),Pt([Yt()],Ue.prototype,"size",2),Pt([Yt({attribute:"no-format-toggle",type:Boolean})],Ue.prototype,"noFormatToggle",2),Pt([Yt()],Ue.prototype,"name",2),Pt([Yt({type:Boolean,reflect:!0})],Ue.prototype,"disabled",2),Pt([Yt({type:Boolean,reflect:!0})],Ue.prototype,"invalid",2),Pt([Yt({type:Boolean})],Ue.prototype,"hoist",2),Pt([Yt({type:Boolean})],Ue.prototype,"opacity",2),Pt([Yt({type:Boolean})],Ue.prototype,"uppercase",2),Pt([Yt({attribute:!1})],Ue.prototype,"swatches",2),Pt([Yt()],Ue.prototype,"lang",2),Pt([$e("format")],Ue.prototype,"handleFormatChange",1),Pt([$e("opacity")],Ue.prototype,"handleOpacityChange",1),Pt([$e("value")],Ue.prototype,"handleValueChange",1),Ue=Pt([Wt("sl-color-picker")],Ue);var Re=K`
  ${Ft}
  ${K`
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

  /* Help text */
  .form-control--has-help-text .form-control__help-text {
    display: block;
    color: var(--sl-input-help-text-color);
  }

  .form-control--has-help-text .form-control__help-text ::slotted(*) {
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
`}

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
    box-shadow: var(--sl-focus-ring);
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
    box-shadow: var(--sl-focus-ring);
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

  .input__prefix ::slotted(sl-icon),
  .input__suffix ::slotted(sl-icon) {
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

  .input--small .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-small);
  }

  .input--small .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-small);
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

  .input--medium .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-medium);
  }

  .input--medium .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-medium);
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

  .input--large .input__prefix ::slotted(*) {
    padding-left: var(--sl-input-spacing-large);
  }

  .input--large .input__suffix ::slotted(*) {
    padding-right: var(--sl-input-spacing-large);
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
`,Ie=0;function Ne(){return++Ie}var je=class extends ot{constructor(){super(...arguments),this.formSubmitController=new Rt(this),this.hasSlotController=new It(this,"help-text","label"),this.attrId=Ne(),this.inputId=`input-${this.attrId}`,this.helpTextId=`input-help-text-${this.attrId}`,this.labelId=`input-label-${this.attrId}`,this.hasFocus=!1,this.isPasswordVisible=!1,this.type="text",this.size="medium",this.value="",this.filled=!1,this.pill=!1,this.label="",this.helpText="",this.clearable=!1,this.togglePassword=!1,this.disabled=!1,this.readonly=!1,this.required=!1,this.invalid=!1}get valueAsDate(){return this.input.valueAsDate}set valueAsDate(t){this.input.valueAsDate=t,this.value=this.input.value}get valueAsNumber(){return this.input.valueAsNumber}set valueAsNumber(t){this.input.valueAsNumber=t,this.value=this.input.value}firstUpdated(){this.invalid=!this.input.checkValidity()}focus(t){this.input.focus(t)}blur(){this.input.blur()}select(){this.input.select()}setSelectionRange(t,e,r="none"){this.input.setSelectionRange(t,e,r)}setRangeText(t,e,r,o="preserve"){this.input.setRangeText(t,e,r,o),this.value!==this.input.value&&(this.value=this.input.value,qt(this,"sl-input"),qt(this,"sl-change"))}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,qt(this,"sl-blur")}handleChange(){this.value=this.input.value,qt(this,"sl-change")}handleClearClick(t){this.value="",qt(this,"sl-clear"),qt(this,"sl-input"),qt(this,"sl-change"),this.input.focus(),t.stopPropagation()}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,qt(this,"sl-focus")}handleInput(){this.value=this.input.value,qt(this,"sl-input")}handleInvalid(){this.invalid=!0}handlePasswordToggle(){this.isPasswordVisible=!this.isPasswordVisible}handleValueChange(){this.invalid=!this.input.checkValidity()}render(){const t=this.hasSlotController.test("label"),e=this.hasSlotController.test("help-text");return function(t,e){const r=!!t.label||!!t.hasLabelSlot,o=!!t.helpText||!!t.hasHelpTextSlot;return C`
    <div
      part="form-control"
      class=${vt({"form-control":!0,"form-control--small":"small"===t.size,"form-control--medium":"medium"===t.size,"form-control--large":"large"===t.size,"form-control--has-label":r,"form-control--has-help-text":o})}
    >
      <label
        part="label"
        id=${yt(t.labelId)}
        class="form-control__label"
        for=${t.inputId}
        aria-hidden=${r?"false":"true"}
        @click=${e=>{var r;return null==(r=t.onLabelClick)?void 0:r.call(t,e)}}
      >
        <slot name="label">${t.label}</slot>
      </label>

      <div class="form-control__input">${C`${e}`}</div>

      <div
        part="help-text"
        id=${yt(t.helpTextId)}
        class="form-control__help-text"
        aria-hidden=${o?"false":"true"}
      >
        <slot name="help-text">${t.helpText}</slot>
      </div>
    </div>
  `}({inputId:this.inputId,label:this.label,labelId:this.labelId,hasLabelSlot:t,helpTextId:this.helpTextId,helpText:this.helpText,hasHelpTextSlot:e,size:this.size},C`
        <div
          part="base"
          class=${vt({input:!0,"input--small":"small"===this.size,"input--medium":"medium"===this.size,"input--large":"large"===this.size,"input--pill":this.pill,"input--standard":!this.filled,"input--filled":this.filled,"input--disabled":this.disabled,"input--focused":this.hasFocus,"input--empty":0===this.value.length,"input--invalid":this.invalid})}
        >
          <span part="prefix" class="input__prefix">
            <slot name="prefix"></slot>
          </span>

          <input
            part="input"
            id=${this.inputId}
            class="input__control"
            type=${"password"===this.type&&this.isPasswordVisible?"text":this.type}
            name=${yt(this.name)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            placeholder=${yt(this.placeholder)}
            minlength=${yt(this.minlength)}
            maxlength=${yt(this.maxlength)}
            min=${yt(this.min)}
            max=${yt(this.max)}
            step=${yt(this.step)}
            .value=${_e(this.value)}
            autocapitalize=${yt(this.autocapitalize)}
            autocomplete=${yt(this.autocomplete)}
            autocorrect=${yt(this.autocorrect)}
            ?autofocus=${this.autofocus}
            spellcheck=${yt(this.spellcheck)}
            pattern=${yt(this.pattern)}
            inputmode=${yt(this.inputmode)}
            aria-labelledby=${yt((r={label:this.label,labelId:this.labelId,hasLabelSlot:t,helpText:this.helpText,helpTextId:this.helpTextId,hasHelpTextSlot:e},[r.label.length>0?r.label:r.hasLabelSlot?r.labelId:"",r.helpText.length>0?r.helpText:r.hasHelpTextSlot?r.helpTextId:""].filter((t=>""!==t)).join(" ")))}
            aria-invalid=${this.invalid?"true":"false"}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @invalid=${this.handleInvalid}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          />

          ${this.clearable&&this.value.length>0?C`
                <button
                  part="clear-button"
                  class="input__clear"
                  type="button"
                  @click=${this.handleClearClick}
                  tabindex="-1"
                >
                  <slot name="clear-icon">
                    <sl-icon name="x-circle-fill" library="system"></sl-icon>
                  </slot>
                </button>
              `:""}
          ${this.togglePassword?C`
                <button
                  part="password-toggle-button"
                  class="input__password-toggle"
                  type="button"
                  @click=${this.handlePasswordToggle}
                  tabindex="-1"
                >
                  ${this.isPasswordVisible?C`
                        <slot name="show-password-icon">
                          <sl-icon name="eye-slash" library="system"></sl-icon>
                        </slot>
                      `:C`
                        <slot name="hide-password-icon">
                          <sl-icon name="eye" library="system"></sl-icon>
                        </slot>
                      `}
                </button>
              `:""}

          <span part="suffix" class="input__suffix">
            <slot name="suffix"></slot>
          </span>
        </div>
      `);var r}};function He(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function Fe(t){return t instanceof He(t).Element||t instanceof Element}function Ve(t){return t instanceof He(t).HTMLElement||t instanceof HTMLElement}function qe(t){return"undefined"!=typeof ShadowRoot&&(t instanceof He(t).ShadowRoot||t instanceof ShadowRoot)}je.styles=Re,Pt([Jt(".input__control")],je.prototype,"input",2),Pt([Xt()],je.prototype,"hasFocus",2),Pt([Xt()],je.prototype,"isPasswordVisible",2),Pt([Yt({reflect:!0})],je.prototype,"type",2),Pt([Yt({reflect:!0})],je.prototype,"size",2),Pt([Yt()],je.prototype,"name",2),Pt([Yt()],je.prototype,"value",2),Pt([Yt({type:Boolean,reflect:!0})],je.prototype,"filled",2),Pt([Yt({type:Boolean,reflect:!0})],je.prototype,"pill",2),Pt([Yt()],je.prototype,"label",2),Pt([Yt({attribute:"help-text"})],je.prototype,"helpText",2),Pt([Yt({type:Boolean})],je.prototype,"clearable",2),Pt([Yt({attribute:"toggle-password",type:Boolean})],je.prototype,"togglePassword",2),Pt([Yt()],je.prototype,"placeholder",2),Pt([Yt({type:Boolean,reflect:!0})],je.prototype,"disabled",2),Pt([Yt({type:Boolean,reflect:!0})],je.prototype,"readonly",2),Pt([Yt({type:Number})],je.prototype,"minlength",2),Pt([Yt({type:Number})],je.prototype,"maxlength",2),Pt([Yt()],je.prototype,"min",2),Pt([Yt()],je.prototype,"max",2),Pt([Yt({type:Number})],je.prototype,"step",2),Pt([Yt()],je.prototype,"pattern",2),Pt([Yt({type:Boolean,reflect:!0})],je.prototype,"required",2),Pt([Yt({type:Boolean,reflect:!0})],je.prototype,"invalid",2),Pt([Yt()],je.prototype,"autocapitalize",2),Pt([Yt()],je.prototype,"autocorrect",2),Pt([Yt()],je.prototype,"autocomplete",2),Pt([Yt({type:Boolean})],je.prototype,"autofocus",2),Pt([Yt({type:Boolean})],je.prototype,"spellcheck",2),Pt([Yt()],je.prototype,"inputmode",2),Pt([$e("disabled",{waitUntilFirstUpdate:!0})],je.prototype,"handleDisabledChange",1),Pt([$e("value",{waitUntilFirstUpdate:!0})],je.prototype,"handleValueChange",1),je=Pt([Wt("sl-input")],je);var Ge=Math.max,We=Math.min,Ke=Math.round;function Ye(t,e){void 0===e&&(e=!1);var r=t.getBoundingClientRect(),o=1,i=1;if(Ve(t)&&e){var s=t.offsetHeight,n=t.offsetWidth;n>0&&(o=Ke(r.width)/n||1),s>0&&(i=Ke(r.height)/s||1)}return{width:r.width/o,height:r.height/i,top:r.top/i,right:r.right/o,bottom:r.bottom/i,left:r.left/o,x:r.left/o,y:r.top/i}}function Xe(t){var e=He(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function Je(t){return t?(t.nodeName||"").toLowerCase():null}function Ze(t){return((Fe(t)?t.ownerDocument:t.document)||window.document).documentElement}function Qe(t){return Ye(Ze(t)).left+Xe(t).scrollLeft}function tr(t){return He(t).getComputedStyle(t)}function er(t){var e=tr(t),r=e.overflow,o=e.overflowX,i=e.overflowY;return/auto|scroll|overlay|hidden/.test(r+i+o)}function rr(t,e,r){void 0===r&&(r=!1);var o,i,s=Ve(e),n=Ve(e)&&function(t){var e=t.getBoundingClientRect(),r=Ke(e.width)/t.offsetWidth||1,o=Ke(e.height)/t.offsetHeight||1;return 1!==r||1!==o}(e),a=Ze(e),l=Ye(t,n),c={scrollLeft:0,scrollTop:0},d={x:0,y:0};return(s||!s&&!r)&&(("body"!==Je(e)||er(a))&&(c=(o=e)!==He(o)&&Ve(o)?{scrollLeft:(i=o).scrollLeft,scrollTop:i.scrollTop}:Xe(o)),Ve(e)?((d=Ye(e,!0)).x+=e.clientLeft,d.y+=e.clientTop):a&&(d.x=Qe(a))),{x:l.left+c.scrollLeft-d.x,y:l.top+c.scrollTop-d.y,width:l.width,height:l.height}}function or(t){var e=Ye(t),r=t.offsetWidth,o=t.offsetHeight;return Math.abs(e.width-r)<=1&&(r=e.width),Math.abs(e.height-o)<=1&&(o=e.height),{x:t.offsetLeft,y:t.offsetTop,width:r,height:o}}function ir(t){return"html"===Je(t)?t:t.assignedSlot||t.parentNode||(qe(t)?t.host:null)||Ze(t)}function sr(t){return["html","body","#document"].indexOf(Je(t))>=0?t.ownerDocument.body:Ve(t)&&er(t)?t:sr(ir(t))}function nr(t,e){var r;void 0===e&&(e=[]);var o=sr(t),i=o===(null==(r=t.ownerDocument)?void 0:r.body),s=He(o),n=i?[s].concat(s.visualViewport||[],er(o)?o:[]):o,a=e.concat(n);return i?a:a.concat(nr(ir(n)))}function ar(t){return["table","td","th"].indexOf(Je(t))>=0}function lr(t){return Ve(t)&&"fixed"!==tr(t).position?t.offsetParent:null}function cr(t){for(var e=He(t),r=lr(t);r&&ar(r)&&"static"===tr(r).position;)r=lr(r);return r&&("html"===Je(r)||"body"===Je(r)&&"static"===tr(r).position)?e:r||function(t){var e=-1!==navigator.userAgent.toLowerCase().indexOf("firefox");if(-1!==navigator.userAgent.indexOf("Trident")&&Ve(t)&&"fixed"===tr(t).position)return null;for(var r=ir(t);Ve(r)&&["html","body"].indexOf(Je(r))<0;){var o=tr(r);if("none"!==o.transform||"none"!==o.perspective||"paint"===o.contain||-1!==["transform","perspective"].indexOf(o.willChange)||e&&"filter"===o.willChange||e&&o.filter&&"none"!==o.filter)return r;r=r.parentNode}return null}(t)||e}var dr="top",hr="bottom",ur="right",pr="left",gr=[dr,hr,ur,pr],br=gr.reduce((function(t,e){return t.concat([e+"-start",e+"-end"])}),[]),fr=[].concat(gr,["auto"]).reduce((function(t,e){return t.concat([e,e+"-start",e+"-end"])}),[]),mr=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function vr(t){var e=new Map,r=new Set,o=[];function i(t){r.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!r.has(t)){var o=e.get(t);o&&i(o)}})),o.push(t)}return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){r.has(t.name)||i(t)})),o}function yr(t){return t.split("-")[0]}function wr(t,e){var r=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(r&&qe(r)){var o=e;do{if(o&&t.isSameNode(o))return!0;o=o.parentNode||o.host}while(o)}return!1}function _r(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function $r(t,e){return"viewport"===e?_r(function(t){var e=He(t),r=Ze(t),o=e.visualViewport,i=r.clientWidth,s=r.clientHeight,n=0,a=0;return o&&(i=o.width,s=o.height,/^((?!chrome|android).)*safari/i.test(navigator.userAgent)||(n=o.offsetLeft,a=o.offsetTop)),{width:i,height:s,x:n+Qe(t),y:a}}(t)):Fe(e)?function(t){var e=Ye(t);return e.top=e.top+t.clientTop,e.left=e.left+t.clientLeft,e.bottom=e.top+t.clientHeight,e.right=e.left+t.clientWidth,e.width=t.clientWidth,e.height=t.clientHeight,e.x=e.left,e.y=e.top,e}(e):_r(function(t){var e,r=Ze(t),o=Xe(t),i=null==(e=t.ownerDocument)?void 0:e.body,s=Ge(r.scrollWidth,r.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),n=Ge(r.scrollHeight,r.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),a=-o.scrollLeft+Qe(t),l=-o.scrollTop;return"rtl"===tr(i||r).direction&&(a+=Ge(r.clientWidth,i?i.clientWidth:0)-s),{width:s,height:n,x:a,y:l}}(Ze(t)))}function xr(t,e,r){var o="clippingParents"===e?function(t){var e=nr(ir(t)),r=["absolute","fixed"].indexOf(tr(t).position)>=0&&Ve(t)?cr(t):t;return Fe(r)?e.filter((function(t){return Fe(t)&&wr(t,r)&&"body"!==Je(t)})):[]}(t):[].concat(e),i=[].concat(o,[r]),s=i[0],n=i.reduce((function(e,r){var o=$r(t,r);return e.top=Ge(o.top,e.top),e.right=We(o.right,e.right),e.bottom=We(o.bottom,e.bottom),e.left=Ge(o.left,e.left),e}),$r(t,s));return n.width=n.right-n.left,n.height=n.bottom-n.top,n.x=n.left,n.y=n.top,n}function kr(t){return t.split("-")[1]}function Cr(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function Ar(t){var e,r=t.reference,o=t.element,i=t.placement,s=i?yr(i):null,n=i?kr(i):null,a=r.x+r.width/2-o.width/2,l=r.y+r.height/2-o.height/2;switch(s){case dr:e={x:a,y:r.y-o.height};break;case hr:e={x:a,y:r.y+r.height};break;case ur:e={x:r.x+r.width,y:l};break;case pr:e={x:r.x-o.width,y:l};break;default:e={x:r.x,y:r.y}}var c=s?Cr(s):null;if(null!=c){var d="y"===c?"height":"width";switch(n){case"start":e[c]=e[c]-(r[d]/2-o[d]/2);break;case"end":e[c]=e[c]+(r[d]/2-o[d]/2)}}return e}function Er(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function Sr(t,e){return e.reduce((function(e,r){return e[r]=t,e}),{})}function Mr(t,e){void 0===e&&(e={});var r=e,o=r.placement,i=void 0===o?t.placement:o,s=r.boundary,n=void 0===s?"clippingParents":s,a=r.rootBoundary,l=void 0===a?"viewport":a,c=r.elementContext,d=void 0===c?"popper":c,h=r.altBoundary,u=void 0!==h&&h,p=r.padding,g=void 0===p?0:p,b=Er("number"!=typeof g?g:Sr(g,gr)),f="popper"===d?"reference":"popper",m=t.rects.popper,v=t.elements[u?f:d],y=xr(Fe(v)?v:v.contextElement||Ze(t.elements.popper),n,l),w=Ye(t.elements.reference),_=Ar({reference:w,element:m,strategy:"absolute",placement:i}),$=_r(Object.assign({},m,_)),x="popper"===d?$:w,k={top:y.top-x.top+b.top,bottom:x.bottom-y.bottom+b.bottom,left:y.left-x.left+b.left,right:x.right-y.right+b.right},C=t.modifiersData.offset;if("popper"===d&&C){var A=C[i];Object.keys(k).forEach((function(t){var e=[ur,hr].indexOf(t)>=0?1:-1,r=[dr,hr].indexOf(t)>=0?"y":"x";k[t]+=A[r]*e}))}return k}var Tr={placement:"bottom",modifiers:[],strategy:"absolute"};function Or(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function zr(t){void 0===t&&(t={});var e=t,r=e.defaultModifiers,o=void 0===r?[]:r,i=e.defaultOptions,s=void 0===i?Tr:i;return function(t,e,r){void 0===r&&(r=s);var i,n,a={placement:"bottom",orderedModifiers:[],options:Object.assign({},Tr,s),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},l=[],c=!1,d={state:a,setOptions:function(r){var i="function"==typeof r?r(a.options):r;h(),a.options=Object.assign({},s,a.options,i),a.scrollParents={reference:Fe(t)?nr(t):t.contextElement?nr(t.contextElement):[],popper:nr(e)};var n,c,u=function(t){var e=vr(t);return mr.reduce((function(t,r){return t.concat(e.filter((function(t){return t.phase===r})))}),[])}((n=[].concat(o,a.options.modifiers),c=n.reduce((function(t,e){var r=t[e.name];return t[e.name]=r?Object.assign({},r,e,{options:Object.assign({},r.options,e.options),data:Object.assign({},r.data,e.data)}):e,t}),{}),Object.keys(c).map((function(t){return c[t]}))));return a.orderedModifiers=u.filter((function(t){return t.enabled})),a.orderedModifiers.forEach((function(t){var e=t.name,r=t.options,o=void 0===r?{}:r,i=t.effect;if("function"==typeof i){var s=i({state:a,name:e,instance:d,options:o}),n=function(){};l.push(s||n)}})),d.update()},forceUpdate:function(){if(!c){var t=a.elements,e=t.reference,r=t.popper;if(Or(e,r)){a.rects={reference:rr(e,cr(r),"fixed"===a.options.strategy),popper:or(r)},a.reset=!1,a.placement=a.options.placement,a.orderedModifiers.forEach((function(t){return a.modifiersData[t.name]=Object.assign({},t.data)}));for(var o=0;o<a.orderedModifiers.length;o++)if(!0!==a.reset){var i=a.orderedModifiers[o],s=i.fn,n=i.options,l=void 0===n?{}:n,h=i.name;"function"==typeof s&&(a=s({state:a,options:l,name:h,instance:d})||a)}else a.reset=!1,o=-1}}},update:(i=function(){return new Promise((function(t){d.forceUpdate(),t(a)}))},function(){return n||(n=new Promise((function(t){Promise.resolve().then((function(){n=void 0,t(i())}))}))),n}),destroy:function(){h(),c=!0}};if(!Or(t,e))return d;function h(){l.forEach((function(t){return t()})),l=[]}return d.setOptions(r).then((function(t){!c&&r.onFirstUpdate&&r.onFirstUpdate(t)})),d}}var Lr={passive:!0};var Pr={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,r=t.instance,o=t.options,i=o.scroll,s=void 0===i||i,n=o.resize,a=void 0===n||n,l=He(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return s&&c.forEach((function(t){t.addEventListener("scroll",r.update,Lr)})),a&&l.addEventListener("resize",r.update,Lr),function(){s&&c.forEach((function(t){t.removeEventListener("scroll",r.update,Lr)})),a&&l.removeEventListener("resize",r.update,Lr)}},data:{}};var Dr={name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,r=t.name;e.modifiersData[r]=Ar({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}},Ur={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Br(t){var e,r=t.popper,o=t.popperRect,i=t.placement,s=t.variation,n=t.offsets,a=t.position,l=t.gpuAcceleration,c=t.adaptive,d=t.roundOffsets,h=t.isFixed,u=n.x,p=void 0===u?0:u,g=n.y,b=void 0===g?0:g,f="function"==typeof d?d({x:p,y:b}):{x:p,y:b};p=f.x,b=f.y;var m=n.hasOwnProperty("x"),v=n.hasOwnProperty("y"),y=pr,w=dr,_=window;if(c){var $=cr(r),x="clientHeight",k="clientWidth";if($===He(r)&&"static"!==tr($=Ze(r)).position&&"absolute"===a&&(x="scrollHeight",k="scrollWidth"),$=$,i===dr||(i===pr||i===ur)&&"end"===s)w=hr,b-=(h&&_.visualViewport?_.visualViewport.height:$[x])-o.height,b*=l?1:-1;if(i===pr||(i===dr||i===hr)&&"end"===s)y=ur,p-=(h&&_.visualViewport?_.visualViewport.width:$[k])-o.width,p*=l?1:-1}var C,A=Object.assign({position:a},c&&Ur),E=!0===d?function(t){var e=t.x,r=t.y,o=window.devicePixelRatio||1;return{x:Ke(e*o)/o||0,y:Ke(r*o)/o||0}}({x:p,y:b}):{x:p,y:b};return p=E.x,b=E.y,l?Object.assign({},A,((C={})[w]=v?"0":"",C[y]=m?"0":"",C.transform=(_.devicePixelRatio||1)<=1?"translate("+p+"px, "+b+"px)":"translate3d("+p+"px, "+b+"px, 0)",C)):Object.assign({},A,((e={})[w]=v?b+"px":"",e[y]=m?p+"px":"",e.transform="",e))}var Rr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,r=t.options,o=r.gpuAcceleration,i=void 0===o||o,s=r.adaptive,n=void 0===s||s,a=r.roundOffsets,l=void 0===a||a,c={placement:yr(e.placement),variation:kr(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:i,isFixed:"fixed"===e.options.strategy};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,Br(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:n,roundOffsets:l})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,Br(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:l})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}};var Ir={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var r=e.styles[t]||{},o=e.attributes[t]||{},i=e.elements[t];Ve(i)&&Je(i)&&(Object.assign(i.style,r),Object.keys(o).forEach((function(t){var e=o[t];!1===e?i.removeAttribute(t):i.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,r={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,r.popper),e.styles=r,e.elements.arrow&&Object.assign(e.elements.arrow.style,r.arrow),function(){Object.keys(e.elements).forEach((function(t){var o=e.elements[t],i=e.attributes[t]||{},s=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:r[t]).reduce((function(t,e){return t[e]="",t}),{});Ve(o)&&Je(o)&&(Object.assign(o.style,s),Object.keys(i).forEach((function(t){o.removeAttribute(t)})))}))}},requires:["computeStyles"]};var Nr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,r=t.options,o=t.name,i=r.offset,s=void 0===i?[0,0]:i,n=fr.reduce((function(t,r){return t[r]=function(t,e,r){var o=yr(t),i=[pr,dr].indexOf(o)>=0?-1:1,s="function"==typeof r?r(Object.assign({},e,{placement:t})):r,n=s[0],a=s[1];return n=n||0,a=(a||0)*i,[pr,ur].indexOf(o)>=0?{x:a,y:n}:{x:n,y:a}}(r,e.rects,s),t}),{}),a=n[e.placement],l=a.x,c=a.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=l,e.modifiersData.popperOffsets.y+=c),e.modifiersData[o]=n}},jr={left:"right",right:"left",bottom:"top",top:"bottom"};function Hr(t){return t.replace(/left|right|bottom|top/g,(function(t){return jr[t]}))}var Fr={start:"end",end:"start"};function Vr(t){return t.replace(/start|end/g,(function(t){return Fr[t]}))}var qr={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,r=t.options,o=t.name;if(!e.modifiersData[o]._skip){for(var i=r.mainAxis,s=void 0===i||i,n=r.altAxis,a=void 0===n||n,l=r.fallbackPlacements,c=r.padding,d=r.boundary,h=r.rootBoundary,u=r.altBoundary,p=r.flipVariations,g=void 0===p||p,b=r.allowedAutoPlacements,f=e.options.placement,m=yr(f),v=l||(m===f||!g?[Hr(f)]:function(t){if("auto"===yr(t))return[];var e=Hr(t);return[Vr(t),e,Vr(e)]}(f)),y=[f].concat(v).reduce((function(t,r){return t.concat("auto"===yr(r)?function(t,e){void 0===e&&(e={});var r=e,o=r.placement,i=r.boundary,s=r.rootBoundary,n=r.padding,a=r.flipVariations,l=r.allowedAutoPlacements,c=void 0===l?fr:l,d=kr(o),h=d?a?br:br.filter((function(t){return kr(t)===d})):gr,u=h.filter((function(t){return c.indexOf(t)>=0}));0===u.length&&(u=h);var p=u.reduce((function(e,r){return e[r]=Mr(t,{placement:r,boundary:i,rootBoundary:s,padding:n})[yr(r)],e}),{});return Object.keys(p).sort((function(t,e){return p[t]-p[e]}))}(e,{placement:r,boundary:d,rootBoundary:h,padding:c,flipVariations:g,allowedAutoPlacements:b}):r)}),[]),w=e.rects.reference,_=e.rects.popper,$=new Map,x=!0,k=y[0],C=0;C<y.length;C++){var A=y[C],E=yr(A),S="start"===kr(A),M=[dr,hr].indexOf(E)>=0,T=M?"width":"height",O=Mr(e,{placement:A,boundary:d,rootBoundary:h,altBoundary:u,padding:c}),z=M?S?ur:pr:S?hr:dr;w[T]>_[T]&&(z=Hr(z));var L=Hr(z),P=[];if(s&&P.push(O[E]<=0),a&&P.push(O[z]<=0,O[L]<=0),P.every((function(t){return t}))){k=A,x=!1;break}$.set(A,P)}if(x)for(var D=function(t){var e=y.find((function(e){var r=$.get(e);if(r)return r.slice(0,t).every((function(t){return t}))}));if(e)return k=e,"break"},U=g?3:1;U>0;U--){if("break"===D(U))break}e.placement!==k&&(e.modifiersData[o]._skip=!0,e.placement=k,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function Gr(t,e,r){return Ge(t,We(e,r))}var Wr={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,r=t.options,o=t.name,i=r.mainAxis,s=void 0===i||i,n=r.altAxis,a=void 0!==n&&n,l=r.boundary,c=r.rootBoundary,d=r.altBoundary,h=r.padding,u=r.tether,p=void 0===u||u,g=r.tetherOffset,b=void 0===g?0:g,f=Mr(e,{boundary:l,rootBoundary:c,padding:h,altBoundary:d}),m=yr(e.placement),v=kr(e.placement),y=!v,w=Cr(m),_="x"===w?"y":"x",$=e.modifiersData.popperOffsets,x=e.rects.reference,k=e.rects.popper,C="function"==typeof b?b(Object.assign({},e.rects,{placement:e.placement})):b,A="number"==typeof C?{mainAxis:C,altAxis:C}:Object.assign({mainAxis:0,altAxis:0},C),E=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,S={x:0,y:0};if($){if(s){var M,T="y"===w?dr:pr,O="y"===w?hr:ur,z="y"===w?"height":"width",L=$[w],P=L+f[T],D=L-f[O],U=p?-k[z]/2:0,B="start"===v?x[z]:k[z],R="start"===v?-k[z]:-x[z],I=e.elements.arrow,N=p&&I?or(I):{width:0,height:0},j=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},H=j[T],F=j[O],V=Gr(0,x[z],N[z]),q=y?x[z]/2-U-V-H-A.mainAxis:B-V-H-A.mainAxis,G=y?-x[z]/2+U+V+F+A.mainAxis:R+V+F+A.mainAxis,W=e.elements.arrow&&cr(e.elements.arrow),K=W?"y"===w?W.clientTop||0:W.clientLeft||0:0,Y=null!=(M=null==E?void 0:E[w])?M:0,X=L+G-Y,J=Gr(p?We(P,L+q-Y-K):P,L,p?Ge(D,X):D);$[w]=J,S[w]=J-L}if(a){var Z,Q="x"===w?dr:pr,tt="x"===w?hr:ur,et=$[_],rt="y"===_?"height":"width",ot=et+f[Q],it=et-f[tt],st=-1!==[dr,pr].indexOf(m),nt=null!=(Z=null==E?void 0:E[_])?Z:0,at=st?ot:et-x[rt]-k[rt]-nt+A.altAxis,lt=st?et+x[rt]+k[rt]-nt-A.altAxis:it,ct=p&&st?function(t,e,r){var o=Gr(t,e,r);return o>r?r:o}(at,et,lt):Gr(p?at:ot,et,p?lt:it);$[_]=ct,S[_]=ct-et}e.modifiersData[o]=S}},requiresIfExists:["offset"]};var Kr={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,r=t.state,o=t.name,i=t.options,s=r.elements.arrow,n=r.modifiersData.popperOffsets,a=yr(r.placement),l=Cr(a),c=[pr,ur].indexOf(a)>=0?"height":"width";if(s&&n){var d=function(t,e){return Er("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:Sr(t,gr))}(i.padding,r),h=or(s),u="y"===l?dr:pr,p="y"===l?hr:ur,g=r.rects.reference[c]+r.rects.reference[l]-n[l]-r.rects.popper[c],b=n[l]-r.rects.reference[l],f=cr(s),m=f?"y"===l?f.clientHeight||0:f.clientWidth||0:0,v=g/2-b/2,y=d[u],w=m-h[c]-d[p],_=m/2-h[c]/2+v,$=Gr(y,_,w),x=l;r.modifiersData[o]=((e={})[x]=$,e.centerOffset=$-_,e)}},effect:function(t){var e=t.state,r=t.options.element,o=void 0===r?"[data-popper-arrow]":r;null!=o&&("string"!=typeof o||(o=e.elements.popper.querySelector(o)))&&wr(e.elements.popper,o)&&(e.elements.arrow=o)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function Yr(t,e,r){return void 0===r&&(r={x:0,y:0}),{top:t.top-e.height-r.y,right:t.right-e.width+r.x,bottom:t.bottom-e.height+r.y,left:t.left-e.width-r.x}}function Xr(t){return[dr,ur,hr,pr].some((function(e){return t[e]>=0}))}var Jr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,r=t.name,o=e.rects.reference,i=e.rects.popper,s=e.modifiersData.preventOverflow,n=Mr(e,{elementContext:"reference"}),a=Mr(e,{altBoundary:!0}),l=Yr(n,o),c=Yr(a,i,s),d=Xr(l),h=Xr(c);e.modifiersData[r]={referenceClippingOffsets:l,popperEscapeOffsets:c,isReferenceHidden:d,hasPopperEscaped:h},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":d,"data-popper-escaped":h})}},Zr=zr({defaultModifiers:[Pr,Dr,Rr,Ir,Nr,qr,Wr,Kr,Jr]}),Qr=K`
  ${Ft}

  :host {
    display: inline-block;
  }

  .dropdown {
    position: relative;
  }

  .dropdown__trigger {
    display: block;
  }

  .dropdown__positioner {
    position: absolute;
    z-index: var(--sl-z-index-dropdown);
  }

  .dropdown__panel {
    max-height: 75vh;
    font-family: var(--sl-font-sans);
    font-size: var(--sl-font-size-medium);
    font-weight: var(--sl-font-weight-normal);
    color: var(--color);
    background-color: var(--sl-panel-background-color);
    border: solid var(--sl-panel-border-width) var(--sl-panel-border-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-large);
    overflow: auto;
    overscroll-behavior: none;
    pointer-events: none;
  }

  .dropdown--open .dropdown__panel {
    pointer-events: all;
  }

  .dropdown__positioner[data-popper-placement^='top'] .dropdown__panel {
    transform-origin: bottom;
  }

  .dropdown__positioner[data-popper-placement^='bottom'] .dropdown__panel {
    transform-origin: top;
  }

  .dropdown__positioner[data-popper-placement^='left'] .dropdown__panel {
    transform-origin: right;
  }

  .dropdown__positioner[data-popper-placement^='right'] .dropdown__panel {
    transform-origin: left;
  }
`;function to(t){const e=t.tagName.toLowerCase();return"-1"!==t.getAttribute("tabindex")&&(!t.hasAttribute("disabled")&&((!t.hasAttribute("aria-disabled")||"false"===t.getAttribute("aria-disabled"))&&(!("input"===e&&"radio"===t.getAttribute("type")&&!t.hasAttribute("checked"))&&(null!==t.offsetParent&&("hidden"!==window.getComputedStyle(t).visibility&&(!("audio"!==e&&"video"!==e||!t.hasAttribute("controls"))||(!!t.hasAttribute("tabindex")||(!(!t.hasAttribute("contenteditable")||"false"===t.getAttribute("contenteditable"))||["button","input","select","textarea","a","audio","video","summary"].includes(e)))))))))}function eo(t,e){return{top:Math.round(t.getBoundingClientRect().top-e.getBoundingClientRect().top),left:Math.round(t.getBoundingClientRect().left-e.getBoundingClientRect().left)}}function ro(t,e,r="vertical",o="smooth"){const i=eo(t,e),s=i.top+e.scrollTop,n=i.left+e.scrollLeft,a=e.scrollLeft,l=e.scrollLeft+e.offsetWidth,c=e.scrollTop,d=e.scrollTop+e.offsetHeight;"horizontal"!==r&&"both"!==r||(n<a?e.scrollTo({left:n,behavior:o}):n+t.clientWidth>l&&e.scrollTo({left:n-e.offsetWidth+t.clientWidth,behavior:o})),"vertical"!==r&&"both"!==r||(s<c?e.scrollTo({top:s,behavior:o}):s+t.clientHeight>d&&e.scrollTo({top:s-e.offsetHeight+t.clientHeight,behavior:o}))}function oo(t,e,r){return new Promise((o=>{if((null==r?void 0:r.duration)===1/0)throw new Error("Promise-based animations must be finite.");const i=t.animate(e,zt(Ot({},r),{duration:so()?0:r.duration}));i.addEventListener("cancel",o,{once:!0}),i.addEventListener("finish",o,{once:!0})}))}function io(t){return(t=t.toString().toLowerCase()).indexOf("ms")>-1?parseFloat(t):t.indexOf("s")>-1?1e3*parseFloat(t):parseFloat(t)}function so(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function no(t){return Promise.all(t.getAnimations().map((t=>new Promise((e=>{const r=requestAnimationFrame(e);t.addEventListener("cancel",(()=>r),{once:!0}),t.addEventListener("finish",(()=>r),{once:!0}),t.cancel()})))))}var ao=new Map,lo=new WeakMap;function co(t,e){ao.set(t,function(t){return null!=t?t:{keyframes:[],options:{duration:0}}}(e))}function ho(t,e){const r=lo.get(t);if(null==r?void 0:r[e])return r[e];const o=ao.get(e);return o||{keyframes:[],options:{duration:0}}}var uo=class extends ot{constructor(){super(...arguments),this.open=!1,this.placement="bottom-start",this.disabled=!1,this.stayOpenOnSelect=!1,this.distance=0,this.skidding=0,this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleMenuItemActivate=this.handleMenuItemActivate.bind(this),this.handlePanelSelect=this.handlePanelSelect.bind(this),this.handleDocumentKeyDown=this.handleDocumentKeyDown.bind(this),this.handleDocumentMouseDown=this.handleDocumentMouseDown.bind(this),this.containingElement||(this.containingElement=this),this.updateComplete.then((()=>{this.popover=Zr(this.trigger,this.positioner,{placement:this.placement,strategy:this.hoist?"fixed":"absolute",modifiers:[{name:"flip",options:{boundary:"viewport"}},{name:"offset",options:{offset:[this.skidding,this.distance]}}]})}))}firstUpdated(){this.panel.hidden=!this.open}disconnectedCallback(){var t;super.disconnectedCallback(),this.hide(),null==(t=this.popover)||t.destroy()}focusOnTrigger(){const t=this.trigger.querySelector("slot").assignedElements({flatten:!0})[0];"function"==typeof(null==t?void 0:t.focus)&&t.focus()}getMenu(){return this.panel.querySelector("slot").assignedElements({flatten:!0}).find((t=>"sl-menu"===t.tagName.toLowerCase()))}handleDocumentKeyDown(t){var e;if("Escape"===t.key)return this.hide(),void this.focusOnTrigger();if("Tab"===t.key){if(this.open&&"sl-menu-item"===(null==(e=document.activeElement)?void 0:e.tagName.toLowerCase()))return t.preventDefault(),this.hide(),void this.focusOnTrigger();setTimeout((()=>{var t,e,r;const o=(null==(t=this.containingElement)?void 0:t.getRootNode())instanceof ShadowRoot?null==(r=null==(e=document.activeElement)?void 0:e.shadowRoot)?void 0:r.activeElement:document.activeElement;this.containingElement&&(null==o?void 0:o.closest(this.containingElement.tagName.toLowerCase()))===this.containingElement||this.hide()}))}}handleDocumentMouseDown(t){const e=t.composedPath();this.containingElement&&!e.includes(this.containingElement)&&this.hide()}handleMenuItemActivate(t){ro(t.target,this.panel)}handlePanelSelect(t){const e=t.target;this.stayOpenOnSelect||"sl-menu"!==e.tagName.toLowerCase()||(this.hide(),this.focusOnTrigger())}handlePopoverOptionsChange(){var t;null==(t=this.popover)||t.setOptions({placement:this.placement,strategy:this.hoist?"fixed":"absolute",modifiers:[{name:"flip",options:{boundary:"viewport"}},{name:"offset",options:{offset:[this.skidding,this.distance]}}]})}handleTriggerClick(){this.open?this.hide():this.show()}handleTriggerKeyDown(t){var e;const r=this.getMenu(),o=[...null!=(e=null==r?void 0:r.querySelectorAll("sl-menu-item"))?e:[]],i=o[0],s=o[o.length-1];if("Escape"===t.key)return this.focusOnTrigger(),void this.hide();if([" ","Enter"].includes(t.key))return t.preventDefault(),void this.handleTriggerClick();if(["ArrowDown","ArrowUp"].includes(t.key)){if(t.preventDefault(),this.open||this.show(),"ArrowDown"===t.key)return r.setCurrentItem(i),void i.focus();if("ArrowUp"===t.key)return r.setCurrentItem(s),void s.focus()}this.open&&!["Tab","Shift","Meta","Ctrl","Alt"].includes(t.key)&&(null==r||r.typeToSelect(t.key))}handleTriggerKeyUp(t){" "===t.key&&t.preventDefault()}handleTriggerSlotChange(){this.updateAccessibleTrigger()}updateAccessibleTrigger(){const t=this.trigger.querySelector("slot").assignedElements({flatten:!0}).find((t=>function(t){var e,r;const o=[];return function t(e){e instanceof HTMLElement&&(o.push(e),null!==e.shadowRoot&&"open"===e.shadowRoot.mode&&t(e.shadowRoot)),[...e.querySelectorAll("*")].forEach((e=>t(e)))}(t),{start:null!=(e=o.find((t=>to(t))))?e:null,end:null!=(r=o.reverse().find((t=>to(t))))?r:null}}(t).start));t&&(t.setAttribute("aria-haspopup","true"),t.setAttribute("aria-expanded",this.open?"true":"false"))}async show(){if(!this.open)return this.open=!0,Gt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Gt(this,"sl-after-hide")}reposition(){var t;this.open&&(null==(t=this.popover)||t.update())}async handleOpenChange(){var t;if(!this.disabled)if(this.updateAccessibleTrigger(),this.open){qt(this,"sl-show"),this.panel.addEventListener("sl-activate",this.handleMenuItemActivate),this.panel.addEventListener("sl-select",this.handlePanelSelect),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("mousedown",this.handleDocumentMouseDown),await no(this),null==(t=this.popover)||t.update(),this.panel.hidden=!1;const{keyframes:e,options:r}=ho(this,"dropdown.show");await oo(this.panel,e,r),qt(this,"sl-after-show")}else{qt(this,"sl-hide"),this.panel.removeEventListener("sl-activate",this.handleMenuItemActivate),this.panel.removeEventListener("sl-select",this.handlePanelSelect),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("mousedown",this.handleDocumentMouseDown),await no(this);const{keyframes:t,options:e}=ho(this,"dropdown.hide");await oo(this.panel,t,e),this.panel.hidden=!0,qt(this,"sl-after-hide")}}render(){return C`
      <div
        part="base"
        id="dropdown"
        class=${vt({dropdown:!0,"dropdown--open":this.open})}
      >
        <span
          part="trigger"
          class="dropdown__trigger"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeyDown}
          @keyup=${this.handleTriggerKeyUp}
        >
          <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
        </span>

        <!-- Position the panel with a wrapper since the popover makes use of translate. This let's us add animations
        on the panel without interfering with the position. -->
        <div class="dropdown__positioner">
          <div
            part="panel"
            class="dropdown__panel"
            aria-hidden=${this.open?"false":"true"}
            aria-labelledby="dropdown"
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `}};uo.styles=Qr,Pt([Jt(".dropdown__trigger")],uo.prototype,"trigger",2),Pt([Jt(".dropdown__panel")],uo.prototype,"panel",2),Pt([Jt(".dropdown__positioner")],uo.prototype,"positioner",2),Pt([Yt({type:Boolean,reflect:!0})],uo.prototype,"open",2),Pt([Yt()],uo.prototype,"placement",2),Pt([Yt({type:Boolean})],uo.prototype,"disabled",2),Pt([Yt({attribute:"stay-open-on-select",type:Boolean,reflect:!0})],uo.prototype,"stayOpenOnSelect",2),Pt([Yt({attribute:!1})],uo.prototype,"containingElement",2),Pt([Yt({type:Number})],uo.prototype,"distance",2),Pt([Yt({type:Number})],uo.prototype,"skidding",2),Pt([Yt({type:Boolean})],uo.prototype,"hoist",2),Pt([$e("distance"),$e("hoist"),$e("placement"),$e("skidding")],uo.prototype,"handlePopoverOptionsChange",1),Pt([$e("open",{waitUntilFirstUpdate:!0})],uo.prototype,"handleOpenChange",1),uo=Pt([Wt("sl-dropdown")],uo),co("dropdown.show",{keyframes:[{opacity:0,transform:"scale(0.9)"},{opacity:1,transform:"scale(1)"}],options:{duration:100,easing:"ease"}}),co("dropdown.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.9)"}],options:{duration:100,easing:"ease"}});var po="";function go(t){po=t}var bo=[...document.getElementsByTagName("script")],fo=bo.find((t=>t.hasAttribute("data-shoelace")));if(fo)go(fo.getAttribute("data-shoelace"));else{const t=bo.find((t=>/shoelace(\.min)?\.js($|\?)/.test(t.src)));let e="";t&&(e=t.getAttribute("src")),go(e.split("/").slice(0,-1).join("/"))}var mo={check:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">\n      <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>\n    </svg>\n  ',"chevron-down":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"chevron-left":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>\n    </svg>\n  ',"chevron-right":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">\n      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',eye:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">\n      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>\n      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>\n    </svg>\n  ',"eye-slash":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">\n      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>\n      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>\n      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>\n    </svg>\n  ',eyedropper:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">\n      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>\n    </svg>\n  ',"grip-vertical":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">\n      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>\n    </svg>\n  ',"person-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n    </svg>\n  ',"play-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">\n      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>\n    </svg>\n  ',"pause-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">\n      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>\n    </svg>\n  ',"star-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>\n  ',x:'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">\n      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>\n    </svg>\n  ',"x-circle-fill":'\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">\n      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>\n    </svg>\n  '},vo=[{name:"default",resolver:t=>`${po.replace(/\/$/,"")}/assets/icons/${t}.svg`},{name:"system",resolver:t=>t in mo?`data:image/svg+xml,${encodeURIComponent(mo[t])}`:""}],yo=[];function wo(t){return vo.find((e=>e.name===t))}function _o(t,e){!function(t){vo=vo.filter((e=>e.name!==t))}(t),vo.push({name:t,resolver:e.resolver,mutator:e.mutator}),yo.forEach((e=>{e.library===t&&e.redraw()}))}var $o=new Map;var xo=new Map;async function ko(t){if(xo.has(t))return xo.get(t);const e=await function(t,e="cors"){if($o.has(t))return $o.get(t);const r=fetch(t,{mode:e}).then((async t=>({ok:t.ok,status:t.status,html:await t.text()})));return $o.set(t,r),r}(t),r={ok:e.ok,status:e.status,svg:null};if(e.ok){const t=document.createElement("div");t.innerHTML=e.html;const o=t.firstElementChild;r.svg="svg"===(null==o?void 0:o.tagName.toLowerCase())?o.outerHTML:""}return xo.set(t,r),r}var Co=K`
  ${Ft}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    box-sizing: content-box !important;
  }

  .icon,
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,Ao=class extends a{constructor(t){if(super(t),this.it=E,t.type!==o)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===E||null==t)return this.vt=void 0,this.it=t;if(t===A)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.vt;this.it=t;const e=[t];return e.raw=e,this.vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}};Ao.directiveName="unsafeHTML",Ao.resultType=1;var Eo=class extends Ao{};Eo.directiveName="unsafeSVG",Eo.resultType=2;var So=n(Eo),Mo=new DOMParser,To=class extends ot{constructor(){super(...arguments),this.svg="",this.label="",this.library="default"}connectedCallback(){var t;super.connectedCallback(),t=this,yo.push(t)}firstUpdated(){this.setIcon()}disconnectedCallback(){var t;super.disconnectedCallback(),t=this,yo=yo.filter((e=>e!==t))}getUrl(){const t=wo(this.library);return this.name&&t?t.resolver(this.name):this.src}redraw(){this.setIcon()}async setIcon(){var t;const e=wo(this.library),r=this.getUrl();if(r)try{const o=await ko(r);if(r!==this.getUrl())return;if(o.ok){const r=Mo.parseFromString(o.svg,"text/html").body.querySelector("svg");null!==r?(null==(t=null==e?void 0:e.mutator)||t.call(e,r),this.svg=r.outerHTML,qt(this,"sl-load")):(this.svg="",qt(this,"sl-error",{detail:{status:o.status}}))}else this.svg="",qt(this,"sl-error",{detail:{status:o.status}})}catch(t){qt(this,"sl-error",{detail:{status:-1}})}else this.svg.length>0&&(this.svg="")}handleChange(){this.setIcon()}render(){const t="string"==typeof this.label&&this.label.length>0;return C` <div
      part="base"
      class="icon"
      role=${yt(t?"img":void 0)}
      aria-label=${yt(t?this.label:void 0)}
      aria-hidden=${yt(t?void 0:"true")}
    >
      ${So(this.svg)}
    </div>`}};To.styles=Co,Pt([Xt()],To.prototype,"svg",2),Pt([Yt()],To.prototype,"name",2),Pt([Yt()],To.prototype,"src",2),Pt([Yt()],To.prototype,"label",2),Pt([Yt()],To.prototype,"library",2),Pt([$e("name"),$e("src"),$e("library")],To.prototype,"setIcon",1),To=Pt([Wt("sl-icon")],To);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Oo=K`
  ${Ft}

  :host {
    display: block;
  }

  .menu {
    padding: var(--sl-spacing-x-small) 0;
  }

  ::slotted(sl-divider) {
    --spacing: var(--sl-spacing-x-small);
  }
`,zo=class extends ot{constructor(){super(...arguments),this.typeToSelectString=""}firstUpdated(){this.setAttribute("role","menu")}getAllItems(t={includeDisabled:!0}){return[...this.defaultSlot.assignedElements({flatten:!0})].filter((e=>"menuitem"===e.getAttribute("role")&&!(!t.includeDisabled&&e.disabled)))}getCurrentItem(){return this.getAllItems({includeDisabled:!1}).find((t=>"0"===t.getAttribute("tabindex")))}setCurrentItem(t){const e=this.getAllItems({includeDisabled:!1}),r=t.disabled?e[0]:t;e.forEach((t=>{t.setAttribute("tabindex",t===r?"0":"-1")}))}typeToSelect(t){var e;const r=this.getAllItems({includeDisabled:!1});clearTimeout(this.typeToSelectTimeout),this.typeToSelectTimeout=window.setTimeout((()=>this.typeToSelectString=""),750),this.typeToSelectString+=t.toLowerCase(),jt||r.forEach((t=>t.classList.remove("sl-focus-invisible")));for(const t of r){if(Nt(null==(e=t.shadowRoot)?void 0:e.querySelector("slot:not([name])")).toLowerCase().trim().startsWith(this.typeToSelectString)){this.setCurrentItem(t),t.focus();break}}}handleClick(t){const e=t.target.closest("sl-menu-item");!1===(null==e?void 0:e.disabled)&&qt(this,"sl-select",{detail:{item:e}})}handleKeyUp(){if(!jt){this.getAllItems().forEach((t=>{t.classList.remove("sl-focus-invisible")}))}}handleKeyDown(t){if("Enter"===t.key){const e=this.getCurrentItem();t.preventDefault(),null==e||e.click()}if(" "===t.key&&t.preventDefault(),["ArrowDown","ArrowUp","Home","End"].includes(t.key)){const e=this.getAllItems({includeDisabled:!1}),r=this.getCurrentItem();let o=r?e.indexOf(r):0;if(e.length>0)return t.preventDefault(),"ArrowDown"===t.key?o++:"ArrowUp"===t.key?o--:"Home"===t.key?o=0:"End"===t.key&&(o=e.length-1),o<0&&(o=0),o>e.length-1&&(o=e.length-1),this.setCurrentItem(e[o]),void e[o].focus()}this.typeToSelect(t.key)}handleMouseDown(t){const e=t.target;"menuitem"===e.getAttribute("role")&&(this.setCurrentItem(e),jt||e.classList.add("sl-focus-invisible"))}handleSlotChange(){const t=this.getAllItems({includeDisabled:!1});t.length>0&&this.setCurrentItem(t[0])}render(){return C`
      <div
        part="base"
        class="menu"
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @keyup=${this.handleKeyUp}
        @mousedown=${this.handleMouseDown}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};zo.styles=Oo,Pt([Jt(".menu")],zo.prototype,"menu",2),Pt([Jt("slot")],zo.prototype,"defaultSlot",2),zo=Pt([Wt("sl-menu")],zo);var Lo=K`
  ${Ft}

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
    text-align: left;
    color: var(--sl-color-neutral-700);
    padding: var(--sl-spacing-2x-small) var(--sl-spacing-x-large);
    transition: var(--sl-transition-fast) fill;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    color: var(--sl-color-neutral-400);
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix ::slotted(*) {
    margin-right: var(--sl-spacing-x-small);
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix ::slotted(*) {
    margin-left: var(--sl-spacing-x-small);
  }

  :host(:focus) {
    outline: none;
  }

  :host(:hover:not([aria-disabled='true'])) .menu-item,
  :host(${Ht}:not(.sl-focus-invisible):not([aria-disabled='true'])) .menu-item {
    outline: none;
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .menu-item .menu-item__check {
    display: flex;
    position: absolute;
    left: 0.5em;
    top: calc(50% - 0.5em);
    visibility: hidden;
    align-items: center;
    font-size: inherit;
  }

  .menu-item--checked .menu-item__check {
    visibility: visible;
  }
`,Po=class extends ot{constructor(){super(...arguments),this.checked=!1,this.value="",this.disabled=!1}firstUpdated(){this.setAttribute("role","menuitem")}handleCheckedChange(){this.setAttribute("aria-checked",this.checked?"true":"false")}handleDisabledChange(){this.setAttribute("aria-disabled",this.disabled?"true":"false")}render(){return C`
      <div
        part="base"
        class=${vt({"menu-item":!0,"menu-item--checked":this.checked,"menu-item--disabled":this.disabled})}
      >
        <sl-icon
          part="checked-icon"
          class="menu-item__check"
          name="check"
          library="system"
          aria-hidden="true"
        ></sl-icon>

        <span part="prefix" class="menu-item__prefix">
          <slot name="prefix"></slot>
        </span>

        <span part="label" class="menu-item__label">
          <slot></slot>
        </span>

        <span part="suffix" class="menu-item__suffix">
          <slot name="suffix"></slot>
        </span>
      </div>
    `}};Po.styles=Lo,Pt([Jt(".menu-item")],Po.prototype,"menuItem",2),Pt([Yt({type:Boolean,reflect:!0})],Po.prototype,"checked",2),Pt([Yt()],Po.prototype,"value",2),Pt([Yt({type:Boolean,reflect:!0})],Po.prototype,"disabled",2),Pt([$e("checked")],Po.prototype,"handleCheckedChange",1),Pt([$e("disabled")],Po.prototype,"handleDisabledChange",1),Po=Pt([Wt("sl-menu-item")],Po);var Do=K`
  ${Ft}

  :host {
    --height: var(--sl-toggle-size);
    --thumb-size: calc(var(--sl-toggle-size) + 4px);
    --width: calc(var(--height) * 2);

    display: inline-block;
  }

  .switch {
    display: inline-flex;
    align-items: center;
    font-family: var(--sl-input-font-family);
    font-size: var(--sl-input-font-size-medium);
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
    transform: translateX(calc((var(--width) - var(--height)) / -2));
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) background-color,
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
  .switch:not(.switch--checked):not(.switch--disabled) .switch__input${Ht} ~ .switch__control {
    background-color: var(--sl-color-neutral-400);
    border-color: var(--sl-color-neutral-400);
  }

  .switch:not(.switch--checked):not(.switch--disabled)
    .switch__input${Ht}
    ~ .switch__control
    .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    box-shadow: var(--sl-focus-ring);
  }

  /* Checked */
  .switch--checked .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch--checked .switch__control .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    transform: translateX(calc((var(--width) - var(--height)) / 2));
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
  .switch.switch--checked:not(.switch--disabled) .switch__input${Ht} ~ .switch__control {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
  }

  .switch.switch--checked:not(.switch--disabled)
    .switch__input${Ht}
    ~ .switch__control
    .switch__thumb {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-primary-600);
    box-shadow: var(--sl-focus-ring);
  }

  /* Disabled */
  .switch--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .switch__label {
    line-height: var(--height);
    margin-left: 0.5em;
    user-select: none;
  }
`,Uo=class extends ot{constructor(){super(...arguments),this.formSubmitController=new Rt(this,{value:t=>t.checked?t.value:void 0}),this.attrId=Ne(),this.switchId=`switch-${this.attrId}`,this.labelId=`switch-label-${this.attrId}`,this.hasFocus=!1,this.disabled=!1,this.required=!1,this.checked=!1,this.invalid=!1}firstUpdated(){this.invalid=!this.input.checkValidity()}click(){this.input.click()}focus(t){this.input.focus(t)}blur(){this.input.blur()}reportValidity(){return this.input.reportValidity()}setCustomValidity(t){this.input.setCustomValidity(t),this.invalid=!this.input.checkValidity()}handleBlur(){this.hasFocus=!1,qt(this,"sl-blur")}handleCheckedChange(){this.input.checked=this.checked,this.invalid=!this.input.checkValidity()}handleClick(){this.checked=!this.checked,qt(this,"sl-change")}handleDisabledChange(){this.input.disabled=this.disabled,this.invalid=!this.input.checkValidity()}handleFocus(){this.hasFocus=!0,qt(this,"sl-focus")}handleKeyDown(t){"ArrowLeft"===t.key&&(t.preventDefault(),this.checked=!1,qt(this,"sl-change")),"ArrowRight"===t.key&&(t.preventDefault(),this.checked=!0,qt(this,"sl-change"))}render(){return C`
      <label
        part="base"
        for=${this.switchId}
        class=${vt({switch:!0,"switch--checked":this.checked,"switch--disabled":this.disabled,"switch--focused":this.hasFocus})}
      >
        <input
          id=${this.switchId}
          class="switch__input"
          type="checkbox"
          name=${yt(this.name)}
          value=${yt(this.value)}
          .checked=${_e(this.checked)}
          .disabled=${this.disabled}
          .required=${this.required}
          role="switch"
          aria-checked=${this.checked?"true":"false"}
          aria-labelledby=${this.labelId}
          @click=${this.handleClick}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @keydown=${this.handleKeyDown}
        />

        <span part="control" class="switch__control">
          <span part="thumb" class="switch__thumb"></span>
        </span>

        <span part="label" id=${this.labelId} class="switch__label">
          <slot></slot>
        </span>
      </label>
    `}};Uo.styles=Do,Pt([Jt('input[type="checkbox"]')],Uo.prototype,"input",2),Pt([Xt()],Uo.prototype,"hasFocus",2),Pt([Yt()],Uo.prototype,"name",2),Pt([Yt()],Uo.prototype,"value",2),Pt([Yt({type:Boolean,reflect:!0})],Uo.prototype,"disabled",2),Pt([Yt({type:Boolean,reflect:!0})],Uo.prototype,"required",2),Pt([Yt({type:Boolean,reflect:!0})],Uo.prototype,"checked",2),Pt([Yt({type:Boolean,reflect:!0})],Uo.prototype,"invalid",2),Pt([$e("checked",{waitUntilFirstUpdate:!0})],Uo.prototype,"handleCheckedChange",1),Pt([$e("disabled",{waitUntilFirstUpdate:!0})],Uo.prototype,"handleDisabledChange",1),Uo=Pt([Wt("sl-switch")],Uo);var Bo=K`
  ${Ft}

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

  .tab${Ht}:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
    box-shadow: inset var(--sl-focus-ring);
  }

  .tab.tab--active:not(.tab--disabled) {
    color: var(--sl-color-primary-600);
  }

  .tab.tab--closable {
    padding-right: var(--sl-spacing-small);
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: var(--sl-font-size-large);
    margin-left: var(--sl-spacing-2x-small);
  }

  .tab__close-button::part(base) {
    padding: var(--sl-spacing-3x-small);
  }
`,Ro=class extends ot{constructor(){super(...arguments),this.localize=new ye(this),this.attrId=Ne(),this.componentId=`sl-tab-${this.attrId}`,this.panel="",this.active=!1,this.closable=!1,this.disabled=!1}focus(t){this.tab.focus(t)}blur(){this.tab.blur()}handleCloseClick(){qt(this,"sl-close")}render(){return this.id=this.id.length>0?this.id:this.componentId,C`
      <div
        part="base"
        class=${vt({tab:!0,"tab--active":this.active,"tab--closable":this.closable,"tab--disabled":this.disabled})}
        role="tab"
        aria-disabled=${this.disabled?"true":"false"}
        aria-selected=${this.active?"true":"false"}
        tabindex=${this.disabled||!this.active?"-1":"0"}
      >
        <slot></slot>
        ${this.closable?C`
              <sl-icon-button
                name="x"
                library="system"
                label=${this.localize.term("close")}
                exportparts="base:close-button"
                class="tab__close-button"
                @click=${this.handleCloseClick}
                tabindex="-1"
              ></sl-icon-button>
            `:""}
      </div>
    `}};Ro.styles=Bo,Pt([Jt(".tab")],Ro.prototype,"tab",2),Pt([Yt({reflect:!0})],Ro.prototype,"panel",2),Pt([Yt({type:Boolean,reflect:!0})],Ro.prototype,"active",2),Pt([Yt({type:Boolean})],Ro.prototype,"closable",2),Pt([Yt({type:Boolean,reflect:!0})],Ro.prototype,"disabled",2),Pt([Yt()],Ro.prototype,"lang",2),Ro=Pt([Wt("sl-tab")],Ro);var Io=K`
  ${Ft}

  :host {
    display: inline-block;
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: var(--sl-color-neutral-600);
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-medium) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus:not(.icon-button--disabled) {
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

  .icon-button${Ht} {
    box-shadow: var(--sl-focus-ring);
  }
`,No=class extends ot{constructor(){super(...arguments),this.label="",this.disabled=!1}render(){const t=!!this.href,e=C`
      <sl-icon
        name=${yt(this.name)}
        library=${yt(this.library)}
        src=${yt(this.src)}
        aria-hidden="true"
      ></sl-icon>
    `;return t?C`
          <a
            part="base"
            class="icon-button"
            href=${yt(this.href)}
            target=${yt(this.target)}
            download=${yt(this.download)}
            rel=${yt(this.target?"noreferrer noopener":void 0)}
            role="button"
            aria-disabled=${this.disabled?"true":"false"}
            aria-label="${this.label}"
            tabindex=${this.disabled?"-1":"0"}
          >
            ${e}
          </a>
        `:C`
          <button
            part="base"
            class=${vt({"icon-button":!0,"icon-button--disabled":this.disabled})}
            ?disabled=${this.disabled}
            type="button"
            aria-label=${this.label}
          >
            ${e}
          </button>
        `}};No.styles=Io,Pt([Jt("button")],No.prototype,"button",2),Pt([Yt()],No.prototype,"name",2),Pt([Yt()],No.prototype,"library",2),Pt([Yt()],No.prototype,"src",2),Pt([Yt()],No.prototype,"href",2),Pt([Yt()],No.prototype,"target",2),Pt([Yt()],No.prototype,"download",2),Pt([Yt()],No.prototype,"label",2),Pt([Yt({type:Boolean,reflect:!0})],No.prototype,"disabled",2),No=Pt([Wt("sl-icon-button")],No);var jo=K`
  ${Ft}

  :host {
    --track-color: var(--sl-color-neutral-200);
    --indicator-color: var(--sl-color-primary-600);

    display: block;
  }

  .tab-group {
    display: flex;
    border: solid 1px transparent;
    border-radius: 0;
  }

  .tab-group .tab-group__tabs {
    display: flex;
    position: relative;
  }

  .tab-group .tab-group__indicator {
    position: absolute;
    left: 0;
    transition: var(--sl-transition-fast) transform ease, var(--sl-transition-fast) width ease;
  }

  .tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 var(--sl-spacing-x-large);
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
    border-bottom: solid 2px var(--track-color);
  }

  .tab-group--top .tab-group__indicator {
    bottom: -2px;
    border-bottom: solid 2px var(--indicator-color);
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
    border-top: solid 2px var(--track-color);
  }

  .tab-group--bottom .tab-group__indicator {
    top: calc(-1 * 2px);
    border-top: solid 2px var(--indicator-color);
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
    border-right: solid 2px var(--track-color);
  }

  .tab-group--start .tab-group__indicator {
    right: calc(-1 * 2px);
    border-right: solid 2px var(--indicator-color);
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
    border-left: solid 2px var(--track-color);
  }

  .tab-group--end .tab-group__indicator {
    left: calc(-1 * 2px);
    border-left: solid 2px var(--indicator-color);
  }

  .tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
  }

  .tab-group--end ::slotted(sl-tab-panel) {
    --padding: 0 var(--sl-spacing-medium);
  }
`,Ho=class extends ot{constructor(){super(...arguments),this.localize=new ye(this),this.tabs=[],this.panels=[],this.hasScrollControls=!1,this.placement="top",this.activation="auto",this.noScrollControls=!1}connectedCallback(){super.connectedCallback(),this.resizeObserver=new ResizeObserver((()=>{this.preventIndicatorTransition(),this.repositionIndicator(),this.updateScrollControls()})),this.mutationObserver=new MutationObserver((t=>{t.some((t=>!["aria-labelledby","aria-controls"].includes(t.attributeName)))&&setTimeout((()=>this.setAriaLabels())),t.some((t=>"disabled"===t.attributeName))&&this.syncTabsAndPanels()})),this.updateComplete.then((()=>{this.syncTabsAndPanels(),this.mutationObserver.observe(this,{attributes:!0,childList:!0,subtree:!0}),this.resizeObserver.observe(this.nav);new IntersectionObserver(((t,e)=>{var r;t[0].intersectionRatio>0&&(this.setAriaLabels(),this.setActiveTab(null!=(r=this.getActiveTab())?r:this.tabs[0],{emitEvents:!1}),e.unobserve(t[0].target))})).observe(this.tabGroup)}))}disconnectedCallback(){this.mutationObserver.disconnect(),this.resizeObserver.unobserve(this.nav)}show(t){const e=this.tabs.find((e=>e.panel===t));e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}getAllTabs(t=!1){return[...this.shadowRoot.querySelector('slot[name="nav"]').assignedElements()].filter((e=>t?"sl-tab"===e.tagName.toLowerCase():"sl-tab"===e.tagName.toLowerCase()&&!e.disabled))}getAllPanels(){return[...this.body.querySelector("slot").assignedElements()].filter((t=>"sl-tab-panel"===t.tagName.toLowerCase()))}getActiveTab(){return this.tabs.find((t=>t.active))}handleClick(t){const e=t.target.closest("sl-tab");(null==e?void 0:e.closest("sl-tab-group"))===this&&null!==e&&this.setActiveTab(e,{scrollBehavior:"smooth"})}handleKeyDown(t){const e=t.target.closest("sl-tab");if((null==e?void 0:e.closest("sl-tab-group"))===this&&(["Enter"," "].includes(t.key)&&null!==e&&(this.setActiveTab(e,{scrollBehavior:"smooth"}),t.preventDefault()),["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End"].includes(t.key))){const e=document.activeElement;if("sl-tab"===(null==e?void 0:e.tagName.toLowerCase())){let r=this.tabs.indexOf(e);"Home"===t.key?r=0:"End"===t.key?r=this.tabs.length-1:["top","bottom"].includes(this.placement)&&"ArrowLeft"===t.key||["start","end"].includes(this.placement)&&"ArrowUp"===t.key?r=Math.max(0,r-1):(["top","bottom"].includes(this.placement)&&"ArrowRight"===t.key||["start","end"].includes(this.placement)&&"ArrowDown"===t.key)&&(r=Math.min(this.tabs.length-1,r+1)),this.tabs[r].focus({preventScroll:!0}),"auto"===this.activation&&this.setActiveTab(this.tabs[r],{scrollBehavior:"smooth"}),["top","bottom"].includes(this.placement)&&ro(this.tabs[r],this.nav,"horizontal"),t.preventDefault()}}}handleScrollToStart(){this.nav.scroll({left:this.nav.scrollLeft-this.nav.clientWidth,behavior:"smooth"})}handleScrollToEnd(){this.nav.scroll({left:this.nav.scrollLeft+this.nav.clientWidth,behavior:"smooth"})}updateScrollControls(){this.noScrollControls?this.hasScrollControls=!1:this.hasScrollControls=["top","bottom"].includes(this.placement)&&this.nav.scrollWidth>this.nav.clientWidth}setActiveTab(t,e){if(e=Ot({emitEvents:!0,scrollBehavior:"auto"},e),t!==this.activeTab&&!t.disabled){const r=this.activeTab;this.activeTab=t,this.tabs.map((t=>t.active=t===this.activeTab)),this.panels.map((t=>{var e;return t.active=t.name===(null==(e=this.activeTab)?void 0:e.panel)})),this.syncIndicator(),["top","bottom"].includes(this.placement)&&ro(this.activeTab,this.nav,"horizontal",e.scrollBehavior),e.emitEvents&&(r&&qt(this,"sl-tab-hide",{detail:{name:r.panel}}),qt(this,"sl-tab-show",{detail:{name:this.activeTab.panel}}))}}setAriaLabels(){this.tabs.forEach((t=>{const e=this.panels.find((e=>e.name===t.panel));e&&(t.setAttribute("aria-controls",e.getAttribute("id")),e.setAttribute("aria-labelledby",t.getAttribute("id")))}))}syncIndicator(){this.getActiveTab()?(this.indicator.style.display="block",this.repositionIndicator()):this.indicator.style.display="none"}repositionIndicator(){const t=this.getActiveTab();if(!t)return;const e=t.clientWidth,r=t.clientHeight,o=eo(t,this.nav),i=o.top+this.nav.scrollTop,s=o.left+this.nav.scrollLeft;switch(this.placement){case"top":case"bottom":this.indicator.style.width=`${e}px`,this.indicator.style.height="auto",this.indicator.style.transform=`translateX(${s}px)`;break;case"start":case"end":this.indicator.style.width="auto",this.indicator.style.height=`${r}px`,this.indicator.style.transform=`translateY(${i}px)`}}preventIndicatorTransition(){const t=this.indicator.style.transition;this.indicator.style.transition="none",requestAnimationFrame((()=>{this.indicator.style.transition=t}))}syncTabsAndPanels(){this.tabs=this.getAllTabs(),this.panels=this.getAllPanels(),this.syncIndicator()}render(){return C`
      <div
        part="base"
        class=${vt({"tab-group":!0,"tab-group--top":"top"===this.placement,"tab-group--bottom":"bottom"===this.placement,"tab-group--start":"start"===this.placement,"tab-group--end":"end"===this.placement,"tab-group--has-scroll-controls":this.hasScrollControls})}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="tab-group__nav-container" part="nav">
          ${this.hasScrollControls?C`
                <sl-icon-button
                  class="tab-group__scroll-button tab-group__scroll-button--start"
                  exportparts="base:scroll-button"
                  name="chevron-left"
                  library="system"
                  label=${this.localize.term("scrollToStart")}
                  @click=${this.handleScrollToStart}
                ></sl-icon-button>
              `:""}

          <div class="tab-group__nav">
            <div part="tabs" class="tab-group__tabs" role="tablist">
              <div part="active-tab-indicator" class="tab-group__indicator"></div>
              <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>

          ${this.hasScrollControls?C`
                <sl-icon-button
                  class="tab-group__scroll-button tab-group__scroll-button--end"
                  exportparts="base:scroll-button"
                  name="chevron-right"
                  library="system"
                  label=${this.localize.term("scrollToEnd")}
                  @click=${this.handleScrollToEnd}
                ></sl-icon-button>
              `:""}
        </div>

        <div part="body" class="tab-group__body">
          <slot @slotchange=${this.syncTabsAndPanels}></slot>
        </div>
      </div>
    `}};Ho.styles=jo,Pt([Jt(".tab-group")],Ho.prototype,"tabGroup",2),Pt([Jt(".tab-group__body")],Ho.prototype,"body",2),Pt([Jt(".tab-group__nav")],Ho.prototype,"nav",2),Pt([Jt(".tab-group__indicator")],Ho.prototype,"indicator",2),Pt([Xt()],Ho.prototype,"hasScrollControls",2),Pt([Yt()],Ho.prototype,"placement",2),Pt([Yt()],Ho.prototype,"activation",2),Pt([Yt({attribute:"no-scroll-controls",type:Boolean})],Ho.prototype,"noScrollControls",2),Pt([Yt()],Ho.prototype,"lang",2),Pt([$e("noScrollControls",{waitUntilFirstUpdate:!0})],Ho.prototype,"updateScrollControls",1),Pt([$e("placement",{waitUntilFirstUpdate:!0})],Ho.prototype,"syncIndicator",1),Ho=Pt([Wt("sl-tab-group")],Ho);var Fo=K`
  ${Ft}

  :host {
    --padding: 0;

    display: block;
  }

  .tab-panel {
    border: solid 1px transparent;
    padding: var(--padding);
  }
`,Vo=class extends ot{constructor(){super(...arguments),this.attrId=Ne(),this.componentId=`sl-tab-panel-${this.attrId}`,this.name="",this.active=!1}connectedCallback(){super.connectedCallback(),this.id=this.id.length>0?this.id:this.componentId}render(){return this.style.display=this.active?"block":"none",C`
      <div part="base" class="tab-panel" role="tabpanel" aria-hidden=${this.active?"false":"true"}>
        <slot></slot>
      </div>
    `}};Vo.styles=Fo,Pt([Yt({reflect:!0})],Vo.prototype,"name",2),Pt([Yt({type:Boolean,reflect:!0})],Vo.prototype,"active",2),Vo=Pt([Wt("sl-tab-panel")],Vo);var qo=K`
  ${Ft}

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
    cursor: default;
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

  .tag--success {
    background-color: var(--sl-color-success-50);
    border-color: var(--sl-color-success-200);
    color: var(--sl-color-success-800);
  }

  .tag--neutral {
    background-color: var(--sl-color-neutral-50);
    border-color: var(--sl-color-neutral-200);
    color: var(--sl-color-neutral-800);
  }

  .tag--warning {
    background-color: var(--sl-color-warning-50);
    border-color: var(--sl-color-warning-200);
    color: var(--sl-color-warning-800);
  }

  .tag--danger {
    background-color: var(--sl-color-danger-50);
    border-color: var(--sl-color-danger-200);
    color: var(--sl-color-danger-800);
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

  .tag--small .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-3x-small));
  }

  .tag--medium {
    font-size: var(--sl-button-font-size-medium);
    height: calc(var(--sl-input-height-medium) * 0.8);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
    padding: 0 var(--sl-spacing-small);
  }

  .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-2x-small));
  }

  .tag--large {
    font-size: var(--sl-button-font-size-large);
    height: calc(var(--sl-input-height-large) * 0.8);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
    padding: 0 var(--sl-spacing-medium);
  }

  .tag__remove {
    margin-left: var(--sl-spacing-2x-small);
    margin-right: calc(-1 * var(--sl-spacing-x-small));
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: var(--sl-border-radius-pill);
  }
`,Go=class extends ot{constructor(){super(...arguments),this.variant="neutral",this.size="medium",this.pill=!1,this.removable=!1}handleRemoveClick(){qt(this,"sl-remove")}render(){return C`
      <span
        part="base"
        class=${vt({tag:!0,"tag--primary":"primary"===this.variant,"tag--success":"success"===this.variant,"tag--neutral":"neutral"===this.variant,"tag--warning":"warning"===this.variant,"tag--danger":"danger"===this.variant,"tag--text":"text"===this.variant,"tag--small":"small"===this.size,"tag--medium":"medium"===this.size,"tag--large":"large"===this.size,"tag--pill":this.pill,"tag--removable":this.removable})}
      >
        <span part="content" class="tag__content">
          <slot></slot>
        </span>

        ${this.removable?C`
              <sl-icon-button
                exportparts="base:remove-button"
                name="x"
                library="system"
                class="tag__remove"
                @click=${this.handleRemoveClick}
              ></sl-icon-button>
            `:""}
      </span>
    `}};Go.styles=qo,Pt([Yt({reflect:!0})],Go.prototype,"variant",2),Pt([Yt({reflect:!0})],Go.prototype,"size",2),Pt([Yt({type:Boolean,reflect:!0})],Go.prototype,"pill",2),Pt([Yt({type:Boolean})],Go.prototype,"removable",2),Go=Pt([Wt("sl-tag")],Go);var Wo=K`
  ${Ft}

  :host {
    --max-width: 20rem;
    --hide-delay: 0ms;
    --show-delay: 150ms;

    display: contents;
  }

  .tooltip-content {
    display: contents;
  }

  .tooltip-positioner {
    position: absolute;
    z-index: var(--sl-z-index-tooltip);
    pointer-events: none;
  }

  .tooltip {
    max-width: var(--max-width);
    border-radius: var(--sl-tooltip-border-radius);
    background-color: var(--sl-tooltip-background-color);
    font-family: var(--sl-tooltip-font-family);
    font-size: var(--sl-tooltip-font-size);
    font-weight: var(--sl-tooltip-font-weight);
    line-height: var(--sl-tooltip-line-height);
    color: var(--sl-tooltip-color);
    padding: var(--sl-tooltip-padding);
  }

  .tooltip:after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
  }

  .tooltip-positioner[data-popper-placement^='top'] .tooltip {
    transform-origin: bottom;
  }

  .tooltip-positioner[data-popper-placement^='bottom'] .tooltip {
    transform-origin: top;
  }

  .tooltip-positioner[data-popper-placement^='left'] .tooltip {
    transform-origin: right;
  }

  .tooltip-positioner[data-popper-placement^='right'] .tooltip {
    transform-origin: left;
  }

  /* Arrow + bottom */
  .tooltip-positioner[data-popper-placement^='bottom'] .tooltip:after {
    bottom: 100%;
    left: calc(50% - var(--sl-tooltip-arrow-size));
    border-bottom: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='bottom-start'] .tooltip:after {
    left: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='bottom-end'] .tooltip:after {
    right: var(--sl-tooltip-arrow-start-end-offset);
    left: auto;
  }

  /* Arrow + top */
  .tooltip-positioner[data-popper-placement^='top'] .tooltip:after {
    top: 100%;
    left: calc(50% - var(--sl-tooltip-arrow-size));
    border-top: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-left: var(--sl-tooltip-arrow-size) solid transparent;
    border-right: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='top-start'] .tooltip:after {
    left: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='top-end'] .tooltip:after {
    right: var(--sl-tooltip-arrow-start-end-offset);
    left: auto;
  }

  /* Arrow + left */
  .tooltip-positioner[data-popper-placement^='left'] .tooltip:after {
    top: calc(50% - var(--sl-tooltip-arrow-size));
    left: 100%;
    border-left: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-top: var(--sl-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='left-start'] .tooltip:after {
    top: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='left-end'] .tooltip:after {
    top: auto;
    bottom: var(--sl-tooltip-arrow-start-end-offset);
  }

  /* Arrow + right */
  .tooltip-positioner[data-popper-placement^='right'] .tooltip:after {
    top: calc(50% - var(--sl-tooltip-arrow-size));
    right: 100%;
    border-right: var(--sl-tooltip-arrow-size) solid var(--sl-tooltip-background-color);
    border-top: var(--sl-tooltip-arrow-size) solid transparent;
    border-bottom: var(--sl-tooltip-arrow-size) solid transparent;
  }

  .tooltip-positioner[data-popper-placement='right-start'] .tooltip:after {
    top: var(--sl-tooltip-arrow-start-end-offset);
  }

  .tooltip-positioner[data-popper-placement='right-end'] .tooltip:after {
    top: auto;
    bottom: var(--sl-tooltip-arrow-start-end-offset);
  }
`,Ko=class extends ot{constructor(){super(...arguments),this.content="",this.placement="top",this.disabled=!1,this.distance=10,this.open=!1,this.skidding=0,this.trigger="hover focus",this.hoist=!1}connectedCallback(){super.connectedCallback(),this.handleBlur=this.handleBlur.bind(this),this.handleClick=this.handleClick.bind(this),this.handleFocus=this.handleFocus.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleMouseOver=this.handleMouseOver.bind(this),this.handleMouseOut=this.handleMouseOut.bind(this),this.updateComplete.then((()=>{this.addEventListener("blur",this.handleBlur,!0),this.addEventListener("focus",this.handleFocus,!0),this.addEventListener("click",this.handleClick),this.addEventListener("keydown",this.handleKeyDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseout",this.handleMouseOut),this.target=this.getTarget(),this.syncOptions()}))}firstUpdated(){this.tooltip.hidden=!this.open}disconnectedCallback(){var t;super.disconnectedCallback(),this.removeEventListener("blur",this.handleBlur,!0),this.removeEventListener("focus",this.handleFocus,!0),this.removeEventListener("click",this.handleClick),this.removeEventListener("keydown",this.handleKeyDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseout",this.handleMouseOut),null==(t=this.popover)||t.destroy()}async show(){if(!this.open)return this.open=!0,Gt(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,Gt(this,"sl-after-hide")}getTarget(){const t=[...this.children].find((t=>"style"!==t.tagName.toLowerCase()&&"content"!==t.getAttribute("slot")));if(!t)throw new Error("Invalid tooltip target: no child element was found.");return t}handleBlur(){this.hasTrigger("focus")&&this.hide()}handleClick(){this.hasTrigger("click")&&(this.open?this.hide():this.show())}handleFocus(){this.hasTrigger("focus")&&this.show()}handleKeyDown(t){this.open&&"Escape"===t.key&&(t.stopPropagation(),this.hide())}handleMouseOver(){if(this.hasTrigger("hover")){const t=io(getComputedStyle(this).getPropertyValue("--show-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>{this.show()}),t)}}handleMouseOut(){if(this.hasTrigger("hover")){const t=io(getComputedStyle(this).getPropertyValue("--hide-delay"));clearTimeout(this.hoverTimeout),this.hoverTimeout=window.setTimeout((()=>{this.hide()}),t)}}async handleOpenChange(){var t,e;if(!this.disabled)if(this.open){qt(this,"sl-show"),await no(this.tooltip),null==(t=this.popover)||t.destroy(),this.popover=Zr(this.target,this.positioner,{placement:this.placement,strategy:this.hoist?"fixed":"absolute",modifiers:[{name:"flip",options:{boundary:"viewport"}},{name:"offset",options:{offset:[this.skidding,this.distance]}}]}),this.tooltip.hidden=!1;const{keyframes:e,options:r}=ho(this,"tooltip.show");await oo(this.tooltip,e,r),qt(this,"sl-after-show")}else{qt(this,"sl-hide"),await no(this.tooltip);const{keyframes:t,options:r}=ho(this,"tooltip.hide");await oo(this.tooltip,t,r),this.tooltip.hidden=!0,null==(e=this.popover)||e.destroy(),qt(this,"sl-after-hide")}}handleOptionsChange(){this.syncOptions()}handleContentChange(){var t;this.open&&(null==(t=this.popover)||t.update())}handleDisabledChange(){this.disabled&&this.open&&this.hide()}hasTrigger(t){return this.trigger.split(" ").includes(t)}syncOptions(){var t;null==(t=this.popover)||t.setOptions({placement:this.placement,strategy:this.hoist?"fixed":"absolute",modifiers:[{name:"flip",options:{boundary:"viewport"}},{name:"offset",options:{offset:[this.skidding,this.distance]}}]})}render(){return C`
      <div class="tooltip-content" aria-describedby="tooltip">
        <slot></slot>
      </div>

      <div class="tooltip-positioner">
        <div
          part="base"
          id="tooltip"
          class=${vt({tooltip:!0,"tooltip--open":this.open})}
          role="tooltip"
          aria-hidden=${this.open?"false":"true"}
        >
          <slot name="content"> ${this.content} </slot>
        </div>
      </div>
    `}};
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
function Yo(t,e,r,o){var i,s=arguments.length,n=s<3?e:null===o?o=Object.getOwnPropertyDescriptor(e,r):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,r,o);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(n=(s<3?i(n):s>3?i(e,r,n):i(e,r))||n);return s>3&&n&&Object.defineProperty(e,r,n),n}function Xo(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Ko.styles=Wo,Pt([Jt(".tooltip-positioner")],Ko.prototype,"positioner",2),Pt([Jt(".tooltip")],Ko.prototype,"tooltip",2),Pt([Yt()],Ko.prototype,"content",2),Pt([Yt()],Ko.prototype,"placement",2),Pt([Yt({type:Boolean,reflect:!0})],Ko.prototype,"disabled",2),Pt([Yt({type:Number})],Ko.prototype,"distance",2),Pt([Yt({type:Boolean,reflect:!0})],Ko.prototype,"open",2),Pt([Yt({type:Number})],Ko.prototype,"skidding",2),Pt([Yt()],Ko.prototype,"trigger",2),Pt([Yt({type:Boolean})],Ko.prototype,"hoist",2),Pt([$e("open",{waitUntilFirstUpdate:!0})],Ko.prototype,"handleOpenChange",1),Pt([$e("placement"),$e("distance"),$e("skidding"),$e("hoist")],Ko.prototype,"handleOptionsChange",1),Pt([$e("content")],Ko.prototype,"handleContentChange",1),Pt([$e("disabled")],Ko.prototype,"handleDisabledChange",1),Ko=Pt([Wt("sl-tooltip")],Ko),co("tooltip.show",{keyframes:[{opacity:0,transform:"scale(0.8)"},{opacity:1,transform:"scale(1)"}],options:{duration:150,easing:"ease"}}),co("tooltip.hide",{keyframes:[{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.8)"}],options:{duration:150,easing:"ease"}});const Jo=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Zo=Symbol(),Qo=new Map;class ti{constructor(t,e){if(this._$cssResult$=!0,e!==Zo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=Qo.get(this.cssText);return Jo&&void 0===t&&(Qo.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const ei=t=>new ti("string"==typeof t?t:t+"",Zo),ri=(t,...e)=>{const r=1===t.length?t[0]:e.reduce(((e,r,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+t[o+1]),t[0]);return new ti(r,Zo)},oi=Jo?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return ei(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var ii;const si=window.trustedTypes,ni=si?si.emptyScript:"",ai=window.reactiveElementPolyfillSupport,li={toAttribute(t,e){switch(e){case Boolean:t=t?ni:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let r=t;switch(e){case Boolean:r=null!==t;break;case Number:r=null===t?null:Number(t);break;case Object:case Array:try{r=JSON.parse(t)}catch(t){r=null}}return r}},ci=(t,e)=>e!==t&&(e==e||t==t),di={attribute:!0,type:String,converter:li,reflect:!1,hasChanged:ci};class hi extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,r)=>{const o=this._$Eh(r,e);void 0!==o&&(this._$Eu.set(o,r),t.push(o))})),t}static createProperty(t,e=di){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const r="symbol"==typeof t?Symbol():"__"+t,o=this.getPropertyDescriptor(t,r,e);void 0!==o&&Object.defineProperty(this.prototype,t,o)}}static getPropertyDescriptor(t,e,r){return{get(){return this[e]},set(o){const i=this[t];this[e]=o,this.requestUpdate(t,i,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||di}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of e)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const t of r)e.unshift(oi(t))}else void 0!==t&&e.push(oi(t));return e}static _$Eh(t,e){const r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,r;(null!==(e=this._$Eg)&&void 0!==e?e:this._$Eg=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(r=t.hostConnected)||void 0===r||r.call(t))}removeController(t){var e;null===(e=this._$Eg)||void 0===e||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{Jo?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const r=document.createElement("style"),o=window.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=e.cssText,t.appendChild(r)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$ES(t,e,r=di){var o,i;const s=this.constructor._$Eh(t,r);if(void 0!==s&&!0===r.reflect){const n=(null!==(i=null===(o=r.converter)||void 0===o?void 0:o.toAttribute)&&void 0!==i?i:li.toAttribute)(e,r.type);this._$Ei=t,null==n?this.removeAttribute(s):this.setAttribute(s,n),this._$Ei=null}}_$AK(t,e){var r,o,i;const s=this.constructor,n=s._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=s.getPropertyOptions(n),a=t.converter,l=null!==(i=null!==(o=null===(r=a)||void 0===r?void 0:r.fromAttribute)&&void 0!==o?o:"function"==typeof a?a:null)&&void 0!==i?i:li.fromAttribute;this._$Ei=n,this[n]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,r){let o=!0;void 0!==t&&(((r=r||this.constructor.getPropertyOptions(t)).hasChanged||ci)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===r.reflect&&this._$Ei!==t&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(t,r))):o=!1),!this.isUpdatePending&&o&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const r=this._$AL;try{e=this.shouldUpdate(r),e?(this.willUpdate(r),null===(t=this._$Eg)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(r)):this._$EU()}catch(t){throw e=!1,this._$EU(),t}e&&this._$AE(r)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Eg)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){void 0!==this._$E_&&(this._$E_.forEach(((t,e)=>this._$ES(e,this[e],t))),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ui;hi.finalized=!0,hi.elementProperties=new Map,hi.elementStyles=[],hi.shadowRootOptions={mode:"open"},null==ai||ai({ReactiveElement:hi}),(null!==(ii=globalThis.reactiveElementVersions)&&void 0!==ii?ii:globalThis.reactiveElementVersions=[]).push("1.2.2");const pi=globalThis.trustedTypes,gi=pi?pi.createPolicy("lit-html",{createHTML:t=>t}):void 0,bi=`lit$${(Math.random()+"").slice(9)}$`,fi="?"+bi,mi=`<${fi}>`,vi=document,yi=(t="")=>vi.createComment(t),wi=t=>null===t||"object"!=typeof t&&"function"!=typeof t,_i=Array.isArray,$i=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xi=/-->/g,ki=/>/g,Ci=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Ai=/'/g,Ei=/"/g,Si=/^(?:script|style|textarea|title)$/i,Mi=(t=>(e,...r)=>({_$litType$:t,strings:e,values:r}))(1),Ti=Symbol.for("lit-noChange"),Oi=Symbol.for("lit-nothing"),zi=new WeakMap,Li=vi.createTreeWalker(vi,129,null,!1),Pi=(t,e)=>{const r=t.length-1,o=[];let i,s=2===e?"<svg>":"",n=$i;for(let e=0;e<r;e++){const r=t[e];let a,l,c=-1,d=0;for(;d<r.length&&(n.lastIndex=d,l=n.exec(r),null!==l);)d=n.lastIndex,n===$i?"!--"===l[1]?n=xi:void 0!==l[1]?n=ki:void 0!==l[2]?(Si.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=Ci):void 0!==l[3]&&(n=Ci):n===Ci?">"===l[0]?(n=null!=i?i:$i,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?Ci:'"'===l[3]?Ei:Ai):n===Ei||n===Ai?n=Ci:n===xi||n===ki?n=$i:(n=Ci,i=void 0);const h=n===Ci&&t[e+1].startsWith("/>")?" ":"";s+=n===$i?r+mi:c>=0?(o.push(a),r.slice(0,c)+"$lit$"+r.slice(c)+bi+h):r+bi+(-2===c?(o.push(void 0),e):h)}const a=s+(t[r]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==gi?gi.createHTML(a):a,o]};class Di{constructor({strings:t,_$litType$:e},r){let o;this.parts=[];let i=0,s=0;const n=t.length-1,a=this.parts,[l,c]=Pi(t,e);if(this.el=Di.createElement(l,r),Li.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(o=Li.nextNode())&&a.length<n;){if(1===o.nodeType){if(o.hasAttributes()){const t=[];for(const e of o.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(bi)){const r=c[s++];if(t.push(e),void 0!==r){const t=o.getAttribute(r.toLowerCase()+"$lit$").split(bi),e=/([.?@])?(.*)/.exec(r);a.push({type:1,index:i,name:e[2],strings:t,ctor:"."===e[1]?Ni:"?"===e[1]?Hi:"@"===e[1]?Fi:Ii})}else a.push({type:6,index:i})}for(const e of t)o.removeAttribute(e)}if(Si.test(o.tagName)){const t=o.textContent.split(bi),e=t.length-1;if(e>0){o.textContent=pi?pi.emptyScript:"";for(let r=0;r<e;r++)o.append(t[r],yi()),Li.nextNode(),a.push({type:2,index:++i});o.append(t[e],yi())}}}else if(8===o.nodeType)if(o.data===fi)a.push({type:2,index:i});else{let t=-1;for(;-1!==(t=o.data.indexOf(bi,t+1));)a.push({type:7,index:i}),t+=bi.length-1}i++}}static createElement(t,e){const r=vi.createElement("template");return r.innerHTML=t,r}}function Ui(t,e,r=t,o){var i,s,n,a;if(e===Ti)return e;let l=void 0!==o?null===(i=r._$Cl)||void 0===i?void 0:i[o]:r._$Cu;const c=wi(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(t),l._$AT(t,r,o)),void 0!==o?(null!==(n=(a=r)._$Cl)&&void 0!==n?n:a._$Cl=[])[o]=l:r._$Cu=l),void 0!==l&&(e=Ui(t,l._$AS(t,e.values),l,o)),e}class Bi{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:r},parts:o}=this._$AD,i=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:vi).importNode(r,!0);Li.currentNode=i;let s=Li.nextNode(),n=0,a=0,l=o[0];for(;void 0!==l;){if(n===l.index){let e;2===l.type?e=new Ri(s,s.nextSibling,this,t):1===l.type?e=new l.ctor(s,l.name,l.strings,this,t):6===l.type&&(e=new Vi(s,this,t)),this.v.push(e),l=o[++a]}n!==(null==l?void 0:l.index)&&(s=Li.nextNode(),n++)}return i}m(t){let e=0;for(const r of this.v)void 0!==r&&(void 0!==r.strings?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class Ri{constructor(t,e,r,o){var i;this.type=2,this._$AH=Oi,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=o,this._$Cg=null===(i=null==o?void 0:o.isConnected)||void 0===i||i}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Ui(this,t,e),wi(t)?t===Oi||null==t||""===t?(this._$AH!==Oi&&this._$AR(),this._$AH=Oi):t!==this._$AH&&t!==Ti&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return _i(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.A(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==Oi&&wi(this._$AH)?this._$AA.nextSibling.data=t:this.S(vi.createTextNode(t)),this._$AH=t}T(t){var e;const{values:r,_$litType$:o}=t,i="number"==typeof o?this._$AC(t):(void 0===o.el&&(o.el=Di.createElement(o.h,this.options)),o);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===i)this._$AH.m(r);else{const t=new Bi(i,this),e=t.p(this.options);t.m(r),this.S(e),this._$AH=t}}_$AC(t){let e=zi.get(t.strings);return void 0===e&&zi.set(t.strings,e=new Di(t)),e}A(t){_i(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,o=0;for(const i of t)o===e.length?e.push(r=new Ri(this.M(yi()),this.M(yi()),this,this.options)):r=e[o],r._$AI(i),o++;o<e.length&&(this._$AR(r&&r._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var r;for(null===(r=this._$AP)||void 0===r||r.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class Ii{constructor(t,e,r,o,i){this.type=1,this._$AH=Oi,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=i,r.length>2||""!==r[0]||""!==r[1]?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Oi}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,r,o){const i=this.strings;let s=!1;if(void 0===i)t=Ui(this,t,e,0),s=!wi(t)||t!==this._$AH&&t!==Ti,s&&(this._$AH=t);else{const o=t;let n,a;for(t=i[0],n=0;n<i.length-1;n++)a=Ui(this,o[r+n],e,n),a===Ti&&(a=this._$AH[n]),s||(s=!wi(a)||a!==this._$AH[n]),a===Oi?t=Oi:t!==Oi&&(t+=(null!=a?a:"")+i[n+1]),this._$AH[n]=a}s&&!o&&this.k(t)}k(t){t===Oi?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Ni extends Ii{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===Oi?void 0:t}}const ji=pi?pi.emptyScript:"";class Hi extends Ii{constructor(){super(...arguments),this.type=4}k(t){t&&t!==Oi?this.element.setAttribute(this.name,ji):this.element.removeAttribute(this.name)}}class Fi extends Ii{constructor(t,e,r,o,i){super(t,e,r,o,i),this.type=5}_$AI(t,e=this){var r;if((t=null!==(r=Ui(this,t,e,0))&&void 0!==r?r:Oi)===Ti)return;const o=this._$AH,i=t===Oi&&o!==Oi||t.capture!==o.capture||t.once!==o.once||t.passive!==o.passive,s=t!==Oi&&(o===Oi||i);i&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,r;"function"==typeof this._$AH?this._$AH.call(null!==(r=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==r?r:this.element,t):this._$AH.handleEvent(t)}}class Vi{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){Ui(this,t)}}const qi=window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Gi,Wi;null==qi||qi(Di,Ri),(null!==(ui=globalThis.litHtmlVersions)&&void 0!==ui?ui:globalThis.litHtmlVersions=[]).push("2.1.3");class Ki extends hi{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const r=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=r.firstChild),r}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,r)=>{var o,i;const s=null!==(o=null==r?void 0:r.renderBefore)&&void 0!==o?o:e;let n=s._$litPart$;if(void 0===n){const t=null!==(i=null==r?void 0:r.renderBefore)&&void 0!==i?i:null;s._$litPart$=n=new Ri(e.insertBefore(yi(),t),t,void 0,null!=r?r:{})}return n._$AI(t),n})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return Ti}}Ki.finalized=!0,Ki._$litElement$=!0,null===(Gi=globalThis.litElementHydrateSupport)||void 0===Gi||Gi.call(globalThis,{LitElement:Ki});const Yi=globalThis.litElementPolyfillSupport;null==Yi||Yi({LitElement:Ki}),(null!==(Wi=globalThis.litElementVersions)&&void 0!==Wi?Wi:globalThis.litElementVersions=[]).push("3.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Xi=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:r,elements:o}=e;return{kind:r,elements:o,finisher(e){window.customElements.define(t,e)}}})(t,e)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,Ji=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(r){r.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(r){r.createProperty(e.key,t)}};function Zi(t){return(e,r)=>void 0!==r?((t,e,r)=>{e.constructor.createProperty(r,t)})(t,e,r):Ji(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var Qi;null===(Qi=window.HTMLSlotElement)||void 0===Qi||Qi.prototype.assignedElements;const ts=ri`
* { box-sizing: border-box; }

h1, h2, h3, h4, p {
	margin: 0;
	margin-bottom: 0.5rem; }
p:last-child {
	margin-bottom: 0; }
`,es=ri`
:host {
	height: 100vw; width: 100%;
	display: flex; flex-direction: column; gap: 1rem;
}
.centre {
	margin-left: auto; margin-right: auto; }
`;let rs=class extends Ki{static get styles(){return[ts,es]}render(){return Mi`
<top-bar></top-bar>

<div class="centre" style="display: inline-flex; gap: 2rem;">
	<mode-theme-type></mode-theme-type>
	<mode-contrast-body></mode-contrast-body>
	<mode-contrast-panel></mode-contrast-panel>
	<mode-contrast-text></mode-contrast-text>
</div>

<tab-colour-editor-group class="centre"></tab-colour-editor-group>

<card-group class="centre"></card-group>
`}};rs=Yo([Xi("app-root")],rs);
/* @License
    Gradients css copied from Open Props "props.gradients.css"
    https://github.com/argyleink/open-props
    Copyright Adam Argyle 2021
    Licensed under MIT
    TODO replace most of these with good customization tooling
*/
const os=ri`
:host {
	--gradient-1: linear-gradient(to bottom right,#1f005c, #5b0060, #870160, #ac255e, #ca485c, #e16b5c, #f39060, #ffb56b);
	--gradient-2: linear-gradient(to bottom right,#48005c, #8300e2, #a269ff);
	--gradient-3:
		radial-gradient(
			circle at top right,
			hsl(180 100% 50%), hsl(180 100% 50% / 0%)
		),
		radial-gradient(
			circle at bottom left,
			hsl(328 100% 54%), hsl(328 100% 54% / 0%)
		);
	--gradient-4: linear-gradient(to bottom right,#00F5A0,#00D9F5);
	--gradient-5: conic-gradient(from -270deg at 75% 110%, fuchsia, floralwhite);
	--gradient-6: conic-gradient(from -90deg at top left, black, white);
	--gradient-7: linear-gradient(to bottom right,#72C6EF,#004E8F);
	--gradient-8: conic-gradient(from 90deg at 50% 0%, #111, 50%, #222, #111);
	--gradient-9: conic-gradient(from .5turn at bottom center, lightblue, white);
	--gradient-10: conic-gradient(from 90deg at 40% -25%, #ffd700, #f79d03, #ee6907, #e6390a, #de0d0d, #d61039, #cf1261, #c71585, #cf1261, #d61039, #de0d0d, #ee6907, #f79d03, #ffd700, #ffd700, #ffd700);
	--gradient-11: conic-gradient(at bottom left, deeppink, cyan);
	--gradient-12: conic-gradient(from 90deg at 25% -10%, #ff4500, #d3f340, #7bee85, #afeeee, #7bee85);
	--gradient-13: radial-gradient(circle at 50% 200%, #000142, #3b0083, #b300c3, #ff059f, #ff4661, #ffad86, #fff3c7);
	--gradient-14: conic-gradient(at top right, lime, cyan);
	--gradient-15: linear-gradient(to bottom right, #c7d2fe, #fecaca, #fef3c7);
	--gradient-16: radial-gradient(circle at 50% -250%, #374151, #111827, #000);
	--gradient-17: conic-gradient(from -90deg at 50% -25%, blue, blueviolet);
	--gradient-18:
		linear-gradient(0deg,   hsla(0   100% 50% / 80%), hsla(0   100% 50% / 0) 75%),
		linear-gradient(60deg,  hsla(60  100% 50% / 80%), hsla(60  100% 50% / 0) 75%),
		linear-gradient(120deg, hsla(120 100% 50% / 80%), hsla(120 100% 50% / 0) 75%),
		linear-gradient(180deg, hsla(180 100% 50% / 80%), hsla(180 100% 50% / 0) 75%),
		linear-gradient(240deg, hsla(240 100% 50% / 80%), hsla(240 100% 50% / 0) 75%),
		linear-gradient(300deg, hsla(300 100% 50% / 80%), hsla(300 100% 50% / 0) 75%);
	--gradient-19: linear-gradient(to bottom right,#ffe259,#ffa751);
	--gradient-20: conic-gradient(from -135deg at -10% center, #ffa500, #ff7715, #ff522a, #ff3f47, #ff5482, #ff69b4);
	--gradient-21: conic-gradient(from -90deg at 25% 115%, #ff0000, #ff0066, #ff00cc, #cc00ff, #6600ff, #0000ff, #0000ff, #0000ff, #0000ff);
	--gradient-22: linear-gradient(to bottom right,#acb6e5,#86fde8);
	--gradient-23: linear-gradient(to bottom right,#536976,#292E49);
	--gradient-24: conic-gradient(from .5turn at 0% 0%, #00c476, 10%, #82b0ff, 90%, #00c476);
	--gradient-25: conic-gradient(at 125% 50%, #b78cf7, #ff7c94, #ffcf0d, #ff7c94, #b78cf7);
	--gradient-26: linear-gradient(to bottom right,#9796f0,#fbc7d4);
	--gradient-27: conic-gradient(from .5turn at bottom left, deeppink, rebeccapurple);
	--gradient-28: conic-gradient(from -90deg at 50% 105%, white, orchid);
	--gradient-29:
		radial-gradient(
			circle at top right,
			hsl(250 100% 85%), hsl(250 100% 85% / 0%)
		),
		radial-gradient(
			circle at bottom left,
			hsl(220 90% 75%), hsl(220 90% 75% / 0%)
		);
	--gradient-30: radial-gradient(
			circle at top right,
			hsl(150 100% 50%), hsl(150 100% 50% / 0%)
		),
		radial-gradient(
			circle at bottom left,
			hsl(150 100% 84%), hsl(150 100% 84% / 0%)
		);
}
`,is=ri`
:host {
	display: flex; flex-direction: column; gap: 2rem;
}

sl-card {
	flex: 1 0 15rem; max-width: 25rem; }

sl-card {
	--border-radius: var(--sl-border-radius-large);
	--gradientDegree: 135deg;
}

sl-card:is(.subtle,.outline) {
	--svg-fill: url(#global-svg-gradient);
	--start: 52, 86%, 54%;
	--end: 9, 100%, 67%;
	--alpha: 20%;
	--hsl-start: hsl(var(--start));
	--hsl-end: hsl(var(--end));
	--hsla-start: hsla(var(--start), var(--alpha));
	--hsla-end: hsla(var(--end), var(--alpha));
}

sl-card:is(.subtle,.outline) :is(h1,h2,h3,h4,strong) {
	color: transparent;
	background: linear-gradient(var(--gradientDegree),var(--hsl-start) 0,var(--hsl-end) 100%);
	background-clip: text;
	-webkit-background-clip: text;
}

sl-card.subtle::part(base) {
	box-shadow: 1px 2px 4px 0 var(--hsla-start), 4px 8px 14px 2px var(--hsla-end);
}

sl-card.outline {
	height: fit-content;
	border-radius: var(--border-radius);
	padding: var(--sl-spacing-2x-small);
	background-image: var(--gradient-1);
}
sl-card.outline::part(base) {
	border: none;
}

sl-card.decorative::part(base) {
	color: var(--sl-color-neutral-1000);
	/* TODO replace this before enabling exports. I don't have copyright for the image. */
	background-image: url("/Aurora.jpg");
	background-size: cover;
}
`;let ss=class extends Ki{static get styles(){return[ts,is,os]}render(){const t=()=>Mi`<p>Lorem ipsum dolor sit amet, consectetur <strong>adipiscing elit</strong>, sed do eiusmod <strong>tempor incididunt</strong> ut labore et dolore magna aliqua.</p>`;return Mi`
<div style="width: 100%">
Card theming not yet implemented. Coming soon!
</div>

<div style="display: inline-flex; gap: 2rem; flex-wrap: wrap;">
	<sl-card class="subtle">
		<div slot="header" style="display: flex; align-items: center;">
			<h4 style="flex-grow: 1;">Subtle</h4>
			<sl-tooltip content="Default card type, providing a high-contrast background. May contain a stretched image. Themes may apply a box shadow.">
				<sl-icon name="info" library="fa"
					style="font-size: var(--sl-font-size-large);"
				></sl-icon>
			</sl-tooltip>
		</div>
		${t()}
	</sl-card>

	<sl-card class="outline">
		<div slot="header" style="display: flex; align-items: center;">
			<h4 style="flex-grow: 1;">Outline</h4>
			<sl-tooltip content="Replaces the box shadow with a border. May apply fancier text/icon colour.">
				<sl-icon name="info" library="fa"
					style="font-size: var(--sl-font-size-large);"
				></sl-icon>
			</sl-tooltip>
		</div>
		${t()}
	</sl-card>

	<sl-card class="decorative">
		<div slot="header" style="display: flex; align-items: center;">
			<h4 style="flex-grow: 1;">Decorative</h4>
			<sl-tooltip content="Low-contrast background. Themes may decorate with gradients, transparency effects, etc. Themes should darken the centre to improve text contrast.">
				<sl-icon name="info" library="fa"
					style="font-size: var(--sl-font-size-large);"
				></sl-icon>
			</sl-tooltip>
		</div>
		${t()}
	</sl-card>
</div>
`}};ss=Yo([Xi("card-group")],ss);
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
const{abs:ns,atan2:as,cos:ls,floor:cs,log:ds,min:hs,max:us,round:ps,sign:gs,sin:bs,sqrt:fs,cbrt:ms,PI:vs,hypot:ys}=Math;function ws(t,e,r){return t+(e-t)*r}function _s(t,e=0,r=1){return t<e?e:t>r?r:t}function $s(t,e,r,o=1e-8){let i,s=e;for(;r--&&ns(i=t(s))>o;){const e=(t(s+o)-i)/o;console.log("fx / dfdx",i/e,"fx",i,"x",s),s-=i/e}return s}const xs=vs/180,ks=180/vs;function Cs(...t){return t[0]instanceof As?t[0]:t.length>1&&"string"==typeof t[t.length-1]?Fs(t.slice(0,t.length-1),t[t.length-1]):Array.isArray(t[0])?Fs(t[0]):Fs(t)}class As{constructor(t,e,r,o=1){this.r=t,this.g=e,this.b=r,this.a=o}mix(t,e,r="rgb"){return Os(this,t,e,r)}rgb(t=!0,e=!0){const r=r=>(t&&(r=ps(r)),e&&(r=_s(r,0,255)),r),{r:o,g:i,b:s}=this;return[r(o),r(i),r(s)]}rgba(t=!0,e=!0){const r=r=>(t&&(r=ps(r)),e&&(r=_s(r,0,255)),r),{r:o,g:i,b:s,a:n}=this;return[r(o),r(i),r(s),n]}hex(t="rgb"){const{r:e,g:r,b:o,a:i}=this;return function(t,e,r,o,i="rgb"){t=_s(ps(t),0,255),e=_s(ps(e),0,255),r=_s(ps(r),0,255);const s=(t<<16|e<<8|r).toString(16).padStart(6,"0"),n=ps(255*_s(o)).toString(16).padStart(2,"0");return"#"+("argb"==i?n+s:"rgba"==i?s+n:s)}(e,r,o,i,t)}hsl(){const{r:t,g:e,b:r}=this;return function(t,e,r){const[o,i,s]=sn(t/255,e/255,r/255),n=(s+i)/2;let a;a=s==i?0:n<.5?(s-i)/(s+i):(s-i)/(2-s-i);return[o,a,n]}(t,e,r)}hsv(){const{r:t,g:e,b:r}=this;return function(t,e,r){const[o,i,s]=sn(t,e,r),n=s-i;return[o,0==s?0:n/s,s/255]}(t,e,r)}hcg(){const{r:t,g:e,b:r}=this;return function(t,e,r){const[o,i,s]=sn(t,e,r),n=(s-i)/255;return[o,n,n<1?i/255/(1-n):0]}(t,e,r)}css(t="rgb"){if("rgb"==t){const{r:t,g:e,b:r,a:o}=this;return function(t,e,r,o=1){return o>=1?"rgb("+[t,e,r].map(ps).join(",")+")":"rgba("+[t,e,r].map(ps).join(",")+","+o+")"}(t,e,r,o)}if("hsl"==t)return function([t,e,r],o){const i=o<1?"hsla":"hsl";return i+"("+en(t)+","+en(100*e)+"%,"+en(100*r)+"%"+("hsla"==i?","+en(o):"")+")"}(this.hsl(),this.alpha());throw new Error}name(t=!1){const e=this.num(),r=Object.keys(Ts).find((t=>Ts[t]==e));if(!r&&t){const[t,e,r]=this.lab();return function(t,e){return t[yn(t,e)]}(Object.keys(Ts),(o=>{const[i,s,n]=Ps(Ts[o]).lab();return-ys(t-i,e-s,r-n)}))}return r}cmyk(){const{r:t,g:e,b:r}=this;return function(t,e,r){const o=1-us(t/=255,e/=255,r/=255);if(1==o)return[0,0,0,1];return[(1-t-o)/(1-o),(1-e-o)/(1-o),(1-r-o)/(1-o),o]}(t,e,r)}gl(){const{r:t,g:e,b:r,a:o}=this;return[t/255,e/255,r/255,o]}luminance(t){const{r:e,g:r,b:o,a:i}=this,[,s]=mn(e,r,o);if(void 0===t)return s;const n=(t,e,r)=>(r-t)/(e-t);return t>s?Os(this,Ss,n(s,1,t),"xyz").alpha(i):Os(Es,this,n(0,s,t),"xyz").alpha(i)}temperature(){const{r:t,g:e,b:r}=this;return o=t,i=e,s=r,console.log(s-o),i+s<158.61?(console.log("0 < t < 20"),ps(100*$s((t=>i-(-155.25485562709179-.44596950469579133*(t-2)+104.49216199393888*ds(t-2))),15,4))):s-o<0?(console.log("20 < t < 66"),ps(100*$s((t=>s-(.8274096064007395*(t-10)-254.76935184120902+115.67994401066147*ds(t-10))),43,4))):(console.log("0 < t < 400, start= "+(-1.4*(o+i)+755)),ps(100*$s((t=>o-(351.97690566805693+.114206453784165*(t-55)-40.25366309332127*ds(t-55))),-1.4*(o+i)+755,8)));var o,i,s}set(t,e){const[r,o]=t.split("."),i=this[r](),s=r.indexOf(o);if(-1==s)throw new Error("invalid channel");return i[s]="number"==typeof e?e:e(i[s]),Cs(i,r).alpha(this.a)}clipped(){const{r:t,g:e,b:r}=this;return!(0<=t&&t<=255&&0<=e&&e<=255&&0<=r&&r<=255)}textColor(){return this.luminance()>.5?Es:Ss}alpha(t){if(void 0===t)return this.a;const{r:e,g:r,b:o}=this;return Ds(e,r,o,t)}darker(t=1){const[e,r,o]=this.lab();return function(...t){return Fs(t,"lab")}(e-cn*t,r,o,this.alpha())}brighter(t=1){return this.darker(-t)}saturate(t=1){const[e,r,o]=this.lch();return zs(e,us(0,r+t*cn),o,this.alpha())}desaturate(t=1){return this.saturate(-t)}premultiplied(){const{r:t,g:e,b:r,a:o}=this;return Ds(t*o,e*o,r*o,o)}hsi(){const{r:t,g:e,b:r}=this;return function(t,e,r){const o=t/255,i=e/255,s=r/255,n=(o+i+s)/3;if(o==i&&i==s)return[0,0,n];{const t=.5*(2*o-i-s),e=fs(3)/2*(i-s),r=as(e,t),a=hs(o,i,s);return[(r<0?2*vs+r:r)*ks,1-a/n,n]}}(t,e,r)}lab(){const{r:t,g:e,b:r}=this;return fn(t,e,r)}num(t="rgb"){const{r:e,g:r,b:o,a:i}=this;return function(t,e,r,o=1,i="rgb"){const s=ps(t)<<16|ps(e)<<8|ps(r);return"rgb"===i?s:"rgba"===i?s<<8|ps(255*o)<<24:ps(255*o)<<24|s}(e,r,o,i,t)}lch(){const{r:t,g:e,b:r}=this;return function(t,e,r){const[o,i,s]=fn(t,e,r);return function(t,e,r){const o=ys(e,r),i=(as(r,e)*ks+360)%360;return[t,o,i]}(o,i,s)}(t,e,r)}xyz(){const{r:t,g:e,b:r}=this;return mn(t,e,r)}equals(t){const{r:e,g:r,b:o,a:i}=this,{r:s,g:n,b:a,a:l}=t;return e==s&&r==n&&o==a&&i==l}hashCode(){return this.num("rgba")}toSource(){const{r:t,g:e,b:r,a:o}=this;return"chroma.rgb("+t+", "+e+", "+r+(1===o?")":", "+o+")")}}As.prototype.toString=As.prototype.css,As.prototype.kelvin=As.prototype.temperature;const Es=new As(0,0,0,1),Ss=new As(255,255,255,1),Ms={OrRd:[16775148,16705736,16635038,16628612,16551257,15689032,14102559,11730944,8323072],PuBu:[16775163,15525874,13685222,10927579,7645647,3576e3,356528,285325,145496],BuPu:[16252157,14740724,12571622,10403034,9213638,9202609,8929693,8458108,5046347],Oranges:[16774635,16705230,16634018,16625259,16616764,15821075,14239745,10892803,8333060],BuGn:[16252157,15070713,13429990,10082505,6734500,4304502,2329413,27948,17435],YlOrBr:[16777189,16775100,16704401,16696399,16685353,15495188,13388802,10040324,6694150],YlGn:[16777189,16252089,14282915,11394446,7915129,4303709,2327619,26679,17705],Reds:[16774640,16703698,16563105,16552562,16476746,15678252,13309981,10817301,6750221],RdPu:[16775155,16638173,16565696,16424885,16214177,14496919,11403646,7995767,4784234],Greens:[16252149,15070688,13101504,10607003,7652470,4303709,2329413,27948,17435],YlGnBu:[16777177,15595697,13101492,8375739,4306628,1937856,2252456,2438292,531800],Purples:[16579581,15724021,14342891,12369372,10394312,8420794,6967715,5515151,4128893],GnBu:[16252144,14742491,13429701,11066805,8113348,5157843,2854078,551084,540801],Greys:[16777215,15790320,14277081,12434877,9868950,7566195,5395026,2434341,0],YlOrRd:[16777164,16772512,16701814,16691788,16616764,16535082,14883356,12386342,8388646],PuRd:[16250105,15196655,13941210,13210823,14640560,15149450,13505110,9961539,6750239],Blues:[16251903,14609399,13032431,10406625,7057110,4362950,2191797,545180,536683],PuBuGn:[16775163,15524592,13685222,10927579,6793679,3576e3,164234,93273,83510],Viridis:[4456788,4728695,4147850,3237774,2524047,2071946,7130714,11984427,16705573],Spectral:[10355010,13975119,16018755,16625249,16703627,16777151,15136152,11263396,6734501,3311805,6180770],RdYlGn:[10813478,14102567,16018755,16625249,16703627,16777151,14282635,10934634,6733155,1742928,26679],RdBu:[6750239,11671595,14049357,16033154,16636871,16250871,13755888,9618910,4428739,2188972,340065],PiYG:[9306450,12917629,14579630,15840986,16638191,16250871,15136208,12116358,8371265,5083681,2581529],PRGn:[4194379,7744131,10055851,12756431,15193320,16250871,14282963,10935200,5942881,1800247,17435],RdYlBu:[10813478,14102567,16018755,16625249,16703632,16777151,14742520,11262441,7646673,4552116,3225237],BrBG:[5517317,9195786,12550445,14664317,16181443,16119285,13101797,8441281,3512207,91742,15408],RdGy:[6750239,11671595,14049357,16033154,16636871,16777215,14737632,12237498,8882055,5066061,1710618],PuOr:[8338184,11753478,14713364,16627811,16703670,16250871,14211819,11709394,8418220,5515144,2949195],Set2:[6734501,16551266,9281739,15174339,10934356,16767279,15058068,11776947],Accent:[8374655,12496596,16629894,16777113,3697840,15729279,12540695,6710886],Set1:[14948892,3636920,5091146,9981603,16744192,16777011,10901032,16220607,10066329],Set3:[9294791,16777139,12499674,16482418,8434131,16626786,11787881,16567781,14277081,12353725,13429701,16772463],Dark2:[1810039,14245634,7696563,15149450,6727198,15117058,10909213,6710886],Paired:[10931939,2062516,11722634,3383340,16489113,14883356,16629615,16744192,13284054,6962586,16777113,11622696],Pastel2:[11789005,16633260,13358568,16042724,15136201,16773806,15852236,13421772],Pastel1:[16495790,11783651,13429701,14601188,16701862,16777164,15063229,16636652,15921906]},Ts={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflower:6591981,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,laserlemon:16777044,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrod:16448210,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,maroon2:8323072,maroon3:11546720,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,purple2:8323199,purple3:10494192,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function Os(t,e,r=.5,o="rgb"){const i=Cs(t),s=Cs(e),n=js[o]&&js[o](i,s,r,o);if(!n)throw new Error("color mode "+o+" is not supported");return n.alpha(ws(i.alpha(),s.alpha(),r))}function zs(...t){return Fs(t,"lch")}function Ls(...t){return Fs(t,"hsl")}function Ps(t){const[e,r,o]=Gs(t);return new As(e,r,o)}function Ds(...t){return Fs(t,"rgb")}function Us(...t){const e=t=>e._at(t);return Object.getOwnPropertyNames(Bs.prototype).forEach((t=>e[t]=Bs.prototype[t])),Array.isArray(t[0])&&(t=t[0]),1==t.length&&"string"==typeof t[0]&&(t=Ms[t[0]]),e._init("function"==typeof t[0]?t[0]:t.map((t=>Cs(t)))),e}class Bs{classes(t){if(void 0===t)return this._classes;if(Array.isArray(t))this._classes=t,this.domain(t[0],t[t.length-1]);else{if(t%1!=0||t<1)throw new Error("invalid classes param");this._classes=Ns(this.domain(),"e",t)}return this}domain(...t){if(void 0===t[0])return"function"!=typeof this._colors?this._pos.map((t=>ws(this._min,this._max,t))):[this._min,this._max];if(this._min=t[0],this._max=t[t.length-1],2==t.length)"function"!=typeof this._colors&&(this._pos=this._colors.map(((t,e)=>e/(this._colors.length-1))));else{if("function"==typeof this._colors||t.length!=this._colors.length)throw new Error("invalid domain "+t);this._pos=t.map((t=>function(t,e,r){return(r-t)/(e-t)}(this._min,this._max,t)))}return this}mode(t){return void 0===t?this._mode:(this._mode=t,this._resetCache(),this)}out(t){return this._out=t,this}correctLightness(t=!0){if(this._correctLightness!=t){this._resetCache();const e=this._colors;if(t&&"function"!=typeof e){let t=0;for(let r=1;r<e.length;r++){const o=e[r].lab()[0]-e[r-1].lab()[0];if(0==t)t=o;else if(t*o<0)throw new Error("scale color lightnesses must be monotonic")}}}return this._correctLightness=t,this}padding(t,e=t){return t?(this._paddingLeft=t,this._paddingRight=e,this):[this._paddingLeft,this._paddingRight]}colors(t,e="hex"){let r;if(void 0===t)r=this._colors.slice();else if(1==t)r=[this._color((this._min+this._max)/2)];else if(t>1)r=Array.from({length:t},((e,r)=>this._color(ws(this._min,this._max,r/(t-1)))));else{let t;t=this._classes&&this._classes.length>2?Array.from({length:this._classes.length-1},((t,e)=>.5*(this._classes[e]+this._classes[e+1]))):this.domain(),r=t.map((t=>this._color(t)))}return"color"!=e?r.map((t=>t[e]())):r}cache(t){return void 0===t?!!this._cache:(this._cache=t?this._cache||new Map:void 0,this)}gamma(t){return void 0===t?this._gamma:(this._gamma=t,this)}_at(t){const e=this._color(t);return this._out?e[this._out]():e}_init(t){this._colors=t,"function"!=typeof t&&(this._pos=t.map(((e,r)=>r/(t.length-1)))),this._mode="rgb",this.domain(0,1),this._paddingLeft=0,this._paddingRight=0,this._correctLightness=!1,this._cache=new Map,this._gamma=1}_getClass(t){return this._classes.findIndex((e=>t<=e))-1}_color(t,e=!1){let r;if(e)r=t;else{const e=this._min,o=this._max;if(this._classes&&this._classes.length>2){r=this._getClass(t)/(this._classes.length-2)}else r=o!==e?(t-e)/(o-e):1;this._correctLightness&&(r=this._tCorrectedLightness(r))}r=r**this._gamma,r=(this._paddingLeft+r)/(1+this._paddingLeft+this._paddingRight),r=_s(r,0,1);const o=r,i=this._cache&&this._cache.get(o);if(i)return i;{let t;if(Array.isArray(this._colors))for(let e=0;e<this._pos.length;e++){const o=this._pos[e];if(r<=o){t=this._colors[e];break}if(r>=o&&e==this._pos.length-1){t=this._colors[e];break}if(r>o&&r<this._pos[e+1]){r=(r-o)/(this._pos[e+1]-o),t=Os(this._colors[e],this._colors[e+1],r,this._mode);break}}else t=this._colors(r);return this._cache&&this._cache.set(o,t),t}}_tCorrectedLightness(t){const e=ws(this._color(0,!0).lab()[0],this._color(1,!0).lab()[0],t);return function(t,e,r,o){let i=t(e);for(;o--;){const o=(e+r)/2,s=t(o);gs(i)==gs(s)?(e=o,i=s):r=o}return(e+r)/2}((t=>this._color(t,!0).lab()[0]-e),0,1,8)}_resetCache(){this._cache&&this._cache.clear()}}var Rs;function Is(t){const e={min:1/0,max:-1/0,sum:0,values:[],count:0};return t.forEach((t=>function(t){null==t||isNaN(t)||(e.values.push(t),e.sum+=t,t<e.min&&(e.min=t),t>e.max&&(e.max=t),e.count+=1)}(t))),e.domain=[e.min,e.max],e.limits=function(t,e){return Ns(this,t,e)},e}function Ns(t,e="e",r=7){const o=Array.isArray(t)?Is(t):t,{min:i,max:s,values:n}=o;if(n.sort(((t,e)=>t-e)),1==r)return[i,s];if(e.startsWith("c"))return[i,s];if(e.startsWith("e"))return Array.from({length:r+1},((t,e)=>ws(i,s,e/r)));if(e.startsWith("l")){if(i<=0)throw new Error("Logarithmic scales are only possible for values > 0");const t=Math.LOG10E*ds(i),e=Math.LOG10E*ds(s);return Array.from({length:r+1},((o,i)=>10**ws(t,e,i/r)))}if(e.startsWith("q"))return Array.from({length:r+1},((t,e)=>{const o=(n.length-1)*e/r,i=cs(o);return i==o?n[i]:ws(n[i],n[i+1],o-i)}));if(e.startsWith("k")){const t=n.length,e=new Array(t),o=new Array(r);let a=!0,l=0,c=Array.from({length:r+1},((t,e)=>ws(i,s,e/r)));do{o.fill(0);for(let t=0;t<n.length;t++){const r=n[t],i=yn(c,(t=>-ns(t-r)));o[i]++,e[t]=i}const t=new Array(r).fill(0);for(let r=0;r<e.length;r++){t[e[r]]+=n[r]}for(let e=0;e<t.length;e++)t[e]/=o[e];a=t.some(((t,e)=>t!=c[e])),c=t}while(l++<200&&a);const d=Array.from({length:r},(()=>[]));for(let t=0;t<e.length;t++){d[e[t]].push(n[t])}const h=[];for(const t of d)h.push(t[0],t[t.length-1]);h.sort(((t,e)=>t-e));const u=[];u.push(h[0]);for(let t=1;t<h.length;t+=2){const e=h[t];isNaN(e)||-1!=u.indexOf(e)||u.push(e)}return u}throw new Error("unknown mode")}!function(t){t.cool=function(){return Us([Ls(180,1,.9),Ls(250,.7,.4)])},t.hot=function(){return Us(["#000","#f00","#ff0","#fff"]).mode("rgb")}}(Rs||(Rs={}));const js={},Hs={};function Fs(t,e){if(Array.isArray(t[0])&&(t=t[0]),!e)if(1==t.length&&t[0]in Ts)e="name";else if(1==t.length&&"string"==typeof t[0])e="css";else if(3==t.length)e="rgb";else if(4==t.length&&"number"==typeof t[3]&&t[3]>=0&&t[3]<=1)e="rgb";else{if(!(1==t.length&&"number"==typeof t[0]&&t[0]>=0&&t[0]<=16777215))throw new Error("could not guess mode. args "+JSON.stringify(t));e="num"}const r=Hs[e](...t);return new As(r[0],r[1],r[2],void 0!==r[3]?r[3]:1)}function Vs(t){let e;if(e=t.match(/^#?([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})([A-F\d]{2})?$/i))return[parseInt(e[1],16),parseInt(e[2],16),parseInt(e[3],16),e[4]?parseInt(e[4],16)/255:1];if(e=t.match(/^#?([A-F\d])([A-F\d])([A-F\d])([A-F\d])?$/i))return[17*parseInt(e[1],16),17*parseInt(e[2],16),17*parseInt(e[3],16),e[4]?17*parseInt(e[4],16)/255:1];throw new Error("invalid hex color: "+t)}function qs(t){return(t%360+360)%360}function Gs(t){if(!("number"==typeof t&&t>=0&&t<=16777215))throw new Error("unknown num color: "+t);return[t>>16,t>>8&255,255&t,1]}js.xyz=js.rgb=js.lab=function(t,e,r,o){const i=t[o](),s=e[o]();return Fs([ws(i[0],s[0],r),ws(i[1],s[1],r),ws(i[2],s[2],r),ws(t.alpha(),e.alpha(),r)],o)},js.num=function(t,e,r){return Ps(ws(t.num(),e.num(),r))},js.lrgb=function(t,e,r){const[o,i,s,n]=t.rgba(!1,!1),[a,l,c,d]=e.rgba(!1,!1);return new As(fs(o**2*(1-r)+a**2*r),fs(i**2*(1-r)+l**2*r),fs(s**2*(1-r)+c**2*r),ws(n,d,r))},Hs.lrgb=Hs.rgb,Hs.hex=Vs,Hs.hsl=an,Hs.hsv=function(t,e,r,o=1){t=qs(t);const i=r*e;return nn(t,i,i*(1-ns(t/60%2-1)),r-i,o)},Hs.num=Gs;const Ws="\\s*",Ks="([+-]?(?:\\d*\\.?)?\\d+(?:[eE][+-]?\\d+)?)",Ys=new RegExp(["^rgba?\\(",Ks,",",Ks,",",Ks,"(?:,",Ks+"(%)?",")?\\)$"].join(Ws),"i"),Xs=new RegExp(["^rgba?\\(",Ks,Ks,Ks,"(?:/",Ks+"(%)?",")?\\)$"].join(Ws),"i"),Js=new RegExp(["^rgba?\\(",Ks+"%",",",Ks+"%",",",Ks+"%","(?:,",Ks+"(%)?",")?\\)$"].join(Ws),"i"),Zs=new RegExp(["^rgba?\\(",Ks+"%",Ks+"%",Ks+"%","(?:/",Ks+"(%)?",")?\\)$"].join(Ws),"i"),Qs=new RegExp(["^hsla?\\(",Ks+"(deg|rad|turn)?",",",Ks+"%",",",Ks+"%","(?:,",Ks+"(%)?",")?\\)$"].join(Ws),"i"),tn=new RegExp(["^hsla?\\(",Ks+"(deg|rad|turn)?\\s+"+Ks+"%",Ks+"%","(?:/",Ks+"(%)?",")?\\)$"].join(Ws),"i");function en(t){return ps(100*t)/100}function rn(t){const e=t/255;return e<=.04045?e/12.92:((e+.055)/1.055)**2.4}function on(t){return t<=.0031308?12.92*t*255:255*(1.055*t**(1/2.4)-.055)}function sn(t,e,r){const o=hs(t,e,r),i=us(t,e,r),s=i-o;let n;return n=0==s?0:t==i?(e-r)/s+(e<r?6:0):e==i?2+(r-t)/s:4+(t-e)/s,[60*n,o,i]}function nn(t,e,r,o,i){const s=255*o,n=255*e+s,a=255*r+s;return t<60?[n,a,s,i]:t<120?[a,n,s,i]:t<180?[s,n,a,i]:t<240?[s,a,n,i]:t<300?[a,s,n,i]:[n,s,a,i]}function an(t,e,r,o=1){t=qs(t);const i=(1-ns(2*r-1))*e;return nn(t,i,i*(1-ns(t/60%2-1)),r-i/2,o)}function ln(t,e,r,o=1){const[i,s,n]=function(t,e,r){function o(t){return t>pn?t**3:gn*(t-4/29)}return[dn*o((t+16)/116+e/500),hn*o((t+16)/116),un*o((t+16)/116-r/200)]}(t,e,r);return vn(i,s,n,o)}Hs.css=function(t){if(Ts&&Ts.hasOwnProperty(t))return Gs(Ts[t.toLowerCase()]);let e;if(e=t.match(Ys)||t.match(Xs))return[_s(+e[1],0,255),_s(+e[2],0,255),_s(+e[3],0,255),e[4]?_s(e[5]?+e[4]/100:+e[4]):1];if(e=t.match(Js)||t.match(Zs))return[255*_s(+e[1]/100),255*_s(+e[2]/100),255*_s(+e[3]/100),e[4]?_s(e[5]?+e[4]/100:+e[4]):1];if(e=t.match(Qs)||t.match(tn)){const t={deg:1,rad:ks,turn:360},r=e[2]?e[2].toLowerCase():"deg";return an((+e[1]*t[r]%360+360)%360,_s(+e[3]/100),_s(+e[4]/100),e[5]?_s(e[6]?+e[5]/100:+e[5]):1)}return Vs(t)},Hs.name=function(t){return Gs(Ts[t])},Hs.lch=function(t,e,r,o=1){const[,i,s]=function(t,e,r){return[t,ls(r*xs)*e,bs(r*xs)*e]}(t,e,r);return ln(t,i,s,o)},Hs.cmyk=function(t,e,r,o,i=1){return 1==o?[0,0,0,i]:[255*(1-t)*(1-o),255*(1-e)*(1-o),255*(1-r)*(1-o),i]},Hs.gl=function(t,e,r,o=1){return[255*t,255*e,255*r,o]},Hs.rgb=(...t)=>t,Hs.temperature=Hs.kelvin=Hs.K=function(t){const e=t/100;let r,o,i;return e<66?(r=255,o=-155.25485562709179-.44596950469579133*(e-2)+104.49216199393888*ds(e-2),i=e<20?0:.8274096064007395*(e-10)-254.76935184120902+115.67994401066147*ds(e-10)):(r=351.97690566805693+.114206453784165*(e-55)-40.25366309332127*ds(e-55),o=325.4494125711974+.07943456536662342*(e-50)-28.0852963507957*ds(e-50),i=255),[r,o,i]},Hs.hcg=function(t,e,r,o=1){const i=r*(1-e);return nn(t=qs(t),e,e*(1-ns(t/60%2-1)),i,o)};const cn=18,dn=.95047,hn=1,un=1.08883,pn=.206896552,gn=.12841855,bn=.008856452;function fn(t,e,r){const[o,i,s]=mn(t,e,r);return function(t,e,r){function o(t){return t>bn?ms(t):t/gn+4/29}return[116*o(e/hn)-16,500*(o(t/dn)-o(e/hn)),200*(o(e/hn)-o(r/un))]}(o,i,s)}function mn(t,e,r){const o=rn(t),i=rn(e),s=rn(r);return[.4124564*o+.3575761*i+.1804375*s,.2126729*o+.7151522*i+.072175*s,.0193339*o+.119192*i+.9503041*s]}function vn(t,e,r,o=1){const i=-.969266*t+1.8760108*e+.041556*r,s=.0556434*t-.2040259*e+1.0572252*r;return[on(3.2404542*t-1.5371385*e-.4985314*r),on(i),on(s),o]}function yn(t,e){let r=-1/0,o=-1;for(let i=0;i<t.length;i++){const s=e(t[i]);s>r&&(r=s,o=i)}return o}Hs.xyz=vn,Hs.lab=ln,Hs.hsi=function(t,e,r,o=1){let i,s,n,a=t*xs;return a<2*vs/3?(n=(1-e)/3,i=(1+e*ls(a)/ls(vs/3-a))/3,s=1-(n+i)):a<4*vs/3?(a-=2*vs/3,i=(1-e)/3,s=(1+e*ls(a)/ls(vs/3-a))/3,n=1-(i+s)):(a-=4*vs/3,s=(1-e)/3,n=(1+e*ls(a)/ls(vs/3-a))/3,i=1-(s+n)),[3*r*i*255,3*r*s*255,3*r*n*255,o]},js.hsv=js.hsl=js.hsi=js.lch=js.hcg=function(t,e,r,o){const[i,s,n]=t[o](),[a,l,c]=e[o]();function d(t,e,r){return t+r*(qs(e-t+180)-180)}return Cs(("h"==o.charAt(0)?d:ws)(i,a,r),ws(s,l,r),("h"==o.charAt(2)?d:ws)(n,c,r),o)};const wn=[.3457/.3585,1,.2958/.3585],_n=t=>[t[0],t[1]*Math.cos(t[2]*Math.PI/180),t[1]*Math.sin(t[2]*Math.PI/180)],$n=t=>{const e=24389/27,r=216/24389,o=[];o[1]=(t[0]+16)/116,o[0]=t[1]/500+o[1],o[2]=o[1]-t[2]/200;return[Math.pow(o[0],3)>r?Math.pow(o[0],3):(116*o[0]-16)/e,t[0]>8?Math.pow((t[0]+16)/116,3):t[0]/e,Math.pow(o[2],3)>r?Math.pow(o[2],3):(116*o[2]-16)/e].map(((t,e)=>t*wn[e]))},xn=t=>An([[.9554734527042182,-.023098536874261423,.0632593086610217],[-.028369706963208136,1.0099954580058226,.021041398966943008],[.012314001688319899,-.020507696433477912,1.3303659366080753]],t),kn=t=>An([[3.2409699419045226,-1.537383177570094,-.4986107602930034],[-.9692436362808796,1.8759675015077202,.04155505740717559],[.05563007969699366,-.20397695888897652,1.0569715142428786]],t),Cn=t=>t.map((t=>{const e=t<0?-1:1,r=Math.abs(t);return r>.0031308?e*(1.055*Math.pow(r,1/2.4)-.055):12.92*t})),An=(t,e)=>{const r=e.map((t=>[t])),o=r[0].length,i=r[0].map(((t,e)=>r.map((t=>t[e])))),s=t.map((t=>i.map((e=>Array.isArray(t)?t.reduce(((t,r,o)=>t+r*(e[o]||0)),0):e.reduce(((e,r)=>e+r*t),0)))));if(1===o)return s.map((t=>t[0]));throw new Error(`invalid matrix mult ${t} ${e}`)},En=t=>{if(Sn(t))return t;let e=t[1],r=0;let o=t;for(;e-r>1e-4;){const i=(e+r)/2;o=[t[0],i,t[2]],Sn(o)?r=i:e=i}return o},Sn=t=>{const e=5e-6,r=(t=>{const e=_n(t),r=$n(e),o=xn(r),i=kn(o);return Cn(i)})(t);return r.every((t=>t+e>0))&&r.every((t=>t-e<1))},Mn=Ls(0,0,.5),Tn=(t,e)=>Us((t=>t.length>=2?t:[t[0]??Mn,t[0]??Mn])(t)).mode("lch").colors(e,"lch").map((t=>zs(t))).map((t=>(t=>{const e=t.alpha(),r=t.lch();return zs(En(r)).alpha(e)})(t))),On=(t,e)=>{if(!e)throw new Error(t)},zn=(t,e,r,o)=>{(t=>{On(`Invalid Hue ${t}`,0<=t&&t<=360)})(t),(t=>{On(`Invalid Saturation ${t}`,0<=t&&t<=100)})(e),(t=>{On(`Invalid Lightness ${t}`,0<=t&&t<=100)})(r),(t=>{On(`Invalid Alpha ${t}`,void 0===t||0<=t&&t<=100)})(o);return Ls(t,e/100,r/100,void 0===o?void 0:o/100)},Ln=t=>{const[e,r,o]=t.hsl(),i=t=>Math.round(10*t)/10,s=t=>i(100*(t=>Math.min(Math.max(0,t),1))(t));return[i(e),s(r),s(o),s(t.alpha())]},Pn=t=>{const[e,r,o,i]=Ln(t);return i<100?`hsl(${e.toFixed(0)} ${r.toFixed(1)}% ${o.toFixed(1)}% / ${i.toFixed(1)}%)`:`hsl(${e.toFixed(0)} ${r.toFixed(1)}% ${o.toFixed(1)}%)`},Dn={0:zn(220,16,22),1:zn(220,16,28),2:zn(220,17,32),3:zn(220,16,36),GreyDark1:zn(220,17,42),GreyDark2:zn(220,17,60),4:zn(219,28,88),5:zn(218,27,92),6:zn(218,27,94),White:zn(220,27,98),Black:zn(220,16,15),7:zn(179,25,65),Blue8Custom1:zn(200,35,21),Blue8Custom2:zn(193,43,55),Blue8:zn(193,43,67),Blue8Custom4:zn(185,73,92),9:zn(210,34,63),10:zn(213,32,52),C11_RedCustom1:zn(354,38,10),C11_RedCustom2:zn(354,42,50),C11_Red:zn(354,42,56),C11_RedCustom4:zn(354,100,80),Orange12:zn(14,51,63),Yellow13Custom1:zn(20,50,20),Yellow13Custom2:zn(40,71,52),Yellow13:zn(40,71,73),Yellow13Custom4:zn(60,100,95),Green14Custom1:zn(98,25,25),Green14Custom2:zn(92,28,53),Green14:zn(92,28,65),Green14Custom4:zn(80,80,86),Purple15:zn(311,20,63)},Un={danger:{Min:Dn.C11_RedCustom1,C500:Dn.C11_RedCustom2,C600:Dn.C11_Red,Max:Dn.C11_RedCustom4},neutral:{Min:Dn.Black,C500:Dn.GreyDark1,C600:Dn.GreyDark2,Max:Dn.White},primary:{Min:Dn.Blue8Custom1,C500:Dn.Blue8Custom2,C600:Dn.Blue8,Max:Dn.Blue8Custom4},success:{Min:Dn.Green14Custom1,C500:Dn.Green14Custom2,C600:Dn.Green14,Max:Dn.Green14Custom4},warning:{Min:Dn.Yellow13Custom1,C500:Dn.Yellow13Custom2,C600:Dn.Yellow13,Max:Dn.Yellow13Custom4}},Bn={danger:{Min:Dn.C11_RedCustom4,C500:Dn.C11_Red,C600:Dn.C11_RedCustom2,Max:Dn.C11_RedCustom1},neutral:{Min:Dn.White,C500:Dn.GreyDark2,C600:Dn.GreyDark1,Max:Dn.Black},primary:{Min:Dn.Blue8Custom4,C500:Dn.Blue8,C600:Dn.Blue8Custom2,Max:Dn.Blue8Custom1},success:{Min:Dn.Green14Custom4,C500:Dn.Green14,C600:Dn.Green14Custom2,Max:Dn.Green14Custom1},warning:{Min:Dn.Yellow13Custom4,C500:Dn.Yellow13,C600:Dn.Yellow13Custom2,Max:Dn.Yellow13Custom1}},Rn={danger:{Min:zn(0,56,23.9),C500:zn(.7,89.6,57.2),C600:zn(0,98.6,67.9),Max:zn(0,100,95.9)},neutral:{Min:zn(240,5.9,11),C500:zn(240,3.7,44),C600:zn(240,5.3,58),Max:zn(0,0,100)},primary:{Min:zn(203,63.8,18),C500:zn(199.7,85.9,47.7),C600:zn(198.7,97.9,57.2),Max:zn(186,100,95.5)},success:{Min:zn(144.3,53.6,16),C500:zn(141.1,64.9,43),C600:zn(141.6,72.4,55.2),Max:zn(144,100,95.5)},warning:{Min:zn(21.9,66.3,21.1),C500:zn(37,96.6,48.3),C600:zn(43.3,100,53.4),Max:zn(60,100,94.6)}},In={danger:{Min:zn(0,85.7,97.3),C500:zn(0,84.2,60.2),C600:zn(0,72.2,50.6),Max:zn(0,60,19.6)},neutral:{Min:zn(0,0,100),C500:zn(240,3.8,46.1),C600:zn(240,5.2,33.9),Max:zn(0,0,0)},primary:{Min:zn(204,100,93.1),C500:zn(198.6,88.7,48.4),C600:zn(200.4,98,39.4),Max:zn(202.3,73.8,16.5)},success:{Min:zn(138.5,76.5,93),C500:zn(142.1,70.6,45.3),C600:zn(142.1,76.2,36.3),Max:zn(144.3,60.7,12)},warning:{Min:zn(48,100,96.1),C500:zn(37.7,92.1,50.2),C600:zn(32.1,94.6,43.7),Max:zn(22.9,74.1,16.7)}},Nn=t=>ri`
.${ei(t.CssName)}  {
/* Colours */
${ei(Hn(Yn(t.TokensColourTheme)))}

/* Box Shadows, Forms, Overlays, etc. */
${ei(Fn(t.IsLight?qn:Vn))}

/* Panels/Cards */
--sl-panel-border-color: var(--sl-color-neutral-200);
--sl-panel-background-color: var(--sl-color-neutral-${t.ContrastPanel});

/* SVGs -- May needed for some libraries.
 * https://shoelace.style/components/icon?id=icon-libraries
 * We set it here so we can override it later with a gradient URL as needed.
 * Only used if explicitly set by the app when registering icon libraries */
--svg-fill: currentColor;

/* Component Colours -- common to all themes,
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

body.${ei(t.CssName)} {
	background: var(--sl-color-neutral-${t.ContrastBody});
	color: var(--sl-color-neutral-${t.ContrastText});
}`,jn=t=>e=>Object.entries(e).map((([e,r])=>`${e}: ${t(r)};`)).join("\n"),Hn=jn(Pn),Fn=jn((t=>(t=>void 0!==t.alpha)(t)?Pn(t):(t=>`${t.XYBlurSpread} ${Pn(t.Colour)}`)(t))),Vn={"--sl-shadow-x-small":{XYBlurSpread:"0 1px 2px",Colour:zn(0,0,0,18)},"--sl-shadow-small":{XYBlurSpread:"0 1px 2px",Colour:zn(0,0,0,24)},"--sl-shadow-medium":{XYBlurSpread:"0 2px 4px",Colour:zn(0,0,0,24)},"--sl-shadow-large":{XYBlurSpread:"0 2px 8px",Colour:zn(0,0,0,24)},"--sl-shadow-x-large":{XYBlurSpread:"0 4px 16px",Colour:zn(0,0,0,24)},"--sl-focus-ring":{XYBlurSpread:"0 0 0 3px",Colour:zn(198.6,88.7,48.4,45)},"--sl-overlay-background-color":zn(0,0,0,43)},qn={"--sl-shadow-x-small":{XYBlurSpread:"0 1px 2px",Colour:zn(240,3.8,46.1,6)},"--sl-shadow-small":{XYBlurSpread:"0 1px 2px",Colour:zn(240,3.8,46.1,12)},"--sl-shadow-medium":{XYBlurSpread:"0 2px 4px",Colour:zn(240,3.8,46.1,12)},"--sl-shadow-large":{XYBlurSpread:"0 2px 8px",Colour:zn(240,3.8,46.1,12)},"--sl-shadow-x-large":{XYBlurSpread:"0 4px 16px",Colour:zn(240,3.8,46.1,12)},"--sl-focus-ring":{XYBlurSpread:"0 0 0 3px",Colour:zn(198.6,88.7,48.4,40)},"--sl-overlay-background-color":zn(240,3.8,46.1,33)},Gn=[50,100,200,300,400,500],Wn=[600,700,800,900,950],Kn=(t,e)=>{const r="neutral"===t?[0,...Gn]:Gn,o="neutral"===t?[...Wn,1e3]:Wn;return{...Xn(t,r,[e.Min,e.C500]),...Xn(t,o,[e.C600,e.Max])}},Yn=t=>Object.entries(t).map((([t,e])=>Kn(t,e))).reduce(((t,e)=>({...t,...e}))),Xn=(t,e,r)=>{const o=e.map((e=>`--sl-color-${t}-${e}`)),i=Tn(r,e.length),s=Jn(o,i);return Object.fromEntries(s)},Jn=(t,e)=>t.map(((r,o)=>[t[o],e[o]]));var Zn;!function(t){t[t.Dark=1]="Dark",t[t.Light=2]="Light"}(Zn||(Zn={}));const Qn=window.matchMedia("(prefers-color-scheme: light)"),ta=[{ContrastBody:0,ContrastPanel:50,ContrastText:900,CssName:"shoelace-dark",IsLight:!1,Label:"Shoelace - Dark",TokensColourTheme:Rn},{ContrastBody:200,ContrastPanel:50,ContrastText:900,CssName:"sl-nord-polar-night",IsLight:!1,Label:"Nord - Polar Night",TokensColourTheme:Un}],ea=[{ContrastBody:0,ContrastPanel:0,ContrastText:900,CssName:"shoelace-light",IsLight:!0,Label:"Shoelace - Light",TokensColourTheme:In},{ContrastBody:50,ContrastPanel:0,ContrastText:900,CssName:"sl-nord-snow-storm",IsLight:!0,Label:"Nord - Snow Storm",TokensColourTheme:Bn}],ra=t=>{const e=((t,e)=>{const r=document.createElement("style");return r.id=t,r.innerHTML=e,r})(t.CssName,Nn(t).cssText);$(document,`style#${t.CssName}`)?.remove(),$(document,"head").appendChild(e),$(document,"body").className=t.CssName},oa=(()=>{const t=t=>localStorage.getItem("theme-park-"+t),e=t("mode"),r=null===e?Qn.matches:"light"===e;return{Dark:ta.find((e=>e.CssName===t("dark")))??ta[0],Light:ea.find((e=>e.CssName===t("light")))??ea[0],Mode:r?Zn.Light:Zn.Dark}})(),ia=()=>{const t=(t,e)=>localStorage.setItem("theme-park-"+t,e);t("dark",oa.Dark.CssName),t("light",oa.Light.CssName),t("mode",oa.Mode===Zn.Light?"light":"dark");const e=oa.Mode===Zn.Light?oa.Light:oa.Dark;ra(e),sa.forEach((t=>t.requestUpdate()))};Qn.addEventListener("change",(()=>{oa.Mode=Qn.matches?Zn.Light:Zn.Dark,ia()}));let sa=[];ia();class na{constructor(t){this.host=t,this.ReapplyThemeColours=()=>ra(this.GetTheme()),t.addController(this)}hostConnected(){sa.push(this.host)}hostDisconnected(){sa=sa.filter((t=>t!==this.host))}GetMode(){return oa.Mode}GetTheme(){return oa.Mode===Zn.Light?oa.Light:oa.Dark}GetThemeOptions(){return oa.Mode===Zn.Light?ea:ta}SetMode(t){oa.Mode=t,ia()}SetTheme(t){t.IsLight?oa.Light=t:oa.Dark=t,ia()}ReapplyTheme(){this.ReapplyThemeColours(),sa.forEach((t=>t.requestUpdate()))}}const aa=ri`
.toggle-btn {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	user-select: none;
}
/* focus ring (aka border) should be above other buttons when selected */
sl-button[selected] { z-index: 3; }
sl-button[selected]::part(base) {
	border-color: var(--sl-color-primary-200);
	box-shadow: 0 0 10px 4px var(--sl-color-primary-100) inset; }
sl-button[selected]:hover::part(base) {
	border-color: var(--sl-color-success-300);
	box-shadow: 0 0 10px 4px var(--sl-color-success-100) inset; }
`;let la=class extends Ki{constructor(){super(...arguments),this.themeProvider=new na(this)}static get styles(){return[ts,aa]}render(){const t=this.themeProvider.GetTheme();return Mi`
<div class="toggle-btn"
	>Theme Type
	<sl-button-group>
		<sl-button ?selected=${t.IsLight}
			@click=${()=>{t.IsLight=!0,this.themeProvider.ReapplyTheme()}}>Light
		</sl-button>
		<sl-button ?selected=${!t.IsLight}
			@click=${()=>{t.IsLight=!1,this.themeProvider.ReapplyTheme()}}>Dark
		</sl-button>
	</sl-button-group>
</div>`}};la=Yo([Xi("mode-theme-type")],la);let ca=class extends Ki{constructor(){super(...arguments),this.themeProvider=new na(this)}static get styles(){return[ts,aa]}render(){const t=this.themeProvider.GetTheme();return Mi`
<div class="toggle-btn"
	>Body Contrast
	<sl-button-group>
		${[0,50,100,200].map((e=>Mi`
		<sl-button ?selected=${t.ContrastBody===e}
			@click=${()=>{t.ContrastBody=e,this.themeProvider.ReapplyTheme()}}>${e}
		</sl-button>`))}
	</sl-button-group>
</div>`}};ca=Yo([Xi("mode-contrast-body")],ca);let da=class extends Ki{constructor(){super(...arguments),this.themeProvider=new na(this)}static get styles(){return[ts,aa]}render(){const t=this.themeProvider.GetTheme();return Mi`
<div class="toggle-btn"
	>Panel Contrast
	<sl-button-group>
		${[0,50,100,200].map((e=>Mi`
		<sl-button ?selected=${t.ContrastPanel===e}
			@click=${()=>{t.ContrastPanel=e,this.themeProvider.ReapplyTheme()}}>${e}
		</sl-button>`))}
	</sl-button-group>
</div>`}};da=Yo([Xi("mode-contrast-panel")],da);let ha=class extends Ki{constructor(){super(...arguments),this.themeProvider=new na(this)}static get styles(){return[ts,aa]}render(){const t=this.themeProvider.GetTheme();return Mi`
<div class="toggle-btn"
	>Text Contrast
	<sl-button-group>
		${[800,900,950,1e3].map((e=>Mi`
		<sl-button ?selected=${t.ContrastText===e}
			@click=${()=>{t.ContrastText=e,this.themeProvider.ReapplyTheme()}}>${e}
		</sl-button>`))}
	</sl-button-group>
</div>`}};ha=Yo([Xi("mode-contrast-text")],ha);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ua=1,pa=2,ga=3,ba=4,fa=t=>(...e)=>({_$litDirective$:t,values:e});class ma{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const va=t=>void 0===t.strings,ya={},wa=fa(class extends ma{constructor(t){if(super(t),t.type!==ga&&t.type!==ua&&t.type!==ba)throw Error("The `live` directive is not allowed on child or event bindings");if(!va(t))throw Error("`live` bindings can only contain a single expression")}render(t){return t}update(t,[e]){if(e===Ti||e===Oi)return e;const r=t.element,o=t.name;if(t.type===ga){if(e===r[o])return Ti}else if(t.type===ba){if(!!e===r.hasAttribute(o))return Ti}else if(t.type===ua&&r.getAttribute(o)===e+"")return Ti;return((t,e=ya)=>{t._$AH=e;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */})(t),e}}),_a=(t,e)=>{var r,o;const i=t._$AN;if(void 0===i)return!1;for(const t of i)null===(o=(r=t)._$AO)||void 0===o||o.call(r,e,!1),_a(t,e);return!0},$a=t=>{let e,r;do{if(void 0===(e=t._$AM))break;r=e._$AN,r.delete(t),t=e}while(0===(null==r?void 0:r.size))},xa=t=>{for(let e;e=t._$AM;t=e){let r=e._$AN;if(void 0===r)e._$AN=r=new Set;else if(r.has(t))break;r.add(t),Aa(e)}};function ka(t){void 0!==this._$AN?($a(this),this._$AM=t,xa(this)):this._$AM=t}function Ca(t,e=!1,r=0){const o=this._$AH,i=this._$AN;if(void 0!==i&&0!==i.size)if(e)if(Array.isArray(o))for(let t=r;t<o.length;t++)_a(o[t],!1),$a(o[t]);else null!=o&&(_a(o,!1),$a(o));else _a(this,t)}const Aa=t=>{var e,r,o,i;t.type==pa&&(null!==(e=(o=t)._$AP)&&void 0!==e||(o._$AP=Ca),null!==(r=(i=t)._$AQ)&&void 0!==r||(i._$AQ=ka))};class Ea extends ma{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,r){super._$AT(t,e,r),xa(this),this.isConnected=t._$AU}_$AO(t,e=!0){var r,o;t!==this.isConnected&&(this.isConnected=t,t?null===(r=this.reconnected)||void 0===r||r.call(this):null===(o=this.disconnected)||void 0===o||o.call(this)),e&&(_a(this,t),$a(this))}setValue(t){if(va(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Sa{}const Ma=new WeakMap,Ta=fa(class extends Ea{render(t){return Oi}update(t,[e]){var r;const o=e!==this.U;return o&&void 0!==this.U&&this.ot(void 0),(o||this.rt!==this.lt)&&(this.U=e,this.ht=null===(r=t.options)||void 0===r?void 0:r.host,this.ot(this.lt=t.element)),Oi}ot(t){"function"==typeof this.U?(void 0!==Ma.get(this.U)&&this.U.call(this.ht,void 0),Ma.set(this.U,t),void 0!==t&&this.U.call(this.ht,t)):this.U.value=t}get rt(){var t;return"function"==typeof this.U?Ma.get(this.U):null===(t=this.U)||void 0===t?void 0:t.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}}),Oa=ri`
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
sl-tag::part(content) { color: var(--colour); }

sl-color-picker {
	--grid-width: 360px; }
sl-color-picker, sl-color-picker::part(base) {
	box-shadow: none; }
sl-color-picker::part(swatches) { display: none; }`;let za=class extends Ki{constructor(){super(...arguments),this.key="Min",this.themeProvider=new na(this),this.pickerRef=new Sa,this.getSelectedColour=()=>{const t=this.themeProvider.GetTheme().TokensColourTheme[this.variant][this.key],e=this.pickerRef.value?.format??"hsl";return"hex"===e?t.hex():"rgb"===e?Da(t):(t=>{const[e,r,o,i]=Ln(t);return i<100?`hsla(${e}, ${r}%, ${o}%, ${i}%)`:`hsl(${e}, ${r}%, ${o}%)`})(t)},this.reapplyColoursThrottled=Ua((()=>this.themeProvider.ReapplyThemeColours()))}editColour(){const t=this.getSelectedColour(),e=this.pickerRef.value.value;if(e===t)return;this.themeProvider.GetTheme().TokensColourTheme[this.variant][this.key]=Cs(e),this.reapplyColoursThrottled(),this.requestUpdate()}editKey(t){this.key=t,this.requestUpdate()}firstUpdated(t){this.requestUpdate()}static get styles(){return[ts,Oa]}render(){const t=this.themeProvider.GetTheme(),e=t.TokensColourTheme[this.variant],r=Object.entries(e).map((([t,e])=>({key:t,Css:Pn(e),L:e.lch()[0]}))),o=this.getSelectedColour(),i=Kn(this.variant,e);return Mi`
<div style="grid-column: 1 / span 3; display: flex; gap: 5px; width: 100%;">
	${Object.entries(i).map((([t,e])=>Mi`
	<div class="swatch" style="background: var(${t});">
		<sl-tooltip content="${La(e)}" .distance=${0}>
			<div style="width: 100%; height: 100%;"></div>
		</sl-tooltip>
	</div>`))}
</div>

<sl-tab-group placement="start" ?invert-primary=${"primary"===this.variant}>
	${r.map((({key:e,Css:r,L:o})=>Mi`
	<sl-tab slot="nav"
		@click=${()=>this.editKey(e)}>
		<div style="width: 100%; font-size: 1.2em; font-weight: 600; margin-right: 1rem;"
			>${Pa(t,e)}
		</div>
		<sl-tag
			style="--background: ${r}; --colour: ${o>50?"black":"white"};"
			variant="${this.variant}"
			size="medium"
			>${o.toFixed(1)}
		</sl-tag>
	</sl-tab>`))}
</sl-tab-group>

<sl-color-picker inline
	${Ta(this.pickerRef)}
	@sl-change=${()=>this.editColour()}
	format="hsl" .value=${wa(o)}
></sl-color-picker>

<div style="white-space: nowrap;">
	${Object.values(i).map((t=>Mi`
	<div style="font-weight: 600;">${Pn(t)};</div>`))}
</div>
`}};Yo([Zi({reflect:!0}),Xo("design:type",Object)],za.prototype,"variant",void 0),za=Yo([Xi("tab-colour-editor")],za);const La=t=>{const[e,r,o]=t.lch();return`lch(${e.toFixed(1)}%, ${r.toFixed(0)}, ${o.toFixed(0)}°)`},Pa=(t,e)=>{switch(e){case"Min":return t.IsLight?"Lightest":"Darkest";case"C500":return"Button Hover";case"C600":return"Button";case"Max":return t.IsLight?"Darkest":"Lightest"}},Da=t=>{const[e,r,o]=t.rgb();return`rgb(${e}, ${r}, ${o})`},Ua=t=>{let e=!1;const r=()=>{t(),e=!1};return()=>{e||(e=!0,setTimeout(r,50))}};let Ba=[];const Ra={IsOutline:!1};class Ia{constructor(t){this.host=t,t.addController(this)}hostConnected(){Ba.push(this.host)}hostDisconnected(){Ba=Ba.filter((t=>t!==this.host))}GetIsOutline(){return Ra.IsOutline}SetIsOutline(t){Ra.IsOutline=t,Ba.forEach((t=>t.requestUpdate()))}}const Na=ri`
:host { display: inline-block; }

sl-tab-group::part(nav) {
	display: flex; }
sl-tab::part(base) {
	padding: var(--sl-spacing-medium); }

sl-card {
	margin: 0 auto; }
sl-card::part(base) {
	--padding: 1.5rem;
	box-shadow: var(--sl-shadow-large); }
sl-card::part(body) {
	display: flex; flex-direction: column; gap: 1.5rem; }
`,ja=["primary","success","neutral","warning","danger"];let Ha=class extends Ki{constructor(){super(...arguments),this.previewState=new Ia(this)}static get styles(){return[ts,Na]}render(){const t=this.previewState.GetIsOutline(),e=$(this,"#hide-colours")?.active??!1;return Mi`
<sl-tab-group style="margin: 0 auto; display: inline-block;"
	@sl-tab-show=${()=>this.requestUpdate()}
	@sl-tab-hide=${()=>this.requestUpdate()}>
	${ja.map((e=>Mi`
	<sl-tab slot="nav" panel="${e}">
		<sl-button variant="${e}" ?outline=${t}>
			${e[0].toUpperCase()+e.slice(1)}
			<sl-icon slot="suffix" name="palette"></sl-icon>
		</sl-button>
	</sl-tab>
	<sl-tab-panel name="${e}">
		<sl-card>
			<tab-colour-editor variant="${e}"></tab-colour-editor>
		</sl-card>
	</sl-tab-panel>`))}
	<sl-tab slot="nav" id="hide-colours">
		<sl-button variant="default" ?outline=${t}
			>Collapse
			<sl-icon slot="suffix" name=${e?"chevron-right":"chevron-down"}></sl-icon>
		</sl-button>
	</sl-tab>
</sl-tab-group>
`}};Ha=Yo([Xi("tab-colour-editor-group")],Ha);let Fa=class extends Ki{constructor(){super(...arguments),this.themeProvider=new na(this)}static get styles(){return[ts,ri`
a { color: inherit; text-decoration: inherit; }
	`]}render(){const t=this.themeProvider.GetTheme();return Mi`
<sl-button-group>
	<sl-button variant="default" size="medium">Save Theme</sl-button>
	<sl-dropdown placement="bottom-end">
		<sl-button slot="trigger" size="medium" caret></sl-button>
		<sl-menu>
			<sl-menu-item
				@click=${()=>Va(t)}
				>Export Shoelace Theme Tokens
			</sl-menu-item>
			<sl-menu-item>
				<a href="/shoelace-tokens.css" download>Export Shoelace Shared CSS</a>
			</sl-menu-item>
		</sl-menu>
	</sl-dropdown>
</sl-button-group>`}};Yo([Zi({reflect:!0}),Xo("design:type",Object)],Fa.prototype,"variant",void 0),Fa=Yo([Xi("theme-exporter")],Fa);const Va=t=>{const e=Nn(t).cssText;qa(e,"shoelace-theme.css")},qa=(t,e)=>{const r=new Blob([t],{type:"text/css"}),o=URL.createObjectURL(r),i=document.createElement("a");i.href=o,i.download=e,document.body.appendChild(i),i.click(),i.remove(),URL.revokeObjectURL(o)};let Ga=class extends Ki{constructor(){super(...arguments),this.theme=new na(this)}static get styles(){return[ts]}render(){const t=this.theme.GetTheme();return Mi`
<sl-dropdown>
	<sl-button slot="trigger" caret>${t.Label}</sl-button>
	<sl-menu
		@sl-select=${t=>this.theme.SetTheme(t.detail.item.theme)}>
		${this.theme.GetThemeOptions().map((e=>Mi`
		<sl-menu-item ?checked=${e===t} .theme="${e}"
			>${e.Label}
		</sl-menu-item>`))}
	</sl-menu>
</sl-dropdown>`}};Ga=Yo([Xi("theme-picker-dropdown")],Ga);let Wa=class extends Ki{constructor(){super(...arguments),this.themeProvider=new na(this)}static get styles(){return[ts,aa]}render(){const t=this.themeProvider.GetMode();return Mi`
<sl-button-group>
	<sl-button variant="default"
		?selected=${t===Zn.Light}
		@click=${()=>this.themeProvider.SetMode(Zn.Light)}
		><sl-icon name="sun"></sl-icon>
	</sl-button>
	<sl-button variant="default"
		?selected=${t===Zn.Dark}
		@click=${()=>this.themeProvider.SetMode(Zn.Dark)}
		><sl-icon name="moon"></sl-icon>
	</sl-button>
</sl-button-group>`}};Wa=Yo([Xi("theme-picker-switch")],Wa);let Ka=class extends Ki{constructor(){super(...arguments),this.previewState=new Ia(this)}static get styles(){return[ts,ri`:host { display: flex; }`]}render(){return Mi`
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
		@sl-change=${t=>this.previewState.SetIsOutline(t.currentTarget.checked)}
		>Preview Outline
	</sl-switch>
</sl-tooltip>
<div style="flex-grow: 1;"></div>
<theme-exporter></theme-exporter>
<theme-picker-dropdown></theme-picker-dropdown>
<theme-picker-switch></theme-picker-switch>
`}};Ka=Yo([Xi("top-bar")],Ka);const Ya=t=>{const e=document.createElementNS("http://www.w3.org/2000/svg","svg");e.innerHTML='\n<svg style="width:0;height:0;position:absolute;" aria-hidden="true" focusable="false">\n  <linearGradient id="global-svg-gradient" x2="1" y2="1">\n    <stop offset="0%" stop-color="var(--hsl-start)" />\n    <stop offset="100%" stop-color="var(--hsl-end)" />\n  </linearGradient>\n</svg>',t.prepend(e),t.setAttribute("fill","var(--svg-fill)")},Xa=(t,e)=>_o(e,{resolver:e=>`/assets/${t}/${e}.svg`,mutator:Ya});Xa("custom","custom"),Xa("fa","fa"),Xa("icons","default"),Xa("icons","system");
