import { ReComponent } from './ReComponent.js';

const HTML = /*html*/ `
<div re-variant="A" hidden>
  <re-htm src="{{SRC-A}}"></re-htm>
</div>
<div re-variant="B" hidden>
  <re-htm src="{{SRC-B}}"></re-htm>
</div>
`;

function releaseAB() {
  let currentVariant = Math.random() > 0.5 ? 'A' : 'B';
  [...document.querySelectorAll('[re-variant]')].forEach((el) => {
    if (el.getAttribute('re-variant') === currentVariant) {
      el.removeAttribute('hidden');
      // @ts-ignore
      el.style.display = 'contents';
    }
  });
}

const SCRIPT_HTML = /*html*/ `
<script type="module">${releaseAB.toString()};releaseAB();</script>
`;

let scriptAdded = false;

export class ReAb extends ReComponent {
  connectedCallback() {
    if (!scriptAdded) {
      let tpl = document.createElement('template');
      tpl.innerHTML = SCRIPT_HTML;
      document.body.appendChild(tpl.content.cloneNode(true));
      scriptAdded = true;
    }
    let html = HTML.split('{{SRC-A}}').join(this.getAttribute('src-a'));
    html = html.split('{{SRC-B}}').join(this.getAttribute('src-b'));
    this.outerHTML = html;
    releaseAB();
  }
}