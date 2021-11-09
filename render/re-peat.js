import { ReComponent } from './ReComponent.js';

export class RePeat extends ReComponent {

  constructor() {
    super();
    /** @type {String} */
    this.dataSrc = null;
    /** @type {String} */
    this.templateSrc = null;
  }

  /**
   * 
   * @param {Object} dataItem 
   * @param {String} tpl 
   * @param {String} [id]
   */
  _getHtml(dataItem, tpl, id = null) {
    let process = (obj, path) => {
      for (let key in obj) {
        if (obj[key].constructor === Object) {
          process(obj[key], path + key + '.');
        } else {
          // .replaceAll() - not working in Puppeteer 0_0
          tpl = tpl.split(`{{${path + key}}}`).join(obj[key]);
        }
      }
    };
    process(dataItem, '');
    if (id) {
      tpl = tpl.split('{{id}}').join(id);
    }
    return tpl;
  }

  async _render() {
    let data = await (await window.fetch(this.dataSrc)).json();
    let tpl = await (await window.fetch(this.templateSrc)).text();
    this._html = '';
    if (data.constructor === Array) {
      data.forEach((item) => {
        this._html += this._getHtml(item, tpl);
      });
    } else if (data.constructor === Object) {
      for (let id in data) {
        this._html += this._getHtml(data[id], tpl, id);
      }
    } else {
      console.log('Wrong data format at ' + this.dataSrc);
    }
    if (this.parentNode) {
      this.outerHTML = this._html;
    }
  }

  connectedCallback() {
    if (this.dataSrc && this.templateSrc) {
      this._render();
    }
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (newVal === oldVal) {
      return;
    }
    this[name.split('-')[0] + 'Src'] = newVal;
  }

  static get observedAttributes() {
    return [
      'data-src',
      'template-src',
    ];
  }
}

