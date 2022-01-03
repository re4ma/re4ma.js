import { ReComponent } from './ReComponent.js';
import { clrz } from '../utils/clrz.js';
 
export class ReMd extends ReComponent {

  async applySrc() {
    // @ts-ignore
    let mkdMdl = await import('https://unpkg.com/@re4ma/re4ma@latest/build/mkd.esm.min.js');
    let html = mkdMdl.marked(this.srcText);
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

