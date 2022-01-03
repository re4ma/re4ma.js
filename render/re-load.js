import { ReComponent } from './ReComponent.js';

export class ReLoad extends ReComponent {
  set src(srcVal) {
    if (!srcVal) {
      return;
    }
    let loaderSrc = this.getAttribute('loader');
    if (loaderSrc) {
      import(loaderSrc).then((ldrFn) => {
        ldrFn(srcVal, this);
      });
    } else {
      console.log('re-load: loader function is unset');
    }
  }
}
