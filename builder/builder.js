const iframe = document.querySelector('iframe');
const input = document.querySelector('input');
/** @type {Object<string, HTMLButtonElement>} */
const btn = {};
[...document.querySelectorAll('button')].forEach((b) => {
  btn[b.getAttribute('b')] = b;
});

btn.load.onclick = () => {
  iframe.src = input.value;
};

iframe.src = '../../index.html';

iframe.onload = () => {
  iframe.contentWindow.document.body.contentEditable = 'true';
  iframe.contentWindow.document.body.onclick = (e) => {
    console.log(e.composedPath());
    // e.target.style.outline = '2px solid red';
  };
}
