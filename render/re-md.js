import { ReComponent } from './ReComponent.js';
import { marked } from '../web_modules/marked.js';
import { clrz } from '../utils/clrz.js';
 
export class ReMd extends ReComponent {

  applySrc() {
    let html = marked(this.srcText);
    let fr = document.createDocumentFragment();
    let wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    fr.appendChild(wrapper);
    let codeBlocks = [...fr.querySelectorAll('code')];
    codeBlocks.forEach((code) => {
      code.innerHTML = clrz(code.textContent);
    });
    this.outerHTML = wrapper.innerHTML;
  }

}

