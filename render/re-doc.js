import { ReComponent } from './ReComponent.js';

export class ReDoc extends ReComponent {

  connectedCallback() {
    this.docSrc = this.getAttribute('doc') || '';
    this.tplSrc = this.getAttribute('tpl');
    this.aText = this.getAttribute('text') || this.tplSrc;
    if (this.tplSrc) {
      let init = async () => {
        let tplTxt = await (await window.fetch(this.tplSrc)).text();
        let docTxt = await (await window.fetch(this.docSrc)).text();
        tplTxt = this.processHtmlPlaceholders(tplTxt);
        docTxt = this.processHtmlPlaceholders(docTxt);
        let docFile = new File([tplTxt.replace('{{CONTENT}}', docTxt)], 'test.html', {
          type: 'text/html',
        });
        let aHtml = `<a href="${URL.createObjectURL(docFile)}">${this.aText}</a>`;
        this.outerHTML = aHtml;
      };
      init();
    }
  }

}