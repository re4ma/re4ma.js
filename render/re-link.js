import { ReComponent } from './ReComponent.js';

export class ReLink extends ReComponent {
  connectedCallback() {
    let href = this.getAttribute('href');
    if (href) {
      let a = document.createElement('a');
      for (let attr of [...this.attributes]) {
        a.setAttribute(attr.name, attr.value);
      }
      a.innerHTML = this.innerHTML;
      this.parentNode.insertBefore(a, this);
      this.remove();
      window.fetch('./', {
        method: 'POST',
        body: JSON.stringify({
          type: 'link',
          href,
        })
      });
    }
  }
}