import { ReComponent } from './ReComponent.js';

export class ReHtm extends ReComponent {

  applySrc() {
    /** @type {String} */
    let html = this.processHtmlPlaceholders(this.srcText);
    let tpl = document.createElement('template');
    tpl.innerHTML = html;
    let fr = document.createDocumentFragment();
    fr.appendChild(tpl.content);
    this.processSlots(fr);
    this.parentElement.insertBefore(fr, this);
    this.remove();
  }

}


