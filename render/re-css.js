import { ReComponent } from './ReComponent.js';

export class ReCss extends ReComponent {

  applySrc() {
    if (this.hasAttribute('inline')) {
      let style = document.querySelector('style');
      if (!style) {
        style = document.createElement('style');
        document.head.appendChild(style);
      }
      style.textContent += this.srcText;
    } else {
      let style = document.createElement('link');
      style.href = this.getAttribute('src');
      style.rel = 'stylesheet';
      document.head.appendChild(style);
    }
    this.remove();
  }

}

