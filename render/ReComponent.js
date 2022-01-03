const CACHE = Object.create(null);
const INST_SET = new Set();
const IMPORTS_READY = 'all-imports-ready';

export class ReComponent extends HTMLElement {

  constructor() {
    super();
    INST_SET.add(this);
  }

  applySrc() { }

  set src(srcValue) {
    if (!srcValue) {
      return;
    }
    if (CACHE[srcValue]) {
      this.srcText = CACHE[srcValue];
      this.applySrc();
    } else {
      window.fetch(srcValue).then(async (resp) => {
        this.srcText = await resp.text();
        CACHE[srcValue] = this.srcText;
        this.applySrc();
      });
    }
  }

  /**
   * @param {String} propName
   * @param {Boolean} [silentCheck]
   */
  getCssData(propName, silentCheck = false) {
    if (!this.__cssDataCache) {
      this.__cssDataCache = Object.create(null);
    }
    if (!Object.keys(this.__cssDataCache).includes(propName)) {
      if (!this.__computedStyle) {
        this.__computedStyle = window.getComputedStyle(this);
      }
      let val = this.__computedStyle.getPropertyValue(propName).trim();
      // Firefox doesn't transform string values into JSON format:
      if (val.startsWith(`'`) && val.endsWith(`'`)) {
        val = val.replace(/\'/g, '"');
      }
      try {
        this.__cssDataCache[propName] = JSON.parse(val);
      } catch (e) {
        !silentCheck && console.warn(`CSS Data error: ${propName}`);
        this.__cssDataCache[propName] = null;
      }
    }
    return this.__cssDataCache[propName];
  }

  dropCssDataCache() {
    this.__cssDataCache = null;
    this.__computedStyle = null;
  }

  /**
   * 
   * @param {String} src 
   */
  async applyLoader(src) {
    let loaderSrc = this.getAttribute('loader');
    if (!loaderSrc) {
      console.log(`Loader error: ${loaderSrc}`);
      return;
    }
    let loaderText = await (await (window.fetch(loaderSrc))).text();
    let file = new File([loaderText], 'loader', {
      type: 'application/javascript',
    });
    let url = URL.createObjectURL(file);
    let mdl = await import(url);
    mdl.default(src, this);
  }

  disconnectedCallback() {
    INST_SET.delete(this);
    if (!INST_SET.size) {
      window.dispatchEvent(new CustomEvent(IMPORTS_READY));
      window.requestAnimationFrame(() => {
        [...document.querySelectorAll('[re-move]')].forEach((el) => {
          el.remove();
        });
      });
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (newVal === oldVal) {
      return;
    }
    this[name] = newVal;
  }

  static reg(tagName) {
    window.customElements.define(tagName, this);
  }

}

ReComponent.observedAttributes = ['src'];