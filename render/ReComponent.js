const CACHE = Object.create(null);
const INST_SET = new Set();
const IMPORTS_READY = 'all-imports-ready';
const ATTR_PRFX = '--';

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

  /**
   * 
   * @param {String} html 
   * @returns {String}
   */
  processHtmlPlaceholders(html) {
    [...this.attributes].forEach((attr) => {
      if (attr.name.startsWith(ATTR_PRFX)) {
        let name = attr.name.replace(ATTR_PRFX, '');
        html = html.split(`{{${name}}}`).join(attr.value);
      }
    });
    if (html.includes('{{') && html.includes('}}')) {
      let partsArr = html.split('{{');
      partsArr.forEach((part) => {
        if (!part.includes('}}')) {
          return;
        }
        let placeholder = part.split('}}')[0];
        let value = this.getCssData(`--${placeholder}`);
        if (value) {
          html = html.split(`{{${placeholder}}}`).join(value);
        }
      });
    }
    return html;
  }

  /**
   * 
   * @param {DocumentFragment} fr 
   */
  processSlots(fr) {
    let defaultSlot = fr.querySelector(`slot:not([name])`);
    let slot;
    [...this.children].forEach((el) => {
      let slotName = el.getAttribute('slot');
      if (slotName) {
        slot = fr.querySelector(`slot[name="${slotName}"]`);
      }
      if (!slot) {
        slot = defaultSlot || null;
      }
      if (slot) {
        slot.parentElement?.insertBefore(el, slot);
      } else {
        el.remove();
      }
    });
    [...fr.querySelectorAll('slot')].forEach((slot) => {
      slot.remove();
    });
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