import { ReComponent } from './ReComponent.js';

export class ReJs extends ReComponent {

  _setModule(script) {
    let iSmodule = this.getAttribute('module');
    if (iSmodule === 'true' || iSmodule === '') {
      script.setAttribute('type', 'module');
    }
  }

  applySrc() {
    let script;
    if (this.hasAttribute('inline')) {
      script = document.body.querySelector('script[re-inline]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('re-inline', '');
        this._setModule(script);
        document.body.appendChild(script);
      }
      script.textContent += '\n' + this.srcText;
    } else {
      script = document.createElement('script');
      script.src = this.getAttribute('src');
      this._setModule(script);
      document.body.appendChild(script);
    }
    this.remove();
  }

}


