const CACHE = Object.create(null);
const INST_SET = new Set();
const IMPORTS_READY = 'all-imports-ready';

export class ReComponent extends HTMLElement {

  constructor() {
    super();
    INST_SET.add(this);
  }

  applySrc() {}

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