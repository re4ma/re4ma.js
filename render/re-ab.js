import { ReComponent } from './ReComponent.js';

const HTML = /*html*/ `
<div re-variant="A" hidden>
  <re-htm src="{{SRC-A}}"></re-htm>
</div>
<div re-variant="B" hidden>
  <re-htm src="{{SRC-B}}"></re-htm>
</div>
`;

const SCRIPT_HTML = /*html*/ `
<script>
let currentVariant = Math.random() > 0.5 ? 'A' : 'B';
[...document.querySelectorAll('[re-variant]')].filter((el) => {
  return el.getAttribute('re-variant') === currentVariant;
}).forEach((el) => {
  el.removeAttribute('hidden');
  el.style.display = 'contents';
});
</script>
`;

let scriptAdded = false;

export class ReAb extends ReComponent {
  connectedCallback() {
    if (!scriptAdded) {
      document.head.innerHTML += SCRIPT_HTML;
      scriptAdded = true;
    }
    let html = HTML.split('{{SRC-A}}').join(this.getAttribute('src-a'));
    html = html.split('{{SRC-B}}').join(this.getAttribute('src-b'));
    this.outerHTML = html;
  }
}