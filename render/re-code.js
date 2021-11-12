import { ReComponent } from './ReComponent.js';
import { clrz } from '../utils/clrz.js';

export class ReCode extends ReComponent {

  applySrc() {
    if (this.srcText) {
      this.outerHTML = /*html*/ `<code>${clrz(this.srcText)}</code>`;
    }
  }

}
