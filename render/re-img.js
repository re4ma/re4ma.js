import { ReComponent } from './ReComponent.js';

export class ReImg extends ReComponent {
  set src(srcVal) {
    if (!srcVal) {
      return;
    }
    this.img = document.createElement('img');

    if (this.hasAttribute('lazy')) {
      this.img.loading = 'lazy';
    };
    if (this.hasAttribute('w')) {
      let w = this.getAttribute('w');
      this.img.setAttribute('width', w);
      this.width = parseFloat(w);
    }
    if (this.hasAttribute('h')) {
      let h = this.getAttribute('h');
      this.img.setAttribute('height', h);
      this.height = parseFloat(h);
    }
    if (this.hasAttribute('alt')) {
      this.img.alt = this.getAttribute('alt');
    }
    if (this.hasAttribute('loader')) {
      this.applyLoader(srcVal);
    } else {
      this.img.src = srcVal;
      this.parentNode.insertBefore(this.img, this);
      this.remove();
    }
  }
}

