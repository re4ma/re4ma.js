import { ReComponent } from './ReComponent.js';

export class ReLoad extends ReComponent {
  set src(srcVal) {
    if (!srcVal) {
      return;
    }
    this.applyLoader(srcVal);
  }
}
