import { ReComponent } from './ReComponent.js';

const ATTR_PRFX = '--';

export class ReHtm extends ReComponent {

  applySrc() {
    let html = this.srcText;
    [...this.attributes].forEach((attr) => {
      if (attr.name.startsWith(ATTR_PRFX)) {
        let name = attr.name.replace(ATTR_PRFX, '');
        html = html.split(`{{${name}}}`).join(attr.value);
      }
    });
    let tpl = document.createElement('template');
    tpl.innerHTML = html;
    let fr = document.createDocumentFragment();
    fr.appendChild(tpl.content);
    let head = fr.querySelector('re-head');
    if (head) {
      [...head.children].forEach((node) => {
        console.log(node)
        document.head.appendChild(node);
      });
      head.remove();
    }
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
    this.parentElement.insertBefore(fr, this);
    this.remove();
  }

}


